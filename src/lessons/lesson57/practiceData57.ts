// ============================================================
// الدرس 57 — التمارين التطبيقية التسعة + تدريب إضافي
//
// التمارين 1–9 مطابقة لمحتوى التمارين الأصلية بكل أسئلتها وإجاباتها.
// التمرين 10 هو بقية أسئلة الاختبار الأصلي (25 سؤالًا) بعد أن اختير
// 15 سؤالًا للاختبار التفاعلي في test57.ts — فلا يُفقد سؤال من المصدر.
//
// بيانات الطالب فقط؛ التفسيرات تظهر بعد محاولة الطالب (سلوك المشروع).
// ============================================================

export type PracticeKind57 =
  | "classify" // صنّف: Active أم Passive
  | "analyse" // حلّل: Subject / Verb / Object
  | "transform" // حوّل Active ← Passive
  | "reverse" // حوّل Passive ← Active
  | "fillBe" // أكمل بـ am / is / are
  | "fillV3" // أكمل بـ V3
  | "negate" // انفِ الجملة
  | "question" // اسأل
  | "choose"; // اختر الإجابة الصحيحة

export type PracticeItem57 = {
  id: string;
  prompt: string;
  /** خيارات الاختيار (للأنواع classify / fillBe / choose) */
  options?: string[];
  /** الإجابة النموذجية */
  answer: string;
  /** شرح لماذا هذه الإجابة */
  why: string;
  /** للنوع analyse: الأجزاء الثلاثة */
  parts?: { subject: string; verb: string; object: string };
};

export type PracticeGroup57 = {
  id: string;
  kind: PracticeKind57;
  title: string;
  instruction: string;
  items: PracticeItem57[];
};

const classify = (id: string, prompt: string, answer: string, why: string): PracticeItem57 => ({
  id,
  prompt,
  options: ["Active", "Passive"],
  answer,
  why,
});

const analyse = (
  id: string,
  prompt: string,
  subject: string,
  verb: string,
  object: string,
): PracticeItem57 => ({
  id,
  prompt,
  parts: { subject, verb, object },
  answer: `Subject: ${subject} · Verb: ${verb} · Object: ${object}`,
  why: `من قام بالفعل؟ ${subject}. ما الحدث؟ ${verb}. على ماذا وقع؟ ${object}. المفعول به هو ما سننقله إلى بداية الجملة عند التحويل.`,
});

export const PRACTICE_GROUPS_57: PracticeGroup57[] = [
  {
    id: "practice-1",
    kind: "classify",
    title: "التمرين الأول: حدد Active أم Passive",
    instruction: "اقرأ كل جملة، وحدّد هل هي Active أم Passive. اسأل نفسك: هل تبدأ الجملة بمن قام بالفعل أم بما وقع عليه؟",
    items: [
      classify("p1-1", "The teacher explains the lesson.", "Active", "الفاعل The teacher يقوم بالفعل، والجملة تبدأ به."),
      classify("p1-2", "The lesson is explained by the teacher.", "Passive", "التركيز على الدرس. التركيب Object + be + V3 موجود: is explained."),
      classify("p1-3", "English is spoken in many countries.", "Passive", "التركيز على اللغة الإنجليزية، وقد حُذف الفاعل الأصلي لأنه غير مهم."),
      classify("p1-4", "My father repairs the car.", "Active", "الأب يقوم بالإصلاح، والجملة تبدأ به."),
      classify("p1-5", "The windows are cleaned every week.", "Passive", "النوافذ هي التي يقع عليها فعل التنظيف، والتركيب are cleaned."),
      classify("p1-6", "The company produces computers.", "Active", "الشركة تقوم بالإنتاج، والجملة تبدأ بها."),
      classify("p1-7", "The food is prepared by the chef.", "Passive", "الطعام هو محور الجملة، والتركيب is prepared."),
      classify("p1-8", "The students write essays.", "Active", "الطلاب يقومون بالكتابة، والجملة تبدأ بهم."),
      classify("p1-9", "The letters are delivered every morning.", "Passive", "الرسائل هي التي يتم تسليمها، والتركيب are delivered."),
      classify("p1-10", "Someone opens the shop at 9 a.m.", "Active", "Someone هو الفاعل الذي يقوم بفتح المتجر."),
    ],
  },
  {
    id: "practice-2",
    kind: "analyse",
    title: "التمرين الثاني: حدد الفاعل والفعل والمفعول به",
    instruction: "اختر لكل جملة ثلاثة أجزاء: Subject ثم Verb ثم Object. هذا التحليل هو نصف طريق التحويل.",
    items: [
      analyse("p2-1", "The boy kicks the ball.", "The boy", "kicks", "the ball"),
      analyse("p2-2", "My mother prepares dinner.", "My mother", "prepares", "dinner"),
      analyse("p2-3", "The workers build houses.", "The workers", "build", "houses"),
      analyse("p2-4", "The teacher corrects the tests.", "The teacher", "corrects", "the tests"),
      analyse("p2-5", "The company sells cars.", "The company", "sells", "cars"),
    ],
  },
  {
    id: "practice-3",
    kind: "transform",
    title: "التمرين الثالث: حوّل من Active إلى Passive",
    instruction: "طبّق الخطوات الخمس: انقل المفعول إلى البداية، اختر be حسب الفاعل الجديد، ثم V3، ثم by عند الحاجة.",
    items: [
      {
        id: "p3-1",
        prompt: "Ali cleans the room.",
        answer: "The room is cleaned by Ali.",
        why: "نقلنا The room إلى البداية، واستخدمنا is لأنها مفرد، ثم cleaned.",
      },
      {
        id: "p3-2",
        prompt: "Sara writes a letter.",
        answer: "A letter is written by Sara.",
        why: "الفعل write تصريفه الثالث written.",
      },
      {
        id: "p3-3",
        prompt: "The students use computers.",
        answer: "Computers are used by the students.",
        why: "استخدمنا are لأن Computers جمع.",
      },
      {
        id: "p3-4",
        prompt: "My mother prepares breakfast.",
        answer: "Breakfast is prepared by my mother.",
        why: "Breakfast مفرد في هذا الاستخدام، لذلك استخدمنا is.",
      },
      {
        id: "p3-5",
        prompt: "The workers build houses.",
        answer: "Houses are built by the workers.",
        why: "الفعل build تصريفه الثالث built.",
      },
      {
        id: "p3-6",
        prompt: "The teacher explains the lesson.",
        answer: "The lesson is explained by the teacher.",
        why: "الفعل explain تصريفه الثالث explained.",
      },
      {
        id: "p3-7",
        prompt: "The company produces cars.",
        answer: "Cars are produced by the company.",
        why: "Cars جمع، لذلك are.",
      },
      {
        id: "p3-8",
        prompt: "They sell these products online.",
        answer: "These products are sold online.",
        why: "الفعل sell تصريفه الثالث sold. حذفنا by them لأن الفاعل غير مهم هنا.",
      },
      {
        id: "p3-9",
        prompt: "The chef cooks the meals.",
        answer: "The meals are cooked by the chef.",
        why: "Meals جمع، لذلك are.",
      },
      {
        id: "p3-10",
        prompt: "People speak English in many countries.",
        answer: "English is spoken in many countries.",
        why: "الفعل speak تصريفه الثالث spoken. حذفنا الفاعل الأصلي لأنه غير مهم.",
      },
    ],
  },
  {
    id: "practice-4",
    kind: "reverse",
    title: "التمرين الرابع: حوّل من Passive إلى Active",
    instruction: "اعكس الاتجاه: by + الفاعل يصبح الفاعل، وV3 يعود إلى المضارع البسيط المناسب للفاعل.",
    items: [
      { id: "p4-1", prompt: "The room is cleaned by Ali.", answer: "Ali cleans the room.", why: "by Ali ← الفاعل Ali، وis cleaned ← cleans." },
      { id: "p4-2", prompt: "The letter is written by Sara.", answer: "Sara writes the letter.", why: "Sara مفرد ⇒ نضيف s: writes." },
      { id: "p4-3", prompt: "The cars are repaired by the workers.", answer: "The workers repair the cars.", why: "الفاعل جمع ⇒ الفعل بلا s: repair." },
      { id: "p4-4", prompt: "English is taught by the teacher.", answer: "The teacher teaches English.", why: "الفعل teach مع he/she/it نضيف es: teaches." },
      { id: "p4-5", prompt: "The food is prepared by my mother.", answer: "My mother prepares the food.", why: "My mother = she ⇒ prepares." },
      { id: "p4-6", prompt: "The computers are used by the students.", answer: "The students use the computers.", why: "الفاعل جمع ⇒ use بلا s." },
      { id: "p4-7", prompt: "The house is painted by my father.", answer: "My father paints the house.", why: "My father = he ⇒ paints." },
      { id: "p4-8", prompt: "The books are sold by the shop.", answer: "The shop sells the books.", why: "The shop = it ⇒ sells." },
    ],
  },
  {
    id: "practice-5",
    kind: "fillBe",
    title: "التمرين الخامس: أكمل باستخدام am / is / are",
    instruction: "لا تنظر إلى الفاعل الأصلي في الجملة؛ انظر إلى المفعول به الذي أصبح في بداية الجملة.",
    items: [
      { id: "p5-1", prompt: "The room ______ cleaned every day.", options: ["am", "is", "are"], answer: "is", why: "The room مفرد ⇒ is." },
      { id: "p5-2", prompt: "These books ______ sold online.", options: ["am", "is", "are"], answer: "are", why: "These books جمع ⇒ are." },
      { id: "p5-3", prompt: "English ______ spoken here.", options: ["am", "is", "are"], answer: "is", why: "English اسم مفرد غير معدود ⇒ is." },
      { id: "p5-4", prompt: "I ______ invited to the party.", options: ["am", "is", "are"], answer: "am", why: "I تأخذ am دائمًا." },
      { id: "p5-5", prompt: "The windows ______ opened every morning.", options: ["am", "is", "are"], answer: "are", why: "The windows جمع ⇒ are." },
      { id: "p5-6", prompt: "The food ______ prepared by the chef.", options: ["am", "is", "are"], answer: "is", why: "The food مفرد غير معدود ⇒ is." },
      { id: "p5-7", prompt: "We ______ taught English at school.", options: ["am", "is", "are"], answer: "are", why: "We تأخذ are." },
      { id: "p5-8", prompt: "This car ______ made in Germany.", options: ["am", "is", "are"], answer: "is", why: "This car مفرد ⇒ is." },
      { id: "p5-9", prompt: "The letters ______ delivered every morning.", options: ["am", "is", "are"], answer: "are", why: "The letters جمع ⇒ are." },
      { id: "p5-10", prompt: "The homework ______ checked by the teacher.", options: ["am", "is", "are"], answer: "is", why: "The homework اسم مفرد غير معدود ⇒ is." },
    ],
  },
  {
    id: "practice-6",
    kind: "fillV3",
    title: "التمرين السادس: أكمل باستخدام V3",
    instruction: "الفعل بين القوسين بصيغته الأساسية. اكتب التصريف الثالث فقط — لا V1 ولا V2.",
    items: [
      { id: "p6-1", prompt: "The letter is ______ (write) by Sara.", answer: "written", why: "write ← wrote ← written." },
      { id: "p6-2", prompt: "The house is ______ (build) by the workers.", answer: "built", why: "build ← built ← built." },
      { id: "p6-3", prompt: "The food is ______ (make) by my mother.", answer: "made", why: "make ← made ← made." },
      { id: "p6-4", prompt: "English is ______ (speak) in many countries.", answer: "spoken", why: "speak ← spoke ← spoken." },
      { id: "p6-5", prompt: "The car is ______ (repair) by the mechanic.", answer: "repaired", why: "repair فعل منتظم ⇒ repaired." },
      { id: "p6-6", prompt: "The books are ______ (sell) in this shop.", answer: "sold", why: "sell ← sold ← sold." },
      { id: "p6-7", prompt: "The window is ______ (break) by the boy.", answer: "broken", why: "break ← broke ← broken." },
      { id: "p6-8", prompt: "The homework is ______ (do) by the students.", answer: "done", why: "do ← did ← done." },
      { id: "p6-9", prompt: "The gifts are ______ (give) to the children.", answer: "given", why: "give ← gave ← given." },
      { id: "p6-10", prompt: "The movie is ______ (watch) by millions of people.", answer: "watched", why: "watch فعل منتظم ⇒ watched." },
    ],
  },
  {
    id: "practice-7",
    kind: "negate",
    title: "التمرين السابع: حوّل الجمل إلى النفي",
    instruction: "ضع not بعد فعل be مباشرة (أو استخدم الاختصار isn't / aren't)، ولا تغيّر مكان V3.",
    items: [
      { id: "p7-1", prompt: "The room is cleaned every day.", answer: "The room isn't cleaned every day.", why: "is not ← isn't، وتأتي قبل cleaned. (الصيغة الكاملة The room is not cleaned every day مقبولة أيضًا.)" },
      { id: "p7-2", prompt: "English is spoken here.", answer: "English isn't spoken here.", why: "الفاعل English مفرد ⇒ is not ← isn't." },
      { id: "p7-3", prompt: "The computers are used by students.", answer: "The computers aren't used by students.", why: "are not ← aren't، والجمع يبقى are." },
      { id: "p7-4", prompt: "The letters are delivered on Sundays.", answer: "The letters aren't delivered on Sundays.", why: "الرسائل جمع ⇒ are not ← aren't." },
      { id: "p7-5", prompt: "The food is prepared by the chef.", answer: "The food isn't prepared by the chef.", why: "is not ← isn't، وby the chef تبقى كما هي." },
    ],
  },
  {
    id: "practice-8",
    kind: "question",
    title: "التمرين الثامن: حوّل الجمل إلى أسئلة",
    instruction: "انقل فعل be إلى بداية السؤال، واترك V3 بعد الفاعل، ثم ضع علامة الاستفهام.",
    items: [
      { id: "p8-1", prompt: "The room is cleaned every day.", answer: "Is the room cleaned every day?", why: "is انتقلت إلى البداية، والبقية كما هي." },
      { id: "p8-2", prompt: "English is taught at this school.", answer: "Is English taught at this school?", why: "English مفرد ⇒ Is." },
      { id: "p8-3", prompt: "These cars are made in Japan.", answer: "Are these cars made in Japan?", why: "الجمع ⇒ Are في البداية." },
      { id: "p8-4", prompt: "The documents are checked carefully.", answer: "Are the documents checked carefully?", why: "are انتقلت إلى البداية." },
      { id: "p8-5", prompt: "The food is prepared by the chef.", answer: "Is the food prepared by the chef?", why: "is انتقلت إلى البداية، وby the chef بقيت في نهايتها." },
    ],
  },
  {
    id: "practice-9",
    kind: "choose",
    title: "التمرين التاسع: اختر الإجابة الصحيحة",
    instruction: "خيار واحد فقط صحيح. تحقّق من أمرين: هل be يناسب الفاعل الجديد؟ وهل الفعل بعد be في صيغة V3؟",
    items: [
      {
        id: "p9-1",
        prompt: "The books ______ by the students.",
        options: ["A. is read", "B. are read", "C. are reading", "D. is reading"],
        answer: "B. are read",
        why: "الفاعل الجديد The books جمع ⇒ are، وبعد be نستخدم V3 read.",
      },
      {
        id: "p9-2",
        prompt: "English ______ in many countries.",
        options: ["A. speak", "B. speaks", "C. is spoken", "D. are spoken"],
        answer: "C. is spoken",
        why: "English مفرد غير معدود ⇒ is، وspeak تصريفه الثالث spoken.",
      },
      {
        id: "p9-3",
        prompt: "The room ______ every morning.",
        options: ["A. cleans", "B. is cleaned", "C. are cleaned", "D. cleaning"],
        answer: "B. is cleaned",
        why: "The room مفرد ⇒ is، وclean تصريفه الثالث cleaned.",
      },
      {
        id: "p9-4",
        prompt: "These cars ______ in Germany.",
        options: ["A. is made", "B. are made", "C. makes", "D. made"],
        answer: "B. are made",
        why: "These cars جمع ⇒ are، وmake تصريفه الثالث made.",
      },
      {
        id: "p9-5",
        prompt: "The letter ______ by Sara.",
        options: ["A. is written", "B. are written", "C. writes", "D. writing"],
        answer: "A. is written",
        why: "The letter مفرد ⇒ is، وwrite تصريفه الثالث written.",
      },
      {
        id: "p9-6",
        prompt: "The windows ______ every week.",
        options: ["A. is washed", "B. are washed", "C. washes", "D. washing"],
        answer: "B. are washed",
        why: "The windows جمع ⇒ are، وwash ⇒ washed.",
      },
      {
        id: "p9-7",
        prompt: "The food ______ by my mother.",
        options: ["A. are prepared", "B. prepares", "C. is prepared", "D. preparing"],
        answer: "C. is prepared",
        why: "The food مفرد غير معدود ⇒ is، وprepare ⇒ prepared.",
      },
      {
        id: "p9-8",
        prompt: "The homework ______ by the teacher.",
        options: ["A. is checked", "B. are checked", "C. checks", "D. checking"],
        answer: "A. is checked",
        why: "The homework مفرد غير معدود ⇒ is، وcheck ⇒ checked.",
      },
    ],
  },
];

/* ============================================================
   التمرين العاشر — بقية أسئلة الاختبار الأصلي (25 سؤالًا)
   15 سؤالًا اختيرت للاختبار التفاعلي، وهذه العشرة الأخرى تُدرَّب هنا.
   ============================================================ */


/* ============================================================
   التمرين العاشر — بقية أسئلة الاختبار الأصلي (25 سؤالًا)
   اختير 15 سؤالًا للاختبار التفاعلي، وهذه بقية أسئلة التقييم الأصلي
   بنصوصها وخياراتها كما وردت — فلا يُفقد سؤال من المصدر.
   ============================================================ */

export const EXTRA_GROUP_57: PracticeGroup57 = {
  id: "practice-10",
  kind: "choose",
  title: "التمرين العاشر: تقييم الدرس الأصلي — الأسئلة 25",
  instruction:
    "هذه أسئلة تقييم الدرس الأصلي كما وردت في المصدر: 15 سؤالًا منها موجودة أيضًا في الاختبار التفاعلي، و10 أسئلة إضافية هنا. حلّها بالترتيب لتغطّي الأسئلة الخمسة والعشرين كلها بنصوصها الأصلية.",
  items: [
    {
      id: "x01",
      prompt: "The room ______ every day.",
      options: ["A. clean", "B. cleans", "C. is cleaned", "D. are cleaned"],
      answer: "C. is cleaned",
      why: "الغرفة مفرد ⇒ is، وclean ⇒ cleaned. (السؤال ① في التقييم الأصلي)",
    },
    {
      id: "x03",
      prompt: "These products ______ online.",
      options: ["A. sells", "B. is sold", "C. are sold", "D. selling"],
      answer: "C. are sold",
      why: "These products جمع ⇒ are، وsell ⇒ sold. (السؤال ③)",
    },
    {
      id: "x04",
      prompt: "The letter ______ by my sister.",
      options: ["A. is written", "B. are written", "C. writes", "D. writing"],
      answer: "A. is written",
      why: "The letter مفرد ⇒ is، وwrite ⇒ written. (السؤال ④)",
    },
    {
      id: "x05",
      prompt: "The houses ______ by the workers.",
      options: ["A. is built", "B. are built", "C. builds", "D. building"],
      answer: "B. are built",
      why: "The houses جمع ⇒ are، وbuild تصريفه الثالث built. (السؤال ⑤ في التقييم الأصلي)",
    },
    {
      id: "x06",
      prompt: "The food ______ by the chef.",
      options: ["A. prepare", "B. prepares", "C. is prepared", "D. are prepared"],
      answer: "C. is prepared",
      why: "The food مفرد غير معدود ⇒ is، وprepare ⇒ prepared. (السؤال ⑥)",
    },
    {
      id: "x08",
      prompt: "The car ______ by my father.",
      options: ["A. repairs", "B. is repaired", "C. are repaired", "D. repairing"],
      answer: "B. is repaired",
      why: "The car مفرد ⇒ is، وrepair فعل منتظم ⇒ repaired. (السؤال ⑧)",
    },
    {
      id: "x09",
      prompt: "The books ______ (read) by the students.",
      options: ["are read", "is read", "reads", "reading"],
      answer: "are read",
      why: "The books جمع ⇒ are، وread تصريفها الثالث read (نفس الشكل). (السؤال ⑨)",
    },
    {
      id: "x10",
      prompt: "The house ______ (paint) every year.",
      options: ["is painted", "are painted", "paints", "painting"],
      answer: "is painted",
      why: "The house مفرد ⇒ is، وpaint ⇒ painted. (السؤال ⑩)",
    },
    {
      id: "x11",
      prompt: "The computers ______ (use) by the teachers.",
      options: ["are used", "is used", "uses", "using"],
      answer: "are used",
      why: "The computers جمع ⇒ are، وuse ⇒ used. (السؤال ⑪)",
    },
    {
      id: "x12",
      prompt: "English ______ (teach) at this school.",
      options: ["is taught", "are taught", "teaches", "teaching"],
      answer: "is taught",
      why: "English مفرد ⇒ is، وteach تصريفه الثالث taught. (السؤال ⑫)",
    },
    {
      id: "x13",
      prompt: "The meals ______ (prepare) in the kitchen.",
      options: ["are prepared", "is prepared", "prepares", "preparing"],
      answer: "are prepared",
      why: "The meals جمع ⇒ are، وprepare ⇒ prepared. (السؤال ⑬)",
    },
    {
      id: "x15",
      prompt: "حوّل إلى Passive: My mother cooks dinner.",
      options: [
        "A. Dinner is cooked by my mother.",
        "B. Dinner are cooked by my mother.",
        "C. My mother is cooked by dinner.",
        "D. Dinner cooks by my mother.",
      ],
      answer: "A. Dinner is cooked by my mother.",
      why: "dinner مفرد ⇒ is، وcook ⇒ cooked، ثم by my mother. (السؤال ⑮)",
    },
    {
      id: "x16",
      prompt: "حوّل إلى Passive: The workers build houses.",
      options: [
        "A. Houses are built by the workers.",
        "B. Houses is built by the workers.",
        "C. The workers are built by houses.",
        "D. Houses are build by the workers.",
      ],
      answer: "A. Houses are built by the workers.",
      why: "houses جمع ⇒ are، وbuild ⇒ built. (السؤال ⑯)",
    },
    {
      id: "x17",
      prompt: "حوّل إلى Passive: Sara writes the letters.",
      options: [
        "A. The letters are written by Sara.",
        "B. The letters is written by Sara.",
        "C. Sara is written by the letters.",
        "D. The letters are wrote by Sara.",
      ],
      answer: "A. The letters are written by Sara.",
      why: "the letters جمع ⇒ are، وwrite ⇒ written (لا wrote). (السؤال ⑰)",
    },
    {
      id: "x18",
      prompt: "حوّل إلى Passive: People use smartphones every day.",
      options: [
        "A. Smartphones are used every day.",
        "B. Smartphones is used every day.",
        "C. Smartphones are using every day.",
        "D. Every day smartphones use.",
      ],
      answer: "A. Smartphones are used every day.",
      why: "المفعول به Smartphones جمع ⇒ are، وuse ⇒ used، ويُحذف by people لأنه غير مهم. (السؤال ⑱)",
    },
    {
      id: "x23",
      prompt: "لماذا نستخدم Passive Voice عندما لا نعرف من قام بالفعل؟",
      options: [
        "A. لأن المبني للمجهول أسهل نحويًا دائمًا.",
        "B. لأننا نريد التركيز على الحدث أو الشيء الذي وقع عليه الفعل دون ذكر فاعل مجهول.",
        "C. لأن Active Voice ممنوع في اللغة الرسمية.",
        "D. لأن by تصبح إلزامية في هذه الحالة.",
      ],
      answer: "B. لأننا نريد التركيز على الحدث أو الشيء الذي وقع عليه الفعل دون ذكر فاعل مجهول.",
      why: "المبني للمجهول خيار تركيز لا قاعدة إلزامية، وby تبقى اختيارية. (السؤال ㉓)",
    },
    {
      id: "x19",
      prompt: "صحّح الخطأ: The room are cleaned every day.",
      options: [
        "A. The room is cleaned every day.",
        "B. The room are clean every day.",
        "C. The rooms is cleaned every day.",
        "D. الجملة صحيحة كما هي",
      ],
      answer: "A. The room is cleaned every day.",
      why: "The room مفرد ⇒ is لا are. (السؤال ⑲)",
    },
    {
      id: "x20",
      prompt: "صحّح الخطأ: English is spoke in many countries.",
      options: [
        "A. English is spoken in many countries.",
        "B. English is speak in many countries.",
        "C. English are spoken in many countries.",
        "D. الجملة صحيحة كما هي",
      ],
      answer: "A. English is spoken in many countries.",
      why: "بعد is نستخدم V3: speak ← spoke ← spoken. (السؤال ⑳)",
    },
    {
      id: "x21",
      prompt: "صحّح الخطأ: The books is sold online.",
      options: [
        "A. The books are sold online.",
        "B. The books is sell online.",
        "C. The book are sold online.",
        "D. الجملة صحيحة كما هي",
      ],
      answer: "A. The books are sold online.",
      why: "The books جمع ⇒ are. (السؤال ㉑)",
    },
    {
      id: "x22",
      prompt: "صحّح الخطأ: The window is broke by the boy.",
      options: [
        "A. The window is broken by the boy.",
        "B. The window is break by the boy.",
        "C. The window are broken by the boy.",
        "D. الجملة صحيحة كما هي",
      ],
      answer: "A. The window is broken by the boy.",
      why: "بعد is نستخدم V3: break ← broke ← broken. (السؤال ㉒)",
    },
    {
      id: "x24",
      prompt: "ما التصريف الثالث للفعل write؟",
      options: ["A. wrote", "B. written", "C. writed", "D. writing"],
      answer: "B. written",
      why: "write ← wrote ← written. (السؤال ㉔)",
    },
    {
      id: "x07",
      prompt: "The windows ______ every morning.",
      options: ["A. clean", "B. cleans", "C. is cleaned", "D. are cleaned"],
      answer: "D. are cleaned",
      why: "The windows جمع ⇒ are، وclean ⇒ cleaned. (السؤال ⑦ في التقييم الأصلي)",
    },
    {
      id: "x14",
      prompt: "أي جملة في Passive Voice؟",
      options: [
        "A. The teacher explains the lesson.",
        "B. The lesson is explained by the teacher.",
        "C. The teacher is explaining the lesson.",
        "D. The lesson explains the teacher.",
      ],
      answer: "B. The lesson is explained by the teacher.",
      why: "التركيب Object + be + V3 = The lesson + is + explained، ثم by the teacher. الخيارات الأخرى إما Active أو ترتيب مقلوب. (السؤال ⑭)",
    },
    {
      id: "x25",
      prompt: "هل يمكن تحويل «The baby sleeps.» إلى Passive؟ ولماذا؟",
      options: [
        "A. نعم: The baby is slept.",
        "B. نعم: The baby is sleeping.",
        "C. لا، لأن sleep فعل لازم لا يأخذ مفعولًا به مباشرًا في هذه الجملة.",
        "D. لا، لأن الجملة في المضارع البسيط.",
      ],
      answer: "C. لا، لأن sleep فعل لازم لا يأخذ مفعولًا به مباشرًا في هذه الجملة.",
      why: "لا يوجد مفعول به يمكن نقله إلى بداية الجملة، فلا يمكن بناء Passive بالطريقة المعتادة. (السؤال ㉕)",
    },
  ],
};

PRACTICE_GROUPS_57.push(EXTRA_GROUP_57);
