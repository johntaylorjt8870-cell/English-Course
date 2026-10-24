// ============================================================
// الدرس 33 — The Four Present Tenses · مختبر أزمنة الحاضر الأربعة
//
// الهوية: هوية المنصة (الدروس 1 و41) + عدسة لونية ثابتة لكل زمن من الأزمنة
// الأربعة. الشرائح قصيرة، والمحتوى الطويل مقسّم على صفحات، وكل إجابة
// مقترنة بمحاولة الطالب قبل كشفها.
//
// المحافظة: التنقّل بخطوات الدرس، المناطق الأربع، قفل الحلول قبل التسليم،
// كلمة مرور المعلم، الاختبار النهائي المشترك في آخر خطوة، وعقود التدقيق.
// ============================================================

import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Signature, SignatureGhost } from "../../shared/Signature";
import LessonStepNav from "../../shared/LessonStepNav";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { AREAS_33, type Area33 } from "./data";
import { SLIDES_33, SLIDE_COUNT_33, STATIONS_33, LESSON_TITLE_33, LESSON_SUBTITLE_33, LAB_NAME_33, LAB_MOTTO_33, type Slide33 } from "./slides33";
import { sectionLines33 } from "./ledger33";
import { En33, Text33, Lens33, Note33, Tip33, FOCUS33, TONE33, TENSES_33, tenseById33, tenseByName33, SourceLines33, NumberCards33, TenseCard33, MixedTitle33 } from "./design33";
import {
  Workspace33Provider,
  useWorkspace33,
  ModelFlip33,
  FormMatch33,
  NoraSort33,
  ContextMatch33,
  ShortAnswers33,
  PickCorrect33,
  SignalSort33,
  DuelChoose33,
  QuestionMatch33,
  FocusLens33,
  StativeGate33,
  ThinkSplit33,
  DetectiveSet33,
  PracticeSet33,
  BothCorrect33,
  StoryReader33,
  StoryHighlight33,
  AnalysisSet33,
  ParagraphDetective33,
  SituationMatch33,
  WritingEditor33,
  GoldenFlip33,
  GoldenRule33,
  ProgressMap33,
  FormsPanel33,
  DuelPairs33,
} from "./kit33";
import { ALL_PRACTICE_33, DETECTIVE_KEY_HEAD_33, WRITING_MODEL_33, WRITING_TITLE_33 } from "./practice33";
import TestArea33, { type TestResult33 } from "./TestArea33";
import type { TestAnswers33 } from "./testData33";
import TeacherArea33 from "./TeacherArea33";
import "./lesson33.css";

const SolutionsArea33 = lazy(() => import("./SolutionsArea33"));

export type TestState33 = {
  answers: TestAnswers33;
  change: (key: string, value: string) => void;
  submitted: boolean;
  result: TestResult33 | null;
  submit: (result: TestResult33) => void;
  reset: () => void;
};

// ------------------------------------------------------------
// أدوات نطاقات الوحدات
// ------------------------------------------------------------
function unitIndexes(ranges?: [number, number][]): number[] {
  if (!ranges) return [];
  const out: number[] = [];
  ranges.forEach(([from, to]) => {
    for (let i = from; i <= to; i += 1) out.push(i);
  });
  return out;
}

function linesAt(section: string, indexes: number[]): string[] {
  const all = sectionLines33(section);
  return indexes.map((i) => all[i]);
}

function navLabel33(title: string): string {
  return title.split(" — ")[0].split(" · ")[0];
}

function isArrowLocked33(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.getAttribute?.("contentEditable") === "true") return true;
  if (el.closest?.("[data-keynav-lock]")) return true;
  return false;
}

// ------------------------------------------------------------
// المختبرات
// ------------------------------------------------------------
function Lab33({ slide }: { slide: Slide33 }) {
  switch (slide.lab) {
    case "model-flip":
      return <ModelFlip33 />;
    case "form-match":
      return <FormMatch33 />;
    case "nora-sort":
      return <NoraSort33 />;
    case "context-match":
      return <ContextMatch33 />;
    case "short-answers":
      return <ShortAnswers33 />;
    case "pick-correct":
      return <PickCorrect33 />;
    case "signal-sort":
      return <SignalSort33 />;
    case "duel-choose":
      return <DuelChoose33 />;
    case "question-match":
      return <QuestionMatch33 />;
    case "focus-lens":
      return <FocusLens33 />;
    case "stative-gate":
      return <StativeGate33 />;
    case "think-split":
      return <ThinkSplit33 />;
    case "both-correct":
      return <BothCorrect33 />;
    case "story-highlight":
      return <StoryHighlight33 />;
    case "situation-match":
      return <SituationMatch33 from={slide.items?.from ?? 1} to={slide.items?.to ?? 2} />;
    case "golden-flip":
      return <GoldenFlip33 />;
    case "golden-rule":
      return <GoldenRule33 />;
    case "progress-map":
      return <ProgressMap33 />;
    default:
      return null;
  }
}

/** أسطر مادة مقترنة بمحاولة الطالب في شريحة غير تفاعلية. */
function GatedLines33({ section, indexes, unlocked }: { section: string; indexes: number[]; unlocked: boolean }) {
  const workspace = useWorkspace33();
  const ids = ALL_PRACTICE_33.filter((item) => item.section === section).map((item) => item.id);
  const done = workspace.doneCount(ids);
  const ready = unlocked || (ids.length > 0 && done === ids.length);
  const [opened, setOpened] = useState(false);
  const lines = linesAt(section, indexes);
  if (!ready) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-4" data-gate="locked">
        <p className="text-sm font-bold text-slate-600">
          <Text33
            text={
              ids.length > 0
                ? `هذه الحلول مقفلة حتى تكمل بنود التدريب (${done} من ${ids.length}).`
                : "هذه الحلول مقفلة حتى تسلّم اختبار الدرس."
            }
          />
        </p>
      </div>
    );
  }
  if (!opened) {
    return (
      <button
        type="button"
        onClick={() => setOpened(true)}
        data-gate="reveal"
        className={`w-full rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-4 text-start transition hover:bg-emerald-100 ${FOCUS33}`}
      >
        <span className="font-head text-lg font-bold text-emerald-900">
          <Text33 text="🔑 اكشف الحلول" />
        </span>
      </button>
    );
  }
  return (
    <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/50 p-4" data-gate="open">
      <SourceLines33 lines={lines} />
    </div>
  );
}

// ------------------------------------------------------------
// جسم الشريحة
// ------------------------------------------------------------
export function SlideBody33({ slide, test, onGoTest, onGoSolutions, solutionsUnlocked }: { slide: Slide33; test: TestState33; onGoTest: () => void; onGoSolutions: () => void; solutionsUnlocked: boolean }) {
  const headIdx = unitIndexes(slide.headRanges);
  const footIdx = unitIndexes(slide.footRanges);
  const allIdx = unitIndexes(slide.ranges);
  const interactive = Boolean(slide.lab) || ["detective", "practice", "analysis", "paragraph", "reading", "test"].includes(slide.kind);
  const bodyIdx = interactive ? [] : allIdx.filter((i) => !headIdx.includes(i) && !footIdx.includes(i));
  const keyIdx = slide.kind === "lesson" || slide.kind === "cover" ? unitIndexes(slide.keyRanges) : [];

  const headLines = linesAt(slide.section, headIdx);
  const footLines = linesAt(slide.section, footIdx);
  const bodyLines = linesAt(slide.section, bodyIdx);

  const tableVariant = slide.variant === "tenseTable" || slide.variant === "signalTable" || slide.variant === "table";

  function renderBody() {
    if (slide.kind === "cover") return null;
    if (slide.kind === "test")
      return (
        <TestArea33
          answers={test.answers}
          change={test.change}
          submitted={test.submitted}
          level={slide.testLevel}
          itemRange={slide.testItems}
          onSubmit={test.submit}
          onReset={test.reset}
        />
      );
    if (slide.kind === "testResult") return <TestResult33View test={test} onGoTest={onGoTest} onGoSolutions={onGoSolutions} />;
    if (slide.kind === "solutions") return <SolutionsGate33 lines={linesAt(slide.section, allIdx)} unlocked={solutionsUnlocked} onGoSolutions={onGoSolutions} />;

    if (slide.kind === "detective") return <DetectiveSet33 from={slide.items?.from ?? 1} to={slide.items?.to ?? 8} keyHead={DETECTIVE_KEY_HEAD_33} />;
    if (slide.kind === "practice") return <PracticeSet33 section={slide.section} from={slide.items?.from ?? 1} to={slide.items?.to ?? 10} />;
    if (slide.kind === "analysis") return <AnalysisSet33 from={slide.items?.from ?? 1} to={slide.items?.to ?? 11} />;
    if (slide.kind === "paragraph") {
      const stage = slide.id === "s18-b" ? "fixed" : slide.id === "s18-c" ? "why-first" : slide.id === "s18-d" ? "why-last" : "work";
      return <ParagraphDetective33 stage={stage} />;
    }
    if (slide.kind === "reading") {
      if (slide.lab === "story-highlight") return <StoryHighlight33 />;
      return <StoryReader33 part={slide.readingPart ?? "story-a"} highlight={false} />;
    }
    if (slide.kind === "writing") {
      if (slide.writingPart === "criteria")
        return (
          <div className="space-y-3">
            <NumberCards33 lines={bodyLines} columns={2} tone="violet" />
            <WritingEditor33 />
          </div>
        );
      if (slide.writingPart === "model")
        return (
          <div className="space-y-3">
            <SourceLines33 lines={bodyLines.slice(0, 1)} />
            <div dir="ltr" lang="en" className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4">
              <p className="font-en text-lg leading-9 text-violet-900">{WRITING_MODEL_33}</p>
            </div>
            <SourceLines33 lines={bodyLines.slice(2)} />
            <WritingEditor33 />
          </div>
        );
      return (
        <div className="space-y-3">
          <SourceLines33 lines={bodyLines.slice(0, 1)} />
          <p dir="ltr" className="font-head text-3xl font-extrabold text-slate-900">
            {WRITING_TITLE_33}
          </p>
          <SourceLines33 lines={bodyLines.slice(2)} />
        </div>
      );
    }

    if (slide.variant === "tense") {
      const groups: string[][] = [];
      bodyLines.forEach((line) => {
        if (/^[①-⑳]/.test(line.trim()) || groups.length === 0) groups.push([line]);
        else groups[groups.length - 1].push(line);
      });
      return <TenseGroups33 groups={groups} />;
    }
    if (slide.variant === "forms" && slide.tense) return <FormsPanel33 tense={slide.tense} lines={bodyLines} />;
    if (slide.variant === "duel") return <DuelPairs33 pair={slide.id === "s8-b" ? "second" : "first"} />;
    if (slide.variant === "objectives" || slide.variant === "steps") return <NumberCards33 lines={bodyLines} columns={slide.variant === "objectives" ? 1 : 2} tone={slide.tone ?? "violet"} />;
    return <SourceLines33 lines={bodyLines} tableTenseColumn={tableVariant} />;
  }

  return (
    <div className="space-y-4" data-slide-body={slide.id}>
      {headLines.length > 0 && (
        <div className="space-y-3">
          <SourceLines33 lines={headLines} />
        </div>
      )}
      {renderBody()}
      {slide.lab && slide.kind !== "reading" && <Lab33 slide={slide} />}
      {keyIdx.length > 0 && <GatedLines33 section={slide.section} indexes={keyIdx} unlocked={solutionsUnlocked} />}
      {footLines.length > 0 && (
        <div className="space-y-3">
          <SourceLines33 lines={footLines} />
        </div>
      )}
    </div>
  );
}

function TenseGroups33({ groups }: { groups: string[][] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  return (
    <div className="space-y-3">
      {groups.map((lines, i) => {
        const name = (lines[0] ?? "").replace(/^[①-⑳]\s*/, "").split(" — ")[0];
        const tense = tenseByName33(name);
        if (!tense) return <SourceLines33 key={i} lines={lines} />;
        return (
          <TenseCard33 key={tense.id} tense={tense.id} lines={lines} open={Boolean(open[i])} onToggle={() => setOpen((c) => ({ ...c, [i]: !c[i] }))} />
        );
      })}
      <div className="flex flex-wrap gap-2">
        {groups.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setOpen((c) => ({ ...c, [i]: true }))}
            className={`rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 ${FOCUS33}`}
          >
            <Text33 text={`افتح العدسة ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

function TestResult33View({ test, onGoTest, onGoSolutions }: { test: TestState33; onGoTest: () => void; onGoSolutions: () => void }) {
  if (!test.submitted || !test.result) {
    return (
      <div className="space-y-3 rounded-3xl border-2 border-dashed border-slate-300 bg-white p-5" data-test-result="pending">
        <p className="font-head text-xl font-bold text-slate-800">
          <Text33 text="نتيجتك تظهر هنا بعد تسليم الاختبار." />
        </p>
        <button type="button" data-nav-area="test" onClick={onGoTest} className={`rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white ${FOCUS33}`}>
          <Text33 text="الانتقال إلى الاختبار" />
        </button>
      </div>
    );
  }
  const { score, total } = test.result;
  const pct = Math.round((score / total) * 100);
  return (
    <div className="space-y-3" data-test-result="ready">
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="font-head text-lg font-bold text-emerald-900">
          <Text33 text="نتيجتك في اختبار الدرس" />
        </p>
        <p className="font-en mt-1 text-5xl font-extrabold text-emerald-800">
          <bdi dir="ltr">
            {score} / {total}
          </bdi>
        </p>
        <p className="mt-1 text-sm font-bold text-emerald-900">{pct}%</p>
      </div>
      <Note33 emoji="🧭">
        <Text33
          text={
            pct >= 88
              ? "إتقان كامل — انتقل إلى مهمة الكتابة ثم إلى الدرس 34."
              : pct >= 72
                ? "جيد جدًا — راجع المواجهات الثلاث ثم أعد الأسئلة التي أخطأت فيها."
                : pct >= 52
                  ? "مقبول — أعد مختبر نورا ومحقق الفقرة قبل إعادة الاختبار."
                  : "تحتاج معالجة — ارجع إلى جدول البناء ثم المحقق الأول."
          }
        />
      </Note33>
      <button type="button" data-nav-area="solutions" onClick={onGoSolutions} className={`rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white ${FOCUS33}`}>
        <Text33 text="افتح الحلول التفصيلية" />
      </button>
      <button type="button" data-nav-area="test" onClick={onGoTest} className={`mr-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 ${FOCUS33}`}>
        <Text33 text="العودة إلى أسئلة الاختبار" />
      </button>
    </div>
  );
}

function SolutionsGate33({ lines, unlocked, onGoSolutions }: { lines: string[]; unlocked: boolean; onGoSolutions: () => void }) {
  return (
    <div className="space-y-3" data-solutions-locked={unlocked ? "false" : "true"}>
      <SourceLines33 lines={lines.slice(0, 2)} />
      {!unlocked && (
        <p className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600">
          <Text33 text="هذه المساحة مقفلة حتى تسلّم اختبار الدرس، أو يفتحها المعلم من منطقته." />
        </p>
      )}
      <button
        type="button"
        data-nav-area="solutions"
        disabled={!unlocked}
        onClick={onGoSolutions}
        className={`w-full rounded-3xl border-2 p-4 text-start transition enabled:border-emerald-300 enabled:bg-emerald-50 enabled:hover:bg-emerald-100 disabled:cursor-not-allowed disabled:border-dashed disabled:border-slate-300 disabled:bg-white disabled:opacity-70 ${FOCUS33}`}
      >
        <span className={`font-head text-lg font-bold ${unlocked ? "text-emerald-900" : "text-slate-500"}`}>
          <Text33 text={`${unlocked ? "🔑" : "🔒"} ${lines[2] ?? "كشف الحلول التفصيلية"}`} />
        </span>
      </button>
    </div>
  );
}

// ------------------------------------------------------------
// الشريحة كاملة (الترويسة + الجسم)
// ------------------------------------------------------------
export function SlideView33({
  slide,
  index,
  test,
  onGoTest,
  onGoSolutions,
  solutionsUnlocked,
}: {
  slide: Slide33;
  index: number;
  test: TestState33;
  onGoTest: () => void;
  onGoSolutions: () => void;
  solutionsUnlocked: boolean;
}) {
  const station = STATIONS_33.find((s) => s.id === slide.station)!;
  const tone = slide.tone ?? station.tone;

  if (slide.kind === "cover") return <Cover33 slide={slide} />;

  return (
    <article className="pop space-y-4" data-slide={slide.id} data-station={slide.station}>
      <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${TONE33[tone].chip}`}>
            <span aria-hidden="true">{station.emoji} </span>
            <Text33 text={slide.badge ?? station.name} />
          </span>
          {slide.tense && <Lens33 tense={slide.tense} />}
          <span className="font-en ms-auto text-xs font-bold text-slate-400">
            <bdi dir="ltr">
              {index + 1} / {SLIDE_COUNT_33}
            </bdi>
          </span>
        </div>
        <div className="mt-3 flex items-start gap-3">
          <span className="anim-drift text-4xl md:text-5xl" aria-hidden="true">
            {slide.mascot}
          </span>
          <h2 className="font-head text-2xl font-bold leading-snug text-slate-900 md:text-3xl">
            <MixedTitle33 text={slide.title} />
          </h2>
        </div>
        {slide.lead && (
          <p className="mt-2 text-lg font-semibold leading-8 text-slate-600">
            <Text33 text={slide.lead} />
          </p>
        )}
      </header>

      <SlideBody33 slide={slide} test={test} onGoTest={onGoTest} onGoSolutions={onGoSolutions} solutionsUnlocked={solutionsUnlocked} />

      {slide.tip && <Tip33><Text33 text={slide.tip} /></Tip33>}
    </article>
  );
}

function Cover33({ slide }: { slide: Slide33 }) {
  const lines = linesAt(slide.section, unitIndexes(slide.ranges));
  return (
    <article className="pop space-y-5" data-slide={slide.id} data-station={slide.station}>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm md:p-12">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-l from-sky-500 via-amber-400 to-emerald-500" aria-hidden="true" />
        <div className="anim-drift text-6xl md:text-8xl" aria-hidden="true">
          {slide.mascot}
        </div>
        <p className="font-en mt-4 text-xs font-extrabold uppercase tracking-[0.28em] text-violet-700 md:text-sm">
          <En33>{LAB_NAME_33}</En33>
        </p>
        <h1 className="font-head mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          <En33 className="text-3xl md:text-5xl">{slide.title}</En33>
        </h1>
        <p className="mt-3 text-lg font-bold text-slate-700 md:text-2xl">
          <MixedTitle33 text={lines[0] ?? LESSON_SUBTITLE_33} />
        </p>
        <div className="mt-5 space-y-2">
          {lines.slice(1).map((line) => (
            <p key={line} className="text-base font-semibold leading-8 text-slate-600 md:text-lg">
              <Text33 text={line} />
            </p>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2" dir="ltr">
          {TENSES_33.map((tense) => (
            <span key={tense.id} className={`rounded-2xl border-2 px-3 py-2 text-sm font-extrabold ${TONE33[tense.tone].soft}`} data-cover-tense={tense.id}>
              <span aria-hidden="true">{tense.emoji} </span>
              <En33 className="text-sm">{tense.en}</En33>
            </span>
          ))}
        </div>
        <p dir="ltr" className="font-en mt-5 text-xs font-bold text-slate-400 md:text-sm">
          {LAB_MOTTO_33}
        </p>
      </div>
    </article>
  );
}

// ------------------------------------------------------------
// الصدفة
// ------------------------------------------------------------
export default function Lesson33({ onExit }: { onExit?: () => void }) {
  const [area, setArea] = useState<Area33>("lesson");
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [answers, setAnswers] = useState<TestAnswers33>({});
  const [result, setResult] = useState<TestResult33 | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const slide = SLIDES_33[index];
  const isLast = index === SLIDE_COUNT_33 - 1;
  const submitted = result !== null;
  const solutionsUnlocked = submitted || teacherUnlocked;
  const progress = useMemo(() => Math.round(((index + 1) / SLIDE_COUNT_33) * 100), [index]);
  const areaLabel = AREAS_33.find((a) => a.id === area)?.ar ?? "";

  const test: TestState33 = useMemo(
    () => ({
      answers,
      change: (key, value) => setAnswers((current) => ({ ...current, [key]: value })),
      submitted,
      result,
      submit: (next) => setResult(next),
      reset: () => {
        setAnswers({});
        setResult(null);
      },
    }),
    [answers, submitted, result],
  );

  const goSlide = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT_33 - 1, i)));
    setArea("lesson");
    setDrawer(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawer) {
        setDrawer(false);
        menuRef.current?.focus?.();
        return;
      }
      if (area !== "lesson") return;
      if (isArrowLocked33(e.target)) return;
      if (e.key === "ArrowLeft") goSlide(index + 1);
      if (e.key === "ArrowRight") goSlide(index - 1);
      if (e.key === "Home") goSlide(0);
      if (e.key === "End") goSlide(SLIDE_COUNT_33 - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area, drawer, index, goSlide]);

  useEffect(() => {
    if (area !== "lesson") return;
    try {
      mainRef.current?.scrollTo?.({ top: 0, behavior: "smooth" });
    } catch {
      mainRef.current?.scrollTo?.(0, 0);
    }
  }, [index, area]);

  useEffect(() => {
    if (!drawer) return;
    const node = drawerRef.current;
    const focusables = () =>
      [...(node?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])].filter((el) => !el.hasAttribute("disabled"));
    focusables()[0]?.focus?.();
    const onTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !node?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onTrap);
    return () => window.removeEventListener("keydown", onTrap);
  }, [drawer]);

  const rail = (
    <nav aria-label="خطوات الدرس 33" className="space-y-3">
      {STATIONS_33.map((station) => {
        const slidesIn = SLIDES_33.map((s, i) => ({ s, i })).filter((x) => x.s.station === station.id);
        if (slidesIn.length === 0) return null;
        const current = area === "lesson" && slidesIn.some(({ i }) => i === index);
        return (
          <div key={station.id} className={`rounded-2xl border p-1.5 transition ${current ? `${TONE33[station.tone].soft}` : "border-transparent"}`} data-station-group={station.id} data-active={current ? "true" : undefined}>
            <p className="mb-1 flex items-center gap-1.5 px-1 text-xs font-extrabold text-slate-600">
              <span aria-hidden="true">{station.emoji}</span>
              <Text33 text={station.name} />
              <En33 className="ms-auto text-[10px] font-bold opacity-60">{station.en}</En33>
            </p>
            <ol className="space-y-1">
              {slidesIn.map(({ s, i }) => {
                const active = i === index && area === "lesson";
                const done = area === "lesson" && i < index;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goSlide(i)}
                      aria-current={active ? "step" : undefined}
                      data-done={done ? "true" : undefined}
                      className={`l33-rail-step flex w-full items-center gap-2 rounded-xl border px-2 py-1.5 text-start text-[13px] font-bold transition ${
                        active ? `${TONE33[station.tone].solid} border-transparent text-white` : "border-transparent text-slate-600 hover:bg-white"
                      } ${FOCUS33}`}
                    >
                      <span aria-hidden="true" className="text-base">
                        {s.mascot}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        <MixedTitle33 text={navLabel33(s.title)} />
                      </span>
                      <bdi dir="ltr" className="font-en shrink-0 text-[11px] font-black opacity-70">
                        {i + 1}
                      </bdi>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </nav>
  );

  const railHead = (
    <div className="shrink-0 space-y-3 border-b border-slate-200 p-4">
      <p className="font-en text-[10px] font-extrabold uppercase tracking-[0.22em] text-violet-700">
        <En33>{LAB_NAME_33}</En33>
      </p>
      <h1 className="font-head text-[15px] font-bold leading-snug text-slate-900">
        <MixedTitle33 text={LESSON_TITLE_33} />
      </h1>
      <p className="text-[11px] font-semibold leading-relaxed text-slate-600">
        <MixedTitle33 text={LESSON_SUBTITLE_33} />
      </p>
      <ul className="grid grid-cols-2 gap-1.5" dir="ltr">
        {TENSES_33.map((tense) => (
          <li key={tense.id} className={`flex items-center gap-1.5 rounded-xl border px-2 py-1 ${TONE33[tense.tone].soft}`}>
            <span aria-hidden="true" className="text-sm">
              {tense.emoji}
            </span>
            <En33 className="text-[10px] font-extrabold">{tense.en}</En33>
          </li>
        ))}
      </ul>
    </div>
  );

  const lessonMain = (
    <div className="space-y-3" data-area="l33-lesson">
      <SlideView33 slide={slide} index={index} test={test} onGoTest={() => setArea("test")} onGoSolutions={() => setArea("solutions")} solutionsUnlocked={solutionsUnlocked} />
      {isLast && (
        <div className="mt-2">
          <FinalTest lesson={33} questions={FINAL_TESTS[33]} accent="bg-emerald-700" onGoTeacher={() => setArea("teacher")} />
        </div>
      )}
    </div>
  );

  const areaMain = useMemo(() => {
    if (area === "lesson") return lessonMain;
    const back = (
      <button type="button" onClick={() => setArea("lesson")} className={`rounded-full border-2 border-slate-300 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 ${FOCUS33}`}>
        <Text33 text="→ العودة إلى خطوات الدرس" />
      </button>
    );
    if (area === "test")
      return (
        <div className="space-y-3" data-area="l33-test">
          {back}
          <TestArea33 answers={test.answers} change={test.change} submitted={test.submitted} onSubmit={test.submit} onReset={test.reset} showIntro />
        </div>
      );
    if (area === "solutions")
      return (
        <div className="space-y-3" data-area="l33-solutions">
          {back}
          {solutionsUnlocked ? (
            <Suspense fallback={<p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-500">جارٍ التحميل…</p>}>
              <SolutionsArea33 answers={test.answers} />
            </Suspense>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6 text-center" data-solutions-locked="true">
              <p className="text-4xl" aria-hidden="true">
                🔐
              </p>
              <p className="font-head mt-2 text-xl font-bold text-slate-800">
                <Text33 text="منطقة الحلول مقفلة" />
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                <Text33 text="سلّم اختبار الدرس (25 سؤالًا) لتُفتح الحلول التفصيلية، أو افتحها من منطقة المعلم." />
              </p>
              <button type="button" data-nav-area="test" onClick={() => setArea("test")} className={`mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white ${FOCUS33}`}>
                <Text33 text="الانتقال إلى الاختبار" />
              </button>
            </div>
          )}
        </div>
      );
    return (
      <div className="space-y-3" data-area="l33-teacher">
        {back}
        <TeacherArea33 unlocked={teacherUnlocked} onUnlockChange={setTeacherUnlocked} onGoSolutions={() => setArea("solutions")} />
      </div>
    );
  }, [area, lessonMain, solutionsUnlocked, teacherUnlocked, test]);

  return (
    <Workspace33Provider>
      <div dir="rtl" className="lesson33 style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800" data-lesson="33">
        <Signature />
        <SignatureGhost />
        <div className="l33-bg" aria-hidden="true" />
        <a href="#l33-main" className={`l33-skip sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:rounded-xl focus:bg-white focus:px-3 focus:py-2 focus:text-sm font-bold ${FOCUS33}`}>
          <Text33 text="تخطَّ إلى محتوى الخطوة" />
        </a>

        <div className="relative flex min-h-0 flex-1">
          <aside className="hidden w-72 shrink-0 flex-col overflow-y-auto border-l border-slate-200 bg-white/80 backdrop-blur lg:flex">
            {railHead}
            <div className="min-h-0 flex-1 p-2">{rail}</div>
          </aside>

          <div className="relative flex min-w-0 flex-1 flex-col">
            <header className="l33-header z-20 flex shrink-0 flex-wrap items-center gap-x-2 gap-y-2 border-b border-slate-200 bg-white/85 px-2.5 py-2 backdrop-blur sm:px-4">
              <button
                type="button"
                ref={menuRef}
                data-nav-toggle="steps"
                onClick={() => setDrawer((d) => !d)}
                aria-expanded={drawer}
                aria-controls={drawer ? "l33-drawer" : undefined}
                className={`l33-tap min-h-[40px] shrink-0 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 lg:hidden ${FOCUS33}`}
              >
                ☰ <Text33 text="الخطوات" />
              </button>

              {area === "lesson" && (
                <div className="flex min-w-0 shrink-0 items-center gap-2">
                  <span className="l33-chip whitespace-nowrap">
                    <Text33 text="خطوة" /> <bdi dir="ltr">{index + 1}</bdi> <Text33 text="من" /> <bdi dir="ltr">{SLIDE_COUNT_33}</bdi>
                  </span>
                  <div
                    role="progressbar"
                    aria-label="تقدّم الدرس"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    className="hidden h-2 w-24 overflow-hidden rounded-full bg-slate-200 sm:block xl:w-40"
                  >
                    <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-amber-400 to-emerald-500 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <nav className="ms-auto flex shrink-0 flex-wrap items-center gap-1.5" role="group" aria-label="مناطق الدرس">
                {AREAS_33.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    data-tab={a.id}
                    onClick={() => setArea(a.id)}
                    aria-current={area === a.id ? "true" : undefined}
                    className={`l33-tab rounded-2xl px-2.5 py-2 text-xs font-bold sm:px-3 sm:text-sm ${FOCUS33}`}
                  >
                    <span aria-hidden="true">{a.emoji}</span>
                    <span className="sr-only sm:hidden">
                      <Text33 text={a.ar} />
                    </span>
                    <span className="hidden sm:inline">
                      <Text33 text={a.ar} />
                    </span>
                    {a.id === "solutions" && !solutionsUnlocked && <span aria-hidden="true"> 🔒</span>}
                  </button>
                ))}
              </nav>

              {onExit ? (
                <button type="button" onClick={onExit} className={`l33-tap min-h-[40px] shrink-0 rounded-2xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 ${FOCUS33}`}>
                  → <Text33 text="خروج" />
                </button>
              ) : null}
            </header>

            <main
              id="l33-main"
              ref={mainRef}
              className="l33-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pb-8 pt-4 md:px-6 lg:px-10"
              data-area={area === "lesson" ? "l33-lesson" : area === "test" ? "l33-test" : area === "solutions" ? "l33-solutions" : "l33-teacher"}
            >
              <p role="status" aria-live="polite" className="sr-only">
                <MixedTitle33 text={area === "lesson" ? `الخطوة ${index + 1} من ${SLIDE_COUNT_33}: ${slide.title}` : areaLabel} />
              </p>
              <div className="pop mx-auto w-full max-w-4xl">{areaMain}</div>
            </main>

            <LessonStepNav
              showStepControls={area === "lesson"}
              onPrev={() => goSlide(index - 1)}
              onNext={() => goSlide(index + 1)}
              prevDisabled={index === 0}
              nextDisabled={index === SLIDE_COUNT_33 - 1}
              prevLabel={
                <>
                  → <Text33 text="السابق" />
                </>
              }
              nextLabel="التالي ←"
              prevClassName={`l33-fab l33-fab-prev ${FOCUS33}`}
              nextClassName={`l33-fab l33-fab-next ${FOCUS33}`}
              className="l33-step-nav"
              ariaLabel="التنقل بين خطوات الدرس 33"
            >
              <span className="l33-chip l33-chip--nav whitespace-nowrap">
                <Text33 text="خطوة" /> <bdi dir="ltr">{index + 1}</bdi> <Text33 text="من" /> <bdi dir="ltr">{SLIDE_COUNT_33}</bdi>
              </span>
            </LessonStepNav>
          </div>

          {drawer && (
            <div className="fixed inset-0 z-50 flex lg:hidden" role="presentation">
              <div className="l33-drawer-scrim absolute inset-0 bg-slate-900/40" onClick={() => { setDrawer(false); menuRef.current?.focus?.(); }} aria-hidden="true" />
              <div id="l33-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-label="خطوات الدرس 33" className="l33-drawer relative flex w-80 max-w-[85vw] flex-col bg-[#f4f6fb] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex shrink-0 items-start justify-between gap-2 border-b border-slate-200 bg-white p-3">
                  <div className="min-w-0">
                    <p className="font-en text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-700">
                      <En33>{LAB_NAME_33}</En33>
                    </p>
                    <h2 className="font-head mt-0.5 text-sm font-bold leading-snug text-slate-900">
                      <MixedTitle33 text={LESSON_TITLE_33} />
                    </h2>
                    <p className="mt-1 text-[11px] font-bold text-slate-600">
                      <Text33 text={`الخطوة ${index + 1} من ${SLIDE_COUNT_33}`} /> · <bdi dir="ltr">{progress}%</bdi>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setDrawer(false); menuRef.current?.focus?.(); }}
                    aria-label="إغلاق فهرس الخطوات"
                    className={`min-h-[38px] rounded-xl border border-slate-200 bg-white px-2.5 font-bold text-slate-700 ${FOCUS33}`}
                  >
                    ✕
                  </button>
                </div>
                <div className="l33-scroll min-h-0 flex-1 overflow-y-auto p-2">{rail}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Workspace33Provider>
  );
}

export { SLIDES_33, SLIDE_COUNT_33 };
export function pageById33(id: string) {
  return SLIDES_33.find((slide) => slide.id === id) ?? null;
}
export { tenseById33 };
