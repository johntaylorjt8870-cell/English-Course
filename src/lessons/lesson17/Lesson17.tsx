import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  OBJECTIVES_17,
  LESSON_TITLE_17,
  LAB_NAME_17,
  LAB_MOTTO_17,
  COVER_PLAN_17,
  RECAP_17,
  CORE_MAP_17,
  MUST_MEMORIZE_17,
  BASIC_DIFFERENCE_17,
  FULL_COMPARISON_17,
  MAGIC_MOVE_17,
  IQ200_EXAMPLE_17,
  THREE_SYSTEMS_17,
  FULL_EXAMPLE_17,
  WHOSE_ANSWER_17,
  CONFUSING_TRIO_17,
  TRIPLE_COMPARE_17,
  HIS_SPECIAL_17,
  HIS_DOUBLE_ROLE_17,
  HIS_DOUBLE_QUESTION_17,
  ABOUT_IT_17,
  TRANSFORM_LAB_17,
  NOUN_REMOVAL_SET_17,
  BEFORE_AFTER_17,
  BEFORE_AFTER_BANK_17,
  BEFORE_AFTER_LEFT_LABEL,
  BEFORE_AFTER_RIGHT_LABEL,
  MY_MINE_ALARM_17,
  DETECTOR_SETS_17,
  WHOSE_LAB_17,
  OWNERSHIP_MAP_17,
  NUMBER_TRAP_17,
  LEVEL1_17,
  LEVEL2_17,
  LEVEL2_17_BANK,
  LEVEL3_17,
  LEVEL4_17,
  LEVEL5_17,
  LEVEL5_17_BANK,
  LEVEL6_17,
  DETECTIVE_PASSAGE_17,
  DETECTIVE_TARGETS_17,
  DETECTIVE_EXTRACT_17,
  DETECTIVE_ASK_17,
  DETECTIVE_QUESTIONS_17,
  DETECTIVE_SKILL_17,
  IQ200_CHALLENGE_17,
  IQ200_CHALLENGE2_17,
  FINAL_CHALLENGE_17,
  GRAND_SUMMARY_17,
  IQ200_RULE_17,
  FIVE_FORBIDDEN_17,
  ROADMAP_17,
  ROADMAP_17_CLOSING,
  type Block17,
  type Exercise17,
  type Slide17,
  type PairBoard,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 17 — OWNERSHIP TRANSFORMATION LAB
// Possessive Adjective + Noun → حذف الاسم → Possessive Pronoun
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
    <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
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
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(79,70,229,0.22)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-lg font-bold text-white">
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-bold text-indigo-800">
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
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-indigo-600 to-violet-600 p-4 text-white">
          <span className="text-2xl">🦉</span>
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
      className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-indigo-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.18em] text-indigo-500">
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
// 1 — تذكير سريع من الدرس 16
// ============================================================
function RecapBoard() {
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l17-recap"
      className="ltr-row grid gap-2 rounded-3xl border-2 border-slate-200 bg-white p-4 sm:grid-cols-2"
    >
      {RECAP_17.lines.map((line) => {
        const [pronoun, adj] = line.split(" → ");
        return (
          <div key={line} className="flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50 p-3">
            <span dir="ltr" className="font-en rounded-xl bg-sky-100 px-3 py-2 text-lg font-black text-sky-800">
              {pronoun}
            </span>
            <span dir="ltr" className="font-en text-xl font-black text-indigo-400">
              →
            </span>
            <span dir="ltr" className="font-en rounded-xl bg-indigo-100 px-3 py-2 text-lg font-black text-indigo-800">
              {adj}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// 4 — الخريطة الأساسية (تفاعلية)
// ============================================================
function CoreMapBoard() {
  const [active, setActive] = useState(0);
  const row = CORE_MAP_17[active];
  return (
    <div className="grid gap-3">
      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        data-en-seq="l17-coremap"
        className="ltr-row grid gap-2 rounded-3xl border-2 border-indigo-200 bg-white p-4"
      >
        <div className="mb-1 grid grid-cols-[1fr_1fr_1fr] gap-2 text-center text-[11px] font-black uppercase tracking-wide text-slate-400">
          <span>Pronoun</span>
          <span>Possessive Adjective</span>
          <span>Possessive Pronoun</span>
        </div>
        {CORE_MAP_17.map((r, i) => (
          <button
            key={r.pronoun}
            onClick={() => setActive(i)}
            className={`grid grid-cols-[1fr_1fr_1fr] items-center gap-2 rounded-2xl border-2 p-2.5 transition ${
              i === active ? "border-indigo-400 bg-indigo-50 shadow" : "border-slate-100 bg-slate-50 hover:border-indigo-200"
            }`}
          >
            <span dir="ltr" className="font-en rounded-xl bg-sky-100 px-2 py-2 text-base font-black text-sky-800">
              {r.pronoun}
            </span>
            <span className="flex items-center justify-center gap-1">
              <span dir="ltr" className="font-en text-sm font-black text-indigo-400">
                →
              </span>
              <span dir="ltr" className="font-en rounded-xl bg-indigo-100 px-2 py-2 text-base font-black text-indigo-800">
                {r.adj}
              </span>
            </span>
            <span className="flex items-center justify-center gap-1">
              <span dir="ltr" className="font-en text-sm font-black text-indigo-400">
                →
              </span>
              <span
                dir="ltr"
                className={`font-en rounded-xl px-2 py-2 text-base font-black ${
                  r.pron === "—" ? "bg-slate-100 text-slate-400" : "bg-amber-100 text-amber-800"
                }`}
              >
                {r.pron}
              </span>
            </span>
          </button>
        ))}
      </div>
      {row?.note && (
        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3">
          <Rich text={row.note} className="text-sm font-bold text-orange-800" />
        </div>
      )}
    </div>
  );
}

function MustMemorize() {
  return (
    <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
      <div className="mb-3 text-center text-sm font-bold text-amber-700">
        🔥 <Rich text={MUST_MEMORIZE_17.title} />
      </div>
      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        data-en-seq="l17-memorize"
        className="ltr-row grid gap-2 sm:grid-cols-2"
      >
        {MUST_MEMORIZE_17.lines.map((line) => {
          const [adj, pron] = line.split(" → ");
          return (
            <div key={line} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-amber-100 bg-white p-2.5">
              <span dir="ltr" className="font-en rounded-xl bg-indigo-100 px-3 py-1.5 text-base font-black text-indigo-800">
                {adj}
              </span>
              <span dir="ltr" className="font-en text-lg font-black text-amber-500">
                →
              </span>
              <span dir="ltr" className="font-en rounded-xl bg-amber-100 px-3 py-1.5 text-base font-black text-amber-800">
                {pron}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// 5 — الفرق الأساسي + القاعدة الذهبية
// ============================================================
function BasicDifferenceBoard() {
  const [focus, setFocus] = useState<"adj" | "pron">("adj");
  const side = focus === "adj" ? BASIC_DIFFERENCE_17.adjective : BASIC_DIFFERENCE_17.pronoun;
  return (
    <div className="grid gap-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {(
          [
            ["adj", BASIC_DIFFERENCE_17.adjective, "border-indigo-300 bg-indigo-50"],
            ["pron", BASIC_DIFFERENCE_17.pronoun, "border-amber-300 bg-amber-50"],
          ] as const
        ).map(([key, data, cls]) => (
          <button
            key={key}
            onClick={() => setFocus(key)}
            className={`rounded-3xl border-2 p-4 text-right transition ${cls} ${
              focus === key ? "scale-[1.01] shadow-md" : "opacity-70"
            }`}
          >
            <En className="block text-lg font-black text-slate-900">{data.label}</En>
            <div className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={data.rule} />
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap gap-1.5">
              {data.examples.map((ex) => (
                <span
                  key={ex}
                  dir="ltr"
                  className={`font-en rounded-lg px-2 py-1 text-sm font-bold ${
                    key === "adj" ? "bg-white text-indigo-800" : "bg-white text-amber-800"
                  }`}
                >
                  {ex}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        data-en-seq="l17-golden"
        className="ltr-row rounded-3xl border-2 border-rose-200 bg-rose-50 p-4"
      >
        <div className="mb-3 text-center text-sm font-bold text-rose-700">
          🚨 <Rich text={BASIC_DIFFERENCE_17.golden.title} />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <div className={`rounded-2xl border-2 bg-white p-3 ${focus === "adj" ? "border-indigo-300" : "border-slate-100"}`}>
            <div className="text-sm font-bold text-slate-600">
              <Rich text={BASIC_DIFFERENCE_17.golden.withNoun.rule} />
            </div>
            <div className="mt-1 text-xs font-bold text-slate-400">
              <Rich text={BASIC_DIFFERENCE_17.golden.withNoun.use} />
            </div>
            <En className="mt-2 block rounded-xl bg-indigo-100 px-3 py-2 text-center text-base font-black text-indigo-800">
              {BASIC_DIFFERENCE_17.golden.withNoun.words}
            </En>
          </div>
          <div className={`rounded-2xl border-2 bg-white p-3 ${focus === "pron" ? "border-amber-300" : "border-slate-100"}`}>
            <div className="text-sm font-bold text-slate-600">
              <Rich text={BASIC_DIFFERENCE_17.golden.withoutNoun.rule} />
            </div>
            <div className="mt-1 text-xs font-bold text-slate-400">
              <Rich text={BASIC_DIFFERENCE_17.golden.withoutNoun.use} />
            </div>
            <En className="mt-2 block rounded-xl bg-amber-100 px-3 py-2 text-center text-base font-black text-amber-800">
              {BASIC_DIFFERENCE_17.golden.withoutNoun.words}
            </En>
          </div>
        </div>
      </div>
      <div className="text-center text-xs font-bold text-slate-400">
        <Rich text={`المعروض الآن: ${side.label}`} />
      </div>
    </div>
  );
}

// ============================================================
// 13 — مقارنة كاملة (الجدول)
// ============================================================
function ComparisonTable() {
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l17-compare"
      className="ltr-row overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white"
    >
      <div className="grid grid-cols-3 gap-px bg-indigo-100">
        <div className="bg-indigo-600 px-3 py-2 text-center text-xs font-black text-white" dir="rtl">
          {FULL_COMPARISON_17.head[0]}
        </div>
        <div className="bg-indigo-600 px-3 py-2 text-center text-xs font-black text-white" dir="rtl">
          {FULL_COMPARISON_17.head[1]}
        </div>
        <div className="bg-indigo-600 px-3 py-2 text-center text-xs font-black text-white" dir="rtl">
          {FULL_COMPARISON_17.head[2]}
        </div>
        {FULL_COMPARISON_17.rows.map((r) => (
          <div key={r.owner} className="contents">
            <div className="bg-sky-50 px-3 py-2.5 text-center">
              <span dir="ltr" className="font-en text-base font-black text-sky-800">
                {r.owner}
              </span>
            </div>
            <div className="bg-white px-3 py-2.5 text-center">
              <span dir="ltr" className="font-en text-base font-black text-indigo-800">
                {r.adj}
              </span>
            </div>
            <div className="bg-amber-50 px-3 py-2.5 text-center">
              <span dir="ltr" className="font-en text-base font-black text-amber-800">
                {r.pron}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 17 — حركة التحويل السحرية
// ============================================================
function MagicMove() {
  const [step, setStep] = useState(0);
  return (
    <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
      <div className="mb-3 text-center text-sm font-bold text-indigo-700">🪄 خطوات التحويل — اضغط لتتقدم</div>
      <div className="grid gap-2">
        {MAGIC_MOVE_17.steps.map((s, i) => (
          <button
            key={s.en}
            onClick={() => setStep(i)}
            dir="ltr"
            className={`ltr-row flex items-center justify-center gap-3 rounded-2xl border-2 p-3 text-left transition ${
              i <= step ? "border-indigo-300 bg-indigo-50" : "border-slate-100 bg-slate-50 opacity-50"
            }`}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="font-en text-lg font-black text-slate-900">{s.en}</span>
          </button>
        ))}
      </div>
      <div className="mt-2 text-center text-xs font-bold text-slate-400">
        <Rich text={MAGIC_MOVE_17.steps[step].ar} />
      </div>
    </div>
  );
}

// ============================================================
// 6–11 — أزواج قبل / بعد
// ============================================================
function AdjPronPairs({ pairs }: { pairs: { before: string; after: string; ar?: string }[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-2">
      {pairs.map((p, i) => {
        const isOn = open.has(i);
        const noun = p.before.replace(/^(This is|These are|That is)\s+/, "").replace(/[.?]$/, "");
        return (
          <div key={p.before} className="rounded-2xl border-2 border-indigo-100 bg-white p-3">
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2">
              <span dir="ltr" className="font-en rounded-xl bg-indigo-50 px-3 py-2 text-base font-bold text-indigo-800">
                {p.before}
              </span>
              <span dir="ltr" className="font-en text-lg font-black text-amber-500">
                →
              </span>
              <span dir="ltr" className="font-en rounded-xl bg-amber-100 px-3 py-2 text-base font-black text-amber-800">
                {p.after}
              </span>
              <button
                onClick={() =>
                  setOpen((s) => {
                    const n = new Set(s);
                    if (n.has(i)) n.delete(i);
                    else n.add(i);
                    return n;
                  })
                }
                className="rounded-lg border-2 border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-500 transition hover:border-indigo-300"
              >
                {isOn ? "▲ إخفاء السبب" : "▼ لماذا؟"}
              </button>
            </div>
            {p.ar && (
              <div dir="rtl" className="mt-1 text-center text-sm font-bold text-slate-500">
                {p.ar}
              </div>
            )}
            {isOn && (
              <div className="mt-2 rounded-xl bg-slate-50 p-2 text-center text-xs font-bold text-slate-600">
                <Rich text={`حذفنا الاسم «${noun}» ← بقي ضمير الملكية وحده بدون اسم بعده.`} />
              </div>
            )}
          </div>
        );
      })}
      <div className="text-center text-xs font-bold text-slate-400">اضغط «لماذا؟» لتكشف سبب التحويل</div>
    </div>
  );
}

// ============================================================
// 25–29 — لوحة الزوج (صفة ↔ ضمير)
// ============================================================
function PairBoardView({ board }: { board: PairBoard }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/60 p-4">
        <En className="block text-center text-2xl font-black text-indigo-800">{board.adj}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-600">
          <Rich text={board.adjRule} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid gap-1.5">
          {board.adjExamples.map((ex) => (
            <span key={ex} dir="ltr" className="font-en rounded-xl bg-white px-3 py-2 text-center text-base font-bold text-indigo-900">
              {ex}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-4">
        {board.but && (
          <div className="mb-1 text-center text-xs font-bold text-slate-400">
            <Rich text={board.but} />
          </div>
        )}
        <En className="block text-center text-2xl font-black text-amber-800">{board.pron}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-600">
          <Rich text={board.pronRule} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 grid gap-1.5">
          {board.pronExamples.map((ex) => (
            <span key={ex} dir="ltr" className="font-en rounded-xl bg-white px-3 py-2 text-center text-base font-bold text-amber-900">
              {ex}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 21 / 24 — الحوارات
// ============================================================
function DialogueView({ lines }: { lines: { speaker: string; en: string; ar?: string }[] }) {
  return (
    <div className="grid gap-2.5">
      {lines.map((line, i) => (
        <div key={i} className={`flex ${line.speaker === "A" ? "justify-start" : "justify-end"}`}>
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              line.speaker === "A" ? "border-2 border-sky-200 bg-sky-50" : "border-2 border-emerald-200 bg-emerald-50"
            }`}
          >
            <div className="mb-1 text-xs font-bold text-slate-500">{line.speaker === "A" ? "👤 A" : "👤 B"}</div>
            <En className="block text-base font-bold text-slate-900">{line.en}</En>
            {line.ar && (
              <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
                {line.ar}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 19 — ثلاثة أنظمة للملكية
// ============================================================
function ThreeSystems() {
  return (
    <div className="grid gap-3">
      {THREE_SYSTEMS_17.systems.map((s, i) => (
        <div key={s.n} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold text-slate-500">
              <Rich text={`${s.n}: ${s.kind}`} />
            </div>
            <En className="mt-1 block text-lg font-black text-slate-900">{s.en}</En>
            <div dir="rtl" className="mt-0.5 text-sm font-bold text-slate-500">
              {s.ar}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ThreeSystemMap() {
  const [step, setStep] = useState<Record<number, number>>({});
  const SYSTEM_LABELS = ["اسم + 's", "Possessive Adjective", "Possessive Pronoun"];
  return (
    <LabPanel emoji="🗺️" label="THREE-SYSTEM OWNERSHIP MAP" ar="اسم + 's ← صفة ملكية ← ضمير ملكية" seq="l17-ownmap">
      <div className="grid gap-3">
        {OWNERSHIP_MAP_17.map((row, ri) => {
          const shown = step[ri] ?? 0;
          return (
            <div key={row.owner} className="rounded-2xl border-2 border-white bg-white p-3">
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2">
                {row.chain.map((c, ci) => (
                  <span key={c} className="flex items-center gap-2">
                    {ci > 0 && (
                      <span dir="ltr" className="font-en text-lg font-black text-indigo-400">
                        ↓
                      </span>
                    )}
                    <span
                      dir="ltr"
                      className={`font-en rounded-xl px-3 py-2 text-sm font-black transition ${
                        ci === shown
                          ? "bg-amber-200 text-amber-900 ring-2 ring-amber-400"
                          : ci === 0
                            ? "bg-violet-100 text-violet-800"
                            : ci === 1
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {c}
                    </span>
                  </span>
                ))}
              </div>
              <div className="mt-2 text-center">
                <div className="mb-1 text-xs font-bold text-indigo-600">
                  <Rich text={`النظام المعروض: ${SYSTEM_LABELS[shown]}`} />
                </div>
                <button
                  onClick={() => setStep((s) => ({ ...s, [ri]: ((s[ri] ?? 0) + 1) % row.chain.length }))}
                  className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                  النظام التالي ↓
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 20 — مثال كامل (Omar's phone)
// ============================================================
function ThreeWayBoard() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l17-threeway" className="ltr-row grid gap-2">
      {FULL_EXAMPLE_17.ways.map((w, i) => (
        <div key={w} className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border-2 border-indigo-100 bg-white p-3">
          <En className="rounded-xl bg-indigo-50 px-3 py-2 text-base font-black text-indigo-900">{w}</En>
          <span className="text-slate-400">=</span>
          <span dir="rtl" className="text-sm font-bold text-slate-600">
            <Rich text={FULL_EXAMPLE_17.notes[i]} />
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 23 — الإجابة على Whose
// ============================================================
function WhoseAnswerBoard() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <div className="grid gap-3">
      {WHOSE_ANSWER_17.items.map((item, i) => {
        const isOn = open.has(i);
        return (
          <div key={item.q} className="rounded-3xl border-2 border-indigo-100 bg-white p-3">
            <div dir="ltr" className="text-center">
              <En className="text-lg font-black text-slate-900">{item.q}</En>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-2 text-center">
                <En className="block text-base font-bold text-indigo-900">{item.withNoun}</En>
              </div>
              <button
                onClick={() =>
                  setOpen((s) => {
                    const n = new Set(s);
                    if (n.has(i)) n.delete(i);
                    else n.add(i);
                    return n;
                  })
                }
                className={`rounded-2xl border-2 p-2 text-center transition ${
                  isOn ? "border-amber-400 bg-amber-100 shadow" : "border-amber-200 bg-amber-50"
                }`}
              >
                <En className="block text-base font-black text-amber-800">{item.pronoun}</En>
                <span className="mt-0.5 block text-[10px] font-bold text-slate-400">
                  {isOn ? "بدون اسم بعدها" : "اضغط للتركيز"}
                </span>
              </button>
            </div>
            <div className="mt-1 text-center text-xs font-bold text-slate-400">
              <Rich text={WHOSE_ANSWER_17.or} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// 30 — الشرائط الثلاثية
// ============================================================
function TrioChips({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((w) => (
        <span key={w} dir="ltr" className="font-en rounded-xl border-2 border-indigo-200 bg-white px-4 py-2 text-lg font-black text-indigo-800">
          {w}
        </span>
      ))}
    </div>
  );
}

function TrioTable({ rows }: { rows: { word: string; meaning: string; example?: string }[] }) {
  return (
    <div className="grid gap-2">
      {rows.map((r) => (
        <div key={r.word + r.meaning} className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3">
          <En className="rounded-xl bg-indigo-600 px-3 py-2 text-base font-black text-white">{r.word}</En>
          <span dir="ltr" className="font-en text-slate-400">
            =
          </span>
          <span dir="ltr" className="font-en rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700">
            {r.meaning}
          </span>
          {r.example && (
            <En className="ms-auto rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-800">{r.example}</En>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 31 — مقارنة ثلاثية
// ============================================================
function TripleCompare() {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {TRIPLE_COMPARE_17.map((t) => (
        <div key={t.word} className="rounded-3xl border-2 border-indigo-100 bg-white p-3 text-center">
          <En className="block text-xl font-black text-indigo-800">{t.word}</En>
          <En className="mt-2 block rounded-xl bg-slate-50 px-2 py-2 text-sm font-bold text-slate-900">{t.en}</En>
          <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
            {t.ar}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 33 — its
// ============================================================
function ItsBoard() {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-center">
        <En className="block text-2xl font-black text-emerald-700">its</En>
        <div dir="rtl" className="mt-1 text-sm font-bold text-emerald-700">
          ✅ <Rich text="ملكية قبل الاسم" />
        </div>
      </div>
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center">
        <En className="block text-2xl font-black text-rose-600 line-through">its'</En>
        <div dir="rtl" className="mt-1 text-sm font-bold text-rose-700">
          ❌ <Rich text="كلمة غير موجودة — لا نخترعها" />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// شرائط عامة
// ============================================================
function FormulaStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l17-fstrip" className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span key={item} dir="ltr" className="font-en rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 text-sm font-black text-indigo-800">
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
      data-en-seq="l17-chain"
      className="ltr-row grid justify-items-center gap-1 rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-4"
    >
      {items.map((item, i) => (
        <div key={item} className="flex flex-col items-center gap-1">
          {i > 0 && (
            <span dir="ltr" className="font-en text-lg font-black text-fuchsia-400">
              ↓
            </span>
          )}
          <span
            dir="ltr"
            className={`font-en rounded-xl px-4 py-2 text-base font-black ${
              i === 0 ? "bg-violet-100 text-violet-800" : i === 1 ? "bg-indigo-100 text-indigo-800" : "bg-amber-200 text-amber-900"
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
// ① POSSESSION TRANSFORMATION MACHINE
// ============================================================
function TransformMachine() {
  const [i, setI] = useState(0);
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const pair = TRANSFORM_LAB_17[i];
  const pick = (n: number) => {
    setI(n);
    setStage(0);
  };
  return (
    <LabPanel emoji="⚙️" label="POSSESSION TRANSFORMATION MACHINE" ar="آلة تحويل الملكية" seq="l17-machine">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mb-3 flex flex-wrap justify-center gap-1.5">
        {TRANSFORM_LAB_17.map((p, idx) => (
          <button
            key={p.adj + p.noun}
            onClick={() => pick(idx)}
            dir="ltr"
            className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${
              idx === i ? "border-indigo-500 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
            }`}
          >
            {`${p.adj} ${p.noun}`}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border-2 border-white bg-white p-4">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-3">
          <span
            dir="ltr"
            className={`font-en rounded-2xl border-2 px-4 py-3 text-xl font-black transition ${
              stage === 2 ? "border-amber-300 bg-amber-100 text-amber-900" : "border-indigo-200 bg-indigo-50 text-indigo-800"
            }`}
          >
            {pair.adj}
          </span>
          <span
            dir="ltr"
            className={`font-en rounded-2xl border-2 px-4 py-3 text-xl font-black transition ${
              stage === 0
                ? "border-amber-200 bg-amber-50 text-amber-800"
                : "border-dashed border-rose-300 bg-rose-50 text-rose-400 line-through decoration-rose-400"
            }`}
          >
            {pair.noun}
          </span>
          <span dir="ltr" className="font-en text-2xl font-black text-indigo-400">
            →
          </span>
          <span
            dir="ltr"
            className={`font-en rounded-2xl border-2 px-4 py-3 text-xl font-black transition ${
              stage === 2 ? "border-emerald-300 bg-emerald-100 text-emerald-800" : "border-slate-200 bg-slate-50 text-slate-300"
            }`}
          >
            {stage === 2 ? pair.pron : "???"}
          </span>
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
            className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold text-white transition enabled:hover:bg-rose-700 disabled:opacity-30"
          >
            🗑️ احذف الاسم
          </button>
          <button
            onClick={() => setStage(2)}
            disabled={stage !== 1}
            className="rounded-xl bg-amber-600 px-3 py-2 text-xs font-bold text-white transition enabled:hover:bg-amber-700 disabled:opacity-30"
          >
            🪄 حوّل الصفة إلى ضمير
          </button>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <Rich
          text={
            stage === 0
              ? "Possessive Adjective + Noun — الاسم ما زال موجوداً."
              : stage === 1
                ? "حذفنا الاسم — بقيت صفة الملكية وحدها، وهذا لا يكفي."
                : "بدون اسم بعدها ← تتحول صفة الملكية إلى ضمير ملكية."
          }
          className="text-sm font-bold text-slate-600"
        />
      </div>
    </LabPanel>
  );
}

// ============================================================
// ② BEFORE / AFTER OWNERSHIP CARDS
// ============================================================
function BeforeAfterCards() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <LabPanel emoji="🃏" label="BEFORE / AFTER OWNERSHIP CARDS" ar="قبل الاسم ← بدون اسم" seq="l17-beforeafter">
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-black uppercase tracking-wide text-indigo-500">
          <span dir="ltr" className="font-en">
            {BEFORE_AFTER_LEFT_LABEL}
          </span>
          <span dir="ltr" className="font-en">
            {BEFORE_AFTER_RIGHT_LABEL}
          </span>
        </div>
        {BEFORE_AFTER_17.map((row, i) => {
          const chosen = picked[i];
          const right = chosen === row.after;
          return (
            <div key={row.before} className="grid grid-cols-2 items-stretch gap-2">
              <div
                dir="ltr"
                style={{ direction: "ltr" }}
                className="ltr-row grid place-items-center rounded-2xl border-2 border-indigo-200 bg-white p-3"
              >
                <span dir="ltr" className="font-en text-base font-black text-indigo-900">
                  {row.before}
                </span>
              </div>
              <div
                dir="ltr"
                style={{ direction: "ltr" }}
                className={`ltr-row grid place-items-center rounded-2xl border-2 p-3 transition ${
                  chosen ? (right ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-slate-50"
                }`}
              >
                <span dir="ltr" className={`font-en text-base font-black ${chosen ? (right ? "text-emerald-700" : "text-rose-600") : "text-slate-300"}`}>
                  {chosen ?? "•••"}
                </span>
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row col-span-2 flex flex-wrap justify-center gap-1.5">
                {BEFORE_AFTER_BANK_17.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                    dir="ltr"
                    className={`font-en rounded-lg border-2 px-2.5 py-1 text-xs font-bold transition ${
                      chosen === opt ? "border-indigo-500 bg-indigo-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// ③ THE NOUN REMOVAL LAB
// ============================================================
function NounRemovalLab() {
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🧪" label="THE NOUN REMOVAL LAB" ar="مختبر حذف الاسم" seq="l17-lab">
      <div className="grid gap-2 sm:grid-cols-2">
        {NOUN_REMOVAL_SET_17.map((item, i) => {
          const isOut = removed.has(i);
          return (
            <button
              key={`${item.adj}-${item.noun}`}
              onClick={() =>
                setRemoved((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
              dir="ltr"
              className={`ltr-row flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 p-3 text-left transition ${
                isOut ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white hover:border-indigo-300"
              }`}
            >
              <span dir="ltr" className="font-en rounded-lg bg-indigo-100 px-2 py-1 text-sm font-black text-indigo-800">
                {item.adj}
              </span>
              <span
                dir="ltr"
                className={`font-en rounded-lg px-2 py-1 text-sm font-bold transition ${
                  isOut ? "bg-rose-50 text-rose-400 line-through" : "bg-amber-100 text-amber-800"
                }`}
              >
                {item.noun}
              </span>
              <span dir="ltr" className="font-en text-base font-black text-indigo-400">
                →
              </span>
              <span dir="ltr" className={`font-en rounded-lg px-2 py-1 text-sm font-black ${isOut ? "bg-amber-200 text-amber-900" : "bg-slate-100 text-slate-300"}`}>
                {isOut ? item.pron : "•••"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setRemoved(new Set(NOUN_REMOVAL_SET_17.map((_, i) => i)))}
          className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          احذف كل الأسماء
        </button>
        <button
          onClick={() => setRemoved(new Set())}
          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-slate-400"
        >
          ↺ إعادة
        </button>
        <span className="text-xs font-bold text-indigo-600">
          {removed.size} / {NOUN_REMOVAL_SET_17.length}
        </span>
      </div>
    </LabPanel>
  );
}

// ============================================================
// ④ MY vs MINE ALARM
// ============================================================
function MyMineAlarm() {
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked !== null ? MY_MINE_ALARM_17[picked] : null;
  return (
    <LabPanel emoji="🚨" label="MY vs MINE ALARM" ar="اضغط على الجملة لتعرف إن كانت صحيحة" seq="l17-alarm">
      <div className="grid gap-2">
        {MY_MINE_ALARM_17.map((item, i) => {
          const isSel = picked === i;
          const style = isSel
            ? item.ok
              ? "border-emerald-300 bg-emerald-50"
              : "border-rose-300 bg-rose-50"
            : "border-slate-200 bg-white hover:border-indigo-300";
          return (
            <button
              key={item.sentence}
              onClick={() => setPicked(isSel ? null : i)}
              dir="ltr"
              className={`ltr-row flex flex-wrap items-center justify-center gap-3 rounded-2xl border-2 p-3 transition ${style}`}
            >
              <En className="text-base font-black text-slate-900">{item.sentence}</En>
              <span className={`text-lg font-black ${isSel ? (item.ok ? "text-emerald-600" : "text-rose-600") : "text-slate-300"}`}>
                {isSel ? (item.ok ? "✅" : "❌") : "؟"}
              </span>
            </button>
          );
        })}
      </div>
      {chosen && (
        <div className={`mt-3 rounded-2xl border-2 p-3 ${chosen.ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
          <Rich text={chosen.why} className={`text-sm font-bold ${chosen.ok ? "text-emerald-800" : "text-rose-800"}`} />
        </div>
      )}
    </LabPanel>
  );
}

// ============================================================
// ⑤⑥ YOUR / YOU'RE / YOURS + THEIR / THEY'RE / THEIRS DETECTOR
// ============================================================
function Detector({ group }: { group: "your" | "their" }) {
  const set = DETECTOR_SETS_17[group];
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <LabPanel emoji="🔎" label={`${set.label} DETECTOR`} ar="اختر الكلمة الصحيحة" seq={`l17-detector-${group}`}>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mb-3 flex flex-wrap justify-center gap-1.5">
        {set.sourceLines.map((line) => (
          <span key={line} dir="ltr" className="font-en rounded-lg border-2 border-indigo-100 bg-white px-2.5 py-1 text-xs font-bold text-indigo-700">
            {line}
          </span>
        ))}
      </div>
      <div className="grid gap-2">
        {set.cases.map((c, i) => {
          const chosen = picked[i];
          const right = chosen === c.answer;
          return (
            <div key={c.blank} data-en-case={i} className="rounded-2xl border-2 border-white bg-white p-3">
              <div dir="ltr" className="text-center">
                <En className="text-base font-black text-slate-900">{c.blank}</En>
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
                {set.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                    dir="ltr"
                    className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                      chosen === opt
                        ? right
                          ? "border-transparent bg-emerald-600 text-white"
                          : "border-transparent bg-rose-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {chosen && (
                <div className={`mt-2 rounded-xl p-2 text-center text-sm font-bold ${right ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                  <Rich text={right ? c.why : `الإجابة الصحيحة: ${c.answer} — ${c.why}`} />
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
// ⑦ HIS DOUBLE-ROLE MACHINE
// ============================================================
function HisDoubleRole() {
  const [answer, setAnswer] = useState<Record<number, boolean | null>>({});
  return (
    <LabPanel emoji="🎭" label="HIS DOUBLE-ROLE MACHINE" ar="نفس الكلمة — وظيفتان" seq="l17-hisrole">
      <div className="grid gap-3 md:grid-cols-2">
        {HIS_DOUBLE_ROLE_17.map((row, i) => {
          const my = answer[i];
          const correct = my === row.nounAfter;
          return (
            <div key={row.sentence} data-en-role={i} className="rounded-3xl border-2 border-white bg-white p-3">
              <div dir="ltr" className="text-center">
                <En className="text-lg font-black text-slate-900">{row.sentence}</En>
              </div>
              <div dir="ltr" className="mt-2 text-center">
                <En className="rounded-xl bg-indigo-50 px-3 py-1.5 text-sm font-black text-indigo-800">{row.chunk}</En>
              </div>
              <div className="mt-2 text-center text-xs font-bold text-slate-500">
                <Rich text={HIS_DOUBLE_QUESTION_17} />
              </div>
              <div className="mt-1 flex justify-center gap-2">
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setAnswer((a) => ({ ...a, [i]: v }))}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      my === v
                        ? correct
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                        : "border-2 border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    {v ? "نعم — بعدها اسم" : "لا — وحدها"}
                  </button>
                ))}
              </div>
              {my !== undefined && my !== null && (
                <div className="mt-2 rounded-xl bg-slate-50 p-2 text-center">
                  <En className="block text-sm font-black text-indigo-800">{row.role}</En>
                  <div className="mt-1 text-xs font-bold text-slate-500">
                    <Rich text={row.why} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-bold text-slate-600">
        <Rich text="نفس كلمة his — الموقع هو الذي يخبرنا بالوظيفة." />
      </div>
    </LabPanel>
  );
}

// ============================================================
// ⑧ WH-OSE? INVESTIGATION
// ============================================================
function WhoseLab() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  return (
    <LabPanel emoji="🕵️" label="WH-OSE? INVESTIGATION" ar="تحقيق: لمن هذا الشيء؟" seq="l17-whose">
      <div className="grid gap-3">
        {WHOSE_LAB_17.map((c, i) => {
          const chosen = picked[i];
          const right = chosen === c.options[c.correct];
          return (
            <div key={c.q} data-en-case={i} className="rounded-3xl border-2 border-white bg-white p-3">
              <div dir="ltr" className="text-center">
                <En className="text-lg font-black text-slate-900">{c.q}</En>
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-1.5">
                <span dir="ltr" className="font-en text-base font-black text-slate-500">
                  It's
                </span>
                {c.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                    dir="ltr"
                    className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                      chosen === opt
                        ? right
                          ? "border-transparent bg-emerald-600 text-white"
                          : "border-transparent bg-rose-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                <span dir="ltr" className="font-en text-base font-black text-slate-500">
                  .
                </span>
              </div>
              {chosen && (
                <div className={`mt-2 rounded-xl p-2 text-center ${right ? "bg-emerald-50" : "bg-rose-50"}`}>
                  <En className={`text-sm font-black ${right ? "text-emerald-700" : "text-rose-700"}`}>{c.answer}</En>
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
// ⑩ OWNERSHIP NUMBER TRAP
// ============================================================
function NumberTrap() {
  const [mode, setMode] = useState<"singular" | "plural">("singular");
  return (
    <LabPanel emoji="🔢" label="OWNERSHIP NUMBER TRAP" ar="العدد يتغير — ضمير الملكية لا يتغير" seq="l17-numbertrap">
      <div className="mb-3 flex justify-center gap-2">
        <button
          onClick={() => setMode("singular")}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
            mode === "singular" ? "bg-indigo-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600"
          }`}
        >
          مفرد (1)
        </button>
        <button
          onClick={() => setMode("plural")}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
            mode === "plural" ? "bg-indigo-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600"
          }`}
        >
          جمع (2+)
        </button>
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l17-traprows" className="ltr-row grid gap-2">
        {NUMBER_TRAP_17.map((row) => {
          const sentence = mode === "singular" ? row.singular : row.plural;
          return (
            <div key={sentence} className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-3">
              <En className="text-base font-black text-slate-900">{sentence}</En>
              <span dir="ltr" className="font-en rounded-lg bg-amber-100 px-2 py-1 text-xs font-black text-amber-800">
                {row.constant} = ثابت
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <Rich text="الملكية مرتبطة بالمالك، وليس بعدد الأشياء." className="text-sm font-bold text-indigo-700" />
      </div>
    </LabPanel>
  );
}

// ============================================================
// ⑩ (ب) عداد الملكية — 35
// ============================================================
function CounterBoard() {
  const [counts, setCounts] = useState<number[]>([1, 1]);
  return (
    <LabPanel emoji="🧮" label="OWNERSHIP COUNTER" ar="غيّر العدد وراقب ضمير الملكية" seq="l17-counter">
      <div className="grid gap-3">
        {NUMBER_TRAP_17.slice(0, 2).map((_, i) => {
          const n = counts[i];
          const one = n === 1;
          const have =
            i === 0
              ? one
                ? "I have one book."
                : "I have five books."
              : one
                ? "They have one car."
                : "They have three cars.";
          const result =
            i === 0
              ? one
                ? "The book is mine."
                : "The books are mine."
              : one
                ? "The car is theirs."
                : "The cars are theirs.";
          const pron = i === 0 ? "mine" : "theirs";
          return (
            <div key={i} className="rounded-3xl border-2 border-white bg-white p-3">
              <div className="mb-2 flex justify-center gap-2">
                {[1, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setCounts((c) => c.map((x, xi) => (xi === i ? v : x)))}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      (v === 1) === one ? "bg-indigo-600 text-white" : "border-2 border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    {v === 1 ? "1" : "5"}
                  </button>
                ))}
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-1.5">
                <En className="rounded-xl bg-slate-50 px-3 py-2 text-center text-base font-bold text-slate-800">{have}</En>
                <En className="rounded-xl bg-amber-50 px-3 py-2 text-center text-base font-black text-amber-900">{result}</En>
              </div>
              <div dir="ltr" className="mt-2 text-center">
                <span dir="ltr" className="font-en rounded-lg bg-indigo-100 px-2 py-1 text-xs font-black text-indigo-800">
                  {pron}
                </span>
                <span dir="rtl" className="text-xs font-bold text-slate-500"> لم تتغير</span>
              </div>
            </div>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// ③ (ب) مقارنة جملتين — 3 / 25
// ============================================================
function SentenceCompare({ a, b }: { a: string; b: string }) {
  const [active, setActive] = useState<0 | 1>(0);
  const sentence = active === 0 ? a : b;
  const nounAfter = active === 0;
  return (
    <div className="rounded-3xl border-2 border-indigo-200 bg-white p-4">
      <div className="mb-3 text-center text-sm font-bold text-indigo-700">⚖️ مقارنة الجملتين — أي صيغة تستخدم؟</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {[a, b].map((s, i) => (
          <button
            key={s}
            onClick={() => setActive(i as 0 | 1)}
            dir="ltr"
            className={`ltr-row rounded-2xl border-2 p-3 text-center transition ${
              active === i ? "border-indigo-400 bg-indigo-50 shadow" : "border-slate-100 bg-slate-50 opacity-70"
            }`}
          >
            <En className="block text-base font-black text-slate-900">{s}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-slate-50 p-3 text-center">
        <div dir="ltr" className="text-center">
          <En className="text-base font-black text-slate-900">{sentence}</En>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich
            text={
              nounAfter
                ? "هنا الكلمة تأتي قبل الاسم ← صفة ملكية my."
                : "هنا الكلمة واقفة وحدها بدون اسم بعدها ← ضمير ملكية mine."
            }
          />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// التمارين 36 / 38 — اختر الصحيح / أكمل
// ============================================================
function ChooseExercise({ items }: { items: typeof LEVEL1_17 }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = items.reduce((s, it, i) => s + (answers[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {items.map((item, i) => {
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
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                {item.n}
              </span>
              <div className="min-w-0 flex-1" dir="ltr">
                <En className="block text-base font-extrabold text-slate-900">{item.stem}</En>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} data-en-seq={`l17-opts-${item.n}`} className="ltr-row mt-3 grid grid-cols-2 gap-2 pr-11">
              {item.options.map((opt, oi) => {
                const isAnswer = oi === item.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400";
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
                    data-en-opt={["A", "B"][oi]}
                    className={`font-en flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-base font-bold transition active:scale-[0.98] ${cls}`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-900/10 text-xs font-black">
                      {["A", "B"][oi]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {done && (
              <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`} dir="ltr">
                <En>{right ? `✓ ${item.solved}` : `✕ — الصحيح: ${item.solved}`}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">
        النتيجة: {score} / {items.length}
      </div>
    </div>
  );
}

// ============================================================
// 37 — المستوى الثاني: حوّل
// ============================================================
function Level2Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const score = LEVEL2_17.reduce((s, it, i) => s + (picked[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {LEVEL2_17.map((item, i) => {
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
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                {item.n}
              </span>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-1 flex-wrap items-center gap-2">
                <En className="rounded-xl bg-indigo-50 px-3 py-2 text-base font-black text-indigo-900">{item.from}</En>
                <span dir="ltr" className="font-en text-lg font-black text-amber-500">
                  →
                </span>
                <span className={`font-en rounded-xl px-3 py-2 text-base font-black ${chosen ? (right ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700") : "bg-slate-100 text-slate-300"}`} dir="ltr">
                  {chosen ?? "______"}
                </span>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap gap-1.5 pr-11">
              {LEVEL2_17_BANK.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                  dir="ltr"
                  className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                    chosen === opt
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {chosen && !right && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-700" dir="ltr">
                <En>الإجابة الصحيحة: {item.answer}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">
        النتيجة: {score} / {LEVEL2_17.length}
      </div>
    </div>
  );
}

// ============================================================
// 39 — المستوى الرابع: صحح الأخطاء
// ============================================================
function Level4Ex() {
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const norm = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
  const score = LEVEL4_17.reduce(
    (s, it, i) => s + (checked.has(i) && norm(typed[i] || "") === norm(it.correct) ? 1 : 0),
    0
  );
  return (
    <div className="grid gap-3">
      {LEVEL4_17.map((item, i) => {
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
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-600 text-sm font-bold text-white">
                {item.n}
              </span>
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
                className="font-en w-full max-w-sm flex-1 rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-indigo-400"
              />
              <button
                onClick={() => setChecked((c) => new Set(c).add(i))}
                className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                تحقق
              </button>
              <button
                onClick={() => setRevealed((r) => new Set(r).add(i))}
                className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-indigo-300"
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
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">
        النتيجة: {score} / {LEVEL4_17.length}
      </div>
    </div>
  );
}

// ============================================================
// 40 — المستوى الخامس: Whose?
// ============================================================
function Level5Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const score = LEVEL5_17.reduce((s, it, i) => s + (picked[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {LEVEL5_17.map((item, i) => {
        const chosen = picked[i];
        const right = chosen === item.answer;
        return (
          <div
            key={item.n}
            className={`rounded-3xl border-2 p-4 transition ${
              chosen ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                {item.n}
              </span>
              <div className="min-w-0 flex-1">
                <div dir="ltr">
                  <En className="block text-base font-extrabold text-slate-900">{item.q}</En>
                </div>
                <div dir="ltr" className="mt-1">
                  <En className="block text-sm font-bold text-slate-500">{item.clue}</En>
                </div>
                <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap items-center gap-2">
                  <span dir="ltr" className="font-en text-base font-black text-amber-700">
                    →
                  </span>
                  <span className="font-en rounded-xl bg-amber-50 px-3 py-1.5 text-base font-black text-amber-900" dir="ltr">
                    {item.blank}
                  </span>
                </div>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap gap-1.5 pr-11">
              {LEVEL5_17_BANK.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                  dir="ltr"
                  className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                    chosen === opt
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {chosen && !right && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-700" dir="ltr">
                <En>الإجابة الصحيحة: {item.answer}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">
        النتيجة: {score} / {LEVEL5_17.length}
      </div>
    </div>
  );
}

// ============================================================
// 41 — المستوى السادس: التحويل
// ============================================================
function Level6Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const bank = ["mine", "yours", "his", "hers", "ours", "theirs"];
  const score = LEVEL6_17.reduce((s, it, i) => s + (picked[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {LEVEL6_17.map((item, i) => {
        const chosen = picked[i];
        const right = chosen === item.answer;
        return (
          <div
            key={item.n}
            className={`rounded-3xl border-2 p-4 transition ${
              chosen ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                {item.n}
              </span>
              <div dir="ltr" className="min-w-0 flex-1">
                <En className="block text-base font-bold text-slate-700">{item.from}</En>
                <En className="mt-1 block text-base font-extrabold text-slate-900">→ {item.to}</En>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap gap-1.5 pr-11">
              {bank.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setPicked((p) => ({ ...p, [i]: opt }))}
                  dir="ltr"
                  className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                    chosen === opt
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {chosen && !right && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-700" dir="ltr">
                <En>الإجابة الصحيحة: {item.answer}</En>
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">
        النتيجة: {score} / {LEVEL6_17.length}
      </div>
    </div>
  );
}

// ============================================================
// 42 — Grammar Detective
// ============================================================
function DetectiveEx() {
  const [answer, setAnswer] = useState<Record<number, boolean | null>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const score = DETECTIVE_TARGETS_17.reduce(
    (s, t, i) => s + (answer[i] === t.followedByNoun ? 1 : 0),
    0
  );
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-indigo-700">
          🕵️ <Rich text={DETECTIVE_EXTRACT_17} />
        </div>
        <div dir="ltr" className="grid gap-2 rounded-2xl border-2 border-indigo-100 bg-white p-4">
          {DETECTIVE_PASSAGE_17.map((p) => (
            <En key={p} className="block text-base font-bold leading-relaxed text-slate-900">
              {p}
            </En>
          ))}
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-500">
          <Rich text={DETECTIVE_ASK_17} />
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-2">
          {DETECTIVE_QUESTIONS_17.map((q) => (
            <span key={q} className="rounded-xl bg-white px-3 py-1.5 text-sm font-bold text-indigo-700">
              <Rich text={q} />
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {DETECTIVE_TARGETS_17.map((t, i) => {
          const my = answer[i];
          const correct = my === t.followedByNoun;
          const shown = revealed.has(i);
          return (
            <div
              key={t.n}
              className={`rounded-3xl border-2 p-4 transition ${
                my !== undefined && my !== null
                  ? correct
                    ? "border-emerald-300 bg-emerald-50/50"
                    : "border-rose-300 bg-rose-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                  {t.n}
                </span>
                <En className="rounded-xl bg-indigo-600 px-3 py-2 text-base font-black text-white">{t.word}</En>
                <span dir="ltr">
                  <En className="rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-600">{t.context}</En>
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                <span className="text-sm font-bold text-slate-500">
                  <Rich text={HIS_DOUBLE_QUESTION_17} />
                </span>
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setAnswer((a) => ({ ...a, [i]: v }))}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      my === v
                        ? correct
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                        : "border-2 border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                    }`}
                  >
                    {v ? "نعم — بعدها اسم" : "لا — وحدها"}
                  </button>
                ))}
                <button
                  onClick={() => setRevealed((r) => new Set(r).add(i))}
                  className="rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                  الحل
                </button>
              </div>
              {shown && (
                <div className="mt-3 grid gap-1 pr-11">
                  <div dir="ltr">
                    <En className="rounded-xl bg-emerald-100 px-3 py-2 text-sm font-black text-emerald-800">{t.role}</En>
                  </div>
                  <div className="text-sm font-bold text-teal-700">
                    <Rich text={t.followedByNoun ? "بعدها اسم ← Possessive Adjective." : "واقفة وحدها ← Possessive Pronoun."} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50 p-3 text-center text-sm font-bold text-indigo-800">
        النتيجة: {score} / {DETECTIVE_TARGETS_17.length}
      </div>
      <div className="rounded-2xl bg-amber-50 p-3 text-center">
        <Rich text={`🔥 ${DETECTIVE_SKILL_17}`} className="font-bold text-amber-800" />
      </div>
    </div>
  );
}

// ============================================================
// 43 — IQ200 Challenge
// ============================================================
function IQ200Ex() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState(0);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-pink-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-fuchsia-700">
          🚀 <Rich text="IQ200 — حوّل الجملة إلى ثلاث طرق" />
        </div>
        <div dir="ltr" className="rounded-2xl border-2 border-fuchsia-100 bg-white p-4 text-center">
          <En className="text-xl font-black text-slate-900">{IQ200_CHALLENGE_17.sentence}</En>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-500">
          <Rich text={IQ200_CHALLENGE_17.task} />
        </div>
      </div>

      <div className="rounded-3xl border-2 border-fuchsia-100 bg-white p-4">
        <div className="mb-2 text-center text-sm font-bold text-fuchsia-700">⚙️ آلة تحويل Alex's laptop</div>
        <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l17-iq200chain" className="ltr-row flex flex-wrap items-center justify-center gap-2">
          {["Alex's laptop", "his laptop", "This laptop is his", "Whose laptop is this?"].map((seg, i) => (
            <button
              key={seg}
              onClick={() => setMode(i)}
              dir="ltr"
              className={`font-en rounded-xl border-2 px-3 py-2 text-sm font-black transition ${
                i <= mode
                  ? i === 0
                    ? "border-violet-300 bg-violet-100 text-violet-800"
                    : i === 1
                      ? "border-indigo-300 bg-indigo-100 text-indigo-800"
                      : i === 2
                        ? "border-amber-300 bg-amber-100 text-amber-800"
                        : "border-emerald-300 bg-emerald-100 text-emerald-800"
                  : "border-slate-200 bg-slate-50 text-slate-300"
              }`}
            >
              {i <= mode ? seg : "???"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        {IQ200_CHALLENGE_17.tasks.map((t, i) => {
          const isOn = open.has(i);
          return (
            <div key={t.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">
                  {t.n}
                </span>
                <div className="flex-1">
                  <Rich text={t.ar} className="font-bold text-slate-800" />
                </div>
                <button
                  onClick={() =>
                    setOpen((s) => {
                      const n = new Set(s);
                      if (n.has(i)) n.delete(i);
                      else n.add(i);
                      return n;
                    })
                  }
                  className="rounded-xl bg-fuchsia-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-fuchsia-700"
                >
                  {isOn ? "إخفاء" : "اكشف"}
                </button>
              </div>
              {isOn && (
                <div className="mt-3 pr-11" dir="ltr">
                  <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                    {t.answer}
                  </En>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl bg-fuchsia-50 p-3 text-center">
        <Rich text={`🔥 ${IQ200_EXAMPLE_17.fire}`} className="font-bold text-fuchsia-800" />
      </div>
    </div>
  );
}

// ============================================================
// 44 — IQ200 Challenge 2
// ============================================================
function IQ200BEx() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-violet-700">
          🔥 <Rich text={IQ200_CHALLENGE2_17.inFrontOfYou} />
        </div>
        <div dir="ltr" className="grid gap-2 rounded-2xl border-2 border-violet-100 bg-white p-3">
          {IQ200_CHALLENGE2_17.given.map((g) => (
            <En key={g} className="block text-base font-bold text-slate-900">
              {g}
            </En>
          ))}
        </div>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/60 p-3">
          <div className="text-sm font-bold text-slate-600">
            <Rich text={IQ200_CHALLENGE2_17.step1} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
            {IQ200_CHALLENGE2_17.step1Words.map((w) => (
              <span key={w} dir="ltr" className="font-en rounded-lg bg-white px-3 py-1.5 text-sm font-black text-indigo-800">
                {w}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/60 p-3">
          <div className="text-sm font-bold text-slate-600">
            <Rich text={IQ200_CHALLENGE2_17.step2} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
            {IQ200_CHALLENGE2_17.step2Words.map((w) => (
              <span key={w} dir="ltr" className="font-en rounded-lg bg-white px-3 py-1.5 text-sm font-black text-amber-800">
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
        <div className="mb-2 text-sm font-bold text-slate-500">
          <Rich text={IQ200_CHALLENGE2_17.exampleLabel} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-1.5">
          {IQ200_CHALLENGE2_17.example.map((e) => (
            <En key={e} className="block rounded-xl bg-violet-50 px-3 py-2 text-base font-black text-violet-900">
              {e}
            </En>
          ))}
        </div>
        <div className="mt-2 text-sm font-bold text-slate-400">
          <Rich text={IQ200_CHALLENGE2_17.andSoOn} />
        </div>
      </div>

      <div className="grid gap-3">
        {IQ200_CHALLENGE2_17.model.map((m, i) => {
          const isOn = open.has(i);
          return (
            <div key={m.owner} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span dir="ltr">
                  <En className="rounded-xl bg-violet-100 px-3 py-2 text-base font-black text-violet-800">{m.owner}</En>
                </span>
                <button
                  onClick={() =>
                    setOpen((s) => {
                      const n = new Set(s);
                      if (n.has(i)) n.delete(i);
                      else n.add(i);
                      return n;
                    })
                  }
                  className="rounded-xl bg-violet-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-violet-700"
                >
                  {isOn ? "إخفاء الحل" : "اكشف الحل"}
                </button>
              </div>
              {isOn && (
                <div className="mt-3 grid gap-1.5" dir="ltr">
                  <En className="block rounded-xl bg-indigo-50 px-3 py-2 text-base font-bold text-indigo-900">{m.adj}</En>
                  <En className="block rounded-xl bg-amber-50 px-3 py-2 text-base font-black text-amber-900">{m.pron}</En>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// 45 — التحدي النهائي (مهمة إبداعية مع كشف آلي)
// ============================================================
function FinalChallengeEx() {
  const [text, setText] = useState("");
  const lower = text.toLowerCase();
  const words = [...FINAL_CHALLENGE_17.words, FINAL_CHALLENGE_17.alt];
  const used = words.filter((w) => new RegExp(`\\b${w.replace(/'/g, "\\'")}\\b`).test(lower));
  const whoseCount = (text.match(/whose/gi) || []).length;
  const lines = text.split("\n").filter((l) => l.trim().length > 0).length;
  const complete = used.length >= 10 && whoseCount >= 2 && lines >= 10;
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-amber-700">🏆 التحدي النهائي</div>
        <Rich text={FINAL_CHALLENGE_17.task} className="block text-center text-lg font-bold text-slate-800" />
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={FINAL_CHALLENGE_17.mustUse} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
          {FINAL_CHALLENGE_17.words.map((w) => {
            const on = used.includes(w);
            return (
              <span
                key={w}
                dir="ltr"
                className={`font-en rounded-lg border-2 px-2.5 py-1 text-sm font-black transition ${
                  on ? "border-emerald-300 bg-emerald-100 text-emerald-800" : "border-slate-200 bg-white text-slate-500"
                }`}
              >
                {on ? "✅ " : ""}
                {w}
              </span>
            );
          })}
          <span dir="rtl" className="text-sm font-bold text-slate-500">
            <Rich text={FINAL_CHALLENGE_17.orLabel} />
          </span>
          <span
            dir="ltr"
            className={`font-en rounded-lg border-2 px-2.5 py-1 text-sm font-black transition ${
              used.includes(FINAL_CHALLENGE_17.alt)
                ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {used.includes(FINAL_CHALLENGE_17.alt) ? "✅ " : ""}
            {FINAL_CHALLENGE_17.alt}
          </span>
        </div>
        <div className="mt-3 text-center text-sm font-bold text-slate-600">
          <Rich text={FINAL_CHALLENGE_17.whoseRequirement} />{" "}
          <En className="rounded-lg bg-white px-2 py-0.5 font-black text-amber-800">{FINAL_CHALLENGE_17.whoseWord}</En>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-500">
          <Rich text={FINAL_CHALLENGE_17.exampleLabel} /> <En className="font-bold text-slate-700">{FINAL_CHALLENGE_17.example}</En>
        </div>
        <div className="mt-2 text-center text-xs font-bold text-rose-600">
          <Rich text={FINAL_CHALLENGE_17.note} />
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <div className="mb-2 text-sm font-bold text-slate-600">✍️ اكتب حوارك هنا — سيُفحص تلقائياً:</div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder={"A: Whose notebook is this?\nB: It's mine. ..."}
          className="font-en w-full rounded-2xl border-2 border-slate-200 p-3 text-left text-base font-bold leading-relaxed outline-none focus:border-indigo-400"
        />
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className={`rounded-2xl border-2 p-3 text-center ${lines >= 10 ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-2xl font-black text-slate-800">{lines}</div>
            <div className="text-xs font-bold text-slate-500">من 10 أسطر</div>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center ${used.length >= 10 ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-2xl font-black text-slate-800">{used.length}</div>
            <div className="text-xs font-bold text-slate-500">كلمة ملكية مستخدمة</div>
          </div>
          <div className={`rounded-2xl border-2 p-3 text-center ${whoseCount >= 2 ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="text-2xl font-black text-slate-800">{whoseCount}</div>
            <div dir="ltr" className="font-en text-xs font-bold text-slate-500">
              Whose...?
            </div>
          </div>
        </div>
        <div
          className={`mt-3 rounded-2xl p-3 text-center text-sm font-bold ${
            complete ? "bg-emerald-100 text-emerald-800" : "bg-amber-50 text-amber-800"
          }`}
        >
          {complete ? "🏆 أحسنت! الحوار استوفى كل الشروط." : "أكمل الشروط: 10 أسطر + 10 كلمات ملكية + سؤالان بـ Whose...?"}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Exercise dispatcher
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise17 }) {
  switch (exercise.type) {
    case "level1":
      return <ChooseExercise items={LEVEL1_17} />;
    case "level2":
      return <Level2Ex />;
    case "level3":
      return <ChooseExercise items={LEVEL3_17} />;
    case "level4":
      return <Level4Ex />;
    case "level5":
      return <Level5Ex />;
    case "level6":
      return <Level6Ex />;
    case "detective":
      return <DetectiveEx />;
    case "iq200":
      return <IQ200Ex />;
    case "iq200b":
      return <IQ200BEx />;
    case "finalChallenge":
      return <FinalChallengeEx />;
  }
}

// ============================================================
// Block dispatcher
// ============================================================
function BlockView({ block }: { block: Block17 }) {
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
    case "recapBoard":
      return <RecapBoard />;
    case "coreMapBoard":
      return <CoreMapBoard />;
    case "mustMemorize":
      return <MustMemorize />;
    case "basicDifferenceBoard":
      return <BasicDifferenceBoard />;
    case "transformMachine":
      return <TransformMachine />;
    case "nounRemovalLab":
      return <NounRemovalLab />;
    case "beforeAfterCards":
      return <BeforeAfterCards />;
    case "magicMove":
      return <MagicMove />;
    case "adjPronPairs":
      return <AdjPronPairs pairs={block.pairs} />;
    case "pairBoard":
      return <PairBoardView board={block.board} />;
    case "sentenceCompare":
      return <SentenceCompare a={block.a} b={block.b} />;
    case "myMineAlarm":
      return <MyMineAlarm />;
    case "detector":
      return <Detector group={block.group} />;
    case "hisDoubleRole":
      return <HisDoubleRole />;
    case "trioChips":
      return <TrioChips items={block.items} />;
    case "trioTable":
      return <TrioTable rows={block.rows} />;
    case "tripleCompare":
      return <TripleCompare />;
    case "comparisonTable":
      return <ComparisonTable />;
    case "numberTrap":
      return <NumberTrap />;
    case "counterBoard":
      return <CounterBoard />;
    case "threeSystems":
      return <ThreeSystems />;
    case "threeSystemMap":
      return <ThreeSystemMap />;
    case "threeWayBoard":
      return <ThreeWayBoard />;
    case "whoseLab":
      return <WhoseLab />;
    case "whoseAnswerBoard":
      return <WhoseAnswerBoard />;
    case "dialogue":
      return <DialogueView lines={block.lines} />;
    case "itsBoard":
      return <ItsBoard />;
  }
}

// ============================================================
// Cover
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-indigo-200 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-8 text-white shadow-xl md:p-12">
      <div className="text-7xl anim-float">🔬</div>
      <div dir="ltr" className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
        <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.22em] text-amber-200">
          {LAB_NAME_17}
        </span>
      </div>
      <h1 className="font-head mt-4 text-3xl font-bold md:text-5xl">
        <Rich text={LESSON_TITLE_17} />
      </h1>
      <div className="mt-2 text-xl font-bold text-indigo-100">
        <Rich text="ضمائر الملكية — mine / yours / his / hers / ours / theirs" />
      </div>
      <div className="mt-6 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-indigo-50">
        <Rich text={COVER_PLAN_17} />
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-6 grid gap-2 rounded-2xl bg-white/10 p-4 sm:grid-cols-2">
        {TRANSFORM_LAB_17.map((p) => (
          <div key={p.adj + p.noun} className="flex items-center justify-center gap-2">
            <span dir="ltr" className="font-en rounded-lg bg-white/15 px-2 py-1 text-sm font-black">
              {`${p.adj} ${p.noun}`}
            </span>
            <span dir="ltr" className="font-en text-amber-200">
              →
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-amber-300/25 px-2 py-1 text-sm font-black text-amber-100">
              {p.pron}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-indigo-100">
        <Rich text={LAB_MOTTO_17} />
      </div>
    </div>
  );
}

// ============================================================
// Objectives
// ============================================================
const CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧"];
function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس، يجب أن يستطيع الطالب:">
      <div className="grid gap-2">
        {OBJECTIVES_17.map((obj, i) => (
          <div key={obj.n} className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
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
                      obj.itemsEn ? "font-en bg-white text-indigo-800" : "bg-white text-slate-700"
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
// الخلاصة الكبرى
// ============================================================
function Summary() {
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[46]} title="الخلاصة الكبرى">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-indigo-200 bg-indigo-50/60 p-4">
          <div className="text-center text-lg font-bold text-indigo-800">
            <Rich text={GRAND_SUMMARY_17.beforeNoun.title} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l17-sum-adj" className="ltr-row mt-3 flex flex-wrap justify-center gap-1.5">
            {GRAND_SUMMARY_17.beforeNoun.words.map((w) => (
              <span key={w} dir="ltr" className="font-en rounded-xl bg-white px-3 py-2 text-base font-black text-indigo-900">
                {w}
              </span>
            ))}
          </div>
          <div className="mt-3 text-center text-sm font-bold text-slate-500">
            <Rich text={GRAND_SUMMARY_17.beforeNoun.exampleLabel} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-1 grid gap-1.5">
            {GRAND_SUMMARY_17.beforeNoun.examples.map((e) => (
              <span key={e} dir="ltr" className="font-en rounded-xl bg-white px-3 py-2 text-center text-base font-bold text-indigo-800">
                {e}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-4">
          <div className="text-center text-lg font-bold text-amber-800">
            <Rich text={GRAND_SUMMARY_17.withoutNoun.title} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l17-sum-pron" className="ltr-row mt-3 flex flex-wrap justify-center gap-1.5">
            {GRAND_SUMMARY_17.withoutNoun.words.map((w) => (
              <span key={w} dir="ltr" className="font-en rounded-xl bg-white px-3 py-2 text-base font-black text-amber-900">
                {w}
              </span>
            ))}
          </div>
          <div className="mt-3 text-center text-sm font-bold text-slate-500">
            <Rich text={GRAND_SUMMARY_17.withoutNoun.exampleLabel} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-1 grid gap-1.5">
            {GRAND_SUMMARY_17.withoutNoun.examples.map((e) => (
              <span key={e} dir="ltr" className="font-en rounded-xl bg-white px-3 py-2 text-center text-base font-bold text-amber-800">
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// ⭐ قاعدة IQ200
// ============================================================
function IQ200Rule() {
  return (
    <Frame mascot="⭐" sourceHeading={SOURCE_SECTIONS[47]} title="قاعدة IQ200" lead={IQ200_RULE_17.memorize}>
      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        data-en-seq="l17-iq200rule"
        className="ltr-row grid justify-items-center gap-2 rounded-3xl border-2 border-fuchsia-200 bg-fuchsia-50 p-5"
      >
        <span dir="ltr" className="font-en rounded-2xl bg-white px-5 py-3 text-xl font-black text-fuchsia-800">
          {IQ200_RULE_17.formula}
        </span>
        <span dir="ltr" className="font-en text-xl font-black text-fuchsia-400">
          ↓
        </span>
        <span dir="ltr" className="font-en rounded-2xl bg-white px-5 py-3 text-lg font-black text-indigo-800">
          {IQ200_RULE_17.example}
        </span>
        <span dir="ltr" className="font-en text-lg font-black text-fuchsia-400">
          ↓
        </span>
        <span dir="rtl" className="text-sm font-bold text-fuchsia-700">
          <Rich text={IQ200_RULE_17.thenRemove} />
        </span>
        <span dir="ltr" className="font-en rounded-2xl bg-white px-5 py-3 text-lg font-black text-violet-800">
          {IQ200_RULE_17.conversion}
        </span>
        <span dir="ltr" className="font-en text-xl font-black text-fuchsia-400">
          ↓
        </span>
        <span dir="ltr" className="font-en rounded-2xl bg-amber-200 px-5 py-3 text-xl font-black text-amber-900">
          {IQ200_RULE_17.result}
        </span>
      </div>
      <div className="mt-4 text-center text-sm font-bold text-slate-500">
        <Rich text={IQ200_RULE_17.sameThing} />
      </div>
      <FormulaStrip items={IQ200_RULE_17.pairs} />
    </Frame>
  );
}

// ============================================================
// 🚨 أهم 5 أخطاء ممنوعة
// ============================================================
function FiveErrors() {
  const [open, setOpen] = useState<Set<number>>(() => new Set(FIVE_FORBIDDEN_17.map((e) => e.n - 1)));
  return (
    <Frame mascot="🚨" sourceHeading={SOURCE_SECTIONS[48]} title="أهم 5 أخطاء ممنوعة">
      <div className="grid gap-3">
        {FIVE_FORBIDDEN_17.map((e, i) => {
          const isOn = open.has(i);
          return (
            <button
              key={e.n}
              onClick={() =>
                setOpen((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
              className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-4 text-right transition hover:border-rose-300"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-600 text-base font-bold text-white">
                  {e.n}
                </span>
                <En className="flex-1 text-base font-black text-rose-700 line-through decoration-rose-300">{e.wrong}</En>
                <span className="text-lg">❌</span>
              </div>
              {isOn && (
                <div className="mt-3 flex items-center gap-3 pr-12">
                  <En className="flex-1 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                    {e.correct}
                  </En>
                  <span className="text-lg">✅</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl bg-slate-50 p-3 text-center text-xs font-bold text-slate-400">
        اضغط على كل خطأ لتكشف الجملة الصحيحة
      </div>
    </Frame>
  );
}

// ============================================================
// 🗺️ خريطة المنهج بعد الدرس 17
// ============================================================
function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[49]} title="خريطة المنهج بعد الدرس 17" lead="تسلسل القواعد حتى الآن:">
      <div className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_17.map((it) => (
          <div
            key={it.n}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${
              it.here ? "border-indigo-400 bg-indigo-100 shadow" : "border-slate-100 bg-white"
            }`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${
                it.here ? "bg-indigo-600" : "bg-slate-500"
              }`}
            >
              {it.n}
            </span>
            <div>
              <div dir="ltr" className={`font-en text-sm font-bold ${it.here ? "text-indigo-900" : "text-slate-700"}`}>
                {it.en}
              </div>
              <div className="text-xs font-bold text-slate-500">{it.ar}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 whitespace-pre-line rounded-3xl border-2 border-indigo-200 bg-indigo-50 p-5">
        <Rich text={ROADMAP_17_CLOSING} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" />
      </div>
    </Frame>
  );
}

// ============================================================
// Closing
// ============================================================
function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-indigo-200 bg-gradient-to-br from-indigo-600 via-violet-700 to-fuchsia-700 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 17.</h2>
      <div className="mt-4 text-lg leading-relaxed text-indigo-50">
        <Rich text="الآن أصبحت منظومة الملكية الأساسية كاملة: my / your / his / her / our / their قبل الاسم، و mine / yours / his / hers / ours / theirs وحدها بدون اسم بعدها. والسؤال المفتاحي أصبح: هل بعدها اسم؟" />
      </div>
      <div className="mt-4 whitespace-pre-line rounded-2xl bg-white/10 p-4">
        <Rich text={ROADMAP_17_CLOSING} />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 transition hover:bg-indigo-50">
          ← جميع الدروس
        </button>
        <span className="rounded-xl border-2 border-white/40 px-5 py-3 font-bold text-white/80">
          <Rich text="الدرس 18 قريباً → الأسماء والجمع Irregular Plurals" />
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Source heading resolver — يربط كل شريحة بعنوانها في المصدر
// ============================================================
function sourceHeadingFor(slide: Slide17): string | undefined {
  if (slide.kind === "objectives") return SOURCE_SECTIONS[0];
  if (slide.kind === "lesson") return SOURCE_SECTIONS[Number(slide.step)];
  if (slide.kind === "ex") {
    const n = Number(slide.badge);
    return Number.isFinite(n) && n >= 1 ? SOURCE_SECTIONS[n] : undefined;
  }
  if (slide.kind === "summary") return SOURCE_SECTIONS[46];
  if (slide.kind === "iq200Rule") return SOURCE_SECTIONS[47];
  if (slide.kind === "fiveErrors") return SOURCE_SECTIONS[48];
  if (slide.kind === "roadmap") return SOURCE_SECTIONS[49];
  return undefined;
}

export function SlideView17({ s, onExit }: { s: Slide17; onExit: () => void }) {
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
    case "iq200Rule":
      return <IQ200Rule />;
    case "fiveErrors":
      return <FiveErrors />;
    case "roadmap":
      return <Roadmap />;
    case "quiz":
      return (
        <Frame
          mascot={s.mascot}
          badge="الاختبار النهائي"
          title={<Rich text={s.title} />}
          lead="أسئلة جديدة تقيس فهم ضمائر الملكية والفرق بينها وبين صفات الملكية."
        >
          <FinalQuiz lesson={17} accent="bg-indigo-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide17): string {
  if (slide.kind === "cover") return "الغلاف";
  if (slide.kind === "objectives") return "أهداف الدرس";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-400",
  "من الدرس 16 إلى 17": "text-sky-600",
  "الخريطة والفرق الأساسي": "text-indigo-600",
  "آلة التحويل — كل ضمير": "text-emerald-600",
  "قواعد لا تتغير": "text-amber-600",
  "أنظمة الملكية الثلاثة": "text-violet-600",
  "الاستخدام والسؤال Whose": "text-teal-600",
  "الأزواج: صفة ↔ ضمير": "text-fuchsia-600",
  "الفخاخ والأخطاء": "text-rose-600",
  "الملكية والعدد": "text-orange-600",
  "التمارين والتحديات": "text-blue-600",
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
          <Rich text="الدرس 17 · Possessive Pronouns" />
        </div>
        <En className="text-xs font-semibold text-slate-400">🔬 {LAB_NAME_17}</En>
        <div className="mt-2 rounded-lg bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-600">
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
                    active ? "bg-indigo-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
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
      <div className="border-t border-slate-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسحة</div>
    </aside>
  );
}

export default function Lesson17({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l17-main")?.scrollTo({ top: 0 });
  }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div
      dir="rtl"
      className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#eef2ff] text-slate-800"
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
                  className="h-full rounded-full bg-gradient-to-l from-indigo-600 via-violet-500 to-fuchsia-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {`${index + 1} / ${total}`}
            </span>
          </header>
          <main id="l17-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={index} className="pop mx-auto max-w-4xl">
              <SlideView17 s={slide} onExit={onExit} />
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
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-700 disabled:opacity-30"
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
