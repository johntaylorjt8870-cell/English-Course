/** Lesson exercises and model answers, in the same order as the lesson text. */
export type PracticeItem53 = { prompt: string; answer: string; explanation?: string; options?: readonly string[] };
export type Practice53 = { title: string; instruction: string; items: readonly PracticeItem53[]; note?: string; example?: string };
const item = (prompt: string, answer: string, explanation?: string, options?: string[]): PracticeItem53 => ({ prompt, answer, explanation, options });

export const PRACTICE_53: readonly Practice53[] = [
  {
    title: "التدريب الأول: ضع الفعل في الصورة الصحيحة",
    instruction: "استخدم Past Simple في جملة If، وwould + V1 في النتيجة.",
    items: [
      item("If I (have) more money, I (buy) a new car.", "If I had more money, I would buy a new car.", "had الماضي من have؛ would buy نتيجة افتراضية."),
      item("If she (live) near us, we (visit) her more often.", "If she lived near us, we would visit her more often.", "lived الماضي من live؛ would visit نتيجة افتراضية."),
      item("If he (know) the answer, he (tell) us.", "If he knew the answer, he would tell us.", "knew الماضي من know؛ would tell نتيجة افتراضية."),
      item("If they (work) harder, they (earn) more money.", "If they worked harder, they would earn more money.", "worked الماضي من work؛ would earn نتيجة افتراضية."),
      item("If I (be) rich, I (travel) around the world.", "If I were rich, I would travel around the world.", "were الصيغة الافتراضية المفضلة مع I؛ would travel نتيجة افتراضية."),
      item("If we (have) a bigger house, we (invite) more friends.", "If we had a bigger house, we would invite more friends."),
      item("If he (speak) English, he (find) a better job.", "If he spoke English, he would find a better job.", "spoke الماضي من speak؛ would find نتيجة افتراضية."),
      item("If she (study) medicine, she (become) a doctor.", "If she studied medicine, she would become a doctor."),
      item("If I (see) a snake, I (run) away.", "If I saw a snake, I would run away.", "saw الماضي من see؛ would run نتيجة افتراضية."),
      item("If they (go) to Paris, they (visit) the Eiffel Tower.", "If they went to Paris, they would visit the Eiffel Tower.", "went الماضي من go؛ would visit نتيجة افتراضية."),
    ],
  },
  {
    title: "التدريب الثاني: اختر الإجابة الصحيحة", instruction: "اختر الصيغة الأنسب.", items: [
      item("If I _____ a bird, I would fly around the world.", "C. were", "were هي الإجابة المفضلة في الأسلوب الرسمي والامتحانات؛ was مستعملة أيضًا في الإنجليزية غير الرسمية ولا تُعد خطأً مطلقًا.", ["A. am", "B. was", "C. were", "D. be"]),
      item("If she had more time, she _____ a new language.", "B. would learn", "النتيجة في الشرط الثاني تكون would + V1.", ["A. learns", "B. would learn", "C. will learn", "D. learned"]),
      item("If he _____ harder, he would get better results.", "B. studied", "نستخدم الماضي البسيط في جملة الشرط.", ["A. studies", "B. studied", "C. will study", "D. studying"]),
      item("If I were you, I _____ apologize.", "B. would", "التركيب هو If I were you, I would...", ["A. will", "B. would", "C. am", "D. did"]),
      item("If they lived nearby, we _____ them every weekend.", "C. would visit", "نتيجة افتراضية.", ["A. visit", "B. visited", "C. would visit", "D. will visit"]),
      item("If I had a car, I _____ drive to work.", "B. could", "المعنى هو القدرة على القيادة.", ["A. can", "B. could", "C. will can", "D. would to"]),
      item("If she _____ the truth, she might change her mind.", "B. knew", "نستخدم الماضي البسيط بعد If.", ["A. knows", "B. knew", "C. will know", "D. knowing"]),
      item("What _____ you do if you won the lottery?", "C. would", "السؤال افتراضي ويستخدم تركيب الشرط الثاني.", ["A. will", "B. do", "C. would", "D. are"]),
    ],
  },
  {
    title: "التدريب الثالث: صحح الأخطاء", instruction: "صحح الجمل مع الحفاظ على معناها الافتراضي.", items: [
      item("If I have a million dollars, I would buy a house.", "If I had a million dollars, I would buy a house.", "نستخدم الماضي البسيط في جملة الشرط."),
      item("If she would study harder, she would pass.", "If she studied harder, she would pass.", "في هذا التركيب نستخدم الماضي لا would في جملة If."),
      item("If he was rich, he will travel.", "If he were rich, he would travel.", "نفضل were في الافتراض ونستخدم would في النتيجة."),
      item("If I were you, I will accept the offer.", "If I were you, I would accept the offer.", "نستخدم would في النصيحة الافتراضية."),
      item("If they didn't worked, they would have more free time.", "If they didn't work, they would have more free time.", "بعد didn't نستخدم V1."),
      item("She would goes abroad if she had enough money.", "She would go abroad if she had enough money.", "بعد would نستخدم go وليس goes."),
      item("If I knew his address, I will visit him.", "If I knew his address, I would visit him.", "نستخدم would في النتيجة الافتراضية."),
      item("If he were here, he will help us.", "If he were here, he would help us.", "نستخدم were في الشرط وwould في النتيجة."),
    ],
  },
  {
    title: "التدريب الرابع: حوّل الجمل إلى النفي", instruction: "انفِ الجزء المحدد في كل جملة.",
    note: "الجملة الخامسة تجعل الشرط منفيًا باستخدام weren't. وقد يبدو معناها غريبًا بحسب السياق، كما قد يبدو معنى الأولى غير منطقي؛ المطلوب هنا هو التدريب على تركيب النفي.", items: [
      item("If I had a car, I would drive to work. — اجعل جملة الشرط منفية.", "If I didn't have a car, I would drive to work."),
      item("If she knew the answer, she would tell us. — اجعل النتيجة منفية.", "If she knew the answer, she wouldn't tell us."),
      item("If he worked harder, he would succeed. — اجعل الجملتين منفيتين.", "If he didn't work harder, he wouldn't succeed."),
      item("If they lived near us, they would visit us. — اجعل النتيجة منفية.", "If they lived near us, they wouldn't visit us."),
      item("If I were rich, I would buy a big house. — اجعل جملة الشرط منفية باستخدام were.", "If I weren't rich, I would buy a big house."),
    ],
  },
  {
    title: "التدريب الخامس: أكمل باستخدام Would أو Could أو Might", instruction: "اختر الأنسب بحسب المعنى.", items: [
      item("If I had wings, I _____ fly.", "If I had wings, I could fly.", "المعنى هو القدرة."),
      item("If I had more money, I _____ buy a bigger house.", "If I had more money, I would buy a bigger house.", "نتيجة افتراضية متوقعة."),
      item("If we invited Ahmed, he _____ come, but I am not sure.", "If we invited Ahmed, he might come, but I am not sure.", "might تعبّر عن احتمال غير مؤكد."),
      item("If she spoke English, she _____ work abroad.", "If she spoke English, she could work abroad.", "المعنى هو القدرة أو الإمكانية."),
      item("If I were you, I _____ talk to the manager.", "If I were you, I would talk to the manager.", "نصيحة افتراضية."),
    ],
  },
  {
    title: "التدريب السادس: حدد نوع الشرط", instruction: "اكتب Zero Conditional أو First Conditional أو Second Conditional.", items: [
      item("If you heat ice, it melts.", "Zero Conditional."),
      item("If I see him tomorrow, I will tell him.", "First Conditional."),
      item("If I were rich, I would travel the world.", "Second Conditional."),
      item("If she doesn't study, she will fail.", "First Conditional."),
      item("If I had a better computer, I would work faster.", "Second Conditional."),
      item("If people don't drink water, they become thirsty.", "Zero Conditional."),
      item("If he called me, I would answer.", "Second Conditional."),
      item("If the weather is good tomorrow, we will go out.", "First Conditional."),
      item("If you mix red and white, you get pink.", "Zero Conditional."),
      item("If I knew her number, I would call her.", "Second Conditional."),
    ],
  },
  {
    title: "التدريب السابع: أعد صياغة الجمل باستخدام If I were you", instruction: "حوّل كل جملة إلى نصيحة افتراضية.",
    example: "You should exercise more. → If I were you, I would exercise more.", items: [
      item("You should study harder.", "If I were you, I would study harder."),
      item("You should talk to your parents.", "If I were you, I would talk to my parents."),
      item("You shouldn't spend so much money.", "If I were you, I wouldn't spend so much money."),
      item("You should visit a doctor.", "If I were you, I would visit a doctor."),
      item("You shouldn't drive so fast.", "If I were you, I wouldn't drive so fast."),
    ],
  },
  {
    title: "التدريب الثامن: ترجم إلى الإنجليزية", instruction: "ترجم الجمل الآتية إلى الإنجليزية.", items: [
      item("لو كنت غنيًا، لسافرت حول العالم.", "If I were rich, I would travel around the world."),
      item("لو كان لدي وقت أكثر، لتعلمت لغة جديدة.", "If I had more time, I would learn a new language."),
      item("لو كانت تعيش بالقرب منا، لزرناها كثيرًا.", "If she lived near us, we would visit her often."),
      item("ماذا كنت ستفعل لو فزت بمليون دولار؟", "What would you do if you won a million dollars?"),
      item("لو كنت مكانك، لما اشتريت ذلك الهاتف.", "If I were you, I wouldn't buy that phone."),
      item("لو كان يتحدث الإنجليزية، لاستطاع العمل في الخارج.", "If he spoke English, he could work abroad."),
      item("لو عرف الحقيقة، فربما غيّر رأيه.", "If he knew the truth, he might change his mind."),
      item("لو كانت هنا، لساعدتنا.", "If she were here, she would help us."),
    ],
  },
];
