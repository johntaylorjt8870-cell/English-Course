import { Fragment, useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  PRONOUNS,
  WORDS,
  LAYSA,
  HAL,
  MACHINE_TRIOS,
  type Pronoun,
  type Exercise,
  type Jamla,
  type Trio,
  type Word,
  type Slide,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";

// ============================================================
// ألوان الأدوار الثلاثة
// ============================================================
type Mode = "aff" | "neg" | "q";

const MODE_STYLE: Record<Mode, { ring: string; soft: string; solid: string; text: string; dot: string; label: string; en: string; emoji: string; desc: string }> = {
  aff: { ring: "border-emerald-300", soft: "bg-emerald-50", solid: "bg-emerald-500", text: "text-emerald-700", dot: "bg-emerald-500", label: "الإثبات", en: "Affirmative", emoji: "✅", desc: "الجملة تخبرنا أن شيئًا صحيح أو موجود" },
  neg: { ring: "border-rose-300", soft: "bg-rose-50", solid: "bg-rose-500", text: "text-rose-700", dot: "bg-rose-500", label: "النفي", en: "Negative", emoji: "🚫", desc: "نقول: لست / ليس / ليست / لسنا / ليسوا" },
  q: { ring: "border-indigo-300", soft: "bg-indigo-50", solid: "bg-indigo-500", text: "text-indigo-700", dot: "bg-indigo-500", label: "السؤال", en: "Question", emoji: "❓", desc: "قلّب الفعل مع الفاعل" },
};

const Col: Record<Trio["p"]["be"], string> = {
  am: "text-rose-600",
  is: "text-amber-600",
  are: "text-indigo-600",
};

/** فاعل الجملة بالعربية */
const SUBJ_AR: Record<string, string> = { I: "أنا", He: "هو", She: "هي", It: "إنه", You: "أنت", We: "نحن", They: "هم" };

const BE_BG: Record<Pronoun["be"], string> = { am: "#f43f5e", is: "#f59e0b", are: "#6366f1" };

// ============================================================
// عناصر صغيرة
// ============================================================

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`ltr font-en ${className}`}>{children}</span>;
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        const m = p.match(/^\[\[(.+)\]\]$/);
        if (m) {
          return (
            <span key={i} className="ltr font-en mx-1 rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-800">
              {m[1]}
            </span>
          );
        }
        return (
          <Fragment key={i}>
            {p.split(/(\s+)/).map((t, j) =>
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

/** عرض جملة بتلوين أجزائها (S أزرق / verb to be amber / rest slate) */
function JamlaEn({ s, b, rest, bClass = "text-amber-600" }: Jamla & { bClass?: string }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center gap-2">
      <span className="font-en rounded-xl bg-sky-50 px-3 py-1.5 text-2xl font-extrabold text-sky-700">{s}</span>
      <span className={`font-en rounded-xl bg-amber-50 px-3 py-1.5 text-2xl font-extrabold ${bClass}`}>{b}</span>
      <span className="font-en rounded-xl bg-slate-100 px-3 py-1.5 text-2xl font-extrabold text-slate-700">{rest}</span>
      <span className="font-en text-3xl font-bold text-slate-300">.</span>
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
  step?: string | number;
  badge?: string;
  title: React.ReactNode;
  lead?: string;
  children: React.ReactNode;
  tip?: string;
}) {
  return (
    <section className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10">
      <div className="pointer-events-none absolute left-6 top-5 select-none text-5xl md:text-6xl anim-drift" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-3">
        {step !== undefined && (
          <span className="font-head grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow">{step}</span>
        )}
        {badge && <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-bold text-violet-700">{badge}</span>}
      </div>
      <h2 className="font-head mt-4 max-w-[85%] text-3xl font-bold leading-snug text-slate-900 md:text-4xl">{title}</h2>
      {lead && <p className="mt-2 max-w-[85%] text-xl text-slate-500">{lead}</p>}
      <div className="mt-7 space-y-4">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-900 p-4 text-white">
          <span className="text-3xl">🦉</span>
          <span className="text-lg font-semibold">{tip}</span>
        </div>
      )}
    </section>
  );
}

// ============================================================
// الشرائح
// ============================================================

function Cover() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center md:p-14 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)]">
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-rose-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-indigo-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🔥</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">الدرس الثالث</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          <En>Verb to be</En>
        </h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">الإثبات + النفي + السؤال + الإجابات القصيرة</p>

        <div className="pop pop-4 mt-10 grid gap-3 sm:grid-cols-3">
          {(Object.keys(MODE_STYLE) as Mode[]).map((m, i) => (
            <div key={m} className={`rounded-3xl border-2 ${MODE_STYLE[m].ring} ${MODE_STYLE[m].soft} p-5`}>
              <div className="pop pop-5 text-4xl" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>{MODE_STYLE[m].emoji}</div>
              <div className="font-head mt-2 text-2xl font-bold text-slate-800">{MODE_STYLE[m].label}</div>
              <En className="text-sm font-semibold text-slate-400">{MODE_STYLE[m].en}</En>
              <div className="mt-2 text-sm text-slate-500">{MODE_STYLE[m].desc}</div>
            </div>
          ))}
        </div>
        <p className="pop pop-6 mt-8 text-base text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  const objectives = [
    "استخدام [[am / is / are]] بشكل صحيح.",
    "تكوين جملة مثبتة.",
    "تحويل الجملة إلى النفي.",
    "تحويل الجملة إلى سؤال.",
    "الإجابة عن أسئلة [[Verb to be]].",
    "فهم الفرق بين: [[I am]] · [[I am not]] · [[Am I?]]",
  ];
  return (
    <Frame mascot="🎯" step="🎯" title="في نهاية الدرس يجب أن يكون الطالب قادرًا على:">
      <div className="grid gap-3 sm:grid-cols-2">
        {objectives.map((o, i) => (
          <div key={i} className={`pop pop-${i + 1} flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-500 font-bold text-white">{i + 1}</span>
            <Rich text={o} className="text-xl text-slate-700 leading-relaxed" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Review() {
  return (
    <Frame mascot="🔁" step="1" title="مراجعة سريعة" lead={undefined}>
      <p className="text-xl text-slate-500">تذكرنا في الدرس السابق:</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 font-head text-xl font-bold text-slate-700">قاعدة الضمائر مع Verb to be:</div>
          <div className="space-y-2">
            {PRONOUNS.map((p) => (
              <div key={p.en} dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <En className="text-lg font-bold text-slate-800">{p.en}</En>
                <span className="font-en text-2xl font-bold text-slate-300" aria-hidden>→</span>
                <En className={`text-xl font-extrabold ${Col[p.be]}`}>{p.be}</En>
              </div>
            ))}
          </div>
        </div>
        <div className="grid content-start gap-3">
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
            <div className="text-2xl">✅</div>
            <div className="mt-1 text-lg font-bold text-slate-800">جملة مثبتة</div>
            <div className="text-sm text-slate-500">نخبر أن شيئًا صحيح أو موجود</div>
          </div>
          <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4">
            <div className="text-2xl">🚫</div>
            <div className="mt-1 text-lg font-bold text-slate-800">جملة منفية</div>
            <div className="text-sm text-slate-500">نقول: لست / ليس / ليست ...</div>
          </div>
          <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-4">
            <div className="text-2xl">❓</div>
            <div className="mt-1 text-lg font-bold text-slate-800">سؤال</div>
            <div className="text-sm text-slate-500">نقلّب الفعل قبل الفاعل</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function AffirmSlide({ examples, title, mascot, lead, step }: { examples: Jamla[]; title: string; mascot: string; lead?: string; step?: string | number }) {
  return (
    <Frame mascot={mascot} step={step} title={title} lead={lead}>
      <div className="grid gap-3">
        {examples.map((e, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} rounded-3xl border border-slate-200 bg-white p-4 shadow-sm`}>
            <JamlaEn {...e} />
            <div className="mt-2 text-lg text-slate-500 pr-1">{e.ar}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function NegRule() {
  return (
    <Frame mascot="🚫" step="4" title="② الآن نبدأ بالنفي" lead="عندما نريد أن نقول «لست / ليس / ليست / لسنا / ليسوا» نضع not بعد am / is / are — قاعدة سهلة جدًا." tip="لا نضع not قبل Verb to be — بل نضعها بعده مباشرة." >
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-5">
        <FormulaBox roles={["s", "b", "not"]} />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <div className="mb-1 text-sm font-bold text-slate-400">الإثبات</div>
            <En className="text-2xl font-extrabold text-slate-800">I am happy.</En>
            <div className="text-slate-500">أنا سعيد.</div>
          </div>
          <div className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
            <div className="mb-1 text-sm font-bold text-rose-400">النفي</div>
            <En className="text-2xl font-extrabold text-slate-800">
              I am <span className="rounded-lg bg-rose-200 px-1 text-rose-800">not</span> happy.
            </En>
            <div className="text-slate-500">أنا لست سعيدًا.</div>
          </div>
        </div>
        <p className="mt-4 text-lg">
          <span className="font-bold text-rose-700">⭐ قاعدة ذهبية:</span> ضع <En className="font-extrabold text-rose-600">not</En> بعد <En>am / is / are</En> مباشرة.
        </p>
      </div>
      <div className="rounded-2xl border-2 border-rose-200 bg-white p-4">
        <JamlaEn s="I" b="am" rest="happy" bClass="text-amber-600" />
        <div className="mt-2 flex items-center gap-2 text-rose-700 font-bold">
          <span className="text-xl">↓</span>
          <En className="text-2xl">I am <span className="rounded-lg bg-rose-200 px-1 italic">not</span> happy.</En>
          <span className="text-slate-400">← أضفنا not فقط</span>
        </div>
      </div>
    </Frame>
  );
}

function FormulaBox({ roles }: { roles: ("s" | "b" | "not")[] }) {
  return (
    <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2">
      {roles.map((r, i) => {
        if (r === "s") return <Fragment key={i}><span className="font-en rounded-xl bg-sky-500 px-4 py-2 text-2xl font-extrabold text-white shadow">Subject</span><span className="text-3xl font-bold text-slate-300">+</span></Fragment>;
        if (r === "b") return <Fragment key={i}><span className="font-en rounded-xl bg-amber-500 px-4 py-2 text-2xl font-extrabold text-white shadow">am / is / are</span>{i < roles.length - 1 && <span className="text-3xl font-bold text-slate-300">+</span>}</Fragment>;
        if (r === "not") return <Fragment key={i}><span className="font-en rounded-xl bg-rose-500 px-4 py-2 text-2xl font-extrabold text-white shadow">not</span><span className="text-3xl font-bold text-slate-300">+</span></Fragment>;
        return null;
      })}
      <span className="flex flex-col items-center rounded-xl bg-slate-200 px-4 py-2 shadow">
        <span className="font-en text-2xl font-extrabold text-slate-600">Rest</span>
        <span className="text-xs font-bold text-slate-500">باقي الجملة</span>
      </span>
    </div>
  );
}

function PronounGridMode({ mode }: { mode: "neg" | "q" }) {
  const isNeg = mode === "neg";
  return (
    <Frame mascot={isNeg ? "🔄" : "❓"} step={isNeg ? "5" : "6"} title={isNeg ? "حوّل الجملة إلى النفي مع كل ضمير" : "③ الآن نبدأ بالأسئلة"}>
      {!isNeg && (
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-4">
          <p className="text-xl font-bold text-slate-800">القاعدة الذهبية للسؤال:</p>
          <p className="mb-2 mt-1 text-lg text-slate-600">الجملة: <En>Subject + am/is/are</En> ←→ السؤال: <En>am/is/are + Subject</En></p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <SwapDemo fixed />
          </div>
        </div>
      )}
      <div className="grid gap-3">
        {PRONOUNS.map((p, i) => {
          const affBase = WORDS[i % WORDS.length];
          const negBase = WORDS[(i + 4) % WORDS.length];
          return <PronounFlipRow key={p.en} p={p} affWord={affBase} negWord={negBase} mode={mode} delay={i} />;
        })}
      </div>
    </Frame>
  );
}

/** صف قابل للقلب لكل ضمير */
function PronounFlipRow({ p, affWord, negWord, mode, delay }: { p: Pronoun; affWord: Word; negWord: Word; mode: "neg" | "q"; delay: number }) {
  const [open, setOpen] = useState(false);
  const aff: Jamla = { s: p.en, b: p.be, rest: affWord.en, ar: "" };

  return (
    <div className={`pop pop-${Math.min(delay + 1, 6)} rounded-3xl border-2 transition ${open ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200 bg-white"} p-4 shadow-sm`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full flex-wrap items-center gap-3 text-right">
        <WordChip size="sm" text={p.en} role="S" />
        <span className="text-xl text-slate-400">=</span>
        <span className="text-lg font-bold text-slate-700">{p.ar}</span>
        <span className="mr-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{open ? "إخفاء" : "كيف تصبح؟"}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mt-3 flex flex-wrap items-center gap-4 pr-1">
          {mode === "neg" ? (
            <div className="flex flex-col gap-1">
              <En className="text-lg text-slate-500 line-through">{aff.s} {aff.b} {affWord.en}.</En>
              <En className="text-2xl font-extrabold text-slate-900">
                {aff.s} {aff.b} <span className="rounded-lg bg-rose-200 px-1 text-rose-800 italic">not</span> {negWord.en}.
              </En>
              <span className="text-sm text-rose-600 font-semibold">({SUBJ_AR[p.en]} {LAYSA[p.en]} {negWord.neg(p.gender)}.)</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <En className="text-lg text-slate-500">{aff.s} {aff.b} {aff.rest}.</En>
              <div className="flex items-center gap-2">
                <SwapChip a={aff.b} b={low(aff.s)} />
                <En className="text-2xl font-extrabold text-slate-900">{aff.rest}?</En>
                <span className="font-bold text-indigo-700">({HAL[p.en]} {aff.rest}؟)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SwapChip({ a, b }: { a: string; b: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className="ltr-row inline-flex items-center gap-1 rounded-xl border-2 border-indigo-300 bg-white p-1.5 shadow-sm">
      <span className="font-en rounded-lg bg-amber-400 px-2 py-1 text-xl font-extrabold text-white">{a}</span>
      <span className="text-lg text-indigo-500">⇄</span>
      <span className="font-en rounded-lg bg-sky-400 px-2 py-1 text-xl font-extrabold text-white">{b}</span>
    </span>
  );
}

function SwapDemo({ fixed }: { fixed?: boolean }) {
  return (
    <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2 text-2xl font-extrabold">
        <span className="font-en rounded-xl bg-sky-400 px-3 py-1.5 text-white">She</span>
        <span className="font-en rounded-xl bg-amber-400 px-3 py-1.5 text-white">is</span>
        <span className="font-en rounded-xl bg-slate-200 px-3 py-1.5 text-slate-700">happy.</span>
      </div>
      <div className="my-2 text-3xl text-indigo-500">⇅</div>
      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-2 text-2xl font-extrabold">
        <span className="font-en rounded-xl bg-amber-400 px-3 py-1.5 text-white">Is</span>
        <span className="font-en rounded-xl bg-sky-400 px-3 py-1.5 text-white">she</span>
        <span className="font-en rounded-xl bg-slate-200 px-3 py-1.5 text-slate-700">happy?</span>
      </div>
      <div className="mt-2 text-sm font-bold text-indigo-600">هل هي سعيدة؟</div>
      {fixed && <div className="mt-1 text-xs text-slate-400">قَلبنا مكان الفاعل والفعل</div>}
    </div>
  );
}

function WordChip({ text, role, size = "md", active, onClick }: { text: string; role: "S" | "V" | "O" | "BE" | "NOT"; size?: "sm" | "md" | "lg"; active?: boolean; onClick?: () => void }) {
  const styles: Record<string, string> = {
    S: "bg-sky-100 border-sky-300 text-sky-800",
    V: "bg-amber-100 border-amber-300 text-amber-800",
    O: "bg-emerald-100 border-emerald-300 text-emerald-800",
    BE: "bg-amber-100 border-amber-300 text-amber-800",
    NOT: "bg-rose-100 border-rose-300 text-rose-800",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex flex-col items-center rounded-2xl border-2 ${styles[role]} ${size === "lg" ? "px-5 py-3 text-3xl" : size === "sm" ? "px-3 py-1.5 text-xl" : "px-4 py-2 text-2xl"} font-en font-bold leading-tight shadow-sm transition active:scale-95 ${active ? "ring-2 ring-offset-1 ring-slate-900" : ""}`}
    >
      {text}
    </button>
  );
}

function DoWarning() {
  return (
    <Frame mascot="⚠️" step="7" title="لا نستخدم do / does هنا" tip="سنفهم لماذا بالتفصيل عندما نصل إلى Present Simple.">
      <p className="text-xl text-slate-500">مهم جدًا للمستقبل — مع <En>Verb to be</En>:</p>
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
          <span className="text-2xl">✕</span>
          <En className="text-2xl font-bold text-rose-800 line-through decoration-rose-300">Does he is happy?</En>
          <span className="text-sm text-slate-500">خطأ</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
          <span className="text-2xl">✕</span>
          <En className="text-2xl font-bold text-rose-800 line-through decoration-rose-300">Do they are students?</En>
          <span className="text-sm text-slate-500">خطأ</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <span className="text-2xl">✓</span>
          <En className="text-2xl font-bold text-emerald-800">Is he happy?</En>
          <span className="text-sm text-slate-500">صحيح</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <span className="text-2xl">✓</span>
          <En className="text-2xl font-bold text-emerald-800">Are they students?</En>
          <span className="text-sm text-slate-500">صحيح</span>
        </div>
      </div>
    </Frame>
  );
}

function SAExampleCard({ ex, delay }: { ex: Trio; delay: number }) {
  const [open, setOpen] = useState(false);
  // الحالة الخاصة: Are you...? ← الإجابة بـ I am
  const ansP = ex.p.en === "You" ? { en: "I", be: "am" } : { en: shortQ(ex.p.en), be: ex.p.be };
  const yes = `Yes, ${ansP.en} ${ansP.be}.`;
  const no = `No, ${ansP.en} ${ansP.be} not.`;
  const special = ex.p.en === "You";

  return (
    <div className={`pop pop-${Math.min(delay + 1, 6)} rounded-3xl border-2 transition ${open ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200 bg-white"} p-4 shadow-sm`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full flex-wrap items-center gap-3 text-right">
        <span className="font-en rounded-xl bg-indigo-100 px-3 py-1 text-2xl font-extrabold text-indigo-700">{pQ(ex.p.be)} {shortQ(ex.p.en)} {ex.word}?</span>
        <span className="text-lg text-slate-500">{HAL[ex.p.en]} {WORDS.find((w) => w.en === ex.word)?.aff(ex.p.gender) ?? ex.word}؟</span>
        <span className="mr-auto rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{open ? "إخفاء" : "كيف نجيب؟"}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="mt-3 flex flex-wrap items-center gap-3 pr-1">
          <div className="rounded-xl bg-white p-3">
            <div className="mb-1 text-sm font-bold text-emerald-600">✅ نعم</div>
            <En className="text-xl font-bold text-slate-900">{yes}</En>
            {special && <div className="mt-1 text-xs font-bold text-indigo-600">✍️ لاحظ: نجيب بـ I وليس You!</div>}
          </div>
          <div className="rounded-xl bg-white p-3">
            <div className="mb-1 text-sm font-bold text-rose-600">🚫 لا</div>
            <En className="text-xl font-bold text-slate-900">{no}</En>
          </div>
        </div>
      </div>
    </div>
  );
}

function pQ(be: string) { return be === "am" ? "Am" : be === "is" ? "Is" : "Are"; }
/** lowercase مع الحفاظ على حرف I الكبير دائمًا */
function low(w: string) { return w === "I" ? "I" : w.toLowerCase(); }
function shortQ(en: string) { return low(en); }

function ShortAnswerSlide({ examples }: { examples: Trio[] }) {
  return (
    <Frame mascot="🗣️" step="8" title="④ الإجابات القصيرة" lead="لا نحتاج دائمًا إلى إجابة طويلة — إجابة قصيرة تكفي.">
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <div className="text-sm font-bold text-slate-400">السؤال</div>
            <En className="text-2xl font-bold text-slate-900">Are you a student?</En>
            <div className="text-sm text-slate-500">هل أنت طالب؟</div>
          </div>
          <span className="text-2xl text-slate-300">←</span>
          <div>
            <div className="text-sm font-bold text-emerald-600">الإجابة المختصرة</div>
            <En className="text-2xl font-extrabold text-slate-900">Yes, I am.</En>
            <div className="text-sm text-emerald-600">نعم.</div>
          </div>
          <div>
            <div className="text-sm font-bold text-rose-600">أو</div>
            <En className="text-2xl font-extrabold text-slate-900">No, I am not.</En>
            <div className="text-sm text-rose-600">لا.</div>
          </div>
        </div>
      </div>
      <p className="text-lg text-slate-500">اضغط على أي صف لترى الإجابات لكل ضمير:</p>
      <div className="grid gap-3">
        {examples.map((ex, i) => (
          <SAExampleCard key={ex.p.en} ex={ex} delay={i} />
        ))}
      </div>
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-lg font-bold text-slate-800">ملاحظة مهمة للـ You:</span>
        </div>
        <p className="mt-1 text-lg">
          السؤال: <En>Are you...?</En> لكن الإجابة دائمًا <En>Yes, I am.</En> (وليس <En className="text-rose-600 line-through">Yes, you are.</En> ❌) لأنك عندما تتكلم عن نفسك تستخدم <En>I</En>.
        </p>
      </div>
    </Frame>
  );
}

// ============================================================
// آلة التحويل
// ============================================================

function Machine() {
  const [pi, setPi] = useState(0);
  const [wi, setWi] = useState(0);
  const [mode, setMode] = useState<Mode>("aff");

  const p = PRONOUNS[pi];
  const w = WORDS[wi];

  const aff: Jamla = { s: p.en, b: p.be, rest: w.en, ar: `${SUBJ_AR[p.en]} ${w.aff(p.gender)}.` };
  const neg: Jamla = { s: p.en, b: p.be, rest: `${p.be} not ${w.en}`, ar: `${SUBJ_AR[p.en]} ${LAYSA[p.en]} ${w.neg(p.gender)}.` };
  const qAr = `${HAL[p.en]} ${w.aff(p.gender)}؟`;

  const random = () => {
    setPi(Math.floor(Math.random() * PRONOUNS.length));
    setWi(Math.floor(Math.random() * WORDS.length));
    setMode("aff");
  };

  const jam = mode === "aff" ? aff : mode === "neg" ? neg : null;

  return (
    <Frame mascot="⚙️" step="9" title="آلة التحويل — اختر وراقب!" lead="اختر الضمير والكلمة، ثم بدّل بين الإثبات والنفي والسؤال لتشاهد الجملة تتحول أمامك.">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4">
          <div className="mb-2 font-head text-lg font-bold text-sky-800">① الفاعل</div>
          <div className="flex flex-wrap gap-2">
            {PRONOUNS.map((x, i) => (
              <button key={x.en} onClick={() => setPi(i)} className={`rounded-xl border-2 px-3 py-1.5 font-en text-lg font-bold transition active:scale-95 ${i === pi ? "border-transparent bg-sky-500 text-white shadow" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
          <div className="mb-2 font-head text-lg font-bold text-amber-800">② الكلمة</div>
          <div className="flex flex-wrap gap-2">
            {WORDS.map((x, i) => (
              <button key={x.en} onClick={() => setWi(i)} className={`rounded-xl border-2 px-3 py-1.5 font-en text-lg font-bold transition active:scale-95 ${i === wi ? "border-transparent bg-amber-500 text-white shadow" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"}`}>
                {x.en}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 font-head text-lg font-bold text-slate-800">③ الحوّل</div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(MODE_STYLE) as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-xl border-2 px-3 py-1.5 font-bold transition active:scale-95 ${mode === m ? `border-transparent ${MODE_STYLE[m].solid} text-white shadow` : `border-slate-200 bg-white text-slate-700 hover:border-slate-400`}`}
              >
                {MODE_STYLE[m].emoji} {MODE_STYLE[m].label}
              </button>
            ))}
          </div>
          <button onClick={random} className="mt-3 w-full rounded-xl bg-slate-900 py-2 font-bold text-white transition hover:bg-slate-700">
            🎲 عشوائي
          </button>
        </div>
      </div>

      <div key={`${pi}-${wi}-${mode}`} className="pop rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-sm font-bold text-white ${MODE_STYLE[mode].solid}`}>{MODE_STYLE[mode].label}</span>
          <span className="text-lg font-bold text-slate-800">{p.ar} :</span>
        </div>
        {mode === "q" ? (
          <div className="mt-4">
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2 text-3xl font-extrabold md:text-4xl">
              <span className={`font-en rounded-2xl ${MODE_STYLE.q.solid} px-4 py-2 text-white shadow`}>{pQ(p.be)}</span>
              <span className="font-en rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">{low(p.en)}</span>
              <span className="font-en rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">{w.en}?</span>
            </div>
            <div className="mt-3 text-center text-2xl font-bold text-indigo-700">{qAr}</div>
            <div className="mt-4 rounded-2xl bg-indigo-50 p-3 text-center">
              <span className="block text-sm font-bold text-indigo-600">قَلبنا مكان الفعل والفاعل</span>
              <En className="mt-1 block text-base font-bold text-indigo-500">
                {p.en} {p.be} ... ⇄ {pQ(p.be)} {low(p.en)} ...?
              </En>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2 text-3xl md:text-4xl">
              <span className="font-en rounded-2xl bg-sky-500 px-4 py-2 text-white shadow">{p.en}</span>
              <span className="font-en rounded-2xl px-4 py-2 text-white shadow" style={{ backgroundColor: BE_BG[p.be] }}>{p.be}</span>
              {mode === "neg" && (
                <span className="tada font-en rounded-2xl bg-rose-500 px-4 py-2 text-white shadow">not</span>
              )}
              <span className="font-en rounded-2xl bg-slate-100 px-4 py-2 text-slate-700">{w.en}.</span>
            </div>
            <div className={`mt-3 text-center text-2xl font-bold ${mode === "aff" ? "text-slate-700" : "text-rose-700"}`}>
              {jam!.ar}
            </div>
            {mode === "neg" && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-center">
                <span className="text-sm font-bold text-rose-600">أضفنا not بعد {p.be} مباشرة</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Frame>
  );
}

// ============================================================
// الجدول الكبير
// ============================================================

function BigTable() {
  const [revealed, setRevealed] = useState<number[]>([]);
  const toggle = (i: number) => setRevealed((r) => (r.includes(i) ? r.filter((x) => x !== i) : [...r, i]));
  const revealAll = () => setRevealed(PRONOUNS.map((_, i) => i));

  const rows: Jamla[] = PRONOUNS.map((p, i) => ({
    s: p.en,
    b: p.be,
    rest: WORDS[i % WORDS.length].en,
    ar: "",
  }));

  return (
    <Frame mascot="📋" step="10" title="الجدول المهم — يلخّص الدرس كله" tip="اعتبر هذا الجدول مرجعك الدائم — احفظه جيدًا.">
      <div className="flex justify-end">
        <button onClick={revealAll} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          👁️ إظهار الكل
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-4 gap-2 rounded-t-2xl bg-slate-900 p-3 font-bold text-white">
            <div>الضمير</div>
            <div className="text-center">✅ الإثبات</div>
            <div className="text-center">🚫 النفي</div>
            <div className="text-center">❓ السؤال</div>
          </div>
          {rows.map((r, i) => {
            const p = PRONOUNS[i];
            const w = WORDS[i % WORDS.length];
    const negEn = `${r.s} ${r.b} not ${w.en}.`;
    const qEn = `${pQ(p.be)} ${low(r.s)} ${w.en}?`;
            const open = revealed.includes(i);
            return (
              <div key={p.en} className={`grid grid-cols-4 items-center gap-2 border-b border-slate-100 p-3 transition ${open ? "bg-slate-50/60" : "hover:bg-slate-50"}`}>
                <div className="flex items-center gap-2">
                  <En className="text-xl font-extrabold text-slate-800">{r.s}</En>
                  <span className="text-slate-300">←</span>
                  <En className={`text-lg font-bold ${Col[p.be]}`}>{p.be}</En>
                  <span className="text-xs text-slate-400">({p.ar})</span>
                </div>
                <button onClick={() => toggle(i)} className="text-left font-en text-lg font-bold text-slate-700 transition hover:text-slate-900" dir="ltr">
                  {r.s} {r.b} {r.rest}.
                </button>
                <button onClick={() => toggle(i)} className={`text-left font-en text-lg font-bold transition ${open ? "text-rose-700" : "text-slate-300"}`} dir="ltr">
                  {open ? negEn : "• • • • •"}
                </button>
                <button onClick={() => toggle(i)} className={`text-left font-en text-lg font-bold transition ${open ? "text-indigo-700" : "text-slate-300"}`} dir="ltr">
                  {open ? qEn : "• • • • •"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-sm text-slate-400">اضغط على أي خلية لكشف/إخفاء محتواها</p>
    </Frame>
  );
}

// ============================================================
// التدريب الذكي
// ============================================================

function SmartDrill() {
  const items = MACHINE_TRIOS.slice(0, 3);
  return (
    <Frame mascot="🧠" step="11" title="تدريب ذكي — ثلاث خطوات" lead="سأعطيك جملة، وأنت تحوّلها بثلاث خطوات. كشف كل خطوة بعد أن تجرب بنفسك.">
      <div className="grid gap-4">
        {items.map((ex, i) => (
          <DrillItem key={i} ex={ex} idx={i} />
        ))}
      </div>
    </Frame>
  );
}

function DrillItem({ ex, idx }: { ex: Trio; idx: number }) {
  const w = WORDS.find((x) => x.en === ex.word)!;
  const [step, setStep] = useState(0);

  const affEn = `${ex.p.en} ${ex.p.be} ${w.en}.`;
  const negEn = `${ex.p.en} ${ex.p.be} not ${w.en}.`;
  const qEn = `${pQ(ex.p.be)} ${low(ex.p.en)} ${w.en}?`;
  const ansY = `Yes, ${low(ex.p.en)} ${ex.p.be}.`;
  const ansN = `No, ${low(ex.p.en)} ${ex.p.be} not.`;

  const steps = [
    { label: "② النفي", content: <En className="text-2xl font-extrabold text-slate-900">{negEn}</En>, sub: `${LAYSA[ex.p.en]} ${w.neg(ex.p.gender)}`, color: "border-rose-200 bg-rose-50" },
    { label: "③ السؤال", content: <En className="text-2xl font-extrabold text-slate-900">{qEn}</En>, sub: `${HAL[ex.p.en]} ${w.aff(ex.p.gender)}؟`, color: "border-indigo-200 bg-indigo-50" },
    { label: "④ الإجابة", content: <div className="flex gap-3"><En className="text-xl font-bold text-emerald-700">{ansY}</En><span className="text-slate-400">/</span><En className="text-xl font-bold text-rose-700">{ansN}</En></div>, sub: "", color: "border-violet-200 bg-violet-50" },
  ];

  const progress = Math.min(step / 3, 1);

  return (
    <div className={`rounded-3xl border-2 ${step === 3 ? "border-emerald-300" : "border-slate-200"} bg-white p-5 shadow-sm`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 font-bold text-white">{idx + 1}</span>
          <En className="text-2xl font-extrabold text-slate-900">{affEn}</En>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress * 100}%` }} />
          </div>
          <span className="text-xs font-bold text-slate-400">{step}/3</span>
        </div>
      </div>

      {step === 0 && (
        <button onClick={() => setStep(1)} className="mt-4 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition hover:bg-slate-700">
          ابدأ التحويل ✨
        </button>
      )}

      {step > 0 && (
        <div className="mt-4 space-y-3">
          {steps.slice(0, step).map((s, si) => (
            <div key={si} className={`tada flex flex-wrap items-center gap-3 rounded-2xl border-2 p-3 ${s.color}`}>
              <span className="rounded-lg bg-white/80 px-2 py-0.5 text-sm font-bold text-slate-500">{s.label}</span>
              {s.content}
              {s.sub && <span className="text-sm text-slate-500">({s.sub})</span>}
            </div>
          ))}
        </div>
      )}

      {step > 0 && step < 3 && (
        <button
          onClick={() => setStep((s) => Math.min(3, s + 1))}
          className="mt-3 w-full rounded-xl bg-slate-900 py-2 font-bold text-white transition hover:bg-slate-700"
        >
          الخطوة التالية ↓
        </button>
      )}
      {step === 3 && (
        <button onClick={() => setStep(0)} className="mt-3 w-full rounded-xl bg-emerald-500 py-2 font-bold text-white transition hover:bg-emerald-600">
          أعد المحاولة ↺
        </button>
      )}
    </div>
  );
}

// ============================================================
// التمارين التفاعلية
// ============================================================

function FillEx({ ex }: { ex: Extract<Exercise, { type: "fill" }> }) {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ex.blanks.map((b, i) => {
        const chosen = picked[i];
        const ok = chosen === b.blankBe;
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${chosen ? (ok ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
              <span dir="ltr" className="font-en text-xl font-bold text-slate-800">
                {b.before}{" "}
                <span className={`mx-1 inline-block min-w-16 rounded-lg border-2 border-dashed px-2 text-center ${chosen ? (ok ? "border-emerald-400 bg-emerald-50 text-emerald-700" : "border-rose-400 bg-rose-50 text-rose-700") : "border-slate-300 text-slate-300"}`}>
                  {chosen || "…"}
                </span>{" "}
                {b.after}
              </span>
            </div>
            <div className="mt-1 pr-11 text-sm text-slate-400">{b.ar}</div>
            <div className="mt-3 flex gap-2 pr-11">
              {["am", "is", "are"].map((be) => (
                <button
                  key={be}
                  onClick={() => setPicked((p) => ({ ...p, [i]: be }))}
                  className={`rounded-xl border-2 px-4 py-1.5 font-en font-bold transition active:scale-95 ${chosen === be ? (ok ? "border-transparent bg-emerald-500 text-white" : "border-transparent bg-rose-500 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                >
                  {be}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NegativeEx({ ex }: { ex: Extract<Exercise, { type: "negative" }> }) {
  const [input, setInput] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.+$/, "").replace(/\?$/, "");
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => {
        const val = input[i] || "";
        const typed = checked[i];
        const right = typed && norm(val) === norm(`${it.aff.s} ${it.aff.b} not ${it.aff.rest}`);
        const leftAnswer = `${it.aff.s} ${it.aff.b} not ${it.aff.rest}.`;
        const shown = revealed[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${right ? "border-emerald-300 bg-emerald-50/40" : typed ? "border-rose-300 bg-rose-50/40" : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
              <div>
                <En className="text-xl font-bold text-slate-800">{it.aff.s} {it.aff.b} {it.aff.rest}.</En>
                <span className="text-sm text-slate-500">{it.aff.ar}</span>
              </div>
              <div className="mr-auto flex gap-2">
                {!typed && (
                  <SmallBtn dark onClick={() => setChecked((c) => ({ ...c, [i]: true }))} disabled={!val.trim()}>
                    تحقق ✓
                  </SmallBtn>
                )}
                <SmallBtn onClick={() => setRevealed((r) => ({ ...r, [i]: true }))}>الحل 💡</SmallBtn>
                <SmallBtn onClick={() => { setInput((v) => ({ ...v, [i]: "" })); setChecked((c) => ({ ...c, [i]: false })); setRevealed((r) => ({ ...r, [i]: false })); }}>↺</SmallBtn>
              </div>
            </div>
            <div className="mt-3 pr-11">
              <input
                dir="ltr"
                value={shown ? leftAnswer : val}
                readOnly={shown}
                onChange={(e) => setInput((v) => ({ ...v, [i]: e.target.value }))}
                placeholder="Type the negative sentence here…"
                className={`font-en w-full rounded-xl border-2 px-3 py-2 text-xl outline-none transition ${
                  shown ? "border-emerald-400 bg-emerald-50 text-emerald-800" : typed ? (right ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 focus:border-indigo-300"
                }`}
              />
              {typed && !shown && !right && (
                <div className="mt-1 pr-1 text-sm text-rose-600">✕ حاول مرة أخرى — الصح: <En className="font-bold">{leftAnswer}</En></div>
              )}
              {typed && !shown && right && <div className="mt-1 pr-1 font-bold text-emerald-600">✓ أحسنت!</div>}
              {shown && <div className="mt-1 pr-1 font-bold text-emerald-700">✓ الحل: {it.negAr}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuestionEx({ ex }: { ex: Extract<Exercise, { type: "question" }> }) {
  return (
    <div className="grid gap-4">
      {ex.items.map((it, i) => (
        <SwapItem key={i} idx={i} it={it} />
      ))}
    </div>
  );
}

function SwapItem({ it, idx }: { it: Extract<Exercise, { type: "question" }>["items"][number]; idx: number }) {
  const [swapped, setSwapped] = useState(false);
  return (
    <div className={`rounded-3xl border-2 transition ${swapped ? "border-indigo-300 bg-indigo-50/40" : "border-slate-200 bg-white"} p-4 shadow-sm`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{idx + 1}</span>
        <div dir="ltr" className="flex flex-wrap items-center gap-2 transition-all">
          {!swapped ? (
            <>
              <span className="font-en rounded-xl bg-sky-400 px-3 py-1.5 text-xl font-extrabold text-white">{it.aff.s}</span>
              <span className="font-en rounded-xl bg-amber-400 px-3 py-1.5 text-xl font-extrabold text-white">{it.aff.b}</span>
              <span className="font-en rounded-xl bg-slate-100 px-3 py-1.5 text-xl font-extrabold text-slate-700">{it.aff.rest}.</span>
            </>
          ) : (
            <>
              <span className="font-en rounded-xl bg-amber-400 px-3 py-1.5 text-xl font-extrabold text-white tada">{pQ(it.aff.b)}</span>
              <span className="text-xl text-indigo-500">⇄</span>
              <span className="font-en rounded-xl bg-sky-400 px-3 py-1.5 text-xl font-extrabold text-white tada">{low(it.aff.s ?? "")}</span>
              <span className="font-en rounded-xl bg-slate-100 px-3 py-1.5 text-xl font-extrabold text-slate-700">{it.aff.rest}?</span>
            </>
          )}
        </div>
        <button onClick={() => setSwapped((s) => !s)} className="mr-auto rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-indigo-700">
          {swapped ? "↩ عودة" : "حوّل إلى سؤال ✨"}
        </button>
      </div>
      {swapped && (
        <div className="mt-3 pr-11">
          <En className="text-2xl font-extrabold text-slate-900">{pQ(it.aff.b)} {low(it.aff.s ?? "")} {it.aff.rest}?</En>
          <div className="text-lg font-bold text-indigo-700">{it.qAr}</div>
        </div>
      )}
    </div>
  );
}

function MCQEx({ ex }: { ex: Extract<Exercise, { type: "mcq" }> }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => {
        const c = picked[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-4 transition ${c !== undefined ? (c === it.answer ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40") : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{i + 1}</span>
              <En className="text-xl font-bold text-slate-800">{it.q}</En>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pr-11">
              {it.opts.map((o, oi) => {
                const isC = oi === it.answer;
                let cls = "border-slate-200 bg-white text-slate-600 hover:border-slate-400";
                if (c !== undefined) {
                  if (isC) cls = "border-transparent bg-emerald-500 text-white";
                  else if (c === oi) cls = "border-transparent bg-rose-500 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                }
                return (
                  <button key={oi} onClick={() => setPicked((p) => ({ ...p, [i]: oi }))} className={`rounded-xl border-2 px-4 py-2 font-en font-bold transition active:scale-95 ${cls}`}>
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

function FixEx({ ex }: { ex: Extract<Exercise, { type: "fix" }> }) {
  const [shown, setShown] = useState<Record<number, boolean>>({});
  return (
    <div className="grid gap-3">
      {ex.items.map((it, i) => (
        <div key={i} className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-sm">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-500 text-sm font-bold text-white">{i + 1}</span>
          <En className="text-xl font-bold text-rose-700 line-through decoration-rose-300">{it.wrong}</En>
          {shown[i] ? (
            <En className="text-2xl font-extrabold text-emerald-700 tada">→ {it.correct} ✓</En>
          ) : (
            <button onClick={() => setShown((s) => ({ ...s, [i]: true }))} className="mr-auto rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-emerald-700">
              الحل 💡
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// الملخص / الختام
// ============================================================

function Summary() {
  return (
    <Frame mascot="🧠" step="🧠" title="ملخص الدرس 3" lead="اليوم تعلمنا ثلاثة أشكال أساسية — احفظها جيدًا.">
      <div className="grid gap-4 md:grid-cols-3">
        {(Object.keys(MODE_STYLE) as Mode[]).map((m, i) => (
          <div key={m} className={`rounded-3xl border-2 ${MODE_STYLE[m].ring} ${MODE_STYLE[m].soft} p-5`}>
            <div className="text-3xl">{MODE_STYLE[m].emoji}</div>
            <div className="font-head mt-1 text-xl font-bold text-slate-800">{MODE_STYLE[m].label}</div>
            <div className="mt-2 space-y-2">
              {i === 0 && (
                <>
                  <div className="rounded-xl bg-white p-2 text-sm font-bold text-slate-600">
                    <En>I am happy.</En> · <En>He is happy.</En>
                  </div>
                  <div className="rounded-xl bg-white p-2 text-sm font-bold text-slate-600">
                    <En>They are happy.</En>
                  </div>
                </>
              )}
              {i === 1 && (
                <>
                  <div className="rounded-xl bg-white p-2">
                    <En className="text-lg font-extrabold text-rose-700">+ not</En>
                    <En className="mt-1 block text-sm font-bold text-slate-600">I am not happy. / He is not happy.</En>
                  </div>
                </>
              )}
              {i === 2 && (
                <div className="rounded-xl bg-white p-2">
                  <div className="text-sm font-bold text-slate-600">قلب الترتيب:</div>
                  <En className="mt-1 block text-lg font-extrabold text-indigo-700">Am I happy? · Is he happy?</En>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <BigTableMini />
    </Frame>
  );
}

function BigTableMini() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <div className="min-w-[600px] bg-white">
        <div className="grid grid-cols-4 gap-0 bg-slate-900 font-bold text-white">
          <div className="p-3">الضمير</div>
          <div className="p-3 text-center">✅</div>
          <div className="p-3 text-center">🚫</div>
          <div className="p-3 text-center">❓</div>
        </div>
        {MACHINE_TRIOS.slice(0, 3).map((t, i) => {
          const w = WORDS[i % WORDS.length];
          return (
            <div key={t.p.en} className="grid grid-cols-4 border-t border-slate-100 bg-white">
              <div className="p-3 font-en font-bold text-slate-700">{t.p.en} → <span className={Col[t.p.be]}>{t.p.be}</span></div>
              <div className="p-3 text-center font-en font-bold text-slate-700">{t.p.en} {t.p.be} {w.en}.</div>
              <div className="p-3 text-center font-en font-bold text-rose-700">{t.p.en} {t.p.be} not {w.en}.</div>
              <div className="p-3 text-center font-en font-bold text-indigo-700">{pQ(t.p.be)} {low(t.p.en)} {w.en}?</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Closing({ onExit }: { onExit: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-center text-white shadow-xl md:p-14">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">🏆</div>
        <div className="pop pop-1 mt-3 text-sm font-bold text-slate-400">⭐ قاعدة اليوم</div>
        <h2 className="pop pop-2 font-head mt-2 text-3xl font-bold md:text-5xl">احفظ هذه الحركة بثلاث خطوات</h2>
        <div dir="ltr" className="pop pop-3 mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-2xl bg-emerald-500 px-5 py-3 shadow-lg">
            <div className="font-en text-xl font-extrabold">He is happy.</div>
            <div className="text-sm opacity-90">الإثبات</div>
          </div>
          <span className="text-3xl text-slate-500">→</span>
          <div className="rounded-2xl bg-rose-500 px-5 py-3 shadow-lg">
            <div className="font-en text-xl font-extrabold">He is not happy.</div>
            <div className="text-sm opacity-90">النفي (+ not)</div>
          </div>
          <span className="text-3xl text-slate-500">→</span>
          <div className="rounded-2xl bg-indigo-500 px-5 py-3 shadow-lg">
            <div className="font-en text-xl font-extrabold">Is he happy?</div>
            <div className="text-sm opacity-90">السؤال (قلب)</div>
          </div>
        </div>
        <p className="pop pop-4 mt-6 text-lg text-slate-300">
          الإثبات ← نضيف not للنفي / نقلب الترتيب للسؤال
        </p>
        <div className="pop pop-5 mt-10 flex flex-wrap justify-center gap-3">
          <button onClick={onExit} className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// عرض الشريحة حسب نوعها
// ============================================================

function SlideView({ s, onExit }: { s: Slide; onExit: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "review":
      return <Review />;
    case "affirm":
      return <AffirmSlide examples={s.examples} title={s.title} mascot={s.mascot} lead={s.lead} step={s.step} />;
    case "negRule":
      return <NegRule />;
    case "pronounGrid":
      return <PronounGridMode mode={s.mode} />;
    case "doWarning":
      return <DoWarning />;
    case "shortAnswer":
      return <ShortAnswerSlide examples={s.examples} />;
    case "machine":
      return <Machine />;
    case "table":
      return <BigTable />;
    case "smartDrill":
      return <SmartDrill />;
    case "summary":
      return <Summary />;
    case "quiz":
      return (
        <Frame mascot={s.mascot} badge="الاختبار النهائي" title={s.title} lead="12 سؤالًا جديدًا من خارج أمثلة الدرس — أثبت أنك أتقنت الإثبات والنفي والسؤال.">
          <FinalQuiz lesson={3} accent="bg-indigo-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
    case "ex": {
      const ex = s.ex;
      return (
        <Frame mascot={s.mascot} badge={s.badge} title={s.title} lead={s.subtitle}>
          {ex.type === "fill" && <FillEx ex={ex} />}
          {ex.type === "negative" && <NegativeEx ex={ex} />}
          {ex.type === "question" && <QuestionEx ex={ex} />}
          {ex.type === "mcq" && <MCQEx ex={ex} />}
          {ex.type === "fix" && <FixEx ex={ex} />}
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

function SmallBtn({ children, onClick, dark, disabled }: { children: React.ReactNode; onClick: () => void; dark?: boolean; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-3.5 py-1.5 text-sm font-bold shadow-sm transition ${dark ? "bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-30" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
    >
      {children}
    </button>
  );
}

// ============================================================
// الشريط الجانبي
// ============================================================

const SECTION_COLORS: Record<string, string> = {
  البداية: "text-slate-400",
  الإثبات: "text-emerald-600",
  النفي: "text-rose-600",
  السؤال: "text-indigo-600",
  الإجابات: "text-violet-600",
  تثبيت: "text-amber-600",
  التمارين: "text-sky-600",
  الختام: "text-slate-600",
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
        <div className="font-head mt-2 text-xl font-bold text-slate-900">الدرس 3 · <En>Verb to be</En></div>
        <div className="text-xs text-slate-400">الإثبات · النفي · السؤال · الإجابات</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((g) => (
          <div key={g.sec} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[g.sec] || "text-slate-400"}`}>{g.sec}</div>
            {g.idxs.map((idx) => {
              const active = idx === i;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setI(idx);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-slate-900 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/20" : "bg-slate-100"}`}>{idx + 1}</span>
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

// ============================================================
// الدرس 3 — النمط B2
// ============================================================

export default function Lesson3({ onExit }: { onExit: () => void }) {
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
      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "INPUT") return;
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
    document.getElementById("l3-main")?.scrollTo({ top: 0 });
  }, [i]);

  const slide = SLIDES[i];
  const progress = ((i + 1) / total) * 100;

  return (
    <div className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f7f8fc] text-slate-800">
      <Signature />

      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />

        {/* الشريط الجانبي */}
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail i={i} setI={setI} onExit={onExit} />
        </div>

        {/* المنطقة الرئيسية */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس">
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                {slide.section} · <span className="text-slate-800">{slideTitle(slide)}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-l from-emerald-500 via-amber-400 to-indigo-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <span className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {i + 1} / {total}
            </span>
          </header>

          <main id="l3-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={i} className="pop mx-auto max-w-4xl">
              <SlideView s={slide} onExit={onExit} />
            </div>
          </main>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button onClick={go.prev} disabled={i === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button onClick={go.next} disabled={i === total - 1} className="rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-slate-700 disabled:opacity-30">
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
