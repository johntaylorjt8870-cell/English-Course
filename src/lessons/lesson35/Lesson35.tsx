import { useEffect, useMemo, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { SLIDES_35, SECTIONS_35, SLIDE_COUNT_35, SCENE_META_35, type SectionId35 } from "./data";
import StepView35 from "./Steps35";
import TestArea35, { Solutions35 } from "./TestArea35";
import TeacherArea35 from "./TeacherArea35";
import { FOCUS_35 } from "./kit35";

type Area35 = "lesson" | "test" | "solutions" | "teacher";

const STUDENT_AREA_35 = '[data-lesson="35"] main:is([data-area="lesson35-lesson"], [data-area="lesson35-test"], [data-area="lesson35-solutions"])';
const READABILITY_CSS_35 = `
  @media (max-width: 767px) {
    ${STUDENT_AREA_35} [class~="text-sm"],
    ${STUDENT_AREA_35} [class~="text-[13px]"],
    ${STUDENT_AREA_35} [class~="text-[14px]"],
    ${STUDENT_AREA_35} [class~="text-[15px]"] { font-size: 1rem; }
    ${STUDENT_AREA_35} [class~="text-xs"],
    ${STUDENT_AREA_35} [class~="text-[11px]"],
    ${STUDENT_AREA_35} [class~="text-[12px]"] { font-size: .875rem; }
    ${STUDENT_AREA_35} :is(button, input, select, textarea)[class~="text-xs"],
    ${STUDENT_AREA_35} :is(button, input, select, textarea)[class~="text-[11px]"],
    ${STUDENT_AREA_35} :is(button, input, select, textarea)[class~="text-[12px]"],
    ${STUDENT_AREA_35} :is(button, input, select, textarea)[class~="text-[13px]"],
    ${STUDENT_AREA_35} :is(button, input, select, textarea)[class~="text-[14px]"],
    ${STUDENT_AREA_35} :is(button, input, select, textarea)[class~="text-[15px]"] { font-size: 1rem; }
  }
  [data-lesson="35"] nav [class~="truncate"] { white-space: normal; overflow-wrap: anywhere; text-overflow: clip; }
`;

/** Mission Control visual layer — fully scoped to Lesson 35. */
const THEME_CSS_35 = `
  .fl35-shell {
    background:
      radial-gradient(1100px 560px at 85% -10%, rgba(47,196,174,.14), transparent 60%),
      radial-gradient(900px 520px at 8% 112%, rgba(245,182,74,.10), transparent 55%),
      linear-gradient(160deg, #07182a 0%, #0b2740 55%, #082036 100%);
  }
  .fl35-stars {
    position: absolute; inset: 0; pointer-events: none; opacity: .55;
    background-image:
      radial-gradient(1.6px 1.6px at 12% 18%, rgba(255,255,255,.75) 50%, transparent 51%),
      radial-gradient(1.2px 1.2px at 28% 64%, rgba(255,255,255,.5) 50%, transparent 51%),
      radial-gradient(1.8px 1.8px at 41% 12%, rgba(190,240,230,.7) 50%, transparent 51%),
      radial-gradient(1.1px 1.1px at 55% 42%, rgba(255,255,255,.45) 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 67% 78%, rgba(255,224,170,.6) 50%, transparent 51%),
      radial-gradient(1.2px 1.2px at 76% 22%, rgba(255,255,255,.55) 50%, transparent 51%),
      radial-gradient(1.7px 1.7px at 88% 55%, rgba(190,240,230,.6) 50%, transparent 51%),
      radial-gradient(1.1px 1.1px at 94% 12%, rgba(255,255,255,.5) 50%, transparent 51%);
    animation: fl35-twinkle 7s ease-in-out infinite alternate;
  }
  @keyframes fl35-twinkle { from { opacity: .32; } to { opacity: .7; } }
  @keyframes fl35-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .fl35-enter { animation: fl35-rise .5s cubic-bezier(.22,.7,.3,1) both; }
  @keyframes fl35-spin { to { transform: rotate(360deg); } }
  .fl35-orbit { animation: fl35-spin 46s linear infinite; }
  .fl35-orbit-slow { animation: fl35-spin 70s linear infinite reverse; }
  @media (prefers-reduced-motion: reduce) {
    .fl35-enter, .fl35-stars, .fl35-orbit, .fl35-orbit-slow { animation: none !important; }
  }
`;

const MISSION_LOG_KEY_35 = "l35-future-lab-mission-log-v1";

export default function Lesson35({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area35>("lesson");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [index, setIndex] = useState(0);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => Object.fromEntries(SECTIONS_35.map((section, sectionIndex) => [section.id, sectionIndex === 0])));
  const [visited, setVisited] = useState<Set<string>>(() => new Set([SLIDES_35[0].id]));
  const slide = SLIDES_35[index];
  const last = index === SLIDE_COUNT_35 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  // Mission log: hydrate once from storage (never during render, never on the server).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(MISSION_LOG_KEY_35);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const known = new Set(SLIDES_35.map((candidate) => candidate.id));
          setVisited(new Set([...parsed.filter((id) => typeof id === "string" && known.has(id)), SLIDES_35[0].id]));
        }
      }
    } catch {
      /* mission log is optional */
    }
  }, []);

  useEffect(() => {
    setVisited((current) => (current.has(slide.id) ? current : new Set(current).add(slide.id)));
  }, [slide.id]);

  useEffect(() => {
    try {
      localStorage.setItem(MISSION_LOG_KEY_35, JSON.stringify([...visited]));
    } catch {
      /* storage may be unavailable */
    }
  }, [visited]);

  useEffect(() => {
    setOpenMap((current) => ({ ...current, [slide.section]: true }));
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [index, slide.section]);

  useEffect(() => {
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [area]);

  // Keyboard navigation (RTL-aware): ← advances, → goes back, Home/End jump.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (area !== "lesson") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target && typeof target.closest === "function" && target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") setIndex((current) => Math.min(SLIDE_COUNT_35 - 1, current + 1));
      else if (event.key === "ArrowRight") setIndex((current) => Math.max(0, current - 1));
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(SLIDE_COUNT_35 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area]);

  const setSection = (sectionId: SectionId35) => {
    const first = SLIDES_35.findIndex((candidate) => candidate.section === sectionId);
    setOpenMap((current) => ({ ...current, [sectionId]: !current[sectionId] }));
    if (!openMap[sectionId] && first >= 0) { setIndex(first); setArea("lesson"); }
  };

  const visitedInSection = (sectionId: SectionId35) => SLIDES_35.filter((candidate) => candidate.section === sectionId && visited.has(candidate.id)).length;
  const totalInSection = (sectionId: SectionId35) => SLIDES_35.filter((candidate) => candidate.section === sectionId).length;

  const rail = useMemo(() => (
    <nav aria-label="مشاهد Future Lab للدرس 35" className="space-y-1">
      {SECTIONS_35.map((section) => {
        const slides = SLIDES_35.map((candidate, slideIndex) => ({ candidate, slideIndex })).filter(({ candidate }) => candidate.section === section.id);
        const open = !!openMap[section.id];
        const active = slide.section === section.id;
        const done = visitedInSection(section.id);
        const total = totalInSection(section.id);
        return (
          <div key={section.id}>
            <button type="button" aria-expanded={open} aria-controls={`l35-scene-list-${section.id}`} onClick={() => setSection(section.id)} className={`${FOCUS_35} flex w-full items-center justify-between gap-2 rounded-xl px-2 py-2 text-right text-xs font-black transition ${active ? "bg-[#123c5c] text-white ring-1 ring-[#2fc4ae]/40" : "text-[#c9d7e2] hover:bg-white/5"}`}>
              <span className="min-w-0">
                <span className={`ml-1 rounded-md px-1.5 py-0.5 text-[10px] ${active ? "bg-[#f5b64a]/20 text-[#f5b64a]" : "bg-white/10 text-[#9fd8cd]"}`}>{SCENE_META_35[section.id].icon} {section.scene}</span>
                <Rich text={section.arabic} />
                <span className={`mt-0.5 block text-[10px] font-bold ${active ? "text-white/70" : "text-[#7d93a6]"}`}><En>{section.label}</En></span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-0.5">
                <span aria-hidden="true" className="text-xs">{open ? "▾" : "◂"}</span>
                <span dir="ltr" className={`rounded-full px-1.5 text-[9px] font-black tabular-nums ${done === total ? "bg-[#2fc4ae]/15 text-[#7fe3d3]" : "bg-white/10 text-white/60"}`}>{done === total ? `✓ ${done}/${total}` : `${done}/${total}`}</span>
              </span>
            </button>
            {open ? <ol id={`l35-scene-list-${section.id}`} className="mt-1 space-y-0.5 border-r border-white/15 pr-2">
              {slides.map(({ candidate, slideIndex }) => (
                <li key={candidate.id}>
                  <button type="button" data-step-nav={candidate.id} aria-current={slideIndex === index ? "step" : undefined} onClick={() => { setIndex(slideIndex); setArea("lesson"); }} className={`${FOCUS_35} flex w-full items-center gap-1.5 truncate rounded-lg px-2 py-1.5 text-right text-[11px] font-bold leading-5 transition ${slideIndex === index ? "bg-[#0d8f7f]/25 text-white ring-1 ring-[#2fc4ae]/50" : "text-[#a9bccb] hover:bg-white/5"}`}>
                    {visited.has(candidate.id) ? <span aria-hidden="true" className="shrink-0 text-[9px] text-[#7fe3d3]">●</span> : <span aria-hidden="true" className="shrink-0 text-[9px] text-white/25">○</span>}
                    <Rich text={candidate.title} />
                  </button>
                </li>
              ))}
            </ol> : null}
          </div>
        );
      })}
      <div className="mt-3 space-y-1 border-t border-white/15 pt-2">
        <AreaButton35 active={area === "lesson"} onClick={() => setArea("lesson")}>📖 خطوات الدرس</AreaButton35>
        <AreaButton35 active={area === "test"} onClick={() => setArea("test")}>🧪 منطقة الاختبار · 25 سؤالًا</AreaButton35>
        <AreaButton35 active={area === "solutions"} onClick={() => setArea("solutions")}>🔑 منطقة الحلول {testSubmitted || teacherUnlocked ? "" : "🔒"}</AreaButton35>
        <AreaButton35 active={area === "teacher"} onClick={() => setArea("teacher")}>👩‍🏫 منطقة المعلم</AreaButton35>
      </div>
    </nav>
  ), [area, index, openMap, slide.section, visited]);

  const lessonArea = (
    <div className="space-y-4" data-area="lesson35-lesson">
      <header className="relative overflow-hidden rounded-3xl bg-[#0c2440]/90 p-3 text-white ring-1 ring-white/10 backdrop-blur sm:p-4">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_160px_at_15%_-40%,rgba(47,196,174,.25),transparent_60%),radial-gradient(360px_150px_at_92%_140%,rgba(245,182,74,.14),transparent_55%)]" />
        <div className="relative flex items-center gap-3">
          <div className="min-w-0 flex-1" aria-label="تقدم خطوات الدرس">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-black text-[#f5b64a]"><span>FUTURE LAB · LESSON 35</span><span dir="ltr" className="font-en tabular-nums text-white/80">{index + 1} / {SLIDE_COUNT_35}</span></div>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-black text-white">
              <span aria-hidden="true">{SCENE_META_35[slide.section].icon}</span>
              <Rich text={SECTIONS_35.find((section) => section.id === slide.section)?.arabic ?? ""} />
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-[#9fd8cd]"><En>{SCENE_META_35[slide.section].code}</En></span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-l from-[#2fc4ae] to-[#f5b64a] shadow-[0_0_12px_rgba(47,196,174,.7)] transition-[width] duration-300" style={{ width: `${((index + 1) / SLIDE_COUNT_35) * 100}%` }} /></div>
            <div className="mt-1.5 text-[10px] font-bold text-white/60">سجل المهمة: زرت {visited.size} من {SLIDE_COUNT_35} خطوة</div>
          </div>
          <MissionRing35 current={index + 1} total={SLIDE_COUNT_35} />
        </div>
      </header>

      <StepView35 key={slide.id} slide={slide} onGoTest={() => setArea("test")} onGoSolutions={() => setArea("solutions")} />

      {last ? <div className="mt-4 rounded-3xl border border-[#d6e1ea] bg-[#fbfdff] p-3 shadow-[0_14px_34px_-30px_rgba(8,28,48,.6)] sm:p-4" data-final-test-slot="35"><FinalTest lesson={35} questions={FINAL_TESTS[35]} accent="bg-[#0d8f7f]" onGoTeacher={() => setArea("teacher")} /></div> : null}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/15 pt-4 pb-5">
        <button type="button" disabled={index === 0} onClick={() => setIndex((current) => Math.max(0, current - 1))} className={`${FOCUS_35} rounded-xl border px-4 py-2.5 text-sm font-black transition ${index === 0 ? "cursor-not-allowed border-white/10 text-white/30" : "border-white/25 bg-white/10 text-white hover:bg-white/15"}`}>→ السابق</button>
        <div className="flex flex-wrap items-center gap-2">
          {onExit ? <button type="button" onClick={onExit} className={`${FOCUS_35} rounded-xl border border-white/25 bg-white/10 px-3 py-2.5 text-xs font-black text-white hover:bg-white/15`}><Rich text="🏠 الرئيسية" /></button> : null}
          {!last ? <button type="button" onClick={() => setIndex((current) => Math.min(SLIDE_COUNT_35 - 1, current + 1))} className={`${FOCUS_35} rounded-xl bg-[#0d8f7f] px-5 py-2.5 text-sm font-black text-white shadow-[0_0_24px_-6px_rgba(13,143,127,.8)] transition hover:bg-[#0a7466]`}>التالي ←</button> : <span className="rounded-xl bg-[#f5b64a]/15 px-4 py-2.5 text-xs font-black text-[#f5b64a] ring-1 ring-[#f5b64a]/35">🏁 نهاية خطوات الدرس · اختبر فهمك أدناه</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div dir="rtl" data-lesson="35" className="fl35-shell relative mx-auto flex min-h-screen w-full max-w-7xl gap-3 p-3 text-[#eaf1f6] sm:gap-4 sm:p-5">
      <style>{READABILITY_CSS_35}</style>
      <style>{THEME_CSS_35}</style>
      <div aria-hidden="true" className="fl35-stars" />
      <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] w-72 shrink-0 overflow-y-auto rounded-3xl border border-white/10 bg-[#0c2440]/85 p-3 shadow-[0_20px_50px_-30px_rgba(3,14,26,.9)] backdrop-blur lg:block relative">
        <div className="relative mb-2 overflow-hidden rounded-2xl bg-gradient-to-l from-[#123c5c] to-[#0f5e57] px-3 py-2 text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(160px_70px_at_85%_-30%,rgba(245,182,74,.3),transparent_60%)]" />
          <div className="relative">
            <div className="text-[10px] font-black uppercase tracking-[.16em] text-[#f5b64a]">FUTURE LAB</div>
            <div className="text-sm font-black">مستكشف الدرس 35</div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-[#2fc4ae]" style={{ width: `${(visited.size / SLIDE_COUNT_35) * 100}%` }} /></div>
          </div>
        </div>
        {rail}
      </aside>
      <MobileRail35 rail={rail} />
      <main id="l35-main" className="relative min-w-0 flex-1" data-area={area === "lesson" ? "lesson35-lesson" : area === "test" ? "lesson35-test" : area === "solutions" ? "lesson35-solutions" : "lesson35-teacher"}>
        <div className={area === "lesson" ? "block" : "hidden"} aria-hidden={area !== "lesson"}>{lessonArea}</div>
        <div className={area === "test" ? "space-y-3" : "hidden"} aria-hidden={area !== "test"}>
          <BackToLesson35 onBack={() => setArea("lesson")} />
          <TestArea35 onSubmitted={() => setTestSubmitted(true)} onRestart={() => setTestSubmitted(false)} />
        </div>
        <div className={area === "solutions" ? "space-y-3" : "hidden"} aria-hidden={area !== "solutions"}>
          <BackToLesson35 onBack={() => setArea("lesson")} />
          <Solutions35 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
        </div>
        <div className={area === "teacher" ? "space-y-3" : "hidden"} aria-hidden={area !== "teacher"}>
          <BackToLesson35 onBack={() => setArea("lesson")} />
          <TeacherArea35 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
        </div>
      </main>
    </div>
  );
}

function MissionRing35({ current, total }: { current: number; total: number }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, current / total));
  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center" role="img" aria-label={`تقدم خطوات الدرس: ${current} من ${total}`}>
      <svg viewBox="0 0 64 64" className="h-20 w-20 -rotate-90" aria-hidden="true">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="6" />
        <circle cx="32" cy="32" r={radius} fill="none" stroke="url(#fl35-ring-gradient)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${circumference * progress} ${circumference}`} className="transition-[stroke-dasharray] duration-500" />
        <defs>
          <linearGradient id="fl35-ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2fc4ae" />
            <stop offset="100%" stopColor="#f5b64a" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center" aria-hidden="true">
        <div dir="ltr" className="font-en text-xs font-black tabular-nums text-white">{current}<span className="text-white/50">/{total}</span></div>
        <div className="text-[9px] font-bold text-white/60">خطوة</div>
      </div>
    </div>
  );
}

function AreaButton35({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" data-area-nav aria-current={active ? "page" : undefined} onClick={onClick} className={`${FOCUS_35} w-full rounded-xl px-2 py-2 text-right text-xs font-black transition ${active ? "bg-[#0d8f7f]/25 text-white ring-1 ring-[#2fc4ae]/45" : "text-[#c9d7e2] hover:bg-white/5"}`}>{children}</button>;
}

function BackToLesson35({ onBack }: { onBack: () => void }) {
  return <button type="button" onClick={onBack} className={`${FOCUS_35} rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-black text-white backdrop-blur hover:bg-white/15`}>← العودة إلى خطوات الدرس</button>;
}

function MobileRail35({ rail }: { rail: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-3 left-3 z-40 lg:hidden">
    {open ? <div role="dialog" aria-modal="true" aria-label="مشاهد وخطوات Future Lab" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} onClick={(event) => { const target = event.target as HTMLElement; if (target.closest("[data-step-nav], [data-area-nav]")) setOpen(false); }} className="mb-2 max-h-[75vh] w-[min(19rem,calc(100vw-1.5rem))] overflow-y-auto rounded-3xl border border-white/15 bg-[#0c2440] p-3 text-white shadow-2xl">
      <div className="mb-2 flex items-center justify-between"><span className="text-xs font-black text-white">Future Lab · Lesson 35</span><button type="button" autoFocus onClick={() => setOpen(false)} className={`${FOCUS_35} rounded-lg bg-white/10 px-3 py-1.5 text-xs font-black text-white`}>إغلاق ✕</button></div>{rail}
    </div> : null}
    <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label="فتح قائمة خطوات الدرس" className={`${FOCUS_35} rounded-full border border-[#0d8f7f] bg-[#0d8f7f] px-4 py-3 text-sm font-black text-white shadow-[0_0_28px_-6px_rgba(13,143,127,.9)]`}>🧭 الخطوات</button>
  </div>;
}
