import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_LEDGER_COUNT,
  SOURCE_NUMBERED_COUNT,
  SEC,
  LESSON_TITLE_27,
  LAB_NAME_27,
  LAB_MOTTO_27,
  VIEW_EVENT_TAG,
  VIEW_PROGRESS_TAG,
  VIEW_FLASHBACK_TAG,
  VIEW_EVENT_AR,
  VIEW_PROGRESS_AR,
  VIEW_FLASHBACK_AR,
  VERB_TABLE_27,
  EX27_V3,
  EX27_HADHAVE,
  EX27_SIMPLE_PERFECT,
  EX27_NOAH,
  EX27_ERRORS,
  EX27_ERROR_SPOTS,
  EX27_TRANSFORM,
  DETECTIVE_27,
  ORDER_27_CHALLENGE,
  BOSS_27,
  EX27_FINAL,
  TEST_27,
  TEACHER_PASSWORD_27,
  TEACHER_27_OVERVIEW,
  TEACHER_27_NOTES,
  TEACHER_27_SOLUTIONS,
  TEACHER_27_RUBRIC,
  TEACHER_27_MISTAKES,
  STORY_27_REQUIREMENTS,
  STORY_27_STARTER,
  TYPO_S43_Q2,
  type Block27,
  type Exercise27,
  type Lab27,
  type Mcq27,
  type Slide27,
  type TestQ27,
  type Tone27,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// ⏪ الدرس 27 — THE FLASHBACK DIRECTOR
// لوحة الألوان: بنفسجي (⏪) + برتقالي (📸) + نعناعي (🎥)، وخلفية ورقية فاتحة.
// قواعد العزل: كل وحدة إنجليزية داخل LTR، والنص المختلط عبر LatinRuns.
// المناطق الأربع: الدرس | منطقة الاختبارات | حلول الاختبارات | منطقة المعلم.
// ============================================================

const EVENT = {
  tag: VIEW_EVENT_TAG,
  ar: VIEW_EVENT_AR,
  chip: "bg-orange-500 text-white",
  soft: "border-orange-200 bg-orange-50",
  text: "text-orange-900",
  ring: "ring-orange-300",
  bar: "bg-orange-400",
};
const PROGRESS = {
  tag: VIEW_PROGRESS_TAG,
  ar: VIEW_PROGRESS_AR,
  chip: "bg-teal-600 text-white",
  soft: "border-teal-200 bg-teal-50",
  text: "text-teal-900",
  ring: "ring-teal-300",
  bar: "bg-teal-500",
};
const FLASHBACK = {
  tag: VIEW_FLASHBACK_TAG,
  ar: VIEW_FLASHBACK_AR,
  chip: "bg-violet-700 text-white",
  soft: "border-violet-200 bg-violet-50",
  text: "text-violet-900",
  ring: "ring-violet-300",
  bar: "bg-violet-500",
};

const ARABIC_RX = /[ً-ٿݐ-ݿﭐ-﷿ﹰ-﻿]/;
const LATIN_RX = /[A-Za-z]/;
const HEAD_RX = /^(🎥|📸|⏪|🧠|🔥|⭐|⚠️|⚔️|🚨|🕵️|🚀|🏆|🏅|🎬|🧪|🔎|🔍|📖|🐦|🔄|📞|🎯|🔗|✅|💡|🎞️|⏱️|⏳|⚡|🧩|❌|❓|🗣️|🟢)/u;
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

function Note({ emoji, text, platform = false }: { emoji: string; text: string; platform?: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-4">
      <span className="text-2xl">{emoji}</span>
      <div className="min-w-0 flex-1">
        {platform && (
          <div className="mb-1.5">
            <PlatformTag />
          </div>
        )}
        <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
      </div>
    </div>
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
      className="relative overflow-hidden rounded-[1.75rem] border-2 border-violet-900/[0.07] bg-white p-5 shadow-[0_16px_44px_-24px_rgba(124,58,237,0.45)] md:p-8"
    >
      <div className="pointer-events-none absolute -left-1 top-3 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-violet-700 text-lg font-bold text-white shadow-sm">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-violet-100 px-3.5 py-1.5 text-sm font-bold text-violet-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-violet-100 bg-violet-50/70 px-3 py-2 text-xs font-bold text-violet-900"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-violet-700">SOURCE SECTION</span>
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
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-violet-700 to-indigo-600 p-4 text-white">
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
      className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-indigo-50 to-amber-50/70 p-3.5 sm:p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.16em] text-violet-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({
  items,
  tone = "violet",
}: {
  items: readonly string[];
  tone?: "violet" | "orange" | "teal" | "amber" | "sky" | "rose";
}) {
  const colors: Record<string, string> = {
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
function LineRow({ text, tone }: { text: string; tone?: Tone27 }) {
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
      <div className="flex items-start gap-3 rounded-2xl border-2 border-violet-100 bg-violet-50/70 p-3">
        <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-700 text-sm font-bold text-white">
          {text.slice(0, 1)}
        </span>
        <Rich text={text.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
      </div>
    );
  }
  if (kind === "head") {
    return (
      <div className="rounded-2xl bg-violet-700/95 px-4 py-2.5 text-center text-lg font-black text-white shadow-sm">
        <Rich text={text} />
      </div>
    );
  }
  return (
    <div className="rounded-2xl border-2 border-white bg-white/80 px-3.5 py-2 text-base font-bold leading-relaxed text-slate-700 md:text-lg">
      <Rich text={text} />
    </div>
  );
}

function Lines({ lines, tone }: { lines: string[]; tone?: Tone27 }) {
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

// ============================================================
// المختبرات — تعرض الوحدات المصدرية أولًا ثم التفاعل البصري
// ============================================================

function TimelineLab({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-timeline" emoji="🕰️" label="TIMELINE LAB" ar="خط الزمن: الأقدم ← الأحدث ← الآن">
        <div dir="ltr" className="ltr-row grid grid-cols-3 gap-2 text-center">
          <div className={`rounded-2xl border-2 p-3 ${FLASHBACK.soft}`}>
            <div className="text-2xl">⏪</div>
            <En className="text-sm font-black text-violet-900">Earlier event</En>
          </div>
          <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
            <div className="text-2xl">📸</div>
            <En className="text-sm font-black text-orange-900">Later event</En>
          </div>
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            <div className="text-2xl">📍</div>
            <En className="text-sm font-black text-slate-700">NOW</En>
          </div>
        </div>
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-pressed={show}
            className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition hover:bg-violet-800"
          >
            <Rich text={show ? "إخفاء الأزمنة" : "أظهر أي زمن لكل حدث"} />
          </button>
        </div>
        {show && (
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <div className={`rounded-2xl border-2 p-3 text-center ${FLASHBACK.soft}`}>
              <TenseChip tense="flashback" />
              <div className="mt-1 text-sm font-bold text-slate-600">
                <Rich text="الحدث الأقدم" />
              </div>
            </div>
            <div className={`rounded-2xl border-2 p-3 text-center ${EVENT.soft}`}>
              <TenseChip tense="event" />
              <div className="mt-1 text-sm font-bold text-slate-600">
                <Rich text="الحدث الأحدث" />
              </div>
            </div>
          </div>
        )}
        <div className="mt-2" aria-live="polite">
          <TrackBar label={<En>The train had left → I arrived → NOW</En>} color={FLASHBACK.bar} width="35%" marker={<span className="absolute -top-1 left-[34%] text-lg">⏪</span>} />
        </div>
      </LabPanel>
    </div>
  );
}

function OrderQuizLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<"train" | "me" | null>(null);
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-order-quiz" emoji="🚂" label="WHICH FIRST?" ar="أي حدث وقع أولًا؟">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPick("train")}
            aria-pressed={pick === "train"}
            className={`rounded-2xl border-2 p-3 text-center transition ${pick === "train" ? `${FLASHBACK.soft} ring-2 ${FLASHBACK.ring}` : "border-slate-200 bg-white"}`}
          >
            <En className="text-base font-black text-slate-900">The train left.</En>
          </button>
          <button
            type="button"
            onClick={() => setPick("me")}
            aria-pressed={pick === "me"}
            className={`rounded-2xl border-2 p-3 text-center transition ${pick === "me" ? `${EVENT.soft} ring-2 ${EVENT.ring}` : "border-slate-200 bg-white"}`}
          >
            <En className="text-base font-black text-slate-900">I arrived.</En>
          </button>
        </div>
        <div className="mt-2 min-h-16 rounded-2xl border-2 border-slate-100 bg-white p-3 text-center" aria-live="polite">
          {pick === null && <Rich text="المس الحدث الذي تعتقد أنه وقع أولًا…" className="text-sm font-bold text-slate-500" />}
          {pick === "train" && (
            <div className="space-y-1">
              <div className="text-sm font-black text-emerald-700"><Rich text="✓ صحيح! القطار غادر أولًا — لذلك يأخذ Past Perfect." /></div>
              <En className="block text-base font-black text-violet-900">The train had left. ← Past Perfect</En>
            </div>
          )}
          {pick === "me" && (
            <div className="text-sm font-black text-rose-700"><Rich text="✕ ليس بعد — أعد قراءة الجملة: had left تعني أن المغادرة هي الأقدم." /></div>
          )}
        </div>
      </LabPanel>
    </div>
  );
}

function SaraDiagramLab({ lines }: { lines: string[] }) {
  const [step, setStep] = useState(0);
  const steps = [
    { en: "The movie had started.", chip: "flashback" as const, ar: "① الفيلم بدأ — Past Perfect" },
    { en: "Sara arrived.", chip: "event" as const, ar: "② سارة وصلت — Past Simple" },
    { en: "NOW", chip: "event" as const, ar: "الآن — لحظة الكلام" },
  ];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-sara" emoji="🎬" label="SARA TIMELINE" ar="امشِ على الخط الزمني خطوة خطوة">
        <div dir="ltr" className="ltr-row flex items-stretch justify-center gap-1.5 text-center">
          {steps.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStep(i)}
              aria-pressed={step === i}
              className={`min-w-0 flex-1 rounded-2xl border-2 p-2.5 transition ${step === i ? "border-violet-500 bg-violet-700 text-white shadow" : "border-slate-200 bg-white"}`}
            >
              <div className="text-xl">{i === 0 ? "⏪" : i === 1 ? "📸" : "📍"}</div>
              <En className={`block truncate text-xs font-black md:text-sm ${step === i ? "text-white" : "text-slate-800"}`}>{s.en}</En>
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-violet-100 bg-white p-3 text-center" aria-live="polite">
          <TenseChip tense={steps[step].chip} />
          <div className="mt-1 text-sm font-black text-slate-800">
            <Rich text={steps[step].ar} />
          </div>
          <En className="mt-1 block text-base font-black text-slate-900">{steps[step].en}</En>
        </div>
      </LabPanel>
    </div>
  );
}

function HadGridLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState<string | null>(null);
  const pronouns = ["I", "You", "He", "She", "It", "We", "They"];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-had-grid" emoji="⭐" label="HAD NEVER CHANGES" ar="المس أي ضمير — المساعد ثابت!">
        <FormulaStrip items={["Subject + had + V3"]} tone="violet" />
        <div dir="ltr" className="ltr-row mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {pronouns.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setSel(p)}
              aria-pressed={sel === p}
              className={`rounded-2xl border-2 px-3 py-2.5 text-center font-en text-base font-black transition ${sel === p ? "border-transparent bg-violet-700 text-white shadow" : "border-slate-200 bg-white text-slate-800 hover:border-violet-300"}`}
            >
              {p} + had
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-violet-100 bg-white p-3 text-center text-sm font-black text-violet-900" aria-live="polite">
          <Rich text={sel === null ? "…المس ضميرًا لتتأكد" : `${sel} had — نفس had مع الجميع!`} />
        </div>
      </LabPanel>
    </div>
  );
}

function VerbRegularLab({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-verbs-regular" emoji="🧱" label="REGULAR VERBS" ar="V2 = V3 — سهلة!">
        <div className="grid gap-2 sm:grid-cols-2">
          {VERB_TABLE_27.filter((v) => v.regular).map((v) => (
            <div key={v.v1} dir="ltr" className="ltr-row rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
              <En className="text-lg font-black text-slate-900">{`${v.v1} → ${v.v2} → ${v.v3}`}</En>
              <div className="mt-1 text-xs font-black text-emerald-700">
                <En>{`had ${v.v3} ✓`}</En>
              </div>
            </div>
          ))}
        </div>
      </LabPanel>
    </div>
  );
}

function VerbIrregularLab({ lines }: { lines: string[] }) {
  const verbs = VERB_TABLE_27.filter((v) => !v.regular);
  const [sel, setSel] = useState(0);
  const [build, setBuild] = useState<string | null>(null);
  const v = verbs[sel];
  const correct = build === v.v3;
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-verbs-irregular" emoji="🧪" label="V1 → V2 → V3 LAB" ar="اختر فعلًا ثم ابنِ مع had">
        <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-1.5">
          {verbs.map((x, i) => (
            <button
              key={x.v1}
              type="button"
              onClick={() => { setSel(i); setBuild(null); }}
              aria-pressed={sel === i}
              className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition ${sel === i ? "border-transparent bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"}`}
            >
              {x.v1}
            </button>
          ))}
        </div>
        <div dir="ltr" className="ltr-row mt-2 grid grid-cols-3 gap-2 text-center">
          {(["V1", "V2", "V3"] as const).map((tag, i) => (
            <div key={tag} className={`rounded-2xl border-2 p-2.5 ${i === 2 ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white"}`}>
              <En className="text-[10px] font-black uppercase tracking-widest text-slate-400">{tag}</En>
              <En className={`block text-xl font-black ${i === 2 ? "text-violet-900" : "text-slate-800"}`}>{[v.v1, v.v2, v.v3][i]}</En>
            </div>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <div className="text-sm font-black text-slate-700"><Rich text="أكمل: had + ؟" /></div>
          <div dir="ltr" className="ltr-row mt-2 flex justify-center gap-2">
            {[v.v2, v.v3].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setBuild(opt)}
                aria-pressed={build === opt}
                className={`rounded-xl border-2 px-5 py-2 font-en text-base font-black transition ${
                  build === null ? "border-slate-200 bg-slate-50 text-slate-800 hover:border-violet-400"
                  : opt === v.v3 ? "border-transparent bg-emerald-600 text-white"
                  : build === opt ? "border-transparent bg-rose-600 text-white"
                  : "border-slate-200 bg-white text-slate-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm font-black" aria-live="polite">
            {build !== null && (correct
              ? <span className="text-emerald-700"><Rich text="✓ أحسنت! had + V3" /></span>
              : <span className="text-rose-700"><Rich text="✕ هذا V2 — بعد had نحتاج V3" /></span>)}
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function V2V3Lab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<"v2" | "v3">("v3");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-v2v3" emoji="🚨" label="HAD + ?" ar="قارن بنفسك">
        <div className="flex justify-center gap-2">
          <button
            type="button" onClick={() => setMode("v3")} aria-pressed={mode === "v3"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${mode === "v3" ? "bg-emerald-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>had + V3 ✓</En>
          </button>
          <button
            type="button" onClick={() => setMode("v2")} aria-pressed={mode === "v2"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${mode === "v2" ? "bg-rose-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>had + V2 ✕</En>
          </button>
        </div>
        <div className={`mt-2 rounded-2xl border-2 p-4 text-center ${mode === "v3" ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50"}`} aria-live="polite">
          <En className={`block text-xl font-black md:text-2xl ${mode === "v3" ? "text-emerald-800" : "text-rose-800"}`}>
            {mode === "v3" ? "I had gone to school. ✓" : "I had went to school. ✕"}
          </En>
          <div className={`mt-1 text-sm font-bold ${mode === "v3" ? "text-emerald-700" : "text-rose-700"}`}>
            <Rich text={mode === "v3" ? "gone هو V3 — صحيح مع had." : "went هو V2 — لا يأتي بعد had أبدًا."} />
          </div>
        </div>
        <div className="mt-2">
          <FormulaStrip items={["go → went → gone", "V1 = go", "V2 = went", "V3 = gone"]} tone={mode === "v3" ? "violet" : "rose"} />
        </div>
      </LabPanel>
    </div>
  );
}

function TeacherSwitchLab({ lines }: { lines: string[] }) {
  const [which, setWhich] = useState<"simple" | "perfect">("perfect");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-teacher-switch" emoji="🔀" label="ONE WORD CHANGES TIME" ar="بدّل الزمن وشاهد الترتيب ينقلب">
        <div className="flex justify-center gap-2">
          <button
            type="button" onClick={() => setWhich("simple")} aria-pressed={which === "simple"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>left — Past Simple</En>
          </button>
          <button
            type="button" onClick={() => setWhich("perfect")} aria-pressed={which === "perfect"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "perfect" ? FLASHBACK.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>had left — Past Perfect</En>
          </button>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-center" aria-live="polite">
          <En className="block text-lg font-black text-slate-900 md:text-xl">
            {which === "simple" ? "When I arrived, the teacher left." : "When I arrived, the teacher had left."}
          </En>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            <div className={`rounded-xl border-2 p-2 ${which === "simple" ? EVENT.soft : "border-slate-100 bg-slate-50"}`}>
              <div className="text-xs font-black text-slate-500"><Rich text="① أولًا" /></div>
              <En className="text-sm font-black text-slate-800">{which === "simple" ? "I arrived." : "The teacher left."}</En>
            </div>
            <div className={`rounded-xl border-2 p-2 ${which === "perfect" ? EVENT.soft : "border-slate-100 bg-slate-50"}`}>
              <div className="text-xs font-black text-slate-500"><Rich text="② ثانيًا" /></div>
              <En className="text-sm font-black text-slate-800">{which === "simple" ? "The teacher left." : "I arrived."}</En>
            </div>
          </div>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={which === "simple" ? "وصلتُ، ثم غادر المعلم." : "عندما وصلت، كان المعلم قد غادر بالفعل."} />
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function AliOrderLab({ lines }: { lines: string[] }) {
  const [which, setWhich] = useState<"and" | "had">("had");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-ali" emoji="🍽️" label="ALI SCENE" ar="نفس الحدثين — ترتيبان مختلفان">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button" onClick={() => setWhich("and")} aria-pressed={which === "and"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "and" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>…, and closed</En>
          </button>
          <button
            type="button" onClick={() => setWhich("had")} aria-pressed={which === "had"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "had" ? FLASHBACK.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>…, had closed</En>
          </button>
        </div>
        <div className="mt-2" aria-live="polite">
          <TrackBar
            label={<En>{which === "and" ? "Ali arrived → restaurant closed" : "restaurant closed → Ali arrived"}</En>}
            color={which === "and" ? EVENT.bar : FLASHBACK.bar}
            width={which === "and" ? "80%" : "35%"}
          />
          <div className="mt-1 text-center text-sm font-bold text-slate-600">
            <Rich text={which === "and" ? "① Ali arrived. ② restaurant closed." : "① المطعم أغلق. ② علي وصل — Past Perfect وضّح الأقدم."} />
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function PairsLab({ lines, seq, verbs }: { lines: string[]; seq: string; verbs: [string, string, string][] }) {
  const [sel, setSel] = useState(0);
  const [form, setForm] = useState<"simple" | "perfect">("perfect");
  const [verb, simple, perfect] = verbs[sel];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq={seq} emoji="🔥" label="SIMPLE → PERFECT" ar="حوّل الماضي البسيط إلى تام">
        <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-1.5">
          {verbs.map((x, i) => (
            <button
              key={x[0]}
              type="button" onClick={() => setSel(i)} aria-pressed={sel === i}
              className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition ${sel === i ? "border-transparent bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}
            >
              {x[0]}
            </button>
          ))}
        </div>
        <div className="mt-2 text-center">
          <En className="text-base font-black text-violet-900">{verb}</En>
        </div>
        <div className="mt-1 flex justify-center gap-2">
          <button
            type="button" onClick={() => setForm("simple")} aria-pressed={form === "simple"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${form === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>Past Simple</En>
          </button>
          <button
            type="button" onClick={() => setForm("perfect")} aria-pressed={form === "perfect"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${form === "perfect" ? FLASHBACK.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>Past Perfect</En>
          </button>
        </div>
        <div className={`mt-2 rounded-2xl border-2 p-3 text-center ${form === "simple" ? EVENT.soft : FLASHBACK.soft}`} aria-live="polite">
          <En className="block text-lg font-black text-slate-900">{form === "simple" ? simple : perfect}</En>
        </div>
      </LabPanel>
    </div>
  );
}

function ShortFlipLab({ lines }: { lines: string[] }) {
  const pairs = [
    { q: "Had you finished?", yes: "Yes, I had.", no: "No, I hadn't." },
    { q: "Had she arrived?", yes: "Yes, she had.", no: "No, she hadn't." },
    { q: "Had they eaten?", yes: "Yes, they had.", no: "No, they hadn't." },
  ];
  const [sel, setSel] = useState(0);
  const [ans, setAns] = useState<"yes" | "no">("yes");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-short-flip" emoji="🗣️" label="SHORT ANSWERS" ar="اقلب بين Yes و No">
        <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-1.5">
          {pairs.map((p, i) => (
            <button
              key={i} type="button" onClick={() => setSel(i)} aria-pressed={sel === i}
              className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-black transition ${sel === i ? "border-transparent bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}
            >
              {p.q}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <En className="block text-lg font-black text-slate-900">{pairs[sel].q}</En>
          <div className="mt-2 flex justify-center gap-2">
            {(["yes", "no"] as const).map((a) => (
              <button
                key={a} type="button" onClick={() => setAns(a)} aria-pressed={ans === a}
                className={`rounded-xl px-5 py-2 font-en text-base font-black transition ${ans === a ? "bg-slate-900 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
              >
                {a === "yes" ? pairs[sel].yes : pairs[sel].no}
              </button>
            ))}
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function SideBySideLab({ lines }: { lines: string[] }) {
  const [focus, setFocus] = useState<"simple" | "perfect">("perfect");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-side-by-side" emoji="⚖️" label="SIMPLE VS PERFECT" ar="المس كل بطاقة لتقارن">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button" onClick={() => setFocus("simple")} aria-pressed={focus === "simple"}
            className={`rounded-2xl border-2 p-3 text-center transition ${focus === "simple" ? `${EVENT.soft} ring-2 ${EVENT.ring}` : "border-slate-200 bg-white"}`}
          >
            <En className="text-xs font-black uppercase tracking-widest text-slate-400">Past Simple</En>
            <En className="mt-1 block text-base font-black text-slate-900">I finished my homework.</En>
            <div className="mt-1 text-sm font-bold text-slate-600"><Rich text="أنهيت واجبي — مجرد خبر عن حدث." /></div>
          </button>
          <button
            type="button" onClick={() => setFocus("perfect")} aria-pressed={focus === "perfect"}
            className={`rounded-2xl border-2 p-3 text-center transition ${focus === "perfect" ? `${FLASHBACK.soft} ring-2 ${FLASHBACK.ring}` : "border-slate-200 bg-white"}`}
          >
            <En className="text-xs font-black uppercase tracking-widest text-slate-400">Past Perfect</En>
            <En className="mt-1 block text-base font-black text-slate-900">I had finished my homework before dinner.</En>
            <div className="mt-1 text-sm font-bold text-slate-600"><Rich text="كنت قد أنهيت واجبي — قبل حدث آخر." /></div>
          </button>
        </div>
      </LabPanel>
    </div>
  );
}

function LinaSwitchLab({ lines }: { lines: string[] }) {
  const [which, setWhich] = useState<"simple" | "perfect">("perfect");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-lina-switch" emoji="🔥" label="THE KEY SWITCH" ar="أهم مقارنة في الدرس — بدّل وشاهد">
        <div className="flex justify-center gap-2">
          <button
            type="button" onClick={() => setWhich("simple")} aria-pressed={which === "simple"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>Lina left</En>
          </button>
          <button
            type="button" onClick={() => setWhich("perfect")} aria-pressed={which === "perfect"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "perfect" ? FLASHBACK.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>Lina had left</En>
          </button>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-center" aria-live="polite">
          <En className="block text-lg font-black text-slate-900 md:text-xl">
            {which === "simple" ? "When I arrived, Lina left." : "When I arrived, Lina had left."}
          </En>
          <div className="mt-2">
            <TrackBar
              label={<En>{which === "simple" ? "I arrived → Lina left" : "Lina left → I arrived"}</En>}
              color={which === "simple" ? EVENT.bar : FLASHBACK.bar}
              width={which === "simple" ? "80%" : "35%"}
            />
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function WordOrderLab({ lines, seq, emoji, label, pairs }: {
  lines: string[]; seq: string; emoji: string; label: string;
  pairs: { sentence: string; first: string; second: string }[];
}) {
  const [sel, setSel] = useState(0);
  const p = pairs[sel];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq={seq} emoji={emoji} label={label} ar="المس كل مثال لترى ترتيبه">
        <div className="flex flex-wrap justify-center gap-1.5">
          {pairs.map((x, i) => (
            <button
              key={i} type="button" onClick={() => setSel(i)} aria-pressed={sel === i}
              className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${sel === i ? "border-transparent bg-violet-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}
            >
              <Rich text={`مثال ${i + 1}`} />
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-center" aria-live="polite">
          <En className="block text-base font-black text-slate-900 md:text-lg">{p.sentence}</En>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            <div className={`rounded-xl border-2 p-2 ${FLASHBACK.soft}`}>
              <div className="text-xs font-black text-violet-700"><Rich text="① حدث أولًا — Past Perfect" /></div>
              <En className="text-sm font-black text-slate-800">{p.first}</En>
            </div>
            <div className={`rounded-xl border-2 p-2 ${EVENT.soft}`}>
              <div className="text-xs font-black text-orange-700"><Rich text="② ثم — Past Simple" /></div>
              <En className="text-sm font-black text-slate-800">{p.second}</En>
            </div>
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function EmmaDetectiveLab({ lines }: { lines: string[] }) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const toggle = (k: string) =>
    setFound((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  const all = found.has("pp") && found.has("ps");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-emma-detective" emoji="🕵️" label="DETECTIVE: EMMA" ar="المس الفعلين وحدد زمن كل منهما">
        <div dir="ltr" className="ltr-row rounded-2xl border-2 border-slate-200 bg-white p-3 text-center text-lg font-black leading-relaxed">
          <En className="text-slate-800">When Emma </En>
          <button
            type="button" onClick={() => toggle("ps")} aria-pressed={found.has("ps")}
            className={`mx-1 rounded-lg px-2 font-en text-lg font-black transition ${found.has("ps") ? EVENT.chip : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}
          >
            got
          </button>
          <En className="text-slate-800"> home, her brother </En>
          <button
            type="button" onClick={() => toggle("pp")} aria-pressed={found.has("pp")}
            className={`mx-1 rounded-lg px-2 font-en text-lg font-black transition ${found.has("pp") ? FLASHBACK.chip : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`}
          >
            had cooked
          </button>
          <En className="text-slate-800"> dinner.</En>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2" aria-live="polite">
          <div className={`rounded-2xl border-2 p-2.5 text-center ${found.has("pp") ? FLASHBACK.soft : "border-slate-200 bg-white"}`}>
            <En className="text-sm font-black text-slate-800">had cooked = Past Perfect</En>
            <div className="text-xs font-bold text-slate-600"><Rich text="① الطبخ حدث أولًا" /></div>
          </div>
          <div className={`rounded-2xl border-2 p-2.5 text-center ${found.has("ps") ? EVENT.soft : "border-slate-200 bg-white"}`}>
            <En className="text-sm font-black text-slate-800">got = Past Simple</En>
            <div className="text-xs font-bold text-slate-600"><Rich text="② ثم وصول Emma" /></div>
          </div>
        </div>
        {all && (
          <div className="mt-2 rounded-2xl bg-emerald-600 p-2.5 text-center text-sm font-black text-white">
            <Rich text="✓ ممتاز! ① Her brother cooked dinner. ② Emma got home." />
          </div>
        )}
      </LabPanel>
    </div>
  );
}

function NeedToggleLab({ lines }: { lines: string[] }) {
  const [which, setWhich] = useState<"simple" | "perfect">("simple");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-need-toggle" emoji="🧩" label="BOTH ARE FINE" ar="كلتاهما ممكنة حسب السياق">
        <div className="flex justify-center gap-2">
          <button
            type="button" onClick={() => setWhich("simple")} aria-pressed={which === "simple"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>After I finished…</En>
          </button>
          <button
            type="button" onClick={() => setWhich("perfect")} aria-pressed={which === "perfect"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "perfect" ? FLASHBACK.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>After I had finished…</En>
          </button>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center" aria-live="polite">
          <En className="block text-base font-black text-slate-900 md:text-lg">
            {which === "simple" ? "After I finished my homework, I played football. ✓" : "After I had finished my homework, I played football. ✓"}
          </En>
          <div className="mt-1 text-sm font-bold text-emerald-800">
            <Rich text="كلتاهما صحيحة — لأن after أصلًا توضّح الترتيب." />
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

function IqStepperLab({ lines }: { lines: string[] }) {
  const [step, setStep] = useState(0);
  const steps = [
    { t: "هل لدي حدثان في الماضي؟", d: "The bus arrived. / I reached the station. — نعم، حدثان." },
    { t: "أي حدث حدث أولًا؟", d: "الباص وصل أولًا." },
    { t: "الحدث الأول ← Past Perfect", d: "The bus had arrived." },
    { t: "الحدث الثاني ← Past Simple", d: "When I reached the station, the bus had arrived." },
  ];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-iq-stepper" emoji="🧠" label="IQ200 RULE" ar="امشِ على الخطوات الأربع">
        <div className="flex flex-wrap justify-center gap-1.5">
          {steps.map((s, i) => (
            <button
              key={i} type="button" onClick={() => setStep(i)} aria-pressed={step === i}
              className={`grid h-10 w-10 place-items-center rounded-xl text-base font-black transition ${step === i ? "bg-violet-700 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-violet-200 bg-white p-3 text-center" aria-live="polite">
          <div className="text-base font-black text-violet-900"><Rich text={steps[step].t} /></div>
          <div className="mt-1 text-sm font-bold text-slate-700"><Rich text={steps[step].d} /></div>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
            className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-black text-slate-600 transition enabled:hover:bg-slate-200 disabled:opacity-40"
          >
            <Rich text="→ السابق" />
          </button>
          <button
            type="button" onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step === 3}
            className="rounded-xl bg-violet-700 px-4 py-2 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-40"
          >
            <Rich text="التالي ←" />
          </button>
        </div>
      </LabPanel>
    </div>
  );
}

function EmmaCinemaLab({ lines }: { lines: string[] }) {
  const [role, setRole] = useState<"progress" | "event" | "flashback">("flashback");
  const roles = {
    progress: { verbs: ["was walking"], ar: "خلفية مستمرة — ما كان يحدث", chip: "progress" as const },
    event: { verbs: ["found", "looked", "realized"], ar: "أحداث تحرّك القصة", chip: "event" as const },
    flashback: { verbs: ["had seen"], ar: "فلاش باك — شيء حدث قبل لحظة إدراكها", chip: "flashback" as const },
  };
  const r = roles[role];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-emma-cinema" emoji="🎬" label="THREE-TENSE CINEMA" ar="اختر الدور وأبرز أفعاله">
        <div className="flex flex-wrap justify-center gap-2">
          {(Object.keys(roles) as (keyof typeof roles)[]).map((k) => (
            <button
              key={k} type="button" onClick={() => setRole(k)} aria-pressed={role === k}
              aria-label={k === "progress" ? "Past Continuous role" : k === "event" ? "Past Simple role" : "Past Perfect role"}
              className={`rounded-xl px-3 py-2 text-sm font-black transition ${role === k ? (k === "progress" ? PROGRESS.chip : k === "event" ? EVENT.chip : FLASHBACK.chip) : "border-2 border-slate-200 bg-white text-slate-600"}`}
            >
              <En>{k === "progress" ? "🎥 Past Continuous" : k === "event" ? "📸 Past Simple" : "⏪ Past Perfect"}</En>
            </button>
          ))}
        </div>
        <div dir="ltr" className="ltr-row mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-left text-base font-black leading-loose md:text-lg" aria-live="polite">
          <Hi on={role === "progress"} tone="teal">Emma was walking</Hi>
          <En className="text-slate-800"> through the old market when she </En>
          <Hi on={role === "event"} tone="orange">found</Hi>
          <En className="text-slate-800"> a mysterious key. She </En>
          <Hi on={role === "event"} tone="orange">looked</Hi>
          <En className="text-slate-800"> at it carefully and </En>
          <Hi on={role === "event"} tone="orange">realized</Hi>
          <En className="text-slate-800"> that she </En>
          <Hi on={role === "flashback"} tone="violet">had seen</Hi>
          <En className="text-slate-800"> it before.</En>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-violet-100 bg-white p-2.5 text-center">
          <TenseChip tense={r.chip} />
          <div className="mt-1 text-sm font-bold text-slate-600"><Rich text={r.ar} /></div>
        </div>
      </LabPanel>
    </div>
  );
}

function Hi({ on, tone, children }: { on: boolean; tone: "teal" | "orange" | "violet"; children: ReactNode }) {
  const bg = tone === "teal" ? "bg-teal-600 text-white" : tone === "orange" ? "bg-orange-500 text-white" : "bg-violet-700 text-white";
  return (
    <span className={`mx-0.5 rounded-lg px-1.5 transition ${on ? bg : "bg-slate-100 text-slate-500"}`}>
      <En>{children}</En>
    </span>
  );
}

function LiamSceneLab({ lines }: { lines: string[] }) {
  const [step, setStep] = useState(2);
  const steps = [
    { en: "Liam was studying.", q: "🎥 ماذا كان يحدث؟", chip: "progress" as const, time: "At 8:00" },
    { en: "His phone rang.", q: "📸 ماذا حدث؟", chip: "event" as const, time: "ثم…" },
    { en: "He had forgotten to charge it.", q: "⏪ ماذا كان قد حدث قبل لحظة الإدراك؟", chip: "flashback" as const, time: "الفلاش باك" },
  ];
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-liam" emoji="📱" label="ONE SCENE, THREE TENSES" ar="مشهد واحد — ثلاثة أزمنة">
        <div className="grid gap-1.5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <button
              key={i} type="button" onClick={() => setStep(i)} aria-pressed={step === i}
              className={`rounded-2xl border-2 p-2.5 text-center transition ${step === i ? "border-violet-500 bg-violet-700 text-white shadow" : "border-slate-200 bg-white"}`}
            >
              <div className={`text-xs font-black ${step === i ? "text-white/80" : "text-slate-400"}`}><Rich text={s.time} /></div>
              <En className={`mt-0.5 block text-sm font-black ${step === i ? "text-white" : "text-slate-800"}`}>{s.en}</En>
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-2xl border-2 border-violet-100 bg-white p-3 text-center" aria-live="polite">
          <TenseChip tense={steps[step].chip} />
          <div className="mt-1 text-sm font-black text-slate-800"><Rich text={steps[step].q} /></div>
        </div>
      </LabPanel>
    </div>
  );
}

function JohnSwitchLab({ lines }: { lines: string[] }) {
  const [which, setWhich] = useState<"simple" | "perfect">("simple");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-john-switch" emoji="🔀" label="JOHN SWITCH" ar="الجملة الأولى أم الثانية؟">
        <div className="flex justify-center gap-2">
          <button
            type="button" onClick={() => setWhich("simple")} aria-pressed={which === "simple"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <Rich text="الأولى" />
          </button>
          <button
            type="button" onClick={() => setWhich("perfect")} aria-pressed={which === "perfect"}
            className={`rounded-xl px-4 py-2 text-sm font-black transition ${which === "perfect" ? FLASHBACK.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <Rich text="الثانية" />
          </button>
        </div>
        <div className="mt-2 rounded-2xl border-2 border-slate-200 bg-white p-3 text-center" aria-live="polite">
          <En className="block text-lg font-black text-slate-900">
            {which === "simple" ? "When I arrived, John left." : "When I arrived, John had left."}
          </En>
          <En className="mt-1 block text-base font-black text-violet-900">
            {which === "simple" ? "I arrived → John left." : "John left → I arrived."}
          </En>
        </div>
      </LabPanel>
    </div>
  );
}

function DancePrecisionLab({ lines }: { lines: string[] }) {
  const [mean, setMean] = useState<"done" | "ongoing">("ongoing");
  return (
    <div className="space-y-3">
      <Lines lines={lines} />
      <LabPanel seq="l27-dance" emoji="💃" label="MEANING PRECISION" ar="اختر المعنى المقصود أولًا">
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button" onClick={() => setMean("done")} aria-pressed={mean === "done"}
            className={`rounded-2xl border-2 p-3 text-center transition ${mean === "done" ? `${FLASHBACK.soft} ring-2 ${FLASHBACK.ring}` : "border-slate-200 bg-white"}`}
          >
            <div className="text-sm font-black text-slate-800"><Rich text="«كان الجميع قد رقصوا وانتهى الأمر»" /></div>
          </button>
          <button
            type="button" onClick={() => setMean("ongoing")} aria-pressed={mean === "ongoing"}
            className={`rounded-2xl border-2 p-3 text-center transition ${mean === "ongoing" ? `${PROGRESS.soft} ring-2 ${PROGRESS.ring}` : "border-slate-200 bg-white"}`}
          >
            <div className="text-sm font-black text-slate-800"><Rich text="«كان الجميع يرقصون لحظة وصولي»" /></div>
          </button>
        </div>
        <div className={`mt-2 rounded-2xl border-2 p-3 text-center ${mean === "done" ? FLASHBACK.soft : PROGRESS.soft}`} aria-live="polite">
          <En className="block text-base font-black text-slate-900 md:text-lg">
            {mean === "done" ? "When I arrived at the party, everyone had danced." : "When I arrived at the party, everyone was dancing."}
          </En>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={mean === "done" ? "had danced ← الرقص حدث وانتهى قبل نقطة ماضية." : "was dancing ← الرقص كان مستمرًا عند وصولي."} />
          </div>
        </div>
      </LabPanel>
    </div>
  );
}

// ============================================================
// التدريبات — الاختيار ≠ التصحيح: لا كشف قبل «تحقق من الإجابات»
// ============================================================

const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

function McqDrill({
  items, reveals, seq, exercise, intro, platformAnswers, typoNote, answersHead, letters, circled,
}: {
  items: Mcq27[];
  reveals: string[];
  seq: string;
  exercise: string;
  intro: string;
  platformAnswers?: boolean;
  typoNote?: string;
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
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-violet-200 bg-violet-50 px-3 py-2">
        <span className="text-sm font-black text-violet-900">
          <Rich text={intro} />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-violet-700">
          {answered} / {items.length}
        </span>
      </div>
      {typoNote && (
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3">
          <PlatformTag />
          <div className="mt-1 text-sm font-bold text-slate-700">
            <Rich text={typoNote} />
          </div>
        </div>
      )}
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
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-700 text-xs font-black text-white">{circled ? CIRCLED[item.n - 1] : item.n}</span>
              <div dir="ltr" className="ltr-row min-w-0 flex-1">
                <En className="text-left text-sm font-black text-slate-900 md:text-base">
                  {stemParts[0]}
                  <span className="mx-1 rounded bg-slate-200 px-2 text-slate-400">______</span>
                  {stemParts[1] ?? ""}
                </En>
              </div>
            </div>
            {item.context && (
              <div className="mt-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-1.5">
                <PlatformTag />
                <span className="mr-2 text-xs font-bold text-slate-600">
                  <Rich text={item.context} />
                </span>
              </div>
            )}
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-end gap-2">
              {item.opts.map((opt, oi) => {
                const isPick = pick === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-violet-400";
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
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "أجب عن كل الأسئلة أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${answered}/${items.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-violet-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${items.length}`} />
            </span>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لا يظهر أي تصحيح قبل الضغط على الزر." />
          </span>
        )}
      </div>
      {checked && (
        <div data-reveal-block={seq} className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          {platformAnswers && <PlatformTag />}
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
        </div>
      )}
    </div>
  );
}

function ExV3() {
  const sec = SOURCE_SECTIONS[SEC.s30];
  return (
    <McqDrill
      items={EX27_V3}
      reveals={sec.revealUnits ?? []}
      seq="l27-ex-v3"
      exercise="l27-v3"
      intro={sec.units[0]}
      letters={["a)", "b)", "c)"]}
      answersHead={sec.units[sec.units.length - 1]}
    />
  );
}

function ExHadHave() {
  const sec = SOURCE_SECTIONS[SEC.s31];
  return (
    <div className="space-y-3">
      <Lines lines={sec.units.slice(5)} />
      <McqDrill items={EX27_HADHAVE} reveals={sec.revealUnits ?? []} seq="l27-ex-hadhave" exercise="l27-hadhave" intro={sec.units[0]} platformAnswers letters={["a)", "b)"]} />
    </div>
  );
}

function ExSimplePerfect() {
  const sec = SOURCE_SECTIONS[SEC.s32];
  return (
    <div className="space-y-3">
      <McqDrill items={EX27_SIMPLE_PERFECT} reveals={sec.revealUnits ?? []} seq="l27-ex-simple-perfect" exercise="l27-simple-perfect" intro={sec.units[0]} platformAnswers letters={["a)", "b)"]} />
      <Lines lines={[sec.units[sec.units.length - 1]]} />
    </div>
  );
}

function ExFinal10() {
  const sec = SOURCE_SECTIONS[SEC.s43];
  return (
    <McqDrill
      items={EX27_FINAL}
      reveals={sec.revealUnits ?? []}
      seq="l27-ex-final10"
      exercise="l27-final10"
      intro={sec.units[0]}
      platformAnswers
      letters={["A)", "B)", "C)"]}
      circled
      typoNote={`Source typo correction — Section ㊸ Question ②: ${TYPO_S43_Q2.note}`}
    />
  );
}

function ExNoah() {
  const sec = SOURCE_SECTIONS[SEC.s33];
  const [pick, setPick] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const right = pick === EX27_NOAH.first;
  return (
    <div data-en-seq="l27-ex-noah" data-exercise="l27-noah" className="space-y-3">
      <Lines lines={sec.units.slice(0, 6)} />
      <div className="grid gap-2 sm:grid-cols-2">
        {EX27_NOAH.events.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => setPick(e.key)}
            disabled={checked}
            aria-pressed={pick === e.key}
            className={`rounded-2xl border-2 p-3 text-center transition disabled:cursor-default ${
              checked
                ? e.key === EX27_NOAH.first
                  ? "border-transparent bg-emerald-600 text-white"
                  : pick === e.key
                    ? "border-transparent bg-rose-600 text-white"
                    : "border-slate-200 bg-white text-slate-300"
                : pick === e.key
                  ? "border-transparent bg-slate-900 text-white"
                  : "border-slate-200 bg-white hover:border-violet-400"
            }`}
          >
            <span className={`font-head grid h-8 w-8 place-items-center rounded-lg text-sm font-bold ${checked && e.key === EX27_NOAH.first ? "bg-white/25 text-white" : "bg-violet-100 text-violet-800"}`}>
              {e.key}
            </span>
            <En className={`mt-1 block text-base font-black ${checked && e.key !== EX27_NOAH.first && pick !== e.key ? "text-slate-300" : ""}`}>{e.en}</En>
            <span className="mt-0.5 block text-xs font-bold opacity-80">
              <Rich text={e.ar} />
            </span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || pick === null}
          title={pick !== null ? undefined : "اختر الحدث الأول أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text="تحقق من الإجابات" />
        </button>
        {checked ? (
          <>
            <span className={`rounded-xl px-3 py-2 text-sm font-black text-white ${right ? "bg-emerald-600" : "bg-rose-600"}`}>
              <Rich text={right ? "✓ صحيح!" : "✕ راجع الترتيب"} />
            </span>
            <button type="button" onClick={() => { setPick(null); setChecked(false); }} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لا يظهر أي تصحيح قبل الضغط على الزر." />
          </span>
        )}
      </div>
      {checked && (
        <div data-reveal-block="l27-ex-noah" className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          <div className="text-center text-sm font-black text-emerald-900">
            <Rich text={sec.units[6]} />
          </div>
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
          <div className="px-1 text-xs font-bold text-slate-600">
            <Rich text={EX27_NOAH.why} />
          </div>
        </div>
      )}
    </div>
  );
}

function ExErrors() {
  const sec = SOURCE_SECTIONS[SEC.s34];
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX27_ERRORS.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === EX27_ERRORS.length;
  const score = EX27_ERRORS.reduce((n, _, i) => n + (picks[i] === EX27_ERROR_SPOTS[i].answer ? 1 : 0), 0);
  return (
    <div data-en-seq="l27-ex-errors" data-exercise="l27-errors" className="space-y-3">
      <Lines lines={[sec.units[0]]} />
      <Lines lines={sec.units.slice(1, 7)} />
      {EX27_ERRORS.map((item, i) => {
        const spots = EX27_ERROR_SPOTS[i];
        const pick = picks[i];
        const picked = pick !== undefined;
        const right = picked && pick === spots.answer;
        const card = checked
          ? !picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"
          : picked ? "border-slate-300 bg-slate-50/70" : "border-slate-200 bg-white";
        return (
          <div key={i} className={`rounded-3xl border-2 p-3 transition ${card}`}>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-violet-700 text-xs font-black text-white">{item.n}</span>
              <span className="text-xs font-bold text-slate-500"><Rich text="المس الجزء الخاطئ:" /></span>
            </div>
            <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5">
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
                    data-spot={`l27-err-${i}-${si}`}
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
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "حدد الجزء الخاطئ في كل جملة أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${answered}/${EX27_ERRORS.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-violet-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${EX27_ERRORS.length}`} />
            </span>
            <button type="button" onClick={() => { setPicks({}); setChecked(false); }} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="التصحيحات الكاملة تظهر بعد التحقق." />
          </span>
        )}
      </div>
      {checked && (
        <div data-reveal-block="l27-ex-errors" className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          <div className="text-center text-sm font-black text-emerald-900">
            <Rich text={sec.units[7]} />
          </div>
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const normAnswer = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.?!]+$/, "");

function ExTransform() {
  const sec = SOURCE_SECTIONS[SEC.s35];
  const blanks = EX27_TRANSFORM.items;
  const [values, setValues] = useState<string[]>(() => blanks.map(() => ""));
  const [checked, setChecked] = useState(false);
  const filled = values.filter((v) => v.trim().length > 0).length;
  const score = blanks.reduce((n, b, i) => n + (normAnswer(values[i]) === normAnswer(b.answer) ? 1 : 0), 0);
  const w = EX27_TRANSFORM.worked;
  return (
    <div data-en-seq="l27-ex-transform" data-exercise="l27-transform" className="space-y-3">
      <Lines lines={sec.units.slice(0, 2)} />
      <div className="rounded-3xl border-2 border-sky-200 bg-sky-50/60 p-3">
        <div dir="ltr" className="ltr-row mt-1 space-y-1 text-center">
          <En className="block text-base font-black text-slate-800">{w.a}</En>
          <En className="block text-base font-black text-slate-800">{w.b}</En>
        </div>
        <div className="mt-1 text-center text-xs font-bold text-slate-600"><Rich text={w.want} /></div>
        <div className="mt-1 text-center text-sm font-black text-sky-900"><Rich text={sec.units[5]} /></div>
        <div dir="ltr" className="ltr-row mt-1 rounded-xl bg-white p-2 text-center">
          <En className="text-base font-black text-emerald-800">{w.answer}</En>
        </div>
      </div>
      {blanks.map((b, i) => {
        const ok = checked && normAnswer(values[i]) === normAnswer(b.answer);
        const bad = checked && !ok;
        return (
          <div key={b.n} className="rounded-3xl border-2 border-slate-200 bg-white p-3">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-head grid h-7 w-7 place-items-center rounded-lg bg-violet-700 text-xs font-black text-white">{b.n}</span>
              <span className="text-sm font-black text-slate-700"><Rich text={i === 0 ? sec.units[7] : sec.units[11]} /></span>
            </div>
            <div dir="ltr" className="ltr-row space-y-1">
              <En className="block text-base font-black text-slate-800">{b.a}</En>
              <En className="block text-base font-black text-slate-800">{b.b}</En>
            </div>
            <div className="mt-1 text-sm font-black text-slate-700"><Rich text={sec.units[i === 0 ? 10 : 14]} /></div>
            <input
              dir="ltr"
              value={values[i]}
              onChange={(e) => setValues((v) => { const n = [...v]; n[i] = e.target.value; return n; })}
              disabled={checked}
              aria-label={`transformed sentence ${i + 1}`}
              placeholder="Type the Past Perfect sentence…"
              className={`font-en mt-1 w-full rounded-xl border-2 px-3 py-2.5 text-left text-sm font-bold outline-none ${
                ok ? "border-emerald-400 bg-emerald-50 text-emerald-900" : bad ? "border-rose-400 bg-rose-50 text-rose-900" : "border-violet-200 bg-violet-50/40 text-slate-900 focus:border-violet-500"
              }`}
            />
            {checked && (
              <div data-reveal-block={`l27-transform-${i + 1}`} className="mt-1.5 rounded-xl bg-emerald-50 px-3 py-2">
                <En className="block text-sm font-black text-emerald-800">{b.answer}</En>
                <div className="mt-0.5 text-xs font-bold text-slate-600"><Rich text={ok ? `✓ صحيح! ${b.why}` : `✕ ${b.why}`} /></div>
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || filled !== blanks.length}
          title={filled === blanks.length ? undefined : "اكتب الجملتين أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${filled}/${blanks.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-violet-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${blanks.length}`} />
            </span>
            <button type="button" onClick={() => { setValues(blanks.map(() => "")); setChecked(false); }} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="الإجابات النموذجية تظهر بعد التحقق." />
          </span>
        )}
      </div>
    </div>
  );
}

const IRREG_V3_27 = new Set(
  "gone eaten seen taken written broken spoken chosen forgotten known been done had made sold told felt kept slept heard left met paid said sent spent stood understood won thought bought brought caught fought sought taught forgot frozen hidden risen driven ridden beaten bitten become come run".split(" ")
);
const IRREG_PS_27 = new Set(
  "went ate saw took wrote broke spoke chose forgot knew left arrived started finished closed cooked walked looked realized found lost ran stopped heard came rang knocked began opened noticed dropped stepped picked met watched entered called sat stood turned felt got woke fell drove rode sang sank drank swam".split(" ")
);

function countPP27(text: string): number {
  const re = /\bhad(?:n't|\s+not)?(?:\s+(?:never|already|just|ever|also|even|really))?\s+([a-zA-Z]+)/gi;
  let n = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const w = m[1].toLowerCase();
    if (w.endsWith("ed") || w.endsWith("en") || IRREG_V3_27.has(w)) n++;
  }
  return n;
}

function countPC27(text: string): number {
  return (text.match(/\b(was|were)\b\s+\w+ing/gi) || []).length;
}

function countPS27(text: string): number {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  let n = 0;
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const prev = words[i - 1] ?? "";
    if (["was", "were", "had", "has", "have", "hadn't", "hasn't", "haven't"].includes(prev)) continue;
    if (IRREG_PS_27.has(w)) {
      n++;
      continue;
    }
    if (w.endsWith("ed") && w.length > 3 && !w.endsWith("eed")) n++;
  }
  return n;
}

const MUSEUM_TENSES_27 = ["Past Simple", "Past Continuous", "Past Perfect"] as const;

function ExMuseum() {
  const sec = SOURCE_SECTIONS[SEC.s36];
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const answered = DETECTIVE_27.filter((_, i) => picks[i] !== undefined).length;
  const allAnswered = answered === DETECTIVE_27.length;
  const score = DETECTIVE_27.reduce((n, d, i) => n + (picks[i] === d.tense ? 1 : 0), 0);
  return (
    <div data-en-seq="l27-ex-museum" data-exercise="l27-museum" className="space-y-3">
      <Lines lines={sec.units} />
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-violet-200 bg-violet-50 px-3 py-2">
        <span className="text-sm font-black text-violet-900">
          <Rich text="حدد زمن كل فعل — ثم تحقق." />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-violet-700">
          {answered} / {DETECTIVE_27.length}
        </span>
      </div>
      {DETECTIVE_27.map((d, i) => {
        const pick = picks[i];
        return (
          <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-3">
            <div dir="ltr" className="ltr-row">
              <En className="text-base font-black text-slate-900 md:text-lg">{d.verb}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-end gap-2">
              {MUSEUM_TENSES_27.map((t) => {
                const isPick = pick === t;
                const isAnswer = d.tense === t;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-violet-400";
                if (checked) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPicks((prev) => ({ ...prev, [i]: t }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition disabled:cursor-default ${cls}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "حدد زمن كل فعل أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${answered}/${DETECTIVE_27.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-violet-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${DETECTIVE_27.length}`} />
            </span>
            <button
              type="button"
              onClick={() => { setPicks({}); setChecked(false); }}
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
            >
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لا يظهر أي تصحيح قبل الضغط على الزر." />
          </span>
        )}
      </div>
      {checked && (
        <div data-reveal-block="l27-ex-museum" className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExOrderChal() {
  const sec = SOURCE_SECTIONS[SEC.s39];
  const [current, setCurrent] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const items = ORDER_27_CHALLENGE.items;
  const toggle = (key: string) =>
    setCurrent((c) => (c.includes(key) ? c.filter((k) => k !== key) : c.length >= items.length ? c : [...c, key]));
  const ok = ORDER_27_CHALLENGE.accept.some((a) => a.join("|") === current.join("|"));
  const reset = () => {
    setCurrent([]);
    setChecked(false);
  };
  return (
    <div data-en-seq="l27-ex-order" data-exercise="l27-order" className="space-y-3">
      <Lines lines={[sec.units[0]]} />
      <div className="flex flex-wrap items-center gap-2">
        <PlatformTag />
        <span className="text-xs font-bold text-slate-500">
          <Rich text="الترجمات العربية المساعدة من المنصة — الجمل الإنجليزية من المصدر." />
        </span>
      </div>
      <div className="grid gap-2">
        {items.map((it) => {
          const pos = current.indexOf(it.key);
          const on = pos !== -1;
          return (
            <button
              key={it.key}
              type="button"
              data-order-item={it.key}
              onClick={() => toggle(it.key)}
              disabled={checked}
              aria-pressed={on}
              className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-2.5 text-left transition disabled:cursor-default ${
                checked
                  ? "border-slate-200 bg-white"
                  : on
                    ? "border-transparent bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-800 hover:border-violet-400"
              }`}
            >
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm font-black ${on && !checked ? "bg-white/25 text-white" : "bg-violet-700 text-white"}`}>
                {on ? pos + 1 : it.key}
              </span>
              <span className="min-w-0 flex-1">
                <span dir="ltr" className="ltr block text-left font-en text-sm font-black md:text-base">
                  {it.key}. {it.en}
                </span>
                <span className={`block text-right text-xs font-bold ${on && !checked ? "text-white/80" : "text-slate-400"}`}>
                  <Rich text={it.ar} />
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || current.length !== items.length}
          title={current.length === items.length ? undefined : "رتب الأحداث الأربعة أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من ترتيبك (${current.length}/${items.length})`} />
        </button>
        {checked ? (
          <>
            <span className={`rounded-xl px-3 py-2 text-sm font-black text-white ${ok ? "bg-emerald-600" : "bg-rose-600"}`}>
              <Rich text={ok ? "✓ ترتيب صحيح!" : "✕ ليس بعد — قارن مع القصة ثم أعد المحاولة."} />
            </span>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
            >
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="المس الأحداث من الأقدم إلى الأحدث — المس الحدث مرة أخرى لإلغائه." />
          </span>
        )}
      </div>
      {checked && (
        <div data-reveal-block="l27-ex-order" className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          <div className="px-1 text-sm font-black text-emerald-900">
            <Rich text={sec.units[sec.units.length - 1]} />
          </div>
          {(sec.revealUnits ?? []).map((r, i) => (
            <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
              <Rich text={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExBoss() {
  const sec = SOURCE_SECTIONS[SEC.s42];
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = BOSS_27.filter((b) => picks[b.n] !== undefined).length;
  const allAnswered = answered === BOSS_27.length;
  const score = BOSS_27.reduce((n, b) => n + (picks[b.n] === b.answer ? 1 : 0), 0);
  const answerHead = sec.units[4];
  return (
    <div data-en-seq="l27-ex-boss" data-exercise="l27-boss" className="space-y-3">
      <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 px-3 py-2 text-sm font-black text-violet-900">
        <Rich text={sec.units[0]} />
      </div>
      {BOSS_27.map((b, bi) => {
        const pick = picks[b.n];
        return (
          <div key={b.n} className="rounded-3xl border-2 border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-black text-white">⚔️ {b.n}</span>
              <span className="text-sm font-black text-slate-800">
                <Rich text={sec.units[bi === 0 ? 1 : 5]} />
              </span>
            </div>
            <div className="mt-2 grid gap-2">
              {b.opts.map((opt, oi) => {
                const isPick = pick === oi;
                const isAnswer = oi === b.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-violet-400";
                if (checked) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicks((prev) => ({ ...prev, [b.n]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    dir="ltr"
                    className={`rounded-xl border-2 px-4 py-2 text-left font-en text-sm font-black transition disabled:cursor-default ${cls}`}
                  >
                    {oi === 0 ? "A" : "B"}. {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "اختر الجملة المناسبة في المعركتين أولًا"}
          className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-violet-800 disabled:opacity-30"
        >
          <Rich text={`⚔️ تحقق من المعركتين (${answered}/${BOSS_27.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-violet-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${BOSS_27.length}`} />
            </span>
            <button
              type="button"
              onClick={() => { setPicks({}); setChecked(false); }}
              className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
            >
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لا يظهر أي تصحيح قبل الضغط على الزر." />
          </span>
        )}
      </div>
      {checked && (
        <div data-reveal-block="l27-ex-boss" className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          {BOSS_27.map((b, bi) => (
            <div key={b.n} className="space-y-1.5">
              <div className="px-1 text-sm font-black text-emerald-900">
                <Rich text={answerHead} />
              </div>
              {(sec.revealUnits ?? []).slice(bi * 2, bi * 2 + 2).map((r, i) => (
                <div key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-emerald-900">
                  <Rich text={r} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExStory() {
  const sec = SOURCE_SECTIONS[SEC.s44];
  const [text, setText] = useState("");
  const [done, setDone] = useState<Set<number>>(new Set());
  const sentences = (text.match(/[.?!]+/g) || []).length;
  const pc = countPC27(text);
  const pp = countPP27(text);
  const ps = countPS27(text);
  const hasWhen = /\bwhen\b/i.test(text);
  const hasWhile = /\bwhile\b/i.test(text);
  const hasBeforeAfter = /\b(before|after)\b/i.test(text);
  const chrono = pp >= 1 && ps >= 1;
  const checks = [
    { label: "الجمل ≥ 10", pass: sentences >= 10, value: `${sentences}` },
    { label: "Past Simple ≥ 3", pass: ps >= 3, value: `${ps}` },
    { label: "Past Continuous ≥ 2", pass: pc >= 2, value: `${pc}` },
    { label: "Past Perfect ≥ 3", pass: pp >= 3, value: `${pp}` },
    { label: "when", pass: hasWhen, value: hasWhen ? "✓" : "✕" },
    { label: "while", pass: hasWhile, value: hasWhile ? "✓" : "✕" },
    { label: "before / after", pass: hasBeforeAfter, value: hasBeforeAfter ? "✓" : "✕" },
    { label: "زوج مرتب (had+V3 + ماضٍ بسيط)", pass: chrono, value: chrono ? "✓" : "✕" },
  ];
  const reqIdx = [0, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div data-en-seq="l27-ex-story" data-exercise="l27-story" className="space-y-3">
      <Lines lines={[sec.units[1]]} />
      <div className="grid gap-2 sm:grid-cols-2">
        {reqIdx.map((ui, i) => {
          const on = done.has(i);
          return (
            <button
              key={ui}
              type="button"
              onClick={() => setDone((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })}
              aria-pressed={on}
              className={`flex min-w-0 items-center gap-2 rounded-2xl border-2 px-3 py-2 text-right transition ${on ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}
            >
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                {on ? "✓" : ""}
              </span>
              <span className="min-w-0 flex-1 text-xs font-bold text-slate-700">
                <Rich text={sec.units[ui]} />
              </span>
            </button>
          );
        })}
      </div>
      <Lines lines={sec.units.slice(9, 16)} />
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50/50 p-3">
        <div className="text-center text-xs font-black text-violet-900">
          <Rich text="اكتب قصتك هنا — ابدأ من سطر البداية أو من خيالك:" />
        </div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          aria-label="story text"
          placeholder={STORY_27_STARTER}
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-violet-400"
        />
        <div className="mt-1 text-center text-[11px] font-bold text-slate-400">
          <Rich text="العدّادات مؤشرات تلقائية تقريبية — التأكد النهائي بمراجعتك أنت." />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
          {checks.map((c) => (
            <div key={c.label} className={`rounded-xl border-2 px-3 py-2 text-center text-xs font-black ${c.pass ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500"}`}>
              <Rich text={c.label} />
              <span className="mx-1">·</span>
              <En>{c.value}</En>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-xs font-black text-slate-500">
          <Rich text={`المتطلبات المعلّمة: ${done.size} / ${reqIdx.length}`} />
        </div>
        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => { setText(""); setDone(new Set()); }}
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

export type TestAnswer27 = number | boolean | number[] | string[] | Record<number, number>;

const TYPE_LABEL_27: Record<TestQ27["type"], string> = {
  single: "اختيار واحد",
  tf: "صح / خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "توصيل",
  spot: "اكتشاف الخطأ",
};

function isAnswered27(q: TestQ27, a: TestAnswer27 | undefined): boolean {
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

function isCorrect27(q: TestQ27, a: TestAnswer27 | undefined): boolean {
  if (!isAnswered27(q, a)) return false;
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
  n: number; type: TestQ27["type"]; ar: string; en?: string; children: ReactNode;
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
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-700 text-sm font-bold text-white">
          {n}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-black text-violet-800">
              {TYPE_LABEL_27[type]}
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
  let cls = "border-slate-200 bg-white text-slate-700 hover:border-violet-400";
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

function TSingle({ q, value, checked, onChange }: { q: Extract<TestQ27, { type: "single" }>; value: number | undefined; checked: boolean; onChange: (v: number) => void }) {
  return (
    <div dir="ltr" className="ltr-row grid gap-2 sm:grid-cols-3">
      {q.opts.map((o, oi) => (
        <NeutralOpt key={oi} en selected={value === oi} revealed={checked} isAnswer={oi === q.answer} isPick={value === oi} onClick={() => onChange(oi)} disabled={checked} label={o} />
      ))}
    </div>
  );
}

function TTf({ q, value, checked, onChange }: { q: Extract<TestQ27, { type: "tf" }>; value: boolean | undefined; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {([true, false] as const).map((b) => (
        <NeutralOpt key={String(b)} selected={value === b} revealed={checked} isAnswer={b === q.answer} isPick={value === b} onClick={() => onChange(b)} disabled={checked} label={b ? "✓ صحيح" : "✕ خطأ"} />
      ))}
    </div>
  );
}

function TMulti({ q, value, checked, onChange }: { q: Extract<TestQ27, { type: "multi" }>; value: number[] | undefined; checked: boolean; onChange: (v: number[]) => void }) {
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

function TOrder({ q, value, checked, onChange }: { q: Extract<TestQ27, { type: "order" }>; value: string[] | undefined; checked: boolean; onChange: (v: string[]) => void }) {
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
          let cls = "border-slate-200 bg-white text-slate-800 hover:border-violet-400";
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

function TMatch({ q, value, checked, onChange }: { q: Extract<TestQ27, { type: "match" }>; value: Record<number, number> | undefined; checked: boolean; onChange: (v: Record<number, number>) => void }) {
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
            let cls = "border-slate-200 bg-white text-slate-800 hover:border-violet-400";
            if (checked) {
              cls = pairs[li] === q.answer[li] ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white";
            } else if (paired) {
              cls = "border-transparent bg-slate-900 text-white";
            } else if (active === li) {
              cls = "border-violet-500 bg-violet-50 text-violet-900";
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
            let cls = "border-slate-200 bg-white text-slate-700 hover:border-violet-400";
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

function TSpot({ q, value, checked, onChange }: { q: Extract<TestQ27, { type: "spot" }>; value: number | undefined; checked: boolean; onChange: (v: number) => void }) {
  return (
    <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5">
      {q.segments.map((seg, si) => (
        <NeutralOpt key={si} en selected={value === si} revealed={checked} isAnswer={si === q.answer} isPick={value === si} onClick={() => onChange(si)} disabled={checked} label={seg} />
      ))}
    </div>
  );
}

export function TestArea27({ onCheckedChange, onShowSolutions }: { onCheckedChange?: (c: boolean) => void; onShowSolutions?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, TestAnswer27>>({});
  const [checked, setChecked] = useState(false);
  const answered = TEST_27.filter((q) => isAnswered27(q, answers[q.n])).length;
  const allAnswered = answered === TEST_27.length;
  const score = useMemo(
    () => TEST_27.reduce((s, q) => s + (isCorrect27(q, answers[q.n]) ? 1 : 0), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, checked]
  );
  const pct = Math.round((score / TEST_27.length) * 100);
  const msg =
    pct === 100 ? "🏆 ممتاز! علامة كاملة في الماضي التام."
    : pct >= 80 ? "🌟 رائع جدًا! راجع الحلول للأسئلة الخاطئة فقط."
    : pct >= 60 ? "👍 جيد! راجع الخط الزمني و had + V3 ثم حاول مجددًا."
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
  const set = (n: number, v: TestAnswer27) => setAnswers((p) => ({ ...p, [n]: v }));

  return (
    <div data-area="l27-test" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-violet-200 bg-violet-50/70 p-4">
        <span className="text-2xl">📝</span>
        <div className="min-w-0 flex-1">
          <div className="font-black text-slate-800">
            <Rich text={`منطقة الاختبارات — ${TEST_27.length} سؤالًا جديدًا بأنواع منظمة`} />
          </div>
          <div className="text-xs font-bold text-slate-500">
            <Rich text="أجب عنها كلها بحرية — لا يظهر أي تصحيح قبل «إنهاء الاختبار»." />
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
          <Rich text={`أجبت عن ${answered} / ${TEST_27.length}`} />
        </span>
      </div>

      <div className="grid gap-3">
        {TEST_27.map((q) => {
          const a = answers[q.n];
          const state = !checked ? (isAnswered27(q, a) ? "picked" : "idle") : isCorrect27(q, a) ? "right" : "wrong";
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
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-violet-900/10 bg-white/95 p-4 shadow-xl backdrop-blur" role="status" aria-live="polite">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={submit}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "أجب عن كل الأسئلة أولًا"}
                className="rounded-xl bg-violet-700 px-5 py-2.5 font-bold text-white shadow transition enabled:hover:bg-violet-800 disabled:opacity-30"
              >
                <Rich text={`إنهاء الاختبار (${answered}/${TEST_27.length})`} />
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
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-700 text-xl font-extrabold text-white">
                {pct}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-slate-800">
                  <Rich text={`نتيجتك: ${score} / ${TEST_27.length} — صحيح ${score} · خطأ ${TEST_27.length - score}`} />
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

function solutionAnswer(q: TestQ27): ReactNode {
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

export function Solutions27({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest?: () => void; onGoTeacher?: () => void }) {
  if (!unlocked) {
    return (
      <div data-area="l27-solutions" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center md:p-10">
        <div className="text-5xl">📖</div>
        <h3 className="font-head mt-3 text-2xl font-bold text-slate-900">
          <Rich text="حلول الاختبارات — الدرس 27" />
        </h3>
        <p className="mx-auto mt-2 max-w-md text-base font-semibold text-slate-500">
          <Rich text="الحلول المفصلة للأسئلة العشرين تظهر بعد إنهاء الاختبار — أو بفتح منطقة المعلم." />
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {onGoTest && (
            <button type="button" onClick={onGoTest} className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-800">
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
    <div data-area="l27-solutions" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
        <span className="text-2xl">📖</span>
        <div className="min-w-0 flex-1">
          <div className="font-black text-slate-800">
            <Rich text={`حلول الاختبارات — ${TEST_27.length} حلًا مفصلًا`} />
          </div>
          <div className="text-xs font-bold text-slate-500">
            <Rich text="كل حل: الإجابة الصحيحة + التعليل + تنبيه الفخ." />
          </div>
        </div>
      </div>
      {TEST_27.map((q) => (
        <div key={q.n} data-solution={q.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-600 text-sm font-bold text-white">
              {q.n}
            </span>
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-black text-violet-800">
                {TYPE_LABEL_27[q.type]}
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
// منطقة المعلم — الدرس 27 (خلف كلمة المرور somer173)
// دليل تعليمي كامل: نظرة عامة + ملاحظات + حلول الأنشطة + سلّم القصة + أخطاء شائعة.
// ============================================================

export function TeacherArea27({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange?: (ok: boolean) => void; onGoSolutions?: () => void }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!unlocked) {
    return (
      <div data-area="l27-teacher" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-200 text-xl">🧑‍🏫</span>
          <div className="min-w-0 flex-1">
            <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">
              Teacher's Area — Lesson 27
            </div>
            <div className="text-sm font-bold text-slate-500">
              <Rich text="منطقة المعلم — الدرس 27 · دليل التدريس وحلول الأنشطة" />
            </div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-400 shadow-sm">🔒 مقفلة</span>
        </div>
        <form
          className="mt-4 flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() === TEACHER_PASSWORD_27) {
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
            className="font-en w-44 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400"
          />
          <button type="submit" className="rounded-xl bg-violet-700 px-4 py-2 font-bold text-white shadow transition hover:bg-violet-800 active:scale-[0.98]">
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
    <div data-area="l27-teacher" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-violet-200 bg-white/80 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-violet-700 text-xl text-white">🧑‍🏫</span>
        <div className="min-w-0 flex-1">
          <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">
            Teacher's Area — Lesson 27
          </div>
          <div className="text-sm font-bold text-slate-500">
            <Rich text="منطقة المعلم — الدرس 27 · دليل التدريس وحلول الأنشطة" />
          </div>
        </div>
        <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-bold text-white shadow-sm">✓ Unlocked</span>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text={TEACHER_27_OVERVIEW.title} />
        </h3>
        <div className="mt-2 text-sm font-black text-violet-800"><Rich text="الأهداف التعليمية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_27_OVERVIEW.objectives.map((o, i) => (
            <li key={i} className="rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={o} /></li>
          ))}
        </ul>
        <div className="mt-3 text-sm font-black text-violet-800"><Rich text="المتطلبات القبلية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_27_OVERVIEW.prerequisites.map((o, i) => (
            <li key={i} className="rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={o} /></li>
          ))}
        </ul>
        <div className="mt-3 text-sm font-black text-violet-800"><Rich text="المفاهيم الجوهرية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_27_OVERVIEW.core.map((o, i) => (
            <li key={i} className="rounded-xl bg-violet-50 px-3 py-1.5 text-sm font-bold text-violet-900"><Rich text={o} /></li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text="Teaching Notes — ملاحظات التدريس" />
        </h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_27_NOTES.map((n, i) => (
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
          <Rich text="Activity Solutions — حلول الأنشطة" />
        </h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_27_SOLUTIONS.map((s, i) => (
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
          <Rich text={TEACHER_27_RUBRIC.head} />
        </h3>
        <ul className="mt-2 space-y-1">
          {TEACHER_27_RUBRIC.lines.map((l, i) => (
            <li key={i} className="rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={l} /></li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900">
          <Rich text="Common Mistakes — الأخطاء الشائعة" />
        </h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_27_MISTAKES.map((m, i) => (
            <div key={i} className="rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-3">
              <div className="text-sm font-black text-rose-900"><Rich text={m.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {m.lines.map((l, j) => (
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
function ExerciseView({ exercise }: { exercise: Exercise27 }) {
  switch (exercise.type) {
    case "v3":
      return <ExV3 />;
    case "hadhave":
      return <ExHadHave />;
    case "simplePerfect":
      return <ExSimplePerfect />;
    case "noah":
      return <ExNoah />;
    case "errors":
      return <ExErrors />;
    case "transform":
      return <ExTransform />;
    case "museum":
      return <ExMuseum />;
    case "orderChal":
      return <ExOrderChal />;
    case "boss":
      return <ExBoss />;
    case "final10":
      return <ExFinal10 />;
    case "story":
      return <ExStory />;
  }
}

const LABS: Record<Lab27, (props: { lines: string[] }) => ReactNode> = {
  timeline: (p) => <TimelineLab {...p} />,
  orderQuiz: (p) => <OrderQuizLab {...p} />,
  saraDiagram: (p) => <SaraDiagramLab {...p} />,
  hadGrid: (p) => <HadGridLab {...p} />,
  verbRegular: (p) => <VerbRegularLab {...p} />,
  verbIrregular: (p) => <VerbIrregularLab {...p} />,
  v2v3: (p) => <V2V3Lab {...p} />,
  teacherSwitch: (p) => <TeacherSwitchLab {...p} />,
  aliOrder: (p) => <AliOrderLab {...p} />,
  pairsA: (p) => (
    <PairsLab
      {...p}
      seq="l27-pairs-a"
      verbs={[
        ["eat → ate → eaten", "I ate breakfast.", "I had eaten breakfast before school started."],
        ["go → went → gone", "She went home.", "She had gone home before I called."],
        ["see → saw → seen", "We saw the painting.", "We had seen the painting before."],
      ]}
    />
  ),
  pairsB: (p) => (
    <PairsLab
      {...p}
      seq="l27-pairs-b"
      verbs={[
        ["take → took → taken", "He took the book.", "He had taken the book before the lesson started."],
        ["write → wrote → written", "Maya wrote the message.", "Maya had written the message before she lost her phone."],
        ["break → broke → broken", "Tom broke the window.", "The window had broken before we arrived."],
      ]}
    />
  ),
  shortFlip: (p) => <ShortFlipLab {...p} />,
  sideBySide: (p) => <SideBySideLab {...p} />,
  linaSwitch: (p) => <LinaSwitchLab {...p} />,
  beforeLab: (p) => (
    <WordOrderLab
      {...p}
      seq="l27-before"
      emoji="⏱️"
      label="BEFORE"
      pairs={[
        { sentence: "The students had left before the teacher arrived.", first: "students left", second: "teacher arrived" },
        { sentence: "I had locked the door before I went to bed.", first: "locked the door", second: "went to bed" },
      ]}
    />
  ),
  afterLab: (p) => (
    <WordOrderLab
      {...p}
      seq="l27-after"
      emoji="🔄"
      label="AFTER"
      pairs={[
        { sentence: "After I had finished my project, I watched a movie.", first: "finished project", second: "watched movie" },
        { sentence: "After she had eaten dinner, she went for a walk.", first: "eaten dinner", second: "went for a walk" },
      ]}
    />
  ),
  bytimeLab: (p) => (
    <WordOrderLab
      {...p}
      seq="l27-bytime"
      emoji="⏳"
      label="BY THE TIME"
      pairs={[
        { sentence: "By the time we arrived, the concert had started.", first: "concert started", second: "we arrived" },
        { sentence: "By the time the doctor arrived, the patient had fallen asleep.", first: "patient fell asleep", second: "doctor arrived" },
      ]}
    />
  ),
  emmaDetective: (p) => <EmmaDetectiveLab {...p} />,
  needToggle: (p) => <NeedToggleLab {...p} />,
  iqStepper: (p) => <IqStepperLab {...p} />,
  emmaCinema: (p) => <EmmaCinemaLab {...p} />,
  liamScene: (p) => <LiamSceneLab {...p} />,
  johnSwitch: (p) => <JohnSwitchLab {...p} />,
  dancePrecision: (p) => <DancePrecisionLab {...p} />,
};

function BlockView({ block, sectionIndex }: { block: Block27; sectionIndex?: number }) {
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
      return <Note emoji={block.emoji} text={block.text} />;
    case "strip":
      return <FormulaStrip items={block.items} tone="violet" />;
  }
}

function sourceHeadingFor(slide: Slide27): string | undefined {
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
      data-en-seq="l27-cover"
      className="overflow-hidden rounded-[2rem] border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 shadow-xl md:p-10"
    >
      <div className="text-center text-6xl anim-float">⏪</div>
      <h2 className="font-head mt-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        <Rich text={LESSON_TITLE_27} />
      </h2>
      <div className="mt-2 text-center">
        <En className="text-sm font-black uppercase tracking-[0.2em] text-violet-700">⏪ {LAB_NAME_27}</En>
      </div>
      <div dir="ltr" className="ltr-row mt-3 rounded-2xl bg-slate-900 p-3 text-center">
        <En className="text-sm font-black text-white md:text-base">{LAB_MOTTO_27}</En>
      </div>
      <div className="mt-3">
        <FormulaStrip items={["Subject + had + V3", "Subject + had not + V3", "Had + Subject + V3?"]} tone="violet" />
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
      <div className="rounded-2xl bg-violet-50 px-3 py-2 text-center text-sm font-black text-violet-900">
        <Rich text={lines[0]} />
      </div>
      <div className="grid gap-2">
        {lines.slice(1, 9).map((line, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border-2 border-violet-100 bg-white p-3">
            <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-700 text-sm font-bold text-white">
              {line.slice(0, 1)}
            </span>
            <Rich text={line.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
          </div>
        ))}
      </div>
      <FormulaStrip items={lines.slice(9, 15)} tone="violet" />
      <div className="grid gap-2">
        {lines.slice(15).map((line, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border-2 border-violet-100 bg-white p-3">
            <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-700 text-sm font-bold text-white">
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
      data-en-seq="l27-closing"
      className="overflow-hidden rounded-[2rem] border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-6 shadow-xl md:p-10"
    >
      <div className="text-center text-6xl anim-float">🏆</div>
      <h2 className="font-head mt-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        <Rich text="أحسنت! — LESSON 27 COMPLETE" />
      </h2>
      <div className="mt-4 rounded-3xl border-2 border-white bg-white p-4 text-center text-lg font-black leading-relaxed text-violet-900 md:text-xl">
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
        <button onClick={onGoTest} className="rounded-xl bg-violet-700 px-5 py-3 font-bold text-white transition hover:bg-violet-800">
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

export function SlideView27({ s, onExit, onGoTest }: { s: Slide27; onExit: () => void; onGoTest?: () => void }) {
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

function slideTitle(slide: Slide27): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

export type Area27 = "lesson" | "test" | "solutions" | "teacher";

const AREAS: { id: Area27; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📚", ar: "الدرس" },
  { id: "test", emoji: "📝", ar: "منطقة الاختبارات" },
  { id: "solutions", emoji: "📖", ar: "حلول الاختبارات" },
  { id: "teacher", emoji: "🧑‍🏫", ar: "منطقة المعلم" },
];

const SECTION_COLORS: Record<string, string> = {
  البداية: "text-slate-500",
  "الزمن والخط الزمني": "text-violet-700",
  "التكوين: had + V3": "text-indigo-700",
  "لماذا نحتاجه؟": "text-amber-700",
  المثبت: "text-emerald-700",
  "النفي والأسئلة": "text-sky-700",
  "المقارنة الحاسمة": "text-orange-700",
  "كلمات الترتيب": "text-teal-700",
  "القصص والمحقق": "text-cyan-700",
  "مفاهيم خاطئة وقاعدة IQ200": "text-rose-700",
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
  area: Area27;
  setArea: (a: Area27) => void;
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
      <div className="border-b border-violet-100 p-4">
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
              className={`rounded-xl border-2 px-2 py-2 text-xs font-black transition ${area === a.id ? "border-violet-600 bg-violet-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"}`}
            >
              {a.emoji} {a.ar}
            </button>
          ))}
        </div>
        <En className="mt-2 block text-center text-xs font-semibold text-violet-700">⏪ {LAB_NAME_27}</En>
        <div className="mt-2 rounded-lg bg-violet-50 px-2 py-1 text-center text-[11px] font-bold text-violet-800">
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
                    active ? "bg-violet-700 text-white shadow" : "text-slate-600 hover:bg-violet-50"
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
      <div className="border-t border-violet-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson27({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area27>("lesson");
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
    document.getElementById("l27-main")?.scrollTo({ top: 0 });
  }, [index, area]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  const solutionsUnlocked = testChecked || teacherOk;
  return (
    <div dir="rtl" className="font-body relative flex h-screen flex-col overflow-hidden bg-[#f6f3ff] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-violet-100 bg-white/85 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} area={area} setArea={setArea} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-violet-100 bg-white text-lg shadow-sm lg:hidden"
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
                    className={`rounded-full px-3 py-1.5 text-xs font-black transition md:text-sm ${area === a.id ? "bg-violet-700 text-white shadow" : "bg-white text-slate-500 shadow-sm hover:bg-violet-50"}`}
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
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-violet-100/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-violet-700 via-indigo-500 to-amber-400 transition-all duration-500"
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
          <main id="l27-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div className="pop mx-auto max-w-4xl" hidden={area !== "lesson"}>
              <SlideView27 key={index} s={slide} onExit={onExit} onGoTest={() => setArea("test")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "test"}>
              <TestArea27 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "solutions"}>
              <Solutions27 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "teacher"}>
              <TeacherArea27 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} />
            </div>
          </main>
          {area === "lesson" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-violet-900/[0.06] bg-white/95 p-1.5 shadow-xl backdrop-blur">
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
                  className="rounded-full bg-violet-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-violet-800 disabled:opacity-30"
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
