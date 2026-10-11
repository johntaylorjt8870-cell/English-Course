// ============================================================
// teacherData34 — بيانات منطقة المعلم للدرس 34
// كلمة مرور المعلم محفوظة كما هي في الكورس كله: somer173.
// - مفتاح الاختبار (㉟) غير منصوص في المصدر نصًا ⇒ مشتق وفق قواعد
//   الدرس نفسه وموسوم بذلك صراحة.
// - المستوى الخامس (㉑–㉥) كتابة حرّة ⇒ إجابات ممكنة + تقويم بشري.
// - الأخطاء المتعمدة منسوخة نصًا من سجل المصدر (ledger34):
//   4 من §④ + 4 من §⑯ + 10 من §㉜ + 5 من §㉟ = 23 موضعًا منقولة حرفيًا،
//   و6 من §㉘ مبنية على خيارات المصدر وإجاباته (موسومة derived) = 29 موضعًا.
// ============================================================

export const TEACHER_PASSWORD_34 = "somer173";

export const TEACHER_34_OVERVIEW = {
  title: "نظرة عامة للمعلم",
  objectives: [
    "فهم أن المستقبل بعد لحظة الكلام، وأن الإنجليزية تستخدم أكثر من صيغة للتعبير عنه (المصدر: ①).",
    "إتقان البناء: Subject + will + V1، وصيغتي النفي (won't / will not) والسؤال (Will + Subject + V1?).",
    "تمييز وظائف will الست: قرار لحظي، وعد، توقع، عرض مساعدة، استعداد، ورفض أو عدم استعداد.",
    "استخدام الاختصارات (I'll, you'll, he'll…) والإجابات القصيرة (Yes, I will / No, she won't).",
    "التحذير من خطأين شائعين: will مع الماضي، وإلزام will مع tomorrow.",
    "المقارنة الأولية مع be going إلى (تمهيد للدرس 35) ومقارنة الأزمنة الستة في جدول واحد.",
  ],
  prerequisites: [
    "الدرس 30: مراجعة منظومة الماضي (Past / Past Continuous / Past Perfect / Past Perfect Continuous).",
    "الدروس 31–33: منظومة الحاضر الأربعة — أساس جدول المقارنة في §㉝.",
    "معرفة الشكل الأساسي للفعل V1 والتصريف الثالث V3 لأفعال شائعة.",
  ],
  core: [
    "القاعدة الذهبية الأولى: بعد will يأتي V1 دائمًا — لا s ولا ing ولا to ولا تصريف ماضٍ.",
    "ست وظائف لـ will (⑤) تُدرَّس كل واحدة باستقلال، مع تحذير §㉒ من أن الكلمة الدالة لا تفرض الصيغة.",
    "بناء النفي والسؤال والإجابات القصيرة، مع قاعدة «لا do/does مع will» (⑯).",
    "المهارات: تدريب تأسيسي (㉘) + تحويلات (㉙) + محقق القواعد (㉚) + IQ200 (㉛) + قراءة Daniel (㉜).",
    "الاختبار النهائي Future Simple Master Test (25 سؤالًا) ثم مهمة كتابة Final Boss (㊱).",
  ],
};

export const TEACHER_34_TIMING = [
  "الغلاف والأهداف والخط الزمني (cover, objectives): 4 دقائق.",
  "البناء والضمائر والقاعدة الذهبية (s1–s4): 12 دقيقة.",
  "وظائف will الست (s5–s10): 14 دقيقة.",
  "عرض المساعدة والاستعداد والرفض (s11–s13): 8 دقائق.",
  "الاختصارات والنفي والسؤال والإجابات القصيرة (s14–s18): 12 دقيقة.",
  "أسئلة Wh و WHO الفاعل والكلمات الزمنية (s19–s22): 9 دقائق.",
  "will vs be going to والتحذير من الماضي و will be (s23–s26): 10 دقائق.",
  "حوار المشروع والتمارين والمحقق و IQ200 (s27–s31): 16 دقيقة.",
  "القراءة ومقارنة الأزمنة والاختبار النهائي (s32–s34): 15 دقيقة.",
  "مهمة الكتابة والملخص الذهبي وخريطة التقدم (s36–s38): 8 دقائق.",
  "المجموع التقريبي: 100–108 دقائق (تقسيم مقترح على ثلاث حصص).",
];

export type TeacherNote34 = { head: string; lines: string[] };

export const TEACHER_34_NOTES: TeacherNote34[] = [
  {
    head: "ابدأ بالمهمة لا بالقاعدة",
    lines: [
      "المصدر يفتح بسؤال: ما المقصود بالمستقبل؟ اعرض الخط الزمني (Past / Now / Future) قبل أي تصريف.",
      "ثم اطرح الوظائف الأربع في الغلاف كخريطة، وقل للطالب: سنعود لكل وظيفة وحدها.",
    ],
  },
  {
    head: "القاعدة الذهبية هي عمود الدرس",
    lines: [
      "ردّد مع الطالب: بعد will يأتي V1 دائمًا — لا s، لا ing، لا to، لا ماضٍ.",
      "استخدم الجمل الخاطئة في §④ كتدريب شفهي سريع قبل الانتقال إلى s16.",
    ],
  },
  {
    head: "فرّق بين «متى» و«لماذا»",
    lines: [
      "§㉒ تحذير صريح: وجود tomorrow لا يعني أن will إلزامي دائمًا.",
      "الكلمة الزمنية تجيب عن «متى»، والصيغة تجيب عن «لماذا» (قرار لحظي؟ وعد؟ توقع؟).",
    ],
  },
  {
    head: "لا تُدرِّس shall إلا تعريفًا",
    lines: [
      "§⑫ تكتفي بالتعريف على Shall I + V1…؟ كصيغة لعرض القيام بشيء (إنجليزية بريطانية/أكثر رسمية).",
      "لا تدخل في تصريف shall كاملة — المطلوب أن يتعرف عليها الطالب عند رؤيتها في حوار.",
    ],
  },
  {
    head: "be going to تمهيد لا مقارنة كاملة",
    lines: [
      "§㉓ يقدّم المقارنة تمهيدًا فقط، وينص على أن الفروق «تعليمية شائعة وليست حدودًا مطلقة».",
      "احفظ المقارنة الموسعة للدرس 35 حتى لا يُثبَّت فهم ناقص.",
    ],
  },
  {
    head: "سياق الفشل/الرفض في won't",
    lines: [
      "§⑬ نقطة متقدمة: won't قد تحمل معنى عدم الاستعداد أو عدم الاستجابة (The computer won't start).",
      "استخدم مثال المصدر نفسه للتوضيح — الآلة «ترفض» أن تعمل رغم المحاولة.",
    ],
  },
];

export type TeacherSolution34 = { head: string; lines: string[] };

export const TEACHER_34_SOLUTIONS: TeacherSolution34[] = [
  {
    head: "㉘ تمرين تأسيسي — اختيار الصيغة (6 أسئلة)",
    lines: [
      "① B — travel",
      "② A — will",
      "③ B — be",
      "④ A — won't",
      "⑤ B — Will",
      "⑥ C — try",
      "التفسير المشترك: بعد will أو won't نستخدم V1 دائمًا.",
    ],
  },
  {
    head: "㉙ تمرين التحويلات — النفي ثم السؤال (5 جمل)",
    lines: [
      "① He won't buy a new backpack. / Will he buy a new backpack?",
      "② They won't visit the museum. / Will they visit the museum?",
      "③ We won't finish the assignment. / Will we finish the assignment?",
      "④ Sara won't be ready. / Will Sara be ready?",
      "⑤ The machine won't work. / Will the machine work?",
      "لاحظ في الجملة الرابعة أننا استخدمنا be ولم نستخدم is.",
    ],
  },
  {
    head: "㉚ Grammar Detective — عشر قضايا",
    lines: [
      "① He will go to the market.",
      "② She won't join the club.",
      "③ Will they arrive tomorrow?",
      "④ I will be happy.",
      "⑤ Will he call us?",
      "⑥ They will not play football.",
      "⑦ She will help her sister.",
      "⑧ I will study harder.",
      "⑨ Won't we be late? (المطلوب تحويلها إلى سؤال منفي.)",
      "⑩ He will buy the tickets.",
    ],
  },
  {
    head: "㉛ IQ200 — أربعة مواقف",
    lines: [
      "① You: Don't worry. I ______. ← I'll help you pick them up. (قرار لحظي وعرض مساعدة.)",
      "② I promise I ______. ← I promise I won't forget your book. (وعد منفي.)",
      "③ I think AI ______. ← I think AI will become more important in education. (إجابة ممكنة — توقع أو اعتقاد.)",
      "④ I ______. ← I'll explain them to you. (إجابة ممكنة — عرض مساعدة.)",
    ],
  },
  {
    head: "㉜ Reading Challenge — A Decision That Changed Everything",
    lines: [
      "① He is thirteen years old.",
      "② A technology competition.",
      "③ Next month.",
      "④ He decides to participate.",
      "⑤ He will build a small automatic lighting system.",
      "⑥ The teacher offers to help him with the difficult parts.",
      "⑦ He promises he won't give up.",
    ],
  },
  {
    head: "㉜ التحليل النحوي لست عبارات فعلية في القصة",
    lines: [
      "I'll participate! ← قرار اتخذه دانيال في لحظة الحديث.",
      "The competition will take place next month. ← إخبار عن حدث مستقبلي.",
      "Will you prepare a working model? ← سؤال عن الاستعداد للقيام بمهمة مستقبلية.",
      "I believe it will. ← توقع.",
      "I'll help you. ← عرض مساعدة.",
      "I won't give up. ← وعد.",
    ],
  },
  {
    head: "㉝ مقارنة الأزمنة — الفعل solve",
    lines: [
      "Past Simple: I solved the problem.",
      "Present Simple: I solve problems every day.",
      "Present Continuous: I am solving a problem now.",
      "Present Perfect: I have solved three problems.",
      "Present Perfect Continuous: I have been solving problems for an hour.",
      "Future Simple: I will solve the problem tomorrow.",
    ],
  },
  {
    head: "㉞ الاختبار النهائي — المستوىان الأول والثاني (1–10)",
    lines: [
      "① B — read",
      "② A — won't",
      "③ B — Will",
      "④ C — be",
      "⑤ A — will call",
      "⑥ will be",
      "⑦ 'll help / will help",
      "⑧ won't tell / will not tell",
      "⑨ Will they arrive early?",
      "⑩ won't make / will not make",
    ],
  },
  {
    head: "㉞ الاختبار النهائي — المستوى الثالث (11–15) حدد الاستخدام",
    lines: [
      "⑪ عرض مساعدة.",
      "⑫ وعد.",
      "⑬ توقع.",
      "⑭ رفض أو عدم استعداد.",
      "⑮ قرار لحظي.",
    ],
  },
  {
    head: "㉞ الاختبار النهائي — المستوى الرابع (16–20) صحح الأخطاء",
    lines: [
      "⑯ He will study harder.",
      "⑰ Will she come tomorrow?",
      "⑱ I won't forget.",
      "⑲ They will be successful.",
      "⑳ Will your father help us?",
    ],
  },
  {
    head: "㉞ الاختبار النهائي — المستوى الخامس (21–25) IQ200: إجابات ممكنة",
    lines: [
      "㉑ I'll get you some water. / I'll bring you some water.",
      "㉒ I promise I won't be late again. / I won't be late again.",
      "㉓ I think technology will change the way we learn.",
      "㉔ Will you take part in the competition? / Will you join the competition?",
      "㉕ When will the trip start? / When will the journey begin?",
      "ملاحظة تقويم: هذا المستوى كتابة حرّة — اقبل أي صيغة صحيحة وظيفيًا، وقيّم الوظيفة لا التشابه اللفظي.",
    ],
  },
  {
    head: "㉘/㉙/㉚/㉛ ملاحظة توثيق",
    lines: [
      "حلول التمرينين والمحقق ومواقف IQ200 منقولة نصًا من أقسام المصدر المعنية.",
      "مفتاح الاختبار النهائي مشتق وفق قواعد الدرس لأن المصدر يعد بـ«عرض الحلول التفصيلية» دون سردها.",
    ],
  },
];

export type RubricRow34 = { level: string; desc: string };
export type TeacherRubric34 = { head: string; rows: RubricRow34[] };

export const TEACHER_34_RUBRICS: TeacherRubric34[] = [
  {
    head: "تقييم مهمة Final Boss (㊱) — 10 إلى 12 جملة",
    rows: [
      { level: "ممتاز", desc: "يستخدم will بصيغتها الثلاث (مثبت/منفي/سؤال) في مواضع وظيفية سليمة، ولا يخلط V1 مع to أو ing، ولا يحتاج تصحيحًا نحويًا." },
      { level: "جيد", desc: "يستخدم will استخدامًا صحيحًا وظيفيًا مع خطأ واحد أو خطأين في الصيغة (مثل نسيان الاختسار لا يؤثر على المعنى)." },
      { level: "يحتاج دعمًا", desc: "يخلط بين will وبين do/does أو يستخدم V2/V3 بعد will، أو يكتب جملًا أقل من العدد المطلوب." },
    ],
  },
  {
    head: "تقييم مستوى IQ200 (㉑–㉥)",
    rows: [
      { level: "ممتاز", desc: "الجملة تحمل الوظيفة الصحيحة للموقف (قرار لحظي/وعد/توقع/سؤال) وبصيغة نحوية سليمة." },
      { level: "جيد", desc: "الصيغة سليمة لكن الوظيفة قريبة من المطلوب دون مطابقته بدقة." },
      { level: "يحتاج دعمًا", desc: "خطأ في البناء (will + to / will + ing / will + ماضٍ) أو في نوع السؤال." },
    ],
  },
];

export const TEACHER_34_MISTAKES: TeacherNote34[] = [
  {
    head: "will + V2 أو V3",
    lines: [
      "الخطأ: He will bought the tickets.",
      "التصحيح: He will buy the tickets.",
      "السبب: after will يأتي الشكل الأساسي V1 دائمًا — والأفعال الشاذة تعود إلى V1 (④).",
    ],
  },
  {
    head: "إدخال to بين will والفعل",
    lines: [
      "الخطأ: She will to travel.",
      "التصحيح: She will travel.",
      "السبب: will فعل مساعد يتصل بالفعل الأساسي مباشرة (④/⑯).",
    ],
  },
  {
    head: "إضافة s بعد will",
    lines: [
      "الخطأ: He will goes. / She will helps.",
      "التصحيح: He will go. / She will help.",
      "السبب: لا تتغير صيغة الفعل مهما تغير الفاعل بعد will (③).",
    ],
  },
  {
    head: "استخدام do/does مع will في النفي أو السؤال",
    lines: [
      "الخطأ: I don't will go. / Does he will call us?",
      "التصحيح: I won't go. / Will he call us?",
      "السبب: will نفسها فعل مساعد، فلا نحتاج do أو does (⑯).",
    ],
  },
  {
    head: "will مع فعل to be مصروفًا",
    lines: [
      "الخطأ: They will are successful. / I will am happy.",
      "التصحيح: They will be successful. / I will be happy.",
      "السبب: بعد will نستخدم الشكل الأساسي be (㉕).",
    ],
  },
  {
    head: "إجابات قصيرة بـ do/don't",
    lines: [
      "الخطأ: Yes, I do. / No, she doesn't.",
      "التصحيح: Yes, I will. / No, she won't.",
      "السبب: السؤال بدأ بـ will، فالإجابة تعيد will (⑱).",
    ],
  },
  {
    head: "إلزام will مع tomorrow",
    lines: [
      "الخطأ التعليمي: تصحيح I am meeting my teacher tomorrow. إلى I will meet…",
      "التصحيح التعليمي: الجملة الأصلية صحيحة — Present Continuous يُستخدم لترتيب مستقبلي (㉒).",
      "السبب: الكلمة الدالة تَجيب عن «متى»، والمعنى يحدد الصيغة.",
    ],
  },
];

export const INTENTIONALLY_WRONG_34: { id: string; wrong: string; right: string; note: string; section: string; derived?: boolean }[] = [
  { id: "1", wrong: "She will goes.", right: "She will go.", note: "لا نضيف s إلى الفعل بعد will.", section: "§④ القاعدة الذهبية الأولى" },
  { id: "2", wrong: "He will studied.", right: "He will study.", note: "will تحتاج V1 لا صيغة الماضي.", section: "§④ القاعدة الذهبية الأولى" },
  { id: "3", wrong: "They will playing.", right: "They will play.", note: "بعد will لا تأتي صيغة ing.", section: "§④ القاعدة الذهبية الأولى" },
  { id: "4", wrong: "I will to travel.", right: "I will travel.", note: "لا نضع to بين will والفعل الأساسي.", section: "§④ القاعدة الذهبية الأولى" },
  { id: "5", wrong: "He doesn't will travel.", right: "He won't travel.", note: "will فعل مساعد — لا حاجة إلى do/does.", section: "§⑯ أخطاء النفي الشائعة" },
  { id: "6", wrong: "They will don't come.", right: "They won't come.", note: "لا نجمعه مع don't — النفي من won't وحدها.", section: "§⑯ أخطاء النفي الشائعة" },
  { id: "7", wrong: "She won't goes.", right: "She won't go.", note: "بعد won't يأتي V1.", section: "§⑯ أخطاء النفي الشائعة" },
  { id: "8", wrong: "I will not to leave.", right: "I will not leave.", note: "لا to بين will والفعل.", section: "§⑯ أخطاء النفي الشائعة" },
  { id: "9", wrong: "She will travels tomorrow.", right: "She will travel tomorrow.", note: "الاختيار الصحيح B — travel.", section: "§㉘ تمرين تأسيسي — جملة مبنية على خيارات المصدر", derived: true },
  { id: "10", wrong: "They are finish the work next week.", right: "They will finish the work next week.", note: "الاختيار الصحيح A — will.", section: "§㉘ تمرين تأسيسي — جملة مبنية على خيارات المصدر", derived: true },
  { id: "11", wrong: "He will is ready soon.", right: "He will be ready soon.", note: "الاختيار الصحيح B — be.", section: "§㉘ تمرين تأسيسي — جملة مبنية على خيارات المصدر", derived: true },
  { id: "12", wrong: "I don't will forget your kindness.", right: "I won't forget your kindness.", note: "الاختيار الصحيح A — won't.", section: "§㉘ تمرين تأسيسي — جملة مبنية على خيارات المصدر", derived: true },
  { id: "13", wrong: "Do will you help me?", right: "Will you help me?", note: "الاختيار الصحيح B — Will.", section: "§㉘ تمرين تأسيسي — جملة مبنية على خيارات المصدر", derived: true },
  { id: "14", wrong: "We will tried a new experiment.", right: "We will try a new experiment.", note: "الاختيار الصحيح C — try.", section: "§㉘ تمرين تأسيسي — جملة مبنية على خيارات المصدر", derived: true },
  { id: "15", wrong: "He will goes to the market.", right: "He will go to the market.", note: "goes ← go.", section: "§㉚ Grammar Detective" },
  { id: "16", wrong: "She won't to join the club.", right: "She won't join the club.", note: "حذف to.", section: "§㉚ Grammar Detective" },
  { id: "17", wrong: "Will they arrives tomorrow?", right: "Will they arrive tomorrow?", note: "arrives ← arrive.", section: "§㉚ Grammar Detective" },
  { id: "18", wrong: "I will am happy.", right: "I will be happy.", note: "am ← be.", section: "§㉚ Grammar Detective" },
  { id: "19", wrong: "Does he will call us?", right: "Will he call us?", note: "حذف Does، والسؤال بـ Will.", section: "§㉚ Grammar Detective" },
  { id: "20", wrong: "They will not playing football.", right: "They will not play football.", note: "playing ← play.", section: "§㉚ Grammar Detective" },
  { id: "21", wrong: "She wills help her sister.", right: "She will help her sister.", note: "wills ← will.", section: "§㉚ Grammar Detective" },
  { id: "22", wrong: "I will to study harder.", right: "I will study harder.", note: "حذف to.", section: "§㉚ Grammar Detective" },
  { id: "23", wrong: "We won't be late?", right: "Won't we be late?", note: "المطلوب تحويلها إلى سؤال منفي.", section: "§㉚ Grammar Detective" },
  { id: "24", wrong: "He will bought the tickets.", right: "He will buy the tickets.", note: "bought ← buy (V1).", section: "§㉚ Grammar Detective" },
  { id: "25", wrong: "He will studies harder.", right: "He will study harder.", note: "studies ← study.", section: "§㉟ الاختبار — المستوى الرابع" },
  { id: "26", wrong: "Will she comes tomorrow?", right: "Will she come tomorrow?", note: "comes ← come.", section: "§㉟ الاختبار — المستوى الرابع" },
  { id: "27", wrong: "I won't to forget.", right: "I won't forget.", note: "حذف to.", section: "§㉟ الاختبار — المستوى الرابع" },
  { id: "28", wrong: "They will are successful.", right: "They will be successful.", note: "are ← be.", section: "§㉟ الاختبار — المستوى الرابع" },
  { id: "29", wrong: "Does your father will help us?", right: "Will your father help us?", note: "حذف Does، والسؤال بـ Will.", section: "§㉟ الاختبار — المستوى الرابع" },
];

export const TEACHER_34_TEST_GUIDE: TeacherNote34[] = [
  {
    head: "حياد الاختبار",
    lines: [
      "لا تُعرض أي إجابة صحيحة ولا درجة ولا علامة ✓ قبل «إرسال الاختبار».",
      "زر الإرسال لا يعمل إلا بعد الإجابة عن الأسئلة الخمسة والعشرين دفعة واحدة.",
    ],
  },
  {
    head: "المستوى الأول — البناء الصحيح (1–5)",
    lines: [
      "يقيس القاعدة الذهبية: will + V1، والنفي won't، والسؤال بـ Will، و will be.",
      "الخيارات الخاطئة مبنية على أخطاء المصدر نفسها (reads / reading / doesn't / Do will / are).",
    ],
  },
  {
    head: "المستوى الثاني — أكمل الجمل (6–10)",
    lines: [
      "يقيس التطبيق المباشر للنفي والسؤال والتوقع والوعد.",
      "اقبل in two hours / 'll be / won't tell… إلخ بالكتابتين (مع الاختسار أو بدونه).",
    ],
  },
  {
    head: "المستوى الثالث — حدد الاستخدام (11–15)",
    lines: [
      "الخيارات الخمسة من §⑤: قرار لحظي — وعد — توقع — عرض مساعدة — رفض أو عدم استعداد.",
      "⑭ (The computer won't start) أبرز موضع لعدم الاستعداد — ناقشه شفهيًا.",
    ],
  },
  {
    head: "المستوى الرابع — صحح الأخطاء (16–20)",
    lines: [
      "المس الكلمة الخاطئة؛ الخطأ واحد في كل جملة (studies / comes / to / are / Does).",
      "⑱ حذف to — التصحيح ليس استبدال كلمة بأخرى.",
    ],
  },
  {
    head: "المستوى الخامس — IQ200 (21–25)",
    lines: [
      "كتابة حرّة: صحيح نحويًا ووظيفيًا ⇒ يُحسب صحيحًا.",
      "قيّم الوظيفة المطلوبة (قرار/وعد/توقع/سؤال) لا التشابه اللفظي مع الإجابة النموذجية.",
    ],
  },
  {
    head: "تصحيح النتيجة",
    lines: [
      "من 21 إلى 25: إتقان — مستوى IQ200.",
      "من 16 إلى 20: جيد — مراجعة خفيفة.",
      "من 9 إلى 15: مراجعة — عُد إلى الخطوات والتمارين.",
      "أقل من 9: دعم — أعد قراءة الملخص الذهبي والخريطة.",
    ],
  },
];

export const TEACHER_34_REMEDIATION: TeacherNote34[] = [
  {
    head: "أخطاء القاعدة الذهبية (will + V2/V3/ing/to)",
    lines: [
      "عُد إلى §④ القاعدة الذهبية الأولى، وأعد تدريب الأفعال الشاذة (go → went → gone ⇒ will go).",
      "تدريب شفهي سريع: قل الفعل الثلاثي واسأل «what comes after will؟».",
    ],
  },
  {
    head: "الخلط بين will و do/does",
    lines: [
      "عُد إلى §⑮/§⑯/§⑰، وثبّت قاعدة «will فعل مساعد، فلا حاجة إلى do/does».",
      "درّب على ثلاثة تحويلات لكل جملة: مثبت / منفي / سؤال.",
    ],
  },
  {
    head: "الخلط بين will و be مصروفًا",
    lines: [
      "عُد إلى §㉕ (will be) والجدول في §㉖ (am/is/are ⇒ be).",
      "درّب على They will be … / I will be … حتى تصبح الصيغة واحدة مع كل الضمائر.",
    ],
  },
  {
    head: "صعوبة تحديد الوظيفة",
    lines: [
      "عُد إلى بطاقات §⑤ الست، واستخدم عبارة واحدة لكل وظيفة: I'll check the door. / I promise… / I think… / I'll help you. / I'll be there. / It won't start.",
      "قصة Daniel (§㉜) فيها مواضع للوظائف الست — حلّلها سطرًا سطرًا.",
    ],
  },
  {
    head: "إجابات قصيرة بـ do/don't",
    lines: [
      "عُد إلى §⑱، وردّد: السؤال بـ will ⇒ الإجابة بـ will (Yes, I will / No, she won't).",
    ],
  },
  {
    head: "إلزام will مع الكلمات الدالة",
    lines: [
      "عُد إلى تحذير §㉒، وبيّن أن tomorrow لا يفرض will، وأن المعنى هو المحدد.",
      "أجّل المقارنة الموسعة إلى الدرس 35 حتى لا يُثبَّت فهم ناقص.",
    ],
  },
];

export const TEACHER_34_SOURCE_NOTE =
  "هذا الفهرس هو نص المصدر المرفق بالدرس حرفيًا كما ورد — 39 قسمًا مرقّمًا (①…㊳) مع الغلاف والأهداف = 40 قسمًا في السجل. الحلول غير المنصوصة (مفتاح الاختبار) مشتقة وفق قواعد الدرس وموسومة بذلك في مكانها، والمستوى الخامس من الاختبار كتابة حرّة له إجابات ممكنة متعددة.";
