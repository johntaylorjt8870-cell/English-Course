// تدريبات الدرس 41 — نصوص الأسئلة من المصدر (§§23, 29–35)،
// والحلول والشروح للمقارنة الذاتية بعد المحاولة. لا تُعرض قبل المحاولة.

export type PracticeItem41 = {
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
  extra: Partial<PracticeItem41> = {},
): PracticeItem41 => ({ id: `p${section}-${number}`, section, number, prompt, fields, answer, reason, ...extra });

const haveItems: PracticeItem41[] = [
  item(23, 1, "I have two brothers.", ["الوظيفة"], "رئيسي", "have هنا تعني الامتلاك (لدي)؛ بعدها اسم two brothers وليس V3، فهي الفعل الرئيسي.", {
    accept: ["رئيسي", "فعل رئيسي", "main"],
  }),
  item(23, 2, "She has completed the assignment.", ["الوظيفة"], "مساعد", "has + completed (V3) يبني Present Perfect؛ completed هو الفعل الرئيسي.", {
    accept: ["مساعد", "فعل مساعد", "auxiliary"],
  }),
  item(23, 3, "They had a beautiful garden.", ["الوظيفة"], "رئيسي", "had هنا ماضٍ بمعنى «كان لديهم»؛ بعدها اسم garden وليس V3.", {
    accept: ["رئيسي", "فعل رئيسي", "main"],
  }),
  item(23, 4, "We have been waiting for an hour.", ["الوظيفة"], "مساعد", "have + been + waiting (V-ing) يبني Present Perfect Continuous؛ have مساعد.", {
    accept: ["مساعد", "فعل مساعد", "auxiliary"],
  }),
  item(23, 5, "He has lunch at school.", ["الوظيفة"], "رئيسي", "has هنا جزء من التعبير have lunch؛ لا يوجد V3 بعدها.", {
    accept: ["رئيسي", "فعل رئيسي", "main"],
  }),
  item(23, 6, "By Friday, I will have finished the report.", ["الوظيفة"], "مساعد", "will + have + finished (V3) يبني Future Perfect؛ have مساعد.", {
    accept: ["مساعد", "فعل مساعد", "auxiliary"],
  }),
];

const errorItems: PracticeItem41[] = [
  item(29, 1, "Does she studies English?", ["التصحيح", "السبب"], "Does she study English?", "does تحمل علامة المضارع للمفرد الغائب، فيعود الفعل الرئيسي إلى V1: study وليس studies.", {
    accept: ["does she study english"],
  }),
  item(29, 2, "Did he went home?", ["التصحيح", "السبب"], "Did he go home?", "did تحمل علامة الماضي، فيعود الفعل الرئيسي إلى V1: go وليس went.", {
    accept: ["did he go home"],
  }),
  item(29, 3, "Do you are ready?", ["التصحيح", "السبب"], "Are you ready?", "BE فعل رابط يستطيع تكوين السؤال مباشرة؛ لا نضيف do مع are.", {
    accept: ["are you ready"],
  }),
  item(29, 4, "Does she is studying?", ["التصحيح", "السبب"], "Is she studying?", "الجملة تحتوي أصلًا على المساعد is؛ نحرّكه إلى بداية السؤال ولا نضيف does.", {
    accept: ["is she studying"],
  }),
  item(29, 5, "Do they have finished?", ["التصحيح", "السبب"], "Have they finished?", "have مساعد التام موجود أصلًا؛ نحرّكه ولا نضيف do.", {
    accept: ["have they finished"],
  }),
  item(29, 6, "She doesn't has a car.", ["التصحيح", "السبب"], "She doesn't have a car.", "بعد doesn't يأتي الفعل الرئيسي بصيغة V1: have وليس has.", {
    accept: ["she doesn't have a car", "she does not have a car"],
  }),
  item(
    29,
    7,
    "He hasn't a car.",
    ["التصحيح", "السبب"],
    "He doesn't have a car.",
    "الصيغة التعليمية المعتمدة هنا للتعبير عن الامتلاك هي does + not + have. الصيغة He hasn't a car مستخدمة في بعض الأنواع وخاصة البريطانية، فهي تفضيل استعمال وليست خطأً مطلقًا.",
    { accept: ["he doesn't have a car", "he does not have a car"] },
  ),
  item(29, 8, "She has finish the report.", ["التصحيح", "السبب"], "She has finished the report.", "have/has المساعد يتطلب V3: finished وليس finish.", {
    accept: ["she has finished the report"],
  }),
  item(29, 9, "Will she has completed the project?", ["التصحيح", "السبب"], "Will she have completed the project?", "بعد will يأتي have بصيغتها الأساسية V1، ويبقى completed بصيغة V3.", {
    accept: ["will she have completed the project"],
  }),
  item(29, 10, "I did understood the lesson.", ["التصحيح", "السبب"], "I did understand the lesson.", "did + V1 في السؤال والنفي والتأكيد؛ لذلك understand وليس understood.", {
    accept: ["i did understand the lesson"],
  }),
];

const identifyItems: PracticeItem41[] = [
  item(30, 1, "She is reading a novel.", ["الفعل المساعد", "الفعل الرئيسي"], "is → reading", "is يبني Present Continuous، وreading هو الفعل الرئيسي بصيغة V-ing.", {
    accept: ["is reading"],
  }),
  item(30, 2, "They have completed the experiment.", ["الفعل المساعد", "الفعل الرئيسي"], "have → completed", "have يبني Present Perfect، وcompleted هو الفعل الرئيسي بصيغة V3.", {
    accept: ["have completed"],
  }),
  item(30, 3, "Did Omar visit the museum?", ["الفعل المساعد", "الفعل الرئيسي"], "did → visit", "did يبني سؤال Past Simple، وvisit هو الفعل الرئيسي بصيغة V1.", {
    accept: ["did visit"],
  }),
  item(30, 4, "We were preparing dinner.", ["الفعل المساعد", "الفعل الرئيسي"], "were → preparing", "were يبني Past Continuous، وpreparing هو الفعل الرئيسي بصيغة V-ing.", {
    accept: ["were preparing"],
  }),
  item(30, 5, "I will finish the assignment tomorrow.", ["الفعل المساعد", "الفعل الرئيسي"], "will → finish", "will مساعد للمستقبل، وfinish هو الفعل الرئيسي بصيغة V1.", {
    accept: ["will finish"],
  }),
  item(30, 6, "She has been working since morning.", ["الفعل المساعد", "الفعل الرئيسي"], "has, been → working", "has يبني التام وbeen يمثل BE للاستمرار؛ working هو الفعل الرئيسي بصيغة V-ing.", {
    accept: ["has been working", "has, been working", "has been - working"],
  }),
  item(30, 7, "They don't watch television every day.", ["الفعل المساعد", "الفعل الرئيسي"], "don't → watch", "don't (do + not) مساعد للنفي في Present Simple؛ watch هو الفعل الرئيسي بصيغة V1.", {
    accept: ["don't watch", "do not watch"],
  }),
  item(30, 8, "By Friday, we will have completed the project.", ["الفعل المساعد", "الفعل الرئيسي"], "will, have → completed", "will وhave مساعدان يبنيان Future Perfect؛ completed هو الفعل الرئيسي بصيغة V3.", {
    accept: ["will have completed", "will, have completed", "will have - completed"],
  }),
];

const choiceItems: PracticeItem41[] = [
  item(31, 1, "______ she study English every day?", ["الفعل المساعد"], "Does", "سؤال في Present Simple مع She: does تحمل التطابق، ويبقى study بصيغة V1.", {
    options: ["Do", "Does", "Is"],
    reason: "Does: سؤال في Present Simple مع She، لذلك يعود الفعل إلى V1.",
  }),
  item(31, 2, "______ they watching a film now?", ["الفعل المساعد"], "Are", "سؤال في Present Continuous: are + V-ing، وwatching موجودة أصلًا.", {
    options: ["Do", "Are", "Have"],
    reason: "Are: سؤال في Present Continuous؛ التركيب are + they + watching.",
  }),
  item(31, 3, "______ you finished your homework?", ["الفعل المساعد"], "Have", "سؤال في Present Perfect: have + you + finished (V3).", {
    options: ["Have", "Do", "Are"],
    reason: "Have: سؤال في Present Perfect؛ الدليل هو finished بصيغة V3.",
  }),
  item(31, 4, "______ he visit the museum yesterday?", ["الفعل المساعد"], "Did", "سؤال في Past Simple؛ yesterday تحدد الماضي، وdid تأخذ V1 visit.", {
    options: ["Does", "Was", "Did"],
    reason: "Did: سؤال في Past Simple، وvisit تبقى V1.",
  }),
  item(31, 5, "______ she happy yesterday?", ["الفعل المساعد"], "Was", "happy وصف، وBE الرابط يكوّن السؤال مباشرة: Was she happy?", {
    options: ["Did", "Was", "Does"],
    reason: "Was: نستخدم BE مباشرة مع الوصف happy، دون do-support.",
  }),
  item(31, 6, "______ they been waiting for an hour?", ["الفعل المساعد"], "Have", "been waiting يبني Present Perfect Continuous؛ المساعد الأول هو have.", {
    options: ["Have", "Do", "Are"],
    reason: "Have: سؤال في Present Perfect Continuous، والمساعد الأول هو have.",
  }),
  item(31, 7, "______ you have a bicycle?", ["الفعل المساعد"], "Do", "have هنا فعل رئيسي بمعنى الامتلاك، فيأخذ do-support: Do you have a bicycle?", {
    options: ["Are", "Do", "Have been"],
    reason: "Do: have فعل رئيسي للامتلاك هنا، لذلك نستخدم do.",
  }),
  item(31, 8, "______ she have completed the project by Friday?", ["الفعل المساعد"], "Will", "Future Perfect: will + have + completed؛ المساعد الأول will.", {
    options: ["Does", "Will", "Is"],
    reason: "Will: سؤال في Future Perfect، ويبقى have completed بعدها.",
  }),
];

const questionItems: PracticeItem41[] = [
  item(32, 1, "She is preparing lunch.", ["السؤال"], "Is she preparing lunch?", "نحرّك is قبل الفاعل ونحتفظ بـ preparing (V-ing).", { accept: ["is she preparing lunch"] }),
  item(32, 2, "They have finished the experiment.", ["السؤال"], "Have they finished the experiment?", "have مساعد التام؛ نحرّكه قبل they ونحتفظ بـ finished (V3).", {
    accept: ["have they finished the experiment"],
  }),
  item(32, 3, "Omar plays basketball.", ["السؤال"], "Does Omar play basketball?", "لا يوجد مساعد ظاهر: Present Simple مع Omar (He) يأخذ does، ويعود plays إلى play.", {
    accept: ["does omar play basketball"],
  }),
  item(32, 4, "Maya visited her aunt yesterday.", ["السؤال"], "Did Maya visit her aunt yesterday?", "لا يوجد مساعد ظاهر: Past Simple يأخذ did، ويعود visited إلى visit.", {
    accept: ["did maya visit her aunt yesterday"],
  }),
  item(32, 5, "We were studying at 7:00.", ["السؤال"], "Were we studying at 7:00?", "نحرّك were قبل we ونحتفظ بـ studying (V-ing).", { accept: ["were we studying at 7:00", "were we studying at 7"] }),
  item(32, 6, "He has been learning English for two years.", ["السؤال"], "Has he been learning English for two years?", "المساعد الأول has فقط ينتقل قبل he؛ تبقى been learning بعده.", {
    accept: ["has he been learning english for two years"],
  }),
  item(32, 7, "They will travel tomorrow.", ["السؤال"], "Will they travel tomorrow?", "نحرّك will قبل they، ويبقى travel بصيغة V1.", { accept: ["will they travel tomorrow"] }),
  item(32, 8, "She will have completed the project by Friday.", ["السؤال"], "Will she have completed the project by Friday?", "المساعد الأول will ينتقل قبل she، وتبقى have completed في مكانها.", {
    accept: ["will she have completed the project by friday"],
  }),
];

const negativeItems: PracticeItem41[] = [
  item(33, 1, "She is ready.", ["النفي"], "She isn't ready.", "نضع not بعد is مباشرة: isn't / is not.", { accept: ["she isn't ready", "she is not ready"] }),
  item(33, 2, "They play football every Friday.", ["النفي"], "They don't play football every Friday.", "لا يوجد مساعد ظاهر: نضيف don't ونحتفظ بـ play (V1).", {
    accept: ["they don't play football every friday", "they do not play football every friday"],
  }),
  item(33, 3, "He visited the museum.", ["النفي"], "He didn't visit the museum.", "Past Simple: didn't تحمل الماضي، ويعود visited إلى visit.", {
    accept: ["he didn't visit the museum", "he did not visit the museum"],
  }),
  item(33, 4, "Maya has finished her homework.", ["النفي"], "Maya hasn't finished her homework.", "has مساعد التام؛ نضع not بعده ونحتفظ بـ finished (V3).", {
    accept: ["maya hasn't finished her homework", "maya has not finished her homework"],
  }),
  item(33, 5, "We were watching television.", ["النفي"], "We weren't watching television.", "نضع not بعد were ونحتفظ بـ watching (V-ing).", {
    accept: ["we weren't watching television", "we were not watching television"],
  }),
  item(33, 6, "They have been working all morning.", ["النفي"], "They haven't been working all morning.", "not تأتي بعد المساعد الأول have، وتبقى been working كما هي.", {
    accept: ["they haven't been working all morning", "they have not been working all morning"],
  }),
  item(33, 7, "She will join the competition.", ["النفي"], "She won't join the competition.", "نضع not بعد will (won't / will not) ونحتفظ بـ join (V1).", {
    accept: ["she won't join the competition", "she will not join the competition"],
  }),
  item(33, 8, "He will have finished by noon.", ["النفي"], "He won't have finished by noon.", "not تأتي بعد المساعد الأول will، وتبقى have finished بعده.", {
    accept: ["he won't have finished by noon", "he will not have finished by noon"],
  }),
];

const roleItems: PracticeItem41[] = [
  item(34, 1, "I HAVE a new computer.", ["الوظيفة"], "رئيسي", "HAVE بمعنى الامتلاك؛ بعدها اسم a new computer وليس V3.", {
    accept: ["رئيسي", "فعل رئيسي", "main"],
  }),
  item(34, 2, "She HAS completed her project.", ["الوظيفة"], "مساعد", "HAS + completed (V3) يبني Present Perfect.", { accept: ["مساعد", "فعل مساعد", "auxiliary"] }),
  item(34, 3, "DO you like mathematics?", ["الوظيفة"], "مساعد", "DO تبني سؤال Present Simple، وlike هو الفعل الرئيسي.", { accept: ["مساعد", "فعل مساعد", "auxiliary"] }),
  item(34, 4, "I DO my homework after school.", ["الوظيفة"], "رئيسي", "DO تعني «أنجز»؛ my homework مفعول به، وليست أداة سؤال.", { accept: ["رئيسي", "فعل رئيسي", "main"] }),
  item(34, 5, "She IS happy.", ["الوظيفة"], "رئيسي", "IS فعل رابط يربط She بالوصف happy، وليست مساعدًا لفعل آخر.", { accept: ["رئيسي", "فعل رئيسي", "main"] }),
  item(34, 6, "She IS studying.", ["الوظيفة"], "مساعد", "IS + studying (V-ing) يبني Present Continuous.", { accept: ["مساعد", "فعل مساعد", "auxiliary"] }),
  item(34, 7, "DID he DO the experiment?", ["الوظيفة"], "DID مساعد، DO رئيسي", "DID تبني سؤال الماضي، وDO هي الفعل الرئيسي بمعنى «يُجري» التجربة.", {
    accept: ["did مساعد do رئيسي", "did مساعد وdo رئيسي", "did: مساعد / do: رئيسي"],
  }),
  item(34, 8, "We HAVE been working for two hours.", ["الوظيفة"], "مساعد", "HAVE يبني التام، وbeen جزء من سلسلة المساعدات، وworking هو الفعل الرئيسي.", {
    accept: ["مساعد", "فعل مساعد", "auxiliary"],
  }),
];

const readingItems: PracticeItem41[] = [
  item(35, 1, "What subject does Maya enjoy?", ["إجابتك"], "Science and technology.", "الدليل من النص: Maya is a student who enjoys science and technology.", {
    accept: ["science and technology", "science and technology.", "science & technology"],
  }),
  item(35, 2, "When does she study English?", ["إجابتك"], "Every morning.", "الدليل: She studies English every morning.", { accept: ["every morning"] }),
  item(35, 3, "What is she preparing this week?", ["إجابتك"], "A presentation about renewable energy.", "الدليل: This week, she is preparing a presentation about renewable energy.", {
    accept: ["a presentation about renewable energy", "presentation about renewable energy"],
  }),
  item(35, 4, "Has she finished the presentation yet?", ["إجابتك"], "No, she hasn't.", "الدليل: she hasn't finished the presentation yet.", {
    accept: ["no she hasn't", "no, she hasn't", "no she has not", "no"],
  }),
  item(35, 5, "What did her teacher ask yesterday?", ["إجابتك"], "Did you find enough information?", "السؤال المنقول حرفيًا في النص: \"Did you find enough information?\"", {
    accept: ["did you find enough information", "did you find enough information?"],
  }),
  item(35, 6, 'Why did Maya say, "I do need some help"?', ["إجابتك"], "To emphasize that she really needs help.", "استخدمت do للتأكيد على أن حاجتها إلى المساعدة حقيقية، لا مجرد سؤال عادي.", {
    accept: [
      "to emphasize that she really needs help",
      "to emphasise that she really needs help",
      "to emphasize she really needs help",
      "لتأكيد أنها تحتاج المساعدة فعلًا",
    ],
  }),
  item(35, 7, "What will Maya have completed by Friday?", ["إجابتك"], "The presentation.", "الدليل: By Friday, Maya will have completed the presentation.", {
    accept: ["the presentation", "presentation"],
  }),
  item(35, 8, "Find one example of BE as an auxiliary verb.", ["إجابتك"], "She is preparing a presentation.", "is + preparing (V-ing) يبني Present Continuous؛ is هنا مساعد.", {
    accept: ["she is preparing a presentation", "she is preparing a presentation about renewable energy", "is preparing"],
  }),
  item(35, 9, "Find one example of HAVE as an auxiliary verb.", ["إجابتك"], "She has already collected several useful articles.", "has + collected (V3) يبني Present Perfect. ومثال آخر صحيح: I have also prepared some diagrams.", {
    accept: [
      "she has already collected several useful articles",
      "i have also prepared some diagrams",
      "she hasn't finished the presentation yet",
      "has collected",
    ],
  }),
  item(35, 10, "Find one example of DO used for emphasis.", ["إجابتك"], "I do need some help.", "do + need (V1) للتأكيد، وليس للسؤال أو النفي — ويختلف عن Do you need any help? التي تبني سؤالًا.", {
    accept: ["i do need some help", "i do need some help with the final section", "do need"],
  }),
];

export const PRACTICE_41: PracticeItem41[] = [
  ...haveItems,
  ...errorItems,
  ...identifyItems,
  ...choiceItems,
  ...questionItems,
  ...negativeItems,
  ...roleItems,
  ...readingItems,
];

export const PRACTICE_COUNTS_41: Record<number, number> = { 23: 6, 29: 10, 30: 8, 31: 8, 32: 8, 33: 8, 34: 8, 35: 10 };

export function itemsFor(section: number, from: number, to: number): PracticeItem41[] {
  return PRACTICE_41.filter((p) => p.section === section && p.number >= from && p.number <= to);
}

export function normalize41(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?؟،;؛:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect41(item: PracticeItem41, response: string): boolean {
  const value = normalize41(response);
  if (!value) return false;
  const pool = [item.answer, ...(item.accept ?? [])].map(normalize41);
  return pool.some((candidate) => candidate === value);
}

/** يقبل إجابتين منفصلتين لبندي §30 معًا. */
export function isPairCorrect41(item: PracticeItem41, first: string, second: string): boolean {
  const combined = normalize41(`${first} ${second}`);
  const pool = [item.answer, ...(item.accept ?? [])].map(normalize41);
  return pool.some((candidate) => candidate === combined);
}
