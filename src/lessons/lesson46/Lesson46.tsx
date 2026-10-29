import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { GOALS_46, LESSON_STEP_COUNT_46, READING_46, READING_QUESTIONS_46, SLIDES_46, STATIONS_46, type Slide46 } from "./data";
import { En46, Examples46, Formula46, Mixed46, Note46, SlideFrame46 } from "./kit46";
import { initialWorkspace46, PracticeSet46, Writing46, type Workspace46 } from "./Practice46";
import TestArea46 from "./TestArea46";
import TeacherArea46 from "./TeacherArea46";
import type { GradedTestResult46 } from "./testKey46";
import "./lesson46.css";

const TEST_STEP_46 = SLIDES_46.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace46) => Workspace46) => void;

function DoorIllustration46() {
  return (
    <div className="l46-door-stage" aria-label="الأبواب الثلاثة: منع، عدم إلزام، عدم حاجة">
      <div className="l46-stage-top"><span>THE THREE DOORS</span><span>01 — 03</span></div>
      <div className="l46-architectural-doors" dir="ltr" aria-hidden="true">
        <div className="l46-arch l46-arch--stop"><span>01</span><div><i /> <b>STOP</b></div></div>
        <div className="l46-arch l46-arch--choice"><span>02</span><div><i /> <b>CHOICE</b></div></div>
        <div className="l46-arch l46-arch--need"><span>03</span><div><i /> <b>NO NEED</b></div></div>
      </div>
      <div className="l46-stage-bottom"><span>RULES</span><span>CHOICES</span><span>NECESSITY</span></div>
    </div>
  );
}

function Cover46({ onStart, onTest }: { onStart: () => void; onTest: () => void }) {
  return (
    <section className="l46-cover" data-step-id="cover">
      <div className="l46-cover-copy">
        <div className="l46-cover-index"><En46>THE GRAMMAR FIELD GUIDE</En46><span>LESSON 46 / 120</span></div>
        <p className="l46-cover-ar">الدرس السادس والأربعون</p>
        <h1 id="l46-title" tabIndex={-1}>ليس كل <span>«لا»</span><br />تعني المنع.</h1>
        <div className="l46-cover-title" dir="ltr" lang="en">MUSTN'T <em>vs</em><br />DON'T HAVE TO <em>vs</em><br />NEEDN'T</div>
        <p className="l46-cover-lead">ثلاثة أبواب تفصل بين الممنوع، والاختياري، وما لا حاجة إليه. وأمامك تذكرة تكشف سرًا عن الماضي.</p>
        <div className="l46-cover-actions"><button type="button" className="l46-button l46-button--dark" onClick={onStart}>ابدأ الرحلة ←</button><button type="button" className="l46-text-button" onClick={onTest}>الاختبار النهائي <span>↗</span></button></div>
        <div className="l46-cover-foot"><span>18 محطة تعليمية</span><span>25 سؤالًا نهائيًا</span><En46>THE THREE DOORS OF OBLIGATION</En46></div>
      </div>
      <DoorIllustration46 />
    </section>
  );
}

function Doors46({ slide, workspace, onChange }: { slide: Slide46; workspace: Workspace46; onChange: SetWorkspace }) {
  const items = slide.examples ?? [];
  const active = items[workspace.door] ?? items[0];
  return (
    <div className="l46-door-interaction">
      <div className="l46-door-tabs" role="group" aria-label="اختر باب المعنى">
        {items.map((item, i) => <button key={item.en} type="button" className={`l46-door-tab l46-door-tab--${item.tone}`} aria-pressed={workspace.door === i} onClick={() => onChange((prev) => ({ ...prev, door: i }))}>
          <span className="l46-door-tab-number">0{i + 1}</span><En46>{["MUSTN'T", "DON'T HAVE TO", "NEEDN'T"][i]}</En46><span>{i === 0 ? "المنع" : i === 1 ? "عدم الإلزام" : "عدم الحاجة"}</span>
        </button>)}
      </div>
      {active && <div className="l46-door-detail"><span className="l46-mini-label"><En46>{active.tag}</En46></span><p dir="ltr" lang="en">{active.en}</p><p>{active.ar}</p></div>}
      {slide.note && <Note46 text={slide.note} />}
      <PracticeSet46 setId="lab-door" workspace={workspace} onChange={onChange} />
    </div>
  );
}

function Reading46({ workspace, onChange }: { workspace: Workspace46; onChange: SetWorkspace }) {
  return <div className="l46-reading">
    <div className="l46-reading-header"><div><En46>A DAY OF RULES AND SURPRISES</En46><h2>The School Technology Fair</h2></div><button type="button" className="l46-button l46-button--outline" aria-expanded={workspace.showTranslation} onClick={() => onChange((prev) => ({ ...prev, showTranslation: !prev.showTranslation }))}>{workspace.showTranslation ? "إخفاء الترجمة" : "إظهار الترجمة العربية"}</button></div>
    {READING_46.map((part, i) => <div key={part.en} className="l46-reading-paragraph"><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div><p dir="ltr" lang="en">{part.en}</p>{workspace.showTranslation && <p dir="rtl" lang="ar">{part.ar}</p>}</div></div>)}
  </div>;
}

function ReadingQuestions46({ workspace, onChange }: { workspace: Workspace46; onChange: SetWorkspace }) {
  return <div className="l46-practice-list">{READING_QUESTIONS_46.map((item, i) => <section className="l46-practice-card" key={item.q}>
    <div className="l46-question-top"><span className="l46-question-number">{String(i + 1).padStart(2, "0")}</span><p dir="ltr" lang="en">{item.q}</p></div>
    <input type="text" dir="ltr" lang="en" className="l46-input" value={workspace.readingDrafts[i] ?? ""} aria-label={`إجابة سؤال القراءة ${i + 1}`} placeholder="Write your answer…" onChange={(event) => onChange((prev) => ({ ...prev, readingDrafts: { ...prev.readingDrafts, [i]: event.target.value } }))} />
    <button type="button" className="l46-button l46-button--outline" aria-expanded={Boolean(workspace.readingOpen[i])} onClick={() => onChange((prev) => ({ ...prev, readingOpen: { ...prev.readingOpen, [i]: !prev.readingOpen[i] } }))}>{workspace.readingOpen[i] ? "إخفاء النموذج" : "قارن بالإجابة النموذجية"}</button>
    {workspace.readingOpen[i] && <div className="l46-feedback is-correct"><p dir="ltr" lang="en">{item.answer}</p><p>{item.ar}</p></div>}
  </section>)}</div>;
}

function Summary46() {
  const summaries = [
    { en: "MUSTN'T + V1", ar: "منع", example: "You mustn't enter.", tone: "stop" },
    { en: "DON'T / DOESN'T HAVE TO + V1", ar: "عدم الإلزام", example: "You don't have to come.", tone: "choice" },
    { en: "NEEDN'T + V1", ar: "عدم الحاجة", example: "You needn't worry.", tone: "need" },
    { en: "DON'T / DOESN'T NEED TO + V1", ar: "عدم الحاجة بفعل عادي", example: "You don't need to wait.", tone: "choice" },
  ];
  return <div className="l46-summary">
    <div className="l46-summary-grid">{summaries.map((item) => <div className={`l46-summary-card l46-summary-card--${item.tone}`} key={item.en}><En46>{item.en}</En46><strong>{item.ar}</strong><p dir="ltr" lang="en">{item.example}</p></div>)}</div>
    <div className="l46-summary-time"><div><En46>PAST / NOT SPECIFIED</En46><p><En46>didn't have to / didn't need to + V1</En46></p><span>لا يحدد التركيب وحده وقوع الفعل بالضرورة.</span></div><div><En46>PAST / ACTION HAPPENED</En46><p><En46>needn't have + V3</En46></p><span>وقع الفعل عادةً دون حاجة إليه.</span></div><div><En46>FUTURE</En46><p><En46>won't have to / won't need to + V1</En46></p><span>عدم الإلزام أو الحاجة في المستقبل.</span></div></div>
    <Note46 text="القاعدة الذهبية: MUSTN'T منع، و DON'T HAVE TO و NEEDN'T عدم ضرورة. لا تخلط وقوع الفعل بعد NEEDN'T HAVE بمعلومة لا يحددها DIDN'T NEED TO وحده." />
  </div>;
}

function Roadmap46({ onRestart, onTest, onExit }: { onRestart: () => void; onTest: () => void; onExit?: () => void }) {
  return <section className="l46-roadmap" data-step-id="course-progress">
    <div className="l46-roadmap-index"><En46>THE NEXT CHAPTER</En46><span>✳</span></div>
    <h1 id="l46-title" tabIndex={-1}>أغلقت الباب الصحيح.<br /><em>والرحلة مستمرة.</em></h1>
    <p>أتممنا الدرس 46 من أصل 120 درسًا. بقي 74 درسًا؛ والآن ننتقل من القواعد والمسؤوليات إلى لغة الرغبات والتفضيلات.</p>
    <div className="l46-progress-label"><span>تقدم المنهج</span><bdi dir="ltr">46 / 120 · 38.3%</bdi></div>
    <div className="l46-progress-track" role="progressbar" aria-label="تقدم المنهج" aria-valuemin={0} aria-valuemax={120} aria-valuenow={46}><div /></div>
    <div className="l46-next-lesson"><span>المحطة القادمة · <En46>LESSON 47</En46></span><h2 dir="ltr" lang="en">WOULD, WOULD LIKE &amp; WOULD RATHER</h2><p dir="ltr" lang="en">Wishes, Preferences &amp; Polite Requests</p><p>الطلبات المهذبة، الرغبات، التفضيلات، الدعوات والعروض؛ والفرق بين WANT و WOULD LIKE و WOULD RATHER، مع حوارات وتدريبات واختبار.</p></div>
    <div className="l46-roadmap-actions"><button type="button" className="l46-button l46-button--light" onClick={onRestart}>العودة إلى البداية</button><button type="button" className="l46-button l46-button--outline-light" onClick={onTest}>مراجعة الاختبار</button>{onExit && <button type="button" className="l46-button l46-button--outline-light" onClick={onExit}>جميع الدروس</button>}</div>
  </section>;
}

function Body46({ slide, index, workspace, onChangeWorkspace, answers, result, onChangeAnswer, onSubmitResult, onReset, teacherUnlocked, onUnlock, onLock, onStart, onTest, onRestart, onExit }: {
  slide: Slide46; index: number; workspace: Workspace46; onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>; result: GradedTestResult46 | null; onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult46) => void; onReset: () => void;
  teacherUnlocked: boolean; onUnlock: () => void; onLock: () => void;
  onStart: () => void; onTest: () => void; onRestart: () => void; onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover46 onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap46 onRestart={onRestart} onTest={onTest} onExit={onExit} />;
  return <SlideFrame46 slide={slide} index={index}>
    {slide.kind === "goals" && <div className="l46-goals">{GOALS_46.map((goal, i) => <div key={goal}><span>{String(i + 1).padStart(2, "0")}</span><p><Mixed46 text={goal} /></p></div>)}</div>}
    {slide.kind === "doors" && <Doors46 slide={slide} workspace={workspace} onChange={onChangeWorkspace} />}
    {(["lesson", "comparison", "timeline"] as const).some((kind) => kind === slide.kind) && <>
      {slide.formula && <Formula46>{slide.formula}</Formula46>}
      {slide.points && <ul className="l46-points">{slide.points.map((point) => <li key={point}><Mixed46 text={point} /></li>)}</ul>}
      {slide.examples && <Examples46 items={slide.examples} variant={slide.kind === "timeline" ? "timeline" : slide.kind === "comparison" ? "comparison" : "grid"} />}
      {slide.note && <Note46 text={slide.note} />}
    </>}
    {slide.kind === "dialogue" && <div className="l46-dialogue"><div className="l46-dialogue-label"><En46>REAL-LIFE LAB / CONVERSATION</En46><span>◉</span></div>{slide.turns?.map((turn, i) => <div className="l46-turn" key={`${turn.speaker}-${i}`}><span dir="ltr" lang="en">{turn.speaker}</span><p dir="ltr" lang="en">{turn.en}</p></div>)}{slide.labId && <div className="l46-lab-check"><p>اختبر فهمك للموقف</p><PracticeSet46 setId={slide.labId} workspace={workspace} onChange={onChangeWorkspace} /></div>}</div>}
    {slide.kind === "practice" && slide.practiceSet && <PracticeSet46 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />}
    {slide.kind === "reading" && <Reading46 workspace={workspace} onChange={onChangeWorkspace} />}
    {slide.kind === "readingQuestions" && <ReadingQuestions46 workspace={workspace} onChange={onChangeWorkspace} />}
    {slide.kind === "test" && <TestArea46 answers={answers} result={result} onChangeAnswer={onChangeAnswer} onSubmitResult={onSubmitResult} onReset={onReset} />}
    {slide.kind === "teacher" && <TeacherArea46 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} onLock={onLock} />}
    {slide.kind === "writing" && <Writing46 workspace={workspace} onChange={onChangeWorkspace} />}
    {slide.kind === "summary" && <Summary46 />}
  </SlideFrame46>;
}

export default function Lesson46({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace46>(initialWorkspace46);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradedTestResult46 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const next = Math.max(0, Math.min(LESSON_STEP_COUNT_46 - 1, target));
    setStep(next);
    setVisited((previous) => new Set(previous).add(next));
    setMenuOpen(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);
  const previous = useCallback(() => goToStep(step - 1), [goToStep, step]);
  const next = useCallback(() => goToStep(step + 1), [goToStep, step]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "Escape" && menuOpen) { setMenuOpen(false); return; }
      if (menuOpen || target?.isContentEditable || (target && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName))) return;
      if (event.key === "ArrowLeft" || event.key === " ") { event.preventDefault(); next(); }
      else if (event.key === "ArrowRight") { event.preventDefault(); previous(); }
      else if (event.key === "Home") { event.preventDefault(); goToStep(0); }
      else if (event.key === "End") { event.preventDefault(); goToStep(LESSON_STEP_COUNT_46 - 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(() => STATIONS_46.map((station) => ({
    section: station.title,
    items: SLIDES_46.flatMap((slide, index) => slide.station === station.id ? [{ index, title: <Mixed46 text={slide.title} />, navId: slide.id }] : []),
  })), []);
  const slide = SLIDES_46[step] ?? SLIDES_46[0];
  const station = STATIONS_46.find((item) => item.id === slide.station) ?? STATIONS_46[0];
  const resetTest = useCallback(() => { setAnswers({}); setResult(null); setTeacherUnlocked(false); }, []);

  return <Lesson1Shell
    rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson46"
    rootDir="rtl" rootDataLesson={46} railAriaLabel="فهرس خطوات الدرس السادس والأربعين" navAriaLabel="التنقل بين خطوات الدرس" markActiveStep
    railTitle={<span>الدرس 46 <En46>· THREE DOORS</En46></span>}
    railSubtitle={<div className="l46-rail-actions"><span><bdi dir="ltr">{visited.size} / {LESSON_STEP_COUNT_46}</bdi> خطوات زرتها</span><button type="button" onClick={() => goToStep(TEST_STEP_46)}>الاختبار النهائي <bdi dir="ltr">{result ? `(${result.score}/25)` : "(25)"}</bdi></button></div>}
    groups={groups} activeIndex={step} onSelectStep={goToStep} onExit={onExit} isMenuOpen={menuOpen} onMenuOpenChange={setMenuOpen}
    headerContent={<><span>{station.title}</span> <span aria-hidden="true">·</span> <span><Mixed46 text={slide.title} /></span></>}
    progress={((step + 1) / LESSON_STEP_COUNT_46) * 100} counter={<bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_46}</bdi>} counterDir="ltr"
    contentKey={step} onPrev={previous} onNext={next} prevDisabled={step === 0} nextDisabled={step === LESSON_STEP_COUNT_46 - 1} mainRef={mainRef} mainId="l46-main"
  >
    <Body46 slide={slide} index={step} workspace={workspace} onChangeWorkspace={setWorkspace} answers={answers} result={result}
      onChangeAnswer={(id, value) => setAnswers((previousAnswers) => ({ ...previousAnswers, [id]: value }))} onSubmitResult={setResult} onReset={resetTest}
      teacherUnlocked={teacherUnlocked} onUnlock={() => setTeacherUnlocked(true)} onLock={() => setTeacherUnlocked(false)}
      onStart={() => goToStep(1)} onTest={() => goToStep(TEST_STEP_46)} onRestart={() => goToStep(0)} onExit={onExit} />
  </Lesson1Shell>;
}
