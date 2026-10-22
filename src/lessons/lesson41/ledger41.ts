import { SOURCE_TEXT_41 } from "./source41";

// سجل المصدر: الغلاف + الأقسام 1–40 محفوظة نصًا وترتيبًا.
export type SourceSection41 = {
  num: number;
  id: string;
  title: string;
  lines: string[];
};

export const SOURCE_SECTIONS_41: SourceSection41[] = SOURCE_TEXT_41.split("@@")
  .filter(Boolean)
  .map((block) => {
    const [heading, ...lines] = block.trim().split("\n");
    const num = Number(heading.split(" ")[0]);
    return {
      num,
      id: num ? `s${String(num).padStart(2, "0")}` : "cover",
      title: heading.slice(heading.indexOf(" ") + 1),
      lines,
    };
  });

export const SOURCE_UNIT_COUNT_41 = SOURCE_SECTIONS_41.reduce((total, section) => total + section.lines.length, 0);

export function section41(num: number): SourceSection41 {
  const found = SOURCE_SECTIONS_41.find((section) => section.num === num);
  if (!found) throw new Error(`Unknown source section ${num}`);
  return found;
}

export function sectionLines41(num: number): string[] {
  return section41(num).lines;
}

export function sectionTitle41(num: number): string {
  return section41(num).title;
}

/** وحدات القسم المعروضة في شريحة معينة — تُستخدم في تدقيق التغطية. */
export function unitsInRange41(num: number, range: [number, number]): string[] {
  return sectionLines41(num).slice(range[0], range[1] + 1);
}
