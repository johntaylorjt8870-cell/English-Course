// ============================================================
// Lesson 36 — deck, part C
// Context writing, the robotics reading challenge, the formal
// assessment launch, the writing mission, the golden summary and
// the curriculum progress map.
// ============================================================

import { K, U, slide, type Block, type Ref, type Slide36, type Tone } from "./content36";

const prose = (...lines: Ref[]): Block => ({ kind: "prose", lines });
const subhead = (line: Ref): Block => ({ kind: "subhead", line });
const cue = (line: Ref): Block => ({ kind: "cue", line });
const callout = (tone: Tone, ...lines: Ref[]): Block => ({ kind: "callout", tone, lines });

export const DECK_C_36: Slide36[] = [
  {
    ...slide("s20", "practice", "غيّر المعنى بتغيير السياق", "اكتب موقفين، ثم قارن بمثالين أصليين", ["s20"]),
    blocks: [
      {
        kind: "lab",
        lab: {
          kind: "contextWriting",
          id: "context-writing",
          models: [
            { cue: U("s20", 0), sentence: U("s20", 1), task: U("s20", 2), models: [U("s20", 3), U("s20", 4), U("s20", 5)] },
            { cue: U("s20", 6), sentence: U("s20", 7), task: U("s20", 8), models: [U("s20", 9), U("s20", 10), U("s20", 11)] },
          ],
        },
      },
      prose(U("s20", 12), U("s20", 13), U("s20", 14)),
    ],
  },
  {
    ...slide("s21a", "assessment", "Reading Challenge: The Robotics Competition", "نص كامل، ثم أسئلة فهم وتحليل نحوي", ["s21"]),
    blocks: [
      prose(U("s21", 0)),
      { kind: "passage", title: U("s21", 1), lines: [U("s21", 2), U("s21", 3), U("s21", 4), U("s21", 5), U("s21", 6), U("s21", 7), U("s21", 8), U("s21", 9), U("s21", 10), U("s21", 11), U("s21", 12), U("s21", 13), U("s21", 14), U("s21", 15), U("s21", 16), U("s21", 17), U("s21", 18), U("s21", 19)] },
    ],
  },
  {
    ...slide("s21b", "assessment", "أسئلة الفهم والتحليل النحوي", "سبعة أسئلة، ثم سبع إجابات وثمانية تحليلات", ["s21"]),
    blocks: [
      subhead(U("s21", 20)),
      {
        kind: "lab",
        lab: {
          kind: "reading",
          id: "robotics",
          questions: [U("s21", 21), U("s21", 22), U("s21", 23), U("s21", 24), U("s21", 25), U("s21", 26), U("s21", 27)],
          answers: K("s21", 0),
          answerLines: [K("s21", 1), K("s21", 2), K("s21", 3), K("s21", 4), K("s21", 5), K("s21", 6), K("s21", 7)],
          analysisHeading: K("s21", 8),
          analysis: [K("s21", 9), K("s21", 10), K("s21", 11), K("s21", 12), K("s21", 13), K("s21", 14), K("s21", 15), K("s21", 16)],
        },
      },
    ],
  },
  {
    ...slide("s22", "assessment", "الاختبار النهائي: 25 سؤالًا", "خمسة مستويات: اختيار، إكمال، تصحيح، فهم، تحدٍّ نهائي", ["s22"]),
    blocks: [
      prose(U("s22", 0), U("s22", 1)),
      {
        kind: "launch",
        tone: "test",
        title: "اختبار من 25 سؤالًا في خمسة مستويات",
        body: "الأسئلة الخمسة والعشرون كاملة في منطقة الاختبار. لن يظهر أي تصحيح أو نتيجة قبل التسليم، ولن يُقبل تسليم غير مكتمل.",
        actionLabel: "ابدأ الاختبار",
      },
    ],
  },
  {
    ...slide("s23", "assessment", "الحلول التفصيلية", "تُفتح بعد التسليم أو عبر بوابة المعلم", ["s23"]),
    blocks: [
      subhead(U("s23", 0)),
      prose(U("s23", 1)),
      { kind: "launch", tone: "solutions", title: "المفتاح الكامل للأسئلة الخمسة والعشرين", body: "يضم المفتاح التفسير التعليمي لكل سؤال والبدائل المقبولة حين يسمح السياق.", actionLabel: "عرض الحلول التفصيلية", sourceLabel: U("s23", 2) },
    ],
  },
  {
    ...slide("s24", "wrap", "Writing Mission: My Future Decisions and Plans", "فقرة من 12 إلى 15 جملة، بثمانية متطلبات", ["s24"]),
    blocks: [
      {
        kind: "lab",
        lab: {
          kind: "writing",
          id: "writing-mission",
          title: U("s24", 0),
          task: U("s24", 1),
          intro: U("s24", 2),
          criteria: [U("s24", 3), U("s24", 4), U("s24", 5), U("s24", 6), U("s24", 7), U("s24", 8), U("s24", 9), U("s24", 10)],
          modelHeading: U("s24", 11),
          modelLines: [U("s24", 12), U("s24", 13), U("s24", 14), U("s24", 15)],
          closing: U("s24", 16),
        },
      },
    ],
  },
  {
    ...slide("s25a", "wrap", "الملخص الذهبي: WILL", "الصيغة، والاستخدامات الخمسة، والمثالان", ["s25"]),
    blocks: [
      {
        kind: "summary",
        form: "will",
        title: U("s25", 0),
        formulaLabel: U("s25", 1),
        formula: U("s25", 2),
        usesLabel: U("s25", 3),
        uses: [U("s25", 4), U("s25", 5), U("s25", 6), U("s25", 7), U("s25", 8)],
        exampleLabel: U("s25", 9),
        examples: [U("s25", 10), U("s25", 11)],
      },
    ],
  },
  {
    ...slide("s25b", "wrap", "الملخص الذهبي: BE GOING TO والقاعدة الكبرى", "استخدامان، ثم الأسئلة الخمسة التي تحدد الاختيار", ["s25"]),
    blocks: [
      {
        kind: "summary",
        form: "going",
        title: U("s25", 12),
        formulaLabel: U("s25", 13),
        formula: U("s25", 14),
        usesLabel: U("s25", 15),
        uses: [U("s25", 16), U("s25", 17)],
        exampleLabel: U("s25", 18),
        examples: [U("s25", 19), U("s25", 20)],
      },
      subhead(U("s25", 21)),
      prose(U("s25", 22), U("s25", 23), U("s25", 24)),
      { kind: "checklist", items: [U("s25", 25), U("s25", 26), U("s25", 27), U("s25", 28), U("s25", 29)] },
      prose(U("s25", 30), U("s25", 31)),
      callout("success", U("s25", 32)),
    ],
  },
  {
    ...slide("s26", "wrap", "خريطة تقدم المنهج", "أين وصلنا، وما المحطة التالية", ["s26"]),
    blocks: [
      prose(U("s26", 0)),
      {
        kind: "map",
        groups: [
          { heading: U("s26", 1), items: [U("s26", 2), U("s26", 3), U("s26", 4), U("s26", 5)], tone: "present" },
          { heading: U("s26", 6), items: [U("s26", 7), U("s26", 8), U("s26", 9), U("s26", 10)], tone: "past" },
          { heading: U("s26", 11), items: [U("s26", 12), U("s26", 13), U("s26", 14)], tone: "future" },
        ],
      },
      cue(U("s26", 15)),
      subhead(U("s26", 16)),
      prose(U("s26", 17)),
      cue(U("s26", 18)),
      { kind: "examples", items: [{ en: U("s26", 19), ar: U("s26", 20) }] },
      prose(U("s26", 21)),
      callout("tip", U("s26", 22)),
    ],
  },
];
