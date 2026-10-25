import type { TestSolution36 } from "./grading36";

export type { TestSolution36 };

/**
 * Detailed key for the 25-question Master Test.
 *
 * The supplied lesson's solutions section contains only a heading and the
 * instruction to reveal the solutions; it does not contain an actual key.
 * Every answer below is therefore teacher-authored for this platform, with the
 * most suitable answer, the reasoning, and any grammatical alternative that a
 * different context would justify.
 */
export const TEST_SOLUTIONS_36: TestSolution36[] = [
  {
    n: 1, level: 1, answer: "A. will", judgment: "most-natural", sourceStatus: "teacher-authored", correctOption: 0, acceptableOptions: [1],
    explanation: "الرد المباشر على «I'm thirsty» قرار أو عرض يُقدَّم في لحظة الكلام، وهنا تظهر WILL بصورة طبيعية.",
    alternatives: ["«I'm going to get you some water» ليست خطأً نحويًا، لكنها توحي بخطة سابقة لا يذكرها الموقف."],
  },
  {
    n: 2, level: 1, answer: "B. are going to", judgment: "most-natural", sourceStatus: "teacher-authored", correctOption: 1, acceptableOptions: [0],
    explanation: "التذاكر مشتراة مسبقًا، فالمتحدث يقدّم ترتيبًا سابقًا؛ لذلك BE GOING TO هي الأنسب للسياق.",
    alternatives: ["«We will visit the museum» صحيحة نحويًا كإعلان أو توقع، لكنها لا تبرز الترتيب السابق بالقوة نفسها."],
  },
  {
    n: 3, level: 1, answer: "B. is going to", judgment: "most-natural", sourceStatus: "teacher-authored", correctOption: 1, acceptableOptions: [0],
    explanation: "المتحدث يشير إلى غيوم يراها الآن؛ إبراز الدليل الحاضر يجعل BE GOING TO الاختيار النموذجي.",
    alternatives: ["«It will rain» تبقى صحيحة إذا أراد المتحدث التعبير عن اعتقاد أو توقع عام؛ وجود الدليل لا يمنع WILL."],
  },
  {
    n: 4, level: 1, answer: "A. won't", judgment: "contextual", sourceStatus: "teacher-authored", correctOption: 0, acceptableOptions: [1],
    explanation: "«I promise» يجعل الوعد في لحظة الكلام هو الوظيفة الأساسية، وهنا تظهر WON'T بصورة طبيعية جدًا.",
    alternatives: ["«I'm not going to forget» صحيحة أيضًا وتعبّر عن نية مؤكدة أو طمأنة؛ تُقبل إذا وُضّح التركيز على النية."],
  },
  {
    n: 5, level: 1, answer: "A. will", judgment: "most-natural", sourceStatus: "teacher-authored", correctOption: 0, acceptableOptions: [1],
    explanation: "«I think» تقدّم رأيًا أو اعتقادًا عامًا، وهي صياغة نموذجية مع WILL.",
    alternatives: ["«I think technology is going to change education» صحيحة أيضًا؛ قد تبرز توقعًا قائمًا على مؤشرات أو أسباب."],
  },
  {
    n: 6, level: 2, answer: "are going to build", judgment: "most-natural", sourceStatus: "teacher-authored", accepts: ["are going to build"],
    explanation: "«We decided last week» يثبت أن القرار سابق للكلام، فتناسبه BE GOING TO مع are + going to + V1.",
    alternatives: ["«We will build…» ممكنة في سياق آخر، لكنها لا تبرز القرار السابق بالوضوح نفسه."],
  },
  {
    n: 7, level: 2, answer: "will answer / 'll answer", judgment: "most-natural", sourceStatus: "teacher-authored", accepts: ["will answer", "'ll answer"],
    explanation: "رنين الهاتف موقف جديد، والقرار يُتخذ الآن؛ لذلك WILL + V1.",
  },
  {
    n: 8, level: 2, answer: "is going to hit", judgment: "most-natural", sourceStatus: "teacher-authored", accepts: ["is going to hit"],
    explanation: "الدرّاج في مسار يصطدم بالحاجز أمام عينيك؛ BE GOING TO تبرز هذا الدليل الحاضر.",
    alternatives: ["WILL يمكن أن تصف اعتقادًا بالنتيجة نفسها، لكن going to هي الأنسب هنا."],
  },
  {
    n: 9, level: 2, answer: "will return / 'll return", judgment: "most-natural", sourceStatus: "teacher-authored", accepts: ["will return", "'ll return"],
    explanation: "«I promise» يقدّم وعدًا في لحظة الكلام، وWILL هي الصيغة الطبيعية للوعد؛ tomorrow تحدد الوقت فقط.",
    alternatives: ["يمكن التعبير عن وعد بنية مؤكدة، لكن WILL هي الصيغة التي يستدعيها «I promise» مباشرة."],
  },
  {
    n: 10, level: 2, answer: "will perform / 'll perform", judgment: "most-natural", sourceStatus: "teacher-authored", accepts: ["will perform", "'ll perform"],
    explanation: "«I believe» تقدّم اعتقادًا أو توقعًا؛ لذلك WILL + V1.",
    alternatives: ["BE GOING TO ممكنة إذا أضاف السياق توقعًا سابقًا أو دليلًا حاضرًا."],
  },
  {
    n: 11, level: 3, answer: "She will travel.", judgment: "grammatical-repair", sourceStatus: "teacher-authored", accepts: ["She will travel.", "She is going to travel."],
    explanation: "لا نجمع WILL وGOING TO في تركيب واحد. نختار بناءً مستقبليًا واحدًا: will + V1 أو is going to + V1.",
    alternatives: ["She is going to travel."],
  },
  {
    n: 12, level: 3, answer: "They are going to study tonight.", judgment: "grammatical-repair", sourceStatus: "teacher-authored", accepts: ["They are going to study tonight."],
    explanation: "بعد going to يأتي الفعل الأساسي study لا studied، والفاعل They يأخذ are.",
  },
  {
    n: 13, level: 3, answer: "Is he going to join us?", judgment: "grammatical-repair", sourceStatus: "teacher-authored", accepts: ["Is he going to join us?", "Will he join us?"],
    explanation: "سؤال BE GOING TO يبدأ بـ is قبل الفاعل، ولا نستخدم does مع هذا البناء.",
    alternatives: ["Will he join us? سؤال صحيح أيضًا، لكنه يعيد صياغة التركيب المسلَّم بصيغة WILL بدل إصلاح بنائه."],
  },
  {
    n: 14, level: 3, answer: "I won't forget.", judgment: "grammatical-repair", sourceStatus: "teacher-authored", accepts: ["I won't forget.", "I will not forget.", "I'm not going to forget.", "I am not going to forget."],
    explanation: "بعد won't يأتي الفعل الأساسي forget مباشرة، بلا to.",
    alternatives: ["I'm not going to forget. صحيحة أيضًا إذا أبرز المتحدث النية."],
  },
  {
    n: 15, level: 3, answer: "Will she help?", judgment: "grammatical-repair", sourceStatus: "teacher-authored", accepts: ["Will she help?", "Is she going to help?"],
    explanation: "نستخدم بناء سؤال واحدًا: Will + subject + V1، أو Is she going to + V1.",
    alternatives: ["Is she going to help? صحيحة نحويًا وتسأل عن النية أو الخطة مباشرة؛ دون سياق إضافي قد تكون كلتا الصياغتين مناسبة."],
  },
  {
    n: 16, level: 4, answer: "الجملتان صحيحتان. I'll buy a new laptop. تعرض عادةً قرارًا لحظيًا أو وعدًا أو إعلانًا، وI'm going to buy a new laptop. تعرض عادةً نية أو خطة سابقة.", judgment: "contextual", sourceStatus: "teacher-authored",
    explanation: "الجملتان وحدهما لا تحدّدان وقت اتخاذ القرار؛ على المتعلم أن يصف التركيز النموذجي لا أن يزعم أن إحداهما خطأ دائمًا.",
    alternatives: ["تُقبل أي إجابة دقيقة تذكر التداخل والسياق وما يريد المتحدث إبرازه."],
  },
  {
    n: 17, level: 4, answer: "لأن الطفل يبدو ساقطًا الآن؛ الوضع المرئي دليل حاضر يسند التوقع، وgoing to تبرزه.", judgment: "contextual", sourceStatus: "teacher-authored",
    explanation: "«Look!» توجّه الانتباه إلى دليل حاضر، وBE GOING TO تبرزه. هذا اختيار نموذجي لا منع لـWILL.",
    alternatives: ["تُقبل إجابة تذكر أن WILL يمكن أن تعبّر عن اعتقاد بالنتيجة نفسها."],
  },
  {
    n: 18, level: 4, answer: "نعم، الجملتان صحيحتان.", judgment: "contextual", sourceStatus: "teacher-authored",
    explanation: "WILL تقدّم توقعًا أو اعتقادًا، وقد تبرز going to أسبابًا أو دليلًا للتوقع؛ والسياق ليس مضطرًا إلى فرق كبير في كل مرة.",
    alternatives: ["درجة كاملة لأي إجابة تقبل الجملتين وتصف فرقًا محتملًا غير مطلق في التركيز."],
  },
  {
    n: 19, level: 4, answer: "لأن WILL تناسب الوعد حين يقدّم المتحدث التزامًا في لحظة الكلام.", judgment: "contextual", sourceStatus: "teacher-authored",
    explanation: "WILL / WON'T كثيرًا ما تصنع الوعد نفسه؛ وهذا استخدام طبيعي لا قاعدة تجعل كل وعد بـgoing to خطأ.",
    alternatives: ["تُقبل الإشارة إلى الالتزام الحاضر أو الطمأنة أو دور الوعد نفسه."],
  },
  {
    n: 20, level: 4, answer: "لا. tomorrow تحدد متى يُتوقع الحدث، لكنها لا تكشف هل الخطاب خطة سابقة أم قرار لحظي أم وعد أم توقع.", judgment: "contextual", sourceStatus: "teacher-authored",
    explanation: "I'll visit my aunt tomorrow وI'm going to visit my aunt tomorrow صحيحتان؛ النية والسياق هما ما يوجّه الاختيار.",
    alternatives: ["تُقبل أمثلة بتعبير زمني آخر إذا أظهر المتعلم الفرق نفسه."],
  },
  {
    n: 21, level: 5, answer: "I'll help you. / I will help you.", judgment: "open-model", sourceStatus: "teacher-authored",
    explanation: "الجملة المناسبة تستخدم WILL لقرار المساعدة المتخذ الآن. تُقبل أي جملة صحيحة تستجيب حاجة الصديق مباشرة.",
    alternatives: ["My friend needs help, so I'll help him now. — لا تُشترط هذه الصياغة حرفيًا."],
  },
  {
    n: 22, level: 5, answer: "I'm going to start a design course next month.", judgment: "open-model", sourceStatus: "teacher-authored",
    explanation: "القرار اتُّخذ منذ أسبوع، فـBE GOING TO تصف الخطة السابقة. التعبير الزمني ليس سبب الاختيار.",
    alternatives: ["تُقبل I'm going to begin… أو أي صياغة صحيحة تحفظ معنى القرار السابق."],
  },
  {
    n: 23, level: 5, answer: "It's going to rain.", judgment: "open-model", sourceStatus: "teacher-authored",
    explanation: "الغيوم السوداء والرياح القوية دليل حاضر، وBE GOING TO تبرزه بصورة طبيعية.",
    alternatives: ["تُقبل جملة مكافئة مثل Look at the clouds; it's going to rain. كما تُقبل WILL إذا صرّح المتعلم أنها اعتقاد لا الصيغة الوحيدة."],
  },
  {
    n: 24, level: 5, answer: "I promise I won't forget to bring your book.", judgment: "open-model", sourceStatus: "teacher-authored",
    explanation: "المطلوب وعد بعدم النسيان، وWON'T صيغة طبيعية للوعد المنفي.",
    alternatives: ["تُقبل I promise I will not forget… وI'm not going to forget… إذا كانت واضحة كوعد أو نية صادقة."],
  },
  {
    n: 25, level: 5, answer: "I believe robots will become more widespread in the future.", judgment: "open-model", sourceStatus: "teacher-authored",
    explanation: "المطلوب اعتقاد عن المستقبل، وWILL صيغة نموذجية للتوقع العام.",
    alternatives: ["تُقبل I think robots will be more common… وأي توقع اعتقادي واضح. وBE GOING TO ممكنة إذا أضاف المتعلم سياق توقع سابق أو دليلًا."],
  },
];

export const TEST_SOLUTION_COUNT_36 = TEST_SOLUTIONS_36.length;
