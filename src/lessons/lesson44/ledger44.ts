import { SOURCE_TEXT_44 } from "./source44";

export const NUMBER_MARKS_44 = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕";

export type DutyChannelId44 =
  | "charter"
  | "must"
  | "haveto"
  | "prohibit"
  | "optional"
  | "past"
  | "future";

export interface DutyChannelMeta44 {
  id: DutyChannelId44;
  codeEn: string;
  labelAr: string;
  cueAr: string;
  icon: "compass" | "scale" | "clipboard" | "ban" | "open" | "rewind" | "forward";
}

export const DUTY_CHANNELS_44: Record<DutyChannelId44, DutyChannelMeta44> = {
  charter: {
    id: "charter",
    codeEn: "COMMAND CHARTER",
    labelAr: "منظومة الضرورة والإلزام",
    cueAr: "خريطة القرار الدلالي",
    icon: "compass",
  },
  must: {
    id: "must",
    codeEn: "MUST + V1",
    labelAr: "إلزام وتأكيد قوي",
    cueAr: "صيغة ثابتة لا تتغير",
    icon: "scale",
  },
  haveto: {
    id: "haveto",
    codeEn: "HAVE / HAS TO + V1",
    labelAr: "ضرورة ومتطلب واقعي",
    cueAr: "يتغير مع الفاعل والزمن",
    icon: "clipboard",
  },
  prohibit: {
    id: "prohibit",
    codeEn: "MUSTN'T + V1",
    labelAr: "المنع القاطع",
    cueAr: "الفعل محظور وغير مسموح",
    icon: "ban",
  },
  optional: {
    id: "optional",
    codeEn: "DON'T / DOESN'T HAVE TO",
    labelAr: "عدم الضرورة والاختيار",
    cueAr: "غير إلزامي — القرار لك",
    icon: "open",
  },
  past: {
    id: "past",
    codeEn: "HAD TO / DIDN'T HAVE TO",
    labelAr: "إلزام الماضي",
    cueAr: "بلا musted — الماضي مع had to",
    icon: "rewind",
  },
  future: {
    id: "future",
    codeEn: "WILL / WON'T HAVE TO",
    labelAr: "إلزام المستقبل",
    cueAr: "التزام قادم مع will have to",
    icon: "forward",
  },
};

export interface SourceSection44 {
  num: number;
  id: string;
  title: string;
  lines: string[];
  units: { id: string; text: string }[];
}

export const SOURCE_SECTIONS_44: SourceSection44[] = SOURCE_TEXT_44.split("@@")
  .filter(Boolean)
  .map((block) => {
    const [heading, ...lines] = block.trim().split("\n");
    const spaceAt = heading.indexOf(" ");
    const num = Number(heading.slice(0, spaceAt));
    const id = num ? `s${String(num).padStart(2, "0")}` : "cover";
    return {
      num,
      id,
      title: heading.slice(spaceAt + 1),
      lines,
      units: lines.map((text, index) => ({
        id: `${id}-u${index + 1}`,
        text,
      })),
    };
  });

export const SOURCE_UNIT_COUNT_44 = SOURCE_SECTIONS_44.reduce(
  (sum, s) => sum + s.lines.length,
  0
);

export function section44(num: number): SourceSection44 {
  const found = SOURCE_SECTIONS_44[num];
  if (!found) throw new Error(`Unknown Lesson 44 section: ${num}`);
  return found;
}

export function unitId44(num: number, index: number): string {
  const section = section44(num);
  return `${section.id}-u${index + 1}`;
}

export function numbered44(lines: string[]): { number: number; lines: string[] }[] {
  const result: { number: number; lines: string[] }[] = [];
  for (const line of lines) {
    const index = NUMBER_MARKS_44.indexOf(line[0] ?? "");
    if (index >= 0) {
      result.push({ number: index + 1, lines: [line.slice(1).trim()] });
    } else if (result.length > 0) {
      result[result.length - 1]!.lines.push(line);
    }
  }
  return result;
}

export interface Station44 {
  id: string;
  name: string;
  en: string;
  start: number;
  end: number;
  channel: DutyChannelId44;
}

export const STATIONS_44: Station44[] = [
  { id: "st-01", name: "الانطلاق والميثاق", en: "ORIENTATION", start: 0, end: 1, channel: "charter" },
  { id: "st-02", name: "قناة MUST والضرورة", en: "MUST · OBLIGATION", start: 2, end: 6, channel: "must" },
  { id: "st-03", name: "قناة HAVE TO والمتطلبات", en: "HAVE TO · NECESSITY", start: 7, end: 9, channel: "haveto" },
  { id: "st-04", name: "المقارنة والحوار الأول", en: "MUST vs HAVE TO", start: 10, end: 12, channel: "must" },
  { id: "st-05", name: "المنع مقابل عدم الضرورة", en: "PROHIBITION vs OPTIONAL", start: 13, end: 16, channel: "prohibit" },
  { id: "st-06", name: "السؤال والإجابات القصيرة", en: "QUESTIONS & REPLIES", start: 17, end: 19, channel: "optional" },
  { id: "st-07", name: "الضرورة في الماضي", en: "PAST · HAD TO", start: 20, end: 22, channel: "past" },
  { id: "st-08", name: "الضرورة في المستقبل", en: "FUTURE · WILL HAVE TO", start: 23, end: 24, channel: "future" },
  { id: "st-09", name: "حدود النصيحة والحوار الشامل", en: "ADVICE & FULL DIALOGUE", start: 25, end: 26, channel: "charter" },
  { id: "st-10", name: "المحقق النحوي", en: "GRAMMAR DETECTIVE", start: 27, end: 27, channel: "prohibit" },
  { id: "st-11", name: "التدريبات التطبيقية", en: "PRACTICE SETS 1–5", start: 28, end: 32, channel: "haveto" },
  { id: "st-12", name: "القراءة والتقييم النهائي", en: "READING & MASTER TEST", start: 33, end: 35, channel: "charter" },
  { id: "st-13", name: "الكتابة والملخص والخريطة", en: "WRITING, SUMMARY & MAP", start: 36, end: 38, channel: "future" },
];

export function station44(step: number): Station44 {
  return STATIONS_44.find((s) => step >= s.start && step <= s.end) ?? STATIONS_44[0]!;
}

export function stepChannel44(step: number): DutyChannelId44 {
  if (step === 0 || step === 1) return "charter";
  if (step >= 2 && step <= 6) return "must";
  if (step >= 7 && step <= 9) return "haveto";
  if (step === 10 || step === 11) return "must";
  if (step === 12) return "haveto";
  if (step === 13 || step === 14) return "prohibit";
  if (step === 15) return "optional";
  if (step === 16) return "prohibit";
  if (step === 17 || step === 18) return "haveto";
  if (step === 19) return "must";
  if (step >= 20 && step <= 22) return "past";
  if (step === 23 || step === 24) return "future";
  if (step === 25 || step === 26) return "charter";
  if (step === 27) return "prohibit";
  if (step === 28) return "must";
  if (step === 29) return "prohibit";
  if (step === 30) return "past";
  if (step === 31) return "haveto";
  if (step === 32) return "optional";
  return "charter";
}

export function splitTitle44(title: string): [string, string] {
  const dash = title.indexOf(" — ");
  if (dash > 0 && !/[؀-ۿ]/.test(title.slice(0, dash))) {
    return [title.slice(0, dash), title.slice(dash + 3)];
  }
  return ["", title];
}

export const NEXT_LESSON_44 = {
  status: "planned-not-implemented" as const,
  label: "Lesson 45 — SHOULD & OUGHT TO",
  en: "Advice, Recommendations & Expectations",
};
