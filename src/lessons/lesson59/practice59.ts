// ============================================================
// Lesson 59 — التدريبات التسعة الأصلية بحلولها وتفسيراتها
// 1) اختيار من متعدد (10) · 2) Active→Passive (10) · 3) Passive→Active (8)
// 4) أكمل بالصيغة المناسبة (8) · 5) اختر المعنى الصحيح (5)
// 6) صحّح الأخطاء (8) · 7) حوّل إلى النفي (6) · 8) ترجم إلى الإنجليزية (10)
// 9) أكمل المحادثة (5)
// ============================================================

export type PracticeItem59 = {
  prompt: string;
  /** نص إضافي للسياق (سطر عربي أو تعليمات فرعية) */
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  /** ترجمة عربية للإجابة النهائية */
  ar?: string;
};

export type PracticeGroup59 = {
  id: string;
  title: string;
  instruction: string;
  items: PracticeItem59[];
};

export const PRACTICES_59: PracticeGroup59[] = [
  {
    id: "p1",
    title: "التدريب الأول: اختر الإجابة الصحيحة",
    instruction: "اختر الصيغة الصحيحة لإكمال الجملة، ثم تحقّق لتقرأ السبب.",
    items: [
      {
        prompt: "The work must ______ today.",
        options: ["finish", "be finished", "been finished"],
        answer: "be finished",
        why: "بعد must نستخدم be + V3.",
        ar: "يجب إنهاء العمل اليوم.",
      },
      {
        prompt: "The computer can ______ easily.",
        options: ["repair", "be repaired", "being repaired"],
        answer: "be repaired",
        why: "بعد can نستخدم be + V3.",
        ar: "يمكن إصلاح الحاسوب بسهولة.",
      },
      {
        prompt: "The rules should ______ by everyone.",
        options: ["be followed", "followed", "been followed"],
        answer: "be followed",
        why: "بعد should نستخدم be + V3.",
        ar: "ينبغي أن يتبع الجميع القواعد.",
      },
      {
        prompt: "The meeting might ______ tomorrow.",
        options: ["cancel", "be cancelled", "been cancelled"],
        answer: "be cancelled",
        why: "بعد might نستخدم be + V3.",
        ar: "قد يتم إلغاء الاجتماع غدًا.",
      },
      {
        prompt: "The road should have ______ last week.",
        options: ["repair", "be repaired", "been repaired"],
        answer: "been repaired",
        why: "لأن التركيب هو should have been + V3.",
        ar: "كان ينبغي إصلاح الطريق الأسبوع الماضي.",
      },
      {
        prompt: "The documents must have ______.",
        options: ["been signed", "be signed", "being signed"],
        answer: "been signed",
        why: "لأن التركيب هو must have been + V3.",
        ar: "لا بد أن الوثائق قد وُقّعت.",
      },
      {
        prompt: "The room needs ______.",
        options: ["to be cleaned", "to cleaned", "be clean"],
        answer: "to be cleaned",
        why: "لأن التركيب هو needs to be + V3.",
        ar: "الغرفة تحتاج إلى أن تُنظف.",
      },
      {
        prompt: "The new hospital is expected ______ next year.",
        options: ["to be opened", "be opened", "to opened"],
        answer: "to be opened",
        why: "لأن التركيب هو is expected to be + V3.",
        ar: "من المتوقع افتتاح المستشفى الجديد العام القادم.",
      },
      {
        prompt: "The car doesn't have to ______ today.",
        options: ["be repaired", "repaired", "been repaired"],
        answer: "be repaired",
        why: "لأن التركيب هو doesn't have to be + V3.",
        ar: "ليس من الضروري إصلاح السيارة اليوم.",
      },
      {
        prompt: "The information may ______ later.",
        options: ["announce", "be announced", "being announced"],
        answer: "be announced",
        why: "لأن التركيب هو may be + V3.",
        ar: "قد يتم الإعلان عن المعلومات لاحقًا.",
      },
    ],
  },
  {
    id: "p2",
    title: "التدريب الثاني: حوّل من Active إلى Passive",
    instruction: "اكتب الجملة كاملة في صيغة المبني للمجهول، مع الحفاظ على الفعل الناقص.",
    items: [
      {
        prompt: "They can solve this problem.",
        answer: "This problem can be solved.",
        why: "التركيب: can + be + V3.",
        ar: "يمكن حل هذه المشكلة.",
      },
      {
        prompt: "You must follow the instructions.",
        answer: "The instructions must be followed.",
        why: "التركيب: must + be + V3.",
        ar: "يجب اتباع التعليمات.",
      },
      {
        prompt: "The teacher should explain the rule.",
        answer: "The rule should be explained by the teacher.",
        why: "التركيب: should + be + V3.",
        ar: "ينبغي شرح القاعدة بواسطة المعلم.",
      },
      {
        prompt: "They may cancel the match.",
        answer: "The match may be cancelled.",
        why: "التركيب: may + be + V3.",
        ar: "قد يتم إلغاء المباراة.",
      },
      {
        prompt: "Someone could repair the machine.",
        answer: "The machine could be repaired.",
        why: "التركيب: could + be + V3.",
        ar: "كان من الممكن إصلاح الآلة.",
      },
      {
        prompt: "They should have completed the project.",
        answer: "The project should have been completed.",
        why: "التركيب: should + have been + V3.",
        ar: "كان ينبغي أن يكون المشروع قد أُنجز.",
      },
      {
        prompt: "Someone must have stolen the documents.",
        answer: "The documents must have been stolen.",
        why: "التركيب: must + have been + V3.",
        ar: "لا بد أن الوثائق قد سُرقت.",
      },
      {
        prompt: "They might have delayed the flight.",
        answer: "The flight might have been delayed.",
        why: "التركيب: might + have been + V3.",
        ar: "ربما تأخرت الرحلة.",
      },
      {
        prompt: "The workers have to clean the factory.",
        answer: "The factory has to be cleaned by the workers.",
        why: "التركيب: has to + be + V3؛ لأن factory مفرد.",
        ar: "يجب تنظيف المصنع بواسطة العمال.",
      },
      {
        prompt: "The school ought to improve the library.",
        answer: "The library ought to be improved by the school.",
        why: "التركيب: ought to + be + V3.",
        ar: "ينبغي تحسين المكتبة بواسطة المدرسة.",
      },
    ],
  },
  {
    id: "p3",
    title: "التدريب الثالث: حوّل من Passive إلى Active",
    instruction:
      "أعد الجملة إلى المبني للمعلوم. وعندما لا يُذكر الفاعل في Passive، اختر فاعلًا مناسبًا بحسب السياق (Someone / Everyone) — وقد لا نعرف الفاعل الأصلي تحديدًا.",
    items: [
      {
        prompt: "The problem can be solved.",
        answer: "Someone can solve the problem.",
        why: "الفاعل غير مذكور في الأصل؛ نستخدم Someone بوصفه فاعلًا افتراضيًا مناسبًا.",
        ar: "يمكن لشخص ما حل المشكلة.",
      },
      {
        prompt: "The rules must be followed.",
        answer: "Everyone must follow the rules.",
        why: "الالتزام بالقواعد يشمل الجميع؛ لذلك Everyone أنسب من Someone.",
        ar: "يجب على الجميع اتباع القواعد.",
      },
      {
        prompt: "The report should be checked by the manager.",
        answer: "The manager should check the report.",
        why: "الفاعل مذكور صراحةً بعد by، فننقله إلى أول الجملة ونحذف by.",
        ar: "ينبغي للمدير مراجعة التقرير.",
      },
      {
        prompt: "The meeting may be cancelled.",
        answer: "Someone may cancel the meeting.",
        why: "لفظ may يبقى كما هو، والفاعل الافتراضي في المقدمة.",
        ar: "قد يلغي شخص ما الاجتماع.",
      },
      {
        prompt: "The machine could have been repaired.",
        answer: "Someone could have repaired the machine.",
        why: "في الماضي نستخدم could have + V3 في المبني للمعلوم، لا could have been.",
        ar: "كان بإمكان شخص ما إصلاح الآلة.",
      },
      {
        prompt: "The documents should have been signed.",
        answer: "Someone should have signed the documents.",
        why: "should have been + V3 في المجهول تقابل should have + V3 في المعلوم.",
        ar: "كان ينبغي على شخص ما توقيع الوثائق.",
      },
      {
        prompt: "The room needs to be cleaned.",
        answer: "Someone needs to clean the room.",
        why: "needs to be + V3 تقابل needs to + V1 في المعلوم.",
        ar: "يحتاج شخص ما إلى تنظيف الغرفة.",
      },
      {
        prompt: "The new system is expected to be introduced soon.",
        answer: "The company is expected to introduce the new system soon.",
        why:
          "is expected to be + V3 تتحوّل إلى is expected to + V1. أما من يتوقع؟ فهم جهة غير مذكورة؛ نُبقي صيغة التوقع كما هي.",
        ar: "من المتوقع أن تقدّم الشركة النظام الجديد قريبًا.",
      },
    ],
  },
  {
    id: "p4",
    title: "التدريب الرابع: أكمل باستخدام الصيغة المناسبة",
    instruction: "استخدم الفعل الموجود بين القوسين وضعه في صيغة المبني للمجهول المناسبة — اكتب الصيغة فقط.",
    items: [
      { prompt: "The homework must ______ before tomorrow. (finish)", answer: "be finished", why: "must + be + V3.", ar: "يجب إنهاء الواجب قبل الغد." },
      { prompt: "The car can ______ by a mechanic. (repair)", answer: "be repaired", why: "can + be + V3.", ar: "يمكن إصلاح السيارة بواسطة فني." },
      { prompt: "The meeting might ______ next week. (cancel)", answer: "be cancelled", why: "might + be + V3.", ar: "قد يتم إلغاء الاجتماع الأسبوع القادم." },
      { prompt: "The documents should have ______ yesterday. (send)", answer: "been sent", why: "should have been + V3؛ وsend شاذة: send → sent.", ar: "كان ينبغي إرسال الوثائق أمس." },
      { prompt: "The machine needs to ______ immediately. (check)", answer: "be checked", why: "needs to be + V3.", ar: "تحتاج الآلة إلى أن تُفحص فورًا." },
      { prompt: "The new school is expected to ______ next year. (open)", answer: "be opened", why: "is expected to be + V3.", ar: "من المتوقع افتتاح المدرسة الجديدة العام القادم." },
      { prompt: "The rules ought to ______ by all students. (respect)", answer: "be respected", why: "ought to + be + V3.", ar: "ينبغي احترام القواعد من جميع الطلاب." },
      { prompt: "The money must have ______. (steal)", answer: "been stolen", why: "must have been + V3؛ وsteal شاذة: steal → stolen.", ar: "لا بد أن المال قد سُرق." },
    ],
  },
  {
    id: "p5",
    title: "التدريب الخامس: اختر المعنى الصحيح",
    instruction: "حدّد المعنى العربي الدقيق للجملة الإنجليزية. التركيب نفسه يحمل المعنى، لا الكلمات وحدها.",
    items: [
      {
        prompt: "The report must be completed.",
        options: ["ربما تم إنجاز التقرير.", "يجب إنجاز التقرير.", "كان ينبغي إنجاز التقرير."],
        answer: "يجب إنجاز التقرير.",
        why: "must be تعبّر عن الضرورة.",
        ar: "must be + V3 = ضرورة.",
      },
      {
        prompt: "The report must have been completed.",
        options: ["لا بد أن التقرير قد أُنجز.", "يجب إنجاز التقرير الآن.", "يمكن إنجاز التقرير."],
        answer: "لا بد أن التقرير قد أُنجز.",
        why: "must have been تعبّر عن الاستنتاج القوي بشأن الماضي.",
        ar: "must have been + V3 = استنتاج عن الماضي.",
      },
      {
        prompt: "The road should have been repaired.",
        options: ["ينبغي إصلاح الطريق.", "كان ينبغي إصلاح الطريق.", "قد يتم إصلاح الطريق."],
        answer: "كان ينبغي إصلاح الطريق.",
        why: "should have been تعبّر عن نصيحة أو واجب كان متعلقًا بالماضي.",
        ar: "should have been + V3 = ماضٍ.",
      },
      {
        prompt: "The machine might be repaired.",
        options: ["ربما يتم إصلاح الآلة.", "لا بد أن الآلة قد أُصلحت.", "يجب إصلاح الآلة."],
        answer: "ربما يتم إصلاح الآلة.",
        why: "might be تعبّر عن الاحتمال.",
        ar: "might be + V3 = احتمال.",
      },
      {
        prompt: "The documents don't have to be signed.",
        options: ["يجب توقيع الوثائق.", "يُمنع توقيع الوثائق.", "ليس من الضروري توقيع الوثائق."],
        answer: "ليس من الضروري توقيع الوثائق.",
        why: "don't have to تعني عدم الضرورة، ولا تعني المنع.",
        ar: "don't have to = عدم ضرورة · mustn't = منع.",
      },
    ],
  },
  {
    id: "p6",
    title: "التدريب السادس: صحّح الأخطاء",
    instruction: "اكتب الجملة الصحيحة كاملة بعد تصحيح الخطأ.",
    items: [
      { prompt: "The work must completed today.", answer: "The work must be completed today.", why: "ينقص be بين must وV3.", ar: "يجب إكمال العمل اليوم." },
      { prompt: "The car can be repair.", answer: "The car can be repaired.", why: "بعد be نستخدم V3 لا المصدر.", ar: "يمكن إصلاح السيارة." },
      { prompt: "The rules should have be followed.", answer: "The rules should have been followed.", why: "الصيغة الماضية تحتاج been لا be.", ar: "كان ينبغي اتباع القواعد." },
      { prompt: "The documents might been lost.", answer: "The documents might have been lost.", why: "been لا تأتي بعد might مباشرة؛ نحتاج have been.", ar: "ربما فُقدت الوثائق." },
      { prompt: "The room needs to cleaned.", answer: "The room needs to be cleaned.", why: "التركيب needs to be + V3، وbe واجبة.", ar: "تحتاج الغرفة إلى التنظيف." },
      { prompt: "The meeting is expected be cancelled.", answer: "The meeting is expected to be cancelled.", why: "expected to be + V3؛ to لا تُحذف.", ar: "من المتوقع إلغاء الاجتماع." },
      { prompt: "The machine must has been checked.", answer: "The machine must have been checked.", why: "بعد must نستخدم have، ولا نصرّفها إلى has.", ar: "لا بد أن الآلة قد فُحصت." },
      { prompt: "The road could have repaired.", answer: "The road could have been repaired.", why: "في المجهول: could have been + V3.", ar: "كان من الممكن إصلاح الطريق." },
    ],
  },
  {
    id: "p7",
    title: "التدريب السابع: حوّل إلى النفي",
    instruction: "اكتب الجملة منفية. انتبه إلى أن نفي must يعطي المنع، لا مجرد عدم الضرورة.",
    items: [
      {
        prompt: "The work must be completed.",
        answer: "The work must not be left unfinished.",
        why:
          "هذه هي صياغة المصدر الأولى: يجب ألا يُترك العمل غير مكتمل. ولأن must not be completed تعني «ممنوع إكمال العمل» أي عكس المقصود، فإن النفي الصحيح يحافظ على المنع مع بقاء المعنى. والمصدر يذكر بديلًا ثانيًا مختلف المعنى: The work doesn't have to be completed today. = ليس من الضروري إكمال العمل اليوم (عدم ضرورة، لا منع).",
        ar: "must not be = منع · doesn't have to be = عدم ضرورة.",
      },
      { prompt: "The car can be repaired.", answer: "The car cannot be repaired.", why: "cannot / can't + be + V3.", ar: "لا يمكن إصلاح السيارة." },
      { prompt: "The rules should be ignored.", answer: "The rules should not be ignored.", why: "should not + be + V3.", ar: "ينبغي ألّا يتم تجاهل القواعد." },
      { prompt: "The meeting may be cancelled.", answer: "The meeting may not be cancelled.", why: "may not + be + V3 يعطي «قد لا».", ar: "قد لا يتم إلغاء الاجتماع." },
      { prompt: "The documents should have been sent.", answer: "The documents should not have been sent.", why: "should not have been + V3.", ar: "لم يكن ينبغي إرسال الوثائق." },
      { prompt: "The machine might have been damaged.", answer: "The machine might not have been damaged.", why: "might not have been + V3.", ar: "ربما لم تتضرر الآلة." },
    ],
  },
  {
    id: "p8",
    title: "التدريب الثامن: ترجم إلى الإنجليزية",
    instruction: "اكتب الترجمة الإنجليزية كاملة، واختر التركيب الذي يحمل المعنى بدقة.",
    items: [
      { prompt: "يجب حماية البيئة.", answer: "The environment must be protected.", why: "ضرورة ⇒ must be + V3.", ar: "must be protected." },
      { prompt: "يمكن إصلاح هذه الآلة.", answer: "This machine can be repaired.", why: "إمكانية ⇒ can be + V3.", ar: "can be repaired." },
      { prompt: "ينبغي فحص الوثائق.", answer: "The documents should be checked.", why: "نصيحة ⇒ should be + V3.", ar: "should be checked." },
      { prompt: "قد يتم إلغاء الاجتماع.", answer: "The meeting may be cancelled.", why: "احتمال ⇒ may be + V3.", ar: "may be cancelled." },
      { prompt: "كان ينبغي إرسال الرسالة أمس.", answer: "The letter should have been sent yesterday.", why: "نصيحة عن الماضي ⇒ should have been + V3.", ar: "should have been sent." },
      { prompt: "لا بد أن الحاسوب قد سُرق.", answer: "The computer must have been stolen.", why: "استنتاج عن الماضي ⇒ must have been + V3.", ar: "must have been stolen." },
      { prompt: "من المتوقع افتتاح المستشفى العام القادم.", answer: "The hospital is expected to be opened next year.", why: "توقع ⇒ is expected to be + V3.", ar: "is expected to be opened." },
      { prompt: "تحتاج السيارة إلى الإصلاح.", answer: "The car needs to be repaired.", why: "حاجة ⇒ needs to be + V3.", ar: "needs to be repaired." },
      { prompt: "ليس من الضروري طباعة التقرير اليوم.", answer: "The report doesn't have to be printed today.", why: "عدم ضرورة ⇒ doesn't have to be + V3.", ar: "doesn't have to be printed." },
      { prompt: "كان من الممكن تجنّب هذا الخطأ.", answer: "This mistake could have been avoided.", why: "إمكانية ماضية ⇒ could have been + V3.", ar: "could have been avoided." },
    ],
  },
  {
    id: "p9",
    title: "التدريب التاسع: أكمل المحادثة",
    instruction: "اختر الكلمة المناسبة لكل فراغ من البنك: be added · be completed · be finished · be checked · be provided.",
    items: [
      {
        prompt: "Manager: The report must ______ today.",
        hint: "الفراغ بعد must مباشرة",
        options: ["be added", "be completed", "be provided"],
        answer: "be completed",
        why: "must + be + V3: إكمال التقرير هو الهدف الأساسي في السياق.",
        ar: "يجب إكمال التقرير اليوم.",
      },
      {
        prompt: "Manager: Can it ______ before 5 p.m.?",
        hint: "السؤال عن إمكانية الإنهاء",
        options: ["be finished", "be checked", "be added"],
        answer: "be finished",
        why: "Can + it + be + V3؟ والإنهاء قبل الخامسة هو المقصود.",
        ar: "هل يمكن إنهاؤه قبل الخامسة مساءً؟",
      },
      {
        prompt: "Assistant: Yes, but some information needs to ______.",
        hint: "needs to + الفراغ",
        options: ["be added", "be provided", "be completed"],
        answer: "be added",
        why: "needs to be + V3؛ والمعلومات الناقصة تُضاف.",
        ar: "نعم، ولكن بعض المعلومات تحتاج إلى أن تُضاف.",
      },
      {
        prompt: "Manager: The missing information should ______ immediately.",
        hint: "should + الفراغ",
        options: ["be provided", "be checked", "be finished"],
        answer: "be provided",
        why: "should be + V3؛ والمعلومات الناقصة تُقدَّم.",
        ar: "ينبغي تقديم المعلومات الناقصة فورًا.",
      },
      {
        prompt: "Assistant: It may ______ by the research team.",
        hint: "may + الفراغ",
        options: ["be provided", "be added", "be completed"],
        answer: "be provided",
        why: "may be + V3؛ والفاعل المذكور after by هو فريق البحث الذي يقدّمها.",
        ar: "قد يتم تقديمها بواسطة فريق البحث.",
      },
    ],
  },
];

// ------------------------------------------------------------
// الاختبار الأصلي — 25 سؤالًا (5 مجموعات) كما ورد في المصدر
// ------------------------------------------------------------

export type OriginalQuestion59 = {
  n: number;
  section: string;
  prompt: string;
  options?: string[];
  answer: string;
  why: string;
  ar?: string;
};

export const ORIGINAL_TEST_59: OriginalQuestion59[] = [
  { n: 1, section: "اختر الإجابة الصحيحة", prompt: "The rules must ______.", options: ["followed", "be followed", "been followed"], answer: "be followed", why: "بعد must نستخدم be + V3.", ar: "يجب اتباع القواعد." },
  { n: 2, section: "اختر الإجابة الصحيحة", prompt: "This machine can ______ easily.", options: ["be repaired", "repaired", "been repaired"], answer: "be repaired", why: "can + be + V3.", ar: "يمكن إصلاح هذه الآلة بسهولة." },
  { n: 3, section: "اختر الإجابة الصحيحة", prompt: "The meeting might ______ tomorrow.", options: ["cancel", "be cancelled", "been cancelled"], answer: "be cancelled", why: "might + be + V3.", ar: "قد يتم إلغاء الاجتماع غدًا." },
  { n: 4, section: "اختر الإجابة الصحيحة", prompt: "The report should have ______ yesterday.", options: ["be submitted", "submitted", "been submitted"], answer: "been submitted", why: "should have been + V3.", ar: "كان ينبغي تسليم التقرير أمس." },
  { n: 5, section: "اختر الإجابة الصحيحة", prompt: "The documents must have ______.", options: ["been signed", "be signed", "being signed"], answer: "been signed", why: "must have been + V3.", ar: "لا بد أن الوثائق قد وُقّعت." },
  { n: 6, section: "اختر الإجابة الصحيحة", prompt: "The room needs to ______.", options: ["clean", "be cleaned", "been cleaned"], answer: "be cleaned", why: "needs to be + V3.", ar: "تحتاج الغرفة إلى التنظيف." },
  { n: 7, section: "اختر الإجابة الصحيحة", prompt: "The new hospital is expected ______ next year.", options: ["to be opened", "be opened", "to opened"], answer: "to be opened", why: "is expected to be + V3.", ar: "من المتوقع افتتاح المستشفى الجديد العام القادم." },
  { n: 8, section: "اختر الإجابة الصحيحة", prompt: "The car doesn't have to ______ today.", options: ["be repaired", "repaired", "been repaired"], answer: "be repaired", why: "doesn't have to be + V3.", ar: "ليس من الضروري إصلاح السيارة اليوم." },
  { n: 9, section: "اختر الإجابة الصحيحة", prompt: "The problem could have ______.", options: ["solved", "been solved", "be solved"], answer: "been solved", why: "could have been + V3.", ar: "كان من الممكن حل المشكلة." },
  { n: 10, section: "اختر الإجابة الصحيحة", prompt: "The information may ______ later.", options: ["be announced", "announced", "been announced"], answer: "be announced", why: "may be + V3.", ar: "قد يتم الإعلان عن المعلومات لاحقًا." },

  { n: 11, section: "حوّل إلى Passive", prompt: "They must protect the environment.", answer: "The environment must be protected.", why: "must + be + V3.", ar: "يجب حماية البيئة." },
  { n: 12, section: "حوّل إلى Passive", prompt: "Someone can repair this computer.", answer: "This computer can be repaired.", why: "can + be + V3، والفاعل المجهول يُحذف.", ar: "يمكن إصلاح هذا الحاسوب." },
  { n: 13, section: "حوّل إلى Passive", prompt: "The teacher should explain the lesson.", answer: "The lesson should be explained by the teacher.", why: "should + be + V3، والفاعل المذكور ينتقل بعد by.", ar: "ينبغي شرح الدرس بواسطة المعلم." },
  { n: 14, section: "حوّل إلى Passive", prompt: "They might cancel the event.", answer: "The event might be cancelled.", why: "might + be + V3.", ar: "قد يتم إلغاء الفعالية." },
  { n: 15, section: "حوّل إلى Passive", prompt: "Someone should have informed the manager.", answer: "The manager should have been informed.", why: "should have been + V3.", ar: "كان ينبغي إبلاغ المدير." },

  { n: 16, section: "حوّل إلى Active", prompt: "The rules must be followed.", answer: "Everyone must follow the rules.", why: "الفاعل غير مذكور؛ Everyone مناسب هنا.", ar: "يجب على الجميع اتباع القواعد." },
  { n: 17, section: "حوّل إلى Active", prompt: "The machine could have been repaired.", answer: "Someone could have repaired the machine.", why: "could have been + V3 ⇒ could have + V3.", ar: "كان بإمكان شخص ما إصلاح الآلة." },
  { n: 18, section: "حوّل إلى Active", prompt: "The report should be checked by the manager.", answer: "The manager should check the report.", why: "الفاعل مذكور بعد by، فيُعاد إلى أول الجملة.", ar: "ينبغي للمدير مراجعة التقرير." },

  { n: 19, section: "صحّح الخطأ", prompt: "The work must finished today.", answer: "The work must be finished today.", why: "ينقص be بين must وV3.", ar: "يجب إكمال العمل اليوم." },
  { n: 20, section: "صحّح الخطأ", prompt: "The road should have been repair.", answer: "The road should have been repaired.", why: "بعد been نستخدم V3 لا المصدر.", ar: "كان ينبغي إصلاح الطريق." },
  { n: 21, section: "صحّح الخطأ", prompt: "The meeting might been cancelled.", answer: "The meeting might have been cancelled.", why: "التركيب might have been + V3.", ar: "قد يكون الاجتماع قد أُلغي." },
  { n: 22, section: "صحّح الخطأ", prompt: "The room needs to cleaned.", answer: "The room needs to be cleaned.", why: "needs to be + V3.", ar: "تحتاج الغرفة إلى التنظيف." },

  { n: 23, section: "الترجمة", prompt: "يجب عدم تجاهل هذه التعليمات.", answer: "These instructions must not be ignored.", why: "المنع ⇒ must not be + V3.", ar: "must not be ignored." },
  { n: 24, section: "الترجمة", prompt: "من المتوقع الإعلان عن النتائج غدًا.", answer: "The results are expected to be announced tomorrow.", why: "التوقع ⇒ are expected to be + V3 (results جمع).", ar: "are expected to be announced." },
  { n: 25, section: "الترجمة", prompt: "لا بد أن الوثائق قد سُرقت.", answer: "The documents must have been stolen.", why: "استنتاج عن الماضي ⇒ must have been + V3.", ar: "must have been stolen." },
];

export const PRACTICE_TOTALS_59 = PRACTICES_59.reduce((n, g) => n + g.items.length, 0);
