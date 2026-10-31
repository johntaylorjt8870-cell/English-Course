/**
 * Lesson 49 practice inventory: prompts and options only, no solutions.
 * The four source exercises keep their original items and order.
 */
export type PracticeItem49 = {
  id: string;
  prompt: string;
  instruction?: string;
  options?: readonly string[];
  mode?: "rewrite" | "choice";
};

export const PRACTICE_SETS_49: Readonly<Record<string, readonly PracticeItem49[]>> = {
  /* التدريب الأول: 10 جمل */
  complete: [
    { id: "c1", prompt: "He must have ________ (leave) early.", instruction: "اكتب التصريف الثالث، أو الصيغة كاملة." },
    { id: "c2", prompt: "She might have ________ (forget) the meeting.", instruction: "V3 من forget." },
    { id: "c3", prompt: "You should have ________ (study) harder.", instruction: "V3 من study." },
    { id: "c4", prompt: "They could have ________ (win) the match.", instruction: "V3 من win." },
    { id: "c5", prompt: "I shouldn't have ________ (say) that.", instruction: "V3 من say." },
    { id: "c6", prompt: "He may have ________ (take) my book.", instruction: "V3 من take." },
    { id: "c7", prompt: "We would have ________ (help) you.", instruction: "V3 من help." },
    { id: "c8", prompt: "She must have ________ (see) the message.", instruction: "V3 من see." },
    { id: "c9", prompt: "You needn't have ________ (buy) more food.", instruction: "V3 من buy." },
    { id: "c10", prompt: "They couldn't have ________ (know) the answer.", instruction: "V3 من know." },
  ],

  /* التدريب الثاني: 5 جمل */
  choose: [
    {
      id: "ch1",
      prompt: "The lights are off. They ________ have gone to bed.",
      instruction: "استنتاج قوي من دليل.",
      options: ["must", "should", "needn't"],
    },
    {
      id: "ch2",
      prompt: "I ________ have called you. I had your number, but I forgot.",
      instruction: "كان ينبغي أن أتصل.",
      options: ["should", "might", "must"],
    },
    {
      id: "ch3",
      prompt: "You ________ have bought milk. We already had enough.",
      instruction: "الشراء حدث، لكنه لم يكن ضروريًا.",
      options: ["needn't", "must", "should"],
    },
    {
      id: "ch4",
      prompt: "She ________ have missed the train. I'm not sure.",
      instruction: "احتمال غير مؤكد.",
      options: ["might", "mustn't", "should"],
    },
    {
      id: "ch5",
      prompt: "He ________ have stolen the money. He was in another country.",
      instruction: "استنتاج بأن الأمر لم يكن ممكنًا.",
      options: ["couldn't", "should", "needn't"],
    },
  ],

  /* التدريب الثالث: 8 تصحيحات */
  correct: [
    { id: "co1", prompt: "He must has forgotten.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co2", prompt: "She might had gone home.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co3", prompt: "You should have went earlier.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co4", prompt: "They could have saw the accident.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co5", prompt: "I needn't have boughted anything.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co6", prompt: "He shouldn't have ate so much.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co7", prompt: "She must have wrote the letter.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co8", prompt: "We would have went with you.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],

  /* التدريب الرابع: 8 ترجمات */
  translate: [
    { id: "tr1", prompt: "لا بد أنه نسي موعدنا.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr2", prompt: "ربما تركت هاتفي في السيارة.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr3", prompt: "كان ينبغي عليك أن تخبرني بالحقيقة.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr4", prompt: "لم يكن ينبغي لي أن أقول ذلك.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr5", prompt: "كان بإمكاننا الفوز بالمباراة.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr6", prompt: "لم يكن من الضروري أن تشتري الطعام؛ فقد كان لدينا الكثير.", instruction: "استخدم NEEDN'T HAVE." },
    { id: "tr7", prompt: "لا يمكن أنه رأى الحادث؛ فقد كان في المنزل.", instruction: "استخدم COULDN'T HAVE." },
    { id: "tr8", prompt: "كنت سأساعدك لو كنت أعرف.", instruction: "استخدم WOULD HAVE." },
  ],

  /* الأخطاء الستة في محطة المحقق */
  detective: [
    { id: "d1", prompt: "He must has forgotten.", instruction: "الخطأ في HAVE." },
    { id: "d2", prompt: "She might had gone home.", instruction: "الخطأ في HAVE." },
    { id: "d3", prompt: "You should have went earlier.", instruction: "الخطأ في V3." },
    { id: "d4", prompt: "You should study yesterday. (المقصود: الماضي)", instruction: "أعد كتابة الجملة بحيث تتحدث عن الماضي." },
    { id: "d5", prompt: "I needn't have bought it. (المقصود: لم أكن بحاجة إليه فقط)", instruction: "أعد صياغة الجملة لتعبر عن عدم الحاجة دون تأكيد وقوع الفعل — استخدم DIDN'T NEED TO." },
    { id: "d6", prompt: "You must finish the work. (المقصود: لا بد أنك أنهيته)", instruction: "أعد كتابة الجملة لتعبر عن استنتاج قوي عن الماضي." },
  ],

  /* أسئلة فهم الحوار */
  dialogue: [
    {
      id: "dl1",
      prompt: "Maya: “He might have missed the bus.”",
      instruction: "ما وظيفة MIGHT HAVE هنا؟",
      options: ["احتمال في الماضي", "استنتاج قوي", "فرصة ضائعة"],
    },
    {
      id: "dl2",
      prompt: "Adam: “He must have left home late.”",
      instruction: "ما وظيفة MUST HAVE هنا؟",
      options: ["استنتاج قوي عن الماضي", "إلزام في الحاضر", "ندم"],
    },
    {
      id: "dl3",
      prompt: "Maya: “He could have taken a taxi.”",
      instruction: "ما المعنى الأقرب هنا؟",
      options: ["كانت هناك إمكانية أو فرصة متاحة", "كان ينبغي عليه ذلك", "لم يكن ممكنًا"],
    },
    {
      id: "dl4",
      prompt: "Adam: “He should have called us.”",
      instruction: "ماذا يعبّر SHOULD HAVE؟",
      options: ["لوم أو نصيحة متأخرة", "احتمال", "عدم ضرورة"],
    },
    {
      id: "dl5",
      prompt: "Maya: “He might have missed the bus.” — هل نعرف يقينًا أنه فاتته الحافلة؟",
      instruction: "اختر التفسير الدقيق.",
      options: ["لا، الجملة تطرح احتمالًا ولا تثبت وقوعه", "نعم، MIGHT تعني التأكد", "لا، الجملة تنفي أنه استقل الحافلة"],
    },
  ],

  /* تحقق من فهم المقارنات */
  contrast: [
    {
      id: "cx1",
      prompt: "He must have forgotten. / He might have forgotten.",
      instruction: "ما الفرق الدقيق؟",
      options: [
        "كلتاهما تعبّران عن إلزام.",
        "الأولى استنتاج قوي، والثانية احتمال أضعف.",
        "الأولى عن الحاضر، والثانية عن المستقبل.",
      ],
    },
    {
      id: "cx2",
      prompt: "You could have called me. / You should have called me.",
      instruction: "ما الفرق الدقيق؟",
      options: [
        "كلتاهما لوم بالدرجة نفسها.",
        "الأولى عن المستقبل، والثانية عن الماضي.",
        "الأولى إمكانية كانت متاحة، والثانية واجب أو نصيحة لم تُنفّذ.",
      ],
    },
    {
      id: "cx3",
      prompt: "You should have called. / You shouldn't have called.",
      instruction: "ما الفرق الدقيق؟",
      options: [
        "كلتاهما تعني أنك اتصلت.",
        "الأولى: لم تتصل. الثانية: اتصلت.",
        "كلتاهما تعني أنك لم تتصل.",
      ],
    },
    {
      id: "cx4",
      prompt: "I needn't have taken a taxi. / I didn't need to take a taxi.",
      instruction: "ما الفرق الدقيق؟",
      options: [
        "كلتاهما تؤكدان أنني لم أستقل التاكسي.",
        "الأولى عن المستقبل، والثانية عن الحاضر.",
        "الأولى تؤكد أنني استقللت التاكسي، والثانية لا تحسم وقوع الفعل.",
      ],
    },
    {
      id: "cx5",
      prompt: "She might have left. / She had left before I arrived.",
      instruction: "ما الفرق في الوظيفة؟",
      options: [
        "كلتاهما لترتيب الأحداث.",
        "الأولى موقف المتحدث (احتمال)، والثانية ترتيب حدثين في الماضي.",
        "الأولى ترتيب الأحداث، والثانية احتمال.",
      ],
    },
    {
      id: "cx6",
      prompt: "You must have finished. / You must finish.",
      instruction: "ما الفرق الدقيق؟",
      options: [
        "كلتاهما إلزام.",
        "كلتاهما استنتاج.",
        "الأولى استنتاج عن الماضي، والثانية إلزام في الحاضر.",
      ],
    },
  ],
};

/* ============================================================
   Meaning Detector — 8 جمل، 6 وظائف
   ============================================================ */

export const DETECTOR_49 = [
  {
    id: "m1",
    sentence: "He must have forgotten the keys.",
    correct: "deduction",
    why: "MUST HAVE + V3 استنتاج قوي عن الماضي؛ المتحدث يرجّح حدوث النسيان.",
  },
  {
    id: "m2",
    sentence: "She might have taken the wrong train.",
    correct: "possibility",
    why: "MIGHT HAVE + V3 احتمال في الماضي، دون تأكيد.",
  },
  {
    id: "m3",
    sentence: "You should have told me earlier.",
    correct: "regret",
    why: "SHOULD HAVE + V3 ندم أو لوم على فعل لم يحدث.",
  },
  {
    id: "m4",
    sentence: "I could have won, but I stopped.",
    correct: "opportunity",
    why: "COULD HAVE + V3 هنا فرصة كانت متاحة ولم تُستغل؛ الدليل هو «but I stopped».",
  },
  {
    id: "m5",
    sentence: "You needn't have cooked dinner.",
    correct: "unnecessary",
    why: "NEEDN'T HAVE + V3 فعل وقع بالفعل، لكنه لم يكن ضروريًا.",
  },
  {
    id: "m6",
    sentence: "I would have helped you if I had known.",
    correct: "hypothetical",
    why: "WOULD HAVE + V3 نتيجة افتراضية لم تحدث لأن الشرط لم يتحقق.",
  },
  {
    id: "m7",
    sentence: "They couldn't have finished in one hour.",
    correct: "impossible",
    why: "COULDN'T HAVE + V3 استنتاج بأن الفعل لم يكن ممكنًا، وليس مجرد احتمال.",
  },
  {
    id: "m8",
    sentence: "You shouldn't have said that.",
    correct: "regret",
    why: "SHOULDN'T HAVE + V3 انتقاد لفعل وقع بالفعل؛ الفعل حدث وكان خطأ.",
  },
] as const;

export const DETECTOR_FUNCTIONS_49 = [
  { id: "deduction", glyph: "◆", label: "استنتاج قوي", tone: "deduction" },
  { id: "possibility", glyph: "◌", label: "احتمال", tone: "possibility" },
  { id: "regret", glyph: "↩", label: "ندم / انتقاد", tone: "regret" },
  { id: "opportunity", glyph: "⤫", label: "فرصة ضائعة", tone: "opportunity" },
  { id: "unnecessary", glyph: "⌁", label: "عدم ضرورة", tone: "unnecessary" },
  { id: "hypothetical", glyph: "⇢", label: "نتيجة افتراضية", tone: "hypothetical" },
  { id: "impossible", glyph: "✕", label: "غير ممكن", tone: "impossible" },
] as const;

/* ============================================================
   V3 Workshop — 8 أفعال
   ============================================================ */

export const V3_WORKSHOP_49 = [
  { id: "v1", base: "go", v2: "went", v3: "gone", distractor: "went", sentence: "She must have ______ home.", prefix: "She must have", suffix: "home." },
  { id: "v2", base: "eat", v2: "ate", v3: "eaten", distractor: "ate", sentence: "He shouldn't have ______ so much.", prefix: "He shouldn't have", suffix: "so much." },
  { id: "v3", base: "see", v2: "saw", v3: "seen", distractor: "saw", sentence: "They could have ______ the accident.", prefix: "They could have", suffix: "the accident." },
  { id: "v4", base: "write", v2: "wrote", v3: "written", distractor: "wrote", sentence: "She must have ______ the letter.", prefix: "She must have", suffix: "the letter." },
  { id: "v5", base: "forget", v2: "forgot", v3: "forgotten", distractor: "forgot", sentence: "He might have ______ my birthday.", prefix: "He might have", suffix: "my birthday." },
  { id: "v6", base: "take", v2: "took", v3: "taken", distractor: "took", sentence: "I might have ______ the wrong bag.", prefix: "I might have", suffix: "the wrong bag." },
  { id: "v7", base: "do", v2: "did", v3: "done", distractor: "did", sentence: "You needn't have ______ all the work.", prefix: "You needn't have", suffix: "all the work." },
  { id: "v8", base: "leave", v2: "left", v3: "left", distractor: "leaved", sentence: "He must have ______ early.", prefix: "He must have", suffix: "early." },
] as const;

export const WRITING_REQUIREMENTS_49 = [
  { id: "must", ar: "جملة باستخدام", en: "MUST HAVE", pattern: /\bmust\s+have\s+\w+/ },
  { id: "might", ar: "جملة باستخدام", en: "MIGHT HAVE", pattern: /\bmight\s+have\s+\w+/ },
  { id: "should", ar: "جملة باستخدام", en: "SHOULD HAVE", pattern: /\bshould\s+have\s+\w+/ },
  { id: "shouldnt", ar: "جملة باستخدام", en: "SHOULDN'T HAVE", pattern: /\bshouldn't\s+have\s+\w+/ },
  { id: "could", ar: "جملة باستخدام", en: "COULD HAVE", pattern: /\bcould\s+have\s+\w+/ },
  { id: "neednt", ar: "جملة باستخدام", en: "NEEDN'T HAVE", pattern: /\bneedn't\s+have\s+\w+/ },
] as const;

export const SPEAKING_QUESTIONS_49 = [
  "What happened?",
  "What might have caused the problem?",
  "What should you have done?",
  "What shouldn't you have done?",
  "What could you have done differently?",
  "What have you learned from the experience?",
] as const;
