import { useState } from "react";
import { SLIDES_40, sourceSection40 } from "./data";
import { Callout40, Chip40, EnBidi, MixedBidi, SourceLedgerBlock40 } from "./kit40";
import {
  AdamThreeWayComparisonLab40,
  CurriculumRoadmap29Lab40,
  DecisionMapLab40,
  DeepUnderstandingLab40,
  Detective21Lab40,
  Dialogue1Lab40,
  Dialogue2Lab40,
  Exercise19Lab40,
  Fill20Lab40,
  ForSinceAndStativeLab40,
  FormulaBuilderLab40,
  FutureContinuousRoundLab40,
  FuturePerfectContinuousRoundLab40,
  FuturePerfectRoundLab40,
  GoldenSummary28Lab40,
  GoldenTableLab40,
  Iq22MultiAnswerLab40,
  ObjectivesChecklistLab40,
  Reading23Lab40,
  SignalWordsLab40,
  SituationLab40,
  StoryAnalysis24Lab40,
  StudyPerspectivesLab40,
  TimeClausesExplorerLab40,
  WhenVsByTheTimeLab40,
  WillVsGoingToLab40,
  WritingMission27Lab40,
} from "./labs40";

export function StepView40({
  stepIndex,
  testSubmitted,
  teacherUnlocked,
  onOpenTest,
  onOpenSolutions,
  onOpenTeacher,
}: {
  stepIndex: number;
  testSubmitted: boolean;
  teacherUnlocked: boolean;
  onOpenTest: () => void;
  onOpenSolutions: () => void;
  onOpenTeacher: () => void;
}) {
  const [revealedUnits, setRevealedUnits] = useState<Record<string, boolean>>({});
  const slide = SLIDES_40[stepIndex] ?? SLIDES_40[0];
  const section = sourceSection40(slide.sourceId);
  const id = slide.sourceId;

  function toggleRevealUnit(unitId: string) {
    setRevealedUnits((prev) => ({ ...prev, [unitId]: !prev[unitId] }));
  }

  if (id === "cover") {
    return (
      <div dir="rtl" className="space-y-5">
        <div className="rounded-3xl border border-[#b9c8c0] bg-[#eef4f0] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full border border-[#245f62] bg-[#ffffff] px-3.5 py-1 text-xs font-extrabold text-[#245f62]">
              منظومة المستقبل الكاملة — الدروس 34–40
            </span>
            <span className="rounded-full border border-[#76531e] bg-[#fbf6eb] px-3.5 py-1 text-xs font-extrabold text-[#76531e]">
              المستوى: تأسيسي متقدم — IQ200
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17354a] leading-[1.5]">
            <MixedBidi>الدرس 40: Future Tenses Master Review — المراجعة الشاملة وإتقان أزمنة المستقبل</MixedBidi>
          </h1>

          <div
            dir="ltr"
            lang="en"
            style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
            className="rounded-2xl border border-[#95b8b1] bg-[#fffdf8] px-4 py-3 font-mono text-base sm:text-lg font-extrabold text-[#17354a]"
          >
            <EnBidi>The Future Tenses Grand Challenge 🚀 — Master Review Lab</EnBidi>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
            {[
              { station: "① محطة 34", name: "Future Simple — WILL" },
              { station: "② محطة 35", name: "BE GOING TO" },
              { station: "③ محطة 36", name: "WILL vs BE GOING TO" },
              { station: "④ محطة 37", name: "Future Continuous" },
              { station: "⑤ محطة 38", name: "Future Perfect" },
              { station: "⑥ محطة 39", name: "Future Perfect Continuous" },
            ].map((item) => (
              <div
                key={item.station}
                className="rounded-xl border border-[#c8c3b4] bg-[#fffdf8] p-2.5 text-right space-y-1"
              >
                <div className="text-xs font-extrabold text-[#245f62]">{item.station}</div>
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="font-mono text-xs font-bold text-[#17354a]"
                >
                  <EnBidi>{item.name}</EnBidi>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SourceLedgerBlock40 section={section}>
          <Callout40
            tone="teal"
            title="من 6 محطات دراسية إلى 5 صيغ مستقبلية رئيسية"
            badge="دليل المراجعة"
          >
            <p>
              <MixedBidi>
                في الدروس 34–39 درسنا ست محطات تعليمية (لأن الدرس 36 خُصّص للمقارنة بين WILL وBE GOING TO)، وفي هذا الدرس نجمع الصيغ الخمس الرئيسية في نظام قرار واحد ينقلك من معرفة القواعد إلى التحكم بها.
              </MixedBidi>
            </p>
          </Callout40>
        </SourceLedgerBlock40>
      </div>
    );
  }

  if (id === "s01") {
    return (
      <SourceLedgerBlock40 section={section}>
        <ObjectivesChecklistLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s02") {
    return (
      <SourceLedgerBlock40 section={section}>
        <DecisionMapLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s03") {
    return (
      <SourceLedgerBlock40 section={section}>
        <GoldenTableLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s04") {
    return (
      <SourceLedgerBlock40 section={section}>
        <StudyPerspectivesLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s05") {
    return (
      <SourceLedgerBlock40 section={section}>
        <WillVsGoingToLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s06") {
    return (
      <SourceLedgerBlock40 section={section}>
        <FutureContinuousRoundLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s07") {
    return (
      <SourceLedgerBlock40 section={section}>
        <FuturePerfectRoundLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s08") {
    return (
      <SourceLedgerBlock40 section={section}>
        <FuturePerfectContinuousRoundLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s09") {
    return (
      <SourceLedgerBlock40 section={section}>
        <AdamThreeWayComparisonLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s10") {
    return (
      <SourceLedgerBlock40 section={section}>
        <DeepUnderstandingLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s11") {
    return (
      <SourceLedgerBlock40 section={section}>
        <SignalWordsLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s12") {
    return (
      <SourceLedgerBlock40 section={section}>
        <TimeClausesExplorerLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s13") {
    return (
      <SourceLedgerBlock40 section={section}>
        <WhenVsByTheTimeLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s14") {
    return (
      <SourceLedgerBlock40 section={section}>
        <ForSinceAndStativeLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s15") {
    return (
      <SourceLedgerBlock40 section={section}>
        <FormulaBuilderLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s16") {
    return (
      <SourceLedgerBlock40 section={section}>
        <Dialogue1Lab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s17") {
    const revealed = Boolean(revealedUnits["s17-solution"]);
    return (
      <SourceLedgerBlock40 section={section} showReveal={revealed}>
        <Dialogue2Lab40
          revealed={revealed}
          onReveal={() => toggleRevealUnit("s17-solution")}
        />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s18") {
    return (
      <SourceLedgerBlock40 section={section}>
        <SituationLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s19") {
    const revealed = Boolean(revealedUnits["s19-solutions"]);
    return (
      <SourceLedgerBlock40 section={section} showReveal={revealed}>
        <Exercise19Lab40
          revealed={revealed}
          onReveal={() => toggleRevealUnit("s19-solutions")}
        />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s20") {
    const revealed = Boolean(revealedUnits["s20-solutions"]);
    return (
      <SourceLedgerBlock40 section={section} showReveal={revealed}>
        <Fill20Lab40
          revealed={revealed}
          onReveal={() => toggleRevealUnit("s20-solutions")}
        />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s21") {
    const revealed = Boolean(revealedUnits["s21-solutions"]);
    return (
      <SourceLedgerBlock40 section={section} showReveal={revealed}>
        <Detective21Lab40
          revealed={revealed}
          onReveal={() => toggleRevealUnit("s21-solutions")}
        />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s22") {
    return (
      <SourceLedgerBlock40 section={section}>
        <Iq22MultiAnswerLab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s23") {
    const revealed = Boolean(revealedUnits["s23-solutions"]);
    return (
      <SourceLedgerBlock40 section={section} showReveal={revealed}>
        <Reading23Lab40
          revealed={revealed}
          onReveal={() => toggleRevealUnit("s23-solutions")}
        />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s24") {
    return (
      <SourceLedgerBlock40 section={section}>
        <StoryAnalysis24Lab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s25") {
    return (
      <SourceLedgerBlock40
        section={section}
        skipIndexes={section.units.map((_, idx) => idx).slice(2)}
      >
        <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-extrabold text-[#17354a]">
              منطقة الاختبار النهائي الشامل المستقلة (25 سؤالًا في 5 مستويات)
            </h3>
            <Chip40
              label={testSubmitted ? "تم تسليم الاختبار ✅" : "جاهز للبدء — 25 سؤالًا"}
              tone={testSubmitted ? "emerald" : "teal"}
            />
          </div>
          <p className="text-sm font-semibold text-[#24343b] leading-[1.85]">
            <MixedBidi>
              يتكوّن الاختبار النهائي الشامل من 25 سؤالًا موزعة على خمسة مستويات (5 × 5): اختيار الإجابة الصحيحة (①–⑤)، إكمال الجمل (⑥–⑩)، تصحيح الأخطاء (⑪–⑮)، فهم المعنى والسبب النحوي (⑯–⑳)، والقصة المتكاملة The Big School Project (㉑–㉕). انتقل إلى منطقة الاختبار المستقلة لأداء التقييم دون كشف الحلول قبل التسليم.
            </MixedBidi>
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenTest}
              className="rounded-xl bg-[#17354a] px-5 py-2.5 text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
            >
              فتح منطقة الاختبار النهائي الشامل (25 سؤالًا)
            </button>
            {testSubmitted || teacherUnlocked ? (
              <button
                type="button"
                onClick={onOpenSolutions}
                className="rounded-xl border border-[#28533b] bg-[#edf5ee] px-5 py-2.5 text-sm font-extrabold text-[#28533b] cursor-pointer"
              >
                استعراض الحلول التفصيلية المفتوحة
              </button>
            ) : null}
          </div>
        </div>
      </SourceLedgerBlock40>
    );
  }

  if (id === "s26") {
    const canViewSolutions = testSubmitted || teacherUnlocked;
    return (
      <SourceLedgerBlock40
        section={section}
        skipIndexes={section.units.map((_, idx) => idx).slice(2)}
      >
        <div className="rounded-2xl border border-[#d4b475] bg-[#fbf6eb] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-extrabold text-[#76531e]">
              بوابة الحلول التفصيلية للاختبار النهائي (§26)
            </h3>
            <Chip40
              label={canViewSolutions ? "الحلول مفتوحة الآن ✅" : "مقفلة حتى تسليم الاختبار 🔒"}
              tone={canViewSolutions ? "emerald" : "amber"}
            />
          </div>
          <p className="text-sm font-semibold text-[#24343b] leading-[1.85]">
            <MixedBidi>
              التزامًا بتوجيه المصدر («يفضّل عدم عرض هذا القسم للطالب إلا بعد انتهاء الاختبار»)، تُحفظ الحلول التفصيلية للأسئلة الـ25 داخل «منطقة الحلول» المستقلة و«منطقة المعلم»، ولا تُعرض هنا قبل تسليم الاختبار.
            </MixedBidi>
          </p>
          <div className="flex flex-wrap gap-3">
            {canViewSolutions ? (
              <button
                type="button"
                onClick={onOpenSolutions}
                className="rounded-xl bg-[#28533b] px-5 py-2.5 text-sm font-extrabold text-[#ffffff] cursor-pointer"
              >
                الانتقال إلى منطقة الحلول التفصيلية الكاملة
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenTest}
                className="rounded-xl bg-[#17354a] px-5 py-2.5 text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
              >
                اذهب إلى منطقة الاختبار لتسليمه وفتح الحلول
              </button>
            )}
            <button
              type="button"
              onClick={onOpenTeacher}
              className="rounded-xl border border-[#76531e] bg-[#fffdf8] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#76531e] cursor-pointer"
            >
              دخول مساحة المعلم
            </button>
          </div>
        </div>
      </SourceLedgerBlock40>
    );
  }

  if (id === "s27") {
    return (
      <SourceLedgerBlock40 section={section}>
        <WritingMission27Lab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s28") {
    return (
      <SourceLedgerBlock40 section={section}>
        <GoldenSummary28Lab40 />
      </SourceLedgerBlock40>
    );
  }

  if (id === "s29") {
    return (
      <SourceLedgerBlock40 section={section}>
        <CurriculumRoadmap29Lab40 />
      </SourceLedgerBlock40>
    );
  }

  return <SourceLedgerBlock40 section={section} />;
}
