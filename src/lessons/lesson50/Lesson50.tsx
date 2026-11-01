import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  GOALS_50,
  LESSON_STEP_COUNT_50,
  SLIDES_50,
  STATIONS_50,
  SUMMARY_POINTS_50,
  type Slide50,
} from "./data";
import {
  En50,
  Examples50,
  Formula50,
  Gauge50,
  Mixed50,
  Note50,
  Points50,
  SlideFrame50,
  Table50View,
  Tag50,
} from "./kit50";
import {
  CaseBoard50,
  CertaintyLab50,
  CouldLab50,
  CouldUses50,
  Dashboard50,
  DecisionLab50,
  Dialogue50View,
  ErrorsWall50,
  initialWorkspace50,
  IntroRoom50,
  LensLab50,
  PracticeSet50,
  Reading50View,
  ReadingHunt50,
  ReadingQuestions50,
  Review50,
  Writing50,
  type Workspace50,
} from "./Practice50";
import { TestArea50 } from "./TestArea50";
import { TeacherArea50 } from "./TeacherArea50";
import type { GradedTestResult50 } from "./testKey50";
import "./lesson50.css";

const STATION_LABELS_50: Record<string, string> = {
  opening: "البداية",
  certainty: "مقياس الثقة",
  "must-now": "MUST الآن",
  "maybe-now": "الاحتمال الآن",
  "cant-now": "النفي القوي الآن",
  "cases-now": "حالات من الواقع",
  past: "الاستنتاج عن الماضي",
  lens: "عدستا الزمن",
  ongoing: "المستمر",
  could: "وجوه COULD",
  decision: "صانع القرار",
  mistakes: "الأخطاء",
  dialogue: "الحوار",
  reading: "القراءة",
  practice: "التدريبات",
  writing: "الكتابة والتحدث",
  review: "المراجعة الذكية",
  "final-test": "الاختبار النهائي",
  teacher: "مساحة المعلم",
  progress: "الإتقان والتقدم",
};

const RAIL_TITLES_50: Record<string, string> = {
  cover: "غلاف الدرس",
  goals: "أهداف الدرس",
  "intro-room": "غرفة الأدلة",
  "ded-vs-spec": "استنتاج أم تخمين؟",
  "certainty-scale": "درجات التأكد",
  "certainty-lab": "مقياس الثقة",
  "must-be": "MUST BE",
  "must-action": "MUST + فعل",
  "maybe-forms": "MAY / MIGHT / COULD",
  "maybe-nuance": "فروق دقيقة",
  "cant-now": "CAN'T الآن",
  "cant-vs-mustnt": "CAN'T أم MUSTN'T؟",
  "ahmad-case": "أحمد الغائب",
  "books-case": "حامل الكتب",
  "must-have": "MUST HAVE + V3",
  "may-have": "احتمال الماضي",
  "cant-have": "CAN'T HAVE",
  "lens-table": "الحاضر مقابل الماضي",
  "lens-lab": "عدستا الزمن",
  "been-alert": "انتبه إلى BEEN",
  "ongoing-past": "مستمر في الماضي",
  "done-vs-doing": "حدث أم نشاط؟",
  "continuous-lens": "المستمر زمنيًا",
  "could-four": "وجوه COULD الأربعة",
  "could-lab": "مختبر COULD",
  "decision-steps": "ثلاث خطوات",
  "decision-lab": "صانع القرار",
  "bag-case": "حقيبة في الفصل",
  "errors-wall": "ستة أخطاء",
  "error-detective": "محقق الأخطاء",
  dialogue: "ماذا حدث؟",
  reading: "الصوت الغريب",
  "reading-questions": "أسئلة الفهم",
  "reading-hunt": "صيد التراكيب",
  "practice-1": "اختيار الكلمة",
  "practice-2": "إكمال التركيب",
  "practice-3": "الزمن والمعنى",
  "practice-4": "تصحيح الأخطاء",
  "practice-5": "الترجمة",
  writing: "اكتب وتحدث",
  "golden-review": "جدول الحفظ الذكي",
  "final-test": "25 سؤالًا",
  teacher: "دليل المعلم",
  "mastery-dashboard": "لوحة إتقانك",
  "lesson-progress": "القاعدة الذهبية",
  "next-lesson": "الدرس 51 القادم",
};

const TEST_STEP_50 = SLIDES_50.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace50) => Workspace50) => void;

/* ============================================================
   الغلاف — لوحة الأدلة
   ============================================================ */

function Cover50({ slide, onStart, onTest }: { slide: Slide50; onStart: () => void; onTest: () => void }) {
  return (
    <section className="l50-cover" data-step-id="cover" aria-labelledby="l50-title">
      <div className="l50-cover-main">
        <div className="l50-cover-kicker">
          <span className="l50-cover-chip">الدرس 50 · 120</span>
          <span className="l50-cover-chip l50-cover-chip--dark">PHASE 03</span>
          <span className="l50-cover-chip l50-cover-chip--lens">EVIDENCE BOARD</span>
        </div>
        <h1 id="l50-title" tabIndex={-1}>
          عدسة <span className="l50-cover-accent">الاستنتاج</span>
        </h1>
        <p className="l50-cover-sub">
          <Mixed50 text="اقرأ الدليل، حدد الزمن، اضبط درجة ثقتك — عن الحاضر والماضي معًا." />
        </p>
        <div className="l50-cover-title" dir="ltr" lang="en">
          <span>DEDUCTION &amp; SPECULATION</span>
          <em>WHAT MUST BE TRUE? WHAT MIGHT HAVE HAPPENED?</em>
        </div>
        <p className="l50-cover-lead">
          <Mixed50 text={slide.lead ?? ""} />
        </p>
        <div className="l50-cover-lenses" aria-hidden="true">
          <span className="l50-cover-lens l50-cover-lens--now">🔵 NOW · MUST BE</span>
          <span className="l50-cover-lens-arrow">⇄</span>
          <span className="l50-cover-lens l50-cover-lens--past">🟠 PAST · MUST HAVE BEEN</span>
        </div>
        <div className="l50-cover-actions">
          <button type="button" className="l50-button l50-button--dark" onClick={onStart}>
            افتح لوحة الأدلة ←
          </button>
          <button type="button" className="l50-button l50-button--outline" onClick={onTest}>
            الاختبار النهائي ↗
          </button>
        </div>
        <div className="l50-cover-foot">
          <span>{LESSON_STEP_COUNT_50} شريحة</span>
          <span>{STATIONS_50.length} محطة</span>
          <span>25 سؤالًا</span>
          <span>المرحلة الثالثة</span>
        </div>
      </div>
      <aside className="l50-cover-board" aria-label="معاينة مقياس الثقة">
        <div className="l50-board-head">
          <span>CERTAINTY GAUGE · 50</span>
          <span className="l50-board-pin" aria-hidden="true">
            📌
          </span>
        </div>
        <Gauge50 />
        <div className="l50-board-duo" dir="ltr" lang="en">
          <div>
            <span>NOW</span>
            <strong>He must be sleeping.</strong>
          </div>
          <div>
            <span>PAST</span>
            <strong>He must have been sleeping.</strong>
          </div>
        </div>
        <p className="l50-board-hint" dir="ltr" lang="en">
          Evidence first → tense → certainty → continuity.
        </p>
      </aside>
    </section>
  );
}

/* ============================================================
   الأهداف
   ============================================================ */

function Goals50() {
  return (
    <div className="l50-goals">
      {GOALS_50.map((goal, index) => (
        <div className="l50-goal" key={goal}>
          <span className="l50-goal-n" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <Mixed50 text={goal} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   التقدم والقاعدة الذهبية
   ============================================================ */

function Progress50() {
  return (
    <div className="l50-progress" data-lesson-progress>
      <ol className="l50-progress-points">
        {SUMMARY_POINTS_50.map((point, index) => (
          <li key={point}>
            <span aria-hidden="true">{["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪"][index]}</span>
            <span>
              <Mixed50 text={point} />
            </span>
          </li>
        ))}
      </ol>
      <div className="l50-golden">
        <span className="l50-mini-label">القاعدة الذهبية للدرس 50</span>
        <div className="l50-golden-lines">
          <p>
            <strong>عن الحاضر؟</strong> فكّر في <En50>MUST / MIGHT / CAN'T + V1</En50> أو <En50>BE</En50>.
          </p>
          <p>
            <strong>عن الماضي؟</strong> فكّر في <En50>MUST / MIGHT / CAN'T + HAVE + V3</En50>.
          </p>
          <p>
            <strong>نشاط مستمر؟</strong> أضف <En50>BE + V-ing</En50> في الحاضر، أو <En50>HAVE BEEN + V-ing</En50> في الماضي.
          </p>
        </div>
      </div>
      <div className="l50-course-progress">
        <div>
          <span className="l50-mini-label">الدرس 50 مكتمل</span>
          <bdi dir="ltr" className="l50-course-big">
            50 / 120
          </bdi>
        </div>
        <div>
          <bdi dir="ltr">41.67%</bdi>
          <span>من المنهج</span>
        </div>
        <div>
          <span>
            <bdi dir="ltr">70</bdi> درسًا متبقيًا
          </span>
          <span>المرحلة الثالثة مستمرة</span>
        </div>
        <div className="l50-progress-track" aria-hidden="true">
          <div style={{ width: "41.67%" }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   الدرس القادم
   ============================================================ */

function Roadmap50({
  onRestart,
  onTest,
  onExit,
}: {
  onRestart: () => void;
  onTest: () => void;
  onExit?: () => void;
}) {
  return (
    <div className="l50-roadmap" data-roadmap data-step-id="next-lesson">
      <div className="l50-roadmap-card">
        <span className="l50-mini-label">NEXT STATION</span>
        <span className="l50-roadmap-no" aria-hidden="true">
          51
        </span>
        <h2>
          <En50>ZERO CONDITIONAL</En50>
        </h2>
        <p>
          الشرط الصفري — الحقائق العامة والنتائج الثابتة. سنتعلم كيف نستخدم <En50>IF</En50> للتعبير عن الحقائق العلمية
          والعادات والنتائج التي تحدث دائمًا عندما يتحقق شرط معين.
        </p>
        <div className="l50-roadmap-links">
          <span>50 → 51</span>
          <span>PHASE 03</span>
          <span>70 درسًا متبقيًا</span>
        </div>
        <div className="l50-roadmap-actions">
          <button type="button" className="l50-button l50-button--dark" onClick={onExit}>
            العودة إلى الصفحة الرئيسية
          </button>
          <button type="button" className="l50-button l50-button--outline" onClick={onTest}>
            مراجعة الاختبار
          </button>
          <button type="button" className="l50-text-button" onClick={onRestart}>
            إعادة الدرس من البداية
          </button>
        </div>
      </div>
      <div className="l50-roadmap-note">
        <span aria-hidden="true">🔎</span>
        <p>
          أنهيت 50 درسًا من 120 (41.67%). تبقّى 70 درسًا. احتفظ بقراراتك الثلاثة: الزمن أولًا، ثم درجة التأكد، ثم
          الاستمرار.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   محتوى الشرائح
   ============================================================ */

function Body50({
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
  slide: Slide50;
  index: number;
  station: string;
  workspace: Workspace50;
  onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>;
  result: GradedTestResult50 | null;
  onAnswersChange: (answers: Record<string, string>) => void;
  onResult: (result: GradedTestResult50 | null) => void;
  teacherUnlocked: boolean;
  onUnlock: () => void;
  onStart: () => void;
  onTest: () => void;
  onRestart: () => void;
  onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover50 slide={slide} onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap50 onRestart={onRestart} onTest={onTest} onExit={onExit} />;

  return (
    <SlideFrame50 slide={slide} index={index} station={station}>
      {slide.kind === "goals" && <Goals50 />}
      {slide.kind === "intro" && (
        <>
          <IntroRoom50 />
          {slide.points && <Points50 points={slide.points} />}
          {slide.note && <Note50 text={slide.note} />}
        </>
      )}
      {slide.kind === "concept" && (
        <>
          {slide.examples && <Examples50 items={slide.examples} variant="comparison" />}
          {slide.points && <Points50 points={slide.points} />}
          {slide.note && <Note50 text={slide.note} />}
        </>
      )}
      {slide.kind === "certaintyLab" && <CertaintyLab50 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "cases" && slide.practiceSet && (
        <CaseBoard50 group={slide.practiceSet as "ahmad" | "books"} workspace={workspace} onChange={onChangeWorkspace} />
      )}
      {slide.kind === "lensLab" && <LensLab50 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "couldLab" && <CouldLab50 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "decision" && <DecisionLab50 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "errors" && <ErrorsWall50 />}
      {slide.kind === "dialogue" && <Dialogue50View workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "reading" && <Reading50View workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingQuestions" && <ReadingQuestions50 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingHunt" && <ReadingHunt50 workspace={workspace} onChange={onChangeWorkspace} />}
      {(slide.kind === "practice" || slide.kind === "detective") && slide.practiceSet && (
        <>
          <div className="l50-practice-meta">
            <Tag50>{slide.kind === "detective" ? "محقق الأخطاء" : "تدريب تفاعلي"}</Tag50>
            <span>تحقّق من كل بند على حدة. النموذج لا يظهر إلا بعد محاولة غير صحيحة.</span>
          </div>
          <PracticeSet50 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {(slide.kind === "lesson" || slide.kind === "comparison") && (
        <>
          {slide.id === "certainty-scale" && <Gauge50 />}
          {slide.id === "could-four" && <CouldUses50 />}
          {slide.formula && <Formula50 rows={slide.formula} glosses={slide.formulaGlosses} tone={slide.tone} />}
          {slide.table && <Table50View table={slide.table} />}
          {slide.points && <Points50 points={slide.points} />}
          {slide.examples && (
            <Examples50 items={slide.examples} variant={slide.kind === "comparison" ? "comparison" : "grid"} />
          )}
          {slide.note && <Note50 text={slide.note} />}
        </>
      )}
      {slide.kind === "writing" && <Writing50 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "review" && <Review50 />}
      {slide.kind === "test" && (
        <TestArea50 answers={answers} onAnswersChange={onAnswersChange} result={result} onResult={onResult} />
      )}
      {slide.kind === "teacher" &&
        (result ? (
          <TeacherArea50 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} />
        ) : (
          <div className="l50-teacher l50-teacher--waiting" data-teacher-waiting>
            <span className="l50-teacher-stamp" aria-hidden="true">
              🔒
            </span>
            <div>
              <h2>مساحة المعلم</h2>
              <p>
                مفتاح التصحيح الكامل محمي ولا يُحمّل قبل تقديم الاختبار. سلّم الاختبار النهائي أولًا، ثم عُد إلى هذه
                الشريحة؛ ستُطلب كلمة مرور المعلم لتحميل الدليل في ملف منفصل.
              </p>
              <ul className="l50-teacher-features">
                <li>مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
                <li>البدائل المقبولة، وأسباب رفض الصيغ النحوية الخاطئة.</li>
                <li>ملاحظات على تدريب التذكيرات وسؤال التصحيح 17.</li>
              </ul>
            </div>
            <button type="button" className="l50-button l50-button--outline" onClick={onTest}>
              الانتقال إلى الاختبار
            </button>
          </div>
        ))}
      {slide.kind === "dashboard" && <Dashboard50 workspace={workspace} result={result} />}
      {slide.kind === "progress" && <Progress50 />}
    </SlideFrame50>
  );
}

/* ============================================================
   الدرس
   ============================================================ */

export default function Lesson50({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace50>(initialWorkspace50);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradedTestResult50 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const nextStep = Math.max(0, Math.min(LESSON_STEP_COUNT_50 - 1, target));
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
        goToStep(LESSON_STEP_COUNT_50 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_50.map((station) => ({
        section: station.title,
        items: SLIDES_50.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: <Mixed50 text={RAIL_TITLES_50[slide.id] ?? slide.title} />,
                  mascot: <span aria-hidden="true">{slide.mascot}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })),
    [],
  );

  const slide = SLIDES_50[step] ?? SLIDES_50[0];
  const station = STATIONS_50.find((item) => item.id === slide.station) ?? STATIONS_50[0];
  const resetTest = useCallback(() => {
    setAnswers({});
    setResult(null);
    setTeacherUnlocked(false);
  }, []);

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson50"
      rootDir="rtl"
      rootDataLesson={50}
      railAriaLabel="فهرس خطوات درس الاستنتاج"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 50 <En50>· DEDUCTION</En50>
        </span>
      }
      railSubtitle={
        <div className="l50-rail-actions">
          <span>
            <bdi dir="ltr">
              {visited.size} / {LESSON_STEP_COUNT_50}
            </bdi>{" "}
            خطوات زرتها
          </span>
          <button type="button" onClick={() => goToStep(TEST_STEP_50)}>
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
          <Mixed50
            text={`${STATION_LABELS_50[station.id] ?? station.title} · ${RAIL_TITLES_50[slide.id] ?? slide.title}`}
          />
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_50) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {LESSON_STEP_COUNT_50}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_50 - 1}
      mainRef={mainRef}
      mainId="l50-main"
    >
      <Body50
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
        onTest={() => goToStep(TEST_STEP_50)}
        onRestart={() => {
          resetTest();
          goToStep(0);
        }}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
