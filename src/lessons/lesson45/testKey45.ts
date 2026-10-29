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

/**
 * يستبدل كلمة not الملاصقة للأفعال الناقصة (مثل should not / must not / ought not)
 * بصيغة مدمجة حتى لا تُفسَّر not الخاصة باسم الفعل على أنها نفي للخبر الدلالي بعدها.
 */
function collapseModalNegationTokens(clauseTokens: string): string {
  return clauseTokens
    .replace(/\bshould\s+not\b/g, "shouldnt")
    .replace(/\bmust\s+not\b/g, "mustnt")
    .replace(/\bought\s+not(\s+to)?\b/g, "oughtnt")
    .replace(/\bhad\s+better\s+not\b/g, "hadbetternot")
    .replace(/\bdo\s+not\s+have\s+to\b/g, "donthaveto")
    .replace(/\bdoes\s+not\s+have\s+to\b/g, "doesnthaveto");
}

const EN_PREDICATE_NEG_PREFIX =
  /\b(?:not|no|neither|nor|never|without|isn't|aren't|doesn't|don't|didn't|cannot|can't|rather\s+than|instead\s+of)\s+(?:[a-z']+\s+){0,3}$/;
const AR_PREDICATE_NEG_PREFIX =
  /(?:^|\s)و?(?:لا|ليس|ليست|غير|بدون|بلا|دون|بدل)\s+(?:[\u0600-\u06FF]+\s+){0,2}$/;

/** يعيد فهرس أول تطابق غير منفي للمفهوم داخل النص المطبّع، أو -1 إن كانت كل التطابقات منفية */
function firstUnnegatedIndex(rawSegment: string, conceptRe: RegExp): number {
  const seg = collapseModalNegationTokens(cleanBilingualTokens(rawSegment));
  if (!seg) return -1;
  const globalRe = new RegExp(conceptRe.source, "gu");
  for (const m of seg.matchAll(globalRe)) {
    const idx = m.index ?? 0;
    const prefix = seg.slice(Math.max(0, idx - 42), idx);
    if (EN_PREDICATE_NEG_PREFIX.test(prefix) || AR_PREDICATE_NEG_PREFIX.test(prefix)) {
      continue;
    }
    return idx;
  }
  return -1;
}

const CONTRAST_SPLIT_RE =
  /[.;,،؛\n]+|\b(?:while|whereas|but|and|whilst|yet|vs|versus)\b|(?:بينما|اما|ولكن|لكن|في حين|مقابل)|(?=\s+(?:والثانيه|والثاني|ثانيا)(?:\s|$))|\s+و(?=(?:ال)?(?:نصيح|توصي|ارشاد|الزام|ضرور|واجب|منع|ممنوع|حظر|محظور)|should|must)/;

function gradeQ16(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "you should study vs you must study") return false;
  if (/\b(same meaning|no difference)\b|نفس المعني|لا فرق|لا يوجد فرق/.test(words)) return false;
  if (/\bboth\b[^.;,،؛]{0,35}\b(advice|obligation|obligatory|compulsory|necessity|optional)\b/.test(norm)) {
    return false;
  }
  if (/كلاهما\s+(?:يفيد|يعني|تدل علي|ل)?\s*(?:ال)?(نصيحه|الزام|ضروره|واجب|اجبار)/.test(norm)) {
    return false;
  }

  const adviceRe =
    /\b(advice|advise|advises|advising|recommend|recommends|recommended|recommendation|suggest|suggests|suggestion|good idea|optional|mild|gentle)\b|(نصيح|توصي|ارشاد|اقتراح|افضل|يفضل|مناسب|غير الزامي|اختياري)/;
  const obligRe =
    /\b(obligation|obligatory|necessity|necessary|compulsory|required|requirement|duty|rule|law|order|command|forced|have to)\b|(الزام|ضرور|واجب|اجبار|فرض|لازم|حتمي|قانون|امر)/;

  const clauses16 = norm.split(CONTRAST_SPLIT_RE).filter((c) => c.trim().length > 0);

  let hasPositiveAdvice = false;
  let hasPositiveOblig = false;

  for (const clause of clauses16) {
    const cTokens = collapseModalNegationTokens(cleanBilingualTokens(clause));
    if (!cTokens) continue;

    const advIdx = firstUnnegatedIndex(clause, adviceRe);
    const oblIdx = firstUnnegatedIndex(clause, obligRe);
    if (advIdx >= 0) hasPositiveAdvice = true;
    if (oblIdx >= 0) hasPositiveOblig = true;

    const mentionsShould = /\b(should|first|1st)\b|(?:^|\s)و?(?:الاولي|الاول)(?:\s|$)/.test(cTokens);
    const mentionsMust = /\b(must|second|2nd)\b|(?:^|\s)و?(?:الثانيه|الثاني)(?:\s|$)/.test(cTokens);

    // رفض القلب الصريح للأدوار في أي اتجاه داخل الشق المنسوب لطرف واحد
    if (mentionsShould && !mentionsMust && oblIdx >= 0) {
      return false;
    }
    if (mentionsMust && !mentionsShould && advIdx >= 0) {
      const comparativeOk =
        /\b(more than|stronger than)\b|(اقوي من|اشد من|اكثر من)/.test(cTokens);
      if (!comparativeOk) return false;
    }
  }

  // يجب إثبات المفهومين معًا بشكل غير منفي (لا يكفي تعريف طرف واحد بنفي الآخر مثل "advice, not obligation")
  if (!hasPositiveAdvice || !hasPositiveOblig) return false;

  // في الإجابات المختصرة المكونة من شقين دون تسمية الفعلين (مثل: advice; obligation)، الترتيب يتبع ترتيب الجملتين
  const mentionsModalsOrOrdinals =
    /\b(should|must|first|1st|second|2nd)\b|(?:^|\s)و?(?:الاولي|الثانيه|الاول|الثاني)(?:\s|$)/.test(
      collapseModalNegationTokens(words)
    );
  if (!mentionsModalsOrOrdinals) {
    const firstAdvice = firstUnnegatedIndex(raw, adviceRe);
    const firstOblig = firstUnnegatedIndex(raw, obligRe);
    if (firstOblig >= 0 && firstAdvice >= 0 && firstOblig < firstAdvice) return false;
  }

  return true;
}

function gradeQ17(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "you shouldn't enter vs you mustn't enter") return false;
  if (/\b(same meaning|no difference)\b|نفس المعني|لا فرق|لا يوجد فرق/.test(words)) return false;
  if (/\bboth\b[^.;,،؛]{0,35}\b(advice|prohibition|prohibited|forbidden|not allowed|ban)\b/.test(norm)) {
    return false;
  }
  if (/كلاهما\s+(?:يفيد|يعني|ل)?\s*(?:ال)?(نصيحه|منع|ممنوع|حظر|محظور)/.test(norm)) {
    return false;
  }

  const adviceRe =
    /\b(advice|advise|advises|advising|advised|recommend|recommends|recommended|recommendation|not recommended|not a good idea|bad idea|better not|unwise|suggest|suggests|suggested|suggestion|optional)\b|(نصيح|توصي|ارشاد|افضل الا|افضل عدم|يفضل عدم|غير مناسب|غير مستحسن|يستحسن عدم|تجنب|التجنب|تحذير لطيف|لا ينصح)/;
  const prohibRe =
    /\b(prohibition|prohibited|forbid|forbids|forbidden|not allowed|disallow|disallowed|ban|banned|against the rules|illegal|strictly not)\b|(منع|ممنوع|حظر|محظور|غير مسموح|لا يسمح|قانون|تحريم|محرم)/;

  const clauses17 = norm.split(CONTRAST_SPLIT_RE).filter((c) => c.trim().length > 0);

  let hasPositiveAdvice = false;
  let hasPositiveProhib = false;

  for (const clause of clauses17) {
    const cTokens = collapseModalNegationTokens(cleanBilingualTokens(clause));
    if (!cTokens) continue;

    const advIdx = firstUnnegatedIndex(clause, adviceRe);
    const proIdx = firstUnnegatedIndex(clause, prohibRe);
    if (advIdx >= 0) hasPositiveAdvice = true;
    if (proIdx >= 0) hasPositiveProhib = true;

    const mentionsShouldnt =
      /\b(shouldn't|shouldnt|first|1st)\b|(?:^|\s)و?(?:الاولي|الاول)(?:\s|$)/.test(cTokens);
    const mentionsMustnt =
      /\b(mustn't|mustnt|second|2nd)\b|(?:^|\s)و?(?:الثانيه|الثاني)(?:\s|$)/.test(cTokens);

    if (mentionsShouldnt && !mentionsMustnt && proIdx >= 0) {
      return false;
    }
    if (mentionsMustnt && !mentionsShouldnt && advIdx >= 0) {
      const comparativeOk =
        /\b(more than|stronger than)\b|(اقوي من|اشد من|اكثر من)/.test(cTokens);
      if (!comparativeOk) return false;
    }
  }

  if (!hasPositiveAdvice || !hasPositiveProhib) return false;

  const mentionsModalsOrOrdinals =
    /\b(shouldn't|shouldnt|mustn't|mustnt|first|1st|second|2nd)\b|(?:^|\s)و?(?:الاولي|الثانيه|الاول|الثاني)(?:\s|$)/.test(
      collapseModalNegationTokens(words)
    );
  if (!mentionsModalsOrOrdinals) {
    const firstAdvice = firstUnnegatedIndex(raw, adviceRe);
    const firstProhib = firstUnnegatedIndex(raw, prohibRe);
    if (firstProhib >= 0 && firstAdvice >= 0 && firstProhib < firstAdvice) return false;
  }

  return true;
}

function gradeQ18(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "i should have listened to my teacher") return false;

  // رفض النفي الصريح للندم أو تحويل الزمن إلى نصيحة/توقع مستقبلي أو حاضر
  if (
    /\b(no regret|not regret|without regret|future advice|present advice|future expectation|future obligation|tomorrow)\b/.test(
      words
    ) ||
    /\b(not|no|never|doesn't|does not|don't|do not|isn't|is not)\s+([a-z']+\s+){0,3}(regret|remorse|criticism|blame)\b/.test(
      words
    ) ||
    (/\bfuture\b/.test(words) && !/\b(not|isn't|is not|no)\s+(?:[a-z']+\s+){0,2}future\b/.test(words))
  ) {
    return false;
  }
  if (
    /(لا ندم|ليس ندما|ليست ندما|بدون ندم|ليس فيها ندم|نصيحه للحاضر|نصيحه للمستقبل|توقع مستقبلي|غدا)/.test(words) ||
    /(لا|ليس|ليست)\s+(تعني|يعني|تعبر عن|يعبر عن|تدل علي|يدل علي|تفيد|يفيد)?\s*(?:ال)?(ندم|تاسف|لوم|عتاب)/.test(words) ||
    (/(المستقبل|للمستقبل|مستقبل)/.test(words) && !/(ليس|ليست|لا)\s+(?:[\u0600-\u06FF]+\s+){0,2}(المستقبل|للمستقبل|مستقبل)/.test(words))
  ) {
    return false;
  }

  // رفض عكس الواقع الماضي (الخلط مع shouldn't have: الزعم أنه استمع فعلًا ويندم على الاستماع)
  if (
    /\bregret(s|ted|ting)?\s+(for\s+)?listening\b/.test(words) ||
    /\b(because|that)\s+(i|he|she|the speaker)\s+(listened|did listen|followed)\b/.test(words)
  ) {
    return false;
  }
  if (
    /(ندم|نادم|تاسف|لوم)\s+علي\s+الاستماع/.test(words) ||
    /(لانه|لاني|لانني|لان المتحدث)\s+(استمع|استمعت|سمع|اطاع)/.test(words)
  ) {
    return false;
  }

  const directRegretRe =
    /\b(regret|regretting|regretful|remorse|criticism|self criticism|blaming|blame|wish i had|wishes|feeling sorry)\b|(ندم|نادم|تاسف|حسره|لوم|نقد|عتاب|تانيب)/;
  if (firstUnnegatedIndex(raw, directRegretRe) >= 0) return true;

  // شرح المعنى الواقعي للماضي: لم يستمع في الماضي وكان الأفضل أن يستمع
  const enCounterfactual =
    /\b(didn't listen|did not listen|failed to listen|never listened|didn't do|did not do|did not happen|didn't follow|did not follow)\b/.test(
      words
    ) && /\b(past|mistake|wrong|better|good idea|wish|earlier|should)\b/.test(words);
  const arCounterfactual =
    /(لم استمع|لم يستمع|لم افعل|لم يفعل|لم يحدث|لم يقع|عدم الاستماع|ما استمع|ما استمعت)/.test(words) &&
    /(ماضي|الماضي|كان ينبغي|كان الافضل|كان من الافضل|خطا|تقصير)/.test(words);

  void norm;
  return enCounterfactual || arCounterfactual;
}

function gradeQ19(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "the results should be ready tomorrow") return false;

  // رفض أي صيغة نفي للتوقع
  if (
    /\b(not|no|never|neither|isn't|is not|doesn't|does not|don't|do not|without)\s+([a-z']+\s+){0,3}(expectation|expectations|expected|expect|prediction|probable|probability|likely)\b/.test(
      words
    )
  ) {
    return false;
  }
  if (
    /(لا|ليس|ليست|غير|بدون|بلا)\s+([\u0600-\u06FF]+\s+){0,2}(?:ال)?(توقع|توقعا|متوقع|متوقعه|مرجح|احتمال)/.test(
      words
    )
  ) {
    return false;
  }

  // رفض الخلط الزمني مع الماضي (الجملة عن tomorrow)
  if (/\b(past|yesterday)\b/.test(words) && !/\bnot\s+(?:[a-z']+\s+){0,2}past\b/.test(words)) {
    return false;
  }
  if (/(الماضي|للماضي|ماضي|امس)/.test(words) && !/(ليس|ليست|لا)\s+(?:[\u0600-\u06FF]+\s+){0,2}(الماضي|للماضي|ماضي)/.test(words)) {
    return false;
  }

  const expectRe =
    /\b(expectation|expectations|expected|expect|reasonable prediction|logical prediction|probable|probability|likely|supposed to)\b|(توقع|متوقع|مرجح|مفترض|استنتاج منطقي|احتمال راجح)/;

  if (firstUnnegatedIndex(raw, expectRe) < 0) return false;

  // إذا ذكر الطالب وظيفة منافسة (نصيحة / إلزام / منع / ندم) فيجب أن تكون منفية صراحةً (مثل: توقع وليس نصيحة)
  const competingRe =
    /\b(advice|recommendation|obligation|obligatory|compulsory|prohibition|forbidden|regret|remorse)\b|(نصيح|توصي|الزام|اجبار|منع|حظر|ندم|لوم)/;
  if (competingRe.test(words) && firstUnnegatedIndex(raw, competingRe) >= 0) {
    return false;
  }

  void norm;
  return true;
}

function gradeQ20(raw: string): boolean {
  const norm = normalizeBilingual45(raw);
  const words = cleanBilingualTokens(raw);
  if (!words || words === "had better vs should") return false;
  if (/\b(same meaning|no difference)\b|نفس المعني|لا فرق|لا يوجد فرق/.test(words)) return false;

  // منع القبول بكلمة مفردة عامة مثل "strong" أو "problem" أو "مشكلة"
  const tokenCount = words.split(" ").filter(Boolean).length;
  if (tokenCount < 2) return false;

  // رفض الخطأ الشهير: الزعم أن had better للماضي (إلا إذا نفاه الطالب صراحةً مثل not past / ليست للماضي)
  if (/\bpast\b/.test(words) && !/\b(not|isn't|is not|never)\s+(for\s+)?(the\s+)?past\b/.test(words)) {
    return false;
  }
  if (/(الماضي|للماضي|ماضي)/.test(words) && !/(ليس|ليست|لا يدل علي|لا تتحدث عن|لا تعبر عن)\s*(الماضي|للماضي|ماضي)/.test(words)) {
    return false;
  }

  // رفض عكس المقارنة أو عكس نسبة التحذير/العاقبة
  if (
    /\bshould\b[^.;,،؛]{0,30}\b(is\s+|gives\s+|has\s+|carries\s+|means\s+)?(stronger|more urgent|harsher|warning|warns|consequence|bad result|negative result)\b/.test(
      norm
    ) ||
    /\bhad better\b[^.;,،؛]{0,30}\b(is\s+|gives\s+|means\s+)?(weaker|softer|less urgent|milder|general advice|calm advice|mild advice)\b/.test(
      norm
    ) ||
    /should\s*(هي\s*|تفيد\s*|تعطي\s*|تحمل\s*|لل)?(اقوي|اشد|اكثر الحاحا|تحذير|عاقبه)/.test(norm) ||
    /had better\s*(هي\s*|تفيد\s*|تعطي\s*)?(اضعف|اخف|الطف|اقل قوه|نصيحه عامه|نصيحه هادئه)/.test(norm)
  ) {
    return false;
  }

  const strengthOrUrgencyRe =
    /\b(stronger|strong advice|more urgent|urgent|urgency|forceful|specific situation)\b|(اقوي|اشد|نصيحه قويه|استعجال|عاجل|الحاح|موقف محدد|موقف خاص)/;
  const warningOrConsequenceRe =
    /\b(warning|warns|warn|consequence|consequences|bad result|negative result|danger|risk|or else|otherwise)\b|(تحذير|يحذر|عاقب|نتيجه سلبيه|نتيجه غير مرغوبه|خطر|ضرر|والا)/;

  return (
    firstUnnegatedIndex(raw, strengthOrUrgencyRe) >= 0 ||
    firstUnnegatedIndex(raw, warningOrConsequenceRe) >= 0
  );
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
      "should have left earlier",
      "should've left earlier",
      "should have left earlier yesterday",
      "should've left earlier yesterday",
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
      "shouldn't have eaten so much",
      "should not have eaten so much",
      "shouldn't've eaten so much",
      "shouldn't have eaten so much yesterday",
      "should not have eaten so much yesterday",
      "he shouldn't have eaten so much yesterday",
      "he should not have eaten so much yesterday",
      "he shouldn't've eaten so much yesterday",
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
      "should arrive tomorrow",
      "ought to arrive tomorrow",
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
      "should revise the most important topics first",
      "ought to revise the most important topics first",
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
      "should have started earlier",
      "should've started earlier",
      "ought to have started earlier",
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
      "oughtn't to have",
      "shouldn't have stayed",
      "shouldn't have stayed up",
      "shouldn't've stayed",
      "shouldn't've stayed up",
      "should not have stayed",
      "should not have stayed up",
      "ought not to have stayed",
      "ought not to have stayed up",
      "shouldn't have stayed up so late",
      "should not have stayed up so late",
      "ought not to have stayed up so late",
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
