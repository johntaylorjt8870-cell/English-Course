import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_18,
  LESSON_SUBTITLE_18,
  LAB_NAME_18,
  LAB_MOTTO_18,
  COVER_INTRO_18,
  COVER_LINKS_LEAD_18,
  COVER_LINKS_18,
  LAB_FLOW_18,
  OBJECTIVES_18,
  SINGULAR_PLURAL_18,
  A_AN_RULE_18,
  REGULAR_18,
  ES_18,
  SESIES_LAB_18,
  Y_RULE_18,
  Y_MACHINE_18,
  FE_RULE_18,
  FE_CAUTION_18,
  IRREGULAR_INTRO_18,
  MONSTERS_18,
  SAME_FORM_18,
  SAME_FORM_EXTRA_18,
  GOLDEN_TABLE_18,
  FAMILIES_18,
  IS_ARE_18,
  WAS_WERE_18,
  PRESENT_18,
  COMMON_ERRORS_18,
  DETECTIVE_18,
  CHALLENGE1_18,
  CHALLENGE1_BANK_18,
  CHALLENGE2_18,
  CHALLENGE3_18,
  IQ200_18,
  IQ200_WHY_18,
  FINAL_BOSS_18,
  MINI_GAME_18,
  SUMMARY_18,
  KEY_RULE_18,
  ROADMAP_18,
  ROADMAP_18_CLOSING,
  TRANSFORM_MACHINE_18,
  RULE_DETECT_18,
  RULE_DETECT_OPTIONS_18,
  type Block18,
  type Exercise18,
  type Slide18,
  type Monster18,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 18 — PLURAL LAB — THE NUMBER DETECTIVE
// ONE ↓ SINGULAR ↓ identify the rule ↓ PLURAL
// كل الإنجليزية داخل عوازل LTR كاملة؛ لا نقسم الجملة إلى كلمات.
// ============================================================

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span dir="ltr" style={{ direction: "ltr" }} className={`ltr font-en ${className}`}>
      {children}
    </span>
  );
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  const clean = text.replace(/\*\*/g, "");
  const parts = clean.split(/(\[\[.+?\]\])/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const marked = part.match(/^\[\[(.+)\]\]$/);
        if (marked) {
          return (
            <span key={i} dir="ltr" style={{ direction: "ltr" }} className="ltr font-en rounded-lg bg-slate-900/5 px-1.5 py-0.5 font-bold text-slate-800">
              {marked[1]}
            </span>
          );
        }
        return <LatinRuns key={i} text={part} />;
      })}
    </span>
  );
}

function TextBlock({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={className}>
      <Rich text={text} />
    </div>
  );
}

function SourceLine({
  en,
  ar,
  tone = "neutral",
}: {
  en: string;
  ar?: string;
  tone?: "neutral" | "good" | "bad" | "focus" | "warn";
}) {
  const toneClass =
    tone === "good"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : tone === "bad"
        ? "border-rose-200 bg-rose-50 text-rose-800"
        : tone === "focus"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : tone === "warn"
            ? "border-orange-300 bg-orange-50 text-orange-900"
            : "border-slate-100 bg-white text-slate-900";
  return (
    <div className={`rounded-2xl border-2 p-3 ${toneClass}`}>
      <En className={`block text-lg font-extrabold md:text-xl ${tone === "bad" ? "line-through decoration-rose-300" : ""}`}>{en}</En>
      {ar && (
        <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
          {ar}
        </div>
      )}
    </div>
  );
}

function MixedLine({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border-2 border-teal-100 bg-teal-50/60 p-3">
      <Rich text={text} className="text-base font-bold text-slate-800 md:text-lg" />
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-teal-200 bg-teal-50 p-4">
      <span className="text-2xl">{emoji}</span>
      <Rich text={text} className="text-base font-semibold leading-relaxed text-slate-800 md:text-lg" />
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
  sourceHeading,
}: {
  mascot: string;
  step?: string;
  badge?: string;
  title: React.ReactNode;
  lead?: string;
  children: React.ReactNode;
  tip?: string;
  sourceHeading?: string;
}) {
  return (
    <section
      dir="rtl"
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(13,148,136,0.22)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-teal-600 text-lg font-bold text-white">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-teal-100 px-3.5 py-1.5 text-sm font-bold text-teal-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-500">
          <Rich text={sourceHeading} />
        </div>
      )}
      <h2 className="font-head mt-3 max-w-[90%] text-2xl font-bold leading-snug text-slate-900 md:text-[2.05rem]">
        {title}
      </h2>
      {lead && (
        <div className="mt-2 max-w-[92%] text-lg text-slate-500 md:text-xl">
          <Rich text={lead} />
        </div>
      )}
      <div className="mt-6 space-y-3.5">{children}</div>
      {tip && (
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-600 to-cyan-600 p-4 text-white">
          <span className="text-2xl">🔢</span>
          <span className="text-base font-semibold md:text-lg">
            <Rich text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

/** إطار موحّد لكل الأنظمة التفاعلية — يعطي الدرس هوية «المختبر». */
function LabPanel({
  emoji,
  label,
  ar,
  children,
  seq,
}: {
  emoji: string;
  label: string;
  ar?: string;
  children: React.ReactNode;
  seq?: string;
}) {
  return (
    <div
      data-en-seq={seq}
      className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.18em] text-teal-600">
          {label}
        </span>
        {ar && (
          <span className="text-sm font-bold text-slate-600">
            <Rich text={ar} />
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

// ============================================================
// 1 — Singular / Plural board
// ============================================================
function SingPluralBoard() {
  const [side, setSide] = useState<"singular" | "plural">("singular");
  const panels = [
    { key: "singular" as const, data: SINGULAR_PLURAL_18.singular, accent: "border-teal-300 bg-teal-50/70", ring: "ring-4 ring-teal-200", chip: "bg-teal-100 text-teal-800" },
    { key: "plural" as const, data: SINGULAR_PLURAL_18.plural, accent: "border-amber-300 bg-amber-50/70", ring: "ring-4 ring-amber-200", chip: "bg-amber-100 text-amber-800" },
  ];
  return (
    <div className="grid gap-3">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setSide("singular")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            side === "singular" ? "bg-teal-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          1 — واحد
        </button>
        <button
          onClick={() => setSide("plural")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            side === "plural" ? "bg-amber-500 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          2+ — أكثر من واحد
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {panels.map((p) => (
          <button
            key={p.key}
            onClick={() => setSide(p.key)}
            className={`rounded-3xl border-2 p-4 text-right transition ${p.accent} ${
              side === p.key ? `${p.ring} scale-[1.01]` : "opacity-75"
            }`}
          >
            <div dir="ltr" className="text-left">
              <En className="text-2xl font-black text-slate-900">{p.data.label}</En>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-600">
              <Rich text={`${p.data.eq} — ${p.data.note}`} />
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid gap-1.5">
              {p.data.words.map((w) => (
                <div key={w.en} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
                  <span dir="ltr" className={`font-en rounded-lg px-2 py-0.5 text-base font-black ${p.chip}`}>
                    {w.en}
                  </span>
                  <span dir="rtl" className="text-sm font-bold text-slate-500">
                    {w.ar}
                  </span>
                </div>
              ))}
            </div>
            <div dir="ltr" className="mt-3 rounded-2xl bg-white p-3 shadow-sm">
              <div className="text-right text-xs font-bold text-slate-400" dir="rtl">
                <Rich text={p.data.exampleLabel} />
              </div>
              <En className="mt-1 block text-base font-black text-slate-900">{p.data.example}</En>
              <div dir="rtl" className="mt-0.5 text-sm font-bold text-slate-500">
                {p.data.exampleAr}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 1 — القاعدة الذهبية الأولى: a / an
// ============================================================
function AAnBoard() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const reasons = [
    "اسم معدود مفرد ← نستخدم a.",
    "جمع ← بدون a أو an.",
    "خطأ: لا نستخدم a مع الجمع.",
    "خطأ: لا نستخدم an مع الجمع.",
  ];
  return (
    <div data-en-seq="l18-aan" className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <div className="mb-2 text-center text-sm font-bold text-amber-700">
        ⭐ <Rich text={A_AN_RULE_18.title} />
      </div>
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={A_AN_RULE_18.rule} />
      </div>
      <div className="mt-2 flex justify-center">
        <En className="rounded-2xl border-2 border-amber-300 bg-white px-6 py-2 text-2xl font-black text-amber-800">{A_AN_RULE_18.use}</En>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap justify-center gap-1.5">
        {A_AN_RULE_18.examples.map((ex) => (
          <span key={ex} dir="ltr" className="font-en rounded-xl bg-white px-3 py-1.5 text-base font-bold text-amber-900">
            {ex}
          </span>
        ))}
      </div>
      <div className="mt-3 text-center text-base font-bold text-slate-700">
        <Rich text={`${A_AN_RULE_18.but} ${A_AN_RULE_18.but2}`} />
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid gap-2 sm:grid-cols-2">
        {A_AN_RULE_18.checks.map((c, i) => {
          const isOn = open.has(i);
          return (
            <button
              key={c.en}
              onClick={() =>
                setOpen((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
              dir="ltr"
              className={`rounded-2xl border-2 p-3 text-left transition ${
                c.ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span dir="ltr" className="font-en text-lg font-black text-slate-900">
                  {c.en}
                </span>
                <span className="text-xl">{c.ok ? "✅" : "❌"}</span>
              </div>
              {isOn && (
                <div dir="rtl" className="mt-1 text-xs font-bold text-slate-600">
                  <Rich text={reasons[i]} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// 2 — Regular Plural board (Noun + s)
// ============================================================
function RegularBoard() {
  const [lit, setLit] = useState<Set<number>>(new Set());
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l18-regular"
      className="ltr-row grid gap-2 sm:grid-cols-2"
    >
      {REGULAR_18.examples.map((e, i) => {
        const on = lit.has(i);
        return (
          <button
            key={e.sing}
            onClick={() =>
              setLit((s) => {
                const n = new Set(s);
                if (n.has(i)) n.delete(i);
                else n.add(i);
                return n;
              })
            }
            className={`flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 p-2.5 transition ${
              on ? "border-teal-300 bg-teal-50 shadow" : "border-slate-200 bg-white hover:border-teal-200"
            }`}
          >
            <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2.5 py-1 text-base font-black text-slate-700">
              {e.sing}
            </span>
            <span
              dir="ltr"
              className={`font-en rounded-lg px-2 py-0.5 text-sm font-black transition ${
                on ? "bg-amber-300 text-amber-950" : "bg-teal-100 text-teal-700"
              }`}
            >
              + s
            </span>
            <span dir="ltr" className="font-en text-lg font-black text-teal-500">
              =
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-teal-100 px-2.5 py-1 text-base font-black text-teal-800">
              {e.plural}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// 1 — SINGULAR → PLURAL TRANSFORMATION MACHINE
// ============================================================
function TransformMachine() {
  const [i, setI] = useState(0);
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const pair = TRANSFORM_MACHINE_18[i];
  const pick = (n: number) => {
    setI(n);
    setStage(0);
  };
  return (
    <LabPanel emoji="⚙️" label="SINGULAR → PLURAL TRANSFORMATION MACHINE" ar="آلة تحويل الجمع — ماذا تغيّر؟" seq="l18-machine">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mb-3 flex flex-wrap justify-center gap-1.5">
        {TRANSFORM_MACHINE_18.map((p, idx) => (
          <button
            key={p.sing}
            onClick={() => pick(idx)}
            dir="ltr"
            className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${
              idx === i ? "border-teal-600 bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"
            }`}
          >
            {p.sing}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border-2 border-white bg-white p-4">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-3">
          <span
            dir="ltr"
            className={`font-en rounded-2xl border-2 px-4 py-3 text-xl font-black transition ${
              stage === 2 ? "border-slate-200 bg-slate-50 text-slate-400" : "border-teal-200 bg-teal-50 text-teal-800"
            }`}
          >
            {pair.sing}
          </span>
          <span dir="ltr" className="font-en text-2xl font-black text-teal-400">
            →
          </span>
          {stage === 0 && (
            <span dir="ltr" className="font-en rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-xl font-black text-slate-300">
              ???
            </span>
          )}
          {stage === 1 &&
            (pair.suffix ? (
              <span dir="ltr" className="font-en flex items-center rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3 text-xl font-black text-slate-900">
                {pair.root}
                <span className="anim-drift mx-0.5 rounded-lg bg-amber-300 px-1.5 text-amber-950">{pair.suffix}</span>
              </span>
            ) : (
              <span dir="ltr" className="font-en rounded-2xl border-2 border-violet-300 bg-violet-50 px-4 py-3 text-xl font-black text-violet-800">
                {pair.sing === "child" ? "children" : pair.sing}
                {pair.sing === "child" && <span className="mr-2">😮</span>}
              </span>
            ))}
          {stage === 2 && (
            <span dir="ltr" className="font-en rounded-2xl border-2 border-emerald-300 bg-emerald-100 px-4 py-3 text-xl font-black text-emerald-800">
              {pair.plural}
            </span>
          )}
        </div>

        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setStage(0)}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-slate-400"
          >
            ↺ إعادة
          </button>
          <button
            onClick={() => setStage(1)}
            disabled={stage !== 0}
            className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white transition enabled:hover:bg-amber-600 disabled:opacity-30"
          >
            🔬 افحص التغيير
          </button>
          <button
            onClick={() => setStage(2)}
            disabled={stage !== 1}
            className="rounded-xl bg-teal-600 px-3 py-2 text-xs font-bold text-white transition enabled:hover:bg-teal-700 disabled:opacity-30"
          >
            ⚙️ شغّل الآلة
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        {stage === 0 && <Rich text="اختر كلمة مفردة، ثم شغّل الآلة لترى ماذا يحدث عندما يصبح الشيء أكثر من واحد." className="text-sm font-bold text-slate-600" />}
        {stage === 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-bold text-slate-600">
              <Rich text="ما الذي تغيّر؟" />
            </span>
            <span className="rounded-lg bg-violet-100 px-2.5 py-1 text-sm font-black text-violet-800">
              <Rich text={pair.change} />
            </span>
          </div>
        )}
        {stage === 2 && (
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span dir="ltr" className="font-en rounded-lg bg-teal-600 px-2.5 py-1 text-sm font-black text-white">
                {pair.rule}
              </span>
              <span className="text-sm font-bold text-slate-600">
                <Rich text={pair.reason} />
              </span>
            </div>
            <div className="text-xs font-bold text-slate-400">
              <Rich text={`${pair.sing} = singular ← ${pair.plural} = plural`} />
            </div>
          </div>
        )}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 3 — S / ES / IES LAB
// ============================================================
function SeSiesLab() {
  const [open, setOpen] = useState<number | null>(0);
  const colors: Record<string, { badge: string; box: string }> = {
    sky: { badge: "bg-sky-600 text-white", box: "border-sky-200 bg-sky-50" },
    amber: { badge: "bg-amber-500 text-white", box: "border-amber-200 bg-amber-50" },
    violet: { badge: "bg-violet-600 text-white", box: "border-violet-200 bg-violet-50" },
  };
  return (
    <LabPanel emoji="🧪" label="S / ES / IES LAB" ar="مختبر القواعد الثلاث — اضغط لمعرفة السبب" seq="l18-sesies">
      <div className="grid gap-2 md:grid-cols-3">
        {SESIES_LAB_18.map((lane, i) => {
          const c = colors[lane.color];
          const isOn = open === i;
          return (
            <button
              key={lane.rule}
              onClick={() => setOpen(isOn ? null : i)}
              className={`rounded-2xl border-2 p-3 text-right transition ${isOn ? `${c.box} shadow` : "border-slate-200 bg-white opacity-80"}`}
            >
              <div className="flex items-center justify-between">
                <span dir="ltr" className={`font-en rounded-xl px-3 py-1 text-lg font-black ${c.badge}`}>
                  {lane.rule}
                </span>
                <span dir="ltr" className="font-en text-sm font-black text-slate-400">
                  {isOn ? "▲" : "▼"}
                </span>
              </div>
              <div dir="ltr" className="mt-2 text-left">
                <En className="text-base font-black text-slate-900">{lane.example}</En>
              </div>
              {isOn && (
                <div className="mt-2 text-sm font-bold text-slate-600">
                  <Rich text={lane.why} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 3 — ES board
// ============================================================
function EsBoard() {
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l18-es"
      className="ltr-row grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
    >
      {ES_18.examples.map((e) => (
        <div key={e.sing} className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-amber-100 bg-white p-2.5">
          <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2.5 py-1 text-base font-black text-slate-700">
            {e.sing}
          </span>
          <span dir="ltr" className="font-en rounded-lg bg-amber-200 px-2 py-0.5 text-sm font-black text-amber-900">
            + es
          </span>
          <span dir="ltr" className="font-en text-lg font-black text-amber-500">
            =
          </span>
          <span dir="ltr" className="font-en rounded-lg bg-amber-100 px-2.5 py-1 text-base font-black text-amber-800">
            {e.plural}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 4 — Y rule board (الحالتان)
// ============================================================
function YBoard() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-violet-200 bg-violet-50/60 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-violet-700">
            <Rich text={Y_RULE_18.case1.title} />
          </span>
          <En className="rounded-xl bg-violet-600 px-3 py-1 text-base font-black text-white">y → ies</En>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich text={`${Y_RULE_18.case1.rule} ${Y_RULE_18.case1.action}`} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid gap-1.5">
          {Y_RULE_18.case1.examples.map((e) => (
            <div key={e.sing} className="flex items-center justify-center gap-2 rounded-xl bg-white px-2 py-1.5 shadow-sm">
              <span dir="ltr" className="font-en text-base font-black text-slate-700">
                {e.sing}
              </span>
              <span dir="ltr" className="font-en text-sm font-black text-violet-400">
                →
              </span>
              <span dir="ltr" className="font-en rounded-lg bg-violet-100 px-2 py-0.5 text-base font-black text-violet-800">
                {e.plural}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl border-2 border-violet-100 bg-white p-3">
          <div className="text-center text-xs font-bold text-violet-700">
            <Rich text={Y_RULE_18.case1.howTitle} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-1.5">
            <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2 py-1 text-lg font-black text-slate-700">
              ba
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-amber-300 px-2 py-1 text-lg font-black text-amber-950 ring-2 ring-amber-400">
              b
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-violet-300 px-2 py-1 text-lg font-black text-violet-950">
              y
            </span>
          </div>
          <div className="mt-2 text-center text-sm font-bold text-slate-600">
            <Rich text={`${Y_RULE_18.case1.howBefore} ${Y_RULE_18.case1.howLetter} — ${Y_RULE_18.case1.howNote}`} />
          </div>
          <div className="mt-1 text-center text-sm font-bold text-violet-800">
            <Rich text={`${Y_RULE_18.case1.howSo} ${Y_RULE_18.case1.howResult}`} />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-teal-700">
            <Rich text={Y_RULE_18.case2.title} />
          </span>
          <En className="rounded-xl bg-teal-600 px-3 py-1 text-base font-black text-white">y + s</En>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich text={Y_RULE_18.case2.rule} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
          {Y_RULE_18.case2.vowels.map((v) => (
            <span key={v} dir="ltr" className="font-en rounded-lg bg-white px-2.5 py-1 text-base font-black text-teal-800">
              {v}
            </span>
          ))}
        </div>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich text={Y_RULE_18.case2.action} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid gap-1.5">
          {Y_RULE_18.case2.examples.map((e) => (
            <div key={e.sing} className="flex items-center justify-center gap-2 rounded-xl bg-white px-2 py-1.5 shadow-sm">
              <span dir="ltr" className="font-en text-base font-black text-slate-700">
                {e.sing}
              </span>
              <span dir="ltr" className="font-en text-sm font-black text-teal-400">
                →
              </span>
              <span dir="ltr" className="font-en rounded-lg bg-teal-100 px-2 py-0.5 text-base font-black text-teal-800">
                {e.plural}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4 — Y DECISION MACHINE
// ============================================================
function YMachine() {
  const [picked, setPicked] = useState<Record<number, boolean>>({});
  return (
    <LabPanel emoji="🧭" label="Y DECISION MACHINE" ar="افحص الحرف الذي قبل Y — ساكن أم علة؟" seq="l18-ymachine">
      <div className="grid gap-2 sm:grid-cols-2">
        {Y_MACHINE_18.map((w, i) => {
          const my = picked[i];
          const correct = my === w.vowel;
          return (
            <div
              key={w.word}
              data-en-case={i}
              className={`rounded-2xl border-2 p-3 transition ${
                my !== undefined ? (correct ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : "border-slate-200 bg-white"
              }`}
            >
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-1">
                <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-1.5 py-0.5 text-xl font-black text-slate-600">
                  {w.word.slice(0, -2)}
                </span>
                <span dir="ltr" className="font-en rounded-lg bg-amber-300 px-1.5 py-0.5 text-xl font-black text-amber-950 ring-2 ring-amber-400">
                  {w.before}
                </span>
                <span dir="ltr" className="font-en rounded-lg bg-violet-300 px-1.5 py-0.5 text-xl font-black text-violet-950">
                  y
                </span>
              </div>
              <div className="mt-2 flex justify-center gap-1.5">
                <button
                  onClick={() => setPicked((p) => ({ ...p, [i]: false }))}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    my === false ? (correct ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "border-2 border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  حرف ساكن Consonant
                </button>
                <button
                  onClick={() => setPicked((p) => ({ ...p, [i]: true }))}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                    my === true ? (correct ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "border-2 border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  حرف علة Vowel
                </button>
              </div>
              {my !== undefined && (
                <div dir="ltr" className="mt-2 flex items-center justify-center gap-2">
                  <span dir="ltr" className={`font-en text-lg font-black ${correct ? "text-emerald-700" : "text-rose-600"}`}>
                    {w.word}
                  </span>
                  <span dir="ltr" className="font-en text-sm font-black text-slate-400">
                    →
                  </span>
                  <span dir="ltr" className={`font-en rounded-lg px-2 py-0.5 text-lg font-black ${correct ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700"}`}>
                    {w.plural}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 4 — IQ200 Mini Challenge
// ============================================================
function YMiniChallenge() {
  const [picked, setPicked] = useState<Record<number, number>>({});
  return (
    <LabPanel emoji="🔥" label="IQ200 MINI CHALLENGE" ar="أي واحدة صحيحة؟" seq="l18-ymini">
      <div className="grid gap-3 sm:grid-cols-2">
        {Y_RULE_18.mini.map((m, i) => {
          const c = picked[i];
          return (
            <div key={i} className="rounded-3xl border-2 border-orange-200 bg-white p-3">
              <div className="text-center text-sm font-bold text-slate-600">
                <Rich text={m.question} />
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex justify-center gap-2">
                {m.options.map((opt, oi) => {
                  let cls = "border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-300";
                  if (c !== undefined) {
                    if (oi === m.answer) cls = "border-transparent bg-emerald-600 text-white";
                    else if (c === oi) cls = "border-transparent bg-rose-600 text-white";
                    else cls = "border-slate-200 bg-white text-slate-300";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => setPicked((p) => ({ ...p, [i]: oi }))}
                      dir="ltr"
                      className={`font-en rounded-xl border-2 px-4 py-2 text-base font-black transition active:scale-[0.98] ${cls}`}
                    >
                      <span className="mr-1 text-xs opacity-60">{oi + 1}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {c !== undefined && (
                <div className="mt-2 rounded-xl bg-orange-50 p-2 text-center text-sm font-bold text-orange-900">
                  <Rich text={`${m.answerLabel} ${m.answerText} ${m.why}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 5 — F / FE board
// ============================================================
function FeBoard() {
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l18-fe-board"
      className="ltr-row grid gap-2 sm:grid-cols-2"
    >
      {FE_RULE_18.famous.map((e) => (
        <div key={e.sing} className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white p-2.5">
          <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2.5 py-1 text-base font-black text-slate-700">
            {e.sing}
          </span>
          <span dir="ltr" className="font-en rounded-lg bg-violet-200 px-2 py-0.5 text-sm font-black text-violet-900">
            → ves
          </span>
          <span dir="ltr" className="font-en text-lg font-black text-violet-500">
            =
          </span>
          <span dir="ltr" className="font-en rounded-lg bg-violet-100 px-2.5 py-1 text-base font-black text-violet-800">
            {e.plural}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 5 — F / FE CAUTION LAB
// ============================================================
function FeCautionLab() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (key: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(key)) n.delete(key);
      else n.add(key);
      return n;
    });
  const Row = ({ sing, plural, key, cls }: { sing: string; plural: string; key: string; cls: string }) => {
    const on = open.has(key);
    return (
      <button
        onClick={() => toggle(key)}
        dir="ltr"
        className={`ltr-row flex flex-wrap items-center justify-center gap-2 rounded-xl border-2 p-2.5 transition ${cls} ${on ? "opacity-100" : "opacity-70"}`}
      >
        <span dir="ltr" className="font-en text-base font-black text-slate-700">
          {sing}
        </span>
        <span dir="ltr" className="font-en text-sm font-black text-slate-400">
          →
        </span>
        <span dir="ltr" className={`font-en rounded-lg px-2.5 py-0.5 text-base font-black ${on ? "bg-white shadow" : "bg-slate-100 text-slate-300"}`}>
          {on ? plural : "•••"}
        </span>
      </button>
    );
  };
  return (
    <LabPanel emoji="⚠️" label="F / FE CAUTION LAB" ar="انتبه: ليست كل f/fe تصبح ves" seq="l18-fe">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-violet-200 bg-white p-3">
          <div className="mb-2 text-center text-sm font-bold text-violet-700">✅ من تتحول: f / fe → ves</div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-1.5">
            {FE_CAUTION_18.ves.map((e) => (
              <Row key={`v-${e.sing}`} sing={e.sing} plural={e.plural} cls="border-violet-100 bg-violet-50/50" />
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-300 bg-white p-3">
          <div className="mb-2 text-center text-sm font-bold text-amber-700"> من تكتفي بـ S</div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-1.5">
            {FE_CAUTION_18.s.map((e) => (
              <Row key={`s-${e.sing}`} sing={e.sing} plural={e.plural} cls="border-amber-200 bg-amber-50/50" />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-orange-300 bg-orange-50 p-3 text-center">
        <Rich text="«كل F تصبح VES» ❌" className="text-base font-black text-orange-800" />
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={FE_CAUTION_18.alarm} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 6 — IRREGULAR MONSTER ZONE
// ============================================================
function MonsterCard({ m }: { m: Monster18 }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border-2 transition ${
        open ? "border-amber-400 bg-slate-800 shadow-lg" : "border-slate-700 bg-slate-800/80"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-wrap items-center justify-center gap-2 p-3 text-left"
      >
        <span className="text-amber-300">{m.n}</span>
        <span dir="ltr" className="font-en rounded-lg bg-slate-700 px-2.5 py-1 text-base font-black text-slate-100">
          {m.sing}
        </span>
        <span dir="ltr" className="font-en text-lg font-black text-amber-400">
          →
        </span>
        <span
          dir="ltr"
          className={`font-en rounded-lg px-2.5 py-1 text-base font-black transition ${
            open ? "bg-amber-400/20 text-amber-300" : "bg-slate-700/60 text-slate-400"
          }`}
        >
          {m.plural}
        </span>
      </button>
      <div className="space-y-1.5 px-3 pb-3" hidden={!open}>
          <div className="text-center text-sm font-bold text-slate-300">
            <Rich text={`${m.sing} = ${m.singAr}${m.pluralAr ? ` — ${m.plural} = ${m.pluralAr}` : ""}`} />
          </div>
          {m.ex1 && (
            <div dir="ltr">
              <En className="block rounded-lg bg-slate-700/70 px-2 py-1 text-sm font-bold text-slate-100">{m.ex1}</En>
            </div>
          )}
          {m.ex2 && (
            <div dir="ltr">
              <En className="block rounded-lg bg-slate-700/70 px-2 py-1 text-sm font-bold text-slate-100">{m.ex2}</En>
            </div>
          )}
          {m.wrong && (
            <div dir="ltr" className="flex flex-wrap justify-center gap-1.5">
              <span dir="ltr" className="font-en rounded-lg bg-rose-500/20 px-2 py-0.5 text-sm font-black text-rose-300 line-through">
                {m.wrong} ❌
              </span>
              <span dir="ltr" className="font-en rounded-lg bg-emerald-500/20 px-2 py-0.5 text-sm font-black text-emerald-300">
                {m.correct} ✅
              </span>
            </div>
          )}
          {m.note && (
            <div dir="rtl" className="text-xs font-bold text-amber-200/90">
              <Rich text={m.note} />
            </div>
          )}
      </div>
    </div>
  );
}

function MonsterBoard() {
  return (
    <LabPanel emoji="😈" label="IRREGULAR MONSTER ZONE" ar="الوحوش الحقيقية — 9 أسماء تتغير كلها" seq="l18-monsters">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-2 rounded-3xl border-2 border-slate-800 bg-slate-900 p-3 sm:grid-cols-2 lg:grid-cols-3">
        {MONSTERS_18.map((m) => (
          <MonsterCard key={m.n} m={m} />
        ))}
      </div>
      <div className="mt-2 text-center text-xs font-bold text-slate-400">
        اضغط على كل وحش لكشف أمثلته وملاحظاته
      </div>
    </LabPanel>
  );
}

// ============================================================
// 6 — SAME-FORM ZONE (⑩⑪)
// ============================================================
function SameFormBoard() {
  const [count, setCount] = useState<number[]>([1, 5, 1, 2]);
  return (
    <LabPanel emoji="👥" label="SAME-FORM ZONE" ar="المفرد والجمع بنفس الشكل!" seq="l18-sameform">
      <div className="grid gap-3 md:grid-cols-2">
        {SAME_FORM_18.map((m) => {
          const isSheep = m.sing === "sheep";
          const counts = isSheep ? [1, 5] : [1, 2, 5];
          return (
            <div key={m.n} className="rounded-3xl border-2 border-cyan-200 bg-white p-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-cyan-600">{m.n}</span>
                <span dir="ltr" className="font-en rounded-xl bg-cyan-100 px-3 py-1.5 text-xl font-black text-cyan-900">
                  {m.sing}
                </span>
                <span dir="ltr" className="font-en text-xl font-black text-cyan-500">
                  →
                </span>
                <span dir="ltr" className="font-en rounded-xl bg-cyan-100 px-3 py-1.5 text-xl font-black text-cyan-900">
                  {m.plural}
                </span>
                <span className="text-2xl">{isSheep ? "🐑" : "🐟"}</span>
              </div>
              <div className="mt-2 text-center text-sm font-bold text-slate-600">
                <Rich text={m.note ?? ""} />
              </div>
              <div className="mt-1 text-center text-sm font-bold text-slate-500">
                <Rich text={m.singAr ? `${m.sing} = ${m.singAr}` : "المفرد: sheep — الجمع: sheep — نفس الكلمة!"} />
              </div>
              <div className="mt-3 flex justify-center gap-2">
                {counts.map((c) => (
                  <button
                    key={c}
                    onClick={() =>
                      setCount((arr) =>
                        isSheep
                          ? [c, arr[1], arr[2], arr[3]]
                          : [arr[0], arr[1], c, arr[3]]
                      )
                    }
                    className={`rounded-lg px-3 py-1 text-sm font-bold transition ${
                      (isSheep ? count[0] : count[2]) === c ? "bg-cyan-600 text-white" : "border-2 border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {c === 1 ? "one" : c === 2 ? "two" : "five"}
                  </button>
                ))}
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="mt-2 flex flex-wrap items-center justify-center gap-2">
                {counts.map((c) => (
                  <span
                    key={c}
                    dir="ltr"
                    className={`font-en rounded-xl px-3 py-1.5 text-base font-black transition ${
                      (isSheep ? count[0] : count[2]) === c ? "bg-cyan-600 text-white shadow" : "bg-cyan-50 text-cyan-900"
                    }`}
                  >
                    {c === 1 ? "one" : c === 2 ? "two" : "five"} {m.sing}
                  </span>
                ))}
              </div>
              {m.wrong && (
                <div className="mt-2 text-center text-sm font-bold text-rose-600">
                  <Rich text={`${m.wrongNote ?? ""} `} />
                  <En className="text-base font-black">{m.wrong} ❌</En>
                </div>
              )}
              {!isSheep && (
                <div dir="ltr" className="mt-2">
                  <En className="block rounded-xl bg-slate-50 px-3 py-2 text-center text-base font-black text-slate-800">
                    {SAME_FORM_EXTRA_18.fishExample}
                  </En>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 6 — GOLDEN MEMORY TABLE
// ============================================================
function GoldenTable() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🧠" label="GOLDEN MEMORY TABLE" ar="جدول الحفظ الذهبي — اضغط لكشف الجمع" seq="l18-golden">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row overflow-hidden rounded-2xl border-2 border-amber-300 bg-white">
        <div className="grid grid-cols-[1fr_1fr] gap-px bg-amber-200">
          <div dir="ltr" className="bg-amber-500 px-3 py-2 text-center font-en text-xs font-black uppercase tracking-wide text-white">
            {GOLDEN_TABLE_18.head.split(" → ")[0]}
          </div>
          <div dir="ltr" className="bg-amber-500 px-3 py-2 text-center font-en text-xs font-black uppercase tracking-wide text-white">
            {GOLDEN_TABLE_18.head.split(" → ")[1]}
          </div>
          {GOLDEN_TABLE_18.rows.map((r, i) => {
            const on = open.has(i);
            return (
              <button key={r.sing} className="contents" onClick={() =>
                setOpen((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }>
                <div className="bg-white px-3 py-2 text-center">
                  <span dir="ltr" className="font-en text-base font-black text-slate-800">
                    {r.sing}
                  </span>
                </div>
                <div className={`px-3 py-2 text-center ${on ? "bg-amber-50" : "bg-slate-50"}`}>
                  <span dir="ltr" className={`font-en text-base font-black ${on ? "text-amber-800" : "text-slate-300"}`}>
                    {on ? r.plural : "•••"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 2 — PLURAL RULE DETECTOR
// ============================================================
function RuleDetector() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <LabPanel emoji="🔎" label="PLURAL RULE DETECTOR" ar="حدد قاعدة جمع الكلمة ثم اكشف التفسير" seq="l18-detector">
      <div className="grid gap-2">
        {RULE_DETECT_18.map((item, i) => {
          const chosen = picked[i];
          const right = chosen === item.rule;
          return (
            <div
              key={item.word}
              data-en-case={i}
              className={`rounded-2xl border-2 bg-white p-3 transition ${
                chosen ? (right ? "border-emerald-300" : "border-rose-300") : "border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span dir="ltr" className="font-en rounded-xl bg-teal-600 px-3 py-1.5 text-lg font-black text-white">
                  {item.word}
                </span>
                <span className="text-sm font-bold text-slate-500">ما قاعدة جمعها؟</span>
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
                {RULE_DETECT_OPTIONS_18.map((opt) => {
                  let cls = "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300";
                  if (chosen) {
                    if (opt === item.rule) cls = "border-transparent bg-emerald-600 text-white";
                    else if (chosen === opt) cls = "border-transparent bg-rose-600 text-white";
                    else cls = "border-slate-200 bg-white text-slate-300";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                      dir="ltr"
                      className={`font-en rounded-lg border-2 px-2.5 py-1.5 text-xs font-black transition ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {chosen && (
                <div className={`mt-2 rounded-xl p-2 text-sm font-bold ${right ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                  <Rich text={right ? item.why : `القاعدة الصحيحة: ${item.rule} — ${item.why}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 7 — GOLDEN FAMILY CARDS
// ============================================================
function FamilyBoard() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const cards = [
    { en: "one child", tag: "1" },
    { en: "two children", tag: "2+" },
    ...FAMILIES_18.family.slice(2).map((t, i) => ({ en: t, reveal: FAMILIES_18.familyReveal[i] })),
  ];
  return (
    <LabPanel emoji="👨‍‍👧" label="GOLDEN FAMILY CARDS" ar="احفظ الكلمة كعائلة: الكلمة + الجمع + الفعل" seq="l18-family">
      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l18-family-cards" className="ltr-row grid gap-2 sm:grid-cols-2">
        {cards.map((c, i) => {
          const isSentence = i >= 2;
          const on = open.has(i);
          const verb = isSentence ? (i === 2 ? "is" : "are") : null;
          const text = isSentence && on ? c.reveal : c.en;
          const parts = verb ? text.split(verb) : [text];
          return (
            <button
              key={c.en}
              onClick={() =>
                isSentence &&
                setOpen((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
              dir="ltr"
              className={`ltr-row rounded-2xl border-2 p-3 text-left transition ${
                isSentence ? (on ? "border-emerald-300 bg-emerald-50" : "border-teal-200 bg-white hover:border-teal-300") : "border-slate-200 bg-slate-50"
              }`}
            >
              <span className={`mr-2 inline-grid h-6 w-6 place-items-center rounded-lg text-xs font-black ${isSentence ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-600"}`}>
                {c.tag}
              </span>
              <span dir="ltr" className="font-en text-base font-black text-slate-900">
                {parts[0]}
                {verb && (
                  <span className={`mx-0.5 rounded-md px-1.5 ${isSentence ? (verb === "is" ? "bg-sky-200 text-sky-900" : "bg-amber-200 text-amber-900") : ""}`}>
                    {verb}
                  </span>
                )}
                {parts[1] ?? ""}
                {isSentence && !on && <span hidden dir="ltr">{c.reveal}</span>}
              </span>
              {isSentence && (
                <span className="mr-auto text-xs font-bold text-slate-400" dir="rtl">
                  {on ? "أخفيت" : "اضغط لإكمال الجملة"}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 8 — IS / ARE CONTROL PANEL
// ============================================================
function VerbSentence({ sentence, verb, active }: { sentence: string; verb: string; active: boolean }) {
  const m = sentence.match(new RegExp(`^(.*?)\\b(${verb})\\b(.*)$`));
  const head = m ? m[1] : sentence;
  const tail = m ? m[3] : "";
  return (
    <div
      dir="ltr"
      className={`flex flex-wrap items-center justify-center gap-1 rounded-xl px-3 py-2 transition ${
        active ? "bg-white shadow" : "bg-slate-50 opacity-60"
      }`}
    >
      <span dir="ltr" className="font-en text-base font-black text-slate-800">
        {head}
      </span>
      <span
        dir="ltr"
        className={`font-en rounded-lg px-2 py-0.5 text-base font-black ${
          active ? (verb === "is" || verb === "was" ? "bg-sky-200 text-sky-900" : "bg-amber-200 text-amber-900") : "bg-slate-100 text-slate-400"
        }`}
      >
        {verb}
      </span>
      <span dir="ltr" className="font-en text-base font-black text-slate-800">
        {tail}
      </span>
    </div>
  );
}

function IsAreBoard() {
  const [mode, setMode] = useState<"sing" | "pl">("pl");
  return (
    <LabPanel emoji="🎚️" label="IS / ARE CONTROL PANEL" ar="المفرد: is — الجمع: are" seq="l18-isare">
      <div className="mb-3 flex justify-center gap-2">
        <button
          onClick={() => setMode("sing")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            mode === "sing" ? "bg-sky-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          مفرد ← is
        </button>
        <button
          onClick={() => setMode("pl")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            mode === "pl" ? "bg-amber-500 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          جمع ← are
        </button>
      </div>
      <div className="grid gap-3">
        {IS_ARE_18.pairs.map((p, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-2">
            <VerbSentence sentence={p.sing} verb="is" active={mode === "sing"} />
            <VerbSentence sentence={p.pl} verb="are" active={mode === "pl"} />
          </div>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 9 — WAS / WERE CONTROL PANEL
// ============================================================
function WasWereBoard() {
  const [mode, setMode] = useState<"sing" | "pl">("pl");
  return (
    <LabPanel emoji="🕰️" label="WAS / WERE CONTROL PANEL" ar="نفس الفكرة في الماضي: was / were" seq="l18-waswere">
      <div className="mb-3 flex justify-center gap-2">
        <button
          onClick={() => setMode("sing")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            mode === "sing" ? "bg-sky-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          مفرد ← was
        </button>
        <button
          onClick={() => setMode("pl")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            mode === "pl" ? "bg-amber-500 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          جمع ← were
        </button>
      </div>
      <div className="grid gap-3">
        {WAS_WERE_18.pairs.map((p, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-2">
            <VerbSentence sentence={p.sing} verb="was" active={mode === "sing"} />
            <VerbSentence sentence={p.pl} verb="were" active={mode === "pl"} />
          </div>
        ))}
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l18-waswere-rule" className="ltr-row mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center">
          <En className="text-base font-black text-sky-900">{WAS_WERE_18.quickRule.singular}</En>
          <div dir="ltr" className="mt-1 flex justify-center">
            <En className="rounded-xl bg-white px-3 py-1.5 text-lg font-black text-sky-800">{WAS_WERE_18.quickRule.singularVerbs}</En>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
          <En className="text-base font-black text-amber-900">{WAS_WERE_18.quickRule.plural}</En>
          <div dir="ltr" className="mt-1 flex justify-center">
            <En className="rounded-xl bg-white px-3 py-1.5 text-lg font-black text-amber-800">{WAS_WERE_18.quickRule.pluralVerbs}</En>
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 10 — PRESENT SIMPLE CONNECTION MACHINE
// ============================================================
function PresentSimpleBoard() {
  const [mode, setMode] = useState<"boy" | "boys">("boy");
  const cur = mode === "boy" ? PRESENT_18.singular : PRESENT_18.plural;
  const both = [
    { key: "boy" as const, data: PRESENT_18.singular, pron: "He", demo: "He plays" },
    { key: "boys" as const, data: PRESENT_18.plural, pron: "They", demo: "They play" },
  ];
  return (
    <LabPanel emoji="⚡" label="PRESENT SIMPLE CONNECTION MACHINE" ar="الفاعل يحدد الفعل: He plays / They play" seq="l18-present">
      <div className="mb-3 flex justify-center gap-2">
        <button
          onClick={() => setMode("boy")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            mode === "boy" ? "bg-teal-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          <En className="font-black">The boy</En>
        </button>
        <button
          onClick={() => setMode("boys")}
          className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
            mode === "boys" ? "bg-teal-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
          }`}
        >
          <En className="font-black">The boys</En>
        </button>
      </div>

      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l18-present-chain" className="ltr-row grid justify-items-center gap-1 rounded-3xl border-2 border-white bg-white p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className={`font-en rounded-xl px-3 py-1.5 text-base font-black ${mode === "boy" ? "bg-teal-600 text-white" : "bg-teal-100 text-teal-800"}`}>
            {mode === "boy" ? "The boy" : "The boys"}
          </span>
          <span dir="ltr" className="font-en text-sm font-black text-slate-400">
            =
          </span>
          <span dir="ltr" className="font-en rounded-xl bg-violet-100 px-3 py-1.5 text-base font-black text-violet-800">
            {mode === "boy" ? "He" : "They"}
          </span>
        </div>
        <span dir="ltr" className="font-en text-lg font-black text-teal-400">
          ↓
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="font-en rounded-xl bg-slate-100 px-3 py-1.5 text-base font-black text-slate-700">
            {mode === "boy" ? "He plays" : "They play"}
          </span>
          <span dir="ltr" className="font-en text-sm font-black text-slate-400">
            ←
          </span>
          <span dir="ltr" className={`font-en rounded-xl px-3 py-1.5 text-base font-black ${mode === "boy" ? "bg-amber-300 text-amber-950" : "bg-emerald-300 text-emerald-950"}`}>
            {cur.verb}
          </span>
        </div>
        <span dir="ltr" className="font-en text-lg font-black text-teal-400">
          ↓
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="font-en rounded-2xl border-2 border-teal-300 bg-teal-50 px-4 py-2 text-lg font-black text-teal-900">
            {cur.sentence}
          </span>
        </div>
        {mode === "boys" && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span dir="rtl" className="text-xs font-bold text-rose-500">
              <Rich text={cur.andNot} />
            </span>
            <span dir="ltr" className="font-en rounded-xl bg-rose-100 px-3 py-1.5 text-base font-black text-rose-700 line-through">
              {cur.notVerb}
            </span>
          </div>
        )}
      </div>

      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l18-present-both" className="ltr-row grid gap-2 md:grid-cols-2">
        {both.map((side) => (
          <div key={side.key} className={`rounded-3xl border-2 p-3 ${mode === side.key ? "border-teal-300 bg-white shadow" : "border-slate-200 bg-white/70"}`}>
            <div className="flex items-center justify-center gap-2">
              <span dir="ltr" className={`font-en rounded-lg px-2.5 py-1 text-sm font-black ${mode === side.key ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                {side.data.label}
              </span>
              <En className="text-base font-black text-slate-800">{side.data.sentence}</En>
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
              <span dir="rtl" className="text-xs font-bold text-slate-400">
                <Rich text={side.data.because} />
              </span>
              <span dir="ltr" className="font-en rounded-lg bg-violet-100 px-2 py-0.5 text-xs font-black text-violet-800">
                {side.data.because1}
              </span>
              <span dir="rtl" className="text-xs font-bold text-slate-400">
                <Rich text={side.data.so} />
              </span>
              <span dir="ltr" className="font-en rounded-lg bg-amber-200 px-2 py-0.5 text-xs font-black text-amber-950">
                {side.data.verb}
              </span>
            </div>
            {side.key === "boys" && (
              <div className="mt-1.5 flex items-center justify-center gap-1.5">
                <span dir="rtl" className="text-xs font-bold text-rose-500">
                  <Rich text={side.data.andNot} />
                </span>
                <span dir="ltr" className="font-en rounded-lg bg-rose-100 px-2 py-0.5 text-xs font-black text-rose-700 line-through">
                  {side.data.notVerb}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 text-center text-sm font-bold text-slate-500">
        <Rich text="قارن بعناية:" />
      </div>
      <div className="grid gap-2">
        {PRESENT_18.compare.map((c, i) => (
          <div key={i} className="grid gap-1.5 sm:grid-cols-2">
            <VerbSentence sentence={c.sing} verb={["works", "studies", "plays"][i]} active={false} />
            <VerbSentence sentence={c.pl} verb={["work", "study", "play"][i]} active={false} />
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-2xl border-2 border-violet-200 bg-violet-50 p-3">
        <div className="text-center text-sm font-bold text-violet-700">
          <Rich text={`${PRESENT_18.surprise1} ${PRESENT_18.surprise2}`} />
        </div>
        <div dir="ltr" className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="font-en rounded-xl bg-emerald-100 px-3 py-1.5 text-base font-black text-emerald-800">
            {PRESENT_18.surprise3} ✅
          </span>
          <span dir="rtl" className="text-xs font-bold text-slate-500">
            <Rich text={PRESENT_18.andNot} />
          </span>
          <span dir="ltr" className="font-en rounded-xl bg-rose-100 px-3 py-1.5 text-base font-black text-rose-700 line-through">
            {PRESENT_18.surprise4} ❌
          </span>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 11 — ERROR REPAIR LAB
// ============================================================
function ErrorsBoard() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const norm = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
  const score = COMMON_ERRORS_18.reduce(
    (s, it, i) => s + (checked.has(i) && norm(typed[i] || "") === norm(it.correct) ? 1 : 0),
    0
  );
  return (
    <LabPanel emoji="🔧" label="ERROR REPAIR LAB" ar="المعمل: أصلح الأخطاء الثمانية" seq="l18-errors">
      <div className="grid gap-3">
        {COMMON_ERRORS_18.map((item, i) => {
          const isOn = checked.has(i);
          const right = isOn && norm(typed[i] || "") === norm(item.correct);
          const shown = revealed.has(i);
          return (
            <div
              key={item.n}
              className={`rounded-3xl border-2 p-4 transition ${
                isOn ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">{item.n}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-400">{item.label}</div>
                  <div dir="ltr">
                    <En className="block text-base font-extrabold text-rose-700 line-through decoration-rose-300">{item.wrong}</En>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                <input
                  dir="ltr"
                  type="text"
                  value={typed[i] || ""}
                  onChange={(e) => setTyped((t) => ({ ...t, [i]: e.target.value }))}
                  placeholder="اكتب الصيغة الصحيحة..."
                  className="font-en w-full max-w-sm flex-1 rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-teal-400"
                />
                <button
                  onClick={() => setChecked((c) => new Set(c).add(i))}
                  className="rounded-xl bg-teal-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
                >
                  صحح
                </button>
                <button
                  onClick={() => setRevealed((r) => new Set(r).add(i))}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-teal-300"
                >
                  اكشف الحل
                </button>
              </div>
              {isOn && (
                <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
                  {right ? "✓ أحسنت!" : "✕ حاول مجدداً أو اكشف الحل."}
                </div>
              )}
              {shown && (
                <div className="mt-2 pr-11" dir="ltr">
                  <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                    {item.correct} ✅
                  </En>
                  {item.alt && (
                    <div className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-500">
                      <span dir="rtl">
                        <Rich text={item.altLabel ?? ""} />
                      </span>
                      <En className="text-base font-black text-emerald-700">{item.alt} ✅</En>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">
        النتيجة: {score} / {COMMON_ERRORS_18.length}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 12 — Grammar Detective
// ============================================================
function DetectiveEx() {
  const [typePick, setTypePick] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const score = DETECTIVE_18.sentences.reduce((s, it, i) => s + (typePick[i] === it.type ? 1 : 0), 0);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-teal-700">
          🕵️ <Rich text={DETECTIVE_18.intro1} />
        </div>
        <div className="text-center text-base font-bold text-slate-700">
          <Rich text={`${DETECTIVE_18.intro2} ${DETECTIVE_18.intro3}`} />
        </div>
      </div>

      <div className="grid gap-3">
        {DETECTIVE_18.sentences.map((s, i) => {
          const pick = typePick[i];
          const typeRight = pick === s.type;
          const shown = revealed.has(i);
          return (
            <div
              key={s.n}
              className={`rounded-3xl border-2 p-4 transition ${
                pick ? (typeRight ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40") : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{s.n}</span>
                <div dir="ltr" className="min-w-0 flex-1">
                  <En className="block text-base font-extrabold text-slate-900">{s.wrong}</En>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 pr-11">
                <span className="text-xs font-bold text-slate-500">نوع الخطأ:</span>
                {(Object.keys(DETECTIVE_18.types) as (keyof typeof DETECTIVE_18.types)[]).map((k) => (
                  <button
                    key={k}
                    onClick={() => setTypePick((p) => ({ ...p, [i]: k }))}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      pick === k
                        ? typeRight
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                        : "border-2 border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-300"
                    }`}
                  >
                    {DETECTIVE_18.types[k]}
                  </button>
                ))}
                <button
                  onClick={() => typeRight && setRevealed((r) => new Set(r).add(i))}
                  disabled={!typeRight}
                  className="rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-bold text-white transition enabled:hover:bg-teal-700 disabled:opacity-30"
                >
                  🎯 {DETECTIVE_18.solutionLabel}
                </button>
              </div>
              {pick && !typeRight && (
                <div className="mt-2 pr-11 text-sm font-bold text-rose-700">✕ هذا ليس نوع الخطأ — حاول مجدداً.</div>
              )}
              <div className="mt-3 pr-11" dir="ltr" hidden={!shown}>
                <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                  {s.correct}
                </En>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">
        النتيجة: {score} / {DETECTIVE_18.sentences.length}
      </div>
    </div>
  );
}

// ============================================================
// 13 — Challenge 1
// ============================================================
function Challenge1Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const score = CHALLENGE1_18.reduce((s, it, i) => s + (picked[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {CHALLENGE1_18.map((item, i) => {
        const chosen = picked[i];
        const right = chosen === item.answer;
        return (
          <div
            key={item.n}
            className={`rounded-3xl border-2 p-4 transition ${
              chosen ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{item.n}</span>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-1 flex-wrap items-center gap-2">
                <En className="rounded-xl bg-teal-50 px-3 py-2 text-base font-black text-teal-900">{item.word}</En>
                <span dir="ltr" className="font-en text-lg font-black text-amber-500">
                  →
                </span>
                <span dir="ltr" className={`font-en rounded-xl px-3 py-2 text-base font-black ${chosen ? (right ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700") : "bg-slate-100 text-slate-300"}`}>
                  {chosen ?? "______"}
                </span>
                {right && (
                  <span dir="ltr" className="font-en rounded-lg bg-violet-600 px-2 py-1 text-xs font-black text-white">
                    {item.rule}
                  </span>
                )}
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap gap-1.5 pr-11">
              {CHALLENGE1_BANK_18.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                  dir="ltr"
                  className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                    chosen === opt
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {chosen && !right && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-700" dir="ltr">
                <En>الصحيح: {item.answer}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">
        النتيجة: {score} / {CHALLENGE1_18.length}
      </div>
    </div>
  );
}

// ============================================================
// 14 — Challenge 2 (A / B / C)
// ============================================================
function Challenge2Ex() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = CHALLENGE2_18.reduce((s, it, i) => s + (answers[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {CHALLENGE2_18.map((item, i) => {
        const picked = answers[i];
        const done = picked !== undefined;
        const right = picked === item.answer;
        return (
          <div
            key={item.n}
            className={`rounded-3xl border-2 p-4 transition ${
              done ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{item.n}</span>
              <div className="min-w-0 flex-1" dir="ltr">
                <En className="block text-base font-extrabold text-slate-900">{item.stem}</En>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} data-en-seq={`l18-opts-${i + 1}`} className="ltr-row mt-3 grid gap-2 pr-11">
              {item.options.map((opt, oi) => {
                const isAnswer = oi === item.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-400";
                if (done) {
                  if (isAnswer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (picked === oi) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                }
                return (
                  <button
                    key={opt}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    dir="ltr"
                    data-en-opt={["A", "B", "C"][oi]}
                    className={`font-en flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-base font-bold transition active:scale-[0.98] ${cls}`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-900/10 text-xs font-black">
                      {["A", "B", "C"][oi]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">
        النتيجة: {score} / {CHALLENGE2_18.length}
      </div>
    </div>
  );
}

// ============================================================
// 15 — Challenge 3 (is or are)
// ============================================================
function Challenge3Ex() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const score = CHALLENGE3_18.reduce((s, it, i) => s + (answers[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {CHALLENGE3_18.map((item, i) => {
        const picked = answers[i];
        const right = picked === item.answer;
        return (
          <div
            key={item.n}
            className={`rounded-3xl border-2 p-4 transition ${
              picked ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{item.n}</span>
              <div className="min-w-0 flex-1" dir="ltr">
                <En className="block text-base font-extrabold text-slate-900">{item.stem}</En>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex gap-2 pr-11">
              {["is", "are"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswers((a) => ({ ...a, [i]: opt }))}
                  dir="ltr"
                  className={`font-en rounded-xl border-2 px-5 py-2 text-base font-black transition ${
                    picked === opt
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {picked && !right && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-700" dir="ltr">
                <En>الصحيح: {item.answer}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-teal-100 bg-teal-50 p-3 text-center text-sm font-bold text-teal-800">
        النتيجة: {score} / {CHALLENGE3_18.length}
      </div>
    </div>
  );
}

// ============================================================
// 16 — IQ200 Challenge (صحح الجمل)
// ============================================================
function IQ200Ex() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const norm = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
  const score = IQ200_18.sentences.reduce(
    (s, it, i) => s + (checked.has(i) && norm(typed[i] || "") === norm(it.correct) ? 1 : 0),
    0
  );
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4">
        <div className="text-center text-base font-bold text-slate-700">
          <Rich text={IQ200_18.intro1} />
        </div>
        <div className="mt-1 text-center text-lg font-black text-fuchsia-700">
          <Rich text={IQ200_18.intro2} />
        </div>
      </div>
      <div className="grid gap-3">
        {IQ200_18.sentences.map((item, i) => {
          const isOn = checked.has(i);
          const right = isOn && norm(typed[i] || "") === norm(item.correct);
          const shown = revealed.has(i);
          return (
            <div
              key={item.n}
              className={`rounded-3xl border-2 p-4 transition ${
                isOn ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">{item.n}</span>
                <div dir="ltr" className="min-w-0 flex-1">
                  <En className="block text-base font-extrabold text-rose-700 line-through decoration-rose-300">{item.wrong}</En>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                <input
                  dir="ltr"
                  type="text"
                  value={typed[i] || ""}
                  onChange={(e) => setTyped((t) => ({ ...t, [i]: e.target.value }))}
                  placeholder="اكتب الجملة الصحيحة..."
                  className="font-en w-full max-w-sm flex-1 rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-fuchsia-400"
                />
                <button
                  onClick={() => setChecked((c) => new Set(c).add(i))}
                  className="rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-fuchsia-700"
                >
                  صحح
                </button>
                <button
                  onClick={() => setRevealed((r) => new Set(r).add(i))}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-fuchsia-300"
                >
                  اكشف الحل
                </button>
              </div>
              {isOn && (
                <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
                  {right ? "✓ أحسنت!" : "✕ حاول مجدداً أو اكشف الحل."}
                </div>
              )}
              {shown && (
                <div className="mt-2 pr-11" dir="ltr">
                  <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                    {item.correct}
                  </En>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-fuchsia-100 bg-fuchsia-50 p-3 text-center text-sm font-bold text-fuchsia-800">
        النتيجة: {score} / {IQ200_18.sentences.length}
      </div>
    </div>
  );
}

// ============================================================
// 17 — IQ200 — لماذا؟
// ============================================================
function IQ200WhyEx() {
  const [step, setStep] = useState({ a: 0, b: 0 });
  const chains = [
    { key: "a" as const, sentence: IQ200_WHY_18.sentence1, chain: IQ200_WHY_18.chain1, result: IQ200_WHY_18.result1, color: "teal", question: IQ200_WHY_18.question1 },
    { key: "b" as const, sentence: IQ200_WHY_18.sentence2, chain: IQ200_WHY_18.chain2, result: IQ200_WHY_18.result2, color: "violet", question: "" },
  ];
  const colors = {
    teal: { border: "border-teal-300", chip: "bg-teal-600 text-white", soft: "bg-teal-50 border-teal-200", result: "bg-teal-100 text-teal-900" },
    violet: { border: "border-violet-300", chip: "bg-violet-600 text-white", soft: "bg-violet-50 border-violet-200", result: "bg-violet-100 text-violet-900" },
  };
  return (
    <div className="space-y-4" data-en-seq="l18-iq200why">
      <div className="grid gap-3 md:grid-cols-2">
        {chains.map((c) => {
          const cur = step[c.key];
          const done = cur >= c.chain.length;
          const cCls = colors[c.color];
          return (
            <div key={c.key} className={`rounded-3xl border-2 bg-white p-4 ${cCls.border}`}>
              <div dir="ltr" className="text-center">
                <En className="text-lg font-black text-slate-900">{c.sentence}</En>
              </div>
              {c.question && (
                <div className="mt-1 text-center text-sm font-bold text-slate-500">
                  <Rich text={c.question} />
                </div>
              )}
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid justify-items-center gap-1">
                {c.chain.map((seg, si) => (
                  <div key={seg} className="flex w-full flex-col items-center gap-1">
                    {si > 0 && (
                      <span dir="ltr" className="font-en text-base font-black text-slate-300">
                        ↓
                      </span>
                    )}
                    <span
                      dir="ltr"
                      className={`font-en w-full rounded-xl border-2 px-3 py-2 text-center text-sm font-black transition ${
                        si < cur ? cCls.soft + " " + (c.color === "teal" ? "text-teal-900" : "text-violet-900") : "border-slate-200 bg-slate-50 text-slate-300"
                      }`}
                    >
                      {si < cur ? seg : (
                        <>
                          <span hidden dir="ltr">{seg}</span>
                          ???
                        </>
                      )}
                    </span>
                  </div>
                ))}
                <div className="flex w-full flex-col items-center gap-1" hidden={!done}>
                  <span dir="ltr" className="font-en text-base font-black text-slate-300">
                    ↓
                  </span>
                  <span dir="rtl" className="text-xs font-bold text-slate-500">
                    <Rich text={IQ200_WHY_18.so} />
                  </span>
                  <span dir="ltr" className={`font-en w-full rounded-xl border-2 px-3 py-2 text-center text-base font-black ${cCls.result}`}>
                    {c.result}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-2">
                <button
                  onClick={() => setStep((s) => ({ ...s, [c.key]: Math.min(s[c.key] + 1, c.chain.length) }))}
                  disabled={done}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold text-white transition enabled:hover:brightness-110 disabled:opacity-30 ${cCls.chip}`}
                >
                  {done ? "اكتمل ✓" : "الخطوة التالية"}
                </button>
                <button
                  onClick={() => setStep((s) => ({ ...s, [c.key]: 0 }))}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:border-slate-400"
                >
                  ↺
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
        <Rich text={`🔥 ${IQ200_WHY_18.fire}`} className="text-base font-black text-amber-800" />
        <div className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={IQ200_WHY_18.connect} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {IQ200_WHY_18.links.map((l) => (
            <span key={l} dir="ltr" className="font-en rounded-xl border-2 border-amber-300 bg-white px-3 py-1.5 text-sm font-black text-amber-900">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 18 — FINAL BOSS
// ============================================================
function FinalBossEx() {
  const [identified, setIdentified] = useState<Set<number>>(new Set());
  const [openQ, setOpenQ] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4" data-en-seq="l18-boss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-sm font-bold text-amber-700">🏆 FINAL BOSS — تحدي المرحلة</div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={FINAL_BOSS_18.readLabel} />
        </div>
        <div dir="ltr" className="mt-2 rounded-2xl border-2 border-amber-200 bg-white p-4">
          <En className="block text-base font-bold leading-relaxed text-slate-900">{FINAL_BOSS_18.passage}</En>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-teal-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-teal-700">
          🔍 الخطوة 1 — تحقق من الكلمات الست: كمفرد/جمع؟ وعادي/شاذ؟
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap justify-center gap-2">
          {FINAL_BOSS_18.targets.map((t, i) => {
            const on = identified.has(i);
            return (
              <button
                key={t.word}
                onClick={() =>
                  setIdentified((s) => {
                    const n = new Set(s);
                    if (n.has(i)) n.delete(i);
                    else n.add(i);
                    return n;
                  })
                }
                dir="ltr"
                className={`rounded-xl border-2 px-3 py-2 text-left transition ${
                  on ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:border-teal-300"
                }`}
              >
                <span dir="ltr" className="font-en text-base font-black text-slate-900">
                  {t.word}
                </span>
                <div className="mt-1 flex flex-wrap justify-center gap-1">
                  <span dir="ltr" className={`font-en rounded-md px-1.5 py-0.5 text-[10px] font-black ${on ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-400"}`}>
                    {on ? t.kind : "؟"}
                  </span>
                  <span dir="ltr" className={`font-en rounded-md px-1.5 py-0.5 text-[10px] font-black ${on ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-400"}`}>
                    {on ? t.rule : "؟"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        <div className="mt-2 text-center text-xs font-bold text-slate-400">
          تم التعرف: {identified.size} / {FINAL_BOSS_18.targets.length}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-violet-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-violet-700">
          🧠 الخطوة 2 — <Rich text={FINAL_BOSS_18.answerLabel} />
        </div>
        <div className="mt-3 grid gap-2">
          {FINAL_BOSS_18.questions.map((q, i) => {
            const on = openQ.has(i);
            return (
              <div key={q.n} className={`rounded-2xl border-2 p-3 transition ${on ? "border-violet-300 bg-violet-50/50" : "border-slate-200 bg-slate-50"}`}>
                <div className="flex items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-sm font-bold text-white">{q.n}</span>
                  <div className="min-w-0 flex-1">
                    <Rich text={q.q} className="text-base font-bold text-slate-800" />
                    {on && (
                      <div className="mt-2 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-2.5">
                        <Rich text={q.a} className="text-sm font-bold text-emerald-900" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setOpenQ((s) => {
                        const n = new Set(s);
                        if (n.has(i)) n.delete(i);
                        else n.add(i);
                        return n;
                      })
                    }
                    className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      on ? "border-2 border-violet-300 bg-white text-violet-700" : "bg-violet-600 text-white hover:bg-violet-700"
                    }`}
                  >
                    {on ? "إخفاء" : "اكشف"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 19 — Mini Game
// ============================================================
function MiniGameEx() {
  const [answers, setAnswers] = useState<Record<number, "S" | "P">>({});
  const [shake, setShake] = useState<number | null>(null);
  const score = MINI_GAME_18.words.reduce((s, it, i) => {
    const a = answers[i];
    if (!a) return s;
    if (it.word === "sheep") return s + 1;
    return s + (a === it.kind ? 1 : 0);
  }, 0);
  const pick = (i: number, v: "S" | "P") => {
    setAnswers((p) => ({ ...p, [i]: v }));
    const it = MINI_GAME_18.words[i];
    const ok = it.word === "sheep" ? true : v === it.kind;
    if (!ok) {
      setShake(i);
      setTimeout(() => setShake(null), 450);
    }
  };
  return (
    <LabPanel emoji="🎮" label="MINI GAME — SINGULAR OR PLURAL?" ar="سريع: S = Singular أو P = Plural؟" seq="l18-game">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm font-bold text-slate-600">
          <Rich text={MINI_GAME_18.instruction} />
        </span>
        <span dir="ltr" className="font-en rounded-lg bg-teal-600 px-2.5 py-1 text-xs font-black text-white">
          {MINI_GAME_18.sLabel}
        </span>
        <span dir="ltr" className="font-en rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-black text-white">
          {MINI_GAME_18.pLabel}
        </span>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {MINI_GAME_18.words.map((w, i) => {
          const a = answers[i];
          const isSheep = w.word === "sheep";
          const ok = a ? (isSheep ? true : a === w.kind) : null;
          return (
            <div
              key={w.word}
              data-en-word={w.word}
              className={`flex items-center justify-between rounded-2xl border-2 p-2.5 transition ${
                a ? (ok ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white"
              } ${shake === i ? "shake" : ""}`}
            >
              <span dir="ltr" className="font-en text-lg font-black text-slate-900">
                {w.n} {w.word}
              </span>
              <span className="flex gap-1.5">
                {(["S", "P"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => pick(i, v)}
                    dir="ltr"
                    className={`font-en grid h-8 w-8 place-items-center rounded-lg text-sm font-black transition ${
                      a === v
                        ? ok
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                        : v === "S"
                          ? "border-2 border-teal-200 bg-teal-50 text-teal-700 hover:border-teal-400"
                          : "border-2 border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-400"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </span>
            </div>
          );
        })}
      </div>
      {MINI_GAME_18.words.some((w) => answers[MINI_GAME_18.words.indexOf(w)] && w.word === "sheep") && (
        <div className="mt-2 rounded-xl bg-cyan-50 p-2 text-center text-sm font-bold text-cyan-800">
          <Rich text={MINI_GAME_18.sheepNote} />
        </div>
      )}
      <div className="mt-3 flex items-center justify-center gap-3">
        <span className="rounded-2xl border-2 border-teal-100 bg-white px-4 py-2 text-sm font-bold text-teal-800">
          النتيجة: {score} / {MINI_GAME_18.words.length}
        </span>
        <button
          onClick={() => setAnswers({})}
          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-teal-300"
        >
          ↺ العب مجددًا
        </button>
      </div>
    </LabPanel>
  );
}

// ============================================================
// شرائط عامة
// ============================================================
function FormulaStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l18-fstrip" className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span key={item} dir="ltr" className="font-en rounded-xl border-2 border-teal-200 bg-white px-3 py-2 text-sm font-black text-teal-800">
          {item}
        </span>
      ))}
    </div>
  );
}

function MixedStrip({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-xl border-2 border-amber-200 bg-amber-50 px-3 py-2 text-sm font-black text-amber-800">
          <Rich text={item} />
        </span>
      ))}
    </div>
  );
}

function ArrowChain({ items }: { items: string[] }) {
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l18-chain"
      className="ltr-row grid justify-items-center gap-1 rounded-3xl border-2 border-cyan-200 bg-cyan-50 p-4"
    >
      {items.map((item, i) => (
        <div key={item} className="flex flex-col items-center gap-1">
          {i > 0 && (
            <span dir="ltr" className="font-en text-lg font-black text-cyan-400">
              ↓
            </span>
          )}
          <span
            dir="ltr"
            className={`font-en rounded-xl px-4 py-2 text-base font-black ${
              i % 2 === 0 ? "bg-white text-slate-800 shadow-sm" : "bg-cyan-100 text-cyan-900"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Exercise dispatcher
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise18 }) {
  switch (exercise.type) {
    case "detective":
      return <DetectiveEx />;
    case "challenge1":
      return <Challenge1Ex />;
    case "challenge2":
      return <Challenge2Ex />;
    case "challenge3":
      return <Challenge3Ex />;
    case "iq200":
      return <IQ200Ex />;
    case "iq200why":
      return <IQ200WhyEx />;
    case "finalBoss":
      return <FinalBossEx />;
    case "miniGame":
      return <MiniGameEx />;
  }
}

// ============================================================
// Block dispatcher
// ============================================================
function BlockView({ block }: { block: Block18 }) {
  switch (block.type) {
    case "text":
      return <TextBlock text={block.text} className="text-base font-semibold leading-relaxed text-slate-700 md:text-lg" />;
    case "english":
      return <SourceLine en={block.en} ar={block.ar} tone={block.tone} />;
    case "mixed":
      return <MixedLine text={block.text} />;
    case "note":
      return <Note emoji={block.emoji} text={block.text} />;
    case "formulaStrip":
      return <FormulaStrip items={block.items} />;
    case "mixedStrip":
      return <MixedStrip items={block.items} />;
    case "arrowChain":
      return <ArrowChain items={block.items} />;
    case "singPluralBoard":
      return <SingPluralBoard />;
    case "aAnBoard":
      return <AAnBoard />;
    case "regularBoard":
      return <RegularBoard />;
    case "ruleDetector":
      return <RuleDetector />;
    case "transformMachine":
      return <TransformMachine />;
    case "esBoard":
      return <EsBoard />;
    case "sesiesLab":
      return <SeSiesLab />;
    case "yBoard":
      return <YBoard />;
    case "yMachine":
      return <YMachine />;
    case "yMiniChallenge":
      return <YMiniChallenge />;
    case "feBoard":
      return <FeBoard />;
    case "feCautionLab":
      return <FeCautionLab />;
    case "monsterBoard":
      return <MonsterBoard />;
    case "sameFormBoard":
      return <SameFormBoard />;
    case "goldenTable":
      return <GoldenTable />;
    case "familyBoard":
      return <FamilyBoard />;
    case "isAreBoard":
      return <IsAreBoard />;
    case "wasWereBoard":
      return <WasWereBoard />;
    case "presentSimpleBoard":
      return <PresentSimpleBoard />;
    case "errorsBoard":
      return <ErrorsBoard />;
  }
}

// ============================================================
// Cover
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-teal-200 bg-gradient-to-br from-teal-600 via-cyan-700 to-violet-800 p-8 text-white shadow-xl md:p-12">
      <div className="text-7xl anim-float">🔢</div>
      <div dir="ltr" className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
        <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.22em] text-amber-200">
          {LAB_NAME_18}
        </span>
      </div>
      <h1 className="font-head mt-4 text-3xl font-bold md:text-5xl">
        <Rich text={LESSON_TITLE_18} />
      </h1>
      <div dir="ltr" className="mt-2 text-left md:text-right">
        <En className="text-xl font-bold text-teal-100">{LESSON_SUBTITLE_18}</En>
      </div>
      <div className="mt-6 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-teal-50">
        <Rich text={COVER_INTRO_18} />
      </div>

      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        data-en-seq="l18-flow"
        className="ltr-row mt-6 grid justify-items-center gap-1 rounded-2xl bg-white/10 p-4"
      >
        {LAB_FLOW_18.map((f, i) => (
          <div key={f} className="flex flex-col items-center gap-1">
            {i > 0 && (
              <span dir="ltr" className="font-en text-lg font-black text-amber-200">
                ↓
              </span>
            )}
            <span
              dir="ltr"
              className={`font-en rounded-xl px-4 py-1.5 text-base font-black ${
                i === 3 ? "bg-amber-300 text-amber-950" : "bg-white/20 text-white"
              }`}
            >
              {f}
            </span>
          </div>
        ))}
      </div>

      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {TRANSFORM_MACHINE_18.map((p) => (
          <div key={p.sing} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-2 py-2">
            <span dir="ltr" className="font-en text-sm font-black">
              {p.sing}
            </span>
            <span dir="ltr" className="font-en text-amber-200">
              →
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-amber-300/25 px-1.5 py-0.5 text-sm font-black text-amber-100">
              {p.plural}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="text-sm font-bold text-teal-100">
          <Rich text={COVER_LINKS_LEAD_18} />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {COVER_LINKS_18.map((l) => (
            <span key={l} className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-bold">
              <Rich text={l} />
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-teal-100">
        <Rich text={LAB_MOTTO_18} />
      </div>
    </div>
  );
}

// ============================================================
// Objectives
// ============================================================
const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس، يجب أن تكون قادرًا على:">
      <div className="grid gap-2">
        {OBJECTIVES_18.map((obj, i) => (
          <div key={obj.n} className="rounded-2xl border-2 border-teal-100 bg-teal-50/50 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">
                {obj.n || CIRCLED[i]}
              </span>
              <Rich text={obj.text} className="font-semibold text-slate-800" />
            </div>
            {obj.items && (
              <div
                dir={obj.itemsEn ? "ltr" : "rtl"}
                style={{ direction: obj.itemsEn ? "ltr" : "rtl" }}
                className={`ltr-row mt-2 flex flex-wrap gap-1.5 pr-11 ${obj.itemsEn ? "justify-start" : ""}`}
              >
                {obj.items.map((it) => (
                  <span
                    key={it}
                    dir={obj.itemsEn ? "ltr" : "rtl"}
                    className={`rounded-lg px-2.5 py-1 text-sm font-bold ${
                      obj.itemsEn ? "font-en bg-white text-teal-800" : "bg-white text-slate-700"
                    }`}
                  >
                    {it}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// خلاصة الدرس
// ============================================================
function Summary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[20]} title="خلاصة الدرس" lead={SUMMARY_18.intro}>
      <div className="grid gap-3">
        {SUMMARY_18.items.map((item) => (
          <div key={item.n} className="rounded-3xl border-2 border-teal-100 bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-teal-600 text-sm font-bold text-white">{item.n}</span>
              <Rich text={item.title} className="text-lg font-black text-slate-800" />
              {item.note && (
                <span className="text-xs font-bold text-slate-400">
                  <Rich text={item.note} />
                </span>
              )}
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5 pr-11">
              {item.examples.map((e) => (
                <span key={e} dir="ltr" className="font-en rounded-lg bg-teal-50 px-2.5 py-1 text-sm font-black text-teal-900">
                  {e}
                </span>
              ))}
              {item.but && (
                <span dir="rtl" className="text-xs font-bold text-slate-400">
                  <Rich text={item.but} />
                </span>
              )}
              {(item.butExamples ?? []).map((e) => (
                <span key={e} dir="ltr" className="font-en rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-black text-amber-800">
                  {e}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// أهم قاعدة يجب أن تخرج بها اليوم
// ============================================================
function KeyRule() {
  return (
    <Frame mascot="⭐" sourceHeading={SOURCE_SECTIONS[21]} title={KEY_RULE_18.title}>
      <div className="grid gap-3">
        <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4">
          <div className="text-center text-sm font-bold text-rose-600">
            <Rich text={KEY_RULE_18.dontThink} />
          </div>
          <div dir="rtl" className="mt-2 text-center">
            <Rich text={`«${KEY_RULE_18.dont}»`} className="text-xl font-black text-rose-700 line-through decoration-rose-400" />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <div className="text-center text-sm font-bold text-emerald-600">
            <Rich text={KEY_RULE_18.think} />
          </div>
          <div dir="rtl" className="mt-2 text-center">
            <Rich text={`«${KEY_RULE_18.correct}»`} className="text-xl font-black text-emerald-800" />
          </div>
        </div>
        <div className="text-center text-sm font-bold text-slate-500">
          <Rich text={KEY_RULE_18.then} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l18-keyrule" className="ltr-row grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border-2 border-teal-200 bg-white p-4">
            <En className="block text-center text-xl font-black text-teal-800">{KEY_RULE_18.regular.q}</En>
            <div dir="rtl" className="mt-2 text-center text-base font-bold text-slate-600">
              <Rich text={KEY_RULE_18.regular.a} />
            </div>
          </div>
          <div className="rounded-3xl border-2 border-violet-200 bg-white p-4">
            <En className="block text-center text-xl font-black text-violet-800">{KEY_RULE_18.irregular.q}</En>
            <div dir="rtl" className="mt-2 text-center text-base font-bold text-slate-600">
              <Rich text={KEY_RULE_18.irregular.a} />
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// أين وصلنا في المنهج؟
// ============================================================
function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[22]} title="أين وصلنا في المنهج؟" lead={ROADMAP_18_INTRO}>
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_18.map((it) => (
          <div
            key={it.n}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${
              it.here ? "border-teal-400 bg-teal-100 shadow" : "border-slate-100 bg-white"
            }`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${
                it.here ? "bg-teal-600" : "bg-slate-500"
              }`}
            >
              {it.n}
            </span>
            <div dir="ltr" className={`font-en text-sm font-bold ${it.here ? "text-teal-900" : "text-slate-700"}`}>
              {it.en}
            </div>
            {it.here && <span className="mr-auto text-lg">🔥</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 whitespace-pre-line rounded-3xl border-2 border-teal-200 bg-teal-50 p-5">
        <Rich text={ROADMAP_18_CLOSING} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" />
      </div>
    </Frame>
  );
}

const ROADMAP_18_INTRO = "أنت الآن بنيت جزءًا قويًا جدًا من أساس اللغة:";

// ============================================================
// Closing
// ============================================================
function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-teal-200 bg-gradient-to-br from-teal-600 via-cyan-700 to-violet-800 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 18.</h2>
      <div className="mt-4 text-lg leading-relaxed text-teal-50">
        <Rich text="الآن أنت تعرف أن PLURAL ليست «إضافة S» فقط: المفرد يأخذ is / was / verb+s، والجمع يأخذ are / were / base verb — والشاذ من المنتظم تُحدده القاعدة لا التخمين." />
      </div>
      <div className="mt-4 whitespace-pre-line rounded-2xl bg-white/10 p-4">
        <Rich text={ROADMAP_18_CLOSING} />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-teal-700 transition hover:bg-teal-50">
          ← جميع الدروس
        </button>
        <span className="rounded-xl border-2 border-white/40 px-5 py-3 font-bold text-white/80">
          <Rich text="الدرس 19 قريباً → Possessive Nouns" />
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Source heading resolver — يربط كل شريحة بعنوانها في المصدر
// ============================================================
function sourceHeadingFor(slide: Slide18): string | undefined {
  if (slide.kind === "objectives") return SOURCE_SECTIONS[0];
  if (slide.kind === "lesson") return SOURCE_SECTIONS[Number(slide.step)];
  if (slide.kind === "ex") {
    const n = Number(slide.badge);
    return Number.isFinite(n) && n >= 1 ? SOURCE_SECTIONS[n] : undefined;
  }
  if (slide.kind === "summary") return SOURCE_SECTIONS[20];
  if (slide.kind === "keyRule") return SOURCE_SECTIONS[21];
  if (slide.kind === "roadmap") return SOURCE_SECTIONS[22];
  return undefined;
}

export function SlideView18({ s, onExit }: { s: Slide18; onExit: () => void }) {
  switch (s.kind) {
    case "cover":
      return <Cover />;
    case "objectives":
      return <Objectives />;
    case "lesson":
      return (
        <Frame
          mascot={s.mascot}
          step={s.step}
          sourceHeading={sourceHeadingFor(s)}
          title={<Rich text={s.title} />}
          lead={s.lead}
          tip={s.tip}
        >
          {s.blocks.map((block, i) => (
            <div key={i} className={`pop pop-${Math.min(i + 1, 6)}`}>
              <BlockView block={block} />
            </div>
          ))}
        </Frame>
      );
    case "ex":
      return (
        <Frame
          mascot={s.mascot}
          badge={s.badge}
          sourceHeading={sourceHeadingFor(s)}
          title={<Rich text={s.title} />}
          lead={s.subtitle}
        >
          <ExerciseView exercise={s.ex} />
        </Frame>
      );
    case "summary":
      return <Summary />;
    case "keyRule":
      return <KeyRule />;
    case "roadmap":
      return <Roadmap />;
    case "quiz":
      return (
        <Frame
          mascot={s.mascot}
          badge="الاختبار النهائي"
          title={<Rich text={s.title} />}
          lead="أسئلة جديدة تقيس فهم الجمع: قواعد S / ES / IES / F/FE، والأسماء الشاذة، واتفاق الفعل."
        >
          <FinalQuiz lesson={18} accent="bg-teal-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide18): string {
  if (slide.kind === "cover") return "الغلاف";
  if (slide.kind === "objectives") return "أهداف الدرس";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-400",
  "المفرد ← الجمع": "text-teal-600",
  "قواعد الجمع العادي": "text-cyan-600",
  "الوحوش: الجمع الشاذ": "text-violet-600",
  "العائلات واتفاق الفعل": "text-amber-600",
  "مهمة المحقق": "text-rose-600",
  "التحديات والألعاب": "text-indigo-600",
  "الخاتمة": "text-slate-600",
};

function Rail({
  i,
  setI,
  onExit,
  onClose,
}: {
  i: number;
  setI: (n: number) => void;
  onExit: () => void;
  onClose?: () => void;
}) {
  const groups = useMemo(() => {
    const out: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, index) => {
      const last = out[out.length - 1];
      if (last && last.section === slide.section) last.indexes.push(index);
      else out.push({ section: slide.section, indexes: [index] });
    });
    return out;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">
          <Rich text="الدرس 18 · Plural Nouns" />
        </div>
        <En className="text-xs font-semibold text-slate-400">🔢 {LAB_NAME_18}</En>
        <div className="mt-2 rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-bold text-teal-600">
          {SOURCE_NUMBERED_COUNT} قسماً من المصدر · {SLIDES.length} شريحة
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] || "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((index) => {
              const active = index === i;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setI(index);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${
                    active ? "bg-teal-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      active ? "bg-white/25" : "bg-slate-100"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate font-semibold">{slideTitle(SLIDES[index])}</span>
                  <span className="mr-auto text-base">{SLIDES[index].mascot}</span>
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

export default function Lesson18({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((v) => Math.min(v + 1, total - 1)),
      prev: () => setIndex((v) => Math.max(v - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menu) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (e.key === "ArrowLeft") navigation.next();
      if (e.key === "ArrowRight") navigation.prev();
      if (e.key === " ") {
        e.preventDefault();
        navigation.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu]);

  useEffect(() => {
    document.getElementById("l18-main")?.scrollTo({ top: 0 });
  }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div
      dir="rtl"
      className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f0fdfa] text-slate-800"
    >
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail i={index} setI={setIndex} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                <Rich text={`${slide.section} · `} />
                <span className="text-slate-800">
                  <Rich text={slideTitle(slide)} />
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-teal-600 via-cyan-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {`${index + 1} / ${total}`}
            </span>
          </header>
          <main id="l18-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={index} className="pop mx-auto max-w-4xl">
              <SlideView18 s={slide} onExit={onExit} />
            </div>
          </main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
              <button
                onClick={navigation.prev}
                disabled={index === 0}
                className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30"
              >
                → السابق
              </button>
              <span className="h-6 w-px bg-slate-200" />
              <button
                onClick={navigation.next}
                disabled={index === total - 1}
                className="rounded-full bg-teal-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-teal-700 disabled:opacity-30"
              >
                التالي ←
              </button>
            </div>
          </div>
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div
            className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Rail i={index} setI={setIndex} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
