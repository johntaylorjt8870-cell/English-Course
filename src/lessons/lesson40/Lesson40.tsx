import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  LESSON_40_META,
  SLIDES_40,
  STATIONS_40,
  STATION_BY_ID_40,
  STEP_COUNT_40,
} from "./data";
import { Rich40 } from "./kit40";
import "./lesson40.css";
import { StepView40 } from "./Steps40";
import type { GradeSummary40 } from "./testKey40";

const TestArea40 = lazy(() => import("./TestArea40"));
const SolutionsArea40 = lazy(() => import("./SolutionsArea40"));
const TeacherArea40 = lazy(() => import("./TeacherArea40"));

export type Lesson40Area = "lesson" | "test" | "solutions" | "teacher";

function SolutionsGate40({
  onOpenTest,
  onOpenTeacher,
  onBackToLesson,
}: {
  onOpenTest: () => void;
  onOpenTeacher: () => void;
  onBackToLesson: () => void;
}) {
  return (
    <section
      className="tcc-brief max-w-2xl"
      data-solutions-locked="true"
      aria-label="منطقة الحلول مقفلة قبل التسليم"
    >
      <div className="tcc-badges mb-3">
        <span dir="ltr" className="tcc-coord font-en">
          SOLUTIONS // LOCKED
        </span>
        <span className="tcc-station-tag">محجوبة قبل تسليم الاختبار</span>
      </div>
      <h1 className="tcc-title">
        الحلول التفصيلية تُفتح بعد تسليم الاختبار النهائي الشامل
      </h1>
      <p className="tcc-purpose">
        للحفاظ على مصداقية التقييم الذاتي في الأسئلة الخمسة والعشرين، تبقى مفاتيح الإجابة والشروح التفصيلية محجوبة حتى تسلّم محاولتك كاملة في منطقة الاختبار، أو عبر دخول المعلم برمزه المعتمد.
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button type="button" className="tcc-btn-primary" onClick={onOpenTest}>
          الانتقال إلى منطقة الاختبار (25 سؤالًا)
        </button>
        <button type="button" className="tcc-btn-secondary" onClick={onOpenTeacher}>
          دخول المعلم
        </button>
        <button type="button" className="tcc-btn-secondary" onClick={onBackToLesson}>
          العودة إلى خطوات الدرس
        </button>
      </div>
    </section>
  );
}

export default function Lesson40({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState<Lesson40Area>("lesson");
  const [menuOpen, setMenuOpen] = useState(false);

  const [testSubmitted, setTestSubmitted] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<
    Readonly<Record<string, string>>
  >({});
  const [gradeSummary, setGradeSummary] = useState<GradeSummary40 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);

  const mainRef = useRef<HTMLElement | null>(null);
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  const scrollMainTop = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(STEP_COUNT_40 - 1, idx));
      setArea("lesson");
      setStep(clamped);
      setMenuOpen(false);
      scrollMainTop();
    },
    [scrollMainTop]
  );

  const switchArea = useCallback(
    (nextArea: Lesson40Area) => {
      setArea(nextArea);
      setMenuOpen(false);
      scrollMainTop();
    },
    [scrollMainTop]
  );

  const prev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
    scrollMainTop();
  }, [scrollMainTop]);

  const next = useCallback(() => {
    setStep((s) => Math.min(STEP_COUNT_40 - 1, s + 1));
    scrollMainTop();
  }, [scrollMainTop]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const inField =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        Boolean(target?.isContentEditable);

      if (e.key === "Escape") {
        if (menuOpen) setMenuOpen(false);
        else if (area !== "lesson") switchArea("lesson");
        return;
      }

      if (inField || area !== "lesson") return;

      if (e.key === "ArrowLeft" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(STEP_COUNT_40 - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area, goTo, menuOpen, next, prev, switchArea]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_40.map((station) => ({
        section: station.title,
        items: SLIDES_40.map((s, idx) => ({ s, idx }))
          .filter(({ s }) => s.station === station.id)
          .map(({ s, idx }) => ({
            index: idx,
            navId: s.id,
            title: <Rich40 text={s.rail} />,
          })),
      })).filter((g) => g.items.length > 0),
    []
  );

  const areaButtons: ReadonlyArray<{
    id: Lesson40Area;
    label: string;
    badge: string;
    locked?: boolean;
  }> = [
    { id: "lesson", label: "منطقة الطالب", badge: `${STEP_COUNT_40}` },
    { id: "test", label: "منطقة الاختبار", badge: "25" },
    {
      id: "solutions",
      label: "منطقة الحلول",
      badge: solutionsUnlocked ? "✓" : "مقفل",
      locked: !solutionsUnlocked,
    },
    {
      id: "teacher",
      label: "مساحة المعلم",
      badge: teacherUnlocked ? "✓" : "دليل",
    },
  ];

  const renderAreaSwitcher = (ariaLabel: string, extraClass = "") => (
    <div
      className={`tcc-area-switcher ${extraClass}`.trim()}
      role="group"
      aria-label={ariaLabel}
    >
      {areaButtons.map((btn) => {
        const active = area === btn.id;
        return (
          <button
            key={btn.id}
            type="button"
            data-area-tab={btn.id}
            disabled={btn.locked}
            aria-pressed={active}
            aria-disabled={btn.locked || undefined}
            className={`tcc-area-btn ${active ? "is-active" : ""} ${
              btn.locked ? "is-locked" : ""
            }`.trim()}
            onClick={() => {
              if (!btn.locked) switchArea(btn.id);
            }}
          >
            <span>{btn.label}</span>
            <span className="tcc-area-pill" aria-hidden="true">
              {btn.badge}
            </span>
          </button>
        );
      })}
    </div>
  );

  const railFooter = renderAreaSwitcher("مساحات الدرس 40", "mt-2.5");

  const slide = SLIDES_40[step] ?? SLIDES_40[0]!;
  const currentStation = STATION_BY_ID_40[slide.station];

  const headerContent =
    area === "lesson" ? (
      <Rich40 text={`${currentStation.title} · ${slide.rail}`} />
    ) : area === "test" ? (
      <Rich40 text="الاختبار النهائي الشامل · 25 سؤالًا عبر 5 مستويات" />
    ) : area === "solutions" ? (
      <Rich40 text="منطقة الحلول التفصيلية" />
    ) : (
      <Rich40 text="مساحة المعلم · الدليل التدريسي وسجل التغطية" />
    );

  const progress =
    area === "lesson" ? Math.round(((step + 1) / STEP_COUNT_40) * 100) : 100;

  const counter =
    area === "lesson"
      ? `${step + 1} / ${STEP_COUNT_40}`
      : area === "test"
        ? "25 Q"
        : area === "solutions"
          ? "KEY"
          : "TCHR";

  return (
    <Lesson1Shell
      railTitle={<Rich40 text="الدرس 40 · Future Tenses Master Review" />}
      railSubtitle={
        <div className="mt-2 tcc-rail-meta">
          <span className="tcc-rail-kicker">
            <Rich40 text={LESSON_40_META.themeAr} />
          </span>
          <span className="tcc-rail-ar">
            <Rich40 text={LESSON_40_META.titleAr} />
          </span>
          <span className="tcc-rail-sub">
            <Rich40
              text={`${STEP_COUNT_40} خطوة تفاعلية · اختبار 25 سؤالًا · ${LESSON_40_META.levelAr}`}
            />
          </span>
        </div>
      }
      groups={groups}
      activeIndex={area === "lesson" ? step : -1}
      markActiveStep={area === "lesson"}
      railAriaLabel="فهرس محطات الدرس 40"
      railFooter={railFooter}
      isMenuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      headerContent={headerContent}
      progress={progress}
      counter={counter}
      counterDir="ltr"
      contentKey={area === "lesson" ? slide.id : area}
      contentArea={area}
      onSelectStep={goTo}
      onPrev={area === "lesson" ? prev : () => switchArea("lesson")}
      onNext={next}
      showNext={area === "lesson"}
      prevDisabled={area === "lesson" ? step === 0 : false}
      nextDisabled={step === STEP_COUNT_40 - 1}
      prevLabel={area === "lesson" ? "→ السابق" : "→ العودة إلى خطوات الدرس"}
      nextLabel="التالي ←"
      navAriaLabel="التنقل في الدرس 40"
      onExit={onExit}
      mainRef={mainRef}
      mainId="l40-main"
      rootDir="rtl"
      rootDataLesson={40}
      rootDataShell="lesson-1"
      rootClassName="tcc40 style-b font-body relative flex h-screen flex-col overflow-hidden"
    >
      <div className="mb-3 lg:hidden">
        {renderAreaSwitcher("مساحات الدرس 40 على الشاشات الصغيرة")}
      </div>

      {area === "lesson" ? (
        <StepView40
          slide={slide}
          stepIndex={step}
          onSelectStep={goTo}
          onOpenTest={() => switchArea("test")}
          onOpenSolutions={() => switchArea("solutions")}
          onOpenTeacher={() => switchArea("teacher")}
          testSubmitted={testSubmitted}
          teacherUnlocked={teacherUnlocked}
        />
      ) : null}

      {area === "test" ? (
        <Suspense
          fallback={
            <div className="tcc-brief text-sm font-bold text-slate-800">
              جاري تجهيز الاختبار النهائي الشامل...
            </div>
          }
        >
          <TestArea40
            submitted={testSubmitted}
            submittedAnswers={submittedAnswers}
            gradeSummary={gradeSummary}
            onSubmitted={(frozen, summary) => {
              setSubmittedAnswers(frozen);
              setGradeSummary(summary);
              setTestSubmitted(true);
            }}
            onResetAttempt={() => {
              setSubmittedAnswers({});
              setGradeSummary(null);
              setTestSubmitted(false);
            }}
            onOpenSolutions={() => switchArea("solutions")}
            onBackToLesson={() => switchArea("lesson")}
          />
        </Suspense>
      ) : null}

      {area === "solutions" ? (
        solutionsUnlocked ? (
          <Suspense
            fallback={
              <div className="tcc-brief text-sm font-bold text-slate-800">
                جاري فتح الحلول التفصيلية...
              </div>
            }
          >
            <SolutionsArea40
              submittedAnswers={submittedAnswers}
              unlockedBy={testSubmitted ? "submission" : "teacher"}
              onBackToTest={() => switchArea("test")}
              onBackToLesson={() => switchArea("lesson")}
            />
          </Suspense>
        ) : (
          <SolutionsGate40
            onOpenTest={() => switchArea("test")}
            onOpenTeacher={() => switchArea("teacher")}
            onBackToLesson={() => switchArea("lesson")}
          />
        )
      ) : null}

      {area === "teacher" ? (
        <Suspense
          fallback={
            <div className="tcc-brief text-sm font-bold text-slate-800">
              جاري تحميل بوابة المعلم...
            </div>
          }
        >
          <TeacherArea40
            unlocked={teacherUnlocked}
            onUnlock={() => setTeacherUnlocked(true)}
            onLock={() => setTeacherUnlocked(false)}
            onOpenSolutions={() => switchArea("solutions")}
            onBackToLesson={() => switchArea("lesson")}
          />
        </Suspense>
      ) : null}
    </Lesson1Shell>
  );
}
