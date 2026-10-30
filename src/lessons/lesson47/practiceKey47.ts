import { normalizeEnglish47 } from "./normalize47";

type PracticeKey47 = { model: string; why: string; choices?: readonly string[]; patterns?: readonly RegExp[] };
const item = (model: string, why: string, patterns: RegExp[]): PracticeKey47 => ({ model, why, patterns });
const choice = (model: string, why: string, ...choices: string[]): PracticeKey47 => ({ model, why, choices });

const wouldLike = "i(?:'d| would) like";
const wouldRather = "i(?:'d| would) rather";
const sheWouldLike = "she(?:'d| would) like";
const sheWouldRather = "she(?:'d| would) rather";
const heWouldLike = "he(?:'d| would) like";
const heWouldRatherNot = "he(?:'d| would) rather not";

export const PRACTICE_KEYS_47: Readonly<Record<string, PracticeKey47>> = {
  c1: choice("I would", "بعد I'd يأتي فعل مجرد LIKE، فالأصل WOULD.", "I would"),
  c2: choice("I had", "بعد I'd جاء التصريف الثالث finished، فالأصل HAD.", "I had"),
  c3: choice("I would", "بعد she'd جاء rather والفعل المجرد، فالأصل WOULD.", "I would"),
  c4: choice("would not", "wouldn't اختصار would not، وليست had not أو did not.", "would not"),

  lr1: choice("تفضيل بين خيارين", "المتحدث يقارن القهوة بالشاي، فهذا تفضيل لا رغبة مجردة.", "تفضيل بين خيارين"),
  lr2: choice("I'd rather visit London.", "would rather تعبّر عن التفضيل، وwould like عن الرغبة.", "I'd rather visit London."),
  lr3: choice("would like", "الرغبة في مهنة تُعبَّر عنها بـ would like + to + V1؛ ولا يتبع rather حرف TO.", "would like"),
  lr4: choice("would rather", "وجود than بعد الفعل يؤكد المقارنة بين خيارين، وهي وظيفة would rather.", "would rather"),

  "lab-restaurant": choice("لا أمانع؛ سأحضرها", "السؤال عن الممانعة، وNot at all تعني عدم الممانعة أي الموافقة.", "لا أمانع؛ سأحضرها"),
  "lab-weekend": choice("لأنه ينهي واجبه صباحًا", "عمر يفضّل بعد الظهر لأنه ينهي واجبه في الصباح.", "لأنه ينهي واجبه صباحًا"),
  "lab-classroom": choice("Would you like Omar to help you?", "هذه الجملة تستخدم would like + person + to + V1، أي رغبة في أن يساعد عمر مايا.", "Would you like Omar to help you?"),

  ma1: choice("No, not at all.", "No هنا تعني «لا أمانع»، أي الموافقة على فتح النافذة.", "No, not at all."),
  ma2: choice("Yes, please.", "Would you like عرض، وYes, please قبول مهذب له.", "Yes, please."),
  ma3: choice("Certainly.", "Certainly تعني «بالتأكيد»، وهي موافقة مهذبة على طلب الممانعة.", "Certainly."),

  mm1: choice("Should", "طلب النصيحة يستخدم Should I...?؛ Would وCould لا تطلبان نصيحة هنا.", "Should"),
  mm2: choice("Would", "العرض المهذب يستخدم Would you like...?", "Would"),
  mm3: choice("Would", "الصيغة القياسية هي Would you mind + V-ing؛ لا نقول Could you mind.", "Would"),
  mm4: choice("Would", "سؤال التفضيل يبدأ بـ Would you rather...?", "Would"),

  d1: item("I'd like some tea.", "لا نضع TO بين WOULD وLIKE؛ ويمكن كتابة I would like some tea.", [new RegExp(`^${wouldLike} some tea$`)]),
  d2: item("She'd like a new book.", "WOULD لا يأخذ s، والفعل بعده LIKE مجرد.", [new RegExp(`^${sheWouldLike} a new book$`)]),
  d3: item("I'd like to study English.", "الرغبة في فعل تحتاج to + V1 بعد LIKE.", [new RegExp(`^${wouldLike} to study english$`)]),
  d4: item("Would you like to join us?", "بعد WOULD YOU LIKE + فعل نحتاج to؛ ولا نستخدم DO في السؤال.", [/^would you like to join us$/]),
  d5: item("I'd rather stay home.", "WOULD RATHER + V1 دون TO.", [new RegExp(`^${wouldRather} stay home$`)]),
  d6: item("She'd rather read than watch television.", "الفعلان بعد RATHER وTHAN مجردان دون ing.", [new RegExp(`^${sheWouldRather} read than watch television$`)]),
  d7: item("Would you rather walk or drive?", "بعد RATHER في السؤال يأتي الفعل المجرد دون TO.", [/^would you rather walk or drive$/]),
  d8: item("I'd rather you stayed here.", "اختلاف الفاعلين يقتضي الماضي البسيط stayed رغم أن التفضيل عن الحاضر.", [new RegExp(`^${wouldRather} you stayed here$`)]),
  d9: item("Would you mind opening the window?", "بعد MIND نستخدم V-ing لا to.", [/^would you mind opening the window$/]),
  d10: item("Would he like some coffee?", "السؤال يبدأ بـ WOULD ثم الفاعل، دون Does.", [/^would he like some coffee$/]),
  d11: item("I'd rather not go out tonight.", "نفي التفضيل بـ would rather not + V1، ولا نجمع I'd مع wouldn't.", [new RegExp(`^${wouldRather} not go out tonight$`)]),
  d12: item("I'd like you to help me.", "بعد الشخص في would like + person نحتاج to قبل الفعل.", [new RegExp(`^${wouldLike} you to help me$`)]),

  "p31-1": item("to drink", "بعد WOULD LIKE + فعل نحتاج to + V1.", [new RegExp(`^to drink(?: some water)?$`), new RegExp(`^${wouldLike} to drink some water$`)]),
  "p31-2": item("to visit", "بعد WOULD LIKE + فعل نحتاج to + V1.", [new RegExp(`^to visit(?: london)?$`), new RegExp(`^${sheWouldLike} to visit london$`)]),
  "p31-3": item("to join", "بعد WOULD LIKE + فعل نحتاج to + V1.", [/^to join(?: the competition)?$/, /^we would like to join the competition$/]),
  "p31-4": item("to become", "بعد WOULD LIKE + فعل نحتاج to + V1.", [new RegExp(`^to become(?: a doctor)?$`), new RegExp(`^${heWouldLike} to become a doctor$`)]),
  "p31-5": item("to learn", "بعد WOULD LIKE + فعل نحتاج to + V1.", [/^to learn(?: english)?$/, /^they(?:'d| would) like to learn english$/]),

  "p32-1": item("stay", "WOULD RATHER + V1 دون TO.", [/^stay(?: home)?$/, new RegExp(`^${wouldRather} stay home$`)]),
  "p32-2": item("read", "WOULD RATHER + V1 دون TO.", [/^read(?: a book)?$/, new RegExp(`^${sheWouldRather} read a book$`)]),
  "p32-3": item("walk", "الفعل بعد RATHER مجرد، وكذلك بعد THAN.", [/^walk(?: than drive)?$/, /^we(?:'d| would) rather walk than drive$/]),
  "p32-4": item("go", "النفي would rather not + V1، والفعل مجرد.", [/^go(?: out tonight)?$/, new RegExp(`^${heWouldRatherNot} go out tonight$`)]),
  "p32-5": item("study", "WOULD RATHER + V1 دون TO.", [/^study(?: together)?$/, /^they(?:'d| would) rather study together$/]),

  "p33-1": item("Would you like some tea?", "نقدّم WOULD على الفاعل، ولا نستخدم Do.", [/^would you like some tea$/]),
  "p33-2": item("Would she like to join us?", "نقدّم WOULD على الفاعل مع الحفاظ على to + V1.", [/^would she like to join us$/]),
  "p33-3": item("Would they rather stay home?", "سؤال التفضيل: Would + subject + rather + V1.", [/^would they rather stay home$/]),
  "p33-4": item("Would you rather travel by train?", "نقدّم WOULD على الفاعل ونبقي rather + V1.", [/^would you rather travel by train$/]),
  "p33-5": item("Would he like a new notebook?", "نقدّم WOULD على الفاعل مع الاسم بعد like.", [/^would he like a new notebook$/]),

  "p34-1": item("opening", "بعد MIND نستخدم V-ing.", [/^opening(?: the window)?$/, /^would you mind opening the window$/]),
  "p34-2": item("helping", "بعد MIND نستخدم V-ing.", [/^helping(?: me)?$/, /^would you mind helping me$/]),
  "p34-3": item("waiting", "بعد MIND نستخدم V-ing.", [/^waiting(?: a moment)?$/, /^would you mind waiting a moment$/]),
  "p34-4": item("closing", "بعد MIND نستخدم V-ing.", [/^closing(?: the door)?$/, /^would you mind closing the door$/]),
  "p34-5": item("explaining", "بعد MIND نستخدم V-ing.", [/^explaining(?: the question again)?$/, /^would you mind explaining the question again$/]),

  "p35-1": choice("رغبة", "would like + noun تعبّر عن رغبة.", "رغبة"),
  "p35-2": choice("تفضيل", "would rather تعبّر عن تفضيل بين خيارين.", "تفضيل"),
  "p35-3": choice("طلب مهذب", "would you mind + V-ing طلب مهذب.", "طلب مهذب"),
  "p35-4": choice("عرض أو دعوة", "would you like + to + V1 هنا دعوة.", "عرض أو دعوة"),
  "p35-5": choice("رغبة", "would like + to + V1 رغبة في فعل.", "رغبة"),
  "p35-6": choice("تفضيل", "would you rather سؤال عن التفضيل.", "تفضيل"),
};

export function gradePractice47(id: string, value: string): boolean {
  const key = PRACTICE_KEYS_47[id];
  if (!key || !value.trim()) return false;
  if (key.choices) return key.choices.includes(value.trim());
  const text = normalizeEnglish47(value);
  return Boolean(key.patterns?.some((pattern) => pattern.test(text)));
}
