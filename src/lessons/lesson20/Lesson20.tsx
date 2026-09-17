import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_20,
  LESSON_SUBTITLE_20,
  LESSON_ARABIC_TITLE_20,
  LAB_NAME_20,
  LAB_MOTTO_20,
  COVER_INTRO_20,
  OBJECTIVES_20,
  CORE_IDEA_20,
  MAGIC_SYSTEM_20,
  MEMORY_20,
  SIMPLE_EXAMPLES_20,
  BASIC_TABLE_20,
  THIS_20,
  THAT_20,
  THESE_20,
  THOSE_20,
  COMPLETE_SYSTEM_20,
  BE_CONNECTIONS_20,
  PLURAL_CONNECTION_20,
  PEOPLE_20,
  NOUN_FORM_20,
  PRONOUN_FORM_20,
  QUESTIONS_20,
  SHORT_ANSWERS_20,
  IQ200_CONNECTION_20,
  POSSESSIVE_ADJECTIVE_20,
  POSSESSIVE_NOUN_20,
  THIS_THESE_20,
  THAT_THOSE_20,
  TWO_QUESTION_ENGINE_20,
  IQ200_EXAMPLE_20,
  CONTEXT_DISTANCE_20,
  TIME_CONNECTION_20,
  NEGATIVE_20,
  WHOSE_20,
  GRAMMAR_DETECTIVE_20,
  CHALLENGE1_20,
  CHALLENGE2_20,
  IQ200_CHALLENGE_20,
  IQ200_CHALLENGE2_20,
  FINAL_BOSS_20,
  SPEED_GAME_20,
  GOLDEN_TEST_20,
  SENTENCE_BUILDER_20,
  SUMMARY_20,
  LEVEL_REACHED_20,
  ROADMAP_20,
  ROADMAP_CLOSING_20,
  type Block20,
  type Exercise20,
  type Slide20,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 20 — DEMONSTRATIVE CONTROL CENTER
// Singular / Plural + Near / Far → This / That / These / Those
// لا تُقسّم الإنجليزية إلى كلمات منفصلة: كل وحدة إنجليزية عازل LTR كامل.
// ============================================================

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

/** نص عربي مختلط: LatinRuns يعزل كل مقطع إنجليزي متصل باتجاه LTR. */
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
    focus: "border-cyan-300 bg-cyan-50 text-cyan-900",
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

function MixedLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50/60 p-3">
      <Rich text={text} className="text-base font-bold text-slate-800 md:text-lg" />
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4">
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
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(8,145,178,0.25)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-cyan-700 text-lg font-bold text-white shadow-sm">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-cyan-100 px-3.5 py-1.5 text-sm font-bold text-cyan-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-cyan-700">SOURCE SECTION</span>
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
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-cyan-700 to-blue-700 p-4 text-white">
          <span className="text-2xl">🛰️</span>
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
    <div data-en-seq={seq} className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-50 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-cyan-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({ items, tone = "cyan" }: { items: readonly string[]; tone?: "cyan" | "emerald" | "amber" | "rose" }) {
  const colors = {
    cyan: "border-cyan-200 bg-white text-cyan-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    rose: "border-rose-200 bg-rose-50 text-rose-900",
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
// 1. الفكرة الأساسية — RADAR INPUT
// ============================================================
function CoreIdeaBoard() {
  const [focus, setFocus] = useState<"number" | "distance">("number");
  return (
    <LabPanel emoji="📡" label="DEMONSTRATIVE RADAR" ar="الرادار يقرأ العدد والمسافة" seq="l20-core-radar">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={CORE_IDEA_20.intro} />
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFocus("number")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${focus === "number" ? "bg-cyan-700 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          ① العدد
        </button>
        <button
          onClick={() => setFocus("distance")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${focus === "distance" ? "bg-indigo-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          ② المسافة
        </button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <button
          onClick={() => setFocus("number")}
          className={`rounded-3xl border-2 p-4 text-right transition ${focus === "number" ? "border-cyan-400 bg-cyan-50 shadow" : "border-slate-200 bg-white opacity-75"}`}
        >
          <div className="text-sm font-bold text-cyan-700"><Rich text={CORE_IDEA_20.firstLabel} /></div>
          <div className="mt-1 text-lg font-black text-slate-900"><Rich text={CORE_IDEA_20.firstQuestion} /></div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[CORE_IDEA_20.singular, CORE_IDEA_20.plural].map((item) => (
              <div key={item} className="rounded-2xl bg-white px-3 py-2 text-center shadow-sm">
                <Rich text={item} className="text-sm font-black text-cyan-900" />
              </div>
            ))}
          </div>
        </button>
        <button
          onClick={() => setFocus("distance")}
          className={`rounded-3xl border-2 p-4 text-right transition ${focus === "distance" ? "border-indigo-400 bg-indigo-50 shadow" : "border-slate-200 bg-white opacity-75"}`}
        >
          <div className="text-sm font-bold text-indigo-700"><Rich text={CORE_IDEA_20.secondLabel} /></div>
          <div className="mt-1 text-lg font-black text-slate-900"><Rich text={CORE_IDEA_20.secondQuestion} /></div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {[CORE_IDEA_20.near, CORE_IDEA_20.far].map((item) => (
              <div key={item} className="rounded-2xl bg-white px-3 py-2 text-center shadow-sm">
                <Rich text={item} className="text-sm font-black text-indigo-900" />
              </div>
            ))}
          </div>
        </button>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-bold text-slate-700">
        <Rich text={CORE_IDEA_20.result} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 2–6. النظام المرئي ذو المناطق الأربع
// ============================================================
const SIGNAL_COLORS = {
  emerald: { card: "border-emerald-300 bg-emerald-50", chip: "bg-emerald-600 text-white", text: "text-emerald-800" },
  sky: { card: "border-sky-300 bg-sky-50", chip: "bg-sky-600 text-white", text: "text-sky-800" },
  amber: { card: "border-amber-300 bg-amber-50", chip: "bg-amber-500 text-white", text: "text-amber-900" },
  rose: { card: "border-rose-300 bg-rose-50", chip: "bg-rose-600 text-white", text: "text-rose-800" },
};

function MagicSystemBoard() {
  const [active, setActive] = useState(0);
  const cur = MAGIC_SYSTEM_20[active];
  const c = SIGNAL_COLORS[cur.color];
  return (
    <LabPanel emoji="⭐" label="THE FOUR-ZONE MAP" ar="النظام السحري" seq="l20-magic-map">
      <div className="grid gap-2 sm:grid-cols-2">
        {MAGIC_SYSTEM_20.map((item, i) => {
          const color = SIGNAL_COLORS[item.color];
          return (
            <button
              key={item.word}
              onClick={() => setActive(i)}
              dir="ltr"
              className={`ltr-row rounded-3xl border-2 p-4 text-left transition ${color.card} ${active === i ? "scale-[1.015] shadow-md ring-2 ring-white" : "opacity-80 hover:opacity-100"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <En className={`rounded-xl px-3 py-1.5 text-xl font-black ${color.chip}`}>{item.word}</En>
                <span dir="rtl" className="text-sm font-bold text-slate-600">{item.ar}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <En className="rounded-lg bg-white px-2 py-1 text-xs font-black text-slate-700">{item.number}</En>
                <En className="rounded-lg bg-white px-2 py-1 text-xs font-black text-slate-700">{item.distance}</En>
              </div>
            </button>
          );
        })}
      </div>
      <div className={`mt-3 rounded-3xl border-2 bg-white p-4 text-center ${c.card}`}>
        <div className="text-xs font-bold text-slate-500">الإشارة التي يقرأها الرادار الآن:</div>
        <div dir="ltr" className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <En className={`rounded-xl px-4 py-2 text-xl font-black ${c.chip}`}>{cur.word}</En>
          <En className="text-lg font-black text-slate-400">=</En>
          <span dir="rtl" className={`font-bold ${c.text}`}>{cur.ar}</span>
        </div>
      </div>
    </LabPanel>
  );
}

function MemoryCards() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🧠" label="MEMORY CODE" ar="اضغط كل بطاقة لتثبيت معنى الكلمة" seq="l20-memory">
      <div className="grid gap-2 sm:grid-cols-2">
        {MEMORY_20.map((item, i) => {
          const on = open.has(i);
          const color = SIGNAL_COLORS[MAGIC_SYSTEM_20[i].color];
          return (
            <button
              key={item.word}
              onClick={() => setOpen((s) => { const next = new Set(s); next.has(i) ? next.delete(i) : next.add(i); return next; })}
              className={`rounded-3xl border-2 p-4 text-center transition ${on ? `${color.card} shadow` : "border-slate-200 bg-white hover:border-cyan-200"}`}
            >
              <En className={`rounded-xl px-4 py-2 text-xl font-black ${on ? color.chip : "bg-slate-100 text-slate-700"}`}>{item.word}</En>
              <div className={`mt-3 text-base font-bold transition ${on ? color.text : "text-slate-300"}`}>
                {on ? item.ar : "اضغط لتكشف المعنى"}
              </div>
            </button>
          );
        })}
      </div>
    </LabPanel>
  );
}

function NearFarScene() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🔭" label="NEAR / FAR SCENE" ar="مشهد القريب والبعيد" seq="l20-near-far-scene">
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SIMPLE_EXAMPLES_20.map((item, i) => (
          <button
            key={item.en}
            onClick={() => setActive(i)}
            className={`rounded-2xl border-2 p-2 text-center transition ${active === i ? "border-cyan-500 bg-cyan-700 text-white shadow" : "border-slate-200 bg-white text-slate-500"}`}
          >
            <span className="text-xl">{i < 2 ? "📘" : "📚"}</span>
            <div className="mt-1 text-[11px] font-bold">{i === 0 || i === 2 ? "قريب" : "بعيد"}</div>
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {SIMPLE_EXAMPLES_20.map((item, i) => (
          <div key={item.en} className={`rounded-3xl border-2 p-4 transition ${active === i ? "border-cyan-400 bg-white shadow" : "border-slate-100 bg-white/70 opacity-65"}`}>
            <div className="text-sm font-bold text-slate-600"><Rich text={item.lead} /></div>
            <En className="mt-2 block rounded-xl bg-cyan-50 px-3 py-2 text-lg font-black text-cyan-950">{item.en}</En>
            <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={item.ar} /></div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

function BasicTable() {
  return (
    <LabPanel emoji="🔥" label="BASIC CONTROL TABLE" ar="الجدول الأساسي" seq="l20-basic-table">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row overflow-hidden rounded-3xl border-2 border-cyan-200 bg-white">
        <div className="grid grid-cols-2 gap-px bg-cyan-100">
          <div className="bg-cyan-700 px-3 py-2 text-center"><En className="text-xs font-black uppercase tracking-wide text-white">Demonstrative</En></div>
          <div className="bg-cyan-700 px-3 py-2 text-center"><En className="text-xs font-black uppercase tracking-wide text-white">Signal</En></div>
          {BASIC_TABLE_20.map((row, i) => (
            <div key={row.word} className="contents">
              <div className="bg-white px-3 py-3 text-center"><En className={`text-lg font-black ${SIGNAL_COLORS[MAGIC_SYSTEM_20[i].color].text}`}>{row.word}</En></div>
              <div className="bg-slate-50 px-3 py-3 text-center"><En className="text-base font-black text-slate-700">{row.formula}</En></div>
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

function DemonstrativeRadar() {
  const [number, setNumber] = useState<"singular" | "plural">("singular");
  const [distance, setDistance] = useState<"near" | "far">("near");
  const index = number === "singular" ? (distance === "near" ? 0 : 1) : distance === "near" ? 2 : 3;
  const found = MAGIC_SYSTEM_20[index];
  const color = SIGNAL_COLORS[found.color];
  const noun = number === "singular" ? "book" : "books";
  return (
    <LabPanel emoji="📡" label="DEMONSTRATIVE RADAR" ar="حدد العدد ثم المسافة" seq="l20-this-radar">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
          <div className="text-xs font-bold text-slate-500">1. العدد</div>
          <div className="mt-2 flex justify-center gap-2">
            <button onClick={() => setNumber("singular")} className={`rounded-xl px-3 py-1.5 text-sm font-bold ${number === "singular" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-600"}`}>مفرد</button>
            <button onClick={() => setNumber("plural")} className={`rounded-xl px-3 py-1.5 text-sm font-bold ${number === "plural" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-600"}`}>جمع</button>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
          <div className="text-xs font-bold text-slate-500">2. المسافة</div>
          <div className="mt-2 flex justify-center gap-2">
            <button onClick={() => setDistance("near")} className={`rounded-xl px-3 py-1.5 text-sm font-bold ${distance === "near" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>قريب</button>
            <button onClick={() => setDistance("far")} className={`rounded-xl px-3 py-1.5 text-sm font-bold ${distance === "far" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}>بعيد</button>
          </div>
        </div>
      </div>
      <div dir="ltr" className={`mt-3 flex flex-wrap items-center justify-center gap-2 rounded-3xl border-2 bg-white p-4 ${color.card}`}>
        <En className={`rounded-xl px-4 py-2 text-xl font-black ${color.chip}`}>{found.word}</En>
        <En className="text-xl font-black text-slate-400">+</En>
        <En className="rounded-xl bg-white px-4 py-2 text-xl font-black text-slate-900">{noun}</En>
      </div>
    </LabPanel>
  );
}

function TheseMachine() {
  const [item, setItem] = useState(0);
  const pairs = [
    { singular: "This book is...", plural: "These books are..." },
    { singular: "This apple.", plural: "These apples." },
    { singular: "This child.", plural: "These children." },
  ];
  const cur = pairs[item];
  return (
    <LabPanel emoji="⚙️" label="SINGULAR ↔ PLURAL TRANSFORMATION MACHINE" ar="راقب ما الذي يتغير مع الاسم" seq="l20-these-machine">
      <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-2">
        {pairs.map((pair, i) => (
          <button key={pair.singular} onClick={() => setItem(i)} className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${item === i ? "border-amber-500 bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
            <En>{pair.singular}</En>
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <En className="rounded-3xl border-2 border-cyan-200 bg-white px-4 py-4 text-center text-lg font-black text-cyan-900">{cur.singular}</En>
        <En className="text-center text-3xl font-black text-amber-500">→</En>
        <En className="rounded-3xl border-2 border-amber-300 bg-amber-50 px-4 py-4 text-center text-lg font-black text-amber-900">{cur.plural}</En>
      </div>
      <FormulaStrip items={THESE_20.transforms} tone="amber" />
    </LabPanel>
  );
}

function BeMachine() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🎚️" label="IS / ARE CONNECTION MACHINE" ar="اربط الإشارة بالفعل الصحيح" seq="l20-be-machine">
      <div className="grid gap-2 sm:grid-cols-2">
        {BE_CONNECTIONS_20.map((line, i) => {
          const [demo, verb] = line.split(" → ");
          const on = active === i;
          return (
            <button key={line} onClick={() => setActive(i)} dir="ltr" className={`ltr-row flex items-center justify-center gap-2 rounded-2xl border-2 p-3 transition ${on ? "border-cyan-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
              <En className={`rounded-lg px-3 py-1.5 text-lg font-black ${i < 2 ? "bg-sky-100 text-sky-900" : "bg-amber-100 text-amber-900"}`}>{demo}</En>
              <En className="text-lg font-black text-slate-400">→</En>
              <En className={`rounded-lg px-3 py-1.5 text-lg font-black ${on ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-400"}`}>{verb}</En>
            </button>
          );
        })}
      </div>
      <div dir="ltr" className="mt-3 rounded-2xl bg-white p-3 text-center">
        <En className="text-lg font-black text-cyan-950">{COMPLETE_SYSTEM_20[active]}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 11–20. الربط بالدروس السابقة
// ============================================================
function PluralBridge() {
  const [active, setActive] = useState(0);
  const row = PLURAL_CONNECTION_20.rows[active];
  return (
    <LabPanel emoji="🔁" label="SINGULAR ↔ PLURAL BRIDGE" ar="هذا هو السبب الذي جعلنا ندرس Plural Nouns قبل هذا الدرس" seq="l20-plural-bridge">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={PLURAL_CONNECTION_20.intro} /></div>
      <div className="mt-1 text-center text-sm font-bold text-slate-500"><Rich text={PLURAL_CONNECTION_20.look} /></div>
      <div dir="ltr" className="ltr-row mt-3 flex flex-wrap justify-center gap-1.5">
        {PLURAL_CONNECTION_20.rows.map((item, i) => (
          <button key={item.transform} onClick={() => setActive(i)} className={`rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${active === i ? "border-cyan-700 bg-cyan-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
            <En>{item.transform}</En>
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 grid gap-2 sm:grid-cols-3">
        <En className="rounded-2xl border-2 border-cyan-200 bg-white p-3 text-center text-base font-black text-cyan-900">{row.transform}</En>
        <En className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center text-base font-black text-sky-900">{row.singular}</En>
        <En className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center text-base font-black text-amber-900">{row.plural}</En>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-700"><Rich text={PLURAL_CONNECTION_20.closing} /></div>
        <div className="rounded-2xl bg-white p-3 text-center text-sm font-bold text-cyan-800"><Rich text={PLURAL_CONNECTION_20.closing2} /></div>
      </div>
    </LabPanel>
  );
}

function PeopleBoard() {
  return (
    <LabPanel emoji="👥" label="PEOPLE + THINGS" ar="يمكن أن تشير الكلمات إلى الأشياء والأشخاص" seq="l20-people">
      <div className="space-y-2 text-center text-base font-bold text-slate-700">
        <div><Rich text={PEOPLE_20.intro} /></div>
        <div><Rich text={PEOPLE_20.but} /></div>
        <div className="text-sm text-slate-500"><Rich text={PEOPLE_20.exampleLabel} /></div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {PEOPLE_20.singular.map((x) => <SourceLine key={x.en} en={x.en} ar={x.ar} tone="focus" />)}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={PEOPLE_20.pluralLead} /></div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {PEOPLE_20.plural.map((x) => <SourceLine key={x.en} en={x.en} ar={x.ar} tone="good" />)}
      </div>
    </LabPanel>
  );
}

function NounPronounBoard() {
  const [mode, setMode] = useState<"noun" | "pronoun">("noun");
  return (
    <LabPanel emoji="🏷️" label="NAME / PRONOUN SWITCH" ar="مع اسم أو من دون اسم" seq="l20-noun-pronoun">
      <div className="mb-3 flex justify-center gap-2">
        <button onClick={() => setMode("noun")} className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "noun" ? "bg-cyan-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}>مع اسم</button>
        <button onClick={() => setMode("pronoun")} className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "pronoun" ? "bg-indigo-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}>كضمير</button>
      </div>
      {mode === "noun" ? (
        <div>
          <div className="text-center text-base font-bold text-slate-700"><Rich text={NOUN_FORM_20.lead} /></div>
          <FormulaStrip items={NOUN_FORM_20.examples} />
          <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={NOUN_FORM_20.formulaLabel} /></div>
          <div dir="ltr" className="mt-2 text-center"><En className="rounded-xl bg-cyan-700 px-4 py-2 text-lg font-black text-white">{NOUN_FORM_20.formula}</En></div>
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4 text-center">
          <En className="text-lg font-black text-indigo-900">What is this?</En>
          <div className="mt-2 text-sm font-bold text-slate-500">لا نحتاج إلى ذكر الاسم بعد <En className="font-black text-indigo-800">this</En>.</div>
        </div>
      )}
    </LabPanel>
  );
}

function QuestionBuilder({ mode }: { mode: "pronoun" | "questions" }) {
  const [active, setActive] = useState(0);
  const pronounCards = PRONOUN_FORM_20.singular.concat(PRONOUN_FORM_20.plural);
  const questionCards = QUESTIONS_20.examples;
  return (
    <LabPanel emoji="❓" label="QUESTION BUILDER" ar="ابنِ السؤال الصحيح" seq={`l20-question-${mode}`}>
      {mode === "pronoun" ? (
        <>
          <div className="text-center text-base font-bold text-slate-700"><Rich text={PRONOUN_FORM_20.pluralLead} /></div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {pronounCards.map((item, i) => (
              <button key={item.q} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-indigo-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
                <En className="block text-left text-base font-black text-slate-900">{item.q}</En>
                <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={item.arQ} /></div>
              </button>
            ))}
          </div>
          <div className="mt-3 rounded-3xl border-2 border-white bg-white p-4 text-center">
            <En className="block text-xl font-black text-indigo-900">{pronounCards[active].a}</En>
            <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={pronounCards[active].arA} /></div>
          </div>
          <div className="mt-3 rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3">
            <div className="text-center text-sm font-bold text-indigo-700"><Rich text={PRONOUN_FORM_20.ruleTitle} /></div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-2"><FormulaStrip items={PRONOUN_FORM_20.singularRule} tone="cyan" /></div>
              <div className="rounded-xl bg-white p-2"><FormulaStrip items={PRONOUN_FORM_20.pluralRule} tone="amber" /></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center text-base font-bold text-slate-700"><Rich text={QUESTIONS_20.intro} /></div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {QUESTIONS_20.forms.map((item, i) => (
              <button key={item.en} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-cyan-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
                <div className="text-xs font-bold text-slate-500"><Rich text={item.ar} /></div>
                <En className="mt-1 block text-left text-lg font-black text-slate-900">{item.en}</En>
              </button>
            ))}
          </div>
          <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={QUESTIONS_20.examplesLabel} /></div>
          <div className="mt-2 rounded-3xl border-2 border-white bg-white p-4 text-center">
            <En className="block text-xl font-black text-cyan-950">{questionCards[active].q}</En>
            <En className="mt-2 block rounded-xl bg-cyan-50 px-3 py-2 text-lg font-black text-cyan-900">{questionCards[active].a}</En>
          </div>
        </>
      )}
    </LabPanel>
  );
}

function AnswerBridge() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🌉" label="ANSWER BRIDGE" ar="من اسم الإشارة إلى الضمير الصحيح" seq="l20-answer-bridge">
      <div className="grid gap-2 sm:grid-cols-2">
        {SHORT_ANSWERS_20.pairs.map((pair, i) => (
          <button key={pair.q} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-cyan-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
            <En className="block text-left text-base font-black text-slate-900">{pair.q}</En>
            <En className={`mt-2 block rounded-xl px-3 py-2 text-left text-base font-black ${active === i ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-500"}`}>{pair.a}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={SHORT_ANSWERS_20.notice} /></div>
      <div dir="ltr" className="ltr-row mt-2 grid gap-2 sm:grid-cols-2">
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3"><En className="text-base font-black text-sky-900">This / That</En><En className="text-lg font-black text-slate-400">→</En><En className="rounded-lg bg-sky-100 px-3 py-1 text-base font-black text-sky-900">It</En></div>
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white p-3"><En className="text-base font-black text-amber-900">These / Those</En><En className="text-lg font-black text-slate-400">→</En><En className="rounded-lg bg-amber-100 px-3 py-1 text-base font-black text-amber-900">They</En></div>
      </div>
    </LabPanel>
  );
}

function IQConnectionBoard() {
  return (
    <LabPanel emoji="🔥" label="IQ200 CONNECTION" ar="عدة دروس في جملة واحدة" seq="l20-iq-connection">
      <div dir="ltr" className="rounded-3xl border-2 border-white bg-white p-4 text-center">
        <En className="text-xl font-black text-cyan-950">{IQ200_CONNECTION_20.sentence}</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={IQ200_CONNECTION_20.here} /></div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {IQ200_CONNECTION_20.parts.map((part, i) => (
          <div key={part.en} className={`rounded-2xl border-2 bg-white p-3 text-center ${i === 0 ? "border-emerald-200" : i === 1 ? "border-sky-200" : i === 2 ? "border-violet-200" : "border-amber-200"}`}>
            <En className="block text-lg font-black text-slate-900">{part.en}</En>
            <div className="mt-1 text-xs font-bold text-slate-500"><Rich text={part.ar} /></div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-cyan-800"><Rich text={IQ200_CONNECTION_20.closing} /></div>
    </LabPanel>
  );
}

function PossessiveAdjectiveLab() {
  return (
    <LabPanel emoji="🔗" label="POSSESSION CONNECTION LAB" ar="Demonstrative + Possessive Adjective" seq="l20-poss-adj">
      <div className="grid gap-2 sm:grid-cols-2">
        {POSSESSIVE_ADJECTIVE_20.map((item, i) => (
          <div key={item.en} className={`rounded-3xl border-2 bg-white p-4 ${i < 2 ? "border-cyan-200" : "border-amber-200"}`}>
            <En className="block text-left text-lg font-black text-slate-900">{item.en}</En>
            <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={item.ar} /></div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

function PossessiveNounLab() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🔗" label="POSSESSION CONNECTION LAB" ar="Demonstrative + Possessive Noun" seq="l20-poss-noun">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={POSSESSIVE_NOUN_20.lead} /></div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {POSSESSIVE_NOUN_20.examples.map((item, i) => {
          const on = open.has(i);
          return (
            <button key={item.en} onClick={() => setOpen((s) => { const next = new Set(s); next.has(i) ? next.delete(i) : next.add(i); return next; })} className={`rounded-3xl border-2 p-4 text-right transition ${on ? "border-cyan-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
              <En className="block text-left text-lg font-black text-slate-900">{item.en}</En>
              <div className={`mt-2 text-sm font-bold transition ${on ? "text-cyan-800" : "text-slate-300"}`}>{on ? item.ar : "اضغط لإظهار المعنى"}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-cyan-800"><Rich text={POSSESSIVE_NOUN_20.closing} /></div>
    </LabPanel>
  );
}

function ThisTheseComparator() {
  return (
    <LabPanel emoji="⚖️" label="THIS vs THESE" ar="واحد أو أكثر من واحد؟" seq="l20-this-these">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={THIS_THESE_20.intro} /></div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center"><Rich text={THIS_THESE_20.rule1} className="text-lg font-black text-emerald-900" /></div>
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center"><Rich text={THIS_THESE_20.rule2} className="text-lg font-black text-amber-900" /></div>
      </div>
      <div className="mt-3 grid gap-2">
        {THIS_THESE_20.pairs.map((pair) => (
          <div key={pair[0]} dir="ltr" className="ltr-row grid gap-2 sm:grid-cols-2">
            <En className="rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center text-lg font-black text-emerald-900">{pair[0]}</En>
            <En className="rounded-2xl border-2 border-amber-200 bg-white p-3 text-center text-lg font-black text-amber-900">{pair[1]}</En>
          </div>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 grid gap-2 sm:grid-cols-2">
        {THIS_THESE_20.wrong.map((wrong) => <En key={wrong} className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center text-lg font-black text-rose-700 line-through decoration-rose-400">{wrong}</En>)}
      </div>
    </LabPanel>
  );
}

function ThatThoseComparator() {
  return (
    <LabPanel emoji="⚖️" label="THAT vs THOSE" ar="بعيد: مفرد أم جمع؟" seq="l20-that-those">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4 text-center"><Rich text={THAT_THOSE_20.rule1} className="text-lg font-black text-sky-900" /></div>
        <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center"><Rich text={THAT_THOSE_20.rule2} className="text-lg font-black text-rose-900" /></div>
      </div>
      <div className="mt-3 grid gap-2">
        {THAT_THOSE_20.pairs.map((pair) => (
          <div key={pair[0]} dir="ltr" className="ltr-row grid gap-2 sm:grid-cols-2">
            <En className="rounded-2xl border-2 border-sky-200 bg-white p-3 text-center text-lg font-black text-sky-900">{pair[0]}</En>
            <En className="rounded-2xl border-2 border-rose-200 bg-white p-3 text-center text-lg font-black text-rose-900">{pair[1]}</En>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

function FourZoneMap() {
  return (
    <LabPanel emoji="🗺️" label="THE FOUR-ZONE MAP" ar="قريب / بعيد × مفرد / جمع" seq="l20-four-zone-map">
      <div className="overflow-hidden rounded-3xl border-2 border-cyan-200 bg-white">
        <div className="grid grid-cols-3 gap-px bg-cyan-100 text-center text-sm font-black">
          <div className="bg-cyan-700 p-3 text-white"> </div>
          <div className="bg-cyan-700 p-3 text-white">قريب</div>
          <div className="bg-cyan-700 p-3 text-white">بعيد</div>
          <div className="bg-slate-50 p-3 text-slate-700">مفرد</div>
          <div dir="ltr" className="bg-emerald-50 p-3"><En className="text-lg font-black text-emerald-900">This</En></div>
          <div dir="ltr" className="bg-sky-50 p-3"><En className="text-lg font-black text-sky-900">That</En></div>
          <div className="bg-slate-50 p-3 text-slate-700">جمع</div>
          <div dir="ltr" className="bg-amber-50 p-3"><En className="text-lg font-black text-amber-900">These</En></div>
          <div dir="ltr" className="bg-rose-50 p-3"><En className="text-lg font-black text-rose-900">Those</En></div>
        </div>
      </div>
    </LabPanel>
  );
}

function DecisionEngine() {
  const [number, setNumber] = useState<"one" | "more">("one");
  const [distance, setDistance] = useState<"near" | "far">("near");
  const answer = number === "one" ? (distance === "near" ? "This" : "That") : distance === "near" ? "These" : "Those";
  return (
    <LabPanel emoji="🧭" label="TWO QUESTIONS DECISION ENGINE" ar="محرك السؤالين" seq="l20-decision-engine">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={TWO_QUESTION_ENGINE_20.lead} /></div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-cyan-200 bg-white p-4">
          <div className="text-sm font-bold text-cyan-700"><Rich text={TWO_QUESTION_ENGINE_20.q1} /></div>
          <div className="mt-1 text-lg font-black text-slate-900"><Rich text={TWO_QUESTION_ENGINE_20.q1Text} /></div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => setNumber("one")} className={`rounded-xl px-3 py-2 text-sm font-bold ${number === "one" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-600"}`}><Rich text={TWO_QUESTION_ENGINE_20.q1Answers[0]} /></button>
            <button onClick={() => setNumber("more")} className={`rounded-xl px-3 py-2 text-sm font-bold ${number === "more" ? "bg-cyan-700 text-white" : "bg-slate-100 text-slate-600"}`}><Rich text={TWO_QUESTION_ENGINE_20.q1Answers[1]} /></button>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
          <div className="text-sm font-bold text-indigo-700"><Rich text={TWO_QUESTION_ENGINE_20.q2} /></div>
          <div className="mt-1 text-lg font-black text-slate-900"><Rich text={TWO_QUESTION_ENGINE_20.q2Text} /></div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => setDistance("near")} className={`rounded-xl px-3 py-2 text-sm font-bold ${distance === "near" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}><Rich text={TWO_QUESTION_ENGINE_20.q2Answers[0]} /></button>
            <button onClick={() => setDistance("far")} className={`rounded-xl px-3 py-2 text-sm font-bold ${distance === "far" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}><Rich text={TWO_QUESTION_ENGINE_20.q2Answers[1]} /></button>
          </div>
        </div>
      </div>
      <div dir="ltr" className="mt-3 rounded-3xl border-2 border-cyan-300 bg-white p-4 text-center shadow-sm">
        <En className="text-xs font-black uppercase tracking-wide text-slate-400">RESULT</En>
        <En className="mt-2 block text-3xl font-black text-cyan-800">{answer}</En>
      </div>
    </LabPanel>
  );
}

function IQDecisionCards() {
  const [active, setActive] = useState(0);
  const cur = IQ200_EXAMPLE_20[active];
  return (
    <LabPanel emoji="🚀" label="IQ200 DECISION CHALLENGES" ar="طبّق السؤالين على موقف حقيقي" seq="l20-iq-decisions">
      <div className="grid gap-2 sm:grid-cols-2">
        {IQ200_EXAMPLE_20.map((item, i) => (
          <button key={item.story} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-fuchsia-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
            <div className="text-sm font-bold text-slate-700"><Rich text={item.story} /></div>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-3xl border-2 border-white bg-white p-4">
        <div className="space-y-1 text-center text-sm font-bold text-slate-600">
          {cur.checks.map((check) => <div key={check}><Rich text={check} /></div>)}
        </div>
        <En className="mt-3 block rounded-2xl bg-fuchsia-600 px-4 py-3 text-center text-xl font-black text-white">{cur.answer}</En>
      </div>
    </LabPanel>
  );
}

function ContextLab() {
  const [open, setOpen] = useState(false);
  return (
    <LabPanel emoji="🛰️" label="CONTEXT / DISTANCE LAB" ar="البعد في المكان أو في السياق" seq="l20-context-lab">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={CONTEXT_DISTANCE_20.intro} /></div>
      <div className="mt-2 rounded-2xl bg-white p-3 text-center"><Rich text={CONTEXT_DISTANCE_20.text} className="font-bold text-slate-700" /></div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={CONTEXT_DISTANCE_20.exampleLabel} /></div>
      <En className="mt-2 block rounded-2xl border-2 border-indigo-200 bg-white p-3 text-center text-xl font-black text-indigo-900">{CONTEXT_DISTANCE_20.example}</En>
      <div className="mt-1 text-center text-sm font-bold text-slate-500"><Rich text={CONTEXT_DISTANCE_20.translation} /></div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-bold text-slate-600"><Rich text={CONTEXT_DISTANCE_20.note} /></div>
      <button onClick={() => setOpen((x) => !x)} className={`mt-3 w-full rounded-2xl border-2 p-3 text-center transition ${open ? "border-emerald-300 bg-emerald-50" : "border-amber-300 bg-amber-50"}`}>
        <div className="text-sm font-bold text-slate-600"><Rich text={CONTEXT_DISTANCE_20.therefore} /></div>
        <En className={`mt-2 block text-lg font-black ${open ? "text-emerald-800" : "text-rose-700 line-through decoration-rose-400"}`}>{open ? CONTEXT_DISTANCE_20.correctRule : CONTEXT_DISTANCE_20.wrongRule}</En>
        <div className="mt-2 text-xs font-bold text-slate-500"><Rich text={open ? CONTEXT_DISTANCE_20.but : "اضغط لتصحيح الخريطة"} /></div>
      </button>
    </LabPanel>
  );
}

function TimeLab() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🕰️" label="TIME CONNECTION" ar="This و That يمكن أن يشيرا إلى الزمن" seq="l20-time-lab">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={TIME_CONNECTION_20.lead} /></div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {TIME_CONNECTION_20.pairs.map((pair, i) => (
          <button key={pair.en} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-center transition ${active === i ? "border-cyan-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
            <En className={`text-lg font-black ${i < 3 ? "text-cyan-900" : "text-indigo-900"}`}>{pair.en}</En>
            <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={pair.ar} /></div>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-600"><Rich text={TIME_CONNECTION_20.closing} /></div>
    </LabPanel>
  );
}

function NegativeMachine() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🚫" label="NEGATIVE CONNECTION MACHINE" ar="الإشارة تحدد is أو are حتى في النفي" seq="l20-negative-machine">
      <div className="text-center text-base font-bold text-slate-700"><Rich text={NEGATIVE_20.lead} /></div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {NEGATIVE_20.examples.map((item, i) => (
          <button key={item.en} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-rose-300 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
            <En className="block text-left text-base font-black text-slate-900">{item.en}</En>
            <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={item.ar} /></div>
          </button>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={NEGATIVE_20.notice} /></div>
      <FormulaStrip items={NEGATIVE_20.connections} tone="rose" />
    </LabPanel>
  );
}

function WhoseLab() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🕵️" label="POSSESSION + WHOSE LAB" ar="لمن هذا أو هؤلاء؟" seq="l20-whose-lab">
      <div className="grid gap-2 sm:grid-cols-2">
        {WHOSE_20.questions.map((question, i) => (
          <button key={question} onClick={() => setActive(i)} className={`rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-cyan-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
            <En className="block text-left text-lg font-black text-slate-900">{question}</En>
            <div className="mt-1 text-sm font-bold text-slate-500"><Rich text={WHOSE_20.meanings[i]} /></div>
          </button>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={WHOSE_20.examplesLabel} /></div>
      <div className="mt-2 rounded-3xl border-2 border-white bg-white p-4 text-center">
        <En className="block text-xl font-black text-cyan-950">{WHOSE_20.examples[active].q}</En>
        <En className="mt-2 block rounded-xl bg-cyan-50 px-3 py-2 text-lg font-black text-cyan-900">{WHOSE_20.examples[active].a}</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500"><Rich text={WHOSE_20.closing} /></div>
      <FormulaStrip items={WHOSE_20.connections} tone="amber" />
    </LabPanel>
  );
}

// ============================================================
// 30–38. التحديات التفاعلية
// ============================================================
type CorrectionItem = { readonly n: string; readonly wrong: string; readonly correct: string };

function CorrectionLab({
  items,
  accent = "bg-cyan-700",
  label = "اكشف الحل",
}: {
  items: readonly CorrectionItem[];
  accent?: string;
  label?: string;
}) {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
  const score = items.reduce((sum, item, i) => sum + (checked.has(i) && normalize(typed[i] ?? "") === normalize(item.correct) ? 1 : 0), 0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const done = checked.has(i);
        const right = done && normalize(typed[i] ?? "") === normalize(item.correct);
        const shown = revealed.has(i);
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{item.n}</span>
              <En className="min-w-0 flex-1 text-left text-base font-extrabold text-rose-700 line-through decoration-rose-300">{item.wrong}</En>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
              <input
                dir="ltr"
                value={typed[i] ?? ""}
                onChange={(event) => setTyped((state) => ({ ...state, [i]: event.target.value }))}
                placeholder="اكتب الجملة الصحيحة..."
                className="font-en w-full min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none focus:border-cyan-400 sm:max-w-md"
              />
              <button onClick={() => setChecked((s) => new Set(s).add(i))} className={`rounded-xl px-3 py-2 text-sm font-bold text-white transition hover:brightness-110 ${accent}`}>تحقق</button>
              <button onClick={() => setRevealed((s) => new Set(s).add(i))} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-cyan-300">{label}</button>
            </div>
            {done && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓ أحسنت!" : "✕ حاول مجددًا أو اكشف الحل."}</div>}
            {shown && <div dir="ltr" className="ltr-row mt-3 pr-11"><En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">{item.correct} ✅</En></div>}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50 p-3 text-center text-sm font-bold text-cyan-800">النتيجة: {score} / {items.length}</div>
    </div>
  );
}

function DetectiveEx() {
  return (
    <div className="space-y-4" data-en-seq="l20-detective">
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4 text-center text-base font-bold text-cyan-900"><Rich text={GRAMMAR_DETECTIVE_20.intro} /></div>
      <CorrectionLab items={GRAMMAR_DETECTIVE_20.sentences} label={GRAMMAR_DETECTIVE_20.solutionLabel} />
    </div>
  );
}

function Challenge1Ex() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = CHALLENGE1_20.questions.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq="l20-challenge1">
      {CHALLENGE1_20.questions.map((item, i) => {
        const choice = picked[i];
        const complete = choice !== undefined;
        const right = choice === item.answer;
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${complete ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-700 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {item.options.map((option, oi) => {
                const selected = choice === oi;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-cyan-400";
                return <button key={option} onClick={() => setPicked((state) => ({ ...state, [i]: oi }))} data-en-opt={oi === 0 ? "A" : "B"} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}>{option}</button>;
              })}
            </div>
            {complete && <div dir="ltr" className={`ltr-row mt-2 pr-11 text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}><En>{right ? "✓ صحيح!" : `✕ الصحيح: ${item.options[item.answer]}`}</En></div>}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50 p-3 text-center text-sm font-bold text-cyan-800">النتيجة: {score} / {CHALLENGE1_20.questions.length}</div>
    </div>
  );
}

function Challenge2Ex() {
  const [picked, setPicked] = useState<Record<number, "is" | "are">>({});
  const score = CHALLENGE2_20.questions.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq="l20-challenge2">
      {CHALLENGE2_20.questions.map((item, i) => {
        const choice = picked[i];
        const right = choice === item.answer;
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${choice ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex gap-2 pr-11">
              {(["is", "are"] as const).map((option) => {
                const selected = choice === option;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
                return <button key={option} onClick={() => setPicked((state) => ({ ...state, [i]: option }))} className={`font-en rounded-xl border-2 px-5 py-2 text-base font-black transition ${cls}`}>{option}</button>;
              })}
            </div>
            {choice && !right && <div dir="ltr" className="ltr-row mt-2 pr-11"><En className="text-sm font-black text-rose-700">الصحيح: {item.answer}</En></div>}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">النتيجة: {score} / {CHALLENGE2_20.questions.length}</div>
    </div>
  );
}

function IQ200Ex() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
  const score = IQ200_CHALLENGE_20.items.reduce((sum, item, i) => sum + (checked.has(i) && normalize(typed[i] ?? "") === normalize(item.answer) ? 1 : 0), 0);
  return (
    <div className="space-y-4" data-en-seq="l20-iq200-challenge">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4">
        <div className="text-center text-base font-bold text-slate-700"><Rich text={IQ200_CHALLENGE_20.intro} /></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {IQ200_CHALLENGE_20.given.map((item) => <div key={item} className="rounded-2xl bg-white p-3 text-sm font-bold text-slate-700"><Rich text={item} /></div>)}
        </div>
        <div className="mt-3 text-center text-base font-black text-fuchsia-800"><Rich text={IQ200_CHALLENGE_20.task} /></div>
      </div>
      <div className="space-y-3">
        {IQ200_CHALLENGE_20.items.map((item, i) => {
          const done = checked.has(i);
          const right = done && normalize(typed[i] ?? "") === normalize(item.answer);
          const shown = revealed.has(i);
          return (
            <div key={item.n} className={`rounded-3xl border-2 p-4 ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">{item.n}</span>
                <En className="text-left text-lg font-black text-slate-900">{item.blank}</En>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 pr-11">
                <input dir="ltr" value={typed[i] ?? ""} onChange={(event) => setTyped((state) => ({ ...state, [i]: event.target.value }))} placeholder="اكتب الجملة..." className="font-en w-full min-w-0 flex-1 rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-fuchsia-400 sm:max-w-md" />
                <button onClick={() => setChecked((s) => new Set(s).add(i))} className="rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-bold text-white">تحقق</button>
                <button onClick={() => setRevealed((s) => new Set(s).add(i))} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">اكشف</button>
              </div>
              {shown && <div dir="ltr" className="ltr-row mt-3 pr-11"><En className="rounded-xl bg-emerald-100 px-3 py-2 text-base font-black text-emerald-800">{item.answer}</En></div>}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-fuchsia-100 bg-fuchsia-50 p-3 text-center text-sm font-bold text-fuchsia-800">النتيجة: {score} / {IQ200_CHALLENGE_20.items.length}</div>
    </div>
  );
}

function IQ200BEx() {
  return (
    <div className="space-y-4" data-en-seq="l20-iq200-challenge2">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center text-base font-bold text-amber-900"><Rich text={IQ200_CHALLENGE2_20.lead} /></div>
      <CorrectionLab items={IQ200_CHALLENGE2_20.sentences} accent="bg-amber-600" label="اكشف الحل" />
    </div>
  );
}

function FinalBossEx() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4" data-en-seq="l20-final-boss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-base font-black text-amber-900">🏆 FINAL BOSS</div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600"><Rich text={FINAL_BOSS_20.readLabel} /></div>
        <div className="mt-3 grid gap-2">
          {FINAL_BOSS_20.dialogue.map((line, i) => {
            const maya = line.speaker === "Maya";
            return (
              <div key={`${line.speaker}-${i}`} className={`flex ${maya ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[90%] rounded-2xl border-2 px-4 py-3 ${maya ? "border-sky-200 bg-sky-50" : "border-emerald-200 bg-emerald-50"}`}>
                  <div dir="ltr" className="mb-1 text-left text-xs font-black text-slate-500"><En>{line.speaker}</En></div>
                  <En className="block text-left text-base font-black text-slate-900">{line.en}</En>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
        <div className="text-center text-base font-bold text-indigo-800"><Rich text={FINAL_BOSS_20.task} /></div>
        <div className="mt-3 grid gap-2">
          {FINAL_BOSS_20.questions.map((item, i) => {
            const shown = open.has(i);
            const focusItems = "focusLines" in item ? item.focusLines : [item.focus ?? ""];
            return (
              <div key={item.n} className={`rounded-2xl border-2 p-3 transition ${shown ? "border-indigo-300 bg-indigo-50/50" : "border-slate-200 bg-slate-50"}`}>
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">{item.n}</span>
                  <div className="min-w-0 flex-1">
                    <Rich text={item.q} className="block text-base font-bold text-slate-800" />
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {focusItems.map((focus) => focus === "و" || focus === "ولم نقل:" ? <Rich key={focus} text={focus} className="text-sm font-bold text-slate-500" /> : <En key={focus} className="rounded-lg bg-white px-2 py-1 text-sm font-black text-indigo-900">{focus}</En>)}
                      {"after" in item && item.after && <Rich text={item.after} className="text-sm font-bold text-slate-700" />}
                    </div>
                    {shown && <div className="mt-2 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-2.5"><Rich text={item.a} className="text-sm font-bold text-emerald-900" /></div>}
                  </div>
                  <button onClick={() => setOpen((s) => { const next = new Set(s); next.has(i) ? next.delete(i) : next.add(i); return next; })} className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition ${shown ? "border-2 border-indigo-300 bg-white text-indigo-700" : "bg-indigo-600 text-white"}`}>{shown ? "إخفاء" : "اكشف"}</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SpeedGameEx() {
  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const place = (zone: string) => {
    if (!selected) return;
    setPlaced((current) => {
      const next = { ...current };
      Object.keys(next).forEach((key) => { if (next[key] === selected) delete next[key]; });
      next[zone] = selected;
      return next;
    });
    setSelected(null);
  };
  const score = SPEED_GAME_20.zones.reduce((sum, zone) => sum + (placed[zone.id] === zone.answer ? 1 : 0), 0);
  return (
    <div className="space-y-4" data-en-seq="l20-speed-game">
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4 text-center">
        <div className="text-base font-bold text-slate-700"><Rich text={SPEED_GAME_20.intro} /></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {SPEED_GAME_20.zones.map((zone) => <div key={zone.id} className="rounded-2xl bg-white px-3 py-2 text-sm font-bold text-slate-700">{zone.emoji} <Rich text={zone.ar} /></div>)}
        </div>
        <div className="mt-3 text-sm font-black text-cyan-800"><Rich text={SPEED_GAME_20.task} /></div>
      </div>
      <div dir="ltr" className="ltr-row flex flex-wrap justify-center gap-2">
        {SPEED_GAME_20.words.map((word) => {
          const used = Object.values(placed).includes(word);
          return <button key={word} onClick={() => setSelected(word)} disabled={used} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${selected === word ? "border-transparent bg-cyan-700 text-white" : used ? "border-slate-100 bg-slate-50 text-slate-300" : "border-cyan-200 bg-white text-cyan-900 hover:border-cyan-500"}`}>{word}</button>;
        })}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {SPEED_GAME_20.zones.map((zone) => {
          const word = placed[zone.id];
          const right = word === zone.answer;
          return (
            <button key={zone.id} onClick={() => place(zone.id)} className={`min-h-28 rounded-3xl border-2 p-4 text-center transition ${word ? (right ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white hover:border-cyan-400"}`}>
              <div className="text-xl">{zone.emoji}</div>
              <div className="mt-1 text-sm font-bold text-slate-600"><Rich text={zone.ar} /></div>
              <div dir="ltr" className="mt-3"><En className={`rounded-xl px-4 py-2 text-xl font-black ${word ? (right ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-slate-100 text-slate-300"}`}>{word ?? "???"}</En></div>
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50 p-3 text-center text-sm font-bold text-cyan-800">النتيجة: {score} / {SPEED_GAME_20.zones.length}</div>
      <button onClick={() => { setPlaced({}); setSelected(null); }} className="w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">↺ العب مجددًا</button>
    </div>
  );
}

function GoldenTestEx() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const fields = [...GOLDEN_TEST_20.rules, ...GOLDEN_TEST_20.verbs];
  const score = fields.reduce((sum, item, i) => sum + (answers[String(i)]?.trim().toLowerCase() === item.answer.toLowerCase() ? 1 : 0), 0);
  const reset = () => { setAnswers({}); setChecked(false); setRevealed(false); };
  return (
    <div className="space-y-4" data-en-seq="l20-golden-test">
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
        <div className="text-base font-bold text-amber-900"><Rich text={GOLDEN_TEST_20.intro} /></div>
        <div className="mt-1 text-sm font-bold text-slate-600"><Rich text={GOLDEN_TEST_20.task} /></div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {GOLDEN_TEST_20.rules.map((item, i) => <MemoryField key={item.stem} index={String(i)} stem={item.stem} answer={item.answer} answers={answers} setAnswers={setAnswers} checked={checked} revealed={revealed} />)}
      </div>
      <div className="rounded-2xl border-2 border-cyan-100 bg-cyan-50 p-3 text-center text-sm font-bold text-cyan-900"><Rich text={GOLDEN_TEST_20.then} /></div>
      <div className="grid gap-2 sm:grid-cols-2">
        {GOLDEN_TEST_20.verbs.map((item, i) => <MemoryField key={item.stem} index={String(i + GOLDEN_TEST_20.rules.length)} stem={item.stem} answer={item.answer} answers={answers} setAnswers={setAnswers} checked={checked} revealed={revealed} />)}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={() => setChecked(true)} className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-bold text-white">تحقق من الذاكرة</button>
        <button onClick={() => setRevealed(true)} className="rounded-xl border-2 border-amber-300 bg-white px-4 py-2 text-sm font-bold text-amber-800">اكشف الإجابات</button>
        <button onClick={reset} className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600">↺ إعادة</button>
      </div>
      {(checked || revealed) && <div className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-3 text-center text-sm font-bold text-amber-900">النتيجة: {score} / {fields.length}</div>}
    </div>
  );
}

function MemoryField({
  index,
  stem,
  answer,
  answers,
  setAnswers,
  checked,
  revealed,
}: {
  index: string;
  stem: string;
  answer: string;
  answers: Record<string, string>;
  setAnswers: (next: Record<string, string>) => void;
  checked: boolean;
  revealed: boolean;
}) {
  const entered = answers[index] ?? "";
  const right = entered.trim().toLowerCase() === answer.toLowerCase();
  return (
    <div className={`rounded-2xl border-2 p-3 ${checked ? (right ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white"}`}>
      <En className="block text-left text-base font-black text-slate-900">{stem}</En>
      <input dir="ltr" value={entered} onChange={(event) => setAnswers({ ...answers, [index]: event.target.value })} placeholder="..." className="font-en mt-2 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-amber-400" />
      {revealed && <En className="mt-2 block rounded-lg bg-emerald-100 px-3 py-1.5 text-left text-sm font-black text-emerald-800">{answer}</En>}
    </div>
  );
}

function SentenceBuilderEx() {
  const [built, setBuilt] = useState<Record<number, string[]>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const resetOne = (i: number) => setBuilt((state) => ({ ...state, [i]: [] }));
  return (
    <div className="space-y-4" data-en-seq="l20-sentence-builder">
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4 text-center text-base font-bold text-cyan-900"><Rich text={SENTENCE_BUILDER_20.task} /></div>
      {SENTENCE_BUILDER_20.groups.map((group, i) => {
        const verb = group.answer.includes(" are ") ? "are" : "is";
        const pool = [group.tokens[1], verb, group.tokens[0], group.tokens[2]];
        const chosen = built[i] ?? [];
        const target = group.answer.replace(/\.$/, "");
        const right = chosen.join(" ") === target;
        const done = checked.has(i);
        return (
          <div key={group.n} className={`rounded-3xl border-2 p-4 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-700 text-sm font-bold text-white">{group.n}</span>
              <div className="min-w-0 flex-1">
                <div dir="ltr" className="ltr-row"><En className="block text-left text-base font-black text-slate-700">{group.tokens.join(" + ")}</En></div>
                <div dir="ltr" className="ltr-row mt-3 min-h-12 rounded-2xl border-2 border-dashed border-cyan-200 bg-cyan-50 p-2">
                  {chosen.length ? <En className="text-left text-lg font-black text-cyan-950">{chosen.join(" ")}</En> : <En className="text-slate-300">Build your sentence...</En>}
                </div>
              </div>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {pool.map((token, ti) => {
                const used = chosen.includes(token);
                return <button key={`${token}-${ti}`} disabled={used} onClick={() => setBuilt((state) => ({ ...state, [i]: [...(state[i] ?? []), token] }))} className={`font-en rounded-xl border-2 px-3 py-2 text-sm font-black transition ${used ? "border-slate-100 bg-slate-50 text-slate-300" : "border-cyan-200 bg-white text-cyan-900 hover:border-cyan-500"}`}>{token}</button>;
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pr-11">
              <button onClick={() => setChecked((s) => new Set(s).add(i))} className="rounded-xl bg-cyan-700 px-3 py-2 text-sm font-bold text-white">تحقق من الجملة</button>
              <button onClick={() => resetOne(i)} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">↺ امسح</button>
              {done && <button onClick={() => setBuilt((state) => ({ ...state, [i]: target.split(" ") }))} className="rounded-xl border-2 border-emerald-300 bg-white px-3 py-2 text-sm font-bold text-emerald-700">اكشف النموذج</button>}
            </div>
            {done && <div dir="ltr" className={`ltr-row mt-3 pr-11 ${right ? "text-emerald-700" : "text-rose-700"}`}><En className="text-base font-black">{right ? "✓ Correct!" : `Model: ${group.answer}`}</En></div>}
          </div>
        );
      })}
    </div>
  );
}

function ExerciseView({ exercise }: { exercise: Exercise20 }) {
  switch (exercise.type) {
    case "detective": return <DetectiveEx />;
    case "challenge1": return <Challenge1Ex />;
    case "challenge2": return <Challenge2Ex />;
    case "iq200": return <IQ200Ex />;
    case "iq200b": return <IQ200BEx />;
    case "finalBoss": return <FinalBossEx />;
    case "speed": return <SpeedGameEx />;
    case "golden": return <GoldenTestEx />;
    case "builder": return <SentenceBuilderEx />;
  }
}

function BlockView({ block }: { block: Block20 }) {
  switch (block.type) {
    case "text": return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english": return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "mixed": return <MixedLine text={block.text} />;
    case "note": return <Note emoji={block.emoji} text={block.text} />;
    case "formulaStrip": return <FormulaStrip items={block.items} />;
    case "coreIdea": return <CoreIdeaBoard />;
    case "magicSystem": return <MagicSystemBoard />;
    case "memoryCards": return <MemoryCards />;
    case "nearFarScene": return <NearFarScene />;
    case "basicTable": return <BasicTable />;
    case "thisRadar": return <DemonstrativeRadar />;
    case "theseMachine": return <TheseMachine />;
    case "beMachine": return <BeMachine />;
    case "pluralBridge": return <PluralBridge />;
    case "peopleBoard": return <PeopleBoard />;
    case "nounPronounBoard": return <NounPronounBoard />;
    case "questionBuilder": return <QuestionBuilder mode={block.mode} />;
    case "answerBridge": return <AnswerBridge />;
    case "iqConnection": return <IQConnectionBoard />;
    case "possAdjLab": return <PossessiveAdjectiveLab />;
    case "possNounLab": return <PossessiveNounLab />;
    case "thisTheseComparator": return <ThisTheseComparator />;
    case "thatThoseComparator": return <ThatThoseComparator />;
    case "fourZoneMap": return <FourZoneMap />;
    case "decisionEngine": return <DecisionEngine />;
    case "iqDecisionCards": return <IQDecisionCards />;
    case "contextLab": return <ContextLab />;
    case "timeLab": return <TimeLab />;
    case "negativeMachine": return <NegativeMachine />;
    case "whoseLab": return <WhoseLab />;
  }
}

// ============================================================
// الغلاف والخاتمة المصدرية
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-cyan-200 bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800 p-8 text-white shadow-xl md:p-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-24 w-24 place-items-center rounded-3xl bg-white/15 text-5xl ring-4 ring-white/25">🛰️</div>
        <div>
          <div dir="ltr" className="inline-flex items-center rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5"><En className="text-[11px] font-black uppercase tracking-[0.22em] text-cyan-100">{LAB_NAME_20}</En></div>
          <h1 className="font-head mt-3 text-3xl font-bold md:text-4xl"><Rich text={LESSON_TITLE_20} /></h1>
          <En className="mt-1 block text-xl font-bold text-cyan-100">{LESSON_SUBTITLE_20}</En>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-lg font-bold text-cyan-50"><Rich text={LESSON_ARABIC_TITLE_20} /></div>
      <div className="mt-4 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-cyan-50"><Rich text={COVER_INTRO_20} /></div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2" dir="ltr">
        {MAGIC_SYSTEM_20.map((item, i) => (
          <div key={item.word} className="ltr-row flex items-center justify-between gap-2 rounded-2xl bg-white/10 px-4 py-3">
            <En className={`rounded-lg px-3 py-1 text-lg font-black ${i === 0 ? "bg-emerald-400 text-emerald-950" : i === 1 ? "bg-sky-300 text-sky-950" : i === 2 ? "bg-amber-300 text-amber-950" : "bg-rose-300 text-rose-950"}`}>{item.word}</En>
            <span dir="rtl" className="text-sm font-bold text-cyan-50">{item.ar}</span>
          </div>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-5 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/10 p-4">
        <En className="rounded-xl bg-white/15 px-3 py-2 text-sm font-black">Singular</En>
        <En className="text-lg font-black text-cyan-100">+</En>
        <En className="rounded-xl bg-white/15 px-3 py-2 text-sm font-black">Plural</En>
        <En className="text-lg font-black text-cyan-100">×</En>
        <En className="rounded-xl bg-white/15 px-3 py-2 text-sm font-black">Near</En>
        <En className="text-lg font-black text-cyan-100">+</En>
        <En className="rounded-xl bg-white/15 px-3 py-2 text-sm font-black">Far</En>
      </div>
      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-cyan-100"><Rich text={LAB_MOTTO_20} /></div>
    </div>
  );
}

function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس ستكون قادرًا على:">
      <div className="grid gap-2">
        {OBJECTIVES_20.map((objective) => (
          <div key={objective.n} className="rounded-2xl border-2 border-cyan-100 bg-cyan-50/60 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-700 text-sm font-bold text-white">{objective.n}</span>
              <Rich text={objective.text} className="font-semibold text-slate-800" />
            </div>
            {"items" in objective && objective.items && <div className="mt-2 flex flex-wrap gap-2 pr-11">{objective.items.map((item) => <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-bold text-cyan-900"><Rich text={item} /></span>)}</div>}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[38]} title="الخلاصة" lead={SUMMARY_20.intro}>
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4">
            <div className="text-center text-lg font-black text-cyan-900"><Rich text={SUMMARY_20.axis1} /></div>
            <div className="mt-3 grid gap-2"><MixedLine text={SUMMARY_20.singular} /><MixedLine text={SUMMARY_20.plural} /></div>
          </div>
          <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4">
            <div className="text-center text-lg font-black text-indigo-900"><Rich text={SUMMARY_20.axis2} /></div>
            <div className="mt-3 grid gap-2"><MixedLine text={SUMMARY_20.near} /><MixedLine text={SUMMARY_20.far} /></div>
          </div>
        </div>
        <FormulaStrip items={SUMMARY_20.system} tone="cyan" />
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
          <div className="text-center text-lg font-black text-amber-900"><Rich text={SUMMARY_20.ruleTitle} /></div>
          <FormulaStrip items={SUMMARY_20.rule} tone="amber" />
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <div className="text-center text-base font-bold text-emerald-800"><Rich text={SUMMARY_20.beLead} /></div>
          <FormulaStrip items={SUMMARY_20.be} tone="emerald" />
        </div>
      </div>
    </Frame>
  );
}

function Reached() {
  return (
    <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[39]} title="المستوى الذي وصلنا إليه" lead={LEVEL_REACHED_20.intro}>
      <div className="grid gap-2">
        {LEVEL_REACHED_20.sentences.map((sentence) => <En key={sentence} className="block rounded-2xl border-2 border-cyan-200 bg-cyan-50 p-3 text-left text-lg font-black text-cyan-950">{sentence}</En>)}
      </div>
      <div className="mt-4 rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4">
        <div className="text-center text-base font-bold text-slate-700"><Rich text={LEVEL_REACHED_20.notice} /></div>
        <div dir="ltr" className="ltr-row mt-3 flex flex-wrap justify-center gap-2">
          {LEVEL_REACHED_20.topics.map((topic) => <En key={topic} className="rounded-xl bg-white px-3 py-2 text-sm font-black text-indigo-900">{topic}</En>)}
        </div>
      </div>
      <div className="mt-4 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center"><Rich text={LEVEL_REACHED_20.closing} className="text-base font-black text-amber-900" /></div>
    </Frame>
  );
}

function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[40]} title="خريطة المنهج">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_20.map((item) => (
          <div key={item.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${item.here ? "border-cyan-400 bg-cyan-100 shadow" : "border-slate-100 bg-white"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${item.here ? "bg-cyan-700" : "bg-slate-500"}`}>{item.n}</span>
            <En className={`text-left text-sm font-bold ${item.here ? "text-cyan-950" : "text-slate-700"}`}>{item.en}</En>
            {item.here && <span className="mr-auto text-lg">🔥</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5 text-center"><Rich text={ROADMAP_CLOSING_20} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" /></div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-cyan-200 bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 20.</h2>
      <div className="mt-4 text-lg leading-relaxed text-cyan-50"><Rich text="أصبحت منظومة أسماء الإشارة الأساسية عندك كاملة: اسأل عن العدد والمسافة، ثم اختر This أو That أو These أو Those، واربطها بـ is / are والملكية والأسئلة." /></div>
      <div dir="ltr" className="ltr-row mt-5 flex flex-wrap justify-center gap-2">
        {BE_CONNECTIONS_20.map((line) => <En key={line} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-black text-white">{line}</En>)}
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-center"><Rich text={ROADMAP_CLOSING_20} className="font-bold text-cyan-50" /></div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-cyan-800 transition hover:bg-cyan-50">← جميع الدروس</button>
      </div>
    </div>
  );
}

function sourceHeadingFor(slide: Slide20): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex];
}

export function SlideView20({ s, onExit }: { s: Slide20; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson": return <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={s.tip}>{s.blocks.map((block, i) => <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}><BlockView block={block} /></div>)}</Frame>;
    case "ex": return <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}><ExerciseView exercise={s.ex} /></Frame>;
    case "summary": return <Summary />;
    case "reached": return <Reached />;
    case "roadmap": return <Roadmap />;
    case "quiz": return <Frame mascot={s.mascot} badge="الاختبار النهائي" title={<Rich text={s.title} />} lead="أسئلة جديدة تقيس فهم مفرد/جمع، قريب/بعيد، is / are، الأسئلة، الملكية، والأخطاء الشائعة."><FinalQuiz lesson={20} accent="bg-cyan-700" /></Frame>;
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide20): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-500",
  "نظام الإشارة": "text-cyan-700",
  "الأشكال الأربعة": "text-blue-700",
  "الربط الذكي": "text-indigo-700",
  "محرك الاختيار": "text-fuchsia-700",
  "المسافة والسياق": "text-violet-700",
  "المحقق والتحديات": "text-rose-700",
  "التحديات النهائية": "text-amber-700",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900"><Rich text="الدرس 20 · Demonstratives" /></div>
        <En className="text-xs font-semibold text-cyan-700">🛰️ {LAB_NAME_20}</En>
        <div className="mt-2 rounded-lg bg-cyan-50 px-2 py-1 text-[11px] font-bold text-cyan-700">{SOURCE_NUMBERED_COUNT} قسمًا من المصدر · {SLIDES.length} شريحة</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}><Rich text={group.section} /></div>
            {group.indexes.map((i) => {
              const active = index === i;
              return (
                <button key={i} onClick={() => { setIndex(i); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-cyan-700 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
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

export default function Lesson20({ onExit }: { onExit: () => void }) {
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

  useEffect(() => { document.getElementById("l20-main")?.scrollTo({ top: 0 }); }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f0f9ff] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"><Rail index={index} setIndex={setIndex} onExit={onExit} /></div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500"><Rich text={`${slide.section} · `} /><span className="text-slate-800"><Rich text={slideTitle(slide)} /></span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-l from-cyan-700 via-blue-600 to-fuchsia-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{index + 1} / {total}</span>
          </header>
          <main id="l20-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10"><div key={index} className="pop mx-auto max-w-4xl"><SlideView20 s={slide} onExit={onExit} /></div></main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={navigation.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={navigation.next} disabled={index === total - 1} className="rounded-full bg-cyan-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-cyan-800 disabled:opacity-30">التالي ←</button>
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
