// تدريبات الدرس 42 — نصوص الأسئلة من المصدر (§16، §§34–39)،
// والحلول والشروح للمقارنة الذاتية بعد المحاولة. لا تُعرض قبل المحاولة.
// مفاتيح الاختبار النهائي (§40/§41) ليست هنا إطلاقًا؛ هي في key42.ts.

export type PracticeItem42 = {
  id: string;
  section: number;
  number: number;
  prompt: string;
  context?: string[];
  options?: string[];
  fields: string[];
  answer: string;
  accept?: string[];
  reason: string;
};

const item = (
  section: number,
  number: number,
  prompt: string,
  fields: string[],
  answer: string,
  reason: string,
  extra: Partial<PracticeItem42> = {},
): PracticeItem42 => ({ id: `p${section}-${number}`, section, number, prompt, fields, answer, reason, ...extra });

// ---------- §16 التحدي السريع ----------
const quickItems: PracticeItem42[] = [
  item(16, 1, "My sister ______ play the piano now.", ["إجابتك"], "can", "now تشير إلى الحاضر، فنستخدم CAN للقدرة الحالية.", {
    options: ["can", "could", "couldn't"],
  }),
  item(16, 2, "When I was five, I ______ count to one hundred.", ["إجابتك"], "could", "When I was five ظرف ماضٍ، فنستخدم COULD للقدرة العامة في الماضي.", {
    options: ["can", "could", "couldn't"],
  }),
  item(16, 3, "My grandfather ______ use a computer when he was young, but he can use one now.", ["إجابتك"], "couldn't", "التقابل مع but he can use one now يثبت أن الماضي كان عدم قدرة، فالنفي couldn't.", {
    options: ["can", "could", "couldn't"],
  }),
];

// ---------- §34 التدريب الأول: اختر CAN أو COULD ----------
const chooseItems: PracticeItem42[] = [
  item(34, 1, "My sister ______ speak English very well now.", ["إجابتك"], "can", "قدرة حالية: now تدل على الحاضر.", { options: ["can", "could"] }),
  item(34, 2, "When I was seven, I ______ ride a bicycle.", ["إجابتك"], "could", "قدرة عامة في الماضي: When I was seven.", { options: ["can", "could"] }),
  item(34, 3, "______ you help me with this exercise, please?", ["إجابتك"], "Could", "طلب مهذب؛ please تجعل COULD الأنسب، وCan مقبولة في كلام أقل رسمية.", {
    options: ["Can", "Could"],
  }),
  item(34, 4, "It ______ rain tomorrow.", ["إجابتك"], "could", "احتمال مستقبلي، لا قدرة ولا إذن.", { options: ["can", "could"] }),
  item(34, 5, "We ______ visit the science museum next weekend.", ["إجابتك"], "could", "اقتراح: المصدر يوضح «إنها فكرة نقترحها»، والاختيار الطبيعي للاقتراح هو COULD.", {
    options: ["can", "could"],
    context: ["إنها فكرة نقترحها."],
  }),
  item(34, 6, "My grandfather ______ run very fast when he was young.", ["إجابتك"], "could", "قدرة عامة في الماضي: when he was young.", { options: ["can", "could"] }),
  item(34, 7, "______ I use your dictionary, please?", ["إجابتك"], "Could", "طلب إذن مهذب؛ ويمكن استخدام Can أيضًا كما يذكر المصدر.", {
    options: ["Can", "Could"],
    accept: ["can", "could"],
  }),
  item(34, 8, "This machine ______ process large amounts of information.", ["إجابتك"], "can", "قدرة أو إمكانية عامة للجهاز في الحاضر.", { options: ["can", "could"] }),
];

// ---------- §35 التدريب الثاني: حوّل إلى النفي ----------
const negativeItems: PracticeItem42[] = [
  item(35, 1, "She can drive a car.", ["الجملة المنفية"], "She can't drive a car.", "نضع not بعد can مباشرة، ويبقى drive بصيغة V1.", {
    accept: ["she cannot drive a car", "she can not drive a car"],
  }),
  item(35, 2, "They can understand the instructions.", ["الجملة المنفية"], "They can't understand the instructions.", "can't + V1؛ لا تتغير الصيغة مع They.", {
    accept: ["they cannot understand the instructions"],
  }),
  item(35, 3, "He could swim when he was five.", ["الجملة المنفية"], "He couldn't swim when he was five.", "النفي في الماضي couldn't + V1، ويبقى الظرف كما هو.", {
    accept: ["he could not swim when he was five"],
  }),
  item(35, 4, "We can finish the project today.", ["الجملة المنفية"], "We can't finish the project today.", "can't + V1؛ finish بلا to وبلا ing.", {
    accept: ["we cannot finish the project today"],
  }),
  item(35, 5, "Maya could read English books when she was younger.", ["الجملة المنفية"], "Maya couldn't read English books when she was younger.", "couldn't + V1؛ read تبقى كما هي.", {
    accept: ["maya could not read english books when she was younger"],
  }),
];

// ---------- §36 التدريب الثالث: حوّل إلى السؤال ----------
const questionItems: PracticeItem42[] = [
  item(36, 1, "You can speak French.", ["السؤال"], "Can you speak French?", "ننقل can قبل الفاعل؛ CAN فعل مساعد فلا نحتاج إلى do.", {
    accept: ["can you speak french"],
  }),
  item(36, 2, "She can play the piano.", ["السؤال"], "Can she play the piano?", "can قبل she، وplay تبقى V1 بلا s.", { accept: ["can she play the piano"] }),
  item(36, 3, "They could swim when they were young.", ["السؤال"], "Could they swim when they were young?", "could قبل they؛ الظرف يبقى في نهاية السؤال.", {
    accept: ["could they swim when they were young"],
  }),
  item(36, 4, "Omar can solve this problem.", ["السؤال"], "Can Omar solve this problem?", "can قبل الاسم Omar، وsolve تبقى V1.", { accept: ["can omar solve this problem"] }),
  item(36, 5, "Your grandfather could speak three languages.", ["السؤال"], "Could your grandfather speak three languages?", "could قبل الفاعل الاسمي، وspeak تبقى V1.", {
    accept: ["could your grandfather speak three languages"],
  }),
];

// ---------- §37 التدريب الرابع: COULD أم WAS/WERE ABLE TO ----------
const ableItems: PracticeItem42[] = [
  item(37, 1, "When she was young, Maya ______ speak two languages.", ["إجابتك"], "could", "المطلوب قدرة عامة في الماضي، والطريقة الطبيعية هي COULD.", {
    options: ["could", "was able to"],
  }),
  item(37, 2, "The exam was difficult, but Omar ______ answer every question.", ["إجابتك"], "was able to", "المطلوب إبراز النجاح في موقف محدد، فتُفضَّل was able to (أو managed to).", {
    options: ["could", "was able to"],
  }),
  item(37, 3, "My grandfather ______ play the piano when he was a child.", ["إجابتك"], "could", "مهارة عامة في الماضي → COULD.", { options: ["could", "was able to"] }),
  item(37, 4, "The door was locked, but the firefighters ______ open it.", ["إجابتك"], "were able to", "نجاح في موقف ماضٍ محدد مع فاعل جمع → were able to.", {
    options: ["could", "were able to"],
  }),
  item(37, 5, "I ______ understand the question yesterday, so I asked the teacher for help.", ["إجابتك"], "couldn't", "في النفي الصيغتان صحيحتان، والأكثر شيوعًا couldn't: couldn't تصلح للموقف المحدد أيضًا.", {
    options: ["couldn't", "wasn't able to"],
    accept: ["couldn't", "wasn't able to", "could not", "was not able to"],
  }),
];

// ---------- §38 Grammar Detective ----------
const detectiveItems: PracticeItem42[] = [
  item(38, 1, "She cans play tennis.", ["الجملة الصحيحة", "سبب الخطأ"], "She can play tennis.", "لا وجود لصيغة cans؛ CAN ثابتة مع جميع الضمائر.", {
    accept: ["she can play tennis"],
  }),
  item(38, 2, "He can speaks three languages.", ["الجملة الصحيحة", "سبب الخطأ"], "He can speak three languages.", "بعد الفعل الناقص يأتي V1؛ علامة المفرد لا تُضاف إلى الفعل الرئيسي.", {
    accept: ["he can speak three languages"],
  }),
  item(38, 3, "Do you can swim?", ["الجملة الصحيحة", "سبب الخطأ"], "Can you swim?", "CAN فعل مساعد يبني السؤال بنفسه؛ لا نضيف do.", { accept: ["can you swim"] }),
  item(38, 4, "I can to help you.", ["الجملة الصحيحة", "سبب الخطأ"], "I can help you.", "لا نضيف to بعد CAN؛ بعدها V1 مباشرة.", { accept: ["i can help you"] }),
  item(38, 5, "When I was six, I could rode a bicycle.", ["الجملة الصحيحة", "سبب الخطأ"], "When I was six, I could ride a bicycle.", "COULD لا تحمل الزمن إلى الفعل الرئيسي؛ يبقى V1: ride لا rode.", {
    accept: ["when i was six i could ride a bicycle"],
  }),
  item(38, 6, "She doesn't can understand the lesson.", ["الجملة الصحيحة", "سبب الخطأ"], "She can't understand the lesson.", "نفي الفعل الناقص يتم بـ n't عليه مباشرة، لا بـ doesn't.", {
    accept: ["she cannot understand the lesson", "she can not understand the lesson"],
  }),
  item(38, 7, "I will can drive next year.", ["الجملة الصحيحة", "سبب الخطأ"], "I will be able to drive next year.", "لا يجتمع فعلان ناقصان؛ القدرة المستقبلية تُبنى بـ will be able to.", {
    accept: ["i will be able to drive next year"],
  }),
  item(38, 8, "Could you to open the window?", ["الجملة الصحيحة", "سبب الخطأ"], "Could you open the window?", "لا نضيف to بعد COULD؛ بعدها V1 مباشرة.", { accept: ["could you open the window"] }),
  item(38, 9, "He couldn't understood the instructions.", ["الجملة الصحيحة", "سبب الخطأ"], "He couldn't understand the instructions.", "بعد couldn't يأتي V1: understand لا understood.", {
    accept: ["he could not understand the instructions"],
  }),
  item(38, 10, "Can she playing the guitar?", ["الجملة الصحيحة", "سبب الخطأ"], "Can she play the guitar?", "بعد CAN يأتي V1، لا V-ing.", { accept: ["can she play the guitar"] }),
];

// ---------- §39 أسئلة فهم القراءة ----------
const readingItems: PracticeItem42[] = [
  item(39, 1, "How old is Daniel?", ["إجابتك"], "He is thirteen years old.", "السطر الأول من النص: Daniel is thirteen years old.", {
    accept: ["thirteen", "13", "he is thirteen years old", "he is 13 years old"],
  }),
  item(39, 2, "What couldn't he understand when he was younger?", ["إجابتك"], "He couldn't understand how electronic devices worked.", "الجملة الثانية: لم يكن يفهم كيف تعمل الأجهزة الإلكترونية.", {
    accept: ["how electronic devices worked", "electronic devices", "devices"],
  }),
  item(39, 3, "What could he build at the age of ten?", ["إجابتك"], "He could build simple models.", "At the age of ten, he could build simple models.", {
    accept: ["simple models", "models"],
  }),
  item(39, 4, "What can he design now?", ["إجابتك"], "He can design basic electronic circuits.", "Now he can design basic electronic circuits.", {
    accept: ["basic electronic circuits", "electronic circuits", "circuits"],
  }),
  item(39, 5, "What happened during the final test?", ["إجابتك"], "One part of his robot stopped working.", "One of the parts of his robot stopped working during the final test.", {
    accept: ["one part of his robot stopped working", "a part stopped working", "part of his robot stopped working"],
  }),
  item(39, 6, "Was Daniel able to repair the robot?", ["إجابتك"], "Yes, he was.", "he was able to repair it before the judges arrived.", {
    accept: ["yes", "yes he was", "yes, he was able to"],
  }),
  item(39, 7, "Why did the writer use was able to instead of could in the repair sentence?", ["إجابتك"], "Because the sentence highlights success in a specific past situation.", "الإصلاح حدث واحد محدد نجح فيه، لا مهارة عامة.", {
    accept: ["specific past situation", "success in a specific", "موقف محدد", "نجاح في موقف"],
  }),
  item(39, 8, "What will Daniel be able to do next year?", ["إجابتك"], "He will be able to work on more advanced projects.", "كلام معلمه: Next year, you'll be able to work on even more advanced projects.", {
    accept: ["more advanced projects", "advanced projects", "work on more advanced projects"],
  }),
  item(39, 9, "What does Could I show my robot...? express?", ["إجابتك"], "A polite request for permission.", "Could I...? تطلب الإذن بصورة مهذبة.", {
    accept: ["polite request for permission", "request for permission", "permission", "طلب إذن", "استئذان"],
  }),
  item(39, 10, "What does That could inspire them express?", ["إجابتك"], "Possibility.", "COULD هنا تعبر عن احتمال، لا عن قدرة ولا إذن.", {
    accept: ["possibility", "probability", "احتمال", "الإمكانية"],
  }),
];

export const PRACTICE_42: PracticeItem42[] = [...quickItems, ...chooseItems, ...negativeItems, ...questionItems, ...ableItems, ...detectiveItems, ...readingItems];

export const PRACTICE_COUNTS_42: Record<number, number> = { 16: 3, 34: 8, 35: 5, 36: 5, 37: 5, 38: 10, 39: 10 };

export function itemsFor42(section: number, from: number, to: number): PracticeItem42[] {
  return PRACTICE_42.filter((entry) => entry.section === section && entry.number >= from && entry.number <= to);
}

export function normalize42(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.،,!?؟;؛:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect42(entry: PracticeItem42, response: string): boolean {
  const value = normalize42(response);
  if (!value) return false;
  const pool = [entry.answer, ...(entry.accept ?? [])].map(normalize42);
  return pool.includes(value) || pool.some((accepted) => accepted.length > 6 && value.includes(accepted));
}

/** الأسئلة ذات الحقلين (التصحيح + السبب): الأول مطابق، والثاني تفسير حر. */
export function isPairCorrect42(entry: PracticeItem42, first: string, second: string): boolean {
  return isCorrect42(entry, first) && second.trim().length >= 8;
}
