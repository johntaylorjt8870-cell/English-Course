// ============================================================
// Lesson 33 — The Four Present Tenses · مختبر الحاضر
// 🧪 PRESENT LAB — بوصلة الأزمنة الأربعة
// Rebuild: warm ivory LAB, four distinct lenses, generous width,
// compact header, journey strip, hero band.
// Preserve: all source steps, test 25q, solutions gating, teacher pwd,
// routing, ledger 1:1, and existing audit contracts.
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { SECTIONS_33, SLIDES, SLIDE_COUNT_33, LAB_NAME_33, LESSON_TITLE_33, LESSON_SUBTITLE_33, LAB_MOTTO_33 } from "./data";
import { SOURCE_SECTIONS_33, SOURCE_NUMBERED_COUNT_33, SOURCE_LEDGER_COUNT_33 } from "./ledger33";
import Steps33 from "./Steps33";
import TestArea33, { Solutions33 } from "./TestArea33";
import TeacherArea33 from "./TeacherArea33";
import { FOCUS33 } from "./kit33";
import "./lesson33.css";

type Area33 = "lesson" | "test" | "solutions" | "teacher";

const AREAS_33: { id: Area33; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "خطوات الدرس" },
  { id: "test", emoji: "🧪", ar: "منطقة الاختبار" },
  { id: "solutions", emoji: "🔑", ar: "منطقة الحلول" },
  { id: "teacher", emoji: "👩‍🏫", ar: "منطقة المعلم" },
];

function navLabel33(title: string): string {
  return title.split(" — ")[0].split(" · ")[0];
}

function isArrowLocked33(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.getAttribute?.("contentEditable") === "true") return true;
  if (el.closest?.("[data-keynav-lock]")) return true;
  if (el.getAttribute?.("role") === "slider") return true;
  return false;
}

// Derived counts for rail footer
const SOURCE_LINES_33 = SOURCE_SECTIONS_33.reduce((n, sec) => n + sec.units.length, 0);

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

export function SlideView33(p: SlideView33Props) {
  const sectionLabel = SECTIONS_33.find((s) => s.id === p.section)?.label ?? "";
  const sectionIndex = SECTIONS_33.findIndex((s) => s.id === p.section);
  const SHORT: Record<string, string> = {
    INTRO: "البداية",
    MAP: "الخريطة",
    TOOLS: "الأدوات",
    DUELS: "المواجهات",
    DRILL: "التدريب",
    READ: "القراءة",
    MASTER: "الاختبار",
    END: "الخاتمة",
  };
  const total = SECTIONS_33.length;
  return (
    <div className="l33-frame space-y-2.5">
      <nav aria-label="رحلة الدرس" className="l33-journey" data-journey-section={p.section}>
        <ol className="flex w-full items-center gap-0 overflow-x-auto py-1" dir="rtl">
          {SECTIONS_33.map((sec, i) => {
            const state = i < sectionIndex ? "past" : i === sectionIndex ? "now" : "future";
            const tone = state === "now" ? "l33-journey-now" : state === "past" ? "l33-journey-past" : "l33-journey-future";
            return (
              <li key={sec.id} className="flex min-w-0 shrink-0 items-center">
                <span
                  data-journey-state={state}
                  className={`l33-journey-dot ${tone} inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-black`}
                  aria-current={state === "now" ? "step" : undefined}
                  aria-label={sec.label}
                >
                  <span aria-hidden className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-white/30 px-1 font-en text-[10px] leading-none">
                    {state === "past" ? "✓" : i + 1}
                  </span>
                  <span className="hidden whitespace-nowrap md:inline"><Rich text={SHORT[sec.id] ?? sec.label} /></span>
                </span>
                {i < total - 1 && <span aria-hidden className={`l33-journey-link ${i < sectionIndex ? "done" : ""}`} />}
              </li>
            );
          })}
        </ol>
      </nav>
      <section className="relative overflow-hidden rounded-[28px] border bg-white shadow-sm">
        <div className="pointer-events-none absolute left-4 top-3 text-[32px] opacity-90 md:left-6 md:text-[40px]" aria-hidden>
          {p.mascot}
        </div>
        <div className="flex flex-wrap items-center gap-2 px-5 pt-5 md:px-8 md:pt-7">
          {p.step ? <span className="l33-kicker"><Rich text={p.step} /></span> : null}
          <span className="l33-badge"><Rich text={sectionLabel} /></span>
        </div>
        <h2 className="mt-3 px-5 text-[22px] font-black leading-snug text-slate-900 md:px-8 md:text-[26px] max-w-[88%]">
          <Rich text={p.title} />
        </h2>
        {p.lead ? (
          <p className="mt-2 px-5 text-[15px] leading-7 text-slate-600 md:px-8 max-w-[88%]">
            <Rich text={p.lead} />
          </p>
        ) : null}
        <div className="mt-5 px-3 pb-5 md:px-6 md:pb-7">
          <Steps33 id={p.id} onGoTest={p.onGoTest} onGoSolutions={p.onGoSolutions} />
        </div>
        {p.tip ? (
          <div className="mx-3 mb-3 rounded-2xl bg-slate-900 p-3 text-sm font-bold leading-7 text-white md:mx-6 md:mb-6 flex items-center gap-3">
            <span className="text-xl shrink-0">💡</span>
            <span><Rich text={p.tip} /></span>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default function Lesson33(_props: { onExit?: () => void }) {
  const { onExit } = _props;
  const [area, setArea] = useState<Area33>("lesson");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const step = SLIDES[index];
  const isLast = index === SLIDE_COUNT_33 - 1;
  const progress = useMemo(() => Math.round(((index + 1) / SLIDE_COUNT_33) * 100), [index]);
  const mainRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const goSlide = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT_33 - 1, i)));
    setArea("lesson");
    setDrawer(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawer) {
        setDrawer(false);
        menuRef.current?.focus?.();
        return;
      }
      if (area !== "lesson") return;
      if (isArrowLocked33(e.target)) return;
      if (e.key === "ArrowLeft") goSlide(index + 1);
      if (e.key === "ArrowRight") goSlide(index - 1);
      if (e.key === "Home") goSlide(0);
      if (e.key === "End") goSlide(SLIDE_COUNT_33 - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area, drawer, index, goSlide]);

  useEffect(() => {
    if (area !== "lesson") return;
    try { mainRef.current?.scrollTo?.({ top: 0, behavior: "smooth" } as any); } catch {}
  }, [index, area]);

  useEffect(() => {
    if (!drawer) return;
    const node = drawerRef.current;
    const focusables = () =>
      [...(node?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])].filter(
        (el) => !el.hasAttribute("disabled"),
      );
    focusables()[0]?.focus?.();
    const onTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !node?.contains(active))) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", onTrap);
    return () => window.removeEventListener("keydown", onTrap);
  }, [drawer]);

  const rail = (
    <nav aria-label="خطوات الدرس 33" className="space-y-2.5">
      {SECTIONS_33.map((sec) => {
        const slidesIn = SLIDES.map((s, i) => ({ s, i })).filter((x) => x.s.section === sec.id);
        if (slidesIn.length === 0) return null;
        const current = area === "lesson" && slidesIn.some(({ i }) => i === index);
        return (
          <div key={sec.id} className={`rounded-2xl border p-1.5 ${current ? "l33-rail-sec border-amber-200" : "border-transparent"}`} data-active={current ? "true" : undefined}>
            <p className="mb-1 px-1 text-xs font-black text-slate-600"><Rich text={sec.label} /></p>
            <ol className="space-y-1">
              {slidesIn.map(({ s, i }) => {
                const active = i === index && area === "lesson";
                const done = area === "lesson" && i < index;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goSlide(i)}
                      aria-current={active ? "step" : undefined}
                      data-done={done ? "true" : undefined}
                      className={`l33-rail-step flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-start text-[13px] font-bold transition ${active ? "" : "text-slate-600 hover:bg-white"} ${FOCUS33}`}
                    >
                      <span aria-hidden className="text-base">{s.mascot}</span>
                      <span className="min-w-0 flex-1 truncate"><Rich text={navLabel33(s.title)} /></span>
                      <span className="font-en shrink-0 text-[11px] font-black opacity-70">{i + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
      <div className="mt-2 space-y-1 border-t border-amber-200 pt-3">
        <button type="button" onClick={() => setArea("lesson")} className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}><Rich text="📖 خطوات الدرس" /></button>
        <button type="button" onClick={() => setArea("test")} className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}><Rich text="🧪 منطقة الاختبار" /></button>
        <button type="button" onClick={() => setArea("solutions")} className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}><Rich text={`🔑 منطقة الحلول ${testSubmitted ? "" : "🔐"}`} /></button>
        <button type="button" onClick={() => setArea("teacher")} className={`${FOCUS33} w-full rounded-xl px-2 py-1.5 text-right text-[12px] font-black text-amber-900 hover:bg-amber-100`}><Rich text="👩‍🏫 منطقة المعلم" /></button>
      </div>
      <p className="px-1 pt-2 text-[11px] font-bold leading-5 text-slate-500">
        <Rich text={`📜 المصدر: ${SOURCE_NUMBERED_COUNT_33} قسمًا مرقّمًا من ${SOURCE_LEDGER_COUNT_33} قسمًا · ${SOURCE_LINES_33} سطرًا مصدريًا · كل قسم خطوة واحدة، وأسطره معروضة داخل خطوتها.`} />
      </p>
    </nav>
  );

  const areaLabel = AREAS_33.find((a) => a.id === area)?.ar ?? "";

  const lessonMain = (
    <div data-area="l33-lesson" className="space-y-3">
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
      {index === SLIDE_COUNT_33 - 1 && (
        <div className="mt-2">
          <FinalTest lesson={33} questions={FINAL_TESTS[33]} accent="bg-[#1A1F2E]" onGoTeacher={() => setArea("teacher")} />
        </div>
      )}
    </div>
  );

  const areaMain = useMemo(() => {
    if (area === "lesson") return lessonMain;
    if (area === "test")
      return (
        <div className="space-y-3" data-area="l33-test">
          <button type="button" onClick={() => setArea("lesson")} className={`${FOCUS33} rounded-full border-2 border-amber-300 bg-white px-4 py-1.5 text-[12px] font-black text-amber-800 hover:bg-amber-50`}>← العودة إلى خطوات الدرس</button>
          <TestArea33 onRestart={() => setTestSubmitted(false)} onSubmitted={() => setTestSubmitted(true)} />
        </div>
      );
    if (area === "solutions")
      return (
        <div className="space-y-3" data-area="l33-solutions">
          <button type="button" onClick={() => setArea("lesson")} className={`${FOCUS33} rounded-full border-2 border-amber-300 bg-white px-4 py-1.5 text-[12px] font-black text-amber-800 hover:bg-amber-50`}>← العودة إلى خطوات الدرس</button>
          <Solutions33 unlocked={testSubmitted} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
        </div>
      );
    return (
      <div className="space-y-3" data-area="l33-teacher">
        <button type="button" onClick={() => setArea("lesson")} className={`${FOCUS33} rounded-full border-2 border-amber-300 bg-white px-4 py-1.5 text-[12px] font-black text-amber-800 hover:bg-amber-50`}>← العودة إلى خطوات الدرس</button>
        <TeacherArea33 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
      </div>
    );
  }, [area, lessonMain, testSubmitted, teacherUnlocked]);

  return (
    <div dir="rtl" className="lesson33 relative flex h-screen flex-col overflow-hidden" data-lesson="33" data-area="l33-lesson">
      <Signature />
      <SignatureGhost />
      <div className="l33-bg" aria-hidden />
      <a href="#l33-main" className={`l33-skip sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-black ${FOCUS33}`}><Rich text="تخطَّ إلى محتوى الخطوة" /></a>

      <div className="l33-shell relative flex min-h-0 flex-1">
        <aside className="l33-rail hidden w-72 shrink-0 flex-col overflow-y-auto lg:flex">
          <div className="l33-rail-head shrink-0 p-3">
            <p className="l33-en-display text-[10px] font-black uppercase tracking-[0.22em] text-[#c9f4ff]"><En>{LAB_NAME_33}</En></p>
            <h1 className="mt-0.5 text-[15px] font-black leading-snug text-white"><LatinRuns text={LESSON_TITLE_33} /></h1>
            <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#e2f6ff]"><LatinRuns text={LESSON_SUBTITLE_33} /></p>
            <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#d7ecff]"><LatinRuns text={LAB_MOTTO_33} /></p>
          </div>
          <div className="min-h-0 flex-1 p-2">{rail}</div>
        </aside>

        <div className="relative flex min-w-0 flex-1 flex-col">
          <header className="l33-header z-20 flex shrink-0 items-center gap-x-2 gap-y-1.5 px-2.5 py-2 sm:px-3">
            <button
              type="button"
              ref={menuRef}
              data-nav-toggle="steps"
              onClick={() => setDrawer((d) => !d)}
              aria-expanded={drawer}
              aria-controls={drawer ? "l33-drawer" : undefined}
              className={`l33-tap min-h-[40px] shrink-0 px-3 lg:hidden ${FOCUS33}`}
            >
              ☰ <span className="text-xs font-black"><Rich text="الخطوات" /></span>
            </button>

            {area === "lesson" && (
              <div className="flex min-w-0 shrink-0 items-center gap-2">
                <span className="l33-chip whitespace-nowrap"><Rich text={`خطوة ${index + 1} من ${SLIDE_COUNT_33}`} /></span>
                <div role="progressbar" aria-label="تقدّم الدرس" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="l33-progress-track hidden h-2.5 w-24 overflow-hidden rounded-full sm:block xl:w-40">
                  <div className="l33-progress-fill h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span aria-hidden className="font-en hidden shrink-0 text-[11px] font-black text-slate-500 sm:block">{progress}%</span>
              </div>
            )}

            <span className="hidden min-w-0 flex-1 truncate text-xs font-black text-slate-600 2xl:block">
              <Rich text={area === "lesson" ? `${SECTIONS_33.find((s) => s.id === step.section)?.label ?? ""} · ${navLabel33(step.title)}` : areaLabel} />
            </span>

            <nav className="flex shrink-0 items-center gap-1.5 ms-auto" role="group" aria-label="مناطق الدرس">
              {AREAS_33.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  data-tab={a.id}
                  onClick={() => setArea(a.id)}
                  aria-current={area === a.id ? "true" : undefined}
                  className={`l33-tab rounded-2xl px-2.5 text-xs font-black sm:px-3 sm:text-sm ${FOCUS33}`}
                >
                  <span aria-hidden>{a.emoji}</span>
                  <span className="sr-only sm:hidden"><Rich text={a.ar} /></span>
                  <span className="hidden sm:inline"><Rich text={a.ar} /></span>
                  {a.id === "solutions" && !testSubmitted && <span aria-hidden> 🔒</span>}
                </button>
              ))}
            </nav>

            {onExit ? (
              <button type="button" onClick={onExit} className={`l33-tap l33-tap-soft min-h-[40px] shrink-0 px-3 text-xs font-black ${FOCUS33}`}>
                → <Rich text="خروج" />
              </button>
            ) : null}
          </header>

          <main id="l33-main" ref={mainRef} className="l33-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pb-36 pt-3 sm:px-4" data-area={area === "lesson" ? "l33-lesson" : area === "test" ? "l33-test" : area === "solutions" ? "l33-solutions" : "l33-teacher"}>
            <p role="status" aria-live="polite" className="sr-only"><Rich text={area === "lesson" ? `الخطوة ${index + 1} من ${SLIDE_COUNT_33}: ${step.title}` : areaLabel} /></p>
            <div className="mx-auto w-full max-w-[76rem] space-y-3">
              {areaMain}
            </div>
          </main>

          {area === "lesson" && (
            <>
              <button type="button" disabled={index === 0} onClick={() => goSlide(index - 1)} className={`l33-fab l33-fab-prev ${FOCUS33}`}>→ <Rich text="السابق" /></button>
              <button type="button" disabled={index === SLIDE_COUNT_33 - 1} onClick={() => goSlide(index + 1)} className={`l33-fab l33-fab-next ${FOCUS33}`}>التالي ←</button>
            </>
          )}
        </div>

        {drawer && (
          <div className="l33-drawer-scrim lg:hidden" onClick={() => { setDrawer(false); menuRef.current?.focus?.(); }}>
            <div id="l33-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="خطوات الدرس 33" className="l33-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="l33-rail-head flex shrink-0 items-start justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="l33-en-display text-[10px] font-black uppercase tracking-[0.2em] text-[#c9f4ff]"><En>{LAB_NAME_33}</En></p>
                  <h2 className="mt-0.5 text-sm font-black leading-snug text-white"><LatinRuns text={LESSON_TITLE_33} /></h2>
                  <p className="mt-1 text-[11px] font-bold text-[#e2f6ff]"><Rich text={`الخطوة ${index + 1} من ${SLIDE_COUNT_33} · ${progress}٪`} /></p>
                </div>
                <button type="button" onClick={() => { setDrawer(false); menuRef.current?.focus?.(); }} aria-label="إغلاق فهرس الخطوات" className={`l33-tap min-h-[38px] border-white/40 bg-white/15 px-2.5 text-white ${FOCUS33}`}>✕</button>
              </div>
              <div className="l33-scroll min-h-0 flex-1 overflow-y-auto p-2">{rail}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
