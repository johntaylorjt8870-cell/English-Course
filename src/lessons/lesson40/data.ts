import { SOURCE_SECTIONS_40, SOURCE_NUMBERED_COUNT_40, sourceSection40 as rawSourceSection40, type StudentSourceSection40 as SourceSection40 } from "./studentLedger40";

export function sourceSection40(id: string): SourceSection40 {
  const found = rawSourceSection40(id);
  if (!found) throw new Error(`Lesson 40 source section not found: ${id}`);
  return found;
}

export const LESSON_TITLE_40 = "Lesson 40 — Future Tenses Master Review";
export const LESSON_TITLE_AR_40 = "الدرس 40: Future Tenses Master Review — المراجعة الشاملة وإتقان أزمنة المستقبل";
export const LESSON_SUBTITLE_40 = "The Future Tenses Grand Challenge 🚀";
export const LESSON_ARABIC_SUBTITLE_40 = "المراجعة الشاملة وإتقان أزمنة المستقبل — تأسيسي متقدم — IQ200";
export const LESSON_LEVEL_40 = "تأسيسي متقدم — IQ200";
export const SECTION_COUNT_40 = SOURCE_NUMBERED_COUNT_40;

export const CHAPTERS_40 = [
  { id: "LAUNCH", label: "التمهيد والخريطة الكبرى", en: "COMMAND BRIEFING", sourceIds: ["cover", "s01", "s02"] },
  { id: "OVERVIEW", label: "الزوايا الخمس", en: "FIVE FUTURE LENSES", sourceIds: ["s03", "s04", "s05"] },
  { id: "TIMELINES", label: "مسارات المستقبل", en: "ACTIVITY / RESULT / DURATION", sourceIds: ["s06", "s07", "s08", "s09", "s10", "s11"] },
  { id: "CLAUSES", label: "الجمل الزمنية والبناء", en: "CLAUSES & FORMULA LAB", sourceIds: ["s12", "s13", "s14", "s15"] },
  { id: "DIALOGUES", label: "الحوارات والمواقف", en: "SCENARIO SIMULATIONS", sourceIds: ["s16", "s17", "s18"] },
  { id: "PRACTICE", label: "التدريبات والتحليل", en: "RETRIEVAL PRACTICE", sourceIds: ["s19", "s20", "s21", "s22"] },
  { id: "READING", label: "القراءة والتحليل", en: "READING DEBRIEF", sourceIds: ["s23", "s24"] },
  { id: "ASSESSMENT", label: "الاختبار والحلول", en: "GRAND EXAM", sourceIds: ["s25", "s26"] },
  { id: "WRAP", label: "الكتابة وخريطة المنهج", en: "MISSION DEBRIEF", sourceIds: ["s27", "s28", "s29"] },
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
  unitIndexes: number[];
  includeTable: boolean;
  focus: string;
};

const CHAPTER_BY_SOURCE_40 = Object.fromEntries(
  CHAPTERS_40.flatMap((chapter) => chapter.sourceIds.map((id) => [id, chapter.id] as const)),
) as Record<string, ChapterId40>;

// Six source units per page keeps a short lesson cadence without changing the immutable source ledger.
const FOCUS_40: Record<string, string> = {
  cover: "Mission briefing", s01: "Review objective", s02: "Six-question tense diagnosis", s03: "Five-form control board",
  s04: "One event · five meanings", s05: "Decision or prior plan", s06: "Activity window", s07: "Completion checkpoint",
  s08: "Duration counter", s09: "Three timeline lenses", s10: "Meaning check", s11: "Time markers are clues",
  s12: "Temporal-clause repair", s13: "Reference-point selector", s14: "FOR / SINCE selector", s15: "Formula assembly",
  s16: "Science competition debrief", s17: "Family-trip classification", s18: "Scenario diagnosis", s19: "Choose by meaning",
  s20: "Build the future form", s21: "Grammar detective", s22: "Acceptable alternatives", s23: "Reading comprehension", s24: "Writer's tense choices",
  s25: "Final assessment entry", s26: "Teacher-only solution entry", s27: "Writing mission", s28: "Golden summary", s29: "Curriculum route",
};

const PAGE_SIZE_40 = 6;
const pages: Omit<Slide40, "step">[] = [];
for (const source of SOURCE_SECTIONS_40) {
  // Final test prompts are presented in the dedicated test area. Teacher key source is loaded in gated modules.
  const indexes = source.id === "s25" || source.id === "s26"
    ? [0, 1]
    : source.units.map((_, index) => index);
  const pageSize = source.id === "s17" ? 5 : source.id === "s28" ? 7 : PAGE_SIZE_40;
  for (let start = 0; start < indexes.length; start += pageSize) {
    const unitIndexes = indexes.slice(start, start + pageSize);
    const pageNumber = Math.floor(start / pageSize) + 1;
    const hasSinglePageTable = Boolean(source.tableRows?.length) && start === 0;
    pages.push({
      id: `${source.id}-${String(pageNumber).padStart(2, "0")}`,
      sourceId: source.id,
      sourceOrder: source.order,
      section: CHAPTER_BY_SOURCE_40[source.id],
      title: source.title,
      source,
      unitIndexes,
      includeTable: hasSinglePageTable,
      focus: FOCUS_40[source.id] ?? "Future tense review",
    });
  }
}

export const SLIDES_40: Slide40[] = pages.map((page, index) => ({ ...page, step: index + 1 }));
export const STEP_COUNT_40 = SLIDES_40.length;
export const NUMBERED_STEP_COUNT_40 = SLIDES_40.filter((slide) => slide.source.num != null).length;
export const SOURCE_TO_STEP_40 = Object.fromEntries(
  SLIDES_40.map((slide, index) => [slide.id, index]),
) as Record<string, number>;
export function slide40(id: string): Slide40 | undefined { return SLIDES_40.find((slide) => slide.id === id); }
export function slidesInChapter40(chapterId: ChapterId40) {
  return SLIDES_40.map((slide, index) => ({ slide, index })).filter(({ slide }) => slide.section === chapterId);
}
