// ============================================================
// الدرس 32 — Present Perfect Continuous (المضارع التام المستمر)
//
// البنية البصرية والتفاعلية مستعارة من الدرس 1 والدرس 41 (المرجع):
//   • سكة جانبية بيضاء بمحطات (أقسام) وصفحات، ودرج على الشاشات الصغيرة.
//   • رأس مضغوط: تقدّم + عدّاد صفحات + اسم المحطة + تبويبات المناطق.
//   • بطاقة بيضاء واحدة بعرض مقروء، ثم شريط تنقّل سفلي ثابت.
//   • لا زر قفل/تنقّل يغطي زر «التالي»: شريط التنقل في التدفّق الطبيعي
//     أسفل المحتوى، وله مساحة محفوظة.
//
// أربع مناطق: الدرس · الاختبار · حلول الاختبار · منطقة المعلم.
// الدرس = 119 صفحة قصيرة (سجل الصفحات في pages32.ts).
// ============================================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { En, Rich } from "../../shared/lessonKit";
import { LatinRuns } from "../../shared/bidi";
import { Signature, SignatureGhost } from "../../shared/Signature";
import LessonStepNav from "../../shared/LessonStepNav";
import { SOURCE_NUMBERED_COUNT_32, SOURCE_LEDGER_COUNT_32, SOURCE_SECTIONS, SEC_32 } from "./ledger32";
import { LESSON_TITLE_32, LESSON_SUBTITLE_32, SECTIONS_32 } from "./data";
import { FOCUS32, Frame32 } from "./kit32";
import { StepBody32, navLabel32 } from "./Steps32";
import { PAGES_32, PAGE_COUNT_32, type Page32 } from "./pages32";

/** عدد شرائح الدرس — الاسم الذي يفهمه تدقيق الاختبار النهائي المشترك. */
const SLIDE_COUNT_32 = PAGES_32.length;
import TestArea32, { Solutions32 } from "./TestArea32";
import TeacherArea32 from "./TeacherArea32";
import FinalTest from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import "./lesson32.css";

type Area32 = "lesson" | "test" | "solutions" | "teacher";
const AREAS_32: { id: Area32; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "الدرس" },
  { id: "test", emoji: "🧪", ar: "منطقة الاختبار" },
  { id: "solutions", emoji: "🔑", ar: "حلول الاختبار" },
  { id: "teacher", emoji: "👩‍🏫", ar: "منطقة المعلم" },
];

/** عدد أسطر المصدر الحرفية المعروضة عبر صفحات الدرس */
const SOURCE_LINES_32 = SOURCE_SECTIONS.reduce((n, sec) => n + sec.units.length, 0);

/** لا تُشغّل التنقّل العام بالأسهم عندما يكون التركيز داخل عنصر تفاعلي يستعمل الأسهم */
function isArrowLocked(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.getAttribute?.("contentEditable") === "true") return true;
  if (el.closest?.("[data-keynav-lock]")) return true;
  if (el.getAttribute?.("role") === "slider") return true;
  return false;
}

/** شريط رحلة الأقسام — يبين موقع الصفحة داخل الدرس كله */
function Journey32({ group }: { group: string }) {
  const current = SECTIONS_32.findIndex((s) => s.id === group);
  return (
    <nav aria-label="رحلة الدرس" className="l32-journey" data-journey-section={group}>
      <ol className="flex w-full items-center gap-0 overflow-x-auto py-1" dir="rtl">
        {SECTIONS_32.map((sec, i) => {
          const state = i < current ? "past" : i === current ? "now" : "future";
          const tone =
            state === "now" ? "l32-journey-now" : state === "past" ? "l32-journey-past" : "l32-journey-future";
          return (
            <li key={sec.id} className="flex min-w-0 shrink-0 items-center">
              <span
                data-journey-state={state}
                className={`l32-journey-dot ${tone} inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold`}
                aria-current={state === "now" ? "step" : undefined}
                aria-label={sec.label}
              >
                <span
                  aria-hidden
                  className="ltr-pair inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-white/40 px-1 font-en text-[10px] leading-none"
                >
                  {state === "past" ? "✓" : i + 1}
                </span>
                <span className="hidden whitespace-nowrap md:inline">
                  <Rich text={sec.label} />
                </span>
              </span>
              {i < SECTIONS_32.length - 1 && <span aria-hidden className="l32-journey-link" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** صفحة الدرس: إطار الدرس 41 + جسم الصفحة (تفاعل أو نص مصدر) */
export function SlideView32({ page, onGoTest }: { page: Page32; onGoTest: () => void }) {
  const index = PAGES_32.findIndex((p) => p.id === page.id);
  return (
    <div className="l32-frame space-y-2.5">
      <Journey32 group={page.group} />
      <Frame32
        mascot={page.mascot}
        step={index + 1}
        badge={page.badge}
        title={page.title}
        lead={page.lead}
        tip={page.tip}
        section={page.sec}
      >
        <div data-lesson-step={page.id} data-source-id={page.sec} className="space-y-3">
          <StepBody32 page={page} onGoTest={onGoTest} />
        </div>
      </Frame32>
    </div>
  );
}

export default function Lesson32({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area32>("lesson");
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const solutionsUnlocked = testChecked || teacherOk;
  const page = PAGES_32[index];
  const progress = useMemo(() => Math.round(((index + 1) / PAGE_COUNT_32) * 100), [index]);
  const mainRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);

  const goSlide = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(PAGE_COUNT_32 - 1, i)));
    setArea("lesson");
    setDrawer(false);
  }, []);

  // ---------------- لوحة المفاتيح: تنقّل + Escape ----------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && drawer) {
        setDrawer(false);
        menuRef.current?.focus?.();
        return;
      }
      if (area !== "lesson") return;
      if (isArrowLocked(e.target)) return;
      // الواجهة RTL: السهم الأيسر = التقدم، والأيمن = الرجوع
      if (e.key === "ArrowLeft") goSlide(index + 1);
      if (e.key === "ArrowRight") goSlide(index - 1);
      if (e.key === "Home") goSlide(0);
      if (e.key === "End") goSlide(PAGE_COUNT_32 - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area, drawer, index, goSlide]);

  // ---------------- التمرير إلى أعلى مع كل صفحة ----------------
  useEffect(() => {
    if (area !== "lesson") return;
    try {
      mainRef.current?.scrollTo?.({ top: 0, behavior: "smooth" });
    } catch {
      /* التمرير غير مدعوم في بيئة الاختبار */
    }
  }, [index, area]);

  // ---------------- الدرج: تركيز أولي + حبس Tab ----------------
  useEffect(() => {
    if (!drawer) return;
    const node = drawerRef.current;
    const focusables = () =>
      [
        ...(node?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? []),
      ].filter((el) => !el.hasAttribute("disabled"));
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

  // ---------------- فهرس الصفحات (سكة + درج) ----------------
  const rail = (
    <nav aria-label="صفحات الدرس" className="space-y-2.5">
      {SECTIONS_32.map((sec) => {
        const items = PAGES_32.map((p, i) => ({ p, i })).filter(({ p }) => p.group === sec.id);
        if (items.length === 0) return null;
        const current = area === "lesson" && items.some(({ i }) => i === index);
        return (
          <div
            key={sec.id}
            className="l32-rail-group rounded-2xl border border-transparent p-1.5"
            aria-current={current ? "true" : undefined}
          >
            <p className="l32-rail-group-name mb-1 px-1 text-xs font-bold">
              <Rich text={sec.label} />
              <span className="ms-1 font-en text-[10px] opacity-70">{items.length}</span>
            </p>
            <ol className="space-y-0.5">
              {items.map(({ p, i }) => {
                const active = i === index && area === "lesson";
                const done = area === "lesson" && i < index;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => goSlide(i)}
                      aria-current={active ? "step" : undefined}
                      data-done={done ? "true" : undefined}
                      className={`l32-rail-step flex w-full items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-start text-[12.5px] font-semibold transition ${FOCUS32}`}
                    >
                      <span aria-hidden className="text-sm">{p.mascot}</span>
                      <span className="min-w-0 flex-1 truncate">
                        <Rich text={navLabel32(p.title)} />
                      </span>
                      <span className="font-en shrink-0 text-[10px] font-bold opacity-70">{i + 1}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
      <p className="px-1 pt-1 text-[11px] font-semibold leading-relaxed text-slate-500">
        <Rich
          text={`📜 المصدر: ${SOURCE_NUMBERED_COUNT_32} قسمًا مرقّمًا من ${SOURCE_LEDGER_COUNT_32} قسمًا · ${SOURCE_LINES_32} سطرًا مصدريًا · ${PAGE_COUNT_32} صفحة قصيرة، وكل سطر مصدر يظهر مرة واحدة.`}
        />
      </p>
    </nav>
  );

  const areaLabel = AREAS_32.find((a) => a.id === area)?.ar ?? "";
  const groupLabel = SECTIONS_32.find((s) => s.id === page.group)?.label ?? "";

  return (
    <div className="lesson32 relative flex h-screen flex-col overflow-hidden" data-lesson="32" dir="rtl">
      <Signature />
      <SignatureGhost />
      <a href="#l32-main" className={`l32-skip ${FOCUS32}`}>
        <Rich text="تخطَّ إلى محتوى الصفحة" />
      </a>

      <div className="l32-shell relative flex min-h-0 flex-1">
        {/* ---------- السكة الجانبية (شاشات كبيرة) ---------- */}
        <aside className="l32-rail hidden w-72 shrink-0 flex-col overflow-hidden lg:flex">
          <div className="l32-rail-head shrink-0 p-4">
            <button
              type="button"
              onClick={onExit}
              className={`text-sm font-semibold text-slate-500 transition hover:text-slate-900 ${FOCUS32}`}
            >
              → <Rich text="جميع الدروس" />
            </button>
            <p className="l32-h mt-2 text-[15px] font-bold leading-snug text-slate-900">
              <Rich text="الدرس 32" />
            </p>
            <p className="mt-0.5">
              <En className="text-[13px] font-bold text-slate-600">Present Perfect Continuous</En>
            </p>
            <p className="mt-1 text-[11px] font-semibold leading-relaxed text-slate-500">
              <LatinRuns text={LESSON_SUBTITLE_32} />
            </p>
          </div>
          <div className="l32-rail-scroll min-h-0 flex-1 overflow-y-auto p-2">{rail}</div>
          <div className="shrink-0 border-t border-slate-100 bg-white p-3 text-[11px] font-semibold text-slate-500">
            <Rich text={`التنقل: الأسهم ← → · ${PAGE_COUNT_32} صفحة`} />
          </div>
        </aside>

        <div className="relative flex min-w-0 flex-1 flex-col">
          {/* ---------- الرأس المضغوط ---------- */}
          <header className="l32-header z-20 flex shrink-0 flex-wrap items-center gap-x-2 gap-y-1.5 px-3 py-2 sm:px-4">
            <button
              type="button"
              ref={menuRef}
              data-nav-toggle="steps"
              onClick={() => setDrawer((d) => !d)}
              aria-expanded={drawer}
              aria-controls={drawer ? "l32-drawer" : undefined}
              className={`inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm lg:hidden ${FOCUS32}`}
            >
              ☰ <Rich text="الصفحات" />
            </button>

            {area === "lesson" && (
              <div className="flex min-w-0 shrink-0 items-center gap-2">
                <span className="rounded-lg bg-white px-2.5 py-1 font-en text-xs font-bold text-slate-500 shadow-sm">
                  {index + 1} / {PAGE_COUNT_32}
                </span>
                <div
                  role="progressbar"
                  aria-label="تقدّم الدرس"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  className="l32-progress-track hidden h-1.5 w-32 overflow-hidden rounded-full sm:block xl:w-52"
                >
                  <div className="l32-progress-fill h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <span className="hidden min-w-0 flex-1 truncate text-xs font-bold text-slate-500 2xl:block">
              <Rich text={area === "lesson" ? `${groupLabel} · ${page.title}` : areaLabel} />
            </span>

            <nav className="ms-auto flex shrink-0 items-center gap-1.5" role="group" aria-label="مناطق الدرس">
              {AREAS_32.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  data-tab={a.id}
                  onClick={() => setArea(a.id)}
                  aria-current={area === a.id ? "true" : undefined}
                  className={`l32-tab px-2.5 text-xs sm:text-[13px] ${FOCUS32}`}
                >
                  <span aria-hidden>{a.emoji}</span>
                  <span className="sr-only sm:hidden">
                    <Rich text={a.ar} />
                  </span>
                  <span className="hidden sm:inline">
                    <Rich text={a.ar} />
                  </span>
                  {a.id === "solutions" && !solutionsUnlocked && <span aria-hidden> 🔒</span>}
                </button>
              ))}
            </nav>

            <button
              type="button"
              onClick={onExit}
              className={`l32-tap l32-tap-soft min-h-[38px] shrink-0 px-3 text-xs ${FOCUS32}`}
            >
              → <Rich text="خروج" />
            </button>
          </header>

          {/* ---------- المحتوى ---------- */}
          <main
            id="l32-main"
            ref={mainRef}
            className="l32-scroll l32-main relative z-10 min-h-0 flex-1 overflow-y-auto px-3 pb-4 pt-3 sm:px-5"
          >
            <p role="status" aria-live="polite" className="sr-only">
              <Rich text={area === "lesson" ? `الصفحة ${index + 1} من ${PAGE_COUNT_32}: ${page.title}` : areaLabel} />
            </p>
            <div className="mx-auto w-full max-w-4xl space-y-3">
              {area === "lesson" && (
                <div data-area="l32-lesson" className="space-y-3">
                  <SlideView32 key={page.id} page={page} onGoTest={() => setArea("test")} />
                  {index === PAGE_COUNT_32 - 1 && (
                    <FinalTest
                      lesson={32}
                      questions={FINAL_TESTS[32]}
                      accent="bg-slate-900"
                      onGoTeacher={() => setArea("teacher")}
                    />
                  )}
                </div>
              )}
              {area === "test" && (
                <div data-area="l32-test">
                  <TestArea32 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} />
                </div>
              )}
              {area === "solutions" && (
                <div data-area="l32-solutions">
                  <Solutions32 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
                </div>
              )}
              {area === "teacher" && (
                <div data-area="l32-teacher">
                  <TeacherArea32 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} />
                </div>
              )}
            </div>
          </main>

          {/* ---------- شريط التنقّل في التدفّق الطبيعي (لا يغطي شيئًا) ---------- */}
          <LessonStepNav
            showStepControls={area === "lesson"}
            onPrev={() => goSlide(index - 1)}
            onNext={() => goSlide(index + 1)}
            prevDisabled={index === 0}
            nextDisabled={index === SLIDE_COUNT_32 - 1}
            prevLabel={<>→ <Rich text="السابق" /></>}
            nextLabel="التالي ←"
            prevClassName={`l32-fab l32-fab-prev ${FOCUS32}`}
            nextClassName={`l32-fab l32-fab-next ${FOCUS32}`}
            className="l32-step-nav"
            ariaLabel="التنقل بين صفحات الدرس 32"
          />
        </div>

        {/* ---------- الدرج (الشاشات الصغيرة) ---------- */}
        {drawer && (
          <div
            className="l32-drawer-scrim lg:hidden"
            onClick={() => {
              setDrawer(false);
              menuRef.current?.focus?.();
            }}
          >
            <div
              id="l32-drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="صفحات الدرس 32"
              className="l32-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="l32-rail-head flex shrink-0 items-start justify-between gap-2 p-3">
                <div className="min-w-0">
                  <p className="l32-h text-sm font-bold leading-snug text-slate-900">
                    <LatinRuns text={LESSON_TITLE_32} />
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">
                    <Rich text={`الصفحة ${index + 1} من ${PAGE_COUNT_32} · ${progress}٪`} />
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDrawer(false);
                    menuRef.current?.focus?.();
                  }}
                  aria-label="إغلاق فهرس الصفحات"
                  className={`grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 ${FOCUS32}`}
                >
                  ✕
                </button>
              </div>
              <div className="l32-scroll min-h-0 flex-1 overflow-y-auto p-2">{rail}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/** يُستخدم في التدقيق: صفحة بمعرّفها */
export function pageById32(id: string): Page32 | undefined {
  return PAGES_32.find((p) => p.id === id);
}

/** يُستخدم في التدقيق: معرّف القسم المصري لصفحة */
export function sectionOfPage32(id: string): number | undefined {
  const p = pageById32(id);
  return p ? SEC_32[p.sec] : undefined;
}
