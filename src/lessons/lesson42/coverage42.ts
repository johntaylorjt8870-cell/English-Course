import { SOURCE_SECTIONS_42, SOURCE_UNIT_COUNT_42 } from "./ledger42";
import { SLIDES_42 } from "./slides42";
import { PRACTICE_COUNTS_42 } from "./practice42";
import { TEST_QUESTIONS_42 } from "./testData42";

const PRACTICE_SECTIONS = new Set(Object.keys(PRACTICE_COUNTS_42).map(Number));

export type CoverageRow42 = {
  num: number;
  id: string;
  title: string;
  units: number;
  slides: string[];
  renderedUnits: number;
  answerLocation: string;
};

function rangesFor(section: number): [number, number][] {
  return SLIDES_42.filter((slide) => slide.section === section && slide.range).map((slide) => slide.range!);
}

export function coveredIndexes42(section: number): Set<number> {
  const total = SOURCE_SECTIONS_42.find((s) => s.num === section)!.lines.length;
  // أقسام التدريبات والقراءة: النص يُعرض داخل بطاقات التدريب (المسألة) وتُفتح
  // الإجابة بعد المحاولة. القسم 40: الاختبار النهائي.
  // §41 ليست في SOURCE_SECTIONS_42 (مفتاح الاختبار معزول في teacherSource42.ts)،
  // وتغطيتها تُدقَّق في scripts/audit-lesson42.mjs مع بقية الأقسام.
  if (PRACTICE_SECTIONS.has(section) || section === 40) {
    return new Set(Array.from({ length: total }, (_, i) => i));
  }
  const covered = new Set<number>();
  rangesFor(section).forEach(([from, to]) => {
    for (let i = from; i <= to; i += 1) covered.add(i);
  });
  return covered;
}

export function uncoveredUnits42(): { section: number; index: number; text: string }[] {
  const missing: { section: number; index: number; text: string }[] = [];
  SOURCE_SECTIONS_42.forEach((section) => {
    const covered = coveredIndexes42(section.num);
    section.lines.forEach((text, index) => {
      if (!covered.has(index)) missing.push({ section: section.num, index, text });
    });
  });
  return missing;
}

export const COVERAGE_42: CoverageRow42[] = SOURCE_SECTIONS_42.map((section) => {
  const slides = SLIDES_42.filter((slide) => slide.section === section.num);
  return {
    num: section.num,
    id: section.id,
    title: section.title,
    units: section.lines.length,
    slides: slides.map((slide) => slide.id),
    renderedUnits: coveredIndexes42(section.num).size,
    answerLocation:
      section.num === 40
        ? "TestArea42 ثم SolutionsArea42 (بعد التسليم)"
        : PRACTICE_SECTIONS.has(section.num)
          ? "بطاقة التدريب بعد المحاولة + TeacherGuide42"
          : "داخل الشريحة",
  };
});

/** عدد الأقسام الكلي بما فيها §41 المعزولة في teacherSource42.ts. */
export const TOTAL_SECTIONS_42 = SOURCE_SECTIONS_42.length + 1;

export const COVERAGE_SUMMARY_42 = {
  sections: SOURCE_SECTIONS_42.length,
  units: SOURCE_UNIT_COUNT_42,
  slides: SLIDES_42.length,
  practiceItems: Object.values(PRACTICE_COUNTS_42).reduce((a, b) => a + b, 0),
  testQuestions: TEST_QUESTIONS_42.length,
};
