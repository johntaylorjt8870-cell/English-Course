import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import type { Slide37 } from "./data";
import { sourceSection37 } from "./ledger37";
import { ActionButton37, CameraFrame37, Card37, PlatformNote37, SourceCard37 } from "./kit37";
import {
  AdvancedChallengeLab37,
  CameraLab37,
  ChoiceLab37,
  ConjugationLab37,
  ContinuousSelectLab37,
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
  ReadingLab37,
  RoutineLab37,
  ShortAnswerLab37,
  StateVerbLab37,
  SummaryMatchLab37,
  Transform29Lab37,
  TwoEventsLab37,
  WhenClauseLab37,
  WhileLab37,
  WhBuildLab37,
  WhoRoleLab37,
  YesNoBuildLab37,
  CurriculumPreviewLab37,
  TimeExpressionLab37,
  WritingLab37,
} from "./labs37";
import { OBJECTIVES_37, POLITE_ITEMS_37 } from "./practiceData37";

function StepHeader37({ slide }: { slide: Slide37 }) {
  const source = slide.source;
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#b8dff0] bg-white px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">
          <Rich text={`Student area · Lesson 37 · خطوة ${slide.step}`} />
        </p>
        <h1 className="mt-0.5 text-base font-black leading-7 text-[#084765] sm:text-lg">
          <Rich text={source.title} />
        </h1>
      </div>
      <span dir="ltr" className="font-en shrink-0 rounded-full bg-[#084765] px-3 py-1 text-xs font-black text-white">
        {source.num == null ? "COVER" : `§${source.num}`}
      </span>
    </header>
  );
}

function CoverScene37({ slide, onStart }: { slide: Slide37; onStart: () => void }) {
  return (
    <div className="space-y-4">
      <section className="horizon-cover37 overflow-hidden rounded-[2rem] border border-[#b8dff0] bg-white shadow-[0_22px_60px_-35px_rgba(23,105,255,.45)]">
        <div className="horizon-cover37__top flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black tracking-wide text-[#075b83]">FUTURE HORIZON · TIME OBSERVATORY</span>
          <span className="font-en rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-black text-[#075b83]">LESSON 37 · IQ200</span>
        </div>
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <p className="text-sm font-black text-[#007b83]">مرصد الزمن · التقط لحظة من الغد</p>
            <h1 className="mt-2 text-2xl font-black leading-tight text-[#084765] sm:text-3xl">
              <Rich text="الدرس 37: Future Continuous — المستقبل المستمر" />
            </h1>
            <p dir="ltr" className="font-en mt-2 text-left text-xl font-black text-[#17384a] sm:text-2xl">What Will You Be Doing Tomorrow?</p>
            <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-[#3e5d70]">اختر ما تتخيل أنك ستكون تفعله في لحظة مستقبلية، ثم ابدأ الدرس من المعنى قبل القاعدة.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={onStart} className="horizon-start37 min-h-12 rounded-xl bg-[#1769ff] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#084765] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none">ابدأ الرحلة التعليمية ←</button>
              <span className="text-xs font-bold text-[#4b6a7d]">المقدمة كاملة أدناه · الوصول للمحتوى مباشر</span>
            </div>
          </div>
          <HorizonProbe37 />
        </div>
      </section>
      <SourceCard37 section={slide.source} />
      <PlatformNote37>
        <Rich text="مفتاح الدرس كله في سطر واحد: Subject + will + be + V-ing — ثم يأتي كل شيء آخر (المعنى، when وwhile، النفي، الأسئلة، أفعال الحالة) ليثبت هذا الأساس ويوسّعه." />
      </PlatformNote37>
    </div>
  );
}

function HorizonProbe37() {
  const [activity, setActivity] = useState("");
  const activities = ["studying", "preparing dinner", "reading", "working"];
  return (
    <div className="horizon-instrument37 rounded-[1.5rem] border border-[#b8dff0] bg-[#f4fbff] p-4 sm:p-5" data-horizon-probe>
      <p className="text-xs font-black uppercase tracking-[.12em] text-[#4b6a7d]">Select a future moment</p>
      <h2 dir="ltr" className="font-en mt-1 text-left text-xl font-black text-[#084765]">What will you be doing at 8:00 tomorrow?</h2>
      <div className="horizon-timeline37 mt-4" aria-label="خط زمني من السادسة إلى العاشرة غدًا">
        <div className="horizon-timeline37__line" />
        {["6:00", "8:00", "10:00"].map((time, index) => (
          <div key={time} className={`horizon-timeline37__point horizon-timeline37__point--${index}`}>
            <span className="horizon-timeline37__dot" />
            <span dir="ltr" className="font-en text-xs font-black text-[#17384a]">{time}</span>
            {index === 1 ? <span className="horizon-timeline37__lens" aria-hidden="true">◉</span> : null}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-[#3e5d70]">اختر نشاطًا؛ مؤشر المرصد يضع الكاميرا عند اللحظة، لا عند بداية النشاط أو نهايته.</p>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="اختر نشاطًا مستقبليًا">
        {activities.map((item) => (
          <button key={item} type="button" aria-pressed={activity === item} onClick={() => setActivity(item)} dir="ltr" className={`font-en min-h-10 rounded-full border px-3 py-1.5 text-sm font-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1769ff] motion-reduce:transition-none ${activity === item ? "border-[#007b83] bg-[#e4f8f5] text-[#075b83]" : "border-[#b8dff0] bg-white text-[#3e5d70] hover:bg-[#eaf4ff]"}`}>
            {item}
          </button>
        ))}
      </div>
      {activity ? <p data-horizon-sentence dir="ltr" className="font-en mt-3 rounded-xl border-s-4 border-[#ff765e] bg-white px-3 py-2 text-left font-black text-[#084765]">At 8:00 tomorrow, I will be {activity}.</p> : null}
      <p className="mt-2 text-[11px] font-bold text-[#4b6a7d]">مثال توضيحي من المنصة · يمكنك اختيار أكثر من نشاط لاحقًا في حياتك الواقعية.</p>
    </div>
  );
}

export default function StepView37({
  slide,
  onGoTest,
  onGoSolutions,
  onStartStep = () => {},
}: {
  slide: Slide37;
  onGoTest: () => void;
  onGoSolutions: () => void;
  onStartStep?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const section = slide.source;
  const reveal = () => setRevealed(true);

  if (slide.id === "cover") {
      return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId}>
        <CoverScene37 slide={slide} onStart={onStartStep} />
      </div>
    );
  }

  if (slide.id === "s34") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <StepHeader37 slide={slide} />
        <SourceCard37 section={section} skipIndexes={Array.from({ length: section.units.length - 3 }, (_, index) => index + 3)} />
        <Card37 eyebrow="Separate formal test area · source §34" title="ابدأ الاختبار الرسمي">
          <p>
            الاختبار مكوّن من <span className="font-black">25 سؤالًا</span> موزعة على خمسة مستويات أصلية (5 × 5)، ولا يظهر فيه أي تصحيح أو
            مفتاح إجابة أو درجة قبل الإرسال النهائي.
          </p>
          <div className="flex flex-wrap gap-2">
            <ActionButton37 onClick={onGoTest}>فتح Test Area</ActionButton37>
            <ActionButton37 variant="secondary" onClick={onGoSolutions}>
              منطقة الحلول (بعد التسليم)
            </ActionButton37>
          </div>
        </Card37>
      </div>
    );
  }

  if (slide.id === "s35") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <StepHeader37 slide={slide} />
        <SourceCard37 section={section} />
        <PlatformNote37>
          <Rich text="هذا القسم في المصدر يذكر عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» دون أن يتضمّن مفتاحًا فعليًا. لذلك كُتبت الحلول التفصيلية للأسئلة الـ25 في منطقة Solutions مستقلة (تُفتح بعد تسليم الاختبار أو بدخول المعلم)، وكل إجابة موسومة بأنها من إعداد المنصة/المعلم وليست نصًا مصدريًا، مع نماذج وبدائل مقبولة في الأسئلة المفتوحة." />
        </PlatformNote37>
        <ActionButton37 onClick={onGoSolutions}>فتح Solutions Area</ActionButton37>
      </div>
    );
  }

  const lab = (() => {
    switch (slide.id) {
      case "s01":
        return <ObjectivesChecklist37 objectives={OBJECTIVES_37} />;
      case "s02":
        return <FutureMomentLab37 />;
      case "s03":
        return <FormulaOrderLab37 />;
      case "s04":
        return <PartsLab37 />;
      case "s05":
        return <ConjugationLab37 />;
      case "s06":
        return <MomentLab37 />;
      case "s07":
        return <CameraLab37 />;
      case "s08":
        return <TimeExpressionLab37 />;
      case "s09":
        return <MeaningLab37 sectionId="s09" />;
      case "s10":
        return <MeaningLab37 sectionId="s10" />;
      case "s11":
        return <TwoEventsLab37 />;
      case "s12":
        return <WhenClauseLab37 />;
      case "s13":
        return <WhileLab37 />;
      case "s14":
        return <DialogueLab37 />;
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
      case "s24":
        return <IngLab37 />;
      case "s25":
        return <StateVerbLab37 />;
      case "s26":
        return <ContinuousSelectLab37 />;
      case "s27":
        return <MeaningLab37 sectionId="s27" />;
      case "s28":
        return <Exercise28Lab37 onComplete={reveal} />;
      case "s29":
        return <Transform29Lab37 onComplete={reveal} />;
      case "s30":
        return <Detective30Lab37 onComplete={reveal} />;
      case "s31":
        return <IQ200Lab37 onComplete={reveal} />;
      case "s32":
        return <ReadingLab37 onComplete={reveal} highlight={highlight} onToggleHighlight={() => setHighlight((current) => !current)} />;
      case "s33":
        return <AdvancedChallengeLab37 />;
      case "s36":
        return <WritingLab37 />;
      case "s37":
        return <SummaryMatchLab37 />;
      case "s38":
        return <CurriculumPreviewLab37 />;
      default:
        return null;
    }
  })();

  return (
    <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
      <StepHeader37 slide={slide} />
      <SourceCard37
        section={section}
        showReveal={revealed}
        highlightFuture={slide.id === "s32" ? highlight : false}
        extra={slide.id === "s36" ? <WritingWorkspaceNote37 /> : null}
      />
      {lab}
    </div>
  );
}

function WritingWorkspaceNote37() {
  return (
    <div className="mt-3">
      <PlatformNote37>
        مهمة الكتابة تُنجَز في مساحة كتابة مستقلة أسفل هذه البطاقة، وتُقاس عليها الشروط الثمانية الواردة أعلاه.
      </PlatformNote37>
    </div>
  );
}
