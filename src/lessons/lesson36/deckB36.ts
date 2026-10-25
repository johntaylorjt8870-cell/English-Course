// ============================================================
// Lesson 36 — deck, part B
// Structure review, Wh questions, WILL BE, the Lina/Omar dialogue,
// overlap, the travel laboratory, and the guided practice set.
// ============================================================

import {
  K,
  U,
  slide,
  type Block,
  type BlankItem,
  type ContextItem,
  type DetectiveItem,
  type ExampleItem,
  type Ref,
  type Slide36,
  type Tone,
} from "./content36";

const prose = (...lines: Ref[]): Block => ({ kind: "prose", lines });
const subhead = (line: Ref): Block => ({ kind: "subhead", line });
const cue = (line: Ref): Block => ({ kind: "cue", line });
const examples = (...items: ExampleItem[]): Block => ({ kind: "examples", items });
const pair = (en: Ref, ar: Ref): ExampleItem => ({ en, ar });
const callout = (tone: Tone, ...lines: Ref[]): Block => ({ kind: "callout", tone, lines });

const WILL_OR_GOING = [
  { value: "will", label: "WILL" },
  { value: "going", label: "BE GOING TO" },
];

const travelItems: ContextItem[] = [
  { label: U("s16", 1), context: [U("s16", 2)], sentence: U("s16", 3), note: U("s16", 4), choices: WILL_OR_GOING, answer: "will" },
  { label: U("s16", 5), context: [U("s16", 6)], sentence: U("s16", 7), note: U("s16", 8), choices: WILL_OR_GOING, answer: "going" },
  { label: U("s16", 9), context: [U("s16", 10)], sentence: U("s16", 11), note: U("s16", 12), choices: WILL_OR_GOING, answer: "will" },
  { label: U("s16", 13), context: [U("s16", 14)], sentence: U("s16", 15), note: U("s16", 16), choices: WILL_OR_GOING, answer: "going" },
];

const detectiveItems: DetectiveItem[] = [
  { n: 1, prompt: U("s17", 1), answerRefs: [K("s17", 1), K("s17", 2), K("s17", 3)], accepted: ["She will study tomorrow.", "She is going to study tomorrow."] },
  { n: 2, prompt: U("s17", 2), answerRefs: [K("s17", 4), K("s17", 5), K("s17", 6)], accepted: ["I am going to buy a new bicycle.", "I will buy a new bicycle."] },
  { n: 3, prompt: U("s17", 3), answerRefs: [K("s17", 7)], accepted: ["He will go to the library."] },
  { n: 4, prompt: U("s17", 4), answerRefs: [K("s17", 8)], accepted: ["They are going to visit us."] },
  { n: 5, prompt: U("s17", 5), answerRefs: [K("s17", 9), K("s17", 10), K("s17", 11)], accepted: ["Will you join the club?", "Are you going to join the club?"] },
  { n: 6, prompt: U("s17", 6), answerRefs: [K("s17", 12)], accepted: ["Is she going to participate?"] },
  { n: 7, prompt: U("s17", 7), answerRefs: [K("s17", 13)], accepted: ["I'm sure he will understand.", "I am sure he will understand."] },
  { n: 8, prompt: U("s17", 8), answerRefs: [K("s17", 14), K("s17", 15), K("s17", 16), K("s17", 17)], accepted: ["Look! The glass is going to fall.", "Look! The glass will fall."] },
  { n: 9, prompt: U("s17", 9), answerRefs: [K("s17", 18)], accepted: ["We won't cancel the trip.", "We will not cancel the trip."] },
  {
    n: 10,
    prompt: U("s17", 10),
    answerRefs: [K("s17", 19), K("s17", 20), K("s17", 21)],
    accepted: ["She isn't going to arrive late.", "She is not going to arrive late.", "She isn't going to be late.", "She is not going to be late."],
  },
];

const dialogueBlanks: BlankItem[] = [
  { n: 1, line: U("s19", 2), accepted: ["I'm going to visit", "I am going to visit"], answerRef: K("s19", 1), explanation: [K("s19", 2)] },
  { n: 2, line: U("s19", 4), accepted: ["I'll remind", "I will remind"], answerRef: K("s19", 3), explanation: [K("s19", 4)] },
  { n: 3, line: U("s19", 5), accepted: ["will give"], answerRef: K("s19", 5), explanation: [K("s19", 6)] },
  { n: 4, line: U("s19", 6), accepted: ["will add"], answerRef: K("s19", 7), explanation: [K("s19", 8), K("s19", 9), K("s19", 10)] },
];

export const DECK_B_36: Slide36[] = [
  {
    ...slide("s11a", "form", "المراجعة البنائية: WILL", "الإثبات والنفي والسؤال والإجابة في صيغة WILL", ["s11"]),
    blocks: [
      prose(U("s11", 0)),
      {
        kind: "formulas",
        cards: [
          {
            form: "will",
            title: U("s11", 1),
            rows: [
              { label: U("s11", 2), formula: U("s11", 3), examples: [U("s11", 4)] },
              { label: U("s11", 5), formula: U("s11", 6), examples: [U("s11", 7)] },
              { label: U("s11", 8), formula: U("s11", 9), examples: [U("s11", 10)] },
              { label: U("s11", 11), examples: [U("s11", 12), U("s11", 13)] },
            ],
          },
        ],
      },
    ],
  },
  {
    ...slide("s11b", "form", "المراجعة البنائية: BE GOING TO", "الصيغة الكاملة مع am/is/are وgoing to", ["s11"]),
    blocks: [
      {
        kind: "formulas",
        cards: [
          {
            form: "going",
            title: U("s11", 14),
            rows: [
              { label: U("s11", 15), formula: U("s11", 16), examples: [U("s11", 17)] },
              { label: U("s11", 18), formula: U("s11", 19), examples: [U("s11", 20)] },
              { label: U("s11", 21), formula: U("s11", 22), examples: [U("s11", 23)] },
              { label: U("s11", 24), examples: [U("s11", 25), U("s11", 26)] },
            ],
          },
        ],
      },
    ],
  },
  {
    ...slide("s12", "form", "مقارنة أسئلة Wh", "ثلاثة أسئلة بالصيغتين، مع ملاحظة دقيقة عن تقارب المعنى", ["s12"]),
    blocks: [
      prose(U("s12", 0)),
      examples(pair(U("s12", 1), U("s12", 2)), pair(U("s12", 3), U("s12", 4)), pair(U("s12", 5), U("s12", 6))),
      prose(U("s12", 7)),
      examples(pair(U("s12", 8), U("s12", 9)), pair(U("s12", 10), U("s12", 11)), pair(U("s12", 12), U("s12", 13))),
      prose(U("s12", 14)),
    ],
  },
  {
    ...slide("s13", "form", "WILL BE وGOING TO BE", "وصف حالة مستقبلية، والأخطاء الشائعة في بناء be", ["s13"]),
    blocks: [
      prose(U("s13", 0), U("s13", 1), U("s13", 2)),
      cue(U("s13", 3)),
      examples(pair(U("s13", 4), U("s13", 5))),
      cue(U("s13", 6)),
      examples(pair(U("s13", 7), U("s13", 8))),
      cue(U("s13", 9)),
      examples(pair(U("s13", 10), U("s13", 11)), pair(U("s13", 12), U("s13", 13))),
      prose(U("s13", 14)),
      {
        kind: "verdicts",
        items: [
          { ok: false, line: U("s13", 15) },
          { ok: true, line: U("s13", 16) },
          { ok: false, line: U("s13", 17) },
          { ok: true, line: U("s13", 18) },
        ],
      },
    ],
  },
  {
    ...slide("s14a", "dialogue", "The Unexpected Problem", "حوار كامل يجمع الصيغتين في موقف واحد", ["s14"]),
    blocks: [
      prose(U("s14", 0)),
      {
        kind: "dialogue",
        lines: [
          { en: U("s14", 1) },
          { en: U("s14", 2) },
          { en: U("s14", 3) },
          { en: U("s14", 4) },
          { en: U("s14", 5) },
          { en: U("s14", 6) },
          { en: U("s14", 7) },
          { en: U("s14", 8) },
          { en: U("s14", 9) },
        ],
      },
      { kind: "translations", heading: U("s14", 10), lines: [U("s14", 11), U("s14", 12), U("s14", 13), U("s14", 14), U("s14", 15), U("s14", 16), U("s14", 17), U("s14", 18), U("s14", 19)] },
    ],
  },
  {
    ...slide("s14b", "dialogue", "تحليل الحوار", "ست جمل، ووظيفة كل صيغة داخل الموقف", ["s14"]),
    blocks: [
      {
        kind: "analysis",
        heading: U("s14", 20),
        items: [{ en: U("s14", 21) }, { en: U("s14", 22) }, { en: U("s14", 23) }, { en: U("s14", 24) }, { en: U("s14", 25) }, { en: U("s14", 26) }],
      },
      prose(U("s14", 27)),
    ],
  },
  {
    ...slide("s15", "dialogue", "هل يمكن أن تكون الإجابتان صحيحتين؟", "التداخل بين الصيغتين، ومتى لا نبحث عن فرق مصطنع", ["s15"]),
    blocks: [
      prose(U("s15", 0), U("s15", 1)),
      examples({ en: U("s15", 2) }, { en: U("s15", 3) }),
      prose(U("s15", 4), U("s15", 5), U("s15", 6), U("s15", 7)),
      cue(U("s15", 8)),
      examples({ en: U("s15", 9) }, { en: U("s15", 10) }),
      prose(U("s15", 11), U("s15", 12), U("s15", 13)),
      subhead(U("s15", 14)),
      prose(U("s15", 15)),
      callout("success", U("s15", 16), U("s15", 17)),
      prose(U("s15", 18)),
    ],
  },
  {
    ...slide("s16", "practice", "مختبر المواقف: الفعل travel", "أربعة مواقف، واختيار واحد يناسب كل موقف", ["s16"]),
    blocks: [
      prose(U("s16", 0)),
      { kind: "lab", lab: { kind: "context", id: "travel", prompt: "اختر الصيغة الأنسب ثم أكّد السبب قبل كشف التفسير.", items: travelItems, requireReason: true } },
      prose(U("s16", 17)),
    ],
  },
  {
    ...slide("s17", "practice", "Grammar Detective: أخطاء متقدمة", "صحّح عشر جمل، ثم قارن تصحيحك بالحل والتفسير", ["s17"]),
    blocks: [
      prose(U("s17", 0)),
      { kind: "lab", lab: { kind: "detective", id: "detective", heading: K("s17", 0), items: detectiveItems } },
    ],
  },
  {
    ...slide("s18", "practice", "اختر الصيغة الأنسب", "ثمانية مواقف موجهة، مع تفسير كل اختيار", ["s18"]),
    blocks: [
      prose(U("s18", 0)),
      {
        kind: "lab",
        lab: {
          kind: "choose",
          id: "choose-form",
          heading: K("s18", 0),
          items: [
            { n: 1, prompt: [U("s18", 1), U("s18", 2)], answer: K("s18", 1), key: "will" },
            { n: 2, prompt: [U("s18", 3)], answer: K("s18", 2), key: "going" },
            { n: 3, prompt: [U("s18", 4)], answer: K("s18", 3), key: "going" },
            { n: 4, prompt: [U("s18", 5)], answer: K("s18", 4), key: "will" },
            { n: 5, prompt: [U("s18", 6)], answer: K("s18", 5), key: "will" },
            { n: 6, prompt: [U("s18", 7), U("s18", 8)], answer: K("s18", 6), key: "will" },
            { n: 7, prompt: [U("s18", 9)], answer: K("s18", 7), key: "going" },
            { n: 8, prompt: [U("s18", 10)], answer: K("s18", 8), key: "going" },
          ],
        },
      },
    ],
  },
  {
    ...slide("s19", "practice", "أكمل الحوار: Sara وAdam", "أربعة فراغات، وقاعدة تفسّر كل اختيار", ["s19"]),
    blocks: [
      {
        kind: "lab",
        lab: {
          kind: "dialogueFill",
          id: "sara-adam",
          intro: U("s19", 0),
          heading: K("s19", 0),
          lines: [U("s19", 1), U("s19", 2), U("s19", 3), U("s19", 4), U("s19", 5), U("s19", 6), U("s19", 7)],
          blanks: dialogueBlanks,
        },
      },
    ],
  },
];
