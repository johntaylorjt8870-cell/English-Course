// ============================================================
// Lesson34 — هيكل الدرس 34 (shell)
// أربع مناطق: الدرس (خطوات) · الاختبار (Future Simple Master Test) ·
// الحلول (مقفلة حتى الإرسال) · المعلم (كلمة مرور المعلم).
// الاختبار النهائي المشترك (FINAL_TESTS[34]) يظهر في آخر خطوة.
// الهوية البصرية: خلفية عاجية دافئة + أخضر مزرقّ (teal) أساسي.
// ============================================================

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { SECTIONS_34, SLIDES, SLIDE_COUNT_34, LAB_NAME_34 } from "./data";
import Steps34 from "./Steps34";
import TestArea34, { Solutions34 } from "./TestArea34";
import TeacherArea34 from "./TeacherArea34";
import { FOCUS34 } from "./kit34";

type Area34 = "lesson" | "test" | "solutions" | "teacher";

type SlideView34Props = {
  id: string;
  title: string;
  lead?: string;
  tip?: string;
  step?: string;
  mascot: string;
  section: string;
  onGoTest: () => void;
  onGoSolutions: () => void;
};

/** لوحة الخطوة (تُرسم داخل غلاف الدرس، وتُستخدم أيضًا في SSR أثناء التدقيق) */
export function SlideView34(p: SlideView34Props) {
  return (
    <div className="space-y-4">
      <header className="rounded-3xl border border-teal-200 bg-gradient-to-l from-teal-700 to-sky-700 p-4 text-white shadow-lg shadow-teal-200/60 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold text-teal-100">
              <En>{LAB_NAME_34}</En>
            </div>
            <h1 className="mt-0.5 text-xl font-black sm:text-2xl">
              <Rich text={p.title} />
            </h1>
            {p.step ? (
              <div className="mt-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-black">{p.step}</div>
            ) : null}
          </div>
          <div aria-hidden className="text-4xl">
            {p.mascot}
          </div>
        </div>
        {p.lead ? (
          <p className="mt-3 text-[13px] font-bold leading-7 text-teal-50">
            <Rich text={p.lead} />
          </p>
        ) : null}
      </header>
      <Steps34 id={p.id} onGoTest={p.onGoTest} onGoSolutions={p.onGoSolutions} />
      {p.tip ? (
        <div className="mt-3 rounded-2xl bg-gradient-to-l from-teal-700 to-sky-600 p-4 text-[13px] font-black leading-7 text-white">
          💡 <Rich text={p.tip} />
        </div>
      ) : null}
    </div>
  );
}

export default function Lesson34(_props: { onExit?: () => void }) {
  const { onExit } = _props;
  const [area, setArea] = useState<Area34>("lesson");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [index, setIndex] = useState(0);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(SECTIONS_34.map((s, i) => [s.id, i === 0])),
  );
  const step = SLIDES[index];
  const currentSection = step.section;
  const isLast = index === SLIDE_COUNT_34 - 1;

  useEffect(() => {
    setOpenMap((m) => ({ ...m, [currentSection]: true }));
    document.getElementById("l34-main")?.scrollTo?.({ top: 0, behavior: "smooth" } as ScrollToOptions);
  }, [index, currentSection]);

  const rail = (
    <nav aria-label="خطوات الدرس 34" className="space-y-1">
      {SECTIONS_34.map((sec) => {
        const slidesIn = SLIDES.map((s, i) => ({ s, i })).filter((x) => x.s.section === sec.id);
        const firstIdx = slidesIn[0]?.i ?? 0;
        const open = !!openMap[sec.id];
        const activeSec = currentSection === sec.id;
        return (
          <div key={sec.id}>
            <button
              type="button"
              aria-expanded={open}
              onClick={() => {
                setOpenMap((m) => ({ ...m, [sec.id]: !m[sec.id] }));
                if (!open) setIndex(firstIdx);
              }}
              className={`${FOCUS34} flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-right text-[12px] font-black transition ${
                activeSec ? "bg-teal-700 text-white" : "text-teal-900 hover:bg-teal-100"
              }`}
            >
              <span>
                <Rich text={sec.label} />
              </span>
              <span aria-hidden className="text-[10px]">
                {open ? "▾" : "◂"}
              </span>
            </button>
            {open ? (
              <ol className="mt-1 space-y-0.5 pr-2">
                {slidesIn.map(({ s, i }) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-current={i === index ? "step" : undefined}
                      onClick={() => setIndex(i)}
                      className={`${FOCUS34} w-full truncate rounded-lg px-2 py-1 text-right text-[11px] font-bold transition ${
                        i === index
                          ? "bg-teal-100 text-teal-900 ring-1 ring-teal-400"
                          : "text-teal-800/80 hover:bg-teal-50"
                      }`}
                    >
                      <Rich text={s.title} />
                    </button>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        );
      })}
      <div className="mt-3 space-y-1 border-t border-teal-200 pt-2">
        <button
          type="button"
          onClick={() => setArea("lesson")}
          className={`${FOCUS34} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-teal-900 hover:bg-teal-100`}
        >
          <Rich text="📖 خطوات الدرس" />
        </button>
        <button
          type="button"
          onClick={() => setArea("test")}
          className={`${FOCUS34} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-teal-900 hover:bg-teal-100`}
        >
          <Rich text="🧪 منطقة الاختبار" />
        </button>
        <button
          type="button"
          onClick={() => setArea("solutions")}
          className={`${FOCUS34} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-teal-900 hover:bg-teal-100`}
        >
          <Rich text={`🔑 منطقة الحلول ${testSubmitted ? "" : "🔐"}`} />
        </button>
        <button
          type="button"
          onClick={() => setArea("teacher")}
          className={`${FOCUS34} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-teal-900 hover:bg-teal-100`}
        >
          <Rich text="👩‍🏫 منطقة المعلم" />
        </button>
      </div>
    </nav>
  );

  const lessonMain = (
    <div className="space-y-4">
      <header className="rounded-3xl border border-teal-200 bg-gradient-to-l from-teal-700 to-sky-700 p-4 text-white shadow-lg shadow-teal-200/60 sm:p-6">
        <div className="flex items-center gap-2" aria-label="تقدم الدرس">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${Math.round(((index + 1) / SLIDE_COUNT_34) * 100)}%` }}
            />
          </div>
          <span className="text-[12px] font-black tabular-nums">{index + 1}/{SLIDE_COUNT_34}</span>
        </div>
      </header>

      <SlideView34
        id={step.id}
        title={step.title}
        lead={step.lead}
        tip={step.tip}
        step={step.step}
        mascot={step.mascot}
        section={step.section}
        onGoTest={() => setArea("test")}
        onGoSolutions={() => setArea("solutions")}
      />

      {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
      {index === SLIDE_COUNT_34 - 1 ? (
        <div className="mt-4">
          <FinalTest
            lesson={34}
            questions={FINAL_TESTS[34]}
            accent="bg-teal-700"
            onGoTeacher={() => setArea("teacher")}
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-2 pb-4">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className={`${FOCUS34} rounded-full border-2 px-4 py-2 text-[13px] font-black transition ${
            index === 0 ? "cursor-not-allowed border-teal-100 text-teal-300" : "border-teal-500 bg-white text-teal-800 hover:bg-teal-50"
          }`}
        >
          → السابق
        </button>
        {onExit ? (
          <button
            type="button"
            onClick={onExit}
            className={`${FOCUS34} rounded-full border-2 border-teal-200 bg-white px-3 py-2 text-[12px] font-black text-teal-700 hover:bg-teal-50`}
          >
            <Rich text="🏠 الرئيسية" />
          </button>
        ) : null}
        {!isLast ? (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(SLIDE_COUNT_34 - 1, i + 1))}
            className={`${FOCUS34} rounded-full border-2 border-teal-600 bg-teal-600 px-4 py-2 text-[13px] font-black text-white shadow-md shadow-teal-200 hover:bg-teal-700`}
          >
            التالي ←
          </button>
        ) : (
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-[12px] font-black text-emerald-800">
            <Rich text="🏁 نهاية الدرس 34" />
          </span>
        )}
      </div>
    </div>
  );

  const areaMain = useMemo(() => {
    if (area === "lesson") return lessonMain;
    if (area === "test")
      return (
        <div className="space-y-3">
          <BackToLesson34 onBack={() => setArea("lesson")} />
          <TestArea34 onRestart={() => setTestSubmitted(false)} onSubmitted={() => setTestSubmitted(true)} />
        </div>
      );
    if (area === "solutions")
      return (
        <div className="space-y-3">
          <BackToLesson34 onBack={() => setArea("lesson")} />
          <Solutions34 unlocked={testSubmitted} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
        </div>
      );
    return (
      <div className="space-y-3">
        <BackToLesson34 onBack={() => setArea("lesson")} />
        <TeacherArea34
          unlocked={teacherUnlocked}
          onUnlockChange={setTeacherUnlocked}
          onGoSolutions={() => setArea("solutions")}
        />
      </div>
    );
  }, [area, lessonMain, testSubmitted, teacherUnlocked]);

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-screen w-full max-w-6xl gap-4 bg-[#faf7f1] p-3 sm:p-5"
      data-area="l34-lesson"
      data-lesson="34"
    >
      <aside className="sticky top-4 hidden max-h-[90vh] w-64 shrink-0 overflow-y-auto rounded-3xl border border-teal-200 bg-white/90 p-3 shadow-sm lg:block">
        {rail}
      </aside>
      <MobileRail34 rail={rail} />
      <main
        id="l34-main"
        className="min-w-0 flex-1"
        data-area={
          area === "lesson" ? "l34-lesson" : area === "test" ? "l34-test" : area === "solutions" ? "l34-solutions" : "l34-teacher"
        }
      >
        {areaMain}
      </main>
    </div>
  );
}

function BackToLesson34({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className={`${FOCUS34} rounded-full border-2 border-teal-300 bg-white px-4 py-1.5 text-[12px] font-black text-teal-800 hover:bg-teal-50`}
    >
      ← العودة إلى خطوات الدرس
    </button>
  );
}

function MobileRail34({ rail }: { rail: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-3 left-3 z-30 lg:hidden">
      {open ? (
        <div
          className="mb-2 max-h-[70vh] w-64 overflow-y-auto rounded-3xl border-2 border-teal-300 bg-white p-3 shadow-xl"
          role="dialog"
          aria-label="خطوات الدرس 34"
        >
          <div className="mb-1 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={`${FOCUS34} rounded-full bg-teal-100 px-3 py-1 text-[11px] font-black text-teal-800`}
            >
              إغلاق ✕
            </button>
          </div>
          {rail}
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="قائمة خطوات الدرس"
        className={`${FOCUS34} rounded-full border-2 border-teal-600 bg-teal-600 px-4 py-3 text-[13px] font-black text-white shadow-lg shadow-teal-200`}
      >
        <Rich text="🧭 الخطوات" />
      </button>
    </div>
  );
}
