/* ============================================================
   Ledger 33 — سجل المصدر للدرس 33 (The Four Present Tenses)
   يحفظ نص الدرس المصدري: كل قسم = وحدات حرفية (units) بالترتيب نفسه.
   تنسيق Markdown فقط (** وفواصل ━━━) أُزيل، وعلم المملكة المتحدة أُزيل من العنوان
   وفق قاعدة المستودع الموثقة — والنص محفوظ حرفيًا عدا ذلك.
   يستعمله: فهرس المعلم الحرفي (TeacherArea33 ← <details>)،
   لوحات «من الدرس» داخل الخطوات، وتدقيق audit-lesson33.
   مواضع معالجة موثقة أيضًا في docs/lesson33-coverage.md:
   - §13 و§20/§21: المصدر يعد بالحلول لكنه لا يسردها ← حلول مشتقة موسومة.
   - §18: «عشرة أخطاء» في العنوان و«أحد عشر موضعًا» في الملاحظة — محفوظ كما ورد.
   ============================================================ */

export type SourceUnit33 = string;

export type SourceSection33 = {
  id: string;
  order: number;
  stat: string;
  roman?: string;
  hash?: string;
  navLabel?: string;
  title: string;
  units: SourceUnit33[];
};

export const SOURCE_SECTIONS_33: SourceSection33[] = [
  {
    id: "cover",
    order: 1,
    stat: "",
    title: "غلاف الدرس الافتتاحي",
    units: [
      "الدرس 33: The Four Present Tenses",
      "المراجعة الشاملة لأزمنة الحاضر الأربعة — Present Tenses Mastery",
      "IQ200",
      "راجعنا منظومة الماضي في الدرس 30، وأتقنّا المضارع التام في الدرس 31 والمضارع التام المستمر في الدرس 32.",
      "اليوم لا زمن جديد — بل مراجعة شاملة تجمع أزمنة الحاضر الأربعة في خريطة واحدة، ثم اختبار يثبّت المهارة.",
    ],
  },
  {
    id: "objectives",
    order: 2,
    stat: "",
    title: "🎯 أهداف الدرس",
    units: [
      "مراجعة أزمنة الحاضر الأربعة كمنظومة واحدة مترابطة.",
      "التمييز بين الأزمنة الأربعة حسب الزمن والمعنى.",
      "بناء جمل صحيحة في الأزمنة الأربعة: إثبات ونفي وسؤال.",
      "تصحيح الأخطاء الشائعة في استخدام الأزمنة.",
      "قراءة نص إنجليزي وفهم اختيار الأزمنة فيه.",
      "كتابة فقرة قصيرة تدمج أكثر من زمن من أزمنة الحاضر.",
      "فهم اختلاف المعنى بين زمنين بالفعل نفسه.",
    ],
  },
  {
    id: "s1",
    order: 3,
    stat: "",
    roman: "①",
    hash: "🧭",
    title: "1. الخريطة الذهبية لأزمنة الحاضر الأربعة",
    units: [
      "Present Simple — المضارع البسيط",
      "I study English every day.",
      "أدرس الإنجليزية كل يوم. ← عادة ثابتة أو حقيقة عامة.",
      "Present Continuous — المضارع المستمر",
      "I am studying English now.",
      "أدرس الإنجليزية الآن. ← نشاط جارٍ في هذه اللحظة.",
      "Present Perfect — المضارع التام",
      "I have completed my homework.",
      "أكملت واجبي. ← إنجاز مرتبط بالحاضر.",
      "Present Perfect Continuous — المضارع التام المستمر",
      "I have been studying for two hours.",
      "أدرس منذ ساعتين. ← نشاط بدأ قبل مدة وما زال ممتدًا حتى الآن.",
      "النموذج الذهني: عادة؟ ← بسيط · جارٍ الآن؟ ← مستمر · نتيجة مرتبطة بالحاضر؟ ← تام · نشاط ممتد؟ ← تام مستمر.",
    ],
  },
  {
    id: "s2",
    order: 4,
    stat: "",
    roman: "②",
    hash: "🧱",
    title: "2. جدول البناء الأساسي",
    units: [
      "الزمن | الصيغة | مثال",
      "Present Simple | Subject + V1 / V-s | I work every day.",
      "Present Continuous | am / is / are + V-ing | I am working now.",
      "Present Perfect | have / has + V3 | I have worked here for years.",
      "Present Perfect Continuous | have / has + been + V-ing | I have been working all morning.",
      "لكل زمن هيكل خاص به — لا تستعِر أجزاء زمن لبناء زمن آخر.",
    ],
  },
  {
    id: "s3",
    order: 5,
    stat: "",
    roman: "③",
    hash: "🔬",
    title: "3. مختبر المعنى — الفعل نفسه بأربع زوايا",
    units: [
      "انظر إلى Nora بالفعل نفسه work في الأزمنة الأربعة:",
      "Nora works in the library every day.",
      "تعمل نورا في المكتبة كل يوم. (عادتها — هذا عملها الدائم.)",
      "Nora is working in the library right now.",
      "نورا تعمل في المكتبة الآن بالضبط. (مشهد جارٍ أمام أعيننا.)",
      "Nora has worked in three libraries.",
      "عملت نورا في ثلاث مكتبات حتى اليوم. (خبرة مكتملة مرتبطة بحياتها الحالية.)",
      "Nora has been working in the library since 8:00.",
      "نورا تعمل في المكتبة منذ الثامنة وما زالت. (نشاط ممتد من نقطة بداية حتى الآن.)",
      "لاحظ: لم نغيّر الفعل ولا المكان — غيّرنا فقط زاوية النظر إلى الحدث.",
    ],
  },
  {
    id: "s4",
    order: 6,
    stat: "",
    roman: "④",
    hash: "🧠",
    title: "4. السؤال الذي يحدد الزمن",
    units: [
      "قبل أن تختار الزمن، اسأل نفسك سؤالًا واحدًا:",
      "هل أتحدث عن عادة أو حقيقة؟ ← Present Simple",
      "هل أتحدث عن نشاط جارٍ الآن؟ ← Present Continuous",
      "هل أتحدث عن إنجاز أو خبرة مرتبطة بالحاضر؟ ← Present Perfect",
      "هل أريد إبراز نشاط ممتد من الماضي إلى الآن؟ ← Present Perfect Continuous",
      "الجملة العربية نفسها قد تقبل أربع ترجمات صحيحة — «أعمل على هذا المشروع»:",
      "أعمل على هذا المشروع كل أسبوع. ← I work on this project every week.",
      "أعمل على هذا المشروع الآن. ← I am working on this project now.",
      "عملت على مشاريع كثيرة مثله. ← I have worked on many projects like it.",
      "أعمل على هذا المشروع منذ شهرين. ← I have been working on this project for two months.",
      "الخلاصة: السياق هو الذي يحدد الزمن، وليس شكل الجملة العربية وحده.",
    ],
  },
  {
    id: "s5",
    order: 7,
    stat: "",
    roman: "⑤",
    hash: "⚙️",
    title: "5. الإثبات والنفي والسؤال",
    units: [
      "Present Simple:",
      "She practices every day. / She doesn't practice every day. / Does she practice every day? — Yes, she does.",
      "تذكر: بعد does / doesn't يعود الفعل إلى V1: practices ← practice.",
      "Present Continuous:",
      "She is practicing now. / She isn't practicing now. / Is she practicing now? — Yes, she is.",
      "تذكر: نقلب am / is / are قبل الفاعل، ويبقى الفعل بصيغة V-ing.",
      "Present Perfect:",
      "She has practiced today. / She hasn't practiced today. / Has she practiced today? — Yes, she has.",
      "تذكر: نقلب have / has قبل الفاعل، ويبقى الفعل بصيغة V3.",
      "Present Perfect Continuous:",
      "She has been practicing since morning. / She hasn't been practicing since morning. / Has she been practicing since morning? — Yes, she has.",
      "تذكر: جواب قصير لكلتا صيغتي التام: Yes, she has. / No, she hasn't.",
      "الإجابات القصيرة: Yes, she does. / Yes, she is. / Yes, she has. / Yes, she has.",
    ],
  },
  {
    id: "s6",
    order: 8,
    stat: "",
    roman: "⑥",
    hash: "🚨",
    title: "6. لا تخلط الأفعال المساعدة",
    units: [
      "❌ Does she practices every day? ← ✅ Does she practice every day?",
      "❌ Is she practice now? ← ✅ Is she practicing now?",
      "❌ Has she been practice since morning? ← ✅ Has she been practicing since morning?",
      "❌ Do she practice every day? ← ✅ Does she practice every day?",
      "قاعدة IQ200:",
      "لا تجمع أجزاء من زمنين مختلفين في جملة واحدة.",
      "كل زمن هيكل مكتمل: قرر الزمن أولًا ثم التزم بأجزائه كلها.",
    ],
  },
  {
    id: "s7",
    order: 9,
    stat: "",
    roman: "⑦",
    hash: "🔑",
    title: "7. الكلمات الدالة على كل زمن",
    units: [
      "الزمن | الكلمات الدالة الشائعة",
      "Present Simple | always, usually, often, sometimes, never, every day",
      "Present Continuous | now, right now, at the moment, Look!, Listen!, these days",
      "Present Perfect | ever, never, already, just, yet, so far",
      "Present Perfect Continuous | since, for, all morning, all day, lately",
      "تحذير: for و since قد تأتيان مع Present Perfect أيضًا:",
      "I have owned this bicycle for five years.",
      "وليس: I have been owning this bicycle for five years.",
      "I have known her for seven years.",
      "وليس: I have been knowing her for seven years.",
      "الخلاصة: الكلمة الدالة تُرشّح زمنًا، والمعنى يحسم الاختيار.",
    ],
  },
  {
    id: "s8",
    order: 10,
    stat: "",
    roman: "⑧",
    hash: "⚔️",
    title: "8. المواجهة الأولى: Present Simple vs Present Continuous",
    units: [
      "I teach English. vs I am teaching English this month.",
      "أدرّس الإنجليزية (مهنتي — حقيقة ثابتة). vs أدرّس الإنجليزية هذا الشهر (فترة مؤقتة).",
      "My brother lives in Damascus. vs My brother is living with his grandparents this summer.",
      "أخي يسكن في دمشق (إقامة دائمة). vs أخي يقيم عند جدّيه هذا الصيف (إقامة مؤقتة).",
      "التحدي: She ___ tea every morning.",
      "A) She is drinking tea every morning.   B) She drinks tea every morning.",
      "الجواب: B — لأن every morning تصف عادة يومية، والمستمر هنا لا يناسب المعنى.",
      "Present Simple: عادة متكررة أو حقيقة مستقرة. · Present Continuous: نشاط جارٍ الآن أو مؤقت في هذه الفترة.",
    ],
  },
  {
    id: "s9",
    order: 11,
    stat: "",
    roman: "⑨",
    hash: "⚔️",
    title: "9. المواجهة الثانية: Present Continuous vs Present Perfect Continuous",
    units: [
      "Ahmed is repairing the car.",
      "أحمد يصلح السيارة الآن. (يجيب عن سؤال: ماذا يفعل الآن؟)",
      "Ahmed has been repairing the car since noon.",
      "أحمد يصلح السيارة منذ الظهر. (يجيب عن سؤال: منذ متى وهو يعمل عليها؟)",
      "الفرق بينهما: المستمر ينظر إلى المشهد الحالي فقط، والتام المستمر ينظر إلى البداية ثم إلى الامتداد حتى الآن.",
      "The children are decorating the hall. vs The children have been decorating the hall all morning.",
      "الأولاد يزيّنون القاعة الآن. vs الأولاد يزيّنون القاعة منذ الصباح وما زالوا.",
      "غيّر السؤال يتغيّر الزمن: ماذا الآن؟ ← مستمر · منذ متى؟ ← تام مستمر.",
    ],
  },
  {
    id: "s10",
    order: 12,
    stat: "",
    roman: "⑩",
    hash: "⚔️",
    title: "10. المواجهة الثالثة: Present Perfect vs Present Perfect Continuous",
    units: [
      "I have solved twelve problems.",
      "حللت اثنتي عشرة مسألة. (التركيز: العدد والنتيجة المكتملة.)",
      "I have been solving problems for two hours.",
      "أحل المسائل منذ ساعتين. (التركيز: النشاط والمدة.)",
      "نقطة متقدمة:",
      "I have lived in Damascus for ten years. ← صحيحة.",
      "I have been living in Damascus for ten years. ← صحيحة أيضًا.",
      "أفعال مثل live و work و teach تقبل الصيغتين — الفرق في زاوية التركيز لا في الصحة.",
      "الخلاصة: عدد أو نتيجة ← تام · نشاط ومدة ← تام مستمر.",
    ],
  },
  {
    id: "s11",
    order: 13,
    stat: "",
    roman: "⑪",
    hash: "🧠",
    title: "11. أفعال الحالة — Stative Verbs",
    units: [
      "أفعال الحالة: know, believe, understand, want, need, own, remember",
      "تصف حالة لا نشاطًا، لذلك لا نستخدمها عادةً في المستمر:",
      "✅ I have owned this bicycle for five years. / ❌ I have been owning this bicycle for five years.",
      "✅ I have known the answer. / ❌ I am knowing the answer.",
      "فعل think حالة خاصة:",
      "I think the plan is good. (أعتقد — رأي = حالة.)",
      "I am thinking about the plan. (أفكّر فيه الآن — عملية تفكير = نشاط.)",
      "القاعدة: المستمر للنشاط الذي يمكن مشاهدته، والبسيط للحالة التي توجد بلا حركة.",
    ],
  },
  {
    id: "s12",
    order: 14,
    stat: "",
    roman: "⑫",
    hash: "🕵️",
    title: "12. Grammar Detective — المستوى الأول",
    units: [
      "صحّح خطأً واحدًا في كل جملة — ثماني قضايا:",
      "① He don't go to school by bus. ← He doesn't go to school by bus.",
      "② They is playing football now. ← They are playing football now.",
      "③ I have see that movie before. ← I have seen that movie before.",
      "④ She has been knowing him for years. ← She has known him for years.",
      "⑤ Look! The dog runs after the ball. ← Look! The dog is running after the ball.",
      "⑥ He has wrote a letter to his friend. ← He has written a letter to his friend.",
      "⑦ It are raining now. ← It is raining now.",
      "⑧ Have you ever been visiting Canada? ← Have you ever visited Canada?",
      "ملاحظة ⑧: أما here فهو سؤال عن التجربة — نستخدم visited لا been visiting.",
    ],
  },
  {
    id: "s13",
    order: 15,
    stat: "",
    roman: "⑬",
    hash: "✍️",
    title: "13. التدريب الأول: أكمل بالزمن المناسب",
    units: [
      "أكمل كل جملة بصيغة الفعل بين القوسين في الزمن الأنسب:",
      "① My mother ___ lunch every day. (cook)",
      "② Listen! Someone ___ at the door. (knock)",
      "③ I ___ my keys! I can't enter the house. (lose)",
      "④ We ___ for the bus for twenty minutes. (wait)",
      "⑤ She ___ three languages. (speak)",
      "⑥ The inspector ___ the building these days. (inspect)",
      "⑦ Our team ___ five matches so far. (win)",
      "⑧ Grandfather ___ in the garden since 7:00. (work)",
      "⑨ The waiters ___ the tables right now. (serve)",
      "⑩ The doctor ___ two patients this morning. (examine)",
      "لا تنتقل إلى الإجابات قبل المحاولة.",
      "إظهار الحلول المفصلة.",
    ],
  },
  {
    id: "s14",
    order: 16,
    stat: "",
    roman: "⑭",
    hash: "✍️",
    title: "14. التدريب الثاني: الفعل نفسه في الأزمنة الأربعة",
    units: [
      "أكمل بصيغة الفعل design في الزمن المطلوب:",
      "① Omar ___ posters every day. ← designs",
      "② Omar ___ a new logo right now. ← is designing",
      "③ Omar ___ five logos so far. ← has designed",
      "④ Omar ___ the same logo for two hours. ← has been designing",
      "لماذا has designed في الجملة ③؟ لأننا نركّز على العدد المكتمل (five logos) ← التام.",
      "لماذا has been designing في الجملة ④؟ لأننا نركّز على النشاط ومدته (for two hours) ← التام المستمر.",
    ],
  },
  {
    id: "s15",
    order: 17,
    stat: "",
    roman: "⑮",
    hash: "🔥",
    title: "15. مستوى IQ200: متى تكون إجابتان صحيحتين؟",
    units: [
      "أحيانًا تعطي صيغتان جملة صحيحة، والفرق في زاوية التركيز فقط:",
      "I have taught English for five years. = I have been teaching English for five years.",
      "كلتاهما صحيحة: الأولى تلخّص التجربة، والثانية تُبرز النشاط الممتد.",
      "She has worked at the company since 2021. = She has been working at the company since 2021.",
      "الدرس المهم: لا تختَر المضارع التام المستمر تلقائيًا عند رؤية for أو since.",
      "Both may be correct — اسأل: أأريد تلخيص النتيجة أم إبراز الامتداد؟",
      "لكن: I have visited Damascus twice منفردة — العدد المكتمل لا يملك زاوية امتداد.",
    ],
  },
  {
    id: "s16",
    order: 18,
    stat: "",
    roman: "⑯",
    hash: "📖",
    title: "16. Reading Challenge — The Young Inventor",
    units: [
      "القصة: The Young Inventor (المخترع الشاب).",
      "اقرأ قصة Ryan ولاحظ زمن كل فعل ملوّن — كل فعل اختير لسبب.",
      "Ryan loves science and spends his afternoons in a small workshop behind his house.",
      "These days, he is developing a robot that waters plants.",
      "He has completed the main body of the robot.",
      "He has tested two sensors so far, and he has been working on the control system for five weeks.",
      "He has been improving the watering program since last Tuesday.",
      "Right now, he is testing the system in the garden, while his friends are watching him with excitement.",
      "They have never seen such a creative idea before.",
      "Ryan believes that patience builds success.",
    ],
  },
  {
    id: "s17",
    order: 19,
    stat: "",
    roman: "⑰",
    hash: "📊",
    title: "17. تحليل القصة",
    units: [
      "العبارة | الزمن | السبب",
      "loves | Present Simple | حقيقة ثابتة عن Ryan",
      "spends | Present Simple | عادة يومية — spends his afternoons",
      "is developing | Present Continuous | These days — نشاط جارٍ في هذه الفترة",
      "has completed | Present Perfect | إنجاز مكتمل — جسم الروبوت أصبح جاهزًا",
      "has tested | Present Perfect | so far — حصيلة حتى الآن",
      "has been working | Present Perfect Continuous | for five weeks — نشاط ممتد",
      "has been improving | Present Perfect Continuous | since last Tuesday — امتداد من نقطة بداية",
      "is testing | Present Continuous | Right now — مشهد هذه اللحظة",
      "are watching | Present Continuous | مشهد موازٍ جارٍ الآن",
      "have never seen | Present Perfect | never — خبرة حتى اليوم",
      "believes | Present Simple | قناعة ثابتة — فعل حالة",
      "لاحظ: بعض الجمل تحمل أكثر من زمن في السطر نفسه — السياق يقرر لكل فعل.",
    ],
  },
  {
    id: "s18",
    order: 20,
    stat: "",
    roman: "⑱",
    hash: "🕵️",
    title: "18. Grammar Detective — المستوى الثاني (عشرة أخطاء)",
    units: [
      "فقرة Emma التالية فيها أخطاء مقصودة. اكتشفها وصحّحها:",
      "Emma usually study English in the evening.",
      "She is prefer short lessons, and she has already complete three units.",
      "These days, she prepares for an important exam, and her teacher is knowing her effort.",
      "Emma has teaching English to her friends for 2023.",
      "Her friends are agree that she is improving, and everyone believe her.",
      "They have saw her progress.",
      "She don't stop until the lesson ends.",
      "الفقرة بعد التصحيح:",
      "Emma usually studies English in the evening. She prefers short lessons, and she has already completed three units. These days, she is preparing for an important exam, and her teacher knows her effort. Emma has been teaching English to her friends since 2023. Her friends agree that she is improving, and everyone believes her. They have seen her progress. She doesn't stop until the lesson ends.",
      "ملاحظة العدّ: العنوان يقول «عشرة أخطاء» لكن العدّ الدقيق يُظهر أحد عشر موضعًا — خطأ for/since موضعٌ مستقل قائم بذاته.",
    ],
  },
  {
    id: "s19",
    order: 21,
    stat: "",
    roman: "⑲",
    hash: "🔥",
    title: "19. تحدي اختلاف المعنى — مستوى IQ200",
    units: [
      "أربع جمل عن Rana — كلها صحيحة، لكن أيّ موقف تصفه كل واحدة؟",
      "① Rana works as an engineer. (مهنتها — حقيقة ثابتة ← Present Simple.)",
      "② Rana is working in a restaurant this summer. (عمل مؤقت في هذه الفترة ← Present Continuous.)",
      "③ Rana has designed five buildings. (إنجاز مكتمل بعدد ← Present Perfect.)",
      "④ Rana has been designing a new building for two months. (نشاط ممتد وما زال ← Present Perfect Continuous.)",
      "نفس الشخص ونفس الجذع اللغوي — أربع جمل صحيحة، والزمن يقرره ما تريد أن تقوله.",
    ],
  },
  {
    id: "s20",
    order: 22,
    stat: "",
    roman: "⑳",
    hash: "🏆",
    title: "20. الاختبار النهائي — Present Tenses Master Test",
    units: [
      "الاختبار النهائي لهذا الدرس: Present Tenses Master Test — 25 سؤالًا في خمسة مستويات.",
      "المستوى الأول: اختيار الزمن (①–⑤) · المستوى الثاني: لغز الوقت (⑥–⑩) · المستوى الثالث: صيد الأخطاء (⑪–⑮) · المستوى الرابع: اختيار المعنى (⑯–⑳) · المستوى الخامس: التحدي النهائي — فقرة Mia (㉑–㉕).",
      "لا تستخدم الحلول قبل إكمال جميع الأسئلة — أجب في منطقة الاختبار ثم أرسل دفعة واحدة.",
    ],
  },
  {
    id: "s21",
    order: 23,
    stat: "",
    roman: "㉑",
    hash: "🔐",
    title: "21. مساحة الحلول التفصيلية",
    units: [
      "🔐 مساحة الحلول التفصيلية — مفتاح تصحيح الاختبار النهائي",
      "حاول حل الاختبار كاملًا قبل كشف الإجابات",
      "كشف الحلول التفصيلية",
    ],
  },
  {
    id: "s22",
    order: 24,
    stat: "",
    roman: "㉒",
    hash: "✍️",
    title: "22. مهمة الكتابة — My Learning Journey",
    units: [
      "اكتب فقرة بعنوان My Learning Journey عن رحلتك مع تعلّم الإنجليزية.",
      "المتطلبات:",
      "① جملتان في Present Simple.",
      "② جملتان في Present Continuous.",
      "③ ثلاث جمل في Present Perfect.",
      "④ ثلاث جمل في Present Perfect Continuous.",
      "⑤ استخدم for و since.",
      "⑥ استخدم already و yet و recently.",
      "مثال قصير: I study English every evening…",
      "لا تنسخ المثال — اكتب رحلتك أنت.",
    ],
  },
  {
    id: "s23",
    order: 25,
    stat: "",
    roman: "㉓",
    hash: "⭐",
    title: "23. الملخص الذهبي",
    units: [
      "I build models every evening. (أصنع المجسّمات كل مساء ← عادة ← بسيط.)",
      "I am building a model right now. (أصنع مجسّمًا الآن ← جارٍ ← مستمر.)",
      "I have built ten models this year. (صنعت عشرة مجسّمات ← إنجاز ← تام.)",
      "I have been building this model for a week. (أصنع هذا المجسّم منذ أسبوع ← امتداد ← تام مستمر.)",
      "القاعدة الذهبية لهذا الدرس — اسأل قبل الاختيار:",
      "عادة؟ جارٍ الآن؟ نتيجة مرتبطة بالحاضر؟ نشاط ممتد؟",
      "ماذا يريد المتكلم أن يُبرز: العادة أم النشاط الجاري أم النتيجة أم النشاط الممتد؟",
    ],
  },
  {
    id: "s24",
    order: 26,
    stat: "",
    roman: "㉔",
    hash: "🗺️",
    title: "24. خريطة تقدمنا في الكورس",
    units: [
      "منظومة الحاضر — مكتملة: Present Simple · Present Continuous · Present Perfect · Present Perfect Continuous.",
      "منظومة الماضي — مكتملة: Past Simple · Past Continuous · Past Perfect · Past Perfect Continuous.",
      "ثمانية أزمنة أصبحت تحت يدك كاملة.",
      "الدرس القادم 34: Future Simple WILL.",
      "ما سنتعلمه: القرارات اللحظية والتنبؤات والوعود والعروض، والفرق بين will و be going to.",
      "خاتمة: من الحاضر بأزمنته الأربعة إلى المستقبل — الرحلة تكمل.",
    ],
  },
];

/* ---------- تثبيت حقل العرض (stat) من عدد الوحدات ---------- */
for (const c of SOURCE_SECTIONS_33) {
  if (!c.stat) c.stat = `${c.units.length} وحدة`;
}

/* ---------- مساعدات ---------- */

export type SourceOrder33 = (typeof SOURCE_SECTIONS_33)[number]["id"];

/** عدد الأقسام المرقّمة (①…㉔) وعدد أقسام السجل الكلية */
export const SOURCE_NUMBERED_COUNT_33 = SOURCE_SECTIONS_33.filter((c) => c.roman).length;
export const SOURCE_LEDGER_COUNT_33 = SOURCE_SECTIONS_33.length;

/** نص السجل كاملًا كسلسلة واحدة — لتدقيق الوجود النصي */
export const LEDGER_TEXT_33 = SOURCE_SECTIONS_33.map((c) => c.title + "\n" + c.units.join("\n")).join("\n");

export function getSourceSection33(id: SourceOrder33) {
  const sec = SOURCE_SECTIONS_33.find((c) => c.id === id);
  if (!sec) throw new Error(`Source section not found: ${id}`);
  return sec;
}

/* ---------- التحقق الثابت (في وقت البناء) ---------- */
export const __VERIFY_LEDGER_33 = (() => {
  const ids = new Set<string>();
  SOURCE_SECTIONS_33.forEach((c, i) => {
    if (ids.has(c.id)) throw new Error(`duplicate ledger33 id: ${c.id}`);
    ids.add(c.id);
    if (c.order !== i + 1) throw new Error(`ledger33 order mismatch at ${c.id}`);
    if (!c.units.length) throw new Error(`empty ledger33 section: ${c.id}`);
  });
  if (SOURCE_NUMBERED_COUNT_33 !== 24) throw new Error(`expected 24 numbered sections, got ${SOURCE_NUMBERED_COUNT_33}`);
  return true;
})();

/* هذه العلامات مخصّصة لفحوص SSR في audit-lesson33 (لا تظهر نصًا في واجهة الطالب) */
export const SSR_MARKS_33 = {
  sections: SOURCE_SECTIONS_33.map((c) => ({
    id: c.id,
    title: c.title,
    units: c.units.length,
  })),
  totalUnits: SOURCE_SECTIONS_33.reduce((n, c) => n + c.units.length, 0),
};
