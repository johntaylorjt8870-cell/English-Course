import { SOURCE_SECTIONS_37, SOURCE_NUMBERED_COUNT_37, sourceSection37, type SourceSection37 } from "./ledger37";

export const LESSON_TITLE_37 = "Lesson 37 — Future Continuous";
export const LESSON_TITLE_AR_37 = "الدرس 37: Future Continuous — المستقبل المستمر";
export const LESSON_SUBTITLE_37 = "What Will You Be Doing Tomorrow?";
export const LESSON_ARABIC_SUBTITLE_37 = "رحلة إلى المستقبل — IQ200 🚀";
export const LESSON_LEVEL_37 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_37 = SOURCE_NUMBERED_COUNT_37;

/** فصول التنقل — تجميع الخطوات للتنقّل فقط، وترتيب المصدر لا يتغيّر أبدًا. */
export const CHAPTERS_37 = [
  { id: "LAUNCH", label: "التمهيد والفكرة الأساسية", en: "LAUNCH", stepIds: ["cover", "s01", "s02"] },
  { id: "FORM", label: "القاعدة والتحليل والتصريف", en: "FORM", stepIds: ["s03", "s04", "s05"] },
  { id: "MEANING", label: "الاستخدام الأول وكاميرا المستقبل", en: "MEANING", stepIds: ["s06", "s07", "s08", "s09", "s10"] },
  { id: "TIMECLAUSE", label: "when وwhile والحدث المصاحب", en: "TIME CLAUSES", stepIds: ["s11", "s12", "s13"] },
  { id: "DIALOGUE", label: "الحوار والاستخدامات المتقدمة", en: "DIALOGUE", stepIds: ["s14", "s15", "s16", "s17"] },
  { id: "QUESTIONS", label: "النفي والسؤال والإجابات", en: "QUESTIONS", stepIds: ["s18", "s19", "s20", "s21", "s22", "s23"] },
  { id: "VERBS", label: "قواعد ing وأفعال الحالة", en: "VERB FORMS", stepIds: ["s24", "s25"] },
  { id: "COMPARE", label: "المقارنات الكبرى", en: "COMPARE", stepIds: ["s26", "s27"] },
  { id: "PRACTICE", label: "التدريبات الموجهة", en: "PRACTICE", stepIds: ["s28", "s29", "s30", "s31"] },
  { id: "ASSESSMENT", label: "القراءة والتحدي والاختبار", en: "ASSESSMENT", stepIds: ["s32", "s33", "s34", "s35"] },
  { id: "WRAP", label: "الكتابة والملخص والخريطة", en: "WRAP UP", stepIds: ["s36", "s37", "s38"] },
] as const;

export type ChapterId37 = (typeof CHAPTERS_37)[number]["id"];
export type Slide37 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  section: ChapterId37;
  title: string;
  step: number;
  source: SourceSection37;
};

const CHAPTER_BY_SOURCE_37 = Object.fromEntries(
  CHAPTERS_37.flatMap((chapter) => chapter.stepIds.map((id) => [id, chapter.id] as const)),
) as Record<string, ChapterId37>;

/** خطوات الطالب: المقدمة + الأقسام المرقّمة 1–38 بترتيب المصدر. */
export const SLIDES_37: Slide37[] = SOURCE_SECTIONS_37.map((source, index) => ({
  id: source.id,
  sourceId: source.id,
  sourceOrder: source.order,
  section: CHAPTER_BY_SOURCE_37[source.id],
  title: source.title,
  step: index + 1,
  source,
}));

export const STEP_COUNT_37 = SLIDES_37.length;
export const NUMBERED_STEP_COUNT_37 = SLIDES_37.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_37 = Object.fromEntries(
  SLIDES_37.map((slide, index) => [slide.sourceId, index]),
) as Record<string, number>;

export function slide37(id: string): Slide37 | undefined {
  return SLIDES_37.find((slide) => slide.id === id);
}

export function slidesInChapter37(chapterId: ChapterId37) {
  return SLIDES_37.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}

export { sourceSection37 };
