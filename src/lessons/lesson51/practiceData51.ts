/**
 * Lesson 51 practice inventory: prompts and options only, no solutions.
 * The five sets keep their original items and order; the detective set
 * applies the six common mistakes and the dialogue set analyses the
 * dialogue's conditional sentences.
 */
export type PracticeItem51 = {
  id: string;
  prompt: string;
  instruction?: string;
  options?: readonly string[];
  mode?: "rewrite" | "choice";
};

export const PRACTICE_SETS_51: Readonly<Record<string, readonly PracticeItem51[]>> = {
  /* التدريب الأول: 10 إكمالات — أكمل الفعل بالشكل الصحيح */
  complete: [
    { id: "c1", prompt: "If you heat ice, it ________ (melt).", instruction: "اكتب الفعل بين القوسين في Present Simple." },
    { id: "c2", prompt: "If he ________ (eat) too much, he feels sick.", instruction: "انتبه إلى الفاعل." },
    { id: "c3", prompt: "If people don't drink water, they ________ (get) thirsty.", instruction: "الفاعل PEOPLE جمع." },
    { id: "c4", prompt: "If she ________ (study) regularly, she improves.", instruction: "انتبه إلى الفاعل." },
    { id: "c5", prompt: "If you ________ (mix) red and blue, you get purple.", instruction: "مع YOU يبقى الفعل كما هو." },
    { id: "c6", prompt: "If my brother ________ (feel) tired, he takes a nap.", instruction: "انتبه إلى الفاعل المفرد." },
    { id: "c7", prompt: "If plants don't get sunlight, they ________ (grow) poorly.", instruction: "الفاعل PLANTS جمع." },
    { id: "c8", prompt: "If the temperature ________ (drop), water freezes.", instruction: "الفاعل TEMPERATURE مفرد." },
    { id: "c9", prompt: "If a phone battery reaches zero, the phone ________ (turn) off.", instruction: "الفاعل PHONE مفرد." },
    { id: "c10", prompt: "If he doesn't ________ (sleep) enough, he feels tired.", instruction: "ماذا يأتي بعد DOESN'T؟" },
  ],

  /* التدريب الثاني: 6 اختيارات */
  choose: [
    { id: "ch1", prompt: "If you ________ water, it boils at 100°C under standard atmospheric pressure.", instruction: "اختر التصريف الصحيح.", options: ["heat", "heated", "will heat"] },
    { id: "ch2", prompt: "If she doesn't sleep enough, she ________ tired.", instruction: "انتبه إلى الفاعل في النتيجة.", options: ["feel", "feels", "will felt"] },
    { id: "ch3", prompt: "If people ________ regularly, they become stronger.", instruction: "الفاعل PEOPLE جمع.", options: ["exercise", "exercises", "exercised"] },
    { id: "ch4", prompt: "If you don't charge your phone, its battery ________ out.", instruction: "الفاعل BATTERY مفرد.", options: ["run", "runs", "running"] },
    { id: "ch5", prompt: "If he ________ coffee at night, he doesn't sleep well.", instruction: "مع He في جزء الشرط.", options: ["drink", "drinks", "drinking"] },
    { id: "ch6", prompt: "If you press this button, the machine ________.", instruction: "الفاعل MACHINE مفرد.", options: ["starts", "start", "will starting"] },
  ],

  /* التدريب الثالث: 6 — Zero أم First؟ */
  classify: [
    { id: "s1", prompt: "If you heat ice, it melts.", instruction: "حدد نوع الجملة.", options: ["Zero Conditional — حقيقة عامة", "First Conditional — احتمال مستقبلي"] },
    { id: "s2", prompt: "If it rains tomorrow, I will stay home.", instruction: "حدد نوع الجملة.", options: ["Zero Conditional — حقيقة عامة", "First Conditional — احتمال مستقبلي"] },
    { id: "s3", prompt: "If people don't eat, they get hungry.", instruction: "حدد نوع الجملة.", options: ["Zero Conditional — حقيقة عامة", "First Conditional — احتمال مستقبلي"] },
    { id: "s4", prompt: "If I finish my homework tonight, I will watch a film.", instruction: "حدد نوع الجملة.", options: ["Zero Conditional — حقيقة عامة", "First Conditional — نتيجة مستقبلية محتملة"] },
    { id: "s5", prompt: "If you mix yellow and blue, you get green.", instruction: "حدد نوع الجملة.", options: ["Zero Conditional — حقيقة عامة", "First Conditional — احتمال مستقبلي"] },
    { id: "s6", prompt: "If she misses the bus tomorrow, she will take a taxi.", instruction: "حدد نوع الجملة.", options: ["Zero Conditional — حقيقة عامة", "First Conditional — موقف مستقبلي محدد"] },
  ],

  /* التدريب الرابع: 8 تصحيحات */
  correct: [
    { id: "co1", prompt: "If you heats water, it boils.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co2", prompt: "If he don't sleep, he feels tired.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co3", prompt: "If she doesn't studies, she fails.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co4", prompt: "If you will press this button, the machine starts.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co5", prompt: "If plants doesn't get water, they die.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co6", prompt: "If I feel tired, I will usually take a break.", instruction: "المطلوب صيغة الشرط الصفري (عادة متكررة). أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co7", prompt: "If ice gets warm, it melt.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "co8", prompt: "If people eats too much, they gain weight.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],

  /* التدريب الخامس: 8 ترجمات */
  translate: [
    { id: "tr1", prompt: "إذا سخّنت الثلج، فإنه يذوب.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr2", prompt: "إذا لم تنم جيدًا، تشعر بالتعب.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr3", prompt: "إذا شرب أخي القهوة ليلًا، لا ينام بسهولة.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr4", prompt: "إذا لم تحصل النباتات على الماء، فإنها تموت.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr5", prompt: "إذا ضغطت هذا الزر، يبدأ الحاسوب.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr6", prompt: "إذا مارس الناس الرياضة بانتظام، تتحسن صحتهم.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr7", prompt: "إذا شعرت بالملل، أقرأ كتابًا.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
    { id: "tr8", prompt: "إذا لم تتبع القواعد، تحصل على تحذير.", instruction: "اكتب الترجمة الإنجليزية الكاملة." },
  ],

  /* الأخطاء الستة في محطة كاشف الأخطاء */
  detective: [
    {
      id: "d1",
      prompt: "If you heat ice, it will melt.",
      instruction: "المطلوب: الصيغة النموذجية للحقيقة العامة (شرط صفري). اختر الجملة الصحيحة.",
      options: ["If you heat ice, it melts.", "If you heated ice, it melts.", "If you will heat ice, it melts."],
    },
    { id: "d2", prompt: "If he eat too much, he feels sick.", instruction: "اكتشف الخطأ وأعد كتابة الجملة المصححة كاملة." },
    { id: "d3", prompt: "If she doesn't eats, she gets hungry.", instruction: "اكتشف الخطأ وأعد كتابة الجملة المصححة كاملة." },
    {
      id: "d4",
      prompt: "If I wake up late, I miss the bus. / If I wake up late tomorrow, I will miss the bus.",
      instruction: "ما الفرق بين الجملتين؟",
      options: ["الأولى عادة متكررة، والثانية توقع مستقبلي محدد.", "كلتاهما حقيقة عامة.", "الأولى عن المستقبل، والثانية عن الماضي."],
    },
    {
      id: "d5",
      prompt: "If I feel tired, I will usually take a break.",
      instruction: "المقصود: عادة متكررة. اختر الصيغة الصحيحة.",
      options: ["If I feel tired, I usually take a break.", "If I felt tired, I usually take a break.", "If I feel tired, I am taking a break."],
    },
    {
      id: "d6",
      prompt: "If you heated ice, it melts.",
      instruction: "المقصود: حقيقة عامة. اختر الجملة الصحيحة.",
      options: ["If you heat ice, it melts.", "If you heat ice, it melted.", "If you will heat ice, it will melt."],
    },
  ],

  /* تحليل وظائف الحوار */
  dialogue: [
    {
      id: "dl1",
      prompt: "Sara: \"If I don't sleep well, I feel tired all day.\"",
      instruction: "ما نوع الجملة الشرطية هنا؟",
      options: ["عادة متكررة", "توقع مستقبلي محدد", "موقف افتراضي غير حقيقي"],
    },
    {
      id: "dl2",
      prompt: "Sara: \"If I drink too much coffee, I don't sleep well at night.\"",
      instruction: "ما وظيفة النفي في النتيجة هنا؟",
      options: ["نتيجة متكررة منفية", "منع من شرب القهوة", "توقع مستقبلي"],
    },
    {
      id: "dl3",
      prompt: "Sara: \"If I exercise regularly, I feel healthier and more energetic.\"",
      instruction: "ماذا تصف هذه الجملة؟",
      options: ["نتيجة عامة متكررة", "حدثًا واحدًا غدًا", "موقفًا افتراضيًا في الماضي"],
    },
    {
      id: "dl4",
      prompt: "Sara: \"If people don't drink enough water, they become dehydrated.\"",
      instruction: "ما نوع هذه الجملة؟",
      options: ["حقيقة عامة عن الجسم", "عادة شخصية", "احتمال مستقبلي محدد"],
    },
  ],
};

/* ============================================================
   مهمة الكتابة والتحدث
   ============================================================ */

export const WRITING_REQUIREMENTS_51 = [
  { id: "if-clauses", ar: "جمل شرطية بصيغة", en: "IF + PRESENT SIMPLE", min: 8, pattern: /\bif\s+[a-z]/ },
  { id: "habits", ar: "جمل عن العادات اليومية تبدأ بـ", en: "If I …", min: 3, pattern: /\bif i\b/ },
  { id: "science", ar: "كلمات الحقائق العلمية أو الطبيعية", en: "water · ice · plants · sun", min: 3, pattern: /\b(?:water|ice|plant|sun|light|freeze|freezes|melts?|boils?)\b/ },
  { id: "health", ar: "كلمات متعلقة بالصحة", en: "health · sleep · exercise", min: 2, pattern: /\b(?:health(?:y)?|sleep|exercise|tired|sick|hungry|energy|energetic)\b/ },
  { id: "school", ar: "كلمات متعلقة بالدراسة أو المدرسة", en: "school · study · students", min: 2, pattern: /\b(?:school|stud(?:y|ies|ents?)|lesson|homework|exam|class)\b/ },
  { id: "negative", ar: "جملة منفية على الأقل باستخدام", en: "DON'T / DOESN'T", min: 1, pattern: /\b(?:don't|doesn't|do not|does not)\s+\w+/ },
] as const;

export const SPEAKING_SITUATIONS_51 = [
  "What happens if you don't sleep enough?",
  "What happens if people don't exercise?",
  "What happens if you heat ice?",
  "What happens if students don't study?",
  "What happens if you press the wrong button?",
] as const;

export const SPEAKING_STARTERS_51 = [
  "If you don't sleep enough, …",
  "If people don't exercise, …",
  "If you heat ice, …",
  "If students don't study, …",
  "If you press the wrong button, …",
  "This happens because …",
  "As a result, …",
  "This is a general fact: …",
] as const;

export const SPEAKING_CONNECTORS_51 = ["because", "so", "as a result", "usually"] as const;
