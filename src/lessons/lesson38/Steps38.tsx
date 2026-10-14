import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import type { Slide38 } from "./data";
import { ActionButton38, Card38, DeadlineFrame38, PlatformNote38, SourceCard38 } from "./kit38";
import {
  AtByLab38,
  ByBeforeLab38,
  ByMeaningLab38,
  ByTheTimeLab38,
  ConjugationLab38,
  CoverBridge38,
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
  WhBuildLab38,
  WritingLab38,
  YesNoBuildLab38,
} from "./labs38";
import { OBJECTIVES_38 } from "./practiceData38";

function StepHeader38({ slide }: { slide: Slide38 }) {
  const source = slide.source;
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#d8d2c5] bg-white px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">
          <Rich text={`Student area · Lesson 38 · خطوة ${slide.step}`} />
        </p>
        <h1 className="mt-0.5 text-base font-black leading-7 text-[#17354a] sm:text-lg">
          <Rich text={source.title} />
        </h1>
      </div>
      <span dir="ltr" className="font-en shrink-0 rounded-full bg-[#17354a] px-3 py-1 text-xs font-black text-white">
        {source.num == null ? "COVER" : `§${source.num}`}
      </span>
    </header>
  );
}

function CoverScene38({ slide }: { slide: Slide38 }) {
  return (
    <div className="space-y-4">
      <CoverBridge38 />
      <DeadlineFrame38 title="جسر من الدرس 37" caption="في الدرس 37 وضعنا الكاميرا داخل لحظة مستقبلية. هنا ننظر من نقطة أبعد إلى إنجاز مكتمل.">
        <p className="rounded-xl bg-[#f3f5f2] px-3 py-2 text-sm font-bold leading-6 text-[#24343b]">
          نربط الدرس بمحطة سابقة:{" "}
          <span dir="ltr" className="font-en inline-block rounded bg-white px-2">Future Continuous</span>
        </p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            { k: "حجم المصدر", v: "36 قسمًا مرقّمًا + المقدمة" },
            { k: "الاختبار الرسمي", v: "25 سؤالًا × 5 مستويات" },
            { k: "المناطق", v: "طالب · اختبار · حلول · معلم" },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#d8d2c5] bg-white px-3 py-2">
              <dt className="text-xs font-black text-[#53676a]">{entry.k}</dt>
              <dd className="mt-0.5 text-sm font-bold text-[#24343b]">{entry.v}</dd>
            </div>
          ))}
        </dl>
      </DeadlineFrame38>
      <SourceCard38 section={slide.source} />
      <PlatformNote38>
        <Rich text="مفتاح الدرس كله في سطر واحد: Subject + will + have + V3 — ثم يأتي المعنى (by / by the time)، والنفي، والأسئلة، والمقارنات مع Future Simple وFuture Continuous." />
      </PlatformNote38>
    </div>
  );
}

export default function StepView38({
  slide,
  onGoTest,
  onGoSolutions,
}: {
  slide: Slide38;
  onGoTest: () => void;
  onGoSolutions: () => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const section = slide.source;
  const reveal = () => setRevealed(true);

  if (slide.id === "cover") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId}>
        <CoverScene38 slide={slide} />
      </div>
    );
  }

  if (slide.id === "s33") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <StepHeader38 slide={slide} />
        <SourceCard38 section={section} skipIndexes={Array.from({ length: section.units.length - 2 }, (_, index) => index + 2)} />
        <Card38 eyebrow="Separate formal test area · source §33" title="ابدأ الاختبار الرسمي">
          <p>
            الاختبار مكوّن من <span className="font-black">25 سؤالًا</span> موزعة على خمسة مستويات أصلية (5 × 5)، ولا يظهر فيه أي تصحيح أو
            مفتاح إجابة أو درجة قبل الإرسال النهائي.
          </p>
          <div className="flex flex-wrap gap-2">
            <ActionButton38 onClick={onGoTest}>فتح Test Area</ActionButton38>
            <ActionButton38 variant="secondary" onClick={onGoSolutions}>
              منطقة الحلول (بعد التسليم)
            </ActionButton38>
          </div>
        </Card38>
      </div>
    );
  }

  if (slide.id === "s34") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <StepHeader38 slide={slide} />
        <SourceCard38 section={section} />
        <PlatformNote38>
          <Rich text="هذا القسم في المصدر يذكر عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» دون أن يتضمّن مفتاحًا فعليًا. لذلك كُتبت الحلول التفصيلية للأسئلة الـ25 في منطقة Solutions Area مستقلة (تُفتح بعد تسليم الاختبار أو بدخول المعلم)، وكل إجابة موسومة بأنها من إعداد المنصة/المعلم وليست نصًا مصدريًا." />
        </PlatformNote38>
        <ActionButton38 onClick={onGoSolutions}>فتح Solutions Area</ActionButton38>
      </div>
    );
  }

  const lab = (() => {
    switch (slide.id) {
      case "s01":
        return <ObjectivesChecklist38 objectives={OBJECTIVES_38} />;
      case "s02":
        return <DeadlineTimelineLab38 />;
      case "s03":
        return <FormulaOrderLab38 />;
      case "s04":
        return <PartsLab38 />;
      case "s05":
        return <ConjugationLab38 />;
      case "s06":
        return <FirstUseLab38 />;
      case "s07":
        return <ByMeaningLab38 />;
      case "s08":
        return <AtByLab38 />;
      case "s09":
        return <TimeExpressionLab38 />;
      case "s10":
        return <TwoEventsLab38 />;
      case "s11":
        return <ByTheTimeLab38 />;
      case "s12":
        return <ByBeforeLab38 />;
      case "s13":
        return <DialogueLab38 />;
      case "s14":
        return <NegativeBuildLab38 />;
      case "s15":
        return <NegationMeaningLab38 />;
      case "s16":
        return <YesNoBuildLab38 />;
      case "s17":
        return <ShortAnswerLab38 />;
      case "s18":
        return <WhBuildLab38 />;
      case "s19":
        return <V3Lab38 />;
      case "s20":
        return <FsVsFpLab38 />;
      case "s21":
        return <FcVsFpLab38 />;
      case "s22":
        return <ThreeFuturesLab38 />;
      case "s23":
        return <SameEventLab38 />;
      case "s24":
        return <PerfectMapLab38 />;
      case "s25":
        return <ErrorLab38 />;
      case "s26":
        return <Dialogue2Lab38 />;
      case "s27":
        return <Exercise27Lab38 onComplete={reveal} />;
      case "s28":
        return <Fill28Lab38 onComplete={reveal} />;
      case "s29":
        return <Tense29Lab38 onComplete={reveal} />;
      case "s30":
        return <Detective30Lab38 onComplete={reveal} />;
      case "s31":
        return <Iq31Lab38 />;
      case "s32":
        return <ReadingLab38 onComplete={reveal} highlight={highlight} onToggleHighlight={() => setHighlight((current) => !current)} />;
      case "s35":
        return <WritingLab38 />;
      case "s36":
        return <SummaryMatchLab38 />;
      default:
        return null;
    }
  })();

  return (
    <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
      <StepHeader38 slide={slide} />
      <SourceCard38
        section={section}
        showReveal={revealed}
        highlightFuture={slide.id === "s32" ? highlight : false}
        extra={slide.id === "s35" ? <WritingWorkspaceNote38 /> : null}
      />
      {lab}
    </div>
  );
}

function WritingWorkspaceNote38() {
  return (
    <div className="mt-3">
      <PlatformNote38>
        مهمة الكتابة تُنجَز في مساحة كتابة مستقلة أسفل هذه البطاقة، وتُقاس عليها الشروط الثمانية الواردة أعلاه.
      </PlatformNote38>
    </div>
  );
}
