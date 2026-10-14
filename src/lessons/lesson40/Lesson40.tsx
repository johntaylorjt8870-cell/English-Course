import { Suspense, lazy, useEffect, useState } from "react";
import { Signature } from "../../shared/Signature";
import { EnBidi, MixedBidi } from "./kit40";
import { StepView40 } from "./Steps40";
import { TeacherArea40 } from "./TeacherArea40";
import { TestArea40 } from "./TestArea40";
import {
  CHAPTERS_40,
  LESSON_ARABIC_SUBTITLE_40,
  LESSON_LEVEL_40,
  LESSON_SUBTITLE_40,
  LESSON_TITLE_40,
  SECTION_COUNT_40,
  SLIDES_40,
  STEP_COUNT_40,
  slidesInChapter40,
} from "./data";

export type AreaId40 = "student" | "test" | "solutions" | "teacher";

const LazySolutionsArea40 = lazy(() => import("./SolutionsArea40"));

export default function Lesson40({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<AreaId40>("student");
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState<boolean>(false);

  const currentSlide = SLIDES_40[stepIndex] ?? SLIDES_40[0];
  const currentChapter = CHAPTERS_40.find((c) => c.id === currentSlide.section) ?? CHAPTERS_40[0];
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  useEffect(() => {
    if (typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent || "")) return;
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [area, stepIndex]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (area !== "student") return;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("button, a, input, textarea, select, [contenteditable='true']")) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setStepIndex((prev) => Math.min(STEP_COUNT_40 - 1, prev + 1));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setStepIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setStepIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setStepIndex(STEP_COUNT_40 - 1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [area]);

  function handleChangeAnswer(questionId: string, value: string) {
    setTestAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleSubmitTest() {
    setTestSubmitted(true);
    setArea("solutions");
  }

  function handleResetTest() {
    setTestAnswers({});
    setTestSubmitted(false);
    setArea("test");
  }

  return (
    <div dir="rtl" data-lesson="40" className="min-h-screen bg-[#f5f3ed] text-[#24343b] pb-16">
      {/* الترويسة الرئيسية للدرس 40 */}
      <header className="border-b border-[#d5d0c3] bg-[#fffdf8]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#/"
                onClick={() => onExit?.()}
                className="rounded-xl border border-[#c7c2b4] bg-[#f5f3ed] px-3 py-1.5 text-xs font-extrabold text-[#17354a] hover:border-[#245f62]"
              >
                🏠 الرئيسية
              </a>
              <a
                href="#/lesson/39"
                className="rounded-xl border border-[#c7c2b4] bg-[#ffffff] px-3 py-1.5 text-xs font-extrabold text-[#245f62] hover:border-[#17354a]"
              >
                ← الدرس 39: Future Perfect Continuous
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#95b8b1] bg-[#eef4f0] px-3 py-1 text-xs font-extrabold text-[#245f62]">
                {`${SECTION_COUNT_40} قسمًا مرقّمًا + الغلاف`}
              </span>
              <span className="rounded-full border border-[#d4b475] bg-[#fbf6eb] px-3 py-1 text-xs font-extrabold text-[#76531e]">
                {LESSON_LEVEL_40}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div
              dir="ltr"
              lang="en"
              style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
              className="font-mono text-sm sm:text-base font-extrabold text-[#245f62]"
            >
              <EnBidi>{`${LESSON_TITLE_40} · ${LESSON_SUBTITLE_40}`}</EnBidi>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#17354a]">
              <MixedBidi>{LESSON_ARABIC_SUBTITLE_40}</MixedBidi>
            </h1>
          </div>

          {/* شريط المناطق الأربع المستقلة */}
          <nav aria-label="مناطق الدرس 40" className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            <button
              type="button"
              aria-current={area === "student" ? "page" : undefined}
              onClick={() => setArea("student")}
              className={`rounded-2xl border px-4 py-3 text-right transition cursor-pointer ${
                area === "student"
                  ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                  : "border-[#c7c2b4] bg-[#ffffff] text-[#17354a] hover:border-[#245f62]"
              }`}
            >
              <div className="text-xs font-extrabold">منطقة الطالب</div>
              <div className="text-xs font-semibold">
                {`الخطوة ${stepIndex + 1} من ${STEP_COUNT_40}`}
              </div>
            </button>

            <button
              type="button"
              aria-current={area === "test" ? "page" : undefined}
              onClick={() => setArea("test")}
              className={`rounded-2xl border px-4 py-3 text-right transition cursor-pointer ${
                area === "test"
                  ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                  : "border-[#c7c2b4] bg-[#ffffff] text-[#17354a] hover:border-[#245f62]"
              }`}
            >
              <div className="text-xs font-extrabold">منطقة الاختبار المستقلة</div>
              <div className="text-xs font-semibold">
                {testSubmitted ? "25 سؤالًا (تم التسليم ✅)" : "25 سؤالًا (5 مستويات × 5)"}
              </div>
            </button>

            <button
              type="button"
              disabled={!solutionsUnlocked}
              aria-current={area === "solutions" ? "page" : undefined}
              onClick={() => {
                if (solutionsUnlocked) setArea("solutions");
              }}
              className={`rounded-2xl border px-4 py-3 text-right transition ${
                !solutionsUnlocked
                  ? "border-[#c7c2b4] bg-[#e9e5da] text-[#596965] cursor-not-allowed"
                  : area === "solutions"
                    ? "border-[#28533b] bg-[#28533b] text-[#ffffff] cursor-pointer"
                    : "border-[#8fb69a] bg-[#edf5ee] text-[#28533b] hover:border-[#28533b] cursor-pointer"
              }`}
            >
              <div className="text-xs font-extrabold">
                {solutionsUnlocked ? "منطقة الحلول التفصيلية ✅" : "منطقة الحلول 🔒"}
              </div>
              <div className="text-xs font-semibold">
                {solutionsUnlocked ? "مفتوحة للمراجعة" : "تُفتح بعد تسليم الاختبار"}
              </div>
            </button>

            <button
              type="button"
              aria-current={area === "teacher" ? "page" : undefined}
              onClick={() => setArea("teacher")}
              className={`rounded-2xl border px-4 py-3 text-right transition cursor-pointer ${
                area === "teacher"
                  ? "border-[#76531e] bg-[#76531e] text-[#ffffff]"
                  : "border-[#d4b475] bg-[#fbf6eb] text-[#76531e] hover:border-[#76531e]"
              }`}
            >
              <div className="text-xs font-extrabold">
                {teacherUnlocked ? "مساحة المعلم 🔓" : "مساحة المعلم 🔐"}
              </div>
              <div className="text-xs font-semibold">دليل التدريس ومفاتيح الحلول</div>
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-6 space-y-6">
        {area === "student" ? (
          <div className="space-y-5">
            {/* شريط فصول التنقل والخطوات */}
            <div className="rounded-2xl border border-[#d5d0c3] bg-[#fffdf8] p-4 space-y-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-extrabold text-[#17354a]">
                  <MixedBidi>{`الفصل الحالي: ${currentChapter.label} (${currentChapter.en})`}</MixedBidi>
                </span>
                <span className="text-xs font-bold text-[#43575a]">
                  {`الخطوة ${stepIndex + 1} من ${STEP_COUNT_40} — تنقّل سريع بالأسهم (← التالي · → السابق)`}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {CHAPTERS_40.map((ch) => {
                  const firstSlideIdx = SLIDES_40.findIndex((s) => s.section === ch.id);
                  const active = ch.id === currentChapter.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        if (firstSlideIdx >= 0) setStepIndex(firstSlideIdx);
                      }}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                        active
                          ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                          : "border-[#c7c2b4] bg-[#f5f3ed] text-[#24343b] hover:border-[#245f62]"
                      }`}
                    >
                      <MixedBidi>{ch.label}</MixedBidi>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#e4dfd2]">
                {slidesInChapter40(currentChapter.id).map(({ slide, index }) => {
                  const isCurrent = index === stepIndex;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      aria-current={isCurrent ? "step" : undefined}
                      onClick={() => setStepIndex(index)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
                        isCurrent
                          ? "border-[#245f62] bg-[#245f62] text-[#ffffff]"
                          : "border-[#d5d0c3] bg-[#ffffff] text-[#17354a] hover:border-[#245f62]"
                      }`}
                    >
                      <MixedBidi>{slide.title}</MixedBidi>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* محتوى الخطوة الحالية */}
            <StepView40
              stepIndex={stepIndex}
              testSubmitted={testSubmitted}
              teacherUnlocked={teacherUnlocked}
              onOpenTest={() => setArea("test")}
              onOpenSolutions={() => {
                if (solutionsUnlocked) setArea("solutions");
              }}
              onOpenTeacher={() => setArea("teacher")}
            />

            {/* أزرار التنقل السفلي بين الخطوات */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#d5d0c3] bg-[#fffdf8] p-4 shadow-sm">
              <button
                type="button"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition ${
                  stepIndex === 0
                    ? "border border-[#c7c2b4] bg-[#e9e5da] text-[#596965] cursor-not-allowed"
                    : "border border-[#17354a] bg-[#ffffff] text-[#17354a] hover:bg-[#eef4f0] cursor-pointer"
                }`}
              >
                → الخطوة السابقة
              </button>

              <span className="text-xs sm:text-sm font-extrabold text-[#17354a]">
                <MixedBidi>{`${stepIndex + 1} / ${STEP_COUNT_40} — ${currentSlide.title}`}</MixedBidi>
              </span>

              {stepIndex < STEP_COUNT_40 - 1 ? (
                <button
                  type="button"
                  onClick={() => setStepIndex((prev) => Math.min(STEP_COUNT_40 - 1, prev + 1))}
                  className="rounded-xl bg-[#17354a] px-5 py-2.5 text-xs sm:text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
                >
                  الخطوة التالية ←
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setArea("test")}
                  className="rounded-xl bg-[#245f62] px-5 py-2.5 text-xs sm:text-sm font-extrabold text-[#ffffff] hover:bg-[#17354a] cursor-pointer"
                >
                  انتقل إلى الاختبار النهائي الشامل (25 سؤالًا) ←
                </button>
              )}
            </div>
          </div>
        ) : null}

        {area === "test" ? (
          <TestArea40
            answers={testAnswers}
            onChangeAnswer={handleChangeAnswer}
            submitted={testSubmitted}
            onSubmit={handleSubmitTest}
            onReset={handleResetTest}
            onOpenSolutions={() => {
              if (solutionsUnlocked) setArea("solutions");
            }}
            onBackToStudent={() => setArea("student")}
          />
        ) : null}

        {area === "solutions" && solutionsUnlocked ? (
          <Suspense
            fallback={
              <div className="rounded-2xl border border-[#c8c3b4] bg-[#fffdf8] p-6 text-sm font-extrabold text-[#17354a]">
                جارٍ تحميل الحلول التفصيلية...
              </div>
            }
          >
            <LazySolutionsArea40
              answers={testAnswers}
              onBackToTest={() => setArea("test")}
              onBackToStudent={() => setArea("student")}
            />
          </Suspense>
        ) : null}

        {area === "teacher" ? (
          <TeacherArea40
            unlocked={teacherUnlocked}
            onUnlock={() => setTeacherUnlocked(true)}
            onLock={() => setTeacherUnlocked(false)}
            onJumpToStep={(idx) => {
              setStepIndex(idx);
              setArea("student");
            }}
            onOpenTest={() => setArea("test")}
            onOpenSolutions={() => setArea("solutions")}
            onBackToStudent={() => setArea("student")}
          />
        ) : null}

        <Signature />
      </main>
    </div>
  );
}
