// Lesson 61: the currently implemented teaching text, organised into scenes.
// The original source has not been available for an independent comparison.
export type Line61 = { en: string; ar: string };
export type Pair61 = { direct: string; reported: string; ar?: string; directAr?: string; note?: string; alternative?: string };
export type Block61 =
  | { type: "text"; text: string }
  | { type: "note"; text: string }
  | { type: "formula"; en: string; ar?: string }
  | { type: "lines"; items: Line61[] }
  | { type: "pairs"; items: Pair61[] }
  | { type: "list"; items: string[] }
  | { type: "contrast"; items: { label: string; en: string; ar?: string }[] };
export type TheoryScene61 = { id: string; section: number; title: string; kicker: string; lead?: string; blocks: Block61[] };

export const THEORY_61: TheoryScene61[] = [
  {
    id: "bridge", section: 0, title: "من الجملة إلى نية المتحدث", kicker: "THE BRIDGE", blocks: [
      { type: "text", text: "في الدرس السابق 60 تعلمنا كيفية نقل الجمل الخبرية من الكلام المباشر إلى الكلام المنقول. سنكمل الموضوع بنقل الأسئلة والأوامر والتعليمات والطلبات والنصائح والتحذيرات والاقتراحات." },
      { type: "pairs", items: [{ direct: 'He said, "I am tired."', directAr: "هو قال: «أنا متعب».", reported: "He said that he was tired.", ar: "قال إنه كان متعبًا." }] },
      { type: "note", text: "الفكرة الأهم: لا نحتفظ بترتيب السؤال المباشر؛ بل نحوله إلى ترتيب جملة خبرية، مع النظر إلى المتحدث والمخاطَب والسياق." },
      { type: "pairs", items: [{ direct: "Where do you live?", reported: "He asked me where I lived.", ar: "سألني أين أعيش.", note: "اختفت do وجاء الفاعل قبل الفعل." }] },
    ],
  },
  {
    id: "yes-intro", section: 1, title: "أسئلة إجابتها نعم أو لا", kicker: "YES / NO", lead: "إذا كانت الإجابة نعم أو لا، فابحث عن الرابط قبل بناء الجملة.", blocks: [
      { type: "text", text: "أسئلة Yes/No يمكن أن تكون إجابتها Yes = نعم أو No = لا. لا تبدأ بأداة سؤال مثل What أو Where أو Why، وإنما تبدأ غالبًا بفعل مساعد." },
      { type: "lines", items: [
        { en: "Are you happy?", ar: "هل أنت سعيد؟" }, { en: "Do you speak English?", ar: "هل تتحدث الإنجليزية؟" },
        { en: "Can you drive?", ar: "هل تستطيع القيادة؟" }, { en: "Have you finished your homework?", ar: "هل أنهيت واجبك؟" },
        { en: "Will you travel tomorrow?", ar: "هل ستسافر غدًا؟" },
      ] },
      { type: "note", text: "في نقل هذه الأسئلة نستخدم if = إذا / ما إذا، أو whether = ما إذا. الكلمتان متقاربتان في هذا التركيب." },
    ],
  },
  {
    id: "yes-rule", section: 1, title: "بوابة الربط وترتيب الجملة", kicker: "YES / NO · FORM", blocks: [
      { type: "formula", en: "Subject + asked + (object) + if / whether + subject + verb", ar: "الفاعل + asked + الشخص الذي وُجّه إليه السؤال + if أو whether + الفاعل داخل السؤال + الفعل." },
      { type: "pairs", items: [{ direct: 'He asked me, "Are you tired?"', directAr: "سألني: «هل أنت متعب؟»", reported: "He asked me if I was tired.", ar: "سألني عما إذا كنت متعبًا." }] },
      { type: "list", items: ["استخدمنا asked لأننا ننقل سؤالًا.", "استخدمنا if لربط السؤال المنقول.", "أصبح ترتيب الكلمات I was، وليس was I.", "تغيرت you إلى I لأن الشخص الذي يتحدث عنه السؤال هو أنا.", "تغير فعل be من المضارع البسيط إلى الماضي البسيط عند تطبيق الرجوع الزمني الذي تعلمناه في الدرس 60."] },
    ],
  },
  {
    id: "yes-be", section: 1, title: "عندما يبدأ السؤال بفعل be", kicker: "SIGNAL · BE", blocks: [
      { type: "formula", en: "am / is / are → was / were", ar: "يتغير فعل be حسب الفاعل والزمن." },
      { type: "pairs", items: [
        { direct: 'She asked me, "Are you busy?"', reported: "She asked me if I was busy.", ar: "سألتني عما إذا كنت مشغولًا." },
        { direct: 'He asked her, "Is your brother at home?"', reported: "He asked her if her brother was at home.", ar: "سألها عما إذا كان أخوها في المنزل." },
        { direct: 'The teacher asked us, "Are you ready?"', reported: "The teacher asked us if we were ready.", ar: "سألنا المعلم عما إذا كنا مستعدين." },
        { direct: 'They asked him, "Were you ill yesterday?"', reported: "They asked him whether he had been ill the previous day.", ar: "سألوه عما إذا كان مريضًا في اليوم السابق.", note: "السؤال الأصلي في الماضي؛ أصبح Past Perfect عند تطبيق الرجوع الزمني، وافترض النموذج تغير يوم النقل." },
      ] },
    ],
  },
  {
    id: "yes-do", section: 1, title: "اختفاء Do / Does / Did", kicker: "REMOVE THE AUXILIARY", blocks: [
      { type: "text", text: "عندما يستخدم السؤال المباشر do أو does أو did في المضارع أو الماضي البسيط، تختفي هذه المساعدات في التحويل الأساسي لأن الجملة التابعة خبرية لا سؤال مباشر." },
      { type: "pairs", items: [
        { direct: 'She asked me, "Do you like coffee?"', directAr: "سألتني: «هل تحب القهوة؟»", reported: "She asked me if I liked coffee.", ar: "سألتني عما إذا كنت أحب القهوة.", note: "Do حُذفت، وyou أصبحت I، وlike أصبحت liked." },
        { direct: 'He asked me, "Does your father work here?"', reported: "He asked me if my father worked there.", ar: "سألني عما إذا كان أبي يعمل هناك.", note: "Does حُذفت، وyour أصبحت my، وwork أصبحت worked، وhere أصبحت there لأن مكان الإشارة تغير في هذا المثال." },
        { direct: 'The teacher asked Tom, "Did you finish the exercise?"', reported: "The teacher asked Tom if he had finished the exercise.", ar: "سأل المعلم توم عما إذا كان قد أنهى التمرين.", note: "Did حُذفت، وfinish أصبحت had finished، وyou أصبحت he لأن المخاطَب Tom." },
      ] },
      { type: "note", text: "She asked me if I did like coffee ليست الصيغة الأساسية هنا؛ قد تستعمل did للتوكيد في سياقات خاصة. لا تنتقل Do / Does / Did عادةً بوصفها أفعالًا مساعدة مستقلة؛ نضبط الفعل الأساسي والزمن بحسب السياق." },
    ],
  },
  {
    id: "yes-perfect", section: 1, title: "Have / Has في السؤال", kicker: "PERFECT SIGNAL", blocks: [
      { type: "pairs", items: [
        { direct: 'He asked me, "Have you finished your work?"', reported: "He asked me if I had finished my work.", ar: "سألني عما إذا كنت قد أنهيت عملي.", note: "Have finished → had finished." },
        { direct: 'She asked him, "Has your sister arrived?"', reported: "She asked him if his sister had arrived.", ar: "سألته عما إذا كانت أخته قد وصلت.", note: "Has arrived → had arrived." },
      ] },
    ],
  },
  {
    id: "yes-modals", section: 1, title: "Can / Will / May", kicker: "MODAL SIGNAL", blocks: [
      { type: "formula", en: "can → could  ·  will → would  ·  may → might", ar: "عند تطبيق الرجوع الزمني المعتاد." },
      { type: "pairs", items: [
        { direct: 'He asked me, "Can you swim?"', reported: "He asked me if I could swim.", ar: "سألني عما إذا كنت أستطيع السباحة." },
        { direct: 'She asked me, "Will you come tomorrow?"', reported: "She asked me whether I would come the following day.", ar: "سألتني عما إذا كنت سأحضر في اليوم التالي." },
        { direct: 'The teacher asked us, "May I use your dictionary?"', reported: "The teacher asked us whether he might use our dictionary.", ar: "سألنا المعلم عما إذا كان بإمكانه استخدام قاموسنا." },
      ] },
      { type: "note", text: "اختيار الضمير يعتمد على من قال الجملة ومن كان المخاطَب. تتغير كلمات الزمان والمكان والإشارة عندما يتغير مرجعها، لا تلقائيًا في كل موقف." },
    ],
  },
  {
    id: "if-whether", section: 1, title: "If أم Whether؟", kicker: "CONNECTOR CHOICE", blocks: [
      { type: "text", text: "كلتاهما تصلحان في معظم أسئلة Yes/No المنقولة، ومعناهما متقارب في هذا التركيب." },
      { type: "lines", items: [
        { en: "He asked me if I was ready.", ar: "سألني عما إذا كنت مستعدًا." },
        { en: "He asked me whether I was ready.", ar: "سألني عما إذا كنت مستعدًا." },
      ] },
      { type: "pairs", items: [{ direct: 'He asked me, "Are you coming or not?"', reported: "He asked me whether I was coming or not.", alternative: "He asked me whether or not I was coming.", ar: "سألني عما إذا كنت قادمًا أم لا." }] },
      { type: "note", text: "يفضّل whether في هذا المثال مع or not؛ ويمكن أيضًا استعمال if عندما تأتي or not في نهاية الجملة. أما whether or not المتجاورة فلا نستبدل فيها whether بـ if." },
    ],
  },
  {
    id: "wh-intro", section: 2, title: "احتفظ بأداة السؤال", kicker: "WH · IDENTIFY", blocks: [
      { type: "text", text: "أسئلة WH تبدأ بأداة استفهام. نحتفظ بالأداة نفسها عندما ننقل السؤال، ولا نضيف if أو whether إليها." },
      { type: "lines", items: [
        { en: "Who", ar: "من" }, { en: "What", ar: "ماذا / ما" }, { en: "Where", ar: "أين" }, { en: "When", ar: "متى" },
        { en: "Why", ar: "لماذا" }, { en: "Which", ar: "أيّ" }, { en: "Whose", ar: "لمن / ملك من" }, { en: "How", ar: "كيف" },
        { en: "How often", ar: "كم مرة" }, { en: "How long", ar: "كم المدة" },
        { en: "How much", ar: "كم للمفرد غير المعدود أو للسعر" }, { en: "How many", ar: "كم للعدد" },
      ] },
    ],
  },
  {
    id: "wh-order", section: 2, title: "الأداة ثم الفاعل ثم الفعل", kicker: "WH · REBUILD", blocks: [
      { type: "formula", en: "Subject + asked + (object) + WH-word + subject + verb", ar: "الفاعل + asked + الشخص + أداة السؤال + الفاعل + الفعل." },
      { type: "pairs", items: [{ direct: 'He asked me, "Where do you live?"', directAr: "سألني: «أين تعيش؟»", reported: "He asked me where I lived.", ar: "سألني أين أعيش." }] },
      { type: "contrast", items: [
        { label: "DIRECT ORDER", en: "Where + do + you + live?", ar: "ترتيب السؤال المباشر" },
        { label: "REPORTED ORDER", en: "where + I + lived.", ar: "ترتيب الجملة الخبرية" },
      ] },
      { type: "list", items: ["نحذف do.", "نضع الفاعل قبل الفعل.", "نغير الزمن عند الحاجة.", "نحافظ على أداة السؤال Where."] },
    ],
  },
  {
    id: "wh-where", section: 2, title: "Where / When / Why", kicker: "WH · ROUTES", blocks: [
      { type: "pairs", items: [
        { direct: 'She asked me, "Where are you going?"', reported: "She asked me where I was going.", ar: "سألتني إلى أين كنت ذاهبًا." },
        { direct: 'He asked me, "When will you arrive?"', reported: "He asked me when I would arrive.", ar: "سألني متى سأصل." },
        { direct: 'The teacher asked him, "Why did you leave early?"', reported: "The teacher asked him why he had left early.", ar: "سأله المعلم لماذا غادر مبكرًا.", note: "اختفت did وأصبحت left هي had left." },
      ] },
    ],
  },
  {
    id: "wh-what", section: 2, title: "What / Which / Whose", kicker: "WH · DETAILS", blocks: [
      { type: "pairs", items: [
        { direct: 'She asked me, "What are you doing?"', reported: "She asked me what I was doing.", ar: "سألتني ماذا كنت أفعل." },
        { direct: 'He asked me, "Which book do you prefer?"', reported: "He asked me which book I preferred.", ar: "سألني أي كتاب أفضّل." },
        { direct: 'The woman asked him, "Whose bag is this?"', reported: "The woman asked him whose bag that was.", ar: "سألته حقيبة من تلك.", note: "في هذا السياق أصبحت this هي that، والترتيب whose bag that was." },
      ] },
    ],
  },
  {
    id: "wh-how", section: 2, title: "مسارات How", kicker: "WH · MEASURE", blocks: [
      { type: "pairs", items: [
        { direct: 'He asked me, "How do you make this cake?"', reported: "He asked me how I made that cake.", ar: "سألني كيف أصنع تلك الكعكة." },
        { direct: 'She asked him, "How often do you exercise?"', reported: "She asked him how often he exercised.", ar: "سألته كم مرة يتمرن." },
        { direct: 'He asked me, "How long have you lived here?"', reported: "He asked me how long I had lived there.", ar: "سألني منذ متى أعيش هناك." },
        { direct: 'She asked me, "How much does this shirt cost?"', reported: "She asked me how much that shirt cost.", ar: "سألتني كم يبلغ سعر ذلك القميص." },
        { direct: 'The teacher asked us, "How many books have you read?"', reported: "The teacher asked us how many books we had read.", ar: "سألنا المعلم كم كتابًا قرأنا." },
      ] },
    ],
  },
  {
    id: "wh-subject", section: 2, title: "عندما تكون أداة السؤال هي الفاعل", kicker: "WH · SUBJECT", blocks: [
      { type: "text", text: "أحيانًا تكون Who أو What هي الفاعل نفسه؛ لا نضيف فاعلًا آخر بعدها بلا سبب." },
      { type: "pairs", items: [
        { direct: 'He asked, "Who broke the window?"', directAr: "سأل: «من كسر النافذة؟»", reported: "He asked who had broken the window.", ar: "سأل من الذي كسر النافذة.", note: "Who هي من قام بفعل الكسر؛ لا نقول He asked who he had broken the window?" },
        { direct: 'She asked, "What happened?"', reported: "She asked what had happened.", ar: "سألت ماذا حدث." },
        { direct: 'The teacher asked, "Who knows the answer?"', reported: "The teacher asked who knew the answer.", ar: "سأل المعلم من يعرف الإجابة." },
      ] },
      { type: "note", text: "إذا كانت أداة WH هي الفاعل، احتفظ بها فاعلًا، ولا تضف فاعلًا آخر بلا سبب." },
    ],
  },
  {
    id: "command", section: 3, title: "وجّه الأمر إلى شخص", kicker: "COMMAND · TOLD", blocks: [
      { type: "text", text: "الأمر جملة يطلب فيها شخص من شخص آخر أن يفعل شيئًا." },
      { type: "lines", items: [
        { en: "Open the door.", ar: "افتح الباب." }, { en: "Sit down.", ar: "اجلس." },
        { en: "Listen carefully.", ar: "استمع بعناية." }, { en: "Close your books.", ar: "أغلقوا كتبكم." },
      ] },
      { type: "formula", en: "Subject + told + object + to + base verb", ar: "told + الشخص + to + الفعل في صورته الأساسية." },
      { type: "pairs", items: [
        { direct: 'The teacher said to us, "Open your books."', directAr: "قال لنا المعلم: «افتحوا كتبكم».", reported: "The teacher told us to open our books.", ar: "أمرنا المعلم بفتح كتبنا.", note: "Open أصبحت to open؛ استخدمنا told us لأن المعلم وجّه الأمر إلينا." },
        { direct: 'My mother said to me, "Clean your room."', reported: "My mother told me to clean my room.", ar: "طلبت مني أمي أن أنظف غرفتي." },
        { direct: 'The coach said to the players, "Run faster."', reported: "The coach told the players to run faster.", ar: "طلب المدرب من اللاعبين أن يركضوا بسرعة أكبر." },
        { direct: 'The manager said to the workers, "Finish the project today."', reported: "The manager told the workers to finish the project that day.", ar: "طلب المدير من العمال إنهاء المشروع في ذلك اليوم." },
      ] },
    ],
  },
  {
    id: "ordered-instructed", section: 3, title: "قوة الأمر أم وضوح التعليمات؟", kicker: "COMMAND · INTENT", blocks: [
      { type: "text", text: "عندما يكون الأمر حازمًا أو رسميًا يمكن استخدام ordered. وعندما يقدّم شخص إرشادات لتنفيذ عمل نستخدم instructed. يختلف الفعل بحسب نية المتحدث، لا بحسب الشكل وحده." },
      { type: "formula", en: "ordered / instructed + object + to + infinitive" },
      { type: "pairs", items: [
        { direct: 'The officer said to the soldiers, "Move immediately!"', reported: "The officer ordered the soldiers to move immediately.", ar: "أمر الضابط الجنود بالتحرك فورًا." },
        { direct: 'The judge said to the man, "Leave the room."', reported: "The judge ordered the man to leave the room.", ar: "أمر القاضي الرجل بمغادرة الغرفة." },
        { direct: 'The doctor said to the patient, "Take this medicine twice a day."', reported: "The doctor instructed the patient to take that medicine twice a day.", ar: "وجّه الطبيب المريض إلى تناول ذلك الدواء مرتين يوميًا." },
        { direct: 'The teacher said to the students, "Write your names at the top of the page."', reported: "The teacher instructed the students to write their names at the top of the page.", ar: "أرشد المعلم الطلاب إلى كتابة أسمائهم أعلى الصفحة." },
      ] },
    ],
  },
  {
    id: "negative-command", section: 3, title: "من Don't إلى not to", kicker: "COMMAND · NEGATIVE", blocks: [
      { type: "formula", en: "Subject + told + object + not to + base verb" },
      { type: "pairs", items: [
        { direct: 'He said to me, "Don\'t touch that wire."', directAr: "قال لي: «لا تلمس ذلك السلك».", reported: "He told me not to touch that wire.", ar: "طلب مني ألا ألمس ذلك السلك." },
        { direct: 'The teacher said, "Don\'t make noise."', reported: "The teacher told us not to make noise.", ar: "طلب منا المعلم ألا نحدث ضوضاء.", note: "يفترض المثال أننا المخاطَبون؛ يحدّد السياق الشخص المقصود." },
        { direct: 'My father said to me, "Don\'t stay up late."', reported: "My father told me not to stay up late.", ar: "طلب مني أبي ألا أسهر حتى وقت متأخر." },
        { direct: 'The police officer said to the driver, "Don\'t park here."', reported: "The police officer told the driver not to park there.", ar: "طلب الشرطي من السائق ألا يوقف السيارة هناك." },
      ] },
    ],
  },
  {
    id: "warning-advice", section: 3, title: "التحذير والنصيحة", kicker: "WARNING / ADVICE", blocks: [
      { type: "text", text: "عندما يكون الكلام تحذيرًا من خطر نستخدم warned؛ وعندما يقدم شخص نصيحة لشخص آخر نستخدم advised." },
      { type: "formula", en: "warned + object + not to + infinitive  /  advised + object + to + infinitive" },
      { type: "pairs", items: [
        { direct: 'The teacher said to the children, "Don\'t play near the road."', reported: "The teacher warned the children not to play near the road.", ar: "حذّر المعلم الأطفال من اللعب بالقرب من الطريق." },
        { direct: 'The guide said to us, "Don\'t go near the edge."', reported: "The guide warned us not to go near the edge.", ar: "حذّرنا المرشد من الاقتراب من الحافة." },
        { direct: 'My doctor said to me, "Exercise regularly."', reported: "My doctor advised me to exercise regularly.", ar: "نصحني طبيبي بممارسة الرياضة بانتظام." },
        { direct: 'My teacher said to me, "Study harder."', reported: "My teacher advised me to study harder.", ar: "نصحني معلمي بأن أدرس بجدية أكبر." },
      ] },
      { type: "lines", items: [
        { en: "The guide warned us about the danger.", ar: "حذّرنا المرشد من الخطر. ويمكن استعمال warned + object + about + noun." },
        { en: "My doctor advised me not to eat too much sugar.", ar: "نصحني طبيبي بألا أتناول الكثير من السكر." },
      ] },
    ],
  },
  {
    id: "request", section: 4, title: "هل يسأل عن القدرة أم يطلب فعلًا؟", kicker: "REQUEST · CONTEXT", blocks: [
      { type: "text", text: "الأمر عادةً مباشر وحازم: Close the window. = أغلق النافذة. أما الطلب فأكثر تهذيبًا وغالبًا يستخدم Could you...? أو Can you...? أو Would you...? أو Will you...? أو Please...." },
      { type: "lines", items: [{ en: "Could you help me?", ar: "هل يمكنك مساعدتي؟" }] },
      { type: "pairs", items: [{ direct: 'He said to me, "Could you help me?"', reported: "He asked me to help him.", ar: "طلب مني أن أساعده.", alternative: "He asked me if I could help him.", note: "الأولى تنقل طلب المساعدة؛ الثانية تنقل السؤال عن القدرة أو إمكانية المساعدة. السياق يحدد المقصود، ولا تكون الثانية خطأ لمجرد اختلاف القصد." }] },
      { type: "formula", en: "asked + object + to + infinitive", ar: "عندما يكون المقصود طلب تنفيذ الفعل." },
      { type: "pairs", items: [
        { direct: 'She said to me, "Can you open the door, please?"', reported: "She asked me to open the door.", ar: "طلبت مني أن أفتح الباب." },
        { direct: 'The teacher said to Tom, "Could you answer this question?"', reported: "The teacher asked Tom to answer that question.", ar: "طلب المعلم من توم أن يجيب عن ذلك السؤال." },
        { direct: 'My friend said to me, "Would you wait for me?"', reported: "My friend asked me to wait for him.", ar: "طلب مني صديقي أن أنتظره." },
        { direct: 'She said to him, "Please carry this bag."', reported: "She asked him to carry that bag.", ar: "طلبت منه أن يحمل تلك الحقيبة." },
      ] },
    ],
  },
  {
    id: "negative-request", section: 4, title: "الطلب المنفي", kicker: "REQUEST · NEGATIVE", blocks: [
      { type: "formula", en: "asked + object + not to + infinitive" },
      { type: "pairs", items: [
        { direct: 'He said to me, "Please don\'t tell anyone."', reported: "He asked me not to tell anyone.", ar: "طلب مني ألا أخبر أحدًا." },
        { direct: 'She said to us, "Please don\'t be late."', reported: "She asked us not to be late.", ar: "طلبت منا ألا نتأخر." },
      ] },
    ],
  },
  {
    id: "suggestions", section: 5, title: "الاقتراح لا يساوي الأمر", kicker: "SUGGESTION", blocks: [
      { type: "text", text: "الاقتراح فكرة، وليس أمرًا مباشرًا أو طلبًا من شخص أن ينفذ شيئًا بمفرده بالضرورة." },
      { type: "formula", en: "suggested + verb-ing  /  suggested that + subject + (should) + base verb" },
      { type: "pairs", items: [
        { direct: 'He said, "Let\'s go to the park."', reported: "He suggested going to the park.", alternative: "He suggested that we should go to the park.", ar: "اقترح الذهاب إلى الحديقة. / اقترح أن نذهب إلى الحديقة." },
        { direct: 'She said, "Let\'s study together."', reported: "She suggested studying together.", alternative: "She suggested that we should study together.", ar: "اقترحت أن ندرس معًا." },
      ] },
      { type: "contrast", items: [
        { label: "NOT STANDARD", en: "She suggested me to study.", ar: "صيغة غير صحيحة في الإنجليزية القياسية." },
        { label: "SUGGEST", en: "She suggested studying. / She suggested that I should study.", ar: "اقترحت الدراسة." },
        { label: "ADVISE", en: "She advised me to study.", ar: "نصحتني بالدراسة." },
      ] },
      { type: "note", text: "بعد suggested that يمكن استخدام should + الفعل الأساسي أو الفعل الأساسي من دون should؛ أما suggested someone to فليست الصيغة القياسية." },
    ],
  },
  {
    id: "say-tell-ask", section: 6, title: "لوحة Say / Tell / Ask", kicker: "VERB SWITCHBOARD", blocks: [
      { type: "text", text: "Say تنقل الكلام أو المعلومة، وtell تذكر غالبًا الشخص المتلقي، وask تنقل الأسئلة والطلبات." },
      { type: "formula", en: "say + (that) + sentence  /  say + something + to + someone" },
      { type: "lines", items: [
        { en: "He said that he was tired.", ar: "قال إنه كان متعبًا." },
        { en: "He said to me that he was tired.", ar: "قال لي إنه كان متعبًا." },
      ] },
      { type: "formula", en: "tell + someone + that + sentence  /  tell + someone + (not) to + verb" },
      { type: "lines", items: [
        { en: "He told me that he was tired.", ar: "أخبرني أنه كان متعبًا." },
        { en: "He told me to wait.", ar: "طلب مني أن أنتظر." },
        { en: "He told me not to wait.", ar: "طلب مني ألا أنتظر." },
      ] },
      { type: "note", text: "لا نقول عادةً He told that he was tired لأن tell تحتاج غالبًا إلى الشخص المتلقي؛ الصحيح He told me that he was tired." },
      { type: "formula", en: "ask + if / whether + sentence  /  ask + WH-word + sentence  /  ask + someone + to + verb" },
      { type: "lines", items: [
        { en: "She asked if I was ready.", ar: "سألت عما إذا كنت مستعدًا." },
        { en: "She asked where I lived.", ar: "سألت أين أعيش." },
        { en: "She asked me to wait.", ar: "طلبت مني أن أنتظر." },
      ] },
      { type: "contrast", items: [
        { label: "SAY", en: "He said that he was busy.", ar: "قال إنه كان مشغولًا." },
        { label: "TELL", en: "He told me that he was busy.", ar: "أخبرني أنه كان مشغولًا." },
        { label: "ASK · QUESTION", en: "He asked if I was busy.", ar: "سأل عما إذا كنت مشغولًا." },
        { label: "ASK · REQUEST", en: "He asked me to wait.", ar: "طلب مني أن أنتظر." },
        { label: "TELL · COMMAND", en: "He told me to wait.", ar: "أمرني أو طلب مني أن أنتظر." },
      ] },
    ],
  },
];

export const ERRORS_61 = [
  { title: "ترتيب السؤال المباشر", wrong: "He asked me where did I live.", right: "He asked me where I lived.", why: "بعد أداة السؤال نستخدم ترتيب الجملة الخبرية: subject + verb." },
  { title: "if مع WH", wrong: "She asked me if where I lived.", right: "She asked me where I lived.", why: "Where هي أداة السؤال نفسها، فلا نحتاج إلى if." },
  { title: "الإبقاء على did", wrong: "He asked me if did I like music.", right: "He asked me if I liked music.", why: "نحذف did المساعدة ونضع الفاعل قبل الفعل مع الرجوع الزمني المناسب." },
  { title: "القلب بعد if", wrong: "She asked if was I tired.", right: "She asked if I was tired.", why: "بعد if نستخدم ترتيب الجملة الخبرية I was بدل was I." },
  { title: "النهي بعد tell", wrong: "He told me don't go.", right: "He told me not to go.", why: "النهي المنقول يستخدم told + object + not to + base verb." },
  { title: "suggest مع شخص وto", wrong: "She suggested me to study.", right: "She suggested studying.", alternative: "She suggested that I should study.", why: "استخدم suggested + ing أو suggested that؛ لا تستخدم suggested someone to." },
  { title: "علامة الاستفهام", wrong: 'He asked me, "Where do you live?"', right: "He asked me where I lived.", why: "الجملة المنقولة هنا خبرية كاملة فتنتهي بنقطة؛ أما إذا كانت الجملة الرئيسية سؤالًا حقيقيًا فقد تنتهي بعلامة استفهام." },
];

export const PROCEDURES_61 = [
  { title: "سؤال Yes/No", direct: 'She asked me, "Do you speak English?"', steps: ["نحدد نوع السؤال: يبدأ بـ Do، إذن هو Yes/No.", "نستخدم asked.", "نضيف if أو whether.", "نحذف Do.", "نغير الضمير: you → I.", "نغير الزمن عند الحاجة: speak → spoke."], result: "She asked me if I spoke English.", ar: "سألتني عما إذا كنت أتحدث الإنجليزية." },
  { title: "سؤال WH", direct: 'He asked me, "Where are you going?"', steps: ["نحدد أداة السؤال: Where.", "نستخدم asked.", "نحتفظ بـ Where.", "نحذف ترتيب السؤال.", "نضع الفاعل قبل الفعل.", "نغير الزمن والضمائر حسب السياق."], result: "He asked me where I was going.", ar: "سألني إلى أين كنت ذاهبًا." },
  { title: "أمر", direct: 'The teacher said to us, "Be quiet."', steps: ["نحدد أن الجملة أمر.", "نستخدم told.", "نذكر الشخص الذي تلقى الأمر: us.", "نستخدم to + الفعل الأساسي."], result: "The teacher told us to be quiet.", ar: "طلب منا المعلم أن نلتزم الهدوء." },
  { title: "نهي", direct: 'My father said to me, "Don\'t waste your time."', steps: ["نحدد أن الجملة نهي.", "نستخدم told.", "نذكر الشخص.", "نستخدم not to + الفعل الأساسي."], result: "My father told me not to waste my time.", ar: "طلب مني أبي ألا أضيع وقتي." },
];

export const SOLVED_61: Pair61[] = [
  { direct: 'She asked him, "Are you learning English?"', reported: "She asked him if he was learning English.", ar: "سألته عما إذا كان يتعلم الإنجليزية." },
  { direct: 'The teacher asked me, "Why are you laughing?"', reported: "The teacher asked me why I was laughing.", ar: "سألني المعلم لماذا كنت أضحك." },
  { direct: 'He asked her, "Did you see my brother?"', reported: "He asked her if she had seen his brother.", ar: "سألها عما إذا كانت قد رأت أخاه." },
  { direct: 'The mother said to the children, "Wash your hands."', reported: "The mother told the children to wash their hands.", ar: "طلبت الأم من الأطفال أن يغسلوا أيديهم." },
  { direct: 'The guard said to us, "Don\'t enter this room."', reported: "The guard warned us not to enter that room.", ar: "حذّرنا الحارس من دخول تلك الغرفة." },
  { direct: 'He said to me, "Could you lend me your pen?"', reported: "He asked me to lend him my pen.", ar: "طلب مني أن أعيره قلمي." },
  { direct: 'The doctor said to her, "You should get more sleep."', reported: "The doctor advised her to get more sleep.", ar: "نصحها الطبيب بالحصول على مزيد من النوم." },
  { direct: 'They said, "Let\'s visit the museum."', reported: "They suggested visiting the museum.", ar: "اقترحوا زيارة المتحف." },
];

export const DIALOGUE_61 = {
  direct: [
    { en: "Teacher: Where did you go yesterday, Adam?", ar: "المعلم: إلى أين ذهبت أمس يا آدم؟" },
    { en: "Adam: I went to the science museum.", ar: "آدم: ذهبت إلى متحف العلوم." },
    { en: "Teacher: Did you enjoy the visit?", ar: "المعلم: هل استمتعت بالزيارة؟" },
    { en: "Adam: Yes, I did.", ar: "آدم: نعم، استمتعت بها." },
    { en: "Teacher: What did you learn there?", ar: "المعلم: ماذا تعلمت هناك؟" },
    { en: "Adam: I learned about planets and space.", ar: "آدم: تعلمت عن الكواكب والفضاء." },
    { en: "Teacher: Can you show us your pictures?", ar: "المعلم: هل تستطيع أن تعرض لنا صورك؟" },
    { en: "Adam: Of course.", ar: "آدم: بالتأكيد." },
    { en: "Teacher: Please open your notebook and write three sentences about your visit. Don't make any noise while your classmates are working.", ar: "المعلم: من فضلك افتح دفترك واكتب ثلاث جمل عن زيارتك. لا تُحدث أي ضوضاء بينما يعمل زملاؤك." },
  ] as Line61[],
  reported: [
    { en: "The teacher asked Adam where he had gone the previous day.", ar: "سأل المعلم آدم إلى أين ذهب في اليوم السابق." },
    { en: "Adam replied that he had gone to the science museum.", ar: "أجاب آدم بأنه ذهب إلى متحف العلوم." },
    { en: "The teacher asked him if he had enjoyed the visit.", ar: "سأله المعلم عما إذا كان قد استمتع بالزيارة." },
    { en: "Adam replied that he had.", ar: "أجاب آدم بأنه استمتع بها." },
    { en: "The teacher asked him what he had learned there.", ar: "سأله المعلم عما تعلمه هناك." },
    { en: "Adam replied that he had learned about planets and space.", ar: "أجاب آدم بأنه تعلم عن الكواكب والفضاء." },
    { en: "The teacher asked him if he could show them his pictures.", ar: "سأله المعلم عما إذا كان يستطيع أن يعرض عليهم صوره." },
    { en: "Adam replied that he could.", ar: "أجاب آدم بأنه يستطيع ذلك." },
    { en: "Finally, the teacher asked him to open his notebook and write three sentences about his visit. The teacher also told him not to make any noise while his classmates were working.", ar: "وفي النهاية، طلب المعلم منه أن يفتح دفتره ويكتب ثلاث جمل عن زيارته. كما طلب منه ألا يُحدث ضوضاء بينما يعمل زملاؤه." },
  ] as Line61[],
  notes: ["Where did you go? → where he had gone.", "Did you enjoy? → if he had enjoyed.", "What did you learn? → what he had learned.", "Can you show? → if he could show.", "Please open → asked him to open.", "Don't make → told him not to make."],
  context: "سؤال Can you show قد يُفهم استفسارًا عن الإمكانية كما في النموذج، أو طلبًا مهذبًا بحسب الموقف: The teacher asked him to show them his pictures. نهي المعلم موجّه إلى آدم في الحوار، لذلك نستخدم him / his classmates عند نقله.",
};

export const READING_61 = {
  title: "A School Visit", titleAr: "زيارة مدرسية",
  paragraphs: [
    { en: "Last Monday, a group of students visited a science center with their teacher.", ar: "في يوم الاثنين الماضي، زارت مجموعة من الطلاب مركزًا للعلوم برفقة معلمهم." },
    { en: "When they arrived, the guide asked them where they were from. The students replied that they were from a local school.", ar: "عندما وصلوا، سألهم المرشد من أين أتوا. فأجاب الطلاب بأنهم من مدرسة محلية." },
    { en: "The guide then asked whether they had visited the center before. Most of them said that they had not.", ar: "ثم سألهم المرشد عما إذا كانوا قد زاروا المركز من قبل. وقال معظمهم إنهم لم يفعلوا ذلك." },
    { en: "The guide told the students to stay together and instructed them to follow the signs. He warned them not to touch the machines without permission.", ar: "طلب المرشد من الطلاب أن يبقوا معًا، ووجّههم إلى اتباع اللافتات. كما حذّرهم من لمس الأجهزة دون إذن." },
    { en: "One student asked the guide if he could take photographs. The guide replied that he could take photographs in some areas.", ar: "سأل أحد الطلاب المرشد عما إذا كان يستطيع التقاط الصور. فأجابه المرشد بأنه يستطيع التقاط الصور في بعض المناطق." },
    { en: "Later, the teacher asked the students what they had learned. One student explained that he had learned how robots worked.", ar: "وفي وقت لاحق، سأل المعلم الطلاب عما تعلموه. وشرح أحد الطلاب أنه تعلم كيف تعمل الروبوتات." },
    { en: "At the end of the visit, the teacher advised everyone to read more about science at home.", ar: "وفي نهاية الزيارة، نصح المعلم الجميع بقراءة المزيد عن العلوم في المنزل." },
  ] as Line61[],
  questions: [
    { q: "Where did the students go?", qar: "أين ذهب الطلاب؟", a: "They went to a science center.", aar: "ذهبوا إلى مركز للعلوم." },
    { q: "Who went with them?", qar: "من الذي ذهب معهم؟", a: "Their teacher went with them.", aar: "ذهب معهم معلمهم." },
    { q: "What did the guide ask them?", qar: "ماذا سألهم المرشد؟", a: "He asked them where they were from and whether they had visited the center before.", aar: "سألهم من أين أتوا وعما إذا كانوا قد زاروا المركز من قبل." },
    { q: "What did the guide tell the students to do?", qar: "ماذا طلب المرشد من الطلاب أن يفعلوا؟", a: "He told them to stay together and instructed them to follow the signs.", aar: "طلب منهم البقاء معًا ووجّههم إلى اتباع اللافتات." },
    { q: "What did the guide warn them not to do?", qar: "ماذا حذّرهم المرشد من فعله؟", a: "He warned them not to touch the machines without permission.", aar: "حذّرهم من لمس الأجهزة دون إذن." },
    { q: "What did one student ask the guide?", qar: "ماذا سأل أحد الطلاب المرشد؟", a: "The student asked if he could take photographs.", aar: "سأل الطالب عما إذا كان يستطيع التقاط الصور." },
    { q: "What did the teacher advise the students to do?", qar: "بماذا نصح المعلم الطلاب؟", a: "He advised them to read more about science at home.", aar: "نصحهم بقراءة المزيد عن العلوم في المنزل." },
  ],
};

export const WRITING_61 = {
  instruction: "اكتب فقرة من 8 إلى 12 جملة عن موقف حدث في المدرسة، واستخدم فيها الكلام المنقول.",
  requirements: ["سؤالًا من نوع Yes/No.", "سؤالًا يبدأ بـ WH.", "أمرًا.", "نهيًا.", "طلبًا مهذبًا.", "نصيحة.", "اقتراحًا."],
  title: "A Day at School", titleAr: "يوم في المدرسة",
  model: [
    { en: "Yesterday, our teacher asked us if we were ready for the English test. She asked us what we had studied the previous day.", ar: "أمس، سألتنا معلمتنا عما إذا كنا مستعدين لاختبار اللغة الإنجليزية. وسألتنا عما درسناه في اليوم السابق." },
    { en: "Then she told us to open our books and read the first passage. She warned us not to talk during the test.", ar: "ثم طلبت منا أن نفتح كتبنا ونقرأ القطعة الأولى. وحذّرتنا من التحدث أثناء الاختبار." },
    { en: "One student asked her if he could use a dictionary. She told him to wait until she gave permission.", ar: "سألها أحد الطلاب عما إذا كان يستطيع استخدام قاموس. وطلبت منه أن ينتظر حتى تعطيه الإذن." },
    { en: "After the test, she advised us to practise English every day. One student suggested studying together after school.", ar: "بعد الاختبار، نصحتنا بممارسة الإنجليزية كل يوم. واقترح أحد الطلاب أن ندرس معًا بعد المدرسة." },
    { en: "It was a useful and interesting lesson.", ar: "لقد كان درسًا مفيدًا وممتعًا." },
  ] as Line61[],
};

export const SPEAKING_61 = {
  instruction: "تخيل أنك تتحدث مع صديقك عن زيارة قمت بها إلى متحف. أجب شفهيًا عن الأسئلة التالية، ثم حوّل إجاباتك إلى الكلام المنقول.",
  questions: [
    { en: "Where did you go?", ar: "إلى أين ذهبت؟" }, { en: "Who went with you?", ar: "من ذهب معك؟" },
    { en: "What did you see?", ar: "ماذا شاهدت؟" }, { en: "Did you enjoy the visit?", ar: "هل استمتعت بالزيارة؟" },
    { en: "What did the guide tell you to do?", ar: "ماذا طلب منك المرشد أن تفعل؟" },
  ] as Line61[],
  pairs: [
    { direct: "I went to a museum.", reported: "I told my friend that I had gone to a museum." },
    { direct: "I saw many interesting objects.", reported: "I told my friend that I had seen many interesting objects." },
    { direct: 'The guide told me, "Don\'t touch the objects."', reported: "I told my friend that the guide had warned me not to touch the objects." },
  ] as Pair61[],
};

export const SUMMARY_61 = [
  { title: "نقل أسئلة Yes/No", formula: "asked + if / whether + subject + verb", direct: '"Are you happy?"', reported: "He asked if I was happy.", note: "نستخدم if أو whether." },
  { title: "نقل أسئلة WH", formula: "asked + WH-word + subject + verb", direct: '"Where do you live?"', reported: "He asked where I lived.", note: "نحتفظ بأداة السؤال؛ إن كانت هي الفاعل فلا نضيف فاعلًا آخر." },
  { title: "نقل الأوامر", formula: "told + object + to + verb", direct: '"Open the door."', reported: "He told me to open the door.", note: "نذكر الشخص ثم الفعل الأساسي مع to." },
  { title: "نقل النواهي", formula: "told + object + not to + verb", direct: '"Don\'t run."', reported: "He told me not to run.", note: "تتحول صيغة النهي إلى not to." },
  { title: "نقل الطلبات", formula: "asked + object + to + verb", direct: '"Could you help me?"', reported: "He asked me to help him.", note: "نقل الطلب يختلف عن السؤال عن القدرة." },
  { title: "نقل النصائح", formula: "advised + object + to + verb", direct: '"Study harder."', reported: "She advised me to study harder.", note: "advised تنقل النصيحة." },
  { title: "نقل التحذيرات", formula: "warned + object + not to + verb", direct: '"Don\'t touch it."', reported: "He warned me not to touch it.", note: "warned تنقل التحذير." },
  { title: "نقل الاقتراحات", formula: "suggested + verb-ing  /  suggested that + subject + should + verb", direct: '"Let\'s go."', reported: "She suggested going.", note: "أو suggested that مع الفاعل والفعل الأساسي." },
  { title: "أهم الفروق التي يجب حفظها", formula: "if / whether · WH · subject + verb · told / asked / advised / warned · suggested + ing / that", note: "Yes/No: نستخدم if أو whether. WH: نحتفظ بالأداة. السؤال المنقول: ترتيب الجملة الخبرية لا ترتيب السؤال. الأمر: told + object + to؛ النهي: told + object + not to؛ الطلب: asked + object + to؛ النصيحة: advised + object + to؛ التحذير: warned + object + not to؛ الاقتراح: suggested + ing أو suggested that." },
];
