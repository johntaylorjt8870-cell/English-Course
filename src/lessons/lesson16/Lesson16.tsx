import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  OBJECTIVES_16,
  CORE_MAP,
  ALL_POSSESSIVES,
  GOLDEN_FORMULAS,
  COMMON_ERRORS,
  FORM_ERRORS,
  I_MY_EXAMPLES,
  YOU_YOUR_EXAMPLES,
  HE_HIS_EXAMPLES,
  SHE_HER_EXAMPLES,
  ITS_EXAMPLES,
  WE_OUR_EXAMPLES,
  THEY_THEIR_EXAMPLES,
  CONNECTING_PRONOUNS,
  OWNERSHIP_TRACKING,
  SMART_EXAMPLE_15,
  IMPORTANT_EXAMPLE_16,
  IQ200_DOG,
  SINGULAR_FORMS,
  MINE_BRIDGE,
  NOUN_POSSESSION,
  NOUN_TO_ADJ,
  COMPARISON_23,
  IRREGULAR_PLURALS,
  FAMILY_25,
  GAME_26,
  LEVEL1_16,
  LEVEL2_16,
  LEVEL3_16,
  LEVEL4_16,
  SENTENCE_ANALYSIS_31,
  LEVEL6_16,
  DETECTIVE_PASSAGE_16,
  DETECTIVE_QUESTIONS_16,
  IQ200_16,
  HARDER_35,
  MINI_CONVO_16,
  FINAL_CHALLENGE_37,
  SUMMARY_16,
  ROADMAP_16,
  ROADMAP_16_NEXT,
  COVER_PLAN_16,
  type Block16,
  type Exercise16,
  type Slide16,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 16 — The Ownership Detective
// كل الإنجليزية LTR كاملة؛ لا نقسم الجملة إلى كلمات.
// ============================================================

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const clean = text.replace(/\*\*/g, "");
  const parts = clean.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const marked = part.match(/^\[\[(.+)\]\]$/);
        if (marked) {
          return (
            <span key={i} dir="ltr" style={{ direction: "ltr" }} className="ltr font-en rounded-lg bg-slate-900/5 px-1.5 py-0.5 font-bold text-slate-800">
              {marked[1]}
            </span>
          );
        }
        return <LatinRuns key={i} text={part} />;
      })}
    </span>
  );
}

function TextBlock({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <Rich text={text} />
    </div>
  );
}

function SourceLine({ en, ar, tone = "neutral" }: { en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" | "warn" }) {
  const toneClass =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : tone === "bad"
        ? "border-rose-200 bg-rose-50 text-rose-800 line-through decoration-rose-300"
        : tone === "focus"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : tone === "warn"
            ? "border-orange-300 bg-orange-50 text-orange-900"
            : "border-slate-100 bg-white text-slate-900";
  return (
    <div className={`rounded-2xl border-2 p-3 ${toneClass}`}>
      <En className="block text-lg font-extrabold md:text-xl">{en}</En>
      {ar && <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">{ar}</div>}
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return <div className="flex items-start gap-3 rounded-3xl border-2 border-teal-200 bg-teal-50 p-4"><span className="text-2xl">{emoji}</span><Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" /></div>;
}

function Frame({ mascot, step, badge, title, lead, children, tip, sourceHeading }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: string; children: React.ReactNode; tip?: string; sourceHeading?: string }) {
  return (
    <section dir="rtl" className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(20,184,166,0.18)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>{mascot}</div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-teal-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-teal-100 px-3.5 py-1.5 text-sm font-bold text-teal-800"><Rich text={badge} /></span>}
      </div>
      {sourceHeading && <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"><Rich text={sourceHeading} /></div>}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl"><Rich text={lead} /></div>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-600 to-emerald-600 p-4 text-white"><span className="text-2xl">🦉</span><span className="text-base font-semibold md:text-lg"><Rich text={tip} /></span></div>}
    </section>
  );
}

// ============================================================
// Core Map Board — the ownership chain
// ============================================================
function CoreMapBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-coremap" className="ltr-row grid gap-2 rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-4 md:grid-cols-2">
      {CORE_MAP.map((item) => (
        <div key={item.pronoun} className="flex items-center justify-center gap-3 rounded-2xl border-2 border-teal-100 bg-white p-3 shadow-sm">
          <span dir="ltr" className="font-en rounded-xl bg-sky-100 px-3 py-2 text-lg font-black text-sky-800">{item.pronoun}</span>
          <span dir="ltr" className="font-en text-xl font-black text-teal-600">→</span>
          <span dir="ltr" className="font-en rounded-xl bg-teal-100 px-3 py-2 text-lg font-black text-teal-800">{item.possessive}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Possession Radar — OWNER → PRONOUN → POSSESSIVE → NOUN
// ============================================================
function PossessionRadar() {
  const chains = [
    { owner: "Sara", pronoun: "She", poss: "her", noun: "bicycle" },
    { owner: "Omar", pronoun: "He", poss: "his", noun: "phone" },
    { owner: "Maya + Omar", pronoun: "They", poss: "their", noun: "dog" },
    { owner: "I", pronoun: "I", poss: "my", noun: "computer" },
  ];
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-radar" className="ltr-row grid gap-3">
      {chains.map((c) => (
        <div key={c.owner} className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-white p-3">
          {[c.owner, c.pronoun, c.poss, `${c.poss} ${c.noun}`].map((seg, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span dir="ltr" className="font-en text-teal-400">→</span>}
              <span dir="ltr" className={`font-en rounded-xl px-3 py-2 text-sm font-bold ${
                i === 0 ? "bg-sky-100 text-sky-800" :
                i === 1 ? "bg-violet-100 text-violet-800" :
                i === 2 ? "bg-teal-100 text-teal-800" :
                "bg-amber-100 text-amber-800"
              }`}>{seg}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Possessive List — all 7
// ============================================================
function PossessiveListView() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-posslist" className="ltr-row grid gap-2 sm:grid-cols-2">
      {ALL_POSSESSIVES.map((p) => (
        <div key={p.word} className="flex items-center gap-3 rounded-2xl border-2 border-teal-100 bg-white p-3">
          <span dir="ltr" className="font-en rounded-xl bg-teal-600 px-4 py-2 text-lg font-black text-white">{p.word}</span>
          <span dir="rtl" className="font-bold text-slate-600">= {p.meaning}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Example Grid — en/ar pairs
// ============================================================
function ExampleGridView({ items }: { items: { en: string; ar: string }[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-3 text-center">
          <En className="block text-lg font-extrabold text-slate-900">{it.en}</En>
          <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">{it.ar}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ITS vs IT'S Alarm
// ============================================================
function ItsAlarm() {
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4">
        <div className="mb-3 text-center text-sm font-bold text-rose-700">🚨 Grammar Alarm — حرف واحد يغيّر المعنى</div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
            <En className="block text-center text-xl font-black text-emerald-700">its</En>
            <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-600">= ملكية</div>
          </div>
          <div className="rounded-2xl border-2 border-violet-200 bg-white p-3">
            <En className="block text-center text-xl font-black text-violet-700">it's</En>
            <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-600">= اختصار لـ it is</div>
          </div>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <SourceLine en={ITS_EXAMPLES.itsVsIts.robotLost.en} ar={ITS_EXAMPLES.itsVsIts.robotLost.ar} tone="good" />
        <SourceLine en={ITS_EXAMPLES.itsVsIts.itsSmall.en} ar={ITS_EXAMPLES.itsVsIts.itsSmall.ar} tone="focus" />
      </div>
      <div className="rounded-2xl bg-amber-50 p-3 text-center">
        <Rich text={ITS_EXAMPLES.itsVsIts.here} className="font-bold text-amber-800" />
      </div>
      <div className="rounded-2xl bg-rose-50 p-3 text-center">
        <Rich text={ITS_EXAMPLES.itsVsIts.oneLetter} className="font-bold text-rose-700" />
      </div>
    </div>
  );
}

// ============================================================
// Singular/Plural Board
// ============================================================
function SingularPluralBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-singpl" className="ltr-row grid gap-2">
      {SINGULAR_FORMS.map((pair) => (
        <div key={pair.singular} className="flex items-center justify-center gap-3 rounded-2xl border-2 border-teal-100 bg-white p-3">
          <span dir="ltr" className="font-en rounded-xl bg-teal-50 px-3 py-2 font-bold text-slate-700">{pair.singular}</span>
          <span dir="ltr" className="font-en text-teal-400">→</span>
          <span dir="ltr" className="font-en rounded-xl bg-emerald-100 px-3 py-2 font-black text-emerald-800">{pair.plural}</span>
        </div>
      ))}
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center">
        <Rich text="my لا تتغير — his لا تتغير — her لا تتغير" className="font-bold text-teal-800" />
      </div>
    </div>
  );
}

// ============================================================
// Mine Bridge — my → mine
// ============================================================
function MineBridgeView() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-mine" className="ltr-row grid gap-2 md:grid-cols-2">
      {MINE_BRIDGE.map((item) => (
        <div key={item.adj} className="rounded-2xl border-2 border-amber-100 bg-white p-3">
          <div className="flex items-center justify-center gap-2">
            <span dir="ltr" className="font-en rounded-xl bg-teal-100 px-3 py-2 text-sm font-bold text-teal-800">{item.noun}</span>
            <span dir="ltr" className="font-en text-amber-500">→</span>
            <span dir="ltr" className="font-en rounded-xl bg-amber-100 px-3 py-2 text-sm font-black text-amber-800">{item.pronoun}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Noun Possession Board
// ============================================================
function NounPossessionBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-nounposs" className="ltr-row grid gap-2">
      {NOUN_TO_ADJ.map((pair) => (
        <div key={pair.from} className="flex items-center justify-center gap-3 rounded-2xl border-2 border-violet-100 bg-white p-3">
          <span dir="ltr" className="font-en rounded-xl bg-violet-100 px-3 py-2 font-bold text-violet-800">{pair.from}</span>
          <span dir="ltr" className="font-en text-violet-400">→</span>
          <span dir="ltr" className="font-en rounded-xl bg-teal-100 px-3 py-2 font-black text-teal-800">{pair.to}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Comparison Board — name poss vs adj poss
// ============================================================
function ComparisonBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-compare" className="ltr-row grid gap-2 md:grid-cols-3">
      {COMPARISON_23.map((item) => (
        <div key={item.namePoss} className="rounded-2xl border-2 border-slate-100 bg-white p-3">
          <span dir="ltr" className="font-en block rounded-xl bg-violet-100 px-3 py-2 text-center font-bold text-violet-800">{item.namePoss}</span>
          <div dir="ltr" className="my-1 text-center font-black text-slate-400">↕</div>
          <span dir="ltr" className="font-en block rounded-xl bg-teal-100 px-3 py-2 text-center font-black text-teal-800">{item.adjPoss}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Irregular Plurals Board
// ============================================================
function IrregularBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-irreg" className="ltr-row grid gap-3 md:grid-cols-2">
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
        <div className="text-xs font-bold text-emerald-700" dir="rtl">المفرد الشاذ</div>
        <En className="mt-1 block text-lg font-black">the child → the child's toy</En>
        <div dir="rtl" className="text-sm font-bold text-emerald-600">الطفل → لعبة الطفل</div>
      </div>
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
        <div className="text-xs font-bold text-amber-700" dir="rtl">الجمع الشاذ</div>
        <En className="mt-1 block text-lg font-black">the children → the children's toys</En>
        <div dir="rtl" className="text-sm font-bold text-amber-600">الأطفال → ألعاب الأطفال</div>
      </div>
    </div>
  );
}

// ============================================================
// Family Board — interactive family members
// ============================================================
function FamilyBoard() {
  const [selected, setSelected] = useState<number | null>(null);
  const possMap: Record<string, string> = {
    my: "I", your: "You", his: "He", her: "She", its: "It", our: "We", their: "They",
  };
  return (
    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
      {FAMILY_25.map((item, i) => {
        const possAdj = item.en.split(" ")[0];
        const isSel = selected === i;
        return (
          <button
            key={i}
            onClick={() => setSelected(isSel ? null : i)}
            className={`rounded-2xl border-2 p-3 text-center transition ${
              isSel ? "border-teal-400 bg-teal-50 shadow-md scale-[1.02]" : "border-slate-100 bg-white hover:border-teal-200"
            }`}
          >
            <En className="block text-lg font-extrabold text-slate-900">{item.en}</En>
            <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">{item.ar}</div>
            {isSel && (
              <div dir="ltr" className="mt-2 rounded-xl bg-teal-100 px-2 py-1 text-xs font-bold text-teal-700">
                Owner: {possMap[possAdj] || possAdj} → {possAdj}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// Game Board — "Who owns it?"
// ============================================================
function GameBoard() {
  const [revealed, setRevealed] = useState<number[]>([]);
  return (
    <div className="grid gap-3">
      {GAME_26.map((item, i) => {
        const isRevealed = revealed.includes(i);
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${isRevealed ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <En className="text-lg font-extrabold text-slate-900">{item.sentence}</En>
              <button
                onClick={() => setRevealed((r) => isRevealed ? r.filter(x => x !== i) : [...r, i])}
                className="rounded-xl bg-teal-600 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-teal-700"
              >
                {isRevealed ? "إخفاء" : "→ من صاحب؟"}
              </button>
            </div>
            {isRevealed && (
              <div className="mt-3">
                <div dir="ltr" style={{ direction: "ltr" }} className="flex flex-wrap items-center justify-center gap-2">
                  {item.chain.map((step, si) => (
                    <span key={si} className="flex items-center gap-2">
                      {si > 0 && <span dir="ltr" className="font-en text-teal-400">→</span>}
                      <span dir="ltr" className={`font-en rounded-xl px-3 py-2 text-sm font-bold ${
                        si === 0 ? "bg-sky-100 text-sky-800" :
                        si < item.chain.length - 1 ? "bg-violet-100 text-violet-800" :
                        "bg-emerald-100 text-emerald-800"
                      }`}>{step}</span>
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-center">
                  <En className="rounded-xl bg-teal-600 px-4 py-2 text-lg font-black text-white">{item.result}</En>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Ownership Flow — visual chain
// ============================================================
function OwnershipFlow({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-teal-50 p-3">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span dir="ltr" className="font-en text-teal-400 text-xl">→</span>}
          <span dir="ltr" className={`font-en rounded-xl px-3 py-2 text-sm font-bold ${
            i === 0 ? "bg-sky-100 text-sky-800" :
            i === items.length - 1 ? "bg-teal-600 text-white" :
            "bg-violet-100 text-violet-800"
          }`}>{item}</span>
        </span>
      ))}
    </div>
  );
}

// ============================================================
// Formula Strip — golden formulas
// ============================================================
function FormulaStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-fstrip" className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span key={item} dir="ltr" className="font-en rounded-xl border-2 border-teal-200 bg-white px-3 py-2 text-sm font-black text-teal-800">{item}</span>
      ))}
    </div>
  );
}

// ============================================================
// Error Strip — common errors
// ============================================================
function ErrorStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l16-errstrip" className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span key={item} dir="ltr" className="font-en rounded-xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 line-through">{item}</span>
      ))}
    </div>
  );
}

// ============================================================
// Dog Experiment — Its vs Her
// ============================================================
function DogExperiment() {
  const [view, setView] = useState<"its" | "her" | "both">("both");
  return (
    <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
      <div className="mb-3 text-center text-sm font-bold text-teal-700">🐕 تجربة الكلب — نفس الكلب، ملكيتان مختلفتان</div>
      <div className="flex justify-center gap-2 mb-3">
        <button onClick={() => setView("its")} className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${view === "its" ? "bg-teal-600 text-white" : "bg-white text-teal-700 border border-teal-200"}`}>its</button>
        <button onClick={() => setView("her")} className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${view === "her" ? "bg-amber-600 text-white" : "bg-white text-amber-700 border border-amber-200"}`}>her</button>
        <button onClick={() => setView("both")} className={`rounded-xl px-3 py-1.5 text-sm font-bold transition ${view === "both" ? "bg-slate-700 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>كلاهما</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {(view === "its" || view === "both") && (
          <div className="rounded-2xl border-2 border-teal-200 bg-white p-3">
            <En className="block text-center text-lg font-black text-teal-700">Its name is Max.</En>
            <div dir="rtl" className="mt-2 text-center text-sm font-bold text-slate-500">its → الاسم يعود إلى dog (الكلب يملك اسمًا)</div>
          </div>
        )}
        {(view === "her" || view === "both") && (
          <div className="rounded-2xl border-2 border-amber-200 bg-white p-3">
            <En className="block text-center text-lg font-black text-amber-700">Sara loves her dog.</En>
            <div dir="rtl" className="mt-2 text-center text-sm font-bold text-slate-500">her → الكلب ملك Sara (سارة تملك الكلب)</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Exercise Views
// ============================================================

// Level 1 — choose correct
function Level1Ex() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-3">
      {LEVEL1_16.map((item, i) => {
        const picked = answers[i];
        const isCorrect = picked === item.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${picked !== undefined ? (isCorrect ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <En className="block text-base font-bold text-slate-800">{item.stem}</En>
                <En className="block mt-1 text-base font-extrabold text-slate-900">{item.blank}</En>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 pr-11">
              {item.options.map((opt, oi) => {
                const isA = oi === item.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-400";
                if (picked !== undefined) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (picked === oi) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (picked === oi) {
                  cls = "border-teal-500 bg-teal-50 text-teal-800";
                }
                return (
                  <button
                    key={oi}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    dir="ltr"
                    className={`font-en rounded-xl border-2 px-3 py-2 text-left text-base font-bold transition active:scale-[0.98] ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {picked !== undefined && (
              <div className={`mt-2 pr-11 text-sm font-bold ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
                {isCorrect ? "✓ صحيح!" : `✕ الإجابة الصحيحة: ${item.options[item.answer]}`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Level 2 — pronoun matching
function Level2Ex() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allOptions = CORE_MAP.map((m) => m.possessive);
  return (
    <div className="grid gap-3">
      {LEVEL2_16.map((item) => (
        <div key={item.pronoun} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3">
          <span dir="ltr" className="font-en rounded-xl bg-sky-100 px-3 py-2 text-lg font-black text-sky-800">{item.pronoun}</span>
          <span dir="ltr" className="font-en text-xl text-teal-400">→</span>
          <div className="flex flex-wrap gap-2">
            {allOptions.map((opt) => {
              const isSelected = answers[item.pronoun] === opt;
              const isCorrect = opt === item.answer;
              let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-400";
              if (isSelected && isCorrect) cls = "border-transparent bg-emerald-600 text-white";
              else if (isSelected && !isCorrect) cls = "border-transparent bg-rose-600 text-white";
              return (
                <button
                  key={opt}
                  onClick={() => setAnswers((a) => ({ ...a, [item.pronoun]: opt }))}
                  dir="ltr"
                  className={`font-en rounded-xl border-2 px-3 py-2 text-sm font-bold transition active:scale-[0.98] ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {answers[item.pronoun] && (
            <span className={`text-sm font-bold ${answers[item.pronoun] === item.answer ? "text-emerald-700" : "text-rose-700"}`}>
              {answers[item.pronoun] === item.answer ? "✓" : "✕"}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// Level 3 — fill blank
function Level3Ex() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-3">
      {LEVEL3_16.map((item, i) => {
        const ans = answers[i] || "";
        const isRevealed = revealed.has(i);
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${isRevealed ? (ans.toLowerCase().trim() === item.answer.toLowerCase() ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <En className="block text-base font-bold text-slate-800">{item.sentence1}</En>
            <En className="block mt-1 text-base font-extrabold text-slate-900">{item.sentence2}</En>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                dir="ltr"
                type="text"
                value={ans}
                onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                placeholder="اكتب هنا..."
                className="font-en w-32 rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-teal-400"
              />
              <button
                onClick={() => setRevealed((r) => new Set(r).add(i))}
                className="rounded-xl bg-teal-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
              >
                تحقق
              </button>
            </div>
            {isRevealed && ans.toLowerCase().trim() !== item.answer.toLowerCase() && (
              <div className="mt-2 text-sm font-bold text-rose-700">الإجابة الصحيحة: <En>{item.answer}</En></div>
            )}
            {isRevealed && ans.toLowerCase().trim() === item.answer.toLowerCase() && (
              <div className="mt-2 text-sm font-bold text-emerald-700">✓ صحيح!</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Level 4 — error correction
function Level4Ex() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-3">
      {LEVEL4_16.map((item, i) => {
        const isRevealed = revealed.has(i);
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${isRevealed ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-start gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{i + 1}</span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <En className="text-base font-bold text-rose-700 line-through decoration-rose-300">{item.wrong}</En>
                  <button
                    onClick={() => setRevealed((r) => new Set(r).add(i))}
                    className="rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-teal-700"
                  >
                    {isRevealed ? "تم ✓" : "صحّح"}
                  </button>
                </div>
              </div>
            </div>
            {isRevealed && (
              <div className="mt-3 space-y-2 pr-11">
                <div className="rounded-xl bg-white p-2">
                  <div className="text-sm font-bold text-slate-500">صاحب الشيء: <En>{item.owner}</En></div>
                </div>
                <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 p-2 text-base font-black text-emerald-800">{item.correct}</En>
                <div className="text-sm font-bold text-teal-700">{item.explanation}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Level 5 — sentence analysis
function Level5Ex() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const roleColors: Record<string, string> = {
    "Possessive Adjective": "bg-teal-100 text-teal-800 border-teal-300",
    "Adjective": "bg-violet-100 text-violet-800 border-violet-300",
    "Noun": "bg-amber-100 text-amber-800 border-amber-300",
  };
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-teal-700">🧠 Grammar Scanner — حلل الجملة</div>
        <div dir="ltr" className="flex flex-wrap items-center justify-center gap-3">
          {SENTENCE_ANALYSIS_31.sentence.split(" ").map((word, i) => {
            const clean = word.replace(".", "");
            const part = SENTENCE_ANALYSIS_31.parts.find(p => p.word === clean);
            const isSel = selected.has(i);
            return (
              <button
                key={i}
                onClick={() => setSelected((s) => { const n = new Set(s); isSel ? n.delete(i) : n.add(i); return n; })}
                dir="ltr"
                className={`font-en rounded-2xl border-2 px-4 py-3 text-xl font-black transition ${
                  isSel && part ? roleColors[part.role] || "bg-slate-100" : "border-slate-200 bg-white text-slate-900 hover:border-teal-300"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl bg-white p-3">
        <Rich text={SENTENCE_ANALYSIS_31.note} className="text-sm font-bold text-slate-600" />
      </div>
      <div className="grid gap-2">
        {SENTENCE_ANALYSIS_31.parts.map((part) => (
          <div key={part.word} className="flex items-center gap-3 rounded-xl border-2 border-slate-100 bg-white p-2">
            <En className="font-en rounded-xl bg-teal-50 px-3 py-1 text-base font-bold text-teal-800">{part.word}</En>
            <span dir="ltr" className="font-en text-teal-400">=</span>
            <span className={`rounded-lg border-2 px-3 py-1 text-sm font-bold ${roleColors[part.role]}`}>{part.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Level 6 — multi-owner
function Level6Ex() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-3">
      {LEVEL6_16.map((item, i) => {
        const isRevealed = revealed.has(i);
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${isRevealed ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{i + 1}</span>
              <div className="flex-1">
                <En className="block text-base font-bold text-slate-800">{item.sentence1}</En>
                <En className="block mt-1 text-base font-extrabold text-slate-900">{item.sentence2}</En>
              </div>
            </div>
            <button
              onClick={() => setRevealed((r) => new Set(r).add(i))}
              className="mt-3 rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
            >
              {isRevealed ? "تم ✓" : "اكتشف المالك"}
            </button>
            {isRevealed && (
              <div className="mt-3 space-y-2">
                <div dir="ltr" className="flex items-center justify-center gap-2 rounded-xl bg-slate-50 p-2">
                  {item.chain.split(" → ").map((seg, si) => (
                    <span key={si} className="flex items-center gap-2">
                      {si > 0 && <span dir="ltr" className="font-en text-teal-400">→</span>}
                      <span dir="ltr" className="font-en rounded-lg bg-teal-100 px-2 py-1 text-sm font-bold text-teal-800">{seg}</span>
                    </span>
                  ))}
                </div>
                <div className="text-center">
                  <En className="rounded-xl bg-teal-600 px-4 py-2 text-lg font-black text-white">{item.answer}</En>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3">
        <div className="grid gap-2">
          {LEVEL6_16.map((item, i) => (
            <div key={i} dir="ltr" className="flex items-center justify-center gap-2">
              <span dir="ltr" className="font-en text-sm font-bold text-slate-600">{item.chain}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Grammar Detective
function DetectiveEx() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-indigo-700">🕵️ Grammar Detective — اقرأ النص:</div>
        <div dir="ltr" className="rounded-2xl border-2 border-indigo-100 bg-white p-4 text-lg font-bold leading-relaxed text-slate-900">
          <En>{DETECTIVE_PASSAGE_16}</En>
        </div>
      </div>
      <div className="text-sm font-bold text-slate-500">استخرج:</div>
      <div className="grid gap-3">
        {DETECTIVE_QUESTIONS_16.map((q, i) => {
          const isRevealed = revealed.has(i);
          return (
            <div key={i} className={`rounded-3xl border-2 p-4 transition ${isRevealed ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">{i + 1}</span>
                <div className="flex-1">
                  <Rich text={q.q} className="font-bold text-slate-800" />
                </div>
              </div>
              <button
                onClick={() => setRevealed((r) => new Set(r).add(i))}
                className="mt-3 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                {isRevealed ? "الإجابة ✓" : "اكشف الإجابة"}
              </button>
              {isRevealed && (
                <div className="mt-3 space-y-1 pr-11">
                  <En className="block rounded-xl bg-emerald-100 px-3 py-2 text-lg font-black text-emerald-800">{q.answer}</En>
                  <div className="text-sm font-bold text-teal-700">{q.explanation}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// IQ200
function IQ200Ex() {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-fuchsia-700">🚀 IQ200 — ملكيتان في جملة واحدة</div>
        <div dir="ltr" className="rounded-2xl border-2 border-fuchsia-100 bg-white p-4 text-center text-xl font-black text-slate-900">
          <En>{IQ200_16.sentence}</En>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-4">
        <Rich text={IQ200_16.twoOwners} className="text-base font-bold text-slate-700" />
        <div className="mt-3 space-y-2">
          {IQ200_16.questions.map((q, i) => (
            <div key={i} className="rounded-xl border-2 border-fuchsia-100 bg-fuchsia-50 p-3">
              <Rich text={q} className="font-bold text-fuchsia-800" />
            </div>
          ))}
        </div>
        <div className="mt-3 text-sm font-bold text-slate-400"><Rich text={IQ200_16.think} /></div>
      </div>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="rounded-xl bg-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-fuchsia-700"
      >
        {showAnswer ? "إخفاء الإجابة" : "اكشف الإجابة"}
      </button>
      {showAnswer && (
        <div className="grid gap-3">
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
            <En className="block text-lg font-black text-emerald-800">{IQ200_16.answer.her}</En>
          </div>
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
            <En className="block text-lg font-black text-amber-800">{IQ200_16.answer.his}</En>
          </div>
          <div className="rounded-2xl bg-fuchsia-100 p-3 text-center">
            <Rich text={IQ200_16.rule} className="font-bold text-fuchsia-800" />
          </div>
        </div>
      )}
    </div>
  );
}

// Harder Challenge
function HarderEx() {
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-violet-700">🧠 تحدي أصعب — حدد كل صفات الملكية وصاحبها</div>
        <div dir="ltr" className="rounded-2xl border-2 border-violet-100 bg-white p-4 text-base font-bold leading-relaxed text-slate-900">
          <En>{HARDER_35.passage}</En>
        </div>
      </div>
      <button
        onClick={() => setShowAnswers(!showAnswers)}
        className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700"
      >
        {showAnswers ? "إخفاء التحليل" : "اكشف التحليل"}
      </button>
      {showAnswers && (
        <div className="grid gap-2">
          {HARDER_35.possessives.map((p, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-violet-100 bg-white p-3">
              <En className="font-en rounded-xl bg-violet-600 px-3 py-2 text-base font-black text-white">{p.word}</En>
              <span dir="ltr" className="font-en text-violet-400">←</span>
              <div dir="rtl" className="font-bold text-slate-700">صاحب: <En>{p.owner}</En></div>
              <div dir="rtl" className="text-sm text-slate-500">({p.context})</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Mini Conversation
function ConversationEx() {
  return (
    <div className="grid gap-3">
      {MINI_CONVO_16.map((line, i) => (
        <div key={i} className={`flex ${line.speaker === "A" ? "justify-start" : "justify-end"}`}>
          <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
            line.speaker === "A"
              ? "border-2 border-sky-200 bg-sky-50"
              : "border-2 border-emerald-200 bg-emerald-50"
          }`}>
            <div className="mb-1 text-xs font-bold text-slate-500">{line.speaker === "A" ? "👤 Person A" : "👤 Person B"}</div>
            <En className="block text-base font-bold text-slate-900">{line.en}</En>
          </div>
        </div>
      ))}
    </div>
  );
}

// Final Challenge
function FinalChallengeEx() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-amber-700">🏆 التحدي النهائي</div>
        <Rich text={FINAL_CHALLENGE_37.task} className="block text-center text-lg font-bold text-slate-800" />
      </div>
      <div className="rounded-2xl border-2 border-amber-100 bg-white p-4">
        <div className="mb-3 text-sm font-bold text-slate-600">تحقق من المتطلبات:</div>
        <div className="grid gap-2">
          {FINAL_CHALLENGE_37.requirements.map((req, i) => (
            <label key={i} className="flex items-center gap-3 rounded-xl border-2 border-slate-100 bg-white p-2 cursor-pointer hover:border-amber-200">
              <input
                type="checkbox"
                checked={checked.has(i)}
                onChange={() => setChecked((c) => { const n = new Set(c); checked.has(i) ? n.delete(i) : n.add(i); return n; })}
                className="h-5 w-5 rounded accent-amber-600"
              />
              <Rich text={req} className="text-sm font-bold text-slate-700" />
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-amber-50 p-3 text-center">
        <div className="text-sm font-bold text-amber-700">
          ✅ أكملت {checked.size} / {FINAL_CHALLENGE_37.requirements.length} من المتطلبات
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Exercise dispatcher
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise16 }) {
  switch (exercise.type) {
    case "level1": return <Level1Ex />;
    case "level2": return <Level2Ex />;
    case "level3": return <Level3Ex />;
    case "level4": return <Level4Ex />;
    case "level5": return <Level5Ex />;
    case "level6": return <Level6Ex />;
    case "detective": return <DetectiveEx />;
    case "iq200": return <IQ200Ex />;
    case "harder": return <HarderEx />;
    case "conversation": return <ConversationEx />;
    case "finalChallenge": return <FinalChallengeEx />;
  }
}

// ============================================================
// Block dispatcher
// ============================================================
function BlockView({ block }: { block: Block16 }) {
  switch (block.type) {
    case "text": return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english": return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "list": return <div className="grid gap-2">{block.items.map((it, i) => <div key={`${it}-${i}`} className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-3"><Rich text={it} className="font-bold text-slate-700" /></div>)}</div>;
    case "note": return <Note emoji={block.emoji} text={block.text} />;
    case "coreMapBoard": return <CoreMapBoard />;
    case "ownershipRadar": return <PossessionRadar />;
    case "possessiveList": return <PossessiveListView />;
    case "exampleGrid": return <ExampleGridView items={block.items} />;
    case "itsAlarm": return <ItsAlarm />;
    case "singularPluralBoard": return <SingularPluralBoard />;
    case "mineBridge": return <MineBridgeView />;
    case "nounPossessionBoard": return <NounPossessionBoard />;
    case "comparisonBoard": return <ComparisonBoard />;
    case "irregularBoard": return <IrregularBoard />;
    case "familyBoard": return <FamilyBoard />;
    case "gameBoard": return <GameBoard />;
    case "ownershipFlow": return <OwnershipFlow items={block.items} />;
    case "formulaStrip": return <FormulaStrip items={block.items} />;
    case "errorStrip": return <ErrorStrip items={block.items} />;
    case "dogExperiment": return <DogExperiment />;
  }
}

// ============================================================
// Cover
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-teal-200 bg-gradient-to-br from-teal-600 to-emerald-700 p-8 text-white shadow-xl md:p-12">
      <div className="text-7xl anim-float">🏠</div>
      <h1 className="font-head mt-4 text-3xl font-bold md:text-5xl">🇬🇧 الدرس 16: Possessive Adjectives</h1>
      <div className="mt-2 text-xl font-bold text-teal-100">صفات الملكية</div>
      <div className="mt-6 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-teal-50">
        <Rich text={COVER_PLAN_16} />
      </div>
      <div dir="ltr" className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {CORE_MAP.map((m) => (
          <div key={m.pronoun} className="flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-2">
            <span dir="ltr" className="font-en text-sm font-black">{m.pronoun}</span>
            <span dir="ltr" className="font-en text-teal-200">→</span>
            <span dir="ltr" className="font-en text-sm font-black text-amber-200">{m.possessive}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-teal-100">🔎 THE OWNERSHIP DETECTIVE — من صاحب الشيء؟</div>
    </div>
  );
}

// ============================================================
// Objectives
// ============================================================
function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس، يجب أن يستطيع الطالب:">
      <div className="grid gap-2">
        {OBJECTIVES_16.map((obj, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border-2 border-teal-100 bg-teal-50/50 p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{i + 1 > 8 ? `${i+1}` : ["①","②","③","④","⑤","⑥","⑦","⑧"][i]}</span>
            <Rich text={obj} className="font-semibold text-slate-800" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// Summary
// ============================================================
function Summary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[38]} title="ملخص الدرس" lead="احفظ هذه الخريطة:">
      <CoreMapBoard />
      <div className="mt-4 rounded-3xl border-2 border-teal-200 bg-teal-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-teal-700">⭐ القاعدة الذهبية</div>
        <div dir="ltr" className="text-center text-lg font-black text-teal-800">
          <En>Possessive Adjective + Noun</En>
        </div>
        <FormulaStrip items={SUMMARY_16.goldenFormulas} />
      </div>
    </Frame>
  );
}

// ============================================================
// Key Rule
// ============================================================
function KeyRule() {
  return (
    <Frame mascot="⭐" sourceHeading={SOURCE_SECTIONS[39]} title="القاعدة الذهبية" lead="Possessive Adjective + Noun">
      <div dir="ltr" className="rounded-3xl border-2 border-teal-300 bg-teal-50 p-5 text-center">
        <En className="text-xl font-black text-teal-800">Possessive Adjective + Noun</En>
      </div>
      <FormulaStrip items={GOLDEN_FORMULAS} />
    </Frame>
  );
}

// ============================================================
// Three Rules
// ============================================================
function ThreeRules() {
  return (
    <Frame mascot="🚨" sourceHeading={SOURCE_SECTIONS[40]} title="ثلاثة أشياء لا تنساها">
      <div className="grid gap-3">
        {SUMMARY_16.threeThings.map((thing) => (
          <div key={thing.n} className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-600 text-lg font-bold text-white">{thing.n}</span>
              <Rich text={thing.rule} className="text-lg font-bold text-rose-900" />
            </div>
            {thing.good && (
              <div className="mt-3 rounded-2xl bg-white p-3">
                <En className="block text-center font-black text-emerald-700">{thing.good.split("\n")[0]}</En>
                {thing.good.split("\n").slice(1).map((l, li) => (
                  <En key={li} className="block text-center font-black text-emerald-700">{l}</En>
                ))}
              </div>
            )}
            {thing.bad && (
              <div className="mt-2">
                <En className="block text-center font-black text-rose-500 line-through">{thing.bad}</En>
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// IQ200 Final
// ============================================================
function IQ200Final() {
  return (
    <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[41]} title="قاعدة IQ200 الأخيرة">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4 text-center">
        <Rich text={SUMMARY_16.iq200final} className="text-base font-bold leading-relaxed text-fuchsia-800 md:text-lg" />
      </div>
      <div className="mt-4 text-center text-sm font-bold text-slate-500">وهكذا تصبح الجملة واضحة:</div>
      <div dir="ltr" className="mt-2 grid gap-2 md:grid-cols-2">
        {SUMMARY_16.iq200examples.map((ex) => (
          <div key={ex} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-fuchsia-100 bg-white p-3">
            {ex.split(" + ").map((part, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span dir="ltr" className="font-en text-fuchsia-400">+</span>}
                <span dir="ltr" className={`font-en rounded-lg px-3 py-1.5 text-sm font-bold ${
                  i === 0 ? "bg-sky-100 text-sky-800" :
                  i === 1 ? "bg-teal-100 text-teal-800" :
                  "bg-amber-100 text-amber-800"
                }`}>{part}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// Roadmap
// ============================================================
function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[42]} title="مكاننا في المنهج" lead="تسلسل القواعد حتى الآن:">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_16.map((it) => (
          <div key={it.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${"here" in it && it.here ? "border-teal-400 bg-teal-100 shadow" : "border-slate-100 bg-white"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${"here" in it && it.here ? "bg-teal-600" : "bg-slate-500"}`}>{it.n}</span>
            <div>
              <div dir="ltr" className={`font-en text-sm font-bold ${"here" in it && it.here ? "text-teal-900" : "text-slate-700"}`}>{it.en}</div>
              <div className="text-xs font-bold text-slate-500">{it.ar}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-teal-200 bg-teal-50 p-5"><Rich text={ROADMAP_16_NEXT} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" /></div>
    </Frame>
  );
}

// ============================================================
// Closing
// ============================================================
function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-teal-200 bg-gradient-to-br from-teal-600 to-emerald-700 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 16.</h2>
      <div className="mt-4 text-lg leading-relaxed text-teal-50"><Rich text="الآن تفهم الملكية الإنجليزية بعمق: من هو صاحب الشيء؟ ما الاسم الذي بعدها؟ وما الفرق بين my و mine؟ هذا الأساس سيبني عليه الدرس 17 منظومة الملكية الكاملة." /></div>
      <div className="mt-4 rounded-2xl bg-white/10 p-4"><Rich text={ROADMAP_16_NEXT} /></div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-teal-700 transition hover:bg-teal-50">← جميع الدروس</button>
        <span className="rounded-xl border-2 border-white/40 px-5 py-3 font-bold text-white/80">الدرس 17 قريباً → Possessive Pronouns</span>
      </div>
    </div>
  );
}

// ============================================================
// Source heading resolver
// ============================================================
function sourceHeadingFor(slide: Slide16): string | undefined {
  if (slide.kind === "objectives") return SOURCE_SECTIONS[0];
  if (slide.kind === "lesson") return SOURCE_SECTIONS[Number(slide.step)];
  if (slide.kind === "ex") {
    const match = slide.badge.match(/(27|28|29|30|31|32|33|34|35|36|37)/);
    if (!match) return undefined;
    const number = Number(match[1]);
    return SOURCE_SECTIONS[number];
  }
  if (slide.kind === "summary") return SOURCE_SECTIONS[38];
  if (slide.kind === "keyRule") return SOURCE_SECTIONS[39];
  if (slide.kind === "threeRules") return SOURCE_SECTIONS[40];
  if (slide.kind === "iq200Final") return SOURCE_SECTIONS[41];
  if (slide.kind === "roadmap") return SOURCE_SECTIONS[42];
  return undefined;
}

function SlideView({ s, onExit }: { s: Slide16; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson": return <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={undefined}>{s.blocks.map((block, i) => <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}><BlockView block={block} /></div>)}</Frame>;
    case "ex": return <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}><ExerciseView exercise={s.ex} /></Frame>;
    case "summary": return <Summary />;
    case "keyRule": return <KeyRule />;
    case "threeRules": return <ThreeRules />;
    case "iq200Final": return <IQ200Final />;
    case "roadmap": return <Roadmap />;
    case "quiz": return <Frame mascot={s.mascot} badge="الاختبار النهائي" title={<Rich text={s.title} />} lead="أسئلة جديدة تقيس فهم صفات الملكية واختيارها."><FinalQuiz lesson={16} accent="bg-teal-600" /></Frame>;
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide16): string {
  if (slide.kind === "cover") return "الغلاف";
  if (slide.kind === "objectives") return "أهداف الدرس";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  [ "البداية" ]: "text-slate-400",
  [ "الأساس — الملكية" ]: "text-teal-600",
  [ "كل ضمير وصفته" ]: "text-emerald-600",
  [ "القواعد الأساسية" ]: "text-amber-600",
  [ "مفاهيم متقدمة" ]: "text-violet-600",
  [ "الملكية مع الأسماء" ]: "text-indigo-600",
  [ "التمارين والتحديات" ]: "text-rose-600",
  [ "الخاتمة" ]: "text-slate-600",
};

function Rail({ i, setI, onExit, onClose }: { i: number; setI: (n: number) => void; onExit: () => void; onClose?: () => void }) {
  const groups = useMemo(() => {
    const out: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, index) => {
      const last = out[out.length - 1];
      if (last && last.section === slide.section) last.indexes.push(index);
      else out.push({ section: slide.section, indexes: [index] });
    });
    return out;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">→ جميع الدروس</button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900"><Rich text="الدرس 16 · Possessive Adjectives" /></div>
        <En className="text-xs font-semibold text-slate-400">🏠 The Ownership Detective</En>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] || "text-slate-400"}`}><Rich text={group.section} /></div>
            {group.indexes.map((index) => {
              const active = index === i;
              return (
                <button key={index} onClick={() => { setI(index); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-teal-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>{index + 1}</span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[index])}</span>
                  <span className="mr-auto text-base">{SLIDES[index].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسحة</div>
    </aside>
  );
}

export default function Lesson16({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(() => ({ next: () => setIndex((v) => Math.min(v + 1, total - 1)), prev: () => setIndex((v) => Math.max(v - 1, 0)) }), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menu) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (e.key === "ArrowLeft") navigation.next();
      if (e.key === "ArrowRight") navigation.prev();
      if (e.key === " ") { e.preventDefault(); navigation.next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu]);

  useEffect(() => { document.getElementById("l16-main")?.scrollTo({ top: 0 }); }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f0fdf9] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"><Rail i={index} setI={setIndex} onExit={onExit} /></div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500"><Rich text={`${slide.section} · `} /><span className="text-slate-800"><Rich text={slideTitle(slide)} /></span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-l from-teal-600 via-emerald-500 to-cyan-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{index + 1} / {total}</span>
          </header>
          <main id="l16-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10"><div key={index} className="pop mx-auto max-w-4xl"><SlideView s={slide} onExit={onExit} /></div></main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={navigation.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={navigation.next} disabled={index === total - 1} className="rounded-full bg-teal-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-teal-700 disabled:opacity-30">التالي ←</button>
            </div>
          </div>
        </div>
      </div>
      {menu && <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}><div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" /><div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}><Rail i={index} setI={setIndex} onExit={onExit} onClose={() => setMenu(false)} /></div></div>}
    </div>
  );
}
