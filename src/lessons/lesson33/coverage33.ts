import { SOURCE_SECTIONS_33, SOURCE_UNIT_COUNT_33, SOURCE_LEDGER_COUNT_33, SOURCE_NUMBERED_COUNT_33 } from "./ledger33";
import { SLIDES_33, STATIONS_33 } from "./slides33";
import { PRACTICE_33, DETECTIVE_33, STORY_ROWS_33, PARAGRAPH_SPOTS_33 } from "./practice33";
import { TEST_QUESTIONS_33, TEST_LEVELS_33 } from "./testData33";

// ============================================================
// تغطية المادة: كل وحدة مصدرية يجب أن تظهر مرة واحدة بالضبط —
// إمّا مباشرة في شريحة (ranges)، وإمّا كحلّ مقترن بمحاولة الطالب (keyRanges).
// ============================================================

export type CoverageRow33 = {
  id: string;
  num: number | null;
  mark: string;
  title: string;
  units: number;
  slides: string[];
  renderedUnits: number;
  gatedUnits: number;
  answerLocation: string;
};

const PRACTICE_BLOCKS = new Set(["s12", "s13", "s14", "s17", "s18"]);

function rangesFor(section: string, key: "ranges" | "keyRanges"): [number, number][] {
  return SLIDES_33.filter((slide) => slide.section === section && slide[key]).flatMap((slide) => slide[key]!);
}

function indexesOf(ranges: [number, number][]): Set<number> {
  const set = new Set<number>();
  ranges.forEach(([from, to]) => {
    for (let i = from; i <= to; i += 1) set.add(i);
  });
  return set;
}

export function renderedIndexes33(section: string): Set<number> {
  return indexesOf(rangesFor(section, "ranges"));
}

export function gatedIndexes33(section: string): Set<number> {
  return indexesOf(rangesFor(section, "keyRanges"));
}

export function coveredIndexes33(section: string): Set<number> {
  return new Set([...renderedIndexes33(section), ...gatedIndexes33(section)]);
}

/** الوحدات التي لا تظهر في أي شريحة — يجب أن تبقى فارغة. */
export function uncoveredUnits33(): { section: string; index: number; text: string }[] {
  const missing: { section: string; index: number; text: string }[] = [];
  SOURCE_SECTIONS_33.forEach((section) => {
    const covered = coveredIndexes33(section.id);
    section.lines.forEach((text, index) => {
      if (!covered.has(index)) missing.push({ section: section.id, index, text });
    });
  });
  return missing;
}

/** الوحدات المعروضة في أكثر من شريحة — يجب أن تبقى فارغة (لا تكرار بلا مبرر). */
export function duplicatedUnits33(): { section: string; index: number; slides: string[] }[] {
  const duplicates: { section: string; index: number; slides: string[] }[] = [];
  SOURCE_SECTIONS_33.forEach((section) => {
    const owners = new Map<number, string[]>();
    SLIDES_33.filter((slide) => slide.section === section.id).forEach((slide) => {
      [...(slide.ranges ?? []), ...(slide.keyRanges ?? [])].forEach(([from, to]) => {
        for (let i = from; i <= to; i += 1) owners.set(i, [...(owners.get(i) ?? []), slide.id]);
      });
    });
    owners.forEach((slides, index) => {
      if (slides.length > 1) duplicates.push({ section: section.id, index, slides });
    });
  });
  return duplicates;
}

function answerLocation(sectionId: string): string {
  if (sectionId === "s20") return "TestArea33 ثم SolutionsArea33 (بعد التسليم)";
  if (sectionId === "s21") return "SolutionsArea33 (مقفلة حتى التسليم)";
  if (sectionId === "s12") return "بطاقة المحقق بعد المحاولة + TeacherGuide33";
  if (sectionId === "s13" || sectionId === "s14") return "بطاقة التدريب بعد المحاولة + TeacherGuide33";
  if (sectionId === "s17") return "بطاقة التحليل بعد الاختيار + TeacherGuide33";
  if (sectionId === "s18") return "محقق الفقرة بعد إصلاح كل المواضع + TeacherGuide33";
  return "داخل الشريحة";
}

export const COVERAGE_33: CoverageRow33[] = SOURCE_SECTIONS_33.map((section) => {
  const slides = SLIDES_33.filter((slide) => slide.section === section.id);
  return {
    id: section.id,
    num: section.num,
    mark: section.mark,
    title: section.title,
    units: section.lines.length,
    slides: slides.map((slide) => slide.id),
    renderedUnits: renderedIndexes33(section.id).size,
    gatedUnits: gatedIndexes33(section.id).size,
    answerLocation: answerLocation(section.id),
  };
});

export const COVERAGE_SUMMARY_33 = {
  blocks: SOURCE_LEDGER_COUNT_33,
  numberedBlocks: SOURCE_NUMBERED_COUNT_33,
  units: SOURCE_UNIT_COUNT_33,
  slides: SLIDES_33.length,
  stations: STATIONS_33.length,
  practiceItems: PRACTICE_33.length + DETECTIVE_33.length + STORY_ROWS_33.length + PARAGRAPH_SPOTS_33.length,
  testQuestions: TEST_QUESTIONS_33.length,
  testLevels: TEST_LEVELS_33.length,
  practiceBlocks: [...PRACTICE_BLOCKS].join(", "),
};

export { PRACTICE_BLOCKS };
