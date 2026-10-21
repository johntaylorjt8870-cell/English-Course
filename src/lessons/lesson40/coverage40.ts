import { SLIDES_40 } from "./data";

// ============================================================
// Lesson 40 — سجل تغطية المصدر (Source Coverage Ledger)
//
// كل صف يربط قسمًا مصدريًا بموضعه في الدرس المنفَّذ، ويبيّن:
//   elements          — ما يجب أن يبقى من المصدر.
//   location          — أين نُفِّذ.
//   transfer          — verbatim | table-rebuilt | gated-solutions.
//   platformAddition  — ما أضافته المنصة حول نص المصدر (لا بدلًا منه).
//   accuracyNote      — ملاحظة دقة/تأهيل على نص المصدر (بلا تعديل صامت).
// ============================================================

export type CoverageRow40 = {
  num: number | null;
  id: string;
  title: string;
  elements: string;
  location: string;
  transfer: "verbatim" | "table-rebuilt" | "gated-solutions";
  platformAddition?: string;
  accuracyNote?: string;
};

const SOURCE_COVERAGE_40: CoverageRow40[] = [
  {
    num: null,
    id: "cover",
    title: "المقدمة والمحطات الست في الدروس 34–39",
    elements:
      "العنوان · المراجعة الشاملة وإتقان أزمنة المستقبل · The Future Tenses Grand Challenge 🚀 · المستوى تأسيسي متقدم — IQ200 · المحطات الست في الدروس 34–39 (① WILL · ② BE GOING TO · ③ المقارنة بين WILL وBE GOING TO · ④ Future Continuous · ⑤ Future Perfect · ⑥ Future Perfect Continuous) · الانتقال من معرفة القواعد إلى التحكم بها",
    location: "خطوة الغلاف (Cover) في Student Area + لوحة ربط المحطات الست بالصيغ الخمس الرئيسية",
    transfer: "verbatim",
    platformAddition:
      "غلاف بصري بهوية Master Review Lab يربط المحطات الست في الدروس 34–39 بالصيغ الخمس الرئيسية المجمّعة في هذا الدرس.",
    accuracyNote:
      "علم المملكة المتحدة (إيموجي GB) في بداية سطر العنوان حُذف وفق قاعدة المستودع (لا أعلام إيموجي في واجهة الدروس)؛ بقية النص محفوظ حرفيًا. يوضّح الغلاف الفرق بين المحطات التعليمية الست (التي تشمل محطة المقارنة في الدرس 36) والصيغ النحوية الخمس الرئيسية.",
  },
  {
    num: 1,
    id: "s01",
    title: "🎯 1. أهداف الدرس",
    elements: "عشرة أهداف مرقّمة ①–⑩ (من اختيار صيغة المستقبل دون الاعتماد الآلي على الكلمات الدالة إلى كتابة فقرة مترابطة تجمع جميع الصيغ)",
    location: "خطوة §1 (الخطوة 2 من 30) — كل هدف كما ورد",
    transfer: "verbatim",
    platformAddition: "قائمة مراجعة ذاتية تفاعلية للأهداف العشرة.",
  },
  {
    num: 2,
    id: "s02",
    title: "🧠 2. الخريطة الكبرى: ستة أسئلة تقودك إلى الزمن المناسب",
    elements:
      "الأسئلة الستة مع أمثلتها وترجماتها والصيغة النموذجية لكل سؤال: ① قرار الآن (WILL) · ② نية أو خطة مسبقة (BE GOING TO) · ③ نشاط جارٍ عند لحظة مستقبلية (Future Continuous) · ④ إنجاز مكتمل بحلول نقطة مستقبلية (Future Perfect) · ⑤ مدة نشاط ممتدة حتى نقطة مستقبلية (Future Perfect Continuous) · ⑥ وعد أو توقع عام أو عرض مساعدة (WILL)",
    location: "خطوة §2 (الخطوة 3 من 30)",
    transfer: "verbatim",
    platformAddition:
      "خريطة قرار تفاعلية من ست محطات قابلة للاستكشاف + مختبر توجيه المواقف إلى السؤال والصيغة الأنسب.",
    accuracyNote:
      "يؤكد المصدر والمختبر أن هذه الاستخدامات «نموذجية» (الصيغة النموذجية)، وليست قواعد آلية معلّقة بكلمة دالة واحدة.",
  },
  {
    num: 3,
    id: "s03",
    title: "⭐ 3. الجدول الذهبي الشامل",
    elements:
      "جدول الصيغ الخمس الرئيسية (Future Simple · BE GOING TO · Future Continuous · Future Perfect · Future Perfect Continuous) × التركيب الأساسي × المعنى الذي نبرزه · ملاحظة أننا نراجع خمس صيغ رئيسية لأن الدرس 36 كان مخصصًا للمقارنة بين الصيغتين الأوليين",
    location: "خطوة §3 (الخطوة 4 من 30)",
    transfer: "table-rebuilt",
    platformAddition:
      "مختبر مطابقة الصيغ الخمس بتركيباتها ومعانيها، مع تثبيت الفرق بين المحطات الست والصيغ الخمس.",
    accuracyNote:
      "الجدول في النسخ المورّد ورد أسطرًا متتالية بلا خطوط أعمدة؛ أُعيد بناؤه جدولًا من ثلاثة أعمدة وخمسة صفوف بالخلايا نفسها دون تغيير أي كلمة. وحُفظت ملاحظة المصدر الصريحة حول سبب مراجعة خمس صيغ رئيسية مقابل ست محطات.",
  },
  {
    num: 4,
    id: "s04",
    title: "🔬 4. حدث واحد، خمس زوايا مختلفة",
    elements:
      "الفعل study في خمس جمل مرقّمة ①–⑤ مع ترجماتها وشرح ما تبرزه كل جملة · اكتشاف مهم: لا يكفي أن تعرف متى يحدث الفعل؛ يجب أن تعرف ما الذي تريد إبرازه بشأنه",
    location: "خطوة §4 (الخطوة 5 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مبدّل المنظور التفاعلي للفعل study عبر الزوايا الخمس (الجملة · المعنى العربي · التركيب النحوي · زاوية التركيز) + مختبر تطبيق.",
    accuracyNote:
      "الأمثلة الخمسة متسقة زمنيًا: النشاط جارٍ عند 8:00 (③)، ويكتمل بحلول 10:00 (④)، وتبلغ مدته 4 ساعات بحلول 10:00 (⑤، أي بدأ الساعة 6:00).",
  },
  {
    num: 5,
    id: "s05",
    title: "⚡ 5. الجولة الأولى: WILL أم BE GOING TO؟",
    elements:
      "الفرق النموذجي · أربعة مواقف: ① سقوط الكتاب (I'll pick it up.) · ② تعلم الغيتار (I'm going to learn to play the guitar.) · ③ مستقبل المدن (I think cities will become greener.) · ④ الصندوق الثقيل (He's going to drop that box!) · تذكير متقدم بتداخل will وgoing to في بعض التوقعات أو الإعلانات",
    location: "خطوة §5 (الخطوة 6 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مختبر مواقف WILL vs BE GOING TO مع تغذية راجعة تقبل التداخل السياقي في التوقعات وتشرح لماذا تظل الصيغة النموذجية أوضح.",
    accuracyNote:
      "التذكير المتقدم في نهاية القسم محفوظ حرفيًا؛ इसलिए لا يعامل المختبر التوقعات العامة على أنها تمنع going to منعًا مطلقًا، بل يوضح الفارق في إبراز الدليل الحاضر مقابل الاعتقاد العام.",
  },
  {
    num: 6,
    id: "s06",
    title: "🎥 6. الجولة الثانية: متى نستخدم Future Continuous؟",
    elements:
      "السؤال الأساسي What will be happening at that future moment? · موقف الدرس عبر الإنترنت (6:00–7:30) والاتصال عند 6:30 (I'm afraid I'll be attending an online lesson at that time.) · ثلاثة أمثلة إضافية (This time tomorrow · When you arrive · Will you be using your laptop tonight?) وملاحظة الاستفسار اللطيف عن البرنامج أو التوفر",
    location: "خطوة §6 (الخطوة 7 من 30)",
    transfer: "verbatim",
    platformAddition: "مختبر اللحظة المستقبلية الجارية (6:00–7:30 مع الاتصال عند 6:30) والاستفسار اللطيف.",
  },
  {
    num: 7,
    id: "s07",
    title: "🏁 7. الجولة الثالثة: متى نستخدم Future Perfect؟",
    elements:
      "السؤال الأساسي What will have been completed by that future point? · موقف تسليم المشروع يوم الجمعة وإنهائه يوم الأربعاء (By Friday, I will have completed the project.) · ثلاثة أمثلة (By noon · By next year · By the time the guests arrive) · تذكير إبراز اكتمال الحدث بالنسبة إلى نقطة مستقبلية",
    location: "خطوة §7 (الخطوة 8 من 30)",
    transfer: "verbatim",
    platformAddition: "مختبر نقطة الاكتمال المستقبلية (الأربعاء قبل الجمعة) وتمييز الإنجاز المكتمل.",
  },
  {
    num: 8,
    id: "s08",
    title: "⏳ 8. الجولة الرابعة: متى نستخدم Future Perfect Continuous؟",
    elements:
      "السؤال الأساسي How long will the activity have been continuing by that future point? · موقف تدريب سارة من الثانية إلى السادسة = أربع ساعات (By 6:00, Sara will have been training for four hours.) · ثلاثة أمثلة (By next May · By the time the bus arrives · By midnight)",
    location: "خطوة §8 (الخطوة 9 من 30)",
    transfer: "verbatim",
    platformAddition: "مختبر قياس المدة حتى النقطة المستقبلية (2:00 → 6:00 = 4 ساعات) وأمثلة الامتداد.",
  },
  {
    num: 9,
    id: "s09",
    title: "⚔️ 9. Future Continuous vs Future Perfect vs Future Perfect Continuous",
    elements:
      "سيناريو مشروع آدم من الرابعة حتى الثامنة · الجمل الثلاث مع ترجماتها وتركيزها (At 6:00 working · By 8:00 completed · By 8:00 working for four hours) · جدول ملخص المقارنة الثلاثية",
    location: "خطوة §9 (الخطوة 10 من 30)",
    transfer: "table-rebuilt",
    platformAddition:
      "خط زمني بصري تفاعلي لمشروع آدم (4:00 → 6:00 → 8:00) يقارن النشاط الجاري عند 6:00 والإنجاز المكتمل بحلول 8:00 ومدة الأربع ساعات بحلول 8:00 + أسئلة تطبيق.",
    accuracyNote:
      "جدول «ملخص المقارنة» ورد في النسخ المورّد ستة أسطر متتالية؛ أُعيد بناؤه جدولًا من عمودين وثلاثة صفوف بالنص نفسه دون تغيير.",
  },
  {
    num: 10,
    id: "s10",
    title: "🧠 10. اختبار الفهم العميق: هل Future Perfect Continuous يعني عدم اكتمال العمل؟",
    elements:
      "الجواب «لا» · مقارنة By 8:00, I will have been studying for four hours. مع By 8:00, I will have finished studying. · رفض المعادلة الخاطئة (انتهى / لم ينتهِ) وتثبيت المعادلة الصحيحة (الإنجاز أو النتيجة مقابل المدة أو امتداد النشاط)",
    location: "خطوة §10 (الخطوة 11 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مختبر الفهم العميق الذي يفنّد اختصار «انتهى / لم ينتهِ» ويثبّت زاوية التركيز (الإنجاز مقابل المدة).",
    accuracyNote:
      "هذا القسم يمنع تدريس القاعدة المبسّطة الخاطئة؛ حُفظ نصه كاملًا ورُبط بالمقارنة الثلاثية في §9.",
  },
  {
    num: 11,
    id: "s11",
    title: "🔍 11. الكلمات الزمنية: إشارات تساعدك، لكنها لا تقرر بدلًا منك",
    elements:
      "قائمة الكلمات الثماني (tomorrow · next week · at 8:00 · this time tomorrow · by Friday · by the time · for three hours · since Monday) · زوج by Friday (will finish / will have finished) · زوج for ten years (will have worked / will have been working) · القاعدة الختامية",
    location: "خطوة §11 (الخطوة 12 من 30)",
    transfer: "verbatim",
    platformAddition: "مختبر الإشارات الزمنية والتركيز الدلالي مع مقارنة الجمل الصحيحة المتقابلة.",
  },
  {
    num: 12,
    id: "s12",
    title: "🚨 12. قاعدة الجمل الزمنية المستقبلية",
    elements:
      "الأدوات الست (when · before · after · as soon as · until · by the time) + Present Simple · الأمثلة الأربعة مع ترجماتها · الخطأ الشائع When you will arrive ❌ مقابل الصحيح When you arrive ✅ · الفرق مع السؤال المباشر When will you arrive? ✅",
    location: "خطوة §12 (الخطوة 13 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مستكشف الجمل الزمنية المستقبلية مقابل السؤال المباشر بـ When مع تدريب تشخيصي.",
  },
  {
    num: 13,
    id: "s13",
    title: "🧩 13. الفرق بين WHEN وBY THE TIME",
    elements:
      "الحدث المرجعي الواحد (وصولك: you arrive) من ثلاث زوايا: When you arrive, I'll be cooking. (نشاط جارٍ) · By the time you arrive, I'll have cooked dinner. (اكتمال) · By the time you arrive, I'll have been cooking for two hours. (مدة)",
    location: "خطوة §13 (الخطوة 14 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مبدّل زاوية الرؤية عند لحظة الوصول (When مقابل By the time) مع أسئلة تمييز المعاني الثلاثة.",
  },
  {
    num: 14,
    id: "s14",
    title: "🧠 14. FOR vs SINCE في منظومة المستقبل",
    elements:
      "FOR + مدة زمنية · SINCE + نقطة بداية · الأمثلة الأربعة (for two hours · for five years · since 8:00 · since 2022) · أمثلة FPC · استخدام for مع Future Perfect مع live وwork وknow · By next year, I'll have known her for ten years. ✅ مقابل I'll have been knowing her for ten years. ❌ لأن know فعل حالة عندما يعني المعرفة",
    location: "خطوة §14 (الخطوة 15 من 30)",
    transfer: "verbatim",
    platformAddition:
      "لوحة فرز FOR / SINCE + مختبر أفعال الحالة (know) واستخدام for مع Future Perfect دون فرض الصيغة المستمرة.",
  },
  {
    num: 15,
    id: "s15",
    title: "⚙️ 15. مختبر البناء: لا تخلط بين التركيبات",
    elements:
      "جدول الفعل write في الصيغ الخمس · الأخطاء الخمسة الواجب تجنبها (will writing · will be write · will have wrote · will have been wrote · going to writing ❌) · الصيغ الخمس الصحيحة المقابلة ✅",
    location: "خطوة §15 (الخطوة 16 من 30)",
    transfer: "table-rebuilt",
    platformAddition:
      "باني الصيغ الخمس التفاعلي + مختبر تشخيص وتصحيح التراكيب الخاطئة الخمسة.",
    accuracyNote:
      "جدول الفعل write ورد في النسخ المورّد أسطرًا متتالية؛ أُعيد بناؤه جدولًا من عمودين وخمسة صفوف بالنص نفسه.",
  },
  {
    num: 16,
    id: "s16",
    title: "🎭 16. الحوار الشامل الأول: The Science Competition",
    elements:
      "حوار Maya وDaniel (11 دورًا) · قسم الترجمة والتحليل للصيغ الست · اكتشاف IQ200 (خمس صيغ مستقبلية داخل حوار واحد، كل صيغة أضافت معلومة مختلفة)",
    location: "خطوة §16 (الخطوة 17 من 30)",
    transfer: "verbatim",
    platformAddition:
      "قارئ حوار تفاعلي يعرض ترجمة عربية لكل سطر (إضافة منصة موسومة) وتحليل الصيغ الست من المصدر + أسئلة استيعاب.",
    accuracyNote:
      "المصدر يورد نص الحوار الإنجليزي وتحليل العبارات الست؛ أما الترجمة العربية الكاملة لكل سطر من الأسطر الـ11 داخل القارئ التفاعلي فإضافة تعليمية موسومة بـ origin: platform.",
  },
  {
    num: 17,
    id: "s17",
    title: "🌦️ 17. الحوار الشامل الثاني: A Family Trip",
    elements:
      "حوار العائلة (Father · Mother · Daughter · Son — 8 أدوار) · التحدي: تصنيف الاستخدامات الستة ①–⑥ · الحل المورّد ①–⑥",
    location: "خطوة §17 (الخطوة 18 من 30)",
    transfer: "verbatim",
    platformAddition:
      "قارئ حوار تفاعلي مع ترجمة عربية لكل سطر (إضافة منصة موسومة) + مختبر تصنيف البنود الستة ①–⑥ يكشف مفتاح المصدر بعد المحاولة.",
    accuracyNote:
      "أسطر «الحل» الستة محفوظة في revealUnits وتظهر بعد إتمام الطالب لتحدي التصنيف.",
  },
  {
    num: 18,
    id: "s18",
    title: "🔥 18. مختبر المواقف: اختر الزمن دون كلمات دالة واضحة",
    elements:
      "خمسة مواقف حياتية مع الجملة المناسبة وسؤال «لماذا؟» وجوابه لكل موقف: ① شرح مسألة رياضية الآن (I'll explain it to you.) · ② دورة رسم رقمي مسجّل فيها (I'm going to learn digital drawing.) · ③ اتصال في وقت الامتحان (I'll be taking an exam then.) · ④ جاهزية المشروع قبل الموعد النهائي (I'll have completed it by the deadline.) · ⑤ مدة ستة أشهر في مشروع طويل (By the end of the month, I'll have been working on it for six months.)",
    location: "خطوة §18 (الخطوة 19 من 30)",
    transfer: "verbatim",
    platformAddition: "مختبر المواقف الخمسة: اختيار الصيغة الأنسب وتعليلها دون الاعتماد على كلمات دالة جاهزة.",
  },
  {
    num: 19,
    id: "s19",
    title: "✍️ 19. التدريب الأول: اختر الصيغة الأنسب",
    elements: "ستة أسئلة اختيار من متعدد ①–⑥ (ثلاثة خيارات A/B/C لكل سؤال) + قسم الحلول المعلّلة ①–⑥",
    location: "خطوة §19 (الخطوة 20 من 30) + مفتاح المصدر بعد المحاولة + دليل المعلم",
    transfer: "verbatim",
    platformAddition: "تدريب تفاعلي من 6 بنود مع تغذية راجعة فورية وكشف مفتاح المصدر بعد إتمام المحاولة.",
  },
  {
    num: 20,
    id: "s20",
    title: "🧩 20. التدريب الثاني: أكمل الصيغة المناسبة",
    elements: "ثماني جمل إكمال ①–⑧ + قسم الحلول المفصلة ①–⑧",
    location: "خطوة §20 (الخطوة 21 من 30) + مفتاح المصدر بعد المحاولة + دليل المعلم",
    transfer: "verbatim",
    platformAddition:
      "ورشة إكمال كتابية من 8 بنود مع قبول الصيغ المختصرة والبدائل السياقية السليمة وكشف الحلول المفصلة بعد المحاولة.",
    accuracyNote:
      "في البند ② (We bought the tickets yesterday. We ______ (visit) the museum next week.) تدعم جملة شراء التذاكر وجود خطة مسبقة فتكون الصيغة المستهدفة are going to visit، مع التمييز التربوي بين الصيغة النحوية (التعبير عن النية/الخطة) واليقين السياقي الناتج عن شراء التذاكر. وفي البنود ⑥–⑧ حُفظ التفريق الدقيق بين When you arrive, we will be preparing dinner (نشاط جارٍ عند الوصول) وBy the time you arrive, we will have prepared dinner (إنجاز مكتمل بحلول الوصول) وBy the time you arrive, we will have been working for three hours (مدة العمل حتى الوصول).",
  },
  {
    num: 21,
    id: "s21",
    title: "🕵️ 21. Grammar Detective — التحدي الشامل",
    elements: "عشر جمل خاطئة ①–⑩ للتصحيح + قسم الحلول ①–⑩ (مع البديل في ①)",
    location: "خطوة §21 (الخطوة 22 من 30) + مفتاح المصدر بعد المحاولة + دليل المعلم",
    transfer: "verbatim",
    platformAddition:
      "ورشة Grammar Detective: كتابة التصحيح لكل جملة من الجمل العشر ثم عرض تصحيح المصدر والسبب النحوي التفصيلي لكل تصحيح.",
    accuracyNote:
      "في البند ⑥ (Will you be studying at 9:00? Yes, I am.) التصحيح المعتمد هو Yes, I will. لأن الإجابة القصيرة عن سؤال يبدأ بـ Will تستخدم الفعل المساعد will نفسه لا am.",
  },
  {
    num: 22,
    id: "s22",
    title: "🧠 22. تحدي IQ200: متى تكون أكثر من إجابة صحيحة؟",
    elements:
      "مقارنة I will finish the report by Friday. مع I will have finished the report by Friday. · مقارنة I think she will enjoy the trip. مع I think she's going to enjoy the trip. · القاعدة المتقدمة: عندما لا يقدم السؤال سياقًا كافيًا لا تفترض وجود إجابة واحدة صحيحة فقط",
    location: "خطوة §22 (الخطوة 23 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مختبر التعدد السياقي (IQ200) يدرّب المتعلم على قبول الصيغتين عندما يسمح السياق وتفسير فرق التركيز بينهما.",
  },
  {
    num: 23,
    id: "s23",
    title: "📖 23. Reading Challenge — The Future Learning Centre",
    elements:
      "نص القراءة الكامل Building the Future Learning Centre · أسئلة الفهم الثمانية ①–⑧ · الحلول الثمانية ①–⑧",
    location: "خطوة §23 (الخطوة 24 من 30) + مفتاح المصدر بعد المحاولة + دليل المعلم",
    transfer: "verbatim",
    platformAddition:
      "مستكشف محطات مشروع المركز التعليمي + أداة تمييز بصري اختياري لصيغ المستقبل في النص + 8 حقول للإجابة عن أسئلة الفهم وكشف إجابات المصدر بعد المحاولة.",
  },
  {
    num: 24,
    id: "s24",
    title: "🔬 24. التحليل النحوي الكامل للقصة",
    elements:
      "تحليل الجمل الست الرئيسية من القصة (خطة مسبقة · قرار لحظي أو عرض مساعدة · نشاط جارٍ · إنجاز مكتمل · مدة نشاط ممتدة · توقع أو اعتقاد) · الدرس المستفاد: لماذا اختار الكاتب هذا الزمن تحديدًا؟",
    location: "خطوة §24 (الخطوة 25 من 30)",
    transfer: "verbatim",
    platformAddition:
      "مختبر التحليل النحوي التفاعلي للجمل الست في سياق القصة لربط كل صيغة بوظيفتها الدلالية الدقيقة.",
  },
  {
    num: 25,
    id: "s25",
    title: "🏆 25. الاختبار النهائي الشامل — Future Tenses Grand Exam",
    elements:
      "25 سؤالًا في خمسة مستويات (5 × 5): المستوى الأول اختيار (①–⑤) · المستوى الثاني إكمال (⑥–⑩) · المستوى الثالث تصحيح أخطاء (⑪–⑮) · المستوى الرابع فهم المعنى (⑯–⑳) · المستوى الخامس القصة المتكاملة The Big School Project (㉑–㉕)",
    location: "خطوة §25 (خطوة إطلاق) + منطقة الاختبار الرسمية المستقلة (Test Area) بمعرّف lesson40-test",
    transfer: "gated-solutions",
    platformAddition:
      "منطقة اختبار مستقلة بلا تصحيح فوري؛ الأسئلة الـ25 مرقّمة Q1–Q25 وموزعة 5 × 5، وكل سطر من أسطر §25 (60 سطرًا) مرتبط بالواجهة مرة واحدة.",
    accuracyNote:
      "أسئلة المستوى الخامس (㉑–㉕) مربوطة مباشرة بالفراغات الخمسة في قصة The Big School Project (build · fix · test · complete · work). لا يستورد ملف الاختبار ملف الحلول ولا يكشف أي إجابة قبل التسليم.",
  },
  {
    num: 26,
    id: "s26",
    title: "🔐 26. مساحة المعلم — الحلول التفصيلية للاختبار النهائي",
    elements:
      "مفتاح تصحيح الدرس 40 · تنبيه عدم عرضه للطالب إلا بعد انتهاء الاختبار · حلول المستويات الخمسة (①–㉕) مع أسبابها · ملاحظة للمعلم حول قبول الإجابات البديلة السليمة نحويًا عندما يسمح السياق",
    location: "خطوة §26 (بطاقة توجيه محمية) + منطقة الحلول (Solutions Area — مقفلة حتى التسليم) + منطقة المعلم (Teacher Area)",
    transfer: "gated-solutions",
    platformAddition:
      "منطقة حلول مستقلة تُفتح بعد تسليم الاختبار أو دخول المعلم، تعرض نص §26 كاملًا مع 25 بطاقة تحليل مفصّلة وشروح إضافية وبدائل مقبولة من إعداد المنصة.",
    accuracyNote:
      "يتضمن نص الدرس المورّد في §26 مفتاح الإجابات والأسباب الموجزة للأسئلة الـ25؛ وتُحجب هذه الحلول عن واجهة الطالب قبل تسليم الاختبار التزامًا بتوجيه المصدر («يفضّل عدم عرض هذا القسم للطالب إلا بعد انتهاء الاختبار»). أما الشروح التفصيلية الموسّعة والبدائل الإضافية في solutionsData40.ts فهي من إعداد المنصة استنادًا إلى مادة الدرس المورّدة، وليست مفتاح كتاب مدرسي خارجي مستقل.",
  },
  {
    num: 27,
    id: "s27",
    title: "✍️ 27. مهمة الإنتاج اللغوي الكبرى — Writing Mission",
    elements:
      "العنوان My Future Learning Journey · فقرة من 15 إلى 18 جملة · الشروط العشرة ①–⑩ · النموذج الافتتاحي الإرشادي (6 جمل) · تنبيه عدم نسخ النموذج",
    location: "خطوة §27 (الخطوة 28 من 30)",
    transfer: "verbatim",
    platformAddition:
      "ورشة كتابة تفاعلية: عدّاد جمل إرشادي (المطلوب 15–18 جملة)، قائمة مراجعة ذاتية للشروط العشرة، فحص بنيوي إرشادي للتراكيب، وكشف النموذج الافتتاحي مع تحليل صيغه الست بعد كتابة المسودة.",
    accuracyNote:
      "يصرّح المختبر ودليل المعلم بأن النظام لا يدّعي تصحيحًا دلاليًا آليًا للفقرة، بل يوفّر قائمة مراجعة ذاتية وسلم تقدير للمعلم.",
  },
  {
    num: 28,
    id: "s28",
    title: "🧠 28. الملخص الذهبي النهائي لمنظومة المستقبل",
    elements:
      "ملخص الصيغ الخمس الرئيسية ①–⑤ (الصيغة · الاستخدامات النموذجية/الاستخدام · المثال) · القاعدة الذهبية الكبرى والأسئلة الستة الهادية",
    location: "خطوة §28 (الخطوة 29 من 30)",
    transfer: "verbatim",
    platformAddition: "مختبر تثبيت الملخص الذهبي ومطابقة الصيغ الخمس بأمثلتها والقاعدة الذهبية الكبرى.",
  },
  {
    num: 29,
    id: "s29",
    title: "🗺️ 29. خريطة تقدم المنهج بعد الدرس 40",
    elements:
      "المنظومات الثلاث المكتملة (منظومة الحاضر ①–④ · منظومة الماضي ⑤–⑧ · منظومة المستقبل ⑨–⑮ بما فيها الدرس 40 مكتمل) · المحطة القادمة: الدرس 41 Master Auxiliary Verbs (BE — DO — HAVE · CAN — COULD — MAY — MIGHT — MUST — SHOULD — WOULD · الأمثلة الأربعة)",
    location: "خطوة §29 (الخطوة 30 من 30)",
    transfer: "verbatim",
    platformAddition:
      "خريطة تفاعلية للمحطات الـ15 المكتملة عبر منظومات الحاضر والماضي والمستقبل + بطاقة معلوماتية للمحطة القادمة المخططة (الدرس 41).",
    accuracyNote:
      "علم المملكة المتحدة (إيموجي GB) حُذف وفق قاعدة المستودع. نص معاينة الدرس 41 محفوظ، ويشير رابط الخطوة الأخيرة إلى المسار الحالي #/lesson/41 بعد التحقق من وجود تسجيله وتنفيذه في هذا الإصدار. لا تُضاف للمعاينة موضوعات غير المذكورة في نص المصدر.",
  },
];

const CURRENT_PLATFORM_ADDITIONS_40: Record<string, string | undefined> = {
  cover: "واجهة Bright Timeline Command Lab تربط المحطات الست بخمس صيغ مستقبلية رئيسية وتعرض مسارات التركيز الخمسة.",
  s02: "لوحة قرار تفاعلية من ستة أسئلة؛ ينكشف التوجيه والصيغة النموذجية عند اختيار السؤال.",
  s04: "مبدّل منظور زمني تفاعلي يوضح أن النشاط والنتيجة والمدة زوايا مختلفة للحدث المستقبلي.",
  s09: "خط زمني لآدم ومبدّل يبيّن اختلاف التركيز عند ثبات النقطة المرجعية.",
  s12: "اختيار تفاعلي لتصحيح الجملة الزمنية، مع تمييز الجملة التابعة من السؤال المباشر.",
  s14: "تدريب اختيار مختصر يراجع FOR مقابل SINCE ونقطة البداية/المدة.",
  s15: "تدريب اختيار للصيغة بعد will have؛ جدول WRITE الأصلي محفوظ كاملًا في المصدر.",
  s16: "إضافة ترجمة عربية مساندة لكل دور في حوار Science Competition، معلّمة بوضوح بأنها ترجمة منصة.",
  s17: "إضافة ترجمة عربية مساندة وموقف تصنيف تفاعلي؛ مفاتيح التصنيف المصدرية لا تظهر قبل محاولة مكتوبة.",
  s19: "تُعرض إجابات المصدر وشروحها بعد أن يكتب المتعلم محاولة؛ لا يُدّعى تقييم دلالي آلي للإجابة الحرة.",
  s20: "تُعرض الإجابات الثمانية وشروحها بعد إدخال محاولة مكتوبة.",
  s21: "تُقسم مفاتيح التصحيح إلى مجموعتين تطابقان خطوتي الأخطاء، وتُكشف كل مجموعة بعد محاولة مستقلة.",
  s23: "تُقسم إجابات الفهم إلى مجموعتين وتُكشف بعد المحاولة؛ يوجد استنتاج قراءة اختياري مع تغذية راجعة.",
  s25: "اختبار مستقل من سؤال واحد ظاهر في كل مرة مع شريط تقدم وتنقل بلوحة المفاتيح؛ بلا إجابة صحيحة قبل التسليم.",
  s26: "منطقة حلول منفصلة تُحمّل بعد التسليم، ودليل معلم يُحمّل بعد فتح بوابة المعلم. الحماية عميل-جانبي وليست تفويضًا خادميًا.",
  s28: "مبدّل خماسي للمسارات/التركيز يعيد ربط الملخص الذهبي بالخط الزمني.",
  s29: "الخطوة الأخيرة تربط بمعرّف المسار الحالي #/lesson/41 بعد التحقق من وجود الدرس ومساره في المستودع.",
};

export const COVERAGE_40: CoverageRow40[] = SOURCE_COVERAGE_40.map((row) => {
  const steps = SLIDES_40.filter((slide) => slide.sourceId === row.id).map((slide) => slide.id);
  const location = row.id === "s25"
    ? `${steps.join(", ")} للتمهيد + جميع أسطر §25 في TestArea40 / testData40.ts`
    : row.id === "s26"
      ? `${steps.join(", ")} للتوجيه + الحلول الكاملة في SolutionsArea40 / TeacherGuide40 (محملة منفصلًا)`
      : `${steps.join(", ")} · المصدر مقسوم إلى وحدات متتابعة في SLIDES_40`;
  return { ...row, location, platformAddition: CURRENT_PLATFORM_ADDITIONS_40[row.id] };
});

export const COVERAGE_SECTION_COUNT_40 = COVERAGE_40.filter((row) => row.num != null).length;
export const COVERAGE_ACCURACY_NOTES_40 = COVERAGE_40.filter((row) => row.accuracyNote);
export const COVERAGE_PLATFORM_ADDITIONS_40 = COVERAGE_40.filter((row) => row.platformAddition);
