// ============================================================
// Lesson 36 — presentation kit
//
// Built on the same visual system as Lesson 1 (white cards, slate
// ink, rounded-3xl surfaces, Changa/Rubik fonts, sky/orange/emerald
// accents) and the shared bidi helpers. No separate theme, no
// duplicated shell, no local sidebar or prev/next buttons.
// ============================================================

import type { ReactNode } from "react";
import { textOf, type Ref } from "./content36";

import { En } from "../../shared/lessonKit";

export const FOCUS_36 =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2";

const ARABIC = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/** English (or English-dominant) line kept in a hard LTR island. */
export function En36({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <En className={`inline-block max-w-full [unicode-bidi:isolate] ${className}`}>
      <span lang="en">{children}</span>
    </En>
  );
}

export function pureEnglish(text: string) {
  return /[A-Za-z]/.test(text) && !ARABIC.test(text);
}

/**
 * Latin runs inside an Arabic line, isolated as LTR islands.
 * The split keeps every original character (including the spaces around the
 * run) so the rendered text stays character-for-character identical to the
 * supplied source line while English still reads left-to-right.
 */
const LATIN_RUN = /[A-Za-z][A-Za-z0-9'’._-]*(?:[ \t][A-Za-z0-9'’._-]+)*/g;

export function MixedText36({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (const match of text.matchAll(LATIN_RUN)) {
    const at = match.index ?? 0;
    if (at > cursor) nodes.push(text.slice(cursor, at));
    nodes.push(
      <span key={`latin-${key++}`} dir="ltr" lang="en" className="font-en [unicode-bidi:isolate]">
        {match[0]}
      </span>,
    );
    cursor = at + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

/** One verbatim source line, direction-safe. */
export function SourceText36({ value, className = "" }: { value: Ref; className?: string }) {
  const text = textOf(value);
  if (pureEnglish(text)) {
    return <En36 className={`text-left leading-relaxed ${className}`}>{text}</En36>;
  }
  return (
    <span className={className}>
      <MixedText36 text={text} />
    </span>
  );
}

export function Card36({
  children,
  title,
  eyebrow,
  tone = "plain",
  className = "",
  id,
}: {
  children: ReactNode;
  title?: ReactNode;
  eyebrow?: ReactNode;
  tone?: "plain" | "will" | "going" | "evidence" | "warm";
  className?: string;
  id?: string;
}) {
  const border =
    tone === "will"
      ? "border-sky-200 bg-sky-50/60"
      : tone === "going"
        ? "border-orange-200 bg-orange-50/60"
        : tone === "evidence"
          ? "border-emerald-200 bg-emerald-50/60"
          : tone === "warm"
            ? "border-amber-200 bg-amber-50/60"
            : "border-slate-200 bg-white";
  return (
    <section id={id} className={`rounded-3xl border ${border} p-5 shadow-sm sm:p-6 ${className}`}>
      {eyebrow ? <div className="text-xs font-black uppercase tracking-[.12em] text-slate-500">{eyebrow}</div> : null}
      {title ? <h3 className="font-head mt-1 text-lg font-bold leading-snug text-slate-900 sm:text-xl">{title}</h3> : null}
      <div className={`text-[15px] leading-8 text-slate-700 sm:text-base ${title || eyebrow ? "mt-3" : ""}`}>{children}</div>
    </section>
  );
}

export function StepHead36({
  stage,
  step,
  total,
  title,
  subtitle,
}: {
  stage: { icon: string; label: string };
  step: number;
  total: number;
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
          <span aria-hidden>{stage.icon}</span>
          {stage.label}
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600">
          الخطوة <span dir="ltr" className="font-en tabular-nums">{step}</span> من <span dir="ltr" className="font-en tabular-nums">{total}</span>
        </span>
      </div>
      {title ? <h2 className="font-head mt-3 text-2xl font-bold leading-snug text-slate-900 md:text-[2rem]">{title}</h2> : null}
      {subtitle ? <p className="mt-1.5 text-sm leading-7 text-slate-600 sm:text-base">{subtitle}</p> : null}
    </header>
  );
}

export function Prose36({ lines, className = "" }: { lines: Ref[]; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {lines.map((line) => (
        <p key={`${line.s}-${line.i}`} className="text-[15px] leading-8 text-slate-700 sm:text-base">
          <SourceText36 value={line} />
        </p>
      ))}
    </div>
  );
}

export function Cue36({ line }: { line: Ref }) {
  return (
    <p className="text-sm font-bold text-slate-500">
      <SourceText36 value={line} />
    </p>
  );
}

export function FormBadge36({ form, size = "md" }: { form: "will" | "going"; size?: "sm" | "md" }) {
  const tone = form === "will" ? "border-sky-300 bg-sky-100 text-sky-900" : "border-orange-300 bg-orange-100 text-orange-900";
  return (
    <span className={`inline-flex items-center rounded-full border ${tone} ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs"} font-black`}>
      <En36>{form === "will" ? "WILL" : "BE GOING TO"}</En36>
    </span>
  );
}

export function ExampleCard36({
  en,
  ar,
  index,
  tone = "plain",
}: {
  en: Ref;
  ar?: Ref;
  index?: number;
  tone?: "plain" | "will" | "going" | "evidence";
}) {
  const border =
    tone === "will"
      ? "border-sky-200 bg-white"
      : tone === "going"
        ? "border-orange-200 bg-white"
        : tone === "evidence"
          ? "border-emerald-200 bg-white"
          : "border-slate-200 bg-white";
  return (
    <div className={`rounded-2xl border ${border} px-4 py-3 shadow-sm`}>
      <div className="flex items-start gap-3">
        {typeof index === "number" ? (
          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-900 text-[11px] font-bold text-white" aria-hidden>
            {index}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold text-slate-900 sm:text-xl">
            <SourceText36 value={en} />
          </p>
          {ar ? (
            <p className="mt-1 text-sm leading-7 text-slate-500">
              <SourceText36 value={ar} />
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function splitSpeaker36(raw: string) {
  const match = raw.match(/^([^:：]{1,28})[:：]\s*(.*)$/s);
  if (!match) return { speaker: null, body: raw };
  return { speaker: match[1].trim(), body: match[2] };
}

export function Dialogue36({ lines, heading }: { lines: { en: Ref; ar?: Ref }[]; heading?: Ref }) {
  return (
    <div className="space-y-2" data-dialogue>
      {heading ? (
        <p className="text-xs font-black uppercase tracking-[.12em] text-slate-500">
          <SourceText36 value={heading} />
        </p>
      ) : null}
      {lines.map((line, index) => {
        const raw = textOf(line.en);
        const { speaker, body } = splitSpeaker36(raw);
        const isArabicSpeaker = speaker ? ARABIC.test(speaker) : false;
        return (
          <div key={`${line.en.s}-${line.en.i}`} className={`rounded-2xl border border-slate-200 px-4 py-3 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
            <div className="flex items-start gap-3">
              {speaker ? (
                <span className="mt-0.5 shrink-0 rounded-lg bg-slate-900 px-2 py-0.5 text-xs font-bold text-white" dir={isArabicSpeaker ? "rtl" : "ltr"} lang={isArabicSpeaker ? "ar" : "en"}>
                  {speaker}:
                </span>
              ) : null}
              {" "}
              <div className="min-w-0 flex-1">
                {pureEnglish(body) ? (
                  <En36 className="text-left text-lg font-semibold leading-relaxed text-slate-900 sm:text-xl">{body}</En36>
                ) : (
                  <MixedText36 text={body} />
                )}
                {line.ar ? (
                  <p className="mt-1 text-sm leading-7 text-slate-500">
                    <SourceText36 value={line.ar} />
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Translations36({ heading, lines }: { heading: Ref; lines: Ref[] }) {
  return (
    <Card36 eyebrow={<SourceText36 value={heading} />} tone="warm">
      <ul className="space-y-1.5">
        {lines.map((line) => (
          <li key={`${line.s}-${line.i}`} className="text-slate-700">
            <SourceText36 value={line} />
          </li>
        ))}
      </ul>
    </Card36>
  );
}

export function Formulas36({ cards }: { cards: { form: "will" | "going"; title: Ref; rows: { label: Ref; formula?: Ref; examples: Ref[] }[] }[] }) {
  return (
    <div className="grid gap-3">
      {cards.map((card) => (
        <Card36 key={textOf(card.title)} tone={card.form === "will" ? "will" : "going"} title={<SourceText36 value={card.title} />}>
          <div className="space-y-3">
            {card.rows.map((row) => (
              <div key={`${row.label.s}-${row.label.i}`} className="rounded-2xl border border-white/70 bg-white px-3 py-2 shadow-sm">
                <p className="text-xs font-black text-slate-500">
                  <SourceText36 value={row.label} />
                </p>
                {row.formula ? (
                  <p className="mt-1 overflow-x-auto rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white">
                    <En36 className="text-left tracking-wide">{textOf(row.formula)}</En36>
                  </p>
                ) : null}
                <ul className="mt-1.5 space-y-1">
                  {row.examples.map((example) => (
                    <li key={`${example.s}-${example.i}`} className="text-sm text-slate-700">
                      <SourceText36 value={example} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card36>
      ))}
    </div>
  );
}

export function CompareTable36({ caption, rows }: { caption: string; rows: readonly (readonly [string, string])[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm sm:text-base">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-slate-900 text-white">
            <th scope="col" className="px-4 py-3 text-right font-bold">الموقف</th>
            <th scope="col" className="w-36 px-4 py-3 text-right font-bold">الصيغة النموذجية</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([situation, form], index) => (
            <tr key={`${situation}-${form}`} className={index % 2 ? "bg-slate-50" : "bg-white"}>
              <th scope="row" className="border-t border-slate-200 px-4 py-2.5 text-right font-semibold text-slate-700">
                <MixedText36 text={situation} />
              </th>
              <td className="border-t border-slate-200 px-4 py-2.5">
                <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-black ${form === "WILL" ? "border-sky-300 bg-sky-100 text-sky-900" : "border-orange-300 bg-orange-100 text-orange-900"}`}>
                  <En36>{form}</En36>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout36({ tone = "note", title, children }: { tone?: "note" | "tip" | "warn" | "success" | "neutral"; title?: string; children: ReactNode }) {
  const map = {
    note: ["border-sky-200 bg-sky-50", "text-sky-900", "💡"],
    tip: ["border-emerald-200 bg-emerald-50", "text-emerald-900", "🦉"],
    warn: ["border-amber-200 bg-amber-50", "text-amber-900", "⚠️"],
    success: ["border-emerald-200 bg-emerald-50", "text-emerald-900", "✓"],
    neutral: ["border-slate-200 bg-slate-50", "text-slate-800", "📌"],
  }[tone];
  return (
    <aside className={`rounded-2xl border px-4 py-3 ${map[0]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl" aria-hidden>{map[2]}</span>
        <div className="min-w-0 flex-1">
          {title ? <p className={`text-sm font-black ${map[1]}`}>{title}</p> : null}
          <div className={`text-sm leading-7 ${map[1]}`}>{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function Chip36({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "will" | "going" }) {
  const style = tone === "will" ? "border-sky-300 bg-sky-50 text-sky-900" : tone === "going" ? "border-orange-300 bg-orange-50 text-orange-900" : "border-slate-300 bg-white text-slate-700";
  return <span className={`inline-flex items-center rounded-xl border px-2.5 py-1 text-sm font-bold ${style}`}>{children}</span>;
}

export function ActionButton36({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
}) {
  const style =
    variant === "primary"
      ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-700"
      : variant === "secondary"
        ? "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
        : "border-transparent bg-transparent text-slate-600 hover:bg-slate-100";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${FOCUS_36} inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 ${style} ${className}`}
    >
      {children}
    </button>
  );
}

export function Feedback36({
  state,
  title,
  children,
}: {
  state: "correct" | "review" | "info";
  title: string;
  children?: ReactNode;
}) {
  const style =
    state === "correct"
      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
      : state === "review"
        ? "border-amber-300 bg-amber-50 text-amber-900"
        : "border-slate-300 bg-slate-50 text-slate-800";
  const icon = state === "correct" ? "✓" : state === "review" ? "↺" : "ℹ";
  return (
    <div role="status" aria-live="polite" className={`rounded-2xl border px-3 py-2.5 text-sm leading-7 ${style}`}>
      <p className="font-black">
        <span aria-hidden className="mr-1">{icon}</span> {title}
      </p>
      {children ? <div className="mt-1">{children}</div> : null}
    </div>
  );
}

/** Normalise learner typing before comparing with an accepted answer. */
export function normalize36(value: string) {
  return value
    .replace(/[\u200e\u200f\u202a-\u202e]/g, "")
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/[.!?؟]+$/g, "")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
}

export function matches36(value: string, accepted: readonly string[]) {
  const normalized = normalize36(value);
  if (!normalized) return false;
  return accepted.some((candidate) => normalize36(candidate) === normalized);
}

export function LevelPill36({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black text-slate-600">{children}</span>;
}
