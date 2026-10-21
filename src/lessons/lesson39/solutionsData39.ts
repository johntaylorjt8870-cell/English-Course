export type TestSolution39 = {
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
 * نصّ المصدر §35 يعرض أسئلة الاختبار النهائي دون مفتاح إجابة، و§36 يذكر
 * العنوان وعبارة «عرض الحلول التفصيلية» فقط. لذلك كل إجابة وتفسير أدناه من
 * إعداد المنصة، مكتوبة على أساس أمثلة المصدر وقواعده في الأقسام 1–34،
 * وتُميَّز بوضوح داخل واجهتَي الحلول والمعلم.
 */
export const TEST_SOLUTIONS_39: TestSolution39[] = [
  {
    n: 1, level: 1, answer: "B. been", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "التركيب الثابت: will + have + been + V-ing. فتكتمل الجملة: By 8:00, I will have been studying for three hours.",
    alternatives: ["A. be صيغة أساسية لا تصلح بعد have.", "C. being ليست التصريف الثالث من be؛ المطلوب been (§27 ②)."],
  },
  {
    n: 2, level: 1, answer: "C. working", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد been يأتي الفعل مع ing: She will have been working for five hours by noon.",
    alternatives: ["A. work صيغة أساسية (خطأ §27 ③).", "B. worked تصريف ثالث لا يُستخدم في الصيغة المستمرة هنا."],
  },
  {
    n: 3, level: 1, answer: "C. Will", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال نعم/لا يُبنى بنقل will قبل الفاعل: Will they have been travelling for ten hours by midnight? (§21).",
    alternatives: ["A. Do وB. Are لا تُستخدمان لبناء سؤال Future Perfect Continuous."],
  },
  {
    n: 4, level: 1, answer: "C. waiting", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "النفي: Subject + won't + have + been + V-ing: He won't have been waiting for long. (§19).",
    alternatives: ["A. wait وB. waited لا تصلحان بعد have been."],
  },
  {
    n: 5, level: 1, answer: "B. learning", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By next year نقطة مرجع مستقبلية، والصيغة will have been + V-ing: we will have been learning English for two years.",
    alternatives: ["A. learn صيغة أساسية، وC. learned تصريف ثالث؛ كلاهما خطأ بعد have been."],
  },
  {
    n: 6, level: 2, answer: "will have been studying", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By 9:00 نقطة مرجع، والمدة for four hours: I will have been studying for four hours. (نمط التدريب في §30).",
    alternatives: ["will have studied صحيحة نحويًا لكنها تبرز اكتمال الدراسة لا مدة الأربع ساعات (§33)."],
  },
  {
    n: 7, level: 2, answer: "will have been working", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By next June + مدة (for five years): she will have been working here for five years. (نمط §8).",
    alternatives: ["will have worked ممكنة في السياق نفسه؛ النموذج المطلوب هنا هو المستمر لأن التركيز على المدة."],
  },
  {
    n: 8, level: 2, answer: "won't have been travelling", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "النفي: Subject + won't + have + been + V-ing: They won't have been travelling for long when we meet them.",
    alternatives: ["will not have been travelling مقبول كذلك.", "لا تُقبل won't has been travelling (§27 ④)."],
  },
  {
    n: 9, level: 2, answer: "Will he have been waiting", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "السؤال: Will + Subject + have + been + V-ing?: Will he have been waiting for an hour by noon?",
    alternatives: ["حذف been أو have يجعل السؤال غير مكتمل التركيب.", "How long will she has been… خطأ لأن will يتبعها have (§32 ⑧)."],
  },
  {
    n: 10, level: 2, answer: "will have been preparing", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By the time the teacher arrives جملة زمنية بـ Present Simple، والرئيسية Future Perfect Continuous لأن المدة مذكورة (for two hours): we will have been preparing for the exam for two hours. (§13–§14).",
    alternatives: ["will have prepared تبرز اكتمال التحضير بدل مدته؛ كلاهما ممكن بحسب المعنى المطلوب (§33)."],
  },
  {
    n: 11, level: 3, answer: "I will have been studying for three hours.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الخطأ: being بدل been. الجزء الثابت هو التصريف الثالث من be: been (§27 ②).",
    alternatives: ["أي تصحيح يحفظ will have been studying مقبول."],
  },
  {
    n: 12, level: 3, answer: "She will have been working here for five years.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "لا تأتي has بعد will؛ المطلوب have، وتبقى الصيغة ثابتة مع She (§4 · §5 · §27 ①).",
    alternatives: ["She will have worked here for five years صحيحة نحويًا لكنها تغيّر التركيز من المدة إلى الإنجاز."],
  },
  {
    n: 13, level: 3, answer: "They won't have been travelling for long.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "بعد been يأتي V-ing: travelling لا travel (§32 ③).",
    alternatives: ["traveling بـ l واحدة مقبول في الإملاء الأمريكي؛ المصدر يستخدم travelling."],
  },
  {
    n: 14, level: 3, answer: "Will he have been waiting for an hour?", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "be خطأ؛ المطلوب been في السؤال أيضًا: Will + Subject + have + been + V-ing? (§21 · §32 ④).",
  },
  {
    n: 15, level: 3, answer: "By the time you arrive, I will have been studying.", judgment: "grammatical-repair", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الجملة الزمنية المستقبلية بعد by the time تستخدم Present Simple: you arrive لا you will arrive (§14 · §27 ⑥).",
    alternatives: ["القاعدة تخص الجملة الزمنية المستقبلية؛ في السرد الماضي نقول: By the time he arrived, I had been studying."],
  },
  {
    n: 16, level: 4, answer: "الأولى Future Perfect وتبرز اكتمال التقرير بحلول الثامنة، والثانية Future Perfect Continuous وتبرز مدة العمل على التقرير (ثلاث ساعات) حتى الثامنة.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "الفرق فرق تركيز لا صحة نحوية: Future Perfect = الإنجاز أو النتيجة، Future Perfect Continuous = مدة النشاط الممتدة حتى نقطة المرجع (§12 · §16 · §18).",
    alternatives: [
      "يُقبل أي شرح يذكر أن الأولى عن اكتمال التقرير والثانية عن مدة العمل عليه.",
      "لا يُرفض جواب يذكر أن الجملتين صحيحتان مع اختلاف التركيز (§33).",
      "لا يُقبل الجواب الذي يقول إن المستقبل التام يعني حتمًا أن النشاط توقف والمستقبل التام المستمر يعني حتمًا أنه لم يتوقف (§18).",
    ],
  },
  {
    n: 17, level: 4, answer: "لا. الزمن يبرز المدة الممتدة حتى نقطة المرجع، ولا يضمن استمرار النشاط بعدها.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "المصدر §7 و§18: By 8:00, I will have been studying for four hours لا تخبرنا وحدها هل سأتوقف عند الثامنة أم سأتابع الدراسة؛ قد أتوقف وقد أستمر حتى التاسعة.",
    alternatives: [
      "يُقبل أي جواب ينفي الضمان ويذكر أن التركيز على المدة عند نقطة المرجع.",
      "يُقبل أيضًا ذكر أن السياق (لا الصيغة) هو الذي يحدد هل يستمر النشاط.",
    ],
  },
  {
    n: 18, level: 4, answer: "نعم. مثال: By next year, I will have worked here for ten years.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "§33: وجود for لا يفرض Future Perfect Continuous دائمًا. الأولى تنظر إلى المدة بوصفها فترة ستكون قد اكتملت بحلول نقطة مستقبلية، والثانية (will have been working) تبرز امتداد النشاط.",
    alternatives: [
      "By June, she will have lived here for five years. مثال مصدر آخر مقبول (§33).",
      "By next year, I will have known her for ten years. مثال مقبول أيضًا لأنه فعل حالة (§26).",
      "الجواب الذي يقول «لا» يخالف القاعدة المتقدمة في المصدر.",
    ],
  },
  {
    n: 19, level: 4, answer: "لأن الجمل الزمنية المستقبلية التي تبدأ بـ by the time تستخدم عادةً Present Simple رغم أن معناها مستقبلي.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "§14: By the time you arrive, I will have been studying for two hours. ✅ — By the time you will arrive… ❌. التركيب: By the time + Subject + Present Simple, Subject + will have been + V-ing.",
    alternatives: [
      "يُقبل ذكر التركيب نفسه أو ذكر أن will تبقى في الجملة الرئيسية فقط.",
      "يُقبل التنبيه إلى أن القاعدة تخص التركيب المستقبلي، لا كل استعمال لكلمات by the time (في الماضي: By the time he arrived, I had been waiting).",
    ],
  },
  {
    n: 20, level: 4, answer: "لأن know فعل حالة في معنى المعرفة، وأفعال الحالة لا تُستخدم عادةً في الأزمنة المستمرة؛ فنقول: I will have known him for ten years.", judgment: "open-model", sourceStatus: "platform-authored-teacher-addition",
    explanation: "§26 و§27 ⑦: By next year, I will have known her for ten years. ✅ مقابل I will have been knowing her for ten years. ❌ في الاستعمال المعتاد.",
    alternatives: [
      "يُقبل ذكر أفعال حالة أخرى من قائمة المصدر: believe · understand · want · need · own.",
      "يُقبل التنبيه إلى أن بعض الأفعال مثل live وwork تسمح بالزمنين بحسب المعنى (§26).",
    ],
  },
  {
    n: 21, level: 5, answer: "will have been working", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By then نقطة مرجع مستقبلية مع مدة (for six months) ونشاط ممتد: the students will have been working on their projects for six months.",
    alternatives: ["will have worked صحيحة نحويًا لكنها تبرز اكتمال الفترة لا امتداد النشاط (§33)."],
  },
  {
    n: 22, level: 5, answer: "will have completed", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "three experiments عدد مكتمل بحلول نهاية الشهر، فالتركيز على النتيجة: Maya will have completed three experiments by the end of the month.",
    alternatives: ["will have been completing لا تناسب عدّ الإنجازات المكتملة؛ التركيز هنا على العدد لا على المدة."],
  },
  {
    n: 23, level: 5, answer: "will be presenting", judgment: "contextual", sourceStatus: "platform-authored-teacher-addition",
    explanation: "At 10:00 on the celebration day لحظة محددة داخل نشاط جارٍ، لا موعد اكتمال ولا مدة مقاسة: Future Continuous — Daniel will be presenting his new invention. هذا هو الفخ الذهبي للفقرة: at مقابل by.",
    alternatives: [
      "will have presented ممكنة إذا قصدنا نتيجة مكتملة عند العاشرة؛ لا تفرض at الزمن وحدها. النموذج هنا نشاط جارٍ.",
      "will have been presenting تحتاج إلى سياق يوضح النشاط الممتد قبل العاشرة؛ عدم ذكر مدة صريحة لا يجعلها غير نحوية.",
      "will present صحيحة نحويًا لكنها أقل ملاءمة لوصف النشاط الجاري في تلك اللحظة (الدرس 37).",
    ],
  },
  {
    n: 24, level: 5, answer: "will have been preparing", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "By the time the visitors arrive جملة زمنية بـ Present Simple، والمدة for several hours تجعل التركيز على الامتداد: the teachers will have been preparing the exhibition for several hours.",
    alternatives: ["will have prepared ممكنة لو كان التركيز على اكتمال التحضير بدل مدته."],
  },
  {
    n: 25, level: 5, answer: "How long will you have been developing these projects by next month?", judgment: "grammatical-only", sourceStatus: "platform-authored-teacher-addition",
    explanation: "سؤال المدة: How long + will + Subject + have + been + V-ing? فالترتيب الدقيق هو How long will you have been developing… — will قبل الفاعل you، ثم have been developing (§23).",
    alternatives: [
      "How long will you have developed these projects by next month? صحيحة نحويًا لكنها Future Perfect وتبرز اكتمال الفترة لا امتداد التطوير.",
      "لا تُقبل How long you will have been developing… لأن السؤال يقتضي تقديم will على الفاعل.",
      "لا تُقبل How long will you have being developing… (§27 ② · §32 ⑧).",
    ],
  },
];
