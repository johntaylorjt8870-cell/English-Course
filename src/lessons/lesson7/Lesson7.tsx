import { Fragment, useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  VERBS7,
  SUBJ7,
  IQ7,
  HARD7,
  CLS_AR,
  ROLE7_AR,
  negFor,
  arVerb7,
  type Slide7,
  type Block7,
  type Part7,
  type Role7,
  type Exercise7,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";

// ============================================================
// النمط F — أحمر وردي: المساعد بنفسجي، النفي أحمر
// ============================================================
const RS: Record<Role7, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  v: { chip: "bg-teal-100 border-teal-300 text-teal-900", solid: "bg-teal-600", text: "text-teal-700" },
  aux: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-600", text: "text-violet-700" },
  nt: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-600", text: "text-rose-700" },
  o: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700" },
  adv: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", solid: "bg-fuchsia-500", text: "text-fuchsia-700" },
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
        return (
          <Fragment key={i}>
            {x.split(/(\s+)/).map((t, j) =>
              /[A-Za-z]/.test(t) ? (
                <span key={j} className="font-en">
                  {t}
                </span>
              ) : (
                t
              )
            )}
          </Fragment>
        );
      })}
    </span>
  );
}

function PartsLine({ parts, q, size = "md", label = true }: { parts: Part7[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[p.role].chip} ${sz} font-en font-extrabold leading-tight`}>
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE7_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function SentenceCard({ parts, ar, note, q }: { parts: Part7[]; ar: string; note?: string; q?: boolean }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} q={q} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg text-slate-500">{ar}</span>
        {note && (
          <span className="rounded-full bg-rose-50 px-3 py-1 text-sm font-bold text-rose-700">
            <Rich text={note} />
          </span>
        )}
      </div>
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; tip?: string }) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(225,29,72,0.25)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-rose-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-rose-100 px-3.5 py-1.5 text-sm font-bold text-rose-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-rose-700 to-pink-700 p-4 text-white">
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

function GroupsDo() {
  const [g, setG] = useState<0 | 1>(0);
  const subs = g === 0 ? ["I", "You", "We", "They"] : ["He", "She", "It"];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setG(0)} className={`rounded-xl border-2 px-4 py-2 font-en text-lg font-extrabold transition active:scale-95 ${g === 0 ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          do
        </button>
        <button onClick={() => setG(1)} className={`rounded-xl border-2 px-4 py-2 font-en text-lg font-extrabold transition active:scale-95 ${g === 1 ? "border-transparent bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
          does
        </button>
      </div>
      <div key={g} className="pop grid gap-2 sm:grid-cols-2">
        {subs.map((s) => (
          <div key={s} className="flex items-center justify-between rounded-2xl bg-white px-4 py-2.5">
            <En className="text-xl font-extrabold text-slate-800">{s}</En>
            <span className="text-slate-300">←</span>
            <En className={`rounded-lg px-3 py-1 text-xl font-extrabold text-white ${g === 0 ? "bg-sky-500" : "bg-violet-500"}`}>{g === 0 ? "do" : "does"}</En>
          </div>
        ))}
      </div>
      <div className={`mt-3 rounded-2xl p-3 text-center text-sm font-bold ${g === 0 ? "bg-sky-100 text-sky-800" : "bg-violet-100 text-violet-800"}`}>
        {g === 0 ? "النفي: don't — السؤال: Do...?" : "النفي: doesn't — السؤال: Does...؟ والفعل أساسي!"}
      </div>
    </div>
  );
}

/** آلة اختفاء الـ s */
function Vanish() {
  const [si, setSi] = useState(4);
  const [vi, setVi] = useState(0);
  const s = SUBJ7[si];
  const v = VERBS7[vi];
  const neg = negFor(s.third);

  const sPart = v.s.slice(v.base.length) || "s";

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-sky-700">① الفاعل</div>
          <div className="flex flex-wrap gap-1.5">
            {SUBJ7.map((x, i) => (
              <button key={x.en} onClick={() => setSi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === si ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-teal-700">② الفعل</div>
          <div className="flex flex-wrap gap-1.5">
            {VERBS7.map((x, i) => (
              <button key={x.base} onClick={() => setVi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === vi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}>
                {x.base}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${si}-${vi}`} className="pop mt-4 grid gap-3">
        {/* الإثبات */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4">
          <div className="mb-2 text-xs font-bold text-emerald-600">الإثبات</div>
          <div dir="ltr" className="flex flex-wrap items-center gap-2">
            <En className="rounded-xl bg-sky-100 px-3 py-1.5 text-2xl font-extrabold text-sky-900">{s.en}</En>
            <span className="rounded-xl bg-teal-100 px-3 py-1.5 font-en text-2xl font-extrabold text-teal-900">
              {s.third ? v.base : v.base}
              {s.third && <span className="tada rounded-md bg-rose-500 px-1 text-white">{sPart}</span>}
            </span>
            <span className="text-slate-400">← {s.ar} {arVerb7(v.ar, s.en)}</span>
          </div>
        </div>
        {/* النفي */}
        <div className="rounded-2xl border-2 border-rose-200 bg-white p-4">
          <div className="mb-2 text-xs font-bold text-rose-600">النفي</div>
          <div dir="ltr" className="flex flex-wrap items-center gap-2">
            <En className="rounded-xl bg-sky-100 px-3 py-1.5 text-2xl font-extrabold text-sky-900">{s.en}</En>
            <span className="rounded-xl bg-rose-100 px-3 py-1.5 font-en text-2xl font-extrabold text-rose-900">
              {s.third ? (
                <>doe<span className="tada rounded-md bg-rose-500 px-1 text-white">s</span>n't</>
              ) : (
                neg
              )}
            </span>
            <En className="rounded-xl bg-teal-100 px-3 py-1.5 text-2xl font-extrabold text-teal-900">{v.base}</En>
          </div>
          {s.third && <div className="mt-2 text-sm font-bold text-rose-600">👀 الـ s انتقلت من الفعل إلى does — والفعل عاد أساسيًا!</div>}
        </div>
        {/* السؤال */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4">
          <div className="mb-2 text-xs font-bold text-indigo-600">السؤال</div>
          <div dir="ltr" className="flex flex-wrap items-center gap-2">
            <span className="rounded-xl bg-violet-100 px-3 py-1.5 font-en text-2xl font-extrabold text-violet-900">
              {s.third ? (
                <>Doe<span className="tada rounded-md bg-violet-500 px-1 text-white">s</span></>
              ) : (
                "Do"
              )}
            </span>
            <En className="rounded-xl bg-sky-100 px-3 py-1.5 text-2xl font-extrabold text-sky-900">{s.en === "I" ? "I" : s.en.toLowerCase()}</En>
            <En className="rounded-xl bg-teal-100 px-3 py-1.5 text-2xl font-extrabold text-teal-900">{v.base}?</En>
          </div>
          {s.third && <div className="mt-2 text-sm font-bold text-indigo-600">👀 الـ s في Does — لذلك الفعل بدون s.</div>}
        </div>
      </div>
    </div>
  );
}

function Chains() {
  const rows = [
    ["play", "plays", "doesn't play"],
    ["study", "studies", "doesn't study"],
    ["watch", "watches", "doesn't watch"],
    ["go", "goes", "doesn't go"],
  ];
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {rows.map(([a, b, c]) => (
        <div key={a} className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4">
          <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
            <En className="rounded-xl bg-white px-3 py-1.5 text-lg font-bold text-slate-600 shadow-sm">{a}</En>
            <span className="text-slate-300">→</span>
            <En className="rounded-xl bg-teal-500 px-3 py-1.5 text-lg font-extrabold text-white shadow-sm">{b}</En>
            <span className="text-slate-300">→</span>
            <En className="rounded-xl bg-rose-500 px-3 py-1.5 text-lg font-extrabold text-white shadow-sm">{c}</En>
          </div>
        </div>
      ))}
    </div>
  );
}

function ModelCard() {
  const lines = [
    { en: "He plays football.", c: "border-emerald-200 bg-emerald-50", t: "text-emerald-800" },
    { en: "He doesn't play football.", c: "border-rose-200 bg-rose-50", t: "text-rose-800" },
    { en: "Does he play football?", c: "border-indigo-200 bg-indigo-50", t: "text-indigo-800" },
    { en: "Yes, he does. / No, he doesn't.", c: "border-amber-200 bg-amber-50", t: "text-amber-800" },
  ];
  return (
    <div className="rounded-3xl bg-slate-900 p-5">
      <div className="mb-3 text-center font-head text-lg font-bold text-white">🧠 النموذج الذهبي — احفظه</div>
      <div className="grid gap-2">
        {lines.map((l, i) => (
          <div key={i} dir="ltr" className={`rounded-2xl border-2 p-3 text-center ${l.c}`}>
            <En className={`text-xl font-extrabold md:text-2xl ${l.t}`}>{l.en}</En>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeVsDo() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
        <div className="mb-2 font-head text-lg font-bold text-sky-800">Verb to be ← مع الصفات</div>
        <En className="block text-xl font-extrabold text-slate-800">Is he happy?</En>
        <En className="mt-1 block text-lg font-bold text-slate-600">Yes, he is.</En>
        <div className="mt-2 text-sm text-slate-500">happy صفة ← نستخدم is</div>
      </div>
      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
        <div className="mb-2 font-head text-lg font-bold text-teal-800">Present Simple ← مع الأفعال</div>
        <En className="block text-xl font-extrabold text-slate-800">Does he play football?</En>
        <En className="mt-1 block text-lg font-bold text-slate-600">Yes, he does.</En>
        <div className="mt-2 text-sm text-slate-500">play فعل ← نستخدم Does</div>
      </div>
      <div className="md:col-span-2">
        <Verdict ok={false} en="Does he is happy?" why="لا do مع Verb to be" />
      </div>
      <div className="md:col-span-2">
        <Verdict ok en="Is he happy?" ar="هل هو سعيد؟" />
      </div>
      <div className="md:col-span-2">
        <Verdict ok={false} en="He doesn't is tired." why="is لها نظامها الخاص" />
      </div>
      <div className="md:col-span-2">
        <Verdict ok en="He isn't tired." ar="هو ليس متعبًا." />
      </div>
    </div>
  );
}

function CompareTwo() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-sky-200 bg-white p-5">
        <div className="mb-3 text-center font-head text-lg font-bold text-sky-800">Verb to be</div>
        <div className="grid gap-1.5">
          {["He is happy.", "He is not happy.", "Is he happy?", "Yes, he is."].map((x) => (
            <div key={x} dir="ltr" className="rounded-xl bg-sky-50 p-2 text-center">
              <En className="font-bold text-slate-700">{x}</En>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-xs font-bold text-sky-600">is ← is not ← Is...?</div>
      </div>
      <div className="rounded-3xl border-2 border-teal-200 bg-white p-5">
        <div className="mb-3 text-center font-head text-lg font-bold text-teal-800">Present Simple</div>
        <div className="grid gap-1.5">
          {["He plays football.", "He doesn't play football.", "Does he play football?", "Yes, he does."].map((x) => (
            <div key={x} dir="ltr" className="rounded-xl bg-teal-50 p-2 text-center">
              <En className="font-bold text-slate-700">{x}</En>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-xs font-bold text-teal-600">play ← doesn't play ← Does...?</div>
      </div>
    </div>
  );
}

function AdvTable() {
  const rows = [
    { t: "الإثبات", en: "He usually plays football.", c: "border-emerald-200 bg-emerald-50", pat: "Subject + Adverb + Verb" },
    { t: "النفي", en: "He doesn't usually play football.", c: "border-rose-200 bg-rose-50", pat: "Subject + don't/doesn't + Adverb + Verb" },
    { t: "السؤال", en: "Does he usually play football?", c: "border-indigo-200 bg-indigo-50", pat: "Do/Does + Subject + Adverb + Verb?" },
  ];
  return (
    <div className="grid gap-2.5">
      {rows.map((r) => (
        <div key={r.t} className={`rounded-3xl border-2 p-4 ${r.c}`}>
          <div className="mb-1 text-sm font-bold text-slate-500">{r.t}</div>
          <En className="text-xl font-extrabold text-slate-800">{r.en}</En>
          <div dir="ltr" className="mt-1 text-left font-en text-xs font-bold text-slate-400">
            {r.pat}
          </div>
        </div>
      ))}
    </div>
  );
}

function MapTable() {
  const groups = [
    { t: "I / You / We / They", c: "border-sky-200 bg-sky-50", tc: "text-sky-800", rows: ["I play.", "I don't play.", "Do I play?", "Yes, I do. / No, I don't."] },
    { t: "He / She / It", c: "border-rose-200 bg-rose-50", tc: "text-rose-800", rows: ["He plays.", "He doesn't play.", "Does he play?", "Yes, he does. / No, he doesn't."] },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.t} className={`rounded-3xl border-2 p-5 ${g.c}`}>
          <div dir="ltr" className={`text-center font-en text-xl font-extrabold ${g.tc}`}>
            {g.t}
          </div>
          <div className="mt-3 grid gap-1.5">
            {g.rows.map((x) => (
              <div key={x} dir="ltr" className="rounded-xl bg-white p-2 text-center">
                <En className="font-bold text-slate-700">{x}</En>
              </div>
            ))}
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
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{n}</span>;
}

function AuxPick({ ex }: { ex: Extract<Exercise7, { type: "auxPick" }> }) {
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
              <div dir="ltr" className="flex items-center gap-1.5">
                {it.before !== "___" && <En className="text-xl font-bold text-slate-800">{it.before}</En>}
                <span className={`inline-grid h-9 min-w-20 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-lg font-extrabold ${c !== undefined ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>
                  {c !== undefined ? it.opts[c] : "___"}
                </span>
                <En className="text-xl font-bold text-slate-800">{it.after}</En>
              </div>
            </div>
            <div className="mt-1.5 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-1.5 pr-11">
              {it.opts.map((o, oi) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-lg border-2 px-4 py-1 font-en font-bold transition active:scale-95 ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
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

function FixEx({ ex }: { ex: Extract<Exercise7, { type: "fix" }> }) {
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

function TransformEx({ ex }: { ex: Extract<Exercise7, { type: "transform" }> }) {
  const [on, setOn] = useState<Record<number, boolean>>({});
  const isNeg = ex.mode === "neg";
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const done = on[i];
        const aux = isNeg ? negFor(it.third) : it.third ? "Does" : "Do";
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${done ? (isNeg ? "border-rose-300 bg-rose-50/40" : "border-indigo-300 bg-indigo-50/40") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              {!done ? (
                <PartsLine
                  parts={[
                    { text: it.s, role: "s" },
                    { text: it.vs, role: "v" },
                    { text: it.o, role: "o" },
                  ]}
                  size="sm"
                  label={false}
                />
              ) : isNeg ? (
                <PartsLine
                  parts={[
                    { text: it.s, role: "s" },
                    { text: aux, role: "nt" },
                    { text: it.v, role: "v" },
                    { text: it.o, role: "o" },
                  ]}
                  size="sm"
                  label={false}
                />
              ) : (
                <PartsLine
                  parts={[
                    { text: aux, role: "aux" },
                    { text: it.s === "I" ? "I" : it.s.toLowerCase(), role: "s" },
                    { text: it.v, role: "v" },
                    { text: it.o, role: "o" },
                  ]}
                  q
                  size="sm"
                  label={false}
                />
              )}
              <button
                onClick={() => setOn((o) => ({ ...o, [i]: !o[i] }))}
                className={`mr-auto rounded-xl px-4 py-1.5 text-sm font-bold text-white transition ${isNeg ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {done ? "↩ عودة" : isNeg ? "حوّل للنفي 🚫" : "حوّل لسؤال ❓"}
              </button>
            </div>
            {done && (
              <div className="tada mt-2 pr-11 font-bold text-slate-600">
                {it.ar} {it.third && <span className="text-rose-600">— اختفت الـ s من {it.vs}!</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ChooseEx({ ex }: { ex: Extract<Exercise7, { type: "choose" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-xl font-bold text-slate-800">{it.stem}</En>
              <span className="text-sm text-slate-400">{it.ar}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pr-11">
              {it.opts.map((o, oi) => {
                const isA = oi === it.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-slate-400";
                if (c !== undefined) {
                  if (isA) cls = "border-transparent bg-emerald-600 text-white";
                  else if (c === oi) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                }
                return (
                  <button key={oi} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-2 font-en text-lg font-bold transition active:scale-95 ${cls}`}>
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ClassifyEx({ ex }: { ex: Extract<Exercise7, { type: "classify" }> }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  const opts: ("aff" | "neg" | "q")[] = ["aff", "neg", "q"];
  const emoji = { aff: "✅", neg: "🚫", q: "❓" };
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-lg font-bold text-slate-800">{it.en}</En>
            </div>
            <div className="mt-1 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-1.5 pr-11">
              {opts.map((o) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: o }))}
                  className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${c === o ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {emoji[o]} {CLS_AR[o]}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function IQ() {
  const [step, setStep] = useState<Record<number, number>>({});
  return (
    <Frame mascot="🏆" badge="IQ200" title="التحدي النهائي IQ200" lead="أكمل السلسلة لكل جملة: الإثبات ← النفي ← السؤال ← الإجابة. اكشف خطوة خطوة:">
      <div className="grid gap-3">
        {IQ7.map((it, i) => {
          const st = step[i] ?? 0;
          const aux = it.third ? "Does" : "Do";
          const neg = negFor(it.third);
          const stages = [
            { t: "النفي", parts: [{ text: it.s, role: "s" as const }, { text: neg, role: "nt" as const }, { text: it.v, role: "v" as const }, { text: it.o, role: "o" as const }], q: false },
            { t: "السؤال", parts: [{ text: aux, role: "aux" as const }, { text: it.s === "I" ? "I" : it.s.toLowerCase(), role: "s" as const }, { text: it.v, role: "v" as const }, { text: it.o, role: "o" as const }], q: true },
          ];
          return (
            <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Nub n={i + 1} />
                <PartsLine parts={[{ text: it.s, role: "s" }, { text: it.vs, role: "v" }, { text: it.o, role: "o" }]} size="sm" label={false} />
                {st < 3 && (
                  <button onClick={() => setStep((s) => ({ ...s, [i]: Math.min(3, (s[i] ?? 0) + 1) }))} className="mr-auto rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-slate-700">
                    {st === 0 ? "النفي ↓" : st === 1 ? "السؤال ↓" : "الإجابة ↓"}
                  </button>
                )}
                {st >= 3 && (
                  <button onClick={() => setStep((s) => ({ ...s, [i]: 0 }))} className="mr-auto rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">
                    ↺
                  </button>
                )}
              </div>
              {st >= 1 && (
                <div className="tada mt-3 rounded-2xl bg-rose-50 p-3">
                  <div className="mb-1 text-xs font-bold text-rose-600">النفي</div>
                  <PartsLine parts={stages[0].parts} size="sm" label={false} />
                  {it.third && <div className="mt-1 text-xs font-bold text-rose-600">اختفت الـ s من {it.vs}!</div>}
                </div>
              )}
              {st >= 2 && (
                <div className="tada mt-2 rounded-2xl bg-indigo-50 p-3">
                  <div className="mb-1 text-xs font-bold text-indigo-600">السؤال</div>
                  <PartsLine parts={stages[1].parts} q size="sm" label={false} />
                </div>
              )}
              {st >= 3 && (
                <div className="tada mt-2 rounded-2xl bg-emerald-50 p-3">
                  <div className="mb-1 text-xs font-bold text-emerald-600">الإجابة القصيرة</div>
                  <En className="text-xl font-extrabold text-emerald-700">{it.short}</En>
                  <span className="mr-2 text-sm text-slate-500">{it.shortAr}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

function Challenge() {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <Frame mascot="🔥" badge="تحدٍ أصعب" title="تحدٍ أصعب — صحح هذه الجمل وفسّر الخطأ" lead="فكّر أولًا، ثم اكشف الحل والسبب:">
      <div className="grid gap-2.5">
        {HARD7.map((it, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
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

// ============================================================
// شرائح ثابتة
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(225,29,72,0.3)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-rose-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-violet-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🎭</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-rose-600 px-5 py-2 text-base font-bold text-white">الدرس السابع</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">النفي والسؤال والإجابات القصيرة</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <En>Do / Does</En> ← <En>Present Simple</En>
        </p>
        <div className="pop pop-4 mt-9 flex justify-center">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-5">
            <PartsLine parts={[{ text: "He", role: "s" }, { text: "doesn't", role: "nt" }, { text: "play", role: "v" }]} size="lg" />
            <div className="mt-2 text-center text-slate-500">هو لا يلعب. — أين ذهبت الـ s؟ 🤔</div>
          </div>
        </div>
        <p className="pop pop-5 mt-8 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "تحويل [[Present Simple]] إلى النفي.",
    "معرفة الفرق بين [[do]] و [[does]].",
    "فهم لماذا تختفي [[s]] من الفعل.",
    "تكوين أسئلة باستخدام [[Do / Does]].",
    "الإجابة بـ [[Yes / No]].",
    "تجنب أخطاء مثل: [[He doesn't plays]] و [[Does she studies?]]",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="بنهاية الدرس يجب أن يكون الطالب قادرًا على:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${i + 1} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Summary() {
  const pts = ["الاستخدام", "العادات والروتين", "الحقائق", "always / usually / often / sometimes / rarely / never", "every day / every week…", "الإثبات", "s / es / ies", "النفي", "do / does", "السؤال", "الإجابات القصيرة"];
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس 7" lead="القاعدة التي تحكم كل شيء:">
      <Note emoji="⭐" text="بعد [[do / does / don't / doesn't]] نستخدم الفعل بشكله الأساسي — دائمًا." />
      <div className="grid gap-2 sm:grid-cols-2">
        <Verdict ok en="Does he play?" />
        <Verdict ok={false} en="Does he plays?" />
        <Verdict ok en="He doesn't play." />
        <Verdict ok={false} en="He doesn't plays." />
      </div>
      <MapTable />
      <div className="rounded-3xl bg-slate-900 p-5 text-white">
        <div className="mb-3 font-head text-lg font-bold">🚀 الآن أصبح Present Simple شبه مكتمل:</div>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {pts.map((p, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 text-sm">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold">✓</span>
              {p.includes("/") || /^[A-Z]/.test(p) ? <En className="font-bold">{p}</En> : <span>{p}</span>}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-rose-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">🚀</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">الدرس 8 — مراجعة وتثبيت قوية</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">
          سنجمع كل شيء في درس واحد مع تمارين من السهل إلى <En className="font-bold text-rose-300">IQ200</En> — وبعدها ننتقل إلى <En className="font-bold text-rose-300">Present Continuous</En>.
        </p>
        <div className="pop pop-3 mt-8">
          <button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

function BlockView({ b }: { b: Block7 }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "sentence":
      return <SentenceCard parts={b.parts} ar={b.ar} note={b.note} q={b.q} />;
    case "ok":
      return <Verdict ok en={b.en} ar={b.ar} />;
    case "bad":
      return <Verdict ok={false} en={b.en} why={b.why} />;
    case "note":
      return <Note emoji={b.emoji} text={b.text} />;
    case "groupsDo":
      return <GroupsDo />;
    case "vanish":
      return <Vanish />;
    case "chains":
      return <Chains />;
    case "beVsDo":
      return <BeVsDo />;
    case "compareTwo":
      return <CompareTwo />;
    case "advTable":
      return <AdvTable />;
    case "mapTable":
      return <MapTable />;
    case "modelCard":
      return <ModelCard />;
  }
}

function SlideView({ s, onExit }: { s: Slide7; onExit: () => void }) {
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
          {ex.type === "auxPick" && <AuxPick ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "transform" && <TransformEx ex={ex} />}
          {ex.type === "choose" && <ChooseEx ex={ex} />}
          {ex.type === "classify" && <ClassifyEx ex={ex} />}
        </Frame>
      );
    }
    case "iq":
      return <IQ />;
    case "challenge":
      return <Challenge />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت do و does.">
          <FinalQuiz lesson={7} accent="bg-rose-600" />
        </Frame>
      );
    case "summary":
      return <Summary />;
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(s: Slide7): string {
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
  المراجعة: "text-teal-600",
  المساعدان: "text-violet-600",
  النفي: "text-rose-600",
  السؤال: "text-indigo-600",
  الإجابات: "text-emerald-600",
  المقارنة: "text-amber-600",
  التمارين: "text-sky-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 7 · النفي والسؤال</div>
        <En className="text-xs font-semibold text-slate-400">Do / Does</En>
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
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-rose-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
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

export default function Lesson7({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l7-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fdf3f4] text-slate-800">
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
                <div className="h-full rounded-full bg-gradient-to-l from-rose-500 via-pink-400 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>
          <main id="l7-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
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
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-rose-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-rose-700 disabled:opacity-30">
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
