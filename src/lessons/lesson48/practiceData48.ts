/** Lesson 48 practice inventory: prompts and options only, no solutions. */
export type PracticeItem48 = {
  id: string;
  prompt: string;
  instruction?: string;
  options?: readonly string[];
  /** rewrite = يطلب إعادة كتابة الجملة كاملة؛ choice = اختيار معنى */
  mode?: "rewrite" | "choice";
};

const ruleOptions = ["can", "cans", "can to"] as const;
const meanings = ["منع", "عدم ضرورة", "نصيحة"] as const;

export const PRACTICE_SETS_48: Readonly<Record<string, readonly PracticeItem48[]>> = {
  rule: [
    { id: "r1", prompt: "He ______ swim very well.", instruction: "اختر الصيغة الصحيحة نحويًا.", options: ruleOptions },
    { id: "r2", prompt: "She must ______ her homework.", instruction: "اختر الصيغة الصحيحة بعد MUST.", options: ["to finish", "finish", "finishes"] },
    { id: "r3", prompt: "______ she swim?", instruction: "كوّن السؤال دون DO/DOES.", options: ["Does", "Can", "Is"] },
    { id: "r4", prompt: "He must to study harder.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "r5", prompt: "She ought respect her teacher.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  ability: [
    { id: "a1", prompt: "When I was young, I ______ swim very well.", instruction: "قدرة عامة في الماضي.", options: ["can", "could", "was able"] },
    {
      id: "a2",
      prompt: "The door was locked, but I ______ open it.",
      instruction: "النجاح في فعل محدد في الماضي.",
      options: ["was able to", "can", "must"],
    },
    { id: "a3", prompt: "______ I borrow your pen, please?", instruction: "استئذان مهذب.", options: ["May", "Must", "Should"] },
    { id: "a4", prompt: "Does she can drive?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
  ],
  possibility: [
    { id: "p1", prompt: "It ______ rain tomorrow, but I'm not sure.", instruction: "احتمال غير مؤكد.", options: ["might", "mustn't", "has to"] },
    { id: "p2", prompt: "You ______ enter this room. It is forbidden.", instruction: "انتبه: الجملة تعبّر عن منع.", options: ["may not", "may", "might"] },
    { id: "p3", prompt: "______ I ask a question, please?", instruction: "استئذان رسمي.", options: ["May", "Should", "Must"] },
    { id: "p4", prompt: "It might rains tomorrow.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  necessity: [
    { id: "n1", prompt: "She ______ work tomorrow.", instruction: "انتبه للفاعل She.", options: ["have to", "has to", "must has"] },
    { id: "n2", prompt: "I ______ leave early yesterday.", instruction: "ضرورة في الماضي.", options: ["had to", "have to", "must"] },
    { id: "n3", prompt: "______ you have to work tomorrow?", instruction: "كوّن السؤال مع HAVE TO.", options: ["Do", "Are", "Must"] },
    { id: "n4", prompt: "He has to studies every day.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  prohibition: [
    {
      id: "pr1",
      prompt: "You ______ use your phone during the examination. It is forbidden.",
      instruction: "منع صريح.",
      options: ["mustn't", "don't have to", "needn't"],
    },
    {
      id: "pr2",
      prompt: "You ______ bring food. We have already prepared everything.",
      instruction: "إحضار الطعام غير ضروري، وليس ممنوعًا.",
      options: ["mustn't", "don't have to", "should"],
    },
    {
      id: "pr3",
      prompt: "You ______ hurry. We have plenty of time.",
      instruction: "لا حاجة إلى الاستعجال.",
      options: ["mustn't", "needn't", "should"],
    },
    {
      id: "pr4",
      prompt: "You mustn't come early.",
      instruction: "المقصود: ليس من الضروري أن تأتي مبكرًا — أعد كتابة الجملة كاملة.",
    },
  ],
  advice: [
    { id: "ad1", prompt: "You ______ see a doctor if you feel worse.", instruction: "نصيحة.", options: ["should", "should to", "shoulds"] },
    { id: "ad2", prompt: "You ______ respect your parents.", instruction: "نبرة الواجب الأخلاقي.", options: ["ought to", "ought", "should to"] },
    {
      id: "ad3",
      prompt: "This is only a suggestion, not an obligation: you ______ study harder.",
      instruction: "نصيحة لا إلزام.",
      options: ["should", "must", "have to"],
    },
    { id: "ad4", prompt: "You should to study harder.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  desire: [
    { id: "de1", prompt: "I'd rather ______ at home tonight.", instruction: "اختر الصيغة الصحيحة بعد RATHER.", options: ["stay", "to stay", "staying"] },
    { id: "de2", prompt: "Would you mind ______ the door?", instruction: "اختر الصيغة الصحيحة بعد MIND.", options: ["closing", "to close", "close"] },
    { id: "de3", prompt: "I'd ______ some tea, please.", instruction: "رغبة في شيء.", options: ["like", "rather", "mind"] },
    { id: "de4", prompt: "I'd rather you stay here.", instruction: "التفضيل متعلق بشخص آخر — أعد كتابة الجملة كاملة." },
  ],
  future: [
    { id: "f1", prompt: "The phone is ringing. I ______ answer it.", instruction: "قرار سريع.", options: ["will", "would", "must"] },
    { id: "f2", prompt: "I ______ help you if I had time.", instruction: "افتراض غير واقعي.", options: ["will", "would", "can"] },
    { id: "f3", prompt: "I promise: I ______ never forget this day.", instruction: "وعد.", options: ["will", "would", "could"] },
    { id: "f4", prompt: "He wills help you.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  "detective-a": [
    { id: "d1", prompt: "She cans speak French.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d2", prompt: "He must to finish his homework.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d3", prompt: "Does she can swim?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
    { id: "d4", prompt: "You mustn't come early.", instruction: "المقصود: ليس من الضروري أن تأتي مبكرًا." },
    { id: "d5", prompt: "He don't have to work today.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d6", prompt: "It might rains tomorrow.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
  ],
  "detective-b": [
    { id: "d7", prompt: "You should to study harder.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d8", prompt: "I'd rather to stay home.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d9", prompt: "Would you mind to help me?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
    { id: "d10", prompt: "She ought respect her parents.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d11", prompt: "He has to studies every day.", instruction: "أعد كتابة الجملة كاملة بعد التصحيح." },
    { id: "d12", prompt: "May I to come in?", instruction: "أعد كتابة السؤال كاملًا بعد التصحيح." },
  ],
  "lab-school": [
    {
      id: "lab-school",
      prompt: "Teacher: “You don't have to finish everything today.”",
      instruction: "ما معنى ذلك؟",
      options: [
        "إنهاء كل شيء اليوم غير ممنوع، لكنه ليس ضروريًا.",
        "إنهاء كل شيء اليوم ممنوع تمامًا.",
        "يجب إنهاء كل شيء اليوم قبل الظهر.",
      ],
    },
  ],
  "lab-trip": [
    {
      id: "lab-trip",
      prompt: "Daniel: “The rooms may be full.”",
      instruction: "ما وظيفة MAY هنا؟",
      options: ["احتمال أن تكون الغرف ممتلئة.", "منع حجز الغرف.", "استئذان للحجز."],
    },
  ],
  "lab-home": [
    {
      id: "lab-home",
      prompt: "Mother: “You mustn't copy anyone's answers.”",
      instruction: "ما نوع هذا القول؟",
      options: ["منع صريح.", "عدم ضرورة.", "نصيحة اختيارية."],
    },
  ],
  say: [
    { id: "s1", prompt: "تريد أن تقول إنك تستطيع السباحة: I ______ swim.", instruction: "اكتب الفعل الناقص المناسب." },
    { id: "s2", prompt: "ربما يصل صديقك متأخرًا: He ______ arrive late.", instruction: "اكتب الفعل الناقص المناسب." },
    { id: "s3", prompt: "المنع في المدرسة: Students ______ use phones during the exam.", instruction: "منع، لا عدم ضرورة." },
    { id: "s4", prompt: "ليس من الضروري أن يحضر غدًا: You ______ come tomorrow.", instruction: "عدم ضرورة — تقبل صيغتان." },
    { id: "s5", prompt: "تنصح صديقك بالنوم مبكرًا: You ______ sleep early.", instruction: "نصيحة — تقبل صيغتان." },
    { id: "s6", prompt: "تريد الاستئذان بأدب للدخول: ______ I come in?", instruction: "استئذان مهذب؛ MAY هي الأكثر رسمية." },
    { id: "s7", prompt: "تطلب فتح الباب بأدب: ______ you open the door, please?", instruction: "طلب مهذب — تقبل صيغتان." },
    { id: "s8", prompt: "تفضّل الشاي على القهوة: I'd ______ have tea than coffee.", instruction: "اكتب الكلمة الناقصة." },
    { id: "s9", prompt: "تودّ تعلم الإنجليزية: I'd ______ to learn English.", instruction: "اكتب الكلمة الناقصة." },
    { id: "s10", prompt: "لا تحتاج إلى الاستعجال: You ______ hurry.", instruction: "عدم حاجة — تقبل صيغتان." },
  ],
  forms: [
    { id: "fo1", prompt: "She ______ speak three languages.", instruction: "اكتب الفعل الناقص المناسب (بلا s)." },
    { id: "fo2", prompt: "It ______ rain tomorrow, but I'm not sure.", instruction: "اكتب فعل احتمال (تقبل أكثر من صيغة)." },
    { id: "fo3", prompt: "You ______ wear a seat belt in the car.", instruction: "ضرورة (تقبل أكثر من صيغة)." },
    { id: "fo4", prompt: "I'd like ______ (learn) another language.", instruction: "اكتب الصيغة الصحيحة للفعل بين القوسين." },
    { id: "fo5", prompt: "When I was young, I ______ swim very well.", instruction: "قدرة عامة في الماضي." },
    { id: "fo6", prompt: "He ______ to work every Saturday.", instruction: "اكتب الصيغة الصحيحة لـ HAVE." },
  ],
  contrast: [
    {
      id: "c1",
      prompt: "You mustn't go. / You don't have to go.",
      instruction: "ما الفرق؟",
      options: ["الأولى منع، والثانية عدم ضرورة.", "كلتاهما منع.", "الأولى نصيحة، والثانية إلزام."],
    },
    {
      id: "c2",
      prompt: "You should study. / You must study.",
      instruction: "ما الفرق؟",
      options: ["الأولى نصيحة، والثانية إلزام أقوى.", "كلتاهما نصيحة.", "الأولى إلزام، والثانية احتمال."],
    },
    {
      id: "c3",
      prompt: "It may rain. / It might rain.",
      instruction: "أي وصف هو الأدق؟",
      options: [
        "كلتاهما احتمال، وMIGHT قد تكون أكثر تحفظًا في بعض السياقات دون نسب ثابتة.",
        "MAY تعني 70% وMIGHT تعني 30% دائمًا.",
        "MIGHT تعني المنع وMAY تعني الاستئذان فقط.",
      ],
    },
    {
      id: "c4",
      prompt: "I can swim. / I could swim when I was six.",
      instruction: "ما الفرق؟",
      options: ["الأولى قدرة في الحاضر، والثانية قدرة عامة في الماضي.", "كلتاهما قدرة في الحاضر.", "الثانية طلب مهذب."],
    },
    {
      id: "c5",
      prompt: "I'd like to go. / I'd rather go.",
      instruction: "ما الفرق؟",
      options: ["الأولى رغبة، والثانية تفضيل بين خيارين.", "كلتاهما تفضيل.", "الأولى تفضيل، والثانية رغبة."],
    },
  ],
} as const;

/** يُستخدم في لوحة الإتقان: كل مجموعة تدريبات تنتمي إلى مهارة واحدة. */
export const SKILL_OF_SET_48: Readonly<Record<string, string>> = {
  rule: "القاعدة المشتركة",
  ability: "القدرة والاستئذان",
  possibility: "الاحتمال",
  necessity: "الضرورة والإلزام",
  prohibition: "المنع وعدم الضرورة",
  advice: "النصيحة",
  desire: "الرغبة والتفضيل",
  future: "المستقبل",
  "detective-a": "اكتشاف الأخطاء",
  "detective-b": "اكتشاف الأخطاء",
  say: "اختيار الفعل من الموقف",
  forms: "الصيغ والتراكيب",
  contrast: "التمييز الدلالي",
  "lab-school": "الحوارات",
  "lab-trip": "الحوارات",
  "lab-home": "الحوارات",
};

export const MEANING_LABELS_48 = meanings;
