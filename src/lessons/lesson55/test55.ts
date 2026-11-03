export type TestQuestion = { id: number; section: string; prompt: string; options?: string[] };
export const questions: TestQuestion[] = [
 {id:1,section:'اختر الإجابة الصحيحة',prompt:'If I had studied harder, I ______ a doctor now.',options:['A. would be','B. would have been','C. am','D. will be']},
 {id:2,section:'اختر الإجابة الصحيحة',prompt:'If he were more careful, he ______ his phone yesterday.',options:["A. wouldn't break","B. wouldn't have broken","C. won't break","D. didn't break"]},
 {id:3,section:'اختر الإجابة الصحيحة',prompt:'If she had accepted the offer, she ______ in London now.',options:['A. would work','B. would have worked','C. worked','D. will work']},
 {id:4,section:'اختر الإجابة الصحيحة',prompt:'If I were more confident, I ______ at the event last night.',options:['A. would speak','B. would have spoken','C. will speak','D. speak']},
 {id:5,section:'اختر الإجابة الصحيحة',prompt:'If they had saved more money, they ______ a bigger house now.',options:['A. would own','B. would have owned','C. owned','D. will own']},
 {id:6,section:'اختر الإجابة الصحيحة',prompt:'If he knew how to swim, he ______ us at the beach yesterday.',options:['A. would join','B. would have joined','C. joins','D. will join']},
 {id:7,section:'اختر الإجابة الصحيحة',prompt:'If I had taken the medicine, I ______ better now.',options:['A. would feel','B. would have felt','C. felt','D. will feel']},
 {id:8,section:'اختر الإجابة الصحيحة',prompt:'If she were more patient, she ______ the argument yesterday.',options:['A. would avoid','B. would have avoided','C. avoids','D. will avoid']},
 {id:9,section:'اختر الإجابة الصحيحة',prompt:'If we had left earlier, we ______ at home now.',options:['A. would be','B. would have been','C. are','D. were']},
 {id:10,section:'اختر الإجابة الصحيحة',prompt:"If I weren't afraid of public speaking, I ______ at the conference last week.",options:['A. would present','B. would have presented','C. present','D. will present']},
 {id:11,section:'أكمل الفراغ',prompt:'If I had learned Spanish, I ______ (speak) it fluently now.'},
 {id:12,section:'أكمل الفراغ',prompt:"If he ______ (be) more responsible, he wouldn't have forgotten the meeting yesterday."},
 {id:13,section:'أكمل الفراغ',prompt:'If they had invested their money, they ______ (be) richer now.'},
 {id:14,section:'أكمل الفراغ',prompt:'If she ______ (know) how to drive, she would have taken us to the airport.'},
 {id:15,section:'أكمل الفراغ',prompt:'If I had gone to sleep earlier, I ______ (not / be) tired now.'},
 {id:16,section:'صحح الخطأ',prompt:'If I would have studied harder, I would have a better job now.'},
 {id:17,section:'صحح الخطأ',prompt:'If he had went abroad, he would speak English fluently now.'},
 {id:18,section:'صحح الخطأ',prompt:"If she were more careful, she wouldn't lose her keys yesterday."},
 {id:19,section:'صحح الخطأ',prompt:'If I am more confident, I would have applied for the job last month.'},
 {id:20,section:'صحح الخطأ',prompt:'If they had bought the house, they would have a garden now.'},
 ...[
 'If I had studied law, I would be a lawyer now.',
 'If I were richer, I would travel around the world.',
 'If she had called me, I would have helped her.',
 "If he were more polite, he wouldn't have offended his teacher yesterday.",
 'If we had bought the tickets earlier, we would be at the stadium now.'
 ].map((prompt,i)=>({id:i+21,section:'حدد النوع',prompt,options:['Second Conditional','Third Conditional','Mixed Conditional النوع الأول','Mixed Conditional النوع الثاني']}))
];
