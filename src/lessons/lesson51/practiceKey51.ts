import { normalizeEnglish51 } from "./normalize51";

export type PracticeKey51 = {
  model: string;
  why: string;
  choices?: readonly string[];
  patterns?: readonly RegExp[];
};

const item = (model: string, why: string, ...patterns: RegExp[]): PracticeKey51 => ({ model, why, patterns });
const choice = (model: string, why: string, ...choices: string[]): PracticeKey51 => ({ model, why, choices });

const doesnt = "(?:doesn't|does not)";
const dont = "(?:don't|do not)";

export const PRACTICE_KEYS_51: Readonly<Record<string, PracticeKey51>> = {
  /* ---------- التدريب الأول: أكمل ---------- */
  c1: item("melts", "الفاعل IT مفرد، فيأخذ الفعل S: it melts.", /^melts$/, /^it melts$/, /^if you heat ice it melts$/),
  c2: item("eats", "الفاعل HE مفرد غائب، فيأخذ الفعل S في جزء الشرط: If he eats too much.", /^eats$/, /^he eats too much$/, /^if he eats too much he feels sick$/),
  c3: item("get", "الفاعل PEOPLE جمع، فيبقى الفعل الأساسي دون S: they get thirsty.", /^get$/, /^they get thirsty$/, /^if people don't drink water they get thirsty$/, /^if people do not drink water they get thirsty$/),
  c4: item("studies", "الفاعل SHE مفرد غائب، وstudy تأخذ es: she studies.", /^studies$/, /^she studies regularly$/, /^if she studies regularly she improves$/),
  c5: item("mix", "مع YOU يبقى الفعل الأساسي كما هو: you mix.", /^mix$/, /^you mix red and blue$/, /^if you mix red and blue you get purple$/),
  c6: item("feels", "الفاعل MY BROTHER مفرد غائب، فيأخذ الفعل S: he feels.", /^feels$/, /^my brother feels tired$/, /^if my brother feels tired he takes a nap$/),
  c7: item("grow", "الفاعل PLANTS جمع، فيبقى الفعل الأساسي: they grow poorly.", /^grow$/, /^they grow poorly$/, /^if plants don't get sunlight they grow poorly$/, /^if plants do not get sunlight they grow poorly$/),
  c8: item("drops", "الفاعل TEMPERATURE مفرد، فيأخذ الفعل S: the temperature drops.", /^drops$/, /^the temperature drops$/, /^if the temperature drops water freezes$/),
  c9: item("turns", "الفاعل THE PHONE مفرد، فيأخذ الفعل S: the phone turns off.", /^turns$/, /^the phone turns off$/, /^if a phone battery reaches zero the phone turns off$/),
  c10: item("sleep", "بعد DOESN'T يعود الفعل إلى صورته الأساسية V1 دون S: doesn't sleep.", /^sleep$/, /^doesn't sleep$/, /^does not sleep$/, /^if he doesn't sleep enough he feels tired$/, /^if he does not sleep enough he feels tired$/),

  /* ---------- التدريب الثاني: اختر ---------- */
  ch1: choice("heat", "الحقيقة العلمية تُقال بالمضارع البسيط في الطرفين، ومع YOU يبقى الفعل كما هو: heat.", "heat"),
  ch2: choice("feels", "النتيجة مع SHE مفرد غائب فيأخذ الفعل S: she feels. أما will felt فتركيب خاطئ (will يتبعها V1).", "feels"),
  ch3: choice("exercise", "الفاعل PEOPLE جمع، فيبقى الفعل الأساسي: exercise.", "exercise"),
  ch4: choice("runs", "الفاعل BATTERY مفرد، فيأخذ الفعل مع RUN إضافة S: runs out.", "runs"),
  ch5: choice("drinks", "مع He في جزء الشرط يأخذ الفعل S: he drinks coffee.", "drinks"),
  ch6: choice("starts", "الفاعل MACHINE مفرد، فيأخذ الفعل S: the machine starts.", "starts"),

  /* ---------- التدريب الثالث: Zero أم First ---------- */
  s1: choice("Zero Conditional — حقيقة عامة", "مضارع في الطرفين دون WILL ودون زمن مستقبلي: حقيقة عامة — شرط صفري.", "Zero Conditional — حقيقة عامة"),
  s2: choice("First Conditional — احتمال مستقبلي", "كلمة tomorrow وwill في النتيجة تنقلان الجملة إلى الشرط الأول: احتمال مستقبلي.", "First Conditional — احتمال مستقبلي"),
  s3: choice("Zero Conditional — حقيقة عامة", "الجوع نتيجة عامة متكررة لعدم الأكل، والتركيب مضارع في الطرفين: شرط صفري.", "Zero Conditional — حقيقة عامة"),
  s4: choice("First Conditional — نتيجة مستقبلية محتملة", "tonight وwill watch يحددان موقفًا مستقبليًا محددًا: شرط أول.", "First Conditional — نتيجة مستقبلية محتملة"),
  s5: choice("Zero Conditional — حقيقة عامة", "مزج الألوان حقيقة عامة، والتركيب مضارع في الطرفين: شرط صفري.", "Zero Conditional — حقيقة عامة"),
  s6: choice("First Conditional — موقف مستقبلي محدد", "tomorrow وwill take يحددان موقفًا مستقبليًا محددًا: شرط أول.", "First Conditional — موقف مستقبلي محدد"),

  /* ---------- التدريب الرابع: صحح ---------- */
  co1: item("If you heat water, it boils.", "مع YOU يبقى الفعل الأساسي دون S في جزء الشرط.", /^if you heat water it boils$/),
  co2: item("If he doesn't sleep, he feels tired.", "مع He يكون النفي بـdoesn't ثم V1: doesn't sleep.", new RegExp(`^if he ${doesnt} sleep he feels tired$`)),
  co3: item("If she doesn't study, she fails.", "بعد DOESN'T يعود الفعل إلى V1: study دون S.", new RegExp(`^if she ${doesnt} study she fails$`)),
  co4: item("If you press this button, the machine starts.", "الشرط الصفري لا يأخذ WILL: نحذفها ونضع المضارع البسيط.", /^if you press this button the machine starts$/),
  co5: item("If plants don't get water, they die.", "مع PLANTS جمع يكون النفي بـdon't + V1: don't get.", new RegExp(`^if plants ${dont} get water they die$`)),
  co6: item("If I feel tired, I usually take a break.", "العادة المتكررة تُقال بالشرط الصفري: مضارع في الطرفين دون will.", /^if i feel tired i usually take a break$/),
  co7: item("If ice gets warm, it melts.", "الفاعل IT مفرد فيأخذ الفعل S: it melts.", /^if ice gets warm it melts$/),
  co8: item("If people eat too much, they gain weight.", "الفاعل PEOPLE جمع، فيبقى الفعل الأساسي eat دون S.", /^if people eat too much they gain weight$/),

  /* ---------- التدريب الخامس: ترجم ---------- */
  tr1: item("If you heat ice, it melts.", "شرط + نتيجة عامة بالمضارع البسيط في الطرفين.", /^if you heat ice it melts$/, /^if you heat the ice it melts$/),
  tr2: item("If you don't sleep well, you feel tired.", "نفي الشرط بـdon't + V1 (مع YOU)، والنتيجة بالمضارع البسيط. وتُقبل doesn't مع He/She ومع I بالمعنى نفسه.", new RegExp(`^if you ${dont} sleep well you feel tired$`), new RegExp(`^if (?:he|she) ${doesnt} sleep well (?:he|she) feels? tired$`), new RegExp(`^if i ${dont} sleep well i feel tired$`)),
  tr3: item("If my brother drinks coffee at night, he doesn't sleep easily.", "مع My brother يأخذ الفعل S في الشرط: drinks، ونفي النتيجة بـdoesn't + V1. وتُقبل doesn't sleep well بالمعنى نفسه.", /^if my brother drinks coffee at night he (?:doesn't|does not) sleep (?:easily|well)$/, /^if my brother drinks coffee at night he can't sleep easily$/, /^if my brother drinks coffee at night he cannot sleep easily$/),
  tr4: item("If plants don't get water, they die.", "نفي الشرط مع PLANTS بـdon't + V1، والنتيجة they die. وتُقبل receive بدل get.", new RegExp(`^if plants ${dont} (?:get|receive) water they die$`), new RegExp(`^if plants ${dont} (?:get|receive) (?:enough )?water they die$`)),
  tr5: item("If you press this button, the computer starts.", "الشرط بالمضارع البسيط، وTHE COMPUTER مفرد فيأخذ starts. وتُقبل the machine بدل the computer.", /^if you press this button the (?:computer|machine) starts$/),
  tr6: item("If people exercise regularly, their health improves.", "الشرط مثبت بالمضارع، والنتيجة مع THEIR HEALTH مفرد فيأخذ improves. وتُقبل they become healthier بالمعنى نفسه.", /^if people exercise regularly their health improves$/, /^if people exercise regularly their health improve$/, /^if people exercise regularly they become healthier$/),
  tr7: item("If I feel bored, I read a book.", "عادة شخصية: شرط ونتيجة بالمضارع البسيط. وتُقبل a book واحدًا أو كتابًا مختلفًا بترتيب سليم.", /^if i feel bored i read (?:a|the|one) book$/, /^if i feel bored i read books$/),
  tr8: item("If you don't follow the rules, you get a warning.", "نفي الشرط بـdon't + V1 (مع YOU)، والنتيجة you get a warning.", new RegExp(`^if you ${dont} follow (?:the )?rules you get (?:a|the) warning$`), new RegExp(`^if you ${dont} follow (?:the )?rules you (?:will |would )?get (?:a|the) warning$`)),

  /* ---------- كاشف الأخطاء ---------- */
  d1: choice("If you heat ice, it melts.", "الصيغة النموذجية للحقيقة العامة: مضارع في الطرفين دون WILL. الجملة بـwill قد تكون صحيحة لتوقع مستقبلي، لكنها ليست نموذج الشرط الصفري.", "If you heat ice, it melts."),
  d2: item("If he eats too much, he feels sick.", "مع HE يأخذ الفعل S في جزء الشرط: eats.", /^if he eats too much he feels sick$/),
  d3: item("If she doesn't eat, she gets hungry.", "بعد DOESN'T يعود الفعل إلى V1: eat دون S.", /^if she (?:doesn't|does not) eat she gets hungry$/),
  d4: choice("الأولى عادة متكررة، والثانية توقع مستقبلي محدد.", "الجملة الأولى شرط صفري لعادة متكررة، وكلمة tomorrow مع will في الثانية تنقلها إلى الشرط الأول.", "الأولى عادة متكررة، والثانية توقع مستقبلي محدد."),
  d5: choice("If I feel tired, I usually take a break.", "العادة المتكررة تُقال بالشرط الصفري دون will: مضارع في الطرفين مع usually.", "If I feel tired, I usually take a break."),
  d6: choice("If you heat ice, it melts.", "الحقيقة العامة تُقال بالمضارع البسيط في الطرفين؛ الماضي يغيّر المعنى، وwill تحوّله إلى توقع مستقبلي.", "If you heat ice, it melts."),

  /* ---------- تحليل الحوار ---------- */
  dl1: choice("عادة متكررة", "If I don't sleep well, I feel tired — نتيجة تتكرر كل ليلة نوم سيئة: شرط صفري لعادة.", "عادة متكررة"),
  dl2: choice("نتيجة متكررة منفية", "النتيجة منفية بـdon't + V1: لا أنام جيدًا — نتيجة تتكرر مع شرب القهوة، وليست منعًا.", "نتيجة متكررة منفية"),
  dl3: choice("نتيجة عامة متكررة", "الرياضة المنتظمة تؤدي إلى نتيجة عامة متكررة: صحة أفضل وبطاقة أكبر.", "نتيجة عامة متكررة"),
  dl4: choice("حقيقة عامة عن الجسم", "عدم شرب كفاية من الماء يؤدي إلى الجفاف حقيقة عامة عن الجسم البشري.", "حقيقة عامة عن الجسم"),
};

export function gradePractice51(id: string, value: string): boolean {
  const key = PRACTICE_KEYS_51[id];
  if (!key || !value.trim()) return false;
  if (key.choices) return key.choices.some((option) => option.trim() === value.trim());
  const text = normalizeEnglish51(value);
  return Boolean(key.patterns?.some((pattern) => pattern.test(text)));
}
