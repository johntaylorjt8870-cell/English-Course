export type PracticeItem = { prompt: string; answer: string; explanation?: string; options?: string[] };
export type Practice = { title: string; instruction: string; items: PracticeItem[] };

export const practices: Practice[] = [
 {title:'اختر الإجابة الصحيحة',instruction:'اختر الإجابة الصحيحة ثم راجع تفسيرها.',items:[
 {prompt:'If I had studied harder, I ______ a better job now.',options:['A. would have','B. would have had','C. will have','D. had'],answer:'A. would have',explanation:'If I had studied harder, I would have a better job now. هنا have فعل أساسي بمعنى أملك، والنتيجة في الحاضر.'},
 {prompt:'If she were more careful, she ______ that mistake yesterday.',options:["A. wouldn't make","B. wouldn't have made","C. didn't make","D. won't make"],answer:"B. wouldn't have made",explanation:'لأن الخطأ حدث في الماضي، والنتيجة الافتراضية تتعلق بالماضي.'},
 {prompt:'If they had moved to Canada, they ______ there now.',options:['A. would live','B. would have lived','C. will live','D. lived'],answer:'A. would live',explanation:'لأن الانتقال إلى كندا شرط ماضٍ، والعيش هناك نتيجة حاضرة.'},
 {prompt:'If I were more confident, I ______ at the meeting last week.',options:['A. would speak','B. will speak','C. would have spoken','D. spoke'],answer:'C. would have spoken',explanation:'لأن الاجتماع كان الأسبوع الماضي، والنتيجة تتعلق بالماضي.'},
 {prompt:'If he had taken the job, he ______ more money now.',options:['A. earns','B. would earn','C. would have earned','D. earned'],answer:'B. would earn',explanation:'لأن امتلاك المال أو كسبه أكثر الآن نتيجة حاضرة.'}]},
 {title:'أكمل الفراغ بالفعل الصحيح',instruction:'اكتب الفعل الصحيح.',items:[
 {prompt:'If I had learned French, I ______ (work) in Paris now.',answer:'would work',explanation:'If I had learned French, I would work in Paris now. الشرط في الماضي والنتيجة في الحاضر.'},
 {prompt:"If he ______ (be) more patient, he wouldn't have argued with his brother yesterday.",answer:'were',explanation:"If he were more patient, he wouldn't have argued with his brother yesterday. الشرط صفة حالية، والنتيجة ماضية."},
 {prompt:'If we had bought the tickets earlier, we ______ (be) at the concert now.',answer:'would be',explanation:'If we had bought the tickets earlier, we would be at the concert now.'},
 {prompt:'If she ______ (know) how to swim, she would have joined us at the beach last week.',answer:'knew',explanation:'If she knew how to swim, she would have joined us at the beach last week.'},
 {prompt:'If they had invested their money, they ______ (be) richer today.',answer:'would be',explanation:'If they had invested their money, they would be richer today.'},
 {prompt:"If I weren't so shy, I ______ (talk) to the teacher yesterday.",answer:'would have talked',explanation:"If I weren't so shy, I would have talked to the teacher yesterday."},
 {prompt:'If he had accepted the offer, he ______ (live) in Dubai now.',answer:'would live',explanation:'If he had accepted the offer, he would live in Dubai now.'},
 {prompt:"If you were more organized, you ______ (not / forget) the appointment last Monday.",answer:"wouldn't have forgotten",explanation:"If you were more organized, you wouldn't have forgotten the appointment last Monday."}]},
 {title:'حدد نوع الجملة',instruction:'اختر النوع: الأول ماضٍ إلى حاضر، الثاني حاضر إلى ماضٍ، أو Second أو Third Conditional.',items:[
 {prompt:'If I had saved money, I would own a house now.',answer:'Mixed Conditional النوع الأول'},
 {prompt:'If I were taller, I would play basketball.',answer:'Second Conditional'},
 {prompt:'If she had studied, she would have passed.',answer:'Third Conditional'},
 {prompt:"If he were more careful, he wouldn't have broken the glass yesterday.",answer:'Mixed Conditional النوع الثاني'},
 {prompt:'If we had left earlier, we would have arrived on time.',answer:'Third Conditional'},
 {prompt:'If I had learned to drive, I would drive to work now.',answer:'Mixed Conditional النوع الأول'}]},
 {title:'صحح الأخطاء',instruction:'صحح الخطأ، أو اكتب أن الجملة صحيحة.',items:[
 {prompt:'If I would have studied medicine, I would be a doctor now.',answer:'If I had studied medicine, I would be a doctor now.',explanation:'لا نستخدم would داخل جملة If في هذه الصيغة.'},
 {prompt:'If she had went to university, she would have a better career now.',answer:'If she had gone to university, she would have a better career now.',explanation:'بعد had نستخدم V3، وgone هو التصريف الثالث.'},
 {prompt:"If he were more careful, he wouldn't make that mistake yesterday.",answer:"If he were more careful, he wouldn't have made that mistake yesterday.",explanation:"النتيجة تتعلق بالماضي، لذلك نستخدم wouldn't have + V3."},
 {prompt:'If they had bought a bigger house, they would have more space now.',answer:'الجملة صحيحة. If they had bought a bigger house, they would have more space now.'},
 {prompt:'If I am more confident, I would have spoken yesterday.',answer:'If I were more confident, I would have spoken yesterday.',explanation:'نستخدم were في الشرط الافتراضي، والنتيجة الماضية تكون would have spoken.'},
 {prompt:'If she had taken the train, she would be here now.',answer:'الجملة صحيحة. If she had taken the train, she would be here now.'}]},
 {title:'أعد كتابة الجمل باستخدام Mixed Conditionals',instruction:'حافظ على المعنى المطلوب.',items:[
 {prompt:"I didn't study English in the past. I cannot speak it fluently now. ابدأ بـ If I...",answer:'If I had studied English in the past, I would speak it fluently now.'},
 {prompt:'He is not careful. He broke his phone yesterday. ابدأ بـ If he...',answer:"If he were more careful, he wouldn't have broken his phone yesterday."},
 {prompt:"She didn't accept the job. She doesn't work in London now. ابدأ بـ If she...",answer:'If she had accepted the job, she would work in London now.'},
 {prompt:"I am very shy. I didn't introduce myself at the conference. ابدأ بـ If I...",answer:"If I weren't so shy, I would have introduced myself at the conference."},
 {prompt:"They didn't save enough money. They cannot buy a house now. ابدأ بـ If they...",answer:'If they had saved enough money, they would be able to buy a house now.'}]},
 {title:'ترجم إلى الإنجليزية',instruction:'ترجم الجمل إلى الإنجليزية.',items:[
 {prompt:'لو كنت قد تعلمت البرمجة، لكنت أعمل في شركة تقنية الآن.',answer:'If I had learned programming, I would work for a technology company now.'},
 {prompt:'لو كانت أكثر صبرًا، لما صرخت على طفلها أمس.',answer:"If she were more patient, she wouldn't have shouted at her child yesterday."},
 {prompt:'لو كنا قد حجزنا الفندق مبكرًا، لكنا نقيم فيه الآن.',answer:'If we had booked the hotel earlier, we would be staying there now.'},
 {prompt:'لو لم أكن خجولًا، لكنت تحدثت أمام الجمهور الأسبوع الماضي.',answer:"If I weren't shy, I would have spoken in front of the audience last week."},
 {prompt:'لو كان قد قبل العرض، لكان يعيش في ألمانيا الآن.',answer:'If he had accepted the offer, he would be living in Germany now.'},
 {prompt:'لو كنت قد استيقظت مبكرًا، لما كنت متعبًا الآن.',answer:"If I had woken up early, I wouldn't be tired now."}]},
 {title:'اختر الصيغة المناسبة حسب الزمن',instruction:'انتبه إلى الكلمات التي تحدد زمن الشرط والنتيجة.',items:[
 {prompt:'If I had practiced every day, I ______ better at English now.',options:['A. would be','B. would have been','C. am','D. will be'],answer:'A. would be'},
 {prompt:'If she were more responsible, she ______ the project last month.',options:['A. would finish','B. would have finished','C. finishes','D. will finish'],answer:'B. would have finished'},
 {prompt:'If he had gone to bed earlier, he ______ tired now.',options:["A. wouldn't be","B. wouldn't have been","C. isn't","D. won't be"],answer:"A. wouldn't be"},
 {prompt:'If I knew the answer, I ______ you yesterday.',options:['A. would tell','B. would have told','C. tell','D. will tell'],answer:'B. would have told'},
 {prompt:'If they had bought a car, they ______ able to travel more easily now.',options:['A. would be','B. would have been','C. are','D. were'],answer:'A. would be'}]},
 {title:'كوّن جملًا بنفسك',instruction:'اكتب خمس جمل كاملة، ثم حدد زمن الشرط وزمن النتيجة في كل واحدة.',items:[
 {prompt:'If I had chosen a different school, I would...',answer:'الشرط في الماضي؛ النتيجة في الحاضر.'},
 {prompt:'If I were more confident, I would have...',answer:'الشرط في الحاضر؛ النتيجة في الماضي.'},
 {prompt:'If I had started learning English earlier, I would...',answer:'الشرط في الماضي؛ النتيجة في الحاضر.'},
 {prompt:"If I were more organized, I wouldn't have...",answer:'الشرط في الحاضر؛ النتيجة في الماضي.'},
 {prompt:'If my family had moved to another country, I would...',answer:'الشرط في الماضي؛ النتيجة في الحاضر.'}]}
];
