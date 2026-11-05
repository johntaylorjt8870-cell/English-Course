export type Practice = {prompt:string; answer:string; explanation?:string};
export const practiceGroups: {title:string; items:Practice[]}[] = [
{title:'اختر الإجابة الصحيحة',items:[
['If you heat ice, it ______. (melts / will melt / would melt / would have melted)','melts','حقيقة عامة، Zero Conditional.'],
['If it rains tomorrow, we ______ at home. (stayed / will stay / would stay / would have stayed)','will stay','احتمال مستقبلي، First Conditional.'],
['If I were rich, I ______ a big house. (buy / will buy / would buy / would have bought)','would buy','افتراض حاضر، Second Conditional.'],
['If she had studied, she ______ the exam. (passes / will pass / would pass / would have passed)','would have passed','شرط ونتيجة في الماضي، Third Conditional.'],
['If I had learned English earlier, I ______ fluently now. (speak / will speak / would speak / would have spoken)','would speak','شرط ماضٍ ونتيجة حاضرة، Mixed Conditional النوع الأول.'],
["If he were more careful, he ______ his car yesterday. (wouldn't damage / wouldn't have damaged / won't damage / doesn't damage)","wouldn't have damaged",'حالة حالية ونتيجة ماضية، Mixed Conditional النوع الثاني.'],
["If you don't water flowers, they ______. (die / will die / would die / would have died)",'die','حقيقة عامة، Zero Conditional.'],
['If I see Ahmed tomorrow, I ______ him. (told / would tell / will tell / would have told)','will tell','احتمال مستقبلي، First Conditional.'],
['If she had left earlier, she ______ the train. (catches / will catch / would catch / would have caught)','would have caught','حدث ماضٍ افتراضي ونتيجته ماضية، Third Conditional.'],
['If I had more free time, I ______ another language. (learn / will learn / would learn / would have learned)','would learn','افتراض حاضر أو مستقبل، Second Conditional.']].map(([prompt,answer,explanation])=>({prompt,answer,explanation}))},
{title:'ضع الفعل في الصيغة الصحيحة',items:[
['If water ______ (reach) 100°C, it ______ (boil).','If water reaches 100°C, it boils.'],
['If I ______ (finish) my work early tomorrow, I ______ (visit) you.','If I finish my work early tomorrow, I will visit you.'],
['If I ______ (have) a private plane, I ______ (travel) around the world.','If I had a private plane, I would travel around the world.'],
['If they ______ (leave) earlier, they ______ (not / miss) the train.',"If they had left earlier, they wouldn't have missed the train."],
['If she ______ (study) medicine, she ______ (be) a doctor now.','If she had studied medicine, she would be a doctor now.'],
['If he ______ (be) more polite, he ______ (not / offend) his manager yesterday.',"If he were more polite, he wouldn't have offended his manager yesterday."],
['If you ______ (not / sleep) enough, you ______ (feel) tired.',"If you don't sleep enough, you feel tired."],
['If I ______ (see) her tonight, I ______ (give) her your message.','If I see her tonight, I will give her your message.'],
['If we ______ (know) about the problem, we ______ (help) you.','If we had known about the problem, we would have helped you.'],
['If I ______ (save) more money last year, I ______ (own) a car now.','If I had saved more money last year, I would own a car now.'],
['If she ______ (be) more organized, she ______ (not / forget) the appointment last week.',"If she were more organized, she wouldn't have forgotten the appointment last week."],
['If he ______ (practice) regularly, he ______ (improve) his English.','If he practices regularly, he will improve his English.']].map(([prompt,answer])=>({prompt,answer}))},
{title:'حدد نوع كل جملة',items:[
['If you mix red and blue, you get purple.','Zero'],['If I finish early, I will call you.','First'],['If I were a bird, I would fly around the world.','Second'],['If he had studied, he would have passed.','Third'],['If I had accepted the job, I would live in Paris now.','Mixed 1'],['If she were more confident, she would have spoken yesterday.','Mixed 2'],["If you don't charge your phone, it runs out of battery.",'Zero'],['If they invite me, I will attend.','First'],['If I had a car, I would drive to work.','Second'],["If he hadn't forgotten his passport, he would have traveled.",'Third'],['If she had learned to cook, she would prepare dinner herself now.','Mixed 1'],["If I were more patient, I wouldn't have argued with him.",'Mixed 2']].map(([prompt,answer])=>({prompt,answer}))},
{title:'صحح الأخطاء',items:[
['If you will heat water, it boils.','If you heat water, it boils.','حقيقة عامة: المضارع في الجملتين.'],['If I have a million dollars, I would buy a house.','If I had a million dollars, I would buy a house.','افتراض حاضر، Second Conditional.'],['If she had studied, she would pass the exam yesterday.','If she had studied, she would have passed the exam yesterday.','النتيجة ماضية.'],['If I had learned English, I would have a better job now.','الجملة صحيحة: If I had learned English, I would have a better job now.','شرط ماضٍ ونتيجة حاضرة، Mixed Conditional النوع الأول.'],["If he were more careful, he wouldn't break the window yesterday.","If he were more careful, he wouldn't have broken the window yesterday.",'النتيجة ماضية.'],['If I would see him tomorrow, I will tell him.','If I see him tomorrow, I will tell him.','لا نستخدم would بعد If هنا.'],['If they had went earlier, they would have arrived on time.','If they had gone earlier, they would have arrived on time.','بعد had نستخدم gone.'],['If I were rich, I will travel around the world.','If I were rich, I would travel around the world.','Second Conditional.'],['If she had accepted the job, she would have worked in London now.','If she had accepted the job, she would be working in London now.','نتيجة حاضرة مستمرة.'],["If he was more responsible, he wouldn't have forgotten the keys yesterday.","If he were more responsible, he wouldn't have forgotten the keys yesterday.",'were تقليدية في الاختبارات، وwas ممكنة في غير الرسمي.']].map(([prompt,answer,explanation])=>({prompt,answer,explanation}))},
{title:'أكمل الجمل حسب المعنى',items:[
["إذا لم يأكل الإنسان، فإنه يشعر بالجوع. If a person ______, he ______ hungry.","If a person doesn't eat, he feels hungry."],['إذا درست غدًا، فسأنجح في الامتحان. If I ______ tomorrow, I ______ the exam.','If I study tomorrow, I will pass the exam.'],['لو كنت غنيًا، لاشتريت منزلًا كبيرًا. If I ______ rich, I ______ a big house.','If I were rich, I would buy a big house.'],['لو كنت قد استيقظت مبكرًا، لما فاتني القطار. If I ______ early, I ______ the train.',"If I had woken up early, I wouldn't have missed the train."],['لو كنت قد تعلمت البرمجة، لكنت أعمل في شركة تقنية الآن. If I ______ programming, I ______ for a technology company now.','If I had learned programming, I would work for a technology company now.'],['لو كنت أكثر انتباهًا، لما ارتكبت ذلك الخطأ أمس. If I ______ more attentive, I ______ that mistake yesterday.',"If I were more attentive, I wouldn't have made that mistake yesterday."]].map(([prompt,answer])=>({prompt,answer}))},
{title:'ترجم إلى الإنجليزية',items:[['إذا لم تشرب الماء، فقد تشعر بالعطش.',"If you don't drink water, you may feel thirsty."],['إذا درست جيدًا، فسوف تحصل على درجات أفضل.','If you study well, you will get better grades.'],['لو كنت أملك وقتًا أكثر، لتعلمت لغة جديدة.','If I had more time, I would learn a new language.'],['لو كانت قد وصلت مبكرًا، لكانت قد قابلت المدير.','If she had arrived early, she would have met the manager.'],['لو كنت قد قبلت تلك الوظيفة، لكنت أعيش في لندن الآن.','If I had accepted that job, I would be living in London now.'],['لو كان أكثر هدوءًا، لما تشاجر مع صديقه أمس.',"If he were calmer, he wouldn't have argued with his friend yesterday."],['إذا تجمد الماء، فإنه يتحول إلى جليد.','If water freezes, it turns into ice.'],['إذا اتصل بي غدًا، فسأخبره بالحقيقة.','If he calls me tomorrow, I will tell him the truth.'],['لو كنت مكانك، لما فعلت ذلك.',"If I were you, I wouldn't do that."],['لو كنا قد حجزنا مبكرًا، لكنا في الفندق الآن.','If we had booked earlier, we would be at the hotel now.']].map(([prompt,answer])=>({prompt,answer}))},
{title:'تدريب إضافي من التقييم: أكمل وصحح',items:[
['If ice ______ (get) warm, it ______ (melt).','If ice gets warm, it melts.'],['If he ______ (call) me tonight, I ______ (answer).','If he calls me tonight, I will answer.'],['If I ______ (be) you, I ______ (accept) the offer.','If I were you, I would accept the offer.'],['If we ______ (leave) earlier, we ______ (not / be) late yesterday.',"If we had left earlier, we wouldn't have been late yesterday."],['If she ______ (study) English when she was young, she ______ (speak) it fluently now.','If she had studied English when she was young, she would speak it fluently now.'],['If I will have time, I will help you.','If I have time, I will help you.'],['If she had studied harder, she would pass the exam last year.','If she had studied harder, she would have passed the exam last year.'],["If I were more careful, I wouldn't lose my wallet yesterday.","If I were more careful, I wouldn't have lost my wallet yesterday."],['If he had went to university, he would have a better job now.','If he had gone to university, he would have a better job now.'],['If I had more money, I would have bought a house now.','If I had more money, I would own a house now.']].map(([prompt,answer])=>({prompt,answer}))}
];

// توضيحات إضافية للتعليم عندما لم يتضمن المصدر تفسيرًا مستقلًا لكل إجابة.
const patterns = {
 Zero:'إضافة تفسيرية: حقيقة عامة أو نتيجة متكررة؛ المضارع البسيط في الشرط والنتيجة.',
 First:'إضافة تفسيرية: احتمال واقعي مستقبلي؛ المضارع في الشرط وwill + V1 في النتيجة.',
 Second:'إضافة تفسيرية: افتراض حالي أو مستقبلي؛ الماضي في الشكل لا يستلزم الماضي في المعنى.',
 Third:'إضافة تفسيرية: شرط ونتيجة افتراضيان في الماضي؛ had + V3 ثم would have + V3.',
 'Mixed 1':'إضافة تفسيرية: شرط ماضٍ ونتيجة حاضرة؛ had + V3 ثم would + V1.',
 'Mixed 2':'إضافة تفسيرية: حالة حاضرة افتراضية ونتيجة ماضية؛ الماضي في الشكل ثم would have + V3.',
 Modal:'إضافة تفسيرية: may تعبّر عن احتمال، ويمكن أن تختلف الترجمة الطبيعية بحسب السياق.'
} as const;
type Pattern = keyof typeof patterns;
const groupPatterns: (Pattern[] | null)[] = [null,
 ['Zero','First','Second','Third','Mixed 1','Mixed 2','Zero','First','Third','Mixed 1','Mixed 2','First'],
 ['Zero','First','Second','Third','Mixed 1','Mixed 2','Zero','First','Second','Third','Mixed 1','Mixed 2'], null,
 ['Zero','First','Second','Third','Mixed 1','Mixed 2'],
 ['Modal','First','Second','Third','Mixed 1','Mixed 2','Zero','First','Second','Mixed 1'],
 ['Zero','First','Second','Third','Mixed 1','First','Third','Mixed 2','Mixed 1','Second']
];
practiceGroups.forEach((group,i)=>group.items.forEach((item,j)=>{const key=groupPatterns[i]?.[j];if(!item.explanation && key)item.explanation=patterns[key]}));

// نعيد الحروف الأصلية لخيارات التمرين الأول دون تغيير نصوص الخيارات أو المفتاح.
const originalLetters = ['A','B','C','D','C','B','A','C','D','C'];
practiceGroups[0].items.forEach((item,i)=>{
 const m = item.prompt.match(/^(.*) \((.*)\)$/);
 if (m) item.prompt = `${m[1]}\n${m[2].split(' / ').map((option,j)=>`${'ABCD'[j]}. ${option}`).join('  ')}`;
 item.answer = `${originalLetters[i]}. ${item.answer}`;
});
