/** Student-facing prompts only: no correct options, models or explanations. */
export type TestLevel47 = 1 | 2 | 3 | 4 | 5;
export type TestQuestion47 = {
  id: string;
  number: number;
  level: TestLevel47;
  type: "choice" | "text";
  prompt: string;
  contextAr?: string;
  options?: readonly { id: string; text: string; lang: "en" | "ar" }[];
};
const en = (values: readonly string[]) => values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "en" as const }));
const ar = (values: readonly string[]) => values.map((text, i) => ({ id: String.fromCharCode(97 + i), text, lang: "ar" as const }));

export const TEST_LEVELS_47 = [
  { level: 1, title: "اختر الصيغة", en: "MULTIPLE CHOICE", instruction: "اختر التعبير الصحيح نحويًا في الجملة." },
  { level: 2, title: "أكمل الجملة", en: "COMPLETE", instruction: "اكتب الكلمة أو العبارة الناقصة، أو الجملة كاملة." },
  { level: 3, title: "صحّح الخطأ", en: "DETECTIVE", instruction: "أعد كتابة الجملة كاملة مع الحفاظ على معناها." },
  { level: 4, title: "افهم المعنى", en: "MEANING", instruction: "اختر التفسير الكامل الذي يحافظ على المعنى، لا الكلمات وحدها." },
  { level: 5, title: "تحدّي عطلة نهاية الأسبوع", en: "FINAL CHALLENGE", instruction: "أكمل كل جزء من الحوار؛ تقبل الكلمة الناقصة أو الجملة كاملة." },
] as const;

export const TEST_QUESTIONS_47: readonly TestQuestion47[] = [
  { id: "q1", number: 1, level: 1, type: "choice", prompt: "I'd like ______ some tea.", options: en(["have", "to have", "having"]) },
  { id: "q2", number: 2, level: 1, type: "choice", prompt: "She'd rather ______ home.", options: en(["stay", "to stay", "staying"]) },
  { id: "q3", number: 3, level: 1, type: "choice", prompt: "Would you mind ______ the window?", options: en(["open", "to open", "opening"]) },
  { id: "q4", number: 4, level: 1, type: "choice", prompt: "Would you like ______ us?", options: en(["join", "to join", "joining"]) },
  { id: "q5", number: 5, level: 1, type: "choice", prompt: "He ______ like a new notebook.", options: en(["would", "woulds", "does would"]) },

  { id: "q6", number: 6, level: 2, type: "text", prompt: "I'd rather ______ (walk) than take the bus.", contextAr: "اكتب الفعل المناسب." },
  { id: "q7", number: 7, level: 2, type: "text", prompt: "She'd like ______ (learn) French.", contextAr: "اكتب التعبير الناقص." },
  { id: "q8", number: 8, level: 2, type: "text", prompt: "Would you mind ______ (wait) a moment?", contextAr: "اكتب الفعل بصيغته الصحيحة." },
  { id: "q9", number: 9, level: 2, type: "text", prompt: "We'd rather not ______ (go) out tonight.", contextAr: "أكمل بالفعل المناسب." },
  { id: "q10", number: 10, level: 2, type: "text", prompt: "I'd rather you ______ (stay) here.", contextAr: "استخدم صيغة التفضيل الخاصة بفاعلين مختلفين." },

  { id: "q11", number: 11, level: 3, type: "text", prompt: "I would to like some water." },
  { id: "q12", number: 12, level: 3, type: "text", prompt: "She would likes a new book." },
  { id: "q13", number: 13, level: 3, type: "text", prompt: "I'd rather to stay home." },
  { id: "q14", number: 14, level: 3, type: "text", prompt: "Would you mind to help me?" },
  { id: "q15", number: 15, level: 3, type: "text", prompt: "I'd like you help me." },

  { id: "q16", number: 16, level: 4, type: "choice", prompt: "I want some tea. / I'd like some tea.", contextAr: "ما الفرق بين الجملتين؟", options: ar([
    "كلتاهما تعبّران عن الرغبة، لكن WOULD LIKE غالبًا ألطف وأكثر تهذيبًا في الطلبات.",
    "WANT خاطئة دائمًا، ولا تُستخدم إلا مع الغرباء.",
    "WOULD LIKE تعبّر عن التفضيل بين خيارين، وWANT تعبّر عن الرغبة.",
  ]) },
  { id: "q17", number: 17, level: 4, type: "choice", prompt: "I'd like to stay home. / I'd rather stay home.", contextAr: "ما الفرق بين الجملتين؟", options: ar([
    "WOULD LIKE تعبّر عن الرغبة، وWOULD RATHER تعبّر عن التفضيل، وغالبًا يوجد خيار آخر صريح أو مفهوم.",
    "كلتاهما تعبّران عن الإلزام.",
    "WOULD RATHER تعبّر عن الرغبة فقط، وWOULD LIKE تعبّر عن التفضيل.",
  ]) },
  { id: "q18", number: 18, level: 4, type: "choice", prompt: "I'd rather walk. / I'd rather to walk.", contextAr: "لماذا الجملة الأولى صحيحة والثانية خاطئة؟", options: ar([
    "لأن القاعدة هي WOULD RATHER + V1 دون TO.",
    "لأن RATHER اسم، والأسماء لا تتبعها أفعال.",
    "لأن TO تُستخدم فقط مع الزمن الماضي.",
  ]) },
  { id: "q19", number: 19, level: 4, type: "choice", prompt: "I'd rather you stayed here.", contextAr: "ما معنى الجملة، وهل تعبّر بالضرورة عن حدث وقع في الماضي؟", options: ar([
    "معناها: أفضّل أن تبقى هنا؛ وصيغة الماضي هنا لا تعني بالضرورة أن الحدث وقع في الماضي.",
    "معناها: بقيتَ هنا في الماضي، وهي خبر عن حدث منتهٍ.",
    "معناها: سأبقى أنا هنا، ولا علاقة لها بالمخاطب.",
  ]) },
  { id: "q20", number: 20, level: 4, type: "choice", prompt: "Would you mind opening the window? — No, not at all.", contextAr: "كيف تكون إجابة NO هنا موافقة على الطلب؟", options: ar([
    "لأن السؤال عن الممانعة، وNO تعني: لا أمانع إطلاقًا، أي أوافق على فتح النافذة.",
    "لأن NO تعني رفض الطلب دائمًا.",
    "لأن NO تعني أن السؤال غير مفهوم، ويجب إعادته.",
  ]) },

  { id: "q21", number: 21, level: 5, type: "text", prompt: "Maya: ______ you like to visit the museum tomorrow?", contextAr: "صيغة دعوة باستخدام WOULD YOU LIKE." },
  { id: "q22", number: 22, level: 5, type: "text", prompt: "Omar: Yes, I'd love to! But I'd rather ______ (go) in the morning.", contextAr: "تفضيل باستخدام WOULD RATHER + V1." },
  { id: "q23", number: 23, level: 5, type: "text", prompt: "Maya: That's fine. Would you like me ______ (book) the tickets?", contextAr: "الرغبة في أن يقوم شخص آخر بفعل." },
  { id: "q24", number: 24, level: 5, type: "text", prompt: "Omar: Yes, please. Would you mind ______ (check) the opening hours too?", contextAr: "طلب مهذب باستخدام WOULD YOU MIND + V-ing." },
  { id: "q25", number: 25, level: 5, type: "text", prompt: "Maya: Not at all. Actually, I'd rather Daniel ______ (join) us as well.", contextAr: "تفضيل متعلق بفاعل آخر باستخدام WOULD RATHER + SUBJECT + PAST SIMPLE." },
] as const;

export const TEST_QUESTION_COUNT_47 = TEST_QUESTIONS_47.length;

export function answeredCount47(answers: Record<string, string>): number {
  return TEST_QUESTIONS_47.filter((q) => Boolean(answers[q.id]?.trim())).length;
}
export function testComplete47(answers: Record<string, string>): boolean {
  return answeredCount47(answers) === TEST_QUESTION_COUNT_47;
}
