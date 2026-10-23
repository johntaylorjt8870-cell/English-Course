import { SOURCE_TEXT_43 } from "./source43";

// سجل المصدر: الغلاف + الأقسام 1–33 و35–37 محفوظة نصًا وترتيبًا.
// §34 (مساحة المعلم — الحلول التفصيلية) ليست هنا: نصّها يحتوي مفتاح الاختبار
// النهائي كاملًا، ولذلك تعيش في teacherSource43.ts ولا تُستورد إلا من وحدات
// المعلم المحمّلة عند الطلب. لو بقيت في هذا الملف لخرج المفتاح داخل حزمة
// الطالب الأولى. التدقيق يتحقق من أن الاتّحاد 37 قسمًا تعليميًا + قسم معلم معزول.

export type SourceSection43 = {
  num: number;
  id: string;
  title: string;
  lines: string[];
  units: { id: string; text: string }[];
};

export const SOURCE_SECTIONS_43: SourceSection43[] = SOURCE_TEXT_43.split("@@")
  .filter(Boolean)
  .map((block) => {
    const [heading, ...lines] = block.trim().split("\n");
    const num = Number(heading.split(" ")[0]);
    return {
      num,
      id: num ? `s${String(num).padStart(2, "0")}` : "cover",
      title: heading.slice(heading.indexOf(" ") + 1),
      lines,
      units: lines.map((text, index) => ({ id: `s${num}-u${index + 1}`, text })),
    };
  });

export const SOURCE_UNIT_COUNT_43 = SOURCE_SECTIONS_43.reduce((total, section) => total + section.lines.length, 0);

export function section43(num: number): SourceSection43 {
  const found = SOURCE_SECTIONS_43.find((section) => section.num === num);
  if (!found) throw new Error(`Unknown source section ${num}`);
  return found;
}

export function sectionLines43(num: number): string[] {
  return section43(num).lines;
}

export function sectionTitle43(num: number): string {
  return section43(num).title;
}

/** وحدات القسم المعروضة في شريحة معينة — تُستخدم في تدقيق التغطية. */
export function unitsInRange43(num: number, range: [number, number]): string[] {
  const lines = sectionLines43(num);
  const last = Math.max(0, lines.length - 1);
  const start = Math.max(0, Math.min(range[0], last));
  const end = Math.max(start, Math.min(range[1], last));
  return lines.slice(start, end + 1);
}

// الأعداد العربية المستخدمة في العناوين والبنود (①…㉕).
export const NUMBER_MARKS_43 = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕";


/** يجمّع الأسطر في كتل تبدأ بعلامة ترقيم عددية (① ② …) ويُلحق ما يليها حتى العلامة التالية. */
export function numbered43(lines: string[]): { number: number; lines: string[] }[] {
  const groups: { number: number; lines: string[] }[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    const mark = NUMBER_MARKS_43.indexOf(trimmed.charAt(0));
    if (mark >= 0) {
      groups.push({ number: mark + 1, lines: [trimmed.slice(1).trim()] });
    } else if (groups.length > 0) {
      groups[groups.length - 1].lines.push(line);
    }
  }
  return groups;
}

/**
 * عناوين مثل «MAY vs MIGHT — هل هناك فرق في قوة الاحتمال؟» تحمل شقًا إنجليزيًا
 * وعنوانًا عربيًا. يُعرض الشقان سطرين معزولين حتى لا يتشارك زوج مختلط فقرة
 * RTL واحدة (عقد BIDI المشترك في src/shared/bidi.tsx). العناوين أحادية اللغة
 * ترجع بشق أول فارغ.
 */
export function splitTitle43(title: string): [string, string] {
  const dash = title.indexOf(" — ");
  if (dash > 0 && !/[؀-ۿ]/.test(title.slice(0, dash))) return [title.slice(0, dash), title.slice(dash + 3)];
  return ["", title];
}

// إحدى عشر محطة تعليمية. أرقام الأقسام تبقى كما وردت في المصدر، والتقسيم
// تربويّ فقط. المحطة العاشرة تمتد على §§32–34 لأن §34 هي مساحة المعلم المعزولة.
export const STATIONS_43: { id: string; name: string; en: string; emoji: string; start: number; end: number }[] = [
  { id: "start", name: "الانطلاق", en: "Orientation", emoji: "🚀", start: 0, end: 4 },
  { id: "may", name: "قناة MAY", en: "MAY Channel", emoji: "🌤️", start: 5, end: 7 },
  { id: "might", name: "قناة MIGHT", en: "MIGHT Channel", emoji: "🔮", start: 8, end: 11 },
  { id: "negation", name: "النفي", en: "Negation", emoji: "🚫", start: 12, end: 14 },
  { id: "permission", name: "الاستئذان", en: "Permission", emoji: "🚪", start: 15, end: 17 },
  { id: "maybe", name: "مختبر MAYBE", en: "Maybe Lab", emoji: "🔥", start: 18, end: 19 },
  { id: "past", name: "احتمال الماضي", en: "Past Possibility", emoji: "⏳", start: 20, end: 23 },
  { id: "four", name: "الأفعال الأربعة", en: "The Four Modals", emoji: "⚔️", start: 24, end: 25 },
  { id: "dialogue", name: "الحوار والتطبيق", en: "Dialogue & Practice", emoji: "🎭", start: 26, end: 31 },
  { id: "assessment", name: "القراءة والتقييم", en: "Reading & Assessment", emoji: "🏆", start: 32, end: 34 },
  { id: "writing", name: "الكتابة والخريطة", en: "Writing & Roadmap", emoji: "✍️", start: 35, end: 37 },
];

// الدرس 44 مسجّل فعلًا في المنصة؛ §37 هو نص خارطة الطريق الذي يحيل إليه.
export const NEXT_LESSON_43 = {
  status: "registered",
  route: "#/lesson/44",
  label: "Lesson 44 — MUST & HAVE TO",
  en: "Necessity, Obligation & Rules",
};
