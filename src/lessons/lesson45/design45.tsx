import { Fragment, useState, type ReactNode } from "react";
import { splitMixedText } from "../../shared/bidi";

export type Tone45 = "sky" | "orange" | "emerald" | "violet" | "amber" | "rose" | "slate";

export type TokenRole45 = "subject" | "modal" | "neg" | "aux" | "verb" | "wh" | "rest";

export type SentenceToken45 = {
  en: string;
  role: TokenRole45;
  ar?: string;
};

export type FormulaPart45 = {
  en: string;
  ar: string;
  tone: Exclude<Tone45, "slate">;
};

const BADGE_TONES: Record<Tone45, string> = {
  violet: "bg-violet-100 text-violet-800",
  sky: "bg-sky-100 text-sky-800",
  orange: "bg-orange-100 text-orange-800",
  emerald: "bg-emerald-100 text-emerald-800",
  amber: "bg-amber-100 text-amber-900",
  rose: "bg-rose-100 text-rose-800",
  slate: "bg-slate-100 text-slate-800",
};

const SOLID_TONES: Record<Tone45, string> = {
  sky: "bg-sky-600 text-white",
  orange: "bg-orange-600 text-white",
  emerald: "bg-emerald-600 text-white",
  violet: "bg-violet-600 text-white",
  amber: "bg-amber-600 text-white",
  rose: "bg-rose-600 text-white",
  slate: "bg-slate-900 text-white",
};

const TOKEN_STYLES: Record<TokenRole45, { chip: string; label: string; defaultAr: string }> = {
  subject: { chip: "border-sky-300 bg-sky-100 text-sky-950", label: "text-sky-800", defaultAr: "الفاعل" },
  modal: { chip: "border-orange-300 bg-orange-100 text-orange-950", label: "text-orange-800", defaultAr: "فعل ناقص" },
  neg: { chip: "border-rose-300 bg-rose-100 text-rose-950", label: "text-rose-800", defaultAr: "نفي" },
  aux: { chip: "border-violet-300 bg-violet-100 text-violet-950", label: "text-violet-800", defaultAr: "مساعد" },
  verb: { chip: "border-emerald-300 bg-emerald-100 text-emerald-950", label: "text-emerald-800", defaultAr: "الفعل" },
  wh: { chip: "border-violet-300 bg-violet-100 text-violet-950", label: "text-violet-800", defaultAr: "أداة سؤال" },
  rest: { chip: "border-slate-200 bg-slate-100 text-slate-800", label: "text-slate-600", defaultAr: "تكملة" },
};

const ARABIC_RE = /[\u0600-\u06FF]/;
const LATIN_RE = /[A-Za-z]/;

/** نص إنجليزي معزول من اليسار إلى اليمين */
export function En45({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span dir="ltr" lang="en" className={`font-en ${className}`}>
      {children}
    </span>
  );
}

function splitEnBoundary(raw: string): { lead: string; core: string; trail: string } {
  const leadMatch = /^([\s:—–·،؛]+)/.exec(raw);
  const lead = leadMatch ? leadMatch[1] : "";
  const afterLead = raw.slice(lead.length);
  const arTrailMatch = /([\s،؛؟]+)$/.exec(afterLead);
  const trail = arTrailMatch ? arTrailMatch[1] : "";
  const core = trail ? afterLead.slice(0, afterLead.length - trail.length) : afterLead;
  return { lead, core, trail };
}

/** نص عربي أو مختلط مع عزل تلقائي نظيف للمقاطع الإنجليزية دون ابتلاع الفواصل العربية */
export function Text45({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  if (LATIN_RE.test(text) && !ARABIC_RE.test(text)) {
    return (
      <span dir="ltr" lang="en" className={`font-en ${className}`}>
        {text}
      </span>
    );
  }
  const segments = splitMixedText(text);
  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.kind === "text") return <Fragment key={i}>{seg.text}</Fragment>;
        if (seg.kind === "en") {
          const { lead, core, trail } = splitEnBoundary(seg.text);
          if (!core) return <Fragment key={i}>{seg.text}</Fragment>;
          return (
            <Fragment key={i}>
              {lead}
              <span dir="ltr" lang="en" className="font-en">
                {core}
              </span>
              {trail}
            </Fragment>
          );
        }
        if (seg.kind === "alts") {
          const firstSplit = splitEnBoundary(seg.items[0] ?? "");
          const lastIdx = seg.items.length - 1;
          const lastSplit =
            lastIdx === 0
              ? { lead: "", core: firstSplit.core, trail: firstSplit.trail }
              : splitEnBoundary(seg.items[lastIdx] ?? "");
          const prevSeg = i > 0 ? segments[i - 1] : null;
          const nextSeg = i < segments.length - 1 ? segments[i + 1] : null;
          const needsSpaceBefore =
            !firstSplit.lead &&
            prevSeg?.kind === "text" &&
            /[\u0621-\u064A0-9]$/.test(prevSeg.text);
          const needsSpaceAfter =
            !lastSplit.trail &&
            nextSeg?.kind === "text" &&
            /^[\u0621-\u064A0-9]/.test(nextSeg.text);
          return (
            <Fragment key={i}>
              {needsSpaceBefore ? " " : ""}
              {firstSplit.lead}
              <span dir="ltr" lang="en" className="ltr-pair">
                {seg.items.map((item, j) => {
                  const cleanedItem =
                    j === 0 && j === lastIdx
                      ? firstSplit.core
                      : j === 0
                      ? firstSplit.core + firstSplit.trail
                      : j === lastIdx
                      ? lastSplit.lead + lastSplit.core
                      : item.trim();
                  return (
                    <Fragment key={j}>
                      {j > 0 && (
                        <Fragment>
                          {" "}
                          <span dir="rtl">{seg.connectors[j - 1]}</span>{" "}
                        </Fragment>
                      )}
                      <span dir="ltr" className="font-en">
                        {cleanedItem}
                      </span>
                    </Fragment>
                  );
                })}
                {seg.gloss && (
                  <>
                    {seg.gloss.lead}
                    {seg.gloss.arabic.map((a, j) => (
                      <Fragment key={j}>
                        {j > 0 && seg.gloss!.between[j - 1]}
                        <span dir="rtl">{a}</span>
                      </Fragment>
                    ))}
                    {seg.gloss.trail}
                  </>
                )}
                {seg.trail && <span dir="rtl">{seg.trail}</span>}
              </span>
              {lastSplit.trail}
              {needsSpaceAfter ? " " : ""}
            </Fragment>
          );
        }
        return (
          <span key={i} dir="ltr" className="ltr-pair">
            <span dir="ltr" className="font-en">
              {seg.en}
            </span>
            {seg.lead}
            {seg.arabic.map((a, j) => (
              <Fragment key={j}>
                {j > 0 && seg.between[j - 1]}
                <span dir="rtl">{a}</span>
              </Fragment>
            ))}
            {seg.trail}
          </span>
        );
      })}
    </span>
  );
}

/** بطاقة الشريحة البيضاء القياسية المطابقة للدرس الأول */
export function SlideFrame45({
  mascot,
  step,
  badge,
  tone = "violet",
  title,
  lead,
  tip,
  children,
}: {
  mascot: string;
  step?: number | string;
  badge?: string;
  tone?: Tone45;
  title: string;
  lead?: string;
  tip?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10">
      <div
        className="pointer-events-none absolute left-6 top-5 select-none text-5xl anim-drift md:text-6xl"
        aria-hidden="true"
      >
        {mascot}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {step !== undefined && (
          <span className="font-head grid h-12 min-w-12 place-items-center rounded-2xl bg-slate-900 px-3 text-xl font-bold leading-none text-white shadow">
            {step}
          </span>
        )}
        {badge && (
          <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${BADGE_TONES[tone]}`}>
            <Text45 text={badge} />
          </span>
        )}
      </div>

      <h2
        id="l45-title"
        tabIndex={-1}
        className="font-head mt-4 max-w-[84%] text-3xl font-bold leading-snug text-slate-900 outline-none md:text-4xl"
      >
        <Text45 text={title} />
      </h2>

      {lead && (
        <p className="mt-2 max-w-[88%] text-lg leading-relaxed text-slate-500 md:text-xl">
          <Text45 text={lead} />
        </p>
      )}

      <div className="mt-7 space-y-5">{children}</div>

      {tip && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-900 p-4 text-white">
          <span className="text-2xl" aria-hidden="true">
            🦉
          </span>
          <div className="text-base font-semibold leading-relaxed md:text-lg">
            <Text45 text={tip} />
          </div>
        </div>
      )}
    </section>
  );
}

/** معادلة نحوية ملوّنة على غرار الدرس الأول */
export function Formula45({
  parts,
  suffix,
  joiner = "+",
  compact = false,
}: {
  parts: FormulaPart45[];
  suffix?: string;
  joiner?: string;
  compact?: boolean;
}) {
  return (
    <div
      dir="ltr"
      className="ltr-row flex flex-wrap items-center justify-center gap-2.5 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-5"
    >
      {parts.map((part, idx) => (
        <div key={`${part.en}-${idx}`} className="flex items-center gap-2.5">
          <div
            className={`rounded-2xl ${
              compact ? "px-4 py-2.5" : "px-5 py-3"
            } text-center shadow-md ${SOLID_TONES[part.tone]}`}
          >
            <div
              className={`font-en font-extrabold ${
                compact ? "text-lg md:text-xl" : "text-xl md:text-2xl"
              }`}
            >
              {part.en}
            </div>
            <div dir="rtl" className="mt-0.5 text-xs font-bold opacity-95 md:text-sm">
              <Text45 text={part.ar} />
            </div>
          </div>
          {idx < parts.length - 1 && (
            <span className="font-en text-2xl font-bold text-slate-300 md:text-3xl" aria-hidden="true">
              {joiner}
            </span>
          )}
        </div>
      ))}
      {suffix && (
        <span className="font-en text-3xl font-extrabold text-slate-500">{suffix}</span>
      )}
    </div>
  );
}

/** بطاقة مصطلح نحوي (مثل Subject / Verb في الدرس الأول) */
export function TermCard45({
  en,
  ar,
  desc,
  tone = "sky",
  icon,
}: {
  en: string;
  ar: string;
  desc: string;
  tone?: Exclude<Tone45, "slate">;
  icon: string;
}) {
  const styles: Record<Exclude<Tone45, "slate">, string> = {
    sky: "border-sky-200 bg-sky-50 text-sky-900",
    orange: "border-orange-200 bg-orange-50 text-orange-900",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
    violet: "border-violet-200 bg-violet-50 text-violet-900",
    amber: "border-amber-200 bg-amber-50 text-amber-950",
    rose: "border-rose-200 bg-rose-50 text-rose-900",
  };
  return (
    <div className={`flex flex-wrap items-center gap-4 rounded-3xl border-2 p-5 ${styles[tone]}`}>
      <div className="text-4xl md:text-5xl" aria-hidden="true">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2.5">
          <En45 className="text-2xl font-extrabold md:text-3xl">{en}</En45>
          <span className="text-lg font-bold text-slate-400">=</span>
          <span className="font-head text-xl font-bold md:text-2xl">
            <Text45 text={ar} />
          </span>
        </div>
        <p className="mt-1.5 text-base font-medium leading-relaxed text-slate-700 md:text-lg">
          <Text45 text={desc} />
        </p>
      </div>
    </div>
  );
}

/** جملة مفكّكة إلى رقاقات نحوية مع زر «اكشف الأجزاء» كما في الدرس الأول */
export function SentenceCard45({
  tokens,
  ar,
  punct = ".",
  defaultOpen = true,
  badge,
}: {
  tokens: SentenceToken45[];
  ar: string;
  punct?: string;
  defaultOpen?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5">
      <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-2">
        {tokens.map((token, idx) => {
          const style = TOKEN_STYLES[token.role];
          const roleText = token.ar ?? style.defaultAr;
          return (
            <div
              key={`${token.en}-${idx}`}
              className={`inline-flex flex-col items-center rounded-2xl border-2 px-3.5 py-2 transition ${
                open ? style.chip : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              <span className="font-en text-xl font-extrabold leading-tight md:text-2xl">
                {token.en}
              </span>
              {open && (
                <span dir="rtl" className={`mt-1 text-xs font-bold ${style.label}`}>
                  <Text45 text={roleText} />
                </span>
              )}
            </div>
          );
        })}
        <span className="font-en text-2xl font-bold text-slate-500">{punct}</span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-base font-semibold text-slate-600 md:text-lg">
            <Text45 text={ar} />
          </span>
          {badge && (
            <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-bold text-violet-800">
              <Text45 text={badge} />
            </span>
          )}
        </div>
        {!defaultOpen && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full bg-slate-900 px-3.5 py-1 text-xs font-bold text-white transition hover:bg-slate-700"
          >
            {open ? "إخفاء الأجزاء" : "🔍 اكشف الأجزاء"}
          </button>
        )}
      </div>
    </div>
  );
}

/** بطاقة صحيح ✓ / خطأ ✕ المطابقة للدرس الأول */
export function Verdict45({
  ok,
  en,
  why,
}: {
  ok: boolean;
  en: string;
  why?: string;
}) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 ${
        ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
      }`}
    >
      <div dir="ltr" className="flex items-center justify-between gap-3 text-left">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-bold text-white ${
              ok ? "bg-emerald-600" : "bg-rose-600"
            }`}
            aria-hidden="true"
          >
            {ok ? "✓" : "✕"}
          </span>
          <span
            lang="en"
            className={`font-en text-lg font-extrabold md:text-xl ${
              ok ? "text-emerald-950" : "text-rose-950 line-through decoration-rose-400"
            }`}
          >
            {en}
          </span>
        </div>
        <span
          dir="rtl"
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
            ok ? "bg-emerald-200/80 text-emerald-900" : "bg-rose-200/80 text-rose-900"
          }`}
        >
          {ok ? "صحيحة" : "خاطئة"}
        </span>
      </div>
      {why && (
        <div
          className={`mt-2 border-t pt-2 text-sm font-bold md:text-base ${
            ok
              ? "border-emerald-200/70 text-emerald-800"
              : "border-rose-200/70 text-rose-800"
          }`}
        >
          <Text45 text={why} />
        </div>
      )}
    </div>
  );
}

/** بطاقة ملاحظة تنبيهية صفراء على غرار الدرس الأول */
export function Note45({
  emoji = "💡",
  title,
  children,
}: {
  emoji?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <span className="text-2xl" aria-hidden="true">
        {emoji}
      </span>
      <div className="min-w-0 flex-1 text-base font-semibold leading-relaxed text-slate-800 md:text-lg">
        {title && (
          <div className="font-head mb-1 text-lg font-bold text-amber-950">
            <Text45 text={title} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

/** شبكة أمثلة إنجليزية مع الترجمة والوسم الدلالي */
export function ExampleGrid45({
  items,
  columns = 2,
}: {
  items: { en: string; ar: string; tag?: string; tone?: Tone45 }[];
  columns?: 1 | 2;
}) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((item, idx) => (
        <div
          key={`${item.en}-${idx}`}
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-slate-300 hover:bg-white"
        >
          <div>
            <div dir="ltr" className="flex flex-wrap items-start justify-between gap-2 text-left">
              <span
                lang="en"
                className="font-en text-lg font-extrabold leading-relaxed text-slate-900 md:text-xl"
              >
                {item.en}
              </span>
              {item.tag && (
                <span
                  dir="rtl"
                  className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${
                    BADGE_TONES[item.tone ?? "violet"]
                  }`}
                >
                  <Text45 text={item.tag} />
                </span>
              )}
            </div>
            <p className="mt-2 text-base font-medium leading-relaxed text-slate-600">
              <Text45 text={item.ar} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** بطاقات مرقّمة للأهداف والقواعد الذهبية (مطابقة لشريحة أهداف الدرس الأول) */
export function NumberList45({
  items,
  columns = 2,
  tone = "violet",
}: {
  items: string[];
  columns?: 1 | 2;
  tone?: Exclude<Tone45, "amber" | "rose">;
}) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {items.map((text, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
        >
          <span
            className={`font-head grid h-10 w-10 shrink-0 place-items-center rounded-xl text-base font-bold ${SOLID_TONES[tone]}`}
          >
            {idx + 1}
          </span>
          <p className="pt-0.5 text-base font-semibold leading-relaxed text-slate-800 md:text-lg">
            <Text45 text={text} />
          </p>
        </div>
      ))}
    </div>
  );
}

/** جدول مقارنة منسّق ومتجاوب */
export function ComparisonTable45({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
      <table className="w-full min-w-[460px] border-collapse text-right">
        <thead className="bg-slate-900 text-white">
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-3 text-sm font-bold md:text-base">
                <Text45 text={h} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50" : "bg-white"}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border-t border-slate-100 px-4 py-3 text-base font-semibold text-slate-800"
                >
                  <Text45 text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** عرض حوار ثنائي مع الترجمة العربية وتحليل التراكيب */
export function DialogueView45({
  turns,
  notes,
}: {
  turns: { speaker: string; en: string; ar: string; tone?: "violet" | "sky" }[];
  notes?: { expr: string; meaning: string }[];
}) {
  const [showAr, setShowAr] = useState(true);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-bold text-slate-500">حوار تطبيقي طبيعي</span>
        <button
          type="button"
          onClick={() => setShowAr((v) => !v)}
          className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
        >
          {showAr ? "إخفاء الترجمة العربية" : "إظهار الترجمة العربية"}
        </button>
      </div>

      <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">
        {turns.map((turn, idx) => {
          const isViolet = (turn.tone ?? (idx % 2 === 0 ? "violet" : "sky")) === "violet";
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs"
            >
              <div dir="ltr" className="flex flex-wrap items-baseline gap-2.5 text-left">
                <span
                  className={`font-en shrink-0 rounded-lg px-2.5 py-0.5 text-sm font-extrabold ${
                    isViolet
                      ? "bg-violet-100 text-violet-800"
                      : "bg-sky-100 text-sky-800"
                  }`}
                >
                  {turn.speaker}:
                </span>
                <span className="font-en text-lg font-bold leading-relaxed text-slate-900 md:text-xl">
                  {turn.en}
                </span>
              </div>
              {showAr && (
                <p className="mt-2 border-t border-slate-100 pt-2 text-base font-medium text-slate-600">
                  <Text45 text={turn.ar} />
                </p>
              )}
            </div>
          );
        })}
      </div>

      {notes && notes.length > 0 && (
        <div className="rounded-3xl border border-violet-200 bg-violet-50/60 p-4 md:p-5">
          <h3 className="font-head text-lg font-bold text-violet-950">تحليل التراكيب في الحوار</h3>
          <div className="mt-3 grid gap-2.5 md:grid-cols-2">
            {notes.map((n, i) => (
              <div
                key={i}
                className="rounded-xl border border-violet-100 bg-white px-3.5 py-2.5"
              >
                <div dir="ltr" className="text-left">
                  <span
                    lang="en"
                    className="font-en inline-block rounded-lg bg-violet-100 px-2.5 py-0.5 text-sm font-extrabold text-violet-900"
                  >
                    {n.expr}
                  </span>
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-700">
                  <Text45 text={n.meaning} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
