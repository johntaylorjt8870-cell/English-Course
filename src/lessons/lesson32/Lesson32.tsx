// ============================================================
// الدرس 32 — Present Perfect Continuous (المضارع التام المستمر)
// 🌊 THE DURATION STREAM / تيّار المدة
//
// بنية: 4 مناطق — الدرس · الاختبار · الحلول · المعلم.
// الدرس: 40 خطوة (1:1 مع سجل المصدر) — تفاعل → إتمام → شرح المنصة →
// منصة أمثلة المصدر → تدريب.
//
// الهيكل: شاشة كاملة برأس مضغوط (مبدأ الدرس 30):
//   • لا عنوان خطوة مكررًا في رأس كبير — عنوان الخطوة مرة واحدة في إطارها.
//   • عدّاد خطوات + شريط تقدم مضغوطان في سطر واحد.
//   • فهرس الخطوات في سكة جانبية (lg) أو درج (أصغر) مع حبس تركيز وEscape.
//   • تنقّل طائر (السابق/التالي) + أسهم لوحة المفاتيح (في RTL: ← = التالي).
//   • المحتوى التعليمي يبدأ قرب الأعلى.
// الهوية البصرية في lesson32.css (مسوّرة بـ .lesson32 — لا تمسّ درسًا آخر).
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { En, Frame, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { SOURCE_NUMBERED_COUNT_32, SOURCE_LEDGER_COUNT_32, SOURCE_SECTIONS, SEC_32 } from "./ledger32";
import {
  LESSON_TITLE_32, LESSON_SUBTITLE_32, LAB_NAME_32, LAB_MOTTO_32, SECTIONS_32, SLIDES,
} from "./data";
import { ACCENT32, FOCUS32 } from "./kit32";
import { StepBody32 } from "./Steps32";
import TestArea32, { Solutions32 } from "./TestArea32";
import TeacherArea32 from "./TeacherArea32";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import "./lesson32.css";

type Area32 = "lesson" | "test" | "solutions" | "teacher";
const AREAS_32: { id: Area32; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "الدرس" },
  { id: "test", emoji: "🧪", ar: "منطقة الاختبار" },
  { id: "solutions", emoji: "🔑", ar: "حلول الاختبار" },
  { id: "teacher", emoji: "👩‍🏫", ar: "منطقة المعلم" },
];

const SLIDE_COUNT_32 = SLIDES.length;
/** عدد الأسطر الحرفية في سجل المصدر — كل سطر منها معروض داخل خطوته */
const SOURCE_LINES_32 = SOURCE_SECTIONS.reduce((n, sec) => n + sec.units.length, 0);

/** عنوان مختصر للفهرس الجانبي فقط: الجزء قبل « — ». العنوان الكامل محفوظ في إطار الخطوة. */
function navLabel32(title: string): string {
  return title.split(" — ")[0];
}

/** لا تُشغّل التنقّل العام بالأسهم عندما يكون التركيز داخل عنصر تفاعلي يستعمل الأسهم */
function isArrowLocked(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.getAttribute?.("contentEditable") === "true") return true;
  if (el.closest?.("[data-keynav-lock]")) return true;
  if (el.getAttribute?.("role") === "slider") return true;
  return false;
}

export function SlideView32({ id, title, lead, tip, step, mascot, section, onGoTest }: {
  id: string; title: string; lead?: string; tip?: string; step?: string; mascot: string; section: string; onGoTest: () => void;
}) {
  const sectionLabel = SECTIONS_32.find((s) => s.id === section)?.label ?? "";
  const srcIdx = SEC_32[id];
  const srcTitle = srcIdx !== undefined ? SOURCE_SECTIONS[srcIdx]?.title : undefined;
  // موضع القسم الحالي ضمن رحلة الأقسام العشر (يظهر في شريط الرحلة أعلى كل خطوة)
  const sectionIndex = SECTIONS_32.findIndex((s) => s.id === section);
  // شكل مختصر لكل قسم (نستخدمه حين لا تتّسع المساحة للاسم الكامل)
  const SHORT_LABEL: Record<string, string> = {
    START: "البداية",
    FORM: "الصيغة",
    TIME: "المدة",
    QFORM: "النفي/السؤال",
    CONTRAST: "النتيجة",
    WORDS: "الكلمات",
    COMPARE: "المرجع",
    FIX: "صيد",
    BOSS: "التحديات",
    END: "الخاتمة",
  };
  return (
    <div className="l32-frame space-y-2.5">
      {/* شريط الرحلة — بصمة بصرية فريدة تظهر في كل خطوة، وليس مجرّد زخرفة */}
      <nav aria-label="رحلة الدرس" className="l32-journey" data-journey-section={section}>
        <ol className="flex w-full items-center gap-0 overflow-x-auto py-1" dir="rtl">
          {SECTIONS_32.map((sec, i) => {
            const state = i < sectionIndex ? "past" : i === sectionIndex ? "now" : "future";
            const tone =
              state === "now"
                ? "l32-journey-now"
                : state === "past"
                ? "l32-journey-past"
                : "l32-journey-future";
            return (
              <li key={sec.id} className="flex min-w-0 shrink-0 items-center">
                <span
                  data-journey-state={state}
                  className={`l32-journey-dot ${tone} inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-black`}
                  aria-current={state === "now" ? "step" : undefined}
                  aria-label={sec.label}
                >
                  <span aria-hidden className="ltr-pair inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-white/30 px-1 font-en text-[10px] leading-none">
                    {state === "past" ? "✓" : i + 1}
                  </span>
                  <span className="hidden whitespace-nowrap md:inline"><Rich text={SHORT_LABEL[sec.id] ?? sec.label} /></span>
                </span>
                {i < SECTIONS_32.length - 1 && <span aria-hidden className="l32-journey-link" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <Frame
        mascot={mascot}
        step={step}
        badge={sectionLabel}
        title={title}
        lead={lead}
        tip={tip}
        accent={ACCENT32}
        sourceTag={srcTitle}
      >
        <div data-lesson-step={id} data-source-id={id} className="space-y-3">
          <StepBody32 id={id} onGoTest={onGoTest} />
        </div>
      </Frame>
    </div>
  );
}

export default function Lesson32({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area32>("lesson");
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const solutionsUnlocked = testChecked || teacherOk;
  const slide = SLIDES[index];
  const progress = useMemo(() => Math.round(((index + 1) / SLIDE_COUNT_32) * 100), [index]);
  const mainRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const goSlide = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT_32 - 1, i)));
    setArea("lesson");
    setDrawer(false);
  }, []);

  // ---------------- لوحة المفاتيح: تنقّل + Escape ----------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawer) {
        setDrawer(false);
        menuRef.current?.focus?.();
        return;
      }
      if (area !== "lesson") return;
      if (isArrowLocked(e.target)) return;
      // الواجهة RTL: السهم الأيسر = التقدم، والأيمن = الرجوع
      if (e.key === "ArrowLeft") goSlide(index + 1);
      if (e.key === "ArrowRight") goSlide(index - 1);
      if (e.key === "Home") goSlide(0);
      if (e.key === "End") goSlide(SLIDE_COUNT_32 - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area, drawer, index, goSlide]);

  // ---------------- التمرير إلى أعلى مع كل خطوة ----------------
  useEffect(() => {
    if (area !== "lesson") return;
    try {
      mainRef.current?.scrollTo?.({ top: 0, behavior: "smooth" });
    } catch {
      /* التمرير غير مدعوم في بيئة الاختبار */
    }
  }, [index, area]);

  // ---------------- الدرج: تركيز أولي + حبس Tab ----------------
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
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onTrap);
    return () => window.removeEventListener("keydown", onTrap);
  }, [drawer]);

  // ---------------- فهرس الخطوات (سكة + درج) ----------------
  const rail = (
    <nav aria-label="خطوات الدرس" className="space-y-2.5">
      {SECTIONS_32.map((sec) => {
        const items = SLIDES.map((s, i) => ({ s, i })).filter(({ s }) => s.section === sec.id);
        if (items.length === 0) return null;
        const current = area === "lesson" && items.some(({ i }) => i === index);
        return (
          <div key={sec.id} className="l32-rail-group rounded-2xl border border-transparent p-1.5" aria-current={current ? "true" : undefined}>
            <p className="l32-rail-group-name mb-1 px-1 text-xs font-black text-[#46507f]"><Rich text={sec.label} /></p>
            <ol className="space-y-1">
              {items.map(({ s, i }) => {
                const active = i === index && area === "lesson";
                const done = area === "lesson" && i < index;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goSlide(i)}
                      aria-current={active ? "step" : undefined}
                      data-done={done ? "true" : undefined}
                      className={`l32-rail-step flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-start text-[13px] font-bold transition ${active ? "" : "text-[#46507f] hover:bg-white"} ${FOCUS32}`}
                    >
                      <span aria-hidden className="text-base">{s.mascot}</span>
                      <span className="min-w-0 flex-1 truncate"><Rich text={navLabel32(s.title)} /></span>
                      <span className="font-en shrink-0 text-[11px] font-black opacity-80">{i + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
      <p className="px-1 pt-1 text-[11px] font-bold text-[#5b6697]">
        <Rich text={`📜 المصدر: ${SOURCE_NUMBERED_COUNT_32} قسمًا مرقّمًا من ${SOURCE_LEDGER_COUNT_32} قسمًا · ${SOURCE_LINES_32} سطرًا مصدريًا · كل قسم خطوة واحدة، وأسطره معروضة داخل خطوتها.`} />
      </p>
    </nav>
  );

  const areaLabel = AREAS_32.find((a) => a.id === area)?.ar ?? "";

  return (
    <div className="lesson32 relative flex h-screen flex-col overflow-hidden" data-lesson="32" dir="rtl">
      <Signature />
      <SignatureGhost />
      <div className="l32-bg" aria-hidden />
      <a href="#l32-main" className={`l32-skip ${FOCUS32}`}><Rich text="تخطَّ إلى محتوى الخطوة" /></a>

      <div className="l32-shell relative flex min-h-0 flex-1">
        {/* ---------- السكة الجانبية (شاشات كبيرة) ---------- */}
        <aside className="l32-rail hidden w-72 shrink-0 flex-col overflow-y-auto lg:flex">
          <div className="l32-rail-head shrink-0 p-3">
            <p className="l32-en-display text-[10px] font-black uppercase tracking-[0.22em] text-[#c9f4ff]">
              <En>{LAB_NAME_32}</En>
            </p>
            <h1 className="l32-h mt-0.5 text-[15px] font-black leading-snug text-white">
              <LatinRuns text={LESSON_TITLE_32} />
            </h1>
            <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#e2f6ff]">
              <LatinRuns text={LESSON_SUBTITLE_32} />
            </p>
            <p className="mt-1 text-[11px] font-bold leading-relaxed text-[#d7ecff]">
              <LatinRuns text={LAB_MOTTO_32} />
            </p>
          </div>
          <div className="min-h-0 flex-1 p-2">{rail}</div>
        </aside>

        <div className="relative flex min-w-0 flex-1 flex-col">
          {/* ---------- الرأس المضغوط ---------- */}
          <header className="l32-header z-20 flex shrink-0 items-center gap-x-2 gap-y-1.5 px-2.5 py-2 sm:px-3">
            <button
              type="button"
              ref={menuRef}
              data-nav-toggle="steps"
              onClick={() => setDrawer((d) => !d)}
              aria-expanded={drawer}
              aria-controls={drawer ? "l32-drawer" : undefined}
              className={`l32-tap min-h-[40px] shrink-0 px-3 lg:hidden ${FOCUS32}`}
            >
              ☰ <span className="text-xs font-black"><Rich text="الخطوات" /></span>
            </button>

            {area === "lesson" && (
              <div className="flex min-w-0 shrink-0 items-center gap-2">
                <span className="l32-chip l32-chip-indigo whitespace-nowrap">
                  <Rich text={`خطوة ${index + 1} من ${SLIDE_COUNT_32}`} />
                </span>
                <div role="progressbar" aria-label="تقدّم الدرس" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}
                  className="l32-progress-track hidden h-2.5 w-24 overflow-hidden rounded-full sm:block xl:w-40">
                  <div className="l32-progress-fill h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
                <span aria-hidden className="font-en hidden shrink-0 text-[11px] font-black text-[#46507f] sm:block">{progress}%</span>
              </div>
            )}

            <span className="hidden min-w-0 flex-1 truncate text-xs font-black text-[#46507f] 2xl:block">
              <Rich text={area === "lesson" ? `${SECTIONS_32.find((s) => s.id === slide.section)?.label ?? ""} · ${navLabel32(slide.title)}` : areaLabel} />
            </span>

            <nav className="flex shrink-0 items-center gap-1.5 ms-auto" role="group" aria-label="مناطق الدرس">
              {AREAS_32.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  data-tab={a.id}
                  onClick={() => setArea(a.id)}
                  aria-current={area === a.id ? "true" : undefined}
                  className={`l32-tab rounded-2xl px-2.5 text-xs font-black sm:px-3 sm:text-sm ${FOCUS32}`}
                >
                  <span aria-hidden>{a.emoji}</span>
                  <span className="sr-only sm:hidden"><Rich text={a.ar} /></span>
                  <span className="hidden sm:inline"><Rich text={a.ar} /></span>
                  {a.id === "solutions" && !solutionsUnlocked && <span aria-hidden> 🔒</span>}
                </button>
              ))}
            </nav>

            <button type="button" onClick={onExit} className={`l32-tap l32-tap-soft min-h-[40px] shrink-0 px-3 text-xs font-black ${FOCUS32}`}>
              → <Rich text="خروج" />
            </button>
          </header>

          {/* ---------- المحتوى ---------- */}
          <main id="l32-main" ref={mainRef} className="l32-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pb-36 pt-3 sm:px-4">
            <p role="status" aria-live="polite" className="sr-only">
              <Rich text={area === "lesson" ? `الخطوة ${index + 1} من ${SLIDE_COUNT_32}: ${slide.title}` : areaLabel} />
            </p>
            <div className="mx-auto w-full max-w-[76rem] space-y-3">
              {area === "lesson" && (
                <div data-area="l32-lesson" className="space-y-3">
                  <SlideView32
                    key={index}
                    id={slide.id}
                    title={slide.title}
                    lead={slide.lead}
                    tip={slide.tip}
                    step={slide.step}
                    mascot={slide.mascot}
                    section={slide.section}
                    onGoTest={() => setArea("test")}
                  />
                  {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
                  {index === SLIDE_COUNT_32 - 1 && (
                    <FinalTest
                      lesson={32}
                      questions={FINAL_TESTS[32]}
                      accent="bg-[#4338ca]"
                      onGoTeacher={() => setArea("teacher")}
                    />
                  )}
                </div>
              )}
              {area === "test" && (
                <div data-area="l32-test">
                  <TestArea32 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} />
                </div>
              )}
              {area === "solutions" && (
                <div data-area="l32-solutions">
                  <Solutions32 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
                </div>
              )}
              {area === "teacher" && (
                <div data-area="l32-teacher">
                  <TeacherArea32 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} />
                </div>
              )}
            </div>
          </main>

          {/* ---------- التنقّل الطائر (منطقة الدرس فقط) ---------- */}
          {area === "lesson" && (
            <>
              <button type="button" disabled={index === 0} onClick={() => goSlide(index - 1)}
                className={`l32-fab l32-fab-prev ${FOCUS32}`}>
                → <Rich text="السابق" />
              </button>
              <button type="button" disabled={index === SLIDE_COUNT_32 - 1} onClick={() => goSlide(index + 1)}
                className={`l32-fab l32-fab-next ${FOCUS32}`}>
                التالي ←
              </button>
            </>
          )}
        </div>

        {/* ---------- الدرج (الشاشات الصغيرة) ---------- */}
        {drawer && (
          <div className="l32-drawer-scrim lg:hidden" onClick={() => { setDrawer(false); menuRef.current?.focus?.(); }}>
            <div
              id="l32-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="خطوات الدرس 32"
              className="l32-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="l32-rail-head flex shrink-0 items-start justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="l32-en-display text-[10px] font-black uppercase tracking-[0.2em] text-[#c9f4ff]"><En>{LAB_NAME_32}</En></p>
                  <h2 className="l32-h mt-0.5 text-sm font-black leading-snug text-white"><LatinRuns text={LESSON_TITLE_32} /></h2>
                  <p className="mt-1 text-[11px] font-bold text-[#e2f6ff]"><Rich text={`الخطوة ${index + 1} من ${SLIDE_COUNT_32} · ${progress}٪`} /></p>
                </div>
                <button type="button" onClick={() => { setDrawer(false); menuRef.current?.focus?.(); }}
                  aria-label="إغلاق فهرس الخطوات"
                  className={`l32-tap min-h-[38px] border-white/40 bg-white/15 px-2.5 text-white ${FOCUS32}`}>✕</button>
              </div>
              <div className="l32-scroll min-h-0 flex-1 overflow-y-auto p-2">{rail}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
