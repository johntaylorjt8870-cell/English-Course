import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  VERBS6,
  SUBJ6,
  ADVS,
  EVERY_WORDS,
  DAY_STEPS,
  FACTS,
  IQ6,
  WHY_AR,
  ROLE6_AR,
  conjS,
  verbFor,
  type Slide6,
  type Block6,
  type Part6,
  type Role6,
  type Exercise6,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// النمط E — تركواز: الفاعل سماوي، الفعل تركوازي، التكرار فوشيا، المفعول كهرماني
// ============================================================
const RS: Record<Role6, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  v: { chip: "bg-teal-100 border-teal-300 text-teal-900", solid: "bg-teal-600", text: "text-teal-700" },
  adv: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", solid: "bg-fuchsia-500", text: "text-fuchsia-700" },
  o: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700" },
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

function PartsLine({ parts, q, size = "md", label = true }: { parts: Part6[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[p.role].chip} ${sz} font-en font-extrabold leading-tight`}>
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE6_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

/** نص مختلط عربي/إنجليزي: يعزل المقاطع الإنجليزية تلقائيًا */
function Mixed({ text }: { text: string }) {
  return <LatinRuns text={text} />;
}

function SentenceCard({ parts, ar, note, q }: { parts: Part6[]; ar: string; note?: string; q?: boolean }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} q={q} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg text-slate-500">{ar}</span>
        {note && (
          <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
            📌 <Mixed text={note} />
          </span>
        )}
      </div>
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; tip?: string }) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(13,148,136,0.3)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-teal-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-teal-100 px-3.5 py-1.5 text-sm font-bold text-teal-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-700 to-emerald-700 p-4 text-white">
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

function DayTimeline() {
  const [i, setI] = useState(0);
  const st = DAY_STEPS[i];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-wrap gap-1.5">
        {DAY_STEPS.map((d, di) => (
          <button
            key={di}
            onClick={() => setI(di)}
            className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${di === i ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
          >
            {di + 1} · {d.ar}
          </button>
        ))}
      </div>
      <div key={i} className="pop mt-4 rounded-3xl bg-white p-5 text-center">
        <PartsLine
          parts={[{ text: "I", role: "s" }, { text: st.en, role: "v" }, ...(st.time ? [{ text: st.time, role: "o" as Role6 }] : [])]}
          size="lg"
          label={false}
        />
        <div className="mt-2 text-lg text-slate-500">
          أنا {st.ar} {st.time ? st.time.replace("at ", "الساعة ") : ""}.
        </div>
      </div>
      <div className="mt-3 text-center text-sm font-bold text-teal-700">كل هذه الجمل Present Simple لأنها تتكرر كل يوم ✅</div>
    </div>
  );
}

function Ladder() {
  const [i, setI] = useState(0);
  const a = ADVS[i];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-2">
        {ADVS.map((x, xi) => (
          <button key={x.en} onClick={() => setI(xi)} className={`flex items-center gap-3 rounded-2xl border-2 p-2.5 text-right transition ${xi === i ? "border-fuchsia-300 bg-white shadow" : "border-transparent bg-white/60 hover:bg-white"}`}>
            <En className={`w-24 shrink-0 text-lg font-extrabold ${xi === i ? "text-fuchsia-700" : "text-slate-600"}`}>{x.en}</En>
            <span className="w-16 shrink-0 text-sm font-bold text-slate-500">{x.ar}</span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <span className="block h-full rounded-full bg-gradient-to-l from-fuchsia-500 to-teal-500 transition-all duration-500" style={{ width: `${x.pct}%` }} />
            </span>
            <span className="w-12 shrink-0 text-left text-xs font-bold text-slate-400">{x.pct}%</span>
          </button>
        ))}
      </div>
      <div key={i} className="pop mt-4 rounded-2xl bg-white p-4 text-center">
        <En className="text-2xl font-extrabold text-slate-800">{a.ex}</En>
        <div className="mt-1 text-slate-500">{a.exAr}</div>
      </div>
    </div>
  );
}

function EveryWords() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {EVERY_WORDS.map((w, i) => (
        <span key={w.en} className="rounded-2xl border-2 border-teal-200 bg-white px-3.5 py-2 shadow-sm anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
          <En className="text-lg font-extrabold text-teal-700">{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

function Groups() {
  const [g, setG] = useState<0 | 1>(0);
  const subs = g === 0 ? SUBJ6.filter((s) => !s.third) : SUBJ6.filter((s) => s.third).slice(0, 3);
  const verbs = ["play", "eat", "work"];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setG(0)} className={`rounded-xl border-2 px-4 py-2 font-en font-bold transition ${g === 0 ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          I / You / We / They
        </button>
        <button onClick={() => setG(1)} className={`rounded-xl border-2 px-4 py-2 font-en font-bold transition ${g === 1 ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          He / She / It
        </button>
      </div>
      <div key={g} className="pop grid gap-2 sm:grid-cols-3">
        {verbs.map((v) => (
          <div key={v} className="rounded-2xl bg-white p-3">
            <div className="grid gap-1.5">
              {subs.map((s) => (
                <div key={s.en} dir="ltr" className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-1.5">
                  <En className="font-bold text-slate-700">{s.en}</En>
                  <En className={`font-extrabold ${g === 1 ? "text-teal-700" : "text-sky-700"}`}>{verbFor(v, s.third)}</En>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-3 rounded-2xl p-3 text-center text-sm font-bold ${g === 0 ? "bg-sky-100 text-sky-800" : "bg-teal-100 text-teal-800"}`}>
        {g === 0 ? "الفعل يبقى بشكله الأساسي — لا يتغير أبدًا" : "نضيف s (أو es / ies) إلى الفعل"}
      </div>
    </div>
  );
}

/** صرف الفعل العربي حسب الفاعل (صيغة data.ar هي صيغة «هو») */
function arVerb(ar: string, subj: string): string {
  const stem = ar.slice(1);
  const FEM = ["She", "Sara", "Mia", "Mira"];
  if (subj === "I") return `أ${stem}`;
  if (subj === "You") return `ت${stem}`;
  if (subj === "We") return `ن${stem}`;
  if (subj === "They") return `${ar}ون`;
  if (FEM.includes(subj)) return `ت${stem}`;
  return ar;
}

function PronounTabs() {
  const [pi, setPi] = useState(0);
  const s = SUBJ6[pi];
  const verbs = VERBS6.slice(0, 5);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-wrap gap-1.5">
        {SUBJ6.map((x, i) => (
          <button key={x.en} onClick={() => setPi(i)} className={`rounded-xl border-2 px-3 py-1.5 font-en font-bold transition active:scale-95 ${i === pi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}>
            {x.en}
          </button>
        ))}
      </div>
      <div key={pi} className="pop mt-4 grid gap-2">
        {verbs.map((v) => (
          <div key={v.base} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
            <PartsLine parts={[{ text: s.en, role: "s" }, { text: verbFor(v.base, s.third), role: "v" }, { text: "…", role: "o" }]} size="sm" label={false} />
            <span className="mr-auto text-sm text-slate-500">
              {s.ar} {arVerb(v.ar, s.en)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-sm font-bold text-teal-700">
        {s.third ? `${s.en} ← نضيف s / es / ies إلى الفعل` : `${s.en} ← الفعل بدون إضافة`}
      </div>
    </div>
  );
}

function RuleTabs() {
  const [t, setT] = useState<"s" | "es" | "ies">("s");
  const data = {
    s: {
      title: "معظم الأفعال ← نضيف s",
      rows: [
        ["play", "plays"],
        ["read", "reads"],
        ["eat", "eats"],
        ["drink", "drinks"],
        ["work", "works"],
        ["run", "runs"],
        ["sleep", "sleeps"],
      ],
      note: "نضيف s فقط",
    },
    es: {
      title: "ينتهي بـ s / sh / ch / x / o ← نضيف es",
      rows: [
        ["watch", "watches"],
        ["wash", "washes"],
        ["go", "goes"],
        ["fix", "fixes"],
        ["pass", "passes"],
      ],
      note: "watch → watches · go → goes",
    },
    ies: {
      title: "حرف ساكن + y ← نحوّل y إلى ies",
      rows: [
        ["study", "studies"],
        ["try", "tries"],
        ["fly", "flies"],
      ],
      note: "لكن: play → plays (لأن قبل y حرف علة)",
    },
  }[t];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        {(["s", "es", "ies"] as const).map((x) => (
          <button key={x} onClick={() => setT(x)} className={`rounded-xl border-2 px-5 py-2 font-en text-lg font-extrabold transition active:scale-95 ${t === x ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
            + {x}
          </button>
        ))}
      </div>
      <div key={t} className="pop">
        <div className="mb-3 text-center font-bold text-slate-700">{data.title}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {data.rows.map(([a, b]) => (
            <div key={a} dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
              <En className="text-lg font-bold text-slate-600">{a}</En>
              <span className="text-teal-500">→</span>
              <En className="text-lg font-extrabold text-teal-700">{b}</En>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-teal-50 p-2.5 text-center text-sm font-bold text-teal-800">{data.note}</div>
      </div>
    </div>
  );
}

function Conj() {
  const [si, setSi] = useState(4);
  const [vi, setVi] = useState(0);
  const s = SUBJ6[si];
  const v = VERBS6[vi];
  const c = conjS(v.base);
  const form = verbFor(v.base, s.third);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-sky-700">① الفاعل</div>
          <div className="flex flex-wrap gap-1.5">
            {SUBJ6.map((x, i) => (
              <button key={x.en} onClick={() => setSi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === si ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-teal-700">② الفعل</div>
          <div className="flex flex-wrap gap-1.5">
            {VERBS6.map((x, i) => (
              <button key={x.base} onClick={() => setVi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === vi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}>
                {x.base}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div key={`${si}-${vi}`} className="pop mt-4 rounded-3xl border-2 border-slate-200 bg-white p-5 text-center">
        <PartsLine parts={[{ text: s.en, role: "s" }, { text: form, role: "v" }]} size="lg" />
        <div className="mt-2 text-lg text-slate-500">
          {s.ar} {arVerb(v.ar, s.en)}.
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {s.third ? (
            <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">
              {v.base} → {c.form} · {c.why}
            </span>
          ) : (
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">{s.en} من المجموعة الأولى ← الفعل بدون إضافة</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Facts() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {FACTS.map((f, i) => (
        <div key={i} className={`pop pop-${i + 1} rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-4`}>
          <En className="text-xl font-extrabold text-slate-800">{f.en}</En>
          <div className="mt-1 text-slate-600">{f.ar}</div>
          <div className="mt-2 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">حقيقة عامة · Fact</div>
        </div>
      ))}
    </div>
  );
}

function VsNow() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
        <div className="mb-2 text-sm font-bold text-teal-700">Present Simple · عادة / بشكل عام</div>
        <En className="text-2xl font-extrabold text-slate-800">I play football.</En>
        <div className="mt-1 text-slate-600">أنا ألعب كرة القدم (بشكل عام).</div>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="mb-2 text-sm font-bold text-slate-500">ليس Present Simple · يحدث الآن</div>
        <En className="text-2xl font-extrabold text-slate-500">I am playing football.</En>
        <div className="mt-1 text-slate-500">أنا ألعب كرة القدم الآن.</div>
      </div>
    </div>
  );
}

function IQGroups() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
        <div className="font-head text-xl font-bold text-sky-800">مجموعة DON'T CHANGE</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          {["I", "You", "We", "They"].map((x) => (
            <span key={x} className="font-en rounded-xl bg-sky-500 px-3 py-1 text-lg font-extrabold text-white">
              {x}
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-1.5">
          {["I play.", "You play.", "We play.", "They play."].map((x) => (
            <En key={x} className="block text-lg font-bold text-slate-700">
              {x}
            </En>
          ))}
        </div>
        <div className="mt-2 text-sm font-bold text-sky-700">الفعل يبقى كما هو</div>
      </div>
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
        <div className="font-head text-xl font-bold text-teal-800">مجموعة S</div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
          {["He", "She", "It"].map((x) => (
            <span key={x} className="font-en rounded-xl bg-teal-600 px-3 py-1 text-lg font-extrabold text-white">
              {x}
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-1.5">
          {["He plays.", "She plays.", "It plays."].map((x) => (
            <En key={x} className="block text-lg font-bold text-slate-700">
              {x}
            </En>
          ))}
        </div>
        <div className="mt-2 text-sm font-bold text-teal-700">الفعل يأخذ s غالبًا</div>
      </div>
    </div>
  );
}

// ============================================================
// التمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{n}</span>;
}

function ChooseEx({ ex }: { ex: Extract<Exercise6, { type: "choose" }> }) {
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
                <span className={`inline-grid h-9 min-w-20 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-lg font-extrabold ${c !== undefined ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>
                  {c !== undefined ? it.opts[c] : "___"}
                </span>
                <En className="text-xl font-bold text-slate-800">{it.o}</En>
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

function ConjEx({ ex }: { ex: Extract<Exercise6, { type: "conj" }> }) {
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
              <span className="text-teal-500">→</span>
              <En className="text-lg font-extrabold text-teal-700">{it.subj}</En>
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

function AdvEx({ ex }: { ex: Extract<Exercise6, { type: "adv" }> }) {
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
              <span className="rounded-full bg-fuchsia-50 px-3 py-1 text-xs font-bold text-fuchsia-700">💭 {it.ar}</span>
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

function FixEx({ ex }: { ex: Extract<Exercise6, { type: "fix" }> }) {
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

function OrderEx({ ex }: { ex: Extract<Exercise6, { type: "order" }> }) {
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => (
        <OrderRow key={i} n={i + 1} item={it} />
      ))}
    </div>
  );
}

function OrderRow({ n, item }: { n: number; item: { words: string[]; correct: string[]; ar: string } }) {
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
              className="rounded-xl border-2 border-slate-300 bg-white px-3.5 py-1.5 font-en text-lg font-bold text-slate-800 transition hover:border-teal-400 active:scale-95 disabled:opacity-25"
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
        {shown.length > 0 && <span className="font-en text-xl font-bold text-slate-300">.</span>}
      </div>
      {finished && <div className="tada mt-2 font-bold text-emerald-700">🎉 {item.ar}</div>}
      {bad && <div className="mt-2 text-sm font-bold text-rose-600">✕ ليس بعد — كلمة التكرار تأتي قبل الفعل</div>}
    </div>
  );
}

function WhyEx({ ex }: { ex: Extract<Exercise6, { type: "why" }> }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  const opts: ("habit" | "routine" | "fact")[] = ["habit", "routine", "fact"];
  const emoji = { habit: "🔁", routine: "🌞", fact: "🌍" };
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
                  {emoji[o]} {WHY_AR[o]} · <En>{o}</En>
                </button>
              ))}
            </div>
            {c && !right && (
              <div className="mt-1.5 pr-11 text-xs font-bold text-rose-600">
                ✕ الصحيح: {WHY_AR[it.answer]} · <En>{it.answer}</En>
              </div>
            )}
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
        {IQ6.map((it, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-500 text-sm font-bold text-white">{i + 1}</span>
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
  const [ai, setAi] = useState(1);
  const [vi, setVi] = useState(4);
  const [oi, setOi] = useState(1);
  const objs = [
    { en: "football", ar: "كرة القدم" },
    { en: "English", ar: "الإنجليزية" },
    { en: "TV", ar: "التلفاز" },
    { en: "books", ar: "الكتب" },
    { en: "breakfast", ar: "الفطور" },
  ];
  const a = ADVS[ai];
  const v = VERBS6[vi];
  const o = objs[oi];
  return (
    <Frame mascot="🎨" badge="تحدي إضافي" title="كوّن جملة عن نفسك باستخدام كل كلمة" lead="مثال: I usually study English. — بدّل وركّب ست جمل بالسلّم كاملًا.">
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-2xl border-2 border-fuchsia-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-fuchsia-700">① كلمة التكرار</div>
          <div className="flex flex-wrap gap-1.5">
            {ADVS.map((x, i) => (
              <button key={x.en} onClick={() => setAi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === ai ? "border-transparent bg-fuchsia-500 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-fuchsia-300"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-teal-700">② الفعل</div>
          <div className="flex flex-wrap gap-1.5">
            {VERBS6.slice(0, 8).map((x, i) => (
              <button key={x.base} onClick={() => setVi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === vi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}>
                {x.base}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-amber-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-amber-700">③ المتمّم</div>
          <div className="flex flex-wrap gap-1.5">
            {objs.map((x, i) => (
              <button key={x.en} onClick={() => setOi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === oi ? "border-transparent bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div key={`${ai}-${vi}-${oi}`} className="pop rounded-3xl border-2 border-slate-200 bg-white p-5 text-center">
        <PartsLine parts={[{ text: "I", role: "s" }, { text: a.en, role: "adv" }, { text: v.base, role: "v" }, { text: o.en, role: "o" }]} size="lg" />
        <div className="mt-2 text-lg text-slate-500">
          أنا {a.ar} {arVerb(v.ar, "I")} {o.ar}.
        </div>
        <div className="mt-2 text-xs font-bold text-teal-700">مع I الفعل يبقى بدون s ✅ · كلمة التكرار قبل الفعل ✅</div>
      </div>
    </Frame>
  );
}

// ============================================================
// شرائح ثابتة
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(13,148,136,0.32)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-teal-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-fuchsia-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">⏰</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-teal-600 px-5 py-2 text-base font-bold text-white">الدرس السادس</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">المضارع البسيط</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <En>Present Simple</En>
        </p>
        <div className="pop pop-4 mt-9 flex justify-center">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-5">
            <PartsLine parts={[{ text: "She", role: "s" }, { text: "usually", role: "adv" }, { text: "studies", role: "v" }, { text: "English", role: "o" }]} size="lg" />
            <div className="mt-2 text-center text-slate-500">هي عادةً تدرس الإنجليزية.</div>
          </div>
        </div>
        <div className="pop pop-5 mt-6 flex flex-wrap justify-center gap-2">
          {ADVS.map((a) => (
            <span key={a.en} className="rounded-full bg-fuchsia-50 px-3 py-1 text-sm font-bold text-fuchsia-700">
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
    "فهم معنى [[Present Simple]].",
    "معرفة متى نستخدمه.",
    "تكوين الجملة المثبتة.",
    "معرفة الفرق بين [[I / You / We / They]] و [[He / She / It]].",
    "فهم قاعدة [[s / es / ies]].",
    "استخدام الكلمات الدالة على [[Present Simple]].",
    "تكوين جمل عن العادات والروتين والحقائق.",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="بنهاية الدرس يجب أن يكون الطالب قادرًا على:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس 6" lead="Present Simple نستخدمه لـ:">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "العادات", e: "I usually drink coffee." },
          { t: "الروتين", e: "I go to school every day." },
          { t: "الأشياء المتكررة", e: "She often plays tennis." },
          { t: "الحقائق العامة", e: "The sun rises in the east." },
        ].map((x, i) => (
          <div key={i} className={`pop pop-${i + 1} rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-4`}>
            <div className="font-head text-lg font-bold text-teal-800">{x.t}</div>
            <En className="mt-1 block text-sm font-bold text-slate-700">{x.e}</En>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
          <div className="font-head text-lg font-bold text-sky-800">I / You / We / They + Verb</div>
          <div className="mt-2 grid gap-1">
            {["I play.", "You play.", "We play.", "They play."].map((x) => (
              <En key={x} className="text-lg font-bold text-slate-700">
                {x}
              </En>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
          <div className="font-head text-lg font-bold text-teal-800">He / She / It + Verb + s/es/ies</div>
          <div className="mt-2 grid gap-1">
            {["He plays.", "She watches.", "It goes.", "She studies."].map((x) => (
              <En key={x} className="text-lg font-bold text-slate-700">
                {x}
              </En>
            ))}
          </div>
        </div>
      </div>
      <Note emoji="⭐" text="قبل أن تكتب الفعل اسأل: من الـ [[Subject]]؟ إذا كان [[I / You / We / They]] فالفعل أساسي، وإذا كان [[He / She / It]] أضف [[s / es / ies]]." />
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-teal-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">⏭️</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">الدرس 7 — الجزء الثاني من Present Simple</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">
          والأهم من ناحية الاستخدام: النفي بـ <En className="font-bold text-teal-300">do / does</En> + السؤال بـ <En className="font-bold text-teal-300">Do / Does</En> + الإجابات القصيرة.
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

function BlockView({ b }: { b: Block6 }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "list":
      return (
        <div className="grid gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4">
          {b.items.map((x, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-teal-100 text-sm font-bold text-teal-700">{i + 1}</span>
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
    case "day":
      return <DayTimeline />;
    case "ladder":
      return <Ladder />;
    case "everyWords":
      return <EveryWords />;
    case "groups":
      return <Groups />;
    case "ruleTabs":
      return <RuleTabs />;
    case "conj":
      return <Conj />;
    case "pronounTabs":
      return <PronounTabs />;
    case "facts":
      return <Facts />;
    case "vsNow":
      return <VsNow />;
    case "iqGroups":
      return <IQGroups />;
  }
}

function SlideView({ s, onExit }: { s: Slide6; onExit: () => void }) {
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
          {ex.type === "conj" && <ConjEx ex={ex} />}
          {ex.type === "adv" && <AdvEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "order" && <OrderEx ex={ex} />}
          {ex.type === "why" && <WhyEx ex={ex} />}
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
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت المضارع البسيط.">
          <FinalQuiz lesson={6} accent="bg-teal-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(s: Slide6): string {
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
  الفكرة: "text-teal-600",
  التصريف: "text-sky-600",
  التكرار: "text-fuchsia-600",
  الاستخدام: "text-emerald-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 6 · المضارع البسيط</div>
        <En className="text-xs font-semibold text-slate-400">Present Simple</En>
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
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-teal-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
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

export default function Lesson6({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l6-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f2faf8] text-slate-800">
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
                <div className="h-full rounded-full bg-gradient-to-l from-teal-500 via-fuchsia-400 to-sky-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>
          <main id="l6-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
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
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-teal-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-teal-700 disabled:opacity-30">
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
