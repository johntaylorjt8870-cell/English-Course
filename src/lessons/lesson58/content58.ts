export type Ex58 = { active: string; activeAr: string; passive: string; passiveAr: string; why?: string };
export type PracticeItem58 = { prompt: string; options?: string[]; answer: string; why: string };
export type PracticeGroup58 = { title: string; instruction: string; items: PracticeItem58[] };

export const TENSES58 = [
  { name: "Present Simple", form: "am / is / are + V3", sentence: "The road is repaired every year.", ar: "يُصلح الطريق كل سنة.", subject: "The road", be: "is", v3: "repaired", meaning: "عادة أو حقيقة عامة" },
  { name: "Past Simple", form: "was / were + V3", sentence: "The road was repaired last year.", ar: "أُصلح الطريق العام الماضي.", subject: "The road", be: "was", v3: "repaired", meaning: "عمل حدث وانتهى في الماضي" },
  { name: "Future Simple", form: "will be + V3", sentence: "The road will be repaired next week.", ar: "سيُصلح الطريق الأسبوع القادم.", subject: "The road", be: "will be", v3: "repaired", meaning: "عمل سيحدث في المستقبل" },
  { name: "Present Continuous", form: "am / is / are + being + V3", sentence: "The road is being repaired now.", ar: "يجري إصلاح الطريق الآن.", subject: "The road", be: "is being", v3: "repaired", meaning: "العملية مستمرة الآن" },
  { name: "Past Continuous", form: "was / were + being + V3", sentence: "The road was being repaired at noon.", ar: "كان الطريق قيد الإصلاح ظهرًا.", subject: "The road", be: "was being", v3: "repaired", meaning: "العملية كانت مستمرة في وقت ماضٍ" },
  { name: "Present Perfect", form: "has / have + been + V3", sentence: "The road has been repaired.", ar: "لقد تم إصلاح الطريق.", subject: "The road", be: "has been", v3: "repaired", meaning: "عمل اكتمل ونتيجته متصلة بالحاضر" },
  { name: "Past Perfect", form: "had + been + V3", sentence: "The road had been repaired before winter.", ar: "كان الطريق قد أُصلح قبل الشتاء.", subject: "The road", be: "had been", v3: "repaired", meaning: "عمل اكتمل قبل حدث آخر في الماضي" },
] as const;

export const V3_CHECKS58 = [["build","built"],["write","written"],["steal","stolen"],["send","sent"],["make","made"],["speak","spoken"],["break","broken"],["complete","completed"],["repair","repaired"]] as const;

export const OPENING58 = {
  intro: "في الدرس السابق تعلمنا تكوين المبني للمجهول في زمن المضارع البسيط، وتعلمنا أن المفعول به في الجملة المبنية للمعلوم يصبح هو محور الجملة المبنية للمجهول. في هذا الدرس سنوسع هذه القاعدة، ونتعلم كيف نستخدم المبني للمجهول في أزمنة مختلفة، وكيف نختار صيغة الفعل المساعد المناسبة لكل زمن. هدفنا الأساسي: أن تستطيع تحويل الجملة من Active Voice إلى Passive Voice مع المحافظة على الزمن والمعنى.",
  rule: "Object + be + V3",
  explanation: "المفعول به + فعل be بالزمن المطلوب + التصريف الثالث للفعل الأساسي. فعل be هو الذي يتغير بحسب الزمن، أما الفعل الأساسي فيبقى دائمًا في التصريف الثالث V3.",
  example: { active: "They clean the room.", activeAr: "هم ينظفون الغرفة.", passive: "The room is cleaned.", passiveAr: "الغرفة تُنظَّف.", why: "clean هو الفعل الأساسي؛ cleaned هو V3؛ is هو فعل be الذي حددنا به زمن الجملة." },
};

export const TENSE_DETAILS58: { name: string; formula: string; use: string; agreement?: string[]; examples: Ex58[]; negative: string[]; questions: string[]; note?: string[] }[] = [
 { name:"Present Simple Passive", formula:"am / is / are + V3", use:"نستخدمه للحقائق العامة، والعادات والأعمال المتكررة، والأشياء التي تُصنع أو تُستخدم أو تُباع بصورة عامة، والتعليمات والعمليات المعتادة.", agreement:["I → am","He / She / It → is","اسم مفرد → is","You / We / They → are","اسم جمع → are"], examples:[
  {active:"They clean the rooms every day.",activeAr:"هم ينظفون الغرف كل يوم.",passive:"The rooms are cleaned every day.",passiveAr:"تُنظَّف الغرف كل يوم.",why:"rooms جمع، لذلك are."},
  {active:"Someone makes this bread.",activeAr:"شخص ما يصنع هذا الخبز.",passive:"This bread is made.",passiveAr:"هذا الخبز يُصنع.",why:"bread اسم غير معدود، ويُعامل هنا معاملة المفرد."},
  {active:"The company produces cars.",activeAr:"الشركة تنتج السيارات.",passive:"Cars are produced by the company.",passiveAr:"تُنتَج السيارات بواسطة الشركة."},
  {active:"People speak English in many countries.",activeAr:"يتحدث الناس الإنجليزية في دول كثيرة.",passive:"English is spoken in many countries.",passiveAr:"تُتحدث الإنجليزية في دول كثيرة."}],
  negative:["am / is / are + not + V3","The room is not cleaned every day. — الغرفة لا تُنظَّف كل يوم.","These products are not sold here. — هذه المنتجات لا تُباع هنا."],
  questions:["Am / Is / Are + Subject + V3?","Is English taught here? — هل تُدرَّس الإنجليزية هنا؟","Are these cars made in Japan? — هل تُصنع هذه السيارات في اليابان?"] },
 { name:"Past Simple Passive", formula:"was / were + V3", use:"لعمل حدث وانتهى في الماضي، مع التركيز على الشيء الذي وقع عليه الفعل.", agreement:["I / He / She / It / اسم مفرد → was","You / We / They / اسم جمع → were"], examples:[
  {active:"They built the bridge in 1990.",activeAr:"بنوا الجسر عام 1990.",passive:"The bridge was built in 1990.",passiveAr:"بُني الجسر عام 1990.",why:"bridge مفرد، والجملة في الماضي البسيط."},
  {active:"Someone stole my bag yesterday.",activeAr:"سرق شخص ما حقيبتي أمس.",passive:"My bag was stolen yesterday.",passiveAr:"سُرقت حقيبتي أمس."},
  {active:"They invited many students.",activeAr:"دعوا العديد من الطلاب.",passive:"Many students were invited.",passiveAr:"تمت دعوة العديد من الطلاب.",why:"students جمع."},
  {active:"The police arrested the thief.",activeAr:"ألقت الشرطة القبض على اللص.",passive:"The thief was arrested by the police.",passiveAr:"أُلقي القبض على اللص بواسطة الشرطة."}],
  negative:["was / were + not + V3","The door was not opened. — لم يُفتح الباب.","The documents were not signed. — لم تُوقَّع الوثائق."],
  questions:["Was / Were + Subject + V3?","Was the letter sent yesterday? — هل أُرسلت الرسالة أمس؟","Were the students invited? — هل تمت دعوة الطلاب؟"],
  note:["The room is cleaned. — الغرفة تُنظَّف (مضارع بسيط).","The room was cleaned. — نُظِّفت الغرفة (ماضٍ بسيط).","is = مضارع؛ was = ماضٍ، أما cleaned فبقي V3."] },
 { name:"Future Simple Passive", formula:"will be + V3", use:"لشيء سيحدث في المستقبل، مع التركيز على الشيء الذي سيقع عليه الفعل.", examples:[
  {active:"They will announce the results tomorrow.",activeAr:"سيعلنون النتائج غدًا.",passive:"The results will be announced tomorrow.",passiveAr:"سيتم الإعلان عن النتائج غدًا."},
  {active:"The company will build a new factory.",activeAr:"ستبني الشركة مصنعًا جديدًا.",passive:"A new factory will be built by the company.",passiveAr:"سيُبنى مصنع جديد بواسطة الشركة."},
  {active:"Someone will repair the computer.",activeAr:"سيصلح شخص ما الحاسوب.",passive:"The computer will be repaired.",passiveAr:"سيتم إصلاح الحاسوب."},
  {active:"They will finish the work next week.",activeAr:"سينهون العمل الأسبوع القادم.",passive:"The work will be finished next week.",passiveAr:"سينتهي العمل الأسبوع القادم."}],
  negative:["will + not + be + V3 / won't + be + V3","The results will not be announced today. — لن يتم الإعلان عن النتائج اليوم.","The road won't be repaired this week. — لن يتم إصلاح الطريق هذا الأسبوع."],
  questions:["Will + Subject + be + V3?","Will the project be completed tomorrow? — هل سيُنجز المشروع غدًا؟","Will the invitations be sent today? — هل ستُرسل الدعوات اليوم?"],
  note:["بعد will نستخدم be دائمًا، ولا نستخدم am أو is أو are."] },
 { name:"Present Continuous Passive", formula:"am / is / are + being + V3", use:"للعمل الجاري الآن أو في هذه الفترة. كلمة being تساعدنا على التعبير عن أن العملية مستمرة.", examples:[
  {active:"They are repairing the road now.",activeAr:"إنهم يصلحون الطريق الآن.",passive:"The road is being repaired now.",passiveAr:"يجري إصلاح الطريق الآن."},
  {active:"Someone is washing the car.",activeAr:"شخص ما يغسل السيارة.",passive:"The car is being washed.",passiveAr:"يجري غسل السيارة."},
  {active:"They are building a new hospital.",activeAr:"إنهم يبنون مستشفى جديدًا.",passive:"A new hospital is being built.",passiveAr:"يجري بناء مستشفى جديد."},
  {active:"The workers are painting the walls.",activeAr:"العمال يطلون الجدران.",passive:"The walls are being painted.",passiveAr:"يجري طلاء الجدران."}],
  negative:["am / is / are + not + being + V3","The road is not being repaired now. — لا يجري إصلاح الطريق الآن.","The rooms are not being cleaned. — لا يجري تنظيف الغرف."],
  questions:["Am / Is / Are + Subject + being + V3?","Is the car being washed? — هل يجري غسل السيارة؟","Are the houses being built? — هل يجري بناء المنازل؟"],
  note:["The road is repaired. — يُصلَح الطريق (عادة أو حقيقة عامة).","The road is being repaired. — يجري إصلاح الطريق (العملية مستمرة الآن).","being تجعلنا نعرف أن الفعل يحدث حاليًا."] },
 { name:"Past Continuous Passive", formula:"was / were + being + V3", use:"لعملية كانت مستمرة في وقت معين في الماضي.", examples:[
  {active:"They were painting the house at 5 p.m.",activeAr:"كانوا يطلون المنزل في الساعة الخامسة مساءً.",passive:"The house was being painted at 5 p.m.",passiveAr:"كان المنزل يُطلى في الساعة الخامسة مساءً."},
  {active:"Someone was repairing the computer.",activeAr:"كان شخص ما يصلح الحاسوب.",passive:"The computer was being repaired.",passiveAr:"كان الحاسوب قيد الإصلاح."},
  {active:"The workers were building the bridge.",activeAr:"كان العمال يبنون الجسر.",passive:"The bridge was being built.",passiveAr:"كان الجسر قيد البناء."},
  {active:"They were cleaning the classrooms.",activeAr:"كانوا ينظفون الفصول الدراسية.",passive:"The classrooms were being cleaned.",passiveAr:"كانت الفصول الدراسية قيد التنظيف."}],
  negative:["was / were + not + being + V3","The house was not being painted. — لم يكن المنزل يُطلى.","The rooms were not being cleaned. — لم تكن الغرف تُنظَّف."],
  questions:["Was / Were + Subject + being + V3?","Was the road being repaired? — هل كان الطريق قيد الإصلاح؟","Were the students being examined? — هل كان الطلاب يخضعون للاختبار؟"],
  note:["The house was painted. — طُلي المنزل (حدث وانتهى).","The house was being painted. — كان المنزل يُطلى (عملية مستمرة في وقت معين)."] },
 { name:"Present Perfect Passive", formula:"has / have + been + V3", use:"لعمل حدث في الماضي وله صلة بالحاضر، أو عندما نركز على النتيجة الحالية.", agreement:["He / She / It / اسم مفرد → has","I / You / We / They / اسم جمع → have"], examples:[
  {active:"They have completed the project.",activeAr:"لقد أكملوا المشروع.",passive:"The project has been completed.",passiveAr:"لقد تم إنجاز المشروع.",why:"project مفرد، لذلك has."},
  {active:"Someone has stolen my phone.",activeAr:"لقد سرق شخص ما هاتفي.",passive:"My phone has been stolen.",passiveAr:"لقد سُرق هاتفي."},
  {active:"They have cleaned the rooms.",activeAr:"لقد نظفوا الغرف.",passive:"The rooms have been cleaned.",passiveAr:"لقد تم تنظيف الغرف.",why:"rooms جمع، لذلك have."},
  {active:"The school has announced the results.",activeAr:"أعلنت المدرسة النتائج.",passive:"The results have been announced by the school.",passiveAr:"تم الإعلان عن النتائج بواسطة المدرسة.",why:"results جمع، لذلك have."}],
  negative:["has / have + not + been + V3","The project has not been completed. — لم يتم إنجاز المشروع.","The letters have not been sent. — لم تُرسل الرسائل."],
  questions:["Has / Have + Subject + been + V3?","Has the work been finished? — هل تم الانتهاء من العمل؟","Have the invitations been sent? — هل أُرسلت الدعوات؟"],
  note:["نختار has أو have بناءً على المبتدأ الجديد في Passive، وليس بناءً على الفاعل القديم في Active."] },
 { name:"Past Perfect Passive", formula:"had + been + V3", use:"لعمل اكتمل قبل حدث آخر في الماضي.", examples:[
  {active:"They had finished the work before I arrived.",activeAr:"كانوا قد أنهوا العمل قبل أن أصل.",passive:"The work had been finished before I arrived.",passiveAr:"كان العمل قد أُنجز قبل أن أصل."},
  {active:"Someone had stolen the documents before the police arrived.",activeAr:"كان شخص ما قد سرق الوثائق قبل وصول الشرطة.",passive:"The documents had been stolen before the police arrived.",passiveAr:"كانت الوثائق قد سُرقت قبل وصول الشرطة."}],
  negative:["had + not + been + V3","The work had not been finished. — لم يكن العمل قد أُنجز."],
  questions:["Had + Subject + been + V3?","Had the documents been found? — هل كانت الوثائق قد عُثر عليها؟"] },
];

export const COMPARE58 = [
 ["Present Simple","is + V3","The road is repaired.","يُصلح الطريق عادةً"],
 ["Present Continuous","is being + V3","The road is being repaired.","يجري إصلاح الطريق الآن"],
 ["Present Perfect","has been + V3","The road has been repaired.","تم إصلاح الطريق"],
 ["Past Simple","was + V3","The road was repaired.","أُصلح الطريق في الماضي"],
 ["Past Continuous","was being + V3","The road was being repaired.","كان الطريق قيد الإصلاح"],
 ["Past Perfect","had been + V3","The road had been repaired.","كان الطريق قد أُصلح"],
 ["Future Simple","will be + V3","The road will be repaired.","سيُصلح الطريق"],
] as const;
export const PERFECT_CONTRAST58 = [["The project has been completed.","تم إنجاز المشروع (نتيجة مرتبطة بالحاضر)."],["The project had been completed.","كان المشروع قد أُنجز قبل حدث آخر في الماضي."]] as const;
export const THREE_ROAD58 = [
 ["The road is repaired every year.","يُصلح الطريق كل سنة.","عمل متكرر أو معتاد."],
 ["The road is being repaired now.","يجري إصلاح الطريق الآن.","العملية مستمرة في الوقت الحالي."],
 ["The road has been repaired.","لقد تم إصلاح الطريق.","نركز على النتيجة الحالية؛ الطريق أصبح مُصلحًا."],
] as const;

export const TRANSFORM_STEPS58 = ["① حدد الفاعل Subject.","② حدد الفعل Verb.","③ حدد المفعول به Object.","④ ضع المفعول به في بداية الجملة الجديدة.","⑤ حدد زمن الجملة الأصلية بدقة.","⑥ اختر صيغة be المناسبة لهذا الزمن.","⑦ ضع الفعل الأساسي في التصريف الثالث V3."];
export const TRANSFORM_DEMO58 = [
 ["الجملة","The workers are building a new school.","العمال يبنون مدرسة جديدة."],
 ["① الفاعل","The workers",""],["② الفعل","are building",""],["③ المفعول به","a new school",""],["④ ننقل المفعول به إلى البداية","A new school ...",""],["⑤ الزمن","Present Continuous",""],["⑥ التركيب","am / is / are + being + V3",""],["⑦ التصريف الثالث","build → built",""],["النتيجة","A new school is being built by the workers.","يجري بناء مدرسة جديدة بواسطة العمال."],
] as const;

export const AGENT58 = {
 examples:[["The book was written by Ahmed.","كُتب الكتاب بواسطة أحمد."],["The house is being painted by the workers.","يجري طلاء المنزل بواسطة العمال."],["The results will be announced by the teacher.","سيتم الإعلان عن النتائج بواسطة المعلم."],["My phone has been stolen.","لقد سُرق هاتفي."]],
 drop:["by ليس إلزاميًا دائمًا.","نحذف الفاعل عندما لا نعرف من قام بالفعل، أو لا يهمنا معرفة من قام بالفعل، أو يكون التركيز على النتيجة أو الشيء نفسه.","في My phone has been stolen لا نعرف من سرقه، ولذلك لا نحتاج إلى ذكر الفاعل."]
};
export const INTRANSITIVE58 = {
 verbs:[["sleep","ينام"],["arrive","يصل"],["happen","يحدث"],["die","يموت"],["go","يذهب"],["laugh","يضحك"]],
 examples:[["He slept early.","نام مبكرًا.","لا مفعول به مباشرًا، فلا يمكن تحويلها بالطريقة المعتادة."],["The accident happened yesterday.","وقع الحادث أمس.","لا مفعول به مباشرًا، فلا يمكن تحويلها بالطريقة المعتادة."]],
 note:"ليس كل فعل يمكن تحويله إلى Passive؛ نحتاج عادةً إلى مفعول به مباشر."
};

export const ERRORS58 = [
 {wrong:"The bridge was build.",right:"The bridge was built.",why:"بعد was في المبني للمجهول نستخدم V3."},
 {wrong:"The road is repaired now.",right:"The road is being repaired now.",why:"إذا أردنا التأكيد على أن الإصلاح يجري الآن، فالأفضل is being repaired."},
 {wrong:"The project has completed.",right:"The project has been completed.",why:"Present Perfect Passive يحتاج has/have + been + V3."},
 {wrong:"The rooms is cleaned.",right:"The rooms are cleaned.",why:"rooms جمع، لذلك نستخدم are."},
 {wrong:"The car will is repaired.",right:"The car will be repaired.",why:"بعد will نستخدم be دائمًا في هذا التركيب."},
 {wrong:"They were repairing the road. → The road is repaired.",right:"The road was being repaired.",why:"نحافظ على الزمن الأصلي؛ لا نحول الماضي المستمر إلى المضارع البسيط."},
 {wrong:"The documents had being signed.",right:"The documents had been signed.",why:"Past Perfect Passive يتكون من had been + V3."},
 {wrong:"The house is been painted.",right:"The house is being painted.",why:"Present Continuous Passive يتكون من is being + V3."},
];

export const DIALOGUE58 = [
 ["Ali","What is happening in the school today?","ماذا يحدث في المدرسة اليوم؟"],
 ["Omar","A new science laboratory is being built.","يجري بناء مختبر علوم جديد."],
 ["Ali","When was the old laboratory built?","متى بُني المختبر القديم؟"],
 ["Omar","It was built ten years ago.","بُني قبل عشر سنوات."],
 ["Ali","Has the new equipment been delivered?","هل تم تسليم المعدات الجديدة؟"],
 ["Omar","Yes, it has been delivered.","نعم، لقد تم تسليمها."],
 ["Ali","Will the laboratory be opened next month?","هل سيتم افتتاح المختبر الشهر القادم؟"],
 ["Omar","Yes, it will be opened next month.","نعم، سيتم افتتاحه الشهر القادم."],
 ["Ali","Who is building it?","من الذي يبنيه؟"],
 ["Omar","It is being built by a professional company.","يجري بناؤه بواسطة شركة متخصصة."],
] as const;
export const DIALOGUE_QA58 = [
 ["What is being built?","A new science laboratory is being built."],
 ["When was the old laboratory built?","It was built ten years ago."],
 ["Has the new equipment been delivered?","Yes, it has been delivered."],
 ["When will the laboratory be opened?","It will be opened next month."],
 ["Who is building the new laboratory?","It is being built by a professional company."],
] as const;

export const READING58 = [
 "Many products are made in large factories around the world. First, raw materials are collected and transported to factories. Then, these materials are prepared and processed by machines.",
 "In modern factories, many products are being produced automatically. Some machines are controlled by computers, and workers are responsible for checking the quality of the products.",
 "In the past, many products were made by hand. Today, most of them are produced using advanced technology.",
 "A new factory has recently been built in our city. Several machines have already been installed, and more equipment will be delivered next week.",
 "Before the factory was opened, all the machines had been tested carefully."
] as const;
export const READING_AR58 = [
 "تُصنع منتجات كثيرة في مصانع كبيرة حول العالم. أولًا، تُجمع المواد الخام وتُنقل إلى المصانع. بعد ذلك، تُجهز هذه المواد وتُعالج بواسطة الآلات.",
 "في المصانع الحديثة، يجري إنتاج كثير من المنتجات بصورة آلية. وتُتحكم في بعض الآلات بواسطة الحواسيب، ويكون العمال مسؤولين عن فحص جودة المنتجات.",
 "في الماضي، كانت منتجات كثيرة تُصنع يدويًا. أما اليوم، فتُنتج معظمها باستخدام التكنولوجيا المتقدمة.",
 "لقد بُني مصنع جديد مؤخرًا في مدينتنا. وقد تم بالفعل تركيب عدة آلات، وسيتم تسليم المزيد من المعدات الأسبوع القادم.",
 "وقبل افتتاح المصنع، كانت جميع الآلات قد اختُبرت بعناية."
] as const;
export const READING_QA58 = [
 ["Where are many products made?","They are made in large factories around the world.","تُصنع في مصانع كبيرة حول العالم."],
 ["What happens to raw materials first?","They are collected and transported to factories.","تُجمع وتُنقل إلى المصانع."],
 ["How are some machines controlled?","They are controlled by computers.","يتم التحكم فيها بواسطة الحواسيب."],
 ["How were many products made in the past?","They were made by hand.","كانت تُصنع يدويًا."],
 ["What has recently been built?","A new factory has recently been built.","لقد بُني مصنع جديد مؤخرًا."],
 ["When will more equipment be delivered?","It will be delivered next week.","سيتم تسليمها الأسبوع القادم."],
 ["What had been done before the factory was opened?","All the machines had been tested carefully.","كانت جميع الآلات قد اختُبرت بعناية."],
] as const;

export const PRACTICES58: PracticeGroup58[] = [
 {title:"التدريب الأول: اختر صيغة الفعل الصحيحة",instruction:"اختر الإجابة ثم اضغط تحقّق؛ الحل والتفسير يظهران بعد التحقق.",items:[
  {prompt:"The room ______ every day.",options:["is cleaned","is being cleaned","was cleaned"],answer:"is cleaned",why:"every day تدل على التكرار، فنستخدم Present Simple Passive."},
  {prompt:"The bridge ______ in 1985.",options:["is built","was built","will be built"],answer:"was built",why:"in 1985 تشير إلى الماضي."},
  {prompt:"The results ______ tomorrow.",options:["are announced","were announced","will be announced"],answer:"will be announced",why:"tomorrow تشير إلى المستقبل."},
  {prompt:"The road ______ right now.",options:["is repaired","is being repaired","has been repaired"],answer:"is being repaired",why:"right now تدل على أن العملية مستمرة الآن."},
  {prompt:"The house ______ when I arrived.",options:["was being painted","is being painted","has been painted"],answer:"was being painted",why:"عملية كانت مستمرة عندما وصلت."},
  {prompt:"The project ______ already.",options:["has been completed","is being completed","will be completed"],answer:"has been completed",why:"already هنا تشير إلى عمل اكتمل وله نتيجة في الحاضر."},
  {prompt:"The documents ______ before the manager arrived.",options:["had been signed","are signed","will be signed"],answer:"had been signed",why:"التوقيع اكتمل قبل وصول المدير؛ حدث سابق لحدث آخر في الماضي."}
 ]},
 {title:"التدريب الثاني: حوّل من Active إلى Passive",instruction:"حوّل الجمل مع المحافظة على الزمن. الحلول المفصلة تشمل المفعول به والزمن والتركيب.",items:[
  {prompt:"They clean the classrooms.",answer:"The classrooms are cleaned.",why:"Object: the classrooms · Present Simple · are + V3. تُنظَّف الفصول الدراسية."},
  {prompt:"They built this hospital in 2010.",answer:"This hospital was built in 2010.",why:"Object: this hospital · Past Simple · was + V3. بُني هذا المستشفى عام 2010."},
  {prompt:"The company will produce new cars.",answer:"New cars will be produced by the company.",why:"Object: new cars · Future Simple · will be + V3. ستُنتج سيارات جديدة بواسطة الشركة."},
  {prompt:"The workers are repairing the road.",answer:"The road is being repaired by the workers.",why:"Object: the road · Present Continuous · is being + V3. يجري إصلاح الطريق بواسطة العمال."},
  {prompt:"They were painting the walls.",answer:"The walls were being painted.",why:"Object: the walls · Past Continuous · were being + V3. كانت الجدران تُطلى."},
  {prompt:"Someone has stolen my bicycle.",answer:"My bicycle has been stolen.",why:"Object: my bicycle · Present Perfect · has been + V3. لقد سُرقت دراجتي."},
  {prompt:"The manager had signed the documents.",answer:"The documents had been signed by the manager.",why:"Object: the documents · Past Perfect · had been + V3. كانت الوثائق قد وُقعت بواسطة المدير."},
  {prompt:"They invite many guests every year.",answer:"Many guests are invited every year.",why:"Object: many guests · Present Simple · are + V3. يُدعى العديد من الضيوف كل سنة."}
 ]},
 {title:"التدريب الثالث: حوّل من Passive إلى Active",instruction:"اكتب الفاعل الظاهر بعد by إذا ذُكر. إذا غاب فلا تختلقه باعتباره حقيقة مؤكدة.",items:[
  {prompt:"The room is cleaned every morning.",answer:"Someone cleans the room every morning.",why:"عند غياب الفاعل يمكن اقتراح someone، لكنه ليس معلومًا على وجه اليقين. ينظف شخص ما الغرفة كل صباح."},
  {prompt:"The bridge was built by the engineers.",answer:"The engineers built the bridge.",why:"الفاعل المذكور هو the engineers. بنى المهندسون الجسر."},
  {prompt:"The results will be announced tomorrow.",answer:"Someone will announce the results tomorrow.",why:"الفاعل غير مذكور؛ someone اقتراح لا حقيقة مؤكدة. سيعلن شخص ما النتائج غدًا."},
  {prompt:"The car is being repaired by Ali.",answer:"Ali is repairing the car.",why:"علي يصلح السيارة."},
  {prompt:"The letters were being written by the students.",answer:"The students were writing the letters.",why:"كان الطلاب يكتبون الرسائل."},
  {prompt:"The project has been completed by the team.",answer:"The team has completed the project.",why:"أكمل الفريق المشروع."}
 ]},
 {title:"التدريب الرابع: حوّل الجمل إلى النفي",instruction:"اكتب الجملة المنفية كاملة، ثم تحقّق من موضع not.",items:[
  {prompt:"The room is cleaned every day.",answer:"The room is not cleaned every day.",why:"الغرفة لا تُنظَّف كل يوم."},
  {prompt:"The bridge was built in 2000.",answer:"The bridge was not built in 2000.",why:"لم يُبنَ الجسر عام 2000."},
  {prompt:"The results will be announced today.",answer:"The results will not be announced today.",why:"لن يتم الإعلان عن النتائج اليوم."},
  {prompt:"The road is being repaired.",answer:"The road is not being repaired.",why:"لا يجري إصلاح الطريق."},
  {prompt:"The house was being painted.",answer:"The house was not being painted.",why:"لم يكن المنزل يُطلى."},
  {prompt:"The project has been completed.",answer:"The project has not been completed.",why:"لم يتم إنجاز المشروع."}
 ]},
 {title:"التدريب الخامس: حوّل الجمل إلى أسئلة",instruction:"اكتب السؤال كاملًا. لاحظ انتقال فعل be/المساعد إلى البداية.",items:[
  {prompt:"The room is cleaned every day.",answer:"Is the room cleaned every day?",why:"هل تُنظَّف الغرفة كل يوم؟"},
  {prompt:"The car was repaired yesterday.",answer:"Was the car repaired yesterday?",why:"هل أُصلحت السيارة أمس؟"},
  {prompt:"The results will be announced tomorrow.",answer:"Will the results be announced tomorrow?",why:"هل سيتم الإعلان عن النتائج غدًا؟"},
  {prompt:"The road is being repaired.",answer:"Is the road being repaired?",why:"هل يجري إصلاح الطريق؟"},
  {prompt:"The documents have been signed.",answer:"Have the documents been signed?",why:"هل تم توقيع الوثائق؟"},
  {prompt:"The house had been painted.",answer:"Had the house been painted?",why:"هل كان المنزل قد طُلي؟"}
 ]},
 {title:"التدريب السادس: اكتشف الخطأ وصححه",instruction:"حدّد الخطأ، واكتب الصيغة الصحيحة، واقرأ سبب التصحيح.",items:[
  {prompt:"The bridge was build in 1995.",answer:"The bridge was built in 1995.",why:"نحتاج إلى V3، والتصريف الثالث من build هو built."},
  {prompt:"The rooms is being cleaned.",answer:"The rooms are being cleaned.",why:"rooms جمع، لذلك نستخدم are."},
  {prompt:"The car will repaired tomorrow.",answer:"The car will be repaired tomorrow.",why:"بعد will نحتاج إلى be قبل V3."},
  {prompt:"The project has been complete.",answer:"The project has been completed.",why:"نستخدم التصريف الثالث completed."},
  {prompt:"The road is repair now.",answer:"The road is being repaired now.",why:"نحتاج إلى being + V3 للتعبير عن العملية المستمرة الآن."},
  {prompt:"The documents had being signed.",answer:"The documents had been signed.",why:"Past Perfect Passive = had been + V3."},
  {prompt:"The letters was sent yesterday.",answer:"The letters were sent yesterday.",why:"letters جمع، فنستخدم were."},
  {prompt:"The house is been painted.",answer:"The house is being painted.",why:"Present Continuous Passive = is being + V3."}
 ]},
 {title:"التدريب السابع: ترجم إلى الإنجليزية",instruction:"اكتب الجملة الإنجليزية ثم تحقّق من الزمن والتركيب.",items:[
  {prompt:"تُنظَّف المدرسة كل يوم.",answer:"The school is cleaned every day.",why:"Present Simple Passive."},
  {prompt:"بُني هذا المنزل قبل عشر سنوات.",answer:"This house was built ten years ago.",why:"Past Simple Passive."},
  {prompt:"سيتم إرسال الرسالة غدًا.",answer:"The letter will be sent tomorrow.",why:"Future Simple Passive."},
  {prompt:"يجري إصلاح السيارة الآن.",answer:"The car is being repaired now.",why:"Present Continuous Passive."},
  {prompt:"كان الطريق يُعبَّد عندما وصلنا.",answer:"The road was being paved when we arrived.",why:"Past Continuous Passive."},
  {prompt:"لقد تم الانتهاء من المشروع.",answer:"The project has been completed.",why:"Present Perfect Passive."},
  {prompt:"كانت الوثائق قد وُقعت قبل الاجتماع.",answer:"The documents had been signed before the meeting.",why:"Past Perfect Passive."},
  {prompt:"هل تُصنع هذه المنتجات في تركيا؟",answer:"Are these products made in Turkey?",why:"سؤال Present Simple Passive؛ products جمع، لذلك Are."}
 ]},
 {title:"التدريب الثامن: اختر الزمن المناسب حسب المعنى",instruction:"اختر الجملة المطابقة للسياق ثم تحقق.",items:[
  {prompt:"هناك عمال يصلحون الطريق الآن.",options:["The road is repaired.","The road is being repaired.","The road was repaired."],answer:"The road is being repaired.",why:"العمل يجري الآن."},
  {prompt:"انتهى إصلاح الطريق، والنتيجة واضحة الآن.",options:["The road has been repaired.","The road is being repaired.","The road will be repaired."],answer:"The road has been repaired.",why:"الإصلاح انتهى والنتيجة موجودة."},
  {prompt:"هذا الطريق يُصلح كل عام.",options:["The road is repaired every year.","The road is being repaired now.","The road was being repaired."],answer:"The road is repaired every year.",why:"العمل متكرر كل عام."},
  {prompt:"كان العمال يصلحون الطريق عندما وصلت.",options:["The road was repaired.","The road was being repaired.","The road has been repaired."],answer:"The road was being repaired.",why:"العملية كانت مستمرة في الماضي عند وصولي."},
  {prompt:"سيتم إصلاح الطريق الأسبوع القادم.",options:["The road is repaired.","The road had been repaired.","The road will be repaired."],answer:"The road will be repaired.",why:"الحدث سيحدث في المستقبل."}
 ]},
 {title:"التدريب التاسع: حوّل الفقرة إلى المبني للمجهول",instruction:"حوّل كل جملة من الفقرة، ثم راجع النماذج والتفسيرات.",items:[
  {prompt:"People make many electronic devices in this factory.",answer:"Many electronic devices are made in this factory.",why:"تُصنع أجهزة إلكترونية كثيرة في هذا المصنع."},
  {prompt:"Workers check every product carefully.",answer:"Every product is checked carefully by workers.",why:"يُفحص كل منتج بعناية بواسطة العمال."},
  {prompt:"The company is developing new machines.",answer:"New machines are being developed by the company.",why:"يجري تطوير آلات جديدة بواسطة الشركة."},
  {prompt:"It built a new department last year.",answer:"A new department was built last year.",why:"بُني قسم جديد العام الماضي."},
  {prompt:"It will introduce a new production system next month.",answer:"A new production system will be introduced next month.",why:"سيتم تقديم نظام إنتاج جديد الشهر القادم."}
 ]}
];

export type OriginalTest58 = { prompt: string; options?: string[]; answer: string; why: string; section: string };
export const ORIGINAL_TEST58: OriginalTest58[] = [
 {section:"1",prompt:"The classroom ______ every afternoon.",options:["is cleaned","is being cleaned","was cleaned"],answer:"is cleaned",why:"every afternoon تدل على التكرار، فنستخدم المضارع البسيط."},
 {section:"1",prompt:"The old castle ______ hundreds of years ago.",options:["is built","was built","will be built"],answer:"was built",why:"hundreds of years ago تشير إلى الماضي."},
 {section:"1",prompt:"The new hospital ______ next year.",options:["will be opened","is being opened","has been opened"],answer:"will be opened",why:"next year تشير إلى المستقبل."},
 {section:"1",prompt:"The road ______ at the moment.",options:["repairs","is being repaired","was repaired"],answer:"is being repaired",why:"at the moment تدل على أن العملية مستمرة الآن."},
 {section:"1",prompt:"The house ______ when the storm started.",options:["was being painted","is painted","has been painted"],answer:"was being painted",why:"الطلاء كان مستمرًا عندما بدأت العاصفة."},
 {section:"1",prompt:"The project ______ already.",options:["has been completed","is being completed","was being completed"],answer:"has been completed",why:"already تشير هنا إلى عمل اكتمل."},
 {section:"1",prompt:"The documents ______ before the meeting started.",options:["had been prepared","are prepared","will be prepared"],answer:"had been prepared",why:"إعداد الوثائق اكتمل قبل بداية الاجتماع."},
 {section:"1",prompt:"The letters ______ yesterday.",options:["were sent","are sent","will be sent"],answer:"were sent",why:"yesterday تشير إلى الماضي، وletters جمع."},
 {section:"1",prompt:"The new machines ______ by the company.",options:["has been installed","have been installed","is been installed"],answer:"have been installed",why:"machines جمع، لذلك have been."},
 {section:"1",prompt:"The results ______ tomorrow morning.",options:["will announce","will be announced","are announcing"],answer:"will be announced",why:"المستقبل المبني للمجهول يتكون من will be + V3."},
 {section:"2",prompt:"حوّل إلى Passive: They clean the windows every week.",answer:"The windows are cleaned every week.",why:"المفعول به windows جمع؛ are + cleaned."},
 {section:"2",prompt:"حوّل إلى Passive: The engineers designed the bridge.",answer:"The bridge was designed by the engineers.",why:"المحافظة على Past Simple وإضافة by للفاعل المذكور."},
 {section:"2",prompt:"حوّل إلى Passive: The company will launch a new product.",answer:"A new product will be launched by the company.",why:"Future Simple Passive = will be + V3."},
 {section:"2",prompt:"حوّل إلى Passive: The workers are building a school.",answer:"A school is being built by the workers.",why:"Present Continuous Passive = is being + built."},
 {section:"2",prompt:"حوّل إلى Passive: Someone has broken the window.",answer:"The window has been broken.",why:"Present Perfect Passive = has been + broken؛ حذف الفاعل غير المعروف."},
 {section:"3",prompt:"حوّل إلى Active: The room was cleaned by Sara.",answer:"Sara cleaned the room.",why:"الفاعل الصريح Sara يصبح فاعل الجملة Active."},
 {section:"3",prompt:"حوّل إلى Active: The road is being repaired by the workers.",answer:"The workers are repairing the road.",why:"الفاعل workers واضح؛ نحافظ على Present Continuous."},
 {section:"3",prompt:"حوّل إلى Active: The documents have been signed by the manager.",answer:"The manager has signed the documents.",why:"فاعل مفرد في Active: manager has signed."},
 {section:"4",prompt:"صحّح: The house was build in 2005.",answer:"The house was built in 2005.",why:"build → built (V3)."},
 {section:"4",prompt:"صحّح: The cars is being washed.",answer:"The cars are being washed.",why:"cars جمع؛ are being."},
 {section:"4",prompt:"صحّح: The project will completed next week.",answer:"The project will be completed next week.",why:"بعد will نستخدم be + V3."},
 {section:"4",prompt:"صحّح: The letters has been sent.",answer:"The letters have been sent.",why:"letters جمع؛ have been."},
 {section:"5",prompt:"ترجم: تم إصلاح الحاسوب أمس.",answer:"The computer was repaired yesterday.",why:"Past Simple Passive."},
 {section:"5",prompt:"ترجم: يجري بناء مستشفى جديد الآن.",answer:"A new hospital is being built now.",why:"Present Continuous Passive."},
 {section:"5",prompt:"ترجم: هل سيتم إرسال النتائج غدًا؟",answer:"Will the results be sent tomorrow?",why:"في سؤال المستقبل: Will + subject + be + V3?"},
];

export const WRITING58 = {
 instruction:"اكتب فقرة قصيرة باللغة الإنجليزية من 8 إلى 10 جمل عن مصنع أو مدرسة أو مستشفى، واستخدم فيها خمسة أزمنة مختلفة من المبني للمجهول على الأقل.",
 ideas:["ماذا يُصنع في المكان؟","ماذا يجري الآن؟","ماذا تم إنجازه؟","ماذا حدث في الماضي؟","ماذا سيحدث في المستقبل؟"],
 title:"Our New School", model:["Our school is cleaned every day.","The classrooms are decorated by the students.","A new library was built last year.","New computers are being installed now.","The school has recently been improved.","The sports hall will be opened next month.","The old equipment had been replaced before the new school year started."],
 translation:["مدرستنا الجديدة","تُنظَّف مدرستنا كل يوم.","تُزيَّن الفصول بواسطة الطلاب.","بُنيت مكتبة جديدة العام الماضي.","يجري تركيب حواسيب جديدة الآن.","لقد تم تحسين المدرسة مؤخرًا.","سيتم افتتاح الصالة الرياضية الشهر القادم.","كانت المعدات القديمة قد استُبدلت قبل بدء العام الدراسي الجديد."]
};
export const SPEAKING58 = [
 ["The materials are collected first.","تُجمع المواد أولًا."],["They are transported to the factory.","تُنقل إلى المصنع."],["The materials are being processed.","تجري معالجة المواد."],["The products are checked carefully.","تُفحص المنتجات بعناية."],["The finished products have been packed.","لقد تم تغليف المنتجات النهائية."],["The products will be delivered tomorrow.","سيتم تسليم المنتجات غدًا."]
] as const;
export const SUMMARY58 = [
 ["Present Simple","am / is / are + V3"],["Past Simple","was / were + V3"],["Future Simple","will be + V3"],["Present Continuous","am / is / are + being + V3"],["Past Continuous","was / were + being + V3"],["Present Perfect","has / have + been + V3"],["Past Perfect","had + been + V3"]
] as const;
