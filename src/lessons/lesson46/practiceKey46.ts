import { normalizeEnglish46 } from "./normalize46";

type PracticeKey46 = { model: string; why: string; choices?: readonly string[]; patterns?: readonly RegExp[] };
const item = (model: string, why: string, patterns: RegExp[]): PracticeKey46 => ({ model, why, patterns });
const choice = (model: string, why: string, ...choices: string[]): PracticeKey46 => ({ model, why, choices });
const noNeedYou = "(?:do not have to|do not need to|need not)";
const noNeedShe = "(?:does not have to|does not need to|need not)";
const noNeedHe = "(?:does not have to|does not need to|need not)";

export const PRACTICE_KEYS_46: Readonly<Record<string, PracticeKey46>> = {
  "lab-door": choice("mustn't", "السلك خطر ولمسه ممنوع، لا مجرد أمر اختياري.", "mustn't"),
  "lab-trip": choice("منع", "استخدام الهواتف أثناء الجولة محظور.", "منع"),
  "lab-library": choice("عدم الإلزام أو الحاجة", "يمكن الاحتفاظ بالكتب حتى الجمعة؛ إعادتها اليوم ليست إلزامية.", "عدم الإلزام أو الحاجة"),
  "lab-airport": choice("فعل ماضٍ وقع دون حاجة", "دانيال طبع البطاقات فعلًا، لكن النسخ الرقمية كانت كافية.", "فعل ماضٍ وقع دون حاجة"),
  "lab-museum": choice("فعل ماضٍ وقع دون حاجة", "أحضر عمر الآلة فعلًا، ولم يكن ذلك ضروريًا.", "فعل ماضٍ وقع دون حاجة"),
  "lab-laboratory": choice("don't have to / needn't", "يوفر المختبر الأجهزة؛ الإحضار غير ضروري وليس محظورًا.", "don't have to", "needn't"),
  d1: item("You mustn't enter this room.", "بعد mustn't يأتي الفعل المجرد دون to.", [/^you must not enter this room$/]),
  d2: item("She doesn't have to come today.", "بعد doesn't نستخدم have. وتُقبل صيغ عدم الحاجة المناسبة للسياق.", [new RegExp(`^she ${noNeedShe} come today$`)]),
  d3: item("He needn't worry.", "بعد needn't يأتي المصدر دون to؛ وصيغ عدم الحاجة الأخرى صحيحة أيضًا.", [new RegExp(`^he ${noNeedHe} worry$`)]),
  d4: item("We didn't need to pay.", "بعد didn't يعود need إلى صورته الأساسية.", [/^we did not (?:need|have) to pay$/]),
  d5: item("She needn't have bought another ticket.", "بعد have نستخدم V3: bought.", [/^she need not have bought another ticket$/]),
  d6: item("You mustn't touch this machine.", "المطلوب منع اللمس، لا مجرد عدم الإلزام.", [/^you must not touch this machine$/, /^you (?:are not allowed|are forbidden) to touch this machine$/]),
  d7: item("He won't have to work tomorrow.", "بعد will نستخدم have، كما تصلح صيغة عدم الحاجة في هذا السياق.", [/^he will not (?:have|need) to work tomorrow$/]),
  d8: item("She doesn't need to come early.", "need فعل عادي هنا، ويتبعه to؛ وneedn't بديل صحيح.", [new RegExp(`^she ${noNeedShe} come early$`)]),
  d9: item("I needn't have gone there.", "التصريف الثالث من go هو gone، والفعل وقع عادةً.", [/^i need not have gone there$/]),
  d10: item("You don't have to / needn't bring your laptop tomorrow.", "عدم الحاجة ليس منعًا؛ غيّر المعنى لا الشكل فقط.", [new RegExp(`^you ${noNeedYou} bring your laptop tomorrow$`), /^there is no need (?:for you )?to bring your laptop tomorrow$/, /^it is not necessary for you to bring your laptop tomorrow$/]),
  "p32-1": choice("mustn't", "لمس السلك محظور.", "mustn't"),
  "p32-2": choice("don't have to / needn't", "المدرسة توفر جهازًا؛ كلا التعبيرين مناسبان لعدم الضرورة.", "don't have to", "needn't"),
  "p32-3": choice("mustn't", "الغش مخالف للقواعد وممنوع.", "mustn't"),
  "p32-4": choice("don't have to / needn't", "وفرة الوقت ترفع الحاجة إلى الاستعجال.", "don't have to", "needn't"),
  "p32-5": choice("don't have to / needn't", "التذاكر مجانية، فلا حاجة للدفع.", "don't have to", "needn't"),
  "p33-1": choice("needn't have", "الشراء حدث فعلًا، ولم يكن ضروريًا.", "needn't have"),
  "p33-2": choice("didn't need to", "غياب الحاجة لا يحدد وحده هل حدثت الدراسة.", "didn't need to"),
  "p33-3": choice("needn't have", "الطهي حدث فعلًا دون حاجة إلى هذه الكمية.", "needn't have"),
  "p33-4": choice("needn't have", "الوصول المبكر حدث فعلًا.", "needn't have"),
  "p33-5": choice("didn't need to", "إلغاء الواجب لا يثبت إتمامه.", "didn't need to"),
  "p34-1": item("didn't have to", "عدم إلزام في الماضي: didn't have to + V1.", [/^(?:did not have to(?: work(?: yesterday)?)?|i did not have to work(?: yesterday)?|yesterday i did not have to work)$/]),
  "p34-2": item("didn't need to / didn't have to", "عدم الحاجة في الماضي، والفعل بعدها مجرد.", [/^(?:did not (?:need|have) to(?: bring her laptop(?: last week)?)?|she did not (?:need|have) to bring her laptop(?: last week)?)$/]),
  "p34-3": item("won't have to / won't need to", "المستقبل يستخدم will not مع have أو need.", [/^(?:will not (?:have|need) to(?: come early(?: tomorrow)?)?|we will not (?:have|need) to come early(?: tomorrow)?|tomorrow we will not (?:have|need) to come early)$/]),
  "p34-4": item("won't need to / won't have to", "عدم الحاجة أو الإلزام في المستقبل.", [/^(?:will not (?:need|have) to(?: buy another ticket(?: next month)?)?|he will not (?:need|have) to buy another ticket(?: next month)?)$/]),
  "p34-5": item("needn't have bought", "الشراء وقع فعلًا؛ نحتاج have + V3.", [/^(?:need not have bought(?: that expensive bag)?|i need not have bought that expensive bag)$/, /^i bought that expensive bag (?:but|although) (?:i did not need to|it was not necessary)$/]),
  "p35-1": choice("منع", "mustn't تعبّر عن المنع.", "منع"),
  "p35-2": choice("عدم الضرورة", "don't have to ترفع الإلزام.", "عدم الضرورة"),
  "p35-3": choice("فعل ماضٍ وقع دون حاجة", "needn't have bought تفيد عادة وقوع الشراء.", "فعل ماضٍ وقع دون حاجة"),
  "p35-4": choice("عدم الضرورة", "needn't تعبّر عن عدم الحاجة.", "عدم الضرورة"),
  "p35-5": choice("منع", "الغش ممنوع.", "منع"),
  "p35-6": choice("فعل ماضٍ وقع دون حاجة", "الانتظار حدث فعلًا، ولم يكن ضروريًا.", "فعل ماضٍ وقع دون حاجة"),
  "p36-1": item("You don't have to / needn't come tomorrow.", "المطلوب عدم الضرورة لا المنع.", [new RegExp(`^you ${noNeedYou} come tomorrow$`), /^there is no need (?:for you )?to come tomorrow$/, /^it is not necessary for you to come tomorrow$/]),
  "p36-2": item("She mustn't cheat.", "المطلوب منع الغش؛ لا يكفي القول إنه غير إلزامي.", [/^she must not cheat$/, /^she (?:is not allowed|is forbidden) to cheat$/]),
  "p36-3": item("I needn't have bought a ticket.", "يجب نقل المعلومتين معًا: الشراء وقع، ولم يكن ضروريًا.", [/^i need not have bought (?:a|the) ticket$/, /^i bought (?:a|the) ticket (?:but|although) (?:i did not need to|i did not need one|it was not necessary)$/, /^i bought (?:a|the) ticket unnecessarily$/, /^buying (?:a|the) ticket was not necessary but i bought (?:one|it)$/]),
  "p36-4": item("He needn't wait.", "تُقبل أيضًا doesn't need to أو doesn't have to.", [new RegExp(`^he ${noNeedHe} wait$`), /^there is no need for him to wait$/]),
  "p36-5": item("She won't have to work tomorrow.", "بعد won't تأتي have في الصورة الأساسية؛ وwon't need to بديل مناسب.", [/^she will not (?:have|need) to work tomorrow$/]),
};

export function gradePractice46(id: string, value: string): boolean {
  const key = PRACTICE_KEYS_46[id];
  if (!key || !value.trim()) return false;
  if (key.choices) return key.choices.includes(value.trim());
  const text = normalizeEnglish46(value);
  return Boolean(key.patterns?.some((pattern) => pattern.test(text)));
}
