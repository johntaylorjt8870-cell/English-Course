// ============================================================
// Lesson33 — هيكل الدرس 33 (shell)
// أربع مناطق: الدرس (خطوات) · الاختبار (Master Test 25 سؤالًا) ·
// الحلول (مقفلة حتى الإرسال) · المعلم (كلمة مرور somer173).
// الاختبار النهائي المشترك (FINAL_TESTS[33]) يظهر في آخر خطوة.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { SECTIONS_33, SLIDES, SLIDE_COUNT_33, LAB_NAME_33 } from "./data";
import Steps33 from "./Steps33";
import TestArea33, { Solutions33 } from "./TestArea33";
import TeacherArea33 from "./TeacherArea33";
import { FOCUS33 } from "./kit33";

type Area33 = "lesson" | "test" | "solutions" | "teacher";

type SlideView33Props = {
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
export function SlideView33(p: SlideView33Props) {
  return (
    <div className="space-y-4">
      <header className="rounded-3xl border border-amber-200 bg-gradient-to-l from-amber-600 to-rose-600 p-4 text-white shadow-lg shadow-amber-200 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold text-amber-100">
              <En>{LAB_NAME_33}</En>
            </div>
            <h1 className="mt-0.5 text-xl font-black sm:text-2xl"><Rich text={p.title} /></h1>
            {p.step ? <div className="mt-1 inline-block rounded-full bg-white/20 px-3 py-0.5 text-[11px] font-black">{p.step}</div> : null}
          </div>
          <div aria-hidden className="text-4xl">{p.mascot}</div>
        </div>
        {p.lead ? <p className="mt-3 text-[13px] font-bold leading-7 text-amber-50"><Rich text={p.lead} /></p> : null}
      </header>
      <Steps33 id={p.id} onGoTest={p.onGoTest} onGoSolutions={p.onGoSolutions} />
      {p.tip ? (
        <div className="mt-3 rounded-2xl bg-gradient-to-l from-amber-600 to-rose-500 p-4 text-[13px] font-black leading-7 text-white">
          💡 <Rich text={p.tip} />
        </div>
      ) : null}
    </div>
  );
}

export default function Lesson33(_props: { onExit?: () => void }) {
  const { onExit } = _props;
  const [area, setArea] = useState<Area33>("lesson");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const [index, setIndex] = useState(0);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => Object.fromEntries(SECTIONS_33.map((s, i) => [s.id, i === 0])));
  const step = SLIDES[index];
  const currentSection = step.section;
  const isLast = index === SLIDE_COUNT_33 - 1;

  useEffect(() => {
    setOpenMap((m) => ({ ...m, [currentSection]: true }));
    document.getElementById("l33-main")?.scrollTo?.({ top: 0, behavior: "smooth" } as ScrollToOptions);
  }, [index, currentSection]);

  const rail = (
    <nav aria-label="خطوات الدرس 33" className="space-y-1">
      {SECTIONS_33.map((sec) => {
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
              className={`${FOCUS33} flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-right text-[12px] font-black transition ${
                activeSec ? "bg-amber-600 text-white" : "text-amber-900 hover:bg-amber-100"
              }`}
            >
              <span><Rich text={sec.label} /></span>
              <span aria-hidden className="text-[10px]">{open ? "▾" : "◂"}</span>
            </button>
            {open ? (
              <ol className="mt-1 space-y-0.5 pr-2">
                {slidesIn.map(({ s, i }) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-current={i === index ? "step" : undefined}
                      onClick={() => setIndex(i)}
                      className={`${FOCUS33} w-full truncate rounded-lg px-2 py-1 text-right text-[11px] font-bold transition ${
                        i === index ? "bg-amber-100 text-amber-900 ring-1 ring-amber-400" : "text-amber-800/80 hover:bg-amber-50"
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
      <div className="mt-3 space-y-1 border-t border-amber-200 pt-2">
        <button
          type="button"
          onClick={() => setArea("lesson")}
          className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}
        >
          <Rich text="📖 خطوات الدرس" />
        </button>
        <button
          type="button"
          onClick={() => setArea("test")}
          className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}
        >
          <Rich text="🧪 منطقة الاختبار" />
        </button>
        <button
          type="button"
          onClick={() => setArea("solutions")}
          className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}
        >
          <Rich text={`🔑 منطقة الحلول ${testSubmitted ? "" : "🔐"}`} />
        </button>
        <button
          type="button"
          onClick={() => setArea("teacher")}
          className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}
        >
          <Rich text="👩‍🏫 منطقة المعلم" />
        </button>
      </div>
    </nav>
  );

  const lessonMain = (
    <div className="space-y-4">
      <header className="rounded-3xl border border-amber-200 bg-gradient-to-l from-amber-600 to-rose-600 p-4 text-white shadow-lg shadow-amber-200 sm:p-6">
        <div className="flex items-center gap-2" aria-label="تقدم الدرس">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${Math.round(((index + 1) / SLIDE_COUNT_33) * 100)}%` }} />
          </div>
          <span className="text-[12px] font-black tabular-nums">{index + 1}/{SLIDE_COUNT_33}</span>
        </div>
      </header>

      <SlideView33
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
      {index === SLIDE_COUNT_33 - 1 && (
        <div className="mt-4">
          <FinalTest
            lesson={33}
            questions={FINAL_TESTS[33]}
            accent="bg-amber-700"
            onGoTeacher={() => setArea("teacher")}
          />
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pb-4">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className={`${FOCUS33} rounded-full border-2 px-4 py-2 text-[13px] font-black transition ${
            index === 0 ? "cursor-not-allowed border-amber-100 text-amber-300" : "border-amber-500 bg-white text-amber-800 hover:bg-amber-50"
          }`}
        >
          → السابق
        </button>
        {onExit ? (
          <button
            type="button"
            onClick={onExit}
            className={`${FOCUS33} rounded-full border-2 border-amber-200 bg-white px-3 py-2 text-[12px] font-black text-amber-700 hover:bg-amber-50`}
          >
            <Rich text="🏠 الرئيسية" />
          </button>
        ) : null}
        {!isLast ? (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(SLIDE_COUNT_33 - 1, i + 1))}
            className={`${FOCUS33} rounded-full border-2 border-amber-600 bg-amber-600 px-4 py-2 text-[13px] font-black text-white shadow-md shadow-amber-200 hover:bg-amber-700`}
          >
            التالي ←
          </button>
        ) : (
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-[12px] font-black text-emerald-800"><Rich text="🏁 نهاية الدرس 33" /></span>
        )}
      </div>
    </div>
  );

  const areaMain = useMemo(() => {
    if (area === "lesson") return lessonMain;
    if (area === "test")
      return (
        <div className="space-y-3">
          <BackToLesson33 onBack={() => setArea("lesson")} />
          <TestArea33 onRestart={() => setTestSubmitted(false)} onSubmitted={() => setTestSubmitted(true)} />
        </div>
      );
    if (area === "solutions")
      return (
        <div className="space-y-3">
          <BackToLesson33 onBack={() => setArea("lesson")} />
          <Solutions33 unlocked={testSubmitted} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
        </div>
      );
    return (
      <div className="space-y-3">
        <BackToLesson33 onBack={() => setArea("lesson")} />
        <TeacherArea33 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
      </div>
    );
  }, [area, lessonMain, testSubmitted, teacherUnlocked]);

  return (
    <div dir="rtl" className="mx-auto flex min-h-screen w-full max-w-6xl gap-4 bg-amber-50/40 p-3 sm:p-5" data-area="l33-lesson" data-lesson="33">
      <aside className="sticky top-4 hidden max-h-[90vh] w-64 shrink-0 overflow-y-auto rounded-3xl border border-amber-200 bg-white/90 p-3 shadow-sm lg:block">
        {rail}
      </aside>
      <MobileRail33 rail={rail} />
      <main id="l33-main" className="min-w-0 flex-1" data-area={area === "lesson" ? "l33-lesson" : area === "test" ? "l33-test" : area === "solutions" ? "l33-solutions" : "l33-teacher"}>
        {areaMain}
      </main>
    </div>
  );
}

function BackToLesson33({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className={`${FOCUS33} rounded-full border-2 border-amber-300 bg-white px-4 py-1.5 text-[12px] font-black text-amber-800 hover:bg-amber-50`}
    >
      ← العودة إلى خطوات الدرس
    </button>
  );
}

function MobileRail33({ rail }: { rail: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-3 left-3 z-30 lg:hidden">
      {open ? (
        <div className="mb-2 max-h-[70vh] w-64 overflow-y-auto rounded-3xl border-2 border-amber-300 bg-white p-3 shadow-xl" role="dialog" aria-label="خطوات الدرس 33">
          <div className="mb-1 flex justify-end">
            <button type="button" onClick={() => setOpen(false)} className={`${FOCUS33} rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black text-amber-800`}>
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
        className={`${FOCUS33} rounded-full border-2 border-amber-600 bg-amber-600 px-4 py-3 text-[13px] font-black text-white shadow-lg shadow-amber-300`}
      >
        <Rich text="🧭 الخطوات" />
      </button>
    </div>
  );
}
