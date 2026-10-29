import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  DOORS_46,
  GOALS_46,
  LESSON_STEP_COUNT_46,
  READING_46,
  READING_QUESTIONS_46,
  SLIDES_46,
  STATIONS_46,
  type Slide46,
  type Tone46,
} from "./data";
import { En46, Examples46, Formula46, Mixed46, Note46, Points46, SlideFrame46, Tag46, toneClass } from "./kit46";
import { initialWorkspace46, PracticeSet46, Writing46, type Workspace46 } from "./Practice46";
import TestArea46 from "./TestArea46";
import TeacherArea46 from "./TeacherArea46";
import type { GradedTestResult46 } from "./testKey46";
import "./lesson46.css";

const TEST_STEP_46 = SLIDES_46.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace46) => Workspace46) => void;

const SPEAKER_COLORS = ["#6d28d9", "#0e7490", "#b45309", "#be123c", "#1d4ed8", "#047857"];
function speakerStyle(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { "--speaker": SPEAKER_COLORS[hash % SPEAKER_COLORS.length] } as React.CSSProperties;
}

/* ============================================================
   الغلاف
   ============================================================ */

function Cover46({ slide, onStart, onTest }: { slide: Slide46; onStart: () => void; onTest: () => void }) {
  return (
    <section className="l46-cover" data-step-id="cover" aria-labelledby="l46-title">
      <div className="l46-cover-copy">
        <div className="l46-cover-kicker">
          <span>الدرس 46 · 120</span>
          <span>THE THREE DOORS OF OBLIGATION</span>
        </div>
        <h1 id="l46-title" tabIndex={-1}>أبواب المنع <span className="l46-cover-accent">وعدم الضرورة</span></h1>
        <div className="l46-cover-title" dir="ltr" lang="en">
          <span>MUSTN&rsquo;T <em>vs</em> DON&rsquo;T HAVE TO <em>vs</em> NEEDN&rsquo;T</span>
        </div>
        <p className="l46-cover-lead">
          <Mixed46 text={slide.lead ?? ""} />
        </p>
        <div className="l46-cover-actions">
          <button type="button" className="l46-button l46-button--violet" onClick={onStart}>ابدأ الرحلة ←</button>
          <button type="button" className="l46-button l46-button--outline" onClick={onTest}>الاختبار النهائي ↗</button>
        </div>
        <div className="l46-cover-foot">
          <span>18 محطة تعليمية</span>
          <span>39 شريحة</span>
          <span>25 سؤالًا نهائيًا</span>
          <En46>THE THREE DOORS</En46>
        </div>
      </div>
      <div className="l46-hero-doors" dir="ltr" lang="en">
        {DOORS_46.map((door) => (
          <div className={`l46-hero-door ${toneClass(door.tone)}`} key={door.id}>
            <span className="l46-hero-num">{door.n}</span>
            <div className="l46-hero-arch">
              <span className="l46-hero-modal">
                {door.modal.split("\n").map((line, index) => (
                  <span key={`${door.id}-line-${index}`}>{line}</span>
                ))}
              </span>
            </div>
            <span className="l46-hero-ar" dir="rtl" lang="ar">{door.ar}</span>
            <span className="l46-hero-form">{door.en}</span>
            <span className="l46-hero-ex">{door.example}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   الأهداف
   ============================================================ */

function Goals46() {
  return (
    <div className="l46-goals">
      {GOALS_46.map((goal, i) => (
        <div className="l46-goal" key={goal}>
          <span className="l46-goal-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span><Mixed46 text={goal} /></span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   الأبواب التفاعلية
   ============================================================ */

function Doors46({ slide, workspace, onChange }: { slide: Slide46; workspace: Workspace46; onChange: SetWorkspace }) {
  const items = slide.examples ?? [];
  const activeIndex = Math.min(Math.max(workspace.door, 0), Math.max(items.length - 1, 0));
  const active = items[activeIndex];
  return (
    <div className="l46-door-interaction">
      <div className="l46-door-tabs" role="group" aria-label="اختر باب المعنى">
        {items.map((item, i) => {
          const door = DOORS_46[i];
          return (
            <button
              key={item.en}
              type="button"
              className={`l46-door-tab l46-door-tab--${door?.tone ?? "neutral"}`}
              aria-pressed={activeIndex === i}
              onClick={() => onChange((prev) => ({ ...prev, door: i }))}
            >
              <span className="l46-door-tab-number">{door?.n ?? `0${i + 1}`}</span>
              <En46>{door?.modal ?? item.tag ?? ""}</En46>
              <span>{door?.ar ?? ""}</span>
            </button>
          );
        })}
      </div>
      {active && (
        <div className={`l46-door-detail ${toneClass(active.tone)}`}>
          <span className="l46-mini-label"><En46>{active.tag}</En46></span>
          <p dir="ltr" lang="en">{active.en}</p>
          <p dir="rtl" lang="ar"><Mixed46 text={active.ar} /></p>
        </div>
      )}
      <PracticeSet46 setId="lab-door" workspace={workspace} onChange={onChange} />
      {slide.note && <Note46 text={slide.note} />}
    </div>
  );
}

/* ============================================================
   الحوارات
   ============================================================ */

function Dialogue46({ slide, workspace, onChange }: { slide: Slide46; workspace: Workspace46; onChange: SetWorkspace }) {
  const showAr = Boolean(workspace.dialogueAr[slide.id]);
  return (
    <div className="l46-dialogue">
      <div className="l46-dialogue-head">
        <span className="l46-dialogue-label"><span aria-hidden="true">◉</span> REAL-LIFE LAB / CONVERSATION</span>
        <button
          type="button"
          className="l46-text-button"
          aria-expanded={showAr}
          onClick={() => onChange((prev) => ({ ...prev, dialogueAr: { ...prev.dialogueAr, [slide.id]: !showAr } }))}
        >
          {showAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      {slide.turns?.map((turn, i) => (
        <div className="l46-turn" key={`${turn.speaker}-${i}`}>
          <span className="l46-avatar" style={speakerStyle(turn.speaker)} aria-hidden="true">{turn.speaker.slice(0, 1)}</span>
          <div className="l46-bubble">
            <span className="l46-speaker">{turn.speaker}</span>
            <p dir="ltr" lang="en">{turn.en}</p>
            {showAr && turn.ar && <p className="l46-turn-ar" dir="rtl" lang="ar"><Mixed46 text={turn.ar} /></p>}
          </div>
        </div>
      ))}
      {slide.labId && (
        <div className="l46-lab-check">
          <p>اختبر فهمك للموقف</p>
          <PracticeSet46 setId={slide.labId} workspace={workspace} onChange={onChange} />
        </div>
      )}
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

function Reading46({ workspace, onChange }: { workspace: Workspace46; onChange: SetWorkspace }) {
  return (
    <div className="l46-reading">
      <div className="l46-reading-head">
        <div className="l46-reading-title">
          <span>A DAY OF RULES AND SURPRISES</span>
          <h2>The School Technology Fair</h2>
        </div>
        <button
          type="button"
          className="l46-button l46-button--outline"
          aria-expanded={workspace.showTranslation}
          onClick={() => onChange((prev) => ({ ...prev, showTranslation: !prev.showTranslation }))}
        >
          {workspace.showTranslation ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      {READING_46.map((part, i) => (
        <div key={part.en} className="l46-reading-paragraph">
          <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p dir="ltr" lang="en">{part.en}</p>
            {workspace.showTranslation && <p dir="rtl" lang="ar"><Mixed46 text={part.ar} /></p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReadingQuestions46({ workspace, onChange }: { workspace: Workspace46; onChange: SetWorkspace }) {
  return (
    <div className="l46-practice-list">
      {READING_QUESTIONS_46.map((item, i) => (
        <section className="l46-reading-q" key={item.q}>
          <div className="l46-reading-q-top">
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p dir="ltr" lang="en">{item.q}</p>
          </div>
          <input
            type="text"
            dir="ltr"
            lang="en"
            className="l46-input"
            value={workspace.readingDrafts[i] ?? ""}
            aria-label={`إجابة سؤال القراءة ${i + 1}`}
            placeholder="Write your answer…"
            onChange={(event) => onChange((prev) => ({ ...prev, readingDrafts: { ...prev.readingDrafts, [i]: event.target.value } }))}
          />
          <div className="l46-reading-actions">
            <button
              type="button"
              className="l46-button l46-button--outline"
              aria-expanded={Boolean(workspace.readingOpen[i])}
              onClick={() => onChange((prev) => ({ ...prev, readingOpen: { ...prev.readingOpen, [i]: !prev.readingOpen[i] } }))}
            >
              {workspace.readingOpen[i] ? "إخفاء النموذج" : "قارن بالإجابة النموذجية"}
            </button>
          </div>
          {workspace.readingOpen[i] && (
            <div className="l46-answer-model">
              <p dir="ltr" lang="en">{item.answer}</p>
              <p><Mixed46 text={item.ar} /></p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

/* ============================================================
   الملخص الذهبي — مصفوفة الأبواب وبوصلة الزمن
   ============================================================ */

const SUMMARY_DOORS: { tone: Tone46; emoji: string; title: string; form: string; meaning: string; en: string; ar: string }[] = [
  { tone: "stop", emoji: "🛑", title: "MUSTN'T", form: "mustn't + V1", meaning: "ممنوع / لا يجوز", en: "You mustn't enter.", ar: "يُمنع عليك الدخول." },
  { tone: "choice", emoji: "🔓", title: "DON'T HAVE TO", form: "don't / doesn't have to + V1", meaning: "ليس عليك / غير ملزم", en: "You don't have to come.", ar: "لست مضطرًا إلى الحضور." },
  { tone: "need", emoji: "✅", title: "NEEDN'T", form: "needn't + V1", meaning: "لا حاجة إلى / ليس ضروريًا", en: "You needn't worry.", ar: "لا داعي للقلق." },
  { tone: "need", emoji: "🧩", title: "DON'T NEED TO", form: "don't / doesn't need to + V1", meaning: "عدم الحاجة بفعل عادي", en: "You don't need to wait.", ar: "لا حاجة إلى الانتظار." },
];

const SUMMARY_TIME: { when: string; form: string; meaning: string }[] = [
  { when: "PAST / NOT SPECIFIED", form: "didn't have to / didn't need to + V1", meaning: "لا يحدد التركيب وحده وقوع الفعل بالضرورة." },
  { when: "PAST / ACTION HAPPENED", form: "needn't have + V3", meaning: "وقع الفعل عادةً دون حاجة إليه." },
  { when: "FUTURE", form: "won't have to / won't need to + V1", meaning: "عدم الإلزام أو الحاجة في المستقبل." },
];

function Summary46() {
  return (
    <div className="l46-summary">
      <div className="l46-matrix">
        {SUMMARY_DOORS.map((door) => (
          <article className={`l46-matrix-card ${toneClass(door.tone)}`} key={door.title}>
            <div className="l46-matrix-head">
              <En46>{door.title}</En46>
              <span aria-hidden="true">{door.emoji}</span>
            </div>
            <span className="l46-matrix-meaning">{door.meaning}</span>
            <span className="l46-matrix-form">{door.form}</span>
            <p dir="ltr" lang="en">{door.en}</p>
            <p dir="rtl" lang="ar">{door.ar}</p>
          </article>
        ))}
      </div>
      <div className="l46-compass">
        {SUMMARY_TIME.map((item) => (
          <div className="l46-compass-card" key={item.when}>
            <En46>{item.when}</En46>
            <p dir="ltr" lang="en">{item.form}</p>
            <span><Mixed46 text={item.meaning} /></span>
          </div>
        ))}
      </div>
      <Note46 text="القاعدة الذهبية: MUSTN'T منع، و DON'T HAVE TO و NEEDN'T عدم ضرورة. لا تخلط وقوع الفعل بعد NEEDN'T HAVE بمعلومة لا يحددها DIDN'T NEED TO وحده." icon="🏆" />
    </div>
  );
}

/* ============================================================
   المصفوفة الكبرى (شرائح المقارنة)
   ============================================================ */

function MasterMap46() {
  const rows: { tone: Tone46; title: string; meaning: string; example: string; exampleAr: string }[] = [
    { tone: "stop", title: "MUSTN'T + V1", meaning: "منع: الفعل غير مسموح به.", example: "You mustn't park here.", exampleAr: "يُمنع ركن السيارة هنا." },
    { tone: "choice", title: "DON'T / DOESN'T HAVE TO + V1", meaning: "عدم الإلزام.", example: "You don't have to bring food.", exampleAr: "إحضار الطعام ليس إلزاميًا." },
    { tone: "need", title: "NEEDN'T + V1 / DON'T NEED TO + V1", meaning: "عدم الحاجة.", example: "You needn't bring your laptop.", exampleAr: "لا داعي لإحضار حاسوبك." },
  ];
  return (
    <div className="l46-matrix">
      {rows.map((row) => (
        <article className={`l46-matrix-card ${toneClass(row.tone)}`} key={row.title}>
          <div className="l46-matrix-head">
            <En46>{row.title}</En46>
            <span aria-hidden="true">{row.tone === "stop" ? "🛑" : row.tone === "choice" ? "🔓" : "✅"}</span>
          </div>
          <span className="l46-matrix-meaning">{row.meaning}</span>
          <p dir="ltr" lang="en">{row.example}</p>
          <p dir="rtl" lang="ar">{row.exampleAr}</p>
        </article>
      ))}
    </div>
  );
}

/* ============================================================
   خريطة التقدم
   ============================================================ */

function Roadmap46({ onRestart, onTest, onExit }: { onRestart: () => void; onTest: () => void; onExit?: () => void }) {
  return (
    <section className="l46-roadmap" data-step-id="course-progress">
      <div className="l46-roadmap-index"><En46>THE NEXT CHAPTER</En46><span aria-hidden="true">✳</span></div>
      <h1 id="l46-title" tabIndex={-1}>أغلقت الباب الصحيح.<br /><em>والرحلة مستمرة.</em></h1>
      <p>أتممنا الدرس 46 من أصل 120 درسًا. بقي 74 درسًا؛ والآن ننتقل من القواعد والمسؤوليات إلى لغة الرغبات والتفضيلات.</p>
      <div className="l46-progress-label">
        <span>تقدم المنهج</span>
        <bdi dir="ltr">46 / 120 · 38.3%</bdi>
      </div>
      <div className="l46-progress-track" role="progressbar" aria-label="تقدم المنهج" aria-valuemin={0} aria-valuemax={120} aria-valuenow={46}><div /></div>
      <div className="l46-next-lesson">
        <span>المحطة القادمة · <En46>LESSON 47</En46></span>
        <h2 dir="ltr" lang="en">WOULD, WOULD LIKE &amp; WOULD RATHER</h2>
        <p dir="ltr" lang="en">Wishes, Preferences &amp; Polite Requests</p>
        <p>الطلبات المهذبة، الرغبات، التفضيلات، الدعوات والعروض؛ والفرق بين WANT و WOULD LIKE و WOULD RATHER، مع حوارات وتدريبات واختبار.</p>
      </div>
      <div className="l46-roadmap-actions">
        <button type="button" className="l46-button l46-button--light" onClick={onRestart}>العودة إلى البداية</button>
        <button type="button" className="l46-button l46-button--outline-light" onClick={onTest}>مراجعة الاختبار</button>
        {onExit && <button type="button" className="l46-button l46-button--outline-light" onClick={onExit}>جميع الدروس</button>}
      </div>
    </section>
  );
}

/* ============================================================
   جسم الشريحة
   ============================================================ */

function Body46({ slide, index, station, workspace, onChangeWorkspace, answers, result, onChangeAnswer, onSubmitResult, onReset, teacherUnlocked, onUnlock, onLock, onStart, onTest, onRestart, onExit }: {
  slide: Slide46; index: number; station: string; workspace: Workspace46; onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>; result: GradedTestResult46 | null; onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult46) => void; onReset: () => void;
  teacherUnlocked: boolean; onUnlock: () => void; onLock: () => void;
  onStart: () => void; onTest: () => void; onRestart: () => void; onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover46 slide={slide} onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap46 onRestart={onRestart} onTest={onTest} onExit={onExit} />;

  const isMasterMap = slide.id === "master-map";
  const isStudy = slide.kind === "lesson" || slide.kind === "timeline" || (slide.kind === "comparison" && !isMasterMap);

  return (
    <SlideFrame46 slide={slide} index={index} station={station}>
      {slide.kind === "goals" && <Goals46 />}
      {slide.kind === "doors" && <Doors46 slide={slide} workspace={workspace} onChange={onChangeWorkspace} />}
      {isMasterMap && <MasterMap46 />}
      {isStudy && (
        <>
          {slide.formula && <Formula46 rows={slide.formula} tone={slide.tone} />}
          {slide.points && <Points46 points={slide.points} />}
          {slide.examples && (
            <Examples46
              items={slide.examples}
              variant={slide.kind === "timeline" ? "timeline" : slide.kind === "comparison" ? "comparison" : "grid"}
            />
          )}
          {slide.note && <Note46 text={slide.note} />}
        </>
      )}
      {slide.kind === "dialogue" && <Dialogue46 slide={slide} workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "practice" && slide.practiceSet && (
        <>
          <div className="l46-practice-meta"><Tag46>تدريب تفاعلي</Tag46><span>تحقّق من كل بند على حدة، ثم اطلب النموذج إذا احتجت.</span></div>
          <PracticeSet46 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {slide.kind === "reading" && <Reading46 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingQuestions" && <ReadingQuestions46 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "test" && <TestArea46 answers={answers} result={result} onChangeAnswer={onChangeAnswer} onSubmitResult={onSubmitResult} onReset={onReset} />}
      {slide.kind === "teacher" && <TeacherArea46 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} onLock={onLock} />}
      {slide.kind === "writing" && <Writing46 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "summary" && <Summary46 />}
    </SlideFrame46>
  );
}

/* ============================================================
   الدرس
   ============================================================ */

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
    items: SLIDES_46.flatMap((slide, index) => slide.station === station.id
      ? [{ index, title: <Mixed46 text={slide.title} />, mascot: <span aria-hidden="true">{slide.mascot}</span>, navId: slide.id }]
      : []),
  })), []);

  const slide = SLIDES_46[step] ?? SLIDES_46[0];
  const station = STATIONS_46.find((item) => item.id === slide.station) ?? STATIONS_46[0];
  const resetTest = useCallback(() => { setAnswers({}); setResult(null); setTeacherUnlocked(false); }, []);

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson46"
      rootDir="rtl"
      rootDataLesson={46}
      railAriaLabel="فهرس خطوات الدرس السادس والأربعين"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={<span>الدرس 46 <En46>· THREE DOORS</En46></span>}
      railSubtitle={
        <div className="l46-rail-actions">
          <span><bdi dir="ltr">{visited.size} / {LESSON_STEP_COUNT_46}</bdi> خطوات زرتها</span>
          <button type="button" onClick={() => goToStep(TEST_STEP_46)}>
            الاختبار النهائي <bdi dir="ltr">{result ? `(${result.score}/25)` : "(25)"}</bdi>
          </button>
        </div>
      }
      groups={groups}
      activeIndex={step}
      onSelectStep={goToStep}
      onExit={onExit}
      isMenuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      headerContent={
        <>
          <span>{station.title}</span> <span aria-hidden="true">·</span> <span><Mixed46 text={slide.title} /></span>
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_46) * 100}
      counter={<bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_46}</bdi>}
      counterDir="ltr"
      contentKey={step}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_46 - 1}
      mainRef={mainRef}
      mainId="l46-main"
    >
      <Body46
        slide={slide}
        index={step}
        station={station.title}
        workspace={workspace}
        onChangeWorkspace={setWorkspace}
        answers={answers}
        result={result}
        onChangeAnswer={(id, value) => setAnswers((previousAnswers) => ({ ...previousAnswers, [id]: value }))}
        onSubmitResult={setResult}
        onReset={resetTest}
        teacherUnlocked={teacherUnlocked}
        onUnlock={() => setTeacherUnlocked(true)}
        onLock={() => setTeacherUnlocked(false)}
        onStart={() => goToStep(1)}
        onTest={() => goToStep(TEST_STEP_46)}
        onRestart={() => goToStep(0)}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
