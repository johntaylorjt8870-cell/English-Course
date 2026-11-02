/**
 * Lesson 52 visual kit — a literal clone of Lesson 1's presentation layer.
 *
 * Every class string in this file is copied from `lesson1/Lesson1.tsx`:
 * the same slide card (`rounded-[2rem] border border-slate-200 bg-white p-6
 * shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10`), the same mascot
 * position, the same step square, the same violet badge, the same slate tip
 * bar, the same white chips and slate-900 buttons. Only the lesson content
 * and the condition/result tone mapping are new.
 */
import { Fragment, useState, type ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";
import type { Block52, Tone52 } from "./data";

/* ------------------------------------------------------------------ */
/* النغمة اللونية — نفس ألوان الدرس الأول (سماوي/زمردي/برتقالي)       */
/* ------------------------------------------------------------------ */
export const TONE_STYLE: Record<
  Tone52,
  { chip: string; solid: string; text: string; border: string; soft: string; dot: string }
> = {
  C: {
    chip: "bg-sky-100 border-sky-300 text-sky-900",
    solid: "bg-sky-500 text-white",
    text: "text-sky-700",
    border: "border-sky-300",
    soft: "bg-sky-50",
    dot: "bg-sky-500",
  },
  R: {
    chip: "bg-emerald-100 border-emerald-300 text-emerald-900",
    solid: "bg-emerald-500 text-white",
    text: "text-emerald-700",
    border: "border-emerald-300",
    soft: "bg-emerald-50",
    dot: "bg-emerald-500",
  },
  M: {
    chip: "bg-orange-100 border-orange-300 text-orange-900",
    solid: "bg-orange-500 text-white",
    text: "text-orange-700",
    border: "border-orange-300",
    soft: "bg-orange-50",
    dot: "bg-orange-500",
  },
};

export const TONE_LABEL: Record<Tone52, { en: string; ar: string }> = {
  C: { en: "CONDITION", ar: "الشرط" },
  R: { en: "RESULT", ar: "النتيجة" },
  M: { en: "MODAL", ar: "الفعل الناقص" },
};

/* ------------------------------------------------------------------ */
/* عناصر النص — نسخة مطابقة لأدوات الدرس الأول                        */
/* ------------------------------------------------------------------ */
export function En52({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`font-en inline-block ${className}`}>
      {children}
    </span>
  );
}

/** نص عربي قد يحتوي مقاطع إنجليزية بين [[ ]] — نفس Rich في الدرس الأول */
export function Rich52({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        const m = p.match(/^\[\[(.+)\]\]$/);
        if (m) {
          return (
            <span
              key={i}
              dir="ltr"
              className="font-en mx-1 rounded-md bg-slate-100 px-1.5 py-0.5 font-semibold text-slate-800"
            >
              {m[1]}
            </span>
          );
        }
        return <LatinRuns key={i} text={p} />;
      })}
    </span>
  );
}

export function Mixed52({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <LatinRuns text={text} />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* البطاقات الأساسية                                                   */
/* ------------------------------------------------------------------ */
export function Term52({ en, ar, desc }: { en: string; ar: string; desc?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border-2 border-violet-200 bg-violet-50 p-5">
      <En52 className="text-4xl font-extrabold text-violet-700">{en}</En52>
      <span className="text-3xl font-bold text-slate-300">=</span>
      <span className="font-head text-3xl font-bold text-slate-800">{ar}</span>
      {desc && <span className="basis-full text-lg text-slate-600">{desc}</span>}
    </div>
  );
}

export function Plain52({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <En52 className="text-3xl font-bold text-slate-800">{en}</En52>
      <span className="text-lg text-slate-500">{ar}</span>
    </div>
  );
}

export function Verdict52({ ok, en, ar }: { ok: boolean; en: string; ar?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-4 rounded-3xl border-2 p-4 ${
        ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
      }`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg font-bold text-white ${
          ok ? "bg-emerald-500" : "bg-rose-500"
        }`}
      >
        {ok ? "✓" : "✕"}
      </span>
      <En52
        className={`text-2xl font-bold ${
          ok ? "text-emerald-800" : "text-rose-800 line-through decoration-rose-300"
        }`}
      >
        {en}
      </En52>
      {ar && <span className="text-base text-slate-500">{ar}</span>}
    </div>
  );
}

export function Note52({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-4">
      <span className="text-3xl">{emoji}</span>
      <Rich52 text={text} className="text-lg font-semibold text-slate-800" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* الصيغ — نفس شكل Formula في الدرس الأول                              */
/* ------------------------------------------------------------------ */
export function Formula52({ parts }: { parts: { text: string; ar?: string; tone: Tone52 }[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-3">
        {parts.map((part, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="text-3xl font-bold text-slate-300">+</span>}
            <div
              className={`flex flex-col items-center rounded-2xl ${TONE_STYLE[part.tone].solid} px-6 py-3 shadow-md`}
            >
              <span dir="ltr" className="font-en text-2xl font-extrabold">
                {part.text}
              </span>
              {part.ar && <span className="text-sm font-semibold opacity-90">{part.ar}</span>}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** القاعدة الأساسية: IF + PRESENT SIMPLE → WILL + V1 */
export function CoreFormula52({ modal = false }: { modal?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex flex-col items-center rounded-2xl bg-sky-500 px-6 py-3 shadow-md">
          <span dir="ltr" className="font-en text-2xl font-extrabold text-white">
            IF + PRESENT SIMPLE
          </span>
          <span className="text-sm font-semibold text-white/90">إذا + المضارع البسيط</span>
        </div>
        <span className="text-3xl font-bold text-slate-300">→</span>
        <div className="flex flex-col items-center rounded-2xl bg-emerald-500 px-6 py-3 shadow-md">
          <span dir="ltr" className="font-en text-2xl font-extrabold text-white">
            {modal ? "MODAL + V1" : "WILL + V1"}
          </span>
          <span className="text-sm font-semibold text-white/90">
            {modal ? "فعل ناقص + المصدر" : "سوف + المصدر"}
          </span>
        </div>
      </div>
      <div className="mt-3 border-t border-dashed border-slate-200 pt-3 text-center">
        <En52 className="text-lg font-bold text-slate-700">
          If it rains, I will stay at home.
        </En52>
        <span className="mr-2 text-slate-500">— إذا أمطرت، سأبقى في المنزل.</span>
      </div>
    </div>
  );
}

/** بطاقتا الشرط والنتيجة — نفس بطاقات الأدوار في الدرس الأول */
export function ToneCards52({ tones = ["C", "R"] }: { tones?: Tone52[] }) {
  const q: Record<Tone52, string> = {
    C: "ماذا يجب أن يتحقق؟",
    R: "ماذا سيحدث بعد ذلك؟",
    M: "ما معنى النتيجة؟",
  };
  return (
    <div dir="ltr" className={`grid gap-3 ${tones.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {tones.map((tone) => (
        <div key={tone} dir="rtl" className={`rounded-3xl border-2 ${TONE_STYLE[tone].border} ${TONE_STYLE[tone].soft} p-4`}>
          <div className="flex items-center justify-between">
            <En52 className={`text-2xl font-extrabold ${TONE_STYLE[tone].text}`}>{TONE_LABEL[tone].en}</En52>
            <span className="text-2xl">{tone === "C" ? "🎯" : tone === "R" ? "⏭️" : "⚙️"}</span>
          </div>
          <div className="mt-1 text-xl font-bold text-slate-700">= {TONE_LABEL[tone].ar}</div>
          <div className="mt-1 text-sm text-slate-500">{q[tone]}</div>
        </div>
      ))}
    </div>
  );
}

/** زوج شرط/نتيجة بسيط */
export function ClausePair52({
  condition,
  result,
  label,
}: {
  condition: { en: string; ar: string };
  result: { en: string; ar: string };
  label?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {label && <div className="mb-3 text-sm font-bold text-slate-400">{label}</div>}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
          <div className="text-xs font-bold text-sky-700">CONDITION · الشرط</div>
          <En52 className="mt-1 text-xl font-bold text-slate-800">{condition.en}</En52>
          <div className="mt-1 text-sm text-slate-500">{condition.ar}</div>
        </div>
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
          <div className="text-xs font-bold text-emerald-700">RESULT · النتيجة</div>
          <En52 className="mt-1 text-xl font-bold text-slate-800">{result.en}</En52>
          <div className="mt-1 text-sm text-slate-500">{result.ar}</div>
        </div>
      </div>
    </div>
  );
}

/** أمثلة إنجليزية/عربية — بطاقة بيضاء كبطاقة Plain في الدرس الأول */
export function Examples52({ items, title }: { items: { en: string; ar: string }[]; title?: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {title && <div className="mb-3 text-sm font-bold text-slate-400">{title}</div>}
      <div className="divide-y divide-slate-100">
        {items.map((item, i) => (
          <div key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5 first:pt-0 last:pb-0">
            <En52 className="text-xl font-bold text-slate-800">{item.en}</En52>
            <span className="text-slate-500">{item.ar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** تحليل الجملة إلى أجزائها */
export function Analysis52({
  parts,
  note,
}: {
  parts: { tag: string; tone: Tone52; en: string; ar: string }[];
  note?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`grid gap-3 ${parts.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {parts.map((part, i) => (
          <div key={i} className={`rounded-2xl border-2 ${TONE_STYLE[part.tone].border} ${TONE_STYLE[part.tone].soft} p-4`}>
            <div className={`text-xs font-bold ${TONE_STYLE[part.tone].text}`}>{part.tag}</div>
            <En52 className="mt-1 block text-xl font-extrabold text-slate-800">{part.en}</En52>
            <div className="mt-1 text-sm text-slate-500">{part.ar}</div>
          </div>
        ))}
      </div>
      {note && <div className="mt-3 text-sm font-semibold text-slate-500">{note}</div>}
    </div>
  );
}

/** جدول المقارنة */
export function Table52({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {caption && <div className="border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-500">{caption}</div>}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-right text-base">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {head.map((cell, i) => (
                <th key={i} scope="col" className="px-4 py-3 font-bold">
                  <Mixed52 text={cell} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={`px-4 py-3 ${c === 0 ? "font-bold text-slate-700" : "text-slate-600"}`}>
                    <Mixed52 text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Bullets52({ items, ordered }: { items: string[]; ordered?: boolean }) {
  return (
    <div className="grid gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-xl text-slate-700`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">
            {ordered ? i + 1 : "✓"}
          </span>
          <Rich52 text={item} className="leading-relaxed" />
        </div>
      ))}
    </div>
  );
}

export function Steps52({ items }: { items: { n: string; title: string; text: string; tone: Tone52 }[] }) {
  return (
    <div dir="ltr" className="grid gap-3 sm:grid-cols-3">
      {items.map((step) => (
        <div key={step.n} dir="rtl" className={`rounded-3xl border-2 ${TONE_STYLE[step.tone].border} ${TONE_STYLE[step.tone].soft} p-4 text-center`}>
          <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${TONE_STYLE[step.tone].solid} text-2xl font-bold shadow`}>
            {step.n}
          </div>
          <div className="mt-2 text-lg font-bold text-slate-800">{step.title}</div>
          <div className="mt-1 text-sm text-slate-600">{step.text}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* إطار الشريحة — منقول حرفيًا من الدرس الأول                          */
/* ------------------------------------------------------------------ */
export function SlideFrame52({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
}: {
  mascot: string;
  step?: number | string;
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  tip?: string;
}) {
  return (
    <section className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10">
      <div className="pointer-events-none absolute left-6 top-5 select-none text-5xl anim-drift md:text-6xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex items-center gap-3">
        {step !== undefined && (
          <span className="font-head grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-xl font-bold text-white shadow">
            {step}
          </span>
        )}
        {badge && <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-bold text-violet-700">{badge}</span>}
      </div>
      <h2 className="font-head mt-4 max-w-[85%] text-3xl font-bold leading-snug text-slate-900 md:text-4xl">
        {typeof title === "string" ? <Mixed52 text={title} /> : title}
      </h2>
      {lead && <p className="mt-2 max-w-[85%] text-xl text-slate-500">{typeof lead === "string" ? <Mixed52 text={lead} /> : lead}</p>}
      <div className="mt-7 space-y-4">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-900 p-4 text-white">
          <span className="text-3xl">🦉</span>
          <span className="text-lg font-semibold">
            <Mixed52 text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* الغلاف والختام — نفس بنية الدرس الأول                               */
/* ------------------------------------------------------------------ */
export function Cover52({ mascot }: { mascot: string }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-14">
      <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-sky-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-orange-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">{mascot}</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-slate-900 px-5 py-2 text-base font-bold text-white">الدرس 52 من 120</div>
        <h1 className="pop pop-2 font-head mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
          الشرط الأول
        </h1>
        <p className="pop pop-3 mt-2 text-2xl text-slate-500">
          <En52 className="font-en">FIRST CONDITIONAL</En52>
        </p>
        <p className="pop pop-3 mt-1 text-base font-semibold text-slate-400">Future Possibilities · الاحتمالات المستقبلية</p>
        <div className="pop pop-4 mt-8 flex justify-center">
          <CoreFormula52 />
        </div>
        <p className="pop pop-5 mt-8 text-base text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

export function Closing52({ mascot, onExit }: { mascot: string; onExit?: () => void }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-center text-white shadow-xl md:p-14">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">{mascot}</div>
        <div className="pop pop-1 mt-3 text-sm font-bold text-slate-400">⭐ إتمام الدرس 52</div>
        <h2 className="pop pop-2 font-head mt-2 text-3xl font-bold md:text-5xl">الشرط الأول جاهز للاستخدام</h2>
        <p className="pop pop-3 mt-3 text-xl text-slate-300">تذكّر القاعدة الأساسية دائمًا:</p>
        <div className="pop pop-4 mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="rounded-2xl bg-sky-500 px-6 py-3 shadow-lg">
            <div dir="ltr" className="font-en text-2xl font-extrabold md:text-3xl">IF + PRESENT SIMPLE</div>
            <div className="text-sm opacity-90">الشرط</div>
          </div>
          <span className="text-3xl text-slate-500">→</span>
          <div className="rounded-2xl bg-emerald-500 px-6 py-3 shadow-lg">
            <div dir="ltr" className="font-en text-2xl font-extrabold md:text-3xl">WILL + V1</div>
            <div className="text-sm opacity-90">النتيجة</div>
          </div>
        </div>
        <p className="pop pop-5 mt-6 text-lg text-slate-300">
          <En52>If I study, I will pass.</En52>
        </p>
        <div className="pop pop-6 mt-10 flex flex-wrap justify-center gap-3">
          <a href="#/lesson/53" className="rounded-xl bg-white px-5 py-2.5 font-bold text-slate-900 shadow transition hover:bg-slate-100">
            الدرس التالي: 53 — <En52>SECOND CONDITIONAL</En52> ←
          </a>
          <button
            onClick={onExit}
            className="rounded-xl border border-white/30 px-5 py-2.5 font-bold text-white transition hover:bg-white/10"
          >
            جميع الدروس
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* عناصر التمارين — نفس NumBadge وSmallBtn في الدرس الأول              */
/* ------------------------------------------------------------------ */
export function NumBadge52({ n }: { n: number }) {
  return <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{n}</span>;
}

export function SmallBtn52({
  onClick,
  children,
  dark,
  disabled,
}: {
  onClick: () => void;
  children: ReactNode;
  dark?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-3.5 py-1.5 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
        dark ? "bg-slate-900 text-white hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

export function ChoiceChip52({
  active,
  tone = "C",
  onClick,
  children,
  disabled,
}: {
  active: boolean;
  tone?: Tone52;
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      dir="ltr"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-1.5 font-en text-lg font-bold transition active:scale-95 disabled:cursor-not-allowed ${
        active ? `${TONE_STYLE[tone].solid} border-transparent shadow` : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
      }`}
    >
      {children}
    </button>
  );
}

export function StatusLine52({ tone, children }: { tone: "ok" | "bad" | "info"; children: ReactNode }) {
  const cls =
    tone === "ok"
      ? "text-emerald-700"
      : tone === "bad"
        ? "text-rose-600"
        : "text-slate-500";
  return <div className={`flex flex-wrap items-center gap-2 text-sm font-bold ${cls}`}>{children}</div>;
}

/** بطاقة محتوى عامة بنفس مقاس بطاقات الدرس الأول */
export function Card52({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

/** سؤال فهم بإجابة مخفية — نفس QA في الدرس الأول */
export function QA52({ q, a, ar }: { q: string; a: string; ar?: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-base font-semibold text-slate-600">❓ {q}</span>
        <HiddenAnswer52 button="أظهر الجواب" answer={a} ar={ar} />
      </div>
    </div>
  );
}

export function HiddenAnswer52({
  button,
  answer,
  ar,
}: {
  button: string;
  answer: string;
  ar?: string;
}) {
  const [open, setOpen] = useState(false);
  return open ? (
    <span className="tada flex flex-wrap items-center gap-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-3 py-1.5">
      <En52 className="text-base font-extrabold text-emerald-800">{answer}</En52>
      {ar && <span className="text-sm text-slate-500">{ar}</span>}
    </span>
  ) : (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="mr-auto rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-slate-700"
    >
      {button}
    </button>
  );
}


/* ------------------------------------------------------------------ */
/* عرض أي بلوك محتوى                                                   */
/* ------------------------------------------------------------------ */
export function BlockView52({ block }: { block: Block52 }) {
  switch (block.type) {
    case "text":
      return <Rich52 text={block.text} className="block text-xl leading-relaxed text-slate-700" />;
    case "term":
      return <Term52 {...block} />;
    case "plain":
      return <Plain52 {...block} />;
    case "ok":
      return <Verdict52 ok en={block.en} ar={block.ar} />;
    case "bad":
      return <Verdict52 ok={false} en={block.en} ar={block.ar} />;
    case "note":
      return <Note52 {...block} />;
    case "core":
      return <CoreFormula52 />;
    case "coreModal":
      return <CoreFormula52 modal />;
    case "formula":
      return <Formula52 parts={block.parts} />;
    case "pair":
      return <ClausePair52 condition={block.condition} result={block.result} label={block.label} />;
    case "examples":
      return <Examples52 items={block.items} title={block.title} />;
    case "analysis":
      return <Analysis52 parts={block.parts} note={block.note} />;
    case "table":
      return <Table52 head={block.head} rows={block.rows} caption={block.caption} />;
    case "bullets":
      return <Bullets52 items={block.items} ordered={block.ordered} />;
    case "compare":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5">
            <div className="text-sm font-bold text-sky-700">ZERO CONDITIONAL</div>
            <En52 className="mt-2 block text-xl font-bold text-slate-800">{block.zero.en}</En52>
            <div className="mt-1 text-slate-600">{block.zero.ar}</div>
            <div className="mt-2 text-sm font-semibold text-slate-500">{block.zero.note}</div>
          </div>
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-5">
            <div className="text-sm font-bold text-emerald-700">FIRST CONDITIONAL</div>
            <En52 className="mt-2 block text-xl font-bold text-slate-800">{block.first.en}</En52>
            <div className="mt-1 text-slate-600">{block.first.ar}</div>
            <div className="mt-2 text-sm font-semibold text-slate-500">{block.first.note}</div>
          </div>
        </div>
      );
    case "steps":
      return <Steps52 items={block.items} />;
    default:
      return null;
  }
}
