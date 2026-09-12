import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SUBJ10,
  VERBS10,
  PAST_WORDS,
  PAST_SCENES,
  IQ10,
  USAGE10_AR,
  ROLE10_AR,
  pastOf,
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
// النمط F — كهرماني/زمردي: الفاعل سماوي، was/were كهرماني، الفعل ماضي زمردي، المفعول نيلي
// ============================================================
const RS: Record<Role10, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  be: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-600", text: "text-amber-700" },
  v: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", solid: "bg-emerald-600", text: "text-emerald-700" },
  aux: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-600", text: "text-violet-700" },
  nt: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-500", text: "text-rose-700" },
  o: { chip: "bg-indigo-100 border-indigo-300 text-indigo-900", solid: "bg-indigo-500", text: "text-indigo-700" },
  adv: { chip: "bg-orange-100 border-orange-300 text-orange-900", solid: "bg-orange-500", text: "text-orange-700" },
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
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
            📌 <Mixed text={note} />
          </span>
        )}
      </div>
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; tip?: string }) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(245,158,11,0.28)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-amber-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-amber-700 to-indigo-700 p-4 text-white">
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
// تفاعليات
// ============================================================

function WasTabs() {
  const [pi, setPi] = useState(0);
  const s = SUBJ10[pi];
  const verbs = VERBS10.slice(0, 5);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-wrap gap-1.5">
        {SUBJ10.map((x, i) => (
          <button key={x.en} onClick={() => setPi(i)} className={`rounded-xl border-2 px-3 py-1.5 font-en font-bold transition active:scale-95 ${i === pi ? "border-transparent bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"}`}>
            {x.en}
          </button>
        ))}
      </div>
      <div key={pi} className="pop mt-4 grid gap-2">
        {verbs.map((v) => (
          <div key={v.base} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
            <PartsLine parts={[{ text: s.en, role: "s" }, { text: s.was, role: "be" }]} size="sm" label={false} />
            <span className="text-sm text-slate-400">+ فعل / صفة</span>
            <span className="mr-auto text-sm text-slate-500">{s.ar} — نستخدم {s.was}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-amber-700">
        {s.en} ← نستخدم <En className="font-extrabold">{s.was}</En>
      </div>
    </div>
  );
}

function WasMnemonic() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="font-head text-xl font-bold text-amber-800">was</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          {["I", "He", "She", "It"].map((x) => (
            <span key={x} className="font-en rounded-xl bg-amber-600 px-3 py-1 text-lg font-extrabold text-white">
              {x}
            </span>
          ))}
        </div>
        <En className="mt-3 block text-lg font-bold text-slate-700">She was tired yesterday.</En>
        <div className="mt-1 text-sm text-slate-500">كانت متعبة أمس.</div>
        <div className="mt-2 text-sm font-bold text-amber-700">مفرد ← was</div>
      </div>
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <div className="font-head text-xl font-bold text-indigo-800">were</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          {["You", "We", "They"].map((x) => (
            <span key={x} className="font-en rounded-xl bg-indigo-600 px-3 py-1 text-lg font-extrabold text-white">
              {x}
            </span>
          ))}
        </div>
        <En className="mt-3 block text-lg font-bold text-slate-700">They were happy last night.</En>
        <div className="mt-1 text-sm text-slate-500">كانوا سعداء الليلة الماضية.</div>
        <div className="mt-2 text-sm font-bold text-indigo-700">جمع / مخاطب ← were</div>
      </div>
    </div>
  );
}

function PastTabs() {
  const [t, setT] = useState<PastRule | "irregular">("add-ed");
  const isIrregular = t === "irregular";
  const rows = isIrregular ? VERBS10.filter((v) => v.kind === "irregular").slice(0, 9) : VERBS10.filter((v) => v.rule === t).slice(0, 6);
  const info: Record<string, { title: string; note: string }> = {
    "add-ed": { title: "معظم الأفعال ← أضف ed", note: "play → played · watch → watched · work → worked" },
    "add-d": { title: "ينتهي بـ e ← أضف d فقط", note: "live → lived · like → liked · close → closed" },
    "y-ied": { title: "ساكن + y ← احذف y وضع ied", note: "study → studied · cry → cried · carry → carried" },
    double: { title: "حرف ساكن مضاعف ← ضاعف الحرف الأخير", note: "stop → stopped · plan → planned · drop → dropped" },
    irregular: { title: "أفعال شاذة ← لا قاعدة، تحفظ كما هي", note: "go → went · eat → ate · see → saw · have → had" },
  };
  const cur = info[t as string];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {(["add-ed", "add-d", "y-ied", "double", "irregular"] as const).map((x) => (
          <button key={x} onClick={() => setT(x as any)} className={`rounded-xl border-2 px-3 py-2 font-en text-xs font-extrabold transition active:scale-95 md:text-sm ${t === x ? "border-transparent bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
            {x === "add-ed" ? "+ ed" : x === "add-d" ? "+ d" : x === "y-ied" ? "y → ied" : x === "double" ? "×2 + ed" : "شاذ"}
          </button>
        ))}
      </div>
      <div key={t} className="pop">
        <div className="mb-3 text-center font-bold text-slate-700">{cur.title}</div>
        <div className={`grid gap-2 ${isIrregular ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {rows.map((v) => (
            <div key={v.base} dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
              <En className="text-lg font-bold text-slate-600">{v.base}</En>
              <span className="text-amber-500">→</span>
              <En className="text-lg font-extrabold text-amber-700">{v.past}</En>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-amber-50 p-2.5 text-center text-sm font-bold text-amber-800">{cur.note}</div>
      </div>
    </div>
  );
}

function IrregularGrid() {
  const irregulars = VERBS10.filter((v) => v.kind === "irregular").slice(0, 12);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-3 text-center text-sm font-bold text-slate-600">اضغط البطاقة لتكشف الماضي — احفظ الشواذ ككلمات جديدة</div>
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {irregulars.map((v, i) => (
          <button
            key={v.base}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
            className={`rounded-2xl border-2 p-3 text-center transition active:scale-95 ${flipped[i] ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-amber-300"}`}
          >
            <div className="text-xs font-bold text-slate-400">{v.ar}</div>
            <div dir="ltr" className="font-en mt-1 text-lg font-extrabold">
              <span className={flipped[i] ? "text-emerald-700" : "text-slate-800"}>{flipped[i] ? v.past : v.base}</span>
              {!flipped[i] && <span className="mr-1 text-amber-500">→ ?</span>}
            </div>
            <div className="mt-1 text-xs font-bold text-slate-400">{flipped[i] ? `← ${v.base}` : "اضغط للكشف"}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PastScenes() {
  const [i, setI] = useState(0);
  const sc = PAST_SCENES[i];
  const subj = SUBJ10.find((s) => s.en === sc.subj) ?? SUBJ10[0];
  const verbObj = VERBS10.find((v) => v.base === sc.base);
  const pastForm = verbObj?.past ?? pastOf(sc.base);
  // Determine color: if subj was is be, verb is v
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-wrap gap-1.5">
        {PAST_SCENES.map((s, si) => (
          <button
            key={si}
            onClick={() => setI(si)}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${si === i ? "border-transparent bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"}`}
          >
            {s.emoji} {s.subj}
          </button>
        ))}
      </div>
      <div key={i} className="pop mt-4 rounded-3xl bg-white p-5 text-center">
        <div className="text-4xl">{sc.emoji}</div>
        <div className="mt-2 flex justify-center">
          <PartsLine
            parts={[{ text: subj.en, role: "s" }, { text: pastForm, role: "v" }, ...(sc.o ? [{ text: sc.o, role: "o" as Role10 }] : [])]}
            size="lg"
            label={false}
          />
        </div>
        <div className="mt-2 text-lg text-slate-500">{sc.ar}</div>
        <div className="mt-2 text-xs font-bold text-amber-600">ظرف الماضي يثبت أن الحدث انتهى: yesterday / last night / last week</div>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-amber-700">📖 كل جملة تتحدث عن وقت انتهى — ليس الآن</div>
    </div>
  );
}

function SignalWords() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {PAST_WORDS.map((w, i) => (
        <span key={w.en} className="rounded-2xl border-2 border-amber-200 bg-white px-3.5 py-2 shadow-sm anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
          <En className="text-lg font-extrabold text-amber-700">{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

function VsPresent() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="mb-2 text-sm font-bold text-slate-500">Present Simple · عادة / حقيقة عامة</div>
        <En className="text-2xl font-extrabold text-slate-700">I play football every day.</En>
        <div className="mt-1 text-slate-500">أنا ألعب كرة القدم كل يوم (كعادة).</div>
        <div className="mt-2 text-xs font-bold text-slate-400">every day → عادة</div>
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="mb-2 text-sm font-bold text-amber-700">Past Simple · حدث وانتهى</div>
        <En className="text-2xl font-extrabold text-slate-800">I played football yesterday.</En>
        <div className="mt-1 text-slate-600">أنا لعبت كرة القدم أمس (وانتهى).</div>
        <div className="mt-2 text-xs font-bold text-amber-600">yesterday → انتهى</div>
      </div>
    </div>
  );
}

function DidTransform() {
  const [mode, setMode] = useState<"aff" | "neg" | "q">("aff");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        {([
          ["aff", "الإثبات"],
          ["neg", "النفي"],
          ["q", "السؤال"],
        ] as const).map(([k, label]) => (
          <button key={k} onClick={() => setMode(k)} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition active:scale-95 ${mode === k ? "border-transparent bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
            {label}
          </button>
        ))}
      </div>
      <div key={mode} className="pop rounded-3xl bg-white p-6 text-center">
        {mode === "aff" && (
          <>
            <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-en rounded-xl bg-sky-100 px-3 py-1.5 text-2xl font-extrabold text-sky-800">She</span>
              <span className="font-en rounded-xl bg-emerald-600 px-3 py-1.5 text-2xl font-extrabold text-white">played</span>
              <span className="font-en rounded-xl bg-indigo-50 px-3 py-1.5 text-lg font-bold text-slate-700">football.</span>
            </div>
            <div className="mt-3 font-bold text-slate-600">هي لعبت كرة القدم. — الفعل يحمل الماضي ed</div>
          </>
        )}
        {mode === "neg" && (
          <>
            <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
              <span className="font-en rounded-xl bg-sky-100 px-3 py-1.5 text-2xl font-extrabold text-sky-800">She</span>
              <span className="tada font-en rounded-xl bg-rose-500 px-3 py-1.5 text-2xl font-extrabold text-white">didn't</span>
              <span className="font-en rounded-xl bg-slate-100 px-3 py-1.5 text-2xl font-extrabold text-slate-800">play</span>
              <span className="font-en rounded-xl bg-indigo-50 px-3 py-1.5 text-lg font-bold text-slate-700">football.</span>
            </div>
            <div className="mt-3 font-bold text-slate-600">هي لم تلعب — didn&apos;t حملت الماضي، الفعل عاد أساسي play</div>
            <div className="mt-2 text-sm font-bold text-rose-600">didn&apos;t + play (وليس played) ✅</div>
          </>
        )}
        {mode === "q" && (
          <>
            <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
              <span className="tada font-en rounded-xl bg-violet-600 px-3 py-1.5 text-2xl font-extrabold text-white">Did</span>
              <span className="font-en rounded-xl bg-sky-100 px-3 py-1.5 text-2xl font-extrabold text-sky-800">she</span>
              <span className="font-en rounded-xl bg-slate-100 px-3 py-1.5 text-2xl font-extrabold text-slate-800">play</span>
              <span className="font-en rounded-xl bg-indigo-50 px-3 py-1.5 text-lg font-bold text-slate-700">football?</span>
            </div>
            <div className="mt-3 font-bold text-slate-600">هل لعبت كرة القدم؟ — Did في البداية، الفعل أساسي</div>
            <div className="mt-2 text-sm font-bold text-violet-600">Did + play (وليس played) ✅</div>
          </>
        )}
      </div>
    </div>
  );
}

function ShortAnswers() {
  const rows = [
    { q: "Did he play football?", yes: "Yes, he did.", no: "No, he didn't." },
    { q: "Did she eat pizza?", yes: "Yes, she did.", no: "No, she didn't." },
    { q: "Was he tired?", yes: "Yes, he was.", no: "No, he wasn't." },
    { q: "Were they happy?", yes: "Yes, they were.", no: "No, they weren't." },
  ];
  return (
    <div className="grid gap-2.5 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.q} className="rounded-2xl bg-white p-3.5">
          <En className="block text-lg font-extrabold text-slate-800">{r.q}</En>
          <div className="mt-2 flex flex-wrap gap-2">
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

// ============================================================
// التمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{n}</span>;
}

function ChooseEx({ ex }: { ex: Extract<Exercise10, { type: "choose" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-3.5 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Nub n={i + 1} />
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex items-center gap-1.5">
                <En className="text-xl font-bold text-slate-800">{it.s}</En>
                <span className={`inline-grid h-9 min-w-16 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-lg font-extrabold ${c !== undefined ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>
                  {c !== undefined ? it.opts[c] : "___"}
                </span>
                <En className="text-xl font-bold text-slate-800">{it.o ? ` ${it.o}` : ""}</En>
              </div>
            </div>
            <div className="mt-1.5 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-1.5 pr-11">
              {it.opts.map((o, oi) => (
                <button
                  key={o + oi}
                  onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-lg border-2 px-3.5 py-1 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
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

function WasChooseEx({ ex }: { ex: Extract<Exercise10, { type: "wasChoose" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-3.5 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Nub n={i + 1} />
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex items-center gap-1.5">
                <En className="text-xl font-bold text-slate-800">{it.s}</En>
                <span className={`inline-grid h-9 min-w-16 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-lg font-extrabold ${c !== undefined ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>
                  {c !== undefined ? it.opts[c] : "___"}
                </span>
              </div>
            </div>
            <div className="mt-1.5 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-1.5 pr-11">
              {it.opts.map((o, oi) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-lg border-2 px-3.5 py-1 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
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

function PastEx({ ex }: { ex: Extract<Exercise10, { type: "past" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-3.5 text-center transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center justify-center gap-2">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-700">{it.verb}</En>
            </div>
            <div className="mt-2 grid gap-1.5">
              {it.opts.map((o, oi) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-lg border-2 px-2 py-1 font-en text-sm font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {o}
                </button>
              ))}
            </div>
            {c !== undefined && !right && <div className="mt-1.5 text-xs font-bold text-rose-600">✕ الصحيح: {it.opts[it.answer]}</div>}
          </div>
        );
      })}
    </div>
  );
}

function SignalEx({ ex }: { ex: Extract<Exercise10, { type: "signal" }> }) {
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
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">💭 {it.ar}</span>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
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
            <button
              key={i}
              disabled={placed.includes(i) || reveal}
              onClick={() => setPlaced((p) => [...p, i])}
              className="rounded-xl border-2 border-slate-300 bg-white px-3.5 py-1.5 font-en text-lg font-bold text-slate-800 transition hover:border-amber-400 active:scale-95 disabled:opacity-25"
            >
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
          <button
            onClick={() => {
              setPlaced([]);
              setReveal(false);
            }}
            className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200"
          >
            ↺
          </button>
        </div>
      </div>
      <div
        key={bad ? "b" + placed.join() : "s"}
        dir="ltr"
        style={{ direction: "ltr" }}
        className={`ltr-row mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-2.5 ${finished ? "border-emerald-300 bg-white" : bad ? "shake border-rose-300 bg-white" : "border-slate-300 bg-slate-50"}`}
      >
        {shown.length === 0 && <span className="w-full text-center text-sm text-slate-400">اضغط الكلمات بالترتيب الصحيح</span>}
        {shown.map((w, i) => (
          <button
            key={i}
            onClick={() => !reveal && setPlaced((p) => p.filter((_, j) => j !== i))}
            className={`rounded-xl border-2 px-3.5 py-1.5 font-en text-lg font-bold ${finished ? "border-emerald-300 bg-emerald-50 text-emerald-800" : bad ? "border-rose-300 bg-rose-50 text-rose-700" : "border-slate-300 bg-white text-slate-800"}`}
          >
            {w}
          </button>
        ))}
        {shown.length > 0 && <span className="font-en text-xl font-bold text-slate-300">{item.q ? "?" : "."}</span>}
      </div>
      {finished && <div className="tada mt-2 font-bold text-emerald-700">🎉 {item.ar}</div>}
      {bad && <div className="mt-2 text-sm font-bold text-rose-600">✕ ليس بعد — راجع ترتيب الفاعل والفعل</div>}
    </div>
  );
}

function UsageEx({ ex }: { ex: Extract<Exercise10, { type: "usage" }> }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  const opts: ("past" | "present")[] = ["past", "present"];
  const emoji = { past: "📖", present: "🔁" };
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-800">{it.en}</En>
              <span className="text-sm text-slate-400">{it.ar}</span>
            </div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {opts.map((o) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: o }))}
                  className={`rounded-xl border-2 px-4 py-1.5 text-sm font-bold transition active:scale-95 ${c === o ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {emoji[o]} {USAGE10_AR[o]}
                </button>
              ))}
            </div>
            {c && !right && <div className="mt-1.5 pr-11 text-xs font-bold text-rose-600">✕ الصحيح: {USAGE10_AR[it.answer]}</div>}
          </div>
        );
      })}
    </div>
  );
}

function IQ() {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <Frame mascot="🏆" badge="IQ200" title="تحدي IQ200" lead="صحّح الجمل — ولا تكتفِ بالتصحيح، فكّر لماذا:">
      <div className="grid gap-2.5">
        {IQ10.map((it, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{i + 1}</span>
            <En className="text-xl font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
            {show[i] ? (
              <div className="tada flex flex-wrap items-center gap-2">
                <En className="text-xl font-extrabold text-emerald-700">→ {it.correct}</En>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">💡 {it.why}</span>
              </div>
            ) : (
              <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-slate-700">
                فكّر ثم اكشف 🔍
              </button>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Builder() {
  const [si, setSi] = useState(0);
  const [vi, setVi] = useState(3);
  const [oi, setOi] = useState(0);
  const objs = [
    { en: "my grandmother", ar: "جدتي" },
    { en: "a movie", ar: "فيلمًا" },
    { en: "football", ar: "كرة القدم" },
    { en: "dinner", ar: "العشاء" },
    { en: "English", ar: "الإنجليزية" },
  ];
  const s = SUBJ10[si];
  const v = VERBS10[vi];
  const o = objs[oi];
  // time signals for builder
  const times = ["yesterday", "last night", "two days ago", "last week"];
  const [ti, setTi] = useState(0);
  return (
    <Frame mascot="🎨" badge="تحدي إضافي" title="كوّن جملة عن نفسك في الماضي" lead="بدّل العناصر وركّب جملة صحيحة بصيغة Past Simple.">
      <div className="grid gap-3 sm:grid-cols-4">
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">الفاعل</div>
          <select value={si} onChange={(e) => setSi(Number(e.target.value))} className="font-en w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 font-bold text-slate-700">
            {SUBJ10.map((x, i) => (
              <option key={x.en} value={i}>
                {x.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">الفعل</div>
          <select value={vi} onChange={(e) => setVi(Number(e.target.value))} className="font-en w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 font-bold text-slate-700">
            {VERBS10.map((x, i) => (
              <option key={x.base} value={i}>
                {x.base} → {x.past}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">المفعول به</div>
          <select value={oi} onChange={(e) => setOi(Number(e.target.value))} className="font-en w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 font-bold text-slate-700">
            {objs.map((x, i) => (
              <option key={x.en} value={i}>
                {x.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="mb-1.5 text-xs font-bold text-slate-400">الزمن</div>
          <select value={ti} onChange={(e) => setTi(Number(e.target.value))} className="font-en w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 font-bold text-slate-700">
            {times.map((x, i) => (
              <option key={x} value={i}>
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5 text-center">
        <PartsLine parts={[{ text: s.en, role: "s" }, { text: v.past, role: "v" }, { text: o.en, role: "o" }, { text: times[ti], role: "adv" }]} size="lg" />
        <div className="mt-2 text-lg text-slate-600">
          {s.ar} {v.ar} {o.ar} {ti === 0 ? "أمس" : ti === 1 ? "الليلة الماضية" : ti === 2 ? "قبل يومين" : "الأسبوع الماضي"}.
        </div>
      </div>
      <div className="mt-3 rounded-2xl bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-700">تذكّر: في النفي والسؤال نعود للأساسي — didn&apos;t + {v.base} / Did + {v.base}</div>
    </Frame>
  );
}

// ============================================================
// شرائح ثابتة
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(245,158,11,0.32)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-amber-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-indigo-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🕰️</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-amber-600 px-5 py-2 text-base font-bold text-white">الدرس العاشر</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">الماضي البسيط</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <En>Past Simple</En>
        </p>
        <div className="pop pop-4 mt-9 flex justify-center">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-5">
            <PartsLine parts={[{ text: "I", role: "s" }, { text: "visited", role: "v" }, { text: "Paris", role: "o" }, { text: "yesterday", role: "adv" }]} size="lg" />
            <div className="mt-2 text-center text-slate-500">زرت باريس أمس.</div>
          </div>
        </div>
        <div className="pop pop-5 mt-6 flex flex-wrap justify-center gap-2">
          {PAST_WORDS.slice(0, 6).map((a) => (
            <span key={a.en} className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
              <En>{a.en}</En> · {a.ar}
            </span>
          ))}
        </div>
        <p className="pop pop-6 mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "فهم معنى [[Past Simple]] ومتى نستخدمه.",
    "تكوين الجملة المثبتة مع الأفعال المنتظمة والشاذة: [[Subject + Verb (past)]].",
    "معرفة الفرق بين [[was / were]] ومتى نستخدم كلًا منهما.",
    "إتقان قواعد إضافة [[ed]] الأربع.",
    "حفظ أهم الأفعال الشاذة: [[go → went · eat → ate · see → saw]].",
    "استخدام كلمات مثل [[yesterday / last week / ago]].",
    "تكوين النفي والسؤال والإجابات القصيرة: [[didn't / Did + base verb]].",
    "التفريق بين [[Present Simple]] و [[Past Simple]].",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="بنهاية الدرس يجب أن يكون الطالب قادرًا على:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس 10" lead="Past Simple نستخدمه للحديث عن شيء حدث وانتهى في الماضي:">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "حدث واحد انتهى", e: "I played yesterday." },
          { t: "عادة قديمة", e: "She lived in Aleppo." },
          { t: "سلسلة أحداث", e: "We woke up, then ate." },
          { t: "مع ago / yesterday", e: "They visited two days ago." },
        ].map((x, i) => (
          <div key={i} className={`pop pop-${i + 1} rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-4`}>
            <div className="font-head text-lg font-bold text-amber-800">{x.t}</div>
            <En className="mt-1 block text-sm font-bold text-slate-700">{x.e}</En>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="font-head text-lg font-bold text-emerald-800">فعل عادي + ed</div>
          <En className="mt-2 block text-lg font-bold text-slate-700">I played yesterday.</En>
          <div className="text-sm text-slate-500">تصريف منتظم</div>
        </div>
        <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-5">
          <div className="font-head text-lg font-bold text-rose-800">فعل شاذ — يحفظ</div>
          <En className="mt-2 block text-lg font-bold text-slate-700">She went yesterday.</En>
          <div className="text-sm text-slate-500">went ليس goed</div>
        </div>
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
          <div className="font-head text-lg font-bold text-amber-800">I / He / She / It + was</div>
          <En className="mt-2 block text-lg font-bold text-slate-700">He was tired.</En>
          <div className="text-sm text-slate-500">You / We / They + were</div>
        </div>
      </div>
      <Note emoji="⭐" text="النفي: [[Subject + didn't + Verb (base)]] — السؤال: [[Did + Subject + Verb (base)?]] — مع [[was/were]] نستخدم [[wasn't / weren't]] و [[Was/Were + Subject?]] — لا نخلط." />
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4 text-center">
        <div className="font-bold text-indigo-800">اختبر نفسك بسرعة</div>
        <div dir="ltr" className="mt-2 flex flex-wrap justify-center gap-2 font-en text-sm font-bold text-slate-700">
          <span>play → played ✓</span>
          <span>·</span>
          <span>go → went ✓</span>
          <span>·</span>
          <span>didn&apos;t go ✓</span>
          <span>·</span>
          <span>Did you go? ✓</span>
        </div>
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-amber-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">🎉</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">أحسنت! أتقنت الماضي البسيط</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">
          أصبحت الآن قادرًا على سرد ما حدث: استخدم <En className="font-bold text-amber-300">Past Simple</En> مع <En className="font-bold text-amber-300">yesterday</En> و<En className="font-bold text-amber-300"> ago</En> بثقة،
          وميّز بين <En className="font-bold text-amber-300">was / were</En> و <En className="font-bold text-amber-300">did / didn&apos;t</En>.
        </p>
        <div className="pop pop-3 mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            جميع الدروس
          </button>
        </div>
        <div className="pop pop-4 mt-4 text-sm text-slate-400">الدروس القادمة ستُضاف قريبًا — واصل التمرّن يوميًا</div>
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
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">{i + 1}</span>
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
    case "wasTabs":
      return <WasTabs />;
    case "wasMnemonic":
      return <WasMnemonic />;
    case "pastTabs":
      return <PastTabs />;
    case "irregularGrid":
      return <IrregularGrid />;
    case "pastScenes":
      return <PastScenes />;
    case "signalWords":
      return <SignalWords />;
    case "vsPresent":
      return <VsPresent />;
    case "didTransform":
      return <DidTransform />;
    case "shortAnswers":
      return <ShortAnswers />;
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
          {ex.type === "choose" && <ChooseEx ex={ex} />}
          {ex.type === "wasChoose" && <WasChooseEx ex={ex} />}
          {ex.type === "past" && <PastEx ex={ex} />}
          {ex.type === "signal" && <SignalEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "order" && <OrderEx ex={ex} />}
          {ex.type === "usage" && <UsageEx ex={ex} />}
        </Frame>
      );
    }
    case "iq":
      return <IQ />;
    case "builder":
      return <Builder />;
    case "summary":
      return <Summary />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت الماضي البسيط.">
          <FinalQuiz lesson={10} accent="bg-amber-600" />
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
  الفكرة: "text-amber-600",
  التكوين: "text-emerald-600",
  القواعد: "text-orange-600",
  الماضي: "text-violet-600",
  "النفي والسؤال": "text-indigo-600",
  التمارين: "text-amber-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 10 · الماضي البسيط</div>
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
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-amber-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
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
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT")) return;
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
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fffaf0] text-slate-800">
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
                <div className="h-full rounded-full bg-gradient-to-l from-amber-500 via-orange-400 to-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
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
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-amber-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-amber-700 disabled:opacity-30">
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
