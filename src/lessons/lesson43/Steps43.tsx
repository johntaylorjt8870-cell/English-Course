import { En43, Text43, Panel43, Note43, Tip43, SourceLines43, NumberCards43, Frame43 } from "./design43";
import { SignatureGhost } from "../../shared/Signature";
import { sectionLines43, sectionTitle43, splitTitle43, NUMBER_MARKS_43 } from "./ledger43";
import { Slide43, STATIONS_43, type LabKey43 } from "./slides43";
import { TestArea43 } from "./TestArea43";
import TeacherArea43 from "./TeacherArea43";
import { TestResult43, WritingMission43 } from "./kit43";
import {
  BuilderLab43,
  DecisionLab43,
  DialLab43,
  DetectiveLab43,
  FormLab43,
  MatrixLab43,
  MaybeComposerLab43,
  MaybeLab43,
  MustNotLab43,
  NegationLab43,
  PermissionLab43,
  PermissionScenariosLab43,
  PastLab43,
  PracticeSet43,
  Reading43,
  SpectrumLab43,
  SwapLab43,
} from "./kit43";

export function Cover43({ slide }: { slide: Slide43 }) {
  const lines = sectionLines43(0).slice(0, 3);
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-12">
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-violet-100 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-sky-100 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <div className="pop text-7xl anim-drift" aria-hidden="true">
          {slide.mascot}
        </div>
        <div className="pop pop-1 mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">
          <Text43 text="الدرس 43" />
          <span className="text-white/50">·</span>
          <span dir="ltr" lang="en" className="font-en">MAY vs MIGHT</span>
        </div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          <Text43 text={lines[0]} />
          <span dir="ltr" lang="en" className="font-en mt-2 block text-2xl font-extrabold tracking-wide text-slate-800 md:text-4xl">
            MAY vs MIGHT
          </span>
        </h1>
        <p className="pop pop-3 mt-3 text-lg font-bold text-slate-500 md:text-xl">
          <Text43 text={lines[2]} />
        </p>
        <div className="pop pop-4 mt-7 flex flex-wrap items-center justify-center gap-3" dir="ltr">
          {[
            { name: "MAY", ar: "الاحتمال · المستقبل · الإذن", tone: "bg-violet-600" },
            { name: "MIGHT", ar: "الاحتمال · التحفظ · الرسمية", tone: "bg-sky-800" },
            { name: "MAYBE", ar: "ظرف مستقل مقابل MAY BE", tone: "bg-orange-700" },
          ].map((modal) => (
            <div key={modal.name} className={`rounded-2xl ${modal.tone} px-6 py-3 text-white shadow-md`}>
              <div className="font-en text-2xl font-extrabold md:text-3xl">{modal.name}</div>
              <div dir="rtl" className="text-sm font-bold">
                {modal.ar}
              </div>
            </div>
          ))}
        </div>
        <p className="pop pop-5 mt-7 text-base text-slate-500">
          <Text43 text="للتنقل: الأسهم ← → أو الأزرار أسفل الشريحة · " />
          <bdi dir="ltr">{slide.title}</bdi>
        </p>
      </div>
    </section>
  );
}

export type TestControls43 = {
  answers: Record<string, string>;
  submitted: boolean;
  graded: { score: number; total: number } | null;
  onChange: (key: string, value: string) => void;
  onSubmit: (result: { score: number; total: number }) => void;
  onReset: () => void;
};

export function SlideBody43({
  slide,
  index,
  test,
}: {
  slide: Slide43;
  index: number;
  test: TestControls43;
}) {
  if (slide.kind === "cover") return <Cover43 slide={slide} />;

  const frame = {
    mascot: slide.mascot,
    step: index + 1,
    badge: slide.badge,
    title: slide.title,
    lead: slide.lead,
    tone: slide.tone ?? "violet",
  };

  if (slide.kind === "lab") {
    const component = {
      spectrum: <SpectrumLab43 />,
      builder: <BuilderLab43 part={slide.labPart ?? 1} />,
      form: <FormLab43 />,
      dial: <DialLab43 />,
      maybeComposer: <MaybeComposerLab43 />,
      swap: <SwapLab43 />,
      negation: <NegationLab43 />,
      mustnot: <MustNotLab43 />,
      permission: <PermissionLab43 />,
      permissionScenarios: <PermissionScenariosLab43 />,
      maybe: <MaybeLab43 />,
      past: <PastLab43 />,
      matrix: <MatrixLab43 />,
      decision: <DecisionLab43 />,
      detective: <DetectiveLab43 />,
    }[slide.lab as LabKey43];
    return (
      <Frame43 {...frame}>
        {component}
        <SignatureGhost />
      </Frame43>
    );
  }

  if (slide.kind === "practice") {
    return (
      <Frame43 {...frame}>
        <PracticeSet43 section={slide.practice!} from={slide.items![0]} to={slide.items![1]} />
        <SignatureGhost />
      </Frame43>
    );
  }

  if (slide.kind === "reading") {
    return (
      <Frame43 {...frame}>
        <Reading43 part={slide.readingPart!} />
        <SignatureGhost />
      </Frame43>
    );
  }

  if (slide.kind === "test") {
    return (
      <Frame43 {...frame}>
        <TestArea43
          level={slide.testLevel!}
          items={slide.testItems!}
          answers={test.answers}
          submitted={test.submitted}
          onChange={test.onChange}
          onSubmit={test.onSubmit}
          onReset={test.onReset}
        />
        <SignatureGhost />
      </Frame43>
    );
  }

  if (slide.kind === "testResult") {
    return (
      <Frame43 {...frame}>
        <TestResult43 submitted={test.submitted} graded={test.graded} onReset={test.onReset} />
        <SignatureGhost />
      </Frame43>
    );
  }

  if (slide.kind === "teacher") {
    return (
      <Frame43 {...frame}>
        <TeacherArea43 />
        <SignatureGhost />
      </Frame43>
    );
  }

  if (slide.kind === "writing") {
    if (slide.writingPart !== "model") {
      return (
        <Frame43 {...frame}>
          {slide.writingPart === "editor" && (
            <Tip43>
              <Text43 text="اكتب فقرة من 12–15 جملة عن «يوم مليء بالاحتمالات». استخدم الفعلين MAY وMIGHT في صور مختلفة، وMAY BE وMAYBE، وطلب إذن باستخدام May I...؟" />
            </Tip43>
          )}
          <WritingMission43 part={slide.writingPart ?? "editor"} />
        </Frame43>
      );
    }
    return (
      <Frame43 {...frame} tone="sky">
        <WritingMission43 part="model" />
      </Frame43>
    );
  }

  const [titleLatin, titleArabic] = splitTitle43(sectionTitle43(slide.section));
  const lines = sectionLines43(slide.section).slice(slide.range![0], slide.range![1] + 1);
  const numbered = lines.filter((line) => line.trim().startsWith(NUMBER_MARKS_43));
  const plain = lines.filter((line) => !line.trim().startsWith(NUMBER_MARKS_43));
  const isSteps = slide.id.startsWith("start-") || slide.id.startsWith("may-1") || slide.id.startsWith("dialogue-1");

  return (
    <Frame43 {...frame}>
      <p className="text-xs font-bold text-slate-500">
        {slide.section === 0 ? (
          <Text43 text="القسم الافتتاحي · الدرس 43" />
        ) : titleLatin ? (
          <>
            <span dir="ltr" lang="en" className="font-en">{titleLatin}</span>
            <span aria-hidden="true">{" \u2022 "}</span>
            <Text43 text={`القسم ${slide.section} \u2022 ${titleArabic}`} />
          </>
        ) : (
          <Text43 text={`القسم ${slide.section} \u2022 ${sectionTitle43(slide.section)}`} />
        )}
      </p>
      {isSteps && numbered.length > 0 && <NumberCards43 lines={numbered} tone="sky" />}
      <SourceLines43 lines={isSteps ? plain : lines} />
      {slide.id === "next-roadmap" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-600">
            <span>التقدم الكلي</span>
            <bdi dir="ltr">43 / 120</bdi>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-violet-400 to-emerald-500" style={{ width: `${(43 / 120) * 100}%` }} />
          </div>
        </div>
      )}
      <SignatureGhost />
    </Frame43>
  );
}

export { STATIONS_43 };
