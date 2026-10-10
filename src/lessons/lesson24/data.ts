// Lesson 24 authoritative source ledger. Every entry is rendered by Lesson24.tsx.
export type SourceSection = { id: string; title: string; body: string; english?: string[] };

export const SOURCE_SECTIONS: SourceSection[] = [
 {id:'opening',title:'الافتتاح — ربط الدرس 23',body:'ممتاز جدًا 🔥\nفي الدرس 23 تعلمنا الأساس الذي نحتاجه الآن:\nCountable = معدود\nUncountable = غير معدود\nHow many? = للمعدود\nHow much? = لغير المعدود\nاليوم سنأخذ هذه المعرفة ونحوّلها إلى مهارة حقيقية: كيف أقول بعض، الكثير من، القليل من، وكمية قليلة جدًا باللغة الإنجليزية؟ والأهم: لن نحفظ الكلمات كقائمة منفصلة، بل سنفهم ماذا تعني كل واحدة، ومتى أستخدمها، وما الفرق الدقيق بينها.'},
 {id:'objectives',title:'🎯 أهداف الدرس',body:'بنهاية الدرس ستكون قادرًا على:\n① استخدام some و any بشكل صحيح.\n② استخدام many مع الأسماء المعدودة.\n③ استخدام much مع الأسماء غير المعدودة.\n④ استخدام a lot of مع النوعين.\n⑤ فهم الفرق بين a few و few.\n⑥ فهم الفرق بين a little و little.\n⑦ فهم الفرق بين a few / few / a little / little.\n⑧ اختيار أداة الكمية حسب نوع الاسم ومعنى الجملة.\n⑨ استخدام أدوات الكمية مع There is / There are و How many? / How much?\n⑩ اكتشاف أخطاء كمية صعبة في جمل حقيقية.'},
 {id:'what',title:'🧠 أولًا: ما معنى Quantifier؟',body:'Quantifier = أداة كمية\nوهي كلمة تخبرنا: كمية الشيء تقريبًا.\nI have some books.\nلدي بعض الكتب.\nI have many books.\nلدي كتب كثيرة.\nI have a few books.\nلدي بضعة كتب.\nI have a lot of books.\nلدي الكثير من الكتب.\nلاحظ أن الشيء نفسه هو: books، لكن أداة الكمية غيّرت معنى الجملة.'},
 {id:'map',title:'⭐ خريطة الدرس',body:'سنقسم أدوات الكمية إلى مجموعات:\nللمعدود الجمع: many / a few / few / some / any / a lot of / lots of\nلغير المعدود: much / a little / little / some / any / a lot of / lots of\nللنوعين: some / any / a lot of / lots of\nهذه الخريطة وحدها مهمة جدًا.'},
 {id:'some',title:'① SOME',body:'some = بعض / كمية من\nنستخدمها مع Plural Countable و Uncountable.\nمع المعدود: some books، some apples، some students، some chairs، some questions.\nI have some books.\nمع غير المعدود: some water، some milk، some rice، some money، some information.\nI need some water.\nsome لا تخبرنا بالعدد الدقيق: I have some books. أنت لا تعرف هل لدي 2 books أم 5 books أم 10 books؛ المهم أن لدي كمية غير محددة.\n⭐ some في الجمل المثبتة: Positive sentence → some\nThere are some students in the classroom.\nThere is some milk in the fridge.\nShe bought some apples.\nHe needs some information.'},
 {id:'any',title:'② ANY',body:'any = أي / أي كمية، وتظهر بشكل أساسي في الأسئلة والنفي.\nAre there any books?\nIs there any water?\nDo you have any money?\nDoes she have any questions?\nThere aren’t any books.\nThere isn’t any water.\nI don’t have any money.\nShe doesn’t have any questions.\nPositive: I have some books.\nQuestion: Do you have any books?\nNegative: I don’t have any books.'},
 {id:'some-any',title:'⭐ some مقابل any — nuance',body:'There is some juice in the fridge.\nIs there any juice in the fridge?\nThere isn’t any juice in the fridge.\nلكن لا تعتقد أن some = دائمًا جملة مثبتة و any = دائمًا سؤال أو نفي؛ هذا تبسيط زائد.\nWould you like some water?\nCan I have some juice?\nالقاعدة الأساسية: Positive → some، Questions/Negative → any.'},
 {id:'many',title:'③ MANY',body:'many = كثير من، ونستخدمها مع Plural Countable Nouns.\nmany books / many students / many cars / many apples / many questions / many people\nThere are many students at the school.\nShe has many books.\nHow many apples do you need?\nWe saw many people at the festival.\nخطأ: many water ❌؛ الصحيح much water أو a lot of water. ولا نقول many money ❌؛ الصحيح much money أو a lot of money.'},
 {id:'much',title:'④ MUCH',body:'much = كثير من، ونستخدمها مع Uncountable Nouns.\nmuch water / much milk / much money / much rice / much information / much time / much homework\nHow much water do you drink?\nHow much money do you need?\nHow much time do we have?\ntime عندما نقصد الوقت ككمية عامة فهو Uncountable: How much time? لكن three times تعني ثلاث مرات وهي Countable. المعنى مهم جدًا.'},
 {id:'many-much',title:'⚔️ MANY vs MUCH',body:'many → Countable Plural\nmuch → Uncountable\nmany books / much water / many students / much money / many apples / much rice / many questions / much information'},
 {id:'alot',title:'⑤ A LOT OF',body:'a lot of = الكثير من، وتعمل مع Countable Plural و Uncountable.\na lot of books / a lot of students / a lot of cars / a lot of apples\nShe has a lot of books.\na lot of water / a lot of money / a lot of rice / a lot of information\nHe has a lot of information.\na lot of books / many books / a lot of water / much water لها المعنى العام نفسه. في الإنجليزية اليومية، خصوصًا في الجمل المثبتة، a lot of أكثر طبيعية من much: I have a lot of homework. ✅ I have much homework. ⚠️'},
 {id:'lots',title:'⑥ LOTS OF',body:'lots of = الكثير من، وهي مشابهة جدًا لـ a lot of وتستخدم مع النوعين.\nlots of books / lots of water / lots of students / lots of money\nThere are lots of people here.\nThere is lots of water in the tank.\na lot of: I have a lot of books.\nlots of: I have lots of books. كلاهما يعني لدي الكثير من الكتب.'},
 {id:'afew',title:'⑦ A FEW',body:'a few = بضعة / عدد قليل لكن كافٍ أو موجود بشكل إيجابي، وتستخدم مع Plural Countable Nouns.\na few books / a few students / a few apples / a few minutes\nI have a few books. لدي بضعة كتب. ربما 3 books أو 4 books.\na few تحمل إحساسًا إيجابيًا: I have a few friends here. المعنى ليس ليس لدي أصدقاء، بل لدي بعض الأصدقاء.'},
 {id:'few',title:'⑧ FEW',body:'few = عدد قليل جدًا / ليس عددًا كبيرًا، وتستخدم أيضًا مع Plural Countable Nouns.\nI have a few friends.\nI have few friends.\nالجملة الثانية تعطي إحساسًا بأن العدد قليل بشكل غير كافٍ أو أن المتحدث غير راضٍ عن العدد.\na few = عدد قليل لكنه موجود وكافٍ نسبيًا. few = عدد قليل جدًا مع إحساس بالنقص.\nThere are a few chairs in the room. توجد بعض الكراسي.\nThere are few chairs in the room. الكراسي قليلة وقد لا تكون كافية.'},
 {id:'alittle',title:'⑨ A LITTLE',body:'a little = قليل من / كمية قليلة لكنها موجودة ومفيدة، وتستخدم مع Uncountable Nouns.\na little water / a little milk / a little sugar / a little time / a little money\nI have a little money. لدي بعض المال؛ كمية صغيرة لكنها موجودة.'},
 {id:'little',title:'⑩ LITTLE',body:'little = كمية قليلة جدًا / غير كافية، وتستخدم مع Uncountable Nouns.\nI have little money. لدي مال قليل جدًا؛ المعنى يوحي بأن المال غير كافٍ.\na little = كمية صغيرة لكنها موجودة ومقبولة. little = كمية صغيرة جدًا مع إحساس بالنقص.\nWe have a little time. الوقت قليل لكنه يكفي لشيء ما.\nWe have little time. الوقت غير كافٍ تقريبًا.'},
 {id:'full-map',title:'🧠 الخريطة الكاملة',body:'Countable Plural: some / any / many / a lot of / lots of / a few / few\nUncountable: some / any / much / a lot of / lots of / a little / little\nmany → أشياء معدودة؛ much → أشياء غير معدودة؛ a few → عدد قليل معدود؛ few → عدد قليل جدًا معدود؛ a little → كمية قليلة غير معدودة؛ little → كمية قليلة جدًا غير معدودة؛ a lot of → النوعان؛ some → النوعان؛ any → النوعان.'},
 {id:'combined',title:'مثال واحد يجمع كل شيء',body:'books / water / students / money / time\nmany books / much water / many students / much money / much time\na few books / a little water / a lot of students / a lot of money\nsome books / some water / any books / any water\nلا تقل: a few water ❌؛ الصحيح a little water ✅. ولا تقل: a little books ❌؛ الصحيح a few books ✅.'},
 {id:'battle',title:'⚔️ المعركة الكبرى و quick rule',body:'books → a few books ✅؛ water → a little water ✅؛ students → a few students ✅؛ money → a little money ✅؛ apples → a few apples ✅؛ rice → a little rice ✅.\nإذا تستطيع أن تقول 1 book → a few books. أما إذا لا تستطيع: 1 water ❌ → a little water.'},
 {id:'there',title:'🔗 ربط الدرس مع There is / There are',body:'تذكر الدرس 21.\nCountable Plural: There are many books. / There are a few books. / There are some books. / There are lots of books.\nUncountable: There is much water. / There is a little water. / There is some water. / There is a lot of water.\nThere are many books. ✅ لكن There is much water. ✅ لأن books = Countable Plural و water = Uncountable.'},
 {id:'lab',title:'🧪 مختبر اللغة',body:'There are a few students in the classroom. يوجد بضعة طلاب في الصف.\nThere are few students in the classroom. يوجد عدد قليل جدًا من الطلاب في الصف.\nThere is a little milk in the fridge. يوجد قليل من الحليب في الثلاجة.\nThere is little milk in the fridge. يوجد حليب قليل جدًا في الثلاجة.\nإضافة حرفين فقط: a غيّرت الإحساس بالمعنى.'},
 {id:'iq-explain',title:'🧠 IQ200: لماذا a مهمة؟',body:'I have few friends. العدد قليل، وهذا مشكلة أو نقص.\nI have a few friends. لدي بعض الأصدقاء.\nWe have little food. قد لا يكفي.\nWe have a little food. كمية صغيرة، لكنها موجودة.\nأي جملة أكثر تفاؤلًا؟ A: I have few ideas. B: I have a few ideas. الإجابة: B لأن a few = بعض الأفكار موجودة.'},
 {id:'training1',title:'🔥 تدريب ① — اختر أداة الكمية',body:'8 items: many / much / a few / a little',},
 {id:'training2',title:'🔥 تدريب ② — SOME أم ANY؟',body:'8 items: some / any',},
 {id:'training3',title:'🔥 تدريب ③ — MANY أم MUCH؟',body:'8 items: many / much',},
 {id:'training4',title:'🔥 تدريب ④ — A FEW أم A LITTLE؟',body:'8 items: a few / a little',},
 {id:'training5',title:'🚨 تدريب ⑤ — FEW أم A FEW؟',body:'6 items: few / a few — فكر بالمعنى قبل الإجابة.'},
 {id:'detective',title:'🕵️ Grammar Detective',body:'في كل جملة خطأ أو مشكلة. اكتشفها وصححها. هذه المرة توجد جملة صحيحة. ابحث عنها! 🔥'},
 {id:'iq200',title:'🚀 IQ200 Challenge',body:'صحح الجمل ثم اشرح سبب التصحيح. لا يكفي أن تعرف Countable / Uncountable؛ يجب أن تنتبه إلى ما الشيء الذي نقوم بعدّه فعليًا؟'},
 {id:'meaning',title:'🧠 تحدي المعنى',body:'اختر الجملة المناسبة للمعنى المقصود: 3 كتب صغيرة لكنها جيدة؛ مال قليل جدًا؛ ماء قليل لكنه يكفي؛ أصدقاء قليلون جدًا والشعور بالوحدة.'},
 {id:'boss',title:'🏆 FINAL BOSS — مطعم Quantity Lab',body:'لديك مطعم صغير: 12 customers، 3 tables، some rice، some water، 2 chefs، little time، a lot of food، a few empty chairs. اكتب قصة قصيرة من 10 جمل، ويجب أن تستخدم some، any، many، much، a lot of، a few، little أو a little، There is، There are، How many أو How much.'},
 {id:'mini',title:'🧠 اختبار نهائي مصغر',body:'8 questions — اختر الإجابة الصحيحة.'},
 {id:'answers',title:'🏅 مفتاح الإجابات',body:'Training ①: many, a little, many, a few, a little, a few, a little, many. Training ②: some, any, any, some, any, any, some, any. Training ③: many, much, many, much, much, many, much, many. Training ④: a few, a little, a few, a little, a few, a little, a few, a little. Training ⑤: a few, few, a few, few, a few, few.'},
 {id:'summary',title:'🧠 الخلاصة النهائية والقاعدة الذهبية',body:'Countable Plural: many / a few / few / some / any / a lot of / lots of\nUncountable: much / a little / little / some / any / a lot of / lots of\nmany → Countable؛ much → Uncountable؛ a few → Countable؛ few → Countable؛ a little → Uncountable؛ little → Uncountable؛ some → الاثنين؛ any → الاثنين؛ a lot of → الاثنين.\na few ≠ few، a little ≠ little. وجود a قد يجعل المعنى أكثر إيجابية أو يدل على أن الكمية الصغيرة موجودة ومقبولة؛ few / little غالبًا يعطيان إحساسًا بالنقص.'},
 {id:'roadmap',title:'🗺️ مسارنا الآن',body:'23. Countable & Uncountable Nouns\n24. Quantifiers ← نحن هنا\nالخطوة التالية المنطقية ستكون الانتقال إلى Past Continuous بعد أن أصبح لدينا أساس قوي جدًا في تركيب الجملة، الأزمنة الأساسية، الملكية، الجمع، الكمية، والمكان. ثم سنبدأ تدريجيًا بتوسيع منظومة الأزمنة: Present → Past → Future.'},
];

// Fine-grained source ledger: these units keep the supplied teaching beats independently addressable and rendered.
SOURCE_SECTIONS.push(
 ...[
  ['some with countable','some books / some apples / some students / some chairs / some questions'],
  ['some with uncountable','some water / some milk / some rice / some money / some information'],
  ['some and exact number','some لا تخبرنا بالعدد الدقيق: 2 books أو 5 books أو 10 books'],
  ['some positive sentences','There are some students in the classroom. There is some milk in the fridge.'],
  ['any in questions','Are there any books? Is there any water? Do you have any money? Does she have any questions?'],
  ['any in negatives','There aren’t any books. There isn’t any water. I don’t have any money.'],
  ['juice comparison','There is some juice in the fridge. Is there any juice in the fridge? There isn’t any juice in the fridge.'],
  ['some offers and requests','Would you like some water? Can I have some juice?'],
  ['many examples','There are many students at the school. She has many books.'],
  ['many errors','many water ❌ / many money ❌'],
  ['much examples','much water / much milk / much money / much rice / much information / much time / much homework'],
  ['time special meaning','How much time? / three times'],
  ['many versus much','many → Countable Plural; much → Uncountable'],
  ['a lot countable','a lot of books / a lot of students / a lot of cars / a lot of apples'],
  ['a lot uncountable','a lot of water / a lot of money / a lot of rice / a lot of information'],
  ['a lot versus many much','I have a lot of homework. ✅ I have much homework. ⚠️'],
  ['a lot of versus lots of','I have a lot of books. I have lots of books.'],
  ['a few meaning','small number, but existing / relatively sufficient / positive sense'],
  ['a few positive feeling','I have a few friends here.'],
  ['few meaning','small number with a sense of shortage'],
  ['a few versus few','I have a few friends. / I have few friends.'],
  ['a little meaning','small amount, but existing / useful / acceptable'],
  ['little meaning','very small amount with a sense of shortage'],
  ['a little versus little','We have a little time. / We have little time.'],
  ['fast-reference meanings','many, much, a few, few, a little, little, a lot of, some, any'],
  ['combined examples','many books / much water / a few books / a little water / a lot of students'],
  ['is are warning','There are many books. There is much water.'],
  ['why a matters','few friends مقابل a few friends؛ little food مقابل a little food'],
  ['smart question','Which is more optimistic? I have few ideas. / I have a few ideas.']
 ].map(([id,body])=>({id,title:id,body}))
);

export const TRAINING1 = ['I have ___ books.','She needs ___ water.','There are ___ students outside.','We have ___ minutes before the lesson starts.','He has ___ money.','I ate ___ apples.','There is ___ rice left.','They have ___ questions.'];
export const TRAINING2 = ['I have ___ books.','Do you have ___ books?','I don’t have ___ books.','There is ___ milk in the fridge.','Is there ___ milk?','There isn’t ___ milk.','She bought ___ apples.','Did she buy ___ apples?'];
export const TRAINING3 = ['How ___ books do you have?','How ___ water do you drink?','How ___ students are there?','How ___ money do you need?','How ___ information do you have?','How ___ apples did he buy?','How ___ time do we have?','How ___ chairs are in the room?'];
export const TRAINING4 = ['I have ___ friends.','I have ___ money.','She bought ___ apples.','We need ___ sugar.','There are ___ students outside.','There is ___ water in the bottle.','He has ___ books.','We have ___ time.'];
export const TRAINING5 = ['I have ___ friends, so I never feel alone.','I have ___ friends, and I often feel lonely.','There are ___ chairs, but everyone can sit.','There are ___ chairs, so some students must stand.','We have ___ minutes, so let’s finish the task.','We have ___ minutes, so we must hurry.'];
export const DETECTIVE = ['I have much books.','She has a little friends.','There are a little water in the bottle.','How much apples do you want?','How many money do you have?','I don’t have some questions.','There is many students outside.','He has few information.','We have a few water.','There are a lot of students in the classroom.'];
export const IQ200 = ['There is a few milk in the fridge.','There are much books on the shelf.','I have little friends, but they are very important to me.','I have a little friends, and they help me every day.','How many information do you need?','How much pieces of information do you need?'];
export const MEANING = ['I have few books. / I have a few books.','I have a little money. / I have little money.','I have a little water. / I have little water.','I have a few friends. / I have few friends.'];
export const MINI_TEST = [
 ['There are ___ books on the table.',['much','many','a little'],1],['There is ___ water in the bottle.',['many','a few','some'],2],['How ___ money do you need?',['many','much','few'],1],['I have ___ friends here. I feel happy.',['a few','few','a little'],0],['We have ___ time, so let’s hurry.',['a little','little','a few'],1],['She has ___ homework today.',['many','a lot of','a few'],1],['Are there ___ students in the classroom?',['any','much','a little'],0],['I don’t have ___ information.',['some','any','many'],1]
] as const;

export const SLIDES = SOURCE_SECTIONS.map((section, index) => ({ ...section, sourceIndex:index }));
export const SOURCE_NUMBERED_COUNT = SOURCE_SECTIONS.length;
export const LESSON_TITLE_24 = 'الدرس 24: Quantifiers — أدوات الكمية';

/* ============================================================================
   خطة الخطوات الأصلية — الدرس 24 (Native multi-step plan)
   ----------------------------------------------------------------------------
   كل خطوة = محطة واحدة في المسار، بعنوانها ونبرتها من طبقة العرض السابقة
   نفسها (لا نص مصدر جديد). محتوى الخطوة blocks بترتيبها المصدرى:
     unit → بطاقة وحدة مصدرية كاملة، تُرسم مرة واحدة بعلامة data-source-section.
     lab  → طبقة تفاعلية قائمة، وقد تغطي وحدات مصدرية بنفسها عبر covers.
   هذا السجل هو مرجع التغطية: لا وحدة مصدرية تُحذف أو تُكرَّر، ولا خطوة بلا محتوى.
   ==========================================================================*/
export type Tone24 = "slate" | "cyan" | "sky" | "violet" | "indigo" | "emerald" | "teal" | "amber" | "rose" | "gold";

export type Lab24Key =
  | "hero"
  | "command"
  | "mapDiagram"
  | "offers"
  | "vsBoard"
  | "fewMeters"
  | "littleMeters"
  | "timeSensor"
  | "whyA"
  | "quickRule"
  | "detector"
  | "thereMachine"
  | "testTubes"
  | "training1"
  | "training2"
  | "training3"
  | "training4"
  | "training5"
  | "detectiveBoard"
  | "iq200Board"
  | "meaningChallenge"
  | "missionDeck"
  | "miniTest"
  | "answerKey"
  | "goldenRule"
  | "roadmapTimeline"
  | "finalQuiz";

export type StepBlock24 =
  | { t: "unit"; id: string; bare?: boolean; tone?: Tone24 }
  | { t: "lab"; key: Lab24Key; covers?: string[] };

export type Step24 = {
  id: string;
  kind: "cover" | "lesson" | "quiz";
  /** اسم المجموعة في فهرس الخطوات (عربي مثل بقية الدروس المرجعية) */
  section: string;
  /** الشارة الإنجليزية للمحطة — تُرسم معزولة LTR */
  en: string;
  mascot: string;
  title: string;
  lead?: string;
  tip?: string;
  tone: Tone24;
  blocks: StepBlock24[];
};

export const STEPS_24: Step24[] = [
  {
    id: "cover",
    kind: "cover",
    section: "البداية",
    en: "QUANTITY LAB",
    mascot: "\uD83E\uDDEA",
    title: LESSON_TITLE_24,
    tone: "cyan",
    blocks: [{ t: "lab", key: "hero" }],
  },
  {
    id: "opening",
    kind: "lesson",
    section: "البداية",
    en: "LAB ENTRY",
    mascot: "\uD83D\uDEAA",
    title: "بوابة المختبر — ماذا أخذنا من الدرس 23",
    lead: "الوحدة المصدرية كاملة كما وردت، بحوار مباشر مع مختبر العدّ.",
    tone: "cyan",
    blocks: [{ t: "unit", id: "opening" }],
  },
  {
    id: "command",
    kind: "lesson",
    section: "البداية",
    en: "QUANTIFIER COMMAND CENTER",
    mascot: "\uD83C\uDF9B\uFE0F",
    title: "غرفة قيادة أدوات الكمية — أربعة قرارات قبل أي جملة",
    lead: "قبل اختيار الأداة، أمرّر الاسم على أربع بطاقات قرار. كل بطاقة سؤال واحد فقط.",
    tone: "indigo",
    blocks: [
      { t: "lab", key: "command" },
      { t: "unit", id: "objectives" },
    ],
  },
  {
    id: "concept",
    kind: "lesson",
    section: "المفهوم",
    en: "WHAT IS A QUANTIFIER",
    mascot: "\uD83E\uDDE0",
    title: "أولًا: ما معنى Quantifier؟",
    lead: "الكلمة نفسها ليست زينة — هي التي تغيّر معنى الجملة كاملة.",
    tone: "slate",
    blocks: [{ t: "unit", id: "what" }],
  },
  {
    id: "map",
    kind: "lesson",
    section: "المفهوم",
    en: "QUANTIFIER MAP",
    mascot: "\uD83D\uDDFA\uFE0F",
    title: "خريطة أدوات الكمية — أي أداة تسكن أي عمود؟",
    lead: "الخريطة طبقة إضافية تُنظّم المصدر؛ نصوص الخريطتين أدناه كما وردت كاملتين.",
    tone: "teal",
    blocks: [
      { t: "lab", key: "mapDiagram" },
      { t: "unit", id: "map" },
      { t: "unit", id: "full-map" },
    ],
  },
  {
    id: "some",
    kind: "lesson",
    section: "المختبرات",
    en: "SOME LAB",
    mascot: "\uD83E\uDDEA",
    title: "مختبر SOME — كمية غير محددة لكنها موجودة",
    lead: "أمثلة LTR معزولة، وكل شرح المصدر حاضر بالكامل.",
    tone: "sky",
    blocks: [
      { t: "unit", id: "some" },
      { t: "unit", id: "some with countable", bare: true },
      { t: "unit", id: "some with uncountable", bare: true },
      { t: "unit", id: "some and exact number", bare: true },
      { t: "unit", id: "some positive sentences", bare: true },
    ],
  },
  {
    id: "any",
    kind: "lesson",
    section: "المختبرات",
    en: "ANY LAB",
    mascot: "\uD83E\uDEE7",
    title: "مختبر ANY — أرض الأسئلة والنفي",
    lead: "ثلاث إشارات مرور: مثبتة ← some، سؤال/نفي ← any — مع العلاقة البصرية الكاملة.",
    tone: "violet",
    blocks: [
      { t: "unit", id: "any" },
      { t: "unit", id: "any in questions", bare: true },
      { t: "unit", id: "any in negatives", bare: true },
    ],
  },
  {
    id: "somevsany",
    kind: "lesson",
    section: "المختبرات",
    en: "SOME VS ANY",
    mascot: "\u2696\uFE0F",
    title: "SOME مقابل ANY — والفرق الذي لا تقوله القاعدة المختصرة",
    lead: "لا تختزلهما في «مثبتة/سؤال» فقط؛ العروض والطلبات استثناء مهمّ في المصدر.",
    tip: "السؤال هنا عرض أو طلب — والإجابة المتوقعة «نعم»، لذا some لا any.",
    tone: "amber",
    blocks: [
      { t: "unit", id: "some-any" },
      { t: "unit", id: "juice comparison", bare: true },
      { t: "lab", key: "offers" },
      { t: "unit", id: "some offers and requests", bare: true },
    ],
  },
  {
    id: "many",
    kind: "lesson",
    section: "المقارنات",
    en: "MANY",
    mascot: "\uD83D\uDD00",
    title: "③ MANY",
    tone: "emerald",
    blocks: [
      { t: "unit", id: "many" },
      { t: "unit", id: "many examples", bare: true },
      { t: "unit", id: "many errors", bare: true },
    ],
  },
  {
    id: "much",
    kind: "lesson",
    section: "المقارنات",
    en: "MUCH",
    mascot: "\uD83D\uDD00",
    title: "④ MUCH",
    tone: "violet",
    blocks: [
      { t: "unit", id: "much" },
      { t: "unit", id: "much examples", bare: true, tone: "violet" },
      { t: "lab", key: "timeSensor" },
      { t: "unit", id: "time special meaning", bare: true, tone: "amber" },
    ],
  },
  {
    id: "manymuch",
    kind: "lesson",
    section: "المقارنات",
    en: "MANY VS MUCH",
    mascot: "\uD83D\uDD00",
    title: "MANY مقابل MUCH — عددٌ مقابل مقدار",
    lead: "لوحة مقارنة بصرية، تليها وحدات المصدر كاملة عن many وmuch والمواجهة بينهما.",
    tone: "cyan",
    blocks: [
      { t: "lab", key: "vsBoard" },
      { t: "unit", id: "many-much" },
      { t: "unit", id: "many versus much", bare: true },
    ],
  },
  {
    id: "lot",
    kind: "lesson",
    section: "الأدوات",
    en: "A LOT OF · LOTS OF",
    mascot: "\uD83D\uDCE6",
    title: "خزان الكمية الكبيرة — تعمل مع النوعين",
    lead: "a lot of وlots of: المعنى نفسه، والاختيار بينهما ذوق لغوي لا قاعدة صلبة.",
    tone: "teal",
    blocks: [
      { t: "unit", id: "alot" },
      { t: "unit", id: "lots" },
      { t: "unit", id: "a lot countable", bare: true },
      { t: "unit", id: "a lot uncountable", bare: true },
      { t: "unit", id: "a lot versus many much", bare: true, tone: "amber" },
      { t: "unit", id: "a lot of versus lots of", bare: true, tone: "sky" },
    ],
  },
  {
    id: "few",
    kind: "lesson",
    section: "الأدوات",
    en: "A FEW VS FEW",
    mascot: "\uD83D\uDCCF",
    title: "ميزان المعدود: a few مقابل few — حرف يصنع المعنى",
    lead: "المسافة بين الكفتين ليست كمية فقط، بل إحساس: موجود وكافٍ… أم ناقص ومُقلق.",
    tone: "emerald",
    blocks: [
      { t: "lab", key: "fewMeters" },
      { t: "unit", id: "afew", tone: "emerald" },
      { t: "unit", id: "few", tone: "rose" },
      { t: "unit", id: "a few meaning", bare: true, tone: "emerald" },
      { t: "unit", id: "a few positive feeling", bare: true, tone: "emerald" },
      { t: "unit", id: "few meaning", bare: true, tone: "rose" },
      { t: "unit", id: "a few versus few", bare: true, tone: "amber" },
    ],
  },
  {
    id: "little",
    kind: "lesson",
    section: "الأدوات",
    en: "A LITTLE VS LITTLE",
    mascot: "\uD83D\uDCA7",
    title: "ميزان غير المعدود: a little مقابل little",
    lead: "نفس الحيلة، نفس الحرف — لكن الكوب هذه المرة سائل.",
    tone: "sky",
    blocks: [
      { t: "lab", key: "littleMeters" },
      { t: "unit", id: "alittle", tone: "sky" },
      { t: "unit", id: "little", tone: "rose" },
      { t: "unit", id: "a little meaning", bare: true, tone: "sky" },
      { t: "unit", id: "little meaning", bare: true, tone: "rose" },
      { t: "unit", id: "a little versus little", bare: true, tone: "amber" },
    ],
  },
  {
    id: "whya",
    kind: "lesson",
    section: "الأدوات",
    en: "WHY «A» MATTERS",
    mascot: "\uD83D\uDD24",
    title: "لماذا حرف a مهمّ لهذه الدرجة؟",
    lead: "ليس زخرفًا — a تنقل الجملة من الشكوى إلى الاطمئنان.",
    tone: "amber",
    blocks: [
      { t: "lab", key: "whyA", covers: ["iq-explain"] },
      { t: "unit", id: "why a matters", bare: true },
      { t: "unit", id: "smart question", bare: true },
    ],
  },
  {
    id: "wall",
    kind: "lesson",
    section: "الأدوات",
    en: "REFERENCE WALL",
    mascot: "\uD83E\uDDF1",
    title: "جدار الأمثلة — اسم واحد، خمس أدوات",
    lead: "books / water / students / money / time: الحقل الذي تتصارع عليه الأدوات.",
    tone: "slate",
    blocks: [
      { t: "unit", id: "combined" },
      { t: "unit", id: "combined examples", bare: true },
      { t: "lab", key: "quickRule" },
      { t: "unit", id: "battle", bare: true },
      { t: "lab", key: "detector" },
      { t: "unit", id: "fast-reference meanings", bare: true },
    ],
  },
  {
    id: "there",
    kind: "lesson",
    section: "الربط",
    en: "THERE IS · THERE ARE",
    mascot: "\uD83E\uDD16",
    title: "آلة الكمية الموجودة — is أم are؟",
    lead: "تذكير من الدرس 21: الفاعل يقرر الفعل، وأداة الكمية لا تزحزحه.",
    tone: "cyan",
    blocks: [
      { t: "lab", key: "thereMachine" },
      { t: "unit", id: "there" },
      { t: "unit", id: "is are warning", bare: true, tone: "rose" },
    ],
  },
  {
    id: "lab",
    kind: "lesson",
    section: "الربط",
    en: "LANGUAGE LABORATORY",
    mascot: "\uD83E\uDD7C\uFE0F",
    title: "مختبر اللغة — أربع عيّنات تحت المجهر",
    lead: "العيّنات نفسها في المصدر: فرق الإحساس كله يعود إلى a الصغيرة.",
    tone: "violet",
    blocks: [
      { t: "lab", key: "testTubes" },
      { t: "unit", id: "lab" },
    ],
  },
  {
    id: "training1",
    kind: "lesson",
    section: "التدريب",
    en: "TRAINING STATIONS",
    mascot: "\uD83C\uDFAF",
    title: "محطات التدريب الخمس · المحطة ①",
    tip: "كل بطاقة: اختيار محايد أولًا، ثم «تحقق من الإجابات»، ثم ↺ إعادة. لا كشف مبكر.",
    tone: "cyan",
    blocks: [{ t: "lab", key: "training1", covers: ["training1"] }],
  },
  {
    id: "training2",
    kind: "lesson",
    section: "التدريب",
    en: "TRAINING STATIONS",
    mascot: "\uD83C\uDFAF",
    title: "محطات التدريب الخمس · المحطة ②",
    tip: "كل بطاقة: اختيار محايد أولًا، ثم «تحقق من الإجابات»، ثم ↺ إعادة. لا كشف مبكر.",
    tone: "sky",
    blocks: [{ t: "lab", key: "training2", covers: ["training2"] }],
  },
  {
    id: "training3",
    kind: "lesson",
    section: "التدريب",
    en: "TRAINING STATIONS",
    mascot: "\uD83C\uDFAF",
    title: "محطات التدريب الخمس · المحطة ③",
    tip: "كل بطاقة: اختيار محايد أولًا، ثم «تحقق من الإجابات»، ثم ↺ إعادة. لا كشف مبكر.",
    tone: "emerald",
    blocks: [{ t: "lab", key: "training3", covers: ["training3"] }],
  },
  {
    id: "training4",
    kind: "lesson",
    section: "التدريب",
    en: "TRAINING STATIONS",
    mascot: "\uD83C\uDFAF",
    title: "محطات التدريب الخمس · المحطة ④",
    tip: "كل بطاقة: اختيار محايد أولًا، ثم «تحقق من الإجابات»، ثم ↺ إعادة. لا كشف مبكر.",
    tone: "teal",
    blocks: [{ t: "lab", key: "training4", covers: ["training4"] }],
  },
  {
    id: "training5",
    kind: "lesson",
    section: "التدريب",
    en: "TRAINING STATIONS",
    mascot: "\uD83C\uDFAF",
    title: "محطات التدريب الخمس · المحطة ⑤",
    tip: "كل بطاقة: اختيار محايد أولًا، ثم «تحقق من الإجابات»، ثم ↺ إعادة. لا كشف مبكر.",
    tone: "rose",
    blocks: [{ t: "lab", key: "training5", covers: ["training5"] }],
  },
  {
    id: "detective",
    kind: "lesson",
    section: "التحليل",
    en: "ANALYSIS BENCH",
    mascot: "\uD83D\uDD75\uFE0F",
    title: "🕵️ Grammar Detective",
    lead: "لوحات عمل: علّم ما أنجزته، ثم اكشف الملاحظات. الحكم يبقى بعد الضغط على زر التحقق فقط.",
    tone: "rose",
    blocks: [
      { t: "unit", id: "detective" },
      { t: "lab", key: "detectiveBoard" },
    ],
  },
  {
    id: "iq200",
    kind: "lesson",
    section: "التحليل",
    en: "IQ200 CHALLENGE",
    mascot: "\uD83D\uDE80",
    title: "🚀 IQ200 Challenge",
    tone: "violet",
    blocks: [
      { t: "unit", id: "iq200" },
      { t: "lab", key: "iq200Board" },
    ],
  },
  {
    id: "meaning",
    kind: "lesson",
    section: "التحليل",
    en: "MEANING CHALLENGE",
    mascot: "\uD83E\uDDE0",
    title: "🧠 تحدي المعنى",
    tone: "indigo",
    blocks: [
      { t: "unit", id: "meaning" },
      { t: "lab", key: "meaningChallenge" },
    ],
  },
  {
    id: "boss",
    kind: "lesson",
    section: "المهمة",
    en: "FINAL BOSS — RESTAURANT",
    mascot: "\uD83C\uDFC6",
    title: "المهمة النهائية — مطعم Quantity Lab",
    lead: "كل أدواتك تتجمّع هنا: عُدّة المطعم + قصة من 10 جمل. لا تُختصر المهمة — نفّذها.",
    tone: "rose",
    blocks: [
      { t: "unit", id: "boss" },
      { t: "lab", key: "missionDeck" },
    ],
  },
  {
    id: "mini",
    kind: "lesson",
    section: "المهمة",
    en: "MINI FINAL TEST",
    mascot: "\uD83E\uDDEA",
    title: "الاختبار النهائي المصغر — 8 أسئلة",
    lead: "نفس البروتوكول: أجبتَ، تحقّقتَ، أعدتَ. مفتاح التصحيح داخل نفس الوحدة المصدرية.",
    tone: "indigo",
    blocks: [
      { t: "unit", id: "mini", bare: true },
      { t: "lab", key: "miniTest" },
    ],
  },
  {
    id: "answers",
    kind: "lesson",
    section: "الإجابات",
    en: "ANSWER KEY",
    mascot: "\uD83C\uDFC5",
    title: "مفتاح الإجابات — خمس حزم تدريب",
    lead: "كما ورد في المصدر، سطرًا سطرًا، بلا تغيير.",
    tone: "amber",
    blocks: [{ t: "lab", key: "answerKey", covers: ["answers"] }],
  },
  {
    id: "summary",
    kind: "lesson",
    section: "الخاتمة",
    en: "GOLDEN SUMMARY",
    mascot: "\uD83D\uDCDC",
    title: "الخلاصة النهائية والقاعدة الذهبية",
    tip: "a few ≠ few — a little ≠ little. وجود a يعني الكمية موجودة ومقبولة؛ غيابها يفتح باب النقص.",
    tone: "teal",
    blocks: [
      { t: "lab", key: "goldenRule" },
      { t: "unit", id: "summary", tone: "gold" },
    ],
  },
  {
    id: "roadmap",
    kind: "lesson",
    section: "الخاتمة",
    en: "ROADMAP",
    mascot: "\uD83D\uDDFA",
    title: "مسارنا الآن — الخطوة التالية في منظومة الأزمنة",
    tone: "slate",
    blocks: [
      { t: "lab", key: "roadmapTimeline" },
      { t: "unit", id: "roadmap" },
    ],
  },
  {
    id: "quiz",
    kind: "quiz",
    section: "الخاتمة",
    en: "FINAL QUIZ — QUANTIFIERS",
    mascot: "\uD83D\uDCDD",
    title: "الاختبار النهائي — 12 سؤالًا جديدة مع الشرح ومساحة المعلم",
    tip: "المكوّن المشترك كما هو — لا كشف قبل التحقق، ولا مفتاح قبل فتح مساحة المعلم.",
    tone: "cyan",
    blocks: [{ t: "lab", key: "finalQuiz" }],
  },
];

export const STEP_COUNT_24 = STEPS_24.length;
