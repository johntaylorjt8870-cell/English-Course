import { useState, type ReactNode } from "react";
import { Rich } from "../../shared/lessonKit";
import { STEP_COUNT_38, type Step38 } from "./data";
import {
  ActionButton38,
  Card38,
  FinishLine38,
  PlatformNote38,
  SourceCard38,
  Title38,
  SourceLine38,
  TenseChip38,
  TimelineRail38,
  TENSE_38,
} from "./kit38";
import {
  AtByLab38,
  ByBeforeLab38,
  ByMeaningLab38,
  ByTheTimeLab38,
  ConjugationLab38,
  DeadlineTimelineLab38,
  Detective30Lab38,
  Dialogue2Lab38,
  DialogueLab38,
  ErrorLab38,
  Exercise27Lab38,
  FcVsFpLab38,
  Fill28Lab38,
  FirstUseLab38,
  FormulaOrderLab38,
  FsVsFpLab38,
  Iq31Lab38,
  NegationMeaningLab38,
  NegativeBuildLab38,
  ObjectivesChecklist38,
  PartsLab38,
  PerfectMapLab38,
  ReadingLab38,
  SameEventLab38,
  ShortAnswerLab38,
  SummaryMatchLab38,
  Tense29Lab38,
  ThreeFuturesLab38,
  TimeExpressionLab38,
  TwoEventsLab38,
  V3Lab38,
  V3PairsLab38,
  WhBuildLab38,
  WritingLab38,
  WritingModelLab38,
  YesNoBuildLab38,
} from "./labs38";
import { OBJECTIVES_38, TIMELINE_MOMENTS_38 } from "./practiceData38";

/* ============================================================
   خطوات الدرس 38 — كل خطوة هدف واحد، ومصدرها ظاهر، ونشاطها مستقل.
   ============================================================ */

const CHAPTER_TONE_38: Record<string, string> = {
  arrive: "border-[#b7c6d6] bg-[#e8eef5] text-[#1b3a5c]",
  frame: "border-[#c9a227] bg-[#f4ead0] text-[#8a5a10]",
  deadline: "border-[#c4b5fd] bg-[#ece8f8] text-[#3b2f6b]",
  clause: "border-[#86c4b2] bg-[#e7f3ee] text-[#1d5c4a]",
  control: "border-[#b7c6d6] bg-[#e8eef5] text-[#1b3a5c]",
  compare: "border-[#c9a227] bg-[#f4ead0] text-[#8a5a10]",
  practice: "border-[#86c4b2] bg-[#e7f3ee] text-[#1d5c4a]",
  read: "border-[#c4b5fd] bg-[#ece8f8] text-[#3b2f6b]",
  wrap: "border-[#d4c4a0] bg-[#f7f2e4] text-[#1b3a5c]",
};

const CHAPTER_LABEL_38: Record<string, string> = {
  arrive: "افتتاح المرصد",
  frame: "الصيغة والتشريح",
  deadline: "محطات الموعد",
  clause: "حدثان وجملة زمنية",
  control: "النفي والسؤال",
  compare: "المقارنات",
  practice: "التدريب",
  read: "القراءة والاختبار",
  wrap: "الكتابة والخريطة",
};

function StepHeader38({ slide }: { slide: Step38 }) {
  return (
    <header className="fp38-stephead" data-step-header={slide.id}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="fp38-stepnum" dir="ltr">
          {String(slide.step).padStart(2, "0")}
        </span>
        <span className={`rounded-full border px-2.5 py-1 text-[11px] font-black ${CHAPTER_TONE_38[slide.section]}`}>
          {CHAPTER_LABEL_38[slide.section]}
        </span>
        <span className="fp38-badge">
          <span dir="ltr" className="font-en tabular-nums">
            {slide.step}/{STEP_COUNT_38}
          </span>
          <span className="text-[10px]">خطوة</span>
        </span>
        <span className="ml-auto rounded-full border border-[#d9cbb0] bg-white px-2.5 py-1 text-[11px] font-black text-[#1b3a5c]">
          محطة الرصد
        </span>
      </div>
      <h1 className="mt-2 text-lg font-black leading-8 text-[#122033] sm:text-xl">
        <Title38 text={slide.title} />
      </h1>
      <p className="mt-1 text-sm font-bold leading-6 text-[#3d4a5c]">
        <Rich text={slide.subtitle} />
      </p>
    </header>
  );
}

function Section38({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="fp38-lab">
      <p className="fp38-eyebrow">{eyebrow}</p>
      <h2 className="mt-1 text-base font-black leading-7 text-[#122033] sm:text-lg">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

/* ---------------- الغلاف ---------------- */

function CoverScene38({ slide }: { slide: Step38 }) {
  const [active, setActive] = useState("friday");
  const moment = TIMELINE_MOMENTS_38.find((entry) => entry.id === active) ?? TIMELINE_MOMENTS_38[2];
  return (
    <div className="space-y-4">
      <section className="fp38-hero p-4 sm:p-6">
        <span aria-hidden className="fp38-hero__flag">
          🔭
        </span>
        <FinishLine38 label="BY TOMORROW" />
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="fp38-kicker">🔭 LESSON 38 · OBSERVATORY</span>
          <span className="fp38-badge">Achievement · By · V3</span>
        </div>
        <p dir="ltr" className="fp38-eyebrow font-en">FUTURE ACHIEVEMENT OBSERVATORY</p>
        <h1 className="fp38-cover__title mt-1">
          <Rich text="Future Perfect — المستقبل التام" />
        </h1>
        <p className="fp38-cover__en mt-1">By Tomorrow, I Will Have Finished!</p>
        <p className="mt-2 max-w-3xl text-sm font-bold leading-7 text-[#3d4a5c] sm:text-base">
          <Rich text="نقف عند نقطة مستقبلية، وننظر إلى الوراء: ما الذي سيكون قد اكتمل بحلولها؟" />
        </p>
        <div className="mt-4 fp38-chip-row">
          <TenseChip38 tense="simple" />
          <TenseChip38 tense="continuous" />
          <TenseChip38 tense="perfect" />
        </div>
      </section>

      <Card38 eyebrow="جسر Lesson 37 → Lesson 38" title="من «جارٍ حينها» إلى «مكتمل بحلولها»">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="fp38-lane fp38-lane--continuous">
            <p className="text-xs font-black text-[#5b21b6]">Lesson 37 · Future Continuous</p>
            <p className="fp38-lane__example mt-1">At 8:00 tomorrow, I will be studying.</p>
            <p className="mt-2 text-sm leading-6 text-[#3d4a5c]">
              <Rich text="غدًا عند الساعة الثامنة، سأكون أدرس. النشاط جارٍ عند الثامنة." />
            </p>
          </div>
          <div className="fp38-lane fp38-lane--perfect">
            <p className="text-xs font-black text-[#1b3a5c]">Lesson 38 · Future Perfect</p>
            <p className="fp38-lane__example mt-1">By 8:00 tomorrow, I will have finished studying.</p>
            <p className="mt-2 text-sm leading-6 text-[#3d4a5c]">
              <Rich text="بحلول الثامنة غدًا، سأكون قد انتهيت من الدراسة. الإنجاز مكتمل بحلول الثامنة." />
            </p>
          </div>
        </div>
        <div className="fp38-rule text-sm leading-7">
          <Rich text="السؤال الذي يقود الدرس كله: عندما نصل إلى النقطة المستقبلية، هل سيكون الحدث قد اكتمل؟" />
        </div>
      </Card38>

      <Section38 eyebrow="استكشف الخط الزمني" title="ثلاث نقاط: اليوم · إنهاء المشروع · نقطة المرجع">
        <TimelineRail38
          points={[
            { id: "monday", label: "MONDAY", sub: "اليوم" },
            { id: "wednesday", label: "WEDNESDAY", sub: "إنهاء المشروع" },
            { id: "friday", label: "FRIDAY", sub: "نقطة المرجع المستقبلية" },
          ]}
          active={active}
          onSelect={setActive}
        />
        <div className="mt-3 rounded-2xl border border-[#d9cbb0] bg-white p-3" aria-live="polite">
          <p dir="ltr" className="font-en text-left text-base font-black text-[#122033]">
            {moment.sentence}
          </p>
          <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">
            <Rich text={moment.arabic} />
          </p>
          <p className="mt-1 text-sm font-bold leading-6 text-[#1b3a5c]">
            <Rich text={moment.note} />
          </p>
        </div>
      </Section38>

      <details className="fp38-card" open={false}>
        <summary className="cursor-pointer text-sm font-black text-[#1b3a5c]">
          <Rich text="نص المقدمة الكامل من المصدر (15 سطرًا) — افتح للقراءة" />
        </summary>
        <div className="mt-3">
          <SourceCard38 section={slide.source} compact />
        </div>
      </details>
      <PlatformNote38>
        <Rich text="الصيغة الأساسية: Subject + will + have + V3. الدرس يبني حولها معنى by/by the time، ثم النفي والسؤال والمقارنات. الاختبار الرسمي (25 سؤالًا) في منطقة مستقلة، وحلوله لا تظهر قبل التسليم." />
      </PlatformNote38>
    </div>
  );
}

/* ---------------- مكوّنات شرح صغيرة ---------------- */

function FormulaStrip38({ mode = "affirmative" }: { mode?: "affirmative" | "negative" | "yesno" | "wh" }) {
  const pieces =
    mode === "affirmative"
      ? ["Subject", "will", "have", "V3"]
      : mode === "negative"
        ? ["Subject", "will not / won't", "have", "V3"]
        : mode === "yesno"
          ? ["Will", "Subject", "have", "V3?"]
          : ["Wh-word", "will", "Subject", "have", "V3?"];
  return (
    <div className="fp38-deadline">
      <p dir="ltr" className="fp38-eyebrow font-en">FORMULA</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5" dir="ltr">
        {pieces.map((piece, index) => (
          <span key={piece} className="flex items-center gap-1.5">
            <span
              className={`font-en rounded-lg border px-2.5 py-1.5 text-sm font-black ${
                piece === "have" || piece === "have،"
                  ? "border-[#fda4af] bg-[#e8eef5] text-[#1b3a5c]"
                  : piece.includes("will")
                    ? "border-[#f2c14e] bg-[#fff8e1] text-[#7c4a03]"
                    : "border-[#e9d4de] bg-white text-[#122033]"
              }`}
            >
              {piece}
            </span>
            {index < pieces.length - 1 ? <span className="text-[#8a7a55]">+</span> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function TwoEventRail38() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <div className="fp38-lane fp38-lane--perfect">
        <p className="text-xs font-black text-[#1b3a5c]">① الإنجاز أولًا</p>
        <p dir="ltr" className="fp38-lane__example mt-1">
          I will have finished my homework.
        </p>
        <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">
          <Rich text="إنهاء الواجب يكتمل قبل الوصول أو بحلوله." />
        </p>
      </div>
      <div className="fp38-lane fp38-lane--simple">
        <p className="text-xs font-black text-[#7c4a03]">② الحدث المستقبلي الثاني</p>
        <p dir="ltr" className="fp38-lane__example mt-1">
          By the time you arrive…
        </p>
        <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">
          <Rich text="جملة by the time تستخدم Present Simple: you arrive." />
        </p>
      </div>
    </div>
  );
}

function ByBeforeScale38() {
  return (
    <div className="fp38-deadline">
      <p dir="ltr" className="fp38-eyebrow font-en">DEADLINE SCALE</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-[#d4c4a0] bg-white p-3">
          <p dir="ltr" className="font-en text-left text-sm font-black text-[#1b3a5c]">
            by Friday
          </p>
          <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">
            <Rich text="بحلول الجمعة: يسمح بالاكتمال يوم الجمعة نفسه أو قبله." />
          </p>
          <div className="mt-2 flex items-center gap-1" aria-hidden>
            <span className="h-2 flex-1 rounded-full bg-[#fda4af]" />
            <span className="rounded-full bg-[#1b3a5c] px-1.5 text-[10px] font-black text-white">FRI</span>
          </div>
        </div>
        <div className="rounded-xl border border-[#f2c14e] bg-[#fffdf5] p-3">
          <p dir="ltr" className="font-en text-left text-sm font-black text-[#7c4a03]">
            before Friday
          </p>
          <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">
            <Rich text="قبل الجمعة: يجب أن يكتمل قبل اليوم نفسه." />
          </p>
          <div className="mt-2 flex items-center gap-1" aria-hidden>
            <span className="h-2 flex-1 rounded-full bg-[#f2c14e]" />
            <span className="rounded-full bg-[#e8a317] px-1.5 text-[10px] font-black text-[#122033]">FRI</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadingLens38({ highlight, onToggle }: { highlight: boolean; onToggle: () => void }) {
  return (
    <div className="fp38-deadline">
      <label className="inline-flex cursor-pointer items-center gap-3 text-sm font-bold text-[#122033]">
        <input
          type="checkbox"
          checked={highlight}
          onChange={onToggle}
          className="h-4 w-4 accent-[#1b3a5c]"
        />
        <span>
          <Rich text="أظهر عدسة الأزمنة: تمييز will have (كحلي) وwill be (بنفسجي) وwill (نحاسي) داخل النص. النص لا يُخفى أبدًا." />
        </span>
      </label>
    </div>
  );
}

function TestLaunch38({ onGoTest }: { onGoTest: () => void }) {
  return (
    <Card38 eyebrow="Formal assessment · 25 questions" title="Future Perfect Master Test">
      <div className="grid gap-2 sm:grid-cols-5">
        {[
          ["1", "اختيار من متعدد"],
          ["2", "إكمال"],
          ["3", "تصحيح أخطاء"],
          ["4", "فهم المعنى"],
          ["5", "Final IQ200"],
        ].map(([n, label]) => (
          <div key={n} className="rounded-xl border border-[#d9cbb0] bg-white p-3 text-center">
            <span className="fp38-stepnum mx-auto" dir="ltr">
              {n}
            </span>
            <p className="mt-2 text-xs font-black leading-5 text-[#122033]">{label}</p>
          </div>
        ))}
      </div>
      <div className="fp38-rule text-sm leading-7">
        <Rich text="25 سؤالًا في خمسة مستويات × خمسة. لا تظهر درجة ولا علامة صحة/خطأ ولا تفسير قبل الإرسال. بعد التسليم يظهر التصحيح لكل سؤال، وتُفتح منطقة الحلول التفصيلية." />
      </div>
      <div className="flex flex-wrap gap-2">
        <ActionButton38 onClick={onGoTest}>فتح منطقة الاختبار</ActionButton38>
      </div>
    </Card38>
  );
}

function TeacherPointer38({ onGoTest, onGoSolutions }: { onGoTest: () => void; onGoSolutions: () => void }) {
  return (
    <Card38 eyebrow="مفتاح التصحيح" title="أين الحلول التفصيلية؟">
      <p className="text-sm leading-7">
        <Rich text="مساحة المعلم في المصدر تذكر عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» دون مفتاح فعلي. لذلك أُعدّت الحلول الخمسة والعشرون في المنصة: إجابة + قاعدة + سبب + البدائل." />
      </p>
      <PlatformNote38>
        <Rich text="الوصول إلى الحلول يكون بعد تسليم الاختبار أو من بوابة المعلم. لا تُعرض أي إجابة داخل واجهة الطالب قبل التسليم." />
      </PlatformNote38>
      <div className="flex flex-wrap gap-2">
        <ActionButton38 onClick={onGoSolutions}>منطقة الحلول</ActionButton38>
        <ActionButton38 variant="secondary" onClick={onGoTest}>
          الاختبار الرسمي
        </ActionButton38>
      </div>
    </Card38>
  );
}

function RoadmapStations38() {
  return (
    <Card38 eyebrow="Future map · 39–48" title="هذه خريطة مستقبلية، لا درس جديد داخل الدرس 38">
      <p className="text-sm leading-7 text-[#3d4a5c]">
        <Rich text="بعد إتقان Future Perfect نكمل منظومة المستقبل، ثم ننتقل إلى أدوات التعبير الأكثر استخدامًا. الجدول أدناه هو عناوين المحطات كما وردت في المصدر." />
      </p>
      <div className="fp38-rule text-sm leading-7">
        <Rich text="المحطة التالية مباشرة: الدرس 39 — Future Perfect Continuous. الفرق الذهبي: الإنجاز المكتمل مقابل مدة النشاط حتى نقطة مستقبلية." />
      </div>
    </Card38>
  );
}

function RoadmapWhy38() {
  return (
    <Card38 eyebrow="Why this sequence?" title="من الأزمنة إلى المعاني الإضافية">
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          ["I can.", "أستطيع"],
          ["It might.", "ربما"],
          ["I must.", "يجب عليّ"],
          ["I should.", "ينبغي أن"],
          ["I would rather.", "أفضّل"],
        ].map(([en, ar]) => (
          <div key={en} className="flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[#d4c4a0] bg-white px-3 py-2">
            <span dir="ltr" className="font-en font-black text-[#1b3a5c]">
              {en}
            </span>
            <span className="text-sm font-bold text-[#3d4a5c]">{ar}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm leading-7 text-[#1a2433]">
        <Rich text="هذه الأدوات ستفتح لاحقًا أبواب المبني للمجهول والجمل الشرطية والكلام المنقول. الدرس الحالي يتوقف عند الخريطة؛ الدرس 39 هو المحطة التالية." />
      </p>
    </Card38>
  );
}

function TenseLanes38() {
  return (
    <div className="fp38-lanes">
      <div className="fp38-lane fp38-lane--simple">
        <TenseChip38 tense="simple" />
        <p className="fp38-lane__example mt-2">I will write the report tomorrow.</p>
        <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">حدث مستقبلي: سأكتب التقرير غدًا.</p>
      </div>
      <div className="fp38-lane fp38-lane--continuous">
        <TenseChip38 tense="continuous" />
        <p className="fp38-lane__example mt-2">At 7:00 tomorrow, I will be writing the report.</p>
        <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">نشاط جارٍ عند السابعة.</p>
      </div>
      <div className="fp38-lane fp38-lane--perfect">
        <TenseChip38 tense="perfect" />
        <p className="fp38-lane__example mt-2">By 9:00 tomorrow, I will have written the report.</p>
        <p className="mt-1 text-sm leading-6 text-[#3d4a5c]">إنجاز مكتمل بحلول التاسعة.</p>
      </div>
    </div>
  );
}

/* ---------------- العرض ---------------- */

export default function StepView38({
  slide,
  onGoTest,
  onGoSolutions,
}: {
  slide: Step38;
  onGoTest: () => void;
  onGoSolutions: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const reveal = () => setRevealed(true);

  if (slide.id === "cover") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="fp38-slide-in">
        <CoverScene38 slide={slide} />
      </div>
    );
  }

  const lab = (() => {
    switch (slide.activity) {
      case "objectives":
        return <ObjectivesChecklist38 objectives={OBJECTIVES_38} />;
      case "timeline":
        return <DeadlineTimelineLab38 onComplete={reveal} />;
      case "formula-builder":
        return <FormulaOrderLab38 />;
      case "parts":
        return <PartsLab38 />;
      case "conjugation":
        return <ConjugationLab38 onComplete={reveal} />;
      case "first-use":
        return <FirstUseLab38 />;
      case "at-by":
        return <ByMeaningLab38 />;
      case "at-by-lab":
        return <AtByLab38 />;
      case "time-expressions":
        return <TimeExpressionLab38 />;
      case "two-events":
        return <TwoEventsLab38 />;
      case "by-the-time":
        return <ByTheTimeLab38 />;
      case "by-before":
        return <ByBeforeLab38 />;
      case "dialogue":
        return <DialogueLab38 onComplete={reveal} />;
      case "negative-builder":
        return <NegativeBuildLab38 onComplete={reveal} />;
      case "negation-meaning":
        return <NegationMeaningLab38 />;
      case "yesno-builder":
        return <YesNoBuildLab38 onComplete={reveal} />;
      case "short-answers":
        return <ShortAnswerLab38 />;
      case "wh-builder":
        return <WhBuildLab38 onComplete={reveal} />;
      case "v3":
        return <V3Lab38 onComplete={reveal} />;
      case "v3-pairs":
        return <V3PairsLab38 />;
      case "fs-vs-fp":
        return <FsVsFpLab38 />;
      case "fc-vs-fp":
        return <FcVsFpLab38 />;
      case "three-futures":
        return <ThreeFuturesLab38 />;
      case "same-event":
        return <SameEventLab38 />;
      case "perfect-map":
        return <PerfectMapLab38 />;
      case "errors":
        return <ErrorLab38 />;
      case "dialogue2":
        return <Dialogue2Lab38 onComplete={reveal} />;
      case "exercise27":
        return <Exercise27Lab38 onComplete={reveal} />;
      case "fill28":
        return <Fill28Lab38 onComplete={reveal} />;
      case "tense29-a":
        return <Tense29Lab38 onComplete={reveal} range={[0, 4]} />;
      case "tense29-b":
        return <Tense29Lab38 onComplete={reveal} range={[4, 8]} />;
      case "detective30-a":
        return <Detective30Lab38 onComplete={reveal} range={[0, 5]} />;
      case "detective30-b":
        return <Detective30Lab38 onComplete={reveal} range={[5, 10]} />;
      case "iq31":
        return <Iq31Lab38 />;
      case "reading-lab":
        return <ReadingLab38 onComplete={reveal} highlight={false} onToggleHighlight={() => {}} showHighlight={false} />;
      case "writing":
        return <WritingLab38 />;
      case "writing-model":
        return <WritingModelLab38 />;
      case "summary":
        return <SummaryMatchLab38 />;
      case "roadmap-table":
        return <RoadmapStations38 />;
      case "roadmap-why":
        return <RoadmapWhy38 />;
      default:
        return null;
    }
  })();

  const preLab = (() => {
    switch (slide.activity) {
      case "timeline-story":
        return (
          <Section38 eyebrow="خط زمني" title="اقرأ القصة أولًا، ثم حرّك نقاط الخط الزمني في الخطوة التالية">
            <TimelineRail38
              points={[
                { id: "monday", label: "MONDAY", sub: "اليوم" },
                { id: "wednesday", label: "WEDNESDAY", sub: "إنهاء المشروع" },
                { id: "friday", label: "FRIDAY", sub: "نقطة المرجع" },
              ]}
              active="friday"
            />
            <p className="mt-3 text-sm leading-7 text-[#3d4a5c]">
              <Rich text="الفكرة ليست أن النشاط سيحدث يوم الجمعة، بل أننا سنكون قد أنهينا المشروع بحلول الجمعة. النقطة المستقبلية هي مكان النظر، لا مكان الحدث." />
            </p>
          </Section38>
        );
      case "formula":
        return <FormulaStrip38 />;
      case "anatomy":
        return (
          <Section38 eyebrow="تشريح" title="كل جزء له وظيفة — وhave ثابتة">
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                ["She", "الفاعل"],
                ["will", "فعل مساعد للمستقبل"],
                ["have", "جزء ثابت من التركيب"],
                ["completed", "التصريف الثالث V3"],
                ["the experiment", "المفعول به"],
                ["by noon", "بحلول الظهر"],
              ].map(([part, role]) => (
                <div key={part} dir="ltr" className="flex items-center justify-between gap-2 rounded-xl border border-[#d9cbb0] bg-white px-3 py-2">
                  <span dir="ltr" className="font-en font-black text-[#122033]">
                    {part}
                  </span>
                  <span className="text-xs font-bold text-[#4a5568]">{role}</span>
                </div>
              ))}
            </div>
          </Section38>
        );
      case "negative-rule":
        return <FormulaStrip38 mode="negative" />;
      case "yesno-rule":
        return <FormulaStrip38 mode="yesno" />;
      case "wh-rule":
        return <FormulaStrip38 mode="wh" />;
      case "two-events-story":
        return <TwoEventRail38 />;
      case "by-before-rule":
        return <ByBeforeScale38 />;
      case "errors-read":
        return (
          <p className="rounded-xl border border-[#fda4af] bg-[#e8eef5] px-3 py-2 text-sm font-bold leading-6 text-[#a41c36]">
            <Rich text="قبل الانتقال: ضع إصبعك على الخطأ في كل زوج. كل الأخطاء الخمسة الأولى تعود إلى has، أو إلى V1/V2، بدل V3." />
          </p>
        );
      case "reading":
        return <ReadingLens38 highlight={highlight} onToggle={() => setHighlight((value) => !value)} />;
      case "test-launch":
        return <TestLaunch38 onGoTest={onGoTest} />;
      case "teacher-pointer":
        return <TeacherPointer38 onGoTest={onGoTest} onGoSolutions={onGoSolutions} />;
      default:
        return null;
    }
  })();

  return (
    <div
      data-step-id={slide.id}
      data-source-id={slide.sourceId}
      data-source-section={slide.sourceId}
      data-activity={slide.activity}
      className="min-w-0 space-y-3 fp38-slide-in"
    >
      <StepHeader38 slide={slide} />
      {slide.activity === "test-launch" || slide.activity === "teacher-pointer" ? (
        <>
          <SourceCard38 section={slide.source} range={slide.range} compact />
          {lab}
          {preLab}
        </>
      ) : (
        <>
          {slide.collapseSource ? (
            <details className="fp38-card fp38-collapsed" data-collapsed-source={slide.sourceId}>
              <summary className="cursor-pointer px-4 py-3 text-sm font-black text-[#1b3a5c]">
                <Rich text="نص المصدر مع الحلول (مطوي) — افتحه بعد محاولتك للمقارنة" />
              </summary>
              <SourceCard38
                section={slide.source}
                range={slide.range}
                showTable={slide.showMainTable}
                showExtraTable={slide.showExtraTable}
                showReveal={slide.showReveal && revealed}
                compact
              />
            </details>
          ) : (
            <SourceCard38
              section={slide.source}
              range={slide.range}
              showTable={slide.showMainTable}
              showExtraTable={slide.showExtraTable}
              showReveal={slide.showReveal && revealed}
              highlightFuture={slide.activity === "reading" && highlight}
              tablePosition={["s08", "s22", "s24"].includes(slide.id) ? "after" : "before"}
            />
          )}
          {preLab}
          {lab}
          {slide.showReveal && !revealed ? (
            <p className="rounded-xl border border-dashed border-[#d4c4a0] bg-[#f7f2e4] px-3 py-2 text-sm font-bold text-[#4a5568]">
              <Rich text="مفتاح المصدر محفوظ حتى تُكمل محاولتك في النشاط أعلاه." />
            </p>
          ) : null}
          {slide.id === "s22" ? <TenseLanes38 /> : null}
          {slide.id === "s36b" ? (
            <div className="fp38-deadline">
              <p dir="ltr" className="fp38-eyebrow font-en">GOLDEN COMPARISON</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {(["simple", "continuous", "perfect"] as const).map((tense) => (
                  <div key={tense} className="rounded-xl border border-[#d9cbb0] bg-white p-3">
                    <TenseChip38 tense={tense} />
                    <p className="mt-2 text-xs font-bold leading-6 text-[#3d4a5c]">{TENSE_38[tense].label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export function StepFooterNote38({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 rounded-xl bg-[#fff8e8] px-3 py-2 text-center text-sm font-black text-[#7c4a03]">
      <Rich text={typeof children === "string" ? children : ""} />
    </p>
  );
}
