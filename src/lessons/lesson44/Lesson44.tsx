import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  LESSON_IDENTITY_AR_44,
  LESSON_STEP_COUNT_44,
  LESSON_SUBTITLE_44,
  LESSON_TITLE_44,
  STATIONS_44,
  STEP_DESCRIPTORS_44,
  station44,
} from "./data";
import { Glyph44, Text44, Workspace44 } from "./kit44";
import { Steps44 } from "./Steps44";
import type { TestAnswers44 } from "./testData44";
import type { TestGradeReport44 } from "./testKey44";
import "./lesson44.css";

const TestArea44 = lazy(() => import("./TestArea44"));
const SolutionsArea44 = lazy(() => import("./SolutionsArea44"));
const TeacherArea44 = lazy(() => import("./TeacherArea44"));

export type Lesson44Area = "learn" | "test" | "solutions" | "teacher";

export default function Lesson44({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Lesson44Area>("learn");
  const [step, setStep] = useState<number>(0);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [menuOpen, setMenuOpen] = useState(false);
  const [workspaceValues, setWorkspaceValues] = useState<Record<string, string>>({});
  const [testAnswers, setTestAnswers] = useState<TestAnswers44>({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [gradeReport, setGradeReport] = useState<TestGradeReport44 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);

  const mainRef = useRef<HTMLElement | null>(null);
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  const scrollMainTop = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  const goToStep = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(LESSON_STEP_COUNT_44 - 1, target));
      setArea("learn");
      setStep(clamped);
      setVisited((prev) => {
        if (prev.has(clamped)) return prev;
        const next = new Set(prev);
        next.add(clamped);
        return next;
      });
      setMenuOpen(false);
      scrollMainTop();
    },
    [scrollMainTop]
  );

  const switchArea = useCallback(
    (target: Lesson44Area) => {
      if (target === "solutions" && !solutionsUnlocked) return;
      setArea(target);
      setMenuOpen(false);
      scrollMainTop();
    },
    [scrollMainTop, solutionsUnlocked]
  );

  const prev = useCallback(() => {
    if (step > 0) goToStep(step - 1);
  }, [goToStep, step]);

  const next = useCallback(() => {
    if (step < LESSON_STEP_COUNT_44 - 1) goToStep(step + 1);
  }, [goToStep, step]);

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
        else if (area !== "learn") switchArea("learn");
        return;
      }

      if (inField || area !== "learn") return;

      if (e.key === "ArrowLeft" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStep(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStep(LESSON_STEP_COUNT_44 - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area, goToStep, menuOpen, next, prev, switchArea]);

  const setWorkspaceField = useCallback((key: string, value: string) => {
    setWorkspaceValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const workspaceStore = useMemo(
    () => ({ values: workspaceValues, set: setWorkspaceField }),
    [setWorkspaceField, workspaceValues]
  );

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_44.map((st, idx) => ({
        section: `${String(idx + 1).padStart(2, "0")} · ${st.name}`,
        items: STEP_DESCRIPTORS_44.slice(st.start, st.end + 1).map((desc) => ({
          index: desc.index,
          navId: desc.navId,
          title: <Text44 text={desc.railLabel} />,
        })),
      })),
    []
  );

  const currentDescriptor = STEP_DESCRIPTORS_44[step] ?? STEP_DESCRIPTORS_44[0]!;
  const currentStation = station44(step);

  const headerContent =
    area === "learn" ? (
      <Text44 text={`${currentStation.name} · ${currentDescriptor.railLabel}`} />
    ) : area === "test" ? (
      <Text44 text="الاختبار النهائي الشامل · 25 سؤالًا عبر 5 مستويات" />
    ) : area === "solutions" ? (
      <Text44 text="منطقة الحلول التفصيلية ومقارنة الإجابات" />
    ) : (
      <Text44 text="مساحة المعلم · الدليل التدريسي ومفاتيح التصحيح" />
    );

  const progress =
    area === "learn"
      ? Math.round(((step + 1) / LESSON_STEP_COUNT_44) * 100)
      : 100;

  const counter =
    area === "learn"
      ? `${step + 1} / ${LESSON_STEP_COUNT_44}`
      : area === "test"
        ? "25 Q"
        : area === "solutions"
          ? "KEY"
          : "TCHR";

  const areaButtons: ReadonlyArray<{
    id: Lesson44Area;
    label: string;
    badge: string;
    locked?: boolean;
  }> = [
    { id: "learn", label: "منطقة التعلّم", badge: `${LESSON_STEP_COUNT_44}` },
    {
      id: "test",
      label: "منطقة الاختبار",
      badge: testSubmitted && gradeReport ? `${gradeReport.score}/25` : "25",
    },
    {
      id: "solutions",
      label: "منطقة الحلول",
      badge: solutionsUnlocked ? "متاح" : "مقفل",
      locked: !solutionsUnlocked,
    },
    {
      id: "teacher",
      label: "مساحة المعلم",
      badge: teacherUnlocked ? "مفتوح" : "رمز",
    },
  ];

  const railFooter = (
    <div className="occ-rail-foot mt-2">
      <span>
        زار المتعلم:{" "}
        <span dir="ltr" className="font-en inline-block">
          {visited.size} / {LESSON_STEP_COUNT_44}
        </span>{" "}
        خطوة
      </span>
    </div>
  );

  return (
    <Workspace44.Provider value={workspaceStore}>
      <Lesson1Shell
        railTitle={
          <span className="occ-rail-brand">
            <span>الدرس 44 · </span>
            <span dir="ltr" lang="en" className="font-en">
              {LESSON_TITLE_44}
            </span>
          </span>
        }
        railSubtitle={
          <div className="mt-2 occ-rail-meta">
            <span className="occ-rail-kicker">{LESSON_IDENTITY_AR_44}</span>
            <span className="occ-rail-ar">{LESSON_SUBTITLE_44}</span>
            <span className="occ-rail-sub">
              39 خطوة تفاعلية · 6 قنوات دلالية · اختبار 25 سؤالًا
            </span>
          </div>
        }
        groups={groups}
        activeIndex={area === "learn" ? step : -1}
        markActiveStep={area === "learn"}
        railAriaLabel="فهرس محطات الدرس 44"
        railFooter={railFooter}
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        headerContent={headerContent}
        progress={progress}
        counter={counter}
        counterDir="ltr"
        contentKey={area === "learn" ? `step-${step}` : area}
        contentArea={area}
        onSelectStep={goToStep}
        onPrev={area === "learn" ? prev : () => switchArea("learn")}
        onNext={next}
        showNext={area === "learn"}
        prevDisabled={area === "learn" ? step === 0 : false}
        nextDisabled={step === LESSON_STEP_COUNT_44 - 1}
        prevLabel={area === "learn" ? "→ السابق" : "→ العودة إلى التعلّم"}
        nextLabel="التالي ←"
        navAriaLabel="التنقل في الدرس 44"
        onExit={onExit}
        mainRef={mainRef}
        mainId="l44-main"
        rootDir="rtl"
        rootDataLesson={44}
        rootDataShell="lesson-1"
        rootClassName="obligation44 style-b font-body relative flex h-screen flex-col overflow-hidden"
      >
        <nav
          className="occ-area-bar"
          aria-label="التبديل بين مساحات الدرس 44"
        >
          {areaButtons.map((btn) => {
            const active = area === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                data-area-tab={btn.id}
                disabled={btn.locked}
                aria-current={active ? "page" : undefined}
                aria-disabled={btn.locked || undefined}
                className={`occ-area-btn ${active ? "is-active" : ""} ${
                  btn.locked ? "is-locked" : ""
                }`.trim()}
                onClick={() => {
                  if (!btn.locked) switchArea(btn.id);
                }}
              >
                <span className="occ-area-label">
                  {btn.locked && <Glyph44 name="lock" className="occ-lock-ico" />}
                  <span>{btn.label}</span>
                </span>
                <span className="occ-area-pill" aria-hidden="true">
                  {btn.badge}
                </span>
              </button>
            );
          })}
        </nav>

        {area === "learn" ? (
          <Steps44
            index={step}
            onNavigate={goToStep}
            onTest={() => switchArea("test")}
            onSolutions={() => switchArea("solutions")}
            onTeacher={() => switchArea("teacher")}
            testSubmitted={testSubmitted}
            solutionsUnlocked={solutionsUnlocked}
          />
        ) : null}

        {area === "test" ? (
          <Suspense
            fallback={
              <p role="status" className="areaLoading44">
                جارٍ تجهيز الاختبار النهائي الشامل...
              </p>
            }
          >
            <TestArea44
              answers={testAnswers}
              submitted={testSubmitted}
              gradeReport={gradeReport}
              onAnswer={(key, value) =>
                setTestAnswers((prevAns) => ({ ...prevAns, [key]: value }))
              }
              onSubmitted={(report) => {
                setGradeReport(report);
                setTestSubmitted(true);
                scrollMainTop();
              }}
              onReset={() => {
                setTestAnswers({});
                setGradeReport(null);
                setTestSubmitted(false);
                scrollMainTop();
              }}
              onSolutions={() => switchArea("solutions")}
              onBack={() => switchArea("learn")}
            />
          </Suspense>
        ) : null}

        {area === "solutions" && solutionsUnlocked ? (
          <Suspense
            fallback={
              <p role="status" className="areaLoading44">
                جارٍ فتح منطقة الحلول التفصيلية...
              </p>
            }
          >
            <SolutionsArea44
              answers={testAnswers}
              gradeReport={gradeReport}
              onBackToTest={() => switchArea("test")}
              onBackToLearn={() => switchArea("learn")}
            />
          </Suspense>
        ) : null}

        {area === "teacher" ? (
          <Suspense
            fallback={
              <p role="status" className="areaLoading44">
                جارٍ تحميل بوابة المعلم...
              </p>
            }
          >
            <TeacherArea44
              unlocked={teacherUnlocked}
              unlock={() => setTeacherUnlocked(true)}
              lock={() => setTeacherUnlocked(false)}
              onOpenSolutions={() => switchArea("solutions")}
              onBackToLearn={() => switchArea("learn")}
            />
          </Suspense>
        ) : null}
      </Lesson1Shell>
    </Workspace44.Provider>
  );
}
