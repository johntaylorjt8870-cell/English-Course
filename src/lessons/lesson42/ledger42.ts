import { SOURCE_TEXT_42 } from "./source42";

// سجل المصدر: الغلاف + الأقسام 1–40 و42–44 محفوظة نصًا وترتيبًا.
// نفس بنية ledger41: المصدر هو الحقيقة الوحيدة، والشرائح تعرض مقاطع منه بالنص.
//
// §41 (مساحة المعلم — الحلول التفصيلية) ليست هنا: نصّها يحتوي مفتاح الاختبار
// النهائي كاملًا، ولذلك تعيش في teacherSource42.ts ولا تُستورد إلا من وحدات
// المعلم المحمّلة عند الطلب. لو بقيت في هذا الملف لخرج المفتاح داخل حزمة
// الطالب الأولى. التدقيق يتحقق من أن الاتّحاد 45 قسمًا و932 وحدة.
export type SourceSection42 = {
  num: number;
  id: string;
  title: string;
  lines: string[];
};

export const SOURCE_SECTIONS_42: SourceSection42[] = SOURCE_TEXT_42.split("@@")
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

export const SOURCE_UNIT_COUNT_42 = SOURCE_SECTIONS_42.reduce((total, section) => total + section.lines.length, 0);

export function section42(num: number): SourceSection42 {
  const found = SOURCE_SECTIONS_42.find((section) => section.num === num);
  if (!found) throw new Error(`Unknown source section ${num}`);
  return found;
}

export function sectionLines42(num: number): string[] {
  return section42(num).lines;
}

export function sectionTitle42(num: number): string {
  return section42(num).title;
}

/** وحدات القسم المعروضة في شريحة معينة — تُستخدم في تدقيق التغطية. */
export function unitsInRange42(num: number, range: [number, number]): string[] {
  return sectionLines42(num).slice(range[0], range[1] + 1);
}

/**
 * عناوين مثل «CAN vs COULD — مقارنة القدرة» تحمل شقًا إنجليزيًا وعنوانًا عربيًا.
 * يُعرض الشقان سطرين معزولين حتى لا يتشارك زوج مختلط فقرة RTL واحدة
 * (عقد BIDI المشترك في src/shared/bidi.tsx). العناوين أحادية اللغة ترجع
 * بشق أول فارغ.
 */
export function splitTitle42(title: string): [string, string] {
  const dash = title.indexOf(" — ");
  if (dash > 0 && !/[\u0600-\u06FF]/.test(title.slice(0, dash))) return [title.slice(0, dash), title.slice(dash + 3)];
  return ["", title];
}

// الدرس 43 مسجّل فعلًا في المنصة؛ §44 هو نص خارطة الطريق الذي يحيل إليه.
export const NEXT_LESSON_42 = {
  status: "registered",
  route: "#/lesson/43",
  label: "Lesson 43 — MAY & MIGHT",
  en: "Possibility, Probability & Permission",
};
