import type { FinalTestQuestion } from '../../shared/finalTest';
const raw: [string,string[],number,string][] = [
['If you ______ water, it boils.',['heat','will heat','heated','would heat'],0,'حقيقة عامة: Zero.'],
['If she studies hard, she ______ the exam.',['passed','will pass','would pass','would have passed'],1,'احتمال مستقبلي: First.'],
['If I ______ a bird, I would fly.',['am','will be','were','had been'],2,'افتراض غير واقعي: Second.'],
['If they had arrived earlier, they ______ the beginning of the show.',['see','will see','would see','would have seen'],3,'شرط ونتيجة ماضيان: Third.'],
['If I had studied medicine, I ______ a doctor now.',['am','would be','would have been','will be'],1,'شرط ماضٍ ونتيجة حاضرة: Mixed 1.'],
['If he were more careful, he ______ his glasses yesterday.',["wouldn't break","won't break","wouldn't have broken","doesn't break"],2,'حالة حاضرة ونتيجة ماضية: Mixed 2.'],
['If you ______ enough, you feel tired.',["don't sleep","won't sleep","wouldn't sleep","hadn't slept"],0,'نتيجة عامة متكررة: Zero.'],
['If I see her tomorrow, I ______ her the news.',['told','would tell','will tell','would have told'],2,'احتمال مستقبلي: First.'],
['If I had more money, I ______ a new computer.',['buy','will buy','would buy','would have bought'],2,'افتراض حاضر: Second.'],
['If she had practiced more, she ______ the competition.',['wins','will win','would win','would have won'],3,'نتيجة ماضية افتراضية: Third.'],
['If you don\'t exercise, you become less fit.',['Zero','First','Second','Third','Mixed 1','Mixed 2'],0,'حقيقة متكررة.'],
['If I win the competition, I will celebrate.',['Zero','First','Second','Third','Mixed 1','Mixed 2'],1,'احتمال مستقبلي.'],
['If I were taller, I would play basketball.',['Zero','First','Second','Third','Mixed 1','Mixed 2'],2,'افتراض عن الحاضر.'],
['If they had invited us, we would have attended.',['Zero','First','Second','Third','Mixed 1','Mixed 2'],3,'الشرط والنتيجة في الماضي.'],
['If I had accepted the scholarship, I would be studying abroad now.',['Zero','First','Second','Third','Mixed 1','Mixed 2'],4,'شرط ماضٍ ونتيجة حاضرة مستمرة.']
];
export const test: FinalTestQuestion[] = raw.map(([en,options,answer,why],i)=>({type:'single',ar:i<10?'اختر الإجابة الصحيحة.':'حدد نوع الجملة.',en,options,answer,why,concept:'Conditional meaning'}));
