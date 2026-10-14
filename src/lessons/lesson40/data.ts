import { SOURCE_SECTIONS_40, SOURCE_NUMBERED_COUNT_40, sourceSection40 as rawSourceSection40, type SourceSection40 } from "./ledger40";

export function sourceSection40(id: string): SourceSection40 {
  const found = rawSourceSection40(id);
  if (!found) {
    throw new Error(`Lesson 40 source section not found: ${id}`);
  }
  return found;
}

export const LESSON_TITLE_40 = "Lesson 40 — Future Tenses Master Review";
export const LESSON_TITLE_AR_40 = "الدرس 40: Future Tenses Master Review — المراجعة الشاملة وإتقان أزمنة المستقبل";
export const LESSON_SUBTITLE_40 = "The Future Tenses Grand Challenge 🚀";
export const LESSON_ARABIC_SUBTITLE_40 = "المراجعة الشاملة وإتقان أزمنة المستقبل — تأسيسي متقدم — IQ200";
export const LESSON_LEVEL_40 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_40 = SOURCE_NUMBERED_COUNT_40;

/** فصول التنقل — تجميع الخطوات للتنقّل فقط، وترتيب المصدر لا يتغيّر أبدًا. */
export const CHAPTERS_40 = [
  { id: "LAUNCH", label: "التمهيد والأهداف والخريطة الكبرى", en: "LAUNCH & DECISION MAP", stepIds: ["cover", "s01", "s02"] },
  { id: "OVERVIEW", label: "الجدول الذهبي والزوايا الخمس", en: "GOLDEN TABLE & 5 ANGLES", stepIds: ["s03", "s04"] },
  { id: "ROUNDS", label: "الجولات الأربع: صيغ المستقبل", en: "FOUR ROUNDS", stepIds: ["s05", "s06", "s07", "s08"] },
  { id: "COMPARE", label: "المقارنة الثلاثية والكلمات الزمنية", en: "3-WAY COMPARE & SIGNALS", stepIds: ["s09", "s10", "s11"] },
  { id: "CLAUSES", label: "الجمل الزمنية وFOR/SINCE ومختبر البناء", en: "CLAUSES & FORMULA LAB", stepIds: ["s12", "s13", "s14", "s15"] },
  { id: "DIALOGUES", label: "الحواران الشاملان ومختبر المواقف", en: "DIALOGUES & SCENARIOS", stepIds: ["s16", "s17", "s18"] },
  { id: "PRACTICE", label: "التدريبات وGrammar Detective وIQ200", en: "PRACTICE & DETECTIVE", stepIds: ["s19", "s20", "s21", "s22"] },
  { id: "READING", label: "تحدي القراءة والتحليل النحوي", en: "READING & ANALYSIS", stepIds: ["s23", "s24"] },
  { id: "ASSESSMENT", label: "الاختبار النهائي الشامل والحلول", en: "GRAND EXAM & SOLUTIONS", stepIds: ["s25", "s26"] },
  { id: "WRAP", label: "الكتابة والملخص الذهبي وخريطة المنهج", en: "WRITING & ROADMAP", stepIds: ["s27", "s28", "s29"] },
] as const;

export type ChapterId40 = (typeof CHAPTERS_40)[number]["id"];
export type Slide40 = {
  id: string;
  sourceId: string;
  sourceOrder: number;
  section: ChapterId40;
  title: string;
  step: number;
  source: SourceSection40;
};

const CHAPTER_BY_SOURCE_40 = Object.fromEntries(
  CHAPTERS_40.flatMap((chapter) => chapter.stepIds.map((id) => [id, chapter.id] as const)),
) as Record<string, ChapterId40>;

/** خطوات الطالب: المقدمة + الأقسام المرقّمة 1–29 بترتيب المصدر. */
export const SLIDES_40: Slide40[] = SOURCE_SECTIONS_40.map((source, index) => ({
  id: source.id,
  sourceId: source.id,
  sourceOrder: source.order,
  section: CHAPTER_BY_SOURCE_40[source.id],
  title: source.title,
  step: index + 1,
  source,
}));

export const STEP_COUNT_40 = SLIDES_40.length;
export const NUMBERED_STEP_COUNT_40 = SLIDES_40.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_40 = Object.fromEntries(
  SLIDES_40.map((slide, index) => [slide.sourceId, index]),
) as Record<string, number>;

export function slide40(id: string): Slide40 | undefined {
  return SLIDES_40.find((slide) => slide.id === id);
}

export function slidesInChapter40(chapterId: ChapterId40) {
  return SLIDES_40.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}

