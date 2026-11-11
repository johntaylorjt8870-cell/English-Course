// Eight source exercise groups and the source's 25-question test.
// Each question retains its source prompt and model; contextual alternatives are documented separately from the source.
export type AttemptItem61 = {
  prompt: string;
  answer: string;
  /** Source key as printed, when punctuation differs from the selectable option. */
  displayAnswer?: string;
  why: string;
  options?: string[];
  accept?: string[];
  ar?: string;
  hint?: string;
};
export type PracticeGroup61 = {
  id: string;
  title: string;
  instruction: string;
  items: AttemptItem61[];
  paragraph?: string;
  checklist?: string[];
  model?: { en: string; ar: string }[];
  postscript?: string;
};

export const PRACTICES_61: PracticeGroup61[] = [
  { id: "practice-1", title: "تحويل أسئلة Yes/No", instruction: "حوّل الجمل التالية إلى الكلام المنقول.", items: [
    { prompt: 'He asked me, "Are you hungry?"', answer: "He asked me if I was hungry.", why: "Are → was. You → I." },
    { prompt: 'She asked him, "Do you play football?"', answer: "She asked him if he played football.", why: "Do حُذفت. You → he. Play → played." },
    { prompt: 'The teacher asked us, "Have you finished the task?"', answer: "The teacher asked us if we had finished the task.", why: "Have finished → had finished." },
    { prompt: 'My father asked me, "Did you call your friend?"', answer: "My father asked me if I had called my friend.", why: "Did اختفت. Called → had called." },
    { prompt: 'They asked her, "Can you speak French?"', answer: "They asked her if she could speak French.", why: "Can → could." },
    { prompt: 'She asked me, "Will you visit us tomorrow?"', answer: "She asked me whether I would visit them the following day.", accept: ["She asked me if I would visit them tomorrow.", "She asked me whether I would visit them tomorrow."], why: "Will → would. Tomorrow → the following day. Us → them بحسب سياق الكلام. يتغير tomorrow عند تغير يوم النقل، وقد يبقى عند ثبات المرجع." },
  ] },
  { id: "practice-2", title: "تحويل أسئلة WH", instruction: "حوّل الجمل، محتفظًا بأداة السؤال وبترتيب الجملة الخبرية.", items: [
    { prompt: 'He asked me, "Where do you work?"', answer: "He asked me where I worked.", why: "حذفنا do، ووضعنا الفاعل قبل الفعل." },
    { prompt: 'She asked him, "Why are you crying?"', answer: "She asked him why he was crying.", why: "احتفظنا بـ Why، وحولنا Are إلى was." },
    { prompt: 'The teacher asked us, "What did you write?"', answer: "The teacher asked us what we had written.", why: "Did write → had written." },
    { prompt: 'My mother asked me, "When will you come home?"', answer: "My mother asked me when I would come home.", why: "Will → would." },
    { prompt: 'He asked her, "How long have you lived here?"', answer: "He asked her how long she had lived there.", accept: ["He asked her how long she had lived here."], why: "Have lived → had lived. Here → there. يتغير here إلى there إذا تغير المكان المرجعي، وقد يبقى عند ثباته." },
    { prompt: 'The man asked me, "Who broke the glass?"', answer: "He asked me who had broken the glass.", accept: ["The man asked me who had broken the glass."], why: "Who هي الفاعل، ولذلك لم نضف ضميرًا آخر بعدها. He تشير إلى الرجل في نموذج الإجابة." },
  ] },
  { id: "practice-3", title: "تحويل الأوامر والنواهي", instruction: "حوّل الجمل إلى الكلام المنقول، واختر الفعل بحسب معنى الموقف.", items: [
    { prompt: 'The teacher said to me, "Stand up."', answer: "The teacher told me to stand up.", why: "أمر مثبت: told + me + to + base verb." },
    { prompt: 'My mother said to me, "Clean your room."', answer: "My mother told me to clean my room.", why: "الأمر يتبع told me to، وتتحول your إلى my بحسب المخاطَب." },
    { prompt: 'The officer said to the driver, "Stop the car."', answer: "The officer ordered the driver to stop the car.", accept: ["The officer told the driver to stop the car."], why: "استخدم النموذج ordered للأمر الحازم؛ told ممكنة إن لم نقصد تأكيد الحزم." },
    { prompt: 'The teacher said to the students, "Don\'t talk."', answer: "The teacher told the students not to talk.", why: "Don't → not to في النهي." },
    { prompt: 'My father said to me, "Don\'t waste your money."', answer: "My father told me not to waste my money.", why: "told me not to مع تغيير your إلى my." },
    { prompt: 'The guide said to us, "Don\'t touch the paintings."', answer: "The guide warned us not to touch the paintings.", accept: ["The guide told us not to touch the paintings."], why: "يفترض النموذج أن القصد تحذير من تصرف قد يسبب مشكلة؛ told ممكنة لأمر من دون تأكيد التحذير." },
  ], postscript: "استخدمنا ordered في الأمر الحازم، وwarned عندما كان الكلام تحذيرًا من تصرف قد يسبب مشكلة." },
  { id: "practice-4", title: "الطلبات والنصائح والتحذيرات", instruction: "اختر الفعل الذي ينقل قصد المتحدث، ثم اكتب التحويل.", items: [
    { prompt: 'He said to me, "Could you carry this box?"', answer: "He asked me to carry that box.", accept: ["He asked me to carry this box."], why: "القصد طلب مهذب؛ this → that عند تغير مرجع الإشارة.", ar: "طلب مني أن أحمل ذلك الصندوق." },
    { prompt: 'She said to him, "Please wait here."', answer: "She asked him to wait there.", accept: ["She asked him to wait here."], why: "طلب مهذب باستخدام asked + object + to؛ يتغير here إذا تغير المكان.", ar: "طلبت منه أن ينتظر هناك." },
    { prompt: 'The doctor said to me, "Drink more water."', answer: "The doctor advised me to drink more water.", why: "نصيحة: advised + me + to.", ar: "نصحني الطبيب بشرب المزيد من الماء." },
    { prompt: 'The teacher said to us, "Don\'t use your phones during the lesson."', answer: "The teacher told us not to use our phones during the lesson.", why: "نهي: told us not to، وyour → our.", ar: "طلب منا المعلم ألا نستخدم هواتفنا أثناء الدرس." },
    { prompt: 'My friend said, "Let\'s play chess."', answer: "My friend suggested playing chess.", accept: ["My friend suggested that we should play chess.", "My friend suggested that we play chess."], why: "اقتراح: suggested + verb-ing أو suggested that + subject + (should) + base verb.", ar: "اقترح صديقي لعب الشطرنج." },
    { prompt: 'The coach said to the players, "You should practise every day."', answer: "The coach advised the players to practise every day.", why: "نقل النصيحة باستخدام advised + object + to.", ar: "نصح المدرب اللاعبين بالتدرب يوميًا." },
  ] },
  { id: "practice-5", title: "اختر الإجابة الصحيحة", instruction: "اختر الإجابة، ثم تحقّق واقرأ السبب.", items: [
    { prompt: "He asked me where _____.", options: ["A. did I live", "B. I lived", "C. do I live"], answer: "B. I lived", displayAnswer: "B. I lived.", why: "لأن السؤال المنقول يستخدم ترتيب الجملة الخبرية." },
    { prompt: "She asked if I _____ ready.", options: ["A. was", "B. am", "C. be"], answer: "A. was", displayAnswer: "A. was.", accept: ["B. am"], why: "لأننا نطبق الرجوع الزمني من am إلى was. ويمكن إبقاء am إذا ظلت الجاهزية قائمة ولم نستخدم الرجوع الزمني." },
    { prompt: "The teacher told us _____ quiet.", options: ["A. be", "B. to be", "C. being"], answer: "B. to be", displayAnswer: "B. to be.", why: "لأن تركيب الأمر المنقول هو told + object + to + verb." },
    { prompt: "He warned me _____ touch the wire.", options: ["A. don't", "B. to not", "C. not to"], answer: "C. not to", displayAnswer: "C. not to.", accept: ["B. to not"], why: "لأن النهي المنقول يستخدم not to + infinitive. وصيغة to not صحيحة أيضًا في الإنجليزية القياسية، وإن كان not to أكثر شيوعًا هنا." },
    { prompt: "She asked me _____ I liked tea.", options: ["A. where", "B. if", "C. what"], answer: "B. if", displayAnswer: "B. if.", why: "لأن السؤال من نوع Yes/No." },
    { prompt: "My friend suggested _____ a film.", options: ["A. to watch", "B. watching", "C. watched"], answer: "B. watching", displayAnswer: "B. watching.", why: "لأن suggest يأتي بعده غالبًا فعل ينتهي بـ ing." },
    { prompt: "He asked her what she _____.", options: ["A. was doing", "B. is she doing", "C. did she do"], answer: "A. was doing", displayAnswer: "A. was doing.", why: "لأن ترتيب السؤال المنقول هو الفاعل ثم الفعل." },
    { prompt: "The doctor advised him _____ smoking.", options: ["A. stop", "B. stopping", "C. to stop"], answer: "C. to stop", displayAnswer: "C. to stop.", why: "لأن advised + object + to + infinitive." },
  ] },
  { id: "practice-6", title: "اكتشف الخطأ وصححه", instruction: "في كل جملة خطأ واحد. اكتب الجملة الصحيحة.", items: [
    { prompt: "He asked me where did I work.", answer: "He asked me where I worked.", why: "الخطأ did I work؛ الصحيح I worked." },
    { prompt: "She asked if was I happy.", answer: "She asked if I was happy.", why: "الخطأ was I؛ الصحيح I was." },
    { prompt: "My father told me don't be late.", answer: "My father told me not to be late.", why: "الخطأ don't be؛ الصحيح not to be." },
    { prompt: "The teacher asked us where were we going.", answer: "The teacher asked us where we were going.", why: "الخطأ were we؛ الصحيح we were." },
    { prompt: "She suggested me to study harder.", answer: "She suggested studying harder.", accept: ["She suggested that I should study harder.", "She suggested that I study harder."], why: "الخطأ suggested me to study؛ استخدم suggested + ing أو suggested that + subject + (should) + base verb." },
    { prompt: "He asked me if did I know the answer.", answer: "He asked me if I knew the answer.", why: "الخطأ if did I know؛ الصحيح if I knew." },
    { prompt: "The doctor advised her taking more rest.", answer: "The doctor advised her to get more rest.", accept: ["The doctor advised her to take more rest."], why: "الخطأ: advised her taking. الصحيح: advised her to get. ويصح أيضًا إصلاح التركيب بأقل تغيير: advised her to take." },
    { prompt: "The guard warned us don't enter the building.", answer: "The guard warned us not to enter the building.", why: "الخطأ warned us don't enter؛ الصحيح warned us not to enter." },
  ] },
  { id: "practice-7", title: "ترجم إلى الإنجليزية", instruction: "ترجم إلى الإنجليزية. قد تكون هناك ترجمات صحيحة أخرى بحسب السياق.", items: [
    { prompt: "سألني أين أعيش.", answer: "He asked me where I lived.", why: "نحافظ على where ونضع الفاعل قبل الفعل." },
    { prompt: "سألتني عما إذا كنت أستطيع السباحة.", answer: "She asked me if I could swim.", why: "سؤال نعم أو لا: if ثم I could." },
    { prompt: "أخبرني المعلم أن أفتح الكتاب.", answer: "The teacher told me to open the book.", why: "told + me + to + open." },
    { prompt: "طلبت مني أمي ألا أتأخر.", answer: "My mother asked me not to be late.", why: "طلب منفي: asked me not to." },
    { prompt: "سأل المعلم الطلاب ماذا تعلموا.", answer: "The teacher asked the students what they had learned.", why: "what ثم الفاعل ثم الفعل في الزمن المناسب." },
    { prompt: "نصحني الطبيب أن أشرب المزيد من الماء.", answer: "The doctor advised me to drink more water.", why: "النصيحة: advised me to." },
    { prompt: "حذّرنا المرشد من الاقتراب من النهر.", answer: "The guide warned us not to go near the river.", why: "التحذير المنفي: warned us not to." },
    { prompt: "اقترح صديقي أن نلعب كرة القدم.", answer: "My friend suggested playing football.", accept: ["My friend suggested that we should play football.", "My friend suggested that we play football."], why: "suggested + ing أو suggested that we (should) play." },
  ] },
  { id: "practice-8", title: "حوّل الفقرة كاملة", instruction: "حوّل جميع الجمل السابقة إلى الكلام المنقول، في فقرة واحدة.", paragraph: 'The teacher said to the students: "Are you ready for the test? Have you studied all the lessons? What did you find difficult? Please open your notebooks. Write your answers carefully. Don\'t talk to your friends. If you have a question, ask me."',
    checklist: ["Are you ready for the test?", "Have you studied all the lessons?", "What did you find difficult?", "Please open your notebooks.", "Write your answers carefully.", "Don't talk to your friends.", "If you have a question, ask me."],
    items: [{
      prompt: 'The teacher said to the students: "Are you ready for the test? Have you studied all the lessons? What did you find difficult? Please open your notebooks. Write your answers carefully. Don\'t talk to your friends. If you have a question, ask me."',
      answer: "The teacher asked the students if they were ready for the test. He also asked them whether they had studied all the lessons. Then he asked them what they had found difficult. He asked them to open their notebooks and told them to write their answers carefully. He told them not to talk to their friends. Finally, he told them to ask him if they had a question.",
      ar: "سأل المعلم الطلاب عما إذا كانوا مستعدين للاختبار. وسألهم أيضًا عما إذا كانوا قد درسوا جميع الدروس. ثم سألهم عما وجدوه صعبًا. وطلب منهم فتح دفاترهم، وطلب منهم كتابة إجاباتهم بعناية. كما طلب منهم ألا يتحدثوا مع أصدقائهم. وأخيرًا، طلب منهم أن يسألوه إذا كان لديهم سؤال.",
      why: "نموذج المصدر يستخدم he للمعلم؛ يتحدد الضمير بالسياق. وif في التعليمات الأخيرة شرطية، وليست رابط سؤال Yes/No. قد تصح صياغات أخرى تحفظ المعنى.",
    }], model: [
    { en: "The teacher asked the students if they were ready for the test.", ar: "سأل المعلم الطلاب عما إذا كانوا مستعدين للاختبار." },
    { en: "He also asked them whether they had studied all the lessons.", ar: "وسألهم أيضًا عما إذا كانوا قد درسوا جميع الدروس." },
    { en: "Then he asked them what they had found difficult.", ar: "ثم سألهم عما وجدوه صعبًا." },
    { en: "He asked them to open their notebooks and told them to write their answers carefully.", ar: "وطلب منهم فتح دفاترهم، وطلب منهم كتابة إجاباتهم بعناية." },
    { en: "He told them not to talk to their friends.", ar: "كما طلب منهم ألا يتحدثوا مع أصدقائهم." },
    { en: "Finally, he told them to ask him if they had a question.", ar: "وأخيرًا، طلب منهم أن يسألوه إذا كان لديهم سؤال." },
  ] },
];

export type OriginalQuestion61 = AttemptItem61 & { n: number; section: number };
export const ORIGINAL_TEST_61: OriginalQuestion61[] = [
  { n: 1, section: 1, prompt: 'He asked me, "Are you tired?"', answer: "He asked me if I was tired.", why: "Are → was، وyou → I." },
  { n: 2, section: 1, prompt: 'She asked him, "Do you like reading?"', answer: "She asked him if he liked reading.", why: "حذفنا Do، وغيّرنا like إلى liked." },
  { n: 3, section: 1, prompt: 'The teacher asked us, "Have you completed the project?"', answer: "The teacher asked us if we had completed the project.", why: "Have completed → had completed." },
  { n: 4, section: 1, prompt: 'My mother asked me, "Will you come home early?"', answer: "My mother asked me whether I would come home early.", why: "Will → would." },
  { n: 5, section: 1, prompt: 'He asked her, "Can you drive?"', answer: "He asked her if she could drive.", why: "Can → could." },
  { n: 6, section: 2, prompt: 'She asked me, "Where do you study?"', answer: "She asked me where I studied.", why: "حافظنا على Where، وحذفنا do." },
  { n: 7, section: 2, prompt: 'He asked her, "Why are you upset?"', answer: "He asked her why she was upset.", why: "حافظنا على Why، وغيّرنا ترتيب السؤال." },
  { n: 8, section: 2, prompt: 'The teacher asked him, "What did you write?"', answer: "The teacher asked him what he had written.", why: "Did write → had written." },
  { n: 9, section: 2, prompt: 'My father asked me, "When will you travel?"', answer: "My father asked me when I would travel.", why: "Will → would." },
  { n: 10, section: 2, prompt: 'She asked, "Who opened the door?"', answer: "She asked who had opened the door.", why: "Who هي الفاعل، لذلك لم نضف فاعلًا آخر." },
  { n: 11, section: 3, prompt: 'The teacher said to us, "Sit down."', answer: "The teacher told us to sit down.", why: "أمر مثبت: told + object + to + verb." },
  { n: 12, section: 3, prompt: 'My father said to me, "Don\'t waste your time."', answer: "My father told me not to waste my time.", why: "نهي: told + object + not to + verb." },
  { n: 13, section: 3, prompt: 'The officer said to the driver, "Stop immediately."', answer: "The officer ordered the driver to stop immediately.", accept: ["The officer told the driver to stop immediately."], why: "استخدمنا ordered لأن الأمر حازم. وتصح told أيضًا عندما لا يُبرز الناقل الحزم." },
  { n: 14, section: 3, prompt: 'The guide said to us, "Don\'t touch the equipment."', answer: "The guide warned us not to touch the equipment.", accept: ["The guide told us not to touch the equipment."], why: "استخدمنا warned لأنه تحذير. وتصح told أيضًا إن كان مجرد نهي بحسب السياق." },
  { n: 15, section: 3, prompt: 'The teacher said to the students, "Write your names."', answer: "The teacher told the students to write their names.", why: "أمر مثبت باستخدام told + object + to." },
  { n: 16, section: 4, prompt: 'He said to me, "Could you help me?"', answer: "He asked me to help him.", why: "طلب مهذب، لذلك استخدمنا asked + object + to. أما if I could help فتنقل السؤال عن الإمكانية بحسب السياق." },
  { n: 17, section: 4, prompt: 'The doctor said to him, "Exercise regularly."', answer: "The doctor advised him to exercise regularly.", why: "نصيحة باستخدام advised." },
  { n: 18, section: 4, prompt: 'She said, "Let\'s go shopping."', answer: "She suggested going shopping.", accept: ["She suggested that we should go shopping.", "She suggested that we go shopping."], why: "اقتراح باستخدام suggested + ing." },
  { n: 19, section: 4, prompt: 'My mother said to me, "Please don\'t stay up late."', answer: "My mother asked me not to stay up late.", why: "طلب منفي باستخدام asked + object + not to." },
  { n: 20, section: 4, prompt: 'The teacher said to us, "You should revise your lessons."', answer: "The teacher advised us to revise our lessons.", why: "نصيحة باستخدام advised." },
  { n: 21, section: 5, prompt: "He asked me where _____.", options: ["A. was I going", "B. I was going", "C. did I go"], answer: "B. I was going", displayAnswer: "B. I was going.", why: "لأن السؤال المنقول لا يستخدم ترتيب السؤال المباشر." },
  { n: 22, section: 5, prompt: "She asked whether I _____ finished.", options: ["A. have", "B. had", "C. has"], answer: "B. had", displayAnswer: "B. had.", accept: ["A. have"], why: "لأن Present Perfect أصبح Past Perfect. هذا نموذج للرجوع الزمني؛ ويمكن إبقاء have إذا ظلت النتيجة حاضرة ولم نستخدم الرجوع الزمني." },
  { n: 23, section: 5, prompt: "The teacher told us _____ quiet.", options: ["A. to be", "B. being", "C. be"], answer: "A. to be", displayAnswer: "A. to be.", why: "لأن told + object + to + infinitive." },
  { n: 24, section: 5, prompt: "He warned me _____ touch the machine.", options: ["A. don't", "B. not to", "C. to not"], answer: "B. not to", displayAnswer: "B. not to.", accept: ["C. to not"], why: "لأن warned + object + not to + infinitive. وصيغة to not صحيحة أيضًا في الإنجليزية القياسية، وإن كان not to أكثر شيوعًا هنا." },
  { n: 25, section: 5, prompt: "She suggested _____ at home.", options: ["A. to study", "B. studied", "C. studying"], answer: "C. studying", displayAnswer: "C. studying.", why: "لأن suggest يأتي بعده غالبًا فعل ينتهي بـ ing." },
];
export const ORIGINAL_SECTIONS_61 = ["أسئلة Yes/No", "أسئلة WH", "الأوامر والنواهي", "الطلبات والنصائح والاقتراحات", "اختر الإجابة الصحيحة"];
export const PRACTICE_COUNT_61 = PRACTICES_61.reduce((total, group) => total + group.items.length, 0);
