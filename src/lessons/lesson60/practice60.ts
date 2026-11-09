// ============================================================
// Lesson 60 — التدريبات الثمانية الأصلية بحلولها وتفسيراتها
// 1) Direct → Reported (10) · 2) اختيار من متعدد (10)
// 3) صحح الأخطاء (8) · 4) كلمات الزمان والمكان (10)
// 5) حوّل باستخدام TOLD (5) · 6) نغيّر الزمن أم نُبقيه؟ (5)
// 7) ترجم إلى الإنجليزية (10) · 8) حوّل الفقرة (1)
// ثم الاختبار الأصلي: 25 سؤالًا في أربعة أقسام + مفتاح كامل.
// ============================================================

export type PracticeItem60 = {
  prompt: string;
  /** ملاحظة سياقية تسبق الإجابة (مثل «المقصود أن…») */
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  /** ترجمة عربية للإجابة النهائية */
  ar?: string;
};

export type PracticeGroup60 = {
  id: string;
  title: string;
  instruction: string;
  items: PracticeItem60[];
};

export const PRACTICES_60: PracticeGroup60[] = [
  {
    id: "p1",
    title: "التدريب الأول: حوّل من Direct إلى Reported Speech",
    instruction: "حوّل الجمل التالية إلى الكلام المنقول — اكتب الجملة كاملة، ثم تحقّق لترى التغييرات.",
    items: [
      {
        prompt: 'Ali said, "I am happy."',
        answer: "Ali said that he was happy.",
        why: "التغييرات: I → he · am → was.",
        ar: "قال علي إنه سعيد.",
      },
      {
        prompt: 'Sara said, "I like reading."',
        answer: "Sara said that she liked reading.",
        why: "التغييرات: I → she · like → liked.",
        ar: "قالت سارة إنها تحب القراءة.",
      },
      {
        prompt: 'Ahmed said, "I am studying English."',
        answer: "Ahmed said that he was studying English.",
        why: "التغييرات: I → he · am studying → was studying.",
        ar: "قال أحمد إنه كان يدرس الإنجليزية.",
      },
      {
        prompt: 'They said, "We live in Ankara."',
        answer: "They said that they lived in Ankara.",
        why: "التغييرات: We → they · live → lived.",
        ar: "قالوا إنهم يعيشون في أنقرة.",
      },
      {
        prompt: 'Mona said, "I have finished my homework."',
        answer: "Mona said that she had finished her homework.",
        why: "التغييرات: I → she · have finished → had finished.",
        ar: "قالت منى إنها أنهت واجبها.",
      },
      {
        prompt: 'Omar said, "I bought a new phone."',
        answer: "Omar said that he had bought a new phone.",
        why: "التغييرات: I → he · bought → had bought.",
        ar: "قال عمر إنه اشترى هاتفًا جديدًا.",
      },
      {
        prompt: 'The boys said, "We were playing football."',
        answer: "The boys said that they had been playing football.",
        why: "التغييرات: We → they · were playing → had been playing.",
        ar: "قال الأولاد إنهم كانوا يلعبون كرة القدم.",
      },
      {
        prompt: 'She said, "I will visit my grandmother."',
        answer: "She said that she would visit her grandmother.",
        why: "التغييرات: I → she · will → would.",
        ar: "قالت إنها ستزور جدتها.",
      },
      {
        prompt: 'He said, "I can drive a car."',
        answer: "He said that he could drive a car.",
        why: "التغييرات: I → he · can → could.",
        ar: "قال إنه يستطيع قيادة سيارة.",
      },
      {
        prompt: 'They said, "We may travel tomorrow."',
        answer: "They said that they might travel the following day.",
        why: "التغييرات: We → they · may → might · tomorrow → the following day.",
        ar: "قالوا إنهم قد يسافرون في اليوم التالي.",
      },
    ],
  },
  {
    id: "p2",
    title: "التدريب الثاني: اختر الإجابة الصحيحة",
    instruction: "اختر الصيغة الصحيحة لإكمال الجملة المنقولة، ثم تحقّق لتقرأ السبب.",
    items: [
      {
        prompt: "He said that he ______ tired.",
        options: ["is", "was", "were"],
        answer: "was",
        why: "لأن am تتحول إلى was.",
      },
      {
        prompt: "Sara said that she ______ English.",
        options: ["likes", "liked", "liking"],
        answer: "liked",
        why: "لأن Present Simple يتحول إلى Past Simple.",
      },
      {
        prompt: "They said that they ______ watching TV.",
        options: ["were", "was", "are"],
        answer: "were",
        why: "لأن are watching تتحول إلى were watching.",
      },
      {
        prompt: "Ali said that he ______ finished his work.",
        options: ["has", "had", "have"],
        answer: "had",
        why: "لأن has finished تتحول إلى had finished.",
      },
      {
        prompt: "She said that she ______ visit me.",
        options: ["will", "would", "can"],
        answer: "would",
        why: "لأن will تتحول إلى would.",
      },
      {
        prompt: "He told me that he ______ swim.",
        options: ["can", "could", "may"],
        answer: "could",
        why: "لأن can تتحول إلى could.",
      },
      {
        prompt: "They said that they ______ travel the following day.",
        options: ["might", "may", "must"],
        answer: "might",
        why: "لأن may تتحول إلى might.",
      },
      {
        prompt: "The teacher said that the Earth ______ around the Sun.",
        options: ["revolved", "revolves", "revolving"],
        answer: "revolves",
        why: "لأنها حقيقة علمية ثابتة.",
      },
      {
        prompt: "My father told me that I ______ study harder.",
        options: ["had to", "have to", "must to"],
        answer: "had to",
        why: "لأن must التي تعبر عن الالتزام تتحول غالبًا إلى had to.",
      },
      {
        prompt: "She said that she ______ the film the previous day.",
        options: ["watched", "had watched", "has watched"],
        answer: "had watched",
        why: "لأن Past Simple يتحول إلى Past Perfect.",
      },
    ],
  },
  {
    id: "p3",
    title: "التدريب الثالث: صحح الأخطاء",
    instruction: "كل جملة تحمل خطأً واحدًا — اكتب الصيغة الصحيحة ثم تحقّق.",
    items: [
      {
        prompt: "Ali said that I was tired.",
        hint: "المقصود أن عليًا يتحدث عن نفسه.",
        answer: "Ali said that he was tired.",
        why: "لأن I تشير إلى علي، لذلك تصبح he.",
      },
      {
        prompt: "Sara told that she was happy.",
        answer: "Sara said that she was happy.",
        why: "لأن told تحتاج إلى شخص بعدها. تصحيح آخر ممكن: Sara told me that she was happy.",
      },
      {
        prompt: "He said me that he was busy.",
        answer: "He told me that he was busy.",
        why: "said لا يأتي بعدها الشخص مباشرةً. تصحيح آخر ممكن: He said to me that he was busy.",
      },
      {
        prompt: "They said that we were ready.",
        hint: "المقصود أنهم يتحدثون عن أنفسهم.",
        answer: "They said that they were ready.",
        why: "لأن we تشير إلى المجموعة التي قالت الجملة، فتصبح they.",
      },
      {
        prompt: "Mona said that she has finished her work.",
        answer: "Mona said that she had finished her work.",
        why: "لأن has finished تتحول إلى had finished.",
      },
      {
        prompt: "He said that he will travel the next day.",
        answer: "He said that he would travel the following day.",
        why: "لأن will تتحول إلى would.",
      },
      {
        prompt: "The teacher said that water boiled at 100°C.",
        hint: "المقصود حقيقة علمية عامة.",
        answer: "The teacher said that water boils at 100°C.",
        why: "لأنها حقيقة علمية ثابتة.",
      },
      {
        prompt: "Sara said that she was studying here that day.",
        hint: "المقصود أنها كانت تدرس في مكان آخر وقت النقل.",
        answer: "Sara said that she was studying there that day.",
        why: "لأن here تتحول إلى there عندما تغير المكان.",
      },
    ],
  },
  {
    id: "p4",
    title: "التدريب الرابع: غيّر كلمات الزمان والمكان",
    instruction: "حوّل الكلمات بين القوسين إلى الصيغة المناسبة في الكلام المنقول.",
    items: [
      { prompt: "now → ______", answer: "then", why: "now تتحول إلى then." },
      { prompt: "tomorrow → ______", answer: "the following day", why: "tomorrow → the following day / the next day." },
      { prompt: "yesterday → ______", answer: "the previous day", why: "yesterday → the previous day / the day before." },
      { prompt: "today → ______", answer: "that day", why: "today → that day." },
      { prompt: "here → ______", answer: "there", why: "here → there." },
      { prompt: "this → ______", answer: "that", why: "this → that." },
      { prompt: "these → ______", answer: "those", why: "these → those." },
      { prompt: "next week → ______", answer: "the following week", why: "next week → the following week." },
      { prompt: "last year → ______", answer: "the previous year", why: "last year → the previous year." },
      { prompt: "two days ago → ______", answer: "two days before", why: "two days ago → two days before." },
    ],
  },
  {
    id: "p5",
    title: "التدريب الخامس: حوّل الجمل باستخدام TOLD",
    instruction: "أعد صياغة كل جملة بفعل النقل told بعد تحديد الشخص الذي تلقّى الكلام.",
    items: [
      {
        prompt: 'Ali said to me, "I am tired."',
        answer: "Ali told me that he was tired.",
        why: "said to me → told me · am → was.",
        ar: "أخبرني علي بأنه متعب.",
      },
      {
        prompt: 'Sara said to her mother, "I need help."',
        answer: "Sara told her mother that she needed help.",
        why: "said to her mother → told her mother · need → needed.",
        ar: "أخبرت سارة والدتها بأنها تحتاج إلى المساعدة.",
      },
      {
        prompt: 'The teacher said to the students, "You are doing well."',
        answer: "The teacher told the students that they were doing well.",
        why: "You → they (المخاطَبون هم الطلاب) · are doing → were doing.",
        ar: "أخبر المعلم الطلاب بأنهم يؤدون أداءً جيدًا.",
      },
      {
        prompt: 'My father said to me, "You must study."',
        answer: "My father told me that I had to study.",
        why: "You → I (المخاطَب هو الراوي) · must → had to للالتزام.",
        ar: "أخبرني أبي بأنه يجب عليّ الدراسة.",
      },
      {
        prompt: 'Omar said to his friend, "I will call you."',
        answer: "Omar told his friend that he would call him.",
        why: "will → would · you → him: لأن عمر كان يخاطب صديقه، وليس المتحدث الذي ينقل الكلام.",
        ar: "أخبر عمر صديقه بأنه سيتصل به.",
      },
    ],
  },
  {
    id: "p6",
    title: "التدريب السادس: هل نغير الزمن أم نُبقيه؟",
    instruction: "اختر النقل الصحيح لكل جملة — انتبه إلى الحقائق العلمية وإلى says في المضارع.",
    items: [
      {
        prompt: 'The teacher said, "The Earth revolves around the Sun."',
        options: [
          "The teacher said that the Earth revolved around the Sun.",
          "The teacher said that the Earth revolves around the Sun.",
        ],
        answer: "The teacher said that the Earth revolves around the Sun.",
        why: "لأنها حقيقة علمية ثابتة.",
      },
      {
        prompt: 'Sara says, "I am busy."',
        options: ["Sara says that she is busy.", "Sara says that she was busy."],
        answer: "Sara says that she is busy.",
        why: "لأن فعل النقل says في المضارع.",
      },
      {
        prompt: 'Ali said, "I am still a student."',
        hint: "إذا كان لا يزال طالبًا:",
        options: ["Ali said that he is still a student.", "Ali said that he had been a student."],
        answer: "Ali said that he is still a student.",
        why: "لأن المعلومة ما زالت صحيحة، ويمكن إبقاء المضارع.",
      },
      {
        prompt: 'The scientist said, "Water freezes at 0°C under standard pressure."',
        options: [
          "The scientist said that water freezes at 0°C under standard pressure.",
          "The scientist said that water froze at 0°C under standard pressure.",
        ],
        answer: "The scientist said that water freezes at 0°C under standard pressure.",
        why: "لأنها حقيقة علمية عامة.",
      },
      {
        prompt: 'He said, "I have lost my wallet."',
        options: ["He said that he has lost his wallet.", "He said that he had lost his wallet."],
        answer: "He said that he had lost his wallet.",
        why: "لأن Present Perfect يتحول غالبًا إلى Past Perfect بعد said.",
      },
    ],
  },
  {
    id: "p7",
    title: "التدريب السابع: ترجم إلى الإنجليزية باستخدام Reported Speech",
    instruction: "ترجم كل جملة ترجمة كاملة باستخدام الكلام المنقول بالقواعد التي تعلمتها.",
    items: [
      {
        prompt: "قال أحمد إنه متعب.",
        answer: "Ahmed said that he was tired.",
        why: "said that + Past Simple بعد الرجوع.",
      },
      {
        prompt: "قالت سارة إنها تحب الإنجليزية.",
        answer: "Sara said that she liked English.",
        why: "like → liked وI الأصلية تشير إلى سارة فتصبح she.",
      },
      {
        prompt: "أخبرني أبي بأنه يجب عليّ الدراسة.",
        answer: "My father told me that I had to study.",
        why: "told me + must → had to للالتزام.",
      },
      {
        prompt: "قالوا إنهم كانوا يشاهدون التلفاز.",
        answer: "They said that they had been watching TV.",
        why: "الماضي المستمر في النقل يُبنى على are watching في الأصل ← had been watching.",
      },
      {
        prompt: "قال علي إنه اشترى هاتفًا جديدًا.",
        answer: "Ali said that he had bought a new phone.",
        why: "Past Simple (bought) → Past Perfect (had bought).",
      },
      {
        prompt: "أخبرتني منى بأنها ستزورني في اليوم التالي.",
        answer: "Mona told me that she would visit me the following day.",
        why: "will → would · tomorrow → the following day.",
      },
      {
        prompt: "قال المعلم إن الأرض تدور حول الشمس.",
        answer: "The teacher said that the Earth revolves around the Sun.",
        why: "حقيقة علمية ثابتة تبقى في المضارع.",
      },
      {
        prompt: "قالوا إنهم قد يسافرون الأسبوع القادم.",
        answer: "They said that they might travel the following week.",
        why: "may → might · next week → the following week.",
      },
      {
        prompt: "أخبرني الطبيب بأنني يجب أن أرتاح.",
        answer: "The doctor told me that I had to rest.",
        why: "told me + must → had to للالتزام.",
      },
      {
        prompt: "قال عمر إنه كان يكتب رسالة.",
        answer: "Omar said that he had been writing a letter.",
        why: "الماضي المستمر المنقول يقابل was writing في الأصل ← had been writing.",
      },
    ],
  },
  {
    id: "p8",
    title: "التدريب الثامن: حوّل الفقرة إلى Reported Speech",
    instruction: "اقرأ الفقرة المباشرة التالية، ثم اكتبها كاملة بالكلام المنقول قبل كشف الحل.",
    items: [
      {
        prompt: 'Ahmed said, "I am preparing for my exams. I study every evening. I have finished two books, and I will complete the third book tomorrow. My teacher told me, \'You must work harder.\'"',
        answer:
          "Ahmed said that he was preparing for his exams. He added that he studied every evening. He said that he had finished two books and that he would complete the third book the following day. He also explained that his teacher had told him that he had to work harder.",
        why: "ما التغييرات التي حدثت؟ I → he · my → his · am preparing → was preparing · study → studied · have finished → had finished · will complete → would complete · tomorrow → the following day · you → he · must → had to.",
        ar: "قال أحمد إنه كان يستعد لامتحاناته. وأضاف أنه كان يدرس كل مساء. وقال إنه أنهى كتابين وإنه سيكمل الكتاب الثالث في اليوم التالي. كما أوضح أن معلمه أخبره بأنه كان عليه أن يعمل بجد أكبر.",
      },
    ],
  },
];

export const PRACTICE_TOTALS_60 = PRACTICES_60.reduce((n, group) => n + group.items.length, 0);

// ============================================================
// القسم الخامس عشر · الموضوعات 31–35:
// الاختبار الأصلي (25 سؤالًا في أربعة أقسام) + مفتاح الإجابة.
// ملاحظة تدقيق: في المصدر يحمل عنوان المفتاح الرقم 35، بينما
// تُرقَّم إجاباته ①–㉕؛ اعتمدنا ترقيمًا 1–25 مطابقًا للأسئلة.
// ============================================================

export type OriginalQuestion60 = {
  n: number;
  section: string;
  prompt: string;
  hint?: string;
  options?: string[];
  answer: string;
  why: string;
  ar?: string;
};

export const ORIGINAL_TEST_60: OriginalQuestion60[] = [
  // القسم الأول: اختر الإجابة الصحيحة (1–10)
  {
    n: 1,
    section: "اختر الإجابة الصحيحة",
    prompt: 'He said, "I am happy." → He said that he ______ happy.',
    options: ["is", "was", "were"],
    answer: "was",
    why: "لأن am تتحول إلى was.",
  },
  {
    n: 2,
    section: "اختر الإجابة الصحيحة",
    prompt: 'Sara said, "I like music." → Sara said that she ______ music.',
    options: ["liked", "likes", "liking"],
    answer: "liked",
    why: "لأن Present Simple يتحول إلى Past Simple.",
  },
  {
    n: 3,
    section: "اختر الإجابة الصحيحة",
    prompt: 'They said, "We are working." → They said that they ______ working.',
    options: ["are", "was", "were"],
    answer: "were",
    why: "لأن are working تتحول إلى were working.",
  },
  {
    n: 4,
    section: "اختر الإجابة الصحيحة",
    prompt: 'Ali said, "I have finished." → Ali said that he ______ finished.',
    options: ["had", "has", "have"],
    answer: "had",
    why: "لأن have finished تتحول إلى had finished.",
  },
  {
    n: 5,
    section: "اختر الإجابة الصحيحة",
    prompt: 'She said, "I bought a car." → She said that she ______ a car.',
    options: ["buys", "had bought", "has bought"],
    answer: "had bought",
    why: "لأن Past Simple يتحول غالبًا إلى Past Perfect.",
  },
  {
    n: 6,
    section: "اختر الإجابة الصحيحة",
    prompt: 'He said, "I will help you." → He said that he ______ help me.',
    options: ["will", "would", "can"],
    answer: "would",
    why: "لأن will تتحول إلى would.",
  },
  {
    n: 7,
    section: "اختر الإجابة الصحيحة",
    prompt: 'Mona said, "I can swim." → Mona said that she ______ swim.',
    options: ["can", "could", "may"],
    answer: "could",
    why: "لأن can تتحول إلى could.",
  },
  {
    n: 8,
    section: "اختر الإجابة الصحيحة",
    prompt: 'They said, "We may travel." → They said that they ______ travel.',
    options: ["might", "must", "should"],
    answer: "might",
    why: "لأن may تتحول إلى might.",
  },
  {
    n: 9,
    section: "اختر الإجابة الصحيحة",
    prompt: 'The teacher said, "Water boils at 100°C under standard pressure." → The teacher said that water ______ at 100°C under standard pressure.',
    options: ["boiled", "boils", "boiling"],
    answer: "boils",
    why: "لأنها حقيقة علمية ثابتة.",
  },
  {
    n: 10,
    section: "اختر الإجابة الصحيحة",
    prompt: 'He said, "I am busy now." → He said that he was busy ______.',
    options: ["tomorrow", "then", "yesterday"],
    answer: "then",
    why: "لأن now تتحول إلى then.",
  },
  // القسم الثاني: حوّل إلى Reported Speech (11–15)
  {
    n: 11,
    section: "حوّل إلى Reported Speech",
    prompt: 'Sara said, "I am studying English."',
    answer: "Sara said that she was studying English.",
    why: "I → she · am studying → was studying.",
    ar: "قالت سارة إنها كانت تدرس الإنجليزية.",
  },
  {
    n: 12,
    section: "حوّل إلى Reported Speech",
    prompt: 'Ahmed said, "I have lost my keys."',
    answer: "Ahmed said that he had lost his keys.",
    why: "I → he · have lost → had lost.",
    ar: "قال أحمد إنه فقد مفاتيحه.",
  },
  {
    n: 13,
    section: "حوّل إلى Reported Speech",
    prompt: 'They said, "We visited Ankara yesterday."',
    answer: "They said that they had visited Ankara the previous day.",
    why: "We → they · visited → had visited · yesterday → the previous day.",
    ar: "قالوا إنهم زاروا أنقرة في اليوم السابق.",
  },
  {
    n: 14,
    section: "حوّل إلى Reported Speech",
    prompt: 'My father said to me, "You must be careful."',
    answer: "My father told me that I had to be careful.",
    why: "said to me → told me · You → I · must → had to للالتزام.",
    ar: "أخبرني أبي بأنه يجب عليّ أن أكون حذرًا.",
  },
  {
    n: 15,
    section: "حوّل إلى Reported Speech",
    prompt: 'Omar said, "I will travel tomorrow."',
    answer: "Omar said that he would travel the following day.",
    why: "will → would · tomorrow → the following day.",
    ar: "قال عمر إنه سيسافر في اليوم التالي.",
  },
  // القسم الثالث: صحح الخطأ (16–20)
  {
    n: 16,
    section: "صحح الخطأ",
    prompt: "He told that he was tired.",
    answer: "He said that he was tired.",
    why: "صحيح أيضًا: He told me that he was tired. — told تحتاج شخصًا بعدها.",
  },
  {
    n: 17,
    section: "صحح الخطأ",
    prompt: "Sara said me that she was happy.",
    answer: "Sara told me that she was happy.",
    why: "صحيح أيضًا: Sara said to me that she was happy. — said لا يتبعها الشخص مباشرةً.",
  },
  {
    n: 18,
    section: "صحح الخطأ",
    prompt: "Ali said that I was busy.",
    hint: "المقصود أن عليًا يتحدث عن نفسه.",
    answer: "Ali said that he was busy.",
    why: "لأن I تشير إلى علي (المتحدث)، فتصبح he.",
  },
  {
    n: 19,
    section: "صحح الخطأ",
    prompt: "They said that we were ready.",
    hint: "المقصود أنهم يتحدثون عن أنفسهم.",
    answer: "They said that they were ready.",
    why: "لأن we تشير إلى المجموعة المتحدثة نفسها، فتصبح they.",
  },
  {
    n: 20,
    section: "صحح الخطأ",
    prompt: "The teacher said that the Earth revolved around the Sun.",
    hint: "المقصود حقيقة علمية ثابتة.",
    answer: "The teacher said that the Earth revolves around the Sun.",
    why: "لأنها حقيقة علمية ثابتة، فيُبقى الزمن في المضارع.",
  },
  // القسم الرابع: أكمل (21–25)
  { n: 21, section: "أكمل", prompt: "now → ______", answer: "then", why: "now → then." },
  { n: 22, section: "أكمل", prompt: "yesterday → ______", answer: "the previous day", why: "yesterday → the previous day / the day before." },
  { n: 23, section: "أكمل", prompt: "next week → ______", answer: "the following week", why: "next week → the following week." },
  { n: 24, section: "أكمل", prompt: "here → ______", answer: "there", why: "here → there." },
  { n: 25, section: "أكمل", prompt: "these → ______", answer: "those", why: "these → those." },
];

export const ORIGINAL_TEST_SECTIONS_60 = [...new Set(ORIGINAL_TEST_60.map((q) => q.section))];
