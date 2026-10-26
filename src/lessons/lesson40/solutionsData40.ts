// ============================================================
// Lesson 40 — بيانات الحلول التفصيلية للاختبار النهائي الشامل
// يُحمّل هذا الملف بصورة مؤجلة بعد تسليم الاختبار أو عبر مساحة المعلم فقط.
// ============================================================

export type SolutionItem40 = {
  id: string;
  number: number;
  marker: string;
  level: 1 | 2 | 3 | 4 | 5;
  gradingMode: "auto" | "review";
  prompt: string;
  sourceAnswer: string;
  sourceReason: string;
  acceptedNormalized: readonly string[];
  platformExplanation: string;
  acceptableAlternatives?: string;
};

export const SOLUTIONS_40: readonly SolutionItem40[] = [
  // المستوى الأول: اختر الإجابة الصحيحة (1–5)
  {
    id: "q1",
    number: 1,
    marker: "①",
    level: 1,
    gradingMode: "auto",
    prompt: "① A: I'm cold. · B: I ______ close the window.",
    sourceAnswer: "A — will.",
    sourceReason: "السبب: قرار لحظي أو عرض مساعدة.",
    acceptedNormalized: ["a", "will", "a. will"],
    platformExplanation:
      "المتحدث B يستجيب في اللحظة نفسها لشعور A بالبرد فيعرض إغلاق النافذة فورًا، فالصيغة النموذجية هي WILL.",
  },
  {
    id: "q2",
    number: 2,
    marker: "②",
    level: 1,
    gradingMode: "auto",
    prompt: "② We decided last week. We ______ start a new school magazine.",
    sourceAnswer: "B — are going to.",
    sourceReason: "السبب: خطة موجودة مسبقًا.",
    acceptedNormalized: ["b", "are going to", "b. are going to"],
    platformExplanation:
      "جملة We decided last week تثبت أن القرار اتُّخذ قبل لحظة الكلام، فتكون الصيغة النموذجية لإبراز الخطة المسبقة هي BE GOING TO.",
  },
  {
    id: "q3",
    number: 3,
    marker: "③",
    level: 1,
    gradingMode: "auto",
    prompt: "③ At 8:00 tomorrow, I ______ for my exam.",
    sourceAnswer: "A — will be studying.",
    sourceReason: "السبب: نشاط سيكون جاريًا عند الثامنة.",
    acceptedNormalized: ["a", "will be studying", "a. will be studying"],
    platformExplanation:
      "العبارة الزمنية At 8:00 tomorrow تحدد لحظة مستقبلية نضع العدسة بداخلها لوصف الدراسة كنشاط جارٍ بصيغة Future Continuous.",
  },
  {
    id: "q4",
    number: 4,
    marker: "④",
    level: 1,
    gradingMode: "auto",
    prompt: "④ By Friday, she ______ the project.",
    sourceAnswer: "B — will have completed.",
    sourceReason: "السبب: إنجاز مكتمل بحلول الجمعة.",
    acceptedNormalized: ["b", "will have completed", "b. will have completed"],
    platformExplanation:
      "By Friday تحدد نقطة مرجعية مستقبلية يكتمل المشروع قبلها أو بحلولها، والخيار السليم نحويًا ودلاليًا بين البدائل هو B (will have completed).",
  },
  {
    id: "q5",
    number: 5,
    marker: "⑤",
    level: 1,
    gradingMode: "auto",
    prompt: "⑤ By next year, they ______ here for ten years.",
    sourceAnswer: "A — will have been working.",
    sourceReason: "السبب: التركيز على مدة العمل حتى نقطة مستقبلية.",
    acceptedNormalized: ["a", "will have been working", "a. will have been working"],
    platformExplanation:
      "اجتمعت نقطة المرجع المستقبلية (By next year) مع قياس المدة (for ten years)، فالصيغة الصحيحة بين الخيارات هي A (will have been working).",
  },

  // المستوى الثاني: أكمل الجمل (6–10)
  {
    id: "q6",
    number: 6,
    marker: "⑥",
    level: 2,
    gradingMode: "auto",
    prompt: "⑥ I promise I ______ (return) your book tomorrow.",
    sourceAnswer: "will return.",
    sourceReason: "I promise I will return your book tomorrow. — السبب: وعد.",
    acceptedNormalized: [
      "will return",
      "i will return",
      "i promise i will return your book tomorrow",
    ],
    platformExplanation:
      "مع عبارة الوعد الصريح I promise نستخدم Future Simple: will return.",
    acceptableAlternatives: "تُقبل الصيغة الكاملة will return والصيغة المختصرة 'll return.",
  },
  {
    id: "q7",
    number: 7,
    marker: "⑦",
    level: 2,
    gradingMode: "auto",
    prompt: "⑦ Look at those dark clouds! It ______ (rain).",
    sourceAnswer: "is going to rain.",
    sourceReason: "Look at those dark clouds! It's going to rain. — السبب: توقع نبرز فيه دليلًا حاضرًا.",
    acceptedNormalized: [
      "is going to rain",
      "it is going to rain",
      "look at those dark clouds! it is going to rain",
    ],
    platformExplanation:
      "الغيوم الداكنة المرئية الآن (Look at those dark clouds!) دليل حاضر يقود إلى صيغة BE GOING TO: is going to rain.",
    acceptableAlternatives: "تُقبل الصيغة الكاملة is going to rain والمختصرة 's going to rain.",
  },
  {
    id: "q8",
    number: 8,
    marker: "⑧",
    level: 2,
    gradingMode: "auto",
    prompt: "⑧ This time next week, we ______ (travel) around Europe.",
    sourceAnswer: "will be travelling.",
    sourceReason: "This time next week, we will be travelling around Europe. — السبب: نشاط جارٍ في لحظة مستقبلية.",
    acceptedNormalized: [
      "will be travelling",
      "we will be travelling",
      "this time next week, we will be travelling around europe",
    ],
    platformExplanation:
      "This time next week يحدد لحظة مستقبلية يكون السفر حول أوروبا جاريًا خلالها بصيغة Future Continuous.",
    acceptableAlternatives: "يُقبل الهجاء البريطاني travelling والأمريكي traveling والصيغة المختصرة.",
  },
  {
    id: "q9",
    number: 9,
    marker: "⑨",
    level: 2,
    gradingMode: "auto",
    prompt: "⑨ By 10:00, I ______ (finish) my homework.",
    sourceAnswer: "will have finished.",
    sourceReason: "By 10:00, I will have finished my homework. — السبب: إنجاز مكتمل بحلول العاشرة.",
    acceptedNormalized: [
      "will have finished",
      "i will have finished",
      "will finish",
      "i will finish",
      "by 10:00, i will have finished my homework",
    ],
    platformExplanation:
      "By 10:00 مع الفعل finish يبرز اكتمال الواجب بحلول الساعة العاشرة، فالصيغة النموذجية هي Future Perfect: will have finished.",
    acceptableAlternatives:
      "تُقبل أيضًا will finish إذا قُصد تقديم حدث الإنهاء قبل الموعد النهائي، مع بقاء will have finished الأدق لإبراز الاكتمال.",
  },
  {
    id: "q10",
    number: 10,
    marker: "⑩",
    level: 2,
    gradingMode: "auto",
    prompt: "⑩ By 10:00, I ______ (study) for four hours.",
    sourceAnswer: "will have been studying.",
    sourceReason: "By 10:00, I will have been studying for four hours. — السبب: مدة نشاط ممتدة حتى العاشرة.",
    acceptedNormalized: [
      "will have been studying",
      "i will have been studying",
      "will have studied",
      "by 10:00, i will have been studying for four hours",
    ],
    platformExplanation:
      "وجود المدة (for four hours) مع نقطة المرجع (By 10:00) يوجّه التركيز إلى مدة النشاط الممتدة: will have been studying.",
  },

  // المستوى الثالث: صحح الأخطاء (11–15)
  {
    id: "q11",
    number: 11,
    marker: "⑪",
    level: 3,
    gradingMode: "auto",
    prompt: "⑪ She will going to buy a new computer.",
    sourceAnswer: "She is going to buy a new computer. أو: She will buy a new computer.",
    sourceReason: "لا نجمع will وgoing to بهذه الصورة.",
    acceptedNormalized: [
      "she is going to buy a new computer",
      "she will buy a new computer",
      "is going to buy",
      "will buy",
    ],
    platformExplanation:
      "دمج will مع going to خطأ نحوي؛ نختار إما She is going to buy a new computer للخطة المسبقة أو She will buy a new computer للحدث أو القرار المستقبلي.",
    acceptableAlternatives: "كلا التصحيحين (She is going to buy... / She will buy...) صحيح ومعتمد.",
  },
  {
    id: "q12",
    number: 12,
    marker: "⑫",
    level: 3,
    gradingMode: "auto",
    prompt: "⑫ They will be play football at 6:00.",
    sourceAnswer: "They will be playing football at 6:00.",
    sourceReason: "بعد will be نستخدم V-ing.",
    acceptedNormalized: [
      "they will be playing football at 6:00",
      "will be playing",
    ],
    platformExplanation:
      "في Future Continuous يأتي بعد will be الفعل مضافًا إليه ing: playing لا play.",
  },
  {
    id: "q13",
    number: 13,
    marker: "⑬",
    level: 3,
    gradingMode: "auto",
    prompt: "⑬ He will have wrote the report by Friday.",
    sourceAnswer: "He will have written the report by Friday.",
    sourceReason: "نستخدم V3 بعد will have.",
    acceptedNormalized: [
      "he will have written the report by friday",
      "will have written",
    ],
    platformExplanation:
      "في Future Perfect نحتاج إلى التصريف الثالث (written) بعد will have، وليس الماضي البسيط (wrote).",
  },
  {
    id: "q14",
    number: 14,
    marker: "⑭",
    level: 3,
    gradingMode: "auto",
    prompt: "⑭ We will have being working for five hours.",
    sourceAnswer: "We will have been working for five hours.",
    sourceReason: "الصيغة الصحيحة: will have been + V-ing.",
    acceptedNormalized: [
      "we will have been working for five hours",
      "will have been working",
    ],
    platformExplanation:
      "بعد will have في Future Perfect Continuous نستخدم التصريف الثالث been وليس being.",
  },
  {
    id: "q15",
    number: 15,
    marker: "⑮",
    level: 3,
    gradingMode: "auto",
    prompt: "⑮ By the time you will arrive, I will have finished.",
    sourceAnswer: "By the time you arrive, I will have finished.",
    sourceReason: "نستخدم Present Simple في الجملة الزمنية المستقبلية بعد by the time.",
    acceptedNormalized: [
      "by the time you arrive, i will have finished",
      "by the time you arrive i will have finished",
      "you arrive",
    ],
    platformExplanation:
      "في الجملة الزمنية المستقبلية التي تبدأ بـ by the time نحذف will ونستخدم Present Simple: you arrive.",
  },

  // المستوى الرابع: فهم المعنى (16–20) — أسئلة تفسيرية مفتوحة
  {
    id: "q16",
    number: 16,
    marker: "⑯",
    level: 4,
    gradingMode: "review",
    prompt: "⑯ ما الفرق بين: I will study tomorrow. / I'm going to study tomorrow.",
    sourceAnswer: "الأولى قد تعبّر عن قرار أو فعل مستقبلي، والثانية تبرز نية أو خطة موجودة مسبقًا.",
    sourceReason: "التمييز النموذجي بين WILL (قرار/حدث مستقبلي) وBE GOING TO (نية أو خطة مسبقة).",
    acceptedNormalized: [],
    platformExplanation:
      "كلاهما يتحدث عن الدراسة غدًا، لكن I will study tomorrow تقدم الحدث المستقبلي أو قرارًا اتُّخذ الآن، بينما I'm going to study tomorrow تبرز أن النية أو الخطة كانت موجودة قبل الكلام.",
  },
  {
    id: "q17",
    number: 17,
    marker: "⑰",
    level: 4,
    gradingMode: "review",
    prompt: "⑰ ما الفرق بين: At 8:00, I will be working. / By 8:00, I will have finished working.",
    sourceAnswer: "الأولى تصف نشاطًا سيكون جاريًا عند الثامنة، والثانية تصف نشاطًا سيكون قد اكتمل بحلول الثامنة.",
    sourceReason: "Future Continuous (نشاط جارٍ عند لحظة) مقابل Future Perfect (إنجاز مكتمل بحلول نقطة).",
    acceptedNormalized: [],
    platformExplanation:
      "في الجملة الأولى (At 8:00, I will be working) يكون العمل جاريًا عند الساعة الثامنة، وفي الثانية (By 8:00, I will have finished working) يكون العمل قد اكتمل قبل أو عند الثامنة.",
  },
  {
    id: "q18",
    number: 18,
    marker: "⑱",
    level: 4,
    gradingMode: "review",
    prompt: "⑱ ما الفرق بين: By Friday, I will have written five articles. / By Friday, I will have been writing articles for two weeks.",
    sourceAnswer: "الأولى تركز على عدد المقالات المكتملة، والثانية تركز على مدة نشاط الكتابة.",
    sourceReason: "Future Perfect (التركيز على النتيجة/العدد المكتمل) مقابل Future Perfect Continuous (التركيز على المدة).",
    acceptedNormalized: [],
    platformExplanation:
      "الأولى (Future Perfect) تبرز الإنجاز المكتمل وعدد المقالات الخمس، بينما الثانية (Future Perfect Continuous) تبرز مدة الأسبوعين (for two weeks) الممتدة حتى الجمعة.",
  },
  {
    id: "q19",
    number: 19,
    marker: "⑲",
    level: 4,
    gradingMode: "review",
    prompt: "⑲ هل وجود by يعني أننا يجب أن نستخدم Future Perfect دائمًا؟",
    sourceAnswer: "لا. يمكن استخدام Future Simple مع by، مثل: I will finish the report by Friday.",
    sourceReason: "الكلمة الزمنية by تساعد في فهم السياق لكنها لا تفرض زمنًا واحدًا آليًا.",
    acceptedNormalized: [],
    platformExplanation:
      "الجواب «لا»؛ إذ يمكن قول I will finish the report by Friday (حدث مع موعد نهائي) أو I will have finished the report by Friday (إبراز الاكتمال بحلول الجمعة)، وكذلك يأتي Future Perfect Continuous مع by عند قياس المدة.",
  },
  {
    id: "q20",
    number: 20,
    marker: "⑳",
    level: 4,
    gradingMode: "review",
    prompt: "⑳ لماذا لا نستخدم عادةً will بعد when عندما تبدأ جملة زمنية مستقبلية؟",
    sourceAnswer:
      "لأن الجملة الزمنية المستقبلية التي تبدأ بـ when تستخدم عادةً Present Simple، رغم أن معناها مستقبلي. مثال: When you arrive, I'll call you.",
    sourceReason: "قاعدة الجمل الزمنية المستقبلية التابعة.",
    acceptedNormalized: [],
    platformExplanation:
      "تُبنى الجملة الزمنية التابعة بعد when بـ Present Simple (When you arrive)، وتوضع صيغة المستقبل (I'll call you) في الجملة الرئيسية؛ أما في السؤال المباشر فنقول When will you arrive?.",
  },

  // المستوى الخامس: Final IQ200 Boss — The Big School Project (21–25)
  {
    id: "q21",
    number: 21,
    marker: "㉑",
    level: 5,
    gradingMode: "auto",
    prompt: "㉑ We decided last week that we ______ (build) a smart recycling machine.",
    sourceAnswer: "are going to build.",
    sourceReason: "السبب: خطة اتُّخذ قرارها الأسبوع الماضي.",
    acceptedNormalized: ["are going to build", "we are going to build"],
    platformExplanation:
      "عبارة We decided last week تؤكد أن القرار اتُّخذ قبل الكلام بأسبوع، فتكون الصيغة المناسبة للخطة المسبقة مع الفاعل we هي are going to build.",
  },
  {
    id: "q22",
    number: 22,
    marker: "㉒",
    level: 5,
    gradingMode: "auto",
    prompt: "㉒ Maya notices that one of the sensors isn't working. Daniel says: \"Don't worry. I ______ (fix) it.\"",
    sourceAnswer: "will fix.",
    sourceReason: "السبب: قرار لحظي أو عرض مساعدة.",
    acceptedNormalized: ["will fix", "i will fix"],
    platformExplanation:
      "دانيال يردّ فور اكتشاف مايا لتعطّل الحساس، فيتخذ قرارًا لحظيًا ويعرض إصلاحه باستخدام WILL: will fix.",
  },
  {
    id: "q23",
    number: 23,
    marker: "㉓",
    level: 5,
    gradingMode: "auto",
    prompt: "㉓ At 4:00 tomorrow, the students ______ (test) the machine.",
    sourceAnswer: "will be testing.",
    sourceReason: "السبب: نشاط سيكون جاريًا عند الرابعة.",
    acceptedNormalized: ["will be testing", "the students will be testing"],
    platformExplanation:
      "العبارة الزمنية At 4:00 tomorrow تحدد لحظة مستقبلية سيكون اختبار الآلة جاريًا خلالها: will be testing.",
  },
  {
    id: "q24",
    number: 24,
    marker: "㉔",
    level: 5,
    gradingMode: "auto",
    prompt: "㉔ By Friday, they ______ (complete) all the experiments.",
    sourceAnswer: "will have completed.",
    sourceReason: "السبب: إنجاز مكتمل بحلول الجمعة.",
    acceptedNormalized: ["will have completed", "they will have completed", "will complete"],
    platformExplanation:
      "بحلول يوم الجمعة (By Friday) ستكون جميع التجارب قد اكتملت، فنستخدم Future Perfect: will have completed.",
  },
  {
    id: "q25",
    number: 25,
    marker: "㉕",
    level: 5,
    gradingMode: "auto",
    prompt: "㉕ By the time the exhibition begins, they ______ (work) on the project for three months.",
    sourceAnswer: "will have been working.",
    sourceReason: "السبب: مدة نشاط ممتدة حتى بداية المعرض.",
    acceptedNormalized: [
      "will have been working",
      "they will have been working",
      "will have worked",
    ],
    platformExplanation:
      "جملة زمنية تبدأ بـ By the time the exhibition begins (بـ Present Simple) مع مدة ثلاثة أشهر (for three months)، فنستخدم Future Perfect Continuous: will have been working.",
  },
] as const;
