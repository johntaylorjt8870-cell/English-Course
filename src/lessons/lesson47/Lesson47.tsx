import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  GOALS_47,
  LANES_47,
  LESSON_STEP_COUNT_47,
  READING_47,
  READING_QUESTIONS_47,
  SLIDES_47,
  STATIONS_47,
  type Slide47,
} from "./data";
import { En47, Examples47, Formula47, Mixed47, Note47, Points47, SlideFrame47, Table47View, Tag47, toneClass } from "./kit47";
import { initialWorkspace47, PracticeSet47, WordOrder47, Writing47, type Workspace47 } from "./Practice47";
import TestArea47 from "./TestArea47";
import TeacherArea47 from "./TeacherArea47";
import type { GradedTestResult47 } from "./testKey47";
import "./lesson47.css";

// Rail labels stay Arabic-only: the narrow index is a navigation aid, while the
// full bilingual title remains the slide heading.
const STATION_LABELS_47: Record<string, string> = {
  opening: "البداية",
  "would-core": "أساسيات الفعل الناقص",
  "would-like": "الرغبة",
  "would-rather": "التفضيل",
  "rather-subject": "الفاعلان والماضي",
  "polite-requests": "الطلبات المهذبة",
  "modal-compare": "خريطة الأفعال",
  dialogs: "مواقف حياتية",
  detective: "محقق القواعد",
  practice: "التدريب",
  reading: "القراءة",
  test: "الاختبار والمعلم",
  writing: "الكتابة",
  summary: "الملخص",
  progress: "التقدم",
};
const RAIL_TITLES_47: Record<string, string> = {
  "would-meaning": "مدخل: ما هذا الفعل؟",
  "would-contractions": "الاختصارات",
  "contractions-check": "اختبر فهم الاختصارات",
  "like-meaning": "الرغبة بأدب",
  "like-noun": "الرغبة في شيء",
  "like-to": "الرغبة في فعل",
  "why-to": "لماذا تأتي أداة قبل الفعل؟",
  "like-negative": "النفي في الرغبة",
  "like-questions": "السؤال عن الرغبة",
  "like-person": "رغبة تخصّ شخصًا آخر",
  "rather-meaning": "التفضيل",
  "rather-rule": "قاعدة التفضيل الذهبية",
  "like-vs-rather": "الرغبة أم التفضيل؟",
  "rather-than": "المقارنة بين خيارين",
  "rather-negative": "تفضيل عدم الفعل",
  "rather-questions": "السؤال عن التفضيل",
  "mind-form": "صيغة الطلب المهذب",
  "mind-answers": "لماذا تعني كلمة النفي موافقة؟",
  "practice-like": "١ · الرغبة في فعل",
  "practice-rather": "٢ · التفضيل",
  "practice-mind": "٤ · الطلب المهذب",
  "final-test": "الاختبار النهائي",
  writing: "مهمة الكتابة",
};
const TEST_STEP_47 = SLIDES_47.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace47) => Workspace47) => void;

const SPEAKER_COLORS = ["#8e2d54", "#0f766e", "#b7791f", "#5b4b8a", "#1d4ed8", "#9d174d"];
function speakerStyle(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { "--speaker": SPEAKER_COLORS[hash % SPEAKER_COLORS.length] } as React.CSSProperties;
}

/* ============================================================
   الغلاف — ثلاث بطاقات «لباقة» بملمس ورق المقهى
   ============================================================ */

function Cover47({ slide, onStart, onTest }: { slide: Slide47; onStart: () => void; onTest: () => void }) {
  return (
    <section className="l47-cover" data-step-id="cover" aria-labelledby="l47-title">
      <div className="l47-cover-copy">
        <div className="l47-cover-kicker">
          <span>الدرس 47 · 120</span>
          <span>THE ART OF POLITE ENGLISH</span>
        </div>
        <h1 id="l47-title" tabIndex={-1}>فنّ الاختيار <span className="l47-cover-accent">والتواصل المهذب</span></h1>
        <div className="l47-cover-title" dir="ltr" lang="en">
          <span>WOULD, WOULD LIKE <em>&amp;</em> WOULD RATHER</span>
        </div>
        <p className="l47-cover-lead">
          <Mixed47 text={slide.lead ?? ""} />
        </p>
        <div className="l47-cover-actions">
          <button type="button" className="l47-button l47-button--wine" onClick={onStart}>ابدأ الرحلة ←</button>
          <button type="button" className="l47-button l47-button--outline" onClick={onTest}>الاختبار النهائي ↗</button>
        </div>
        <div className="l47-cover-foot">
          <span>15 محطة تعليمية</span>
          <span>{LESSON_STEP_COUNT_47} شريحة</span>
          <span>25 سؤالًا نهائيًا</span>
          <En47>SAY IT POLITELY</En47>
        </div>
      </div>
      <div className="l47-ticket-stack" dir="ltr" lang="en">
        {LANES_47.map((lane) => (
          <article className={`l47-ticket ${toneClass(lane.tone)}`} key={lane.id}>
            <span className="l47-ticket-punch" aria-hidden="true" />
            <div className="l47-ticket-head">
              <span className="l47-ticket-num">{lane.n}</span>
              <span className="l47-ticket-emoji" aria-hidden="true">{lane.emoji}</span>
            </div>
            <span className="l47-ticket-phrase">{lane.phrase}</span>
            <span className="l47-ticket-formula">{lane.formula}</span>
            <span className="l47-ticket-perforation" aria-hidden="true" />
            <span className="l47-ticket-ar" dir="rtl" lang="ar">{lane.ar}</span>
            <span className="l47-ticket-ex">{lane.example}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   الأهداف
   ============================================================ */

function Goals47() {
  return (
    <div className="l47-goals">
      {GOALS_47.map((goal) => (
        <div className="l47-goal" key={goal}>
          <span><Mixed47 text={goal} /></span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   البطاقات الثلاث — اختيار تفاعلي
   ============================================================ */

function Lanes47({ slide, workspace, onChange }: { slide: Slide47; workspace: Workspace47; onChange: SetWorkspace }) {
  const items = slide.examples ?? [];
  const activeIndex = Math.min(Math.max(workspace.lane, 0), Math.max(items.length - 1, 0));
  const active = items[activeIndex];
  return (
    <div className="l47-lane-interaction">
      <div className="l47-lane-tabs" role="group" aria-label="اختر وظيفة التعبير">
        {LANES_47.map((lane, i) => (
          <button
            key={lane.id}
            type="button"
            className={`l47-lane-tab ${toneClass(lane.tone)}`}
            aria-pressed={activeIndex === i}
            onClick={() => onChange((previous) => ({ ...previous, lane: i }))}
          >
            <span className="l47-lane-tab-top">
              <span className="l47-lane-num">{lane.n}</span>
              <span className="l47-lane-emoji" aria-hidden="true">{lane.emoji}</span>
            </span>
            <En47>{lane.phrase}</En47>
            <span className="l47-lane-ar">{lane.ar}</span>
            <span className="l47-lane-q">{lane.question}</span>
          </button>
        ))}
      </div>
      {active && (
        <div className={`l47-lane-detail ${toneClass(active.tone)}`}>
          <span className="l47-mini-label"><En47>{active.tag}</En47></span>
          <p dir="ltr" lang="en">{active.en}</p>
          <p dir="rtl" lang="ar"><Mixed47 text={active.ar} /></p>
          <p className="l47-lane-detail-formula">
            <En47>{LANES_47[activeIndex]?.formula ?? ""}</En47>
          </p>
        </div>
      )}
      {slide.note && <Note47 text={slide.note} />}
    </div>
  );
}

/* ============================================================
   الحوارات
   ============================================================ */

function Dialogue47({ slide, workspace, onChange }: { slide: Slide47; workspace: Workspace47; onChange: SetWorkspace }) {
  const showAr = Boolean(workspace.dialogueAr[slide.id]);
  return (
    <div className="l47-dialogue">
      <div className="l47-dialogue-head">
        <span className="l47-dialogue-label"><span aria-hidden="true">◉</span> REAL-LIFE LAB / CONVERSATION</span>
        <button
          type="button"
          className="l47-text-button"
          aria-expanded={showAr}
          onClick={() => onChange((previous) => ({ ...previous, dialogueAr: { ...previous.dialogueAr, [slide.id]: !showAr } }))}
        >
          {showAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      {slide.turns?.map((turn, i) => (
        <div className="l47-turn" key={`${turn.speaker}-${i}`}>
          <span className="l47-avatar" style={speakerStyle(turn.speaker)} aria-hidden="true">{turn.speaker.slice(0, 1)}</span>
          <div className="l47-bubble">
            <span className="l47-speaker">{turn.speaker}</span>
            <p dir="ltr" lang="en">{turn.en}</p>
            {showAr && turn.ar && <p className="l47-turn-ar" dir="rtl" lang="ar"><Mixed47 text={turn.ar} /></p>}
          </div>
        </div>
      ))}
      {slide.labId && (
        <div className="l47-lab-check">
          <p>اختبر فهمك للموقف</p>
          <PracticeSet47 setId={slide.labId} workspace={workspace} onChange={onChange} />
        </div>
      )}
      {slide.note && <Note47 text={slide.note} />}
    </div>
  );
}

/* ============================================================
   القراءة
   ============================================================ */

function Reading47({ workspace, onChange }: { workspace: Workspace47; onChange: SetWorkspace }) {
  return (
    <div className="l47-reading">
      <div className="l47-reading-head">
        <div className="l47-reading-title">
          <span>CHOICES, PREFERENCES AND POLITE CONVERSATIONS</span>
          <h2>The Perfect Weekend Plan</h2>
        </div>
        <button
          type="button"
          className="l47-button l47-button--outline"
          aria-expanded={workspace.showTranslation}
          onClick={() => onChange((previous) => ({ ...previous, showTranslation: !previous.showTranslation }))}
        >
          {workspace.showTranslation ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>
      {READING_47.map((part, i) => (
        <div key={part.en} className="l47-reading-paragraph">
          <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p dir="ltr" lang="en">{part.en}</p>
            {workspace.showTranslation && <p dir="rtl" lang="ar"><Mixed47 text={part.ar} /></p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReadingQuestions47({ workspace, onChange }: { workspace: Workspace47; onChange: SetWorkspace }) {
  return (
    <div className="l47-practice-list">
      {READING_QUESTIONS_47.map((item, i) => (
        <section className="l47-reading-q" key={item.q}>
          <div className="l47-reading-q-top">
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p dir="ltr" lang="en">{item.q}</p>
          </div>
          <input
            type="text"
            dir="ltr"
            lang="en"
            className="l47-input"
            value={workspace.readingDrafts[i] ?? ""}
            aria-label={`إجابة سؤال القراءة ${i + 1}`}
            placeholder="Write your answer…"
            onChange={(event) => onChange((previous) => ({ ...previous, readingDrafts: { ...previous.readingDrafts, [i]: event.target.value } }))}
          />
          <div className="l47-reading-actions">
            <button
              type="button"
              className="l47-button l47-button--outline"
              aria-expanded={Boolean(workspace.readingOpen[i])}
              onClick={() => onChange((previous) => ({ ...previous, readingOpen: { ...previous.readingOpen, [i]: !previous.readingOpen[i] } }))}
            >
              {workspace.readingOpen[i] ? "إخفاء النموذج" : "قارن بالإجابة النموذجية"}
            </button>
          </div>
          {workspace.readingOpen[i] && (
            <div className="l47-answer-model">
              <p dir="ltr" lang="en">{item.answer}</p>
              <p dir="rtl" lang="ar"><Mixed47 text={item.ar} /></p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

/* ============================================================
   الملخص الذهبي
   ============================================================ */

const SUMMARY_47 = [
  { tone: "neutral" as const, en: "SUBJECT + WOULD + V1", ar: "فعل ناقص ثابت لا يأخذ s، وبعده V1 دون TO.", ex: "I would help you.", icon: "🧠" },
  { tone: "wish" as const, en: "WOULD LIKE + NOUN", ar: "رغبة في شيء.", ex: "I'd like some tea.", icon: "☕" },
  { tone: "wish" as const, en: "WOULD LIKE + TO + V1", ar: "رغبة في القيام بفعل.", ex: "I'd like to learn English.", icon: "🚀" },
  { tone: "wish" as const, en: "WOULD LIKE + PERSON + TO + V1", ar: "رغبة في أن يقوم شخص آخر بفعل.", ex: "I'd like you to help me.", icon: "🧑‍🤝‍🧑" },
  { tone: "wish" as const, en: "WOULD YOU LIKE…?", ar: "عرض أو دعوة أو سؤال عن الرغبة.", ex: "Would you like to join us?", icon: "🎁" },
  { tone: "prefer" as const, en: "WOULD RATHER + V1", ar: "تفضيل، دون TO.", ex: "I'd rather stay home.", icon: "⚖️" },
  { tone: "prefer" as const, en: "WOULD RATHER … THAN …", ar: "المقارنة بين خيارين.", ex: "I'd rather walk than drive.", icon: "🔬" },
  { tone: "prefer" as const, en: "WOULD RATHER NOT + V1", ar: "تفضيل عدم القيام بفعل.", ex: "I'd rather not go out tonight.", icon: "🚫" },
  { tone: "prefer" as const, en: "WOULD RATHER + SUBJECT + PAST SIMPLE", ar: "تفضيل يتعلق بفعل شخص آخر في الحاضر أو المستقبل.", ex: "I'd rather you stayed here.", icon: "👥" },
  { tone: "request" as const, en: "WOULD YOU MIND + V-ing?", ar: "طلب مهذب، والجواب No, not at all يعني الموافقة.", ex: "Would you mind opening the window?", icon: "🤝" },
];

function Summary47() {
  return (
    <div className="l47-summary">
      <div className="l47-summary-matrix">
        {SUMMARY_47.map((row) => (
          <article className={`l47-summary-card ${toneClass(row.tone)}`} key={row.en}>
            <div className="l47-summary-head">
              <span aria-hidden="true">{row.icon}</span>
              <En47>{row.en}</En47>
            </div>
            <p className="l47-summary-meaning"><Mixed47 text={row.ar} /></p>
            <p dir="ltr" lang="en" className="l47-summary-ex">{row.ex}</p>
          </article>
        ))}
      </div>
      <div className="l47-golden-rule">
        <span aria-hidden="true">🏆</span>
        <p><Mixed47 text="القاعدة الذهبية الكبرى: WOULD LIKE تعبّر عن الرغبة، وWOULD RATHER تعبّر عن التفضيل، وWOULD YOU MIND تُستخدم لتقديم طلب مهذب. والفرق كله في وظيفة التركيب لا في ترجمة الكلمات." /></p>
      </div>
    </div>
  );
}

/* ============================================================
   خريطة التقدم
   ============================================================ */

function Roadmap47({ onRestart, onTest, onExit }: { onRestart: () => void; onTest: () => void; onExit?: () => void }) {
  return (
    <section className="l47-roadmap" data-step-id="course-progress">
      <div className="l47-roadmap-index"><En47>THE NEXT CHAPTER</En47><span aria-hidden="true">✳</span></div>
      <h1 id="l47-title" tabIndex={-1}>أتممت فنّ الاختيار.<br /><em>والرحلة مستمرة.</em></h1>
      <p>أتممنا الدرس 47 من أصل 120 درسًا. بقي 73 درسًا؛ والآن ننتقل من الرغبات والتفضيلات إلى مراجعة شاملة تجمع كل الأفعال الناقصة في خريطة واحدة.</p>
      <div className="l47-progress-label">
        <span>تقدم المنهج</span>
        <bdi dir="ltr">47 / 120 · 39.17%</bdi>
      </div>
      <div className="l47-progress-track" role="progressbar" aria-label="تقدم المنهج" aria-valuemin={0} aria-valuemax={120} aria-valuenow={47}><div /></div>
      <div className="l47-next-lesson">
        <span>المحطة القادمة · <En47>LESSON 48</En47></span>
        <h2 dir="ltr" lang="en">MODAL VERBS MASTER REVIEW</h2>
        <p dir="ltr" lang="en">The Complete Map of Modal Verbs</p>
        <p>مراجعة شاملة لـ CAN وCOULD وMAY وMIGHT وMUST وHAVE TO وSHOULD وOUGHT TO وMUSTN&rsquo;T وDON&rsquo;T HAVE TO وNEEDN&rsquo;T وWOULD، مع تمارين تفرّق بين المعاني المتقاربة واختبار متكامل.</p>
      </div>
      <div className="l47-roadmap-actions">
        <button type="button" className="l47-button l47-button--light" onClick={onRestart}>العودة إلى البداية</button>
        <button type="button" className="l47-button l47-button--outline-light" onClick={onTest}>مراجعة الاختبار</button>
        {onExit && <button type="button" className="l47-button l47-button--outline-light" onClick={onExit}>جميع الدروس</button>}
      </div>
    </section>
  );
}

/* ============================================================
   جسم الشريحة
   ============================================================ */

function Body47({ slide, index, station, workspace, onChangeWorkspace, answers, result, onChangeAnswer, onSubmitResult, onReset, teacherUnlocked, onUnlock, onLock, onStart, onTest, onRestart, onExit }: {
  slide: Slide47; index: number; station: string; workspace: Workspace47; onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>; result: GradedTestResult47 | null; onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult47) => void; onReset: () => void;
  teacherUnlocked: boolean; onUnlock: () => void; onLock: () => void;
  onStart: () => void; onTest: () => void; onRestart: () => void; onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover47 slide={slide} onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap47 onRestart={onRestart} onTest={onTest} onExit={onExit} />;

  const isStudy = slide.kind === "lesson" || slide.kind === "comparison";

  return (
    <SlideFrame47 slide={slide} index={index} station={station}>
      {slide.kind === "goals" && <Goals47 />}
      {slide.kind === "lanes" && <Lanes47 slide={slide} workspace={workspace} onChange={onChangeWorkspace} />}
      {isStudy && (
        <>
          {slide.formula && <Formula47 rows={slide.formula} tone={slide.tone} />}
          {slide.table && <Table47View table={slide.table} />}
          {slide.points && <Points47 points={slide.points} />}
          {slide.examples && <Examples47 items={slide.examples} variant={slide.kind === "comparison" ? "comparison" : "grid"} />}
          {slide.note && <Note47 text={slide.note} />}
          {slide.practiceSet && (
            <div className="l47-inline-practice">
              <div className="l47-practice-meta"><Tag47>تحقّق سريع</Tag47><span>أجب ثم اضغط «تحقّق»؛ التغذية الراجعة تشرح السبب.</span></div>
              <PracticeSet47 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
            </div>
          )}
        </>
      )}
      {slide.kind === "dialogue" && <Dialogue47 slide={slide} workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "practice" && slide.practiceSet && (
        <>
          <div className="l47-practice-meta"><Tag47>تدريب تفاعلي</Tag47><span>تحقّق من كل بند على حدة، ثم اطلب النموذج إذا احتجت.</span></div>
          <PracticeSet47 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {slide.kind === "wordOrder" && <WordOrder47 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "reading" && <Reading47 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingQuestions" && <ReadingQuestions47 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "test" && <TestArea47 answers={answers} result={result} onChangeAnswer={onChangeAnswer} onSubmitResult={onSubmitResult} onReset={onReset} />}
      {slide.kind === "teacher" && <TeacherArea47 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} onLock={onLock} />}
      {slide.kind === "writing" && <Writing47 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "summary" && <Summary47 />}
    </SlideFrame47>
  );
}

/* ============================================================
   الدرس
   ============================================================ */

export default function Lesson47({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace47>(initialWorkspace47);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradedTestResult47 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const next = Math.max(0, Math.min(LESSON_STEP_COUNT_47 - 1, target));
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
      else if (event.key === "End") { event.preventDefault(); goToStep(LESSON_STEP_COUNT_47 - 1); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(() => STATIONS_47.map((station) => ({
    section: station.title,
    items: SLIDES_47.flatMap((slide, index) => slide.station === station.id
      ? [{ index, title: <Mixed47 text={RAIL_TITLES_47[slide.id] ?? slide.title} />, mascot: <span aria-hidden="true">{slide.mascot}</span>, navId: slide.id }]
      : []),
  })), []);

  const slide = SLIDES_47[step] ?? SLIDES_47[0];
  const station = STATIONS_47.find((item) => item.id === slide.station) ?? STATIONS_47[0];
  const resetTest = useCallback(() => { setAnswers({}); setResult(null); setTeacherUnlocked(false); }, []);

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson47"
      rootDir="rtl"
      rootDataLesson={47}
      railAriaLabel="فهرس خطوات الدرس السابع والأربعين"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={<span>الدرس 47 <En47>· POLITE ENGLISH</En47></span>}
      railSubtitle={
        <div className="l47-rail-actions">
          <span><bdi dir="ltr">{visited.size} / {LESSON_STEP_COUNT_47}</bdi> خطوات زرتها</span>
          <button type="button" onClick={() => goToStep(TEST_STEP_47)}>
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
          <span>{STATION_LABELS_47[station.id] ?? station.title}</span> <span aria-hidden="true">·</span> <span>{RAIL_TITLES_47[slide.id] ?? slide.title}</span>
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_47) * 100}
      counter={<bdi dir="ltr">{step + 1} / {LESSON_STEP_COUNT_47}</bdi>}
      counterDir="ltr"
      contentKey={step}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_47 - 1}
      mainRef={mainRef}
      mainId="l47-main"
    >
      <Body47
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
        onTest={() => goToStep(TEST_STEP_47)}
        onRestart={() => goToStep(0)}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
