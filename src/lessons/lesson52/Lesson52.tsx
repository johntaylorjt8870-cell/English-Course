import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import { GOALS_52, LESSON_STEP_COUNT_52, SLIDES_52, SLIDE_TITLES_52, STATIONS_52, type Slide52 } from "./data";
import {
  BlockView52,
  Bullets52,
  Closing52,
  Cover52,
  En52,
  Mixed52,
  Note52,
  SlideFrame52,
  ToneCards52,
} from "./kit52";
import {
  CondResultLab,
  DialogueView,
  ErrorLab,
  ExerciseView,
  IfWhenLab,
  ModalLab,
  NegationLab,
  OrderLab,
  OutcomeLab,
  QuestionOrderLab,
  QuestionsView,
  ReadingHunt,
  ReadingTextView,
  ReviewView,
  SelfCheckView,
  SolutionsGuide,
  SpeakingView,
  SummaryView,
  TranslationView,
  UnlessLab,
  VerbFormLab,
  WritingView,
  ZeroFirstLab,
} from "./Practice52";
import { DIALOGUE_QUESTIONS_52, PROGRESS_52, READING_QUESTIONS_52 } from "./content52";
import { LAB_COUNT_52, type LabId52 } from "./practiceData52";
import { TestArea52 } from "./TestArea52";
import { TeacherArea52 } from "./TeacherArea52";
import type { GradedTestResult52 } from "./testKey52";

const RAIL_TITLES_52 = SLIDE_TITLES_52;

type ProgressState52 = {
  visited: Set<number>;
  labs: Set<string>;
  practice: Set<string>;
  writing: boolean;
  speaking: boolean;
  selfCheck: boolean;
};

function useProgress52() {
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [labs, setLabs] = useState<Set<string>>(() => new Set());
  const [practice, setPractice] = useState<Set<string>>(() => new Set());
  const [writing, setWriting] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [selfCheck, setSelfCheck] = useState(false);

  const markVisited = useCallback((index: number) => {
    setVisited((previous) => {
      if (previous.has(index)) return previous;
      const next = new Set(previous);
      next.add(index);
      return next;
    });
  }, []);

  const state: ProgressState52 = { visited, labs, practice, writing, speaking, selfCheck };
  return {
    state,
    markVisited,
    markLab: useCallback((id: string) => setLabs((previous) => (previous.has(id) ? previous : new Set(previous).add(id))), []),
    markPractice: useCallback(
      (id: string) => setPractice((previous) => (previous.has(id) ? previous : new Set(previous).add(id))),
      [],
    ),
    markWriting: useCallback(() => setWriting(true), []),
    markSpeaking: useCallback(() => setSpeaking(true), []),
    markSelfCheck: useCallback(() => setSelfCheck(true), []),
  };
}

function Lab52({
  id,
  onTouch,
}: {
  id: LabId52;
  onTouch: () => void;
}) {
  switch (id) {
    case "condResult":
      return <CondResultLab onTouch={onTouch} />;
    case "verbForm":
      return <VerbFormLab onTouch={onTouch} />;
    case "order":
      return <OrderLab onTouch={onTouch} />;
    case "negation":
      return <NegationLab onTouch={onTouch} />;
    case "error":
      return <ErrorLab onTouch={onTouch} />;
    case "zeroFirst":
      return <ZeroFirstLab onTouch={onTouch} />;
    case "unless":
      return <UnlessLab onTouch={onTouch} />;
    case "questionOrder":
      return <QuestionOrderLab onTouch={onTouch} />;
    case "modal":
      return <ModalLab onTouch={onTouch} />;
    case "ifWhen":
      return <IfWhenLab onTouch={onTouch} />;
    case "outcome":
      return <OutcomeLab onTouch={onTouch} />;
    default:
      return null;
  }
}

/* ============================================================
   لوحة التقدم الحقيقية
   ============================================================ */
function Dashboard52({
  progress,
  result,
  visitedCount,
}: {
  progress: ProgressState52;
  result: GradedTestResult52 | null;
  visitedCount: number;
}) {
  const labsDone = progress.labs.size;
  const practiceDone = [...progress.practice].filter((id) => id.startsWith("practice-")).length;
  const testDone = Boolean(result);
  const percent = Math.round(
    (labsDone / LAB_COUNT_52) * 30 +
      (practiceDone / 6) * 25 +
      (testDone ? 30 : 0) +
      (progress.writing ? 5 : 0) +
      (progress.speaking ? 5 : 0) +
      (progress.selfCheck ? 5 : 0),
  );

  const rows = [
    { label: "الشرائح التي زرتها", value: `${visitedCount} / ${LESSON_STEP_COUNT_52}`, done: visitedCount >= LESSON_STEP_COUNT_52 },
    { label: "المختبرات التفاعلية", value: `${labsDone} / ${LAB_COUNT_52}`, done: labsDone >= LAB_COUNT_52 },
    { label: "مجموعات التدريبات", value: `${practiceDone} / 6`, done: practiceDone >= 6 },
    { label: "مهمة الكتابة", value: progress.writing ? "تمت المحاولة" : "لم تُنجز بعد", done: progress.writing },
    { label: "مهمة التحدث", value: progress.speaking ? "تمت المحاولة" : "لم تبدأ", done: progress.speaking },
    { label: "المراجعة الذاتية", value: progress.selfCheck ? "تمت" : "لم تبدأ", done: progress.selfCheck },
    {
      label: "الاختبار النهائي",
      value: result ? `${result.score} / ${result.total}` : "لم يُسلَّم",
      done: testDone,
    },
  ];

  return (
    <div className="grid gap-4" data-dashboard="52">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-400">مؤشر التقدم الحقيقي</div>
            <bdi dir="ltr" className="font-head text-4xl font-bold text-slate-900">
              {percent}%
            </bdi>
          </div>
          <div className="text-sm font-semibold text-slate-500">
            لا تُحتسب أي درجة قبل إتمام النشاط — المؤشر يتحرك فقط بعد تفاعلك.
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500 transition-all duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="grid gap-2">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3">
            <span className="flex items-center gap-2 font-semibold text-slate-700">
              <span className={`grid h-6 w-6 place-items-center rounded-lg text-xs font-bold ${row.done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                {row.done ? "✓" : "•"}
              </span>
              {row.label}
            </span>
            <bdi dir="ltr" className="text-sm font-bold text-slate-600">
              {row.value}
            </bdi>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-slate-900 p-4 text-white">
        <div className="text-sm font-bold text-slate-300">حالة الدرس</div>
        <p className="mt-1 text-lg font-semibold">
          {result
            ? `الاختبار مُسلَّم بدرجة ${result.score} من ${result.total}. يمكنك العودة إلى أي شريحة أو إعادة الاختبار.`
            : "الدرس قيد الإنجاز. أكمل التدريبات والاختبار النهائي ليُسجّل إتمام الدرس."}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   صفحة التقدم في المنهج
   ============================================================ */
function ProgressSlide52({ result }: { result: GradedTestResult52 | null }) {
  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-sky-100 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-100 blur-3xl" />
        <div className="relative">
          <div className="text-sm font-bold text-slate-500">منهج اللغة الإنجليزية</div>
          <div className="font-head mt-2 text-5xl font-bold text-slate-900">
            <bdi dir="ltr">52 / 120</bdi>
          </div>
          <div className="mt-1 text-2xl font-bold text-emerald-600">{PROGRESS_52.percent}</div>
          <div className="mx-auto mt-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-orange-400 to-emerald-500" style={{ width: PROGRESS_52.percent }} />
          </div>
          <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-3">52 درسًا مكتملًا</div>
            <div className="rounded-2xl bg-slate-50 p-3">68 درسًا متبقيًا</div>
          </div>
          <div className="mt-3 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">
            {result ? "الدرس 52 اكتمل ✓" : "الدرس 52 قيد الإنجاز — أكمل الاختبار ليُسجَّل"}
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        {PROGRESS_52.previous.map((lesson) => (
          <div key={lesson.n} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
            <span className="font-semibold text-slate-700">
              <bdi dir="ltr">{lesson.n}</bdi> — <Mixed52 text={lesson.title} />
            </span>
            <span className={`text-sm font-bold ${lesson.n === 52 ? "text-emerald-600" : "text-slate-400"}`}>
              {lesson.n === 52 ? (result ? "اكتمل ✓" : "الحالي") : "مكتمل ✓"}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm font-semibold text-slate-600">
        لا يتأثر تقدم الدروس الأخرى بإعادة هذا الاختبار؛ حالة الإتمام مرتبطة بنتيجة هذه الجلسة فقط، ومسار المنهج يبقى 52
        من 120.
      </div>
    </div>
  );
}

/* ============================================================
   الدرس القادم
   ============================================================ */
function Roadmap52() {
  const next = PROGRESS_52.next;
  return (
    <div className="grid gap-4">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-sky-500 text-xl font-bold text-white shadow">
            53
          </span>
          <div>
            <div className="text-xs font-bold text-slate-400">الدرس القادم</div>
            <h3 className="font-head text-2xl font-bold text-slate-900">
              <En52>SECOND CONDITIONAL</En52>
            </h3>
            <p className="text-sm font-semibold text-slate-500">الشرط الثاني — المواقف الخيالية وغير الواقعية</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-slate-50 p-4">
          <En52 className="text-xl font-bold text-slate-800">{next.intro}</En52>
          <div className="mt-1 text-slate-500">{next.introAr}</div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {next.compare.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border-2 p-4 ${
                item.label === "First Conditional" ? "border-emerald-200 bg-emerald-50" : "border-violet-200 bg-violet-50"
              }`}
            >
              <div className={`text-xs font-bold ${item.label === "First Conditional" ? "text-emerald-700" : "text-violet-700"}`}>
                {item.label}
              </div>
              <En52 className="mt-1 block font-bold text-slate-800">{item.en}</En52>
              <div className="mt-1 text-sm text-slate-500">{item.ar}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-slate-600">{next.focus}</p>
        <a
          href="#/lesson/53"
          className="mt-4 inline-block rounded-xl bg-slate-900 px-5 py-2.5 font-bold text-white transition hover:bg-slate-700"
        >
          انتقل إلى الدرس 53 ←
        </a>
      </div>
      <Note52 emoji="🚀" text="الشرط الثاني سيبدو مألوفًا: الفرق الأساسي أنك ستتحدث عن موقف خيالي أو غير محتمل، لذلك ستتغير الصيغة." />
    </div>
  );
}

/* ============================================================
   عرض الشريحة
   ============================================================ */
function Body52({
  slide,
  progress,
  onLab,
  onPractice,
  onWriting,
  onSpeaking,
  onSelfCheck,
  answers,
  writingText,
  onWritingText,
  result,
  onAnswersChange,
  onResult,
  teacherUnlocked,
  onUnlock,
  onExit,
}: {
  slide: Slide52;
  progress: ProgressState52;
  onLab: (id: string) => void;
  onPractice: (id: string) => void;
  onWriting: () => void;
  onSpeaking: () => void;
  onSelfCheck: () => void;
  answers: Record<string, string>;
  writingText: string;
  onWritingText: (value: string) => void;
  result: GradedTestResult52 | null;
  onAnswersChange: (answers: Record<string, string>) => void;
  onResult: (result: GradedTestResult52 | null) => void;
  teacherUnlocked: boolean;
  onUnlock: () => void;
  onExit?: () => void;
}) {
  switch (slide.kind) {
    case "cover":
      return <Cover52 mascot={slide.mascot} />;

    case "goals":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="أهداف الدرس" title="في نهاية الدرس سيكون الطالب قادرًا على:">
          <Bullets52 items={GOALS_52} ordered />
          <ToneCards52 />
          <Note52 emoji="🗺️" text="مسار الدرس: الفكرة → القاعدة → النفي والأسئلة → الأفعال الناقصة والأمر → المقارنة والروابط → التدريبات → الاختبار." />
        </SlideFrame52>
      );

    case "lesson":
      return (
        <SlideFrame52 mascot={slide.mascot} step={slide.step} title={slide.title} lead={slide.lead} tip={slide.tip}>
          {slide.blocks.map((block, index) => (
            <div key={index} className={`pop pop-${Math.min(index + 1, 6)}`}>
              <BlockView52 block={block} />
            </div>
          ))}
        </SlideFrame52>
      );

    case "lab":
      return (
        <SlideFrame52 mascot={slide.mascot} badge={slide.badge ?? "تفاعل"} title={slide.title} lead={slide.lead}>
          <Lab52 id={slide.lab} onTouch={() => onLab(slide.id)} />
        </SlideFrame52>
      );

    case "exercise":
      return (
        <SlideFrame52
          mascot={slide.mascot}
          badge={slide.exercise.badge}
          title={slide.exercise.title}
          lead={slide.exercise.subtitle}
        >
          <ExerciseView exercise={slide.exercise} onTouch={() => onPractice(slide.id)} />
        </SlideFrame52>
      );

    case "solutions":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="مراجعة الإجابات" title={slide.title} lead="قارن بعد المحاولة، لا قبلها.">
          <SolutionsGuide part={slide.part} />
        </SlideFrame52>
      );

    case "dialogue":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="محادثة" title={slide.title} lead={slide.lead}>
          <DialogueView />
        </SlideFrame52>
      );

    case "dialogueQuestions":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="أسئلة الفهم" title={slide.title} lead="أجب بنفسك أولًا، ثم أظهر الجواب للمقارنة.">
          <QuestionsView items={DIALOGUE_QUESTIONS_52} />
          <Note52 emoji="🔎" text="لاحظ أننا استخدمنا will وmight وcan والأمر في نتائج الشرط داخل المحادثة." />
        </SlideFrame52>
      );

    case "readingText":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="قراءة" title={slide.title} lead={slide.lead}>
          <ReadingTextView />
          <Note52 emoji="📌" text="القراءة تحتوي على شرط أول في مواقف مستقبلية محددة، مع may وshould وcan في النتائج." />
        </SlideFrame52>
      );

    case "readingTranslation":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="ترجمة" title={slide.title} lead="قارن كل فقرة بترجمتها لفهم أدق.">
          <TranslationView />
        </SlideFrame52>
      );

    case "readingQuestions":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="أسئلة الفهم" title={slide.title} lead="سبعة أسئلة على قطعة القراءة.">
          <QuestionsView items={READING_QUESTIONS_52} />
        </SlideFrame52>
      );

    case "readingHunt":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="صيد لغوي" title={slide.title} lead="ابحث في النص، واكتب الإجابة، ثم اضغط «تحقق».">
          <ReadingHunt onTouch={() => onPractice(slide.id)} />
        </SlideFrame52>
      );

    case "writing":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="Writing Task" title={slide.title} lead="خطة مستقبلية حقيقية مكتوبة بالشرط الأول.">
          <WritingView value={writingText} onChange={onWritingText} onTouch={onWriting} />
        </SlideFrame52>
      );

    case "speaking":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="Speaking Task" title={slide.title} lead="تحدّث بصوت مرتفع بجمل كاملة، لا بكلمات منفردة.">
          <SpeakingView onTouch={onSpeaking} />
        </SlideFrame52>
      );

    case "summary":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="ملخص" title={slide.title} lead="راجع هذه النقاط قبل الاختبار.">
          <SummaryView />
        </SlideFrame52>
      );

    case "review":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="مراجعة" title={slide.title} lead="خمس جمل ذهبية تجمع الدرس كله.">
          <ReviewView />
        </SlideFrame52>
      );

    case "selfCheck":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="مراجعة ذاتية" title={slide.title} lead="علّم كل مهارة تتقنها فعلًا.">
          <SelfCheckView onTouch={onSelfCheck} />
        </SlideFrame52>
      );

    case "quiz":
      return (
        <SlideFrame52
          mascot={slide.mascot}
          badge="الاختبار النهائي"
          title={slide.title}
          lead="25 سؤالًا: 8 اختيار + 5 إكمال + 5 تصحيح + 3 تحديد نوع + 4 ترجمة. لا تظهر الإجابات قبل التسليم."
        >
          <TestArea52 answers={answers} onAnswersChange={onAnswersChange} result={result} onResult={onResult} />
        </SlideFrame52>
      );

    case "teacher":
      return result ? (
        <TeacherArea52 result={result} unlocked={teacherUnlocked} onUnlock={onUnlock} />
      ) : (
        <SlideFrame52 mascot={slide.mascot} badge="مساحة المعلم" title="مساحة المعلّم" lead="تُفتح بعد تسليم الاختبار النهائي.">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm" data-teacher-waiting>
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-slate-100 text-2xl">🔒</span>
              <div>
                <h3 className="font-head text-xl font-bold text-slate-900">مفتاح التصحيح محمي</h3>
                <p className="mt-1 text-slate-600">
                  لا يوجد مفتاح إجابات في هذه الصفحة قبل التسليم. سلّم الاختبار النهائي أولًا، ثم ستظهر مساحة المعلم
                  المخصصة بكلمة مرور.
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  حالة التسليم الحالية: {result ? "تم التسليم" : "لم يتم التسليم بعد"}.
                </p>
              </div>
            </div>
          </div>
        </SlideFrame52>
      );

    case "dashboard":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="تقدمك" title={slide.title} lead="أرقام حقيقية من تفاعلك، لا نتيجة وهمية.">
          <Dashboard52 progress={progress} result={result} visitedCount={progress.visited.size} />
        </SlideFrame52>
      );

    case "progress":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="52 / 120" title={slide.title} lead="موقعك في المنهج بعد إتمام الدرس 52.">
          <ProgressSlide52 result={result} />
        </SlideFrame52>
      );

    case "roadmap":
      return (
        <SlideFrame52 mascot={slide.mascot} badge="الدرس القادم" title={slide.title} lead="استعد للشرط الثاني.">
          <Roadmap52 />
        </SlideFrame52>
      );

    case "closing":
      return <Closing52 mascot={slide.mascot} onExit={onExit} />;

    default:
      return null;
  }
}

/* ============================================================
   الدرس 52
   ============================================================ */
export default function Lesson52({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [writingText, setWritingText] = useState("");
  const [result, setResult] = useState<GradedTestResult52 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const { state, markVisited, markLab, markPractice, markWriting, markSpeaking, markSelfCheck } = useProgress52();

  const goToStep = useCallback(
    (target: number) => {
      const nextStep = Math.max(0, Math.min(LESSON_STEP_COUNT_52 - 1, target));
      setStep(nextStep);
      markVisited(nextStep);
      setMenuOpen(false);
      if (mainRef.current) mainRef.current.scrollTop = 0;
    },
    [markVisited],
  );

  const previous = useCallback(() => goToStep(step - 1), [goToStep, step]);
  const next = useCallback(() => goToStep(step + 1), [goToStep, step]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        return;
      }
      if (menuOpen) return;
      if (target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        previous();
      } else if (event.key === " " && !(target && target.tagName === "BUTTON")) {
        event.preventDefault();
        next();
      } else if (event.key === "Home") {
        event.preventDefault();
        goToStep(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToStep(LESSON_STEP_COUNT_52 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, next, previous]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_52.map((station) => ({
        section: station.title,
        items: SLIDES_52.flatMap((slide, index) =>
          slide.station === station.id
            ? [
                {
                  index,
                  title: <Mixed52 text={RAIL_TITLES_52[slide.id]} />,
                  mascot: <span aria-hidden="true">{slide.mascot}</span>,
                  navId: slide.id,
                },
              ]
            : [],
        ),
      })),
    [],
  );

  const slide = SLIDES_52[step] ?? SLIDES_52[0];
  const station = STATIONS_52.find((item) => item.id === slide.station) ?? STATIONS_52[0];

  return (
    <Lesson1Shell
      rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800 lesson52"
      rootDir="rtl"
      rootDataLesson={52}
      railAriaLabel="فهرس خطوات درس الشرط الأول"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      itemTitleClassName="line-clamp-2 leading-snug"
      railTitle={
        <span>
          الدرس 52 <En52>· FIRST CONDITIONAL</En52>
        </span>
      }
      railSubtitle={<En52 className="text-xs font-semibold text-slate-400">الشرط الأول — Future Possibilities</En52>}
      groups={groups}
      activeIndex={step}
      onSelectStep={goToStep}
      onExit={onExit}
      isMenuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      headerContent={
        <>
          <Mixed52 text={`${station.title} · ${RAIL_TITLES_52[slide.id]}`} />
        </>
      }
      progress={((step + 1) / LESSON_STEP_COUNT_52) * 100}
      counter={
        <bdi dir="ltr">
          {step + 1} / {LESSON_STEP_COUNT_52}
        </bdi>
      }
      counterDir="ltr"
      contentKey={step}
      contentArea={slide.id}
      onPrev={previous}
      onNext={next}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_52 - 1}
      mainRef={mainRef}
      mainId="l52-main"
    >
      <Body52
        slide={slide}
        progress={state}
        onLab={markLab}
        onPractice={markPractice}
        onWriting={markWriting}
        onSpeaking={markSpeaking}
        onSelfCheck={markSelfCheck}
        answers={answers}
        writingText={writingText}
        onWritingText={setWritingText}
        result={result}
        onAnswersChange={setAnswers}
        onResult={(value) => {
          setResult(value);
          if (!value) {
            setAnswers({});
            setTeacherUnlocked(false);
          }
        }}
        teacherUnlocked={teacherUnlocked}
        onUnlock={() => setTeacherUnlocked(true)}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
