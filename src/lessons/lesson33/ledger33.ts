import { SOURCE_TEXT_33 } from "./source33";

// ============================================================
// سجل المصدر — الدرس 33: The Four Present Tenses
// الغلاف + الأهداف + الأقسام المرقّمة ①–㉔ محفوظة نصًا وترتيبًا.
// كل كتلة @@ = قسم؛ كل سطر داخلها = وحدة مصدرية حرفية.
// ============================================================

export type SourceSection33 = {
  /** موضع القسم في السجل (0 = الغلاف) */
  index: number;
  /** معرّف ثابت: cover | objectives | s1 … s24 */
  id: string;
  /** رقم القسم كما ورد في المادة (1–24)، وnull للغلاف والأهداف */
  num: number | null;
  /** علامة القسم في المادة: ① … ㉔، أو «الغلاف» / «الأهداف» */
  mark: string;
  /** عنوان القسم كما ورد في المادة */
  title: string;
  /** الوحدات الحرفية */
  lines: string[];
};

const CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔";

export const SOURCE_SECTIONS_33: SourceSection33[] = SOURCE_TEXT_33.split("@@")
  .filter((block) => block.trim().length > 0)
  .map((block, index) => {
    const [heading, ...lines] = block.trim().split("\n");
    const [head, ...titleParts] = heading.split(" ");
    const num = /^\d+$/.test(head) ? Number(head) : null;
    return {
      index,
      id: num === null ? head : `s${num}`,
      num,
      mark: num === null ? (head === "cover" ? "الغلاف" : "الأهداف") : CIRCLED[num - 1] ?? String(num),
      title: titleParts.join(" ").trim(),
      lines,
    };
  });

export const SOURCE_LEDGER_COUNT_33 = SOURCE_SECTIONS_33.length;
export const SOURCE_NUMBERED_COUNT_33 = SOURCE_SECTIONS_33.filter((section) => section.num !== null).length;
export const SOURCE_UNIT_COUNT_33 = SOURCE_SECTIONS_33.reduce((total, section) => total + section.lines.length, 0);

export function sectionById33(id: string): SourceSection33 {
  const found = SOURCE_SECTIONS_33.find((section) => section.id === id);
  if (!found) throw new Error(`Unknown lesson 33 source block: ${id}`);
  return found;
}

export function sectionByNum33(num: number): SourceSection33 {
  const found = SOURCE_SECTIONS_33.find((section) => section.num === num);
  if (!found) throw new Error(`Unknown lesson 33 source section number: ${num}`);
  return found;
}

/** `key` = معرّف الكتلة (cover / objectives / s1 … s24). */
export function sectionLines33(key: string): string[] {
  return sectionById33(key).lines;
}

export function sectionTitle33(key: string): string {
  return sectionById33(key).title;
}

/** وحدات الكتلة المعروضة في شريحة معينة — تُستخدم في تدقيق التغطية. */
export function unitsInRange33(key: string, range: [number, number]): string[] {
  return sectionLines33(key).slice(range[0], range[1] + 1);
}

// ============================================================
// سجل التصحيحات التعليمية
// ------------------------------------------------------------
// المادة المقدَّمة احتوت مواضع تحتاج تحققًا. القاعدة المعتمدة: لا يُصلح أي
// تناقض بصمت — كل تصحيح يُسجَّل هنا بسببه، ويُعرض في منطقة المعلم وفي
// docs/lesson33-accuracy-log.md. ما لم يُذكر هنا محفوظ حرفيًا كما ورد.
// ============================================================

export type SourceCorrection33 = {
  id: string;
  section: string;
  unit: number;
  /** النص كما ورد في المادة المقدَّمة */
  original: string;
  /** النص المعتمد في السجل بعد التحقق */
  applied: string;
  /** سبب التصحيح والدليل من المادة نفسها */
  reason: string;
  /** هل التصحيح من المصدر نفسه أم أضافته المنصة؟ */
  origin: "source-note" | "platform";
};

export const SOURCE_CORRECTIONS_33: SourceCorrection33[] = [
  {
    id: "gd2-count",
    section: "s18",
    unit: 0,
    original: "في الفقرة التالية عشرة أخطاء. حاول اكتشافها:",
    applied: "في الفقرة التالية أحد عشر موضعًا يحتاج إلى تصحيح. حاول اكتشافها:",
    reason:
      "تناقض عددي داخل المادة نفسها: سطر التعليمات يقول «عشرة أخطاء»، بينما ملاحظة المادة الختامية تقول «يوجد أحد عشر موضعًا يحتاج إلى تصحيح»، وقائمة الحلول المنشورة في المادة مرقّمة ①–⑪. العدّ الحرفي لمواضع الاختلاف بين فقرة Emma الأصلية وفقرة الحل يعطي 11 موضعًا بالضبط: (1) is walking→walks، (2) takes→is taking، (3) has been completed→has completed، (4) is knowing→has known، (5) prepares→is preparing، (6) has worked→has been working، (7) since five hours→for five hours، (8) hasn't finish→hasn't finished، (9) classmates has→have، (10) has been writing→has written، (11) doesn't working→isn't working. لذلك وُحِّد العدد على أحد عشر حتى يتطابق عنوان التحدي مع عدد الأخطاء ومع الحلول المعروضة للطالب.",
    origin: "source-note",
  },
];

/** مواضع الأخطاء المقصودة المحفوظة حرفيًا في المادة (تُدرَّس ولا تُصلح بصمت). */
export type IntentionalError33 = {
  id: string;
  section: string;
  wrong: string;
  right: string;
  note: string;
};

export const INTENTIONALLY_WRONG_33: IntentionalError33[] = [
  // §6 — أربعة أزواج
  { id: "s6-1", section: "s6", wrong: "Does she practices?", right: "Does she practice?", note: "بعد does يعود الفعل إلى V1." },
  { id: "s6-2", section: "s6", wrong: "Is she practice now?", right: "Is she practicing now?", note: "is تحتاج V-ing." },
  { id: "s6-3", section: "s6", wrong: "Has she practice before?", right: "Has she practiced before?", note: "has تحتاج V3." },
  { id: "s6-4", section: "s6", wrong: "Has she been practiced?", right: "Has she been practicing?", note: "been تحتاج V-ing لا V3." },
  // §7 — فعل حالة في صيغة مستمرة
  { id: "s7-1", section: "s7", wrong: "I have been knowing her for seven years.", right: "I have known her for seven years.", note: "know فعل حالة." },
  // §11 — فعلا حالة
  { id: "s11-1", section: "s11", wrong: "I have been owning this bicycle for four years.", right: "I have owned this bicycle for four years.", note: "own فعل حالة." },
  { id: "s11-2", section: "s11", wrong: "She has been knowing the answer since yesterday.", right: "She has known the answer since yesterday.", note: "know فعل حالة." },
  // §8 — تحدٍّ: الجملة A غير مناسبة للعادة
  { id: "s8-1", section: "s8", wrong: "She is drinking tea every morning.", right: "She drinks tea every morning.", note: "every morning عادة متكررة ← Present Simple." },
  // §12 — المحقق الأول: ثماني جمل
  { id: "s12-1", section: "s12", wrong: "He is usually going to school by bus.", right: "He usually goes to school by bus.", note: "usually عادة." },
  { id: "s12-2", section: "s12", wrong: "They have been finish the project.", right: "They have finished the project.", note: "been زائدة، وبعدها لا يأتي V1." },
  { id: "s12-3", section: "s12", wrong: "Does your sister studies French?", right: "Does your sister study French?", note: "بعد does يعود الفعل V1." },
  { id: "s12-4", section: "s12", wrong: "I have been knowing him since 2020.", right: "I have known him since 2020.", note: "know فعل حالة." },
  { id: "s12-5", section: "s12", wrong: "Look! The dog runs across the garden.", right: "Look! The dog is running across the garden.", note: "Look! حدث جارٍ." },
  { id: "s12-6", section: "s12", wrong: "She has wrote four articles this month.", right: "She has written four articles this month.", note: "has تحتاج V3: written." },
  { id: "s12-7", section: "s12", wrong: "We are waiting here since 9:00.", right: "We have been waiting here since 9:00.", note: "since ← نشاط ممتد حتى الآن." },
  { id: "s12-8", section: "s12", wrong: "Have you ever been visiting Egypt?", right: "Have you ever visited Egypt?", note: "سؤال عن تجربة في الحياة." },
  // §18 — أحد عشر موضعًا في فقرة Emma
  { id: "s18-1", section: "s18", wrong: "Emma usually is walking to university", right: "Emma usually walks to university", note: "① عادة." },
  { id: "s18-2", section: "s18", wrong: "this week she takes the train", right: "this week she is taking the train", note: "② وضع مؤقت هذا الأسبوع." },
  { id: "s18-3", section: "s18", wrong: "She has been completed two research papers so far.", right: "She has completed two research papers so far.", note: "③ إنجاز؛ been زائدة." },
  { id: "s18-4", section: "s18", wrong: "She is knowing her professor for three years.", right: "She has known her professor for three years.", note: "④ فعل حالة + مدة ← Present Perfect." },
  { id: "s18-5", section: "s18", wrong: "At the moment, she prepares a presentation.", right: "At the moment, she is preparing a presentation.", note: "⑤ نشاط جارٍ." },
  { id: "s18-6", section: "s18", wrong: "She has worked on it since five hours", right: "She has been working on it for five hours", note: "⑥ نشاط ممتد." },
  { id: "s18-7", section: "s18", wrong: "since five hours", right: "for five hours", note: "⑦ مدة، وليس نقطة بداية — موضع مستقل عن اختيار الزمن." },
  { id: "s18-8", section: "s18", wrong: "hasn't finish it yet", right: "hasn't finished it yet", note: "⑧ بعد hasn't نستخدم V3." },
  { id: "s18-9", section: "s18", wrong: "Her classmates has already sent their slides", right: "Her classmates have already sent their slides", note: "⑨ classmates جمع." },
  { id: "s18-10", section: "s18", wrong: "Emma has been writing only three slides", right: "Emma has written only three slides", note: "⑩ نركز على عدد الشرائح المكتملة." },
  { id: "s18-11", section: "s18", wrong: "She doesn't working on anything else today.", right: "She isn't working on anything else today.", note: "⑪ نفي المضارع المستمر." },
];

export { SOURCE_TEXT_33 };
