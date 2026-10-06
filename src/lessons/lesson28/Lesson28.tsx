import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_LEDGER_COUNT,
  SOURCE_NUMBERED_COUNT,
  SEC,
  LESSON_TITLE_28,
  LESSON_SUBTITLE_28,
  LAB_NAME_28,
  LAB_MOTTO_28,
  EX28_CHOOSE,
  EX28_FIRST_EVENT,
  EX28_ERRORS,
  EX28_ERROR_SPOTS,
  EX28_JOHN_MARY,
  EX28_SARAH_TOM,
  EX28_DANIEL,
  ALEX_SCENE_28,
  BOSS_28,
  IQFINAL_28,
  LOGIC_NOTE_S33,
  TEST_28,
  TEACHER_PASSWORD_28,
  TEACHER_28_OVERVIEW,
  TEACHER_28_NOTES,
  TEACHER_28_SOLUTIONS,
  TEACHER_28_RUBRIC,
  TEACHER_28_MISTAKES,
  STORY_28_REQUIREMENTS,
  STORY_28_TITLE,
  type Block28,
  type Exercise28,
  type Lab28,
  type Mcq28,
  type Slide28,
  type TestQ28,
  type Tone28,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// 🧭 الدرس 28 — THE TIMELINE MASTER
// لوحة الألوان: نيلي (القرار) + برتقالي (📸) + نعناعي (🎥) + بنفسجي (⏪).
// قواعد العزل: كل وحدة إنجليزية داخل LTR، والنص المختلط عبر LatinRuns.
// المناطق الأربع: الدرس | منطقة الاختبارات | حلول الاختبارات | منطقة المعلم.
// ============================================================

const EVENT = {
  tag: "📸 EVENT",
  ar: "ماذا حدث؟",
  chip: "bg-orange-500 text-white",
  soft: "border-orange-200 bg-orange-50",
  text: "text-orange-900",
  ring: "ring-orange-300",
  bar: "bg-orange-400",
};
const PROGRESS = {
  tag: "🎥 IN-PROGRESS",
  ar: "ماذا كان يحدث؟",
  chip: "bg-teal-600 text-white",
  soft: "border-teal-200 bg-teal-50",
  text: "text-teal-900",
  ring: "ring-teal-300",
  bar: "bg-teal-500",
};
const FLASHBACK = {
  tag: "⏪ FLASHBACK",
  ar: "ماذا كان قد حدث قبل ذلك؟",
  chip: "bg-violet-700 text-white",
  soft: "border-violet-200 bg-violet-50",
  text: "text-violet-900",
  ring: "ring-violet-300",
  bar: "bg-violet-500",
};

const TENSES_28 = ["Past Simple", "Past Continuous", "Past Perfect"] as const;

const ARABIC_RX = /[ً-ٿݐ-ݿﭐ-﷿ﹰ-﻿]/;
const LATIN_RX = /[A-Za-z]/;
const HEAD_RX = /^(🎥|📸|⏪|🧠|🔥|⭐|⚠️|⚔️|🚨|🕵️|🚀|🏆|🏅|🎬|🧪|🔎|🔍|📖|🐦|🔄|📞|🎯|🔗|✅|💡|🎞️|⏱️|⏳|⚡|🧩|❌|❓|🗣️|🟢|🧭)/u;
const NUM_RX = /^[①②③④⑤⑥⑦⑧⑨⑩]/;

function isEn(text: string) {
  return LATIN_RX.test(text) && !ARABIC_RX.test(text);
}

type Kind = "en" | "ar" | "head" | "bad" | "good" | "num" | "chip" | "arrow";

function kindOf(text: string): Kind {
  if (text.includes("❌")) return "bad";
  if (text.startsWith("✅")) return "good";
  if (NUM_RX.test(text)) return "num";
  if (HEAD_RX.test(text)) return "head";
  if (isEn(text)) return "en";
  if (text.startsWith("→")) return "arrow";
  return "ar";
}

// ---------------- Helpers ----------------

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <LatinRuns text={text} />
    </span>
  );
}

/** شارة تمييز شروح المنصة عن محتوى المصدر المورّد. */
function PlatformTag() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-black text-white">
      🛠️ <Rich text="Platform Explanation" />
    </span>
  );
}

function Frame({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
  sourceHeading,
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  tip?: string;
  sourceHeading?: string;
}) {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-[1.75rem] border-2 border-indigo-900/[0.07] bg-white p-5 shadow-[0_16px_44px_-24px_rgba(67,56,202,0.45)] md:p-8"
    >
      <div className="pointer-events-none absolute -left-1 top-3 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-indigo-700 text-lg font-bold text-white shadow-sm">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-bold text-indigo-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2 text-xs font-bold text-indigo-900"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-indigo-700">SOURCE SECTION</span>
          <Rich text={sourceHeading} />
        </div>
      )}
      <h2 className="font-head mt-3 max-w-[92%] text-2xl font-bold leading-snug text-slate-900 md:text-[2rem]">{title}</h2>
      {lead && (
        <div className="mt-2 max-w-[94%] text-base text-slate-500 md:text-lg">
          <Rich text={lead} />
        </div>
      )}
      <div className="mt-5 space-y-3">{children}</div>
      {tip && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-indigo-700 to-sky-600 p-4 text-white">
          <span className="text-2xl">🔦</span>
          <span className="text-base font-semibold md:text-lg">
            <Rich text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

function LabPanel({
  emoji,
  label,
  ar,
  children,
  seq,
}: {
  emoji: string;
  label: string;
  ar?: string;
  children: ReactNode;
  seq?: string;
}) {
  return (
    <div
      data-en-seq={seq}
      className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-sky-50 to-amber-50/70 p-3.5 sm:p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.16em] text-indigo-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({
  items,
  tone = "indigo",
}: {
  items: readonly string[];
  tone?: "indigo" | "orange" | "teal" | "amber" | "sky" | "rose" | "violet";
}) {
  const colors: Record<string, string> = {
    indigo: "border-indigo-200 bg-white text-indigo-900",
    violet: "border-violet-200 bg-white text-violet-900",
    orange: "border-orange-200 bg-white text-orange-900",
    teal: "border-teal-200 bg-white text-teal-900",
    amber: "border-amber-200 bg-white text-amber-900",
    sky: "border-sky-200 bg-white text-sky-900",
    rose: "border-rose-200 bg-white text-rose-900",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <En key={item} className={`rounded-xl border-2 px-3 py-2 text-sm font-black ${colors[tone]}`}>
          {item}
        </En>
      ))}
    </div>
  );
}

/** سطر مصدري واحد — كل وحدة تُعرض بترتيبها وبعزلها الصحيح. */
function LineRow({ text, tone }: { text: string; tone?: Tone28 }) {
  const kind = tone === "en" ? "en" : tone === "good" ? "good" : tone === "bad" ? "bad" : tone === "head" ? "head" : kindOf(text);
  if (kind === "en") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-slate-100 bg-white px-4 py-2.5 text-left text-lg font-extrabold text-slate-900 shadow-sm md:text-xl">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "bad") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-2.5 text-left text-base font-extrabold text-rose-800 md:text-lg">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "good") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-2.5 text-left text-base font-extrabold text-emerald-800 md:text-lg">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "num") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border-2 border-indigo-100 bg-indigo-50/70 p-3">
        <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">
          {text.slice(0, 1)}
        </span>
        <Rich text={text.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
      </div>
    );
  }
  if (kind === "head") {
    return (
      <div className="rounded-2xl bg-indigo-700/95 px-4 py-2.5 text-center text-lg font-black text-white shadow-sm">
        <Rich text={text} />
      </div>
    );
  }
  if (kind === "arrow") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-fit rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-600">{text}</En>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border-2 border-white bg-white/80 px-3.5 py-2 text-base font-bold leading-relaxed text-slate-700 md:text-lg">
      <Rich text={text} />
    </div>
  );
}

function Lines({ lines, tone }: { lines: string[]; tone?: Tone28 }) {
  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <LineRow key={`${i}-${line.slice(0, 12)}`} text={line} tone={tone} />
      ))}
    </div>
  );
}

/** شريط زمني أفقي (LTR) — يُستخدم في كل المختبرات البصرية. */
function TrackBar({
  label,
  color,
  width,
  marker,
}: {
  label: ReactNode;
  color: string;
  width: string;
  marker?: ReactNode;
}) {
  return (
    <div dir="ltr" className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-2.5">
      <div className="text-left text-xs font-black text-slate-700">{label}</div>
      <div className="relative mt-2 h-3 overflow-visible rounded-full bg-slate-100">
        <div className={`absolute left-0 top-0 h-3 rounded-full ${color}`} style={{ width }} />
        {marker}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] font-black text-slate-400">
        <En>EARLIER PAST</En>
        <En>LATER PAST</En>
        <En>NOW</En>
      </div>
    </div>
  );
}

function TenseChip({ tense }: { tense: "event" | "progress" | "flashback" }) {
  const v = tense === "event" ? EVENT : tense === "progress" ? PROGRESS : FLASHBACK;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-black ${v.chip}`}>
      <En>{v.tag}</En>
      <span className="text-white/90">·</span>
      <Rich text={v.ar} />
    </span>
  );
}

function CheckBar({
  checked,
  allAnswered,
  answered,
  total,
  score,
  onCheck,
  onReset,
  hint,
  label,
}: {
  checked: boolean;
  allAnswered: boolean;
  answered: number;
  total: number;
  score?: ReactNode;
  onCheck: () => void;
  onReset: () => void;
  hint: string;
  label?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
      <button
        type="button"
        onClick={onCheck}
        disabled={checked || !allAnswered}
        title={allAnswered ? undefined : hint}
        className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-indigo-800 disabled:opacity-30"
      >
        <Rich text={`${label ?? "تحقق من الإجابات"} (${answered}/${total})`} />
      </button>
      {checked ? (
        <>
          {score !== undefined && (
            <span className="rounded-xl bg-indigo-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={typeof score === "string" ? score : ""} />
              {typeof score !== "string" ? score : null}
            </span>
          )}
          <button type="button" onClick={onReset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
            <Rich text="↺ إعادة" />
          </button>
        </>
      ) : (
        <span className="text-xs font-bold text-slate-500">
          <Rich text={hint} />
        </span>
      )}
    </div>
  );
}

function RevealBlock({ seq, children }: { seq: string; children: ReactNode }) {
  return (
    <div data-reveal-block={seq} className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
      {children}
    </div>
  );
}

// ============================================================
// المختبرات — تعرض الوحدات المصدرية أولًا ثم التفاعل البصري
// ============================================================

/** ① مختبر الاستدلال بخط الزمن: رتّب الحدثين ثم سمّ الزمن. */
function FirstQuestionLab({ lines }: { lines: string[] }) {
  const [seq, setSeq] = useState<string[]>([]);
  const events = [
    { key: "train", en: "The train left." },
    { key: "me", en: "I arrived." },
  ];
  const toggle = (key: string) =>
    setSeq((c) => (c.includes(key) ? c.filter((k) => k !== key) : c.length >= 2 ? c : [...c, key]));
  const done = seq.length === 2;
  const right = seq.join("|") === "train|me";
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-first-question" emoji="🕰️" label="TIMELINE REASONING LAB" ar="المس الحدثين بالترتيب: ماذا حدث أولًا؟">
        <div className="grid gap-2 sm:grid-cols-2">
          {events.map((e) => {
            const pos = seq.indexOf(e.key);
            const on = pos !== -1;
            return (
              <button
                key={e.key}
                type="button"
                onClick={() => toggle(e.key)}
                aria-pressed={on}
                className={`rounded-2xl border-2 p-3 text-center transition ${on ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white hover:border-indigo-400"}`}
              >
                <span className={`font-head mx-auto grid h-8 w-8 place-items-center rounded-lg text-sm font-bold ${on ? "bg-white/25 text-white" : "bg-indigo-100 text-indigo-800"}`}>
                  {on ? pos + 1 : "؟"}
                </span>
                <En className="mt-1 block text-base font-black">{e.en}</En>
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-center text-xs font-bold text-slate-500" aria-live="polite">
          <Rich text={done ? (right ? "✓ ترتيب صحيح — والآن سمِّ الزمنين." : "✕ راجع الترتيب: الفعل مع had هو الأقدم.") : "المس الحدث الأول ثم الثاني."} />
        </div>
        {done && (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
              <TenseChip tense="flashback" />
              <En className="mt-1.5 block text-sm font-black text-violet-900">The train had left.</En>
              <div className="text-xs font-bold text-slate-500"><Rich text="الحدث الأقدم" /></div>
            </div>
            <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
              <TenseChip tense="event" />
              <En className="mt-1.5 block text-sm font-black text-orange-900">I arrived.</En>
              <div className="text-xs font-bold text-slate-500"><Rich text="الحدث الأحدث" /></div>
            </div>
          </div>
        )}
        <div className="mt-2">
          <TrackBar label={<En>The train had left → I arrived → NOW</En>} color={FLASHBACK.bar} width="38%" marker={<span className="absolute -top-1 left-[37%] text-lg">⏪</span>} />
        </div>
      </LabPanel>
    </div>
  );
}

/** ④ المقارنة المباشرة: حدث واحد أم حدثان؟ */
function CompareDirectLab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<"one" | "two">("one");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-compare-direct" emoji="🔥" label="ONE EVENT OR TWO?" ar="بدّل بين الجملتين ولاحظ عدد الأحداث">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setMode("one")} aria-pressed={mode === "one"}
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${mode === "one" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            I lost my key.
          </button>
          <button type="button" onClick={() => setMode("two")} aria-pressed={mode === "two"}
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${mode === "two" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            I had lost my key before I arrived home.
          </button>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2" aria-live="polite">
          {mode === "one" ? (
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center sm:col-span-2">
              <TenseChip tense="event" />
              <div className="mt-1.5 text-sm font-bold text-slate-600">
                <Rich text="حدث واحد فقط — لا مقارنة، فالماضي البسيط كافٍ." />
              </div>
            </div>
          ) : (
            <>
              <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
                <div className="font-head mx-auto grid h-8 w-8 place-items-center rounded-lg bg-violet-700 text-sm font-bold text-white">1</div>
                <En className="mt-1 block text-sm font-black text-violet-900">lost my key</En>
                <div className="text-xs font-bold text-slate-500"><Rich text="أولًا — الماضي التام" /></div>
              </div>
              <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
                <div className="font-head mx-auto grid h-8 w-8 place-items-center rounded-lg bg-orange-500 text-sm font-bold text-white">2</div>
                <En className="mt-1 block text-sm font-black text-orange-900">arrived home</En>
                <div className="text-xs font-bold text-slate-500"><Rich text="ثانيًا — الماضي البسيط" /></div>
              </div>
            </>
          )}
        </div>
      </LabPanel>
    </div>
  );
}

/** ⑥ خط زمن المتجر المغلق. */
function TimelineShopLab({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-timeline-shop" emoji="🕰️" label="TIMELINE" ar="الماضي الأقدم ← الحدث الأول ← الحدث الثاني ← الآن">
        <TrackBar
          label={<En>The shop had closed → I arrived → NOW</En>}
          color={FLASHBACK.bar}
          width="42%"
          marker={
            <>
              <span className="absolute -top-1.5 left-[28%] text-lg">🔒</span>
              <span className="absolute -top-1.5 left-[55%] text-lg">🧍</span>
            </>
          }
        />
        <div className="mt-2 text-center">
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show}
            className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-800">
            <Rich text={show ? "إخفاء التحليل" : "أظهر التحليل الزمني"} />
          </button>
        </div>
        {show && (
          <div className="mt-2 grid gap-2 sm:grid-cols-2" aria-live="polite">
            <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
              <En className="block text-sm font-black text-violet-900">had closed</En>
              <div className="mt-1 text-xs font-bold text-slate-500"><Rich text="الحدث الأقدم — المتجر أغلق أولًا" /></div>
            </div>
            <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
              <En className="block text-sm font-black text-orange-900">arrived</En>
              <div className="mt-1 text-xs font-bold text-slate-500"><Rich text="الحدث الأحدث — وصلتُ بعد الإغلاق" /></div>
            </div>
          </div>
        )}
      </LabPanel>
    </div>
  );
}

/** ⑤ الماضي التام ليس «قديم جدًا». */
function OldMythLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<"wrong" | "right" | null>(null);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-old-myth" emoji="🧠" label="MYTH CHECK" ar="أي جملة صحيحة لحدث واحد بالأمس؟">
        <div className="grid gap-2">
          <button type="button" onClick={() => setPick("wrong")} aria-pressed={pick === "wrong"}
            className={`rounded-2xl border-2 p-3 transition ${pick === "wrong" ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white hover:border-indigo-400"}`}>
            <En className="block text-left text-base font-black text-slate-900">Yesterday, I had visited my grandmother.</En>
          </button>
          <button type="button" onClick={() => setPick("right")} aria-pressed={pick === "right"}
            className={`rounded-2xl border-2 p-3 transition ${pick === "right" ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-indigo-400"}`}>
            <En className="block text-left text-base font-black text-slate-900">Yesterday, I visited my grandmother.</En>
          </button>
        </div>
        <div className="mt-2 text-center text-sm font-bold" aria-live="polite">
          {pick === "wrong" && <span className="text-rose-700"><Rich text="✕ حدث واحد بلا مقارنة — الماضي التام هنا غير مناسب." /></span>}
          {pick === "right" && <span className="text-emerald-700"><Rich text="✓ الماضي التام يعني «قبل حدث ماضٍ آخر» — وليس «قديم جدًا»." /></span>}
          {pick === null && <span className="text-slate-500"><Rich text="اختر جملة لترى التحليل." /></span>}
        </div>
      </LabPanel>
    </div>
  );
}

/** مختبر تبديل عام: جملتان إنجليزيتان + ترتيب الأحداث لكل منهما. */
function SwitchLab({
  seq,
  emoji,
  label,
  ar,
  s1,
  s2,
  order1,
  order2,
  note1,
  note2,
}: {
  seq: string;
  emoji: string;
  label: string;
  ar: string;
  s1: string;
  s2: string;
  order1: [string, string];
  order2: [string, string];
  note1?: string;
  note2?: string;
}) {
  const [mode, setMode] = useState<1 | 2>(1);
  const order = mode === 1 ? order1 : order2;
  return (
    <LabPanel seq={seq} emoji={emoji} label={label} ar={ar}>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => setMode(1)} aria-pressed={mode === 1} dir="ltr"
          className={`max-w-full rounded-xl border-2 px-4 py-2 text-left font-en text-sm font-black transition ${mode === 1 ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
          {s1}
        </button>
        <button type="button" onClick={() => setMode(2)} aria-pressed={mode === 2} dir="ltr"
          className={`max-w-full rounded-xl border-2 px-4 py-2 text-left font-en text-sm font-black transition ${mode === 2 ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
          {s2}
        </button>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2" aria-live="polite">
        <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
          <div className="text-[11px] font-black text-violet-700"><En>EARLIER — الأقدم</En></div>
          <En className="mt-1 block text-sm font-black text-violet-900">{order[0]}</En>
        </div>
        <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
          <div className="text-[11px] font-black text-orange-700"><En>LATER — الأحدث</En></div>
          <En className="mt-1 block text-sm font-black text-orange-900">{order[1]}</En>
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={mode === 1 ? note1 ?? "" : note2 ?? ""} />
      </div>
    </LabPanel>
  );
}

/** ⑧ اختبار القلادة: رتّب الحدثين. */
function NecklaceOrderLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-necklace" emoji="⚡" label="WHICH FIRST?" ar="ماذا حدث أولًا؟">
        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => setPick("taken")} aria-pressed={pick === "taken"}
            className={`rounded-2xl border-2 p-3 text-center transition ${pick === "taken" ? `${FLASHBACK.soft} ring-2 ${FLASHBACK.ring}` : "border-slate-200 bg-white hover:border-indigo-400"}`}>
            <En className="text-base font-black text-slate-900">Someone took the necklace.</En>
          </button>
          <button type="button" onClick={() => setPick("opened")} aria-pressed={pick === "opened"}
            className={`rounded-2xl border-2 p-3 text-center transition ${pick === "opened" ? `${EVENT.soft} ring-2 ${EVENT.ring}` : "border-slate-200 bg-white hover:border-indigo-400"}`}>
            <En className="text-base font-black text-slate-900">I opened the box.</En>
          </button>
        </div>
        <div className="mt-2 text-center text-sm font-bold" aria-live="polite">
          {pick === "taken" && <span className="text-emerald-700"><Rich text="✓ أخذ القلادة حدث أولًا — لذلك جاء بصيغة had taken." /></span>}
          {pick === "opened" && <span className="text-rose-700"><Rich text="✕ الفتح هو الحدث الأحدث — الأقدم هو أخذ القلادة (had taken)." /></span>}
          {pick === null && <span className="text-slate-500"><Rich text="اختر الحدث الأول." /></span>}
        </div>
      </LabPanel>
    </div>
  );
}

/** ⑨ مختبر before/after: الخياران صحيحان. */
function BeforeOptionalLab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<1 | 2>(1);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-before-lab" emoji="⭐" label="BEFORE / AFTER LAB" ar="بدّل بين الصيغتين — الترتيب لا يتغير">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setMode(1)} aria-pressed={mode === 1} dir="ltr"
            className={`max-w-full rounded-xl border-2 px-4 py-2 text-left font-en text-sm font-black transition ${mode === 1 ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            The students had left before the teacher arrived.
          </button>
          <button type="button" onClick={() => setMode(2)} aria-pressed={mode === 2} dir="ltr"
            className={`max-w-full rounded-xl border-2 px-4 py-2 text-left font-en text-sm font-black transition ${mode === 2 ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            The students left before the teacher arrived.
          </button>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2" aria-live="polite">
          <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
            <div className="text-[11px] font-black text-violet-700"><En>EARLIER — الأقدم</En></div>
            <En className="mt-1 block text-sm font-black text-violet-900">students left</En>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
            <div className="text-[11px] font-black text-orange-700"><En>LATER — الأحدث</En></div>
            <En className="mt-1 block text-sm font-black text-orange-900">teacher arrived</En>
          </div>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-2.5 text-center text-sm font-bold text-emerald-900">
          <Rich text={mode === 1 ? "الماضي التام يبرز الحدث الأقدم." : "الماضي البسيط صحيح أيضًا — because قبلها before توضح الترتيب أصلًا."} />
        </div>
      </LabPanel>
    </div>
  );
}

/** ⑬ by the time — حدث مكتمل قبل نقطة ماضية. */
function BytimeLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<"movie" | "fire">(  "movie");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-bytime" emoji="⏳" label="BY THE TIME" ar="الحدث المكتمل يقع قبل نقطة الوصول">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setPick("movie")} aria-pressed={pick === "movie"}
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${pick === "movie" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            the movie had started
          </button>
          <button type="button" onClick={() => setPick("fire")} aria-pressed={pick === "fire"}
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${pick === "fire" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            the fire had spread
          </button>
        </div>
        <div className="mt-3" aria-live="polite">
          {pick === "movie" ? (
            <TrackBar label={<En>the movie had started → we arrived → NOW</En>} color={FLASHBACK.bar} width="40%" marker={<span className="absolute -top-1.5 left-[39%] text-lg">🎬</span>} />
          ) : (
            <TrackBar label={<En>the fire had spread → the firefighters arrived → NOW</En>} color={FLASHBACK.bar} width="40%" marker={<span className="absolute -top-1.5 left-[39%] text-lg">🔥</span>} />
          )}
        </div>
      </LabPanel>
    </div>
  );
}

/** ⑭ already — موضعها بين had والفعل. */
function AlreadyLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<"lina" | "stadium">("lina");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-already" emoji="🔥" label="ALREADY" ar="بالفعل — قبل النقطة الماضية">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setPick("lina")} aria-pressed={pick === "lina"}
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${pick === "lina" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            had already gone to bed
          </button>
          <button type="button" onClick={() => setPick("stadium")} aria-pressed={pick === "stadium"}
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${pick === "stadium" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            had already started
          </button>
        </div>
        <div dir="ltr" className="ltr-row mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center" aria-live="polite">
          <En className="text-base font-black text-slate-900">
            {pick === "lina" ? "When I called Lina, she had already gone to bed." : "When we reached the stadium, the game had already started."}
          </En>
          <div className="mt-1 text-xs font-black text-violet-700">
            <En>had + already + V3</En>
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

/** ⑮ just — الحدثان قريبان جدًا. */
function JustLab({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-just" emoji="⚡" label="JUST" ar="للتو — قبل لحظات فقط">
        <TrackBar
          label={<En>the teacher had just arrived → I entered → NOW</En>}
          color={FLASHBACK.bar}
          width="62%"
          marker={
            <>
              <span className="absolute -top-1.5 left-[52%] text-lg">🧑‍🏫</span>
              <span className="absolute -top-1.5 left-[61%] text-lg">🚪</span>
            </>
          }
        />
        <div className="mt-2 text-center">
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show}
            className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-800">
            <Rich text={show ? "إخفاء الملاحظة" : "ما الفكرة؟"} />
          </button>
        </div>
        {show && (
          <div className="mt-2 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center text-sm font-bold text-violet-900" aria-live="polite">
            <Rich text="الحدثان قريبان جدًا في الزمن — لكن الترتيب ثابت: وصول المعلم أقدم، ودخولي أحدث." />
          </div>
        )}
      </LabPanel>
    </div>
  );
}

/** ⑯ Past Simple + Past Perfect في القصص. */
function PsPlusPpLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<"airport" | "fridge">("airport");
  const data = pick === "airport"
    ? { simple: "I arrived", perfect: "had left", first: "someone… flight left", second: "I arrived", s: "I arrived at the airport, but my flight had already left." }
    : { simple: "opened", perfect: "had eaten", first: "someone ate the cake", second: "Sara opened the refrigerator", s: "Sara opened the refrigerator, but someone had eaten all the cake." };
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-ps-plus-pp" emoji="🧠" label="PAST SIMPLE + PAST PERFECT" ar="بدّل بين المشهدين">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setPick("airport")} aria-pressed={pick === "airport"}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${pick === "airport" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            <Rich text="المطار ✈️" />
          </button>
          <button type="button" onClick={() => setPick("fridge")} aria-pressed={pick === "fridge"}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${pick === "fridge" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            <Rich text="الثلاجة 🍰" />
          </button>
        </div>
        <div dir="ltr" className="ltr-row mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
          <En className="text-base font-black text-slate-900">{data.s}</En>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2" aria-live="polite">
          <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
            <En className="block text-sm font-black text-orange-900">{data.simple}</En>
            <div className="mt-1 text-xs font-bold text-slate-500"><En>Past Simple</En></div>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
            <En className="block text-sm font-black text-violet-900">{data.perfect}</En>
            <div className="mt-1 text-xs font-bold text-slate-500"><En>Past Perfect</En></div>
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

/** ⑰ الأزمنة الثلاثة مع جملة المحفظة. */
function ThreeTenseIntroLab({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-three-tense" emoji="🎥" label="THREE TENSES" ar="حدث · شيء كان يحدث · شيء كان قد حدث">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
            <TenseChip tense="event" />
            <div className="mt-1.5 text-xs font-bold text-slate-600"><Rich text="حدث" /></div>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center ${PROGRESS.soft}`}>
            <TenseChip tense="progress" />
            <div className="mt-1.5 text-xs font-bold text-slate-600"><Rich text="شيء كان يحدث" /></div>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
            <TenseChip tense="flashback" />
            <div className="mt-1.5 text-xs font-bold text-slate-600"><Rich text="شيء كان قد حدث قبل نقطة ماضية" /></div>
          </div>
        </div>
        <div dir="ltr" className="ltr-row mt-2 rounded-2xl border-2 border-white bg-white p-3 text-center">
          <En className="text-base font-black text-slate-900">I was walking home when I realized that I had forgotten my wallet.</En>
        </div>
        <div className="mt-2 text-center">
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show}
            className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-800">
            <Rich text={show ? "إخفاء التصنيف" : "صنّع الأفعال الثلاثة"} />
          </button>
        </div>
        {show && (
          <div className="mt-2 grid gap-2 sm:grid-cols-3" aria-live="polite">
            <div className={`rounded-2xl border-2 p-2.5 text-center ${PROGRESS.soft}`}>
              <En className="block text-sm font-black text-teal-900">was walking</En>
              <div className="text-[11px] font-black text-teal-700"><En>Past Continuous</En></div>
            </div>
            <div className={`rounded-2xl border-2 p-2.5 text-center ${EVENT.soft}`}>
              <En className="block text-sm font-black text-orange-900">realized</En>
              <div className="text-[11px] font-black text-orange-700"><En>Past Simple</En></div>
            </div>
            <div className={`rounded-2xl border-2 p-2.5 text-center ${FLASHBACK.soft}`}>
              <En className="block text-sm font-black text-violet-900">had forgotten</En>
              <div className="text-[11px] font-black text-violet-700"><En>Past Perfect</En></div>
            </div>
          </div>
        )}
      </LabPanel>
    </div>
  );
}

const WALLET_ROLES = ["🎥 كان يحدث", "📸 حدث", "⏪ أقدم"] as const;
const WALLET_VERBS = [
  { verb: "was walking", answer: 0 },
  { verb: "realized", answer: 1 },
  { verb: "had forgotten", answer: 2 },
];

/** ⑱ مختبر الأزمنة الثلاثة: صنّف أفعال جملة المحفظة على خط الزمن. */
function WalletLayersLab({ lines }: { lines: string[] }) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = WALLET_VERBS.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === WALLET_VERBS.length;
  const score = WALLET_VERBS.reduce((n, v, i) => n + (picks[i] === v.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-wallet-layers" emoji="🧠" label="THREE-TENSE TIMELINE LAB" ar="اختر دور كل فعل: 🎥 كان يحدث · 📸 حدث · ⏪ أقدم">
        {WALLET_VERBS.map((v, i) => (
          <div key={v.verb} className="rounded-2xl border-2 border-slate-200 bg-white p-2.5">
            <div dir="ltr" className="ltr-row">
              <En className="text-base font-black text-slate-900">{v.verb}</En>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {WALLET_ROLES.map((r, ri) => {
                const isPick = picks[i] === ri;
                const isAnswer = v.answer === ri;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button key={r} type="button" onClick={() => setPicks((p) => ({ ...p, [i]: ri }))} disabled={checked} aria-pressed={isPick}
                    className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition disabled:cursor-default ${cls}`}>
                    <Rich text={r} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <CheckBar
          checked={checked}
          allAnswered={allAnswered}
          answered={answered}
          total={WALLET_VERBS.length}
          score={`${score} / ${WALLET_VERBS.length}`}
          onCheck={() => setChecked(true)}
          onReset={() => { setPicks({}); setChecked(false); }}
          hint="اختر دورًا لكل فعل أولًا"
        />
        {checked && (
          <div dir="ltr" className="ltr-row mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3" aria-live="polite">
            <div className="space-y-1.5 text-center">
              <En className="block rounded-xl bg-violet-50 px-3 py-1.5 text-sm font-black text-violet-900">forgot wallet ⏪</En>
              <div className="text-slate-300">↓</div>
              <En className="block rounded-xl bg-teal-50 px-3 py-1.5 text-sm font-black text-teal-900">was walking 🎥</En>
              <div className="text-slate-300">↓</div>
              <En className="block rounded-xl bg-orange-50 px-3 py-1.5 text-sm font-black text-orange-900">realized 📸</En>
              <div className="text-slate-300">↓</div>
              <En className="block rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700">NOW</En>
            </div>
          </div>
        )}
      </LabPanel>
    </div>
  );
}

/** ⑲ ثلاثة أحداث في المحطة. */
function StationThreeLab({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-station" emoji="🔥" label="THREE EVENTS" ar="ثلاثة أزمنة في قصة واحدة">
        <div className="text-center">
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show}
            className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-800">
            <Rich text={show ? "إخفاء التحليل" : "أظهر الأزمنة الثلاثة"} />
          </button>
        </div>
        {show && (
          <div className="mt-2 grid gap-2" aria-live="polite">
            <div className={`rounded-2xl border-2 p-3 ${FLASHBACK.soft}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <En className="text-sm font-black text-violet-900">the train had already left</En>
                <span className="rounded-lg bg-violet-700 px-2 py-0.5 text-[11px] font-black text-white"><En>Past Perfect</En></span>
              </div>
              <div className="mt-1 text-xs font-bold text-slate-500"><Rich text="القطار غادر قبل وصولي." /></div>
            </div>
            <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <En className="text-sm font-black text-orange-900">I arrived</En>
                <span className="rounded-lg bg-orange-500 px-2 py-0.5 text-[11px] font-black text-white"><En>Past Simple</En></span>
              </div>
              <div className="mt-1 text-xs font-bold text-slate-500"><Rich text="حدث الوصول." /></div>
            </div>
            <div className={`rounded-2xl border-2 p-3 ${PROGRESS.soft}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <En className="text-sm font-black text-teal-900">people were waiting</En>
                <span className="rounded-lg bg-teal-600 px-2 py-0.5 text-[11px] font-black text-white"><En>Past Continuous</En></span>
              </div>
              <div className="mt-1 text-xs font-bold text-slate-500"><Rich text="الناس كانوا في حالة انتظار عند تلك اللحظة." /></div>
            </div>
          </div>
        )}
      </LabPanel>
    </div>
  );
}

const MACHINE_QS = [
  { q: "ما الحدث الأقدم؟", opts: ["had prepared", "was making", "entered"], answer: 0 },
  { q: "ما الحدث المستمر؟", opts: ["had prepared", "was making", "realized"], answer: 1 },
  { q: "ما الحدث الذي وقع كنقطة في القصة؟", opts: ["entered / realized", "had prepared", "was making"], answer: 0 },
];

/** ⑳ آلة الزمن: أسئلة التحليل الثلاثة لمشهد Emma. */
function TimeMachineLab({ lines }: { lines: string[] }) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = MACHINE_QS.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === MACHINE_QS.length;
  const score = MACHINE_QS.reduce((n, mq, i) => n + (picks[i] === mq.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-time-machine" emoji="🧩" label="TIME MACHINE" ar="ضع علامة على كل حدث ثم أجب">
        {MACHINE_QS.map((mq, i) => (
          <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-2.5">
            <div className="text-sm font-black text-slate-800"><Rich text={mq.q} /></div>
            <div className="mt-2 flex flex-wrap gap-2">
              {mq.opts.map((o, oi) => {
                const isPick = picks[i] === oi;
                const isAnswer = mq.answer === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button key={o} type="button" onClick={() => setPicks((p) => ({ ...p, [i]: oi }))} disabled={checked} aria-pressed={isPick} dir="ltr"
                    className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <CheckBar
          checked={checked}
          allAnswered={allAnswered}
          answered={answered}
          total={MACHINE_QS.length}
          score={`${score} / ${MACHINE_QS.length}`}
          onCheck={() => setChecked(true)}
          onReset={() => { setPicks({}); setChecked(false); }}
          hint="أجب عن الأسئلة الثلاثة أولًا"
        />
      </LabPanel>
    </div>
  );
}

/** ㉖ ثلاث حالات — بسيط أم تام؟ */
function Cases3Lab({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const cases = [
    { s: "I visited Paris in 2024.", verdict: "→ Past Simple.", ar: "حدث واحد محدد — لا مقارنة." },
    { s: "I had visited Paris before I moved to France.", verdict: "→ Past Perfect للحدث الأول.", ar: "حدثان: زيارة باريس أقدم من الانتقال." },
    { s: "I visited Paris and took many photos.", verdict: "→ سرد متتابع بالماضي البسيط.", ar: "حدثان متتاليان — لا حاجة بالضرورة إلى الماضي التام." },
  ];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-cases3" emoji="🧠" label="THREE CASES" ar="افتح كل حالة وحلّلها">
        <div className="grid gap-2">
          {cases.map((c, i) => {
            const on = open === i;
            return (
              <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-2.5">
                <button type="button" onClick={() => setOpen(on ? null : i)} aria-pressed={on} className="w-full">
                  <div className="flex items-center justify-between gap-2">
                    <En className="text-left text-base font-black text-slate-900">{c.s}</En>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-sm font-black text-indigo-800">{on ? "−" : "+"}</span>
                  </div>
                </button>
                {on && (
                  <div className="mt-2 rounded-xl bg-indigo-50 p-2.5" aria-live="polite">
                    <En className="block text-sm font-black text-indigo-900">{c.verdict}</En>
                    <div className="mt-1 text-xs font-bold text-slate-600"><Rich text={c.ar} /></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </LabPanel>
    </div>
  );
}

/** ㉗ sequence vs back reference. */
function SequenceBackrefLab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<"seq" | "back">("seq");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-sequence-backref" emoji="🔥" label="SEQUENCE VS BACK REFERENCE" ar="هل أتقدم بالقصة أم أرجع إلى الوراء؟">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setMode("seq")} aria-pressed={mode === "seq"}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "seq" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            <Rich text="سلسلة متتابعة 🔗" />
          </button>
          <button type="button" onClick={() => setMode("back")} aria-pressed={mode === "back"}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-black transition ${mode === "back" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            <Rich text="رجوع إلى الوراء ⏪" />
          </button>
        </div>
        <div dir="ltr" className="ltr-row mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center" aria-live="polite">
          <En className="block text-base font-black text-slate-900">
            {mode === "seq"
              ? "I woke up, brushed my teeth, ate breakfast, and left the house."
              : "When I left the house, I realized that I had forgotten my backpack."}
          </En>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
            {mode === "seq" ? (
              <>
                <En className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-black text-orange-900">woke up</En>
                <span className="text-slate-300">→</span>
                <En className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-black text-orange-900">brushed</En>
                <span className="text-slate-300">→</span>
                <En className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-black text-orange-900">ate</En>
                <span className="text-slate-300">→</span>
                <En className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-black text-orange-900">left</En>
              </>
            ) : (
              <>
                <En className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-black text-orange-900">left the house</En>
                <span className="text-slate-300">·</span>
                <En className="rounded-lg bg-orange-50 px-2 py-1 text-xs font-black text-orange-900">realized</En>
                <span className="text-violet-500">⏪</span>
                <En className="rounded-lg bg-violet-50 px-2 py-1 text-xs font-black text-violet-900">had forgotten</En>
              </>
            )}
          </div>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={mode === "seq" ? "كل حدث يأتي بعد الآخر — الماضي البسيط مناسب جدًا." : "نرجع إلى حدث سبق لحظة الإدراك — هنا يتألق الماضي التام."} />
        </div>
      </LabPanel>
    </div>
  );
}

/** ㉘ الرجوع خطوة إلى الوراء. */
function StepBackLab({ lines }: { lines: string[] }) {
  const [stepped, setStepped] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-step-back" emoji="⏪" label="STEP BACKWARD" ar="القصة وصلت إلى لحظة… ثم ترجع خطوة">
        <div dir="ltr" className="ltr-row rounded-2xl border-2 border-white bg-white p-3 text-center">
          <En className="block text-base font-black text-slate-900">I arrived home.</En>
          <div className="mt-1 text-xs font-black text-slate-400"><En>…the story is here</En></div>
        </div>
        <div className="mt-2 text-center">
          <button type="button" onClick={() => setStepped((s) => !s)} aria-pressed={stepped}
            className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-violet-800">
            <Rich text={stepped ? "إخفاء الرجوع" : "⏪ ارجع خطوة إلى الوراء"} />
          </button>
        </div>
        {stepped && (
          <div dir="ltr" className="ltr-row mt-2 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center" aria-live="polite">
            <En className="block text-base font-black text-violet-900">I realized that I had left my phone at school.</En>
            <div className="mt-1 text-xs font-black text-violet-700"><En>left my phone ← happened BEFORE arriving home</En></div>
          </div>
        )}
      </LabPanel>
    </div>
  );
}

const CAVE_VERBS = [
  { verb: "reached", tense: "Past Simple" },
  { verb: "discovered", tense: "Past Simple" },
  { verb: "had entered", tense: "Past Perfect" },
  { verb: "were surprised", tense: "Past Simple" },
  { verb: "was supposed", tense: "Past Simple" },
];

/** ㉙ محقق الكهف: صنّف الأفعال الخمسة. */
function CaveDetectiveLab({ lines }: { lines: string[] }) {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const answered = CAVE_VERBS.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === CAVE_VERBS.length;
  const score = CAVE_VERBS.reduce((n, v, i) => n + (picks[i] === v.tense ? 1 : 0), 0);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-cave-detective" emoji="🕵️" label="GRAMMAR DETECTIVE" ar="حدد زمن كل فعل — الماضي البسيط أم التام؟">
        {CAVE_VERBS.map((v, i) => (
          <div key={v.verb} className="rounded-2xl border-2 border-slate-200 bg-white p-2.5">
            <div dir="ltr" className="ltr-row">
              <En className="text-base font-black text-slate-900">{v.verb}</En>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Past Simple", "Past Perfect"].map((t) => {
                const isPick = picks[i] === t;
                const isAnswer = v.tense === t;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button key={t} type="button" onClick={() => setPicks((p) => ({ ...p, [i]: t }))} disabled={checked} aria-pressed={isPick}
                    className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        <CheckBar
          checked={checked}
          allAnswered={allAnswered}
          answered={answered}
          total={CAVE_VERBS.length}
          score={`${score} / ${CAVE_VERBS.length}`}
          onCheck={() => setChecked(true)}
          onReset={() => { setPicks({}); setChecked(false); }}
          hint="حدد زمن كل فعل أولًا"
        />
        {checked && (
          <div className="mt-2 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center text-sm font-bold text-violet-900" aria-live="polite">
            <Rich text="had entered هو الماضي التام الوحيد — لأن الدخول حدث قبل وصول المستكشفين. وwas supposed ماضٍ بسيط ضمن تركيب be." />
          </div>
        )}
      </LabPanel>
    </div>
  );
}

/** ㊱ اختبار المنطق الزمني: read أم was reading؟ */
function LogicTestLab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<"read" | "reading">("read");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-logic-test" emoji="🧠" label="ONGOING OR COMPLETED?" ar="بدّل بين الصيغتين ولاحظ الفرق">
        <div className="flex flex-wrap justify-center gap-2">
          <button type="button" onClick={() => setMode("read")} aria-pressed={mode === "read"} dir="ltr"
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${mode === "read" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            my father read the newspaper
          </button>
          <button type="button" onClick={() => setMode("reading")} aria-pressed={mode === "reading"} dir="ltr"
            className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition ${mode === "reading" ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"}`}>
            my father was reading the newspaper
          </button>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2" aria-live="polite">
          {mode === "read" ? (
            <div className={`rounded-2xl border-2 p-3 text-center sm:col-span-2 ${EVENT.soft}`}>
              <TenseChip tense="event" />
              <div className="mt-1.5 text-sm font-bold text-slate-700">
                <Rich text="حدث مكتمل — لا يعني بالضرورة أنه كان يقرأ في تلك اللحظة." />
              </div>
            </div>
          ) : (
            <div className={`rounded-2xl border-2 p-3 text-center sm:col-span-2 ${PROGRESS.soft}`}>
              <TenseChip tense="progress" />
              <div className="mt-1.5 text-sm font-bold text-slate-700">
                <Rich text="نشاط كان مستمرًا لحظة الاستيقاظ — هذا هو المقصود." />
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 grid gap-1.5">
          <div className={`rounded-xl border-2 p-2 text-center text-xs font-black ${FLASHBACK.soft}`}><En>My brother had left.</En> <Rich text="← أقدم" /></div>
          <div className={`rounded-xl border-2 p-2 text-center text-xs font-black ${PROGRESS.soft}`}><En>My mother was preparing breakfast.</En> <Rich text="← مستمر" /></div>
          <div className={`rounded-xl border-2 p-2 text-center text-xs font-black ${PROGRESS.soft}`}><En>My father was reading the newspaper.</En> <Rich text="← مستمر" /></div>
          <div className={`rounded-xl border-2 p-2 text-center text-xs font-black ${EVENT.soft}`}><En>I woke up.</En> <Rich text="← الحدث الرئيسي" /></div>
        </div>
      </LabPanel>
    </div>
  );
}

/** ㊲ مشهد Alex: صنّف الأفعال الثمانية. */
function AlexSceneLab({ lines }: { lines: string[] }) {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const verbs = ALEX_SCENE_28.verbs;
  const answered = verbs.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === verbs.length;
  const score = verbs.reduce((n, v, i) => n + (picks[i] === v.tense ? 1 : 0), 0);
  const sec = SOURCE_SECTIONS[SEC.s37];
  return (
    <div className="space-y-3">
      <Lines lines={lines.slice(0, 3)} />
      <LabPanel seq="l28-alex-scene" emoji="🎬" label="BUILD A FULL SCENE" ar="حدد زمن كل فعل من الأفعال الثمانية">
        <div className="grid gap-2 sm:grid-cols-2">
          {verbs.map((v, i) => (
            <div key={v.verb} className="rounded-2xl border-2 border-slate-200 bg-white p-2.5">
              <div dir="ltr" className="ltr-row">
                <En className="text-base font-black text-slate-900">{v.verb}</En>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {TENSES_28.map((t) => {
                  const isPick = picks[i] === t;
                  const isAnswer = v.tense === t;
                  let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                  if (checked) {
                    if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                    else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                    else cls = "border-slate-200 bg-white text-slate-300";
                  } else if (isPick) {
                    cls = "border-transparent bg-slate-900 text-white";
                  }
                  return (
                    <button key={t} type="button" onClick={() => setPicks((p) => ({ ...p, [i]: t }))} disabled={checked} aria-pressed={isPick}
                      className={`rounded-xl border-2 px-2.5 py-1.5 font-en text-xs font-black transition disabled:cursor-default ${cls}`}>
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <CheckBar
          checked={checked}
          allAnswered={allAnswered}
          answered={answered}
          total={verbs.length}
          score={`${score} / ${verbs.length}`}
          onCheck={() => setChecked(true)}
          onReset={() => { setPicks({}); setChecked(false); }}
          hint="حدد زمن كل الأفعال الثمانية أولًا"
        />
        {checked && (
          <RevealBlock seq="l28-alex-scene">
            {sec.units.slice(3).map((u, i) => (
              <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
                <Rich text={u} />
              </div>
            ))}
          </RevealBlock>
        )}
      </LabPanel>
    </div>
  );
}

/** ㊳ القاعدة المتقدمة: المعنى أولًا. */
function MeaningRuleLab({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(0);
  const steps = [
    { q: "هل الحدث مستمر؟", a: "Past Continuous", chip: PROGRESS },
    { q: "هل هو حدث ماضٍ عادي؟", a: "Past Simple", chip: EVENT },
    { q: "هل وقع قبل حدث ماضٍ آخر؟", a: "Past Perfect", chip: FLASHBACK },
  ];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-meaning-rule" emoji="🧠" label="MEANING FIRST" ar="ما المعنى الذي أريد التعبير عنه؟">
        <div className="grid gap-2">
          {steps.map((st, i) => {
            const on = open === i;
            return (
              <button key={i} type="button" onClick={() => setOpen(on ? -1 : i)} aria-pressed={on}
                className={`rounded-2xl border-2 p-3 text-right transition ${on ? `${st.chip.soft}` : "border-slate-200 bg-white hover:border-indigo-400"}`}>
                <div className="text-base font-black text-slate-800"><Rich text={st.q} /></div>
                {on && (
                  <div className="mt-1.5" aria-live="polite">
                    <En className={`rounded-lg px-2.5 py-1 text-sm font-black text-white ${st.chip.chip}`}>{st.a}</En>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </LabPanel>
    </div>
  );
}

// ============================================================
// التدريبات المورّدة ㉚–㉝ + التحديات + بانية القصة
// ============================================================

const CIRCLED_28 = ["①", "②", "③", "④", "⑤"];

function McqDrill28({
  items, reveals, seq, exercise, intro, answersHead, letters, circled,
}: {
  items: Mcq28[];
  reveals: string[];
  seq: string;
  exercise: string;
  intro: string;
  answersHead?: string;
  letters?: string[];
  circled?: boolean;
}) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = items.filter((it) => picks[it.n] !== undefined).length;
  const allAnswered = answered === items.length;
  const score = items.reduce((n, it) => n + (picks[it.n] === it.answer ? 1 : 0), 0);
  const reset = () => {
    setPicks({});
    setChecked(false);
  };
  return (
    <div data-en-seq={seq} data-exercise={exercise} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2">
        <span className="text-sm font-black text-indigo-900">
          <Rich text={intro} />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-indigo-700">
          {answered} / {items.length}
        </span>
      </div>
      {items.map((item) => {
        const pick = picks[item.n];
        const picked = pick !== undefined;
        const right = picked && pick === item.answer;
        const card = checked
          ? !picked
            ? "border-slate-200 bg-white"
            : right
              ? "border-emerald-300 bg-emerald-50/60"
              : "border-rose-300 bg-rose-50/60"
          : picked
            ? "border-slate-300 bg-slate-50/70"
            : "border-slate-200 bg-white";
        const stemParts = item.stem.split("______");
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-3 transition ${card}`}>
            <div className="flex flex-wrap items-start gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-700 text-xs font-black text-white">{circled ? CIRCLED_28[item.n - 1] : item.n}</span>
              <div dir="ltr" className="ltr-row min-w-0 flex-1">
                <En className="text-left text-sm font-black text-slate-900 md:text-base">
                  {stemParts[0]}
                  <span className="mx-1 rounded bg-slate-200 px-2 text-slate-400">______</span>
                  {stemParts[1] ?? ""}
                </En>
              </div>
            </div>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-end gap-2">
              {item.opts.map((opt, oi) => {
                const isPick = pick === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                if (checked) {
                  if (oi === item.answer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicks((p) => ({ ...p, [item.n]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition disabled:cursor-default ${cls}`}
                  >
                    {letters?.[oi] ? `${letters[oi]} ${opt}` : opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 text-xs font-bold text-slate-600 md:text-sm">
                <Rich text={!picked ? "⚠ لم تختر إجابة لهذا السؤال." : right ? `✓ صحيح! ${item.why}` : `✕ ${item.why}`} />
              </div>
            )}
          </div>
        );
      })}
      <CheckBar
        checked={checked}
        allAnswered={allAnswered}
        answered={answered}
        total={items.length}
        score={`${score} / ${items.length}`}
        onCheck={() => setChecked(true)}
        onReset={reset}
        hint="أجب عن كل الأسئلة أولًا"
      />
      {checked && (
        <RevealBlock seq={seq}>
          {answersHead && (
            <div className="px-1 text-sm font-black text-emerald-900">
              <Rich text={answersHead} />
            </div>
          )}
          {reveals.map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
        </RevealBlock>
      )}
    </div>
  );
}

/** ㉚ تمرين 1 — اختر. */
function ExChoose() {
  const sec = SOURCE_SECTIONS[SEC.s30];
  return (
    <McqDrill28
      items={EX28_CHOOSE}
      reveals={sec.revealUnits ?? []}
      seq="l28-ex-choose"
      exercise="l28-choose"
      intro={sec.units[0]}
      letters={["A)", "B)"]}
      circled
      answersHead={sec.units[sec.units.length - 1]}
    />
  );
}

/** ㉛ تمرين 2 — حدد الحدث الأول. */
function ExFirstEvent() {
  const sec = SOURCE_SECTIONS[SEC.s31];
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX28_FIRST_EVENT.filter((it) => picks[it.n] !== undefined).length;
  const allAnswered = answered === EX28_FIRST_EVENT.length;
  const score = EX28_FIRST_EVENT.reduce((s, it) => s + (picks[it.n] === it.earlier ? 1 : 0), 0);
  const badges = ["1", "2", "3"];
  return (
    <div data-en-seq="l28-ex-first-event" data-exercise="l28-first-event" className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-900">
        <Rich text="حدد الحدث الأول في كل جملة." />
      </div>
      {EX28_FIRST_EVENT.map((it, i) => {
        const pick = picks[it.n];
        const opts = i % 2 === 0 ? [it.later, it.earlier] : [it.earlier, it.later];
        return (
          <div key={it.n} className="rounded-3xl border-2 border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-indigo-700 text-xs font-black text-white">{badges[i]}</span>
              <div dir="ltr" className="ltr-row min-w-0 flex-1">
                <En className="text-left text-base font-black text-slate-900">{it.sentence}</En>
              </div>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-500"><Rich text="ما الحدث الأول؟" /></div>
            <div className="mt-1.5 grid gap-2">
              {opts.map((o) => {
                const isPick = pick === o;
                const isAnswer = o === it.earlier;
                let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-400";
                if (checked) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button key={o} type="button" onClick={() => setPicks((p) => ({ ...p, [it.n]: o }))} disabled={checked} aria-pressed={isPick} dir="ltr"
                    className={`rounded-xl border-2 px-3 py-2 text-left font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <CheckBar
        checked={checked}
        allAnswered={allAnswered}
        answered={answered}
        total={EX28_FIRST_EVENT.length}
        score={`${score} / ${EX28_FIRST_EVENT.length}`}
        onCheck={() => setChecked(true)}
        onReset={() => { setPicks({}); setChecked(false); }}
        hint="اختر الحدث الأول في كل جملة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-first-event">
          {sec.units.slice(2).map((u, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={u} />
            </div>
          ))}
          <div className="px-1 text-xs font-bold text-slate-600">
            <Rich text="القاعدة: الفعل مع had هو الحدث الأول مهما كان موقعه في الجملة." />
          </div>
        </RevealBlock>
      )}
    </div>
  );
}

/** ㉜ تمرين 3 — صحح الأخطاء. */
function ExErrors() {
  const sec = SOURCE_SECTIONS[SEC.s32];
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX28_ERRORS.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === EX28_ERRORS.length;
  const score = EX28_ERRORS.reduce((n, _, i) => n + (picks[i] === EX28_ERROR_SPOTS[i].answer ? 1 : 0), 0);
  return (
    <div data-en-seq="l28-ex-errors" data-exercise="l28-errors" className="space-y-3">
      <Lines lines={sec.units.slice(0, 5)} />
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-900">
        <Rich text="المس الجزء الخاطئ في كل جملة، ثم صحح." />
      </div>
      {EX28_ERRORS.map((item, i) => {
        const spots = EX28_ERROR_SPOTS[i];
        const pick = picks[i];
        const picked = pick !== undefined;
        const right = picked && pick === spots.answer;
        const card = checked
          ? !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"
          : picked ? "border-slate-300 bg-slate-50/70" : "border-slate-200 bg-white";
        return (
          <div key={i} className={`rounded-3xl border-2 p-3 transition ${card}`}>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-indigo-700 text-xs font-black text-white">{item.n}</span>
              <span className="text-xs font-bold text-slate-500"><Rich text="المس الجزء الخاطئ:" /></span>
            </div>
            <div dir="ltr" className="ltr-row">
              <En className="text-left text-sm font-black text-slate-900">{item.wrong}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-1.5">
              {spots.segs.map((seg, si) => {
                const isPick = pick === si;
                let cls = "border-slate-200 bg-white text-slate-800 hover:border-rose-400";
                if (checked) {
                  if (si === spots.answer) cls = "border-transparent bg-rose-600 text-white";
                  else if (isPick) cls = "border-slate-200 bg-white text-slate-300";
                  else cls = "border-slate-200 bg-white text-slate-400";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={si}
                    type="button"
                    data-spot={`l28-err-${i}-${si}`}
                    onClick={() => setPicks((p) => ({ ...p, [i]: si }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-3 py-2 font-en text-sm font-black transition disabled:cursor-default ${cls}`}
                  >
                    {seg}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 space-y-1 rounded-2xl bg-white p-2.5">
                <En className="block text-sm font-black text-emerald-800">{item.fixed}</En>
                <div className="text-xs font-bold text-slate-600"><Rich text={(right ? "✓ " : "✕ ") + item.why} /></div>
              </div>
            )}
          </div>
        );
      })}
      <CheckBar
        checked={checked}
        allAnswered={allAnswered}
        answered={answered}
        total={EX28_ERRORS.length}
        score={`${score} / ${EX28_ERRORS.length}`}
        onCheck={() => setChecked(true)}
        onReset={() => { setPicks({}); setChecked(false); }}
        hint="حدد الجزء الخاطئ في كل جملة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-errors">
          <div className="text-center text-sm font-black text-emerald-900">
            <Rich text={sec.units[5]} />
          </div>
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
        </RevealBlock>
      )}
    </div>
  );
}

/** ㉝ IQ200 Challenge — John و Mary (مع الملاحظة المنطقية من المنصة). */
function ExJohnMary() {
  const sec = SOURCE_SECTIONS[SEC.s33];
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  return (
    <div data-en-seq="l28-ex-john-mary" data-exercise="l28-john-mary" className="space-y-3">
      <Lines lines={sec.units.slice(0, 4)} />
      <div className="grid gap-2">
        {EX28_JOHN_MARY.options.map((o, oi) => {
          const isPick = pick === oi;
          let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-400";
          if (checked) {
            cls = isPick ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-400";
          } else if (isPick) {
            cls = "border-transparent bg-slate-900 text-white";
          }
          return (
            <button key={oi} type="button" onClick={() => setPick(oi)} disabled={checked} aria-pressed={isPick} dir="ltr"
              className={`rounded-2xl border-2 px-3 py-2.5 text-left font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
              {EX28_JOHN_MARY.letters[oi]}. {o}
            </button>
          );
        })}
      </div>
      <CheckBar
        checked={checked}
        allAnswered={pick !== null}
        answered={pick !== null ? 1 : 0}
        total={1}
        onCheck={() => setChecked(true)}
        onReset={() => { setPick(null); setChecked(false); }}
        hint="اختر جملة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-john-mary">
          <div className="text-center text-sm font-black text-emerald-900">
            <Rich text={sec.units[4]} />
          </div>
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
          <div className="mt-1 space-y-1.5 rounded-2xl border-2 border-amber-300 bg-amber-50 p-3">
            <PlatformTag />
            <div className="mt-1 text-sm font-black text-slate-800">
              <Rich text="ملاحظة منطقية من المنصة — Source Logic Note" />
            </div>
            {EX28_JOHN_MARY.readings.map((r, i) => (
              <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-slate-800">
                <Rich text={r} />
              </div>
            ))}
            <div className="text-xs font-bold leading-relaxed text-slate-700">
              <Rich text={LOGIC_NOTE_S33.clarification} />
            </div>
          </div>
        </RevealBlock>
      )}
    </div>
  );
}

/** ㉞ تحدي أصعب — Sarah و Tom. */
function ExSarahTom() {
  const sec = SOURCE_SECTIONS[SEC.s34];
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const right = pick === EX28_SARAH_TOM.answer;
  return (
    <div data-en-seq="l28-ex-sarah-tom" data-exercise="l28-sarah-tom" className="space-y-3">
      <Lines lines={sec.units} />
      <div className="grid gap-2">
        {EX28_SARAH_TOM.options.map((o, oi) => {
          const isPick = pick === oi;
          const isAnswer = oi === EX28_SARAH_TOM.answer;
          let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-400";
          if (checked) {
            if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
            else if (isPick) cls = "border-transparent bg-rose-600 text-white";
            else cls = "border-slate-200 bg-white text-slate-300";
          } else if (isPick) {
            cls = "border-transparent bg-slate-900 text-white";
          }
          return (
            <button key={oi} type="button" onClick={() => setPick(oi)} disabled={checked} aria-pressed={isPick} dir="ltr"
              className={`rounded-2xl border-2 px-3 py-2.5 text-left font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
              {EX28_SARAH_TOM.letters[oi]}. {o}
            </button>
          );
        })}
      </div>
      <CheckBar
        checked={checked}
        allAnswered={pick !== null}
        answered={pick !== null ? 1 : 0}
        total={1}
        onCheck={() => setChecked(true)}
        onReset={() => { setPick(null); setChecked(false); }}
        hint="اختر جملة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-sarah-tom">
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
          <div className="px-1 text-xs font-bold text-slate-600">
            <Rich text={`${right ? "✓ أحسنت! " : ""}الفعل مع had هو الأقدم: في الجملة B وصول سارة أقدم من مغادرة توم.`} />
          </div>
        </RevealBlock>
      )}
    </div>
  );
}

/** ㉟ ثلاثة أحداث — مختبر Daniel. */
function ExDaniel() {
  const sec = SOURCE_SECTIONS[SEC.s35];
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX28_DANIEL.questions.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === EX28_DANIEL.questions.length;
  const score = EX28_DANIEL.questions.reduce((n, q, i) => n + (picks[i] === q.answer ? 1 : 0), 0);
  const answerUnits = [8, 10, 12];
  return (
    <div data-en-seq="l28-ex-daniel" data-exercise="l28-daniel" className="space-y-3">
      <Lines lines={sec.units.slice(0, 7)} />
      {EX28_DANIEL.questions.map((q, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-3">
          <div className="text-sm font-black text-slate-800"><Rich text={q.q} /></div>
          <div className="mt-2 flex flex-wrap gap-2">
            {EX28_DANIEL.verbs.map((v) => {
              const isPick = picks[i] === v;
              const isAnswer = q.answer === v;
              let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
              if (checked) {
                if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                else cls = "border-slate-200 bg-white text-slate-300";
              } else if (isPick) {
                cls = "border-transparent bg-slate-900 text-white";
              }
              return (
                <button key={v} type="button" onClick={() => setPicks((p) => ({ ...p, [i]: v }))} disabled={checked} aria-pressed={isPick} dir="ltr"
                  className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                  {v}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <CheckBar
        checked={checked}
        allAnswered={allAnswered}
        answered={answered}
        total={EX28_DANIEL.questions.length}
        score={`${score} / ${EX28_DANIEL.questions.length}`}
        onCheck={() => setChecked(true)}
        onReset={() => { setPicks({}); setChecked(false); }}
        hint="أجب عن الأسئلة الثلاثة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-daniel">
          {answerUnits.map((ui, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={sec.units[ui]} />
            </div>
          ))}
          <div className="px-1 text-xs font-bold text-slate-600">
            <Rich text="had completed قبل الدخول، وwere discussing كان مستمرًا لحظة الدخول، وjoined جاء بعد ذلك." />
          </div>
        </RevealBlock>
      )}
    </div>
  );
}

/** ㊴ Boss Battle — الحديقة والكلب. */
function ExBoss() {
  const sec = SOURCE_SECTIONS[SEC.s39];
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const right = pick === BOSS_28.answer;
  const letters = ["A", "B", "C"];
  return (
    <div data-en-seq="l28-ex-boss" data-exercise="l28-boss" className="space-y-3">
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-900">
        <Rich text={sec.units[0]} />
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-3">
        <div className="text-sm font-black text-slate-800"><Rich text={sec.units[1]} /></div>
        <div className="mt-1 rounded-2xl bg-slate-50 p-2.5 text-base font-black text-slate-900">
          <Rich text={sec.units[2]} />
        </div>
        <div className="mt-2 grid gap-2">
          {BOSS_28.opts.map((opt, oi) => {
            const isPick = pick === oi;
            const isAnswer = oi === BOSS_28.answer;
            let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
            if (checked) {
              if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
              else if (isPick) cls = "border-transparent bg-rose-600 text-white";
              else cls = "border-slate-200 bg-white text-slate-300";
            } else if (isPick) {
              cls = "border-transparent bg-slate-900 text-white";
            }
            return (
              <button key={oi} type="button" onClick={() => setPick(oi)} disabled={checked} aria-pressed={isPick} dir="ltr"
                className={`rounded-xl border-2 px-4 py-2.5 text-left font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                {letters[oi]}. {opt}
              </button>
            );
          })}
        </div>
      </div>
      <CheckBar
        checked={checked}
        allAnswered={pick !== null}
        answered={pick !== null ? 1 : 0}
        total={1}
        label="⚔️ تحقق من المعركة"
        onCheck={() => setChecked(true)}
        onReset={() => { setPick(null); setChecked(false); }}
        hint="اختر الجملة المناسبة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-boss">
          <div className="text-center text-sm font-black text-emerald-900">
            <Rich text={sec.units[9]} />
          </div>
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
          <div className="px-1 text-xs font-bold text-slate-600">
            <Rich text={right ? "✓ اختيار صحيح — ثلاث طبقات زمنية في جملة واحدة." : "الخيار A يفقد الاستمرار والرجوع إلى الوراء، والخيار C يسيء استخدام الأزمنة الثلاثة."} />
          </div>
        </RevealBlock>
      )}
    </div>
  );
}

/** IQ200 FINAL — مشهد المطار: صنّف كل جزء. */
function ExIqFinal() {
  const sec = SOURCE_SECTIONS[SEC.iqfinal];
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const parts = IQFINAL_28.parts;
  const answered = parts.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === parts.length;
  const score = parts.reduce((n, p, i) => n + (picks[i] === p.tense ? 1 : 0), 0);
  return (
    <div data-en-seq="l28-ex-iqfinal" data-exercise="l28-iqfinal" className="space-y-3">
      <Lines lines={sec.units} />
      <div dir="ltr" className="ltr-row rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-3 text-center">
        <En className="text-base font-black text-slate-900">{IQFINAL_28.sentence}</En>
      </div>
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-900">
        <Rich text="حدد زمن كل جزء:" />
      </div>
      {parts.map((p, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-3">
          <div dir="ltr" className="ltr-row">
            <En className="text-left text-base font-black text-slate-900">{p.text}</En>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {TENSES_28.map((t) => {
              const isPick = picks[i] === t;
              const isAnswer = p.tense === t;
              let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
              if (checked) {
                if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                else cls = "border-slate-200 bg-white text-slate-300";
              } else if (isPick) {
                cls = "border-transparent bg-slate-900 text-white";
              }
              return (
                <button key={t} type="button" onClick={() => setPicks((prev) => ({ ...prev, [i]: t }))} disabled={checked} aria-pressed={isPick}
                  className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <CheckBar
        checked={checked}
        allAnswered={allAnswered}
        answered={answered}
        total={parts.length}
        score={`${score} / ${parts.length}`}
        onCheck={() => setChecked(true)}
        onReset={() => { setPicks({}); setChecked(false); }}
        hint="حدد زمن كل الأجزاء الأربعة أولًا"
      />
      {checked && (
        <RevealBlock seq="l28-ex-iqfinal">
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
        </RevealBlock>
      )}
    </div>
  );
}

// ---------------- عدّادات بانية القصة ----------------
const IRREG_V3_28 = new Set(
  "gone eaten seen taken written broken spoken chosen forgotten known been done had made sold told felt kept slept heard left met paid said sent spent stood understood won thought bought brought caught fought sought taught forgot frozen hidden risen driven ridden beaten bitten become come run spread drunk woken".split(" ")
);
const IRREG_PS_28 = new Set(
  "went ate saw took wrote broke spoke chose forgot knew left arrived started finished closed cooked walked looked realized found lost ran stopped heard came rang knocked began opened noticed dropped stepped picked met watched entered called sat stood turned felt got woke fell drove rode sang sank drank swam joined reached prepared completed escaped discussed spread made".split(" ")
);

function countPP28(text: string): number {
  const re = /\bhad(?:n't|\s+not)?(?:\s+(?:never|already|just|ever|also|even|really))?\s+([a-zA-Z]+)/gi;
  let n = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const w = m[1].toLowerCase();
    if (w.endsWith("ed") || w.endsWith("en") || IRREG_V3_28.has(w)) n++;
  }
  return n;
}

function countPC28(text: string): number {
  return (text.match(/\b(was|were)\b\s+\w+ing/gi) || []).length;
}

function countPS28(text: string): number {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  let n = 0;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prev = words[i - 1] ?? "";
    if (["was", "were", "had", "has", "have", "hadn't", "hasn't", "haven't"].includes(prev)) continue;
    if (IRREG_PS_28.has(w)) {
      n++;
      continue;
    }
    if (w.endsWith("ed") && w.length > 3 && !w.endsWith("eed")) n++;
  }
  return n;
}

/** ㊵ بانية القصة — The Missing Backpack (كتابة ذاتية، بلا توليد تلقائي). */
function ExStory() {
  const sec = SOURCE_SECTIONS[SEC.s40];
  const [text, setText] = useState("");
  const [surprise, setSurprise] = useState(false);
  const [ending, setEnding] = useState(false);
  const sentences = (text.match(/[.?!]+/g) || []).length;
  const ps = countPS28(text);
  const pc = countPC28(text);
  const pp = countPP28(text);
  const hasWhen = /\bwhen\b/i.test(text);
  const hasWhile = /\bwhile\b/i.test(text);
  const hasBeforeAfter = /\b(before|after)\b/i.test(text);
  const hasAlready = /\balready\b/i.test(text);
  const chrono = pp >= 1 && ps >= 1;
  const checks = [
    { label: "الجمل", pass: sentences >= 1, value: `${sentences}` },
    { label: "Past Simple ≥ 4", pass: ps >= 4, value: `${ps}` },
    { label: "Past Continuous ≥ 3", pass: pc >= 3, value: `${pc}` },
    { label: "Past Perfect ≥ 3", pass: pp >= 3, value: `${pp}` },
    { label: "when", pass: hasWhen, value: hasWhen ? "✓" : "✕" },
    { label: "while", pass: hasWhile, value: hasWhile ? "✓" : "✕" },
    { label: "before / after", pass: hasBeforeAfter, value: hasBeforeAfter ? "✓" : "✕" },
    { label: "already", pass: hasAlready, value: hasAlready ? "✓" : "✕" },
    { label: "زوج مرتب (had+V3 + ماضٍ بسيط)", pass: chrono, value: chrono ? "✓" : "✕" },
  ];
  return (
    <div data-en-seq="l28-ex-story" data-exercise="l28-story" className="space-y-3">
      <Lines lines={[sec.units[0]]} />
      <div dir="ltr" className="ltr-row rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 p-3 text-center">
        <En className="text-lg font-black text-indigo-900">“{STORY_28_TITLE}”</En>
      </div>
      <Lines lines={[sec.units[2]]} />
      <div className="grid gap-1.5 sm:grid-cols-2">
        {sec.units.slice(3, 13).map((u, i) => (
          <div key={i} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700">
            <Rich text={u} />
          </div>
        ))}
      </div>
      <Lines lines={[sec.units[13]]} />
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/50 p-3">
        <div className="text-center text-xs font-black text-indigo-900">
          <Rich text="اكتب قصتك هنا بنفسك — لا يكتبها أحد عنك:" />
        </div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          aria-label="story text"
          placeholder="Write your story here…"
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-indigo-400"
        />
        <div className="mt-1 text-center text-[11px] font-bold text-slate-400">
          <Rich text="العدّادات مؤشرات تلقائية تقريبية — التأكد النهائي بمراجعتك أنت ومراجعة معلمك." />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {checks.map((c) => (
            <div key={c.label} className={`rounded-xl border-2 px-3 py-2 text-center text-xs font-black ${c.pass ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500"}`}>
              <Rich text={c.label} />
              <span className="mx-1">·</span>
              <En>{c.value}</En>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => setSurprise((s) => !s)} aria-pressed={surprise}
            className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-right transition ${surprise ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${surprise ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>{surprise ? "✓" : ""}</span>
            <span className="text-xs font-bold text-slate-700"><Rich text={sec.units[11]} /></span>
          </button>
          <button type="button" onClick={() => setEnding((s) => !s)} aria-pressed={ending}
            className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-right transition ${ending ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${ending ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>{ending ? "✓" : ""}</span>
            <span className="text-xs font-bold text-slate-700"><Rich text={sec.units[12]} /></span>
          </button>
        </div>
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => { setText(""); setSurprise(false); setEnding(false); }}
            className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-200"
          >
            <Rich text="↺ إعادة ضبط المهمة" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// منطقة الاختبارات — 20 سؤالًا بأنواع منظمة
// لا كشف قبل «إنهاء الاختبار»: لا ألوان صواب، لا درجات، لا شروح.
// ============================================================

export type TestAnswer28 = number | boolean | number[] | string[] | Record<number, number>;

const TYPE_LABEL_28: Record<TestQ28["type"], string> = {
  single: "اختيار واحد",
  tf: "صح / خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "توصيل",
  spot: "اكتشاف الخطأ",
};

function isAnswered28(q: TestQ28, a: TestAnswer28 | undefined): boolean {
  if (a === undefined) return false;
  switch (q.type) {
    case "single":
    case "spot":
      return typeof a === "number";
    case "tf":
      return typeof a === "boolean";
    case "multi":
      return Array.isArray(a) && a.length > 0;
    case "order":
      return Array.isArray(a) && a.length === q.items.length;
    case "match":
      return typeof a === "object" && !Array.isArray(a) && q.left.every((_, i) => (a as Record<number, number>)[i] !== undefined);
    default:
      return false;
  }
}

function isCorrect28(q: TestQ28, a: TestAnswer28 | undefined): boolean {
  if (!isAnswered28(q, a)) return false;
  switch (q.type) {
    case "single":
    case "spot":
      return a === q.answer;
    case "tf":
      return a === q.answer;
    case "multi": {
      const got = [...(a as number[])].sort().join(",");
      const want = [...q.answer].sort().join(",");
      return got === want;
    }
    case "order":
      return (a as string[]).join("|") === q.answer.join("|");
    case "match":
      return q.left.every((_, i) => (a as Record<number, number>)[i] === q.answer[i]);
    default:
      return false;
  }
}

function QShell({ n, type, ar, en, children, state }: {
  n: number; type: TestQ28["type"]; ar: string; en?: string; children: ReactNode;
  state: "idle" | "picked" | "right" | "wrong" | "skipped";
}) {
  const card =
    state === "right" ? "border-emerald-300 bg-emerald-50/50"
    : state === "wrong" ? "border-rose-300 bg-rose-50/50"
    : state === "picked" ? "border-slate-300 bg-slate-50/70"
    : "border-slate-200 bg-white";
  return (
    <div data-test-q={n} className={`rounded-3xl border-2 p-4 transition ${card}`}>
      <div className="flex flex-wrap items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">
          {n}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-black text-indigo-800">
              {TYPE_LABEL_28[type]}
            </span>
            {(state === "right" || state === "wrong") && (
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${state === "right" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
                {state === "right" ? "✓ صحيح" : "✕ خطأ"}
              </span>
            )}
          </div>
          <div className="mt-1 font-bold text-slate-800">
            <Rich text={ar} />
          </div>
          {en && (
            <div dir="ltr" className="font-en mt-1 text-left text-lg font-extrabold text-slate-900">
              {en}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function NeutralOpt({ selected, revealed, isAnswer, isPick, onClick, disabled, label, en }: {
  selected: boolean; revealed: boolean; isAnswer: boolean; isPick: boolean;
  onClick: () => void; disabled: boolean; label: string; en?: boolean;
}) {
  let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
  if (revealed) {
    if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
    else if (isPick) cls = "border-transparent bg-rose-600 text-white";
    else cls = "border-slate-200 bg-white text-slate-300";
  } else if (selected) {
    cls = "border-transparent bg-slate-900 text-white";
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      dir={en ? "ltr" : undefined}
      className={`rounded-xl border-2 px-3 py-2 text-sm font-black transition active:scale-[0.98] disabled:cursor-default ${en ? "font-en text-left" : ""} ${cls}`}
    >
      {en ? label : <Rich text={label} />}
    </button>
  );
}

function TSingle({ q, value, checked, onChange }: { q: Extract<TestQ28, { type: "single" }>; value: number | undefined; checked: boolean; onChange: (v: number) => void }) {
  return (
    <div dir="ltr" className="ltr-row grid gap-2 sm:grid-cols-3">
      {q.opts.map((o, oi) => (
        <NeutralOpt key={oi} en selected={value === oi} revealed={checked} isAnswer={oi === q.answer} isPick={value === oi} onClick={() => onChange(oi)} disabled={checked} label={o} />
      ))}
    </div>
  );
}

function TTf({ q, value, checked, onChange }: { q: Extract<TestQ28, { type: "tf" }>; value: boolean | undefined; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {([true, false] as const).map((b) => (
        <NeutralOpt key={String(b)} selected={value === b} revealed={checked} isAnswer={b === q.answer} isPick={value === b} onClick={() => onChange(b)} disabled={checked} label={b ? "✓ صحيح" : "✕ خطأ"} />
      ))}
    </div>
  );
}

function TMulti({ q, value, checked, onChange }: { q: Extract<TestQ28, { type: "multi" }>; value: number[] | undefined; checked: boolean; onChange: (v: number[]) => void }) {
  const sel = value ?? [];
  const toggle = (oi: number) => {
    if (checked) return;
    onChange(sel.includes(oi) ? sel.filter((x) => x !== oi) : [...sel, oi]);
  };
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold text-slate-500">
        <Rich text="اختر كل الإجابات الصحيحة — تُحتسب الدرجة عند اختيار الصحيح فقط." />
      </div>
      <div dir="ltr" className="ltr-row grid gap-2">
        {q.opts.map((o, oi) => (
          <NeutralOpt key={oi} en selected={sel.includes(oi)} revealed={checked} isAnswer={q.answer.includes(oi)} isPick={sel.includes(oi)} onClick={() => toggle(oi)} disabled={checked} label={o} />
        ))}
      </div>
    </div>
  );
}

function TOrder({ q, value, checked, onChange }: { q: Extract<TestQ28, { type: "order" }>; value: string[] | undefined; checked: boolean; onChange: (v: string[]) => void }) {
  const seq = value ?? [];
  const toggle = (item: string) => {
    if (checked) return;
    onChange(seq.includes(item) ? seq.filter((x) => x !== item) : seq.length >= q.items.length ? seq : [...seq, item]);
  };
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold text-slate-500">
        <Rich text="المس الأحداث بالترتيب من الأقدم إلى الأحدث." />
      </div>
      <div className="grid gap-2">
        {q.items.map((item) => {
          const pos = seq.indexOf(item);
          const on = pos !== -1;
          let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-400";
          if (checked) {
            const wantPos = q.answer.indexOf(item);
            cls = pos === wantPos && on ? "border-transparent bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-400";
          } else if (on) {
            cls = "border-transparent bg-slate-900 text-white";
          }
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              disabled={checked}
              aria-pressed={on}
              dir="ltr"
              className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left font-en text-sm font-black transition disabled:cursor-default ${cls}`}
            >
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs ${on || checked ? "bg-white/25" : "bg-slate-100 text-slate-500"}`}>
                {on ? pos + 1 : "·"}
              </span>
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600" aria-live="polite">
        <Rich text="ترتيبك:" />
        <En>{seq.length ? seq.map((s) => q.items.indexOf(s) + 1).join(" → ") : "—"}</En>
        {seq.length > 0 && !checked && (
          <button type="button" onClick={() => onChange([])} className="mr-auto rounded-lg bg-white px-2.5 py-1 text-[11px] font-black text-slate-500 shadow-sm">
            <Rich text="↺ مسح" />
          </button>
        )}
      </div>
    </div>
  );
}

function TMatch({ q, value, checked, onChange }: { q: Extract<TestQ28, { type: "match" }>; value: Record<number, number> | undefined; checked: boolean; onChange: (v: Record<number, number>) => void }) {
  const pairs = value ?? {};
  const [active, setActive] = useState<number | null>(null);
  // عرض العمود الأيمن بترتيب مدوّر ثابت — حتى لا يكشف الترتيبُ الأصلي الإجابةَ.
  const rightOrder = useMemo(() => q.right.map((_, i) => (i + 1) % q.right.length), [q.right.length]);
  const tapLeft = (li: number) => {
    if (checked) return;
    if (pairs[li] !== undefined) {
      const n = { ...pairs };
      delete n[li];
      onChange(n);
      setActive(null);
      return;
    }
    setActive(li);
  };
  const tapRight = (origRi: number) => {
    if (checked || active === null) return;
    if (Object.values(pairs).includes(origRi)) return;
    onChange({ ...pairs, [active]: origRi });
    setActive(null);
  };
  const usedBy = (origRi: number) => Object.entries(pairs).find(([, r]) => r === origRi)?.[0];
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold text-slate-500">
        <Rich text="المس فعلًا من اليمين ثم دوره من اليسار — المس الزوج مرة أخرى لفكّه." />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1.5">
          <div className="text-center text-xs font-black text-slate-400"><Rich text="الأفعال" /></div>
          {q.left.map((l, li) => {
            const paired = pairs[li] !== undefined;
            let cls = "border-slate-200 bg-white text-slate-800 hover:border-indigo-400";
            if (checked) {
              cls = pairs[li] === q.answer[li] ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white";
            } else if (paired) {
              cls = "border-transparent bg-slate-900 text-white";
            } else if (active === li) {
              cls = "border-indigo-500 bg-indigo-50 text-indigo-900";
            }
            return (
              <button key={li} type="button" onClick={() => tapLeft(li)} disabled={checked} aria-pressed={paired} dir="ltr"
                className={`w-full rounded-xl border-2 px-3 py-2 font-en text-sm font-black transition disabled:cursor-default ${cls}`}>
                {l}
              </button>
            );
          })}
        </div>
        <div className="space-y-1.5">
          <div className="text-center text-xs font-black text-slate-400"><Rich text="الأدوار" /></div>
          {rightOrder.map((origRi) => {
            const by = usedBy(origRi);
            const paired = by !== undefined;
            let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
            if (checked) {
              const li = Number(by);
              cls = paired && q.answer[li] === origRi ? "border-transparent bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-300";
            } else if (paired) {
              cls = "border-transparent bg-slate-900 text-white";
            }
            return (
              <button key={origRi} type="button" onClick={() => tapRight(origRi)} disabled={checked || active === null} aria-pressed={paired}
                className={`w-full rounded-xl border-2 px-3 py-2 text-sm font-black transition disabled:cursor-default ${cls}`}>
                <Rich text={q.right[origRi]} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-xl bg-slate-50 px-3 py-1.5 text-center text-xs font-black text-slate-600" aria-live="polite">
        <Rich text={Object.keys(pairs).length === q.left.length ? `تم التوصيل: ${Object.keys(pairs).length} / ${q.left.length}` : active !== null ? "الآن المس الدور المناسب…" : "ابدأ بلمس فعل…"} />
      </div>
    </div>
  );
}

function TSpot({ q, value, checked, onChange }: { q: Extract<TestQ28, { type: "spot" }>; value: number | undefined; checked: boolean; onChange: (v: number) => void }) {
  return (
    <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5">
      {q.segments.map((seg, si) => (
        <NeutralOpt key={si} en selected={value === si} revealed={checked} isAnswer={si === q.answer} isPick={value === si} onClick={() => onChange(si)} disabled={checked} label={seg} />
      ))}
    </div>
  );
}

export function TestArea28({ onCheckedChange, onShowSolutions }: { onCheckedChange?: (c: boolean) => void; onShowSolutions?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, TestAnswer28>>({});
  const [checked, setChecked] = useState(false);
  const answered = TEST_28.filter((q) => isAnswered28(q, answers[q.n])).length;
  const allAnswered = answered === TEST_28.length;
  const score = useMemo(
    () => TEST_28.reduce((s, q) => s + (isCorrect28(q, answers[q.n]) ? 1 : 0), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, checked]
  );
  const pct = Math.round((score / TEST_28.length) * 100);
  const msg =
    pct === 100 ? "🏆 ممتاز! علامة كاملة في ترتيب الأحداث."
    : pct >= 80 ? "🌟 رائع جدًا! راجع الحلول للأسئلة الخاطئة فقط."
    : pct >= 60 ? "👍 جيد! راجع خط الزمن وقرار «بسيط أم تام» ثم حاول مجددًا."
    : "💪 لا بأس — أعد الدرس من البداية ثم أعد الاختبار.";
  const submit = () => {
    setChecked(true);
    onCheckedChange?.(true);
  };
  const reset = () => {
    setAnswers({});
    setChecked(false);
    onCheckedChange?.(false);
  };
  const set = (n: number, v: TestAnswer28) => setAnswers((p) => ({ ...p, [n]: v }));

  return (
    <div data-area="l28-test" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-4">
        <span className="text-2xl">📝</span>
        <div className="min-w-0 flex-1">
          <div className="font-black text-slate-800">
            <Rich text={`منطقة الاختبارات — ${TEST_28.length} سؤالًا جديدًا بأنواع منظمة`} />
          </div>
          <div className="text-xs font-bold text-slate-500">
            <Rich text="أجب عنها كلها بحرية — لا يظهر أي تصحيح قبل «إنهاء الاختبار»." />
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
          <Rich text={`أجبت عن ${answered} / ${TEST_28.length}`} />
        </span>
      </div>

      <div className="grid gap-3">
        {TEST_28.map((q) => {
          const a = answers[q.n];
          const state = !checked ? (isAnswered28(q, a) ? "picked" : "idle") : isCorrect28(q, a) ? "right" : "wrong";
          return (
            <QShell key={q.n} n={q.n} type={q.type} ar={q.ar} en={q.type === "spot" ? undefined : q.en} state={state}>
              {q.type === "single" && <TSingle q={q} value={a as number | undefined} checked={checked} onChange={(v) => set(q.n, v)} />}
              {q.type === "tf" && <TTf q={q} value={a as boolean | undefined} checked={checked} onChange={(v) => set(q.n, v)} />}
              {q.type === "multi" && <TMulti q={q} value={a as number[] | undefined} checked={checked} onChange={(v) => set(q.n, v)} />}
              {q.type === "order" && <TOrder q={q} value={a as string[] | undefined} checked={checked} onChange={(v) => set(q.n, v)} />}
              {q.type === "match" && <TMatch q={q} value={a as Record<number, number> | undefined} checked={checked} onChange={(v) => set(q.n, v)} />}
              {q.type === "spot" && <TSpot q={q} value={a as number | undefined} checked={checked} onChange={(v) => set(q.n, v)} />}
            </QShell>
          );
        })}
      </div>

      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-indigo-900/10 bg-white/95 p-4 shadow-xl backdrop-blur" role="status" aria-live="polite">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={submit}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "أجب عن كل الأسئلة أولًا"}
                className="rounded-xl bg-indigo-700 px-5 py-2.5 font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
              >
                <Rich text={`إنهاء الاختبار (${answered}/${TEST_28.length})`} />
              </button>
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                <Rich text="↺ إعادة" />
              </button>
            </>
          ) : (
            <>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-700 text-xl font-extrabold text-white">
                {pct}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-slate-800">
                  <Rich text={`نتيجتك: ${score} / ${TEST_28.length} — صحيح ${score} · خطأ ${TEST_28.length - score}`} />
                </div>
                <div className="text-sm font-semibold text-slate-500">{msg}</div>
              </div>
              {onShowSolutions && (
                <button
                  type="button"
                  onClick={onShowSolutions}
                  className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700"
                >
                  <Rich text="📖 عرض حلول الاختبارات" />
                </button>
              )}
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                <Rich text="↺ إعادة الاختبار" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// حلول الاختبارات — منطقة مستقلة: 20 حلًا مفصلًا
// لا يُرنَّر أي حل قبل الاستحقاق (إنهاء الاختبار أو فتح المعلم).
// ============================================================

function solutionAnswer(q: TestQ28): ReactNode {
  switch (q.type) {
    case "single":
      return <En className="text-emerald-800">{q.opts[q.answer]}</En>;
    case "tf":
      return <Rich text={q.answer ? "✓ صحيح" : "✕ خطأ"} />;
    case "multi":
      return (
        <span className="space-y-1">
          {q.answer.map((i) => (
            <En key={i} className="mr-2 block text-emerald-800 md:inline">{`✓ ${q.opts[i]}`}</En>
          ))}
        </span>
      );
    case "order":
      return (
        <span className="space-y-1">
          {q.answer.map((s, i) => (
            <En key={i} className="block text-emerald-800">{`${i + 1}. ${s}`}</En>
          ))}
        </span>
      );
    case "match":
      return (
        <span className="space-y-1">
          {q.left.map((l, i) => (
            <span key={i} className="block">
              <En className="text-emerald-800">{l}</En>
              <span className="mx-1 text-slate-400">←→</span>
              <Rich text={q.right[q.answer[i]]} className="text-emerald-800" />
            </span>
          ))}
        </span>
      );
    case "spot":
      return <En className="text-emerald-800">{q.fix}</En>;
  }
}

export function Solutions28({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest?: () => void; onGoTeacher?: () => void }) {
  if (!unlocked) {
    return (
      <div data-area="l28-solutions" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center md:p-10">
        <div className="text-5xl">📖</div>
        <h3 className="font-head mt-3 text-2xl font-bold text-slate-900">
          <Rich text="حلول الاختبارات — الدرس 28" />
        </h3>
        <p className="mx-auto mt-2 max-w-md text-base font-semibold text-slate-500">
          <Rich text="الحلول المفصلة للأسئلة العشرين تظهر بعد إنهاء الاختبار — أو بفتح منطقة المعلم." />
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {onGoTest && (
            <button type="button" onClick={onGoTest} className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-800">
              <Rich text="← إلى منطقة الاختبارات" />
            </button>
          )}
          {onGoTeacher && (
            <button type="button" onClick={onGoTeacher} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700">
              <Rich text="فتح منطقة المعلم" />
            </button>
          )}
        </div>
      </div>
    );
  }
  return (
    <div data-area="l28-solutions" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
        <span className="text-2xl">📖</span>
        <div className="min-w-0 flex-1">
          <div className="font-black text-slate-800">
            <Rich text={`حلول الاختبارات — ${TEST_28.length} حلًا مفصلًا`} />
          </div>
          <div className="text-xs font-bold text-slate-500">
            <Rich text="كل حل: الإجابة الصحيحة + التعليل + تنبيه الفخ + العلاقة الزمنية." />
          </div>
        </div>
      </div>
      {TEST_28.map((q) => (
        <div key={q.n} data-solution={q.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
              {q.n}
            </span>
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-black text-indigo-800">
                {TYPE_LABEL_28[q.type]}
              </span>
              <div className="mt-1 font-bold text-slate-800">
                <Rich text={q.ar} />
              </div>
              {q.type !== "spot" && q.en && (
                <div dir="ltr" className="font-en mt-1 text-left text-lg font-extrabold text-slate-900">
                  {q.en}
                </div>
              )}
              {q.type === "spot" && (
                <div dir="ltr" className="font-en mt-1 text-left text-lg font-extrabold text-slate-900">
                  {q.segments.join(" ")}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-3 text-sm font-bold">
            <span className="text-slate-500"><Rich text="الإجابة الصحيحة: " /></span>
            {solutionAnswer(q)}
          </div>
          <div className="mt-2 text-sm font-bold text-slate-700">
            <Rich text={`💡 ${q.why}`} />
          </div>
          {q.trap && (
            <div className="mt-1 text-sm font-bold text-amber-800">
              <Rich text={`⚠️ فخ: ${q.trap}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// منطقة المعلم — الدرس 28 (خلف كلمة المرور somer173)
// ============================================================

export function TeacherArea28({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange?: (ok: boolean) => void; onGoSolutions?: () => void }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!unlocked) {
    return (
      <div data-area="l28-teacher" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-200 text-xl">🧑‍🏫</span>
          <div className="min-w-0 flex-1">
            <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">
              Teacher's Area — Lesson 28
            </div>
            <div className="text-sm font-bold text-slate-500">
              <Rich text="منطقة المعلم — الدرس 28 · دليل التدريس وحلول الأنشطة" />
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-400 shadow-sm">🔒 مقفلة</span>
        </div>
        <form
          className="mt-4 flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() === TEACHER_PASSWORD_28) {
              onUnlockChange?.(true);
              setWrong(false);
              setValue("");
            } else {
              setWrong(true);
              setAttempts((n) => n + 1);
            }
          }}
        >
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); if (wrong) setWrong(false); }}
            placeholder="كلمة المرور"
            aria-label="كلمة مرور منطقة المعلم"
            dir="ltr"
            autoComplete="off"
            className="font-en w-44 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400"
          />
          <button type="submit" className="rounded-xl bg-indigo-700 px-4 py-2 font-bold text-white shadow transition hover:bg-indigo-800 active:scale-[0.98]">
            🔓 فتح المنطقة
          </button>
          <span className="text-sm font-bold text-slate-400">خاص بالمعلم فقط</span>
          {wrong && (
            <div key={attempts} className="shake w-full text-sm font-bold text-rose-600">
              ✕ كلمة المرور غير صحيحة — المنطقة ما زالت مقفلة.
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div data-area="l28-teacher" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-indigo-200 bg-white/80 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-indigo-700 text-xl text-white">🧑‍🏫</span>
        <div className="min-w-0 flex-1">
          <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">
            Teacher's Area — Lesson 28
          </div>
          <div className="text-sm font-bold text-slate-500">
            <Rich text="منطقة المعلم — الدرس 28 · دليل التدريس وحلول الأنشطة" />
          </div>
        </div>
        <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-bold text-white shadow-sm">✓ Unlocked</span>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text={TEACHER_28_OVERVIEW.title} />
        </h3>
        <div className="mt-2 space-y-2">
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
            <span className="font-black text-indigo-800"><Rich text="موضوع الدرس: " /></span>
            <Rich text={TEACHER_28_OVERVIEW.theme} />
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700">
            <span className="font-black text-indigo-800"><Rich text="المهارة الجوهرية: " /></span>
            <Rich text={TEACHER_28_OVERVIEW.coreSkill} />
          </div>
          <div className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-900">
            <span className="font-black"><Rich text="العلاقة بالدرس 27: " /></span>
            <Rich text={TEACHER_28_OVERVIEW.lesson27Link} />
          </div>
        </div>
        <div className="mt-3 text-sm font-black text-indigo-800"><Rich text="الأهداف التعليمية — 10 أهداف" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_28_OVERVIEW.objectives.map((o, i) => (
            <li key={i} className="rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={`${i + 1}. ${o}`} /></li>
          ))}
        </ul>
        <div className="mt-3 text-sm font-black text-indigo-800"><Rich text="المفاهيم الجوهرية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_28_OVERVIEW.core.map((o, i) => (
            <li key={i} className="rounded-xl bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-900"><Rich text={o} /></li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text="Teaching Notes — ملاحظات التدريس" />
        </h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_28_NOTES.map((n, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3">
              <div className="text-sm font-black text-slate-900"><Rich text={n.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {n.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-600"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text="Activity Solutions — حلول أنشطة المصدر" />
        </h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_28_SOLUTIONS.map((s, i) => (
            <div key={i} data-teacher-solution={i} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-3">
              <div className="text-sm font-black text-emerald-900"><Rich text={s.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {s.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-700"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text={TEACHER_28_RUBRIC.head} />
        </h3>
        <ul className="mt-2 space-y-1">
          {TEACHER_28_RUBRIC.lines.map((l, i) => (
            <li key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={l} /></li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text="Common Mistakes — الأخطاء الشائعة" />
        </h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_28_MISTAKES.map((mm, i) => (
            <div key={i} className="rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-3">
              <div className="text-sm font-black text-rose-900"><Rich text={mm.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {mm.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-700"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {onGoSolutions && (
        <div className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
          <span className="text-2xl">📖</span>
          <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">
            <Rich text="حلول الاختبار العشرون المفصلة في منطقة مستقلة — مفتوحة لك الآن." />
          </div>
          <button type="button" onClick={onGoSolutions} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700">
            <Rich text="← فتح حلول الاختبارات" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ExerciseView + Lab dispatch + BlockView
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise28 }) {
  switch (exercise.type) {
    case "choose":
      return <ExChoose />;
    case "firstEvent":
      return <ExFirstEvent />;
    case "errors":
      return <ExErrors />;
    case "johnMary":
      return <ExJohnMary />;
    case "sarahTom":
      return <ExSarahTom />;
    case "daniel":
      return <ExDaniel />;
    case "boss":
      return <ExBoss />;
    case "iqFinal":
      return <ExIqFinal />;
    case "story":
      return <ExStory />;
  }
}

const LABS: Record<Lab28, (props: { lines: string[] }) => ReactNode> = {
  firstQuestion: (p) => <FirstQuestionLab {...p} />,
  timelineShop: (p) => <TimelineShopLab {...p} />,
  mayaSwitch: (p) => (
    <div className="space-y-3">
      <Lines lines={p.lines} />
      <SwitchLab
        seq="l28-maya-switch"
        emoji="🎯"
        label="SIMPLE VS PERFECT SWITCH"
        ar="كلمة واحدة تغيّر ترتيب الأحداث"
        s1="When Maya arrived, Daniel left."
        s2="When Maya arrived, Daniel had left."
        order1={["Maya arrived", "Daniel left"]}
        order2={["Daniel left", "Maya arrived"]}
        note1="بدون had: وصلت مايا أولًا، ثم غادر دانيال."
        note2="مع had: غادر دانيال قبل وصول مايا."
      />
    </div>
  ),
  necklaceOrder: (p) => <NecklaceOrderLab {...p} />,
  compareDirect: (p) => <CompareDirectLab {...p} />,
  oldMyth: (p) => <OldMythLab {...p} />,
  beforeOptional: (p) => <BeforeOptionalLab {...p} />,
  whyPerfect: (p) => (
    <div className="space-y-3">
      <Lines lines={p.lines} />
      <SwitchLab
        seq="l28-why-perfect"
        emoji="🧠"
        label="WHY PAST PERFECT?"
        ar="بدّل بين الجملتين — ماذا يضيف الماضي التام؟"
        s1="The students left before the teacher arrived."
        s2="When the teacher arrived, the students had left."
        order1={["students left", "teacher arrived"]}
        order2={["students left", "teacher arrived"]}
        note1="الترتيب واضح بسبب before — الماضي البسيط يكفي."
        note2="هنا يوضح الماضي التام فورًا: الطلاب غادروا قبل وصول المعلم."
      />
    </div>
  ),
  afterLab: (p) => (
    <div className="space-y-3">
      <Lines lines={p.lines} />
      <SwitchLab
        seq="l28-after-lab"
        emoji="🔄"
        label="AFTER"
        ar="الصيغتان صحيحتان — والترتيب واحد"
        s1="After I had finished my homework, I played a game."
        s2="After I finished my homework, I played a game."
        order1={["finished homework", "played a game"]}
        order2={["finished homework", "played a game"]}
        note1="الماضي التام يبرز إنهاء الواجب كحدث أقدم."
        note2="after نفسها تساعد على تحديد الترتيب — والبسيط صحيح أيضًا."
      />
    </div>
  ),
  ruleLab: (p) => {
    return <RuleLabWrapper lines={p.lines} />;
  },
  bytimeLab: (p) => <BytimeLab {...p} />,
  alreadyLab: (p) => <AlreadyLab {...p} />,
  justLab: (p) => <JustLab {...p} />,
  psPlusPp: (p) => <PsPlusPpLab {...p} />,
  threeTenseIntro: (p) => <ThreeTenseIntroLab {...p} />,
  walletLayers: (p) => <WalletLayersLab {...p} />,
  stationThree: (p) => <StationThreeLab {...p} />,
  timeMachine: (p) => <TimeMachineLab {...p} />,
  cases3: (p) => <Cases3Lab {...p} />,
  sequenceBackref: (p) => <SequenceBackrefLab {...p} />,
  stepBack: (p) => <StepBackLab {...p} />,
  caveDetective: (p) => <CaveDetectiveLab {...p} />,
  logicTest: (p) => <LogicTestLab {...p} />,
  alexScene: (p) => <AlexSceneLab {...p} />,
  meaningRule: (p) => <MeaningRuleLab {...p} />,
};

/** ㉫ القاعدة المهمة: لا كلمات مفروضة — بل العلاقة الزمنية. */
function RuleLabWrapper({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l28-rule-lab" emoji="🧠" label="NO MAGIC WORDS" ar="قبل أن تختار الزمن اسأل">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center">
            <En className="block text-sm font-black text-rose-900">before = must use Past Perfect</En>
            <div className="mt-1 text-lg">❌</div>
          </div>
          <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center">
            <En className="block text-sm font-black text-rose-900">after = must use Past Perfect</En>
            <div className="mt-1 text-lg">❌</div>
          </div>
        </div>
        <div className="mt-2 text-center">
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show}
            className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-indigo-800">
            <Rich text={show ? "إخفاء السؤال الحاكم" : "إذن ما السؤال الصحيح؟"} />
          </button>
        </div>
        {show && (
          <div className="mt-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-center" aria-live="polite">
            <div className="text-base font-black text-emerald-900">
              <Rich text="ما العلاقة الزمنية بين الأحداث؟" />
            </div>
            <div className="mt-1 text-xs font-bold text-slate-600">
              <Rich text="ثم اختر الزمن المناسب — لا تحفظ كلمات." />
            </div>
          </div>
        )}
      </LabPanel>
    </div>
  );
}

function BlockView({ block, sectionIndex }: { block: Block28; sectionIndex?: number }) {
  const units = sectionIndex === undefined ? [] : SOURCE_SECTIONS[sectionIndex].units;
  switch (block.t) {
    case "units": {
      const lines = units.slice(block.from, block.to ?? units.length);
      return <Lines lines={lines} tone={block.tone} />;
    }
    case "lab": {
      const [from, to] = block.covers ?? [0, units.length];
      const Lab = LABS[block.lab];
      return <>{Lab({ lines: units.slice(from, to) })}</>;
    }
    case "note":
      return (
        <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-4">
          <span className="text-2xl">{block.emoji}</span>
          <div className="min-w-0 flex-1">
            {block.platform && (
              <div className="mb-1.5">
                <PlatformTag />
              </div>
            )}
            <Rich text={block.text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
          </div>
        </div>
      );
    case "strip":
      return <FormulaStrip items={block.items} tone="indigo" />;
  }
}

function sourceHeadingFor(slide: Slide28): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex].title;
}

// ============================================================
// الغلاف + الأهداف + الخاتمة
// ============================================================
function Cover() {
  return (
    <div
      dir="rtl"
      data-source-section={SOURCE_SECTIONS[SEC.cover].title}
      data-en-seq="l28-cover"
      className="overflow-hidden rounded-[2rem] border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 shadow-xl md:p-10"
    >
      <div className="text-center text-6xl anim-float">🧭</div>
      <h2 className="font-head mt-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        <Rich text={LESSON_TITLE_28} />
      </h2>
      <div className="mt-2 text-center text-base font-black text-slate-600">
        <Rich text={LESSON_SUBTITLE_28} />
      </div>
      <div className="mt-2 text-center">
        <En className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">🧭 {LAB_NAME_28}</En>
      </div>
      <div dir="ltr" className="ltr-row mt-3 rounded-2xl bg-slate-900 p-3 text-center">
        <En className="text-sm font-black text-white md:text-base">{LAB_MOTTO_28}</En>
      </div>
      <div className="mt-3">
        <FormulaStrip items={["Past Perfect ← Past Simple", "Past Continuous + Past Simple", "Past Simple + Past Simple + Past Simple"]} tone="indigo" />
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <TenseChip tense="event" />
        <TenseChip tense="progress" />
        <TenseChip tense="flashback" />
      </div>
      <div className="mt-3 text-center text-xs font-bold text-slate-500">
        <Rich text={`${SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · ${SOURCE_LEDGER_COUNT} قسمًا في السجل · ${SLIDES.length} شريحة · اختبار من 20 سؤالًا`} />
      </div>
    </div>
  );
}

function Objectives() {
  const lines = SOURCE_SECTIONS[SEC.objectives].units;
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[SEC.objectives].title} title="أهداف الدرس — 10 أهداف">
      <div className="rounded-2xl bg-indigo-50 px-3 py-2 text-center text-sm font-black text-indigo-900">
        <Rich text={lines[0]} />
      </div>
      <div className="grid gap-2">
        {lines.slice(1).map((line, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
            <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">
              {line.slice(0, 1)}
            </span>
            <Rich text={line.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Closing({ onExit, onGoTest }: { onExit: () => void; onGoTest: () => void }) {
  const unitText = SOURCE_SECTIONS[SEC.closing].units[0];
  return (
    <div
      dir="rtl"
      data-source-section={SOURCE_SECTIONS[SEC.closing].title}
      data-en-seq="l28-closing"
      className="overflow-hidden rounded-[2rem] border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 shadow-xl md:p-10"
    >
      <div className="text-center text-6xl anim-float">🏆</div>
      <h2 className="font-head mt-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        <Rich text="أحسنت! — LESSON 28 COMPLETE" />
      </h2>
      <div className="mt-4 rounded-3xl border-2 border-white bg-white p-4 text-center text-lg font-black leading-relaxed text-indigo-900 md:text-xl">
        <Rich text={unitText} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3 text-center text-sm font-black text-orange-900">
          <En>📸 What happened? → Past Simple</En>
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center text-sm font-black text-teal-900">
          <En>🎥 What was happening? → Past Continuous</En>
        </div>
        <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center text-sm font-black text-violet-900">
          <En>⏪ What had happened? → Past Perfect</En>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button onClick={onGoTest} className="rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white transition hover:bg-indigo-800">
          <Rich text="📝 إلى منطقة الاختبارات (20 سؤالًا)" />
        </button>
        <button onClick={onExit} className="rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-200">
          ← جميع الدروس
        </button>
      </div>
      <Signature />
    </div>
  );
}

export function SlideView28({ s, onExit, onGoTest }: { s: Slide28; onExit: () => void; onGoTest?: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "lesson":
      return (
        <Frame
          mascot={s.mascot}
          step={s.step}
          sourceHeading={sourceHeadingFor(s)}
          title={<Rich text={s.title} />}
          lead={s.lead}
          tip={s.tip}
        >
          {s.blocks.map((block, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView block={block} sectionIndex={s.sourceIndex} />
            </div>
          ))}
        </Frame>
      );
    case "ex":
      return (
        <Frame
          mascot={s.mascot}
          badge={s.badge}
          sourceHeading={sourceHeadingFor(s)}
          title={<Rich text={s.title} />}
          lead={s.subtitle}
        >
          <ExerciseView exercise={s.ex} />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} onGoTest={onGoTest ?? onExit} />;
  }
}

function slideTitle(slide: Slide28): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

export type Area28 = "lesson" | "test" | "solutions" | "teacher";

const AREAS: { id: Area28; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📚", ar: "الدرس" },
  { id: "test", emoji: "📝", ar: "منطقة الاختبارات" },
  { id: "solutions", emoji: "📖", ar: "حلول الاختبارات" },
  { id: "teacher", emoji: "🧑‍🏫", ar: "منطقة المعلم" },
];

const SECTION_COLORS: Record<string, string> = {
  البداية: "text-slate-500",
  "القرار: بسيط أم تام؟": "text-indigo-700",
  "كلمات الترتيب": "text-teal-700",
  "ثلاثة أزمنة": "text-cyan-700",
  "الأخطاء الشائعة": "text-rose-700",
  "التفكير الزمني": "text-amber-700",
  التدريبات: "text-fuchsia-700",
  "المستوى المتقدم": "text-purple-700",
  "التحديات النهائية": "text-red-700",
  الخاتمة: "text-slate-500",
};

function Rail({
  index, setIndex, onExit, onClose, area, setArea,
}: {
  index: number;
  setIndex: (i: number) => void;
  onExit: () => void;
  onClose?: () => void;
  area: Area28;
  setArea: (a: Area28) => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, number[]>();
    SLIDES.forEach((s, i) => {
      const list = map.get(s.section) ?? [];
      list.push(i);
      map.set(s.section, list);
    });
    return [...map.entries()].map(([section, indexes]) => ({ section, indexes }));
  }, []);
  return (
    <aside className="flex h-full flex-col bg-white/90">
      <div className="border-b border-indigo-100 p-4">
        <button onClick={onExit} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          ← جميع الدروس
        </button>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => { setArea(a.id); onClose?.(); }}
              aria-pressed={area === a.id}
              className={`rounded-xl border-2 px-2 py-2 text-xs font-black transition ${area === a.id ? "border-indigo-600 bg-indigo-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}
            >
              {a.emoji} {a.ar}
            </button>
          ))}
        </div>
        <En className="mt-2 block text-center text-xs font-semibold text-indigo-700">🧭 {LAB_NAME_28}</En>
        <div className="mt-2 rounded-lg bg-indigo-50 px-2 py-1 text-center text-[11px] font-bold text-indigo-800">
          {SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · {SOURCE_LEDGER_COUNT} قسمًا في السجل · {SLIDES.length} شريحة
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="lesson slides">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i && area === "lesson";
              return (
                <button
                  key={i}
                  onClick={() => {
                    setArea("lesson");
                    setIndex(i);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${
                    active ? "bg-indigo-700 text-white shadow" : "text-slate-600 hover:bg-indigo-50"
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>
                    {i + 1}
                  </span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[i])}</span>
                  <span className="mr-auto text-base">{SLIDES[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-indigo-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson28({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area28>("lesson");
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu || area !== "lesson") return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") navigation.next();
      if (event.key === "ArrowRight") navigation.prev();
      if (event.key === " ") {
        event.preventDefault();
        navigation.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu, area]);

  useEffect(() => {
    document.getElementById("l28-main")?.scrollTo({ top: 0 });
  }, [index, area]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  const solutionsUnlocked = testChecked || teacherOk;
  return (
    <div dir="rtl" className="font-body relative flex h-screen flex-col overflow-hidden bg-[#f3f6ff] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-indigo-100 bg-white/85 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} area={area} setArea={setArea} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-indigo-100 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {AREAS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setArea(a.id)}
                    aria-pressed={area === a.id}
                    className={`rounded-full px-3 py-1.5 text-xs font-black transition md:text-sm ${area === a.id ? "bg-indigo-700 text-white shadow" : "bg-white text-slate-500 shadow-sm hover:bg-indigo-50"}`}
                  >
                    {a.emoji} {a.ar}
                  </button>
                ))}
              </div>
              {area === "lesson" && (
                <>
                  <div className="mt-1.5 truncate text-sm font-bold text-slate-500">
                    <Rich text={`${slide.section} · `} />
                    <span className="text-slate-800">
                      <Rich text={slideTitle(slide)} />
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-indigo-100/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-indigo-700 via-sky-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
            {area === "lesson" && (
              <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
                {index + 1} / {total}
              </span>
            )}
          </header>
          <main id="l28-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div className="pop mx-auto max-w-4xl" hidden={area !== "lesson"}>
              <SlideView28 key={index} s={slide} onExit={onExit} onGoTest={() => setArea("test")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "test"}>
              <TestArea28 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "solutions"}>
              <Solutions28 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "teacher"}>
              <TeacherArea28 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} />
            </div>
          </main>
          {area === "lesson" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-indigo-900/[0.06] bg-white/95 p-1.5 shadow-xl backdrop-blur">
                <button
                  onClick={navigation.prev}
                  disabled={index === 0}
                  className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
                >
                  → السابق
                </button>
                <span className="h-6 w-px bg-slate-200" />
                <button
                  onClick={navigation.next}
                  disabled={index === total - 1}
                  className="rounded-full bg-indigo-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
                >
                  التالي ←
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} area={area} setArea={setArea} />
          </div>
        </div>
      )}
    </div>
  );
}
