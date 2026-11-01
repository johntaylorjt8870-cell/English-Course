/**
 * Lesson 50 practice inventory: prompts and options only, no solutions.
 * The five sets keep their original items and order; the detective set
 * applies the six common mistakes and the dialogue set analyses the
 * dialogue functions.
 */
export type PracticeItem50 = {
  id: string;
  prompt: string;
  instruction?: string;
  options?: readonly string[];
  mode?: "rewrite" | "choice";
};

export const PRACTICE_SETS_50: Readonly<Record<string, readonly PracticeItem50[]>> = {
  /* التدريب الأول: 6 اختيارات */
  choose: [
    { id: "ch1", prompt: "He is yawning. He ________ be tired.", instruction: "التثاؤب دليل حاضر.", options: ["must", "can't", "mustn't"] },
    { id: "ch2", prompt: "She ________ be at school. I saw her at the shopping centre.", instruction: "رأيتها في مكان آخر الآن.", options: ["must", "can't", "should"] },
    { id: "ch3", prompt: "They ________ have forgotten the meeting. They received three reminders.", instruction: "ثلاثة تذكيرات وصلتهم قبل الاجتماع.", options: ["can't", "mustn't", "should"] },
    { id: "ch4", prompt: "He ________ have left early. His office is empty.", instruction: "المكتب خالٍ الآن.", options: ["must", "can't", "shouldn't"] },
    { id: "ch5", prompt: "She ________ be sleeping. I can hear her talking.", instruction: "تسمع صوت حديثها الآن.", options: ["must", "can't", "may"] },
    { id: "ch6", prompt: "It ________ rain later. The sky is getting darker.", instruction: "احتمال يتعلق بالمستقبل القريب.", options: ["might", "mustn't", "can't"] },
  ],

  /* التدريب الثاني: 8 إكمالات */
  complete: [
    { id: "c1", prompt: "She must ________ (be) hungry.", instruction: "اكتب الكلمة الناقصة، أو الجملة كاملة." },
    { id: "c2", prompt: "He might ________ (study) now.", instruction: "نشاط يُتصوَّر حدوثه الآن." },
    { id: "c3", prompt: "They must have ________ (leave) already.", instruction: "V3 من leave." },
    { id: "c4", prompt: "She can't have ________ (finish) the work in five minutes.", instruction: "V3 من finish." },
    { id: "c5", prompt: "He could be ________ (wait) outside.", instruction: "نشاط مستمر الآن." },
    { id: "c6", prompt: "They might have been ________ (play) football.", instruction: "نشاط كان مستمرًا في الماضي." },
    { id: "c7", prompt: "The children must ________ (be) asleep.", instruction: "اكتب الكلمة الناقصة، أو الجملة كاملة." },
    { id: "c8", prompt: "He can't ________ (know) the answer.", instruction: "الفعل بعد CAN'T بصيغته الأساسية." },
  ],

  /* التدريب الثالث: 6 تصنيفات للزمن والمعنى */
  classify: [
    { id: "s1", prompt: "She must be at home.", instruction: "حدد الزمن ودرجة الحكم.", options: ["الحاضر — استنتاج قوي", "الماضي — احتمال", "الحاضر — نفي قوي"] },
    { id: "s2", prompt: "He might have forgotten the keys.", instruction: "حدد الزمن ودرجة الحكم.", options: ["الحاضر — احتمال", "الماضي — احتمال", "الماضي — استنتاج قوي"] },
    { id: "s3", prompt: "They can't be serious.", instruction: "حدد الزمن ودرجة الحكم.", options: ["الماضي — نفي قوي", "الحاضر — نفي قوي", "الحاضر — استنتاج قوي"] },
    { id: "s4", prompt: "The teacher must have left.", instruction: "حدد الزمن ودرجة الحكم.", options: ["الحاضر — استنتاج قوي", "الماضي — استنتاج قوي", "الماضي — احتمال"] },
    { id: "s5", prompt: "She could be talking to her mother.", instruction: "حدد الزمن وطبيعة النشاط.", options: ["الحاضر — احتمال لنشاط مستمر", "الماضي — احتمال", "الحاضر — استنتاج قوي"] },
    { id: "s6", prompt: "He can't have stolen the money.", instruction: "حدد الزمن ودرجة الحكم.", options: ["الحاضر — نفي قوي", "الماضي — نفي قوي", "الماضي — استنتاج قوي"] },
  ],

  /* التدريب الرابع: 8 تصحيحات */
  correct: [
    { id: "co1", prompt: "He must to be tired.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co2", prompt: "She might has forgotten.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co3", prompt: "They can't be went home.", instruction: "صحح الجملة. فكّر أولًا: هل الحكم عن حدث ماضٍ أم عن نشاط الآن؟" },
    { id: "co4", prompt: "He must have saw the accident.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co5", prompt: "She might be slept now.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co6", prompt: "They must have been play football.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co7", prompt: "He mustn't be the teacher. He's only a student.", instruction: "المقصود: لا يمكن أن يكون المعلم. أعد كتابة الجملة الأولى (أو الجملتين) بعد التصحيح." },
    { id: "co8", prompt: "She can't have went there.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],

  /* التدريب الخامس: 8 ترجمات */
  translate: [
    { id: "tr1", prompt: "لا بد أنه نائم الآن.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr2", prompt: "ربما تكون في المكتبة.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr3", prompt: "لا يمكن أنهم يعرفون الإجابة.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr4", prompt: "لا بد أنها غادرت مبكرًا.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr5", prompt: "ربما كان ينتظرنا.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr6", prompt: "لا يمكن أنه اشترى هذه السيارة؛ فهي باهظة جدًا بالنسبة له.", instruction: "ترجم الجملتين معًا." },
    { id: "tr7", prompt: "ربما يكون الأطفال يلعبون في الحديقة الآن.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr8", prompt: "لا بد أنهم كانوا يعملون عندما اتصلت بهم.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
  ],

  /* الأخطاء الستة في محطة المحقق */
  detective: [
    {
      id: "d1",
      prompt: "He mustn't be at home.",
      instruction: "المقصود: لا يمكن أن يكون في المنزل. اختر الجملة الصحيحة بالمعنى المقصود.",
      options: ["He can't be at home.", "He mustn't go home.", "He may be at home."],
    },
    { id: "d2", prompt: "She must be forgotten.", instruction: "المقصود: لا بد أنها نسيت. اكتب الجملة المصححة كاملة." },
    { id: "d3", prompt: "He might have went.", instruction: "اكتب الجملة المصححة كاملة." },
    {
      id: "d4",
      prompt: "He must be tired. / He has to work.",
      instruction: "ما الفرق الدقيق بين الجملتين؟",
      options: ["الأولى استنتاج عن حالته، والثانية إلزام.", "كلتاهما إلزام.", "الأولى إلزام، والثانية استنتاج."],
    },
    {
      id: "d5",
      prompt: "She might be sick. / She might have been sick.",
      instruction: "ما الفرق بين الجملتين؟",
      options: ["الأولى ربما تكون مريضة الآن، والثانية ربما كانت مريضة في الماضي.", "كلتاهما تتحدثان عن الآن.", "الأولى عن الماضي، والثانية عن الآن."],
    },
    {
      id: "d6",
      prompt: "She could have won, but she gave up.",
      instruction: "ما معنى COULD HAVE هنا بالضبط؟",
      options: ["فرصة كانت متاحة ولم تحدث.", "احتمال أنها فازت فعلًا.", "قدرة على الفوز الآن."],
    },
  ],

  /* تحليل وظائف الحوار */
  dialogue: [
    {
      id: "dl1",
      prompt: "Omar: \"He must be busy.\"",
      instruction: "ما وظيفة MUST BE هنا؟",
      options: ["استنتاج عن الحاضر", "إلزام بأن يكون مشغولًا", "احتمال عن الماضي"],
    },
    {
      id: "dl2",
      prompt: "Liam: \"He might be attending a meeting.\"",
      instruction: "ما وظيفة MIGHT BE + V-ing هنا؟",
      options: ["احتمال لنشاط مستمر الآن", "استنتاج قوي عن الماضي", "قدرة ماضية"],
    },
    {
      id: "dl3",
      prompt: "Liam: \"He must have gone to the main office.\"",
      instruction: "ما وظيفة MUST HAVE هنا؟",
      options: ["استنتاج قوي عن الماضي", "أمر بالذهاب الآن", "احتمال ضعيف عن الحاضر"],
    },
    {
      id: "dl4",
      prompt: "Omar: \"He could have forgotten that he had a class.\"",
      instruction: "ما وظيفة COULD HAVE هنا؟",
      options: ["احتمال عن الماضي", "فرصة أكيدة ضاعت", "منع"],
    },
    {
      id: "dl5",
      prompt: "Liam: \"He can't have forgotten. He always checks his schedule.\"",
      instruction: "ما وظيفة CAN'T HAVE هنا؟",
      options: ["استنتاج سلبي قوي عن الماضي", "منع المعلم من النسيان", "احتمال أنه نسي"],
    },
  ],
};

/* ============================================================
   مهمة الكتابة والتحدث
   ============================================================ */

export const WRITING_REQUIREMENTS_50 = [
  { id: "must-now", ar: "جملتان على الأقل باستخدام", en: "MUST", min: 2, pattern: /\bmust\s+(?!have\b)\w+/ },
  { id: "might-now", ar: "جملتان باستخدام", en: "MIGHT / MAY", min: 2, pattern: /\b(?:might|may)\s+(?!have\b)\w+/ },
  { id: "could", ar: "جملة واحدة باستخدام", en: "COULD", min: 1, pattern: /\bcould\s+\w+/ },
  { id: "cant-now", ar: "جملة واحدة باستخدام", en: "CAN'T", min: 1, pattern: /\bcan't\s+(?!have\b)\w+/ },
  { id: "have-past", ar: "جملتان باستخدام", en: "MUST HAVE / MIGHT HAVE", min: 2, pattern: /\b(?:must|might)\s+have\s+\w+/ },
  { id: "cant-have", ar: "جملة واحدة باستخدام", en: "CAN'T HAVE", min: 1, pattern: /\bcan't\s+have\s+\w+/ },
] as const;

export const SPEAKING_SITUATIONS_50 = [
  "صديق لم يحضر إلى المدرسة.",
  "شخص لم يرد على هاتفه.",
  "شيء اختفى من غرفتك.",
  "صوت غريب سمعته في المنزل.",
  "شخص وصل متأخرًا إلى موعد.",
] as const;

export const SPEAKING_STARTERS_50 = [
  "He must be…",
  "She might be…",
  "They could be…",
  "He can't be…",
  "She must have…",
  "They might have…",
  "He can't have…",
  "They must have been…",
] as const;

export const SPEAKING_CONNECTORS_50 = ["because", "so", "but", "although"] as const;
