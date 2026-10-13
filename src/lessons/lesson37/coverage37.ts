// ============================================================
// Lesson 37 — سجل تغطية المصدر (Source Coverage Ledger)
//
// صف واحد لكل قسم مصدري: ما يحتويه، وأين يظهر في تجربة الدرس، وهل نُقل
// كما هو، وما الإضافات التعليمية التي صنعتها المنصة حوله، وأي ملاحظة دقة
// على المصدر. يُعرض هذا السجل داخل «منطقة المعلم» ويُستخدم في التدقيق.
// ============================================================

export type CoverageRow37 = {
  /** رقم القسم في المصدر — null للمقدمة */
  num: number | null;
  id: string;
  title: string;
  /** العناصر التي يجب أن يوجد لها موضع في الدرس */
  elements: string;
  /** الموضع في تجربة الدرس الجديدة */
  location: string;
  /** هل نُقل المحتوى كما هو، أم أُعيد بناء تنسيقه، أم يتطلب ملاحظة؟ */
  transfer: "verbatim" | "table-rebuilt" | "key-missing-in-source";
  /** إضافة تعليمية من المنصة */
  platformAddition?: string;
  /** ملاحظة دقة على المصدر (تُذكر للطالب/المعلم بلا تعديل صامت) */
  accuracyNote?: string;
};

export const COVERAGE_37: CoverageRow37[] = [
  {
    num: null, id: "cover", title: "المقدمة وربط الدروس الثلاثة السابقة",
    elements: "العنوان · What Will You Be Doing Tomorrow? · رحلة إلى المستقبل — IQ200 🚀 · ربط WILL وBE GOING TO وWILL vs BE GOING TO · سؤال الصديق الافتتاحي · تعريف الحاجة إلى الزمن الجديد",
    location: "خطوة الغلاف (Cover) في Student Area + لافتات الكاميرا",
    transfer: "verbatim",
    platformAddition: "غلاف بصري بهوية «الكاميرا داخل المستقبل» وبطاقات تذكّر بمحطات الدروس 34–36.",
  },
  {
    num: 1, id: "s01", title: "🎯 1. أهداف الدرس",
    elements: "عشرة أهداف مرقّمة ①–⑩ (من فهم المعنى إلى حل اختبار من 25 سؤالًا)",
    location: "خطوة §1 (الخطوة 2 من 39) — كل هدف كما ورد",
    transfer: "verbatim",
    platformAddition: "قائمة مراجعة ذاتية تفاعلية لتحديد الأهداف الواضحة.",
  },
  {
    num: 2, id: "s02", title: "🧠 2. الفكرة الأساسية: تخيل نفسك داخل المستقبل",
    elements: "موقف الدراسة (الساعة الرابعة عصرًا) · خطة 6:00–9:00 · سؤال What will you be doing at 7:00 tomorrow? · الإجابة I will be studying. · الخط الزمني PAST/NOW/FUTURE · الجملة المركزية At 7:00 tomorrow, I will be studying.",
    location: "خطوة §2 (الخطوة 3 من 39)",
    transfer: "table-rebuilt",
    platformAddition: "مختبر «اللحظة المستقبلية»: اختيار لحظة على الخط الزمني ثم تحديد أي لحظة تصفها جملة المستقبل المستمر.",
    accuracyNote: "الخط الزمني في النسخ المورّد انفصلت أعمدته (6:00 · 7:00 · 9:00 وأمامها «بداية الدراسة · أثناء الدراسة · نهاية الدراسة» مختلطة). أُعيد ترتيبه في جدول واضح دون تغيير النص.",
  },
  {
    num: 3, id: "s03", title: "⭐ 3. القاعدة الأساسية",
    elements: "الصيغة Subject + will + be + V-ing · المقابل العربي · خمسة أمثلة مع ترجماتها · تنبيه ثبات will be مع جميع الضمائر",
    location: "خطوة §3 (الخطوة 4 من 39)",
    transfer: "verbatim",
    platformAddition: "بانِي الصيغة: ترتيب عناصر الصيغة بالنقر ثم التحقق من الترتيب.",
  },
  {
    num: 4, id: "s04", title: "🔬 4. تحليل التركيب خطوة بخطوة",
    elements: "تحليل She will be preparing dinner. إلى خمسة أدوار · لماذا be وليس is · الجملة الصحيحة ✅ والخطأ ❌",
    location: "خطوة §4 (الخطوة 5 من 39)",
    transfer: "verbatim",
    platformAddition: "تشريح الجملة تفاعليًا (تعيين دور كل جزء) + تحقق سريع من be مقابل is.",
  },
  {
    num: 5, id: "s05", title: "⚙️ 5. التصريف مع جميع الضمائر",
    elements: "جدول I/You/He/She/It/We/They مع جمل كل ضمير · تنبيه: لا s مع He/She/It · لا am/is/are بعد will · الصيغة الثابتة will be + V-ing",
    location: "خطوة §5 (الخطوة 6 من 39)",
    transfer: "table-rebuilt",
    platformAddition: "لوحة تصريف تفاعلية (اختيار الضمير) + ثلاث نقاط شائعة الخطأ.",
    accuracyNote: "الجدول في النسخ المورّد بلا خطوط: أُعيد بناؤه جدولًا من عمودين (الفاعل × الجملة) بنفس الصفوف السبعة.",
  },
  {
    num: 6, id: "s06", title: "🧠 6. الاستخدام الأول: نشاط سيكون جاريًا في لحظة مستقبلية محددة",
    elements: "أربعة أمثلة مع ترجماتها (الامتحان 10:00 · نوم الأطفال منتصف الليل · السفر إلى إسطنبول · تدريب الأخ الجمعة القادمة) · القاعدة الذهنية What will be happening at that moment?",
    location: "خطوة §6 (الخطوة 7 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر من خمسة بنود: اختيار الجملة التي تصف النشاط الجاري في اللحظة الموصوفة.",
  },
  {
    num: 7, id: "s07", title: "🎥 7. المستقبل المستمر مثل كاميرا داخل المستقبل",
    elements: "تشبيه الكاميرا · Past Simple صورة · Past Continuous كاميرا في الماضي · Future Continuous كاميرا داخل المستقبل · الأمثلة الثلاثة (yesterday/now/tomorrow at 8:00)",
    location: "خطوة §7 (الخطوة 8 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر الكاميرا: نقل الكاميرا بين الماضي والحاضر والمستقبل وقراءة الجملة والصيغة في كل موضع.",
  },
  {
    num: 8, id: "s08", title: "⭐ 8. التعبيرات الزمنية الشائعة",
    elements: "سبعة تعبيرات زمنية مع معانيها · مثالان (الشاطئ · ورشة العمل الثالثة) · تنبيه: tomorrow وحدها لا تفرض الزمن",
    location: "خطوة §8 (الخطوة 9 من 39)",
    transfer: "table-rebuilt",
    platformAddition: "مختبر مطابقة التعبير الزمني بالمشهد.",
    accuracyNote: "قائمة التعبيرات ومعانيها كانت أسطرًا متتابعة: أُعيد ترتيبها جدولًا (تعبير + معنى) بلا تغيير أي لفظ.",
  },
  {
    num: 9, id: "s09", title: "🔥 9. Future Simple vs Future Continuous",
    elements: "المقارنة I will study tomorrow. / I will be studying at 7:00 tomorrow. · مثال cook · سؤال IQ200 حول ما تعنيه كل جملة (لا انتهاء بالضرورة، ولا بداية/نهاية محددة)",
    location: "خطوة §9 (الخطوة 10 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر المعنى: أربعة بنود تربط كل جملة بما تقدّمه.",
    accuracyNote: "المصدر دقيق في تنبيهه: لا الجملة الأولى تعني انتهاء الدراسة بالضرورة، ولا الثانية تخبرنا بموعد البداية والنهاية — ونُقل التنبيه كما هو.",
  },
  {
    num: 10, id: "s10", title: "🧩 10. مختبر المعنى: نفس الفعل، زمن مختلف",
    elements: "الفعل travel في ثلاث صيغ (will travel · am going to travel · will be travelling) مع معنى كل صيغة · خلاصة أن الجمل الثلاث قد تتحدث عن الرحلة نفسها",
    location: "خطوة §10 (الخطوة 11 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر ثلاثي: مطابقة كل صيغة بالمعنى الذي تقدّمه.",
  },
  {
    num: 11, id: "s11", title: "🕒 11. الاستخدام الثاني: نشاط مستمر أثناء وقوع حدث مستقبلي آخر",
    elements: "مثال الأم (الوصول عند الخامسة والعمل من الرابعة إلى السادسة) · الحدثان ① و② · When you call me tonight, I will be studying. · When the guests arrive, we will be preparing dinner.",
    location: "خطوة §11 (الخطوة 12 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر الحدثين: تحديد أي حدث يقع أثناء الآخر وأي صيغة تكمل المثال.",
  },
  {
    num: 12, id: "s12", title: "🚨 12. قاعدة مهمة جدًا: لا نستخدم WILL عادةً بعد WHEN الزمنية",
    elements: "المثال الخطأ When you will arrive, I will be studying. ❌ · الصحيح When you arrive, I will be studying. ✅ · التعليل · ثلاثة أمثلة مع ترجماتها · الفرق المتقدم مع When will you arrive? ✅ وWhen you arrive, I'll call you. ✅",
    location: "خطوة §12 (الخطوة 13 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر تصنيف: جملة زمنية (Present Simple) أم سؤال مباشر (will صحيحة).",
    accuracyNote: "أضفنا حالة متقدمة موسومة من المنصة: في السؤال غير المباشر يبقى will صحيحًا (I don't know when you will arrive) لأنه ليس جملة زمنية — وهذه لا تنقض قاعدة المصدر بل تكمّلها.",
  },
  {
    num: 13, id: "s13", title: "🧠 13. ماذا عن WHILE؟",
    elements: "معنى while · مثالان (you are studying / the students are taking the exam) مع ترجمتيهما · شرح أن جملة while جاءت بالحاضر المستمر والجملة الرئيسية بالمستقبل المستمر",
    location: "خطوة §13 (الخطوة 14 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر while: إكمال الفعل المناسب في كل جملة.",
    accuracyNote: "استخدام Present Continuous في جملة while للدلالة على ترتيب مستقبلي مقبول في هذا السياق، ويصح كذلك Present Simple — وُضّح ذلك كملاحظة لا كتصحيح.",
  },
  {
    num: 14, id: "s14", title: "🎭 14. حوار تطبيقي: Tomorrow's Schedule",
    elements: "سبعة أسطر حوار كاملة · ترجمتها · أربعة عناصر تحليل (I'll be attending · I'll be working · Will you be studying · I'll call you) · ملاحظة جمع المستقبل البسيط والمستمر في حوار واحد",
    location: "خطوة §14 (الخطوة 15 من 39)",
    transfer: "verbatim",
    platformAddition: "قارئ حوار تفاعلي: فتح كل سطر لعرض ترجمته وتحليل المصدر لصيغته، مع سؤال فهم.",
  },
  {
    num: 15, id: "s15", title: "⭐ 15. الاستخدام الثالث: الحديث عن مجريات مستقبلية متوقعة",
    elements: "ثلاثة أمثلة مع ترجماتها (غداء المكتب · الاختبار النهائي الاثنين القادم · إصلاح الطريق نهاية الأسبوع) · خلاصة عدم التركيز على قرار لحظي",
    location: "خطوة §15 (الخطوة 16 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر المجريات المتوقعة (ثلاثة بنود) + تنبيه أن have هنا بمعنى يتناول لا يملك، فتصح الصيغة المستمرة.",
  },
  {
    num: 16, id: "s16", title: "🤝 16. الاستخدام الرابع: السؤال المهذب عن الخطط المستقبلية",
    elements: "مقارنة Will you use the computer tonight? / Will you be using the computer tonight? · مثالا السوبرماركت والبقاء في المنزل · شرح فكرة السؤال عن البرنامج والمتاح",
    location: "خطوة §16 (الخطوة 17 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر مواقف: اختيار السؤال الأنسب لغرض المتحدث.",
  },
  {
    num: 17, id: "s17", title: "🔬 17. الفرق بين WILL YOU وWILL YOU BE + ING",
    elements: "Will you drive me to school? مقابل Will you be driving to school tomorrow? · حوار A/B/A/B القصير · شرح السؤال عن الخطة قبل الطلب",
    location: "خطوة §17 (الخطوة 18 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر الفرق بين سؤال الاستعداد وسؤال البرنامج.",
  },
  {
    num: 18, id: "s18", title: "🚫 18. النفي — Negative Form",
    elements: "القاعدة Subject + will not + be + V-ing · الاختصار won't · أربعة أمثلة مع ترجماتها",
    location: "خطوة §18 (الخطوة 19 من 39)",
    transfer: "verbatim",
    platformAddition: "بانِي النفي: كتابة نفي كل جملة من جمل المصدر مع فحص العناصر البنيوية.",
  },
  {
    num: 19, id: "s19", title: "🚨 19. أخطاء النفي الشائعة",
    elements: "أربعة أزواج خطأ/صواب (won't studying · doesn't will be · will not are · won't be study) · القاعدة won't + be + V-ing · لا تحذف be ولا تستبدلها",
    location: "خطوة §19 (الخطوة 20 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر تشخيص الخطأ في كل زوج.",
  },
  {
    num: 20, id: "s20", title: "❓ 20. تكوين السؤال — Yes/No Questions",
    elements: "الجملة المثبتة ونقل will · القاعدة Will + Subject + be + V-ing? · أربعة أمثلة مع ترجماتها",
    location: "خطوة §20 (الخطوة 21 من 39)",
    transfer: "verbatim",
    platformAddition: "بانِي السؤال: خمس جمل لبناء سؤال نعم/لا منها مع فحص العناصر.",
  },
  {
    num: 21, id: "s21", title: "💬 21. الإجابات القصيرة",
    elements: "ثلاثة أزواج سؤال/إجابات · تنبيه أن الإجابة القصيرة تستخدم will أو won't ولا تكرر be + V-ing",
    location: "خطوة §21 (الخطوة 22 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر اختيار الإجابة القصيرة الصحيحة.",
  },
  {
    num: 22, id: "s22", title: "🔍 22. أسئلة Wh مع Future Continuous",
    elements: "القاعدة Wh-word + will + Subject + be + V-ing? · ستة أمثلة مع ترجماتها (What · Where · When · Why · Who · How long)",
    location: "خطوة §22 (الخطوة 23 من 39)",
    transfer: "verbatim",
    platformAddition: "ورشة إعادة بناء أسئلة Wh الستة مع فحص العناصر.",
  },
  {
    num: 23, id: "s23", title: "🧠 23. WHO عندما تكون الفاعل",
    elements: "Who will be leading the team? (Who فاعل) مقابل Who will you be meeting? (You فاعل) · شرح اختلاف الترتيب",
    location: "خطوة §23 (الخطوة 24 من 39)",
    transfer: "verbatim",
    platformAddition: "لوحة وظيفة who: فاعل أم مفعول به، مع بند ترتيب.",
  },
  {
    num: 24, id: "s24", title: "✍️ 24. قواعد إضافة ING — مراجعة تطبيقية",
    elements: "الحالات الأربع (إضافة مباشرة · حذف e · مضاعفة الحرف الأخير · ie ← ying) مع 12 فعلًا · مثال He will be running. وخطأ He will be runing. ❌",
    location: "خطوة §24 (الخطوة 25 من 39)",
    transfer: "verbatim",
    platformAddition: "ورشة كتابة صيغ -ing (16 فعلًا، منها أفعال إضافية للتدريب) مع العداد والتصحيح الفوري للصيغة.",
    accuracyNote: "المصدر يقول «نضاعف الحرف الأخير في بعض الأفعال» بلا شرط؛ أضفنا بيان الشرط الدقيق (المقطع الأخير مُشدَّد وينتهي CVC) لأن visit → visiting وopen → opening بلا مضاعفة.",
  },
  {
    num: 25, id: "s25", title: "⚠️ 25. أفعال الحالة مع Future Continuous",
    elements: "ستة أفعال حالة (know · believe · understand · want · need · own) · I will know the answer tomorrow. ✅ مقابل الصيغة المستمرة ❌ · She will own… ✅ · مثال think بمعنى نشاط التفكير",
    location: "خطوة §25 (الخطوة 26 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر أفعال الحالة (أربعة بنود) + توضيح أن الحكم يعتمد على المعنى في السياق.",
  },
  {
    num: 26, id: "s26", title: "🔥 26. المقارنة الكبرى: الأزمنة المستمرة الثلاثة",
    elements: "أمثلة read في الأزمنة الثلاثة · الخريطة الذهنية (الزمن · الصيغة · النقطة المرجعية) · الفكرة المشتركة والاختلاف",
    location: "خطوة §26 (الخطوة 27 من 39)",
    transfer: "table-rebuilt",
    platformAddition: "مختبر تحديد النقطة المرجعية لكل نشاط.",
    accuracyNote: "جدول الخريطة الذهنية أُعيد بناؤه بثلاثة أعمدة وثلاثة صفوف كما في المصدر بلا إضافة.",
  },
  {
    num: 27, id: "s27", title: "⚔️ 27. Future Simple vs BE GOING TO vs Future Continuous",
    elements: "ثلاث صيغ للمشروع العلمي مع شرح كل واحدة · قاعدة IQ200 (قرار؟ خطة؟ أم لحظة تصف النشاط الجاري خلالها؟)",
    location: "خطوة §27 (الخطوة 28 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر ثلاثي: اختيار الصيغة بحسب ما يقدّمه المتحدث.",
  },
  {
    num: 28, id: "s28", title: "🧩 28. تدريب تأسيسي: اختر الصيغة الصحيحة",
    elements: "ستة أسئلة اختيار من متعدد مع حلولها (B be · C cooking · A will · B be · C using · A will)",
    location: "خطوة §28 (الخطوة 29 من 39) + مفاتيح في منطقة الحلول والمعلم",
    transfer: "verbatim",
    platformAddition: "نشاط تفاعلي بستة بنود مع تصحيح فوري لكل بند وكشف حلول المصدر كما وردت.",
  },
  {
    num: 29, id: "s29", title: "✍️ 29. تدريب التحويلات",
    elements: "المثال (She will be reading at 8:00) · خمس جمل · لكل جملة صيغة نفي وصيغة سؤال مع الحلول",
    location: "خطوة §29 (الخطوة 30 من 39)",
    transfer: "verbatim",
    platformAddition: "ورشة تحويل: كتابة النفي والسؤال لكل جملة مع فحص العناصر وكشف حلول المصدر.",
  },
  {
    num: 30, id: "s30", title: "🕵️ 30. Grammar Detective — اكتشف الأخطاء",
    elements: "عشر جمل خاطئة (كل جملة فيها خطأ واحد على الأقل) مع عشرة تصحيحات مفصلة",
    location: "خطوة §30 (الخطوة 31 من 39)",
    transfer: "verbatim",
    platformAddition: "ورشة اكتشاف الأخطاء: كتابة التصحيح ثم عرض تصحيح المصدر مع سبب الخطأ لكل جملة.",
  },
  {
    num: 31, id: "s31", title: "🚀 31. IQ200 — اختر الزمن المناسب بحسب المعنى",
    elements: "ثمانية مواقف (الهاتف · المتحف · الامتحان الثامنة · السحب · الوعد · وصول الشخص · السفر · التكنولوجيا) مع مفاتيح المصدر وتعليل كل مفتاح",
    location: "خطوة §31 (الخطوة 32 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر IQ200: اختيار بين ثلاث صيغ لكل موقف مع مفتاح المصدر بعد المحاولة.",
  },
  {
    num: 32, id: "s32", title: "📖 32. Reading Challenge — A Day in the Future",
    elements: "نص A Busy Saturday كاملًا (يوم دانيال من الفطور 8:00 إلى استخدام الحاسوب بعد 9:00) · ثمانية أسئلة فهم بالحلول · عناصر be going to and WILL داخل السياق",
    location: "خطوة §32 (الخطوة 33 من 39)",
    transfer: "verbatim",
    platformAddition: "تمييز بصري اختياري لصيغ المستقبل + تحليل منصة لصيغ النص العشر مع سبب كل اختيار.",
  },
  {
    num: 33, id: "s33", title: "🧠 33. تحدي متقدم: هل الزمنان صحيحان؟",
    elements: "I will work tomorrow. / I will be working tomorrow. · مثال Will you travel next week? / Will you be travelling next week? · قاعدة أن Future Continuous لا يحتاج ساعة محددة دائمًا",
    location: "خطوة §33 (الخطوة 34 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر حكم: هل الجملتان صحيحتان مع اختلاف التركيز؟",
  },
  {
    num: 34, id: "s34", title: "🏆 34. الاختبار النهائي — Future Continuous Master Test",
    elements: "25 سؤالًا في خمسة مستويات: اختيار الإجابة (①–⑤) · إكمال الجمل (⑥–⑩) · تصحيح الأخطاء (⑪–⑮) · فهم المعنى (⑯–⑳) · فقرة Maya (㉑–㉕)",
    location: "خطوة §34 + منطقة الاختبار الرسمية (Test Area) بمعرّف lesson37-test",
    transfer: "key-missing-in-source",
    platformAddition: "منطقة اختبار مستقلة بلا تصحيح فوري؛ الأسئلة الـ25 مرقّمة Q1–Q25 وموزعة 5 × 5، وكل سطر مصدري في §34 مرتبط بالواجهة.",
    accuracyNote: "المصدر يعرض الأسئلة دون مفتاح إجابة؛ لذلك لا يُعرض أي مفتاح داخل الاختبار، وكُتبت الحلول الـ25 في وحدة مستقلة موسومة بأنها من إعداد المنصة.",
  },
  {
    num: 35, id: "s35", title: "🔐 35. مساحة المعلم — الحلول التفصيلية للاختبار",
    elements: "عنوان مفتاح التصحيح · «حاول حل الاختبار كاملًا قبل كشف الإجابات» · «عرض الحلول التفصيلية»",
    location: "خطوة §35 + منطقة Solutions (مقفلة حتى التسليم) + منطقة المعلم (كلمة المرور)",
    transfer: "key-missing-in-source",
    platformAddition: "حلول تفصيلية للأسئلة الـ25 (25 بطاقة في منطقة الحلول و25 بطاقة في دليل المعلم) بنماذج وبدائل مقبولة، وكلها موسومة بأنها من إعداد المنصة/المعلم.",
  },
  {
    num: 36, id: "s36", title: "✍️ 36. مهمة الإنتاج اللغوي — Writing Mission",
    elements: "العنوان My Life at This Time Tomorrow · فقرة 12–15 جملة · الشروط الثمانية ①–⑧ · النموذج الإرشادي (خمس أسطر) · تنبيه عدم النسخ",
    location: "خطوة §36 (الخطوة 37 من 39)",
    transfer: "verbatim",
    platformAddition: "ورشة كتابة: عداد جمل تقريبي، وقائمة الشروط الثمانية، وكشف النموذج بعد كتابة الفقرة.",
  },
  {
    num: 37, id: "s37", title: "🧠 37. الملخص الذهبي للدرس 37",
    elements: "الصيغة والنفي والسؤال والإجابة القصيرة وأسئلة المعلومات مع أمثلتها · أهم الاستخدامات الأربعة · القاعدة الذهبية بين Future Simple وFuture Continuous · تشبيه الكاميرا",
    location: "خطوة §37 (الخطوة 38 من 39)",
    transfer: "verbatim",
    platformAddition: "مختبر وصل كل استخدام بمثاله الأصلي.",
  },
  {
    num: 38, id: "s38", title: "🗺️ 38. خريطة تقدم المنهج",
    elements: "منظومات الحاضر والماضي والمستقبل (①–⑫) وحالة الإكمال · المحطة القادمة الدرس 38: Future Perfect · المثال التمهيدي By 8:00 tomorrow, I will have finished my homework. · مقارنة الجمل الثلاث · خاتمة الدرس",
    location: "خطوة §38 (الخطوة 39 من 39)",
    transfer: "verbatim",
    platformAddition: "اختبار تمهيدي قصير (ثلاثة بنود) على نص الخريطة ومثال الدرس 38.",
  },
];

export const COVERAGE_SECTION_COUNT_37 = COVERAGE_37.filter((row) => row.num != null).length;
export const COVERAGE_ACCURACY_NOTES_37 = COVERAGE_37.filter((row) => row.accuracyNote);
export const COVERAGE_PLATFORM_ADDITIONS_37 = COVERAGE_37.filter((row) => row.platformAddition);
