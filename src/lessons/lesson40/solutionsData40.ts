// ============================================================
// Lesson 40 — بيانات الحلول التفصيلية للاختبار النهائي الشامل (§26)
//
// توثيق مصدر المفتاح والشروح (Provenance):
//   • أورد نص الدرس المورّد في القسم §26 الإجابات النموذجية والأسباب الموجزة للأسئلة الـ25 (①–㉕)
//     مع ملاحظة للمعلم حول قبول البدائل السليمة نحويًا عندما يسمح السياق.
//   • أما الشروح التفصيلية الموسّعة وقوائم البدائل الإضافية في هذا الملف فهي من إعداد المنصة
//     (platform-authored) استنادًا إلى قواعد الدرس 40 المورّدة، ولا تدّعي وجود مفتاح كتاب خارجي مستقل.
// ============================================================

export type SolutionItem40 = {
  id: string;
  number: number;
  marker: string;
  level: 1 | 2 | 3 | 4 | 5;
  prompt: string;
  sourceAnswer: string;
  sourceReason: string;
  acceptedNormalized: readonly string[];
  platformExplanation: string;
  acceptableAlternatives?: string;
};

export const SOLUTIONS_PROVENANCE_NOTE_40 =
  "يتضمن القسم §26 من النص المورّد مفتاح تصحيح الدرس 40 والأسباب الموجزة للأسئلة الـ25، مع ملاحظة للمعلم بقبول البدائل السليمة نحويًا عندما يسمح السياق. وأضافت المنصة الشروح التفصيلية الموسّعة وقوائم الصيغ المختصرة والبدائل استنادًا إلى مادة الدرس المورّدة دون الادعاء بوجود مفتاح خارجي مستقل.";

export const SOLUTIONS_40: readonly SolutionItem40[] = [
  // المستوى الأول: اختر الإجابة الصحيحة (1–5)
  {
    id: "q1",
    number: 1,
    marker: "①",
    level: 1,
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
    prompt: "③ At 8:00 tomorrow, I ______ for my exam.",
    sourceAnswer: "A — will be studying.",
    sourceReason: "السبب: نشاط سيكون جاريًا عند الثامنة.",
    acceptedNormalized: ["a", "will be studying", "a. will be studying"],
    platformExplanation:
      "العبارة الزمنية At 8:00 tomorrow تحدد لحظة مستقبلية نضع الكاميرا بداخلها لوصف الدراسة كنشاط جارٍ (Future Continuous).",
  },
  {
    id: "q4",
    number: 4,
    marker: "④",
    level: 1,
    prompt: "④ By Friday, she ______ the project.",
    sourceAnswer: "B — will have completed.",
    sourceReason: "السبب: إنجاز مكتمل بحلول الجمعة.",
    acceptedNormalized: ["b", "will have completed", "b. will have completed"],
    platformExplanation:
      "By Friday تحدد نقطة مرجعية مستقبلية يكتمل المشروع قبلها أو بحلولها، والخيار الوحيد السليم نحويًا ودلاليًا بين البدائل هو B (will have completed).",
  },
  {
    id: "q5",
    number: 5,
    marker: "⑤",
    level: 1,
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
    prompt: "⑥ I promise I ______ (return) your book tomorrow.",
    sourceAnswer: "will return.",
    sourceReason: "I promise I will return your book tomorrow. — السبب: وعد.",
    acceptedNormalized: ["will return", "'ll return", "i'll return", "i will return"],
    platformExplanation:
      "مع عبارة الوعد الصريح I promise نستخدم Future Simple: will return.",
    acceptableAlternatives: "الصيغة المختصرة 'll return مقبولة تمامًا.",
  },
  {
    id: "q7",
    number: 7,
    marker: "⑦",
    level: 2,
    prompt: "⑦ Look at those dark clouds! It ______ (rain).",
    sourceAnswer: "is going to rain.",
    sourceReason: "Look at those dark clouds! It's going to rain. — السبب: توقع نبرز فيه دليلًا حاضرًا.",
    acceptedNormalized: ["is going to rain", "'s going to rain", "it's going to rain", "it is going to rain"],
    platformExplanation:
      "الغيوم الداكنة المرئية الآن (Look at those dark clouds!) دليل حاضر يقود إلى صيغة BE GOING TO: is going to rain.",
    acceptableAlternatives: "الصيغة المختصرة 's going to rain مقبولة.",
  },
  {
    id: "q8",
    number: 8,
    marker: "⑧",
    level: 2,
    prompt: "⑧ This time next week, we ______ (travel) around Europe.",
    sourceAnswer: "will be travelling.",
    sourceReason: "This time next week, we will be travelling around Europe. — السبب: نشاط جارٍ في لحظة مستقبلية.",
    acceptedNormalized: [
      "will be travelling",
      "will be traveling",
      "'ll be travelling",
      "'ll be traveling",
      "we'll be travelling",
      "we will be travelling",
    ],
    platformExplanation:
      "This time next week يحدد لحظة مستقبلية يكون السفر حول أوروبا جاريًا خلالها (Future Continuous).",
    acceptableAlternatives: "يُقبل الهجاء البريطاني (travelling) والأمريكي (traveling) والصيغة المختصرة.",
  },
  {
    id: "q9",
    number: 9,
    marker: "⑨",
    level: 2,
    prompt: "⑨ By 10:00, I ______ (finish) my homework.",
    sourceAnswer: "will have finished.",
    sourceReason: "By 10:00, I will have finished my homework. — السبب: إنجاز مكتمل بحلول العاشرة.",
    acceptedNormalized: ["will have finished", "'ll have finished", "i'll have finished", "will finish", "'ll finish"],
    platformExplanation:
      "By 10:00 مع الفعل finish يبرز اكتمال الواجب بحلول الساعة العاشرة، فالصيغة النموذجية هي Future Perfect: will have finished.",
    acceptableAlternatives: "وفق §11 و§22 وملاحظة المعلم في §26، تُقبل أيضًا will finish إذا فُسّرت العاشرة كموعد نهائي للإنهاء.",
  },
  {
    id: "q10",
    number: 10,
    marker: "⑩",
    level: 2,
    prompt: "⑩ By 10:00, I ______ (study) for four hours.",
    sourceAnswer: "will have been studying.",
    sourceReason: "By 10:00, I will have been studying for four hours. — السبب: مدة نشاط ممتدة حتى العاشرة.",
    acceptedNormalized: [
      "will have been studying",
      "'ll have been studying",
      "i'll have been studying",
      "will have studied",
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
    prompt: "⑪ She will going to buy a new computer.",
    sourceAnswer: "She is going to buy a new computer. أو: She will buy a new computer.",
    sourceReason: "لا نجمع will وgoing to بهذه الصورة.",
    acceptedNormalized: [
      "she is going to buy a new computer",
      "she's going to buy a new computer",
      "she will buy a new computer",
      "she'll buy a new computer",
    ],
    platformExplanation:
      "دمج will مع going to خطأ نحوي؛ نختار إما She is going to buy a new computer (خطة مسبقة) أو She will buy a new computer (حدث/قرار مستقبلي).",
    acceptableAlternatives: "كلا التصحيحين (is going to buy / will buy) منصوص عليهما صراحةً في §26.",
  },
  {
    id: "q12",
    number: 12,
    marker: "⑫",
    level: 3,
    prompt: "⑫ They will be play football at 6:00.",
    sourceAnswer: "They will be playing football at 6:00.",
    sourceReason: "بعد will be نستخدم V-ing.",
    acceptedNormalized: ["they will be playing football at 6:00", "they'll be playing football at 6:00"],
    platformExplanation:
      "في Future Continuous يأتي بعد will be الفعل مضافًا إليه ing: playing لا play.",
  },
  {
    id: "q13",
    number: 13,
    marker: "⑬",
    level: 3,
    prompt: "⑬ He will have wrote the report by Friday.",
    sourceAnswer: "He will have written the report by Friday.",
    sourceReason: "نستخدم V3 بعد will have.",
    acceptedNormalized: ["he will have written the report by Friday", "he'll have written the report by Friday"],
    platformExplanation:
      "في Future Perfect نحتاج إلى التصريف الثالث (written) بعد will have، وليس الماضي البسيط (wrote).",
  },
  {
    id: "q14",
    number: 14,
    marker: "⑭",
    level: 3,
    prompt: "⑭ We will have being working for five hours.",
    sourceAnswer: "We will have been working for five hours.",
    sourceReason: "الصيغة الصحيحة: will have been + V-ing.",
    acceptedNormalized: ["we will have been working for five hours", "we'll have been working for five hours"],
    platformExplanation:
      "بعد will have في Future Perfect Continuous نستخدم التصريف الثالث been وليس being.",
  },
  {
    id: "q15",
    number: 15,
    marker: "⑮",
    level: 3,
    prompt: "⑮ By the time you will arrive, I will have finished.",
    sourceAnswer: "By the time you arrive, I will have finished.",
    sourceReason: "نستخدم Present Simple في الجملة الزمنية المستقبلية بعد by the time.",
    acceptedNormalized: [
      "by the time you arrive, i will have finished",
      "by the time you arrive i will have finished",
      "by the time you arrive, i'll have finished",
    ],
    platformExplanation:
      "في الجملة الزمنية المستقبلية التي تبدأ بـ by the time نحذف will ونستخدم Present Simple: you arrive.",
  },

  // المستوى الرابع: فهم المعنى (16–20)
  {
    id: "q16",
    number: 16,
    marker: "⑯",
    level: 4,
    prompt: "⑯ ما الفرق بين: I will study tomorrow. / I'm going to study tomorrow.",
    sourceAnswer: "الأولى قد تعبّر عن قرار أو فعل مستقبلي، والثانية تبرز نية أو خطة موجودة مسبقًا.",
    sourceReason: "التمييز النموذجي بين WILL (قرار/حدث مستقبلي) وBE GOING TO (نية أو خطة مسبقة).",
    acceptedNormalized: [
      "الأولى قد تعبّر عن قرار أو فعل مستقبلي، والثانية تبرز نية أو خطة موجودة مسبقًا",
      "قرار لحظي وخطة مسبقة",
    ],
    platformExplanation:
      "كلاهما يتحدث عن الدراسة غدًا، لكن I will study tomorrow تقدم الحدث المستقبلي أو قرارًا اتُّخذ الآن، بينما I'm going to study tomorrow تبرز أن النية أو الخطة كانت موجودة قبل الكلام (§4 و§5).",
  },
  {
    id: "q17",
    number: 17,
    marker: "⑰",
    level: 4,
    prompt: "⑰ ما الفرق بين: At 8:00, I will be working. / By 8:00, I will have finished working.",
    sourceAnswer: "الأولى تصف نشاطًا سيكون جاريًا عند الثامنة، والثانية تصف نشاطًا سيكون قد اكتمل بحلول الثامنة.",
    sourceReason: "Future Continuous (نشاط جارٍ عند لحظة) مقابل Future Perfect (إنجاز مكتمل بحلول نقطة).",
    acceptedNormalized: [
      "الأولى تصف نشاطًا سيكون جاريًا عند الثامنة، والثانية تصف نشاطًا سيكون قد اكتمل بحلول الثامنة",
      "نشاط جارٍ وإنجاز مكتمل",
    ],
    platformExplanation:
      "في الجملة الأولى (At 8:00, I will be working) يكون العمل جاريًا عند الساعة الثامنة، وفي الثانية (By 8:00, I will have finished working) يكون العمل قد اكتمل قبل أو عند الثامنة (§9).",
  },
  {
    id: "q18",
    number: 18,
    marker: "⑱",
    level: 4,
    prompt: "⑱ ما الفرق بين: By Friday, I will have written five articles. / By Friday, I will have been writing articles for two weeks.",
    sourceAnswer: "الأولى تركز على عدد المقالات المكتملة، والثانية تركز على مدة نشاط الكتابة.",
    sourceReason: "Future Perfect (التركيز على النتيجة/العدد المكتمل) مقابل Future Perfect Continuous (التركيز على المدة).",
    acceptedNormalized: [
      "الأولى تركز على عدد المقالات المكتملة، والثانية تركز على مدة نشاط الكتابة",
      "النتيجة والمدة",
    ],
    platformExplanation:
      "الأولى (Future Perfect) تبرز الإنجاز المكتمل وعدد المقالات الخمس، بينما الثانية (Future Perfect Continuous) تبرز مدة الأسبوعين (for two weeks) الممتدة حتى الجمعة (§9 و§10).",
  },
  {
    id: "q19",
    number: 19,
    marker: "⑲",
    level: 4,
    prompt: "⑲ هل وجود by يعني أننا يجب أن نستخدم Future Perfect دائمًا؟",
    sourceAnswer: "لا. يمكن استخدام Future Simple مع by، مثل: I will finish the report by Friday.",
    sourceReason: "الكلمة الزمنية by تساعد في فهم السياق لكنها لا تفرض زمنًا واحدًا آليًا.",
    acceptedNormalized: ["لا", "no", "لا. يمكن استخدام future simple مع by"],
    platformExplanation:
      "الجواب «لا»؛ فكما يبيّن §11 و§22، يمكن قول I will finish the report by Friday (حدث مع موعد نهائي) أو I will have finished the report by Friday (إبراز الاكتمال بحلول الجمعة)، وكذلك يأتي Future Perfect Continuous مع by عند قياس المدة.",
  },
  {
    id: "q20",
    number: 20,
    marker: "⑳",
    level: 4,
    prompt: "⑳ لماذا لا نستخدم عادةً will بعد when عندما تبدأ جملة زمنية مستقبلية؟",
    sourceAnswer: "لأن الجملة الزمنية المستقبلية التي تبدأ بـ when تستخدم عادةً Present Simple، رغم أن معناها مستقبلي. مثال: When you arrive, I'll call you.",
    sourceReason: "قاعدة الجمل الزمنية المستقبلية (§12).",
    acceptedNormalized: [
      "لأن الجملة الزمنية المستقبلية التي تبدأ بـ when تستخدم عادةً present simple",
      "نستخدم present simple بعد when",
    ],
    platformExplanation:
      "تُبنى الجملة الزمنية التابعة بعد when بـ Present Simple (When you arrive)، وتوضع صيغة المستقبل (I'll call you) في الجملة الرئيسية؛ أما في السؤال المباشر فنقول When will you arrive? (§12).",
  },

  // المستوى الخامس: Final IQ200 Boss — The Big School Project (21–25)
  {
    id: "q21",
    number: 21,
    marker: "㉑",
    level: 5,
    prompt: "㉑ We decided last week that we ______ (build) a smart recycling machine.",
    sourceAnswer: "are going to build.",
    sourceReason: "السبب: خطة اتُّخذ قرارها الأسبوع الماضي.",
    acceptedNormalized: ["are going to build", "'re going to build", "we're going to build"],
    platformExplanation:
      "عبارة We decided last week تؤكد أن القرار اتُّخذ قبل الكلام بأسبوع، فتكون الصيغة المناسبة للخطة المسبقة مع الفاعل we هي are going to build.",
  },
  {
    id: "q22",
    number: 22,
    marker: "㉒",
    level: 5,
    prompt: "㉒ Maya notices that one of the sensors isn't working. Daniel says: \"Don't worry. I ______ (fix) it.\"",
    sourceAnswer: "will fix.",
    sourceReason: "السبب: قرار لحظي أو عرض مساعدة.",
    acceptedNormalized: ["will fix", "'ll fix", "i'll fix"],
    platformExplanation:
      "دانيال يردّ فور اكتشاف مايا لتعطّل الحساس، فيتخذ قرارًا لحظيًا ويعرض إصلاحه باستخدام WILL: will fix.",
  },
  {
    id: "q23",
    number: 23,
    marker: "㉓",
    level: 5,
    prompt: "㉓ At 4:00 tomorrow, the students ______ (test) the machine.",
    sourceAnswer: "will be testing.",
    sourceReason: "السبب: نشاط سيكون جاريًا عند الرابعة.",
    acceptedNormalized: ["will be testing", "'ll be testing"],
    platformExplanation:
      "العبارة الزمنية At 4:00 tomorrow تحدد لحظة مستقبلية سيكون اختبار الآلة جاريًا خلالها: will be testing.",
  },
  {
    id: "q24",
    number: 24,
    marker: "㉔",
    level: 5,
    prompt: "㉔ By Friday, they ______ (complete) all the experiments.",
    sourceAnswer: "will have completed.",
    sourceReason: "السبب: إنجاز مكتمل بحلول الجمعة.",
    acceptedNormalized: ["will have completed", "'ll have completed", "will complete", "'ll complete"],
    platformExplanation:
      "بحلول يوم الجمعة (By Friday) ستكون جميع التجارب قد اكتملت، فنستخدم Future Perfect: will have completed.",
  },
  {
    id: "q25",
    number: 25,
    marker: "㉕",
    level: 5,
    prompt: "㉕ By the time the exhibition begins, they ______ (work) on the project for three months.",
    sourceAnswer: "will have been working.",
    sourceReason: "السبب: مدة نشاط ممتدة حتى بداية المعرض.",
    acceptedNormalized: ["will have been working", "'ll have been working", "will have worked", "'ll have worked"],
    platformExplanation:
      "جملة زمنية تبدأ بـ By the time the exhibition begins (بـ Present Simple) مع مدة ثلاثة أشهر (for three months)، فنستخدم Future Perfect Continuous: will have been working.",
  },
] as const;
