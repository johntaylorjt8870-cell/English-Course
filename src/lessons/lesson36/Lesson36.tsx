import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { En } from "../../shared/lessonKit";
import {
  AREA_LABEL_36,
  LESSON_SUBTITLE_36,
  SLIDES_36,
  STAGES_36,
  STEP_COUNT_36,
  stageOf36,
  type Area36,
} from "./data";
import StepView36 from "./Steps36";
import { MixedText36 } from "./kit36";

const TestArea36 = lazy(() => import("./TestArea36"));
const SolutionsArea36 = lazy(() => import("./SolutionsArea36"));
const TeacherArea36 = lazy(() => import("./TeacherArea36"));

const AREAS: Area36[] = ["lesson", "test", "solutions", "teacher"];

export default function Lesson36({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area36>("lesson");
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [testVisited, setTestVisited] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const slide = SLIDES_36[index];
  const stage = stageOf36(slide.id);
  const last = index === STEP_COUNT_36 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const progress = area === "lesson" ? ((index + 1) / STEP_COUNT_36) * 100 : 100;

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [index, area]);

  const goPrev = useCallback(() => setIndex((current) => Math.max(0, current - 1)), []);
  const goNext = useCallback(() => setIndex((current) => Math.min(STEP_COUNT_36 - 1, current + 1)), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (menu) {
        if (event.key === "Escape") setMenu(false);
        return;
      }
      if (area !== "lesson") {
        if (event.key === "Escape") setArea("lesson");
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === " ") {
        if (target?.closest?.("button, a, summary, [role='button']")) return;
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key === "ArrowLeft") goNext();
      else if (event.key === "ArrowRight") goPrev();
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(STEP_COUNT_36 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area, goNext, goPrev, menu]);

  const goToStep = (target: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_36 - 1, target)));
    setArea("lesson");
    setMenu(false);
  };
  const openTest = () => {
    setTestVisited(true);
    setArea("test");
    setMenu(false);
  };
  const openSolutions = () => {
    setArea("solutions");
    setMenu(false);
  };

  const groups = useMemo<Lesson1ShellGroup[]>(
    () =>
      STAGES_36.map((group) => ({
        section: `${group.icon} ${group.label}`,
        items: group.stepIds.map((id) => {
          const stepIndex = SLIDES_36.findIndex((candidate) => candidate.id === id);
          const item = SLIDES_36[stepIndex];
          return {
            index: stepIndex,
            title: <MixedText36 text={item.title} />,
            navId: item.id,
            mascot: undefined,
          };
        }),
      })),
    [],
  );

  const railFooter = (
    <div className="mt-2 grid gap-1.5" role="group" aria-label="مناطق الدرس 36">
      {AREAS.map((candidate) => {
        const locked = candidate === "solutions" && !solutionsUnlocked;
        return (
          <button
            key={candidate}
            type="button"
            data-area-tab={candidate}
            aria-pressed={area === candidate}
            aria-disabled={locked || undefined}
            onClick={() => {
              if (locked) return;
              if (candidate === "test") openTest();
              else if (candidate === "solutions") openSolutions();
              else {
                setArea(candidate);
                setMenu(false);
              }
            }}
            className={`text-right font-semibold transition ${area === candidate ? "text-slate-900" : "text-slate-600 hover:text-slate-900"} ${locked ? "opacity-60" : ""}`}
          >
            {AREA_LABEL_36[candidate]}
            {locked ? <span className="ml-1" aria-hidden>🔒</span> : null}
            {locked ? <span className="sr-only"> (تُفتح بعد تسليم الاختبار أو دخول المعلم)</span> : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <Lesson1Shell
      rootDir="rtl"
      rootDataLesson={36}
      rootDataShell="lesson-1"
      railTitle="الدرس 36 · WILL vs BE GOING TO"
      railSubtitle={<En className="text-xs font-semibold text-slate-400">{LESSON_SUBTITLE_36}</En>}
      itemTitleClassName="min-w-0 truncate"
      groups={groups}
      activeIndex={area === "lesson" ? index : -1}
      onSelectStep={goToStep}
      onExit={onExit}
      railFooter={railFooter}
      railAriaLabel="فهرس خطوات الدرس 36"
      markActiveStep
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      headerContent={area === "lesson" ? `${stage.label} · ${slide.title}` : AREA_LABEL_36[area]}
      progress={progress}
      counter={area === "lesson" ? `${index + 1} / ${STEP_COUNT_36}` : `${SLIDES_36.length} خطوة`}
      counterDir="ltr"
      mainId="l36-main"
      mainRef={mainRef}
      contentKey={`${area}-${area === "lesson" ? slide.id : "panel"}`}
      contentArea={area === "lesson" ? "l36-lesson" : `l36-${area}`}
      showStepContent={area !== "test"}
      mainAfter={
        testVisited ? (
          <div hidden={area !== "test"} className="pop mx-auto max-w-4xl" data-area="l36-test">
            <Suspense fallback={<PanelLoading label="جارٍ فتح الاختبار…" />}>
              <TestArea36
                onSubmitted={() => setTestSubmitted(true)}
                onGoSolutions={openSolutions}
              />
            </Suspense>
          </div>
        ) : null
      }
      onPrev={area === "lesson" ? goPrev : () => setArea("lesson")}
      onNext={goNext}
      prevDisabled={area === "lesson" && index === 0}
      nextDisabled={last}
      showNext={area === "lesson"}
      prevLabel={area === "lesson" ? "→ السابق" : "← العودة إلى الدرس"}
      navAriaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 36" : "العودة من منطقة الدرس 36"}
    >
      {area === "lesson" ? <StepView36 slide={slide} index={index} onGoTest={openTest} onGoSolutions={openSolutions} /> : null}
      {area === "solutions" ? (
        <Suspense fallback={<PanelLoading label="جارٍ تحميل الحلول التفصيلية…" />}>
          <SolutionsArea36 unlocked={solutionsUnlocked} onGoTest={openTest} onGoTeacher={() => setArea("teacher")} />
        </Suspense>
      ) : null}
      {area === "teacher" ? (
        <Suspense fallback={<PanelLoading label="جارٍ فتح منطقة المعلم…" />}>
          <TeacherArea36
            unlocked={teacherUnlocked}
            onUnlockChange={setTeacherUnlocked}
            onGoSolutions={openSolutions}
          />
        </Suspense>
      ) : null}
    </Lesson1Shell>
  );
}

function PanelLoading({ label }: { label: string }) {
  return (
    <div role="status" className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600">
      {label}
    </div>
  );
}
