import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  GOALS_49,
  LESSON_STEP_COUNT_49,
  PHASE_THREE_49,
  SIX_COMPARISONS_49,
  SIX_FUNCTIONS_49,
  SLIDES_49,
  STATIONS_49,
  SUMMARY_49,
  type Slide49,
} from "./data";
import { En49, Examples49, Formula49, Mixed49, Note49, Points49, SlideFrame49, Table49View, Tag49, toneClass } from "./kit49";
import {
  ContrastLab49,
  Dashboard49,
  Detector49,
  Dialogue49View,
  Evidence49,
  initialWorkspace49,
  MeaningMap49,
  PracticeSet49,
  Reading49,
  ReadingChallenge49,
  ReadingQuestions49,
  TimelineLab49,
  V3Workshop49,
  Writing49,
  type Workspace49,
} from "./Practice49";
import { TestArea49 } from "./TestArea49";
import { TeacherArea49 } from "./TeacherArea49";
import type { GradedTestResult49 } from "./testKey49";
import "./lesson49.css";

const STATION_LABELS_49: Record<string, string> = {
  opening: "البداية",
  "core-rule": "القاعدة الأساسية",
  "present-past": "الحاضر مقابل الماضي",
  "must-have": "MUST HAVE",
  "may-might": "MAY / MIGHT HAVE",
  "could-have": "COULD HAVE",
  "couldnt-have": "COULDN'T HAVE",
  "should-have": "SHOULD (N'T) HAVE",
  "ought-to": "OUGHT TO HAVE",
  "neednt-have": "NEEDN'T HAVE",
  "would-have": "WOULD HAVE",
  "past-perfect": "Modal Perfect وPast Perfect",
  "negative-questions": "النفي والسؤال",
  "meaning-map": "خريطة المعاني",
  mistakes: "الأخطاء الشائعة",
  dialogue: "الحوار",
  reading: "القراءة",
  practice: "التدريبات",
  test: "الاختبار النهائي",
  teacher: "دليل المعلم",
  writing: "الكتابة والتحدث",
  summary: "الملخص والتقدم",
};

const RAIL_TITLES_49: Record<string, string> = {
  cover: "غلاف الدرس",
  goals: "أهداف الدرس",
  "stage-three": "بداية المرحلة الثالثة",
  "timeline-lab": "Modal Perfect Timeline",
  "six-functions": "الوظائف الست",
  "core-formula": "MODAL + HAVE + V3",
  "have-not-has": "HAVE لا HAS",
  "v3-table": "V1 – V2 – V3",
  "v3-workshop": "ورشة V3",
  "common-errors": "أخطاء البداية",
  "present-past": "الحاضر مقابل الماضي",
  "detector-lab": "كاشف المعنى",
  "must-have": "MUST HAVE",
  "must-evidence": "تحقيق الأدلة",
  "must-vs-must-have": "MUST أم MUST HAVE؟",
  "may-have": "MAY HAVE",
  "may-might-compare": "MAY أم MIGHT؟",
  "could-have": "COULD HAVE",
  "could-vs-should": "COULD أم SHOULD؟",
  "couldnt-have": "COULDN'T HAVE",
  "couldnt-vs-couldnt-do": "COULDN'T HAVE أم COULDN'T؟",
  "should-have": "SHOULD HAVE",
  "shouldnt-have": "SHOULDN'T HAVE",
  "should-shouldnt-compare": "SHOULD HAVE أم SHOULDN'T HAVE؟",
  "ought-to-have": "OUGHT TO HAVE",
  "ought-vs-should": "OUGHT TO أم SHOULD؟",
  "neednt-have": "NEEDN'T HAVE",
  "neednt-vs-didnt": "NEEDN'T HAVE أم DIDN'T NEED TO؟",
  "would-have": "WOULD HAVE",
  "past-perfect": "Past Perfect",
  "modal-vs-past-perfect": "Modal Perfect أم Past Perfect؟",
  negation: "النفي",
  questions: "السؤال والإجابات القصيرة",
  "meaning-map": "المعاني العشرة",
  "meaning-contrast": "مختبر الفروق",
  "errors-wall": "جدار الأخطاء",
  "grammar-detective": "محقق الصيغة",
  dialogue: "ماذا حدث أمس؟",
  reading: "المشروع المفقود",
  "reading-questions": "أسئلة الفهم",
  "reading-challenge": "تحدي القراءة",
  "practice-1": "تدريب HAVE + V3",
  "practice-2": "اختيار التركيب",
  "practice-3": "تصحيح الأخطاء",
  "practice-4": "الترجمة",
  "final-test": "25 سؤالًا",
  teacher: "دليل المعلم",
  writing: "اكتب وتحدث",
  "mastery-dashboard": "لوحة الإتقان",
  "golden-summary": "الخلاصة الذهبية",
  "stage-progress": "إنجاز المرحلة الثالثة",
  "course-progress": "الدرس 50 القادم",
};

const TEST_STEP_49 = SLIDES_49.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace49) => Workspace49) => void;

/* ============================================================
   الغلاف — ملف التحقيق
   ============================================================ */

function Cover49({ slide, onStart, onTest }: { slide: Slide49; onStart: () => void; onTest: () => void }) {
  return (
    <section className="l49-cover" data-step-id="cover" aria-labelledby="l49-title">
      <div className="l49-cover-main">
        <div className="l49-cover-kicker">
          <span className="l49-cover-chip">الدرس 49 · 120</span>
          <span className="l49-cover-chip l49-cover-chip--dark">PHASE 03 · 1</span>
          <span className="l49-cover-chip l49-cover-chip--stamp">EVIDENCE FILE</span>
        </div>
        <h1 id="l49-title" tabIndex={-1}>
          ملف <span className="l49-cover-accent">الماضي</span>
        </h1>
        <p className="l49-cover-sub"><Mixed49 text="استنتاج، احتمال، ندم، وفرص لم تُستغل — كلها في الماضي." /></p>
        <div className="l49-cover-title" dir="ltr" lang="en">
          <span>MODAL PERFECT</span>
          <em>THE PAST EVIDENCE FILE</em>
        </div>
        <p className="l49-cover-lead">
          <Mixed49 text={slide.lead ?? ""} />
        </p>
        <div className="l49-cover-actions">
          <button type="button" className="l49-button l49-button--dark" onClick={onStart}>
            افتح الملف ←
          </button>
          <button type="button" className="l49-button l49-button--outline" onClick={onTest}>
            الاختبار النهائي ↗
          </button>
        </div>
        <div className="l49-cover-foot">
          <span>{LESSON_STEP_COUNT_49} شريحة</span>
          <span>{STATIONS_49.length} محطة</span>
          <span>25 سؤالًا</span>
          <span>المرحلة الثالثة</span>
        </div>
      </div>
      <aside className="l49-cover-dossier" aria-label="محتويات ملف الماضي">
        <div className="l49-dossier-head">
          <span>CASE FILE · 49</span>
          <span className="l49-dossier-stamp">PAST</span>
        </div>
        <div className="l49-dossier-row">
          <span className="l49-dossier-label">SUBJECT</span>
          <span className="l49-dossier-value" dir="ltr" lang="en">What happened before now?</span>
        </div>
        <div className="l49-dossier-row">
          <span className="l49-dossier-label">FORMULA</span>
          <span className="l49-dossier-value l49-dossier-formula" dir="ltr" lang="en">MODAL + HAVE + V3</span>
        </div>
        <div className="l49-dossier-tiles">
          {SIX_FUNCTIONS_49.map((item) => (
            <div className={`l49-dossier-tile ${toneClass(item.tone)}`} key={item.id}>
              <span aria-hidden="true">{item.glyph}</span>
              <En49>{item.en.replace(/\.$/, "")}</En49>
              <small>{item.title}</small>
            </div>
          ))}
        </div>
        <div className="l49-dossier-timeline" dir="ltr" lang="en">
          <span>NOW</span>
          <i />
          <span>HAVE + V3</span>
          <i />
          <span>BEFORE NOW</span>
        </div>
        <p className="l49-dossier-hint" dir="ltr" lang="en">
          Identify the clue → choose the modal → check HAVE → use V3.
        </p>
      </aside>
    </section>
  );
}

/* ============================================================
   الأهداف
   ============================================================ */

function Goals49() {
  return (
    <div className="l49-goals">
      {GOALS_49.map((goal, index) => (
        <div className="l49-goal" key={goal}>
          <span className="l49-goal-n" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <Mixed49 text={goal} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   بداية المرحلة
   ============================================================ */

function PhaseIntro49() {
  return (
    <div className="l49-stage">
      <div className="l49-stage-banner">
        <span className="l49-stage-badge">PHASE 03</span>
        <div>
          <strong>القواعد المتوسطة والمتقدمة</strong>
          <p>هذه أول محطة تحليل للماضي: لم تعد تسأل «أي مودال؟» فقط، بل «ماذا يستنتج المتحدث عن الماضي؟».</p>
        </div>
      </div>
      <div className="l49-stage-steps">
        {PHASE_THREE_49.map((item) => (
          <div key={item.n}>
            <span aria-hidden="true">{item.n}</span>
            <En49>{item.en}</En49>
            <p>
              <Mixed49 text={item.ar} />
            </p>
          </div>
        ))}
      </div>
      <Note49 icon="🗂️" text="كل شريحة في هذا الدرس تضيف دليلًا أو أداة إلى ملف واحد؛ لا تحفظ القاعدة منفصلة عن وظيفتها." />
    </div>
  );
}

/* ============================================================
   الخلاصة
   ============================================================ */

function Summary49() {
  return (
    <div className="l49-summary">
      <div className="l49-summary-grid">
        {SUMMARY_49.map((item) => (
          <div className={`l49-summary-row ${toneClass(item.tone)}`} key={item.form}>
            <span className="l49-summary-glyph" aria-hidden="true">
              {item.glyph}
            </span>
            <div>
              <En49 className="l49-summary-form">{item.form}</En49>
              <p className="l49-summary-ar">{item.ar}</p>
              <p className="l49-summary-ex" dir="ltr" lang="en">
                {item.ex}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="l49-summary-compare">
        <span className="l49-mini-label">ستة فروق لا تُنسى</span>
        <ul>
          {SIX_COMPARISONS_49.map((item) => (
            <li key={item.en}>
              <span aria-hidden="true">{item.n}</span>
              <En49>{item.en}</En49>
              <span>{item.ar}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   إنجاز المرحلة
   ============================================================ */

function PhaseComplete49() {
  return (
    <div className="l49-phase" data-phase-complete>
      <div className="l49-phase-head">
        <span className="l49-phase-stamp" aria-hidden="true">
          03
        </span>
        <div>
          <span className="l49-mini-label">PHASE 03 · STATION 01</span>
          <h2>إنجاز المرحلة الثالثة</h2>
          <p>أنهيت أول درس في مرحلة القواعد المتوسطة والمتقدمة.</p>
        </div>
      </div>
      <div className="l49-phase-numbers">
        <div>
          <bdi dir="ltr" className="l49-phase-big">
            49 / 120
          </bdi>
          <span>دروس مكتملة</span>
        </div>
        <div>
          <bdi dir="ltr" className="l49-phase-big">
            40.83%
          </bdi>
          <span>من المنهج</span>
        </div>
        <div>
          <bdi dir="ltr" className="l49-phase-big">
            71
          </bdi>
          <span>درسًا متبقيًا</span>
        </div>
      </div>
      <div
        className="l49-phase-track"
        role="progressbar"
        aria-label="تقدم المنهج: 49 من 120 درسًا"
        aria-valuemin={0}
        aria-valuemax={120}
        aria-valuenow={49}
      >
        <div style={{ width: `${(49 / 120) * 100}%` }} />
      </div>
      <div className="l49-phase-facts">
        {PHASE_THREE_49.map((item) => (
          <div key={`fact-${item.n}`}>
            <span aria-hidden="true">{item.n}</span>
            <En49>{item.en}</En49>
            <p>
              <Mixed49 text={item.ar} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   خريطة الطريق
   ============================================================ */

function Roadmap49({
  onRestart,
  onTest,
  onExit,
}: {
  onRestart: () => void;
  onTest: () => void;
  onExit?: () => void;
}) {
  return (
    <div className="l49-roadmap" data-roadmap data-step-id="course-progress">
      <div className="l49-roadmap-card">
        <span className="l49-mini-label">NEXT STATION</span>
        <span className="l49-roadmap-no" aria-hidden="true">
          50
        </span>
        <h2>
          <En49>DEDUCTION &amp; SPECULATION</En49>
        </h2>
        <p>
          في الدرس القادم نوسّع الاستنتاج والاحتمال: كيف نتحدث عمّا يحدث الآن، وعمّا حدث في الماضي، وكيف نختار بين{" "}
          <En49>MUST</En49> و<En49>MIGHT</En49> و<En49>CAN&apos;T</En49>.
        </p>
        <div className="l49-roadmap-links">
          <span>49 → 50</span>
          <span>PHASE 03</span>
          <span>71 درسًا متبقيًا</span>
        </div>
        <div className="l49-roadmap-actions">
          <button type="button" className="l49-button l49-button--dark" onClick={onExit}>
            العودة إلى الصفحة الرئيسية
          </button>
          <button type="button" className="l49-button l49-button--outline" onClick={onTest}>
            مراجعة الاختبار
          </button>
          <button type="button" className="l49-text-button" onClick={onRestart}>
            إعادة الدرس من البداية
          </button>
        </div>
      </div>
      <div className="l49-roadmap-note">
        <span aria-hidden="true">🎓</span>
        <p>
          أنهيت 49 درسًا من 120 (40.83%). تبقّى 71 درسًا. احتفظ بملف الماضي: ستحتاج <En49>WOULD HAVE + V3</En49> في
          الدرس 54 (Third Conditional).
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   محتوى الشرائح
   ============================================================ */

function Body49({
  slide,
  index,
  station,
  workspace,
  onChangeWorkspace,
  answers,
  result,
  onAnswersChange,
  onResult,
  teacherUnlocked,
  onUnlock,
  onStart,
  onTest,
  onRestart,
  onExit,
}: {
  slide: Slide49;
  index: number;
  station: string;
  workspace: Workspace49;
  onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>;
  result: GradedTestResult49 | null;
  onAnswersChange: (answers: Record<string, string>) => void;
  onResult: (result: GradedTestResult49 | null) => void;
  teacherUnlocked: boolean;
  onUnlock: () => void;
  onStart: () => void;
  onTest: () => void;
  onRestart: () => void;
  onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover49 slide={slide} onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap49 onRestart={onRestart} onTest={onTest} onExit={onExit} />;

  return (
    <SlideFrame49 slide={slide} index={index} station={station}>
      {slide.kind === "goals" && <Goals49 />}
      {slide.kind === "stage" && <PhaseIntro49 />}
      {slide.kind === "timeline" && <TimelineLab49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "evidence" && <Evidence49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "detector" && <Detector49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "v3" && <V3Workshop49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "map" && <MeaningMap49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "contrast" && <ContrastLab49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "dashboard" && <Dashboard49 workspace={workspace} result={result} />}
      {slide.kind === "dialogue" && <Dialogue49View workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "reading" && <Reading49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingQuestions" && <ReadingQuestions49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingChallenge" && <ReadingChallenge49 workspace={workspace} onChange={onChangeWorkspace} />}
      {(slide.kind === "practice" || slide.kind === "detective") && slide.practiceSet && (
        <>
          <div className="l49-practice-meta">
            <Tag49>{slide.kind === "detective" ? "محقق الصيغة" : "تدريب تفاعلي"}</Tag49>
            <span>تحقّق من كل بند على حدة. النموذج لا يظهر إلا بعد محاولة غير صحيحة.</span>
          </div>
          <PracticeSet49 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {(slide.kind === "lesson" || slide.kind === "comparison") && (
        <>
          {slide.formula && <Formula49 rows={slide.formula} glosses={slide.formulaGlosses} tone={slide.tone} />}
          {slide.table && <Table49View table={slide.table} />}
          {slide.points && <Points49 points={slide.points} />}
          {slide.examples && (
            <Examples49 items={slide.examples} variant={slide.kind === "comparison" ? "comparison" : "grid"} />
          )}
          {slide.note && <Note49 text={slide.note} />}
        </>
      )}
      {slide.kind === "test" && (
        <TestArea49 answers={answers} onAnswersChange={onAnswersChange} result={result} onResult={onResult} />
      )}
      {slide.kind === "teacher" &&
        (result ? (
          <TeacherArea49 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} />
        ) : (
          <div className="l49-teacher l49-teacher--waiting" data-teacher-waiting>
            <span className="l49-teacher-stamp" aria-hidden="true">
              🔒
            </span>
            <div>
              <h2>مساحة المعلم</h2>
              <p>
                مفتاح التصحيح الكامل محمي ولا يُحمّل قبل تقديم الاختبار. سلّم الاختبار النهائي أولًا، ثم عُد إلى هذه
                الشريحة؛ ستُطلب كلمة مرور المعلم لتحميل الدليل في ملف منفصل.
              </p>
              <ul className="l49-teacher-features">
                <li>مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
                <li>البدائل المقبولة، وأسباب رفض الصيغ النحوية الخاطئة.</li>
                <li>ملاحظات بيداغوجية على السؤالين 3 و4 في التصحيح.</li>
              </ul>
            </div>
            <button type="button" className="l49-button l49-button--outline" onClick={onTest}>
              الانتقال إلى الاختبار
            </button>
          </div>
        ))}
      {slide.kind === "writing" && <Writing49 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "summary" && <Summary49 />}
      {slide.kind === "phase" && <PhaseComplete49 />}
    </SlideFrame49>
  );
}

/* ============================================================
   الدرس
   ============================================================ */

export default function Lesson49({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace49>(initialWorkspace49);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradedTestResult49 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const nextStep = Math.max(0, Math.min(LESSON_STEP_COUNT_49 - 1, target));
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
        goToStep(LESSON_STEP_COUNT_49 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_49.map((station) => ({
        section: station.title,
        items: SLIDES_49.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: <Mixed49 text={RAIL_TITLES_49[slide.id] ?? slide.title} />,
                  mascot: <span aria-hidden="true">{slide.mascot}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })),
    [],
  );

  const slide = SLIDES_49[step] ?? SLIDES_49[0];
  const station = STATIONS_49.find((item) => item.id === slide.station) ?? STATIONS_49[0];
  const resetTest = useCallback(() => {
    setAnswers({});
    setResult(null);
    setTeacherUnlocked(false);
  }, []);

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson49"
      rootDir="rtl"
      rootDataLesson={49}
      railAriaLabel="فهرس خطوات درس الماضي"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 49 <En49>· MODAL PERFECT</En49>
        </span>
      }
      railSubtitle={
        <div className="l49-rail-actions">
          <span>
            <bdi dir="ltr">
              {visited.size} / {LESSON_STEP_COUNT_49}
            </bdi>{" "}
            خطوات زرتها
          </span>
          <button type="button" onClick={() => goToStep(TEST_STEP_49)}>
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
          <Mixed49
            text={`${STATION_LABELS_49[station.id] ?? station.title} · ${RAIL_TITLES_49[slide.id] ?? slide.title}`}
          />
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_49) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {LESSON_STEP_COUNT_49}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_49 - 1}
      mainRef={mainRef}
      mainId="l49-main"
    >
      <Body49
        slide={slide}
        index={step}
        station={station.title}
        workspace={workspace}
        onChangeWorkspace={setWorkspace}
        answers={answers}
        result={result}
        onAnswersChange={setAnswers}
        onResult={setResult}
        teacherUnlocked={teacherUnlocked}
        onUnlock={() => setTeacherUnlocked(true)}
        onStart={() => goToStep(1)}
        onTest={() => goToStep(TEST_STEP_49)}
        onRestart={() => {
          resetTest();
          goToStep(0);
        }}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
