import "./lesson38.css";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import LessonStepNav from "../../shared/LessonStepNav";
import { Rich } from "../../shared/lessonKit";
import { ActionButton38, FOCUS_38, FinishLine38, TenseChip38 } from "./kit38";
import {
  CHAPTERS_38,
  LESSON_ARABIC_SUBTITLE_38,
  LESSON_IDENTITY_38,
  LESSON_LEVEL_38,
  LESSON_SUBTITLE_38,
  LESSON_TITLE_AR_38,
  SLIDES_38,
  STEP_COUNT_38,
  type ChapterId38,
} from "./data";
import StepView38 from "./Steps38";
import TestArea38 from "./TestArea38";
import TeacherArea38 from "./TeacherArea38";

const SolutionsArea38 = lazy(() => import("./SolutionsArea38"));

type Area38 = "lesson" | "test" | "solutions" | "teacher";

const AREA_LABEL_38: Record<Area38, string> = {
  lesson: "منطقة الطالب",
  test: "منطقة الاختبار",
  solutions: "منطقة الحلول",
  teacher: "منطقة المعلم",
};

const VISITED_KEY_38 = "l38-finish-line-visited-v1";

export default function Lesson38({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area38>("lesson");
  const [index, setIndex] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [openChapters, setOpenChapters] = useState<Record<ChapterId38, boolean>>(() => ({
    arrive: true,
    frame: false,
    deadline: false,
    clause: false,
    control: false,
    compare: false,
    practice: false,
    read: false,
    wrap: false,
  }));
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(() => new Set([SLIDES_38[0].id]));
  const mainRef = useRef<HTMLElement | null>(null);
  const firstRender = useRef(true);

  const slide = SLIDES_38[index];
  const isLast = index === STEP_COUNT_38 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  const goTo = (next: number) => {
    setIndex(Math.max(0, Math.min(STEP_COUNT_38 - 1, next)));
    setArea("lesson");
    setMobileNav(false);
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITED_KEY_38);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const known = new Set(SLIDES_38.map((candidate) => candidate.id));
      const restored = parsed.filter((id) => typeof id === "string" && known.has(id));
      if (restored.length) setVisited(new Set<string>([...restored, SLIDES_38[0].id]));
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
      localStorage.setItem(VISITED_KEY_38, JSON.stringify([...visited]));
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
      if (target?.closest?.("input, textarea, select, button, a, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") setIndex((current) => Math.min(STEP_COUNT_38 - 1, current + 1));
      else if (event.key === "ArrowRight") setIndex((current) => Math.max(0, current - 1));
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(STEP_COUNT_38 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area]);

  const chapterOfSlide = CHAPTERS_38.find((chapter) => chapter.id === slide.section);
  const chapterSteps = useMemo(
    () =>
      CHAPTERS_38.map((chapter) => ({
        chapter,
        steps: SLIDES_38.map((candidate, stepIndex) => ({ candidate, stepIndex })).filter(
          ({ candidate }) => candidate.section === chapter.id,
        ),
      })),
    [],
  );

  const nav = (prefix: string) => (
    <nav aria-label="محتويات الدرس 38" className="space-y-1.5">
      {chapterSteps.map(({ chapter, steps }) => {
        const expanded = openChapters[chapter.id];
        const active = slide.section === chapter.id;
        const done = steps.filter(({ candidate }) => visited.has(candidate.id)).length;
        return (
          <section key={chapter.id} className="fp38-chapter">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`${prefix}-chapter-${chapter.id}`}
              data-active={active}
              onClick={() => setOpenChapters((current) => ({ ...current, [chapter.id]: !current[chapter.id] }))}
              className={`fp38-chapter__button ${FOCUS_38}`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-black leading-6">{chapter.title}</span>
                <span dir="ltr" className="font-en block text-[10px] font-black tracking-[.12em] text-[#a8627f]">
                  {chapter.en}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span dir="ltr" className="font-en text-[10px] font-black tabular-nums text-[#9f1239]">
                  {done}/{steps.length}
                </span>
                <span aria-hidden className="font-black text-[#9f1239]">
                  {expanded ? "−" : "+"}
                </span>
              </span>
            </button>
            {expanded ? (
              <ol id={`${prefix}-chapter-${chapter.id}`} className="space-y-0.5 border-t border-[#f6e6e0] p-1.5">
                {steps.map(({ candidate, stepIndex }) => {
                  const current = stepIndex === index;
                  return (
                    <li key={candidate.id}>
                      <button
                        type="button"
                        data-step-nav={candidate.id}
                        aria-current={current ? "step" : undefined}
                        onClick={() => goTo(stepIndex)}
                        className={`fp38-stepnav-item ${FOCUS_38}`}
                      >
                        <span className="fp38-stepnav-num">{String(stepIndex + 1).padStart(2, "0")}</span>
                        <span className="min-w-0">
                          <span className="sr-only">خطوة {stepIndex + 1}: </span>
                          <Rich text={candidate.title} />
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

  const progress = Math.round(((index + 1) / STEP_COUNT_38) * 100);

  return (
    <div dir="rtl" data-lesson="38" data-lesson-identity="finish-line-studio" className="fp38-shell min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-[92rem] gap-4 p-3 sm:p-5">
        <aside className="fp38-sidebar hidden w-[19rem] shrink-0 p-3 lg:block" aria-label="موجز الدرس ومحتوياته">
          <div className="fp38-progress">
            <FinishLine38 label="FINISH LINE" />
            <p className="mt-2 text-[10px] font-black uppercase tracking-[.16em] text-[#ffe9ae]">Lesson 38 · Finish Line Studio</p>
            <h2 className="mt-0.5 text-base font-black">المستقبل التام</h2>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-xs font-bold text-[#ffe9ae]">
                خطوتك <span dir="ltr" className="font-en tabular-nums">{index + 1}</span> من{" "}
                <span dir="ltr" className="font-en tabular-nums">{STEP_COUNT_38}</span>
              </p>
              <span dir="ltr" className="font-en text-xs font-black tabular-nums text-[#ffe9ae]">{progress}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="التقدم بين خطوات الدرس"
              aria-valuemin={1}
              aria-valuemax={STEP_COUNT_38}
              aria-valuenow={index + 1}
              className="fp38-progress__track mt-2"
            >
              <div className="fp38-progress__fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <TenseChip38 tense="perfect" />
            <span className="fp38-badge">25 سؤالًا</span>
          </div>
          <div className="mt-3">{nav("desktop")}</div>
        </aside>

        <main ref={mainRef} className="min-w-0 flex-1" id="lesson38-main">
          <header className="fp38-hero p-4 sm:p-5">
            <span aria-hidden className="fp38-hero__flag">
              🏁
            </span>
            <FinishLine38 label="BY TOMORROW" />
            <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p dir="ltr" className="fp38-eyebrow font-en">LESSON 38 · FINISH LINE STUDIO</p>
                <h1 className="mt-1 text-xl font-black leading-snug text-[#3f1233] sm:text-2xl">
                  <Rich text={LESSON_TITLE_AR_38} />
                </h1>
                <p dir="ltr" className="font-en mt-1 text-left text-base font-black text-[#9f1239]">
                  {LESSON_SUBTITLE_38}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-[#6b4a5e]">{LESSON_ARABIC_SUBTITLE_38}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="fp38-badge">{LESSON_LEVEL_38}</span>
                <span className="fp38-badge">
                  <span dir="ltr" className="font-en tabular-nums">{STEP_COUNT_38}</span> خطوة قصيرة
                </span>
                {onExit ? (
                  <ActionButton38 variant="secondary" onClick={onExit}>
                    العودة إلى المنهج
                  </ActionButton38>
                ) : null}
              </div>
            </div>

            <div className="mt-3 fp38-chip-row">
              <TenseChip38 tense="simple" />
              <TenseChip38 tense="continuous" />
              <TenseChip38 tense="perfect" />
            </div>

            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="مناطق الدرس 38">
              <AreaButton38 active={area === "lesson"} onClick={() => setArea("lesson")} icon="🏁">
                منطقة الطالب
              </AreaButton38>
              <AreaButton38 active={area === "test"} onClick={() => setArea("test")} icon="🏆">
                منطقة الاختبار
              </AreaButton38>
              <AreaButton38 active={area === "solutions"} onClick={() => setArea("solutions")} icon="🔑" badge={solutionsUnlocked ? undefined : "بعد التسليم"}>
                منطقة الحلول
              </AreaButton38>
              <AreaButton38 active={area === "teacher"} onClick={() => setArea("teacher")} icon="🔐">
                منطقة المعلم
              </AreaButton38>
            </div>
          </header>

          <div className="mt-3 rounded-2xl border border-[#f0d9d2] bg-white p-3 shadow-sm lg:hidden">
            <button
              type="button"
              aria-expanded={mobileNav}
              aria-controls="lesson38-mobile-nav"
              onClick={() => setMobileNav((current) => !current)}
              className={`${FOCUS_38} flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-right text-sm font-black text-[#3f1233]`}
            >
              <span>
                محتويات الدرس ·{" "}
                <span dir="ltr" className="font-en tabular-nums">
                  {index + 1}/{STEP_COUNT_38}
                </span>
              </span>
              <span aria-hidden>{mobileNav ? "▲" : "▼"}</span>
            </button>
            <div
              role="progressbar"
              aria-label="التقدم في نسخة الهاتف"
              aria-valuemin={1}
              aria-valuemax={STEP_COUNT_38}
              aria-valuenow={index + 1}
              className="mt-2 h-2 overflow-hidden rounded-full bg-[#f6e3de]"
            >
              <div className="h-full rounded-full bg-[#9f1239]" style={{ width: `${progress}%` }} />
            </div>
            {mobileNav ? (
              <div id="lesson38-mobile-nav" className="mt-3 max-h-[60vh] overflow-y-auto">
                {nav("mobile")}
              </div>
            ) : null}
          </div>

          <section data-area="lesson38-student" className={area === "lesson" ? "mt-3" : "hidden"} aria-hidden={area !== "lesson"}>
            <StepView38 slide={slide} onGoTest={() => setArea("test")} onGoSolutions={() => setArea("solutions")} />
            <div className="mt-4 pb-4">
              <LessonStepNav
                ariaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 38" : "التنقل في منطقة الدرس 38"}
                onPrev={() => goTo(index - 1)}
                onNext={() => goTo(index + 1)}
                prevDisabled={index === 0}
                showNext={!isLast}
                prevLabel="→ السابق"
                nextLabel="التالي ←"
                prevClassName="!rounded-xl !border-[#e9b9c6] !bg-white !px-4 !py-2.5 !text-sm !font-black !text-[#9f1239] hover:!bg-[#fff1f2] disabled:!text-[#9b8188]"
                nextClassName="!rounded-xl !border-[#9f1239] !bg-[#9f1239] !px-4 !py-2.5 !text-sm !font-black !text-white hover:!bg-[#881337]"
              >
                <span className="flex min-w-0 flex-wrap items-center justify-center gap-1.5 rounded-full border border-[#f3d2d9] bg-white px-3 py-1.5 text-xs font-black text-[#3f1233]">
                  <span aria-hidden>🏁</span>
                  <span dir="ltr" className="font-en tabular-nums">
                    {index + 1}/{STEP_COUNT_38}
                  </span>
                  <span className="max-w-[14rem] truncate">
                    <Rich text={chapterOfSlide?.title ?? ""} />
                  </span>
                </span>
              </LessonStepNav>
              {isLast ? (
                <p className="mt-2 rounded-xl bg-[#fff8e8] px-3 py-2 text-center text-sm font-black text-[#7c4a03]">
                  اكتملت خطوات الدرس — أكمل مهمة الكتابة ثم الاختبار الرسمي من المناطق أعلاه.
                </p>
              ) : null}
            </div>
          </section>

          <section className={area === "test" ? "mt-3" : "hidden"} aria-hidden={area !== "test"}>
            <TestArea38 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
          </section>

          {area === "solutions" ? (
            solutionsUnlocked ? (
              <Suspense
                fallback={
                  <div role="status" className="mt-3 rounded-2xl border border-[#f0d9d2] bg-white p-4 text-sm font-bold text-[#6b4a5e]">
                    جارٍ تحميل الحلول التفصيلية…
                  </div>
                }
              >
                <div className="mt-3">
                  <SolutionsArea38 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
                </div>
              </Suspense>
            ) : (
              <SolutionsGate38 onGoTest={() => setArea("test")} />
            )
          ) : null}

          <section className={area === "teacher" ? "mt-3" : "hidden"} aria-hidden={area !== "teacher"}>
            <TeacherArea38 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
          </section>
        </main>
      </div>
    </div>
  );
}

function AreaButton38({
  active,
  onClick,
  children,
  icon,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  icon: string;
  badge?: string;
}) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`fp38-tab ${FOCUS_38} inline-flex items-center gap-1.5`}>
      <span aria-hidden>{icon}</span>
      <span>{children}</span>
      {badge ? <span className="rounded-full bg-[#fff8e1] px-1.5 py-0.5 text-[9px] font-black text-[#7c4a03]">{badge}</span> : null}
    </button>
  );
}

function SolutionsGate38({ onGoTest }: { onGoTest: () => void }) {
  return (
    <div data-area="lesson38-solutions" data-solutions-locked className="mt-3">
      <section className="fp38-card">
        <FinishLine38 label="LOCKED" />
        <h2 className="mt-2 text-xl font-black text-[#3f1233]">منطقة الحلول مقفلة</h2>
        <p className="mt-2 text-sm leading-7 text-[#6b4a5e]">
          لا توجد إجابات أو تفسيرات ظاهرة هنا قبل تسليم الاختبار. أكمل الأسئلة الـ25 ثم أرسلها لفتح الحلول، أو ادخل بكلمة مرور المعلم من منطقة المعلم.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton38 onClick={onGoTest}>العودة إلى الاختبار</ActionButton38>
        </div>
      </section>
    </div>
  );
}
