import "./lesson35.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import LessonStepNav from "../../shared/LessonStepNav";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import {
  LESSON_LEVEL_35,
  LESSON_SUBTITLE_35,
  LESSON_TITLE_35,
  SLIDES_35,
  SLIDE_COUNT_35,
  STAGES_35,
  STUDIO_AR_35,
  STUDIO_NAME_35,
  stepIndex35,
  type StageId35,
} from "./data";
import StepView35 from "./Steps35";
import TestArea35 from "./TestArea35";
import SolutionsArea35 from "./SolutionsArea35";
import TeacherArea35 from "./TeacherArea35";
import { FOCUS_35 } from "./kit35";

type Area35 = "lesson" | "test" | "solutions" | "teacher";

const VISITED_KEY_35 = "l35-future-garden-visited-v1";

const AREA_LABEL_35: Record<Area35, string> = {
  lesson: "خطوات الدرس",
  test: "منطقة الاختبار",
  solutions: "منطقة الحلول",
  teacher: "منطقة المعلم",
};

/* Mobile readability contract — scoped to this lesson's student surfaces only. */
const STUDENT_AREA_35 = '[data-lesson="35"] main:is([data-area="l35-lesson"], [data-area="l35-test"], [data-area="l35-solutions"])';
const READABILITY_CSS_35 = `
  @media (max-width: 767px) {
    ${STUDENT_AREA_35} [class~="text-xs"],
    ${STUDENT_AREA_35} [class~="text-[12px]"],
    ${STUDENT_AREA_35} [class~="text-[13px]"] { font-size: 0.875rem; }
  }
  [data-lesson="35"] nav button { white-space: normal; overflow-wrap: anywhere; }
`;

export default function Lesson35({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area35>("lesson");
  const [index, setIndex] = useState(0);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(() => new Set([SLIDES_35[0].id]));
  const [openStages, setOpenStages] = useState<Record<string, boolean>>(() => ({ A: true }));
  const [mobileMap, setMobileMap] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const firstRender = useRef(true);

  const step = SLIDES_35[index];
  const isLast = index === SLIDE_COUNT_35 - 1;
  const solutionsUnlocked = testSubmitted || teacherUnlocked;
  const stage = STAGES_35.find((candidate) => candidate.id === step.stage)!;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITED_KEY_35);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const known = new Set(SLIDES_35.map((candidate) => candidate.id));
      const restored = parsed.filter((id) => typeof id === "string" && known.has(id));
      if (restored.length) setVisited(new Set([...restored, SLIDES_35[0].id]));
    } catch {
      /* progress persistence is optional */
    }
  }, []);

  useEffect(() => {
    setVisited((current) => (current.has(step.id) ? current : new Set(current).add(step.id)));
    setOpenStages((current) => (current[step.stage] ? current : { ...current, [step.stage]: true }));
  }, [step.id, step.stage]);

  useEffect(() => {
    try {
      localStorage.setItem(VISITED_KEY_35, JSON.stringify([...visited]));
    } catch {
      /* ignore unavailable storage */
    }
  }, [visited]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (area === "lesson") mainRef.current?.scrollIntoView?.({ block: "start", behavior: "smooth" });
  }, [index, area]);

  const goPrev = useCallback(() => setIndex((current) => Math.max(0, current - 1)), []);
  const goNext = useCallback(() => setIndex((current) => Math.min(SLIDE_COUNT_35 - 1, current + 1)), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (area !== "lesson") return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest?.("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowLeft") goNext();
      else if (event.key === "ArrowRight") goPrev();
      else if (event.key === "Home") setIndex(0);
      else if (event.key === "End") setIndex(SLIDE_COUNT_35 - 1);
      else return;
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [area, goNext, goPrev]);

  const goToStep = (id: string) => {
    const target = stepIndex35(id);
    if (target >= 0) {
      setIndex(target);
      setArea("lesson");
      setMobileMap(false);
    }
  };

  const goToStage = (stageId: StageId35) => {
    const first = SLIDES_35.find((candidate) => candidate.stage === stageId);
    if (first) goToStep(first.id);
  };

  const rail = useMemo(() => (
    <nav aria-label="خريطة خطوات الدرس 35">
      <div className="fg35-rail__head">
        <span className="fg35-rail__title">🌿 خريطة الحديقة</span>
        <span className="fg35-rail__count" dir="ltr">{visited.size}/{SLIDE_COUNT_35}</span>
      </div>
      {STAGES_35.map((stageItem) => {
        const steps = SLIDES_35.map((candidate, stepIndex) => ({ candidate, stepIndex })).filter(({ candidate }) => candidate.stage === stageItem.id);
        const done = steps.filter(({ candidate }) => visited.has(candidate.id)).length;
        const expanded = openStages[stageItem.id] ?? false;
        const active = step.stage === stageItem.id;
        return (
          <div key={stageItem.id} className="fg35-group">
            <button
              type="button"
              className={`fg35-group__btn ${FOCUS_35}`}
              data-active={active}
              aria-expanded={expanded}
              onClick={() => setOpenStages((current) => ({ ...current, [stageItem.id]: !current[stageItem.id] }))}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 7, minWidth: 0 }}>
                <span className="fg35-group__letter" aria-hidden>{stageItem.id}</span>
                <span style={{ minWidth: 0 }}>
                  <span className="fg35-group__ar">{stageItem.ar}</span>
                  <span className="fg35-group__en">{stageItem.en}</span>
                </span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
                <span className="fg35-group__en" dir="ltr">{done}/{steps.length}</span>
                <span aria-hidden>{expanded ? "▾" : "◂"}</span>
              </span>
            </button>
            {expanded ? (
              <ol className="fg35-group__list">
                {steps.map(({ candidate, stepIndex }) => (
                  <li key={candidate.id}>
                    <button
                      type="button"
                      className={`fg35-stepbtn ${FOCUS_35}`}
                      data-step-nav={candidate.id}
                      data-visited={visited.has(candidate.id)}
                      aria-current={stepIndex === index && area === "lesson" ? "step" : undefined}
                      onClick={() => goToStep(candidate.id)}
                    >
                      <span className="fg35-stepbtn__num">{stepIndex + 1}</span>
                      <span style={{ minWidth: 0 }}>{candidate.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        );
      })}
    </nav>
  ), [area, index, openStages, step.stage, visited]);

  const tabs = (
    <nav className="fg35-top__actions" aria-label="مناطق الدرس 35">
      {(Object.keys(AREA_LABEL_35) as Area35[]).map((key) => (
        <button
          key={key}
          type="button"
          className={`fg35-tab ${FOCUS_35}`}
          data-area-tab={key}
          aria-pressed={area === key}
          onClick={() => setArea(key)}
        >
          {AREA_LABEL_35[key]}
          {key === "solutions" && !solutionsUnlocked ? " 🔒" : ""}
        </button>
      ))}
    </nav>
  );

  const nav = (
    <LessonStepNav
      ariaLabel={area === "lesson" ? "التنقل بين خطوات الدرس 35" : "التنقل في منطقة الدرس 35"}
      onPrev={area === "lesson" ? goPrev : () => setArea("lesson")}
      onNext={area === "lesson" ? goNext : () => setArea("lesson")}
      prevDisabled={area === "lesson" && index === 0}
      showNext={area === "lesson" && !isLast}
      prevLabel={area === "lesson" ? "→ السابق" : "← العودة إلى خطوات الدرس"}
      nextLabel="التالي ←"
      prevClassName="fg35-navbtn"
      nextClassName="fg35-navbtn fg35-navbtn--next"
    >
      {area === "lesson" ? (
        <span className="fg35-navchip">
          <span aria-hidden>{stage.icon}</span>
          <Rich text={`الخطوة ${index + 1} من ${SLIDE_COUNT_35} · ${stage.ar}`} />
        </span>
      ) : (
        <span className="fg35-navchip">{AREA_LABEL_35[area]}</span>
      )}
    </LessonStepNav>
  );

  const lessonPanel = (
    <div data-area="l35-lesson">
      {index === 0 ? <Hero35 onStart={goNext} onExit={onExit} /> : null}

      <div className="fg35-stagebar" role="group" aria-label="مراحل الدرس">
        {STAGES_35.map((stageItem) => (
          <button
            key={stageItem.id}
            type="button"
            className={`fg35-stage-chip ${FOCUS_35}`}
            data-active={step.stage === stageItem.id}
            aria-pressed={step.stage === stageItem.id}
            onClick={() => goToStage(stageItem.id)}
          >
            <span className="fg35-stage-chip__en">{stageItem.id} · {stageItem.en}</span>
            <span aria-hidden>{stageItem.icon}</span> {stageItem.ar}
          </button>
        ))}
      </div>

      <div className="fg35-mobile-nav">
        <button
          type="button"
          className={`fg35-mobile-nav__toggle ${FOCUS_35}`}
          aria-expanded={mobileMap}
          onClick={() => setMobileMap((current) => !current)}
        >
          <span>🗺️ خريطة الخطوات</span>
          <span dir="ltr">{visited.size}/{SLIDE_COUNT_35} ▾</span>
        </button>
        {mobileMap ? <div className="fg35-mobile-nav__body">{rail}</div> : null}
      </div>

      <div className="fg35-layout">
        <aside className="fg35-rail">{rail}</aside>
        <main id="l35-main" ref={mainRef} className="fg35-main">
          <StepView35 slide={step} index={index} onGoTest={() => setArea("test")} onGoSolutions={() => setArea("solutions")} />

          {isLast ? (
            <div style={{ marginTop: 12 }} data-course-check-slot>
              <div className="fg35-card" data-tone="sun">
                <div className="fg35-card__eyebrow">🧪 تقييم سريع مستقل عن اختبار §34</div>
                <p className="fg35-prose" style={{ marginTop: 4 }}>
                  هذا مكوّن التقييم المشترك في المنصة (15 سؤالًا) ويبقى كما هو لكل الدروس. الاختبار الأساسي للدرس هو اختبار الـ25 سؤالًا في منطقة الاختبار.
                </p>
                <div className="fg35-inputrow">
                  <button type="button" className={`fg35-btn ${FOCUS_35}`} onClick={() => setArea("test")}>الذهاب إلى اختبار الـ25 سؤالًا</button>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <FinalTest lesson={35} questions={FINAL_TESTS[35]} accent="bg-[#0f8f7d]" onGoTeacher={() => setArea("teacher")} />
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  );

  return (
    <div dir="rtl" data-lesson="35" data-l35-shell="future-garden-studio" className="fg35-app">
      <style>{READABILITY_CSS_35}</style>
      <div className="fg35-shell">
        <header className="fg35-top">
          <div className="fg35-brand">
            <span className="fg35-brand__mark" aria-hidden>🌻</span>
            <span>
              <span className="fg35-brand__eyebrow">{STUDIO_NAME_35} · LESSON 35</span>
              <span className="fg35-brand__title">{STUDIO_AR_35} · <Rich text="الخطط والنوايا والتوقعات" /></span>
            </span>
          </div>
          <div className="fg35-top__actions">
            {tabs}
            {onExit ? (
              <button type="button" className={`fg35-home ${FOCUS_35}`} onClick={onExit}>
                <span aria-hidden>🏠</span> الرئيسية
              </button>
            ) : null}
          </div>
        </header>

        {area === "lesson" ? lessonPanel : null}

        <div className="fg35-area" hidden={area === "lesson"}>
          <div className="fg35-area__bar">
            <button type="button" className={`fg35-area__back ${FOCUS_35}`} onClick={() => setArea("lesson")}>
              ← العودة إلى خطوات الدرس
            </button>
            <h2 className="fg35-area__title">{area === "lesson" ? "" : AREA_LABEL_35[area]}</h2>
          </div>

          {/* The test stays mounted so submitted answers and feedback survive tab switches. */}
          <div data-area="l35-test" hidden={area !== "test"}>
            <TestArea35 onSubmitted={() => setTestSubmitted(true)} onGoSolutions={() => setArea("solutions")} />
          </div>

          {area === "solutions" ? (
            <div data-area="l35-solutions">
              <SolutionsArea35 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
            </div>
          ) : null}
          {area === "teacher" ? (
            <TeacherArea35 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
          ) : null}
        </div>

        <div className="fg35-footer">{nav}</div>
      </div>
    </div>
  );
}

function Hero35({ onStart, onExit }: { onStart: () => void; onExit?: () => void }) {
  return (
    <section className="fg35-hero" aria-labelledby="l35-hero-title">
      <div className="fg35-hero__grid">
        <div>
          <span className="fg35-hero__eyebrow">🌱 LESSON 35 · {STUDIO_NAME_35}</span>
          <h1 id="l35-hero-title">
            ازرع نيّة… أو اقرأ دليلًا
            <span className="fg35-hero__en"><En>{LESSON_SUBTITLE_35}</En></span>
          </h1>
          <p className="fg35-hero__lead">
            <Rich text={LESSON_TITLE_35} /> — الدرس الذي يعلّمك متى تختار <En>BE GOING TO</En> بدل <En>WILL</En>، لا لمجرد أن الجملة عن المستقبل.
          </p>
          <div className="fg35-hero__actions">
            <button type="button" className={`fg35-begin ${FOCUS_35}`} onClick={onStart}>ابدأ من البذرة الأولى ←</button>
            <span className="fg35-hero__hint"><Rich text={LESSON_LEVEL_35} /></span>
            {onExit ? (
              <button type="button" className={`fg35-home ${FOCUS_35}`} onClick={onExit}>🏠 الرئيسية</button>
            ) : null}
          </div>
          <div className="fg35-facts">
            <span className="fg35-fact"><b>61</b> خطوة قصيرة</span>
            <span className="fg35-fact"><b>5</b> مراحل</span>
            <span className="fg35-fact"><b>25</b> سؤال اختبار</span>
            <span className="fg35-fact"><b>0</b> إجابة قبل التسليم</span>
          </div>
        </div>
        <GardenArt35 />
      </div>
    </section>
  );
}

function GardenArt35() {
  return (
    <svg className="fg35-hero__art" viewBox="0 0 360 260" role="img" aria-label="حديقة مستقبلية: ثلاثة أحواض لخطة ونية وتوقع، وشمس صفراء">
      <defs>
        <linearGradient id="l35-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf9f1" />
          <stop offset="55%" stopColor="#e6f3ff" />
          <stop offset="100%" stopColor="#fff6df" />
        </linearGradient>
        <linearGradient id="l35-bed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8f1de" />
          <stop offset="100%" stopColor="#8fd9bd" />
        </linearGradient>
        <linearGradient id="l35-leaf" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f8f7d" />
          <stop offset="100%" stopColor="#6fd6b5" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="360" height="260" rx="26" fill="url(#l35-sky)" />
      <circle cx="296" cy="52" r="30" fill="#f7c948" opacity="0.9" />
      <circle cx="296" cy="52" r="16" fill="#ffe6a0" />
      <path d="M0 186 Q90 158 180 182 T360 170 V260 H0 Z" fill="#dff6ea" opacity="0.85" />
      <path d="M0 206 Q100 182 200 202 T360 192 V260 H0 Z" fill="#c9efdc" opacity="0.7" />

      {[36, 136, 236].map((x, index) => (
        <g key={x}>
          <rect x={x} y="196" width="88" height="34" rx="10" fill="url(#l35-bed)" opacity={0.9 - index * 0.05} />
          <rect x={x + 6} y="190" width="76" height="12" rx="6" fill="#a9e3cc" />
          <path d={`M${x + 44} 190 C ${x + 42} 168, ${x + 48} 158, ${x + 44} 146`} stroke="url(#l35-leaf)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx={x + 34} cy="158" rx="13" ry="7" fill="#7ddbb8" transform={`rotate(-24 ${x + 34} 158)`} />
          <ellipse cx={x + 55} cy="151" rx="12" ry="6" fill="#5fcfaa" transform={`rotate(24 ${x + 55} 151)`} />
          <circle cx={x + 44} cy="142" r="8" fill={index === 1 ? "#f2685a" : index === 2 ? "#2f7fe0" : "#f5b62b"} />
        </g>
      ))}

      <g fontFamily="Fredoka, Tajawal, sans-serif" fontSize="9" fontWeight="800" direction="ltr">
        <rect x="36" y="236" width="88" height="17" rx="8" fill="#ffffff" opacity="0.92" />
        <text x="80" y="248" textAnchor="middle" fill="#0a6b5e">PLAN · خطة</text>
        <rect x="136" y="236" width="88" height="17" rx="8" fill="#ffffff" opacity="0.92" />
        <text x="180" y="248" textAnchor="middle" fill="#0a6b5e">EVIDENCE · دليل</text>
        <rect x="236" y="236" width="88" height="17" rx="8" fill="#ffffff" opacity="0.92" />
        <text x="280" y="248" textAnchor="middle" fill="#0a6b5e">CHOICE · اختيار</text>
      </g>

      <g transform="translate(16 18)" direction="ltr">
        <rect x="0" y="0" width="196" height="38" rx="12" fill="#ffffff" opacity="0.94" />
        <text x="98" y="15" textAnchor="middle" fontFamily="Fredoka, Tajawal, sans-serif" fontSize="9" fontWeight="800" fill="#0f8f7d">SUBJECT +</text>
        <text x="98" y="28" textAnchor="middle" fontFamily="Fredoka, Tajawal, sans-serif" fontSize="9" fontWeight="800" fill="#10352f">am / is / are + going to + V1</text>
      </g>
    </svg>
  );
}
