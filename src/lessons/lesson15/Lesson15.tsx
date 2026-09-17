import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  FORMULAS_15,
  ROLE15_AR,
  OBJECTIVES_15,
  CORE_RULE_15,
  SIMPLE_EXAMPLES_15,
  MEANING_EXAMPLES_15,
  MEANING_RULE_15,
  TIMELINE_15,
  USAGE_15,
  FEELING_EXAMPLES_15,
  ADJ_EXAMPLES_15,
  PLACE_EXAMPLES_15,
  IDENTITY_EXAMPLES_15,
  IDENTITY_NOTE_15,
  ADJ_FORMULA_15,
  NOUN_FORMULA_15,
  PLACE_FORMULA_15,
  DIFF_ORDINARY_VS_BE_15,
  DID_NOT_WITH_BE_15,
  QUESTION_FORMATION_15,
  QUESTION_RULE_15,
  SHORT_ANSWERS_15,
  SHORT_ANSWER_TRAP_15,
  NEGATION_15,
  DID_MISUSE_15,
  COMPARISON_SYSTEMS_15,
  PRESENT_PAST_15,
  TIME_WORDS_15,
  TIME_EXAMPLES_15,
  WHEN_YOUNG_15,
  WH_WITH_BE_15,
  DID_VS_WAS_15,
  GENIUS_COMPARISON_15,
  WHAT_WITH_BE_15,
  WHAT_NOTE_15,
  LEVEL1_15,
  LEVEL2_15,
  LEVEL3_15,
  LEVEL4_15,
  LEVEL4_NOTE_15,
  LEVEL5_15,
  LEVEL6_15,
  DETECTIVE_PASSAGE_15,
  DETECTIVE_Q_15,
  IQ200_15,
  IQ200_SYSTEM_15,
  FINAL_CHALLENGE_15,
  SUMMARY_15,
  ROADMAP_15,
  ROADMAP_15_NEXT,
  COVER_PLAN_15,
  type Block15,
  type Exercise15,
  type Slide15,
  type FormulaKey15,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 15 — Was / Were Control Center
// كل الإنجليزية LTR كاملة؛ لا نقسم الجملة إلى كلمات.
// ============================================================

const ROLE_STYLE: Record<string, string> = {
  subject: "border-sky-300 bg-sky-100 text-sky-900",
  was: "border-amber-300 bg-amber-100 text-amber-900",
  were: "border-orange-300 bg-orange-100 text-orange-900",
  adj: "border-violet-300 bg-violet-100 text-violet-900",
  noun: "border-emerald-300 bg-emerald-100 text-emerald-900",
  place: "border-teal-300 bg-teal-100 text-teal-900",
  verb: "border-rose-300 bg-rose-100 text-rose-900",
  did: "border-fuchsia-300 bg-fuchsia-100 text-fuchsia-900",
  not: "border-slate-300 bg-slate-100 text-slate-800",
  wh: "border-indigo-300 bg-indigo-100 text-indigo-900",
};

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

function FormulaRowView({ formula, emphasis = false }: { formula: (typeof FORMULAS_15)[number]; emphasis?: boolean }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-formula={formula.key} className={`ltr-row rounded-3xl border-2 p-3 ${emphasis ? "border-amber-300 bg-amber-50 shadow" : "border-amber-100 bg-amber-50/70"}`}>
      <div className="mb-2 text-center text-xs font-bold text-slate-500" dir="rtl">{formula.label}</div>
      <div className="flex flex-wrap items-end justify-center gap-2">
        {formula.tokens.map((token, i) => {
          const operator = token.text === "+" || token.text === "?";
          return operator ? (
            <span key={`${token.text}-${i}`} dir="ltr" className="font-en px-1 text-2xl font-black text-amber-600">{token.text}</span>
          ) : (
            <span key={`${token.text}-${i}`} className="inline-flex flex-col items-center">
              <span dir="ltr" className="font-en rounded-2xl border-2 border-amber-300 bg-white px-3 py-2 text-lg font-extrabold text-slate-900 md:text-xl">{token.text}</span>
              {token.label && <span dir="rtl" className="mt-1 text-[10px] font-bold text-slate-500">{token.label}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function FormulaBoard15() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l15-formulas" className="ltr-row grid gap-3">
      {FORMULAS_15.slice(0, 4).map((formula) => <FormulaRowView key={formula.key} formula={formula} emphasis={formula.key === "wasAff" || formula.key === "wereAff"} />)}
      <div dir="ltr" className="rounded-2xl border-2 border-amber-200 bg-white p-3 text-center">
        <En className="text-lg font-black text-amber-800">I / He / She / It → was</En>
        <div className="my-1 text-slate-300">↓</div>
        <En className="text-lg font-black text-orange-800">You / We / They → were</En>
      </div>
    </div>
  );
}

function FormulaBoardAll15() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l15-formulas-all" className="ltr-row grid gap-3">
      {FORMULAS_15.map((f) => <FormulaRowView key={f.key} formula={f} />)}
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip, sourceHeading }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: string; children: React.ReactNode; tip?: string; sourceHeading?: string }) {
  return (
    <section dir="rtl" className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(245,158,11,0.28)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>{mascot}</div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-amber-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-800"><Rich text={badge} /></span>}
      </div>
      {sourceHeading && <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"><Rich text={sourceHeading} /></div>}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl"><Rich text={lead} /></div>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-amber-600 to-orange-600 p-4 text-white"><span className="text-2xl">🦉</span><span className="text-base font-semibold md:text-lg"><Rich text={tip} /></span></div>}
    </section>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4"><span className="text-2xl">{emoji}</span><Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" /></div>;
}

function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>;
}

function TabButton({ active, onClick, children, tone = "amber" }: { active: boolean; onClick: () => void; children: React.ReactNode; tone?: "amber" | "slate" | "emerald" | "rose" | "violet" | "orange" }) {
  const activeClass = tone === "emerald" ? "bg-emerald-600" : tone === "rose" ? "bg-rose-600" : tone === "violet" ? "bg-violet-600" : tone === "slate" ? "bg-slate-800" : tone === "orange" ? "bg-orange-600" : "bg-amber-600";
  return <button onClick={onClick} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${active ? `border-transparent ${activeClass} text-white shadow` : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"}`}>{children}</button>;
}

// ============================================================
// المكونات الإبداعية — Was/Were Control Center
// ============================================================

function WasWereBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-white bg-white p-4 text-center shadow-sm">
          <div className="text-xs font-bold text-slate-500">GROUP A</div>
          <En className="mt-1 block text-lg font-black text-amber-800">I / He / She / It</En>
          <div className="my-2 text-2xl text-amber-500">↓</div>
          <En className="rounded-xl bg-amber-600 px-4 py-2 text-2xl font-black text-white">WAS</En>
        </div>
        <div className="rounded-2xl border-2 border-white bg-white p-4 text-center shadow-sm">
          <div className="text-xs font-bold text-slate-500">GROUP B</div>
          <En className="mt-1 block text-lg font-black text-orange-800">You / We / They</En>
          <div className="my-2 text-2xl text-orange-500">↓</div>
          <En className="rounded-xl bg-orange-600 px-4 py-2 text-2xl font-black text-white">WERE</En>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-center md:grid-cols-4">
        {CORE_RULE_15.mapping.map((m) => (
          <div key={m.pronoun} className={`rounded-xl border-2 p-2 ${m.form === "was" ? "border-amber-200 bg-amber-50" : "border-orange-200 bg-orange-50"}`}>
            <En className="font-black">{m.pronoun} → {m.form}</En>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandCenter() {
  const [selected, setSelected] = useState<string | null>(null);
  const getForm = (p: string) => (["I", "He", "She", "It"].includes(p) ? "was" : "were");
  return (
    <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow">
      <div className="mb-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">
          <span>🎛️</span><Rich text="WAS / WERE COMMAND CENTER" />
        </div>
        <div className="mt-2 text-sm font-bold text-slate-600">اضغط على الضمير لترى شكله الصحيح — تفاعل يعلّم القاعدة ولا يستبدلها.</div>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-3 gap-2 sm:grid-cols-7">
        {["I", "He", "She", "It", "You", "We", "They"].map((pron) => {
          const active = selected === pron;
          const form = getForm(pron);
          return (
            <button key={pron} onClick={() => setSelected(pron)} className={`rounded-2xl border-2 p-3 transition ${active ? (form === "was" ? "border-amber-500 bg-amber-600 text-white shadow-lg scale-105" : "border-orange-500 bg-orange-600 text-white shadow-lg scale-105") : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"}`}>
              <En className="block text-lg font-black">{pron}</En>
              {active && <En className="mt-1 block rounded-full bg-white/20 px-2 py-0.5 text-sm font-bold">{form}</En>}
            </button>
          );
        })}
      </div>
      {selected && (
        <div key={selected} className="pop mt-4 rounded-2xl border-2 border-amber-300 bg-white p-4 text-center">
          <En className="text-2xl font-black text-slate-900">{selected} → {getForm(selected)}</En>
          <div className="mt-2">
            <En className="rounded-xl bg-slate-100 px-3 py-1 font-bold text-slate-700">{selected} {getForm(selected)} tired.</En>
          </div>
        </div>
      )}
      <div className="mt-4 rounded-xl bg-slate-900 p-3 text-center text-sm font-bold text-white">
        <Rich text="القاعدة الأصلية محفوظة: I / He / She / It → WAS / You / We / They → WERE" />
      </div>
    </div>
  );
}

function DidGate() {
  const examples = [
    { en: "He ___ tired.", blank: "tired", type: "adj", answer: "was", why: "tired = adjective → Verb to be → WAS", options: ["was/were", "did"] },
    { en: "He ___ visit the museum.", blank: "visit", type: "verb", answer: "did", why: "visit = ordinary verb → DID", options: ["was/were", "did"] },
    { en: "She ___ happy.", blank: "happy", type: "adj", answer: "was", why: "happy = adjective → WAS", options: ["was/were", "did"] },
    { en: "They ___ visit the castle?", blank: "visit", type: "verb", answer: "did", why: "visit = فعل عادي → DID", options: ["was/were", "did"] },
    { en: "They ___ excited.", blank: "excited", type: "adj", answer: "were", why: "excited = adjective → WERE", options: ["was/were", "did"] },
    { en: "Where ___ he?", blank: "he", type: "be", answer: "was", why: "be → was/were", options: ["was/were", "did"] },
  ];
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const cur = examples[idx];
  const correct = (cur.answer === "was" || cur.answer === "were" ? "was/were" : "did") === choice;
  return (
    <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5">
      <div className="mb-3 text-center font-bold text-violet-900">🚦 THE DID OR WAS/WERE GATE — بوابة القرار</div>
      <div className="mb-3 flex flex-wrap justify-center gap-2">
        {examples.map((_, i) => (
          <button key={i} onClick={() => { setIdx(i); setChoice(null); }} className={`h-8 w-8 rounded-full text-sm font-bold ${i === idx ? "bg-violet-600 text-white" : "bg-white text-violet-700 border-2 border-violet-200"}`}>{i + 1}</button>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-white bg-white p-4 text-center">
        <En className="text-xl font-black text-slate-900">{cur.en}</En>
        <div className="mt-3 flex justify-center gap-3">
          {cur.options.map((opt) => (
            <button key={opt} onClick={() => setChoice(opt)} className={`rounded-xl border-2 px-4 py-2 font-bold transition ${choice === opt ? (correct ? "bg-emerald-600 border-transparent text-white" : "bg-rose-600 border-transparent text-white") : "bg-slate-100 border-slate-200 text-slate-700"}`}>
              <En>{opt.toUpperCase()}</En>
            </button>
          ))}
        </div>
        {choice && (
          <div className={`pop mt-3 rounded-xl p-3 text-sm font-bold ${correct ? "bg-emerald-50 text-emerald-800 border-2 border-emerald-200" : "bg-rose-50 text-rose-800 border-2 border-rose-200"}`}>
            {correct ? "✓ صحيح! " : "✕ "}{cur.why}
            <div className="mt-1"><En>{cur.en.replace("___", cur.answer)}</En></div>
          </div>
        )}
      </div>
    </div>
  );
}

function TransformationMachine() {
  const [mode, setMode] = useState<"be" | "ordinary">("be");
  const beForms = [
    { label: "AFFIRMATIVE", en: "He was tired.", color: "border-amber-200 bg-amber-50" },
    { label: "NEGATIVE", en: "He wasn't tired.", color: "border-rose-200 bg-rose-50" },
    { label: "QUESTION", en: "Was he tired?", color: "border-violet-200 bg-violet-50" },
  ];
  const ordForms = [
    { label: "AFFIRMATIVE", en: "She visited the farm.", color: "border-amber-200 bg-amber-50" },
    { label: "NEGATIVE", en: "She didn't visit the farm.", color: "border-rose-200 bg-rose-50" },
    { label: "QUESTION", en: "Did she visit the farm?", color: "border-violet-200 bg-violet-50" },
  ];
  const forms = mode === "be" ? beForms : ordForms;
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-5">
      <Toolbar>
        <TabButton active={mode === "be"} onClick={() => setMode("be")} tone="amber"><En>Verb to be</En></TabButton>
        <TabButton active={mode === "ordinary"} onClick={() => setMode("ordinary")} tone="slate"><En>Ordinary verb</En></TabButton>
      </Toolbar>
      <div className="mt-4 grid gap-3">
        {forms.map((f, i) => (
          <div key={f.en} className={`relative rounded-2xl border-2 p-4 text-center ${f.color}`}>
            <div className="text-xs font-bold text-slate-500">{f.label}</div>
            <En className="mt-1 block text-lg font-black text-slate-900">{f.en}</En>
            {i < forms.length - 1 && <div className="absolute -bottom-5 left-1/2 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-slate-900 text-white">↓</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function DidNotAllowed() {
  return (
    <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 to-orange-50 p-5">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-black text-white">🚨 DID IS NOT ALLOWED HERE</div>
        <div className="mt-2 font-bold text-rose-800">DID does NOT enter the WAS/WERE system.</div>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {DID_NOT_WITH_BE_15.examples.map((ex) => (
          <div key={ex.wrong} className="grid gap-2 rounded-2xl border-2 border-white bg-white p-3">
            <SourceLine en={ex.wrong} tone="bad" />
            <SourceLine en={ex.right} tone="good" />
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-slate-900 p-3 text-center text-sm font-bold text-white">
        <Rich text={DID_NOT_WITH_BE_15.reason} />
      </div>
    </div>
  );
}

function TimeMachine() {
  const [active, setActive] = useState(0);
  const pairs = [
    { now: "She is happy.", past: "She was happy." },
    { now: "They are tired.", past: "They were tired." },
    { now: "He is nervous.", past: "He was nervous." },
    { now: "We are at home.", past: "We were at home." },
  ];
  const cur = pairs[active];
  return (
    <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
      <div className="mb-3 text-center font-bold text-cyan-800">🕰️ TIME MACHINE — آلة الزمن</div>
      <div className="flex flex-wrap justify-center gap-2">
        {pairs.map((_, i) => <button key={i} onClick={() => setActive(i)} className={`h-8 w-8 rounded-full text-sm font-bold ${i === active ? "bg-cyan-600 text-white" : "bg-white border-2 border-cyan-200 text-cyan-700"}`}>{i + 1}</button>)}
      </div>
      <div key={active} className="pop mt-4 grid gap-3 md:grid-cols-3 items-center">
        <div className="rounded-2xl border-2 border-white bg-white p-4 text-center">
          <div className="text-xs font-bold text-slate-500">NOW</div>
          <En className="mt-1 block text-lg font-black text-cyan-900">{cur.now}</En>
        </div>
        <div className="text-center text-3xl">↓</div>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-center">
          <div className="text-xs font-bold text-amber-700">PAST</div>
          <En className="mt-1 block text-lg font-black text-amber-900">{cur.past}</En>
        </div>
      </div>
    </div>
  );
}

function Detector() {
  const items = [
    { en: "He played football.", type: "ordinary", why: "played = فعل عادي" },
    { en: "He was tired.", type: "be", why: "was = Verb to be + tired = Adjective" },
    { en: "She visited the museum.", type: "ordinary", why: "visited = فعل حدث" },
    { en: "She was happy.", type: "be", why: "was = Verb to be — نصف حالتها" },
    { en: "They explored the cave.", type: "ordinary", why: "explored = فعل حدث" },
    { en: "They were tired.", type: "be", why: "were = Verb to be — حالة" },
    { en: "She was at the farm.", type: "be", why: "at the farm = مكان → was/were" },
    { en: "She visited the farm.", type: "ordinary", why: "visit = فعل عادي → did" },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
      <div className="mb-3 text-center font-bold text-teal-800">🔍 WAS/WERE DETECTOR — كاشف النظام</div>
      <div className="grid gap-2">
        {items.map((it, i) => (
          <div key={it.en} className={`rounded-2xl border-2 p-3 ${open === i ? (it.type === "be" ? "border-amber-300 bg-amber-50" : "border-violet-300 bg-violet-50") : "border-white bg-white"}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 text-left">
              <En className="font-bold text-slate-800">{it.en}</En>
              <span className="mr-auto text-slate-400">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div className="tada mt-2 rounded-xl bg-white p-2 text-center">
                <En className={`rounded-full px-3 py-1 text-sm font-black ${it.type === "be" ? "bg-amber-600 text-white" : "bg-violet-600 text-white"}`}>{it.type === "be" ? "Verb to be" : "ordinary verb"}</En>
                <div className="mt-1 text-xs font-bold text-slate-600">{it.why}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhLab() {
  const [active, setActive] = useState(0);
  const allWh = [
    { wh: "Where", examples: ["Where was she?", "Where were they?", "Where did he go?"] },
    { wh: "When", examples: ["When was the meeting?", "When did Lina arrive?"] },
    { wh: "Why", examples: ["Why was he angry?", "Why were they late?", "Why did he leave?"] },
    { wh: "Who", examples: ["Who was...?", "Who were...?"] },
    { wh: "What", examples: ["What was the problem?", "What was the weather like?", "What were the results?"] },
  ];
  const cur = allWh[active];
  return (
    <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5">
      <div className="mb-3 text-center font-bold text-indigo-800">🧪 WH QUESTION LAB — مختبر أسئلة Wh</div>
      <div className="flex flex-wrap justify-center gap-2">
        {allWh.map((w, i) => <button key={w.wh} onClick={() => setActive(i)} className={`rounded-xl border-2 px-3 py-2 font-en font-black ${i === active ? "bg-indigo-600 border-transparent text-white" : "bg-white border-indigo-200 text-indigo-700"}`}>{w.wh}</button>)}
      </div>
      <div key={active} className="pop mt-4 grid gap-2">
        {cur.examples.map((ex) => <div key={ex} className="rounded-2xl border-2 border-white bg-white p-3 text-center"><En className="font-black text-slate-800">{ex}</En></div>)}
      </div>
    </div>
  );
}

function WhBoard() {
  const boards = [
    { wh: "Where", ar: "أين", items: WH_WITH_BE_15.filter((x) => x.en.startsWith("Where")) },
    { wh: "When", ar: "متى", items: [{ en: "When was the meeting?", ar: "متى كان الاجتماع؟" }] },
    { wh: "Why", ar: "لماذا", items: WH_WITH_BE_15.filter((x) => x.en.startsWith("Why")) },
    { wh: "What", ar: "ما", items: WHAT_WITH_BE_15 },
    { wh: "Who", ar: "من", items: [{ en: "Who was at home?", ar: "من كان في المنزل؟" }] },
  ];
  const [sel, setSel] = useState(0);
  const cur = boards[sel];
  return (
    <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
      <div className="mb-3 text-center font-bold text-fuchsia-800">🗂️ WHO / WHAT / WHERE... VISUAL QUESTION BOARD</div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
        {boards.map((b, i) => <button key={b.wh} onClick={() => setSel(i)} className={`rounded-xl border-2 px-3 py-2 font-en font-bold ${i === sel ? "bg-fuchsia-600 text-white border-transparent" : "bg-white border-fuchsia-200 text-fuchsia-700"}`}>{b.wh} = {b.ar}</button>)}
      </div>
      <div key={sel} className="pop mt-4 grid gap-2">
        {cur.items.map((it) => <div key={it.en} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-white bg-white p-3"><En className="font-black text-slate-800">{it.en}</En><span dir="rtl" className="text-sm font-bold text-slate-500">{it.ar}</span></div>)}
      </div>
    </div>
  );
}

function TimelineView() {
  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex items-center justify-center gap-4">
        <span className="rounded-xl bg-slate-800 px-3 py-1 font-en font-bold text-white">PAST ← الماضي</span>
        <span className="text-2xl">|</span>
        <span className="rounded-xl bg-emerald-600 px-3 py-1 font-en font-bold text-white">NOW ← الحاضر</span>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        {TIMELINE_15.presentPast.map((p) => <div key={p.now} className="rounded-2xl border-2 border-white bg-white p-3 text-center"><En className="block font-bold text-slate-600">{p.now} → {p.past}</En></div>)}
      </div>
    </div>
  );
}

function UsageGrid() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {USAGE_15.map((u) => <div key={u.n} className="flex items-center gap-3 rounded-2xl border-2 border-amber-100 bg-amber-50 p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{u.n}</span><Rich text={u.ar} className="font-bold text-slate-800" /></div>)}
    </div>
  );
}

function ComparisonSystems() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4">
        <div className="text-center font-bold text-violet-800">فعل عادي</div>
        <div className="mt-2 grid gap-2">
          {COMPARISON_SYSTEMS_15.ordinary.sentences.map((s) => <div key={s} className="rounded-xl border-2 border-white bg-white p-2 text-center"><En className="font-bold text-slate-800">{s}</En></div>)}
        </div>
        <div dir="ltr" className="mt-2 text-center"><En className="rounded-full bg-violet-600 px-3 py-1 text-xs font-black text-white">Subject + didn't + Base Verb / Did + Subject + Base Verb?</En></div>
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
        <div className="text-center font-bold text-amber-800">Verb to be</div>
        <div className="mt-2 grid gap-2">
          {COMPARISON_SYSTEMS_15.be.sentences.map((s) => <div key={s} className="rounded-xl border-2 border-white bg-white p-2 text-center"><En className="font-bold text-slate-800">{s}</En></div>)}
        </div>
        <div dir="ltr" className="mt-2 text-center"><En className="rounded-full bg-amber-600 px-3 py-1 text-xs font-black text-white">Subject + was/were + not / Was/Were + Subject + ...?</En></div>
      </div>
    </div>
  );
}

function PresentPastComparison() {
  return (
    <div className="grid gap-2">
      {PRESENT_PAST_15.map((p) => <div key={p.present} className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3"><En className="font-bold text-slate-500">{p.present}</En><span className="text-slate-300">→</span><En className="font-black text-amber-800">{p.past}</En></div>)}
    </div>
  );
}

function TimeWords() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {TIME_WORDS_15.map((w) => <En key={w} className="rounded-xl border-2 border-cyan-200 bg-white px-3 py-1 font-bold text-cyan-800">{w}</En>)}
    </div>
  );
}

function WhenYoung() {
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 text-center">
      <En className="text-xl font-black text-amber-900">{WHEN_YOUNG_15.phrase}</En>
      <div className="mt-1 font-bold text-slate-600">{WHEN_YOUNG_15.ar}</div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <En className="font-black text-slate-800">{WHEN_YOUNG_15.example.en}</En>
        <div className="mt-1 text-sm font-bold text-slate-500">{WHEN_YOUNG_15.example.ar}</div>
        <div className="mt-2 text-xs font-bold text-amber-700">{WHEN_YOUNG_15.example.note}</div>
      </div>
    </div>
  );
}

function DidVsWas() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4 text-center">
        <En className="text-lg font-black text-violet-800">{DID_VS_WAS_15.didExample.q}</En>
        <div className="mt-1 text-sm font-bold text-slate-500">{DID_VS_WAS_15.didExample.ar}</div>
        <div className="mt-2 rounded-xl bg-white p-2"><En className="font-bold text-violet-800">{DID_VS_WAS_15.didExample.note}</En></div>
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
        <En className="text-lg font-black text-amber-800">{DID_VS_WAS_15.wasExample.q}</En>
        <div className="mt-1 text-sm font-bold text-slate-500">{DID_VS_WAS_15.wasExample.ar}</div>
        <div className="mt-2 rounded-xl bg-white p-2"><En className="font-bold text-amber-800">{DID_VS_WAS_15.wasExample.note}</En></div>
      </div>
    </div>
  );
}

function GeniusComparison() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4">
        <En className="block text-center font-black text-violet-800">{GENIUS_COMPARISON_15.go.sentence}</En>
        <div className="mt-2 text-center"><En className="rounded-xl bg-white px-3 py-1 font-bold text-violet-800">{GENIUS_COMPARISON_15.go.question}</En></div>
        <div className="mt-2 text-center"><En className="rounded-full bg-violet-600 px-3 py-1 text-xs font-black text-white">{GENIUS_COMPARISON_15.go.rule}</En></div>
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
        <En className="block text-center font-black text-amber-800">{GENIUS_COMPARISON_15.be.sentence}</En>
        <div className="mt-2 text-center"><En className="rounded-xl bg-white px-3 py-1 font-bold text-amber-800">{GENIUS_COMPARISON_15.be.question}</En></div>
        <div className="mt-2 text-center"><En className="rounded-full bg-amber-600 px-3 py-1 text-xs font-black text-white">{GENIUS_COMPARISON_15.be.rule}</En></div>
      </div>
    </div>
  );
}

function WhatExamples() {
  return (
    <div className="grid gap-2">
      {WHAT_WITH_BE_15.map((w) => <div key={w.en} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3"><En className="font-black text-slate-800">{w.en}</En><span className="text-sm font-bold text-slate-500">{w.ar}</span></div>)}
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center"><En className="font-black text-amber-800">{WHAT_NOTE_15}</En></div>
    </div>
  );
}

// ============================================================
// تمارين
// ============================================================

function Level1Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-2.5">
      {LEVEL1_15.map((it, i) => {
        const p = picked[i];
        const ok = p === it.answer;
        return (
          <div key={it.stem} className={`rounded-3xl border-2 p-4 ${p ? (ok ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{it.n}</span>
              <En className="text-lg font-black text-slate-800">{it.stem}</En>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {it.options.map((opt) => (
                <button key={opt} onClick={() => setPicked((s) => ({ ...s, [i]: opt }))} dir="ltr" className={`rounded-xl border-2 px-4 py-2 font-en font-bold ${p === opt ? (ok ? "bg-emerald-600 text-white border-transparent" : "bg-rose-600 text-white border-transparent") : "bg-white border-slate-200 text-slate-700"}`}>{opt}</button>
              ))}
              {p && <span className={`rounded-xl px-3 py-2 text-sm font-bold ${ok ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>{ok ? "✓" : "✕"} {it.en}</span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Level2Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {LEVEL2_15.map((it, i) => (
        <div key={it.sentence} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{it.n}</span>
            <En className="font-black text-slate-800">{it.sentence}</En>
          </div>
          <div className="mt-3">
            {!open[i] ? <button onClick={() => setOpen((s) => ({ ...s, [i]: true }))} className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-bold text-white">أظهر النفي</button> : <div className="tada rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center"><En className="font-black text-emerald-800">{it.answer}</En></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Level3Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {LEVEL3_15.map((it, i) => (
        <div key={it.sentence} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{it.n}</span>
            <En className="font-black text-slate-800">{it.sentence}</En>
          </div>
          <div className="mt-3">
            {!open[i] ? <button onClick={() => setOpen((s) => ({ ...s, [i]: true }))} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white">أظهر السؤال</button> : <div className="tada rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center"><En className="font-black text-violet-800">{it.answer}</En></div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Level4Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center font-bold text-amber-800"><Rich text={LEVEL4_NOTE_15} /></div>
      <div className="grid gap-2.5">
        {LEVEL4_15.map((it, i) => {
          const p = picked[i];
          const ok = p === it.answer;
          return (
            <div key={it.stem} className={`rounded-3xl border-2 p-4 ${p ? (ok ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white"}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{it.n}</span>
                <En className="font-black text-slate-800">{it.stem}</En>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {it.options.map((opt) => (
                  <button key={opt} onClick={() => setPicked((s) => ({ ...s, [i]: opt }))} dir="ltr" className={`rounded-xl border-2 px-4 py-2 font-en font-bold ${p === opt ? (ok ? "bg-emerald-600 text-white border-transparent" : "bg-rose-600 text-white border-transparent") : "bg-white border-slate-200 text-slate-700"}`}>{opt}</button>
                ))}
                {p && <span className={`rounded-xl px-3 py-2 text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>{it.why}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Level5Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center font-bold text-emerald-800">✅ الحل</div>
      {LEVEL5_15.map((it, i) => (
        <div key={it.wrong} className={`rounded-3xl border-2 p-4 ${open[i] ? "border-emerald-300 bg-emerald-50" : "border-rose-200 bg-rose-50/40"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{it.n}</span>
            <En className="font-extrabold text-rose-800 line-through decoration-rose-300">{it.wrong}</En>
            {!open[i] ? <button onClick={() => setOpen((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-3 py-1 text-sm font-bold text-white">صحح</button> : <span className="tada mr-auto flex items-center gap-2"><span className="text-slate-400">→</span><En className="font-black text-emerald-800">{it.correct}</En></span>}
          </div>
          {open[i] && it.note && <div className="mt-2 rounded-xl bg-white p-2 text-center text-xs font-bold text-slate-600">{it.note}</div>}
        </div>
      ))}
    </div>
  );
}

function Level6Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-2.5">
      {LEVEL6_15.map((it, i) => {
        const p = picked[i];
        const ok = p === it.answer;
        return (
          <div key={it.stem} className={`rounded-3xl border-2 p-4 ${p ? (ok ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-orange-600 text-sm font-bold text-white">{it.n}</span>
              <En className="font-black text-slate-800">{it.stem}</En>
            </div>
            <div className="mt-3 flex gap-2">
              {it.options.map((opt) => (
                <button key={opt} onClick={() => setPicked((s) => ({ ...s, [i]: opt }))} dir="ltr" className={`rounded-xl border-2 px-4 py-2 font-en font-bold ${p === opt ? (ok ? "bg-emerald-600 text-white border-transparent" : "bg-rose-600 text-white border-transparent") : "bg-white border-slate-200 text-slate-700"}`}>{opt}</button>
              ))}
              {p && <span className={`rounded-xl px-3 py-1 text-sm font-bold ${ok ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>{ok ? "✓" : "✕"}</span>}
            </div>
          </div>
        );
      })}
      <div className="mt-2 rounded-2xl border-2 border-slate-100 bg-slate-50 p-3 text-sm font-bold text-slate-600">الإجابات: ① Was ② Did ③ Were ④ Did ⑤ Was</div>
    </div>
  );
}

function DetectiveEx() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
        <div className="mb-2 text-sm font-bold text-teal-800">اقرأ:</div>
        <En className="block text-base font-bold leading-8 text-slate-800 md:text-lg">{DETECTIVE_PASSAGE_15}</En>
      </div>
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center font-bold text-teal-900">الآن أجب:</div>
      <div className="grid gap-2">
        {DETECTIVE_Q_15.map((it, i) => (
          <div key={it.q} className={`rounded-3xl border-2 p-4 ${open === i ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 text-right">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{it.n}</span>
              <En className="font-extrabold text-slate-800">{it.q}</En>
              <span className="mr-auto text-slate-400">{open === i ? "↺" : "؟"}</span>
            </button>
            {open === i && (
              <div className="tada mt-3 rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
                <En className="font-black text-emerald-800">{it.answer}</En>
                {it.note && <div className="mt-2 text-xs font-bold text-amber-700">{it.note}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function IQ200AEx() {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
        <SourceLine en={IQ200_15.sentence} />
        <div className="mt-3 text-center font-bold text-slate-700">كوّن:</div>
        <div className="mt-2 grid gap-2">
          {IQ200_15.tasks.map((t) => (
            <div key={t.label} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-white bg-white p-3">
              <span className="rounded-xl bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">{t.label}</span>
              {show && <En className="font-black text-emerald-800">{t.answer}</En>}
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setShow((v) => !v)} className="rounded-xl bg-orange-600 px-5 py-2 font-bold text-white">{show ? "إخفاء الحل" : "اعرض الحل"}</button>
      {show && (
        <div className="tada grid gap-2 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
          {IQ200_15.tasks.map((t) => <div key={t.label} className="rounded-2xl border-2 border-white bg-white p-3"><div className="text-xs font-bold text-slate-500">{t.label}</div><En className="font-black text-slate-800">{t.answer}</En></div>)}
        </div>
      )}
    </div>
  );
}

function IQ200BEx() {
  const [picked, setPicked] = useState<Record<number, boolean>>({});
  const correctSet = new Set(IQ200_SYSTEM_15.correctAnswers.map((a) => a.split(" ")[1])); // extract english part
  // Actually check by n
  const isCorrect = (n: string) => ["②", "④"].includes(n);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="font-bold text-slate-800">{IQ200_SYSTEM_15.question}</div>
        <div className="mt-3 grid gap-2">
          {IQ200_SYSTEM_15.options.map((opt) => {
            const sel = picked[Number(opt.n.replace(/[^0-9]/g, ""))];
            const correct = isCorrect(opt.n);
            return (
              <div key={opt.en} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${sel !== undefined ? (sel === correct ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-white bg-white"}`}>
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-800 text-sm font-bold text-white">{opt.n}</span>
                <En className={`font-black ${opt.en.includes("❌") ? "line-through decoration-rose-300" : "text-slate-800"}`}>{opt.en}</En>
                <button onClick={() => setPicked((s) => ({ ...s, [Number(opt.n.replace(/[^0-9]/g, ""))]: true }))} className="mr-auto rounded-xl bg-slate-100 px-3 py-1 text-xs font-bold">تحقق</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
        <div className="font-bold text-emerald-800">الإجابات الصحيحة:</div>
        <div className="mt-2 grid gap-2">
          {IQ200_SYSTEM_15.correctAnswers.map((ans) => <div key={ans} className="rounded-xl bg-white p-2 text-center"><En className="font-black text-emerald-800">{ans}</En></div>)}
        </div>
        <div className="mt-3 text-sm font-bold text-slate-600">السبب: {IQ200_SYSTEM_15.reason}</div>
      </div>
    </div>
  );
}

function FinalChallengeEx() {
  const [text, setText] = useState("");
  const checks = {
    was: (text.match(/\bwas\b/gi) || []).length,
    were: (text.match(/\bwere\b/gi) || []).length,
    negative: (text.match(/\bwasn't\b|\bweren't\b|\bwas not\b|\bwere not\b/gi) || []).length,
    questions: (text.match(/\?/g) || []).length,
    wh: (text.match(/\bWhere\b|\bWhen\b|\bWhy\b|\bWhat\b|\bWho\b/gi) || []).length,
    sentences: text.split(/[.!?]+/).filter((s) => s.trim().length > 3).length,
  };
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <TextBlock text={FINAL_CHALLENGE_15.instruction} className="text-lg font-bold text-slate-800" />
        <div className="mt-4 grid gap-2">
          {FINAL_CHALLENGE_15.requirements.map((req) => <div key={req} className="rounded-2xl bg-white p-3 font-bold text-slate-800"><Rich text={req} /></div>)}
        </div>
        <TextBlock text={FINAL_CHALLENGE_15.note} className="mt-4 font-bold text-slate-700" />
        <div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2">
          {FINAL_CHALLENGE_15.vocab.map((v) => <En key={v} className="rounded-xl border-2 border-amber-200 bg-white px-3 py-1 font-black text-amber-800">{v}</En>)}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <label className="block text-sm font-bold text-slate-600">اكتب فقرتك هنا (8 جمل):</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10} dir="ltr" className="mt-2 w-full rounded-2xl border-2 border-slate-200 p-3 font-en text-base outline-none transition focus:border-amber-400" placeholder="I was at..." />
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className={`rounded-xl p-2 text-center text-sm font-bold ${checks.was >= 2 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>was: {checks.was} / 2+</div>
          <div className={`rounded-xl p-2 text-center text-sm font-bold ${checks.were >= 2 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>were: {checks.were} / 2+</div>
          <div className={`rounded-xl p-2 text-center text-sm font-bold ${checks.negative >= 2 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>neg: {checks.negative} / 2+</div>
          <div className={`rounded-xl p-2 text-center text-sm font-bold ${checks.questions >= 2 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>questions: {checks.questions} / 2+</div>
          <div className={`rounded-xl p-2 text-center text-sm font-bold ${checks.wh >= 1 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>Wh: {checks.wh} / 1+</div>
          <div className={`rounded-xl p-2 text-center text-sm font-bold ${checks.sentences >= 8 ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"}`}>sentences: {checks.sentences} / 8</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// شرائح ختامية
// ============================================================
function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس يجب أن يعرف الطالب:">
      <div className="grid gap-3">
        {OBJECTIVES_15.map((it) => (
          <div key={it.n} className="flex items-start gap-3 rounded-3xl border-2 border-amber-100 bg-amber-50/60 p-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-amber-600 text-sm font-bold text-white">{it.n}</span>
            <Rich text={it.text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border-2 border-amber-200 bg-white p-4">
        <div className="text-center font-bold text-slate-700">الفرق المركزي:</div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center">
            <div className="text-xs font-bold text-violet-700">ORDINARY VERB</div>
            <En className="block font-black text-slate-800">He played.</En>
            <En className="block font-bold text-slate-600">He didn't play.</En>
            <En className="block font-bold text-violet-800">Did he play?</En>
          </div>
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
            <div className="text-xs font-bold text-amber-700">VERB TO BE</div>
            <En className="block font-black text-slate-800">He was tired.</En>
            <En className="block font-bold text-slate-600">He wasn't tired.</En>
            <En className="block font-bold text-amber-800">Was he tired?</En>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function Cover() {
  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-xl">
      <div className="relative p-7 md:p-12">
        <div className="absolute -right-10 -top-10 text-9xl opacity-10">🟠</div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700"><Rich text="الدرس 15" /></div>
          <h1 className="font-head mt-5 max-w-3xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl"><Rich text="الدرس 15: Past Simple of Verb to be — was / were" /></h1>
          <div className="mt-3" dir="ltr"><En className="text-xl font-extrabold text-amber-700 md:text-2xl">Past Simple of Verb to be — was / were</En></div>
          <div className="mt-3 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center font-bold text-amber-900">🚨 We do NOT use did with was/were.</div>
          <div className="mt-8 rounded-3xl border-2 border-white bg-white/90 p-5 shadow-sm">
            <div className="mb-3 text-center font-bold text-slate-600">لوحة التحكم الأساسية</div>
            <FormulaBoard15 />
          </div>
          <div className="mt-6 rounded-3xl border-2 border-amber-100 bg-white/80 p-5">
            <div className="mb-3 text-lg font-bold text-amber-900">خطة سريعة للتعلم</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {COVER_PLAN_15.map((it) => <div key={it} className="rounded-2xl bg-amber-50 p-3 text-sm font-bold text-slate-700"><Rich text={it} /></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[41]} title="ملخص الدرس 15" lead="أهم النقاط:">
      <div className="grid gap-3">
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
          <div className="text-sm font-bold text-amber-800">مثبت</div>
          <En className="mt-1 block text-lg font-black text-amber-900">{SUMMARY_15.affirmative.was}</En>
          <En className="block text-lg font-black text-orange-800">{SUMMARY_15.affirmative.were}</En>
        </div>
        <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-center">
          <div className="text-sm font-bold text-rose-800">نفي</div>
          <En className="block font-black">{SUMMARY_15.negative.was}</En>
          <En className="block font-black">{SUMMARY_15.negative.were}</En>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4 text-center">
          <div className="text-sm font-bold text-violet-800">سؤال</div>
          <En className="block font-black">{SUMMARY_15.question.was}</En>
          <En className="block font-black">{SUMMARY_15.question.were}</En>
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <div className="text-center text-sm font-bold text-emerald-800">إجابة قصيرة</div>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            {SUMMARY_15.short.map((s) => <div key={s} className="rounded-xl bg-white p-2 text-center"><En className="font-black text-slate-800">{s}</En></div>)}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-slate-900 bg-slate-900 p-4 text-center text-white">
          <div className="font-bold">⭐ أهم قاعدة</div>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            <div className="rounded-xl bg-white/10 p-3">
              <div className="text-xs text-white/60">مع الأفعال العادية:</div>
              {SUMMARY_15.golden.ordinary.map((o) => <En key={o} className="block font-bold text-white">{o}</En>)}
            </div>
            <div className="rounded-xl bg-amber-500/20 p-3">
              <div className="text-xs text-amber-200">لكن مع Verb to be:</div>
              {SUMMARY_15.golden.be.map((o) => <En key={o} className="block font-bold text-amber-100">{o}</En>)}
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-rose-600 px-3 py-2 font-black">{SUMMARY_15.golden.warning}</div>
        </div>
      </div>
      <FormulaBoardAll15 />
    </Frame>
  );
}

function KeyRule() {
  return (
    <Frame mascot="🔥" sourceHeading="القاعدة الذهبية" title="القاعدة الذهبية" lead="احفظ النظامين ولا تخلطهما.">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 text-center">
          <div className="text-sm font-bold text-violet-700">ORDINARY VERB</div>
          <En className="mt-2 block text-xl font-black">He played.</En>
          <En className="block text-lg font-bold">He didn't play.</En>
          <En className="block text-lg font-black text-violet-800">Did he play?</En>
        </div>
        <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-5 text-center">
          <div className="text-sm font-bold text-amber-700">VERB TO BE</div>
          <En className="mt-2 block text-xl font-black">He was tired.</En>
          <En className="block text-lg font-bold">He wasn't tired.</En>
          <En className="block text-lg font-black text-amber-800">Was he tired?</En>
        </div>
      </div>
      <DidNotAllowed />
      <div className="rounded-3xl border-2 border-rose-300 bg-rose-50 p-5 text-center">
        <En className="text-2xl font-black text-rose-700">🚨 DID does NOT enter the WAS/WERE system.</En>
        <div className="mt-3 grid gap-2">
          <div className="grid gap-2 md:grid-cols-2"><SourceLine en="Did he be tired? ❌" tone="bad" /><SourceLine en="Was he tired? ✅" tone="good" /></div>
          <div className="grid gap-2 md:grid-cols-2"><SourceLine en="Did they be happy? ❌" tone="bad" /><SourceLine en="Were they happy? ✅" tone="good" /></div>
          <div className="grid gap-2 md:grid-cols-2"><SourceLine en="He didn't was tired. ❌" tone="bad" /><SourceLine en="He wasn't tired. ✅" tone="good" /></div>
          <div className="grid gap-2 md:grid-cols-2"><SourceLine en="They didn't were ready. ❌" tone="bad" /><SourceLine en="They weren't ready. ✅" tone="good" /></div>
          <div className="grid gap-2 md:grid-cols-2"><SourceLine en="Were they visit the castle? ❌" tone="bad" /><SourceLine en="Did they visit the castle? ✅" tone="good" /></div>
        </div>
      </div>
    </Frame>
  );
}

function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[42]} title="مكاننا في المنهج" lead="تسلسل القواعد حتى الآن:">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_15.map((it) => (
          <div key={it.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${it.here ? "border-amber-400 bg-amber-100 shadow" : "border-slate-100 bg-white"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${it.here ? "bg-amber-600" : "bg-slate-500"}`}>{it.n}</span>
            <div>
              <Rich text={it.en} className={`font-bold ${it.here ? "text-amber-900" : "text-slate-700"}`} />
              {it.ar && <div className="text-xs font-bold text-slate-500">{it.ar}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5"><Rich text={ROADMAP_15_NEXT} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" /></div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-amber-200 bg-gradient-to-br from-amber-600 to-orange-700 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 15.</h2>
      <div className="mt-4 text-lg leading-relaxed text-amber-50"><Rich text="الآن تتحكم في نظامين مختلفين تماماً: الأفعال العادية مع did / didn't و Verb to be مع was / were. هذا تمييز أساسي سيرافقك في كل دروس الماضي." /></div>
      <div className="mt-4 rounded-2xl bg-white/10 p-4"><Rich text={ROADMAP_15_NEXT} /></div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-amber-700 transition hover:bg-amber-50">← جميع الدروس</button>
        <span className="rounded-xl border-2 border-white/40 px-5 py-3 font-bold text-white/80">الدرس 16 قريباً → الملكية</span>
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block15 }) {
  switch (block.type) {
    case "text": return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english": return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "list": return <div className="grid gap-2">{block.items.map((it, i) => <div key={`${it}-${i}`} className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-3"><Rich text={it} className="font-bold text-slate-700" /></div>)}</div>;
    case "formula": return <FormulaRowView formula={FORMULAS_15.find((f) => f.key === block.key)!} emphasis />;
    case "sentence": return <div className="rounded-3xl border-2 border-slate-100 bg-white p-4"><En className="block text-center text-lg font-extrabold text-slate-900 md:text-xl">{block.en}</En>{block.ar && <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">{block.ar}</div>}{block.note && <div className="mt-2 rounded-xl bg-amber-50 p-2 text-center text-sm font-bold text-amber-800"><Rich text={block.note} /></div>}</div>;
    case "note": return <Note emoji={block.emoji} text={block.text} />;
    case "wasWereBoard": return <WasWereBoard />;
    case "commandCenter": return <CommandCenter />;
    case "didGate": return <DidGate />;
    case "transformationMachine": return <TransformationMachine />;
    case "didNotAllowed": return <DidNotAllowed />;
    case "timeMachine": return <TimeMachine />;
    case "detector": return <Detector />;
    case "whLab": return <WhLab />;
    case "whBoard": return <WhBoard />;
    case "timeline": return <TimelineView />;
    case "usageGrid": return <UsageGrid />;
    case "comparisonSystems": return <ComparisonSystems />;
    case "presentPastComparison": return <PresentPastComparison />;
    case "timeWords": return <TimeWords />;
    case "whenYoung": return <WhenYoung />;
    case "didVsWas": return <DidVsWas />;
    case "geniusComparison": return <GeniusComparison />;
    case "whatExamples": return <WhatExamples />;
  }
}

function ExerciseView({ exercise }: { exercise: Exercise15 }) {
  switch (exercise.type) {
    case "level1": return <Level1Ex />;
    case "level2": return <Level2Ex />;
    case "level3": return <Level3Ex />;
    case "level4": return <Level4Ex />;
    case "level5": return <Level5Ex />;
    case "level6": return <Level6Ex />;
    case "detective": return <DetectiveEx />;
    case "iq200a": return <IQ200AEx />;
    case "iq200b": return <IQ200BEx />;
    case "finalChallenge": return <FinalChallengeEx />;
  }
}

function sourceHeadingFor(slide: Slide15): string | undefined {
  if (slide.kind === "objectives") return SOURCE_SECTIONS[0];
  if (slide.kind === "lesson") return SOURCE_SECTIONS[Number(slide.step)];
  if (slide.kind === "ex") {
    const match = slide.badge.match(/(29|30|31|32|33|34|35|36|37|38)/);
    if (!match) return undefined;
    const number = Number(match[1]);
    // mapping: badge 29 -> index 29, etc.
    return SOURCE_SECTIONS[number];
  }
  if (slide.kind === "summary") return SOURCE_SECTIONS[41];
  if (slide.kind === "roadmap") return SOURCE_SECTIONS[42];
  return undefined;
}

export function SlideView15({ s, onExit }: { s: Slide15; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson": return <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={undefined}>{s.blocks.map((block, i) => <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}><BlockView block={block} /></div>)}</Frame>;
    case "ex": return <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}><ExerciseView exercise={s.ex} /></Frame>;
    case "summary": return <Summary />;
    case "keyRule": return <KeyRule />;
    case "roadmap": return <Roadmap />;
    case "quiz": return <Frame mascot={s.mascot} badge="الاختبار النهائي" title={<Rich text={s.title} />} lead="أسئلة جديدة تقيس التحكم في was / were و did مقابل was/were."><FinalQuiz lesson={15} accent="bg-amber-600" /></Frame>;
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide15): string {
  if (slide.kind === "cover") return "الغلاف";
  if (slide.kind === "objectives") return "أهداف الدرس";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  [ "البداية" ]: "text-slate-400",
  [ "الأساس — was / were" ]: "text-amber-600",
  [ "الاستخدامات" ]: "text-orange-600",
  [ "النظامان — الفعل العادي مقابل Verb to be" ]: "text-rose-600",
  [ "الأسئلة والإجابات" ]: "text-violet-600",
  [ "Wh Questions مع was/were" ]: "text-indigo-600",
  [ "التمارين والتحديات" ]: "text-emerald-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900"><Rich text="الدرس 15 · was / were" /></div>
        <En className="text-xs font-semibold text-slate-400">Past Simple of Verb to be — was / were</En>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] || "text-slate-400"}`}><Rich text={group.section} /></div>
            {group.indexes.map((index) => {
              const active = index === i;
              return (
                <button key={index} onClick={() => { setI(index); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-amber-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>{index + 1}</span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[index])}</span>
                  <span className="mr-auto text-base">{SLIDES[index].mascot}</span>
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

export default function Lesson15({ onExit }: { onExit: () => void }) {
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

  useEffect(() => { document.getElementById("l15-main")?.scrollTo({ top: 0 }); }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fffaf3] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"><Rail i={index} setI={setIndex} onExit={onExit} /></div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500"><Rich text={`${slide.section} · `} /><span className="text-slate-800"><Rich text={slideTitle(slide)} /></span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-l from-amber-600 via-orange-500 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{index + 1} / {total}</span>
          </header>
          <main id="l15-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10"><div key={index} className="pop mx-auto max-w-4xl"><SlideView15 s={slide} onExit={onExit} /></div></main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={navigation.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={navigation.next} disabled={index === total - 1} className="rounded-full bg-amber-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-amber-700 disabled:opacity-30">التالي ←</button>
            </div>
          </div>
        </div>
      </div>
      {menu && <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}><div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" /><div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}><Rail i={index} setI={setIndex} onExit={onExit} onClose={() => setMenu(false)} /></div></div>}
    </div>
  );
}
