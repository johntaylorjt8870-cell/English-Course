// ============================================================
// الدرس 34 — Future Simple · المستقبل البسيط باستخدام WILL
// 🚀 THE FUTURE LAUNCHPAD — منصّة الإطلاق
//
// - سجل المصدر في ledger34.ts (40 قسمًا: غلاف + أهداف + 39 قسمًا مرقّمًا).
//   هذا الملف يحوي:
//   1) سجل الخطوات SLIDES: خطوة واحدة لكل قسم مصدري (1:1) مع مرجع المصدر.
//   2) محتوى التفاعلات: أمثلة المصدر مأخوذة من جسم الأقسام نفسها، وكل
//      جملة من إنشاء المنصة للتدريب تُوسم «مثال تدريبي للمنصة» في الواجهة.
// - مفاتيح اختبار §35 غير منصوصة في المصدر (§36 يعد بمفتاح تصحيح فقط)
//   ← مشتقة وفق قواعد الدرس وموسومة بذلك.
// ============================================================

export const LESSON_TITLE_34 = "الدرس 34: Future Simple";
export const LESSON_SUBTITLE_34 = "🚀 المستقبل البسيط باستخدام WILL — The Future Starts Here!";
export const LAB_NAME_34 = "FUTURE LAUNCHPAD";
export const LAB_AR_34 = "منصّة المستقبل";
export const LAB_MOTTO_34 = "Subject + will + V1 · won't = will not · Will + Subject + V1?";
export const LAB_PROMISE_34 = "قرار · وعد · توقع · عرض مساعدة — كلّها تنطلق من will + V1";

export const PHASE_META_34: { id: string; n: string; en: string; blurb: string }[] = [
  { id: "INTRO", n: "الإطلاق", en: "IGNITION", blurb: "الخريطة والأهداف." },
  { id: "CORE", n: "الشيفرة", en: "CORE CODE", blurb: "المعنى، البناء، والضمائر." },
  { id: "USES", n: "المهمات", en: "MISSIONS", blurb: "ست وظائف لـ will في سياق حقيقي." },
  { id: "FORMS", n: "التحكم", en: "CONTROL DECK", blurb: "النفي، السؤال، الاختصارات، والزمن." },
  { id: "DRILL", n: "التدريب", en: "FLIGHT TRAINING", blurb: "تحويلات، محقق، ومواقف IQ200." },
  { id: "READ", n: "القراءة", en: "READING ORBIT", blurb: "قصة Daniel ومقارنة الأزمنة." },
  { id: "MASTER", n: "الاختبار", en: "MASTER TEST", blurb: "25 سؤالًا في خمسة مستويات." },
  { id: "END", n: "الخاتمة", en: "TOUCHDOWN", blurb: "المشروع، الملخص، وخريطة الطريق." },
];

export const LESSON_META_34 = { number: 34 };

// ============================================================
// أقسام الشريط الجانبي
// ============================================================
export const SECTIONS_34: { id: string; label: string }[] = [
  { id: "INTRO", label: "🚀 الإطلاق" },
  { id: "CORE", label: "🧬 الشيفرة" },
  { id: "USES", label: "🎭 المهمات" },
  { id: "FORMS", label: "🎛️ لوحة التحكم" },
  { id: "DRILL", label: "🧑‍🚀 التدريب" },
  { id: "READ", label: "📖 القراءة" },
  { id: "MASTER", label: "🏆 الاختبار" },
  { id: "END", label: "🌟 الخاتمة" },
];

export type Slide34Data = {
  id: string;
  section: string;
  mascot: string;
  title: string;
  step?: string;
  lead?: string;
  tip?: string;
  source: string[];
};

export const SLIDES: Slide34Data[] = [
  { id: "cover", section: "INTRO", mascot: "🚀", title: "منصّة الإطلاق — Future Simple", step: "الغلاف",
    lead: "منظومتا الحاضر والماضي اكتملتا — اليوم نفتح باب المستقبل باستخدام will من منصّة إطلاق واحدة.",
    tip: "ثلاث لحظات على الخط الزمني — المس كل رقاقة لتكشف جملتها.", source: ["cover"] },
  { id: "objectives", section: "INTRO", mascot: "🎯", title: "أهداف الدرس", step: "الأهداف",
    lead: "تسعة أهداف — علّم كل هدف بعد أن تتقنه.",
    tip: "الهدف الأخير هو اختبار شامل: مواقف حياتية، وتصحيح أخطاء، وحوارات، وكتابة حرة.", source: ["objectives"] },

  { id: "s1", section: "CORE", mascot: "🧠", title: "ما المقصود بالمستقبل؟", step: "① المعنى",
    lead: "المستقبل هو ما سيحدث بعد لحظة الكلام — لكن الإنجليزية لا تستخدم will وحدها.",
    tip: "Past ← Now ← Future — ثلاث لحظات، ثلاث صيغ.", source: ["s1"] },
  { id: "s2", section: "CORE", mascot: "⭐", title: "القاعدة الأساسية: WILL + V1", step: "② القاعدة",
    lead: "الفاعل + will + الفعل الأساسي + بقية الجملة.",
    tip: "لاحظ أن الفعل بعد will لا يتغير مهما تغير الفاعل.", source: ["s2"] },
  { id: "s3", section: "CORE", mascot: "🔬", title: "WILL مع جميع الضمائر", step: "③ الضمائر",
    lead: "من أجمل خصائص will: لا تحتاج إلى حفظ تصريف مختلف مع كل ضمير.",
    tip: "He will learn. ✅ — He will learns. ❌", source: ["s3"] },
  { id: "s4", section: "CORE", mascot: "🚨", title: "القاعدة الذهبية الأولى", step: "④ الذهبية",
    lead: "بعد WILL يأتي الفعل بصيغته الأساسية دائمًا.",
    tip: "انتبه خصوصًا: لا نضع to بين will والفعل الأساسي.", source: ["s4"] },
  { id: "s5", section: "CORE", mascot: "🧠", title: "ما وظيفة WILL؟", step: "⑤ الوظيفة",
    lead: "will ليست حرف السين فقط — وظيفتها أوسع من ذلك.",
    tip: "ستة استخدامات: قرار، وعد، توقع، عرض، استعداد/رفض، وطلب مهذب.", source: ["s5"] },

  { id: "s6", section: "USES", mascot: "⚡", title: "الاستخدام الأول: القرار اللحظي — Decisions Made at the Moment of Speaking", step: "⑥ القرار",
    lead: "حدث أو موقف جديد ← قرار الآن ← WILL.",
    tip: "أنت لم تخطط لذلك منذ الصباح — بل اتخذت القرار في لحظة سماع الجرس.", source: ["s6"] },
  { id: "s7", section: "USES", mascot: "🎭", title: "حوار تطبيقي: At Home", step: "⑦ الحوار",
    lead: "عمر اتخذ قرارات استجابةً للموقف الحالي.",
    tip: "تحدٍّ صغير: أكمل الرد المناسب بـ will.", source: ["s7"] },
  { id: "s8", section: "USES", mascot: "🤝", title: "الاستخدام الثاني: الوعود — Promises", step: "⑧ الوعود",
    lead: "نستخدم will عندما نقدم وعدًا بشأن المستقبل.",
    tip: "الوعد قد يكون مثبتًا أو منفيًا.", source: ["s8"] },
  { id: "s9", section: "USES", mascot: "🔮", title: "الاستخدام الثالث: التوقعات — Predictions", step: "⑨ التوقع",
    lead: "التوقع مبني على رأينا أو اعتقادنا، وليس بالضرورة على دليل ظاهر أمامنا.",
    tip: "لكن لا تحفظها على أنها كلمات تفرض will دائمًا؛ المعنى والسياق هما الأساس.", source: ["s9"] },
  { id: "s10", section: "USES", mascot: "🧠", title: "الفرق بين الحقيقة والتوقع", step: "⑩ الحقيقة",
    lead: "حقيقة علمية ← Present Simple · احتمال مستقبلي ← Future Simple.",
    tip: "أي الجملتين أنسب للتعبير عن توقع؟", source: ["s10"] },
  { id: "s11", section: "USES", mascot: "🎁", title: "الاستخدام الرابع: عرض المساعدة — Offers", step: "⑪ العرض",
    lead: "نستخدم will عندما نعرض القيام بشيء من أجل شخص آخر.",
    tip: "لاحظ أن هذه الجمل تجمع بين القرار اللحظي وعرض المساعدة.", source: ["s11"] },
  { id: "s12", section: "USES", mascot: "⭐", title: "Shall I...?", step: "⑫ Shall",
    lead: "صيغة مفيدة لعرض القيام بشيء، خصوصًا في الإنجليزية البريطانية أو الأسلوب الأكثر رسمية.",
    tip: "لا تحتاج الآن إلى دراسة shall بصورة موسعة — لكن تعرّف عليها عندما تراها في حوار.", source: ["s12"] },
  { id: "s13", section: "USES", mascot: "💪", title: "الاستخدام الخامس: الاستعداد والرفض — Willingness and Refusal", step: "⑬ الاستعداد",
    lead: "won't لا تعني دائمًا مجرد «لن يحدث في المستقبل».",
    tip: "فقد تحمل معنى عدم الاستعداد أو عدم الاستجابة، حسب السياق.", source: ["s13"] },

  { id: "s14", section: "FORMS", mascot: "✍️", title: "الاختصارات — Contractions", step: "⑭ الاختصارات",
    lead: "في المحادثات اليومية نستخدم اختصارات will بكثرة.",
    tip: "الاختصار لا يغير المعنى الأساسي للجملة.", source: ["s14"] },
  { id: "s15", section: "FORMS", mascot: "🚫", title: "النفي في Future Simple", step: "⑮ النفي",
    lead: "Subject + will not + V1 — والاختصار will not = won't.",
    tip: "will نفسها فعل مساعد، لذلك لا نحتاج do أو does لتكوين النفي.", source: ["s15"] },
  { id: "s16", section: "FORMS", mascot: "🚨", title: "أخطاء النفي الشائعة", step: "⑯ أخطاء النفي",
    lead: "اختر الجملة السليمة في كل زوج.",
    tip: "He doesn't will travel. ❌ ← He won't travel. ✅", source: ["s16"] },
  { id: "s17", section: "FORMS", mascot: "❓", title: "تكوين السؤال — Yes/No Questions", step: "⑰ السؤال",
    lead: "عند تكوين السؤال نضع will قبل الفاعل.",
    tip: "Will + Subject + V1 + Rest?", source: ["s17"] },
  { id: "s18", section: "FORMS", mascot: "💬", title: "الإجابات القصيرة", step: "⑱ القصيرة",
    lead: "لأن السؤال بدأ بـ will — فالجواب بنفس الآلة.",
    tip: "Yes, I will. ✅ — Yes, I do. ❌", source: ["s18"] },
  { id: "s19", section: "FORMS", mascot: "🧠", title: "أسئلة Wh مع WILL", step: "⑲ Wh",
    lead: "Wh-word + will + Subject + V1?",
    tip: "What · Where · When · Why · Who · How · How long · How many", source: ["s19"] },
  { id: "s20", section: "FORMS", mascot: "🔍", title: "عندما تكون WHO هي الفاعل", step: "⑳ Who",
    lead: "لاحظ اختلاف المعنى رغم استخدام will في الجملتين.",
    tip: "Who will help us? ← Who هي الفاعل · Who will you help? ← You هو الفاعل.", source: ["s20"] },
  { id: "s21", section: "FORMS", mascot: "🕒", title: "الكلمات والتعبيرات الزمنية", step: "㉑ الزمن",
    lead: "من التعبيرات الشائعة مع المستقبل.",
    tip: "الكلمة الزمنية تخبرنا متى سيحدث الشيء — لا ما الصيغة الواجبة.", source: ["s21"] },
  { id: "s22", section: "FORMS", mascot: "⚠️", title: "لا تجعل الكلمات الدالة تتحكم بك", step: "㉒ الدلالات",
    lead: "وجود tomorrow لا يعني أن استخدام will إلزامي دائمًا.",
    tip: "I am meeting my teacher tomorrow. — جملة صحيحة بترتيب مستقبلي.", source: ["s22"] },
  { id: "s23", section: "FORMS", mascot: "🔬", title: "WILL vs BE GOING TO — نظرة تمهيدية", step: "㉓ Going to",
    lead: "قرار في لحظة الكلام ← will · نية أو خطة موجودة مسبقًا ← be going to.",
    tip: "هذه فروق تعليمية شائعة وليست حدودًا مطلقة بين الصيغتين.", source: ["s23"] },
  { id: "s24", section: "FORMS", mascot: "🚨", title: "خطأ شائع: WILL مع الزمن الماضي", step: "㉔ الماضي",
    lead: "لأن visited هي صيغة الماضي، بينما will تحتاج الفعل الأساسي.",
    tip: "حتى الأفعال الشاذة تعود إلى V1 بعد will: will go وليس will went.", source: ["s24"] },
  { id: "s25", section: "FORMS", mascot: "🧠", title: "WILL + BE", step: "㉕ Will be",
    lead: "عندما نريد وصف حالة مستقبلية، نستخدم will be.",
    tip: "بعد will نستخدم الشكل الأساسي be، وليس am أو is أو are.", source: ["s25"] },
  { id: "s26", section: "FORMS", mascot: "🔄", title: "المقارنة مع Verb to be", step: "㉖ Verb to be",
    lead: "لاحظ كيف أصبحت الصيغة واحدة مع جميع الضمائر: will be.",
    tip: "وهذا يجعل بناء المستقبل أبسط من بعض الأزمنة السابقة.", source: ["s26"] },

  { id: "s27", section: "DRILL", mascot: "🎬", title: "حوار تطبيقي: The School Project", step: "㉗ الحوار",
    lead: "هذا الحوار يجمع معظم وظائف will التي درسناها.",
    tip: "حلّل الاستخدامات: قرار · تطوع · سؤال استعداد · وعد منفي · توقع.", source: ["s27"] },
  { id: "s28", section: "DRILL", mascot: "🧩", title: "تمرين تأسيسي: اختر الصيغة الصحيحة", step: "㉘ التمرين",
    lead: "بعد will أو won't نستخدم V1 دائمًا.",
    tip: "لا تنتقل إلى الإجابات قبل المحاولة.", source: ["s28"] },
  { id: "s29", section: "DRILL", mascot: "✍️", title: "تمرين التحويلات", step: "㉙ التحويلات",
    lead: "حوّل الجمل التالية إلى النفي، ثم إلى السؤال.",
    tip: "لاحظ في الجملة الرابعة أننا استخدمنا be ولم نستخدم is.", source: ["s29"] },
  { id: "s30", section: "DRILL", mascot: "🕵️", title: "Grammar Detective — اكتشف الأخطاء", step: "㉚ المحقق",
    lead: "كل جملة تحتوي على خطأ واحد على الأقل.",
    tip: "المس الكلمة الخاطئة ثم اختر التصحيح الصحيح.", source: ["s30"] },
  { id: "s31", section: "DRILL", mascot: "🔥", title: "IQ200 — اختر WILL بحسب الموقف", step: "㉛ IQ200",
    lead: "اقرأ كل موقف، ثم أكمل الرد المناسب.",
    tip: "اكتب ردك أولًا — ثم قارنه بالإجابة الممكنة من المصدر.", source: ["s31"] },

  { id: "s32", section: "READ", mascot: "📚", title: "Reading Challenge — A Decision That Changed Everything", step: "㉜ القراءة",
    lead: "اقرأ قصة Daniel ثم أجب عن الأسئلة.",
    tip: "المس العبارات الفعلية بـ will داخل القصة لتضيئها.", source: ["s32"] },
  { id: "s33", section: "READ", mascot: "🧠", title: "مقارنة الأزمنة — Past / Present / Future", step: "㉝ المقارنة",
    lead: "أكمل الجدول ذهنيًا باستخدام الفعل solve.",
    tip: "الجملة الأخيرة لا تعني أن المشكلة حُلّت فعلًا — بل تعبّر عن شيء مستقبلي.", source: ["s33"] },

  { id: "s34", section: "MASTER", mascot: "🏆", title: "الاختبار النهائي — Future Simple Master Test", step: "㉞ الاختبار",
    lead: "25 سؤالًا موزعة على خمسة مستويات.",
    tip: "حاول حله كاملًا قبل الانتقال إلى مفتاح التصحيح.", source: ["s34"] },
  { id: "s35", section: "MASTER", mascot: "🔐", title: "مساحة المعلم — الحلول التفصيلية للاختبار", step: "㉟ الحلول",
    lead: "مفتاح التصحيح موجود — لكنه لا يُكشف قبل إرسال الاختبار كاملًا.",
    tip: "أكمل الاختبار أولًا، ثم اكشف الحلول وقارن إجاباتك.", source: ["s35"] },

  { id: "s36", section: "END", mascot: "🚀", title: "Final Boss — مشروع التعبير الحر", step: "㊱ المشروع",
    lead: "My Predictions and Promises — اكتب فقرة من 10 إلى 12 جملة.",
    tip: "أكمل بأفكارك الخاصة، ولا تكتفِ بتغيير كلمات المثال.", source: ["s36"] },
  { id: "s37", section: "END", mascot: "🌟", title: "الملخص الذهبي للدرس 34", step: "㊲ الملخص",
    lead: "القاعدة الذهبية: بعد will أو won't يأتي V1 دائمًا، دون s أو ed أو ing أو to.",
    tip: "اقلب البطاقات الخمس ثم راجع القاعدة الذهبية.", source: ["s37"] },
  { id: "s38", section: "END", mascot: "🗺️", title: "خريطة تقدم المنهج", step: "㊳ الخريطة",
    lead: "بدأنا منظومة المستقبل — Future Simple WILL مكتمل.",
    tip: "الدرس القادم 35: BE GOING TO — الخطط والنوايا والتوقعات المبنية على أدلة.", source: ["s38"] },
];

export const SLIDE_COUNT_34 = SLIDES.length;

// ============================================================
// الأهداف (من قسم objectives في المصدر)
// ============================================================
export const OBJECTIVES_34: { n: string; text: string }[] = [
  { n: "1", text: "فهم معنى Future Simple واستخداماته الأساسية." },
  { n: "2", text: "تكوين جمل المستقبل باستخدام will + V1." },
  { n: "3", text: "التمييز بين القرار اللحظي، والوعد، والتوقع، والعرض، والاستعداد للمساعدة." },
  { n: "4", text: "تكوين الجمل المثبتة والمنفية والاستفهامية." },
  { n: "5", text: "استخدام الاختصارات I'll و won't بشكل صحيح." },
  { n: "6", text: "طرح أسئلة باستخدام What و Where و When و Why و Who و How." },
  { n: "7", text: "فهم الفرق بين will و Present Simple و Present Continuous في السياقات التي درسناها." },
  { n: "8", text: "التعرف مبدئيًا على الفرق بين will و be going to دون استباق الدرس المخصص له." },
  { n: "9", text: "حل اختبار شامل يتضمن مواقف حياتية، وتصحيح أخطاء، وحوارات، وكتابة حرة." },
];

// ============================================================
// الغلاف — الخط الزمني + وظائف will
// ============================================================
export const TIMELINE_COVER_34: { en: string; ar: string; tense: string; tag: string }[] = [
  { en: "I studied yesterday.", ar: "درست أمس.", tense: "Past Simple", tag: "الماضي" },
  { en: "I am studying now.", ar: "أنا أدرس الآن.", tense: "Present Continuous", tag: "الحاضر" },
  { en: "I will study tomorrow.", ar: "سأدرس غدًا.", tense: "Future Simple", tag: "المستقبل" },
];
export const COVER_FUNCTIONS_34: { n: string; title: string; ar: string }[] = [
  { n: "①", title: "Decisions", ar: "اتخاذ قرار في لحظة الكلام." },
  { n: "②", title: "Promises", ar: "تقديم وعد." },
  { n: "③", title: "Predictions", ar: "التعبير عن توقع أو اعتقاد بشأن المستقبل." },
  { n: "④", title: "Offers", ar: "عرض المساعدة أو القيام بشيء لشخص آخر." },
];

// ============================================================
// s1 — ثلاث لحظات: طابق الجملة بزمنها
// ============================================================
export const MOMENT_ROWS_S1: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "I studied yesterday.", options: ["Past Simple", "Present Continuous", "Future Simple"], pick: 0, why: "yesterday ← حدث منتهٍ في الماضي ← Past Simple." },
  { prompt: "I am studying now.", options: ["Future Simple", "Present Continuous", "Past Simple"], pick: 1, why: "now ← نشاط جارٍ في هذه اللحظة ← Present Continuous." },
  { prompt: "I will study tomorrow.", options: ["Present Continuous", "Future Simple", "Past Simple"], pick: 1, why: "tomorrow مع will ← حدث نتحدث عنه في المستقبل ← Future Simple." },
];

// ============================================================
// s2 — أمثلة القاعدة: طابق الجملة بمعناها
// ============================================================
export const RULE_ROWS_S2: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "I will travel.", options: ["سأسافر.", "ستساعدك.", "سيصلون غدًا."], pick: 0, why: "I will travel ← سأسافر." },
  { prompt: "She will help you.", options: ["سأسافر.", "ستساعدك.", "سنحل المسألة."], pick: 1, why: "She will help you ← ستساعدك." },
  { prompt: "They will arrive tomorrow.", options: ["سيتصل بأخيه.", "سيصلون غدًا.", "سنحل المسألة."], pick: 1, why: "They will arrive tomorrow ← سيصلون غدًا." },
  { prompt: "We will solve the problem.", options: ["سيصلون غدًا.", "سأسافر.", "سنحل المسألة."], pick: 2, why: "We will solve the problem ← سنحل المسألة." },
  { prompt: "He will call his brother.", options: ["سيتصل بأخيه.", "ستساعدك.", "سأدرس غدًا."], pick: 0, why: "He will call his brother ← سيتصل بأخيه." },
];

// ============================================================
// s3 — جدول الضمائر + أزواج ✅/❌
// ============================================================
export const PRONOUN_FORMS_34: { p: string; form: string }[] = [
  { p: "I", form: "I will" },
  { p: "You", form: "You will" },
  { p: "He", form: "He will" },
  { p: "She", form: "She will" },
  { p: "It", form: "It will" },
  { p: "We", form: "We will" },
  { p: "They", form: "They will" },
];
export const PRONOUN_PICK_S3: { label: string; opts: string[]; correct: number; why: string }[] = [
  { label: "أي الجملتين صحيحة؟", opts: ["He will learn.", "He will learns."], correct: 0, why: "لأننا لا نضيف s إلى الفعل بعد will." },
  { label: "وأي الجملتين صحيحة؟", opts: ["It will works.", "It will work."], correct: 1, why: "بعد will يأتي الفعل بصيغته الأساسية دائمًا." },
];

// ============================================================
// s4 — القاعدة الذهبية: الأفعال + أزواج الأخطاء
// ============================================================
export const GOLDEN_VERBS_34: { v1: string; will: string }[] = [
  { v1: "go", will: "will go" },
  { v1: "study", will: "will study" },
  { v1: "watch", will: "will watch" },
  { v1: "finish", will: "will finish" },
  { v1: "write", will: "will write" },
  { v1: "eat", will: "will eat" },
  { v1: "have", will: "will have" },
  { v1: "be", will: "will be" },
];
export const ERROR_PAIRS_S4: { wrong: string; right: string; why: string }[] = [
  { wrong: "She will goes.", right: "She will go.", why: "لا نضيف s إلى الفعل بعد will." },
  { wrong: "He will studied.", right: "He will study.", why: "will تحتاج الفعل الأساسي V1 لا صيغة الماضي." },
  { wrong: "They will playing.", right: "They will play.", why: "بعد will لا تأتي صيغة ing." },
  { wrong: "I will to travel.", right: "I will travel.", why: "لا نضع to بين will والفعل الأساسي." },
];

// ============================================================
// s4 — تدريب إضافي من إعداد المنصة (ليس نصًا مصادرًا):
// ثلاث مصائد يكرّرها المتعلّم بعد will/won't — لكل خيار ملاحظة
// تصحيحية خاصة به، ولا تظهر الإجابة الصحيحة قبل اختيار المتعلّم.
// ============================================================
export type WillTrap34 = {
  n: string;
  label: string;
  options: { text: string; ok: boolean; note?: string }[];
  fix: string;
  why: string;
};

export const WILL_TRAPS_S4: WillTrap34[] = [
  {
    n: "①",
    label: "فاعل غائب + will",
    options: [
      { text: "She will goes to school.", ok: false, note: "صيغة الفعل هنا فيها s زائدة — وبعد will لا نضيف s أبدًا؛ الصواب go." },
      { text: "She will go to school.", ok: true },
      { text: "She will going to school.", ok: false, note: "صيغة ing لا تأتي بعد will — المطلوب V1." },
    ],
    fix: "She will go to school.",
    why: "بعد will يأتي الفعل الأساسي V1: go — لا goes ولا going.",
  },
  {
    n: "②",
    label: "النفي won't والفعل",
    options: [
      { text: "She won't to go to the party.", ok: false, note: "لا نضع to بين won't والفعل مباشرة — الصواب won't go." },
      { text: "She won't go to the party.", ok: true },
      { text: "She doesn't will go to the party.", ok: false, note: "أداة النفي won't وحدها تكفي — لا حاجة إلى doesn't." },
    ],
    fix: "She won't go to the party.",
    why: "won't = will not، وبعدها V1 مباشرة دون to.",
  },
  {
    n: "③",
    label: "الفعل الشاذ في الماضي",
    options: [
      { text: "He will went to the market.", ok: false, note: "الفعل went تصريف ماضٍ — بعد will نعود إلى go." },
      { text: "He will gone to the market.", ok: false, note: "الفعل gone تصريف ثالث V3 وليس V1 — الصواب go." },
      { text: "He will go to the market.", ok: true },
    ],
    fix: "He will go to the market.",
    why: "سلسلة go → went → gone تتوقف عند will: will go فقط.",
  },
];

// ============================================================
// s5 — وظائف will الست
// ============================================================
export const USE_CARDS_S5: { n: string; title: string; ar: string; ex: string; exAr: string }[] = [
  { n: "①", title: "اتخاذ قرار في لحظة الكلام", ar: "Decisions at the moment of speaking", ex: "I'll open the door.", exAr: "سأفتح الباب." },
  { n: "②", title: "تقديم وعد", ar: "Promises", ex: "I will always support you.", exAr: "سأدعمك دائمًا." },
  { n: "③", title: "التعبير عن توقع أو اعتقاد بشأن المستقبل", ar: "Predictions", ex: "I believe our team will win the competition.", exAr: "أعتقد أن فريقنا سيفوز بالمسابقة." },
  { n: "④", title: "عرض المساعدة أو القيام بشيء لشخص آخر", ar: "Offers", ex: "I'll carry that box for you.", exAr: "سأحمل ذلك الصندوق عنك." },
  { n: "⑤", title: "التعبير عن الاستعداد لفعل شيء أو رفضه", ar: "Willingness / Refusal", ex: "He won't listen to my advice.", exAr: "إنه يرفض الاستماع إلى نصيحتي." },
  { n: "⑥", title: "تقديم طلب مهذب باستخدام Will you...?", ar: "Polite request", ex: "Will you help me?", exAr: "هل ستساعدني؟" },
];

// ============================================================
// s6 — القرار اللحظي: التبادلات الثلاثة
// ============================================================
export const MOMENT_EXCHANGES_S6: { a: string; aAr: string; b: string; bAr: string; note?: string }[] = [
  { a: "تخيل أنك جالس في المنزل، وفجأة تسمع جرس الباب.", aAr: "", b: "I'll open the door.", bAr: "سأفتح الباب.", note: "أنت لم تخطط لذلك منذ الصباح — بل اتخذت القرار في لحظة سماع الجرس." },
  { a: "A: I'm thirsty.", aAr: "أنا عطشان.", b: "B: I'll get you some water.", bAr: "سأحضر لك بعض الماء.", note: "الشخص B قرر المساعدة في تلك اللحظة." },
  { a: "A: The room is very dark.", aAr: "الغرفة مظلمة جدًا.", b: "B: I'll turn on the light.", bAr: "سأشعل الضوء." },
];

// ============================================================
// s7 — حوار At Home
// ============================================================
export const DIALOGUE_HOME_S7: { who: string; en: string; ar: string }[] = [
  { who: "Maya", en: "Someone is calling you!", ar: "هناك شخص يتصل بك!" },
  { who: "Omar", en: "Really? I'll answer the phone.", ar: "حقًا؟ سأرد على الهاتف." },
  { who: "Maya", en: "And the kitchen window is open.", ar: "ونافذة المطبخ مفتوحة." },
  { who: "Omar", en: "I'll close it after the call.", ar: "سأغلقها بعد المكالمة." },
  { who: "Maya", en: "Thank you!", ar: "شكرًا!" },
];
export const CHALLENGE_S7: { before: string; after: string; accept: string[]; solution: string } = {
  before: "B: Don't worry. I",
  after: "you.",
  accept: ["'ll help", "will help", "ll help"],
  solution: "I'll help you.",
};

// ============================================================
// s8 — الوعود
// ============================================================
export const PROMISE_EXAMPLES_S8: { en: string; ar: string }[] = [
  { en: "I will always support you.", ar: "سأدعمك دائمًا." },
  { en: "I will return your book tomorrow.", ar: "سأعيد كتابك غدًا." },
  { en: "I won't tell anyone your secret.", ar: "لن أخبر أحدًا بسرّك." },
  { en: "We will take care of your plants while you're away.", ar: "سنعتني بنباتاتك أثناء غيابك." },
];
export const PROMISE_PHRASES_S8: { en: string; ar: string }[] = [
  { en: "I promise I will...", ar: "أعدك بأنني سوف..." },
  { en: "I promise I won't...", ar: "أعدك بأنني لن..." },
];
export const PROMISE_USES_S8: { en: string; ar: string }[] = [
  { en: "I promise I will be careful.", ar: "أعدك بأنني سأكون حذرًا." },
  { en: "I promise I won't forget your birthday.", ar: "أعدك بأنني لن أنسى عيد ميلادك." },
];

// ============================================================
// s9 — التوقعات
// ============================================================
export const PREDICTION_EXAMPLES_S9: { en: string; ar: string }[] = [
  { en: "I think robots will become more useful in schools.", ar: "أعتقد أن الروبوتات ستصبح أكثر فائدة في المدارس." },
  { en: "I believe our team will win the competition.", ar: "أعتقد أن فريقنا سيفوز بالمسابقة." },
  { en: "Perhaps people will build cities on Mars one day.", ar: "ربما يبني الناس مدنًا على المريخ يومًا ما." },
  { en: "I'm sure you will enjoy this book.", ar: "أنا متأكد أنك ستستمتع بهذا الكتاب." },
];
export const PREDICTION_CUES_S9: string[] = ["I think...", "I believe...", "I hope...", "I'm sure...", "Perhaps...", "Maybe...", "Probably..."];

// ============================================================
// s10 — الحقيقة مقابل التوقع
// ============================================================
export const FACT_VS_PREDICT_S10: { en: string; ar: string; kind: string; form: string }[] = [
  { en: "The Earth moves around the Sun.", ar: "الأرض تدور حول الشمس.", kind: "هذه حقيقة علمية.", form: "Present Simple." },
  { en: "I think technology will change education dramatically.", ar: "أعتقد أن التكنولوجيا ستغيّر التعليم بصورة كبيرة.", kind: "هذا توقع بشأن المستقبل.", form: "Future Simple." },
];
export const IQ_FACT_ROW_S10: { prompt: string; options: string[]; pick: number; why: string } = {
  prompt: "أي الجملتين أنسب للتعبير عن توقع؟",
  options: ["A. People live on another planet one day.", "B. People will live on another planet one day."],
  pick: 1,
  why: "الإجابة: B. لأننا نتحدث عن احتمال مستقبلي.",
};

// ============================================================
// s11 — عرض المساعدة
// ============================================================
export const OFFER_EXAMPLES_S11: { en: string; ar: string }[] = [
  { en: "I'll carry that box for you.", ar: "سأحمل ذلك الصندوق عنك." },
  { en: "I'll explain the exercise again.", ar: "سأشرح التمرين مرة أخرى." },
  { en: "I'll show you how to use this program.", ar: "سأريك كيف تستخدم هذا البرنامج." },
  { en: "I'll make you a sandwich.", ar: "سأعد لك شطيرة." },
];

// ============================================================
// s12 — Shall I...?
// ============================================================
export const SHALL_EXAMPLES_S12: { en: string; ar: string }[] = [
  { en: "Shall I open the window?", ar: "هل أفتح النافذة؟" },
  { en: "Shall I help you with your homework?", ar: "هل أساعدك في واجبك؟" },
  { en: "Shall we start?", ar: "هل نبدأ؟" },
];

// ============================================================
// s13 — الاستعداد والرفض
// ============================================================
export const WILLINGNESS_S13: { en: string; ar: string }[] = [
  { en: "I'll help you whenever you need me.", ar: "سأساعدك كلما احتجت إليّ." },
];
export const REFUSAL_S13: { en: string; ar: string }[] = [
  { en: "He won't listen to my advice.", ar: "إنه يرفض الاستماع إلى نصيحتي." },
  { en: "The printer won't work.", ar: "الطابعة لا تستجيب أو ترفض العمل، رغم محاولتنا تشغيلها." },
];
export const REFUSAL_ROWS_S13: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "He won't listen to my advice.", options: ["رفض أو عدم استعداد", "توقع سلبي عن المستقبل"], pick: 0, why: "هنا won't تحمل معنى الرفض وليس مجرد توقع." },
  { prompt: "The printer won't work.", options: ["توقع سلبي عن المستقبل", "عدم استجابة رغم المحاولة"], pick: 1, why: "الطابعة لا تستجيب أو ترفض العمل، رغم محاولتنا تشغيلها." },
  { prompt: "I'll help you whenever you need me.", options: ["استعداد لفعل شيء", "رفض"], pick: 0, why: "will هنا تعبّر عن استعداد الشخص لفعل شيء." },
];

// ============================================================
// s14 — الاختصارات
// ============================================================
export const CONTRACTIONS_34: { full: string; short: string }[] = [
  { full: "I will", short: "I'll" },
  { full: "You will", short: "You'll" },
  { full: "He will", short: "He'll" },
  { full: "She will", short: "She'll" },
  { full: "It will", short: "It'll" },
  { full: "We will", short: "We'll" },
  { full: "They will", short: "They'll" },
];
export const CONTRACTION_EXAMPLES_34: { en: string; ar: string }[] = [
  { en: "I'll call you later.", ar: "سأتصل بك لاحقًا." },
  { en: "You'll understand soon.", ar: "سوف تفهم قريبًا." },
  { en: "He'll be here tomorrow.", ar: "سيكون هنا غدًا." },
  { en: "She'll explain everything.", ar: "سوف تشرح كل شيء." },
  { en: "We'll finish together.", ar: "سننتهي معًا." },
  { en: "They'll arrive next week.", ar: "سيصلون الأسبوع القادم." },
];

// ============================================================
// s15 — النفي
// ============================================================
export const NEG_EXAMPLES_S15: { en: string; ar: string }[] = [
  { en: "I will not forget.", ar: "لن أنسى." },
  { en: "I won't forget.", ar: "لن أنسى." },
  { en: "She won't attend the meeting.", ar: "لن تحضر الاجتماع." },
  { en: "They won't arrive before noon.", ar: "لن يصلوا قبل الظهر." },
  { en: "We won't give up.", ar: "لن نستسلم." },
  { en: "He won't buy that expensive phone.", ar: "لن يشتري ذلك الهاتف الغالي." },
];

// ============================================================
// s16 — أخطاء النفي الشائعة
// ============================================================
export const NEG_ERROR_PAIRS_S16: { wrong: string; right: string; why: string }[] = [
  { wrong: "He doesn't will travel.", right: "He won't travel.", why: "will نفسها فعل مساعد، لذلك لا نحتاج do أو does لتكوين النفي." },
  { wrong: "They will don't come.", right: "They won't come.", why: "لا نجمعه مع don't — النفي يأتي من won't وحدها." },
  { wrong: "She won't goes.", right: "She won't go.", why: "بعد won't يأتي الفعل الأساسي V1." },
  { wrong: "I will not to leave.", right: "I will not leave.", why: "لا نضع to بين will والفعل الأساسي." },
];

// ============================================================
// s17 — تكوين السؤال
// ============================================================
export const QUESTION_EXAMPLES_S17: { en: string; ar: string }[] = [
  { en: "Will you come tomorrow?", ar: "هل ستأتي غدًا؟" },
  { en: "Will he understand the instructions?", ar: "هل سيفهم التعليمات؟" },
  { en: "Will they visit us next weekend?", ar: "هل سيزوروننا في عطلة نهاية الأسبوع القادمة؟" },
  { en: "Will the new system work?", ar: "هل سيعمل النظام الجديد؟" },
];

// ============================================================
// s18 — الإجابات القصيرة
// ============================================================
export const SHORT_ROWS_S18: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "Will you come tomorrow?", options: ["Yes, I do.", "Yes, I will.", "Yes, I am."], pick: 1, why: "لأن السؤال بدأ بـ will." },
  { prompt: "Will she participate?", options: ["Yes, she does.", "Yes, she is.", "Yes, she will."], pick: 2, why: "السؤال بـ will والجواب بنفس الآلة." },
  { prompt: "Will they arrive early?", options: ["Yes, they are.", "Yes, they will.", "Yes, they do."], pick: 1, why: "Yes, they will. ✅ — لا Yes, they do." },
];

// ============================================================
// s19 — أسئلة Wh
// ============================================================
export const WH_WORDS_S19: { w: string; ar: string; ex: string; exAr: string }[] = [
  { w: "What", ar: "ماذا", ex: "What will you study next year?", exAr: "ماذا ستدرس العام القادم؟" },
  { w: "Where", ar: "أين", ex: "Where will they stay?", exAr: "أين سيقيمون؟" },
  { w: "When", ar: "متى", ex: "When will the competition begin?", exAr: "متى ستبدأ المسابقة؟" },
  { w: "Why", ar: "لماذا", ex: "Why will he leave early?", exAr: "لماذا سيغادر مبكرًا؟" },
  { w: "Who", ar: "من", ex: "Who will help us?", exAr: "من سيساعدنا؟" },
  { w: "How", ar: "كيف", ex: "How will we solve this problem?", exAr: "كيف سنحل هذه المشكلة؟" },
  { w: "How long", ar: "كم من الوقت", ex: "How long will the meeting last?", exAr: "كم من الوقت سيستمر الاجتماع؟" },
  { w: "How many", ar: "كم عدد", ex: "How many students will participate?", exAr: "كم طالبًا سيشارك؟" },
];

// ============================================================
// s20 — Who كفاعل
// ============================================================
export const WHO_COMPARE_S20: { en: string; ar: string; who: string }[] = [
  { en: "Who will help us?", ar: "من سيساعدنا؟", who: "هنا Who هي الفاعل نفسه." },
  { en: "Who will you help?", ar: "من ستساعد؟", who: "هنا You هو الفاعل، وWho تشير إلى الشخص الذي سيتلقى المساعدة." },
];

// ============================================================
// s21 — الكلمات الزمنية
// ============================================================
export const TIME_WORDS_S21: { en: string; ar: string }[] = [
  { en: "tomorrow", ar: "غدًا" },
  { en: "tomorrow morning", ar: "صباح الغد" },
  { en: "next week", ar: "الأسبوع القادم" },
  { en: "next month", ar: "الشهر القادم" },
  { en: "next year", ar: "العام القادم" },
  { en: "soon", ar: "قريبًا" },
  { en: "later", ar: "لاحقًا" },
  { en: "in two hours", ar: "بعد ساعتين" },
  { en: "in the future", ar: "في المستقبل" },
  { en: "one day", ar: "يومًا ما" },
  { en: "tonight", ar: "الليلة" },
];
export const TIME_EXAMPLES_S21: { en: string; ar: string }[] = [
  { en: "I'll send the document tomorrow.", ar: "سأرسل المستند غدًا." },
  { en: "They will announce the results next week.", ar: "سيعلنون النتائج الأسبوع القادم." },
  { en: "I think we will find a solution soon.", ar: "أعتقد أننا سنجد حلًا قريبًا." },
];

// ============================================================
// s22 — لا تجعل الكلمات الدالة تتحكم بك
// ============================================================
export const CUE_WARNING_ROWS_S22: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "وجود tomorrow في الجملة يعني أن will إلزامي دائمًا.", options: ["نعم، tomorrow تفرض will", "لا، tomorrow لا تفرض صيغة بعينها"], pick: 1, why: "وجود tomorrow لا يعني أن استخدام will إلزامي دائمًا." },
  { prompt: "I am meeting my teacher tomorrow. — ما الصيغة المستخدمة؟", options: ["Present Simple", "Present Continuous", "Future Simple"], pick: 1, why: "هذه جملة صحيحة، وتستخدم Present Continuous للتعبير عن ترتيب مستقبلي." },
  { prompt: "الكلمة الزمنية تخبرنا…", options: ["بالصيغة الواجبة فقط", "بمتى سيحدث الشيء"], pick: 1, why: "لكن اختيار الصيغة يعتمد أيضًا على نوع المعنى الذي نريد التعبير عنه." },
];

// ============================================================
// s23 — will vs be going to
// ============================================================
export const GOING_TO_SITUATIONS_S23: { ar: string; en: string; form: string; why: string }[] = [
  { ar: "أنت جالس مع صديقك، وفجأة يقول: I'm hungry.", en: "I'll make you something to eat.", form: "will", why: "هنا اتخذت القرار في لحظة الكلام. Will مناسبة جدًا." },
  { ar: "منذ يومين قررت أن تبدأ تعلم البرمجة، وجهزت الكتب والخطة.", en: "I'm going to learn programming.", form: "be going to", why: "هنا تتحدث عن نية أو خطة موجودة مسبقًا. be going to مناسبة جدًا." },
  { ar: "I think it will rain tomorrow.", en: "I think it will rain tomorrow.", form: "will", why: "توقع." },
  { ar: "Look at those dark clouds!", en: "It's going to rain.", form: "be going to", why: "توقع مبني على دليل واضح أمامنا." },
];
export const GOING_TO_ROWS_S23: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "أنت جالس مع صديقك، وفجأة يقول: I'm hungry. — فترد:", options: ["I'll make you something to eat.", "I'm going to make you something to eat."], pick: 0, why: "هنا اتخذت القرار في لحظة الكلام — Will مناسبة جدًا." },
  { prompt: "منذ يومين قررت أن تبدأ تعلم البرمجة، وجهزت الكتب والخطة. — تقول:", options: ["I'm going to learn programming.", "I'll learn programming."], pick: 0, why: "هنا تتحدث عن نية أو خطة موجودة مسبقًا — be going to مناسبة جدًا." },
  { prompt: "Look at those dark clouds! — أي الجملتين؟", options: ["It's going to rain.", "It will rain."], pick: 0, why: "توقع مبني على دليل واضح أمامنا." },
];

// ============================================================
// s24 — will مع الزمن الماضي
// ============================================================
export const PAST_ERROR_PAIRS_S24: { wrong: string; right: string; why: string }[] = [
  { wrong: "I will visited my friend.", right: "I will visit my friend.", why: "لأن visited هي صيغة الماضي، بينما will تحتاج الفعل الأساسي." },
  { wrong: "She will bought a new laptop.", right: "She will buy a new laptop.", why: "بعد will نعود إلى V1 دائمًا." },
];
export const IRREGULAR_CHAIN_S24: { v1: string; v2: string; v3: string; right: string; wrong: string[] }[] = [
  { v1: "go", v2: "went", v3: "gone", right: "will go", wrong: ["will went", "will gone"] },
];

// ============================================================
// s25 — will + be
// ============================================================
export const BE_EXAMPLES_S25: { en: string; ar: string }[] = [
  { en: "I will be ready.", ar: "سأكون جاهزًا." },
  { en: "She will be happy.", ar: "ستكون سعيدة." },
  { en: "The exam will be difficult.", ar: "سيكون الامتحان صعبًا." },
  { en: "They will be at home.", ar: "سيكونون في المنزل." },
];
export const BE_ERROR_PAIRS_S25: { wrong: string; right: string; why: string }[] = [
  { wrong: "She will is happy.", right: "She will be happy.", why: "بعد will نستخدم الشكل الأساسي be، وليس am أو is أو are." },
  { wrong: "They will are ready.", right: "They will be ready.", why: "بعد will نستخدم be وليس are." },
];

// ============================================================
// s26 — المقارنة مع Verb to be
// ============================================================
export const BE_TABLE_S26: { pronoun: string; present: string; past: string; future: string }[] = [
  { pronoun: "I", present: "I am tired.", past: "I was tired.", future: "I will be tired." },
  { pronoun: "He", present: "He is ready.", past: "He was ready.", future: "He will be ready." },
  { pronoun: "They", present: "They are busy.", past: "They were busy.", future: "They will be busy." },
];

// ============================================================
// s27 — حوار The School Project
// ============================================================
export const DIALOGUE_PROJECT_S27: { who: string; en: string; ar: string }[] = [
  { who: "Lena", en: "Our science presentation is tomorrow!", ar: "عرضنا العلمي غدًا!" },
  { who: "Karim", en: "I know. I'm a little nervous.", ar: "أعلم. أنا متوتر قليلًا." },
  { who: "Lena", en: "Don't worry. I'll prepare the introduction.", ar: "لا تقلق. سأجهز المقدمة." },
  { who: "Karim", en: "Great! I'll explain the experiment.", ar: "رائع! سأشرح التجربة." },
  { who: "Lena", en: "Will you bring the materials?", ar: "هل ستحضر المواد؟" },
  { who: "Karim", en: "Yes, I will. I promise I won't forget them.", ar: "نعم. أعدك أنني لن أنساها." },
  { who: "Lena", en: "Do you think our teacher will like the project?", ar: "هل تعتقد أن معلمتنا ستحب المشروع؟" },
  { who: "Karim", en: "I'm sure she will!", ar: "أنا متأكد من ذلك!" },
];
export const USE_ANALYSIS_S27: { phrase: string; options: string[]; pick: number; why: string }[] = [
  { phrase: "I'll prepare", options: ["قرار أو تطوع للقيام بمهمة", "وعد منفي", "توقع"], pick: 0, why: "قرار أو تطوع للقيام بمهمة." },
  { phrase: "I'll explain", options: ["توقع", "تطوع للقيام بمهمة", "رفض"], pick: 1, why: "تطوع للقيام بمهمة." },
  { phrase: "Will you bring...?", options: ["وعد", "سؤال عن الاستعداد للقيام بشيء", "قرار لحظي"], pick: 1, why: "سؤال عن الاستعداد للقيام بشيء." },
  { phrase: "I won't forget", options: ["توقع", "رفض", "وعد منفي"], pick: 2, why: "وعد منفي." },
  { phrase: "She will like", options: ["عرض مساعدة", "توقع", "قرار لحظي"], pick: 1, why: "توقع." },
];

// ============================================================
// s28 — التمرين التأسيسي (اختر الصيغة الصحيحة)
// ============================================================
export type McRow34 = { n: string; before: string; after: string; options: string[]; answer: number; why: string };
export const MC_ROWS_S28: McRow34[] = [
  { n: "①", before: "She will", after: "tomorrow.", options: ["travels", "travel", "traveled"], answer: 1, why: "بعد will يأتي الفعل الأساسي V1." },
  { n: "②", before: "They", after: "finish the work next week.", options: ["will", "are", "did"], answer: 0, why: "next week مع جملة مستقبل ← will." },
  { n: "③", before: "He will", after: "ready soon.", options: ["is", "be", "being"], answer: 1, why: "بعد will نستخدم be لا is." },
  { n: "④", before: "I", after: "forget your kindness.", options: ["won't", "don't will", "won't to"], answer: 0, why: "النفي يأتي من won't وحدها — بلا do وبدون to." },
  { n: "⑤", before: "", after: "you help me?", options: ["Do will", "Will", "Are will"], answer: 1, why: "السؤال يبدأ بـ Will قبل الفاعل." },
  { n: "⑥", before: "We will", after: "a new experiment.", options: ["tried", "trying", "try"], answer: 2, why: "بعد will يأتي V1." },
];

// ============================================================
// s29 — تمرين التحويلات
// ============================================================
export type TransformRow34 = { n: string; aff: string; neg: string; q: string; negAccept: string[]; qAccept: string[] };
export const TRANSFORM_ROWS_S29: TransformRow34[] = [
  { n: "①", aff: "He will buy a new backpack.", neg: "He won't buy a new backpack.", q: "Will he buy a new backpack?", negAccept: ["he won't buy a new backpack", "he will not buy a new backpack"], qAccept: ["will he buy a new backpack"] },
  { n: "②", aff: "They will visit the museum.", neg: "They won't visit the museum.", q: "Will they visit the museum?", negAccept: ["they won't visit the museum", "they will not visit the museum"], qAccept: ["will they visit the museum"] },
  { n: "③", aff: "We will finish the assignment.", neg: "We won't finish the assignment.", q: "Will we finish the assignment?", negAccept: ["we won't finish the assignment", "we will not finish the assignment"], qAccept: ["will we finish the assignment"] },
  { n: "④", aff: "Sara will be ready.", neg: "Sara won't be ready.", q: "Will Sara be ready?", negAccept: ["sara won't be ready", "sara will not be ready"], qAccept: ["will sara be ready"] },
  { n: "⑤", aff: "The machine will work.", neg: "The machine won't work.", q: "Will the machine work?", negAccept: ["the machine won't work", "the machine will not work"], qAccept: ["will the machine work"] },
];

// ============================================================
// s30 — Grammar Detective
// ============================================================
export type Detective34 = { n: string; segments: string[]; bad: number; fixOpts: string[]; fix: string; corrected: string; why: string };
export const DETECTIVE_S30: Detective34[] = [
  { n: "①", segments: ["He", "will", "goes", "to", "the", "market."], bad: 2, fixOpts: ["go", "gone", "going"], fix: "go", corrected: "He will go to the market.", why: "بعد will يأتي الفعل الأساسي V1." },
  { n: "②", segments: ["She", "won't", "to", "join", "the", "club."], bad: 2, fixOpts: ["join", "to join", "joining"], fix: "join", corrected: "She won't join the club.", why: "لا نضع to بين won't والفعل الأساسي." },
  { n: "③", segments: ["Will", "they", "arrives", "tomorrow?"], bad: 2, fixOpts: ["arrive", "arrived", "arriving"], fix: "arrive", corrected: "Will they arrive tomorrow?", why: "بعد will يأتي V1 في السؤال أيضًا." },
  { n: "④", segments: ["I", "will", "am", "happy."], bad: 2, fixOpts: ["be", "is", "are"], fix: "be", corrected: "I will be happy.", why: "بعد will نستخدم be لا am." },
  { n: "⑤", segments: ["Does", "he", "will", "call", "us?"], bad: 0, fixOpts: ["Will", "Do", "Is"], fix: "Will", corrected: "Will he call us?", why: "will نفسها فعل مساعد — لا حاجة إلى does." },
  { n: "⑥", segments: ["They", "will", "not", "playing", "football."], bad: 3, fixOpts: ["play", "played", "plays"], fix: "play", corrected: "They will not play football.", why: "بعد will not يأتي V1." },
  { n: "⑦", segments: ["She", "wills", "help", "her", "sister."], bad: 1, fixOpts: ["will", "will to", "willing"], fix: "will", corrected: "She will help her sister.", why: "will لا تأخذ s مع أي فاعل." },
  { n: "⑧", segments: ["I", "will", "to", "study", "harder."], bad: 2, fixOpts: ["study", "to study", "studying"], fix: "study", corrected: "I will study harder.", why: "لا نضع to بين will والفعل الأساسي." },
  { n: "⑨", segments: ["We", "won't", "be", "late?"], bad: 0, fixOpts: ["Won't", "Will", "Don't"], fix: "Won't", corrected: "Won't we be late?", why: "المطلوب تحويلها إلى سؤال منفي — فيبدأ بـ Won't." },
  { n: "⑩", segments: ["He", "will", "bought", "the", "tickets."], bad: 2, fixOpts: ["buy", "brought", "buying"], fix: "buy", corrected: "He will buy the tickets.", why: "will تحتاج الفعل الأساسي لا صيغة الماضي." },
];

// ============================================================
// s31 — IQ200: أربعة مواقف
// ============================================================
export type IqSituation34 = { n: string; ar: string; prompt: string; accept: string[]; model: string; reason: string; label?: string };
export const IQ_SITUATIONS_S31: IqSituation34[] = [
  { n: "الموقف الأول", ar: "صديقك أسقط كتبه على الأرض، وأنت تقرر مساعدته فورًا.", prompt: "You: Don't worry. I", accept: ["'ll help you pick them up", "will help you pick them up", "'ll help you", "will help you"], label: "الحل:", model: "I'll help you pick them up.", reason: "قرار لحظي وعرض مساعدة." },
  { n: "الموقف الثاني", ar: "أختك قلقة لأنك قد تنسى إحضار كتابها.", prompt: "You: I promise I", accept: ["won't forget your book", "will not forget your book", "won't forget it", "will not forget it"], label: "الحل:", model: "I promise I won't forget your book.", reason: "وعد منفي." },
  { n: "الموقف الثالث", ar: "يسألك صديقك عن رأيك في مستقبل الذكاء الاصطناعي.", prompt: "You: I think AI", accept: ["will become more important in education", "will become more important", "will change education", "will be more important in education"], label: "إجابة ممكنة:", model: "I think AI will become more important in education.", reason: "توقع أو اعتقاد بشأن المستقبل." },
  { n: "الموقف الرابع", ar: "شخص يقول لك إنه لا يفهم التعليمات.", prompt: "You: I", accept: ["'ll explain them to you", "will explain them to you", "'ll explain it to you", "will explain it to you"], label: "إجابة ممكنة:", model: "I'll explain them to you.", reason: "عرض مساعدة." },
];

// ============================================================
// s32 — قصة Daniel
// ============================================================
export type StorySeg34 = { t: string; hit?: number };
export const STORY_S32: StorySeg34[] = [
  { t: "Daniel is a thirteen-year-old student who enjoys building small electronic devices." },
  { t: "One afternoon, his teacher enters the classroom and announces a technology competition." },
  { t: "Daniel looks surprised." },
  { t: "Teacher: We need a student to represent our school." },
  { t: "Daniel: That sounds exciting!" },
  { t: "Teacher: The competition " }, { t: "will take place", hit: 1 }, { t: " next month." },
  { t: "Daniel thinks for a moment." },
  { t: "Daniel: " }, { t: "I'll participate!", hit: 2 },
  { t: "Teacher: Excellent. " }, { t: "Will you prepare", hit: 3 }, { t: " a working model?" },
  { t: "Daniel: Yes, " }, { t: "I will", hit: 4 }, { t: ". " }, { t: "I'll build", hit: 5 }, { t: " a small automatic lighting system." },
  { t: "Teacher: That sounds interesting. Do you think " }, { t: "it will work", hit: 6 }, { t: "?" },
  { t: "Daniel: I believe " }, { t: "it will", hit: 7 }, { t: ", but " }, { t: "I'll need", hit: 8 }, { t: " some help." },
  { t: "Teacher: Don't worry. " }, { t: "I'll help", hit: 9 }, { t: " you with the difficult parts." },
  { t: "Daniel: Thank you! I promise " }, { t: "I won't give up", hit: 10 }, { t: "." },
];
export const STORY_HITS_S32 = STORY_S32.filter((s) => s.hit).length;

export const COMPREHENSION_S32: { n: string; q: string; options: string[]; answer: number; why: string; key: string }[] = [
  { n: "①", q: "How old is Daniel?", key: "He is thirteen years old.", options: ["He is thirteen years old.", "He is twelve years old.", "He is fourteen years old."], answer: 0, why: "Daniel is a thirteen-year-old student." },
  { n: "②", q: "What does his teacher announce?", key: "A technology competition.", options: ["A school trip.", "A technology competition.", "A new classroom."], answer: 1, why: "his teacher enters the classroom and announces a technology competition." },
  { n: "③", q: "When will the competition take place?", key: "Next month.", options: ["Next week.", "Next year.", "Next month."], answer: 2, why: "The competition will take place next month." },
  { n: "④", q: "What does Daniel decide to do?", key: "He decides to participate.", options: ["He decides to watch.", "He decides to participate.", "He decides to organize the event."], answer: 1, why: "Daniel: I'll participate!" },
  { n: "⑤", q: "What will he build?", key: "He will build a small automatic lighting system.", options: ["A small car.", "A robot.", "A small automatic lighting system."], answer: 2, why: "I'll build a small automatic lighting system." },
  { n: "⑥", q: "What does the teacher offer to do?", key: "The teacher offers to help him with the difficult parts.", options: ["To help him with the difficult parts.", "To write the report for him.", "To cancel the competition."], answer: 0, why: "I'll help you with the difficult parts." },
  { n: "⑦", q: "What does Daniel promise?", key: "He promises he won't give up.", options: ["He promises he will win first place.", "He promises he won't give up.", "He promises he will come early."], answer: 1, why: "I promise I won't give up." },
];

export const STORY_ANALYSIS_S32: { en: string; ar: string }[] = [
  { en: "I'll participate!", ar: "قرار اتخذه دانيال في لحظة الحديث." },
  { en: "The competition will take place next month.", ar: "إخبار عن حدث مستقبلي." },
  { en: "Will you prepare a working model?", ar: "سؤال عن الاستعداد للقيام بمهمة مستقبلية." },
  { en: "I believe it will.", ar: "توقع." },
  { en: "I'll help you.", ar: "عرض مساعدة." },
  { en: "I won't give up.", ar: "وعد." },
];

// ============================================================
// s33 — مقارنة الأزمنة
// ============================================================
export const TENSE_COMPARE_S33: { tense: string; sentence: string }[] = [
  { tense: "Past Simple", sentence: "I solved the problem." },
  { tense: "Present Simple", sentence: "I solve problems every day." },
  { tense: "Present Continuous", sentence: "I am solving a problem now." },
  { tense: "Present Perfect", sentence: "I have solved three problems." },
  { tense: "Present Perfect Continuous", sentence: "I have been solving problems for an hour." },
  { tense: "Future Simple", sentence: "I will solve the problem tomorrow." },
];
export const TENSE_COMPARE_ROWS_S33: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "I solved the problem.", options: ["Past Simple", "Present Perfect", "Future Simple"], pick: 0, why: "solved صيغة ماضية منتهية." },
  { prompt: "I have solved three problems.", options: ["Past Simple", "Present Perfect", "Present Continuous"], pick: 1, why: "have + V3 ← إنجاز مرتبط بالحاضر." },
  { prompt: "I will solve the problem tomorrow.", options: ["Present Simple", "Future Simple", "Past Simple"], pick: 1, why: "will + V1 مع tomorrow ← Future Simple." },
];

// ============================================================
// s34 — بطاقات مستويات الاختبار النهائي الخمسة
// ============================================================
export const LEVELS_S34: { level: string; range: string; title: string; back: string }[] = [
  { level: "①", range: "الأسئلة 1–5", title: "البناء الصحيح", back: "اختر الإجابة المناسبة: He will read · We won't be late · Will Sara join? · They will be happy · I will call you tomorrow." },
  { level: "②", range: "الأسئلة 6–10", title: "أكمل الجمل", back: "I think the exam will be easy. · I'll help you. · She won't tell anyone your secret. · Will they arrive early? · We won't make the same mistake again." },
  { level: "③", range: "الأسئلة 11–15", title: "حدد الاستخدام", back: "عرض مساعدة · وعد · توقع · رفض أو عدم استعداد · قرار لحظي — حدّد وظيفة will في كل جملة." },
  { level: "④", range: "الأسئلة 16–20", title: "صحح الأخطاء", back: "He will studies harder. · Will she comes tomorrow? · I won't to forget. · They will are successful. · Does your father will help us?" },
  { level: "⑤", range: "الأسئلة 21–25", title: "IQ200", back: "اقرأ الموقف، ثم اكتب جملة مناسبة باستخدام will — مواقف عطش، وعد للمعلم، توقع تقني، سؤال مشاركة، وسؤال عن موعد الرحلة." },
];

// ============================================================
// s35 — بوّابة الحلول
// ============================================================
export const SOLUTION_GATE_ROWS_S35: { prompt: string; options: string[]; pick: number; why: string }[] = [
  { prompt: "متى يُكشف «مفتاح التصحيح — الدرس 34»؟", options: ["بعد إرسال الاختبار كاملًا في منطقة الاختبار", "قبل البدء بالاختبار", "بعد أول خمسة أسئلة فقط"], pick: 0, why: "المصدر: حاول حله كاملًا قبل الانتقال إلى مفتاح التصحيح." },
];

// ============================================================
// s36 — Final Boss: متطلبات المشروع الثمانية
// ============================================================
export const WRITE_CHECK_S36: string[] = [
  "① توقعين عن مستقبل التكنولوجيا أو التعليم.",
  "② وعدًا تقدمه لنفسك.",
  "③ وعدًا تقدمه لشخص آخر.",
  "④ قرارًا لحظيًا ضمن حوار قصير.",
  "⑤ جملة منفية باستخدام won't.",
  "⑥ سؤالًا يبدأ بـ Will.",
  "⑦ سؤالًا يبدأ بـ When أو How.",
  "⑧ ثلاث كلمات زمنية مختلفة.",
];
export const WRITE_MODEL_S36: { en: string; ar: string }[] = [
  { en: "I think technology will change our classrooms in the future.", ar: "المثال الافتتاحي المنصوص في المصدر — لا تكتفِ بتغيير كلامه" },
  { en: "Students will use new tools to explore difficult subjects.", ar: "تابع المثال الافتتاحي المنصوص في المصدر" },
  { en: "I promise I will keep learning new skills...", ar: "خاتمة المثال الافتتاحي المنصوص في المصدر" },
];
export const WRITE_MIN_SENTENCES_36 = 10;
export const WRITE_MAX_SENTENCES_36 = 12;

// ============================================================
// s37 — الملخص الذهبي
// ============================================================
export const GOLDEN_FLIPS_S37: { face: string; back: string }[] = [
  { face: "Subject + will + V1", back: "الصيغة المثبتة — I will study tomorrow." },
  { face: "Subject + won't + V1", back: "النفي — I won't forget." },
  { face: "Will + Subject + V1?", back: "السؤال — Will you join us?" },
  { face: "Yes, I will. / No, I won't.", back: "الإجابة القصيرة" },
  { face: "Wh-word + will + Subject + V1?", back: "أسئلة المعلومات — Where will they go?" },
];
export const GOLDEN_USES_S37: string[] = [
  "① قرار لحظي.",
  "② وعد.",
  "③ توقع.",
  "④ عرض مساعدة.",
  "⑤ التعبير عن الاستعداد أو الرفض.",
  "⑥ السؤال عن استعداد شخص للقيام بشيء، أو تقديم طلب مهذب.",
];
export const GOLDEN_RULE_S37 =
  "بعد will أو won't يأتي الفعل الأساسي V1 دائمًا، دون s أو ed أو ing أو to.";

// ============================================================
// s38 — خريطة التقدم + الدرس القادم
// ============================================================
export const COURSE_MAP_S38: { system: string; done: string[] }[] = [
  { system: "منظومة الحاضر:", done: ["Present Simple", "Present Continuous", "Present Perfect", "Present Perfect Continuous"] },
  { system: "منظومة الماضي:", done: ["Past Simple", "Past Continuous", "Past Perfect", "Past Perfect Continuous"] },
];
export const FUTURE_ROADMAP_S38: string[] = [
  "① Future Simple — WILL: الدرس 34 مكتمل.",
  "② Be Going To: الدرس 35.",
  "③ Will vs Be Going To: مقارنة وتطبيقات موسعة.",
  "④ Future Continuous.",
  "⑤ Future Perfect.",
  "⑥ Future Perfect Continuous.",
  "⑦ مراجعة شاملة لمنظومة المستقبل.",
];
export const NEXT_STOP_ROW_S38: { prompt: string; options: string[]; pick: number; why: string } = {
  prompt: "أكملت Future Simple باستخدام WILL — ما الدرس القادم في المنهج؟",
  options: ["الدرس 35: BE GOING TO — الخطط والنوايا والتوقعات المبنية على أدلة", "مراجعة شاملة لمنظومة المستقبل", "Future Perfect Continuous"],
  pick: 0,
  why: "خريطة التقدم: ② Be Going To: الدرس 35.",
};

// ============================================================
// عدّادات ثابتة للتدقيق والتوثيق
// ============================================================
export const LESSON34_COUNTS = {
  slides: SLIDES.length,
  objectives: OBJECTIVES_34.length,
  pronouns: PRONOUN_FORMS_34.length,
  goldenVerbs: GOLDEN_VERBS_34.length,
  uses: USE_CARDS_S5.length,
  contractions: CONTRACTIONS_34.length,
  whWords: WH_WORDS_S19.length,
  timeWords: TIME_WORDS_S21.length,
  mc: MC_ROWS_S28.length,
  transforms: TRANSFORM_ROWS_S29.length,
  detective: DETECTIVE_S30.length,
  iqSituations: IQ_SITUATIONS_S31.length,
  storyHits: STORY_HITS_S32,
  comprehension: COMPREHENSION_S32.length,
  storyAnalysis: STORY_ANALYSIS_S32.length,
  tenseCompare: TENSE_COMPARE_S33.length,
  masterLevels: LEVELS_S34.length,
  writeReqs: WRITE_CHECK_S36.length,
  goldenFlips: GOLDEN_FLIPS_S37.length,
} as const;

/* تحقق ثابت 1:1 مع السجل: لا شريحة مكررة ولا شريحة بلا مصدر */
export const __VERIFY_SLIDES_34 = (() => {
  const ids = new Set<string>();
  SLIDES.forEach((s) => {
    if (ids.has(s.id)) throw new Error(`duplicate slide34 id: ${s.id}`);
    ids.add(s.id);
    if (!s.source?.length) throw new Error(`slide34 without source: ${s.id}`);
  });
  if (LESSON34_COUNTS.objectives !== 9) throw new Error("objectives must have 9 items");
  if (LESSON34_COUNTS.detective !== 10) throw new Error("Grammar Detective must have 10 cases");
  if (LESSON34_COUNTS.mc !== 6) throw new Error("foundational drill must have 6 items");
  if (LESSON34_COUNTS.transforms !== 5) throw new Error("transform drill must have 5 items");
  if (LESSON34_COUNTS.iqSituations !== 4) throw new Error("IQ200 must have 4 situations");
  if (LESSON34_COUNTS.comprehension !== 7) throw new Error("reading must have 7 questions");
  if (LESSON34_COUNTS.storyHits !== 10) throw new Error("story must expose 10 will phrases");
  if (LESSON34_COUNTS.masterLevels !== 5) throw new Error("master test must have 5 levels");
  if (LESSON34_COUNTS.writeReqs !== 8) throw new Error("writing mission must have 8 requirements");
  return true;
})();
