import { normalizeEnglish50 } from "./normalize50";

export type PracticeKey50 = {
  model: string;
  why: string;
  choices?: readonly string[];
  patterns?: readonly RegExp[];
};

const item = (model: string, why: string, ...patterns: RegExp[]): PracticeKey50 => ({ model, why, patterns });
const choice = (model: string, why: string, ...choices: string[]): PracticeKey50 => ({ model, why, choices });

const cant = "(?:can't|can not|cannot)";

export const PRACTICE_KEYS_50: Readonly<Record<string, PracticeKey50>> = {
  /* ---------- التدريب الأول: اختر ---------- */
  ch1: choice("must", "التثاؤب الآن دليل واضح على التعب، فنستنتج بقوة: must be tired. أما mustn't فتعني المنع.", "must"),
  ch2: choice("can't", "رؤيتها في المركز التجاري الآن دليل قوي ضد وجودها في المدرسة: can't be at school.", "can't"),
  ch3: choice("can't", "وصول ثلاثة تذكيرات يجعل النسيان مستبعدًا جدًا، فالنفي القوي هو المناسب: can't have forgotten. أما mustn't فتعني المنع، ولا تُستخدم لنفي استنتاج عن الماضي.", "can't"),
  ch4: choice("must", "المكتب خالٍ الآن، فنستنتج بقوة أنه غادر مبكرًا: must have left. (هذا استنتاج من الدليل المتاح، وتفسره الصيغة كأرجح احتمال.)", "must"),
  ch5: choice("can't", "سماع حديثها الآن يستبعد نومها بقوة: can't be sleeping.", "can't"),
  ch6: choice("might", "السماء الداكنة توحي باحتمال مطر مستقبلي دون يقين: might rain (وتقبل may في سياق مشابه).", "might"),

  /* ---------- التدريب الثاني: أكمل ---------- */
  c1: item("be", "بعد MUST يأتي BE لأن hungry صفة: She must be hungry.", /^be$/, /^must be$/, /^she must be hungry$/),
  c2: item("be studying", "الحدث يُتصوَّر جاريًا الآن (now)، فنستخدم MIGHT BE + V-ing: be studying.", /^be studying$/, /^might be studying$/, /^he might be studying now$/),
  c3: item("left", "بعد HAVE نستخدم V3 من leave وهو left: They must have left already.", /^left$/, /^have left$/, /^they must have left already$/),
  c4: item("finished", "V3 من finish هو finished: She can't have finished.", /^finished$/, /^have finished$/, /^she can't have finished the work in five minutes$/, /^she can ?not have finished the work in five minutes$/, /^she cannot have finished the work in five minutes$/),
  c5: item("waiting", "بعد COULD BE يأتي V-ing للنشاط المستمر: waiting.", /^waiting$/, /^be waiting$/, /^he could be waiting outside$/),
  c6: item("playing", "بعد HAVE BEEN يأتي V-ing لنشاط كان مستمرًا: playing.", /^playing$/, /^been playing$/, /^they might have been playing football$/),
  c7: item("be", "asleep صفة تحتاج BE بعد MUST: The children must be asleep.", /^be$/, /^must be$/, /^the children must be asleep$/),
  c8: item("know", "بعد CAN'T يأتي الفعل الأساسي V1 دون أي إضافة: know.", /^know$/, /^can't know$/, /^he can't know the answer$/, /^he can ?not know the answer$/, /^he cannot know the answer$/),

  /* ---------- التدريب الثالث: صنّف ---------- */
  s1: choice("الحاضر — استنتاج قوي", "MUST BE تتحدث عن الآن بدرجة تأكد قوية.", "الحاضر — استنتاج قوي"),
  s2: choice("الماضي — احتمال", "MIGHT HAVE + V3 احتمال عن حدث في الماضي: ربما نسي المفاتيح.", "الماضي — احتمال"),
  s3: choice("الحاضر — نفي قوي", "CAN'T BE نفي قوي عن الحاضر: لا يمكن أن يكونوا جادين.", "الحاضر — نفي قوي"),
  s4: choice("الماضي — استنتاج قوي", "MUST HAVE + V3 استنتاج قوي أن المغادرة وقعت في الماضي.", "الماضي — استنتاج قوي"),
  s5: choice("الحاضر — احتمال لنشاط مستمر", "COULD BE + V-ing احتمال لنشاط يُتصوَّر حدوثه الآن: ربما تتحدث مع والدتها.", "الحاضر — احتمال لنشاط مستمر"),
  s6: choice("الماضي — نفي قوي", "CAN'T HAVE + V3 استنتاج قوي بأن السرقة لم تحدث في الماضي.", "الماضي — نفي قوي"),

  /* ---------- التدريب الرابع: صحح ---------- */
  co1: item("He must be tired.", "لا تأتي TO بعد MUST أبدًا؛ الفعل الناقص يتبعه الفعل الأساسي مباشرة.", /^he must be tired$/),
  co2: item("She might have forgotten.", "بعد MIGHT نستخدم HAVE لا HAS، ثم V3 من forget وهو forgotten.", /^she might have forgotten$/),
  co3: item(
    "They can't have gone home. / They can't be going home.",
    "went هي V2 ولا تلي BE هنا. إذا كان الحكم عن الماضي قل can't have gone، وإذا كان عن نشاط الآن قل can't be going. الصيغتان صحيحتان بحسب الزمن المقصود.",
    /^they can't have gone home$/,
    /^they can ?not have gone home$/,
    /^they cannot have gone home$/,
    /^they can't be going home$/,
    /^they can ?not be going home$/,
    /^they cannot be going home$/,
  ),
  co4: item("He must have seen the accident.", "V3 من see هو seen، وليس saw (V2).", /^he must have seen the accident$/),
  co5: item("She might be sleeping now.", "النشاط يحدث الآن، فنستخدم BE + V-ing: be sleeping. أما slept فهي V2/V3 ولا تلي BE هنا.", /^she might be sleeping now$/, /^she might be sleeping$/),
  co6: item("They must have been playing football.", "بعد HAVE BEEN يأتي V-ing: playing، وليس الفعل الأساسي play.", /^they must have been playing football$/),
  co7: item(
    "He can't be the teacher.",
    "المقصود استنتاج (لا يمكن أن يكون)، لا منع. لذلك نستبدل MUSTN'T بـCAN'T.",
    /^he can't be the teacher$/,
    /^he can ?not be the teacher$/,
    /^he cannot be the teacher$/,
    /^he can't be the teacher he's only a student$/,
    /^he can ?not be the teacher he's only a student$/,
    /^he cannot be the teacher he's only a student$/,
  ),
  co8: item("She can't have gone there.", "بعد HAVE نستخدم V3 من go وهو gone، وليس went.", /^she can't have gone there$/, /^she can ?not have gone there$/, /^she cannot have gone there$/),

  /* ---------- التدريب الخامس: ترجم ---------- */
  tr1: item("He must be sleeping now.", "لا بد = MUST، ونومه نشاط مستمر الآن = BE + V-ing. وتقبل صياغة asleep بوصفها صفة بالمعنى نفسه.", /^he must be sleeping now$/, /^he must be asleep now$/, /^he must be sleeping$/),
  tr2: item("She might be in the library.", "ربما = احتمال عن الحاضر بـMIGHT (وتقبل MAY وCOULD)، ثم BE + مكان.", /^she (?:might|may|could) be in the library$/, /^she (?:might|may|could) be at the library$/),
  tr3: item("They can't know the answer.", "لا يمكن = نفي قوي بـCAN'T + V1 (know).", /^they can't know the answer$/, /^they can ?not know the answer$/, /^they cannot know the answer$/),
  tr4: item("She must have left early.", "المغادرة حدث ماضٍ نستنتجه بقوة: MUST HAVE + V3 (left).", /^she must have left early$/),
  tr5: item("He might have been waiting for us.", "ربما + نشاط كان مستمرًا = MIGHT HAVE BEEN + V-ing. تقبل MAY وCOULD گاحتمال بالدرجة نفسها.", /^he (?:might|may|could) have been waiting for us$/),
  tr6: item(
    "He can't have bought this car; it's too expensive for him.",
    "الشراء حدث ماضٍ ننفيه بقوة بـCAN'T HAVE + V3 (bought)، والثمن هو الدليل. تقبل COULDN'T HAVE وربط السبب بـbecause.",
    new RegExp(`^he (?:${cant}|couldn't|could not) have bought this car (?:because |as )?it'?s too expensive for him$`),
    new RegExp(`^he (?:${cant}|couldn't|could not) have bought this car (?:because |as )?it is too expensive for him$`),
  ),
  tr7: item("The children might be playing in the garden now.", "احتمال لنشاط مستمر الآن = MIGHT BE + V-ing (وتقبل MAY وCOULD).", /^the children (?:might|may|could) be playing in the garden now$/, /^the children (?:might|may|could) be playing in the garden$/),
  tr8: item("They must have been working when I called them.", "استنتاج قوي عن عمل كان مستمرًا وقت الاتصال = MUST HAVE BEEN + V-ing.", /^they must have been working when i (?:called|phoned) them$/, /^they must have been working when i (?:called|phoned)$/),

  /* ---------- محقق الأخطاء ---------- */
  d1: choice("He can't be at home.", "نفي الاستنتاج «لا يمكن أن يكون» يكون بـCAN'T. أما mustn't go فمنع، وmay احتمال مثبت يناقض المقصود.", "He can't be at home."),
  d2: item("She must have forgotten.", "الاستنتاج عن نسيان في الماضي يحتاج HAVE + V3، لا BE + V3.", /^she must have forgotten$/),
  d3: item("He might have gone.", "بعد HAVE نستخدم V3 (gone) لا V2 (went).", /^he might have gone$/),
  d4: choice("الأولى استنتاج عن حالته، والثانية إلزام.", "MUST BE + صفة استنتاج (لا بد أنه متعب)، وHAS TO إلزام (يجب عليه أن يعمل).", "الأولى استنتاج عن حالته، والثانية إلزام."),
  d5: choice("الأولى ربما تكون مريضة الآن، والثانية ربما كانت مريضة في الماضي.", "HAVE BEEN تنقل الحكم من الحاضر إلى الماضي.", "الأولى ربما تكون مريضة الآن، والثانية ربما كانت مريضة في الماضي."),
  d6: choice("فرصة كانت متاحة ولم تحدث.", "but she gave up يثبت أنها لم تفز؛ COULD HAVE هنا إمكانية ضاعت، لا احتمال مفتوح.", "فرصة كانت متاحة ولم تحدث."),

  /* ---------- تحليل الحوار ---------- */
  dl1: choice("استنتاج عن الحاضر", "MUST BE حكم قوي على حالته الآن، لا إلزام.", "استنتاج عن الحاضر"),
  dl2: choice("احتمال لنشاط مستمر الآن", "MIGHT BE + V-ing: ربما هو الآن في اجتماع.", "احتمال لنشاط مستمر الآن"),
  dl3: choice("استنتاج قوي عن الماضي", "MUST HAVE + V3: لا بد أنه ذهب (حدث سابق).", "استنتاج قوي عن الماضي"),
  dl4: choice("احتمال عن الماضي", "COULD HAVE هنا تفسير ممكن لغيابه، والنسيان غير مؤكد.", "احتمال عن الماضي"),
  dl5: choice("استنتاج سلبي قوي عن الماضي", "الدليل «يراجع جدوله دائمًا» يدفع Liam إلى نفي النسيان بقوة بـCAN'T HAVE.", "استنتاج سلبي قوي عن الماضي"),
};

export function gradePractice50(id: string, value: string): boolean {
  const key = PRACTICE_KEYS_50[id];
  if (!key || !value.trim()) return false;
  if (key.choices) return key.choices.some((option) => option.trim() === value.trim());
  const text = normalizeEnglish50(value);
  return Boolean(key.patterns?.some((pattern) => pattern.test(text)));
}
