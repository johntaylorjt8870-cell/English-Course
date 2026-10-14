// ============================================================
// Lesson 38 — بيانات الأنشطة التفاعلية
// المصدر: أمثلة الدرس 38 وحلوله المورّدة.
// ============================================================

export type Choice38 = { value: string; label: string };
export type ChoiceItem38 = {
  id: string;
  prompt: string;
  lines?: string[];
  choices: Choice38[];
  accepted: string[];
  feedback: string;
  nuance?: string;
};

export const OBJECTIVES_38 = [
  "① فهم المعنى الحقيقي للمستقبل التام.",
  "② تكوين الجملة باستخدام will have + V3.",
  "③ التعبير عن حدث سيكون قد اكتمل بحلول نقطة مستقبلية.",
  "④ استخدام by وby the time وbefore استخدامًا صحيحًا.",
  "⑤ تكوين الإثبات والنفي والسؤال وأسئلة Wh.",
  "⑥ التمييز بين Future Simple وFuture Continuous وFuture Perfect.",
  "⑦ الربط بين Present Perfect وPast Perfect وFuture Perfect.",
  "⑧ تجنب الأخطاء المتعلقة بالتصريف الثالث V3.",
  "⑨ فهم الحالات التي قد تتداخل فيها الأزمنة المستقبلية.",
  "⑩ حل اختبار شامل وتطبيق الزمن في مواقف واقعية.",
] as const;

export const TIMELINE_MOMENTS_38 = [
  {
    id: "monday",
    clock: "MONDAY",
    label: "اليوم",
    sentence: "Today is Monday. The project is not finished yet.",
    arabic: "اليوم هو الاثنين. المشروع لم يُنجَز بعد.",
    isReference: false,
    note: "هذه نقطة الانطلاق، لا نقطة المرجع المستقبلية.",
  },
  {
    id: "wednesday",
    clock: "WEDNESDAY",
    label: "إنهاء المشروع",
    sentence: "The project is planned to be finished on Wednesday.",
    arabic: "يُخطَّط لإنهاء المشروع يوم الأربعاء.",
    isReference: false,
    note: "هذه لحظة الإنجاز على الخط، لكنها ليست نقطة النظر المستقبلية في مثال المصدر.",
  },
  {
    id: "friday",
    clock: "FRIDAY",
    label: "نقطة المرجع المستقبلية",
    sentence: "Yes. I will have finished it by Friday.",
    arabic: "نعم، سأكون قد أنهيته بحلول الجمعة.",
    isReference: true,
    note: "عندما نصل إلى الجمعة، سيكون إنهاء المشروع قد حدث بالفعل.",
  },
] as const;

export const FIRST_USE_ITEMS_38: ChoiceItem38[] = [
  {
    id: "homework-6",
    prompt: "بحلول الساعة السادسة سيكون الواجب قد اكتمل. أي جملة تبرز هذا الاكتمال؟",
    choices: [
      { value: "a", label: "I will finish my homework at 6:00." },
      { value: "b", label: "By 6:00, I will have finished my homework." },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: By 6:00, I will have finished my homework.",
    nuance: "الجملة (A) صحيحة نحويًا، لكنها تقدّم الحدث لا الاكتمال بحلول الموعد.",
  },
  {
    id: "bridge",
    prompt: "بحلول الجمعة القادمة سيكون المهندسون قد أكملوا الجسر.",
    choices: [
      { value: "a", label: "By next Friday, the engineers will have completed the bridge." },
      { value: "b", label: "At next Friday, the engineers will be completing the bridge." },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر نفسه: By next Friday, the engineers will have completed the bridge.",
  },
  {
    id: "books",
    prompt: "بحلول نهاية هذا الشهر ستكون قد قرأت خمسة كتب.",
    choices: [
      { value: "a", label: "By the end of this month, she will have read five books." },
      { value: "b", label: "By the end of this month, she will be reading five books." },
    ],
    accepted: ["a"],
    feedback: "التركيز على الإنجاز المكتمل (خمسة كتب) بحلول نهاية الشهر.",
  },
  {
    id: "morning",
    prompt: "بحلول صباح الغد سنكون قد جهزنا كل شيء.",
    choices: [
      { value: "a", label: "Tomorrow morning, we will prepare everything." },
      { value: "b", label: "By tomorrow morning, we will have prepared everything." },
    ],
    accepted: ["b"],
    feedback: "مثال المصدر: By tomorrow morning, we will have prepared everything.",
  },
];

export const BY_MEANING_ITEMS_38: ChoiceItem38[] = [
  {
    id: "exact-time",
    prompt: "في جملة By 8:00, I will have finished. هل يجب أن ينتهي الفعل في الثامنة تمامًا؟",
    choices: [
      { value: "no", label: "لا. قد ينتهي عند السابعة أو السابعة والنصف، المهم ألا يتجاوز الثامنة." },
      { value: "yes", label: "نعم. by تعني أن الفعل يقع في تلك اللحظة بالضبط." },
    ],
    accepted: ["no"],
    feedback: "المصدر: by لا تعني بالضرورة أن الفعل سينتهي في الثامنة تمامًا. المهم أنه سيكون مكتملًا في موعد لا يتجاوز الثامنة.",
  },
  {
    id: "at-vs-by-word",
    prompt: "أي عبارة تعني «بحلول الساعة الثامنة»؟",
    choices: [
      { value: "at", label: "At 8:00 = عند الساعة الثامنة." },
      { value: "by", label: "By 8:00 = بحلول الساعة الثامنة." },
    ],
    accepted: ["by"],
    feedback: "At 8:00 تعني عند الساعة الثامنة، وBy 8:00 تعني بحلول الساعة الثامنة.",
  },
];

export const AT_BY_ITEMS_38: ChoiceItem38[] = [
  {
    id: "at-eight",
    prompt: "تدرس من السادسة حتى التاسعة. عند الثامنة ما زلت تدرس. أي جملة تناسب؟",
    choices: [
      { value: "a", label: "At 8:00, I will be studying." },
      { value: "b", label: "At 8:00, I will have finished studying." },
    ],
    accepted: ["a"],
    feedback: "المصدر: عند الثامنة ستكون ما زلت تدرس — At 8:00, I will be studying.",
    nuance: "الجملة (B) ممكنة فقط إذا كانت الدراسة ستكتمل قبل الثامنة، وهذا ليس مشهد المصدر.",
  },
  {
    id: "by-nine",
    prompt: "تخطط لإنهاء الدراسة قبل التاسعة. أي جملة تبرز الاكتمال؟",
    choices: [
      { value: "a", label: "By 9:00, I will have finished studying." },
      { value: "b", label: "By 9:00, I will be studying." },
    ],
    accepted: ["a"],
    feedback: "المصدر: By 9:00, I will have finished studying.",
  },
  {
    id: "not-a-ban",
    prompt: "هل قاعدة الدرس أن at لا تظهر أبدًا مع Future Perfect؟",
    choices: [
      { value: "no", label: "لا. هذه مقارنة تعليمية شائعة، والمعنى هو الأساس دائمًا." },
      { value: "yes", label: "نعم. at ممنوعة مع Future Perfect، وby ممنوعة مع أي زمن آخر." },
    ],
    accepted: ["no"],
    feedback: "تنبيه المصدر نفسه: ليست قاعدة تقول إن at لا يمكن أن تظهر مع Future Perfect أو أن by لا يمكن أن تظهر مع زمن آخر.",
  },
];

export const TIME_EXPRESSION_ITEMS_38: ChoiceItem38[] = [
  {
    id: "by-then",
    prompt: "أي تعبير يعني «بحلول ذلك الوقت»؟",
    choices: [
      { value: "a", label: "by then" },
      { value: "b", label: "before Friday" },
    ],
    accepted: ["a"],
    feedback: "by then = بحلول ذلك الوقت.",
  },
  {
    id: "by-the-time",
    prompt: "أي تعبير يعني «بحلول الوقت الذي تصل فيه»؟",
    choices: [
      { value: "a", label: "by the time you arrive" },
      { value: "b", label: "by next week" },
    ],
    accepted: ["a"],
    feedback: "by the time you arrive = بحلول الوقت الذي تصل فيه.",
  },
  {
    id: "before-friday",
    prompt: "أي تعبير يعني «قبل الجمعة» لا «بحلول الجمعة»؟",
    choices: [
      { value: "a", label: "before Friday" },
      { value: "b", label: "by tomorrow" },
    ],
    accepted: ["a"],
    feedback: "before Friday = قبل الجمعة.",
  },
];

export const TWO_EVENTS_ITEMS_38: ChoiceItem38[] = [
  {
    id: "homework-arrive",
    prompt: "صديقك يصل عند الخامسة، وأنت تنهي الواجب قبل وصوله. أي جملة تناسب؟",
    choices: [
      { value: "a", label: "By the time you arrive, I will have finished my homework." },
      { value: "b", label: "By the time you arrive, I will be finishing my homework." },
    ],
    accepted: ["a"],
    feedback: "إنهاء الواجب سيكون قد اكتمل قبل الوصول أو بحلوله.",
  },
  {
    id: "which-first",
    prompt: "في مثال المصدر، أي الحدثين يكتمل أولًا؟",
    choices: [
      { value: "a", label: "① إنهاء الواجب قبل ② وصول الصديق أو بحلوله." },
      { value: "b", label: "② وصول الصديق قبل ① إنهاء الواجب." },
    ],
    accepted: ["a"],
    feedback: "المصدر: إنهاء الواجب سيكون قد اكتمل قبل الوصول أو بحلوله.",
  },
];

export const BY_THE_TIME_ITEMS_38: ChoiceItem38[] = [
  {
    id: "wrong-will",
    prompt: "أي جملة صحيحة بعد by the time؟",
    choices: [
      { value: "a", label: "By the time you arrive, I will have finished." },
      { value: "b", label: "By the time you will arrive, I will have finished." },
    ],
    accepted: ["a"],
    feedback: "الجملة الزمنية المستقبلية التي تبدأ بـ by the time تستخدم عادةً Present Simple.",
  },
  {
    id: "bus",
    prompt: "أكمل وفق قاعدة المصدر:",
    lines: ["By the time the bus arrives, I ______ the tickets."],
    choices: [
      { value: "a", label: "will have bought" },
      { value: "b", label: "will buy" },
    ],
    accepted: ["a"],
    feedback: "مثال المصدر: By the time the bus arrives, I will have bought the tickets.",
  },
];

export const BY_BEFORE_ITEMS_38: ChoiceItem38[] = [
  {
    id: "friday-inclusive",
    prompt: "أي جملة تسمح بأن يكتمل التقرير يوم الجمعة نفسه؟",
    choices: [
      { value: "a", label: "I will have finished the report by Friday." },
      { value: "b", label: "I will have finished the report before Friday." },
    ],
    accepted: ["a"],
    feedback: "by Friday تسمح بأن يكتمل التقرير يوم الجمعة نفسه. before Friday تعني قبل يوم الجمعة.",
  },
  {
    id: "ten",
    prompt: "Before 10:00, she will have arrived. ماذا تعني؟",
    choices: [
      { value: "a", label: "ستكون قد وصلت قبل العاشرة." },
      { value: "b", label: "ستصل في العاشرة تمامًا فقط." },
    ],
    accepted: ["a"],
    feedback: "المصدر: ستكون قد وصلت قبل العاشرة.",
  },
];

export const DIALOGUE_LINES_38 = [
  {
    id: "d1",
    speaker: "Maya",
    en: "Will our science project be ready by Thursday?",
    ar: "مايا: هل سيكون مشروعنا العلمي جاهزًا بحلول الخميس؟",
    form: "be ready by Thursday",
    analysis: "سؤال عن الجاهزية بحلول موعد نهائي، لا عن نشاط جارٍ.",
  },
  {
    id: "d2",
    speaker: "Daniel",
    en: "Yes. We will have completed the main structure by Wednesday.",
    ar: "دانيال: نعم. سنكون قد أكملنا الهيكل الأساسي بحلول الأربعاء.",
    form: "will have completed",
    analysis: "إنجاز مكتمل بحلول الأربعاء.",
  },
  {
    id: "d3",
    speaker: "Maya",
    en: "What about the sensors?",
    ar: "مايا: وماذا عن الحساسات؟",
    form: "—",
    analysis: "سؤال متابعة عن جزء آخر من المشروع.",
  },
  {
    id: "d4",
    speaker: "Daniel",
    en: "By tomorrow evening, I will have tested all of them.",
    ar: "دانيال: بحلول مساء الغد، سأكون قد اختبرتها جميعًا.",
    form: "will have tested",
    analysis: "اختبارات مكتملة بحلول مساء الغد.",
  },
  {
    id: "d5",
    speaker: "Maya",
    en: "Excellent! Will we have prepared the presentation by Friday?",
    ar: "مايا: ممتاز! هل سنكون قد جهزنا العرض بحلول الجمعة؟",
    form: "Will we have prepared",
    analysis: "سؤال عن إنجاز مكتمل بحلول الجمعة.",
  },
  {
    id: "d6",
    speaker: "Daniel",
    en: "Of course. By the time our teacher arrives, we will have finished everything.",
    ar: "دانيال: بالتأكيد. بحلول وقت وصول معلمنا، سنكون قد أنهينا كل شيء.",
    form: "will have finished",
    analysis: "اكتمال العمل قبل حدث مستقبلي آخر أو بحلوله.",
  },
] as const;

export const NEGATION_MEANING_ITEMS_38: ChoiceItem38[] = [
  {
    id: "never",
    prompt: "I won't have finished the report by 6:00. ماذا تنفي هذه الجملة؟",
    choices: [
      { value: "a", label: "أن الإنجاز لن يكون مكتملًا بحلول السادسة — وقد يكتمل بعدها." },
      { value: "b", label: "أنني لن أنهي التقرير أبدًا." },
    ],
    accepted: ["a"],
    feedback: "المصدر: هذه الجملة لا تعني بالضرورة أنني لن أنهي التقرير أبدًا. النفي مرتبط بالنقطة المستقبلية المحددة.",
  },
  {
    id: "team",
    prompt: "The team won't have completed the experiment by Monday.",
    choices: [
      { value: "a", label: "قد تكتمل التجربة يوم الثلاثاء." },
      { value: "b", label: "التجربة لن تكتمل في أي يوم." },
    ],
    accepted: ["a"],
    feedback: "المصدر: قد تكتمل التجربة يوم الثلاثاء.",
  },
];

export const SHORT_ANSWER_ITEMS_38: ChoiceItem38[] = [
  {
    id: "yes-i",
    prompt: "Will you have finished by 6:00?",
    choices: [
      { value: "a", label: "Yes, I will." },
      { value: "b", label: "Yes, I will have finished." },
    ],
    accepted: ["a"],
    feedback: "لاحظ أننا لا نكرر have + V3 في الإجابة القصيرة المعتادة.",
  },
  {
    id: "no-she",
    prompt: "Will she have arrived?",
    choices: [
      { value: "a", label: "No, she won't." },
      { value: "b", label: "No, she won't have." },
    ],
    accepted: ["a"],
    feedback: "المصدر: No, she won't.",
  },
  {
    id: "they",
    prompt: "Will they have completed the project?",
    choices: [
      { value: "a", label: "Yes, they will. / No, they won't." },
      { value: "b", label: "Yes, they have. / No, they haven't." },
    ],
    accepted: ["a"],
    feedback: "الإجابة القصيرة تستخدم will أو won't.",
  },
];

export const FS_VS_FP_ITEMS_38: ChoiceItem38[] = [
  {
    id: "finish-tomorrow",
    prompt: "أي جملة تخبر أن حدث الإنهاء سيقع في المستقبل دون إبراز الاكتمال بحلول نقطة؟",
    choices: [
      { value: "a", label: "I will finish the project tomorrow." },
      { value: "b", label: "By tomorrow evening, I will have finished the project." },
    ],
    accepted: ["a"],
    feedback: "Future Simple يصف الحدث المستقبلي، وFuture Perfect يصف اكتمال الحدث بحلول نقطة مستقبلية.",
  },
  {
    id: "read-book",
    prompt: "She will have read the book by the end of next week. ما التركيز؟",
    choices: [
      { value: "a", label: "اكتمال القراءة بحلول نهاية الأسبوع القادم." },
      { value: "b", label: "مجرد أن القراءة ستحدث الأسبوع القادم." },
    ],
    accepted: ["a"],
    feedback: "ستكون قد قرأت الكتاب بحلول نهاية الأسبوع القادم.",
  },
];

export const FC_VS_FP_ITEMS_38: ChoiceItem38[] = [
  {
    id: "at-ten",
    prompt: "الامتحان من التاسعة إلى الحادية عشرة. عند العاشرة أنت داخل الامتحان.",
    choices: [
      { value: "a", label: "At 10:00, I will be taking my exam." },
      { value: "b", label: "At 10:00, I will have finished my exam." },
    ],
    accepted: ["a"],
    feedback: "Future Continuous يسأل ماذا سيكون جاريًا. الجملة: At 10:00, I will be taking my exam.",
  },
  {
    id: "by-twelve",
    prompt: "بحلول الساعة الثانية عشرة سيكون الامتحان قد انتهى.",
    choices: [
      { value: "a", label: "By 12:00, I will have finished my exam." },
      { value: "b", label: "By 12:00, I will be taking my exam." },
    ],
    accepted: ["a"],
    feedback: "Future Perfect يسأل ماذا سيكون قد اكتمل. الجملة: By 12:00, I will have finished my exam.",
  },
];

export const THREE_FUTURE_ITEMS_38: ChoiceItem38[] = [
  {
    id: "simple",
    prompt: "I will write the report tomorrow. ما التركيز؟",
    choices: [
      { value: "a", label: "الحدث المستقبلي (will + V1)." },
      { value: "b", label: "الإنجاز المكتمل بحلول وقت مستقبلي." },
    ],
    accepted: ["a"],
    feedback: "Future Simple: will + V1 — الحدث المستقبلي.",
  },
  {
    id: "continuous",
    prompt: "At 7:00 tomorrow, I will be writing the report. ما التركيز؟",
    choices: [
      { value: "a", label: "النشاط الجاري مستقبلًا (will be + V-ing)." },
      { value: "b", label: "الحدث المستقبلي دون جريان." },
    ],
    accepted: ["a"],
    feedback: "Future Continuous: will be + V-ing — النشاط الجاري مستقبلًا.",
  },
  {
    id: "perfect",
    prompt: "By 9:00 tomorrow, I will have written the report. ما التركيز؟",
    choices: [
      { value: "a", label: "الإنجاز المكتمل بحلول وقت مستقبلي (will have + V3)." },
      { value: "b", label: "النشاط الجاري عند التاسعة." },
    ],
    accepted: ["a"],
    feedback: "Future Perfect: will have + V3 — الإنجاز المكتمل بحلول وقت مستقبلي.",
  },
];

export const SAME_EVENT_ITEMS_38: ChoiceItem38[] = [
  {
    id: "angle-1",
    prompt: "She will cook dinner tomorrow. أي زاوية؟",
    choices: [
      { value: "a", label: "① وقوع الحدث." },
      { value: "b", label: "③ اكتماله بحلول لحظة معينة." },
    ],
    accepted: ["a"],
    feedback: "وقوع الحدث — Future Simple.",
  },
  {
    id: "angle-2",
    prompt: "At 6:00, she will be cooking dinner. أي زاوية؟",
    choices: [
      { value: "a", label: "② استمراره عند لحظة معينة." },
      { value: "b", label: "① وقوع الحدث." },
    ],
    accepted: ["a"],
    feedback: "استمراره عند لحظة معينة — Future Continuous.",
  },
  {
    id: "angle-3",
    prompt: "By 7:00, she will have cooked dinner. أي زاوية؟",
    choices: [
      { value: "a", label: "③ اكتماله بحلول لحظة معينة." },
      { value: "b", label: "② استمراره عند السابعة." },
    ],
    accepted: ["a"],
    feedback: "اكتماله بحلول لحظة معينة — Future Perfect.",
  },
];

export const PERFECT_MAP_ITEMS_38: ChoiceItem38[] = [
  {
    id: "present",
    prompt: "I have finished my homework. ما النقطة المرجعية؟",
    choices: [
      { value: "a", label: "الحاضر — have/has + V3." },
      { value: "b", label: "نقطة مستقبلية — will have + V3." },
    ],
    accepted: ["a"],
    feedback: "Present Perfect: الإنجاز مرتبط بالحاضر.",
  },
  {
    id: "past",
    prompt: "I had finished my homework before my friend arrived.",
    choices: [
      { value: "a", label: "نقطة ماضية — had + V3." },
      { value: "b", label: "الحاضر — have/has + V3." },
    ],
    accepted: ["a"],
    feedback: "Past Perfect: الإنجاز اكتمل قبل نقطة ماضية أخرى.",
  },
  {
    id: "future",
    prompt: "I will have finished my homework by 8:00 tomorrow.",
    choices: [
      { value: "a", label: "نقطة مستقبلية — will have + V3." },
      { value: "b", label: "نقطة ماضية — had + V3." },
    ],
    accepted: ["a"],
    feedback: "Future Perfect: الإنجاز سيكون مكتملًا بحلول نقطة مستقبلية.",
  },
];

export const ERROR_ITEMS_38: ChoiceItem38[] = [
  {
    id: "e1",
    prompt: "She will has finished.",
    choices: [
      { value: "a", label: "الخطأ: has بعد will. الصحيح: She will have finished." },
      { value: "b", label: "الخطأ: finished. الصحيح: finish." },
    ],
    accepted: ["a"],
    feedback: "① She will have finished. ✅ — have لا تتحول إلى has بعد will.",
  },
  {
    id: "e2",
    prompt: "I will have finish.",
    choices: [
      { value: "a", label: "الخطأ: V1 بعد have. الصحيح: I will have finished." },
      { value: "b", label: "الخطأ: will. الصحيح: would." },
    ],
    accepted: ["a"],
    feedback: "② I will have finished. ✅",
  },
  {
    id: "e3",
    prompt: "They will have went home.",
    choices: [
      { value: "a", label: "الخطأ: V2 went. الصحيح: They will have gone home." },
      { value: "b", label: "الخطأ: will have. الصحيح: will be." },
    ],
    accepted: ["a"],
    feedback: "③ They will have gone home. ✅",
  },
  {
    id: "e4",
    prompt: "He won't has arrived.",
    choices: [
      { value: "a", label: "الخطأ: has بعد won't. الصحيح: He won't have arrived." },
      { value: "b", label: "الخطأ: won't. الصحيح: isn't." },
    ],
    accepted: ["a"],
    feedback: "④ He won't have arrived. ✅ — بعد won't يأتي have لا has.",
  },
  {
    id: "e5",
    prompt: "Will she has completed the work?",
    choices: [
      { value: "a", label: "الخطأ: has بعد الفاعل. الصحيح: Will she have completed the work?" },
      { value: "b", label: "الخطأ: Will. الصحيح: Does." },
    ],
    accepted: ["a"],
    feedback: "⑤ Will she have completed the work? ✅ — في السؤال أيضًا have لا has.",
  },
  {
    id: "e6",
    prompt: "By the time you will arrive, I will have finished.",
    choices: [
      { value: "a", label: "الخطأ: will داخل جملة by the time. الصحيح: By the time you arrive, I will have finished." },
      { value: "b", label: "الخطأ: will have finished. الصحيح: will finish." },
    ],
    accepted: ["a"],
    feedback: "⑥ By the time you arrive, I will have finished. ✅ — بعد by the time نستخدم Present Simple.",
  },
  {
    id: "e7",
    prompt: "I will have be ready.",
    choices: [
      { value: "a", label: "إذا أردنا حالة مستقبلية بـ ready، فالصيغة الطبيعية: I will be ready." },
      { value: "b", label: "الصحيح: I will have been ready فقط، ولا تُستخدم will be ready." },
    ],
    accepted: ["a"],
    feedback: "⑦ المصدر: إذا أردنا التعبير عن حالة مستقبلية باستخدام ready، فالصيغة الطبيعية هي will be ready.",
  },
];

export const DIALOGUE2_LINES_38 = [
  {
    id: "e1",
    speaker: "Lena",
    en: "Our school festival is next Saturday. Will everything be ready by then?",
    ar: "لينا: مهرجان مدرستنا السبت القادم. هل سيكون كل شيء جاهزًا بحلول ذلك الوقت؟",
    form: "be ready by then",
    analysis: "سؤال عن الجاهزية بحلول موعد المهرجان.",
  },
  {
    id: "e2",
    speaker: "Omar",
    en: "I think so. By Thursday, we will have decorated the main hall.",
    ar: "عمر: أعتقد ذلك. بحلول الخميس، سنكون قد زيّنا القاعة الرئيسية.",
    form: "will have decorated",
    analysis: "إنجاز مكتمل بحلول الخميس.",
  },
  {
    id: "e3",
    speaker: "Lena",
    en: "What about the invitations?",
    ar: "لينا: وماذا عن الدعوات؟",
    form: "—",
    analysis: "سؤال متابعة.",
  },
  {
    id: "e4",
    speaker: "Omar",
    en: "By tomorrow evening, Sara will have sent all of them.",
    ar: "عمر: بحلول مساء الغد، ستكون سارة قد أرسلتها جميعًا.",
    form: "will have sent",
    analysis: "إرسال مكتمل بحلول مساء الغد.",
  },
  {
    id: "e5",
    speaker: "Lena",
    en: "Excellent. Will the students have prepared their performances by Friday?",
    ar: "لينا: ممتاز. هل سيكون الطلاب قد جهزوا عروضهم بحلول الجمعة؟",
    form: "Will the students have prepared",
    analysis: "سؤال عن اكتمال التحضيرات.",
  },
  {
    id: "e6",
    speaker: "Omar",
    en: "Yes, they will.",
    ar: "عمر: نعم.",
    form: "Yes, they will.",
    analysis: "إجابة قصيرة بدون تكرار have + V3.",
  },
  {
    id: "e7",
    speaker: "Lena",
    en: "And what will you be doing on Friday afternoon?",
    ar: "لينا: وماذا ستكون تفعل بعد ظهر الجمعة؟",
    form: "will you be doing",
    analysis: "سؤال عن نشاط جارٍ خلال فترة مستقبلية — Future Continuous.",
  },
  {
    id: "e8",
    speaker: "Omar",
    en: "I'll be checking the sound system.",
    ar: "عمر: سأكون أفحص نظام الصوت.",
    form: "will be checking",
    analysis: "نشاط جارٍ خلال فترة مستقبلية.",
  },
  {
    id: "e9",
    speaker: "Lena",
    en: "Great! By Saturday morning, we will have completed all the preparations.",
    ar: "لينا: رائع! بحلول صباح السبت، سنكون قد أكملنا جميع التحضيرات.",
    form: "will have completed",
    analysis: "اكتمال جميع التحضيرات بحلول صباح السبت.",
  },
] as const;

export const EXERCISE27_ITEMS_38 = [
  { n: 1, prompt: "① By 8:00, I will ______ finished.", options: ["A. has", "B. have", "C. having"], answer: "B", answerText: "have" },
  { n: 2, prompt: "② She will have ______ the report by Friday.", options: ["A. write", "B. wrote", "C. written"], answer: "C", answerText: "written" },
  { n: 3, prompt: "③ They ______ have completed the project by tomorrow.", options: ["A. will", "B. are", "C. did"], answer: "A", answerText: "will" },
  { n: 4, prompt: "④ Will he ______ arrived by noon?", options: ["A. has", "B. have", "C. having"], answer: "B", answerText: "have" },
  { n: 5, prompt: "⑤ We won't have ______ enough money by next month.", options: ["A. save", "B. saved", "C. saving"], answer: "B", answerText: "saved" },
  { n: 6, prompt: "⑥ By the time you arrive, I will have ______ dinner.", options: ["A. prepare", "B. preparing", "C. prepared"], answer: "C", answerText: "prepared" },
] as const;

export const FILL28_ITEMS_38 = [
  { n: 1, prompt: "① By tomorrow, I ______ (finish) my assignment.", answer: "will have finished" },
  { n: 2, prompt: "② By next month, she ______ (read) six books.", answer: "will have read" },
  { n: 3, prompt: "③ They ______ (build) the new bridge by next year.", answer: "will have built" },
  { n: 4, prompt: "④ We ______ (not / complete) the project by Friday.", answer: "won't have completed" },
  { n: 5, prompt: "⑤ ______ you ______ (save) enough money by summer?", answer: "Will you have saved" },
  { n: 6, prompt: "⑥ By the time the teacher arrives, the students ______ (prepare) everything.", answer: "will have prepared" },
] as const;

export const TENSE29_ITEMS_38 = [
  { n: 1, prompt: "① At 8:00 tomorrow, I ______ (study).", answer: "future-continuous", answerText: "will be studying", why: "نشاط جارٍ عند الثامنة." },
  { n: 2, prompt: "② By 10:00 tomorrow, I ______ (finish) studying.", answer: "future-perfect", answerText: "will have finished", why: "إنجاز مكتمل بحلول العاشرة." },
  { n: 3, prompt: "③ I think our team ______ (win) the competition.", answer: "future-simple", answerText: "will win", why: "توقع." },
  { n: 4, prompt: "④ This time next week, they ______ (travel) around Europe.", answer: "future-continuous", answerText: "will be travelling", why: "نشاط جارٍ في لحظة مستقبلية." },
  { n: 5, prompt: "⑤ By the end of the month, she ______ (complete) five projects.", answer: "future-perfect", answerText: "will have completed", why: "إنجاز مكتمل بحلول نهاية الشهر." },
  { n: 6, prompt: "⑥ When you arrive, we ______ (prepare) dinner.", answer: "future-continuous", answerText: "will be preparing", why: "نشاط مستمر عند وصول الشخص." },
  { n: 7, prompt: "⑦ By the time the guests arrive, we ______ (prepare) dinner.", answer: "future-perfect", answerText: "will have prepared", why: "تحضير مكتمل بحلول وصول الضيوف." },
  { n: 8, prompt: "⑧ I promise I ______ (help) you.", answer: "future-simple", answerText: "will help", why: "وعد." },
] as const;

export const DETECTIVE30_ITEMS_38 = [
  { n: 1, prompt: "I will have finish the work by Friday.", answer: "I will have finished the work by Friday.", why: "بعد have يأتي V3: finished لا finish." },
  { n: 2, prompt: "She will has completed the report.", answer: "She will have completed the report.", why: "بعد will يأتي have لا has." },
  { n: 3, prompt: "They won't have went home by midnight.", answer: "They won't have gone home by midnight.", why: "V3 من go هو gone لا went." },
  { n: 4, prompt: "Will he has arrived by noon?", answer: "Will he have arrived by noon?", why: "في السؤال أيضًا have لا has." },
  { n: 5, prompt: "By the time you will come, I will have prepared dinner.", answer: "By the time you come, I will have prepared dinner.", why: "بعد by the time نستخدم Present Simple." },
  { n: 6, prompt: "We will have wrote five essays by next month.", answer: "We will have written five essays by next month.", why: "V3 من write هو written لا wrote." },
  { n: 7, prompt: "He will have be ready by 8:00.", answer: "He will be ready by 8:00.", why: "حالة مستقبلية بـ ready: الصيغة الطبيعية will be ready." },
  { n: 8, prompt: "She won't has finished by tomorrow.", answer: "She won't have finished by tomorrow.", why: "won't يتبعها have لا has." },
  { n: 9, prompt: "What will you have complete by Friday?", answer: "What will you have completed by Friday?", why: "بعد have يأتي V3: completed." },
  { n: 10, prompt: "By next year, they will have build the new school.", answer: "By next year, they will have built the new school.", why: "V3 من build هو built." },
] as const;

export const IQ31_ITEMS_38: ChoiceItem38[] = [
  {
    id: "both-friday",
    prompt: "I will finish the project by Friday. / I will have finished the project by Friday. هل الجملتان صحيحتان؟",
    choices: [
      { value: "yes", label: "نعم. الأولى تخبر بالإنهاء في موعد لا يتجاوز الجمعة، والثانية تبرز الاكتمال من نقطة مستقبلية." },
      { value: "no", label: "لا. وجود by يجعل Future Simple خطأً دائمًا." },
    ],
    accepted: ["yes"],
    feedback: "المصدر: نعم. وجود by لا يجعل Future Simple خطأً.",
  },
  {
    id: "june",
    prompt: "She will complete the course by June. / She will have completed the course by June.",
    choices: [
      { value: "yes", label: "الجملتان صحيحتان، لكن الثانية تبرز اكتمال الإنجاز عند النقطة المستقبلية." },
      { value: "no", label: "الثانية فقط صحيحة لأن by تفرض Future Perfect." },
    ],
    accepted: ["yes"],
    feedback: "القاعدة المتقدمة: لا تجعل الكلمات الدالة تتحكم بك بصورة آلية.",
  },
];

export const READING32_QUESTIONS_38 = [
  "① What are the students designing?",
  "② What energy source will their model use?",
  "③ What will they have completed by next Friday?",
  "④ What will they have installed by the following Monday?",
  "⑤ What will Adam be doing next Tuesday?",
  "⑥ What will they have finished by the time the exhibition begins?",
  "⑦ Which sentence expresses a prediction?",
] as const;

export const READING32_ANALYSIS_38 = [
  { line: "By next Friday, we will have completed the main structure.", form: "will have completed", why: "إنجاز مكتمل بحلول الجمعة." },
  { line: "By the following Monday, we will have installed the solar panels.", form: "will have installed", why: "تركيب مكتمل بحلول الاثنين التالي." },
  { line: "I'll be testing the traffic system next Tuesday.", form: "will be testing", why: "نشاط جارٍ خلال يوم الثلاثاء." },
  { line: "By the time the exhibition begins, we will have finished everything.", form: "will have finished", why: "اكتمال جميع الأعمال بحلول بداية المعرض." },
  { line: "I'm sure your project will impress the visitors.", form: "will impress", why: "توقع بشأن المستقبل." },
] as const;

export const WRITING35_CRITERIA_38 = [
  "① خمس جمل باستخدام Future Perfect.",
  "② جملتين باستخدام Future Continuous.",
  "③ جملتين باستخدام Future Simple.",
  "④ جملة منفية باستخدام won't have + V3.",
  "⑤ سؤالًا يبدأ بـ Will you have...?",
  "⑥ سؤالًا يبدأ بـ What will you have...?",
  "⑦ جملة تحتوي على by the time.",
  "⑧ ثلاثة تعبيرات زمنية مختلفة على الأقل.",
] as const;

export const WRITING35_MODEL_38 = [
  "By the end of next year, I will have improved my English significantly.",
  "I will have completed several new courses, and I will have learned many useful skills.",
  "At this time next year, I will be working on a new educational project.",
  "I think these experiences will help me become more confident.",
  "By the time the year ends, I will have achieved several important goals.",
] as const;

export const V3_ITEMS_38 = [
  { base: "finish", answer: "finished", kind: "regular" as const, rule: "فعل منتظم: finish → finished → finished." },
  { base: "complete", answer: "completed", kind: "regular" as const, rule: "فعل منتظم: complete → completed → completed." },
  { base: "clean", answer: "cleaned", kind: "regular" as const, rule: "فعل منتظم: clean → cleaned → cleaned." },
  { base: "visit", answer: "visited", kind: "regular" as const, rule: "فعل منتظم: visit → visited → visited." },
  { base: "repair", answer: "repaired", kind: "regular" as const, rule: "فعل منتظم: repair → repaired → repaired." },
  { base: "go", answer: "gone", kind: "irregular" as const, rule: "شاذ: go → went → gone. ليست went." },
  { base: "write", answer: "written", kind: "irregular" as const, rule: "شاذ: write → wrote → written. ليست wrote." },
  { base: "eat", answer: "eaten", kind: "irregular" as const, rule: "شاذ: eat → ate → eaten." },
  { base: "see", answer: "seen", kind: "irregular" as const, rule: "شاذ: see → saw → seen." },
  { base: "do", answer: "done", kind: "irregular" as const, rule: "شاذ: do → did → done." },
  { base: "take", answer: "taken", kind: "irregular" as const, rule: "شاذ: take → took → taken." },
  { base: "build", answer: "built", kind: "irregular" as const, rule: "شاذ: build → built → built." },
  { base: "buy", answer: "bought", kind: "irregular" as const, rule: "شاذ: buy → bought → bought." },
  { base: "speak", answer: "spoken", kind: "irregular" as const, rule: "شاذ: speak → spoke → spoken." },
  { base: "begin", answer: "begun", kind: "irregular" as const, rule: "شاذ: begin → began → begun." },
] as const;

export const NEGATIVE_BUILD_38 = [
  { id: "n1", n: 1, base: "I will have finished by 5:00.", arabic: "لن أكون قد انتهيت بحلول الخامسة.", negative: "I won't have finished by 5:00." },
  { id: "n2", n: 2, base: "She will have arrived by noon.", arabic: "لن تكون قد وصلت بحلول الظهر.", negative: "She won't have arrived by noon." },
  { id: "n3", n: 3, base: "They will have completed the project by Friday.", arabic: "لن يكونوا قد أكملوا المشروع بحلول الجمعة.", negative: "They won't have completed the project by Friday." },
  { id: "n4", n: 4, base: "We will have saved enough money by next month.", arabic: "لن نكون قد ادخرنا مالًا كافيًا بحلول الشهر القادم.", negative: "We won't have saved enough money by next month." },
] as const;

export const YESNO_BUILD_38 = [
  { id: "q1", n: 1, base: "You will have completed the assignment by tomorrow.", question: "Will you have completed the assignment by tomorrow?" },
  { id: "q2", n: 2, base: "He will have arrived by noon.", question: "Will he have arrived by noon?" },
  { id: "q3", n: 3, base: "They will have built the new laboratory by next year.", question: "Will they have built the new laboratory by next year?" },
  { id: "q4", n: 4, base: "We will have learned all the future tenses by the end of this unit.", question: "Will we have learned all the future tenses by the end of this unit?" },
] as const;

export const WH_BUILD_38 = [
  { id: "w1", n: 1, base: "ماذا ستكون قد أكملت بحلول الجمعة؟", expected: "What will you have completed by Friday?" },
  { id: "w2", n: 2, base: "كم كتابًا ستكون قد قرأت بحلول نهاية الشهر؟", expected: "How many books will she have read by the end of the month?" },
  { id: "w3", n: 3, base: "إلى أين سيكونون قد سافروا بحلول نهاية العام؟", expected: "Where will they have travelled by the end of the year?" },
  { id: "w4", n: 4, base: "كم من المال ستكون قد ادخرت بحلول الصيف القادم؟", expected: "How much money will you have saved by next summer?" },
  { id: "w5", n: 5, base: "متى سيكون قد انتهى من المشروع؟", expected: "When will he have finished the project?" },
] as const;

export const SUMMARY_MATCH_38: ChoiceItem38[] = [
  {
    id: "sum-1",
    prompt: "أي مثال ينتمي إلى الاستخدام الأول: إنجاز مكتمل بحلول نقطة مستقبلية؟",
    choices: [
      { value: "a", label: "By 10:00, I will have finished my homework." },
      { value: "b", label: "By the time you arrive, I will have prepared dinner." },
    ],
    accepted: ["a"],
    feedback: "① إنجاز سيكون مكتملًا بحلول نقطة مستقبلية.",
  },
  {
    id: "sum-2",
    prompt: "أي مثال ينتمي إلى الاستخدام الثاني: إنجاز مكتمل قبل حدث مستقبلي آخر أو بحلوله؟",
    choices: [
      { value: "a", label: "By the time you arrive, I will have prepared dinner." },
      { value: "b", label: "I will write the report." },
    ],
    accepted: ["a"],
    feedback: "② إنجاز سيكون مكتملًا قبل حدث مستقبلي آخر أو بحلوله.",
  },
  {
    id: "sum-3",
    prompt: "I will have written the report by 9:00. أي زمن؟",
    choices: [
      { value: "a", label: "Future Perfect — سأكون قد كتبت التقرير بحلول التاسعة." },
      { value: "b", label: "Future Continuous — سأكون أكتب التقرير عند التاسعة." },
    ],
    accepted: ["a"],
    feedback: "Future Perfect: I will have written the report by 9:00.",
  },
];
