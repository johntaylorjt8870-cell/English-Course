import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_21,
  LESSON_SUBTITLE_21,
  LESSON_ARABIC_TITLE_21,
  LAB_NAME_21,
  LAB_MOTTO_21,
  COVER_INTRO_21,
  COVER_INTRO_LIST_21,
  COVER_FROM_21,
  COVER_TO_21,
  COVER_NOTE_21,
  OBJECTIVES_21,
  MEANING_21,
  WHY_21,
  THINKING_21,
  SINGULAR_EXAMPLES_21,
  AN_21,
  PLURAL_EXAMPLES_21,
  IRREGULAR_21,
  PLACE_21,
  PLURAL_PLACE_21,
  CONSTRUCTION_21,
  NEGATIVE_21,
  CONTRACTIONS_21,
  QUESTIONS_21,
  SHORT_ANSWERS_21,
  IMPORTANT_MISTAKE_21,
  IS_VS_IT_21,
  THIS_VS_THERE_21,
  SOME_21,
  ANY_21,
  SOME_SINGULAR_21,
  NUMBERS_21,
  BIG_QUANTITIES_21,
  BIG_PLACES_21,
  SCENE_21,
  SCENE_QA_21,
  INVESTIGATION_21,
  UNCOUNTABLE_21,
  A_AN_SOME_21,
  ORDER_21,
  ADJECTIVE_LINK_21,
  POSSESSION_LINK_21,
  DEMONSTRATIVE_LINK_21,
  SCENE_CHAIN_21,
  COMMON_ERRORS_21,
  GRAMMAR_DETECTIVE_21,
  SOLUTIONS_21,
  CHALLENGE1_21,
  CHALLENGE2_21,
  CHALLENGE3_21,
  CHALLENGE4_21,
  IQ200_CHALLENGE_21,
  KITCHEN_21,
  FINAL_BOSS_21,
  GOLDEN_SUMMARY_21,
  MINDMAP_21,
  FINAL_SYSTEM_21,
  ROADMAP_21,
  ROADMAP_CLOSING_21,
  type Block21,
  type Exercise21,
  type Slide21,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 21 — SCENE DETECTIVE LAB
// المشهد موجود. الطالب يحقق فيه:
// ONE or MORE? → WHAT exists? → WHERE? → IS / ARE?
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

function MixedLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-3">
      <Rich text={text} className="text-base font-bold text-slate-800 md:text-lg" />
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
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(5,150,105,0.25)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-emerald-700 text-lg font-bold text-white shadow-sm">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-emerald-100 px-3.5 py-1.5 text-sm font-bold text-emerald-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"
        >
          <span className="rounded-md bg-white px-1.5 py-0.5 text-emerald-700">SOURCE SECTION</span>
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
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-emerald-700 to-teal-700 p-4 text-white">
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
    <div data-en-seq={seq} className="rounded-3xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-emerald-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <En className="text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">{label}</En>
        {ar && <Rich text={ar} className="text-sm font-bold text-slate-600" />}
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({ items, tone = "emerald" }: { items: readonly string[]; tone?: "emerald" | "teal" | "amber" | "rose" }) {
  const colors = {
    emerald: "border-emerald-200 bg-white text-emerald-900",
    teal: "border-teal-200 bg-white text-teal-900",
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
// 1. EXISTENCE DETECTOR — الكاشف الرئيسي
// ============================================================
const DETECTOR_NUMBERS = ["one", "two", "three", "four", "five"];

function ExistenceDetector() {
  const [count, setCount] = useState(1);
  const more = count > 1;
  return (
    <LabPanel emoji="🔦" label="EXISTENCE DETECTOR" ar="أداة كشف الوجود — كم كائنًا تكتشف في المشهد؟" seq="l21-existence">
      <div className="text-center text-sm font-bold text-slate-600">اضغط لتضبط عدد الأشياء التي يراها الكاشف في المشهد:</div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {DETECTOR_NUMBERS.map((num, i) => (
          <button
            key={num}
            onClick={() => setCount(i + 1)}
            aria-label={num}
            className={`grid h-12 w-12 place-items-center rounded-2xl border-2 text-2xl transition ${
              count === i + 1 ? "border-emerald-500 bg-emerald-600 shadow" : "border-slate-200 bg-white hover:border-emerald-300"
            }`}
          >
            <span className={i < count ? "" : "opacity-20 grayscale"}>📦</span>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className={`rounded-3xl border-2 p-4 text-center transition ${!more ? "border-emerald-500 bg-white shadow-md" : "border-slate-200 bg-white/60 opacity-60"}`}>
          <En className="text-xs font-black uppercase tracking-wide text-slate-500">ONE</En>
          <div className="my-1 text-2xl">↓</div>
          <En className="rounded-xl bg-emerald-600 px-4 py-2 text-xl font-black text-white">There is</En>
        </div>
        <div className={`rounded-3xl border-2 p-4 text-center transition ${more ? "border-amber-400 bg-white shadow-md" : "border-slate-200 bg-white/60 opacity-60"}`}>
          <En className="text-xs font-black uppercase tracking-wide text-slate-500">MORE THAN ONE</En>
          <div className="my-1 text-2xl">↓</div>
          <En className="rounded-xl bg-amber-500 px-4 py-2 text-xl font-black text-white">There are</En>
        </div>
      </div>
      <div dir="ltr" className="ltr-row mt-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-3">
        <En className={`rounded-xl px-4 py-2 text-lg font-black ${more ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>
          {more ? `There are ${DETECTOR_NUMBERS[count - 1]} boxes in the scene.` : "There is one box in the scene."}
        </En>
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3">
        <div className="mb-2 text-center text-sm font-black text-emerald-800">⭐ القاعدة الذهبية</div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-2">
            <Rich text={MEANING_21.singularLabel} className="text-sm font-bold text-slate-600" />
            <En className="rounded-lg bg-white px-3 py-1.5 text-base font-black text-emerald-900">{MEANING_21.singular}</En>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-amber-200 bg-amber-50 p-2">
            <Rich text={MEANING_21.pluralLabel} className="text-sm font-bold text-slate-600" />
            <En className="rounded-lg bg-white px-3 py-1.5 text-base font-black text-amber-900">{MEANING_21.plural}</En>
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

function MeaningBoard() {
  return (
    <LabPanel emoji="🧠" label="MEANING BOARD" ar="المعنى ببساطة" seq="l21-meaning">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-300 bg-white p-4">
          <En className="text-2xl font-black text-emerald-800">{MEANING_21.isLine.en}</En>
          <div className="mt-2 text-base font-bold text-slate-700">
            <Rich text={MEANING_21.isLine.ar} />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-300 bg-white p-4">
          <En className="text-2xl font-black text-amber-700">{MEANING_21.areLine.en}</En>
          <div className="mt-2 text-base font-bold text-slate-700">
            <Rich text={MEANING_21.areLine.ar} />
          </div>
        </div>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={MEANING_21.exampleLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <SourceLine en={MEANING_21.exampleIs.en} ar={MEANING_21.exampleIs.ar} tone="focus" />
        <SourceLine en={MEANING_21.exampleAre.en} ar={MEANING_21.exampleAre.ar} tone="warn" />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 2–3. لماذا نحتاج القاعدة + الفرق في التفكير
// ============================================================
function WhyRuleBoard() {
  return (
    <LabPanel emoji="🔍" label="WHY WE NEED IT" ar="لماذا نحتاج هذه القاعدة؟" seq="l21-why">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={WHY_21.compare} />
      </div>
      <div dir="ltr" className="ltr-row mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
          <En className="text-lg font-black text-indigo-900">{WHY_21.first.en}</En>
          <div className="mt-1 text-sm font-bold text-slate-500">
            <Rich text={WHY_21.first.ar} />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
          <En className="text-lg font-black text-emerald-900">{WHY_21.second.en}</En>
          <div className="mt-1 text-sm font-bold text-slate-500">
            <Rich text={WHY_21.second.ar} />
          </div>
        </div>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={WHY_21.withLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3">
          <div className="text-sm font-bold text-indigo-900">
            <Rich text={WHY_21.firstSentence} />
          </div>
          <div dir="ltr" className="mt-1 flex items-center justify-center gap-2">
            <En className="rounded-lg bg-white px-3 py-1 text-base font-black text-indigo-900">{WHY_21.firstForm}</En>
            <Rich text={WHY_21.firstMeaning} className="text-sm font-bold text-slate-700" />
          </div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-3">
          <div className="text-sm font-bold text-emerald-900">
            <Rich text={WHY_21.secondSentence} />
          </div>
          <div dir="ltr" className="mt-1 flex flex-wrap items-center justify-center gap-2">
            <En className="rounded-lg bg-white px-3 py-1 text-base font-black text-emerald-900">{WHY_21.secondForm}</En>
            <Rich text={WHY_21.secondMeaning} className="text-sm font-bold text-slate-700" />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

function ThinkingBoard() {
  return (
    <LabPanel emoji="🔥" label="THINKING DIFFERENCE" ar="الفرق في طريقة التفكير" seq="l21-thinking">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
          <div className="text-3xl">👉</div>
          <En className="mt-2 block text-left text-lg font-black text-indigo-900">{THINKING_21.pointing.en}</En>
          <div className="mt-2 text-base font-bold text-slate-700">
            <Rich text={THINKING_21.pointing.ar} />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
          <div className="text-3xl">📍</div>
          <En className="mt-2 block text-left text-lg font-black text-emerald-900">{THINKING_21.existence.en}</En>
          <div className="mt-2 text-base font-bold text-slate-700">
            <Rich text={THINKING_21.existence.ar} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 4. There is + اسم مفرد
// ============================================================
function SingularExamples() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🐱" label="SINGULAR SCAN" ar="امسح المشهد بضمعة الضوء — ماذا يوجد؟" seq="l21-singular">
      <div className="text-center text-sm font-bold text-slate-500">
        <Rich text={SINGULAR_EXAMPLES_21.examplesLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {SINGULAR_EXAMPLES_21.examples.map((item, i) => (
          <button
            key={item.en}
            onClick={() => setActive(i)}
            className={`rounded-3xl border-2 p-4 text-right transition ${active === i ? "border-emerald-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}
          >
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-emerald-100 px-2 py-0.5">
                <En className="text-xs font-black text-emerald-800">is</En>
              </span>
              <En className="text-left text-base font-black text-slate-900">{item.en}</En>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={item.ar} />
            </div>
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 rounded-2xl bg-white p-3 text-center">
        <En className="text-lg font-black text-emerald-950">{SINGULAR_EXAMPLES_21.examples[active].en}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 5. انتبه إلى A / AN
// ============================================================
function AanDetector() {
  const [active, setActive] = useState(0);
  const cur = AN_21.words[active];
  return (
    <LabPanel emoji="⭐" label="A / AN DETECTOR" ar="كاشف الأداة: a أم an؟" seq="l21-aan">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={AN_21.lead} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-2">
        <En className="rounded-xl bg-emerald-600 px-4 py-2 text-xl font-black text-white">{AN_21.a}</En>
        <Rich text={AN_21.or} className="text-base font-bold text-slate-600" />
        <En className="rounded-xl bg-teal-600 px-4 py-2 text-xl font-black text-white">{AN_21.an}</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={AN_21.exampleLabel} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {AN_21.words.map((item, i) => (
          <button
            key={item.word}
            onClick={() => setActive(i)}
            className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${
              active === i ? "border-transparent bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
            }`}
          >
            {item.word}
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 rounded-3xl border-2 border-white bg-white p-4 text-center">
        <En className="text-xl font-black text-emerald-950">
          There is{" "}
          <span className="rounded-lg bg-emerald-100 px-2 py-1 text-teal-800">{cur.article}</span>{" "}
          {cur.en.slice(10 + cur.article.length)}
        </En>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {AN_21.words.map((item) => (
          <En key={item.en} className="block rounded-2xl border-2 border-slate-100 bg-white p-2.5 text-center text-base font-black text-slate-900">
            {item.en}
          </En>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
          <div className="text-center text-sm font-bold text-rose-700">
            <Rich text={AN_21.dontSay} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 space-y-2">
            {AN_21.wrong.map((w) => (
              <En key={w} className="block rounded-xl bg-white px-3 py-2 text-left text-base font-black text-rose-700 line-through decoration-rose-400">
                {w}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
          <div className="text-center text-sm font-bold text-emerald-700">
            <Rich text={AN_21.correctLabel} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 space-y-2">
            {AN_21.fixed.map((f) => (
              <En key={f} className="block rounded-xl bg-white px-3 py-2 text-left text-base font-black text-emerald-800">
                {f}
              </En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 6. There are + الجمع
// ============================================================
function PluralExamples() {
  return (
    <LabPanel emoji="🔢" label="PLURAL SCAN" ar="عندما يكون الاسم جمعًا" seq="l21-plural">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={PLURAL_EXAMPLES_21.lead} />
      </div>
      <div dir="ltr" className="mt-2 text-center">
        <En className="rounded-xl bg-amber-500 px-4 py-2 text-lg font-black text-white">{PLURAL_EXAMPLES_21.formula}</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={PLURAL_EXAMPLES_21.examplesLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {PLURAL_EXAMPLES_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-white p-3">
        <div className="text-center text-sm font-black text-amber-800">
          <Rich text={PLURAL_EXAMPLES_21.compareTitle} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {PLURAL_EXAMPLES_21.compare.map((item, i) => (
            <div key={item.en} className={`rounded-xl border-2 p-2.5 ${i % 2 === 0 ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
              <En className="block text-left text-base font-black text-slate-900">{item.en}</En>
              <div className="mt-1 text-xs font-bold text-slate-500">
                <Rich text={item.ar} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 7. SINGULAR / PLURAL CONTROL PANEL
// ============================================================
function IrregularPanel() {
  const [mode, setMode] = useState<Record<number, boolean>>({});
  const isPlural = (i: number) => mode[i] === true;
  return (
    <LabPanel emoji="🔁" label="SINGULAR / PLURAL CONTROL PANEL" ar="لوحة التحكم: مفرد أم جمع؟" seq="l21-irregular">
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={IRREGULAR_21.remember} />
      </div>
      <div className="mt-2">
        <FormulaStrip items={IRREGULAR_21.pairs} tone="teal" />
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={IRREGULAR_21.now} />
      </div>
      <div className="mt-2 space-y-2">
        {IRREGULAR_21.rows.map((row, i) => {
          const plural = isPlural(i);
          return (
            <div key={row.is} className="rounded-3xl border-2 border-white bg-white p-3">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setMode((s) => ({ ...s, [i]: false }))}
                  className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${!plural ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  مفرد
                </button>
                <button
                  onClick={() => setMode((s) => ({ ...s, [i]: true }))}
                  className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${plural ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  جمع
                </button>
              </div>
              <div dir="ltr" className="ltr-row mt-2 grid gap-2 sm:grid-cols-2">
                <div className={`rounded-2xl border-2 p-3 transition ${!plural ? "border-emerald-400 bg-emerald-50 shadow" : "border-slate-100 bg-white/70 opacity-70"}`}>
                  <En className="block text-left text-base font-black text-emerald-900">{row.is}</En>
                  <span dir="rtl" className="mt-1 block text-xs font-bold text-slate-500">
                    <Rich text={row.isAr} />
                  </span>
                </div>
                <div className={`rounded-2xl border-2 p-3 transition ${plural ? "border-amber-400 bg-amber-50 shadow" : "border-slate-100 bg-white/70 opacity-70"}`}>
                  <En className="block text-left text-base font-black text-amber-900">{row.are}</En>
                  <span dir="rtl" className="mt-1 block text-xs font-bold text-slate-500">
                    <Rich text={row.areAr} />
                  </span>
                </div>
              </div>
              {"but" in row && row.but && (
                <div className="mt-2 text-center text-xs font-bold text-slate-500">
                  <Rich text={row.but} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-700">
        <Rich text={IRREGULAR_21.closing} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 8. LOCATION LAB
// ============================================================
function LocationLab() {
  const [active, setActive] = useState(0);
  const prep = PLACE_21.preps[active];
  const highlight = (sentence: string) => {
    const escaped = prep.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = sentence.match(new RegExp(`\\b${escaped}\\b`, "i"));
    if (!match || match.index === undefined) return <En className="block text-left text-lg font-extrabold text-slate-900">{sentence}</En>;
    const idx = match.index;
    return (
      <En className="block text-left text-lg font-extrabold text-slate-900">
        {sentence.slice(0, idx)}
        <span className="rounded-lg bg-teal-100 px-1.5 py-0.5 text-teal-800">{sentence.slice(idx, idx + prep.en.length)}</span>
        {sentence.slice(idx + prep.en.length)}
      </En>
    );
  };
  return (
    <LabPanel emoji="📍" label="LOCATION LAB" ar="مختبر الأماكن: أين يوجد الشيء؟" seq="l21-location">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={PLACE_21.lead} /> <span className="text-sm font-bold text-slate-500"><Rich text={PLACE_21.like} /></span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PLACE_21.preps.map((item, i) => (
          <button
            key={item.en}
            onClick={() => setActive(i)}
            dir="ltr"
            className={`ltr-row rounded-2xl border-2 p-2 text-center transition ${active === i ? "border-teal-500 bg-white shadow" : "border-slate-200 bg-white/70"}`}
          >
            <En className="block text-base font-black text-slate-900">{item.en}</En>
            <span className="mt-1 block text-sm font-bold text-teal-700">{item.ar}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-white p-3 text-center">
        <En className="text-2xl font-black text-teal-800">{prep.en}</En>
        <span className="text-base font-bold text-slate-600"> = {prep.ar}</span>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={PLACE_21.examplesLabel} />
      </div>
      <div className="mt-2 grid gap-2">
        {PLACE_21.examples.map((item) => (
          <div key={item.en} className="rounded-2xl border-2 border-slate-100 bg-white p-3">
            {highlight(item.en)}
            <div className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={item.ar} />
            </div>
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 9. There are + المكان
// ============================================================
function PluralLocation() {
  return (
    <LabPanel emoji="📍" label="PLURAL + LOCATION" ar="نفس الفكرة مع الجمع" seq="l21-plural-place">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={PLURAL_PLACE_21.lead} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {PLURAL_PLACE_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 10. SENTENCE CONSTRUCTION MACHINE
// ============================================================
function ConstructionMachine() {
  const [plural, setPlural] = useState(false);
  return (
    <LabPanel emoji="⚙️" label="SENTENCE CONSTRUCTION MACHINE" ar="آلة تركيب الجملة" seq="l21-construction">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={CONSTRUCTION_21.lead} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <En className="rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center text-lg font-black text-emerald-900">{CONSTRUCTION_21.singular}</En>
        <En className="rounded-2xl border-2 border-amber-200 bg-white p-3 text-center text-lg font-black text-amber-900">{CONSTRUCTION_21.plural}</En>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={() => setPlural(false)}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${!plural ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-500"}`}
        >
          مفرد
        </button>
        <button
          onClick={() => setPlural(true)}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${plural ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"}`}
        >
          جمع
        </button>
      </div>
      <div dir="ltr" className="ltr-row mt-3 flex flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-white bg-white p-4">
        <En className={`rounded-xl px-3 py-2 text-lg font-black ${plural ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>
          {plural ? "There are" : "There is"}
        </En>
        <En className="text-xl font-black text-slate-400">+</En>
        <En className="rounded-xl bg-sky-50 px-3 py-2 text-lg font-black text-sky-900">{plural ? "three robots" : "a robot"}</En>
        <En className="text-xl font-black text-slate-400">+</En>
        <En className="rounded-xl bg-violet-50 px-3 py-2 text-lg font-black text-violet-900">in the laboratory</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={CONSTRUCTION_21.exampleLabel} />
      </div>
      <div className="mt-2 space-y-2">
        {CONSTRUCTION_21.examples.map((ex) => (
          <En key={ex} className="block rounded-2xl border-2 border-slate-100 bg-white p-3 text-center text-lg font-black text-slate-900">
            {ex}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 11. AFFIRMATIVE → NEGATIVE TRANSFORMER
// ============================================================
function NegativeTransformer() {
  const [shown, setShown] = useState<Record<string, boolean>>({});
  return (
    <LabPanel emoji="🚫" label="NEGATIVE TRANSFORMER" ar="محوّل النفي: من المثبت إلى المنفي" seq="l21-negative">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={NEGATIVE_21.lead} />
      </div>
      <FormulaStrip items={NEGATIVE_21.full} tone="rose" />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-emerald-800">
            <Rich text={NEGATIVE_21.singularLabel} />
          </div>
          <SourceLine en={NEGATIVE_21.singularFull.en} ar={NEGATIVE_21.singularFull.ar} />
          <div className="mt-2 text-center text-xs font-bold text-slate-500">
            <Rich text={NEGATIVE_21.canShort} />
          </div>
          <button
            onClick={() => setShown((s) => ({ ...s, s: !s.s }))}
            className="mt-2 w-full rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white transition hover:brightness-110"
          >
            ✂️ شغّل المحوّل
          </button>
          <div className={`mt-2 rounded-2xl transition ${shown.s ? "ring-2 ring-emerald-400" : ""}`}>
            <SourceLine en={NEGATIVE_21.singularShort.en} tone="good" />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-amber-800">
            <Rich text={NEGATIVE_21.pluralLabel} />
          </div>
          <SourceLine en={NEGATIVE_21.pluralFull.en} ar={NEGATIVE_21.pluralFull.ar} />
          <div className="mt-2 text-center text-xs font-bold text-slate-500">
            <Rich text={NEGATIVE_21.shortLabel} />
          </div>
          <button
            onClick={() => setShown((s) => ({ ...s, p: !s.p }))}
            className="mt-2 w-full rounded-xl bg-amber-500 px-3 py-2 text-sm font-bold text-white transition hover:brightness-110"
          >
            ✂️ شغّل المحوّل
          </button>
          <div className={`mt-2 rounded-2xl transition ${shown.p ? "ring-2 ring-amber-400" : ""}`}>
            <SourceLine en={NEGATIVE_21.pluralShort.en} tone="good" />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 12. الاختصارات
// ============================================================
function ContractionsBoard() {
  return (
    <LabPanel emoji="✂️" label="CONTRACTIONS" ar="الاختصارات" seq="l21-contractions">
      <div className="text-center text-sm font-black text-emerald-800">
        <Rich text={CONTRACTIONS_21.title} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {CONTRACTIONS_21.pairs.map((pair) => {
          const [from, to] = pair.split(" → ");
          return (
            <div key={pair} dir="ltr" className="ltr-row flex items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-3">
              <En className="rounded-lg bg-slate-100 px-3 py-1.5 text-base font-black text-slate-500 line-through decoration-slate-300">{from}</En>
              <En className="text-lg font-black text-emerald-600">→</En>
              <En className="rounded-lg bg-emerald-600 px-3 py-1.5 text-base font-black text-white">{to}</En>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={CONTRACTIONS_21.examplesLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {CONTRACTIONS_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 13. QUESTION MACHINE
// ============================================================
function QuestionMachine() {
  const [active, setActive] = useState(0);
  const all = [...QUESTIONS_21.singular, ...QUESTIONS_21.plural];
  return (
    <LabPanel emoji="❓" label="QUESTION MACHINE" ar="آلة السؤال: كيف نسأل عن الوجود؟" seq="l21-question">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={QUESTIONS_21.want} /> <span className="text-emerald-800"><Rich text={QUESTIONS_21.ask} /></span>
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-500">
        <Rich text={QUESTIONS_21.place} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
          <En className="text-xl font-black text-emerald-900">{QUESTIONS_21.isForm.en}</En>
          <div className="mt-1 text-sm font-bold text-slate-500">
            <Rich text={QUESTIONS_21.isForm.ar} />
          </div>
        </div>
        <div className="rounded-2xl border-2 border-amber-200 bg-white p-3 text-center">
          <En className="text-xl font-black text-amber-900">{QUESTIONS_21.areForm.en}</En>
          <div className="mt-1 text-sm font-bold text-slate-500">
            <Rich text={QUESTIONS_21.areForm.ar} />
          </div>
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <div className="mb-1 text-center text-sm font-black text-emerald-800">
            <Rich text={QUESTIONS_21.singularLabel} />
          </div>
          {QUESTIONS_21.singular.map((item, i) => (
            <button
              key={item.en}
              onClick={() => setActive(i)}
              className={`mb-2 block w-full rounded-2xl border-2 p-3 text-right transition ${active === i ? "border-emerald-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}
            >
              <En className="block text-left text-base font-black text-slate-900">{item.en}</En>
              <span className="mt-1 block text-sm font-bold text-slate-500">
                <Rich text={item.ar} />
              </span>
            </button>
          ))}
        </div>
        <div>
          <div className="mb-1 text-center text-sm font-black text-amber-800">
            <Rich text={QUESTIONS_21.pluralLabel} />
          </div>
          {QUESTIONS_21.plural.map((item, i) => (
            <button
              key={item.en}
              onClick={() => setActive(i + 2)}
              className={`mb-2 block w-full rounded-2xl border-2 p-3 text-right transition ${active === i + 2 ? "border-amber-400 bg-white shadow" : "border-slate-200 bg-white/70"}`}
            >
              <En className="block text-left text-base font-black text-slate-900">{item.en}</En>
              <span className="mt-1 block text-sm font-bold text-slate-500">
                <Rich text={item.ar} />
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-emerald-100 bg-white p-3">
        <div className="text-center text-sm font-black text-emerald-800">
          <Rich text={QUESTIONS_21.ruleTitle} />
        </div>
        <div className="mt-2">
          <FormulaStrip items={QUESTIONS_21.rule} tone="teal" />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 14. SHORT-ANSWER BRIDGE
// ============================================================
function ShortAnswerBridge() {
  const [picked, setPicked] = useState<Record<number, "yes" | "no">>({});
  const groups = [
    { key: "s", label: SHORT_ANSWERS_21.singularLabel, q: SHORT_ANSWERS_21.singularQ },
    { key: "p", label: SHORT_ANSWERS_21.pluralLabel, q: SHORT_ANSWERS_21.pluralQ },
  ];
  const correctPick = (q: { yes: string; no: string }) => (q.yes.startsWith("Yes") ? "yes" : "no");
  return (
    <LabPanel emoji="🌉" label="SHORT-ANSWER BRIDGE" ar="جسر الإجابات القصيرة" seq="l21-short-answers">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SHORT_ANSWERS_21.use} />
      </div>
      <FormulaStrip items={SHORT_ANSWERS_21.forms} tone="teal" />
      {groups.map((group, gi) => (
        <div key={group.key} className="mt-3 rounded-3xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-black text-emerald-800">
            <Rich text={group.label} />
          </div>
          <En className="mt-2 block rounded-2xl bg-emerald-50 p-3 text-center text-lg font-black text-emerald-950">{group.q.en}</En>
          <div className="mt-2 flex justify-center gap-2">
            {(["yes", "no"] as const).map((option) => {
              const choice = picked[gi];
              const right = choice === correctPick(group.q);
              return (
                <button
                  key={option}
                  onClick={() => setPicked((s) => ({ ...s, [gi]: option }))}
                  className={`font-en rounded-xl border-2 px-5 py-2 text-base font-black transition ${
                    choice === option
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {option === "yes" ? "Yes" : "No"}
                </button>
              );
            })}
          </div>
          {picked[gi] && (
            <div dir="ltr" className="ltr-row mt-2 text-center">
              <En className={`rounded-xl bg-white px-4 py-2 text-lg font-black ${picked[gi] === correctPick(group.q) ? "text-emerald-800" : "text-rose-700"}`}>
                {picked[gi] === "yes" ? group.q.yes : group.q.no}
              </En>
            </div>
          )}
        </div>
      ))}
    </LabPanel>
  );
}

// ============================================================
// 15. خطأ مهم
// ============================================================
function MistakeSpot() {
  return (
    <LabPanel emoji="🚨" label="IMPORTANT MISTAKE" ar="خطأ مهم" seq="l21-mistake">
      <div className="text-center text-base font-black text-rose-700">
        <Rich text={IMPORTANT_MISTAKE_21.title} />
      </div>
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={IMPORTANT_MISTAKE_21.questionLabel} />
      </div>
      <En className="mt-2 block rounded-2xl border-2 border-teal-200 bg-white p-3 text-center text-xl font-black text-teal-900">
        {IMPORTANT_MISTAKE_21.question}
      </En>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={IMPORTANT_MISTAKE_21.dontLabel} />
      </div>
      <En className="mt-2 block rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center text-xl font-black text-rose-700 line-through decoration-rose-400">
        {IMPORTANT_MISTAKE_21.wrong}
      </En>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={IMPORTANT_MISTAKE_21.correctLabel} />
      </div>
      <En className="mt-2 block rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3 text-center text-xl font-black text-emerald-800">
        {IMPORTANT_MISTAKE_21.correct}
      </En>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-700">
        <Rich text={IMPORTANT_MISTAKE_21.because} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 16. THERE IS vs IT IS LAB
// ============================================================
function IsVsItIsLab() {
  return (
    <LabPanel emoji="⚖️" label="THERE IS vs IT IS LAB" ar="مختبر الهويتين: وجود أم وصف؟" seq="l21-is-it">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={IS_VS_IT_21.important} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-300 bg-white p-4">
          <En className="rounded-xl bg-emerald-600 px-4 py-2 text-center text-xl font-black text-white">{IS_VS_IT_21.thereIs.word}</En>
          <div className="mt-2 text-center text-base font-bold text-slate-700">
            <Rich text={IS_VS_IT_21.thereIs.meaning} />
          </div>
          <div className="mt-3">
            <SourceLine en={IS_VS_IT_21.exampleIs.en} ar={IS_VS_IT_21.exampleIs.ar} tone="focus" />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-indigo-300 bg-white p-4">
          <En className="rounded-xl bg-indigo-600 px-4 py-2 text-center text-xl font-black text-white">{IS_VS_IT_21.itIs.word}</En>
          <div className="mt-2 text-center text-base font-bold text-slate-700">
            <Rich text={IS_VS_IT_21.itIs.meaning} />
          </div>
          <div className="mt-3">
            <SourceLine en={IS_VS_IT_21.exampleIt.en} ar={IS_VS_IT_21.exampleIt.ar} tone="focus" />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">
          <Rich text={IS_VS_IT_21.sequenceTitle} />
        </div>
        <div className="mt-2 space-y-2">
          {IS_VS_IT_21.sequence.map((line, i) => (
            <div key={line} className="flex items-center gap-3 rounded-xl bg-white p-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-500 text-sm font-bold text-white">{i + 1}</span>
              <Rich text={line} className="text-sm font-bold text-slate-700" />
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 17. THERE IS vs THIS IS LAB
// ============================================================
function ThisVsThereLab() {
  return (
    <LabPanel emoji="⚖️" label="THERE IS vs THIS IS LAB" ar="مختبر المقارنة: هذا أم يوجد؟" seq="l21-this-there">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={THIS_VS_THERE_21.compare} />
      </div>
      <div className="mt-3 space-y-3">
        {THIS_VS_THERE_21.pairs.map((pair) => (
          <div key={pair.thisIs.en} dir="ltr" className="ltr-row grid gap-2 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-indigo-200 bg-white p-3">
              <En className="block text-left text-lg font-black text-indigo-900">{pair.thisIs.en}</En>
              <span dir="rtl" className="mt-1 block text-sm font-bold text-slate-500">
                <Rich text={pair.thisIs.ar} />
              </span>
            </div>
            <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
              <En className="block text-left text-lg font-black text-emerald-900">{pair.thereIs.en}</En>
              <span dir="rtl" className="mt-1 block text-sm font-bold text-slate-500">
                <Rich text={pair.thereIs.ar} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-white p-3">
        <div className="text-center text-sm font-black text-teal-800">
          <Rich text={THIS_VS_THERE_21.ideaTitle} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {THIS_VS_THERE_21.idea.map((item) => (
            <div key={item.en} className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-teal-50 p-2.5">
              <En className="rounded-lg bg-white px-3 py-1 text-base font-black text-slate-900">{item.en}</En>
              <Rich text={item.ar} className="text-sm font-bold text-slate-600" />
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 18. SOME مع There are
// ============================================================
function SomePluralBoard() {
  return (
    <LabPanel emoji="📦" label="SOME SYSTEM" ar="بعض / عدد من" seq="l21-some">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SOME_21.lead} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-2">
        <En className="rounded-xl bg-emerald-600 px-4 py-2 text-xl font-black text-white">{SOME_21.some.en}</En>
        <Rich text={SOME_21.some.ar} className="text-base font-bold text-slate-600" />
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={SOME_21.exampleLabel} />
      </div>
      <div className="mt-2 grid gap-2">
        {SOME_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} tone="focus" />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 19. ANY SYSTEM — ثلاثي الحالات
// ============================================================
function AnySystem() {
  const [state, setState] = useState(0);
  const stateNames = ["إثبات", "نفي", "سؤال"];
  return (
    <LabPanel emoji="🌀" label="SOME / ANY SYSTEM" ar="النظام الثلاثي: إثبات · نفي · سؤال" seq="l21-any">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={ANY_21.lead} />
        <En className="mx-1 rounded-lg bg-slate-900 px-2 py-0.5 text-sm font-black text-white">{ANY_21.any}</En>
        <Rich text={ANY_21.context} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {ANY_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">
          <Rich text={ANY_21.systemTitle} />
        </div>
        <div className="mt-2 flex justify-center gap-2">
          {stateNames.map((name, i) => (
            <button
              key={name}
              onClick={() => setState(i)}
              className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${state === i ? "bg-amber-500 text-white" : "bg-white text-slate-600"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-xl bg-white p-3 text-center">
          <div className="text-xs font-bold text-slate-500">
            <Rich text={ANY_21.system[state].label} />
          </div>
          <En className="mt-1 block text-xl font-black text-slate-900">{ANY_21.system[state].en}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 20. SOME مع المفرد؟
// ============================================================
function SomeSingularBoard() {
  return (
    <LabPanel emoji="📦" label="SOME WITH SINGULAR?" ar="some مع المفرد؟" seq="l21-some-singular">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SOME_SINGULAR_21.lead} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {SOME_SINGULAR_21.someWords.map((word) => (
          <En key={word} className="rounded-xl border-2 border-emerald-200 bg-white px-3 py-2 text-sm font-black text-emerald-900">
            {word}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-base font-bold text-slate-700">
        <Rich text={SOME_SINGULAR_21.butLabel} />
      </div>
      <div dir="ltr" className="mt-2 text-center">
        <En className="rounded-xl bg-teal-600 px-4 py-2 text-xl font-black text-white">{SOME_SINGULAR_21.aAn}</En>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {SOME_SINGULAR_21.examples.map((ex) => (
          <En key={ex} className="block rounded-2xl border-2 border-slate-100 bg-white p-3 text-center text-lg font-black text-slate-900">
            {ex}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 21. QUANTITY LAB
// ============================================================
function QuantityLab() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🔢" label="QUANTITY LAB" ar="مختبر الأرقام" seq="l21-numbers">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={NUMBERS_21.lead} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {NUMBERS_21.numbers.map((item, i) => (
          <button
            key={item.n}
            onClick={() => setActive(i)}
            className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${
              active === i ? "border-transparent bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
            }`}
          >
            {item.n}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2">
        {NUMBERS_21.numbers.map((item, i) => (
          <div
            key={item.n}
            dir="ltr"
            className={`ltr-row rounded-2xl border-2 p-3 text-center transition ${active === i ? "border-emerald-400 bg-white shadow" : "border-slate-100 bg-white/70"}`}
          >
            <En className="text-lg font-black text-slate-900">{item.en}</En>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">
          <Rich text={NUMBERS_21.warning} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 space-y-2">
          <En className="block rounded-xl bg-white px-3 py-2 text-left text-lg font-black text-rose-700 line-through decoration-rose-400">
            {NUMBERS_21.wrong}
          </En>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={NUMBERS_21.because} />
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={NUMBERS_21.correctLabel} />
        </div>
        <En className="mt-1 block rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-emerald-800">
          {NUMBERS_21.correct}
        </En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 22. الكميات الكبيرة
// ============================================================
function BigQuantities() {
  return (
    <LabPanel emoji="📈" label="BIG QUANTITIES" ar="الكميات الكبيرة" seq="l21-quantities">
      <div className="grid gap-2">
        {BIG_QUANTITIES_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} />
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3">
        <div className="text-center text-sm font-bold text-violet-900">
          <Rich text={BIG_QUANTITIES_21.later} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {BIG_QUANTITIES_21.words.map((word) => (
            <En key={word} className="rounded-xl bg-white px-3 py-1.5 text-sm font-black text-violet-900">
              {word}
            </En>
          ))}
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={BIG_QUANTITIES_21.because} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 23. ROOM / SCENE BUILDER
// ============================================================
const ROOM_EMOJIS = ["🪟", "🖥️", "🪑", "📚", "💡", "🖼️"];

function RoomBuilder() {
  const [built, setBuilt] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setBuilt((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  return (
    <LabPanel emoji="🏠" label="ROOM BUILDER" ar="ابنِ الغرفة قطعة قطعة — كل قطعة جملة" seq="l21-room">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={BIG_PLACES_21.lead} />
      </div>
      <div className="mt-2 text-center text-sm font-bold text-slate-500">
        <Rich text={BIG_PLACES_21.exampleLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {BIG_PLACES_21.sentences.map((sentence, i) => {
          const on = built.has(i);
          return (
            <button
              key={sentence}
              onClick={() => toggle(i)}
              dir="ltr"
              className={`ltr-row flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${
                on ? "border-emerald-400 bg-white shadow" : "border-slate-200 bg-white/70"
              }`}
            >
              <span className={`text-2xl ${on ? "" : "opacity-30 grayscale"}`}>{ROOM_EMOJIS[i]}</span>
              <En className={`text-base font-black ${on ? "text-slate-900" : "text-slate-400"}`}>{sentence}</En>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-emerald-800">
        بنيت {built.size} / {BIG_PLACES_21.sentences.length} من وصف الغرفة
      </div>
      <div className="mt-2 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-700">
        <Rich text={BIG_PLACES_21.notice} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 24. SCENE DESCRIPTION MODE
// ============================================================
function SceneDescription() {
  const [active, setActive] = useState(0);
  return (
    <LabPanel emoji="🎨" label="SCENE DESCRIPTION MODE" ar="نصف المشهد قطعة قطعة" seq="l21-scene">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={SCENE_21.imagine} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {SCENE_21.items.map((item, i) => (
          <button
            key={item.ar}
            onClick={() => setActive(i)}
            className={`rounded-2xl border-2 p-3 text-center transition ${active === i ? "border-teal-500 bg-white shadow" : "border-slate-200 bg-white/70"}`}
          >
            <div className="text-3xl">{item.emoji}</div>
            <div className="mt-1 text-sm font-bold text-slate-700">{item.ar}</div>
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row mt-3 rounded-3xl border-2 border-white bg-white p-4 text-center">
        <En className="text-xl font-black text-teal-950">{SCENE_21.items[active].en}</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={SCENE_21.nowDescribe} />
      </div>
      <div className="mt-2 space-y-2">
        {SCENE_21.items.map((item) => (
          <En key={item.en} className="block rounded-2xl border-2 border-slate-100 bg-white p-2.5 text-center text-base font-black text-slate-900">
            {item.en}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 25. سؤال وجواب داخل وصف المكان
// ============================================================
function SceneQA() {
  const [picked, setPicked] = useState<Record<number, "yes" | "no">>({});
  return (
    <LabPanel emoji="💬" label="SCENE Q & A" ar="اسأل عن المشهد وأجب" seq="l21-scene-qa">
      <div className="space-y-2">
        {SCENE_QA_21.pairs.map((pair, i) => {
          const choice = picked[i];
          const expectYes = pair.a.startsWith("Yes");
          const right = choice === (expectYes ? "yes" : "no");
          return (
            <div key={pair.q} className={`rounded-3xl border-2 p-3 transition ${choice ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">A</span>
                <En className="flex-1 text-left text-base font-black text-slate-900">{pair.q}</En>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 pr-11">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setPicked((s) => ({ ...s, [i]: option }))}
                    className={`font-en rounded-xl border-2 px-4 py-1.5 text-sm font-black transition ${
                      choice === option
                        ? right
                          ? "border-transparent bg-emerald-600 text-white"
                          : "border-transparent bg-rose-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-teal-400"
                    }`}
                  >
                    {option === "yes" ? "Yes" : "No"}
                  </button>
                ))}
                {choice && <En className={`text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓" : "✕"}</En>}
              </div>
              {choice && (
                <div dir="ltr" className="ltr-row mt-2 pr-11">
                  <En className="rounded-xl bg-white px-3 py-1.5 text-base font-black text-slate-900">
                    B: {pair.a}
                  </En>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 26. SCENE INVESTIGATION — IQ200: وصف ثم تحقيق
// ============================================================
function Investigation() {
  const [picked, setPicked] = useState<Record<number, "yes" | "no">>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🔦" label="SCENE INVESTIGATION" ar="احقق في الغرفة ثم أجب عن الأسئلة" seq="l21-investigation">
      <div className="text-center text-base font-black text-amber-800">
        <Rich text={INVESTIGATION_21.title} />
      </div>
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={INVESTIGATION_21.roomLabel} />
      </div>
      <div className="mt-2 grid gap-1.5 rounded-3xl border-2 border-white bg-white p-3 sm:grid-cols-2">
        {INVESTIGATION_21.scene.map((line) => (
          <En key={line} className="text-left text-sm font-black text-slate-800">
            {line}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={INVESTIGATION_21.askLabel} />
      </div>
      <div className="mt-2 space-y-2">
        {INVESTIGATION_21.questions.map((question, i) => {
          const choice = picked[i];
          const expectYes = INVESTIGATION_21.answers[i].startsWith("Yes");
          const right = choice === (expectYes ? "yes" : "no");
          const shown = revealed.has(i);
          return (
            <div key={question} className={`rounded-2xl border-2 p-3 transition ${choice ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-500 text-sm font-bold text-white">{["①", "②", "③", "④", "⑤", "⑥"][i]}</span>
                <En className="flex-1 text-left text-base font-black text-slate-900">{question}</En>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 pr-11">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setPicked((s) => ({ ...s, [i]: option }))}
                    className={`font-en rounded-xl border-2 px-4 py-1.5 text-sm font-black transition ${
                      choice === option
                        ? right
                          ? "border-transparent bg-emerald-600 text-white"
                          : "border-transparent bg-rose-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-amber-400"
                    }`}
                  >
                    {option === "yes" ? "Yes" : "No"}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setRevealed((s) => {
                      const next = new Set(s);
                      next.has(i) ? next.delete(i) : next.add(i);
                      return next;
                    })
                  }
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-amber-300"
                >
                  {shown ? "إخفاء الإجابة" : "اكشف الإجابة"}
                </button>
              </div>
              {(shown || choice) && (
                <div dir="ltr" className="ltr-row mt-2 pr-11">
                  <En className="rounded-xl bg-white px-3 py-1.5 text-base font-black text-emerald-800">
                    {INVESTIGATION_21.answers[i]}
                  </En>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-600">
          <Rich text={INVESTIGATION_21.answersLabel} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {INVESTIGATION_21.answers.map((answer, i) => (
            <En key={i} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-900">
              {["①", "②", "③", "④", "⑤", "⑥"][i]} {answer}
            </En>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 27. COUNTABLE / UNCOUNTABLE INTRODUCTION
// ============================================================
function UncountableIntro() {
  return (
    <LabPanel emoji="💧" label="UNCOUNTABLE INTRO" ar="مقدمة: غير المعدود" seq="l21-uncountable">
      <div className="rounded-2xl bg-white p-3 text-center text-base font-bold text-slate-700">
        <Rich text={UNCOUNTABLE_21.advanced} />
      </div>
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={UNCOUNTABLE_21.lead} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {UNCOUNTABLE_21.words.map((word) => (
          <En key={word} className="rounded-xl border-2 border-sky-200 bg-white px-3 py-2 text-sm font-black text-sky-900">
            {word}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={UNCOUNTABLE_21.canSay} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {UNCOUNTABLE_21.examples.map((item) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} tone="focus" />
        ))}
      </div>
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
        <div className="text-center text-sm font-bold text-rose-700">
          <Rich text={UNCOUNTABLE_21.dontSay} />
        </div>
        <En className="mt-2 block rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-rose-700 line-through decoration-rose-400">
          {UNCOUNTABLE_21.wrong}
        </En>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={UNCOUNTABLE_21.because} />
        </div>
      </div>
      <div className="rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-600">
        <Rich text={UNCOUNTABLE_21.later} />
      </div>
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-black text-emerald-900">
        <Rich text={UNCOUNTABLE_21.but} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 28. There is مع a/an وsome
// ============================================================
function AnSomeCompare() {
  return (
    <LabPanel emoji="⚗️" label="A / AN vs SOME" ar="قارن: a/an أم some؟" seq="l21-an-some">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={A_AN_SOME_21.compare} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {A_AN_SOME_21.examples.map((item, i) => (
          <SourceLine key={item.en} en={item.en} ar={item.ar} tone={i % 2 === 0 ? "focus" : "neutral"} />
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 29. ترتيب الجملة
// ============================================================
function OrderBoard() {
  return (
    <LabPanel emoji="🧱" label="SENTENCE ORDER" ar="ترتيب الجملة" seq="l21-order">
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={ORDER_21.formulaLead} />
      </div>
      <div dir="ltr" className="mt-2 text-center">
        <En className="rounded-2xl bg-emerald-700 px-5 py-3 text-xl font-black text-white">{ORDER_21.formula}</En>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text={ORDER_21.exampleLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {ORDER_21.examples.map((ex) => (
          <En key={ex} className="block rounded-2xl border-2 border-slate-100 bg-white p-3 text-center text-lg font-black text-slate-900">
            {ex}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={ORDER_21.details} />
      </div>
      <SourceLine en={ORDER_21.detail.en} ar={ORDER_21.detail.ar} tone="focus" />
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">
          <Rich text={ORDER_21.hereTitle} />
        </div>
        <div className="mt-2">
          <FormulaStrip items={ORDER_21.parts} tone="amber" />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 30. ربطه بدرس الصفات
// ============================================================
function AdjectiveLink() {
  return (
    <LabPanel emoji="🎨" label="ADJECTIVE CONNECTION" ar="ربطه بدرس الصفات" seq="l21-adjective">
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={ADJECTIVE_LINK_21.learned} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {ADJECTIVE_LINK_21.learnedWords.map((word) => (
          <En key={word} className="rounded-xl border-2 border-violet-200 bg-white px-3 py-2 text-sm font-black text-violet-900">
            {word}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={ADJECTIVE_LINK_21.now} />
      </div>
      <div className="mt-2 grid gap-2">
        {ADJECTIVE_LINK_21.examples.map((ex) => (
          <En key={ex} className="block rounded-2xl border-2 border-slate-100 bg-white p-3 text-center text-lg font-black text-slate-900">
            {ex}
          </En>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 31. POSSESSION CONNECTION LAB
// ============================================================
function PossessionLink() {
  return (
    <LabPanel emoji="🔗" label="POSSESSION CONNECTION LAB" ar="ربطه بملكية الأسماء" seq="l21-possession">
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={POSSESSION_LINK_21.learned} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
        {POSSESSION_LINK_21.learnedWords.map((word) => (
          <En key={word} className="rounded-xl border-2 border-amber-200 bg-white px-3 py-2 text-sm font-black text-amber-900">
            {word}
          </En>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-slate-600">
        <Rich text={POSSESSION_LINK_21.now} />
      </div>
      <div className="mt-2 grid gap-2">
        {POSSESSION_LINK_21.examples.map((ex) => (
          <En key={ex} className="block rounded-2xl border-2 border-amber-100 bg-amber-50 p-3 text-center text-lg font-black text-amber-950">
            {ex}
          </En>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-600">
        <Rich text={POSSESSION_LINK_21.note} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 32. DEMONSTRATIVE CONNECTION LAB (درس 20 → درس 21)
// ============================================================
function DemonstrativeLink() {
  return (
    <LabPanel emoji="🛰️" label="DEMONSTRATIVE CONNECTION LAB" ar="جسر درس 20: الإشارة" seq="l21-demonstrative">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={DEMONSTRATIVE_LINK_21.strong} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-3">
          <div className="text-sm font-bold text-slate-600">
            <Rich text={DEMONSTRATIVE_LINK_21.nearBook} />
          </div>
          <div className="mt-2 text-xs font-bold text-slate-500">
            <Rich text={DEMONSTRATIVE_LINK_21.canSay} />
          </div>
          <En className="mt-1 block rounded-xl bg-emerald-50 p-2 text-left text-base font-black text-emerald-950">
            {DEMONSTRATIVE_LINK_21.nearBookEn}
          </En>
          <div className="mt-2 text-xs font-bold text-slate-500">
            <Rich text={DEMONSTRATIVE_LINK_21.pointTo} />
          </div>
          <En className="mt-1 block rounded-xl bg-indigo-50 p-2 text-left text-base font-black text-indigo-950">
            {DEMONSTRATIVE_LINK_21.thisIsTheBook.en}
          </En>
          <div className="mt-1 text-xs font-bold text-slate-500">
            <Rich text={DEMONSTRATIVE_LINK_21.thisIsTheBook.ar} />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-200 bg-white p-3">
          <div className="text-sm font-bold text-slate-600">
            <Rich text={DEMONSTRATIVE_LINK_21.farBooks} />
          </div>
          <En className="mt-1 block rounded-xl bg-amber-50 p-2 text-left text-base font-black text-amber-950">
            {DEMONSTRATIVE_LINK_21.farBooksEn}
          </En>
          <div className="mt-2 text-xs font-bold text-slate-500">
            <Rich text={DEMONSTRATIVE_LINK_21.pointToThem} />
          </div>
          <En className="mt-1 block rounded-xl bg-indigo-50 p-2 text-left text-base font-black text-indigo-950">
            {DEMONSTRATIVE_LINK_21.theseAreTheBooks.en}
          </En>
          <div className="mt-1 text-xs font-bold text-slate-500">
            <Rich text={DEMONSTRATIVE_LINK_21.theseAreTheBooks.ar} />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3">
        <div className="text-center text-sm font-bold text-indigo-900">
          <Rich text={DEMONSTRATIVE_LINK_21.far} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          <En className="rounded-xl bg-white px-3 py-2 text-base font-black text-indigo-900">{DEMONSTRATIVE_LINK_21.thatIs}</En>
          <En className="rounded-xl bg-white px-3 py-2 text-base font-black text-indigo-900">{DEMONSTRATIVE_LINK_21.thoseAre}</En>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-white p-3">
        <div className="text-center text-sm font-black text-teal-800">
          <Rich text={DEMONSTRATIVE_LINK_21.thereforeTitle} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {DEMONSTRATIVE_LINK_21.therefore.map((item) => (
            <div key={item.en} className="rounded-xl bg-teal-50 p-2.5">
              <En className="block text-left text-base font-black text-slate-900">{item.en}</En>
              <div className="mt-1 text-sm font-bold text-slate-600">
                <Rich text={item.ar} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 33. THREE-STEP SCENE CHAIN
// ============================================================
function SceneChain() {
  return (
    <LabPanel emoji="🚗" label="SCENE CHAIN" ar="من الوجود إلى الملكية — سلسلة واحدة" seq="l21-chain">
      <div className="space-y-2">
        {SCENE_CHAIN_21.chain.map((step, i) => (
          <div key={step.en} className="flex items-start gap-3 rounded-3xl border-2 border-white bg-white p-3">
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black text-white ${i === 0 ? "bg-emerald-600" : i === 1 ? "bg-indigo-600" : i === 2 ? "bg-violet-600" : "bg-amber-500"}`}>
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-2">
                <En className="text-base font-black text-slate-900 md:text-lg">{step.en}</En>
              </div>
              <div className="mt-1 text-sm font-bold text-slate-500">
                <Rich text={step.ar} />
              </div>
              <span className="mt-1.5 inline-block rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                {step.role} · <En className="text-xs">{step.roleEn}</En>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center text-sm font-bold text-amber-900">
        <Rich text={SCENE_CHAIN_21.closing} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 34. "DON'T SAY IT!" ERROR DETECTOR
// ============================================================
function ErrorDetector() {
  const [focused, setFocused] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🚨" label="DON'T SAY IT! — ERROR DETECTOR" ar="كاشف الأخطاء: اضغط للتركيز على التصحيح" seq="l21-errors">
      <div className="text-center text-base font-black text-rose-700">
        <Rich text={COMMON_ERRORS_21.title} />
      </div>
      <div className="mt-2 space-y-2">
        {COMMON_ERRORS_21.errors.map((error, i) => {
          const shown = focused.has(i);
          return (
            <div key={error.n} className={`rounded-3xl border-2 p-3 transition ${shown ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{error.label}</span>
                <div className="min-w-0 flex-1">
                  <div dir="ltr" className="ltr-row">
                    <En className="text-left text-base font-black text-rose-700 line-through decoration-rose-300">
                      {error.wrong}
                    </En>
                  </div>
                  {"wrongQ" in error && error.wrongQ && (
                    <div dir="ltr" className="ltr-row mt-1 flex flex-wrap items-center gap-2">
                      <Rich text={error.wrongNote ?? ""} className="text-xs font-bold text-slate-500" />
                      <En className="rounded-lg bg-rose-50 px-2 py-0.5 text-sm font-black text-rose-800">{error.wrongQ}</En>
                      <En className="text-sm font-black text-rose-600">{error.wrongMark}</En>
                    </div>
                  )}
                  <div className={`mt-2 rounded-xl border-2 px-3 py-2 transition ${shown ? "border-emerald-300 bg-emerald-50 ring-2 ring-emerald-300" : "border-emerald-100 bg-emerald-50/50"}`}>
                    {"correctNote" in error && error.correctNote && (
                      <div className="text-xs font-bold text-slate-500">
                        <Rich text={error.correctNote} />
                      </div>
                    )}
                    <En className="block text-left text-base font-black text-emerald-800">
                      {error.correct}
                    </En>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setFocused((s) => {
                      const next = new Set(s);
                      next.has(i) ? next.delete(i) : next.add(i);
                      return next;
                    })
                  }
                  className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition ${shown ? "border-2 border-emerald-300 bg-white text-emerald-700" : "bg-rose-600 text-white"}`}
                >
                  {shown ? "إخفاء" : "ركّز"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 35–44. التحديات التفاعلية
// ============================================================
type CorrectionItem = { readonly n: string; readonly wrong: string; readonly correct: string };

function DetectiveEx() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\u2019/g, "'").replace(/\s+/g, " ").replace(/[.?!؟]+$/g, "").replace(/\s+$/g, "");
  const score = GRAMMAR_DETECTIVE_21.sentences.reduce(
    (sum, item, i) => sum + (checked.has(i) && normalize(typed[i] ?? "") === normalize(item.correct) ? 1 : 0),
    0
  );
  return (
    <div className="space-y-4" data-en-seq="l21-detective">
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center text-base font-bold text-emerald-900">
        <Rich text={GRAMMAR_DETECTIVE_21.intro} />
      </div>
      <div className="space-y-3">
        {GRAMMAR_DETECTIVE_21.sentences.map((item, i) => {
          const done = checked.has(i);
          const right = done && normalize(typed[i] ?? "") === normalize(item.correct);
          const shown = revealed.has(i);
          return (
            <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{item.n}</span>
                <div className="min-w-0 flex-1">
                  <En className="block text-left text-base font-extrabold text-rose-700 line-through decoration-rose-300">{item.wrong}</En>
                  {"wrongQ" in item && item.wrongQ && (
                    <div dir="ltr" className="ltr-row mt-1 flex flex-wrap items-center gap-2">
                      <Rich text={item.wrongNote ?? ""} className="text-xs font-bold text-slate-500" />
                      <En className="rounded-lg bg-rose-50 px-2 py-0.5 text-sm font-black text-rose-800">{item.wrongQ}</En>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                <input
                  dir="ltr"
                  value={typed[i] ?? ""}
                  onChange={(event) => setTyped((state) => ({ ...state, [i]: event.target.value }))}
                  placeholder="اكتب الجملة الصحيحة..."
                  className="font-en w-full min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none focus:border-emerald-400 sm:max-w-md"
                />
                <button onClick={() => setChecked((s) => new Set(s).add(i))} className="rounded-xl bg-emerald-700 px-3 py-2 text-sm font-bold text-white transition hover:brightness-110">تحقق</button>
                <button onClick={() => setRevealed((s) => new Set(s).add(i))} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-emerald-300">اكشف الحل</button>
              </div>
              {done && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓ أحسنت!" : "✕ حاول مجددًا أو اكشف الحل."}</div>}
              {shown && (
                <div dir="ltr" className="ltr-row mt-3 pr-11">
                  <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                    {item.correct} ✅
                  </En>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-3 text-center text-sm font-bold text-emerald-800">النتيجة: {score} / {GRAMMAR_DETECTIVE_21.sentences.length}</div>
    </div>
  );
}

function SolutionsEx() {
  return (
    <div className="space-y-3" data-en-seq="l21-solutions">
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center text-base font-bold text-emerald-900">
        الحل الكامل لجمل المحقق
      </div>
      <div className="grid gap-2">
        {SOLUTIONS_21.map((solution, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{GRAMMAR_DETECTIVE_21.sentences[i].n}</span>
            <En className="text-left text-base font-black text-emerald-900 md:text-lg">{solution}</En>
          </div>
        ))}
      </div>
    </div>
  );
}

function Challenge1Ex() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = CHALLENGE1_21.questions.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-4" data-en-seq="l21-challenge1">
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center">
        <Rich text={CHALLENGE1_21.intro} className="text-base font-bold text-slate-700" />
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {CHALLENGE1_21.words.map((word) => (
            <En key={word} className="rounded-xl bg-emerald-700 px-4 py-2 text-base font-black text-white">
              {word}
            </En>
          ))}
        </div>
      </div>
      {CHALLENGE1_21.questions.map((item, i) => {
        const choice = picked[i];
        const complete = choice !== undefined;
        const right = choice === item.answer;
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${complete ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {CHALLENGE1_21.options.map((option, oi) => {
                const selected = choice === oi;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-emerald-400";
                return (
                  <button key={option} onClick={() => setPicked((state) => ({ ...state, [i]: oi }))} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}>
                    {option}
                  </button>
                );
              })}
            </div>
            {complete && (
              <div dir="ltr" className={`ltr-row mt-2 pr-11 text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>
                <En>{right ? "✓ صحيح!" : `✕ الصحيح: ${CHALLENGE1_21.options[item.answer]}`}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-3 text-center text-sm font-bold text-emerald-800">النتيجة: {score} / {CHALLENGE1_21.questions.length}</div>
    </div>
  );
}

function Challenge2Ex() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = CHALLENGE2_21.questions.reduce((sum, item, i) => sum + (picked[i] === item.answer ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq="l21-challenge2">
      {CHALLENGE2_21.questions.map((item, i) => {
        const choice = picked[i];
        const right = choice === item.answer;
        const options = [item.a, item.b];
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${choice !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.stem}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-3 flex flex-wrap gap-2 pr-11">
              {options.map((option, oi) => {
                const selected = choice === oi;
                const cls = selected ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-teal-400";
                return (
                  <button key={option} onClick={() => setPicked((state) => ({ ...state, [i]: oi }))} className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition ${cls}`}>
                    {oi === 0 ? "A" : "B"}
                    {") " + option}
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
      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">النتيجة: {score} / {CHALLENGE2_21.questions.length}</div>
    </div>
  );
}

function TransformEx({
  items,
  accent,
  accentBg,
  seq,
  placeholder,
}: {
  items: readonly { readonly n: string; readonly source: string; readonly answers: readonly string[] }[];
  accent: string;
  accentBg: string;
  seq: string;
  placeholder: string;
}) {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\u2019/g, "'").replace(/\s+/g, " ").replace(/[.?!؟]+$/g, "").replace(/\s+$/g, "");
  const accepted = (item: { answers: readonly string[] }, value: string) => item.answers.some((a) => normalize(a) === normalize(value));
  const score = items.reduce((sum, item, i) => sum + (checked.has(i) && accepted(item, typed[i] ?? "") ? 1 : 0), 0);
  return (
    <div className="space-y-3" data-en-seq={seq}>
      {items.map((item, i) => {
        const done = checked.has(i);
        const right = done && accepted(item, typed[i] ?? "");
        const shown = revealed.has(i);
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-4 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center gap-3">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${accentBg}`}>{item.n}</span>
              <En className="text-left text-base font-extrabold text-slate-900">{item.source}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-2 flex items-center gap-2 pr-11">
              <En className="text-xl font-black text-slate-400">→</En>
              <input
                dir="ltr"
                value={typed[i] ?? ""}
                onChange={(event) => setTyped((state) => ({ ...state, [i]: event.target.value }))}
                placeholder={placeholder}
                className="font-en w-full min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none focus:border-emerald-400"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
              <button onClick={() => setChecked((s) => new Set(s).add(i))} className={`rounded-xl px-3 py-2 text-sm font-bold text-white transition hover:brightness-110 ${accent}`}>تحقق</button>
              <button onClick={() => setRevealed((s) => new Set(s).add(i))} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-emerald-300">اكشف</button>
            </div>
            {done && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓ أحسنت!" : "✕ حاول مجددًا أو اكشف."}</div>}
            {shown && (
              <div dir="ltr" className="ltr-row mt-3 pr-11">
                <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-base font-black text-emerald-800">
                  {item.answers[0]}
                </En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50 p-3 text-center text-sm font-bold text-emerald-800">النتيجة: {score} / {items.length}</div>
    </div>
  );
}

function IQ200Ex() {
  const [sentences, setSentences] = useState<Record<number, string>>({});
  const [checkedSentences, setCheckedSentences] = useState<Set<number>>(new Set());
  const [questions, setQuestions] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());
  const [negatives, setNegatives] = useState<Record<number, string>>({});
  const [checkedNegatives, setCheckedNegatives] = useState<Set<number>>(new Set());
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\u2019/g, "'").replace(/\s+/g, " ");

  const nounKey = (value: string) => {
    const s = value.toLowerCase();
    if (s.includes("child")) return "child";
    if (s.includes("woman")) return "woman";
    if (s.includes("mouse")) return "mouse";
    return null;
  };

  const sentenceOk = (i: number, value: string) => {
    const g = IQ200_CHALLENGE_21.given[i];
    const v = normalize(value);
    if (!v) return false;
    const verbOk = g.singular ? /^there is\b/.test(v) : /^there are\b/.test(v);
    return verbOk && v.includes(g.en.toLowerCase());
  };
  const questionOk = (value: string) => {
    const v = normalize(value);
    return v.endsWith("?") && /^(is there|are there)\b/.test(v) && nounKey(v) !== null;
  };
  const negativeOk = (value: string) => {
    const v = normalize(value);
    return /^there (isn't|aren't|is not|are not)\b/.test(v) && nounKey(v) !== null;
  };
  const distinctKeys = (values: (string | undefined)[]) => new Set(values.map((v) => (v ? nounKey(v) : null)).filter((k): k is string => k !== null)).size;

  const qKeysOk = distinctKeys([questions[0], questions[1], questions[2]]) === 3;
  const nKeysOk = distinctKeys([negatives[0], negatives[1], negatives[2]]) === 3;

  return (
    <div className="space-y-4" data-en-seq="l21-iq200">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4">
        <div className="text-center text-lg font-black text-fuchsia-900">
          <Rich text={IQ200_CHALLENGE_21.dontMemorize} /> <Rich text={IQ200_CHALLENGE_21.logic} />
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={IQ200_CHALLENGE_21.givenLabel} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {IQ200_CHALLENGE_21.given.map((g) => (
            <En key={g.en} className={`rounded-xl px-3 py-1.5 text-sm font-black ${g.singular ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}>
              {g.en}
            </En>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={IQ200_CHALLENGE_21.task1} />
        </div>
        <div dir="ltr" className="ltr-row mt-1 flex flex-wrap justify-center gap-2">
          {IQ200_CHALLENGE_21.useWords.map((word) => (
            <En key={word} className="rounded-lg bg-emerald-700 px-3 py-1 text-sm font-black text-white">
              {word}
            </En>
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {IQ200_CHALLENGE_21.given.map((g, i) => {
            const done = checkedSentences.has(i);
            const right = done && sentenceOk(i, sentences[i] ?? "");
            return (
              <div key={g.en} className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-3 ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
                <En className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">{g.en}</En>
                <input
                  dir="ltr"
                  value={sentences[i] ?? ""}
                  onChange={(event) => setSentences((state) => ({ ...state, [i]: event.target.value }))}
                  placeholder="اكتب الجملة..."
                  className="font-en min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-left text-sm font-bold outline-none focus:border-emerald-400"
                />
                <button onClick={() => setCheckedSentences((s) => new Set(s).add(i))} className="rounded-xl bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white">تحقق</button>
                {done && <En className={`text-xs font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓" : "✕"}</En>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl border-2 border-amber-200 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={IQ200_CHALLENGE_21.task2} />
        </div>
        <div className="mt-2 space-y-2">
          {[0, 1, 2].map((i) => {
            const done = checkedQuestions.has(i);
            const right = done && questionOk(questions[i] ?? "");
            return (
              <div key={i} className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-3 ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
                <En className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-900">S → ?</En>
                <input
                  dir="ltr"
                  value={questions[i] ?? ""}
                  onChange={(event) => setQuestions((state) => ({ ...state, [i]: event.target.value }))}
                  placeholder="حوّل جملة إلى سؤال..."
                  className="font-en min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-left text-sm font-bold outline-none focus:border-amber-400"
                />
                <button onClick={() => setCheckedQuestions((s) => new Set(s).add(i))} className="rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white">تحقق</button>
                {done && <En className={`text-xs font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓" : "✕"}</En>}
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-center text-xs font-bold text-amber-700">اجعل أسئلتك الثلاثة عن ثلاثة أنواع مختلفة من المعطيات.</div>
      </div>
      <div className="rounded-2xl border-2 border-rose-200 bg-white p-3">
        <div className="text-center text-sm font-bold text-slate-700">
          <Rich text={IQ200_CHALLENGE_21.task3} />
        </div>
        <div className="mt-2 space-y-2">
          {[0, 1, 2].map((i) => {
            const done = checkedNegatives.has(i);
            const right = done && negativeOk(negatives[i] ?? "");
            return (
              <div key={i} className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-3 ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
                <En className="rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-black text-rose-900">S → !</En>
                <input
                  dir="ltr"
                  value={negatives[i] ?? ""}
                  onChange={(event) => setNegatives((state) => ({ ...state, [i]: event.target.value }))}
                  placeholder="حوّل جملة إلى نفي..."
                  className="font-en min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-left text-sm font-bold outline-none focus:border-rose-400"
                />
                <button onClick={() => setCheckedNegatives((s) => new Set(s).add(i))} className="rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-bold text-white">تحقق</button>
                {done && <En className={`text-xs font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓" : "✕"}</En>}
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-center text-xs font-bold text-rose-700">اجعل نفوك الثلاثة عن ثلاثة أنواع مختلفة من المعطيات.</div>
      </div>
      <div className="rounded-2xl border-2 border-fuchsia-100 bg-fuchsia-50 p-3 text-center text-sm font-bold text-fuchsia-800">
        {qKeysOk && nKeysOk ? "🏆 تغطية كاملة: 3 أسئلة + 3 نفي عن ثلاثة أنواع مختلفة!" : "أكمل التغطية: كل نوع (child / woman / mouse) يجب أن يظهر في الأسئلة والنفي."}
      </div>
    </div>
  );
}

function KitchenEx() {
  const [picked, setPicked] = useState<Record<number, "yes" | "no">>({});
  const [newQ, setNewQ] = useState<Record<number, string>>({});
  const [checkedNew, setCheckedNew] = useState<Set<number>>(new Set());
  const newQOk = (value: string) => {
    const v = value.trim().toLowerCase().replace(/\s+/g, " ");
    return v.endsWith("?") && /^(is there|are there)\b/.test(v) && v.length > 8;
  };
  return (
    <div className="space-y-4" data-en-seq="l21-kitchen">
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-4">
        <div className="text-center text-base font-bold text-slate-700">
          <Rich text={KITCHEN_21.placeLabel} />
        </div>
        <div className="mt-2 grid gap-1.5 rounded-2xl border-2 border-white bg-white p-3 sm:grid-cols-2">
          {KITCHEN_21.scene.map((line) => (
            <En key={line} className="text-left text-sm font-black text-slate-800">
              {line}
            </En>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {KITCHEN_21.questions.map((question, i) => {
          const choice = picked[i];
          const expectYes = KITCHEN_21.answers[i].startsWith("Yes");
          const right = choice === (expectYes ? "yes" : "no");
          return (
            <div key={question} className={`rounded-2xl border-2 p-3 transition ${choice ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{["①", "②", "③", "④", "⑤", "⑥"][i]}</span>
                <En className="flex-1 text-left text-base font-black text-slate-900">{question}</En>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 pr-11">
                {(["yes", "no"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setPicked((s) => ({ ...s, [i]: option }))}
                    className={`font-en rounded-xl border-2 px-4 py-1.5 text-sm font-black transition ${
                      choice === option
                        ? right
                          ? "border-transparent bg-emerald-600 text-white"
                          : "border-transparent bg-rose-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-teal-400"
                    }`}
                  >
                    {option === "yes" ? "Yes" : "No"}
                  </button>
                ))}
                {choice && <En className={`text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{KITCHEN_21.answers[i]}</En>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-3">
        <div className="text-center text-sm font-bold text-indigo-900">
          <Rich text={KITCHEN_21.newQuestions} />
        </div>
        <div className="mt-2 space-y-2">
          {[0, 1].map((i) => {
            const done = checkedNew.has(i);
            const right = done && newQOk(newQ[i] ?? "");
            return (
              <div key={i} className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-3 ${done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
                <input
                  dir="ltr"
                  value={newQ[i] ?? ""}
                  onChange={(event) => setNewQ((state) => ({ ...state, [i]: event.target.value }))}
                  placeholder="اكتب سؤالك الجديد..."
                  className="font-en min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-left text-sm font-bold outline-none focus:border-indigo-400"
                />
                <button onClick={() => setCheckedNew((s) => new Set(s).add(i))} className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white">تحقق</button>
                {done && <En className={`text-xs font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓ سؤال صحيح!" : "✕ ابدأ بـ Is there / Are there وانهِ بـ ؟"}</En>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FinalBossEx() {
  const [checkedReq, setCheckedReq] = useState<Set<number>>(new Set());
  const [text, setText] = useState("");
  const sentenceCount = (text.match(/[.?!]+/g) || []).length;
  return (
    <div className="space-y-4" data-en-seq="l21-final-boss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-lg font-black text-amber-900">🏆 FINAL BOSS</div>
        <div className="mt-2 text-center text-base font-bold text-slate-700">
          <Rich text={FINAL_BOSS_21.intro} />
        </div>
        <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
          <div className="text-center text-sm font-bold text-slate-600">
            <Rich text={FINAL_BOSS_21.infoLabel} />
          </div>
          <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {FINAL_BOSS_21.clues.map((clue) => (
              <div key={clue} className="rounded-xl bg-slate-50 p-2.5 text-sm font-bold text-slate-700">
                <span className="ml-1">🕵️</span>
                <Rich text={clue} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
        <div className="text-center text-base font-bold text-slate-800">
          <Rich text={FINAL_BOSS_21.taskLead} />
        </div>
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {FINAL_BOSS_21.useWords.map((word) => (
            <En key={word} className="rounded-xl bg-indigo-600 px-4 py-2 text-lg font-black text-white">
              {word}
            </En>
          ))}
        </div>
        <div className="mt-3 text-center text-sm font-bold text-slate-600">
          <Rich text={FINAL_BOSS_21.tryLabel} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {FINAL_BOSS_21.requirements.map((req, i) => {
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
          placeholder="Write your 8-sentence paragraph here..."
          className="font-en mt-3 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-indigo-400"
        />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 text-sm font-bold text-slate-600">
          <span>عدد جمل فقرة: {sentenceCount} / 8</span>
          <span>متطلبات تم تحديدها: {checkedReq.size} / {FINAL_BOSS_21.requirements.length}</span>
        </div>
      </div>
    </div>
  );
}

function ExerciseView({ exercise }: { exercise: Exercise21 }) {
  switch (exercise.type) {
    case "detective": return <DetectiveEx />;
    case "solutions": return <SolutionsEx />;
    case "challenge1": return <Challenge1Ex />;
    case "challenge2": return <Challenge2Ex />;
    case "challenge3":
      return (
        <div className="space-y-3">
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4 text-center text-base font-bold text-emerald-900">
            <Rich text={CHALLENGE3_21.intro} />
          </div>
          <TransformEx items={CHALLENGE3_21.sentences} accent="bg-emerald-700" accentBg="bg-emerald-700" seq="l21-challenge3" placeholder="اكتب الجملة المنفية..." />
        </div>
      );
    case "challenge4":
      return (
        <div className="space-y-3">
          <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-4 text-center text-base font-bold text-teal-900">
            <Rich text={CHALLENGE4_21.intro} />
          </div>
          <TransformEx items={CHALLENGE4_21.sentences} accent="bg-teal-600" accentBg="bg-teal-600" seq="l21-challenge4" placeholder="اكتب السؤال..." />
        </div>
      );
    case "iq200": return <IQ200Ex />;
    case "iq200b": return <KitchenEx />;
    case "finalBoss": return <FinalBossEx />;
  }
}

function BlockView({ block }: { block: Block21 }) {
  switch (block.type) {
    case "text": return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english": return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "mixed": return <MixedLine text={block.text} />;
    case "note": return <Note emoji={block.emoji} text={block.text} />;
    case "formulaStrip": return <FormulaStrip items={block.items} />;
    case "existenceDetector": return <ExistenceDetector />;
    case "meaningBoard": return <MeaningBoard />;
    case "whyRule": return <WhyRuleBoard />;
    case "thinkingBoard": return <ThinkingBoard />;
    case "singularExamples": return <SingularExamples />;
    case "aanDetector": return <AanDetector />;
    case "pluralExamples": return <PluralExamples />;
    case "irregularPanel": return <IrregularPanel />;
    case "locationLab": return <LocationLab />;
    case "pluralLocation": return <PluralLocation />;
    case "constructionMachine": return <ConstructionMachine />;
    case "negativeTransformer": return <NegativeTransformer />;
    case "contractions": return <ContractionsBoard />;
    case "questionMachine": return <QuestionMachine />;
    case "shortAnswerBridge": return <ShortAnswerBridge />;
    case "mistakeSpot": return <MistakeSpot />;
    case "isVsItIs": return <IsVsItIsLab />;
    case "thisVsThere": return <ThisVsThereLab />;
    case "somePlural": return <SomePluralBoard />;
    case "anySystem": return <AnySystem />;
    case "someSingular": return <SomeSingularBoard />;
    case "quantityLab": return <QuantityLab />;
    case "bigQuantities": return <BigQuantities />;
    case "roomBuilder": return <RoomBuilder />;
    case "sceneDescription": return <SceneDescription />;
    case "sceneQA": return <SceneQA />;
    case "investigation": return <Investigation />;
    case "uncountableIntro": return <UncountableIntro />;
    case "anSomeCompare": return <AnSomeCompare />;
    case "orderBoard": return <OrderBoard />;
    case "adjectiveLink": return <AdjectiveLink />;
    case "possessionLink": return <PossessionLink />;
    case "demonstrativeLink": return <DemonstrativeLink />;
    case "sceneChain": return <SceneChain />;
    case "errorDetector": return <ErrorDetector />;
  }
}

// ============================================================
// الغلاف والخاتمة المصدرية
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-24 w-24 place-items-center rounded-3xl bg-white/15 text-5xl ring-4 ring-white/25">🕵️</div>
        <div>
          <div dir="ltr" className="inline-flex items-center rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
            <En className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-200">{LAB_NAME_21}</En>
          </div>
          <h1 className="font-head mt-3 text-3xl font-bold md:text-4xl">
            <Rich text={LESSON_TITLE_21} />
          </h1>
          <En className="mt-1 block text-xl font-bold text-emerald-200">{LESSON_SUBTITLE_21}</En>
        </div>
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-lg font-bold text-emerald-50">
        <Rich text={LESSON_ARABIC_TITLE_21} />
      </div>
      <div className="mt-4 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-emerald-50">
        <Rich text={COVER_INTRO_21} />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {COVER_INTRO_LIST_21.map((item) => (
            <span key={item} className="rounded-lg bg-white/10 px-2.5 py-1 text-sm font-bold">
              <Rich text={item} />
            </span>
          ))}
        </div>
      </div>
      <div dir="ltr" className="ltr-row mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white/10 p-4">
          <div dir="rtl" className="text-sm font-bold text-emerald-200">
            <Rich text={COVER_FROM_21.label} />
          </div>
          <En className="mt-2 block text-xl font-black text-white">{COVER_FROM_21.en}</En>
          <div dir="rtl" className="mt-1 text-sm font-bold text-emerald-100">
            <Rich text={COVER_FROM_21.ar} />
          </div>
        </div>
        <div className="rounded-2xl bg-white/15 p-4 ring-2 ring-emerald-400/40">
          <div dir="rtl" className="text-sm font-bold text-emerald-200">
            <Rich text={COVER_TO_21.label} />
          </div>
          <En className="mt-2 block text-xl font-black text-emerald-200">{COVER_TO_21.en}</En>
          <div dir="rtl" className="mt-1 text-sm font-bold text-emerald-100">
            <Rich text={COVER_TO_21.ar} />
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-emerald-100">
        <Rich text={COVER_NOTE_21} />
      </div>
      <div dir="ltr" className="ltr-row mt-5 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/10 p-4">
        <En className="rounded-xl bg-emerald-400 px-3 py-2 text-sm font-black text-emerald-950">There is</En>
        <En className="rounded-xl bg-amber-400 px-3 py-2 text-sm font-black text-amber-950">There are</En>
        <En className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">There isn't</En>
        <En className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">There aren't</En>
        <En className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">Is there...?</En>
        <En className="rounded-xl bg-white/20 px-3 py-2 text-sm font-black">Are there...?</En>
      </div>
      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-emerald-100">
        <Rich text={LAB_MOTTO_21} />
      </div>
    </div>
  );
}

function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس ستكون قادرًا على:">
      <div className="grid gap-2">
        {OBJECTIVES_21.map((objective) => (
          <div key={objective.n} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/60 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{objective.n}</span>
              <Rich text={objective.text} className="font-semibold text-slate-800" />
            </div>
            {"items" in objective && objective.items && (
              <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2 pr-11">
                {objective.items.map((item) => (
                  <span key={item} className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-emerald-900">
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

function Summary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[44]} title="الخلاصة الذهبية">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={GOLDEN_SUMMARY_21.ifLabel} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {GOLDEN_SUMMARY_21.rows.map((row) => (
          <div key={row.en} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-200 bg-white p-3">
            <Rich text={row.ar} className="text-base font-bold text-slate-700" />
            <En className="rounded-xl bg-emerald-600 px-3 py-1.5 text-lg font-black text-white">{row.en}</En>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4">
        <div className="text-center text-base font-black text-rose-900">
          <Rich text={GOLDEN_SUMMARY_21.negLabel} />
        </div>
        <div className="mt-2">
          <FormulaStrip items={GOLDEN_SUMMARY_21.negatives} tone="rose" />
        </div>
      </div>
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-4">
        <div className="text-center text-base font-black text-teal-900">
          <Rich text={GOLDEN_SUMMARY_21.qLabel} />
        </div>
        <div className="mt-2">
          <FormulaStrip items={GOLDEN_SUMMARY_21.questions} tone="teal" />
        </div>
      </div>
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
        <div className="text-center text-base font-black text-emerald-900">
          <Rich text={GOLDEN_SUMMARY_21.aLabel} />
        </div>
        <div className="mt-2">
          <FormulaStrip items={GOLDEN_SUMMARY_21.answers} tone="emerald" />
        </div>
      </div>
    </Frame>
  );
}

function MindMap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[45]} title="الخريطة العقلية">
      <div className="grid gap-2 sm:grid-cols-2">
        {MINDMAP_21.map((row) => (
          <div key={row.label} dir="ltr" className="ltr-row rounded-2xl border-2 border-slate-100 bg-white p-3 text-center">
            <En className="text-base font-black text-slate-500">{row.label}</En>
            <div className="my-1 text-xl font-black text-emerald-500">↓</div>
            <En className="rounded-xl bg-emerald-700 px-4 py-1.5 text-lg font-black text-white">{row.answer}</En>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Reached() {
  return (
    <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[46]} title="الربط مع ما تعلمناه" lead={FINAL_SYSTEM_21.intro}>
      <div dir="ltr" className="rounded-3xl border-2 border-emerald-300 bg-gradient-to-l from-emerald-50 to-teal-50 p-5 text-center">
        <En className="block text-xl font-black text-emerald-950 md:text-2xl">{FINAL_SYSTEM_21.sentence}</En>
      </div>
      <div className="mt-4 text-center text-sm font-bold text-slate-600">
        <Rich text={FINAL_SYSTEM_21.breakLabel} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {FINAL_SYSTEM_21.parts.map((part, i) => (
          <div
            key={part.en}
            className={`rounded-2xl border-2 bg-white p-3 text-center ${
              i === 0 ? "border-emerald-300" : i === 1 ? "border-sky-200" : i === 2 ? "border-violet-200" : i === 3 ? "border-amber-200" : i === 4 ? "border-teal-200" : "border-rose-200"
            }`}
          >
            <En className="block text-base font-black text-slate-900">{part.en}</En>
            <div className="mt-1 text-xs font-bold text-slate-500">
              <Rich text={part.ar} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 text-center">
        <Rich text={FINAL_SYSTEM_21.closing1} className="block text-lg font-black text-amber-900" />
        <Rich text={FINAL_SYSTEM_21.closing2} className="mt-2 block text-base font-bold leading-relaxed text-slate-800" />
      </div>
    </Frame>
  );
}

function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[47]} title="خريطة المنهج">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_21.map((item) => (
          <div key={item.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${item.here ? "border-emerald-400 bg-emerald-100 shadow" : "border-slate-100 bg-white"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${item.here ? "bg-emerald-700" : "bg-slate-500"}`}>{item.n}</span>
            <En className={`text-left text-sm font-bold ${item.here ? "text-emerald-950" : "text-slate-700"}`}>{item.en}</En>
            {item.here && <span className="mr-auto text-lg">🔥</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5 text-center">
        <Rich text={ROADMAP_CLOSING_21} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" />
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 21.</h2>
      <div className="mt-4 text-lg leading-relaxed text-emerald-50">
        <Rich text="أصبحت منظومة وصف المشاهد عندك كاملة: اسأل ONE or MORE؟ ثم اختر There is أو There are، واربطها بالمكان والنفي والسؤال والإجابة القصيرة — وستجد أن الدروس السابقة كلها تعمل معًا داخل مشهد واحد." />
      </div>
      <div dir="ltr" className="ltr-row mt-5 flex flex-wrap justify-center gap-2">
        {MINDMAP_21.map((row) => (
          <En key={row.label} className="rounded-xl bg-white/15 px-3 py-2 text-sm font-black text-white">
            {row.label} ↓ {row.answer}
          </En>
        ))}
      </div>
      <div className="mt-5 rounded-2xl bg-white/10 p-4 text-center">
        <Rich text={ROADMAP_CLOSING_21} className="font-bold text-emerald-50" />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-emerald-800 transition hover:bg-emerald-50">← جميع الدروس</button>
      </div>
    </div>
  );
}

function sourceHeadingFor(slide: Slide21): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex];
}

export function SlideView21({ s, onExit }: { s: Slide21; onExit: () => void }) {
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
    case "summary": return <Summary />;
    case "mindmap": return <MindMap />;
    case "reached": return <Reached />;
    case "roadmap": return <Roadmap />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={<Rich text={s.title} />} lead="أسئلة جديدة تقيس: المفرد/الجمع، a/an، الأماكن، النفي، الأسئلة، Short Answers، some/any، الجمع الشاذ، غير المعدود، والمقارنات.">
          <FinalQuiz lesson={21} accent="bg-emerald-700" />
        </Frame>
      );
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide21): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-500",
  "الكاشف الأساسي": "text-emerald-700",
  "مفرد أم جمع؟": "text-teal-700",
  "الأماكن والتركيب": "text-cyan-700",
  "النفي والسؤال": "text-rose-700",
  "هويات الجملة": "text-indigo-700",
  "المسح والوصف": "text-amber-700",
  "المستوى المتقدم": "text-violet-700",
  "الربط بمنظومة الدروس": "text-blue-700",
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
          <Rich text="الدرس 21 · There is / There are" />
        </div>
        <En className="text-xs font-semibold text-emerald-700">🕵️ {LAB_NAME_21}</En>
        <div className="mt-2 rounded-lg bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">{SOURCE_NUMBERED_COUNT} قسمًا من المصدر · {SLIDES.length} شريحة</div>
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
                <button key={i} onClick={() => { setIndex(i); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-emerald-700 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
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

export default function Lesson21({ onExit }: { onExit: () => void }) {
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

  useEffect(() => { document.getElementById("l21-main")?.scrollTo({ top: 0 }); }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f0faf6] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"><Rail index={index} setIndex={setIndex} onExit={onExit} /></div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500"><Rich text={`${slide.section} · `} /><span className="text-slate-800"><Rich text={slideTitle(slide)} /></span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-l from-emerald-700 via-teal-600 to-amber-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{index + 1} / {total}</span>
          </header>
          <main id="l21-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10"><div key={index} className="pop mx-auto max-w-4xl"><SlideView21 s={slide} onExit={onExit} /></div></main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={navigation.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={navigation.next} disabled={index === total - 1} className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-emerald-800 disabled:opacity-30">التالي ←</button>
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
