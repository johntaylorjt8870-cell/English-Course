import TeacherSourceBrowser from "../../shared/TeacherSourceBrowser";
import { mixedText } from "../../shared/lessonKit";
import { TeachingDetails } from "../../shared/TeacherWorkspace";
import TeacherWorkspace, { TeacherSection } from "../../shared/TeacherWorkspace";
// ============================================================
// 🌉 الدرس 31 — Present Perfect · المضارع التام (Native Multi-Step)
// 🌉 THE PRESENT BRIDGE — جسر الحاضر
//
// إعادة بناء أصلية بمعيار الدرس 6 + الدروس 27 · 28 · 29 · 30:
// - فكرة واحدة لكل خطوة · لا جدران نصوص · التفاعل هو الشرح
// - سجل المصدر (SOURCE_SECTIONS) = مرجع التغطية والتدقيق فقط،
//   ولا يُعرض أبدًا كأسطر خام في واجهة الطالب
// - التدريب داخل الدرس = تغذية فورية + تفسير (why) لكل إجابة،
//   ولا يوجد «حلّ الكل ثم تحقق» إلا في الاختبار المنفصل
// - المناطق الأربع: الدرس (50 خطوة) | الاختبار (20) | الحلول | المعلم
// ============================================================

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  SLIDES as DATA_SLIDES,
  SOURCE_SECTIONS,
  SOURCE_LEDGER_COUNT,
  SOURCE_NUMBERED_COUNT,
  SEC,
  SECTIONS_31,
  LESSON_TITLE_31,
  LESSON_SUBTITLE_31,
  LAB_NAME_31,
  LAB_MOTTO_31,
  BRIDGE_STEPS_31,
  HAVE_HAS_31,
  V3_CHART_31,
  V3_SENTENCES_31,
  V3_WRONG_31,
  POSITIVE_31,
  EXPERIENCE_31,
  CONTRAST_31,
  EVER_31,
  EVER_EXTRA_31,
  NEVER_31,
  NEVER_TRAP_31,
  RESULT_31,
  PAIR_LOST_31,
  PAIR_WALLET_31,
  RECENT_WORDS_31,
  RECENT_31,
  ALREADY_31,
  JUST_31,
  YET_QUESTION_31,
  YET_NEGATIVE_31,
  ALREADY_VS_YET_31,
  PERIODS_31,
  PERIOD_EXAMPLES_31,
  PERIODS_CLOSED_31,
  TODAY_PAIR_31,
  FORSINCE_CLASSIFY_31,
  FOR_SENTENCES_31,
  SINCE_SENTENCES_31,
  CONTINUATION_31,
  NEGATIVE_31,
  YESNO_31,
  SHORT_ANSWERS_31,
  WH_31,
  HOWLONG_31,
  COMPARE_31,
  TRIPLE_31,
  TRIPLE_RULES_31,
  DIAGRAMS_31,
  TIMELINE_NODES_31,
  FAMOUS_ERRORS_31,
  DETECTIVE_31,
  SMART_31,
  IQ_PAIRS_31,
  IQ_ANGLE_NOTE_31,
  DEEPER_31,
  BOSS_LINA_TEXT_31,
  BOSS_LINA_VERBS_31,
  BOSS_LINA_REASON_31,
  TRANSFORM_31,
  FORSINCE_ITEMS_31,
  STARTERS_31,
  FINAL_BOSS_31,
  BIG_MAP_31,
  SUMMARY_USES_31,
  SUMMARY_WORDS_31,
  GOLDEN_31,
  CURRICULUM_31,
  INTENTIONALLY_WRONG_31,
  TEST_31,
  TEST_31_SOLUTIONS,
  TEST_31_LEVEL_COUNTS,
  LEVEL_LABEL_31,
  TEACHER_PASSWORD_31,
  TEACHER_31_OVERVIEW,
  TEACHER_31_NOTES,
  TEACHER_31_SOLUTIONS,
  TEACHER_31_RUBRICS,
  TEACHER_31_MISTAKES,
  type Slide31 as Slide31Data,
  type TestQ31,
  type Starter31,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { EnAr, LatinRuns } from "../../shared/bidi";
import {
  En,
  Rich,
  PlatformTag,
  PartsLine,
  Frame,
  Note,
  Verdict,
  Nub,
  type Part,
  type RoleStyle,
  type FrameAccent,
} from "../../shared/lessonKit";
import FinalTest, { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

const ACCENT31: FrameAccent = {
  step: "bg-sky-700",
  badge: "bg-sky-100 text-sky-800",
  tip: "from-sky-700 to-teal-600",
  shadow: "shadow-[0_16px_44px_-24px_rgba(3,105,161,0.45)]",
};

// ---------------- سجل الخطوات (من data.ts) ----------------
export type Slide31 = Slide31Data & { no: number };
const SLIDES: Slide31[] = DATA_SLIDES.map((n, i) => ({ ...n, no: i + 1 }));
export const VIEW_SLIDES = SLIDES;
export const SLIDE_COUNT = SLIDES.length;

function sourceTitleFor(s: Slide31): string {
  return s.source.map((id) => SOURCE_SECTIONS[SEC[id]]?.title ?? id).join(" · ");
}

// ---------------- نظام أدوار الجملة (تشريح Present Perfect) ----------------
const R31: Record<string, RoleStyle> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "الفاعل" },
  have: { chip: "bg-teal-100 border-teal-300 text-teal-900", label: "have / has" },
  v3: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", label: "التصريف الثالث V3" },
  v2: { chip: "bg-orange-100 border-orange-300 text-orange-900", label: "الماضي البسيط V2" },
  not: { chip: "bg-rose-100 border-rose-300 text-rose-900", label: "النفي" },
  key: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "الكلمة الرابطة" },
  time: { chip: "bg-slate-200 border-slate-400 text-slate-900", label: "وقت ماضٍ محدد" },
  dur: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "المدة / البداية" },
  obj: { chip: "bg-slate-100 border-slate-300 text-slate-900", label: "التكملة" },
  wh: { chip: "bg-indigo-100 border-indigo-300 text-indigo-900", label: "أداة السؤال" },
  wrong: { chip: "bg-rose-100 border-rose-300 text-rose-900", label: "الخطأ" },
  fix: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "الإصلاح" },
  now: { chip: "bg-cyan-100 border-cyan-300 text-cyan-900", label: "NOW" },
};
const P = (text: string, role: string): Part => ({ text, role });

/** أرقام مرقّمة للعرض في ملخصات التصحيح — مفتاحها رقم الجملة في المصدر */
const ARABIC_ORD_31: Record<number, string> = {
  1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤", 6: "⑥", 7: "⑦", 8: "⑧",
  9: "⑨", 10: "⑩", 11: "⑪", 12: "⑫", 13: "⑬", 14: "⑭", 15: "⑮",
};

// ---------------- العدسات الزمنية الموحّدة ----------------
export type Lens31 = "ps" | "present" | "pperf" | "pc";
const LENS_META_31: Record<Lens31, { emoji: string; tag: string; ar: string; chip: string; soft: string; text: string; ring: string; bar: string }> = {
  ps: { emoji: "📸", tag: "PAST SIMPLE", ar: "حدث ماضٍ انتهى", chip: "bg-orange-500 text-white", soft: "border-orange-200 bg-orange-50", text: "text-orange-900", ring: "ring-orange-300", bar: "bg-orange-400" },
  present: { emoji: "🌉", tag: "PRESENT PERFECT", ar: "ماضٍ مرتبط بالحاضر", chip: "bg-sky-700 text-white", soft: "border-sky-200 bg-sky-50", text: "text-sky-900", ring: "ring-sky-300", bar: "bg-sky-600" },
  pperf: { emoji: "⏪", tag: "PAST PERFECT", ar: "قبل حدث ماضٍ آخر", chip: "bg-violet-700 text-white", soft: "border-violet-200 bg-violet-50", text: "text-violet-900", ring: "ring-violet-300", bar: "bg-violet-500" },
  pc: { emoji: "🎥", tag: "PAST CONTINUOUS", ar: "كان يحدث في لحظة ماضية", chip: "bg-cyan-600 text-white", soft: "border-cyan-200 bg-cyan-50", text: "text-cyan-900", ring: "ring-cyan-300", bar: "bg-cyan-500" },
};
const LENSES_31: Lens31[] = ["ps", "present", "pperf", "pc"];

function LensChip31({ lens, active, onClick, size = "md" }: { lens: Lens31; active?: boolean; onClick?: () => void; size?: "sm" | "md" }) {
  const v = LENS_META_31[lens];
  const cls = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";
  const inner = (
    <>
      <span aria-hidden>{v.emoji}</span>
      <En>{v.tag}</En>
    </>
  );
  if (!onClick) return <span className={`inline-flex items-center gap-1.5 rounded-xl font-black ${cls} ${v.chip}`}>{inner}</span>;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active === true}
      className={`inline-flex items-center gap-1.5 rounded-xl font-black transition active:scale-95 ${cls} ${
        active ? `${v.chip} ring-2 ${v.ring}` : "border-2 border-slate-200 bg-white text-slate-600 hover:border-sky-300"
      }`}
    >
      {inner}
    </button>
  );
}

// ---------------- مكوّنات تعليمية مشتركة ----------------

/** مختبر بصري تفاعلي — يحمل هوية data-en-seq للتدقيق. */
function Lab({ emoji, label, ar, children, seq }: { emoji: string; label: string; ar?: string; children: ReactNode; seq?: string }) {
  return (
    <div data-en-seq={seq} className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-teal-50 to-amber-50/70 p-3.5 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-sky-100 bg-white px-3 py-2">
        <span className="text-xl" aria-hidden>{emoji}</span>
        <EnAr en={label} ar={ar} enClassName="text-[11px] font-black uppercase tracking-[0.16em] text-sky-700" arClassName="text-sm font-bold text-slate-600" />
      </div>
      {children}
    </div>
  );
}

/** شرح إضافي من المنصة — يُوسم دائمًا بشارة Platform Explanation. */
function PlatformPanel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-3xl border-2 border-amber-300 bg-amber-50 p-3.5">
      <div dir="ltr" className="ltr-pair flex flex-wrap items-center gap-2">
        <PlatformTag />
        {title && (
          <div dir="rtl" className="text-sm font-black text-slate-800">
            <Rich text={title} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/** رقعة كشف — تظهر بعد إتمام المحاولة (ملخص المصدر الحرفي). */
function SourceReveal({ seq, children }: { seq: string; children: ReactNode }) {
  return (
    <div data-reveal-block={seq} className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
      {children}
    </div>
  );
}

/** شريط صيغة إنجليزي — كل عنصر وحدة LTR مستقلة. */
function FormulaStrip({ items, tone = "sky" }: { items: readonly string[]; tone?: "sky" | "teal" | "amber" | "rose" | "violet" | "orange" }) {
  const colors: Record<string, string> = {
    sky: "border-sky-200 bg-white text-sky-900",
    teal: "border-teal-200 bg-white text-teal-900",
    amber: "border-amber-200 bg-white text-amber-900",
    rose: "border-rose-200 bg-white text-rose-900",
    violet: "border-violet-200 bg-white text-violet-900",
    orange: "border-orange-200 bg-white text-orange-900",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item, i) => (
        <En key={`${i}-${item}`} className={`rounded-xl border-2 px-3 py-2 text-sm font-black ${colors[tone]}`}>
          {item}
        </En>
      ))}
    </div>
  );
}

/** جسر الحاضر — المسار البصري الموحّد: ⏮ → 🌉 → ⏺ */
function BridgeTrack({ active = "link", segs }: { active?: string; segs?: { key: string; label: string; wide?: number }[] }) {
  const items = segs ?? [
    { key: "past", label: "X — قبل الآن", wide: 1 },
    { key: "link", label: "🌉 نتيجة / خبرة / استمرار", wide: 2 },
    { key: "now", label: "NOW", wide: 1 },
  ];
  const tone: Record<string, string> = {
    past: "bg-sky-500",
    link: "bg-sky-700",
    now: "bg-teal-600",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-2.5">
      <div className="flex h-10 gap-1">
        {items.map((s) => (
          <div
            key={s.key}
            style={{ flexGrow: s.wide ?? 1, flexBasis: 0 }}
            className={`flex items-center justify-center overflow-hidden rounded-lg ${tone[s.key] ?? "bg-slate-400"} ${active === s.key ? "ring-2 ring-amber-300" : ""}`}
          >
            <span className="px-1 text-center text-[10px] font-black leading-tight text-white">{mixedText(s.label)}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-black text-slate-400">
        <En>BEFORE NOW</En>
        <En>NOW</En>
      </div>
    </div>
  );
}

// ============================================================
// لبنات الممارسة الفورية — تغذية لحظية + تفسير لكل إجابة
// ============================================================

/** سؤال خيارات بتغذية فورية: الاختيار يكشف الصح/الخطأ + why فورًا. */
function McqRow({ n, stem, stemAr, opts, answer, why, context, onFirstAnswer, accent = "bg-sky-700", mono = false }: {
  n: number; stem?: string; stemAr?: string; opts: string[]; answer: number; why: string; context?: string; onFirstAnswer?: () => void; accent?: string; mono?: boolean;
}) {
  const [pick, setPick] = useState<number | undefined>(undefined);
  const right = pick === answer;
  return (
    <div className={`rounded-3xl border-2 p-3.5 transition ${pick === undefined ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <Nub n={n} className={accent} />
        {stem && <En className="text-lg font-bold text-slate-800 md:text-xl">{stem}</En>}
        {stemAr && <Rich text={stemAr} className="text-base font-bold text-slate-800 md:text-lg" />}
      </div>
      {context && (
        <div className="mt-1.5 pr-10">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">📌 <Rich text={context} /></span>
        </div>
      )}
      <div className="mt-2.5 flex flex-wrap gap-2 pr-10">
        {opts.map((o, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => { if (pick === undefined) onFirstAnswer?.(); setPick(oi); }}
            className={`${mono ? "font-en" : "font-en"} rounded-xl border-2 px-3.5 py-1.5 font-bold transition active:scale-95 ${
              pick === oi
                ? oi === answer
                  ? "border-transparent bg-emerald-600 text-white"
                  : "border-transparent bg-rose-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
            }`}
          >
            <LatinRuns text={o} />
          </button>
        ))}
      </div>
      {pick !== undefined && (
        <div className={`mt-2 pr-10 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
          {right ? <span className="tada inline-block">✓ <Rich text={why} /></span>
            : <span>✕ الصحيح: <EnAr en={opts[answer]} sep="—" ar={why} enClassName="font-extrabold" /></span>}
        </div>
      )}
    </div>
  );
}

/** ترتيب موجّه: المس الأجزاء بالترتيب — كل لمسة تُصحَّح فورًا. */
function TapOrder({ seq, items, expected, label = "المس الأجزاء بالترتيب الصحيح", whys, children }: {
  seq: string; items: string[]; expected: number[]; label?: string; whys?: string[]; children?: ReactNode;
}) {
  const [done, setDone] = useState<number[]>([]);
  const [shake, setShake] = useState<number | null>(null);
  const [misses, setMisses] = useState(0);
  const next = expected[done.length];
  const complete = done.length === expected.length;
  const tap = (i: number) => {
    if (done.includes(i) || complete) return;
    if (i === next) setDone((d) => [...d, i]);
    else {
      setShake(i);
      setMisses((m) => m + 1);
      window.setTimeout(() => setShake(null), 450);
    }
  };
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="flex items-center justify-between rounded-2xl border-2 border-sky-100 bg-white px-3 py-2 text-sm font-black text-sky-800">
        <span>👆 <Rich text={label} /></span>
        <span aria-live="polite"><Rich text={`${done.length}/${expected.length}`} /></span>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap gap-2">
        {items.map((it, i) => {
          const rank = done.indexOf(i);
          const isDone = rank >= 0;
          return (
            <button
              key={i}
              type="button"
              data-order-item={i}
              onClick={() => tap(i)}
              disabled={isDone}
              className={`font-en rounded-2xl border-2 px-3.5 py-2 text-base font-black transition active:scale-95 ${
                isDone ? "border-emerald-300 bg-emerald-50 text-emerald-900" : shake === i ? "shake border-rose-400 bg-rose-50 text-rose-700" : "border-slate-200 bg-white text-slate-800 hover:border-sky-300"
              }`}
            >
              {isDone && <span className="pe-1 text-xs font-black text-emerald-600">{rank + 1}</span>}
              {it}
            </button>
          );
        })}
      </div>
      {done.length > 0 && !complete && whys && whys[done.length - 1] && (
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-2.5 text-sm font-bold text-emerald-900">
          ✓ <Rich text={whys[done.length - 1]} />
        </div>
      )}
      {misses > 0 && !complete && (
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-2.5 text-sm font-bold text-amber-800">
          💡 <Rich text="ليس هذا الجزء — اسأل: ما الذي يأتي أولًا في الصيغة؟" />
        </div>
      )}
      {complete && (
        <div className="space-y-2">
          <div className="tada rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-2.5 text-center text-sm font-black text-emerald-900">
            🎉 <Rich text="ترتيب صحيح كامل!" />
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

/** تصحيح بخطوتين: المس الخطأ أولًا… ثم اختر الإصلاح — تغذية فورية في كل خطوة. */
function TwoStepFix({ n, segments, bad, fixOpts, fixAnswer, why, note, fixed, onDone }: {
  n: number; segments: string[]; bad: number; fixOpts: string[]; fixAnswer: number; why: string; note?: string; fixed: string; onDone?: () => void;
}) {
  const [segPick, setSegPick] = useState<number | null>(null);
  const segOk = segPick === bad;
  const [fixPick, setFixPick] = useState<number | null>(null);
  const fixOk = fixPick === fixAnswer;
  const done = segOk && fixOk;
  const firedRef = useRef(false);
  useEffect(() => {
    if (done && !firedRef.current) { firedRef.current = true; onDone?.(); }
  }, [done, onDone]);
  return (
    <div data-fix-item={n} className={`rounded-3xl border-2 p-3.5 transition ${done ? "border-emerald-300 bg-emerald-50/60" : "border-slate-200 bg-white"}`}>
      <div className="flex items-center gap-2.5">
        <Nub n={n} className="bg-rose-600" />
        <Rich text={segPick === null ? "الخطوة ① — المس الجزء الخاطئ:" : segOk ? "أحسنت! الخطوة ② — اختر الإصلاح:" : "ليس هذا الجزء — حاول مجددًا:"} className="text-sm font-black text-slate-700" />
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
        {segments.map((s, i) => (
          <button
            key={i}
            type="button"
            data-fix-seg={i}
            onClick={() => setSegPick(i)}
            className={`font-en rounded-lg border-2 px-2.5 py-1.5 text-base font-bold transition active:scale-95 ${
              segPick === i ? (i === bad ? "border-emerald-500 bg-emerald-600 text-white" : "border-rose-400 bg-rose-600 text-white") : "border-slate-200 bg-slate-50 text-slate-800 hover:border-rose-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      {segOk && (
        <div className="mt-2.5 space-y-2">
          <div className="flex flex-wrap gap-2">
            {fixOpts.map((o, oi) => (
              <button
                key={oi}
                type="button"
                data-fix-opt={oi}
                onClick={() => setFixPick(oi)}
                className={`font-en rounded-xl border-2 px-3.5 py-1.5 font-bold transition active:scale-95 ${
                  fixPick === oi
                    ? oi === fixAnswer ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                }`}
              >
                <LatinRuns text={o} />
              </button>
            ))}
          </div>
          {fixPick !== null && (
            <div className={`text-sm font-bold ${fixOk ? "text-emerald-700" : "text-rose-600"}`}>
              {fixOk ? <span className="tada inline-block">✓ <Rich text={why} /></span> : <span>✕ <Rich text={why} /></span>}
            </div>
          )}
        </div>
      )}
      {done && (
        <div className="mt-2.5 space-y-1.5">
          <Verdict ok en={fixed} why="الجملة الصحيحة" />
          {note && <Note emoji="📌" text={note} />}
        </div>
      )}
    </div>
  );
}

/** سلّتان — صنّف كل عنصر بلمسة، والتغذية تظهر فورًا في مكانه. */
function SortBuckets({ seq, items, buckets, onAllAttempted, children }: {
  seq: string;
  items: { id: string; en: string; bucket: string; ar?: string }[];
  buckets: { id: string; label: string; tone: string }[];
  onAllAttempted?: (count: number) => void;
  children?: ReactNode;
}) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const attempted = items.filter((it) => picks[it.id] !== undefined).length;
  useEffect(() => { onAllAttempted?.(attempted); }, [attempted, onAllAttempted]);
  const solved = items.filter((it) => picks[it.id] === it.bucket).length;
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="flex items-center justify-between rounded-2xl border-2 border-sky-100 bg-white px-3 py-2 text-sm font-black text-sky-800">
        <span>🗂️ <Rich text="صنّف كل جملة إلى سلّتها" /></span>
        <span aria-live="polite"><Rich text={`${solved}/${items.length} صحيحة · ${attempted}/${items.length} مُحاوَلة`} /></span>
      </div>
      {items.map((it) => {
        const pick = picks[it.id];
        const right = pick === it.bucket;
        const bucket = buckets.find((b) => b.id === it.bucket);
        return (
          <div key={it.id} data-sort-item={it.id} className={`rounded-2xl border-2 p-3 transition ${pick === undefined ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
            <En className="block text-base font-black text-slate-800">{it.en}</En>
            {it.ar && <Rich text={it.ar} className="mt-0.5 block text-xs font-bold text-slate-500" />}
            <div className="mt-2 flex flex-wrap gap-2">
              {buckets.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  data-sort-pick={`${it.id}:${b.id}`}
                  onClick={() => setPicks((p) => ({ ...p, [it.id]: b.id }))}
                  className={`rounded-xl border-2 px-3.5 py-1.5 text-sm font-black transition active:scale-95 ${
                    pick === b.id ? `${b.tone} ring-2 ring-offset-1 ring-sky-200` : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
                  }`}
                >
                  <Rich text={b.label} />
                </button>
              ))}
            </div>
            {pick !== undefined && (
              <div className={`mt-1.5 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
                {right ? <span className="tada inline-block">✓</span> : <span>✕ السلّة الصحيحة: <Rich text={bucket?.label ?? ""} /></span>}
              </div>
            )}
          </div>
        );
      })}
      {solved === items.length && children}
    </div>
  );
}

/** مطابقة: اختر من اليسار ثم من اليمين — تصحيح فوري لكل اختيار. */
function PairMatch({ seq, left, right, answer, onAllAttempted, children }: {
  seq: string; left: string[]; right: string[]; answer: number[]; onAllAttempted?: (count: number) => void; children?: ReactNode;
}) {
  const [rec, setRec] = useState<Record<number, number>>({});
  const [focus, setFocus] = useState<number | null>(null);
  const attempted = Object.keys(rec).length;
  useEffect(() => { onAllAttempted?.(attempted); }, [attempted, onAllAttempted]);
  const solved = left.filter((_, i) => rec[i] === answer[i]).length;
  const usedRight = new Set(Object.values(rec));
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="flex items-center justify-between rounded-2xl border-2 border-sky-100 bg-white px-3 py-2 text-sm font-black text-sky-800">
        <span>🔗 <Rich text="طابِق كل عنصر مع ما يناسبه" /></span>
        <span aria-live="polite"><Rich text={`${solved}/${left.length} صحيحة`} /></span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-2">
          {left.map((l, i) => {
            const mine = rec[i];
            const right_ = mine === answer[i];
            return (
              <button
                key={i}
                type="button"
                data-match-left={i}
                onClick={() => setFocus(i)}
                aria-pressed={focus === i}
                className={`block w-full rounded-2xl border-2 p-2.5 text-left transition ${
                  focus === i ? "border-sky-400 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"
                }`}
              >
                <En className="block text-sm font-black text-slate-800">{l}</En>
                {mine !== undefined && (
                  <span className={`mt-1 block text-xs font-black ${right_ ? "text-emerald-700" : "text-rose-600"}`}>
                    {right_ ? "✓ " : "✕ "}<En>{right[mine]}</En>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {right.map((r, ri) => {
            const taken = usedRight.has(ri);
            return (
              <button
                key={ri}
                type="button"
                data-match-right={ri}
                disabled={focus === null}
                onClick={() => {
                  if (focus === null) return;
                  setRec((p) => {
                    const next: Record<number, number> = {};
                    for (const [k, v] of Object.entries(p)) if (v !== ri) next[Number(k)] = v;
                    next[focus] = ri;
                    return next;
                  });
                }}
                className={`block w-full rounded-2xl border-2 p-2.5 text-left text-sm font-bold transition active:scale-[0.99] ${
                  taken ? "border-slate-100 bg-slate-50 text-slate-300" : focus === null ? "border-slate-200 bg-white text-slate-500" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                }`}
              >
                <Rich text={r} />
              </button>
            );
          })}
        </div>
      </div>
      {solved === left.length && children}
    </div>
  );
}

/** بطاقات كشف: المس البطاقة لتظهر قراءتها — بلا تخمين. */
function RevealCards({ seq, items, cols = 2, children }: {
  seq: string; items: { id: string; head: ReactNode; body?: string; tone?: string }[]; cols?: number; children?: ReactNode;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const count = Object.values(open).filter(Boolean).length;
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className={`grid gap-2 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            data-reveal-card={it.id}
            onClick={() => setOpen((o) => ({ ...o, [it.id]: !o[it.id] }))}
            aria-pressed={open[it.id] === true}
            className={`rounded-2xl border-2 p-3 text-right transition active:scale-[0.99] ${open[it.id] ? it.tone ?? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>{open[it.id] ? "🔎" : "🔒"}</span>
              <div className="min-w-0 flex-1">{it.head}</div>
            </div>
            {open[it.id] && it.body && <Rich text={it.body} className="mt-1.5 block text-sm font-bold text-slate-700" />}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="text-center text-xs font-black text-slate-500">
        <Rich text={`كشفت ${count}/${items.length}`} />
      </div>
      {count === items.length && children}
    </div>
  );
}

/** مبدّل السبب: أضف/احذف الكلمة الحاسمة وشاهد الزمن يتغير. */
function CueSwitch({ seq, cues, sentence, tenseLabel, why, onCue, allowNone = true, children }: {
  seq: string;
  cues: { id: string; label: string; tense: string; tone: string; note: string }[];
  sentence: (cueId: string | null) => string;
  tenseLabel: (cueId: string | null) => string;
  why: (cueId: string | null) => string;
  onCue?: (cueId: string | null) => void;
  allowNone?: boolean;
  children?: ReactNode;
}) {
  const [cue, setCue] = useState<string | null>(cues[0]?.id ?? null);
  const active = cues.find((c) => c.id === cue) ?? null;
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="flex flex-wrap justify-center gap-2">
        {cues.map((c) => (
          <button
            key={c.id}
            type="button"
            data-cue={c.id}
            aria-pressed={cue === c.id}
            onClick={() => { setCue(c.id); onCue?.(c.id); }}
            className={`rounded-xl border-2 px-3.5 py-2 text-sm font-black transition active:scale-95 ${cue === c.id ? `${c.tone} ring-2 ring-amber-200` : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"}`}
          >
            <En>{c.label}</En>
          </button>
        ))}
        {allowNone && (
        <button
          type="button"
          data-cue-none
          aria-pressed={cue === null}
          onClick={() => { setCue(null); onCue?.(null); }}
          className={`rounded-xl border-2 px-3.5 py-2 text-sm font-black transition active:scale-95 ${cue === null ? "border-sky-400 bg-sky-50 text-sky-900 ring-2 ring-sky-200" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"}`}
        >
          <Rich text="بدون الوقت المحدد" />
        </button>
        )}
      </div>
      <div key={String(cue)} className="tada rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row">
          <En className="text-lg font-black text-slate-900 md:text-xl">{sentence(cue)}</En>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center justify-center gap-2">
            <span className={`rounded-xl px-3 py-1 text-xs font-black text-white ${active?.tone ?? "bg-sky-700"}`}><Rich text={tenseLabel(cue)} /></span>
            <span dir="rtl"><Rich text={why(cue)} className="text-sm font-bold text-slate-600" /></span>
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

/** محلل الكتابة الحي (㊷): سبع بدايات — كل سطر يتحقق من نمطه لحظيًا. */
function WriteArena({ seq, starters }: { seq: string; starters: Starter31[] }) {
  const [vals, setVals] = useState<string[]>(() => starters.map(() => ""));
  const met = starters.map((s, i) => s.check(vals[i] ?? ""));
  const metCount = met.filter(Boolean).length;
  const allMet = metCount === starters.length;
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="space-y-2">
        {starters.map((s, i) => (
          <div key={s.n} data-starter={s.n} className={`rounded-2xl border-2 p-3 transition ${met[i] ? "border-emerald-300 bg-emerald-50/60" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Nub n={s.n} className="bg-sky-700" />
              <En className="text-base font-black text-slate-800">{s.text}</En>
              <span className={`ms-auto rounded-full px-2.5 py-0.5 text-[11px] font-black ${met[i] ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>
                <Rich text={met[i] ? "النمط مكتمل ✓" : "اكتب جملتك الحقيقية"} />
              </span>
            </div>
            <label className="sr-only" htmlFor={`starter-${s.n}`}>{`الجملة رقم ${s.n}`}</label>
            <input
              id={`starter-${s.n}`}
              dir="ltr"
              value={vals[i]}
              onChange={(e) => setVals((v) => v.map((x, xi) => (xi === i ? e.target.value : x)))}
              placeholder={s.model}
              className="font-en mt-2 w-full rounded-xl border-2 border-slate-200 bg-white p-2.5 text-left text-base font-semibold text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-sky-400"
            />
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800">💡 <Rich text={s.hint} /></span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">نموذج: <En className="font-black">{s.model}</En></span>
            </div>
          </div>
        ))}
      </div>
      <div aria-live="polite" role="status" className={`rounded-2xl px-3 py-2.5 text-sm font-black ${allMet ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-600"}`}>
        {allMet ? "🏆 الجمل السبع مكتملة النمط — راجعها بصوت عالٍ!" : `اكتمل ${metCount} من ${starters.length} أنماط — يُحدَّث لحظيًا أثناء الكتابة.`}
      </div>
      {allMet && <Signature />}
    </div>
  );
}

// ============================================================
// خطوات الدرس — البداية والصيغة والاستخدامات والكلمات
// ============================================================

function CoverStep() {
  const [lens, setLens] = useState<Lens31>("present");
  const demo: Record<string, { en: string; ar: string }> = {
    ps: { en: "I lost my keys yesterday.", ar: "أضعت مفاتيحي أمس — وقت محدد ومنتهٍ." },
    present: { en: "I have lost my keys.", ar: "لقد أضعت مفاتيحي — والنتيجة مهمة الآن." },
    pperf: { en: "I had lost my keys before I left.", ar: "كنت قد أضعت مفاتيحي قبل أن أخرج." },
    pc: { en: "I was losing my patience.", ar: "كنت أفقد صبري — الفعل كان جاريًا في لحظة ماضية." },
  };
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-sky-100 bg-gradient-to-br from-sky-700 via-cyan-700 to-teal-700 p-6 text-center text-white shadow-lg md:p-10">
        <div className="text-5xl anim-drift md:text-6xl">🌉</div>
        <En className="mt-3 block text-2xl font-black uppercase tracking-widest text-sky-200 md:text-3xl">{LAB_NAME_31}</En>
        <h1 className="font-head mt-2 text-2xl font-black md:text-4xl"><LatinRuns text={LESSON_TITLE_31} /></h1>
        <p className="mt-3 text-base font-semibold text-sky-100 md:text-xl"><LatinRuns text={LESSON_SUBTITLE_31} /></p>
        <div dir="ltr" className="ltr-row mx-auto mt-4 max-w-2xl rounded-2xl bg-white/10 p-3">
          <En className="text-sm font-bold text-white md:text-base">{LAB_MOTTO_31}</En>
        </div>
        <div className="mx-auto mt-4 grid max-w-3xl grid-cols-3 gap-2 text-center">
          {[
            { n: SOURCE_NUMBERED_COUNT, t: "قسمًا مرقّمًا" },
            { n: SLIDE_COUNT, t: "خطوة تفاعلية" },
            { n: 20, t: "سؤالًا في منطقة الاختبار" },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl bg-white/10 p-2.5">
              <div className="font-head text-2xl font-black text-white">{s.n}</div>
              <div className="text-[11px] font-bold text-sky-100">{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      <Lab emoji="🌉" label="Bridge Preview" ar="بدّل العدسة — وشاهد كيف ينظر كل زمن إلى الحدث نفسه" seq="l31-cover">
        <div className="flex flex-wrap justify-center gap-2">
          {(["ps", "present", "pperf", "pc"] as Lens31[]).map((l) => (
            <LensChip31 key={l} lens={l} active={lens === l} onClick={() => setLens(l)} size="sm" />
          ))}
        </div>
        <div key={lens} className="tada mt-3 space-y-2">
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl bg-slate-900 p-3 text-center">
            <En className="text-lg font-black text-white md:text-xl">{demo[lens].en}</En>
          </div>
          <Rich text={demo[lens].ar} className="block text-center text-sm font-bold text-slate-600" />
        </div>
        <div className="mt-3">
          <BridgeTrack active={lens === "present" ? "link" : lens === "ps" ? "past" : lens === "pperf" ? "past" : "now"} />
        </div>
      </Lab>

      <Note emoji="🧠" text="الفكرة التي ستغيّر فهمك: Present Perfect لا يعني «حدث في الماضي» فقط — بل ماضٍ ما زال له أثر أو خبرة أو استمرار في اللحظة التي تتكلم فيها." />
      <PlatformPanel title="كيف تقرأ هذا الدرس؟">
        <Rich text="كل خطوة تعرض فكرة واحدة، ثم تتفاعل معها فورًا: تختار · تصنّف · تبني · تصحّح · تكتب. لا تنتظر النهاية لتعرف إن كنت مصيبًا — كل لمسة تجيبك وتشرح لك السبب." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

function OpeningStep() {
  const cards = [
    {
      id: "l27",
      head: <En className="text-base font-black text-slate-800"><LatinRuns text={"V3 — Past Participle (الدرس 27)"} /></En>,
      body: "go → went → gone · eat → ate → eaten — العمود الثالث الذي سنحتاجه بعد have/has في كل جملة اليوم.",
      tone: "border-violet-300 bg-violet-50",
    },
    {
      id: "l30",
      head: <En className="text-base font-black text-slate-800"><LatinRuns text={"The Past System (الدرس 30)"} /></En>,
      body: "أكملنا نظام الماضي: Past Simple · Past Continuous · Past Perfect · Past Perfect Continuous — ولن نعيد شرحه من الصفر.",
      tone: "border-teal-300 bg-teal-50",
    },
    {
      id: "now",
      head: <Rich text="اليوم — المضارع التام" />,
      body: "نبني على ما سبق ونركز على الفكرة التي تجعل Present Perfect مختلفًا عن Past Simple: الماضي المرتبط بالحاضر.",
      tone: "border-sky-300 bg-sky-50",
    },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🚀" text="نكمل مباشرة من الدرس 30، وندخل الآن إلى المرحلة الجديدة: المضارع التام." />
      <Lab emoji="🧭" label="Where We Build From" ar="المس كل بطاقة لتتذكر ما بنينا عليه" seq="l31-opening">
        <RevealCards seq="l31-opening-cards" items={cards} cols={3}>
          <SourceReveal seq="l31-reveal-opening">
            <Rich text="بما أننا شرحنا V3 في الماضي التام، لن نعيد شرح الأساس من الصفر، بل سنبني عليه ونركز على الفكرة التي تجعل Present Perfect مختلفًا عن Past Simple." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </RevealCards>
      </Lab>
      <PlatformPanel title="لماذا هذا الترتيب؟">
        <Rich text="لأن Present Perfect ليس زمنًا جديدًا معزولًا: هو المساعد have/has + نفس فكرة V3 التي تعلمتها، لكن بوظيفة مختلفة — أن يربط الحدث الماضي باللحظة التي تتكلم فيها." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

function ObjectivesStep() {
  const goals = [
    "① فهم معنى Present Perfect الحقيقي، وليس فقط حفظ have/has + V3.",
    "② تكوين الجملة المثبتة والمنفية والاستفهامية.",
    "③ استخدام have و has بشكل صحيح.",
    "④ استخدام V3 بعد have/has.",
    "⑤ فهم كلمات مثل: ever, never, already, just, yet, recently, lately, so far, since, for.",
    "⑥ التمييز بين Present Perfect وPast Simple وPast Perfect.",
    "⑦ معرفة متى يكون الحدث الماضي مرتبطًا بالحاضر.",
    "⑧ اكتشاف الأخطاء التي تبدو صحيحة للوهلة الأولى.",
    "⑨ التعامل مع جمل IQ200 تجمع أكثر من زمن.",
  ];
  const [done, setDone] = useState<Record<number, boolean>>({});
  const count = Object.values(done).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="🎯" text="بنهاية الدرس يجب أن تكون قادرًا على: — الضغط على كل هدف يعلّمه كمُنجَز." />
      <Lab emoji="🎯" label="Lesson Goals" ar="علّم على أهدافك بنفسك" seq="l31-objectives">
        <div className="grid gap-2 sm:grid-cols-2">
          {goals.map((g, i) => (
            <button
              key={i}
              type="button"
              data-goal={i}
              aria-pressed={done[i] === true}
              onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
              className={`flex items-start gap-2 rounded-2xl border-2 p-3 text-right transition active:scale-[0.99] ${done[i] ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <span className="text-lg" aria-hidden>{done[i] ? "✅" : "⬜"}</span>
              <Rich text={g} className="text-sm font-bold leading-relaxed text-slate-700" />
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-2 rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text={`أنجزت ${count} من ${goals.length} أهداف`} />
        </div>
        {count === goals.length && (
          <SourceReveal seq="l31-reveal-objectives">
            <Rich text="كل الأهداف مُعلَّمة — عد إلى هذه القائمة في نهاية الدرس وتحقق بنفسك." className="block text-center text-sm font-black text-emerald-900" />
          </SourceReveal>
        )}
      </Lab>
    </div>
  );
}

// ---------------- ① ما هو Present Perfect؟ ----------------
function S1_WhatStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="الصيغة الأساسية، ثم الفكرة التي تجعل Present Perfect أكثر من مجرد «حدث في الماضي»." />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <PartsLine roles={R31} parts={[P("I", "s"), P("have", "have"), P("finished", "v3"), P("my homework.", "obj")]} size="lg" />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Rich text="لقد أنهيت واجبي." className="text-base text-slate-500 md:text-lg" />
          <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-sky-700">📌 <Rich text="المعنى الأساسي" /></span>
        </div>
      </div>
      <FormulaStrip items={["Subject", "+", "have / has", "+", "V3"]} />
      <Lab emoji="🧠" label="The Real Meaning" ar="اكتشف الفكرة الأهم" seq="l31-s1-formula">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="ما الفكرة الأهم في Present Perfect؟"
            opts={["حدث شيء في الماضي فقط", "الماضي + ارتباط بالحاضر", "حدث سيحدث في المستقبل"]}
            answer={1}
            why="أي أن الحدث حدث قبل الآن، لكن نتيجته أو خبرته أو علاقته بالحاضر مهمة الآن."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="أي جملة تتحدث عن حدث ماضٍ فقط (دون ربط بالحاضر)؟"
            opts={["I have finished my homework.", "I finished my homework yesterday.", "I have lost my keys."]}
            answer={1}
            why="finished + yesterday حدث منتهٍ بتوقيت محدد — هذه وظيفة Past Simple."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      <PlatformPanel title="تشريح الصيغة: كلمة كلمة">
        <ul className="space-y-1.5 text-sm font-semibold leading-relaxed text-slate-700">
          <li>• <Rich text="Subject = الفاعل (I · you · she · the dog) — من قام بالفعل." /></li>
          <li>• <Rich text="have / has = المساعد، وهو وحده الذي يحمل الزمن: have مع I/You/We/They · has مع He/She/It." /></li>
          <li>• <Rich text="V3 = التصريف الثالث: finished · gone · eaten · written — لا يتغير أبدًا بعد المساعد، مهما كان الفاعل." /></li>
          <li><Rich text="• ترتيب الجملة ثابت: Subject + have/has + V3 + (rest) — ولا ندخل did أو do في هذا التركيب." /></li>
        </ul>
      </PlatformPanel>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s1">
          <Rich text="Present Perfect = المضارع التام · الصيغة: Subject + have/has + V3 · المثال: I have finished my homework. = لقد أنهيت واجبي." className="block text-center text-sm font-black text-emerald-900" />
          <Rich text="الفكرة الأهم: الماضي + ارتباط بالحاضر — أي أن الحدث حدث قبل الآن، لكن نتيجته أو خبرته أو علاقته بالحاضر مهمة الآن." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ② لماذا اسمه Present Perfect؟ ----------------
function S2_WhyNameStep() {
  const [done, setDone] = useState(0);
  const cards = [
    { id: "x", head: <Rich text="X = حدث في الماضي" />, body: "وقعت الحادثة فعلًا قبل هذه اللحظة — هذه نقطة البداية.", tone: "border-sky-300 bg-sky-50" },
    { id: "now", head: <En className="text-base font-black text-slate-800">NOW</En>, body: "لكننا الآن نهتم بالنتيجة أو الخبرة أو العلاقة بين X و NOW.", tone: "border-teal-300 bg-teal-50" },
    { id: "lost", head: <En className="text-base font-black text-slate-800">I have lost my keys.</En>, body: "لم أقل متى أضعتها… لكن المشكلة مهمة الآن: المفاتيح ليست معي الآن.", tone: "border-amber-300 bg-amber-50" },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="لأننا نتحدث عن شيء حدث قبل الآن، ولكننا ننظر إليه من نقطة الحاضر." />
      <Lab emoji="📅" label="The Now Bridge" ar="تخيل الخط الزمني: الماضي ─────── X ───────── NOW" seq="l31-s2-bridge">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <En className="text-sm font-black text-slate-400">PAST</En>
            <div className="relative h-3 flex-1 rounded-full bg-gradient-to-r from-sky-200 via-sky-400 to-teal-500">
              <span className="absolute -top-2 left-[35%] grid h-7 w-7 place-items-center rounded-full bg-sky-700 text-xs font-black text-white">X</span>
              <span className="absolute -top-2 right-0 grid h-7 w-7 place-items-center rounded-full bg-teal-600 text-[10px] font-black text-white">NOW</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-[11px] font-black text-slate-400">
            <En>the event happened before now</En>
            <En>we look at it from NOW</En>
          </div>
        </div>
        <div className="mt-3">
          <RevealCards seq="l31-s2-cards" items={cards} cols={3} />
        </div>
      </Lab>
      <Lab emoji="🔎" label="Why Present Perfect?" ar="أجب — كل إجابة تشرح نفسها" seq="l31-s2-quiz">
        <McqRow
          n={1}
          stemAr="لماذا نستخدم Present Perfect في I have lost my keys؟"
          opts={["لأننا نعرف متى حدث الأمر", "لأن المشكلة مهمة الآن: المفاتيح ليست معي", "لأن الحدث لم يحدث بعد"]}
          answer={1}
          why="لم نحدد متى — المهم أن النتيجة قائمة الآن."
          onFirstAnswer={() => setDone((d) => d + 1)}
        />
      </Lab>
      {done >= 1 && (
        <SourceReveal seq="l31-reveal-s2">
          <Rich text="Present Perfect ينظر إلى الحدث من نقطة الحاضر: X وقع في الماضي… ونحن نهتم الآن بالنتيجة أو الخبرة أو العلاقة بين X و NOW." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ③ have أم has؟ ----------------
function S3_HaveHasStep() {
  const [seen, setSeen] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(0);
  const count = Object.values(seen).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="🧩" text="هذه نقطة أساسية جدًا: سبعة ضمائر… ومساعدان فقط." />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-3 text-center">
          <En className="block text-lg font-black text-teal-900">I · You · We · They</En>
          <En className="mt-1 block text-2xl font-black text-teal-700">have</En>
        </div>
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-3 text-center">
          <En className="block text-lg font-black text-sky-900">He · She · It</En>
          <En className="mt-1 block text-2xl font-black text-sky-700">has</En>
        </div>
      </div>
      <Lab emoji="⚙️" label="Helper Machine" ar="المس كل ضمير ليظهر مساعده ومثاله" seq="l31-s3-helpers">
        <div className="grid gap-2 sm:grid-cols-2">
          {HAVE_HAS_31.map((row, i) => (
            <button
              key={row.subj}
              type="button"
              data-helper-subj={row.subj}
              aria-pressed={seen[i] === true}
              onClick={() => setSeen((s) => ({ ...s, [i]: true }))}
              className={`rounded-2xl border-2 p-3 text-right transition active:scale-[0.99] ${seen[i] ? (row.helper === "has" ? "border-sky-300 bg-sky-50" : "border-teal-300 bg-teal-50") : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <div className="flex items-center gap-2">
                <En className="font-head text-lg font-black text-slate-900">{row.subj}</En>
                <span className={`rounded-xl px-2.5 py-0.5 text-sm font-black text-white ${row.helper === "has" ? "bg-sky-700" : "bg-teal-600"}`}>
                  <En>{row.helper}</En>
                </span>
              </div>
              {seen[i] && (
                <div className="mt-1.5">
                  <EnAr en={row.example} ar={row.ar} enClassName="block text-base font-black text-slate-800" arClassName="block text-xs font-bold text-slate-500" />
                </div>
              )}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-2 rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text={`استكشفت ${count} من ${HAVE_HAS_31.length} ضمائر`} />
        </div>
      </Lab>
      <Lab emoji="🧪" label="Quick Check" ar="تحقق سريع" seq="l31-s3-quick">
        <McqRow
          n={1}
          stemAr="أي جملة صحيحة؟"
          opts={["It have stopped.", "It has stopped.", "It has stop."]}
          answer={1}
          why="It → has، وبعد has نستخدم V3: stopped."
          onFirstAnswer={() => setDone((d) => d + 1)}
        />
      </Lab>
      {count === HAVE_HAS_31.length && done >= 1 && (
        <SourceReveal seq="l31-reveal-s3">
          <Rich text="I · You · We · They → have · He · She · It → has — والأمثلة: I have finished. · She has finished. · It has stopped." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ④ ماذا يأتي بعد have/has؟ ----------------
const V3_WRONG_OPTS_31: string[][] = [
  ["gone", "went", "go"],
  ["eaten", "ate", "eat"],
  ["seen", "saw", "see"],
  ["written", "wrote", "write"],
];

function S4_V3Step() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(0);
  const count = Object.values(open).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="بعد have أو has نستخدم V3 = Past Participle — وقد تعلمنا V3 في الدرس 27." />
      <Lab emoji="🔗" label="V3 Chain" ar="المس كل فعل لتكتمل سلسلته: base → V2 → V3" seq="l31-s4-v3">
        <div className="grid gap-2 sm:grid-cols-2">
          {V3_CHART_31.map((row, i) => (
            <button
              key={row.base}
              type="button"
              data-v3-verb={row.base}
              aria-pressed={open[i] === true}
              onClick={() => setOpen((o) => ({ ...o, [i]: true }))}
              className={`rounded-2xl border-2 p-3 transition active:scale-[0.99] ${open[i] ? "border-fuchsia-300 bg-fuchsia-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <En className="rounded-lg border-2 border-slate-300 bg-slate-50 px-2 py-0.5 text-base font-black text-slate-800">{row.base}</En>
                <span className="text-slate-400">→</span>
                <En className={`rounded-lg border-2 px-2 py-0.5 text-base font-black ${open[i] ? "border-orange-300 bg-orange-50 text-orange-900" : "border-slate-200 bg-white text-slate-300"}`}>
                  {open[i] ? row.v2 : "؟"}
                </En>
                <span className="text-slate-400">→</span>
                <En className={`rounded-lg border-2 px-2 py-0.5 text-base font-black ${open[i] ? "border-fuchsia-400 bg-fuchsia-600 text-white" : "border-slate-200 bg-white text-slate-300"}`}>
                  {open[i] ? row.v3 : "V3؟"}
                </En>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Rich text={row.ar} className="text-xs font-bold text-slate-500" />
                {open[i] && <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-black text-teal-700">✔ <En>{row.v3}</En><LatinRuns text={" هي المستخدمة بعد have/has"} /></span>}
              </div>
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-2 rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text={`فتحت ${count} من ${V3_CHART_31.length} سلاسل`} />
        </div>
      </Lab>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <p className="mb-2 text-sm font-black text-slate-600"><Rich text="لذلك… الجمل الصحيحة من المصدر:" /></p>
        <div className="grid gap-2 sm:grid-cols-2">
          {V3_SENTENCES_31.map((s) => (
            <div key={s.en} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-2.5">
              <EnAr en={s.en} ar={s.ar} enClassName="block text-base font-black text-slate-800" arClassName="text-xs font-bold text-slate-500" />
            </div>
          ))}
        </div>
      </div>
      <Lab emoji="🚫" label="Wrong Forms Hunt" ar="أربع جمل خاطئة — اختر التصريف الصحيح" seq="l31-s4-wrong">
        <div className="space-y-2.5">
          {V3_WRONG_31.map((w, i) => (
            <McqRow
              key={w.wrong}
              n={i + 1}
              stem={w.wrong}
              opts={V3_WRONG_OPTS_31[i]}
              answer={0}
              why={w.why}
              onFirstAnswer={() => setDone((d) => d + 1)}
            />
          ))}
        </div>
      </Lab>
      {count >= 4 && done >= 4 && (
        <SourceReveal seq="l31-reveal-s4">
          <Rich text="وليس: I have went. ❌ · She has ate. ❌ · They have saw. ❌ · He has wrote. ❌" className="block text-center text-sm font-black text-rose-700" />
          <Rich text="بعد have/has يأتي V3 فقط: gone · eaten · seen · written · taken · broken · finished · played." className="block text-center text-sm font-bold text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑤ الجملة المثبتة ----------------
function S5_PositiveStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🏗️" text="القاعدة: Subject + have/has + V3 — والآن نبني الجمل بأيدينا." />
      <FormulaStrip items={["Subject", "+", "have / has", "+", "V3"]} />
      <Lab emoji="👆" label="Build: They" ar="ابنِ الجملة بلمس الأجزاء بالترتيب" seq="l31-s5-build-1">
        <TapOrder
          seq="l31-s5-order-1"
          items={["built", "They", "a small robot.", "have"]}
          expected={[1, 3, 0, 2]}
          whys={["They = الفاعل (الجمع → have)", "have = المساعد", "built = V3 للفعل build", "a small robot. = التكملة"]}
        />
      </Lab>
      <Lab emoji="👆" label="Build: The dog" ar="جملة ثانية — لاحظ has مع مفرد غائب" seq="l31-s5-build-2">
        <TapOrder
          seq="l31-s5-order-2"
          items={["eaten", "has", "its food.", "The dog"]}
          expected={[3, 1, 0, 2]}
          whys={["The dog = فاعل مفرد → has", "has = المساعد الصحيح", "eaten = V3 للفعل eat", "its food. = التكملة"]}
        />
      </Lab>
      <Lab emoji="🧪" label="Choose The V3" ar="أكمل الجمل الأربع المتبقية" seq="l31-s5-quiz">
        <div className="space-y-2.5">
          <McqRow n={1} stem="I have ______ my room." opts={["cleaned", "clean", "cleans"]} answer={0} why="بعد have نستخدم V3: cleaned." onFirstAnswer={() => setDone((d) => d + 1)} />
          <McqRow n={2} stem="She has ______ the window." opts={["open", "opened", "opening"]} answer={1} why="بعد has نستخدم V3: opened." onFirstAnswer={() => setDone((d) => d + 1)} />
          <McqRow n={3} stem="He has ______ his password." opts={["forgot", "forget", "forgotten"]} answer={2} why="forget → forgot → forgotten — بعد has نستخدم forgotten لا forgot." onFirstAnswer={() => setDone((d) => d + 1)} />
          <McqRow n={4} stem="We have ______ the project." opts={["finish", "finished", "finishing"]} answer={1} why="بعد have نستخدم V3: finished." onFirstAnswer={() => setDone((d) => d + 1)} />
        </div>
      </Lab>
      {done >= 4 && (
        <SourceReveal seq="l31-reveal-s5">
          <Rich text="لاحظ: He has forgotten... وليس He has forgot... — لأن بعد has نحتاج V3: forget → forgot → forgotten." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          <Rich text={POSITIVE_31.map((p) => p.en).join(" · ")} className="mt-1 block text-center text-xs font-black text-emerald-800" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑥ أول استخدام: التجربة في الحياة ----------------
function S6_ExperienceStep() {
  const [attempted, setAttempted] = useState(0);
  const items = [
    ...EXPERIENCE_31.map((e, i) => ({ id: `exp${i}`, en: e.en, bucket: "exp", ar: e.ar })),
    { id: "t1", en: "yesterday", bucket: "time", ar: "وقت ماضٍ محدد ومنتهٍ" },
    { id: "t2", en: "in 2023", bucket: "time", ar: "وقت ماضٍ محدد ومنتهٍ" },
    { id: "t3", en: "last year", bucket: "time", ar: "وقت ماضٍ محدد ومنتهٍ" },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="أول استخدام: نتحدث عن تجربة حدثت في حياتنا، دون تحديد وقت ماضٍ منتهٍ." />
      <Lab emoji="🗂️" label="Experience Sorter" ar="صنّف: تجربة في الحياة أم وقت ماضٍ محدد؟" seq="l31-s6-classify">
        <SortBuckets
          seq="l31-s6-sort"
          items={items}
          buckets={[
            { id: "exp", label: "🌉 تجربة في الحياة", tone: "border-transparent bg-sky-700 text-white" },
            { id: "time", label: "📸 وقت ماضٍ محدد", tone: "border-transparent bg-orange-500 text-white" },
          ]}
          onAllAttempted={setAttempted}
        >
          <SourceReveal seq="l31-reveal-s6">
            <Rich text="لاحظ: لا نحدد وقتًا معينًا — I have visited Italy أي «لقد زرت إيطاليا» في حياتي، بلا تاريخ." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </SortBuckets>
      </Lab>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <p className="mb-2 text-sm font-black text-slate-600"><Rich text="أمثلة المصدر الخمسة:" /></p>
        <div className="grid gap-2 sm:grid-cols-2">
          {EXPERIENCE_31.map((e) => (
            <div key={e.en} className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 p-2.5">
              <EnAr en={e.en} ar={e.ar} enClassName="block text-base font-black text-slate-800" arClassName="text-xs font-bold text-slate-500" />
            </div>
          ))}
        </div>
      </div>
      {attempted >= items.length && (
        <div aria-live="polite" className="rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text="أحسنت — الجمل الخمس تجارب، والعبارات الثلاث أوقات محددة لا تصلح مع Present Perfect." />
        </div>
      )}
    </div>
  );
}

// ---------------- ⑦ الفرق الخطير مع Past Simple ----------------
function S7_ContrastStep() {
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const cues = visited;
  const seenCount = Object.keys(cues).length;
  return (
    <div className="space-y-4">
      <Note emoji="⚠️" text="قارن: I visited Italy in 2023 مقابل I have visited Italy — كلمة واحدة تغيّر الزمن كله." />
      <Lab emoji="🔀" label="The Dangerous Difference" ar="أضف in 2023 وأزلها — وشاهد الزمن يتغير" seq="l31-s7-switch">
        <CueSwitch
          seq="l31-s7-cue"
          cues={[{ id: "in2023", label: "in 2023", tense: "Past Simple", tone: "bg-orange-500 text-white", note: "وقت محدد ومنتهٍ" }]}
          sentence={(cueId) => (cueId === "in2023" ? "I visited Italy in 2023." : "I have visited Italy.")}
          tenseLabel={(cueId) => (cueId === "in2023" ? "📸 Past Simple" : "🌉 Present Perfect")}
          why={(cueId) => (cueId === "in2023" ? "هنا لدينا وقت محدد وانتهى: in 2023 → Past Simple." : "لا يوجد وقت محدد — نحن نتحدث عن تجربة → Present Perfect.")}
          onCue={(id) => setVisited((v) => ({ ...v, [String(id)]: true }))}
        />
      </Lab>
      <div className="grid gap-2 sm:grid-cols-2">
        {CONTRAST_31.map((c) => (
          <div key={c.en} className={`rounded-3xl border-2 p-3 ${c.tense === "Past Simple" ? "border-orange-200 bg-orange-50" : "border-sky-200 bg-sky-50"}`}>
            <EnAr en={c.en} ar={c.ar} enClassName="block text-base font-black text-slate-800" arClassName="mt-0.5 block text-xs font-bold text-slate-500" />
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center gap-2"><span className={`rounded-xl px-2.5 py-0.5 text-[11px] font-black text-white ${c.tense === "Past Simple" ? "bg-orange-500" : "bg-sky-700"}`}><En>{c.tense}</En></span><span dir="rtl"><span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-600"><Rich text={c.tense === "Past Simple" ? "السبب: in 2023" : "السبب: لا يوجد وقت محدد"} /></span></span></span>
            </div>
          </div>
        ))}
      </div>
      {seenCount >= 2 && (
        <SourceReveal seq="l31-reveal-s7">
          <Rich text="قاعدة ذكية: وقت ماضٍ محدد ومنتهٍ → Past Simple · تجربة دون وقت محدد → Present Perfect." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑧ Grammar Detective — لندن 2022 ----------------
function S8_DetectiveStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🕵️" text="جملة تبدو صحيحة تمامًا… لكن فيها خطأ واحد حاسم." />
      <Lab emoji="🕵️" label="London 2022" ar="خطوتان: المس الخطأ ثم اختر التصحيح" seq="l31-s8-fix">
        <TwoStepFix
          n={1}
          segments={["I", "have visited", "London", "in 2022."]}
          bad={1}
          fixOpts={["I visited London in 2022.", "I have visited London.", "I have visit London in 2022."]}
          fixAnswer={0}
          why="in 2022 وقت ماضٍ محدد ومنتهٍ — فالفعل يأخذ Past Simple: visited."
          note="لكن I have visited London. ✅ صحيحة لأننا لم نحدد متى."
          fixed="I visited London in 2022."
        />
      </Lab>
      <Lab emoji="🧪" label="Detective Check" ar="سؤالان سريعان" seq="l31-s8-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stem="I have visited London."
            stemAr="— هل هذه الجملة صحيحة؟"
            opts={["صحيحة", "خاطئة"]}
            answer={0}
            why="صحيحة لأننا لم نحدد متى — تجربة في الحياة."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="لماذا كانت I have visited London in 2022 خاطئة؟"
            opts={["لأن London مدينة", "لأن in 2022 وقت ماضٍ محدد ومنتهٍ", "لأن have لا تأتي مع I"]}
            answer={1}
            why="وجود وقت ماضٍ محدد ومنتهٍ يمنع Present Perfect في استخدامه الأساسي."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s8">
          <Rich text="إذن نقول: I visited London in 2022. ✅ · لكن: I have visited London. ✅ — الفرق كله في تحديد الوقت." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑨ ever = هل سبق أن...؟ ----------------
function S9_EverStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="ever تعني تقريبًا: «هل سبق أن...؟» — وتظهر كثيرًا في الأسئلة." />
      <FormulaStrip items={["Have / Has", "+", "Subject", "+", "ever", "+", "V3?"]} />
      <Lab emoji="👆" label="Build The Question" ar="ابنِ السؤال بلمس الكلمات بالترتيب" seq="l31-s9-build">
        <TapOrder
          seq="l31-s9-order"
          items={["ever", "Have", "visited Spain?", "you"]}
          expected={[1, 3, 0, 2]}
          whys={["Have = المساعد (نبدأ به)", "you = الفاعل", "ever = كلمة «هل سبق» ومكانها قبل V3", "visited Spain? = V3 + التكملة"]}
        />
      </Lab>
      <Lab emoji="🗂️" label="Ever Questions" ar="المس كل سؤال ليظهر معناه — ثم راقب العدّاد" seq="l31-s9-cards">
        <RevealCards
          seq="l31-s9-reveals"
          items={EVER_31.map((e, i) => ({ id: `ever${i}`, head: <En className="text-sm font-black text-slate-800">{e.en}</En>, body: e.ar, tone: "border-sky-300 bg-sky-50" }))}
        >
          <div className="space-y-2">
            <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3">
              <En className="block text-base font-black text-slate-800">{EVER_EXTRA_31.en}</En>
              <div className="mt-1 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800"><En>{EVER_EXTRA_31.yes}</En></span>
                <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-black text-rose-800"><En>{EVER_EXTRA_31.no}</En></span>
              </div>
            </div>
          </div>
        </RevealCards>
      </Lab>
      <Lab emoji="🧪" label="Ever Check" ar="سؤالان — كل إجابة تشرح نفسها" seq="l31-s9-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stem="Has she ever seen snow?"
            stemAr="— ما معنى this question؟"
            opts={["هل سبق أن رأت الثلج؟", "هل سترى الثلج؟", "هل رأت الثلج أمس؟"]}
            answer={0}
            why="ever = هل سبق — سؤال عن خبرة في الحياة."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="أين تقف ever في السؤال؟"
            opts={["في نهاية السؤال", "بين الفاعل وV3", "قبل Have"]}
            answer={1}
            why="النمط: Have/Has + Subject + ever + V3 — وever قبل الفعل الأساسي."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s9">
          <Rich text="النمط: Have/Has + Subject + ever + V3? — Have you ever flown in a helicopter? · الإجابة: Yes, I have. / No, I haven't." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑩ never = لم يسبق أبدًا ----------------
function S10_NeverStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="never تعني: لم يسبق أبدًا. — فماذا يحدث عندما نضيف not؟" />
      <Lab emoji="🚫" label="Never Trap" ar="اختر الجملة الصحيحة واكتشف فخّ النفي المزدوج" seq="l31-s10-trap">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="أي جملة صحيحة؟"
            opts={["I have never seen it.", "I haven't never seen it."]}
            answer={0}
            why="لأن never تحمل معنى النفي أصلًا — فلا نضيف not."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="ما سبب خطأ I haven't never seen it؟"
            opts={["لأن seen ليست V3", "لأن الجملة فيها نفيان: haven't وnever", "لأن I تأخذ has"]}
            answer={1}
            why="نفي مزدوج: كلمة واحدة كافية — أبقِ never أو أبقِ haven't، لا كليهما."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      <Lab emoji="🗂️" label="Never Sentences" ar="المس كل جملة لتظهر ترجمتها" seq="l31-s10-cards">
        <RevealCards
          seq="l31-s10-reveals"
          items={NEVER_31.map((n, i) => ({ id: `never${i}`, head: <En className="text-sm font-black text-slate-800">{n.en}</En>, body: n.ar, tone: "border-rose-300 bg-rose-50" }))}
        >
          <SourceReveal seq="l31-reveal-s10">
            <Rich text="⚠️ لا نستخدم not مع never — I have never seen it. ✅ · I haven't never seen it. ❌" className="block text-center text-sm font-black text-emerald-900" />
          </SourceReveal>
        </RevealCards>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s10b">
          <Rich text="أربع جمل من المصدر: I have never visited Australia. · She has never ridden a motorcycle. · He has never eaten sushi. · They have never seen snow." className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑪ ثاني استخدام: نتيجة موجودة الآن ----------------
function S11_ResultStep() {
  const [done, setDone] = useState(0);
  const cards = RESULT_31.map((r, i) => ({
    id: `res${i}`,
    head: <En className="text-sm font-black text-slate-800">{r.en}</En>,
    body: `النتيجة الآن: ${r.result}`,
    tone: "border-amber-300 bg-amber-50",
  }));
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="الاستخدام الثاني (ومن أهم استخدامات Present Perfect): النتيجة موجودة الآن." />
      <Lab emoji="🔎" label="Result Now" ar="المس كل جملة لتكشف نتيجتها الحالية" seq="l31-s11-result">
        <RevealCards seq="l31-s11-reveals" items={cards} cols={2}>
          <div className="grid gap-2 sm:grid-cols-2">
            {RESULT_31.map((r) => (
              <div key={r.ar} className="rounded-2xl border-2 border-sky-100 bg-white p-2.5">
                <Rich text={r.ar} className="block text-sm font-bold text-slate-700" />
                <Rich text={r.result} className="mt-0.5 block text-xs font-black text-amber-700" />
              </div>
            ))}
          </div>
        </RevealCards>
      </Lab>
      <Lab emoji="🧪" label="Result Check" ar="سؤالان عن المعنى" seq="l31-s11-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="ما الذي يجعل Present Perfect مناسبًا في I have lost my wallet؟"
            opts={["لأننا نعرف متى حدث", "لأن النتيجة مهمة الآن: المحفظة ليست معي", "لأن الحدث لم يكتمل"]}
            answer={1}
            why="ليس فقط أنني أضعتها — المهم أن المحفظة ليست معي الآن."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stem="Someone has opened the door."
            stemAr="— متى تكون هذه الجملة مناسبة؟"
            opts={["عندما يكون الباب مفتوحًا الآن", "عندما نذكر وقت فتح الباب", "عندما يكون الباب مغلقًا"]}
            answer={0}
            why="النتيجة قائمة: الباب مفتوح الآن."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s11">
          <Rich text="لكل جملة نتيجة حاضرة: المحفظة ليست معي · النظارة مكسورة · لا يملك مفاتيحه · الباب مفتوح الآن." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- 📸 Past Simple vs Present Perfect ----------------
function S_PsPpStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="📸" text="انظر إلى الفرق: نفس الفعل، وسؤالان مختلفان تمامًا." />
      <div className="grid gap-2 sm:grid-cols-2">
        {PAIR_WALLET_31.map((p) => (
          <div key={p.en} className={`rounded-3xl border-2 p-3 ${p.tense === "Past Simple" ? "border-orange-200 bg-orange-50" : "border-sky-200 bg-sky-50"}`}>
            <EnAr en={p.en} ar={p.ar} enClassName="block text-base font-black text-slate-800" arClassName="mt-0.5 block text-xs font-bold text-slate-500" />
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center gap-2"><span className={`rounded-xl px-2.5 py-0.5 text-[11px] font-black text-white ${p.tense === "Past Simple" ? "bg-orange-500" : "bg-sky-700"}`}><En>{p.tense}</En></span><span dir="rtl"><span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-slate-600"><Rich text={p.cue} /></span></span></span>
            </div>
          </div>
        ))}
      </div>
      <Lab emoji="🧠" label="Two Questions" ar="لكل جملة سؤال واحد تجيب عنه — اكتشفه" seq="l31-pspp-pair">
        <div className="space-y-2.5">
          {PAIR_LOST_31.map((p, i) => (
            <McqRow
              key={p.en}
              n={i + 1}
              stem={p.en}
              stemAr={`— ${p.question}`}
              opts={["متى حدث الأمر؟ → أمس (yesterday).", "ما المشكلة الآن؟ → المفاتيح مفقودة."]}
              answer={p.tense === "Past Simple" ? 0 : 1}
              why={p.tense === "Past Simple" ? "yesterday وقت محدد ومنتهٍ → Past Simple." : "لا يوجد وقت محدد، والنتيجة مهمة الآن → Present Perfect."}
              onFirstAnswer={() => setDone((d) => d + 1)}
            />
          ))}
        </div>
      </Lab>
      <Lab emoji="🔑" label="Keep This Pair" ar="زوج يجب أن تحفظه" seq="l31-pspp-pair2">
        <div className="space-y-2">
          <div className="rounded-2xl border-2 border-orange-200 bg-white p-3">
            <En className="block text-base font-black text-slate-800">I lost my keys yesterday.</En>
            <Rich text="أضعت مفاتيحي أمس — الجملة تخبرنا: متى حدث الأمر؟ أمس." className="mt-0.5 block text-sm font-bold text-slate-600" />
          </div>
          <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
            <En className="block text-base font-black text-slate-800">I have lost my keys.</En>
            <Rich text="لقد أضعت مفاتيحي — الجملة تخبرنا: ما المشكلة الآن؟ المفاتيح مفقودة." className="mt-0.5 block text-sm font-bold text-slate-600" />
          </div>
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-pspp">
          <Rich text="احفظ هذا الزوج: I lost my keys yesterday. · I have lost my keys. — الأولى تجيب «متى؟» والثانية تجيب «ما المشكلة الآن؟»." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑫ ثالث استخدام: شيء حدث مؤخرًا ----------------
function S12_RecentStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="الاستخدام الثالث: أحداث حديثة نتيجتها أو علاقتها بالحاضر مهمة." />
      <Lab emoji="🔑" label="Recent Words" ar="أربع كلمات تربط الحديث بالحاضر" seq="l31-s12-words">
        <RevealCards
          seq="l31-s12-wordcards"
          items={RECENT_WORDS_31.map((w) => ({
            id: w.word,
            head: <En className="text-base font-black text-slate-800">{w.word}</En>,
            body: w.ar,
            tone: "border-teal-300 bg-teal-50",
          }))}
          cols={2}
        />
      </Lab>
      <Lab emoji="👆" label="Build: just" ar="ابنِ جملة من المصدر بلمس الأجزاء" seq="l31-s12-build">
        <TapOrder
          seq="l31-s12-order"
          items={["finished", "I", "my homework.", "have", "just"]}
          expected={[1, 3, 4, 0, 2]}
          whys={["I = الفاعل", "have = المساعد", "just = الكلمة الرابطة (للتو)", "finished = V3", "my homework. = التكملة"]}
        />
      </Lab>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <p className="mb-2 text-sm font-black text-slate-600"><Rich text="أمثلة المصدر الخمسة:" /></p>
        <div className="grid gap-2 sm:grid-cols-2">
          {RECENT_31.map((r) => (
            <div key={r.en} className="rounded-2xl border-2 border-teal-100 bg-teal-50/40 p-2.5">
              <En className="block text-base font-black text-slate-800">{r.en}</En>
              <div className="mt-0.5 flex flex-wrap items-center gap-2">
                <Rich text={r.ar} className="text-xs font-bold text-slate-500" />
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-black text-amber-800"><En>{r.word}</En></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Lab emoji="🧪" label="Recent Check" ar="سؤالان عن الوظيفة" seq="l31-s12-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stem="We have recently moved to a new house."
            stemAr="— ما وظيفة recently هنا؟"
            opts={["تحدد وقتًا ماضيًا منتهيًا", "تخبر أن الحدث حديث وله علاقة بالحاضر", "تنفي الحدث"]}
            answer={1}
            why="recently = مؤخرًا — الحدث حديث ونتيجته (المنزل الجديد) قائمة الآن."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stem="The train has just left."
            stemAr="— ما معنى this sentence؟"
            opts={["غادر القطار للتو", "سيغادر القطار قريبًا", "غادر القطار أمس"]}
            answer={0}
            why="just = للتو — الحدث وقع قبل لحظات ونتيجته مهمة الآن."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s12">
          <Rich text="just = للتو · already = بالفعل · recently = مؤخرًا · lately = في الآونة الأخيرة — كلها تربط الحدث الحديث بالحاضر." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑬ already = بالفعل ----------------
function S13_AlreadyStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="already تعني أن الشيء حدث قبل الوقت المتوقع أو قبل الآن." />
      <Lab emoji="📍" label="Where Is already?" ar="أين تقف already في الجملة؟" seq="l31-s13-already">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="ما الموضع الصحيح لـ already؟"
            opts={["have/has + already + V3", "في نهاية الجملة دائمًا", "قبل الفاعل"]}
            answer={0}
            why="غالبًا تأتي: have/has + already + V3 — مثل She has already left."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="أي جملة مرتبة ترتيبًا صحيحًا؟"
            opts={["She has left already.", "She has already left.", "Already she has left."]}
            answer={1}
            why="الموضع القياسي: بعد المساعد وقبل V3 — She has already left."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      <Lab emoji="👆" label="Build: already" ar="ابنِ الجملة بلمس الأجزاء" seq="l31-s13-build">
        <TapOrder
          seq="l31-s13-order"
          items={["already", "She", "left.", "has"]}
          expected={[1, 3, 0, 2]}
          whys={["She = الفاعل (→ has)", "has = المساعد", "already = قبل V3", "left. = V3 للفعل leave"]}
        />
      </Lab>
      <Lab emoji="🗂️" label="Already Sentences" ar="المس كل جملة لتكشف ترجمتها" seq="l31-s13-cards">
        <RevealCards
          seq="l31-s13-reveals"
          items={ALREADY_31.map((a, i) => ({ id: `al${i}`, head: <En className="text-sm font-black text-slate-800">{a.en}</En>, body: a.ar, tone: "border-teal-300 bg-teal-50" }))}
        >
          <SourceReveal seq="l31-reveal-s13">
            <Rich text="already تعني أن الشيء حدث قبل الوقت المتوقع أو قبل الآن — وغالبًا تأتي: have/has + already + V3." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </RevealCards>
      </Lab>
    </div>
  );
}

// ---------------- ⑭ just = للتو ----------------
function S14_JustStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="النمط الشائع: have/has + just + V3 — خمس جمل من المصدر." />
      <FormulaStrip items={["have / has", "+", "just", "+", "V3"]} tone="teal" />
      <Lab emoji="🔗" label="Match The Meaning" ar="طابِق كل جملة مع معناها" seq="l31-s14-just">
        <PairMatch
          seq="l31-s14-match"
          left={JUST_31.map((j) => j.en)}
          right={JUST_31.map((j) => j.ar)}
          answer={[0, 1, 2, 3, 4]}
        >
          <SourceReveal seq="l31-reveal-s14">
            <Rich text="كل الجمل الخمس: الحدث وقع قبل لحظات قليلة (للتو) — ونتيجته قائمة الآن." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </PairMatch>
      </Lab>
      <PlatformPanel title="كيف تتحقق من موضع just؟">
        <Rich text="ابحث عن المساعد أولًا (have/has)، ثم تأكد أن الكلمة الرابطة (just) تقع بينه وبين الفعل، وأن الفعل نفسه بصيغة V3. لو اختل أحد الشرطين فالتركيب مكسور." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ⑮ yet = بعد / حتى الآن ----------------
function S15_YetStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="yet تستخدم كثيرًا في: الأسئلة… والجمل المنفية." />
      <Lab emoji="❓" label="Yet Question" ar="ابنِ السؤال بلمس الكلمات" seq="l31-s15-yet">
        <TapOrder
          seq="l31-s15-order"
          items={["yet?", "Have", "your homework", "you", "finished"]}
          expected={[1, 3, 4, 2, 0]}
          whys={["Have = المساعد", "you = الفاعل", "finished = V3", "your homework = التكملة", "yet? = في نهاية السؤال"]}
        />
      </Lab>
      <div className="rounded-3xl border-2 border-sky-100 bg-white p-4">
        <EnAr en={YET_QUESTION_31.en} ar={YET_QUESTION_31.ar} enClassName="block text-base font-black text-slate-800" arClassName="mt-0.5 block text-sm font-bold text-slate-600" />
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800"><En>{YET_QUESTION_31.yes}</En></span>
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-black text-rose-800"><En>{YET_QUESTION_31.no}</En></span>
        </div>
      </div>
      <Lab emoji="🚫" label="Yet Negatives" ar="أكمل الجمل المنفية" seq="l31-s15-neg">
        <div className="space-y-2.5">
          {YET_NEGATIVE_31.map((y, i) => (
            <McqRow
              key={y.en}
              n={i + 1}
              stem={y.en.replace(/yet\.$/, "______.")}
              opts={["yet.", "already.", "just."]}
              answer={0}
              why={`${y.ar} — وyet غالبًا في نهاية الجملة.`}
              onFirstAnswer={() => setDone((d) => d + 1)}
            />
          ))}
        </div>
      </Lab>
      {done >= 3 && (
        <SourceReveal seq="l31-reveal-s15">
          <Rich text="yet = بعد / حتى الآن — في الأسئلة والنفي، وغالبًا في نهاية الجملة." className="block text-center text-sm font-black text-emerald-900" />
          <Rich text={YET_NEGATIVE_31.map((y) => y.en).join(" · ")} className="mt-1 block text-center text-xs font-black text-emerald-800" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑯ الفرق بين already و yet ----------------
function S16_AlreadyYetStep() {
  const [attempted, setAttempted] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="already: حدث الشيء. · yet: نسأل هل حدث أم لا، أو نقول إنه لم يحدث حتى الآن." />
      <Lab emoji="🗂️" label="Already or Yet?" ar="صنّف الجمل الأربع" seq="l31-s16-buckets">
        <SortBuckets
          seq="l31-s16-sort"
          items={ALREADY_VS_YET_31.map((a) => ({ id: a.id, en: a.en, bucket: a.bucket, ar: a.ar }))}
          buckets={[
            { id: "already", label: "✅ already — حدث الشيء", tone: "border-transparent bg-emerald-600 text-white" },
            { id: "yet", label: "⏳ yet — حتى الآن", tone: "border-transparent bg-slate-700 text-white" },
          ]}
          onAllAttempted={setAttempted}
        >
          <SourceReveal seq="l31-reveal-s16">
            <Rich text="already: I have already eaten. · yet: Have you eaten yet? · I haven't eaten yet. — الفرق في جهة السؤال: حدث أم لم يحدث بعد." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </SortBuckets>
      </Lab>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-3">
          <En className="block text-base font-black text-slate-800">already</En>
          <Rich text="حدث الشيء." className="block text-sm font-bold text-slate-600" />
          <En className="mt-1 block text-base font-black text-slate-800">I have already eaten.</En>
          <Rich text="لقد أكلت بالفعل." className="text-xs font-bold text-slate-500" />
        </div>
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-3">
          <En className="block text-base font-black text-slate-800">yet</En>
          <Rich text="نسأل هل حدث أم لا، أو نقول إنه لم يحدث حتى الآن." className="block text-sm font-bold text-slate-600" />
          <En className="mt-1 block text-base font-black text-slate-800">Have you eaten yet?</En>
          <Rich text="هل أكلت بعد؟" className="text-xs font-bold text-slate-500" />
          <En className="mt-1 block text-base font-black text-slate-800">I haven't eaten yet.</En>
          <Rich text="لم آكل بعد." className="text-xs font-bold text-slate-500" />
        </div>
      </div>
      {attempted >= ALREADY_VS_YET_31.length && (
        <div aria-live="polite" className="rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text="أحسنت — لاحظ أن yet تنتمي إلى «لم يحدث بعد»، وalready إلى «حدث بالفعل»." />
        </div>
      )}
    </div>
  );
}

// ---------------- ⑰ رابع استخدام: فترة لم تنتهِ بعد ----------------
function S17_PeriodStep() {
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const seenCount = Object.keys(seen).length;
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="الاستخدام الرابع: فترة زمنية لم تنتهِ بعد — today · this morning · this week · this month · this year." />
      <Lab emoji="📅" label="Open Or Closed?" ar="اختر الفترة وشاهد الزمن يستجيب" seq="l31-s17-period">
        <CueSwitch
          seq="l31-s17-cue"
          allowNone={false}
          cues={[
            { id: "today", label: "today", tense: "Present Perfect", tone: "bg-sky-700 text-white", note: "اليوم لم ينتهِ بعد." },
            { id: "thisweek", label: "this week", tense: "Present Perfect", tone: "bg-sky-700 text-white", note: "الأسبوع ما زال مستمرًا." },
            { id: "thisyear", label: "this year", tense: "Present Perfect", tone: "bg-sky-700 text-white", note: "السنة لم تنتهِ بعد." },
            { id: "lastweek", label: "last week", tense: "Past Simple", tone: "bg-orange-500 text-white", note: "last week انتهت." },
          ]}
          sentence={(cueId) =>
            cueId === "thisweek"
              ? "I have studied a lot this week."
              : cueId === "thisyear"
                ? "We have had many tests this year."
                : cueId === "lastweek"
                  ? "I visited my uncle last week."
                  : "I have drunk three glasses of water today."
          }
          tenseLabel={(cueId) => (cueId === "lastweek" ? "📸 Past Simple" : "🌉 Present Perfect")}
          why={(cueId) =>
            cueId === "lastweek"
              ? "الفترة انتهت: last week → غالبًا Past Simple."
              : cueId === "today"
                ? "اليوم لم ينتهِ بعد → الفترة مرتبطة بالحاضر."
                : cueId === "thisweek"
                  ? "الأسبوع ما زال مستمرًا → الفترة مرتبطة بالحاضر."
                  : "السنة لم تنتهِ بعد → الفترة مرتبطة بالحاضر."
          }
          onCue={(id) => setSeen((s0) => ({ ...s0, [String(id)]: true }))}
        />
      </Lab>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <p className="mb-2 text-sm font-black text-slate-600"><Rich text="الفترات التي تسمح بـ Present Perfect:" /></p>
        <div className="flex flex-wrap gap-2">
          {PERIODS_31.map((p) => (
            <span key={p} className="font-en rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-black text-sky-900" dir="ltr">{p}</span>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PERIOD_EXAMPLES_31.map((p) => (
            <div key={p.en} className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 p-2.5">
              <EnAr en={p.en} ar={p.ar} enClassName="block text-base font-black text-slate-800" arClassName="block text-xs font-bold text-slate-500" />
              <span className="mt-1 inline-block rounded-full bg-white px-2.5 py-0.5 text-[11px] font-black text-sky-700"><Rich text={p.note} /></span>
            </div>
          ))}
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-2.5">
            <EnAr en={PERIODS_CLOSED_31.en} ar={PERIODS_CLOSED_31.ar} enClassName="block text-base font-black text-slate-800" arClassName="block text-xs font-bold text-slate-500" />
            <span className="mt-1 inline-block rounded-full bg-white px-2.5 py-0.5 text-[11px] font-black text-orange-700"><Rich text={PERIODS_CLOSED_31.note} /></span>
          </div>
        </div>
      </div>
      {seenCount >= 3 && (
        <SourceReveal seq="l31-reveal-s17">
          <Rich text="الفترات المفتوحة (today · this morning · this week · this month · this year) تعمل مع Present Perfect — لكن إذا انتهت الفترة الزمنية، غالبًا نستخدم Past Simple." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑱ لا تعتمد على كلمة واحدة فقط ----------------
function S18_TodayStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⚠️" text="هذه قاعدة IQ200: لا تقل «today = Present Perfect دائمًا» — خطأ. المعنى والسياق مهمان." />
      <Lab emoji="🧠" label="One Word Is Not Enough" ar="جملتان بنفس الكلمة… وزمنان مختلفان" seq="l31-s18-today">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stem={TODAY_PAIR_31[0].en}
            stemAr="— ما الذي جعل Present Perfect مناسبًا هنا؟"
            opts={["الفترة ما زالت مرتبطة بالحاضر", "لأن today كلمة ماضية", "لأن الفعل منتهٍ"]}
            answer={0}
            why={TODAY_PAIR_31[0].ar}
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stem={TODAY_PAIR_31[1].en}
            stemAr="— لماذا صار Past Simple مناسبًا هنا رغم وجود today؟"
            opts={["لأننا حددنا حدثًا معينًا ووقتًا معينًا", "لأن today انتهت", "لأن كل الأفعال مع today ماضية"]}
            answer={0}
            why={TODAY_PAIR_31[1].ar}
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      <PlatformPanel title="كيف تحكم على جملة فيها كلمة زمنية؟">
        <ul className="space-y-1.5 text-sm font-semibold leading-relaxed text-slate-700">
          <li>1) اقرأ المعنى المقصود: هل نركز على النتيجة/الخبرة/الاستمرار، أم على حدث منتهٍ بتوقيت محدد؟</li>
          <li><Rich text="2) ابحث عن وقت ماضٍ محدد ومنتهٍ (yesterday · last year · in 2021 · at 9:00 · two days ago) — وجوده يمنع Present Perfect الأساسي." /></li>
          <li>3) تحقق من الصيغة: <En>have/has + V3</En><LatinRuns text={" بلا did وبلا not مع never."} /></li>
        </ul>
      </PlatformPanel>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s18">
          <Rich text="إذن: الكلمة المساعدة مهمة، لكن المعنى أهم — الكلمة وحدها لا تختار الزمن." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑲ for و since ----------------
function S19_ForSinceStep() {
  const [attempted, setAttempted] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="هنا نصل إلى استخدام مهم جدًا: for = مدة زمنية · since = نقطة بداية." />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
          <En className="block text-2xl font-black text-emerald-700">for</En>
          <Rich text="مدة زمنية" className="block text-sm font-black text-slate-600" />
          <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
            {["for two hours", "for three years", "for five days", "for a long time"].map((x) => (
              <En key={x} className="rounded-lg border-2 border-emerald-200 bg-white px-2 py-0.5 text-xs font-black text-emerald-900">{x}</En>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-3 text-center">
          <En className="block text-2xl font-black text-violet-700">since</En>
          <Rich text="نقطة بداية" className="block text-sm font-black text-slate-600" />
          <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
            {["since Monday", "since 2022", "since January", "since 8:00"].map((x) => (
              <En key={x} className="rounded-lg border-2 border-violet-200 bg-white px-2 py-0.5 text-xs font-black text-violet-900">{x}</En>
            ))}
          </div>
        </div>
      </div>
      <Lab emoji="🗂️" label="for or since?" ar="صنّف العبارات الست" seq="l31-s19-classify">
        <SortBuckets
          seq="l31-s19-sort"
          items={FORSINCE_CLASSIFY_31.map((f, i) => ({ id: `fs${i}`, en: f.item, bucket: f.kind, ar: f.ar }))}
          buckets={[
            { id: "for", label: "⏳ for — مدة", tone: "border-transparent bg-emerald-600 text-white" },
            { id: "since", label: "📍 since — نقطة بداية", tone: "border-transparent bg-violet-700 text-white" },
          ]}
          onAllAttempted={setAttempted}
        >
          <SourceReveal seq="l31-reveal-s19">
            <Rich text="قارن: for three years (منذ ثلاث سنوات / لمدة ثلاث سنوات) مقابل since 2023 (منذ عام 2023)." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </SortBuckets>
      </Lab>
      {attempted >= FORSINCE_CLASSIFY_31.length && (
        <div aria-live="polite" className="rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text="قاعدة سريعة: إذا كان ما بعد الكلمة «عدد/مدة» فهي for، وإذا كان «تاريخ/يوم/شهر/لحظة» فهي since." />
        </div>
      )}
    </div>
  );
}

// ---------------- ⑳ Present Perfect + for ----------------
function S20_ForStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧩" text="أربع جمل تقيس مدة زمنية ممتدة حتى اللحظة الحاضرة." />
      <Lab emoji="🔎" label="Find The Duration" ar="المس كل جملة لتكشف المدة وترجمتها" seq="l31-s20-for">
        <RevealCards
          seq="l31-s20-reveals"
          items={FOR_SENTENCES_31.map((f, i) => ({
            id: `for${i}`,
            head: <En className="text-sm font-black text-slate-800">{f.en}</En>,
            body: `${f.ar} — المدة امتدت حتى الآن.`,
            tone: "border-emerald-300 bg-emerald-50",
          }))}
        />
      </Lab>
      <Lab emoji="🧪" label="for Check" ar="سؤالان عن المدة" seq="l31-s20-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stem="I have lived here for five years."
            stemAr="— ما المدة في هذه الجملة؟"
            opts={["five years", "here", "I"]}
            answer={0}
            why="for + خمس سنوات = المدة التي استمرت الحالة."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="لماذا Present Perfect في I have lived here for five years؟"
            opts={["لأن الحالة بدأت في الماضي وما زالت مستمرة", "لأنها انتهت ونعرف متى", "لأن الفعل live فعل ماضٍ"]}
            answer={0}
            why="بدأت في الماضي وما زالت مرتبطة بالحاضر — للمدة والاستمرار."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s20">
          <Rich text="I have lived here for five years. · She has studied English for three years. · They have known each other for a long time. · He has worked here for six months." className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉑ Present Perfect + since ----------------
function S21_SinceStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧩" text="أربع جمل تبدأ من نقطة محددة في الماضي — وهي مستمرة حتى الآن." />
      <Lab emoji="🔗" label="Match The Meaning" ar="طابِق كل جملة مع ترجمتها" seq="l31-s21-since">
        <PairMatch
          seq="l31-s21-match"
          left={SINCE_SENTENCES_31.map((s) => s.en)}
          right={SINCE_SENTENCES_31.map((s) => s.ar)}
          answer={[0, 1, 2, 3]}
        >
          <SourceReveal seq="l31-reveal-s21">
            <Rich text="لاحظ: for → مدة · since → نقطة بداية — ومثال المصدر: We have known him since childhood. (نعرفه منذ الطفولة)." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </PairMatch>
      </Lab>
      <Lab emoji="🧪" label="since Check" ar="سؤال عن نقطة البداية" seq="l31-s21-quiz">
        <McqRow
          n={1}
          stem="We have known him since childhood."
          stemAr="— لماذا since؟"
          opts={["لأن childhood نقطة بداية", "لأن childhood مدة طويلة", "لأن الجملة في المضارع البسيط"]}
          answer={0}
          why="since تحدد النقطة التي بدأت عندها الحالة: childhood."
          onFirstAnswer={() => setDone((d) => d + 1)}
        />
      </Lab>
      {(done >= 1) && (
        <SourceReveal seq="l31-reveal-s21b">
          <Rich text="I have lived here since 2021. · She has studied English since September. · He has worked here since Monday. · We have known him since childhood." className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉒ لماذا Present Perfect هنا؟ ----------------
function S22_ContinuationStep() {
  const cards = [
    { id: "start", head: <Rich text="البداية: الماضي" />, body: "بدأت الحالة قبل الآن: I have lived here…", tone: "border-sky-300 bg-sky-50" },
    { id: "keep", head: <Rich text="الاستمرار: ──────────────→ NOW" />, body: "الحالة لم تتوقف: for five years وما زالت مستمرة.", tone: "border-teal-300 bg-teal-50" },
    { id: "why", head: <Rich text="النتيجة: لماذا Present Perfect؟" />, body: "لأن الحالة بدأت في الماضي وما زالت مرتبطة بالحاضر.", tone: "border-amber-300 bg-amber-50" },
  ];
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="لماذا نستخدم Present Perfect هنا؟ لأن الحالة بدأت في الماضي وما زالت مرتبطة بالحاضر." />
      <Lab emoji="🌉" label="Continuation Track" ar="المس البطاقات ثم انظر إلى المسار كاملًا" seq="l31-s22-track">
        <div className="mb-3">
          <BridgeTrack active="link" />
        </div>
        <RevealCards seq="l31-s22-cards" items={cards} cols={3} />
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {BRIDGE_STEPS_31.map((b) => (
            <button
              key={b.id}
              type="button"
              data-bridge-step={b.id}
              onClick={() => setSeen((s) => ({ ...s, [b.id]: true }))}
              aria-pressed={seen[b.id] === true}
              className={`rounded-2xl border-2 p-3 text-center transition active:scale-[0.99] ${seen[b.id] ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <div className="text-2xl">{b.emoji}</div>
              <Rich text={b.ar} className="mt-1 block text-xs font-black text-slate-700" />
              <En className="mt-0.5 block text-[10px] font-bold text-slate-400">{b.en}</En>
            </button>
          ))}
        </div>
      </Lab>
      {Object.values(seen).filter(Boolean).length >= 3 && (
        <SourceReveal seq="l31-reveal-s22">
          <Rich text="البداية: الماضي · الاستمرار: ──────────────→ NOW · أي: بدأت في الماضي وما زالت مرتبطة بالحاضر." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉓ النفي ----------------
function S23_NegativeStep() {
  const [done, setDone] = useState(0);
  const blanks = NEGATIVE_31.map((n) => {
    const m = n.en.match(/^(.*\b)(haven't|hasn't)(\b.*)$/);
    return {
      n,
      stem: m ? `${m[1]}______${m[3]}` : n.en,
      answer: m && m[2] === "hasn't" ? 1 : 0,
      helper: m ? m[2] : "haven't",
    };
  });
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="القاعدة: Subject + have/has + not + V3 — والاختصارات: have not → haven't · has not → hasn't." />
      <FormulaStrip items={["Subject", "+", "have / has", "+", "not", "+", "V3"]} tone="rose" />
      <Lab emoji="🚫" label="Negative Machine" ar="اختر المساعد الصحيح في كل جملة" seq="l31-s23-negative">
        <div className="space-y-2.5">
          {blanks.map((b, i) => (
            <McqRow
              key={b.n.en}
              n={i + 1}
              stem={b.stem}
              opts={["haven't", "hasn't"]}
              answer={b.answer}
              why={`${b.n.ar} — المساعد الصحيح هنا: ${b.helper} (بحسب الفاعل).`}
              onFirstAnswer={() => setDone((d) => d + 1)}
            />
          ))}
        </div>
      </Lab>
      {done >= NEGATIVE_31.length && (
        <SourceReveal seq="l31-reveal-s23">
          <Rich text="I haven't finished. · She hasn't arrived. · He hasn't eaten. · We haven't decided. · They haven't seen the movie. · The train hasn't arrived." className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉔ الأسئلة Yes/No ----------------
function S24_QuestionStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="نضع Have/Has في بداية السؤال — القاعدة: Have/Has + Subject + V3?" />
      <FormulaStrip items={["Have / Has", "+", "Subject", "+", "V3?"]} />
      <Lab emoji="👆" label="Build The Question" ar="ابنِ السؤال بلمس الكلمات" seq="l31-s24-questions">
        <TapOrder
          seq="l31-s24-order"
          items={["arrived?", "the teacher", "Has"]}
          expected={[2, 1, 0]}
          whys={["Has = المساعد في البداية (the teacher مفرد)", "the teacher = الفاعل", "arrived? = V3 للفعل arrive"]}
        />
      </Lab>
      <Lab emoji="🔗" label="Question Match" ar="طابِق كل سؤال مع معناه" seq="l31-s24-match">
        <PairMatch
          seq="l31-s24-pairs"
          left={YESNO_31.slice(0, 4).map((y) => y.en)}
          right={YESNO_31.slice(0, 4).map((y) => y.ar)}
          answer={[0, 1, 2, 3]}
        />
      </Lab>
      <Lab emoji="🧪" label="Question Check" ar="سؤالان سريعان" seq="l31-s24-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="أي سؤال صحيح؟"
            opts={["Have she arrived?", "Has she arrived?", "Does she has arrived?"]}
            answer={1}
            why="She → Has في بداية السؤال، والمساعد الوحيد المسموح هو Has."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stem="Have you finished?"
            stemAr="— ما ترتيب هذه الجملة؟"
            opts={["Have/Has + Subject + V3", "Subject + Have + V3", "Did + Subject + V3"]}
            answer={0}
            why="سؤال Present Perfect يبدأ بالمساعد ثم الفاعل ثم V3."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s24">
          <Rich text="Have you finished? · Has she arrived? · Has he eaten? · Have they left? · Have we met before? · Has the teacher arrived?" className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉕ الإجابات القصيرة ----------------
function S25_ShortStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="الإجابة القصيرة تعيد المساعد نفسه: Yes, she has. · No, she hasn't." />
      <Lab emoji="🔗" label="Short Answers" ar="طابِق كل سؤال مع إجابته القصيرة" seq="l31-s25-match">
        <PairMatch
          seq="l31-s25-pairs"
          left={SHORT_ANSWERS_31.map((s) => s.q)}
          right={["Yes, I have.", "Yes, she has.", "Yes, they have.", "Yes, he has."]}
          answer={[0, 1, 2, 3]}
        >
          <SourceReveal seq="l31-reveal-s25">
            <Rich text="Have you finished? → Yes, I have. / No, I haven't. · Has she arrived? → Yes, she has. / No, she hasn't. · Have they eaten? → Yes, they have. / No, they haven't. · Has he seen this movie? → Yes, he has. / No, he hasn't." className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </PairMatch>
      </Lab>
      <PlatformPanel title="لماذا لا نقول Yes, I finished؟">
        <Rich text="لأن الإجابة القصيرة في الإنجليزية تعيد المساعد الذي بدأ السؤال — والسؤال بدأ بـ Have، فتعود الإجابة بـ have. أما استخدام فعل آخر فيكسر الرابط بين السؤال والجواب." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ㉖ Wh Questions ----------------
function S26_WhStep() {
  const [done, setDone] = useState(0);
  const quiz = [
    { ar: "ماذا فعلت؟", opts: ["Where has she gone?", "What have you done?", "Why have they left?"], answer: 1, why: "What تسأل عن الشيء: ماذا فعلت؟" },
    { ar: "إلى أين ذهبت؟", opts: ["Who has taken my notebook?", "How many books have you read?", "Where has she gone?"], answer: 2, why: "Where تسأل عن المكان: إلى أين ذهبت؟" },
    { ar: "من أخذ دفتري؟", opts: ["Who has taken my notebook?", "What have you done?", "How long have you lived here?"], answer: 0, why: "Who تسأل عن الفاعل: من أخذ؟" },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="يمكننا استخدام: What · Where · Why · Who · How many · How long — ثم نفس التركيب." />
      <div className="flex flex-wrap justify-center gap-2">
        {WH_31.map((w) => (
          <span key={w.wh} className="font-en rounded-xl border-2 border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-black text-indigo-900" dir="ltr">{w.wh}</span>
        ))}
      </div>
      <Lab emoji="🧪" label="Wh Lab" ar="اختر السؤال المطابق للمعنى" seq="l31-s26-wh">
        <div className="space-y-2.5">
          {quiz.map((q, i) => (
            <McqRow key={q.ar} n={i + 1} stemAr={q.ar} opts={q.opts} answer={q.answer} why={q.why} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      <Lab emoji="🗂️" label="All Six" ar="المس كل سؤال لتكشف معناه" seq="l31-s26-cards">
        <RevealCards
          seq="l31-s26-reveals"
          items={WH_31.map((w, i) => ({ id: `wh${i}`, head: <En className="text-sm font-black text-slate-800">{w.en}</En>, body: w.ar, tone: "border-indigo-300 bg-indigo-50" }))}
        />
      </Lab>
      {done >= 3 && (
        <SourceReveal seq="l31-reveal-s26">
          <Rich text="التركيب نفسه في كل الأسئلة: أداة السؤال + Have/Has + Subject + V3 — What have you done? · Where has she gone? · Why have they left? · Who has taken my notebook? · How many books have you read? · How long have you lived here?" className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉗ How long؟ ----------------
function S27_HowLongStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="How long = منذ متى / كم من الوقت؟ — والإجابة: for + مدة، أو since + بداية." />
      <Lab emoji="👆" label="Build How Long" ar="ابنِ السؤال بلمس الكلمات" seq="l31-s27-howlong">
        <TapOrder
          seq="l31-s27-order"
          items={["lived here?", "How long", "you", "have"]}
          expected={[1, 3, 2, 0]}
          whys={["How long = أداة السؤال (منذ متى / كم من الوقت)", "have = المساعد", "you = الفاعل", "lived here? = V3 + التكملة"]}
        />
      </Lab>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-3">
          <EnAr en={HOWLONG_31.forAnswer} ar="for six years — مدة." enClassName="block text-base font-black text-slate-800" arClassName="text-xs font-bold text-slate-600" />
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-3">
          <EnAr en={HOWLONG_31.sinceAnswer} ar="since 2020 — نقطة بداية." enClassName="block text-base font-black text-slate-800" arClassName="text-xs font-bold text-slate-600" />
        </div>
      </div>
      <Lab emoji="🧪" label="How Long Check" ar="سؤالان عن الإجابة" seq="l31-s27-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stem={HOWLONG_31.en}
            stemAr="— ما معنى this question؟"
            opts={["منذ متى وأنت تعيش هنا؟", "إلى أين ستذهب؟", "كم عمرك؟"]}
            answer={0}
            why="How long تسأل عن المدة أو نقطة البداية."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="أي إجابة تستخدم for بشكل صحيح؟"
            opts={["I have lived here for six years.", "I have lived here for 2020.", "I live here for six years."]}
            answer={0}
            why="for + مدة (six years) — وليست نقطة بداية، مع Present Perfect."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s27">
          <Rich text="How long + Present Perfect — ثم: for + مدة · since + بداية." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉘ المقارنة الأكبر ----------------
function S28_BigCompareStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="⚔️" text="هذه أهم مقارنة في الدرس: Past Simple يسأل «متى؟» وPresent Perfect يجيب «هل سبق؟»." />
      <div className="grid gap-2 sm:grid-cols-2">
        {COMPARE_31.map((c) => (
          <div key={c.tense} className={`rounded-3xl border-2 p-3 ${c.tense === "Past Simple" ? "border-orange-200 bg-orange-50" : "border-sky-200 bg-sky-50"}`}>
            <span className={`rounded-xl px-2.5 py-0.5 text-[11px] font-black text-white ${c.tense === "Past Simple" ? "bg-orange-500" : "bg-sky-700"}`}><En>{c.tense}</En></span>
            <EnAr en={c.en} ar={c.ar} enClassName="mt-2 block text-base font-black text-slate-800" arClassName="mt-0.5 block text-xs font-bold text-slate-500" />
            <div className="mt-1.5 space-y-1">
              <Rich text={`يركز على: ${c.focus}`} className="block text-xs font-black text-slate-700" />
              {c.extra && <Rich text={c.extra} className="block text-xs font-bold text-slate-500" />}
              <div className="rounded-xl bg-white px-2.5 py-1.5">
                <Rich text={c.probe} className="text-xs font-black text-slate-700" /> → <Rich text={c.probeAnswer} className="text-xs font-bold text-slate-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Lab emoji="⚔️" label="Compare Lab" ar="سؤالان يكشفان الفرق" seq="l31-s28-compare">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="أي جملة تخبرنا «متى حدث الأمر»؟"
            opts={["I watched that movie last night.", "I have watched that movie."]}
            answer={0}
            why="last night وقت محدد ومنتهٍ → Past Simple، والجملة تجيب على «متى؟»."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="وأي جملة تجيب على «هل شاهدته من قبل؟»"
            opts={["I watched that movie last night.", "I have watched that movie."]}
            answer={1}
            why="Present Perfect يتحدث عن التجربة: نعم، شاهدته من قبل."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s28">
          <Rich text="I watched that movie last night. → متى؟ last night. · I have watched that movie. → هل شاهدته من قبل؟ نعم." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉙ المقارنة الثلاثية ----------------
function S29_TripleStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="هنا نرفع المستوى: نفس الحدث (المتحف) بثلاث زوايا زمنية مختلفة." />
      <Lab emoji="🔗" label="Three Lenses" ar="طابِق كل جملة مع زمنها وسببها" seq="l31-s29-triple">
        <PairMatch
          seq="l31-s29-match"
          left={TRIPLE_31.map((t) => t.en)}
          right={TRIPLE_31.map((t) => `${t.tense} — ${t.why}`)}
          answer={[0, 1, 2]}
        >
          <SourceReveal seq="l31-reveal-s29">
            <Rich text="إذن: Past Simple = حدث ماضٍ · Present Perfect = ماضٍ مرتبط بالحاضر · Past Perfect = ماضٍ حدث قبل ماضٍ آخر." className="block text-center text-sm font-black text-emerald-900" />
          </SourceReveal>
        </PairMatch>
      </Lab>
      <div className="grid gap-2 sm:grid-cols-3">
        {TRIPLE_RULES_31.map((r) => (
          <div key={r.tense} className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
            <EnAr en={r.tense} ar={r.rule} enClassName="block text-sm font-black text-slate-800" arClassName="mt-1 block text-xs font-bold text-slate-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- ㉚ خط زمني خارق ----------------
function S30_TimelineStep() {
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(0);
  const allNodes = TIMELINE_NODES_31.every((n) => seen[n.key]);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="تخيل الخط الزمني: نقطة X قبل الآن في Present Perfect… ونقطتان X وY في Past Perfect مقابل Past Simple." />
      <Lab emoji="📐" label="Source Diagrams" ar="رسوم المصدر كما وردت — مرجع لا تخمين" seq="l31-s30-timeline">
        <div className="grid gap-2 sm:grid-cols-2">
          {DIAGRAMS_31.map((d) => (
            <div key={d.id} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
              <p className="text-xs font-black text-slate-600"><Rich text={d.label} /></p>
              <pre dir="ltr" className="font-en ltr mt-2 overflow-x-auto rounded-xl bg-slate-900 p-2.5 text-[11px] font-bold leading-relaxed text-white">{d.art.join("\n")}</pre>
              <Rich text={d.caption} className="mt-2 block text-xs font-bold text-slate-600" />
              <span className="mt-1 inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-black text-amber-900"><Rich text={d.reference} /></span>
            </div>
          ))}
        </div>
      </Lab>
      <Lab emoji="👆" label="Tap The Nodes" ar="المس كل عقدة لتعرف زمنها" seq="l31-s30-nodes">
        <div className="grid gap-2 sm:grid-cols-2">
          {TIMELINE_NODES_31.map((n) => (
            <button
              key={n.key}
              type="button"
              data-timeline-node={n.key}
              aria-pressed={seen[n.key] === true}
              onClick={() => setSeen((s) => ({ ...s, [n.key]: true }))}
              className={`rounded-2xl border-2 p-3 text-right transition active:scale-[0.99] ${seen[n.key] ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <En className="block text-base font-black text-slate-800">{n.en}</En>
              {seen[n.key] && (
                <div className="mt-1.5 space-y-1">
                  <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center gap-2"><span className="inline-block rounded-xl bg-violet-700 px-2.5 py-0.5 text-xs font-black text-white"><En>{n.tense}</En></span><span dir="rtl"><Rich text={n.ar} className="block text-xs font-bold text-slate-600" /></span></span>
                </div>
              )}
            </button>
          ))}
        </div>
      </Lab>
      <Lab emoji="🧪" label="Timeline Check" ar="سؤال عن ترتيب الأحداث" seq="l31-s30-quiz">
        <McqRow
          n={1}
          stem="The movie had started before we arrived."
          stemAr="— أي حدث وقع أولًا؟"
          opts={["بدء الفيلم", "وصولنا", "كلاهما في الوقت نفسه"]}
          answer={0}
          why="had started = Past Perfect للحدث الأقدم، ثم arrived = Past Simple للحدث الأحدث."
          onFirstAnswer={() => setDone((d) => d + 1)}
        />
      </Lab>
      {allNodes && done >= 1 && (
        <SourceReveal seq="l31-reveal-s30">
          <Rich text="الفيلم بدأ أولًا… ثم وصلنا — وهذا هو ترتيب X (Past Perfect) قبل Y (Past Simple) على خط الزمن." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉛–㉞ الأخطاء الأربعة الشهيرة ----------------
function FamousErrorStep({ index, extra }: { index: number; extra: (onFirst: () => void) => ReactNode }) {
  const err = FAMOUS_ERRORS_31[index];
  const [done, setDone] = useState(0);
  const [fixed, setFixed] = useState(false);
  return (
    <div className="space-y-4">
      <Note emoji="🚨" text={`الخطأ رقم ${index + 1}: جملة تبدو مألوفة… لكن فيها خلل واحد.`} />
      <Lab emoji="🩺" label="Fix It" ar="خطوتان: المس الخطأ ثم اختر التصحيح" seq={`l31-s${err.n}-fix`}>
        <TwoStepFix
          n={1}
          segments={err.wrongSegments}
          bad={err.bad}
          fixOpts={err.fixOpts}
          fixAnswer={err.fixAnswer}
          why={err.why}
          note={err.sourceNote}
          fixed={err.corrected}
          onDone={() => setFixed(true)}
        />
      </Lab>
      <Lab emoji="🧪" label="Quick Check" ar="أجب — التغذية فورية" seq={`l31-s${err.n}-quiz`}>
        {extra(() => setDone((d) => d + 1))}
      </Lab>
      {fixed && done >= 1 && (
        <SourceReveal seq={`l31-reveal-s${err.n}`}>
          <Rich text={`${err.wrongSegments.join(" ")} ❌ → ${err.corrected} ✅`} className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

function S31_FamousStep() {
  return (
    <FamousErrorStep
      index={0}
      extra={(onFirst) => (
        <McqRow
          n={1}
          stem="I have seen him before."
          stemAr="— هل هذه الجملة صحيحة؟"
          opts={["صحيحة", "خاطئة"]}
          answer={0}
          why="صحيحة لأننا لم نحدد وقتًا معينًا — تجربة في الحياة."
          onFirstAnswer={onFirst}
        />
      )}
    />
  );
}

function S32_FamousStep() {
  return (
    <FamousErrorStep
      index={1}
      extra={(onFirst) => (
        <McqRow
          n={1}
          stemAr="ما الذي يكسر الجملة She has went home؟"
          opts={["has مع she", "went بعد has — والمطلوب V3 وهو gone", "home في النهاية"]}
          answer={1}
          why="go → went → gone: بعد has نستخدم gone لا went."
          onFirstAnswer={onFirst}
        />
      )}
    />
  );
}

function S33_FamousStep() {
  return (
    <FamousErrorStep
      index={2}
      extra={(onFirst) => (
        <McqRow
          n={1}
          stemAr="لماذا لا نستخدم did مع Present Perfect؟"
          opts={["لأن Present Perfect له مساعده الخاص: have/has", "لأن did للسؤال فقط", "لأن العبارة طويلة"]}
          answer={0}
          why="المساعد في Present Perfect هو have/has — ولا يشاركه did في الجملة الواحدة."
          onFirstAnswer={onFirst}
        />
      )}
    />
  );
}

function S34_FamousStep() {
  return (
    <FamousErrorStep
      index={3}
      extra={(onFirst) => (
        <McqRow
          n={1}
          stemAr="أي صيغة تنتمي إلى Present Perfect؟"
          opts={["doesn't + V1", "hasn't + V3", "didn't + V1"]}
          answer={1}
          why="النفي الصحيح: hasn't + V3 → He hasn't finished."
          onFirstAnswer={onFirst}
        />
      )}
    />
  );
}

// ---------------- ㉟ Grammar Detective — ثمانية أخطاء ----------------
function S35_DetectiveStep() {
  const [fixedCount, setFixedCount] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🕵️" text="اكتشف الخطأ وصححه — فكر قبل أن تنظر للحلول: ثماني جمل، وثمانية تصحيحات من المصدر." />
      <Lab emoji="🕵️" label="Detective Eight" ar="لكل جملة خطوتان: أين الخطأ؟ وما الإصلاح؟" seq="l31-s35-detect">
        <div className="space-y-2.5">
          {DETECTIVE_31.map((d) => (
            <TwoStepFix
              key={d.n}
              n={d.n}
              segments={d.segments}
              bad={d.bad}
              fixOpts={d.fixOpts}
              fixAnswer={d.fixAnswer}
              why={d.why}
              fixed={d.right}
              onDone={() => setFixedCount((c) => c + 1)}
            />
          ))}
        </div>
      </Lab>
      <div aria-live="polite" className="rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
        <Rich text={`أكملت ${Math.min(fixedCount, DETECTIVE_31.length)} من ${DETECTIVE_31.length} تصحيحات`} />
      </div>
      {fixedCount >= DETECTIVE_31.length && (
        <SourceReveal seq="l31-reveal-s35">
          <div className="space-y-1 text-sm font-bold leading-relaxed text-emerald-900">
            <Rich text={DETECTIVE_31.slice(0, 4).map((d) => `${ARABIC_ORD_31[d.n] ?? d.n} ${d.right}`).join(" · ")} />
            <Rich text={DETECTIVE_31.slice(4).map((d) => `${ARABIC_ORD_31[d.n] ?? d.n} ${d.right}`).join(" · ")} />
          </div>
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊱ تحدي الاختيار الذكي ----------------
function S36_SmartStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="اختر Present Perfect أو Past Simple — انظر إلى الكلمة الحاسمة في كل جملة." />
      <Lab emoji="🧠" label="Smart Choice" ar="ثمانية أزواج — المعنى يحسم" seq="l31-s36-smart">
        <div className="space-y-2.5">
          {SMART_31.map((q) => (
            <McqRow
              key={q.n}
              n={q.n}
              stem={q.prompt}
              context={q.ar}
              opts={q.opts}
              answer={q.answer}
              why={q.why}
              onFirstAnswer={() => setDone((d) => d + 1)}
            />
          ))}
        </div>
      </Lab>
      {done >= SMART_31.length && (
        <SourceReveal seq="l31-reveal-s36">
          <Rich text={`الحلول: ${SMART_31.map((q, i) => `${i + 1}) ${q.opts[q.answer]}`).join(" · ")} — لاحظ كيف تغيّر المعنى بتغيّر الكلمة الحاسمة.`} className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊲ IQ200 — زوايا النظر ----------------
function S37_IQStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="قارن زوجين فقط… وسيتغير فهمك: النتيجة الآن أم خبر ماضٍ؟" />
      {IQ_PAIRS_31.map((pair, pi) => (
        <Lab key={pair.id} emoji="🔎" label={pi === 0 ? "Maya" : "Daniel"} ar="المس كل جملة لتكشف قراءتها" seq={`l31-s37-${pair.id}`}>
          <RevealCards
            seq={`l31-s37-cards-${pair.id}`}
            items={[
              { id: `${pair.id}-a`, head: <En className="text-sm font-black text-slate-800">A: {pair.a.en}</En>, body: pair.a.read, tone: "border-slate-300 bg-slate-50" },
              { id: `${pair.id}-b`, head: <En className="text-sm font-black text-slate-800">B: {pair.b.en}</En>, body: pair.b.read, tone: "border-sky-300 bg-sky-50" },
            ]}
          />
        </Lab>
      ))}
      <Lab emoji="🧪" label="Angle Of View" ar="سؤالان — كل إجابة تشرح زاوية النظر" seq="l31-s37-quiz">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr="أي الجملتين تعني أن جواز السفر ما زال مفقودًا الآن؟"
            opts={["Maya lost her passport.", "Maya has lost her passport."]}
            answer={1}
            why="هناك نتيجة مهمة الآن — ربما جواز السفر ما زال مفقودًا."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="Daniel has gone to the library. — ما الذي تعنيه غالبًا؟"
            opts={["هو موجود هناك الآن أو لم يعد بعد", "ذهب أمس وانتهى الأمر", "سيذهب قريبًا"]}
            answer={0}
            why="has gone = ذهب، وهناك علاقة بالحاضر."
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s37">
          <Rich text={IQ_ANGLE_NOTE_31} className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊳ تحدي أعمق — الطائرة ----------------
function S38_DeeperStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="اختر الجملة الأنسب حسب المعنى — الموقف: صديقك يسألك «هل سبق أن ركبت طائرة؟»" />
      <Lab emoji="✈️" label="The Plane Question" ar="اختر ثم اقرأ التعليل" seq="l31-s38-deeper">
        <div className="space-y-2.5">
          <McqRow
            n={1}
            stemAr={`الموقف: ${DEEPER_31.situation}`}
            opts={["I have flown on a plane.", "I flew on a plane in 2022."]}
            answer={0}
            why={DEEPER_31.best.why}
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
          <McqRow
            n={2}
            stemAr="وهل الجملة الأخرى صحيحة؟"
            opts={["نعم، لكنها تتحدث عن حدث محدد في عام 2022", "لا، هي خطأ دائمًا"]}
            answer={0}
            why={`${DEEPER_31.also.en} — ${DEEPER_31.also.why}`}
            onFirstAnswer={() => setDone((d) => d + 1)}
          />
        </div>
      </Lab>
      {done >= 2 && (
        <SourceReveal seq="l31-reveal-s38">
          <Rich text={DEEPER_31.close} className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊴ Boss Challenge — قصة Lina ----------------
function S39_BossLinaStep() {
  const [done, setDone] = useState(0);
  const [solved, setSolved] = useState(0);
  const attempt = () => setDone((d) => d + 1);
  return (
    <div className="space-y-4">
      <Note emoji="🏆" text="اقرأ النص ثم حدّد زمن كل فعل — انتبه إلى last year و this year." />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">{BOSS_LINA_TEXT_31}</En>
      </div>
      <Lab emoji="🏆" label="Boss Challenge" ar="ستة أفعال — لكل فعل زمن واحد" seq="l31-s39-boss">
        <div className="space-y-2">
          {BOSS_LINA_VERBS_31.map((v, i) => (
            <BossVerbPicker key={v.verb} item={v} index={i} onPick={(ok) => { attempt(); if (ok) setSolved((s) => s + 1); }} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-600">
          <span aria-live="polite"><Rich text={`محلولة صحيحة: ${solved}/${BOSS_LINA_VERBS_31.length}`} /></span>
          <span><Rich text={`محاولات: ${done}`} /></span>
        </div>
      </Lab>
      <div className="grid gap-2 sm:grid-cols-2">
        {BOSS_LINA_REASON_31.map((r) => (
          <div key={r.cue} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            <EnAr en={r.cue} ar={r.note} enClassName="block text-sm font-black text-slate-800" arClassName="block text-xs font-bold text-slate-600" />
          </div>
        ))}
      </div>
      {solved >= BOSS_LINA_VERBS_31.length && (
        <SourceReveal seq="l31-reveal-s39">
          <Rich text="has always loved · has visited · has recently started → Present Perfect · joined · built → Past Simple · has already completed → Present Perfect. السبب: last year فترة ماضية منتهية، أما this year فالفترة ما زالت مرتبطة بالحاضر." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

function BossVerbPicker({ item, index, onPick }: { item: { verb: string; tense: string; ar: string }; index: number; onPick: (ok: boolean) => void }) {
  const [pick, setPick] = useState<string | null>(null);
  const right = pick === item.tense;
  const opts = ["Present Perfect", "Past Simple"];
  return (
    <div data-boss-verb={index} className={`rounded-2xl border-2 p-3 transition ${pick === null ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Nub n={index + 1} className="bg-sky-700" />
        <En className="rounded-xl bg-slate-900 px-3 py-1.5 text-base font-black text-white">{item.verb}</En>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o}
            type="button"
            data-boss-pick={`${index}:${o}`}
            onClick={() => { if (pick === item.tense) return; setPick(o); onPick(o === item.tense); }}
            className={`font-en rounded-xl border-2 px-3.5 py-1.5 text-sm font-black transition active:scale-95 ${
              pick === o ? (o === item.tense ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
            }`}
          >
            <LatinRuns text={o} />
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className={`mt-1.5 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
          {right ? <span className="tada inline-block">✓ <Rich text={item.ar} /></span> : <span>✕ الزمن الصحيح: <EnAr en={item.tense} sep="—" ar={item.ar} /></span>}
        </div>
      )}
    </div>
  );
}

// ---------------- ㊵ IQ200 — حوّل الجملة ----------------
function S40_TransformStep() {
  const tokens = ["I", "visited", "Japan", "in 2021."];
  const [removed, setRemoved] = useState<number[]>([]);
  const [pick, setPick] = useState<number | null>(null);
  const removeDone = removed.length === 1 && removed[0] === 3;
  const candidates = ["I have visited Japan.", "I have visited Japan in 2021.", "I visit Japan."];
  const pickOk = pick === 0;
  return (
    <div className="space-y-4">
      <Note emoji="🚀" text="الجملة: I visited Japan in 2021. — حوّلها إلى Present Perfect، مع تغيير المعنى بشكل صحيح." />
      <Lab emoji="✂️" label="Remove The Cue" ar="الخطوة الأولى: المس الجزء الذي يجب حذفه قبل التحويل" seq="l31-s40-transform">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
          {tokens.map((t, i) => {
            const gone = removed.includes(i);
            return (
              <button
                key={i}
                type="button"
                data-transform-token={i}
                disabled={gone}
                onClick={() => setRemoved((r) => (r.includes(i) ? r : [...r, i]))}
                className={`font-en rounded-xl border-2 px-3.5 py-2 text-base font-black transition active:scale-95 ${
                  gone ? "border-slate-100 bg-slate-50 text-slate-300 line-through" : "border-slate-200 bg-white text-slate-800 hover:border-sky-300"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
        {removed.length > 0 && (
          <div className={`mt-2 rounded-2xl border-2 p-2.5 text-sm font-bold ${removeDone ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
            {removeDone ? <span className="tada inline-block">✓ <Rich text="أحسنت — in 2021 وقت ماضٍ محدد ومنتهٍ، ولا يصلح مع Present Perfect." /></span> : <span>✕ <Rich text="الجزء المحذوف ليس هو الحاسم — ابحث عن الوقت الماضي المحدد والمنتهي." /></span>}
          </div>
        )}
        {removed.length > 0 && !removeDone && (
          <button type="button" onClick={() => setRemoved([])} className="mt-2 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 hover:bg-slate-200">
            <Rich text="↺ إعادة المحاولة" />
          </button>
        )}
      </Lab>
      {removeDone && (
        <Lab emoji="🎯" label="Choose The Transformation" ar="الخطوة الثانية: اختر الجملة النهائية" seq="l31-s40-choose">
          <div className="flex flex-wrap gap-2">
            {candidates.map((c, i) => (
              <button
                key={c}
                type="button"
                data-transform-pick={i}
                onClick={() => setPick(i)}
                className={`font-en rounded-xl border-2 px-3.5 py-2 font-bold transition active:scale-95 ${
                  pick === i ? (i === 0 ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {pick !== null && (
            <div className={`mt-2 text-sm font-bold ${pickOk ? "text-emerald-700" : "text-rose-600"}`}>
              {pickOk ? <span className="tada inline-block">✓ <Rich text={TRANSFORM_31.why} /></span> : <span>✕ <Rich text="أعد النظر: يجب أن يبقى المعنى «خبرة» وأن يختفي الوقت المحدد." /></span>}
            </div>
          )}
        </Lab>
      )}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-3">
        <p className="text-sm font-black text-slate-800"><Rich text="عبارات لا تصلح مع Present Perfect الأساسي:" /></p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {TRANSFORM_31.banned.map((b) => (
            <En key={b} className="rounded-xl border-2 border-rose-200 bg-white px-3 py-1 text-sm font-black text-rose-800">{b}</En>
          ))}
        </div>
      </div>
      {pickOk && (
        <SourceReveal seq="l31-reveal-s40">
          <Rich text="الإجابة: I have visited Japan. — لقد حذفنا in 2021." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊶ تحدي for / since ----------------
function S41_ForSinceStep() {
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});
  const [correct, setCorrect] = useState<Record<number, boolean>>({});
  const count = Object.values(attempted).filter(Boolean).length;
  const allCorrect = FORSINCE_ITEMS_31.every((it) => correct[it.n]);
  return (
    <div className="space-y-4">
      <Note emoji="🧩" text="خمس جمل… اختر الكلمة الصحيحة في كل واحدة — والقاعدة: for + مدة · since + بداية." />
      <Lab emoji="🧩" label="for or since" ar="اختر بلمسة — التصحيح فوري" seq="l31-s41-forsince">
        <div className="space-y-2">
          {FORSINCE_ITEMS_31.map((it) => (
            <div key={it.n} data-fs-item={it.n} className={`rounded-2xl border-2 p-3 transition ${correct[it.n] ? "border-emerald-300 bg-emerald-50/60" : attempted[it.n] ? "border-rose-300 bg-rose-50/60" : "border-slate-200 bg-white"}`}>
              <div className="flex flex-wrap items-center gap-2">
                <Nub n={it.n} className="bg-sky-700" />
                <En className="text-base font-black text-slate-800">{it.en}</En>
              </div>
              <div className="mt-2 flex gap-2">
                {["for", "since"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    data-fs-pick={`${it.n}:${opt}`}
                    onClick={() => { setAttempted((a) => ({ ...a, [it.n]: true })); setCorrect((c) => ({ ...c, [it.n]: opt === it.answer })); }}
                    className={`font-en rounded-xl border-2 px-4 py-1.5 text-sm font-black transition active:scale-95 ${
                      correct[it.n] && opt === it.answer
                        ? "border-transparent bg-emerald-600 text-white"
                        : attempted[it.n] && opt === it.answer
                          ? "border-transparent bg-emerald-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {attempted[it.n] && (
                <div className={`mt-1.5 text-sm font-bold ${correct[it.n] ? "text-emerald-700" : "text-rose-600"}`}>
                  {correct[it.n] ? <span className="tada inline-block">✓ <Rich text={it.why} /></span> : <span>✕ الصحيح: <EnAr en={it.answer} sep="—" ar={it.why} enClassName="font-black" /></span>}
                </div>
              )}
            </div>
          ))}
        </div>
        <div aria-live="polite" className="mt-2 rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text={`حاولت ${count} من ${FORSINCE_ITEMS_31.length} · الصحيح حتى الآن: ${Object.values(correct).filter(Boolean).length}`} />
        </div>
      </Lab>
      {allCorrect && (
        <SourceReveal seq="l31-reveal-s41">
          <Rich text={`الحلول: ${FORSINCE_ITEMS_31.map((it, i) => `${i + 1}) ${it.answer}`).join(" · ")} — قاعدة الذهب: for + مدة · since + بداية.`} className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊷ التحدي النهائي — اكتب عن نفسك ----------------
function S42_FinalChallengeStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="أكمل الجمل — اكتب إجابات حقيقية من عندك. هنا أنت لا تحفظ القاعدة فقط… أنت تبدأ باستخدامها." />
      <Lab emoji="✍️" label="Real Answers Arena" ar="المحلل يتحقق من النمط أثناء كتابتك" seq="l31-s42-write">
        <WriteArena seq="l31-s42-arena" starters={STARTERS_31} />
      </Lab>
      <PlatformPanel title="كيف تراجع جملتك بنفسك؟">
        <ul className="space-y-1.5 text-sm font-semibold leading-relaxed text-slate-700">
          <li>1) هل المساعد مناسب للفاعل؟ (<En>I have</En> — <En>she has</En>)</li>
          <li><LatinRuns text={"2) هل الفعل بصيغة V3 بعد المساعد؟ (finished · gone · eaten)"} /></li>
          <li>3) هل موضع الكلمة الرابطة صحيح؟ (<En>have + already/just + V3</En> · <En>yet</En> في النهاية)</li>
          <li><LatinRuns text={"4) هل تجنّبت وقتًا ماضيًا محددًا ومنتهيًا (yesterday · last year · in 2021)؟"} /></li>
        </ul>
      </PlatformPanel>
    </div>
  );
}

// ---------------- ㊸ Final Boss — أربع جمل، أربعة معانٍ ----------------
function S43_FinalBossStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🏆" text="القارن النهائي: أربع جمل لنفس الحدث… وأربعة أزمنة مختلفة." />
      <Lab emoji="🏆" label="Final Boss" ar="طابِق كل جملة مع زمنها ومعناها" seq="l31-s43-boss4">
        <PairMatch
          seq="l31-s43-match"
          left={FINAL_BOSS_31.map((f) => f.en)}
          right={[3, 0, 2, 1].map((k) => `${FINAL_BOSS_31[k].tense} — ${FINAL_BOSS_31[k].ar}`)}
          answer={[3, 0, 2, 1]}
        >
          <SourceReveal seq="l31-reveal-s43">
            <Rich text="لاحظ كيف أصبحت الأزمنة الآن نظامًا واحدًا: Past Simple · Past Continuous · Past Perfect · Present Perfect." className="block text-center text-sm font-black text-emerald-900" />
          </SourceReveal>
        </PairMatch>
      </Lab>
      <div className="grid gap-2 sm:grid-cols-2">
        {FINAL_BOSS_31.map((f) => (
          <div key={f.en} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            <En className="block text-base font-black text-slate-800">{f.en}</En>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span dir="ltr" className="ltr-pair inline-flex flex-wrap items-center gap-2"><span className="rounded-xl bg-slate-900 px-2.5 py-0.5 text-[11px] font-black text-white"><En>{f.tense}</En></span><span dir="rtl"><Rich text={f.ar} className="text-xs font-bold text-slate-600" /></span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- ㊹ الخريطة الكبرى ----------------
function S44_BigMapStep() {
  const [lens, setLens] = useState<string>("present");
  const [seenAll, setSeenAll] = useState<Record<string, boolean>>({ present: true });
  const active = BIG_MAP_31.find((b) => b.id === lens) ?? BIG_MAP_31[3];
  const count = Object.values(seenAll).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="الخريطة الكبرى التي يجب أن تحفظها: أربع عدسات… والنظام واحد." />
      <Lab emoji="🗺️" label="Big Map" ar="بدّل العدسة لتراجع كل زمن ومثاله" seq="l31-s44-map">
        <div className="flex flex-wrap justify-center gap-2">
          {BIG_MAP_31.map((b) => (
            <button
              key={b.id}
              type="button"
              data-lens={b.id}
              aria-pressed={lens === b.id}
              onClick={() => { setLens(b.id); setSeenAll((s) => ({ ...s, [b.id]: true })); }}
              className={`inline-flex items-center gap-1.5 rounded-xl border-2 px-3 py-1.5 text-sm font-black transition active:scale-95 ${
                lens === b.id ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              <span aria-hidden>{b.emoji}</span>
              <En>{b.tense}</En>
            </button>
          ))}
        </div>
        <div key={lens} className="tada mt-3 rounded-2xl border-2 border-slate-200 bg-white p-4 text-center">
          <div className="text-3xl">{active.emoji}</div>
          <Rich text={active.ar} className="mt-1 block text-base font-black text-slate-800" />
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mx-auto mt-2 max-w-xl rounded-xl bg-slate-900 p-3">
            <En className="text-base font-black text-white md:text-lg">{active.en}</En>
          </div>
          <En className="mt-1 block text-xs font-bold text-slate-400">{active.tense}</En>
        </div>
        <div aria-live="polite" className="mt-2 text-center text-xs font-black text-slate-500">
          <Rich text={`راجعت ${count}/4 عدسات`} />
        </div>
      </Lab>
      {count >= BIG_MAP_31.length && (
        <SourceReveal seq="l31-reveal-s44">
          <Rich text="📸 Past Simple: حدث ماضٍ انتهى. · 🎥 Past Continuous: شيء كان يحدث في لحظة ماضية. · ⏪ Past Perfect: شيء حدث قبل حدث ماضٍ آخر. · 🌉 Present Perfect: شيء حدث قبل الآن وله علاقة بالحاضر." className="block text-center text-xs font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊺ ملخص الدرس ----------------
function S45_SummaryStep() {
  const [seen, setSeen] = useState<Record<number, boolean>>({});
  const count = Object.values(seen).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="الملخص: الصيغة · أهم الاستخدامات الخمسة · الكلمات العشر · القاعدة الذهبية." />
      <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4">
        <FormulaStrip items={["Subject", "+", "have / has", "+", "V3"]} />
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="rounded-xl bg-teal-600 px-3 py-1 text-sm font-black text-white"><En>I/You/We/They → have</En></span>
          <span className="rounded-xl bg-sky-700 px-3 py-1 text-sm font-black text-white"><En>He/She/It → has</En></span>
        </div>
      </div>
      <Lab emoji="🗂️" label="Five Uses" ar="المس كل استخدام لتراجعه" seq="l31-s45-summary">
        <div className="grid gap-2 sm:grid-cols-2">
          {SUMMARY_USES_31.map((u, i) => (
            <button
              key={u.n}
              type="button"
              data-use={u.n}
              aria-pressed={seen[i] === true}
              onClick={() => setSeen((s) => ({ ...s, [i]: true }))}
              className={`rounded-2xl border-2 p-3 text-right transition active:scale-[0.99] ${seen[i] ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white hover:border-sky-300"}`}
            >
              <div className="flex items-center gap-2">
                <Nub n={u.n} className="bg-sky-700" />
                <Rich text={u.label} className="text-sm font-black text-slate-800" />
              </div>
              <En className="mt-1.5 block text-base font-black text-slate-800">{u.en}</En>
              {seen[i] && <Rich text={u.ar} className="mt-0.5 block text-xs font-bold text-slate-500" />}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-2 rounded-2xl bg-slate-100 px-3 py-2 text-center text-sm font-black text-slate-600">
          <Rich text={`راجعت ${count} من ${SUMMARY_USES_31.length} استخدامات`} />
        </div>
      </Lab>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <p className="mb-2 text-sm font-black text-slate-700"><Rich text="الكلمات المهمة:" /></p>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {SUMMARY_WORDS_31.map((w) => (
            <div key={w.en} className="flex items-center gap-2 rounded-xl border-2 border-slate-100 bg-slate-50/60 px-3 py-1.5">
              <EnAr en={w.en} ar={w.ar} enClassName="rounded-lg bg-slate-900 px-2 py-0.5 text-xs font-black text-white" arClassName="text-xs font-bold text-slate-600" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
        <p className="text-sm font-black text-amber-900"><Rich text="والقاعدة الذهبية:" /></p>
        <Rich text={GOLDEN_31.rule} className="mt-1 block text-base font-black text-slate-800" />
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-emerald-200 bg-white p-2"><En className="text-sm font-black text-emerald-800">{GOLDEN_31.ok1}</En></div>
          <div className="rounded-2xl border-2 border-emerald-200 bg-white p-2"><En className="text-sm font-black text-emerald-800">{GOLDEN_31.ok2}</En></div>
          <div className="rounded-2xl border-2 border-rose-200 bg-white p-2"><En className="text-sm font-black text-rose-800">{GOLDEN_31.bad}</En></div>
        </div>
      </div>
      {count >= SUMMARY_USES_31.length && (
        <SourceReveal seq="l31-reveal-s45">
          <Rich text="Present Perfect = Subject + have/has + V3 — والصيغة واحدة، وتتغير وظيفتها حسب المعنى: تجربة · نتيجة حالية · حدث حديث · فترة لم تنتهِ · حالة مستمرة." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- 🗺️ خريطة المنهج ----------------
function MapStep({ onGoTest }: { onGoTest?: () => void }) {
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const stations = [
    ...CURRICULUM_31.present.map((p) => ({ id: `present-${p.n}`, group: "Present", label: p.label, num: p.n, here: p.here })),
    ...CURRICULUM_31.past.map((p) => ({ id: `past-${p.n}`, group: "Past", label: p.label, num: p.n, here: p.here })),
    ...CURRICULUM_31.next.map((p, i) => ({ id: `next-${i}`, group: "Next", label: p, num: 0, here: false })),
    ...CURRICULUM_31.future.map((p, i) => ({ id: `future-${i}`, group: "Future", label: p, num: 0, here: false })),
  ];
  const seenCount = Object.values(seen).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="🗺️" text="خريطة المنهج حتى الآن: Present · Past — ثم الطريق إلى Present Perfect Continuous والمستقبل." />
      <Lab emoji="🗺️" label="Curriculum Map" ar="المس كل محطة لتعرف موقعها في الرحلة" seq="l31-map-curriculum">
        <div className="grid gap-2 sm:grid-cols-3">
          {(["Present", "Past", "Next", "Future"] as const).map((g) => (
            <div key={g} className={`rounded-2xl border-2 p-3 ${g === "Present" ? "border-sky-200 bg-sky-50" : g === "Past" ? "border-teal-200 bg-teal-50" : "border-slate-200 bg-white"}`}>
              <p className="mb-1.5 text-xs font-black text-slate-500"><En>{g}</En></p>
              <div className="space-y-1.5">
                {stations.filter((s) => s.group === g).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    data-station={s.id}
                    aria-pressed={seen[s.id] === true}
                    onClick={() => setSeen((x) => ({ ...x, [s.id]: true }))}
                    className={`block w-full rounded-xl border-2 px-2.5 py-1.5 text-right text-xs font-black transition active:scale-[0.99] ${
                      s.here ? "border-emerald-400 bg-emerald-50 text-emerald-900" : seen[s.id] ? "border-sky-200 bg-white text-slate-700" : "border-slate-200 bg-white text-slate-500"
                    }`}
                  >
                    <En>{s.num ? `${s.num}. ` : ""}{s.label}</En>
                    {s.here && <span className="ms-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-black text-white"><Rich text="نحن هنا" /></span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div aria-live="polite" className="mt-2 text-center text-xs font-black text-slate-500">
          <Rich text={`زرت ${seenCount} من ${stations.length} محطات`} />
        </div>
      </Lab>
      {seenCount >= stations.length && (
        <SourceReveal seq="l31-reveal-map">
          <Rich text="وبعد تثبيت Present Perfect سننتقل إلى: Present Perfect Continuous — ثم نبدأ منظومة المستقبل: Future Simple · be going to · Future Continuous · Future Perfect · Future Perfect Continuous." className="block text-center text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
      <div className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 via-teal-50 to-amber-50 p-4 text-center">
        <Rich text="الدرس 31 مهم جدًا لأنه أول مرة نبدأ فيها بفهم فكرة «الماضي المرتبط بالحاضر»، وليس مجرد حفظ شكل الزمن." className="block text-sm font-black text-slate-800 md:text-base" />
      </div>
      {onGoTest && (
        <button type="button" onClick={onGoTest} className="w-full rounded-2xl bg-sky-700 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-sky-800 active:scale-[0.99]">
          🧪 انتقل إلى منطقة الاختبارات — 20 سؤالًا
        </button>
      )}
      <Signature />
    </div>
  );
}

// ============================================================
// توجيه الخطوات + إطار العرض
// ============================================================

function SlideBody({ s, onGoTest }: { s: Slide31; onGoTest?: () => void }) {
  switch (s.id) {
    case "cover": return <CoverStep />;
    case "opening": return <OpeningStep />;
    case "objectives": return <ObjectivesStep />;
    case "s1": return <S1_WhatStep />;
    case "s2": return <S2_WhyNameStep />;
    case "s3": return <S3_HaveHasStep />;
    case "s4": return <S4_V3Step />;
    case "s5": return <S5_PositiveStep />;
    case "s6": return <S6_ExperienceStep />;
    case "s7": return <S7_ContrastStep />;
    case "s8": return <S8_DetectiveStep />;
    case "s9": return <S9_EverStep />;
    case "s10": return <S10_NeverStep />;
    case "s11": return <S11_ResultStep />;
    case "pspp": return <S_PsPpStep />;
    case "s12": return <S12_RecentStep />;
    case "s13": return <S13_AlreadyStep />;
    case "s14": return <S14_JustStep />;
    case "s15": return <S15_YetStep />;
    case "s16": return <S16_AlreadyYetStep />;
    case "s17": return <S17_PeriodStep />;
    case "s18": return <S18_TodayStep />;
    case "s19": return <S19_ForSinceStep />;
    case "s20": return <S20_ForStep />;
    case "s21": return <S21_SinceStep />;
    case "s22": return <S22_ContinuationStep />;
    case "s23": return <S23_NegativeStep />;
    case "s24": return <S24_QuestionStep />;
    case "s25": return <S25_ShortStep />;
    case "s26": return <S26_WhStep />;
    case "s27": return <S27_HowLongStep />;
    case "s28": return <S28_BigCompareStep />;
    case "s29": return <S29_TripleStep />;
    case "s30": return <S30_TimelineStep />;
    case "s31": return <S31_FamousStep />;
    case "s32": return <S32_FamousStep />;
    case "s33": return <S33_FamousStep />;
    case "s34": return <S34_FamousStep />;
    case "s35": return <S35_DetectiveStep />;
    case "s36": return <S36_SmartStep />;
    case "s37": return <S37_IQStep />;
    case "s38": return <S38_DeeperStep />;
    case "s39": return <S39_BossLinaStep />;
    case "s40": return <S40_TransformStep />;
    case "s41": return <S41_ForSinceStep />;
    case "s42": return <S42_FinalChallengeStep />;
    case "s43": return <S43_FinalBossStep />;
    case "s44": return <S44_BigMapStep />;
    case "s45": return <S45_SummaryStep />;
    case "map": return <MapStep onGoTest={onGoTest} />;
    default: return null;
  }
}

export function SlideView31({ s, onGoTest }: { s: Slide31; onGoTest?: () => void }) {
  return (
    <Frame
      mascot={s.mascot}
      step={s.step}
      badge={s.section}
      title={<Rich text={s.title} />}
      lead={s.lead ? <Rich text={s.lead} /> : undefined}
      tip={s.tip}
      accent={ACCENT31}
      sourceTag={sourceTitleFor(s)}
    >
      <SlideBody s={s} onGoTest={onGoTest} />
    </Frame>
  );
}

// ============================ منطقة الاختبارات — 20 سؤالًا ============================

type TestAnswer = number | number[] | boolean | Record<number, number> | null;

const TYPE_LABEL31: Record<TestQ31["type"], string> = {
  single: "اختيار واحد",
  tf: "صح أم خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
  spot: "حدد الخطأ",
};

function answerMatches31(q: TestQ31, a: TestAnswer): boolean {
  if (a === null) return false;
  switch (q.type) {
    case "single": return a === q.answer;
    case "tf": return a === q.answer;
    case "multi": {
      const arr = [...(a as number[])].sort();
      const gold = [...q.answer].sort();
      return arr.length === gold.length && arr.every((v, i) => v === gold[i]);
    }
    case "order": {
      const idxs = a as number[];
      return Array.isArray(idxs) && idxs.length === q.answer.length && q.answer.every((txt, i) => q.items[idxs[i]] === txt);
    }
    case "match": {
      const rec = a as Record<number, number>;
      return q.answer.every((r, l) => rec[l] === r);
    }
    case "spot": return a === q.answer;
    default: return false;
  }
}

function isAnswered31(q: TestQ31, a: TestAnswer): boolean {
  if (a === null || a === undefined) return false;
  switch (q.type) {
    case "single": return typeof a === "number";
    case "tf": return typeof a === "boolean";
    case "multi": return (a as number[]).length > 0;
    case "order": return (a as number[]).length === q.items.length;
    case "match": return Object.keys(a as Record<number, number>).length === q.left.length;
    case "spot": return typeof a === "number";
    default: return false;
  }
}

/** بطاقة سؤال واحدة — محايدة تمامًا قبل الإنهاء، ملوّنة بعده. */
function TestCard31({ q, value, setValue, checked }: { q: TestQ31; value: TestAnswer; setValue: (v: TestAnswer) => void; checked: boolean }) {
  const ok = checked && answerMatches31(q, value);

  let body: ReactNode = null;
  if (q.type === "single") {
    body = (
      <div className="grid gap-1.5">
        {q.opts.map((o, i) => {
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-sky-300";
          if (!checked && value === i) cls = "border-sky-400 bg-sky-50 text-sky-900 ring-2 ring-sky-200";
          if (checked) {
            if (i === q.answer) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (value === i) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button key={i} type="button" data-opt={i} disabled={checked} onClick={() => setValue(i)}
              className={`font-en rounded-xl border-2 px-3.5 py-2 text-right font-bold transition active:scale-[0.99] ${cls}`}>
              <LatinRuns text={o} />
            </button>
          );
        })}
      </div>
    );
  } else if (q.type === "tf") {
    const opts = [true, false];
    body = (
      <div className="flex gap-2">
        {opts.map((o) => {
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-sky-300";
          if (!checked && value === o) cls = "border-sky-400 bg-sky-50 text-sky-900 ring-2 ring-sky-200";
          if (checked) {
            if (o === q.answer) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (value === o) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button key={String(o)} type="button" data-tf={String(o)} disabled={checked} onClick={() => setValue(o)}
              className={`flex-1 rounded-xl border-2 px-3.5 py-2 font-black transition active:scale-[0.99] ${cls}`}>
              {o ? "✓ صحيح" : "✕ خطأ"}
            </button>
          );
        })}
      </div>
    );
  } else if (q.type === "multi") {
    const arr = (Array.isArray(value) ? value : []) as number[];
    body = (
      <div className="grid gap-1.5">
        {q.opts.map((o, i) => {
          const picked = arr.includes(i);
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-sky-300";
          if (!checked && picked) cls = "border-sky-400 bg-sky-50 text-sky-900 ring-2 ring-sky-200";
          if (checked) {
            if (q.answer.includes(i)) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (picked) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button key={i} type="button" data-multi={i} disabled={checked}
              onClick={() => setValue(picked ? arr.filter((x) => x !== i) : [...arr, i])}
              className={`font-en rounded-xl border-2 px-3.5 py-2 text-right font-bold transition active:scale-[0.99] ${cls}`}>
              <LatinRuns text={o} />
            </button>
          );
        })}
      </div>
    );
  } else if (q.type === "order") {
    const seq = (Array.isArray(value) ? value : []) as number[];
    body = (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {q.items.map((it, i) => {
            const used = seq.includes(i);
            return (
              <button key={i} type="button" data-order-pool={i} disabled={checked || used} onClick={() => setValue([...seq, i])}
                className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${used ? "border-slate-100 bg-slate-50 text-slate-300" : "border-slate-200 bg-white text-slate-700 hover:border-sky-300"}`}>
                {it}
              </button>
            );
          })}
        </div>
        <div dir="ltr" className="ltr-row min-h-[3rem] rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-2">
          {seq.length === 0 ? (
            <span className="block p-2 text-center text-sm font-bold text-slate-400"><Rich text="المس الكلمات بالترتيب لبناء الجملة…" /></span>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {seq.map((idx, pos) => (
                <button key={pos} type="button" data-order-chip={pos} disabled={checked} onClick={() => setValue(seq.filter((_, p) => p !== pos))} title="إزالة"
                  className="font-en rounded-lg bg-slate-900 px-2.5 py-1.5 text-sm font-bold text-white transition hover:bg-rose-700">
                  {q.items[idx]}
                </button>
              ))}
            </div>
          )}
        </div>
        {!checked && seq.length > 0 && (
          <button type="button" onClick={() => setValue([])} className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 hover:bg-slate-200">↺ مسح الترتيب</button>
        )}
        {checked && (
          <div dir="ltr" className="ltr-row rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-2.5 text-center">
            <En className="text-sm font-black text-emerald-900">{q.answer.join(" ")}</En>
          </div>
        )}
      </div>
    );
  } else if (q.type === "match") {
    const rec = (value ?? {}) as Record<number, number>;
    const usedRight = new Set(Object.values(rec));
    body = (
      <div className="space-y-2">
        {q.left.map((l, li) => (
          <div key={li} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2.5">
            <En className="block text-sm font-black text-slate-800">{l}</En>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {q.right.map((r, ri) => {
                const mine = rec[li] === ri;
                const taken = usedRight.has(ri) && !mine;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-sky-300";
                if (!checked && mine) cls = "border-teal-400 bg-teal-600 text-white";
                if (!checked && taken) cls = "border-slate-100 bg-slate-50 text-slate-300";
                if (checked) {
                  if (q.answer[li] === ri) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
                  else if (mine) cls = "border-rose-300 bg-rose-50 text-rose-700";
                  else cls = "border-slate-200 bg-white text-slate-400";
                }
                return (
                  <button key={ri} type="button" data-match-row={li} data-match-opt={ri} disabled={checked || taken} onClick={() => setValue({ ...rec, [li]: ri })}
                    className={`font-en rounded-xl border-2 px-3 py-1 text-sm font-bold transition active:scale-95 ${cls}`}>
                    <LatinRuns text={r} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (q.type === "spot") {
    body = (
      <div className="space-y-2">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap gap-1.5">
          {q.segments.map((s, i) => {
            let cls = "border-slate-200 bg-slate-50 text-slate-800 hover:border-rose-300";
            if (!checked && value === i) cls = "border-teal-400 bg-teal-600 text-white";
            if (checked) {
              if (i === q.answer) cls = "border-emerald-400 bg-emerald-600 text-white";
              else if (value === i) cls = "border-rose-400 bg-rose-600 text-white";
              else cls = "border-slate-200 bg-slate-50 text-slate-400";
            }
            return (
              <button key={i} type="button" data-spot-seg={i} disabled={checked} onClick={() => setValue(i)}
                className={`font-en rounded-lg border-2 px-2.5 py-1.5 text-base font-bold transition active:scale-95 ${cls}`}>
                {s}
              </button>
            );
          })}
        </div>
        {checked && (
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-2.5 text-sm font-bold text-emerald-900">
            ✓ <Rich text="التصحيح:" /> <En className="font-black">{q.fix}</En>
          </div>
        )}
      </div>
    );
  }

  return (
    <div data-test-q={q.n} className={`rounded-3xl border-2 p-3.5 transition sm:p-4 ${!checked ? "border-slate-200 bg-white" : ok ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Nub n={q.n} className="bg-sky-700" />
        <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-black text-sky-700"><Rich text={TYPE_LABEL31[q.type]} /></span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-600"><Rich text={LEVEL_LABEL_31[q.level]} /></span>
        {checked && <span className={`ms-auto text-lg font-black ${ok ? "text-emerald-600" : "text-rose-500"}`}>{ok ? "✓" : "✕"}</span>}
      </div>
      <Rich text={q.ar} className="mt-2 block text-base font-bold text-slate-800 md:text-lg" />
      {"en" in q && q.en && <En className="mt-1 block text-base font-bold text-slate-600">{q.en}</En>}
      <div className="mt-2.5">{body}</div>
      {checked && (
        <div className="mt-2.5 space-y-1.5">
          <div className={`rounded-2xl border-2 p-2.5 text-sm font-bold ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-800"}`}>
            <Rich text={q.why} />
          </div>
          {q.trap && (
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-2.5 text-sm font-bold text-amber-900">
              🪤 <Rich text={q.trap} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function TestArea31({ onCheckedChange, onShowSolutions }: { onCheckedChange?: (checked: boolean) => void; onShowSolutions?: () => void }) {
  const [answers, setAnswers] = useState<TestAnswer[]>(() => Array<TestAnswer>(TEST_31.length).fill(null));
  const [checked, setChecked] = useState(false);
  const setAt = (i: number, v: TestAnswer) => {
    if (checked) return;
    setAnswers((p) => p.map((x, xi) => (xi === i ? v : x)));
  };
  const answered = TEST_31.filter((q, i) => isAnswered31(q, answers[i])).length;
  const allAnswered = answered === TEST_31.length;
  const score = TEST_31.filter((q, i) => answerMatches31(q, answers[i])).length;
  const submit = () => { setChecked(true); onCheckedChange?.(true); };
  const reset = () => { setAnswers(Array<TestAnswer>(TEST_31.length).fill(null)); setChecked(false); onCheckedChange?.(false); };
  return (
    <div className="space-y-3.5">
      <Note emoji="🧪" text="منطقة الاختبارات — 20 سؤالًا جديدًا مؤلفة لهذا الاختبار (6 Basic · 7 Medium · 4 Advanced · 3 Thinking). لا تظهر أي نتيجة قبل الضغط على «إنهاء الاختبار»." />
      <div className="grid gap-2 sm:grid-cols-4">
        {(["basic", "medium", "advanced", "thinking"] as const).map((lv) => (
          <div key={lv} className="rounded-2xl border-2 border-slate-200 bg-white p-2.5 text-center">
            <div className="font-head text-xl font-black text-slate-800">{TEST_31_LEVEL_COUNTS[lv]}</div>
            <div className="text-[11px] font-black text-slate-500"><Rich text={LEVEL_LABEL_31[lv]} /></div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-2xl border-2 border-sky-100 bg-white px-3 py-2 text-sm font-black text-sky-800">
        <span>🧪 <Rich text="التقدم" /></span>
        <span aria-live="polite"><Rich text={`${answered}/${TEST_31.length} مُجابة`} /></span>
      </div>
      <div className="space-y-3">
        {TEST_31.map((q, i) => (
          <TestCard31 key={q.n} q={q} value={answers[i]} setValue={(v) => setAt(i, v)} checked={checked} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        {!checked ? (
          <>
            <button type="button" onClick={submit} disabled={!allAnswered} title={allAnswered ? undefined : "أجب عن جميع الأسئلة العشرين أولًا"}
              className="rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-sky-800 disabled:opacity-30">
              <Rich text={`تصحيح الاختبار — إنهاء الاختبار (${answered}/${TEST_31.length})`} />
            </button>
            <span className="text-xs font-bold text-slate-500"><Rich text="لن تظهر أي نتيجة أو تصحيح قبل الإنهاء." /></span>
          </>
        ) : (
          <>
            <span aria-live="polite" role="status" className="tada rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-black text-white">
              <Rich text={`نتيجتك: ${score}/${TEST_31.length}`} />
            </span>
            <span className={`rounded-xl px-3 py-2.5 text-sm font-black ${score >= 16 ? "bg-emerald-100 text-emerald-900" : score >= 10 ? "bg-amber-100 text-amber-900" : "bg-rose-100 text-rose-900"}`}>
              <Rich text={`صحيح: ${score} · خطأ: ${TEST_31.length - score}`} />
            </span>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة الاختبار" />
            </button>
            {onShowSolutions && (
              <button type="button" onClick={onShowSolutions} className="rounded-xl bg-amber-100 px-4 py-2.5 text-sm font-black text-amber-900 transition hover:bg-amber-200">
                <Rich text="🔑 عرض الحلول مع الشرح" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================ حلول الاختبارات — مقفلة حتى المحاولة ============================

export function Solutions31({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest?: () => void; onGoTeacher?: () => void }) {
  if (!unlocked) {
    return (
      <div className="space-y-3.5">
        <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 text-center md:p-10">
          <div className="text-5xl">🔒</div>
          <h3 className="font-head mt-3 text-xl font-black text-slate-800">حلول الاختبارات مقفلة</h3>
          <p className="mt-2 text-sm font-bold text-slate-600">أنهِ الاختبار أولًا (20 سؤالًا) لتُفتح لك الحلول مع الشرح الكامل — أو ادخل منطقة المعلم.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {onGoTest && (
              <button type="button" onClick={onGoTest} className="rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-sky-800">
                🧪 الذهاب إلى الاختبار
              </button>
            )}
            {onGoTeacher && (
              <button type="button" onClick={onGoTeacher} className="rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-300">
                👩‍🏫 منطقة المعلم
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  const chunks: { level: TestQ31["level"]; items: typeof TEST_31_SOLUTIONS }[] = [
    { level: "basic", items: TEST_31_SOLUTIONS.filter((s) => s.level === "basic") },
    { level: "medium", items: TEST_31_SOLUTIONS.filter((s) => s.level === "medium") },
    { level: "advanced", items: TEST_31_SOLUTIONS.filter((s) => s.level === "advanced") },
    { level: "thinking", items: TEST_31_SOLUTIONS.filter((s) => s.level === "thinking") },
  ];
  return (
    <div className="space-y-3.5">
      <Note emoji="🔑" text="حلول منطقة الاختبارات العشرين — كل حل مع التفسير والفخ، في أربع مجموعات بحسب المستوى:" />
      {chunks.map((chunk) => (
        <div key={chunk.level} className="space-y-2.5">
          <h3 className="font-head rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
            <Rich text={`${LEVEL_LABEL_31[chunk.level]} — ${chunk.items.length} أسئلة`} />
          </h3>
          {chunk.items.map((s) => {
            const q = TEST_31[s.n - 1];
            return (
              <div key={s.n} className="rounded-3xl border-2 border-slate-200 bg-white p-3.5 sm:p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Nub n={s.n} className="bg-sky-700" />
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-black text-sky-700"><Rich text={TYPE_LABEL31[s.type]} /></span>
                </div>
                <Rich text={q.ar} className="mt-2 block text-sm font-bold text-slate-500" />
                {"en" in q && q.en && <En className="mt-0.5 block text-sm font-bold text-slate-500">{q.en}</En>}
                <div className="mt-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-2.5">
                  <span className="text-sm font-black text-emerald-900">✓ <LatinRuns text={s.answer} /></span>
                </div>
                <TeachingDetails><div className="mt-2 text-sm font-bold leading-relaxed text-slate-700"><Rich text={s.why} /></div></TeachingDetails>
                {s.trap && (
                  <div className="mt-1.5 rounded-2xl border-2 border-amber-200 bg-amber-50 p-2.5 text-sm font-bold text-amber-900">
                    🪤 <Rich text={s.trap} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ============================ منطقة المعلم ============================

function TeacherGate({ ok, setOk }: { ok: boolean; setOk: (v: boolean) => void }) {
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  if (ok) return null;
  const attempt = () => {
    if (pw === TEACHER_PASSWORD_31) setOk(true);
    else {
      setError(true);
      setShake(true);
      window.setTimeout(() => setShake(false), 450);
    }
  };
  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 text-center md:p-10">
      <div className="text-5xl">👩‍🏫</div>
      <h3 className="font-head mt-3 text-xl font-black text-slate-800">منطقة المعلم — مغلقة بكلمة مرور</h3>
      <p className="mt-2 text-sm font-bold text-slate-500">أدخل كلمة المرور لعرض تسلسل التدريس وحلول تمارين المصدر والمذكرات وسلالم التقييم.</p>
      <div className={`mx-auto mt-4 flex max-w-sm gap-2 ${shake ? "shake" : ""}`}>
        <label className="sr-only" htmlFor="teacher-pw-31">كلمة المرور</label>
        <input
          id="teacher-pw-31"
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") attempt(); }}
          placeholder="كلمة المرور"
          className="min-w-0 flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-center text-sm font-bold outline-none focus:border-sky-400"
        />
        <button type="button" onClick={attempt} className="rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-sky-800">
          دخول
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm font-black text-rose-600">كلمة المرور غير صحيحة — حاول مجددًا.</p>}
    </div>
  );
}

const TEACHING_PITFALLS_31: { head: string; lines: string[] }[] = [
  { head: "الفكرة العالقة: «الماضي = Past Simple»", lines: ["كثير من الطلاب يعتقدون أن كل حدث ماضٍ يحتاج Past Simple. أعدهم دائمًا إلى السؤال: هل نتيجته/خبرته/استمراره مهم الآن؟"] },
  { head: "V2 بدل V3 بعد have/has", lines: ["هذا الخطأ يظهر حتى مع طلاب متقدمين لأن الأذن تألف I went. درّب على الثلاثي go → went → gone مع كل فعل جديد قبل استخدامه."] },
  { head: "وقت ماضٍ محدد مع Present Perfect", lines: ["القاعدة العملية: لو ظهر yesterday/last year/in 2021/two days ago فالأرجح Past Simple — إلا في سياقات خاصة يجري شرحها."] },
  { head: "for و since", lines: ["استخدم اختبار «هل بعدها عدد/مدة أم تاريخ/لحظة؟» — وهذا أسرع من حفظ القاعدة مجردة."] },
  { head: "already و yet و just", lines: ["already للاكتمال قبل المتوقع، yet للنفي والسؤال، just للحدوث القريب — رتّبها على مسار زمني واحد أمام الطالب."] },
  { head: "النفي المزدوج", lines: ["not + never خطأ شائع؛ وضّح أن never وحدها كافية، وأن الفعل بعدها يبقى في الصيغة المثبتة (have/has + never + V3)."] },
  { head: "«لقد» في الترجمة العربية", lines: ["لا تترجم «لقد» تلقائيًا إلى have/has: المقصود في العربية قد يكون حدثًا منتهيًا (Past Simple) أو مرتبطًا بالحاضر (Present Perfect)."] },
];

export function TeacherArea31({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange?: (ok: boolean) => void; onGoSolutions?: () => void }) {
  const sequence = SECTIONS_31.map((sec) => ({
    label: sec.label,
    items: SLIDES.filter((s) => s.section === sec.id),
  })).filter((g) => g.items.length > 0);
  return (
    <div className="space-y-3.5">
      <TeacherGate ok={unlocked} setOk={(v) => onUnlockChange?.(v)} />
      {unlocked && (
        <div className="space-y-3.5">

<TeacherWorkspace lesson={31}>
          {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
          <TeacherSection title="مفتاح الاختبار النهائي" category="assessment">
<FinalTestAnswerKey lesson={31} questions={FINAL_TESTS[31]} accent="bg-sky-700" />
</TeacherSection>
          <TeacherSection title="نظرة عامة" category="teaching">
<div className="rounded-3xl border-2 border-sky-200 bg-gradient-to-br from-sky-50 to-teal-50 p-4">
            <h3 className="font-head text-lg font-black text-sky-900"><Rich text={TEACHER_31_OVERVIEW.title} /></h3>
            <div className="mt-3 space-y-2.5">
              <div>
                <p className="mb-1 text-sm font-black text-slate-700">🎯 الأهداف:</p>
                <ul className="space-y-1">
                  {TEACHER_31_OVERVIEW.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className="text-sky-600">•</span><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-sm font-black text-slate-700">📚 المتطلبات القبلية:</p>
                <ul className="space-y-1">
                  {TEACHER_31_OVERVIEW.prerequisites.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className="text-sky-600">•</span><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-sm font-black text-slate-700">💎 جوهر الدرس:</p>
                <ul className="space-y-1">
                  {TEACHER_31_OVERVIEW.core.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className="text-sky-600">•</span><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="تسلسل التدريس" category="teaching">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">🧭 تسلسل التدريس ({SLIDE_COUNT} خطوة)</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {sequence.map((g) => (
                <div key={g.label} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3">
                  <p className="text-sm font-black text-slate-700"><Rich text={g.label} /></p>
                  <p className="mt-1 text-xs font-bold leading-relaxed text-slate-500">
                    <Rich text={g.items.map((s) => `خطوة ${s.no} — ${s.title}`).join(" · ")} />
                  </p>
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="المفاهيم الصعبة" category="teaching">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">🧩 المفاهيم الصعبة وكيف تُدرَّس</h3>
            <div className="mt-3 space-y-2.5">
              {TEACHING_PITFALLS_31.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-violet-100 bg-violet-50/40 p-3">
                  <p className="text-sm font-black text-violet-900"><Rich text={n.head} /></p>
                  <ul className="mt-1.5 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700"><span className="text-violet-400">•</span><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="مذكرات التدريس" category="teaching">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">📝 مذكرات تدريسية ({TEACHER_31_NOTES.length})</h3>
            <div className="mt-3 space-y-2.5">
              {TEACHER_31_NOTES.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 p-3">
                  <p className="text-sm font-black text-sky-900"><Rich text={n.head} /></p>
                  <ul className="mt-1.5 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700"><span className="text-sky-400">•</span><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="حلول تمارين المصدر" category="source">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">📚 حلول تمارين المصدر وأنشطته ({TEACHER_31_SOLUTIONS.length})</h3>
            <div className="mt-3 space-y-2.5">
              <TeacherSourceBrowser lesson={31} groups={TEACHER_31_SOLUTIONS} />
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="سلالم التقييم" category="teaching">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">📊 سلالم التقييم ({TEACHER_31_RUBRICS.length})</h3>
            <div className="mt-3 space-y-2.5">
              {TEACHER_31_RUBRICS.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-amber-100 bg-amber-50/40 p-3">
                  <p className="text-sm font-black text-amber-900"><Rich text={n.head} /></p>
                  <ul className="mt-1.5 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700"><span className="text-amber-400">•</span><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="الأخطاء الشائعة" category="teaching">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">⚠️ الأخطاء الشائعة والمفاهيم المغلوطة ({TEACHER_31_MISTAKES.length})</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {TEACHER_31_MISTAKES.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-rose-100 bg-rose-50/40 p-3">
                  <p className="text-sm font-black text-rose-800"><Rich text={n.head} /></p>
                  <ul className="mt-1 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="text-xs font-semibold leading-relaxed text-slate-600"><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="تصحيح الأخطاء المتعمدة" category="teaching">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">🎯 جمل خاطئة مقصودة محفوظة حرفيًا ({INTENTIONALLY_WRONG_31.length})</h3>
            <p className="mt-1 text-xs font-bold text-slate-500"><Rich text="تُعرض داخل الدرس دائمًا موسومة بأنها خاطئة مع تصحيحها — وهذا السجل للمراجعة السريعة وسلالم التقييم." /></p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {INTENTIONALLY_WRONG_31.map((w) => (
                <div key={w.id} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2.5">
                  <En className="block text-sm font-black text-rose-700 line-through decoration-rose-300">{w.wrong}</En>
                  <En className="mt-0.5 block text-sm font-black text-emerald-800">✓ {w.right}</En>
                  <p className="mt-1 text-[11px] font-bold text-slate-500"><Rich text={w.note} /></p>
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          <TeacherSection title="مراجع الأقسام المصدرية" category="source">
<div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">🗂️ مراجع الأقسام المصدرية ({SOURCE_LEDGER_COUNT})</h3>
            <p className="mt-1 text-xs font-bold text-slate-500"><Rich text={`السجل يشمل ${SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا ①–㊺ + ${SOURCE_LEDGER_COUNT - SOURCE_NUMBERED_COUNT} أقسام غير مرقّمة (الغلاف · الافتتاح · الأهداف · لوحة Past Simple vs Present Perfect · خريطة المنهج).`} /></p>
            <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {SOURCE_SECTIONS.map((s) => (
                <div key={s.id} className="flex items-start gap-2 rounded-xl border-2 border-slate-100 bg-slate-50/60 px-2.5 py-1.5">
                  <span className="rounded-lg bg-slate-900 px-2 py-0.5 text-[10px] font-black text-white">{s.num ? s.num : "—"}</span>
                  <Rich text={s.title} className="text-xs font-bold text-slate-600" />
                </div>
              ))}
            </div>
          </div>
</TeacherSection>

          {onGoSolutions && (
            <button type="button" onClick={onGoSolutions} className="w-full rounded-2xl bg-amber-100 px-6 py-3.5 text-base font-black text-amber-900 transition hover:bg-amber-200">
              🔑 عرض حلول منطقة الاختبارات
            </button>
          )}
        <TeacherSection title="مفتاح منطقة الاختبارات — 20 سؤالًا" category="assessment"><Solutions31 unlocked={true} /></TeacherSection>
</TeacherWorkspace>
</div>
      )}
    </div>
  );
}

// ============================ الهيكل: شريط + درج + تنقل ============================

type Area31 = "lesson" | "test" | "solutions" | "teacher";
const AREAS_31: { id: Area31; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "الدرس" },
  { id: "test", emoji: "🧪", ar: "منطقة الاختبارات" },
  { id: "solutions", emoji: "🔑", ar: "حلول الاختبارات" },
  { id: "teacher", emoji: "👩‍🏫", ar: "منطقة المعلم" },
];

export default function Lesson31({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area31>("lesson");
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const solutionsUnlocked = testChecked || teacherOk;
  const slide = SLIDES[index];
  const progress = useMemo(() => Math.round(((index + 1) / SLIDE_COUNT) * 100), [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (area !== "lesson") return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") setIndex((i) => Math.min(SLIDES.length - 1, i + 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [area]);

  useEffect(() => {
    if (area !== "lesson") return;
    try {
      const scroller = typeof document !== "undefined" ? document.scrollingElement : null;
      if (scroller && typeof scroller.scrollTo === "function") scroller.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      /* التمرير غير مدعوم في بيئة الاختبار */
    }
  }, [index, area]);

  const goSlide = (i: number) => { setIndex(i); setArea("lesson"); setDrawer(false); };

  const rail = (
    <div className="space-y-3">
      {SECTIONS_31.map((sec) => {
        const items = SLIDES.map((s, i) => ({ s, i })).filter(({ s }) => s.section === sec.id);
        if (items.length === 0) return null;
        return (
          <div key={sec.id}>
            <p className="mb-1.5 px-1 text-xs font-black text-slate-400"><Rich text={sec.label} /></p>
            <div className="space-y-1">
              {items.map(({ s, i }) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goSlide(i)}
                  aria-current={i === index && area === "lesson" ? "true" : undefined}
                  className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-right text-sm font-bold transition ${
                    i === index && area === "lesson" ? "bg-sky-700 text-white shadow" : "text-slate-600 hover:bg-sky-50"
                  }`}
                >
                  <span aria-hidden>{s.mascot}</span>
                  <span className="min-w-0 flex-1 truncate"><Rich text={s.title} /></span>
                  <span className={`text-[11px] font-black ${i === index && area === "lesson" ? "text-sky-200" : "text-slate-300"}`}>{s.no}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-4 p-3 sm:p-4">
      <SignatureGhost />
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onExit} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-200">
          → خروج
        </button>
        <button type="button" onClick={() => setDrawer((d) => !d)} className="rounded-xl bg-sky-700 px-3 py-2 text-sm font-black text-white transition hover:bg-sky-800 lg:hidden">
          ☰ الخطوات
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="font-head truncate text-lg font-black text-slate-900 md:text-xl"><LatinRuns text={LESSON_TITLE_31} /></h1>
          <p className="truncate text-xs font-bold text-slate-500"><LatinRuns text={LESSON_SUBTITLE_31} /></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {AREAS_31.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setArea(a.id)}
            aria-pressed={area === a.id}
            className={`flex-1 rounded-2xl border-2 px-3 py-2.5 text-sm font-black transition active:scale-[0.98] sm:flex-none sm:px-5 ${
              area === a.id ? "border-sky-600 bg-sky-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
            }`}
          >
            {a.emoji} <LatinRuns text={a.ar ?? ""} />
            {a.id === "solutions" && !solutionsUnlocked && " 🔒"}
          </button>
        ))}
      </div>

      {area === "lesson" && (
        <div className="flex items-center gap-2 rounded-2xl border-2 border-sky-100 bg-white px-3 py-2">
          <span className="text-xs font-black text-sky-800"><Rich text={`خطوة ${slide.no} من ${SLIDE_COUNT}`} /></span>
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-sky-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs font-black text-slate-400"><Rich text={`${progress}٪`} /></span>
        </div>
      )}

      {drawer && (
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-3 lg:hidden">
          {rail}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden max-h-[80vh] overflow-y-auto rounded-3xl border-2 border-slate-200 bg-white p-3 lg:block">
          {rail}
        </aside>
        <main className="min-w-0 space-y-4">
          {area === "lesson" && (
            <div data-area="l31-lesson">
              <SlideView31 key={index} s={slide} onGoTest={() => setArea("test")} />
              {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
              {index === SLIDE_COUNT - 1 && (
                <div className="mt-4">
                  <FinalTest
                    lesson={31}
                    questions={FINAL_TESTS[31]}
                    accent="bg-sky-700"
                    onGoTeacher={() => setArea("teacher")}
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <button type="button" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition enabled:hover:border-sky-300 disabled:opacity-30">
                  → السابق
                </button>
                <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">{slide.no} / {SLIDE_COUNT}</span>
                <button type="button" disabled={index === SLIDE_COUNT - 1} onClick={() => setIndex((i) => Math.min(SLIDE_COUNT - 1, i + 1))}
                  className="flex-1 rounded-2xl bg-sky-700 px-4 py-3 text-sm font-black text-white transition enabled:hover:bg-sky-800 disabled:opacity-30">
                  التالي ←
                </button>
              </div>
            </div>
          )}
          {area === "test" && <div data-area="l31-test"><TestArea31 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} /></div>}
          {area === "solutions" && <div data-area="l31-solutions"><Solutions31 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} /></div>}
          {area === "teacher" && <div data-area="l31-teacher"><TeacherArea31 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} /></div>}
        </main>
      </div>

      <p className="pb-4 text-center text-[11px] font-bold text-slate-400">
        📜 المصدر: {SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · {SOURCE_LEDGER_COUNT} وحدة في السجل · العرض دلالي تفاعلي — لا نص خام
      </p>
    </div>
  );
}
