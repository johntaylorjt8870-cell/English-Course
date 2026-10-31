import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  CASES_48,
  FIVE_COMPARISONS_48,
  GOALS_48,
  LESSON_STEP_COUNT_48,
  MODALS_48,
  PHASE_RECAP_48,
  SLIDES_48,
  STATIONS_48,
  SUMMARY_48,
  type Slide48,
} from "./data";
import {
  En48,
  Examples48,
  Formula48,
  Mixed48,
  Note48,
  Points48,
  SlideFrame48,
  Table48View,
  Tag48,
  toneClass,
} from "./kit48";
import {
  CaseWall48,
  ContrastLab48,
  Dashboard48,
  DecisionMap48,
  Dialogue48View,
  initialWorkspace48,
  MeaningMap48,
  PracticeSet48,
  Reading48,
  ReadingQuestions48,
  Writing48,
  type Workspace48,
} from "./Practice48";
import TestArea48 from "./TestArea48";
import TeacherArea48 from "./TeacherArea48";
import type { GradedTestResult48 } from "./testKey48";
import "./lesson48.css";

const STATION_LABELS_48: Record<string, string> = {
  opening: "البداية",
  "core-rule": "القاعدة المشتركة",
  ability: "القدرة والاستئذان",
  possibility: "الاحتمال",
  necessity: "الضرورة والإلزام",
  prohibition: "المنع وعدم الضرورة",
  advice: "النصيحة",
  desire: "الرغبة والتفضيل",
  future: "المستقبل",
  decision: "خريطة القرار",
  detective: "محقق القواعد",
  dialogues: "الحوارات",
  situations: "المواقف",
  practice: "مختبر الإتقان",
  reading: "القراءة",
  test: "الاختبار والمعلم",
  writing: "الكتابة",
  summary: "الإتمام",
};

const RAIL_TITLES_48: Record<string, string> = {
  cover: "غلاف الدرس",
  goals: "أهداف المراجعة",
  "seven-situations": "سبعة مواقف",
  "phase2-recap": "من أين نبدأ؟",
  "modal-map": "خريطة الوظائف",
  "core-rule": "Subject + Modal + V1",
  "no-s-no-to": "ثلاث قواعد ذهبية",
  "ought-to-exception": "OUGHT TO وHAVE TO",
  "rule-check": "تحقّق من القاعدة",
  "can-ability": "CAN للقدرة",
  "could-past": "COULD للماضي",
  "can-could-map": "CAN أم COULD؟",
  "was-able-to": "WAS ABLE TO",
  "ability-lab": "مختبر القدرة",
  "may-might": "MAY وMIGHT",
  "may-permission": "MAY للاستئذان",
  "may-not-two": "معنيان لـ MAY NOT",
  "possibility-lab": "مختبر الاحتمال",
  "must-have-to": "MUST وHAVE TO",
  "have-to-forms": "تصريف HAVE TO",
  "necessity-lab": "مختبر الضرورة",
  "three-doors": "الأبواب الثلاثة",
  "neednt-have": "NEEDN'T HAVE",
  "prohibition-lab": "مختبر المنع",
  should: "SHOULD",
  "ought-to": "OUGHT TO",
  "should-vs-must": "SHOULD أم MUST؟",
  "advice-lab": "مختبر النصيحة",
  "would-structures": "تراكيب WOULD",
  "like-vs-rather": "LIKE أم RATHER؟",
  "desire-lab": "مختبر الرغبة",
  will: "WILL",
  "will-vs-would": "WILL أم WOULD؟",
  "future-lab": "مختبر المستقبل",
  "decision-map": "كيف نختار الفعل؟",
  "detective-a": "الأخطاء من ١ إلى ٦",
  "detective-b": "الأخطاء من ٧ إلى ١٢",
  "dialogue-school": "At School",
  "dialogue-trip": "Planning a Trip",
  "dialogue-home": "A Problem at Home",
  "what-would-you-say": "عشرة مواقف",
  "practice-forms": "تدريب الصيغ",
  "contrast-lab": "مختبر المعنى",
  "mastery-dashboard": "لوحة الإتقان",
  reading: "The School Science Competition",
  "reading-questions": "أسئلة الفهم",
  "final-test": "الاختبار النهائي",
  teacher: "مساحة المعلم",
  writing: "مهمة الكتابة",
  "golden-summary": "الخلاصة الذهبية",
  "phase-complete": "إنجاز المرحلة",
  "course-progress": "الدرس 49",
};

const TEST_STEP_48 = SLIDES_48.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace48) => Workspace48) => void;

/* ============================================================
   الغلاف — لوحة قيادة المراجعة
   ============================================================ */

function Cover48({ slide, onStart, onTest }: { slide: Slide48; onStart: () => void; onTest: () => void }) {
  return (
    <section className="l48-cover" data-step-id="cover" aria-labelledby="l48-title">
      <div className="l48-cover-main">
        <div className="l48-cover-kicker">
          <span className="l48-cover-chip">الدرس 48 · 120</span>
          <span className="l48-cover-chip l48-cover-chip--dark">PHASE 02 · 8 / 8</span>
        </div>
        <h1 id="l48-title" tabIndex={-1}>
          المراجعة الشاملة <span className="l48-cover-accent">للأفعال الناقصة</span>
        </h1>
        <div className="l48-cover-title" dir="ltr" lang="en">
          <span>MODAL VERBS</span>
          <em>MASTER REVIEW</em>
        </div>
        <p className="l48-cover-sub" dir="ltr" lang="en">
          The Complete Modal Verbs Challenge — Choose the Right Meaning!
        </p>
        <p className="l48-cover-lead">
          <Mixed48 text={slide.lead ?? ""} />
        </p>
        <div className="l48-cover-actions">
          <button type="button" className="l48-button l48-button--primary" onClick={onStart}>
            ابدأ التحدي ←
          </button>
          <button type="button" className="l48-button l48-button--outline" onClick={onTest}>
            الاختبار النهائي ↗
          </button>
        </div>
        <div className="l48-cover-foot">
          <span>{LESSON_STEP_COUNT_48} شريحة</span>
          <span>{STATIONS_48.length} محطة</span>
          <span>25 سؤالًا</span>
          <span>المرحلة الثانية</span>
        </div>
      </div>
      <div className="l48-cover-deck" aria-label="لوحة الأفعال الناقصة">
        <div className="l48-deck-head">
          <span className="l48-mini-label">DECISION DECK</span>
          <span className="l48-deck-status" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="l48-deck-grid">
          {MODALS_48.map((modal) => (
            <div className={`l48-deck-tile ${toneClass(modal.tone)}`} key={modal.id}>
              <En48>{modal.modal}</En48>
              <span>{modal.ar.split(" و")[0]}</span>
            </div>
          ))}
        </div>
        <div className="l48-deck-strip">
          {CASES_48.slice(0, 4).map((item) => (
            <span key={item.n} className={toneClass(item.tone)}>
              <span aria-hidden="true">{item.emoji}</span>
              <En48>{item.modal}</En48>
            </span>
          ))}
        </div>
        <p className="l48-deck-hint">
          Understand the Situation → Identify the Meaning → Choose the Modal → Build the Sentence.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   الأهداف
   ============================================================ */

function Goals48() {
  return (
    <div className="l48-goals">
      {GOALS_48.map((goal, index) => (
        <div className="l48-goal" key={goal}>
          <span className="l48-goal-n" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <Mixed48 text={goal} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   مراجعة المرحلة
   ============================================================ */

function PhaseRecap48() {
  return (
    <div className="l48-recap">
      {PHASE_RECAP_48.map((item) => (
        <div className={`l48-recap-row ${item.n === "48" ? "is-current" : ""}`} key={item.n}>
          <span className="l48-recap-n" aria-hidden="true">
            {item.n}
          </span>
          <En48 className="l48-recap-en">{item.en}</En48>
          <span className="l48-recap-ar">
            <Mixed48 text={item.ar} />
          </span>
        </div>
      ))}
      <p className="l48-recap-note">
        <Mixed48 text="المرحلة الثانية: AUXILIARY & MODAL VERBS — ثمانية دروس تُغلق اليوم." />
      </p>
    </div>
  );
}

/* ============================================================
   الخلاصة الذهبية
   ============================================================ */

function Summary48() {
  return (
    <div className="l48-summary">
      <div className="l48-summary-grid">
        {SUMMARY_48.map((row) => (
          <div className={`l48-summary-row ${toneClass(row.tone)}`} key={row.en}>
            <span className="l48-summary-icon" aria-hidden="true">
              {row.icon}
            </span>
            <div className="l48-summary-body">
              <p className="l48-summary-formula l48-en" dir="ltr" lang="en">
                {row.en}
              </p>
              <p className="l48-summary-ar" dir="rtl" lang="ar">
                <Mixed48 text={row.ar} />
              </p>
              <p className="l48-summary-ex" dir="ltr" lang="en">
                {row.ex}
              </p>
            </div>
          </div>
        ))}
      </div>
      <section className="l48-comparisons">
        <h3>أهم خمس مقارنات لا تنساها</h3>
        <ul>
          {FIVE_COMPARISONS_48.map((item) => (
            <li key={item.en}>
              <span className="l48-comparison-n" aria-hidden="true">
                {item.n}
              </span>
              <p className="l48-comparison-en l48-en" dir="ltr" lang="en">
                {item.en}
              </p>
              <div className="l48-comparison-ar">
                <Mixed48 text={item.ar} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ============================================================
   إنجاز المرحلة
   ============================================================ */

function PhaseComplete48() {
  return (
    <div className="l48-phase" data-phase-complete>
      <div className="l48-phase-hero">
        <span className="l48-phase-badge" aria-hidden="true">
          🏅
        </span>
        <span className="l48-mini-label">AUXILIARY &amp; MODAL VERBS</span>
        <h2>المرحلة الثانية مكتملة</h2>
        <bdi dir="ltr" className="l48-phase-ratio">
          8 / 8
        </bdi>
        <p>الدروس 41 إلى 48 — اكتملت المرحلة بالكامل.</p>
      </div>
      <ol className="l48-phase-list">
        {PHASE_RECAP_48.slice(0, 8).map((item) => (
          <li key={item.n}>
            <span aria-hidden="true">✓</span>
            <En48>{item.en}</En48>
            <span>
              <Mixed48 text={item.ar} />
            </span>
          </li>
        ))}
      </ol>
      <div className="l48-phase-stats">
        <div>
          <bdi dir="ltr">48 / 120</bdi>
          <span>درسًا مكتملًا</span>
        </div>
        <div>
          <bdi dir="ltr">40%</bdi>
          <span>نسبة إكمال المنهج</span>
        </div>
        <div>
          <bdi dir="ltr">72</bdi>
          <span>درسًا متبقيًا</span>
        </div>
      </div>
      <div
        className="l48-phase-track"
        role="progressbar"
        aria-label="تقدم المنهج"
        aria-valuemin={0}
        aria-valuemax={120}
        aria-valuenow={48}
      >
        <div style={{ width: "40%" }} />
      </div>
    </div>
  );
}

/* ============================================================
   الطريق إلى الدرس 49
   ============================================================ */

function Roadmap48({ onRestart, onTest, onExit }: { onRestart: () => void; onTest: () => void; onExit?: () => void }) {
  return (
    <section className="l48-roadmap" data-step-id="course-progress">
      <div className="l48-roadmap-index">
        <En48>THE NEXT CHAPTER</En48>
        <span aria-hidden="true">✳</span>
      </div>
      <h1 id="l48-title" tabIndex={-1}>
        أُغلقت المرحلة الثانية.
        <br />
        <em>نلتقي في الدرس 49.</em>
      </h1>
      <p>
        الأنماط التي تعلّمناها كانت عن الحاضر والمستقبل. في الدرس القادم نحلّل الماضي: ما حدث، وما كان ممكنًا أن يحدث،
        وما كان ينبغي أن يحدث.
      </p>
      <div className="l48-roadmap-progress">
        <span>تقدم المنهج</span>
        <bdi dir="ltr">48 / 120 · 40%</bdi>
      </div>
      <div
        className="l48-progress-track"
        role="progressbar"
        aria-label="تقدم المنهج"
        aria-valuemin={0}
        aria-valuemax={120}
        aria-valuenow={48}
      >
        <div />
      </div>
      <div className="l48-next-lesson">
        <span>
          المحطة القادمة · <En48>LESSON 49</En48>
        </span>
        <h2 dir="ltr" lang="en">
          MODAL PERFECT
        </h2>
        <p className="l48-next-formula" dir="ltr" lang="en">
          Modal + HAVE + V3
        </p>
        <p>
          الأفعال الناقصة مع الماضي التام — الاحتمال والاستنتاج والندم والفرص الضائعة.
        </p>
        <div className="l48-next-pairs">
          <div>
            <span dir="ltr" lang="en">
              She might come.
            </span>
            <span dir="ltr" lang="en">
              She might have arrived.
            </span>
          </div>
          <div>
            <span dir="ltr" lang="en">
              You should study.
            </span>
            <span dir="ltr" lang="en">
              You should have studied.
            </span>
          </div>
          <div>
            <span dir="ltr" lang="en">
              He must be tired.
            </span>
            <span dir="ltr" lang="en">
              He must have been tired.
            </span>
          </div>
        </div>
        <ul className="l48-next-topics">
          <li>MUST HAVE + V3 للاستنتاج القوي عن الماضي.</li>
          <li>MIGHT HAVE / MAY HAVE + V3 للاحتمال في الماضي.</li>
          <li>COULD HAVE + V3 للإمكانية أو الفرصة التي لم تتحقق بحسب السياق.</li>
          <li>SHOULD HAVE / SHOULDN'T HAVE + V3 للنصيحة المتأخرة واللوم.</li>
          <li>NEEDN'T HAVE + V3 للفعل الذي حدث دون حاجة إليه.</li>
        </ul>
      </div>
      <div className="l48-roadmap-actions">
        <button type="button" className="l48-button l48-button--light" onClick={onRestart}>
          العودة إلى البداية
        </button>
        <button type="button" className="l48-button l48-button--outline-light" onClick={onTest}>
          مراجعة الاختبار
        </button>
        {onExit && (
          <button type="button" className="l48-button l48-button--outline-light" onClick={onExit}>
            جميع الدروس
          </button>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   جسم الشريحة
   ============================================================ */

function Body48({
  slide,
  index,
  station,
  workspace,
  onChangeWorkspace,
  answers,
  result,
  onChangeAnswer,
  onSubmitResult,
  onReset,
  teacherUnlocked,
  onUnlock,
  onLock,
  onStart,
  onTest,
  onRestart,
  onExit,
}: {
  slide: Slide48;
  index: number;
  station: string;
  workspace: Workspace48;
  onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>;
  result: GradedTestResult48 | null;
  onChangeAnswer: (id: string, value: string) => void;
  onSubmitResult: (result: GradedTestResult48) => void;
  onReset: () => void;
  teacherUnlocked: boolean;
  onUnlock: () => void;
  onLock: () => void;
  onStart: () => void;
  onTest: () => void;
  onRestart: () => void;
  onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover48 slide={slide} onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap48 onRestart={onRestart} onTest={onTest} onExit={onExit} />;

  return (
    <SlideFrame48 slide={slide} index={index} station={station}>
      {slide.kind === "goals" && <Goals48 />}
      {slide.id === "phase2-recap" && <PhaseRecap48 />}
      {slide.kind === "map" && <MeaningMap48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "cases" && <CaseWall48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "decision" && <DecisionMap48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "contrast" && <ContrastLab48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "dashboard" && <Dashboard48 workspace={workspace} result={result} />}
      {slide.kind === "dialogue" && slide.dialogue && (
        <Dialogue48View id={slide.dialogue} workspace={workspace} onChange={onChangeWorkspace} />
      )}
      {slide.kind === "reading" && <Reading48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingQuestions" && <ReadingQuestions48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "practice" && slide.practiceSet && (
        <>
          <div className="l48-practice-meta">
            <Tag48>تدريب تفاعلي</Tag48>
            <span>تحقّق من كل بند على حدة، ثم اطلب النموذج إذا احتجت.</span>
          </div>
          <PracticeSet48 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {slide.kind === "detective" && slide.practiceSet && (
        <>
          <div className="l48-practice-meta">
            <Tag48>محقق القواعد</Tag48>
            <span>أعد كتابة الجملة كاملة؛ يُقبل التصحيح البديل إذا حافظ على المعنى.</span>
          </div>
          <PracticeSet48 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {slide.kind === "situations" && slide.practiceSet && (
        <>
          <div className="l48-practice-meta">
            <Tag48>موقف → معنى → فعل</Tag48>
            <span>اكتب الفعل أو التركيب المناسب؛ التغذية الراجعة تشرح سبب قبول الإجابة.</span>
          </div>
          <PracticeSet48 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {(slide.kind === "lesson" || slide.kind === "comparison") && (
        <>
          {slide.formula && <Formula48 rows={slide.formula} tone={slide.tone} />}
          {slide.table && <Table48View table={slide.table} />}
          {slide.points && <Points48 points={slide.points} />}
          {slide.examples && (
            <Examples48 items={slide.examples} variant={slide.kind === "comparison" ? "comparison" : "grid"} />
          )}
          {slide.note && <Note48 text={slide.note} />}
        </>
      )}
      {slide.kind === "test" && (
        <TestArea48
          answers={answers}
          result={result}
          onChangeAnswer={onChangeAnswer}
          onSubmitResult={onSubmitResult}
          onReset={onReset}
        />
      )}
      {slide.kind === "teacher" && (
        <TeacherArea48 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} onLock={onLock} />
      )}
      {slide.kind === "writing" && <Writing48 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "summary" && <Summary48 />}
      {slide.kind === "phase" && <PhaseComplete48 />}
    </SlideFrame48>
  );
}

/* ============================================================
   الدرس
   ============================================================ */

export default function Lesson48({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace48>(initialWorkspace48);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradedTestResult48 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const nextStep = Math.max(0, Math.min(LESSON_STEP_COUNT_48 - 1, target));
    setStep(nextStep);
    setVisited((previous) => new Set(previous).add(nextStep));
    setMenuOpen(false);
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);
  const previous = useCallback(() => goToStep(step - 1), [goToStep, step]);
  const next = useCallback(() => goToStep(step + 1), [goToStep, step]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        return;
      }
      if (menuOpen || target?.isContentEditable || (target && /^(INPUT|TEXTAREA|SELECT|BUTTON|A)$/.test(target.tagName)))
        return;
      if (event.key === "ArrowLeft" || event.key === " ") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToStep(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToStep(LESSON_STEP_COUNT_48 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_48.map((station) => ({
        section: station.title,
        items: SLIDES_48.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: <Mixed48 text={RAIL_TITLES_48[slide.id] ?? slide.title} />,
                  mascot: <span aria-hidden="true">{slide.mascot}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })),
    [],
  );

  const slide = SLIDES_48[step] ?? SLIDES_48[0];
  const station = STATIONS_48.find((item) => item.id === slide.station) ?? STATIONS_48[0];
  const resetTest = useCallback(() => {
    setAnswers({});
    setResult(null);
    setTeacherUnlocked(false);
  }, []);

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson48"
      rootDir="rtl"
      rootDataLesson={48}
      railAriaLabel="فهرس خطوات الدرس الثامن والأربعين"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 48 <En48>· MASTER REVIEW</En48>
        </span>
      }
      railSubtitle={
        <div className="l48-rail-actions">
          <span>
            <bdi dir="ltr">
              {visited.size} / {LESSON_STEP_COUNT_48}
            </bdi>{" "}
            خطوات زرتها
          </span>
          <button type="button" onClick={() => goToStep(TEST_STEP_48)}>
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
          <span>{STATION_LABELS_48[station.id] ?? station.title}</span> <span aria-hidden="true">·</span>{" "}
          <span>
            <Mixed48 text={RAIL_TITLES_48[slide.id] ?? slide.title} />
          </span>
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_48) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {LESSON_STEP_COUNT_48}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_48 - 1}
      mainRef={mainRef}
      mainId="l48-main"
    >
      <Body48
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
        onTest={() => goToStep(TEST_STEP_48)}
        onRestart={() => goToStep(0)}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
