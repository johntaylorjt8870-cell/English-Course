import type { ReactNode } from "react";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// عناصر العرض — مفردات المنصة الأصلية (الدروس 1–3 ثم 41):
// بطاقة بيضاء بحواف 2rem، شارة خطوة slate-900، عنوان Changa، تميمة anim-drift،
// رقاقات أمثلة، بطاقات ✓/✕، وجداول داخل حدود الشريحة.
//
// هوية الدرس 33 الخاصة: «مختبر أزمنة الحاضر الأربعة» — عدسة لونية ثابتة
// لكل زمن تُستعمل في البطاقات والجداول والرقاقات ومستويات الاختبار وتحليل القصة:
//   Present Simple            = sky     🔁 العادة
//   Present Continuous        = amber   ▶️ النشاط الجاري
//   Present Perfect           = emerald ✅ الإنجاز
//   Present Perfect Continuous= violet  ⏳ النشاط الممتد
// ============================================================

export const FOCUS33 = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/25";

export type TenseId33 = "PS" | "PC" | "PP" | "PPC";
export type Tone33 = "sky" | "amber" | "emerald" | "violet" | "slate" | "rose";

export const TENSES_33: {
  id: TenseId33;
  en: string;
  ar: string;
  short: string;
  lens: string;
  emoji: string;
  tone: Tone33;
  formula: string;
}[] = [
  { id: "PS", en: "Present Simple", ar: "المضارع البسيط", short: "بسيط", lens: "العادة", emoji: "🔁", tone: "sky", formula: "Subject + V1 / V-s" },
  { id: "PC", en: "Present Continuous", ar: "المضارع المستمر", short: "مستمر", lens: "النشاط الجاري", emoji: "▶️", tone: "amber", formula: "Subject + am/is/are + V-ing" },
  { id: "PP", en: "Present Perfect", ar: "المضارع التام", short: "تام", lens: "الإنجاز", emoji: "✅", tone: "emerald", formula: "Subject + have/has + V3" },
  { id: "PPC", en: "Present Perfect Continuous", ar: "المضارع التام المستمر", short: "تام مستمر", lens: "النشاط الممتد", emoji: "⏳", tone: "violet", formula: "Subject + have/has + been + V-ing" },
];

export function tenseById33(id: TenseId33) {
  const found = TENSES_33.find((tense) => tense.id === id);
  if (!found) throw new Error(`Unknown tense ${id}`);
  return found;
}

export function tenseByName33(name: string) {
  return TENSES_33.find((tense) => tense.en.toLowerCase() === name.trim().toLowerCase()) ?? null;
}

// ------------------------------------------------------------
// لوحات الألوان (كل الأزواج تتجاوز WCAG AA 4.5:1 — يُتحقق منها في التدقيق)
// ------------------------------------------------------------
export const TONE33: Record<Tone33, { chip: string; soft: string; solid: string; solidText: string; ring: string; dot: string }> = {
  sky: { chip: "bg-sky-100 text-sky-900", soft: "border-sky-200 bg-sky-50 text-sky-900", solid: "bg-sky-700", solidText: "text-white", ring: "ring-sky-400", dot: "bg-sky-500" },
  amber: { chip: "bg-amber-100 text-amber-900", soft: "border-amber-200 bg-amber-50 text-amber-900", solid: "bg-amber-700", solidText: "text-white", ring: "ring-amber-400", dot: "bg-amber-500" },
  emerald: { chip: "bg-emerald-100 text-emerald-900", soft: "border-emerald-200 bg-emerald-50 text-emerald-900", solid: "bg-emerald-700", solidText: "text-white", ring: "ring-emerald-400", dot: "bg-emerald-500" },
  violet: { chip: "bg-violet-100 text-violet-900", soft: "border-violet-200 bg-violet-50 text-violet-900", solid: "bg-violet-700", solidText: "text-white", ring: "ring-violet-400", dot: "bg-violet-500" },
  slate: { chip: "bg-slate-200 text-slate-900", soft: "border-slate-200 bg-slate-50 text-slate-800", solid: "bg-slate-900", solidText: "text-white", ring: "ring-slate-400", dot: "bg-slate-500" },
  rose: { chip: "bg-rose-100 text-rose-900", soft: "border-rose-200 bg-rose-50 text-rose-900", solid: "bg-rose-700", solidText: "text-white", ring: "ring-rose-400", dot: "bg-rose-500" },
};

export function En33({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" lang="en" className={`font-en ${className}`.trim()}>
      {children}
    </span>
  );
}

/**
 * عنوان مختلط بصيغة «عربي — إنجليزي» أو «عربي: إنجليزي» (عنوان الدرس وعنوانه الفرعي).
 *
 * لماذا لا يكفي Text33/LatinRuns هنا؟ قاعدة المنصة المشتركة تجمع المقطع
 * الإنجليزي مع عبارته العربية حين تأتي الإنجليزية **أولًا** («IQ200 — رحلة…»)
 * فتُقرأ صحيحة. أما حين تأتي العربية أولًا فإن الفاصل (— أو :) يدخل داخل
 * العزلة اللاتينية فيظهر ملتصقًا بالإنجليزية في طرف السطر، وتضيع المسافة بين
 * الكتابتين. لذلك يُركَّب هذان السطران يدويًا: الجزء العربي في سياق RTL، ثم
 * الفاصل في موضعه المنطقي، ثم الجزء الإنجليزي في عازل LTR. السجل (ledger) يبقى
 * حرفيًا؛ التركيب عرضٌ فقط، و`textContent` الناتج يساوي وحدة المادة نفسها.
 */
export function MixedTitle33({ text, className = "" }: { text: string; className?: string }) {
  // الجزء الإنجليزي يجب ألّا يحتوي حرفًا عربيًا، وإلا تُجرَّب الفواصل التالية
  //   («الخطوة 63 من 71: المستوى الخامس: Final Boss (1/2)» تُقسم عند الفاصل الأخير).
  const match = text.match(/^([\s\S]*?[\u0600-\u06FF][\s\S]*?)(\s*[—:]\s*)([A-Za-z][^\u0600-\u06FF]*)$/);
  if (!match) return <Text33 text={text} className={className} />;
  const [, arabicPart, separator, englishPart] = match;
  return (
    <span className={className}>
      {arabicPart}
      {separator}
      <En33>{englishPart}</En33>
    </span>
  );
}

/** نص عربي أو مختلط — المقاطع الإنجليزية تُعزل تلقائيًا باتجاهها. */
export function Text33({ text, className = "" }: { text: string; className?: string }) {
  const englishOnly = /[A-Za-z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
  if (englishOnly) {
    return (
      <span dir="ltr" lang="en" className={`font-en ${className}`.trim()}>
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

export function Num33({ n, tone = "slate" }: { n: ReactNode; tone?: Tone33 }) {
  return (
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${TONE33[tone].solid}`}>{n}</span>
  );
}

/**
 * عدسة الزمن: رقاقة صغيرة ثابتة اللون تُستعمل في كل الدرس.
 * الرقاقة كلها معزولة بـ dir="ltr" (اسم الزمن إنجليزي + شرح عربي قصير)،
 * فيبقى الترتيب البصري «الاسم ثم الشرح» في كل المقاسات ولا ينعكس داخل
 * صفوف flex العربية.
 */
export function Lens33({ tense, showArabic = true, className = "" }: { tense: TenseId33; showArabic?: boolean; className?: string }) {
  const meta = tenseById33(tense);
  return (
    <span dir="ltr" className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${TONE33[meta.tone].soft} ${className}`.trim()}>
      <span aria-hidden="true">{meta.emoji}</span>
      <En33 className="text-xs font-extrabold">{meta.en}</En33>
      {showArabic && <span className="text-xs font-bold opacity-80">{meta.ar}</span>}
    </span>
  );
}

export function Frame33({
  mascot,
  step,
  badge,
  title,
  lead,
  children,
  tip,
  tone = "slate",
  aside,
}: {
  mascot: string;
  step?: number | string;
  badge?: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  tip?: ReactNode;
  tone?: Tone33;
  aside?: ReactNode;
}) {
  return (
    <section className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_-15px_rgba(30,27,75,0.15)] md:p-10">
      <div className="pointer-events-none absolute left-6 top-5 select-none text-5xl anim-drift md:text-6xl" aria-hidden="true">
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {step !== undefined && (
          <span className="font-head grid h-12 min-w-12 place-items-center rounded-2xl bg-slate-900 px-2 text-xl font-bold leading-none text-white shadow">
            {step}
          </span>
        )}
        {badge && <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${TONE33[tone].chip}`}>{badge}</span>}
      </div>
      <h2 id="l33-title" tabIndex={-1} className="font-head mt-4 max-w-[85%] text-3xl font-bold leading-snug text-slate-900 outline-none md:text-4xl">
        {typeof title === "string" ? <MixedTitle33 text={title} /> : title}
      </h2>
      {lead && <p className="mt-2 max-w-[88%] text-lg text-slate-500 md:text-xl">{typeof lead === "string" ? <Text33 text={lead} /> : lead}</p>}
      {aside && <div className="mt-4">{aside}</div>}
      <div className="mt-7 space-y-4">{children}</div>
      {tip && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-900 p-4 text-white">
          <span className="text-2xl" aria-hidden="true">
            💡
          </span>
          <div className="text-base font-semibold leading-relaxed md:text-lg">{typeof tip === "string" ? <Text33 text={tip} /> : tip}</div>
        </div>
      )}
    </section>
  );
}

export function Panel33({ children, title, kicker, tone = "slate" }: { children: ReactNode; title?: ReactNode; kicker?: string; tone?: Tone33 }) {
  return (
    <section className={`rounded-3xl border-2 p-4 md:p-5 ${TONE33[tone].soft}`}>
      {kicker && <p className="text-xs font-extrabold tracking-wide opacity-80">{kicker}</p>}
      {title && <h3 className="font-head mt-1 text-xl font-bold">{typeof title === "string" ? <MixedTitle33 text={title} /> : title}</h3>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function Note33({ emoji = "📌", children, tone = "amber" }: { emoji?: string; children: ReactNode; tone?: Tone33 }) {
  return (
    <div className={`flex items-start gap-3 rounded-3xl border-2 p-4 ${TONE33[tone].soft}`}>
      <span className="text-2xl" aria-hidden="true">
        {emoji}
      </span>
      <div className="text-base font-semibold leading-relaxed md:text-lg">{children}</div>
    </div>
  );
}

export function Tip33({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm font-semibold leading-relaxed text-slate-500 md:text-base">{children}</div>;
}

/** وسم المحتوى المُعدّ في المنصة (ليس من المادة التعليمية). */
export function PlatformTag33({ text = "Platform Explanation" }: { text?: string }) {
  return (
    <span dir="ltr" className="font-en inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
      {text}
    </span>
  );
}

// ------------------------------------------------------------
// تحليل أسطر المادة وعرضها
// ------------------------------------------------------------
const ARABIC = /[\u0600-\u06FF]/;
const HAS_LATIN = /[A-Za-z]/;

export function isEnglishLine33(line: string) {
  return HAS_LATIN.test(line) && !ARABIC.test(line);
}

const LABEL_HEADS =
  /^(لاحظ|مثال|مثال آخر|قارن|تأمل|لنقارن|تذكر|الفرق|الإجابة|الإجابة الأنسب|الحلول|الحل المصحح|لماذا؟|السؤال المهم|الدرس المهم|قاعدة|القاعدة|ملاحظة|تحدي|تحدٍّ|قد نقول|أو:|وليس:|التركيز|الجملة العربية|المقارنة الأولى|المقارنة الثانية|لكن انتبه|نعم →|احفظ هذا النموذج الذهبي|قبل اختيار أي زمن|سنستخدم الفعل|أكمل باستخدام الفعل|أكمل الجمل|استخدم الفعل|اقرأ القصة التالية|لدينا أربعة أزمنة|لدينا المواقف التالية|بنهاية الدرس|يجب أن تتضمن|أمامك أربع جمل|المعاني|لا تنتقل|توقف هنا|صحّح الجمل|اغسل)/;

function isLabelLine33(line: string) {
  if (!ARABIC.test(line)) return false;
  const trimmed = line.trim();
  if (trimmed.endsWith(":") || trimmed.endsWith("：")) return true;
  if (/^[①-⑳㉑-㉕]/.test(trimmed) && ARABIC.test(trimmed) && !HAS_LATIN.test(trimmed) && trimmed.length <= 60) return false;
  if (trimmed.length <= 30 && !/[.?؟!]$/.test(trimmed) && !trimmed.includes(" | ")) return true;
  return LABEL_HEADS.test(trimmed);
}

function stripMark33(line: string) {
  return line.replace(/[✅❌]/g, "").trim();
}

/** سطر ❌/✅ — بطاقة حكم. */
function Verdict33({ line }: { line: string }) {
  const wrong = line.includes("❌");
  const text = stripMark33(line);
  return (
    <div className={`flex flex-wrap items-center gap-3 rounded-2xl border-2 p-3 ${wrong ? "border-rose-200 bg-rose-50" : "border-emerald-200 bg-emerald-50"}`}>
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${wrong ? "bg-rose-600" : "bg-emerald-600"}`}
        aria-hidden="true"
      >
        {wrong ? "✕" : "✓"}
      </span>
      <span dir="ltr" lang="en" className={`font-en text-lg font-bold md:text-xl ${wrong ? "text-rose-900 line-through decoration-rose-300" : "text-emerald-900"}`}>
        {text}
      </span>
      <span className="sr-only">{wrong ? "صيغة غير صحيحة" : "صيغة صحيحة"}</span>
    </div>
  );
}

function Table33({ rows, tenseColumn = false }: { rows: string[]; tenseColumn?: boolean }) {
  const [head, ...body] = rows.map((row) => row.split(" | "));
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[520px] border-collapse text-right">
        <caption className="sr-only">جدول</caption>
        <thead className="bg-slate-900 text-white">
          <tr>
            {head.map((cell, i) => (
              <th key={i} scope="col" className="px-4 py-2.5 text-sm font-bold">
                <Text33 text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => {
            const tense = tenseColumn ? tenseByName33(row[0]) : null;
            const tone = tense ? TONE33[tense.tone] : null;
            return (
              <tr key={ri} className={tone ? `${tone.soft} border-t-2` : ri % 2 ? "bg-slate-50" : "bg-white"} data-tense-row={tense?.id ?? undefined}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`border-t border-slate-100 px-4 py-2.5 text-base font-medium ${tone ? "" : "text-slate-700"}`}>
                    {ci === 0 && tense ? (
                      <span className="inline-flex items-center gap-2 font-bold">
                        <span aria-hidden="true">{tense.emoji}</span>
                        <En33>{cell}</En33>
                      </span>
                    ) : (
                      <Text33 text={cell} />
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Examples33({ lines }: { lines: string[] }) {
  const chips = lines.every((line) => stripMark33(line).split(/\s+/).length <= 3 && !/[+=/→]/.test(line));
  if (chips) {
    return (
      <div dir="ltr" className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
        {lines.map((line, i) => (
          <span key={i} className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 font-en text-lg font-extrabold text-slate-800 shadow-sm md:text-xl">
            {stripMark33(line)}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 md:p-4">
      {lines.map((line, i) => {
        const formula = /(\+|=|→)/.test(line) && stripMark33(line).split(/\s+/).length <= 9;
        return (
          <div key={i} dir="ltr" lang="en" className={`flex items-start gap-2 font-en text-lg font-bold leading-relaxed md:text-xl ${formula ? "text-violet-700" : "text-slate-800"}`}>
            <span className="pt-1 text-sm text-slate-300" aria-hidden="true">
              ▸
            </span>
            <span>{stripMark33(line)}</span>
          </div>
        );
      })}
    </div>
  );
}

function Definition33({ line }: { line: string }) {
  const [left, ...right] = line.split(" = ");
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
      <span dir="ltr" lang="en" className="font-en rounded-lg bg-violet-50 px-2 py-0.5 text-lg font-extrabold text-violet-900">
        {left}
      </span>
      <span className="font-bold text-slate-300" aria-hidden="true">
        =
      </span>
      <span className="text-base font-semibold text-slate-700">
        <Text33 text={right.join(" = ")} />
      </span>
    </div>
  );
}

/** يعرض أسطر المادة بالترتيب نفسه، بأسلوب عرض مناسب لكل نوع سطر. */
export function SourceLines33({ lines, variant = "auto", tableTenseColumn = false }: { lines: string[]; variant?: "auto" | "objectives" | "steps"; tableTenseColumn?: boolean }) {
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.includes(" | ")) {
      const start = i;
      const rows: string[] = [];
      while (i < lines.length && lines[i].includes(" | ")) rows.push(lines[i++]);
      out.push(<Table33 key={`t-${start}`} rows={rows} tenseColumn={tableTenseColumn} />);
      continue;
    }

    if (/[✅❌]/.test(line)) {
      out.push(<Verdict33 key={`v-${i}`} line={line} />);
      i += 1;
      continue;
    }

    if (isEnglishLine33(line) && line.trim().endsWith(":")) {
      out.push(
        <p key={`el-${i}`} dir="ltr" className="font-en text-base font-extrabold text-violet-700">
          {line.trim()}
        </p>,
      );
      i += 1;
      continue;
    }

    if (isEnglishLine33(line)) {
      const start = i;
      const rows: string[] = [];
      while (i < lines.length && isEnglishLine33(lines[i]) && !lines[i].trim().endsWith(":") && !/[✅❌]/.test(lines[i]) && !lines[i].includes(" | ")) {
        rows.push(lines[i++]);
      }
      out.push(<Examples33 key={`e-${start}`} lines={rows} />);
      continue;
    }

    if (isLabelLine33(line)) {
      out.push(
        <p key={`l-${i}`} className="font-head flex items-center gap-2 text-lg font-bold text-slate-900">
          <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" aria-hidden="true" />
          <Text33 text={line} />
        </p>,
      );
      i += 1;
      continue;
    }

    if (line.includes(" = ") && isEnglishLine33(line.split(" = ")[0])) {
      out.push(<Definition33 key={`d-${i}`} line={line} />);
      i += 1;
      continue;
    }

    out.push(
      <p key={`p-${i}`} className="text-lg leading-9 text-slate-700">
        <Text33 text={line} />
      </p>,
    );
    i += 1;
  }
  return <div className={`space-y-3 ${variant === "steps" ? "" : ""}`.trim()}>{out}</div>;
}

/** قائمة أهداف/خطوات مرقّمة. */
export function NumberCards33({ lines, columns = 2, tone = "slate" }: { lines: string[]; columns?: 1 | 2; tone?: Tone33 }) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? "md:grid-cols-2" : ""}`.trim()}>
      {lines.map((line, i) => {
        const text = line.replace(/^[①-⑳㉑-㉕]\s*/, "").trim();
        const mark = line.match(/^[①-⑳㉑-㉕]/)?.[0];
        return (
          <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
            <Num33 n={mark ?? i + 1} tone={tone} />
            <p className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg">
              <Text33 text={text} />
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** بطاقة زمن واحد داخل الخريطة الذهبية. */
export function TenseCard33({ tense, lines, open, onToggle }: { tense: TenseId33; lines: string[]; open: boolean; onToggle: () => void }) {
  const meta = tenseById33(tense);
  const [heading, example, translation, focus] = lines;
  const mark = (heading ?? "").match(/^[①-⑳]/)?.[0] ?? "";
  const name = (heading ?? "").replace(/^[①-⑳]\s*/, "");
  const [en, ar] = name.split(" — ");
  return (
    <article className={`overflow-hidden rounded-3xl border-2 ${TONE33[meta.tone].soft}`} data-tense-card={meta.id}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center gap-3 p-4 text-right transition ${FOCUS33}`}
      >
        <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${TONE33[meta.tone].solid} text-white`} aria-hidden="true">
          {meta.emoji}
        </span>
        <span className="min-w-0 flex-1">
          <span dir="ltr" className="font-en block text-xl font-extrabold md:text-2xl">
            {mark && <span aria-hidden="true">{mark} </span>}
            {en}
          </span>
          <span className="mt-0.5 block text-sm font-bold opacity-80">{ar}</span>
        </span>
        <span className="shrink-0 rounded-full bg-white/70 px-3 py-1 text-xs font-bold">{open ? "إغلاق" : "افتح العدسة"}</span>
      </button>
      {open && (
        <div className="space-y-2 border-t-2 border-white/60 bg-white/70 p-4">
          <p dir="ltr" className="font-en text-xl font-extrabold text-slate-900 md:text-2xl">
            {example}
          </p>
          <p className="text-base font-semibold text-slate-700">
            <Text33 text={translation ?? ""} />
          </p>
          <p className="rounded-xl bg-white px-3 py-2 text-sm font-bold">
            <Text33 text={focus ?? ""} />
          </p>
          <p dir="ltr" className="font-en text-xs font-extrabold uppercase tracking-wide opacity-70">
            {meta.formula}
          </p>
        </div>
      )}
    </article>
  );
}
