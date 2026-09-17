import { useEffect, useMemo, useState } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_NUMBERED_COUNT,
  LESSON_TITLE_19,
  LESSON_SUBTITLE_19,
  LAB_NAME_19,
  LAB_MOTTO_19,
  COVER_19,
  LAB_FLOW_19,
  OBJECTIVES_19,
  S1_DEFINITION_19,
  S1_BASIC_RULE_19,
  S2_THINKING_19,
  S2_IQ200_19,
  S3_SINGULAR_19,
  S4_MULTI_19,
  BOYS_WORDS_19,
  S5_NUMBER_19,
  NUMBER_DETECT_19,
  S6_IRREGULAR_19,
  IRREGULAR_FAMILIES_19,
  S10_TEETH_FEET_19,
  RULE_SYSTEM_19,
  GOLDEN_TABLE_19,
  APOSTROPHE_MACHINE_19,
  S11_NOT_OWNING_19,
  S12_VS_ADJ_19,
  S13_THREE_SYSTEMS_19,
  THREE_SYSTEM_MACHINE_19,
  S14_NOT_PLURAL_19,
  APOSTROPHE_PLURAL_19,
  OWNER_DETECT_19,
  CHILD_FAMILY_19,
  DETECTIVE_19,
  CHALLENGE1_19,
  CHALLENGE2_19,
  IQ200_CHALLENGE_19,
  IQ200_MEANING_19,
  FINAL_BOSS_19,
  SPEED_TEST_19,
  SUMMARY_19,
  FINAL_RULE_19,
  ROADMAP_19,
  ROADMAP_19_CLOSING,
  OWNERSHIP_SYSTEM_19,
  NEXT_STEP_19,
  type Block19,
  type Exercise19,
  type Slide19,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// الدرس 19 — POSSESSION LAB — THE APOSTROPHE DETECTIVE
// count the owners ↓ ends in s? ↓ place the apostrophe ↓ POSSESSIVE
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
            <span key={i} dir="ltr" style={{ direction: "ltr" }} className="ltr font-en rounded-lg bg-amber-500/10 px-1.5 py-0.5 font-bold text-slate-800">
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
          ? "border-amber-300 bg-amber-50 text-amber-900"
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
    <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-3">
      <Rich text={text} className="text-base font-bold text-slate-800 md:text-lg" />
    </div>
  );
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
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
      className="relative rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-6 shadow-[0_14px_44px_-20px_rgba(217,119,6,0.25)] md:p-9"
    >
      <div className="pointer-events-none absolute -left-2 top-4 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className={`font-head grid h-10 w-10 place-items-center rounded-2xl text-lg font-bold text-white ${step === "★" ? "bg-gradient-to-br from-amber-500 to-rose-600" : "bg-amber-600"}`}>
            {step}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-bold text-amber-800">
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
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-amber-600 to-rose-600 p-4 text-white">
          <span className="text-2xl">🕵️</span>
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
      className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-amber-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.18em] text-amber-700">
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

/** شارة apostrophe الذهبية — الأداة الصغيرة القوية. */
function MarkChip({ mark, big = false }: { mark: string; big?: boolean }) {
  return (
    <span
      dir="ltr"
      className={`font-en inline-grid place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 font-black text-amber-950 shadow ring-2 ring-amber-400/60 ${
        big ? "h-12 min-w-12 px-3 text-2xl" : "px-2 py-0.5 text-base"
      }`}
    >
      {mark}
    </span>
  );
}

// ============================================================
// 2 — معادلات = the ... of ...
// ============================================================
function OfPairs() {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l19-ofpairs" className="ltr-row grid gap-2">
      {S2_THINKING_19.pairs.map((p) => (
        <div key={p.poss} className="rounded-2xl border-2 border-white bg-white p-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span dir="ltr" className="font-en rounded-lg bg-amber-100 px-2.5 py-1 text-base font-black text-amber-900">
              {p.poss}
            </span>
            <span dir="ltr" className="font-en text-lg font-black text-slate-400">
              =
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2.5 py-1 text-base font-black text-slate-700">
              {p.of}
            </span>
          </div>
          <div dir="rtl" className="mt-1.5 text-center text-sm font-bold text-slate-500">
            <Rich text={`أي: ${p.ar}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// A) OWNER DETECTOR — لمن هذا الشيء؟
// ============================================================
function OwnerDetector() {
  const [i, setI] = useState(0);
  const cur = OWNER_DETECT_19[i];
  return (
    <LabPanel emoji="🔍" label="OWNER DETECTOR" ar="«لِمَن هذا الشيء؟» — اضغط العبارة" seq="l19-owner">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-1.5">
        {OWNER_DETECT_19.map((p, idx) => (
          <button
            key={p.phrase}
            onClick={() => setI(idx)}
            dir="ltr"
            className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${
              idx === i ? "border-amber-600 bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"
            }`}
          >
            {p.phrase}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-3xl border-2 border-white bg-white p-4">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="font-en rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-2 text-lg font-black text-slate-900">
            {cur.phrase}
          </span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
            <div className="text-xs font-bold text-amber-700">
              <Rich text="المالك — Who owns it?" />
            </div>
            <div dir="ltr" className="mt-1.5">
              <En className="rounded-xl bg-white px-3 py-1.5 text-lg font-black text-amber-900">{cur.owner}</En>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 text-center">
            <div className="text-xs font-bold text-sky-700">
              <Rich text="الشيء — The thing" />
            </div>
            <div dir="ltr" className="mt-1.5">
              <En className="rounded-xl bg-white px-3 py-1.5 text-lg font-black text-sky-900">{cur.thing}</En>
            </div>
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 3 — Singular board (Noun + 's)
// ============================================================
function SingularBoard() {
  const [lit, setLit] = useState<Set<number>>(new Set());
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq="l19-singular"
      className="ltr-row grid gap-2 sm:grid-cols-2"
    >
      {S3_SINGULAR_19.examples.map((e, i) => {
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
              on ? "border-amber-300 bg-amber-50 shadow" : "border-slate-200 bg-white hover:border-amber-200"
            }`}
          >
            <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2.5 py-1 text-base font-black text-slate-700">
              {e.sing}
            </span>
            <span
              dir="ltr"
              className={`font-en rounded-lg px-2 py-0.5 text-sm font-black transition ${
                on ? "bg-amber-400 text-amber-950 ring-2 ring-amber-500/60" : "bg-amber-100 text-amber-700"
              }`}
            >
              + 's
            </span>
            <span dir="ltr" className="font-en text-lg font-black text-amber-500">
              =
            </span>
            <span dir="ltr" className="font-en rounded-lg bg-amber-100 px-2.5 py-1 text-base font-black text-amber-800">
              {e.poss}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// D) BOY'S vs BOYS' VISUAL COMPARATOR
// ============================================================
function WordLetters({ word, mark, markLast }: { word: string; mark: string; markLast: boolean }) {
  const letters = word.split("");
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-1">
      {letters.map((l) => (
        <span key={l} dir="ltr" className="font-en rounded-lg bg-slate-100 px-2 py-1 text-xl font-black text-slate-700">
          {l}
        </span>
      ))}
      <span
        dir="ltr"
        className={`font-en rounded-lg px-2 py-1 text-xl font-black ring-2 ${
          markLast ? "bg-gradient-to-br from-amber-300 to-orange-400 text-amber-950 ring-amber-500/70 anim-drift" : "bg-slate-100 text-slate-300"
        }`}
      >
        {mark}
      </span>
    </div>
  );
}

function BoysComparator() {
  const [count, setCount] = useState(1);
  const isOne = count === 1;
  return (
    <LabPanel emoji="⚖️" label="BOY'S vs BOYS' COMPARATOR" ar="الفرق حرف واحد فقط!" seq="l19-comparator">
      <div className="mb-3 flex justify-center gap-2">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setCount(n)}
            className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
              count === n ? "bg-amber-600 text-white shadow" : "border-2 border-slate-200 bg-white text-slate-500"
            }`}
          >
            {n === 1 ? "مالك واحد" : `${n} أصحاب`}
          </button>
        ))}
      </div>

      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2 rounded-3xl border-2 border-white bg-white p-4">
        <span className="text-2xl">{Array.from({ length: count }).map(() => "👦").join(" ")}</span>
        <span dir="ltr" className={`font-en rounded-2xl border-2 px-4 py-2 text-lg font-black ${isOne ? "border-amber-300 bg-amber-50 text-slate-900" : "border-violet-300 bg-violet-50 text-slate-900"}`}>
          {isOne ? "The boy's bag." : "The boys' bags."}
        </span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-amber-200 bg-white p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">👦</span>
            <span dir="ltr" className="font-en rounded-lg bg-amber-600 px-2.5 py-1 text-sm font-black text-white">
              ONE boy
            </span>
          </div>
          <div dir="ltr" className="mt-2">
            <En className="block text-center text-lg font-black text-slate-900">{S4_MULTI_19.compare.a.en}</En>
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-500">
            <Rich text={S4_MULTI_19.compare.a.ar} />
          </div>
          <div className="mt-3">
            <WordLetters word={BOYS_WORDS_19.one.letters.join("")} mark={BOYS_WORDS_19.one.mark} markLast />
          </div>
          <div className="mt-2 text-center text-xs font-bold text-amber-700">
            <Rich text="boy's = ولد واحد يملك شيئًا." />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-white p-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">👦👦</span>
            <span dir="ltr" className="font-en rounded-lg bg-violet-600 px-2.5 py-1 text-sm font-black text-white">
              MORE THAN ONE boy
            </span>
          </div>
          <div dir="ltr" className="mt-2">
            <En className="block text-center text-lg font-black text-slate-900">{S4_MULTI_19.compare.b.en}</En>
          </div>
          <div className="mt-1 text-center text-sm font-bold text-slate-500">
            <Rich text={S4_MULTI_19.compare.b.ar} />
          </div>
          <div className="mt-3">
            <WordLetters word={BOYS_WORDS_19.many.letters.join("")} mark={BOYS_WORDS_19.many.mark} markLast />
          </div>
          <div className="mt-2 text-center text-xs font-bold text-violet-700">
            <Rich text="boys' = أكثر من ولد يملكون شيئًا." />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// B) NUMBER DETECTOR
// ============================================================
function NumberDetector() {
  const [open, setOpen] = useState<number | null>(0);
  const accents = [
    { chip: "bg-amber-600 text-white", box: "border-amber-300 bg-amber-50/70" },
    { chip: "bg-violet-600 text-white", box: "border-violet-300 bg-violet-50/70" },
    { chip: "bg-rose-600 text-white", box: "border-rose-300 bg-rose-50/70" },
  ];
  return (
    <LabPanel emoji="🔢" label="NUMBER DETECTOR" ar="حدد عدد المالكين ثم اختر النمط" seq="l19-number">
      <div className="grid gap-2 md:grid-cols-3">
        {NUMBER_DETECT_19.map((lane, i) => {
          const on = open === i;
          const a = accents[i];
          return (
            <button
              key={lane.label}
              onClick={() => setOpen(on ? null : i)}
              className={`rounded-2xl border-2 p-3 text-right transition ${on ? `${a.box} shadow` : "border-slate-200 bg-white opacity-80"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{lane.emoji}</span>
                <span dir="ltr" className={`font-en rounded-xl px-2.5 py-1 text-[11px] font-black ${a.chip}`}>
                  {lane.label}
                </span>
              </div>
              <div className="mt-1.5 text-center text-xs font-bold text-slate-500">
                <Rich text={lane.ar} />
              </div>
              <div dir="ltr" className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <span dir="ltr" className="font-en rounded-lg bg-white px-2.5 py-1 text-base font-black text-slate-800 shadow-sm">
                  {lane.example}
                </span>
                <span dir="ltr" className="font-en text-lg font-black text-slate-400">
                  →
                </span>
                <span dir="ltr" className={`font-en rounded-lg px-2.5 py-1 text-base font-black ${on ? "bg-amber-400 text-amber-950 ring-2 ring-amber-500/60" : "bg-slate-100 text-slate-400"}`}>
                  {on ? lane.result : "•••"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </LabPanel>
  );
}

// ============================================================
// E) CHILD / CHILDREN FAMILY
// ============================================================
function ChildFamily() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  return (
    <LabPanel emoji="🧒" label="CHILD / CHILDREN FAMILY" ar="عائلة الطفل — اضغط لفك الملكية" seq="l19-childfamily">
      <div className="grid gap-3 sm:grid-cols-2">
        {CHILD_FAMILY_19.branches.map((b, i) => {
          const on = open.has(i);
          return (
            <button
              key={b.word}
              onClick={() =>
                setOpen((s) => {
                  const n = new Set(s);
                  if (n.has(i)) n.delete(i);
                  else n.add(i);
                  return n;
                })
              }
              className={`rounded-3xl border-2 p-4 text-center transition ${on ? "border-amber-300 bg-white shadow" : "border-slate-200 bg-white/70"}`}
            >
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid justify-items-center gap-1">
                <span dir="ltr" className={`font-en rounded-xl px-4 py-1.5 text-xl font-black ${i === 0 ? "bg-amber-100 text-amber-900" : "bg-violet-100 text-violet-900"}`}>
                  {b.word}
                </span>
                <span dir="ltr" className="font-en text-lg font-black text-slate-300">
                  ↓
                </span>
                <span dir="ltr" className={`font-en rounded-xl px-4 py-1.5 text-xl font-black ${on ? "bg-amber-400 text-amber-950 ring-2 ring-amber-500/60" : "bg-slate-100 text-slate-300"}`}>
                  {on ? b.poss : "•••"}
                </span>
              </div>
              <div className="mt-2 text-center text-sm font-bold text-slate-500">
                <Rich text={b.label} />
              </div>
              {on && (
                <div dir="ltr" className="mt-2">
                  <En className="rounded-xl bg-slate-50 px-3 py-1.5 text-base font-black text-slate-800">{b.example}</En>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-rose-300 bg-rose-50 p-3 text-center">
        <div className="text-sm font-bold text-slate-600">
          <Rich text={CHILD_FAMILY_19.dont} />
        </div>
        <div dir="ltr" className="mt-1.5 flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="font-en rounded-xl bg-white px-3 py-1.5 text-lg font-black text-rose-600 line-through decoration-rose-300">
            {CHILD_FAMILY_19.wrong} ❌
          </span>
          <span dir="ltr" className="font-en text-lg font-black text-slate-400">
            →
          </span>
          <span dir="ltr" className="font-en rounded-xl bg-emerald-100 px-3 py-1.5 text-lg font-black text-emerald-800">
            {CHILD_FAMILY_19.correct} ✅
          </span>
        </div>
        <div className="mt-1.5 text-sm font-bold text-slate-500">
          <Rich text={CHILD_FAMILY_19.why} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 7–10 — العائلات الشاذة (بطاقات قابلة للقلب)
// ============================================================
function IrregularFamilyCard({ which }: { which: "man" | "woman" | "person" | "tooth" }) {
  const f = IRREGULAR_FAMILIES_19[which];
  const [open, setOpen] = useState(false);
  return (
    <LabPanel emoji={f.emoji} label="IRREGULAR FAMILY" ar="المفرد والجمع — اضغط لكشف الملكية" seq={`l19-family-${which}`}>
      <button onClick={() => setOpen((o) => !o)} className="block w-full rounded-3xl border-2 border-white bg-white p-4 text-center shadow-sm transition hover:shadow">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-2">
          <span dir="ltr" className="font-en rounded-xl bg-amber-100 px-3 py-1.5 text-xl font-black text-amber-900">
            {f.sing}
          </span>
          <span dir="ltr" className="font-en text-xl font-black text-slate-400">
            →
          </span>
          <span dir="ltr" className="font-en rounded-xl bg-violet-100 px-3 py-1.5 text-xl font-black text-violet-900">
            {f.plural}
          </span>
          <span className="text-2xl">{f.emoji}</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/60 p-2.5">
            <div className="text-xs font-bold text-amber-700">
              <Rich text="مفرد → ملكية:" />
            </div>
            <div dir="ltr" className="mt-1">
              <En className={`text-lg font-black ${open ? "text-slate-900" : "text-slate-300"}`}>{open ? f.singPoss : "•••"}</En>
            </div>
            <div dir="ltr" className={`mt-1 ${open ? "opacity-100" : "opacity-0"}`}>
              <En className="rounded-lg bg-white px-2 py-1 text-sm font-bold text-slate-600">{f.singEx}</En>
              <div dir="rtl" className="mt-0.5 text-xs font-bold text-slate-400">
                <Rich text={f.singExAr} />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-violet-100 bg-violet-50/60 p-2.5">
            <div className="text-xs font-bold text-violet-700">
              <Rich text="جمع → ملكية:" />
            </div>
            <div dir="ltr" className="mt-1">
              <En className={`text-lg font-black ${open ? "text-slate-900" : "text-slate-300"}`}>{open ? f.plPoss : "•••"}</En>
            </div>
            <div dir="ltr" className={`mt-1 ${open ? "opacity-100" : "opacity-0"}`}>
              <En className="rounded-lg bg-white px-2 py-1 text-sm font-bold text-slate-600">{f.plEx}</En>
              <div dir="rtl" className="mt-0.5 text-xs font-bold text-slate-400">
                <Rich text={f.plExAr} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs font-bold text-slate-400">{open ? "اضغط للإخفاء" : "اضغط لتكشف صيغ الملكية"}</div>
      </button>
    </LabPanel>
  );
}

// ============================================================
// نظام القواعد الكامل — الحالات الثلاث
// ============================================================
function RuleCases() {
  const accents = [
    { chip: "bg-amber-600 text-white", soft: "border-amber-200 bg-amber-50/60" },
    { chip: "bg-violet-600 text-white", soft: "border-violet-200 bg-violet-50/60" },
    { chip: "bg-rose-600 text-white", soft: "border-rose-200 bg-rose-50/60" },
  ];
  return (
    <div data-en-seq="l19-rules" className="grid gap-3 md:grid-cols-3">
      {RULE_SYSTEM_19.cases.map((c, i) => {
        const a = accents[i];
        return (
          <div key={c.n} className={`rounded-3xl border-2 p-4 text-center ${a.soft}`}>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg">{c.n}</span>
              <span dir="ltr" className={`font-en rounded-xl px-2.5 py-1 text-xs font-black ${a.chip}`}>
                CASE {i + 1}
              </span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-700">
              <Rich text={c.title} />
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap items-center justify-center gap-2">
              <span dir="ltr" className="font-en rounded-lg bg-white px-2.5 py-1 text-lg font-black text-slate-800 shadow-sm">
                {c.word}
              </span>
              <span dir="ltr" className="font-en text-lg font-black text-slate-400">
                →
              </span>
              <MarkChip mark={i === 1 ? "'" : "'s"} />
              <span dir="ltr" className="font-en rounded-lg bg-white px-2.5 py-1 text-lg font-black text-slate-900 shadow-sm">
                {c.poss}
              </span>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-500">
              <Rich text={c.exampleLabel} />
            </div>
            <div dir="ltr" className="mt-1">
              <En className="rounded-xl bg-white px-3 py-1.5 text-base font-black text-slate-800 shadow-sm">{c.example}</En>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// جدول الحفظ الذهبي
// ============================================================
function GoldenTable() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  const Table = ({ rows, head, accent }: { rows: { sing: string; poss: string }[]; head: string; accent: "amber" | "violet" }) => (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row overflow-hidden rounded-2xl border-2 border-white bg-white shadow-sm">
      <div dir="ltr" className={`font-en px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white ${accent === "amber" ? "bg-amber-500" : "bg-violet-500"}`}>
        {head}
      </div>
      {rows.map((r, i) => {
        const on = open.has(i);
        return (
          <button
            key={r.sing}
            onClick={() => toggle(i)}
            dir="ltr"
            className="ltr-row flex w-full items-center justify-between gap-2 border-t border-slate-100 px-3 py-2 text-left transition hover:bg-amber-50/40"
          >
            <span dir="ltr" className="font-en text-base font-black text-slate-800">
              {r.sing}
            </span>
            <span dir="ltr" className="font-en text-sm font-black text-slate-300">
              →
            </span>
            <span dir="ltr" className={`font-en rounded-lg px-2 py-0.5 text-base font-black transition ${on ? (accent === "amber" ? "bg-amber-100 text-amber-900" : "bg-violet-100 text-violet-900") : "bg-slate-50 text-slate-300"}`}>
              {on ? r.poss : "•••"}
            </span>
          </button>
        );
      })}
    </div>
  );
  return (
    <LabPanel emoji="🏆" label="GOLDEN MEMORY TABLE" ar="اضغط على الصفوف لكشف الملكية" seq="l19-golden">
      <div className="grid gap-3 md:grid-cols-2">
        <Table rows={GOLDEN_TABLE_19.singular} head={GOLDEN_TABLE_19.singularHead} accent="amber" />
        <Table rows={GOLDEN_TABLE_19.plural} head={GOLDEN_TABLE_19.pluralHead} accent="violet" />
      </div>
    </LabPanel>
  );
}

// ============================================================
// C) APOSTROPHE MACHINE
// ============================================================
function ApostropheMachine() {
  const [mode, setMode] = useState(0);
  const [lit, setLit] = useState<number | null>(null);
  const cur = APOSTROPHE_MACHINE_19[mode];
  const pickMode = (n: number) => {
    setMode(n);
    setLit(null);
  };
  return (
    <LabPanel emoji="⚙️" label="APOSTROPHE MACHINE" ar="اختر النمط ثم شغّل الآلة" seq="l19-machine">
      <div className="flex flex-wrap justify-center gap-2">
        {APOSTROPHE_MACHINE_19.map((m, i) => (
          <button
            key={m.mode}
            onClick={() => pickMode(i)}
            className={`flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-1.5 transition ${
              i === mode ? "border-amber-600 bg-amber-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"
            }`}
          >
            <span dir="ltr" className="font-en text-xs font-black">
              {m.mode}
            </span>
            <span className="text-[11px] font-bold opacity-80">
              <Rich text={m.ar} />
            </span>
          </button>
        ))}
      </div>
      <div dir="ltr" style={{ direction: "ltr" }} data-en-seq={`l19-machine-mode-${mode}`} className="ltr-row mt-3 grid gap-2 sm:grid-cols-2">
        {cur.examples.map((e, i) => {
          const on = lit === i;
          return (
            <button
              key={e.word}
              onClick={() => setLit(on ? null : i)}
              dir="ltr"
              className={`ltr-row flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 p-2.5 transition ${
                on ? "border-amber-400 bg-white shadow" : "border-slate-200 bg-white/80 hover:border-amber-200"
              }`}
            >
              <span dir="ltr" className="font-en rounded-lg bg-slate-100 px-2.5 py-1 text-base font-black text-slate-700">
                {e.word}
              </span>
              <MarkChip mark={cur.add} />
              <span dir="ltr" className="font-en text-lg font-black text-slate-400">
                =
              </span>
              <span dir="ltr" className={`font-en rounded-lg px-2.5 py-1 text-base font-black ${on ? "bg-amber-400 text-amber-950 ring-2 ring-amber-500/60" : "bg-slate-50 text-slate-500"}`}>
                {on ? e.result : "•••"}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-bold text-slate-600">
            <Rich text="النمط:" />
          </span>
          <span dir="ltr" className="font-en rounded-lg bg-amber-100 px-2.5 py-1 text-sm font-black text-amber-900">
            {cur.mode}
          </span>
          <MarkChip mark={cur.add} />
        </div>
        {lit !== null && (
          <div dir="ltr" className="mt-1.5">
            <En className="text-base font-black text-slate-900">
              {cur.examples[lit].word} + {cur.add} = {cur.examples[lit].result}
            </En>
          </div>
        )}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 12 — تفكيك التركيبين
// ============================================================
function Breakdown({ which }: { which: "noun" | "adj" }) {
  const isNoun = which === "noun";
  const title = isNoun ? S12_VS_ADJ_19.aTitle : S12_VS_ADJ_19.bTitle;
  const rows = isNoun ? S12_VS_ADJ_19.aBreakdown : S12_VS_ADJ_19.bBreakdown;
  return (
    <div
      dir="ltr"
      style={{ direction: "ltr" }}
      data-en-seq={`l19-breakdown-${which}`}
      className={`ltr-row rounded-3xl border-2 p-4 ${isNoun ? "border-amber-200 bg-amber-50/50" : "border-sky-200 bg-sky-50/50"}`}
    >
      <div dir="ltr" className="text-center">
        <En className={`text-lg font-black ${isNoun ? "text-amber-900" : "text-sky-900"}`}>{title}</En>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.word + r.role} className="flex items-center gap-2 rounded-2xl border-2 border-white bg-white p-2.5 shadow-sm">
            <span dir="ltr" className={`font-en rounded-lg px-2.5 py-1 text-base font-black ${isNoun ? "bg-amber-100 text-amber-900" : "bg-sky-100 text-sky-900"}`}>
              {r.word}
            </span>
            <span dir="rtl" className="text-sm font-bold text-slate-500">
              <Rich text={r.role} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 13 — لوحة النظم الثلاثة
// ============================================================
function ThreeSystemsBoard() {
  const accents = [
    { chip: "bg-amber-600 text-white", soft: "border-amber-200 bg-white" },
    { chip: "bg-teal-600 text-white", soft: "border-teal-200 bg-white" },
    { chip: "bg-violet-600 text-white", soft: "border-violet-200 bg-white" },
  ];
  return (
    <div data-en-seq="l19-systems" className="grid gap-3 md:grid-cols-3">
      {S13_THREE_SYSTEMS_19.systems.map((s, i) => {
        const a = accents[i];
        return (
          <div key={s.n} className={`rounded-3xl border-2 p-4 text-center ${a.soft}`}>
            <div className="text-xl">{s.n}</div>
            <div dir="ltr" className={`font-en mt-1 rounded-xl px-2 py-1 text-sm font-black ${a.chip}`}>
              {s.label}
            </div>
            <div dir="ltr" className="mt-3">
              <En className="block text-lg font-black text-slate-900">{s.en}</En>
            </div>
            <div className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={s.ar} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// F) THREE-SYSTEM OWNERSHIP MACHINE
// ============================================================
function ThreeSystemMachine() {
  const [i, setI] = useState(0);
  const [stage, setStage] = useState(0);
  const cur = THREE_SYSTEM_MACHINE_19[i];
  const steps = [
    { label: "Possessive Noun", lesson: "الدرس 19", en: cur.noun, accent: "bg-amber-600 text-white" },
    { label: "Possessive Adjective", lesson: "الدرس 16", en: cur.adj, accent: "bg-teal-600 text-white" },
    { label: "Possessive Pronoun", lesson: "الدرس 17", en: cur.pron, accent: "bg-violet-600 text-white" },
  ];
  const pick = (n: number) => {
    setI(n);
    setStage(0);
  };
  return (
    <LabPanel emoji="🔄" label="THREE-SYSTEM OWNERSHIP MACHINE" ar="من اسم المالك إلى الضمير — خطوة بخطوة" seq="l19-three-system">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-1.5">
        {THREE_SYSTEM_MACHINE_19.map((p, idx) => (
          <button
            key={p.name}
            onClick={() => pick(idx)}
            dir="ltr"
            className={`font-en rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition ${
              idx === i ? "border-violet-600 bg-violet-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border-2 border-white bg-white p-4">
        <div dir="ltr" style={{ direction: "ltr" }} data-en-seq={`l19-three-system-${i}`} className="ltr-row grid justify-items-center gap-1">
          {steps.map((st, si) => (
            <div key={st.label} className="flex w-full flex-col items-center gap-1">
              {si > 0 && (
                <span dir="ltr" className="font-en text-base font-black text-slate-300">
                  ↓
                </span>
              )}
              <div className={`flex w-full flex-wrap items-center justify-center gap-2 rounded-2xl border-2 px-3 py-2.5 transition ${si < stage ? "border-slate-200 bg-slate-50" : "border-slate-100 bg-white"}`}>
                <span dir="ltr" className={`font-en rounded-lg px-2 py-0.5 text-[10px] font-black ${st.accent}`}>
                  {st.label}
                </span>
                <span dir="rtl" className="text-[11px] font-bold text-slate-400">
                  <Rich text={st.lesson} />
                </span>
                <span dir="ltr" className={`font-en rounded-xl px-3 py-1 text-base font-black ${si < stage ? "bg-amber-50 text-amber-900" : "bg-slate-100 text-slate-300"}`}>
                  {si < stage ? st.en : "•••"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setStage(0)}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-slate-400"
          >
            ↺ إعادة
          </button>
          <button
            onClick={() => setStage((s) => Math.min(s + 1, 3))}
            disabled={stage >= 3}
            className="rounded-xl bg-violet-600 px-3 py-2 text-xs font-bold text-white transition enabled:hover:bg-violet-700 disabled:opacity-30"
          >
            {stage >= 3 ? "اكتملت المنظومة ✓" : "التحويل التالي ↓"}
          </button>
        </div>
        {stage >= 3 && (
          <div className="mt-2 rounded-xl bg-violet-50 p-2 text-center text-sm font-bold text-violet-800">
            <Rich text="ثلاث طرق لنفس المعنى — هكذا تكتمل منظومة الملكية." />
          </div>
        )}
      </div>
    </LabPanel>
  );
}

// ============================================================
// G) APOSTROPHE ≠ PLURAL
// ============================================================
function ApostropheVsPlural() {
  const [open, setOpen] = useState<number | null>(null);
  const accents = [
    { box: "border-emerald-300 bg-emerald-50/70", chip: "bg-emerald-600 text-white", head: "text-emerald-700" },
    { box: "border-amber-300 bg-amber-50/70", chip: "bg-amber-600 text-white", head: "text-amber-700" },
    { box: "border-violet-300 bg-violet-50/70", chip: "bg-violet-600 text-white", head: "text-violet-700" },
  ];
  return (
    <LabPanel emoji="🪄" label="APOSTROPHE ≠ PLURAL" ar="اضغط كل خلية لتشريحها" seq="l19-apos">
      <div className="mb-3 rounded-2xl border-2 border-orange-300 bg-orange-50 p-3 text-center">
        <Rich text="لا نضع ' لمجرد أن الكلمة جمع." className="text-base font-black text-orange-800" />
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {APOSTROPHE_PLURAL_19.map((s, i) => {
          const on = open === i;
          const a = accents[i];
          return (
            <button
              key={s.en}
              onClick={() => setOpen(on ? null : i)}
              className={`rounded-2xl border-2 p-3 text-center transition ${on ? `${a.box} shadow` : "border-slate-200 bg-white opacity-80"}`}
            >
              <div className="text-2xl">{s.emoji}</div>
              <div dir="ltr" className="mt-1.5">
                <En className="text-xl font-black text-slate-900">{s.en}</En>
              </div>
              <div dir="rtl" className="mt-0.5 text-sm font-bold text-slate-500">
                <Rich text={s.ar} />
              </div>
              <div dir="ltr" className={`mt-2 inline-block rounded-lg px-2 py-0.5 text-[10px] font-black ${on ? a.chip : "bg-slate-100 text-slate-400"}`}>
                {on ? s.kind : "؟"}
              </div>
              {on && (
                <div className="mt-2 text-xs font-bold text-slate-600">
                  <Rich text={s.note} />
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
// Grammar Detective — افحص: عدد المالكين + مكان العلامة
// ============================================================
function DetectiveEx() {
  const [owners, setOwners] = useState<Record<number, "one" | "many">>({});
  const [marks, setMarks] = useState<Record<number, "'s" | "'">>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const score = DETECTIVE_19.sentences.reduce((s, it, i) => s + (owners[i] === it.owners && marks[i] === it.mark ? 1 : 0), 0);
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="mb-2 text-center text-sm font-bold text-amber-700">
          🕵️ <Rich text={DETECTIVE_19.intro} />
        </div>
        <div className="text-center text-base font-bold text-slate-700">
          <Rich text={DETECTIVE_19.inspect} />
        </div>
      </div>
      <div className="grid gap-3">
        {DETECTIVE_19.sentences.map((s, i) => {
          const oPick = owners[i];
          const mPick = marks[i];
          const bothRight = oPick === s.owners && mPick === s.mark;
          const shown = revealed.has(i);
          return (
            <div
              key={s.n}
              className={`rounded-3xl border-2 p-4 transition ${
                oPick || mPick ? (bothRight ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40") : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{s.n}</span>
                <div dir="ltr" className="min-w-0 flex-1">
                  <En className="block text-base font-extrabold text-slate-900">{s.wrong}</En>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 pr-11">
                <span className="text-xs font-bold text-slate-500">عدد المالكين:</span>
                {(["one", "many"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setOwners((p) => ({ ...p, [i]: v }))}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      oPick === v
                        ? oPick === s.owners
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                        : "border-2 border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-300"
                    }`}
                  >
                    {v === "one" ? "واحد" : "أكثر من واحد"}
                  </button>
                ))}
                <span className="mx-1 text-xs font-bold text-slate-500">العلامة الصحيحة:</span>
                {(["'s", "'"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setMarks((p) => ({ ...p, [i]: v }))}
                    dir="ltr"
                    className={`font-en rounded-xl px-3 py-1.5 text-xs font-black transition ${
                      mPick === v
                        ? mPick === s.mark
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white"
                        : "border-2 border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-300"
                    }`}
                  >
                    {v}
                  </button>
                ))}
                <button
                  onClick={() => bothRight && setRevealed((r) => new Set(r).add(i))}
                  disabled={!bothRight}
                  className="rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-bold text-white transition enabled:hover:bg-amber-700 disabled:opacity-30"
                >
                  🎯 {DETECTIVE_19.solutionLabel}
                </button>
              </div>
              {(oPick || mPick) && !bothRight && (
                <div className="mt-2 pr-11 text-sm font-bold text-rose-700">✕ أعد الفحص من جديد — افحص عدد المالكين ومكان العلامة.</div>
              )}
              <div className="mt-3 pr-11" dir="ltr" hidden={!shown}>
                <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                  {s.correct}
                </En>
                {s.note && (
                  <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
                    <Rich text={s.note} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-3 text-center text-sm font-bold text-amber-800">
        النتيجة: {score} / {DETECTIVE_19.sentences.length}
      </div>
    </div>
  );
}

// ============================================================
// Challenge 1 — اختر الصحيح
// ============================================================
function Challenge1Ex() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const score = CHALLENGE1_19.questions.reduce((s, it, i) => s + (answers[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {CHALLENGE1_19.questions.map((item, i) => {
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
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{item.n}</span>
              <div className="min-w-0 flex-1 text-base font-bold text-slate-700">
                <Rich text={item.context} />
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} data-en-seq={`l19-opts-${i + 1}`} className="ltr-row mt-3 grid gap-2 pr-11">
              {item.options.map((opt, oi) => {
                const isAnswer = oi === item.answer;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-amber-400";
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
            {done && (
              <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-700"}`}>
                <Rich text={`${CHALLENGE1_19.answerLabel} ${["A", "B", "C"][item.answer]}`} />
              </div>
            )}
          </div>
        );
      })}
      <div className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-3 text-center text-sm font-bold text-amber-800">
        النتيجة: {score} / {CHALLENGE1_19.questions.length}
      </div>
    </div>
  );
}

// ============================================================
// Challenge 2 — حوّل إلى Possessive
// ============================================================
function Challenge2Ex() {
  const [picked, setPicked] = useState<Record<number, string>>({});
  const score = CHALLENGE2_19.items.reduce((s, it, i) => s + (picked[i] === it.answer ? 1 : 0), 0);
  return (
    <div className="grid gap-3">
      {CHALLENGE2_19.items.map((item, i) => {
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
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{item.n}</span>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-1 flex-wrap items-center gap-2">
                <En className="rounded-xl bg-amber-50 px-3 py-2 text-base font-black text-amber-900">{item.of}</En>
                <span dir="ltr" className="font-en text-lg font-black text-amber-500">
                  →
                </span>
                <span dir="ltr" className={`font-en rounded-xl px-3 py-2 text-base font-black ${chosen ? (right ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-700") : "bg-slate-100 text-slate-300"}`}>
                  {chosen ?? "______"}
                </span>
              </div>
            </div>
            <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-3 flex flex-wrap gap-1.5 pr-11">
              {CHALLENGE2_19.items.map((it) => (
                <button
                  key={it.answer}
                  onClick={() => setPicked((p) => ({ ...p, [i]: it.answer }))}
                  dir="ltr"
                  className={`font-en rounded-lg border-2 px-3 py-1.5 text-sm font-bold transition ${
                    chosen === it.answer
                      ? right
                        ? "border-transparent bg-emerald-600 text-white"
                        : "border-transparent bg-rose-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:border-amber-300"
                  }`}
                >
                  {it.answer}
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
      <div className="rounded-2xl border-2 border-amber-100 bg-amber-50 p-3 text-center text-sm font-bold text-amber-800">
        النتيجة: {score} / {CHALLENGE2_19.items.length}
      </div>
    </div>
  );
}

// ============================================================
// IQ200 Challenge — ثلاث خطوات: عدد المالكين ← ينتهي بـ s؟ ← النمط
// ============================================================
function IQ200ChallengeEx() {
  const [owners, setOwners] = useState<Record<number, "one" | "many">>({});
  const [ends, setEnds] = useState<Record<number, "yes" | "no">>({});
  const [patterns, setPatterns] = useState<Record<number, "'s" | "s'">>({});
  const score = IQ200_CHALLENGE_19.items.reduce(
    (s, it, i) =>
      s +
      (owners[i] === it.owners &&
      (it.owners === "one" ? true : ends[i] === (it.endsInS ? "yes" : "no")) &&
      patterns[i] === it.pattern
        ? 1
        : 0),
    0
  );
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-amber-50 p-4">
        <div className="text-center text-base font-bold text-slate-700">
          <Rich text={IQ200_CHALLENGE_19.intro} />
        </div>
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap justify-center gap-2">
          {IQ200_CHALLENGE_19.steps.map((st) => (
            <span key={st} dir="ltr" className="font-en rounded-xl border-2 border-fuchsia-200 bg-white px-3 py-1.5 text-xs font-black text-fuchsia-800">
              {st}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {IQ200_CHALLENGE_19.items.map((item, i) => {
          const oPick = owners[i];
          const ePick = ends[i];
          const pPick = patterns[i];
          const ownersOk = oPick === item.owners;
          const endsOk = item.owners === "one" ? true : ePick === (item.endsInS ? "yes" : "no");
          const patternOk = pPick === item.pattern;
          const solved = oPick !== undefined && ownersOk && endsOk && patternOk;
          return (
            <div
              key={item.n}
              className={`rounded-3xl border-2 p-4 transition ${
                oPick ? (solved ? "border-emerald-300 bg-emerald-50/40" : "border-rose-300 bg-rose-50/40") : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-fuchsia-600 text-sm font-bold text-white">{item.n}</span>
                <div dir="ltr" className="min-w-0 flex-1">
                  <En className="text-base font-extrabold text-slate-900">{item.count}</En>
                </div>
                <div dir="ltr" className="flex items-center gap-2">
                  <En className="rounded-xl bg-slate-100 px-3 py-1.5 text-base font-black text-slate-700">{item.word}</En>
                  <span dir="ltr" className="font-en text-lg font-black text-fuchsia-400">
                    →
                  </span>
                  <En className={`rounded-xl px-3 py-1.5 text-base font-black ${solved ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-300"}`}>
                    {solved ? item.answer : "______"}
                  </En>
                </div>
              </div>
              <div className="mt-3 grid gap-2 pr-11 sm:grid-cols-3">
                <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2">
                  <div className="text-center text-[11px] font-bold text-slate-500">
                    <Rich text="1. كم عدد المالكين؟" />
                  </div>
                  <div className="mt-1.5 flex justify-center gap-1.5">
                    {(["one", "many"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setOwners((p) => ({ ...p, [i]: v }))}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                          oPick === v
                            ? oPick === item.owners
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                            : "border-2 border-slate-200 bg-white text-slate-600 hover:border-fuchsia-300"
                        }`}
                      >
                        {v === "one" ? "واحد" : "أكثر"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2">
                  <div className="text-center text-[11px] font-bold text-slate-500">
                    <Rich text="2. هل الجمع ينتهي بـ s؟" />
                  </div>
                  <div className="mt-1.5 flex justify-center gap-1.5">
                    {(["yes", "no"] as const).map((v) => {
                      const disabled = item.owners === "one" && oPick === "one";
                      return (
                        <button
                          key={v}
                          onClick={() => setEnds((p) => ({ ...p, [i]: v }))}
                          disabled={disabled}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            disabled
                              ? "cursor-not-allowed border-2 border-dashed border-slate-200 bg-white text-slate-300"
                              : oPick === "many" && ePick === v
                                ? ePick === (item.endsInS ? "yes" : "no")
                                  ? "bg-emerald-600 text-white"
                                  : "bg-rose-600 text-white"
                                : "border-2 border-slate-200 bg-white text-slate-600 hover:border-fuchsia-300"
                          }`}
                        >
                          {disabled ? "— (مفرد)" : v === "yes" ? "نعم" : "لا"}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2">
                  <div className="text-center text-[11px] font-bold text-slate-500">
                    <Rich text="3. اختر نمط apostrophe" />
                  </div>
                  <div className="mt-1.5 flex justify-center gap-1.5">
                    {(["'s", "s'"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setPatterns((p) => ({ ...p, [i]: v }))}
                        dir="ltr"
                        className={`font-en rounded-lg px-2.5 py-1 text-xs font-black transition ${
                          pPick === v
                            ? pPick === item.pattern
                              ? "bg-emerald-600 text-white"
                              : "bg-rose-600 text-white"
                            : "border-2 border-slate-200 bg-white text-slate-600 hover:border-fuchsia-300"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {oPick && !solved && (
                <div className="mt-2 pr-11 text-sm font-bold text-rose-700">
                  ✕ {ownersOk ? "قريب! راجع الخطوة الثانية أو الثالثة." : "عدد المالكين خاطئ — عدَّ المالكين أولًا."}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-fuchsia-100 bg-fuchsia-50 p-3 text-center text-sm font-bold text-fuchsia-800">
        النتيجة: {score} / {IQ200_CHALLENGE_19.items.length}
      </div>
    </div>
  );
}

// ============================================================
// IQ200 — لغز المعنى
// ============================================================
function MeaningPuzzleEx() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const both = open.has(0) && open.has(1);
  const puzzles = [
    {
      a: IQ200_MEANING_19.a,
      b: IQ200_MEANING_19.b,
      firstWord: IQ200_MEANING_19.firstWord,
      firstMean: IQ200_MEANING_19.firstMean,
      secondWord: IQ200_MEANING_19.secondWord,
      secondMean: IQ200_MEANING_19.secondMean,
    },
    {
      a: IQ200_MEANING_19.c,
      b: IQ200_MEANING_19.d,
      firstWord: "The child's",
      firstMean: IQ200_MEANING_19.first2Mean,
      secondWord: "The children's",
      secondMean: IQ200_MEANING_19.second2Mean,
    },
  ];
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {puzzles.map((p, i) => {
          const on = open.has(i);
          return (
            <div key={i} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
              <div dir="ltr" className="space-y-1.5">
                <En className="block rounded-xl bg-slate-50 px-3 py-2 text-center text-base font-black text-slate-900">{p.a}</En>
                <En className="block rounded-xl bg-slate-50 px-3 py-2 text-center text-base font-black text-slate-900">{p.b}</En>
              </div>
              <div className="mt-2 text-center text-sm font-bold text-slate-600">
                <Rich text={IQ200_MEANING_19.question} />
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() =>
                    setOpen((s) => {
                      const n = new Set(s);
                      if (n.has(i)) n.delete(i);
                      else n.add(i);
                      return n;
                    })
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-bold transition ${on ? "border-2 border-slate-200 bg-white text-slate-500" : "bg-rose-600 text-white hover:bg-rose-700"}`}
                >
                  {on ? "إخفاء" : "هل هما نفس الشيء؟"}
                </button>
              </div>
              <div className="mt-3 space-y-2" hidden={!on}>
                <div className="rounded-xl bg-rose-50 p-2 text-center text-base font-black text-rose-700">
                  <Rich text={IQ200_MEANING_19.no} />
                </div>
                <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="text-xs font-bold text-slate-500">
                    <Rich text={i === 0 ? IQ200_MEANING_19.first : IQ200_MEANING_19.first2} />
                  </div>
                  <div dir="ltr" className="mt-1 flex flex-wrap items-center justify-center gap-2">
                    <En className="rounded-lg bg-amber-100 px-2.5 py-1 text-sm font-black text-amber-900">{p.firstWord}</En>
                    <span className="text-sm font-bold text-slate-600">
                      <Rich text={p.firstMean} />
                    </span>
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-slate-100 bg-slate-50/70 p-2.5">
                  <div className="text-xs font-bold text-slate-500">
                    <Rich text={i === 0 ? IQ200_MEANING_19.second : IQ200_MEANING_19.second2} />
                  </div>
                  <div dir="ltr" className="mt-1 flex flex-wrap items-center justify-center gap-2">
                    <En className="rounded-lg bg-violet-100 px-2.5 py-1 text-sm font-black text-violet-900">{p.secondWord}</En>
                    <span className="text-sm font-bold text-slate-600">
                      <Rich text={p.secondMean} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center" hidden={!both}>
        <Rich text={`🔥 ${IQ200_MEANING_19.fire}`} className="text-base font-black text-amber-800" />
      </div>
    </div>
  );
}

// ============================================================
// FINAL BOSS — Liam and Rocket
// ============================================================
function BossPassage() {
  // نُبقي كل كلمة داخل حاوية <p dir="ltr"> واحدة — الترتيب البصري إنجليزي دائمًا.
  const words = FINAL_BOSS_19.passage.split(/(\s)/);
  const isHi = (w: string) => FINAL_BOSS_19.highlights.some((h) => w.includes(h));
  return (
    <div dir="ltr" className="rounded-2xl border-2 border-amber-200 bg-white p-4">
      <p dir="ltr" style={{ direction: "ltr" }} className="font-en text-base font-bold leading-relaxed text-slate-900">
        {words.map((w, i) =>
          isHi(w) ? (
            <span key={i} dir="ltr" className="rounded-lg bg-amber-100 px-1 font-black text-amber-900 ring-1 ring-amber-300">
              {w}
            </span>
          ) : (
            <span key={i}>{w}</span>
          )
        )}
      </p>
    </div>
  );
}

function FinalBossEx() {
  const [openQ, setOpenQ] = useState<Set<number>>(new Set());
  return (
    <div className="space-y-4" data-en-seq="l19-boss">
      <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="text-center text-sm font-bold text-amber-700">
          🏆 FINAL BOSS — <Rich text={FINAL_BOSS_19.readLabel} />
        </div>
        <div className="mt-2">
          <BossPassage />
        </div>
      </div>
      <div className="rounded-3xl border-2 border-violet-200 bg-white p-4">
        <div className="text-center text-sm font-bold text-violet-700">
          🧠 <Rich text={FINAL_BOSS_19.answerLabel} />
        </div>
        <div className="mt-3 grid gap-2">
          {FINAL_BOSS_19.questions.map((q, i) => {
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
// Speed Test — صحح دون تفكير طويل
// ============================================================
function SpeedTestEx() {
  const [judge, setJudge] = useState<Record<number, "ok" | "bad">>({});
  const [typed, setTyped] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const norm = (v: string) => v.trim().toLowerCase().replace(/\s+/g, " ").replace(/\.$/, "");
  const score = SPEED_TEST_19.sentences.reduce((s, it, i) => s + (judge[i] === (it.ok ? "ok" : "bad") ? 1 : 0), 0);
  const answered = Object.keys(judge).length;
  return (
    <div className="space-y-4" data-en-seq="l19-speed">
      <div className="grid gap-3">
        {SPEED_TEST_19.sentences.map((item, i) => {
          const j = judge[i];
          const right = j !== undefined && j === (item.ok ? "ok" : "bad");
          const isOn = checked.has(i);
          const typeRight = isOn && norm(typed[i] || "") === norm(item.correct ?? "");
          const shown = revealed.has(i);
          return (
            <div
              key={item.n}
              className={`rounded-3xl border-2 p-4 transition ${
                j ? (right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50") : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{item.n}</span>
                <div dir="ltr" className="min-w-0 flex-1">
                  <En className="block text-base font-extrabold text-slate-900">{item.en}</En>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                <button
                  onClick={() => setJudge((p) => ({ ...p, [i]: "ok" }))}
                  className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
                    j === "ok"
                      ? right
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-600 text-white"
                      : "border-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-400"
                  }`}
                >
                  ✅ صحيحة
                </button>
                <button
                  onClick={() => setJudge((p) => ({ ...p, [i]: "bad" }))}
                  className={`rounded-xl px-4 py-1.5 text-sm font-bold transition ${
                    j === "bad"
                      ? right
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-600 text-white"
                      : "border-2 border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-400"
                  }`}
                >
                  ❌ فيها خطأ
                </button>
              </div>
              {j === "bad" && !item.ok && (
                <div className="mt-3 flex flex-wrap items-center gap-2 pr-11">
                  <input
                    dir="ltr"
                    type="text"
                    value={typed[i] || ""}
                    onChange={(e) => setTyped((t) => ({ ...t, [i]: e.target.value }))}
                    placeholder="اكتب الصيغة الصحيحة..."
                    className="font-en w-full max-w-sm flex-1 rounded-xl border-2 border-slate-200 px-3 py-2 text-left text-base font-bold outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={() => setChecked((c) => new Set(c).add(i))}
                    className="rounded-xl bg-amber-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-amber-700"
                  >
                    صحح
                  </button>
                  <button
                    onClick={() => setRevealed((r) => new Set(r).add(i))}
                    className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-amber-300"
                  >
                    اكشف
                  </button>
                </div>
              )}
              {j === "bad" && item.ok && (
                <div className="mt-2 pr-11 text-sm font-bold text-rose-700">✕ لا — هذه الجملة صحيحة كما هي.</div>
              )}
              {j === "ok" && !item.ok && (
                <div className="mt-2 pr-11 text-sm font-bold text-rose-700">✕ ليس صحيحًا — اختر «فيها خطأ» ثم صحح.</div>
              )}
              {j === "bad" && !item.ok && isOn && (
                <div className={`mt-2 pr-11 text-sm font-bold ${typeRight ? "text-emerald-700" : "text-rose-700"}`}>
                  {typeRight ? "✓ أحسنت!" : "✕ حاول مجددًا أو اكشف."}
                </div>
              )}
              {j === "bad" && !item.ok && shown && (
                <div className="mt-2 pr-11" dir="ltr">
                  <En className="block rounded-xl border-2 border-emerald-200 bg-emerald-50 px-3 py-2 text-base font-black text-emerald-800">
                    {item.correct} ✅
                  </En>
                  {item.why && (
                    <div dir="rtl" className="mt-1 text-sm font-bold text-slate-500">
                      <Rich text={item.why} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4">
        <div className="text-center text-sm font-bold text-amber-700">
          <Rich text={SPEED_TEST_19.notice} />
        </div>
        <div dir="ltr" className="mt-2 space-y-1.5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <En className="rounded-xl bg-white px-3 py-1.5 text-base font-black text-slate-900 shadow-sm">{SPEED_TEST_19.note1.en}</En>
            <span className="text-sm font-bold text-slate-600">
              <Rich text={SPEED_TEST_19.note1.ar} />
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm font-bold text-slate-500">
              <Rich text={SPEED_TEST_19.note2Lead} />
            </span>
            <En className="rounded-xl bg-white px-3 py-1.5 text-base font-black text-slate-900 shadow-sm">{SPEED_TEST_19.note2.en}</En>
            <span className="text-sm font-bold text-slate-600">
              <Rich text={SPEED_TEST_19.note2.ar} />
            </span>
          </div>
        </div>
        {answered === SPEED_TEST_19.sentences.length && (
          <div className="mt-3 rounded-2xl border-2 border-amber-100 bg-white p-2 text-center text-sm font-bold text-amber-800">
            النتيجة: {score} / {SPEED_TEST_19.sentences.length}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// شرائط عامة
// ============================================================
function FormulaStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} data-en-seq="l19-fstrip" className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <span key={item} dir="ltr" className="font-en rounded-xl border-2 border-amber-200 bg-white px-3 py-2 text-sm font-black text-amber-800">
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
      data-en-seq="l19-chain"
      className="ltr-row grid justify-items-center gap-1 rounded-3xl border-2 border-amber-200 bg-amber-50 p-4"
    >
      {items.map((item, i) => (
        <div key={item} className="flex w-full flex-col items-center gap-1">
          {i > 0 && (
            <span dir="ltr" className="font-en text-lg font-black text-amber-400">
              ↓
            </span>
          )}
          <span
            dir="ltr"
            className={`font-en rounded-xl px-4 py-2 text-base font-black ${
              i % 3 === 0 ? "bg-amber-600 text-white" : i % 3 === 1 ? "bg-teal-600 text-white" : "bg-violet-600 text-white"
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
function ExerciseView({ exercise }: { exercise: Exercise19 }) {
  switch (exercise.type) {
    case "detective":
      return <DetectiveEx />;
    case "challenge1":
      return <Challenge1Ex />;
    case "challenge2":
      return <Challenge2Ex />;
    case "iq200":
      return <IQ200ChallengeEx />;
    case "meaningPuzzle":
      return <MeaningPuzzleEx />;
    case "finalBoss":
      return <FinalBossEx />;
    case "speedTest":
      return <SpeedTestEx />;
  }
}

// ============================================================
// Block dispatcher
// ============================================================
function BlockView({ block }: { block: Block19 }) {
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
    case "ofPairs":
      return <OfPairs />;
    case "ownerDetector":
      return <OwnerDetector />;
    case "singularBoard":
      return <SingularBoard />;
    case "boysComparator":
      return <BoysComparator />;
    case "numberDetector":
      return <NumberDetector />;
    case "childFamily":
      return <ChildFamily />;
    case "irregularFamily":
      return <IrregularFamilyCard which={block.which} />;
    case "ruleCases":
      return <RuleCases />;
    case "goldenTable":
      return <GoldenTable />;
    case "apostropheMachine":
      return <ApostropheMachine />;
    case "breakdown":
      return <Breakdown which={block.which} />;
    case "threeSystemsBoard":
      return <ThreeSystemsBoard />;
    case "threeSystemMachine":
      return <ThreeSystemMachine />;
    case "apostropheVsPlural":
      return <ApostropheVsPlural />;
  }
}

// ============================================================
// Cover
// ============================================================
function Cover() {
  return (
    <div className="rounded-[2rem] border-2 border-amber-300/40 bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700 p-8 text-white shadow-xl md:p-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-24 w-24 place-items-center rounded-3xl bg-white/15 ring-4 ring-white/25">
          <En className="text-5xl font-black text-amber-100">'s</En>
        </div>
        <div>
          <div dir="ltr" className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-4 py-1.5">
            <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-[0.22em] text-amber-200">
              {LAB_NAME_19}
            </span>
          </div>
          <h1 className="font-head mt-3 text-3xl font-bold md:text-4xl">
            <Rich text={LESSON_TITLE_19} />
          </h1>
          <div className="mt-1 text-lg font-bold text-amber-100">
            <Rich text={LESSON_SUBTITLE_19} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-sm font-bold text-amber-100">
            <Rich text={COVER_19.recall16.label} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
            {COVER_19.recall16.lines.map((l) => (
              <span key={l} dir="ltr" className="font-en rounded-lg bg-white/20 px-2.5 py-1 text-sm font-black">
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white/10 p-4">
          <div className="text-sm font-bold text-amber-100">
            <Rich text={COVER_19.recall17.label} />
          </div>
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5">
            {COVER_19.recall17.lines.map((l) => (
              <span key={l} dir="ltr" className="font-en rounded-lg bg-white/20 px-2.5 py-1 text-sm font-black">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white/10 p-5 text-lg leading-relaxed text-amber-50">
        <Rich text={COVER_19.today} />
        <div dir="ltr" className="mt-2 flex flex-wrap items-center gap-2">
          <En className="rounded-xl bg-white px-4 py-1.5 text-xl font-black text-orange-700">{COVER_19.example}</En>
          <span className="font-bold">
            <Rich text={`${COVER_19.meaning} ${COVER_19.meaningAr}`} />
          </span>
        </div>
        <div className="mt-3">
          <Rich text={COVER_19.and} />
          <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-2">
            {COVER_19.words.map((w) => (
              <span key={w} dir="ltr" className="font-en rounded-xl border-2 border-amber-300/50 bg-white/15 px-3 py-1.5 text-base font-black">
                {w}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 font-bold text-amber-100">
          <Rich text={COVER_19.ending} />
        </div>
      </div>

      <div
        dir="ltr"
        style={{ direction: "ltr" }}
        data-en-seq="l19-flow"
        className="ltr-row mt-5 grid justify-items-center gap-1 rounded-2xl bg-white/10 p-4"
      >
        {LAB_FLOW_19.map((f, i) => (
          <div key={f} className="flex w-full flex-col items-center gap-1">
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

      <div className="mt-5 rounded-xl bg-white/10 p-3 text-center text-sm font-bold text-amber-100">
        <Rich text={LAB_MOTTO_19} />
      </div>
    </div>
  );
}

// ============================================================
// Objectives
// ============================================================
function Objectives() {
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[0]} title="أهداف الدرس" lead="بنهاية الدرس ستكون قادرًا على:">
      <div className="grid gap-2">
        {OBJECTIVES_19.map((obj) => (
          <div key={obj.n} className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-3">
            <div className="flex items-start gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-600 text-sm font-bold text-white">{obj.n}</span>
              <Rich text={obj.text} className="font-semibold text-slate-800" />
            </div>
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
  const accents = [
    { chip: "bg-amber-600", box: "border-amber-100 bg-white", chipSoft: "bg-amber-50 text-amber-900" },
    { chip: "bg-violet-600", box: "border-violet-100 bg-white", chipSoft: "bg-violet-50 text-violet-900" },
    { chip: "bg-rose-600", box: "border-rose-100 bg-white", chipSoft: "bg-rose-50 text-rose-900" },
  ];
  return (
    <Frame mascot="🧠" sourceHeading={SOURCE_SECTIONS[23]} title="الخلاصة الكبرى" lead={SUMMARY_19.intro}>
      <div className="grid gap-3">
        {SUMMARY_19.groups.map((g, gi) => {
          const a = accents[gi];
          return (
            <div key={g.n} className={`rounded-3xl border-2 p-4 ${a.box}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${a.chip}`}>{g.n}</span>
                <Rich text={g.title} className="text-lg font-black text-slate-800" />
              </div>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-2 flex flex-wrap gap-1.5 pr-11">
                {g.examples.map((e) => (
                  <span key={e} dir="ltr" className={`font-en rounded-lg px-2.5 py-1 text-sm font-black ${a.chipSoft}`}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

// ============================================================
// قاعدة IQ200 النهائية
// ============================================================
function FinalRule() {
  const [pick, setPick] = useState<number | null>(null);
  const accents = ["bg-amber-600 text-white", "bg-violet-600 text-white", "bg-rose-600 text-white"];
  return (
    <Frame mascot="🔥" sourceHeading={SOURCE_SECTIONS[24]} title={FINAL_RULE_19.title} lead={FINAL_RULE_19.lead}>
      <div data-en-seq="l19-finalrule" className="grid gap-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
            <Rich text={FINAL_RULE_19.q1} className="text-lg font-black text-slate-800" />
            <div className="mt-1 text-sm font-bold text-slate-500">
              <Rich text={FINAL_RULE_19.q1b} />
            </div>
          </div>
          <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4 text-center">
            <Rich text={FINAL_RULE_19.q2} className="text-lg font-black text-slate-800" />
          </div>
        </div>
        <div className="text-center text-sm font-bold text-slate-500">
          <Rich text={FINAL_RULE_19.ifText} />
        </div>
        <div className="grid gap-2 md:grid-cols-3">
          {FINAL_RULE_19.mapping.map((m, i) => (
            <button
              key={m.cond}
              onClick={() => setPick(pick === i ? null : i)}
              className={`rounded-3xl border-2 p-4 text-center transition ${
                pick === i ? "border-amber-400 bg-amber-50 shadow" : "border-slate-200 bg-white hover:border-amber-200"
              }`}
            >
              <div className="text-base font-bold text-slate-700">
                <Rich text={m.cond} />
              </div>
              <div dir="ltr" className="mt-2 flex items-center justify-center gap-2">
                <span dir="ltr" className="font-en text-lg font-black text-slate-400">
                  →
                </span>
                <MarkChip mark={pick === i ? m.mark : "؟"} big />
              </div>
              <div dir="ltr" className={`font-en mt-2 text-[10px] font-black uppercase tracking-wide ${pick === i ? accents[i] : "text-slate-300"}`}>
                {pick === i ? "THE MARK" : "اضغط"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ============================================================
// خريطة المنهج حتى الآن
// ============================================================
function Roadmap() {
  return (
    <Frame mascot="🗺️" sourceHeading={SOURCE_SECTIONS[25]} title="خريطة المنهج حتى الآن">
      <div data-en-seq="l19-roadmap" className="grid gap-2 sm:grid-cols-2">
        {ROADMAP_19.map((it) => (
          <div
            key={it.n}
            className={`flex items-center gap-3 rounded-2xl border-2 p-3 ${
              it.here ? "border-amber-400 bg-amber-100 shadow" : "border-slate-100 bg-white"
            }`}
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${
                it.here ? "bg-gradient-to-br from-amber-500 to-rose-600" : "bg-slate-500"
              }`}
            >
              {it.n}
            </span>
            <div dir="ltr" className={`font-en text-sm font-bold ${it.here ? "text-amber-900" : "text-slate-700"}`}>
              {it.en}
            </div>
            {it.fire && <span className="mr-auto text-lg">🔥</span>}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border-2 border-amber-200 bg-amber-50 p-5">
        <Rich text={ROADMAP_19_CLOSING} className="text-base font-bold leading-relaxed text-slate-800 md:text-lg" />
        <div className="mt-3 space-y-2">
          {OWNERSHIP_SYSTEM_19.map((row) => (
            <div key={row[0]} dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center gap-1.5">
              <En className="rounded-lg bg-amber-600 px-2.5 py-1 text-sm font-black text-white">{row[0]}</En>
              <En className="rounded-lg bg-teal-600 px-2.5 py-1 text-sm font-black text-white">{row[1]}</En>
              <En className="rounded-lg bg-violet-600 px-2.5 py-1 text-sm font-black text-white">{row[2]}</En>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 whitespace-pre-line rounded-3xl border-2 border-amber-200 bg-white p-4">
        <Rich text={NEXT_STEP_19} className="text-base font-bold leading-relaxed text-slate-800" />
      </div>
    </Frame>
  );
}

// ============================================================
// Closing
// ============================================================
function Closing({ onExit }: { onExit: () => void }) {
  return (
    <div className="rounded-[2rem] border-2 border-amber-300/40 bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700 p-8 text-white shadow-xl md:p-12">
      <div className="text-6xl">🏆</div>
      <h2 className="font-head mt-4 text-3xl font-bold md:text-4xl">أحسنت! أنهيت الدرس 19.</h2>
      <div className="mt-4 text-lg leading-relaxed text-amber-50">
        <Rich text="الآن أنت تعرف أن apostrophe ليست زينة: عدّ المالكين، افحص هل الجمع ينتهي بـ s، ثم ضع 's أو ' في مكانها الصحيح — ومنظومة الملكية الثلاثية (اسم المالك + صفة ملكية + ضمير ملكية) أصبحت عندك كاملة." />
      </div>
      <div className="mt-4 space-y-1.5 rounded-2xl bg-white/10 p-4">
        {OWNERSHIP_SYSTEM_19.map((row) => (
          <div key={row[0]} dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center gap-1.5">
            <En className="rounded-lg bg-white/25 px-2.5 py-1 text-sm font-black">{row[0]}</En>
            <En className="rounded-lg bg-white/25 px-2.5 py-1 text-sm font-black">{row[1]}</En>
            <En className="rounded-lg bg-white/25 px-2.5 py-1 text-sm font-black">{row[2]}</En>
          </div>
        ))}
      </div>
      <div className="mt-4 whitespace-pre-line rounded-2xl bg-white/10 p-4">
        <Rich text={NEXT_STEP_19} />
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <button onClick={onExit} className="rounded-xl bg-white px-5 py-3 font-bold text-amber-700 transition hover:bg-amber-50">
          ← جميع الدروس
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Source heading resolver — يربط كل شريحة بعنوانها في المصدر
// ============================================================
function sourceHeadingFor(slide: Slide19): string | undefined {
  if (slide.kind === "objectives") return SOURCE_SECTIONS[0];
  if (slide.kind === "lesson") {
    if (slide.step === "★") return SOURCE_SECTIONS[11];
    return SOURCE_SECTIONS[Number(slide.step)];
  }
  if (slide.kind === "ex") {
    const n = Number(slide.badge);
    return Number.isFinite(n) && n >= 1 ? SOURCE_SECTIONS[n] : undefined;
  }
  if (slide.kind === "summary") return SOURCE_SECTIONS[23];
  if (slide.kind === "finalRule") return SOURCE_SECTIONS[24];
  if (slide.kind === "roadmap") return SOURCE_SECTIONS[25];
  return undefined;
}

export function SlideView19({ s, onExit }: { s: Slide19; onExit: () => void }) {
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
    case "finalRule":
      return <FinalRule />;
    case "roadmap":
      return <Roadmap />;
    case "quiz":
      return (
        <Frame
          mascot={s.mascot}
          badge="الاختبار النهائي"
          title={<Rich text={s.title} />}
          lead="أسئلة جديدة تقيس فهم الملكية: 's المفرد، s' الجمع المنتهي بـ s، الجمع الشاذ، والفرق بين النظم الثلاثة."
        >
          <FinalQuiz lesson={19} accent="bg-amber-600" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide19): string {
  if (slide.kind === "cover") return "الغلاف";
  if (slide.kind === "objectives") return "أهداف الدرس";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  "البداية": "text-slate-400",
  "أساسيات الملكية": "text-amber-600",
  "القواعد الثلاث": "text-orange-600",
  "الجمع الشاذ": "text-violet-600",
  "الربط بالنظم السابقة": "text-teal-600",
  "فخّ apostrophe": "text-rose-600",
  "مهمة المحقق": "text-slate-600",
  "التحديات وIQ200": "text-indigo-600",
  "الامتحان الأخير": "text-fuchsia-600",
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
          <Rich text="الدرس 19 · Possessive Nouns" />
        </div>
        <En className="text-xs font-semibold text-slate-400">🕵️ {LAB_NAME_19}</En>
        <div className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-600">
          {SOURCE_NUMBERED_COUNT} قسماً مرقماً من المصدر · {SLIDES.length} شريحة
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
                    active ? "bg-amber-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"
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

export default function Lesson19({ onExit }: { onExit: () => void }) {
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
    document.getElementById("l19-main")?.scrollTo({ top: 0 });
  }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div
      dir="rtl"
      className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#fffbeb] text-slate-800"
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
                  className="h-full rounded-full bg-gradient-to-l from-amber-500 via-orange-500 to-rose-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {`${index + 1} / ${total}`}
            </span>
          </header>
          <main id="l19-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={index} className="pop mx-auto max-w-4xl">
              <SlideView19 s={slide} onExit={onExit} />
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
                className="rounded-full bg-amber-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-amber-700 disabled:opacity-30"
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
