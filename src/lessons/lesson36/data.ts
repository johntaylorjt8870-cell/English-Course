import { SOURCE_SECTIONS_36, sourceSection36, type SourceSection36 } from "./ledger36";

export const LESSON_TITLE_36 = "Lesson 36 — WILL vs BE GOING TO";
export const LESSON_SUBTITLE_36 = "Mastering Future Decisions & Predictions";
export const LESSON_ARABIC_SUBTITLE_36 = "إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي";
export const LESSON_LEVEL_36 = "تأسيسي متقدم — IQ200";

/** Chapters group steps for navigation only; the source order never changes. */
export const CHAPTERS_36 = [
  { id: "FOUNDATION", label: "التمهيد والمقارنة", en: "FOUNDATION", stepIds: ["cover", "s01", "s02", "s03"] },
  { id: "DECISIONS", label: "القرار والسياق", en: "DECISIONS", stepIds: ["s04", "s05"] },
  { id: "PREDICTIONS", label: "التوقع والدليل", en: "PREDICTIONS", stepIds: ["s06", "s07"] },
  { id: "FUNCTIONS", label: "الوعود والأسئلة والبناء", en: "FUNCTIONS", stepIds: ["s08", "s09", "s10", "s11", "s12", "s13"] },
  { id: "DIALOGUES", label: "الحوار والفهم المتقدم", en: "DIALOGUES", stepIds: ["s14", "s15", "s16"] },
  { id: "PRACTICE", label: "الممارسة الموجهة", en: "PRACTICE", stepIds: ["s17", "s18", "s19", "s20"] },
  { id: "ASSESSMENT", label: "القراءة والاختبار", en: "ASSESSMENT", stepIds: ["s21", "s22", "s23"] },
  { id: "WRAP", label: "الكتابة والخاتمة", en: "WRAP UP", stepIds: ["s24", "s25", "s26"] },
] as const;

export type ChapterId36 = (typeof CHAPTERS_36)[number]["id"];
export type Slide36 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  section: ChapterId36;
  title: string;
  step: number;
  source: SourceSection36;
};

const CHAPTER_BY_SOURCE_36 = Object.fromEntries(
  CHAPTERS_36.flatMap((chapter) => chapter.stepIds.map((id) => [id, chapter.id] as const)),
) as Record<string, ChapterId36>;

export const SLIDES_36: Slide36[] = SOURCE_SECTIONS_36.map((source, index) => ({
  id: source.id,
  sourceId: source.id,
  sourceOrder: source.order,
  section: CHAPTER_BY_SOURCE_36[source.id],
  title: source.title,
  step: index + 1,
  source,
}));

export const STEP_COUNT_36 = SLIDES_36.length;
export const NUMBERED_STEP_COUNT_36 = SLIDES_36.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_36 = Object.fromEntries(SLIDES_36.map((slide, index) => [slide.sourceId, index])) as Record<string, number>;

export function slide36(id: string): Slide36 | undefined {
  return SLIDES_36.find((slide) => slide.id === id);
}

export function slidesInChapter36(chapterId: ChapterId36) {
  return SLIDES_36.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}

export { sourceSection36 };
