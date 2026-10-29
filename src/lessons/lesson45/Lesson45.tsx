import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import {
  LESSON_IDENTITY_45,
  LESSON_STEP_COUNT_45,
  LESSON_SUBTITLE_45,
  LESSON_TITLE_45,
  STATIONS_45,
  STEPS_45,
  type Lesson45Step,
} from "./data";
import {
  ComparisonTable45,
  DialogueView45,
  En45,
  ExampleGrid45,
  Formula45,
  Note45,
  NumberList45,
  SentenceCard45,
  SlideFrame45,
  TermCard45,
  Text45,
  Verdict45,
} from "./design45";
import {
  AdviceLab45,
  ChoicePracticeSet45,
  MeaningLab45,
  PastLab45,
  PolitenessLab45,
  ReadingQuestions45,
  TextPracticeSet45,
  WritingMission45,
  createInitialWorkspace45,
  type WorkspaceState45,
} from "./practice45";
import TeacherArea45 from "./TeacherArea45";
import TestArea45 from "./TestArea45";
import type { GradedTestResult45 } from "./testKey45";

const TEST_STEP_INDEX_45 = STEPS_45.findIndex((s) => s.kind === "test");

function CoverSlide45({
  step,
  onStart,
  onGoTest,
}: {
  step: Lesson45Step;
  onStart: () => void;
  onGoTest: () => void;
}) {
  return (
    <section
      data-step-id={step.id}
      className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-14"
    >
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full bg-sky-100 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-orange-100 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="pop text-7xl anim-drift" aria-hidden="true">
          {step.emoji}
        </div>

        <div className="pop pop-1 mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">
          <span>الدرس الخامس والأربعون</span>
          <span className="text-white/40" aria-hidden="true">
            ·
          </span>
          <En45>Lesson 45</En45>
        </div>

        <h1
          id="l45-title"
          tabIndex={-1}
          className="pop pop-2 font-head mt-5 text-3xl font-bold leading-tight text-slate-900 outline-none md:text-5xl"
        >
          <span className="block">{LESSON_SUBTITLE_45}</span>
          <En45 className="mt-2 block text-3xl font-extrabold tracking-wide text-violet-700 md:text-5xl">
            {LESSON_TITLE_45}
          </En45>
        </h1>

        <div
          dir="ltr"
          lang="en"
          className="pop pop-3 font-en mt-2 text-xl font-bold text-slate-400 md:text-2xl"
        >
          {LESSON_IDENTITY_45}
        </div>

        <div className="pop pop-4 mt-8">
          <Formula45
            parts={[
              { en: "SHOULD + V1", ar: "النصيحة والتوقع", tone: "sky" },
              { en: "OUGHT TO + V1", ar: "الصواب والتوصية", tone: "orange" },
              { en: "SHOULD HAVE + V3", ar: "مراجعة الماضي", tone: "emerald" },
            ]}
          />
        </div>

        {step.paragraphs && (
          <div className="mx-auto mt-6 max-w-2xl space-y-2 text-base font-medium leading-relaxed text-slate-600 md:text-lg">
            {step.paragraphs.map((p, i) => (
              <p key={i}>
                <Text45 text={p} />
              </p>
            ))}
          </div>
        )}

        {step.examples && (
          <div className="mt-6 text-right">
            <ExampleGrid45 items={step.examples} columns={1} />
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onStart}
            className="rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-slate-700"
          >
            ابدأ رحلة الدرس ←
          </button>
          <button
            type="button"
            onClick={onGoTest}
            className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-3 text-base font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-800"
          >
            🏆 انتقل إلى الاختبار النهائي (25)
          </button>
        </div>

        <p className="mt-6 text-sm font-semibold text-slate-400 md:text-base">
          للتنقل: الأسهم ← → أو الأزرار أسفل الشريحة
        </p>
      </div>
    </section>
  );
}

function RoadmapSlide45({
  step,
  onRestart,
  onGoTest,
  onExit,
}: {
  step: Lesson45Step;
  onRestart: () => void;
  onGoTest: () => void;
  onExit?: () => void;
}) {
  return (
    <section
      data-step-id={step.id}
      className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-center text-white shadow-xl md:p-12"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-violet-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative space-y-6">
        <div className="tada text-7xl" aria-hidden="true">
          🎓
        </div>

        <div>
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-bold text-emerald-300">
            خريطة التقدم · <bdi dir="ltr">45 / 120</bdi>
          </span>
          <h2
            id="l45-title"
            tabIndex={-1}
            className="font-head mt-3 text-3xl font-bold outline-none md:text-5xl"
          >
            أحسنت! أتممت الدرس الخامس والأربعين
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-slate-300">
            <Text45 text={step.lead} />
          </p>
        </div>

        {/* شريط التقدم الكلي في المنهج */}
        <div className="mx-auto max-w-xl rounded-2xl border border-white/15 bg-white/5 p-4 text-right">
          <div className="flex items-center justify-between text-sm font-bold text-slate-200">
            <span>التقدم الكلي في المنهج الشامل</span>
            <span dir="ltr" className="font-en text-emerald-300">
              45 / 120 (37.5%)
            </span>
          </div>
          <div className="mt-2.5 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[37.5%] rounded-full bg-gradient-to-l from-sky-400 via-violet-400 to-emerald-400" />
          </div>
        </div>

        {/* بطاقة الدرس القادم 46 */}
        <div className="mx-auto max-w-2xl space-y-3 rounded-3xl border border-white/15 bg-white/10 p-5 text-right backdrop-blur-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-extrabold text-amber-300">
              المحطة القادمة
            </span>
            <En45 className="text-sm font-extrabold text-sky-300">
              Lesson 46 · MUSTN’T vs DON’T HAVE TO vs NEEDN’T
            </En45>
          </div>
          {step.paragraphs?.map((p, idx) => (
            <p key={idx} className="text-base font-medium leading-relaxed text-slate-100 md:text-lg">
              <Text45 text={p} />
            </p>
          ))}
        </div>

        {/* أزرار التنقل الختامية */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="rounded-2xl bg-white px-6 py-3 text-base font-bold text-slate-900 shadow transition hover:bg-slate-100"
            >
              🏠 جميع الدروس
            </button>
          )}
          <button
            type="button"
            onClick={onGoTest}
            className="rounded-2xl bg-violet-600 px-5 py-3 text-base font-bold text-white shadow transition hover:bg-violet-500"
          >
            🏆 مراجعة الاختبار النهائي
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-base font-bold text-white transition hover:bg-white/20"
          >
            ↺ إعادة الدرس من البداية
          </button>
        </div>
      </div>
    </section>
  );
}

function StepBody45({
  step,
  stepIndex,
  workspace,
  onChangeWorkspace,
  testAnswers,
  testResult,
  onChangeTestAnswer,
  onSubmitTestResult,
  onResetTest,
  teacherUnlocked,
  onUnlockTeacher,
  onLockTeacher,
  onStart,
  onGoTest,
  onRestart,
  onExit,
}: {
  step: Lesson45Step;
  stepIndex: number;
  workspace: WorkspaceState45;
  onChangeWorkspace: (updater: (prev: WorkspaceState45) => WorkspaceState45) => void;
  testAnswers: Record<string, string>;
  testResult: GradedTestResult45 | null;
  onChangeTestAnswer: (id: string, value: string) => void;
  onSubmitTestResult: (graded: GradedTestResult45) => void;
  onResetTest: () => void;
  teacherUnlocked: boolean;
  onUnlockTeacher: () => void;
  onLockTeacher: () => void;
  onStart: () => void;
  onGoTest: () => void;
  onRestart: () => void;
  onExit?: () => void;
}) {
  const [showReadingAr, setShowReadingAr] = useState(false);

  if (step.kind === "cover") {
    return <CoverSlide45 step={step} onStart={onStart} onGoTest={onGoTest} />;
  }

  if (step.kind === "roadmap") {
    return (
      <RoadmapSlide45
        step={step}
        onRestart={onRestart}
        onGoTest={onGoTest}
        onExit={onExit}
      />
    );
  }

  return (
    <div data-step-id={step.id}>
      <SlideFrame45
        mascot={step.emoji}
        step={stepIndex + 1}
        badge={step.station}
        tone={step.tone}
        title={step.title}
        lead={step.lead}
        tip={step.tip}
      >
        {step.term && (
          <TermCard45
            en={step.term.en}
            ar={step.term.ar}
            desc={step.term.desc}
            tone={step.term.tone}
            icon={step.term.icon}
          />
        )}

        {step.formula && (
          <Formula45 parts={step.formula.parts} suffix={step.formula.suffix} />
        )}

        {step.paragraphs && (
          <div className="space-y-3 text-lg font-medium leading-relaxed text-slate-700">
            {step.paragraphs.map((p, idx) => (
              <p key={idx}>
                <Text45 text={p} />
              </p>
            ))}
          </div>
        )}

        {step.bullets && (
          <NumberList45
            items={step.bullets}
            columns={2}
            tone={step.tone === "amber" || step.tone === "rose" ? "violet" : step.tone}
          />
        )}

        {step.sentences && (
          <div className="space-y-3">
            {step.sentences.map((s, idx) => (
              <SentenceCard45
                key={idx}
                tokens={s.tokens}
                ar={s.ar}
                punct={s.punct}
                defaultOpen={s.defaultOpen}
                badge={s.badge}
              />
            ))}
          </div>
        )}

        {step.verdicts && (
          <div className="space-y-2.5">
            {step.verdicts.map((v, idx) => (
              <Verdict45 key={idx} ok={v.ok} en={v.en} why={v.why} />
            ))}
          </div>
        )}

        {step.table && (
          <ComparisonTable45 headers={step.table.headers} rows={step.table.rows} />
        )}

        {step.examples && <ExampleGrid45 items={step.examples} columns={2} />}

        {step.note && (
          <Note45 emoji={step.note.emoji} title={step.note.title}>
            <Text45 text={step.note.body} />
          </Note45>
        )}

        {step.lab === "advice" && <AdviceLab45 />}
        {step.lab === "meaning" && <MeaningLab45 />}
        {step.lab === "past" && <PastLab45 />}
        {step.lab === "politeness" && <PolitenessLab45 />}

        {step.kind === "dialogue" && step.dialogueTurns && (
          <DialogueView45 turns={step.dialogueTurns} notes={step.dialogueNotes} />
        )}

        {step.kind === "choicePractice" && step.choiceItems && step.choiceGroupId && (
          <ChoicePracticeSet45
            groupId={step.choiceGroupId}
            items={step.choiceItems}
            workspace={workspace}
            onChangeWorkspace={onChangeWorkspace}
          />
        )}

        {step.kind === "textPractice" && step.textItems && (
          <TextPracticeSet45
            items={step.textItems}
            workspace={workspace}
            onChangeWorkspace={onChangeWorkspace}
          />
        )}

        {step.kind === "reading" && step.readingParagraphs && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <En45 className="text-sm font-extrabold text-violet-700">
                A Lesson in Responsibility
              </En45>
              <button
                type="button"
                onClick={() => setShowReadingAr((v) => !v)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                {showReadingAr ? "إخفاء الترجمة المرافقة" : "إظهار الترجمة العربية للفقرات"}
              </button>
            </div>

            <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/70 p-5 md:p-6">
              {step.readingParagraphs.map((para, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200/80 bg-white p-4">
                  <p
                    dir="ltr"
                    lang="en"
                    className="font-en text-left text-lg font-semibold leading-relaxed text-slate-900"
                  >
                    {para.en}
                  </p>
                  {showReadingAr && (
                    <p className="mt-2 border-t border-slate-100 pt-2 text-base font-medium leading-relaxed text-slate-600">
                      <Text45 text={para.ar} />
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step.kind === "readingQuestions" && step.readingQuestions && (
          <ReadingQuestions45
            items={step.readingQuestions}
            workspace={workspace}
            onChangeWorkspace={onChangeWorkspace}
          />
        )}

        {step.kind === "writing" && (
          <WritingMission45
            workspace={workspace}
            onChangeWorkspace={onChangeWorkspace}
          />
        )}

        {step.kind === "test" && (
          <TestArea45
            answers={testAnswers}
            result={testResult}
            onChangeAnswer={onChangeTestAnswer}
            onSubmitResult={onSubmitTestResult}
            onResetTest={onResetTest}
          />
        )}

        {step.kind === "teacher" && (
          <TeacherArea45
            unlocked={teacherUnlocked}
            onUnlock={onUnlockTeacher}
            onLock={onLockTeacher}
          />
        )}
      </SlideFrame45>
    </div>
  );
}

export default function Lesson45({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const [workspace, setWorkspace] = useState<WorkspaceState45>(createInitialWorkspace45);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<GradedTestResult45 | null>(null);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);

  const mainRef = useRef<HTMLElement | null>(null);

  const goToStep = useCallback((target: number) => {
    const clamped = Math.max(0, Math.min(LESSON_STEP_COUNT_45 - 1, target));
    setStep(clamped);
    setVisited((prev) => {
      if (prev.has(clamped)) return prev;
      const next = new Set(prev);
      next.add(clamped);
      return next;
    });
    setMenuOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0 });
    }
  }, []);

  const prevStep = useCallback(() => goToStep(step - 1), [goToStep, step]);
  const nextStep = useCallback(() => goToStep(step + 1), [goToStep, step]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        menuOpen ||
        (target &&
          (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) ||
            target.isContentEditable))
      ) {
        return;
      }
      if (e.key === " ") {
        if (target && /^(BUTTON|A)$/.test(target.tagName)) return;
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        nextStep();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        prevStep();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToStep(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToStep(LESSON_STEP_COUNT_45 - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToStep, menuOpen, nextStep, prevStep]);

  const groups: Lesson1ShellGroup[] = useMemo(
    () =>
      STATIONS_45.map((station) => ({
        section: station.name,
        items: STEPS_45.slice(station.start, station.end + 1).map((s, offset) => ({
          index: station.start + offset,
          title: <Text45 text={s.title} />,
          mascot: s.emoji,
          navId: s.id,
        })),
      })),
    []
  );

  const currentStep = STEPS_45[step] ?? STEPS_45[0];
  const currentStation =
    STATIONS_45.find((st) => step >= st.start && step <= st.end) ?? STATIONS_45[0];

  const handleTestAnswer = useCallback((id: string, value: string) => {
    setTestAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleResetTest = useCallback(() => {
    setTestAnswers({});
    setTestResult(null);
  }, []);

  const progress = ((step + 1) / LESSON_STEP_COUNT_45) * 100;

  return (
    <Lesson1Shell
      rootDir="rtl"
      rootDataLesson={45}
      railAriaLabel="فهرس خطوات الدرس الخامس والأربعين"
      navAriaLabel="التنقل بين خطوات الدرس"
      markActiveStep
      railTitle={
        <span>
          الدرس 45 · <En45>{LESSON_TITLE_45}</En45>
        </span>
      }
      railSubtitle={
        <div className="mt-1 space-y-2.5">
          <div dir="ltr" className="font-en text-xs font-semibold text-slate-400">
            {LESSON_IDENTITY_45}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => goToStep(0)}
              aria-pressed={step < TEST_STEP_INDEX_45}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition ${
                step < TEST_STEP_INDEX_45
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              📖 الشرح ({visited.size}/{LESSON_STEP_COUNT_45})
            </button>
            <button
              type="button"
              onClick={() => goToStep(TEST_STEP_INDEX_45)}
              aria-pressed={step === TEST_STEP_INDEX_45}
              className={`rounded-xl px-2.5 py-1.5 text-xs font-bold transition ${
                step === TEST_STEP_INDEX_45
                  ? "bg-violet-600 text-white"
                  : "bg-violet-50 text-violet-800 hover:bg-violet-100"
              }`}
            >
              🏆 الاختبار{" "}
              {testResult ? (
                <bdi dir="ltr">({testResult.score}/{testResult.total})</bdi>
              ) : (
                "(25)"
              )}
            </button>
          </div>
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
          <bdi dir="rtl">
            <Text45 text={currentStation.name} />
          </bdi>{" "}
          <span aria-hidden="true">{"\u2022"}</span>{" "}
          <bdi dir="rtl" className="text-slate-800">
            <Text45 text={currentStep.title} />
          </bdi>
        </>
      }
      progress={progress}
      counter={`${step + 1} / ${LESSON_STEP_COUNT_45}`}
      counterDir="ltr"
      contentKey={step}
      prevDisabled={step === 0}
      nextDisabled={step === LESSON_STEP_COUNT_45 - 1}
      onPrev={prevStep}
      onNext={nextStep}
      mainRef={mainRef}
      mainId="l45-main"
    >
      <StepBody45
        step={currentStep}
        stepIndex={step}
        workspace={workspace}
        onChangeWorkspace={setWorkspace}
        testAnswers={testAnswers}
        testResult={testResult}
        onChangeTestAnswer={handleTestAnswer}
        onSubmitTestResult={setTestResult}
        onResetTest={handleResetTest}
        teacherUnlocked={teacherUnlocked}
        onUnlockTeacher={() => setTeacherUnlocked(true)}
        onLockTeacher={() => setTeacherUnlocked(false)}
        onStart={() => goToStep(1)}
        onGoTest={() => goToStep(TEST_STEP_INDEX_45)}
        onRestart={() => goToStep(0)}
        onExit={onExit}
      />
    </Lesson1Shell>
  );
}
