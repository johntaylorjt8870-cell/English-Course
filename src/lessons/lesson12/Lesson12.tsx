import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SUBJ12,
  PAST_SIGNALS,
  AGO_PHRASES,
  ED_RULES,
  ED_MACHINE,
  REGULAR_BASIC,
  IRREG_FLIP,
  IRREG_TABLE,
  GRAMMAR_DETECTIVE_PASSAGE,
  GRAMMAR_DETECTIVE_Q,
  MIA_STORY,
  TEACHER_CHALLENGE,
  SUMMARY12,
  KEY_RULE,
  ROLE12_AR,
  type Slide12,
  type Block12,
  type Part12,
  type Role12,
  type Exercise12,
  type EdRuleKey,
  type Why12Item,
  type IQ12Item,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الماضي البسيط Past Simple — تدرّج برتقالي/وردي دافئ
// ============================================================
const RS: Record<Role12, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  v: { chip: "bg-orange-100 border-orange-300 text-orange-900", solid: "bg-orange-600", text: "text-orange-700" },
  o: { chip: "bg-teal-100 border-teal-300 text-teal-900", solid: "bg-teal-600", text: "text-teal-700" },
  adv: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-600", text: "text-violet-700" },
  be: { chip: "bg-cyan-100 border-cyan-300 text-cyan-900", solid: "bg-cyan-600", text: "text-cyan-700" },
  nt: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-500", text: "text-rose-700" },
  aux: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700" },
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

function PartsLine({ parts, q, size = "md", label = true }: { parts: Part12[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[p.role].chip} ${sz} font-en font-extrabold leading-tight`}>
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE12_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function SentenceCard({ parts, ar, note }: { parts: Part12[]; ar?: string; note?: string; q?: boolean }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {ar && <span className="text-lg text-slate-500">{ar}</span>}
        {note && (
          <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-bold text-orange-700">
            📌 <LatinRuns text={note} />
          </span>
        )}
      </div>
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; tip?: string }) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(234,88,12,0.32)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-orange-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-orange-100 px-3.5 py-1.5 text-sm font-bold text-orange-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-orange-600 to-rose-600 p-4 text-white">
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
// تفاعليات Lesson 12
// ============================================================

// ① الفكرة الأساسية
function CoreIdea() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="rounded-3xl border-2 border-orange-100 bg-orange-50/60 p-5">
      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        <div className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-3">
          <div className="font-head text-base font-bold text-slate-800">حدث في الماضي</div>
        </div>
        <span className="text-2xl font-black text-orange-600">+</span>
        <div className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-3">
          <div className="font-head text-base font-bold text-slate-800">انتهى</div>
        </div>
        <span className="font-en text-2xl font-black text-orange-600">=====</span>
        <div className="rounded-2xl border-2 border-orange-300 bg-orange-600 px-5 py-3 shadow">
          <En className="font-en text-xl font-black text-white">Past Simple</En>
        </div>
      </div>
    </div>
  );
}

// ② مقارنة play / played
function ChessCompare() {
  const [mode, setMode] = useState<"present" | "past">("present");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("present")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "present" ? "border-transparent bg-slate-800 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          <En>Present Simple</En>
        </button>
        <button onClick={() => setMode("past")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "past" ? "border-transparent bg-orange-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          <En>Past Simple</En>
        </button>
      </div>
      <div key={mode} className="pop grid gap-3 md:grid-cols-2">
        <div className={`rounded-3xl border-2 p-5 text-center ${mode === "present" ? "border-slate-800 bg-white shadow" : "border-slate-200 bg-white/60"}`}>
          <En className="text-2xl font-extrabold text-slate-800">I play chess.</En>
          <div className="mt-1 text-slate-500">أنا ألعب الشطرنج — عادة أو بشكل عام</div>
          <div className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            <En>play</En> → حاضر
          </div>
        </div>
        <div className={`rounded-3xl border-2 p-5 text-center ${mode === "past" ? "border-orange-300 bg-orange-50 shadow" : "border-slate-200 bg-white/60"}`}>
          <En className="text-2xl font-extrabold text-orange-900">I played chess yesterday.</En>
          <div className="mt-1 text-slate-500">أنا لعبت الشطرنج أمس — حدث وانتهى</div>
          <div className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            <En>played</En> → ماضي
          </div>
        </div>
      </div>
    </div>
  );
}

// ③ جدار الكلمات الدالة
function SignalWall() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {PAST_SIGNALS.map((w, i) => (
        <span key={w.en} className="rounded-2xl border-2 border-violet-200 bg-white px-3.5 py-2 shadow-sm anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
          <En className="text-lg font-extrabold text-violet-700">{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

// ④ آلة ago
function AgoMachine() {
  const [idx, setIdx] = useState(0);
  const phrase = AGO_PHRASES[idx];
  const [duration] = phrase.en.split(" ago");
  return (
    <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
      <div className="flex flex-wrap justify-center gap-2">
        {AGO_PHRASES.map((p, i) => (
          <button key={p.en} onClick={() => setIdx(i)} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${i === idx ? "border-transparent bg-violet-600 text-white" : "border-violet-200 bg-white text-violet-700"}`}>
            {p.ar}
          </button>
        ))}
      </div>
      <div key={idx} className="pop mt-4 grid gap-3">
        <div dir="ltr" style={{ direction: "ltr" }} className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-emerald-200 bg-white p-4">
          <span className="rounded-xl bg-teal-100 border-2 border-teal-300 px-4 py-2 font-en text-xl font-extrabold text-teal-900">{duration}</span>
          <span className="rounded-xl bg-violet-100 border-2 border-violet-300 px-4 py-2 font-en text-xl font-extrabold text-violet-900">ago</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">✅ الترتيب الصحيح — المدة أولًا</span>
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-rose-200 bg-white p-4 opacity-80">
          <span className="rounded-xl bg-rose-50 border-2 border-rose-300 px-4 py-2 font-en text-xl font-extrabold text-rose-800 line-through decoration-rose-400">ago</span>
          <span className="rounded-xl bg-rose-50 border-2 border-rose-300 px-4 py-2 font-en text-xl font-extrabold text-rose-800 line-through decoration-rose-400">{duration}</span>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            ❌ لا نقول: <LatinRuns text="ago two days" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ⑤ last و ago
function LastAgo() {
  const [mode, setMode] = useState<"last" | "ago">("last");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("last")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "last" ? "border-transparent bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          <En>last week</En>
        </button>
        <button onClick={() => setMode("ago")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "ago" ? "border-transparent bg-orange-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          <En>two weeks ago</En>
        </button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center border-2 border-slate-100">
        {mode === "last" ? (
          <>
            <En className="text-2xl font-extrabold text-violet-800">I visited my cousin last week.</En>
            <div className="mt-1 text-slate-500">زرت ابن عمي الأسبوع الماضي.</div>
            <div className="mt-3 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
              <En>last week</En> = الأسبوع الماضي
            </div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-orange-800">I visited my cousin two weeks ago.</En>
            <div className="mt-1 text-slate-500">زرت ابن عمي منذ أسبوعين.</div>
            <div className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
              <En>two weeks ago</En> = منذ أسبوعين
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ⑥ نوعا الأفعال
function TypeSplit() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
        <div className="font-head text-lg font-bold text-emerald-800">
          <En>① Regular Verbs</En>
        </div>
        <div className="mt-1 text-sm font-bold text-emerald-700">الأفعال المنتظمة</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="mt-3 rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
          <En className="font-en text-2xl font-black text-emerald-800">verb + ed</En>
        </div>
        <div className="mt-3 space-y-1">
          <En className="block font-bold text-emerald-800">play → played</En>
          <En className="block font-bold text-emerald-800">watch → watched</En>
          <En className="block font-bold text-emerald-800">visit → visited</En>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
        <div className="font-head text-lg font-bold text-orange-800">
          <En>② Irregular Verbs</En>
        </div>
        <div className="mt-1 text-sm font-bold text-orange-700">الأفعال غير المنتظمة</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="mt-3 rounded-2xl border-2 border-orange-200 bg-white p-3 text-center">
          <span className="font-en text-2xl font-black text-orange-800">change completely</span>
        </div>
        <div className="mt-3 space-y-1">
          <En className="block font-bold text-orange-800">go → went</En>
          <En className="block font-bold text-orange-800">eat → ate</En>
          <En className="block font-bold text-orange-800">see → saw</En>
        </div>
      </div>
    </div>
  );
}

// ⑦ قائمة الأفعال المنتظمة الأساسية
function EdBasic() {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5 sm:grid-cols-3">
      {REGULAR_BASIC.map((v) => (
        <div key={v.base} dir="ltr" style={{ direction: "ltr" }} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-emerald-200 bg-white px-3 py-3">
          <En className="text-lg font-bold text-slate-500">{v.base}</En>
          <span className="text-orange-500">→</span>
          <En className="text-lg font-extrabold text-emerald-700">{v.past}</En>
        </div>
      ))}
    </div>
  );
}

// ⑩–⑬ أزواج قواعد ed — يلوّن الجزء المضاف
function commonPrefixLen(a: string, b: string): number {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
}

function EdPairs({ rule }: { rule: EdRuleKey }) {
  const r = ED_RULES[rule];
  const tone =
    rule === "add"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : rule === "add-d"
      ? "border-cyan-200 bg-cyan-50 text-cyan-800"
      : rule === "y2i"
      ? "border-amber-200 bg-amber-50 text-amber-800"
      : rule === "vowel-y"
      ? "border-teal-200 bg-teal-50 text-teal-800"
      : "border-rose-200 bg-rose-50 text-rose-800";
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span dir="ltr" className={`ltr font-en rounded-full border-2 px-3.5 py-1 text-sm font-black ${tone}`}>{r.name}</span>
        <span className="text-sm font-bold text-slate-600"><LatinRuns text={r.ar} /></span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {r.verbs.map((v) => {
          const n = commonPrefixLen(v.base, v.past);
          return (
            <div key={v.base} dir="ltr" style={{ direction: "ltr" }} className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-3 text-center">
              <En className="text-lg font-bold text-slate-500">{v.base}</En>
              <span className="mx-1 text-orange-500">→</span>
              <En className="text-lg font-extrabold text-slate-800">
                {v.past.slice(0, n)}
                <span className="rounded bg-orange-200/70 px-0.5 text-orange-900">{v.past.slice(n)}</span>
              </En>
              {v.ar && <div className="mt-0.5 text-xs font-bold text-slate-400">{v.ar}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ⑭ آلة -ed الكاملة
function EdMachine() {
  const [idx, setIdx] = useState(0);
  const item = ED_MACHINE[idx];
  const n = commonPrefixLen(item.base, item.past);
  return (
    <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
      <div className="text-center font-bold text-orange-800">🛠️ آلة قواعد -ed — اضغط أي فعل لترى القاعدة</div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {ED_MACHINE.map((v, i) => (
          <button key={v.base} onClick={() => setIdx(i)} className={`rounded-xl border-2 px-2.5 py-1 font-en text-sm font-bold transition ${i === idx ? "border-transparent bg-orange-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-orange-300"}`}>
            {v.base}
          </button>
        ))}
      </div>
      <div key={idx} className="pop mt-4 rounded-3xl bg-white p-5 text-center border-2 border-orange-100">
        <div dir="ltr" style={{ direction: "ltr" }} className="flex flex-wrap items-center justify-center gap-3">
          <En className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-5 py-2 text-2xl font-extrabold text-slate-500">{item.base}</En>
          <span className="text-3xl font-black text-orange-500">→</span>
          <En className="rounded-2xl border-2 border-orange-300 bg-orange-50 px-5 py-2 text-2xl font-extrabold text-slate-900">
            {item.past.slice(0, n)}
            <span className="rounded bg-orange-200 px-0.5 text-orange-900">{item.past.slice(n)}</span>
          </En>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="ltr font-en rounded-full bg-orange-100 px-3 py-1 text-xs font-black text-orange-800">{ED_RULES[item.rule].name}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{item.ar}</span>
          <span className="text-xs font-bold text-slate-500"><LatinRuns text={ED_RULES[item.rule].ar} /></span>
        </div>
      </div>
    </div>
  );
}

// ⑧ كل الضمائر مع نفس شكل الماضي
function SubjectGrid() {
  const [mode, setMode] = useState<"present" | "past">("past");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("present")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "present" ? "border-transparent bg-slate-800 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          <En>Present Simple</En>
        </button>
        <button onClick={() => setMode("past")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${mode === "past" ? "border-transparent bg-orange-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          <En>Past Simple</En>
        </button>
      </div>
      <div key={mode} className="pop grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {SUBJ12.map((s) => {
          const third = s === "He" || s === "She" || s === "It";
          const form = mode === "present" ? (third ? "plays" : "play") : "played";
          const hot = mode === "past" || (mode === "present" && third);
          return (
            <div key={s} className={`rounded-2xl border-2 p-3 text-center ${mode === "past" ? "border-orange-200 bg-orange-50" : third ? "border-slate-300 bg-slate-100" : "border-slate-200 bg-white"}`}>
              <En className="block text-base font-bold text-slate-500">{s}</En>
              <En className={`mt-1 block text-lg font-extrabold ${hot ? (mode === "past" ? "text-orange-800" : "text-slate-900") : "text-slate-700"}`}>{form}.</En>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-center text-xs font-bold text-slate-500">
        {mode === "past" ? (
          <>
            في الماضي: <En>I played · You played · He played · She played · It played · We played · They played</En> — الجميع متشابهون!
          </>
        ) : (
          <>
            في الحاضر: <En>He / She / It</En> تحتاج غالبًا <En>s</En> → <En>plays</En>
          </>
        )}
      </div>
    </div>
  );
}

// ⑨ plays / played
function PlaysCompare() {
  const [mode, setMode] = useState<"present" | "past">("present");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("present")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold ${mode === "present" ? "bg-slate-800 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
          <En>every Saturday</En>
        </button>
        <button onClick={() => setMode("past")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold ${mode === "past" ? "bg-orange-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
          <En>last Saturday</En>
        </button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center border-2 border-slate-100">
        {mode === "present" ? (
          <>
            <En className="text-2xl font-extrabold text-slate-800">He plays football every Saturday.</En>
            <div className="mt-1 text-slate-500">هو يلعب كرة القدم كل يوم سبت — Present Simple</div>
            <div className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
              لاحظ: <En>plays</En> (s مع He)
            </div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-orange-900">He played football last Saturday.</En>
            <div className="mt-1 text-slate-500">هو لعب كرة القدم السبت الماضي — Past Simple</div>
            <div className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
              لاحظ: <En>played</En> وليس <En className="line-through">playeds</En>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ⑮ بطاقات الأفعال غير المنتظمة
function IrregFlip() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  return (
    <div className="grid grid-cols-2 gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5 sm:grid-cols-3 lg:grid-cols-5">
      {IRREG_FLIP.map((v, i) => {
        const on = flipped[i];
        return (
          <button
            key={v.base}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            dir="ltr"
            style={{ direction: "ltr" }}
            className={`rounded-2xl border-2 px-3 py-4 text-center transition ${on ? "border-orange-300 bg-orange-50" : "border-slate-200 bg-white hover:border-orange-200"}`}
          >
            {on ? (
              <div className="tada">
                <En className="block text-xl font-black text-orange-800">{v.past}</En>
                <span className="mt-1 inline-block text-[11px] font-bold text-orange-600">الماضي ✅</span>
              </div>
            ) : (
              <div>
                <En className="block text-xl font-bold text-slate-500">{v.base}</En>
                <span className="mt-1 inline-block text-[11px] font-bold text-slate-400">اضغط للكشف</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ⑯ الجدول الكبير مع المعاني
function IrregTable() {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {IRREG_TABLE.map((v, i) => {
        const on = flipped[i];
        return (
          <button
            key={v.base}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center transition hover:border-orange-300"
          >
            <div dir="ltr" style={{ direction: "ltr" }} className="flex items-center justify-center gap-2">
              <En className="text-lg font-bold text-slate-500">{v.base}</En>
              <span className="text-orange-500">→</span>
              <En className={`text-lg font-black ${on ? "tada text-orange-800" : "text-slate-300"}`}>{on ? v.past : "?"}</En>
            </div>
            <div className="mt-1 text-xs font-bold text-slate-500">
              {v.arBase} <span className="text-slate-300">→</span> <span className={on ? "text-orange-700" : "text-slate-300"}>{on ? v.arPast : "؟"}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ⑰ خدعة read
function ReadTrick() {
  const [mode, setMode] = useState<"present" | "past">("present");
  return (
    <div className="rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setMode("present")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold ${mode === "present" ? "bg-slate-800 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
          <En>Present</En>
        </button>
        <button onClick={() => setMode("past")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold ${mode === "past" ? "bg-orange-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
          <En>Past</En>
        </button>
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center border-2 border-cyan-100">
        <En className={`font-en text-4xl font-black ${mode === "past" ? "text-orange-800" : "text-slate-800"}`}>read</En>
        <div className="mt-2 text-lg font-bold text-slate-600">الكتابة نفسها دائمًا — لكن النطق مختلف:</div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-4 py-1.5">
          <En className="font-en text-lg font-extrabold text-slate-800">read</En>
          <span className="text-slate-400">=</span>
          <span className="text-lg font-black text-orange-700">{mode === "present" ? "ريد" : "رِد"}</span>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-500">{mode === "present" ? "Present: read = ريد" : "Past: read = رِد"}</div>
      </div>
    </div>
  );
}

// ⑳ الخط الزمني
function TimelineVis() {
  const [mode, setMode] = useState<"yesterday" | "now">("yesterday");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div dir="ltr" style={{ direction: "ltr" }} className="relative mx-auto mt-2 max-w-2xl">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-black text-orange-800">الماضي</span>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-black text-cyan-800">الآن</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-600">المستقبل</span>
        </div>
        <div className="relative mt-3 h-2 rounded-full bg-gradient-to-r from-orange-300 via-cyan-300 to-slate-300">
          <span className="absolute -top-5 text-2xl" style={{ left: "12%" }}>
            {mode === "yesterday" ? "❌" : "✕"}
          </span>
          <span className="absolute -top-1 h-4 w-1 -translate-x-0.5 rounded bg-cyan-700" style={{ left: "50%" }} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-500">
          <span className="font-en">الماضي ←────────</span>
          <En className="rounded bg-cyan-100 px-2 py-0.5 text-cyan-800">now</En>
          <span className="font-en">────────→ المستقبل</span>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        <button onClick={() => setMode("yesterday")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold ${mode === "yesterday" ? "bg-orange-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
          <En>Yesterday</En>
        </button>
        <button onClick={() => setMode("now")} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold ${mode === "now" ? "bg-cyan-600 text-white border-transparent" : "bg-white border-slate-200 text-slate-600"}`}>
          <En>Now</En>
        </button>
      </div>
      <div key={mode} className="pop mt-4 rounded-3xl bg-white p-5 text-center border-2 border-slate-100">
        {mode === "yesterday" ? (
          <>
            <En className="text-2xl font-extrabold text-orange-900">Yesterday → I watched a movie.</En>
            <div className="mt-1 text-slate-500">حدث في الماضي وانتهى → Past Simple</div>
          </>
        ) : (
          <>
            <En className="text-2xl font-extrabold text-cyan-900">Now → I am watching a movie.</En>
            <div className="mt-1 text-slate-500">يحدث الآن → Present Continuous</div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// تمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-orange-600 text-sm font-bold text-white">{n}</span>;
}

// المستوى 1 — حوّل إلى الماضي
function TransformEx({ ex }: { ex: Extract<Exercise12, { type: "transform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const n = commonPrefixLen(it.base, it.answer);
        return (
          <div key={i} className="flex items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
            <Nub n={i + 1} />
            <En className="text-xl font-bold text-slate-500">{it.base}</En>
            <span className="text-slate-300">→</span>
            {show[i] ? (
              <En className="tada text-xl font-extrabold text-emerald-700">
                {it.answer.slice(0, n)}
                <span className="rounded bg-orange-200/70 px-0.5 text-orange-900">{it.answer.slice(n)}</span>
              </En>
            ) : (
              <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">أظهر</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

// المستوى 2 — Regular / Irregular
function ClassifyEx({ ex }: { ex: Extract<Exercise12, { type: "classify" }> }) {
  const [pick, setPick] = useState<Record<number, "regular" | "irregular">>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.kind;
        return (
          <div key={i} className={`flex flex-wrap items-center gap-3 rounded-3xl border-2 p-4 transition ${c ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <Nub n={i + 1} />
            <En className="text-xl font-bold text-slate-800">{it.word}</En>
            <div className="mr-auto flex gap-2">
              {(["regular", "irregular"] as const).map((k) => (
                <button
                  key={k}
                  onClick={() => setPick((p) => ({ ...p, [i]: k }))}
                  className={`rounded-xl border-2 px-4 py-1.5 font-en text-sm font-bold transition ${c === k ? (k === it.kind ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {k === "regular" ? "Regular" : "Irregular"}
                </button>
              ))}
            </div>
            {c && <span className={`w-full pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? `✓ ${it.word} فعل ${it.kind === "regular" ? "منتظم" : "غير منتظم"}` : `✕ ${it.word} فعل ${it.kind === "regular" ? "منتظم" : "غير منتظم"}`}</span>}
          </div>
        );
      })}
    </div>
  );
}

// المستوى 3 — أكمل الجملة
function FillEx({ ex }: { ex: Extract<Exercise12, { type: "fill" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <Nub n={i + 1} />
          <En className="text-lg font-bold text-slate-800">{it.stem}</En>
          <span className="rounded-full bg-slate-100 px-2 py-1 font-en text-xs font-bold text-slate-500">({it.hint})</span>
          {it.ar && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">{it.ar}</span>}
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

// المستوى 4 و7 — اختر
function ChooseEx({ ex }: { ex: Extract<Exercise12, { type: "choose" }> }) {
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
              {it.ar && <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">{it.ar}</span>}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
                  {o}
                </button>
              ))}
            </div>
            {c !== undefined && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>💡 {it.why}</div>}
          </div>
        );
      })}
    </div>
  );
}

// المستوى 5 — اكتشف الخطأ
function FixEx({ ex }: { ex: Extract<Exercise12, { type: "fix" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
          <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
          {show[i] ? (
            <div className="tada flex flex-wrap items-center gap-2">
              <En className="text-lg font-extrabold text-emerald-700">→ {it.correct}</En>
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

// المستوى 6 — لماذا؟
function WhyEx({ items }: { items: Why12Item[] }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <Nub n={i + 1} />
            <div className="min-w-0 flex-1">
              <div className="grid gap-2 md:grid-cols-2">
                <div dir="ltr" className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-center">
                  <En className="font-bold text-slate-700">{it.en1}</En>
                </div>
                <div dir="ltr" className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3 text-center">
                  <En className="font-bold text-orange-800">{it.en2}</En>
                </div>
              </div>
              <div className="mt-2 font-bold text-slate-700">{it.q}</div>
              {show[i] ? (
                <div className="tada mt-2 rounded-2xl bg-emerald-50 p-3 text-sm font-bold leading-relaxed text-emerald-800 border-2 border-emerald-200">
                  💡 {it.a}
                </div>
              ) : (
                <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mt-3 rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">أظهر السبب 💡</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// المستوى 8 — IQ200
function IQEx({ ex }: { ex: Extract<Exercise12, { type: "iq" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [showText, setShowText] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it: IQ12Item, i) => {
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
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-orange-600 text-sm font-bold text-white">{i + 1}</span>
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

// المستوى 9 — Grammar Detective
function Detective() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return (
    <Frame mascot="🕵️" badge="المستوى 9" title="Grammar Detective" lead="اقرأ النص التالي بعناية، ثم استخرج المطلوب:">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <En className="block text-lg font-bold leading-relaxed text-slate-800">{GRAMMAR_DETECTIVE_PASSAGE}</En>
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

// المستوى 10 — تحدي الزمنين
function PairsEx({ ex }: { ex: Extract<Exercise12, { type: "pairs" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-500 text-sm font-bold text-white">{i + 1}</span>
            <div className="flex-1">
              <div className="grid gap-2 md:grid-cols-2">
                <div dir="ltr" className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-center">
                  <En className="font-bold text-slate-700">{it.present}</En>
                  <div className="mt-1 text-xs font-bold text-slate-400">Present</div>
                </div>
                <div dir="ltr" className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3 text-center">
                  <En className="font-bold text-orange-800">{it.past}</En>
                  <div className="mt-1 text-xs font-bold text-orange-500">Past</div>
                </div>
              </div>
              {show[i] ? (
                <div className="tada mt-2 rounded-2xl bg-emerald-50 p-3 text-sm font-bold leading-relaxed text-emerald-800 border-2 border-emerald-200">💡 {it.a}</div>
              ) : (
                <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mt-3 rounded-xl bg-amber-500 px-4 py-1.5 text-sm font-bold text-white">أشرح الفرق 💡</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// المستوى 11 — قصة Mia
function StoryFill() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);
  const shownCount = Object.values(revealed).filter(Boolean).length;
  const segments = MIA_STORY.withBlanks.split("_______");
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
        <En className="block text-lg font-bold leading-loose text-slate-800">
          {segments.map((seg, i) => (
            <span key={i}>
              {seg}
              {i < MIA_STORY.blanks.length &&
                (showAll || revealed[i] ? (
                  <span key={i} className="tada mx-0.5 inline-block rounded-lg bg-emerald-200/80 px-1.5 font-black text-emerald-900">{MIA_STORY.blanks[i].past}</span>
                ) : (
                  <button
                    onClick={() => setRevealed((r) => ({ ...r, [i]: true }))}
                    className="mx-0.5 inline-block min-w-[3.5rem] rounded-lg border-2 border-dashed border-orange-400 bg-white px-2 py-0.5 align-middle text-sm font-bold text-orange-600 hover:bg-orange-100"
                  >
                    {MIA_STORY.blanks[i].base}?
                  </button>
                ))}
            </span>
          ))}
        </En>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-slate-600">الأفعال الأساسية — اضغط كل فجوة لتحويله:</span>
          {MIA_STORY.blanks.map((b, i) => (
            <span key={i} className={`rounded-full border-2 px-3 py-1 font-en text-xs font-bold ${showAll || revealed[i] ? "border-emerald-300 bg-emerald-100 text-emerald-800" : "border-slate-200 bg-white text-slate-500"}`}>
              {b.base} → {showAll || revealed[i] ? b.past : "?"}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => setRevealed(Object.fromEntries(MIA_STORY.blanks.map((_, i) => [i, true])))} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
            حوّلها كلها ({shownCount}/{MIA_STORY.blanks.length})
          </button>
          <button onClick={() => setShowAll(true)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">أظهر القصة كاملة</button>
        </div>
      </div>
      {showAll && (
        <div className="tada rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="mb-2 font-bold text-emerald-800">القصة كاملة:</div>
          <En className="block text-lg font-bold leading-loose text-emerald-900">{MIA_STORY.full}</En>
        </div>
      )}
    </div>
  );
}

// تحدي الأستاذ
function TeacherChallenge() {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="font-head text-lg font-bold text-amber-900">الشروط:</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {TEACHER_CHALLENGE.conditions.map((c) => (
            <div key={c} className="flex items-center gap-2 rounded-2xl border-2 border-amber-100 bg-white px-3 py-2 text-sm font-bold text-slate-700">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-400 text-xs text-white">✓</span>
              <LatinRuns text={c} />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border-2 border-amber-100 bg-white p-3">
          <div className="text-sm font-bold text-amber-800">مثال ترتيب فقط (لا تنسخ أحداث الأمثلة):</div>
          <div dir="ltr" className="mt-1 flex flex-wrap gap-2">
            {TEACHER_CHALLENGE.sequence.map((s) => (
              <span key={s} className="rounded-full bg-amber-100 px-3 py-1 font-en text-sm font-bold text-amber-800">{s}</span>
            ))}
          </div>
        </div>
        <textarea
          dir="ltr"
          rows={8}
          placeholder={"First...\nThen...\nAfter that...\nLater...\nFinally..."}
          className="mt-4 w-full rounded-2xl border-2 border-slate-200 bg-white p-3 font-en text-sm leading-relaxed focus:border-amber-400 focus:outline-none"
        />
        <button onClick={() => setShowModel((v) => !v)} className="mt-3 rounded-xl bg-amber-500 px-5 py-2 text-sm font-bold text-white">
          {showModel ? "إخفاء النموذج المقترح" : "أظهر نموذجًا مقترحًا (لا تنسخه)"}
        </button>
        {showModel && (
          <div className="tada mt-3 rounded-2xl border-2 border-amber-200 bg-white p-4">
            <En className="block space-y-1 text-sm font-bold leading-relaxed text-slate-700">
              {TEACHER_CHALLENGE.model.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </En>
            <div className="mt-2 text-xs font-bold text-amber-700">{TEACHER_CHALLENGE.modelNote}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// شرائح ثابتة
// ============================================================

const COVER_PLAN = [
  "① ما معنى Past Simple؟",
  "② متى نستخدمه؟",
  "③ كيف نعرف أن الحدث في الماضي؟",
  "④ الكلمات الدالة على الماضي.",
  "⑤ الأفعال المنتظمة Regular Verbs.",
  "⑥ الأفعال غير المنتظمة Irregular Verbs.",
  "⑦ الفرق بين الحاضر والماضي.",
  "⑧ كيف نكوّن الجملة المثبتة.",
  "⑨ لماذا لا تتغير الأفعال مع He / She / It في الماضي؟",
  "⑩ قواعد إضافة -ed بالتفصيل.",
  "⑪ أهم الأفعال غير المنتظمة.",
  "⑫ أخطاء الطلاب الشائعة.",
  "⑬ تمارين من السهل إلى IQ200.",
];

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(234,88,12,0.32)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-orange-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-rose-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">📘</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-gradient-to-l from-orange-600 to-rose-600 px-5 py-2 text-base font-bold text-white">الدرس الثاني عشر</div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">الماضي البسيط</h1>
        <p className="pop pop-3 mt-2 text-2xl font-black text-orange-600">
          <En className="font-en">Past Simple</En>
        </p>
        <div className="pop pop-4 mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 border-2 border-amber-200">
          <span>🔥</span>
          <span className="text-sm font-bold text-amber-800">IQ200 — كيف نتحدث عن شيء حدث وانتهى؟</span>
        </div>
        <div className="pop pop-5 mt-6 max-w-xl mx-auto space-y-3 rounded-3xl border-2 border-slate-100 bg-slate-50 p-5 text-right">
          <div className="text-sm font-bold text-slate-600">ممتاز جدًا! 👏 وصلنا الآن إلى مرحلة جديدة في رحلة الأزمنة.</div>
          <div className="text-sm font-bold text-slate-700">حتى الآن تعلمنا:</div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              <En className="rounded-lg bg-slate-800 px-2 py-0.5 text-white">Present Simple</En>
              <span className="text-slate-600">→ العادات والروتين والحقائق</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              <En className="rounded-lg bg-cyan-600 px-2 py-0.5 text-white">Present Continuous</En>
              <span className="text-slate-600">→ ما يحدث الآن أو هذه الفترة</span>
            </div>
          </div>
          <div className="text-sm font-bold text-slate-700">
            لن نقفز مباشرة إلى كل قواعد <En className="font-extrabold text-orange-700">Past Simple</En> — سنبدأ بالأساس بطريقة واسعة جدًا، ونبني عليه في الدروس القادمة خطوة خطوة. اليوم سنفهم:
          </div>
        </div>
        <div className="pop pop-6 mt-4 grid max-w-2xl mx-auto grid-cols-1 gap-1.5 text-right sm:grid-cols-2">
          {COVER_PLAN.map((x, i) => (
            <div key={i} className={`pop pop-${Math.min((i % 6) + 1, 6)} flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700`}>
              <LatinRuns text={x} />
            </div>
          ))}
        </div>
        <p className="pop mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "تفهم معنى [[Past Simple]].",
    "تعرف متى تستخدمه.",
    "تميز الماضي عن الحاضر.",
    "تستخدم [[yesterday]] و[[last]] و[[ago]] وغيرها.",
    "تحول الأفعال المنتظمة إلى الماضي.",
    "تعرف الفرق بين [[regular]] و[[irregular verbs]].",
    "تستخدم الماضي مع [[I / You / He / She / It / We / They]].",
    "تعرف أن الفعل الماضي لا يأخذ s مع [[He / She / It]].",
    "تكتشف الأخطاء في الجمل الماضية.",
    "تبدأ بحفظ مجموعة مهمة من الأفعال غير المنتظمة.",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="أهداف الدرس" lead="بعد هذا الدرس يجب أن تستطيع أن:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-orange-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function PairRow({ base, past }: { base: string; past: string }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-3 py-2">
      <En className="font-bold text-slate-500">{base}</En>
      <span className="text-orange-500">→</span>
      <En className="font-extrabold text-emerald-700">{past}</En>
    </div>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس — Past Simple" lead="نستخدمه لحدث: حدث في الماضي وانتهى.">
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="font-head text-lg font-bold text-violet-800">الكلمات الدالة</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {SUMMARY12.signals.map((w) => (
            <span key={w} dir="ltr" className="ltr font-en rounded-xl border-2 border-violet-200 bg-white px-3 py-1.5 text-sm font-extrabold text-violet-700">{w}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="font-head text-lg font-bold text-emerald-800">الأفعال المنتظمة — غالبًا: <En>verb + ed</En></div>
          <div className="mt-2 grid gap-1.5">
            {SUMMARY12.regular.map((v) => <PairRow key={v.base} base={v.base} past={v.past} />)}
          </div>
          <div className="mt-3 text-sm font-bold text-emerald-800">الفعل المنتهي بـ e — نضيف d:</div>
          <div className="mt-1.5 grid gap-1.5">
            {SUMMARY12.endE.map((v) => <PairRow key={v.base} base={v.base} past={v.past} />)}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
          <div className="font-head text-lg font-bold text-amber-800">قواعد y</div>
          <div className="mt-1 text-sm font-bold text-amber-700"><En>consonant + y</En> → <En>y → ied</En>:</div>
          <div className="mt-1.5 grid gap-1.5">
            {SUMMARY12.consonantY.map((v) => <PairRow key={v.base} base={v.base} past={v.past} />)}
          </div>
          <div className="mt-3 text-sm font-bold text-amber-700"><En>vowel + y</En> — نحتفظ بـ y:</div>
          <div className="mt-1.5 grid gap-1.5">
            {SUMMARY12.vowelY.map((v) => <PairRow key={v.base} base={v.base} past={v.past} />)}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
        <div className="font-head text-lg font-bold text-orange-800">الأفعال غير المنتظمة — لا تتبع قاعدة ed</div>
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {SUMMARY12.irregular.map((v) => (
            <div key={v.base} dir="ltr" style={{ direction: "ltr" }} className="flex items-center justify-center gap-1.5 rounded-xl border-2 border-orange-200 bg-white px-2 py-2">
              <En className="text-sm font-bold text-slate-500">{v.base}</En>
              <span className="text-orange-500">→</span>
              <En className="text-sm font-extrabold text-orange-800">{v.past}</En>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function KeyRule() {
  return (
    <Frame mascot="⭐" step="⭐" title="أهم قاعدة في الدرس" lead="لا نضيف s إلى الفعل الماضي.">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
          <div className="font-head text-lg font-bold text-slate-700">في Present Simple:</div>
          <div className="mt-3 space-y-2">
            {KEY_RULE.present.map((s) => (
              <div key={s} dir="ltr" className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-center">
                <En className="text-lg font-bold text-slate-700">{s}</En>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
          <div className="font-head text-lg font-bold text-orange-800">لكن في Past Simple:</div>
          <div className="mt-3 space-y-2">
            {KEY_RULE.past.map((s) => (
              <div key={s} dir="ltr" className="rounded-xl border-2 border-orange-200 bg-white px-3 py-2 text-center">
                <En className="text-lg font-extrabold text-orange-800">{s}</En>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span dir="ltr" className="ltr font-en rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-5 py-2 text-xl font-black text-emerald-800">{KEY_RULE.ok} ✅</span>
        <span dir="ltr" className="ltr font-en rounded-2xl border-2 border-rose-300 bg-rose-50 px-5 py-2 text-xl font-black text-rose-700 line-through decoration-rose-400">{KEY_RULE.bad} ❌</span>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="font-head text-lg font-bold text-violet-800">🧠 قاعدة IQ200</div>
        <p className="mt-1 text-sm font-bold text-slate-600">عندما ترى جملة، لا تنظر إلى الفعل وحده. ابحث أولًا عن الزمن.</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {KEY_RULE.iq.map((x) => (
            <div key={x.signal} className="flex items-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-3 py-2">
              <En className="rounded-lg bg-violet-600 px-2.5 py-1 text-sm font-black text-white">{x.signal}</En>
              <span className="text-slate-400">→</span>
              <span className="text-sm font-bold text-violet-800">{x.tense}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border-2 border-violet-100 bg-white p-3 text-center text-sm font-bold text-slate-700">
          {KEY_RULE.question}
        </div>
      </div>
      <Note emoji="🚀" text={KEY_RULE.nextLesson} />
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-rose-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">🎓</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">أحسنت — خطوتك الأولى الحقيقية في الماضي</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">
          الآن تعرف: حدث في الماضي وانتهى ← <En className="font-extrabold text-orange-300">Past Simple</En> — المنتظم بإضافة ed، وغير المنتظم يُحفظ، والماضي لا يأخذ s.
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

// ============================================================
// العرض
// ============================================================

function BlockView({ b }: { b: Block12 }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "list":
      return (
        <div className="grid gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4">
          {b.items.map((x, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-orange-100 text-sm font-bold text-orange-700">{i + 1}</span>
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
    case "coreIdea":
      return <CoreIdea />;
    case "chessCompare":
      return <ChessCompare />;
    case "signalWall":
      return <SignalWall />;
    case "agoMachine":
      return <AgoMachine />;
    case "lastAgo":
      return <LastAgo />;
    case "typeSplit":
      return <TypeSplit />;
    case "edBasic":
      return <EdBasic />;
    case "edPairs":
      return <EdPairs rule={b.rule} />;
    case "edMachine":
      return <EdMachine />;
    case "subjectGrid":
      return <SubjectGrid />;
    case "playsCompare":
      return <PlaysCompare />;
    case "irregFlip":
      return <IrregFlip />;
    case "irregTable":
      return <IrregTable />;
    case "readTrick":
      return <ReadTrick />;
    case "timeline":
      return <TimelineVis />;
  }
}

function SlideView({ s, onExit }: { s: Slide12; onExit: () => void }) {
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
          {ex.type === "transform" && <TransformEx ex={ex} />}
          {ex.type === "classify" && <ClassifyEx ex={ex} />}
          {ex.type === "fill" && <FillEx ex={ex} />}
          {ex.type === "choose" && <ChooseEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "why" && <WhyEx items={ex.items} />}
          {ex.type === "iq" && <IQEx ex={ex} />}
          {ex.type === "pairs" && <PairsEx ex={ex} />}
          {ex.type === "storyFill" && <StoryFill />}
          {ex.type === "teacher" && <TeacherChallenge />}
        </Frame>
      );
    }
    case "detective":
      return <Detective />;
    case "summary":
      return <Summary />;
    case "keyRule":
      return <KeyRule />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت تحكمك في Past Simple.">
          <FinalQuiz lesson={12} accent="bg-orange-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(s: Slide12): string {
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
  الفكرة: "text-orange-600",
  "الفكرة الأساسية": "text-orange-600",
  "الكلمات الدالة": "text-violet-600",
  "الأفعال المنتظمة": "text-emerald-600",
  "الأفعال غير المنتظمة": "text-amber-600",
  "أخطاء وخط زمني": "text-rose-600",
  التمارين: "text-orange-600",
  التحديات: "text-amber-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 12 · الماضي البسيط</div>
        <En className="text-xs font-semibold text-slate-400">Past Simple</En>
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
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-orange-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
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

export default function Lesson12({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l12-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fdf6f2] text-slate-800">
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
                <div className="h-full rounded-full bg-gradient-to-l from-orange-500 via-rose-400 to-amber-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>
          <main id="l12-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
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
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-orange-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-orange-700 disabled:opacity-30">
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
