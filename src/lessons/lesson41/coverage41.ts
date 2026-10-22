import { SOURCE_SECTIONS_41, SOURCE_UNIT_COUNT_41 } from "./ledger41";
import { SLIDES_41 } from "./slides41";
import { PRACTICE_COUNTS_41 } from "./practice41";
import { TEST_QUESTIONS_41 } from "./testData41";

const PRACTICE_SECTIONS = new Set(Object.keys(PRACTICE_COUNTS_41).map(Number));

export type CoverageRow41 = {
  num: number;
  id: string;
  title: string;
  units: number;
  slides: string[];
  renderedUnits: number;
  answerLocation: string;
};

function rangesFor(section: number): [number, number][] {
  return SLIDES_41.filter((slide) => slide.section === section && slide.range).map((slide) => slide.range!);
}

export function coveredIndexes41(section: number): Set<number> {
  const total = SOURCE_SECTIONS_41.find((s) => s.num === section)!.lines.length;
  if (PRACTICE_SECTIONS.has(section)) {
    return new Set(Array.from({ length: total }, (_, i) => i));
  }
  if (section === 36 || section === 37) {
    return new Set(Array.from({ length: total }, (_, i) => i));
  }
  const covered = new Set<number>();
  rangesFor(section).forEach(([from, to]) => {
    for (let i = from; i <= to; i += 1) covered.add(i);
  });
  return covered;
}

export function uncoveredUnits41(): { section: number; index: number; text: string }[] {
  const missing: { section: number; index: number; text: string }[] = [];
  SOURCE_SECTIONS_41.forEach((section) => {
    const covered = coveredIndexes41(section.num);
    section.lines.forEach((text, index) => {
      if (!covered.has(index)) missing.push({ section: section.num, index, text });
    });
  });
  return missing;
}

export const COVERAGE_41: CoverageRow41[] = SOURCE_SECTIONS_41.map((section) => {
  const slides = SLIDES_41.filter((slide) => slide.section === section.num);
  return {
    num: section.num,
    id: section.id,
    title: section.title,
    units: section.lines.length,
    slides: slides.map((slide) => slide.id),
    renderedUnits: coveredIndexes41(section.num).size,
    answerLocation:
      section.num === 36
        ? "TestArea41 ثم SolutionsArea41 (بعد التسليم)"
        : section.num === 37
          ? "TeacherArea41 + SolutionsArea41 (محمية)"
          : PRACTICE_SECTIONS.has(section.num)
            ? "بطاقة التدريب بعد المحاولة + TeacherGuide41"
            : "داخل الشريحة",
  };
});

export const COVERAGE_SUMMARY_41 = {
  sections: SOURCE_SECTIONS_41.length,
  units: SOURCE_UNIT_COUNT_41,
  slides: SLIDES_41.length,
  practiceItems: Object.values(PRACTICE_COUNTS_41).reduce((a, b) => a + b, 0),
  testQuestions: TEST_QUESTIONS_41.length,
};
