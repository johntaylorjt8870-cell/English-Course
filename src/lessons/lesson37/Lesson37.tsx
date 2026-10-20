import "./lesson37.css";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import LessonStepNav from "../../shared/LessonStepNav";
import { Rich } from "../../shared/lessonKit";
import { ActionButton37, FOCUS_37 } from "./kit37";
import {
  CHAPTERS_37,
  LESSON_ARABIC_SUBTITLE_37,
  LESSON_SUBTITLE_37,
  LESSON_TITLE_37,
  SLIDES_37,
  STEP_COUNT_37,
  type ChapterId37,
} from "./data";
import StepView37 from "./Steps37";
import TestArea37 from "./TestArea37";
import TeacherArea37 from "./TeacherArea37";

const SolutionsArea37 = lazy(() => import("./SolutionsArea37"));

type Area37 = "lesson" | "test" | "solutions" | "teacher";

const AREA_LABEL_37: Record<Area37, string> = {
  lesson: "منطقة الطالب",
  test: "منطقة الاختبار",
  solutions: "منطقة الحلول",
  teacher: "منطقة المعلم",
};

const VISITED_KEY_37 = "l37-future-horizon-visited-v1";

export default function Lesson37({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area37>("lesson");
  const [index, setIndex] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<ChapterId37, boolean>>(() => ({
    intro: true,
    form: false,
    meaning: false,
    clauses: false,
    polite: false,
    "neg-questions": false,
    verbs: false,
    compare: false,
    practice: false,
    assessment: false,
    closure: false,
  }));
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(() => new Set([SLIDES_37[0].id]));
  const mainRef = useRef<HTMLElement | null>(null);
  const firstRender = useRef(true);

  const slide = SLIDES_37[index];
  const isLast = index === STEP_COUNT_37 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_37 - 1, next)));
    setArea("lesson");
    setMobileNav(false);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITED_KEY_37);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const known = new Set(SLIDES_37.map((candidate) => candidate.id));
      const restored = parsed.filter((id) => typeof id === "string" && known.has(id));
      if (restored.length) setVisited(new Set<string>([...restored, SLIDES_37[0].id]));
    } catch {
      /* التقدّم المحفوظ اختياري */
    }
  }, []);

  useEffect(() => {
    setVisited((current) => (current.has(slide.id) ? current : new Set(current).add(slide.id)));
    setOpenChapters((current) => (current[slide.section] ? current : { ...current, [slide.section]: true }));
  }, [slide.id, slide.section]);

  useEffect(() => {
    try {
      localStorage.setItem(VISITED_KEY_37, JSON.stringify([...visited]));
    } catch {
      /* storage غير متاح */
    }
  }, [visited]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (area === "lesson") mainRef.current?.scrollIntoView?.({ block: "start" });
    else window.scrollTo?.({ top: 0 });
  }, [index, area]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (area !== "lesson") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") setIndex((current) => Math.min(STEP_COUNT_37 - 1, current + 1));
      else if (event.key === "ArrowRight") setIndex((current) => Math.max(0, current - 1));
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(STEP_COUNT_37 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area]);

  const chapterOfSlide = CHAPTERS_37.find((chapter) => chapter.id === slide.section);
  const chapterSteps = useMemo(
    () => CHAPTERS_37.map((chapter) => ({
      chapter,
      steps: SLIDES_37.map((candidate, stepIndex) => ({ candidate, stepIndex })).filter(({ candidate }) => candidate.section === chapter.id),
    })),
    [],
  );

  const rail = (
    <nav aria-label="محتويات الدرس 37" className="space-y-2">
      {chapterSteps.map(({ chapter, steps }) => {
        const expanded = openChapters[chapter.id];
        const active = slide.section === chapter.id;
        const done = steps.filter(({ candidate }) => visited.has(candidate.id)).length;
        return (
          <section key={chapter.id} className="overflow-hidden rounded-xl border border-[#bae6fd] bg-white">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`l37-chapter-${chapter.id}`}
              onClick={() => setOpenChapters((current) => ({ ...current, [chapter.id]: !current[chapter.id] }))}
              className={`${FOCUS_37} flex min-h-12 w-full items-center justify-between gap-2 px-3 py-2 text-right ${
                active ? "bg-[#e0f2fe] text-[#0c4a6e]" : "text-[#1e293b] hover:bg-[#f8fbff]"
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-black leading-6">
                  <Rich text={chapter.title} />
                </span>
                <span className="font-en block text-[11px] font-bold text-[#0369a1]" dir="ltr">
                  {chapter.rangeLabel}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span dir="ltr" className="font-en text-[11px] font-black tabular-nums text-[#0369a1]">
                  {done}/{steps.length}
                </span>
                <span aria-hidden className="font-black text-[#0369a1]">{expanded ? "−" : "+"}</span>
              </span>
            </button>
            {expanded ? (
              <ol id={`l37-chapter-${chapter.id}`} className="space-y-1 border-t border-[#bae6fd] p-2">
                {steps.map(({ candidate, stepIndex }) => {
                  const current = stepIndex === index;
                  return (
                    <li key={candidate.id}>
                      <button
                        type="button"
                        data-step-nav={candidate.id}
                        aria-current={current ? "step" : undefined}
                        onClick={() => goTo(stepIndex)}
                        className={`${FOCUS_37} flex min-h-11 w-full items-start gap-2 rounded-lg px-2 py-2 text-right text-sm leading-6 ${
                          current ? "bg-[#0f766e] text-white" : "text-[#1e293b] hover:bg-[#f0f9ff]"
                        }`}
                      >
                        <span
                          dir="ltr"
                          className={`font-en mt-0.5 shrink-0 rounded-full px-2 text-[11px] font-black tabular-nums ${
                            current ? "bg-white text-[#115e59]" : "bg-[#e0f2fe] text-[#0c4a6e]"
                          }`}
                        >
                          {stepIndex + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-bold">
                            <Rich text={candidate.title} />
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            ) : null}
          </section>
        );
      })}
    </nav>
  );

  const tabs = (
    <div className="flex flex-wrap gap-2" role="group" aria-label="مناطق الدرس 37">
      {(Object.keys(AREA_LABEL_37) as Area37[]).map((key) => {
        const locked = key === "solutions" && !solutionsUnlocked;
        return (
          <button
            key={key}
            type="button"
            data-area-tab={key}
            aria-pressed={area === key}
            onClick={() => setArea(key)}
            title={locked ? "تُفتح الحلول بعد تسليم الاختبار أو دخول المعلم" : undefined}
            className={`${FOCUS_37} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
              area === key
                ? "border-[#0f766e] bg-[#0f766e] text-white"
                : "border-[#7dd3fc] bg-white text-[#0c4a6e] hover:bg-[#e0f2fe]"
            }`}
          >
            {AREA_LABEL_37[key]}
            {key === "solutions" && !solutionsUnlocked ? " 🔒" : ""}
            {key === "test" && testSubmitted ? " ✓" : ""}
          </button>
        );
      })}
    </div>
  );

  return (
    <div dir="rtl" data-lesson="37" className="min-h-screen text-[#1e293b]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 p-3 sm:p-5">
        <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] w-80 shrink-0 overflow-y-auto rounded-3xl border border-[#bae6fd] bg-white p-3 shadow-sm lg:block">
          <div className="fh37-rail__Dial mb-3">
            <p className="font-en text-[11px] font-black uppercase tracking-[.16em] text-[#0369a1]" dir="ltr">
              FUTURE HORIZON · LESSON 37
            </p>
            <h2 className="mt-1 text-base font-black text-[#0f172a]">مرصد الأفق المستقبلي</h2>
            <p className="mt-2 text-sm font-bold text-[#0f172a]">
              <span dir="ltr" className="font-en tabular-nums">{index + 1}</span> /{" "}
              <span dir="ltr" className="font-en tabular-nums">{STEP_COUNT_37}</span> خطوة ·{" "}
              <span dir="ltr" className="font-en tabular-nums">{visited.size}</span> مزارة
            </p>
            <div
              role="progressbar"
              aria-label="التقدم بين خطوات الدرس"
              aria-valuemin={1}
              aria-valuemax={STEP_COUNT_37}
              aria-valuenow={index + 1}
              className="mt-2 h-2 overflow-hidden rounded-full bg-white"
            >
              <div className="h-full bg-[#0f766e]" style={{ width: `${((index + 1) / STEP_COUNT_37) * 100}%` }} />
            </div>
          </div>
          {rail}
        </aside>

        <main className="min-w-0 flex-1" id="lesson37-main" ref={mainRef}>
          <div className="fh37-header">
            <div className="fh37-header__beam" />
            <header className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-en text-[11px] font-black uppercase tracking-[.16em] text-[#0369a1]" dir="ltr">
                    Bright Time Observatory · Advanced Foundation · IQ200
                  </p>
                  <h1 className="mt-1 text-xl font-black leading-snug text-[#0c4a6e] sm:text-2xl">
                    <Rich text={LESSON_TITLE_37} />
                  </h1>
                  <p dir="ltr" className="font-en mt-1 text-left text-base font-black text-[#1d4ed8]">
                    {LESSON_SUBTITLE_37}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[#334155]">
                    <Rich text={LESSON_ARABIC_SUBTITLE_37} /> — تخيّل لحظة من المستقبل وصِف ما سيكون جاريًا فيها.
                  </p>
                </div>
                {onExit ? (
                  <ActionButton37 variant="secondary" onClick={onExit}>
                    العودة إلى المنهج
                  </ActionButton37>
                ) : null}
              </div>
              <div className="mt-3">{tabs}</div>
            </header>
          </div>

          <div className="mt-3 rounded-2xl border border-[#bae6fd] bg-white p-3 shadow-sm lg:hidden">
            <button
              type="button"
              aria-expanded={mobileNav}
              aria-controls="lesson37-mobile-nav"
              onClick={() => setMobileNav((current) => !current)}
              className={`${FOCUS_37} flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-right text-sm font-black text-[#0c4a6e]`}
            >
              <span>
                محتويات الدرس ·{" "}
                <span dir="ltr" className="font-en tabular-nums">
                  {index + 1}/{STEP_COUNT_37}
                </span>
              </span>
              <span aria-hidden className="font-en">{mobileNav ? "−" : "+"}</span>
            </button>
            <div id="lesson37-mobile-nav" hidden={!mobileNav} className="mt-3 max-h-[55vh] overflow-y-auto">
              {rail}
            </div>
          </div>

          <section
            className={area === "lesson" ? "mt-3 space-y-3" : "hidden"}
            aria-hidden={area !== "lesson"}
            data-area="lesson37-student"
          >
            <div className="rounded-2xl border border-[#bae6fd] bg-white px-3.5 py-2.5 lg:hidden">
              <p className="text-sm font-bold text-[#0f172a]">
                <Rich text={`الخطوة ${index + 1} من ${STEP_COUNT_37} · ${slide.title}`} />
              </p>
              <div
                role="progressbar"
                aria-label="التقدم بين خطوات الدرس"
                aria-valuemin={1}
                aria-valuemax={STEP_COUNT_37}
                aria-valuenow={index + 1}
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0f2fe]"
              >
                <div className="h-full bg-[#0f766e]" style={{ width: `${((index + 1) / STEP_COUNT_37) * 100}%` }} />
              </div>
            </div>
            <StepView37
              key={slide.id}
              slide={slide}
              onGoTest={() => setArea("test")}
              onGoSolutions={() => setArea("solutions")}
            />
          </section>

          <section className={area === "test" ? "mt-3" : "hidden"} aria-hidden={area !== "test"}>
            <TestArea37 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
          </section>

          {area === "solutions" ? (
            solutionsUnlocked ? (
              <Suspense
                fallback={
                  <div role="status" className="mt-3 rounded-2xl border border-[#bae6fd] bg-white p-4 text-sm font-bold text-[#0c4a6e]">
                    جارٍ تحميل الحلول التفصيلية…
                  </div>
                }
              >
                <div className="mt-3">
                  <SolutionsArea37
                    unlocked={solutionsUnlocked}
                    onGoTest={() => setArea("test")}
                    onGoTeacher={() => setArea("teacher")}
                  />
                </div>
              </Suspense>
            ) : (
              <SolutionsGate37 onGoTest={() => setArea("test")} />
            )
          ) : null}

          <section className={area === "teacher" ? "mt-3" : "hidden"} aria-hidden={area !== "teacher"}>
            <TeacherArea37 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
          </section>

          <div className="mt-4 pb-4">
            <LessonStepNav
              ariaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 37" : "التنقل في منطقة الدرس 37"}
              onPrev={area === "lesson" ? () => goTo(index - 1) : () => setArea("lesson")}
              onNext={area === "lesson" ? () => goTo(index + 1) : () => setArea("lesson")}
              prevDisabled={area === "lesson" && index === 0}
              showNext={area === "lesson" ? !isLast : false}
              prevLabel={area === "lesson" ? "→ السابق" : "← العودة إلى خطوات الدرس"}
              nextLabel="التالي ←"
            >
              {area === "lesson" ? (
                <span className="flex min-w-0 flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#bae6fd] bg-[#f8fbff] px-3 py-1.5 text-xs font-black text-[#0c4a6e]">
                  <span aria-hidden>{chapterOfSlide ? "🔭" : "•"}</span>
                  <span dir="ltr" className="font-en tabular-nums">
                    {index + 1}/{STEP_COUNT_37}
                  </span>
                  <span className="truncate">
                    <Rich text={chapterOfSlide?.title ?? ""} />
                  </span>
                </span>
              ) : (
                <span className="rounded-full border border-[#bae6fd] bg-[#f8fbff] px-3 py-1.5 text-xs font-black text-[#0c4a6e]">
                  {AREA_LABEL_37[area]}
                </span>
              )}
            </LessonStepNav>
            {area === "lesson" && isLast ? (
              <p className="mt-2 rounded-xl bg-[#ccfbf1] px-3 py-2 text-center text-sm font-black text-[#115e59]">
                اكتملت خطوات المصدر — أكمل مهمة الكتابة والاختبار النهائي من المناطق أعلاه.
              </p>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}

function SolutionsGate37({ onGoTest }: { onGoTest: () => void }) {
  return (
    <div data-area="lesson37-solutions" data-solutions-locked className="mt-3">
      <section className="rounded-3xl border border-[#bae6fd] bg-white p-5">
        <h2 className="text-xl font-black text-[#0c4a6e]">منطقة الحلول مقفلة</h2>
        <p className="mt-2 text-sm leading-7 text-[#1e293b]">
          لا توجد إجابات أو تفسيرات ظاهرة هنا قبل تسليم الاختبار. أكمل الأسئلة الـ25 ثم أرسلها لفتح الحلول، أو ادخل بكلمة مرور المعلم.
        </p>
        <ActionButton37 className="mt-3" onClick={onGoTest}>
          العودة إلى الاختبار
        </ActionButton37>
      </section>
    </div>
  );
}

