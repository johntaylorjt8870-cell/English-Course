import type { FinalTestQuestion } from "../../shared/finalTest";

// ============================================================
// Lesson 59 — Final Test (الاختبار النهائي المشترك) · 15 سؤالًا
//
// 15 سؤالًا تغطي الدرس كله لا قاعدة واحدة: modal + be + V3،
// have to / ought to، Modal Perfect Passive، needs to be،
// supposed / expected to be، causative، الفروق الدلالية،
// الأخطاء الشائعة، والتحويل والترجمة.
//
// الأسئلة الخمسة والعشرون الأصلية محفوظة كاملة في محطة
// «الاختبار الأصلي» + مفتاحه، ومجموعة الـ15 هذه لا تستبدلها:
// عشرة أسئلة هنا مأخوذة من الاختبار الأصلي، وخمسة أسئلة
// إضافية تغطي ما لا يغطيه الاختبار الأصلي (have to/ought to،
// supposed to be، causative، don't have to vs mustn't،
// استنتاج الماضي مقابل الضرورة). العشرة الأصلية المتبقية
// متاحة في مراجعة الاختبار الأصلي ومفتاحه.
// ============================================================

export const TEST_59: FinalTestQuestion[] = [
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة بعد الفعل الناقص:",
    en: "The work must ______ today.",
    options: ["finish", "be finished", "been finished"],
    answer: 1,
    why: "بعد must نستخدم be مباشرة، ثم التصريف الثالث: must be finished.",
    concept: "Modal + be + V3",
    trap: "استخدام المصدر finish أو been بدون have.",
  },
  {
    type: "single",
    ar: "اختر الصيغة الصحيحة للسؤال:",
    en: "______ this computer be repaired?",
    options: ["Can", "Does", "Is"],
    answer: 0,
    why: "سؤال المبني للمجهول مع modal: Can + Subject + be + V3? — الفعل الناقص نفسه ينتقل إلى أول الجملة.",
    concept: "السؤال مع Modal Passive",
    trap: "إضافة does أو is لأن الجملة تبدو عادية.",
  },
  {
    type: "single",
    ar: "اختر صيغة النصيحة عن الماضي:",
    en: "The road should have ______ last week.",
    options: ["repair", "be repaired", "been repaired"],
    answer: 2,
    why: "التركيب should have been + V3 يعبّر عن شيء كان ينبغي أن يحدث في الماضي.",
    concept: "SHOULD HAVE BEEN + V3",
    trap: "الاكتفاء بـ be repaired ونسيان been.",
  },
  {
    type: "single",
    ar: "اختر التركيب الصحيح للاستنتاج عن الماضي:",
    en: "The documents must have ______.",
    options: ["been signed", "be signed", "being signed"],
    answer: 0,
    why: "must have been + V3 تعني «لا بد أن…»، أي استنتاج قوي عن الماضي لا أمرًا.",
    concept: "MUST HAVE BEEN + V3",
    trap: "الخلط بين must be (ضرورة) وmust have been (استنتاج).",
  },
  {
    type: "single",
    ar: "اختر التركيب الصحيح مع needs:",
    en: "The room needs ______.",
    options: ["to be cleaned", "to cleaned", "be clean"],
    answer: 0,
    why: "need / needs to be + V3 هو التركيب الصحيح؛ to ثم be ثم V3.",
    concept: "NEEDS TO BE + V3",
    trap: "حذف be بعد to، أو استخدام to + V3 مباشرة.",
  },
  {
    type: "single",
    ar: "اختر التركيب الصحيح للتوقع:",
    en: "The new hospital is expected ______ next year.",
    options: ["to be opened", "be opened", "to opened"],
    answer: 0,
    why: "is expected to be + V3. كلمة to جزء من التركيب ولا تُحذف.",
    concept: "BE EXPECTED TO BE + V3",
    trap: "حذف to أو حذف be.",
  },
  {
    type: "single",
    ar: "اختر التركيب الصحيح لعدم الضرورة:",
    en: "The report doesn't have to ______ today.",
    options: ["be submitted", "submitted", "been submitted"],
    answer: 0,
    why: "doesn't have to be + V3؛ ونفي have to يعطي عدم الضرورة، لا المنع.",
    concept: "HAVE TO — النفي",
    trap: "استخدام V3 وحدها بعد have to.",
  },
  {
    type: "single",
    ar: "أي جملة تعبّر عن ضرورة قوية الآن (وليس استنتاجًا عن الماضي)؟",
    en: "The door ______.",
    options: ["must be locked", "must have been locked", "should have been locked"],
    answer: 0,
    why: "must be + V3 = ضرورة أو حالة مطلوبة. أما must have been فقد تكون استنتاجًا عن الماضي.",
    concept: "MUST BE مقابل MUST HAVE BEEN",
    trap: "اختيار must have been لأن الفعل ماضٍ في العربية.",
  },
  {
    type: "single",
    ar: "أي جملة تعني «ليس من الضروري» وليست «ممنوعًا»؟",
    en: "The form ______ today.",
    options: ["mustn't be signed", "doesn't have to be signed", "can't be signed"],
    answer: 1,
    why: "doesn't have to be + V3 = عدم ضرورة. أما mustn't / can't فتعطيان المنع أو الاستحالة.",
    concept: "DON'T HAVE TO مقابل MUSTN'T",
    trap: "اعتبار الصيغتين مترادفتين.",
  },
  {
    type: "single",
    ar: "أي جملة تعبّر عن causative (رتّبتُ أن يفعلها غيري)؟",
    en: "______",
    options: ["The car was repaired.", "I had the car repaired.", "The car must be repaired."],
    answer: 1,
    why: "have / get + object + V3 تعني أن صاحب الجملة رتّب تنفيذ الخدمة بواسطة شخص آخر.",
    concept: "HAVE / GET SOMETHING DONE",
    trap: "خلط causative بالمبني للمجهول العادي.",
  },
  {
    type: "single",
    ar: "أكمل بالتركيب الصحيح للافتراض وفق ترتيب:",
    en: "These rules ______ by everyone.",
    options: ["are supposed to be followed", "are supposed to followed", "suppose to be followed"],
    answer: 0,
    why: "am / is / are + supposed to be + V3. الجزء المتغيّر هو is / are فقط.",
    concept: "BE SUPPOSED TO BE + V3",
    trap: "حذف be أو حذف are.",
  },
  {
    type: "typed",
    ar: "حوّل إلى المبني للمجهول:",
    before: "Someone should have informed the manager. → ",
    after: "",
    accept: ["The manager should have been informed.", "The manager should have been informed"],
    why: "should have been + V3. المفعول به the manager يصبح المبتدأ، والفاعل المجهول يُحذف.",
    concept: "التحويل مع SHOULD HAVE",
    trap: "استخدام should have informed بعد be، أو نسيان been.",
  },
  {
    type: "error",
    ar: "اختر المقطع الذي يحتوي الخطأ:",
    segments: ["The meeting", "might", "been", "cancelled tomorrow."],
    answer: 2,
    why: "الصيغة الصحيحة: The meeting might have been cancelled tomorrow. — been تحتاج have قبلها.",
    concept: "MIGHT HAVE BEEN + V3",
    trap: "وضع been مباشرة بعد might.",
  },
  {
    type: "match",
    ar: "صِل كل تركيب بمعناه الدقيق:",
    pairs: [
      { left: "must be done", right: "يجب أن يُنجز" },
      { left: "must have been done", right: "لا بد أنه أُنجز" },
      { left: "should be done", right: "ينبغي أن يُنجز" },
      { left: "should have been done", right: "كان ينبغي أن يُنجز" },
      { left: "ought to be respected", right: "ينبغي احترامه" },
    ],
    why:
      "الفرق كله في المساعد: be + V3 = حاضر/مستقبل، وhave been + V3 = ماضٍ. ومع must يصبح المعنى استنتاجًا عند الماضي، ومع should يصبح نصيحة فائتة.",
    concept: "OUGHT TO · الفروق الدلالية بين التراكيب المتشابهة",
    trap: "الخلط بين must be (ضرورة) وmust have been (استنتاج عن الماضي).",
  },
  {
    type: "typed",
    ar: "ترجم إلى الإنجليزية: من المتوقع الإعلان عن النتائج غدًا.",
    before: "",
    after: "",
    accept: [
      "The results are expected to be announced tomorrow.",
      "The results are expected to be announced tomorrow",
    ],
    why: "التوقع: are expected to be + V3. الفاعل results جمع، لذلك are لا is.",
    concept: "BE EXPECTED TO BE + V3 والترجمة",
    trap: "استخدام is مع results، أو كتابة to announced.",
  },
];
