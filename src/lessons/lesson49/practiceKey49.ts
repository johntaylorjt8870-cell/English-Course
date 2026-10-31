import { normalizeEnglish49 } from "./normalize49";

export type PracticeKey49 = {
  model: string;
  why: string;
  choices?: readonly string[];
  patterns?: readonly RegExp[];
};

const item = (model: string, why: string, ...patterns: RegExp[]): PracticeKey49 => ({ model, why, patterns });
const choice = (model: string, why: string, ...choices: string[]): PracticeKey49 => ({ model, why, choices });

const negativeShould = "(?:shouldn't|should not)";
const negativeCould = "(?:couldn't|could not|can't|can not)";

export const PRACTICE_KEYS_49: Readonly<Record<string, PracticeKey49>> = {
  /* ---------- التدريب الأول: HAVE + V3 ---------- */
  c1: item("left", "بعد HAVE نستخدم V3 من leave وهو left، وليس leave أو leaved.", /^left$/, /^have left$/, /^he must have left$/, /^he must have left early$/),
  c2: item("forgotten", "V3 من forget هو forgotten؛ forgot هي V2.", /^forgotten$/, /^have forgotten$/, /^she might have forgotten the meeting$/),
  c3: item("studied", "V3 من study هو studied؛ نضيف -ed ونقلب y إلى i.", /^studied$/, /^have studied$/, /^you should have studied harder$/),
  c4: item("won", "V3 من win هو won، وليس win أو winned.", /^won$/, /^have won$/, /^they could have won the match$/),
  c5: item("said", "V3 من say هو said، وليس say أو sayed.", /^said$/, /^have said$/, /^i shouldn't have said that$/, /^i should not have said that$/),
  c6: item("taken", "V3 من take هو taken، وليس took.", /^taken$/, /^have taken$/, /^he may have taken my book$/),
  c7: item("helped", "V3 من help هو helped.", /^helped$/, /^have helped$/, /^we would have helped you$/),
  c8: item("seen", "V3 من see هو seen، وليس saw.", /^seen$/, /^have seen$/, /^she must have seen the message$/),
  c9: item("bought", "V3 من buy هو bought، وليس buyed.", /^bought$/, /^have bought$/, /^you needn't have bought more food$/, /^you need not have bought more food$/),
  c10: item("known", "V3 من know هو known، وليس knew.", /^known$/, /^have known$/, /^they couldn't have known the answer$/, /^they could not have known the answer$/),

  /* ---------- التدريب الثاني: الاختيار ---------- */
  ch1: choice("must", "الأضواء مطفأة واستنتاج الذهاب إلى النوم قوي؛ MUST HAVE + V3 هي الاستنتاج.", "must"),
  ch2: choice("should", "كان ينبغي أن يتصل، لكنه نسي؛ SHOULD HAVE + V3 للندم والنصيحة المتأخرة.", "should"),
  ch3: choice("needn't", "الشراء حدث بالفعل، لكنه لم يكن ضروريًا؛ NEEDN'T HAVE + V3.", "needn't"),
  ch4: choice("might", "المتحدث غير متأكد؛ MIGHT HAVE + V3 احتمال في الماضي.", "might"),
  ch5: choice("couldn't", "وجوده في بلد آخر يمنع حدوث السرقة؛ COULDN'T HAVE + V3 استنتاج بأنه غير ممكن.", "couldn't"),

  /* ---------- التدريب الثالث: التصحيح ---------- */
  co1: item("He must have forgotten.", "بعد MUST نستخدم HAVE لا HAS؛ ثم V3 من forget: forgotten.", /^he must have forgotten$/),
  co2: item("She might have gone home.", "بعد MIGHT نستخدم HAVE لا HAD، وبعد HAVE نستخدم V3: gone.", /^she might have gone home$/),
  co3: item("You should have gone earlier.", "V3 من go هو gone، وليس went.", /^you should have gone earlier$/),
  co4: item("They could have seen the accident.", "V3 من see هو seen، وليس saw.", /^they could have seen the accident$/),
  co5: item("I needn't have bought anything.", "V3 من buy هو bought، وليست boughted.", /^i needn't have bought anything$/, /^i need not have bought anything$/),
  co6: item("He shouldn't have eaten so much.", "V3 من eat هو eaten، وليس ate.", /^he shouldn't have eaten so much$/, /^he should not have eaten so much$/),
  co7: item("She must have written the letter.", "V3 من write هو written، وليس wrote.", /^she must have written the letter$/),
  co8: item("We would have gone with you.", "V3 من go هو gone، وليس went.", /^we would have gone with you$/),

  /* ---------- التدريب الرابع: الترجمة ---------- */
  tr1: item(
    "He must have forgotten our appointment.",
    "لا بد أنه = MUST HAVE + V3؛ ونسي = forgotten؛ وموعدنا = our appointment.",
    /^he must have forgotten our appointment$/,
  ),
  tr2: item(
    "I might have left my phone in the car.",
    "ربما = might / may / could (احتمال في الماضي)؛ تركت = left؛ هاتفي = my phone.",
    /^i (?:might|may|could) have left my phone in the car$/,
  ),
  tr3: item(
    "You should have told me the truth.",
    "كان ينبغي عليك = SHOULD HAVE (أو OUGHT TO HAVE) + V3؛ أخبرني = told me؛ الحقيقة = the truth.",
    /^you (?:should|ought to) have told me the truth$/,
  ),
  tr4: item(
    "I shouldn't have said that.",
    "لم يكن ينبغي لي = SHOULDN'T HAVE + V3؛ أقول = said؛ ذلك = that.",
    /^i shouldn't have said that$/,
    /^i should not have said that$/,
  ),
  tr5: item(
    "We could have won the match.",
    "كان بإمكاننا = COULD HAVE + V3؛ الفوز = won؛ المباراة = the match.",
    /^we could have won the match$/,
  ),
  tr6: item(
    "You needn't have bought the food; we had plenty.",
    "لم يكن من الضروري أن تشتري = NEEDN'T HAVE + bought؛ الطعام = the food؛ كان لدينا الكثير = we had plenty.",
    /^you (?:needn't|need not) have bought the food (?:because |since |as )?we had plenty$/,
    /^you (?:needn't|need not) have bought food (?:because |since |as )?we had plenty$/,
  ),
  tr7: item(
    "He couldn't have seen the accident; he was at home.",
    "لا يمكن أنه = COULDN'T HAVE (أو CAN'T HAVE) + seen؛ الحادث = the accident؛ كان في المنزل = he was at home.",
    /^he (?:couldn't|could not|can't|can not) have seen the accident (?:because |since |as )?he was at home$/,
    /^he was at home so he (?:couldn't|could not|can't|can not) have seen the accident$/,
  ),
  tr8: item(
    "I would have helped you if I had known.",
    "كنت سأساعدك = WOULD HAVE + helped؛ لو كنت أعرف = if I had known (أو if I'd known).",
    /^(?:i would|i'd) have helped you if (?:i had|i'd) known$/,
  ),

  /* ---------- محقق الأخطاء الستة ---------- */
  d1: item("He must have forgotten.", "HAVE بصيغتها الأساسية بعد MUST، وV3 من forget هو forgotten.", /^he must have forgotten$/),
  d2: item("She might have gone home.", "MIGHT + HAVE + V3؛ وgo – went – gone.", /^she might have gone home$/),
  d3: item("You should have gone earlier.", "SHOULD + HAVE + V3؛ وV3 من go هو gone.", /^you should have gone earlier$/),
  d4: item("You should have studied yesterday.", "للحديث عن الماضي نحتاج SHOULD HAVE + V3، لا SHOULD + V1.", /^you should have studied yesterday$/),
  d5: item("I didn't need to buy it.", "DIDN'T NEED TO + V1 تعبّر عن عدم الحاجة دون تأكيد وقوع الفعل.", /^i (?:didn't|did not) need to buy it$/),
  d6: item("You must have finished the work.", "MUST HAVE + V3 استنتاج قوي عن الماضي، لا إلزام في الحاضر.", /^you must have finished the work$/),

  /* ---------- فهم الحوار ---------- */
  dl1: choice("احتمال في الماضي", "MIGHT HAVE + V3 في هذا السياق احتمال، وليست استنتاجًا قويًا أو فرصة ضائعة.", "احتمال في الماضي"),
  dl2: choice("استنتاج قوي عن الماضي", "MUST HAVE + V3 تعبّر عن استنتاج قوي مبني على دليل، وليست إلزامًا في الحاضر.", "استنتاج قوي عن الماضي"),
  dl3: choice("كانت هناك إمكانية أو فرصة متاحة", "COULD HAVE هنا تشير إلى إمكانية كانت متاحة، وقد تحمل عتابًا لطيفًا.", "كانت هناك إمكانية أو فرصة متاحة"),
  dl4: choice("لوم أو نصيحة متأخرة", "SHOULD HAVE + V3 تفيد أن الاتصال كان ينبغي أن يحدث ولم يحدث.", "لوم أو نصيحة متأخرة"),
  dl5: choice("لا، الجملة تطرح احتمالًا ولا تثبت وقوعه", "MIGHT HAVE لا تثبت وقوع الحدث؛ إنها تتركه احتمالًا واردًا.", "لا، الجملة تطرح احتمالًا ولا تثبت وقوعه"),

  /* ---------- فهم المقارنات ---------- */
  cx1: choice(
    "الأولى استنتاج قوي، والثانية احتمال أضعف.",
    "MUST HAVE استنتاج قوي، وMIGHT HAVE احتمال. لا تحوّل الفرق إلى نسب مئوية ثابتة.",
    "الأولى استنتاج قوي، والثانية احتمال أضعف.",
  ),
  cx2: choice(
    "الأولى إمكانية كانت متاحة، والثانية واجب أو نصيحة لم تُنفّذ.",
    "COULD HAVE = كانت لديك إمكانية؛ SHOULD HAVE = كان ينبغي أن تفعل.",
    "الأولى إمكانية كانت متاحة، والثانية واجب أو نصيحة لم تُنفّذ.",
  ),
  cx3: choice(
    "الأولى: لم تتصل. الثانية: اتصلت.",
    "SHOULD HAVE تفترض عدم وقوع الفعل، وSHOULDN'T HAVE تُقرّ بوقوعه وتنتقده.",
    "الأولى: لم تتصل. الثانية: اتصلت.",
  ),
  cx4: choice(
    "الأولى تؤكد أنني استقللت التاكسي، والثانية لا تحسم وقوع الفعل.",
    "NEEDN'T HAVE + V3 تؤكد وقوع الفعل؛ DIDN'T NEED TO لا تحسمه وحدها.",
    "الأولى تؤكد أنني استقللت التاكسي، والثانية لا تحسم وقوع الفعل.",
  ),
  cx5: choice(
    "الأولى موقف المتحدث (احتمال)، والثانية ترتيب حدثين في الماضي.",
    "MIGHT HAVE + V3 موقف المتحدث، وHAD + V3 ترتيب الأحداث.",
    "الأولى موقف المتحدث (احتمال)، والثانية ترتيب حدثين في الماضي.",
  ),
  cx6: choice(
    "الأولى استنتاج عن الماضي، والثانية إلزام في الحاضر.",
    "MUST HAVE + V3 استنتاج، وMUST + V1 إلزام.",
    "الأولى استنتاج عن الماضي، والثانية إلزام في الحاضر.",
  ),
};

export function gradePractice49(id: string, value: string): boolean {
  const key = PRACTICE_KEYS_49[id];
  if (!key || !value.trim()) return false;
  if (key.choices) return key.choices.some((option) => option.trim() === value.trim());
  const text = normalizeEnglish49(value);
  return Boolean(key.patterns?.some((pattern) => pattern.test(text)));
}

/** Grade the V3 workshop item: the answer must be the third form, not V2 or V1. */
export function gradeV3_49(v3: string, value: string, v2: string): boolean {
  const text = normalizeEnglish49(value);
  if (!text) return false;
  if (v2 !== v3 && text === normalizeEnglish49(v2)) return false;
  return text === normalizeEnglish49(v3);
}
