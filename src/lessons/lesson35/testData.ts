// Student-visible assessment prompts. Answer data is deliberately isolated in testKey35.ts and loaded only after submission/reveal.
export type TestQuestion35 = { n: number; type: "single" | "typed" | "repair" | "write"; promptLines: string[]; options?: string[] };
export type TestLevel35 = { id: string; title: string; range: string; instruction?: string; questions: TestQuestion35[] };

export const TEST_INTRO_35 = [
  "يتكون الاختبار من 25 سؤالًا، موزعة على خمسة مستويات.",
  "حاول الإجابة عن جميع الأسئلة قبل فتح الحلول.",
];

export const TEST_LEVELS_35: TestLevel35[] = [
  {
    "id": "level-1",
    "title": "المستوى الأول: اختر الإجابة الصحيحة",
    "range": "الأسئلة 1–5",
    "questions": [
      {
        "n": 1,
        "type": "single",
        "promptLines": [
          "① She ______ going to learn coding."
        ],
        "options": [
          "am",
          "is",
          "are"
        ]
      },
      {
        "n": 2,
        "type": "single",
        "promptLines": [
          "② They are going to ______ a new project."
        ],
        "options": [
          "starting",
          "started",
          "start"
        ]
      },
      {
        "n": 3,
        "type": "single",
        "promptLines": [
          "③ ______ you going to attend the meeting?"
        ],
        "options": [
          "Do",
          "Are",
          "Will"
        ]
      },
      {
        "n": 4,
        "type": "single",
        "promptLines": [
          "④ He isn't going to ______ the invitation."
        ],
        "options": [
          "accept",
          "accepts",
          "accepted"
        ]
      },
      {
        "n": 5,
        "type": "single",
        "promptLines": [
          "⑤ I'm going to ______ ready early."
        ],
        "options": [
          "am",
          "be",
          "being"
        ]
      }
    ]
  },
  {
    "id": "level-2",
    "title": "المستوى الثاني: أكمل الجمل",
    "range": "الأسئلة 6–10",
    "instruction": "أكمل الجمل بالصيغة المناسبة. يمكن كتابة الجزء الناقص فقط أو الجملة كاملة.",
    "questions": [
      {
        "n": 6,
        "type": "typed",
        "promptLines": [
          "⑥ We ______ (visit) the botanical garden next Sunday. We planned it yesterday."
        ]
      },
      {
        "n": 7,
        "type": "typed",
        "promptLines": [
          "⑦ Look at that cyclist! He ______ (fall)!"
        ]
      },
      {
        "n": 8,
        "type": "typed",
        "promptLines": [
          "⑧ I ______ (not / buy) a new phone this month. I've already decided."
        ]
      },
      {
        "n": 9,
        "type": "typed",
        "promptLines": [
          "⑨ ______ she ______ (take) a language course next summer?"
        ]
      },
      {
        "n": 10,
        "type": "typed",
        "promptLines": [
          "⑩ They ______ (organize) a charity event. The preparations have already started."
        ]
      }
    ]
  },
  {
    "id": "level-3",
    "title": "المستوى الثالث: WILL أم GOING TO؟",
    "range": "الأسئلة 11–15",
    "instruction": "اختر الصيغة الأنسب بحسب الموقف. اكتب will أو is going to أو are going to.",
    "questions": [
      {
        "n": 11,
        "type": "typed",
        "promptLines": [
          "⑪ A: The phone is ringing!",
          "B: I ______ answer it."
        ]
      },
      {
        "n": 12,
        "type": "typed",
        "promptLines": [
          "⑫ Look at the sky! It ______ snow."
        ]
      },
      {
        "n": 13,
        "type": "typed",
        "promptLines": [
          "⑬ I promise I ______ help you."
        ]
      },
      {
        "n": 14,
        "type": "typed",
        "promptLines": [
          "⑭ We have already booked the tickets. We ______ travel next Friday."
        ]
      },
      {
        "n": 15,
        "type": "typed",
        "promptLines": [
          "⑮ I think the new invention ______ change people's lives."
        ]
      }
    ]
  },
  {
    "id": "level-4",
    "title": "المستوى الرابع: Grammar Detective",
    "range": "الأسئلة 16–20",
    "instruction": "صحح الأخطاء. اكتب الجملة كاملة بعد التصحيح.",
    "questions": [
      {
        "n": 16,
        "type": "repair",
        "promptLines": [
          "⑯ She are going to study medicine."
        ]
      },
      {
        "n": 17,
        "type": "repair",
        "promptLines": [
          "⑰ They going to build a house."
        ]
      },
      {
        "n": 18,
        "type": "repair",
        "promptLines": [
          "⑱ Is he going to buys a new laptop?"
        ]
      },
      {
        "n": 19,
        "type": "repair",
        "promptLines": [
          "⑲ I am going to am a scientist."
        ]
      },
      {
        "n": 20,
        "type": "repair",
        "promptLines": [
          "⑳ Does she going to travel tomorrow?"
        ]
      }
    ]
  },
  {
    "id": "level-5",
    "title": "المستوى الخامس: IQ200",
    "range": "الأسئلة 21–25",
    "instruction": "اكتب جملة إنجليزية مناسبة لكل موقف.",
    "questions": [
      {
        "n": 21,
        "type": "write",
        "promptLines": [
          "㉑ قررت منذ أسبوع أن تبدأ تعلم اللغة الألمانية الشهر القادم."
        ]
      },
      {
        "n": 22,
        "type": "write",
        "promptLines": [
          "㉒ ترى طفلًا يقترب من حافة مرتفعة، وتتوقع أنه سيسقط."
        ]
      },
      {
        "n": 23,
        "type": "write",
        "promptLines": [
          "㉓ صديقك يحتاج إلى المساعدة، وقررت الآن مساعدته."
        ]
      },
      {
        "n": 24,
        "type": "write",
        "promptLines": [
          "㉔ تريد أن تسأل صديقك: ماذا تنوي أن تفعل خلال العطلة الصيفية؟"
        ]
      },
      {
        "n": 25,
        "type": "write",
        "promptLines": [
          "㉕ تريد أن تقول إنك تعتقد أن التعليم سيتغير كثيرًا في المستقبل."
        ]
      }
    ]
  }
];
export const TEST_35 = TEST_LEVELS_35.flatMap(level => level.questions);
export const TEST_35_COUNT = TEST_35.length;
export const TEST_LEVEL_COUNT_35 = TEST_LEVELS_35.length;
export function isAnswered35(question: TestQuestion35, value: unknown): boolean {
  return question.type === "single" ? typeof value === "number" : typeof value === "string" && value.trim().length > 0;
}
