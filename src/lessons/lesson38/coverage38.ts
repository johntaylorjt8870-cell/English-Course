// ============================================================
// Lesson 38 — سجل تغطية المصدر (Source Coverage Ledger)
// ============================================================

import { SLIDES_38 } from "./data";

/**
 * موضع كل قسم مصدري في خطوات الدرس الجديدة — يُحسب من خريطة الخطوات نفسها
 * حتى لا تنفصل أرقام التغطية عن الواجهة بعد أي تعديل.
 */
function coverageLocation38(id: string): string {
  const steps = SLIDES_38.filter((slide) => slide.sourceId === id);
  if (!steps.length) return "—";
  const label = steps.length === 1 ? "الخطوة" : "الخطوات";
  const base = `${label} ${steps.map((slide) => slide.step).join(" · ")} — ${steps.map((slide) => slide.title).join(" / ")}`;
  if (id === "s33") return `${base} · منطقة الاختبار الرسمية (lesson38-test)`;
  if (id === "s34") return `${base} · منطقة الحلول المقفلة + دليل المعلم`;
  if (["s27", "s28", "s29", "s30"].includes(id)) return `${base} · مفتاح المصدر داخل الخطوة بعد المحاولة + منطقة المعلم`;
  return base;
}

export type CoverageRow38 = {
  num: number | null;
  id: string;
  title: string;
  elements: string;
  location: string;
  transfer: "verbatim" | "table-rebuilt" | "key-missing-in-source";
  platformAddition?: string;
  accuracyNote?: string;
};

export const COVERAGE_38: CoverageRow38[] = [
  {
    num: null, id: "cover", title: "المقدمة وربط الدرس 37",
    elements: "العنوان · By Tomorrow, I Will Have Finished! · إتقان التعبير عن الإنجاز قبل نقطة مستقبلية — IQ200 🚀 · جسر Future Continuous · At 8:00 tomorrow, I will be studying. · By 8:00 tomorrow, I will have finished studying. · تعريف Future Perfect",
    location: coverageLocation38("cover"),
    transfer: "verbatim",
    platformAddition: "غلاف بصري بهوية مرصد الإنجاز المستقبلي وبطاقات تذكّر بجسر الدرس 37 دون استبدال نص المصدر.",
  },
  {
    num: 1, id: "s01", title: "🎯 1. أهداف الدرس",
    elements: "عشرة أهداف مرقّمة ①–⑩ (من فهم المعنى إلى حل اختبار شامل)",
    location: coverageLocation38("s01"),
    transfer: "verbatim",
    platformAddition: "قائمة مراجعة ذاتية تفاعلية لتحديد الأهداف الواضحة.",
  },
  {
    num: 2, id: "s02", title: "🧠 2. الفكرة الأساسية: انظر إلى المستقبل من نقطة أبعد",
    elements: "سيناريو الاثنين/الأربعاء/الجمعة · Will your project be ready by Friday? · Yes. I will have finished it by Friday. · الخط الزمني MONDAY/WEDNESDAY/FRIDAY · التعريف المركزي",
    location: coverageLocation38("s02"),
    transfer: "table-rebuilt",
    platformAddition: "مختبر الخط الزمني: اختيار MONDAY أو WEDNESDAY أو FRIDAY ثم تحديد أي يوم هو نقطة المرجع المستقبلية.",
    accuracyNote: "الخط الزمني في النسخ المورّد انفصلت أعمدته (MONDAY · WEDNESDAY · FRIDAY وأمامها «اليوم · إنهاء المشروع · نقطة المرجع المستقبلية» مختلطة). أُعيد ترتيبه في جدول واضح دون تغيير النص.",
  },
  {
    num: 3, id: "s03", title: "⭐ 3. القاعدة الأساسية",
    elements: "الصيغة Subject + will + have + V3 · المقابل العربي · خمسة أمثلة مع ترجماتها",
    location: coverageLocation38("s03"),
    transfer: "verbatim",
    platformAddition: "بانِي الصيغة: ترتيب Subject → will → have → V3 بالنقر ثم التحقق.",
  },
  {
    num: 4, id: "s04", title: "🔬 4. تحليل التركيب خطوة بخطوة",
    elements: "تحليل She will have completed the experiment by noon. إلى ستة أدوار · لماذا have وليس has · الجملة الصحيحة ✅ والخطأ ❌",
    location: coverageLocation38("s04"),
    transfer: "verbatim",
    platformAddition: "تشريح الجملة تفاعليًا (تعيين دور كل جزء) + تحقق سريع من have مقابل has.",
  },
  {
    num: 5, id: "s05", title: "⚙️ 5. التصريف مع جميع الضمائر",
    elements: "جدول I/You/He/She/It/We/They مع جمل كل ضمير · التركيب الثابت will have + V3 · It will have stopped.",
    location: coverageLocation38("s05"),
    transfer: "table-rebuilt",
    platformAddition: "لوحة تصريف تفاعلية (اختيار الضمير) + ثلاث نقاط شائعة الخطأ (has بعد will، finish بدل finished، went بدل gone).",
    accuracyNote: "الجدول في النسخ المورّد بلا خطوط: أُعيد بناؤه جدولًا من عمودين (الفاعل × الجملة) بنفس الصفوف السبعة.",
  },
  {
    num: 6, id: "s06", title: "🧠 6. الاستخدام الأول: إنجاز سيكون مكتملًا بحلول وقت مستقبلي",
    elements: "أربعة أمثلة مع ترجماتها (الواجب 6:00 · الجسر · خمسة كتب · صباح الغد) · السؤال الذهبي",
    location: coverageLocation38("s06"),
    transfer: "verbatim",
    platformAddition: "مختبر من أربعة بنود: اختيار الجملة التي تصف الإنجاز المكتمل بحلول الموعد.",
  },
  {
    num: 7, id: "s07", title: "⏰ 7. BY — الكلمة المفتاحية الأهم",
    elements: "معنى by = بحلول / في موعد لا يتجاوز · By 8:00, I will have finished. · قد ينتهي عند السابعة · At 8:00 مقابل By 8:00",
    location: coverageLocation38("s07"),
    transfer: "verbatim",
    platformAddition: "مختبر: هل by تعني الانتهاء في اللحظة المحددة تمامًا؟ مع تغذية راجعة بعد المحاولة.",
  },
  {
    num: 8, id: "s08", title: "🔬 8. AT vs BY — مختبر المعنى",
    elements: "خطة الدراسة 6:00–9:00 · At 8:00, I will be studying. · By 9:00, I will have finished studying. · جدول التعبير/التركيز · تنبيه أن المعنى هو الأساس",
    location: coverageLocation38("s08"),
    transfer: "table-rebuilt",
    platformAddition: "مختبر اختيار: أي جملة تناسب at وأي جملة تناسب by.",
    accuracyNote: "جدول المقارنة في النسخ المورّد بلا خطوط؛ أُعيد بناؤه بعمودين وصفّين دون تغيير النص. تنبيه المصدر نفسه محفوظ: ليست قاعدة تمنع at مع Future Perfect أو by مع زمن آخر.",
  },
  {
    num: 9, id: "s09", title: "⭐ 9. تعبيرات شائعة مع Future Perfect",
    elements: "تسعة تعبيرات (by tomorrow … by the time you arrive) مع معانيها · ثلاثة أمثلة",
    location: coverageLocation38("s09"),
    transfer: "table-rebuilt",
    platformAddition: "مختبر مطابقة التعبير الزمني بالمعنى.",
    accuracyNote: "قائمة التعبيرات ومعانيها كانت أسطرًا متتابعة: أُعيد ترتيبها جدولًا (تعبير + معنى) بلا تغيير أي لفظ.",
  },
  {
    num: 10, id: "s10", title: "🧩 10. الاستخدام الثاني: الإنجاز قبل وقوع حدث مستقبلي آخر",
    elements: "سيناريو الزيارة عند الخامسة · By the time you arrive, I will have finished my homework. · الحدثان ① و② · مثالان إضافيان (المعلم / الفيلم)",
    location: coverageLocation38("s10"),
    transfer: "verbatim",
    platformAddition: "مختبر الحدثين: أي حدث يكتمل قبل الآخر؟",
  },
  {
    num: 11, id: "s11", title: "🚨 11. قاعدة مهمة: BY THE TIME + PRESENT SIMPLE",
    elements: "الجملة الخطأ By the time you will arrive… ❌ · الصحيح By the time you arrive… ✅ · التركيب · ثلاثة أمثلة · امتداد درس 37",
    location: coverageLocation38("s11"),
    transfer: "verbatim",
    platformAddition: "مختبر تصنيف: جملة زمنية (Present Simple) أم خطأ will داخل by the time.",
  },
  {
    num: 12, id: "s12", title: "🧠 12. الفرق بين BY وBEFORE",
    elements: "by = بحلول موعد معين · before = قبل ذلك الموعد · مثال التقرير الجمعة · مثال 10:00",
    location: coverageLocation38("s12"),
    transfer: "verbatim",
    platformAddition: "مختبر: أي جملة تسمح بالاكتمال يوم الجمعة نفسه؟",
  },
  {
    num: 13, id: "s13", title: "🎭 13. حوار تطبيقي: The School Exhibition",
    elements: "ستة أسطر حوار كاملة · ترجمتها · أربعة عناصر تحليل (completed · tested · prepared · finished)",
    location: coverageLocation38("s13"),
    transfer: "verbatim",
    platformAddition: "قارئ حوار تفاعلي: فتح كل سطر لعرض ترجمته وتحليل المصدر لصيغته، مع سؤال فهم.",
  },
  {
    num: 14, id: "s14", title: "🚫 14. النفي — Negative Form",
    elements: "القاعدة Subject + will not + have + V3 · الاختصار won't · أربعة أمثلة مع ترجماتها",
    location: coverageLocation38("s14"),
    transfer: "verbatim",
    platformAddition: "بانِي النفي: كتابة نفي كل جملة من جمل المصدر مع فحص العناصر البنيوية.",
  },
  {
    num: 15, id: "s15", title: "🧠 15. ماذا يعني النفي في Future Perfect؟",
    elements: "I won't have finished the report by 6:00. · النفي مرتبط بالنقطة لا بـ«أبدًا» · مثال الفريق والاثنين",
    location: coverageLocation38("s15"),
    transfer: "verbatim",
    platformAddition: "مختبر معنى النفي: ماذا ينفي المتحدث فعلًا؟",
  },
  {
    num: 16, id: "s16", title: "❓ 16. تكوين السؤال — Yes/No Questions",
    elements: "الجملة المثبتة ونقل will · القاعدة Will + Subject + have + V3? · أربعة أمثلة مع ترجماتها",
    location: coverageLocation38("s16"),
    transfer: "verbatim",
    platformAddition: "بانِي السؤال: بناء سؤال نعم/لا من جمل المصدر مع فحص العناصر.",
  },
  {
    num: 17, id: "s17", title: "💬 17. الإجابات القصيرة",
    elements: "ثلاثة أزواج سؤال/إجابات · تنبيه أن الإجابة القصيرة تستخدم will أو won't ولا تكرر have + V3",
    location: coverageLocation38("s17"),
    transfer: "verbatim",
    platformAddition: "مختبر اختيار الإجابة القصيرة الصحيحة.",
  },
  {
    num: 18, id: "s18", title: "🔍 18. أسئلة Wh مع Future Perfect",
    elements: "القاعدة Wh-word + will + Subject + have + V3? · خمسة أمثلة (What · How many · Where · How much · When)",
    location: coverageLocation38("s18"),
    transfer: "verbatim",
    platformAddition: "ورشة إعادة بناء أسئلة Wh الخمسة مع فحص العناصر.",
  },
  {
    num: 19, id: "s19", title: "🔬 19. التصريف الثالث V3 — أساس المستقبل التام",
    elements: "جدول منتظم (5 أفعال) · جدول شاذ (10 أفعال) · ثلاثة أزواج ✅/❌ (written/wrote · gone/went · built)",
    location: coverageLocation38("s19"),
    transfer: "table-rebuilt",
    platformAddition: "ورشة كتابة V3 (15 فعلًا من جدولي المصدر) مع التصحيح الفوري.",
    accuracyNote: "جدولا V1/V2/V3 في النسخ المورّد بلا خطوط؛ أُعيد بناؤهما بنفس الخلايا دون إضافة أفعال.",
  },
  {
    num: 20, id: "s20", title: "⚔️ 20. المقارنة الأولى: Future Simple vs Future Perfect",
    elements: "I will finish the project tomorrow. مقابل By tomorrow evening, I will have finished the project. · مثال read · فرق التركيز",
    location: coverageLocation38("s20"),
    transfer: "verbatim",
    platformAddition: "مختبر المعنى: أي جملة تقدّم الحدث وأي جملة تقدّم الاكتمال.",
  },
  {
    num: 21, id: "s21", title: "🔥 21. المقارنة الثانية: Future Continuous vs Future Perfect",
    elements: "امتحان 9:00–11:00 · At 10:00, I will be taking my exam. · By 12:00, I will have finished my exam. · المقارنة الذهبية",
    location: coverageLocation38("s21"),
    transfer: "verbatim",
    platformAddition: "مختبر: ماذا سيكون جاريًا؟ وماذا سيكون قد اكتمل؟",
  },
  {
    num: 22, id: "s22", title: "🧠 22. المقارنة الكبرى: الأزمنة المستقبلية الثلاثة",
    elements: "الفعل write في Future Simple / Continuous / Perfect · جدول الزمن/الصيغة/التركيز",
    location: coverageLocation38("s22"),
    transfer: "table-rebuilt",
    platformAddition: "مختبر مطابقة كل صيغة بتركيزها.",
    accuracyNote: "جدول المقارنة أُعيد بناؤه بثلاثة أعمدة وثلاثة صفوف كما في المصدر بلا إضافة.",
  },
  {
    num: 23, id: "s23", title: "🧩 23. مختبر الزمن: الحدث نفسه بثلاث زوايا",
    elements: "سارة تعد العشاء 5:00–7:00 · الجمل الثلاث · الزوايا ① وقوع ② استمرار ③ اكتمال · «ستُعِدّ العشاء» بعد تصحيح تحريري موثّق",
    location: coverageLocation38("s23"),
    transfer: "verbatim",
    platformAddition: "مختبر اختيار الزاوية لكل جملة.",
    accuracyNote: "تصحيح تحريري موثّق: المصدر كتب «ستخبز أو تعد العشاء» مقابل cook dinner، و«تخبز» تعني bake وليست cook. صُحّح السطر في نص الدرس إلى «ستُعِدّ العشاء غدًا» للحفاظ على معنى cook dinner، والنص الأصلي مذكور في هذا الهامش وتقرير التنفيذ.",
  },
  {
    num: 24, id: "s24", title: "🔬 24. المقارنة مع Present Perfect وPast Perfect",
    elements: "الفعل finish في الأزمنة التامة الثلاثة · الخريطة الذهبية (الزمن · الصيغة · النقطة المرجعية) · ملاحظة V3 المشتركة",
    location: coverageLocation38("s24"),
    transfer: "table-rebuilt",
    platformAddition: "مختبر تحديد النقطة المرجعية لكل زمن تام.",
    accuracyNote: "جدول الخريطة أُعيد بناؤه بثلاثة أعمدة وثلاثة صفوف كما في المصدر بلا إضافة.",
  },
  {
    num: 25, id: "s25", title: "🚨 25. أخطاء شائعة جدًا",
    elements: "سبعة أزواج ❌/✅ (will has · finish · went · won't has · Will she has · by the time you will · will have be ready) · ملاحظة will be ready",
    location: coverageLocation38("s25"),
    transfer: "verbatim",
    platformAddition: "مختبر تشخيص الخطأ في كل زوج.",
  },
  {
    num: 26, id: "s26", title: "🎭 26. حوار تطبيقي: Planning a Big Event",
    elements: "تسعة أسطر حوار · ترجمتها · خمسة عناصر تحليل (decorated · sent · prepared · will be checking · completed)",
    location: coverageLocation38("s26"),
    transfer: "verbatim",
    platformAddition: "قارئ حوار تفاعلي مع سؤال يفرّق Future Continuous عن Future Perfect داخل الحوار نفسه.",
  },
  {
    num: 27, id: "s27", title: "✍️ 27. التدريب الأول: اختر الصيغة الصحيحة",
    elements: "ستة أسئلة اختيار من متعدد مع حلولها (B have · C written · A will · B have · B saved · C prepared)",
    location: coverageLocation38("s27"),
    transfer: "verbatim",
    platformAddition: "نشاط تفاعلي بستة بنود مع تصحيح فوري لكل بند وكشف حلول المصدر كما وردت.",
  },
  {
    num: 28, id: "s28", title: "🧩 28. التدريب الثاني: أكمل باستخدام Future Perfect",
    elements: "ستة إكمالات (finish · read · build · not/complete · save؟ · prepare) مع حلول المصدر",
    location: coverageLocation38("s28"),
    transfer: "verbatim",
    platformAddition: "ورشة إكمال: كتابة الصيغة ثم عرض مفتاح المصدر بعد المحاولة.",
  },
  {
    num: 29, id: "s29", title: "🔥 29. التدريب الثالث: اختر الزمن المستقبلي المناسب",
    elements: "ثمانية مواقف بين Future Simple / Continuous / Perfect مع الحلول المفصلة · تنبيه الفرق بين ⑥ و⑦",
    location: coverageLocation38("s29"),
    transfer: "verbatim",
    platformAddition: "مختبر اختيار الزمن مع مفتاح المصدر بعد كل محاولة.",
  },
  {
    num: 30, id: "s30", title: "🕵️ 30. Grammar Detective — اكتشف الأخطاء",
    elements: "عشر جمل خاطئة مع عشرة تصحيحات مفصلة (بما فيها He will be ready by 8:00.)",
    location: coverageLocation38("s30"),
    transfer: "verbatim",
    platformAddition: "ورشة اكتشاف الأخطاء: كتابة التصحيح ثم عرض تصحيح المصدر مع سبب الخطأ لكل جملة.",
  },
  {
    num: 31, id: "s31", title: "🧠 31. IQ200 — هل الزمنان صحيحان؟",
    elements: "I will finish … by Friday. / I will have finished … by Friday. · مثال June · القاعدة المتقدمة أن by لا تفرض Future Perfect آليًا",
    location: coverageLocation38("s31"),
    transfer: "verbatim",
    platformAddition: "مختبر حكم: هل الجملتان صحيحتان مع اختلاف التركيز؟",
  },
  {
    num: 32, id: "s32", title: "📖 32. Reading Challenge — The Future City Project",
    elements: "نص Building a Smarter City كاملًا · سبعة أسئلة فهم بالحلول · تحليل خمس صيغ (completed · installed · testing · finished · impress)",
    location: coverageLocation38("s32"),
    transfer: "verbatim",
    platformAddition: "تمييز بصري اختياري لصيغ المستقبل + مساحة إجابة لأسئلة الفهم السبعة وكشف مفتاح المصدر بعد المحاولة.",
  },
  {
    num: 33, id: "s33", title: "🏆 33. الاختبار النهائي — Future Perfect Master Test",
    elements: "25 سؤالًا في خمسة مستويات: اختيار الإجابة (①–⑤) · إكمال الجمل (⑥–⑩) · تصحيح الأخطاء (⑪–⑮) · فهم المعنى (⑯–⑳) · فقرة Next Friday (㉑–㉕)",
    location: coverageLocation38("s33"),
    transfer: "key-missing-in-source",
    platformAddition: "منطقة اختبار مستقلة محايدة قبل الإرسال؛ بعد الإرسال تُحمَّل وحدة التصحيح ديناميكيًا وتظهر النتيجة والشرح لكل سؤال. الأسئلة الـ25 مرقّمة Q1–Q25 وموزعة 5 × 5، وكل سطر مصدري مرتبط بالواجهة.",
    accuracyNote: "المصدر يعرض الأسئلة دون مفتاح إجابة؛ لذلك لا يُعرض أي مفتاح داخل الاختبار، وكُتبت الحلول الـ25 في وحدة مستقلة موسومة بأنها من إعداد المنصة.",
  },
  {
    num: 34, id: "s34", title: "🔐 34. مساحة المعلم — الحلول التفصيلية للاختبار",
    elements: "عنوان مفتاح التصحيح · «حاول حل الاختبار كاملًا قبل كشف الإجابات» · «عرض الحلول التفصيلية»",
    location: coverageLocation38("s34"),
    transfer: "key-missing-in-source",
    platformAddition: "حلول تفصيلية للأسئلة الـ25 (25 بطاقة في منطقة الحلول و25 بطاقة في دليل المعلم): إجابة + قاعدة + سبب + سبب خطأ البدائل + نماذج للأسئلة المفتوحة، وكلها موسومة بأنها من إعداد المنصة/المعلم.",
  },
  {
    num: 35, id: "s35", title: "✍️ 35. مهمة الإنتاج اللغوي — Writing Mission",
    elements: "العنوان My Achievements by the End of Next Year · فقرة 12–15 جملة · الشروط الثمانية ①–⑧ · النموذج الإرشادي (خمس أسطر) · تنبيه عدم النسخ",
    location: coverageLocation38("s35"),
    transfer: "verbatim",
    platformAddition: "ورشة كتابة: عداد جمل تقريبي، وقائمة الشروط الثمانية، وكشف النموذج بعد كتابة الفقرة.",
  },
  {
    num: 36, id: "s36", title: "🧠 36. الملخص الذهبي للدرس 38",
    elements: "الصيغة والنفي والسؤال والإجابة القصيرة وأسئلة المعلومات مع أمثلتها · أهم الاستخدامين · المقارنة الذهبية بين Future Simple وFuture Continuous وFuture Perfect · التعريف الختامي",
    location: coverageLocation38("s36"),
    transfer: "verbatim",
    platformAddition: "مختبر وصل كل استخدام وصيغة بمثاله الأصلي.",
  },
  {
    num: null, id: "roadmap", title: "🗺️ عناوين الدروس العشرة القادمة (39–48)",
    elements: "جدول الدروس 39–48 · سبب التسلسل (can / might / must / should / would rather) · جسر الدرس 39 Future Perfect Continuous مع جملتي By 8:00",
    location: coverageLocation38("roadmap"),
    transfer: "table-rebuilt",
    platformAddition: "خريطة مستقبلية تفاعلية في ختام الدرس: المحطات العشر وسبب ترتيبها، دون تحويلها إلى درس جديد داخل الدرس 38.",
  },
];

export const COVERAGE_SECTION_COUNT_38 = COVERAGE_38.filter((row) => row.num != null).length;
export const COVERAGE_ACCURACY_NOTES_38 = COVERAGE_38.filter((row) => row.accuracyNote);
export const COVERAGE_PLATFORM_ADDITIONS_38 = COVERAGE_38.filter((row) => row.platformAddition);
