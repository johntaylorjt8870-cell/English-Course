import { TEST_QUESTIONS_33, answerKey33, type TestAnswers33 } from "./testData33";
import { normalize33 } from "./practice33";

// ============================================================
// مفتاح التصحيح التفصيلي لاختبار الدرس 33 — 25 سؤالًا / 5 مستويات.
//
// هذا الملف لا يُستورد في مسار التعلّم: يُحمَّل عبر `await import("./key33")`
// عند التسليم فقط، أو داخل مساحة المعلم المقفلة بكلمة المرور. وبذلك لا يصل
// مفتاح الإجابة إلى حزمة الطالب الأولية ولا إلى DOM الدراسة قبل وقته.
//
// لكل سؤال: الإجابة المقبولة · الزمن المستخدم · سبب الاختيار ·
// البدائل الصحيحة حيث يسمح السياق · تفسير الخطأ (المستوى الثالث) ·
// الإجابة الكاملة لفقرة المستوى الخامس.
//
// provenance: "source" = منصوص في المادة، "platform" = مُعدّ في المنصة
// (المادة وعدت بمفتاح تصحيح في §21 ولم تسرده، فالمفاتيح مشتقة من قواعد الدرس).
// ============================================================

export type KeyFieldRule33 = {
  answer?: string;
  accept?: string[];
  /** مجموعات كلمات مفتاحية: كل مجموعة تحتاج مطابقة واحدة على الأقل */
  keywords?: string[][];
};

export type KeyEntry33 = {
  id: string;
  number: number;
  level: number;
  /** الإجابة المعيارية المعروضة في الحلول (حقول متعددة تُفصل بـ " / ") */
  answer: string;
  /** بدائل مقبولة لسؤال أحادي الحقل */
  accept?: string[];
  /** قواعد التصحيح لكل حقل في الأسئلة متعددة الحقول */
  fieldRules?: Record<string, KeyFieldRule33>;
  /** مجموعات كلمات مفتاحية لسؤال تفسيرية أحادي الحقل */
  keywords?: string[][];
  /** الزمن المستخدم */
  tense: string;
  tenseId: "PS" | "PC" | "PP" | "PPC" | "—";
  /** سبب الاختيار */
  reason: string;
  /** بدائل صحيحة يسمح بها السياق */
  alternatives?: { answer: string; note: string }[];
  /** تفسير موجز للخطأ — أسئلة المستوى الثالث */
  errorNote?: string;
  provenance: "source" | "platform";
};

export const MIA_CORRECTED_33 = [
  "Mia is a talented musician. She usually practices the violin after school. This month, she is preparing for an international competition.",
  "She has won three local competitions so far, and she has been training for the international event since July.",
  "Today, she is rehearsing with her teacher, who has known her for eight years.",
];

export const SOLUTIONS_33: KeyEntry33[] = [
  // ---------------- المستوى الأول: اختيار الزمن ----------------
  {
    id: "q1",
    number: 1,
    level: 1,
    answer: "wakes up",
    tense: "Present Simple",
    tenseId: "PS",
    reason: "usually تدل على عادة متكررة، والفاعل My mother مفرد غائب، فيأخذ الفعل s: wakes up.",
    provenance: "platform",
  },
  {
    id: "q2",
    number: 2,
    level: 1,
    answer: "is sleeping",
    tense: "Present Continuous",
    tenseId: "PC",
    reason: "Be quiet! تنبيه إلى حدث يقع في لحظة الكلام، فنبني المضارع المستمر: is + V-ing.",
    provenance: "platform",
  },
  {
    id: "q3",
    number: 3,
    level: 1,
    answer: "have visited",
    accept: ["have been to"],
    tense: "Present Perfect",
    tenseId: "PP",
    reason: "twice عدد من التجارب المكتملة حتى الآن بلا تحديد وقت ← التركيز على الإنجاز: have + V3.",
    provenance: "platform",
  },
  {
    id: "q4",
    number: 4,
    level: 1,
    answer: "has been repairing",
    accept: ["has repaired"],
    tense: "Present Perfect Continuous",
    tenseId: "PPC",
    reason: "since noon نقطة بداية لنشاط امتدّ حتى الآن، والتركيز على النشاط والمدة ← has been + V-ing.",
    alternatives: [
      {
        answer: "has repaired",
        note: "صحيحة نحويًا أيضًا بعد since، وتُبرز الفترة كاملة بدل امتداد النشاط. الدرس يقرّر صراحةً أن الإجابتين قد تصحّان معًا، وأن الفعل repair ليس من أفعال الحالة فلا يمنع الصيغة المستمرة.",
      },
    ],
    provenance: "platform",
  },
  {
    id: "q5",
    number: 5,
    level: 1,
    answer: "moves",
    tense: "Present Simple",
    tenseId: "PS",
    reason: "حقيقة علمية ثابتة ← المضارع البسيط، والفعل يأخذ s مع The Earth.",
    provenance: "platform",
  },

  // ---------------- المستوى الثاني: تصريف الفعل ----------------
  {
    id: "q6",
    number: 6,
    level: 2,
    answer: "haven't finished",
    accept: ["have not finished"],
    tense: "Present Perfect (نفي)",
    tenseId: "PP",
    reason: "yet تربط الحدث بالحاضر حتى لحظة الكلام، والنفي في المضارع التام: have/has + not + V3.",
    provenance: "platform",
  },
  {
    id: "q7",
    number: 7,
    level: 2,
    answer: "are / laughing",
    fieldRules: {
      aux: { answer: "are" },
      form: { answer: "laughing" },
    },
    tense: "Present Continuous (سؤال)",
    tenseId: "PC",
    reason: "right now ← مضارع مستمر. بنية السؤال: Why + am/is/are + الفاعل + V-ing، والفعل المساعد يطابق you فتكون are.",
    provenance: "platform",
  },
  {
    id: "q8",
    number: 8,
    level: 2,
    answer: "has been studying",
    accept: ["has studied"],
    tense: "Present Perfect Continuous",
    tenseId: "PPC",
    reason: "for four months مدة ممتدة حتى الآن، والتركيز على نشاط الدراسة المستمر ← has been + V-ing.",
    alternatives: [
      { answer: "has studied", note: "صحيحة أيضًا بعد for؛ تُبرز الفترة كاملة. اختيار المضارع التام المستمر هنا إبرازٌ للاستمرار لا تصحيحٌ لخطأ." },
    ],
    provenance: "platform",
  },
  {
    id: "q9",
    number: 9,
    level: 2,
    answer: "has owned",
    tense: "Present Perfect",
    tenseId: "PP",
    reason: "own من أفعال الحالة التي لا تُستخدم عادةً في الأزمنة المستمرة، فمع since 2015 نستخدم المضارع التام: has + V3. صيغة has been owning مرفوضة.",
    provenance: "platform",
  },
  {
    id: "q10",
    number: 10,
    level: 2,
    answer: "have completed",
    tense: "Present Perfect",
    tenseId: "PP",
    reason: "six experiments so far عدد مكتمل مرتبط بالحاضر ← التركيز على الإنجاز: have + V3. الصيغة المستمرة لا تناسب عددًا محددًا منتهى النتائج.",
    provenance: "platform",
  },

  // ---------------- المستوى الثالث: تصحيح الأخطاء ----------------
  {
    id: "q11",
    number: 11,
    level: 3,
    answer: "Does he work here?",
    tense: "Present Simple (سؤال)",
    tenseId: "PS",
    reason: "بعد Does يعود الفعل الرئيسي إلى شكله الأساسي، فلا تجتمع علامة المفرد في المساعد والفعل معًا.",
    errorNote: "الخطأ: تكرار علامة المفرد الغائب مرتين — مرة في Does ومرة في works. تُحذف s من الفعل لأنها انتقلت إلى المساعد.",
    provenance: "platform",
  },
  {
    id: "q12",
    number: 12,
    level: 3,
    answer: "She has been cooking since morning.",
    tense: "Present Perfect Continuous",
    tenseId: "PPC",
    reason: "since morning نشاط ممتد حتى الآن، وبنية الزمن have/has + been + V-ing.",
    errorNote: "الخطأ: came cook بصيغة V1 بعد been. بعد been لا يأتي إلا V-ing.",
    provenance: "platform",
  },
  {
    id: "q13",
    number: 13,
    level: 3,
    answer: "I know the answer.",
    tense: "Present Simple",
    tenseId: "PS",
    reason: "know من أفعال الحالة التي تعبّر عن حالة ذهنية مستقرة، فتُستخدم في الصيغ غير المستمرة.",
    errorNote: "الخطأ: بناء صيغة مستمرة (am knowing) من فعل حالة. تُحذف am ويُبقى الفعل في المضارع البسيط.",
    provenance: "platform",
  },
  {
    id: "q14",
    number: 14,
    level: 3,
    answer: "They have already arrived.",
    tense: "Present Perfect",
    tenseId: "PP",
    reason: "already مع إنجاز مرتبط بالحاضر، والفاعل They جمع فيأخذ have لا has.",
    errorNote: "الخطأ: مطابقة الفعل المساعد has مع فاعل جمع. has تُستخدم مع he/she/it فقط.",
    provenance: "platform",
  },
  {
    id: "q15",
    number: 15,
    level: 3,
    answer: "He has been repairing the car for two hours.",
    accept: ["He has repaired the car for two hours."],
    tense: "Present Perfect Continuous",
    tenseId: "PPC",
    reason: "for two hours مدة ممتدة، والتركيز على النشاط ← has been + V-ing.",
    errorNote: "الخطأ: repaired بصيغة V3 بعد been. البنية الصحيحة have/has + been + V-ing، أي repairing.",
    alternatives: [{ answer: "He has repaired the car for two hours.", note: "مقبولة نحويًا وتُبرز الفترة كاملة؛ التصحيح المطلوب في السؤال هو إزالة الخلط بين V3 وbeen." }],
    provenance: "platform",
  },

  // ---------------- المستوى الرابع: فهم المعنى ----------------
  {
    id: "q16",
    number: 16,
    level: 4,
    answer: "PS",
    tense: "Present Simple",
    tenseId: "PS",
    reason: "العادة المتكررة والروتين والحقيقة المستقرة هي محور المضارع البسيط.",
    provenance: "source",
  },
  {
    id: "q17",
    number: 17,
    level: 4,
    answer: "PC",
    tense: "Present Continuous",
    tenseId: "PC",
    reason: "الحدث الجاري في لحظة الكلام أو الوضع المؤقت هو محور المضارع المستمر.",
    provenance: "source",
  },
  {
    id: "q18",
    number: 18,
    level: 4,
    answer: "PP",
    tense: "Present Perfect",
    tenseId: "PP",
    reason: "إنجاز خمسة أعمال مكتملة حتى الآن = عدد من النتائج المرتبطة بالحاضر، وهو محور المضارع التام.",
    provenance: "source",
  },
  {
    id: "q19",
    number: 19,
    level: 4,
    answer: "PPC",
    tense: "Present Perfect Continuous",
    tenseId: "PPC",
    reason: "نشاط استمر لمدة ساعتين وله علاقة بالحاضر = نشاط ممتد ومدته، وهو محور المضارع التام المستمر.",
    provenance: "source",
  },
  {
    id: "q20",
    number: 20,
    level: 4,
    answer: "both / الحالة أو الفترة كاملة / الاستمرار خلال تلك الفترة",
    fieldRules: {
      verdict: { answer: "both" },
      focusA: { keywords: [["حالة", "فترة", "كاملة", "الوضع", "خبرة", "نتيجة"]] },
      focusB: { keywords: [["استمرار", "مستمر", "امتداد", "ممتد", "مدة", "النشاط", "جهد"]] },
    },
    tense: "Present Perfect وPresent Perfect Continuous معًا",
    tenseId: "—",
    reason:
      "نعم، كلتاهما صحيحتان، ويمكن أن تدلا على أن الشخص ما زال يعيش هنا. الفرق فرقُ تركيز لا فرقُ انتهاء: have lived تُبرز الحالة أو الفترة كاملة، وhave been living تُبرز الاستمرار خلال تلك الفترة. لذلك لا يعني المضارع التام دائمًا أن النشاط انتهى، ولا يعني المضارع التام المستمر دائمًا أنه ما زال جاريًا.",
    provenance: "source",
  },

  // ---------------- المستوى الخامس: Final Boss ----------------
  {
    id: "q21",
    number: 21,
    level: 5,
    answer: "practices",
    tense: "Present Simple",
    tenseId: "PS",
    reason: "usually … after school عادة متكررة، والفاعل she مفرد غائب ← practices.",
    provenance: "platform",
  },
  {
    id: "q22",
    number: 22,
    level: 5,
    answer: "is preparing",
    tense: "Present Continuous",
    tenseId: "PC",
    reason: "This month فترة مؤقتة حول الحاضر ← وضع مؤقت: is + V-ing.",
    provenance: "platform",
  },
  {
    id: "q23",
    number: 23,
    level: 5,
    answer: "has won",
    tense: "Present Perfect",
    tenseId: "PP",
    reason: "three local competitions so far عدد مكتمل من الإنجازات مرتبط بالحاضر ← has + V3.",
    provenance: "platform",
  },
  {
    id: "q24",
    number: 24,
    level: 5,
    answer: "has been training",
    accept: ["has trained"],
    tense: "Present Perfect Continuous",
    tenseId: "PPC",
    reason: "since July نقطة بداية لنشاط التدريب الممتد حتى الآن ← has been + V-ing.",
    alternatives: [{ answer: "has trained", note: "صحيحة نحويًا بعد since وتُبرز الفترة كاملة؛ الاختيار المستمر يُبرز امتداد النشاط." }],
    provenance: "platform",
  },
  {
    id: "q25",
    number: 25,
    level: 5,
    answer: "is rehearsing / has known / الفرق: نشاط جارٍ اليوم مقابل حالة ممتدة",
    fieldRules: {
      rehearse: { answer: "is rehearsing" },
      know: { answer: "has known" },
      why: {
        keywords: [
          ["today", "اليوم", "جار", "الآن", "لحظة", "مستمر"],
          ["حالة", "stative", "مدة", "ثماني", "eight", "تام", "for"],
        ],
      },
    },
    tense: "Present Continuous ثم Present Perfect",
    tenseId: "—",
    reason:
      "Today, she is rehearsing with her teacher — نشاط جارٍ اليوم في لحظة الكلام، فنبنيه بالمضارع المستمر. أما who has known her for eight years ففعل معرفة (know) من أفعال الحالة التي لا تُستخدم عادةً في الصيغ المستمرة، ومع مدة for eight years ممتدة حتى الآن نستخدم المضارع التام: has + V3. الفرق إذًا ليس في الزمن وحده بل في نوع الفعل: نشاط حيّ قابل للاستمرار مقابل حالة ذهنية مستقرة.",
    provenance: "platform",
  },
];

function keywordHit(answer: string, groups: string[][]): boolean {
  const value = normalize33(answer);
  if (!value) return false;
  return groups.every((group) => group.some((word) => value.includes(normalize33(word))));
}

export type Graded33 = KeyEntry33 & { correct: boolean; response: string; fieldResults: { key: string; correct: boolean; value: string }[] };

export function grade33(answers: TestAnswers33): { results: Graded33[]; score: number; total: number } {
  const results = SOLUTIONS_33.map((entry) => {
    const question = TEST_QUESTIONS_33.find((q) => q.id === entry.id)!;
    const fieldResults = question.fields.map((f) => {
      const value = (answers[answerKey33(question.id, f.key)] ?? "").trim();
      const rule = entry.fieldRules?.[f.key];
      let correct = false;
      if (rule) {
        if (rule.keywords) correct = keywordHit(value, rule.keywords);
        else {
          const pool = [rule.answer, ...(rule.accept ?? [])].filter(Boolean).map((v) => normalize33(v as string));
          correct = Boolean(value) && pool.includes(normalize33(value));
        }
      } else if (question.options && question.fields.length === 1) {
        correct = Boolean(value) && normalize33(value) === normalize33(entry.answer);
      } else {
        const pool = [entry.answer, ...(entry.accept ?? [])].map(normalize33);
        correct = Boolean(value) && pool.includes(normalize33(value));
      }
      return { key: f.key, correct, value };
    });
    const response = fieldResults.map((f) => f.value || "—").join(" / ");
    return { ...entry, correct: fieldResults.length > 0 && fieldResults.every((f) => f.correct), response, fieldResults };
  });
  return { results, score: results.filter((r) => r.correct).length, total: SOLUTIONS_33.length };
}

/** إجابات ورقة كاملة صحيحة — تُستعمل في التدقيق للتحقق من أن التصحيح حقيقي. */
export function perfectSheet33(): TestAnswers33 {
  const sheet: TestAnswers33 = {};
  SOLUTIONS_33.forEach((entry) => {
    const question = TEST_QUESTIONS_33.find((q) => q.id === entry.id)!;
    if (entry.fieldRules) {
      question.fields.forEach((f) => {
        const rule = entry.fieldRules![f.key];
        sheet[answerKey33(question.id, f.key)] = rule.answer ?? (rule.keywords ? rule.keywords.map((g) => g[0]).join(" و") : "");
      });
      return;
    }
    const parts = entry.answer.split(" / ");
    question.fields.forEach((f, i) => {
      sheet[answerKey33(question.id, f.key)] = question.fields.length > 1 ? parts[i] : entry.answer;
    });
  });
  return sheet;
}
