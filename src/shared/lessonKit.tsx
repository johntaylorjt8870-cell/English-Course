import type { ReactNode } from "react";
import { LatinRuns } from "./bidi";

// ============================================================
// Lesson Kit — أنماط التدريس المشتركة المستخلصة من الدرس 6 (الـ benchmark)
//
// عناصر صغيرة قابلة لإعادة الاستخدام بين الدروس:
//   En / Rich          عزل الإنجليزية LTR داخل الواجهة العربية RTL
//   Frame              إطار الشريحة: خطوة + شارة + تميمة + عنوان + lead + tip
//   Note               ملاحظة كهرمانية (مع وسم «Platform Explanation» عند الحاجة)
//   Verdict            بطاقة ✓/✕ لجملة صحيحة/خاطئة مع السبب
//   PartsLine          تشريح الجملة بأدوار ملوّنة (نظام أدوار يحدده كل درس)
//   SentenceCard       جملة مشرّحة + ترجمة + ملاحظة
//   Nub                رقم بند التمرين
//   PlatformTag        وسم يميز شروح المنصة عن محتوى المصدر
//
// القاعدة: الكِت لا يحمل محتوى أي درس — الألوان الدلالية (أدوار الجملة،
// لوحة الزمن…) يمرّرها الدرس نفسه كي تبقى لكل درس هويته.
// ============================================================

export function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

/** نص مختلط عربي/إنجليزي — يعزل المقاطع اللاتينية تلقائيًا عبر LatinRuns. */
export function Rich({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <LatinRuns text={text} />
    </span>
  );
}

/** شارة تميّز إضافات المنصة (شرح/ترجمة) عن محتوى المصدر المورّد. */
export function PlatformTag({ text = "Platform Explanation" }: { text?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] font-black text-white">
      🛠️ <En>{text}</En>
    </span>
  );
}

// ------------------------------------------------------------
// تشريح الجملة — أدوار ملوّنة يعرّفها الدرس
// ------------------------------------------------------------

export type RoleStyle = {
  /** صفوف tailwind كاملة للرقاقة، مثل: "bg-sky-100 border-sky-300 text-sky-900" */
  chip: string;
  /** اسم الدور بالعربية — يظهر تحت الرقاقة */
  label: string;
};

export type Part = { text: string; role: string };

export function PartsLine({
  parts,
  roles,
  q = false,
  size = "md",
  label = true,
}: {
  parts: Part[];
  roles: Record<string, RoleStyle>;
  q?: boolean;
  size?: "sm" | "md" | "lg";
  label?: boolean;
}) {
  const sz =
    size === "lg"
      ? "px-4 py-2.5 text-xl md:text-2xl"
      : size === "sm"
        ? "px-2.5 py-1 text-sm md:text-base"
        : "px-3 py-1.5 text-base md:text-xl";
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-end gap-1.5 sm:gap-2">
      {parts.map((p, i) => (
        <span
          key={i}
          className={`inline-flex flex-col items-center rounded-2xl border-2 ${roles[p.role]?.chip ?? "bg-slate-100 border-slate-300 text-slate-800"} ${sz} font-en font-extrabold leading-tight`}
        >
          {p.text}
          {label && <span className="mt-0.5 text-[10px] font-bold opacity-70">{roles[p.role]?.label ?? ""}</span>}
        </span>
      ))}
      <span className="font-en pb-1 text-2xl font-bold text-slate-300">{q ? "?" : "."}</span>
    </div>
  );
}

export function SentenceCard({
  parts,
  roles,
  ar,
  note,
  q = false,
  size = "md",
  label = true,
}: {
  parts: Part[];
  roles: Record<string, RoleStyle>;
  ar?: string;
  note?: string;
  q?: boolean;
  size?: "sm" | "md" | "lg";
  label?: boolean;
}) {
  return (
    <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
      <PartsLine parts={parts} roles={roles} q={q} size={size} label={label} />
      {(ar || note) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {ar && <Rich text={ar} className="text-base text-slate-500 md:text-lg" />}
          {note && (
            <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
              📌 <Rich text={note} />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------
// إطار الشريحة
// ------------------------------------------------------------

export type FrameAccent = {
  /** مربع رقم الخطوة، مثل: "bg-teal-600" */
  step: string;
  /** شارة العنوان، مثل: "bg-teal-100 text-teal-800" */
  badge: string;
  /** تدرّج شريط النصيحة، مثل: "from-teal-700 to-emerald-700" */
  tip: string;
  /** ظل الإطار، مثل: "shadow-[0_14px_44px_-20px_rgba(13,148,136,0.3)]" */
  shadow: string;
};

const DEFAULT_ACCENT: FrameAccent = {
  step: "bg-teal-600",
  badge: "bg-teal-100 text-teal-800",
  tip: "from-teal-700 to-emerald-700",
  shadow: "shadow-[0_14px_44px_-20px_rgba(13,148,136,0.3)]",
};

export function Frame({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
  accent = DEFAULT_ACCENT,
  sourceTag,
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  tip?: string;
  accent?: FrameAccent;
  /** عنوان القسم المصدري — يظهر كرقاقة تتبّع صغيرة أعلى الإطار */
  sourceTag?: string;
}) {
  return (
    <section className={`relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-5 md:p-9 ${accent.shadow}`}>
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      {sourceTag && (
        <div data-source-section={sourceTag} className="mb-2 inline-block max-w-[85%] rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
          📜 <Rich text={sourceTag} />
        </div>
      )}
      <div className="flex items-center gap-2.5">
        {step && <span className={`font-head grid h-10 w-10 place-items-center rounded-2xl text-lg font-bold text-white ${accent.step}`}>{step}</span>}
        {badge && <span className={`rounded-full px-3.5 py-1.5 text-sm font-bold ${accent.badge}`}>{badge}</span>}
      </div>
      <h2 className="font-head mt-3 max-w-[88%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">{title}</h2>
      {lead && <p className="mt-2 max-w-[88%] text-base text-slate-500 md:text-xl">{lead}</p>}
      <div className="mt-5 space-y-3.5 md:mt-6">{children}</div>
      {tip && (
        <div className={`mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l p-4 text-white ${accent.tip}`}>
          <span className="text-2xl">🦉</span>
          <Rich text={tip} className="text-base font-semibold md:text-lg" />
        </div>
      )}
    </section>
  );
}

export function Note({ emoji, text, platform = false }: { emoji: string; text: string; platform?: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <div className="min-w-0 flex-1">
        {platform && (
          <div className="mb-1.5">
            <PlatformTag />
          </div>
        )}
        <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
      </div>
    </div>
  );
}

export function Verdict({ ok, en, ar, why }: { ok: boolean; en: string; ar?: string; why?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-3xl border-2 p-4 ${ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-base font-bold text-white ${ok ? "bg-emerald-500" : "bg-rose-500"}`}>
        {ok ? "✓" : "✕"}
      </span>
      <En className={`text-lg font-bold md:text-xl ${ok ? "text-emerald-900" : "text-rose-800 line-through decoration-rose-300"}`}>{en}</En>
      {ar && <Rich text={ar} className="text-base text-slate-500" />}
      {why && <span className={`rounded-full px-3 py-1 text-xs font-bold ${ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{why}</span>}
    </div>
  );
}

/** رقم بند داخل تمرين. */
export function Nub({ n, className = "bg-teal-600" }: { n: number; className?: string }) {
  return <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${className}`}>{n}</span>;
}
