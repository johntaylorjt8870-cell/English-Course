import { sourceSection36 } from "./ledger36";

export type Choice36 = { value: string; label: string };
export type ContextQuestion36 = {
  id: string;
  prompt: string;
  choices: Choice36[];
  accepted: string[];
  feedback: string;
  nuance?: string;
};

const forms = [
  { value: "will", label: "WILL" },
  { value: "going", label: "BE GOING TO" },
] as const;
const source = (id: string) => {
  const section = sourceSection36(id);
  if (!section) throw new Error(`Missing Lesson 36 source section: ${id}`);
  return section;
};

/** Platform-created response controls built only from source situations/examples. */
export const CONTEXT_LABS_36: Record<string, ContextQuestion36[]> = {
  s02: [
    {
      id: "computer-now",
      prompt: "فشل إصلاح الحاسوب وأنت تقرر في لحظة الكلام شراء جهاز جديد. أي صيغة تبرز القرار اللحظي؟",
      choices: [...forms],
      accepted: ["will"],
      feedback: "اختيار نموذجي: القرار اتُّخذ الآن ردًا على الخبر الجديد؛ لذلك يناسبه WILL.",
      nuance: "الصيغتان ليستا خطأين نحويين في كل سياق؛ السؤال هنا عن التركيز الذي يفرضه هذا الموقف.",
    },
    {
      id: "computer-plan",
      prompt: "ادخرت المال منذ أشهر، وقارنت الأجهزة، واخترت واحدًا للشهر القادم. أي صيغة تبرز الخطة السابقة؟",
      choices: [...forms],
      accepted: ["going"],
      feedback: "اختيار نموذجي: النية والقرار سابقان للحظة الكلام؛ لذلك يناسبهما BE GOING TO.",
      nuance: "كلمة next month وحدها لا تفرض هذه الصيغة؛ السياق السابق هو المهم.",
    },
  ],
  s04: [
    {
      id: "flashlight",
      prompt: "انطفأ ضوء الممر فجأة، ولم تكن تخطط لإحضار مصباح. اختر الصيغة الأنسب للرد.",
      choices: [...forms],
      accepted: ["will"],
      feedback: "WILL هي الاختيار الطبيعي للقرار الذي اتخذته الآن استجابةً للموقف.",
    },
    {
      id: "chairs",
      prompt: "تكتشفون الآن أن عدد الكراسي غير كافٍ، فتقرر إحضار اثنين من المطبخ.",
      choices: [...forms],
      accepted: ["will"],
      feedback: "القرار حدث الآن؛ في الحوار الأصلي قال المتحدث: I'll bring two from the kitchen.",
    },
    {
      id: "room-plan",
      prompt: "قررت قبل أسبوع أن تعيد تنظيم غرفتك يوم الجمعة.",
      choices: [...forms],
      accepted: ["going"],
      feedback: "الخطة موجودة قبل لحظة الكلام؛ BE GOING TO هي الصيغة النموذجية.",
    },
    {
      id: "newspaper-plan",
      prompt: "قررت المجموعة مسبقًا إنشاء صحيفة مدرسية ونشر العدد الأول الشهر القادم.",
      choices: [...forms],
      accepted: ["going"],
      feedback: "هذا مشروع مقرر مسبقًا، لا قرار لحظي؛ BE GOING TO تبرز الخطة.",
    },
  ],
  s05: [
    {
      id: "cook-now",
      prompt: "A: I'm hungry. B يقرر الآن أن يطبخ شيئًا للمخاطب.",
      choices: [...forms],
      accepted: ["will"],
      feedback: "الاختيار النموذجي: I'll cook something for you. الفعل cook لا يحدد الزمن؛ السياق يحدد القرار اللحظي.",
    },
    {
      id: "cook-plan",
      prompt: "يُسأل المتحدث عن خططه الليلة، وقد أعد عشاءً خاصًا لعائلته مسبقًا.",
      choices: [...forms],
      accepted: ["going"],
      feedback: "الخطة المسبقة تجعل I'm going to cook طبيعية هنا.",
    },
    {
      id: "study-now",
      prompt: "A: I don't understand this topic. B يقرر الآن أن يدرس مع صديقه.",
      choices: [...forms],
      accepted: ["will"],
      feedback: "عرض المساعدة والقرار الآن: I'll study it with you.",
    },
    {
      id: "study-plan",
      prompt: "أُعِدَّ جدول دراسة من قبل؛ والخطة هي دراسة الكيمياء ساعتين الليلة.",
      choices: [...forms],
      accepted: ["going"],
      feedback: "الدراسة جزء من جدول موجود مسبقًا؛ BE GOING TO تبرز الخطة.",
    },
  ],
  s06: [
    {
      id: "online-belief",
      prompt: "I think online education will become more interactive. ما الذي يبرزه المتحدث؟",
      choices: [
        { value: "belief", label: "رأي أو توقع عام" },
        { value: "evidence", label: "دليل حاضر واضح في المشهد" },
      ],
      accepted: ["belief"],
      feedback: "الجملة تقدّم رأي المتحدث، لذلك WILL اختيار طبيعي.",
    },
    {
      id: "glass-evidence",
      prompt: "كوب على حافة الطاولة ويد طفل تقترب منه. ما نوع التوقع؟",
      choices: [
        { value: "belief", label: "رأي عام بلا إبراز دليل حاضر" },
        { value: "evidence", label: "توقع يبرز دليلًا حاضرًا" },
      ],
      accepted: ["evidence"],
      feedback: "الخطر مرئي الآن؛ BE GOING TO صيغة طبيعية لإبراز الدليل.",
      nuance: "وجود الدليل لا يجعل WILL خطأ تلقائيًا.",
    },
    {
      id: "runner-evidence",
      prompt: "The runner looks completely exhausted. He's going to stop soon. ما الدليل الحاضر؟",
      choices: [
        { value: "belief", label: "مجرد اعتقاد عام" },
        { value: "evidence", label: "يبدو العداء منهكًا تمامًا" },
      ],
      accepted: ["evidence"],
      feedback: "حالة العداء الظاهرة الآن تسند التوقع وتجعله مثالًا طبيعيًا على BE GOING TO.",
    },
  ],
  s07: [
    {
      id: "clouds-overlap",
      prompt: "أنت تنظر إلى الغيوم. هل تصبح I think it will rain soon خطأ؟",
      choices: [
        { value: "both", label: "لا؛ الصيغتان ممكنتان، والاختيار يغيّر ما نبرزه." },
        { value: "going-only", label: "نعم؛ وجود الدليل يمنع WILL دائمًا." },
      ],
      accepted: ["both"],
      feedback: "الإجابة الصحيحة: لا. BE GOING TO تبرز الدليل عادةً، وWILL يمكن أن تعبّر عن اعتقاد المتحدث حتى مع وجوده.",
    },
  ],
  s08: [
    {
      id: "promise",
      prompt: "I promise I'll return your calculator tomorrow. ما وظيفة WILL هنا؟",
      choices: [
        { value: "promise", label: "وعد" },
        { value: "prior-plan", label: "خطة سابقة فقط" },
      ],
      accepted: ["promise"],
      feedback: "WILL طبيعية جدًا في وعد يُقدَّم عند الكلام.",
    },
    {
      id: "offer",
      prompt: "I'll carry those boxes for you. ما الوظيفة الأبرز؟",
      choices: [
        { value: "offer", label: "عرض مساعدة" },
        { value: "prior-plan", label: "إعلان عن خطة أُعدت منذ زمن" },
      ],
      accepted: ["offer"],
      feedback: "هذا عرض مساعدة لحظي، ولذلك WILL اختيار طبيعي.",
    },
    {
      id: "neighbor-plan",
      prompt: "I'm going to help my neighbor paint his house tomorrow. ما الذي يبرزه المتحدث؟",
      choices: [
        { value: "offer", label: "عرض لحظي للمساعدة" },
        { value: "prior-plan", label: "نية أو خطة موجودة مسبقًا" },
      ],
      accepted: ["prior-plan"],
      feedback: "الجملة تخبرنا بخطة موجودة مسبقًا، وليست عرضًا لحظيًا.",
    },
  ],
  s09: [
    {
      id: "will-help",
      prompt: "Will you help me? ما المعنى الذي يمكن أن تبرزه؟",
      choices: [
        { value: "willingness", label: "الاستعداد أو طلب المساعدة" },
        { value: "intention", label: "الخطة السابقة وحدها" },
      ],
      accepted: ["willingness"],
      feedback: "WILL YOU يمكن أن تسأل عن الاستعداد، وقد تؤدي وظيفة طلب المساعدة.",
    },
    {
      id: "going-help",
      prompt: "Are you going to help me? ما المعنى الأبرز؟",
      choices: [
        { value: "willingness", label: "طلب مساعدة لحظي بالضرورة" },
        { value: "intention", label: "النية أو الخطة" },
      ],
      accepted: ["intention"],
      feedback: "ARE YOU GOING TO تركز غالبًا على نية الشخص أو خطته.",
      nuance: "المعنى قد يتقارب بحسب السياق؛ لا توجد قطيعة مطلقة.",
    },
    {
      id: "will-technician",
      prompt: "Will you call the technician? ما القراءة الطبيعية في حوار الطابعة؟",
      choices: [
        { value: "willingness", label: "سؤال عن الاستعداد / قد يكون طلبًا" },
        { value: "intention", label: "سؤال صريح عن خطة محددة سابقة فقط" },
      ],
      accepted: ["willingness"],
      feedback: "في السياق الأصلي يمكن أن يكون سؤال استعداد أو طلبًا للقيام بالفعل.",
    },
    {
      id: "going-technician",
      prompt: "What are your plans for tomorrow? I'm going to call the technician. ما الذي يبرزه الرد؟",
      choices: [
        { value: "willingness", label: "استعداد لحظي" },
        { value: "intention", label: "خطة أو نية" },
      ],
      accepted: ["intention"],
      feedback: "السؤال عن الخطط والجواب BE GOING TO يبرزان نية موجودة.",
    },
  ],
  s10: [
    {
      id: "tomorrow-doesnt-decide",
      prompt: "كلتا جملتي زيارة العمة تحتويان tomorrow. لماذا لا تفرض الكلمة واحدةً من الصيغتين؟",
      choices: [
        { value: "timing", label: "لأنها تحدد وقت الحدث، لا سبب اختيار الصيغة أو نية المتحدث." },
        { value: "will", label: "لأن tomorrow تفرض WILL دائمًا." },
      ],
      accepted: ["timing"],
      feedback: "التعبير الزمني يحدد متى؛ أما القرار أو الخطة أو الوعد فيحدده السياق.",
    },
  ],
  s12: [
    {
      id: "wh-emphasis",
      prompt: "ما الملاحظة الأدق عند مقارنة أسئلة Wh بالصيغتين؟",
      choices: [
        { value: "nuance", label: "قد يتقارب المعنى؛ وGOING TO تبرز غالبًا الخطة أو النية." },
        { value: "absolute", label: "المعنى مختلف دائمًا ولا يمكن أن يتقارب." },
      ],
      accepted: ["nuance"],
      feedback: "هذه هي ملاحظة المصدر: تقارب ممكن، مع إبراز النية غالبًا في going to.",
    },
  ],
  s13: [
    {
      id: "will-be",
      prompt: "I will ___ ready in ten minutes.",
      choices: [
        { value: "be", label: "be" },
        { value: "am", label: "am" },
      ],
      accepted: ["be"],
      feedback: "بعد will يأتي الفعل الأساسي be: I will be ready.",
    },
    {
      id: "going-to-be",
      prompt: "She is going to ___ happy.",
      choices: [
        { value: "be", label: "be" },
        { value: "is", label: "is" },
      ],
      accepted: ["be"],
      feedback: "بعد going to يأتي V1؛ لذلك نقول is going to be happy.",
    },
  ],
  s14: [
    {
      id: "projector-check",
      prompt: "I'll check the cables.",
      choices: [
        { value: "now", label: "قرار لحظي وعرض مساعدة" },
        { value: "belief", label: "توقع عام" },
        { value: "evidence", label: "توقع بدليل حاضر" },
        { value: "plan", label: "خطة سابقة" },
      ],
      accepted: ["now"],
      feedback: "عمر يعرض أن يفحص الأسلاك الآن استجابةً لمشكلة جهاز العرض.",
    },
    {
      id: "presentation-finish",
      prompt: "Do you think we will finish the presentation on time?",
      choices: [
        { value: "now", label: "عرض مساعدة" },
        { value: "belief", label: "توقع بشأن المستقبل" },
        { value: "evidence", label: "توقع بدليل حاضر" },
        { value: "plan", label: "خطة سابقة" },
      ],
      accepted: ["belief"],
      feedback: "السؤال عن توقع مستقبلي باستخدام will.",
    },
    {
      id: "projector-noise",
      prompt: "It's going to stop working completely!",
      choices: [
        { value: "now", label: "قرار لحظي" },
        { value: "belief", label: "توقع عام" },
        { value: "evidence", label: "توقع مبني على الصوت الغريب" },
        { value: "plan", label: "خطة سابقة" },
      ],
      accepted: ["evidence"],
      feedback: "الصوت الغريب دليل حاضر يساند التوقع.",
    },
    {
      id: "backup-question",
      prompt: "What are we going to do?",
      choices: [
        { value: "now", label: "قرار لحظي" },
        { value: "belief", label: "رأي عام" },
        { value: "evidence", label: "توقع بدليل" },
        { value: "plan", label: "سؤال عن الخطوة / الخطة التالية" },
      ],
      accepted: ["plan"],
      feedback: "السؤال يبحث عن الخطوة أو الخطة التي سيتبعونها.",
    },
    {
      id: "backup-plan",
      prompt: "We're going to use my laptop.",
      choices: [
        { value: "now", label: "قرار لحظي" },
        { value: "belief", label: "اعتقاد عام" },
        { value: "evidence", label: "توقع بدليل" },
        { value: "plan", label: "خطة بديلة موجودة مسبقًا" },
      ],
      accepted: ["plan"],
      feedback: "يذكر عمر أن الخطة البديلة جُهزت مسبقًا.",
    },
    {
      id: "connect-now",
      prompt: "I'll connect it to the screen.",
      choices: [
        { value: "now", label: "قرار اتُّخذ الآن" },
        { value: "belief", label: "توقع عام" },
        { value: "evidence", label: "توقع بدليل حاضر" },
        { value: "plan", label: "خطة سابقة" },
      ],
      accepted: ["now"],
      feedback: "لينا تتخذ هذا القرار في لحظة الكلام.",
    },
  ],
  s15: [
    {
      id: "overlap-course",
      prompt: "I think she will enjoy the course. / I think she's going to enjoy the course.",
      choices: [
        { value: "overlap", label: "كلتاهما صحيحة؛ قد يختلف التركيز، وقد لا يفرض السياق فرقًا كبيرًا." },
        { value: "exclusive", label: "واحدة فقط صحيحة نحويًا في كل سياق." },
      ],
      accepted: ["overlap"],
      feedback: "الصيغتان صحيحتان. قد تبرز الثانية أسبابًا أو توقعًا مبنيًا على معلومات، لكن لا يلزم وجود فرق كبير دائمًا.",
    },
    {
      id: "overlap-meet",
      prompt: "We'll meet again soon. / We're going to meet again soon.",
      choices: [
        { value: "overlap", label: "كلتاهما ممكنة؛ السياق يوضح وعدًا/تأكيدًا أو نية/خطة." },
        { value: "timeword", label: "soon يحدد الصيغة وحده." },
      ],
      accepted: ["overlap"],
      feedback: "WILL قد تكون وعدًا أو تأكيدًا؛ وBE GOING TO قد تبرز نية أو خطة. لا تصطنع فرقًا بلا سياق.",
    },
  ],
  s16: [
    {
      id: "travel-offer",
      prompt: "ظهرت فرصة سفر مجانية فجأة، فقررت قبولها الآن.",
      choices: [...forms],
      accepted: ["will"],
      feedback: "قرار لحظي: I'll travel with you!",
    },
    {
      id: "travel-booked",
      prompt: "حجزت التذاكر منذ أسبوع.",
      choices: [...forms],
      accepted: ["going"],
      feedback: "خطة مسبقة: I'm going to travel next Friday.",
    },
    {
      id: "tourism-belief",
      prompt: "تتحدث عن مستقبل السياحة، من دون دليل مشهدي محدد.",
      choices: [...forms],
      accepted: ["will"],
      feedback: "توقع عام: I think more people will travel by electric aircraft in the future.",
    },
    {
      id: "travel-evidence",
      prompt: "ترى صديقك يحزم حقائبه وتعرف أنه حجز التذاكر.",
      choices: [...forms],
      accepted: ["going"],
      feedback: "استنتاج من معلومات حاضرة: He's going to travel soon.",
      nuance: "المعلومات هنا ليست دليلًا بصريًا فقط؛ المصدر يقول معلومات أو أدلة حاضرة.",
    },
  ],
};

export const DETECTIVE_ITEMS_36 = [
  { n: 1, prompt: source("s17").units[1], answers: ["She will study tomorrow.", "She is going to study tomorrow."], feedback: "استخدم صيغة مستقبل واحدة؛ بعد will يأتي V1، أو استخدم is going to + V1." },
  { n: 2, prompt: source("s17").units[2], answers: ["I am going to buy a new bicycle.", "I will buy a new bicycle."], feedback: "لا تجمع will وgoing to في تركيب واحد؛ اختر البناء الملائم." },
  { n: 3, prompt: source("s17").units[3], answers: ["He will go to the library."], feedback: "بعد will يأتي الفعل الأساسي go، لا goes." },
  { n: 4, prompt: source("s17").units[4], answers: ["They are going to visit us."], feedback: "بعد going to نستخدم الفعل الأساسي visit." },
  { n: 5, prompt: source("s17").units[5], answers: ["Will you join the club?", "Are you going to join the club?"], feedback: "كوّن سؤالًا ببناء واحد صحيح: Will + subject + V1، أو Am/Is/Are + subject + going to + V1." },
  { n: 6, prompt: source("s17").units[6], answers: ["Is she going to participate?"], feedback: "BE GOING TO في السؤال تبدأ بالمساعد is قبل she؛ لا نستخدم does." },
  { n: 7, prompt: source("s17").units[7], answers: ["I'm sure he will understand."], feedback: "استخدم will + V1؛ لا نضيف is بين الفاعل وwill." },
  { n: 8, prompt: source("s17").units[8], answers: ["Look! The glass is going to fall.", "Look! The glass will fall."], feedback: "BE GOING TO هو الاختيار التعليمي الأبرز مع الدليل الحاضر، لكن WILL ممكنة نحويًا وليست ممنوعة." },
  { n: 9, prompt: source("s17").units[9], answers: ["We won't cancel the trip."], feedback: "بعد won't يأتي الفعل الأساسي بلا to." },
  { n: 10, prompt: source("s17").units[10], answers: ["She isn't going to arrive late.", "She isn't going to be late."], feedback: "بعد going to يأتي V1: arrive. وللتعبير عن الحالة يمكن قول going to be late." },
] as const;

export const EXERCISE18_ITEMS_36 = [
  { n: 1, sourceUnitIndexes: [1, 2], answer: "will", explanation: "عرض مساعدة لحظي." },
  { n: 2, sourceUnitIndexes: [3], answer: "are going to", explanation: "خطة مسبقة." },
  { n: 3, sourceUnitIndexes: [4], answer: "is going to", explanation: "توقع مبني على دليل حاضر." },
  { n: 4, sourceUnitIndexes: [5], answer: "will", explanation: "وعد." },
  { n: 5, sourceUnitIndexes: [6], answer: "will", explanation: "توقع أو اعتقاد." },
  { n: 6, sourceUnitIndexes: [7, 8], answer: "will", explanation: "قرار لحظي." },
  { n: 7, sourceUnitIndexes: [9], answer: "are going to", explanation: "خطة مسبقة." },
  { n: 8, sourceUnitIndexes: [10], answer: "is going to", explanation: "دليل حاضر." },
] as const;

export const DIALOGUE19_ITEMS_36 = [
  { n: 1, answer: "I'm going to visit.", explanation: "خطة مسبقة." },
  { n: 2, answer: "I'll remind.", explanation: "عرض مساعدة أو قرار لحظي." },
  { n: 3, answer: "will give.", explanation: "توقع أو سؤال عن المستقبل." },
  { n: 4, answer: "will add.", explanation: "توقع منفي: I don't think she will add more work." },
] as const;

const readingSource = source("s21");
export const READING_QUESTION_TITLE_INDEX_36 = readingSource.units.indexOf("أسئلة الفهم");
export const READING_PASSAGE_36 = readingSource.units.slice(0, READING_QUESTION_TITLE_INDEX_36);
export const READING_QUESTIONS_36 = readingSource.units.slice(READING_QUESTION_TITLE_INDEX_36 + 1);
export const READING_QUESTION_UNIT_INDEXES_36 = READING_QUESTIONS_36.map((_, index) => READING_QUESTION_TITLE_INDEX_36 + 1 + index);
export const DIALOGUE19_BLANK_UNIT_INDEXES_36 = [2, 4, 5, 6] as const;
export const READING_ANSWERS_36 = readingSource.revealUnits!.slice(1, 8);
export const READING_ANALYSIS_36 = readingSource.revealUnits!.slice(9);

export const WRITING_CRITERIA_36 = source("s24").units.slice(3, 11);
export const WRITING_MODEL_36 = source("s24").units.slice(12, 16);

export const TIME_EXPRESSIONS_36 = ["tomorrow", ...source("s10").units.slice(8, 14)];
