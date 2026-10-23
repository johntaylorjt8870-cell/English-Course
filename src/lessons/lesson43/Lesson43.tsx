import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { En43, Text43, Panel43 } from "./design43";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { Workspace43Provider } from "./kit43";
import { SlideBody43, type TestControls43 } from "./Steps43";
import { SLIDES_43, STATIONS_43, type Slide43 } from "./slides43";

/**
 * الدرس 43 — MAY vs MIGHT
 * الهيكل مطابق للدرس 41/42: rail يسار، شريط تقدم، تنقّل بالأسهم،
 * ومساحة الحلول تُحمّل عند الطلب فقط بعد تسجيل محاولة في التقييم.
 */
export default function Lesson43({ onExit }: { onExit?: () => void }) {
  return (
    <Workspace43Provider>
      <LessonShell43 onExit={onExit} />
    </Workspace43Provider>
  );
}

function LessonShell43({ onExit }: { onExit?: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [graded, setGraded] = useState<{ score: number; total: number } | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const total = SLIDES_43.length;
  const slide = SLIDES_43[index];
  const station = STATIONS_43.find((item) => item.id === slide.station) ?? STATIONS_43[0];
  const progress = ((index + 1) / total) * 100;

  const go = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (target?.isContentEditable) return;
      if (event.key === "ArrowLeft") go.next();
      if (event.key === "ArrowRight") go.prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, menu]);

  useEffect(() => {
    mainRef.current?.scrollTo?.({ top: 0 });
    if (!/jsdom/i.test(navigator.userAgent)) {
      document.getElementById("l43-title")?.focus({ preventScroll: true });
    }
  }, [index]);

  const testControls: TestControls43 = {
    answers,
    submitted,
    graded,
    onChange: (key, value) => {
      if (!submitted) setAnswers((current) => ({ ...current, [key]: value }));
    },
    onSubmit: (result) => {
      setGraded(result);
      setSubmitted(true);
      const target = SLIDES_43.findIndex((item) => item.id === "test-result");
      if (target >= 0) setIndex(target);
    },
    onReset: () => {
      setAnswers({});
      setSubmitted(false);
      setGraded(null);
    },
  };

  const rail = (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-500 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-xl font-bold text-slate-900">
          الدرس 43 <span className="text-slate-300">·</span> <En43>MAY &amp; MIGHT</En43>
        </div>
        <En43 className="text-xs font-semibold text-slate-500">Possibility · Uncertainty · Permission</En43>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="محطات الدرس">
        {STATIONS_43.map((stationItem) => {
          const stationSlides = SLIDES_43.map((item, i) => ({ item, i })).filter(({ item }) => item.station === stationItem.id);
          const active = slide.station === stationItem.id;
          const first = stationSlides[0]?.i ?? 0;
          return (
            <div key={stationItem.id} className="mb-2">
              <button
                onClick={() => {
                  setIndex(first);
                  setMenu(false);
                }}
                aria-expanded={active}
                data-station={stationItem.id}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${active ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <span aria-hidden="true">{stationItem.emoji}</span>
                <span className="truncate"><Text43 text={stationItem.name} /></span>
                <span className={`mr-auto text-xs ${active ? "text-white/80" : "text-slate-500"}`}>{stationSlides.length}</span>
              </button>
              {active && (
                <div className="mt-1 space-y-1 pr-2">
                  {stationSlides.map(({ item, i }) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setIndex(i);
                        setMenu(false);
                      }}
                      aria-current={i === index ? "step" : undefined}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-right text-xs font-semibold transition ${i === index ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      <span className={`grid h-5 w-6 shrink-0 place-items-center rounded ${i === index ? "bg-white/20" : "bg-slate-100"}`}>{i + 1}</span>
                      <span className="truncate"><Text43 text={item.title} /></span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-500">التنقل: الأسهم ← → · {total} شريحة</div>
    </aside>
  );

  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f4f6fb] text-slate-800" data-lesson="43">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">{rail}</div>

        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس الدرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                <Text43 text={station.name} /> <span aria-hidden="true">{"\u2022"}</span> <Text43 text={slide.title} className="text-slate-800" />
              </div>
              <div role="progressbar" aria-label="تقدم الدرس" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-l from-sky-500 via-violet-400 to-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              <bdi dir="ltr">{index + 1} / {total}</bdi>
            </span>
          </header>

          <main ref={mainRef} id="l43-main" data-slide-count={SLIDES_43.length} className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={slide.id} data-slide-id={slide.id} data-slide-kind={slide.kind} className="pop mx-auto max-w-4xl">
              <SlideBody43 slide={slide} index={index} test={testControls} />
              {slide.kind === "testResult" && <SolutionsSpace submitted={submitted} />}
            </div>
          </main>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button
                aria-label="السابق"
                onClick={go.prev}
                disabled={index === 0}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
              >
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button
                aria-label="التالي"
                onClick={go.next}
                disabled={index === total - 1}
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30"
              >
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            {rail}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * مساحة الحلول: تُحمّل عند الطلب فقط، وتُفتح بعد تسجيل محاولة في التقييم.
 * لا تدخل حزمة الطالب الأساسية، ولا تُعرض قبل التسليم.
 */
const LazySolutionsArea = lazy(() => import("./SolutionsArea43"));

/**
 * مساحة الحلول: تُحمّل عند الطلب فقط، وتُفتح بعد تسجيل محاولة في التقييم.
 * لا تدخل حزمة الطالب الأساسية، ولا تُعرض قبل التسليم.
 */
function SolutionsSpace({ submitted }: { submitted: boolean }): ReactNode {
  if (!submitted) {
    return (
      <Panel43 title="الحلول محجوبة">
        <p className="text-base font-bold text-slate-700">
          <Text43 text="سجّل محاولتك في مساحة التقييم أولًا، أو افتح مساحة المعلم للمراجعة." />
        </p>
      </Panel43>
    );
  }
  return (
    <Suspense
      fallback={
        <p role="status" className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 text-sm font-bold text-slate-500">
          <Text43 text="جارٍ تحميل الحلول…" />
        </p>
      }
    >
      <LazySolutionsArea />
    </Suspense>
  );
}
