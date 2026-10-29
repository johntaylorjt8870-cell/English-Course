/** Student-facing prompts only: no correct options, models or explanations. */
export type TestLevel46 = 1 | 2 | 3 | 4 | 5;
export type TestQuestion46 = {
  id: string;
  number: number;
  level: TestLevel46;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};
const en = (values: readonly string[]) => values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));
const ar = (values: readonly string[]) => values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "ar" as const }));

export const TEST_LEVELS_46 = [
  { level: 1, title: "اختر التعبير", en: "01 / MULTIPLE CHOICE", instruction: "اختر التعبير الأنسب للمعنى والسياق." },
  { level: 2, title: "أكمل الجملة", en: "02 / COMPLETE", instruction: "اكتب العبارة الناقصة أو الجملة الإنجليزية كاملة." },
  { level: 3, title: "صحّح الخطأ", en: "03 / DETECTIVE", instruction: "أعد كتابة الجملة كاملة مع الحفاظ على معناها." },
  { level: 4, title: "فسّر المعنى", en: "04 / MEANING", instruction: "اختر التفسير الكامل الذي يحافظ على المعنى، لا الكلمات فقط." },
  { level: 5, title: "تحدّي المتحف", en: "05 / MUSEUM VISIT", instruction: "أكمل كل جزء من الحوار؛ تقبل العبارة الناقصة أو الجملة الكاملة." },
] as const;

export const TEST_QUESTIONS_46: readonly TestQuestion46[] = [
  { id: "q1", number: 1, level: 1, type: "choice", prompt: "You ___ touch this dangerous machine. It is prohibited.", options: en(["mustn't", "don't have to", "needn't"]) },
  { id: "q2", number: 2, level: 1, type: "choice", prompt: "She ___ bring her laptop. The school provides one, so bringing hers is optional.", options: en(["mustn't", "doesn't have to", "must"]) },
  { id: "q3", number: 3, level: 1, type: "choice", prompt: "You ___ worry. Everything is under control.", options: en(["needn't", "mustn't to", "doesn't need"]) },
  { id: "q4", number: 4, level: 1, type: "choice", prompt: "He ___ come early tomorrow; attendance then is optional.", options: en(["doesn't has to", "don't have to", "doesn't have to"]) },
  { id: "q5", number: 5, level: 1, type: "choice", prompt: "We ___ pay for the tickets. They're free, so payment is not required.", options: en(["must", "don't have to", "mustn't"]) },
  { id: "q6", number: 6, level: 2, type: "text", prompt: "You ___ enter this room. Entry is prohibited.", contextAr: "عبّر عن المنع." },
  { id: "q7", number: 7, level: 2, type: "text", prompt: "She ___ bring her laptop today. The school supplies one.", contextAr: "عبّر عن عدم الحاجة أو الإلزام." },
  { id: "q8", number: 8, level: 2, type: "text", prompt: "We ___ work yesterday. It was not compulsory.", contextAr: "تحدث عن عدم الإلزام في الماضي." },
  { id: "q9", number: 9, level: 2, type: "text", prompt: "He ___ attend the meeting tomorrow. Attendance will be optional.", contextAr: "استخدم صيغة المستقبل." },
  { id: "q10", number: 10, level: 2, type: "text", prompt: "I ___ another ticket. I bought one, but it was not necessary.", contextAr: "استخدم صيغة تنقل وقوع الشراء وعدم ضرورته." },
  { id: "q11", number: 11, level: 3, type: "text", prompt: "You mustn't to enter." },
  { id: "q12", number: 12, level: 3, type: "text", prompt: "She doesn't has to come." },
  { id: "q13", number: 13, level: 3, type: "text", prompt: "He needn't to worry." },
  { id: "q14", number: 14, level: 3, type: "text", prompt: "I needn't have went there." },
  { id: "q15", number: 15, level: 3, type: "text", prompt: "We didn't needed to pay." },
  { id: "q16", number: 16, level: 4, type: "choice", prompt: "You mustn't enter. / You don't have to enter.", contextAr: "ما الفرق بين الجملتين؟", options: ar([
    "كلتاهما تمنع الدخول.",
    "الأولى تمنع الدخول، والثانية ترفع الإلزام ولا تحدد وحدها ما إذا كان الدخول مسموحًا.",
    "الأولى ترفع الإلزام، والثانية تمنع الدخول.",
  ]) },
  { id: "q17", number: 17, level: 4, type: "choice", prompt: "You don't need to wait. / You needn't wait.", contextAr: "ما العلاقة بين المعنيين والتركيبين؟", options: ar([
    "الأولى منع، والثانية إلزام.",
    "كلتاهما تعنيان عدم الحاجة، لكن تركيب الفعل العادي يختلف عن الفعل الناقص.",
    "كلتاهما تعنيان أن الانتظار وقع في الماضي.",
  ]) },
  { id: "q18", number: 18, level: 4, type: "choice", prompt: "I needn't have bought a ticket.", contextAr: "ما المعنى الذي يُفهم عادةً؟", options: ar([
    "اشتريت التذكرة، لكن شراءها لم يكن ضروريًا.",
    "لم أشترِ التذكرة وكان شراؤها ممنوعًا.",
    "كان شراء التذكرة ضروريًا، وسأشتريها غدًا.",
  ]) },
  { id: "q19", number: 19, level: 4, type: "choice", prompt: "I didn't need to buy a ticket.", contextAr: "هل تخبرنا الجملة وحدها أن الشراء لم يحدث؟", options: ar([
    "نعم، تؤكد أنني لم أشترِ تذكرة.",
    "لا؛ تخبرنا بعدم الحاجة، ولا تحدد وحدها إن اشتريت تذكرة أم لا.",
    "نعم، تؤكد أنني اشتريت تذكرة بلا حاجة.",
  ]) },
  { id: "q20", number: 20, level: 4, type: "choice", prompt: "I needn't have brought my laptop. / I shouldn't have brought my laptop.", contextAr: "ما الفرق بين التركيبين؟", options: ar([
    "الأولى تتحدث عن عدم الضرورة؛ والثانية تحكم بأن الفعل لم يكن مناسبًا أو كان الأفضل تجنبه.",
    "الأولى تحكم على القرار بأنه غير مناسب؛ والثانية تقول فقط إن الفعل لم يكن ضروريًا.",
    "كلتاهما تثبتان أن إحضار الحاسوب لم يحدث.",
  ]) },
  { id: "q21", number: 21, level: 5, type: "text", prompt: "Teacher: Students, you ___ touch the exhibits. It is prohibited." },
  { id: "q22", number: 22, level: 5, type: "text", prompt: "Maya: Do we have to bring notebooks? Teacher: No, you ___. The museum provides worksheets." },
  { id: "q23", number: 23, level: 5, type: "text", prompt: "Omar: I bought a notebook, but it wasn't necessary. Teacher: You ___ bought it.", contextAr: "أكمل بصيغة تنقل وقوع الفعل." },
  { id: "q24", number: 24, level: 5, type: "text", prompt: "Daniel: Will we have to pay tomorrow? Teacher: No, you ___ pay tomorrow. Entry is free." },
  { id: "q25", number: 25, level: 5, type: "text", prompt: "Maya: We ___ hurry to buy tickets today. There is plenty of time." },
] as const;

export const TEST_QUESTION_COUNT_46 = TEST_QUESTIONS_46.length;
export function answeredCount46(answers: Record<string, string>): number {
  return TEST_QUESTIONS_46.filter((q) => Boolean(answers[q.id]?.trim())).length;
}
export function testComplete46(answers: Record<string, string>): boolean {
  return answeredCount46(answers) === TEST_QUESTION_COUNT_46;
}
