// ============================================================
// 🧭 الدرس 30 — مراجعة شاملة لنظام الماضي (Native Multi-Step)
// 🎛️ THE PAST CONTROL ROOM — غرفة التحكم بنظام الماضي الكامل
// Past Simple + Past Continuous + Past Perfect + Past Perfect Continuous
//
// إعادة بناء أصلية بمعيار الدروس 27 + 28 + 29 والدرس 6:
// - فكرة واحدة لكل خطوة · لا جدران نصوص · التفاعل هو الشرح
// - سجل المصدر (SOURCE_SECTIONS) = مرجع التغطية والتدقيق فقط،
//   ولا يُعرض أبدًا كأسطر خام في واجهة الطالب
// - التدريب داخل الدرس = تغذية فورية + تفسير (why) لكل إجابة،
//   ولا يوجد «حلّ الكل ثم تحقق» إلا في الاختبار النهائي المنفصل
// - المناطق الأربع: الدرس (46 خطوة) | الاختبار (20) | الحلول | المعلم
// ============================================================

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES as DATA_SLIDES,
  SOURCE_SECTIONS,
  SOURCE_LEDGER_COUNT,
  SOURCE_NUMBERED_COUNT,
  SEC,
  SECTIONS_30,
  LESSON_TITLE_30,
  LESSON_SUBTITLE_30,
  LAB_NAME_30,
  LAB_MOTTO_30,
  TENSES_30,
  DETECTIVE_RESCUE_30,
  DETECTIVE_SAM_30,
  DETECTIVE_LINA_30,
  DETECTIVE_NORA_30,
  DETECTIVE_FINAL_30,
  QUIZ1_30,
  QUIZ2_30,
  ERRORS_30,
  FINAL_EXAM_30,
  CHALLENGE_WORDS_30,
  BOSS_STARTER_30,
  TEST_30,
  TEST_30_SOLUTIONS,
  TEACHER_PASSWORD_30,
  TEACHER_30_OVERVIEW,
  TEACHER_30_NOTES,
  TEACHER_30_SOLUTIONS,
  TEACHER_30_RUBRICS,
  TEACHER_30_MISTAKES,
  type Slide30 as Slide30Data,
  type TestQ30,
  type Tense30,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { EnAr, LatinRuns } from "../../shared/bidi";
import {
  En,
  Rich,
  PlatformTag,
  PartsLine,
  SentenceCard,
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

const ACCENT30: FrameAccent = {
  step: "bg-teal-700",
  badge: "bg-teal-100 text-teal-800",
  tip: "from-teal-700 to-indigo-600",
  shadow: "shadow-[0_16px_44px_-24px_rgba(13,148,136,0.45)]",
};

// ---------------- سجل الشرائح (من data.ts) ----------------
export type Slide30 = Slide30Data & { no: number };
const SLIDES: Slide30[] = DATA_SLIDES.map((n, i) => ({ ...n, no: i + 1 }));
export const VIEW_SLIDES = SLIDES;
export const SLIDE_COUNT = SLIDES.length;

function sourceTitleFor(s: Slide30): string {
  return s.source
    .map((id) => SOURCE_SECTIONS[SEC[id]]?.title ?? id)
    .join(" · ");
}

// ---------------- نظام أدوار الجملة (تشريح الأزمنة) ----------------
const R30: Record<string, RoleStyle> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "الفاعل" },
  v2: { chip: "bg-orange-100 border-orange-300 text-orange-900", label: "الماضي البسيط V2" },
  was: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "was / were" },
  ving: { chip: "bg-cyan-100 border-cyan-300 text-cyan-900", label: "المستمر V-ing" },
  had: { chip: "bg-violet-100 border-violet-300 text-violet-900", label: "had" },
  v3: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", label: "التصريف الثالث V3" },
  been: { chip: "bg-teal-100 border-teal-300 text-teal-900", label: "been" },
  dur: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "المدة" },
  already: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "already" },
  conn: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "أداة الربط" },
  adv: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "الظرف" },
  obj: { chip: "bg-slate-100 border-slate-300 text-slate-900", label: "المفعول/التكملة" },
  wrong: { chip: "bg-rose-100 border-rose-300 text-rose-900", label: "الخطأ" },
  fix: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "الإصلاح" },
};
const P = (text: string, role: string): Part => ({ text, role });

// ---------------- العدسات الأربع (نظام بصري موحّد) ----------------
export type Lens30 = "ps" | "pc" | "pp" | "ppc";
const LENS_META: Record<Lens30, { emoji: string; tag: string; ar: string; q: string; qEn: string; chip: string; soft: string; text: string; ring: string; bar: string }> = {
  ps: { emoji: "📸", tag: "PAST SIMPLE", ar: "الماضي البسيط", q: "ماذا حدث؟", qEn: "What happened?", chip: "bg-orange-500 text-white", soft: "border-orange-200 bg-orange-50", text: "text-orange-900", ring: "ring-orange-300", bar: "bg-orange-400" },
  pc: { emoji: "🎥", tag: "PAST CONTINUOUS", ar: "الماضي المستمر", q: "ماذا كان يحدث؟", qEn: "What was happening?", chip: "bg-sky-600 text-white", soft: "border-sky-200 bg-sky-50", text: "text-sky-900", ring: "ring-sky-300", bar: "bg-sky-500" },
  pp: { emoji: "⏪", tag: "PAST PERFECT", ar: "الماضي التام", q: "ماذا كان قد حدث قبل ذلك؟", qEn: "What had happened?", chip: "bg-violet-700 text-white", soft: "border-violet-200 bg-violet-50", text: "text-violet-900", ring: "ring-violet-300", bar: "bg-violet-500" },
  ppc: { emoji: "⏪🎥", tag: "PAST PERFECT CONTINUOUS", ar: "الماضي التام المستمر", q: "ماذا كان مستمرًا لفترة قبل ذلك؟", qEn: "What had been happening?", chip: "bg-teal-600 text-white", soft: "border-teal-200 bg-teal-50", text: "text-teal-900", ring: "ring-teal-300", bar: "bg-teal-500" },
};
const LENSES: Lens30[] = ["ps", "pc", "pp", "ppc"];

function tenseKey(t: Tense30): Lens30 {
  if (t === "Past Simple") return "ps";
  if (t === "Past Continuous") return "pc";
  if (t === "Past Perfect") return "pp";
  return "ppc";
}

function LensChip({ lens, active, onClick, size = "md" }: { lens: Lens30; active?: boolean; onClick?: () => void; size?: "sm" | "md" }) {
  const v = LENS_META[lens];
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
        active ? `${v.chip} ring-2 ${v.ring}` : "border-2 border-slate-200 bg-white text-slate-600 hover:border-teal-300"
      }`}
    >
      {inner}
    </button>
  );
}

// ---------------- مكونات تعليمية مشتركة ----------------

/** مختبر بصري تفاعلي — يحمل هوية data-en-seq للتدقيق. */
function Lab({ emoji, label, ar, children, seq }: { emoji: string; label: string; ar?: string; children: ReactNode; seq?: string }) {
  return (
    <div data-en-seq={seq} className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-sky-50 to-amber-50/70 p-3.5 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-white px-3 py-2">
        <span className="text-xl" aria-hidden>{emoji}</span>
        <EnAr en={label} ar={ar} enClassName="text-[11px] font-black uppercase tracking-[0.16em] text-teal-700" arClassName="text-sm font-bold text-slate-600" />
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
function FormulaStrip({ items, tone = "teal" }: { items: readonly string[]; tone?: "teal" | "orange" | "sky" | "amber" | "rose" | "violet" | "indigo" }) {
  const colors: Record<string, string> = {
    teal: "border-teal-200 bg-white text-teal-900",
    violet: "border-violet-200 bg-white text-violet-900",
    orange: "border-orange-200 bg-white text-orange-900",
    sky: "border-sky-200 bg-white text-sky-900",
    amber: "border-amber-200 bg-white text-amber-900",
    rose: "border-rose-200 bg-white text-rose-900",
    indigo: "border-indigo-200 bg-white text-indigo-900",
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

/** مسار زمني بصري — من الماضي الأقدم إلى NOW. */
function TimeTrack({ segs }: { segs: { lens: Lens30; label: string; wide?: boolean }[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-2.5">
      <div className="flex h-9 gap-1">
        {segs.map((s, i) => (
          <div key={i} className={`relative flex ${s.wide ? "flex-[2]" : "flex-1"} items-center justify-center overflow-hidden rounded-lg ${LENS_META[s.lens].bar}`}>
            <span className="px-1 text-center text-[10px] font-black leading-tight text-white">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-black text-slate-400">
        <En>EARLIER PAST</En>
        <En>LATER PAST</En>
        <En>NOW</En>
      </div>
    </div>
  );
}

// ============================================================
// لبنات الممارسة الفورية — تغذية لحظية + تفسير لكل إجابة
// ============================================================

/** سؤال خيارات بتغذية فورية: الاختيار يكشف الصح/الخطأ + why فورًا. */
function McqRow({ n, stem, stemAr, opts, answer, why, context, onFirstAnswer, accent = "bg-teal-700" }: {
  n: number; stem?: string; stemAr?: string; opts: string[]; answer: number; why: string; context?: string; onFirstAnswer?: () => void; accent?: string;
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
            className={`font-en rounded-xl border-2 px-3.5 py-1.5 font-bold transition active:scale-95 ${
              pick === oi
                ? oi === answer
                  ? "border-transparent bg-emerald-600 text-white"
                  : "border-transparent bg-rose-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
            }`}
          >
            {o}
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

/** محقق الأزمنة: لكل فعل 4 عدسات — الاختيار يكشف النتيجة + why فورًا. */
export type DetectivePick = { verb: string; tense: Lens30; why: string; role?: string };
function DetectiveQuiz({ seq, items, children }: { seq: string; items: DetectivePick[]; children?: ReactNode }) {
  const [picks, setPicks] = useState<Record<number, Lens30>>({});
  const solved = items.filter((it, i) => picks[i] === it.tense).length;
  const allSolved = solved === items.length;
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="flex items-center justify-between rounded-2xl border-2 border-teal-100 bg-white px-3 py-2 text-sm font-black text-teal-800">
        <span>🕵️ <Rich text="المحقق — حدّد زمن كل فعل" /></span>
        <span aria-live="polite"><Rich text={`${solved}/${items.length} محلولة`} /></span>
      </div>
      {items.map((it, i) => {
        const pick = picks[i];
        const right = pick === it.tense;
        return (
          <div key={i} className={`rounded-3xl border-2 p-3 transition ${pick === undefined ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
            <div className="flex flex-wrap items-center gap-2.5">
              <Nub n={i + 1} className="bg-teal-700" />
              <En className="rounded-xl bg-slate-900 px-3 py-1.5 text-lg font-black text-white">{it.verb}</En>
              {it.role && <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600"><Rich text={it.role} /></span>}
            </div>
            <div data-detect-chips={i} className="mt-2.5 flex flex-wrap gap-2 pr-10">
              {LENSES.map((l) => (
                <LensChip key={l} lens={l} size="sm" active={pick === l} onClick={() => setPicks((p) => ({ ...p, [i]: l }))} />
              ))}
            </div>
            {pick !== undefined && (
              <div className={`mt-2 pr-10 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
                {right ? <span className="tada inline-block">✓ {LENS_META[it.tense].emoji} <Rich text={it.why} /></span>
                  : <span>✕ <Rich text={it.why} /></span>}
              </div>
            )}
          </div>
        );
      })}
      {allSolved && children}
    </div>
  );
}

/** ترتيب موجّه: المس الأحداث بالترتيب — كل لمسة تُصحَّح فورًا. */
function TapOrder({ seq, items, expected, whys, children }: {
  seq: string; items: { en: string; ar: string }[]; expected: number[]; whys: string[]; children?: ReactNode;
}) {
  const [done, setDone] = useState<number[]>([]);
  const [shake, setShake] = useState<number | null>(null);
  const [misses, setMisses] = useState(0);
  const next = expected[done.length];
  const complete = done.length === expected.length;
  const tap = (i: number) => {
    if (done.includes(i) || complete) return;
    if (i === next) setDone((d) => [...d, i]);
    else { setShake(i); setMisses((m) => m + 1); window.setTimeout(() => setShake(null), 450); }
  };
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <div className="flex items-center justify-between rounded-2xl border-2 border-teal-100 bg-white px-3 py-2 text-sm font-black text-teal-800">
        <span>👆 <Rich text="المس الأحداث بالترتيب الزمني" /></span>
        <span aria-live="polite"><Rich text={`${done.length}/${expected.length}`} /></span>
      </div>
      <div className="grid gap-2">
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
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-right transition active:scale-[0.98] ${
                isDone ? "border-emerald-300 bg-emerald-50" : shake === i ? "shake border-rose-400 bg-rose-50" : "border-slate-200 bg-white hover:border-teal-300"
              }`}
            >
              <span className={`font-head grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold text-white ${isDone ? "bg-emerald-600" : "bg-slate-400"}`}>
                {isDone ? rank + 1 : "؟"}
              </span>
              <span className="min-w-0 flex-1">
                <En className={`block text-base font-black ${isDone ? "text-emerald-900" : "text-slate-800"}`}>{it.en}</En>
                <Rich text={it.ar} className="block text-xs font-bold text-slate-500" />
              </span>
              {isDone && <span className="text-lg" aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>
      {done.length > 0 && !complete && (
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-2.5 text-sm font-bold text-emerald-900">
          ✓ <Rich text={whys[done.length - 1]} />
        </div>
      )}
      {misses > 0 && !complete && (
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-2.5 text-sm font-bold text-amber-800">
          💡 <Rich text="ليس هذا — فكّر: أي حدث وقع أولًا في الزمن الحقيقي؟" />
        </div>
      )}
      {complete && (
        <div className="space-y-2">
          <div className="tada rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-2.5 text-center text-sm font-black text-emerald-900">
            🎉 <Rich text="ترتيب صحيح كامل! راجع الأسباب:" />
          </div>
          {children}
        </div>
      )}
    </div>
  );
}

/** آلة اختيار الزمن: 4 أسئلة نعم/لا — الحكم يتحدث لحظيًا. */
const MACHINE_QS = [
  { key: "event", ar: "هل هو حدث مكتمل في الماضي؟", en: "A finished past event?" },
  { key: "ongoing", ar: "هل كان مستمرًا عند لحظة ماضية؟", en: "Ongoing at a past moment?" },
  { key: "before", ar: "هل اكتمل قبل حدث ماضٍ آخر؟", en: "Finished before another past event?" },
  { key: "duration", ar: "هل استمر لفترة قبل حدث ماضٍ آخر؟", en: "Continued for a while before another past event?" },
] as const;

function TenseMachine({ seq, sentence }: { seq: string; sentence?: string }) {
  const [ans, setAns] = useState<Record<string, boolean>>({});
  const answered = MACHINE_QS.filter((q) => ans[q.key] !== undefined).length;
  const verdict: Lens30 | null =
    ans.duration === true ? "ppc" : ans.before === true ? "pp" : ans.ongoing === true ? "pc" : answered === 4 ? "ps" : null;
  return (
    <div data-en-seq={seq} className="space-y-2.5 rounded-3xl border-2 border-slate-200 bg-white p-3.5">
      {sentence && (
        <div className="rounded-2xl bg-slate-900 p-3 text-center">
          <En className="text-lg font-black text-white">{sentence}</En>
        </div>
      )}
      <div className="grid gap-2">
        {MACHINE_QS.map((q, i) => (
          <div key={q.key} className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2.5">
            <Nub n={i + 1} className="bg-teal-700" />
            <div className="min-w-0 flex-1">
              <Rich text={q.ar} className="block text-sm font-black text-slate-800" />
              <En className="block text-xs font-bold text-slate-400">{q.en}</En>
            </div>
            <div className="flex gap-1.5">
              <button type="button" onClick={() => setAns((a) => ({ ...a, [q.key]: true }))} aria-pressed={ans[q.key] === true}
                className={`rounded-xl px-4 py-1.5 text-sm font-black transition active:scale-95 ${ans[q.key] === true ? "bg-emerald-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600 hover:border-emerald-300"}`}>
                نعم
              </button>
              <button type="button" onClick={() => setAns((a) => ({ ...a, [q.key]: false }))} aria-pressed={ans[q.key] === false}
                className={`rounded-xl px-4 py-1.5 text-sm font-black transition active:scale-95 ${ans[q.key] === false ? "bg-slate-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}>
                لا
              </button>
            </div>
          </div>
        ))}
      </div>
      <div aria-live="polite" className={`rounded-2xl border-2 p-3 text-center transition ${verdict ? LENS_META[verdict].soft : "border-dashed border-slate-300 bg-slate-50"}`}>
        {verdict ? (
          <div className="tada flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-black text-slate-600"><Rich text="⚙️ حكم الآلة:" /></span>
            <LensChip lens={verdict} />
            <Rich text={LENS_META[verdict].q} className={`text-sm font-black ${LENS_META[verdict].text}`} />
          </div>
        ) : (
          <Rich text={`أجب عن الأسئلة (${answered}/4) — الحكم يظهر لحظيًا…`} className="text-sm font-bold text-slate-400" />
        )}
      </div>
    </div>
  );
}

/** تصحيح بخطوتين: المس الخطأ أولًا… ثم اختر الإصلاح — تغذية فورية في كل خطوة. */
function FixItem({ n, segments, bad, fixOpts, fixAnswer, why, note, fixed }: {
  n: number; segments: string[]; bad: number; fixOpts: string[]; fixAnswer: number; why: string; note?: string; fixed: string;
}) {
  const [segPick, setSegPick] = useState<number | null>(null);
  const segOk = segPick === bad;
  const [fixPick, setFixPick] = useState<number | null>(null);
  const fixOk = fixPick === fixAnswer;
  const done = segOk && fixOk;
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
                {o}
              </button>
            ))}
          </div>
          {fixPick !== null && (
            <div className={`text-sm font-bold ${fixOk ? "text-emerald-700" : "text-rose-600"}`}>
              {fixOk ? <span className="tada inline-block">✓ <Rich text={why} /></span>
                : <span>✕ <Rich text={why} /></span>}
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

// ---------- محلّل الكتابة الحي (㊳ FINAL BOSS و ㊵ التحدي الأكبر) ----------

const V2_WORDS_30 = [
  "went", "saw", "heard", "came", "rang", "woke", "got", "ate", "left", "ran", "felt", "said", "told",
  "found", "took", "made", "gave", "stood", "sat", "began", "broke", "drove", "wrote", "read", "knew",
  "thought", "caught", "bought", "brought", "put", "lost", "met", "spoke", "fell", "held", "kept", "slept",
];

type StoryStats = { ps: number; pc: number; pp: number; ppc: number; sentences: number; words: Record<string, boolean> };

function analyzeStory(text: string): StoryStats {
  const t = ` ${text.toLowerCase().replace(/\s+/g, " ")} `;
  const ppc = (t.match(/\bhad (?:already |just |still )?been [a-z]+ing\b/g) || []).length;
  const pp = (t.match(/\bhad (?:already |just |never )?(?!been\b)[a-z]+\b/g) || []).length;
  const pc = (t.match(/\b(?:was|were) (?:still |already |just )?[a-z]+ing\b/g) || []).length;
  let ps = 0;
  const edMatches = t.match(/\b(?<!had )(?<!been )(?<!had already )(?<!had just )(?<!had never )[a-z]{3,}ed\b/g) || [];
  ps += edMatches.length;
  for (const v2 of V2_WORDS_30) {
    const re = new RegExp(`\\b(?<!had )(?<!been )(?<!had already )(?<!had just )(?<!had never )${v2}\\b`, "g");
    ps += (t.match(re) || []).length;
  }
  ps += (t.match(/\b(?:was|were)\b(?! (?:still |already |just )?[a-z]+ing)/g) || []).length;
  const sentences = text.split(/[.!?؟]+/).map((s) => s.trim()).filter((s) => s.length > 1).length;
  const words: Record<string, boolean> = {};
  for (const w of CHALLENGE_WORDS_30) words[w] = t.includes(` ${w} `) || t.includes(`${w} `) || t.includes(` ${w},`);
  return { ps, pc, pp, ppc, sentences, words };
}

function Req({ label, met }: { label: ReactNode; met: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 text-sm font-bold ${met ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-500"}`}>
      <span aria-hidden>{met ? "✓" : "○"}</span>
      <span className="min-w-0">{typeof label === "string" ? <LatinRuns text={label} /> : label}</span>
    </div>
  );
}

/** كتابة حية: العدادات تتحدث أثناء الكتابة — لا زر تحقق، التحليل فوري. */
function StoryLive({ seq, mode }: { seq: string; mode: "boss" | "challenge" }) {
  const [text, setText] = useState("");
  const stats = useMemo(() => analyzeStory(text), [text]);
  const isBoss = mode === "boss";
  const reqs: { label: ReactNode; met: boolean }[] = isBoss
    ? [
        { label: <>تبدأ بـ <En>When the firefighters arrived</En></>, met: text.trim().toLowerCase().startsWith("when the firefighters arrived") },
        { label: <Rich text="① Past Simple — فعل ماضٍ واحد على الأقل" />, met: stats.ps >= 1 },
        { label: <>② <En>Past Continuous</En> — <En>was/were + verb-ing</En></>, met: stats.pc >= 1 },
        { label: <>③ <En>Past Perfect</En> — <En>had + V3</En></>, met: stats.pp >= 1 },
        { label: <>④ <En>Past Perfect Continuous</En> — <En>had been + verb-ing</En></>, met: stats.ppc >= 1 },
      ]
    : [
        { label: <>12 جملة على الأقل (الآن: {stats.sentences})</>, met: stats.sentences >= 12 },
        { label: <span dir="ltr" className="ltr-pair">4 × <En>Past Simple</En> <span dir="rtl">(الآن: {stats.ps})</span></span>, met: stats.ps >= 4 },
        { label: <span dir="ltr" className="ltr-pair">3 × <En>Past Continuous</En> <span dir="rtl">(الآن: {stats.pc})</span></span>, met: stats.pc >= 3 },
        { label: <span dir="ltr" className="ltr-pair">3 × <En>Past Perfect</En> <span dir="rtl">(الآن: {stats.pp})</span></span>, met: stats.pp >= 3 },
        { label: <span dir="ltr" className="ltr-pair">2 × <En>Past Perfect Continuous</En> <span dir="rtl">(الآن: {stats.ppc})</span></span>, met: stats.ppc >= 2 },
        ...CHALLENGE_WORDS_30.map((w) => ({ label: <>تتضمن <En>{w}</En></>, met: stats.words[w] })),
      ];
  const metCount = reqs.filter((r) => r.met).length;
  const allMet = metCount === reqs.length;
  return (
    <div data-en-seq={seq} className="space-y-2.5">
      <label className="sr-only" htmlFor={`story-${mode}`}>{isBoss ? "إكمال قصة الإطفائيين" : "قصة اليوم الغامض"}</label>
      <textarea
        id={`story-${mode}`}
        dir="ltr"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isBoss ? BOSS_STARTER_30 : "One strange morning, I woke up and..."}
        rows={isBoss ? 5 : 8}
        className="font-en w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-left text-base font-semibold leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-400"
      />
      <div className="flex flex-wrap items-center gap-2">
        <div aria-live="polite" className={`rounded-xl px-3 py-2 text-sm font-black ${allMet ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-600"}`} role="status">
          {allMet ? "🏆 كل المتطلبات محققة — أحسنت!" : `تحقق ${metCount} من ${reqs.length} متطلبات — تُحدَّث حيًا أثناء الكتابة.`}
        </div>
        <button type="button" onClick={() => setText("")} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ مسح</button>
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2">
        {reqs.map((r, i) => <Req key={i} label={r.label} met={r.met} />)}
      </div>
    </div>
  );
}

// ============================================================
// خطوات الدرس — البداية والنظام والأزمنة والطبقات والمقارنات
// ============================================================

function CoverStep() {
  const [lens, setLens] = useState<Lens30>("ps");
  const examples: Record<Lens30, { en: string; ar: string }> = {
    ps: { en: "I opened the door.", ar: "فتحت الباب." },
    pc: { en: "I was opening the door.", ar: "كنت أفتح الباب." },
    pp: { en: "I had opened the door before the lights went out.", ar: "كنت قد فتحت الباب قبل أن تنطفئ الأضواء." },
    ppc: { en: "I had been opening boxes for an hour before the lights went out.", ar: "كنت أفتح الصناديق لمدة ساعة قبل أن تنطفئ الأضواء." },
  };
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-teal-100 bg-gradient-to-br from-teal-600 via-cyan-700 to-indigo-800 p-6 text-center text-white shadow-lg md:p-10">
        <div className="text-5xl anim-drift md:text-6xl">🎛️</div>
        <En className="mt-3 block text-2xl font-black uppercase tracking-widest text-teal-200 md:text-3xl">{LAB_NAME_30}</En>
        <h1 className="font-head mt-2 text-2xl font-black md:text-4xl">{LESSON_TITLE_30}</h1>
        <p className="mt-3 text-base font-semibold text-teal-100 md:text-xl">{LESSON_SUBTITLE_30}</p>
        <div dir="ltr" className="ltr-row mx-auto mt-4 max-w-2xl rounded-2xl bg-white/10 p-3">
          <En className="text-sm font-bold text-white md:text-base">{LAB_MOTTO_30}</En>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-black">
          <span className="rounded-full bg-white/15 px-4 py-1.5">📄 46 خطوة</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5">🧪 20 سؤال اختبار</span>
          <span className="rounded-full bg-white/15 px-4 py-1.5">🎛️ 4 مناطق</span>
        </div>
      </div>
      <Lab emoji="🎥" label="Four Lenses Preview" ar="العدسات الأربع — بدّل بينها لتشاهد النظام" seq="l30-cover">
        <div className="flex flex-wrap justify-center gap-2">
          {LENSES.map((l) => <LensChip key={l} lens={l} active={lens === l} onClick={() => setLens(l)} />)}
        </div>
        <div className={`mt-3 rounded-2xl border-2 p-4 text-center transition ${LENS_META[lens].soft}`}>
          <div className="text-3xl">{LENS_META[lens].emoji}</div>
          <En className={`mt-1 block text-xl font-black ${LENS_META[lens].text}`}>{examples[lens].en}</En>
          <Rich text={examples[lens].ar} className="mt-1 block text-sm font-bold text-slate-600" />
          <div className="mt-2 text-sm font-black text-slate-700"><EnAr en={LENS_META[lens].qEn} sep="—" ar={LENS_META[lens].q} enClassName="font-black" /></div>
        </div>
      </Lab>
      <SignatureGhost />
    </div>
  );
}

function OpeningStep() {
  const [open, setOpen] = useState<Lens30 | null>(null);
  const cards: { lens: Lens30; num: string; ar: string }[] = [
    { lens: "ps", num: "①", ar: "ماذا حدث؟" },
    { lens: "pc", num: "②", ar: "ماذا كان يحدث؟" },
    { lens: "pp", num: "③", ar: "ماذا كان قد حدث قبل حدث ماضٍ آخر؟" },
    { lens: "ppc", num: "④", ar: "ماذا كان مستمرًا لفترة قبل حدث ماضٍ آخر؟" },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🧭" text="وصلنا الآن إلى نقطة مهمة جدًا: حتى الدرس 29 أصبح لدينا نظام كامل من أزمنة الماضي — أربعة أزمنة تعمل معًا." />
      <Lab emoji="🗂️" label="The Full System" ar="النظام الكامل — المس كل زمن لتكشف سؤاله" seq="l30-opening">
        <div className="grid gap-2 sm:grid-cols-2">
          {cards.map((c) => (
            <button key={c.lens} type="button" onClick={() => setOpen((o) => (o === c.lens ? null : c.lens))} aria-pressed={open === c.lens}
              className={`rounded-2xl border-2 p-3 text-center transition active:scale-[0.98] ${open === c.lens ? LENS_META[c.lens].soft : "border-slate-200 bg-white hover:border-teal-300"}`}>
              <div className="text-sm font-black text-slate-400">{c.num}</div>
              <div className="mt-1 flex justify-center"><LensChip lens={c.lens} size="sm" /></div>
              <div className={`mt-2 text-sm font-black ${open === c.lens ? LENS_META[c.lens].text : "text-slate-400"}`}>
                {open === c.lens ? <><EnAr en={LENS_META[c.lens].qEn} sep="—" ar={c.ar} /></> : "؟؟؟"}
              </div>
            </button>
          ))}
        </div>
      </Lab>
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-4 text-center">
        <p className="text-base font-black text-teal-900 md:text-lg">لذلك لن نضيف زمنًا جديدًا الآن — سنبني «نظام تحكم» كاملًا تختار به الزمن الصحيح من المعنى، لا من الكلمات المحفوظة فقط.</p>
      </div>
      <PlatformPanel title="لماذا «نظام تحكم»؟">
        <Rich text="الفكرة: بدل حفظ كل زمن وحده، نتدرّب على سؤال واحد قبل كل جملة: ما الذي أريد قوله؟ حدث؟ مشهد؟ فلاش باك؟ نشاط ممتد؟ الجواب هو الذي يختار الزمن." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

const OBJECTIVES_30 = [
  "التمييز بين الأزمنة الأربعة بسرعة.",
  "قراءة قصة وتحديد الزمن المناسب لكل فعل.",
  "ترتيب عدة أحداث على خط زمني.",
  "استخدام when و while و before و after و by the time بشكل صحيح.",
  "معرفة متى يكون Past Perfect ضروريًا ومتى لا نحتاجه.",
  "معرفة الفرق بين النتيجة والنشاط والمدة.",
  "اكتشاف الأخطاء المتقدمة.",
  "دمج الأزمنة الأربعة في قصة واحدة.",
  "التعامل مع أسئلة IQ200 التي لا تعطيك الإجابة بشكل مباشر.",
  "الاستعداد للانتقال إلى مرحلة الأزمنة المستقبلية لاحقًا بعد تثبيت نظام الماضي.",
];

function ObjectivesStep() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const count = Object.values(checked).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <Note emoji="🎯" text="بنهاية هذا الدرس يجب أن تستطيع:" />
      <Lab emoji="✅" label="Your Goals" ar="علّم على كل هدف بعد قراءته" seq="l30-objectives">
        <div className="mb-3 flex items-center justify-between rounded-2xl border-2 border-teal-100 bg-white px-3 py-2 text-sm font-black text-teal-800">
          <span>🎯 <Rich text="أهدافي" /></span>
          <span aria-live="polite"><Rich text={`${count}/10`} /></span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {OBJECTIVES_30.map((obj, i) => (
            <button key={i} type="button" onClick={() => setChecked((p) => ({ ...p, [i]: !p[i] }))} aria-pressed={checked[i] === true}
              className={`flex items-start gap-2.5 rounded-2xl border-2 p-3 text-right transition active:scale-[0.98] ${checked[i] ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-teal-300"}`}>
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-black text-white ${checked[i] ? "bg-emerald-600" : "bg-slate-300"}`}>{checked[i] ? "✓" : i + 1}</span>
              <LatinRuns text={obj} />
            </button>
          ))}
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ① النظام الكامل ----------------
function S1_SystemStep() {
  const [done, setDone] = useState(0);
  const qs = [
    { stem: "I opened the door.", stemAr: "فتحت الباب.", answer: 0, why: "حدث ماضٍ واحد مكتمل — 📸 Past Simple: ماذا حدث؟" },
    { stem: "I was opening the door.", stemAr: "كنت أفتح الباب.", answer: 1, why: "نشاط مستمر في لحظة ماضية — 🎥 Past Continuous: ماذا كان يحدث؟" },
    { stem: "I had opened the door before the lights went out.", stemAr: "كنت قد فتحت الباب قبل أن تنطفئ الأضواء.", answer: 2, why: "حدث اكتمل قبل حدث ماضٍ آخر — ⏪ Past Perfect." },
    { stem: "I had been opening boxes for an hour before the lights went out.", stemAr: "كنت أفتح الصناديق لمدة ساعة قبل أن تنطفئ الأضواء.", answer: 3, why: "نشاط استمر لمدة قبل حدث ماضٍ آخر — ⏪🎥 Past Perfect Continuous." },
  ];
  const opts = ["ماذا حدث؟", "ماذا كان يحدث في تلك اللحظة؟", "ماذا كان قد حدث قبل حدث ماضٍ آخر؟", "ما النشاط الذي كان مستمرًا لفترة قبل حدث ماضٍ آخر؟"];
  return (
    <div className="space-y-4">
      <Note emoji="🖼️" text="لنبدأ من الصورة الكبرى: أربع جمل عن فتح الباب — لكل جملة سؤال واحد فقط يناسبها." />
      <Lab emoji="🧠" label="Match The Question" ar="طابِق كل جملة مع سؤالها" seq="l30-s1">
        <div className="space-y-2.5">
          {qs.map((q, i) => (
            <McqRow key={i} n={i + 1} stem={q.stem} stemAr={q.stemAr} opts={opts} answer={q.answer} why={q.why} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 4 && (
        <SourceReveal seq="l30-reveal-s1">
          <div className="text-sm font-bold leading-relaxed text-emerald-900">
            <Rich text="الصورة الكبرى: 📸 حدث → 🎥 مستمر عند لحظة → ⏪ مكتمل قبل حدث → ⏪🎥 مستمر لفترة قبل حدث. هذه الأسئلة الأربعة هي مفتاح الدرس كله." />
          </div>
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ② آلة اختيار الزمن ----------------
function S2_MachineStep() {
  const [sentence, setSentence] = useState(0);
  const sentences = [
    "I opened the door.",
    "I was opening the door.",
    "I had opened the door before the lights went out.",
    "I had been opening boxes for an hour before the lights went out.",
  ];
  return (
    <div className="space-y-4">
      <Note emoji="⚙️" text="عندما ترى جملة جديدة، لا تحفظ الزمن — اسأل أربعة أسئلة بالترتيب:" />
      <Lab emoji="⚙️" label="Tense Machine" ar="اختر جملة… ثم أجب بنعم/لا وشاهد الحكم" seq="l30-s2">
        <div className="mb-3 flex flex-wrap justify-center gap-2">
          {sentences.map((s, i) => (
            <button key={i} type="button" onClick={() => setSentence(i)} aria-pressed={sentence === i}
              className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${sentence === i ? "border-teal-500 bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}>
              {s}
            </button>
          ))}
        </div>
        <TenseMachine key={sentence} seq="l30-s2-machine" sentence={sentences[sentence]} />
      </Lab>
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
        <p className="text-base font-black text-slate-800 md:text-lg">هذه هي «آلة اختيار الزمن»: حدث؟ → 📸 · مستمر عند لحظة؟ → 🎥 · قبل حدث آخر؟ → ⏪ · مستمر لفترة قبل حدث؟ → ⏪🎥</p>
      </div>
    </div>
  );
}

// ---------------- ③ Past Simple ----------------
function S3_PSStep() {
  const items = [
    { en: "He looked outside.", ar: "نظر إلى الخارج." },
    { en: "He smiled.", ar: "ابتسم." },
    { en: "Leo opened the window.", ar: "فتح Leo النافذة." },
    { en: "He saw a bird.", ar: "رأى طائرًا." },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="📸" text="Past Simple يروي الأحداث — قصة Leo أربعة أحداث متتابعة:" />
      <Lab emoji="⛓️" label="Event Chain" ar="رتّب أحداث Leo بالترتيب" seq="l30-s3">
        <TapOrder
          seq="l30-s3-order"
          items={items}
          expected={[2, 0, 3, 1]}
          whys={[
            "opened أولًا — فتح النافذة هو بداية السلسلة.",
            "looked ثانيًا — بعد الفتح نظر إلى الخارج.",
            "saw ثالثًا — فرأى الطائر.",
            "smiled أخيرًا — فابتسم.",
          ]}
        >
          <div className="grid gap-1.5 sm:grid-cols-2">
            {["① opened", "② looked", "③ saw", "④ smiled"].map((v, i) => (
              <div key={i} className="rounded-xl border-2 border-orange-200 bg-orange-50 px-3 py-2 text-center"><En className="text-sm font-black text-orange-900">{v}</En></div>
            ))}
          </div>
        </TapOrder>
      </Lab>
      <Lab emoji="❓" label="Why No Had?" ar="سؤال الفهم" seq="l30-s3-why">
        <McqRow n={1} stemAr="لا نحتاج إلى Past Perfect هنا — لماذا؟" opts={["لأن القصة تسير إلى الأمام خطوة بخطوة", "لأن الأحداث وقعت قبل حدث ماضٍ آخر", "لأن الجمل تتضمن مدة زمنية"]} answer={0} why="سلسلة متتابعة إلى الأمام = Past Simple فقط، ولا رجوع للوراء يستدعي had." />
      </Lab>
    </div>
  );
}

// ---------------- ④ Past Continuous ----------------
function S4_PCStep() {
  const [done, setDone] = useState(0);
  const scenes = [
    { stem: "Leo was sitting near the window.", answer: 1, why: "جلوس مستمر يرسم المشهد — 🎥 خلفية." },
    { stem: "The wind was blowing.", answer: 1, why: "الريح تهب في الخلفية — 🎥 مشهد حي." },
    { stem: "Birds were singing.", answer: 1, why: "الطيور تغني — 🎥 خلفية صوتية للمشهد." },
    { stem: "People were walking in the street.", answer: 1, why: "الناس يمشون — 🎥 جزء من المشهد لا حدث يدفع القصة." },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🎥" text="Past Continuous يصنع المشهد — حدث يدفع القصة؟ أم خلفية؟" />
      <Lab emoji="🎬" label="Scene Or Event?" ar="صنّف كل جملة: حدث أم خلفية؟" seq="l30-s4">
        <div className="space-y-2.5">
          {scenes.map((s, i) => (
            <McqRow key={i} n={i + 1} stem={s.stem} opts={["حدث يدفع القصة إلى الأمام", "خلفية / مشهد"]} answer={s.answer} why={s.why} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 4 && (
        <SourceReveal seq="l30-reveal-s4">
          <Rich text="هذه ليست أحداثًا تدفع القصة إلى الأمام بالضرورة — إنها الخلفية." className="block text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑤ Past Perfect ----------------
function S5_PPStep() {
  const [pick, setPick] = useState<string | null>(null);
  const verbs = [
    { v: "opened", label: "الحدث الرئيسي", ok: false },
    { v: "realized", label: "حدث رئيسي", ok: false },
    { v: "had broken", label: "حدث وقع قبل لحظة الإدراك", ok: true },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="⏪" text="Past Perfect يرجع خطوة إلى الوراء — فلاش باك داخل القصة:" />
      <SentenceCard
        parts={[P("Leo", "s"), P("opened", "v2"), P("the window", "obj"), P("and", "conn"), P("realized", "v2"), P("that someone", "s"), P("had", "had"), P("broken", "v3"), P("the glass.", "obj")]}
        roles={R30}
        ar="فتح Leo النافذة وأدرك أن شخصًا ما كان قد كسر الزجاج."
      />
      <Lab emoji="⏪" label="Find The Flashback" ar="المس الفعل الذي وقع أولًا في الزمن الحقيقي" seq="l30-s5">
        <TimeTrack segs={[{ lens: "pp", label: "had broken" }, { lens: "ps", label: "opened + realized" }]} />
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {verbs.map((v) => (
            <button key={v.v} type="button" onClick={() => setPick(v.v)}
              className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-95 ${
                pick === v.v ? (v.ok ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-800 hover:border-violet-300"
              }`}>
              {v.v}
            </button>
          ))}
        </div>
        {pick !== null && (
          <div className={`mt-3 rounded-2xl border-2 p-3 text-center text-sm font-bold ${verbs.find((v) => v.v === pick)?.ok ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-rose-300 bg-rose-50 text-rose-700"}`}>
            {verbs.find((v) => v.v === pick)?.ok
              ? <span className="tada inline-block">✓ <EnAr en="had broken" sep="—" ar="حدث وقع قبل لحظة الإدراك. إذن Past Perfect يعمل مثل فلاش باك." /></span>
              : <span>✕ <Rich text="هذا حدث رئيسي في زمن القصة — ابحث عن الفعل الذي وقع قبل لحظة الإدراك." /></span>}
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- ⑥ Past Perfect Continuous ----------------
function S6_PPCStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⏪🎥" text="Past Perfect Continuous يرجع إلى نشاط كان مستمرًا قبل نقطة ماضية:" />
      <SentenceCard
        parts={[P("Leo", "s"), P("was", "was"), P("tired", "obj"), P("because", "conn"), P("he", "s"), P("had", "had"), P("been", "been"), P("working", "ving"), P("all night.", "dur")]}
        roles={R30}
        ar="كان Leo متعبًا لأنه كان يعمل طوال الليل."
        note="المدة + النتيجة = بصمة هذا الزمن"
      />
      <Lab emoji="🔍" label="State Or Activity?" ar="حدّد دور كل جزء" seq="l30-s6">
        <div className="space-y-2.5">
          <McqRow n={1} stem="was tired" opts={["حالة", "نشاط استمر لفترة قبل ذلك"]} answer={0} why="was tired حالة ونتيجة — 📸 Past Simple من verb to be." />
          <McqRow n={2} stem="had been working all night" opts={["حدث رئيسي", "نشاط استمر لفترة قبل ذلك"]} answer={1} why="عمل مستمر طوال الليل قبل لحظة التعب — ⏪🎥 Past Perfect Continuous." />
        </div>
      </Lab>
      <PlatformPanel title="بصمة الزمن">
        <Rich text="عندما ترى مدة (all night / for an hour / since morning) + أثرًا في نقطة ماضية، فكّر فورًا بـ Past Perfect Continuous." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ⑦ الخط الزمني — Maya ----------------
function S7_MayaStep() {
  const items = [
    { en: "Maya arrived.", ar: "وصلت Maya إلى المحطة." },
    { en: "The train had left.", ar: "القطار كان قد غادر." },
    { en: "People were waiting.", ar: "الناس كانوا ينتظرون قطارًا آخر." },
    { en: "A man had been standing for an hour.", ar: "رجل بدأ الانتظار واستمر لأكثر من ساعة." },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🕰️" text="لنأخذ مثالًا قويًا — قصة محطة Maya:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">When Maya arrived at the station, the train had already left. People were waiting for another train, and one man had been standing there for more than an hour.</En>
      </div>
      <Lab emoji="🕰️" label="Maya Timeline" ar="رتّب الأحداث من الأقدم إلى الأحدث" seq="l30-s7">
        <TapOrder
          seq="l30-s7-order"
          items={items}
          expected={[1, 3, 0, 2]}
          whys={[
            "① القطار غادر أولًا — قبل وصول الجميع (had left).",
            "② الرجل بدأ الانتظار واستمر لأكثر من ساعة (had been standing).",
            "③ وصلت Maya — الحدث الرئيسي الذي تُقاس عليه بقية الأزمنة.",
            "④ الناس كانوا ينتظرون — مشهد مستمر عند لحظة الوصول.",
          ]}
        >
          <TimeTrack segs={[
            { lens: "pp", label: "train left" },
            { lens: "ppc", label: "man waiting…", wide: true },
            { lens: "ps", label: "Maya arrived" },
            { lens: "pc", label: "people waiting" },
          ]} />
        </TapOrder>
      </Lab>
      <Note emoji="⚠️" text="لاحظ أن الزمن لا يعني دائمًا أن الأحداث يمكن وضعها في خط بسيط واحد؛ بعض الأنشطة تتداخل." />
      <PlatformPanel title="لماذا تتداخل الأنشطة؟">
        <Rich text="انتظار الرجل (ساعة كاملة) يتداخل مع مغادرة القطار ووصول Maya وانتظار الناس — النشاط الممتد شريط طويل يعبر فوق الأحداث، لا نقطة واحدة على الخط." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ⑧ العمود الفقري ----------------
function S8_BackboneStep() {
  const items = [
    { en: "I ate breakfast.", ar: "تناولت الفطور." },
    { en: "I walked to school.", ar: "مشيت إلى المدرسة." },
    { en: "I woke up.", ar: "استيقظت." },
    { en: "I left home.", ar: "غادرت المنزل." },
    { en: "I got dressed.", ar: "ارتديت ملابسي." },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🦴" text="لماذا Past Simple مهم جدًا؟ لأنه العمود الفقري للقصة:" />
      <Lab emoji="🦴" label="Story Backbone" ar="ابنِ صباح القصة حدثًا حدثًا" seq="l30-s8">
        <TapOrder
          seq="l30-s8-order"
          items={items}
          expected={[2, 4, 0, 3, 1]}
          whys={[
            "استيقظت أولًا — بداية اليوم.",
            "ثم ارتديت ملابسك.",
            "ثم تناولت الفطور.",
            "ثم غادرت المنزل.",
            "ثم مشيت إلى المدرسة — سلسلة مكتملة.",
          ]}
        >
          <SourceReveal seq="l30-reveal-s8">
            <Rich text="هذه أحداث متتابعة — كلها Past Simple. العمود الفقري للقصة يُبنى بهذا الزمن." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </TapOrder>
      </Lab>
    </div>
  );
}

// ---------------- ⑨ أضف الخلفية ----------------
function S9_BackgroundStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🎥" text="الآن نضيف طبقة الخلفية فوق العمود الفقري:" />
      <SentenceCard
        parts={[P("I", "s"), P("was", "was"), P("walking", "ving"), P("to school", "obj"), P("when", "conn"), P("I", "s"), P("heard", "v2"), P("a strange sound.", "obj")]}
        roles={R30}
        ar="كنت أمشي إلى المدرسة عندما سمعت صوتًا غريبًا."
      />
      <Lab emoji="🎥" label="Background + Event" ar="أي الفعلين خلفية؟ وأيهما الحدث؟" seq="l30-s9">
        <div className="space-y-2.5">
          <McqRow n={1} stem="was walking" opts={["الحدث", "الخلفية"]} answer={1} why="نشاط مستمر يدور في الخلفية — 🎥 Past Continuous." />
          <McqRow n={2} stem="heard" opts={["الحدث", "الخلفية"]} answer={0} why="سماع مفاجئ يقطع المشهد — 📸 Past Simple." />
        </div>
      </Lab>
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
        <p className="mb-2 text-sm font-black text-slate-700">هذه هي أشهر تركيبة:</p>
        <FormulaStrip items={["Past Continuous", "+", "when", "+", "Past Simple"]} tone="amber" />
      </div>
    </div>
  );
}

// ---------------- ⑩ أضف Past Perfect ----------------
function S10_AddPPStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⏪" text="الآن نضيف طبقة ثالثة — فلاش باك داخل القصة:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">I was walking to school when I heard a strange sound. I realized that I had left my phone at home.</En>
      </div>
      <Lab emoji="⏪" label="Three Layers" ar="حدّد زمن كل فعل — واكتشف الفلاش باك" seq="l30-s10">
        <DetectiveQuiz
          seq="l30-s10-detect"
          items={[
            { verb: "was walking", tense: "pc", why: "خلفية مستمرة — 🎥 Past Continuous." },
            { verb: "heard", tense: "ps", why: "حدث مفاجئ — 📸 Past Simple." },
            { verb: "realized", tense: "ps", why: "حدث الإدراك — 📸 Past Simple." },
            { verb: "had left", tense: "pp", why: "نسيان الهاتف وقع قبل لحظة الإدراك — ⏪ Past Perfect: حدث أقدم من لحظة الإدراك." },
          ]}
        >
          <SourceReveal seq="l30-reveal-s10">
            <Rich text="was walking ← خلفية · heard ← حدث · realized ← حدث · had left ← حدث أقدم من لحظة الإدراك." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
    </div>
  );
}

// ---------------- ⑪ أضف Past Perfect Continuous ----------------
function S11_AddPPCStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⏪🎥" text="الآن أصبحت القصة أكثر تعقيدًا — ستة أفعال بأزمنة أربعة:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">I was walking to school when I heard a strange sound. I realized that I had left my phone at home. I was tired because I had been walking for forty minutes.</En>
      </div>
      <Lab emoji="🕵️" label="Six Verbs Detective" ar="حدّد زمن كل فعل من الستة" seq="l30-s11">
        <DetectiveQuiz
          seq="l30-s11-detect"
          items={[
            { verb: "was walking", tense: "pc", why: "خلفية القصة — 🎥 Past Continuous." },
            { verb: "heard", tense: "ps", why: "حدث السماع — 📸 Past Simple." },
            { verb: "realized", tense: "ps", why: "حدث الإدراك — 📸 Past Simple." },
            { verb: "had left", tense: "pp", why: "ترك الهاتف قبل الإدراك — ⏪ Past Perfect." },
            { verb: "was tired", tense: "ps", why: "حالة التعب — 📸 Past Simple / حالة." },
            { verb: "had been walking", tense: "ppc", why: "مشي مستمر لأربعين دقيقة قبل لحظة التعب — ⏪🎥 Past Perfect Continuous." },
          ]}
        >
          <SourceReveal seq="l30-reveal-s11">
            <Rich text="was walking ← Past Continuous · heard ← Past Simple · realized ← Past Simple · had left ← Past Perfect · was tired ← Past Simple / حالة · had been walking ← Past Perfect Continuous." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
    </div>
  );
}

// ---------------- ⑫ أربع عدسات ----------------
function S12_LensesStep() {
  const [lens, setLens] = useState<Lens30>("ps");
  const meta: Record<Lens30, string> = {
    ps: "صورة لحدث.",
    pc: "فيديو لشيء يحدث.",
    pp: "رجوع إلى حدث أقدم.",
    ppc: "رجوع إلى نشاط كان مستمرًا.",
  };
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="فكر بالأزمنة كأنها أربع كاميرات — هذه الطريقة أقوى من حفظ الجداول:" />
      <Lab emoji="📷" label="Four Cameras" ar="اختر الكاميرا لتشاهد ما تصوّره" seq="l30-s12">
        <div className="flex flex-wrap justify-center gap-2">
          {LENSES.map((l) => <LensChip key={l} lens={l} active={lens === l} onClick={() => setLens(l)} />)}
        </div>
        <div className={`tada mt-3 rounded-2xl border-2 p-4 text-center ${LENS_META[lens].soft}`} key={lens}>
          <div className="text-4xl">{LENS_META[lens].emoji}</div>
          <Rich text={meta[lens]} className={`mt-1 block text-lg font-black ${LENS_META[lens].text}`} />
          <Rich text={LENS_META[lens].q} className="mt-1 block text-sm font-bold text-slate-600" />
        </div>
      </Lab>
      <Lab emoji="🎯" label="Shoot With The Right Camera" ar="صوّر كل جملة بالعدسة الصحيحة" seq="l30-s12-quiz">
        <div className="space-y-2.5">
          <McqRow n={1} stem="Leo smiled." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect", "⏪🎥 Past Perfect Continuous"]} answer={0} why="حدث واحد مكتمل — 📸 صورة لحدث." />
          <McqRow n={2} stem="Birds were singing." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect", "⏪🎥 Past Perfect Continuous"]} answer={1} why="مشهد مستمر — 🎥 فيديو لشيء يحدث." />
          <McqRow n={3} stem="Someone had broken the glass." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect", "⏪🎥 Past Perfect Continuous"]} answer={2} why="كسر وقع قبل لحظة الاكتشاف — ⏪ رجوع إلى حدث أقدم." />
          <McqRow n={4} stem="He had been working all night." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect", "⏪🎥 Past Perfect Continuous"]} answer={3} why="عمل مستمر طوال الليل قبل نقطة ماضية — ⏪🎥 رجوع إلى نشاط كان مستمرًا." />
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ⑬ PS vs PP — مفتاح had ----------------
function S13_HadSwitchStep() {
  const [hasHad, setHasHad] = useState(false);
  return (
    <div className="space-y-4">
      <Note emoji="🔀" text="قارن — نفس الكلمات تقريبًا… لكن had واحدة قد تقلب ترتيب الأحداث:" />
      <Lab emoji="🔀" label="The Had Switch" ar="أضف had وأزلها — وشاهد الترتيب ينقلب" seq="l30-s13">
        <div className="flex justify-center">
          <button type="button" onClick={() => setHasHad((h) => !h)} aria-pressed={hasHad}
            className={`rounded-2xl border-2 px-6 py-3 text-lg font-black transition active:scale-95 ${hasHad ? "border-violet-400 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"}`}>
            <En>had</En> {hasHad ? "✓ موجودة" : "○ محذوفة"}
          </button>
        </div>
        <div className="mt-3 rounded-2xl bg-slate-900 p-4 text-center" dir="ltr">
          <En className="text-xl font-black text-white">When I arrived, Sara {hasHad ? "had " : ""}left.</En>
        </div>
        <div className="mt-3" key={String(hasHad)}>
          <TimeTrack segs={hasHad
            ? [{ lens: "pp", label: "Sara left ①" }, { lens: "ps", label: "I arrived ②" }]
            : [{ lens: "ps", label: "I arrived ①" }, { lens: "ps", label: "Sara left ②" }]} />
        </div>
        <div className="mt-3 grid gap-2 text-center sm:grid-cols-2">
          <div className={`rounded-2xl border-2 p-3 ${hasHad ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-slate-50 opacity-60"}`}>
            <En className="block text-sm font-black text-violet-900">Sara left → I arrived.</En>
            <Rich text="مع had: Sara غادرت أولًا" className="mt-1 block text-xs font-bold text-slate-600" />
          </div>
          <div className={`rounded-2xl border-2 p-3 ${!hasHad ? "border-orange-300 bg-orange-50" : "border-slate-200 bg-slate-50 opacity-60"}`}>
            <En className="block text-sm font-black text-orange-900">I arrived → Sara left.</En>
            <Rich text="بدون had: وصلتُ أولًا ثم غادرت Sara" className="mt-1 block text-xs font-bold text-slate-600" />
          </div>
        </div>
        <div className="mt-3" key={`q-${hasHad}`}>
          <McqRow n={1} stemAr="من حدث أولًا؟" opts={["I arrived", "Sara left"]} answer={hasHad ? 1 : 0} why={hasHad ? "had left تعني أن المغادرة اكتملت قبل الوصول." : "بدون had: وصلتُ أولًا ثم غادرت Sara."} />
        </div>
      </Lab>
      <SourceReveal seq="l30-reveal-s13">
        <Rich text="إذن: had ليست مجرد إضافة شكلية — إنها قد تغيّر ترتيب الأحداث." className="block text-center text-sm font-black text-emerald-900" />
      </SourceReveal>
    </div>
  );
}

// ---------------- ⑭ PC vs PPC ----------------
function S14_FocusBusStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🔀" text="قارن — نفس الموقف… لكن التركيز مختلف تمامًا:" />
      <div className="grid gap-2 md:grid-cols-2">
        <SentenceCard
          parts={[P("I", "s"), P("was", "was"), P("waiting", "ving"), P("when the bus", "obj"), P("arrived.", "v2")]}
          roles={R30} ar="كنت أنتظر عندما وصلت الحافلة."
        />
        <SentenceCard
          parts={[P("I", "s"), P("had", "had"), P("been", "been"), P("waiting", "ving"), P("for forty minutes", "dur"), P("when the bus", "obj"), P("arrived.", "v2")]}
          roles={R30} ar="كنت أنتظر منذ أربعين دقيقة عندما وصلت الحافلة."
        />
      </div>
      <Lab emoji="🎯" label="What Is The Focus?" ar="طابِق كل سؤال مع الجملة التي تجيب عنه" seq="l30-s14">
        <div className="space-y-2.5">
          <McqRow n={1} stemAr="التركيز: ماذا كنت أفعل عند وصول الحافلة؟" opts={["I was waiting when the bus arrived.", "I had been waiting for forty minutes when the bus arrived."]} answer={0} why="السؤال عن النشاط عند اللحظة — 🎥 Past Continuous." />
          <McqRow n={2} stemAr="التركيز: منذ متى كنت أنتظر؟" opts={["I was waiting when the bus arrived.", "I had been waiting for forty minutes when the bus arrived."]} answer={1} why="السؤال عن المدة قبل اللحظة — ⏪🎥 Past Perfect Continuous." />
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ⑮ PP vs PPC ----------------
function S15_KitchenStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🔀" text="قارن — المطبخ في الحالتين… لكن القصة مختلفة:" />
      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50/60 p-3 text-center">
          <div className="text-3xl">✨</div>
          <En className="mt-1 block text-base font-black text-violet-900">She had cleaned the kitchen before the guests arrived.</En>
          <Rich text="التركيز: المطبخ أصبح نظيفًا." className="mt-1 block text-sm font-bold text-slate-600" />
        </div>
        <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-3 text-center">
          <div className="text-3xl">🧽</div>
          <En className="mt-1 block text-base font-black text-teal-900">She had been cleaning the kitchen for two hours before the guests arrived.</En>
          <Rich text="التركيز: كانت عملية التنظيف مستمرة لمدة ساعتين." className="mt-1 block text-sm font-bold text-slate-600" />
        </div>
      </div>
      <Lab emoji="🎯" label="Result Or Process?" ar="نتيجة مكتملة أم عملية مستمرة؟" seq="l30-s15">
        <div className="space-y-2.5">
          <McqRow n={1} stemAr="التركيز: المطبخ أصبح نظيفًا (نتيجة)." opts={["She had cleaned the kitchen…", "She had been cleaning the kitchen…"]} answer={0} why="النتيجة المكتملة — ⏪ Past Perfect." />
          <McqRow n={2} stemAr="التركيز: عملية التنظيف كانت مستمرة لساعتين." opts={["She had cleaned the kitchen…", "She had been cleaning the kitchen…"]} answer={1} why="العملية + المدة — ⏪🎥 Past Perfect Continuous." />
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ⑯ النتيجة أم النشاط؟ ----------------
function S16_ResultActivityStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="قاعدة «النتيجة أم النشاط؟» — حدّد تركيزك أولًا، ثم اختر الزمن:" />
      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-violet-300 bg-violet-50 p-4 text-center">
          <div className="text-3xl">🏁</div>
          <Rich text="إذا كان التركيز على: ماذا تم إنجازه؟" className="mt-1 block text-base font-black text-violet-900" />
          <div className="mt-2 flex justify-center"><LensChip lens="pp" size="sm" /></div>
        </div>
        <div className="rounded-3xl border-2 border-teal-300 bg-teal-50 p-4 text-center">
          <div className="text-3xl">🏃</div>
          <Rich text="إذا كان التركيز على: ما النشاط الذي كان مستمرًا؟ وكم استمر؟" className="mt-1 block text-base font-black text-teal-900" />
          <div className="mt-2 flex justify-center"><LensChip lens="ppc" size="sm" /></div>
        </div>
      </div>
      <Lab emoji="🖌️" label="Painted Wall Lab" ar="الحائط مطلي — لكن ما تركيزك؟" seq="l30-s16">
        <div className="space-y-2.5">
          <McqRow n={1} stemAr="التركيز: ماذا تم إنجازه؟ (الحائط مطلي)" opts={["He had painted the wall.", "He had been painting the wall for three hours."]} answer={0} why="النتيجة: الحائط مطلي — ⏪ Past Perfect." />
          <McqRow n={2} stemAr="التركيز: عملية الطلاء + المدة (ثلاث ساعات)" opts={["He had painted the wall.", "He had been painting the wall for three hours."]} answer={1} why="التركيز: عملية الطلاء + المدة — ⏪🎥 Past Perfect Continuous." />
        </div>
      </Lab>
    </div>
  );
}
// ============================================================
// خطوات الدرس — كلمات الربط والمحقق وIQ200 والتصحيح
// ============================================================

// ---------------- ⑰ لا تعتمد على كلمة واحدة ----------------
function S17_YesterdayStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🚨" text="هذا مهم جدًا في مستوى IQ200: كلمة yesterday لا تعني تلقائيًا Past Simple!" />
      <Lab emoji="📅" label="Yesterday Lab" ar="نفس الكلمة… ثلاثة أزمنة — صنّفها" seq="l30-s17">
        <div className="space-y-2.5">
          <McqRow n={1} stem="I visited my aunt yesterday." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect"]} answer={0} why="زيارة مكتملة أمس — 📸 Past Simple." onFirstAnswer={() => setDone((d) => d + 1)} />
          <McqRow n={2} stem="At 8:00 yesterday, I was visiting my aunt." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect"]} answer={1} why="ساعة محددة + نشاط مستمر عندها — 🎥 Past Continuous." onFirstAnswer={() => setDone((d) => d + 1)} />
          <McqRow n={3} stem="Before I went to bed yesterday, I had finished my homework." opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect"]} answer={2} why="إنهاء الواجب قبل النوم — ⏪ Past Perfect." onFirstAnswer={() => setDone((d) => d + 1)} />
        </div>
      </Lab>
      {done >= 3 && (
        <SourceReveal seq="l30-reveal-s17">
          <Rich text="إذن الكلمة الزمنية وحدها لا تختار الزمن — المعنى هو الذي يختار الزمن." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑱ when ----------------
function S18_WhenStep() {
  const [done, setDone] = useState(0);
  const rows = [
    { stem: "When I arrived, Tom left.", answer: 0, why: "غادر بعد وصولي — 📸 Past Simple + Past Simple." },
    { stem: "When I arrived, Tom was sleeping.", answer: 1, why: "كان نائمًا لحظة وصولي — 📸 Past Simple + 🎥 Past Continuous." },
    { stem: "When I arrived, Tom had left.", answer: 2, why: "غادر قبل وصولي — 📸 Past Simple + ⏪ Past Perfect." },
    { stem: "When I arrived, Tom had been sleeping for two hours.", answer: 3, why: "نوم مستمر لساعتين قبل وصولي — 📸 Past Simple + ⏪🎥 Past Perfect Continuous." },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="هذه نقطة مهمة جدًا: when جاءت مع الأزمنة الأربعة كلها — حدّد زمن فعل Tom في كل جملة:" />
      <Lab emoji="🔗" label="When Lab" ar="أربع جمل بـ when — أربعة أزمنة مختلفة" seq="l30-s18">
        <div className="space-y-2.5">
          {rows.map((r, i) => (
            <McqRow key={i} n={i + 1} stem={r.stem} opts={["📸 Past Simple", "🎥 Past Continuous", "⏪ Past Perfect", "⏪🎥 Past Perfect Continuous"]} answer={r.answer} why={r.why} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 4 && (
        <SourceReveal seq="l30-reveal-s18">
          <Rich text="إذن: when لا يحدد الزمن — المعنى هو الذي يحدد الزمن." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ⑲ while ----------------
function S19_WhileStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="while غالبًا ترتبط بنشاط مستمر — لكن بأي نمط؟" />
      <Lab emoji="🔗" label="While Patterns" ar="لكل جملة: نشاطان متوازيان أم نشاط وحدث؟" seq="l30-s19">
        <div className="space-y-2.5">
          <McqRow n={1} stem="While I was studying, my brother was playing video games." opts={["نشاطان مستمران", "نشاط مستمر + حدث"]} answer={0} why="أدرس… وأخي يلعب — نشاطان مستمران بالتوازي." />
          <McqRow n={2} stem="While I was walking home, I saw an old friend." opts={["نشاطان مستمران", "نشاط مستمر + حدث"]} answer={1} why="المشي مستمر… ورؤية الصديق حدث قطعه." />
          <McqRow n={3} stem="While they were eating, someone knocked on the door." opts={["نشاطان مستمران", "نشاط مستمر + حدث"]} answer={1} why="الأكل مستمر… والطرق على الباب حدث مفاجئ." />
        </div>
      </Lab>
      <PlatformPanel title="صورة ذهنية">
        <Rich text="تخيّل while كشريطين: إما شريطان متوازيان مستمران (was studying + was playing)، أو شريط طويل يقطعه مسمار (was walking + saw)." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ⑳ before / after ----------------
function S20_BeforeAfterStep() {
  const [form, setForm] = useState<0 | 1>(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="يمكن أن نستخدم before و after مع أكثر من تركيب — والصيغتان صحيحتان:" />
      <Lab emoji="🔀" label="Before Switch" ar="بدّل بين الصيغتين — الترتيب لا يتغير" seq="l30-s20">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setForm(0)} aria-pressed={form === 0}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition active:scale-95 ${form === 0 ? "border-orange-400 bg-orange-500 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"}`}>
            <En>Past Simple + Past Simple</En>
          </button>
          <button type="button" onClick={() => setForm(1)} aria-pressed={form === 1}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition active:scale-95 ${form === 1 ? "border-violet-400 bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"}`}>
            <En>Past Perfect + Past Simple</En>
          </button>
        </div>
        <div className="mt-3 rounded-2xl bg-slate-900 p-4 text-center" dir="ltr" key={form}>
          <En className="text-lg font-black text-white md:text-xl">I {form === 1 ? "had " : ""}finished my homework before I watched TV.</En>
        </div>
        <div className="mt-3">
          <TimeTrack segs={[{ lens: "ps", label: "finished homework ①" }, { lens: "ps", label: "watched TV ②" }]} />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Verdict ok en="I finished my homework before I watched TV." why="Past Simple + Past Simple" />
          <Verdict ok en="I had finished my homework before I watched TV." why="Past Perfect + Past Simple" />
        </div>
      </Lab>
      <SourceReveal seq="l30-reveal-s20">
        <Rich text="كلاهما ممكن بحسب السياق. لا تحفظ: before = Past Perfect — هذا خطأ." className="block text-center text-sm font-black text-emerald-900" />
      </SourceReveal>
    </div>
  );
}

// ---------------- ㉑ by the time ----------------
function S21_ByTheTimeStep() {
  return (
    <div className="space-y-4">
      <Note emoji="⏳" text="غالبًا نرى: By the time + Past Simple — ثم Past Perfect للحدث المكتمل قبلها:" />
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-4 text-center">
        <FormulaStrip items={["By the time", "+", "Past Simple", "→", "Past Perfect"]} tone="teal" />
      </div>
      <Lab emoji="⏳" label="Deadline Lab" ar="المس الجزء المكتمل قبل الموعد في كل جملة" seq="l30-s21">
        <div className="space-y-2.5">
          <McqRow n={1} stem="By the time we arrived, the store had closed." opts={["we arrived", "the store had closed"]} answer={1} why="الإغلاق اكتمل قبل وصولنا — ⏪ Past Perfect." />
          <McqRow n={2} stem="By the time the game started, the players had warmed up." opts={["the game started", "the players had warmed up"]} answer={1} why="الإحماء اكتمل قبل بداية المباراة — ⏪ Past Perfect." />
          <McqRow n={3} stem="By the time I woke up, everyone had left." opts={["I woke up", "everyone had left"]} answer={1} why="غادروا قبل استيقاظي — ⏪ Past Perfect." />
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ㉒ already ----------------
function S22_AlreadyStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="already تساعد في إبراز أن الحدث كان قد اكتمل قبل نقطة ماضية:" />
      <SentenceCard
        parts={[P("When we arrived,", "conn"), P("the concert", "s"), P("had", "had"), P("already", "already"), P("begun.", "v3")]}
        roles={R30}
        ar="عندما وصلنا، كان الحفل قد بدأ بالفعل."
      />
      <Lab emoji="📍" label="Already Spot" ar="أين تقف already في الجملة؟" seq="l30-s22">
        <McqRow n={1} stemAr="اختر الموضع الصحيح:" context="When we arrived, the concert had ___ begun."
          opts={["had already begun", "already had begun", "had begun already"]} answer={0}
          why="موضعها الذهبي بين had والفعل: had already begun — تُبرز الاكتمال المبكر." />
      </Lab>
    </div>
  );
}

// ---------------- ㉓ still ----------------
function S23_StillStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="still = ما يزال / لا يزال — روح الاستمرار:" />
      <SentenceCard
        parts={[P("When I arrived,", "conn"), P("they", "s"), P("were", "was"), P("still working.", "ving")]}
        roles={R30}
        ar="عندما وصلت، كانوا يعملون وما زالوا في منتصف العمل."
      />
      <Note emoji="🌀" text="مثال أكثر تعقيدًا — يجمع المدة والاستمرار معًا:" />
      <SentenceCard
        parts={[P("When I arrived,", "conn"), P("they", "s"), P("had", "had"), P("been", "been"), P("working", "ving"), P("for five hours", "dur"), P("and", "conn"), P("were still working.", "ving")]}
        roles={R30}
        ar="عندما وصلت، كانوا يعملون منذ خمس ساعات وما زالوا يعملون."
      />
      <Lab emoji="🔍" label="Still Lab" ar="حدّد دور كل جزء في الجملة المعقدة" seq="l30-s23">
        <div className="space-y-2.5">
          <McqRow n={1} stem="had been working for five hours" opts={["المدة حتى تلك اللحظة", "النشاط كان مستمرًا في تلك اللحظة"]} answer={0} why="خمس ساعات عمل قبل وصولي — ⏪🎥 المدة حتى تلك اللحظة." />
          <McqRow n={2} stem="were still working" opts={["المدة حتى تلك اللحظة", "النشاط كان مستمرًا في تلك اللحظة"]} answer={1} why="ما زالوا في منتصف العمل لحظة وصولي — 🎥 still تُبرز الاستمرار." />
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ㉔ المحقق — فريق الإنقاذ ----------------
function S24_RescueStep() {
  const items: DetectivePick[] = DETECTIVE_RESCUE_30.map((d) => ({ verb: d.verb, tense: tenseKey(d.tense), why: d.role ?? "", role: undefined }));
  return (
    <div className="space-y-4">
      <Note emoji="🕵️" text="اقرأ قصة الإنقاذ… ثم حدّد زمن كل فعل:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">When the rescue team arrived, the villagers were standing near the river. They had been waiting for help for several hours because the water had already reached the main road.</En>
      </div>
      <Lab emoji="🕵️" label="Rescue Detective" ar="أربعة أفعال — حدّد زمن كل فعل" seq="l30-s24">
        <DetectiveQuiz seq="l30-s24-detect" items={items}>
          <SourceReveal seq="l30-reveal-s24">
            <div className="text-sm font-bold leading-relaxed text-emerald-900">
              <Rich text="التحليل: وصل الفريق · كان القرويون واقفين · كانوا ينتظرون منذ عدة ساعات · وكانت المياه قد وصلت إلى الطريق قبل وصول الفريق." />
            </div>
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
    </div>
  );
}

// ---------------- ㉕ اختبار 1 ----------------
const QUIZ1_WHY = [
  "نشاط مستمر لحظة الدخول (ماذا كان يحدث؟) — was talking.",
  "المغادرة اكتملت قبل الوصول — had left.",
  "الإنهاك سببه نشاط ممتد طوال الصباح — had been running.",
  "حدث ماضٍ واحد مع yesterday بلا مقارنة — finished.",
  "ساعة محددة + نشاط مستمر عندها — was watching.",
];
function S25_Quiz1Step() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧪" text="اختبار 1 — اختر الزمن: خمسة أسئلة، والتفسير يظهر فور كل إجابة." />
      <Lab emoji="🧪" label="Choose The Tense" ar="أجب — كل سؤال يعلّمك فورًا" seq="l30-s25">
        <div className="space-y-2.5">
          {QUIZ1_30.map((q, i) => (
            <McqRow key={i} n={i + 1} stem={q.q.replace(/^① |^② |^③ |^④ |^⑤ /, "")} opts={q.opts} answer={q.answer} why={QUIZ1_WHY[i]} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 5 && (
        <SourceReveal seq="l30-reveal-s25">
          <Rich text="الإجابات: ① B · ② A · ③ A · ④ B · ⑤ C." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉖ اختبار 2 ----------------
function S26_Quiz2Step() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🧪" text="اختبار 2 — اختر حسب المعنى: ثلاث جمل عربية متشابهة جدًا… وثلاثة أزمنة مختلفة!" />
      <Lab emoji="🧪" label="Meaning Chooses" ar="كان ينام / كان قد نام / نائم منذ ساعتين" seq="l30-s26">
        <div className="space-y-2.5">
          {QUIZ2_30.map((q, i) => (
            <McqRow key={i} n={i + 1} stemAr={q.q} opts={q.opts} answer={q.answer} why={q.note ?? ""} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 3 && (
        <SourceReveal seq="l30-reveal-s26">
          <Rich text="الإجابات: 1 ← B (نصف ما كان يحدث عند الوصول) · 2 ← A (حدوث النوم قبل وصولي) · 3 ← C (التركيز على المدة)." className="block text-sm font-bold leading-relaxed text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉗ لا يوجد زمن واحد صحيح دائمًا ----------------
function S27_NoSingleStep() {
  const [done, setDone] = useState(0);
  const rows = [
    { stemAr: "المعنى: «عندما وصلت، كانوا يتناولون العشاء.»", answer: 1, why: "الأفضل: were eating — نصف ما كان يحدث لحظة الوصول." },
    { stemAr: "المعنى: «عندما وصلت، كانوا قد تناولوا العشاء.»", answer: 2, why: "الأفضل: had eaten — العشاء اكتمل قبل الوصول." },
    { stemAr: "المعنى: «عندما وصلت، كانوا قد أمضوا ساعة وهم يتناولون العشاء.»", answer: 3, why: "الأفضل: had been eating for an hour — نشاط مستمر لمدة قبل الوصول." },
  ];
  const opts = ["they ate dinner", "they were eating dinner", "they had eaten dinner", "they had been eating dinner for an hour"];
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="هذه نقطة متقدمة جدًا: When I arrived, they ate dinner يمكن أن تكون صحيحة في سياق معين — لكن المعنى المقصود يغيّر كل شيء:" />
      <Lab emoji="🎯" label="Meaning Picks Tense" ar="اختر المعنى… ثم الزمن المناسب له" seq="l30-s27">
        <div className="space-y-2.5">
          {rows.map((r, i) => (
            <McqRow key={i} n={i + 1} stemAr={r.stemAr} context="When I arrived, ___." opts={opts} answer={r.answer} why={r.why} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 3 && (
        <SourceReveal seq="l30-reveal-s27">
          <Rich text="المعنى يحدد الزمن — نفس الموقف، أربعة معانٍ، أربعة أزمنة." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㉘ ثلاثة أحداث — Nora ----------------
function S28_NoraStep() {
  const items: DetectivePick[] = DETECTIVE_NORA_30.map((d) => ({ verb: d.verb, tense: tenseKey(d.tense), why: d.role ?? "" }));
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="حلّل جملة Nora — جملة واحدة بأربع علاقات زمنية مختلفة:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">When Nora entered the kitchen, her mother was cooking, her father had already washed the dishes, and her brother had been preparing dessert for an hour.</En>
      </div>
      <Lab emoji="🔥" label="Four Relations" ar="حدّد زمن كل فعل — وعلاقته بدخول Nora" seq="l30-s28">
        <DetectiveQuiz seq="l30-s28-detect" items={items}>
          <SourceReveal seq="l30-reveal-s28">
            <Rich text="entered ← حدث رئيسي · was cooking ← نشاط مستمر عند وصول Nora · had already washed ← غسل الصحون اكتمل قبل وصولها · had been preparing ← تحضير الحلوى كان مستمرًا لمدة ساعة قبل وصولها." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
    </div>
  );
}

// ---------------- ㉙ الخوارزمية ----------------
function S29_AlgoStep() {
  const [open, setOpen] = useState<number | null>(0);
  const steps = [
    { q: "هل هو حدث ماضٍ عادي؟", en: "I woke up.", lens: "ps" as Lens30, verdict: "نعم ← Past Simple." },
    { q: "هل كان يحدث في لحظة معينة؟", en: "I was walking to school.", lens: "pc" as Lens30, verdict: "نعم ← Past Continuous." },
    { q: "هل حدث قبل حدث ماضٍ آخر؟", en: "I had left my phone at home.", lens: "pp" as Lens30, verdict: "نعم ← Past Perfect." },
    { q: "هل كان مستمرًا لفترة قبل حدث ماضٍ آخر؟", en: "I had been walking for forty minutes.", lens: "ppc" as Lens30, verdict: "نعم ← Past Perfect Continuous." },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="⚡" text="كيف تختار الزمن خلال ثانيتين؟ استخدم هذه الخوارزمية — امشِ على الخطوات بالترتيب:" />
      <Lab emoji="⚡" label="Two Second Algorithm" ar="المس كل خطوة لتكشف سؤالها ومثالها" seq="l30-s29">
        <div className="space-y-2">
          {steps.map((s, i) => (
            <div key={i} className={`rounded-2xl border-2 transition ${open === i ? LENS_META[s.lens].soft : "border-slate-200 bg-white"}`}>
              <button type="button" onClick={() => setOpen((o) => (o === i ? null : i))} aria-pressed={open === i} className="flex w-full items-center gap-3 p-3 text-right">
                <Nub n={i + 1} className="bg-teal-700" />
                <Rich text={s.q} className="flex-1 text-base font-black text-slate-800" />
                <span className="text-slate-400">{open === i ? "▲" : "▼"}</span>
              </button>
              {open === i && (
                <div className="space-y-2 px-3 pb-3">
                  <div className="rounded-xl bg-slate-900 p-2.5 text-center" dir="ltr"><En className="text-base font-black text-white">{s.en}</En></div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <Rich text={s.verdict} className={`text-sm font-black ${LENS_META[s.lens].text}`} />
                    <LensChip lens={s.lens} size="sm" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Lab>
      <PlatformPanel title="لماذا تعمل الخوارزمية؟">
        <Rich text="لأنها تسأل من الخاص إلى العام: المدة أولًا (أندر حالة)، ثم الأقدمية، ثم الاستمرارية، ثم الحدث العادي — أول «نعم» تحسم الزمن." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ㉚ Boss Battle — Sam ----------------
function S30_SamStep() {
  const items: DetectivePick[] = DETECTIVE_SAM_30.map((d) => ({ verb: d.verb, tense: tenseKey(d.tense), why: d.role ?? "" }));
  return (
    <div className="space-y-4">
      <Note emoji="⚔️" text="Boss Battle — اقرأ قصة Sam… ثم حدّد كل زمن:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">At 7:30 yesterday, Sam was driving home. He had finished work an hour earlier. He had been working since early morning, so he was exhausted. While he was driving, his phone rang.</En>
      </div>
      <Lab emoji="⚔️" label="Sam Boss Battle" ar="خمسة أفعال — انتبه للفخ: was وحدها!" seq="l30-s30">
        <DetectiveQuiz seq="l30-s30-detect" items={items}>
          <SourceReveal seq="l30-reveal-s30">
            <Rich text="was driving ← Past Continuous · had finished ← Past Perfect · had been working ← Past Perfect Continuous · was ← Past Simple من verb to be · rang ← Past Simple." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
    </div>
  );
}

// ---------------- ㉛ خط الزمن ----------------
function S31_TimelineStep() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const nodes: { label: string; en?: string; lens?: Lens30; role?: string }[] = [
    { label: "بدأ العمل" },
    { label: "استمر العمل", en: "had been working", lens: "ppc", role: "المدة والنشاط." },
    { label: "انتهى العمل", en: "had finished", lens: "pp", role: "الحدث الأقدم المكتمل." },
    { label: "بعد ساعة" },
    { label: "القيادة", en: "Sam was driving", lens: "pc", role: "الخلفية." },
    { label: "رن الهاتف", en: "phone rang", lens: "ps", role: "الحدث المفاجئ." },
    { label: "NOW" },
  ];
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="يمكن رسم قصة Sam — المس كل عقدة لتكتشف زمنها ودورها:" />
      <Lab emoji="📉" label="Sam Timeline" ar="خط الزمن من الماضي الأقدم إلى الآن" seq="l30-s31">
        <div className="relative space-y-1 pr-6">
          <div className="absolute bottom-4 right-[9px] top-4 w-1 rounded-full bg-slate-200" aria-hidden />
          {nodes.map((n, i) => (
            <div key={i} className="relative">
              <span className={`absolute -right-6 top-3 h-4 w-4 rounded-full border-2 border-white shadow ${n.lens ? LENS_META[n.lens].bar : "bg-slate-300"}`} aria-hidden />
              <button type="button" onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} aria-pressed={open[i] === true}
                className={`w-full rounded-2xl border-2 p-2.5 text-right transition active:scale-[0.99] ${open[i] && n.lens ? LENS_META[n.lens].soft : "border-slate-200 bg-white hover:border-teal-300"}`}>
                <Rich text={n.label} className="block text-sm font-black text-slate-800" />
                {n.en && <En className="mt-0.5 block text-sm font-bold text-slate-500">{n.en}</En>}
                {open[i] && n.lens && (
                  <span className="mt-1.5 flex flex-wrap items-center gap-2">
                    <LensChip lens={n.lens} size="sm" />
                    {n.role && <Rich text={n.role} className={`text-xs font-black ${LENS_META[n.lens].text}`} />}
                  </span>
                )}
                {open[i] && !n.lens && <Rich text="نقطة زمنية — ليست فعلًا." className="mt-1 block text-xs font-bold text-slate-400" />}
              </button>
              {i < nodes.length - 1 && <div className="py-0.5 text-center text-xs text-slate-300" aria-hidden>↓</div>}
            </div>
          ))}
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ㉜ صحح الأخطاء ----------------
const FIX_SEGMENTS: { seg: string[]; bad: number; why: string }[] = [
  { seg: ["I", "had been", "studied", "for three hours."], bad: 2, why: "بعد had been يأتي verb-ing: studying." },
  { seg: ["She", "was waiting", "for two hours", "when he arrived."], bad: 1, why: "المدة (ساعتين) تستدعي had been waiting — ولاحظ أن المصدر ينتقل إلى I في التصحيح." },
  { seg: ["When we arrived,", "the movie", "had started", "already."], bad: 3, why: "already في الموضع الخطأ — مكانها بين had والفعل: had already started." },
  { seg: ["He", "had went", "home", "before I called."], bad: 1, why: "بعد had يأتي V3: gone لا went." },
  { seg: ["They", "had been knowing", "each other", "for ten years."], bad: 1, why: "know فعل حالة لا يقبل الاستمرارية: had known." },
  { seg: ["Did", "you had finished", "your work?"], bad: 0, why: "مساعد واحد فقط في السؤال — نحذف Did ونبدأ بـ Had." },
];
function S32_FixStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🩺" text="صحّح — ست جمل مكسورة: المس الجزء الخاطئ أولًا… ثم اختر الإصلاح." />
      <Lab emoji="🩺" label="Fix It Lab" ar="خطوتان لكل جملة: أين الخطأ؟ وما الإصلاح؟" seq="l30-s32">
        <div className="space-y-2.5">
          {ERRORS_30.map((e, i) => (
            <FixItem
              key={i}
              n={i + 1}
              segments={FIX_SEGMENTS[i].seg}
              bad={FIX_SEGMENTS[i].bad}
              fixOpts={e.opts}
              fixAnswer={e.answer}
              why={FIX_SEGMENTS[i].why}
              fixed={e.opts[e.answer]}
              note={e.sourceNote ? "لكن انتبه: إذا كان المقصود فقط «كنت أنتظر عندما وصل» تكفي I was waiting when he arrived — أما إذا أردنا مدة ساعتين فنقول I had been waiting for two hours when he arrived." : undefined}
            />
          ))}
        </div>
      </Lab>
      <PlatformPanel title="البصمة المشتركة للأخطاء">
        <Rich text="خمسة من الأخطاء الستة في الصيغة نفسها: ما يأتي بعد had / had been. احفظ الصيغتين: had + V3 · had been + verb-ing — وستتجنب معظم الأخطاء." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ㉝ السؤال الخادع ----------------
function S33_TrickStep() {
  const [withDur, setWithDur] = useState(true);
  return (
    <div className="space-y-4">
      <Note emoji="🚀" text="IQ200 — السؤال الخادع: for an hour تغيّر كل شيء!" />
      <Lab emoji="🚀" label="Trick Question" ar="أضف المدة وأزلها — وشاهد الإجابة تتغير" seq="l30-s33">
        <div className="flex justify-center">
          <button type="button" onClick={() => setWithDur((v) => !v)} aria-pressed={withDur}
            className={`rounded-2xl border-2 px-6 py-2.5 text-base font-black transition active:scale-95 ${withDur ? "border-teal-400 bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}>
            <En>for an hour</En> {withDur ? "✓ موجودة" : "○ محذوفة"}
          </button>
        </div>
        <div className="mt-3" key={String(withDur)}>
          <McqRow
            n={1}
            stem={withDur ? "When I arrived, Sarah ______ for an hour." : "When I arrived, Sarah ______."}
            opts={["A) studied", "B) was studying", "C) had been studying"]}
            answer={withDur ? 2 : 1}
            why={withDur ? "أفضل إجابة: C — for an hour مدة امتدت حتى نقطة ماضية." : "بدون المدة: was studying — إذا كان التركيز على ما كانت تفعله لحظة وصولي."}
          />
        </div>
      </Lab>
    </div>
  );
}

// ---------------- ㉞ سؤال أصعب ----------------
function S34_HarderStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="سؤال أصعب: كل واحدة يمكن أن تعطي معنى مختلفًا في سياق مناسب — لا تسأل «ما الإجابة؟» بل «ما المعنى المقصود؟»" />
      <Lab emoji="🧠" label="Sarah Report Lab" ar="اختر المعنى المقصود أولًا… ثم الزمن" seq="l30-s34">
        <div className="space-y-2.5">
          <McqRow n={1} stemAr="المعنى: «كانت قد أنهت التقرير قبل وصولي.»" context="When I arrived, Sarah ___ the report." opts={["A) finished", "B) was finishing", "C) had finished", "D) had been finishing"]} answer={2} why="إنهاء مكتمل قبل الوصول ← C." />
          <McqRow n={2} stemAr="المعنى: «كانت في عملية إنهاء التقرير عندما وصلت.»" context="When I arrived, Sarah ___ the report." opts={["A) finished", "B) was finishing", "C) had finished", "D) had been finishing"]} answer={1} why="عملية جارية لحظة الوصول ← B." />
          <McqRow n={3} stemAr="المعنى: «كانت تعمل على إنهاء التقرير لفترة قبل وصولي.»" context="When I arrived, Sarah ___ the report." opts={["A) finished", "B) was finishing", "C) had finished", "D) had been finishing"]} answer={3} why="عمل مستمر لفترة قبل الوصول ← D." />
        </div>
      </Lab>
      <SourceReveal seq="l30-reveal-s34">
        <Rich text="وهنا يظهر الفرق الحقيقي بين الأزمنة: الزمن ليس مجرد قاعدة؛ إنه زاوية نظر إلى الحدث." className="block text-center text-sm font-black text-emerald-900" />
      </SourceReveal>
    </div>
  );
}

// ---------------- ㉟ focus ----------------
function S35_FocusStep() {
  const [done, setDone] = useState(0);
  const rows = [
    { stemAr: "التركيز: الإنجاز.", answer: 0, why: "الإنجاز ← He painted the house." },
    { stemAr: "التركيز: النشاط في تلك اللحظة.", answer: 1, why: "النشاط في تلك اللحظة ← He was painting the house." },
    { stemAr: "التركيز: الإنجاز قبل نقطة ماضية.", answer: 2, why: "الإنجاز قبل نقطة ماضية ← He had painted the house." },
    { stemAr: "التركيز: النشاط والمدة قبل نقطة ماضية.", answer: 3, why: "النشاط والمدة قبل نقطة ماضية ← He had been painting the house for three hours." },
  ];
  const opts = ["He painted the house.", "He was painting the house.", "He had painted the house.", "He had been painting the house for three hours."];
  return (
    <div className="space-y-4">
      <Note emoji="🎯" text="مستوى متقدم: focus = التركيز — نفس الحدث يمكن أن ننظر إليه من زوايا مختلفة:" />
      <Lab emoji="🎯" label="Focus Lab" ar="حدّد زاوية النظر… ثم اختر الجملة" seq="l30-s35">
        <div className="space-y-2.5">
          {rows.map((r, i) => (
            <McqRow key={i} n={i + 1} stemAr={r.stemAr} opts={opts} answer={r.answer} why={r.why} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 4 && (
        <SourceReveal seq="l30-reveal-s35">
          <Rich text="أربع زوايا لنفس الحدث: إنجاز · نشاط لحظي · إنجاز قبل نقطة · نشاط ومدة قبل نقطة — المعنى هو عدستك." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}
// ============================================================
// خطوات الدرس — القصة السينمائية والتحديات والخاتمة
// ============================================================

// ---------------- ㊱ القصة السينمائية — Lina ----------------
function S36_LinaStep() {
  const whys: Record<string, string> = {
    "were searching": "بحث مستمر في المشهد — 🎥 Past Continuous.",
    "had already locked": "الإغلاق اكتمل قبل نقطة القصة — ⏪ Past Perfect.",
    "had broken": "الكسر وقع قبل نقطة القصة — ⏪ Past Perfect.",
    "had been searching": "بحث مستمر منذ ساعة تقريبًا قبل الملاحظة — ⏪🎥 Past Perfect Continuous.",
    noticed: "حدث الملاحظة يحرّك القصة — 📸 Past Simple.",
    came: "حدث مفاجئ يحرّك القصة — 📸 Past Simple.",
  };
  const items: DetectivePick[] = DETECTIVE_LINA_30.map((d) => ({ verb: d.verb, tense: tenseKey(d.tense), why: whys[d.verb] ?? "" }));
  return (
    <div className="space-y-4">
      <Note emoji="🎬" text="اقرأ المشهد السينمائي… ثم حدّد زمن كل فعل:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">When Lina entered the old library, several students were searching through the shelves. The librarian had already locked one of the rooms because someone had broken a window. Lina noticed that the students had been searching for almost an hour. Suddenly, a loud noise came from upstairs.</En>
      </div>
      <Lab emoji="🎬" label="Cinema Detective" ar="ستة أفعال في مشهد واحد" seq="l30-s36">
        <DetectiveQuiz seq="l30-s36-detect" items={items}>
          <SourceReveal seq="l30-reveal-s36">
            <Rich text="were searching ← Past Continuous · had already locked ← Past Perfect · had broken ← Past Perfect · had been searching ← Past Perfect Continuous · noticed ← Past Simple · came ← Past Simple." className="block text-sm font-bold leading-relaxed text-emerald-900" />
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
    </div>
  );
}

// ---------------- ㊲ لماذا هذه القصة قوية؟ ----------------
function S37_FunctionsStep() {
  const [lens, setLens] = useState<Lens30>("ps");
  const funcs: Record<Lens30, { fn: string; ex: string }> = {
    ps: { fn: "يحرك القصة.", ex: "noticed · came" },
    pc: { fn: "يصف المشهد.", ex: "were searching" },
    pp: { fn: "يشرح ما حدث قبل نقطة القصة.", ex: "had already locked · had broken" },
    ppc: { fn: "يشرح نشاطًا استمر لفترة قبل نقطة القصة.", ex: "had been searching" },
  };
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="لماذا قصة Lina قوية؟ لأن كل زمن له وظيفة — المس كل زمن لتكتشف وظيفته ومثاله:" />
      <Lab emoji="🧩" label="Tense Functions" ar="الزمن والوظيفة والمثال من القصة" seq="l30-s37">
        <div className="flex flex-wrap justify-center gap-2">
          {LENSES.map((l) => <LensChip key={l} lens={l} active={lens === l} onClick={() => setLens(l)} />)}
        </div>
        <div className={`tada mt-3 rounded-2xl border-2 p-4 text-center ${LENS_META[lens].soft}`} key={lens}>
          <div className="text-3xl">{LENS_META[lens].emoji}</div>
          <Rich text={funcs[lens].fn} className={`mt-1 block text-lg font-black ${LENS_META[lens].text}`} />
          <En className="mt-1 block text-sm font-bold text-slate-600">{funcs[lens].ex}</En>
        </div>
      </Lab>
      <Note emoji="✍️" text="وهذه بالضبط الطريقة التي تستخدم بها الأزمنة في الكتابة الحقيقية." />
    </div>
  );
}

// ---------------- ㊳ FINAL BOSS ----------------
function S38_BossStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🏆" text="FINAL BOSS — أكمل القصة بنفسك، ويجب أن تستخدم الأزمنة الأربعة:" />
      <div className="rounded-2xl bg-slate-900 p-4 text-center" dir="ltr">
        <En className="text-xl font-black text-white">{BOSS_STARTER_30}</En>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[LENSES[0], LENSES[1], LENSES[2], LENSES[3]].map((l, i) => (
          <div key={l} className={`flex items-center gap-2 rounded-2xl border-2 p-2.5 ${LENS_META[l].soft}`}>
            <Nub n={i + 1} className="bg-teal-700" />
            <LensChip lens={l} size="sm" />
          </div>
        ))}
      </div>
      <Lab emoji="🏆" label="Final Boss Arena" ar="اكتب — المحلل يفحص نصك حيًا" seq="l30-s38">
        <StoryLive seq="l30-s38-write" mode="boss" />
      </Lab>
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-4">
        <p className="mb-2 text-sm font-black text-slate-600">مثال هيكل فقط (لا تنسخه — اكتب قصتك الخاصة):</p>
        <En className="block text-sm font-semibold leading-relaxed text-slate-500">When the firefighters arrived, people were standing outside the building. The fire had already reached the second floor, and several firefighters had been preparing their equipment for several minutes. Then...</En>
      </div>
      <PlatformPanel title="كيف يفحصك المحلل؟">
        <Rich text="يفحص الأنماط آليًا: had been + verb-ing · had + V3 · was/were + verb-ing · أفعال الماضي البسيط الشائعة — وهو مساعد تقريبي، والمراجعة النهائية للمعنى مع معلمك." className="block text-sm font-semibold leading-relaxed text-slate-700" />
      </PlatformPanel>
    </div>
  );
}

// ---------------- ㊴ الاختبار النهائي ----------------
const FINAL_WHY = [
  "المعنى العادي «كانت تطبخ» — نشاط مستمر لحظة الوصول: B.",
  "كانت قد أنهت الطبخ قبل وصولي (before I arrived): C.",
  "for two hours مدة قبل نقطة ماضية: D.",
  "By the time + Past Simple ثم Past Perfect للمكتمل قبلها: C.",
  "التعب سببه عمل مستمر طوال اليوم: D.",
  "حدث واحد مع yesterday بلا مقارنة أو لحظة محددة: A.",
  "ساعة محددة + نشاط مستمر عندها: C.",
  "التنظيف قبل وصول المعلم (before): C.",
];
function S39_FinalExamStep() {
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-4">
      <Note emoji="🏆" text="الاختبار النهائي — اختر أفضل إجابة: ثمانية أسئلة بتفسير فوري." />
      <Lab emoji="🏆" label="Final Exam" ar="أثبت سيطرتك على النظام" seq="l30-s39">
        <div className="space-y-2.5">
          {FINAL_EXAM_30.map((q, i) => (
            <McqRow key={i} n={i + 1} stem={q.q} opts={q.opts} answer={q.answer} why={FINAL_WHY[i]} onFirstAnswer={() => setDone((d) => d + 1)} />
          ))}
        </div>
      </Lab>
      {done >= 8 && (
        <SourceReveal seq="l30-reveal-s39">
          <Rich text="الإجابات: ① B · ② C · ③ D · ④ C · ⑤ D · ⑥ A · ⑦ C · ⑧ C." className="block text-center text-sm font-black text-emerald-900" />
        </SourceReveal>
      )}
    </div>
  );
}

// ---------------- ㊵ التحدي الأكبر ----------------
function S40_ChallengeStep() {
  return (
    <div className="space-y-4">
      <Note emoji="🌙" text="التحدي الأكبر — اكتب 12 جملة عن يوم غامض حدث في الماضي:" />
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3 text-center"><Rich text="✅ 4 × الماضي البسيط" className="text-sm font-black text-orange-900" /></div>
        <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center"><Rich text="✅ 3 × الماضي المستمر" className="text-sm font-black text-sky-900" /></div>
        <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center"><Rich text="✅ 3 × الماضي التام" className="text-sm font-black text-violet-900" /></div>
        <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center"><Rich text="✅ 2 × التام المستمر" className="text-sm font-black text-teal-900" /></div>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-3">
        <p className="mb-2 text-center text-sm font-black text-slate-600">ويجب أن تتضمن الكلمات الثماني:</p>
        <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-1.5">
          {CHALLENGE_WORDS_30.map((w) => (
            <En key={w} className="rounded-lg border-2 border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-bold text-slate-700">{w}</En>
          ))}
        </div>
      </div>
      <Lab emoji="🌙" label="Mystery Day Arena" ar="اكتب — العدادات تمتلئ حيًا" seq="l30-s40">
        <StoryLive seq="l30-s40-write" mode="challenge" />
      </Lab>
    </div>
  );
}

// ---------------- الملخص النهائي ----------------
function SummaryStep() {
  const [lens, setLens] = useState<Lens30>("ps");
  const cards: Record<Lens30, { def: string; en: string }> = {
    ps: { def: "حدث ماضٍ.", en: "I opened the door." },
    pc: { def: "حدث كان مستمرًا في لحظة ماضية.", en: "I was opening the door when the phone rang." },
    pp: { def: "حدث اكتمل قبل حدث ماضٍ آخر.", en: "I had opened the door before the phone rang." },
    ppc: { def: "نشاط استمر لفترة قبل حدث ماضٍ آخر.", en: "I had been waiting for an hour before the bus arrived." },
  };
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="الملخص النهائي — الأزمنة الأربعة في بطاقة واحدة:" />
      <Lab emoji="🗂️" label="Final Summary" ar="بدّل العدسة لتراجع كل زمن ومثاله" seq="l30-summary">
        <div className="flex flex-wrap justify-center gap-2">
          {LENSES.map((l) => <LensChip key={l} lens={l} active={lens === l} onClick={() => setLens(l)} />)}
        </div>
        <div className={`tada mt-3 rounded-2xl border-2 p-4 text-center ${LENS_META[lens].soft}`} key={lens}>
          <div className="text-3xl">{LENS_META[lens].emoji}</div>
          <Rich text={cards[lens].def} className={`mt-1 block text-base font-black ${LENS_META[lens].text}`} />
          <div className="mx-auto mt-2 max-w-xl rounded-xl bg-slate-900 p-3" dir="ltr"><En className="text-base font-black text-white md:text-lg">{cards[lens].en}</En></div>
          <div className="mt-2 text-sm font-bold text-slate-600"><EnAr en={LENS_META[lens].qEn} sep="—" ar={LENS_META[lens].q} enClassName="font-black" /></div>
        </div>
      </Lab>
    </div>
  );
}

// ---------------- القاعدة الذهبية ----------------
function GoldenStep() {
  const [lens, setLens] = useState<Lens30 | null>(null);
  return (
    <div className="space-y-4">
      <Note emoji="🏆" text="القاعدة الذهبية الكبرى — لا تحفظ الأزمنة كأنها أربع جزر منفصلة. فكّر بالقصة:" />
      <Lab emoji="🏆" label="Golden Rule" ar="المس كل سؤال لتكشف زمنه" seq="l30-golden">
        <div className="grid gap-2 sm:grid-cols-2">
          {LENSES.map((l) => (
            <button key={l} type="button" onClick={() => setLens((o) => (o === l ? null : l))} aria-pressed={lens === l}
              className={`rounded-2xl border-2 p-3 text-center transition active:scale-[0.98] ${lens === l ? LENS_META[l].soft : "border-slate-200 bg-white hover:border-amber-300"}`}>
              <div className="text-2xl">{LENS_META[l].emoji}</div>
              <Rich text={LENS_META[l].q} className="mt-1 block text-base font-black text-slate-800" />
              <En className="mt-0.5 block text-xs font-bold text-slate-400">{LENS_META[l].qEn}</En>
              <div className="mt-2 flex justify-center">{lens === l ? <LensChip lens={l} size="sm" /> : <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs font-black text-slate-400">؟؟؟</span>}</div>
            </button>
          ))}
        </div>
      </Lab>
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
        <p className="text-base font-black text-slate-800 md:text-lg">المعنى هو الذي يختار الزمن — أربع عدسات… أربع وظائف… نظام واحد.</p>
      </div>
    </div>
  );
}

// ---------------- 🚀 التحدي النهائي ----------------
function FinalStep({ onGoTest }: { onGoTest?: () => void }) {
  const items: DetectivePick[] = DETECTIVE_FINAL_30.map((d) => ({ verb: d.verb, tense: tenseKey(d.tense), why: d.role ?? "" }));
  return (
    <div className="space-y-4">
      <Note emoji="🚀" text="IQ200 FINAL CHALLENGE — حلّل قصة المختبر:" />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">When the scientist entered the laboratory, the assistants were checking the equipment. They had already completed the first test, but they had been working on the second test for nearly three hours. Suddenly, one of the machines stopped.</En>
      </div>
      <Lab emoji="🚀" label="Lab Detective" ar="خمسة أفعال — ثم الخلاصة الكبرى" seq="l30-final">
        <DetectiveQuiz seq="l30-final-detect" items={items}>
          <SourceReveal seq="l30-reveal-final">
            <div className="text-sm font-bold leading-relaxed text-emerald-900">
              <Rich text="① entered ← Past Simple (وصول العالم) · ② were checking ← Past Continuous (لحظة وصوله) · ③ had already completed ← Past Perfect (الأول اكتمل قبله) · ④ had been working ← Past Perfect Continuous (ثلاث ساعات تقريبًا) · ⑤ stopped ← Past Simple (حدث مفاجئ)." />
            </div>
          </SourceReveal>
        </DetectiveQuiz>
      </Lab>
      <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-sky-50 to-violet-50 p-4 text-center">
        <p className="text-sm font-black text-slate-500">وهنا أصبح لدينا نظام الماضي كاملًا:</p>
        <p className="mt-1 text-base font-black text-slate-800 md:text-lg">📸 الحدث ← 🎥 الخلفية ← ⏪ الحدث الأقدم ← ⏪🎥 النشاط الأقدم المستمر</p>
      </div>
      <Note emoji="🌟" text="وهذه نقطة مهمة جدًا في المنهج: من هنا لن نتعامل مع الأزمنة كقواعد منفصلة فقط، بل سنبدأ باستخدامها لبناء قصص وحوارات ومواقف ووصف أحداث حقيقية بمستوى أعلى بكثير." />
      {onGoTest && (
        <button type="button" onClick={onGoTest} className="w-full rounded-2xl bg-teal-700 px-6 py-4 text-lg font-black text-white shadow-lg transition hover:bg-teal-800 active:scale-[0.99]">
          🧪 انتقل إلى الاختبار النهائي — 20 سؤالًا
        </button>
      )}
      <Signature />
    </div>
  );
}

// ============================================================
// توجيه الشرائح + إطار العرض
// ============================================================

function SlideBody({ s, onGoTest }: { s: Slide30; onGoTest?: () => void }) {
  switch (s.id) {
    case "cover": return <CoverStep />;
    case "opening": return <OpeningStep />;
    case "objectives": return <ObjectivesStep />;
    case "s1": return <S1_SystemStep />;
    case "s2": return <S2_MachineStep />;
    case "s3": return <S3_PSStep />;
    case "s4": return <S4_PCStep />;
    case "s5": return <S5_PPStep />;
    case "s6": return <S6_PPCStep />;
    case "s7": return <S7_MayaStep />;
    case "s8": return <S8_BackboneStep />;
    case "s9": return <S9_BackgroundStep />;
    case "s10": return <S10_AddPPStep />;
    case "s11": return <S11_AddPPCStep />;
    case "s12": return <S12_LensesStep />;
    case "s13": return <S13_HadSwitchStep />;
    case "s14": return <S14_FocusBusStep />;
    case "s15": return <S15_KitchenStep />;
    case "s16": return <S16_ResultActivityStep />;
    case "s17": return <S17_YesterdayStep />;
    case "s18": return <S18_WhenStep />;
    case "s19": return <S19_WhileStep />;
    case "s20": return <S20_BeforeAfterStep />;
    case "s21": return <S21_ByTheTimeStep />;
    case "s22": return <S22_AlreadyStep />;
    case "s23": return <S23_StillStep />;
    case "s24": return <S24_RescueStep />;
    case "s25": return <S25_Quiz1Step />;
    case "s26": return <S26_Quiz2Step />;
    case "s27": return <S27_NoSingleStep />;
    case "s28": return <S28_NoraStep />;
    case "s29": return <S29_AlgoStep />;
    case "s30": return <S30_SamStep />;
    case "s31": return <S31_TimelineStep />;
    case "s32": return <S32_FixStep />;
    case "s33": return <S33_TrickStep />;
    case "s34": return <S34_HarderStep />;
    case "s35": return <S35_FocusStep />;
    case "s36": return <S36_LinaStep />;
    case "s37": return <S37_FunctionsStep />;
    case "s38": return <S38_BossStep />;
    case "s39": return <S39_FinalExamStep />;
    case "s40": return <S40_ChallengeStep />;
    case "summary": return <SummaryStep />;
    case "golden": return <GoldenStep />;
    case "final": return <FinalStep onGoTest={onGoTest} />;
    default: return null;
  }
}

export function SlideView30({ s, onGoTest }: { s: Slide30; onGoTest?: () => void }) {
  return (
    <Frame
      mascot={s.mascot}
      step={s.step}
      badge={s.section}
      title={<Rich text={s.title} />}
      lead={s.lead ? <Rich text={s.lead} /> : undefined}
      tip={s.tip}
      accent={ACCENT30}
      sourceTag={sourceTitleFor(s)}
    >
      <SlideBody s={s} onGoTest={onGoTest} />
    </Frame>
  );
}

// ============================ الاختبار النهائي — 20 سؤالًا ============================

type TestAnswer = number | number[] | boolean | Record<number, number> | null;

const TYPE_LABEL: Record<TestQ30["type"], string> = {
  single: "اختيار واحد",
  tf: "صح أم خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
  spot: "حدد الخطأ",
};

function answerMatches(q: TestQ30, a: TestAnswer): boolean {
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

function isAnswered(q: TestQ30, a: TestAnswer): boolean {
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
function TestCard({ q, value, setValue, checked }: { q: TestQ30; value: TestAnswer; setValue: (v: TestAnswer) => void; checked: boolean }) {
  const ok = checked && answerMatches(q, value);
  const bad = checked && !ok;

  let body: ReactNode = null;
  if (q.type === "single") {
    body = (
      <div className="grid gap-1.5">
        {q.opts.map((o, i) => {
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-300";
          if (!checked && value === i) cls = "border-teal-400 bg-teal-50 text-teal-900 ring-2 ring-teal-200";
          if (checked) {
            if (i === q.answer) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (value === i) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button key={i} type="button" disabled={checked} onClick={() => setValue(i)}
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
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-300";
          if (!checked && value === o) cls = "border-teal-400 bg-teal-50 text-teal-900 ring-2 ring-teal-200";
          if (checked) {
            if (o === q.answer) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (value === o) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button key={String(o)} type="button" disabled={checked} onClick={() => setValue(o)}
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
          let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-300";
          if (!checked && picked) cls = "border-teal-400 bg-teal-50 text-teal-900 ring-2 ring-teal-200";
          if (checked) {
            if (q.answer.includes(i)) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
            else if (picked) cls = "border-rose-300 bg-rose-50 text-rose-700";
            else cls = "border-slate-200 bg-white text-slate-400";
          }
          return (
            <button key={i} type="button" disabled={checked}
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
              <button key={i} type="button" disabled={checked || used} onClick={() => setValue([...seq, i])}
                className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${used ? "border-slate-100 bg-slate-50 text-slate-300" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}>
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
                <button key={pos} type="button" disabled={checked} onClick={() => setValue(seq.filter((_, p) => p !== pos))} title="إزالة"
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
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-300";
                if (!checked && mine) cls = "border-teal-400 bg-teal-600 text-white";
                if (!checked && taken) cls = "border-slate-100 bg-slate-50 text-slate-300";
                if (checked) {
                  if (q.answer[li] === ri) cls = "border-emerald-400 bg-emerald-50 text-emerald-900";
                  else if (mine) cls = "border-rose-300 bg-rose-50 text-rose-700";
                  else cls = "border-slate-200 bg-white text-slate-400";
                }
                return (
                  <button key={ri} type="button" disabled={checked || taken} onClick={() => setValue({ ...rec, [li]: ri })}
                    className={`font-en rounded-xl border-2 px-3 py-1 text-sm font-bold transition active:scale-95 ${cls}`}>
                    {r}
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
              <button key={i} type="button" disabled={checked} onClick={() => setValue(i)}
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
        <Nub n={q.n} className="bg-teal-700" />
        <span className="ms-auto rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-black text-teal-700"><Rich text={TYPE_LABEL[q.type]} /></span>
        {checked && <span className={`text-lg font-black ${ok ? "text-emerald-600" : "text-rose-500"}`}>{ok ? "✓" : "✕"}</span>}
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

export function TestArea30({ onCheckedChange, onShowSolutions }: { onCheckedChange?: (checked: boolean) => void; onShowSolutions?: () => void }) {
  const [answers, setAnswers] = useState<TestAnswer[]>(() => Array<TestAnswer>(TEST_30.length).fill(null));
  const [checked, setChecked] = useState(false);
  const setAt = (i: number, v: TestAnswer) => {
    if (checked) return;
    setAnswers((p) => p.map((x, xi) => (xi === i ? v : x)));
  };
  const answered = TEST_30.filter((q, i) => isAnswered(q, answers[i])).length;
  const allAnswered = answered === TEST_30.length;
  const score = TEST_30.filter((q, i) => answerMatches(q, answers[i])).length;
  const submit = () => { setChecked(true); onCheckedChange?.(true); };
  const reset = () => { setAnswers(Array<TestAnswer>(TEST_30.length).fill(null)); setChecked(false); onCheckedChange?.(false); };
  return (
    <div className="space-y-3.5">
      <Note emoji="🧪" text="الاختبار النهائي — 20 سؤالًا جديدًا بأنماط متنوعة. لا تظهر أي نتيجة قبل الضغط على «إنهاء الاختبار»." />
      <div className="flex items-center justify-between rounded-2xl border-2 border-teal-100 bg-white px-3 py-2 text-sm font-black text-teal-800">
        <span>🧪 <Rich text="التقدم" /></span>
        <span aria-live="polite"><Rich text={`${answered}/${TEST_30.length} مُجابة`} /></span>
      </div>
      <div className="space-y-3">
        {TEST_30.map((q, i) => (
          <TestCard key={q.n} q={q} value={answers[i]} setValue={(v) => setAt(i, v)} checked={checked} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        {!checked ? (
          <>
            <button type="button" onClick={submit} disabled={!allAnswered} title={allAnswered ? undefined : "أجب عن جميع الأسئلة العشرين أولًا"}
              className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30">
              <Rich text={`إنهاء الاختبار (${answered}/${TEST_30.length})`} />
            </button>
            <span className="text-xs font-bold text-slate-500"><Rich text="لن تظهر أي نتيجة أو تصحيح قبل الإنهاء." /></span>
          </>
        ) : (
          <>
            <span aria-live="polite" role="status" className="tada rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-black text-white">
              <Rich text={`نتيجتك: ${score}/${TEST_30.length}`} />
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

// ============================ حلول الاختبار — مقفلة حتى المحاولة ============================

export function Solutions30({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest?: () => void; onGoTeacher?: () => void }) {
  if (!unlocked) {
    return (
      <div className="space-y-3.5">
        <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 text-center md:p-10">
          <div className="text-5xl">🔒</div>
          <h3 className="font-head mt-3 text-xl font-black text-slate-800">الحلول مقفلة</h3>
          <p className="mt-2 text-sm font-bold text-slate-600">أنهِ الاختبار أولًا (20 سؤالًا) لتُفتح لك الحلول مع الشرح الكامل — أو ادخل منطقة المعلم.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {onGoTest && (
              <button type="button" onClick={onGoTest} className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-teal-800">
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
  return (
    <div className="space-y-3">
      <Note emoji="🔑" text="حلول الاختبار النهائي العشرين — كل حل مع التفسير والفخ:" />
      {TEST_30_SOLUTIONS.map((s, i) => {
        const q = TEST_30[i];
        return (
          <div key={s.n} className="rounded-3xl border-2 border-slate-200 bg-white p-3.5 sm:p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Nub n={s.n} className="bg-teal-700" />
              <span className="ms-auto rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-black text-teal-700"><Rich text={TYPE_LABEL[s.type]} /></span>
            </div>
            <Rich text={q.ar} className="mt-2 block text-sm font-bold text-slate-500" />
            <div className="mt-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-2.5">
              <span className="text-sm font-black text-emerald-900">✓ <LatinRuns text={s.answer} /></span>
            </div>
            <div className="mt-2 text-sm font-bold leading-relaxed text-slate-700"><Rich text={s.why} /></div>
            {s.trap && (
              <div className="mt-1.5 rounded-2xl border-2 border-amber-200 bg-amber-50 p-2.5 text-sm font-bold text-amber-900">
                🪤 <Rich text={s.trap} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================ منطقة المعلم ============================

function TeacherGate({ ok, setOk }: { ok: boolean; setOk: (v: boolean) => void }) {
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  if (ok) return null;
  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 text-center md:p-10">
      <div className="text-5xl">👩‍🏫</div>
      <h3 className="font-head mt-3 text-xl font-black text-slate-800">منطقة المعلم — مغلقة بكلمة مرور</h3>
      <p className="mt-2 text-sm font-bold text-slate-500">أدخل كلمة المرور لعرض حلول أنشطة المصدر والمذكرات التدريسية.</p>
      <div className={`mx-auto mt-4 flex max-w-sm gap-2 ${shake ? "shake" : ""}`}>
        <label className="sr-only" htmlFor="teacher-pw-30">كلمة المرور</label>
        <input
          id="teacher-pw-30"
          type="password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") { if (pw === TEACHER_PASSWORD_30) setOk(true); else { setError(true); setShake(true); window.setTimeout(() => setShake(false), 450); } } }}
          placeholder="كلمة المرور"
          className="min-w-0 flex-1 rounded-xl border-2 border-slate-200 px-3 py-2.5 text-center text-sm font-bold outline-none focus:border-teal-400"
        />
        <button
          type="button"
          onClick={() => { if (pw === TEACHER_PASSWORD_30) setOk(true); else { setError(true); setShake(true); window.setTimeout(() => setShake(false), 450); } }}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-teal-800"
        >
          دخول
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm font-black text-rose-600">كلمة المرور غير صحيحة — حاول مجددًا.</p>}
    </div>
  );
}

export function TeacherArea30({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange?: (ok: boolean) => void; onGoSolutions?: () => void }) {
  return (
    <div className="space-y-3.5">
      <TeacherGate ok={unlocked} setOk={(v) => onUnlockChange?.(v)} />
      {unlocked && (
        <div className="space-y-3.5">
          {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
          <FinalTestAnswerKey lesson={30} questions={FINAL_TESTS[30]} accent="bg-teal-700" />
          <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-sky-50 p-4">
            <h3 className="font-head text-lg font-black text-teal-900"><Rich text={TEACHER_30_OVERVIEW.title} /></h3>
            <div className="mt-3 space-y-2.5">
              <div>
                <p className="mb-1 text-sm font-black text-slate-700">🎯 الأهداف:</p>
                <ul className="space-y-1">
                  {TEACHER_30_OVERVIEW.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className="text-teal-600">•</span><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-sm font-black text-slate-700">📚 المتطلبات القبلية:</p>
                <ul className="space-y-1">
                  {TEACHER_30_OVERVIEW.prerequisites.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className="text-teal-600">•</span><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-sm font-black text-slate-700">💎 جوهر الدرس:</p>
                <ul className="space-y-1">
                  {TEACHER_30_OVERVIEW.core.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-semibold text-slate-700"><span className="text-teal-600">•</span><Rich text={o} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">📝 مذكرات تدريسية ({TEACHER_30_NOTES.length})</h3>
            <div className="mt-3 space-y-2.5">
              {TEACHER_30_NOTES.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3">
                  <p className="text-sm font-black text-teal-800"><Rich text={n.head} /></p>
                  <ul className="mt-1.5 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700"><span className="text-slate-300">•</span><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">✅ حلول أنشطة المصدر ({TEACHER_30_SOLUTIONS.length})</h3>
            <div className="mt-3 space-y-2.5">
              {TEACHER_30_SOLUTIONS.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 p-3">
                  <p className="text-sm font-black text-emerald-900"><Rich text={n.head} /></p>
                  <ul className="mt-1.5 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-slate-700"><span className="text-emerald-400">✓</span><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">📊 سلالم التقييم ({TEACHER_30_RUBRICS.length})</h3>
            <div className="mt-3 space-y-2.5">
              {TEACHER_30_RUBRICS.map((n, i) => (
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
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <h3 className="font-head text-lg font-black text-slate-800">⚠️ الأخطاء الشائعة ({TEACHER_30_MISTAKES.length})</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {TEACHER_30_MISTAKES.map((n, i) => (
                <div key={i} className="rounded-2xl border-2 border-rose-100 bg-rose-50/40 p-3">
                  <p className="text-sm font-black text-rose-800"><LatinRuns text={n.head} /></p>
                  <ul className="mt-1 space-y-1">
                    {n.lines.map((l, j) => (
                      <li key={j} className="text-xs font-semibold leading-relaxed text-slate-600"><Rich text={l} /></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {onGoSolutions && (
            <button type="button" onClick={onGoSolutions} className="w-full rounded-2xl bg-amber-100 px-6 py-3.5 text-base font-black text-amber-900 transition hover:bg-amber-200">
              🔑 عرض حلول الاختبار النهائي
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================ الهيكل: شريط + درج + تنقل ============================

type Area30 = "lesson" | "test" | "solutions" | "teacher";
const AREAS: { id: Area30; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📖", ar: "الدرس" },
  { id: "test", emoji: "🧪", ar: "الاختبار" },
  { id: "solutions", emoji: "🔑", ar: "الحلول" },
  { id: "teacher", emoji: "👩‍🏫", ar: "المعلم" },
];

export default function Lesson30({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area30>("lesson");
  const [index, setIndex] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const solutionsUnlocked = testChecked || teacherOk;
  const slide = SLIDES[index];

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

  const goSlide = (i: number) => { setIndex(i); setArea("lesson"); setDrawer(false); };

  const rail = (
    <div className="space-y-3">
      {SECTIONS_30.map((sec) => {
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
                    i === index && area === "lesson" ? "bg-teal-700 text-white shadow" : "text-slate-600 hover:bg-teal-50"
                  }`}
                >
                  <span aria-hidden>{s.mascot}</span>
                  <span className="min-w-0 flex-1 truncate"><Rich text={s.title} /></span>
                  <span className={`text-[11px] font-black ${i === index && area === "lesson" ? "text-teal-200" : "text-slate-300"}`}>{s.no}</span>
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
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onExit} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-600 transition hover:bg-slate-200">
          → خروج
        </button>
        <button type="button" onClick={() => setDrawer((d) => !d)} className="rounded-xl bg-teal-700 px-3 py-2 text-sm font-black text-white transition hover:bg-teal-800 lg:hidden">
          ☰ الخطوات
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="font-head truncate text-lg font-black text-slate-900 md:text-xl">{LESSON_TITLE_30}</h1>
          <p className="truncate text-xs font-bold text-slate-500"><LatinRuns text={LESSON_SUBTITLE_30} /></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {AREAS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setArea(a.id)}
            aria-pressed={area === a.id}
            className={`flex-1 rounded-2xl border-2 px-3 py-2.5 text-sm font-black transition active:scale-[0.98] sm:flex-none sm:px-6 ${
              area === a.id ? "border-teal-600 bg-teal-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
            }`}
          >
            {a.emoji} {a.ar}
            {a.id === "solutions" && !solutionsUnlocked && " 🔒"}
          </button>
        ))}
      </div>

      {area === "lesson" && (
        <div className="flex items-center gap-2 rounded-2xl border-2 border-teal-100 bg-white px-3 py-2">
          <span className="text-xs font-black text-teal-800"><Rich text={`خطوة ${slide.no} من ${SLIDE_COUNT}`} /></span>
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-teal-600 transition-all" style={{ width: `${Math.round(((index + 1) / SLIDE_COUNT) * 100)}%` }} />
          </div>
          <span className="text-xs font-black text-slate-400"><Rich text={`${Math.round(((index + 1) / SLIDE_COUNT) * 100)}٪`} /></span>
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
            <div data-area="l30-lesson">
              <SlideView30 key={index} s={slide} onGoTest={() => setArea("test")} />
              {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
              {index === SLIDE_COUNT - 1 && (
                <div className="mt-4">
                  <FinalTest
                    lesson={30}
                    questions={FINAL_TESTS[30]}
                    accent="bg-teal-700"
                    onGoTeacher={() => setArea("teacher")}
                  />
                </div>
              )}
              <div className="flex items-center gap-2">
                <button type="button" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="flex-1 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition enabled:hover:border-teal-300 disabled:opacity-30">
                  → السابق
                </button>
                <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">{slide.no} / {SLIDE_COUNT}</span>
                <button type="button" disabled={index === SLIDE_COUNT - 1} onClick={() => setIndex((i) => Math.min(SLIDE_COUNT - 1, i + 1))}
                  className="flex-1 rounded-2xl bg-teal-700 px-4 py-3 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30">
                  التالي ←
                </button>
              </div>
            </div>
          )}
          {area === "test" && <div data-area="l30-test"><TestArea30 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} /></div>}
          {area === "solutions" && <div data-area="l30-solutions"><Solutions30 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} /></div>}
          {area === "teacher" && <div data-area="l30-teacher"><TeacherArea30 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} /></div>}
        </main>
      </div>

      <p className="pb-4 text-center text-[11px] font-bold text-slate-400">
        📜 المصدر: {SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · {SOURCE_LEDGER_COUNT} وحدة في السجل · العرض دلالي تفاعلي — لا نص خام
      </p>
    </div>
  );
}

