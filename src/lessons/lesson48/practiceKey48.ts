import { normalizeEnglish48 } from "./normalize48";

export type PracticeKey48 = {
  model: string;
  why: string;
  choices?: readonly string[];
  patterns?: readonly RegExp[];
};

const item = (model: string, why: string, ...patterns: RegExp[]): PracticeKey48 => ({ model, why, patterns });
const choice = (model: string, why: string, ...choices: string[]): PracticeKey48 => ({ model, why, choices });

const negated = "(?:do not|don't)";
const noNeed = "(?:need not|needn't|do not need to|don't need to)";

export const PRACTICE_KEYS_48: Readonly<Record<string, PracticeKey48>> = {
  /* ---------- القاعدة المشتركة ---------- */
  r1: choice("can", "CAN لا تأخذ s مع He؛ القاعدة: Subject + Modal + V1.", "can"),
  r2: choice("finish", "لا نضع TO بعد MUST، والفعل يبقى مجردًا.", "finish"),
  r3: choice("Can", "لا نستخدم DO/DOES مع الأفعال الناقصة؛ نقدّم CAN على الفاعل.", "Can"),
  r4: item("He must study harder.", "MUST + V1 دون TO.", /^he must study harder$/),
  r5: item("She ought to respect her teacher.", "OUGHT تتبعها TO دائمًا.", /^she ought to respect her teacher$/),

  /* ---------- القدرة والاستئذان ---------- */
  a1: choice("could", "القدرة العامة في الماضي تُعبَّر عنها بـ COULD.", "could"),
  a2: choice("was able to", "النجاح في فعل محدد في الماضي: WAS/WERE ABLE TO أدق من COULD في هذا السياق.", "was able to"),
  a3: choice("May", "MAY أكثر رسمية في الاستئذان، وهي مناسبة هنا مع please.", "May"),
  a4: item("Can she drive?", "نقدّم CAN على الفاعل، ولا نستعين بـ DOES.", /^can she drive$/),

  /* ---------- الاحتمال ---------- */
  p1: choice("might", "الجملة تعبّر عن احتمال غير مؤكد، و MIGHT مناسبة تمامًا.", "might"),
  p2: choice("may not", "السياق يوضح المنع (forbidden)، و MAY NOT هنا تعني عدم السماح.", "may not"),
  p3: choice("May", "الاستئذان الرسمي المهذب يبدأ بـ MAY I…?", "May"),
  p4: item("It might rain tomorrow.", "بعد MIGHT نستخدم V1 دون s.", /^it might rain tomorrow$/),

  /* ---------- الضرورة والإلزام ---------- */
  n1: choice("has to", "HAVE TO تتحول إلى HAS TO مع She.", "has to"),
  n2: choice("had to", "الماضي من HAVE TO هو HAD TO.", "had to"),
  n3: choice("Do", "HAVE TO ليس فعلًا ناقصًا خالصًا؛ سؤاله يبدأ بـ DO.", "Do"),
  n4: item("He has to study every day.", "HAS يحمل الـ s، والفعل بعدها مجرد.", /^he has to study every day$/),

  /* ---------- المنع وعدم الضرورة ---------- */
  pr1: choice("mustn't", "السياق يوضح أن الاستخدام ممنوع؛ و MUSTN'T هي المنع.", "mustn't"),
  pr2: choice("don't have to", "إحضار الطعام غير ضروري وليس ممنوعًا؛ لذلك DON'T HAVE TO.", "don't have to"),
  pr3: choice("needn't", "NEEDN'T تعني لا حاجة إلى الاستعجال، وهي أدق من MUSTN'T هنا.", "needn't"),
  pr4: item(
    "You don't have to come early.",
    "المقصود عدم الضرورة لا المنع؛ و NEEDN'T بديل صحيح.",
    /^(?:need not|needn't)$/,
    new RegExp(`^(?:${negated} have to|do not have to)$`),
    new RegExp(`^you ${negated} have to come early$`),
    /^you (?:need not|needn't) come early$/,
  ),

  /* ---------- النصيحة ---------- */
  ad1: choice("should", "SHOULD + V1؛ ولا نضيف TO ولا s.", "should"),
  ad2: choice("ought to", "OUGHT TO + V1، وهي النبرة الأخلاقية للواجب.", "ought to"),
  ad3: choice("should", "الجملة تقول صراحة إنها اقتراح لا إلزام؛ لذلك SHOULD لا MUST.", "should"),
  ad4: item("You should study harder.", "لا نضع TO بعد SHOULD.", /^you should study harder$/),

  /* ---------- الرغبة والتفضيل ---------- */
  de1: choice("stay", "WOULD RATHER + V1 دون TO ودون ing.", "stay"),
  de2: choice("closing", "بعد MIND نستخدم V-ing.", "closing"),
  de3: choice("like", "WOULD LIKE + noun للتعبير عن الرغبة.", "like"),
  de4: item(
    "I'd rather you stayed here.",
    "اختلاف الفاعلين يقتضي WOULD RATHER + SUBJECT + PAST SIMPLE.",
    /^(?:i'd|i would) rather you stayed here$/,
  ),

  /* ---------- المستقبل ---------- */
  f1: choice("will", "القرار السريع في لحظة الكلام يُعبَّر عنه بـ WILL.", "will"),
  f2: choice("would", "الجملة افتراضية (if I had time)، و WOULD هو المناسب.", "would"),
  f3: choice("will", "الوعد يُعبَّر عنه بـ WILL.", "will"),
  f4: item("He will help you.", "WILL فعل ناقص ثابت، لا يأخذ s مع He.", /^he will help you$/),

  /* ---------- محقق القواعد ---------- */
  d1: item("She can speak French.", "لا نضيف s إلى الفعل الناقص مع She.", /^she can speak french$/),
  d2: item("He must finish his homework.", "لا نضع TO بعد MUST.", /^he must finish his homework$/),
  d3: item("Can she swim?", "لا نستخدم DOES مع CAN؛ نقدّم CAN على الفاعل.", /^can she swim$/),
  d4: item(
    "You don't have to come early.",
    "المقصود عدم الضرورة، لا المنع.",
    new RegExp(`^you ${negated} have to come early$`),
    /^you (?:need not|needn't) come early$/,
  ),
  d5: item("He doesn't have to work today.", "HAVE TO يأخذ DOESN'T مع He.", /^he (?:does not|doesn't) have to work today$/),
  d6: item("It might rain tomorrow.", "بعد MIGHT نستخدم V1.", /^it might rain tomorrow$/),
  d7: item("You should study harder.", "لا نضع TO بعد SHOULD.", /^you should study harder$/),
  d8: item("I'd rather stay home.", "WOULD RATHER + V1.", /^(?:i'd|i would) rather stay home$/),
  d9: item("Would you mind helping me?", "بعد MIND نستخدم V-ing.", /^would you mind helping me$/),
  d10: item("She ought to respect her parents.", "OUGHT تتبعها TO.", /^she ought to respect her parents$/),
  d11: item("He has to study every day.", "بعد HAS TO نستخدم الفعل الأساسي دون s.", /^he has to study every day$/),
  d12: item("May I come in?", "لا نستخدم TO بعد MAY.", /^may i come in$/),

  /* ---------- مختبرات الحوارات ---------- */
  "lab-school": choice(
    "إنهاء كل شيء اليوم غير ممنوع، لكنه ليس ضروريًا.",
    "DON'T HAVE TO تعني عدم الضرورة لا المنع.",
    "إنهاء كل شيء اليوم غير ممنوع، لكنه ليس ضروريًا.",
  ),
  "lab-trip": choice("احتمال أن تكون الغرف ممتلئة.", "MAY هنا للاحتمال، لا للمنع ولا للاستئذان.", "احتمال أن تكون الغرف ممتلئة."),
  "lab-home": choice("منع صريح.", "MUSTN'T تعني المنع، وليست نصيحة اختيارية.", "منع صريح."),

  /* ---------- What Would You Say? ---------- */
  s1: item(
    "can",
    "القدرة في الحاضر تُعبَّر عنها بـ CAN + V1؛ و«I can swim» إجابة كاملة صحيحة.",
    /^can$/,
    /^i can swim$/,
  ),
  s2: item(
    "may / might / could",
    "كلها تعبّر عن الاحتمال، والاختيار بينها يعتمد على درجة التحفظ والسياق.",
    /^(?:may|might|could)$/,
    /^he (?:may|might|could) arrive late$/,
  ),
  s3: item(
    "mustn't",
    "المنع في القواعد المدرسية يُعبَّر عنه بـ MUSTN'T لا DON'T HAVE TO.",
    /^(?:must not|mustn't)$/,
    /^students (?:must not|mustn't) use phones during the exam$/,
  ),
  s4: item(
    "don't have to / needn't",
    "عدم الضرورة: DON'T HAVE TO أو NEEDN'T، ولا تُستخدم MUSTN'T لأن الفعل غير ممنوع.",
    new RegExp(`^(?:${negated} have to|need not|needn't)$`),
    new RegExp(`^you (?:${negated} have to|need not|needn't) come tomorrow$`),
  ),
  s5: item(
    "should / ought to",
    "النصيحة تُعبَّر عنها بـ SHOULD أو OUGHT TO، وليست إلزامًا.",
    /^(?:should|ought to)$/,
    /^you (?:should|ought to) sleep early$/,
  ),
  s6: item(
    "May",
    "الاستئذان المهذب يبدأ بـ MAY I…? وهي الأكثر رسمية؛ وتُقبل COULD وCAN في الكلام اليومي.",
    /^(?:may|could|can)$/,
    /^(?:may|could|can) i come in$/,
  ),
  s7: item(
    "Could / Would",
    "الطلب المهذب يبدأ بـ COULD YOU أو WOULD YOU.",
    /^(?:could|would)$/,
    /^(?:could|would) you open the door(?: please)?$/,
  ),
  s8: item("rather", "المقارنة بين خيارين تستخدم WOULD RATHER … THAN.", /^rather$/, /^i'd rather have tea than coffee$/, /^i would rather have tea than coffee$/),
  s9: item("like", "الرغبة في فعل: WOULD LIKE + TO + V1.", /^like$/, /^i'd like to learn english$/, /^i would like to learn english$/),
  s10: item(
    "needn't / don't have to",
    "لا حاجة إلى الاستعجال: NEEDN'T أو DON'T HAVE TO.",
    new RegExp(`^(?:need not|needn't|${negated} have to|${noNeed})$`),
    new RegExp(`^you (?:need not|needn't|${negated} have to|${noNeed}) hurry$`),
  ),

  /* ---------- الصيغ ---------- */
  fo1: item("can", "CAN لا تتغير مع She.", /^can$/, /^she can speak three languages$/),
  fo2: item(
    "may / might / could",
    "كلها مقبولة للاحتمال؛ ولا نضع نسبًا ثابتة لأي منها.",
    /^(?:may|might|could)$/,
    /^it (?:may|might|could) rain tomorrow$/,
    /^it (?:may|might|could) rain tomorrow but i am not sure$/,
  ),
  fo3: item(
    "must / have to",
    "كلاهما مناسب للضرورة؛ MUST إلزام يقدّمه المتحدث، وHAVE TO التزام خارجي.",
    /^(?:must|have to)$/,
    /^you (?:must|have to) wear a seat belt in the car$/,
  ),
  fo4: item("to learn", "WOULD LIKE + TO + V1.", /^to learn(?: another language)?$/, /^i'd like to learn another language$/, /^i would like to learn another language$/),
  fo5: item("could", "القدرة العامة في الماضي: COULD.", /^could$/, /^i could swim very well$/),
  fo6: item("has", "HAVE TO تتحول إلى HAS TO مع He.", /^has$/, /^he has to work every saturday$/),

  /* ---------- التمييز الدلالي ---------- */
  c1: choice("الأولى منع، والثانية عدم ضرورة.", "MUSTN'T منع، وDON'T HAVE TO عدم إلزام.", "الأولى منع، والثانية عدم ضرورة."),
  c2: choice("الأولى نصيحة، والثانية إلزام أقوى.", "SHOULD نصيحة، وMUST إلزام.", "الأولى نصيحة، والثانية إلزام أقوى."),
  c3: choice(
    "كلتاهما احتمال، وMIGHT قد تكون أكثر تحفظًا في بعض السياقات دون نسب ثابتة.",
    "لا نحفظ نسبًا مئوية ثابتة لدرجة الاحتمال.",
    "كلتاهما احتمال، وMIGHT قد تكون أكثر تحفظًا في بعض السياقات دون نسب ثابتة.",
  ),
  c4: choice("الأولى قدرة في الحاضر، والثانية قدرة عامة في الماضي.", "CAN للحاضر وCOULD للقدرة العامة الماضية.", "الأولى قدرة في الحاضر، والثانية قدرة عامة في الماضي."),
  c5: choice("الأولى رغبة، والثانية تفضيل بين خيارين.", "WOULD LIKE رغبة، وWOULD RATHER تفضيل.", "الأولى رغبة، والثانية تفضيل بين خيارين."),
};

export function gradePractice48(id: string, value: string): boolean {
  const key = PRACTICE_KEYS_48[id];
  if (!key || !value.trim()) return false;
  if (key.choices) {
    return key.choices.some((option) => option.trim() === value.trim());
  }
  const text = normalizeEnglish48(value);
  return Boolean(key.patterns?.some((pattern) => pattern.test(text)));
}
