import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SUBJ10,
  VERBS10,
  ADV_SIGNALS,
  STATIVE_VERBS,
  GRAMMAR_DETECTIVE_PASSAGE,
  GRAMMAR_DETECTIVE_Q,
  FINAL_CHALLENGE,
  FINAL_IQ_RULE,
  IQ_SUMMARY,
  ROLE10_AR,
  ingOf,
  type Slide10,
  type Block10,
  type Part10,
  type Role10,
  type Exercise10,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// Present Continuous متقدم — تدرج سماوي/بنفسجي مطور
// ============================================================
const RS: Record<Role10, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  be: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-600", text: "text-violet-700" },
  v: { chip: "bg-cyan-100 border-cyan-300 text-cyan-900", solid: "bg-cyan-600", text: "text-cyan-700" },
  o: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700" },
  adv: { chip: "bg-teal-100 border-teal-300 text-teal-900", solid: "bg-teal-600", text: "text-teal-700" },
  nt: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-500", text: "text-rose-700" },
  aux: { chip: "bg-indigo-100 border-indigo-300 text-indigo-900", solid: "bg-indigo-600", text: "text-indigo-700" },
};

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`ltr font-en ${className}`}>{children}</span>;
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((x, i) => {
        const m = x.match(/^\[\[(.+)\]\]$/);
        if (m) {
          return (
            <span key={i} className="ltr font-en mx-1 rounded-lg bg-slate-900/5 px-1.5 py-0.5 font-bold text-slate-800">
              {m[1]}
            </span>
          );
        }
        return <LatinRuns key={i} text={x} />;
      })}
    </span>
  );
}

function PartsLine({ parts, q, size = "md", label = true }: { parts: Part10[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[p.role].chip} ${sz} font-en font-extrabold leading-tight`}>
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE10_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function Mixed({ text }: { text: string }) {
  return <LatinRuns text={text} />;
}

function SentenceCard({ parts, ar, note, q }: { parts: Part10[]; ar: string; note?: string; q?: boolean }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} q={q} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg text-slate-500">{ar}</span>
        {note && (
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-700">
            📌 <Mixed text={note} />
          </span>
        )}
      </div>
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; tip?: string }) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(8,145,178,0.3)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-cyan-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-cyan-100 px-3.5 py-1.5 text-sm font-bold text-cyan-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-cyan-700 to-violet-700 p-4 text-white">
          <span className="text-2xl">🦉</span>
          <span className="text-base font-semibold md:text-lg">{tip}</span>
        </div>
      )}
    </section>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
    </div>
  );
}

function Verdict({ ok, en, ar, why }: { ok: boolean; en: string; ar?: string; why?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-3xl border-2 p-4 ${ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold text-white ${ok ? "bg-emerald-500" : "bg-rose-500"}`}>{ok ? "✓" : "✕"}</span>
      <En className={`text-xl font-bold ${ok ? "text-emerald-900" : "text-rose-800 line-through decoration-rose-300"}`}>{en}</En>
      {ar && <span className="text-base text-slate-500">{ar}</span>}
      {why && <span className={`rounded-full px-3 py-1 text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{why}</span>}
    </div>
  );
}

// ============================================================
// تفاعليات متقدمة
// ============================================================

function BeTabs() {
  const [pi, setPi] = useState(0);
  const s = SUBJ10[pi];
  const verbs = VERBS10.slice(0, 5);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-wrap gap-1.5">
        {SUBJ10.map((x, i) => (
          <button key={x.en} onClick={() => setPi(i)} className={`rounded-xl border-2 px-3 py-1.5 font-en font-bold transition active:scale-95 ${i === pi ? "border-transparent bg-cyan-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300"}`}>
            {x.en}
          </button>
        ))}
      </div>
      <div key={pi} className="pop mt-4 grid gap-2">
        {verbs.map((v) => (
          <div key={v.base} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
            <PartsLine parts={[{ text: s.en, role: "s" }, { text: s.be, role: "be" }, { text: v.ing, role: "v" }]} size="sm" label={false} />
            <span className="mr-auto text-sm text-slate-500">{s.ar} {v.ar} الآن</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-violet-700">
        {s.en} ← نستخدم <En className="font-extrabold">{s.be}</En>
      </div>
    </div>
  );
}

function BeMnemonic() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
        <div className="font-head text-xl font-bold text-sky-800">am</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          <span className="font-en rounded-xl bg-sky-500 px-3 py-1 text-lg font-extrabold text-white">I</span>
        </div>
        <En className="mt-3 block text-lg font-bold text-slate-700">I am playing.</En>
        <div className="mt-2 text-sm font-bold text-sky-700">I تأخذ am فقط</div>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="font-head text-xl font-bold text-violet-800">is</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          {["He", "She", "It"].map((x) => (
            <span key={x} className="font-en rounded-xl bg-violet-600 px-3 py-1 text-lg font-extrabold text-white">
              {x}
            </span>
          ))}
        </div>
        <En className="mt-3 block text-lg font-bold text-slate-700">She is dancing.</En>
        <div className="mt-2 text-sm font-bold text-violet-700">مفرد غائب ← is</div>
      </div>
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
        <div className="font-head text-xl font-bold text-cyan-800">are</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          {["You", "We", "They"].map((x) => (
            <span key={x} className="font-en rounded-xl bg-cyan-600 px-3 py-1 text-lg font-extrabold text-white">
              {x}
            </span>
          ))}
        </div>
        <En className="mt-3 block text-lg font-bold text-slate-700">They are running.</En>
        <div className="mt-2 text-sm font-bold text-cyan-700">جمع ← are</div>
      </div>
    </div>
  );
}

function IngTabs() {
  const [t, setT] = useState<IngRule>("add");
  const rows = VERBS10.filter((v) => v.rule === t).slice(0, 6);
  const info = {
    add: { title: "معظم الأفعال ← أضف ing", note: "play → playing · watch → watching · talk → talking" },
    "drop-e": { title: "ينتهي بـ e ← احذف e ثم أضف ing", note: "write → writing · make → making · dance → dancing" },
    double: { title: "مقطع قصير + ساكن بعد علة ← ضاعف الحرف الأخير", note: "run → running · sit → sitting · stop → stopping" },
  }[t];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {(["add", "drop-e", "double"] as const).map((x) => (
          <button key={x} onClick={() => setT(x)} className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-extrabold transition active:scale-95 ${t === x ? "border-transparent bg-cyan-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
            {x === "add" ? "+ ing" : x === "drop-e" ? "− e + ing" : "×2 + ing"}
          </button>
        ))}
      </div>
      <div key={t} className="pop">
        <div className="mb-3 text-center font-bold text-slate-700">{info.title}</div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((v) => (
            <div key={v.base} dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
              <En className="text-lg font-bold text-slate-600">{v.base}</En>
              <span className="text-cyan-500">→</span>
              <En className="text-lg font-extrabold text-cyan-700">{v.ing}</En>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-cyan-50 p-2.5 text-center text-sm font-bold text-cyan-800">{info.note}</div>
      </div>
    </div>
  );
}

function IngTrap() {
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
      <div className="text-center font-bold text-amber-800">⚠️ فخ: ليس كل e تُحذف بنفس الطريقة</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
          <En className="font-bold text-slate-600">see</En>
          <span className="text-amber-500">→</span>
          <En className="font-extrabold text-amber-700">seeing</En>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">✓</span>
        </div>
        <div dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
          <En className="font-bold text-slate-600 line-through decoration-rose-300">seing</En>
          <span className="text-rose-500">✕</span>
          <span className="text-xs font-bold text-rose-600">لا تحذف e هنا</span>
        </div>
        <div dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
          <En className="font-bold text-slate-600">agree</En>
          <span className="text-amber-500">→</span>
          <En className="font-extrabold text-amber-700">agreeing</En>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">✓</span>
        </div>
        <div dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-3 py-2">
          <span className="text-sm font-bold text-slate-500">سنعود لـ spelling لاحقًا</span>
        </div>
      </div>
    </div>
  );
}

function SignalWords() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {ADV_SIGNALS.map((w, i) => (
        <span key={w.en} className="rounded-2xl border-2 border-cyan-200 bg-white px-3.5 py-2 shadow-sm anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
          <En className="text-lg font-extrabold text-cyan-700">{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

function PlaceWords() {
  const chips = [
    { en: "now", ex: "I am doing my homework now.", exAr: "في النهاية (شائع)" },
    { en: "currently", ex: "She is currently working on a project.", exAr: "قبل الفعل" },
    { en: "this week", ex: "They are practicing for the show this week.", exAr: "في النهاية" },
    { en: "these days", ex: "He is spending more time with his family these days.", exAr: "في النهاية" },
  ];
  return (
    <div className="grid gap-2.5">
      {chips.map((c) => (
        <div key={c.en} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3 border-2 border-slate-100">
          <En className="rounded-xl bg-cyan-600 px-3 py-1 text-sm font-extrabold text-white">{c.en}</En>
          <En className="font-bold text-slate-700">{c.ex}</En>
          <span className="mr-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{c.exAr}</span>
        </div>
      ))}
      <div className="rounded-2xl bg-violet-50 p-3 text-center text-sm font-bold text-violet-700">Now يمكن أن تأتي أولاً: Now I am doing my homework. — وكلاهما صحيح ✅</div>
    </div>
  );
}

function TemporaryCompare() {
  const [mode, setMode] = useState<"stable" | "temp">("stable");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("stable")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${mode === "stable" ? "border-transparent bg-slate-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>وضع مستقر</button>
        <button onClick={() => setMode("temp")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${mode === "temp" ? "border-transparent bg-cyan-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>مؤقت هذه الفترة</button>
      </div>
      <div key={mode} className="pop grid gap-3 md:grid-cols-2">
        <div className={`rounded-2xl border-2 p-4 ${mode === "stable" ? "border-slate-300 bg-white shadow" : "border-slate-200 bg-white/60"}`}>
          <div className="text-xs font-bold text-slate-400">Present Simple — عادة</div>
          <En className="mt-1 block text-lg font-extrabold text-slate-800">Nabil usually lives in Cairo.</En>
          <div className="text-sm text-slate-500">نبيل يعيش عادةً في القاهرة.</div>
          <div className="mt-2 text-xs font-bold text-slate-500">My aunt works in a hospital.</div>
        </div>
        <div className={`rounded-2xl border-2 p-4 ${mode === "temp" ? "border-cyan-300 bg-cyan-50 shadow" : "border-slate-200 bg-white/60"}`}>
          <div className="text-xs font-bold text-cyan-700">Present Continuous — مؤقت</div>
          <En className="mt-1 block text-lg font-extrabold text-cyan-800">He is staying in Alexandria this week.</En>
          <div className="text-sm text-slate-600">لكنه يقيم في الإسكندرية هذا الأسبوع.</div>
          <div className="mt-2 text-xs font-bold text-cyan-600">She is working from home this week.</div>
        </div>
      </div>
    </div>
  );
}

function VsSimpleAdvanced() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-600">
          <span className="h-2 w-2 rounded-full bg-slate-400" /> Present Simple — عادة / روتين / حقيقة / مستقر
        </div>
        <En className="text-xl font-extrabold text-slate-700">Omar rides his bicycle to school every day.</En>
        <div className="mt-1 text-sm text-slate-500">عمر يركب دراجته إلى المدرسة كل يوم — روتين.</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["عادة", "روتين", "حقيقة", "متكرر", "مستقر"].map((x) => (
            <span key={x} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 border border-slate-200">{x}</span>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-bold text-cyan-700">
          <span className="h-2 w-2 rounded-full bg-cyan-500" /> Present Continuous — الآن / هذه الفترة / مؤقت
        </div>
        <En className="text-xl font-extrabold text-slate-800">Omar is riding the bus this week.</En>
        <div className="mt-1 text-sm text-slate-600">عمر يركب الحافلة هذا الأسبوع — وضع مؤقت.</div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["الآن", "هذه الفترة", "مؤقت"].map((x) => (
            <span key={x} className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-cyan-700 border border-cyan-200">{x}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StativeGrid() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {STATIVE_VERBS.map((v, i) => (
          <button key={v.en} onClick={() => setPicked(i)} className={`rounded-2xl border-2 p-3 text-center transition active:scale-95 ${picked === i ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white hover:border-amber-200"}`}>
            <En className="text-lg font-extrabold text-slate-800">{v.en}</En>
            <div className="text-xs font-bold text-slate-500">{v.ar}</div>
            <div className="mt-1 text-[11px] font-bold text-amber-700">لا يُستخدم مع Continuous</div>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        <div className="rounded-2xl bg-white p-3 border-2 border-emerald-200 flex flex-wrap items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white text-sm">✓</span>
          <En className="font-bold text-emerald-800">I know the answer.</En>
          <span className="text-sm text-slate-500">أنا أعرف الإجابة.</span>
        </div>
        <div className="rounded-2xl bg-white p-3 border-2 border-rose-200 flex flex-wrap items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white text-sm">✕</span>
          <En className="font-bold text-rose-700 line-through decoration-rose-300">I am knowing the answer.</En>
          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">نادر + غير أساسي</span>
        </div>
      </div>
    </div>
  );
}

function ThinkCompare() {
  const [mode, setMode] = useState<"opinion" | "process">("opinion");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("opinion")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${mode === "opinion" ? "border-transparent bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>رأي — think</button>
        <button onClick={() => setMode("process")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${mode === "process" ? "border-transparent bg-cyan-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>عملية — thinking</button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center">
        {mode === "opinion" ? (
          <>
            <En className="text-2xl font-extrabold text-slate-800">I think you are right.</En>
            <div className="mt-1 text-slate-500">أنا أعتقد أنك على حق — رأي (Simple).</div>
            <div className="mt-3 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700">think هنا = رأي → Simple</div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-cyan-800">I am thinking about the problem.</En>
            <div className="mt-1 text-slate-500">أنا أفكر في المشكلة — عملية تحدث الآن (Continuous).</div>
            <div className="mt-3 rounded-xl bg-cyan-50 px-3 py-2 text-sm font-bold text-cyan-700">thinking هنا = عملية ذهنية الآن → Continuous</div>
          </>
        )}
      </div>
      <div className="mt-3 text-center text-xs font-bold text-slate-500">نفس الفعل يتغير حسب المعنى — نقطة متقدمة جدًا 🧠🔥</div>
    </div>
  );
}

function WhQuestions() {
  const rows = [
    { q: "What is she studying?", a: "ماذا تدرس؟" },
    { q: "Where is he going?", a: "إلى أين يذهب؟" },
    { q: "Why are they laughing?", a: "لماذا يضحكون؟" },
    { q: "Who is calling you?", a: "من يتصل بك؟" },
  ];
  return (
    <div className="grid gap-2">
      {rows.map((r) => (
        <div key={r.q} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3 border-2 border-slate-100">
          <En className="font-bold text-slate-800">{r.q}</En>
          <span className="mr-auto text-sm text-slate-500">{r.a}</span>
          <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700">Wh + am/is/are + subject + ing?</span>
        </div>
      ))}
      <div className="rounded-2xl bg-violet-50 p-3 text-center">
        <En className="font-bold text-violet-800">What are you doing? · Where is Ali going? · Why is the baby crying?</En>
      </div>
    </div>
  );
}

function ShortAnswers() {
  const rows = [
    { q: "Is she studying?", yes: "Yes, she is.", no: "No, she isn't." },
    { q: "Are they laughing?", yes: "Yes, they are.", no: "No, they aren't." },
  ];
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.q} className="rounded-2xl bg-white p-3 border-2 border-slate-100">
          <En className="block font-bold text-slate-800">{r.q}</En>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
              <En>{r.yes}</En>
            </span>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-700">
              <En>{r.no}</En>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PeriodNowCompare() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
        <div className="text-sm font-bold text-cyan-700">يحدث الآن (Now)</div>
        <En className="mt-1 block text-xl font-extrabold text-slate-800">I am eating lunch now.</En>
        <div className="text-sm text-slate-600">أتناول الغداء في هذه اللحظة.</div>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="text-sm font-bold text-violet-700">يحدث هذه الفترة (This month)</div>
        <En className="mt-1 block text-xl font-extrabold text-slate-800">I am taking a photography course this month.</En>
        <div className="text-sm text-slate-600">آخذ دورة تصوير هذا الشهر — ليس بالضرورة الآن.</div>
      </div>
    </div>
  );
}

// ============================================================
// تمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-600 text-sm font-bold text-white">{n}</span>;
}

function ChooseTenseEx({ ex }: { ex: Extract<Exercise10, { type: "chooseTense" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-800">{it.stem}</En>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">💭 {it.ar}</span>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AmIsAreFillEx({ ex }: { ex: Extract<Exercise10, { type: "amIsAreFill" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-800">{it.stem}</En>
              <span className="text-sm text-slate-400">({it.verb})</span>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{it.ar}</span>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NegTransformEx({ ex }: { ex: Extract<Exercise10, { type: "negTransform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <Nub n={i + 1} />
          <En className="text-lg font-bold text-slate-800">{it.aff}</En>
          <span className="text-slate-300">→</span>
          {show[i] ? (
            <En className="tada text-lg font-extrabold text-emerald-700">{it.neg}</En>
          ) : (
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-rose-500 px-4 py-1.5 text-sm font-bold text-white hover:bg-rose-600">أظهر النفي</button>
          )}
        </div>
      ))}
    </div>
  );
}

function QTransformEx({ ex }: { ex: Extract<Exercise10, { type: "qTransform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <Nub n={i + 1} />
          <En className="text-lg font-bold text-slate-800">{it.aff}</En>
          <span className="text-slate-300">→</span>
          {show[i] ? (
            <En className="tada text-lg font-extrabold text-violet-700">{it.q}</En>
          ) : (
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-violet-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-violet-700">أظهر السؤال</button>
          )}
        </div>
      ))}
    </div>
  );
}

function WhChooseEx({ ex }: { ex: Extract<Exercise10, { type: "whChoose" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-800">{it.q}</En>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {o}
                </button>
              ))}
            </div>
            {c !== undefined && !right && <div className="mt-1.5 pr-11 text-xs font-bold text-rose-600">✕ الصحيح: {it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

function FixEx({ ex }: { ex: Extract<Exercise10, { type: "fix" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
          <En className="text-xl font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
          {show[i] ? (
            <div className="tada flex flex-wrap items-center gap-2">
              <En className="text-xl font-extrabold text-emerald-700">→ {it.correct}</En>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{it.why}</span>
            </div>
          ) : (
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-emerald-700">
              الحل 💡
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function TenseChooseExplainEx({ ex }: { ex: Extract<Exercise10, { type: "tenseChooseExplain" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-800">{it.en}</En>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{it.ar}</span>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IQEx({ ex }: { ex: Extract<Exercise10, { type: "iq" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [showText, setShowText] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => {
        if (it.kind === "mcq") {
          const c = pick[i];
          const right = c === it.answer;
          return (
            <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
              <div className="flex items-start gap-3">
                <Nub n={i + 1} />
                <div className="flex-1">
                  <Rich text={it.q} className="font-bold text-slate-800" />
                  <div className="mt-2.5 grid gap-2">
                    {it.opts.map((o, oi) => (
                      <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-3 py-2 text-right font-bold transition text-sm ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                        <LatinRuns text={o} />
                      </button>
                    ))}
                  </div>
                  {c !== undefined && <div className={`mt-2 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>💡 {it.why}</div>}
                </div>
              </div>
            </div>
          );
        }
        if (it.kind === "text") {
          return (
            <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">{i + 1}</span>
                <div className="flex-1">
                  <Rich text={it.q} className="font-bold text-slate-800" />
                  {showText[i] ? (
                    <div className="tada mt-3 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800 border-2 border-emerald-200">
                      <LatinRuns text={it.a} />
                    </div>
                  ) : (
                    <button onClick={() => setShowText((s) => ({ ...s, [i]: true }))} className="mt-3 rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">أظهر الإجابة 💡</button>
                  )}
                </div>
              </div>
            </div>
          );
        }
        // order
        return <OrderRow key={i} n={i + 1} item={it} />;
      })}
    </div>
  );
}

function OrderEx({ ex }: { ex: Extract<Exercise10, { type: "order" }> }) {
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => (
        <OrderRow key={i} n={i + 1} item={it} />
      ))}
    </div>
  );
}

function OrderRow({ n, item }: { n: number; item: { words: string[]; correct: string[]; ar: string; q?: boolean } }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [reveal, setReveal] = useState(false);
  const done = placed.length === item.words.length;
  const built = placed.map((i) => item.words[i]);
  const ok = done && built.join(" ") === item.correct.join(" ");
  const bad = done && !ok;
  const shown = reveal ? item.correct : built;
  const finished = ok || reveal;
  return (
    <div className={`rounded-3xl border-2 p-4 transition ${finished ? "border-emerald-300 bg-emerald-50/50" : bad ? "border-rose-300 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <Nub n={n} />
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap gap-2">
          {item.words.map((w, i) => (
            <button key={i} disabled={placed.includes(i) || reveal} onClick={() => setPlaced((p) => [...p, i])} className="rounded-xl border-2 border-slate-300 bg-white px-3.5 py-1.5 font-en text-lg font-bold text-slate-800 transition hover:border-cyan-400 active:scale-95 disabled:opacity-25">
              {w}
            </button>
          ))}
        </div>
        <div className="mr-auto flex gap-2">
          {!finished && (
            <button onClick={() => setReveal(true)} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">
              الحل 💡
            </button>
          )}
          <button onClick={() => { setPlaced([]); setReveal(false); }} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">
            ↺
          </button>
        </div>
      </div>
      <div key={bad ? "b" + placed.join() : "s"} dir="ltr" style={{ direction: "ltr" }} className={`ltr-row mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-2.5 ${finished ? "border-emerald-300 bg-white" : bad ? "shake border-rose-300 bg-white" : "border-slate-300 bg-slate-50"}`}>
        {shown.length === 0 && <span className="w-full text-center text-sm text-slate-400">اضغط الكلمات بالترتيب الصحيح</span>}
        {shown.map((w, i) => (
          <button key={i} onClick={() => !reveal && setPlaced((p) => p.filter((_, j) => j !== i))} className={`rounded-xl border-2 px-3.5 py-1.5 font-en text-lg font-bold ${finished ? "border-emerald-300 bg-emerald-50 text-emerald-800" : bad ? "border-rose-300 bg-rose-50 text-rose-700" : "border-slate-300 bg-white text-slate-800"}`}>
            {w}
          </button>
        ))}
        {shown.length > 0 && <span className="font-en text-xl font-bold text-slate-300">{item.q ? "?" : "."}</span>}
      </div>
      {finished && <div className="tada mt-2 font-bold text-emerald-700">🎉 {item.ar}</div>}
      {bad && <div className="mt-2 text-sm font-bold text-rose-600">✕ ليس بعد</div>}
    </div>
  );
}

function Detective() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <Frame mascot="🕵️" badge="المستوى 9" title="Grammar Detective" lead="اقرأ الفقرة ثم أجب — دقق في الزمن والمعنى:">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <En className="block text-lg font-bold leading-relaxed text-slate-800">{GRAMMAR_DETECTIVE_PASSAGE}</En>
        <div className="mt-3 text-sm font-bold text-slate-500">David normally works in an office, but this month he is working from home... — فقرة تجمع Simple و Continuous</div>
      </div>
      <div className="grid gap-2.5">
        {GRAMMAR_DETECTIVE_Q.map((it, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">{i + 1}</span>
            <span className="font-bold text-slate-700">{it.q}</span>
            {revealed[i] ? (
              <span className="tada rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                <LatinRuns text={it.a} />
              </span>
            ) : (
              <button onClick={() => setRevealed((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">أظهر الإجابة</button>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function FinalChallengeView() {
  const [done, setDone] = useState(false);
  return (
    <Frame mascot="🏆" badge="التحدي النهائي · IQ200+" title="اكتب قصة Alex — يوم غير عادي" lead={FINAL_CHALLENGE.intro}>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="grid gap-2">
          {FINAL_CHALLENGE.conditions.map((c, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-600 text-sm font-bold text-white">{i + 1}</span>
              <span className="text-sm font-bold text-slate-700">{c}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-indigo-50 p-4">
          <div className="font-bold text-indigo-800">🔥 Bonus IQ200:</div>
          <div className="mt-1 text-sm font-semibold text-slate-700">{FINAL_CHALLENGE.bonus}</div>
          <div className="mt-2 grid gap-2 md:grid-cols-2">
            <div className="rounded-xl bg-white p-3 border-2 border-slate-200">
              <En className="block text-sm font-bold text-slate-600">I usually live with my parents. (عادة)</En>
              <span className="text-xs text-slate-400">مثال بنية Bonus</span>
            </div>
            <div className="rounded-xl bg-white p-3 border-2 border-cyan-200">
              <En className="block text-sm font-bold text-cyan-700">I am living with my cousin this month. (مؤقت)</En>
              <span className="text-xs text-cyan-600">فرق واضح Simple vs Continuous</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
        <div className="text-sm font-bold text-slate-600">ورقة كتابة — جرب بنفسك ثم قارن مع نموذج مقترح:</div>
        <textarea placeholder="Alex usually gets up at 7, but today he is..." rows={6} className="mt-3 w-full rounded-2xl border-2 border-slate-200 p-3 font-en text-sm focus:border-cyan-400 focus:outline-none" dir="ltr" />
        <button onClick={() => setDone(!done)} className="mt-3 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-bold text-white">{done ? "إخفاء النموذج" : "أظهر نموذجًا مقترحًا 💡"}</button>
        {done && (
          <div className="tada mt-3 rounded-2xl bg-white p-4 border-2 border-cyan-200 space-y-1.5 font-en text-sm font-bold text-slate-800" dir="ltr">
            <div>Alex usually lives in a small flat. (Simple 1)</div>
            <div>He usually takes the bus to work. (Simple 2)</div>
            <div>He loves quiet mornings. (Simple 3 — stative)</div>
            <div>But this week he is staying with his brother. (Continuous 1 — temporary)</div>
            <div>He is working from home these days. (Continuous 2)</div>
            <div>Look! He is making coffee now. (Continuous 3 — now)</div>
            <div>He is reading a new book this week. (Continuous 4 — this week)</div>
            <div>He isn't watching TV these days. (Negative)</div>
            <div>What is he doing now? (Question)</div>
          </div>
        )}
      </div>
      <Note emoji="✨" text="تذكر: [[usually / now / this week]] + [[فعل ينتهي بـ e → making]] + [[مضاعف → getting / running]] — راعِ التنوع المطلوب." />
    </Frame>
  );
}

// ============================================================
// شرائح ثابتة
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(8,145,178,0.32)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-cyan-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-violet-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">📘</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-gradient-to-l from-cyan-600 to-violet-600 px-5 py-2 text-base font-bold text-white">الدرس العاشر</div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">Present Continuous — الاستخدامات المتقدمة والتحكم الكامل</h1>
        <p className="pop pop-3 mt-2 text-lg font-bold text-violet-600">
          <En className="font-en">Advanced Present Continuous</En>
        </p>
        <div className="pop pop-4 mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 border-2 border-amber-200">
          <span>🔥</span>
          <span className="text-sm font-bold text-amber-800">IQ200 — لا تحفظ القاعدة... افهم لماذا نستخدمها</span>
        </div>
        <div className="pop pop-5 mt-6 rounded-3xl border-2 border-slate-100 bg-slate-50 p-5 max-w-xl mx-auto text-right">
          <div className="text-sm font-bold text-slate-500">ممتاز. بما أننا في الدرس 9 تعلمنا أساس Present Continuous، فالدرس 10 لن يعيد نفس الشرح من البداية.</div>
          <div className="mt-2 text-sm font-bold text-slate-700">اليوم سنبني فوقه ونجعل فهمنا أعمق بكثير.</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
            {["متى نستخدمه بالضبط؟", "الآن vs هذه الفترة", "Simple vs Continuous", "الكلمات ومكانها", "النفي والسؤال المتقدم", "قواعد -ing بالتفصيل", "أفعال لا تُستخدم مع Continuous", "أخطاء شائعة", "اكتشاف الزمن من المعنى", "تحديات IQ200"].map((x, i) => (
              <span key={i} className="rounded-xl bg-white px-2 py-1.5 border border-slate-200 text-slate-700 flex items-center gap-1"><span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-600 text-white text-[11px]">{i + 1}</span>{x}</span>
            ))}
          </div>
        </div>
        <div className="pop pop-6 mt-6 flex justify-center">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-4">
            <PartsLine parts={[{ text: "She", role: "s" }, { text: "is", role: "be" }, { text: "reading", role: "v" }, { text: "this week", role: "adv" }]} size="lg" />
            <div className="mt-2 text-center text-slate-500">هي تقرأ هذا الأسبوع — ليست بالضرورة الآن، بل خلال هذه الفترة.</div>
          </div>
        </div>
        <p className="pop mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "أن ترى جملة جديدة تمامًا وتقرر بنفسك: [[هل أستخدم Present Simple أم Present Continuous؟]]",
    "ليس فقط لأنك رأيت كلمة [[now]] بل لأنك فهمت معنى الجملة.",
    "إتقان الفروق: [[الآن]] vs [[هذه الفترة]] vs [[شيء مؤقت]].",
    "التحكم في [[النفي]] و[[الأسئلة]] و[[أسئلة Wh]] بشكل متقدم.",
    "إتقان [[قواعد -ing]] وتجنب أفخاخ [[see → seeing]] و[[الأفعال الحالة]].",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="أهداف الدرس">
      <div className="rounded-3xl border-2 border-cyan-100 bg-cyan-50/60 p-4 text-center">
        <div className="font-head text-xl font-bold text-cyan-800">بعد هذا الدرس يجب أن تستطيع</div>
        <div className="mt-2 text-lg font-bold text-slate-700">أن ترى جملة جديدة تمامًا وتقرر بنفسك:</div>
        <div className="mt-2 inline-block rounded-2xl bg-white px-4 py-2 border-2 border-cyan-200">
          <En className="text-xl font-extrabold text-slate-800">"هل أستخدم Present Simple أم Present Continuous؟"</En>
        </div>
        <div className="mt-3 text-sm font-bold text-slate-500">وليس فقط لأنك رأيت كلمة <En className="font-bold text-cyan-700">now</En> بل لأنك فهمت معنى الجملة.</div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.slice(2).map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-600 font-bold text-white">{i + 3}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس" lead="Present Continuous لا يعني فقط “الآن” — له استخدامات مهمة:">
      <div className="grid gap-2.5 sm:grid-cols-3">
        {[
          { t: "شيء يحدث الآن", e: "Mila is opening the window." },
          { t: "يحدث هذه الفترة", e: "I am reading a book this week." },
          { t: "شيء مؤقت", e: "He is staying in Alexandria this week." },
        ].map((x, i) => (
          <div key={i} className={`pop pop-${i + 1} rounded-3xl border-2 border-cyan-200 bg-cyan-50/60 p-4`}>
            <div className="font-head text-base font-bold text-cyan-800">{x.t}</div>
            <En className="mt-1 block text-sm font-bold text-slate-700">{x.e}</En>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4 grid gap-2">
        {IQ_SUMMARY.map((s, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-100 text-sm font-bold text-cyan-700">{i + 1}</span>
            <Rich text={s} className="text-sm font-bold text-slate-700" />
          </div>
        ))}
      </div>
      <Note emoji="⭐" text="[[Present Simple]]: عادة / روتين / حقيقة / شيء مستقر. · [[Present Continuous]]: الآن / هذه الفترة / شيء مؤقت." />
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="font-head text-lg font-bold text-violet-800">🏅 قاعدة IQ200 النهائية</div>
        <div className="mt-2 text-base font-bold leading-relaxed text-slate-800">
          <LatinRuns text={FINAL_IQ_RULE} />
        </div>
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">🎓</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">أحسنت — بدأت تفهم طريقة عمل الإنجليزية</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">
          <LatinRuns text={FINAL_IQ_RULE} />
        </p>
        <div className="pop pop-3 mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

function BlockView({ b }: { b: Block10 }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "list":
      return (
        <div className="grid gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4">
          {b.items.map((x, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-100 text-sm font-bold text-cyan-700">{i + 1}</span>
              <span className="text-lg text-slate-700">{x}</span>
            </div>
          ))}
        </div>
      );
    case "sentence":
      return <SentenceCard parts={b.parts} ar={b.ar} note={b.note} q={b.q} />;
    case "ok":
      return <Verdict ok en={b.en} ar={b.ar} />;
    case "bad":
      return <Verdict ok={false} en={b.en} why={b.why} />;
    case "note":
      return <Note emoji={b.emoji} text={b.text} />;
    case "beTabs":
      return <BeTabs />;
    case "beMnemonic":
      return <BeMnemonic />;
    case "ingTabs":
      return <IngTabs />;
    case "ingTrap":
      return <IngTrap />;
    case "signalWords":
      return <SignalWords />;
    case "placeWords":
      return <PlaceWords />;
    case "temporaryCompare":
      return <TemporaryCompare />;
    case "vsSimpleAdvanced":
      return <VsSimpleAdvanced />;
    case "stativeGrid":
      return <StativeGrid />;
    case "thinkCompare":
      return <ThinkCompare />;
    case "whQuestions":
      return <WhQuestions />;
    case "shortAnswers":
      return <ShortAnswers />;
    case "periodNowCompare":
      return <PeriodNowCompare />;
  }
}

function SlideView({ s, onExit }: { s: Slide10; onExit: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "lesson":
      return (
        <Frame mascot={s.mascot} step={s.step} title={s.title} lead={s.lead} tip={s.tip}>
          {s.blocks.map((b, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView b={b} />
            </div>
          ))}
        </Frame>
      );
    case "ex": {
      const ex = s.ex;
      return (
        <Frame mascot={s.mascot} badge={s.badge} title={s.title} lead={s.subtitle}>
          {ex.type === "chooseTense" && <ChooseTenseEx ex={ex} />}
          {ex.type === "amIsAreFill" && <AmIsAreFillEx ex={ex} />}
          {ex.type === "negTransform" && <NegTransformEx ex={ex} />}
          {ex.type === "qTransform" && <QTransformEx ex={ex} />}
          {ex.type === "whChoose" && <WhChooseEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "tenseChooseExplain" && <TenseChooseExplainEx ex={ex} />}
          {ex.type === "iq" && <IQEx ex={ex} />}
          {ex.type === "order" && <OrderEx ex={ex} />}
        </Frame>
      );
    }
    case "challenge":
      return <FinalChallengeView />;
    case "detective":
      return <Detective />;
    case "summary":
      return <Summary />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت تحكمك في Present Continuous المتقدم.">
          <FinalQuiz lesson={10} accent="bg-cyan-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(s: Slide10): string {
  switch (s.kind) {
    case "cover":
      return "الغلاف";
    case "objectives":
      return "أهداف الدرس";
    default:
      return s.title;
  }
}

const SEC_C: Record<string, string> = {
  البداية: "text-slate-400",
  الاستخدامات: "text-cyan-600",
  "الفروق الدقيقة": "text-sky-600",
  "الكلمات الدالة": "text-teal-600",
  "النفي والسؤال": "text-violet-600",
  القواعد: "text-emerald-600",
  "الحالات الخاصة": "text-amber-600",
  التمارين: "text-cyan-600",
  التحديات: "text-violet-600",
  الخاتمة: "text-slate-600",
};

function Rail({ i, setI, onExit, onClose }: { i: number; setI: (n: number) => void; onExit: () => void; onClose?: () => void }) {
  const groups = useMemo(() => {
    const g: { sec: string; idxs: number[] }[] = [];
    SLIDES.forEach((s, idx) => {
      const last = g[g.length - 1];
      if (last && last.sec === s.section) last.idxs.push(idx);
      else g.push({ sec: s.section, idxs: [idx] });
    });
    return g;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 10 · المضارع المستمر المتقدم</div>
        <En className="text-xs font-semibold text-slate-400">Present Continuous · Advanced</En>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.sec} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SEC_C[g.sec] || "text-slate-400"}`}>{g.sec}</div>
            {g.idxs.map((idx) => {
              const on = idx === i;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setI(idx);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-cyan-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${on ? "bg-white/25" : "bg-slate-100"}`}>{idx + 1}</span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[idx])}</span>
                  <span className="mr-auto text-base">{SLIDES[idx].mascot}</span>
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

export default function Lesson10({ onExit }: { onExit: () => void }) {
  const [i, setI] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;

  const go = useMemo(
    () => ({
      next: () => setI((v) => Math.min(v + 1, total - 1)),
      prev: () => setI((v) => Math.max(v - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menu) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft") go.next();
      if (e.key === "ArrowRight") go.prev();
      if (e.key === " ") {
        e.preventDefault();
        go.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, menu]);

  useEffect(() => {
    document.getElementById("l10-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f2f8fb] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail i={i} setI={setI} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                {slide.section} · <span className="text-slate-800">{slideTitle(slide)}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full rounded-full bg-gradient-to-l from-cyan-500 via-violet-400 to-sky-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>
          <main id="l10-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={i} className="pop mx-auto max-w-4xl">
              <SlideView s={slide} onExit={onExit} />
            </div>
          </main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={go.prev} disabled={i === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-cyan-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-cyan-700 disabled:opacity-30">
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Rail i={i} setI={setI} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
