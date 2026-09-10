import { Fragment, useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  USES,
  SIGNALS,
  LADDER,
  CONJ_TABS,
  VOWEL_Y,
  DETECTIVE_TEXT,
  DETECTIVE_Q,
  ROLE8_AR,
  type Slide8,
  type Block8,
  type Part8,
  type Role8,
  type Ex8,
  type IQItem,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";

// ============================================================
// النمط F — كحلي + كهرماني (بطولة المراجعة)
// ============================================================
const RS: Record<Role8, { chip: string; solid: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", solid: "bg-sky-500", text: "text-sky-700" },
  v: { chip: "bg-indigo-100 border-indigo-300 text-indigo-900", solid: "bg-indigo-600", text: "text-indigo-700" },
  aux: { chip: "bg-violet-100 border-violet-300 text-violet-900", solid: "bg-violet-600", text: "text-violet-700" },
  nt: { chip: "bg-rose-100 border-rose-300 text-rose-900", solid: "bg-rose-500", text: "text-rose-700" },
  o: { chip: "bg-slate-100 border-slate-300 text-slate-800", solid: "bg-slate-500", text: "text-slate-600" },
  adv: { chip: "bg-amber-100 border-amber-300 text-amber-900", solid: "bg-amber-500", text: "text-amber-700" },
};

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span dir="ltr" className={`font-en ${className}`}>{children}</span>;
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((x, i) => {
        const m = x.match(/^\[\[(.+)\]\]$/);
        return m ? (
          <span key={i} dir="ltr" className="font-en mx-1 rounded-lg bg-slate-900/5 px-1.5 py-0.5 font-bold text-slate-800">
            {m[1]}
          </span>
        ) : (
          <Fragment key={i}>{x}</Fragment>
        );
      })}
    </span>
  );
}

function PartsLine({ parts, q, size = "md", label = true }: { parts: Part8[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 ${RS[p.role].chip} ${sz} font-en font-extrabold leading-tight`}>
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{ROLE8_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function SentenceCard({ parts, ar, note, q }: { parts: Part8[]; ar: string; note?: string; q?: boolean }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} q={q} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg text-slate-500">{ar}</span>
        {note && <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-bold text-indigo-700">📌 {note}</span>}
      </div>
    </div>
  );
}

function Frame({ mascot, step, badge, title, lead, children, tip }: { mascot: string; step?: string; badge?: string; title: React.ReactNode; lead?: React.ReactNode; children: React.ReactNode; tip?: string }) {
  return (
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(79,70,229,0.3)] md:p-9">
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>{mascot}</div>
      <div className="flex items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-bold text-indigo-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-3xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-indigo-700 to-violet-700 p-4 text-white">
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
// ودجات المراجعة
// ============================================================

function Uses() {
  const [i, setI] = useState(0);
  const u = USES[i];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {USES.map((x, xi) => (
          <button key={x.en} onClick={() => setI(xi)} className={`rounded-2xl border-2 p-3 text-center transition active:scale-95 ${xi === i ? "border-indigo-400 bg-white shadow" : "border-slate-200 bg-white/60 hover:bg-white"}`}>
            <div className="text-3xl">{x.emoji}</div>
            <div className={`mt-1 text-sm font-bold ${xi === i ? "text-indigo-700" : "text-slate-600"}`}>{x.ar}</div>
            <En className="text-xs font-bold text-slate-400">{x.en}</En>
          </button>
        ))}
      </div>
      <div key={i} className="pop mt-4">
        <div className="mb-3 text-center font-bold text-slate-600">{u.desc}</div>
        <div className="grid gap-2.5">
          {u.sents.map((s, si) => (
            <SentenceCard key={si} parts={s.parts} ar={s.ar} note={s.mark} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Signals() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      {SIGNALS.map((w, i) => (
        <span key={w.en} className={`rounded-2xl border-2 px-3.5 py-2 shadow-sm anim-float ${w.freq ? "border-amber-200 bg-white" : "border-indigo-200 bg-white"}`} style={{ animationDelay: `${(i % 6) * 0.25}s` }}>
          <En className={`text-lg font-extrabold ${w.freq ? "text-amber-700" : "text-indigo-700"}`}>{w.en}</En>
          <span className="mr-2 text-sm text-slate-500">{w.ar}</span>
        </span>
      ))}
    </div>
  );
}

function Ladder() {
  const [i, setI] = useState(0);
  const a = LADDER[i];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-2">
        {LADDER.map((x, xi) => (
          <button key={x.en} onClick={() => setI(xi)} className={`flex items-center gap-3 rounded-2xl border-2 p-2.5 text-right transition ${xi === i ? "border-amber-300 bg-white shadow" : "border-transparent bg-white/60 hover:bg-white"}`}>
            <En className={`w-24 shrink-0 text-lg font-extrabold ${xi === i ? "text-amber-700" : "text-slate-600"}`}>{x.en}</En>
            <span className="w-16 shrink-0 text-sm font-bold text-slate-500">{x.ar}</span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
              <span className="block h-full rounded-full bg-gradient-to-l from-amber-500 to-indigo-500 transition-all duration-500" style={{ width: `${x.pct}%` }} />
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

function Groups() {
  const [g, setG] = useState<0 | 1>(0);
  const left = ["I", "You", "We", "They"];
  const right = ["He", "She", "It"];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setG(0)} className={`rounded-xl border-2 px-4 py-2 font-en font-bold transition ${g === 0 ? "border-transparent bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>I / You / We / They</button>
        <button onClick={() => setG(1)} className={`rounded-xl border-2 px-4 py-2 font-en font-bold transition ${g === 1 ? "border-transparent bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>He / She / It</button>
      </div>
      <div key={g} className="pop grid gap-2">
        {(g === 0 ? left : right).map((s) => (
          <div key={s} className="flex items-center justify-between rounded-2xl bg-white px-4 py-2.5">
            <En className="text-xl font-extrabold text-slate-800">{s} {g === 0 ? "explore" : "explores"} the garden.</En>
            <span className="text-sm text-slate-500">{g === 0 ? "الفعل الأساسي" : "+ s"}</span>
          </div>
        ))}
      </div>
      <div className={`mt-3 rounded-2xl p-3 text-center text-sm font-bold ${g === 0 ? "bg-sky-100 text-sky-800" : "bg-indigo-100 text-indigo-800"}`}>
        {g === 0 ? "I / You / We / They ← base verb" : "He / She / It ← s / es / ies"}
      </div>
    </div>
  );
}

function ConjTabs() {
  const [t, setT] = useState(0);
  const d = CONJ_TABS[t];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        {CONJ_TABS.map((x, xi) => (
          <button key={x.id} onClick={() => setT(xi)} className={`rounded-xl border-2 px-5 py-2 font-en text-lg font-extrabold transition active:scale-95 ${t === xi ? "border-transparent bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>+ {x.id}</button>
        ))}
      </div>
      <div key={t} className="pop">
        <div className="mb-3 text-center font-bold text-slate-700">{d.title}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {d.rows.map(([a, b]) => (
            <div key={a} className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2">
              <En className="text-lg font-bold text-slate-600">{a}</En>
              <span className="text-indigo-500">→</span>
              <En className="text-lg font-extrabold text-indigo-700">{b}</En>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-white p-3 text-center">
          <En className="text-lg font-extrabold text-slate-800">{d.ex.en}</En>
          <div className="text-sm text-slate-500">{d.ex.ar}</div>
        </div>
        <div className="mt-2 rounded-2xl bg-indigo-50 p-2.5 text-center text-sm font-bold text-indigo-800">{d.note}</div>
      </div>
    </div>
  );
}

function VowelY() {
  return (
    <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/60 p-5">
      <div className="mb-3 text-center font-bold text-slate-700">⚠️ قبل y حرف متحرك (a · e · i · o · u) ← نضيف s فقط</div>
      <div className="grid gap-2 sm:grid-cols-3">
        {VOWEL_Y.map(([a, b]) => (
          <div key={a} className="flex items-center justify-center gap-2 rounded-2xl bg-white px-3 py-2">
            <En className="font-bold text-slate-600">{a}</En>
            <span className="text-rose-500">→</span>
            <En className="font-extrabold text-rose-700">{b}</En>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center">
        <En className="text-lg font-extrabold text-slate-800">Rami plays chess on weekends.</En>
        <div className="text-sm text-slate-500">رامي يلعب الشطرنج في عطلة نهاية الأسبوع.</div>
      </div>
    </div>
  );
}

function TravelS() {
  const [st, setSt] = useState<0 | 1 | 2>(0);
  const steps = [
    { en: "She paints pictures.", ar: "هي ترسم اللوحات. (الـ s مع الفعل)", hi: "s-verb" },
    { en: "Does she paint pictures?", ar: "هل ترسم اللوحات؟ (الـ s انتقلت إلى Does)", hi: "s-does" },
    { en: "She doesn't paint pictures.", ar: "هي لا ترسم اللوحات. (doesn't تحمل القوة)", hi: "s-nt" },
  ];
  const cur = steps[st];
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5 text-center">
      <div className="mb-4 flex justify-center gap-2">
        {["الإثبات", "السؤال", "النفي"].map((l, i) => (
          <button key={l} onClick={() => setSt(i as 0 | 1 | 2)} className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition ${st === i ? "border-transparent bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{l}</button>
        ))}
      </div>
      <div key={st} className="pop rounded-3xl bg-white p-6">
        <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
          {st === 0 && (<><EnChip t="She" c="sky" /><EnChip t="paint" c="slate" /><span className="tada font-en rounded-xl bg-indigo-600 px-2 py-1 text-2xl font-extrabold text-white">s</span><EnChip t="pictures." c="slate" /></>)}
          {st === 1 && (<><span className="tada font-en rounded-xl bg-indigo-600 px-3 py-1.5 text-2xl font-extrabold text-white">Does</span><EnChip t="she" c="sky" /><EnChip t="paint" c="slate" dim /><EnChip t="pictures?" c="slate" /></>)}
          {st === 2 && (<><EnChip t="She" c="sky" /><span className="tada font-en rounded-xl bg-rose-500 px-3 py-1.5 text-2xl font-extrabold text-white">doesn't</span><EnChip t="paint" c="slate" dim /><EnChip t="pictures." c="slate" /></>)}
        </div>
        <div className="mt-3 font-bold text-slate-600">{cur.ar}</div>
      </div>
      <div className="mt-3 text-sm font-bold text-indigo-700">does + play — وليس does + plays ✅</div>
    </div>
  );
}

function EnChip({ t, c, dim }: { t: string; c: "sky" | "slate"; dim?: boolean }) {
  return <span className={`font-en rounded-xl px-3 py-1.5 text-2xl font-extrabold ${c === "sky" ? "bg-sky-100 text-sky-800" : "bg-slate-100 text-slate-700"} ${dim ? "opacity-70" : ""}`}>{t}</span>;
}

function AdvPlace() {
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-4">
        <div className="mb-2 text-sm font-bold text-amber-700">مع الأفعال العادية ← قبل الفعل الرئيسي</div>
        <div className="grid gap-2">
          {[
            { en: "I always pack my lunch.", ar: "أنا دائمًا أجهّز غدائي." },
            { en: "She usually arrives early.", ar: "هي عادةً تصل باكرًا." },
            { en: "Mona never skips breakfast.", ar: "منى لا تفوّت الفطور أبدًا." },
          ].map((x) => (
            <div key={x.en} className="rounded-2xl bg-white p-3"><En className="text-lg font-extrabold text-slate-800">{x.en}</En><div className="text-sm text-slate-500">{x.ar}</div></div>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/60 p-4">
        <div className="mb-2 text-sm font-bold text-indigo-700">مع Verb to be ← بعد am / is / are (استثناء مهم!)</div>
        <div className="grid gap-2">
          {[
            { en: "She is always polite.", ar: "هي دائمًا مهذبة." },
            { en: "They are usually quiet.", ar: "هم عادةً هادئون." },
            { en: "He is often tired.", ar: "هو غالبًا متعب." },
          ].map((x) => (
            <div key={x.en} className="rounded-2xl bg-white p-3"><En className="text-lg font-extrabold text-slate-800">{x.en}</En><div className="text-sm text-slate-500">{x.ar}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EveryTrap() {
  const [t, setT] = useState<0 | 1>(0);
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="mb-4 flex justify-center gap-2">
        <button onClick={() => setT(0)} className={`rounded-xl border-2 px-4 py-2 font-en font-extrabold transition ${t === 0 ? "border-transparent bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>every day</button>
        <button onClick={() => setT(1)} className={`rounded-xl border-2 px-4 py-2 font-en font-extrabold transition ${t === 1 ? "border-transparent bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}>everyday</button>
      </div>
      <div key={t} className="pop rounded-3xl bg-white p-5 text-center">
        {t === 0 ? (
          <>
            <En className="text-3xl font-extrabold text-indigo-700">every day</En>
            <div className="mt-1 font-bold text-slate-600">= كل يوم (عبارة زمنية — كلمتان)</div>
            <div className="mt-3 rounded-2xl bg-slate-50 p-3"><En className="text-xl font-extrabold text-slate-800">I practice the piano every day.</En><div className="text-sm text-slate-500">أنا أتدرب على البيانو كل يوم.</div></div>
            <div className="mt-2 text-sm text-slate-400">نسأل: <En>When do I practice?</En> ← <En>Every day.</En></div>
          </>
        ) : (
          <>
            <En className="text-3xl font-extrabold text-amber-600">everyday</En>
            <div className="mt-1 font-bold text-slate-600">= يومي / اعتيادي (صفة — كلمة واحدة)</div>
            <div className="mt-3 grid gap-2">
              <div className="rounded-2xl bg-slate-50 p-3"><En className="text-xl font-extrabold text-slate-800">These are my everyday shoes.</En><div className="text-sm text-slate-500">هذه أحذيتي اليومية.</div></div>
              <div className="rounded-2xl bg-slate-50 p-3"><En className="text-xl font-extrabold text-slate-800">Walking is an everyday activity for him.</En><div className="text-sm text-slate-500">المشي نشاط يومي بالنسبة له.</div></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GoldenRule() {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 text-center text-white">
      <div className="text-sm font-bold text-amber-400">🏅 قاعدة الدرس الذهبية</div>
      <div className="font-head mt-2 text-2xl font-bold">إذا رأيت He / She / It فاسأل: هل توجد does أو doesn't؟</div>
      <div className="mt-4 grid gap-3 text-right md:grid-cols-2">
        <div className="rounded-2xl bg-white/10 p-4"><div className="font-bold text-emerald-300">لا توجد ← أحتاج s / es / ies</div><En className="mt-1 block text-lg font-extrabold">She writes.</En></div>
        <div className="rounded-2xl bg-white/10 p-4"><div className="font-bold text-rose-300">توجد ← الفعل أساسي</div><En className="mt-1 block text-lg font-extrabold">Does she write? / She doesn't write.</En></div>
      </div>
    </div>
  );
}

function BlockView({ b }: { b: Block8 }) {
  switch (b.type) {
    case "text": return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "sentence": return <SentenceCard parts={b.parts} ar={b.ar} note={b.note} q={b.q} />;
    case "ok": return <Verdict ok en={b.en} ar={b.ar} />;
    case "bad": return <Verdict ok={false} en={b.en} why={b.why} />;
    case "note": return <Note emoji={b.emoji} text={b.text} />;
    case "uses": return <Uses />;
    case "signals": return <Signals />;
    case "ladder": return <Ladder />;
    case "groups": return <Groups />;
    case "conjTabs": return <ConjTabs />;
    case "vowelY": return <VowelY />;
    case "travelS": return <TravelS />;
    case "advPlace": return <AdvPlace />;
    case "everyTrap": return <EveryTrap />;
    case "goldenRule": return <GoldenRule />;
    case "chain": return null;
  }
}

// ============================================================
// التمارين
// ============================================================
function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">{n}</span>;
}

function OptBtn({ o, st }: { o: string; st: "idle" | "right" | "wrong" | "dim" }) {
  const cls = st === "right" ? "border-transparent bg-emerald-600 text-white" : st === "wrong" ? "border-transparent bg-rose-600 text-white" : st === "dim" ? "border-slate-200 bg-white text-slate-300" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
  return <span className={`rounded-xl border-2 px-4 py-2 font-en text-lg font-bold transition ${cls}`}>{o}</span>;
}

function ChooseEx({ ex }: { ex: Extract<Ex8, { type: "choose" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3"><Nub n={i + 1} /><En className="text-lg font-bold text-slate-800">{it.stem}</En><span className="text-sm text-slate-400">{it.ar}</span></div>
            <div className="mt-2.5 flex flex-wrap gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))}><OptBtn o={o} st={c === undefined ? "idle" : oi === it.answer ? "right" : c === oi ? "wrong" : "dim"} /></button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ConjEx({ ex }: { ex: Extract<Ex8, { type: "conj" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2"><Nub n={i + 1} />
              <span dir="ltr" className="flex items-center gap-1.5">
                <En className="text-lg font-bold text-slate-800">{it.before}</En>
                <span className={`inline-grid h-9 min-w-20 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-base font-extrabold ${c !== undefined ? (c === it.answer ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>{c !== undefined ? it.opts[c] : "___"}</span>
                <En className="text-lg font-bold text-slate-800">{it.after}</En>
              </span>
              <En className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600">({it.ar})</En>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))}><OptBtn o={o} st={c === undefined ? "idle" : oi === it.answer ? "right" : c === oi ? "wrong" : "dim"} /></button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DoDoesEx({ ex }: { ex: Extract<Ex8, { type: "doDoes" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2"><Nub n={i + 1} />
              <span dir="ltr" className="flex items-center gap-1.5">
                <span className={`inline-grid h-9 min-w-16 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-base font-extrabold ${c !== undefined ? (c === it.answer ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>{c !== undefined ? (c === 0 ? "Do" : "Does") : "___"}</span>
                <En className="text-lg font-bold text-slate-800">{it.rest}</En>
              </span>
            </div>
            <div className="mt-1 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-2 pr-11">
              {["Do", "Does"].map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))}><OptBtn o={o} st={c === undefined ? "idle" : oi === it.answer ? "right" : c === oi ? "wrong" : "dim"} /></button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DontEx({ ex }: { ex: Extract<Ex8, { type: "dont" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2"><Nub n={i + 1} />
              <span dir="ltr" className="flex items-center gap-1.5">
                <En className="text-lg font-bold text-slate-800">{it.s}</En>
                <span className={`inline-grid h-9 min-w-20 place-items-center rounded-lg border-2 border-dashed px-2 font-en text-base font-extrabold ${c !== undefined ? (c === it.answer ? "border-emerald-400 bg-emerald-100 text-emerald-800" : "border-rose-400 bg-rose-100 text-rose-800") : "border-slate-300 text-slate-300"}`}>{c !== undefined ? (c === 0 ? "don't" : "doesn't") : "___"}</span>
                <En className="text-lg font-bold text-slate-800">{it.rest}</En>
              </span>
            </div>
            <div className="mt-1 pr-11 text-xs text-slate-400">{it.ar}</div>
            <div className="mt-2 flex gap-2 pr-11">
              {["don't", "doesn't"].map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))}><OptBtn o={o} st={c === undefined ? "idle" : oi === it.answer ? "right" : c === oi ? "wrong" : "dim"} /></button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FixEx({ ex }: { ex: Extract<Ex8, { type: "fix" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
          <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
          {show[i] ? (
            <div className="tada flex flex-wrap items-center gap-2"><En className="text-lg font-extrabold text-emerald-700">→ {it.correct}</En><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{it.why}</span></div>
          ) : (
            <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-emerald-700">الحل 💡</button>
          )}
        </div>
      ))}
    </div>
  );
}

function ChainT({ ex }: { ex: Extract<Ex8, { type: "chainT" }> }) {
  const [st, setSt] = useState<Record<number, number>>({});
  const labels = ["① النفي", "② السؤال", "③ إجابة Yes", "④ إجابة No"];
  return (
    <div className="grid gap-4">
      {ex.items.map((it, i) => {
        const s = st[i] ?? 0;
        const vals = [it.neg, it.q, it.yes, it.no];
        return (
          <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-3"><Nub n={i + 1} /><En className="text-xl font-extrabold text-slate-900">{it.aff}</En><span className="text-sm text-slate-400">{it.affAr}</span></div>
            <div className="mt-3 grid gap-2">
              {vals.slice(0, s).map((v, vi) => (
                <div key={vi} className="tada flex flex-wrap items-center gap-3 rounded-2xl bg-slate-50 p-3">
                  <span className="rounded-lg bg-white px-2 py-0.5 text-xs font-bold text-slate-500 shadow-sm">{labels[vi]}</span>
                  <En className="text-lg font-extrabold text-indigo-700">{v}</En>
                </div>
              ))}
            </div>
            {s < 4 ? (
              <button onClick={() => setSt((p) => ({ ...p, [i]: s + 1 }))} className="mt-3 w-full rounded-xl bg-indigo-600 py-2.5 font-bold text-white transition hover:bg-indigo-700">اكشف: {labels[s]} ↓</button>
            ) : (
              <button onClick={() => setSt((p) => ({ ...p, [i]: 0 }))} className="mt-3 w-full rounded-xl bg-slate-100 py-2 font-bold text-slate-600 transition hover:bg-slate-200">↺ إخفاء وإعادة المحاولة</button>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AdvEx({ ex }: { ex: Extract<Ex8, { type: "adv" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3"><Nub n={i + 1} /><En className="text-lg font-bold text-slate-800">{it.stem}</En><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">💭 {it.ar}</span></div>
            <div className="mt-2.5 flex gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button key={o} onClick={() => setPick((p) => ({ ...p, [i]: oi }))}><OptBtn o={o} st={c === undefined ? "idle" : oi === it.answer ? "right" : c === oi ? "wrong" : "dim"} /></button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function cap1(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

function OrderRow({ item }: { item: Extract<IQItem, { kind: "order" }> }) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [reveal, setReveal] = useState(false);
  const done = placed.length === item.words.length;
  const built = placed.map((i) => item.words[i]);
  const ok = done && built.join(" ").toLowerCase() === item.correct.join(" ").toLowerCase();
  const bad = done && !ok;
  const shown = reveal ? item.correct : built;
  const fin = ok || reveal;
  return (
    <div>
      <div dir="ltr" className="flex flex-wrap gap-2">
        {item.words.map((w, i) => (
          <button key={i} disabled={placed.includes(i) || reveal} onClick={() => setPlaced((p) => [...p, i])} className="rounded-xl border-2 border-slate-300 bg-white px-3.5 py-1.5 font-en text-lg font-bold text-slate-800 transition hover:border-indigo-400 active:scale-95 disabled:opacity-25">{w}</button>
        ))}
        {!fin && <button onClick={() => setReveal(true)} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">الحل 💡</button>}
        <button onClick={() => { setPlaced([]); setReveal(false); }} className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-200">↺</button>
      </div>
      <div dir="ltr" className={`mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-2.5 ${fin ? "border-emerald-300 bg-white" : bad ? "shake border-rose-300 bg-white" : "border-slate-300 bg-slate-50"}`}>
        {shown.length === 0 && <span className="w-full text-center text-sm text-slate-400">اضغط الكلمات بالترتيب الصحيح</span>}
        {shown.map((w, i) => (
          <button key={i} onClick={() => !reveal && setPlaced((p) => p.filter((_, j) => j !== i))} className={`rounded-xl border-2 px-3.5 py-1.5 font-en text-lg font-bold ${fin ? "border-emerald-300 bg-emerald-50 text-emerald-800" : bad ? "border-rose-300 bg-rose-50 text-rose-700" : "border-slate-300 bg-white text-slate-800"}`}>{i === 0 ? cap1(w) : w}</button>
        ))}
        {shown.length > 0 && <span className="font-en text-xl font-bold text-slate-300">.</span>}
      </div>
      {fin && <div className="tada mt-2 font-bold text-emerald-700">🎉 <En>{cap1(item.correct.join(" "))}.</En> <span className="font-normal text-slate-500">{item.ar}</span></div>}
      {bad && <div className="mt-2 text-sm font-bold text-rose-600">✕ ليس بعد — تذكر مكان usually</div>}
    </div>
  );
}

function IQEx({ ex }: { ex: Extract<Ex8, { type: "iq" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start gap-3"><Nub n={i + 1} /><span className="flex-1 text-lg font-bold text-slate-800">{it.kind === "mcq" || it.kind === "explain" || it.kind === "spot" ? it.q : it.kind === "order" ? "رتّب الكلمات:" : ""}</span></div>
          <div className="mt-3 pr-11">
            {it.kind === "mcq" && (
              <>
                <div className="grid gap-2">
                  {it.opts.map((o, oi) => {
                    const c = pick[i];
                    return <button key={oi} onClick={() => setPick((p) => ({ ...p, [i]: oi }))} className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-2.5 text-right transition active:scale-[0.99] ${c === undefined ? "border-slate-200 bg-white hover:border-indigo-400" : oi === it.answer ? "border-transparent bg-emerald-600 text-white" : c === oi ? "border-transparent bg-rose-600 text-white" : "border-slate-200 bg-white text-slate-300"}`}><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/25 font-en text-sm font-bold">{oi + 1}</span><En className="text-lg font-bold">{o}</En></button>;
                  })}
                </div>
                {pick[i] !== undefined && <div className={`mt-2 text-sm font-bold ${pick[i] === it.answer ? "text-emerald-700" : "text-rose-600"}`}>{pick[i] === it.answer ? "✓ " : "✕ "}{it.why}</div>}
              </>
            )}
            {it.kind === "explain" && (
              open[i] ? (
                <div className="tada rounded-2xl bg-indigo-50 p-4"><div className="font-extrabold text-rose-600">{it.verdict} ❌</div><div className="mt-1 font-bold text-slate-700">{it.why}</div></div>
              ) : (
                <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">فكّر ثم اكشف الشرح 🔍</button>
              )
            )}
            {it.kind === "order" && <OrderRow item={it} />}
            {it.kind === "spot" && (
              open[i] ? (
                <div className="tada rounded-2xl bg-emerald-50 p-4"><En className="text-xl font-extrabold text-emerald-700">{it.answer}</En><div className="mt-1 font-bold text-slate-700">{it.why}</div></div>
              ) : (
                <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">اكشف الخطأ 🔍</button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Detective() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const verbs = ["wakes up", "feeds", "doesn't feed", "doesn't like", "walk", "takes"];
  return (
    <div className="grid gap-3">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/60 p-5">
        <div className="mb-2 text-sm font-bold text-indigo-700">🕵️ اقرأ الفقرة كمحقق لغوي:</div>
        <p dir="ltr" className="font-en rounded-2xl bg-white p-4 text-left text-lg font-bold leading-relaxed text-slate-800">{DETECTIVE_TEXT}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {verbs.map((v) => (
            <span key={v} dir="ltr" className="font-en rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-extrabold text-white">{v}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        {DETECTIVE_Q.map((x, i) => (
          <div key={i} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3.5">
            <Nub n={i + 1} />
            <span className="font-bold text-slate-700">{x.q}</span>
            {open[i] ? (
              <span className="tada rounded-xl bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-800">{x.a}</span>
            ) : (
              <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="mr-auto rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-slate-700">الجواب 🔍</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TFEx({ ex }: { ex: Extract<Ex8, { type: "tf" }> }) {
  const [pick, setPick] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.ok;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3"><Nub n={i + 1} /><En className="text-lg font-bold text-slate-800">{it.en}</En>
              <div className="mr-auto flex gap-2">
                <button onClick={() => setPick((p) => ({ ...p, [i]: true }))} className={`rounded-xl border-2 px-4 py-1.5 text-sm font-bold transition active:scale-95 ${c === true ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600"}`}>✓ صح</button>
                <button onClick={() => setPick((p) => ({ ...p, [i]: false }))} className={`rounded-xl border-2 px-4 py-1.5 text-sm font-bold transition active:scale-95 ${c === false ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600"}`}>✕ خطأ</button>
              </div>
            </div>
            {c !== undefined && <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>{it.why}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// شرائح خاصة
// ============================================================
function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center md:p-14 shadow-[0_14px_44px_-20px_rgba(79,70,229,0.35)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-indigo-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-amber-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🧠</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-indigo-600 px-5 py-2 text-base font-bold text-white">الدرس الثامن · مستوى IQ200</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">مراجعة شاملة للمضارع البسيط</h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500"><En>Present Simple · Full Review</En></p>
        <p className="pop pop-4 mx-auto mt-4 max-w-xl text-lg text-slate-600">اليوم لن نضيف زمنًا جديدًا — سنجمع كل القواعد ونختبر: هل تتحكم بالمضارع البسيط أم تحفظه فقط؟</p>
        <div className="pop pop-5 mt-8 flex flex-wrap justify-center gap-2">
          {["العادات", "s / es / ies", "do / does", "النفي", "السؤال", "every day"].map((t) => (
            <span key={t} className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-bold text-indigo-700">{t}</span>
          ))}
        </div>
        <p className="pop pop-6 mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const goals = [
    "معرفة متى نستخدم [[Present Simple]].", "التعرف على الكلمات الدالة عليه.",
    "اختيار الفعل الصحيح مع [[I / You / We / They]] ومع [[He / She / It]].",
    "استخدام [[s / es / ies]] و [[do / does]] و [[don't / doesn't]] بشكل صحيح.",
    "فهم لماذا يعود الفعل أساسيًا بعد [[does / doesn't]].",
    "وضع كلمات التكرار في مكانها الصحيح والتمييز بين [[every day]] و [[everyday]].",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="في نهاية الدرس يجب أن تكون قادرًا على:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Challenge() {
  const [chk, setChk] = useState<Record<number, boolean>>({});
  const [txt, setTxt] = useState("");
  const reqs = ["جملة فيها always", "جملة فيها usually", "جملة فيها sometimes", "جملة فيها never", "جملة منفية بـ doesn't", "سؤال بـ Does", "فعل + s", "فعل + es", "فعل + ies", "لا أنسخ أمثلة الدرس"];
  const done = reqs.filter((_, i) => chk[i]).length;
  const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
  return (
    <Frame mascot="🏆" badge="تحدي الأستاذ · IQ200+" title="اكتب فقرة من 6 جمل عن Alex" lead="شخص خيالي — تحقق من كل شرط بعد كتابته:">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-5">
        <div className="mb-2 text-sm font-bold text-amber-700">مثال لنوع المطلوب فقط (ليس حلًا): <En>Alex usually ...</En></div>
        <div className="grid gap-2 sm:grid-cols-2">
          {reqs.map((r, i) => (
            <button key={r} onClick={() => setChk((c) => ({ ...c, [i]: !c[i] }))} className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 text-right text-sm font-bold transition active:scale-95 ${chk[i] ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-600"}`}>
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs text-white ${chk[i] ? "bg-emerald-500" : "bg-slate-300"}`}>{chk[i] ? "✓" : ""}</span>{r}
            </button>
          ))}
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white"><div className="h-full bg-emerald-500 transition-all" style={{ width: `${(done / reqs.length) * 100}%` }} /></div>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <div className="mb-2 flex items-center justify-between"><span className="text-sm font-bold text-slate-500">مسودة الفقرة (تُحفظ في الصفحة فقط)</span><span className="text-xs font-bold text-slate-400">{words} كلمة</span></div>
        <textarea dir="ltr" value={txt} onChange={(e) => setTxt(e.target.value)} rows={5} placeholder="Alex usually wakes up early. He always..." className="font-en w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left outline-none focus:border-indigo-400" />
      </div>
      {done === reqs.length && <div className="tada rounded-3xl bg-emerald-500 p-4 text-center text-lg font-extrabold text-white">🏆 مذهل! حققت كل الشروط — اعرض فقرتك على الأستاذ.</div>}
    </Frame>
  );
}

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس" lead="كل المضارع البسيط في لوحة واحدة:">
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4"><div className="font-head font-bold text-sky-800">I / You / We / They</div><En className="mt-1 block font-bold text-slate-700">play · don't play · Do ... play?</En></div>
        <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4"><div className="font-head font-bold text-indigo-800">He / She / It</div><En className="mt-1 block font-bold text-slate-700">plays · doesn't play · Does ... play?</En></div>
      </div>
      <Note emoji="⭐" text="بعد [[do / does / don't / doesn't]] يأتي الفعل الأساسي دائمًا." />
      <Note emoji="⭐" text="كلمات التكرار قبل الفعل الرئيسي — لكن بعد [[am / is / are]]." />
      <Note emoji="⭐" text="[[every day]] = كل يوم · [[everyday]] = يومي / اعتيادي." />
      <GoldenRule />
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-amber-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop text-6xl anim-drift">⏭️</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">الدرس القادم: Present Continuous</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-xl text-lg text-slate-300">سنبدأ بمقارنة ذكية بين <En className="font-bold text-indigo-300">I play</En> و <En className="font-bold text-indigo-300">I am playing</En> — أحد أهم مفاتيح فهم الأزمنة.</p>
        <div className="pop pop-3 mt-6 flex justify-center gap-3">
          <div className="rounded-2xl bg-white/10 px-5 py-3"><En className="font-bold">I play</En><div className="text-xs text-slate-400">عادة</div></div>
          <div className="rounded-2xl bg-white/10 px-5 py-3"><En className="font-bold">I am playing</En><div className="text-xs text-slate-400">الآن</div></div>
        </div>
        <div className="pop pop-4 mt-8"><button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">جميع الدروس</button></div>
      </div>
    </section>
  );
}

function SlideView({ s, onExit }: { s: Slide8; onExit: () => void }) {
  switch (s.kind) {
    case "cover": return <Cover />;
    case "objectives": return <Objectives />;
    case "lesson":
      return (
        <Frame mascot={s.mascot} step={s.step} title={s.title} lead={s.lead} tip={s.tip}>
          {s.blocks.map((b, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}><BlockView b={b} /></div>
          ))}
        </Frame>
      );
    case "challenge": return <Challenge />;
    case "summary": return <Summary />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="12 سؤالًا جديدًا" title={s.title} lead="أسئلة جديدة كليًا — أجب ثم اعرض النتيجة:">
          <FinalQuiz lesson={8} accent="bg-indigo-600" />
        </Frame>
      );
    case "closing": return <Closing onExit={onExit} />;
    case "ex": {
      const ex = s.ex;
      return (
        <Frame mascot={s.mascot} badge={s.badge} title={s.title} lead={s.subtitle}>
          {ex.type === "choose" && <ChooseEx ex={ex} />}
          {ex.type === "conj" && <ConjEx ex={ex} />}
          {ex.type === "doDoes" && <DoDoesEx ex={ex} />}
          {ex.type === "dont" && <DontEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
          {ex.type === "chainT" && <ChainT ex={ex} />}
          {ex.type === "adv" && <AdvEx ex={ex} />}
          {ex.type === "iq" && <IQEx ex={ex} />}
          {ex.type === "detective" && <Detective />}
          {ex.type === "tf" && <TFEx ex={ex} />}
        </Frame>
      );
    }
  }
}

function slideTitle(s: Slide8): string {
  switch (s.kind) { case "cover": return "الغلاف"; case "objectives": return "أهداف الدرس"; default: return s.title; }
}

const SEC_C: Record<string, string> = { البداية: "text-slate-400", المراجعة: "text-indigo-600", الفخاخ: "text-rose-600", المستويات: "text-amber-600", الخاتمة: "text-slate-600" };

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
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">→ جميع الدروس</button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 8 · المراجعة الشاملة</div>
        <En className="text-xs font-semibold text-slate-400">Present Simple · Full Review</En>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.sec} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SEC_C[g.sec] || "text-slate-400"}`}>{g.sec}</div>
            {g.idxs.map((idx) => {
              const on = idx === i;
              return (
                <button key={idx} onClick={() => { setI(idx); onClose?.(); }} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}>
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

export default function Lesson8({ onExit }: { onExit: () => void }) {
  const [i, setI] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const go = useMemo(() => ({ next: () => setI((v) => Math.min(v + 1, total - 1)), prev: () => setI((v) => Math.max(v - 1, 0)) }), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menu) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft") go.next();
      if (e.key === "ArrowRight") go.prev();
      if (e.key === " ") { e.preventDefault(); go.next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, menu]);

  useEffect(() => { document.getElementById("l8-main")?.scrollTo({ top: 0 }); }, [i]);
  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f3f3fa] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail i={i} setI={setI} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">☰</button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">{slide.section} · <span className="text-slate-800">{slideTitle(slide)}</span></div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div className="h-full rounded-full bg-gradient-to-l from-indigo-500 via-violet-400 to-amber-400 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">{i + 1} / {total}</span>
          </header>
          <main id="l8-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={i} className="pop mx-auto max-w-4xl"><SlideView s={slide} onExit={onExit} /></div>
          </main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={go.prev} disabled={i === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">→ السابق</button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-700 disabled:opacity-30">التالي ←</button>
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
