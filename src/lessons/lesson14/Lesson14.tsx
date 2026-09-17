import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  FORMULAS_14,
  ROLE14_AR,
  OBJECTIVES_14,
  RECAP_14,
  WH_MEANINGS_14,
  WHAT_EXAMPLES_14,
  WHERE_EXAMPLES_14,
  WHEN_EXAMPLES_14,
  WHY_EXAMPLES_14,
  HOW_EXAMPLES_14,
  WHO_EXAMPLE_14,
  DANIEL_SENTENCE_14,
  EMMA_SENTENCE_14,
  WHO_CONTRAST_14,
  ANSWER_COMPARISONS_14,
  NO_REPEAT_14,
  FOUR_WAYS_14,
  CONTROL_TABLE_14,
  IRREGULAR_CONTROL_14,
  WHY_IMPORTANT_14,
  CONVERSION_GAME_14,
  LEVEL1_14,
  LEVEL2_14,
  LEVEL3_14,
  LEVEL4_14,
  DETECTIVE_PASSAGE_14,
  DETECTIVE_Q_14,
  IQ200_14,
  HARD_CHALLENGE_14,
  MINI_CONVERSATION_14,
  FINAL_CHALLENGE_14,
  SUMMARY_14,
  GOLDEN_RULE_14,
  ROADMAP_14,
  ROADMAP_14_NEXT,
  COVER_PLAN_14,
  type Block14,
  type Exercise14,
  type Part14,
  type Role14,
  type Slide14,
  type FormulaKey14,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 14 — Wh Questions + التطبيق الشامل
// كل الإنجليزية في هذا الملف وحدة LTR كاملة؛ لا نقسم الجملة إلى كلمات.
// ============================================================
const ROLE_STYLE: Record<Role14, string> = {
  subject: "border-sky-300 bg-sky-100 text-sky-900",
  past: "border-orange-300 bg-orange-100 text-orange-900",
  base: "border-emerald-300 bg-emerald-100 text-emerald-900",
  did: "border-violet-300 bg-violet-100 text-violet-900",
  wh: "border-fuchsia-300 bg-fuchsia-100 text-fuchsia-900",
  object: "border-teal-300 bg-teal-100 text-teal-900",
  place: "border-cyan-300 bg-cyan-100 text-cyan-900",
  time: "border-amber-300 bg-amber-100 text-amber-900",
  reason: "border-rose-300 bg-rose-100 text-rose-900",
  method: "border-indigo-300 bg-indigo-100 text-indigo-900",
};

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

/**
 * نص عربي مختلط: كل run لاتيني متصل يبقى وحدة LTR واحدة.
 * [[...]] تُستخدم عندما نريد إبراز عبارة إنجليزية كاملة داخل السطر العربي.
 */
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
  return <div className={className}><Rich text={text} /></div>;
}

function SourceLine({ en, ar, tone = "neutral" }: { en: string; ar?: string; tone?: "neutral" | "good" | "bad" | "focus" }) {
  const toneClass =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : tone === "bad"
        ? "border-rose-200 bg-rose-50 text-rose-800 line-through decoration-rose-300"
        : tone === "focus"
          ? "border-violet-200 bg-violet-50 text-violet-900"
          : "border-slate-100 bg-white text-slate-900";
  return (
    <div className={`rounded-2xl border-2 p-3 ${toneClass}`}>
      <En className="block text-lg font-extrabold md:text-xl">{en}</En>
      {ar && <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">{ar}</div>}
    </div>
  );
}

function PartsLine({ parts, q = false, label = true, size = "md" }: { parts: Part14[]; q?: boolean; label?: boolean; size?: "sm" | "md" | "lg" }) {
  const tokenSize = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end justify-center gap-2">
      {parts.map((part, i) => (
        <span key={`${part.text}-${i}`} className="inline-flex flex-col items-center">
          <span dir="ltr" className={`font-en inline-flex items-center rounded-2xl border-2 font-extrabold leading-tight ${ROLE_STYLE[part.role]} ${tokenSize}`}>
            {part.text}
          </span>
          {label && <span dir="rtl" className="mt-0.5 text-[10px] font-bold text-slate-500">{ROLE14_AR[part.role]}</span>}
        </span>
      ))}
      <span dir="ltr" className="font-en pb-1 text-2xl font-black text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function FormulaRowView({ formula, emphasis = false }: { formula: (typeof FORMULAS_14)[number]; emphasis?: boolean }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-formula={formula.key} className={`ltr-row rounded-3xl border-2 p-3 ${emphasis ? "border-violet-300 bg-violet-50 shadow" : "border-amber-100 bg-amber-50/70"}`}>
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

/** لوحة الصيغ الأساسية — جميع الصيغ في ترتيب إنجليزي لا ينقلب داخل RTL. */
export function FormulaBoard14() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l14-formulas" className="ltr-row grid gap-3">
      {FORMULAS_14.map((formula) => <FormulaRowView key={formula.key} formula={formula} emphasis={formula.key === "wh"} />)}
      <div dir="ltr" className="rounded-2xl border-2 border-violet-200 bg-white p-3 text-center">
        <En className="text-lg font-black text-violet-800">Wh + did + Subject + Base Verb?</En>
        <Rich text="الصيغة البصرية المختصرة نفسها: Wh → did → Subject → Base Verb" className="mt-1 block text-xs font-bold text-slate-500" />
      </div>
    </div>
  );
}

function SentenceCard({ en, ar, parts, q, note }: { en: string; ar?: string; parts?: Part14[]; q?: boolean; note?: string }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <En className="block text-center text-lg font-extrabold text-slate-900 md:text-xl">{en}</En>
      {ar && <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">{ar}</div>}
      {parts && <div className="mt-4"><PartsLine parts={parts} q={q} /></div>}
      {note && <div className="mt-3 rounded-xl bg-amber-50 p-2 text-center text-sm font-bold text-amber-800"><Rich text={note} /></div>}
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip, sourceHeading }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: string; children: React.ReactNode; tip?: string; sourceHeading?: string }) {
  return (
    <section dir="rtl" className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(124,58,237,0.28)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>{mascot}</div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-violet-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-violet-100 px-3.5 py-1.5 text-sm font-bold text-violet-800"><Rich text={badge} /></span>}
      </div>
      {sourceHeading && <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500"><Rich text={sourceHeading} /></div>}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl"><Rich text={lead} /></div>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-violet-600 to-fuchsia-600 p-4 text-white"><span className="text-2xl">🦉</span><span className="text-base font-semibold md:text-lg"><Rich text={tip} /></span></div>}
    </section>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return <div className="flex items-start gap-3 rounded-3xl border-2 border-violet-200 bg-violet-50 p-4"><span className="text-2xl">{emoji}</span><Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" /></div>;
}

function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>;
}

function TabButton({ active, onClick, children, tone = "violet" }: { active: boolean; onClick: () => void; children: React.ReactNode; tone?: "violet" | "amber" | "slate" | "emerald" }) {
  const activeClass = tone === "amber" ? "bg-amber-600" : tone === "slate" ? "bg-slate-800" : tone === "emerald" ? "bg-emerald-600" : "bg-violet-600";
  return <button onClick={onClick} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${active ? `border-transparent ${activeClass} text-white shadow` : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"}`}>{children}</button>;
}

// ============================================================
// أدوات Wh وتفاعليات الشرح
// ============================================================
function RecapBlock() {
  const rows = [
    ["الجملة المثبتة", RECAP_14.affirmative],
    ["النفي", RECAP_14.negative],
    ["السؤال", RECAP_14.yesNo],
    ["Wh Question", RECAP_14.wh],
  ];
  return <div className="grid gap-3">{rows.map(([label, row]) => <div key={label} className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4"><div className="mb-2 text-sm font-bold text-slate-500"><Rich text={label} /></div><SourceLine en={row.en} ar={row.ar} /></div>)}</div>;
}

function WhMeanings() {
  const [active, setActive] = useState("What");
  const current = WH_MEANINGS_14.find((item) => item.word === active) ?? WH_MEANINGS_14[0];
  return (
    <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {WH_MEANINGS_14.map((item) => <button key={item.word} dir="ltr" onClick={() => setActive(item.word)} className={`rounded-2xl border-2 bg-white px-3 py-3 transition ${active === item.word ? "border-fuchsia-500 shadow-lg" : "border-fuchsia-100 hover:border-fuchsia-300"}`}><En className="block text-lg font-black text-fuchsia-700">{item.word}</En><Rich text={`${item.word} = ${item.ar}`} className="mt-1 block text-xs font-bold text-slate-500" /></button>)}
      </div>
      <div key={active} className="pop mt-4 rounded-3xl border-2 border-white bg-white p-4">
        <div className="flex flex-wrap items-center justify-center gap-2"><En className="text-xl font-black text-fuchsia-800">{current.word}</En><span className="text-slate-400">=</span><En className="text-lg font-bold text-slate-700">{current.function}</En></div>
        <div className="mt-3 grid gap-2">{current.examples.map((example) => <div key={example.en} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50 p-3"><En className="font-extrabold text-slate-800">{example.en}</En><span dir="rtl" className="text-sm font-bold text-slate-500">{example.ar}</span></div>)}</div>
      </div>
    </div>
  );
}

function WhExamples({ word }: { word: string }) {
  const source = word === "What" ? WHAT_EXAMPLES_14 : word === "Where" ? WHERE_EXAMPLES_14 : word === "When" ? WHEN_EXAMPLES_14 : word === "Why" ? WHY_EXAMPLES_14 : HOW_EXAMPLES_14;
  return <div className="rounded-3xl border-2 border-fuchsia-100 bg-fuchsia-50/60 p-4"><div className="mb-3 flex items-center gap-2"><En className="rounded-xl bg-fuchsia-600 px-3 py-1 text-lg font-black text-white">{word}</En><span className="text-sm font-bold text-slate-600">اضغط على أدوات السؤال في البطاقات لترى وظيفتها وأمثلتها.</span></div><div className="grid gap-2 md:grid-cols-2">{source.map((item) => <div key={item.question} className="rounded-2xl border-2 border-white bg-white p-3"><En className="block font-extrabold text-slate-800">{item.question}</En><div className="mt-1" dir="rtl"><span className="text-sm font-bold text-slate-500">{item.arQuestion}</span></div></div>)}</div></div>;
}

function WhoCard() {
  return <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5"><div className="grid gap-3 md:grid-cols-2"><div className="rounded-2xl border-2 border-white bg-white p-4 text-center"><En className="text-2xl font-black text-cyan-800">Who</En><div className="mt-1 text-sm font-bold text-slate-500">من</div><Rich text="فاعل Subject أو مفعول به Object" className="mt-3 block rounded-xl bg-cyan-50 p-2 text-sm font-bold text-cyan-800" /></div><div className="rounded-2xl border-2 border-white bg-white p-4 text-center"><En className="text-xl font-black text-slate-800">Who did Sara meet?</En><En className="mt-1 block text-sm font-bold text-slate-500">Who + did + Sara + meet</En></div></div></div>;
}

function DanielBuilder() {
  const [active, setActive] = useState(0);
  const question = DANIEL_SENTENCE_14.questions[active];
  return <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5"><div className="rounded-2xl border-2 border-white bg-white p-4 text-center"><En className="text-lg font-extrabold text-slate-800">{DANIEL_SENTENCE_14.sentence}</En></div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">{DANIEL_SENTENCE_14.parts.map((part) => <div key={part.en} className={`rounded-2xl border-2 p-3 text-center ${ROLE_STYLE[part.role as Role14]}`}><En className="block text-sm font-black">{part.en}</En><span className="mt-1 block text-xs font-bold">{part.ar}</span></div>)}</div><div className="mt-4 flex flex-wrap justify-center gap-2">{DANIEL_SENTENCE_14.questions.map((q, i) => <TabButton key={q.en} active={i === active} onClick={() => setActive(i)}><En>{q.kind}</En></TabButton>)}</div><div key={question.en} className="pop mt-4 rounded-2xl border-2 border-emerald-200 bg-white p-4 text-center"><En className="text-xl font-black text-emerald-800">{question.en}</En><div className="mt-1 text-sm font-bold text-slate-500">{question.ar}</div><div className="mt-3 rounded-xl bg-emerald-50 p-2"><En className="font-bold text-emerald-800">Answer: {question.answer}</En></div></div></div>;
}

function EmmaQuestions() {
  const [open, setOpen] = useState(0);
  const item = EMMA_SENTENCE_14.questions[open];
  return <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5"><div className="grid gap-2">{EMMA_SENTENCE_14.questions.map((q, i) => <button key={q.en} onClick={() => setOpen(i)} className={`flex flex-wrap items-center gap-3 rounded-2xl border-2 bg-white p-3 text-right ${open === i ? "border-teal-500 shadow" : "border-white"}`}><span className="grid h-8 w-8 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{i + 1}</span><En className="font-extrabold text-slate-800">{q.en}</En></button>)}</div><div key={item.en} className="pop mt-4 rounded-2xl border-2 border-white bg-white p-4 text-center"><En className="text-lg font-black text-teal-800">{item.answer}</En><div className="mt-1 text-sm font-bold text-slate-500">إجابة السؤال المختار</div></div></div>;
}

function WhoContrast() {
  const [side, setSide] = useState<"subject" | "object">("subject");
  const current = WHO_CONTRAST_14[side];
  return <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5"><Toolbar><TabButton active={side === "subject"} onClick={() => setSide("subject")} tone="emerald"><En>Who = Subject</En></TabButton><TabButton active={side === "object"} onClick={() => setSide("object")} tone="violet"><En>Who = Object</En></TabButton></Toolbar><div key={side} className="pop mt-4 grid gap-3 md:grid-cols-2"><div className="rounded-2xl border-2 border-white bg-white p-4 text-center"><div className="text-sm font-bold text-slate-500">السؤال</div><En className="mt-1 block text-xl font-black text-slate-900">{current.question}</En><div className="mt-1 text-sm font-bold text-slate-500">{current.arQuestion}</div></div><div className={`rounded-2xl border-2 p-4 text-center ${side === "subject" ? "border-emerald-300 bg-emerald-50" : "border-violet-300 bg-violet-50"}`}><En className="font-black">{current.explanation}</En><div className="mt-2 font-bold text-slate-700">{current.rule}</div></div></div></div>;
}

function AnswerComparison() {
  const [index, setIndex] = useState(0);
  const current = ANSWER_COMPARISONS_14[index];
  return <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5"><Toolbar>{ANSWER_COMPARISONS_14.map((item, i) => <TabButton key={item.question} active={i === index} onClick={() => setIndex(i)}>{i + 1}</TabButton>)}</Toolbar><div key={current.question} className="pop mt-4 rounded-2xl border-2 border-white bg-white p-4"><En className="block text-center text-lg font-black text-slate-900">{current.question}</En><div className="mt-3 grid gap-2 md:grid-cols-2"><div className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-3 text-center"><div className="text-xs font-bold text-slate-500">إجابة قصيرة</div><En className="mt-1 font-black text-emerald-800">{current.short}</En></div><div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center"><div className="text-xs font-bold text-slate-500">إجابة كاملة</div><En className="mt-1 font-black text-emerald-900">{current.full}</En></div></div></div></div>;
}

function NoRepeat() {
  return <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5"><div className="grid gap-2"><SourceLine en={NO_REPEAT_14.wrong} tone="bad" /><SourceLine en={NO_REPEAT_14.correct} tone="good" /></div><div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center"><Rich text={NO_REPEAT_14.why} className="font-bold text-slate-700" /></div></div>;
}

function FourWays() {
  const rows = [["مثبت", FOUR_WAYS_14.affirmative], ["نفي", FOUR_WAYS_14.negative], ["Yes/No", FOUR_WAYS_14.yesNo], ["What", FOUR_WAYS_14.what], ["Where", FOUR_WAYS_14.where]];
  return <div className="grid gap-2">{rows.map(([label, en]) => <div key={label} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3"><span className="rounded-xl bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600"><Rich text={label} /></span><En className="font-extrabold text-slate-800">{en}</En></div>)}</div>;
}

function ControlTable() {
  return <div className="overflow-x-auto rounded-3xl border-2 border-amber-200 bg-amber-50 p-3"><table className="min-w-full border-separate border-spacing-2" dir="rtl"><thead><tr><th className="rounded-xl bg-slate-800 p-3 text-white">النوع</th><th className="rounded-xl bg-violet-600 p-3 text-white">التركيب</th><th className="rounded-xl bg-emerald-600 p-3 text-white">المثال</th></tr></thead><tbody>{CONTROL_TABLE_14.map((row) => <tr key={row.label}><td className="rounded-xl bg-white p-3 text-center font-bold text-slate-700">{row.label}</td><td dir="ltr" className="rounded-xl bg-white p-3 text-center"><En className="font-black text-violet-800">{row.formula}</En></td><td dir="ltr" className="rounded-xl bg-white p-3 text-center"><En className="font-black text-emerald-800">{row.example}</En></td></tr>)}</tbody></table></div>;
}

function IrregularControl() {
  const [verb, setVerb] = useState<"take" | "see">("take");
  const rows = verb === "take" ? IRREGULAR_CONTROL_14.take : IRREGULAR_CONTROL_14.see;
  const change = verb === "take" ? IRREGULAR_CONTROL_14.takeChange : IRREGULAR_CONTROL_14.seeChange;
  return <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5"><Toolbar><TabButton active={verb === "take"} onClick={() => setVerb("take")} tone="amber"><En>take → took</En></TabButton><TabButton active={verb === "see"} onClick={() => setVerb("see")} tone="slate"><En>see → saw</En></TabButton></Toolbar><div className="mt-3 text-center"><En className="rounded-full bg-white px-3 py-1 font-black text-orange-800">{change}</En></div><div key={verb} className="pop mt-4 grid gap-2">{rows.map((row) => <div key={row.en} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-white bg-white p-3"><span className="rounded-xl bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">{row.label}</span><En className="font-extrabold text-slate-800">{row.en}</En></div>)}</div></div>;
}

function WhyImportant() {
  return <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5"><div className="grid gap-3 md:grid-cols-2"><div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4"><div className="text-sm font-bold text-rose-700">تفكير الطالب</div><Rich text={`"${WHY_IMPORTANT_14.thought}"`} className="mt-2 font-bold text-rose-900" /><div className="mt-2 font-bold text-rose-800">{WHY_IMPORTANT_14.correction}</div></div><div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4"><div className="text-sm font-bold text-emerald-700">القاعدة</div><Rich text={WHY_IMPORTANT_14.rule} className="mt-2 font-bold text-emerald-900" /><div className="mt-2"><Rich text={WHY_IMPORTANT_14.didRule} className="font-bold text-emerald-900" /></div></div></div></div>;
}

function ConversionGame() {
  const [index, setIndex] = useState(0);
  const item = CONVERSION_GAME_14[index];
  return <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5"><div className="mb-3 text-center font-bold text-orange-800">اضغط كلمة لترى انتقال الماضي خطوة خطوة.</div><div className="flex flex-wrap justify-center gap-2">{CONVERSION_GAME_14.map((game, i) => <button key={game.word} onClick={() => setIndex(i)} className={`rounded-xl border-2 px-4 py-2 font-en font-black transition ${i === index ? "border-transparent bg-orange-600 text-white" : "border-orange-200 bg-white text-orange-800"}`}>{game.word}</button>)}</div><div key={item.word} className="pop mt-4 grid gap-2 md:grid-cols-2">{item.forms.map((form, i) => <div key={form} className={`rounded-2xl border-2 p-3 text-center ${i === 0 ? "border-orange-300 bg-white" : i === 1 ? "border-rose-200 bg-rose-50" : "border-violet-200 bg-violet-50"}`}><div className="mb-1 text-xs font-bold text-slate-500">{item.labels[i]}</div><En className="font-extrabold text-slate-900">{form}</En></div>)}</div></div>;
}

function ConversationBlock() {
  return <div className="grid gap-2 rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">{MINI_CONVERSATION_14.map((line, i) => <div key={`${line.speaker}-${line.en}`} className={`flex items-start gap-3 ${line.speaker === "B" ? "flex-row-reverse" : ""}`}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-black text-white ${line.speaker === "A" ? "bg-teal-600" : "bg-indigo-600"}`}>{line.speaker}:</span><div className="rounded-2xl border-2 border-white bg-white p-3"><En className="font-extrabold text-slate-800">{line.en}</En></div></div>)}</div>;
}

// ============================================================
// تمارين المستويات الأربعة
// ============================================================
function Reveal({ shown, onClick, children }: { shown: boolean; onClick: () => void; children: React.ReactNode }) {
  return shown ? <div className="tada">{children}</div> : <button onClick={onClick} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:brightness-110">أظهر الحل</button>;
}

function Level1Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return <div className="grid gap-2.5">{LEVEL1_14.map((item, i) => <div key={item.stem} className={`rounded-3xl border-2 p-4 ${open[i] ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}><div className="flex flex-wrap items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">{item.n}</span><En className="text-lg font-black text-slate-800">{item.stem}</En></div><div className="mt-2 flex flex-wrap items-center gap-3"><En className="rounded-xl bg-slate-100 px-3 py-1 font-bold text-slate-600">{item.options}</En><Reveal shown={!!open[i]} onClick={() => setOpen((state) => ({ ...state, [i]: true }))}><span className="rounded-xl bg-emerald-100 px-3 py-1 font-black text-emerald-800"><En>{item.answer}</En></span></Reveal></div></div>)}</div>;
}

function Level2Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return <div className="grid gap-2.5">{LEVEL2_14.map((item, i) => <div key={item.sentence} className="rounded-3xl border-2 border-slate-200 bg-white p-4"><div className="flex flex-wrap items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">{item.n}</span><En className="font-extrabold text-slate-800">{item.sentence}</En><En className="rounded-lg bg-amber-100 px-2 py-1 text-sm font-black text-amber-800">({item.wh})</En></div><div className="mt-3 flex flex-wrap items-center gap-3"><Reveal shown={!!open[i]} onClick={() => setOpen((state) => ({ ...state, [i]: true }))}><div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3"><En className="font-black text-emerald-900">{item.answer}</En></div></Reveal></div></div>)}</div>;
}

function Level3Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return <div className="grid gap-2.5"><div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center font-bold text-emerald-800">✅ الحل</div>{LEVEL3_14.map((item, i) => <div key={item.wrong} className={`rounded-3xl border-2 p-4 ${open[i] ? "border-emerald-300 bg-emerald-50/50" : "border-rose-200 bg-rose-50/40"}`}><div className="flex flex-wrap items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{item.n}</span><En className="font-extrabold text-rose-800 line-through decoration-rose-300">{item.wrong}</En><Reveal shown={!!open[i]} onClick={() => setOpen((state) => ({ ...state, [i]: true }))}><span className="flex items-center gap-2"><span className="text-slate-400">→</span><En className="font-black text-emerald-800">{item.correct}</En></span></Reveal></div></div>)}</div>;
}

function Level4Ex() {
  const [show, setShow] = useState(false);
  return <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5"><SourceLine en={LEVEL4_14.sentence} /><div className="mt-4 text-center font-bold text-slate-700">{LEVEL4_14.lead}</div><div className="mt-3 grid gap-2">{LEVEL4_14.prompts.map((item) => <div key={item.n} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-white bg-white p-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">{item.n}</span><span className="font-bold text-slate-700">{item.ar}</span>{show && <span className="tada"><En className="font-black text-emerald-800">{item.answer}</En></span>}</div>)}</div><button onClick={() => setShow((value) => !value)} className="mt-4 rounded-xl bg-indigo-600 px-5 py-2 font-bold text-white">{show ? "إخفاء الحل الممكن" : LEVEL4_14.answerLead}</button></div>;
}

function DetectiveEx() {
  const [open, setOpen] = useState<number | null>(null);
  return <div className="space-y-4"><div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5"><div className="mb-2 text-sm font-bold text-teal-800">اقرأ:</div><En className="block text-base font-bold leading-9 text-slate-800 md:text-lg">{DETECTIVE_PASSAGE_14}</En></div><div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center font-bold text-teal-900">الآن استخرج المعلومات:</div><div className="grid gap-2">{DETECTIVE_Q_14.map((item, i) => <div key={item.q} className={`rounded-3xl border-2 p-4 ${open === i ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}><button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 text-right"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{item.n}</span><En className="font-extrabold text-slate-800">{item.q}</En><span className="mr-auto text-slate-400">{open === i ? "↺" : "؟"}</span></button>{open === i && <div className="tada mt-3 rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center"><En className="font-black text-emerald-800">{item.answer}</En></div>}</div>)}</div></div>;
}

function IQ200Ex() {
  const [show, setShow] = useState(false);
  return <div className="space-y-4"><div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5"><SourceLine en={IQ200_14.sentence} /><div className="mt-4 grid gap-2"><TextBlock text={IQ200_14.instruction} className="text-lg font-bold text-slate-800" /><div className="flex flex-wrap items-center gap-2"><TextBlock text="مثلاً:" className="font-bold" />{IQ200_14.examples.map((example) => <En key={example} className="rounded-xl bg-white px-3 py-1 font-black text-orange-800">{example}</En>)}</div><TextBlock text="ثم انتبه:" className="font-bold text-orange-800" /><TextBlock text={IQ200_14.warning} className="font-bold text-rose-700" /><TextBlock text={IQ200_14.requirement} className="font-bold text-rose-700" /><div className="rounded-2xl border-2 border-white bg-white p-3 text-center"><TextBlock text="وتذكر:" className="font-bold text-slate-600" /><En className="text-xl font-black text-emerald-800">{IQ200_14.reminder}</En></div></div></div><button onClick={() => setShow((value) => !value)} className="rounded-xl bg-orange-600 px-5 py-2 font-bold text-white">{show ? "إخفاء حلول ممكنة إضافية" : "اعرض حلولاً ممكنة إضافية"}</button>{show && <div className="tada grid gap-2 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4"><div className="text-sm font-bold text-emerald-800">حلول ممكنة إضافية — enhancement</div>{IQ200_14.modelQuestions.map((item) => <div key={item.en} className="rounded-2xl border-2 border-white bg-white p-3"><En className="block font-black text-slate-800">{item.en}</En><div className="mt-1 text-xs font-bold text-slate-500">{item.note}</div></div>)}</div>}</div>;
}

function HardChallengeEx() {
  const [show, setShow] = useState(false);
  return <div className="space-y-4"><div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5"><SourceLine en={HARD_CHALLENGE_14.sentence} /><div className="mt-4 text-center font-bold text-slate-700">حوّلها إلى:</div><div className="mt-3 grid gap-2 sm:grid-cols-2">{HARD_CHALLENGE_14.tasks.map((task) => <div key={task} className="rounded-2xl border-2 border-white bg-white p-3 text-center font-bold text-indigo-800">{task}</div>)}</div><div className="mt-3 text-center font-bold text-slate-700">ثم اكتب إجابة كاملة لكل سؤال.</div></div><button onClick={() => setShow((value) => !value)} className="rounded-xl bg-indigo-600 px-5 py-2 font-bold text-white">{show ? "إخفاء الإجابات الكاملة" : "اعرض الإجابات الكاملة"}</button>{show && <div className="tada grid gap-2">{HARD_CHALLENGE_14.answers.map((item, i) => <div key={item.q} className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4"><En className="block font-black text-slate-900">{item.q}</En><div className="mt-2 rounded-2xl border-2 border-white bg-white p-3"><En className="font-bold text-emerald-900">{item.answer}</En></div></div>)}</div>}</div>;
}

function ConversationEx() {
  const [highlight, setHighlight] = useState(false);
  return <div><div className="mb-3 flex flex-wrap items-center justify-center gap-2"><button onClick={() => setHighlight((value) => !value)} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${highlight ? "border-transparent bg-teal-600 text-white" : "border-teal-200 bg-white text-teal-800"}`}>{highlight ? "إخفاء علامات الماضي" : <Rich text="أبرز أسئلة Past Simple" />}</button></div><div className={highlight ? "rounded-3xl ring-4 ring-teal-200" : ""}><ConversationBlock /></div><div className="mt-4 rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center font-bold text-teal-900">لاحظ أن الحوار كله يعتمد على <En>Past Simple</En>.</div></div>;
}

function FinalChallengeEx() {
  const [text, setText] = useState("");
  return <div className="space-y-4"><div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5"><TextBlock text={FINAL_CHALLENGE_14.instruction} className="text-lg font-bold text-slate-800" /><div className="mt-4 grid gap-2">{FINAL_CHALLENGE_14.requirements.map((requirement) => <TextBlock key={requirement} text={requirement} className="rounded-2xl bg-white p-3 font-bold text-slate-800" />)}</div><TextBlock text={FINAL_CHALLENGE_14.lead} className="mt-4 font-bold text-slate-700" /><div dir="ltr" className="ltr-row mt-2 flex flex-wrap gap-2">{FINAL_CHALLENGE_14.verbs.map((verb) => <En key={verb} className="rounded-xl border-2 border-amber-200 bg-white px-3 py-1 font-black text-amber-800">{verb}</En>)}</div></div><div className="rounded-3xl border-2 border-slate-200 bg-white p-4"><label className="block text-sm font-bold text-slate-600" htmlFor="lesson14-story">اكتب قصتك هنا:</label><textarea id="lesson14-story" value={text} onChange={(event) => setText(event.target.value)} rows={10} dir="ltr" className="mt-2 w-full rounded-2xl border-2 border-slate-200 p-3 font-en text-base outline-none transition focus:border-violet-400" placeholder="Write 10 sentences..." /><div className="mt-2 text-left text-xs font-bold text-slate-400" dir="ltr">{text.trim() ? text.trim().split(/\s+/).length : 0} words</div></div></div>;
}

// ============================================================
// الشرائح الختامية والكتل
// ============================================================
function Objectives() {
  return <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية هذا الدرس، يجب أن يستطيع الطالب:"><div className="grid gap-3">{OBJECTIVES_14.map((item) => <div key={item.n} className="flex items-start gap-3 rounded-3xl border-2 border-violet-100 bg-violet-50/60 p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-violet-600 text-sm font-bold text-white">{item.n}</span><Rich text={item.text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" /></div>)}</div></Frame>;
}

function Cover() {
  return <div className="overflow-hidden rounded-[2rem] border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 shadow-xl"><div className="relative p-7 md:p-12"><div className="absolute -right-10 -top-10 text-9xl opacity-10">🧭</div><div className="relative"><div className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 bg-white px-4 py-2 text-sm font-bold text-violet-700"><Rich text="الدرس 14" /></div><h1 className="font-head mt-5 max-w-3xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl"><Rich text="الدرس 14: Past Simple — Wh Questions والتطبيق الشامل" /></h1><div className="mt-3" dir="ltr"><En className="text-xl font-extrabold text-violet-700 md:text-2xl">Past Simple — Wh Questions + Comprehensive Application</En></div><div className="mt-8 rounded-3xl border-2 border-white bg-white/90 p-5 shadow-sm"><div className="mb-3 text-center font-bold text-slate-600">البوصلة الأساسية في هذا الدرس</div><FormulaBoard14 /></div><div className="mt-6 rounded-3xl border-2 border-violet-100 bg-white/80 p-5"><div className="mb-3 text-lg font-bold text-violet-900">خطة سريعة للتعلم</div><div className="grid gap-2 sm:grid-cols-2">{COVER_PLAN_14.map((item) => <div key={item} className="rounded-2xl bg-violet-50 p-3 text-sm font-bold text-slate-700"><Rich text={item} /></div>)}</div></div></div></div></div>;
}

function Summary() {
  return <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[30]} title="خلاصة الدرس 14" lead={SUMMARY_14.title}><div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 text-center"><En className="text-2xl font-black text-violet-900 md:text-3xl">{SUMMARY_14.formula}</En></div><div className="grid gap-2 md:grid-cols-2">{SUMMARY_14.examples.map((example) => <SourceLine key={example} en={example} />)}</div><FormulaBoard14 /></Frame>;
}

function KeyRule() {
  return <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[31]} title="القاعدة الذهبية" lead={GOLDEN_RULE_14.lead}><div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 text-center"><En className="text-4xl font-black text-amber-700">{GOLDEN_RULE_14.word}</En><div className="mt-3 font-bold text-slate-700">{GOLDEN_RULE_14.question}</div><div className="mt-2 text-xl font-black text-slate-900">{GOLDEN_RULE_14.answer}</div><div className="mt-3 rounded-2xl border-2 border-white bg-white p-3"><Rich text={GOLDEN_RULE_14.result} className="text-lg font-bold text-emerald-800" /></div></div><div className="grid gap-2">{GOLDEN_RULE_14.pairs.map((pair) => <div key={pair.ok} className="grid gap-2 rounded-3xl border-2 border-slate-100 bg-white p-4 md:grid-cols-2"><SourceLine en={`${pair.ok} ✅`} tone="good" /><SourceLine en={`${pair.bad} ❌`} tone="bad" /></div>)}</div></Frame>;
}

function Roadmap() {
  return <Frame mascot="📚" sourceHeading={SOURCE_SECTIONS[32]} title="مكاننا في المنهج" lead="تسلسل القواعد حتى الآن:"><div className="grid gap-2 sm:grid-cols-2">{ROADMAP_14.map((item) => <div key={item.n} className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${item.here ? "border-violet-400 bg-violet-100 shadow" : "border-slate-100 bg-white"}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${item.here ? "bg-violet-600" : "bg-slate-500"}`}>{item.n}</span><Rich text={item.en} className={`font-bold ${item.here ? "text-violet-900" : "text-slate-700"}`} /></div>)}</div><div className="mt-5 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5"><Rich text={ROADMAP_14_NEXT} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" /></div></Frame>;
}

function Closing({ onExit }: { onExit: () => void }) {
  return <div className="rounded-[2rem] border-2 border-violet-200 bg-gradient-to-br from-violet-600 to-fuchsia-700 p-8 text-white shadow-xl md:p-12"><div className="text-6xl">🏆</div><h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 14.</h2><div className="mt-4 text-lg leading-relaxed text-violet-50"><Rich text={ROADMAP_14_NEXT} /></div><div className="mt-7 flex flex-wrap gap-3"><button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-violet-700 transition hover:bg-violet-50">← جميع الدروس</button><span className="rounded-xl border-2 border-white/40 px-5 py-3 font-bold text-white/80">الدرس 15 قريباً →</span></div></div>;
}

function BlockView({ block }: { block: Block14 }) {
  switch (block.type) {
    case "text":
      return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english":
      return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "list":
      return <div className="grid gap-2">{block.items.map((item, i) => <div key={`${item}-${i}`} className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-3"><Rich text={item} className="font-bold text-slate-700" /></div>)}</div>;
    case "formula":
      return <FormulaRowView formula={FORMULAS_14.find((item) => item.key === block.key)!} emphasis={block.key === "wh"} />;
    case "sentence":
      return <SentenceCard en={block.en} ar={block.ar} parts={block.parts} q={block.q} note={block.note} />;
    case "note":
      return <Note emoji={block.emoji} text={block.text} />;
    case "recap":
      return <RecapBlock />;
    case "whMeanings":
      return <WhMeanings />;
    case "whExamples":
      return <WhExamples word={block.word} />;
    case "whoCard":
      return <WhoCard />;
    case "danielBuilder":
      return <DanielBuilder />;
    case "emmaQuestions":
      return <EmmaQuestions />;
    case "whoContrast":
      return <WhoContrast />;
    case "answerComparison":
      return <AnswerComparison />;
    case "noRepeat":
      return <NoRepeat />;
    case "fourWays":
      return <FourWays />;
    case "controlTable":
      return <ControlTable />;
    case "irregularControl":
      return <IrregularControl />;
    case "whyImportant":
      return <WhyImportant />;
    case "conversionGame":
      return <ConversionGame />;
    case "conversation":
      return <ConversationBlock />;
  }
}

function ExerciseView({ exercise }: { exercise: Exercise14 }) {
  switch (exercise.type) {
    case "level1": return <Level1Ex />;
    case "level2": return <Level2Ex />;
    case "level3": return <Level3Ex />;
    case "level4": return <Level4Ex />;
    case "detective": return <DetectiveEx />;
    case "iq200": return <IQ200Ex />;
    case "hard": return <HardChallengeEx />;
    case "conversation": return <ConversationEx />;
    case "finalChallenge": return <FinalChallengeEx />;
  }
}

function sourceHeadingFor(slide: Slide14): string | undefined {
  if (slide.kind === "objectives") return SOURCE_SECTIONS[0];
  if (slide.kind === "lesson") return SOURCE_SECTIONS[Number(slide.step)];
  if (slide.kind === "ex") {
    const match = slide.badge.match(/(20|21|22|23|24|25|26|27|28)/);
    if (!match) return undefined;
    const number = Number(match[1]);
    return SOURCE_SECTIONS[number === 23 ? 24 : number];
  }
  if (slide.kind === "summary") return SOURCE_SECTIONS[30];
  if (slide.kind === "keyRule") return SOURCE_SECTIONS[31];
  if (slide.kind === "roadmap") return SOURCE_SECTIONS[32];
  return undefined;
}

/** مُصدَّرة حتى يفحص audit-render-direction كل شريحة في Lesson 14. */
export function SlideView14({ s, onExit }: { s: Slide14; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson": return <Frame mascot={s.mascot} step={s.step} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.lead} tip={s.tip}>{s.blocks.map((block, i) => <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}><BlockView block={block} /></div>)}</Frame>;
    case "ex": return <Frame mascot={s.mascot} badge={s.badge} sourceHeading={sourceHeadingFor(s)} title={<Rich text={s.title} />} lead={s.subtitle}><ExerciseView exercise={s.ex} /></Frame>;
    case "summary": return <Summary />;
    case "keyRule": return <KeyRule />;
    case "roadmap": return <Roadmap />;
    case "quiz": return <Frame mascot={s.mascot} badge="الاختبار النهائي" title={<Rich text={s.title} />} lead="أسئلة جديدة تقيس التحكم في What / Where / When / Why / Who / How و did + Base Verb."><FinalQuiz lesson={14} accent="bg-violet-600" /></Frame>;
    case "closing": return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide14): string {
  if (slide.kind === "cover") return "الغلاف";
  if (slide.kind === "objectives") return "أهداف الدرس";
  return slide.title;
}

const START = "البداية";
const FOUNDATION = "الأساس والصيغ";
const WH = "Wh Questions";
const APPLICATION = "التطبيق الشامل";
const CLOSING = "الخاتمة";

const SECTION_COLORS: Record<string, string> = {
  [START]: "text-slate-400",
  [FOUNDATION]: "text-violet-600",
  [WH]: "text-fuchsia-600",
  [APPLICATION]: "text-orange-600",
  [CLOSING]: "text-slate-600",
};

function Rail({ i, setI, onExit, onClose }: { i: number; setI: (n: number) => void; onExit: () => void; onClose?: () => void }) {
  const groups = useMemo(() => {
    const output: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, index) => {
      const last = output[output.length - 1];
      if (last && last.section === slide.section) last.indexes.push(index);
      else output.push({ section: slide.section, indexes: [index] });
    });
    return output;
  }, []);
  return <aside className="flex h-full flex-col"><div className="border-b border-slate-100 p-5"><button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">→ جميع الدروس</button><div className="font-head mt-2 text-lg font-bold text-slate-900"><Rich text="الدرس 14 · Wh Questions" /></div><En className="text-xs font-semibold text-slate-400">Past Simple — Wh Questions + Comprehensive Application</En></div><nav className="flex-1 overflow-y-auto p-3">{groups.map((group) => <div key={group.section} className="mb-3"><div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] || "text-slate-400"}`}><Rich text={group.section} /></div>{group.indexes.map((index) => { const active = index === i; return <button key={index} onClick={() => { setI(index); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>{index + 1}</span><span className="truncate font-semibold">{slideTitle(SLIDES[index])}</span><span className="mr-auto text-base">{SLIDES[index].mascot}</span></button>; })}</div>)}</nav><div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div></aside>;
}

export default function Lesson14({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(() => ({ next: () => setIndex((value) => Math.min(value + 1, total - 1)), prev: () => setIndex((value) => Math.max(value - 1, 0)) }), [total]);

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

  useEffect(() => { document.getElementById("l14-main")?.scrollTo({ top: 0 }); }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fbf9ff] text-slate-800"><Signature /><div className="relative flex min-h-0 flex-1"><SignatureGhost /><div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block"><Rail i={index} setI={setIndex} onExit={onExit} /></div><div className="relative z-10 flex min-w-0 flex-1 flex-col"><header className="flex items-center gap-3 px-4 pt-3 lg:px-10"><button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-slate-500"><Rich text={`${slide.section} · `} /><span className="text-slate-800"><Rich text={slideTitle(slide)} /></span></div><div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80"><div className="h-full rounded-full bg-gradient-to-l from-violet-600 via-fuchsia-500 to-orange-400 transition-all duration-500" style={{ width: `${progress}%` }} /></div></div><span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{index + 1} / {total}</span></header><main id="l14-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10"><div key={index} className="pop mx-auto max-w-4xl"><SlideView14 s={slide} onExit={onExit} /></div></main><div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3"><div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur"><button onClick={navigation.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button><span className="h-6 w-px bg-slate-200" /><button onClick={navigation.next} disabled={index === total - 1} className="rounded-full bg-violet-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-violet-700 disabled:opacity-30">التالي ←</button></div></div></div></div>{menu && <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}><div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" /><div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><Rail i={index} setI={setIndex} onExit={onExit} onClose={() => setMenu(false)} /></div></div>}</div>;
}
