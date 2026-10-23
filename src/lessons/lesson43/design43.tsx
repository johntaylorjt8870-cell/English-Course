import type { ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// عناصر العرض — نفس مفردات الدروس 1–9 الأصلية، وهي المفردات نفسها
// التي أعاد الدرس 41 استخدامها: بطاقة بيضاء بحواف كبيرة، شارة ملوّنة،
// عنوان Changa، تميمة متحركة، رقاقات أمثلة، بطاقات ✓/✕، وجداول
// داخل حدود الشريحة. لا نظام تصميم خاصًا بالدرس ولا ملف CSS جديد.
// ============================================================

export function En43({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`font-en ${className}`}>
      {children}
    </span>
  );
}

/** نص عربي/مختلط مع عزل المقاطع الإنجليزية تلقائيًا. */
export function Text43({ text, className = "" }: { text: string; className?: string }) {
  const englishOnly = /[A-Za-z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
  if (englishOnly) {
    return (
      <span dir="ltr" lang="en" className={`font-en ${className}`}>
        {text}
      </span>
    );
  }
  return (
    <span className={className}>
      <LatinRuns text={text} />
    </span>
  );
}

export function Num43({ n, tone = "violet" }: { n: number | string; tone?: "violet" | "sky" | "orange" | "emerald" | "slate" }) {
  const tones = {
    violet: "bg-violet-600",
    sky: "bg-sky-700",
    orange: "bg-orange-700",
    emerald: "bg-emerald-700",
    slate: "bg-slate-900",
  } as const;
  return <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${tones[tone]}`}>{n}</span>;
}

export function Frame43({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
  tone = "violet",
}: {
  mascot: string;
  step?: number | string;
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  tip?: ReactNode;
  tone?: "violet" | "sky" | "orange" | "emerald";
}) {
  const badgeTone = {
    violet: "bg-violet-100 text-violet-700",
    sky: "bg-sky-100 text-sky-700",
    orange: "bg-orange-100 text-orange-700",
    emerald: "bg-emerald-100 text-emerald-700",
  } as const;
  return (
    <section className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10">
      <div className="pointer-events-none absolute left-6 top-5 select-none text-5xl anim-drift md:text-6xl" aria-hidden="true">
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {step !== undefined && (
          <span className="font-head grid h-12 min-w-12 place-items-center rounded-2xl bg-slate-900 px-2 text-xl font-bold leading-none text-white shadow">{step}</span>
        )}
        {badge && (
          <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${badgeTone[tone]}`}>
            <Text43 text={badge} />
          </span>
        )}
      </div>
      <h2 id="l43-title" tabIndex={-1} className="font-head mt-4 max-w-[85%] text-3xl font-bold leading-snug text-slate-900 outline-none md:text-4xl">
        {typeof title === "string" ? <Text43 text={title} /> : title}
      </h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{typeof lead === "string" ? <Text43 text={lead} /> : lead}</p>}
      <div className="mt-7 space-y-4">{children}</div>
      {tip && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-900 p-4 text-white">
          <span className="text-2xl" aria-hidden="true">
            🦉
          </span>
          <div className="text-base font-semibold leading-relaxed md:text-lg">{typeof tip === "string" ? <Text43 text={tip} /> : tip}</div>
        </div>
      )}
    </section>
  );
}

export function Panel43({ children, title, kicker, tone = "slate" }: { children: ReactNode; title?: string; kicker?: string; tone?: "slate" | "violet" }) {
  return (
    <section className={`rounded-3xl border p-4 md:p-5 ${tone === "violet" ? "border-violet-200 bg-violet-50/60" : "border-slate-200 bg-slate-50/70"}`}>
      {kicker && (
        <p className="text-xs font-extrabold tracking-wide text-violet-700">
          <Text43 text={kicker} />
        </p>
      )}
      {title && <h3 className="font-head mt-1 text-xl font-bold text-slate-900"><Text43 text={title} /></h3>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function Note43({ emoji = "📌", children }: { emoji?: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <span className="text-2xl" aria-hidden="true">
        {emoji}
      </span>
      <div className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg">{children}</div>
    </div>
  );
}

export function Tip43({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold leading-relaxed text-slate-500 md:text-base">{children}</div>
  );
}

// ------------------------------------------------------------
// تحليل أسطر المصدر وعرضها
// ------------------------------------------------------------

const ARABIC = /[\u0600-\u06FF]/;
const HAS_LATIN = /[A-Za-z]/;

function isEnglishLine(line: string) {
  return HAS_LATIN.test(line) && !ARABIC.test(line);
}

function isLabelLine(line: string) {
  if (!ARABIC.test(line)) return false;
  const trimmed = line.trim();
  if (trimmed.endsWith(":") || trimmed.endsWith("؟") === false && trimmed.length <= 26 && !/[.!]$/.test(trimmed) && !trimmed.includes(" | ")) return true;
  return /^(مثال آخر|مثال ثانٍ|مثال ثالث|تأمل|لنقارن|قارن|لاحظ|الإجابات القصيرة|الحلول|الحلول المفصلة|الترجمة|التحليل|تحليل الحوار|تحليل الاستخدامات|القاعدة|القاعدة الذهبية|القاعدة التعليمية|الصيغة|أمثلة|أمثلة حياتية|مثال|الخطأ الشائع|نقطة متقدمة|اكتشاف مهم|مقارنة|الفرق الأساسي|الفرق في المعنى|الفرق المتقدم|سؤال الفهم|سؤال خاص بالفاعل|فرق مهم|انتبه|لا تقل|ملاحظة|ملاحظة مهمة|ملاحظة للمعلم|خريطة القدرة|المطلوب|نموذج إرشادي|حلول نموذجية|تحدي إضافي|تحدي سريع|أهم الاستخدامات|التعبير عن القدرة المستقبلية|التقدم الكلي|الدرس القادم|سنتعلم فيه|الأسئلة|مفتاح تصحيح|اختر|ماذا عن النفي|حوار قصير|من السياق|لماذا لا نقول|ما الفرق بين|السبب)/.test(
    trimmed,
  );
}

function stripMark(line: string) {
  return line.replace(/[✅❌]/g, "").trim();
}

function Verdict43({ line }: { line: string }) {
  const wrong = line.includes("❌");
  const [english, ...rest] = stripMark(line).split(" — ");
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-2xl border-2 p-3 ${wrong ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${wrong ? "bg-rose-500" : "bg-emerald-500"}`} aria-hidden="true">
        {wrong ? "✕" : "✓"}
      </span>
      <span dir="ltr" lang="en" className={`font-en text-lg font-bold md:text-xl ${wrong ? "text-rose-900 line-through decoration-rose-300" : "text-emerald-900"}`}>
        {english}
      </span>
      {rest.length > 0 && <span className="text-sm text-slate-600 md:text-base">{rest.join(" — ")}</span>}
      <span className="sr-only">{wrong ? "صيغة غير صحيحة" : "صيغة صحيحة"}</span>
    </div>
  );
}

function Table43({ rows }: { rows: string[] }) {
  const [head, ...body] = rows.map((row) => row.split(" | "));
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[520px] border-collapse text-right">
        <thead className="bg-slate-900 text-white">
          <tr>
            {head.map((cell, i) => (
              <th key={i} scope="col" className="px-4 py-2.5 text-sm font-bold">
                <Text43 text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className={ri % 2 ? "bg-slate-50" : "bg-white"}>
              {row.map((cell, ci) => (
                <td key={ci} className="border-t border-slate-100 px-4 py-2.5 text-base font-medium text-slate-700">
                  <Text43 text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Examples43({ lines }: { lines: string[] }) {
  const chips = lines.every((line) => stripMark(line).split(/\s+/).length <= 3 && !/[+=/→]/.test(line));
  if (chips) {
    return (
      <div dir="ltr" className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        {lines.map((line, i) => (
          <span key={i} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-en text-lg font-extrabold text-slate-800 shadow-sm md:text-xl">
            {stripMark(line)}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 md:p-4">
      {lines.map((line, i) => {
        const formula = /(\+|=|→)/.test(line) && stripMark(line).split(/\s+/).length <= 8;
        return (
          <div key={i} dir="ltr" lang="en" className={`flex items-start gap-2 font-en text-lg font-bold leading-relaxed md:text-xl ${formula ? "text-violet-700" : "text-slate-800"}`}>
            <span className="pt-1 text-sm text-slate-300" aria-hidden="true">
              ▸
            </span>
            <span>{stripMark(line)}</span>
          </div>
        );
      })}
    </div>
  );
}

function Definition43({ line }: { line: string }) {
  const [left, ...right] = line.split(" = ");
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
      <span dir="ltr" lang="en" className="font-en rounded-lg bg-violet-50 px-2 py-0.5 text-lg font-extrabold text-violet-700">
        {left}
      </span>
      <span className="font-bold text-slate-500">=</span>
      <span className="text-base font-semibold text-slate-700">
        <Text43 text={right.join(" = ")} />
      </span>
    </div>
  );
}

/** يعرض أسطر المصدر بالترتيب نفسه، مع أسلوب عرض مناسب لكل نوع سطر. */
export function SourceLines43({ lines, variant = "auto" }: { lines: string[]; variant?: "auto" | "objectives" | "steps" | "dialogue" }) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.includes(" | ")) {
      const start = i;
      const rows: string[] = [];
      while (i < lines.length && lines[i].includes(" | ")) rows.push(lines[i++]);
      out.push(<Table43 key={`t-${start}`} rows={rows} />);
      continue;
    }

    if (/[✅❌]/.test(line)) {
      out.push(<Verdict43 key={`v-${i}`} line={line} />);
      i += 1;
      continue;
    }

    if (isEnglishLine(line) && line.trim().endsWith(":")) {
      out.push(
        <p key={`el-${i}`} dir="ltr" lang="en" className="font-en text-base font-extrabold text-violet-700">
          {line.trim()}
        </p>,
      );
      i += 1;
      continue;
    }

    if (isEnglishLine(line)) {
      const start = i;
      const rows: string[] = [];
      while (i < lines.length && isEnglishLine(lines[i]) && !lines[i].trim().endsWith(":") && !/[✅❌]/.test(lines[i]) && !lines[i].includes(" | ")) {
        rows.push(lines[i++]);
      }
      out.push(<Examples43 key={`e-${start}`} lines={rows} />);
      continue;
    }

    if (isLabelLine(line)) {
      out.push(
        <p key={`l-${i}`} className="font-head flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" aria-hidden="true" />
          <Text43 text={line} />
        </p>,
      );
      i += 1;
      continue;
    }

    if (line.includes(" = ") && isEnglishLine(line.split(" = ")[0])) {
      out.push(<Definition43 key={`d-${i}`} line={line} />);
      i += 1;
      continue;
    }

    out.push(
      <p
        key={`p-${i}`}
        className={`text-lg leading-9 ${variant === "dialogue" && /^(مايا|عمر|المعلم|المعلمة|الطالب|لينا|دانيال|أمين المكتبة):/.test(line) ? "rounded-2xl bg-slate-50 px-4 py-2 text-slate-700" : "text-slate-700"}`}
      >
        <Text43 text={line} />
      </p>,
    );
    i += 1;
  }
  return <div className="space-y-3">{out}</div>;
}

/** قائمة أهداف/خطوات مرقّمة بشارات واضحة. */
export function NumberCards43({ lines, columns = 2, tone = "violet" }: { lines: string[]; columns?: 1 | 2; tone?: "violet" | "sky" | "orange" | "emerald" }) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`}>
      {lines.map((line, i) => {
        const text = line.replace(/^[\u2460-\u2473\u3251-\u325f]/, "").trim();
        return (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
            <Num43 n={i + 1} tone={tone} />
            <p className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg">
              <Text43 text={text} />
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** بطاقة فعل ناقص — نفس أسلوب بطاقات المحركات في غلاف الدرس 41. */
export function ModalCard43({ name, ar, forms, examples, tone }: { name: string; ar: string; forms: string; examples: string[]; tone: "sky" | "violet" | "emerald" }) {
  const styles = {
    sky: "border-sky-200 bg-sky-50 text-sky-800",
    violet: "border-violet-200 bg-violet-50 text-violet-800",
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  } as const;
  const dots = { sky: "bg-sky-500", violet: "bg-violet-500", emerald: "bg-emerald-500" } as const;
  return (
    <div className={`rounded-3xl border-2 p-4 ${styles[tone]}`}>
      <div className="flex items-center justify-between">
        <En43 className="text-3xl font-extrabold">{name}</En43>
        <span className={`h-3 w-3 rounded-full ${dots[tone]}`} aria-hidden="true" />
      </div>
      <p className="mt-1 text-sm font-bold text-slate-600">{ar}</p>
      <p dir="ltr" lang="en" className="font-en mt-2 text-sm font-bold text-slate-700">
        {forms}
      </p>
      <div className="mt-2 space-y-1">
        {examples.map((ex) => (
          <p key={ex} dir="ltr" lang="en" className="font-en text-base font-semibold text-slate-800">
            {ex}
          </p>
        ))}
      </div>
    </div>
  );
}

/** جملة مفكّكة إلى رقاقات ملوّنة حسب الوظيفة — Subject + CAN/COULD + V1. */
export function Sentence43({ tokens, label = true }: { tokens: { text: string; role: "subject" | "modal" | "main" | "rest" }[]; label?: boolean }) {
  const styles = {
    subject: "border-sky-200 bg-sky-50 text-sky-900",
    modal: "border-violet-300 bg-violet-100 text-violet-900",
    main: "border-orange-200 bg-orange-50 text-orange-900",
    rest: "border-slate-200 bg-white text-slate-700",
  } as const;
  const labels = { subject: "فاعل", modal: "فعل ناقص", main: "V1", rest: "" } as const;
  return (
    <div dir="ltr" className="flex flex-wrap items-center gap-2">
      {tokens.map((t, i) => (
        <span key={i} className={`inline-flex flex-col items-center rounded-2xl border-2 px-3 py-1.5 ${styles[t.role]}`}>
          <span className="font-en text-lg font-extrabold md:text-xl">{t.text}</span>
          {label && t.role !== "rest" && <span className="mt-0.5 text-[10px] font-bold opacity-75">{labels[t.role]}</span>}
        </span>
      ))}
      <span className="font-en text-2xl font-bold text-slate-500">.</span>
    </div>
  );
}
