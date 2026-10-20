import "./lesson37.css";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import StepView37 from "./Steps37";
import TestArea37 from "./TestArea37";
import TeacherArea37 from "./TeacherArea37";
import { Rich } from "../../shared/lessonKit";
import { ActionButton37, FOCUS_37 } from "./kit37";
import { CHAPTERS_37, LESSON_ARABIC_SUBTITLE_37, LESSON_SUBTITLE_37, LESSON_TITLE_AR_37, SLIDES_37, STEP_COUNT_37, type ChapterId37 } from "./data";

const SolutionsArea37 = lazy(() => import("./SolutionsArea37"));
type Area37 = "student" | "test" | "solutions" | "teacher";

export default function Lesson37({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area37>("student");
  const [index, setIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<ChapterId37, boolean>>(() => ({
    LAUNCH: true,
    FORM: false,
    MEANING: false,
    TIMECLAUSE: false,
    DIALOGUE: false,
    QUESTIONS: false,
    VERBS: false,
    COMPARE: false,
    PRACTICE: false,
    ASSESSMENT: false,
    WRAP: false,
  }));

  const slide = SLIDES_37[index];
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const last = index === STEP_COUNT_37 - 1;

  useEffect(() => {
    setOpenChapters((current) => ({ ...current, [slide.section]: true }));
    window.scrollTo?.({ top: 0, behavior: "auto" });
  }, [index, slide.section]);

  useEffect(() => {
    window.scrollTo?.({ top: 0, behavior: "auto" });
  }, [area]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (area !== "student") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("button, a, input, textarea, select, [contenteditable='true']")) return;
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

  const setStep = (next: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_37 - 1, next)));
    setMobileNavOpen(false);
    setArea("student");
  };

  const navigation = (prefix: string) => (
    <nav aria-label="محتويات الدرس 37" className="space-y-2">
      {CHAPTERS_37.map((chapter) => {
        const active = slide.section === chapter.id;
        const expanded = openChapters[chapter.id];
        const chapterSlides = SLIDES_37.map((candidate, slideIndex) => ({ candidate, slideIndex })).filter(
          ({ candidate }) => candidate.section === chapter.id,
        );
        return (
          <section key={chapter.id} className="rounded-xl border border-[#cde8f2] bg-white">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`${prefix}-chapter-${chapter.id}`}
              onClick={() => setOpenChapters((current) => ({ ...current, [chapter.id]: !current[chapter.id] }))}
              className={`${FOCUS_37} flex min-h-12 w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-right ${
                active ? "bg-[#e4f8f5] text-[#084765]" : "text-[#17384a] hover:bg-[#edf8ff]"
              }`}
            >
              <span className="min-w-0">
                <span className="block font-black leading-6">{chapter.label}</span>
                <span dir="ltr" className="font-en block text-[11px] font-bold text-[#4b6a7d]">
                  {chapter.en}
                </span>
              </span>
              <span aria-hidden="true" className="font-en text-lg">
                {expanded ? "−" : "+"}
              </span>
            </button>
            {expanded ? (
              <ol id={`${prefix}-chapter-${chapter.id}`} className="space-y-1 border-t border-[#cde8f2] p-2">
                {chapterSlides.map(({ candidate, slideIndex }) => (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      data-step-nav={candidate.id}
                      aria-current={slideIndex === index ? "step" : undefined}
                      onClick={() => setStep(slideIndex)}
                      className={`${FOCUS_37} flex min-h-11 w-full items-start gap-2 rounded-lg px-2 py-2 text-right text-sm leading-6 ${
                        slideIndex === index ? "bg-[#007b83] text-white" : "text-[#17384a] hover:bg-[#e4f8f5]"
                      }`}
                    >
                      <span
                        dir="ltr"
                        className={`font-en mt-0.5 shrink-0 rounded-full px-2 text-xs font-black ${
                          slideIndex === index ? "bg-white/15 text-white" : "bg-[#eff9fd] text-[#3e5d70]"
                        }`}
                      >
                        {candidate.source.num ?? "•"}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold">
                          <span className="sr-only">خطوة {candidate.step}: </span>
                          <Rich text={candidate.title} />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : null}
          </section>
        );
      })}
    </nav>
  );

  return (
    <div dir="rtl" data-lesson="37" className="min-h-screen bg-[#edf8ff] text-[#17384a]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 p-3 sm:p-5">
        <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] w-80 shrink-0 overflow-y-auto rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-3 shadow-sm lg:block">
          <div className="mb-3 rounded-2xl bg-[#084765] p-3 text-white">
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#fff4c5]">Future Horizon · Time Observatory</p>
            <h2 className="mt-1 text-base font-black">محتويات الدرس</h2>
            <p className="mt-2 text-sm font-bold text-white">
              <span className="font-en tabular-nums">{index + 1}</span> / <span className="font-en tabular-nums">{STEP_COUNT_37}</span> خطوة
            </p>
            <div
              role="progressbar"
              aria-label="التقدم بين خطوات الدرس"
              aria-valuemin={1}
              aria-valuemax={STEP_COUNT_37}
              aria-valuenow={index + 1}
              className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"
            >
              <div className="h-full bg-[#8fdcd4]" style={{ width: `${((index + 1) / STEP_COUNT_37) * 100}%` }} />
            </div>
          </div>
          {navigation("desktop")}
        </aside>

        <main className="min-w-0 flex-1" id="lesson37-main">
          <header className="rounded-3xl border border-[#b8dff0] bg-[#ffffff] p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[.13em] text-[#4b6a7d]">Advanced Foundation · IQ200</p>
                <h1 className="mt-1 text-xl font-black leading-snug text-[#084765] sm:text-2xl">
                  <Rich text={LESSON_TITLE_AR_37} />
                </h1>
                <p dir="ltr" className="font-en mt-1 text-left text-base font-bold text-[#3e5d70]">
                  {LESSON_SUBTITLE_37}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#3e5d70]">{LESSON_ARABIC_SUBTITLE_37}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {onExit ? (
                  <ActionButton37 variant="secondary" onClick={onExit}>
                    العودة إلى المنهج
                  </ActionButton37>
                ) : null}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="مناطق الدرس">
              <AreaButton37 active={area === "student"} onClick={() => setArea("student")}>
                منطقة الطالب
              </AreaButton37>
              <AreaButton37 active={area === "test"} onClick={() => setArea("test")}>
                منطقة الاختبار
              </AreaButton37>
              <AreaButton37
                active={area === "solutions"}
                disabled={!solutionsUnlocked}
                onClick={() => setArea("solutions")}
                title={!solutionsUnlocked ? "تُفتح الحلول بعد تسليم الاختبار أو دخول المعلم" : undefined}
              >
                منطقة الحلول{solutionsUnlocked ? "" : " · بعد التسليم"}
              </AreaButton37>
              <AreaButton37 active={area === "teacher"} onClick={() => setArea("teacher")}>
                منطقة المعلم
              </AreaButton37>
            </div>
          </header>

          <div className="mt-3 rounded-2xl border border-[#b8dff0] bg-white p-3 shadow-sm lg:hidden">
            <button
              type="button"
              aria-expanded={mobileNavOpen}
              aria-controls="lesson37-mobile-nav"
              onClick={() => setMobileNavOpen((current) => !current)}
              className={`${FOCUS_37} flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-right text-sm font-black text-[#084765]`}
            >
              <span>
                محتويات الدرس ·{" "}
                <span className="font-en tabular-nums">
                  {index + 1}/{STEP_COUNT_37}
                </span>
              </span>
              <span aria-hidden="true" className="font-en">
                {mobileNavOpen ? "−" : "+"}
              </span>
            </button>
            <div id="lesson37-mobile-nav" hidden={!mobileNavOpen} className="mt-3 max-h-[55vh] overflow-y-auto">
              {navigation("mobile")}
            </div>
          </div>

          <section className={area === "student" ? "mt-4 space-y-4" : "hidden"} aria-hidden={area !== "student"} data-area="lesson37-student">
            <div className="rounded-2xl border border-[#b8dff0] bg-white px-3 py-2 text-sm font-bold text-[#3e5d70] lg:hidden">
              <Rich text={`Step ${index + 1} of ${STEP_COUNT_37} · ${slide.title}`} />
              <div
                role="progressbar"
                aria-label="التقدم بين خطوات الدرس"
                aria-valuemin={1}
                aria-valuemax={STEP_COUNT_37}
                aria-valuenow={index + 1}
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e0f1f8]"
              >
                <div className="h-full bg-[#007b83]" style={{ width: `${((index + 1) / STEP_COUNT_37) * 100}%` }} />
              </div>
            </div>
            <StepView37
              key={slide.id}
              slide={slide}
              onGoTest={() => setArea("test")}
              onGoSolutions={() => setArea("solutions")}
              onStartStep={() => setStep(1)}
            />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#cde8f2] pt-4 pb-6">
              <ActionButton37 variant="secondary" disabled={index === 0} onClick={() => setStep(index - 1)}>
                → السابق
              </ActionButton37>
              <span dir="ltr" className="font-en text-sm font-black tabular-nums text-[#4b6a7d]">
                {index + 1} / {STEP_COUNT_37}
              </span>
              {!last ? (
                <ActionButton37 onClick={() => setStep(index + 1)}>التالي ←</ActionButton37>
              ) : (
                <span className="rounded-xl bg-[#e4f8f5] px-4 py-3 text-sm font-black text-[#1f613d]">
                  اكتملت خطوات المصدر؛ أكمل مهمة الكتابة والاختبار من المناطق أعلاه.
                </span>
              )}
            </div>
          </section>

          <section className={area === "test" ? "mt-4" : "hidden"} aria-hidden={area !== "test"}>
            <TestArea37 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
          </section>

          {area === "solutions" ? (
            solutionsUnlocked ? (
              <Suspense
                fallback={
                  <div role="status" className="mt-4 rounded-2xl border border-[#b8dff0] bg-white p-4 text-[#17384a]">
                    جارٍ تحميل الحلول التفصيلية…
                  </div>
                }
              >
                <div className="mt-4">
                  <SolutionsArea37 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
                </div>
              </Suspense>
            ) : (
              <SolutionsGate37 onGoTest={() => setArea("test")} />
            )
          ) : null}

          <section className={area === "teacher" ? "mt-4" : "hidden"} aria-hidden={area !== "teacher"}>
            <TeacherArea37 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
          </section>
        </main>
      </div>
    </div>
  );
}

function AreaButton37({
  active,
  disabled = false,
  onClick,
  children,
  title,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`${FOCUS_37} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${
        active ? "border-[#007b83] bg-[#007b83] text-white" : "border-[#b8dff0] bg-white text-[#17384a] hover:bg-[#e4f8f5]"
      } disabled:cursor-not-allowed disabled:border-[#cde8f2] disabled:bg-[#ecf6fa] disabled:text-[#4b6570]`}
    >
      {children}
    </button>
  );
}

function SolutionsGate37({ onGoTest }: { onGoTest: () => void }) {
  return (
    <div data-area="lesson37-solutions" data-solutions-locked className="mt-4">
      <section className="rounded-3xl border border-[#b8dff0] bg-white p-5">
        <h2 className="text-xl font-black text-[#084765]">منطقة الحلول مقفلة</h2>
        <p className="mt-2 text-sm leading-6 text-[#3e5d70]">
          لا توجد إجابات أو تفسيرات ظاهرة هنا قبل تسليم الاختبار. أكمل الأسئلة الـ25 ثم أرسلها لفتح الحلول، أو ادخل بكلمة مرور المعلم.
        </p>
        <ActionButton37 className="mt-3" onClick={onGoTest}>
          العودة إلى الاختبار
        </ActionButton37>
      </section>
    </div>
  );
}
