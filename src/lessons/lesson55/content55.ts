export type Pair = {en:string; ar:string; detail?:string};
export type LessonPage = {id:string; section:string; title:string; paragraphs?:string[]; formulas?:string[]; pairs?:Pair[]};
export const pages: LessonPage[] = [
 {id:'review',section:'المقدمة',title:'ماذا تعلمنا في الدروس السابقة؟',paragraphs:['الدرس 55 من 120 · مستوى متقدم. Mixed Conditionals — الجمل الشرطية المختلطة: ربط شرط افتراضي في زمن بنتيجة افتراضية في زمن مختلف.','في الدرس 51 تعلمنا الشرط الصفري Zero Conditional للحقائق العامة. في الدرس 52 تعلمنا الشرط الأول First Conditional لاحتمال حقيقي في المستقبل. في الدرس 53 تعلمنا الشرط الثاني Second Conditional للمواقف الافتراضية أو غير الواقعية في الحاضر أو المستقبل. في الدرس 54 تعلمنا الشرط الثالث Third Conditional لتخيّل نتيجة مختلفة لشيء لم يحدث في الماضي.','والآن نصل إلى الدرس 55. سنكتشف اليوم أن جملة الشرط لا يجب أن تكون دائمًا في الزمن نفسه الذي توجد فيه النتيجة. فقد نتحدث عن شرط في الماضي، لكن نتيجته تكون في الحاضر. وقد نتحدث عن حالة في الحاضر، لكن نتيجتها الافتراضية تتعلق بالماضي. وهنا نستخدم Mixed Conditionals.'],pairs:[
 {en:'If you heat water to 100°C, it boils.',ar:'إذا سخّنت الماء إلى 100 درجة مئوية، فإنه يغلي.'},
 {en:'If I study hard, I will pass the exam.',ar:'إذا درست بجد، فسأنجح في الامتحان.'},
 {en:'If I had more money, I would buy a new car.',ar:'لو كان لدي مال أكثر، لاشتريت سيارة جديدة.'},
 {en:'If I had studied harder, I would have passed the exam.',ar:'لو كنت قد درست بجد أكثر، لكنت نجحت في الامتحان.'}]},
 {id:'meaning',section:'المعنى',title:'ما معنى Mixed Conditionals؟',paragraphs:['كلمة Mixed تعني مختلط، وكلمة Conditionals تعني الجمل الشرطية. إذن Mixed Conditionals تعني: الجمل الشرطية المختلطة. لماذا سُمّيت مختلطة؟ لأننا نخلط بين زمنين مختلفين داخل الجملة الشرطية الواحدة: جملة If تتحدث عن زمن معين، وجملة النتيجة تتحدث عن زمن آخر.','لنحلل المثال: If I had studied medicine — لو كنت قد درست الطب. هذه الجملة تتحدث عن الماضي. هل درست الطب فعلًا؟ لا. I would be a doctor now — لكنت طبيبًا الآن. هذه الجملة تتحدث عن الحاضر. هل أنا طبيب الآن؟ لا. إذن الشرط ماضٍ افتراضي، والنتيجة حاضر افتراضي: هذا هو الشرط المختلط. لاحظ الفرق في المثال الثاني: الشرط والنتيجة كلاهما يتعلقان بالماضي، ولذلك هذه جملة Third Conditional عادية. الفكرة الأساسية: في Mixed Conditionals لا ننظر فقط إلى شكل الفعل، بل ننظر إلى الزمن الذي تشير إليه كل فكرة في المعنى.'],pairs:[
 {en:'If I had studied medicine, I would be a doctor now.',ar:'لو كنت قد درست الطب، لكنت طبيبًا الآن.',detail:'If I had studied medicine: ماضٍ افتراضي لم يحدث. I would be a doctor now: حاضر افتراضي غير واقع.'},
 {en:'If I had studied medicine, I would have become a doctor.',ar:'لو كنت قد درست الطب، لكنت أصبحت طبيبًا.'}]},
 {id:'past-now',section:'النوع الأول',title:'شرط في الماضي ونتيجة في الحاضر',formulas:['If + Past Perfect → would + V1','If + had + V3, would + V1','If + had + V3, would be + complement'],paragraphs:['Past Condition → Present Result. هذا هو النوع الأول والأكثر استخدامًا في Mixed Conditionals. نستخدمه عندما نريد أن نقول إن شيئًا لم يحدث في الماضي، ولذلك توجد نتيجة مختلفة في الحاضر. كيف نفهم القاعدة؟ لدينا حدث في الماضي لم يحدث. هذا الحدث كان من الممكن أن يغيّر وضعنا الحالي. لذلك نتخيل الماضي بصورة مختلفة، ثم نتحدث عن النتيجة التي كانت ستوجد الآن. نستخدم had + V3 للماضي التام، ويمكن أن تأتي النتيجة مع would be عند الحاجة.','في المثال الأول: had studied ماضٍ تام، والدراسة تتعلق بالماضي، والمعنى أنني لم أدرس بجد كافٍ في الماضي. would have: هنا have فعل أساسي بمعنى أملك، وليس جزءًا من صيغة would have + V3. a better job: عمل أفضل؛ now: الآن. النتيجة تتعلق بالحاضر. الماضي: لم أدرس بجد. الحاضر: ليس لدي العمل الأفضل الذي كنت سأحصل عليه لو درست بجد.','قد تأتي النتيجة الحاضرة بصيغة الاستمرار would be + verb-ing عندما نصف نشاطًا أو وضعًا مستمرًا الآن، كما في حوار John: If I had studied engineering, I would be working as an engineer now. وفي القراءة: If I had accepted that opportunity, I would probably be living in another country now. الفعل الأساسي بعد would هنا هو be؛ أما working وliving فيوضحان الاستمرار، ولا يحولان النتيجة إلى ماضٍ.'],pairs:[
 {en:'If I had studied harder, I would have a better job now.',ar:'لو كنت قد درست بجد أكثر، لكان لدي عمل أفضل الآن.',detail:'If I had studied harder: لو كنت قد درست بجد أكثر. had studied: ماضٍ تام؛ الدراسة تتعلق بالماضي. المعنى: لم أدرس بجد كافٍ في الماضي. I would have a better job now: لكان لدي عمل أفضل الآن. would have: هنا have فعل أساسي بمعنى أملك وليس جزءًا من would have + V3. a better job: عمل أفضل. now: الآن. النتيجة تتعلق بالحاضر.'},
 {en:'If she had learned English, she would work for an international company now.',ar:'لو كانت قد تعلمت الإنجليزية، لكانت تعمل في شركة دولية الآن.',detail:'الشرط: had learned = كانت قد تعلمت. النتيجة: would work = كانت ستعمل. كلمة now توضح أن النتيجة تتعلق بالحاضر.'},
 {en:'If he had taken the medicine, he would feel better now.',ar:'لو كان قد تناول الدواء، لشعر بتحسن الآن.',detail:'الشرط في الماضي: had taken. النتيجة في الحاضر: would feel.'},
 {en:'If we had bought that house, we would live near the beach now.',ar:'لو كنا قد اشترينا ذلك المنزل، لكنا نعيش بالقرب من الشاطئ الآن.',detail:'الشرط: شراء المنزل في الماضي. النتيجة: السكن بالقرب من الشاطئ في الحاضر.'},
 {en:'If I had accepted the job, I would earn more money now.',ar:'لو كنت قد قبلت الوظيفة، لكنت أكسب مالًا أكثر الآن.',detail:'الشرط: had accepted. النتيجة: would earn.'},
 {en:'If they had moved to London, their children would speak English fluently now.',ar:'لو كانوا قد انتقلوا إلى لندن، لكان أطفالهم يتحدثون الإنجليزية بطلاقة الآن.',detail:'الشرط في الماضي، والنتيجة في الحاضر.'}]},
 {id:'why-perfect',section:'النوع الأول',title:'لماذا نستخدم Past Perfect؟',paragraphs:['قد تسأل: لماذا لا نقول If I studied medicine, I would be a doctor now؟ هذه الجملة ممكنة من حيث التركيب، لكنها لا تعبر بالضرورة عن المعنى الذي نريده. If I studied medicine, I would be a doctor — لو درست الطب، لكنت طبيبًا. هذه أقرب إلى Second Conditional، أي افتراض أو احتمال غير واقعي أو بعيد يتعلق بالحاضر أو المستقبل، بحسب السياق. أما If I had studied medicine, I would be a doctor now — لو كنت قد درست الطب، لكنت طبيبًا الآن — فهنا نتحدث بوضوح عن فرصة ماضية انتهت ولم تحدث، ونتيجتها موجودة في الحاضر.'],pairs:[
 {en:'If I studied medicine, I would be a doctor.',ar:'لو درست الطب، لكنت طبيبًا.'},
 {en:'If I studied medicine, I would become a doctor.',ar:'لو درست الطب، لأصبحت طبيبًا.',detail:'الدراسة افتراض أو احتمال غير واقعي أو بعيد.'},
 {en:'If I had studied medicine, I would be a doctor now.',ar:'لو كنت قد درست الطب، لكنت طبيبًا الآن.',detail:'الدراسة فرصة في الماضي لم تحدث، والنتيجة في حياتي الآن.'}]},
 {id:'now-past',section:'النوع الثاني',title:'شرط في الحاضر ونتيجة في الماضي',formulas:['If + Past Simple → would have + V3'],paragraphs:['Present Condition → Past Result. هذا النوع يعكس الاتجاه السابق. نستخدمه عندما تكون لدينا صفة أو حالة أو حقيقة افتراضية في الحاضر، ونربطها بنتيجة افتراضية حدثت أو لم تحدث في الماضي. أي: If + التصريف الثاني للفعل، would have + التصريف الثالث. لاحظ جيدًا: رغم أننا نستخدم Past Simple في جملة If، فإن المعنى هنا يتعلق غالبًا بحالة أو صفة حالية. ورغم أننا نستخدم would have + V3 في النتيجة، فإن هذه النتيجة تتعلق بالماضي.','ملاحظة مهمة: النوع الثاني أقل شيوعًا من النوع الأول، وقد يعتمد فهمه على السياق. فليس كل استعمال لـ Past Simple في جملة If مع would have + V3 دليلًا تلقائيًا على Mixed Conditional؛ يجب أن يكون المقصود فعلًا حالة أو شرطًا في الحاضر، ونتيجة في الماضي.'],pairs:[
 {en:"If I were more careful, I wouldn't have made that mistake yesterday.",ar:'لو كنت أكثر حذرًا، لما ارتكبت ذلك الخطأ أمس.',detail:'If I were more careful: لو كنت أكثر حذرًا. هذه حالة أو صفة تتعلق بشخصيتي الآن. I wouldn\'t have made that mistake yesterday: لما ارتكبت ذلك الخطأ أمس. هذه نتيجة افتراضية تتعلق بالماضي. إذن الحالة: أنا لست حذرًا بما يكفي. النتيجة الماضية: ارتكبت الخطأ أمس.'},
 {en:"If he were more responsible, he wouldn't have forgotten the meeting yesterday.",ar:'لو كان أكثر مسؤولية، لما نسي الاجتماع أمس.',detail:'الشرط: صفة المسؤولية. النتيجة: نسيان الاجتماع في الماضي.'},
 {en:'If she spoke English fluently, she would have understood the conversation yesterday.',ar:'لو كانت تتحدث الإنجليزية بطلاقة، لكانت قد فهمت المحادثة أمس.',detail:'الشرط: قدرتها الحالية على التحدث بالإنجليزية. النتيجة: فهم المحادثة أمس.'},
 {en:"If I weren't so shy, I would have talked to her at the party.",ar:'لو لم أكن خجولًا إلى هذا الحد، لكنت تحدثت معها في الحفلة.',detail:'الشرط: الخجل صفة أو حالة حالية. النتيجة: عدم التحدث معها في الحفلة الماضية.'},
 {en:'If they lived closer, they would have visited us last weekend.',ar:'لو كانوا يعيشون بالقرب منا، لكانوا قد زارونا في عطلة نهاية الأسبوع الماضية.',detail:'الشرط: مكان سكنهم الحالي. النتيجة: زيارة لم تحدث في الماضي.'},
 {en:'If he knew how to drive, he would have taken us to the airport yesterday.',ar:'لو كان يعرف القيادة، لكان قد أوصلنا إلى المطار أمس.',detail:'الشرط: معرفة القيادة. النتيجة: توصيلنا إلى المطار أمس.'}]},
 {id:'compare',section:'المقارنة',title:'مقارنة الأنواع الأربعة',formulas:['If + Past Simple → would + V1','If + Past Perfect → would have + V3','If + Past Perfect → would + V1','If + Past Simple → would have + V3'],paragraphs:['النوع الأول: جملة If في Past Perfect، والنتيجة would + V1؛ المعنى شرط ماضٍ ونتيجة حاضرة.','النوع الثاني: جملة If في Past Simple، والنتيجة would have + V3؛ المعنى شرط حاضر ونتيجة ماضية.','هذا الجزء مهم جدًا؛ لأنه يجمع ما تعلمناه في الدروس 53 و54 و55.','Second Conditional: الشرط حاضر افتراضي والنتيجة حاضر أو مستقبل افتراضي.','Third Conditional: الشرط ماضٍ افتراضي والنتيجة ماضٍ افتراضي.','Mixed Conditional النوع الأول: الشرط ماضٍ افتراضي والنتيجة حاضر افتراضي.','Mixed Conditional النوع الثاني: الشرط حالة حالية افتراضية والنتيجة ماضٍ افتراضي.','now = الآن، yesterday = أمس، last year = العام الماضي، at the moment = في الوقت الحالي. هذه الكلمات تساعد على تحديد زمن المعنى لكنها ليست شرطًا لوجود Mixed Conditional.'],pairs:[
 {en:'If I had more time, I would learn Spanish.',ar:'لو كان لدي وقت أكثر، لتعلمت الإسبانية.',detail:'Second: لا أملك وقتًا كافيًا الآن وأتخيل وضعًا مختلفًا.'},
 {en:'If I had studied harder, I would have passed the exam.',ar:'لو كنت قد درست بجد أكثر، لكنت نجحت في الامتحان.',detail:'Third: ماضٍ → ماضٍ.'},
 {en:'If I had studied harder, I would have a better career now.',ar:'لو كنت قد درست بجد أكثر، لكانت لدي مهنة أفضل الآن.',detail:'Mixed 1: ماضٍ → حاضر.'},
 {en:"If I were more organized, I wouldn't have missed the appointment yesterday.",ar:'لو كنت أكثر تنظيمًا، لما فاتني الموعد أمس.',detail:'Mixed 2: حاضر → ماضٍ.'},
 {en:'If I had saved money, I would own a car now.',ar:'لو كنت قد ادخرت المال، لامتلكت سيارة الآن.'},
 {en:'If I were richer, I would have bought that car last year.',ar:'لو كنت أغنى، لكنت اشتريت تلك السيارة العام الماضي.'}]},
 {id:'were',section:'التراكيب',title:'استخدام was وwere',paragraphs:['في Second Conditional وMixed Conditional من النوع الثاني، نستخدم غالبًا were مع جميع الضمائر في الأسلوب الرسمي أو التقليدي عند التعبير عن الافتراض. قد تسمع was في المحادثات غير الرسمية، لكن were هو الاختيار التقليدي الأكثر أمانًا في هذا النوع من الافتراضات، خاصة في الكتابة والاختبارات.'],pairs:[
 {en:'If I were rich, I would travel around the world.',ar:'لو كنت غنيًا، لسافرت حول العالم.'},
 {en:"If she were more patient, she wouldn't have argued with him yesterday.",ar:'لو كانت أكثر صبرًا، لما تشاجرت معه أمس.'},
 {en:'If he were here, he would have helped us.',ar:'لو كان هنا، لكان قد ساعدنا.'},
 {en:"If I was more careful, I wouldn't have made that mistake.",ar:'استخدام غير رسمي لـ was.'}]},
 {id:'negative',section:'التراكيب',title:'النفي في Mixed Conditionals',paragraphs:['يمكن أن ننفي الشرط أو النتيجة أو الاثنين معًا. الحالة الأولى: نفي الشرط؛ الشرط منفي في الماضي والنتيجة مثبتة في الحاضر. الحالة الثانية: نفي النتيجة؛ الشرط مثبت في الماضي والنتيجة منفية في الحاضر. الحالة الثالثة: نفي الاثنين؛ الشرط منفي، والنتيجة منفية.'],pairs:[
 {en:"If I hadn't missed the bus, I would be at work now.",ar:'لو لم أكن قد فاتتني الحافلة، لكنت في العمل الآن.',detail:"نفي الشرط: hadn't missed؛ النتيجة مثبتة: would be."},
 {en:"If she had studied harder, she wouldn't be struggling now.",ar:'لو كانت قد درست بجد أكثر، لما كانت تواجه صعوبة الآن.',detail:'الشرط مثبت؛ النتيجة منفية.'},
 {en:"If he hadn't been so careless, he wouldn't be in trouble now.",ar:'لو لم يكن مهمِلًا إلى هذا الحد، لما كان في مشكلة الآن.',detail:'الشرط والنتيجة منفيان.'},
 {en:"If I had gone to bed earlier, I wouldn't feel tired now.",ar:'لو كنت قد ذهبت إلى الفراش مبكرًا، لما شعرت بالتعب الآن.'},
 {en:"If they were more careful, they wouldn't have lost the documents.",ar:'لو كانوا أكثر حذرًا، لما فقدوا المستندات.'},
 {en:"If we hadn't taken the wrong road, we wouldn't be lost now.",ar:'لو لم نسلك الطريق الخطأ، لما كنا تائهين الآن.'}]},
 {id:'questions',section:'التراكيب',title:'الأسئلة باستخدام Mixed Conditionals',paragraphs:['يمكن أن نحول الجملة الشرطية إلى سؤال. تذكر: في السؤال نبدأ غالبًا بـ Would أو What would أو Where would، ثم نضع الفاعل، ثم الفعل المناسب.'],pairs:[
 {en:'What would you do now if you had accepted that job?',ar:'ماذا كنت ستفعل الآن لو كنت قد قبلت تلك الوظيفة؟'},
 {en:'Where would you live now if your family had moved abroad?',ar:'أين كنت ستعيش الآن لو كانت عائلتك قد انتقلت إلى الخارج؟'},
 {en:'Would you have passed the exam if you were more focused?',ar:'هل كنت ستنجح في الامتحان لو كنت أكثر تركيزًا؟'},
 {en:'Would she be happier now if she had chosen a different career?',ar:'هل كانت ستكون أكثر سعادة الآن لو اختارت مهنة مختلفة؟'},
 {en:'What would have happened yesterday if you were more careful?',ar:'ماذا كان سيحدث أمس لو كنت أكثر حذرًا؟'}]},
 {id:'modals',section:'التراكيب',title:'Could Have وMight Have',paragraphs:['كما تعلمنا في الدرس 54، لا تقتصر الجمل الشرطية على would. يمكن استخدام would have + V3: نتيجة افتراضية؛ could have + V3: إمكانية أو قدرة كانت متاحة؛ might have + V3: احتمال افتراضي. لاحظ أن هذه الأفعال المساعدة لا تغيّر الفكرة الأساسية للزمن المختلط.'],pairs:[
 {en:'If I were more confident, I could have spoken in front of the audience yesterday.',ar:'لو كنت أكثر ثقة بنفسي، لتمكنت من التحدث أمام الجمهور أمس.'},
 {en:'If she had taken the opportunity, she might be successful now.',ar:'لو كانت قد استغلت الفرصة، فربما كانت ناجحة الآن.'},
 {en:'If he were more experienced, he could have solved the problem last night.',ar:'لو كان أكثر خبرة، لكان قادرًا على حل المشكلة الليلة الماضية.'}]}
];
export const dialogue: Pair[] = [
 {en:'Adam: Do you ever think about how your life would be different if you had made different decisions?',ar:'هل تفكر أحيانًا في كيف كانت ستختلف حياتك لو اتخذت قرارات مختلفة؟'},
 {en:'John: Yes. If I had studied engineering, I would be working as an engineer now.',ar:'نعم. لو كنت قد درست الهندسة، لكنت أعمل مهندسًا الآن.'},
 {en:"Adam: That's interesting. Why didn't you study engineering?",ar:'هذا مثير للاهتمام. لماذا لم تدرس الهندسة؟'},
 {en:'John: I was afraid of difficult subjects. If I were more confident, I would have chosen engineering.',ar:'كنت أخاف من المواد الصعبة. لو كنت أكثر ثقة بنفسي، لكنت اخترت الهندسة.'},
 {en:'Adam: Do you regret your decision?',ar:'هل تندم على قرارك؟'},
 {en:'John: Sometimes, but I am happy with my life. If I had chosen a different career, I might not have met my best friends.',ar:'أحيانًا، لكنني سعيد بحياتي. لو كنت قد اخترت مهنة مختلفة، فربما لم أكن لألتقي بأفضل أصدقائي.'},
 {en:'Adam: So you believe that one decision can change many things?',ar:'إذن تعتقد أن قرارًا واحدًا يمكن أن يغيّر أشياء كثيرة؟'},
 {en:'John: Absolutely. If I had moved to another country, my life would be completely different now.',ar:'بالتأكيد. لو كنت قد انتقلت إلى بلد آخر، لكانت حياتي مختلفة تمامًا الآن.'}
];
export const dialogueQA = [
 ['What would John be doing now if he had studied engineering?','He would be working as an engineer now.'],
 ["Why didn't John study engineering?",'Because he was afraid of difficult subjects.'],
 ['What does John say about his confidence?','He says that if he were more confident, he would have chosen engineering.'],
 ['Why might John not have met his best friends?','Because he might not have met them if he had chosen a different career.'],
 ['Does John regret his decision completely?','No, he does not regret it completely. He is happy with his life.']
];
export const reading = [
 'When people look back at their lives, they sometimes imagine how things could have been different.',
 'Sarah is one of those people. When she was younger, she received an opportunity to study abroad. However, she was afraid of leaving her family, so she decided to stay in her hometown.',
 'Today, Sarah has a good job, but she sometimes wonders about the life she could have had.',
 'She says, "If I had accepted that opportunity, I would probably be living in another country now. I might have learned another language, met different people, and discovered new cultures."',
 'Her friend believes that Sarah is a talented person. He says, "If you were more adventurous, you would have accepted the opportunity at that time."',
 'Sarah agrees that she was afraid, but she does not believe that her decision ruined her life.',
 'She says, "If I had moved abroad, I might not have built the strong relationships I have today. Every decision creates a different path, and we cannot know exactly what would have happened."',
 'Now Sarah wants to travel and explore new places. She believes that even if she missed one opportunity in the past, she can still create new opportunities in the future.'
];
export const vocabulary = [['look back','ينظر إلى الماضي أو يسترجع الذكريات'],['opportunity','فرصة'],['abroad','إلى الخارج'],['hometown','مسقط الرأس أو المدينة التي نشأ فيها الشخص'],['wonder','يتساءل'],['adventurous','محب للمغامرة'],['ruin','يدمّر'],['relationships','علاقات'],['path','طريق أو مسار'],['explore','يستكشف'],['create','ينشئ أو يصنع']];
export const readingQA = [
 ['Why did Sarah decide to stay in her hometown?','Because she was afraid of leaving her family.'],
 ['What would she probably be doing now if she had accepted the opportunity?','She would probably be living in another country now.'],
 ['What does her friend say about her personality?','He believes that she is talented but could have been more adventurous.'],
 ['Why might she not have built her current relationships if she had moved abroad?','Because moving abroad might have changed her life and prevented her from building those relationships.'],
 ['Does Sarah believe that her past decision destroyed her future?','No. She does not believe that her decision ruined her life.'],
 ['What does Sarah want to do now?','She wants to travel and explore new places.']
];
export const speaking = [
 'What would your life be like now if you had studied a different subject?',
 'If you were more confident, what would you have done differently last year?',
 'What would you be doing now if you had moved to another country?',
 "If you were more organized, what mistake wouldn't you have made recently?",
 'Do you think your past decisions affect your present life? Explain your answer.'
];
export const mistakes = [
 {prompt:'If I would have studied medicine, I would be a doctor now.',answer:'If I had studied medicine, I would be a doctor now.',explanation:'نستخدم Past Perfect بعد If، وليس would have.'},
 {prompt:'If I had went to university, I would have a better job now.',answer:'If I had gone to university, I would have a better job now.',explanation:'بعد had نستخدم V3: go = V1، went = V2، gone = V3.'},
 {prompt:'If I had saved money, I would have bought a car now.',answer:'If I had saved money, I would own a car now.',explanation:'إذا كان المقصود امتلاك سيارة الآن فالنتيجة حاضرة: would + V1.'},
 {prompt:"If I were more careful, I wouldn't have made that mistake yesterday.",answer:'حالة أو صفة عامة أو حالية ونتيجة ماضية.',explanation:'لا تعني بالضرورة أنني كنت حذرًا في الماضي.'},
 {prompt:'I studied yesterday, and I am tired now.',answer:'ليست Mixed Conditional.',explanation:'درست أمس، وأنا متعب الآن. هذه ليست Mixed Conditional؛ لأنها لا تحتوي على شرط افتراضي. يجب أن يكون هناك ارتباط شرطي افتراضي بين زمنين مختلفين.'}
];
