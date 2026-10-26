import { useState, type ReactNode } from "react";
import {
  Article44,
  ChannelBadge44,
  En44,
  Glyph44,
  Label44,
  Plate44,
  Text44,
  Title44,
} from "./kit44";
import {
  DUTY_CHANNELS_44,
  STATIONS_44,
  section44,
  splitTitle44,
  station44,
  unitId44,
  type DutyChannelId44,
} from "./ledger44";
import {
  LESSON_IDENTITY_AR_44,
  LESSON_STEP_COUNT_44,
  LESSON_TITLE_44,
  STEP_DESCRIPTORS_44,
} from "./data";
import {
  DetectiveSourceKey44,
  GrammarDetective44,
  PracticeSet44,
  ReadingChallenge44,
  Roadmap44,
  WritingMission44,
} from "./labs44";
import {
  ChoiceLab44,
  ContextToneLab44,
  Dialog44,
  DidntHaveToNuanceLab44,
  GoalList44,
  MeaningShiftSimulator44,
  MustQuestionTrapLab44,
  NuanceOverlapLab44,
  ObligationBuilder44,
  ProhibitionSorter44,
  PronounSwitchboard44,
  QuestionBuilder44,
  StrengthGaugeLab44,
  SummaryDeck44,
  TenseMachine44,
  type Choice44,
} from "./tools44";
import { TEST_LEVELS_44 } from "./testData44";

// ------------------------------------------------------------
// Step-local interactive check banks (covering every concept step)
// ------------------------------------------------------------
const MUST_RULE_ITEMS: Choice44[] = [
  {
    prompt: "أي الجمل التالية صحيحة نحويًا؟",
    options: ["She musts study.", "She must study.", "She must to study."],
    answer: "She must study.",
    why: "MUST فعل ناقص ثابت يتبعه V1 مباشرة دون s أو to.",
  },
  {
    prompt: "أكمل الجملة: We ______ protect the environment.",
    options: ["must", "musts", "must to"],
    answer: "must",
    why: "MUST تبقى بصيغة واحدة مع جميع الفاعلين.",
  },
];

const SPEAKER_URGENCY_ITEMS: Choice44[] = [
  {
    prompt: "يقول المتحدث لنفسه: I ______ remember to call my grandmother.",
    options: ["must", "has to", "musts"],
    answer: "must",
    why: "المتحدث يؤكد لنفسه ضرورة شخصية مهمة، والفاعل I يأخذ must.",
  },
  {
    prompt: "هل يقتصر استخدام MUST على الإلزام النابع من الشخص نفسه فقط؟",
    options: [
      "لا، تُستخدم أيضًا في القوانين والتعليمات الرسمية",
      "نعم، لا تُستخدم أبدًا في القواعد المكتوبة",
    ],
    answer: "لا، تُستخدم أيضًا في القوانين والتعليمات الرسمية",
    why: "تُستخدم MUST للتأكيد الشخصي كما تُستخدم بكثرة في اللوائح والتعليمات الرسمية.",
  },
];

const LAB_RULES_ITEMS: Choice44[] = [
  {
    prompt: "لافتة عند مدخل المبنى: Visitors ______ show their identification at the entrance.",
    options: ["must", "must to", "has to"],
    answer: "must",
    why: "اللافتات الرسمية تُصاغ كثيرًا بـ must + V1، ومع الجمع Visitors لا تصح has to.",
  },
  {
    prompt: "في مختبر العلوم: You ______ report any accident immediately.",
    options: ["must", "musts", "must reporting"],
    answer: "must",
    why: "تعليمات السلامة الإلزامية تتبع الصيغة الثابتة: must + V1.",
  },
];

const HAS_TO_ITEMS: Choice44[] = [
  {
    prompt: "أكمل: She ______ finish her project tonight.",
    options: ["have to", "has to", "musts"],
    answer: "has to",
    why: "HAVE TO تركيب شبه ناقص يتغير مع المفرد الغائب She إلى has to.",
  },
  {
    prompt: "أكمل: They ______ wear uniforms at school.",
    options: ["has to", "have to", "must to"],
    answer: "have to",
    why: "مع الجمع They نستخدم have to + V1.",
  },
];

const HAVETO_TRIGGER_ITEMS: Choice44[] = [
  {
    prompt: "My father ______ leave early because his meeting starts at eight.",
    options: ["has to", "have to", "musts"],
    answer: "has to",
    why: "ظرف عملي خارجي (موعد الاجتماع) مع فاعل مفرد غائب My father ← has to.",
  },
  {
    prompt: "We ______ buy more food because the fridge is empty.",
    options: ["have to", "has to", "must to"],
    answer: "have to",
    why: "ضرورة ناتجة عن ظرف واقعي مع الفاعل الجمع We ← have to.",
  },
];

const GOLDEN_COMPARE_ITEMS: Choice44[] = [
  {
    prompt: "أي زوج من الجمل صحيح نحويًا بالكامل؟",
    options: [
      "She must finish the report. / She has to finish the report.",
      "She musts finish the report. / She has to finish the report.",
      "She must finish the report. / She have to finish the report.",
    ],
    answer: "She must finish the report. / She has to finish the report.",
    why: "كلتا الجملتين سليمتان؛ MUST تبقى ثابتة بينما تتحول HAVE TO إلى has to مع She.",
  },
  {
    prompt: "أي التعبيرين يقبل التصريف في الماضي والمستقبل؟",
    options: ["HAVE TO (had to / will have to)", "MUST (musted / will must)"],
    answer: "HAVE TO (had to / will have to)",
    why: "HAVE TO تركيب شبه ناقص يقبل التصريف عبر الأزمنة، بخلاف MUST.",
  },
];

const DIALOG_12_QUIZ: Choice44[] = [
  {
    prompt: "لماذا استخدم عمر عبارة I have to revise three chapters tonight في الحوار؟",
    options: [
      "لأن لديه امتحانًا صباح الغد يفرض هذا الالتزام العملي",
      "لأن المراجعة ممنوعة عليه",
    ],
    answer: "لأن لديه امتحانًا صباح الغد يفرض هذا الالتزام العملي",
    why: "موعد الامتحان غدًا ظرف عملي واضح جعل عمر يعبّر بـ have to.",
  },
  {
    prompt: "ما دلالة قول مايا: I must make a study plan؟",
    options: [
      "ضرورة تؤكدها لنفسها لأنها تلاحظ إضاعة الوقت",
      "عدم الحاجة إلى وضع خطة",
    ],
    answer: "ضرورة تؤكدها لنفسها لأنها تلاحظ إضاعة الوقت",
    why: "مايا تشعر شخصيًا بضرورة تنظيم وقتها فتؤكد ذلك بـ must.",
  },
];

const MUSTNT_ITEMS: Choice44[] = [
  {
    prompt: "ماذا تعني الجملة: Drivers mustn't use their phones while driving؟",
    options: [
      "يُمنع على السائقين استخدام الهواتف أثناء القيادة",
      "لا يلزم السائقين استخدام الهواتف ولكن يُسمح لهم بذلك",
    ],
    answer: "يُمنع على السائقين استخدام الهواتف أثناء القيادة",
    why: "mustn't = must not + V1 وتفيد المنع القاطع.",
  },
  {
    prompt: "اختر الصيغة السليمة للمنع:",
    options: [
      "Students mustn't cheat in exams.",
      "Students don't must cheat in exams.",
      "Students mustn't to cheat in exams.",
    ],
    answer: "Students mustn't cheat in exams.",
    why: "بعد mustn't يأتي الفعل الأساسي V1 مباشرة دون to ودون don't.",
  },
];

const DONT_HAVETO_ITEMS: Choice44[] = [
  {
    prompt: "اختر الجملة الصحيحة لنفي الضرورة مع المفرد الغائب:",
    options: [
      "She doesn't have to study tonight.",
      "She doesn't has to study tonight.",
      "She don't have to study tonight.",
    ],
    answer: "She doesn't have to study tonight.",
    why: "مع She نستخدم doesn't، وبعدها يعود الفعل وجوبًا إلى صيغته الأساسية have to.",
  },
  {
    prompt: "ما معنى: We don't have to bring our books today؟",
    options: [
      "لسنا مضطرين لإحضار الكتب اليوم",
      "يُمنع علينا إحضار الكتب اليوم",
    ],
    answer: "لسنا مضطرين لإحضار الكتب اليوم",
    why: "don't have to تنفي الإلزام ولا تفيد المنع.",
  },
];

const SHORT_ANSWER_ITEMS: Choice44[] = [
  {
    prompt: "السؤال: Does she have to study tonight? — اختر الإجابة القصيرة السليمة:",
    options: ["No, she doesn't.", "No, she hasn't.", "No, she mustn't."],
    answer: "No, she doesn't.",
    why: "السؤال بدأ بـ Does، فتكون الإجابة القصيرة بـ Yes, she does أو No, she doesn't.",
  },
  {
    prompt: "ماذا تعني الإجابة No, she doesn't في هذا السياق؟",
    options: [
      "أنها غير ملزمة بالدراسة الليلة",
      "أن الدراسة ممنوعة عليها الليلة",
    ],
    answer: "أنها غير ملزمة بالدراسة الليلة",
    why: "نفي السؤال المصوغ بـ Does she have to يفيد غياب الإلزام لا المنع.",
  },
];

const PAST_ITEMS: Choice44[] = [
  {
    prompt: "أكمل: I ______ wake up early yesterday.",
    options: ["musted", "had to", "has to"],
    answer: "had to",
    why: "لا توجد صيغة musted في الإنجليزية؛ الماضي من الإلزام هو had to + V1.",
  },
  {
    prompt: "أكمل: They ______ cancel the trip because of the weather.",
    options: ["had to", "had", "musted"],
    answer: "had to",
    why: "نستخدم had to + V1 للتعبير عن الاضطرار في الماضي.",
  },
];

const PAST_QUESTION_ITEMS: Choice44[] = [
  {
    prompt: "اختر السؤال الصحيح عن الضرورة في الماضي:",
    options: [
      "Did you have to wake up early?",
      "Did you had to wake up early?",
      "Had you to wake up early yesterday?",
    ],
    answer: "Did you have to wake up early?",
    why: "لأن Did تحمل زمن الماضي، يعود الفعل بعدها إلى صيغته الأساسية have to.",
  },
  {
    prompt: "أكمل: ______ she have to finish the project last night?",
    options: ["Did", "Does", "Was"],
    answer: "Did",
    why: "وجود last night يدل على الماضي، فنسأل بـ Did + Subject + have to + V1.",
  },
];

const FUTURE_ITEMS: Choice44[] = [
  {
    prompt: "أكمل: She ______ leave early tomorrow.",
    options: ["will has to", "will have to", "will must"],
    answer: "will have to",
    why: "بعد will نستخدم الصيغة الأساسية have to مع جميع الضمائر.",
  },
  {
    prompt: "أكمل: They ______ complete the project by Friday.",
    options: ["will have to", "will had to", "musts"],
    answer: "will have to",
    why: "الالتزام المستقبلي يُصاغ بـ will have to + V1.",
  },
];

const FUTURE_MATRIX_ITEMS: Choice44[] = [
  {
    prompt: "نفي الضرورة في المستقبل: You ______ come early tomorrow.",
    options: ["won't have to", "won't has to", "didn't have to"],
    answer: "won't have to",
    why: "مع tomorrow ننفي الإلزام المستقبلي بـ won't have to + V1.",
  },
  {
    prompt: "السؤال عن التزام مستقبلي: ______ we have to take another exam?",
    options: ["Will", "Did", "Does"],
    answer: "Will",
    why: "صيغة سؤال المستقبل: Will + Subject + have to + V1?",
  },
];

const DIALOG_26_QUIZ: Choice44[] = [
  {
    prompt: "في الحوار، ما الفرق بين قول المعلمة No, you don't have to عن المعدات وقولها You mustn't use phones عن الهواتف؟",
    options: [
      "إحضار المعدات غير ضروري لأن المدرسة توفرها، أما الهواتف فممنوعة أثناء المسابقة",
      "كلا الأمرين ممنوعان تمامًا",
    ],
    answer:
      "إحضار المعدات غير ضروري لأن المدرسة توفرها، أما الهواتف فممنوعة أثناء المسابقة",
    why: "جمع الحوار بين عدم الضرورة (don't have to) والمنع القاطع (mustn't) بوضوح تام.",
  },
  {
    prompt: "أي جملة في الحوار عبّرت عن التزام مستقبلي؟",
    options: [
      "We'll have to present our projects in front of the judges.",
      "I had to prepare my project all week.",
    ],
    answer: "We'll have to present our projects in front of the judges.",
    why: "We'll have to هي اختصار We will have to وتعبّر عن التزام في المستقبل.",
  },
];

// ------------------------------------------------------------
// Cover — The Obligation Command Center Opening Stage
// ------------------------------------------------------------
const CHANNEL_ORDER_COVER: DutyChannelId44[] = [
  "must",
  "haveto",
  "prohibit",
  "optional",
  "past",
  "future",
];

function Cover44({
  onNavigate,
  onTest,
}: {
  onNavigate: (step: number) => void;
  onTest: () => void;
}) {
  const s = section44(0);
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const voiceInsights = [
    "توجيه أسري عملي مرتبط بموعد الغد ← استُخدمت HAVE TO.",
    "لائحة مدرسية رسمية مكتوبة على لافتة ← استُخدمت MUST.",
    "عزم شخصي نابع من رغبة المتحدث في التفوق ← استُخدمت MUST.",
  ];

  return (
    <article className="cover44" data-source-section="cover">
      <section className="occ-hero" aria-label="بطاقة افتتاح الدرس 44">
        <div className="occ-hero-grid">
          <div className="occ-hero-main">
            <span className="occ-hero-kicker">
              <Glyph44 name="scale" />
              <span>الدرس 44</span>
              <span>·</span>
              <span>{LESSON_IDENTITY_AR_44}</span>
              <span>·</span>
              <span dir="ltr" className="font-en">
                IQ200
              </span>
            </span>

            <h1 className="occ-hero-en font-en" dir="ltr" lang="en">
              {LESSON_TITLE_44}
            </h1>

            <p className="occ-hero-ar" data-source-unit={unitId44(0, 0)}>
              <Text44 text={s.lines[0]!} />
            </p>
            <p
              className="occ-hero-dek font-en"
              data-source-unit={unitId44(0, 1)}
              dir="ltr"
              lang="en"
            >
              {s.lines[1]!.replace(/[^\x20-\x7E]+/g, "").trim()}
            </p>
            <p className="occ-hero-meta" data-source-unit={unitId44(0, 2)}>
              رحلة إتقان الإنجليزية — المنهج الشامل{" "}
              <span dir="ltr" className="font-en inline-block">
                120
              </span>{" "}
              درسًا —{" "}
              <span dir="ltr" className="font-en inline-block">
                IQ200
              </span>
            </p>

            <div className="coverActions44">
              <button
                type="button"
                className="btn44 btn44--hero-primary"
                onClick={() => onNavigate(1)}
              >
                ابدأ رحلة التعلّم <Glyph44 name="arrow" />
              </button>
              <button
                type="button"
                className="btn44 btn44--hero-ghost"
                onClick={onTest}
              >
                الاختبار النهائي (25 سؤالًا)
              </button>
            </div>
          </div>

          <div className="occ-channel-matrix" aria-label="قنوات الضرورة والإلزام الست">
            <p className="occ-matrix-head">القنوات الدلالية الست في مركز القيادة</p>
            {CHANNEL_ORDER_COVER.map((ch) => {
              const meta = DUTY_CHANNELS_44[ch];
              return (
                <div key={ch} className={`occ-matrix-row occ-matrix-row--${ch}`}>
                  <span className="occ-matrix-ar">
                    <Glyph44 name={meta.icon} />
                    <span>{meta.labelAr}</span>
                  </span>
                  <span dir="ltr" lang="en" className="font-en occ-matrix-en">
                    {meta.codeEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Plate44
        kicker="المشهد التمهيدي: ثلاثة مواقف من يومك الدراسي"
        title="اضغط على كل موقف لملاحظة دافع الإلزام وصيغته"
        channel="charter"
      >
        <p className="storyLead44" data-source-unit={unitId44(0, 3)}>
          <Text44 text={s.lines[3]!} />
        </p>

        <div className="voices44">
          {(
            [
              [4, 5, 6],
              [7, 8, 9],
              [10, 11, 12],
            ] as const
          ).map(([label, en, ar], idx) => (
            <figure
              className={`voice44 ${selectedVoice === idx ? "is-selected" : ""}`}
              key={label}
              onClick={() => setSelectedVoice(idx)}
            >
              <figcaption data-source-unit={unitId44(0, label)}>
                <Text44 text={s.lines[label]!} />
              </figcaption>
              <blockquote data-source-unit={unitId44(0, en)}>
                <En44 text={s.lines[en]!} />
              </blockquote>
              <p data-source-unit={unitId44(0, ar)}>
                <Text44 text={s.lines[ar]!} />
              </p>
              <button
                type="button"
                className="occ-voice-tag"
                aria-pressed={selectedVoice === idx}
                onClick={() => setSelectedVoice(idx)}
              >
                {selectedVoice === idx ? "✓ تحليل الموقف نشط" : "اعرض دافع الصيغة"}
              </button>
            </figure>
          ))}
        </div>

        <div className="fb44 fb44--info mt-2" aria-live="polite">
          <p className="fbTitle44">
            <Glyph44 name="insight" />
            <Text44 text={voiceInsights[selectedVoice]!} />
          </p>
        </div>

        <Article44 section={0} from={13} to={16} className="storyArticle44 mt-4" />

        <div className="pivot44">
          <p className="pivotLead44" data-source-unit={unitId44(0, 16)}>
            <Text44 text={s.lines[16]!} />
          </p>
          <p
            className="pivotTitle44 font-en"
            data-source-unit={unitId44(0, 17)}
            dir="ltr"
            lang="en"
          >
            {s.lines[17]!}
          </p>
        </div>

        <Article44 section={0} from={18} to={21} className="storyArticle44" />
        <p className="pullQuote44" data-source-unit={unitId44(0, 21)}>
          <Text44 text={s.lines[21]!} />
        </p>
        <Article44 section={0} from={22} to={24} className="storyArticle44" />

        <div className="crux44">
          <p className="kicker44">الفرق المحوري الأخطر في الدرس</p>
          <div className="cruxPair44">
            <div className="cruxPlate44 cruxPlate44--ban">
              <span className="cruxMark44">
                <Glyph44 name="ban" />
              </span>
              <span className="cruxTerm44 font-en" dir="ltr" lang="en">
                MUSTN&apos;T
              </span>
              <span className="cruxGloss44">منع قاطع</span>
              <p className="cruxSentence44" data-source-unit={unitId44(0, 24)}>
                <En44 text={s.lines[24]!} />
              </p>
            </div>
            <div className="cruxPlate44 cruxPlate44--open">
              <span className="cruxMark44">
                <Glyph44 name="open" />
              </span>
              <span className="cruxTerm44 font-en" dir="ltr" lang="en">
                DON&apos;T HAVE TO
              </span>
              <span className="cruxGloss44">عدم ضرورة (اختياري)</span>
              <p className="cruxSentence44" data-source-unit={unitId44(0, 25)}>
                <En44 text={s.lines[25]!} />
              </p>
            </div>
          </div>
          <p className="cruxConclusion44" data-source-unit={unitId44(0, 26)}>
            <Text44 text={s.lines[26]!} />
          </p>
        </div>
      </Plate44>
    </article>
  );
}

// ------------------------------------------------------------
// Assessment & Teacher Launchpads (Steps 34 & 35)
// ------------------------------------------------------------
function TestBrief44({
  onTest,
  onSolutions,
  testSubmitted,
}: {
  onTest: () => void;
  onSolutions: () => void;
  testSubmitted: boolean;
}) {
  return (
    <Plate44
      kicker="بوابة التقييم الشامل"
      title="خمسة مستويات تدريجية · 25 سؤالًا"
      channel="charter"
      status={testSubmitted ? "تم التسليم ✓" : "جاهز للبدء"}
    >
      <Article44 section={34} from={0} to={2} />
      <ol className="levelList44">
        {TEST_LEVELS_44.map((level) => (
          <li key={level.level}>
            <span className="levelNo44 levelNo44--brief font-en" aria-hidden="true">
              {String(level.level).padStart(2, "0")}
            </span>
            <span className="levelName44">
              <Label44 text={level.title} />
            </span>
            <span className="levelTag44">
              <bdi dir="ltr">{level.questions.length}</bdi> أسئلة
            </span>
          </li>
        ))}
      </ol>
      <p className="briefNote44">
        تبقى الإجابات والتفسيرات محجوبة تمامًا أثناء الحل، وتُحسب درجتك التفصيلية مع مراجعة الأخطاء فور التسليم.
      </p>
      <div className="taskActions44">
        <button type="button" className="btn44 btn44--solid" onClick={onTest}>
          {testSubmitted ? "عرض نتيجة الاختبار أو إعادته" : "ابدأ الاختبار النهائي الآن"}{" "}
          <Glyph44 name="arrow" />
        </button>
        {testSubmitted && (
          <button type="button" className="btn44 btn44--ghost" onClick={onSolutions}>
            فتح منطقة الحلول التفصيلية
          </button>
        )}
      </div>
    </Plate44>
  );
}

function TeacherBrief44({
  onTeacher,
  onSolutions,
  solutionsUnlocked,
}: {
  onTeacher: () => void;
  onSolutions: () => void;
  solutionsUnlocked: boolean;
}) {
  return (
    <Plate44
      kicker="التصحيح ودليل التدريس"
      title="مفتاح الحلول التفصيلية وبوابة المعلم"
      channel="charter"
    >
      <Article44 section={35} from={0} />
      <div className="taskActions44">
        {solutionsUnlocked && (
          <button type="button" className="btn44 btn44--solid" onClick={onSolutions}>
            فتح الحلول التفصيلية للاختبار <Glyph44 name="arrow" />
          </button>
        )}
        <button type="button" className="btn44 btn44--ghost" onClick={onTeacher}>
          الدخول إلى بوابة المعلم <Glyph44 name="lock" />
        </button>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// Unified Step Renderer (Cover + 38 Numbered Steps)
// ------------------------------------------------------------
export function Steps44({
  index,
  onTest,
  onSolutions,
  onTeacher,
  onNavigate,
  testSubmitted = false,
  solutionsUnlocked = false,
}: {
  index: number;
  onTest: () => void;
  onSolutions: () => void;
  onTeacher: () => void;
  onNavigate: (step: number) => void;
  testSubmitted?: boolean;
  solutionsUnlocked?: boolean;
}) {
  if (index === 0) {
    return <Cover44 onNavigate={onNavigate} onTest={onTest} />;
  }

  const source = section44(index);
  const descriptor = STEP_DESCRIPTORS_44[index]!;
  const [enTitle, arTitle] = splitTitle44(source.title);
  const station = station44(index);
  const chapterNo = STATIONS_44.indexOf(station) + 1;

  const englishTitle =
    enTitle ||
    (index === 12
      ? "Preparing for the Exam"
      : index === 26
        ? "A School Science Competition"
        : index === 33
          ? "A Day at the Science Centre"
          : index === 36
            ? "Rules and Responsibilities"
            : index === 27
              ? "Grammar Detective"
              : "");

  let body: ReactNode;
  switch (index) {
    case 1:
      body = <GoalList44 section={1} />;
      break;
    case 2:
      body = (
        <>
          <Plate44 kicker="القاعدة التأسيسية" channel="must">
            <Article44 section={2} />
          </Plate44>
          <ObligationBuilder44 />
        </>
      );
      break;
    case 3:
      body = (
        <>
          <Plate44 kicker="ثبات الصيغة مع جميع الضمائر" channel="must">
            <Article44 section={3} />
          </Plate44>
          <ChoiceLab44
            id="must-rule"
            channel="must"
            kicker="تحقّق فوري من القاعدة"
            title="اختبر إتقانك لثبات MUST"
            items={MUST_RULE_ITEMS}
          />
        </>
      );
      break;
    case 4:
      body = (
        <>
          <Plate44 kicker="السياق الأول لـ MUST" channel="must">
            <Article44 section={4} />
          </Plate44>
          <ChoiceLab44
            id="speaker-urgency"
            channel="must"
            kicker="تحقّق سياقي"
            title="تأكيد المتحدث الشخصي وحدود القاعدة"
            items={SPEAKER_URGENCY_ITEMS}
          />
        </>
      );
      break;
    case 5:
      body = (
        <>
          <Plate44 kicker="السياق الثاني لـ MUST" channel="must">
            <Article44 section={5} />
          </Plate44>
          <ChoiceLab44
            id="lab-rules"
            channel="must"
            kicker="تطبيق اللوائح الرسمية"
            title="صياغة قواعد السلامة والتعليمات"
            items={LAB_RULES_ITEMS}
          />
        </>
      );
      break;
    case 6:
      body = (
        <>
          <Plate44 kicker="السياق الثالث لـ MUST" channel="must">
            <Article44 section={6} />
          </Plate44>
          <ContextToneLab44 />
        </>
      );
      break;
    case 7:
      body = (
        <>
          <Plate44 kicker="التركيب شبه الناقص (Semi-modal)" channel="haveto">
            <Article44 section={7} />
          </Plate44>
          <ChoiceLab44
            id="hasto-rule"
            channel="haveto"
            kicker="تحقّق من الصيغة"
            title="توافق HAVE TO مع الفاعل"
            items={HAS_TO_ITEMS}
          />
        </>
      );
      break;
    case 8:
      body = (
        <>
          <Plate44 kicker="تصريف المضارع البسيط" channel="haveto">
            <Article44 section={8} />
          </Plate44>
          <PronounSwitchboard44 />
        </>
      );
      break;
    case 9:
      body = (
        <>
          <Plate44 kicker="دوافع استخدام HAVE TO الخمسة" channel="haveto">
            <Article44 section={9} />
          </Plate44>
          <ChoiceLab44
            id="haveto-triggers"
            channel="haveto"
            kicker="ربط الظرف بالصيغة"
            title="اختر الصيغة المناسبة للظرف العملي"
            items={HAVETO_TRIGGER_ITEMS}
          />
        </>
      );
      break;
    case 10:
      body = (
        <>
          <Plate44 kicker="الموازنة الدلالية الدقيقة" channel="must">
            <Article44 section={10} />
          </Plate44>
          <NuanceOverlapLab44 />
        </>
      );
      break;
    case 11:
      body = (
        <>
          <Plate44 kicker="المقارنة البنيوية والدلالية" channel="charter">
            <Article44 section={11} />
          </Plate44>
          <ChoiceLab44
            id="golden-compare"
            channel="charter"
            kicker="فحص المقارنة الذهبية"
            title="ميّز الصيغ الصحيحة من الفخاخ النحوية"
            items={GOLDEN_COMPARE_ITEMS}
          />
        </>
      );
      break;
    case 12:
      body = (
        <Dialog44
          section={12}
          title="حوار تطبيقي: الاستعداد للامتحان"
          englishTitle="Preparing for the Exam"
          quiz={DIALOG_12_QUIZ}
        />
      );
      break;
    case 13:
      body = (
        <>
          <Plate44 kicker="المنع القاطع مقابل غياب الإلزام" channel="prohibit">
            <Article44 section={13} />
          </Plate44>
          <ProhibitionSorter44 />
        </>
      );
      break;
    case 14:
      body = (
        <>
          <Plate44 kicker="بنية الحظر والمنع" channel="prohibit">
            <Article44 section={14} />
          </Plate44>
          <ChoiceLab44
            id="mustnt-check"
            channel="prohibit"
            kicker="تحقّق من صيغة المنع"
            title="MUSTN'T في المواقف التحذيرية"
            items={MUSTNT_ITEMS}
          />
        </>
      );
      break;
    case 15:
      body = (
        <>
          <Plate44 kicker="بنية عدم الضرورة" channel="optional">
            <Article44 section={15} />
          </Plate44>
          <ChoiceLab44
            id="dont-haveto-check"
            channel="optional"
            kicker="تحقّق من DON'T / DOESN'T HAVE TO"
            title="انتبه لعودة الفعل إلى HAVE بعد DOESN'T"
            items={DONT_HAVETO_ITEMS}
          />
        </>
      );
      break;
    case 16:
      body = (
        <>
          <Plate44 kicker="المقارنة الحاسمة بالمشهد الواحد" channel="prohibit">
            <Article44 section={16} />
          </Plate44>
          <MeaningShiftSimulator44 />
        </>
      );
      break;
    case 17:
      body = (
        <>
          <Plate44 kicker="صياغة الاستفهام في الحاضر" channel="haveto">
            <Article44 section={17} />
          </Plate44>
          <QuestionBuilder44 />
        </>
      );
      break;
    case 18:
      body = (
        <>
          <Plate44 kicker="الرد المختصر السليم" channel="optional">
            <Article44 section={18} />
          </Plate44>
          <ChoiceLab44
            id="short-answers"
            channel="optional"
            kicker="تحقّق من الإجابات القصيرة"
            title="كيف نجيب وماذا يعني النفي؟"
            items={SHORT_ANSWER_ITEMS}
          />
        </>
      );
      break;
    case 19:
      body = (
        <>
          <Plate44 kicker="السؤال بـ MUST والاستعمال اليومي" channel="must">
            <Article44 section={19} />
          </Plate44>
          <MustQuestionTrapLab44 />
        </>
      );
      break;
    case 20:
      body = (
        <>
          <Plate44 kicker="التعبير عن الإلزام الماضي" channel="past">
            <Article44 section={20} />
          </Plate44>
          <TenseMachine44 />
          <ChoiceLab44
            id="past-check"
            channel="past"
            kicker="تحقّق من HAD TO"
            title="تجنب الخطأ الشائع musted"
            items={PAST_ITEMS}
          />
        </>
      );
      break;
    case 21:
      body = (
        <>
          <Plate44 kicker="نفي الإلزام في الماضي" channel="past">
            <Article44 section={21} />
          </Plate44>
          <DidntHaveToNuanceLab44 />
        </>
      );
      break;
    case 22:
      body = (
        <>
          <Plate44 kicker="الاستفهام عن التزام ماضٍ" channel="past">
            <Article44 section={22} />
          </Plate44>
          <ChoiceLab44
            id="past-question-check"
            channel="past"
            kicker="تحقّق من سؤال الماضي"
            title="DID تحمل الماضي فيعود الفعل إلى HAVE TO"
            items={PAST_QUESTION_ITEMS}
          />
        </>
      );
      break;
    case 23:
      body = (
        <>
          <Plate44 kicker="التعبير عن الإلزام المستقبلي" channel="future">
            <Article44 section={23} />
          </Plate44>
          <ChoiceLab44
            id="future-check"
            channel="future"
            kicker="تحقّق من WILL HAVE TO"
            title="ثبات HAVE TO بعد WILL"
            items={FUTURE_ITEMS}
          />
        </>
      );
      break;
    case 24:
      body = (
        <>
          <Plate44 kicker="النفي والسؤال في المستقبل ومصفوفة الأزمنة" channel="future">
            <Article44 section={24} />
          </Plate44>
          <ChoiceLab44
            id="future-matrix-check"
            channel="future"
            kicker="تحقّق من نفي المستقبل وسؤاله"
            title="WON'T HAVE TO و WILL ... HAVE TO"
            items={FUTURE_MATRIX_ITEMS}
          />
        </>
      );
      break;
    case 25:
      body = (
        <>
          <Plate44 kicker="تمهيد للدرس القادم دون استباق تفاصيله" channel="charter">
            <Article44 section={25} />
          </Plate44>
          <StrengthGaugeLab44 />
        </>
      );
      break;
    case 26:
      body = (
        <Dialog44
          section={26}
          title="الحوار الشامل: مسابقة العلوم المدرسية"
          englishTitle="A School Science Competition"
          quiz={DIALOG_26_QUIZ}
        />
      );
      break;
    case 27:
      body = (
        <>
          <GrammarDetective44 />
          <DetectiveSourceKey44 />
        </>
      );
      break;
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
      body = <PracticeSet44 section={index} />;
      break;
    case 33:
      body = <ReadingChallenge44 />;
      break;
    case 34:
      body = (
        <TestBrief44
          onTest={onTest}
          onSolutions={onSolutions}
          testSubmitted={testSubmitted}
        />
      );
      break;
    case 35:
      body = (
        <TeacherBrief44
          onTeacher={onTeacher}
          onSolutions={onSolutions}
          solutionsUnlocked={solutionsUnlocked}
        />
      );
      break;
    case 36:
      body = <WritingMission44 />;
      break;
    case 37:
      body = (
        <>
          <SummaryDeck44 />
          <Plate44 kicker="المرجع الكامل للقواعد والصيغ" channel="charter">
            <Article44 section={37} />
          </Plate44>
        </>
      );
      break;
    case 38:
      body = <Roadmap44 onOpenTest={onTest} />;
      break;
    default:
      body = (
        <Plate44 channel={descriptor.channel}>
          <Article44 section={index} />
        </Plate44>
      );
  }

  return (
    <article
      data-source-section={source.id}
      className="step44"
      data-chapter={chapterNo}
    >
      <header className="occ-step-head">
        <div className="occ-spectrum-strip" aria-hidden="true" />
        <div className="occ-head-bar">
          <div className="occ-head-badges">
            <span className="occ-station-pill">
              المحطة {String(chapterNo).padStart(2, "0")} · {station.name}
            </span>
            <span dir="ltr" className="occ-coord font-en">
              STEP {String(index + 1).padStart(2, "0")} / {LESSON_STEP_COUNT_44}
            </span>
          </div>

          <div className="occ-step-jump">
            <ChannelBadge44 channel={descriptor.channel} />
          </div>
        </div>

        <div className="stepTitleRow44">
          <span className="stepFolio44 font-en" aria-hidden="true">
            <bdi dir="ltr">{String(index).padStart(2, "0")}</bdi>
          </span>
          <div className="stepTitleText44">
            {englishTitle && (
              <p className="stepEn44 font-en" dir="ltr" lang="en">
                {englishTitle}
              </p>
            )}
            <h2 id="step-title-44" tabIndex={-1}>
              <Title44 text={arTitle} />
            </h2>
            <p className="occ-step-purpose">
              <Text44 text={descriptor.purposeAr} />
            </p>
          </div>
        </div>
      </header>

      {body}
    </article>
  );
}
