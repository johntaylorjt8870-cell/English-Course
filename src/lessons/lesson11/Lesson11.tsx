import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SUBJ11,
  VERBS11,
  SIMPLE_SIGNALS,
  CONT_SIGNALS,
  STATIVE_VERBS,
  GRAMMAR_DETECTIVE_PASSAGE,
  GRAMMAR_DETECTIVE_Q,
  FINAL_CHALLENGE_TOM,
  FINAL_IQ_PASSAGE,
  FINAL_IQ_Q,
  COMPREHENSIVE,
  SUMMARY,
  ROLE11_AR,
  type Slide11,
  type Block11,
  type Part11,
  type Role11,
  type Exercise11,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// Present Simple vs Present Continuous — تدرج سماوي/بنفسجي مطور
// ============================================================
const RS: Record<Role11, { chip: string; solid: string; text: string }> = {
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

function PartsLine({ parts, q, size = "md", label = true }: { parts: Part11[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[p.role].chip} ${sz} font-en font-extrabold leading-tight`}>
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE11_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function Mixed({ text }: { text: string }) {
  return <LatinRuns text={text} />;
}

function SentenceCard({ parts, ar, note, q }: { parts: Part11[]; ar: string; note?: string; q?: boolean }) {
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
// تفاعليات Lesson 11
// ============================================================

function BigMap() {
  const [mode, setMode] = useState<"simple" | "cont">("simple");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("simple")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "simple" ? "border-transparent bg-slate-800 text-white" : "border-slate-200 bg-white text-slate-600"}`}>Present Simple</button>
        <button onClick={() => setMode("cont")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "cont" ? "border-transparent bg-cyan-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>Present Continuous</button>
      </div>
      <div key={mode} className="pop grid gap-3 md:grid-cols-2">
        <div className={`rounded-3xl border-2 p-5 ${mode === "simple" ? "border-slate-800 bg-white shadow" : "border-slate-200 bg-white/60"}`}>
          <div className="font-head text-lg font-bold text-slate-800">Present Simple</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["عادة", "روتين", "حقيقة", "شيء متكرر", "شيء مستقر"].map((x) => (
              <span key={x} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">{x}</span>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            <En className="block font-bold text-slate-700">Nora walks to school every day.</En>
            <span className="text-sm text-slate-500">روتين → Simple</span>
          </div>
        </div>
        <div className={`rounded-3xl border-2 p-5 ${mode === "cont" ? "border-cyan-300 bg-cyan-50 shadow" : "border-slate-200 bg-white/60"}`}>
          <div className="font-head text-lg font-bold text-cyan-800">Present Continuous</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["يحدث الآن", "يحدث هذه الفترة", "شيء مؤقت", "شيء يتغير حاليًا"].map((x) => (
              <span key={x} className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-800 border border-cyan-200">{x}</span>
            ))}
          </div>
          <div className="mt-3 space-y-1">
            <En className="block font-bold text-cyan-800">Nora is walking to school now.</En>
            <span className="text-sm text-cyan-700">الآن → Continuous</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareCook() {
  const [mode, setMode] = useState<"simple" | "cont">("simple");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-3 flex justify-center gap-2">
        <button onClick={() => setMode("simple")} className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "simple" ? "bg-slate-800 text-white" : "bg-white border-2 border-slate-200 text-slate-600"}`}>Lara cooks every evening</button>
        <button onClick={() => setMode("cont")} className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "cont" ? "bg-cyan-600 text-white" : "bg-white border-2 border-slate-200 text-slate-600"}`}>Lara is cooking now</button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center border-2 border-slate-100">
        {mode === "simple" ? (
          <>
            <En className="text-2xl font-extrabold text-slate-800">Lara cooks dinner every evening.</En>
            <div className="mt-1 text-slate-500">لَارا تطبخ العشاء كل مساء — روتين</div>
            <div className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">cooks → عادة</div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-cyan-800">Lara is cooking dinner now.</En>
            <div className="mt-1 text-slate-500">لَارا تطبخ العشاء الآن — يحدث الآن</div>
            <div className="mt-3 inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700">is cooking → الآن</div>
          </>
        )}
      </div>
    </div>
  );
}

function MagicQuestion() {
  const [pick, setPick] = useState<"habit" | "now" | null>(null);
  return (
    <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
      <div className="text-center font-bold text-violet-800">🧠 السؤال السحري</div>
      <div className="mt-2 text-center text-sm font-bold text-slate-700">عندما ترى جملة ولا تعرف الزمن، اسأل نفسك:</div>
      <div className="mt-3 rounded-2xl bg-white p-4 text-center border-2 border-violet-100">
        <En className="text-xl font-extrabold text-slate-800">هل أتكلم عن شيء يحدث عادة، أم شيء يحدث الآن؟</En>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <button onClick={() => setPick("habit")} className={`rounded-2xl border-2 p-4 text-right transition ${pick === "habit" ? "border-slate-800 bg-slate-800 text-white" : "border-slate-200 bg-white"}`}>
          <div className="font-bold">My uncle repairs bicycles.</div>
          <div className={`text-sm ${pick === "habit" ? "text-slate-300" : "text-slate-500"}`}>هل هو يصلح دراجة الآن؟ ليس بالضرورة — عمل عام</div>
          {pick === "habit" && <div className="mt-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold inline-block">Present Simple ✅</div>}
        </button>
        <button onClick={() => setPick("now")} className={`rounded-2xl border-2 p-4 text-right transition ${pick === "now" ? "border-cyan-600 bg-cyan-600 text-white" : "border-slate-200 bg-white"}`}>
          <div className="font-bold">My uncle is repairing my bicycle.</div>
          <div className={`text-sm ${pick === "now" ? "text-cyan-100" : "text-slate-500"}`}>هو يصلح دراجتي الآن</div>
          {pick === "now" && <div className="mt-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold inline-block">Present Continuous ✅</div>}
        </button>
      </div>
    </div>
  );
}

function NowWithoutNow() {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 border-2 border-cyan-200">
          <En className="font-bold text-cyan-800">Look! The dog is chasing the ball.</En>
          <div className="text-sm text-slate-500">واضح أنه يحدث الآن — مع Look!</div>
        </div>
        <div className="rounded-2xl bg-white p-4 border-2 border-slate-200">
          <En className="font-bold text-slate-800">The dog is chasing the ball.</En>
          <div className="text-sm text-slate-500">بدون now — السياق واضح، يظل Continuous</div>
        </div>
      </div>
      <div className="mt-3 text-center text-xs font-bold text-slate-500">غياب now لا يعني أن الجملة ليست Present Continuous</div>
    </div>
  );
}

function SimpleWithoutEveryDay() {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 border-2 border-slate-200">
          <En className="font-bold text-slate-800">Birds have feathers.</En>
          <div className="text-sm text-slate-500">الطيور لديها ريش — حقيقة عامة، لا يوجد every day</div>
        </div>
        <div className="rounded-2xl bg-white p-4 border-2 border-slate-200">
          <En className="font-bold text-slate-800">Water freezes at 0°C.</En>
          <div className="text-sm text-slate-500">الماء يتجمد عند 0° — حقيقة → Simple</div>
        </div>
      </div>
    </div>
  );
}

function SignalSimple() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {SIMPLE_SIGNALS.map((w, i) => (
        <span key={w.en} className="rounded-2xl border-2 border-slate-200 bg-white px-3.5 py-2 shadow-sm anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
          <En className="text-lg font-extrabold text-slate-700">{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

function SignalContinuous() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {CONT_SIGNALS.map((w, i) => (
        <span key={w.en} className="rounded-2xl border-2 border-cyan-200 bg-white px-3.5 py-2 shadow-sm anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
          <En className="text-lg font-extrabold text-cyan-700">{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

function TemporaryCompare() {
  const [mode, setMode] = useState<"stable" | "temp">("stable");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("stable")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "stable" ? "border-transparent bg-slate-700 text-white" : "border-slate-200 bg-white text-slate-600"}`}>وضع مستقر</button>
        <button onClick={() => setMode("temp")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "temp" ? "border-transparent bg-cyan-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>مؤقت this summer</button>
      </div>
      <div key={mode} className="pop grid gap-3 md:grid-cols-2">
        <div className={`rounded-2xl border-2 p-4 ${mode === "stable" ? "border-slate-800 bg-white shadow" : "border-slate-200 bg-white/60"}`}>
          <En className="block text-lg font-extrabold text-slate-800">Adam works at a bakery.</En>
          <div className="text-sm text-slate-500">هذا عمله — وضع عام ومستقر → Simple</div>
        </div>
        <div className={`rounded-2xl border-2 p-4 ${mode === "temp" ? "border-cyan-300 bg-cyan-50 shadow" : "border-slate-200 bg-white/60"}`}>
          <En className="block text-lg font-extrabold text-cyan-800">Adam is working at a bakery this summer.</En>
          <div className="text-sm text-cyan-700">هذا الصيف — مؤقت → Continuous</div>
        </div>
      </div>
    </div>
  );
}

function LivingCompare() {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 border-2 border-slate-200">
          <En className="font-bold text-slate-800">My sister lives in London.</En>
          <div className="text-sm text-slate-500">وضع مستقر → Simple</div>
        </div>
        <div className="rounded-2xl bg-white p-4 border-2 border-cyan-200">
          <En className="font-bold text-cyan-800">My sister is living with her friend this month.</En>
          <div className="text-sm text-cyan-700">وضع مؤقت this month — المعنى تغير → Continuous</div>
        </div>
      </div>
    </div>
  );
}

function TheseDays() {
  return (
    <div className="rounded-3xl border-2 border-cyan-100 bg-cyan-50/50 p-5">
      <div className="rounded-2xl bg-white p-4 border-2 border-cyan-200 text-center">
        <En className="text-xl font-extrabold text-cyan-800">I am learning Spanish these days.</En>
        <div className="mt-1 text-slate-600">أنا أتعلم الإسبانية هذه الأيام — ليس كل ثانية، بل نشاط خلال هذه الفترة</div>
      </div>
      <div className="mt-3 text-center text-xs font-bold text-cyan-700">these days → فترة حالية → Present Continuous</div>
    </div>
  );
}

function FrequencyPlace() {
  const [mode, setMode] = useState<"normal" | "be">("normal");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("normal")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "normal" ? "bg-slate-800 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>مع فعل عادي</button>
        <button onClick={() => setMode("be")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "be" ? "bg-violet-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>مع be</button>
      </div>
      <div key={mode} className="pop grid gap-2">
        {mode === "normal" ? (
          <>
            <div className="rounded-2xl bg-white p-3 border-2 border-slate-100 flex flex-wrap items-center gap-2"><En className="font-bold">I usually read before bed.</En><span className="text-sm text-slate-500">usually قبل الفعل</span></div>
            <div className="rounded-2xl bg-white p-3 border-2 border-slate-100 flex flex-wrap items-center gap-2"><En className="font-bold">She often visits her aunt.</En><span className="text-sm text-slate-500">often قبل الفعل</span></div>
            <div className="rounded-2xl bg-white p-3 border-2 border-slate-100 flex flex-wrap items-center gap-2"><En className="font-bold">He never eats spicy food.</En><span className="text-sm text-slate-500">never قبل الفعل</span></div>
          </>
        ) : (
          <>
            <div className="rounded-2xl bg-white p-3 border-2 border-violet-200 flex flex-wrap items-center gap-2"><En className="font-bold text-violet-800">She is usually quiet.</En><span className="text-sm text-violet-600">usually بعد am/is/are</span></div>
            <div className="rounded-2xl bg-white p-3 border-2 border-violet-200 flex flex-wrap items-center gap-2"><En className="font-bold text-violet-800">They are often late.</En><span className="text-sm text-violet-600">often بعد are</span></div>
            <div className="rounded-2xl bg-white p-3 border-2 border-violet-200 flex flex-wrap items-center gap-2"><En className="font-bold text-violet-800">He is never rude.</En><span className="text-sm text-violet-600">never بعد is</span></div>
          </>
        )}
      </div>
    </div>
  );
}

function BeVsDo() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="text-sm font-bold text-slate-600">Present Simple — فعل عادي</div>
        <En className="mt-2 block text-xl font-extrabold text-slate-800">Does he play tennis?</En>
        <div className="text-sm text-slate-500">play = فعل عادي → Does</div>
        <div className="mt-3 rounded-xl bg-white p-2 border-2 border-slate-200"><En className="text-sm font-bold text-rose-700 line-through">Does he playing tennis? ❌</En></div>
      </div>
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
        <div className="text-sm font-bold text-cyan-700">Present Continuous — ing</div>
        <En className="mt-2 block text-xl font-extrabold text-cyan-800">Is he playing tennis?</En>
        <div className="text-sm text-cyan-700">playing = مستمر → Is</div>
        <div className="mt-3 rounded-xl bg-white p-2 border-2 border-cyan-200"><En className="text-sm font-bold text-rose-700 line-through">Is he play tennis? ❌</En></div>
      </div>
    </div>
  );
}

function MentalTable() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="font-bold text-slate-700">Present Simple</div>
        <div className="mt-3 space-y-2">
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-slate-200">He plays.</En>
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-slate-200">He doesn't play.</En>
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-slate-200">Does he play?</En>
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-emerald-200 text-emerald-800">Yes, he does.</En>
        </div>
        <div className="mt-3 text-xs font-bold text-slate-500">does → Present Simple</div>
      </div>
      <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
        <div className="font-bold text-cyan-800">Present Continuous</div>
        <div className="mt-3 space-y-2">
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-cyan-200">He is playing.</En>
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-cyan-200">He isn't playing.</En>
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-cyan-200">Is he playing?</En>
          <En className="block rounded-xl bg-white px-3 py-2 font-bold border-2 border-emerald-200 text-emerald-800">Yes, he is.</En>
        </div>
        <div className="mt-3 text-xs font-bold text-cyan-700">is → Present Continuous</div>
      </div>
    </div>
  );
}

function DangerousError() {
  return (
    <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-5">
      <div className="flex flex-wrap gap-2">
        <En className="rounded-xl bg-white px-3 py-2 font-bold border-2 border-rose-300 line-through decoration-rose-400">He is plays football. ❌</En>
        <En className="rounded-xl bg-white px-3 py-2 font-bold border-2 border-emerald-300 text-emerald-800">He plays football. ✅</En>
        <En className="rounded-xl bg-white px-3 py-2 font-bold border-2 border-emerald-300 text-emerald-800">He is playing football. ✅</En>
      </div>
      <div className="mt-3 text-sm font-bold text-rose-700">لا نخلط: is + plays ❌ — ولا does + playing ❌</div>
    </div>
  );
}

function StativeGrid() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {STATIVE_VERBS.map((v, i) => (
          <button key={v.en} onClick={() => setPicked(i)} className={`rounded-2xl border-2 p-3 text-center transition ${picked === i ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white hover:border-amber-200"}`}>
            <En className="text-lg font-extrabold text-slate-800">{v.en}</En>
            <div className="text-xs font-bold text-slate-500">{v.ar}</div>
            <div className="mt-1 text-[11px] font-bold text-amber-700">غالبًا Simple</div>
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        <div className="rounded-2xl bg-white p-3 border-2 border-emerald-200 flex flex-wrap items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white text-sm">✓</span>
          <En className="font-bold text-emerald-800">I know the answer.</En>
        </div>
        <div className="rounded-2xl bg-white p-3 border-2 border-rose-200 flex flex-wrap items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-500 text-white text-sm">✕</span>
          <En className="font-bold text-rose-700 line-through decoration-rose-300">I am knowing the answer.</En>
          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">لا نستخدم know مع Continuous</span>
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
        <button onClick={() => setMode("opinion")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "opinion" ? "bg-indigo-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>رأي — think</button>
        <button onClick={() => setMode("process")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "process" ? "bg-cyan-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>عملية — thinking</button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center border-2 border-slate-100">
        {mode === "opinion" ? (
          <>
            <En className="text-2xl font-extrabold text-slate-800">I think this movie is great.</En>
            <div className="mt-1 text-slate-500">أنا أعتقد أن هذا الفيلم رائع — رأي → Simple</div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-cyan-800">I am thinking about my future.</En>
            <div className="mt-1 text-slate-500">أنا أفكر في مستقبلي — عملية الآن → Continuous</div>
          </>
        )}
      </div>
    </div>
  );
}

function HaveCompare() {
  const [mode, setMode] = useState<"own" | "activity">("own");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("own")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "own" ? "bg-slate-800 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>امتلاك — have</button>
        <button onClick={() => setMode("activity")} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold ${mode === "activity" ? "bg-cyan-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>نشاط — having</button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center border-2 border-slate-100">
        {mode === "own" ? (
          <>
            <En className="text-2xl font-extrabold text-slate-800">I have a car.</En>
            <div className="mt-1 text-slate-500">لدي سيارة — have = امتلاك → Simple</div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-cyan-800">I am having lunch.</En>
            <div className="mt-1 text-slate-500">أنا أتناول الغداء — have = نشاط → Continuous</div>
          </>
        )}
      </div>
      <div className="mt-3 text-center text-xs font-bold text-slate-500">نفس الفعل يتغير حسب المعنى — نقطة متقدمة جدًا 🧠</div>
    </div>
  );
}

// ============================================================
// تمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-cyan-600 text-sm font-bold text-white">{n}</span>;
}

function ChooseTenseEx({ ex }: { ex: Extract<Exercise11, { type: "chooseTense" }> }) {
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
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
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

function ChooseFormEx({ ex }: { ex: Extract<Exercise11, { type: "chooseForm" }> }) {
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
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{it.ar}</span>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
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

function FillEx({ ex }: { ex: Extract<Exercise11, { type: "fill" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <Nub n={i + 1} />
          <En className="text-lg font-bold text-slate-800">{it.stem}</En>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">({it.hint})</span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{it.ar}</span>
          {show[i] ? (
            <En className="tada mr-auto text-lg font-extrabold text-emerald-700">{it.answer}</En>
          ) : (
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">أظهر الحل</button>
          )}
        </div>
      ))}
    </div>
  );
}

function NegTransformEx({ ex }: { ex: Extract<Exercise11, { type: "negTransform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <Nub n={i + 1} />
          <En className="text-lg font-bold text-slate-800">{it.aff}</En>
          <span className="text-slate-300">→</span>
          {show[i] ? <En className="tada text-lg font-extrabold text-emerald-700">{it.neg}</En> : <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-rose-500 px-4 py-1.5 text-sm font-bold text-white">أظهر النفي</button>}
        </div>
      ))}
    </div>
  );
}

function QTransformEx({ ex }: { ex: Extract<Exercise11, { type: "qTransform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <Nub n={i + 1} />
          <En className="text-lg font-bold text-slate-800">{it.aff}</En>
          <span className="text-slate-300">→</span>
          {show[i] ? <En className="tada text-lg font-extrabold text-violet-700">{it.q}</En> : <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-violet-600 px-4 py-1.5 text-sm font-bold text-white">أظهر السؤال</button>}
        </div>
      ))}
    </div>
  );
}

function TenseExplainEx({ ex }: { ex: Extract<Exercise11, { type: "tenseExplain" }> }) {
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
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {o}
                </button>
              ))}
            </div>
            {c !== undefined && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>💡 {it.explain}</div>}
          </div>
        );
      })}
    </div>
  );
}

function FixEx({ ex }: { ex: Extract<Exercise11, { type: "fix" }> }) {
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
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">الحل 💡</button>
          )}
        </div>
      ))}
    </div>
  );
}

function IQEx({ ex }: { ex: Extract<Exercise11, { type: "iq" }> }) {
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
        // correct kind
        return (
          <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
              <div className="flex-1">
                <Rich text={it.q} className="font-bold text-slate-800" />
                <En className="mt-2 block text-lg font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
                {showText[i] ? (
                  <div className="tada mt-2 rounded-2xl bg-emerald-50 p-3 border-2 border-emerald-200">
                    <En className="font-bold text-emerald-800">{it.correct}</En>
                    <div className="mt-1 text-sm font-bold text-emerald-700">{it.why}</div>
                  </div>
                ) : (
                  <button onClick={() => setShowText((s) => ({ ...s, [i]: true }))} className="mt-3 rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">أظهر التصحيح 💡</button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Detective() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <Frame mascot="🕵️" badge="المستوى 9" title="Grammar Detective" lead="اقرأ النص ثم حلل:">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <En className="block text-lg font-bold leading-relaxed text-slate-800">{GRAMMAR_DETECTIVE_PASSAGE}</En>
        <div className="mt-3 text-sm font-bold text-slate-500">Emma usually spends her weekends at home, but this weekend she is visiting her cousins... — نص يجمع Simple و Continuous</div>
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

function TransformChallenge() {
  const [step, setStep] = useState(0);
  return (
    <Frame mascot="🏆" badge="المستوى 10" title="تحدي التحويل الكامل" lead="لدينا: Tom usually rides his bike to school. — حوّلها إلى الآن، ثم إلى النفي، ثم إلى سؤال، ثم أجب Yes/No">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="flex flex-wrap gap-2">
          {FINAL_CHALLENGE_TOM.steps.map((s, i) => (
            <button key={i} onClick={() => setStep(i)} className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition ${step === i ? "border-transparent bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{s.label}</button>
          ))}
        </div>
        <div key={step} className="pop mt-4 rounded-3xl bg-white p-5 border-2 border-amber-200 text-center">
          <En className="text-xl font-extrabold text-slate-800">{FINAL_CHALLENGE_TOM.steps[step].en}</En>
          <div className="mt-2 text-sm font-bold text-slate-500">{FINAL_CHALLENGE_TOM.steps[step].ar}</div>
        </div>
        <div className="mt-4 grid gap-2">
          {FINAL_CHALLENGE_TOM.steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 border-2 ${i === step ? "border-amber-300 bg-white" : "border-transparent bg-white/60"}`}>
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${i === step ? "bg-amber-600 text-white" : "bg-slate-200 text-slate-600"}`}>{i + 1}</span>
              <En className="font-bold text-slate-700">{s.en}</En>
              <span className="mr-auto text-xs font-bold text-slate-400">{s.ar}</span>
            </div>
          ))}
        </div>
      </div>
      <Note emoji="🔥" text="انتبه إلى الفرق بين [[does]] و [[is]] — [[Does he ride?]] → Simple — [[Is he riding?]] → Continuous" />
    </Frame>
  );
}

function FinalDetective() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <Frame mascot="👑" badge="المستوى 11 · IQ200 النهائي" title="اقرأ الموقف — أجب بدون تخمين" lead="Alex normally studies at the library... — حلل كل فعل:">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <En className="block text-lg font-bold leading-relaxed text-slate-800">{FINAL_IQ_PASSAGE}</En>
      </div>
      <div className="grid gap-2.5">
        {FINAL_IQ_Q.map((it, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">{i + 1}</span>
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

function Comprehensive() {
  const [showB, setShowB] = useState<Record<number, boolean>>({});
  const [showC, setShowC] = useState(false);
  return (
    <Frame mascot="🧪" badge="الاختبار الشامل للدرس 11" title="بدون النظر إلى القواعد، حاول الحل" lead="القسم A اختيار، القسم B تصحيح، القسم C كتابة، القسم D تحدي IQ200">
      <div className="space-y-6">
        <div>
          <div className="font-head text-lg font-bold text-slate-800">القسم A — اختر</div>
          <div className="mt-3 grid gap-2.5">
            {COMPREHENSIVE.A.map((it, i) => (
              <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <Nub n={i + 1} />
                  <En className="font-bold text-slate-800">{it.en}</En>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">{it.ar}</span>
                </div>
                <div className="mt-2 flex gap-2 pr-11">
                  {it.opts.map((o) => (
                    <span key={o} className={`rounded-xl border-2 px-3 py-1 text-sm font-bold ${o === it.opts[it.answer] ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500"}`}>{o}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-head text-lg font-bold text-slate-800">القسم B — صحح</div>
          <div className="mt-3 grid gap-2.5">
            {COMPREHENSIVE.B.map((it, i) => (
              <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
                <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
                {showB[i] ? (
                  <div className="tada flex flex-wrap items-center gap-2">
                    <En className="font-extrabold text-emerald-700">→ {it.correct}</En>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">{it.why}</span>
                  </div>
                ) : (
                  <button onClick={() => setShowB((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-bold text-white">الحل</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-head text-lg font-bold text-slate-800">القسم C — اكتب جملة من عندك باستخدام:</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {COMPREHENSIVE.C.map((c) => (
              <span key={c.word} className="rounded-2xl border-2 border-cyan-200 bg-cyan-50 px-4 py-2">
                <En className="font-bold text-cyan-800">{c.word}</En>
                <span className="mr-2 text-xs font-bold text-slate-500">{c.hint}</span>
              </span>
            ))}
          </div>
          <textarea placeholder="I usually... / I am ... now..." rows={4} className="mt-3 w-full rounded-2xl border-2 border-slate-200 p-3 font-en text-sm focus:border-cyan-400 focus:outline-none" dir="ltr" />
        </div>
        <div>
          <div className="font-head text-lg font-bold text-slate-800">القسم D — IQ200</div>
          <div className="mt-3 rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
            <div className="font-bold text-violet-800">{COMPREHENSIVE.D.instruction}</div>
            <div className="mt-3 rounded-2xl bg-white p-4 border-2 border-violet-100">
              <En className="text-sm font-bold text-slate-700">{COMPREHENSIVE.D.example}</En>
            </div>
            <textarea placeholder="My brother usually... / He is ... now... — اشرح بالعربية" rows={4} className="mt-3 w-full rounded-2xl border-2 border-slate-200 p-3 text-sm focus:border-violet-400 focus:outline-none" />
            <button onClick={() => setShowC(!showC)} className="mt-3 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white">{showC ? "إخفاء النموذج" : "أظهر نموذج مقترح"}</button>
            {showC && (
              <div className="tada mt-3 rounded-2xl bg-white p-4 border-2 border-violet-200 space-y-1 font-en text-sm font-bold" dir="ltr">
                <div>My father usually drives to work. (Simple — usually عادة)</div>
                <div>Today he is taking the train because his car is broken. (Continuous — today مؤقت)</div>
              </div>
            )}
          </div>
        </div>
      </div>
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
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-gradient-to-l from-cyan-600 to-violet-600 px-5 py-2 text-base font-bold text-white">الدرس الحادي عشر</div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">Present Simple vs Present Continuous</h1>
        <p className="pop pop-3 mt-2 text-lg font-bold text-violet-600">
          <En className="font-en">كيف تختار الزمن الصحيح من المعنى؟</En>
        </p>
        <div className="pop pop-4 mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 border-2 border-amber-200">
          <span>🔥</span>
          <span className="text-sm font-bold text-amber-800">IQ200 — لا تعتمد على كلمة now وحدها</span>
        </div>
        <div className="pop pop-5 mt-6 rounded-3xl border-2 border-slate-100 bg-slate-50 p-5 max-w-xl mx-auto text-right">
          <div className="text-sm font-bold text-slate-500">ممتاز جدًا. بما أننا أنهينا أساس Present Simple وPresent Continuous، فالآن سنجمعهما معًا بشكل أوسع وأعمق.</div>
          <div className="mt-2 text-sm font-bold text-slate-700">هذا الدرس مهم جدًا لأنه لن يعلمك قاعدة جديدة فقط، بل سيعلمك كيف "تفكر" عند اختيار الزمن.</div>
          <div className="mt-3 text-sm font-bold text-slate-600">سنتعلم كيف نعرف من معنى الجملة:</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold">
            {["هل الشيء عادة؟", "هل يحدث الآن؟", "هل هو مؤقت؟", "هل هو حقيقة؟", "هل يتكرر؟", "هل هو وضع مستقر؟", "هل هناك تغيير يحدث هذه الفترة؟"].map((x, i) => (
              <span key={i} className="rounded-xl bg-white px-2 py-1.5 border border-slate-200 text-slate-700 flex items-center gap-1"><span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-600 text-white text-[11px]">?</span>{x}</span>
            ))}
          </div>
        </div>
        <div className="pop pop-6 mt-6 flex justify-center">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-4">
            <PartsLine parts={[{ text: "Nora", role: "s" }, { text: "walks", role: "v" }, { text: "every day", role: "adv" }]} size="lg" />
            <div className="mt-1 text-center text-slate-500">روتين → Simple — مقابل — is walking now → Continuous</div>
          </div>
        </div>
        <p className="pop mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "تكوين [[Present Simple]] بشكل صحيح.",
    "تكوين [[Present Continuous]] بشكل صحيح.",
    "التمييز بين الزمنين.",
    "معرفة الفرق بين العادة والحدث الحالي.",
    "معرفة الفرق بين الوضع الدائم والوضع المؤقت.",
    "استخدام كلمات مثل: [[always · usually · often · sometimes · never · every day · now · right now · at the moment · today · this week · these days]]",
    "استخدام [[am / is / are]] بشكل صحيح.",
    "استخدام [[do / does]] بشكل صحيح.",
    "استخدام [[don't / doesn't]] بشكل صحيح.",
    "معرفة متى نستخدم [[s / es / ies]].",
    "معرفة متى نستخدم [[verb-ing]].",
    "اكتشاف الأخطاء المركبة.",
    "فهم بعض الأفعال التي لا نستخدمها عادةً مع [[Continuous]].",
    "كتابة فقرة تجمع الزمنين معًا.",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="أهداف الدرس">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cyan-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس الكامل" lead="احفظ الفرق من المعنى، ليس من الكلمة فقط:">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
          <div className="font-head text-lg font-bold text-slate-800">Present Simple</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SUMMARY.simpleUses.map((x) => (
              <span key={x} className="rounded-full bg-white px-3 py-1 text-xs font-bold border border-slate-200 text-slate-700">{x}</span>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm font-bold text-slate-700">
            <div><Rich text={SUMMARY.simpleForm.pos} /></div>
            <div><Rich text={SUMMARY.simpleForm.neg} /></div>
            <div><Rich text={SUMMARY.simpleForm.q} /></div>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
          <div className="font-head text-lg font-bold text-cyan-800">Present Continuous</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SUMMARY.contUses.map((x) => (
              <span key={x} className="rounded-full bg-white px-3 py-1 text-xs font-bold border border-cyan-200 text-cyan-700">{x}</span>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-sm font-bold text-slate-800">
            <div><Rich text={SUMMARY.contForm.pos} /></div>
            <div><Rich text={SUMMARY.contForm.neg} /></div>
            <div><Rich text={SUMMARY.contForm.q} /></div>
          </div>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="font-head text-lg font-bold text-violet-800">⭐ القاعدة الذهبية</div>
        <div className="mt-2 text-base font-bold leading-relaxed text-slate-800">
          <LatinRuns text={SUMMARY.golden} />
        </div>
      </div>
      <Note emoji="🔥" text={SUMMARY.next} />
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
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">أحسنت — أتقنت الفرق بين الزمنين</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">
          الآن تفكر بالمعنى: عادة؟ روتين؟ حقيقة؟ مستقر؟ → Simple — يحدث الآن؟ هذه الفترة؟ مؤقت؟ → Continuous
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

function BlockView({ b }: { b: Block11 }) {
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
    case "bigMap":
      return <BigMap />;
    case "compareCook":
      return <CompareCook />;
    case "magicQuestion":
      return <MagicQuestion />;
    case "nowWithoutNow":
      return <NowWithoutNow />;
    case "simpleWithoutEveryDay":
      return <SimpleWithoutEveryDay />;
    case "signalSimple":
      return <SignalSimple />;
    case "signalContinuous":
      return <SignalContinuous />;
    case "temporaryCompare":
      return <TemporaryCompare />;
    case "livingCompare":
      return <LivingCompare />;
    case "theseDays":
      return <TheseDays />;
    case "frequencyPlace":
      return <FrequencyPlace />;
    case "beVsDo":
      return <BeVsDo />;
    case "mentalTable":
      return <MentalTable />;
    case "dangerousError":
      return <DangerousError />;
    case "stativeGrid":
      return <StativeGrid />;
    case "thinkCompare":
      return <ThinkCompare />;
    case "haveCompare":
      return <HaveCompare />;
  }
}

function SlideView({ s, onExit }: { s: Slide11; onExit: () => void }) {
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
          {ex.type === "chooseForm" && <ChooseFormEx ex={ex} />}
          {ex.type === "fill" && <FillEx ex={ex} />}
          {ex.type === "negTransform" && <NegTransformEx ex={ex} />}
          {ex.type === "qTransform" && <QTransformEx ex={ex} />}
          {ex.type === "tenseExplain" && <TenseExplainEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "iq" && <IQEx ex={ex} />}
          {ex.type === "transformChallenge" && <TransformChallenge />}
          {ex.type === "finalDetective" && <FinalDetective />}
          {ex.type === "comprehensive" && <Comprehensive />}
        </Frame>
      );
    }
    case "detective":
      return <Detective />;
    case "challenge":
      return <TransformChallenge />;
    case "finalChallenge":
      return <FinalDetective />;
    case "summary":
      return <Summary />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت تحكمك في Simple vs Continuous.">
          <FinalQuiz lesson={11} accent="bg-cyan-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(s: Slide11): string {
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
  "الخريطة الذهنية": "text-sky-600",
  "البناء الكامل": "text-cyan-600",
  "المقارنة الذهبية": "text-amber-600",
  "العلامات والسياق": "text-teal-600",
  "الفروق الدقيقة": "text-violet-600",
  "قواعد مهمة": "text-emerald-600",
  التمارين: "text-cyan-600",
  التحديات: "text-violet-600",
  "الخاتمة": "text-slate-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 11 · Simple vs Continuous</div>
        <En className="text-xs font-semibold text-slate-400">Present Simple vs Continuous</En>
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

export default function Lesson11({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l11-main")?.scrollTo({ top: 0 });
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
          <main id="l11-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
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
