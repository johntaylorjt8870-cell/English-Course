/** Lesson 46: student-facing teaching content. Test solutions live in testKey46. */
export type Tone46 = "stop" | "choice" | "need" | "neutral";
export type Example46 = { en: string; ar: string; tag?: string; tone?: Tone46 };
export type Turn46 = { speaker: string; en: string; ar?: string };
export type Slide46 = {
  id: string;
  station: string;
  kind: "cover" | "goals" | "doors" | "lesson" | "timeline" | "comparison" | "dialogue" | "practice" | "reading" | "readingQuestions" | "test" | "teacher" | "writing" | "summary" | "roadmap";
  title: string;
  lead?: string;
  mascot?: string;
  tone?: Tone46;
  formula?: readonly string[];
  examples?: readonly Example46[];
  points?: readonly string[];
  note?: string;
  /** قاعدة ذهبية تُعرض في شريط داكن أسفل الشريحة */
  tip?: string;
  turns?: readonly Turn46[];
  practiceSet?: string;
  labId?: string;
};

export const STATIONS_46 = [
  { id: "doors", title: "الأبواب الثلاثة" },
  { id: "mustnt", title: "المنع والتحذير" },
  { id: "have-to", title: "عدم الإلزام" },
  { id: "neednt", title: "عدم الحاجة" },
  { id: "ordinary-need", title: "الفعل العادي need" },
  { id: "past", title: "الضرورة في الماضي" },
  { id: "past-perfect", title: "فعل حدث دون حاجة" },
  { id: "judgement", title: "عدم الحاجة أم الحكم؟" },
  { id: "future", title: "الضرورة في المستقبل" },
  { id: "comparison", title: "المقارنة الكبرى" },
  { id: "labs", title: "مختبر الحياة الواقعية" },
  { id: "detective", title: "محقق القواعد" },
  { id: "practice", title: "التدريب المتدرج" },
  { id: "reading", title: "القراءة والفهم" },
  { id: "test", title: "الاختبار ومساحة المعلم" },
  { id: "writing", title: "مهمة الكتابة" },
  { id: "summary", title: "الملخص الذهبي" },
  { id: "progress", title: "خريطة التقدم" },
] as const;

/** الأبواب الثلاثة: اللون والرمز ثابتان في الدرس كله (كما في الدرس 1). */
export const DOORS_46 = [
  {
    id: "stop",
    tone: "stop" as const,
    n: "01",
    modal: "MUSTN'T",
    en: "mustn't + V1",
    ar: "ممنوع / لا يجوز",
    q: "هل الفعل ممنوع؟",
    emoji: "🛑",
    example: "You mustn't enter this room.",
    exampleAr: "يُمنع عليك دخول هذه الغرفة.",
  },
  {
    id: "choice",
    tone: "choice" as const,
    n: "02",
    modal: "DON'T\nHAVE TO",
    en: "don't / doesn't have to + V1",
    ar: "ليس عليك / غير ملزم",
    q: "هل الفعل اختياري؟",
    emoji: "🔓",
    example: "You don't have to attend the extra class.",
    exampleAr: "لست مضطرًا إلى حضور الحصة الإضافية.",
  },
  {
    id: "need",
    tone: "need" as const,
    n: "03",
    modal: "NEEDN'T",
    en: "needn't + V1",
    ar: "لا حاجة إلى / ليس ضروريًا",
    q: "هل الفعل بلا حاجة؟",
    emoji: "✅",
    example: "You needn't bring your own laptop.",
    exampleAr: "لا داعي لإحضار حاسوبك الخاص.",
  },
] as const;

export const GOALS_46 = [
  "تمييز المنع عن عدم الإلزام وعدم الحاجة.",
  "استخدام MUSTN'T في القواعد والتحذيرات مع الفعل المجرد.",
  "بناء نفي وأسئلة DON'T / DOESN'T HAVE TO.",
  "استخدام NEEDN'T وفهم تقاربها مع DON'T HAVE TO.",
  "استخدام NEED فعلًا عاديًا مع TO و DO / DOES.",
  "التعبير عن عدم الإلزام وعدم الحاجة في الماضي.",
  "فهم NEEDN'T HAVE + V3 واستنتاج وقوع الفعل عادةً.",
  "تمييز عدم الضرورة عن الحكم على فعل ماضٍ بأنه غير مناسب.",
  "التعبير عن عدم الإلزام والحاجة في المستقبل.",
  "المقارنة بين المنع والنصيحة والضرورة وتطبيقها في الحياة.",
  "القراءة والكتابة وتصحيح أخطاء الصيغة والمعنى.",
  "حل اختبار شامل من 25 سؤالًا في خمسة مستويات.",
] as const;

export const SLIDES_46: readonly Slide46[] = [
  { id: "cover", station: "doors", kind: "cover", mascot: "🚪", title: "أبواب المنع وعدم الضرورة", lead: "ثلاث لافتات، وثلاث رسائل مختلفة. افتح الباب المناسب قبل أن تختار الكلمة." },
  { id: "goals", station: "doors", kind: "goals", mascot: "🎯", title: "ما الذي ستفتحه في هذا الدرس؟", lead: "من قواعد المدرسة إلى مفاجأة التذكرة: أهداف رحلتنا الاثنا عشر." },
  { id: "three-doors", station: "doors", kind: "doors", mascot: "🗝️", title: "ثلاثة أبواب، وليست رسالة واحدة", lead: "اختر بابًا لقراءة معناه، ثم جرّب موقفًا سريعًا.", examples: [
    { en: "You mustn't enter this room.", ar: "يُمنع عليك دخول الغرفة.", tag: "PROHIBITION", tone: "stop" },
    { en: "You don't have to attend the extra class.", ar: "لست مضطرًا إلى حضور الحصة الإضافية.", tag: "NO OBLIGATION", tone: "choice" },
    { en: "You needn't bring your own laptop.", ar: "لا داعي لإحضار حاسوبك الخاص.", tag: "NO NEED", tone: "need" },
  ], note: "البابان الثاني والثالث متقاربان؛ الأول يعني المنع، لا مجرد رفع الالتزام." },

  { id: "mustnt-signs", station: "mustnt", kind: "lesson", mascot: "🛑", tone: "stop", title: "اللافتة الحمراء: ممنوع", lead: "عندما يكون الفعل غير مسموح به، سواء جاء المنع من قانون أو تعليمات أو تحذير سلامة قوي.", formula: ["Subject + mustn't / must not + V1"], examples: [
    { en: "You mustn't touch this machine.", ar: "يُمنع لمس هذه الآلة.", tag: "SAFETY", tone: "stop" },
    { en: "Students mustn't cheat in exams.", ar: "يُمنع الغش في الامتحانات.", tag: "SCHOOL", tone: "stop" },
    { en: "You mustn't park here.", ar: "يُمنع ركن السيارة هنا.", tag: "RULE", tone: "stop" },
    { en: "Visitors mustn't enter without permission.", ar: "يُمنع على الزوار الدخول دون إذن.", tag: "PERMISSION", tone: "stop" },
  ] },
  { id: "mustnt-form", station: "mustnt", kind: "lesson", mascot: "✋", tone: "stop", title: "فعل مجرد وتحذير واضح", lead: "الفعل الناقص لا يتغير مع الضمائر، ويأتي بعده الفعل في صورته الأساسية بلا to أو s.", formula: ["She mustn't leave. ✓", "She mustn't to leave. ✗"], points: [
    "I / you / he / she / we / they mustn't + V1؛ لا نستخدم doesn't must.",
    "Students mustn't run in the corridors, use phones during exams, damage school property or enter the laboratory without a teacher.",
  ], examples: [
    { en: "You mustn't touch that wire. You mustn't drink this liquid.", ar: "لا تلمس ذلك السلك ولا تشرب هذا السائل: تحذيران من الخطر.", tone: "stop" },
    { en: "Children mustn't play near the road.", ar: "يُمنع على الأطفال اللعب قرب الطريق.", tone: "stop" },
  ], note: "She mustn't leaves و She doesn't must leave صيغتان خاطئتان." },

  { id: "no-obligation", station: "have-to", kind: "comparison", mascot: "🔓", tone: "choice", title: "الباب المفتوح: ليس إلزاميًا", lead: "عدم الإلزام لا يعني المنع. ولا تحدد الجملة وحدها إن كان الفعل مسموحًا أو ممنوعًا؛ السياق يحدد ذلك.", formula: ["Subject + don't / doesn't have to + V1"], examples: [
    { en: "You mustn't enter the room.", ar: "الدخول ممنوع.", tag: "STOP", tone: "stop" },
    { en: "You don't have to enter the room.", ar: "الدخول ليس إلزاميًا؛ لا نعرف من الجملة وحدها هل هو مسموح.", tag: "NO OBLIGATION", tone: "choice" },
    { en: "You mustn't bring food into the laboratory.", ar: "إدخال الطعام إلى المختبر ممنوع.", tone: "stop" },
    { en: "You don't have to bring food to the trip.", ar: "إحضار الطعام إلى الرحلة ليس إلزاميًا.", tone: "choice" },
  ], tip: "MUSTN'T تعني «ممنوع»، و DON'T HAVE TO تعني «ليس عليك»؛ لا تستخدم إحداهما مكان الأخرى." },
  { id: "doesnt-have", station: "have-to", kind: "lesson", mascot: "🔤", tone: "choice", title: "لماذا نقول doesn't have؟", lead: "بعد does أو doesn't يعود الفعل الرئيسي إلى صورته الأساسية have.", formula: ["She has to study. → She doesn't have to study."], examples: [
    { en: "You don't have to come early.", ar: "لست مضطرًا إلى الحضور مبكرًا.", tone: "choice" },
    { en: "She doesn't have to wear a uniform today.", ar: "ليس عليها ارتداء الزي اليوم.", tone: "choice" },
    { en: "We don't have to bring our books.", ar: "لسنا مضطرين إلى إحضار الكتب.", tone: "choice" },
    { en: "He doesn't have to work tomorrow. Omar doesn't have to attend.", ar: "ليس عليه العمل غدًا، ولا على عمر الحضور.", tone: "choice" },
  ], note: "She doesn't has to study صيغة غير صحيحة؛ بعد doesn't نستخدم have." },
  { id: "have-questions", station: "have-to", kind: "lesson", mascot: "❓", tone: "choice", title: "كيف نسأل عن الإلزام؟", formula: ["Do / Does + subject + have to + V1?"], examples: [
    { en: "Do I have to finish this today?", ar: "هل يجب عليّ إنهاء هذا اليوم؟" },
    { en: "Does she have to attend the meeting?", ar: "هل عليها حضور الاجتماع؟" },
    { en: "Do we have to bring our notebooks?", ar: "هل يجب أن نحضر دفاترنا؟" },
    { en: "Yes, you do. / No, you don't. / No, you don't have to.", ar: "نعم، عليك ذلك. / لا، لست مضطرًا." },
  ], note: "الجواب المختصر للسؤال بـ Do/Does يستخدم do/don't/does/doesn't، ويمكن إضافة have to للتوضيح." },

  { id: "neednt-form", station: "neednt", kind: "lesson", mascot: "✅", tone: "need", title: "لا داعي: needn't", lead: "needn't هي need not: فعل ناقص ثابت مع كل الضمائر، وبعده V1 مباشرة بلا to.", formula: ["Subject + needn't / need not + V1"], examples: [
    { en: "You needn't worry. We needn't hurry.", ar: "لا داعي للقلق أو الاستعجال.", tone: "need" },
    { en: "She needn't bring her laptop. They needn't pay.", ar: "لا حاجة إلى إحضار حاسوبها أو أن يدفعوا.", tone: "need" },
    { en: "He needn't wait. ✓  /  He needn't to wait. ✗", ar: "لا نضيف to أو s بعد الفعل الناقص.", tone: "need" },
  ], note: "مثل must و should و can، تبقى needn't ثابتة مع I و he و they وسائر الضمائر." },
  { id: "neednt-or-have", station: "neednt", kind: "comparison", mascot: "🔁", tone: "need", title: "بابان متقاربان", lead: "في هذا السياق تعبّر الجملتان عن عدم الضرورة؛ لا نعتمد فرقًا صارمًا بينهما دائمًا.", examples: [
    { en: "You don't have to bring your laptop.", ar: "لا يلزمك إحضار الحاسوب.", tone: "choice" },
    { en: "You needn't bring your laptop.", ar: "لا داعي لإحضار الحاسوب.", tone: "need" },
  ], note: "Don't have to شائعة في المحادثة اليومية، و needn't مألوفة خصوصًا في الإنجليزية البريطانية وقد تبدو أكثر اختصارًا أو رسمية." },

  { id: "ordinary-need", station: "ordinary-need", kind: "lesson", mascot: "🧩", title: "عندما تكون need فعلًا عاديًا", lead: "في الإثبات نستخدم need أو needs مع to، وفي النفي والسؤال نستخدم do أو does.", formula: ["Subject + need / needs + to + V1"], examples: [
    { en: "I need to study. She needs to rest. We need to leave.", ar: "أحتاج إلى الدراسة، وتحتاج إلى الراحة، ونحتاج إلى المغادرة." },
    { en: "I don't need to study. She doesn't need to rest.", ar: "لا أحتاج إلى الدراسة، ولا تحتاج هي إلى الراحة." },
    { en: "Do you need to study? Does she need to rest?", ar: "هل تحتاج إلى الدراسة؟ وهل تحتاج هي إلى الراحة؟" },
  ] },
  { id: "need-contrast", station: "ordinary-need", kind: "comparison", mascot: "⚖️", title: "المعنى متقارب، والتركيب مختلف", examples: [
    { en: "She doesn't need to come.", ar: "فعل عادي: doesn't + need + to + V1.", tag: "ORDINARY VERB", tone: "choice" },
    { en: "She needn't come.", ar: "فعل ناقص: needn't + V1 مباشرة.", tag: "MODAL", tone: "need" },
    { en: "She doesn't need come. ✗  /  She needn't to come. ✗", ar: "لا تحذف to مع الفعل العادي، ولا تضفها بعد needn't.", tone: "stop" },
  ], tip: "needn't = فعل ناقص بلا to، و don't need to = فعل عادي مع to." },

  { id: "past-necessity", station: "past", kind: "timeline", mascot: "🕰️", title: "الماضي: عدم الإلزام أو الحاجة", lead: "كلا التركيبين يصف غياب الإلزام أو الحاجة؛ ولا يحدد وحده بالضرورة إن كان الفعل قد وقع.", examples: [
    { en: "I didn't have to work yesterday.", ar: "لم يكن العمل إلزاميًا أمس؛ ربما عملت وربما لم أعمل.", tag: "NO OBLIGATION" },
    { en: "She didn't have to attend the meeting. We didn't have to pay for the tickets.", ar: "لم تكن مضطرة للحضور، ولم يكن علينا الدفع." },
    { en: "I didn't need to buy a ticket.", ar: "لم أكن بحاجة إلى شراء تذكرة؛ الجملة وحدها لا تثبت وقوع الشراء أو عدمه.", tag: "NO NEED" },
    { en: "She didn't need to bring her laptop. We didn't need to hurry.", ar: "لم تكن بحاجة إلى حاسوبها، ولم نحتج إلى الاستعجال." },
  ], formula: ["didn't have to + V1", "didn't need to + V1"] },
  { id: "past-two-outcomes", station: "past", kind: "comparison", mascot: "🔀", title: "العبارة نفسها، ونتيجتان ممكنتان", lead: "السياق الإضافي هو الذي يحسم وقوع الفعل هنا.", examples: [
    { en: "I didn't need to buy a ticket, so I didn't buy one.", ar: "لم أكن بحاجة إليها، فلم أشترِ واحدة.", tag: "DID NOT HAPPEN" },
    { en: "I didn't need to buy a ticket, but I bought one anyway.", ar: "لم أكن بحاجة إليها، لكنني اشتريت واحدة رغم ذلك.", tag: "DID HAPPEN" },
  ], note: "لا تستنتج عدم حدوث الفعل من didn't need to وحدها." },

  { id: "unnecessary-action", station: "past-perfect", kind: "timeline", mascot: "🎫", tone: "need", title: "اشتريت التذكرة… ولم تكن ضرورية", lead: "اشتريت تذكرة للمتحف، ثم اكتشفت أن الدخول مجاني للطلاب. هنا تحمل الجملة معلومة إضافية عن الماضي.", formula: ["Subject + needn't have + V3"], examples: [
    { en: "I needn't have bought a ticket.", ar: "اشتريت التذكرة فعلًا، لكن شراءها لم يكن ضروريًا.", tag: "ACTION HAPPENED", tone: "need" },
    { en: "I didn't need to buy a ticket.", ar: "لم أحتج إلى شرائها؛ لا نعرف من الجملة وحدها هل اشتريتها.", tag: "OUTCOME UNSPECIFIED", tone: "choice" },
  ], note: "needn't have + V3 تفيد عادةً أن الفعل حدث؛ لا تُساويها آليًا بجملة لا تحدد وقوع الفعل." },
  { id: "v3-passport", station: "past-perfect", kind: "lesson", mascot: "🛂", tone: "need", title: "جواز المرور إلى الماضي: V3", lead: "بعد have نستخدم التصريف الثالث، لا صيغة الفعل الأساسية أو الماضي البسيط.", formula: ["buy → bought  ·  go → gone  ·  leave → left"], examples: [
    { en: "She needn't have cooked so much food.", ar: "طهت الطعام فعلًا، لكن الكمية لم تكن ضرورية." },
    { en: "We needn't have arrived so early.", ar: "وصلنا مبكرًا فعلًا دون حاجة." },
    { en: "He needn't have bought another laptop.", ar: "اشترى حاسوبًا آخر دون حاجة." },
    { en: "They needn't have waited for us.", ar: "انتظرونا فعلًا، ولم يكن ذلك ضروريًا." },
    { en: "I needn't have buy a ticket. ✗  /  I needn't have bought a ticket. ✓", ar: "buy و cook لا تصلحان هنا مكان bought و cooked." },
  ] },
  { id: "neednt-vs-shouldnt", station: "judgement", kind: "comparison", mascot: "🧭", title: "هل كان بلا حاجة، أم قرارًا غير مناسب؟", examples: [
    { en: "I needn't have brought my laptop.", ar: "أحضرته فعلًا، لكن لم تكن هناك حاجة إليه.", tag: "UNNECESSARY", tone: "need" },
    { en: "I shouldn't have brought my laptop.", ar: "أحضرته، وأحكم الآن بأن إحضاره لم يكن مناسبًا أو كان الأفضل تجنبه.", tag: "JUDGEMENT", tone: "stop" },
    { en: "I needn't have bought a ticket. / I shouldn't have bought a ticket.", ar: "الأولى عن عدم الضرورة، والثانية عن تقييم القرار.", tone: "choice" },
  ], note: "قد يتداخل المعنيان في سياق ما، لكنهما ليسا مترادفين تلقائيًا." },
  { id: "future-necessity", station: "future", kind: "timeline", mascot: "⏭️", title: "غدًا: لن نحتاج أو نُضطر", formula: ["won't have to + V1", "won't need to + V1"], examples: [
    { en: "You won't have to come early tomorrow. She won't have to work next Friday.", ar: "لن تكون مضطرًا للحضور مبكرًا، ولن تضطر هي إلى العمل الجمعة القادمة." },
    { en: "We won't have to pay for the tickets.", ar: "لن نكون مضطرين إلى دفع ثمن التذاكر." },
    { en: "You won't need to bring your laptop tomorrow. We won't need to hurry.", ar: "لن تحتاج إلى حاسوبك غدًا، ولن نحتاج إلى الاستعجال." },
    { en: "She won't need to buy another ticket. / She won't has to work. ✗", ar: "لن تحتاج إلى تذكرة أخرى؛ بعد will نستخدم have لا has." },
  ] },

  { id: "master-map", station: "comparison", kind: "comparison", mascot: "🗺️", title: "الخريطة الكبرى للمعاني", lead: "اقرأ المعنى قبل اختيار الصيغة؛ التشابه في النفي لا يعني التشابه في الرسالة.", examples: [
    { en: "MUST / HAVE TO + V1", ar: "ضرورة قوية أو إلزام / متطلب." },
    { en: "MUSTN'T + V1", ar: "منع: الفعل غير مسموح به.", tone: "stop" },
    { en: "DON'T / DOESN'T HAVE TO + V1", ar: "عدم الإلزام.", tone: "choice" },
    { en: "NEEDN'T + V1 / DON'T NEED TO + V1", ar: "عدم الحاجة.", tone: "need" },
    { en: "SHOULD / SHOULDN'T + V1", ar: "نصيحة بالفعل / نصيحة بعدم الفعل." },
  ] },
  { id: "master-time", station: "comparison", kind: "timeline", mascot: "🧭", title: "بوصلة الزمن والمعلومة", examples: [
    { en: "didn't have to / didn't need to + V1", ar: "غياب الإلزام أو الحاجة في الماضي؛ وقوع الفعل غير محدد وحده.", tag: "PAST" },
    { en: "needn't have + V3", ar: "فعل وقع عادةً رغم عدم الحاجة إليه.", tag: "PAST · ACTION" },
    { en: "won't have to / won't need to + V1", ar: "غياب الإلزام أو الحاجة في المستقبل.", tag: "FUTURE" },
  ], note: "MUSTN'T لا تساوي DON'T HAVE TO؛ و DON'T NEED TO تقارب NEEDN'T؛ أما تراكيب الماضي فلا تنقل جميعها معلومات متطابقة." },

  { id: "trip-lab", station: "labs", kind: "dialogue", mascot: "🚌", title: "مختبر الرحلة المدرسية", lead: "اقرأ الحوار وحدد الرسالة المطلوبة بعده.", labId: "lab-trip", turns: [
    { speaker: "Teacher", en: "Tomorrow, we're going on a school trip.", ar: "غدًا سنذهب في رحلة مدرسية." },
    { speaker: "Maya", en: "Do we have to bring our own food?", ar: "هل علينا إحضار طعامنا؟" },
    { speaker: "Teacher", en: "No, you don't have to. The school will provide lunch.", ar: "لا، ليس عليكم ذلك؛ المدرسة ستوفر الغداء." },
    { speaker: "Omar", en: "Do we need to bring our notebooks?", ar: "هل نحتاج إلى إحضار دفاترنا؟" },
    { speaker: "Teacher", en: "No, you needn't bring them.", ar: "لا، لا داعي لإحضارها." },
    { speaker: "Daniel", en: "Can we bring our phones?", ar: "هل يمكننا إحضار هواتفنا؟" },
    { speaker: "Teacher", en: "Yes, but you mustn't use them during the guided tour.", ar: "نعم، لكن يُمنع استخدامها أثناء الجولة المرشدة." },
    { speaker: "Maya", en: "Great! So we don't need to carry heavy bags.", ar: "رائع! إذن لا حاجة إلى حمل حقائب ثقيلة." },
    { speaker: "Teacher", en: "Exactly.", ar: "بالضبط." },
  ] },
  { id: "library-lab", station: "labs", kind: "dialogue", mascot: "📚", title: "مختبر المكتبة", labId: "lab-library", turns: [
    { speaker: "Librarian", en: "You mustn't eat or drink inside the library.", ar: "يُمنع الأكل أو الشرب داخل المكتبة." },
    { speaker: "Maya", en: "Do we have to return the books today?", ar: "هل علينا إعادة الكتب اليوم؟" },
    { speaker: "Librarian", en: "No, you don't have to. You can keep them until Friday.", ar: "لا، ليس عليكم ذلك؛ يمكنكم الاحتفاظ بها حتى الجمعة." },
    { speaker: "Omar", en: "Do we need to pay to borrow books?", ar: "هل نحتاج إلى الدفع لاستعارة الكتب؟" },
    { speaker: "Librarian", en: "No, you needn't pay. Borrowing is free.", ar: "لا، لا داعي للدفع؛ الاستعارة مجانية." },
  ] },
  { id: "airport-lab", station: "labs", kind: "dialogue", mascot: "✈️", title: "مختبر المطار", labId: "lab-airport", turns: [
    { speaker: "Daniel", en: "Do we have to print our boarding passes?", ar: "هل علينا طباعة بطاقات الصعود؟" },
    { speaker: "Father", en: "No, we don't have to. We can use the digital versions.", ar: "لا، ليس علينا ذلك؛ يمكننا استخدام النسخ الرقمية." },
    { speaker: "Daniel", en: "Oh! I printed all of them yesterday.", ar: "أوه! لقد طبعتُها كلها أمس." },
    { speaker: "Father", en: "Then you needn't have printed them.", ar: "إذن لم تكن بحاجة إلى طباعتها." },
    { speaker: "Daniel", en: "I see. At least now I know.", ar: "فهمت. على الأقل عرفتُ الآن." },
  ] },
  { id: "museum-lab", station: "labs", kind: "dialogue", mascot: "🏛️", title: "مختبر المتحف والامتحان", labId: "lab-museum", turns: [
    { speaker: "Guide", en: "You mustn't touch the exhibits without permission.", ar: "يُمنع لمس المعروضات دون إذن." },
    { speaker: "Maya", en: "Do we have to bring notebooks?", ar: "هل علينا إحضار دفاتر؟" },
    { speaker: "Guide", en: "No, you don't have to. The museum provides worksheets.", ar: "لا، ليس عليكم ذلك؛ المتحف يوفر أوراق عمل." },
    { speaker: "Teacher", en: "You mustn't use your phones during the exam. You don't have to bring calculators; the school provides them.", ar: "يُمنع استخدام الهواتف أثناء الامتحان. وليس عليكم إحضار آلات حاسبة؛ المدرسة توفرها." },
    { speaker: "Omar", en: "I brought mine anyway.", ar: "لقد أحضرتُ آلتي رغم ذلك." },
    { speaker: "Teacher", en: "That's fine, but you needn't have brought it.", ar: "لا مشكلة، لكنك لم تكن بحاجة إلى إحضارها." },
  ] },
  { id: "laboratory-lab", station: "labs", kind: "dialogue", mascot: "🧪", title: "مختبر السلامة", labId: "lab-laboratory", turns: [
    { speaker: "Teacher", en: "You mustn't touch the dangerous wire or drink this liquid.", ar: "يُمنع لمس السلك الخطير أو شرب هذا السائل." },
    { speaker: "Maya", en: "Do we need to bring a laptop?", ar: "هل نحتاج إلى إحضار حاسوب محمول؟" },
    { speaker: "Teacher", en: "No, you needn't. The lab provides computers.", ar: "لا، لا داعي؛ المختبر يوفر الحواسيب." },
    { speaker: "Omar", en: "Will we have to come early tomorrow?", ar: "هل سيتعين علينا الحضور مبكرًا غدًا؟" },
    { speaker: "Teacher", en: "No, you won't have to come early.", ar: "لا، لن يكون عليكم الحضور مبكرًا." },
  ] },

  { id: "detective-a", station: "detective", kind: "practice", mascot: "🕵️", title: "محقق القواعد · الملف الأول", lead: "صحّح الجملة كاملة، محافظًا على المعنى المقصود.", practiceSet: "detective-a" },
  { id: "detective-b", station: "detective", kind: "practice", mascot: "🔍", title: "محقق القواعد · الملف الثاني", lead: "في الحالة الأخيرة الخطأ معنوي: لا تحوّل عدم الحاجة إلى منع.", practiceSet: "detective-b" },
  { id: "practice-32", station: "practice", kind: "practice", mascot: "✏️", title: "١ · اختر الباب المناسب", lead: "اختر تعبيرًا صحيحًا في السياق. قد يكون أكثر من تعبير مقبولًا.", practiceSet: "p32" },
  { id: "practice-33", station: "practice", kind: "practice", mascot: "🧠", title: "٢ · هل وقع الفعل؟", lead: "اختر الاستنتاج الذي يدعمه السياق وحده؛ لا تضف معلومة لم تُذكر.", practiceSet: "p33" },
  { id: "practice-34", station: "practice", kind: "practice", mascot: "🕰️", title: "٣ · الماضي والمستقبل", lead: "اكتب العبارة الناقصة أو الجملة كاملة، وانتبه إلى الزمن والتصريف.", practiceSet: "p34" },
  { id: "practice-35", station: "practice", kind: "practice", mascot: "🎯", title: "٤ · صنّف المعنى", lead: "ميّز بين المنع، وعدم الضرورة، وفعل ماضٍ وقع دون حاجة.", practiceSet: "p35" },
  { id: "practice-36", station: "practice", kind: "practice", mascot: "🔧", title: "٥ · أصلح المعنى", lead: "أعد كتابة كل جملة كاملة لتطابق المعنى العربي؛ تُقبل البدائل الصحيحة التي تحفظ المعنى.", practiceSet: "p36" },

  { id: "reading", station: "reading", kind: "reading", mascot: "📖", title: "The School Technology Fair", lead: "اقرأ القصة، ثم افتح أسئلة الفهم العشرة في الشريحة التالية." },
  { id: "reading-questions", station: "reading", kind: "readingQuestions", mascot: "🔎", title: "بعد القراءة: عشر عدسات للفهم", lead: "اكتب إجابتك، ثم قارنها بالنموذج عند الحاجة." },
  { id: "final-test", station: "test", kind: "test", mascot: "🏁", title: "الاختبار النهائي", lead: "خمسة مستويات، في كل مستوى خمسة أسئلة. لا تظهر الحلول أو النتيجة قبل التسليم." },
  { id: "teacher", station: "test", kind: "teacher", mascot: "🧑‍🏫", title: "مساحة المعلم", lead: "بعد تسليم الاختبار، افتح دليل التصحيح المفصل ببوابة المعلم المعتادة." },
  { id: "writing", station: "writing", kind: "writing", mascot: "📝", title: "مهمة الكتابة: يوم من القواعد والخيارات", lead: "اكتب فقرة من 12 إلى 15 جملة عن يوم مدرسي أو رحلة أو نشاط جماعي." },
  { id: "golden-summary", station: "summary", kind: "summary", mascot: "🧠", title: "الملخص الذهبي للأبواب الثلاثة", lead: "ثلاثة أبواب، وخط زمني واحد: احتفظ بهذه الخريطة معك." },
  { id: "course-progress", station: "progress", kind: "roadmap", mascot: "🎓", title: "أغلقت الباب الصحيح… وفتحت التالي", lead: "أتممنا الدرس 46 من أصل 120؛ بقي 74 درسًا في الرحلة." },
] as const;

export const LESSON_STEP_COUNT_46 = SLIDES_46.length;

export const READING_46 = [
  { en: "Maya and her classmates are preparing for a technology fair. Before the event, their teacher explains the rules.", ar: "تستعد مايا وزملاؤها لمعرض للتكنولوجيا. قبل الحدث يشرح معلمهم القواعد." },
  { en: "“Everyone must follow the safety instructions,” she says. “You mustn't touch the electrical equipment without permission.”", ar: "تقول المعلمة: «يجب على الجميع اتباع تعليمات السلامة. يُمنع لمس المعدات الكهربائية دون إذن»." },
  { en: "Omar raises his hand. “Do we have to bring our own laptops?” “No, you don't have to,” the teacher replies. “The school will provide computers.”", ar: "يسأل عمر إن كان عليهم إحضار حواسيبهم. تجيب المعلمة بالنفي؛ فالمدرسة ستوفر الأجهزة." },
  { en: "Daniel looks surprised. “Oh! I bought a new laptop yesterday because I thought we needed one.” The teacher smiles. “Then you needn't have bought it for this event.”", ar: "يتعجب دانيال: اشترى حاسوبًا أمس لأنه ظن أنهم يحتاجون إليه. تبتسم المعلمة: لم تكن بحاجة إلى شرائه لهذا الحدث." },
  { en: "Maya asks: “Do we need to bring printed copies of our projects?” “No, you needn't. Digital copies are enough.”", ar: "تسأل مايا عن النسخ المطبوعة؛ تجيب المعلمة أن النسخ الرقمية تكفي." },
  { en: "Later, the students begin preparing their presentations. Omar says: “We don't need to hurry. We still have two hours.”", ar: "يبدأ الطلاب تجهيز عروضهم. يقول عمر إنه لا داعي للاستعجال لأن أمامهم ساعتين." },
  { en: "Daniel replies: “That's good. I didn't need to stay up so late last night, but I did.” The students laugh and continue working.", ar: "يرد دانيال بأنه لم يكن بحاجة إلى السهر، لكنه سهر فعلًا. يضحك الطلاب ويواصلون العمل." },
] as const;

export const READING_QUESTIONS_46 = [
  { q: "What are the students preparing for?", answer: "A technology fair.", ar: "يستعدون لمعرض للتكنولوجيا." },
  { q: "What mustn't they touch without permission?", answer: "The electrical equipment.", ar: "المعدات الكهربائية." },
  { q: "Do they have to bring their own laptops?", answer: "No, they don't. The school provides computers.", ar: "لا؛ المدرسة توفر الحواسيب." },
  { q: "Why did Daniel buy a laptop?", answer: "Because he thought they needed one.", ar: "لأنه ظن أنهم يحتاجون إليه." },
  { q: "What does ‘You needn't have bought it’ mean?", answer: "He bought it, but buying it for the event wasn't necessary.", ar: "اشتراه، لكن شراءه للحدث لم يكن ضروريًا." },
  { q: "Do they need printed copies of their projects?", answer: "No, they don't. Digital copies are enough.", ar: "لا؛ النسخ الرقمية كافية." },
  { q: "Why don't they need to hurry?", answer: "Because they still have two hours.", ar: "لأن أمامهم ساعتين." },
  { q: "What does ‘I didn't need to stay up so late, but I did’ mean?", answer: "Staying up late wasn't necessary, but he did it anyway.", ar: "لم يكن السهر ضروريًا، لكنه سهر فعلًا." },
  { q: "Find an example of MUSTN'T.", answer: "You mustn't touch the electrical equipment without permission.", ar: "مثال على المنع." },
  { q: "Find an example of NEEDN'T.", answer: "No, you needn't.", ar: "مثال على عدم الحاجة." },
] as const;
