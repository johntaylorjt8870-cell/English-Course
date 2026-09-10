import { Fragment, useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  ADJS,
  OPPOSITES,
  SUBJECTS,
  NA_WORDS,
  JOURNEY,
  ROLE_AR,
  NEG_AR,
  adjAr,
  capBe,
  type Slide,
  type Block,
  type Part,
  type Role,
  type Exercise,
  type Adj,
  type Subj,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";

// ============================================================
// النمط D — الصفة دائمًا بنفسجية، الاسم أخضر
// ============================================================
const RS: Record<Role, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  be: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-500", text: "text-rose-700" },
  not: { chip: "bg-slate-200 border-slate-400 text-slate-800", solid: "bg-slate-600", text: "text-slate-700" },
  art: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700" },
  adj: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-500", text: "text-violet-700" },
  noun: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", solid: "bg-emerald-500", text: "text-emerald-700" },
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
        // عزل تلقائي لأي مقطع لاتيني خارج الأقواس
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

function Chip({ text, role, label = true, size = "md" }: { text: string; role: Role; label?: boolean; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <span className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[role].chip} ${sz} font-en font-extrabold leading-tight`}>
      {text}
      {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE_AR[role]}</span>}
    </span>
  );
}

function PartsLine({ parts, ending = ".", size = "md", label = true }: { parts: Part[]; ending?: string; size?: "sm" | "md" | "lg"; label?: boolean }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <Chip key={i} text={p.text} role={p.role} size={size} label={label} />
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{ending}</span>
    </div>
  );
}

function SentenceCard({ parts, en, ar, note }: { parts?: Part[]; en: string; ar: string; note?: string }) {
  const ending = en.trim().endsWith("?") ? "?" : ".";
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      {parts ? <PartsLine parts={parts} ending={ending} /> : <En className="text-2xl font-bold text-slate-800">{en}</En>}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg text-slate-500">{ar}</span>
        {note && <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-bold text-violet-700">📌 <Rich text={note} /></span>}
      </div>
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
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  tip?: string;
}) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(76,29,149,0.28)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-violet-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-violet-100 px-3.5 py-1.5 text-sm font-bold text-violet-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-violet-700 to-indigo-700 p-4 text-white">
          <span className="text-2xl">🦉</span>
          <span className="text-base font-semibold md:text-lg">{tip}</span>
        </div>
      )}
    </section>
  );
}

// ============================================================
// بلوكات المحتوى
// ============================================================

function Term({ en, ar, desc }: { en: string; ar: string; desc?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
      <En className="text-4xl font-extrabold text-violet-700">{en}</En>
      <span className="text-3xl font-bold text-slate-300">=</span>
      <span className="font-head text-3xl font-bold text-slate-800">{ar}</span>
      {desc && <span className="basis-full text-lg text-slate-600">{desc}</span>}
    </div>
  );
}

function AdjCloud() {
  const show = ADJS.slice(0, 12);
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {show.map((a, i) => (
        <span
          key={a.en}
          className="rounded-2xl border-2 border-violet-200 bg-white px-3.5 py-2 shadow-sm anim-float"
          style={{ animationDelay: `${(i % 6) * 0.25}s` }}
        >
          <En className="text-xl font-extrabold text-violet-700">{a.en}</En>
          <span className="mr-2 text-sm text-slate-500">{a.ar}</span>
        </span>
      ))}
    </div>
  );
}

function AskHow({ items }: { items: { en: string; q: string; adj: string; ar: string }[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {items.map((it, i) => (
        <div key={i} className={`rounded-3xl border-2 p-4 transition ${open[i] ? "border-violet-300 bg-violet-50/50" : "border-slate-200 bg-white"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <En className="text-xl font-bold text-slate-800">{it.en}</En>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">❓ {it.q}</span>
            {open[i] ? (
              <span className="tada flex items-center gap-2">
                <Chip text={it.adj} role="adj" size="sm" label={false} />
                <span className="text-sm font-bold text-violet-700">= {it.ar} ← Adjective</span>
              </span>
            ) : (
              <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="mr-auto rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-slate-700">
                أظهر الجواب
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function NounVsAdj() {
  const [pick, setPick] = useState<Record<string, boolean>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {NA_WORDS.map((w) => {
        const c = pick[w.en];
        const done = c !== undefined;
        const right = c === w.isAdj;
        return (
          <div key={w.en} className={`rounded-3xl border-2 p-3.5 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex items-center justify-between">
              <En className="text-xl font-extrabold text-slate-800">{w.en}</En>
              <span className="text-sm text-slate-500">{w.ar}</span>
            </div>
            <div className="mt-2 flex gap-1.5">
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  onClick={() => setPick((p) => ({ ...p, [w.en]: v }))}
                  className={`flex-1 rounded-lg border-2 px-2 py-1 text-xs font-bold transition active:scale-95 ${
                    c === v ? (v ? "border-transparent bg-violet-600 text-white" : "border-transparent bg-emerald-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {v ? "Adjective" : "Noun"}
                </button>
              ))}
            </div>
            {done && <div className={`mt-1.5 text-xs font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>{right ? "✓ صحيح" : `✕ الصحيح: ${w.isAdj ? "Adjective" : "Noun"}`}</div>}
          </div>
        );
      })}
    </div>
  );
}

function Formula({ roles, example, big }: { roles: Role[]; example?: string[]; big?: boolean }) {
  const EN: Record<Role, string> = { s: "Subject", be: "am / is / are", not: "not", art: "a / an / the", adj: "Adjective", noun: "Noun" };
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5">
      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2.5">
        {roles.map((r, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="text-2xl font-bold text-slate-300">+</span>}
            <div className={`flex flex-col items-center rounded-2xl ${RS[r].solid} ${big ? "px-6 py-3" : "px-4 py-2.5"} text-white shadow`}>
              <span className={`font-en font-extrabold ${big ? "text-xl md:text-2xl" : "text-lg"}`}>{EN[r]}</span>
              <span className="text-xs font-semibold opacity-90">{ROLE_AR[r]}</span>
            </div>
          </Fragment>
        ))}
      </div>
      {example && (
        <div dir="ltr" className="mt-4 flex flex-wrap items-center justify-center gap-2 border-t border-dashed border-slate-200 pt-4">
          {example.map((w, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="text-xl font-bold text-slate-300">+</span>}
              <Chip text={w} role={roles[i]} label={false} />
            </Fragment>
          ))}
        </div>
      )}
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

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
    </div>
  );
}

function PluralAdj() {
  const [pl, setPl] = useState(false);
  const rows = [
    { sg: ["The", "boy", "is", "tall"], plu: ["The", "boys", "are", "tall"], arS: "الولد طويل.", arP: "الأولاد طويلون." },
    { sg: ["The", "car", "is", "fast"], plu: ["The", "cars", "are", "fast"], arS: "السيارة سريعة.", arP: "السيارات سريعة." },
  ];
  const roles: Role[] = ["art", "noun", "be", "adj"];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center">
        <button onClick={() => setPl((v) => !v)} className="relative flex h-11 w-60 items-center rounded-full border-2 border-slate-300 bg-white p-1">
          <span className={`absolute top-1 h-8 w-1/2 rounded-full bg-violet-600 transition-all duration-300 ${pl ? "right-1" : "right-[calc(50%-0.25rem)]"}`} />
          <span className={`relative z-10 flex-1 text-center text-xs font-bold ${!pl ? "text-white" : "text-slate-500"}`}>مفرد</span>
          <span className={`relative z-10 flex-1 text-center text-xs font-bold ${pl ? "text-white" : "text-slate-500"}`}>جمع</span>
        </button>
      </div>
      <div key={String(pl)} className="pop grid gap-3">
        {rows.map((r, i) => (
          <div key={i} className="rounded-2xl bg-white p-4">
            <PartsLine parts={(pl ? r.plu : r.sg).map((t, j) => ({ text: t, role: roles[j] }))} />
            <div className="mt-2 text-slate-500">{pl ? r.arP : r.arS}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3 text-center text-sm font-bold text-violet-800">
        لاحظ: الاسم تغيّر ✅ والفعل تغيّر ✅ — لكن الصفة بقيت كما هي!
      </div>
    </div>
  );
}

function TwoPatterns() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="mb-2 text-sm font-bold text-amber-700">① الصفة قبل الاسم</div>
        <PartsLine parts={[{ text: "a", role: "art" }, { text: "big", role: "adj" }, { text: "house", role: "noun" }]} ending="" />
        <div className="mt-2 text-slate-600">منزل كبير</div>
        <div className="mt-3 rounded-xl bg-white p-2 text-center text-xs font-bold text-amber-700">Article + Adjective + Noun</div>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
        <div className="mb-2 text-sm font-bold text-violet-700">② الصفة بعد Verb to be</div>
        <PartsLine parts={[{ text: "The", role: "art" }, { text: "house", role: "noun" }, { text: "is", role: "be" }, { text: "big", role: "adj" }]} />
        <div className="mt-2 text-slate-600">المنزل كبير.</div>
        <div className="mt-3 rounded-xl bg-white p-2 text-center text-xs font-bold text-violet-700">Subject + Verb to be + Adjective</div>
      </div>
    </div>
  );
}

function Opposites() {
  const [flip, setFlip] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {OPPOSITES.map((o, i) => {
        const f = flip[i];
        return (
          <button
            key={i}
            onClick={() => setFlip((p) => ({ ...p, [i]: !p[i] }))}
            className="rounded-3xl border-2 border-slate-200 bg-white p-4 text-center transition hover:border-violet-300 active:scale-95"
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`rounded-xl px-3 py-1.5 font-en text-xl font-extrabold transition ${!f ? "bg-violet-500 text-white" : "bg-slate-100 text-slate-400"}`}>{o.a.en}</span>
              <span className="text-xl text-slate-400">↔</span>
              <span className={`rounded-xl px-3 py-1.5 font-en text-xl font-extrabold transition ${f ? "bg-violet-500 text-white" : "bg-slate-100 text-slate-400"}`}>{o.b.en}</span>
            </div>
            <div className="mt-2 text-sm font-semibold text-slate-600">
              {o.a.ar} ↔ {o.b.ar}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function AdjBank() {
  const [sel, setSel] = useState<Adj | null>(null);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="flex flex-wrap gap-2">
        {ADJS.map((a) => (
          <button
            key={a.en}
            onClick={() => setSel(a)}
            className={`rounded-xl border-2 px-3 py-1.5 font-en font-bold transition active:scale-95 ${sel?.en === a.en ? "border-transparent bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"}`}
          >
            {a.en}
          </button>
        ))}
      </div>
      {sel && (
        <div key={sel.en} className="pop mt-4 rounded-3xl bg-white p-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <En className="text-3xl font-extrabold text-violet-700">{sel.en}</En>
            <span className="text-2xl text-slate-300">=</span>
            <span className="font-head text-2xl font-bold text-slate-800">{sel.ar}</span>
          </div>
          {sel.opp && (
            <div className="mt-2 text-sm font-bold text-slate-500">
              العكس: <En className="text-violet-600">{sel.opp}</En> ({sel.oppAr})
            </div>
          )}
          <div className="mt-3 flex justify-center">
            <PartsLine parts={[{ text: "He", role: "s" }, { text: "is", role: "be" }, { text: sel.en, role: "adj" }]} size="sm" label={false} />
          </div>
          <div className="mt-1 text-sm text-slate-500">هو {sel.ar}.</div>
        </div>
      )}
      {!sel && <div className="mt-4 text-center text-slate-400">اضغط على أي صفة لعرض تفاصيلها ✨</div>}
    </div>
  );
}

function ShortAns() {
  const items = [
    { q: ["Is", "he", "tall"], y: "Yes, he is.", n: "No, he is not.", ar: "هل هو طويل؟" },
    { q: ["Is", "she", "happy"], y: "Yes, she is.", n: "No, she is not.", ar: "هل هي سعيدة؟" },
    { q: ["Are", "they", "ready"], y: "Yes, they are.", n: "No, they are not.", ar: "هل هم جاهزون؟" },
    { q: ["Are", "you", "tired"], y: "Yes, I am.", n: "No, I am not.", ar: "هل أنت متعب؟", special: true },
  ];
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const roles: Role[] = ["be", "s", "adj"];
  return (
    <div className="grid gap-2.5">
      {items.map((it, i) => (
        <div key={i} className={`rounded-3xl border-2 p-4 transition ${open[i] ? "border-indigo-300 bg-indigo-50/50" : "border-slate-200 bg-white"}`}>
          <button onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))} className="flex w-full flex-wrap items-center gap-3 text-right">
            <PartsLine parts={it.q.map((t, j) => ({ text: t, role: roles[j] }))} ending="?" size="sm" label={false} />
            <span className="text-sm text-slate-500">{it.ar}</span>
            <span className="mr-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{open[i] ? "إخفاء" : "الإجابة"}</span>
          </button>
          {open[i] && (
            <div className="tada mt-3 flex flex-wrap gap-3">
              <span className="rounded-2xl bg-emerald-50 px-4 py-2">
                <En className="text-lg font-extrabold text-emerald-700">{it.y}</En>
              </span>
              <span className="rounded-2xl bg-rose-50 px-4 py-2">
                <En className="text-lg font-extrabold text-rose-700">{it.n}</En>
              </span>
              {it.special && <span className="self-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">⭐ نجيب بـ I وليس You</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// ورشة الجملة الوصفية
// ============================================================
type MM = "aff" | "neg" | "q";

function Machine() {
  const [si, setSi] = useState(1);
  const [ai, setAi] = useState(2);
  const [mode, setMode] = useState<MM>("aff");

  const s: Subj = SUBJECTS[si];
  const a: Adj = ADJS[ai];

  const parts: Part[] =
    mode === "q"
      ? [{ text: capBe(s.be), role: "be" }, { text: s.en === "I" ? "I" : s.en.toLowerCase(), role: "s" }, { text: a.en, role: "adj" }]
      : mode === "neg"
        ? [{ text: s.en, role: "s" }, { text: s.be, role: "be" }, { text: "not", role: "not" }, { text: a.en, role: "adj" }]
        : [{ text: s.en, role: "s" }, { text: s.be, role: "be" }, { text: a.en, role: "adj" }];

  const word = adjAr(a, s);
  const ar =
    mode === "aff"
      ? `${s.ar} ${word}.`
      : mode === "neg"
        ? `${s.ar} ${NEG_AR[s.en] ?? "ليس"} ${word}.`
        : `هل ${s.ar} ${word}؟`;

  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-sky-700">① الفاعل</div>
          <div className="flex flex-wrap gap-1.5">
            {SUBJECTS.map((x, i) => (
              <button key={x.en} onClick={() => setSi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === si ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-violet-200 bg-white p-4">
          <div className="mb-2 text-sm font-bold text-violet-700">② الصفة</div>
          <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
            {ADJS.map((x, i) => (
              <button key={x.en} onClick={() => setAi(i)} className={`rounded-lg border-2 px-2.5 py-1 font-en font-bold transition active:scale-95 ${i === ai ? "border-transparent bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-slate-500">③ الشكل:</span>
        {([["aff", "✅ إثبات"], ["neg", "🚫 نفي"], ["q", "❓ سؤال"]] as [MM, string][]).map(([m, l]) => (
          <button key={m} onClick={() => setMode(m)} className={`rounded-xl border-2 px-3.5 py-1.5 text-sm font-bold transition active:scale-95 ${mode === m ? "border-transparent bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
            {l}
          </button>
        ))}
        <button
          onClick={() => {
            setSi(Math.floor(Math.random() * SUBJECTS.length));
            setAi(Math.floor(Math.random() * ADJS.length));
          }}
          className="mr-auto rounded-xl bg-violet-600 px-3.5 py-1.5 text-sm font-bold text-white transition hover:bg-violet-700"
        >
          🎲 عشوائي
        </button>
      </div>

      <div key={`${si}-${ai}-${mode}`} className="pop mt-4 rounded-3xl border-2 border-slate-200 bg-white p-5">
        <div className="flex justify-center">
          <PartsLine parts={parts} ending={mode === "q" ? "?" : "."} size="lg" />
        </div>
        <div className="mt-3 text-center text-xl font-bold text-slate-700">{ar}</div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">الصفة لا تتغير أبدًا: {a.en}</span>
          {mode === "neg" && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">not بعد {s.be}</span>}
          {mode === "q" && <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">قلبنا الترتيب</span>}
        </div>
      </div>
    </div>
  );
}

function Journey() {
  return (
    <div className="rounded-3xl bg-slate-900 p-5 text-white">
      <div className="mb-3 font-head text-lg font-bold">🚀 أين وصلنا الآن؟</div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {JOURNEY.map((j) => (
          <div key={j.n} className="flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-violet-500 text-xs font-bold">{j.n}</span>
            <En className="text-sm font-bold">{j.en}</En>
            <span className="mr-auto text-xs text-slate-300">{j.ar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "term":
      return <Term {...b} />;
    case "adjCloud":
      return <AdjCloud />;
    case "askHow":
      return <AskHow items={b.items} />;
    case "nounVsAdj":
      return <NounVsAdj />;
    case "formula":
      return <Formula roles={b.roles} example={b.example} big={b.big} />;
    case "sentence":
      return <SentenceCard parts={b.parts} en={b.en} ar={b.ar} note={b.note} />;
    case "ok":
      return <Verdict ok en={b.en} ar={b.ar} why={b.why} />;
    case "bad":
      return <Verdict ok={false} en={b.en} ar={b.ar} why={b.why} />;
    case "note":
      return <Note emoji={b.emoji} text={b.text} />;
    case "twoPatterns":
      return <TwoPatterns />;
    case "pluralAdj":
      return <PluralAdj />;
    case "opposites":
      return <Opposites />;
    case "adjBank":
      return <AdjBank />;
    case "machine":
      return <Machine />;
    case "shortAns":
      return <ShortAns />;
    case "progress":
      return <Journey />;
  }
}

// ============================================================
// التمارين
// ============================================================

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">{n}</span>;
}

function SortNA({ ex }: { ex: Extract<Exercise, { type: "sortNA" }> }) {
  const [pick, setPick] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const done = c !== undefined;
        const right = c === it.isAdj;
        return (
          <div key={it.en} className={`rounded-3xl border-2 p-3.5 transition ${done ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <En className="text-xl font-extrabold text-slate-800">{it.en}</En>
              <span className="text-sm text-slate-400">{it.ar}</span>
              <div className="mr-auto flex gap-1.5">
                {[false, true].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setPick((p) => ({ ...p, [i]: v }))}
                    className={`rounded-lg border-2 px-3 py-1 text-xs font-bold transition active:scale-95 ${
                      c === v ? (v ? "border-transparent bg-violet-600 text-white" : "border-transparent bg-emerald-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {v ? "Adjective" : "Noun"}
                  </button>
                ))}
              </div>
            </div>
            {done && !right && <div className="mt-1.5 pr-11 text-xs font-bold text-rose-700">✕ الصحيح: {it.isAdj ? "Adjective (صفة)" : "Noun (اسم)"}</div>}
          </div>
        );
      })}
    </div>
  );
}

function ChooseEx({ ex }: { ex: Extract<Exercise, { type: "choose" }> }) {
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

function BeFill({ ex }: { ex: Extract<Exercise, { type: "beFill" }> }) {
  const [pick, setPick] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.be;
        return (
          <div key={i} className={`rounded-3xl border-2 p-3.5 transition ${c ? (right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Nub n={i + 1} />
              <div dir="ltr" className="flex items-center gap-1.5">
                <En className="text-xl font-bold text-slate-800">{it.s}</En>
                <span className={`inline-grid h-9 min-w-14 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-lg font-extrabold ${c ? (right ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>
                  {c ?? "___"}
                </span>
                <En className="text-xl font-bold text-violet-700">{it.adj}</En>
                <span className="font-en text-xl text-slate-300">.</span>
              </div>
            </div>
            <div className="mt-1.5 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-1.5 pr-11">
              {["am", "is", "are"].map((b) => (
                <button
                  key={b}
                  onClick={() => setPick((p) => ({ ...p, [i]: b }))}
                  className={`rounded-lg border-2 px-3.5 py-1 font-en font-bold transition active:scale-95 ${
                    c === b ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TransformEx({ ex }: { ex: Extract<Exercise, { type: "transform" }> }) {
  const [on, setOn] = useState<Record<number, boolean>>({});
  const isNeg = ex.mode === "neg";
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const done = on[i];
        const before: Part[] = [{ text: it.s, role: "s" }, { text: it.be, role: "be" }, { text: it.adj, role: "adj" }];
        const after: Part[] = isNeg
          ? [{ text: it.s, role: "s" }, { text: it.be, role: "be" }, { text: "not", role: "not" }, { text: it.adj, role: "adj" }]
          : [{ text: capBe(it.be), role: "be" }, { text: it.s === "I" ? "I" : it.s.toLowerCase(), role: "s" }, { text: it.adj, role: "adj" }];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${done ? (isNeg ? "border-rose-300 bg-rose-50/40" : "border-indigo-300 bg-indigo-50/40") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <PartsLine parts={done ? after : before} ending={done && !isNeg ? "?" : "."} size="sm" label={false} />
              <button
                onClick={() => setOn((o) => ({ ...o, [i]: !o[i] }))}
                className={`mr-auto rounded-xl px-4 py-1.5 text-sm font-bold text-white transition ${isNeg ? "bg-rose-600 hover:bg-rose-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                {done ? "↩ عودة" : isNeg ? "أضف not 🚫" : "اقلب ⇄"}
              </button>
            </div>
            {done && <div className="tada mt-2 pr-11 font-bold text-slate-600">{it.ar}</div>}
          </div>
        );
      })}
    </div>
  );
}

function FixEx({ ex }: { ex: Extract<Exercise, { type: "fix" }> }) {
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

function OrderEx({ ex }: { ex: Extract<Exercise, { type: "order" }> }) {
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
        <div dir="ltr" className="flex flex-wrap gap-2">
          {item.words.map((w, i) => (
            <button
              key={i}
              disabled={placed.includes(i) || reveal}
              onClick={() => setPlaced((p) => [...p, i])}
              className="rounded-xl border-2 border-slate-300 bg-white px-3.5 py-1.5 font-en text-lg font-bold text-slate-800 transition hover:border-violet-400 active:scale-95 disabled:opacity-25"
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
          <button onClick={() => { setPlaced([]); setReveal(false); }} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">
            ↺
          </button>
        </div>
      </div>
      <div key={bad ? "b" + placed.join() : "s"} dir="ltr" className={`mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-2.5 ${finished ? "border-emerald-300 bg-white" : bad ? "shake border-rose-300 bg-white" : "border-slate-300 bg-slate-50"}`}>
        {shown.length === 0 && <span className="w-full text-center text-sm text-slate-400">اضغط الكلمات بالترتيب الصحيح</span>}
        {shown.map((w, i) => (
          <button key={i} onClick={() => !reveal && setPlaced((p) => p.filter((_, j) => j !== i))} className={`rounded-xl border-2 px-3.5 py-1.5 font-en text-lg font-bold ${finished ? "border-emerald-300 bg-emerald-50 text-emerald-800" : bad ? "border-rose-300 bg-rose-50 text-rose-700" : "border-slate-300 bg-white text-slate-800"}`}>
            {w}
          </button>
        ))}
      </div>
      {finished && <div className="tada mt-2 font-bold text-emerald-700">🎉 {item.ar}</div>}
      {bad && <div className="mt-2 text-sm font-bold text-rose-600">✕ ليس بعد — اضغط كلمة لإرجاعها</div>}
    </div>
  );
}

const ROLE_OPTS: Role[] = ["s", "be", "art", "adj", "noun"];

function AnalyzeEx({ ex }: { ex: Extract<Exercise, { type: "analyze" }> }) {
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => (
        <AnalyzeRow key={i} n={i + 1} item={it} />
      ))}
    </div>
  );
}

function AnalyzeRow({ n, item }: { n: number; item: { parts: Part[]; ar: string } }) {
  const [pick, setPick] = useState<(Role | undefined)[]>(() => item.parts.map(() => undefined));
  const [checked, setChecked] = useState(false);
  const allRight = checked && pick.every((r, i) => r === item.parts[i].role);

  const cycle = (i: number) => {
    setChecked(false);
    setPick((p) => {
      const cur = p[i];
      const idx = cur ? ROLE_OPTS.indexOf(cur) : -1;
      const next = idx + 1 >= ROLE_OPTS.length ? undefined : ROLE_OPTS[idx + 1];
      const cp = [...p];
      cp[i] = next;
      return cp;
    });
  };

  return (
    <div className={`rounded-3xl border-2 p-4 transition ${allRight ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <Nub n={n} />
        <div dir="ltr" className="flex flex-wrap items-start gap-2">
          {item.parts.map((p, i) => {
            const r = pick[i];
            const right = checked && r === p.role;
            const wrong = checked && r !== p.role;
            return (
              <button
                key={i}
                onClick={() => cycle(i)}
                className={`relative flex flex-col items-center rounded-2xl border-2 px-3.5 py-2 font-en text-xl font-extrabold transition active:scale-95 ${
                  r ? RS[r].chip : "border-dashed border-slate-300 bg-white text-slate-800"
                } ${wrong ? "ring-2 ring-rose-400" : right ? "ring-2 ring-emerald-400" : ""}`}
              >
                {p.text}
                <span className="mt-0.5 text-[10px] font-bold opacity-70">{r ? ROLE_AR[r] : "اضغط"}</span>
                {checked && (
                  <span className={`absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full text-[10px] text-white ${right ? "bg-emerald-500" : "bg-rose-500"}`}>{right ? "✓" : "✕"}</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mr-auto flex gap-2">
          <button onClick={() => setChecked(true)} className="rounded-xl bg-slate-900 px-3.5 py-1.5 text-sm font-bold text-white hover:bg-slate-700">
            تحقق ✓
          </button>
          <button onClick={() => { setPick(item.parts.map((p) => p.role)); setChecked(true); }} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">
            الحل 💡
          </button>
        </div>
      </div>
      {allRight && <div className="tada mt-2 font-bold text-emerald-700">🎉 ممتاز! <span className="font-normal text-slate-500">{item.ar}</span></div>}
    </div>
  );
}

// ============================================================
// شرائح خاصة
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(76,29,149,0.3)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-violet-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-sky-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🎨</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-violet-600 px-5 py-2 text-base font-bold text-white">الدرس الخامس</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">الصفات وتكوين الجملة الوصفية</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <En>Adjectives</En> + <En>Verb to be</En>
        </p>
        <div className="pop pop-4 mt-9 flex justify-center">
          <div className="rounded-3xl border-2 border-slate-100 bg-slate-50 p-5">
            <PartsLine parts={[{ text: "She", role: "s" }, { text: "is", role: "be" }, { text: "smart", role: "adj" }]} size="lg" />
            <div className="mt-2 text-center text-slate-500">هي ذكية.</div>
          </div>
        </div>
        <p className="pop pop-5 mt-8 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "معرفة ما هي الـ [[Adjective]].",
    "التمييز بين [[Noun]] و [[Adjective]].",
    "استخدام الصفات مع [[Verb to be]].",
    "تكوين جمل وصفية صحيحة.",
    "استخدام الصفات في الإثبات والنفي والسؤال.",
    "فهم ترتيب الكلمات في الجملة الإنجليزية.",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="بنهاية الدرس يجب أن يكون الطالب قادرًا على:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${i + 1} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function IQ() {
  const [show, setShow] = useState(false);
  return (
    <Frame mascot="🏆" badge="IQ200" title="تحدي IQ200" lead="انتبه للفرق بين الجملتين:">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="mb-2 text-sm font-bold text-emerald-700">① مع اسم</div>
          <PartsLine parts={[{ text: "He", role: "s" }, { text: "is", role: "be" }, { text: "a", role: "art" }, { text: "good", role: "adj" }, { text: "teacher", role: "noun" }]} size="sm" />
          <div className="mt-2 text-slate-600">هو معلّم جيد.</div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
          <div className="mb-2 text-sm font-bold text-violet-700">② بدون اسم</div>
          <PartsLine parts={[{ text: "He", role: "s" }, { text: "is", role: "be" }, { text: "good", role: "adj" }]} size="sm" />
          <div className="mt-2 text-slate-600">هو جيد.</div>
        </div>
      </div>
      {show ? (
        <div className="tada rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
          <div className="font-head text-lg font-bold text-slate-800">💡 الخلاصة</div>
          <ul className="mt-2 space-y-1.5 text-slate-700">
            <li>• في الأولى: <En className="font-bold text-violet-700">good</En> = Adjective و <En className="font-bold text-emerald-700">teacher</En> = Noun.</li>
            <li>• في الثانية: <En className="font-bold text-violet-700">good</En> = Adjective ولا يوجد Noun بعدها.</li>
            <li className="font-bold text-amber-800">• إذن ليس كل جملة وصفية تحتاج إلى Noun.</li>
          </ul>
        </div>
      ) : (
        <button onClick={() => setShow(true)} className="w-full rounded-2xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-700">
          اكشف الخلاصة 🔍
        </button>
      )}
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس 5" lead="كل ما تعلمناه اليوم في لوحة واحدة:">
      <Term en="Adjective" ar="صفة" desc="تصف شخصًا أو شيئًا: happy · tall · big · fast" />
      <div className="grid gap-3 md:grid-cols-3">
        {[
          { t: "الإثبات", roles: ["s", "be", "adj"] as Role[], ex: ["He", "is", "tall"], c: "border-emerald-200 bg-emerald-50", tc: "text-emerald-700", end: "." },
          { t: "النفي", roles: ["s", "be", "not", "adj"] as Role[], ex: ["He", "is", "not", "tall"], c: "border-rose-200 bg-rose-50", tc: "text-rose-700", end: "." },
          { t: "السؤال", roles: ["be", "s", "adj"] as Role[], ex: ["Is", "he", "tall"], c: "border-indigo-200 bg-indigo-50", tc: "text-indigo-700", end: "?" },
        ].map((x) => (
          <div key={x.t} className={`rounded-3xl border-2 ${x.c} p-4`}>
            <div className={`mb-2 font-head text-lg font-bold ${x.tc}`}>{x.t}</div>
            <PartsLine parts={x.ex.map((t, i) => ({ text: t, role: x.roles[i] }))} ending={x.end} size="sm" label={false} />
          </div>
        ))}
      </div>
      <TwoPatterns />
      <Note emoji="⭐" text="الصفة لا تأخذ [[s]] أبدًا · ولا تأخذ [[a]] إلا إذا جاء بعدها اسم." />
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">🚀</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">أين وصلنا الآن؟</h2>
        <p className="pop pop-2 mt-2 text-lg text-slate-300">صار عند الطالب أساس حقيقي:</p>
        <div className="pop pop-3 mt-7 grid gap-2 text-right sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((j) => (
            <div key={j.n} className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-3 py-2.5 backdrop-blur">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-500 text-xs font-bold">{j.n}</span>
              <En className="text-sm font-bold">{j.en}</En>
              <span className="mr-auto text-xs text-slate-300">{j.ar}</span>
            </div>
          ))}
        </div>
        <div className="pop pop-4 mt-8 rounded-2xl border border-white/20 bg-white/5 p-4">
          <span className="text-lg font-bold">وهذا بالضبط الوقت المناسب للانتقال إلى الدرس 6: <En className="text-violet-300">Present Simple</En></span>
        </div>
        <div className="pop pop-5 mt-8">
          <button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// موجّه العرض
// ============================================================

function SlideView({ s, onExit }: { s: Slide; onExit: () => void }) {
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
    case "iq":
      return <IQ />;
    case "summary":
      return <Summary />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت الصفات والجملة الوصفية.">
          <FinalQuiz lesson={5} accent="bg-violet-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
    case "ex": {
      const ex = s.ex;
      return (
        <Frame mascot={s.mascot} badge={s.badge} title={s.title} lead={s.subtitle}>
          {ex.type === "sortNA" && <SortNA ex={ex} />}
          {ex.type === "choose" && <ChooseEx ex={ex} />}
          {ex.type === "beFill" && <BeFill ex={ex} />}
          {ex.type === "transform" && <TransformEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "order" && <OrderEx ex={ex} />}
          {ex.type === "analyze" && <AnalyzeEx ex={ex} />}
        </Frame>
      );
    }
  }
}

function slideTitle(s: Slide): string {
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
  "ما هي الصفة": "text-violet-600",
  الاستخدام: "text-sky-600",
  "النفي والسؤال": "text-rose-600",
  "قاموس الصفات": "text-emerald-600",
  الترتيب: "text-amber-600",
  الورشة: "text-indigo-600",
  التمارين: "text-fuchsia-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 5 · الصفات</div>
        <En className="text-xs font-semibold text-slate-400">Adjectives + Verb to be</En>
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
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-violet-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
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

export default function Lesson5({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l5-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f7f5fc] text-slate-800">
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
                <div className="h-full rounded-full bg-gradient-to-l from-violet-500 via-fuchsia-400 to-sky-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>
          <main id="l5-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
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
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-violet-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-violet-700 disabled:opacity-30">
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
