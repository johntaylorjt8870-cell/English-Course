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
