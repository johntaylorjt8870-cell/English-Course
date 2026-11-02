import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  GOALS_51,
  LESSON_STEP_COUNT_51,
  SLIDES_51,
  STATIONS_51,
  SUMMARY_POINTS_51,
  type Slide51,
} from "./data";
import {
  En51,
  Examples51,
  FlowChain51,
  Formula51,
  Mixed51,
  Note51,
  Points51,
  RepetitionMeter51,
  SlideFrame51,
  Table51View,
  Tag51,
} from "./kit51";
import {
  CauseEffectLab51,
  Dashboard51,
  Dialogue51View,
  ErrorsWall51,
  FactLab51,
  initialWorkspace51,
  IntroChain51,
  ModalLab51,
  NegLab51,
  OrderLab51,
  PracticeSet51,
  Reading51View,
  ReadingHunt51,
  ReadingQuestions51,
  Review51,
  VerbLab51,
  WhenLab51,
  Writing51,
  type Workspace51,
} from "./Practice51";
import { TestArea51 } from "./TestArea51";
import { TeacherArea51 } from "./TeacherArea51";
import type { GradedTestResult51 } from "./testKey51";
import "./lesson51.css";

const STATION_LABELS_51: Record<string, string> = {
  opening: "البداية",
  meaning: "معنى الشرط",
  definition: "ما هو Zero Conditional",
  formula: "القاعدة والتصريف",
  science: "الحقائق العلمية",
  rules: "القواعد العامة",
  habits: "العادات المتكررة",
  negative: "النفي",
  questions: "الأسئلة",
  order: "ترتيب الجملة",
  "if-when": "IF وWHEN",
  modals: "الأفعال الناقصة",
  "zero-first": "Zero وFirst",
  mistakes: "الأخطاء الشائعة",
  dialogue: "الحوار",
  reading: "القراءة",
  practice: "التدريبات",
  writing: "الكتابة والتحدث",
  review: "الملخص والمراجعة",
  "final-test": "الاختبار النهائي",
  teacher: "مساحة المعلم",
  progress: "التقدم والدرس القادم",
};

const RAIL_TITLES_51: Record<string, string> = {
  cover: "غلاف الدرس",
  goals: "أهداف الدرس",
  "intro-condition": "IF = إذا",
  "three-cases": "ثلاث جمل",
  definition: "تعريف الشرط الصفري",
  "five-uses": "الاستخدامات الخمسة",
  "core-rule": "القاعدة الأساسية",
  conjugation: "تصريف الأفعال",
  "s-alerts": "انتبه إلى S وES",
  "verb-lab": "مختبر التصريف",
  "will-note": "أين مكان WILL؟",
  "science-facts": "حقائق علمية",
  "science-lab": "مختبر السبب والنتيجة",
  "rules-general": "القواعد العامة",
  habits: "العادات المتكررة",
  "fact-vs-habit": "حقيقة أم عادة؟",
  "fact-lab": "حقيقة أم مستقبل؟",
  "negative-condition": "نفي الشرط",
  "negative-result": "نفي النتيجة",
  "neg-lab": "باني النفي",
  "questions-forms": "صيغ الأسئلة",
  "order-rule": "الترتيب والفاصلة",
  "order-lab": "إعادة بناء الجملة",
  "if-when": "IF وWHEN",
  "when-lab": "IF أم WHEN؟",
  modals: "أفعال ناقصة في النتيجة",
  "modal-lab": "مختبر النتائج",
  "zero-vs-first": "Zero مقابل First",
  "zero-first-pairs": "ثلاث مقارنات",
  "four-cases": "أربعة مواقف",
  "errors-wall": "ستة أخطاء",
  "error-detective": "كاشف الأخطاء",
  dialogue: "Healthy Habits",
  reading: "تجربة نادي العلوم",
  "reading-questions": "أسئلة الفهم",
  "reading-hunt": "صيد التراكيب",
  "practice-1": "أكمل الفعل",
  "practice-2": "اختر الإجابة",
  "practice-3": "Zero أم First",
  "practice-4": "صحح الأخطاء",
  "practice-5": "الترجمة",
  writing: "اكتب وتحدث",
  "golden-review": "الملخص والمراجعة",
  "final-test": "25 سؤالًا",
  teacher: "دليل المعلم",
  "mastery-dashboard": "لوحة إتقانك",
  "lesson-progress": "القاعدة الذهبية",
  "next-lesson": "الدرس 52 القادم",
};

const TEST_STEP_51 = SLIDES_51.findIndex((slide) => slide.id === "final-test");
type SetWorkspace = (update: (previous: Workspace51) => Workspace51) => void;

/* ============================================================
   الغلاف — لوحة السبب والنتيجة
   ============================================================ */

function Cover51({ slide, onStart, onTest }: { slide: Slide51; onStart: () => void; onTest: () => void }) {
  return (
    <section className="l51-cover" data-step-id="cover" aria-labelledby="l51-title">
      <div className="l51-cover-main">
        <div className="l51-cover-kicker">
          <span className="l51-cover-chip">الدرس 51 · 120</span>
          <span className="l51-cover-chip l51-cover-chip--dark">PHASE 03</span>
          <span className="l51-cover-chip l51-cover-chip--lab">CAUSE &amp; EFFECT LAB</span>
        </div>
        <h1 id="l51-title" tabIndex={-1}>
          مختبر <span className="l51-cover-accent">السبب والنتيجة</span>
        </h1>
        <p className="l51-cover-sub">
          <Mixed51 text="تحقّق الشرط دائمًا ← تحدث النتيجة دائمًا. هكذا تتحدث الإنجليزية عن الحقائق والعادات." />
        </p>
        <div className="l51-cover-title" dir="ltr" lang="en">
          <span>ZERO CONDITIONAL</span>
          <em>THE LAW OF CAUSE &amp; EFFECT</em>
        </div>
        <p className="l51-cover-lead">
          <Mixed51 text={slide.lead ?? ""} />
        </p>
        <div className="l51-cover-flow" aria-hidden="true">
          <span className="l51-cover-pill l51-cover-pill--if">IF + PRESENT SIMPLE</span>
          <span className="l51-cover-arrow">➜</span>
          <span className="l51-cover-pill l51-cover-pill--result">PRESENT SIMPLE</span>
        </div>
        <div className="l51-cover-actions">
          <button type="button" className="l51-button l51-button--dark" onClick={onStart}>
            افتح مختبر السبب والنتيجة ←
          </button>
          <button type="button" className="l51-button l51-button--outline" onClick={onTest}>
            الاختبار النهائي ↗
          </button>
        </div>
        <div className="l51-cover-foot">
          <span>{LESSON_STEP_COUNT_51} شريحة</span>
          <span>{STATIONS_51.length} محطة</span>
          <span>25 سؤالًا</span>
          <span>المرحلة الثالثة</span>
        </div>
      </div>
      <aside className="l51-cover-board" aria-label="معاينة سلسلة السبب والنتيجة">
        <div className="l51-board-head">
          <span>REACTION CHAIN · 51</span>
          <span className="l51-board-pin" aria-hidden="true">
            ⚗️
          </span>
        </div>
        <FlowChain51
          condition="If you heat ice"
          conditionAr="إذا سخّنت الثلج"
          result="it melts."
          resultAr="إنه يذوب دائمًا"
          active="law"
        />
        <RepetitionMeter51 active="law" />
        <p className="l51-board-hint" dir="ltr" lang="en">
          Condition first → present simple → result always follows.
        </p>
      </aside>
    </section>
  );
}

/* ============================================================
   الأهداف
   ============================================================ */

function Goals51() {
  return (
    <div className="l51-goals">
      {GOALS_51.map((goal, index) => (
        <div className="l51-goal" key={goal}>
          <span className="l51-goal-n" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>
            <Mixed51 text={goal} />
          </span>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   التقدم والقاعدة الذهبية
   ============================================================ */

function Progress51() {
  return (
    <div className="l51-progress" data-lesson-progress>
      <ol className="l51-progress-points">
        {SUMMARY_POINTS_51.map((point, index) => (
          <li key={point}>
            <span aria-hidden="true">{["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪"][index]}</span>
            <span>
              <Mixed51 text={point} />
            </span>
          </li>
        ))}
      </ol>
      <div className="l51-golden">
        <span className="l51-mini-label">القاعدة الذهبية للدرس 51</span>
        <div className="l51-golden-lines">
          <p>
            <strong>الشرط الصفري؟</strong> <En51>IF + PRESENT SIMPLE, PRESENT SIMPLE</En51> — حقيقة عامة أو عادة متكررة.
          </p>
          <p>
            <strong>النفي؟</strong> <En51>DON'T / DOESN'T + V1</En51> — في الشرط أو النتيجة أو كليهما.
          </p>
          <p>
            <strong>حدث مستقبلي محدد؟</strong> <En51>WILL + V1</En51> في النتيجة ← هذا شرط أول (الدرس 52).
          </p>
        </div>
      </div>
      <div className="l51-course-progress">
        <div>
          <span className="l51-mini-label">الدرس 51 مكتمل</span>
          <bdi dir="ltr" className="l51-course-big">
            51 / 120
          </bdi>
        </div>
        <div>
          <bdi dir="ltr">42.5%</bdi>
          <span>من المنهج</span>
        </div>
        <div>
          <span>
            <bdi dir="ltr">69</bdi> درسًا متبقيًا
          </span>
          <span>المرحلة الثالثة مستمرة</span>
        </div>
        <div className="l51-progress-track" aria-hidden="true">
          <div style={{ width: "42.5%" }} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   الدرس القادم
   ============================================================ */

function Roadmap51({
  onRestart,
  onTest,
  onExit,
}: {
  onRestart: () => void;
  onTest: () => void;
  onExit?: () => void;
}) {
  return (
    <div className="l51-roadmap" data-roadmap data-step-id="next-lesson">
      <div className="l51-roadmap-card">
        <span className="l51-mini-label">NEXT STATION</span>
        <span className="l51-roadmap-no" aria-hidden="true">
          52
        </span>
        <h2>
          <En51>FIRST CONDITIONAL</En51>
        </h2>
        <p>
          الشرط الأول — الاحتمالات الحقيقية في المستقبل. سنتعلم كيف نتحدث عن أحداث مستقبلية محتملة، وكيف نربط الشرط
          بالنتيجة باستخدام <En51>IF + Present Simple</En51> و<En51>WILL + V1</En51>، مع التمييز الدقيق بين الحقائق
          العامة والتوقعات المستقبلية.
        </p>
        <div className="l51-roadmap-links">
          <span>51 → 52</span>
          <span>PHASE 03</span>
          <span>69 درسًا متبقيًا</span>
        </div>
        <div className="l51-roadmap-actions">
          <button type="button" className="l51-button l51-button--dark" onClick={onExit}>
            العودة إلى الصفحة الرئيسية
          </button>
          <button type="button" className="l51-button l51-button--outline" onClick={onTest}>
            مراجعة الاختبار
          </button>
          <button type="button" className="l51-text-button" onClick={onRestart}>
            إعادة الدرس من البداية
          </button>
        </div>
      </div>
      <div className="l51-roadmap-note">
        <span aria-hidden="true">⚗️</span>
        <p>
          أنهيت 51 درسًا من 120 (42.5%). تبقّى 69 درسًا. احتفظ بالقاعدة الذهبية: إذا كان الشرط يؤدي إلى نتيجة عامة أو
          متكررة، فالشرط الصفري غالبًا هو الاختيار المناسب.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   محتوى الشرائح
   ============================================================ */

function Body51({
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
  slide: Slide51;
  index: number;
  station: string;
  workspace: Workspace51;
  onChangeWorkspace: SetWorkspace;
  answers: Record<string, string>;
  result: GradedTestResult51 | null;
  onAnswersChange: (answers: Record<string, string>) => void;
  onResult: (result: GradedTestResult51 | null) => void;
  teacherUnlocked: boolean;
  onUnlock: () => void;
  onStart: () => void;
  onTest: () => void;
  onRestart: () => void;
  onExit?: () => void;
}) {
  if (slide.kind === "cover") return <Cover51 slide={slide} onStart={onStart} onTest={onTest} />;
  if (slide.kind === "roadmap") return <Roadmap51 onRestart={onRestart} onTest={onTest} onExit={onExit} />;

  return (
    <SlideFrame51 slide={slide} index={index} station={station}>
      {slide.kind === "goals" && <Goals51 />}
      {slide.kind === "intro" && (
        <>
          <IntroChain51 />
          {slide.points && <Points51 points={slide.points} />}
          {slide.note && <Note51 text={slide.note} />}
        </>
      )}
      {slide.kind === "concept" && (
        <>
          {slide.examples && <Examples51 items={slide.examples} variant="comparison" />}
          {slide.points && <Points51 points={slide.points} />}
          {slide.note && <Note51 text={slide.note} />}
        </>
      )}
      {slide.kind === "causeLab" && <CauseEffectLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "verbLab" && <VerbLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "factLab" && <FactLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "negLab" && <NegLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "orderLab" && <OrderLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "whenLab" && <WhenLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "modalLab" && <ModalLab51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "errors" && <ErrorsWall51 />}
      {slide.kind === "dialogue" && <Dialogue51View workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "reading" && <Reading51View workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingQuestions" && <ReadingQuestions51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "readingHunt" && <ReadingHunt51 workspace={workspace} onChange={onChangeWorkspace} />}
      {(slide.kind === "practice" || slide.kind === "detective") && slide.practiceSet && (
        <>
          <div className="l51-practice-meta">
            <Tag51>{slide.kind === "detective" ? "كاشف الأخطاء" : "تدريب تفاعلي"}</Tag51>
            <span>تحقّق من كل بند على حدة. النموذج لا يظهر إلا بعد محاولة غير صحيحة.</span>
          </div>
          <PracticeSet51 setId={slide.practiceSet} workspace={workspace} onChange={onChangeWorkspace} />
        </>
      )}
      {(slide.kind === "lesson" || slide.kind === "comparison") && (
        <>
          {slide.id === "core-rule" && (
            <FlowChain51
              condition="If you heat ice"
              conditionAr="شرط: مضارع بسيط"
              result="it melts."
              resultAr="نتيجة: مضارع بسيط"
              active="law"
            />
          )}
          {slide.id === "fact-vs-habit" && <RepetitionMeter51 active="habit" />}
          {slide.formula && <Formula51 rows={slide.formula} glosses={slide.formulaGlosses} tone={slide.tone} />}
          {slide.table && <Table51View table={slide.table} />}
          {slide.points && <Points51 points={slide.points} />}
          {slide.examples && (
            <Examples51 items={slide.examples} variant={slide.kind === "comparison" ? "comparison" : "grid"} />
          )}
          {slide.note && <Note51 text={slide.note} />}
        </>
      )}
      {slide.kind === "writing" && <Writing51 workspace={workspace} onChange={onChangeWorkspace} />}
      {slide.kind === "review" && <Review51 />}
      {slide.kind === "test" && (
        <TestArea51 answers={answers} onAnswersChange={onAnswersChange} result={result} onResult={onResult} />
      )}
      {slide.kind === "teacher" &&
        (result ? (
          <TeacherArea51 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} />
        ) : (
          <div className="l51-teacher l51-teacher--waiting" data-teacher-waiting>
            <span className="l51-teacher-stamp" aria-hidden="true">
              🔒
            </span>
            <div>
              <h2>مساحة المعلم</h2>
              <p>
                مفتاح التصحيح الكامل محمي ولا يُحمّل قبل تقديم الاختبار. سلّم الاختبار النهائي أولًا، ثم عُد إلى هذه
                الشريحة؛ ستُطلب كلمة مرور المعلم لتحميل الدليل في ملف منفصل.
              </p>
              <ul className="l51-teacher-features">
                <li>مفتاح الأسئلة الخمسة والعشرين، مع شرح كل إجابة.</li>
                <li>البدائل المقبولة، وأسباب رفض الصيغ النحوية الخاطئة.</li>
                <li>ملاحظة السؤال 18 ذي التصحيحين، وملاحظات تدريبات الترجمة.</li>
              </ul>
            </div>
            <button type="button" className="l51-button l51-button--outline" onClick={onTest}>
              الانتقال إلى الاختبار
            </button>
          </div>
        ))}
      {slide.kind === "dashboard" && <Dashboard51 workspace={workspace} result={result} />}
      {slide.kind === "progress" && <Progress51 />}
    </SlideFrame51>
  );
}

/* ============================================================
   الدرس
   ============================================================ */

export default function Lesson51({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<Workspace51>(initialWorkspace51);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GradedTestResult51 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const nextStep = Math.max(0, Math.min(LESSON_STEP_COUNT_51 - 1, target));
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
        goToStep(LESSON_STEP_COUNT_51 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_51.map((station) => ({
        section: station.title,
        items: SLIDES_51.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: <Mixed51 text={RAIL_TITLES_51[slide.id] ?? slide.title} />,
                  mascot: <span aria-hidden="true">{slide.mascot}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })),
    [],
  );

  const slide = SLIDES_51[step] ?? SLIDES_51[0];
  const station = STATIONS_51.find((item) => item.id === slide.station) ?? STATIONS_51[0];
  const resetTest = useCallback(() => {
    setAnswers({});
    setResult(null);
    setTeacherUnlocked(false);
  }, []);

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson51"
      rootDir="rtl"
      rootDataLesson={51}
      railAriaLabel="فهرس خطوات درس الشرط الصفري"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 51 <En51>· ZERO CONDITIONAL</En51>
        </span>
      }
      railSubtitle={
        <div className="l51-rail-actions">
          <span>
            <bdi dir="ltr">
              {visited.size} / {LESSON_STEP_COUNT_51}
            </bdi>{" "}
            خطوات زرتها
          </span>
          <button type="button" onClick={() => goToStep(TEST_STEP_51)}>
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
          <Mixed51
            text={`${STATION_LABELS_51[station.id] ?? station.title} · ${RAIL_TITLES_51[slide.id] ?? slide.title}`}
          />
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_51) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {LESSON_STEP_COUNT_51}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_51 - 1}
      mainRef={mainRef}
      mainId="l51-main"
    >
      <Body51
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
        onTest={() => goToStep(TEST_STEP_51)}
        onRestart={() => {
          resetTest();
          goToStep(0);
        }}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
