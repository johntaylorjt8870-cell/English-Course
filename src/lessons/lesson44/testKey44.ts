// Dynamically imported ONLY upon test submission (never in the pre-submit student bundle).
import type { TestAnswers44 } from "./testData44";

export interface QuestionGrade44 {
  id: string;
  number: number;
  level: number;
  correct: boolean;
  studentAnswer: string;
  canonicalAnswer: string;
  explanation: string;
}

export interface TestGradeReport44 {
  score: number;
  total: number;
  percent: number;
  byLevel: { level: number; correct: number; total: number }[];
  items: Record<string, QuestionGrade44>;
  wrongIds: string[];
}

function normEn(raw: string): string {
  return raw
    .replace(/[’‘`]/g, "'")
    .replace(/[.?!؟،,;]+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normAr(raw: string): string {
  return raw
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

interface KeySpec44 {
  level: number;
  canonical: string;
  explanation: string;
  check: (a0: string, a1: string) => boolean;
}

const KEY_SPECS_44: Record<string, KeySpec44> = {
  q1: {
    level: 1,
    canonical: "B — must",
    explanation:
      "MUST فعل مساعد ناقص ثابت الصيغة لا يُضاف إليه s ولا يتبعه to، فنقول: She must finish.",
    check: (a0) => /^b\b/i.test(a0.trim()) || normEn(a0) === "must",
  },
  q2: {
    level: 1,
    canonical: "B — has to",
    explanation:
      "الفاعل He مفرد غائب في المضارع البسيط، لذلك تتصرف HAVE TO معه إلى has to.",
    check: (a0) => /^b\b/i.test(a0.trim()) || normEn(a0) === "has to",
  },
  q3: {
    level: 1,
    canonical: "B — Does",
    explanation:
      "السؤال عن الالتزام الحاضر مع المفرد الغائب She يُبنى بـ Does + she + have to + V1.",
    check: (a0) => /^b\b/i.test(a0.trim()) || normEn(a0) === "does",
  },
  q4: {
    level: 1,
    canonical: "A — had to",
    explanation:
      "وجود yesterday يدل على الماضي؛ لا توجد صيغة اسمها musted، ونستخدم had to.",
    check: (a0) => /^a\b/i.test(a0.trim()) || normEn(a0) === "had to",
  },
  q5: {
    level: 1,
    canonical: "C — have to",
    explanation:
      "بعد الفعل المساعد will يأتي الفعل بصيغته الأساسية المجردة have to دون تصريف.",
    check: (a0) => /^c\b/i.test(a0.trim()) || normEn(a0) === "have to",
  },

  // Level 2: Complete the Sentences
  q6: {
    level: 2,
    canonical: "mustn't (أو must not)",
    explanation:
      "المطلوب هو المنع القاطع من لمس السلك الخطر، فنستخدم mustn't (أو must not) + V1.",
    check: (a0) =>
      [
        "mustn't",
        "must not",
        "mustnt",
        "mustn't touch",
        "must not touch",
        "you mustn't touch this dangerous wire",
        "you must not touch this dangerous wire",
      ].includes(normEn(a0)),
  },
  q7: {
    level: 2,
    canonical: "doesn't have to (أو does not have to)",
    explanation:
      "المطلوب عدم الضرورة مع الفاعل المفرد الغائب She، فنستخدم doesn't have to ويعود الفعل إلى have.",
    check: (a0) =>
      [
        "doesn't have to",
        "does not have to",
        "doesnt have to",
        "doesn't have to come",
        "does not have to come",
        "she doesn't have to come tomorrow",
        "she does not have to come tomorrow",
      ].includes(normEn(a0)),
  },
  q8: {
    level: 2,
    canonical: "had to",
    explanation:
      "وجود yesterday يدل على التزام وقع في الماضي، فنستخدم had to + V1.",
    check: (a0) =>
      [
        "had to",
        "had to finish",
        "we had to finish the project yesterday",
      ].includes(normEn(a0)),
  },
  q9: {
    level: 2,
    canonical: "Did ... have to",
    explanation:
      "في سؤال الماضي مع last week نبدأ بـ Did لتحمل زمن الماضي، ويعود الفعل إلى have to.",
    check: (a0, a1) => {
      const f0 = normEn(a0);
      const f1 = normEn(a1);
      if (f0 === "did" && (f1 === "have to" || f1 === "have to pay")) return true;
      const joined = normEn(`${a0} ${a1}`);
      return (
        joined === "did have to" ||
        joined === "did you have to" ||
        joined === "did you have to pay for the tickets last week"
      );
    },
  },
  q10: {
    level: 2,
    canonical: "won't have to (أو will not have to)",
    explanation:
      "مع next Friday ونفي الالتزام في المستقبل نستخدم won't have to (أو will not have to).",
    check: (a0) =>
      [
        "won't have to",
        "will not have to",
        "wont have to",
        "won't have to work",
        "will not have to work",
        "they won't have to work next Friday".toLowerCase(),
        "they will not have to work next Friday".toLowerCase(),
      ].includes(normEn(a0)),
  },

  // Level 3: Correct the Mistakes
  q11: {
    level: 3,
    canonical: "He must study harder.",
    explanation: "لا نضيف s إلى MUST مع أي فاعل؛ الصحيح: He must study harder.",
    check: (a0) =>
      ["he must study harder", "must study harder", "he must study"].includes(normEn(a0)),
  },
  q12: {
    level: 3,
    canonical: "She has to wear a uniform.",
    explanation: "الفاعل She مفرد غائب فيأخذ has to وليس have to.",
    check: (a0) =>
      ["she has to wear a uniform", "has to wear a uniform"].includes(normEn(a0)),
  },
  q13: {
    level: 3,
    canonical: "Does he have to leave now?",
    explanation: "بعد الفعل المساعد Does يعود الفعل إلى صيغته الأساسية have to لا has to.",
    check: (a0) =>
      ["does he have to leave now", "have to leave now"].includes(normEn(a0)),
  },
  q14: {
    level: 3,
    canonical: "I didn't have to work yesterday.",
    explanation: "بعد didn't يعود الفعل إلى صيغته الأساسية have to وليس had to.",
    check: (a0) =>
      [
        "i didn't have to work yesterday",
        "i did not have to work yesterday",
        "i didnt have to work yesterday",
        "didn't have to work yesterday",
      ].includes(normEn(a0)),
  },
  q15: {
    level: 3,
    canonical: "She will have to finish the project.",
    explanation: "بعد will نستخدم دائمًا الصيغة الأساسية have to لا has to.",
    check: (a0) =>
      [
        "she will have to finish the project",
        "she'll have to finish the project",
        "will have to finish the project",
      ].includes(normEn(a0)),
  },

  // Level 4: Understand the Meaning (Bilingual Conceptual Matcher)
  q16: {
    level: 4,
    canonical:
      "الجملة الأولى (mustn't) تعني المنع القاطع من الدخول، والثانية (don't have to) تعني عدم الضرورة (غير ملزم بالدخول).",
    explanation:
      "MUSTN'T تفيد الحظر التام (Prohibition)، بينما DON'T HAVE TO تفيد غياب الإلزام والاختيار (Lack of Necessity).",
    check: (a0) => {
      const t = normAr(a0);
      const hasBan =
        /(منع|ممنوع|يحظر|محظور|حظر|لا يسمح|غير مسموح|prohibit|forbidden|not allowed|ban)/i.test(
          t
        );
      const hasOpt =
        /(عدم الضروره|غير ضروري|ليس ضروري|لست مضطر|ليس مضطر|غير ملزم|ليس ملزم|اختياري|ليس عليك|لا يجب|lack of necessity|not necessary|optional|don'?t need)/i.test(
          t
        );
      return hasBan && hasOpt;
    },
  },
  q17: {
    level: 4,
    canonical:
      "لأن MUST فعل ناقص ليس له صيغة ماضية (لا توجد musted)، فنستخدم HAD TO للتعبير عن الضرورة في الماضي.",
    explanation:
      "لا تتصرف MUST في الماضي؛ لذلك تحل صيغة HAD TO + V1 محلها للتعبير عن الالتزامات الماضية.",
    check: (a0) => {
      const t = normAr(a0);
      return /(ليس لها ماض|لا ماضي|لا تتصرف|لا يتصرف|لا تتغير|صيغه ماضيه|في الماضي|بديل|musted|no past|past form|past tense)/i.test(
        t
      );
    },
  },
  q18: {
    level: 4,
    canonical:
      "نعم، كلتاهما صحيحة في القوانين والتعليمات؛ تبدو MUST أكثر رسمية وقوة، بينما تشيع HAVE TO في وصف المتطلبات والأنظمة اليومية.",
    explanation:
      "تتداخل MUST وHAVE TO في القواعد واللوائح؛ تميل MUST إلى الصياغة الرسمية المكتوبة، وتشيع HAVE TO في نقل الأنظمة اليومية.",
    check: (a0) => {
      const t = normAr(a0);
      if (/^(لا\b|لا يمكن|خطا)/.test(t)) return false;
      return (
        /(نعم|كلتاهما|كلاهما|الاثنتان|يمكن|تستخدمان|صحيحتان|يجوز|yes|both|can be used)/i.test(
          t
        ) && t.length >= 10
      );
    },
  },
  q19: {
    level: 4,
    canonical:
      "الأولى تعبّر عن ضرورة يؤكدها المتحدث لنفسه بدافع شخصي، والثانية تعبّر عن ضرورة عملية فرضها ظرف خارجي (امتحان الغد).",
    explanation:
      "I must improve تعكس تأكيدًا ذاتيًا من المتحدث، بينما I have to study tonight ترتبط بمتطلب خارجي محدد هو الامتحان غدًا.",
    check: (a0) => {
      const t = normAr(a0);
      const hasPersonal =
        /(المتحدث|شخصي|شخصيه|ذاتي|نفسه|داخلي|قناعه|تاكيد|رغبه|personal|speaker|internal)/i.test(
          t
        );
      const hasExternal =
        /(خارجي|خارجيه|ظرف|امتحان|اختبار|عملي|سبب|واقعي|external|exam|circumstance|requirement)/i.test(
          t
        );
      return hasPersonal && hasExternal;
    },
  },
  q20: {
    level: 4,
    canonical:
      "لا؛ الجملة تعني فقط أن إنهاء التقرير لم يكن إلزاميًا أمس، ولا تخبرنا وحدها إن كان المتحدث قد أنهاه فعلًا أم لا.",
    explanation:
      "didn't have to تنفي الوجوب فقط ولا تنفي وقوع الحدث؛ فقد يقول المتحدث: ...but I finished it anyway.",
    check: (a0) => {
      const t = normAr(a0);
      if (/^(نعم\b|اجل\b|yes\b)/i.test(t)) return false;
      const hasNo = /(^لا\b|لا تعني|لا تخبرنا|ليس بالضروره|لا تدل|no\b|not necessarily|doesn'?t mean)/i.test(
        t
      );
      const hasWhy =
        /(لم يكن ضروري|غير ضروري|لم يكن ملزم|غير الزامي|لم يكن الزامي|لم يكن واجب|انجزه|انهيته|انهاه|ربما|قد يكون|فعل|obligatory|necessary|might have|finished)/i.test(
          t
        );
      return hasNo && hasWhy;
    },
  },

  // Level 5: Final IQ200 Boss — The School Trip
  q21: {
    level: 5,
    canonical: "has to",
    explanation:
      "المطلوب التزام حالي باستخدام HAVE TO، والفاعل everyone يعامل معاملة المفرد الغائب فيأخذ has to.",
    check: (a0) => ["has to", "has to arrive"].includes(normEn(a0)),
  },
  q22: {
    level: 5,
    canonical: "Do",
    explanation:
      "السؤال عن التزام حاضر مع الضمير الجمع we يبدأ بالفعل المساعد Do: Do we have to bring our lunch?",
    check: (a0) => ["do", "do we", "do we have to"].includes(normEn(a0)),
  },
  q23: {
    level: 5,
    canonical: "don't (أو don't have to)",
    explanation:
      "للتعبير عن عدم الضرورة في جواب المعلمة نقول: No, you don't (أو No, you don't have to).",
    check: (a0) =>
      [
        "don't",
        "do not",
        "dont",
        "don't have to",
        "do not have to",
        "dont have to",
      ].includes(normEn(a0)),
  },
  q24: {
    level: 5,
    canonical: "mustn't (أو must not)",
    explanation:
      "المطلوب المنع القاطع من استخدام الهواتف أثناء الجولة الإرشادية، فنستخدم mustn't.",
    check: (a0) =>
      ["mustn't", "must not", "mustnt", "mustn't use", "must not use"].includes(normEn(a0)),
  },
  q25: {
    level: 5,
    canonical: "had to",
    explanation:
      "عبارة Last year تدل على الماضي، فنعبّر عن الضرورة الماضية بـ had to.",
    check: (a0) => ["had to", "had to bring"].includes(normEn(a0)),
  },
};

export function gradeTest44(answers: TestAnswers44): TestGradeReport44 {
  const items: Record<string, QuestionGrade44> = {};
  const wrongIds: string[] = [];
  let score = 0;

  const levelTotals = new Map<number, { correct: number; total: number }>();
  for (let lv = 1; lv <= 5; lv++) levelTotals.set(lv, { correct: 0, total: 0 });

  for (let n = 1; n <= 25; n++) {
    const id = `q${n}`;
    const spec = KEY_SPECS_44[id]!;
    const a0 = (answers[`${id}-0`] ?? "").trim();
    const a1 = (answers[`${id}-1`] ?? "").trim();
    const studentAnswer = a1 ? `${a0} / ${a1}` : a0;
    const isCorrect = spec.check(a0, a1);

    if (isCorrect) score++;
    else wrongIds.push(id);

    const lvBucket = levelTotals.get(spec.level)!;
    lvBucket.total++;
    if (isCorrect) lvBucket.correct++;

    items[id] = {
      id,
      number: n,
      level: spec.level,
      correct: isCorrect,
      studentAnswer,
      canonicalAnswer: spec.canonical,
      explanation: spec.explanation,
    };
  }

  return {
    score,
    total: 25,
    percent: Math.round((score / 25) * 100),
    byLevel: [1, 2, 3, 4, 5].map((level) => ({
      level,
      ...levelTotals.get(level)!,
    })),
    items,
    wrongIds,
  };
}
