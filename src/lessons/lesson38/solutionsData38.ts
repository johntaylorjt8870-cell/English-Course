export type TestSolution38 = {
  n: number;
  level: 1 | 2 | 3 | 4 | 5;
  answer: string;
  explanation: string;
  alternatives?: string[];
  judgment: "grammatical-only" | "grammatical-repair" | "contextual" | "open-model";
  sourceStatus: "platform-authored-teacher-addition";
};

/**
 * إضافة من إعداد المنصة/المعلم.
 * نصّ المصدر §33 يعرض أسئلة الاختبار النهائي، و§34 يذكر العنوان وعبارة
 * «عرض الحلول التفصيلية» دون مفتاح فعلي. لذلك كل إجابة وتفسير أدناه من
 * إعداد المنصة، مكتوبة على أساس أمثلة المصدر وقواعده في الأقسام 1–32،
 * وتُميَّز بوضوح داخل واجهتَي الحلول والمعلم.
 */
export const TEST_SOLUTIONS_38: TestSolution38[] = [
  {
    n: 1, level: 1, answer: "B. have", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد will يأتي have ثم التصريف الثالث: By tomorrow, I will have finished. الصيغة ثابتة مع جميع الضمائر ولا تتحول have إلى has.",
    alternatives: ["A. has خطأ لأن will يتبعها الفعل الأساسي have لا has. C. having ليست جزءًا من Future Perfect."],
  },
  {
    n: 2, level: 1, answer: "C. written", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد will have يأتي V3: She will have written the report by Friday. V3 من write هو written لا write ولا wrote.",
    alternatives: ["A. write صيغة أساسية، وB. wrote تصريف ثانٍ؛ كلاهما خطأ بعد have."],
  },
  {
    n: 3, level: 1, answer: "C. Will", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال نعم/لا يُبنى بنقل will قبل الفاعل: Will they have arrived by noon?",
    alternatives: ["Do وAre لا تُستخدمان لبناء سؤال Future Perfect."],
  },
  {
    n: 4, level: 1, answer: "B. completed", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "النفي won't have يتبعه V3: He won't have completed the work by Monday.",
    alternatives: ["A. complete وC. completing لا تصلحان بعد won't have."],
  },
  {
    n: 5, level: 1, answer: "C. learned", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By the end of the year نقطة مستقبلية، والصيغة will have + V3: we will have learned ten lessons.",
    alternatives: ["A. learn وB. learning ليستا V3."],
  },
  {
    n: 6, level: 2, answer: "will have finished", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By 8:00 موعد نهائي، والإنجاز مكتمل بحلوله: I will have finished my homework. (مثال المصدر في §6).",
    alternatives: ["تقبل will not have finished فقط إن طُلب النفي، وهو غير مطلوب هنا."],
  },
  {
    n: 7, level: 2, answer: "will have saved", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By next summer نقطة مستقبلية: she will have saved enough money.",
  },
  {
    n: 8, level: 2, answer: "won't have completed (will not have completed)", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "النفي: Subject + won't + have + V3: They won't have completed the bridge by Friday.",
    alternatives: ["will not have completed مقبول كذلك. لا تقبل won't completed ولا haven't completed."],
  },
  {
    n: 9, level: 2, answer: "Will he have arrived", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "السؤال: Will + Subject + have + V3?: Will he have arrived by noon?",
    alternatives: ["حذف have يجعل السؤال غير مكتمل."],
  },
  {
    n: 10, level: 2, answer: "will have prepared", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By the time the lesson starts جملة زمنية بـ Present Simple، والجملة الرئيسية Future Perfect: we will have prepared our notebooks.",
    alternatives: ["will be preparing تصف نشاطًا جاريًا عند بدء الدرس، وهو تركيز مختلف عن المطلوب هنا."],
  },
  {
    n: 11, level: 3, answer: "I will have finished the project.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الخطأ: V1 finish بعد have. الصحيح V3: finished.",
    alternatives: ["أي تصحيح يحفظ will have finished مقبول."],
  },
  {
    n: 12, level: 3, answer: "She will have written the report.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "لا تأتي has بعد will؛ المطلوب have: She will have written the report.",
    alternatives: ["She will write the report صحيحة نحويًا لكنها تغيّر الزمن؛ الخطأ الأصلي هو will has."],
  },
  {
    n: 13, level: 3, answer: "They won't have gone home.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الخطأ went بعد have. V3 من go هو gone: They won't have gone home.",
  },
  {
    n: 14, level: 3, answer: "Will he have arrived by Friday?", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "في السؤال أيضًا have لا has: Will he have arrived by Friday?",
  },
  {
    n: 15, level: 3, answer: "By the time you arrive, I will have finished.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد by the time نستخدم Present Simple: you arrive لا you will arrive. (§11)",
  },
  {
    n: 16, level: 4, answer: "الأولى Future Simple: تخبر أن الإنهاء سيقع غدًا. الثانية Future Perfect: تنظر من نقطة مستقبلية إلى التقرير باعتباره مكتملًا بحلول مساء الغد.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الفرق فرق تركيز لا صحة نحوية: Future Simple = الحدث المستقبلي، Future Perfect = اكتمال الحدث بحلول نقطة مستقبلية. (§20)",
    alternatives: [
      "أي شرح يذكر أن الأولى حدث مستقبلي والثانية اكتمال بحلول مساء الغد يُقبل.",
      "لا يُرفض جواب يذكر أن الجملتين صحيحتين مع اختلاف التركيز (انظر §31).",
    ],
  },
  {
    n: 17, level: 4, answer: "At 8:00 تصف نشاطًا جاريًا (Future Continuous). By 8:00 تصف إنجازًا سيكون قد اكتمل بحلول الثامنة (Future Perfect).", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "هذه المقارنة الذهبية في §8 و§21: Future Continuous = ماذا سيكون جاريًا؟ Future Perfect = ماذا سيكون قد اكتمل؟",
    alternatives: ["يُقبل أي جواب يربط at بالجريان وby بالاكتمال دون أن يزعم أن at ممنوعة مع Future Perfect."],
  },
  {
    n: 18, level: 4, answer: "لا. by تعني بحلول / في موعد لا يتجاوز، وقد ينتهي الفعل قبل اللحظة المحددة.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "المصدر §7: قد ينتهي عند السابعة أو السابعة والنصف. المهم أنه سيكون مكتملًا في موعد لا يتجاوز الثامنة.",
    alternatives: ["أي جواب ينفي التطابق الزمني الحرفي ويقبل الاكتمال قبل الموعد يُعد صحيحًا."],
  },
  {
    n: 19, level: 4, answer: "نعم. مثال: I will finish the project by Friday.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "§31: وجود by لا يجعل Future Simple خطأً. الجملة تخبر أن الإنهاء يقع في موعد لا يتجاوز الجمعة، من دون إبراز منظور الاكتمال.",
    alternatives: [
      "She will complete the course by June. مثال مصدر آخر مقبول.",
      "الجواب الذي يقول «لا» يخالف قاعدة المصدر المتقدمة.",
    ],
  },
  {
    n: 20, level: 4, answer: "لأن الجملة الزمنية المستقبلية التي تبدأ بـ by the time تستخدم عادةً Present Simple رغم أن معناها مستقبلي.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "§11: By the time you arrive, I will have finished. ✅ — By the time you will arrive… ❌. هذه امتداد لقاعدة when في الدرس 37.",
    alternatives: ["يُقبل ذكر التركيب: By the time + Subject + Present Simple, Subject + will have + V3."],
  },
  {
    n: 21, level: 5, answer: "will have completed", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By Wednesday موعد نهائي: Maya will have completed the main design.",
    alternatives: ["will complete ممكن نحويًا لكنه لا يبرز الاكتمال بحلول الأربعاء كما يفعل سياق الفقرة."],
  },
  {
    n: 22, level: 5, answer: "will have installed", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By Thursday morning: Daniel will have installed the sensors.",
    alternatives: ["will install أقل إبرازًا للاكتمال بحلول صباح الخميس؛ النموذج المطلوب Future Perfect."],
  },
  {
    n: 23, level: 5, answer: "will be testing", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "At 3:00 on Thursday نقطة زمنية داخل النشاط لا موعد اكتمال: Future Continuous. هذا هو الفخ الذهبي للفقرة — at مقابل by.",
    alternatives: [
      "will have tested خطأ في هذا السياق لأن at 3:00 تصف ما يكون جاريًا لا ما يكون قد اكتمل.",
      "will test صحيحة نحويًا لكنها أقل ملاءمة لوصف النشاط الجاري عند الثالثة.",
    ],
  },
  {
    n: 24, level: 5, answer: "will have finished", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By the time the teacher arrives: الجملة الزمنية Present Simple، والرئيسية Future Perfect: we will have finished everything.",
    alternatives: ["will finish يغيّر التركيز إلى وقوع الحدث لا اكتماله بحلول وصول المعلّم."],
  },
  {
    n: 25, level: 5, answer: "How many experiments will you have completed by then?", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال Wh مع Future Perfect: How many + will + Subject + have + V3? فيكتمل سؤال المعلم: How many experiments will you have completed by then?",
    alternatives: ["How many experiments will you complete by then? أقل إبرازًا للاكتمال؛ النموذج المطلوب هو Future Perfect لأن by then نقطة مستقبلية في الفقرة."],
  },
];
