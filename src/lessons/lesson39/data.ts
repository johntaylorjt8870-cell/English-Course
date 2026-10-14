import { SOURCE_SECTIONS_39, SOURCE_NUMBERED_COUNT_39, sourceSection39, type SourceSection39 } from "./ledger39";

export const LESSON_TITLE_39 = "Lesson 39 — Future Perfect Continuous";
export const LESSON_TITLE_AR_39 = "الدرس 39: Future Perfect Continuous — المستقبل التام المستمر";
export const LESSON_SUBTITLE_39 = "How Long Will You Have Been Learning?";
export const LESSON_ARABIC_SUBTITLE_39 = "من معرفة المستقبل إلى قياس مدة النشاط في المستقبل — IQ200 🚀";
export const LESSON_LEVEL_39 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_39 = SOURCE_NUMBERED_COUNT_39;

/** فصول التنقل — تجميع الخطوات للتنقّل فقط، وترتيب المصدر لا يتغيّر أبدًا. */
export const CHAPTERS_39 = [
  { id: "LAUNCH", label: "التمهيد والفكرة الأساسية", en: "LAUNCH", stepIds: ["cover", "s01", "s02"] },
  { id: "FORM", label: "القاعدة والتحليل والتصريف", en: "FORM", stepIds: ["s03", "s04", "s05"] },
  { id: "USE", label: "الاستخدام الأول والاستمرار", en: "FIRST USE", stepIds: ["s06", "s07"] },
  { id: "DURATION", label: "المدة: for وsince وحسابها", en: "DURATION", stepIds: ["s08", "s09", "s10", "s11"] },
  { id: "REFERENCE", label: "نقطة المرجع: by وby the time", en: "REFERENCE POINT", stepIds: ["s12", "s13", "s14"] },
  { id: "DIALOGUE", label: "حوار يوم الدراسة الطويل", en: "DIALOGUE", stepIds: ["s15"] },
  { id: "COMPARE", label: "الإنجاز مقابل المدة", en: "RESULT vs DURATION", stepIds: ["s16", "s17", "s18"] },
  { id: "NEGATION", label: "النفي ومعناه", en: "NEGATION", stepIds: ["s19", "s20"] },
  { id: "QUESTIONS", label: "الأسئلة والإجابات القصيرة", en: "QUESTIONS", stepIds: ["s21", "s22", "s23", "s24"] },
  { id: "TENSES", label: "الأزمنة التامة المستمرة وأفعال الحالة والأخطاء", en: "TENSES & ERRORS", stepIds: ["s25", "s26", "s27"] },
  { id: "PRACTICE", label: "حوار الماراثون والتدريبات الموجهة", en: "PRACTICE", stepIds: ["s28", "s29", "s30", "s31", "s32", "s33"] },
  { id: "ASSESSMENT", label: "القراءة والاختبار والحلول", en: "ASSESSMENT", stepIds: ["s34", "s35", "s36"] },
  { id: "WRAP", label: "الكتابة والملخص وخريطة المنهج", en: "WRAP UP", stepIds: ["s37", "s38", "s39"] },
] as const;

export type ChapterId39 = (typeof CHAPTERS_39)[number]["id"];
export type Slide39 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  section: ChapterId39;
  title: string;
  step: number;
  source: SourceSection39;
};

const CHAPTER_BY_SOURCE_39 = Object.fromEntries(
  CHAPTERS_39.flatMap((chapter) => chapter.stepIds.map((id) => [id, chapter.id] as const)),
) as Record<string, ChapterId39>;

/** خطوات الطالب: المقدمة + الأقسام المرقّمة 1–39 بترتيب المصدر. */
export const SLIDES_39: Slide39[] = SOURCE_SECTIONS_39.map((source, index) => ({
  id: source.id,
  sourceId: source.id,
  sourceOrder: source.order,
  section: CHAPTER_BY_SOURCE_39[source.id],
  title: source.title,
  step: index + 1,
  source,
}));

export const STEP_COUNT_39 = SLIDES_39.length;
export const NUMBERED_STEP_COUNT_39 = SLIDES_39.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_39 = Object.fromEntries(
  SLIDES_39.map((slide, index) => [slide.sourceId, index]),
) as Record<string, number>;

export function slide39(id: string): Slide39 | undefined {
  return SLIDES_39.find((slide) => slide.id === id);
}

export function slidesInChapter39(chapterId: ChapterId39) {
  return SLIDES_39.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}

export { sourceSection39 };
