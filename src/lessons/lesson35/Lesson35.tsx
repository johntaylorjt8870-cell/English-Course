import "./lesson35.css";
import { cloneElement, isValidElement, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { En } from "../../shared/lessonKit";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import {
  LESSON_SUBTITLE_35,
  SLIDES_35,
  SLIDE_COUNT_35,
  STAGES_35,
} from "./data";
import StepView35 from "./Steps35";
const TestArea35 = lazy(() => import("./TestArea35"));
const SolutionsArea35 = lazy(() => import("./SolutionsArea35"));
const TeacherArea35 = lazy(() => import("./TeacherArea35"));
type Area35 = "lesson" | "test" | "solutions" | "teacher";

const AREA_LABEL_35: Record<Area35, string> = {
  lesson: "خطوات الدرس",
  test: "منطقة الاختبار",
  solutions: "منطقة الحلول",
  teacher: "منطقة المعلم",
};

export default function Lesson35({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area35>("lesson");
  const [index, setIndex] = useState(0);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testVisited, setTestVisited] = useState(false);
  const [menu, setMenu] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const step = SLIDES_35[index];
  const total = SLIDE_COUNT_35;
  const isLast = index === total - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const stage = STAGES_35.find((candidate) => candidate.id === step.stage)!;
  const progress = ((index + 1) / total) * 100;

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [index, area]);

  const goPrev = useCallback(() => setIndex((current) => Math.max(0, current - 1)), []);
  const goNext = useCallback(() => setIndex((current) => Math.min(total - 1, current + 1)), [total]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (menu && event.key === "Escape") {
        setMenu(false);
        return;
      }
      if (area !== "lesson" || menu) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft" || event.key === " ") goNext();
      else if (event.key === "ArrowRight") goPrev();
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(total - 1);
      else return;
      if (event.key === " ") event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area, goNext, goPrev, menu, total]);

  const goToStep = (target: number) => {
    setIndex(target);
    setArea("lesson");
    setMenu(false);
  };
  const openTest = () => {
    setTestVisited(true);
    setArea("test");
    setMenu(false);
  };

  const groups = useMemo<Lesson1ShellGroup[]>(() => STAGES_35.map((group) => ({
    section: group.ar,
    items: SLIDES_35.flatMap((candidate, idx) => candidate.stage === group.id
      ? [{ index: idx, title: candidate.title, mascot: group.icon, navId: candidate.id }]
      : []),
  })), []);

  const railFooter = (
    <div className="mt-2 grid gap-1.5">
      <button type="button" data-area-tab="lesson" onClick={() => { setArea("lesson"); setMenu(false); }} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">خطوات الدرس</button>
      <button type="button" data-area-tab="test" onClick={openTest} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">منطقة الاختبار</button>
      <button type="button" data-area-tab="solutions" onClick={() => { setArea("solutions"); setMenu(false); }} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">منطقة الحلول {solutionsUnlocked ? "" : "🔒"}</button>
      <button type="button" data-area-tab="teacher" onClick={() => { setArea("teacher"); setMenu(false); }} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">منطقة المعلم</button>
    </div>
  );

  const content = area === "lesson" ? (
    <StepView35 slide={step} index={index} onGoTest={openTest} onGoSolutions={() => setArea("solutions")} />
  ) : area === "solutions" ? (
    <SolutionsArea35 unlocked={solutionsUnlocked} onGoTest={openTest} onGoTeacher={() => setArea("teacher")} />
  ) : area === "teacher" ? (
    <TeacherArea35 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
  ) : null;

  const headerTitle = area === "lesson" ? `${step.title} · ${stage.ar}` : AREA_LABEL_35[area];
  const contentAreaName = area === "lesson" ? "l35-lesson" : `l35-${area}`;

  return (
    <Lesson1Shell
      rootClassName="fg35-app style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800"
      rootDir="rtl"
      rootDataLesson={35}
      rootDataShell="lesson-1"
      railTitle="الدرس 35 · BE GOING TO"
      railSubtitle={<En className="text-xs font-semibold text-slate-400">{LESSON_SUBTITLE_35}</En>}
      itemTitleClassName="min-w-0 truncate"
      groups={groups}
      activeIndex={area === "lesson" ? index : -1}
      onSelectStep={goToStep}
      onExit={onExit}
      railFooter={railFooter}
      railAriaLabel="فهرس خطوات الدرس 35"
      markActiveStep
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      headerContent={area === "lesson" ? `${stage.id} · ${headerTitle}` : headerTitle}
      progress={area === "lesson" ? progress : 100}
      counter={area === "lesson" ? `${index + 1} / ${total}` : AREA_LABEL_35[area]}
      counterDir="ltr"
      mainId="l35-main"
      mainRef={mainRef}
      contentKey={`${area}-${step.id}`}
      contentArea={contentAreaName}
      showStepContent={area !== "test"}
      mainAfter={testVisited ? (
        <div hidden={area !== "test"} className="pop mx-auto max-w-4xl" data-area="l35-test">
          <Suspense fallback={<div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600" role="status">جارٍ فتح الاختبار…</div>}>
            <TestArea35 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
          </Suspense>
        </div>
      ) : null}
      onPrev={area === "lesson" ? goPrev : () => setArea("lesson")}
      onNext={goNext}
      prevDisabled={area === "lesson" && index === 0}
      nextDisabled={isLast}
      showNext={area === "lesson"}
      prevLabel={area === "lesson" ? "→ السابق" : "← العودة إلى الدرس"}
      navAriaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 35" : "العودة من منطقة الدرس 35"}
    >
      <Suspense fallback={<div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600" role="status">جارٍ فتح المنطقة…</div>}>
        <StudentCopy35>{content}</StudentCopy35>
      </Suspense>
      {isLast ? (
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm" data-course-check-slot>
          <h3 className="font-head text-lg font-bold text-slate-900">اختبار إضافي للمنصة</h3>
          <p className="mt-2 text-slate-600">يبقى التقييم المشترك للمنصة كما هو؛ أما الاختبار الأساسي لهذا الدرس فيتكوّن من 25 سؤالًا.</p>
          <FinalTest lesson={35} questions={FINAL_TESTS[35]} accent="bg-slate-900" onGoTeacher={() => setArea("teacher")} />
        </section>
      ) : null}
    </Lesson1Shell>
  );
}

/** Removes only internal provenance markers from student-rendered copy. */
function StudentCopy35({ children }: { children: ReactNode }) {
  const clean = (value: ReactNode): ReactNode => {
    if (typeof value === "string") {
      return value
        .replace(/من المصدر\s*[·:–—-]?\s*/g, "")
        .replace(/نص المصدر\s*[·:–—-]?\s*/g, "النص ")
        .replace(/المصدر\s*§\s*\d+/g, "")
        .replace(/§\s*\d+/g, "")
        .replace(/مفتاح المصدر/g, "الإجابة")
        .replace(/نص المصدر/g, "النص")
        .replace(/\s+·\s*(?=·|$)/g, "")
        .replace(/\s{2,}/g, " ");
    }
    if (Array.isArray(value)) return value.map((child) => clean(child));
    if (isValidElement<{ children?: ReactNode }>(value)) {
      if (value.props.children === undefined) return value;
      return cloneElement(value, undefined, clean(value.props.children));
    }
    return value;
  };
  return <>{clean(children)}</>;
}
