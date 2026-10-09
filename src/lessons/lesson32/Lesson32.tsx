// ============================================================
// الدرس 32 — Present Perfect Continuous (المضارع التام المستمر)
// بنية: 4 مناطق — الدرس · الاختبار · الحلول · المعلم.
// الدرس: 40 خطوة (1:1 مع سجل المصدر) — تفاعل → اكتشاف → شرح → مصدر → تدريب → إتقان.
// الهوية البصرية: زمرّدي/كهرماني (شريط النشاط) — مختلفة عن الدروس 27–31.
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { Frame, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
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

type Area32 = "lesson" | "test" | "solutions" | "teacher";
const AREAS_32: { id: Area32; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "الدرس" },
  { id: "test", emoji: "🧪", ar: "منطقة الاختبار" },
  { id: "solutions", emoji: "🔑", ar: "حلول الاختبار" },
  { id: "teacher", emoji: "👩‍🏫", ar: "منطقة المعلم" },
];

const SLIDE_COUNT_32 = SLIDES.length;

/** حركات الدرس 32 — تُحترم تفضيل تقليل الحركة */
const CSS_32 = `
@keyframes l32-flow { from { background-position: 0 0; } to { background-position: 80px 0; } }
@keyframes l32-run { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes l32-brush { 0% { background-position: 0 0; } 100% { background-position: 24px 0; } }
.l32-ribbon-flow { background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 10px, transparent 10px 20px); animation: l32-flow 1.6s linear infinite; }
.l32-run { display: inline-block; animation: l32-run 0.9s ease-in-out infinite; }
.l32-brush { background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.45) 0 6px, transparent 6px 12px); animation: l32-brush 0.9s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .l32-ribbon-flow, .l32-run, .l32-brush { animation: none; }
}
`;

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
  return (
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
      <div data-lesson-step={id} data-source-id={id} className="space-y-4">
        <StepBody32 id={id} onGoTest={onGoTest} />
      </div>
    </Frame>
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (area !== "lesson") return;
      if (isArrowLocked(e.target)) return;
      if (e.key === "ArrowLeft") setIndex((i) => Math.min(SLIDE_COUNT_32 - 1, i + 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area]);

  useEffect(() => {
    if (area !== "lesson") return;
    try {
      const scroller = typeof document !== "undefined" ? document.scrollingElement : null;
      if (scroller && typeof scroller.scrollTo === "function") scroller.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      /* التمرير غير مدعوم في بيئة الاختبار */
    }
  }, [index, area]);

  const goSlide = (i: number) => { setIndex(i); setArea("lesson"); setDrawer(false); };

  const rail = (
    <nav aria-label="خطوات الدرس" className="space-y-3">
      {SECTIONS_32.map((sec) => {
        const items = SLIDES.map((s, i) => ({ s, i })).filter(({ s }) => s.section === sec.id);
        if (items.length === 0) return null;
        return (
          <div key={sec.id}>
            <p className="mb-1.5 px-1 text-xs font-black text-emerald-900"><Rich text={sec.label} /></p>
            <ol className="space-y-1">
              {items.map(({ s, i }) => {
                const active = i === index && area === "lesson";
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goSlide(i)}
                      aria-current={active ? "step" : undefined}
                      className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-start text-sm font-bold transition ${active ? "bg-emerald-700 text-white shadow" : "text-slate-600 hover:bg-emerald-50"} ${FOCUS32}`}
                    >
                      <span aria-hidden>{s.mascot}</span>
                      <span className="min-w-0 flex-1 truncate"><Rich text={navLabel32(s.title)} /></span>
                      <span className={`font-en text-[11px] font-black ${active ? "text-emerald-100" : "text-slate-400"}`}>{i + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-3 sm:p-4">
      <style>{CSS_32}</style>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onExit} className={`rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-200 ${FOCUS32}`}>
          → خروج
        </button>
        <button type="button" onClick={() => setDrawer((d) => !d)} aria-expanded={drawer} className={`rounded-xl bg-emerald-700 px-3 py-2 text-sm font-black text-white transition hover:bg-emerald-800 lg:hidden ${FOCUS32}`}>
          ☰ الخطوات
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="font-head truncate text-lg font-black text-slate-900 md:text-xl"><LatinRuns text={LESSON_TITLE_32} /></h1>
          <p className="truncate text-xs font-bold text-slate-500"><LatinRuns text={`${LESSON_SUBTITLE_32} · ${LAB_NAME_32}: ${LAB_MOTTO_32}`} /></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="مناطق الدرس">
        {AREAS_32.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setArea(a.id)}
            aria-pressed={area === a.id}
            className={`flex-1 rounded-2xl border-2 px-3 py-2.5 text-sm font-black transition active:scale-[0.98] sm:flex-none sm:px-5 ${area === a.id ? "border-emerald-700 bg-emerald-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"} ${FOCUS32}`}
          >
            {a.emoji} <LatinRuns text={a.ar ?? ""} />
            {a.id === "solutions" && !solutionsUnlocked && <span aria-label="مقفلة"> 🔒</span>}
          </button>
        ))}
      </div>

      {area === "lesson" && (
        <div className="flex items-center gap-2 rounded-2xl border-2 border-emerald-100 bg-white px-3 py-2">
          <span className="text-xs font-black text-emerald-900"><Rich text={`خطوة ${index + 1} من ${SLIDE_COUNT_32}`} /></span>
          <div role="progressbar" aria-label="تقدم الدرس" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-emerald-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs font-black text-slate-500"><Rich text={`${progress}٪`} /></span>
        </div>
      )}

      {drawer && (
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-3 lg:hidden">{rail}</div>
      )}

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden max-h-[80vh] overflow-y-auto rounded-3xl border-2 border-slate-200 bg-white p-3 lg:block">{rail}</aside>
        <main className="min-w-0 space-y-4">
          {area === "lesson" && (
            <div data-area="l32-lesson">
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
                <div className="mt-4">
                  <FinalTest
                    lesson={32}
                    questions={FINAL_TESTS[32]}
                    accent="bg-emerald-700"
                    onGoTeacher={() => setArea("teacher")}
                  />
                </div>
              )}
              <div className="mt-4 flex items-center gap-2">
                <button type="button" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className={`flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition enabled:hover:border-emerald-300 disabled:opacity-30 ${FOCUS32}`}>
                  → السابق
                </button>
                <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-500"><span className="font-en">{index + 1}</span> / <span className="font-en">{SLIDE_COUNT_32}</span></span>
                <button type="button" disabled={index === SLIDE_COUNT_32 - 1} onClick={() => setIndex((i) => Math.min(SLIDE_COUNT_32 - 1, i + 1))}
                  className={`flex-1 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white transition enabled:hover:bg-emerald-800 disabled:opacity-30 ${FOCUS32}`}>
                  التالي ←
                </button>
              </div>
            </div>
          )}
          {area === "test" && <div data-area="l32-test"><TestArea32 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} /></div>}
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
        </main>
      </div>

      <p className="pb-4 text-center text-[11px] font-bold text-slate-400">
        <Rich text={`📜 المصدر: ${SOURCE_NUMBERED_COUNT_32} قسمًا مرقّمًا · ${SOURCE_LEDGER_COUNT_32} وحدة في السجل · كل وحدة تظهر بعد إتمام تفاعلها — العرض دلالي تفاعلي`} />
      </p>
    </div>
  );
}
