import { useEffect, useMemo, useState, type ReactNode } from "react";
import { En, Rich } from "../../shared/lessonKit";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { SLIDES_35, SECTIONS_35, SLIDE_COUNT_35, type SectionId35 } from "./data";
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

export default function Lesson35({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area35>("lesson");
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [index, setIndex] = useState(0);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>(() => Object.fromEntries(SECTIONS_35.map((section, sectionIndex) => [section.id, sectionIndex === 0])));
  const slide = SLIDES_35[index];
  const last = index === SLIDE_COUNT_35 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;

  useEffect(() => {
    setOpenMap((current) => ({ ...current, [slide.section]: true }));
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [index, slide.section]);

  useEffect(() => {
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }, [area]);

  const setSection = (sectionId: SectionId35) => {
    const first = SLIDES_35.findIndex((candidate) => candidate.section === sectionId);
    setOpenMap((current) => ({ ...current, [sectionId]: !current[sectionId] }));
    if (!openMap[sectionId] && first >= 0) { setIndex(first); setArea("lesson"); }
  };

  const rail = useMemo(() => (
    <nav aria-label="مشاهد Future Lab للدرس 35" className="space-y-1">
      {SECTIONS_35.map((section) => {
        const slides = SLIDES_35.map((candidate, slideIndex) => ({ candidate, slideIndex })).filter(({ candidate }) => candidate.section === section.id);
        const open = !!openMap[section.id];
        const active = slide.section === section.id;
        return (
          <div key={section.id}>
            <button type="button" aria-expanded={open} aria-controls={`l35-scene-list-${section.id}`} onClick={() => setSection(section.id)} className={`${FOCUS_35} flex w-full items-center justify-between gap-2 rounded-xl px-2 py-2 text-right text-xs font-black transition ${active ? "bg-[#17354a] text-white" : "text-[#304750] hover:bg-[#edf2ee]"}`}>
              <span className="min-w-0"><span className="ml-1 rounded-md bg-black/5 px-1.5 py-0.5 text-[10px]">{section.scene}</span> <Rich text={section.arabic} /><span className={`mt-0.5 block text-[10px] font-bold ${active ? "text-white/70" : "text-[#829091]"}`}><En>{section.label}</En></span></span>
              <span aria-hidden="true" className="shrink-0 text-xs">{open ? "▾" : "◂"}</span>
            </button>
            {open ? <ol id={`l35-scene-list-${section.id}`} className="mt-1 space-y-0.5 border-r border-[#dce2dc] pr-2">
              {slides.map(({ candidate, slideIndex }) => <li key={candidate.id}><button type="button" data-step-nav={candidate.id} aria-current={slideIndex === index ? "step" : undefined} onClick={() => { setIndex(slideIndex); setArea("lesson"); }} className={`${FOCUS_35} w-full truncate rounded-lg px-2 py-1.5 text-right text-[11px] font-bold leading-5 transition ${slideIndex === index ? "bg-[#e6efeb] text-[#17354a] ring-1 ring-[#92aea4]" : "text-[#53676a] hover:bg-[#f6f6f1]"}`}><Rich text={candidate.title} /></button></li>)}
            </ol> : null}
          </div>
        );
      })}
      <div className="mt-3 space-y-1 border-t border-[#ddd7cc] pt-2">
        <AreaButton35 active={area === "lesson"} onClick={() => setArea("lesson")}>📖 خطوات الدرس</AreaButton35>
        <AreaButton35 active={area === "test"} onClick={() => setArea("test")}>🧪 منطقة الاختبار · 25 سؤالًا</AreaButton35>
        <AreaButton35 active={area === "solutions"} onClick={() => setArea("solutions")}>🔑 منطقة الحلول {testSubmitted || teacherUnlocked ? "" : "🔒"}</AreaButton35>
        <AreaButton35 active={area === "teacher"} onClick={() => setArea("teacher")}>👩‍🏫 منطقة المعلم</AreaButton35>
      </div>
    </nav>
  ), [area, index, openMap, slide.section]);

  const lessonArea = (
    <div className="space-y-4" data-area="lesson35-lesson">
      <header className="rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1" aria-label="تقدم خطوات الدرس">
            <div className="flex items-center justify-between gap-2 text-xs font-black text-[#53676a]"><span>FUTURE LAB · LESSON 35</span><span dir="ltr" className="font-en tabular-nums">{index + 1} / {SLIDE_COUNT_35}</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e7e3d9]"><div className="h-full rounded-full bg-[#245f62] transition-[width] duration-300" style={{ width: `${((index + 1) / SLIDE_COUNT_35) * 100}%` }} /></div>
          </div>
          <div aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#17354a] text-xl text-white">{slide.section === "EVIDENCE" ? "🔎" : slide.section === "SIMULATOR" ? "🧭" : slide.section === "MISSION" ? "🚀" : "◈"}</div>
        </div>
      </header>

      <StepView35 slide={slide} onGoTest={() => setArea("test")} onGoSolutions={() => setArea("solutions")} />

      {last ? <div className="mt-4 rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-3 sm:p-4" data-final-test-slot="35"><FinalTest lesson={35} questions={FINAL_TESTS[35]} accent="bg-[#245f62]" onGoTeacher={() => setArea("teacher")} /></div> : null}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e1dbd0] pt-4 pb-5">
        <button type="button" disabled={index === 0} onClick={() => setIndex((current) => Math.max(0, current - 1))} className={`${FOCUS_35} rounded-xl border px-4 py-2.5 text-sm font-black transition ${index === 0 ? "cursor-not-allowed border-[#e8e3da] text-[#aeb8b4]" : "border-[#b9cfc6] bg-white text-[#245f62] hover:bg-[#eef4f0]"}`}>→ السابق</button>
        <div className="flex flex-wrap items-center gap-2">
          {onExit ? <button type="button" onClick={onExit} className={`${FOCUS_35} rounded-xl border border-[#d8d2c5] bg-white px-3 py-2.5 text-xs font-black text-[#53676a] hover:bg-[#f7f3ea]`}><Rich text="🏠 الرئيسية" /></button> : null}
          {!last ? <button type="button" onClick={() => setIndex((current) => Math.min(SLIDE_COUNT_35 - 1, current + 1))} className={`${FOCUS_35} rounded-xl bg-[#245f62] px-5 py-2.5 text-sm font-black text-white shadow-sm hover:bg-[#1d5053]`}>التالي ←</button> : <span className="rounded-xl bg-[#e8f1e9] px-4 py-2.5 text-xs font-black text-[#315d4e]">🏁 نهاية خطوات الدرس · اختبر فهمك أدناه</span>}
        </div>
      </div>
    </div>
  );

  return (
    <div dir="rtl" data-lesson="35" className="mx-auto flex min-h-screen w-full max-w-7xl gap-3 bg-[#f5f3ed] p-3 text-[#263a44] sm:gap-4 sm:p-5">
      <style>{READABILITY_CSS_35}</style>
      <aside className="sticky top-4 hidden max-h-[calc(100vh-2rem)] w-72 shrink-0 overflow-y-auto rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-3 shadow-sm lg:block">
        <div className="mb-2 rounded-2xl bg-[#17354a] px-3 py-2 text-white"><div className="text-[10px] font-black uppercase tracking-[.16em] text-[#d9b77f]">FUTURE LAB</div><div className="text-sm font-black">مستكشف الدرس 35</div></div>
        {rail}
      </aside>
      <MobileRail35 rail={rail} />
      <main id="l35-main" className="min-w-0 flex-1" data-area={area === "lesson" ? "lesson35-lesson" : area === "test" ? "lesson35-test" : area === "solutions" ? "lesson35-solutions" : "lesson35-teacher"}>
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

function AreaButton35({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button type="button" data-area-nav aria-current={active ? "page" : undefined} onClick={onClick} className={`${FOCUS_35} w-full rounded-xl px-2 py-2 text-right text-xs font-black transition ${active ? "bg-[#eef4f0] text-[#17354a] ring-1 ring-[#c7d8d3]" : "text-[#53676a] hover:bg-[#f6f6f1]"}`}>{children}</button>;
}

function BackToLesson35({ onBack }: { onBack: () => void }) {
  return <button type="button" onClick={onBack} className={`${FOCUS_35} rounded-xl border border-[#b9cfc6] bg-white px-4 py-2 text-xs font-black text-[#245f62] hover:bg-[#eef4f0]`}>← العودة إلى خطوات الدرس</button>;
}

function MobileRail35({ rail }: { rail: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="fixed bottom-3 left-3 z-40 lg:hidden">
    {open ? <div role="dialog" aria-modal="true" aria-label="مشاهد وخطوات Future Lab" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} onClick={(event) => { const target = event.target as HTMLElement; if (target.closest("[data-step-nav], [data-area-nav]")) setOpen(false); }} className="mb-2 max-h-[75vh] w-[min(19rem,calc(100vw-1.5rem))] overflow-y-auto rounded-3xl border border-[#d8d2c5] bg-[#fffdf8] p-3 shadow-2xl">
      <div className="mb-2 flex items-center justify-between"><span className="text-xs font-black text-[#17354a]">Future Lab · Lesson 35</span><button type="button" autoFocus onClick={() => setOpen(false)} className={`${FOCUS_35} rounded-lg bg-[#eef4f0] px-3 py-1.5 text-xs font-black text-[#245f62]`}>إغلاق ✕</button></div>{rail}
    </div> : null}
    <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label="فتح قائمة خطوات الدرس" className={`${FOCUS_35} rounded-full border border-[#245f62] bg-[#245f62] px-4 py-3 text-sm font-black text-white shadow-lg`}>🧭 الخطوات</button>
  </div>;
}
