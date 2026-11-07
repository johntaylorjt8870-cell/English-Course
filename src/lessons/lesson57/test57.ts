// ============================================================
// الدرس 57 — الاختبار النهائي التفاعلي: 15 سؤالًا
//
// المكوّن المشترك: src/shared/finalTest.tsx (لا نظام اختبار جديد).
//   • لا كشف لأي صحة أثناء الحل.
//   • التصحيح والنتيجة والشرح بعد التسليم فقط.
//   • إعادة الاختبار تمسح كل شيء (الحالة كلها في المكوّن الأب).
//
// اختيرت الأسئلة لتغطية أهم مهارات الدرس (التمييز · be · V3 · التحويل ·
// النفي · السؤال · by · اللازم/المتعدي · الأخطاء).
// أسئلة التقييم الأصلي الخمسة والعشرون معروضة كلها بنصوصها في التمرين العاشر
// («تدريب إضافي»)، فتصحيح الدرس على مقياس المصدر يبقى ممكنًا، ولا يُفقد سؤال.
// ============================================================

import type { FinalTestQuestion } from "../../shared/finalTest";

export const TEST_57: FinalTestQuestion[] = [
  // ① التمييز بين المعلوم والمجهول — صح/خطأ
  {
    type: "tf",
    ar: "هل الجملة التالية مبنية للمجهول (Passive)؟",
    en: "The lesson is explained by the teacher.",
    answer: true,
    why: "التركيب Object + be + V3 ظاهر: الفاعل الجديد The lesson، ثم is، ثم explained (V3)، ثم by the teacher.",
    concept: "التمييز بين Active وPassive عبر التركيب",
    trap: "الحكم بأن الجملة Active لمجرد أن by the teacher مذكورة — ذكر الفاعل لا يجعلها معلومة.",
  },
  // ② اختيار be حسب الفاعل الجديد
  {
    type: "single",
    ar: "اختر فعل be الصحيح:",
    en: "These products ______ sold online.",
    options: ["is", "are", "am", "be"],
    answer: 1,
    why: "الفاعل الجديد These products جمع، لذلك are. لاحظ أننا لا ننظر إلى الفاعل الأصلي المحذوف.",
    concept: "اختيار am / is / are حسب الفاعل الجديد",
    trap: "اختيار is لأن كلمة products تُرى أحيانًا كاسم غير معدود.",
  },
  // ③ V3 لا V2
  {
    type: "single",
    ar: "أكمل بالتصريف الصحيح للفعل:",
    en: "The letter is ______ by Sara. (write)",
    options: ["write", "wrote", "written", "writes"],
    answer: 2,
    why: "بعد is نستخدم V3. تصريف write هو write ← wrote ← written، فالصحيح written.",
    concept: "استخدام V3 بعد be",
    trap: "اختيار wrote لأن الطالب يتذكّر أن الماضي هو wrote، مع أن المطلوب هنا التصريف الثالث.",
  },
  // ④ التحويل الكامل من Active إلى Passive
  {
    type: "typed",
    ar: "حوّل الجملة إلى Passive Voice. اكتب الجملة كاملة بعد by the teacher:",
    before: "The teacher explains the lesson.",
    after: "",
    accept: ["The lesson is explained by the teacher.", "The lesson is explained by the teacher"],
    why: "المفعول به the lesson انتقل إلى البداية، وexplains في المضارع البسيط ⇒ is + V3 (explained)، ثم by the teacher.",
    concept: "خطوات التحويل الخمس إلى Passive",
    trap: "الاحتفاظ بالفاعل في البداية (The teacher is explained…) — المفعول به هو ما يجب أن يتصدّر.",
  },
  // ⑤ by + ضمير مفعول به
  {
    type: "single",
    ar: "أكمل بشكل صحيح:",
    en: "The room is cleaned by ______.",
    options: ["she", "her", "hers", "herself"],
    answer: 1,
    why: "بعد by نستخدم ضمير المفعول به: her. الشكل she ضمير فاعل ولا يصح بعد by.",
    concept: "تحوّل الضمائر بعد by",
    trap: "اختيار she لأن العربية تذكر ضمير الفاعل بعد «بواسطة».",
  },
  // ⑥ اكتشاف الخطأ
  {
    type: "error",
    ar: "اختر المقطع الذي يحتوي الخطأ في هذه الجملة:",
    segments: ["The room", "cleaned", "every day."],
    answer: 1,
    why: "ينقص فعل be. الصحيح: The room is cleaned every day. لا يوجد مبني للمجهول بدون be + V3.",
    concept: "نسيان فعل be",
    trap: "اعتبار cleaned وحدها كافية لأنها V3.",
  },
  // ⑦ اختيار متعدد — جمل Passive صحيحة
  {
    type: "multi",
    ar: "اختر كل الجمل الصحيحة نحويًا:",
    options: [
      "The books are sold online.",
      "English is spoke in many countries.",
      "The windows are opened every morning.",
      "The food is prepared by the chef.",
      "The children is taught here.",
    ],
    answers: [0, 2, 3],
    why: "الجمل الثلاث الصحيحة فيها be مناسب للفاعل الجديد ثم V3 ثم by عند الحاجة. الخاطئتان: is spoke (يجب spoken)، وThe children is (يجب are).",
    concept: "تطابق be مع الفاعل + V3 بعد be",
    trap: "عدّ «English is spoke» صحيحة لأن is تناسب English.",
  },
  // ⑧ الأفعال اللازمة
  {
    type: "tf",
    ar: "كل فعل يمكن تحويله إلى Passive بالطريقة المعتادة.",
    answer: false,
    why: "التحويل يحتاج مفعولًا به مباشرًا يمكن نقله. الأفعال اللازمة مثل sleep وarrive وhappen لا تُحوّل عادةً: The baby sleeps ✓ / The baby is slept ✗.",
    concept: "الأفعال المتعدية واللازمة",
    trap: "تعميم قاعدة التحويل على كل الأفعال.",
  },
  // ⑨ النفي في Present Simple Passive
  {
    type: "typed",
    ar: "انفِ الجملة التالية (استخدم isn't أو is not):",
    before: "The door is locked.",
    after: "",
    accept: ["The door isn't locked.", "The door is not locked."],
    why: "النفي يقع بعد be وقبل V3: is + not + locked. موضع not قبل is خطأ.",
    concept: "النفي: am / is / are + not + V3",
    trap: "كتابة The door not is locked — وهو ترتيب عربي مقلّد حرفيًا.",
  },
  // ⑩ السؤال — ترتيب
  {
    type: "order",
    ar: "رتّب العناصر لتكوين سؤال Passive صحيح:",
    items: ["Is", "English", "taught", "at this school?"],
    why: "في السؤال ينتقل be إلى أول الجملة: Is + Subject + V3؟ ثم بقية الجملة.",
    concept: "تكوين السؤال: Am / Is / Are + Subject + V3؟",
    trap: "بدء السؤال بـ English (ترتيب الجملة الخبرية).",
  },
  // ⑪ التوصيل — be مع الفاعل
  {
    type: "match",
    ar: "صِل كل فاعل جديد بفعل be المناسب له:",
    pairs: [
      { left: "I", right: "am" },
      { left: "The car", right: "is" },
      { left: "The students", right: "are" },
      { left: "The homework", right: "is" },
    ],
    why: "I تأخذ am، والمفرد وغير المعدود يأخذان is، والجمع يأخذ are. القرار دائمًا حسب الفاعل الجديد في أول الجملة.",
    concept: "اتفاق be مع الفاعل الجديد (مفرد/جمع/غير معدود)",
    trap: "اعتبار homework جمعًا لأنه يشير إلى واجبات كثيرة.",
  },
  // ⑫ متى نحذف by
  {
    type: "single",
    ar: "في أي حالة يكون حذف by + الفاعل الأصلي هو الخيار الأنسب؟",
    en: "The roads are cleaned every morning.",
    options: [
      "عندما لا يكون الفاعل معروفًا أو غير مهم للرسالة.",
      "عندما يكون الفاعل جمعًا.",
      "عندما يكون الفعل في المضارع البسيط.",
      "لا يجوز حذف by أبدًا.",
    ],
    answer: 0,
    why: "by اختيارية. نحذفها عندما لا نعرف الفاعل أو لا يكون مهمًا أو يكون واضحًا من السياق، وتبقى عندما تكون هويته مهمة (مثل: painted by da Vinci).",
    concept: "by + Agent اختياري",
    trap: "الاعتقاد أن by إلزامية في كل جملة Passive.",
  },
  // ⑬ اكتشاف الخطأ — V2 بدل V3
  {
    type: "error",
    ar: "اختر المقطع الذي يحتوي الخطأ:",
    segments: ["The letter", "is", "wrote", "by Sara."],
    answer: 2,
    why: "بعد is نستخدم V3 لا V2. الصحيح: The letter is written by Sara.",
    concept: "V2 مقابل V3 بعد be",
    trap: "تذكّر wrote من درس الماضي البسيط واستخدامها هنا.",
  },
  // ⑭ التحويل العكسي + حذف الفاعل
  {
    type: "typed",
    ar: "حوّل إلى Passive (الفاعل الأصلي People غير مهم فاحذفه):",
    before: "People speak English in many countries.",
    after: "",
    accept: ["English is spoken in many countries.", "English is spoken in many countries"],
    why: "المفعول به English انتقل إلى البداية، وهو مفرد ⇒ is، وspeak ⇒ spoken. حذف by people طبيعي هنا لأن الفاعل غير مهم.",
    concept: "التحويل مع حذف الفاعل غير المهم",
    trap: "استخدام are مع English، أو إضافة by people حين لا تحتاجها.",
  },
  // ⑮ اختيار الهدف البلاغي — Active أم Passive
  {
    type: "single",
    ar: "أي جملة تركّز على الطريق نفسه (النتيجة) بدل العمال الذين أصلحوه؟",
    options: [
      "The workers repaired the road last week.",
      "The road was repaired last week.",
      "The workers are repairing the road.",
      "The road repairs the workers.",
    ],
    answer: 1,
    why: "الجملة الثانية Passive: المفعول به The road تصدّر الجملة، فصار التركيز على النتيجة لا على العمال. الاختيار بين الصيغتين قرار تركيز وسياق، وليس صوابًا وخطأً.",
    concept: "الفرق في التركيز بين Active وPassive",
    trap: "افتراض أن Passive أفضل دائمًا؛ الأفضل هو ما يناسب التركيز المطلوب.",
  },
];
