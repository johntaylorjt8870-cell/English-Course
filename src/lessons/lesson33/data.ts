// ============================================================
// الدرس 33 — The Four Present Tenses · المراجعة الشاملة لأزمنة الحاضر الأربعة
// 🧭 THE TENSE COMPASS — بوصلة الأزمنة
//
// - سجل المصدر في ledger33.ts (26 قسمًا: غلاف + أهداف + 24 قسمًا مرقّمًا).
//   هذا الملف يحوي:
//   1) سجل الخطوات SLIDES: خطوة واحدة لكل قسم مصدري (1:1) مع مرجع المصدر.
//   2) محتوى التفاعلات: أمثلة المصدر مأخوذة من جسم الأقسام نفسها، وكل
//      جملة من إنشاء المنصة للتدريب تُوسم «مثال تدريبي للمنصة» في الواجهة.
// - حلول ⑬ غير منصوصة في المصدر ← مشتقة وفق قواعد الدرس وموسومة بذلك.
// ============================================================

export const LESSON_TITLE_33 = "الدرس 33: The Four Present Tenses";
export const LESSON_SUBTITLE_33 = "🧭 المراجعة الشاملة لأزمنة الحاضر الأربعة — Present Tenses Mastery";
export const LAB_NAME_33 = "THE TENSE COMPASS";
export const LAB_MOTTO_33 = "V1 · am/is/are + V-ing · have/has + V3 · have/has + been + V-ing";

export const LESSON_META_33 = { number: 33 };

// ============================================================
// أقسام الشريط الجانبي
// ============================================================
export const SECTIONS_33: { id: string; label: string }[] = [
  { id: "INTRO", label: "🧭 البداية" },
  { id: "MAP", label: "🗺️ الخريطة الذهبية" },
  { id: "TOOLS", label: "🧰 الأدوات" },
  { id: "DUELS", label: "⚔️ المواجهات" },
  { id: "DRILL", label: "✍️ التدريب" },
  { id: "READ", label: "📖 القراءة" },
  { id: "MASTER", label: "🏆 الاختبار" },
  { id: "END", label: "🚀 الإنتاج والخاتمة" },
];

export type Slide33Data = {
  id: string;
  section: string;
  mascot: string;
  title: string;
  step?: string;
  lead?: string;
  tip?: string;
  source: string[];
};

export const SLIDES: Slide33Data[] = [
  { id: "cover", section: "INTRO", mascot: "🧭", title: "بوصلة الأزمنة الأربعة", step: "الغلاف",
    lead: "لا زمن جديد اليوم — بل ربطٌ لأزمنة الحاضر الأربعة كلها في خريطة واحدة.",
    tip: "أربع زوايا للنظر إلى الحاضر نفسه — المس كل رقاقة لتفتحها.", source: ["cover"] },
  { id: "objectives", section: "INTRO", mascot: "🎯", title: "أهداف الدرس", step: "الأهداف",
    lead: "سبعة أهداف — علّم كل هدف بعد أن تتقنه.",
    tip: "كل هدف تُتقنه يقرّبك من إتقان المنظومة كاملة.", source: ["objectives"] },

  { id: "s1", section: "MAP", mascot: "🧭", title: "الخريطة الذهبية لأزمنة الحاضر الأربعة", step: "① الخريطة",
    lead: "المس كل زمن لتكشف مثاله و«زاوية النظر» الخاصة به.",
    tip: "عادة؟ ← بسيط · جارٍ الآن؟ ← مستمر · نتيجة مرتبطة بالحاضر؟ ← تام · نشاط ممتد؟ ← تام مستمر.", source: ["s1"] },
  { id: "s2", section: "MAP", mascot: "🧱", title: "جدول البناء الأساسي", step: "② البناء",
    lead: "طابق كل زمن مع صيغته الأساسية — اللبنات التي لا تتغير.",
    tip: "لكل زمن هيكل خاص به — لا تستعِر أجزاء زمن لبناء زمن آخر.", source: ["s2"] },
  { id: "s3", section: "MAP", mascot: "🔬", title: "مختبر المعنى — الفعل نفسه بأربع زوايا", step: "③ المختبر",
    lead: "فعل Nora واحد (work) — حدّد زاوية النظر لكل جملة.",
    tip: "لم يتغيّر الفعل ولا المكان — تغيّرت الزاوية فقط.", source: ["s3"] },
  { id: "s4", section: "MAP", mascot: "🧠", title: "السؤال الذي يحدد الزمن", step: "④ السؤال",
    lead: "لكل معنى سؤال واحد — اختر الزمن الذي يجيب عنه.",
    tip: "السياق هو الذي يحدد الزمن، وليس شكل الجملة العربية وحده.", source: ["s4"] },

  { id: "s5", section: "TOOLS", mascot: "⚙️", title: "الإثبات والنفي والسؤال", step: "⑤ الجدول",
    lead: "استكشف جداول الأزمنة الأربعة ثم أجب بإجابات قصيرة صحيحة.",
    tip: "بعد does / doesn't يعود الفعل إلى V1: practices ← practice.", source: ["s5"] },
  { id: "s6", section: "TOOLS", mascot: "🚨", title: "لا تخلط الأفعال المساعدة", step: "⑥ لا تخلط",
    lead: "كل زمن هيكل مكتمل — اختر الجملة سليمة البناء.",
    tip: "قاعدة IQ200: لا تجمع أجزاء من زمنين مختلفين في جملة واحدة.", source: ["s6"] },
  { id: "s7", section: "TOOLS", mascot: "🔑", title: "الكلمات الدالة على كل زمن", step: "⑦ الدلالات",
    lead: "وزّع كل كلمة دالة إلى زمنها المرشَّح — ثم اقرأ تحذير for/since.",
    tip: "الكلمة الدالة تُرشّح زمنًا، والمعنى يحسم الاختيار.", source: ["s7"] },

  { id: "s8", section: "DUELS", mascot: "⚔️", title: "المواجهة الأولى: البسيط vs المستمر", step: "⑧ مواجهة ١",
    lead: "مهنتي طوال العام؟ أم نشاط هذا الشهر؟ إقامة دائمة؟ أم هذا الصيف فقط؟",
    tip: "I teach ← مهنة · I am teaching this month ← فترة مؤقتة.", source: ["s8"] },
  { id: "s9", section: "DUELS", mascot: "⏱️", title: "المواجهة الثانية: المستمر vs التام المستمر", step: "⑨ مواجهة ٢",
    lead: "غيّر السؤال يتغيّر الزمن: ماذا الآن؟ أم منذ متى وهو يعمل؟",
    tip: "is repairing الآن · has been repairing منذ الظهر.", source: ["s9"] },
  { id: "s10", section: "DUELS", mascot: "🎯", title: "المواجهة الثالثة: التام vs التام المستمر", step: "⑩ مواجهة ٣",
    lead: "عددٌ مكتمل ونتيجة؟ أم نشاط ومدة؟",
    tip: "حللت اثنتي عشرة مسألة ← عدد · أحلّ منذ ساعتين ← مدة.", source: ["s10"] },
  { id: "s11", section: "DUELS", mascot: "🧠", title: "أفعال الحالة — Stative Verbs", step: "⑪ الحالات",
    lead: "الحالات لا «تتحرك» — فلا مستمر لها عادة. عرّف الأفعال السبعة ثم اختر السليم.",
    tip: "think حالة خاصة: رأي ← حالة · أفكّر في ← عملية.", source: ["s11"] },

  { id: "s12", section: "DRILL", mascot: "🕵️", title: "Grammar Detective — المستوى الأول", step: "⑫ محقق ١",
    lead: "ثماني قضايا — المس الكلمة الخاطئة ثم اختر التصحيح.",
    tip: "لكل قضية سبب — احفظ السبب لا الشكل فقط.", source: ["s12"] },
  { id: "s13", section: "DRILL", mascot: "✍️", title: "التدريب الأول: أكمل بالزمن المناسب", step: "⑬ تدريب ١",
    lead: "اكتب صيغة الفعل بين القوسين في الزمن الأنسب — لا تنتقل إلى الإجابات قبل المحاولة.",
    tip: "الحلول المفصلة مشتقة وفق قواعد الدرس نفسه — تظهر بعد محاولتك الناجحة.", source: ["s13"] },
  { id: "s14", section: "DRILL", mascot: "📐", title: "التدريب الثاني: الفعل نفسه في الأزمنة الأربعة", step: "⑭ تدريب ٢",
    lead: "فعل واحد (design) — أربع صيغ — ثم فسّر فرق العدد عن المدة.",
    tip: "five logos ← عدد · for two hours ← مدة.", source: ["s14"] },
  { id: "s15", section: "DRILL", mascot: "🔥", title: "مستوى IQ200: متى تكون إجابتان صحيحتين؟", step: "⑮ IQ200",
    lead: "صيغتان صحيحتان للحقيقة نفسها — الفرق تعبير لا صحة.",
    tip: "لا تختَر التام المستمر تلقائيًا عند رؤية for أو since.", source: ["s15"] },

  { id: "s16", section: "READ", mascot: "📖", title: "Reading Challenge — The Young Inventor", step: "⑯ القراءة",
    lead: "اقرأ قصة Ryan ثم المس العبارات الفعلية الأحد عشر لتُضيئها.",
    tip: "كل فعل اختاره الكاتب لسبب — ستصنّفه في الخطوة التالية.", source: ["s16"] },
  { id: "s17", section: "READ", mascot: "📊", title: "تحليل القصة", step: "⑰ التحليل",
    lead: "صنّف كل عبارة فعلية إلى زمنها — السبب يظهر مع التثبيت.",
    tip: "لا تحفظ الجدول — افهم لماذا اختار الكاتب كل زمن.", source: ["s17"] },
  { id: "s18", section: "READ", mascot: "🕵️", title: "Grammar Detective — المستوى الثاني", step: "⑱ محقق ٢",
    lead: "فقرة Emma فيها أخطاء مقصودة — صحّحها كلها لتكشف الفقرة السليمة.",
    tip: "العنوان يقول «عشرة أخطاء» والعدّ الدقيق أحد عشر موضعًا — خطأ for/since موضع مستقل.", source: ["s18"] },
  { id: "s19", section: "READ", mascot: "🔥", title: "تحدي اختلاف المعنى — مستوى IQ200", step: "⑲ تحدي المعنى",
    lead: "أربع جمل صحيحة عن Rana — أيّ موقف تصفه كل واحدة؟",
    tip: "الزمن يقرره ما تريد أن تقوله — لا الشخص ولا الجذع اللغوي.", source: ["s19"] },

  { id: "s20", section: "MASTER", mascot: "🏆", title: "الاختبار النهائي — Present Tenses Master Test", step: "⑳ الاختبار",
    lead: "اقلب بطاقات المستويات الخمسة لتعرف ما ينتظرك — ثم توجّه إلى منطقة الاختبار.",
    tip: "25 سؤالًا · خمسة مستويات · لا تستخدم الحلول قبل إكمال جميع الأسئلة.", source: ["s20"] },
  { id: "s21", section: "MASTER", mascot: "🔐", title: "مساحة الحلول التفصيلية", step: "㉑ الحلول",
    lead: "مفتاح التصحيح التفصيلي موجود — لكنه لا يُكشف قبل إرسال الاختبار كاملًا.",
    tip: "حاول حل الاختبار كاملًا قبل كشف الإجابات.", source: ["s21"] },

  { id: "s22", section: "END", mascot: "✍️", title: "مهمة الكتابة — My Learning Journey", step: "㉒ الكتابة",
    lead: "اكتب فقرة عن رحلتك مع تعلّم الإنجليزية — عشر جمل، موزّعة على الأزمنة الأربعة.",
    tip: "لا تنسخ المثال — اكتب رحلتك أنت.", source: ["s22"] },
  { id: "s23", section: "END", mascot: "⭐", title: "الملخص الذهبي", step: "㉓ الملخص",
    lead: "اقلب بطاقات «I build models» الأربع ثم راجع القاعدة الذهبية.",
    tip: "عادة؟ جارٍ الآن؟ نتيجة مرتبطة بالحاضر؟ نشاط ممتد؟", source: ["s23"] },
  { id: "s24", section: "END", mascot: "🗺️", title: "خريطة تقدمنا — وإلى المستقبل", step: "㉔ الخريطة",
    lead: "اكتملت منظومتا الحاضر والماضي — ثمانية أزمنة تحت يدك.",
    tip: "الدرس القادم 34: Future Simple WILL.", source: ["s24"] },
];

export const SLIDE_COUNT_33 = SLIDES.length;

// ============================================================
// الأهداف (من قسم objectives في المصدر)
// ============================================================
export const OBJECTIVES_33: { n: string; text: string }[] = [
  { n: "1", text: "مراجعة أزمنة الحاضر الأربعة كمنظومة واحدة مترابطة." },
  { n: "2", text: "التمييز بين الأزمنة الأربعة حسب الزمن والمعنى." },
  { n: "3", text: "بناء جمل صحيحة في الأزمنة الأربعة: إثبات ونفي وسؤال." },
  { n: "4", text: "تصحيح الأخطاء الشائعة في استخدام الأزمنة." },
  { n: "5", text: "قراءة نص إنجليزي وفهم اختيار الأزمنة فيه." },
  { n: "6", text: "كتابة فقرة قصيرة تدمج أكثر من زمن من أزمنة الحاضر." },
  { n: "7", text: "فهم اختلاف المعنى بين زمنين بالفعل نفسه." },
];

// ============================================================
// الغلاف — رقائق الأزمنة الأربعة
// ============================================================
export const COVER_GATES_33: { tense: string; formula: string; ar: string }[] = [
  { tense: "Present Simple", formula: "V1 / V-s", ar: "عادة · حقيقة" },
  { tense: "Present Continuous", formula: "am/is/are + V-ing", ar: "جارٍ الآن" },
  { tense: "Present Perfect", formula: "have/has + V3", ar: "إنجاز · خبرة" },
  { tense: "Present Perfect Continuous", formula: "have/has + been + V-ing", ar: "نشاط ممتد" },
];

// ============================================================
// s1 — الخريطة الذهبية (من وحدات المصدر)
// ============================================================
export type TenseGate33 = { tense: string; arTense: string; ex: string; exAr: string; angle: string };
export const MAP_TENSES_33: TenseGate33[] = [
  { tense: "Present Simple", arTense: "المضارع البسيط", ex: "I study English every day.", exAr: "أدرس الإنجليزية كل يوم.", angle: "عادة ثابتة أو حقيقة عامة." },
  { tense: "Present Continuous", arTense: "المضارع المستمر", ex: "I am studying English now.", exAr: "أدرس الإنجليزية الآن.", angle: "نشاط جارٍ في هذه اللحظة." },
  { tense: "Present Perfect", arTense: "المضارع التام", ex: "I have completed my homework.", exAr: "أكملت واجبي.", angle: "إنجاز مرتبط بالحاضر." },
  { tense: "Present Perfect Continuous", arTense: "المضارع التام المستمر", ex: "I have been studying for two hours.", exAr: "أدرس منذ ساعتين.", angle: "نشاط بدأ قبل مدة وما زال ممتدًا حتى الآن." },
];

// ============================================================
// s2 — جدول البناء: طابق الزمن مع صيغته
// ============================================================
export type MatchRow33 = { prompt: string; options: string[]; pick: number; why: string };
/** بعد نجاح التصحيح: الجملة كما ستصبح (تُستخدم في مفتاح المعلم ولوحة «القضية محلولة») */
export type Gd1Item33 = { n: string; wrong: string; bad: string; fix: string; corrected: string; why: string };
export const GD1_ITEMS_33: Gd1Item33[] = [
  { n: "①", wrong: "He don't go to school by bus.", bad: "don't", fix: "doesn't", corrected: "He doesn't go to school by bus.", why: "المفرد الغائب يحتاج doesn't لا don't." },
  { n: "②", wrong: "They is playing football now.", bad: "is", fix: "are", corrected: "They are playing football now.", why: "They جمع ← are لا is." },
  { n: "③", wrong: "I have see that movie before.", bad: "see", fix: "seen", corrected: "I have seen that movie before.", why: "بعد have نحتاج التصريف الثالث: seen." },
  { n: "④", wrong: "She has been knowing him for years.", bad: "been knowing", fix: "known", corrected: "She has known him for years.", why: "know فعل حالة — لا مستمر له: has known." },
  { n: "⑤", wrong: "Look! The dog runs after the ball.", bad: "runs", fix: "is running", corrected: "Look! The dog is running after the ball.", why: "Look! نداء انتباه لمشهد جارٍ ← المستمر." },
  { n: "⑥", wrong: "He has wrote a letter to his friend.", bad: "wrote", fix: "written", corrected: "He has written a letter to his friend.", why: "بعد has التصريف الثالث: written." },
  { n: "⑦", wrong: "It are raining now.", bad: "are", fix: "is", corrected: "It is raining now.", why: "It مفرد غائب ← is." },
  { n: "⑧", wrong: "Have you ever been visiting Canada?", bad: "been visiting", fix: "visited", corrected: "Have you ever visited Canada?", why: "أما here فهو سؤال عن التجربة — نستخدم visited لا been visiting." },
];

export const BUILD_ROWS_S2: MatchRow33[] = [
  { prompt: "Present Simple", options: ["V1 / V-s", "am / is / are + V-ing", "have / has + V3", "have / has + been + V-ing"], pick: 0, why: "البسيط يُبنى بالفعل المجرد — ويأخذ s مع المفرد الغائب. مثال المصدر: I work every day." },
  { prompt: "Present Continuous", options: ["am / is / are + V-ing", "V1 / V-s", "have / has + V3", "have / has + been + V-ing"], pick: 0, why: "المستمر = am/is/are مع فعل ينتهي بـ ing. مثال المصدر: I am working now." },
  { prompt: "Present Perfect", options: ["have / has + been + V-ing", "have / has + V3", "am / is / are + V-ing", "V1 / V-s"], pick: 1, why: "التام = have/has مع التصريف الثالث. مثال المصدر: I have worked here for years." },
  { prompt: "Present Perfect Continuous", options: ["have / has + V3", "am / is / are + V-ing", "have / has + been + V-ing", "V1 / V-s"], pick: 2, why: "التام المستمر = have/has + been + V-ing. مثال المصدر: I have been working all morning." },
];

// ============================================================
// s3 — مختبر المعنى (Nora) — الجمل الأربع من المصدر + زاوية النظر
// ============================================================
export const NORA_ROWS_S3: MatchRow33[] = [
  { prompt: "Nora works in the library every day.", options: ["عادتها — عملها الدائم", "مشهد جارٍ الآن", "خبرة مكتملة في حياتها", "نشاط ممتد من نقطة بداية"], pick: 0, why: "every day ← عادة ثابتة = Present Simple." },
  { prompt: "Nora is working in the library right now.", options: ["مشهد جارٍ الآن", "عادة ثابتة", "خبرة مكتملة", "نشاط ممتد من الماضي"], pick: 0, why: "right now ← لحظة الحديث = Present Continuous." },
  { prompt: "Nora has worked in three libraries.", options: ["خبرة مكتملة مرتبطة بالحاضر", "مشهد جارٍ الآن", "نشاط ممتد وما زال", "عادة يومية"], pick: 0, why: "ثلاث مكتبات حتى اليوم ← خبرة = Present Perfect." },
  { prompt: "Nora has been working in the library since 8:00.", options: ["نشاط ممتد من نقطة بداية حتى الآن", "خبرة بعدد مكتمل", "عادة ثابتة", "حدث منقطع عن الحاضر"], pick: 0, why: "since 8:00 + ما زالت ← امتداد = Present Perfect Continuous." },
];

// ============================================================
// s4 — السؤال الذي يحدد الزمن + تنويعات «أعمل على هذا المشروع»
// ============================================================
export type TensePickRow33 = { prompt: string; pick: number; why: string };
export const TENSE_OPTIONS_33 = ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"];
export const QUESTION_ROWS_S4: TensePickRow33[] = [
  { prompt: "هل أتحدث عن عادة أو حقيقة؟", pick: 0, why: "العادة والحقيقة ← المضارع البسيط." },
  { prompt: "هل أتحدث عن نشاط جارٍ الآن؟", pick: 1, why: "المشهد الحالي ← المضارع المستمر." },
  { prompt: "هل أتحدث عن إنجاز أو خبرة مرتبطة بالحاضر؟", pick: 2, why: "الإنجاز والخبرة ← المضارع التام." },
  { prompt: "هل أريد إبراز نشاط ممتد من الماضي إلى الآن؟", pick: 3, why: "الامتداد من نقطة بداية ← المضارع التام المستمر." },
];
export const VARIANTS_S4: { ar: string; en: string }[] = [
  { ar: "أعمل على هذا المشروع كل أسبوع.", en: "I work on this project every week." },
  { ar: "أعمل على هذا المشروع الآن.", en: "I am working on this project now." },
  { ar: "عملت على مشاريع كثيرة مثله.", en: "I have worked on many projects like it." },
  { ar: "أعمل على هذا المشروع منذ شهرين.", en: "I have been working on this project for two months." },
];

// ============================================================
// s5 — الجداول الأربعة (من وحدات المصدر) + الإجابات القصيرة
// ============================================================
export type FormTable33 = { tense: string; arTense: string; aff: string; neg: string; q: string; short: string; note: string };
export const FORMS_S5: FormTable33[] = [
  { tense: "Present Simple", arTense: "المضارع البسيط", aff: "She practices every day.", neg: "She doesn't practice every day.", q: "Does she practice every day?", short: "Yes, she does.", note: "تذكر: بعد does / doesn't يعود الفعل إلى V1: practices ← practice." },
  { tense: "Present Continuous", arTense: "المضارع المستمر", aff: "She is practicing now.", neg: "She isn't practicing now.", q: "Is she practicing now?", short: "Yes, she is.", note: "تذكر: نقلب am / is / are قبل الفاعل، ويبقى الفعل بصيغة V-ing." },
  { tense: "Present Perfect", arTense: "المضارع التام", aff: "She has practiced today.", neg: "She hasn't practiced today.", q: "Has she practiced today?", short: "Yes, she has.", note: "تذكر: نقلب have / has قبل الفاعل، ويبقى الفعل بصيغة V3." },
  { tense: "Present Perfect Continuous", arTense: "المضارع التام المستمر", aff: "She has been practicing since morning.", neg: "She hasn't been practicing since morning.", q: "Has she been practicing since morning?", short: "Yes, she has.", note: "تذكر: جواب قصير لكلتا صيغتي التام: Yes, she has. / No, she hasn't." },
];
export const SHORT_ROWS_S5: MatchRow33[] = [
  { prompt: "Does she practice every day?", options: ["Yes, she does.", "Yes, she is.", "Yes, she has.", "Yes, she do."], pick: 0, why: "السؤال بـ does والجواب بنفس الآلة: does." },
  { prompt: "Is she practicing now?", options: ["Yes, she does.", "Yes, she is.", "Yes, she has.", "Yes, she practicing."], pick: 1, why: "السؤال بـ is والجواب: she is." },
  { prompt: "Has she practiced today?", options: ["Yes, she does.", "Yes, she is.", "Yes, she has.", "Yes, she practiced."], pick: 2, why: "التام يجيب بـ has / have." },
  { prompt: "Has she been practicing since morning?", options: ["Yes, she does.", "Yes, she is.", "Yes, she has.", "Yes, she been."], pick: 2, why: "صيغتا التام تجيبان بـ has / have." },
];

// ============================================================
// s6 — لا تخلط المساعدات: الأزواج الأربعة من المصدر
// ============================================================
export type RightRow33 = { label: string; opts: string[]; correct: number; why: string };
export const MIX_ROWS_S6: RightRow33[] = [
  { label: "الزوج ① — آلة البسيط مع does", opts: ["Does she practices every day?", "Does she practice every day?"], correct: 1, why: "does تحمل s بدلًا عن الفعل — الفعل يعود V1." },
  { label: "الزوج ② — آلة المستمر مع is", opts: ["Is she practicing now?", "Is she practice now?"], correct: 0, why: "is تحتاج V-ing — لا تجتمع مع V1 المجرد." },
  { label: "الزوج ③ — آلة التام المستمر", opts: ["Has she been practice since morning?", "Has she been practicing since morning?"], correct: 1, why: "has been تحتاج V-ing — practicing." },
  { label: "الزوج ④ — سؤال الفاعل المفرد", opts: ["Does she practice every day?", "Do she practice every day?"], correct: 0, why: "المفرد الغائب (she) يأخذ does لا do." },
];

// ============================================================
// s7 — الكلمات الدالة: فرز 21 كلمة على 4 أزمنة (never مستبعدة لالتباسها)
// ============================================================
export const SIGNAL_BUCKETS_S7 = TENSE_OPTIONS_33;
export const SIGNAL_WORDS_S7: { en: string; bucket: number; why: string }[] = [
  { en: "always", bucket: 0, why: "تكرار ثابت = عادة ← البسيط." },
  { en: "usually", bucket: 0, why: "المعتاد ← البسيط." },
  { en: "often", bucket: 0, why: "تكرار عالٍ ← البسيط." },
  { en: "sometimes", bucket: 0, why: "تكرار متقطع ← البسيط." },
  { en: "every day", bucket: 0, why: "جدول متكرر = عادة ← البسيط." },
  { en: "now", bucket: 1, why: "لحظة الكلام ← المستمر." },
  { en: "right now", bucket: 1, why: "الآن بالضبط ← المستمر." },
  { en: "at the moment", bucket: 1, why: "في هذه اللحظة ← المستمر." },
  { en: "Look!", bucket: 1, why: "نداء انتباه لمشهد جارٍ ← المستمر." },
  { en: "Listen!", bucket: 1, why: "نداء انتباه لصوت جارٍ ← المستمر." },
  { en: "these days", bucket: 1, why: "فترة مؤقتة حول الآن ← المستمر." },
  { en: "ever", bucket: 2, why: "هل سبق؟ — خبرة ← التام." },
  { en: "already", bucket: 2, why: "إنجاز تحقق قبل المتوقع ← التام." },
  { en: "just", bucket: 2, why: "إنجاز للتو ← التام." },
  { en: "yet", bucket: 2, why: "مع النفي/السؤال عن إنجاز ← التام." },
  { en: "so far", bucket: 2, why: "حصيلة حتى الآن ← التام." },
  { en: "since", bucket: 3, why: "نقطة بداية نشاط ممتد ← التام المستمر." },
  { en: "for", bucket: 3, why: "مدة نشاط ممتد ← التام المستمر." },
  { en: "all morning", bucket: 3, why: "مدة كاملة ممتدة إلى الآن ← التام المستمر." },
  { en: "all day", bucket: 3, why: "مدة اليوم كله ← التام المستمر." },
  { en: "lately", bucket: 3, why: "في الفترة الأخيرة — نشاط ممتد ← التام المستمر." },
];
export const SIGNAL_NOTE_S7 = "تحذير المصدر: for و since قد تأتيان مع Present Perfect أيضًا — I have owned this bicycle for five years. / I have known her for seven years. (وليس been owning / been knowing). و never موجودة في الجدول مع البسيط والتام معًا لذا استُبعدت من هذا الفرز — الكلمة تُرشّح والمعنى يحسم.";

// ============================================================
// s8–s10 — المواجهات الثلاث (الأزواج من المصدر)
// ============================================================
export const DUEL_S8: RightRow33[] = [
  { label: "أي جملة تصف مهنة ثابتة؟", opts: ["I am teaching English this month.", "I teach English."], correct: 1, why: "المهنة الثابتة ← Present Simple؛ this month فترة مؤقتة ← مستمر." },
  { label: "أي جملة تصف إقامة مؤقتة هذا الصيف؟", opts: ["My brother lives in Damascus.", "My brother is living with his grandparents this summer."], correct: 1, why: "this summer ← إقامة مؤقتة ← المستمر؛ lives إقامة دائمة ← بسيط." },
  { label: "التحدي: She ___ tea every morning.", opts: ["She is drinking tea every morning.", "She drinks tea every morning."], correct: 1, why: "الجواب B — every morning تصف عادة يومية، والمستمر هنا لا يناسب المعنى." },
];
export const DUEL_S9: RightRow33[] = [
  { label: "ماذا يفعل أحمد الآن؟", opts: ["Ahmed is repairing the car.", "Ahmed has been repairing the car since noon."], correct: 0, why: "سؤال عن المشهد الحالي ← المستمر." },
  { label: "منذ متى والأولاد يزيّنون القاعة؟", opts: ["The children are decorating the hall.", "The children have been decorating the hall all morning."], correct: 1, why: "all morning ← امتداد منذ الصباح ← التام المستمر." },
];
export const DUEL_S10: RightRow33[] = [
  { label: "التركيز على العدد والنتيجة", opts: ["I have been solving problems for two hours.", "I have solved twelve problems."], correct: 1, why: "اثنتا عشرة مسألة ← عدد مكتمل ← التام." },
  { label: "التركيز على النشاط والمدة", opts: ["I have solved twelve problems.", "I have been solving problems for two hours."], correct: 1, why: "for two hours ← نشاط ممتد ← التام المستمر." },
];
export const LIVE_NOTE_S10 = "نقطة متقدمة من المصدر: I have lived in Damascus for ten years. صحيحة، و I have been living in Damascus for ten years. صحيحة أيضًا — أفعال مثل live و work و teach تقبل الصيغتين؛ الفرق في زاوية التركيز لا في الصحة.";

// ============================================================
// s11 — أفعال الحالة السبعة + زوجا owned/known + think
// ============================================================
export const STATIVE_VERBS_S11: { verb: string; ar: string }[] = [
  { verb: "know", ar: "يعرف" },
  { verb: "believe", ar: "يصدّق / يعتقد" },
  { verb: "understand", ar: "يفهم" },
  { verb: "want", ar: "يريد" },
  { verb: "need", ar: "يحتاج" },
  { verb: "own", ar: "يملك" },
  { verb: "remember", ar: "يتذكّر" },
];
export const STATIVE_PICK_S11: RightRow33[] = [
  { label: "الزوج الأول — own:", opts: ["I have owned this bicycle for five years.", "I have been owning this bicycle for five years."], correct: 0, why: "own فعل حالة ← التام البسيط مع المدة، لا التام المستمر." },
  { label: "الزوج الثاني — know:", opts: ["I am knowing the answer.", "I have known the answer."], correct: 1, why: "know فعل حالة ← no مستمر له؛ مع المدة نستخدم has/have known." },
];
export const THINK_NOTE_S11 = "think حالة خاصة: I think the plan is good. (رأي = حالة) · I am thinking about the plan. (أفكّر فيه الآن = عملية تفكير — يصحّ المستمر).";

// ============================================================
// s12 — Grammar Detective الأول (8 قضايا من المصدر)
//   تُغذّى الواجهة عبر GD1_ITEMS_33 المعرّفة أعلاه (bad: الكلمة الخاطئة)
// ============================================================
export type Detective33 = { n: string; segments: string[]; bad: number; fixOpts: string[]; fix: string; why: string };
export const DETECTIVE_S12: Detective33[] = GD1_ITEMS_33.map((g) => ({
  n: g.n,
  segments: g.wrong.split(" ").map((w) => w),
  bad: g.wrong.split(" ").findIndex((_, i, arr) => arr.slice(i, i + g.bad.split(" ").length).join(" ") === g.bad),
  fixOpts: [g.fix, ...(g.fix === "doesn't" ? ["not"] : g.fix === "are" ? ["am"] : g.fix === "seen" ? ["saw"] : g.fix === "known" ? ["been knowing"] : g.fix === "is running" ? ["running"] : g.fix === "written" ? ["writes"] : g.fix === "is" ? ["am"] : ["visit"])],
  fix: g.fix,
  why: g.why,
}));

// ============================================================
// s13 — التدريب الأول (10 فراغات من المصدر — الحلول مشتقة وموسومة)
// ============================================================
export type Typed33 = { n: string; before: string; after: string; word: string; accept: string[]; why: string };
export const TYPED_S13: Typed33[] = [
  { n: "①", before: "My mother", after: "lunch every day.", word: "cook", accept: ["cooks"], why: "every day ← عادة ← البسيط + s مع المفرد الغائب." },
  { n: "②", before: "Listen! Someone", after: "at the door.", word: "knock", accept: ["is knocking"], why: "Listen! ← صوت جارٍ الآن ← المستمر." },
  { n: "③", before: "I", after: "my keys! I can't enter the house.", word: "lose", accept: ["have lost"], why: "النتيجة حاضرة (لا أستطيع الدخول) ← التام." },
  { n: "④", before: "We", after: "for the bus for twenty minutes.", word: "wait", accept: ["have been waiting"], why: "for twenty minutes ← نشاط ممتد ← التام المستمر." },
  { n: "⑤", before: "She", after: "three languages.", word: "speak", accept: ["speaks"], why: "قدرة/حقيقة ثابتة ← البسيط + s." },
  { n: "⑥", before: "The inspector", after: "the building these days.", word: "inspect", accept: ["is inspecting"], why: "these days ← نشاط هذه الفترة ← المستمر." },
  { n: "⑦", before: "Our team", after: "five matches so far.", word: "win", accept: ["has won"], why: "خمس مباريات so far ← حصيلة مكتملة ← التام." },
  { n: "⑧", before: "Grandfather", after: "in the garden since 7:00.", word: "work", accept: ["has been working", "has worked"], why: "since 7:00 ← امتداد ← التام المستمر؛ work يقبل التام أيضًا (الدرس ⑮)." },
  { n: "⑨", before: "The waiters", after: "the tables right now.", word: "serve", accept: ["are serving"], why: "right now ← الآن ← المستمر." },
  { n: "⑩", before: "The doctor", after: "two patients this morning.", word: "examine", accept: ["has examined"], why: "مريضان هذا الصباح ← حصيلة مكتملة ← التام." },
];

// ============================================================
// s14 — التدريب الثاني (design ×4) + سؤالا «لماذا» بجوابيهما من المصدر
// ============================================================
export const TYPED_S14: Typed33[] = [
  { n: "①", before: "Omar", after: "posters every day.", word: "design", accept: ["designs"], why: "every day ← عادة ← البسيط، والمفرد الغائب يأخذ s." },
  { n: "②", before: "Omar", after: "a new logo right now.", word: "design", accept: ["is designing"], why: "right now ← الآن ← المستمر." },
  { n: "③", before: "Omar", after: "five logos so far.", word: "design", accept: ["has designed"], why: "خمسة شعارات so far ← عدد مكتمل ← التام." },
  { n: "④", before: "Omar", after: "the same logo for two hours.", word: "design", accept: ["has been designing"], why: "for two hours ← نشاط ممتد ← التام المستمر." },
];
export const DESIGN_ROWS_S14: MatchRow33[] = [
  { prompt: "لماذا has designed في الجملة ③؟", options: ["لأننا نركّز على العدد المكتمل (five logos)", "لأننا نركّز على مدة النشاط", "لأنها عادة يومية"], pick: 0, why: "العدد المكتمل ← التام (جواب المصدر المنصوص)." },
  { prompt: "لماذا has been designing في الجملة ④؟", options: ["لأننا نركّز على النشاط ومدته (for two hours)", "لأننا نركّز على العدد", "لأنها حقيقة علمية"], pick: 0, why: "النشاط والمدة ← التام المستمر (جواب المصدر المنصوص)." },
];

// ============================================================
// s15 — متى تكون إجابتان صحيحتين؟
// ============================================================
export type BestRow33 = { ar: string; a: string; b: string; pick: number; why: string };
export const BEST_OPTS_S15 = ["الأولى فقط", "الثانية فقط", "كلتاهما صحيحة"];
export const BEST_ROWS_S15: BestRow33[] = [
  { ar: "أدرّس الإنجليزية منذ خمس سنوات (وما زلت)", a: "I have taught English for five years.", b: "I have been teaching English for five years.", pick: 2, why: "كلتاهما صحيحة: الأولى تلخّص التجربة، والثانية تُبرز النشاط الممتد." },
  { ar: "تعمل في الشركة منذ 2021 (وما زالت)", a: "She has worked at the company since 2021.", b: "She has been working at the company since 2021.", pick: 2, why: "work يقبل الصيغتين للحقيقة نفسها — فرق تعبير لا فرق صحة." },
  { ar: "زرت دمشق مرتين في حياتي", a: "I have visited Damascus twice.", b: "I have been visiting Damascus twice.", pick: 0, why: "العدد المكتمل (twice) لا يملك زاوية امتداد — التام وحده صحيح." },
];

// ============================================================
// s16 — قصة Ryan (8 جمل من المصدر) مع العبارات الفعلية الـ 11
// ============================================================
export type StorySeg33 = { t: string; hit?: number };
export const STORY_S16: StorySeg33[] = [
  { t: "Ryan" }, { t: "loves", hit: 1 }, { t: "science and" }, { t: "spends", hit: 2 },
  { t: "his afternoons in a small workshop behind his house." },
  { t: "These days, he" }, { t: "is developing", hit: 3 },
  { t: "a robot that waters plants." },
  { t: "He" }, { t: "has completed", hit: 4 },
  { t: "the main body of the robot." },
  { t: "He" }, { t: "has tested", hit: 5 },
  { t: "two sensors so far, and he" }, { t: "has been working", hit: 6 },
  { t: "on the control system for five weeks." },
  { t: "He" }, { t: "has been improving", hit: 7 },
  { t: "the watering program since last Tuesday." },
  { t: "Right now, he" }, { t: "is testing", hit: 8 },
  { t: "the system in the garden, while his friends" }, { t: "are watching", hit: 9 },
  { t: "him with excitement." },
  { t: "They" }, { t: "have never seen", hit: 10 },
  { t: "such a creative idea before." },
  { t: "Ryan" }, { t: "believes", hit: 11 }, { t: "that patience builds success." },
];

// ============================================================
// s17 — تحليل القصة: 11 عبارة × الزمن × السبب (جدول المصدر)
// ============================================================
export type PhraseRow33 = { phrase: string; pick: number; why: string };
export const STORY_ROWS_S17: PhraseRow33[] = [
  { phrase: "loves", pick: 0, why: "حقيقة ثابتة عن Ryan ← بسيط." },
  { phrase: "spends", pick: 0, why: "عادة يومية — spends his afternoons ← بسيط." },
  { phrase: "is developing", pick: 1, why: "These days ← نشاط جارٍ في هذه الفترة ← مستمر." },
  { phrase: "has completed", pick: 2, why: "إنجاز مكتمل — جسم الروبوت أصبح جاهزًا ← تام." },
  { phrase: "has tested", pick: 2, why: "so far ← حصيلة حتى الآن ← تام." },
  { phrase: "has been working", pick: 3, why: "for five weeks ← نشاط ممتد ← تام مستمر." },
  { phrase: "has been improving", pick: 3, why: "since last Tuesday ← امتداد من نقطة بداية ← تام مستمر." },
  { phrase: "is testing", pick: 1, why: "Right now ← مشهد هذه اللحظة ← مستمر." },
  { phrase: "are watching", pick: 1, why: "مشهد موازٍ جارٍ الآن ← مستمر." },
  { phrase: "have never seen", pick: 2, why: "never ← خبرة حتى اليوم ← تام." },
  { phrase: "believes", pick: 0, why: "قناعة ثابتة — فعل حالة ← بسيط." },
];

// ============================================================
// s18 — فقرة Emma: النص بأخطائه + 11 موضعًا + التصحيح الكامل (من المصدر)
// ============================================================
export const PARA_WRONG_S18 = "Emma usually study English in the evening. She is prefer short lessons, and she has already complete three units. These days, she prepares for an important exam, and her teacher is knowing her effort. Emma has teaching English to her friends for 2023. Her friends are agree that she is improving, and everyone believe her. They have saw her progress. She don't stop until the lesson ends.";
export const PARA_CORRECT_S18 = "Emma usually studies English in the evening. She prefers short lessons, and she has already completed three units. These days, she is preparing for an important exam, and her teacher knows her effort. Emma has been teaching English to her friends since 2023. Her friends agree that she is improving, and everyone believes her. They have seen her progress. She doesn't stop until the lesson ends.";
export const PARA_ROWS_S18: { n: string; wrong: string; opts: string[]; fix: string; why: string }[] = [
  { n: "①", wrong: "usually study", opts: ["usually studies", "usually studying", "usual studies"], fix: "usually studies", why: "عادة + مفرد غائب ← البسيط مع s." },
  { n: "②", wrong: "is prefer", opts: ["prefers", "is preferring", "prefer"], fix: "prefers", why: "prefer فعل حالة ← لا مستمر." },
  { n: "③", wrong: "already complete", opts: ["already completed", "already completes", "already completing"], fix: "already completed", why: "بعد has التصريف الثالث: completed." },
  { n: "④", wrong: "she prepares", opts: ["she is preparing", "she prepare", "she has prepared"], fix: "she is preparing", why: "These days ← نشاط هذه الفترة ← المستمر." },
  { n: "⑤", wrong: "is knowing", opts: ["knows", "is know", "knowing"], fix: "knows", why: "know فعل حالة ← البسيط." },
  { n: "⑥", wrong: "has teaching", opts: ["has been teaching", "has teach", "have teaching"], fix: "has been teaching", why: "نقص been — نشاط ممتد يحتاج has been + V-ing." },
  { n: "⑦", wrong: "for 2023", opts: ["since 2023", "for 2023 ago", "in 2023 since"], fix: "since 2023", why: "2023 سنة نقطة بداية ← since (موضع مستقل عن أخطاء الأزمنة)." },
  { n: "⑧", wrong: "are agree", opts: ["agree", "are agreeing", "is agree"], fix: "agree", why: "agree فعل رأي/حالة ← البسيط." },
  { n: "⑨", wrong: "everyone believe", opts: ["everyone believes", "everyone believing", "everyone are believe"], fix: "everyone believes", why: "everyone مفرد ← believes." },
  { n: "⑩", wrong: "have saw", opts: ["have seen", "has saw", "have see"], fix: "have seen", why: "بعد have التصريف الثالث: seen." },
  { n: "⑪", wrong: "don't stop", opts: ["doesn't stop", "don't stops", "doesn't stops"], fix: "doesn't stop", why: "She مفرد غائب ← doesn't + V1." },
];

// ============================================================
// s19 — تحدي المعنى: جمل Rana الأربع (من المصدر)
// ============================================================
export const MEANING_S19: RightRow33[] = [
  { label: "مهنتها — حقيقة ثابتة", opts: ["Rana is working in a restaurant this summer.", "Rana works as an engineer.", "Rana has designed five buildings.", "Rana has been designing a new building for two months."], correct: 1, why: "المهنة الدائمة ← Present Simple." },
  { label: "عمل مؤقت في هذه الفترة", opts: ["Rana works as an engineer.", "Rana has designed five buildings.", "Rana is working in a restaurant this summer.", "Rana has been designing a new building for two months."], correct: 2, why: "this summer ← فترة مؤقتة ← Present Continuous." },
  { label: "إنجاز مكتمل بعدد", opts: ["Rana has been designing a new building for two months.", "Rana is working in a restaurant this summer.", "Rana has designed five buildings.", "Rana works as an engineer."], correct: 2, why: "خمسة مبانٍ ← حصيلة مكتملة ← Present Perfect." },
  { label: "نشاط ممتد وما زال مستمرًا", opts: ["Rana has designed five buildings.", "Rana works as an engineer.", "Rana is working in a restaurant this summer.", "Rana has been designing a new building for two months."], correct: 3, why: "for two months ← امتداد ← Present Perfect Continuous." },
];

// ============================================================
// s20 — بطاقات مستويات الاختبار النهائي الخمسة
// ============================================================
export const LEVELS_S20: { level: string; range: string; title: string; back: string }[] = [
  { level: "①", range: "الأسئلة 1–5", title: "اختيار الزمن", back: "اكتب صيغة الفعل في الزمن الأنسب (wake up · sleep · visit · repair · move)." },
  { level: "②", range: "الأسئلة 6–10", title: "لغز الوقت", back: "تلميحات زمنية أدق: not finish yet · laugh now · study German 4 months · own since 2015 · complete so far." },
  { level: "③", range: "الأسئلة 11–15", title: "صيد الأخطاء", back: "جمل فيها خطأ واحد — المس موضع الخطأ (Does he works? · has been cook · am knowing…)." },
  { level: "④", range: "الأسئلة 16–20", title: "اختيار المعنى", back: "أي زمن يحمل هذا المعنى بالضبط؟ وفروق have lived / have been living." },
  { level: "⑤", range: "الأسئلة 21–25", title: "التحدي النهائي", back: "فقرة Mia: أكمل بالأزمنة المناسبة (practice · prepare · win · train + rehearse & know مع التفسير)." },
];

// ============================================================
// s21 — بوّابة الحلول
// ============================================================
export const SOLUTION_GATE_ROWS_S21: MatchRow33[] = [
  { prompt: "متى يُكشف «مفتاح تصحيح الاختبار النهائي»؟", options: ["بعد إرسال الاختبار كاملًا في منطقة الاختبار", "قبل البدء بالاختبار", "بعد أول سؤالين فقط"], pick: 0, why: "المصدر: حاول حل الاختبار كاملًا قبل كشف الإجابات — كشف الحلول التفصيلية بعد المحاولة." },
];

// ============================================================
// s22 — مهمة الكتابة (My Learning Journey) — المتطلبات الستة من المصدر
// ============================================================
export const WRITE_CHECK_S22: string[] = [
  "① جملتان في Present Simple.",
  "② جملتان في Present Continuous.",
  "③ ثلاث جمل في Present Perfect.",
  "④ ثلاث جمل في Present Perfect Continuous.",
  "⑤ استخدمت for و since.",
  "⑥ استخدمت already و yet و recently.",
];
export const WRITE_MODEL_S22: { en: string; ar: string }[] = [
  { en: "I study English every evening.", ar: "المثال القصير المنصوص في المصدر — لا تنسخه، اكتب رحلتك أنت" },
  { en: "I am learning new words right now.", ar: "جارٍ الآن ← مستمر (توجيهي إضافي)" },
  { en: "I have finished two books.", ar: "إنجاز ← تام (توجيهي إضافي)" },
  { en: "I have been practicing since last year.", ar: "امتداد ← تام مستمر (توجيهي إضافي)" },
];
export const WRITE_MIN_SENTENCES_33 = 10;

// ============================================================
// s23 — الملخص الذهبي (I build models ×4 + القاعدة الذهبية)
// ============================================================
export const GOLDEN_FLIPS_S23: { face: string; back: string }[] = [
  { face: "I build models every evening.", back: "أصنع المجسّمات كل مساء ← عادة ← Present Simple" },
  { face: "I am building a model right now.", back: "أصنع مجسّمًا الآن ← جارٍ ← Present Continuous" },
  { face: "I have built ten models this year.", back: "صنعت عشرة مجسّمات ← إنجاز ← Present Perfect" },
  { face: "I have been building this model for a week.", back: "أصنع هذا المجسّم منذ أسبوع ← امتداد ← Present Perfect Continuous" },
];
export const GOLDEN_RULES_S23: string[] = [
  "القاعدة الذهبية لهذا الدرس — اسأل قبل الاختيار: عادة؟ جارٍ الآن؟ نتيجة مرتبطة بالحاضر؟ نشاط ممتد؟",
  "ماذا يريد المتكلم أن يُبرز: العادة أم النشاط الجاري أم النتيجة أم النشاط الممتد؟",
  "لكل زمن هيكل مكتمل — لا تجمع أجزاء من زمنين، وأفعال الحالة بلا مستمر.",
  "الكلمة الدالة تُرشّح زمنًا، والمعنى يحسم الاختيار — حتى مع for / since.",
];

// ============================================================
// s24 — خريطة التقدم + الدرس القادم
// ============================================================
export const COURSE_MAP_S24: { system: string; done: string[] }[] = [
  { system: "منظومة الحاضر — مكتملة ✓", done: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"] },
  { system: "منظومة الماضي — مكتملة ✓", done: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"] },
];
export const NEXT_STOP_ROW_S24: MatchRow33[] = [
  { prompt: "أكملت ثمانية أزمنة — ما الدرس القادم في الكورس؟", options: ["الدرس 34: Future Simple WILL", "الدرس 34: الماضي التام مرة أخرى", "نهاية الكورس — لا دروس بعد"], pick: 0, why: "خريطة التقدم: الدرس 34 — Future Simple WILL؛ سنتعلم القرارات اللحظية والتنبؤات والوعود والعروض، والفرق بين will و be going to." },
];

// ============================================================
// عدّادات ثابتة للتدقيق والتوثيق
// ============================================================
export const LESSON33_COUNTS = {
  slides: SLIDES.length,
  gd1: GD1_ITEMS_33.length,
  signals: SIGNAL_WORDS_S7.length,
  stative: STATIVE_VERBS_S11.length,
  typed1: TYPED_S13.length,
  design: TYPED_S14.length,
  storyHits: STORY_S16.filter((s) => s.hit).length,
  storyAnalysis: STORY_ROWS_S17.length,
  paraErrors: PARA_ROWS_S18.length,
  masterLevels: LEVELS_S20.length,
  writeReqs: WRITE_CHECK_S22.length,
  objectives: OBJECTIVES_33.length,
} as const;

/* تحقق ثابت 1:1 مع السجل: لا شريحة مكررة ولا شريحة بلا مصدر */
export const __VERIFY_SLIDES_33 = (() => {
  const ids = new Set<string>();
  SLIDES.forEach((s) => {
    if (ids.has(s.id)) throw new Error(`duplicate slide33 id: ${s.id}`);
    ids.add(s.id);
    if (!s.source?.length) throw new Error(`slide33 without source: ${s.id}`);
  });
  if (LESSON33_COUNTS.gd1 !== 8) throw new Error("GD1 must have 8 cases");
  if (LESSON33_COUNTS.storyHits !== 11) throw new Error("story must expose 11 verb phrases");
  if (LESSON33_COUNTS.paraErrors !== 11) throw new Error("Emma paragraph must expose 11 error spots");
  if (LESSON33_COUNTS.signals !== 21) throw new Error("signal sort must hold 21 words");
  if (LESSON33_COUNTS.stative !== 7) throw new Error("stative verbs list must hold 7");
  return true;
})();
