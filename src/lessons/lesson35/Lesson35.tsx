import "./lesson35.css";
import { cloneElement, isValidElement, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { En } from "../../shared/lessonKit";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { SiteLockButton, useRegisterInlineLockHost } from "../../shared/SitePasswordGate";
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
  useRegisterInlineLockHost(true);
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

  const rail = useMemo(() => {
    return (
      <aside className="flex h-full flex-col">
        <div className="border-b border-slate-100 p-5">
          {onExit ? (
            <button type="button" onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
              → جميع الدروس
            </button>
          ) : null}
          <div className="font-head mt-2 text-xl font-bold text-slate-900">الدرس 35 · BE GOING TO</div>
          <En className="text-xs font-semibold text-slate-400">{LESSON_SUBTITLE_35}</En>
        </div>
        <nav aria-label="فهرس خطوات الدرس 35" className="flex-1 overflow-y-auto p-3">
          {STAGES_35.map((group) => {
            const entries = SLIDES_35.map((candidate, idx) => ({ candidate, idx })).filter(({ candidate }) => candidate.stage === group.id);
            return (
              <div key={group.id} className="mb-3">
                <div className="px-3 py-1 text-xs font-bold text-slate-400">{group.ar}</div>
                <ol>
                  {entries.map(({ candidate, idx }) => {
                    const active = idx === index && area === "lesson";
                    return (
                      <li key={candidate.id}>
                        <button
                          type="button"
                          data-step-nav={candidate.id}
                          aria-current={active ? "step" : undefined}
                          onClick={() => goToStep(idx)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                        >
                          <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/20" : "bg-slate-100"}`}>{idx + 1}</span>
                          <span className="min-w-0 truncate font-semibold">{candidate.title}</span>
                          <span className="mr-auto shrink-0 text-base" aria-hidden>{group.icon}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </nav>
        <div className="border-t border-slate-100 p-4 text-xs text-slate-400">
          <div>التنقل: الأسهم ← → أو مفتاح المسافة</div>
          <div className="mt-2 grid gap-1.5">
            <button type="button" data-area-tab="lesson" onClick={() => { setArea("lesson"); setMenu(false); }} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">خطوات الدرس</button>
            <button type="button" data-area-tab="test" onClick={openTest} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">منطقة الاختبار</button>
            <button type="button" data-area-tab="solutions" onClick={() => { setArea("solutions"); setMenu(false); }} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">منطقة الحلول {solutionsUnlocked ? "" : "🔒"}</button>
            <button type="button" data-area-tab="teacher" onClick={() => { setArea("teacher"); setMenu(false); }} className="text-right font-semibold text-slate-600 transition hover:text-slate-900">منطقة المعلم</button>
          </div>
        </div>
      </aside>
    );
  }, [area, index, onExit, solutionsUnlocked, total]);

  const content = area === "lesson" ? (
    <StepView35 slide={step} index={index} onGoTest={openTest} onGoSolutions={() => setArea("solutions")} />
  ) : area === "solutions" ? (
    <SolutionsArea35 unlocked={solutionsUnlocked} onGoTest={openTest} onGoTeacher={() => setArea("teacher")} />
  ) : area === "teacher" ? (
    <TeacherArea35 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
  ) : null;

  const headerTitle = area === "lesson" ? `${step.title} · ${stage.ar}` : AREA_LABEL_35[area];
  const nav = (
    <div data-lesson-step-nav="true" className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-center gap-1.5">
      <nav aria-label={area === "lesson" ? "التنقل بين خطوات الدرس 35" : "العودة من منطقة الدرس 35"} className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur">
        <button
          type="button"
          data-step-nav="prev"
          onClick={area === "lesson" ? goPrev : () => setArea("lesson")}
          disabled={area === "lesson" && index === 0}
          className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
        >
          {area === "lesson" ? "→ السابق" : "← العودة إلى الدرس"}
        </button>
        {area === "lesson" ? (
          <>
            <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
            <button
              type="button"
              data-step-nav="next"
              onClick={goNext}
              disabled={isLast}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30"
            >
              التالي ←
            </button>
          </>
        ) : null}
      </nav>
      <div className="pointer-events-auto"><SiteLockButton /></div>
    </div>
  );

  return (
    <div dir="rtl" data-lesson="35" data-l35-shell="lesson-1" className="fg35-app style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          {rail}
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              type="button"
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس الدرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1" data-lesson-header>
              <div className="truncate text-sm font-bold text-slate-500">{area === "lesson" ? `${stage.id} · ${headerTitle}` : headerTitle}</div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all duration-500" style={{ width: `${area === "lesson" ? progress : 100}%` }} />
              </div>
            </div>
            <span className="shrink-0 rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm" dir="ltr">{area === "lesson" ? `${index + 1} / ${total}` : AREA_LABEL_35[area]}</span>
          </header>

          <main id="l35-main" ref={mainRef} className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            {area !== "test" ? (
              <div key={`${area}-${step.id}`} className="pop mx-auto max-w-4xl" data-area={area === "lesson" ? "l35-lesson" : `l35-${area}`}>
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
              </div>
            ) : null}
            {testVisited ? (
              <div hidden={area !== "test"} className="pop mx-auto max-w-4xl" data-area="l35-test">
                <Suspense fallback={<div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-600" role="status">جارٍ فتح الاختبار…</div>}>
                  <TestArea35 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
                </Suspense>
              </div>
            ) : null}
          </main>
        </div>
      </div>
      {menu ? (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="presentation" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            {rail}
          </div>
        </div>
      ) : null}
      {nav}
    </div>
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
