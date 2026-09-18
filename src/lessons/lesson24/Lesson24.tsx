/* ============================================================================
   الدرس 24 — QUANTITY LAB · QUANTIFIER COMMAND CENTER
   ----------------------------------------------------------------------------
   إعادة تصميم طبقة العرض فقط. كل وحدة من SOURCE_SECTIONS (64 وحدة) تُرسم كما
   هي داخل محطة العرض المناسبة لها — مع عزل كل مقطع إنجليزي LTR عبر الأنماط
   المشتركة (font-en / ltr / LatinRuns من shared/bidi). لم يُحذف أو يُختصر أي
   محتوى مصدر؛ المخططات والعدادات الإضافية طبقات تعليمية فوق النص المصدر لا
   بديل عنه.

   القواعد الحاكمة:
   - العربية RTL دائمًا، والإنجليزية LTR معزولة (لا نص مختلط داخل عقدة واحدة).
   - الاختيار محايد: لا ✓/✕ ولا كشف إجابات قبل «تحقق من الإجابات»، ثم يعمل
     ↺ إعادة.
   - لا يُعاد تصميم FinalQuiz المشترك؛ فقط يُستدعى كما هو (12 سؤالًا).
   ==========================================================================*/
import { useMemo, useState, type ReactNode } from "react";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";
import { Signature, SignatureGhost } from "../../shared/Signature";
import {
  SOURCE_SECTIONS,
  LESSON_TITLE_24,
  TRAINING1,
  TRAINING2,
  TRAINING3,
  TRAINING4,
  TRAINING5,
  DETECTIVE,
  IQ200,
  MEANING,
  MINI_TEST,
  type SourceSection,
} from "./data";

type Props = { onExit: () => void };

/* ---------------------------------------------------------------------------
   أدوات الاتجاه (bidi) — نفس نمط الدروس الأقوى
   --------------------------------------------------------------------------*/
const AR_CHARS = "\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF";
const HAS_AR = new RegExp(`[${AR_CHARS}]`);
const HAS_LATIN = /[A-Za-z]/;
/** سطر إنجليزي كامل يتبعه ترجمة عربية داخل السطر نفسه (نمط مختبر اللغة). */
const EN_THEN_AR = new RegExp(
  "^([A-Za-z][A-Za-z0-9 .,!?:;'\\u2019\\u201C\\u201D()\\[\\]\\-\\u2014\\u00B7/=]*?[.!\\u2026\\uFF1F])\\s+(?=[\\u0600-\\u06FF])"
);

function En({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <LatinRuns text={text} />
    </span>
  );
}

function LtrRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className={`ltr-row flex flex-wrap items-center gap-2 ${className}`}>
      {children}
    </div>
  );
}

function splitList(s: string): string[] {
  return s
    .split(/\s*\/\s*/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/* ---------------------------------------------------------------------------
   نظام النغمات البصرية (كل صف Tailwind حرفي حتى يلتقطه编译器)
   --------------------------------------------------------------------------*/
const TONES = {
  slate: { card: "border-slate-200 bg-white", soft: "border-slate-200 bg-slate-50/80", head: "text-slate-900", chip: "bg-slate-900 text-white", btn: "bg-slate-800 hover:bg-slate-900", example: "border-slate-200 bg-white text-slate-900", tag: "bg-slate-100 text-slate-800" },
  cyan: { card: "border-cyan-200 bg-cyan-50/50", soft: "border-cyan-100 bg-white", head: "text-cyan-950", chip: "bg-cyan-800 text-white", btn: "bg-cyan-700 hover:bg-cyan-800", example: "border-cyan-200 bg-cyan-50/70 text-cyan-950", tag: "bg-cyan-100 text-cyan-900" },
  sky: { card: "border-sky-200 bg-sky-50/60", soft: "border-sky-100 bg-white", head: "text-sky-950", chip: "bg-sky-700 text-white", btn: "bg-sky-700 hover:bg-sky-800", example: "border-sky-200 bg-sky-50/80 text-sky-950", tag: "bg-sky-100 text-sky-900" },
  violet: { card: "border-violet-200 bg-violet-50/60", soft: "border-violet-100 bg-white", head: "text-violet-950", chip: "bg-violet-700 text-white", btn: "bg-violet-700 hover:bg-violet-800", example: "border-violet-200 bg-violet-50/80 text-violet-950", tag: "bg-violet-100 text-violet-900" },
  indigo: { card: "border-indigo-200 bg-indigo-50/60", soft: "border-indigo-100 bg-white", head: "text-indigo-950", chip: "bg-indigo-700 text-white", btn: "bg-indigo-700 hover:bg-indigo-800", example: "border-indigo-200 bg-indigo-50/80 text-indigo-950", tag: "bg-indigo-100 text-indigo-900" },
  emerald: { card: "border-emerald-200 bg-emerald-50/60", soft: "border-emerald-100 bg-white", head: "text-emerald-950", chip: "bg-emerald-700 text-white", btn: "bg-emerald-700 hover:bg-emerald-800", example: "border-emerald-200 bg-emerald-50/80 text-emerald-950", tag: "bg-emerald-100 text-emerald-900" },
  teal: { card: "border-teal-200 bg-teal-50/60", soft: "border-teal-100 bg-white", head: "text-teal-950", chip: "bg-teal-700 text-white", btn: "bg-teal-700 hover:bg-teal-800", example: "border-teal-200 bg-teal-50/80 text-teal-950", tag: "bg-teal-100 text-teal-900" },
  amber: { card: "border-amber-200 bg-amber-50/70", soft: "border-amber-100 bg-white", head: "text-amber-950", chip: "bg-amber-600 text-white", btn: "bg-amber-600 hover:bg-amber-700", example: "border-amber-200 bg-amber-50/90 text-amber-950", tag: "bg-amber-100 text-amber-900" },
  rose: { card: "border-rose-200 bg-rose-50/60", soft: "border-rose-100 bg-white", head: "text-rose-950", chip: "bg-rose-700 text-white", btn: "bg-rose-700 hover:bg-rose-800", example: "border-rose-200 bg-rose-50/80 text-rose-950", tag: "bg-rose-100 text-rose-900" },
  gold: { card: "border-yellow-300 bg-gradient-to-l from-yellow-50 via-amber-50/70 to-white", soft: "border-yellow-200 bg-white", head: "text-amber-900", chip: "bg-yellow-500 text-amber-950", btn: "bg-yellow-500 hover:bg-yellow-600", example: "border-yellow-200 bg-white text-amber-900", tag: "bg-yellow-100 text-amber-900" },
} as const;
type Tone = keyof typeof TONES;

/* ---------------------------------------------------------------------------
   سجل المصدر — كل وحدة تُرسم مرة واحدة داخل محطتها، وعلى كل واحدة علامة
   data-source-section مرقمة (01..64) ليُتحقق منها على مستوى العرض الفعلي.
   --------------------------------------------------------------------------*/
type UnitRef = { s: SourceSection; index: number };
const UNIT_INDEX: Record<string, UnitRef> = Object.fromEntries(
  SOURCE_SECTIONS.map((s, i) => [s.id, { s, index: i }] as const)
);
function unitOf(id: string): UnitRef {
  const r = UNIT_INDEX[id];
  if (!r) throw new Error(`Lesson24: missing source unit "${id}"`);
  return r;
}

/* ---------------- سطر مصدر واحد — يُصنَّف ثم يُعرض بالاتجاه الصحيح --------- */
function BodyLine({ line, tone, prevWasEnglish }: { line: string; tone: Tone; prevWasEnglish: boolean }) {
  const text = line.trim();
  if (!text) return null;
  const t = TONES[tone];

  // سطر إنجليزي خالص + ترجمة عربية في السطر نفسه (نمط مختبر اللغة):
  // نفصلهما إلى بطاقة مثال LTR + سطر ترجمة RTL بدل خلطهما.
  const pair = text.match(EN_THEN_AR);
  if (pair) {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-slate-100 bg-white">
        <div dir="ltr" style={{ direction: "ltr" }} className={`ltr-row border-b-2 px-3 py-1.5 ${t.example}`}>
          <En className="block text-left text-base font-black md:text-[17px]">{pair[1]}</En>
        </div>
        <div dir="rtl" className="px-3 py-1 text-[13px] font-bold text-slate-500">
          <LatinRuns text={text.slice(pair[1].length).trim()} />
        </div>
      </div>
    );
  }

  // سطر إنجليزي خالص → كبسولات / بطاقة مثال (LTR منعزل دائمًا)
  if (!HAS_AR.test(text) && HAS_LATIN.test(text)) {
    // سطر إنجليزي خالص → كبسولات تحفظ فواصل المصدر (':' '=' '/') حرفيًا،
    // فيبقى النص المعروض مطابقًا للسطر المصدري رمزًا رمزًا.
    const def = text.match(/^([A-Za-z][A-Za-z0-9 .,;:’'()\-/]*?)\s*([:=])\s*(.+)$/);
    const chip = (c: string, i: number) => (
      <En key={"c" + i} className="rounded-xl border-2 border-slate-100 bg-white px-2.5 py-1 text-[13px] font-black text-slate-800 shadow-sm">
        {c}
      </En>
    );
    const slashPills = (body: string) => {
      const segs = body.split(/\s*\/\s*/);
      const nodes: ReactNode[] = [];
      segs.forEach((seg, i) => {
        if (!seg.trim()) return;
        if (nodes.length > 0) nodes.push(<span key={"s" + i} className="font-en text-[13px] font-black text-slate-400">/</span>);
        nodes.push(chip(seg.trim(), i));
      });
      return nodes;
    };
    if (def && !HAS_AR.test(def[1])) {
      return (
        <LtrRow className="gap-1.5">
          <En className={"rounded-lg px-2 py-0.5 text-[11px] font-black tracking-wide " + t.tag}>{def[1]}</En>
          <span className="font-en text-xs font-black text-slate-400">{def[2]}</span>
          {slashPills(def[3])}
        </LtrRow>
      );
    }
    const isSentence = /[.!?؟…]$/.test(text);
    if (text.includes("/") && !isSentence) {
      return <LtrRow className="gap-1.5">{slashPills(text)}</LtrRow>;
    }    if (isSentence) {
      return (
        <div dir="ltr" style={{ direction: "ltr" }} className={`ltr-row rounded-2xl border-2 px-3 py-2 ${t.example}`}>
          <En className="block text-left text-base font-black md:text-[17px]">{text}</En>
        </div>
      );
    }
    return (
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row">
        <En className="text-[15px] font-black text-slate-800">{text}</En>
      </div>
    );
  }

  // سطر عربي خالص — ترجمة تابعة لسطر إنجليزي سابق؟
  if (!HAS_LATIN.test(text)) {
    const lead = /^(⭐|🚨|⚠️|❗|🔥|🎯)\s*/.exec(text);
    if (lead) {
      return (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[13px] font-black leading-6 text-amber-900">
          <span aria-hidden>{lead[1].trim()}</span>
          <span>{text.slice(lead[0].length).trim()}</span>
        </div>
      );
    }
    if (prevWasEnglish) {
      return (
        <p className="-mt-1 pe-2 text-[13px] font-bold italic leading-6 text-slate-500">{text}</p>
      );
    }
    return (
      <p className="text-sm font-bold leading-7 text-slate-700 md:text-[15px] md:leading-8">{text}</p>
    );
  }

  /* ==== معالجات بنيوية للسطور المختلطة — عزل المصطلح وتجميل القراءة ==== */

  // (أ) مصطلح لاتيني = شرح عربي → صف تعريف بمفتاح LTR معزول
  const defLine = text.match(/^([A-Za-z][A-Za-z0-9 .,;'\u2019\-]*?)\s*(=|→)\s*(?=[\u0600-\u06FF])/);
  if (defLine) {
    const tail = text.slice(defLine[0].length).trim();
    return (
      <div dir="rtl" className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl px-1 py-0.5">
        <En className={`rounded-lg px-2 py-0.5 text-[13px] font-black ${t.tag}`}>{defLine[1]}</En>
        <span className="font-en text-xs font-black text-slate-400">{defLine[2]}</span>
        <span className="text-sm font-bold leading-7 text-slate-700 md:text-[15px]"><LatinRuns text={tail} /></span>
      </div>
    );
  }

  // (ب) مقدمة عربية «:» ثم قائمة لاتينية « / » → عنوان فوق صف كبسولات LTR
  const labelList = text.match(/^(?:⭐|🚨|🎯|🔥)?\s*([\u0600-\u06FF][^:؛]*?:)\s*(.+)$/);
  if (labelList && !HAS_AR.test(labelList[2]) && HAS_LATIN.test(labelList[2]) && labelList[2].includes("/")) {
    return (
      <div dir="rtl" className="rounded-xl bg-white/60 px-2.5 py-2">
        <div className="text-[13px] font-black text-slate-500"><LatinRuns text={labelList[1]} /></div>
        <LtrRow className="mt-1.5 gap-1.5">
          {mixPills(labelList[2].trim(), "rounded-lg border-2 border-slate-100 bg-white px-2.5 py-0.5 text-[13px] font-black text-slate-800 shadow-sm")}
        </LtrRow>
      </div>
    );
  }

  // (ج) مقاطع مفصولة بـ«؛» تبدأ كلها بمصطلح لاتيني → شرائط مقارنة مقروءة
  if (text.includes("؛")) {
    const chunks = text.split("؛").map((c) => c.trim()).filter(Boolean);
    if (chunks.length >= 3 && chunks.every((c) => /^[A-Za-z]/.test(c))) {
      return (
        <div dir="rtl" className="flex flex-wrap items-stretch gap-1.5">
          {chunks.map((c, i) => {
            const cm = c.match(/^([A-Za-z][A-Za-z0-9 .']*?)\s*(→|=)\s*(.+)$/);
            return (
              <span key={i} className="flex items-center gap-1.5">
                <span className="rounded-lg border-2 border-slate-200 bg-white px-2 py-1 shadow-sm">
                  {cm ? (
                    <span className="flex flex-wrap items-center gap-1.5">
                      <En className="text-[12.5px] font-black text-slate-900">{cm[1]}</En>
                      <span className="font-en text-[11px] font-black text-slate-400">{cm[2]}</span>
                      <Rich text={cm[3]} className="text-[12.5px] font-black text-slate-700" />
                    </span>
                  ) : (
                    <En className="text-[12.5px] font-black text-slate-900">{c}</En>
                  )}
                </span>
                {i < chunks.length - 1 && <span className="text-[11px] font-black text-slate-300">؛</span>}
              </span>
            );
          })}
        </div>
      );
    }
  }

  // سطر مختلط عربي/إنجليزي → RTL مع عزل كل مقطع لاتيني (LatinRuns)
  const isWarn = /(خطأ|لا تقل|لا تعتقد|انتبه|حذار|❌)/.test(text);
  const isStar = text.startsWith("\u2B50") || text.startsWith("\uD83C\uDFAF");
  return (
    <div
      dir="rtl"
      className={`rounded-xl px-2.5 py-1.5 text-sm font-bold leading-7 md:text-[15px] md:leading-8 ${
        isWarn ? "border border-rose-200 bg-rose-50 text-rose-900" : isStar ? "border border-amber-200 bg-amber-50 text-amber-950" : "text-slate-700"
      }`}
    >
      <LatinRuns text={text} />
    </div>
  );
}

function BodyLines({ body, tone }: { body: string; tone: Tone }) {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <BodyLine
          key={i}
          line={line}
          tone={tone}
          prevWasEnglish={i > 0 && !HAS_AR.test(lines[i - 1]) && HAS_LATIN.test(lines[i - 1])}
        />
      ))}
    </div>
  );
}

function mixPills(body: string, pillCls: string, sep = "/") {
  const segs = body.split(/\s*\/\s*/);
  const nodes: ReactNode[] = [];
  segs.forEach((seg, i) => {
    if (!seg.trim()) return;
    if (nodes.length > 0) nodes.push(<span key={"ms" + i} className="font-en text-[12px] font-black text-slate-400">{sep}</span>);
    nodes.push(<En key={"mc" + i} className={pillCls}>{seg.trim()}</En>);
  });
  return nodes;
}

/** بطاقة وحدة مصدر واحدة — العلامة المرقمة تُستعمل في تدقيق العرض. */
function SourceUnit({ u, tone = "slate", bare = false, note }: { u: UnitRef; tone?: Tone; bare?: boolean; note?: ReactNode }) {
  const t = TONES[tone];
  return (
    <article dir="rtl" data-source-section={String(u.index + 1)} className={`rounded-2xl border-2 p-3.5 md:p-4 ${bare ? t.soft : `${t.card} shadow-sm`}`}>
      <div className="flex flex-wrap items-center gap-2">
        <En className={`rounded-full px-2.5 py-0.5 text-[10px] font-black tracking-[0.18em] ${t.chip}`}>SOURCE {String(u.index + 1).padStart(2, "0")}</En>
        <h3 className={`font-head text-base font-black leading-6 md:text-lg ${t.head}`}>
          <LatinRuns text={u.s.title} />
        </h3>
      </div>
      <div className="mt-2.5">
        <BodyLines body={u.s.body} tone={tone} />
      </div>
      {note}
    </article>
  );
}

/* ---------------------------------------------------------------------------
   هيكل المناطق (Zones) — كل منطقة بهوية بصرية مختلفة
   --------------------------------------------------------------------------*/
function Zone({
  id,
  emoji,
  en,
  ar,
  blurb,
  tone,
  children,
}: {
  id: string;
  emoji: string;
  en: string;
  ar: string;
  blurb?: string;
  tone: keyof typeof ZONE_BG;
  children: ReactNode;
}) {
  const z = ZONE_BG[tone];
  return (
    <section id={`zone-${id}`} className="mt-8 scroll-mt-24 md:mt-10">
      <div className={`relative overflow-hidden rounded-[1.75rem] border-2 p-4 md:p-6 ${z.frame}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-2xl shadow-sm ${z.badge}`} aria-hidden>
            {emoji}
          </span>
          <En className={`rounded-xl px-3 py-1 text-[12px] font-black uppercase tracking-[0.22em] ${z.label}`}>{en}</En>
          <h2 className={`font-head text-xl font-black leading-7 md:text-2xl ${z.title}`}><LatinRuns text={ar} /></h2>
        </div>
        {blurb && (
          <p className={`mt-2 text-sm font-bold leading-7 md:text-[15px] ${z.blurb}`}>
            <LatinRuns text={blurb} />
          </p>
        )}
        <div className="mt-5 space-y-4">{children}</div>
      </div>
    </section>
  );
}

const ZONE_BG = {
  slate: { frame: "border-slate-200 bg-white/90", badge: "bg-slate-100", label: "bg-slate-900 text-white", title: "text-slate-900", blurb: "text-slate-600" },
  cyan: { frame: "border-cyan-200/80 bg-gradient-to-l from-cyan-50/90 via-white to-sky-50/80", badge: "bg-cyan-100", label: "bg-cyan-800 text-white", title: "text-cyan-950", blurb: "text-cyan-900/70" },
  indigo: { frame: "border-indigo-200/80 bg-gradient-to-l from-indigo-50/90 via-white to-violet-50/70", badge: "bg-indigo-100", label: "bg-indigo-700 text-white", title: "text-indigo-950", blurb: "text-indigo-900/70" },
  teal: { frame: "border-teal-200/80 bg-gradient-to-l from-teal-50/80 via-white to-emerald-50/70", badge: "bg-teal-100", label: "bg-teal-700 text-white", title: "text-teal-950", blurb: "text-teal-900/70" },
  sky: { frame: "border-sky-200/80 bg-gradient-to-l from-sky-50/90 via-white to-cyan-50/70", badge: "bg-sky-100", label: "bg-sky-700 text-white", title: "text-sky-950", blurb: "text-sky-900/70" },
  violet: { frame: "border-violet-200/80 bg-gradient-to-l from-violet-50/90 via-white to-fuchsia-50/60", badge: "bg-violet-100", label: "bg-violet-700 text-white", title: "text-violet-950", blurb: "text-violet-900/70" },
  emerald: { frame: "border-emerald-200/80 bg-gradient-to-l from-emerald-50/80 via-white to-teal-50/70", badge: "bg-emerald-100", label: "bg-emerald-700 text-white", title: "text-emerald-950", blurb: "text-emerald-900/70" },
  amber: { frame: "border-amber-200/90 bg-gradient-to-l from-amber-50/90 via-white to-orange-50/70", badge: "bg-amber-100", label: "bg-amber-600 text-white", title: "text-amber-950", blurb: "text-amber-900/80" },
  rose: { frame: "border-rose-200/80 bg-gradient-to-l from-rose-50/80 via-white to-amber-50/60", badge: "bg-rose-100", label: "bg-rose-700 text-white", title: "text-rose-950", blurb: "text-rose-900/70" },
} as const;

/* ---------------------------------------------------------------------------
   واجهة التصفح بين المحطات (sticky)
   --------------------------------------------------------------------------*/
const NAV: { id: string; label: string }[] = [
  { id: "zone-opening", label: "\uD83D\uDEAA الافتتاح" },
  { id: "zone-command", label: "\uD83C\uDF9B️ غرفة القيادة" },
  { id: "zone-map", label: "\uD83D\uDDFA️ خريطة أدوات الكمية" },
  { id: "zone-some", label: "\uD83E\uDDEA مختبر some" },
  { id: "zone-any", label: "\uD83E\uDEE7 مختبر any" },
  { id: "zone-manymuch", label: "\u2696️ MANY مقابل MUCH" },
  { id: "zone-few", label: "\uD83D\uDCCF موازين a few / few" },
  { id: "zone-there", label: "\uD83E\uDD16 آلة There is / are" },
  { id: "zone-training", label: "\uD83C\uDFAF محطات التدريب" },
  { id: "zone-analysis", label: "\uD83D\uDD75️ التحليل والمختبر" },
  { id: "zone-boss", label: "\uD83C\uDFC6 المهمة النهائية" },
  { id: "zone-quiz", label: "\uD83D\uDCDD الاختبار النهائي" },
];

function scrollToZone(id: string) {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ZoneNav() {
  return (
    <nav dir="rtl" className="sticky top-0 z-30 border-b border-slate-900/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1.5 px-3 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-slate-900 text-sm shadow-sm" aria-hidden>
          {"\uD83E\uDDEA"}
        </span>
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => scrollToZone(n.id)}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-black text-slate-600 shadow-sm transition hover:border-cyan-500 hover:text-cyan-800 md:text-xs"
          >
            <LatinRuns text={n.label} />
          </button>
        ))}
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-black tracking-widest text-slate-500">
          64 SOURCE UNITS
        </span>
      </div>
    </nav>
  );
}

/* ---------------------------------------------------------------------------
   البوابة — HERO: هوية المختبر + جسر من الدرس 23 إلى غرفة القيادة
   --------------------------------------------------------------------------*/
function BridgeCard({
  side,
  emoji,
  head,
  chips,
  tag,
}: {
  side: "past" | "now";
  emoji: string;
  head: ReactNode;
  chips: string[];
  tag: string;
}) {
  return (
    <div
      className={`flex-1 rounded-2xl border-2 p-4 ${
        side === "past" ? "border-white/15 bg-white/10" : "border-cyan-300/40 bg-cyan-400/15"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`grid h-10 w-10 place-items-center rounded-2xl text-2xl ${side === "past" ? "bg-white/15" : "bg-cyan-400/30 anim-float"}`} aria-hidden>
          {emoji}
        </span>
        <div className="min-w-0 text-sm font-black text-white md:text-base">{head}</div>
      </div>
      <LtrRow className="mt-3 gap-1.5">
        {chips.map((c) => (
          <En key={c} className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-black text-white ring-1 ring-white/20">
            {c}
          </En>
        ))}
      </LtrRow>
      <p className="mt-2.5 text-xs font-bold leading-6 text-cyan-50/90 md:text-sm">
        <Rich text={tag} />
      </p>
    </div>
  );
}

function Hero({ onExit }: { onExit: () => void }) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border-2 border-cyan-900/40 bg-gradient-to-br from-slate-950 via-cyan-950 to-indigo-950 p-5 text-white shadow-2xl md:p-10">
      {/* شبكة المختبر الخلفية */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onExit}
            className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-black text-cyan-50 shadow transition hover:bg-white/20"
          >
            ← العودة للدروس
          </button>
          <LtrRow className="gap-2">
            <En className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.24em] text-cyan-100">
              ENGLISHWITHSOMER
            </En>
            <En className="rounded-full bg-cyan-400/20 px-3 py-1 text-[10px] font-black tracking-[0.24em] text-cyan-200 ring-1 ring-cyan-300/40">
              QUANTITY LAB
            </En>
          </LtrRow>
        </div>

        <div className="mt-6 flex flex-wrap items-start gap-x-6 gap-y-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl bg-white/15 text-4xl ring-4 ring-white/20 anim-bob" aria-hidden>
            {"\uD83E\uDDEA"}
          </div>
          <div className="min-w-0 flex-1">
            <div dir="ltr" className="ltr-row">
              <En className="inline-block rounded-xl bg-cyan-400/20 px-3 py-1 text-[11px] font-black uppercase tracking-[0.3em] text-cyan-200 ring-1 ring-cyan-300/40">
                Quantifier Command Center
              </En>
            </div>
            <h1 className="font-head mt-3 text-2xl font-black leading-snug md:text-[2.6rem] md:leading-tight">
              <LatinRuns text={LESSON_TITLE_24} />
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-bold leading-7 text-cyan-50/95 md:text-base md:leading-8">
              الدرس 23 علّمك أن تصنّف الأسماء: معدود أم غير معدود. في مختبر الكمية تنتقل إلى القرار الأصعب:
              أي أداة كمية أختار؟ وكيف يتغيّر معنى الجملة عندما تتغيّر الأداة؟
            </p>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3">
              <En className="inline-block rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[12px] font-black tracking-wide text-cyan-100">
                Which quantity tool should I choose? Decide by noun type · amount idea · sentence type · meaning
              </En>
            </div>
          </div>
        </div>

        {/* جسر الدرس 23 ← الدرس 24 */}
        <div dir="rtl" className="mt-6 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
          <BridgeCard
            side="past"
            emoji={"\uD83E\uDDEE"}
            head={<Rich text="الدرس 23 · مختبر العدّ" />}
            chips={["Countable", "Uncountable", "How many?", "How much?"]}
            tag="عرفتَ نوع الاسم — وأصبحت السؤال «كمية؟» قابلة للقياس."
          />
          <div dir="ltr" className="ltr-row flex shrink-0 items-center justify-center" aria-hidden>
            <En className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-xl font-black text-cyan-200 ring-2 ring-white/25">←</En>
          </div>
          <BridgeCard
            side="now"
            emoji={"\uD83E\uDDEA"}
            head={<Rich text="الدرس 24 · مختبر الكمية" />}
            chips={["some", "any", "many", "much", "a lot of", "a few / few", "a little / little"]}
            tag="الآن تختار الأداة نفسها: نفس الشيء، أدوات مختلفة، ومعانٍ مختلفة تمامًا."
          />
        </div>

        {/* شريط أدوات الكمية — إنجليزية LTR كاملة */}
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-6 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-center">
          <En className="block text-sm font-black leading-7 tracking-wide text-cyan-100 md:text-lg">
            some / any / much / many / a lot of / lots of / a few / few / a little / little
          </En>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={() => scrollToZone("zone-opening")} className="rounded-xl bg-white px-4 py-2 text-sm font-black text-slate-900 shadow transition hover:bg-cyan-50">
            🚀 ابدأ من الافتتاح
          </button>
          <button type="button" onClick={() => scrollToZone("zone-command")} className="rounded-xl bg-cyan-500/90 px-4 py-2 text-sm font-black text-slate-950 shadow transition hover:bg-cyan-400">
            🎛️ ادخل غرفة القيادة
          </button>
          <button type="button" onClick={() => scrollToZone("zone-boss")} className="rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/20">
            🏆 المهمة النهائية
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------------------
   غرفة القيادة — أربع بطاقات قرار مستقلة
   --------------------------------------------------------------------------*/
const COMMAND_STATIONS: { no: string; emoji: string; ar: string; en: string; opts: string[]; note: string }[] = [
  { no: "01", emoji: "\uD83E\uDDEC", ar: "ما نوع الاسم؟", en: "NOUN TYPE", opts: ["Countable", "Uncountable"], note: "معدود يقبل العدد أمامه (books) أم مقدار لا يقبله (water)؟" },
  { no: "02", emoji: "\uD83D\uDD22", ar: "ما فكرة الكمية؟", en: "QUANTITY IDEA", opts: ["number", "amount"], note: "عددٌ لأشياء تُعَدّ واحدةً واحدة، ومقدارٌ لمادة واحدة متصلة." },
  { no: "03", emoji: "\uD83D\uDEA6", ar: "ما نوع الجملة؟", en: "SENTENCE TYPE", opts: ["Positive", "Negative", "Question"], note: "نفس الأداة تغيّر مكانها وشكلها مع نوع الجملة." },
  { no: "04", emoji: "\uD83E\uDDED", ar: "ما المعنى الذي أريده؟", en: "MEANING", opts: ["neutral", "sufficient / positive", "shortage / limited"], note: "هنا يظهر سرّ حرف a: القليل قد يكون كافيًا... أو نقصًا." },
];

function CommandConsole() {
  return (
    <div dir="rtl" className="grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {COMMAND_STATIONS.map((st) => (
        <div key={st.no} className="relative overflow-hidden rounded-2xl border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/90 via-white to-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <En className="grid h-8 w-8 place-items-center rounded-xl bg-indigo-700 text-xs font-black text-white shadow">{st.no}</En>
            <span className="text-xl" aria-hidden>{st.emoji}</span>
            <En className="ms-auto rounded-lg bg-slate-900 px-2 py-0.5 text-[10px] font-black tracking-[0.18em] text-white">{st.en}</En>
          </div>
          <h4 className="font-head mt-3 text-base font-black text-indigo-950">{st.ar}</h4>
          <LtrRow className="mt-2.5 gap-1.5">
            {st.opts.map((o) => (
              <En key={o} className="rounded-xl border-2 border-indigo-200 bg-white px-2.5 py-1 text-[13px] font-black text-indigo-900 shadow-sm">
                {o}
              </En>
            ))}
          </LtrRow>
          <p className="mt-2.5 text-[12.5px] font-bold leading-6 text-slate-600">
            <Rich text={st.note} />
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   خريطة أدوات الكمية (طبقة إضافية فوق وحدتَي map و full-map)
   --------------------------------------------------------------------------*/
function MapColumn({
  head,
  en,
  tone,
  chips,
}: {
  head: string;
  en: string;
  tone: "emerald" | "violet";
  chips: { label: string; shared: boolean }[];
}) {
  const frame = tone === "emerald" ? "border-emerald-300 bg-emerald-50/70" : "border-violet-300 bg-violet-50/70";
  const title = tone === "emerald" ? "text-emerald-900" : "text-violet-900";
  return (
    <div className={`rounded-2xl border-2 p-3 ${frame}`}>
      <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-white/70 px-2 py-1.5">
        <h4 className={`font-head text-sm font-black ${title}`}>{head}</h4>
        <En className={`rounded-lg px-2 py-0.5 text-[10px] font-black tracking-[0.14em] ${tone === "emerald" ? "bg-emerald-700 text-white" : "bg-violet-700 text-white"}`}>
          {en}
        </En>
      </div>
      <LtrRow className="mt-2.5 justify-center gap-1.5">
        {chips.map((c, i) => (
          <En
            key={`${c.label}-${i}`}
            className={`rounded-xl px-2.5 py-1 text-[13px] font-black shadow-sm ring-2 ${
              c.shared ? "bg-slate-900 text-white ring-cyan-300/50" : `bg-white text-slate-900 ring-white`
            }`}
          >
            {c.label}
          </En>
        ))}
      </LtrRow>
    </div>
  );
}

function QuantifierMapDiagram() {
  const shared = [
    { label: "some", shared: true },
    { label: "any", shared: true },
    { label: "a lot of", shared: true },
    { label: "lots of", shared: true },
  ];
  return (
    <div dir="rtl" className="rounded-[1.5rem] border-2 border-slate-300 bg-[linear-gradient(160deg,#0f172a_0%,#12233f_60%,#0b3a45_100%)] p-4 shadow-xl md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <LtrRow className="gap-2">
          <span className="text-xl" aria-hidden>{"\uD83D\uDDFA️"}</span>
          <En className="rounded-lg bg-cyan-400/20 px-3 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-cyan-200 ring-1 ring-cyan-300/40">
            Quantifier Map
          </En>
        </LtrRow>
        <span className="text-[11px] font-black text-cyan-100/80">الشريط الداكن = أداة تعمل مع النوعين</span>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <MapColumn
          head="للمعدود الجمع"
          en="Countable Plural"
          tone="emerald"
          chips={[{ label: "many", shared: false }, { label: "a few", shared: false }, { label: "few", shared: false }, ...shared]}
        />
        <div className="hidden flex-col items-center justify-center gap-1 lg:flex" aria-hidden>
          <En className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-lg text-cyan-200 ring-1 ring-white/25">⇄</En>
          <En className="rounded-lg bg-white/10 px-2 py-0.5 text-[10px] font-black tracking-widest text-cyan-100">SHARED</En>
        </div>
        <MapColumn
          head="لغير المعدود"
          en="Uncountable"
          tone="violet"
          chips={[{ label: "much", shared: false }, { label: "a little", shared: false }, { label: "little", shared: false }, ...shared]}
        />
      </div>
      <p className="mt-3 text-center text-[12px] font-bold leading-6 text-cyan-50/80">
        <Rich text="اقرأ الخريطة من اليمين: نوع الاسم أولًا، ثم الأداة. الأدوات الداكنة تتنقل بين العمودين دون إذن." />
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   حسّاس الوقت — الحالة الخاصة time
   --------------------------------------------------------------------------*/
function TimeSensor() {
  return (
    <div dir="rtl" className="rounded-2xl border-2 border-dashed border-amber-400 bg-gradient-to-l from-amber-100/80 via-amber-50 to-orange-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-500 text-xl shadow-sm anim-wiggle" aria-hidden>⏱</span>
        <En className="rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-black tracking-[0.22em] text-white">TIME SENSOR</En>
        <h4 className="font-head text-sm font-black text-amber-950">حالة خاصة: كلمة time لها وجهان</h4>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border-2 border-white bg-white/80 p-3">
          <LtrRow className="justify-center">
            <En className="rounded-xl bg-violet-600 px-3 py-1.5 text-base font-black text-white shadow">How much time?</En>
          </LtrRow>
          <p className="mt-2 text-center text-[12.5px] font-black text-slate-700">
            وقت ككمية واحدة <En className="rounded bg-violet-100 px-1.5 py-0.5 text-[11px] font-black text-violet-800">Uncountable</En>
          </p>
        </div>
        <div className="rounded-xl border-2 border-white bg-white/80 p-3">
          <LtrRow className="justify-center">
            <En className="rounded-xl bg-emerald-600 px-3 py-1.5 text-base font-black text-white shadow">three times</En>
          </LtrRow>
          <p className="mt-2 text-center text-[12.5px] font-black text-slate-700">
            مرات متكررة تُعَدّ <En className="rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-black text-emerald-800">Countable</En>
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-[12px] font-bold leading-6 text-amber-900">
        <Rich text="لا تعامل كل استخدام لـ time ككمية غير معدودة تلقائيًا — المعنى هو الحكم." />
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ميزان المعنى — a few / few و a little / little
   --------------------------------------------------------------------------*/
function MeaningMeter({
  en,
  ar,
  percent,
  tone,
  mood,
  caption,
}: {
  en: string;
  ar: string;
  percent: number;
  tone: "emerald" | "rose" | "amber";
  mood: string;
  caption: string;
}) {
  const fill = tone === "emerald" ? "bg-gradient-to-l from-emerald-400 to-emerald-600" : tone === "rose" ? "bg-gradient-to-l from-rose-300 to-rose-500" : "bg-gradient-to-l from-amber-300 to-amber-500";
  const ring = tone === "emerald" ? "border-emerald-300 bg-white" : tone === "rose" ? "border-rose-300 bg-white" : "border-amber-300 bg-white";
  return (
    <div dir="rtl" className={`rounded-2xl border-2 p-3.5 ${ring}`}>
      <div className="flex items-center justify-between gap-2">
        <En className="rounded-lg bg-slate-900 px-2.5 py-1 text-sm font-black text-white">{en}</En>
        <span className="text-xl" aria-hidden>{mood}</span>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 h-4 w-full overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
        <div className={`h-full rounded-full ${fill} transition-all`} style={{ width: `${percent}%` }} />
      </div>
      <LtrRow className="mt-1.5 justify-between text-[10px] font-black text-slate-400">
        <En>0 — shortage</En>
        <En>exists / sufficient</En>
      </LtrRow>
      <p className="mt-2 text-[13px] font-black leading-6 text-slate-800">{ar}</p>
      <p className="mt-1 text-[11.5px] font-bold leading-5 text-slate-500">
        <Rich text={caption} />
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   لوحة مقارنة ثنائية عامة (MANY vs MUCH — a lot of vs lots of — ...)
   --------------------------------------------------------------------------*/
function VsBoard({
  left,
  right,
  vs,
  foot,
}: {
  left: { en: string; ar: string; tone: "emerald" | "sky" | "teal" | "violet"; badge: string; examples: string[] };
  right: { en: string; ar: string; tone: "violet" | "rose" | "indigo" | "amber"; badge: string; examples: string[] };
  vs?: string;
  foot?: string;
}) {
  const side = (s: typeof left, toneKey: string) => {
    const ring =
      toneKey === "emerald" ? "border-emerald-300 bg-emerald-50/80" :
      toneKey === "sky" ? "border-sky-300 bg-sky-50/80" :
      toneKey === "teal" ? "border-teal-300 bg-teal-50/80" :
      toneKey === "amber" ? "border-amber-300 bg-amber-50/80" :
      toneKey === "indigo" ? "border-indigo-300 bg-indigo-50/80" :
      toneKey === "rose" ? "border-rose-300 bg-rose-50/80" : "border-violet-300 bg-violet-50/80";
    const head =
      toneKey === "emerald" ? "bg-emerald-700" :
      toneKey === "sky" ? "bg-sky-700" :
      toneKey === "teal" ? "bg-teal-700" :
      toneKey === "amber" ? "bg-amber-600" :
      toneKey === "indigo" ? "bg-indigo-700" :
      toneKey === "rose" ? "bg-rose-700" : "bg-violet-700";
    return (
      <div className={`rounded-2xl border-2 p-3.5 ${ring}`}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <En className={`rounded-xl px-3 py-1 text-lg font-black text-white shadow ${head}`}>{s.en}</En>
          <En className="rounded-lg border-2 border-white bg-white px-2 py-0.5 text-[10px] font-black tracking-[0.14em] text-slate-600">{s.badge}</En>
        </div>
        <p className="mt-2 text-center text-[13px] font-black text-slate-800">{s.ar}</p>
        <LtrRow className="mt-3 justify-center gap-1.5">
          {s.examples.map((e, i) => (
            <En key={`${e}-${i}`} className="rounded-xl border-2 border-white bg-white px-2.5 py-1 text-[13px] font-black text-slate-900 shadow-sm">
              {e}
            </En>
          ))}
        </LtrRow>
      </div>
    );
  };
  return (
    <div dir="rtl" className="relative grid gap-3 md:grid-cols-2">
      {side(left, left.tone)}
      {side(right, right.tone)}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <En className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-slate-900 text-xs font-black text-white shadow-lg">
          {vs ?? "VS"}
        </En>
      </div>
      {foot && (
        <div className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-center text-[12.5px] font-bold leading-6 text-slate-600 md:col-span-2">
          <Rich text={foot} />
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   آلة There is / There are (طبقة إضافية فوق وحدة there)
   --------------------------------------------------------------------------*/
function ThereMachine() {
  const rails: { head: string; badge: string; tone: "violet" | "emerald"; lines: string[] }[] = [
    { head: "There is", badge: "SINGULAR / UNCOUNTABLE", tone: "violet", lines: ["There is much water.", "There is a little water.", "There is some water.", "There is a lot of water."] },
    { head: "There are", badge: "PLURAL COUNTABLE", tone: "emerald", lines: ["There are many books.", "There are a few books.", "There are some books.", "There are lots of books."] },
  ];
  return (
    <div dir="rtl" className="grid items-start gap-3 md:grid-cols-2">
      {rails.map((rail) => (
        <div key={rail.head} className={`overflow-hidden rounded-2xl border-2 ${rail.tone === "emerald" ? "border-emerald-300 bg-emerald-50/60" : "border-violet-300 bg-violet-50/60"}`}>
          <div className={`flex flex-wrap items-center justify-center gap-2.5 px-3 py-2.5 ${rail.tone === "emerald" ? "bg-emerald-700" : "bg-violet-700"}`}>
            <span className="text-lg" aria-hidden>{"\u2699️"}</span>
            <En className="text-xl font-black text-white">{rail.head}</En>
            <En className="rounded-lg bg-white/20 px-2 py-0.5 text-[10px] font-black tracking-[0.16em] text-white">{rail.badge}</En>
          </div>
          <div className="grid gap-1.5 p-3">
            {rail.lines.map((l) => (
              <div key={l} dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-xl border-2 border-white bg-white px-3 py-1.5 shadow-sm">
                <En className="text-left text-sm font-black text-slate-900 md:text-[15px]">{l}</En>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   مقياس القاعدة السريعة — اختبار 1 book (طبقة إضافية فوق battle)
   --------------------------------------------------------------------------*/
function QuickRuleScale() {
  return (
    <div dir="rtl" className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr]">
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-slate-300 bg-white p-4 text-center shadow-sm">
        <span className="text-2xl" aria-hidden>{"❓"}</span>
        <p className="mt-1.5 text-sm font-black leading-6 text-slate-800">
          <Rich text="جرّب أن تضع العدد 1 أمام الاسم" />
        </p>
        <LtrRow className="mt-2 justify-center">
          <En className="rounded-xl bg-slate-900 px-3 py-1 text-base font-black text-white">1 book?</En>
          <En className="rounded-xl bg-slate-900 px-3 py-1 text-base font-black text-white">1 water?</En>
        </LtrRow>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 md:flex-col" aria-hidden>
        <En className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-base font-black text-white shadow">→</En>
        <En className="grid h-9 w-9 place-items-center rounded-full bg-rose-500 text-base font-black text-white shadow">→</En>
      </div>
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 px-3.5 py-2.5">
          <span className="text-[12.5px] font-black text-emerald-900">نعم — معدود: استخدم a few</span>
          <En className="rounded-xl bg-white px-3 py-1 text-sm font-black text-emerald-900 shadow-sm ring-1 ring-emerald-200">a few books ✅</En>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-violet-300 bg-violet-50/80 px-3.5 py-2.5">
          <span className="text-[12.5px] font-black text-violet-900">لا — غير معدود: استخدم a little</span>
          <En className="rounded-xl bg-white px-3 py-1 text-sm font-black text-violet-900 shadow-sm ring-1 ring-violet-200">a little water ✅</En>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   كاشف المعنى — محطة تفاعلية تُعيد عرض خريطة الملخص
   --------------------------------------------------------------------------*/
const DETECTOR_TILES: { en: string; type: "Countable Plural" | "Uncountable" | "Both"; ar: string }[] = [
  { en: "many", type: "Countable Plural", ar: "كثير من الأشياء المعدودة." },
  { en: "much", type: "Uncountable", ar: "كثير من المقدار غير المعدود." },
  { en: "a few", type: "Countable Plural", ar: "عدد صغير موجود — كافٍ نسبيًا، إحساس إيجابي." },
  { en: "few", type: "Countable Plural", ar: "عدد قليل جدًا — إحساس بالنقص." },
  { en: "a little", type: "Uncountable", ar: "كمية صغيرة موجودة ومقبولة." },
  { en: "little", type: "Uncountable", ar: "كمية قليلة جدًا — غير كافية." },
  { en: "a lot of", type: "Both", ar: "الكثير — يعمل مع النوعين." },
  { en: "some", type: "Both", ar: "بعض — كمية غير محددة، أساسي في الجمل المثبتة." },
  { en: "any", type: "Both", ar: "أساسًا في السؤال والنفي (مع استثناء العروض والطلبات)." },
];

function MeaningDetector() {
  const [active, setActive] = useState(0);
  const tile = DETECTOR_TILES[active];
  return (
    <div dir="rtl" className="rounded-2xl border-2 border-slate-300 bg-gradient-to-b from-slate-50 to-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-lg shadow-sm" aria-hidden>{"\uD83D\uDD2C"}</span>
        <En className="rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-black tracking-[0.22em] text-cyan-200">MEANING DETECTOR</En>
        <span className="text-[12px] font-black text-slate-600">المس أداة — اقرأ نوعها ومعناها قبل الحفظ</span>
      </div>
      <LtrRow className="mt-3 justify-center gap-1.5">
        {DETECTOR_TILES.map((tl, i) => (
          <button
            key={tl.en}
            type="button"
            aria-pressed={active === i}
            onClick={() => setActive(i)}
            className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-black transition ${
              active === i ? "border-slate-900 bg-slate-900 text-white shadow" : "border-slate-200 bg-white text-slate-800 hover:border-slate-400"
            }`}
          >
            {tl.en}
          </button>
        ))}
      </LtrRow>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-4 py-3">
        <En className="rounded-xl bg-indigo-700 px-3 py-1 text-base font-black text-white">{tile.en}</En>
        <En
          className={`rounded-lg px-2.5 py-1 text-[11px] font-black tracking-wider text-white ${
            tile.type === "Countable Plural" ? "bg-emerald-600" : tile.type === "Uncountable" ? "bg-violet-700" : "bg-teal-600"
          }`}
        >
          {tile.type}
        </En>
        <p className="min-w-[12rem] flex-1 text-sm font-bold leading-6 text-slate-700">{tile.ar}</p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   محرك التدريب — اختيار محايد ← «تحقق من الإجابات» ← كشف ← ↺ إعادة
   --------------------------------------------------------------------------*/
function Drill({
  tag,
  items,
  opts,
  optsFor,
  correct,
  tone,
}: {
  tag: string;
  items: readonly string[];
  opts?: readonly string[];
  optsFor?: (i: number) => readonly string[];
  correct: readonly string[];
  tone: Tone;
}) {
  const [pick, setPick] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const t = TONES[tone];
  const optionsFor = (i: number) => (optsFor ? optsFor(i) : opts ?? []);
  const answered = items.filter((_, i) => pick[i] !== undefined).length;
  const done = answered === items.length;
  const score = items.reduce((n, _q, i) => n + (pick[i] === correct[i] ? 1 : 0), 0);
  const reset = () => {
    setPick({});
    setChecked(false);
  };
  return (
    <div dir="rtl" data-exercise={tag} className="mt-3 rounded-2xl border-2 border-slate-200 bg-white/85 p-3 md:p-4">
      <div className="grid items-start gap-3 lg:grid-cols-2">
        {items.map((q, i) => {
          const right = checked && pick[i] === correct[i];
          const wrong = checked && pick[i] !== correct[i];
          return (
            <div
              key={q}
              className={`rounded-2xl border-2 p-3 transition ${
                right ? "border-emerald-300 bg-emerald-50" : wrong ? "border-rose-300 bg-rose-50" : pick[i] !== undefined ? "border-slate-300 bg-slate-50/80" : "border-slate-100 bg-white"
              }`}
            >
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row items-start gap-2.5">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl text-xs font-black text-white ${right ? "bg-emerald-600" : wrong ? "bg-rose-600" : "bg-slate-900"}`}>
                  {i + 1}
                </span>
                <En className="min-w-0 flex-1 pt-1 text-left text-[15px] font-black leading-6 text-slate-900">{q}</En>
              </div>
              <LtrRow className="mt-2.5 gap-2">
                {optionsFor(i).map((o) => {
                  const sel = pick[i] === o;
                  const selClass = sel
                    ? checked
                      ? o === correct[i]
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-rose-600 bg-rose-600 text-white"
                      : "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-400";
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={sel}
                      disabled={checked}
                      onClick={() => setPick((p) => ({ ...p, [i]: o }))}
                      className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-black transition disabled:cursor-not-allowed ${selClass}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </LtrRow>
              {checked &&
                (pick[i] === correct[i] ? (
                  <div className="mt-2 text-[13px] font-black text-emerald-700">✓ صحيح!</div>
                ) : (
                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[13px] font-black text-rose-700">
                    ✕ الإجابة: <En className="rounded-lg border border-rose-200 bg-white px-2 py-0.5 text-rose-800">{correct[i]}</En>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!done || checked}
          onClick={() => setChecked(true)}
          className={`font-head rounded-xl px-5 py-2.5 text-sm font-black text-white shadow transition disabled:opacity-30 ${t.btn}`}
        >
          تحقق من الإجابات
        </button>
        {!done && !checked && (
          <span className="text-[11.5px] font-black text-slate-400">
            <LatinRuns text={`أجبت عن ${answered} / ${items.length} — أجب عن الكل لفتح زر التحقق`} />
          </span>
        )}
        {checked && (
          <>
            <En className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black tracking-wider text-white">SCORE {score} / {items.length}</En>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-300">
              ↺ إعادة
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- محطات التدريب الخمس — وحدة مصدر + تدريب تفاعلي ---------- */
const TRAINING_OPTIONS: Record<number, string[]> = {
  0: ["many", "much", "a few", "a little"],
  1: ["some", "any"],
  2: ["many", "much"],
  3: ["a few", "a little"],
  4: ["few", "a few"],
};
const TRAINING_ANSWERS: string[][] = [
  ["many", "a little", "many", "a few", "a little", "a few", "a little", "many"],
  ["some", "any", "any", "some", "any", "any", "some", "any"],
  ["many", "much", "many", "much", "much", "many", "much", "many"],
  ["a few", "a little", "a few", "a little", "a few", "a little", "a few", "a little"],
  ["a few", "few", "a few", "few", "a few", "few"],
];
const TRAINING_ITEMS: string[][] = [TRAINING1, TRAINING2, TRAINING3, TRAINING4, TRAINING5];
const TRAINING_TONES: Tone[] = ["cyan", "sky", "emerald", "teal", "rose"];

function TrainingStation({ unitId, no, kind }: { unitId: string; no: number; kind: number }) {
  const u = unitOf(unitId);
  return (
    <section dir="rtl" className="rounded-[1.5rem] border-2 border-slate-200 bg-white p-3.5 shadow-sm md:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <En className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-xs font-black text-white shadow">{String(no).padStart(2, "0")}</En>
        <div className="min-w-0 flex-1">
          <SourceUnit u={u} tone={TRAINING_TONES[kind]} bare />
        </div>
      </div>
      <Drill
        tag={`l24-training-${no + 1}`}
        items={TRAINING_ITEMS[kind]}
        opts={TRAINING_OPTIONS[kind]}
        correct={TRAINING_ANSWERS[kind]}
        tone={TRAINING_TONES[kind]}
      />
    </section>
  );
}

/* ---------------------------------------------------------------------------
   لوحات التحليل — Grammar Detective / IQ200 (علامة محايدة ثم كشف)
   --------------------------------------------------------------------------*/
function CaseBoard({
  tag,
  items,
  tone,
  correctIndex,
  note,
}: {
  tag: string;
  items: readonly string[];
  tone: Tone;
  correctIndex?: number;
  note: string;
}) {
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);
  const t = TONES[tone];
  const done = items.every((_, i) => marked[i]);
  return (
    <div dir="rtl" data-exercise={tag} className={`rounded-2xl border-2 p-3 md:p-4 ${t.soft}`}>
      <div className="grid gap-2.5 md:grid-cols-2">
        {items.map((q, i) => {
          const isRight = checked && correctIndex === i;
          return (
            <button
              key={q}
              type="button"
              aria-pressed={!!marked[i]}
              disabled={checked}
              onClick={() => setMarked((m) => ({ ...m, [i]: !m[i] }))}
              className={`rounded-xl border-2 p-3 text-right transition disabled:cursor-not-allowed ${
                isRight
                  ? "border-yellow-400 bg-gradient-to-l from-yellow-50 via-amber-50 to-white shadow-[0_0_0_3px_rgba(250,204,21,0.35)]"
                  : checked
                    ? "border-slate-200 bg-white/80"
                    : marked[i]
                      ? "border-amber-400 bg-amber-50/90 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <LtrRow className="items-start gap-2.5">
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-black ${
                    isRight ? "bg-yellow-500 text-amber-950" : marked[i] ? "bg-amber-500 text-white" : "bg-slate-900 text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <En className="min-w-0 flex-1 pt-1 text-left text-[13.5px] font-black leading-6 text-slate-900">{q}</En>
                <span className="pt-1 text-[11px] font-black text-slate-400">
                  {isRight ? <span className="text-amber-700">✓ الجملة الصحيحة</span> : marked[i] ? <span className="text-amber-600">{"\uD83D\uDD0D"}</span> : "صوّبها"}
                </span>
              </LtrRow>
            </button>
          );
        })}
      </div>
      <div className="mt-3.5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!done || checked}
          onClick={() => setChecked(true)}
          className={`font-head rounded-xl px-5 py-2.5 text-sm font-black text-white shadow transition disabled:opacity-30 ${t.btn}`}
        >
          تحقق من الإجابات
        </button>
        {!done && !checked && <span className="text-[11.5px] font-black text-slate-400">علّم كل جملة زرتَها أولًا</span>}
        {checked && (
          <button type="button" onClick={() => { setMarked({}); setChecked(false); }} className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-300">
            ↺ إعادة
          </button>
        )}
      </div>
      {checked && (
        <div className="pop mt-3 rounded-xl border-2 border-amber-300 bg-amber-50 px-3.5 py-2.5 text-[13px] font-black leading-6 text-amber-950">
          <LatinRuns text={note} />
        </div>
      )}
    </div>
  );
}

/* ---------------- كاشف المعنى — تحدّي المعنى بأربعة مواقف ---------------- */
const MEANING_SITUATIONS = ["3 كتب صغيرة لكنها جيدة", "مال قليل جدًا", "ماء قليل لكنه يكفي", "أصدقاء قليلون جدًا والشعور بالوحدة"];
const MEANING_KEYS = [1, 1, 0, 1];
const MEANING_WHYS = [
  "a few — عدد صغير موجود، والإحساس إيجابي.",
  "little — كمية قليلة جدًا مع إحساس بالنقص.",
  "a little — كمية قليلة لكنها موجودة ومفيدة.",
  "few — عدد قليل جدًا مع إحساس بالنقص.",
];

function MeaningChallenge() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const rows = MEANING.map((p) => p.split(" / "));
  const done = rows.every((_, i) => pick[i] !== undefined);
  const score = rows.reduce((n, _r, i) => n + (pick[i] === MEANING_KEYS[i] ? 1 : 0), 0);
  return (
    <div dir="rtl" data-exercise="l24-meaning" className="rounded-2xl border-2 border-indigo-300 bg-gradient-to-b from-indigo-50/70 to-white p-3 md:p-4">
      <div className="space-y-3">
        {rows.map((pair, i) => {
          const key = MEANING_KEYS[i];
          return (
            <div key={MEANING[i]} className="rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-sm">
              <div dir="rtl" className="rounded-xl border-r-4 border-indigo-400 bg-slate-50/80 px-3 py-1.5 text-[13.5px] font-bold text-slate-700">
                <span className="font-black text-indigo-800">{i + 1}. </span>
                <LatinRuns text={MEANING[i]} />
              </div>
              <p className="mt-2 text-[12.5px] font-black text-slate-500">
                المعنى المقصود: <Rich text={MEANING_SITUATIONS[i]} />
              </p>
              <LtrRow className="mt-2.5 gap-2">
                {pair.map((opt, oi) => {
                  const sel = pick[i] === oi;
                  const right = checked && sel && oi === key;
                  const wrong = checked && sel && oi !== key;
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={sel}
                      disabled={checked}
                      onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                      className={`font-en rounded-xl border-2 px-3 py-2 text-[13px] font-black transition disabled:cursor-not-allowed ${
                        right ? "border-emerald-600 bg-emerald-600 text-white" : wrong ? "border-rose-600 bg-rose-600 text-white" : sel ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-800 hover:border-indigo-400"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </LtrRow>
              {checked && (
                <div className={`mt-2 text-[12.5px] font-black ${pick[i] === key ? "text-emerald-700" : "text-rose-700"}`}>
                  {pick[i] === key ? "✓ صحيح! " : `✕ الإجابة: ${pair[key]}. `}
                  <span className="font-bold text-slate-600">{MEANING_WHYS[i]}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3.5 flex flex-wrap items-center gap-3">
        <button type="button" disabled={!done || checked} onClick={() => setChecked(true)} className="font-head rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-indigo-800 disabled:opacity-30">
          تحقق من الإجابات
        </button>
        {!done && !checked && <span className="text-[11.5px] font-black text-slate-400"><LatinRuns text={`اختر جملة لكل موقف (${rows.length - (rows.length - Object.keys(pick).length)} / ${rows.length})`} /></span>}
        {checked && (
          <>
            <En className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black tracking-wider text-white">SCORE {score} / {rows.length}</En>
            <button type="button" onClick={() => { setPick({}); setChecked(false); }} className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-300">↺ إعادة</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   الاختبار النهائي المصغر — تفاعلي بنفس السلوك المحايد
   --------------------------------------------------------------------------*/
const MINI_ROWS = MINI_TEST.map((row) => ({
  q: row[0] as string,
  opts: row[1] as readonly string[],
  correct: (row as readonly unknown[])[2] as number,
}));

function MiniTest() {
  const [pick, setPick] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const done = MINI_ROWS.every((_, i) => pick[i] !== undefined);
  const score = MINI_ROWS.reduce((n, r, i) => n + (pick[i] === r.correct ? 1 : 0), 0);
  return (
    <div dir="rtl" data-exercise="l24-mini" className="mt-3 rounded-2xl border-2 border-indigo-200 bg-white p-3 shadow-sm md:p-4">
      <div className="grid items-start gap-3 lg:grid-cols-2">
        {MINI_ROWS.map((r, i) => {
          const right = checked && pick[i] === r.correct;
          const wrong = checked && pick[i] !== undefined && pick[i] !== r.correct;
          return (
            <div key={r.q} className={`rounded-2xl border-2 p-3 transition ${right ? "border-emerald-300 bg-emerald-50" : wrong ? "border-rose-300 bg-rose-50" : "border-slate-100 bg-slate-50/60"}`}>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row items-start gap-2.5">
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-xl text-xs font-black text-white ${right ? "bg-emerald-600" : wrong ? "bg-rose-600" : "bg-indigo-700"}`}>{i + 1}</span>
                <En className="min-w-0 flex-1 pt-1 text-left text-[15px] font-black leading-6 text-slate-900">{r.q}</En>
              </div>
              <LtrRow className="mt-2.5 gap-2">
                {r.opts.map((o, oi) => {
                  const sel = pick[i] === oi;
                  return (
                    <button
                      key={o}
                      type="button"
                      aria-pressed={sel}
                      disabled={checked}
                      onClick={() => setPick((p) => ({ ...p, [i]: oi }))}
                      className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-black transition disabled:cursor-not-allowed ${
                        sel ? (checked ? (oi === r.correct ? "border-emerald-600 bg-emerald-600 text-white" : "border-rose-600 bg-rose-600 text-white") : "border-slate-900 bg-slate-900 text-white") : "border-slate-200 bg-white text-slate-800 hover:border-indigo-400"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </LtrRow>
              {checked && !right && (
                <div className="mt-2 text-[13px] font-black text-rose-700">
                  ✕ الإجابة: <En className="rounded-lg border border-rose-200 bg-white px-2 py-0.5 text-rose-800">{r.opts[r.correct]}</En>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!done || checked}
          onClick={() => setChecked(true)}
          className="font-head rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-indigo-800 disabled:opacity-30"
        >
          تحقق من الإجابات
        </button>
        {!done && !checked && <span className="text-[11.5px] font-black text-slate-400"><LatinRuns text={`أجب عن ${Object.keys(pick).length} / ${MINI_ROWS.length} أسئلة`} /></span>}
        {checked && (
          <>
            <En className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-black tracking-wider text-white">SCORE {score} / {MINI_ROWS.length}</En>
            <button type="button" onClick={() => { setPick({}); setChecked(false); }} className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-300">↺ إعادة</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   المهمة النهائية — مطعم Quantity Lab
   --------------------------------------------------------------------------*/
const BOSS_SUPPLIES = ["12 customers", "3 tables", "some rice", "some water", "2 chefs", "little time", "a lot of food", "a few empty chairs"];
const BOSS_TOOLS = ["some", "any", "many", "much", "a lot of", "a few", "little", "a little", "There is", "There are", "How many", "How much"];

function MissionDeck() {
  const [supplies, setSupplies] = useState<Record<string, boolean>>({});
  const [story, setStory] = useState("");
  const lines = story.split(/\n+/).map((l) => l.trim()).filter(Boolean).length;
  const gathered = BOSS_SUPPLIES.filter((s) => supplies[s]).length;
  return (
    <div dir="rtl" className="mt-3 overflow-hidden rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 via-orange-50/70 to-amber-50/70 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-rose-200 bg-rose-600/90 px-4 py-2.5">
        <LtrRow className="gap-2">
          <span className="text-lg" aria-hidden>{"\uD83D\uDE80"}</span>
          <En className="text-[11px] font-black uppercase tracking-[0.26em] text-white">Final Mission</En>
        </LtrRow>
        <En className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-black text-white">SUPPLIES {gathered} / {BOSS_SUPPLIES.length}</En>
      </div>
      <div className="grid gap-4 p-4 lg:grid-cols-2">
        <div>
          <h4 className="font-head text-sm font-black text-rose-950">عُدّة المطعم — علّم ما جهّزته في قصتك</h4>
          <LtrRow className="mt-2 gap-1.5">
            {BOSS_SUPPLIES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={!!supplies[s]}
                onClick={() => setSupplies((p) => ({ ...p, [s]: !p[s] }))}
                className={`font-en rounded-xl border-2 px-3 py-1.5 text-[13px] font-black shadow-sm transition ${
                  supplies[s] ? "border-emerald-600 bg-emerald-600 text-white" : "border-white bg-white text-slate-800 hover:border-rose-300"
                }`}
              >
                {s}
              </button>
            ))}
          </LtrRow>
          <h4 className="font-head mt-4 text-sm font-black text-rose-950">أدوات يجب أن تظهر في القصة</h4>
          <LtrRow className="mt-2 gap-1.5">
            {BOSS_TOOLS.map((t) => (
              <En key={t} className="rounded-lg bg-slate-900 px-2.5 py-1 text-[12px] font-black text-cyan-100">
                {t}
              </En>
            ))}
          </LtrRow>
          <p className="mt-3 rounded-xl border border-dashed border-rose-300 bg-white/70 px-3 py-2 text-[12px] font-bold leading-6 text-rose-900">
            قصة من 10 جمل إنجليزية، تستخدم كل الأدوات أعلاه مع العدد المطلوب من الزبائن والكراسي والطهاة.
          </p>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-head text-sm font-black text-rose-950">سجل المهمة — اكتب القصة</h4>
            <En className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-black text-rose-800 ring-1 ring-rose-200">LINES {lines} / 10</En>
          </div>
          <textarea
            dir="ltr"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={8}
            placeholder={"Write your 10-sentence story here.\nExample start: There are 12 customers in the restaurant..."}
            className="font-en mt-2 w-full resize-y rounded-xl border-2 border-white bg-white p-3 text-left text-sm font-bold leading-6 text-slate-800 shadow-sm outline-none transition placeholder:text-slate-300 focus:border-rose-300"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-black text-slate-400">لا يوجد تصحيح آلي — القصة تُراجَع مع المعلم في مساحة المعلم.</span>
            <button
              type="button"
              onClick={() => { setSupplies({}); setStory(""); }}
              className="rounded-xl bg-white px-4 py-1.5 text-[12.5px] font-black text-rose-700 ring-2 ring-rose-200 transition hover:bg-rose-50"
            >
              ↺ إعادة ضبط المهمة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   لوحة مفتاح الإجابات — السطور الخمسة مفكوكة إلى شرائط LTR
   --------------------------------------------------------------------------*/
function AnswerKeyBoard({ u }: { u: UnitRef }) {
  // نفصل الأسطر بـ'.' محفوظ داخل كل سطر (lookahead) ثم نعرض الشرائط بنفس فواصل المصدر
  const rows = u.s.body.split(/(?<=\.)(?=\s*Training)/).map((r) => r.trim()).filter(Boolean);
  return (
    <article dir="rtl" data-source-section={String(u.index + 1)} className="rounded-2xl border-2 border-yellow-300 bg-gradient-to-l from-yellow-50 via-amber-50/80 to-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <En className="rounded-full bg-yellow-500 px-2.5 py-0.5 text-[10px] font-black tracking-[0.18em] text-amber-950">SOURCE {String(u.index + 1).padStart(2, "0")}</En>
        <h3 className="font-head text-lg font-black text-amber-900">
          <LatinRuns text={u.s.title} />
        </h3>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((row, ri) => {
          const ci = row.indexOf(":");
          const label = ci === -1 ? row : row.slice(0, ci);
          const rest = ci === -1 ? "" : row.slice(ci + 1).trim();
          const segs = rest.split(/(,\s*)/).filter((x) => x !== "");
          return (
            <div key={ri} className="rounded-xl border-2 border-white bg-white/90 px-3 py-2 shadow-sm">
              <LtrRow className="gap-2">
                <En className="rounded-lg bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-900">{label}</En>
                {ci !== -1 && <span className="font-en text-xs font-black text-amber-500">:</span>}
                {segs.map((sg, i) =>
                  sg.trim() === "," || sg.trim() === "" ? (
                    <span key={i} className="font-en text-[12.5px] font-black text-slate-400">{sg.trim() === "," ? "," : ""}</span>
                  ) : (
                    <En key={i} className="rounded-lg border border-yellow-200 bg-yellow-50 px-2 py-0.5 text-[12.5px] font-black text-slate-900">
                      {sg.trim()}
                    </En>
                  )
                )}
              </LtrRow>
            </div>
          );
        })}
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------------------
   مسار الدروس — خط زمني صغير حول وحدة roadmap
   --------------------------------------------------------------------------*/
function RoadmapTimeline() {
  const nodes = [
    { n: "23", en: "Countable & Uncountable", ar: "تصنيف الأسماء", state: "done" },
    { n: "24", en: "Quantifiers", ar: "اختيار أداة الكمية — أنت هنا", state: "here" },
    { n: "25", en: "Past Continuous", ar: "المحطة التالية في منظومة الأزمنة", state: "next" },
  ];
  return (
    <div dir="rtl" className="grid gap-2.5 md:grid-cols-3">
      {nodes.map((nd) => (
        <div
          key={nd.n}
          className={`rounded-2xl border-2 p-3 ${
            nd.state === "here" ? "border-cyan-400 bg-gradient-to-l from-cyan-50 via-white to-sky-50 shadow-md" : nd.state === "done" ? "border-emerald-200 bg-emerald-50/60" : "border-slate-200 bg-slate-50/80"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <En className={`rounded-xl px-2.5 py-1 text-sm font-black ${nd.state === "here" ? "bg-cyan-700 text-white" : nd.state === "done" ? "bg-emerald-600 text-white" : "bg-slate-300 text-slate-700"}`}>
              L{nd.n}
            </En>
            <En className="text-[13px] font-black text-slate-800">{nd.en}</En>
            {nd.state === "here" && <En className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-amber-950">YOU ARE HERE</En>}
            {nd.state === "done" && <En className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black text-emerald-800">CLEARED ✓</En>}
          </div>
          <p className="mt-1.5 text-[12px] font-bold leading-5 text-slate-600">{nd.ar}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   عنقود مختبر اللغة — أنابيب اختبار تعرض ثنائيات a few/few و a little/little
   --------------------------------------------------------------------------*/
function TestTubeRack() {
  const tubes = [
    { en: "a few students", fill: "h-8", tone: "bg-emerald-400/80", mood: "متوازن ✓" },
    { en: "few students", fill: "h-3", tone: "bg-rose-400/80", mood: "نقص ⚠" },
    { en: "a little milk", fill: "h-8", tone: "bg-sky-400/80", mood: "يكفي ✓" },
    { en: "little milk", fill: "h-3", tone: "bg-rose-400/80", mood: "لا يكفي ⚠" },
  ];
  return (
    <div dir="rtl" className="rounded-2xl border-2 border-slate-300 bg-[#0f172a] p-4 shadow-inner">
      <LtrRow className="justify-center gap-2">
        <span className="text-base" aria-hidden>{"\uD83E\uDD7C️"}</span>
        <En className="rounded-lg bg-white/10 px-2.5 py-0.5 text-[10px] font-black tracking-[0.24em] text-cyan-200">LANGUAGE LABORATORY</En>
      </LtrRow>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
        {tubes.map((tb) => (
          <div key={tb.en} className="flex flex-col items-center rounded-xl bg-white/[0.06] p-2.5 ring-1 ring-white/10">
            <div className="relative flex h-20 w-7 flex-col justify-end overflow-hidden rounded-b-full rounded-t-md border-2 border-white/30 bg-white/5">
              <div className={`w-full ${tb.fill} ${tb.tone} anim-bob`} />
            </div>
            <En className="mt-2 block text-center text-[11.5px] font-black text-white">{tb.en}</En>
            <span className="text-[10px] font-bold text-cyan-100/70">{tb.mood}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   الفصل الرئيسي
   --------------------------------------------------------------------------*/
export function SlideView24({ s }: { s: SourceSection }) {
  const index = Math.max(0, SOURCE_SECTIONS.findIndex((x) => x.id === s.id));
  return <SourceUnit u={{ s, index }} tone="cyan" />;
}

export default function Lesson24({ onExit }: Props) {
  // خريطة الوحدات — تُبنى من SOURCE_SECTIONS كما هي (سجل 64 وحدة).
  const ledger = useMemo(() => SOURCE_SECTIONS.map((s, i) => ({ s, i })), []);

  return (
    <div dir="rtl" className="style-b font-body relative min-h-screen overflow-x-hidden bg-[#eef2fa] text-slate-800">
      <Signature />
      <SignatureGhost />
      <div className="relative z-10">
        <ZoneNav />
        <main className="mx-auto w-full max-w-6xl px-3 pb-16 pt-4 sm:px-6">
          <Hero onExit={onExit} />

          {/* 01 — الافتتاح: ربط الدرس 23 */}
          <Zone id="opening" tone="cyan" emoji={"\uD83D\uDEAA"} en="LAB ENTRY" ar="بوابة المختبر — ماذا أخذنا من الدرس 23" blurb="الوحدة المصدرية كاملة كما وردت، بحوار مباشر مع مختبر العدّ.">
            <SourceUnit u={unitOf("opening")} tone="cyan" />
          </Zone>

          {/* 02 — غرفة القيادة */}
          <Zone id="command" tone="indigo" emoji={"\uD83C\uDF9B️"} en="QUANTIFIER COMMAND CENTER" ar="غرفة قيادة أدوات الكمية — أربعة قرارات قبل أي جملة" blurb="قبل اختيار الأداة، أمرّر الاسم على أربع بطاقات قرار. كل بطاقة سؤال واحد فقط.">
            <CommandConsole />
            <SourceUnit u={unitOf("objectives")} tone="indigo" />
          </Zone>

          {/* 03 — المفهوم */}
          <Zone id="concept" tone="slate" emoji={"\uD83E\uDDE0"} en="WHAT IS A QUANTIFIER" ar="أولًا: ما معنى Quantifier؟" blurb="الكلمة نفسها ليست زينة — هي التي تغيّر معنى الجملة كاملة.">
            <SourceUnit u={unitOf("what")} tone="slate" />
          </Zone>

          {/* 04 — الخريطة */}
          <Zone id="map" tone="teal" emoji={"\uD83D\uDDFA️"} en="QUANTIFIER MAP" ar="خريطة أدوات الكمية — أي أداة تسكن أي عمود؟" blurb="الخريطة طبقة إضافية تُنظّم المصدر؛ نصوص الخريطتين أدناه كما وردت كاملتين.">
            <QuantifierMapDiagram />
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("map")} tone="teal" />
              <SourceUnit u={unitOf("full-map")} tone="teal" />
            </div>
          </Zone>

          {/* 05 — مختبر SOME */}
          <Zone id="some" tone="sky" emoji={"\uD83E\uDDEA"} en="SOME LAB" ar="مختبر SOME — كمية غير محددة لكنها موجودة" blurb="أمثلة LTR معزولة، وكل شرح المصدر حاضر بالكامل.">
            <SourceUnit u={unitOf("some")} tone="sky" />
            <div className="grid items-start gap-3 md:grid-cols-2">
              <SourceUnit u={unitOf("some with countable")} tone="sky" bare />
              <SourceUnit u={unitOf("some with uncountable")} tone="sky" bare />
              <SourceUnit u={unitOf("some and exact number")} tone="sky" bare />
              <SourceUnit u={unitOf("some positive sentences")} tone="sky" bare />
            </div>
          </Zone>

          {/* 06 — مختبر ANY */}
          <Zone id="any" tone="violet" emoji={"\uD83E\uDEE7"} en="ANY LAB" ar="مختبر ANY — أرض الأسئلة والنفي" blurb="ثلاث إشارات مرور: مثبتة ← some، سؤال/نفي ← any — مع العلاقة البصرية الكاملة.">
            <SourceUnit u={unitOf("any")} tone="violet" />
            <div className="grid items-start gap-3 md:grid-cols-2">
              <SourceUnit u={unitOf("any in questions")} tone="violet" bare />
              <SourceUnit u={unitOf("any in negatives")} tone="violet" bare />
            </div>
          </Zone>

          {/* 07 — SOME مقابل ANY */}
          <Zone id="somevsany" tone="amber" emoji={"\u2696️"} en="SOME VS ANY" ar="SOME مقابل ANY — والفرق الذي لا تقوله القاعدة المختصرة" blurb="لا تختزلهما في «مثبتة/سؤال» فقط؛ العروض والطلبات استثناء مهمّ في المصدر.">
            <SourceUnit u={unitOf("some-any")} tone="amber" />
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("juice comparison")} tone="amber" bare />
              <div dir="rtl" className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-l from-emerald-50 via-white to-teal-50 p-4">
                <LtrRow className="justify-center gap-2">
                  <span className="text-xl" aria-hidden>{"\uD83E\uDDDD"}</span>
                  <En className="rounded-lg bg-emerald-700 px-2.5 py-0.5 text-[10px] font-black tracking-[0.22em] text-white">OFFERS &amp; REQUESTS</En>
                </LtrRow>
                <p className="mt-2 text-center text-[12.5px] font-black text-emerald-900">هنا — ومعهما — تعود some إلى الأسئلة</p>
                <div className="mt-3 space-y-2">
                  <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-xl border-2 border-white bg-white px-3 py-2 shadow-sm">
                    <En className="block text-left text-base font-black text-slate-900 md:text-lg">Would you like some water?</En>
                  </div>
                  <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-xl border-2 border-white bg-white px-3 py-2 shadow-sm">
                    <En className="block text-left text-base font-black text-slate-900 md:text-lg">Can I have some juice?</En>
                  </div>
                </div>
                <p className="mt-2 text-center text-[12px] font-bold leading-6 text-slate-600">
                  <Rich text="السؤال هنا عرض أو طلب — والإجابة المتوقعة «نعم»، لذا some لا any." />
                </p>
              </div>
              <SourceUnit u={unitOf("some offers and requests")} tone="amber" bare />
            </div>
          </Zone>

          {/* 08 — MANY مقابل MUCH */}
          <Zone id="manymuch" tone="emerald" emoji={"\uD83D\uDD00"} en="MANY VS MUCH" ar="MANY مقابل MUCH — عددٌ مقابل مقدار" blurb="لوحة مقارنة بصرية، تليها وحدات المصدر كاملة عن many وmuch والمواجهة بينهما.">
            <VsBoard
              left={{ en: "MANY", ar: "عدد أشياء يمكن عدها", tone: "emerald", badge: "COUNTABLE", examples: ["many books", "many students", "many apples", "many questions", "How many apples do you need?"] }}
              right={{ en: "MUCH", ar: "مقدار شيء لا يُعَد", tone: "violet", badge: "UNCOUNTABLE", examples: ["much water", "much money", "much rice", "much time", "How much water do you drink?"] }}
              foot="أخطاء شائعة تحفظها الخريطة: many water ❌ — many money ❌ — الصحيح much أو a lot of."
            />
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("many")} tone="emerald" />
              <div className="space-y-3">
                <SourceUnit u={unitOf("many examples")} tone="emerald" bare />
                <SourceUnit u={unitOf("many errors")} tone="emerald" bare />
              </div>
              <SourceUnit u={unitOf("much")} tone="violet" />
              <div className="space-y-3">
                <SourceUnit u={unitOf("much examples")} tone="violet" bare />
                <TimeSensor />
                <SourceUnit u={unitOf("time special meaning")} tone="amber" bare />
              </div>
            </div>
            <div className="grid items-start gap-3 md:grid-cols-2">
              <SourceUnit u={unitOf("many-much")} tone="cyan" />
              <SourceUnit u={unitOf("many versus much")} tone="cyan" bare />
            </div>
          </Zone>

          {/* 09 — A LOT OF / LOTS OF */}
          <Zone id="lot" tone="teal" emoji={"\uD83D\uDCE6"} en="A LOT OF · LOTS OF" ar="خزان الكمية الكبيرة — تعمل مع النوعين" blurb="a lot of وlots of: المعنى نفسه، والاختيار بينهما ذوق لغوي لا قاعدة صلبة.">
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("alot")} tone="teal" />
              <SourceUnit u={unitOf("lots")} tone="teal" />
            </div>
            <div className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-4">
              <SourceUnit u={unitOf("a lot countable")} tone="teal" bare />
              <SourceUnit u={unitOf("a lot uncountable")} tone="teal" bare />
              <SourceUnit u={unitOf("a lot versus many much")} tone="amber" bare />
              <SourceUnit u={unitOf("a lot of versus lots of")} tone="sky" bare />
            </div>
          </Zone>

          {/* 10 — a few / few */}
          <Zone id="few" tone="emerald" emoji={"\uD83D\uDCCF"} en="A FEW VS FEW" ar="ميزان المعدود: a few مقابل few — حرف يصنع المعنى" blurb="المسافة بين الكفتين ليست كمية فقط، بل إحساس: موجود وكافٍ… أم ناقص ومُقلق.">
            <div className="grid items-start gap-3 md:grid-cols-2">
              <MeaningMeter en="a few books" ar="بضعة كتب — العدد صغير لكنه موجود ومريح." percent={48} tone="emerald" mood={"\uD83D\uDE42"} caption="عدد قليل نسبيًا، لكن الكمية قائمة — إحساس كافٍ/إيجابي." />
              <MeaningMeter en="few books" ar="كتب قليلة جدًا — العدد يثير إحساس النقص." percent={12} tone="rose" mood={"\uD83D\uDE1F"} caption="عدد صغير مع شعور بالنقص — الجملة أقرب إلى الشكوى." />
            </div>
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("afew")} tone="emerald" />
              <SourceUnit u={unitOf("few")} tone="rose" />
            </div>
            <div className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-4">
              <SourceUnit u={unitOf("a few meaning")} tone="emerald" bare />
              <SourceUnit u={unitOf("a few positive feeling")} tone="emerald" bare />
              <SourceUnit u={unitOf("few meaning")} tone="rose" bare />
              <SourceUnit u={unitOf("a few versus few")} tone="amber" bare />
            </div>
          </Zone>

          {/* 11 — a little / little */}
          <Zone id="little" tone="sky" emoji={"\uD83D\uDCA7"} en="A LITTLE VS LITTLE" ar="ميزان غير المعدود: a little مقابل little" blurb="نفس الحيلة، نفس الحرف — لكن الكوب هذه المرة سائل.">
            <div className="grid items-start gap-3 md:grid-cols-2">
              <MeaningMeter en="a little water" ar="قطرات موجودة — تكفي للظمأ الصغير." percent={42} tone="emerald" mood={"\uD83D\uDE42"} caption="كمية قليلة لكنها موجودة ومفيدة — إيجابية." />
              <MeaningMeter en="little water" ar="قطرات بالكاد — لا تكفي أحدًا." percent={10} tone="rose" mood={"\uD83D\uDE1F"} caption="كمية قليلة جدًا مع إحساس بالنقص — سلبية." />
            </div>
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("alittle")} tone="sky" />
              <SourceUnit u={unitOf("little")} tone="rose" />
            </div>
            <div className="grid items-start gap-3 md:grid-cols-3">
              <SourceUnit u={unitOf("a little meaning")} tone="sky" bare />
              <SourceUnit u={unitOf("little meaning")} tone="rose" bare />
              <SourceUnit u={unitOf("a little versus little")} tone="amber" bare />
            </div>
          </Zone>

          {/* 12 — لماذا a مهمة */}
          <Zone id="whya" tone="amber" emoji={"\uD83D\uDD24"} en="WHY «A» MATTERS" ar="لماذا حرف a مهمّ لهذه الدرجة؟" blurb="ليس زخرفًا — a تنقل الجملة من الشكوى إلى الاطمئنان.">
            <div className="grid items-start gap-3 md:grid-cols-[auto_1fr] md:items-center">
              <div className="relative mx-auto grid h-28 w-28 place-items-center rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl ring-4 ring-amber-200">
                <En className="text-6xl font-black drop-shadow-sm">a</En>
                <span className="absolute -bottom-2.5 rounded-full bg-slate-900 px-2.5 py-0.5 text-[10px] font-black tracking-widest text-amber-200">THE DIFFERENCE</span>
              </div>
              <SourceUnit u={unitOf("iq-explain")} tone="amber" />
            </div>
            <div className="grid items-start gap-3 md:grid-cols-2">
              <SourceUnit u={unitOf("why a matters")} tone="amber" bare />
              <SourceUnit u={unitOf("smart question")} tone="amber" bare />
            </div>
          </Zone>

          {/* 13 — جدار الأمثلة + القاعدة السريعة + كاشف المعنى */}
          <Zone id="wall" tone="slate" emoji={"\uD83E\uDDF1"} en="REFERENCE WALL" ar="جدار الأمثلة — اسم واحد، خمس أدوات" blurb="books / water / students / money / time: الحقل الذي تتصارع عليه الأدوات.">
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <SourceUnit u={unitOf("combined")} tone="slate" />
              <SourceUnit u={unitOf("combined examples")} tone="slate" bare />
            </div>
            <div className="grid items-start gap-3 lg:grid-cols-2">
              <div className="space-y-3">
                <QuickRuleScale />
                <SourceUnit u={unitOf("battle")} tone="slate" bare />
              </div>
              <div className="space-y-3">
                <MeaningDetector />
                <SourceUnit u={unitOf("fast-reference meanings")} tone="slate" bare />
              </div>
            </div>
          </Zone>

          {/* 14 — آلة There is / There are */}
          <Zone id="there" tone="cyan" emoji={"\uD83E\uDD16"} en="THERE IS · THERE ARE" ar="آلة الكمية الموجودة — is أم are؟" blurb="تذكير من الدرس 21: الفاعل يقرر الفعل، وأداة الكمية لا تزحزحه.">
            <ThereMachine />
            <div className="grid items-start gap-3 md:grid-cols-[2fr_1fr]">
              <SourceUnit u={unitOf("there")} tone="cyan" />
              <SourceUnit u={unitOf("is are warning")} tone="rose" bare />
            </div>
          </Zone>

          {/* 15 — مختبر اللغة */}
          <Zone id="lab" tone="violet" emoji={"\uD83E\uDD7C️"} en="LANGUAGE LABORATORY" ar="مختبر اللغة — أربع عيّنات تحت المجهر" blurb="العيّنات نفسها في المصدر: فرق الإحساس كله يعود إلى a الصغيرة.">
            <TestTubeRack />
            <SourceUnit u={unitOf("lab")} tone="violet" />
          </Zone>

          {/* 16 — محطات التدريب */}
          <Zone id="training" tone="cyan" emoji={"\uD83C\uDFAF"} en="TRAINING STATIONS" ar="محطات التدريب الخمس — 38 قرارًا قبل التخرج" blurb="كل بطاقة: اختيار محايد أولًا، ثم «تحقق من الإجابات»، ثم ↺ إعادة. لا كشف مبكر." >
            {ledger && (
              <>
                <TrainingStation unitId="training1" no={0} kind={0} />
                <TrainingStation unitId="training2" no={1} kind={1} />
                <TrainingStation unitId="training3" no={2} kind={2} />
                <TrainingStation unitId="training4" no={3} kind={3} />
                <TrainingStation unitId="training5" no={4} kind={4} />
              </>
            )}
          </Zone>

          {/* 17 — التحليل: المحقق + IQ200 + كاشف المعنى */}
          <Zone id="analysis" tone="rose" emoji={"\uD83D\uDD75️"} en="ANALYSIS BENCH" ar="طاولة التحليل — Grammar Detective وIQ200 وتحدي المعنى" blurb="لوحات عمل: علّم ما أنجزته، ثم اكشف الملاحظات. الحكم يبقى بعد الضغط على زر التحقق فقط.">
            <SourceUnit u={unitOf("detective")} tone="rose" />
            <CaseBoard
              tag="l24-detective"
              items={DETECTIVE}
              tone="rose"
              correctIndex={9}
              note="راجع النوع والمعنى: many/a few/few للمعدود الجمع، much/a little/little لغير المعدود، some/any/a lot of/lots of للنوعين. الجملة 10 في Grammar Detective صحيحة."
            />
            <SourceUnit u={unitOf("iq200")} tone="violet" />
            <CaseBoard
              tag="l24-iq200"
              items={IQ200}
              tone="violet"
              note="راجع النوع والمعنى: many/a few/few تمشي مع الجمع المعدود، much/a little/little مع غير المعدود، some/any/a lot of مع النوعين. صحّح ثم اشرح سبب التصحيح. وتذكّر خصوصية time: How much time? للكمية، وthree times للمرات المعدودة."
            />
            <SourceUnit u={unitOf("meaning")} tone="indigo" />
            <MeaningChallenge />
          </Zone>

          {/* 18 — المهمة النهائية */}
          <Zone id="boss" tone="rose" emoji={"\uD83C\uDFC6"} en="FINAL BOSS — RESTAURANT" ar="المهمة النهائية — مطعم Quantity Lab" blurb="كل أدواتك تتجمّع هنا: عُدّة المطعم + قصة من 10 جمل. لا تُختصر المهمة — نفّذها.">
            <SourceUnit u={unitOf("boss")} tone="rose" />
            <MissionDeck />
          </Zone>

          {/* 19 — الاختبار المصغر */}
          <Zone id="mini" tone="indigo" emoji={"\uD83E\uDDEA"} en="MINI FINAL TEST" ar="الاختبار النهائي المصغر — 8 أسئلة" blurb="نفس البروتوكول: أجبتَ، تحقّقتَ، أعدتَ. مفتاح التصحيح داخل نفس الوحدة المصدرية.">
            <SourceUnit u={unitOf("mini")} tone="indigo" bare />
            <MiniTest />
          </Zone>

          {/* 20 — مفتاح الإجابات */}
          <Zone id="key" tone="amber" emoji={"\uD83C\uDFC5"} en="ANSWER KEY" ar="مفتاح الإجابات — خمس حزم تدريب" blurb="كما ورد في المصدر، سطرًا سطرًا، بلا تغيير.">
            <AnswerKeyBoard u={unitOf("answers")} />
          </Zone>

          {/* 21 — الخلاصة الذهبية */}
          <Zone id="summary" tone="teal" emoji={"\uD83D\uDCDC"} en="GOLDEN SUMMARY" ar="الخلاصة النهائية والقاعدة الذهبية">
            <div dir="rtl" className="rounded-2xl bg-slate-900 p-4 text-white shadow-xl md:p-5">
              <LtrRow className="justify-center gap-2">
                <span className="text-xl" aria-hidden>{"\uD83D\uDC51"}</span>
                <En className="rounded-lg bg-amber-400/20 px-3 py-1 text-[11px] font-black tracking-[0.24em] text-amber-200 ring-1 ring-amber-300/40">The Golden Rule</En>
              </LtrRow>
              <p className="mt-2 text-center text-sm font-black leading-7 text-cyan-50">
                <Rich text="a few ≠ few — a little ≠ little. وجود a يعني الكمية موجودة ومقبولة؛ غيابها يفتح باب النقص." />
              </p>
            </div>
            <SourceUnit u={unitOf("summary")} tone="gold" />
          </Zone>

          {/* 22 — المسار */}
          <Zone id="roadmap" tone="slate" emoji={"\uD83D\uDDDFA️"} en="ROADMAP" ar="مسارنا الآن — الخطوة التالية في منظومة الأزمنة">
            <RoadmapTimeline />
            <SourceUnit u={unitOf("roadmap")} tone="slate" />
          </Zone>

          {/* 23 — الاختبار النهائي المشترك */}
          <Zone id="quiz" tone="cyan" emoji={"\uD83D\uDCDD"} en="FINAL QUIZ — QUANTIFIERS" ar="الاختبار النهائي — 12 سؤالًا جديدة مع الشرح ومساحة المعلم" blurb="المكوّن المشترك كما هو — لا كشف قبل التحقق، ولا مفتاح قبل فتح مساحة المعلم.">
            <section className="rounded-2xl border-2 border-cyan-200 bg-white p-4 shadow-sm md:p-6">
              <FinalQuiz lesson={24} accent="bg-cyan-700" />
            </section>
          </Zone>

          <div dir="rtl" className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-sm font-black text-slate-600">
              <LatinRuns text={`انتهت جولة المختبر — ${ledger.length} وحدة مصدر مُنجزة.`} />
            </div>
            <button type="button" onClick={onExit} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-black text-white shadow transition hover:bg-slate-800">
              ← العودة إلى جميع الدروس
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
