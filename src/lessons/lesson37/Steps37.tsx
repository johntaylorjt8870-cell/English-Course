import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { STEP_COUNT_37, type Slide37 } from "./data";
import { ActionButton37, FormulaRibbon37, PlatformNote37, SourceCard37, SourceLine37, SourceTitle37 } from "./kit37";
import {
  AdvancedChallengeLab37,
  CameraLab37,
  ChoiceLab37,
  ConjugationLab37,
  ContinuousSelectLab37,
  CurriculumPreviewLab37,
  Detective30Lab37,
  DialogueLab37,
  Exercise28Lab37,
  FormulaOrderLab37,
  FutureMomentLab37,
  IngLab37,
  IQ200Lab37,
  MeaningLab37,
  MomentLab37,
  NegativeBuildLab37,
  NegativeErrorsLab37,
  ObjectivesChecklist37,
  PartsLab37,
  ReadingAnalysis37,
  ReadingLab37,
  RoutineLab37,
  ShortAnswerLab37,
  StateVerbLab37,
  SummaryMatchLab37,
  TimeExpressionLab37,
  Transform29Lab37,
  TwoEventsLab37,
  WhenClauseLab37,
  WhileLab37,
  WhBuildLab37,
  WhoRoleLab37,
  WritingLab37,
  YesNoBuildLab37,
} from "./labs37";
import {
  DETECTIVE30_ITEMS_37,
  EXERCISE28_ITEMS_37,
  IQ200_ITEMS_37,
  OBJECTIVES_37,
  POLITE_ITEMS_37,
  READING32_QUESTIONS_37,
  TRANSFORM29_ITEMS_37,
} from "./practiceData37";

/* ------------------------------------------------------------------
   خطوات الدرس 37 — 49 خطوة قصيرة داخل «مرصد الأفق المستقبلي»
   كل خطوة: عنوان + مصدرها + نشاط/شرح واحد مركّز.
   ------------------------------------------------------------------ */

const CHAPTER_TONE_37: Record<string, string> = {
  intro: "bg-[#e0f2fe] text-[#0c4a6e] border-[#7dd3fc]",
  form: "bg-[#ccfbf1] text-[#115e59] border-[#5eead4]",
  meaning: "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]",
  clauses: "bg-[#ffedd5] text-[#9a3412] border-[#fdba74]",
  polite: "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]",
  "neg-questions": "bg-[#ffe4e6] text-[#9f1239] border-[#fda4af]",
  verbs: "bg-[#f3e8ff] text-[#5b21b6] border-[#d8b4fe]",
  compare: "bg-[#e0f2fe] text-[#0c4a6e] border-[#7dd3fc]",
  practice: "bg-[#ccfbf1] text-[#115e59] border-[#5eead4]",
  assessment: "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]",
  closure: "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]",
};

const CHAPTER_LABEL_37: Record<string, string> = {
  intro: "المدخل والفكرة",
  form: "القاعدة والتركيب",
  meaning: "المعنى واللحظة",
  clauses: "الربط الزمني والحوار",
  polite: "السؤال المهذب",
  "neg-questions": "النفي والأسئلة",
  verbs: "التهجئة وأفعال الحالة",
  compare: "المقارنات",
  practice: "التدريبات والقراءة",
  assessment: "الاختبار والحلول",
  closure: "الكتابة والملخص",
};

function StepHeader37({ slide }: { slide: Slide37 }) {
  const tone = CHAPTER_TONE_37[slide.section] ?? CHAPTER_TONE_37.intro;
  return (
    <header className="rounded-2xl border border-[#bae6fd] bg-white px-3.5 py-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
          <Rich text={CHAPTER_LABEL_37[slide.section] ?? ""} />
        </span>
        <span className="rounded-full border border-[#cbd5e1] bg-[#f8fbff] px-2.5 py-1 text-[11px] font-black text-[#0f172a]">
          <Rich text={`الخطوة ${slide.step} من ${STEP_COUNT_37}`} />
        </span>
        <span
          dir="ltr"
          data-source-ref={slide.sourceId}
          className="font-en rounded-full border border-[#7dd3fc] bg-white px-2.5 py-1 text-[11px] font-black text-[#0369a1]"
        >
          {slide.source.num == null ? "COVER" : `§${slide.source.num}`}
        </span>
      </div>
      <h1 className="mt-2 text-lg font-black leading-8 text-[#0f172a] sm:text-xl">
        <SourceTitle37 text={slide.title} />
      </h1>
      <p className="mt-1 text-sm font-bold leading-6 text-[#334155]">
        <Rich text={slide.subtitle} />
      </p>
    </header>
  );
}

function LabPanel37({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#bae6fd] bg-[#f8fbff] p-4 shadow-sm sm:p-5">
      <p className="text-xs font-black uppercase tracking-[.14em] text-[#0369a1]">{eyebrow}</p>
      <h2 className="mt-1 text-base font-black leading-7 text-[#0f172a] sm:text-lg">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

/** موضع الفصل داخل القسم المصري: نجده بالنص لا بالرقم، فلا ينكسر عند تعديل المصدر. */
function splitIndex37(id: string, marker: string, units: readonly string[]): number {
  const index = units.indexOf(marker);
  if (index > 0) return index;
  return Math.max(1, Math.ceil(units.length * 0.6));
}

function onlyBetween37(from: number, to: number): number[] {
  return Array.from({ length: Math.max(0, to - from) }, (_, index) => from + index);
}

export default function StepView37({
  slide,
  onGoTest,
  onGoSolutions,
}: {
  slide: Slide37;
  onGoTest: () => void;
  onGoSolutions: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const reveal = () => setRevealed(true);
  const { source, part } = slide;

  if (slide.id === "cover") return <CoverScene37 slide={slide} />;

  /* ---------------- الأقسام المقسومة: جزء أ (شرح) أو ب (تكملة + نشاط) ---------------- */
  if (part === "a" || part === "b") {
    const split = SPLIT_MARKERS_37[slide.sourceId];
    const cut = split ? splitIndex37(slide.sourceId, split, source.units) : Math.ceil(source.units.length * 0.6);
    const range = part === "a" ? onlyBetween37(0, cut) : onlyBetween37(cut, source.units.length);
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-3">
        <StepHeader37 slide={slide} />
        <SourceCard37
          section={source}
          onlyIndexes={range}
          showReveal={part === "b" && revealed}
          hideRevealPrompt={part === "a"}
          skipIndexes={skipIndexesFor37(slide.sourceId, source.units)}
          highlightFuture={highlight}
        />
        {PART_LAB_37(slide, reveal, highlight, setHighlight)}
      </div>
    );
  }

  /* ---------------- الأقسام الكاملة ---------------- */
  if (slide.id === "s34") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-3">
        <StepHeader37 slide={slide} />
        <SourceCard37 section={source} skipIndexes={Array.from({ length: 61 }, (_, index) => index + 3)} />
        <LabPanel37 eyebrow="منطقة اختبار مستقلة · §34" title="ابدأ الاختبار الرسمي">
          <p className="text-sm leading-7 text-[#1e293b]">
            الاختبار مكوّن من <span className="font-black">25 سؤالًا</span> موزعة على خمسة مستويات أصلية (5 × 5)، ولا يظهر فيه أي تصحيح أو
            مفتاح إجابة أو درجة قبل الإرسال النهائي.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionButton37 onClick={onGoTest}>فتح Test Area</ActionButton37>
            <ActionButton37 variant="secondary" onClick={onGoSolutions}>
              منطقة الحلول (بعد التسليم)
            </ActionButton37>
          </div>
        </LabPanel37>
      </div>
    );
  }

  if (slide.id === "s35") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-3">
        <StepHeader37 slide={slide} />
        <SourceCard37 section={source} />
        <PlatformNote37>
          <Rich text="هذا القسم في المصدر يذكر عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» دون أن يتضمّن مفتاحًا فعليًا. لذلك كُتبت الحلول التفصيلية للأسئلة الـ25 في منطقة Solutions مستقلة (تُفتح بعد تسليم الاختبار أو بدخول المعلم)، وكل إجابة موسومة بأنها من إعداد المنصة/المعلم وليست نصًا مصدريًا، مع نماذج وبدائل مقبولة في الأسئلة المفتوحة." />
        </PlatformNote37>
        <ActionButton37 onClick={onGoSolutions}>فتح Solutions Area</ActionButton37>
      </div>
    );
  }

  return (
    <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-3">
      <StepHeader37 slide={slide} />
      <SourceCard37
        section={source}
        showReveal={revealed}
        skipIndexes={skipIndexesFor37(slide.sourceId, source.units)}
        highlightFuture={slide.id === "s32" ? highlight : false}
      />
      {FULL_LAB_37(slide, reveal, highlight, setHighlight)}
    </div>
  );
}

/** موضع الفصل (نصّي) لكل قسم مقسوم. */
const SPLIT_MARKERS_37: Record<string, string> = {
  s02: "تخيل الخط الزمني:",
  s03: "They will be playing.",
  s04: "لماذا نستخدم be وليس is؟",
  s06: "القاعدة الذهنية",
  s09: "سؤال IQ200",
  s12: "انتبه إلى الفرق المتقدم",
  s14: "التحليل",
  s18: "أمثلة:",
  s20: "أمثلة:",
  s22: "أمثلة:",
  s24: "مثال:",
  s25: "لكن بعض الأفعال يمكن أن تأتي في الصيغ المستمرة عندما يتغير معناها.",
  s26: "الخريطة الذهنية",
  s29: "الأسئلة",
  s31: "⑤ I promise I ______ return your book.",
  s30: "⑥ When you will arrive, I will be waiting.",
  s32: "أسئلة الفهم",
  s37: "أهم الاستخدامات",
  s38: "المحطة القادمة",
};

/** سطور المصدر التي يعيد النشاط التفاعلي عرضها حرفيًا — تُستثنى من البطاقة لمنع التكرار. */
const stripMarks37 = (text: string) => text.replace(/^[①②③④⑤⑥⑦⑧⑨⑩㉑㉒㉓㉔㉕]\s*/, "").trim();

function labDuplicated37(sectionId: string): string[] {
  if (sectionId === "s28") return EXERCISE28_ITEMS_37.flatMap((item) => [item.prompt, ...item.options]);
  if (sectionId === "s29") return TRANSFORM29_ITEMS_37.map((item) => item.base);
  if (sectionId === "s31") return IQ200_ITEMS_37.flatMap((item) => item.lines);
  if (sectionId === "s32") return [...READING32_QUESTIONS_37];
  return [];
}

function skipIndexesFor37(sectionId: string, units: readonly string[]): number[] {
  const duplicates = new Set(labDuplicated37(sectionId).map(stripMarks37));
  if (!duplicates.size) return [];
  return units.reduce<number[]>((acc, unit, index) => {
    if (duplicates.has(stripMarks37(unit))) acc.push(index);
    return acc;
  }, []);
}

function PART_LAB_37(
  slide: Slide37,
  reveal: () => void,
  highlight: boolean,
  setHighlight: (updater: (current: boolean) => boolean) => void,
) {
  switch (slide.id) {
    case "s02b":
      return <FutureMomentLab37 />;
    case "s03b":
      return <FormulaOrderLab37 />;
    case "s04b":
      return <PartsLab37 />;
    case "s06b":
      return <MomentLab37 />;
    case "s09b":
      return <MeaningLab37 sectionId="s09" />;
    case "s12b":
      return <WhenClauseLab37 />;
    case "s14b":
      return <DialogueLab37 />;
    case "s18":
      return <NegativeBuildLab37 half={1} />;
    case "s18b":
      return <NegativeBuildLab37 half={2} onComplete={reveal} />;
    case "s20":
      return <YesNoBuildLab37 half={1} />;
    case "s20b":
      return <YesNoBuildLab37 half={2} onComplete={reveal} />;
    case "s22":
      return <WhBuildLab37 half={1} />;
    case "s22b":
      return <WhBuildLab37 half={2} onComplete={reveal} />;
    case "s24b":
      return <IngLab37 />;
    case "s25b":
      return <StateVerbLab37 />;
    case "s26":
      return <ContinuousSelectLab37 half={1} />;
    case "s26b":
      return <ContinuousSelectLab37 half={2} onComplete={reveal} />;
    case "s29":
      return <Transform29Lab37 half={1} />;
    case "s29b":
      return <Transform29Lab37 half={2} onComplete={reveal} />;
    case "s30a":
      return <Detective30Lab37 items={DETECTIVE30_ITEMS_37.slice(0, 5)} />;
    case "s30b":
      return <Detective30Lab37 items={DETECTIVE30_ITEMS_37.slice(5)} onComplete={reveal} />;
    case "s31":
      return <IQ200Lab37 half={1} />;
    case "s31b":
      return <IQ200Lab37 half={2} onComplete={reveal} />;
    case "s32a":
      return (
        <LabPanel37 eyebrow="§32 · عدسة الصيغ" title="مرّر الضوء على صيغ المستقبل في النص">
          <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#bae6fd] bg-white px-3 py-2 text-sm font-bold text-[#1e293b]">
            <input
              type="checkbox"
              checked={highlight}
              onChange={() => setHighlight((current) => !current)}
              className="h-4 w-4 accent-[#0f766e]"
            />
            <span>تمييز صيغ المستقبل في النص أعلاه (بصري فقط — لا يخفي النص)</span>
          </label>
          <ReadingAnalysis37 />
        </LabPanel37>
      );
    case "s32b":
      return <ReadingLab37 highlight={highlight} onToggleHighlight={() => setHighlight((current) => !current)} onComplete={reveal} />;
    case "s37b":
      return <SummaryMatchLab37 />;
    case "s38b":
      return <CurriculumPreviewLab37 />;
    default:
      return null;
  }
}

function FULL_LAB_37(
  slide: Slide37,
  reveal: () => void,
  highlight: boolean,
  setHighlight: (updater: (current: boolean) => boolean) => void,
) {
  switch (slide.id) {
    case "s01":
      return <ObjectivesChecklist37 objectives={OBJECTIVES_37} />;
    case "s05":
      return (
        <div className="space-y-3">
          <FormulaRibbon37
            caption="نفس الصيغة مع كل ضمير — لا s ولا am/is/are"
            parts={[
              { role: "subject", en: "He / She / It", ar: "فاعل" },
              { role: "will", en: "will", ar: "مستقبل" },
              { role: "be", en: "be", ar: "ثابت" },
              { role: "ving", en: "V-ing", ar: "نشاط" },
            ]}
          />
          <ConjugationLab37 />
        </div>
      );
    case "s07":
      return <CameraLab37 />;
    case "s08":
      return <TimeExpressionLab37 />;
    case "s10":
      return <MeaningLab37 sectionId="s10" />;
    case "s11":
      return <TwoEventsLab37 />;
    case "s13":
      return <WhileLab37 />;
    case "s15":
      return <RoutineLab37 />;
    case "s16":
      return (
        <ChoiceLab37
          id="polite-16"
          eyebrow="§16 · أسئلة عن الخطط"
          title="اختر الصيغة الأنسب للموقف"
          items={POLITE_ITEMS_37.slice(0, 2)}
          note={
            <PlatformNote37>
              المصدر يقارن بين سؤال عن قرار الشخص أو استعداده، وسؤال عن نشاط متوقع ضمن برنامجه.
            </PlatformNote37>
          }
        />
      );
    case "s17":
      return (
        <ChoiceLab37
          id="polite-17"
          eyebrow="§17 · Will you أم Will you be + V-ing"
          title="افرق بين سؤال الاستعداد وسؤال البرنامج"
          items={POLITE_ITEMS_37.slice(2)}
          note={
            <PlatformNote37>
              حوار المصدر: A: Will you be driving to school tomorrow? / B: Yes, I will. / A: Could I come with you? / B: Of course!
            </PlatformNote37>
          }
        />
      );
    case "s18":
      return <NegativeBuildLab37 />;
    case "s19":
      return <NegativeErrorsLab37 />;
    case "s20":
      return <YesNoBuildLab37 />;
    case "s21":
      return <ShortAnswerLab37 />;
    case "s22":
      return <WhBuildLab37 />;
    case "s23":
      return <WhoRoleLab37 />;

    case "s26":
      return <ContinuousSelectLab37 />;
    case "s27":
      return <MeaningLab37 sectionId="s27" />;
    case "s28":
      return <Exercise28Lab37 onComplete={reveal} />;
    case "s29":
      return <Transform29Lab37 onComplete={reveal} />;
    case "s25b":
      return <StateVerbLab37 />;
    case "s30a":
      return <Detective30Lab37 items={DETECTIVE30_ITEMS_37.slice(0, 5)} />;
    case "s32":
      return <ReadingLab37 highlight={highlight} onToggleHighlight={() => setHighlight((current) => !current)} onComplete={reveal} />;
    case "s33":
      return <AdvancedChallengeLab37 />;
    case "s36":
      return <WritingLab37 />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------
   الغلاف: مشهد مرصد الوقت + السؤال الافتتاحي
   ------------------------------------------------------------------ */

function CoverScene37({ slide }: { slide: Slide37 }) {
  const [moment, setMoment] = useState("8:00");
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const activities: Record<string, { sentence: string; ar: string }> = {
    "8:00": { sentence: "I will be having breakfast.", ar: "سأكون أتناول الفطور." },
    "12:00": { sentence: "I will be studying at school.", ar: "سأكون أدرس في المدرسة." },
    "20:00": { sentence: "I will be watching a film with my family.", ar: "سأكون أشاهد فيلمًا مع عائلتي." },
  };
  const current = activities[moment];

  return (
    <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-3">
      <section className="fh37-viewfinder">
        <div className="fh37-viewfinder__bar">
          <p className="text-sm font-black text-[#0f172a]">
            <Rich text="🔭 FUTURE HORIZON · مرصد الأفق المستقبلي" />
          </p>
          <span className="fh37-viewfinder__rec" dir="ltr">
            <span aria-hidden>●</span> TIMELINE · LIVE
          </span>
        </div>
        <div className="bg-white p-4 sm:p-5">
          <p className="text-xs font-black uppercase tracking-[.16em] text-[#0369a1]">Lesson 37 · Future Continuous</p>
          <h1 className="mt-1 text-xl font-black leading-snug text-[#0c4a6e] sm:text-2xl">
            <Rich text="Future Continuous — المستقبل المستمر" />
          </h1>
          <p dir="ltr" className="font-en mt-1 text-left text-lg font-black text-[#1d4ed8] sm:text-xl">
            What Will You Be Doing Tomorrow?
          </p>
          <p className="mt-1 text-sm font-bold text-[#334155]">
            تخيّل أنك تدخل مرصدًا زمنيًا، تختار لحظة مستقبلية، ثم ترى النشاط الذي سيكون جاريًا فيها.
          </p>

          <div className="fh37-timeline mt-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-black text-[#0c4a6e]">اختر لحظة من الغد:</p>
              <div className="flex flex-wrap gap-2">
                {Object.keys(activities).map((clock) => (
                  <button
                    key={clock}
                    type="button"
                    data-cover-moment={clock}
                    aria-pressed={moment === clock}
                    onClick={() => setMoment(clock)}
                    className={`min-h-10 rounded-xl border px-3 py-1.5 text-sm font-black transition-colors motion-reduce:transition-none ${
                      moment === clock
                        ? "border-[#0f766e] bg-[#0f766e] text-white"
                        : "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe]"
                    }`}
                  >
                    <span dir="ltr" className="font-en">{clock}</span>
                  </button>
                ))}
              </div>
            </div>
            <div dir="ltr" className="mt-3">
              <div className="fh37-timeline__beam">
                <div
                  className="fh37-timeline__active"
                  style={{ width: moment === "8:00" ? "22%" : moment === "12:00" ? "55%" : "85%" }}
                />
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-[11px] font-black tracking-wide text-[#334155]">NOW</span>
                <span className="text-[11px] font-black tracking-wide text-[#0c4a6e]">TOMORROW</span>
                <span className="text-[11px] font-black tracking-wide text-[#334155]">FUTURE</span>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-[#5eead4] bg-[#f0fdfa] px-3.5 py-2.5">
              <p dir="ltr" className="font-en text-left text-base font-black text-[#115e59]">{current.sentence}</p>
              <p className="mt-1 text-sm font-bold text-[#115e59]">{current.ar}</p>
            </div>
          </div>

          <fieldset className="mt-3 rounded-2xl border border-[#bae6fd] bg-[#f8fbff] p-3.5">
            <legend className="px-1 text-sm font-black text-[#0c4a6e]">سؤال الافتتاح</legend>
            <p dir="ltr" className="font-en rounded-xl border border-[#bae6fd] bg-white px-3 py-2 text-left font-black text-[#0c4a6e]">
              What will you be doing at 8:00 tomorrow?
            </p>
            <p className="mt-1 font-bold leading-7 text-[#0f172a]">أي إجابة تصف نشاطًا جاريًا في تلك اللحظة؟</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {[
                { value: "a", label: "I will have breakfast at 8:00." },
                { value: "b", label: "At 8:00 tomorrow, I will be having breakfast." },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex min-h-11 cursor-pointer items-start gap-2 rounded-xl border p-3 text-sm font-bold ${
                    answer === option.value ? "border-[#0f766e] bg-[#ccfbf1]" : "border-[#bae6fd] bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="cover-answer"
                    value={option.value}
                    checked={answer === option.value}
                    disabled={checked}
                    onChange={() => setAnswer(option.value)}
                    className="mt-1 h-4 w-4 accent-[#0f766e]"
                  />
                  <span dir="ltr" className="font-en text-left text-[#0f172a]">{option.label}</span>
                </label>
              ))}
            </div>
            {!checked ? (
              <button
                type="button"
                disabled={!answer}
                onClick={() => setChecked(true)}
                className="mt-3 min-h-11 rounded-xl border border-[#0f766e] bg-[#0f766e] px-4 py-2 text-sm font-black text-white disabled:cursor-not-allowed disabled:border-[#cbd5e1] disabled:bg-[#f1f5f9] disabled:text-[#475569]"
              >
                ابدأ الرحلة
              </button>
            ) : (
              <div role="status" aria-live="polite" className="mt-3 rounded-xl border border-[#5eead4] bg-[#f0fdfa] p-3 text-sm leading-6 text-[#115e59]">
                <strong className="block font-black">تم — هذه هي نقطة البداية.</strong>
                الجملة (B) تضعك داخل اللحظة وتصف النشاط الجاري فيها. خلال الخطوات القادمة سنبني هذه الصيغة قطعة قطعة.
              </div>
            )}
          </fieldset>
        </div>
      </section>

      <section className="rounded-3xl border border-[#bae6fd] bg-white p-4 shadow-sm sm:p-5">
        <p className="text-xs font-black uppercase tracking-[.14em] text-[#0369a1]">من المصدر · المقدمة</p>
        <h2 className="mt-1 text-base font-black text-[#0f172a] sm:text-lg">
          <Rich text="أين وصلنا في رحلة المستقبل؟" />
        </h2>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {[
            { tag: "34", en: "WILL", ar: "القرارات اللحظية والوعود والتوقعات" },
            { tag: "35", en: "BE GOING TO", ar: "الخطط والنوايا والتوقعات المبنية على أدلة" },
            { tag: "36", en: "WILL vs BE GOING TO", ar: "اختيار الصيغة بحسب السياق" },
          ].map((entry) => (
            <div key={entry.en} className="rounded-2xl border border-[#bae6fd] bg-[#f8fbff] px-3 py-2.5">
              <span className="font-en text-[11px] font-black text-[#0369a1]">LESSON {entry.tag}</span>
              <p dir="ltr" className="font-en mt-0.5 text-sm font-black text-[#0c4a6e]">{entry.en}</p>
              <p className="mt-0.5 text-xs font-bold leading-6 text-[#334155]">{entry.ar}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {slide.source.units.map((line, index) => (
            <SourceLine37 key={`${index}-${line}`} sectionId="cover" index={index} text={line} />
          ))}
        </div>
        <div className="mt-3">
          <PlatformNote37>
            <Rich text="مفتاح الدرس كله في سطر واحد: Subject + will + be + V-ing — ثم يأتي كل شيء آخر (المعنى، when وwhile، النفي، الأسئلة، أفعال الحالة) ليثبت هذا الأساس ويوسّعه." />
          </PlatformNote37>
        </div>
        <dl className="mt-3 grid gap-2 sm:grid-cols-4">
          {[
            { k: "أقسام المصدر", v: "38 قسمًا + المقدمة" },
            { k: "خطوات الطالب", v: `${STEP_COUNT_37} خطوة قصيرة` },
            { k: "الاختبار", v: "25 سؤالًا · 5 مستويات" },
            { k: "المناطق", v: "طالب · اختبار · حلول · معلم" },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#bae6fd] bg-white px-3 py-2">
              <dt className="text-[11px] font-black text-[#0369a1]">{entry.k}</dt>
              <dd className="mt-0.5 text-sm font-bold text-[#0f172a]">{entry.v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
