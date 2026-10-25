// ============================================================
// Lesson 36 — deck, part A
// Opening, golden question, comparison map, decision vs plan,
// prediction vs present evidence.
// ============================================================

import { U, slide, type Block, type DecisionItem, type ExampleItem, type Ref, type Slide36, type Tone } from "./content36";
import { TABLE_ROWS_36 } from "./ledger36";

const prose = (...lines: Ref[]): Block => ({ kind: "prose", lines });
const subhead = (line: Ref): Block => ({ kind: "subhead", line });
const cue = (line: Ref): Block => ({ kind: "cue", line });
const examples = (...items: ExampleItem[]): Block => ({ kind: "examples", items });
const pair = (en: Ref, ar: Ref): ExampleItem => ({ en, ar });
const callout = (tone: Tone, ...lines: Ref[]): Block => ({ kind: "callout", tone, lines });

const cookItems: DecisionItem[] = [
  { label: U("s05", 1), lines: [U("s05", 2), U("s05", 3)], cue: U("s05", 4), form: U("s05", 5), answer: "now", note: U("s05", 6) },
  { label: U("s05", 7), lines: [U("s05", 8), U("s05", 9)], cue: U("s05", 10), form: U("s05", 11), answer: "plan", note: U("s05", 12) },
];

const studyItems: DecisionItem[] = [
  { lines: [U("s05", 14), U("s05", 15)], answer: "now", note: U("s05", 16) },
  { cue: U("s05", 17), lines: [U("s05", 18)], answer: "plan", note: U("s05", 19) },
];

export const DECK_A_36: Slide36[] = [
  {
    ...slide("cover", "start", "WILL vs BE GOING TO", "إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي", ["cover"]),
    blocks: [
      { kind: "hero", title: U("cover", 0), subtitle: U("cover", 1), level: U("cover", 2), lines: [] },
      { kind: "prose", lines: [U("cover", 3), U("cover", 4)] },
      { kind: "callout", tone: "note", title: "سؤال الدرس", lines: [U("cover", 5), U("cover", 6), U("cover", 7)] },
    ],
  },
  {
    ...slide("s01", "start", "أهداف الدرس", "عشرة أهداف واضحة تقود كل خطوة في الدرس", ["s01"]),
    blocks: [{ kind: "objectives", lead: U("s01", 0), items: Array.from({ length: 10 }, (_, i) => U("s01", i + 1)) }],
  },
  {
    ...slide("s02a", "golden", "السؤال الذهبي: ماذا يقصد المتحدث؟", "جملة واحدة… صيغتان صحيحتان، والسياق يحدد الاختيار", ["s02"]),
    blocks: [
      prose(U("s02", 0)),
      examples({ en: U("s02", 1) }),
      cue(U("s02", 2)),
      examples({ en: U("s02", 3) }),
      cue(U("s02", 4)),
      examples({ en: U("s02", 5) }),
      prose(U("s02", 6), U("s02", 7), U("s02", 8)),
    ],
  },
  {
    ...slide("s02b", "golden", "موقفان… وقراران مختلفان", "نفس الفعل، ونفس كلمة الوقت، واختياران مختلفان", ["s02"]),
    blocks: [
      {
        kind: "situations",
        items: [
          { label: U("s02", 9), context: U("s02", 10), cue: U("s02", 11), en: U("s02", 12), ar: U("s02", 13), note: U("s02", 14) },
          { label: U("s02", 15), context: U("s02", 16), cue: U("s02", 17), en: U("s02", 18), ar: U("s02", 19), note: U("s02", 20) },
        ],
      },
      prose(U("s02", 21), U("s02", 22)),
    ],
  },
  {
    ...slide("s03", "golden", "الخريطة الأساسية للمقارنة", "ثمانية مواقف، وصيغة نموذجية لكل موقف", ["s03"]),
    blocks: [
      { kind: "table", caption: "الخريطة الأساسية للمقارنة بين WILL وBE GOING TO", rows: TABLE_ROWS_36 },
      callout("warn", U("s03", 0), U("s03", 1), U("s03", 2)),
    ],
  },
  {
    ...slide("s04a", "decision", "القرار اللحظي", "قرار يُتخذ في لحظة الكلام استجابةً لموقف جديد", ["s04"]),
    blocks: [
      subhead(U("s04", 0)),
      prose(U("s04", 1), U("s04", 2)),
      cue(U("s04", 3)),
      examples(pair(U("s04", 4), U("s04", 5))),
      prose(U("s04", 6), U("s04", 7)),
      cue(U("s04", 8)),
      {
        kind: "dialogue",
        lines: [
          { en: U("s04", 9), ar: U("s04", 11) },
          { en: U("s04", 10), ar: U("s04", 12) },
        ],
      },
      callout("success", U("s04", 13), U("s04", 14)),
    ],
  },
  {
    ...slide("s04b", "decision", "الخطة المسبقة", "قرار وُجد قبل الكلام، فنحن نخبر عنه ولا ننشئه الآن", ["s04"]),
    blocks: [
      subhead(U("s04", 15)),
      prose(U("s04", 16)),
      cue(U("s04", 17)),
      examples(pair(U("s04", 18), U("s04", 19))),
      prose(U("s04", 20)),
      cue(U("s04", 21)),
      examples(pair(U("s04", 22), U("s04", 23))),
    ],
  },
  {
    ...slide("s05a", "decision", "مختبر القرار: الفعل cook", "الفعل نفسه في سياقين — اختر وصف الاستخدام ثم اقرأ التفسير", ["s05"]),
    blocks: [
      prose(U("s05", 0)),
      { kind: "lab", lab: { kind: "decision", id: "cook", prompt: "اختر وصف الاستخدام الأنسب لكل موقف قبل كشف التفسير.", items: cookItems } },
    ],
  },
  {
    ...slide("s05b", "decision", "مختبر القرار: الفعل study", "نفس المبدأ مع فعل مختلف — الفعل لا يحدد الصيغة", ["s05"]),
    blocks: [
      prose(U("s05", 13)),
      { kind: "lab", lab: { kind: "decision", id: "study", prompt: "اختر وصف الاستخدام الأنسب لكل موقف قبل كشف التفسير.", items: studyItems } },
      callout("warn", U("s05", 20)),
    ],
  },
  {
    ...slide("s06a", "prediction", "التوقع أو الاعتقاد مع WILL", "حين نقدّم رأي المتحدث بشأن ما قد يحدث مستقبلًا", ["s06"]),
    blocks: [
      subhead(U("s06", 0)),
      prose(U("s06", 1)),
      cue(U("s06", 2)),
      examples(pair(U("s06", 3), U("s06", 4))),
      cue(U("s06", 5)),
      examples(pair(U("s06", 6), U("s06", 7))),
      cue(U("s06", 8)),
      examples(pair(U("s06", 9), U("s06", 10))),
      prose(U("s06", 11)),
    ],
  },
  {
    ...slide("s06b", "prediction", "التوقع المدعوم بدليل حاضر", "حين يكون ما نراه الآن هو أساس التوقع", ["s06"]),
    blocks: [
      subhead(U("s06", 12)),
      prose(U("s06", 13)),
      cue(U("s06", 14)),
      examples(pair(U("s06", 15), U("s06", 16))),
      prose(U("s06", 17)),
      cue(U("s06", 18)),
      examples(pair(U("s06", 19), U("s06", 20))),
    ],
  },
  {
    ...slide("s07", "prediction", "هل وجود دليل يجعل WILL خطأ؟", "مقارنة عدسة التوقع العام بعدسة الدليل الحاضر", ["s07"]),
    blocks: [
      prose(U("s07", 0), U("s07", 1)),
      cue(U("s07", 2)),
      {
        kind: "lab",
        lab: {
          kind: "lens",
          id: "evidence",
          evidence: { sentence: U("s07", 3), ar: U("s07", 4), why: U("s07", 5) },
          general: { cue: U("s07", 6), sentence: U("s07", 7), ar: U("s07", 8), why: U("s07", 9) },
          check: {
            question: "هل يمنع وجود الدليل استخدام WILL؟",
            options: [
              { value: "no", label: "لا؛ الصيغتان ممكنتان، والفرق في ما يبرزه المتحدث." },
              { value: "yes", label: "نعم؛ الدليل الحاضر يمنع WILL دائمًا." },
            ],
            answer: "no",
            feedback: "وجود الدليل يفضّل going to عند إبراز الدليل، لكنه لا يجعل WILL خطأ نحويًا.",
          },
        },
      },
      prose(U("s07", 10), U("s07", 11), U("s07", 12), U("s07", 13), U("s07", 14), U("s07", 15)),
    ],
  },
  {
    ...slide("s08", "functions", "الوعود والعروض", "WILL تناسب الوعد وعرض المساعدة في لحظة الكلام", ["s08"]),
    blocks: [
      prose(U("s08", 0)),
      cue(U("s08", 1)),
      examples(pair(U("s08", 2), U("s08", 3))),
      cue(U("s08", 4)),
      examples(pair(U("s08", 5), U("s08", 6))),
      prose(U("s08", 7)),
      examples({ en: U("s08", 8) }, { en: U("s08", 9) }),
      prose(U("s08", 10), U("s08", 11)),
      prose(U("s08", 12)),
      examples(pair(U("s08", 13), U("s08", 14))),
      prose(U("s08", 15)),
    ],
  },
  {
    ...slide("s09a", "functions", "Will you أم Are you going to؟", "سؤال عن الاستعداد مقابل سؤال عن النية أو الخطة", ["s09"]),
    blocks: [
      prose(U("s09", 0)),
      cue(U("s09", 1)),
      examples(pair(U("s09", 2), U("s09", 3))),
      prose(U("s09", 4)),
      cue(U("s09", 5)),
      examples(pair(U("s09", 6), U("s09", 7))),
      prose(U("s09", 8)),
      cue(U("s09", 9)),
      examples(pair(U("s09", 10), U("s09", 11)), pair(U("s09", 12), U("s09", 13))),
      prose(U("s09", 14)),
    ],
  },
  {
    ...slide("s09b", "functions", "مثال تطبيقي: الفني والطابعة", "الفرق نفسه داخل حوار قصير", ["s09"]),
    blocks: [
      prose(U("s09", 15)),
      {
        kind: "dialogue",
        lines: [{ en: U("s09", 16) }, { en: U("s09", 17) }, { en: U("s09", 18) }],
      },
      prose(U("s09", 19)),
      cue(U("s09", 20)),
      {
        kind: "dialogue",
        lines: [{ en: U("s09", 21) }, { en: U("s09", 22) }],
      },
      prose(U("s09", 23)),
    ],
  },
  {
    ...slide("s10", "functions", "Tomorrow لا تعني WILL دائمًا", "الكلمة الزمنية تحدد متى، لا لماذا اخترنا الصيغة", ["s10"]),
    blocks: [
      prose(U("s10", 0)),
      examples({ en: U("s10", 1) }, { en: U("s10", 2) }),
      prose(U("s10", 3), U("s10", 4), U("s10", 5), U("s10", 6)),
      cue(U("s10", 7)),
      { kind: "chips", items: [U("s10", 8), U("s10", 9), U("s10", 10), U("s10", 11), U("s10", 12), U("s10", 13)] },
      prose(U("s10", 14)),
    ],
  },
];
