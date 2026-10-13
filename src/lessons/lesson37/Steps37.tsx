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
    <header className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#d8d2c5] bg-white px-3 py-2">
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">
          <Rich text={`Student area · Lesson 37 · خطوة ${slide.step}`} />
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

function CoverScene37({ slide }: { slide: Slide37 }) {
  return (
    <div className="space-y-4">
      <CameraFrame37
        title="Future Camera · الدرس 37"
        caption="نضع الكاميرا داخل المستقبل لنصوّر النشاط الذي سيكون جاريًا هناك."
      >
        <h1 className="text-xl font-black leading-snug text-[#17354a] sm:text-2xl">
          <Rich text="الدرس 37: Future Continuous — المستقبل المستمر" />
        </h1>
        <p dir="ltr" className="font-en mt-1 text-left text-lg font-black text-[#18333b]">
          What Will You Be Doing Tomorrow?
        </p>
        <p className="mt-1 text-sm font-bold text-[#43575a]">رحلة إلى المستقبل — IQ200 🚀</p>
        <p className="mt-3 rounded-xl bg-[#f3f5f2] px-3 py-2 text-sm font-bold leading-6 text-[#24343b]">
          نربط الدرس بثلاث محطات سابقة:{" "}
          <span dir="ltr" className="font-en inline-block rounded bg-white px-2">WILL</span> ·{" "}
          <span dir="ltr" className="font-en inline-block rounded bg-white px-2">BE GOING TO</span> ·{" "}
          <span dir="ltr" className="font-en inline-block rounded bg-white px-2">WILL vs BE GOING TO</span>
        </p>
        <dl className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            { k: "حجم المصدر", v: "38 قسمًا مرقّمًا + المقدمة" },
            { k: "الاختبار الرسمي", v: "25 سؤالًا × 5 مستويات" },
            { k: "المناطق", v: "طالب · اختبار · حلول · معلم" },
          ].map((entry) => (
            <div key={entry.k} className="rounded-xl border border-[#d8d2c5] bg-white px-3 py-2">
              <dt className="text-xs font-black text-[#53676a]">{entry.k}</dt>
              <dd className="mt-0.5 text-sm font-bold text-[#24343b]">{entry.v}</dd>
            </div>
          ))}
        </dl>
      </CameraFrame37>
      <SourceCard37 section={slide.source} />
      <PlatformNote37>
        <Rich text="مفتاح الدرس كله في سطر واحد: Subject + will + be + V-ing — ثم يأتي كل شيء آخر (المعنى، when وwhile، النفي، الأسئلة، أفعال الحالة) ليثبت هذا الأساس ويوسّعه." />
      </PlatformNote37>
    </div>
  );
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
  const section = slide.source;
  const reveal = () => setRevealed(true);

  if (slide.id === "cover") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId}>
        <CoverScene37 slide={slide} />
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
