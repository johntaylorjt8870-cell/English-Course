import "./lesson38.css";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { En } from "../../shared/lessonKit";
import {
  CHAPTERS_38,
  chapterOf38,
  LESSON_ARABIC_SUBTITLE_38,
  LESSON_SUBTITLE_38,
  SLIDES_38,
  STEP_COUNT_38,
  type Area38,
} from "./data";
import StepView38 from "./Steps38";

const TestArea38 = lazy(() => import("./TestArea38"));
const SolutionsArea38 = lazy(() => import("./SolutionsArea38"));
const TeacherArea38 = lazy(() => import("./TeacherArea38"));

const AREA_LABEL_38: Record<Area38, string> = {
  lesson: "منطقة الطالب",
  test: "منطقة الاختبار",
  solutions: "منطقة الحلول",
  teacher: "منطقة المعلم",
};

const AREA_ICON_38: Record<Area38, string> = {
  lesson: "🔭",
  test: "🏆",
  solutions: "📘",
  teacher: "🔐",
};

const AREAS_38: Area38[] = ["lesson", "test", "solutions", "teacher"];

/**
 * الدرس 38 — Future Perfect داخل «مرصد الإنجاز المستقبلي».
 *
 * الهيكل الحقيقي مشترك: هذا الملف لا يرسم قائمة جانبية ولا شريط تنقل ولا
 * زر قفل موقع، بل يسلّمها كلها إلى `Lesson1Shell` (نفس عقد الدرسين 1 و37).
 * هوية الدرس تبقى محلية: محطات الإنجاز، ألوان المرصد، والأنشطة.
 */
export default function Lesson38({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area38>("lesson");
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [testVisited, setTestVisited] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const slide = SLIDES_38[index];
  const chapter = chapterOf38(slide.section);
  const last = index === STEP_COUNT_38 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const progress = area === "lesson" ? ((index + 1) / STEP_COUNT_38) * 100 : 100;

  useEffect(() => {
    mainRef.current?.scrollTo?.({ top: 0, behavior: "auto" });
  }, [index, area]);

  const goPrev = useCallback(() => setIndex((current) => Math.max(0, current - 1)), []);
  const goNext = useCallback(() => setIndex((current) => Math.min(STEP_COUNT_38 - 1, current + 1)), []);

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
        if (target?.closest?.("button, a, summary, [role='button'], [role='radio'], [role='checkbox']")) return;
        event.preventDefault();
        goNext();
        return;
      }
      if (event.key === "ArrowLeft") goNext();
      else if (event.key === "ArrowRight") goPrev();
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(STEP_COUNT_38 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area, goNext, goPrev, menu]);

  const goToStep = (target: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_38 - 1, target)));
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
  const openArea = (target: Area38) => {
    if (target === "test") openTest();
    else if (target === "solutions") openSolutions();
    else {
      setArea(target);
      setMenu(false);
    }
  };

  const groups = useMemo<Lesson1ShellGroup[]>(
    () =>
      CHAPTERS_38.map((item) => ({
        section: `${item.icon} ${item.title}`,
        items: item.stepIds.map((id) => {
          const stepIndex = SLIDES_38.findIndex((candidate) => candidate.id === id);
          const step = SLIDES_38[stepIndex];
          return {
            index: stepIndex,
            title: step.rail,
            navId: step.id,
            mascot: undefined,
          };
        }),
      })),
    [],
  );

  const railFooter = (
    <div className="mt-2 grid gap-1.5" role="group" aria-label="مناطق الدرس 38">
      {AREAS_38.map((candidate) => {
        const locked = candidate === "solutions" && !solutionsUnlocked;
        return (
          <button
            key={candidate}
            type="button"
            data-area-tab={candidate}
            aria-pressed={area === candidate}
            aria-disabled={locked || undefined}
            onClick={() => openArea(candidate)}
            className={`flex min-h-9 items-center gap-2 rounded-lg px-2 py-1.5 text-right font-semibold transition ${
              area === candidate ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span aria-hidden className="text-sm">
              {AREA_ICON_38[candidate]}
            </span>
            <span className="min-w-0 truncate">{AREA_LABEL_38[candidate]}</span>
            {candidate === "test" && testSubmitted ? (
              <span aria-hidden className="mr-auto text-[11px]">
                ✓
              </span>
            ) : null}
            {locked ? (
              <>
                <span aria-hidden className="mr-auto text-[11px]">
                  🔒
                </span>
                <span className="sr-only"> (تُفتح بعد تسليم الاختبار أو دخول المعلم)</span>
              </>
            ) : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <Lesson1Shell
      rootDir="rtl"
      rootDataLesson={38}
      rootDataShell="lesson-1"
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f3eee1] text-[#1a2433] fao38-shell"
      railTitle="الدرس 38 · Future Perfect"
      railSubtitle={
        <div className="mt-1 space-y-1">
          <En className="block text-xs font-semibold text-[#3d4a5c]">{LESSON_SUBTITLE_38}</En>
          <p className="text-xs font-bold leading-5 text-[#1b3a5c]">{LESSON_ARABIC_SUBTITLE_38}</p>
          <p className="text-[11px] font-semibold leading-5 text-[#4a5568]">
            مرصد الإنجاز المستقبلي · {STEP_COUNT_38} خطوة قصيرة · 25 سؤالًا
          </p>
        </div>
      }
      itemTitleClassName="min-w-0 truncate"
      groups={groups}
      activeIndex={area === "lesson" ? index : -1}
      onSelectStep={goToStep}
      onExit={onExit}
      railFooter={railFooter}
      railAriaLabel="فهرس خطوات الدرس 38"
      markActiveStep
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      headerContent={
        area === "lesson" ? (
          <span className="flex min-w-0 items-center gap-2 text-[#122033]">
            <span aria-hidden>{chapter.icon}</span>
            <span className="truncate font-black">{chapter.title}</span>
            <span className="hidden shrink-0 text-[11px] font-semibold text-[#3d4a5c] sm:inline">
              <En>{chapter.en}</En>
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-2 text-[#122033]">
            <span aria-hidden>{AREA_ICON_38[area]}</span>
            <span className="truncate font-black">{AREA_LABEL_38[area]}</span>
          </span>
        )
      }
      progress={progress}
      counter={
        area === "lesson" ? (
          `${index + 1} / ${STEP_COUNT_38}`
        ) : (
          <span className="text-xs">{AREA_LABEL_38[area]}</span>
        )
      }
      counterDir="ltr"
      mainId="l38-main"
      mainRef={mainRef}
      contentKey={`${area}-${area === "lesson" ? slide.id : "panel"}`}
      contentArea={area === "lesson" ? "lesson38-student" : `lesson38-${area}`}
      showStepContent={area !== "test"}
      mainAfter={
        testVisited ? (
          <div hidden={area !== "test"} className="pop mx-auto max-w-4xl" data-area="lesson38-test">
            <Suspense fallback={<PanelLoading38 label="جارٍ فتح الاختبار…" />}>
              <TestArea38 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={openSolutions} />
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
      navAriaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 38" : "العودة من منطقة الدرس 38"}
    >
      {area === "lesson" ? (
        <StepView38 slide={slide} onGoTest={openTest} onGoSolutions={openSolutions} />
      ) : null}
      {area === "solutions" ? (
        solutionsUnlocked ? (
          <Suspense fallback={<PanelLoading38 label="جارٍ تحميل الحلول التفصيلية…" />}>
            <SolutionsArea38 unlocked onGoTest={openTest} onGoTeacher={() => setArea("teacher")} />
          </Suspense>
        ) : (
          <SolutionsGate38 onGoTest={openTest} />
        )
      ) : null}
      {area === "teacher" ? (
        <Suspense fallback={<PanelLoading38 label="جارٍ فتح منطقة المعلم…" />}>
          <TeacherArea38
            unlocked={teacherUnlocked}
            onUnlockChange={setTeacherUnlocked}
            onGoSolutions={openSolutions}
          />
        </Suspense>
      ) : null}
    </Lesson1Shell>
  );
}

/**
 * بوابة الحلول المقفلة — مكوّن محلي لا يستورد المفتاح ولا يفتح حزمة الحلول،
 * حتى لا يُحمَّل `solutionsData38` لمن يضغط الزر قبل التسليم.
 */
function SolutionsGate38({ onGoTest }: { onGoTest: () => void }) {
  return (
    <div data-area="lesson38-solutions" data-solutions-locked="true" className="rounded-3xl border border-[#d4c4a0] bg-white p-5">
      <p className="text-xs font-black uppercase tracking-[.14em] text-[#1b3a5c]">Solutions Area</p>
      <h2 className="mt-1 text-xl font-black text-[#122033]">منطقة الحلول مقفلة</h2>
      <p className="mt-2 text-sm leading-7 text-[#1a2433]">
        لا تظهر أي إجابة أو تفسير للاختبار قبل تسليمه. أكمل الأسئلة الـ25 ثم أرسلها لفتح الحلول، أو ادخل بكلمة مرور المعلم من منطقة المعلم.
      </p>
      <button
        type="button"
        onClick={onGoTest}
        className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1b3a5c] bg-[#1b3a5c] px-4 py-2.5 text-sm font-black text-white transition-colors hover:bg-[#152e4a] motion-reduce:transition-none"
      >
        العودة إلى الاختبار
      </button>
    </div>
  );
}

function PanelLoading38({ label }: { label: string }) {
  return (
    <div role="status" className="rounded-3xl border border-[#d4c4a0] bg-white p-5 text-sm font-bold text-[#1b3a5c]">
      {label}
    </div>
  );
}
