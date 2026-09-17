import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_22,
  LESSON_SUBTITLE_22,
  LESSON_ARABIC_TITLE_22,
  LAB_NAME_22,
  LAB_MOTTO_22,
  OPENING_RECALL,
  OPENING_EXAMPLES,
  OPENING_QUESTION,
  OPENING_QUESTIONS,
  OPENING_KEYS,
  OPENING_SO,
  OPENING_NOTE,
  OPENING_NOTE_DETAIL,
  OPENING_CONNECTIONS,
  OBJECTIVES_22,
  PREP_INTRO,
  PREP_SIMPLE_Q,
  PREP_EXAMPLE,
  PREP_KEY_WORD,
  PREP_KEY_REL,
  PREP_STAR,
  PREP_DONT_MEMORIZE,
  PREP_VISUAL_DESC,
  IN_EXAMPLES,
  IN_MORE,
  IN_VISUAL_EX,
  ON_EXAMPLES,
  IN_ON_COMPARE,
  IN_ON_CHANGED,
  UNDER_EXAMPLES,
  ABOVE_EXAMPLES,
  ABOVE_VS_ON_ABOVE,
  ABOVE_VS_ON_ABOVE_NOTE,
  ABOVE_VS_ON_ON,
  ABOVE_VS_ON_RULE,
  BELOW_EXAMPLES,
  ABOVE_BELOW_PAIR,
  BEHIND_EXAMPLES,
  INFRONT_EXAMPLES,
  BEHIND_INFRONT_COMPARE,
  BEHIND_INFRONT_CHANGED,
  NEXTTO_EXAMPLES,
  NEAR_EXAMPLES,
  NEXTTO_NEAR_EXAMPLES,
  NEXTTO_NEAR_CLOSE,
  BETWEEN_EXAMPLES,
  BETWEEN_FORMULA,
  BETWEEN_EXAMPLE,
  OPPOSITE_EXAMPLES,
  INSIDE_EXAMPLES,
  OUTSIDE_EXAMPLES,
  INSIDE_OUTSIDE_PAIR,
  PREP_MAP,
  THEREIS_CONN_EXAMPLES,
  THEREIS_CONN_FROM,
  THEREIS_CONN_TO,
  THEREARE_EXAMPLES,
  THEREARE_FORMULA_PARTS,
  THEREARE_EXAMPLE,
  WH_WORDS,
  WHERE_RULES,
  WHERE_EXAMPLES,
  ANSWER_EXAMPLES,
  ANSWER_SHORT_EXAMPLES,
  ANSWER_SHORT_NOTE2,
  FULL_QA,
  PRONOUNS_MAP,
  PRONOUNS_EXAMPLES,
  POSS_EXAMPLES,
  POSS_CHAIN,
  MULTI_EXAMPLES,
  MULTI_IQ_VISUAL,
  MULTI_IQ_RELATIONS,
  PEOPLE_EXAMPLES,
  OVER_EXAMPLES,
  OVER_NOTE,
  OVER_SAFE,
  UNDER_BELOW_PAIR,
  UNDER_BELOW_CLEAR,
  AMONG_PAIR,
  AMONG_EXAMPLES,
  AMONG_LATER,
  ROOM_SENTENCES,
  ROOM_NOTICE_ITEMS,
  GRAMMAR_DETECTIVE_22,
  SOLUTIONS_22,
  CHALLENGE1_22,
  CHALLENGE1_22_WORDS,
  CHALLENGE1_22_OPTIONS,
  CHALLENGE2_22,
  CHALLENGE3_22,
  IQ200_1_SCENE,
  IQ200_1_QUESTIONS,
  IQ200_2,
  FINAL_BOSS_22_CLUES_AR,
  FINAL_BOSS_22_TASK_DESC,
  FINAL_BOSS_22_REQUIREMENTS,
  TF_SCENE,
  TF_QUESTIONS,
  IMPORTANT_NOTE_TEXT,
  IMPORTANT_NOTE_BEST,
  IMPORTANT_NOTE_EXAMPLE_DONT,
  IMPORTANT_NOTE_EXAMPLE,
  IMPORTANT_NOTE_RESULT,
  GOLDEN_SUMMARY_22_WORDS,
  GOLDEN_SUMMARY_22_QUESTIONS,
  GOLDEN_SUMMARY_22_FORMULAS,
  FINAL_EXAMPLES,
  FINAL_EXAMPLES_NOTE,
  ROADMAP_22,
  ROADMAP_CLOSING_22,
  INTENTIONALLY_WRONG_22,
  type Block22,
  type Exercise22,
  type Slide22,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 22 — THE POSITION LAB 📍
// تعلّم أن ترى العلاقة المكانية بين الأشياء.
// كل وحدة إنجليزية معزولة LTR.
// ============================================================

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const clean = text.replace(/\*\*/g, "");
  return (
    <span className={className}>
      <LatinRuns text={clean} />
    </span>
  );
}

function TextBlock({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`whitespace-pre-line ${className}`}>
      <Rich text={text} />
    </div>
  );
}

function SourceLine({
  en,
  ar,
  tone = "neutral",
}: {
  en: string;
  ar?: string;
  tone?: "neutral" | "good" | "bad" | "focus" | "warn";
}) {
  const tones = {
    neutral: "border-slate-100 bg-white text-slate-900",
    good: "border-emerald-200 bg-emerald-50 text-emerald-900",
    bad: "border-rose-200 bg-rose-50 text-rose-800",
    focus: "border-teal-300 bg-teal-50 text-teal-900",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
  };
  return (
    <div className={`rounded-2xl border-2 p-3 ${tones[tone]}`}>
      <En className={`block text-left text-lg font-extrabold md:text-xl ${tone === "bad" ? "line-through decoration-rose-300" : ""}`}>
        {en}
      </En>
      {ar && (
        <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
          <Rich text={ar} />
        </div>
      )}
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-teal-200 bg-teal-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
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
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(13,148,136,0.28)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-teal-700 text-lg font-bold text-white shadow-sm">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-teal-100 px-3.5 py-1.5 text-sm font-bold text-teal-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-teal-700">SOURCE SECTION</span>
          <Rich text={sourceHeading} />
        </div>
      )}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">
        {title}
      </h2>
      {lead && (
        <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl">
          <Rich text={lead} />
        </div>
      )}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-700 to-cyan-700 p-4 text-white">
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
    <div data-en-seq={seq} className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.18em] text-teal-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({ items, tone = "teal" }: { items: readonly string[]; tone?: "emerald" | "teal" | "amber" | "rose" | "sky" | "violet" }) {
  const colors: Record<string, string> = {
    emerald: "border-emerald-200 bg-white text-emerald-900",
    teal: "border-teal-200 bg-white text-teal-900",
    amber: "border-amber-200 bg-white text-amber-900",
    rose: "border-rose-200 bg-white text-rose-900",
    sky: "border-sky-200 bg-white text-sky-900",
    violet: "border-violet-200 bg-white text-violet-900",
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

// ============================================================
// SPATIAL VISUAL DIAGRAM helper
// ============================================================
type Position = "in" | "on" | "under" | "above" | "below" | "behind" | "in front of" | "next to" | "near" | "between" | "opposite" | "inside" | "outside";

function PositionDiagram({
  position,
  objectEmoji = "📦",
  referenceEmoji = "🟫",
  refLabel = "table",
}: {
  position: Position;
  objectEmoji?: string;
  referenceEmoji?: string;
  refLabel?: string;
}) {
  const style: Record<Position, ReactNode> = {
    in: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-100 flex items-center justify-center text-4xl">
            <span className="text-3xl">{objectEmoji}</span>
          </div>
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    on: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl">{objectEmoji}</div>
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300" />
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    under: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="w-28 h-6 rounded border-[3px] border-amber-700 bg-amber-300" />
          <div className="w-2 h-6 bg-amber-700" />
          <div className="w-28 h-6 rounded border-[3px] border-amber-700 bg-amber-300" />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-4xl">{objectEmoji}</div>
          <En className="mt-6 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    above: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl">{objectEmoji}</div>
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300" />
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    below: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300" />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 text-4xl">{objectEmoji}</div>
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    behind: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-4xl opacity-60">{objectEmoji}</div>
          </div>
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    "in front of": (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-4xl z-10">{objectEmoji}</div>
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300 opacity-80" />
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    "next to": (
      <div className="flex items-end justify-center gap-3 h-36">
        <div className="relative">
          <div className="w-24 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300" />
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
        <div className="text-4xl mb-6">{objectEmoji}</div>
      </div>
    ),
    near: (
      <div className="flex items-end justify-center gap-8 h-36">
        <div className="relative">
          <div className="w-24 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-300" />
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
        <div className="text-4xl mb-6 opacity-80">{objectEmoji}</div>
      </div>
    ),
    between: (
      <div className="flex items-end justify-center gap-3 h-36">
        <div className="text-4xl mb-6">🅰️</div>
        <div className="text-4xl mb-6">{objectEmoji}</div>
        <div className="text-4xl mb-6">🅱️</div>
      </div>
    ),
    opposite: (
      <div className="flex items-end justify-center h-36 gap-6">
        <div className="text-center">
          <div className="text-4xl">🏦</div>
          <En className="mt-1 block text-xs font-bold text-slate-600">bank</En>
        </div>
        <div className="text-2xl mb-4">🛣️</div>
        <div className="text-center">
          <div className="text-4xl">{referenceEmoji}</div>
          <En className="mt-1 block text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    inside: (
      <div className="flex items-end justify-center h-36">
        <div className="relative">
          <div className="w-28 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-100 flex items-center justify-center">
            <span className="text-3xl">{objectEmoji}</span>
          </div>
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
      </div>
    ),
    outside: (
      <div className="flex items-end justify-center h-36 gap-4">
        <div className="relative">
          <div className="w-24 h-20 rounded-xl border-[3px] border-amber-700 bg-amber-50" />
          <En className="mt-1 block text-center text-xs font-bold text-slate-600">{refLabel}</En>
        </div>
        <div className="text-4xl mb-6">{objectEmoji}</div>
      </div>
    ),
  };
  return (
    <div className="rounded-2xl border-2 border-white bg-white p-3">
      {style[position]}
    </div>
  );
}

// ============================================================
// 0. OPENING RECALL — ربط مع الدرس 21
// ============================================================
function OpeningRecall() {
  return (
    <LabPanel emoji="🔗" label="CONNECTION TO LESSON 21" ar="نقطة الربط مع درس There is / There are" seq="l22-opening">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={OPENING_RECALL} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {OPENING_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} tone="focus" />
        ))}
      </div>
      <div className="mt-3 text-center text-base font-bold text-rose-700">
        <Rich text={OPENING_QUESTION} />
      </div>
      <div className="mt-1 grid gap-1">
        {OPENING_QUESTIONS.map((q) => (
          <div key={q} className="text-center text-base font-bold text-slate-700">
            <Rich text={q} />
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {OPENING_KEYS.map((k) => (
          <En key={k.en} className="block rounded-xl bg-teal-600 px-4 py-2 text-center text-lg font-black text-white">
            {k.en}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-base font-bold text-teal-800">
        <Rich text={OPENING_SO} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-3 text-center">
        <div className="text-base font-bold text-slate-800">
          <Rich text={OPENING_NOTE} />
        </div>
        <div className="mt-1 text-base font-bold text-slate-700">
          <Rich text={OPENING_NOTE_DETAIL} />
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {OPENING_CONNECTIONS.map((item) => (
            <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-teal-800">
              <Rich text={item} />
            </span>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 1. POSITION OVERVIEW
// ============================================================
function PositionOverview() {
  const [active, setActive] = useState<Position>("on");
  const positions: { p: Position; label: string; ar: string; emoji: string }[] = [
    { p: "in", label: "in", ar: "داخل", emoji: "📦" },
    { p: "on", label: "on", ar: "على سطح", emoji: "📖" },
    { p: "under", label: "under", ar: "تحت", emoji: "🐱" },
    { p: "above", label: "above", ar: "أعلى من", emoji: "⏰" },
    { p: "below", label: "below", ar: "أسفل من", emoji: "⬇️" },
    { p: "behind", label: "behind", ar: "خلف", emoji: "🚗" },
    { p: "in front of", label: "in front of", ar: "أمام", emoji: "👨‍🏫" },
    { p: "next to", label: "next to", ar: "بجانب", emoji: "🪑" },
    { p: "near", label: "near", ar: "قريب من", emoji: "🏫" },
    { p: "between", label: "between", ar: "بين", emoji: "⚽" },
    { p: "opposite", label: "opposite", ar: "مقابل", emoji: "🏦" },
    { p: "inside", label: "inside", ar: "داخل", emoji: "🔑" },
    { p: "outside", label: "outside", ar: "خارج", emoji: "🚪" },
  ];
  return (
    <LabPanel emoji="📍" label="POSITION OVERVIEW" ar="نظرة على كل علاقة مكانية" seq="l22-overview">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={PREP_INTRO} />
      </div>
      <div className="mt-2 text-center text-base font-bold text-slate-700">
        <Rich text={PREP_SIMPLE_Q} />
      </div>
      <SourceLine en={PREP_EXAMPLE.en} ar={PREP_EXAMPLE.ar} tone="focus" />
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        <En className="rounded-xl bg-teal-600 px-4 py-2 text-lg font-black text-white">{PREP_KEY_WORD.en}</En>
        <Rich text={PREP_KEY_REL} className="text-base font-bold text-slate-700" />
      </div>
      <div className="mt-3">
        <div className="mb-2 text-center text-sm font-bold text-slate-600">
          <Rich text="⭐ اضغط لتتخيل العلاقة:" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
          {positions.map((pos) => (
            <button
              key={pos.p}
              onClick={() => setActive(pos.p)}
              dir="ltr"
              className={`ltr-row rounded-xl border-2 p-2 text-center transition ${active === pos.p ? "border-teal-500 bg-white shadow" : "border-slate-200 bg-white/70 hover:border-teal-300"}`}
            >
              <En className="block text-sm font-black text-slate-900">{pos.label}</En>
              <span className="mt-1 block text-xs font-bold text-teal-700">{pos.ar}</span>
            </button>
          ))}
        </div>
      </div>
      <PositionDiagram position={active} />
      <div className="mt-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">
          <Rich text={PREP_STAR} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={PREP_DONT_MEMORIZE} />
        </div>
        <div className="mt-2 text-center text-base font-bold text-amber-900">
          <Rich text={PREP_VISUAL_DESC} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// Helper: single-preposition lab
// ============================================================
function PrepLab({
  seq,
  label,
  ar,
  emoji,
  position,
  examples,
  refLabel = "the table",
  objEmoji,
  refEmoji,
}: {
  seq: string;
  label: string;
  ar: string;
  emoji: string;
  position: Position;
  examples: readonly { en: string; ar?: string }[];
  refLabel?: string;
  objEmoji?: string;
  refEmoji?: string;
}) {
  return (
    <LabPanel emoji={emoji} label={label} ar={ar} seq={seq}>
      <PositionDiagram position={position} refLabel={refLabel} objectEmoji={objEmoji} referenceEmoji={refEmoji} />
      <div className="mt-2 grid gap-2">
        {examples.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// Individual prep labs
// ============================================================
function InLab() {
  return <PrepLab seq="l22-in" label="IN LAB" ar="شيء داخل حدود المكان" emoji="📦" position="in" examples={[...IN_EXAMPLES, ...IN_MORE.slice(0, 4)]} refLabel="box" objEmoji="⚽" />;
}

function OnLab() {
  return <PrepLab seq="l22-on" label="ON LAB" ar="الشيء على سطح شيء آخر" emoji="📖" position="on" examples={ON_EXAMPLES} refLabel="table" objEmoji="📱" />;
}

function InOnCompare() {
  return (
    <LabPanel emoji="🔥" label="IN vs ON" ar="قارن: داخل أم على السطح؟" seq="l22-in-on">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-sky-300 bg-white p-4">
          <div className="text-center text-sm font-black text-sky-900 mb-2">in = داخل</div>
          <PositionDiagram position="in" refLabel="box" objectEmoji="🧸" />
          <En className="mt-2 block text-center text-lg font-black text-sky-900">{IN_ON_COMPARE.inEn}</En>
          <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">
            <Rich text={IN_ON_COMPARE.inAr} />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-emerald-300 bg-white p-4">
          <div className="text-center text-sm font-black text-emerald-900 mb-2">on = على السطح</div>
          <PositionDiagram position="on" refLabel="box" objectEmoji="🧸" />
          <En className="mt-2 block text-center text-lg font-black text-emerald-900">{IN_ON_COMPARE.onEn}</En>
          <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">
            <Rich text={IN_ON_COMPARE.onAr} />
          </div>
        </div>
      </div>
      <div className="mt-3 text-center text-base font-bold text-rose-700">
        <Rich text={IN_ON_CHANGED} />
      </div>
    </LabPanel>
  );
}

function UnderLab() {
  return <PrepLab seq="l22-under" label="UNDER LAB" ar="أسفل شيء آخر" emoji="🐱" position="under" examples={UNDER_EXAMPLES} refLabel="table" objEmoji="🐱" />;
}

function AboveLab() {
  const [showOn, setShowOn] = useState(false);
  return (
    <LabPanel emoji="⏰" label="ABOVE LAB" ar="أعلى من شيء — لا يلامسه بالضرورة" seq="l22-above">
      <PositionDiagram position="above" refLabel="door" objectEmoji="⏰" />
      <div className="mt-2 grid gap-2">
        {ABOVE_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-teal-50 p-3">
        <div className="text-center text-sm font-black text-teal-800">
          <Rich text="🧠 ABOVE vs ON" />
        </div>
        <button
          onClick={() => setShowOn(!showOn)}
          className="mt-2 w-full rounded-xl bg-teal-700 px-3 py-2 text-sm font-bold text-white transition hover:brightness-110"
        >
          {showOn ? "إخفاء المقارنة" : "اظهر المقارنة مع on"}
        </button>
        {showOn && (
          <div className="mt-3 grid gap-2">
            <div className="text-sm font-bold text-slate-700">
              <Rich text={ABOVE_VS_ON_ABOVE_NOTE} />
            </div>
            <SourceLine en={ABOVE_VS_ON_ABOVE.en} ar={ABOVE_VS_ON_ABOVE.ar} tone="focus" />
            <SourceLine en={ABOVE_VS_ON_ON.en} tone="good" />
            <div className="text-center text-base font-bold text-teal-800">
              <Rich text={ABOVE_VS_ON_RULE} />
            </div>
          </div>
        )}
      </div>
    </LabPanel>
  );
}

function BelowLab() {
  return (
    <LabPanel emoji="⬇️" label="BELOW LAB" ar="أسفل مستوى شيء" seq="l22-below">
      <PositionDiagram position="below" refLabel="window" objectEmoji="🪜" />
      <div className="mt-2 grid gap-2">
        {BELOW_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-sky-200 bg-sky-50 p-3">
        <div className="text-center text-sm font-black text-sky-900">⭐ ABOVE ↔ BELOW</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <En className="block rounded-xl bg-white px-3 py-2 text-center text-base font-black text-sky-900">{ABOVE_BELOW_PAIR.exampleA.en}</En>
          <En className="block rounded-xl bg-white px-3 py-2 text-center text-base font-black text-sky-900">{ABOVE_BELOW_PAIR.exampleB.en}</En>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-700">
          <Rich text={ABOVE_BELOW_PAIR.note} />
        </div>
      </div>
    </LabPanel>
  );
}

function BehindLab() {
  return <PrepLab seq="l22-behind" label="BEHIND LAB" ar="خلف شيء آخر" emoji="🚗" position="behind" examples={BEHIND_EXAMPLES} refLabel="house" objEmoji="🚗" />;
}

function InFrontLab() {
  return (
    <LabPanel emoji="👨‍🏫" label="IN FRONT OF LAB" ar="أمام شيء — عكس behind" seq="l22-infront">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-3">
          <PositionDiagram position="behind" refLabel="sofa" objectEmoji="🐱" />
          <En className="mt-2 block text-center text-base font-black text-slate-900">{BEHIND_INFRONT_COMPARE.behind.en}</En>
          <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">
            <Rich text={BEHIND_INFRONT_COMPARE.behind.ar} />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-teal-300 bg-white p-3">
          <PositionDiagram position="in front of" refLabel="sofa" objectEmoji="🐱" />
          <En className="mt-2 block text-center text-base font-black text-teal-900">{BEHIND_INFRONT_COMPARE.infront.en}</En>
          <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">
            <Rich text={BEHIND_INFRONT_COMPARE.infront.ar} />
          </div>
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        {INFRONT_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
      <div className="mt-2 text-center text-base font-bold text-rose-700">
        <Rich text={BEHIND_INFRONT_CHANGED} />
      </div>
    </LabPanel>
  );
}

function NextToLab() {
  return <PrepLab seq="l22-nextto" label="NEXT TO LAB" ar="بجانب مباشرة تقريبًا" emoji="🪑" position="next to" examples={NEXTTO_EXAMPLES} refLabel="table" objEmoji="🪑" />;
}

function NearLab() {
  return (
    <LabPanel emoji="🏫" label="NEAR LAB" ar="قريب من — قد توجد مسافة" seq="l22-near">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <div className="text-center text-xs font-bold text-teal-800 mb-1">next to = بجانب مباشرة</div>
          <PositionDiagram position="next to" refLabel="table" objectEmoji="🪑" />
          <En className="mt-2 block text-center text-base font-black text-teal-900">{NEXTTO_NEAR_EXAMPLES.nextto.en}</En>
          <div dir="rtl" className="mt-1 text-center text-xs font-bold text-slate-500">
            <Rich text={NEXTTO_NEAR_EXAMPLES.nextto.ar} />
          </div>
        </div>
        <div>
          <div className="text-center text-xs font-bold text-sky-800 mb-1">near = قريب من</div>
          <PositionDiagram position="near" refLabel="table" objectEmoji="🪑" />
          <En className="mt-2 block text-center text-base font-black text-sky-900">{NEXTTO_NEAR_EXAMPLES.near.en}</En>
          <div dir="rtl" className="mt-1 text-center text-xs font-bold text-slate-500">
            <Rich text={NEXTTO_NEAR_EXAMPLES.near.ar} />
          </div>
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        {NEAR_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-teal-800">
        <Rich text={NEXTTO_NEAR_CLOSE} />
      </div>
    </LabPanel>
  );
}

function BetweenLab() {
  return (
    <LabPanel emoji="⚽" label="BETWEEN LAB" ar="بين شيئين محددين (A و B)" seq="l22-between">
      <PositionDiagram position="between" objectEmoji="⚽" />
      <div className="mt-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
        <En className="text-xl font-black text-amber-900">{BETWEEN_FORMULA}</En>
        <En className="mt-1 block text-base font-black text-slate-700">{BETWEEN_EXAMPLE.en}</En>
        <div dir="rtl" className="text-sm font-bold text-slate-500">
          <Rich text={BETWEEN_EXAMPLE.ar} />
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        {BETWEEN_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
    </LabPanel>
  );
}

function OppositeLab() {
  return <PrepLab seq="l22-opposite" label="OPPOSITE LAB" ar="مقابل / في الجهة المقابلة" emoji="🏦" position="opposite" examples={OPPOSITE_EXAMPLES} refLabel="school" refEmoji="🏫" />;
}

function InsideOutsideLab() {
  const [mode, setMode] = useState<"inside" | "outside">("inside");
  return (
    <LabPanel emoji="🏠" label="INSIDE / OUTSIDE LAB" ar="الداخل والخارج" seq="l22-in-out">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode("inside")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${mode === "inside" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          inside
        </button>
        <button
          onClick={() => setMode("outside")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${mode === "outside" ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          outside
        </button>
      </div>
      <PositionDiagram position={mode} refLabel="house" objectEmoji="🐶" />
      <div className="mt-2">
        <div className="mb-2 text-center text-sm font-bold text-slate-600">inside أمثلة:</div>
        <div className="grid gap-2">
          {INSIDE_EXAMPLES.map((ex) => (
            <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <div className="mb-2 text-center text-sm font-bold text-slate-600">outside أمثلة:</div>
        <div className="grid gap-2">
          {OUTSIDE_EXAMPLES.map((ex) => (
            <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
          ))}
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <En className="block rounded-xl border-2 border-teal-200 bg-teal-50 px-3 py-2 text-center text-base font-black text-teal-900">{INSIDE_OUTSIDE_PAIR.inside.en}</En>
        <En className="block rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-center text-base font-black text-sky-900">{INSIDE_OUTSIDE_PAIR.outside.en}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 15. Preposition Map
// ============================================================
function PrepositionMap() {
  return (
    <LabPanel emoji="🗺️" label="PREPOSITION MAP" ar="كل حروف الجر الأساسية في خريطة واحدة" seq="l22-map">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text="احفظ المعنى المكاني (وليس مجرد ترجمة):" />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {PREP_MAP.map((item) => (
          <div key={item.en} className="flex items-center justify-between gap-2 rounded-2xl border-2 border-teal-100 bg-white p-3">
            <En className="text-lg font-black text-teal-900">{item.en}</En>
            <Rich text={item.ar} className="text-base font-bold text-slate-700" />
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 16. There is connection
// ============================================================
function ThereIsConnection() {
  return (
    <LabPanel emoji="🔗" label="THERE IS CONNECTION" ar="نربط حرف الجر بـ There is" seq="l22-thereis">
      <div className="text-center text-base font-bold text-slate-700">بدل:</div>
      <SourceLine en={THEREIS_CONN_FROM.en} />
      <div className="text-center text-base font-bold text-slate-700">يمكننا أن نستخدم:</div>
      <SourceLine en={THEREIS_CONN_TO.en} ar={THEREIS_CONN_TO.ar} tone="good" />
      <div className="mt-3 grid gap-2">
        {THEREIS_CONN_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} tone="focus" />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 17. There are (plural)
// ============================================================
function ThereAreConnection() {
  return (
    <LabPanel emoji="🔢" label="THERE ARE CONNECTION" ar="مع الجمع: هناك عدة أشياء في أماكن" seq="l22-thereare">
      <div className="grid gap-2">
        {THEREARE_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-800">🔥 لاحظ البنية</div>
        <FormulaStrip items={THEREARE_FORMULA_PARTS as unknown as string[]} tone="amber" />
        <En className="mt-2 block text-center text-lg font-black text-amber-900">{THEREARE_EXAMPLE.en}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 18. Where questions
// ============================================================
function WhereQuestions() {
  return (
    <LabPanel emoji="❓" label="WHERE? QUESTION MACHINE" ar="آلة السؤال عن المكان" seq="l22-where">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text="تعلمنا سابقًا:" />
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {WH_WORDS.map((w) => (
          <div key={w.en} className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-1.5">
            <En className="text-base font-black text-slate-700">{w.en}</En>
            <span className="text-sm font-bold text-slate-600">= {w.ar}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-teal-50 p-3">
        <div className="text-center text-sm font-black text-teal-800">⭐ السؤال الأساسي</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {WHERE_RULES.map((r) => (
            <div key={r.form} className="rounded-xl bg-white p-3 text-center">
              <En className="text-xl font-black text-teal-900">{r.form}</En>
              <div className="mt-1 text-sm font-bold text-slate-600">{r.note}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 grid gap-2">
        {WHERE_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 19. Answers
// ============================================================
function AnswersBoard() {
  const [showShort, setShowShort] = useState(false);
  return (
    <LabPanel emoji="💬" label="ANSWER BOARD" ar="كيف نجيب عن سؤال Where؟" seq="l22-answers">
      <div className="grid gap-2">
        {ANSWER_EXAMPLES.map((ex) => (
          <div key={ex.q.en} className="rounded-2xl border-2 border-slate-100 bg-white p-3">
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-sky-100 px-2 py-0.5 text-xs font-black text-sky-800">Q</span>
              <En className="text-base font-black text-slate-900">{ex.q.en}</En>
            </div>
            <div className="mt-1 mr-8 text-xs font-bold text-slate-500">
              <Rich text={ex.q.ar} />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-xs font-black text-emerald-800">A</span>
              <En className="text-base font-black text-emerald-900">{ex.a.en}</En>
            </div>
            <div className="mt-1 mr-8 text-xs font-bold text-slate-500">
              <Rich text={ex.a.ar} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">🔥 إجابة أكثر طبيعية (اختصار)</div>
        <button
          onClick={() => setShowShort(!showShort)}
          className="mt-2 w-full rounded-xl bg-amber-500 px-3 py-2 text-sm font-bold text-white transition hover:brightness-110"
        >
          {showShort ? "إخفاء الإجابات المختصرة" : "اظهر الإجابات المختصرة"}
        </button>
        {showShort && (
          <div className="mt-2 space-y-2">
            {ANSWER_SHORT_EXAMPLES.map((ex) => (
              <div key={ex.q.en} className="flex items-center gap-2 rounded-xl bg-white p-2">
                <En className="text-sm font-black text-slate-700">{ex.q.en}</En>
                <span className="text-slate-400">→</span>
                <En className="text-sm font-black text-amber-800">{ex.a.en}</En>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2 text-center text-xs font-bold text-slate-600">
          <Rich text={ANSWER_SHORT_NOTE2} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 20. Full Q&A
// ============================================================
function FullQA() {
  return (
    <LabPanel emoji="🗣️" label="FULL Q&A" ar="حوار كامل سؤال وجواب" seq="l22-fullqa">
      <div className="space-y-2">
        {FULL_QA.map((pair, i) => (
          <div key={i} className="grid gap-1 rounded-2xl border-2 border-slate-100 bg-white p-3">
            <En className="text-base font-black text-sky-900">{pair.a}</En>
            <En className="text-base font-black text-emerald-900">{pair.b}</En>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 21. Pronouns bridge
// ============================================================
function PronounsBoard() {
  return (
    <LabPanel emoji="👥" label="PRONOUN BRIDGE" ar="جسر الضمائر: Ali→He، والنتيجة في الموقع" seq="l22-pronouns">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PRONOUNS_MAP.map((p) => (
          <div key={p.noun} className="rounded-2xl border-2 border-slate-100 bg-white p-3 text-center">
            <En className="text-lg font-black text-slate-900">{p.noun}</En>
            <div className="my-1 text-lg">→</div>
            <En className="rounded-xl bg-teal-600 px-3 py-1 text-base font-black text-white">{p.pronoun}</En>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {PRONOUNS_EXAMPLES.map((ex) => (
          <div key={ex.q.en} className="rounded-2xl border-2 border-slate-100 bg-white p-3">
            <En className="text-base font-black text-sky-900">{ex.q.en}</En>
            <En className="mt-1 text-base font-black text-emerald-900">{ex.a.en}</En>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 22. Possessive board
// ============================================================
function PossessiveBoard() {
  return (
    <LabPanel emoji="🎒" label="POSSESSIVE LOCATION LAB" ar="ربط الملكية بالموقع" seq="l22-possessive">
      <div className="grid gap-2">
        {POSS_EXAMPLES.map((ex) => (
          <div key={ex.q.en} className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-3">
            <En className="text-base font-black text-amber-900">{ex.q.en}</En>
            <En className="mt-1 text-base font-black text-emerald-900">{ex.a.en}</En>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center">
        <div className="text-sm font-black text-teal-800">🔥 الآن أصبح لدينا سلسلة:</div>
        <En className="mt-1 text-base font-black text-teal-900">{POSS_CHAIN}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 23. Multiple-preposition builder
// ============================================================
function MultiPrepBuilder() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🧩" label="MULTI-PREP BUILDER" ar="أكثر من حرف جر في جملة واحدة" seq="l22-multi">
      <div className="space-y-2">
        {MULTI_EXAMPLES.map((ex, i) => (
          <button
            key={ex.en}
            onClick={() => setActive(i)}
            className={`w-full rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-teal-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}
          >
            <En className="block text-left text-base font-black text-slate-900">{ex.en}</En>
            <div className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={ex.ar} />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4">
        <div className="text-center text-base font-black text-fuchsia-900">🚀 IQ200: ارسم العلاقات في رأسك</div>
        <En className="mt-2 block text-center text-lg font-black text-fuchsia-950">The ball is under the chair next to the table.</En>
        <div className="mt-2 text-center text-2xl font-black text-fuchsia-900">{MULTI_IQ_VISUAL}</div>
        <div className="mt-2 grid gap-1">
          {MULTI_IQ_RELATIONS.map((r) => (
            <div key={r.obj + r.rel + r.ref} dir="ltr" className="flex items-center justify-center gap-2 text-base font-black text-fuchsia-900">
              <En>{r.obj}</En>
                <span className="rounded-lg bg-white px-2 py-0.5 text-fuchsia-700"><En>{r.rel}</En></span>
              <En>{r.ref}</En>
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 24. People position lab
// ============================================================
function PeoplePositionLab() {
  const people = [
    { emoji: "🧑", label: "Ali" },
    { emoji: "👩", label: "Sara" },
    { emoji: "👨‍🏫", label: "teacher" },
    { emoji: "🧒", label: "child" },
  ];
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🧑‍🤝‍🧑" label="PEOPLE POSITION LAB" ar="حروف الجر مع الأشخاص" seq="l22-people">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {people.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActive(i)}
            className={`rounded-2xl border-2 p-3 text-center transition ${active === i ? "border-teal-500 bg-white shadow" : "border-slate-200 bg-white/70"}`}
          >
            <div className="text-4xl">{p.emoji}</div>
            <En className="mt-1 block text-sm font-black text-slate-900">{p.label}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {PEOPLE_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 25. Above / Over explainer
// ============================================================
function AboveOverExplainer() {
  return (
    <LabPanel emoji="💡" label="ABOVE / OVER EXPLAINER" ar="نقطة تحذيرية بسيطة" seq="l22-over">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={OVER_NOTE} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {OVER_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-teal-50 p-4 text-center">
        <div className="text-sm font-bold text-slate-700">
          <Rich text={OVER_SAFE} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 26. Under / Below explainer
// ============================================================
function UnderBelowExplainer() {
  return (
    <LabPanel emoji="🌡️" label="UNDER / BELOW EXPLAINER" ar="تحت مكانيًا أم تحت مستوى؟" seq="l22-under-below">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text="under و below ليستا متطابقتين في كل السياقات." />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {UNDER_BELOW_PAIR.map((p) => (
          <div key={p.word} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            <div className="flex items-center justify-center gap-2">
              <En className="rounded-xl bg-teal-600 px-3 py-1 text-lg font-black text-white">{p.word}</En>
              <span className="text-sm font-bold text-slate-700">= {p.meaning}</span>
            </div>
            <En className="mt-2 block text-center text-base font-black text-slate-900">{p.example.en}</En>
          </div>
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={UNDER_BELOW_CLEAR} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 27. Between / Among
// ============================================================
function BetweenAmongLab() {
  return (
    <LabPanel emoji="👨‍🏫" label="BETWEEN vs AMONG LAB" ar="بين شيئين محددين أم وسط مجموعة؟" seq="l22-among">
      <div className="grid gap-2 sm:grid-cols-2">
        {AMONG_PAIR.map((p, i) => (
          <div key={p.word} className={`rounded-2xl border-2 p-3 ${i === 0 ? "border-teal-200 bg-teal-50" : "border-violet-200 bg-violet-50"}`}>
            <En className={`text-center text-xl font-black ${i === 0 ? "text-teal-900" : "text-violet-900"}`}>{p.word}</En>
            <div className="mt-1 text-center text-sm font-bold text-slate-700">
              <Rich text={p.meaning} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid gap-2">
        {AMONG_EXAMPLES.map((ex) => (
          <SourceLine key={ex.en} en={ex.en} ar={ex.ar} />
        ))}
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-600">
        <Rich text={AMONG_LATER} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 28. Room scene builder
// ============================================================
function RoomSceneBuilder() {
  const [built, setBuilt] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setBuilt((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const ROOM_EMOJIS = ["🛏️", "💡", "🪑", "📚", "🎒", "🖼️", "👟", "🪟"];
  return (
    <LabPanel emoji="🛏️" label="FULL ROOM BUILDER" ar="ابنِ الغرفة قطعة قطعة — كل قطعة جملة" seq="l22-room">
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {ROOM_SENTENCES.map((sentence, i) => {
          const on = built.has(i);
          return (
            <button
              key={sentence.en}
              onClick={() => toggle(i)}
              dir="ltr"
              className={`ltr-row flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${on ? "border-teal-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}
            >
              <span className={`text-2xl ${on ? "" : "opacity-30 grayscale"}`}>{ROOM_EMOJIS[i] ?? "📍"}</span>
              <En className={`text-base font-black ${on ? "text-slate-900" : "text-slate-400"}`}>{sentence.en}</En>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-teal-800">
        بنيت {built.size} / {ROOM_SENTENCES.length} من وصف الغرفة
      </div>
      <div className="mt-2 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">لاحظ كم قاعدة استخدمنا:</div>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {ROOM_NOTICE_ITEMS.map((item) => (
            <En key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-amber-900">
              {item}
            </En>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// EXERCISE COMPONENTS
// ============================================================

// Grammar Detective
function DetectiveEx() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4" data-en-seq="l22-detective">
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center text-base font-bold text-rose-900">
        <Rich text="صحح الأخطاء العشرة التالية. كل خطأ من المصدر." />
      </div>
      <div className="space-y-3">
        {GRAMMAR_DETECTIVE_22.map((item, i) => {
          const done = checked.has(i);
          const shown = revealed.has(i);
          return (
            <div key={item.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{item.n}</span>
                <div className="min-w-0 flex-1">
                  <En className="block text-left text-base font-extrabold text-rose-700 line-through decoration-rose-300">{item.wrong}</En>
                  {item.wrongNote && (
                    <div dir="rtl" className="mt-1 text-xs font-bold text-slate-500">
                      <Rich text={item.wrongNote} />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                <input
                  dir="ltr"
                  value={typed[i] ?? ""}
                  onChange={(event) => setTyped((state) => ({ ...state, [i]: event.target.value }))}
                  placeholder="اكتب التصحيح..."
                  className="font-en w-full min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none focus:border-rose-400 sm:max-w-md"
                />
                <button onClick={() => setChecked((s) => new Set(s).add(i))} className="rounded-xl bg-rose-700 px-3 py-2 text-sm font-bold text-white">تحقق</button>
                <button onClick={() => setRevealed((s) => new Set(s).add(i))} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">اكشف الحل</button>
              </div>
              {done && (
                <div className="mt-2 pr-11 text-sm font-bold text-slate-600">
                  راجع الحل الكامل بالضغط على "اكشف الحل".
                </div>
              )}
              {shown && (
                <div className="mt-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3 pr-11">
                  <div className="text-sm font-bold text-slate-700">
                    <Rich text={item.solutionText ?? SOLUTIONS_22[i]} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Challenge 1
function Challenge1Ex() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = CHALLENGE1_22.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-4" data-en-seq="l22-challenge1">
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-4 text-center">
        <div className="text-base font-bold text-slate-700">اختر من الكلمات:</div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {CHALLENGE1_22_WORDS.map((w) => (
            <En key={w} className="rounded-xl bg-teal-700 px-4 py-2 text-base font-black text-white">{w}</En>
          ))}
        </div>
      </div>
      {CHALLENGE1_22.map((item, i) => {
        const choice = picked[i];
        const complete = choice !== undefined;
        const right = choice === item.answer;
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${complete ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-700 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {CHALLENGE1_22_OPTIONS.map((opt, oi) => {
                const selected = choice === oi;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-teal-400";
                return (
                  <button key={opt} onClick={() => setPicked((s) => ({ ...s, [i]: oi }))} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
            {complete && (
              <div dir="ltr" className={`ltr-row mt-2 pr-11 text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>
                <En>{right ? "✓ صحيح!" : `✕ الصحيح: ${CHALLENGE1_22_OPTIONS[item.answer]}`}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">النتيجة: {score} / {CHALLENGE1_22.length}</div>
    </div>
  );
}

// Challenge 2
function Challenge2Ex() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = CHALLENGE2_22.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq="l22-challenge2">
      {CHALLENGE2_22.map((item, i) => {
        const choice = picked[i];
        const right = choice === item.answer;
        const options = [item.a, item.b];
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${choice !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-600 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {options.map((opt, oi) => {
                const selected = choice === oi;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-cyan-400";
                return (
                  <button key={opt} onClick={() => setPicked((s) => ({ ...s, [i]: oi }))} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}>
                    {oi === 0 ? "A" : "B"}{") " + opt}
                  </button>
                );
              })}
            </div>
            {choice !== undefined && !right && (
              <div className="mt-2 pr-11 text-sm font-black text-rose-700">
                الصحيح: {item.answer === 0 ? "A" : "B"}
                <En className="mr-1"> {options[item.answer]}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50 p-3 text-center text-sm font-bold text-cyan-800">النتيجة: {score} / {CHALLENGE2_22.length}</div>
    </div>
  );
}

// Challenge 3
function Challenge3Ex() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const normalize = (v: string) => v.trim().toLowerCase().replace(/\u2019/g, "'").replace(/\s+/g, " ").replace(/[.?!؟]+$/g, "");
  const score = CHALLENGE3_22.reduce((sum, item, i) => sum + (checked.has(i) && item.answers.some((a) => normalize(a) === normalize(typed[i] ?? "")) ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq="l22-challenge3">
      {CHALLENGE3_22.map((item, i) => {
        const done = checked.has(i);
        const right = done && item.answers.some((a) => normalize(a) === normalize(typed[i] ?? ""));
        const shown = revealed.has(i);
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.q}</En>
            </div>
            <div className="mt-1 pr-11 text-sm font-bold text-slate-500">
              <Rich text={":تلميح " + item.hint} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 pr-11">
              <input
                dir="ltr"
                value={typed[i] ?? ""}
                onChange={(e) => setTyped((s) => ({ ...s, [i]: e.target.value }))}
                placeholder="اكتب الإجابة كاملة..."
                className="font-en w-full min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold outline-none focus:border-emerald-400"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pr-11">
              <button onClick={() => setChecked((s) => new Set(s).add(i))} className="rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white">تحقق</button>
              <button onClick={() => setRevealed((s) => new Set(s).add(i))} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">اكشف</button>
            </div>
            {done && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓ أحسنت!" : "✕ حاول مجددًا."}</div>}
            {shown && (
              <div dir="ltr" className="ltr-row mt-2 pr-11">
                <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">{item.answers[0]}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-3 text-center text-sm font-bold text-emerald-800">النتيجة: {score} / {CHALLENGE3_22.length}</div>
    </div>
  );
}

// IQ200 Challenge 1
function IQ200A() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4" data-en-seq="l22-iq200a">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4">
        <div className="text-center text-lg font-black text-fuchsia-900">🚀 IQ200 — Desk Scene</div>
        <div className="mt-2 grid gap-1.5 rounded-2xl bg-white p-3 sm:grid-cols-2">
          {IQ200_1_SCENE.map((line) => (
            <En key={line.en} className="text-left text-sm font-black text-slate-800">{line.en}</En>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {IQ200_1_QUESTIONS.map((q, i) => {
          const shown = revealed.has(i);
          return (
            <div key={q.n} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">{q.n}</span>
                <En className="flex-1 text-left text-base font-black text-slate-900">{q.q}</En>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 pr-11">
                <button onClick={() => setRevealed((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600">
                  {shown ? "إخفاء الإجابة" : "اكشف الإجابة"}
                </button>
              </div>
              {shown && (
                <div dir="ltr" className="ltr-row mt-2 pr-11">
                  <En className="rounded-xl bg-emerald-50 px-3 py-1.5 text-base font-black text-emerald-800">{q.answer}</En>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// IQ200 Challenge 2
function IQ200B() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = IQ200_2.reduce((sum, item, i) => sum + (item.options[picked[i]] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq="l22-iq200b">
      {IQ200_2.map((item, i) => {
        const choice = picked[i];
        const right = choice !== undefined && item.options[choice] === item.answer;
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${choice !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">{item.n}</span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-700"><Rich text={item.ar} /></div>
                <En className="mt-1 block text-left text-base font-extrabold text-slate-900">{item.stem}</En>
              </div>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {item.options.map((opt, oi) => {
                const selected = choice === oi;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-fuchsia-400";
                return (
                  <button key={opt} onClick={() => setPicked((s) => ({ ...s, [i]: oi }))} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-fuchsia-100 bg-fuchsia-50 p-3 text-center text-sm font-bold text-fuchsia-800">النتيجة: {score} / {IQ200_2.length}</div>
    </div>
  );
}

// Final Boss
function FinalBossEx() {
  const [checkedReq, setCheckedReq] = useState<Set<number>>(new Set());
  const [text, setText] = useState("");
  const sentenceCount = (text.match(/[.?!]+/g) || []).length;
  const SCENE_EMOJIS = ["🪟", "💻", "📚", "🎒", "📦", "🖊️", "🗺️", "🕐", "🪑", "🧑‍🎓", "👨‍🏫"];
  return (
    <div className="space-y-4" data-en-seq="l22-final-boss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-lg font-black text-amber-900">🏆 FINAL BOSS — SCIENCE LAB 🔬</div>
        <div className="mt-2 text-center text-base font-bold text-slate-700">
          <Rich text="تخيل أنك دخلت إلى مختبر علوم." />
        </div>
        <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
          <div className="grid gap-1.5 sm:grid-cols-2">
            {FINAL_BOSS_22_CLUES_AR.map((clue, i) => (
              <div key={clue} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2 text-sm font-bold text-slate-700">
                <span className="text-xl">{SCENE_EMOJIS[i] ?? "📍"}</span>
                <Rich text={clue} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
        <div className="text-center text-base font-bold text-slate-800">
          <Rich text={FINAL_BOSS_22_TASK_DESC} />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {FINAL_BOSS_22_REQUIREMENTS.map((req, i) => {
            const on = checkedReq.has(i);
            return (
              <button
                key={req.n}
                onClick={() =>
                  setCheckedReq((s) => {
                    const next = new Set(s);
                    next.has(i) ? next.delete(i) : next.add(i);
                    return next;
                  })
                }
                className={`flex items-center gap-2 rounded-2xl border-2 p-2.5 text-right transition ${on ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {on ? "✓" : ""}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                  {req.n}{" "}
                  {req.english ? (
                    <En className="text-base font-black text-slate-900">{req.text}</En>
                  ) : (
                    <Rich text={req.text} />
                  )}
                </span>
              </button>
            );
          })}
        </div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={8}
          placeholder="Write your 10-12 sentence paragraph about the science lab here..."
          className="font-en mt-3 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-indigo-400"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 text-sm font-bold text-slate-600">
          <span>عدد الجمل: {sentenceCount} / 10-12</span>
          <span>متطلبات محددة: {checkedReq.size} / {FINAL_BOSS_22_REQUIREMENTS.length}</span>
        </div>
      </div>
    </div>
  );
}

// True/False
function TrueFalseEx() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4" data-en-seq="l22-tf">
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4">
        <div className="text-center text-sm font-bold text-slate-700">اقرأ المشهد:</div>
        <div className="mt-2 grid gap-1.5 rounded-2xl bg-white p-3 sm:grid-cols-2">
          {TF_SCENE.map((line) => (
            <En key={line.en} className="text-left text-sm font-black text-slate-800">{line.en}</En>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {TF_QUESTIONS.map((q, i) => {
          const shown = revealed.has(i);
          return (
            <div key={q.n} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-600 text-sm font-bold text-white">{q.n}</span>
                <div className="min-w-0 flex-1 text-base font-bold text-slate-900"><Rich text={q.q} /></div>
              </div>
              <div className="mt-2 flex gap-2 pr-11">
                <button onClick={() => setRevealed((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-600">
                  {shown ? "إخفاء" : "اكشف الإجابة"}
                </button>
              </div>
              {shown && (
                <div className="mt-2 rounded-xl bg-cyan-50 p-2.5 pr-11 text-sm font-bold text-cyan-900">
                  <Rich text={q.a} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExerciseView({ exercise }: { exercise: Exercise22 }) {
  switch (exercise.type) {
    case "detective": return <DetectiveEx />;
    case "challenge1": return <Challenge1Ex />;
    case "challenge2": return <Challenge2Ex />;
    case "challenge3": return <Challenge3Ex />;
    case "iq200a": return <IQ200A />;
    case "iq200b": return <IQ200B />;
    case "finalBoss": return <FinalBossEx />;
    case "trueFalse": return <TrueFalseEx />;
  }
}

function BlockView({ block }: { block: Block22 }) {
  switch (block.type) {
    case "text": return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english": return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "mixed": return <div className="rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-3"><Rich text={block.text} className="text-base font-bold text-slate-800 md:text-lg" /></div>;
    case "note": return <Note emoji={block.emoji} text={block.text} />;
    case "formulaStrip": return <FormulaStrip items={block.items} tone={block.tone ?? "teal"} />;
    case "openingRecall": return <OpeningRecall />;
    case "positionOverview": return <PositionOverview />;
    case "inLab": return <InLab />;
    case "onLab": return <OnLab />;
    case "inOnCompare": return <InOnCompare />;
    case "underLab": return <UnderLab />;
    case "aboveLab": return <AboveLab />;
    case "belowLab": return <BelowLab />;
    case "behindLab": return <BehindLab />;
    case "inFrontLab": return <InFrontLab />;
    case "nextToLab": return <NextToLab />;
    case "nearLab": return <NearLab />;
    case "betweenLab": return <BetweenLab />;
    case "oppositeLab": return <OppositeLab />;
    case "insideOutsideLab": return <InsideOutsideLab />;
    case "prepositionMap": return <PrepositionMap />;
    case "thereIsConnection": return <ThereIsConnection />;
    case "thereAreConnection": return <ThereAreConnection />;
    case "whereQuestions": return <WhereQuestions />;
    case "answersBoard": return <AnswersBoard />;
    case "fullQA": return <FullQA />;
    case "pronounsBoard": return <PronounsBoard />;
    case "possessiveBoard": return <PossessiveBoard />;
    case "multiPrepBuilder": return <MultiPrepBuilder />;
    case "peoplePositionLab": return <PeoplePositionLab />;
    case "aboveOverExplainer": return <AboveOverExplainer />;
    case "underBelowExplainer": return <UnderBelowExplainer />;
    case "betweenAmongLab": return <BetweenAmongLab />;
    case "roomSceneBuilder": return <RoomSceneBuilder />;
  }
}

// ============================================================
// COVER
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-teal-300/40 bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-24 w-24 place-items-center rounded-3xl bg-white/15 text-5xl ring-4 ring-white/25">🗺️</div>
        <div>
          <div dir="ltr" className="inline-flex items-center rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
            <En className="text-[11px] font-black uppercase tracking-[0.22em] text-teal-200">{LAB_NAME_22}</En>
          </div>
          <h1 className="font-head mt-3 text-3xl font-bold md:text-4xl">
            <Rich text={LESSON_TITLE_22} />
          </h1>
          <En className="mt-1 block text-xl font-bold text-teal-200">{LESSON_SUBTITLE_22}</En>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-lg font-bold text-teal-50">
        <Rich text={LESSON_ARABIC_TITLE_22} />
      </div>
      <div className="mt-4 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-teal-50">
        <Rich text="سنبني نظامًا أساسيًا لوصف الأماكن والمواقع: in / on / under / above / below / behind / in front of / next to / near / between / opposite / inside / outside — ومع There is / There are وWhere؟ والضمائر والملكية." />
      </div>
      <div dir="ltr" className="ltr-row mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/10 p-4">
        {["in", "on", "under", "above", "below", "behind", "in front of", "next to", "near", "between"].map((p) => (
          <En key={p} className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">{p}</En>
        ))}
      </div>
      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-teal-100">
        <Rich text={LAB_MOTTO_22} />
      </div>
    </div>
  );
}

function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[1]} title="أهداف الدرس" lead="بنهاية الدرس ستكون قادرًا على:">
      <div className="grid gap-2">
        {OBJECTIVES_22.map((objective) => (
          <div key={objective.n} className="rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-700 text-sm font-bold text-white">{objective.n}</span>
              <Rich text={objective.text} className="font-semibold text-slate-800" />
            </div>
            {"items" in objective && objective.items && (
              <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2 pr-11">
                {objective.items.map((item) => (
                  <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-teal-900">
                    <En>{item}</En>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function ImportantNote() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[38]} title="نقطة مهمة جدًا — لا تحفظ الترجمة فقط">
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
        <div className="text-base font-bold leading-relaxed text-slate-800">
          <Rich text={IMPORTANT_NOTE_TEXT} />
        </div>
        <div className="mt-3 text-base font-bold leading-relaxed text-slate-800">
          <Rich text={IMPORTANT_NOTE_BEST} />
        </div>
        <div className="mt-3 rounded-xl bg-white p-3 text-center">
          <div className="text-sm font-bold text-rose-700"><Rich text="مثلاً لا تحفظ:" /></div>
          <En className="mt-1 text-lg font-black text-rose-700 line-through">{IMPORTANT_NOTE_EXAMPLE_DONT.en} = تحت</En>
          <div className="text-xs font-bold text-rose-600">فقط.</div>
          <div className="mt-2 text-sm font-bold text-emerald-700"><Rich text={IMPORTANT_NOTE_EXAMPLE_DO} /></div>
          <En className="mt-1 text-lg font-black text-emerald-800">{IMPORTANT_NOTE_EXAMPLE.en}</En>
        </div>
        <div className="mt-3 text-center text-sm font-bold text-amber-900">
          <Rich text={IMPORTANT_NOTE_RESULT} />
        </div>
      </div>
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🏆" sourceHeading={SOURCE_SECTIONS[39]} title="الخلاصة الذهبية">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text="أهم كلمات اليوم:" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {GOLDEN_SUMMARY_22_WORDS.map((row) => (
          <div key={row.en} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-teal-200 bg-white p-2.5">
            <Rich text={row.ar} className="text-sm font-bold text-slate-700" />
            <En className="rounded-xl bg-teal-600 px-3 py-1.5 text-base font-black text-white">{row.en}</En>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border-2 border-sky-200 bg-sky-50 p-4">
        <div className="text-center text-base font-black text-sky-900">⭐ أهم سؤالين</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {GOLDEN_SUMMARY_22_QUESTIONS.map((q) => (
            <div key={q.form} className="rounded-xl bg-white p-2.5 text-center">
              <En className="text-lg font-black text-sky-900">{q.form}</En>
              <div className="text-xs font-bold text-slate-600">{q.note}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
        <div className="text-center text-base font-black text-emerald-900">⭐ أهم تركيبين</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {GOLDEN_SUMMARY_22_FORMULAS.map((f) => (
            <En key={f.form} className="block rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-emerald-900">{f.form}</En>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function FinalExamples() {
  return (
    <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[40]} title="أمثلة نهائية مركبة">
      <div className="grid gap-2">
        {FINAL_EXAMPLES.map((ex) => (
          <En key={ex.en} className="block rounded-2xl border-2 border-slate-100 bg-white p-3 text-center text-lg font-black text-slate-900">
            {ex.en}
          </En>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50 p-3 text-center text-sm font-bold text-fuchsia-800">
        <Rich text={FINAL_EXAMPLES_NOTE} />
      </div>
    </Frame>
  );
}

function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[41]} title="خريطة المنهج حتى الآن">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_22.map((item) => (
          <div key={item.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${item.here ? "border-teal-400 bg-teal-100 shadow" : "border-slate-100 bg-white"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${item.here ? "bg-teal-700" : "bg-slate-500"}`}>{item.n}</span>
            <En className={`text-left text-sm font-bold ${item.here ? "text-teal-950" : "text-slate-700"}`}>{item.en}</En>
            {item.here && <span className="mr-auto text-lg">🔥</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-teal-200 bg-teal-50 p-5 text-center">
        <Rich text={ROADMAP_CLOSING_22} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" />
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-teal-300/40 bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 22.</h2>
      <div className="mt-4 text-lg leading-relaxed text-teal-50">
        <Rich text="أصبحت تتقن حروف الجر للمكان: تستطيع أن ترى العلاقة بين الأشياء، وتربطها بـ There is / There are، وتسأل بـ Where؟ وتجيب، وتستخدم الضمائر والملكية في جملة واحدة طبيعية تصف غرفة أو مشهدًا كاملًا." />
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-center">
        <Rich text={ROADMAP_CLOSING_22} className="font-bold text-teal-50" />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-teal-800 transition hover:bg-teal-50">← جميع الدروس</button>
      </div>
    </div>
  );
}

function sourceHeadingFor(slide: Slide22): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex];
}

export function SlideView22({ s, onExit }: { s: Slide22; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson":
      return (
        <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={s.tip}>
          {s.blocks.map((block, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView block={block} />
            </div>
          ))}
        </Frame>
      );
    case "ex":
      return <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}><ExerciseView exercise={s.ex} /></Frame>;
    case "importantNote": return <ImportantNote />;
    case "summary": return <Summary />;
    case "finalExamples": return <FinalExamples />;
    case "roadmap": return <Roadmap />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={<Rich text={s.title} />} lead="أسئلة جديدة تقيس: حروف الجر الأساسية، الفروقات الدقيقة، There is/are مع المكان، Where؟ والملكية والضمائر.">
          <FinalQuiz lesson={22} accent="bg-teal-700" />
        </Frame>
      );
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide22): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-500",
  "حروف الجر الأساسية": "text-teal-700",
  "المواقع الرأسية": "text-sky-700",
  "المواقع الأفقية والنسبية": "text-cyan-700",
  "الداخل والخارج": "text-emerald-700",
  "الربط بالمنظومة": "text-indigo-700",
  "الأشخاص والتمييزات": "text-violet-700",
  "المشهد الكامل": "text-amber-700",
  "المحقق والتحديات": "text-fuchsia-700",
  "التحديات النهائية": "text-orange-700",
  "الخاتمة": "text-slate-600",
};

function Rail({
  index,
  setIndex,
  onExit,
  onClose,
}: {
  index: number;
  setIndex: (next: number) => void;
  onExit: () => void;
  onClose?: () => void;
}) {
  const groups = useMemo(() => {
    const out: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, i) => {
      const last = out[out.length - 1];
      if (last?.section === slide.section) last.indexes.push(i);
      else out.push({ section: slide.section, indexes: [i] });
    });
    return out;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">→ جميع الدروس</button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">
          <Rich text="الدرس 22 · Prepositions of Place" />
        </div>
        <En className="text-xs font-semibold text-teal-700">🗺️ {LAB_NAME_22}</En>
        <div className="mt-2 rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-bold text-teal-700">{SOURCE_NUMBERED_COUNT} قسمًا من المصدر · {SLIDES.length} شريحة</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i;
              return (
                <button key={i} onClick={() => { setIndex(i); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-teal-700 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>{i + 1}</span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[i])}</span>
                  <span className="mr-auto text-base">{SLIDES[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson22({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(() => ({
    next: () => setIndex((value) => Math.min(value + 1, total - 1)),
    prev: () => setIndex((value) => Math.max(value - 1, 0)),
  }), [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") navigation.next();
      if (event.key === "ArrowRight") navigation.prev();
      if (event.key === " ") { event.preventDefault(); navigation.next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu]);

  useEffect(() => { document.getElementById("l22-main")?.scrollTo({ top: 0 }); }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f0f9fb] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"><Rail index={index} setIndex={setIndex} onExit={onExit} /></div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500"><Rich text={`${slide.section} · `} /><span className="text-slate-800"><Rich text={slideTitle(slide)} /></span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-l from-teal-700 via-cyan-600 to-sky-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{index + 1} / {total}</span>
          </header>
          <main id="l22-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10"><div key={index} className="pop mx-auto max-w-4xl"><SlideView22 s={slide} onExit={onExit} /></div></main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={navigation.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={navigation.next} disabled={index === total - 1} className="rounded-full bg-teal-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-teal-800 disabled:opacity-30">التالي ←</button>
            </div>
          </div>
        </div>
      </div>
      {menu && <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
        <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} /></div>
      </div>}
    </div>
  );
}
