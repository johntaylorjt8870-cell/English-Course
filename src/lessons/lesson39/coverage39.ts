import { SLIDES_39 } from "./data";
/** Source inventory with live step locations. The immutable source is ledger39.ts. */
type Inventory39 = {
  num: number | null;
  id: string;
  title: string;
  elements: string;
  location: string;
  transfer: string;
  accuracyNote?: string;
};
const inventory: Inventory39[] = [
  {
    num: null,
    id: "cover",
    title: "المقدمة وربط الدرس 38",
    elements:
      "العنوان · How Long Will You Have Been Learning? · رحلة إتقان الأزمنة الإنجليزية — IQ200 🚀 · جسر الدرس 38 (By 8:00, I will have finished my homework.) · تحوّل السؤال إلى كم ساعة · By 8:00, I will have been studying for three hours. · آخر زمن رئيسي في منظومة المستقبل (من الدرس 34)",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "علم المملكة المتحدة (إيموجي GB) في بداية سطر العنوان حُذف وفق قاعدة المستودع (لا أعلام إيموجي في واجهة الدروس)؛ بقية السطر محفوظ حرفيًا.",
  },
  {
    num: 1,
    id: "s01",
    title: "🎯 1. أهداف الدرس",
    elements:
      "عشرة أهداف مرقّمة ①–⑩ (من فهم المعنى إلى الاختبار النهائي من 25 سؤالًا)",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 2,
    id: "s02",
    title: "🧠 2. الفكرة الأساسية: نحن لا نقيس الإنجاز، بل المدة",
    elements:
      "سيناريو سامر 4:00–8:00 · الحساب 4 ساعات · By 8:00, Samer will have been studying English for four hours. · العناصر الثلاثة ①②③ · الخط الزمني NOW ─ 4:00 ─ 5:00 ─ 6:00 ─ 7:00 ─ 8:00 · التعريف المركزي",
    location: "",
    transfer: "table-rebuilt",
    accuracyNote:
      "سطر الخط الزمني ورد في النسخ بلا أعمدة (NOW ─ 4:00 … ─ 8:00) وتحته ثلاثة أوصاف (بداية الدراسة ← استمرار الدراسة ← نقطة المرجع المستقبلية). أُعيد بناؤه جدولًا من ست نقاط بالنقاط الزمنية والأوصاف الثلاثة نفسها، ووُسم NOW بأنه لحظة الكلام لأن المصدر لم يحدد له دورًا؛ والحساب المعروض (4 ساعات) مطابق لحساب المصدر.",
  },
  {
    num: 3,
    id: "s03",
    title: "⭐ 3. القاعدة الأساسية",
    elements:
      "الصيغة Subject + will + have + been + V-ing · المقابل العربي · خمسة أمثلة مع ترجماتها · المثال الكامل By noon, I will have been working for five hours.",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 4,
    id: "s04",
    title: "🔬 4. تحليل التركيب خطوة بخطوة",
    elements:
      "تحليل She will have been studying for three hours by 9:00. إلى سبعة أدوار · التركيب الكامل · انتبه: She will has been studying. ❌ / She will have been studying. ✅ · السبب",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 5,
    id: "s05",
    title: "⚙️ 5. التصريف مع جميع الضمائر",
    elements:
      "جدول I/You/He/She/It/We/They مع جمل كل ضمير (It will have been working.) · ثبات الصيغة will have been + V-ing · لا has مع He/She/It · لا being بدل been",
    location: "",
    transfer: "table-rebuilt",
    accuracyNote:
      "الجدول في النسخ المورّد بلا خطوط أعمدة: أُعيد بناؤه جدولًا من عمودين (الفاعل × الجملة) بالصفوف السبعة نفسها دون تغيير أي خلية.",
  },
  {
    num: 6,
    id: "s06",
    title: "⏰ 6. الاستخدام الأول: نشاط يستمر حتى نقطة مستقبلية",
    elements:
      "أربعة أمثلة مع ترجماتها (حزيران القادم · السادسة · نهاية الشهر · منتصف الليل) · السؤال الذهبي وقاعدته",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 7,
    id: "s07",
    title: "🧠 7. هل يجب أن يستمر النشاط بعد النقطة المستقبلية؟",
    elements:
      "الجواب «لا» · الجملة لا تخبرنا وحدها · قد أتوقف عند الثامنة وقد أستمر حتى التاسعة · الزمن لا يضمن الاستمرار بل يبرز المدة",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "هذا القسم هو الذي يمنع تدريس القاعدة المبسّطة الخاطئة (التام = توقف، التام المستمر = لم يتوقف)؛ حُفظ نصه كاملًا ورُبط بـ§18.",
  },
  {
    num: 8,
    id: "s08",
    title: "⭐ 8. FOR — للتعبير عن المدة",
    elements:
      "خمسة تعبيرات for مع معانيها · مثالان مع Future Perfect Continuous · القاعدة for + مدة زمنية",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 9,
    id: "s09",
    title: "🔬 9. SINCE — للتعبير عن نقطة البداية",
    elements:
      "معنى since · أربعة تعبيرات since · مثال By noon, I will have been working since 7:00. · مثال By next September … since 2024. · شرط منطقية نقطة البداية",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "مثال المصدر By noon, I will have been working since 7:00. صحيح لكنه يذكر نقطة البداية فقط دون المدة؛ أُضيفت ملاحظة منصة مؤهلة (لا تعديل على النص) تبيّن أن الصيغة الأوضح لذكر المدة هي for five hours، وأن الجمع بين by + since أقل شيوعًا.",
  },
  {
    num: 10,
    id: "s10",
    title: "⚔️ 10. FOR vs SINCE — المقارنة الذهبية",
    elements:
      "المقارنة for three hours / since 5:00 مع ترجمتيهما · FOR تجيب عن How long? · SINCE تجيب عن Since when? · أمثلة المقارنة الثمانية",
    location: "",
    transfer: "table-rebuilt",
    accuracyNote:
      "«أمثلة مقارنة» وردت ثمانية أسطر متتالية بلا أعمدة؛ أُعيد بناؤها جدولًا من أربعة صفوف (for × since) بالنص نفسه. وجملة I will have been studying since 5:00. بلا نقطة مرجع مستقبلية صريحة، فأُضيفت ملاحظة منصة تؤهل المثال (المرجع يُفهم من السياق) دون تغيير النص.",
  },
  {
    num: 11,
    id: "s11",
    title: "🧩 11. مختبر حساب المدة",
    elements:
      "ثلاثة أمثلة محسوبة (أحمد 3→7 = 4 ساعات · ليلى 8 صباحًا→2 ظهرًا = 6 ساعات · المشروع كانون الثاني→تموز = 6 أشهر) وجملها الثلاث · ملاحظة افتراض التاريخ نفسه",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "الحسابات الثلاثة تحققت عدديًا (4 · 6 · 6) وهي متفقة مع جمل المصدر المعروضة؛ ملاحظة المصدر عن افتراض التاريخ نفسه من الشهرين محفوظة كما وردت.",
  },
  {
    num: 12,
    id: "s12",
    title: "🕒 12. BY — النقطة المستقبلية المرجعية",
    elements:
      "معنى by من الدرس 38 · اختلاف التركيز · مقارنة By 8:00, I will have finished the report. / By 8:00, I will have been working on the report for three hours. · by لا تحدد الزمن وحدها",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 13,
    id: "s13",
    title: "🔥 13. BY THE TIME — بحلول الوقت الذي",
    elements:
      "المثال الأول وترجمته · الحدثان ①② · مثال المعلم (ثلاثون دقيقة) · مثال الحفل (ساعة في الطابور)",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 14,
    id: "s14",
    title: "🚨 14. لا تستخدم WILL بعد BY THE TIME الزمنية",
    elements:
      "الجملة الخطأ ❌ والصحيحة ✅ · السبب · التركيب By the time + Subject + Present Simple, Subject + will have been + V-ing · مثال By the time she comes…",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "قاعدة المصدر تخص الجملة الزمنية المستقبلية؛ أُضيفت ملاحظة صريحة بأنها لا تُطبَّق آليًا على كل استعمال لكلمات by the time (السرد الماضي يأخذ صيغًا ماضية).",
  },
  {
    num: 15,
    id: "s15",
    title: "🎭 15. حوار تطبيقي: The Long Study Day",
    elements:
      "ثمانية أدوار كاملة · الترجمة العربية المصدرية (ثمانية أسطر) · التحليل الثلاثي (will have been studying · will have finished · will have been working) · ملاحظة استخدام الزمنين في الحوار نفسه",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "تحليل الأدوار الثلاثة الرئيسية من نص المصدر؛ وتحليل بقية الأدوار إضافة منصة موسومة. جملة even if I haven't finished everything محكية طبيعيًا ويفهم منها by then ضمناً، فلم تُعدَّل.",
  },
  {
    num: 16,
    id: "s16",
    title: "⚔️ 16. Future Perfect vs Future Perfect Continuous",
    elements:
      "صيغتا الزمنين · التركيز النموذجي لكل منهما · مثال المقالات (five articles / for two weeks) مع الترجمتين · المقارنة الذهبية بأربعة أسئلة",
    location: "",
    transfer: "table-rebuilt",
    accuracyNote:
      "جدول المقارنة الذهبية ورد أربعة أسطر بلا أعمدة؛ أُعيد بناؤه جدولًا (السؤال × الزمن الأنسب غالبًا) بالنص نفسه. كلمة «غالبًا» في عنوان العمود محفوظة لأنها تمنع التحويل الآلي للكلمات الدالة.",
  },
  {
    num: 17,
    id: "s17",
    title: "🧠 17. النتيجة vs المدة — أمثلة متقابلة",
    elements:
      "ثلاثة أزواج: القراءة (three books / for ten hours) · البناء (built the bridge / for three years) · التعلم (completed the course / learning for two years) مع الترجمات وبيانات التركيز",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 18,
    id: "s18",
    title: "🔬 18. هل Future Perfect Continuous يعني أن العمل لم ينتهِ؟",
    elements:
      "«ليس بالضرورة» · الجملة لا تخبرنا وحدها · By 8:00, I will have finished studying. · نفي القاعدة المبسّطة · الفرق الأساسي (الإنجاز مقابل المدة)",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 19,
    id: "s19",
    title: "🚫 19. النفي — Negative Form",
    elements:
      "القاعدة Subject + will not + have + been + V-ing · الاختصار won't = will not · الصيغة المختصرة · ثلاثة أمثلة مع ترجماتها",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "الجمل المثبتة المستخدمة كنقطة انطلاق في الباني مشتقة من أمثلة المصدر نفسها (حذف won't)، وموسومة بأنها تدريب من إعداد المنصة؛ أما الإجابات المتوقعة فهي أمثلة المصدر النافية حرفيًا.",
  },
  {
    num: 20,
    id: "s20",
    title: "🧠 20. معنى النفي في المستقبل التام المستمر",
    elements:
      "By 8:00, I won't have been studying for four hours. · النفي لا يعني عدم الدراسة · مثال البدء عند الخامسة وثلاث ساعات · الخلاصة",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 21,
    id: "s21",
    title: "❓ 21. تكوين السؤال — Yes/No Questions",
    elements:
      "القاعدة Will + Subject + have + been + V-ing? · ثلاثة أسئلة مع ترجماتها",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 22,
    id: "s22",
    title: "💬 22. الإجابات القصيرة",
    elements:
      "زوجا سؤال/إجابات (Yes, I will. · No, I won't. · Yes, she will. · No, she won't.) · ملاحظة عدم تكرار have been + V-ing",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 23,
    id: "s23",
    title: "🔍 23. HOW LONG — السؤال الأهم في هذا الزمن",
    elements:
      "القاعدة How long + will + Subject + have + been + V-ing? · ثلاثة أسئلة مع ترجماتها وإجاباتها الثلاث",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "ترتيب الفاعل والمساعد في أسئلة المصدر الثلاثة تحقّق حرفيًا: How long will you/she/they have been …؟ ولا يوجد تقديم للفاعل على will.",
  },
  {
    num: 24,
    id: "s24",
    title: "⭐ 24. أسئلة Wh الأخرى",
    elements:
      "ثلاثة أسئلة (What · Where · Why) مع ترجماتها · بقاء How long الأكثر ارتباطًا بالزمن",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 25,
    id: "s25",
    title: "🧠 25. المقارنة الكبرى: الأزمنة التامة المستمرة الثلاثة",
    elements:
      "الأزمنة الثلاثة مع الفعل work وثلاث جمل · الجدول الذهبي (الزمن × الصيغة × النقطة المرجعية) · الفكرة المشتركة والاختلاف",
    location: "",
    transfer: "table-rebuilt",
    accuracyNote:
      "الجدول الذهبي ورد بلا أعمدة؛ أُعيد بناؤه بثلاثة أعمدة وثلاثة صفوف كما في المصدر بلا إضافة.",
  },
  {
    num: 26,
    id: "s26",
    title: "⚠️ 26. أفعال الحالة مع Future Perfect Continuous",
    elements:
      "قائمة الأفعال الستة (know · believe · understand · want · need · own) · زوجا ✅/❌ (known · owned) · جواز lived / been living · تفضيل الثانية لإبراز الاستمرار",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "نص المصدر يوسم الصيغة المستمرة مع know/own بـ«❌ في الاستعمال المعتاد» لا بالخطأ المطلق؛ حُفظ هذا التأهيل حرفيًا لأنه دقيق لغويًا.",
  },
  {
    num: 27,
    id: "s27",
    title: "🚨 27. أخطاء شائعة جدًا",
    elements:
      "سبعة أزواج ❌/✅ (will has been · will have being · will have been work · won't has been · Will she have being studying? · By the time you will arrive · will have been knowing)",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 28,
    id: "s28",
    title: "🎭 28. حوار تطبيقي: The Marathon Training",
    elements:
      "تسعة أدوار كاملة · التحليل الرباعي (will have been training · will have completed · will have finished · will do well) · جمع الحوار بين FPC وFP وFuture Simple",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "المصدر لم يقدّم ترجمة عربية لهذا الحوار؛ الترجمات المعروضة إضافة منصة موسومة (origin: platform) وليست نصًا مصدريًا. التحليل الرباعي من نص المصدر.",
  },
  {
    num: 29,
    id: "s29",
    title: "✍️ 29. التدريب الأول: اختر الصيغة الصحيحة",
    elements:
      "ستة أسئلة اختيار من متعدد بثلاثة خيارات · مفتاح المصدر (① B been · ② C working · ③ A will · ④ B been · ⑤ C living · ⑥ B learning)",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "تكرار من المصدر نفسه: البندان ① و② من تدريب §29 يردان حرفيًا في المستوى الأول من اختبار §35 (البنود ① و②). حُفظ الموضعان كما وردا في المصدر دون حذف أو تعديل، وأُشير إلى التكرار داخل خطوة §29 حتى لا يظن الطالب أنه خطأ في المنصة. بقية بنود التدريب (③–⑥) مختلفة عن بنود الاختبار (③–⑤).",
  },
  {
    num: 30,
    id: "s30",
    title: "🧩 30. التدريب الثاني: أكمل باستخدام Future Perfect Continuous",
    elements:
      "ست إكمالات (study · work · travel · not/wait · سؤال learn · prepare) · مفتاح المصدر الستة",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 31,
    id: "s31",
    title:
      "🔥 31. التدريب الثالث: Future Perfect أم Future Perfect Continuous؟",
    elements:
      "ثمانية مواقف (write ×2 · build ×2 · read ×2 · finish/study) · الحلول المفصلة الثمانية مع أسبابها",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 32,
    id: "s32",
    title: "🕵️ 32. Grammar Detective — اكتشف الأخطاء",
    elements: "عشر جمل خاطئة · عشرة تصحيحات مصدرية",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "البند ⑤ يحذف will من الجملة الزمنية، والبند ⑥ يستخدم will have known لفعل الحالة؛ البند ⑦ يستخدم working بدل worked.",
  },
  {
    num: 33,
    id: "s33",
    title: "🧠 33. IQ200 — هل الزمنان صحيحان؟",
    elements:
      "زوج will have worked / will have been working · الجواب «نعم» وشرحا الجملتين · for لا يفرض FPC · زوج lived / been living · القاعدة المتقدمة",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 34,
    id: "s34",
    title: "📖 34. Reading Challenge — The Long Journey",
    elements:
      "نص A Journey Across the Country كاملًا (16 سطرًا) · أسئلة الفهم السبعة · الحلول السبعة المصدرية",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "الحسابات تحققت: 6:00 صباحًا → الظهر = 6 ساعات، و6:00 صباحًا → 6:00 مساءً = 12 ساعة، و11:00 تقع قبل الظهر فلا تعارض. ملاحظة فيدلية: مفتاح المصدر للسؤال ⑦ يذكر جملة واحدة (By noon, we will have been travelling for six hours.) بينما يتضمن النص جملتين بـ Future Perfect Continuous؛ أُضيفت ملاحظة توضح ذلك دون تعديل المفتاح.",
  },
  {
    num: 35,
    id: "s35",
    title: "🏆 35. الاختبار النهائي — Future Perfect Continuous Master Test",
    elements:
      "25 سؤالًا في خمسة مستويات: اختيار (①–⑤) · إكمال (⑥–⑩) · تصحيح (⑪–⑮) · فهم المعنى (⑯–⑳) · فقرة Final IQ200 Boss (㉑–㉕)",
    location: "",
    transfer: "key-missing-in-source",
    accuracyNote:
      "المصدر يعرض الأسئلة دون مفتاح؛ لذلك لا يُعرض أي مفتاح داخل الاختبار. تحقّق آلي: أسطر §35 الثمانية والخمسون مرتبطة بواجهة الاختبار مرة واحدة لكل سطر وبترتيب المصدر (0…57) دون تكرار أو حذف. البندان Q1 وQ2 يكرران حرفيًا بندَي تدريب §29 ① و② — تكرار وارد في المصدر نفسه وموثّق في صف §29.",
  },
  {
    num: 36,
    id: "s36",
    title: "🔐 36. مساحة المعلم — الحلول التفصيلية للاختبار",
    elements:
      "عنوان مفتاح التصحيح · «حاول حل الاختبار كاملًا قبل كشف الإجابات» · «عرض الحلول التفصيلية»",
    location: "",
    transfer: "key-missing-in-source",
  },
  {
    num: 37,
    id: "s37",
    title: "✍️ 37. مهمة الإنتاج اللغوي — Writing Mission",
    elements:
      "العنوان My Learning Journey by Next Year · فقرة 12–15 جملة · الشروط الثمانية ①–⑧ · النموذج الإرشادي (خمسة أسطر) · تنبيه عدم النسخ",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 38,
    id: "s38",
    title: "🧠 38. الملخص الذهبي للدرس 39",
    elements:
      "الصيغة والنفي والسؤال والإجابة القصيرة وسؤال المدة مع أمثلتها · الاستخدامات الثلاثة · المقارنة الذهبية · التعريف الختامي",
    location: "",
    transfer: "verbatim",
  },
  {
    num: 39,
    id: "s39",
    title: "🗺️ 39. خريطة تقدم المنهج",
    elements:
      "صيغ المستقبل الست ①–⑥ · الأدوات الست التي يمتلكها الطالب · المحطة القادمة: الدرس 40 Future Tenses Master Review ووصفه · الخاتمة",
    location: "",
    transfer: "verbatim",
    accuracyNote:
      "الدرس 40 منفّذ في المستودع الحالي؛ رابط المراجعة متاح في آخر خطوة.",
  },
];
export const COVERAGE_39 = inventory.map((row) => ({
  ...row,
  location:
    SLIDES_39.filter((s) => s.sourceId === row.id)
      .map((s) => s.id)
      .join(" · ") + (row.id === "s35" ? " + Test Area Q1–25" : ""),
  platformAddition:
    row.id === "s35" || row.id === "s36"
      ? "حلول مفصّلة من إعداد المعلم تُحمّل بعد التسليم / دخول المعلم."
      : "خطوات قصيرة؛ أنشطة اختيار وبناء وحساب وتصحيح؛ ربط كل سطر في stepManifest39.ts.",
}));
export const COVERAGE_SECTION_COUNT_39 = COVERAGE_39.filter(
  (r) => r.num != null,
).length;
export const COVERAGE_ACCURACY_NOTES_39 = COVERAGE_39.filter(
  (r) => r.accuracyNote,
);
export const COVERAGE_PLATFORM_ADDITIONS_39 = COVERAGE_39.filter(
  (r) => r.platformAddition,
);
