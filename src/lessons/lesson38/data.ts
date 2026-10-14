import { SOURCE_SECTIONS_38, SOURCE_NUMBERED_COUNT_38, sourceSection38, type SourceSection38 } from "./ledger38";

export const LESSON_TITLE_38 = "Lesson 38 — Future Perfect";
export const LESSON_TITLE_AR_38 = "الدرس 38: Future Perfect — المستقبل التام";
export const LESSON_SUBTITLE_38 = "By Tomorrow, I Will Have Finished!";
export const LESSON_ARABIC_SUBTITLE_38 = "إتقان التعبير عن الإنجاز قبل نقطة مستقبلية — IQ200 🚀";
export const LESSON_LEVEL_38 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_38 = SOURCE_NUMBERED_COUNT_38;

/** فصول التنقل — تجميع الخطوات للتنقّل فقط، وترتيب المصدر لا يتغيّر أبدًا. */
export const CHAPTERS_38 = [
  { id: "LAUNCH", label: "التمهيد والفكرة الأساسية", en: "LAUNCH", stepIds: ["cover", "s01", "s02"] },
  { id: "FORM", label: "القاعدة والتحليل والتصريف", en: "FORM", stepIds: ["s03", "s04", "s05"] },
  { id: "MEANING", label: "الاستخدام الأول وby", en: "MEANING", stepIds: ["s06", "s07", "s08", "s09"] },
  { id: "TIMECLAUSE", label: "by the time وbefore", en: "TIME CLAUSES", stepIds: ["s10", "s11", "s12"] },
  { id: "DIALOGUE", label: "حوار المعرض المدرسي", en: "DIALOGUE", stepIds: ["s13"] },
  { id: "QUESTIONS", label: "النفي والسؤال والإجابات", en: "QUESTIONS", stepIds: ["s14", "s15", "s16", "s17", "s18"] },
  { id: "VERBS", label: "التصريف الثالث V3", en: "VERB FORMS", stepIds: ["s19"] },
  { id: "COMPARE", label: "المقارنات والأخطاء", en: "COMPARE", stepIds: ["s20", "s21", "s22", "s23", "s24", "s25"] },
  { id: "PRACTICE", label: "الحوار والتدريبات الموجهة", en: "PRACTICE", stepIds: ["s26", "s27", "s28", "s29", "s30", "s31"] },
  { id: "ASSESSMENT", label: "القراءة والاختبار", en: "ASSESSMENT", stepIds: ["s32", "s33", "s34"] },
  { id: "WRAP", label: "الكتابة والملخص", en: "WRAP UP", stepIds: ["s35", "s36"] },
] as const;

export type ChapterId38 = (typeof CHAPTERS_38)[number]["id"];
export type Slide38 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  section: ChapterId38;
  title: string;
  step: number;
  source: SourceSection38;
};

const CHAPTER_BY_SOURCE_38 = Object.fromEntries(
  CHAPTERS_38.flatMap((chapter) => chapter.stepIds.map((id) => [id, chapter.id] as const)),
) as Record<string, ChapterId38>;

/** خطوات الطالب: المقدمة + الأقسام المرقّمة 1–36 بترتيب المصدر. */
export const SLIDES_38: Slide38[] = SOURCE_SECTIONS_38.map((source, index) => ({
  id: source.id,
  sourceId: source.id,
  sourceOrder: source.order,
  section: CHAPTER_BY_SOURCE_38[source.id],
  title: source.title,
  step: index + 1,
  source,
}));

export const STEP_COUNT_38 = SLIDES_38.length;
export const NUMBERED_STEP_COUNT_38 = SLIDES_38.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_38 = Object.fromEntries(
  SLIDES_38.map((slide, index) => [slide.sourceId, index]),
) as Record<string, number>;

export function slide38(id: string): Slide38 | undefined {
  return SLIDES_38.find((slide) => slide.id === id);
}

export function slidesInChapter38(chapterId: ChapterId38) {
  return SLIDES_38.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}

export { sourceSection38 };
