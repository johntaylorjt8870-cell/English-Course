import "./lesson39.css";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { En, Rich } from "../../shared/lessonKit";
import {
  LESSON_ARABIC_SUBTITLE_39,
  LESSON_SUBTITLE_39,
  SLIDES_39,
  STATIONS_39,
  STEP_COUNT_39,
  stationOf39,
  type Area39,
} from "./data";
import StepView39 from "./Steps39";

const TestArea39 = lazy(() => import("./TestArea39"));
const SolutionsArea39 = lazy(() => import("./SolutionsArea39"));
const TeacherArea39 = lazy(() => import("./TeacherArea39"));

const AREA_LABEL_39: Record<Area39, string> = {
  lesson: "منطقة الطالب",
  test: "منطقة الاختبار",
  solutions: "منطقة الحلول",
  teacher: "منطقة المعلم",
};

const AREA_ICON_39: Record<Area39, string> = {
  lesson: "🛰️",
  test: "🏆",
  solutions: "📘",
  teacher: "🔐",
};

const AREAS_39: Area39[] = ["lesson", "test", "solutions", "teacher"];

/**
 * الدرس 39 — Future Perfect Continuous داخل «مرصد الزمن المستقبلي».
 *
 * الهيكل الحقيقي مشترك: هذا الملف لا يرسم قائمة جانبية ولا شريط تنقل ولا
 * زر قفل موقع، بل يسلّمها كلها إلى `Lesson1Shell` (نفس عقد الدرسين 37 و38).
 * الهوية تبقى محلية: محطات المرصد، ولوحة الأدوات، وخطوات القراءة.
 */
export default function Lesson39({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area39>("lesson");
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [testVisited, setTestVisited] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const slide = SLIDES_39[index];
  const station = stationOf39(slide.station);
  const last = index === STEP_COUNT_39 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const progress = area === "lesson" ? ((index + 1) / STEP_COUNT_39) * 100 : 100;

  useEffect(() => {
    mainRef.current?.scrollTo?.({ top: 0, behavior: "auto" });
  }, [index, area]);

  const goPrev = useCallback(() => setIndex((current) => Math.max(0, current - 1)), []);
  const goNext = useCallback(() => setIndex((current) => Math.min(STEP_COUNT_39 - 1, current + 1)), []);

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
      else if (event.key === "End") setIndex(STEP_COUNT_39 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area, goNext, goPrev, menu]);

  const goToStep = (target: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_39 - 1, target)));
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
  const openArea = (target: Area39) => {
    if (target === "test") openTest();
    else if (target === "solutions") openSolutions();
    else {
      setArea(target);
      setMenu(false);
    }
  };

  const groups = useMemo<Lesson1ShellGroup[]>(
    () =>
      STATIONS_39.map((item) => ({
        section: `${item.icon} ${item.title}`,
        items: item.stepIds.map((id) => {
          const stepIndex = SLIDES_39.findIndex((candidate) => candidate.id === id);
          const step = SLIDES_39[stepIndex];
          return {
            index: stepIndex,
            title: <Rich text={step.rail} />,
            navId: step.id,
            mascot: undefined,
          };
        }),
      })),
    [],
  );

  const railFooter = (
    <div className="mt-2 grid gap-1.5" role="group" aria-label="مناطق الدرس 39">
      {AREAS_39.map((candidate) => {
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
              area === candidate
                ? "bg-[#132a4d] text-white shadow"
                : "text-[#a9bcdd] hover:bg-[#16243d] hover:text-[#eaf1ff]"
            }`}
          >
            <span aria-hidden className="text-sm">
              {AREA_ICON_39[candidate]}
            </span>
            <span className="min-w-0 truncate">{AREA_LABEL_39[candidate]}</span>
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
      rootDataLesson={39}
      rootDataShell="lesson-1"
      rootClassName="obs39 style-b font-body relative flex h-screen flex-col overflow-hidden"
      railTitle="الدرس 39 · Future Perfect Continuous"
      railSubtitle={
        <div className="mt-1 space-y-1">
          <En className="block text-xs font-semibold text-[#9fb3d6]">{LESSON_SUBTITLE_39}</En>
          <p className="text-xs font-bold leading-5 text-[#dbe7ff]">{LESSON_ARABIC_SUBTITLE_39}</p>
          <p className="text-[11px] font-semibold leading-5 text-[#93a6c9]">
            مرصد الزمن المستقبلي · {STEP_COUNT_39} خطوة قصيرة · 25 سؤالًا
          </p>
        </div>
      }
      itemTitleClassName="min-w-0 truncate"
      groups={groups}
      activeIndex={area === "lesson" ? index : -1}
      onSelectStep={goToStep}
      onExit={onExit}
      railFooter={railFooter}
      railAriaLabel="فهرس خطوات الدرس 39"
      markActiveStep
      isMenuOpen={menu}
      onMenuOpenChange={setMenu}
      headerContent={
        area === "lesson" ? (
          <span className="flex min-w-0 items-center gap-2 text-[#dbe7ff]">
            <span aria-hidden>{station.icon}</span>
            <span className="truncate font-black">
              <Rich text={station.title} />
            </span>
            <span className="hidden shrink-0 text-[11px] font-semibold text-[#93a6c9] sm:inline">
              <En>{station.en}</En>
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-2 text-[#dbe7ff]">
            <span aria-hidden>{AREA_ICON_39[area]}</span>
            <span className="truncate font-black">{AREA_LABEL_39[area]}</span>
          </span>
        )
      }
      progress={progress}
      counter={
        area === "lesson" ? `${index + 1} / ${STEP_COUNT_39}` : <span className="text-xs">{AREA_LABEL_39[area]}</span>
      }
      counterDir="ltr"
      mainId="l39-main"
      mainRef={mainRef}
      contentKey={`${area}-${area === "lesson" ? slide.id : "panel"}`}
      contentArea={area === "lesson" ? "lesson39-student" : `lesson39-${area}`}
      showStepContent={area !== "test"}
      mainAfter={
        testVisited ? (
          <div hidden={area !== "test"} className="pop mx-auto max-w-4xl" data-area="lesson39-test">
            <Suspense fallback={<PanelLoading39 label="جارٍ فتح الاختبار…" />}>
              <TestArea39 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={openSolutions} />
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
      navAriaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 39" : "العودة من منطقة الدرس 39"}
    >
      {area === "lesson" ? (
        <StepView39
          slide={slide}
          onGoTest={openTest}
          onGoSolutions={openSolutions}
          onGoTeacher={() => setArea("teacher")}
        />
      ) : null}
      {area === "solutions" ? (
        solutionsUnlocked ? (
          <Suspense fallback={<PanelLoading39 label="جارٍ تحميل الحلول التفصيلية…" />}>
            <SolutionsArea39 unlocked onGoTest={openTest} onGoTeacher={() => setArea("teacher")} />
          </Suspense>
        ) : (
          <SolutionsGate39 onGoTest={openTest} onGoTeacher={() => setArea("teacher")} />
        )
      ) : null}
      {area === "teacher" ? (
        <Suspense fallback={<PanelLoading39 label="جارٍ فتح منطقة المعلم…" />}>
          <TeacherArea39
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
 * حتى لا تُحمَّل `solutionsData39` لمن يفتح المنطقة قبل التسليم.
 */
function SolutionsGate39({ onGoTest, onGoTeacher }: { onGoTest: () => void; onGoTeacher: () => void }) {
  return (
    <div
      data-area="lesson39-solutions"
      data-solutions-locked="true"
      className="obs-panel"
    >
      <p className="obs-eyebrow">Solutions Area</p>
      <h2 className="obs-panel-title">منطقة الحلول مقفلة</h2>
      <p className="obs-nuance leading-7">
        لا تظهر أي إجابة أو تفسير للاختبار قبل تسليمه. أكمل الأسئلة الـ25 ثم أرسلها لفتح الحلول، أو ادخل بكلمة مرور
        المعلم من منطقة المعلم.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={onGoTest} className="obs-btn obs-btn--primary">
          العودة إلى الاختبار
        </button>
        <button type="button" onClick={onGoTeacher} className="obs-btn obs-btn--secondary">
          منطقة المعلم
        </button>
      </div>
    </div>
  );
}

function PanelLoading39({ label }: { label: string }) {
  return (
    <div role="status" className="obs-panel text-sm font-bold text-[#dbe6ff]">
      {label}
    </div>
  );
}
