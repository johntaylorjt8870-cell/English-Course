import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import type { Slide39 } from "./data";
import { ActionButton39, Card39, DurationFrame39, PlatformNote39, SourceCard39 } from "./kit39";
import {
  ByLab39,
  ByTheTimeLab39,
  ConjugationLab39,
  ContinuationLab39,
  CoverBridge39,
  CurriculumMapLab39,
  Detective32Lab39,
  Dialogue2Lab39,
  DialogueLab39,
  DurationCalcLab39,
  DurationTimelineLab39,
  ErrorLab39,
  Exercise29Lab39,
  Fill30Lab39,
  FinishedLab39,
  FirstUseLab39,
  ForLab39,
  ForSinceQuestionsLab39,
  ForSinceSortLab39,
  FormulaOrderLab39,
  FpVsFpcLab39,
  HowLongBuildLab39,
  Iq33Lab39,
  NegationMeaningLab39,
  NegativeBuildLab39,
  ObjectivesChecklist39,
  PairedExamplesLab39,
  PartsLab39,
  PerfectContinuousLab39,
  ReadingCheckLab39,
  ReadingLab39,
  ShortAnswerLab39,
  SinceLab39,
  StativeLab39,
  SummaryMatchLab39,
  Tense31Lab39,
  TimeClauseLab39,
  WhLab39,
  WritingLab39,
  YesNoBuildLab39,
} from "./labs39";
import { OBJECTIVES_39 } from "./practiceData39";

function StepHeader39({ slide }: { slide: Slide39 }) {
  const source = slide.source;
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#d8d2c5] bg-white px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">
          <Rich text={`Student area · Lesson 39 · خطوة ${slide.step}`} />
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

function CoverScene39({ slide }: { slide: Slide39 }) {
  return (
    <div className="space-y-4">
      <CoverBridge39 />
      <DurationFrame39 title="جسر من الدرس 38" caption="في الدرس 38 نظرنا إلى إنجاز مكتمل بحلول نقطة مستقبلية. هنا نسأل: كم ساعة سيستغرقها النشاط حتى تلك النقطة؟">
        <p className="rounded-xl bg-[#f3f5f2] px-3 py-2 text-sm font-bold leading-6 text-[#24343b]">
          نربط الدرس بمحطة سابقة:{" "}
          <span dir="ltr" className="font-en inline-block rounded bg-white px-2">
            Future Perfect
          </span>
        </p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            { k: "حجم المصدر", v: "39 قسمًا مرقّمًا + المقدمة" },
            { k: "الاختبار الرسمي", v: "25 سؤالًا × 5 مستويات" },
            { k: "المناطق", v: "طالب · اختبار · حلول · معلم" },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#d8d2c5] bg-white px-3 py-2">
              <dt className="text-xs font-black text-[#53676a]">{entry.k}</dt>
              <dd className="mt-0.5 text-sm font-bold text-[#24343b]">{entry.v}</dd>
            </div>
          ))}
        </dl>
      </DurationFrame39>
      <SourceCard39 section={slide.source} />
      <PlatformNote39>
        <Rich text="مفتاح الدرس كله في سطر واحد: Subject + will + have + been + V-ing — ثم يأتي المعنى (مدة النشاط حتى نقطة مستقبلية)، والأدوات (for / since / by / by the time)، والنفي، والأسئلة، والمقارنات مع Future Perfect والأزمنة التامة المستمرة الأخرى." />
      </PlatformNote39>
    </div>
  );
}

function WritingWorkspaceNote39() {
  return (
    <div className="mt-3">
      <PlatformNote39>
        مهمة الكتابة تُنجَز في مساحة كتابة مستقلة أسفل هذه البطاقة، وتُقاس عليها الشروط الثمانية الواردة أعلاه.
      </PlatformNote39>
    </div>
  );
}

export default function StepView39({
  slide,
  onGoTest,
  onGoSolutions,
}: {
  slide: Slide39;
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
        <CoverScene39 slide={slide} />
      </div>
    );
  }

  if (slide.id === "s35") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <StepHeader39 slide={slide} />
        <SourceCard39 section={section} skipIndexes={Array.from({ length: section.units.length - 2 }, (_, index) => index + 2)} />
        <Card39 eyebrow="Separate formal test area · source §35" title="ابدأ الاختبار الرسمي">
          <p>
            الاختبار مكوّن من <span className="font-black">25 سؤالًا</span> موزعة على خمسة مستويات أصلية (5 × 5)، ولا يظهر فيه أي تصحيح أو
            مفتاح إجابة أو درجة قبل الإرسال النهائي.
          </p>
          <div className="flex flex-wrap gap-2">
            <ActionButton39 onClick={onGoTest}>فتح Test Area</ActionButton39>
            <ActionButton39 variant="secondary" onClick={onGoSolutions}>
              منطقة الحلول (بعد التسليم)
            </ActionButton39>
          </div>
        </Card39>
      </div>
    );
  }

  if (slide.id === "s36") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <StepHeader39 slide={slide} />
        <SourceCard39 section={section} />
        <PlatformNote39>
          <Rich text="هذا القسم في المصدر يذكر عنوان مفتاح التصحيح وعبارة «عرض الحلول التفصيلية» دون أن يتضمّن مفتاحًا فعليًا. لذلك كُتبت الحلول التفصيلية للأسئلة الـ25 في منطقة Solutions Area مستقلة (تُفتح بعد تسليم الاختبار أو بدخول المعلم)، وكل إجابة موسومة بأنها من إعداد المنصة/المعلم وليست نصًا مصدريًا." />
        </PlatformNote39>
        <ActionButton39 onClick={onGoSolutions}>فتح Solutions Area</ActionButton39>
      </div>
    );
  }

  const lab = (() => {
    switch (slide.id) {
      case "s01":
        return <ObjectivesChecklist39 objectives={OBJECTIVES_39} />;
      case "s02":
        return <DurationTimelineLab39 />;
      case "s03":
        return <FormulaOrderLab39 />;
      case "s04":
        return <PartsLab39 />;
      case "s05":
        return <ConjugationLab39 />;
      case "s06":
        return <FirstUseLab39 />;
      case "s07":
        return <ContinuationLab39 />;
      case "s08":
        return <ForLab39 />;
      case "s09":
        return <SinceLab39 />;
      case "s10":
        return (
          <div className="space-y-4">
            <ForSinceSortLab39 />
            <ForSinceQuestionsLab39 />
          </div>
        );
      case "s11":
        return <DurationCalcLab39 />;
      case "s12":
        return <ByLab39 />;
      case "s13":
        return <ByTheTimeLab39 />;
      case "s14":
        return <TimeClauseLab39 />;
      case "s15":
        return <DialogueLab39 />;
      case "s16":
        return <FpVsFpcLab39 />;
      case "s17":
        return <PairedExamplesLab39 />;
      case "s18":
        return <FinishedLab39 />;
      case "s19":
        return <NegativeBuildLab39 />;
      case "s20":
        return <NegationMeaningLab39 />;
      case "s21":
        return <YesNoBuildLab39 />;
      case "s22":
        return <ShortAnswerLab39 />;
      case "s23":
        return <HowLongBuildLab39 />;
      case "s24":
        return <WhLab39 />;
      case "s25":
        return <PerfectContinuousLab39 />;
      case "s26":
        return <StativeLab39 />;
      case "s27":
        return <ErrorLab39 />;
      case "s28":
        return <Dialogue2Lab39 />;
      case "s29":
        return <Exercise29Lab39 onComplete={reveal} />;
      case "s30":
        return <Fill30Lab39 onComplete={reveal} />;
      case "s31":
        return <Tense31Lab39 onComplete={reveal} />;
      case "s32":
        return <Detective32Lab39 onComplete={reveal} />;
      case "s33":
        return <Iq33Lab39 />;
      case "s34":
        return (
          <div className="space-y-4">
            <ReadingLab39 onComplete={reveal} highlight={highlight} onToggleHighlight={() => setHighlight((current) => !current)} />
            <ReadingCheckLab39 />
          </div>
        );
      case "s37":
        return <WritingLab39 />;
      case "s38":
        return <SummaryMatchLab39 />;
      case "s39":
        return <CurriculumMapLab39 />;
      default:
        return null;
    }
  })();

  return (
    <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
      <StepHeader39 slide={slide} />
      <SourceCard39
        section={section}
        showReveal={revealed}
        highlightFuture={slide.id === "s34" ? highlight : false}
        extra={slide.id === "s37" ? <WritingWorkspaceNote39 /> : null}
      />
      {slide.id === "s29" ? (
        <PlatformNote39>
          <Rich text="ملاحظة فيدلية: البندان ① و② من هذا التدريب يردان حرفيًا في المستوى الأول من الاختبار النهائي (§35) في نص المصدر نفسه. أُبقيا في موضعيهما دون حذف أو تعديل، فلا تُعدّ رؤيتهما مرة أخرى في الاختبار خطأً في المنصة." />
        </PlatformNote39>
      ) : null}
      {lab}
    </div>
  );
}
