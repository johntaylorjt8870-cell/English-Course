// تدريبات الدرس 43 — نصوص الأسئلة من المصدر (§§27–32)، والحلول والشروح
// للمقارنة الذاتية بعد المحاولة. لا تُعرض قبل المحاولة.
// مفاتيح الاختبار النهائي (§33/§34) ليست هنا إطلاقًا؛ هي في key43.ts.

import { numbered43, section43, NUMBER_MARKS_43 } from "./ledger43";

export type PracticeItem43 = {
  id: string;
  section: number;
  number: number;
  prompt: string;
  context?: string[];
  options?: string[];
  fields: string[];
  answer: string;
  accept?: string[];
  reason: string;
};

const item = (
  section: number,
  number: number,
  prompt: string,
  fields: string[],
  answer: string,
  reason: string,
  extra: Partial<PracticeItem43> = {},
): PracticeItem43 => ({ id: `p${section}-${number}`, section, number, prompt, fields, answer, reason, ...extra });

// ---------- §27 التدريب الأول: اختر MAY أو MIGHT ----------
const MAY_MIGHT_REASONS: Record<number, string> = {
  1: "احتمال مستقبلي؛ MAY وMIGHT قابلتان للتبادل هنا. المصدر يقرر أن كلتاهما صحيحة بحسب درجة التحفظ والسياق — لا توجد نسب مئوية ثابتة.",
  2: "الاحتمال في الحاضر يقبل الصيغتين: She may be at home now. / She might be at home now. السياق لا يفرض تحفظًا أكبر.",
  3: "We may need more information. وWe might need more information. كلتاهما صحيحة؛ §11 يقرر ذلك صراحة.",
  4: "الاحتمال في المستقبل (الوصول متأخرًا) يقبل الصيغتين بحسب درجة التحفظ التي يريدها المتحدث.",
  5: "This plan may work. وThis plan might work. كلتاهما صحيحتان — زوج §11 الخامس والسادس.",
  6: "زيارة قادمة مقترحة لا مؤكدة؛ الصيغتان صحيحتان والاختيار أسلوبي لا آلي.",
};

// ---------- §28 التدريب الثاني: اختر الصيغة الصحيحة ----------
const FORM_REASONS: Record<number, string> = {
  1: "MAY فعل ناقص ثابت الصيغة: لا mays مع أي فاعل، ويبقى الفعل الرئيسي V1 (be). المصدر: A — may.",
  2: "بعد MIGHT نستخدم V1 مباشرة: arrive دون s ودون to ودون ing. المصدر: B — arrive.",
  3: "طلب الإذن يبدأ بالفعل الناقص نفسه: May I ask a question؟ لا نستخدم Do أو Does مع MAY. المصدر: A — May.",
  4: "بعد MAY NOT يبقى الفعل الرئيسي بصيغته الأساسية V1: come. المصدر: C — come.",
  5: "احتمال الماضي: MAY HAVE + V3 — missed هي صيغة V3 من miss. المصدر: B — missed.",
  6: "احتمال الماضي: MIGHT HAVE + V3 — lost هي صيغة V3 من lose. المصدر: A — lost.",
};

// ---------- §29 التدريب الثالث: MAYBE أم MAY BE؟ ----------
const MAYBE_REASONS: Record<number, string> = {
  1: "«ربما» في بداية الجملة كلمة مستقلة ظرفية: Maybe we'll go to the park tomorrow.",
  2: "الفاعل أولًا ثم الفعل الناقص ثم الصيغة الأساسية من BE: She may be at the library.",
  3: "الكلمة المستقلة Maybe تتصدر الجملة التي تقدمها كظرف.",
  4: "تركيب MAY + BE بعد الفاعل: This answer may be correct.",
  5: "Maybe ظرف مستقل؛ ما بعدها جملة كاملة بفعلها الخاص.",
  6: "may فعل ناقص + be فعل رابط: He may be our new classmate.",
};

// ---------- §30 التدريب الرابع: الاحتمال في الماضي ----------
const PAST_REASONS: Record<number, string> = {
  1: "Perhaps تعني «ربما»؛ إعادة الصياغة بـ may have + V3 تطرح الاحتمال نفسه بصيغة تتعلق بالماضي.",
  2: "النموذج يستخدم MIGHT HAVE. MAY مقبولة أيضًا حين يسمح السياق بذلك — المصدر يقرر التبديل.",
  3: "Maya may have misunderstood the instructions. الفاعل اسم علم يبقى كما هو بعد MAY HAVE.",
  4: "النموذج يستخدم MIGHT HAVE. التبديل إلى MAY صحيح نحويًا في هذا السياق.",
  5: "The teacher may have changed the timetable. التركيب التام بعد MAY لا يعني أن الحدث وقع مؤكدًا.",
};

// ---------- §31 Grammar Detective ----------
const REPAIR_REASONS: Record<number, string> = {
  1: "MAY لا تأخذ s مع أي فاعل: She may come tomorrow. — لا She mays come.",
  2: "بعد MIGHT يأتي الفعل بصيغته الأساسية V1: He might come late. — لا comes.",
  3: "لا نضع to بعد MAY: They may visit us. — لا They may to visit us.",
  4: "بعد MAY نستخدم الصيغة الأساسية من BE: She may be tired. — لا She may is tired.",
  5: "Maybe ظرف يحتاج جملة كاملة بفعل رئيسي: Maybe she is tired. — أو البديل النحوي She may be tired.",
  6: "بعد HAVE نستخدم V3: gone وليس went. He may have gone home.",
  7: "بعد HAVE نستخدم V3: forgotten وليس forgot. They might have forgotten the meeting.",
  8: "May she come? صياغة ممكنة نحويًا في سياقات معينة، لكن في الاستعمال اليومي يُفضَّل غالبًا إعادة صياغة السؤال بحسب المعنى، مثل: Is she likely to come? لا تُفرض إعادة صياغة واحدة.",
  9: "النفي يوضع بعد MIGHT مباشرة قبل الفعل: She might not come. — لا She might not comes.",
  10: "لا نجمع فعلين ناقصين في جملة واحدة: I may travel tomorrow. — لا I may will travel.",
};

// ---------- §32 أسئلة فهم القراءة ----------
const READING_REASONS: Record<number, string> = {
  1: "النص يقول: The students are preparing for a school trip to a science museum — الوجهة هي المتحف العلمي.",
  2: "the weather forecast is uncertain — التوقع غير مؤكد، ولهذا تلجأ الشخصيات إلى MAY وMIGHT.",
  3: "It may rain tomorrow تعبّر عن احتمال مستقبلي لا عن واقع مؤكد.",
  4: "It might be sunny تعبّر هي الأخرى عن احتمال مستقبلي؛ الجملة التالية تؤكد: We can't be sure.",
  5: "I may have left it at home — Daniel يعتقد احتمالًا يتعلق بالماضي (may have + V3).",
  6: "Daniel checks again. You're right! It was there. — دفتره كان في حقيبته الأخرى.",
  7: "Maybe في القصة ظرف بمعنى «ربما» — كلمة واحدة مستقلة.",
  8: "May I remind everyone…؟ طريقة مهذبة ورسمية نسبيًا لتقديم تذكير — طلب إذن بأسلوب لبق.",
  9: "Omar يقترح المظلات لأن المطر احتمال وارد: It may rain tomorrow.",
  10: "The weather can change quickly — إمكانية عامة عن الطقس، لا احتمالًا في موقف محدد.",
};

const READING_ACCEPT: Record<number, string[]> = {
  1: ["a science museum", "science museum", "museum"],
  2: ["no", "no, it isn't", "no, it is not", "غير مؤكد", "مغير"],
  3: ["a future possibility", "future possibility", "احتمال مستقبلي", "احتمال"],
  4: ["a future possibility", "future possibility", "احتمال مستقبلي", "احتمال"],
  5: ["he thought he might have left it at home", "might have left it at home", "left it at home", "تركه في المنزل"],
  6: ["in his other bag", "other bag", "حقيبته الأخرى", "other bag"],
  7: ["perhaps", "maybe", "ربما"],
  8: ["a polite", "polite", "somewhat formal", "طلب إذن", "تذكير", "تذكر"],
  9: ["because it may rain", "may rain", "it may rain", "لأن المطر", "المطر"],
  10: ["general possibility", "possibility", "إمكانية عامة", "احتمال", "إمكانية"],
};

export const PRACTICE_43: PracticeItem43[] = [
  // §27
  ...numbered43(section43(27).lines.slice(0, section43(27).lines.findIndex((l) => l.startsWith("الحلول")))).map(
    (entry) =>
      item(
        27,
        entry.number,
        entry.lines[0],
        ["إجابتك"],
        "MAY أو MIGHT — كلتاهما صحيحة بحسب درجة التحفظ والسياق.",
        MAY_MIGHT_REASONS[entry.number],
        { options: ["MAY", "MIGHT"], accept: ["MAY", "MIGHT"] },
      ),
  ),
  // §28
  ...parseChoiceSection(28),
  // §29
  ...numbered43(section43(29).lines.slice(0, section43(29).lines.findIndex((l) => l.startsWith("الحلول")))).map(
    (entry, i) => {
      const key = numbered43(section43(29).lines.slice(section43(29).lines.findIndex((l) => l.startsWith("الحلول")) + 1))[i]
        .lines[0]
        .replace(/\.$/, "")
        .trim();
      return item(29, entry.number, entry.lines[0], ["إجابتك"], key, MAYBE_REASONS[entry.number], { options: ["Maybe", "may be"], accept: [key] });
    },
  ),
  // §30
  ...numbered43(section43(30).lines.slice(section43(30).lines.indexOf("الأسئلة:") + 1, section43(30).lines.indexOf("حلول نموذجية"))).map(
    (entry, i) => {
      const key = numbered43(
        section43(30).lines.slice(
          section43(30).lines.indexOf("حلول نموذجية") + 1,
          section43(30).lines.findIndex((l) => l.startsWith("يمكن تبديل")),
        ),
      )[i].lines[0];
      return item(30, entry.number, entry.lines.join("\n"), ["الجملة المعاد صياغتها", "سبب الاختيار"], key, PAST_REASONS[entry.number], {
        context: ["يمكن تبديل MAY وMIGHT في هذه الأمثلة عندما يسمح السياق بذلك."],
        accept: [key, key.replace(/^(He|They|Maya|We|The teacher)\s+may\s+have/i, "$1 might have")],
      });
    },
  ),
  // §31
  ...numbered43(section43(31).lines.slice(0, section43(31).lines.findIndex((l) => l.startsWith("الحلول")))).map((entry, i) => {
    const key = numbered43(section43(31).lines.slice(section43(31).lines.findIndex((l) => l.startsWith("الحلول")) + 1))[i].lines.join(
      "\n",
    );
    const accept = entry.number === 8 ? ["may she come", "is she likely to come", "may she come?"] : [key];
    return item(31, entry.number, entry.lines[0], ["الجملة الصحيحة", "سبب الخطأ"], key, REPAIR_REASONS[entry.number], { accept });
  }),
  // §32
  ...numbered43(section43(32).lines.slice(section43(32).lines.indexOf("أسئلة الفهم") + 1, section43(32).lines.indexOf("الحلول"))).map(
    (entry, i) => {
      const key = numbered43(section43(32).lines.slice(section43(32).lines.indexOf("الحلول") + 1))[i].lines[0];
      return item(32, entry.number, entry.lines.join("\n"), ["إجابتك"], key, READING_REASONS[entry.number], {
        accept: READING_ACCEPT[entry.number],
      });
    },
  ),
];

/** يفكّك قسم التدريب ذي الخيارات (A/B/C) مثل §28 إلى بنود مع خياراتها. */
function parseChoiceSection(section: number): PracticeItem43[] {
  const lines = section43(section).lines;
  const split = lines.findIndex((l) => l.startsWith("الحلول"));
  const questions: { number: number; prompt: string; options: string[] }[] = [];
  let current: { number: number; prompt: string; options: string[] } | null = null;
  lines.slice(0, split).forEach((line) => {
    const mark = NUMBER_MARKS_43.indexOf(line[0]);
    if (mark >= 0) {
      if (current) questions.push(current);
      current = { number: mark + 1, prompt: line.slice(1).trim(), options: [] };
    } else if (current && /^[ABC]\.\s*(.+)$/.test(line)) {
      current.options.push(line.replace(/^[ABC]\.\s*/, ""));
    }
  });
  if (current) questions.push(current);
  const keys = numbered43(lines.slice(split + 1));
  return questions.map((entry, i) => {
    const key = keys[i].lines[0].trim();
    const letter = key.match(/^\s*([ABC])\s*—/)?.[1];
    return item(
      section,
      entry.number,
      entry.prompt,
      ["إجابتك"],
      key,
      FORM_REASONS[entry.number],
      { options: entry.options.map((o) => `${letter}. ${o}`), accept: [`${letter}. ${entry.options[0]}`, entry.options[0], key] },
    );
  });
}

export const PRACTICE_COUNTS_43: Record<number, number> = { 27: 6, 28: 6, 29: 6, 30: 5, 31: 10, 32: 10 };

export function itemsFor43(section: number, from: number, to: number): PracticeItem43[] {
  return PRACTICE_43.filter((entry) => entry.section === section && entry.number >= from && entry.number <= to);
}

export function normalize43(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.،,!?؟;؛:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect43(entry: PracticeItem43, response: string): boolean {
  const value = normalize43(response);
  if (!value) return false;
  const pool = [entry.answer, ...(entry.accept ?? [])].map(normalize43);
  return pool.includes(value) || pool.some((accepted) => accepted.length > 6 && value.includes(accepted));
}

/** الأسئلة ذات الحقلين (التصحيح + السبب): الأول مطابق، والثاني تفسير حر. */
export function isPairCorrect43(entry: PracticeItem43, first: string, second: string): boolean {
  return isCorrect43(entry, first) && second.trim().length >= 8;
}

/** يعيد سبب البند التدريبي إن وُجد — يُستخدم في التدقيق لضمان وجود سبب مكتوب لكل بند. */
export function practiceReason43(section: number, number: number): string {
  const entry = PRACTICE_43.find((item) => item.section === section && item.number === number);
  return entry?.reason ?? "";
}
