import { normalizeEn45, TEST_QUESTIONS_45, type TestQuestion45 } from "./testData45";

export { normalizeEn45 };

export type SolutionEntry45 = {
  id: string;
  number: number;
  level: 1 | 2 | 3 | 4 | 5;
  /** الإجابة النموذجية المعروضة بعد التسليم وفي فضاء المعلم */
  modelAnswer: string;
  /** المفهوم النحوي المستهدف */
  concept: string;
  /** الشرح التربوي الواضح */
  why: string;
  /** الصيغ الإنجليزية المقبولة (بعد التطبيع) لأسئلة الإكمال والتصحيح */
  acceptedEn?: readonly string[];
};

export function normalizeAnswer45(value: string): string {
  return normalizeEn45(value);
}

export function normalizeBilingual45(value: string): string {
  return value
    .normalize("NFKC")
    .replace(/[’‘ʼ`]/g, "'")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function cleanBilingualTokens(value: string): string {
  return normalizeBilingual45(value)
    .replace(/[^\p{L}\p{N}'\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function gradeQ16(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "you should study vs you must study") return false;
  if (/\b(same meaning|no difference)\b|نفس المعني|لا فرق|لا يوجد فرق/.test(words)) return false;

  const adviceRe =
    /\b(advice|advise|recommend|recommendation|suggest|suggestion|good idea|optional|mild|gentle)\b|(نصيح|توصي|ارشاد|اقتراح|افضل|يفضل|مناسب|غير الزامي|اختياري)/;
  const obligRe =
    /\b(obligation|obligatory|necessity|necessary|compulsory|required|requirement|duty|rule|law|order|command|forced|have to)\b|(الزام|ضرور|واجب|اجبار|فرض|لازم|حتمي|قانون|امر)/;

  if (!adviceRe.test(words) || !obligRe.test(words)) return false;

  // رفض القلب الصريح للأدوار داخل الشق الواحد (دون القفز فوق أدوات المقابلة مثل while / whereas / بينما)
  const clauses16 = norm.split(
    /[.;,،؛\n]+|\b(?:while|whereas|but|and|whilst|yet)\b|(?:بينما|اما|ولكن|لكن|في حين)/
  );
  for (const clause of clauses16) {
    const enShouldInverted =
      /\b(should|first|1st)\b(?![^]*\b(?:must|second|2nd)\b)[^]{0,30}\b(is|means|expresses|gives|=|:)?\s*(?!not\b|no\b)(strong\s+)?(obligation|obligatory|compulsory|necessity|forced|command)\b/.test(
        clause
      );
    const enMustInverted =
      /\b(must|second|2nd)\b(?![^]*\b(?:should|first|1st)\b)[^]{0,26}\b(is|means|expresses|gives|=|:)\s*(?!not\b|more than\b|stronger than\b)(just\s+|only\s+|mild\s+)?(advice|recommendation|suggestion|optional)\b/.test(
        clause
      );
    const arShouldInverted =
      /(الاولي|الاول|should)\s*(هي|تعني|تعبر عن|تفيد|تدل علي|=|:)?\s*(?!ليست|لا تعني|لا تفيد)(?:ال)?(الزام|ضروره|اجبار|فرض|واجب)/.test(
        clause
      );
    const arMustInverted =
      /(الثانيه|الثاني|must)\s*(هي|تعني|تعبر عن|تفيد|تدل علي|=|:)?\s*(?!ليست|لا تعني|اقوي من)(مجرد\s+)?(?:ال)?(نصيحه|توصيه|اقتراح|اختياري)/.test(
        clause
      );
    if (enShouldInverted || enMustInverted || arShouldInverted || arMustInverted) return false;
  }

  // في الإجابات المختصرة المكونة من شقين دون تسمية الفعلين (مثل: obligation; advice)، الترتيب يتبع ترتيب الجملتين
  const mentionsModalsOrOrdinals = /\b(should|must|first|second)\b|(الاولي|الثانيه|الاول|الثاني)/.test(words);
  if (!mentionsModalsOrOrdinals) {
    const firstAdvice = words.search(adviceRe);
    const firstOblig = words.search(obligRe);
    if (firstOblig >= 0 && firstAdvice >= 0 && firstOblig < firstAdvice) return false;
  }

  return true;
}

function gradeQ17(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "you shouldn't enter vs you mustn't enter") return false;
  if (/\b(same meaning|no difference)\b|نفس المعني|لا فرق|لا يوجد فرق/.test(words)) return false;

  const adviceRe =
    /\b(advice|advise|advises|advising|advised|recommend|recommends|recommended|recommendation|not recommended|not a good idea|bad idea|better not|unwise|suggest|suggests|suggested|suggestion|optional)\b|(نصيح|توصي|ارشاد|افضل الا|افضل عدم|يفضل عدم|غير مناسب|لا ينصح|ليس منعا|ليست منعا)/;
  const prohibRe =
    /\b(prohibition|prohibited|forbid|forbids|forbidden|not allowed|disallow|disallowed|ban|banned|against the rules|illegal|strictly not)\b|(منع|ممنوع|حظر|محظور|غير مسموح|لا يسمح|قانون|تحريم|محرم)/;

  if (!adviceRe.test(words) || !prohibRe.test(words)) return false;

  const clauses17 = norm.split(
    /[.;,،؛\n]+|\b(?:while|whereas|but|and|whilst|yet)\b|(?:بينما|اما|ولكن|لكن|في حين)/
  );
  for (const clause of clauses17) {
    const enShouldntInverted =
      /\b(shouldn't|should not|first|1st)\b(?![^]*\b(?:mustn't|must not|second|2nd)\b)[^]{0,30}\b(is|means|expresses|=|:)?\s*(?!not\b|no\b)(strict\s+)?(prohibition|prohibited|forbidden|not allowed|ban|illegal)\b/.test(
        clause
      );
    const enMustntInverted =
      /\b(mustn't|must not|second|2nd)\b(?![^]*\b(?:shouldn't|should not|first|1st)\b)[^]{0,26}\b(is|means|expresses|=|:)\s*(?!not\b)(just\s+|only\s+|mild\s+)?(advice|recommendation|suggestion)\b/.test(
        clause
      );
    const arShouldntInverted =
      /(الاولي|الاول|shouldn't|should not)\s*(هي|تعني|تعبر عن|تفيد|تدل علي|=|:)?\s*(?!ليست|لا تعني|ليس)(?:ال)?(منع|ممنوع|حظر|محظور|غير مسموح)/.test(
        clause
      );
    const arMustntInverted =
      /(الثانيه|الثاني|mustn't|must not)\s*(هي|تعني|تعبر عن|تفيد|تدل علي|=|:)?\s*(?!ليست|لا تعني)(مجرد\s+)?(?:ال)?(نصيحه|توصيه|اقتراح)/.test(
        clause
      );
    if (enShouldntInverted || enMustntInverted || arShouldntInverted || arMustntInverted) return false;
  }

  const mentionsModalsOrOrdinals =
    /\b(shouldn't|should not|mustn't|must not|first|second)\b|(الاولي|الثانيه|الاول|الثاني)/.test(words);
  if (!mentionsModalsOrOrdinals) {
    const firstAdvice = words.search(adviceRe);
    const firstProhib = words.search(prohibRe);
    if (firstProhib >= 0 && firstAdvice >= 0 && firstProhib < firstAdvice) return false;
  }

  return true;
}

function gradeQ18(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "i should have listened to my teacher") return false;

  // رفض النفي الصريح للندم أو تحويل الزمن إلى نصيحة مستقبلية/حاضرة
  if (
    /\b(no regret|not regret|without regret|future advice|present advice|future expectation)\b/.test(words) ||
    /\b(not|no|never|doesn't|does not|don't|do not|isn't|is not)\s+([a-z']+\s+){0,2}(regret|remorse)\b/.test(words)
  ) {
    return false;
  }
  if (
    /(لا ندم|ليس ندما|ليست ندما|بدون ندم|ليس فيها ندم|نصيحه للحاضر|نصيحه للمستقبل|توقع مستقبلي)/.test(words) ||
    /(لا|ليس|ليست)\s+(تعني|يعني|تعبر عن|يعبر عن|تدل علي|يدل علي|تفيد|يفيد)?\s*(?:ال)?(ندم|تاسف|لوم)/.test(words)
  ) {
    return false;
  }

  const directRegretRe =
    /\b(regret|regretting|regretful|remorse|criticism|self criticism|blaming|wish i had|wishes|feeling sorry)\b|(ندم|نادم|تاسف|حسره|لوم|نقد|عتاب|تانيب)/;
  if (directRegretRe.test(words)) return true;

  // شرح المعنى الواقعي للماضي: لم يستمع في الماضي وكان الأفضل أن يستمع
  const enCounterfactual =
    /\b(didn't listen|did not listen|failed to listen|never listened|didn't do|did not do|did not happen)\b/.test(
      words
    ) && /\b(past|mistake|wrong|better|good idea|wish|earlier)\b/.test(words);
  const arCounterfactual =
    /(لم استمع|لم يستمع|لم افعل|لم يفعل|لم يحدث)/.test(words) &&
    /(ماضي|الماضي|كان ينبغي|كان الافضل|كان من الافضل|خطا)/.test(words);

  void norm;
  return enCounterfactual || arCounterfactual;
}

function gradeQ19(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "the results should be ready tomorrow") return false;

  if (/\b(not expectation|not an expectation|no expectation|not expected)\b/.test(words)) return false;
  if (/(ليس توقع|ليست توقع|لا تعبر عن توقع|لا يعبر عن توقع|بدون توقع)/.test(words)) return false;

  const expectRe =
    /\b(expectation|expectations|expected|expect|reasonable prediction|logical prediction|probable|probability|likely|supposed to)\b|(توقع|متوقع|مرجح|مفترض|استنتاج منطقي|احتمال راجح)/;

  if (!expectRe.test(words)) return false;

  // إذا ذكر الطالب «نصيحة» فيجب أن تكون منفية (مثل: توقع وليس نصيحة / expectation, not advice)
  const mentionsAdvice = /\b(advice|recommendation)\b|(نصيح|توصي)/.test(words);
  if (mentionsAdvice) {
    const adviceNegated =
      /\b(not\s+(giving\s+)?advice|rather than advice|instead of advice)\b|(وليس\s+نصيح|وليست\s+نصيح|لا\s+نصيح|غير\s+نصيح|بدل\s+النصيح)/.test(
        norm
      );
    if (!adviceNegated) return false;
  }

  return true;
}

function gradeQ20(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "had better vs should") return false;
  if (/\b(same meaning|no difference)\b|نفس المعني|لا فرق|لا يوجد فرق/.test(words)) return false;

  // رفض الخطأ الشهير: الزعم أن had better للماضي (إلا إذا نفاه الطالب صراحةً مثل not past / ليست للماضي)
  if (/\bpast\b/.test(words) && !/\b(not|isn't|is not|never)\s+(for\s+)?(the\s+)?past\b/.test(words)) {
    return false;
  }
  if (/(الماضي|للماضي|ماضي)/.test(words) && !/(ليس|ليست|لا يدل علي|لا تتحدث عن|لا تعبر عن)\s*(الماضي|للماضي|ماضي)/.test(words)) {
    return false;
  }

  // رفض عكس المقارنة (مثل: should is stronger than had better / had better is weaker than should)
  if (
    /\bshould\b[^.;,،؛]{0,24}\b(is\s+)?(stronger|more urgent|harsher)\b/.test(norm) ||
    /\bhad better\b[^.;,،؛]{0,24}\b(is\s+)?(weaker|softer|less urgent|milder)\b/.test(norm) ||
    /should\s*(هي\s*)?(اقوي|اشد|اكثر الحاحا)/.test(norm) ||
    /had better\s*(هي\s*)?(اضعف|اخف|الطف|اقل قوه)/.test(norm)
  ) {
    return false;
  }

  const strengthOrUrgencyRe =
    /\b(stronger|strong|more urgent|urgent|urgency|forceful|serious|specific situation)\b|(اقوي|اشد|قويه|استعجال|عاجل|الحاح|موقف محدد|موقف خاص)/;
  const warningOrConsequenceRe =
    /\b(warning|warns|warn|consequence|consequences|bad result|negative result|problem|danger|risk|or else|otherwise)\b|(تحذير|يحذر|عاقب|نتيجه سلبيه|نتيجه غير مرغوبه|مشكله|خطر|ضرر|والا)/;

  return strengthOrUrgencyRe.test(words) || warningOrConsequenceRe.test(words);
}

export const TEST_SOLUTIONS_45: readonly SolutionEntry45[] = [
  {
    id: "q1",
    number: 1,
    level: 1,
    modelAnswer: "should",
    concept: "Subject + should + V1 · ثبات الفعل الناقص",
    why: "الفعل الناقص should لا يأخذ -s مع الفاعل المفرد She، ولا يتبعه حرف الجر to، بل يأتي بعده الفعل الأساسي study مباشرة.",
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    modelAnswer: "to",
    concept: "Subject + ought to + V1",
    why: "كلمة to جزء أصيل من تركيب ought to، فنقول: You ought to respect others.",
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    modelAnswer: "Should",
    concept: "Should + Subject + V1? · السؤال بلا do/does",
    why: "نبني السؤال بتقديم الفعل المساعد الناقص Should قبل الفاعل I مباشرة دون استخدام Do أو Does.",
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    modelAnswer: "sleep",
    concept: "Subject + shouldn't + V1",
    why: "بعد shouldn't يأتي الفعل دائمًا بصيغته الأساسية المجردة V1 (sleep) دون -s ودون -ing.",
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    modelAnswer: "leave",
    concept: "Subject + had better ('d better) + V1",
    why: "بعد had better واختصارها 'd better يأتي الفعل بصيغة V1 المجردة مباشرة (leave) دون to ودون -ing.",
  },
  {
    id: "q6",
    number: 6,
    level: 2,
    modelAnswer: "shouldn't / should not",
    concept: "النصيحة بعدم الفعل: shouldn't + V1",
    why: "لنفي النصيحة نضع not بعد should مباشرة (should not أو shouldn't) متبوعةً بالفعل المجرد waste.",
    acceptedEn: [
      "shouldn't",
      "should not",
      "shouldn't waste",
      "should not waste",
      "shouldn't waste water",
      "should not waste water",
      "you shouldn't waste water",
      "you should not waste water",
    ],
  },
  {
    id: "q7",
    number: 7,
    level: 2,
    modelAnswer: "ought (She ought to apologise to her friend.)",
    concept: "تركيب ought to + V1",
    why: "بما أن to apologise موجودة بعد الفراغ في الجملة، فالكلمة الناقصة في الفراغ هي ought (وتُقبل كتابة التركيب أو الجملة كاملة).",
    acceptedEn: [
      "ought",
      "ought to",
      "ought to apologise",
      "ought to apologize",
      "ought to apologise to her friend",
      "ought to apologize to her friend",
      "she ought to apologise to her friend",
      "she ought to apologize to her friend",
    ],
  },
  {
    id: "q8",
    number: 8,
    level: 2,
    modelAnswer: "should (We should have left earlier yesterday, but we didn't.)",
    concept: "تقييم الماضي والندم: should have + V3",
    why: "لأن have left مذكورة بعد الفراغ وسياق yesterday, but we didn't يدل على حدث ماضٍ لم يقع، نكمل بـ should لتكتمل صيغة should have left.",
    acceptedEn: [
      "should",
      "should have",
      "should have left",
      "should've left",
      "we should have left earlier yesterday",
      "we should've left earlier yesterday",
      "we should have left earlier yesterday but we didn't",
      "we should've left earlier yesterday but we didn't",
      "we should have left earlier yesterday but we did not",
      "we should've left earlier yesterday but we did not",
    ],
  },
  {
    id: "q9",
    number: 9,
    level: 2,
    modelAnswer: "shouldn't / should not (He shouldn't have eaten so much yesterday.)",
    concept: "نفي الماضي: shouldn't have + V3",
    why: "حدث الأكل المفرط وقع أمس وكان الأفضل تجنبه؛ ومع وجود have eaten بعد الفراغ نضع shouldn't أو should not.",
    acceptedEn: [
      "shouldn't",
      "should not",
      "shouldn't have",
      "should not have",
      "shouldn't have eaten",
      "should not have eaten",
      "shouldn't've eaten",
      "he shouldn't have eaten so much yesterday",
      "he should not have eaten so much yesterday",
    ],
  },
  {
    id: "q10",
    number: 10,
    level: 2,
    modelAnswer: "should / ought to",
    concept: "التوقع المنطقي المعقول: Expectation",
    why: "للتعبير عن توقع معقول في المستقبل (وصول الطرد غدًا) نستخدم should + V1 أو ought to + V1.",
    acceptedEn: [
      "should",
      "ought to",
      "should arrive",
      "ought to arrive",
      "the package should arrive tomorrow",
      "the package ought to arrive tomorrow",
    ],
  },
  {
    id: "q11",
    number: 11,
    level: 3,
    modelAnswer: "She should study more.",
    concept: "لا نضيف -s إلى الفعل الناقص should",
    why: "صيغة shoulds غير موجودة في الإنجليزية؛ should ثابتة مع جميع الضمائر: She should study more.",
    acceptedEn: ["she should study more"],
  },
  {
    id: "q12",
    number: 12,
    level: 3,
    modelAnswer: "You ought to study harder.",
    concept: "وجوب وجود to بعد ought",
    why: "لا يجوز حذف to بعد ought؛ التصحيح الصحيح هو: You ought to study harder.",
    acceptedEn: ["you ought to study harder"],
  },
  {
    id: "q13",
    number: 13,
    level: 3,
    modelAnswer: "Should I leave now?",
    concept: "بناء السؤال بتقديم Should بلا Do",
    why: "لا نستخدم الفعل المساعد Do مع الفعل الناقص should؛ نضع Should في أول السؤال: Should I leave now?",
    acceptedEn: ["should i leave now"],
  },
  {
    id: "q14",
    number: 14,
    level: 3,
    modelAnswer: "He should have gone home earlier.",
    concept: "استخدام التصريف الثالث V3 بعد should have",
    why: "بعد should have يأتي التصريف الثالث V3 (gone) وليس الماضي البسيط V2 (went): He should have gone home earlier.",
    acceptedEn: [
      "he should have gone home earlier",
      "he should've gone home earlier",
    ],
  },
  {
    id: "q15",
    number: 15,
    level: 3,
    modelAnswer: "You had better take an umbrella.",
    concept: "had better + V1 بدون to",
    why: "بعد had better (أو اختصارها You'd better) يأتي الفعل المجرد V1 مباشرة دون to: You had better take an umbrella.",
    acceptedEn: [
      "you had better take an umbrella",
      "you'd better take an umbrella",
    ],
  },
  {
    id: "q16",
    number: 16,
    level: 4,
    modelAnswer: "You should study = نصيحة وتوصية · You must study = إلزام قوي أو ضرورة",
    concept: "التمييز بين النصيحة (should) والإلزام القوي (must)",
    why: "تُقدّم should نصيحة وتوصية بما هو أفضل دون إجبار، بينما تعبّر must عن ضرورة قوية أو إلزام واجب التنفيذ.",
  },
  {
    id: "q17",
    number: 17,
    level: 4,
    modelAnswer: "You shouldn't enter = نصيحة بعدم الدخول · You mustn't enter = منع باتّ أو حظر",
    concept: "التمييز بين النصيحة بعدم الفعل (shouldn't) والمنع (mustn't)",
    why: "تعني shouldn't أن الفعل غير مستحسن ومن الأفضل تجنبه، أما mustn't فتعني أن الفعل ممنوع أو محظور تمامًا.",
  },
  {
    id: "q18",
    number: 18,
    level: 4,
    modelAnswer: "ندم أو لوم الذات على عدم الاستماع للمعلم في الماضي (Past regret)",
    concept: "المعنى الدلالي لـ should have + V3",
    why: "صيغة should have listened تعني أن المتحدث لم يستمع إلى معلمه في الماضي، ويشعر الآن بالندم أو يلوم نفسه لأن الاستماع كان القرار الأفضل.",
  },
  {
    id: "q19",
    number: 19,
    level: 4,
    modelAnswer: "توقع منطقي معقول في المستقبل (Reasonable expectation)",
    concept: "استخدام should للتوقع المعقول",
    why: "الفاعل هنا The results (النتائج)، فالجملة لا توجه نصيحة بل تعبّر عن توقع منطقي مبني على سير الأمور بأن النتائج ستكون جاهزة غدًا.",
  },
  {
    id: "q20",
    number: 20,
    level: 4,
    modelAnswer: "HAD BETTER نصيحة أقوى لموقف محدد وتحمل تحذيرًا من نتيجة سلبية إن لم تُتّبع",
    concept: "الفرق في القوة والعاقبة بين had better و should",
    why: "تُعطي should نصيحة عامة هادئة، بينما تُستخدم had better لنصيحة أقوى وأكثر إلحاحًا في موقف محدد يترتب على إهماله ضرر أو عاقبة غير مرغوبة.",
  },
  {
    id: "q21",
    number: 21,
    level: 5,
    modelAnswer: "should",
    concept: "طلب النصيحة بـ What should I do?",
    why: "للسؤال عن النصيحة مع أداة الاستفهام What دون وجود to بعد الفاعل نستخدم should: What should I do?",
    acceptedEn: ["should", "what should i do"],
  },
  {
    id: "q22",
    number: 22,
    level: 5,
    modelAnswer: "should / ought to",
    concept: "تقديم النصيحة المباشرة",
    why: "يقدّم عمر نصيحة عملية لمايا، فتصح should + V1 كما تصح ought to + V1: You should revise...",
    acceptedEn: [
      "should",
      "ought to",
      "should revise",
      "ought to revise",
      "you should revise the most important topics first",
      "you ought to revise the most important topics first",
    ],
  },
  {
    id: "q23",
    number: 23,
    level: 5,
    modelAnswer: "should / ought to (You should have started earlier.)",
    concept: "ما كان الأفضل فعله في الماضي: should have + V3",
    why: "للتعليق على خطوة ماضية كان الأفضل القيام بها — ومع وجود have started بعد الفراغ — نستخدم should أو ought to.",
    acceptedEn: [
      "should",
      "ought to",
      "should have",
      "ought to have",
      "should have started",
      "should've started",
      "ought to have started",
      "you should have started earlier",
      "you should've started earlier",
      "you ought to have started earlier",
    ],
  },
  {
    id: "q24",
    number: 24,
    level: 5,
    modelAnswer: "shouldn't / should not (You shouldn't have stayed up so late.)",
    concept: "فعل ماضٍ وقع وكان الأفضل تجنبه: shouldn't have + V3",
    why: "السهر الطويل حدث فعلًا في الماضي وكان خطأً ينبغي تجنبه؛ ومع وجود have stayed بعد الفراغ نضع shouldn't أو should not.",
    acceptedEn: [
      "shouldn't",
      "should not",
      "ought not to",
      "oughtn't to",
      "shouldn't have",
      "should not have",
      "ought not to have",
      "shouldn't have stayed",
      "shouldn't have stayed up",
      "shouldn't've stayed",
      "shouldn't've stayed up",
      "should not have stayed up",
      "you shouldn't have stayed up so late",
      "you shouldn't've stayed up so late",
      "you should not have stayed up so late",
      "you ought not to have stayed up so late",
    ],
  },
  {
    id: "q25",
    number: 25,
    level: 5,
    modelAnswer: "should / ought to",
    concept: "التوقع المعقول المشروط بالاستعداد",
    why: "تعبر الجملة عن توقع منطقي مطمئن بناءً على الاستعداد الجيد: It should be manageable if we've prepared well.",
    acceptedEn: [
      "should",
      "ought to",
      "should be",
      "ought to be",
      "it should be manageable",
      "it ought to be manageable",
      "it should be manageable if we've prepared well",
      "it should be manageable if we have prepared well",
      "it ought to be manageable if we've prepared well",
      "it ought to be manageable if we have prepared well",
    ],
  },
] as const;

export const TEST_KEY_45: Readonly<Record<string, string>> = Object.fromEntries(
  TEST_SOLUTIONS_45.map((entry) => [entry.id, entry.modelAnswer])
);

const SOLUTION_MAP_45 = new Map<string, SolutionEntry45>(
  TEST_SOLUTIONS_45.map((entry) => [entry.id, entry])
);

export function gradeQuestion45(question: TestQuestion45, rawAnswer: string): boolean {
  const sol = SOLUTION_MAP_45.get(question.id);
  if (!sol) return false;
  if (!rawAnswer || !rawAnswer.trim()) return false;

  if (question.type === "choice") {
    return normalizeEn45(rawAnswer) === normalizeEn45(sol.modelAnswer);
  }

  if (question.id === "q16") return gradeQ16(rawAnswer);
  if (question.id === "q17") return gradeQ17(rawAnswer);
  if (question.id === "q18") return gradeQ18(rawAnswer);
  if (question.id === "q19") return gradeQ19(rawAnswer);
  if (question.id === "q20") return gradeQ20(rawAnswer);

  const normalized = normalizeEn45(rawAnswer);
  if (!normalized) return false;
  const accepted = (sol.acceptedEn ?? [sol.modelAnswer]).map(normalizeEn45);
  return accepted.includes(normalized);
}

export type GradedTestResult45 = {
  score: number;
  total: number;
  byQuestion: Record<string, boolean>;
  byLevel: Record<number, { score: number; total: number }>;
  solutions: Readonly<Record<string, SolutionEntry45>>;
};

export function gradeTest45(answers: Record<string, string>): GradedTestResult45 {
  let score = 0;
  const byQuestion: Record<string, boolean> = {};
  const byLevel: Record<number, { score: number; total: number }> = {
    1: { score: 0, total: 0 },
    2: { score: 0, total: 0 },
    3: { score: 0, total: 0 },
    4: { score: 0, total: 0 },
    5: { score: 0, total: 0 },
  };
  const solutions: Record<string, SolutionEntry45> = {};

  for (const q of TEST_QUESTIONS_45) {
    const ok = gradeQuestion45(q, answers[q.id] ?? "");
    byQuestion[q.id] = ok;
    byLevel[q.level].total += 1;
    if (ok) {
      score += 1;
      byLevel[q.level].score += 1;
    }
    const sol = SOLUTION_MAP_45.get(q.id);
    if (sol) solutions[q.id] = sol;
  }

  return {
    score,
    total: TEST_QUESTIONS_45.length,
    byQuestion,
    byLevel,
    solutions,
  };
}
