import type { FinalTestQuestion } from "../../shared/finalTest";

// ============================================================
// Lesson 60 — Final Test (الاختبار النهائي المشترك) · 15 سؤالًا
//
// تغطي الدرس كله لا قاعدة واحدة: Backshift لكل الأزمنة،
// said/told، الضمائر، الزمان والمكان، الأفعال الناقصة،
// الاستثناءات الثلاثة، والأخطاء الشائعة، والتحويل والترجمة.
//
// الأسئلة الخمسة والعشرون الأصلية محفوظة كاملة في محطة
// «الاختبار الأصلي» + مفتاحها، ومجموعة الـ15 هذه لا تستبدلها:
// بعضها يقيس المفاهيم نفسها بصياغات جديدة، وبعضها يختبر
// مهارات لا يقيسها الاختبار الأصلي (التوصيل، الترتيب، اكتشاف
// مقطع الخطأ، صح/خطأ) وفق أنواع المحرك المشترك.
// ============================================================

export const TEST_60: FinalTestQuestion[] = [
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة في الكلام المنقول:",
    en: 'He said, "I am tired." → He said that he ______ tired.',
    options: ["is", "was", "were"],
    answer: 1,
    why: "بعد said نطبّق Backshift: المضارع البسيط am يرجع خطوة إلى الماضي كان was.",
    concept: "Present Simple → Past Simple",
    trap: "إبقاء is لأن الجملة تبدو صحيحة المعنى.",
  },
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة:",
    en: 'Sara said, "I am cooking dinner." → Sara said that she ______ dinner.',
    options: ["is cooking", "was cooking", "had cooked"],
    answer: 1,
    why: "المضارع المستمر يرجع إلى الماضي المستمر: am cooking → was cooking.",
    concept: "Present Continuous → Past Continuous",
    trap: "القفز إلى الماضي التام had cooked — الرجوع خطوة واحدة فقط.",
  },
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة:",
    en: 'Ali said, "I have finished my homework." → Ali said that he ______ his homework.',
    options: ["has finished", "had finished", "finished"],
    answer: 1,
    why: "المضارع التام يرجع إلى الماضي التام: have finished → had finished.",
    concept: "Present Perfect → Past Perfect",
    trap: "اختيار الماضي البسيط finished وحده فيفقد التمام.",
  },
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة:",
    en: 'They said, "We bought this house last year." → They said that they ______ that house the previous year.',
    options: ["bought", "buy", "had bought"],
    answer: 2,
    why: "الماضي البسيط يرجع إلى الماضي التام: bought → had bought، وthis → that، وlast year → the previous year.",
    concept: "Past Simple → Past Perfect",
    trap: "إبقاء bought لأنها جملة ماضية أصلًا — الرجوع ما زال مطلوبًا بعد said.",
  },
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة:",
    en: 'He said, "I was working." → He said that he ______.',
    options: ["was working", "had worked", "had been working"],
    answer: 2,
    why: "الماضي المستمر يرجع إلى الماضي التام المستمر: was working → had been working.",
    concept: "Past Continuous → Past Perfect Continuous",
    trap: "اختيار had worked فيتحول المعنى من الاستمرارية إلى التمام.",
  },
  {
    type: "single",
    ar: "اختر التركيب الصحيح:",
    en: 'Sara said, "I will travel tomorrow." → Sara said that she ______ travel ______.',
    options: ["will — tomorrow", "would — the following day", "would — tomorrow"],
    answer: 1,
    why: "will → would، وtomorrow → the following day عندما يتغير يوم النقل.",
    concept: "will → would + تغيير الزمان",
    trap: "تحويل الفعل ونسيان كلمة الزمان معه.",
  },
  {
    type: "single",
    ar: "أكمل بفعل النقل الصحيح:",
    en: "Ahmed ______ me that he was tired.",
    options: ["said", "told", "say"],
    answer: 1,
    why: "بوجود الشخص (me) بعد الفعل نستخدم told؛ أما said فلا يأتي بعده الشخص مباشرةً.",
    concept: "said مقابل told",
    trap: "قول Ahmed said me — تركيب غير صحيح في الإنجليزية.",
  },
  {
    type: "error",
    ar: "أي مقطع في هذه الجملة هو الخاطئ؟",
    en: "He told that he was busy.",
    segments: ["He ", "told ", "that he was busy."],
    answer: 1,
    why: "told تحتاج إلى ذكر الشخص الذي تلقّى الكلام: He told me that he was busy، أو نستخدم said مكانها.",
    concept: "told + الشخص",
    trap: "الظن أن الخطأ في الجملة التابعة، بينما المشكلة في غياب الشخص بعد told.",
  },
  {
    type: "single",
    ar: 'الجملة المنقولة الصحيحة من: My father said to me, "You are a good student."',
    options: [
      "My father told me that I was a good student.",
      "My father told me that you were a good student.",
      "My father said me that I was a good student.",
    ],
    answer: 0,
    why: "المخاطَب هو «أنا» (الراوي)، لذلك You → I؛ ومع ذكر الشخص نستخدم told me.",
    concept: "تغيير الضمائر بحسب المخاطَب",
    trap: "إبقاء you كما هي فتضيع الإشارة إلى الراوي.",
  },
  {
    type: "match",
    ar: "صِل كل كلمة من كلام مباشر بصيغتها في الكلام المنقول:",
    pairs: [
      { left: "now", right: "then" },
      { left: "today", right: "that day" },
      { left: "tomorrow", right: "the following day" },
      { left: "yesterday", right: "the previous day" },
      { left: "here", right: "there" },
    ],
    why: "هذه التحويلات تحدث عندما يتغير زمان النقل أو مكانه عن زمان الكلام الأصلي ومكانه.",
    concept: "تغيير كلمات الزمان والمكان",
    trap: "حفظ الجدول آليًا دون الانتباه إلى أن التغيير يتبع تغيّر السياق.",
  },
  {
    type: "single",
    ar: "اختر نقل الجملة العلمية الصحيح:",
    en: 'The teacher said, "Water boils at 100°C."',
    options: [
      "The teacher said that water boiled at 100°C.",
      "The teacher said that water boils at 100°C.",
      "The teacher said that water had boiled at 100°C.",
    ],
    answer: 1,
    why: "الحقائق العلمية الثابتة يمكن إبقاؤها في المضارع حتى بعد said.",
    concept: "استثناء: الحقائق العامة",
    trap: "تطبيق الرجوع آليًا على حقيقة ثابتة.",
  },
  {
    type: "tf",
    ar: 'صح أم خطأ: عندما نقول «Sara says, "I am tired."» ينبغي نقلها بقولنا Sara says that she was tired.',
    answer: false,
    why: "فعل النقل هنا في المضارع (says)، فلا نحتاج عادةً إلى إرجاع الزمن: Sara says that she is tired.",
    concept: "استثناء: فعل النقل في المضارع",
    trap: "تطبيق Backshift مع says كما لو كانت said.",
  },
  {
    type: "typed",
    ar: "أكمل بصيغة الفعل المناسبة:",
    en: 'Ali said, "I must study." → Ali said that he ______ study.',
    before: "Ali said that he",
    after: "study.",
    accept: ["had to"],
    why: "must المعبّرة عن الالتزام تتحول غالبًا إلى had to في الكلام المنقول.",
    concept: "must → had to (الالتزام)",
    trap: "كتابة musted أو musted to — must لا تتصرف كفعل عادي.",
  },
  {
    type: "order",
    ar: "رتّب المقاطع لبناء الجملة المنقولة الصحيحة:",
    items: ["Sara", "told Ali", "that he was", "her best friend."],
    why: 'من «Sara said to Ali, "You are my best friend."» — said to Ali تصبح told Ali، وYou تصبح he، وmy تصبح her.',
    concept: "بناء الجملة المنقولة كاملة",
    trap: "نسيان انتقال الشخص المخاطَب إلى told + Ali قبل that.",
  },
  {
    type: "multi",
    ar: "اختر كل الأفعال الناقصة التي تبقى كما هي في الكلام المنقول:",
    options: ["should", "could", "can", "would"],
    answers: [0, 1, 3],
    why: "could وshould وwould (ومعها might وought to) لا ترجع إلى صيغة أقدم؛ أما can فتتحول إلى could.",
    concept: "الأفعال الناقصة الثابتة",
    trap: "إدخال can مع الثابتة، أو محاولة تحويل should إلى اشتقاق غير موجود.",
  },
];

export const TEST_60_COUNT = TEST_60.length;
