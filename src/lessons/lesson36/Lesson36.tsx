import { lazy, Suspense, useEffect, useState } from "react";
import StepView36 from "./Steps36";
import TestArea36 from "./TestArea36";
import TeacherArea36 from "./TeacherArea36";
import { CHAPTERS_36, SLIDES_36, STEP_COUNT_36, type ChapterId36 } from "./data";
import { ActionButton36, FOCUS_36 } from "./kit36";
import type { ReactNode } from "react";

const SolutionsArea36 = lazy(() => import("./SolutionsArea36"));
type Area36 = "student" | "test" | "solutions" | "teacher";

export default function Lesson36({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area36>("student");
  const [index, setIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<ChapterId36, boolean>>(() => ({
    FOUNDATION: true,
    DECISIONS: false,
    PREDICTIONS: false,
    FUNCTIONS: false,
    DIALOGUES: false,
    PRACTICE: false,
    ASSESSMENT: false,
    WRAP: false,
  }));
  const slide = SLIDES_36[index];
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const last = index === STEP_COUNT_36 - 1;

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
      if (event.key === "ArrowLeft") setIndex((current) => Math.min(STEP_COUNT_36 - 1, current + 1));
      else if (event.key === "ArrowRight") setIndex((current) => Math.max(0, current - 1));
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(STEP_COUNT_36 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area]);

  const setStep = (next: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_36 - 1, next)));
    setMobileNavOpen(false);
    setArea("student");
  };

  const navigation = (prefix: string) => (
    <nav aria-label="محتويات الدرس 36" className="space-y-2">
      {CHAPTERS_36.map((chapter) => {
        const active = slide.section === chapter.id;
        const expanded = openChapters[chapter.id];
        const chapterSlides = SLIDES_36.map((candidate, slideIndex) => ({ candidate, slideIndex })).filter(({ candidate }) => candidate.section === chapter.id);
        return (
          <section key={chapter.id} className="rounded-xl border border-[#e2dfd6] bg-white">
            <button type="button" aria-expanded={expanded} aria-controls={`${prefix}-chapter-${chapter.id}`} onClick={() => setOpenChapters((current) => ({ ...current, [chapter.id]: !current[chapter.id] }))} className={`${FOCUS_36} flex min-h-12 w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-right ${active ? "bg-[#eef4f0] text-[#17354a]" : "text-[#24343b] hover:bg-[#f7f8f5]"}`}>
              <span className="min-w-0"><span className="block font-black leading-6">{chapter.label}</span><span dir="ltr" className="font-en block text-[11px] font-bold text-[#53676a]">{chapter.en}</span></span>
              <span aria-hidden="true" className="font-en text-lg">{expanded ? "−" : "+"}</span>
            </button>
            {expanded ? (
              <ol id={`${prefix}-chapter-${chapter.id}`} className="space-y-1 border-t border-[#e3e0d7] p-2">
                {chapterSlides.map(({ candidate, slideIndex }) => (
                  <li key={candidate.id}>
                    <button type="button" data-step-nav={candidate.id} aria-current={slideIndex === index ? "step" : undefined} onClick={() => setStep(slideIndex)} className={`${FOCUS_36} flex min-h-11 w-full items-start gap-2 rounded-lg px-2 py-2 text-right text-sm leading-6 ${slideIndex === index ? "bg-[#245f62] text-white" : "text-[#24343b] hover:bg-[#eef4f0]"}`}>
                      <span dir="ltr" className={`font-en mt-0.5 shrink-0 rounded-full px-2 text-xs font-black ${slideIndex === index ? "bg-white/15 text-white" : "bg-[#f3f5f2] text-[#43575a]"}`}>{candidate.source.num ?? "•"}</span>
                      <span className="min-w-0"><span className="block font-bold"><span className="sr-only">خطوة {candidate.step}: </span>{candidate.title}</span></span>
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
    <div dir="rtl" data-lesson="36" className="min-h-screen bg-[#f5f3ed] text-[#24343b]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-4 p-3 sm:p-5">
        <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] w-80 shrink-0 overflow-y-auto rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-3 shadow-sm lg:block">
          <div className="mb-3 rounded-2xl bg-[#17354a] p-3 text-white">
            <p className="text-xs font-black uppercase tracking-[.14em] text-[#f0ddb6]">Lesson 36 · Student area</p>
            <h2 className="mt-1 text-base font-black">محتويات الدرس</h2>
            <p className="mt-2 text-sm font-bold text-white">{index + 1} / {STEP_COUNT_36} خطوة</p>
            <div role="progressbar" aria-label="التقدم بين خطوات الدرس" aria-valuemin={1} aria-valuemax={STEP_COUNT_36} aria-valuenow={index + 1} className="mt-2 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full bg-[#b8d6c0]" style={{ width: `${((index + 1) / STEP_COUNT_36) * 100}%` }} /></div>
          </div>
          {navigation("desktop")}
        </aside>

        <main className="min-w-0 flex-1" id="lesson36-main">
          <header className="rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[.13em] text-[#53676a]">Advanced Foundation · IQ200</p>
                <h1 className="mt-1 text-xl font-black leading-snug text-[#17354a] sm:text-2xl">الدرس 36: WILL vs BE GOING TO</h1>
                <p dir="ltr" className="font-en mt-1 text-left text-base font-bold text-[#43575a]">Mastering Future Decisions &amp; Predictions</p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#43575a]">إتقان التعبير عن المستقبل — المقارنة الشاملة والتطبيق العملي</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {onExit ? <ActionButton36 variant="secondary" onClick={onExit}>العودة إلى المنهج</ActionButton36> : null}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="مناطق الدرس">
              <AreaButton36 active={area === "student"} onClick={() => setArea("student")}>منطقة الطالب</AreaButton36>
              <AreaButton36 active={area === "test"} onClick={() => setArea("test")}>منطقة الاختبار</AreaButton36>
              <AreaButton36 active={area === "solutions"} disabled={!solutionsUnlocked} onClick={() => setArea("solutions")} title={!solutionsUnlocked ? "تُفتح الحلول بعد تسليم الاختبار أو دخول المعلم" : undefined}>منطقة الحلول{solutionsUnlocked ? "" : " · بعد التسليم"}</AreaButton36>
              <AreaButton36 active={area === "teacher"} onClick={() => setArea("teacher")}>منطقة المعلم</AreaButton36>
            </div>
          </header>

          <div className="mt-3 rounded-2xl border border-[#d8d2c5] bg-white p-3 shadow-sm lg:hidden">
            <button type="button" aria-expanded={mobileNavOpen} aria-controls="lesson36-mobile-nav" onClick={() => setMobileNavOpen((current) => !current)} className={`${FOCUS_36} flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-right text-sm font-black text-[#17354a]`}>
              <span>محتويات الدرس · {index + 1}/{STEP_COUNT_36}</span><span aria-hidden="true" className="font-en">{mobileNavOpen ? "−" : "+"}</span>
            </button>
            <div id="lesson36-mobile-nav" hidden={!mobileNavOpen} className="mt-3 max-h-[55vh] overflow-y-auto">{navigation("mobile")}</div>
          </div>

          <section className={area === "student" ? "mt-4 space-y-4" : "hidden"} aria-hidden={area !== "student"} data-area="lesson36-student">
            <div className="rounded-2xl border border-[#d8d2c5] bg-white px-3 py-2 text-sm font-bold text-[#43575a] lg:hidden">
              <span className="font-en" dir="ltr">Step {index + 1} of {STEP_COUNT_36}</span> · <span>{slide.title}</span>
            </div>
            <StepView36 key={slide.id} slide={slide} onGoTest={() => setArea("test")} onGoSolutions={() => setArea("solutions")} />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dedbd2] pt-4 pb-6">
              <ActionButton36 variant="secondary" disabled={index === 0} onClick={() => setStep(index - 1)}>→ السابق</ActionButton36>
              <span dir="ltr" className="font-en text-sm font-black tabular-nums text-[#53676a]">{index + 1} / {STEP_COUNT_36}</span>
              {!last ? <ActionButton36 onClick={() => setStep(index + 1)}>التالي ←</ActionButton36> : <span className="rounded-xl bg-[#edf5ee] px-4 py-3 text-sm font-black text-[#28533b]">اكتملت خطوات المصدر؛ أكمل المهمة والاختبار من المناطق أعلاه.</span>}
            </div>
          </section>

          <section className={area === "test" ? "mt-4" : "hidden"} aria-hidden={area !== "test"}>
            <TestArea36 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
          </section>

          {area === "solutions" ? (
            solutionsUnlocked ? (
              <Suspense fallback={<div role="status" className="mt-4 rounded-2xl border border-[#d8d2c5] bg-white p-4 text-[#24343b]">جارٍ تحميل الحلول التفصيلية…</div>}>
                <div className="mt-4"><SolutionsArea36 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} /></div>
              </Suspense>
            ) : <SolutionsGate36 onGoTest={() => setArea("test")} />
          ) : null}

          <section className={area === "teacher" ? "mt-4" : "hidden"} aria-hidden={area !== "teacher"}>
            <TeacherArea36 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
          </section>
        </main>
      </div>
    </div>
  );
}

function AreaButton36({ active, disabled = false, onClick, children, title }: { active: boolean; disabled?: boolean; onClick: () => void; children: ReactNode; title?: string }) {
  return (
    <button type="button" aria-pressed={active} disabled={disabled} onClick={onClick} title={title} className={`${FOCUS_36} min-h-11 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${active ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"} disabled:cursor-not-allowed disabled:border-[#e1e5df] disabled:bg-[#f5f5f2] disabled:text-[#596965]`}>
      {children}
    </button>
  );
}

function SolutionsGate36({ onGoTest }: { onGoTest: () => void }) {
  return (
    <div data-area="lesson36-solutions" data-solutions-locked className="mt-4">
      <section className="rounded-3xl border border-[#d8d2c5] bg-white p-5">
        <h2 className="text-xl font-black text-[#17354a]">منطقة الحلول مقفلة</h2>
        <p className="mt-2 text-sm leading-6 text-[#43575a]">لا توجد إجابات أو تفسيرات ظاهرة هنا قبل تسليم الاختبار. أكمل الأسئلة ثم أرسلها لفتح الحلول.</p>
        <ActionButton36 className="mt-3" onClick={onGoTest}>العودة إلى الاختبار</ActionButton36>
      </section>
    </div>
  );
}
