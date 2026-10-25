import { sectionLines33 } from "./ledger33";
import type { TenseId33 } from "./design33";

// ============================================================
// مفاتيح الأنشطة المقترنة بالمحاولة.
//
// القاعدة: كل جملة/سؤال/فقرة هنا نصّها حرفي من المادة (يُقرأ من سجل المصدر
// مباشرة حيث أمكن)، أما مفتاح الحل فإمّا:
//   • منصوص في المادة            → provenance: "source"
//   • مُعدّ في المنصة وفق قواعد الدرس → provenance: "platform"
// ولا يظهر أي مفتاح للطالب قبل محاولته، ولا تحمل الحقول أي placeholder
// يكشف الإجابة (الـ placeholder جزء من DOM الطالب قبل المحاولة).
// ============================================================

export type Provenance33 = "source" | "platform";

export type PracticeField33 = { key: string; label: string; placeholder?: string };

export type PracticeItem33 = {
  id: string;
  section: string;
  number: number;
  /** نص البند كما ورد في المادة (بلا علامة الترقيم) */
  prompt: string;
  fields: PracticeField33[];
  /** الإجابة المعيارية لكل حقل، بالترتيب */
  answer: string[];
  /** بدائل مقبولة لكل حقل */
  accept?: string[][];
  tense: TenseId33;
  reason: string;
  /** بدائل صحيحة يشرحها الحل (لا تُحتسب خطأ) */
  alternatives?: { answer: string; note: string }[];
  provenance: Provenance33;
  provenanceNote?: string;
};

export function normalize33(value: string): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.،,!?؟;؛:]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesPractice33(item: PracticeItem33, responses: string[]): boolean {
  if (responses.length !== item.fields.length) return false;
  return item.fields.every((field, i) => {
    const value = normalize33(responses[i]);
    if (!value) return false;
    const pool = [item.answer[i], ...(item.accept?.[i] ?? [])].map(normalize33);
    return pool.includes(value);
  });
}

// ------------------------------------------------------------
// §12 — Grammar Detective, المستوى الأول: ثماني جمل
// الأخطاء والحلول منصوصة في المادة حرفيًا.
// ------------------------------------------------------------
export type DetectiveItem33 = {
  id: string;
  number: number;
  wrong: string;
  right: string;
  tense: TenseId33;
  note: string;
  provenance: Provenance33;
};

const s12 = sectionLines33("s12");
const DETECTIVE_META: { tense: TenseId33; note: string }[] = [
  { tense: "PS", note: "usually تدل على عادة، فالمضارع البسيط هو الصحيح، والفعل يأخذ s مع He." },
  { tense: "PP", note: "been زائدة هنا؛ الإنجاز المكتمل يُبنى بـ have/has + V3." },
  { tense: "PS", note: "بعد Does يعود الفعل إلى شكله الأساسي بلا s." },
  { tense: "PP", note: "know فعل حالة، فلا يُستخدم في الصيغ المستمرة؛ with since ← Present Perfect." },
  { tense: "PC", note: "Look! تشير إلى حدث جارٍ في لحظة الكلام ← am/is/are + V-ing." },
  { tense: "PP", note: "بعد has نستخدم V3: write ← wrote ← written." },
  { tense: "PPC", note: "since 9:00 نشاط بدأ في الماضي وامتد حتى الآن ← have been + V-ing." },
  { tense: "PP", note: "نسأل عن تجربة في الحياة، لذلك Present Perfect هو الاختيار الطبيعي." },
];

export const DETECTIVE_33: DetectiveItem33[] = Array.from({ length: 8 }, (_, i) => ({
  id: `gd1-${i + 1}`,
  number: i + 1,
  wrong: s12[1 + i].replace(/^[①-⑳]\s*/, ""),
  right: s12[10 + i].replace(/^[①-⑳]\s*/, ""),
  tense: DETECTIVE_META[i].tense,
  note: i === 7 ? s12[19] : DETECTIVE_META[i].note,
  provenance: "source" as Provenance33,
}));

export const DETECTIVE_NOTE_HEAD_33 = s12[18];
export const DETECTIVE_KEY_HEAD_33 = s12[9];

// ------------------------------------------------------------
// §13 — التدريب الأول: عشرة بنود
// المادة تعد بـ«الحلول المفصلة» لكنها لا تسردها، فالمفاتيح مُعدّة في المنصة
// وفق قواعد الدرس نفسه (خاصة §10 و§11 و§15) وتُوسم بذلك.
// ------------------------------------------------------------
const s13 = sectionLines33("s13");
export const PRACTICE1_INSTRUCTION_33 = s13[0];
export const PRACTICE1_WARNING_33 = s13[11];
export const PRACTICE1_REVEAL_LABEL_33 = s13[12];

const field = (label: string, placeholder?: string, key = "answer"): PracticeField33 => ({ key, label, placeholder });

const P1: Omit<PracticeItem33, "id" | "section" | "number" | "prompt" | "provenance">[] = [
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["cooks"],
    tense: "PS",
    reason: "usually وon Fridays تصفان عادة متكررة ← Present Simple، والفعل يأخذ s مع My father.",
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["is knocking"],
    tense: "PC",
    reason: "Listen! تنبيه إلى حدث يقع في لحظة الكلام ← Present Continuous: is + V-ing.",
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["have lost"],
    accept: [["have lost"]],
    tense: "PP",
    reason: "النتيجة قائمة الآن (لا أستطيع قراءة السبورة)، والوقت غير محدد ← Present Perfect. لا يصلح has been losing لأن lose هنا حدث لحظي له أثر حاضر، ولا توجد مدة.",
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["have been waiting"],
    accept: [["have waited"]],
    tense: "PPC",
    reason: "الانتظار نشاط امتدّ لمدة for twenty minutes وما زال مرتبطًا بالحاضر ← Present Perfect Continuous هو الأبرز.",
    alternatives: [
      { answer: "have waited", note: "صحيحة نحويًا أيضًا بعد for؛ الفرق في التركيز فقط (الفترة كاملة بدل امتداد النشاط) — وهو ما يقرّره الدرس في مواجهته الثالثة." },
    ],
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["speaks"],
    tense: "PS",
    reason: "قدرة/حقيقة مستقرة عن ابن العم ← Present Simple مع s للمفرد الغائب.",
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["are inspecting"],
    accept: [["have been inspecting"]],
    tense: "PC",
    reason: "this month فترة مؤقتة حول الحاضر ← Present Continuous، وهو الاستخدام الذي يثبّته الدرس في جملته I am teaching mathematics this month.",
    alternatives: [
      { answer: "have been inspecting", note: "مقبولة إذا أراد المتحدث إبراز امتداد الفحص من بداية الشهر حتى الآن؛ هذا التدريب لا يفرض زمنًا واحدًا لأن this month يصلح للوجهين." },
    ],
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["has won"],
    tense: "PP",
    reason: "so far مع عدد مكتمل (four competitions) ← التركيز على الإنجاز، فالحل Present Perfect. has been winning لا تناسب عددًا محددًا منتهى النتائج.",
  },
  {
    fields: [field("الفعل المساعد — الفراغ الأول", undefined, "aux"), field("صيغة الفعل — الفراغ الثاني", undefined, "form")],
    answer: ["Have", "been working"],
    accept: [["Have"], ["worked"]],
    tense: "PPC",
    reason: "الأثر الظاهر الآن (الحذاء موحِل) يشير إلى نشاط حديث امتدّ لفترة ← Have you been working…?",
    alternatives: [
      { answer: "Have you worked in the garden?", note: "مقبولة نحويًا، لكنها تسأل عن حدوث العمل لا عن امتداده، فتفقد الربط بالأثر الظاهر الآن." },
    ],
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["serves"],
    tense: "PS",
    reason: "صفة دائمة للمطعم ← Present Simple مع s.",
  },
  {
    fields: [field("الصيغة الصحيحة")],
    answer: ["have been examining"],
    accept: [["have examined"]],
    tense: "PPC",
    reason: "since sunrise نقطة بداية لنشاط مستمر حتى الآن ← Present Perfect Continuous.",
    alternatives: [{ answer: "have examined", note: "صحيحة نحويًا بعد since؛ تُبرز الفترة كاملة بدل امتداد النشاط." }],
  },
];

export const PRACTICE_33: PracticeItem33[] = [
  ...P1.map((item, i) => ({
    ...item,
    id: `p13-${i + 1}`,
    section: "s13",
    number: i + 1,
    prompt: s13[1 + i].replace(/^[①-⑳]\s*/, ""),
    provenance: "platform" as Provenance33,
    provenanceNote: "المادة تعد بالحلول المفصلة ولا تسردها؛ المفتاح مُعدّ في المنصة وفق قواعد الدرس.",
  })),
];

// ------------------------------------------------------------
// §14 — التدريب الثاني: أربع جمل بفعل design (الحلول منصوصة في المادة)
// ------------------------------------------------------------
const s14 = sectionLines33("s14");
export const PRACTICE2_INSTRUCTION_33 = [s14[0], s14[1]];
export const PRACTICE2_WHY_33 = s14.slice(11, 17);

const P2: { answer: string; tense: TenseId33; reason: string }[] = [
  { answer: "designs", tense: "PS", reason: "usually ← عادة متكررة، والفعل يأخذ s مع Omar." },
  { answer: "is designing", tense: "PC", reason: "right now ← نشاط جارٍ في لحظة الكلام." },
  { answer: "has designed", tense: "PP", reason: "الاهتمام بالعدد المكتمل: seven posters ← إنجاز." },
  { answer: "has been designing", tense: "PPC", reason: "النشاط بدأ منذ وقت معين (since breakfast) واستمر ← نشاط ممتد." },
];

export const PRACTICE2_33: PracticeItem33[] = P2.map((item, i) => ({
  id: `p14-${i + 1}`,
  section: "s14",
  number: i + 1,
  prompt: s14[2 + i].replace(/^[①-⑳]\s*/, ""),
  fields: [field("الصيغة الصحيحة")],
  answer: [item.answer],
  tense: item.tense,
  reason: item.reason,
  provenance: "source",
}));

export const ALL_PRACTICE_33: PracticeItem33[] = [...PRACTICE_33, ...PRACTICE2_33];

// ------------------------------------------------------------
// §3 — مختبر نورا: أربع جمل وزوايا النظر
// ------------------------------------------------------------
const s3 = sectionLines33("s3");
export const NORA_ROWS_33: { id: string; number: number; en: string; ar: string; angle: string; tense: TenseId33 }[] = [
  { id: "nora-1", number: 1, en: s3[1].replace(/^[①-⑳]\s*/, ""), ar: s3[2], angle: s3[3], tense: "PS" },
  { id: "nora-2", number: 2, en: s3[4].replace(/^[①-⑳]\s*/, ""), ar: s3[5], angle: s3[6], tense: "PC" },
  { id: "nora-3", number: 3, en: s3[7].replace(/^[①-⑳]\s*/, ""), ar: s3[8], angle: s3[9], tense: "PP" },
  { id: "nora-4", number: 4, en: s3[10].replace(/^[①-⑳]\s*/, ""), ar: s3[11], angle: s3[12], tense: "PPC" },
];
export const NORA_INTRO_33 = s3[0];
export const NORA_NOTICE_33 = s3.slice(13, 16);

// ------------------------------------------------------------
// §1 — النموذج الذهني: أربع معادلات
// ------------------------------------------------------------
const s1 = sectionLines33("s1");
export const MENTAL_MODEL_33: { en: string; ar: string; tense: TenseId33 }[] = [18, 19, 20, 21].map((i, k) => {
  const [en, ar] = s1[i].split(" = ");
  return { en, ar, tense: (["PS", "PC", "PP", "PPC"] as TenseId33[])[k] };
});
export const MENTAL_MODEL_LEAD_33 = s1[17];

// ------------------------------------------------------------
// §2 — أمثلة work الأربع
// ------------------------------------------------------------
const s2 = sectionLines33("s2");
export const WORK_FORMS_33: { en: string; tense: TenseId33 }[] = [6, 7, 8, 9].map((i, k) => ({
  en: s2[i],
  tense: (["PS", "PC", "PP", "PPC"] as TenseId33[])[k],
}));
export const WORK_LEAD_33 = s2[5];
export const WORK_NOTE_33 = s2[10];

// ------------------------------------------------------------
// §4 — السؤال الذي يحدد الزمن + مثال «أعمل على هذا المشروع»
// ------------------------------------------------------------
const s4 = sectionLines33("s4");
export const DECISION_QUESTIONS_33: { question: string; answer: string; tense: TenseId33 }[] = [
  { question: s4[1], answer: s4[2], tense: "PS" },
  { question: s4[3], answer: s4[4], tense: "PC" },
  { question: s4[5], answer: s4[6], tense: "PP" },
  { question: s4[7], answer: s4[8], tense: "PPC" },
];
export const PROJECT_ARABIC_33 = s4[11];
export const PROJECT_NOTE_33 = s4[12];
export const PROJECT_OPTIONS_33: { before: string; en: string; ar: string; tense: TenseId33; context: string }[] = [
  { before: s4[13], en: s4[14], ar: s4[15], tense: "PS", context: "every Friday — تكرار معتاد" },
  { before: s4[16], en: s4[17], ar: s4[18], tense: "PC", context: "now — لحظة الكلام" },
  { before: s4[19], en: s4[20], ar: s4[21], tense: "PP", context: "three projects this year — عدد منجز" },
  { before: s4[22], en: s4[23], ar: s4[24], tense: "PPC", context: "for six weeks — مدة ممتدة" },
];
export const PROJECT_CONCLUSION_33 = s4[25];

// ------------------------------------------------------------
// §5 — الإجابات القصيرة
// ------------------------------------------------------------
const s5 = sectionLines33("s5");
export const FORM_PANELS_33: { tense: TenseId33; heading: string; from: number }[] = [
  { tense: "PS", heading: s5[1], from: 1 },
  { tense: "PC", heading: s5[13], from: 13 },
  { tense: "PP", heading: s5[25], from: 25 },
  { tense: "PPC", heading: s5[37], from: 37 },
];
export const FORM_INTRO_33 = s5[0];
export type ShortAnswerRow33 = { id: string; tense: TenseId33; question: string; yes: string; no: string; remember: string };
export const SHORT_ANSWERS_33: ShortAnswerRow33[] = FORM_PANELS_33.map((panel) => ({
  id: `sa-${panel.tense}`,
  tense: panel.tense,
  question: s5[panel.from + 6],
  yes: s5[panel.from + 8],
  no: s5[panel.from + 9],
  remember: s5[panel.from + 11],
}));

// ------------------------------------------------------------
// §6 — أزواج «أيهما صحيحة؟»
// ------------------------------------------------------------
const s6 = sectionLines33("s6");
export const AUX_PAIRS_33: { id: string; a: string; aWrong: boolean; b: string; bWrong: boolean; tense: TenseId33; why: string }[] = [
  { id: "aux-1", a: s6[1], aWrong: true, b: s6[2], bWrong: false, tense: "PS", why: "بعد Does يعود الفعل الرئيسي إلى V1، فلا تجتمع علامتا المفرد." },
  { id: "aux-2", a: s6[3], aWrong: true, b: s6[4], bWrong: false, tense: "PC", why: "is فعل مساعد يحتاج V-ing لبناء المضارع المستمر." },
  { id: "aux-3", a: s6[5], aWrong: false, b: s6[6], bWrong: true, tense: "PP", why: "has تحتاج V3: practice ← practiced." },
  { id: "aux-4", a: s6[7], aWrong: false, b: s6[8], bWrong: true, tense: "PPC", why: "بعد been تأتي صيغة V-ing، لا V3." },
];
export const AUX_LEAD_33 = s6[0];
export const AUX_RULE_33 = [s6[9], s6[10]];

// ------------------------------------------------------------
// §7 — فرز الكلمات الدالة
// `never` مستثناة من الفرز لأنها واردة في زمين معًا في جدول المادة.
// ------------------------------------------------------------
const s7 = sectionLines33("s7");
export const SIGNAL_TABLE_33 = s7.slice(0, 5);
export const SIGNAL_WARNING_33 = s7.slice(5, 13);

function wordsOf(row: string): string[] {
  return row.split(" | ")[1].split(",").map((w) => w.trim());
}
export const SIGNAL_WORDS_33: { en: string; tense: TenseId33 }[] = [
  ...wordsOf(s7[1]).filter((w) => w !== "never").map((en) => ({ en, tense: "PS" as TenseId33 })),
  ...wordsOf(s7[2]).map((en) => ({ en, tense: "PC" as TenseId33 })),
  ...wordsOf(s7[3]).filter((w) => w !== "never").map((en) => ({ en, tense: "PP" as TenseId33 })),
  ...wordsOf(s7[4]).map((en) => ({ en, tense: "PPC" as TenseId33 })),
];
/** الكلمات المستثناة من الفرز لأن جدول المادة يوردها في أكثر من زمن. */
export const SIGNAL_AMBIGUOUS_33 = ["never"];

// ------------------------------------------------------------
// §8 — تحدّي المواجهة الأولى
// ------------------------------------------------------------
const s8 = sectionLines33("s8");
export const DUEL1_CHALLENGE_33 = {
  lead: s8[14],
  question: s8[15],
  options: [
    { id: "A", text: s8[16].replace(/^A\.\s*/, ""), correct: false },
    { id: "B", text: s8[17].replace(/^B\.\s*/, ""), correct: true },
  ],
  answerLabel: s8[18],
  answer: s8[19],
  because: s8[20],
};
export const DUEL1_PAIRS_33 = {
  first: { lead: s8[0], stable: { en: s8[1], ar: s8[2], why: s8[3], tense: "PS" as TenseId33 }, temporary: { en: s8[4], ar: s8[5], why: s8[6], tense: "PC" as TenseId33 } },
  second: { lead: s8[7], stable: { en: s8[8], ar: s8[9], why: s8[10], tense: "PS" as TenseId33 }, temporary: { en: s8[11], ar: s8[12], why: s8[13], tense: "PC" as TenseId33 } },
};

// ------------------------------------------------------------
// §9 — مطابقة الجملة بالسؤال الذي تجيب عنه
// ------------------------------------------------------------
const s9 = sectionLines33("s9");
export const QUESTION_MATCH_33: { id: string; en: string; ar: string; question: string; tense: TenseId33 }[] = [
  { id: "qm-1", en: s9[1], ar: s9[2], question: s9[4], tense: "PC" },
  { id: "qm-2", en: s9[6], ar: s9[7], question: s9[9], tense: "PPC" },
];
export const QUESTION_MATCH_EXTRA_33: { id: string; en: string; ar: string; tense: TenseId33 }[] = [
  { id: "qm-3", en: s9[14], ar: s9[15], tense: "PC" },
  { id: "qm-4", en: s9[16], ar: s9[17], tense: "PPC" },
];
export const QUESTION_MATCH_DIFF_33 = [s9[10], s9[11], s9[12]];

// ------------------------------------------------------------
// §10 — عدسة التركيز
// ------------------------------------------------------------
const s10 = sectionLines33("s10");
export const FOCUS_ROWS_33: { id: string; en: string; ar: string; focus: string; tense: TenseId33; lens: "count" | "duration" }[] = [
  { id: "foc-1", en: s10[3], ar: s10[4], focus: s10[5], tense: "PP", lens: "count" },
  { id: "foc-2", en: s10[7], ar: s10[8], focus: s10[9], tense: "PPC", lens: "duration" },
];
export const FOCUS_ADVANCED_33 = [s10[10], s10[11]];
export const FOCUS_LIVED_33 = { lead: s10[12], a: s10[13], b: s10[14], both: s10[15], head: s10[16], aFocus: s10[17], bFocus: s10[18], conclusion: s10[19] };

// ------------------------------------------------------------
// §11 — أفعال الحالة
// ------------------------------------------------------------
const s11 = sectionLines33("s11");
export const STATIVE_VERBS_33: { en: string; ar: string }[] = [1, 2, 3, 4, 5, 6, 7].map((i) => {
  const [en, ar] = s11[i].split(" = ");
  return { en, ar };
});
export const STATIVE_LEAD_33 = s11[0];
export const STATIVE_RULE_33 = s11[8];
export const STATIVE_PAIRS_33: { id: string; right: string; wrong: string }[] = [
  { id: "st-1", right: s11[10].replace(/\s*✅$/, ""), wrong: s11[11].replace(/\s*❌$/, "") },
  { id: "st-2", right: s11[13].replace(/\s*✅$/, ""), wrong: s11[14].replace(/\s*❌$/, "") },
];
export const THINK_SPLIT_33 = {
  lead: [s11[15], s11[16]],
  opinion: { en: s11[17], ar: s11[18], label: s11[19], tense: "PS" as TenseId33 },
  process: { en: s11[20], ar: s11[21], label: s11[22], tense: "PC" as TenseId33 },
};

// ------------------------------------------------------------
// §15 — إجابتان صحيحتان
// ------------------------------------------------------------
const s15 = sectionLines33("s15");
export const BOTH_CORRECT_33 = {
  lead: [s15[0], s15[1]],
  prompt: s15[2],
  options: [
    { id: "A", text: s15[3].replace(/^A\.\s*/, ""), tense: "PP" as TenseId33, focus: s15[7] },
    { id: "B", text: s15[4].replace(/^B\.\s*/, ""), tense: "PPC" as TenseId33, focus: s15[9] },
  ],
  verdict: s15[5],
  full: [s15[6], s15[8]],
  extra: [s15[10], s15[11], s15[12], s15[13]],
  lesson: [s15[14], s15[15], s15[16]],
};

// ------------------------------------------------------------
// §16 — قصة The Young Inventor
// ------------------------------------------------------------
const s16 = sectionLines33("s16");
export const STORY_TITLE_33 = s16[1];
export const STORY_LEAD_33 = s16[0];
export const STORY_PARAGRAPHS_33 = s16.slice(2, 8);
export const STORY_PHRASES_33 = [
  "loves",
  "spends",
  "is developing",
  "has already completed",
  "has tested",
  "has been working",
  "has been improving",
  "is testing",
  "are watching",
  "have never seen",
  "believes",
];

// ------------------------------------------------------------
// §17 — تحليل القصة (١١ صفًا منصوصة في المادة)
// ------------------------------------------------------------
const s17 = sectionLines33("s17");
const TENSE_BY_NAME: Record<string, TenseId33> = {
  "Present Simple": "PS",
  "Present Continuous": "PC",
  "Present Perfect": "PP",
  "Present Perfect Continuous": "PPC",
};
export const STORY_ROWS_33: { id: string; number: number; phrase: string; tense: TenseId33; tenseName: string; reason: string }[] = s17
  .slice(1, 12)
  .map((row, i) => {
    const [phrase, tenseName, reason] = row.split(" | ");
    return { id: `sa-${i + 1}`, number: i + 1, phrase, tense: TENSE_BY_NAME[tenseName], tenseName, reason };
  });
export const STORY_ANALYSIS_NOTE_33 = s17[12];
export const STORY_ANALYSIS_HEAD_33 = s17[0];

// ------------------------------------------------------------
// §18 — فقرة إيما: أحد عشر موضعًا
// ------------------------------------------------------------
const s18 = sectionLines33("s18");
export const PARAGRAPH_INSTRUCTION_33 = s18[0];
export const PARAGRAPH_WRONG_33 = s18[1];
export const PARAGRAPH_STOP_33 = s18[2];
export const PARAGRAPH_FIX_HEAD_33 = s18[3];
export const PARAGRAPH_RIGHT_33 = s18[4];
export const PARAGRAPH_WHY_HEAD_33 = s18[5];
export const PARAGRAPH_NOTE_33 = s18[17];

export type ParagraphSpot33 = {
  id: string;
  number: number;
  /** المقطع الخاطئ كما ورد حرفيًا داخل الفقرة */
  wrong: string;
  right: string;
  reason: string;
  tense: TenseId33 | null;
};

export const PARAGRAPH_SPOTS_33: ParagraphSpot33[] = [
  { id: "sp-1", number: 1, wrong: "usually is walking to university", right: "usually walks to university", reason: s18[6], tense: "PS" },
  { id: "sp-2", number: 2, wrong: "this week she takes the train", right: "this week she is taking the train", reason: s18[7], tense: "PC" },
  { id: "sp-3", number: 3, wrong: "has been completed two research papers", right: "has completed two research papers", reason: s18[8], tense: "PP" },
  { id: "sp-4", number: 4, wrong: "is knowing her professor for three years", right: "has known her professor for three years", reason: s18[9], tense: "PP" },
  { id: "sp-5", number: 5, wrong: "she prepares a presentation", right: "she is preparing a presentation", reason: s18[10], tense: "PC" },
  { id: "sp-6", number: 6, wrong: "She has worked on it since five hours", right: "She has been working on it for five hours", reason: s18[11], tense: "PPC" },
  { id: "sp-7", number: 7, wrong: "since five hours", right: "for five hours", reason: s18[12], tense: null },
  { id: "sp-8", number: 8, wrong: "hasn't finish it yet", right: "hasn't finished it yet", reason: s18[13], tense: "PP" },
  { id: "sp-9", number: 9, wrong: "Her classmates has already sent", right: "Her classmates have already sent", reason: s18[14], tense: "PP" },
  { id: "sp-10", number: 10, wrong: "Emma has been writing only three slides", right: "Emma has written only three slides", reason: s18[15], tense: "PP" },
  { id: "sp-11", number: 11, wrong: "She doesn't working on anything else today.", right: "She isn't working on anything else today.", reason: s18[16], tense: "PC" },
];

/** جمل الفقرة الأصلية مفكّكة للعرض التفاعلي (بلا أي تغيير في النص). */
export const PARAGRAPH_SENTENCES_33 = PARAGRAPH_WRONG_33.split(/(?<=\.)\s+/);
export const PARAGRAPH_RIGHT_SENTENCES_33 = PARAGRAPH_RIGHT_33.split(/(?<=\.)\s+/);

// ------------------------------------------------------------
// §19 — المواقف الأربعة
// ------------------------------------------------------------
const s19 = sectionLines33("s19");
export const SITUATIONS_33: { id: string; number: number; head: string; context: string; en: string; reason: string; tense: TenseId33 }[] = [
  { id: "sit-1", number: 1, head: s19[1], context: s19[2], en: s19[3], reason: s19[4], tense: "PS" },
  { id: "sit-2", number: 2, head: s19[5], context: s19[6], en: s19[7], reason: s19[8], tense: "PC" },
  { id: "sit-3", number: 3, head: s19[9], context: s19[10], en: s19[11], reason: s19[12], tense: "PP" },
  { id: "sit-4", number: 4, head: s19[13], context: s19[14], en: s19[15], reason: s19[16], tense: "PPC" },
];
export const SITUATIONS_LEAD_33 = s19[0];

// ------------------------------------------------------------
// §22 — مهمة الكتابة
// ------------------------------------------------------------
const s22 = sectionLines33("s22");
export const WRITING_TITLE_33 = s22[1];
export const WRITING_BRIEF_33 = [s22[0], s22[2]];
export const WRITING_CRITERIA_33 = s22.slice(4, 10).map((line) => line.replace(/^[①-⑳]\s*/, ""));
export const WRITING_MODEL_33 = s22[11];
export const WRITING_DONT_COPY_33 = s22[12];
export const WRITING_MIN_SENTENCES_33 = 10;
export const WRITING_MAX_SENTENCES_33 = 12;

// ------------------------------------------------------------
// §23 — الملخص الذهبي
// ------------------------------------------------------------
const s23 = sectionLines33("s23");
/** الأرقام الدائرية المستخدمة في المادة — تُستعمل لترقيم البطاقات كما في النص. */
export const CIRCLED_33 = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"];

export const GOLDEN_SENTENCES_33: { number: number; en: string; meaning: string; tense: TenseId33 }[] = [
  { number: 1, en: s23[1], meaning: s23[7], tense: "PS" },
  { number: 2, en: s23[2], meaning: s23[9], tense: "PC" },
  { number: 3, en: s23[3], meaning: s23[11], tense: "PP" },
  { number: 4, en: s23[4], meaning: s23[13], tense: "PPC" },
];
export const GOLDEN_MEANINGS_33 = s23.slice(5, 14);
export const GOLDEN_RULE_33 = s23.slice(14, 23);
export const GOLDEN_QUESTIONS_33 = [s23[18], s23[19], s23[20], s23[21]].map((line) => line.replace(/[؟?]$/, ""));

// ------------------------------------------------------------
// §24 — خريطة التقدم
// ------------------------------------------------------------
const s24 = sectionLines33("s24");
export const PROGRESS_PRESENT_33 = { head: s24[0], items: s24.slice(1, 5) };
export const PROGRESS_PAST_33 = { head: s24[5], items: s24[6].split(" / ") };
export const PROGRESS_NEXT_33 = { head: s24[7], title: s24[8], body: s24[9], close: s24[10] };

export const PRACTICE_COUNTS_33 = {
  s12: DETECTIVE_33.length,
  s13: PRACTICE_33.length,
  s14: PRACTICE2_33.length,
  s17: STORY_ROWS_33.length,
  s18: PARAGRAPH_SPOTS_33.length,
  s19: SITUATIONS_33.length,
};
