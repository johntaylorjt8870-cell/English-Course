export type Lesson45Step = {
  id: string;
  station: string;
  title: string;
  emoji: string;
  lead: string;
  content: string[];
  examples?: { en: string; ar: string }[];
  lab?: "advice" | "meaning" | "past" | "politeness";
};

export const LESSON_TITLE_45 = "SHOULD & OUGHT TO";
export const LESSON_SUBTITLE_45 = "النصيحة، والتوصيات، والتوقعات، والتحدث عن أخطاء الماضي";
export const LESSON_IDENTITY_45 = "The Advice Intelligence Lab";
export const LESSON_STEP_COUNT_45 = 40;

export const STATIONS_45 = [
  { name: "بوابة النصيحة", start: 0, end: 5, emoji: "💡" },
  { name: "النفي والأسئلة", start: 6, end: 9, emoji: "❓" },
  { name: "OUGHT TO", start: 10, end: 14, emoji: "⭐" },
  { name: "النصيحة أم الإلزام؟", start: 15, end: 16, emoji: "⚖️" },
  { name: "التوقع المعقول", start: 17, end: 18, emoji: "🔮" },
  { name: "النظر إلى الماضي", start: 19, end: 23, emoji: "⏳" },
  { name: "OUGHT TO HAVE", start: 24, end: 24, emoji: "🕰️" },
  { name: "HAD BETTER", start: 25, end: 26, emoji: "🚨" },
  { name: "النصيحة اللبقة", start: 27, end: 27, emoji: "🤝" },
  { name: "المحقق والتطبيق", start: 28, end: 33, emoji: "🕵️" },
  { name: "القراءة والإنجاز", start: 34, end: 39, emoji: "🏆" },
];

export const STEPS_45: Lesson45Step[] = [
  { id:"cover", station:"بوابة النصيحة", title:"The Art of Giving Smart Advice", emoji:"💡", lead:"الدرس 45 · رحلة إتقان الإنجليزية — المنهج الشامل 120 درسًا — IQ200", content:[
    "تخيّل أن صديقك عمر يشعر بالتعب لأنه ينام متأخرًا كل ليلة.",
    "What should I do? — ماذا ينبغي أن أفعل؟",
    "You should go to bed earlier. — ينبغي أن تنام في وقت أبكر.",
    "ثم يخبرك أن لديه امتحانًا غدًا ولم يبدأ الدراسة: You ought to start revising now.",
    "بعد الامتحان: You should have studied earlier. — كان ينبغي أن تدرس في وقت أبكر.",
    "رحلتنا: نصيحة للحاضر أو المستقبل، توصية بما نراه صحيحًا، وتعليق على فعل ماضٍ كان الأفضل أن يحدث."
  ], examples:[{en:"You should go to bed earlier.",ar:"ينبغي أن تنام في وقت أبكر."},{en:"You ought to start revising now.",ar:"ينبغي أن تبدأ المراجعة الآن."},{en:"You should have studied earlier.",ar:"كان ينبغي أن تدرس في وقت أبكر."}]},
  { id:"objectives",station:"بوابة النصيحة",title:"أهداف الدرس",emoji:"🎯",lead:"بنهاية الدرس ستستطيع استخدام النصيحة والتوقع والنظر إلى الماضي بدقة.",content:[
    "① استخدام SHOULD للنصيحة والتوصية. ② استخدام SHOULDN'T للتحذير من تصرف غير مناسب. ③ تكوين الأسئلة باستخدام SHOULD.",
    "④ استخدام OUGHT TO ومقارنته بـ SHOULD. ⑤ التمييز بين النصيحة والضرورة والإلزام. ⑥ استخدام SHOULD للتوقعات المعقولة.",
    "⑦ فهم SHOULD HAVE + V3 وSHOULDN'T HAVE + V3. ⑧ التمييز بين SHOULD HAVE وMUST HAVE عند اختلاف المعنى.",
    "⑨ استخدام HAD BETTER تمهيديًا. ⑩ تقديم نصائح طبيعية ومهذبة في مواقف الحياة اليومية."
  ]},
  { id:"meaning",station:"بوابة النصيحة",title:"ما معنى SHOULD؟",emoji:"🧠",lead:"SHOULD فعل مساعد ناقص — Modal Auxiliary Verb.",content:[
    "نستخدمه للنصيحة، والتوصية، وما نراه التصرف المناسب، والتوقع المعقول.",
    "في البداية نركز على Giving Advice — تقديم النصيحة.",
    "لا تعني النصيحة أن هناك قانونًا يجبر الشخص على الفعل؛ بل إننا نراه مفيدًا أو مناسبًا."
  ],examples:[{en:"You should drink more water.",ar:"ينبغي أن تشرب المزيد من الماء."},{en:"You should practise English every day.",ar:"ينبغي أن تتدرب على الإنجليزية كل يوم."}]},
  { id:"form",station:"بوابة النصيحة",title:"القاعدة الأساسية",emoji:"⚙️",lead:"Subject + should + V1",content:[
    "SHOULD لا تتغير مع الفاعل، ويأتي بعدها الفعل بصيغته الأساسية دون TO.",
    "صحيح: He should study. ✅",
    "خطأ: He should studies. ❌ · He should to study. ❌ · He should studying. ❌"
  ],examples:[{en:"I should study harder.",ar:"ينبغي أن أدرس بجد أكبر."},{en:"She should sleep earlier.",ar:"ينبغي أن تنام في وقت أبكر."},{en:"We should protect the environment.",ar:"ينبغي علينا حماية البيئة."},{en:"They should listen carefully.",ar:"ينبغي أن يستمعوا بعناية."}]},
  { id:"pronouns",station:"بوابة النصيحة",title:"هل تتغير SHOULD مع الضمائر؟",emoji:"🔬",lead:"لا توجد صيغة shoulds ولا نضيف s للفعل بعدها.",content:[
    "I should study. · You should study. · He should study. · She should study.",
    "It should work. · We should study. · They should study.",
    "القاعدة واحدة مع جميع الضمائر."
  ]},
  { id:"direct-advice",station:"بوابة النصيحة",title:"النصيحة المباشرة",emoji:"💡",lead:"نستخدم SHOULD لاقتراح التصرف الذي نراه مناسبًا.",content:[
    "صديق لا يفهم درسًا: You should ask your teacher for help.",
    "أخ يقضي وقتًا طويلًا على الهاتف: You should take regular breaks.",
    "زميلة تريد تحسين الإنجليزية: You should read short English stories.",
    "صديق يريد النجاح في مسابقة علمية: You should prepare a clear plan.",
    "SHOULD لا تفرض الفعل بالضرورة؛ بل تقدم نصيحة."
  ],examples:[{en:"You should ask your teacher for help.",ar:"ينبغي أن تطلب المساعدة من معلمك."},{en:"You should take regular breaks.",ar:"ينبغي أن تأخذ فترات راحة منتظمة."},{en:"You should read short English stories.",ar:"ينبغي أن تقرئي قصصًا إنجليزية قصيرة."},{en:"You should prepare a clear plan.",ar:"ينبغي أن تضع خطة واضحة."}],lab:"advice"},
  { id:"dialogue",station:"بوابة النصيحة",title:"A Friend Needs Advice",emoji:"🎭",lead:"حوار تطبيقي: كيف نستخدم SHOULD وCOULD في الحديث الطبيعي؟",content:[
    "Maya: I'm having trouble remembering new English words.",
    "Omar: You should revise them regularly.",
    "Maya: I try, but I forget them quickly.",
    "Omar: You should use each new word in a sentence.",
    "Maya: That's a good idea. Should I write the sentences in a notebook?",
    "Omar: Yes, you should. You could also read them aloud.",
    "Maya: Thanks! I'll try that.",
    "الترجمة: أواجه صعوبة في تذكر الكلمات. ينبغي أن أراجعها بانتظام وأستخدم كل كلمة في جملة. هل ينبغي أن أكتبها في دفتر؟ نعم، ويمكنك أيضًا قراءتها بصوت مرتفع."
  ]},
  { id:"shouldnt",station:"النفي والأسئلة",title:"SHOULDN'T — النصيحة بعدم الفعل",emoji:"🚫",lead:"Subject + should not + V1 · الاختصار: shouldn't",content:[
    "نستخدم SHOULDN'T عندما نرى أن الفعل غير مناسب أو من الأفضل تجنبه.",
    "You shouldn't stay up too late. — لا ينبغي أن تسهر كثيرًا.",
    "She shouldn't skip breakfast. — لا ينبغي أن تتجاوز وجبة الفطور.",
    "We shouldn't waste water. — لا ينبغي أن نهدر الماء.",
    "They shouldn't make fun of others. — لا ينبغي أن يسخروا من الآخرين.",
    "SHOULDN'T لا تعني بالضرورة المنع القانوني."
  ],examples:[{en:"You shouldn't use your phone too much.",ar:"من الأفضل ألا تستخدم هاتفك كثيرًا."},{en:"You mustn't use your phone during the exam.",ar:"يُمنع عليك استخدام هاتفك أثناء الامتحان."}]},
  { id:"questions",station:"النفي والأسئلة",title:"السؤال باستخدام SHOULD",emoji:"❓",lead:"Should + Subject + V1?",content:[
    "Should I call the teacher? · Should we leave now? · Should she study more? · Should they apologise?",
    "خطأ: Do I should call him? ❌",
    "صحيح: Should I call him? ✅",
    "لأن SHOULD فعل مساعد، نضعه مباشرة قبل الفاعل في السؤال ولا نستخدم DO معه."
  ]},
  { id:"short-answers",station:"النفي والأسئلة",title:"الإجابات القصيرة",emoji:"💬",lead:"Yes, you should. / No, you shouldn't.",content:[
    "Should I study tonight? — Yes, you should. / No, you shouldn't.",
    "Should we bring our books? — Yes, you should. / No, you shouldn't.",
    "No, you shouldn't تعني أننا ننصح بعدم الفعل.",
    "No, you don't have to تعني أن الفعل ليس ضروريًا. هذا فرق مهم."
  ]},
  { id:"wh",station:"النفي والأسئلة",title:"أسئلة WH باستخدام SHOULD",emoji:"🔍",lead:"WH + should + Subject + V1?",content:[
    "What should I do? — ماذا ينبغي أن أفعل؟",
    "Where should we go? — إلى أين ينبغي أن نذهب؟",
    "When should she start studying? — متى ينبغي أن تبدأ الدراسة؟",
    "How should I solve this problem? — كيف ينبغي أن أحل هذه المسألة؟",
    "Why should we protect the environment? — لماذا ينبغي علينا حماية البيئة؟",
    "Who should lead the team? — من ينبغي أن يقود الفريق؟ هنا WHO تسأل عن الفاعل."
  ]},
  { id:"ought-meaning",station:"OUGHT TO",title:"ما معنى OUGHT TO؟",emoji:"⭐",lead:"تعبير قريب جدًا من SHOULD.",content:[
    "نستخدم OUGHT TO للنصيحة، والتصرف المناسب، والواجب الأخلاقي أو ما نراه صوابًا، والتوقع المعقول في بعض السياقات.",
    "الصيغة: Subject + ought to + V1",
    "انتبه إلى الفرق الشكلي: SHOULD + V1، لكن OUGHT TO + V1."
  ],examples:[{en:"You ought to respect your parents.",ar:"ينبغي أن تحترم والديك."},{en:"She ought to apologise.",ar:"ينبغي أن تعتذر."},{en:"We ought to help people in need.",ar:"ينبغي علينا مساعدة المحتاجين."}]},
  { id:"compare-ought",station:"OUGHT TO",title:"مقارنة التركيبين",emoji:"⚙️",lead:"كل الجمل التالية صحيحة.",content:[
    "You should study. / You ought to study.",
    "She should apologise. / She ought to apologise.",
    "We should help others. / We ought to help others.",
    "He should be careful. / He ought to be careful.",
    "خطأ: You ought study. ❌ · صحيح: You ought to study. ✅",
    "خطأ: You should to study. ❌ · صحيح: You should study. ✅"
  ]},
  { id:"ought-meaning-difference",station:"OUGHT TO",title:"هل توجد فروق في المعنى؟",emoji:"🧠",lead:"في كثير من المواقف يمكن استخدام SHOULD وOUGHT TO بالتبادل.",content:[
    "You should tell the truth. / You ought to tell the truth. — ينبغي أن تقول الحقيقة.",
    "قد توحي OUGHT TO أحيانًا بواجب أخلاقي، لكن هذا ليس فرقًا ثابتًا في كل سياق.",
    "SHOULD أكثر شيوعًا ومرونة في المحادثات اليومية. OUGHT TO صحيحة وطبيعية لكنها أقل استخدامًا نسبيًا، خصوصًا في الأسئلة والنفي."
  ]},
  { id:"ought-negative",station:"OUGHT TO",title:"النفي باستخدام OUGHT NOT TO",emoji:"🚫",lead:"Subject + ought not to + V1",content:[
    "You ought not to waste your time. — لا ينبغي أن تهدر وقتك.",
    "She ought not to speak rudely. — لا ينبغي أن تتحدث بوقاحة.",
    "We ought not to ignore this problem. — لا ينبغي علينا تجاهل هذه المشكلة.",
    "قد تصادف oughtn't to، لكنها أقل شيوعًا وقد تبدو رسمية أو مرتبطة بلهجات معينة. غالبًا SHOULDN'T أبسط."
  ]},
  { id:"ought-question",station:"OUGHT TO",title:"السؤال باستخدام OUGHT TO",emoji:"❓",lead:"الصياغة ممكنة لكنها أقل شيوعًا يوميًا.",content:[
    "Ought I to call him? — هل ينبغي أن أتصل به؟",
    "Ought we to leave now? — هل ينبغي أن نغادر الآن؟",
    "في المحادثة اليومية غالبًا نقول Should I call him? وShould we leave now?",
    "القاعدة العملية: استخدم SHOULD في الأسئلة اليومية غالبًا، وافهم OUGHT TO حين تقرأها أو تسمعها."
  ]},
  { id:"modal-contrast",station:"النصيحة أم الإلزام؟",title:"SHOULD vs MUST vs HAVE TO",emoji:"⚔️",lead:"مقارنة تربط الدرس 45 بالدرس 44.",content:[
    "You should wear a helmet. — نصيحة.",
    "You must wear a helmet. — إلزام قوي أو تعليمات مؤكدة.",
    "You have to wear a helmet. — ضرورة أو متطلب.",
    "You should revise before the exam. — ينبغي أن تراجع قبل الامتحان.",
    "You must not cheat during the exam. — يُمنع عليك الغش أثناء الامتحان.",
    "You have to bring your identification card. — يجب عليك إحضار بطاقة التعريف."
  ],lab:"meaning"},
  { id:"three-meanings",station:"النصيحة أم الإلزام؟",title:"ثلاث جمل متشابهة ظاهريًا",emoji:"🔬",lead:"اختيار فعل مساعد واحد قد يغيّر المعنى بالكامل.",content:[
    "You shouldn't enter this room. — من الأفضل ألا تدخل هذه الغرفة. (نصيحة)",
    "You mustn't enter this room. — يُمنع عليك دخول هذه الغرفة. (منع)",
    "You don't have to enter this room. — لست مضطرًا إلى دخول هذه الغرفة. (عدم ضرورة)",
    "الخريطة: SHOULD نصيحة · OUGHT TO توصية/تصرف صحيح · MUST ضرورة قوية أو إلزام · HAVE TO ضرورة أو متطلب · MUSTN'T منع · DON'T HAVE TO عدم ضرورة · SHOULDN'T نصيحة بعدم الفعل."
  ],lab:"meaning"},
  { id:"expectation",station:"التوقع المعقول",title:"SHOULD لا تعني النصيحة دائمًا!",emoji:"🔮",lead:"في هذا الاستخدام، تعبّر SHOULD عن توقع معقول.",content:[
    "The bus should arrive in ten minutes. — من المتوقع أن تصل الحافلة خلال عشر دقائق.",
    "The package should arrive tomorrow. — من المتوقع أن تصل الطرد غدًا.",
    "She should be home by now. — من المفترض أنها وصلت إلى المنزل الآن.",
    "The exam shouldn't be too difficult. — من المتوقع ألا يكون الامتحان صعبًا جدًا.",
    "Everything should be ready by Friday. — من المتوقع أن يكون كل شيء جاهزًا بحلول الجمعة.",
    "You should study harder = نصيحة. The results should be ready tomorrow = توقع. السياق يحدد الوظيفة."
  ]},
  { id:"may-might",station:"التوقع المعقول",title:"SHOULD vs MAY vs MIGHT",emoji:"🌦️",lead:"تذكر الدرس 43: الاحتمال والتوقع ليسا متطابقين.",content:[
    "It may rain tomorrow. — قد تمطر غدًا.",
    "It might rain tomorrow. — ربما تمطر غدًا.",
    "The weather should improve tomorrow. — من المتوقع أن يتحسن الطقس غدًا.",
    "MAY وMIGHT تبرزان الاحتمال دون تأكيد. SHOULD تعرض توقعًا معقولًا بناءً على معلومات أو مؤشرات.",
    "لا توجد نسب مئوية ثابتة لهذه الأفعال؛ المعنى والسياق هما الأهم."
  ]},
  { id:"should-have",station:"النظر إلى الماضي",title:"SHOULD HAVE + V3",emoji:"⏳",lead:"ماذا لو كانت النصيحة متعلقة بالماضي؟",content:[
    "عمر لم يدرس جيدًا قبل الامتحان: I didn't study enough. — لم أدرس بما يكفي.",
    "You should have studied harder. — كان ينبغي أن تدرس بجد أكبر.",
    "الصيغة: Subject + should have + V3.",
    "في الاستخدام الشائع للنقد أو الندم، تعني أن الفعل كان أفضل لو حدث، لكنه غالبًا لم يحدث."
  ],examples:[{en:"I should have listened to my teacher.",ar:"كان ينبغي أن أستمع إلى معلمي."},{en:"She should have left earlier.",ar:"كان ينبغي أن تغادر في وقت أبكر."},{en:"We should have checked the answers.",ar:"كان ينبغي أن نتحقق من الإجابات."},{en:"They should have prepared better.",ar:"كان ينبغي أن يستعدوا بصورة أفضل."}],lab:"past"},
  { id:"should-have-context",station:"النظر إلى الماضي",title:"المعنى الدقيق لـ SHOULD HAVE",emoji:"🔬",lead:"لا نربط SHOULD HAVE بمعنى واحد آليًا.",content:[
    "I should have studied. — كان ينبغي أن أدرس. غالبًا لم أدرس كما ينبغي.",
    "لكن SHOULD HAVE قد تعبر أيضًا عن توقع متعلق بالماضي.",
    "The train should have arrived by now. — من المفترض أن القطار قد وصل بحلول الآن.",
    "الجملة الثانية ليست بالضرورة ندمًا أو لومًا؛ إنها توقع بشأن حدث كان يُفترض أن يكتمل."
  ]},
  { id:"shouldnt-have",station:"النظر إلى الماضي",title:"SHOULDN'T HAVE + V3",emoji:"🚫",lead:"فعل وقع في الماضي وكان من الأفضل ألا يحدث.",content:[
    "الصيغة: Subject + shouldn't have + V3.",
    "I shouldn't have eaten so much. — لم يكن ينبغي أن آكل كل هذه الكمية.",
    "She shouldn't have spoken rudely. — لم يكن ينبغي أن تتحدث بوقاحة.",
    "We shouldn't have wasted so much time. — لم يكن ينبغي أن نهدر كل هذا الوقت.",
    "He shouldn't have ignored the warning. — لم يكن ينبغي أن يتجاهل التحذير.",
    "I should have called her: غالبًا لم أتصل. I shouldn't have called her: غالبًا اتصلت وأرى الآن أن ذلك لم يكن مناسبًا."
  ],lab:"past"},
  { id:"past-contrast",station:"النظر إلى الماضي",title:"SHOULD HAVE vs SHOULDN'T HAVE",emoji:"⚔️",lead:"كلتاهما تنظر إلى الماضي من منظور الحاضر.",content:[
    "SHOULD HAVE + V3: كان ينبغي أن يحدث الفعل. I should have studied.",
    "SHOULDN'T HAVE + V3: كان ينبغي ألا يحدث الفعل. I shouldn't have wasted time.",
    "She should have apologised. / She shouldn't have shouted.",
    "We should have left earlier. / We shouldn't have waited so long.",
    "الأولى غالبًا فعل كان الأفضل القيام به؛ والثانية غالبًا فعل كان الأفضل تجنبه."
  ]},
  { id:"competition-dialogue",station:"النظر إلى الماضي",title:"The Missed Competition",emoji:"🎭",lead:"حوار يربط الندم بالتعلم من التجربة.",content:[
    "Maya: I missed the science competition yesterday. Omar: What happened?",
    "Maya: I woke up late. I should have set an alarm.",
    "Omar: That's unfortunate. You should have prepared everything the night before.",
    "Maya: You're right. I shouldn't have stayed up so late.",
    "Omar: Don't worry. You can learn from this experience.",
    "Maya: I will. Next time, I'll be more organised.",
    "التحليل: should have set = فعل كان من الأفضل القيام به؛ should have prepared = تعليق على الماضي؛ shouldn't have stayed up = فعل وقع وكان الأفضل تجنبه."
  ]},
  { id:"ought-have",station:"OUGHT TO HAVE",title:"OUGHT TO HAVE + V3",emoji:"⭐",lead:"نعم، يمكن استخدام OUGHT TO مع الماضي.",content:[
    "الصيغة: Subject + ought to have + V3.",
    "You ought to have told me earlier. — كان ينبغي أن تخبرني في وقت أبكر.",
    "She ought to have apologised. — كان ينبغي أن تعتذر.",
    "We ought to have checked the information. — كان ينبغي أن نتحقق من المعلومات.",
    "المعنى متقارب جدًا مع SHOULD HAVE، لكن SHOULD HAVE أكثر شيوعًا في المحادثات اليومية.",
    "النفي: You ought not to have ignored the warning. والأبسط والأكثر شيوعًا: You shouldn't have ignored the warning."
  ]},
  { id:"had-better",station:"HAD BETTER",title:"HAD BETTER — نصيحة تحمل تحذيرًا",emoji:"🚨",lead:"HAD BETTER + V1",content:[
    "يُستخدم عند تقديم نصيحة قوية، خصوصًا إذا كانت هناك نتيجة غير مرغوبة إن لم يتبعها الشخص.",
    "You had better leave now, or you'll miss the bus. — من الأفضل أن تغادر الآن وإلا ستفوتك الحافلة.",
    "الاختصار الشائع: You'd better leave now.",
    "You'd better take an umbrella. It looks like rain. · We'd better hurry.",
    "He'd better apologise before the situation gets worse.",
    "النفي: You'd better not touch that wire.",
    "خطأ: You'd better to leave. ❌ · صحيح: You'd better leave. ✅",
    "رغم وجود HAD، فإن التعبير عادةً نصيحة للحاضر أو المستقبل لا للماضي."
  ]},
  { id:"should-vs-better",station:"HAD BETTER",title:"SHOULD vs HAD BETTER",emoji:"⚖️",lead:"HAD BETTER غالبًا أقوى ويرتبط بعاقبة محتملة.",content:[
    "You should study tonight. — ينبغي أن تدرس الليلة. نصيحة عامة.",
    "You'd better study tonight, or you may fail tomorrow's test. — من الأفضل أن تدرس وإلا فقد ترسب.",
    "SHOULD = نصيحة أو توصية. HAD BETTER = نصيحة أقوى، وغالبًا إحساس بالاستعجال أو احتمال نتيجة سلبية."
  ]},
  { id:"polite-advice",station:"النصيحة اللبقة",title:"كيف نقدم النصيحة بلباقة؟",emoji:"🤝",lead:"طريقة تقديم النصيحة مهمة بقدر أهمية القاعدة.",content:[
    "You should study more. — ينبغي أن تدرس أكثر.",
    "I think you should study a little more. — أعتقد أنه ينبغي أن تدرس أكثر قليلًا. قد تبدو ألطف وأقل مباشرة.",
    "تراكيب مفيدة: I think you should... · Maybe you should... · You could also... · If I were you, I'd...",
    "If I were you, I'd... تعبير شائع للنصيحة، وستدرسه ضمن الجمل الشرطية المتقدمة لاحقًا.",
    "I think you should talk to your teacher. · Maybe you should take a short break. · You could also ask a friend for help."
  ],lab:"politeness"},
  { id:"detective",station:"المحقق والتطبيق",title:"Grammar Detective — صحح الأخطاء",emoji:"🕵️",lead:"جرّب اكتشاف الخطأ قبل فتح الحل.",content:[
    "① She shoulds study harder. ② He should to sleep earlier. ③ Do I should call him?",
    "④ You ought study more. ⑤ She ought to studies harder. ⑥ I should have went home earlier.",
    "⑦ He shouldn't have ate so much. ⑧ You had better to leave now. ⑨ She doesn't should worry.",
    "⑩ We should have checked the answers yesterday, but we don't.",
    "التصحيح: She should study harder. · He should sleep earlier. · Should I call him?",
    "You ought to study more. · She ought to study harder. · I should have gone home earlier.",
    "He shouldn't have eaten so much. · You had better leave now. · She shouldn't worry.",
    "We should have checked the answers yesterday, but we didn't.",
    "القاعدة: بعد SHOULD نستخدم V1؛ بعد OUGHT TO نستخدم V1؛ بعد SHOULD HAVE نستخدم V3؛ بعد HAD BETTER نستخدم V1."
  ]},
  { id:"practice-should",station:"المحقق والتطبيق",title:"التدريب الأول: SHOULD أم SHOULDN'T؟",emoji:"✍️",lead:"أكمل بحسب المعنى.",content:[
    "① You ___ drink enough water every day. ② Students ___ cheat in exams.",
    "③ We ___ protect the environment. ④ He ___ stay up too late before an exam.",
    "⑤ She ___ ask her teacher if she doesn't understand. ⑥ You ___ waste your time on unimportant things.",
    "الحلول: ① should · ② shouldn't · ③ should · ④ shouldn't · ⑤ should · ⑥ shouldn't."
  ]},
  { id:"practice-ought",station:"المحقق والتطبيق",title:"التدريب الثاني: SHOULD أم OUGHT TO؟",emoji:"🧩",lead:"أعد كتابة الجمل باستخدام OUGHT TO.",content:[
    "① You should respect others. ② She should apologise. ③ We should help our neighbours.",
    "④ He should be more careful. ⑤ They should tell the truth.",
    "الحلول: You ought to respect others. · She ought to apologise. · We ought to help our neighbours. · He ought to be more careful. · They ought to tell the truth."
  ]},
  { id:"practice-questions",station:"المحقق والتطبيق",title:"التدريب الثالث: حوّل إلى السؤال",emoji:"❓",lead:"ضع SHOULD قبل الفاعل.",content:[
    "① I should call the teacher. ② We should leave now. ③ She should study harder.",
    "④ They should bring their books. ⑤ Omar should apologise.",
    "الحلول: Should I call the teacher? · Should we leave now? · Should she study harder? · Should they bring their books? · Should Omar apologise?"
  ]},
  { id:"practice-past",station:"المحقق والتطبيق",title:"التدريب الرابع: SHOULD HAVE أم SHOULDN'T HAVE؟",emoji:"⏳",lead:"اختر الصيغة المناسبة ثم استخدم V3.",content:[
    "① I failed because I didn't study enough. I ___ (study) harder.",
    "② She shouted at her friend and regrets it. She ___ (shout) at her friend.",
    "③ We missed the bus because we left late. We ___ (leave) earlier.",
    "④ He ate too much and feels uncomfortable. He ___ (eat) so much.",
    "⑤ They made a mistake because they didn't check. They ___ (check) the information.",
    "الحلول: should have studied · shouldn't have shouted · should have left · shouldn't have eaten · should have checked."
  ]},
  { id:"practice-expectation",station:"المحقق والتطبيق",title:"التدريب الخامس: حدد وظيفة SHOULD",emoji:"🔮",lead:"نصيحة أم توقع؟",content:[
    "① You should practise every day. ② The train should arrive soon. ③ She should ask for help.",
    "④ The results should be ready tomorrow. ⑤ We shouldn't waste water. ⑥ The package should reach us by Friday.",
    "الحلول: ① نصيحة · ② توقع · ③ نصيحة · ④ توقع · ⑤ نصيحة بعدم الفعل · ⑥ توقع."
  ]},
  { id:"reading",station:"القراءة والإنجاز",title:"Reading Challenge — Learning from Mistakes",emoji:"📖",lead:"A Lesson in Responsibility",content:[
    "Omar is preparing for an important science competition. He has many ideas, but he sometimes struggles to organise his time.",
    "One afternoon, his teacher says: “You should make a clear plan before you begin. You ought to divide your work into smaller tasks.”",
    "Omar agrees, but he decides to start without a plan. A week later, he realises that he has forgotten several important details.",
    "“I should have listened to my teacher,” he says. “I shouldn't have wasted so much time.”",
    "His friend Maya tries to help: “Don't worry. You should focus on what you can do now. You could make a checklist and finish one task at a time.”",
    "Omar follows her advice. By the end of the week, his project is almost complete. His teacher smiles: “The final version should be ready by Monday.”",
    "Omar feels more confident. He has learned that good advice can save time and prevent mistakes."
  ]},
  { id:"reading-questions",station:"القراءة والإنجاز",title:"أسئلة فهم القراءة",emoji:"🔎",lead:"أجب بعد قراءة النص.",content:[
    "① What is Omar preparing for? ② What does his teacher advise him to do? ③ Does Omar follow the advice immediately?",
    "④ What mistake does he make? ⑤ What does I should have listened to my teacher express?",
    "⑥ What does I shouldn't have wasted so much time express? ⑦ What does Maya advise Omar to do?",
    "⑧ What does The final version should be ready by Monday express? ⑨ Extract an example of OUGHT TO. ⑩ What lesson does Omar learn?",
    "الحلول: مسابقة علوم مهمة؛ وضع خطة وتقسيم العمل؛ لا؛ بدأ بلا خطة ونسي تفاصيل؛ ندم على الماضي؛ ندم على فعل وقع؛ التركيز على الحاضر وقائمة مهام ومهمة واحدة كل مرة؛ توقع معقول؛ You ought to divide your work into smaller tasks؛ النصيحة الجيدة توفر الوقت وتمنع الأخطاء."
  ]},
  { id:"test-intro",station:"القراءة والإنجاز",title:"الاختبار النهائي — Master Test",emoji:"🏆",lead:"25 سؤالًا · خمسة مستويات · أجب دون الرجوع إلى الشرح.",content:[
    "اختبار شامل على SHOULD وOUGHT TO وSHOULD HAVE وSHOULDN'T HAVE وHAD BETTER، والفرق بين النصيحة والإلزام والتوقع.",
    "لن تُعرض الإجابات الصحيحة قبل إرسال المحاولة. بعد التسليم تظهر النتيجة ومراجعة الحلول."
  ]},
  { id:"teacher",station:"القراءة والإنجاز",title:"مساحة المعلم والحلول",emoji:"🔐",lead:"مراجعة الحلول التفصيلية بعد تسليم الاختبار.",content:[
    "تُفتح مراجعة الحلول بعد إرسال الطالب لمحاولته. يمكن استخدام مساحة المعلم للمراجعة الصفية.",
    "ملاحظة تقنية: أي رمز معلم مخزن داخل تطبيق الويب ليس حماية أمنية حقيقية؛ الغرض هنا تنظيم واجهة العرض وليس حماية أسرار."
  ]},
  { id:"writing",station:"القراءة والإنجاز",title:"Writing Mission — Advice That Changed My Life",emoji:"✍️",lead:"اكتب فقرة إنجليزية من 12 إلى 15 جملة.",content:[
    "تحدث عن نصيحة مفيدة تلقيتها، أو خطأ تعلمت منه، أو موقف احتجت فيه إلى قرار مهم.",
    "يجب أن تتضمن: ① ثلاث جمل SHOULD. ② جملتين SHOULDN'T. ③ جملتين OUGHT TO. ④ جملتين SHOULD HAVE + V3. ⑤ جملة SHOULDN'T HAVE + V3. ⑥ جملة HAD BETTER. ⑦ جملة SHOULD للتوقع. ⑧ سؤالًا باستخدام SHOULD.",
    "نموذج: Last year, I had trouble organising my study time. My teacher told me that I should make a weekly plan. She also said that I ought to divide difficult tasks into smaller steps. At first, I didn't follow her advice. I wasted a lot of time, and I didn't finish my project on time. I should have listened to her earlier. I shouldn't have left everything until the last minute. Now I understand that I should manage my time carefully. I shouldn't spend too much time on unimportant activities. Next week, I have another important project. I'd better start preparing today. If I follow my plan, everything should be ready before the deadline.",
    "التحدي: حدد كل SHOULD وصنّفها Advice أو Expectation أو Past Regret/Criticism."
  ]},
  { id:"summary",station:"القراءة والإنجاز",title:"الملخص الذهبي",emoji:"🧠",lead:"احفظ الصيغ وافهم الوظيفة من السياق.",content:[
    "SHOULD + V1: نصيحة — You should study harder. · SHOULDN'T + V1: نصيحة بعدم الفعل — You shouldn't waste time.",
    "Should + subject + V1? لطلب النصيحة — What should I do?",
    "SHOULD قد تعبر عن توقع معقول — The train should arrive soon.",
    "OUGHT TO + V1: نصيحة أو ما نراه تصرفًا صحيحًا — You ought to respect others.",
    "SHOULD HAVE + V3: كان ينبغي أن أفعل — I should have studied earlier.",
    "SHOULDN'T HAVE + V3: لم يكن ينبغي أن أفعل — I shouldn't have stayed up so late.",
    "OUGHT TO HAVE + V3: You ought to have told me earlier.",
    "HAD BETTER + V1: نصيحة أقوى — You'd better leave now.",
    "القاعدة الكبرى: SHOULD ليست MUST، وSHOULDN'T ليست MUSTN'T، وSHOULD HAVE ليست نصيحة عادية للحاضر؛ فكل تركيب يضيف معنى مختلفًا."
  ]},
  { id:"roadmap",station:"القراءة والإنجاز",title:"خريطة تقدم المنهج والمحطة القادمة",emoji:"🗺️",lead:"45 / 120 — 45 درسًا مكتملًا و75 درسًا متبقيًا.",content:[
    "الدرس القادم: Lesson 46 — MUSTN'T vs DON'T HAVE TO vs NEEDN'T.",
    "سنتعلم الفرق بين المنع وعدم الضرورة، واستخدام MUSTN'T وDON'T HAVE TO وNEEDN'T، والفرق بين DIDN'T NEED TO وNEEDN'T HAVE + V3.",
    "سنطبق ذلك في مواقف واقعية من المدرسة والسفر والقوانين والحياة اليومية، مع تدريبات متدرجة واختبار نهائي شامل.",
    "في الدرس 44 تعلمنا الضرورة والإلزام، وفي الدرس 45 تعلمنا النصيحة ومراجعة قرارات الماضي، وفي الدرس 46 سنميز بين الممنوع وغير الضروري وما لم تكن هناك حاجة إلى القيام به."
  ]}
];
