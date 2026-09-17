import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  FORMULAS,
  ROLE13_AR,
  DID_PRONOUNS,
  GOLDEN,
  NEG_EXAMPLE,
  PRONOUN_NEG,
  TWO_MARKERS,
  PAST_BALL,
  Q_BUILDER,
  EXTRA_QUESTIONS,
  SHORT_ANSWERS,
  SHORT_ANSWER_TRAP,
  Q_ANSWER_DIFF,
  PRESENT_PAST_Q,
  PRESENT_PAST_NEG,
  GENIUS_LADDER,
  WH_MEANINGS,
  WH_GROUPS,
  WH_FROM_SENTENCE,
  DANGER_PAIRS,
  BE_VS_DID,
  TWO_JOBS,
  ERROR_HUNTER,
  ERROR_HUNTER_RULE,
  LEVEL1_NEG,
  LEVEL2_Q,
  LEVEL3_CHOOSE,
  LEVEL4_FILL,
  TRIPLE_TRANSFORM,
  IQ200_TASK,
  PATTERN_SETS,
  PATTERN,
  DETECTIVE_PASSAGE,
  DETECTIVE_Q,
  DETECTIVE_NOTE,
  DETECTIVE_LEAD,
  FINAL_CHALLENGE,
  FINAL_CHALLENGE_TITLE,
  SUMMARY_13,
  KEY_RULE_13,
  ROADMAP_13,
  ROADMAP_13_NEXT,
  COVER_PLAN_13,
  OBJECTIVES_13,
  type Slide13,
  type Block13,
  type Part13,
  type Role13,
  type Exercise13,
  type FormulaKey,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 13 — did / didn't والأسئلة — تدرّج عنبري/برتقالي دافئ
// ============================================================
const RS: Record<Role13, { chip: string; text: string }> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", text: "text-sky-700" },
  vpast: { chip: "bg-orange-100 border-orange-300 text-orange-900", text: "text-orange-700" },
  base: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", text: "text-emerald-700" },
  aux: { chip: "bg-violet-100 border-violet-300 text-violet-900", text: "text-violet-700" },
  nt: { chip: "bg-rose-100 border-rose-300 text-rose-900", text: "text-rose-700" },
  o: { chip: "bg-teal-100 border-teal-300 text-teal-900", text: "text-teal-700" },
  adv: { chip: "bg-amber-100 border-amber-300 text-amber-900", text: "text-amber-700" },
  wh: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", text: "text-fuchsia-700" },
  be: { chip: "bg-cyan-100 border-cyan-300 text-cyan-900", text: "text-cyan-700" },
  beNeg: { chip: "bg-rose-50 border-rose-200 text-rose-800", text: "text-rose-600" },
};

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`ltr font-en ${className}`}>{children}</span>;
}

/** يعزل كل مقطع إنجليزي [[...]] كوحدة LTR واحدة — بدون تقسيم الكلمات. */
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

/** يبرز **النص** كعريض مع الحفاظ على عزل الإنجليزية. */
function BoldText({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <span className={className}>
      {parts.map((x, i) => {
        const m = x.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="font-extrabold text-slate-900">
              <LatinRuns text={m[1]} />
            </strong>
          );
        }
        return <LatinRuns key={i} text={x} />;
      })}
    </span>
  );
}

// ============================================================
// الصيغ — ترتيب إنجليزي دقيق داخل عازل LTR
// ============================================================
function FormulaRowView({ fk, size = "md" }: { fk: FormulaKey; size?: "sm" | "md" | "lg" }) {
  const row = FORMULAS.find((f) => f.key === fk)!;
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base" : "px-3.5 py-2 text-xl md:text-2xl";
  const isOp = (t: string) => t === "+" || t === "?";
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq={`l13-formula-${fk}`}
      className="ltr-row flex flex-wrap items-end justify-center gap-2 rounded-3xl border-2 border-amber-100 bg-amber-50/70 p-4"
    >
      {row.tokens.map((tk, i) =>
        isOp(tk.t) ? (
          <span key={i} className={`font-en font-black text-amber-600 ${size === "lg" ? "text-3xl" : "text-2xl"}`}>
            {tk.t}
          </span>
        ) : (
          <span key={i} className="inline-flex flex-col items-center">
            <span className={`font-en inline-flex items-center rounded-2xl border-2 border-amber-300 bg-white font-extrabold leading-tight text-slate-900 ${sz}`}>
              {tk.t}
            </span>
            {tk.label && <span dir="rtl" className="mt-1 text-[11px] font-bold text-slate-500">{tk.label}</span>}
          </span>
        )
      )}
    </div>
  );
}

/** لوحة الصيغ الأربع — تُستخدم في الخاتمة وتُفحص آليًا لترتيب الإنجليزية. */
export function FormulaBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l13-formulas" className="ltr-row grid gap-3">
      <FormulaRowView fk="aff" />
      <FormulaRowView fk="neg" />
      <FormulaRowView fk="q" />
      <FormulaRowView fk="wh" />
    </div>
  );
}

function PartsLine({ parts, q = false, size = "md", label = true }: { parts: Part13[]; q?: boolean; size?: "sm" | "md" | "lg"; label?: boolean }) {
  const sz = size === "lg" ? "px-4 py-2.5 text-2xl md:text-3xl" : size === "sm" ? "px-2.5 py-1 text-base md:text-lg" : "px-3.5 py-2 text-xl md:text-2xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-2">
      {parts.map((p, i) => (
        <span key={i} className="inline-flex flex-col items-center">
          <span className={`font-en inline-flex items-center rounded-2xl border-2 font-extrabold leading-tight ${RS[p.role].chip} ${sz}`}>{p.text}</span>
          {label && <span dir="rtl" className="mt-0.5 text-[10px] font-bold text-slate-500">{ROLE13_AR[p.role]}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

function SentenceCard({ parts, ar, note, q }: { parts: Part13[]; ar?: string; note?: string; q?: boolean }) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} q={q} />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {ar && <span className="text-lg text-slate-500">{ar}</span>}
        {note && (
          <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-800">
            📌 <LatinRuns text={note} />
          </span>
        )}
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
    <section className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(217,119,6,0.32)] md:p-9">
      <div className="anim-drift pointer-events-none absolute -left-2 top-4 select-none text-4xl md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-amber-600 text-lg font-bold text-white">{step}</span>}
        {badge && <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-800">{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <div className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl"><Rich text={String(lead)} /></div>}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-amber-600 to-orange-600 p-4 text-white">
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
      {ar && <span className="text-base font-bold text-slate-500">{ar}</span>}
      {why && <span className={`rounded-full px-3 py-1 text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{why}</span>}
    </div>
  );
}

function Nub({ n }: { n: number }) {
  return <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{n}</span>;
}

function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-center gap-2">{children}</div>;
}

function TabBtn({ on, onClick, children, tone = "amber" }: { on: boolean; onClick: () => void; children: React.ReactNode; tone?: "amber" | "violet" | "slate" }) {
  const active = tone === "violet" ? "border-transparent bg-violet-600 text-white" : tone === "slate" ? "border-transparent bg-slate-800 text-white" : "border-transparent bg-amber-600 text-white";
  return (
    <button onClick={onClick} className={`rounded-xl border-2 px-5 py-2 text-sm font-bold transition ${on ? active : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}>
      {children}
    </button>
  );
}

// ============================================================
// تفاعليات الدرس 13
// ============================================================

// ② جميع الضمائر تأخذ DID
function DidHero() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DID_PRONOUNS.map((p, i) => (
          <button
            key={p.en}
            onClick={() => setActive(i)}
            className={`flex flex-col items-center gap-1 rounded-2xl border-2 bg-white px-3 py-3 transition ${active === i ? "border-violet-500 shadow-lg" : "border-violet-200 hover:border-violet-400"}`}
          >
            <span className="flex items-center gap-2">
              <span className="font-en text-xl font-extrabold text-slate-700">{p.en}</span>
              <span className="font-en text-lg text-slate-300">→</span>
              <span className="font-en text-xl font-black text-violet-700">did</span>
            </span>
            <span dir="rtl" className="text-xs font-bold text-slate-500">{p.ar}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 text-center text-sm font-bold text-violet-800">
        ⭐ <LatinRuns text="did يأخذ جميع الضمائر — بلا استثناء." />
      </div>
    </div>
  );
}

// ③ القاعدة الذهبية — الماضي ينتقل إلى DID
function GoldenMachine() {
  const [mode, setMode] = useState<"aff" | "q">("aff");
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
      <Toolbar>
        <TabBtn on={mode === "aff"} onClick={() => setMode("aff")}>الجملة المثبتة</TabBtn>
        <TabBtn on={mode === "q"} onClick={() => setMode("q")}>عندما يدخل DID</TabBtn>
      </Toolbar>
      <div key={mode} className="pop mt-4 grid gap-3 rounded-2xl border-2 border-white bg-white p-4">
        <PartsLine parts={mode === "aff" ? GOLDEN.aff : GOLDEN.q} q={mode === "q"} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {mode === "aff" ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">
              الماضي على الفعل: <En>{GOLDEN.change.from}</En> = الماضي
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              الفعل رجع إلى الأساس: <En className="font-black">{GOLDEN.change.to}</En> — والماضي انتقل إلى <En className="font-black">Did</En>
            </span>
          )}
        </div>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-4 flex flex-wrap items-center justify-center gap-3">
        <span className="font-en rounded-xl bg-rose-50 px-3 py-1.5 text-lg font-bold text-rose-700 line-through decoration-rose-400">{GOLDEN.change.from}</span>
        <span className="font-en text-xl font-black text-slate-400">→</span>
        <span className="tada font-en rounded-xl bg-emerald-100 px-3 py-1.5 text-lg font-black text-emerald-800">{GOLDEN.change.to}</span>
      </div>
    </div>
  );
}

// ④ آلة النفي
function NegMachine() {
  const [mode, setMode] = useState<"aff" | "neg">("aff");
  return (
    <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-5">
      <Toolbar>
        <TabBtn on={mode === "aff"} onClick={() => setMode("aff")} tone="slate">مثبت</TabBtn>
        <TabBtn on={mode === "neg"} onClick={() => setMode("neg")} tone="violet">منفي</TabBtn>
      </Toolbar>
      <div key={mode} className="pop mt-4 grid gap-3 rounded-2xl border-2 border-white bg-white p-4">
        <PartsLine parts={mode === "aff" ? NEG_EXAMPLE.aff : NEG_EXAMPLE.neg} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {mode === "aff" ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800">الفعل الماضي وحده يحمل معنى الماضي</span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              <En className="font-black">didn't</En> حملت الماضي، والفعل رجع إلى <En className="font-black">visit</En>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ⑤ أمثلة مع جميع الضمائر
function PronounGallery() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {PRONOUN_NEG.map((it, i) => {
        const shown = open[i];
        return (
          <div key={it.pronoun} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-en grid h-10 min-w-10 place-items-center rounded-2xl bg-slate-900 px-3 text-lg font-black text-white">{it.pronoun}</span>
              <span dir="rtl" className="text-sm font-bold text-slate-500">{it.ar}</span>
              <button
                onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                className="mr-auto rounded-xl bg-rose-500 px-4 py-1.5 text-sm font-bold text-white transition hover:brightness-110"
              >
                {shown ? "↺ إخفاء النفي" : "حوّلها إلى نفي"}
              </button>
            </div>
            <div className="mt-3 grid gap-2">
              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-3">
                <PartsLine parts={it.aff} size="sm" />
              </div>
              {shown && (
                <div className="tada rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-3">
                  <PartsLine parts={it.neg} size="sm" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ⑥ لماذا لا نستخدم الماضي بعد DID؟ — علامتان للماضي
function TwoPastMarkers() {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-rose-200 bg-white p-4">
          <div className="mb-2 text-center text-xs font-bold text-rose-700">❌ علامتان للماضي</div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2">
            <span className="font-en rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-1.5 text-lg font-bold text-rose-800">didn't</span>
            <span className="font-en text-lg font-black text-rose-400">+</span>
            <span className="font-en rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-1.5 text-lg font-bold text-rose-800 line-through decoration-rose-400">went</span>
          </div>
          <div className="mt-2 text-center text-xs font-bold text-rose-700">did = ماضي · went = ماضي</div>
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
          <div className="mb-2 text-center text-xs font-bold text-emerald-700">✅ علامة ماضٍ واحدة</div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2">
            <span className="font-en rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-1.5 text-lg font-bold text-emerald-800">didn't</span>
            <span className="font-en text-lg font-black text-emerald-400">+</span>
            <span className="font-en rounded-xl border-2 border-emerald-300 bg-emerald-50 px-3 py-1.5 text-lg font-black text-emerald-800">go</span>
          </div>
          <div className="mt-2 text-center text-xs font-bold text-emerald-700">did = ماضي · go = الفعل الأساسي</div>
        </div>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <PartsLine parts={TWO_MARKERS.aff} size="sm" />
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <PartsLine parts={TWO_MARKERS.neg} size="sm" />
        </div>
      </div>
    </div>
  );
}

// ⑦ حركة الماضي — كرة PAST
function PastBall() {
  const [stepIdx, setStepIdx] = useState(0);
  const steps = [
    { title: "الجملة المثبتة", ball: "on-verb", en: "She went." },
    { title: "دخل DID", ball: "moving", en: "She → did → go" },
    { title: "السؤال", ball: "on-did", en: "Did she go?" },
  ];
  const s = steps[stepIdx];
  return (
    <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5">
      <Toolbar>
        {steps.map((st, i) => (
          <TabBtn key={st.title} on={i === stepIdx} onClick={() => setStepIdx(i)}>
            {st.title}
          </TabBtn>
        ))}
      </Toolbar>
      <div key={stepIdx} className="pop mt-4 rounded-2xl border-2 border-white bg-white p-5">
        <div className="flex items-center justify-center gap-3">
          <span className={`text-3xl ${s.ball === "moving" ? "anim-bob" : "anim-float"}`} aria-hidden>⚽</span>
          <En className="text-xl font-extrabold text-slate-800">{s.en}</En>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className={`rounded-2xl border-2 p-3 text-center text-xs font-bold transition ${s.ball === "on-verb" ? "border-orange-400 bg-orange-50 text-orange-800" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
            الكرة على الفعل: <En className="font-black">went</En>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center text-xs font-bold transition ${s.ball === "on-did" ? "border-violet-400 bg-violet-50 text-violet-800" : "border-slate-100 bg-slate-50 text-slate-400"}`}>
            الكرة على المساعد: <En className="font-black">did</En>
          </div>
        </div>
        {stepIdx === 2 && (
          <div className="mt-3 rounded-2xl bg-emerald-50 p-3 text-center text-sm font-bold text-emerald-800">
            فلذلك نقول <En className="font-black">Did she go?</En> — وليس <En className="line-through">Did she went?</En>
          </div>
        )}
      </div>
    </div>
  );
}

// ⑧ باني السؤال
function QuestionBuilder() {
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState<Record<number, boolean>>({});
  const it = Q_BUILDER[idx];
  return (
    <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
      <Toolbar>
        {Q_BUILDER.map((q, i) => (
          <TabBtn key={q.q[2].text} on={i === idx} onClick={() => setIdx(i)} tone="slate">
            <En>{q.aff[q.aff.length - 2].text}</En>
          </TabBtn>
        ))}
      </Toolbar>
      <div key={idx} className="pop mt-4 grid gap-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-bold text-slate-400">مثبت</div>
          <PartsLine parts={it.aff} />
        </div>
        <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-sky-600">السؤال</span>
            <button
              onClick={() => setShow((s) => ({ ...s, [idx]: !s[idx] }))}
              className="mr-auto rounded-xl bg-sky-600 px-4 py-1.5 text-sm font-bold text-white"
            >
              {show[idx] ? "↺ إخفاء" : "كوّن السؤال"}
            </button>
          </div>
          {show[idx] ? (
            <div className="tada">
              <PartsLine parts={it.q} q />
              <div className="mt-2 text-sm font-bold text-slate-500">{it.ar}</div>
            </div>
          ) : (
            <div className="grid gap-2 opacity-60">
              <PartsLine parts={it.q} q label={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ⑨ أمثلة إضافية جديدة
function ExtraQuestions() {
  const [big, setBig] = useState<number | null>(null);
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {EXTRA_QUESTIONS.map((q, i) => (
        <button
          key={q.en}
          onClick={() => setBig((b) => (b === i ? null : i))}
          className={`rounded-3xl border-2 bg-white p-4 text-right transition ${big === i ? "border-sky-400 shadow-lg" : "border-slate-200 hover:border-slate-400"}`}
        >
          <En className={`block font-extrabold text-slate-800 ${big === i ? "text-2xl" : "text-lg"}`}>{q.en}</En>
          <div className="mt-1 text-sm font-bold text-slate-500">{q.ar}</div>
        </button>
      ))}
    </div>
  );
}

// ⑩ الإجابات القصيرة
function ShortAnswerTrainer() {
  const [idx, setIdx] = useState(0);
  const [pick, setPick] = useState<"yes" | "no" | null>(null);
  const it = SHORT_ANSWERS[idx];
  return (
    <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
      <Toolbar>
        {SHORT_ANSWERS.map((q, i) => (
          <TabBtn key={q.q} on={i === idx} onClick={() => { setIdx(i); setPick(null); }}>
            {i + 1}
          </TabBtn>
        ))}
      </Toolbar>
      <div key={idx} className="pop mt-4 rounded-2xl border-2 border-white bg-white p-4">
        <En className="block text-center text-lg font-extrabold text-slate-800">{it.q}</En>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button onClick={() => setPick("yes")} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${pick === "yes" ? "border-transparent bg-emerald-600 text-white" : "border-emerald-200 bg-white text-emerald-700"}`}>
            Yes
          </button>
          <button onClick={() => setPick("no")} className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${pick === "no" ? "border-transparent bg-rose-600 text-white" : "border-rose-200 bg-white text-rose-700"}`}>
            No
          </button>
        </div>
        {pick && (
          <div className="tada mt-3 grid gap-2">
            <div className={`rounded-2xl border-2 p-3 text-center ${pick === "yes" ? "border-emerald-300 bg-emerald-50" : "border-slate-100 bg-slate-50 opacity-50"}`}>
              <En className="text-lg font-black text-emerald-800">{it.yes}</En>
            </div>
            <div className={`rounded-2xl border-2 p-3 text-center ${pick === "no" ? "border-rose-300 bg-rose-50" : "border-slate-100 bg-slate-50 opacity-50"}`}>
              <En className="text-lg font-black text-rose-800">{it.no}</En>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ⑬⑭ Present مقابل Past
function PresentPastToggle({ mode }: { mode: "question" | "negative" }) {
  const [side, setSide] = useState<"present" | "past">("present");
  const rows = mode === "question" ? PRESENT_PAST_Q : PRESENT_PAST_NEG;
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <Toolbar>
        <TabBtn on={side === "present"} onClick={() => setSide("present")} tone="slate">
          <En>Present</En>
        </TabBtn>
        <TabBtn on={side === "past"} onClick={() => setSide("past")}>
          <En>Past</En>
        </TabBtn>
      </Toolbar>
      <div key={side} className="pop mt-4 grid gap-2">
        {rows.map((r) => {
          const isQ = mode === "question";
          const en = side === "present" ? r.present : r.past;
          const ar = isQ
            ? side === "present"
              ? (r as (typeof PRESENT_PAST_Q)[number]).arPresent
              : (r as (typeof PRESENT_PAST_Q)[number]).arPast
            : side === "present"
              ? (r as (typeof PRESENT_PAST_NEG)[number]).arPresent
              : (r as (typeof PRESENT_PAST_NEG)[number]).arPast;
          return (
            <div key={en} className={`flex flex-wrap items-center gap-3 rounded-2xl border-2 bg-white p-3 ${side === "past" ? "border-amber-300" : "border-slate-200"}`}>
              <En className={`text-lg font-extrabold ${side === "past" ? "text-amber-800" : "text-slate-700"}`}>{en}</En>
              {ar && <span dir="rtl" className="text-sm font-bold text-slate-500">{ar}</span>}
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3 text-center text-sm font-bold text-slate-600">
        {mode === "question" ? (
          <>
            <En>Do / Does</En> → <En>Did</En> — والفعل يبقى <En>Base Verb</En>
          </>
        ) : (
          <>
            <En>doesn't + base verb</En> → <En>didn't + base verb</En>
          </>
        )}
      </div>
    </div>
  );
}

// ⑮ نقطة عبقرية
function GeniusLadder() {
  return (
    <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
          <div className="mb-2 text-center text-sm font-bold text-slate-500">
            <En>Present Simple</En>
          </div>
          <div className="grid gap-2">
            {GENIUS_LADDER.present.map((l, i) => (
              <div key={l} className={`rounded-2xl border-2 p-3 text-center ${i === 1 || i === 2 ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-slate-50"}`}>
                <En className="text-lg font-extrabold text-slate-800">{l}</En>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-300 bg-white p-4">
          <div className="mb-2 text-center text-sm font-bold text-amber-700">
            <En>Past Simple</En>
          </div>
          <div className="grid gap-2">
            {GENIUS_LADDER.past.map((l, i) => (
              <div key={l} className={`rounded-2xl border-2 p-3 text-center ${i === 1 || i === 2 ? "border-amber-400 bg-amber-50" : "border-amber-200 bg-amber-50/50"}`}>
                <En className="text-lg font-extrabold text-amber-900">{l}</En>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-bold text-violet-800">
        <En className="rounded-lg bg-white px-2 py-1">does / doesn't</En>
        <span>أخذت القاعدة في المضارع ·</span>
        <En className="rounded-lg bg-white px-2 py-1">did / didn't</En>
        <span>أخذت الماضي · والفعل يعود إلى</span>
        <En className="rounded-lg bg-amber-100 px-2 py-1 font-black">Base Form</En>
      </div>
    </div>
  );
}

// ⑯ معاني أدوات Wh
function WhMeanings() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
      {WH_MEANINGS.map((w) => (
        <div key={w.en} className="flex flex-col items-center rounded-2xl border-2 border-fuchsia-200 bg-white px-3 py-3">
          <span className="font-en text-lg font-black text-fuchsia-700">{w.en}</span>
          <span dir="rtl" className="mt-1 text-xs font-bold text-slate-500">{w.ar}</span>
        </div>
      ))}
    </div>
  );
}

// ⑯ أسئلة Wh — المجموعات الكاملة
function WhGrid() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="grid gap-3">
      {WH_GROUPS.map((g) => {
        const shown = open[g.word] ?? true;
        return (
          <div key={g.word} className="rounded-3xl border-2 border-fuchsia-100 bg-white p-4">
            <button
              onClick={() => setOpen((o) => ({ ...o, [g.word]: !shown }))}
              className="flex w-full flex-wrap items-center gap-3"
            >
              <span className="font-en grid h-10 place-items-center rounded-2xl bg-fuchsia-600 px-4 text-lg font-black text-white">{g.word}</span>
              <span dir="rtl" className="text-sm font-bold text-slate-500">{g.ar}</span>
              <span className="mr-auto rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                {shown ? "↺ إخفاء" : "أظهر الأمثلة"}
              </span>
            </button>
            {shown && (
              <div className="pop mt-3 grid gap-2">
                {g.items.map((it) => (
                  <div key={it.en} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3">
                    <En className="text-lg font-extrabold text-slate-800">{it.en}</En>
                    <span dir="rtl" className="text-sm font-bold text-slate-500">{it.ar}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ⑰ من جملة واحدة إلى أسئلة Wh
function WhFromSentence() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5">
      <div className="rounded-2xl border-2 border-white bg-white p-4 text-center">
        <En className="text-lg font-extrabold text-slate-800">{WH_FROM_SENTENCE.base}</En>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {WH_FROM_SENTENCE.items.map((it, i) => (
          <TabBtn key={it.word} on={pick === i} onClick={() => setPick((p) => (p === i ? null : i))}>
            <En>{it.word}</En>
          </TabBtn>
        ))}
      </div>
      {pick !== null && (
        <div className="tada mt-4 rounded-2xl border-2 border-emerald-200 bg-white p-4 text-center">
          <En className="text-xl font-black text-emerald-800">{WH_FROM_SENTENCE.items[pick].q}</En>
          <div className="mt-1 text-sm font-bold text-slate-500">{WH_FROM_SENTENCE.items[pick].ar}</div>
        </div>
      )}
    </div>
  );
}

// ⑱ خطأ خطير — لوحة الأخطاء
function DangerBoard() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-5">
      <div className="grid gap-2">
        {DANGER_PAIRS.map((p, i) => (
          <div key={p.bad} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-rose-100 bg-white p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">✕</span>
            <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{p.bad}</En>
            {open[i] ? (
              <span className="tada flex flex-wrap items-center gap-2">
                <span className="text-slate-300">→</span>
                <En className="text-lg font-black text-emerald-700">{p.ok}</En>
              </span>
            ) : (
              <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">
                الصحيح؟
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-white p-3 text-center text-sm font-bold text-rose-800">
        القاعدة: <En className="font-black">DID / DIDN'T + BASE VERB</En>
      </div>
    </div>
  );
}

// ⑲ DID مقابل Verb to be
function BeVsDidBoard() {
  const [pick, setPick] = useState<"did" | "be">("did");
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-5">
      <Toolbar>
        <TabBtn on={pick === "did"} onClick={() => setPick("did")} tone="slate">
          <En>did</En>
        </TabBtn>
        <TabBtn on={pick === "be"} onClick={() => setPick("be")}>
          <En>was / were</En>
        </TabBtn>
      </Toolbar>
      <div key={pick} className="pop mt-4 grid gap-2">
        {pick === "did"
          ? BE_VS_DID.badSystem.map((s) => (
              <div key={s} className="rounded-2xl border-2 border-rose-200 bg-white p-3 text-center">
                <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{s}</En>
                <span className="mr-2 text-lg">❌</span>
              </div>
            ))
          : (
            <>
              {BE_VS_DID.okSystem.map((s) => (
                <div key={s} className="rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
                  <En className="text-lg font-black text-emerald-800">{s}</En>
                  <span className="mr-2 text-lg">✅</span>
                </div>
              ))}
            </>
          )}
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <div className="text-xs font-bold text-slate-400">مثال</div>
          <En className="mt-1 block font-bold text-slate-800">{BE_VS_DID.example}</En>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <div className="text-xs font-bold text-slate-400">السؤال</div>
          <En className="mt-1 block font-bold text-slate-800">{BE_VS_DID.q}</En>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <div className="text-xs font-bold text-slate-400">النفي</div>
          <En className="mt-1 block font-bold text-slate-800">{BE_VS_DID.neg}</En>
        </div>
      </div>
    </div>
  );
}

// ⑳ DID كفعل أساسي
function TwoJobsOfDid() {
  const [pick, setPick] = useState<"main" | "aux">("main");
  const cur = pick === "main" ? TWO_JOBS.main : TWO_JOBS.aux;
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
      <Toolbar>
        <TabBtn on={pick === "main"} onClick={() => setPick("main")}>
          <En>did</En> = فعل أساسي
        </TabBtn>
        <TabBtn on={pick === "aux"} onClick={() => setPick("aux")} tone="violet">
          <En>Did</En> = فعل مساعد
        </TabBtn>
      </Toolbar>
      <div key={pick} className="pop mt-4 rounded-2xl border-2 border-white bg-white p-4 text-center">
        <En className="text-xl font-black text-slate-900">{cur.en}</En>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich text={cur.note} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// تمارين الدرس 13
// ============================================================

function commonPrefixLen(a: string, b: string): number {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

/** يعرض جملة التحويل ويبرز الجزء المتغيّر فقط (LTR معزول). */
function ChangedLine({ from, to, big = false }: { from: string; to: string; big?: boolean }) {
  const n = commonPrefixLen(from, to);
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row text-left">
      <En className={`font-extrabold text-emerald-700 ${big ? "text-xl md:text-2xl" : "text-lg"}`}>
        <span>{to.slice(0, n)}</span>
        <span className="rounded bg-amber-200/70 px-1 text-amber-900">{to.slice(n)}</span>
      </En>
    </div>
  );
}

// ㉑ لعبة صائد الأخطاء
function ErrorHunterEx() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const found = Object.values(open).filter(Boolean).length;
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4 text-sm font-bold text-slate-600">
        🎮 حدد الخطأ وأصلحه. فكر قبل رؤية الحل. — اكتشفت {found} / {ERROR_HUNTER.length}
      </div>
      <div className="grid gap-2.5">
        {ERROR_HUNTER.map((it, i) => (
          <div key={it.wrong} className={`rounded-3xl border-2 p-4 transition ${open[i] ? "border-emerald-300 bg-emerald-50/40" : "border-rose-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{it.n}</span>
              <En className="text-lg font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
              {open[i] ? (
                <span className="tada flex flex-wrap items-center gap-2">
                  <span className="text-slate-300">→</span>
                  <En className="text-lg font-black text-emerald-700">{it.correct}</En>
                </span>
              ) : (
                <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">
                  ✅ الحل
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
        <div className="font-bold text-amber-900">
          <Rich text={ERROR_HUNTER_RULE.lead} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex justify-center">
          <span className="font-en rounded-xl border-2 border-amber-300 bg-white px-4 py-2 text-xl font-black text-amber-800">{ERROR_HUNTER_RULE.formula}</span>
        </div>
      </div>
    </div>
  );
}

// ㉒ حوّل إلى النفي
function NegTransformEx({ ex }: { ex: Extract<Exercise13, { type: "negTransform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={it.aff} className={`rounded-3xl border-2 p-4 transition ${show[i] ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Nub n={i + 1} />
            <div className="min-w-0 flex-1">
              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-3">
                <En className="text-lg font-bold text-slate-800">{it.aff}</En>
              </div>
              {show[i] ? (
                <div className="tada mt-2 rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-3">
                  <ChangedLine from={it.aff} to={it.neg} />
                </div>
              ) : null}
            </div>
            {!show[i] && (
              <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="rounded-xl bg-rose-500 px-4 py-1.5 text-sm font-bold text-white">
                أظهر النفي
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ㉓ حوّل إلى سؤال
function QTransformEx({ ex }: { ex: Extract<Exercise13, { type: "qTransform" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={it.aff} className={`rounded-3xl border-2 p-4 transition ${show[i] ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Nub n={i + 1} />
            <div className="min-w-0 flex-1">
              <div className="rounded-2xl border-2 border-orange-100 bg-orange-50/50 p-3">
                <En className="text-lg font-bold text-slate-800">{it.aff}</En>
              </div>
              {show[i] ? (
                <div className="tada mt-2 rounded-2xl border-2 border-sky-100 bg-sky-50/50 p-3">
                  <En className="text-lg font-extrabold text-sky-800">{it.q}</En>
                  <div className="mt-1">
                    <En className="text-xs font-bold text-slate-500">Did + Subject + Base Verb?</En>
                  </div>
                </div>
              ) : null}
            </div>
            {!show[i] && (
              <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="rounded-xl bg-sky-600 px-4 py-1.5 text-sm font-bold text-white">
                أظهر السؤال
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ㉔ اختر الصحيح
function ChooseEx({ ex }: { ex: Extract<Exercise13, { type: "choose" }> }) {
  const [pick, setPick] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => {
        const c = pick[i];
        const right = c === it.answer;
        const segs = it.stem.split("_______");
        return (
          <div key={it.stem} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-slate-50/60 px-3 py-2">
                {segs.map((sg, si) => (
                  <span key={si} className="flex items-center gap-2">
                    <span className="font-en text-lg font-bold text-slate-800">{sg}</span>
                    {si < segs.length - 1 && (
                      <span className="font-en inline-block min-w-[3.5rem] rounded-lg border-2 border-dashed border-amber-400 bg-white px-2 py-0.5 text-center text-sm font-bold text-amber-600">
                        {c !== undefined ? it.opts[c] : "?"}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2 pr-11">
              {it.opts.map((o, oi) => (
                <button
                  key={o}
                  onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition ${c === oi ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {o}
                </button>
              ))}
            </div>
            {c !== undefined && (
              <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
                💡 <Rich text={it.why} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ㉕ أكمل
function FillEx({ ex }: { ex: Extract<Exercise13, { type: "fill" }> }) {
  const [show, setShow] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-2.5">
      {ex.items.map((it, i) => (
        <div key={it.stem} className={`rounded-3xl border-2 p-4 transition ${show[i] ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
          <div className="flex flex-wrap items-center gap-3">
            <Nub n={i + 1} />
            <En className="text-lg font-bold text-slate-800">{it.stem}</En>
            <span dir="ltr" className="font-en rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              {it.hint}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
            {show[i] ? (
              <span className="tada flex flex-wrap items-center gap-3">
                <En className="text-lg font-black text-emerald-700">{it.answer}</En>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  <Rich text={it.why} />
                </span>
              </span>
            ) : (
              <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">
                أظهر الحل
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ㉖ حوّل الجملة ثلاث مرات
function TripleEx() {
  const [show, setShow] = useState<Record<number, boolean>>({});
  const all = show[0] && show[1] && show[2];
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 text-center">
        <div className="mb-2 text-sm font-bold text-slate-500">الجملة:</div>
        <En className="text-xl font-extrabold text-slate-900">{TRIPLE_TRANSFORM.sentence}</En>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setShow({ 0: true, 1: true, 2: true })}
          className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-bold text-white"
        >
          أظهر الإجابات النموذجية الثلاث
        </button>
        <button onClick={() => setShow({})} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
          ↺ إعادة
        </button>
      </div>
      <div className="grid gap-2.5">
        {TRIPLE_TRANSFORM.items.map((it, i) => (
          <div key={it.label} className={`rounded-3xl border-2 p-4 transition ${show[i] ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-xl bg-slate-900 px-3 py-1 text-sm font-bold text-white">{it.label}</span>
              {show[i] ? (
                <En className="tada text-lg font-extrabold text-emerald-800">{it.en}</En>
              ) : (
                <button onClick={() => setShow((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">
                  أظهر
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {all && (
        <div className="tada rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center text-sm font-bold text-amber-900">
          🔥 لاحظ: الماضي إما على الفعل الماضي، أو على <En className="font-black">didn't</En> / <En className="font-black">Did</En> — والمفعول به نفسه في الثلاثة.
        </div>
      )}
    </div>
  );
}

// ㉗ المستوى السادس — IQ200
function IQ200Ex() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [all, setAll] = useState(false);
  const items = IQ200_TASK.model;
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 text-center">
        <En className="text-xl font-extrabold text-slate-900">{IQ200_TASK.given}</En>
      </div>
      <div className="grid gap-2.5">
        {IQ200_TASK.tasks.map((t, i) => (
          <div key={t} className={`rounded-3xl border-2 p-4 transition ${all || open[i] ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <Nub n={i + 1} />
              <span className="font-bold text-slate-700">{t}</span>
              {all || open[i] ? (
                <En className="tada mr-auto text-lg font-extrabold text-emerald-800">{items[i].en}</En>
              ) : (
                <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white">
                  أظهر
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setAll(true)} className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-bold text-white">
          أظهر النموذج المقترح كاملًا
        </button>
        <button onClick={() => { setAll(false); setOpen({}); }} className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
          ↺ إعادة
        </button>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4 text-sm font-bold text-violet-900">
        <Lbl en="DID" /> + <Lbl en="Base Verb" /> — {IQ200_TASK.note}
      </div>
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-3 text-xs font-bold text-slate-500">
        ⓘ {IQ200_TASK.modelNote}
      </div>
    </div>
  );
}

function Lbl({ en }: { en: string }) {
  return <En className="rounded-lg bg-slate-900/[0.06] px-1.5 py-0.5 font-black text-slate-800">{en}</En>;
}

// ㉘ اكتشف النظام
function PatternEx() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        {PATTERN_SETS.map((set, i) => (
          <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
            <div className="grid gap-2">
              {set.map((l) => (
                <En key={l} className="rounded-2xl border-2 border-slate-100 bg-slate-50/70 px-3 py-2 text-center text-base font-bold text-slate-800">
                  {l}
                </En>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
        <div className="font-bold text-amber-900">
          السؤال: <Rich text={PATTERN.question} />
        </div>
        {open ? (
          <div className="tada mt-3 rounded-2xl border-2 border-emerald-200 bg-white p-3 text-center">
            <div className="text-sm font-bold text-slate-500">💡 الإجابة:</div>
            <div className="mt-1 font-bold text-emerald-800">
              <Rich text={PATTERN.answer} />
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap justify-center gap-2">
              {PATTERN.bases.map((b) => (
                <span key={b} className="font-en rounded-xl bg-emerald-100 px-3 py-1 font-black text-emerald-800">
                  {b}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <button onClick={() => setOpen(true)} className="mt-3 rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white">
            أظهر الإجابة 💡
          </button>
        )}
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {PATTERN.bad.map((b) => (
          <div key={b} className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center">
            <En className="text-base font-bold text-rose-700 line-through decoration-rose-300">{b}</En>
          </div>
        ))}
      </div>
    </div>
  );
}

// ㉙ Grammar Detective
function DetectiveEx() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <En className="block whitespace-pre-line text-lg font-bold leading-relaxed text-slate-800">{DETECTIVE_PASSAGE}</En>
      </div>
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-sm font-bold text-indigo-800">
        🕵️ {DETECTIVE_LEAD}
      </div>
      <div className="grid gap-2.5">
        {DETECTIVE_Q.map((it, i) => (
          <div key={it.q} className={`rounded-3xl border-2 p-4 transition ${open[i] ? "border-emerald-300 bg-emerald-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <En className="text-lg font-bold text-slate-800">{it.q}</En>
              {open[i] ? (
                <span className="tada mr-auto flex flex-wrap items-center gap-2">
                  <En className="text-lg font-black text-emerald-700">{it.a}</En>
                  <span dir="rtl" className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    {it.src}
                  </span>
                </span>
              ) : (
                <button onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="mr-auto rounded-xl bg-indigo-600 px-4 py-1.5 text-sm font-bold text-white">
                  أظهر الإجابة
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-3 text-xs font-bold text-slate-500">
        ⓘ {DETECTIVE_NOTE}
      </div>
    </div>
  );
}

// ㉚ التحدي النهائي
function FinalChallengeEx() {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <div className="font-head text-lg font-bold text-amber-900">{FINAL_CHALLENGE_TITLE}</div>
        <div className="mt-1 text-sm font-bold text-amber-800">{FINAL_CHALLENGE.instruction}</div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {FINAL_CHALLENGE.conditions.map((c) => (
            <div key={c} className="flex items-center gap-2 rounded-2xl border-2 border-amber-100 bg-white px-3 py-2 text-sm font-bold text-slate-700">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-400 text-xs text-white">✓</span>
              <LatinRuns text={c} />
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-amber-100 bg-white px-3 py-2">
            {FINAL_CHALLENGE.shortForms.map((f) => (
              <En key={f} className="rounded-xl bg-amber-50 px-2.5 py-1 text-sm font-black text-amber-800">
                {f}
              </En>
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-2xl border-2 border-amber-100 bg-white p-3">
          <div className="text-sm font-bold text-amber-800">{FINAL_CHALLENGE.note}</div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-2">
            {FINAL_CHALLENGE.verbs.map((v) => (
              <span key={v} className="font-en rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setShowModel((s) => !s)} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
          {showModel ? "↺ إخفاء النموذج" : "أظهر نموذجًا مقترحًا (إضافة)"}
        </button>
      </div>
      {showModel && (
        <div className="tada rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
          <div className="mb-2 text-sm font-bold text-emerald-800">{FINAL_CHALLENGE.modelNote}</div>
          <div className="grid gap-1.5">
            {FINAL_CHALLENGE.model.map((s) => (
              <div key={s} dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl border-2 border-emerald-100 bg-white px-3 py-2">
                <span className="font-en text-left text-base font-bold text-emerald-900">{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// شرائح ثابتة
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-8 text-center shadow-[0_14px_44px_-20px_rgba(217,119,6,0.32)] md:p-14">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-amber-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-orange-100 blur-3xl" />
      <div className="relative">
        <div className="pop anim-drift text-7xl">📘</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-gradient-to-l from-amber-600 to-orange-600 px-5 py-2 text-base font-bold text-white">الدرس الثالث عشر</div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
          Past Simple — النفي والأسئلة والإجابات القصيرة
        </h1>
        <div className="pop pop-3 mt-3">
          <FormulaRowView fk="neg" />
        </div>
        <div className="pop pop-4 mt-3 inline-flex items-center gap-2 rounded-full border-2 border-amber-200 bg-amber-50 px-4 py-2">
          <span>🔥</span>
          <span className="text-sm font-bold text-amber-800">IQ200 — DID يأخذ الماضي معه، والفعل يرجع إلى الأساس</span>
        </div>
        <div className="pop pop-5 mx-auto mt-6 max-w-xl space-y-3 rounded-3xl border-2 border-slate-100 bg-slate-50 p-5 text-right">
          <div className="text-sm font-bold text-slate-600">ممتاز! في الدرس السابق تعلمنا الجملة المثبتة في الماضي:</div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              <En className="rounded-lg bg-orange-600 px-2 py-0.5 text-white">Past Simple</En>
              <span className="text-slate-600">→ الجملة المثبتة: Subject + Past Verb</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold">
              <En className="rounded-lg bg-amber-600 px-2 py-0.5 text-white">Lesson 13</En>
              <span className="text-slate-600">→ النفي والأسئلة والإجابات القصيرة مع did / didn't</span>
            </div>
          </div>
          <div className="text-sm font-bold text-slate-700">
            اليوم سنجيب عن السؤال: كيف نقول «لم أفعل» و«هل فعلت؟» — ونكتشف لماذا يرجع الفعل إلى شكله الأساسي بعد <En className="font-extrabold text-amber-700">did</En> و<En className="font-extrabold text-amber-700">didn't</En>.
          </div>
        </div>
        <div className="pop pop-6 mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-1.5 text-right sm:grid-cols-2">
          {COVER_PLAN_13.map((x, i) => (
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
    "تحويل الجملة في الماضي إلى النفي.",
    "تكوين سؤال في [[Past Simple]].",
    "الإجابة بـ [[Yes]] / [[No]].",
    "استخدام [[did]] / [[didn't]] مع جميع الضمائر.",
    "فهم لماذا نقول [[She went.]] لكن [[Did she go?]] و[[She didn't go.]]",
    "عدم الوقوع في الخطأ [[Did she went?]] ❌ و[[She didn't went.]] ❌",
    "التمييز بين [[did]] كفعل مساعد و [[did]] كفعل أساسي.",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="أهداف الدرس" lead="بنهاية الدرس، يجب أن يستطيع الطالب:">
      <div className="grid gap-3 sm:grid-cols-2">
        {goals.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-600 font-bold text-white">{i + 1}</span>
            <Rich text={g} className="text-base leading-relaxed text-slate-700" />
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center text-sm font-bold text-amber-900">
        🎓 سبعة أهداف — كلها مبنية على فكرة واحدة: <En className="font-black">DID = الماضي</En>، والفعل بعده يرجع إلى الأساس.
      </div>
    </Frame>
  );
}

function Summary() {
  const tone: Record<string, string> = {
    aff: "border-orange-200 bg-orange-50",
    neg: "border-rose-200 bg-rose-50",
    q: "border-sky-200 bg-sky-50",
    short: "border-emerald-200 bg-emerald-50",
    wh: "border-fuchsia-200 bg-fuchsia-50",
  };
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس" lead="خمس صيغ فقط تلخص كل الدرس:">
      <div className="grid gap-3">
        {SUMMARY_13.map((s) => (
          <div key={s.label} className={`rounded-3xl border-2 p-5 ${tone[s.tone]}`}>
            <div className="font-head text-lg font-bold text-slate-800">
              <LatinRuns text={s.label} />
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex justify-center">
              <span className="font-en rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-xl font-black text-slate-900">{s.formula}</span>
            </div>
            <div className="mt-3 grid gap-1.5">
              {s.examples.map((e) => (
                <div key={e} dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-xl border-2 border-white bg-white px-3 py-2 text-center">
                  <span className="font-en font-bold text-slate-700">{e}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <FormulaBoard />
    </Frame>
  );
}

function KeyRule() {
  return (
    <Frame mascot="⭐" step="⭐" title="القاعدة الذهبية للدرس 13" lead="احفظ هذه الجملة:">
      <div className="rounded-3xl bg-gradient-to-l from-amber-600 to-orange-600 p-5 text-center">
        <div className="text-lg font-black text-white md:text-2xl">
          <LatinRuns text={KEY_RULE_13.text} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {KEY_RULE_13.pairs.map((p) => (
          <div key={p.ok} className="grid gap-2">
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex items-center justify-between gap-3 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
              <span className="font-en text-xl font-black text-emerald-800">{p.ok}</span>
              <span className="text-xl">✅</span>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex items-center justify-between gap-3 rounded-2xl border-2 border-rose-300 bg-rose-50 px-4 py-3">
              <span className="font-en text-xl font-black text-rose-700 line-through decoration-rose-400">{p.bad}</span>
              <span className="text-xl">❌</span>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 text-center text-sm font-bold text-violet-900">
        🧠 السؤال الذكي: أين يقف الماضي؟ — إذا رأيت <En className="font-black">did</En> أو <En className="font-black">didn't</En> فالماضي عنده، والفعل الرئيسي يبقى <En className="font-black">Base Form</En>.
      </div>
    </Frame>
  );
}

function Roadmap() {
  return (
    <Frame mascot="🚀" step="🚀" title="خريطة الدروس حتى الآن" lead="ثلاثة عشر درسًا — وهذا موقعك اليوم:">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_13.map((r, i) => (
          <div
            key={r.n}
            className={`pop pop-${Math.min(i + 1, 6)} flex items-center gap-3 rounded-2xl border-2 p-3 ${
              r.here ? "border-amber-400 bg-amber-50 shadow" : "border-slate-200 bg-white"
            }`}
          >
            <span className={`font-en grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black text-white ${r.here ? "bg-amber-600" : "bg-slate-800"}`}>
              {r.n}
            </span>
            <span className="min-w-0 flex-1">
              <LatinRuns text={r.en} />
            </span>
            {r.here && <span className="rounded-full bg-amber-600 px-3 py-1 text-xs font-bold text-white">نحن هنا</span>}
          </div>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
        <div className="font-head mb-1 text-lg font-bold text-emerald-800">الخطوة التالية</div>
        <BoldText text={ROADMAP_13_NEXT} className="text-base leading-relaxed text-emerald-900" />
      </div>
    </Frame>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-slate-900 p-8 text-center text-white md:p-12">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-amber-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl" />
      <div className="relative">
        <div className="pop anim-drift text-6xl">🎓</div>
        <h2 className="pop pop-1 font-head mt-3 text-3xl font-bold md:text-4xl">أصبحت تتكلم عن الماضي بسؤال ونفي صحيحين</h2>
        <p className="pop pop-2 mx-auto mt-3 max-w-2xl text-lg text-slate-300">
          الآن تعرف: <En className="font-extrabold text-amber-300">Subject + didn't + Base Verb</En> للنفي، و
          <En className="font-extrabold text-amber-300">Did + Subject + Base Verb?</En> للسؤال، و
          <En className="font-extrabold text-amber-300">Yes, subject + did.</En> / <En className="font-extrabold text-amber-300">No, subject + didn't.</En> للإجابة القصيرة —
          والماضي دائمًا في <En className="font-extrabold text-amber-300">did / didn't</En>.
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

function BlockView({ b }: { b: Block13 }) {
  switch (b.type) {
    case "text":
      return <Rich text={b.text} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />;
    case "list":
      return (
        <div className="grid gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4">
          {b.items.map((x, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">{i + 1}</span>
              <LatinRuns text={x} />
            </div>
          ))}
        </div>
      );
    case "english": {
      const tone =
        b.tone === "good"
          ? "border-emerald-200 bg-emerald-50"
          : b.tone === "bad"
            ? "border-rose-200 bg-rose-50"
            : b.tone === "equiv"
              ? "border-violet-200 bg-violet-50"
              : b.tone === "change"
                ? "border-amber-300 bg-amber-50"
                : "border-slate-200 bg-white";
      return (
        <div dir="ltr" style={{ direction: "ltr" }} className={`ltr-row flex flex-wrap items-center gap-3 rounded-3xl border-2 p-4 ${tone}`}>
          <span className={`font-en text-left text-lg font-extrabold md:text-xl ${b.tone === "bad" ? "text-rose-700 line-through decoration-rose-300" : "text-slate-800"}`}>{b.en}</span>
          {b.ar && <span dir="rtl" className="text-base font-bold text-slate-500">{b.ar}</span>}
        </div>
      );
    }
    case "chips":
      return (
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
          {b.items.map((c) => (
            <span
              key={c}
              className={`font-en rounded-2xl border-2 px-4 py-2 text-lg font-extrabold ${
                b.tone === "base"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : b.tone === "violet"
                    ? "border-violet-200 bg-violet-50 text-violet-800"
                    : "border-orange-200 bg-orange-50 text-orange-800"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      );
    case "sentence":
      return <SentenceCard parts={b.parts} ar={b.ar} note={b.note} q={b.q} />;
    case "rawFormula":
      return (
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex justify-center rounded-3xl border-2 border-amber-100 bg-amber-50/70 p-4">
          <span className="font-en text-xl font-black text-slate-900 md:text-2xl">{b.text}</span>
        </div>
      );
    case "formula":
      return <FormulaRowView fk={b.key} />;
    case "ok":
      return <Verdict ok en={b.en} ar={b.ar} />;
    case "bad":
      return <Verdict ok={false} en={b.en} why={b.why} />;
    case "note":
      return <Note emoji={b.emoji} text={b.text} />;
    case "cards":
      return (
        <div className="grid gap-3 sm:grid-cols-2">
          {b.items.map((c, i) => (
            <div key={i} className="flex items-center gap-3 rounded-3xl border-2 border-slate-100 bg-slate-50/60 p-4">
              {c.emoji && <span className="text-2xl">{c.emoji}</span>}
              <div className="min-w-0 flex-1">
                {c.label && <div className="text-xs font-bold text-slate-400">{c.label}</div>}
                <Rich text={c.ar} className="text-base font-bold text-slate-700 md:text-lg" />
                {c.en && (
                  <En className="mt-1 block text-lg font-extrabold text-slate-800">{c.en}</En>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    case "formulaBoard":
      return <FormulaBoard />;
    case "didHero":
      return <DidHero />;
    case "goldenMachine":
      return <GoldenMachine />;
    case "negMachine":
      return <NegMachine />;
    case "pronounGallery":
      return <PronounGallery />;
    case "twoPastMarkers":
      return <TwoPastMarkers />;
    case "pastBall":
      return <PastBall />;
    case "questionBuilder":
      return <QuestionBuilder />;
    case "extraQuestions":
      return <ExtraQuestions />;
    case "shortAnswerTrainer":
      return <ShortAnswerTrainer />;
    case "presentPastToggle":
      return <PresentPastToggle mode={b.mode} />;
    case "geniusLadder":
      return <GeniusLadder />;
    case "whMeanings":
      return <WhMeanings />;
    case "whGrid":
      return <WhGrid />;
    case "whFromSentence":
      return <WhFromSentence />;
    case "dangerBoard":
      return <DangerBoard />;
    case "beVsDidBoard":
      return <BeVsDidBoard />;
    case "twoJobsOfDid":
      return <TwoJobsOfDid />;
  }
}

/** مُصدَّرة لأجل فحص العرض الآلي لكل الشرائح (scripts/audit-render-direction.mjs). */
export function SlideView({ s, onExit }: { s: Slide13; onExit: () => void }) {
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
          {ex.type === "errorHunter" && <ErrorHunterEx />}
          {ex.type === "negTransform" && <NegTransformEx ex={ex} />}
          {ex.type === "qTransform" && <QTransformEx ex={ex} />}
          {ex.type === "choose" && <ChooseEx ex={ex} />}
          {ex.type === "fill" && <FillEx ex={ex} />}
          {ex.type === "triple" && <TripleEx />}
          {ex.type === "iq200" && <IQ200Ex />}
          {ex.type === "pattern" && <PatternEx />}
          {ex.type === "detective" && <DetectiveEx />}
          {ex.type === "finalChallenge" && <FinalChallengeEx />}
        </Frame>
      );
    }
    case "summary":
      return <Summary />;
    case "keyRule":
      return <KeyRule />;
    case "roadmap":
      return <Roadmap />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الشرح — أثبت تحكمك في did / didn't والأسئلة.">
          <FinalQuiz lesson={13} accent="bg-amber-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(s: Slide13): string {
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
  "تذكير و DID": "text-violet-600",
  النفي: "text-rose-600",
  "تكوين السؤال": "text-sky-600",
  "الإجابات القصيرة": "text-emerald-600",
  "مقارنات مهمة": "text-indigo-600",
  "أسئلة Wh": "text-fuchsia-600",
  "أخطاء خطيرة": "text-red-600",
  "DID كفعل أساسي": "text-amber-700",
  "اللعبة والتمارين": "text-amber-600",
  "تحديات IQ200": "text-orange-600",
  "المحقق والتحدي النهائي": "text-teal-600",
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
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 13 · did / didn&apos;t والأسئلة</div>
        <En className="text-xs font-semibold text-slate-400">Past Simple — Negative · Questions · Short Answers</En>
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

export default function Lesson13({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l13-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fdf9f2] text-slate-800">
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
                <div className="h-full rounded-full bg-gradient-to-l from-amber-500 via-orange-400 to-rose-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>
          <main id="l13-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
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
