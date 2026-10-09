import { En as SharedEn } from "../../shared/lessonKit";
import { EnAr } from "../../shared/bidi";
import { mixedText } from "../../shared/lessonKit";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SLIDES,
  SOURCE_SECTIONS,
  SOURCE_LEDGER_COUNT,
  SOURCE_NUMBERED_COUNT,
  SEC,
  LESSON_TITLE_26,
  LESSON_SUBTITLE_26,
  LESSON_ARABIC_TITLE_26,
  LAB_NAME_26,
  LAB_MOTTO_26,
  VIEW_EVENT_TAG,
  VIEW_PROGRESS_TAG,
  VIEW_EVENT_AR,
  VIEW_PROGRESS_AR,
  EX26_ITEMS,
  COMPLETE_STORY_26,
  COMPLETE_STORY_26_NOTE,
  DETECTIVE_26_PARTS,
  IQ200_MATCH_26,
  IQ200_BOTH_26,
  FINAL_BOSS_26_SCENE,
  FINAL_BOSS_26_REQUIREMENTS,
  FINAL_BOSS_26_MODEL_NOTE,
  FINAL_BOSS_26_MODEL_STORY,
  FINAL_BOSS_26_BACKGROUND,
  FINAL_BOSS_26_EVENTS,
  TIME_CLUES_26,
  WAS_TABLE_26,
  NOUN_TABLE_26,
  type Block26,
  type Exercise26,
  type Lab26,
  type Slide26,
  type Tone26,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import FinalQuiz from "../../shared/FinalQuiz";
import { LatinRuns } from "../../shared/bidi";

// ============================================================
// 🎬 الدرس 26 — THE TIME DIRECTOR
// لوحة الألوان: نعناعي/سماوي + كورال (📸) + عنبري، وخلفية ورقية فاتحة.
// قواعد العزل: كل وحدة إنجليزية داخل LTR، والنص المختلط عبر LatinRuns.
// ============================================================

const EVENT = {
  tag: VIEW_EVENT_TAG,
  ar: VIEW_EVENT_AR,
  chip: "bg-orange-500 text-white",
  soft: "border-orange-200 bg-orange-50",
  text: "text-orange-900",
  ring: "ring-orange-300",
  bar: "bg-orange-400",
};
const PROGRESS = {
  tag: VIEW_PROGRESS_TAG,
  ar: VIEW_PROGRESS_AR,
  chip: "bg-teal-600 text-white",
  soft: "border-teal-200 bg-teal-50",
  text: "text-teal-900",
  ring: "ring-teal-300",
  bar: "bg-teal-500",
};

const ARABIC_RX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LATIN_RX = /[A-Za-z]/;
const HEAD_RX = /^(🎥|📸|🧠|🔥|⭐|⚠️|⚔️|🚨|🕵️|🚀|🏆|🏅|🎬|🧪|🔎|📖|🐦|🔄|📞|🎯|🔗|✅|💡|🎞️)/u;
const NUM_RX = /^[①②③④⑤⑥⑦⑧⑨⑩]/;

function isEn(text: string) {
  return LATIN_RX.test(text) && !ARABIC_RX.test(text);
}

type Kind = "en" | "ar" | "head" | "bad" | "good" | "num" | "chip" | "arrow";

function kindOf(text: string): Kind {
  if (text.includes("❌")) return "bad";
  if (text.startsWith("✅")) return "good";
  if (NUM_RX.test(text)) return "num";
  if (HEAD_RX.test(text)) return "head";
  if (isEn(text)) return "en";
  if (text.startsWith("→")) return "arrow";
  return "ar";
}

// ---------------- Helpers ----------------

function En({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <SharedEn className={`${className}`}>{children}</SharedEn>;
}

function Rich({ text, className = "" }: { text: string; className?: string }) {
  return <span className={className}><LatinRuns text={text} marked /></span>;
}

function Note({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-4">
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
  title: ReactNode;
  lead?: string;
  children: ReactNode;
  tip?: string;
  sourceHeading?: string;
}) {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-[1.75rem] border-2 border-teal-900/[0.07] bg-white p-5 shadow-[0_16px_44px_-24px_rgba(13,148,136,0.45)] md:p-8"
    >
      <div className="pointer-events-none absolute -left-1 top-3 select-none text-4xl anim-drift md:text-5xl" aria-hidden>
        {mascot}
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        {step && (
          <span className="font-head grid h-10 w-10 place-items-center rounded-2xl bg-teal-700 text-lg font-bold text-white shadow-sm">
            {mixedText(step)}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-sky-100 px-3.5 py-1.5 text-sm font-bold text-sky-800">
            <Rich text={badge} />
          </span>
        )}
      </div>
      {sourceHeading && (
        <div
          data-source-section={sourceHeading}
          className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-teal-100 bg-teal-50/70 px-3 py-2 text-xs font-bold text-teal-900"
        >
          <EnAr en="SOURCE SECTION" ar={sourceHeading} enClassName="rounded-md bg-white px-1.5 py-0.5 text-teal-700" />
        </div>
      )}
      <h2 className="font-head mt-3 max-w-[92%] text-2xl font-bold leading-snug text-slate-900 md:text-[2rem]">{mixedText(title)}</h2>
      {lead && (
        <div className="mt-2 max-w-[94%] text-base text-slate-500 md:text-lg">
          <Rich text={lead} />
        </div>
      )}
      <div className="mt-5 space-y-3">{children}</div>
      {tip && (
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gradient-to-l from-teal-600 to-sky-600 p-4 text-white">
          <span className="text-2xl">🔦</span>
          <span className="text-base font-semibold md:text-lg">
            <Rich text={tip} />
          </span>
        </div>
      )}
    </section>
  );
}

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
  children: ReactNode;
  seq?: string;
}) {
  return (
    <div
      data-en-seq={seq}
      className="rounded-3xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-sky-50 to-amber-50/70 p-3.5 sm:p-4"
    >
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <EnAr en={label} ar={ar} enClassName="text-[11px] font-black uppercase tracking-[0.16em] text-teal-700" arClassName="text-sm font-bold text-slate-600" />
      </div>
      {children}
    </div>
  );
}

function FormulaStrip({
  items,
  tone = "teal",
}: {
  items: readonly string[];
  tone?: "teal" | "orange" | "sky" | "amber" | "violet" | "rose";
}) {
  const colors: Record<string, string> = {
    teal: "border-teal-200 bg-white text-teal-900",
    orange: "border-orange-200 bg-white text-orange-900",
    sky: "border-sky-200 bg-white text-sky-900",
    amber: "border-amber-200 bg-white text-amber-900",
    violet: "border-violet-200 bg-white text-violet-900",
    rose: "border-rose-200 bg-white text-rose-900",
  };
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((item) => (
        <En key={item} className={`rounded-xl border-2 px-3 py-2 text-sm font-black ${colors[tone]}`}>
          {item}
        </En>
      ))}
    </div>
  );
}

/** سطر مصدري واحد — كل وحدة تُعرض بترتيبها وبعزلها الصحيح. */
function LineRow({ text, tone }: { text: string; tone?: Tone26 }) {
  const kind = tone === "en" ? "en" : tone === "good" ? "good" : tone === "bad" ? "bad" : tone === "head" ? "head" : kindOf(text);
  if (kind === "en") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-slate-100 bg-white px-4 py-2.5 text-left text-lg font-extrabold text-slate-900 shadow-sm md:text-xl">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "bad") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-2.5 text-left text-base font-extrabold text-rose-800 md:text-lg">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "good") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-2.5 text-left text-base font-extrabold text-emerald-800 md:text-lg">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "num") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border-2 border-sky-100 bg-sky-50/70 p-3">
        <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-600 text-sm font-bold text-white">
          {text.slice(0, 1)}
        </span>
        <Rich text={text.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
      </div>
    );
  }
  if (kind === "head") {
    return (
      <div className="rounded-2xl bg-teal-700/95 px-4 py-2.5 text-center text-lg font-black text-white shadow-sm">
        <Rich text={text} />
      </div>
    );
  }
  return (
    <div className="rounded-2xl border-2 border-white bg-white/80 px-3.5 py-2 text-base font-bold leading-relaxed text-slate-700 md:text-lg">
      <Rich text={text} />
    </div>
  );
}

function Lines({ lines, tone }: { lines: string[]; tone?: Tone26 }) {
  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <LineRow key={`${i}-${line.slice(0, 12)}`} text={line} tone={tone} />
      ))}
    </div>
  );
}

/** شريط زمني أفقي (RTL) — يُستخدم في كل المختبرات البصرية. */
function TrackBar({
  label,
  color,
  width = "100%",
  marker,
}: {
  label: ReactNode;
  color: string;
  width?: string;
  marker?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 shrink-0 text-right text-xs font-black text-slate-600 sm:w-28">{label}</div>
      <div className="relative h-7 min-w-0 flex-1 rounded-full bg-slate-200/70 ring-1 ring-slate-900/5">
        <div className={`absolute inset-y-0 right-0 rounded-full ring-1 ring-slate-900/5 ${color}`} style={{ width, minWidth: "18px" }} />
        {marker}
      </div>
    </div>
  );
}

function ViewChip({ view, active, onClick }: { view: "event" | "progress"; active: boolean; onClick?: () => void }) {
  const v = view === "event" ? EVENT : PROGRESS;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl px-3 py-2 text-xs font-black transition ${active ? `${v.chip} shadow` : "border-2 border-slate-200 bg-white text-slate-500"}`}
    >
      <En>{v.tag}</En>
    </button>
  );
}

// ============================================================
// 1) نظرة المخرج — مشهدان مختلفان (s1)
// ============================================================
function TwoViewsLab({ lines }: { lines: string[] }) {
  const [view, setView] = useState<"event" | "progress">("progress");
  const [head, info, p1, q1, a1, p2, q2, example, a2] = lines;
  return (
    <LabPanel emoji="🎬" label="TWO VIEWS OF THE PAST" ar="نوعان من المعلومات في كل فيلم" seq="l26-two-views">
      <div className="text-center text-lg font-black text-teal-900">
        <Rich text={head} />
      </div>
      <div className="text-center text-base font-bold text-slate-600">
        <Rich text={info} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          { key: "progress" as const, title: p1, q: q1, a: a1 },
          { key: "event" as const, title: p2, q: q2, a: a2 },
        ].map((card) => {
          const v = card.key === "event" ? EVENT : PROGRESS;
          const active = view === card.key;
          return (
            <button
              key={card.key}
              type="button"
              onClick={() => setView(card.key)}
              aria-pressed={active}
              className={`min-w-0 rounded-3xl border-2 p-4 text-right transition ${active ? `${v.soft} ring-2 ${v.ring}` : "border-slate-200 bg-white"}`}
            >
              <div className="text-base font-black text-slate-800">
                <Rich text={card.title} />
              </div>
              <div className="mt-2 text-sm font-bold text-slate-600">
                <Rich text={card.q} />
              </div>
              <div dir="ltr" className="ltr-row mt-3 flex justify-start">
                <En className={`rounded-xl px-3 py-1.5 text-sm font-black ${active ? v.chip : "bg-slate-100 text-slate-500"}`}>{card.a}</En>
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="mb-2 text-center text-sm font-black text-teal-900">
          <Rich text={example} />
        </div>
        <div className="mb-2 text-center text-xs font-black text-slate-500">
          <Rich text={view === "event" ? "الحدث يُروى كنقطة واحدة 📸" : "المشهد الجاري يمتد على الزمن 🎥"} />
        </div>
        <div className="space-y-2">
          {view === "event" ? (
            <>
              <TrackBar label={<En>What happened?</En>} color={EVENT.bar} width="14%" marker={<span className="absolute -top-1 right-[86%] text-lg">📸</span>} />
              <TrackBar label={<Rich text="الحدث" />} color="bg-orange-200" width="100%" />
            </>
          ) : (
            <>
              <TrackBar label={<En>What was happening?</En>} color={PROGRESS.bar} width="100%" marker={<span className="absolute -top-1 right-1 text-lg">🎥</span>} />
              <TrackBar label={<Rich text="المشهد" />} color="bg-teal-200" width="100%" />
            </>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <ViewChip view="event" active={view === "event"} onClick={() => setView("event")} />
        <ViewChip view="progress" active={view === "progress"} onClick={() => setView("progress")} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 2) خط زمني مصغّر: was walking / saw (s1)
// ============================================================
function MiniTimelineLab({ lines }: { lines: string[] }) {
  const [seen, setSeen] = useState(false);
  const [so, bg, ev] = lines;
  return (
    <LabPanel emoji="🐦" label="ONE SCENE — TWO TENSES" ar="مشهد واحد… وزمنان" seq="l26-bird-scene">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={so} />
      </div>
      <div className="mt-3 space-y-2 rounded-2xl border-2 border-white bg-white p-3">
        <TrackBar
          label={<En>was walking</En>}
          color={PROGRESS.bar}
          width="100%"
          marker={
            <span
              className={`absolute -top-0.5 right-2 text-lg transition ${seen ? "opacity-100" : "opacity-0"}`}
              aria-hidden
            >
              📸
            </span>
          }
        />
        <TrackBar label={<En>saw</En>} color={seen ? "bg-orange-400" : "bg-slate-200"} width="12%" />
        <button
          type="button"
          onClick={() => setSeen((v) => !v)}
          aria-pressed={seen}
          className="mx-auto mt-1 block rounded-xl bg-teal-700 px-4 py-2 text-sm font-black text-white"
        >
          <Rich text={seen ? "📸 لحظة الرؤية" : "🎥 شغّل المشهد الجاري"} />
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        <div className={`rounded-2xl border-2 p-3 ${PROGRESS.soft}`}>
          <div className="text-sm font-black text-teal-900">
            <Rich text={bg} />
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
          <div className="text-sm font-black text-orange-900">
            <Rich text={ev} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 3) مختبر «طويل / قصير» (s2)
// ============================================================
function LongShortLab({ lines }: { lines: string[] }) {
  const [better, setBetter] = useState(false);
  const [intro, longRule, shortRule, verdict] = lines;
  return (
    <LabPanel emoji="🧪" label="LONG vs SHORT CORRECTION LAB" ar="مختبر تصحيح قاعدة المبتدئ" seq="l26-long-short">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className={`rounded-2xl border-2 p-3 ${better ? "border-slate-200 bg-white opacity-60" : "border-amber-300 bg-amber-50"}`}>
          <En className="block text-sm font-black text-amber-900">{longRule}</En>
        </div>
        <div className={`rounded-2xl border-2 p-3 ${better ? "border-slate-200 bg-white opacity-60" : "border-amber-300 bg-amber-50"}`}>
          <En className="block text-sm font-black text-amber-900">{shortRule}</En>
        </div>
      </div>
      <div
        className={`mt-3 rounded-2xl border-2 p-3 text-center text-base font-black transition ${
          better ? "border-teal-300 bg-teal-50 text-teal-900" : "border-rose-200 bg-rose-50 text-rose-800"
        }`}
      >
        <Rich text={verdict} />
      </div>
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => setBetter((v) => !v)}
          aria-pressed={better}
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-black text-white"
        >
          <Rich text={better ? "↺ أرني قاعدة المبتدئ" : "🎬 صحّح التفكير"} />
        </button>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 4) التفكير الأفضل + مثال القراءة (s2)
// ============================================================
function BetterThinkingLab({ lines }: { lines: string[] }) {
  const [focus, setFocus] = useState<"cont" | "simple">("cont");
  const [intro, contTitle, contDef, simpleTitle, simpleDef, exTitle, exCont, exContAr, exContNote, but, exSim, exSimAr, note] = lines;
  return (
    <LabPanel emoji="🧠" label="BETTER THINKING" ar="التفكير الأدق" seq="l26-better-thinking">
      <div className="text-center text-base font-bold text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setFocus("cont")}
          aria-pressed={focus === "cont"}
          className={`min-w-0 rounded-3xl border-2 p-4 text-right transition ${focus === "cont" ? `${PROGRESS.soft} ring-2 ${PROGRESS.ring}` : "border-slate-200 bg-white"}`}
        >
          <En className="block text-sm font-black text-teal-800">{contTitle}</En>
          <div className="mt-2 text-sm font-bold leading-relaxed text-slate-700">
            <Rich text={contDef} />
          </div>
        </button>
        <button
          type="button"
          onClick={() => setFocus("simple")}
          aria-pressed={focus === "simple"}
          className={`min-w-0 rounded-3xl border-2 p-4 text-right transition ${focus === "simple" ? `${EVENT.soft} ring-2 ${EVENT.ring}` : "border-slate-200 bg-white"}`}
        >
          <En className="block text-sm font-black text-orange-800">{simpleTitle}</En>
          <div className="mt-2 text-sm font-bold leading-relaxed text-slate-700">
            <Rich text={simpleDef} />
          </div>
        </button>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={exTitle} />
        </div>
        <div className={`mt-2 rounded-2xl border-2 p-3 ${focus === "cont" ? PROGRESS.soft : "border-slate-200 bg-white"}`}>
          <En className="block text-base font-black text-slate-900">{exCont}</En>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={exContAr} />
          </div>
          <div className="mt-1 text-sm font-bold text-teal-800">
            <Rich text={exContNote} />
          </div>
        </div>
        <div className="mt-2 text-center text-sm font-black text-slate-600">
          <Rich text={but} />
        </div>
        <div className={`mt-1 rounded-2xl border-2 p-3 ${focus === "simple" ? EVENT.soft : "border-slate-200 bg-white"}`}>
          <En className="block text-base font-black text-slate-900">{exSim}</En>
          <div className="mt-1 text-sm font-bold text-slate-600">
            <Rich text={exSimAr} />
          </div>
          <div className="mt-1 text-sm font-bold text-orange-800">
            <Rich text={note} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 5) عدسة المخرج — 📸 / 🎥 (s3)
// ============================================================
function ViewfinderLab({ lines }: { lines: string[] }) {
  const [view, setView] = useState<"event" | "progress">("event");
  const [t1, simple, simpleAr, simpleNote, t2, cont, contAr, contNote] = lines;
  const scene = {
    event: { title: t1, sentence: simple, ar: simpleAr, note: simpleNote },
    progress: { title: t2, sentence: cont, ar: contAr, note: contNote },
  }[view];
  const v = view === "event" ? EVENT : PROGRESS;
  return (
    <LabPanel emoji="📸" label="THE DIRECTOR'S VIEWFINDER" ar="اختر العدسة… وسيتغير المشهد" seq="l26-viewfinder">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setView("event")}
          aria-pressed={view === "event"}
          className={`rounded-2xl px-4 py-2 text-sm font-black transition ${view === "event" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <En>{EVENT.tag}</En>
        </button>
        <button
          type="button"
          onClick={() => setView("progress")}
          aria-pressed={view === "progress"}
          className={`rounded-2xl px-4 py-2 text-sm font-black transition ${view === "progress" ? PROGRESS.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <En>{PROGRESS.tag}</En>
        </button>
      </div>
      <div className={`mt-3 rounded-3xl border-2 p-4 transition ${v.soft}`}>
        <div className="text-center text-base font-black text-slate-800">
          <Rich text={scene.title} />
        </div>
        <div dir="ltr" className="ltr-row mt-3 flex justify-center">
          <En className={`rounded-2xl px-4 py-2 text-center text-base font-black md:text-lg ${v.chip}`}>{scene.sentence}</En>
        </div>
        <div className="mt-3 text-center text-sm font-bold text-slate-700">
          <Rich text={scene.ar} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-500">
          <Rich text={scene.note} />
        </div>
        <div className="mt-3 space-y-2">
          {view === "event" ? (
            <TrackBar label={<En>watched</En>} color={EVENT.bar} width="16%" marker={<span className="absolute -top-1 right-[80%] text-lg">📸</span>} />
          ) : (
            <TrackBar
              label={<En>was watching</En>}
              color={PROGRESS.bar}
              width="100%"
              marker={<span className="absolute -top-1 right-[46%] text-xs font-black text-white">9:00</span>}
            />
          )}
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center text-sm font-black text-slate-700">
        <Rich text="ما الذي تغيّر؟ الجملة… أم العدسة؟ 🎬" />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 6) مشهد الطبخ (s3)
// ============================================================
function CookSceneLab({ lines }: { lines: string[] }) {
  const [view, setView] = useState<"simple" | "cont">("simple");
  const [header, simple, simpleAr, simpleNote, but, cont, contAr, contNote] = lines;
  const focused = view === "simple" ? EVENT : PROGRESS;
  const dimmed = view === "simple" ? PROGRESS : EVENT;
  const cards = [
    { tone: EVENT, focus: view === "simple", toggle: () => setView("simple"), tag: "📸 Past Simple", sentence: simple, ar: simpleAr, note: simpleNote, verb: "cooked", bar: EVENT.bar, width: "16%" },
    { tone: PROGRESS, focus: view === "cont", toggle: () => setView("cont"), tag: "🎥 Past Continuous", sentence: cont, ar: contAr, note: contNote, verb: "cooking", bar: PROGRESS.bar, width: "100%" },
  ];
  return (
    <LabPanel emoji="🍲" label="ONE MOMENT — TWO VIEWS" ar="الطبخ… وقوع أحداث" seq="l26-cook-scene">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={header} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {cards.map((card, i) => (
          <button
            key={i}
            type="button"
            onClick={card.toggle}
            aria-pressed={card.focus}
            className={`min-w-0 rounded-3xl border-2 p-3 text-right transition ${card.focus ? `${card.tone.soft} ring-2 ${card.tone.ring}` : "border-slate-200 bg-white opacity-80"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${card.tone.chip}`}>{card.tag}</span>
              <span className="text-lg">{i === 0 ? "📸" : "🎥"}</span>
            </div>
            <En className="mt-2 block text-left text-sm font-black text-slate-900 md:text-base">{card.sentence}</En>
            <div className="mt-1 text-sm font-bold text-slate-700">
              <Rich text={card.ar} />
            </div>
            <div className="mt-1 text-xs font-bold text-slate-500">
              <Rich text={card.note} />
            </div>
            <div className="mt-2">
              <TrackBar
                label={<En>{card.verb}</En>}
                color={card.bar}
                width={card.width}
                marker={i === 0 ? <span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span> : <span className="absolute -top-1 right-[42%] text-[10px] font-black text-white">…</span>}
              />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-white bg-white p-2.5">
        <span className={`rounded-lg px-2 py-1 text-[10px] font-black ${dimmed.chip}`}>
          <En>{view === "simple" ? "Past Continuous" : "Past Simple"}</En>
        </span>
        <span className="text-xs font-black text-slate-600">
          <Rich text={but} />
        </span>
        <En className="rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-black text-white">
          {view === "simple" ? "She was cooking dinner when I arrived." : "She cooked dinner."}
        </En>
      </div>
      <div className="mt-2 text-center text-xs font-black text-slate-500">
        <Rich text="اضغط على أي بطاقة لتكبيرها — الجملتان موجودتان دائمًا للمقارنة." />
      </div>
      <div className="mt-1 text-center text-[11px] font-bold text-slate-400">
        <Rich text="الإطار المضيء = المشهد الذي تختاره الكاميرا الآن." />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 7) السؤال السحري (s4)
// ============================================================
function MagicQuestionLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<"cont" | "simple">("cont");
  const [ask, q1, a1, or, q2, a2] = lines;
  const v = pick === "cont" ? PROGRESS : EVENT;
  return (
    <LabPanel emoji="🧠" label="THE MAGIC QUESTION" ar="بطاقة القرار" seq="l26-magic-question">
      <div className="text-center text-2xl font-black text-sky-900 md:text-3xl">
        <Rich text="What picture am I trying to show? 🎬" />
      </div>
      <div className="text-center text-base font-bold text-slate-600">
        <Rich text={ask} />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setPick("simple")}
          aria-pressed={pick === "simple"}
          className={`min-w-0 rounded-3xl border-2 p-4 text-right transition ${pick === "simple" ? `${EVENT.soft} ring-2 ${EVENT.ring}` : "border-slate-200 bg-white"}`}
        >
          <div className="text-base font-black text-slate-800">
            <Rich text={q1} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex justify-start">
            <En className={`rounded-xl px-3 py-1.5 text-sm font-black ${pick === "simple" ? EVENT.chip : "bg-slate-100 text-slate-500"}`}>{a1}</En>
          </div>
        </button>
        <div className="order-first text-center text-sm font-black text-slate-500 sm:order-none">
          <Rich text={or} />
        </div>
        <button
          type="button"
          onClick={() => setPick("cont")}
          aria-pressed={pick === "cont"}
          className={`min-w-0 rounded-3xl border-2 p-4 text-right transition ${pick === "cont" ? `${PROGRESS.soft} ring-2 ${PROGRESS.ring}` : "border-slate-200 bg-white"}`}
        >
          <div className="text-base font-black text-slate-800">
            <Rich text={q2} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex justify-start">
            <En className={`rounded-xl px-3 py-1.5 text-sm font-black ${pick === "cont" ? PROGRESS.chip : "bg-slate-100 text-slate-500"}`}>{a2}</En>
          </div>
        </button>
      </div>
      <div className={`mt-3 rounded-2xl border-2 p-3 text-center text-sm font-black ${v.soft} ${v.text}`}>
        <Rich
          text={
            pick === "simple"
              ? "العدسة: 📸 سأقول ماذا حدث → Past Simple"
              : "العدسة: 🎥 سأعرض المشهد الجاري → Past Continuous"
          }
        />
      </div>
      <div className="mt-2 text-center text-xs font-bold text-slate-500">
        <Rich text="القرار ليس حفظًا: المعنى والسياق هما اللذان يحددان." />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 8) لماذا لا نقول دائمًا Past Continuous؟ (s6)
// ============================================================
function NotAlwaysLab({ lines }: { lines: string[] }) {
  const [show, setShow] = useState(false);
  const [example, cont, note, meaning, better, simple, why] = lines;
  return (
    <LabPanel emoji="🧠" label="WHY NOT ALWAYS CONTINUOUS?" ar="لماذا لا نستخدم Past Continuous دائمًا؟" seq="l26-not-always">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={example} />
      </div>
      <div className={`mt-3 rounded-3xl border-2 p-4 ${show ? "border-slate-200 bg-white" : PROGRESS.soft}`}>
        <En className="block text-base font-black text-slate-900 md:text-lg">{cont}</En>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich text={note} />
        </div>
        <div className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-black text-amber-900">
          <Rich text={meaning} />
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-pressed={show}
          className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-black text-white"
        >
          <Rich text={show ? "🎥 أرني المشهد الجاري" : "📸 أرني الأبسط"} />
        </button>
      </div>
      <div className={`mt-3 rounded-3xl border-2 p-4 transition ${show ? EVENT.soft : "border-slate-200 bg-white"}`}>
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={better} />
        </div>
        <En className="mt-2 block text-center text-base font-black text-slate-900 md:text-lg">{simple}</En>
        <div className="mt-2 text-sm font-bold text-slate-600">
          <Rich text={why} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 9) عكس الجملة (s8)
// ============================================================
function FlipOrderLab({ lines }: { lines: string[] }) {
  const [flipped, setFlipped] = useState(false);
  const [yes, canSay, a, or, b, same, example, c, or2, d] = lines;
  return (
    <LabPanel emoji="🔄" label="FLIP THE SENTENCE" ar="اعكس الترتيب… المعنى لا يتغير" seq="l26-flip-order">
      <div className="text-center text-lg font-black text-teal-900">
        <Rich text={yes} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm font-bold text-slate-600">
          <Rich text={canSay} />
        </span>
        <button
          type="button"
          onClick={() => setFlipped((v) => !v)}
          aria-pressed={flipped}
          className="rounded-xl bg-sky-600 px-3 py-1.5 text-xs font-black text-white"
        >
          <Rich text="🔄 اعكس" />
        </button>
      </div>
      <div className="grid gap-2">
        <div className={`rounded-2xl border-2 p-3 transition ${!flipped ? PROGRESS.soft : "border-slate-200 bg-white"}`}>
          <En className="block text-center text-sm font-black text-slate-900 md:text-base">{a}</En>
        </div>
        <div className="text-center text-sm font-black text-slate-500">
          <Rich text={or} />
        </div>
        <div className={`rounded-2xl border-2 p-3 transition ${flipped ? PROGRESS.soft : "border-slate-200 bg-white"}`}>
          <En className="block text-center text-sm font-black text-slate-900 md:text-base">{b}</En>
        </div>
      </div>
      <div className="rounded-2xl bg-white px-3 py-2 text-center text-sm font-black text-teal-800">
        <Rich text={same} />
      </div>
      <div className="rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-600">
          <Rich text={example} />
        </div>
        <div className="mt-2 grid gap-2">
          <En className="block rounded-xl bg-teal-50 px-3 py-2 text-center text-sm font-black text-teal-900">{c}</En>
          <div className="text-center text-sm font-black text-slate-500">
            <Rich text={or2} />
          </div>
          <En className="block rounded-xl bg-sky-50 px-3 py-2 text-center text-sm font-black text-sky-900">{d}</En>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 10) مسارات متوازية (s9)
// ============================================================
function ParallelTracksLab({ lines }: { lines: string[] }) {
  const [parallel, setParallel] = useState(true);
  const [title, explain, example, sentence, sentenceAr, notice, s1, and, s2, both, why, whyText, imagine, timeArrow, trackA, trackB, conclusion] = lines;
  return (
    <LabPanel emoji="⭐" label="PARALLEL TIMELINE" ar="خطان زمنيان يعملان معًا" seq="l26-parallel-tracks">
      <div className="text-center text-lg font-black text-teal-900">
        <Rich text={title} />
      </div>
      <div className="text-center text-sm font-bold text-slate-600">
        <Rich text={explain} />
      </div>
      <div className="mt-2 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-600">
          <Rich text={example} />
        </div>
        <En className="mt-2 block text-center text-base font-black text-slate-900 md:text-lg">{sentence}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-500">
          <Rich text={sentenceAr} />
        </div>
      </div>
      <div className="mt-3 grid gap-2 rounded-2xl border-2 border-white bg-white p-3 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-center text-xs font-black text-slate-500">
            <Rich text={notice} />
          </div>
          <div className="rounded-xl bg-teal-50 px-3 py-2 text-center text-sm font-black text-teal-900">
            <En>{s1}</En>
          </div>
          <div className="text-center text-sm font-black text-slate-500">
            <Rich text={and} />
          </div>
          <div className="rounded-xl bg-teal-50 px-3 py-2 text-center text-sm font-black text-teal-900">
            <En>{s2}</En>
          </div>
          <div className="text-center text-sm font-black text-teal-800">
            <Rich text={both} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-center text-xs font-black text-slate-500">
            <Rich text={why} />
          </div>
          <div className="rounded-xl bg-sky-50 px-3 py-2 text-center text-sm font-bold text-sky-900">
            <Rich text={whyText} />
          </div>
          <div className="text-center text-xs font-black text-slate-500">
            <Rich text={imagine} />
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-center text-sm font-black text-slate-700">
            <En>{timeArrow}</En>
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="space-y-2">
          <TrackBar label={<En>{trackA}</En>} color={PROGRESS.bar} width={parallel ? "100%" : "55%"} />
          <TrackBar label={<En>{trackB}</En>} color="bg-sky-400" width={parallel ? "100%" : "55%"} />
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-black text-teal-800">
            <Rich text={conclusion} />
          </div>
          <button
            type="button"
            onClick={() => setParallel((v) => !v)}
            aria-pressed={parallel}
            className="rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-black text-white"
          >
            <Rich text={parallel ? "🎥 الفعلان متوازيان" : "⏱️ أرني الفرق"} />
          </button>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 11) WHEN مقابل WHILE (s10)
// ============================================================
function WhenVsWhileLab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<"when" | "while">("when");
  const [intro, whenEx, whileEx, whatDiff, whenWord, whenMean, whenA, whenB, whileWord, whileMean, whileA, whileB] = lines;
  const active = mode === "when";
  const word = active ? whenWord : whileWord;
  const mean = active ? whenMean : whileMean;
  const first = active ? whenA : whileA;
  const second = active ? whenB : whileB;
  return (
    <LabPanel emoji="⚔️" label="WHEN vs WHILE" ar="بدّل وراقب الخط الزمني" seq="l26-when-vs-while">
      <div className="text-center text-sm font-black text-slate-600">
        <Rich text={intro} />
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("when")}
          aria-pressed={mode === "when"}
          className={`rounded-2xl px-4 py-2 text-sm font-black ${mode === "when" ? "bg-amber-500 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <En>{whenWord}</En>
        </button>
        <button
          type="button"
          onClick={() => setMode("while")}
          aria-pressed={mode === "while"}
          className={`rounded-2xl px-4 py-2 text-sm font-black ${mode === "while" ? "bg-sky-600 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <En>{whileWord}</En>
        </button>
      </div>
      <div className="mt-3 grid gap-2">
        <div className={`rounded-2xl border-2 p-3 ${mode === "when" ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"}`}>
          <En className="block text-center text-sm font-black text-slate-900 md:text-base">{whenEx}</En>
        </div>
        <div className={`rounded-2xl border-2 p-3 ${mode === "while" ? "border-sky-300 bg-sky-50" : "border-slate-200 bg-white"}`}>
          <En className="block text-center text-sm font-black text-slate-900 md:text-base">{whileEx}</En>
        </div>
      </div>
      <div className="mt-2 text-center text-sm font-black text-slate-600">
        <Rich text={whatDiff} />
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <EnAr en={word} ar={<Rich text={mean} />} enClassName={`rounded-xl px-3 py-1.5 text-sm font-black ${active ? "bg-amber-500 text-white" : "bg-sky-600 text-white"}`} arClassName="text-sm font-bold text-slate-700" />
        </div>
        <div className="mt-3 space-y-2">
          <TrackBar label={<Rich text={first} />} color="bg-teal-500" width="100%" />
          <div className="relative">
            <TrackBar
              label={<Rich text={second} />}
              color={active ? "bg-orange-400" : "bg-sky-400"}
              width={active ? "14%" : "100%"}
              marker={
                active ? (
                  <span className="absolute -top-1 right-[80%] text-lg" aria-hidden>
                    📸
                  </span>
                ) : undefined
              }
            />
          </div>
        </div>
        <div className="mt-2 text-center text-xs font-black text-slate-500">
          <Rich text={active ? "خط مستمر + حدث يقاطعه 📸" : "خطان مستمران يعملان في الفترة نفسها 🎥 + 🎥"} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 12) تحليل WHEN: ماذا حدث هنا؟ (s7)
// ============================================================
function WhenAnalysisLab({ lines }: { lines: string[] }) {
  const [step, setStep] = useState(0);
  const [title, firstLabel, firstEx, firstNote, thenLabel, secondEx, secondNote, so, back, event] = lines;
  const steps = [
    { label: firstLabel, en: firstEx, ar: firstNote, color: "teal" as const, bar: PROGRESS.bar, width: "100%" },
    { label: thenLabel, en: secondEx, ar: secondNote, color: "orange" as const, bar: EVENT.bar, width: "14%" },
  ];
  return (
    <LabPanel emoji="📞" label="WHEN ANALYSIS" ar="حلّل الجملة خطوة بخطوة" seq="l26-when-analysis">
      <div className="text-center text-lg font-black text-teal-900">
        <Rich text={title} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            aria-pressed={step === i}
            className={`rounded-xl px-3 py-1.5 text-sm font-black ${step === i ? "bg-teal-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <Rich text={s.label} />
          </button>
        ))}
      </div>
      <div className={`mt-3 rounded-2xl border-2 p-4 ${step === 0 ? PROGRESS.soft : EVENT.soft}`}>
        <En className="block text-center text-base font-black text-slate-900 md:text-lg">{steps[step].en}</En>
        <div className="mt-1 text-center text-sm font-bold text-slate-600">
          <Rich text={steps[step].ar} />
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() => setStep((s) => (s === 0 ? 1 : 0))}
          className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-black text-white"
        >
          <Rich text="▶ شغّل التحليل" />
        </button>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <TrackBar label={<En>{firstEx}</En>} color={PROGRESS.bar} width="100%" />
        <div className="mt-2">
          <TrackBar
            label={<En>{secondEx}</En>}
            color={EVENT.bar}
            width="12%"
            marker={<span className="absolute -top-1 right-[82%] text-lg" aria-hidden>📸</span>}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="text-center text-sm font-black text-slate-600">
          <Rich text={so} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className={`rounded-xl border-2 px-3 py-2 text-center text-sm font-black ${PROGRESS.soft} ${PROGRESS.text}`}>
            <En>{back}</En>
          </div>
          <div className={`rounded-xl border-2 px-3 py-2 text-center text-sm font-black ${EVENT.soft} ${EVENT.text}`}>
            <En>{event}</En>
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 13) while ليست دائمًا Past Continuous (s11)
// ============================================================
function WhileNuanceLab({ lines }: { lines: string[] }) {
  const [mixed, setMixed] = useState(false);
  const [note, example, sentence, here, cont, simple, reason, so, nuance, meaning] = lines;
  return (
    <LabPanel emoji="⚠️" label="WHILE NUANCE LAB" ar="المعنى هو الذي يحدد" seq="l26-while-nuance">
      <div className="text-center text-sm font-bold text-slate-700">
        <Rich text={note} />
      </div>
      <div className="mt-1 text-center text-sm font-black text-slate-600">
        <Rich text={example} />
      </div>
      <En className="mt-2 block text-center text-base font-black text-slate-900 md:text-lg">{sentence}</En>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <TrackBar label={<En>was walking</En>} color={PROGRESS.bar} width="100%" />
        <div className="mt-2">
          <TrackBar
            label={<En>saw</En>}
            color={mixed ? EVENT.bar : "bg-slate-200"}
            width="12%"
            marker={mixed ? <span className="absolute -top-1 right-[82%] text-lg" aria-hidden>📸</span> : undefined}
          />
        </div>
        <button
          type="button"
          onClick={() => setMixed((v) => !v)}
          aria-pressed={mixed}
          className="mx-auto mt-2 block rounded-xl bg-teal-700 px-3 py-1.5 text-xs font-black text-white"
        >
          <Rich text="🎬 أظهر الحدث داخل while" />
        </button>
      </div>
      <div className="mt-3 text-center text-sm font-black text-slate-600">
        <Rich text={here} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className={`rounded-xl border-2 px-3 py-2 text-center text-sm font-black ${PROGRESS.soft} ${PROGRESS.text}`}>
          <En>{cont}</En>
        </div>
        <div className={`rounded-xl border-2 px-3 py-2 text-center text-sm font-black ${EVENT.soft} ${EVENT.text}`}>
          <En>{simple}</En>
        </div>
      </div>
      <div className="mt-2 rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-slate-600">
        <Rich text={reason} />
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
        <div className="text-sm font-black text-amber-900">
          <Rich text={so} />
        </div>
        <div className="mt-1 text-sm font-black text-amber-900">
          <Rich text={nuance} />
        </div>
        <div className="mt-1 text-sm font-black text-teal-800">
          <Rich text={meaning} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 14) لوحة الأنماط الأربعة (s12)
// ============================================================
const PATTERN_MEANINGS = [
  "حدث ماضٍ مكتمل أو حدث نرويه كواقعة.",
  "فعل كان جاريًا في وقت ماضٍ.",
  "فعل كان جاريًا + حدث وقع أثناءه.",
  "فعلان جاريان في الوقت نفسه.",
];

function FourPatternBoardLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const [after] = lines.slice(12);
  const groups = [0, 1, 2, 3].map((i) => ({
    label: lines[i * 3],
    structure: lines[i * 3 + 1],
    example: lines[i * 3 + 2],
    meaning: PATTERN_MEANINGS[i],
  }));
  const icons = ["📸", "🎥", "🎥 + 📸", "🎥 + 🎥"];
  const tones = [EVENT, PROGRESS, PROGRESS, PROGRESS];
  return (
    <LabPanel emoji="🔥" label="FOUR-PATTERN CONTROL BOARD" ar="اختر نمطًا وشاهد التركيب والمعنى والخط الزمني" seq="l26-four-patterns">
      <div className="grid gap-2 sm:grid-cols-2">
        {groups.map((g, i) => {
          const active = sel === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={active}
              className={`min-w-0 rounded-3xl border-2 p-3 text-right transition ${active ? `${tones[i].soft} ring-2 ${tones[i].ring}` : "border-slate-200 bg-white"}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-black text-slate-700">
                  <Rich text={g.label} />
                </span>
                <span className={`rounded-lg px-2 py-1 text-xs font-black ${tones[i].chip}`}>{icons[i]}</span>
              </div>
              <div className="mt-2 rounded-xl bg-white px-2.5 py-2 text-center text-xs font-black text-slate-800">
                <Rich text={g.structure} />
              </div>
              <En className="mt-2 block text-left text-sm font-black text-slate-900">{g.example}</En>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-3xl border-2 border-white bg-white p-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className={`rounded-lg px-2.5 py-1 text-xs font-black ${tones[sel].chip}`}>{icons[sel]}</span>
          <span className="text-sm font-black text-slate-700">
            <Rich text={groups[sel].structure} />
          </span>
        </div>
        <div className="mt-2 text-center text-sm font-bold text-slate-600">
          <Rich text={groups[sel].meaning} />
        </div>
        <En className="mt-2 block rounded-xl bg-slate-50 px-3 py-2 text-center text-sm font-black text-slate-900">
          {groups[sel].example}
        </En>
        <div className="mt-3 space-y-2">
          {sel === 0 && <TrackBar label={<En>{groups[0].example}</En>} color={EVENT.bar} width="16%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />}
          {sel === 1 && <TrackBar label={<En>{groups[1].example}</En>} color={PROGRESS.bar} width="100%" marker={<span className="absolute -top-1 left-1 text-xs font-black text-white">5:00</span>} />}
          {sel === 2 && (
            <>
              <TrackBar label={<En>was studying</En>} color={PROGRESS.bar} width="100%" />
              <TrackBar label={<En>called</En>} color={EVENT.bar} width="14%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />
            </>
          )}
          {sel === 3 && (
            <>
              <TrackBar label={<En>was studying</En>} color={PROGRESS.bar} width="100%" />
              <TrackBar label={<En>was playing</En>} color="bg-sky-400" width="100%" />
            </>
          )}
        </div>
      </div>
      <div className="mt-2 rounded-2xl bg-amber-50 px-3 py-2 text-center text-sm font-black text-amber-900">
        <Rich text={after} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 15) مخرج القصة: الخلفية والحدث (s13)
// ============================================================
function StoryDirectorLab({ lines }: { lines: string[] }) {
  const [layer, setLayer] = useState<"all" | "bg" | "ev">("all");
  const [intro, imagine, ...rest] = lines;
  const story = rest.slice(0, 7);
  const [here, b1, b2, b3, bgLabel, then, e1, e2, e3, evLabel] = rest.slice(7);
  const bgVerbs = [b1, b2, b3];
  const evVerbs = [e1, e2, e3];
  const isBg = (line: string) => /was |were /.test(line) && !/came|stopped|opened|Suddenly/.test(line);
  return (
    <LabPanel emoji="🎬" label="STORY DIRECTOR" ar="طبقتان في القصة نفسها" seq="l26-story-director">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="text-center text-sm font-bold text-slate-500">
        <Rich text={imagine} />
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {[
          { key: "all" as const, label: "🎬 كل القصة" },
          { key: "bg" as const, label: "🎥 الخلفية" },
          { key: "ev" as const, label: "📸 الأحداث" },
        ].map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => setLayer(b.key)}
            aria-pressed={layer === b.key}
            className={`rounded-xl px-3 py-1.5 text-xs font-black ${layer === b.key ? "bg-teal-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <Rich text={b.label} />
          </button>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {story.map((line, i) => {
          const bg = isBg(line);
          const dim = (layer === "bg" && !bg) || (layer === "ev" && bg);
          return (
            <div key={i} className={`rounded-2xl border-2 p-3 transition ${bg ? "border-teal-200 bg-teal-50" : "border-orange-200 bg-orange-50"} ${dim ? "opacity-35" : ""}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-lg px-2 py-1 text-[10px] font-black ${bg ? "bg-teal-600 text-white" : "bg-orange-500 text-white"}`}>
                  <Rich text={bg ? "🎥 BACKGROUND" : "📸 EVENT"} />
                </span>
                <En className="text-left text-sm font-black text-slate-900 md:text-base">{line}</En>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className={`rounded-2xl border-2 p-3 ${PROGRESS.soft}`}>
          <div className="text-center text-xs font-black text-slate-600">
            <Rich text={here} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {bgVerbs.map((v, i) => (
              <En key={i} className="rounded-lg bg-teal-600 px-2 py-1 text-xs font-black text-white">
                {v}
              </En>
            ))}
          </div>
          <div className="mt-2 text-center text-xs font-black text-teal-800">
            <Rich text={bgLabel} />
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
          <div className="text-center text-xs font-black text-slate-600">
            <Rich text={then} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {evVerbs.map((v, i) => (
              <En key={i} className="rounded-lg bg-orange-500 px-2 py-1 text-xs font-black text-white">
                {v}
              </En>
            ))}
          </div>
          <div className="mt-2 text-center text-xs font-black text-orange-800">
            <Rich text={evLabel} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 16) تحليل قصة Emma (s14)
// ============================================================
function EmmaAnalysisLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const [analyse, ...rest] = lines;
  const pairs = [] as { verb: string; role: string }[];
  for (let i = 0; i < 8; i++) {
    pairs.push({ verb: rest[i * 2], role: rest[i * 2 + 1] });
  }
  const tail = rest.slice(16);
  const [noteTitle, note1, note2, note3, note4] = tail;
  return (
    <LabPanel emoji="🔎" label="EMMA'S STORY ANALYSIS" ar="اضغط على الفعل لترى دوره في القصة" seq="l26-emma-analysis">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={analyse} />
      </div>
      <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
        {pairs.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`rounded-xl px-2.5 py-1.5 text-xs font-black transition ${
              sel === i
                ? p.role.includes("خلفية") || p.role.includes("جاري")
                  ? "bg-teal-600 text-white"
                  : "bg-orange-500 text-white"
                : "border-2 border-slate-200 bg-white text-slate-600"
            }`}
          >
            <En>{p.verb}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {pairs.map((p, i) => {
          const cont = p.role.includes("خلفية") || p.role.includes("جاري");
          return (
            <div
              key={i}
              className={`rounded-xl border-2 px-3 py-2 ${cont ? "border-teal-200 bg-teal-50" : "border-orange-200 bg-orange-50"} ${
                sel === i ? "ring-2 ring-offset-1 " + (cont ? "ring-teal-300" : "ring-orange-300") : "opacity-80"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <EnAr en={<En className="text-sm font-black text-slate-900">{p.verb}</En>} ar={<span className={`rounded-lg px-2 py-0.5 text-[10px] font-black text-white ${cont ? "bg-teal-600" : "bg-orange-500"}`}>
                  <Rich text={cont ? "🎥 خلفية" : "📸 حدث"} />
                </span>} />
              </div>
              <div className="mt-1 text-xs font-bold text-slate-600">
                <Rich text={p.role} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-3">
        <div className="text-center text-sm font-black text-amber-900">
          <Rich text={noteTitle} />
        </div>
        <div className="mt-1 text-center text-sm font-bold text-slate-700">
          <Rich text={note1} />
        </div>
        <div className="mt-1 text-center text-xs font-black text-slate-600">
          <Rich text={note2} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className={`rounded-xl px-3 py-2 text-center text-xs font-black ${PROGRESS.soft} ${PROGRESS.text}`}>
            <Rich text={note3} />
          </div>
          <div className={`rounded-xl px-3 py-2 text-center text-xs font-black ${EVENT.soft} ${EVENT.text}`}>
            <Rich text={note4} />
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 17) أزواج متزامنة (s15)
// ============================================================
function ParallelPairsLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const [intro, pair1, role1, role2, both, another, pair2, advanced, pair3, conclusion] = lines;
  const cards = [
    { sentence: pair1, left: role1, right: role2, note: both },
    { sentence: pair2, left: "", right: "", note: another },
    { sentence: pair3, left: "", right: "", note: advanced },
  ];
  return (
    <LabPanel emoji="⭐" label="SIMULTANEOUS PAIRS" ar="كل مثال: خطان يعملان معًا" seq="l26-parallel-pairs">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-3 grid gap-2">
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`min-w-0 rounded-2xl border-2 p-3 text-right transition ${sel === i ? "border-teal-300 bg-teal-50 ring-2 ring-teal-200" : "border-slate-200 bg-white"}`}
          >
            <En className="block text-left text-sm font-black text-slate-900 md:text-base">{c.sentence}</En>
            {c.left && c.right && (
              <div className="mt-2 grid gap-1 sm:grid-cols-2">
                <div className="rounded-lg bg-white px-2 py-1 text-center text-xs font-black text-teal-800">
                  <En>{c.left}</En>
                </div>
                <div className="rounded-lg bg-white px-2 py-1 text-center text-xs font-black text-sky-800">
                  <En>{c.right}</En>
                </div>
              </div>
            )}
            <div className="mt-2 text-xs font-bold text-slate-500">
              <Rich text={c.note} />
            </div>
            <div className="mt-2 space-y-1.5">
              <TrackBar label={<Rich text="🎥" />} color={PROGRESS.bar} width="100%" />
              <TrackBar label={<Rich text="🎥" />} color="bg-sky-400" width="100%" />
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2 rounded-2xl bg-white px-3 py-2 text-center text-sm font-black text-teal-800">
        <Rich text={conclusion} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 18) مسارات متعددة في الوقت نفسه (s16)
// ============================================================
function SimultaneousLab({ lines }: { lines: string[] }) {
  const [running, setRunning] = useState(true);
  const [intro, labelA, actionA, labelB, actionB, labelC, actionC, allSame, canSay, combined, praise] = lines;
  const lanes = [
    { label: labelA, action: actionA, color: PROGRESS.bar },
    { label: labelB, action: actionB, color: "bg-sky-400" },
    { label: labelC, action: actionC, color: "bg-violet-400" },
  ];
  return (
    <LabPanel emoji="🧠" label="SIMULTANEOUS ACTION LAB" ar="ثلاثة مسارات تعمل في الفترة نفسها" seq="l26-simultaneous">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-3 space-y-3 rounded-2xl border-2 border-white bg-white p-3">
        {lanes.map((lane, i) => (
          <div key={i} className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-lg bg-slate-900 px-2 py-0.5 text-[10px] font-black text-white">
                <En>{lane.label}</En>
              </span>
              <En className="text-left text-sm font-black text-slate-900 md:text-base">{lane.action}</En>
            </div>
            <div className="mt-1.5 h-6 rounded-full bg-slate-100">
              <div className={`h-6 rounded-full ${lane.color} transition-all duration-700`} style={{ width: running ? "100%" : "35%" }} />
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setRunning((v) => !v)}
            aria-pressed={running}
            className="rounded-xl bg-teal-700 px-4 py-2 text-xs font-black text-white"
          >
            <Rich text={running ? "⏸️ أوقف المسارات" : "▶ شغّل الأفعال الثلاثة"} />
          </button>
        </div>
        <div className="text-center text-xs font-black text-teal-800">
          <Rich text={allSame} />
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-teal-200 bg-teal-50 p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={canSay} />
        </div>
        <En className="mt-2 block text-center text-sm font-black text-slate-900 md:text-base">{combined}</En>
      </div>
      <div className="mt-2 rounded-2xl bg-amber-50 px-3 py-2 text-center text-sm font-black text-amber-900">
        <Rich text={praise} />
      </div>
    </LabPanel>
  );
}

// ============================================================
// 19) مختبر القطع: ثلاثة نماذج (s17)
// ============================================================
function InterruptionLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const [intro, ...rest] = lines;
  const triples = [] as { contLabel: string; cont: string; evLabel: string; ev: string; sentLabel: string; sent: string }[];
  for (let i = 0; i < 3; i++) {
    const o = i * 6;
    triples.push({ contLabel: rest[o], cont: rest[o + 1], evLabel: rest[o + 2], ev: rest[o + 3], sentLabel: rest[o + 4], sent: rest[o + 5] });
  }
  const current = triples[sel];
  return (
    <LabPanel emoji="⭐" label="INTERRUPTION LAB" ar="فعل جارٍ… يقطعه حدث" seq="l26-interruption">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {triples.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`rounded-xl px-3 py-1.5 text-xs font-black ${sel === i ? "bg-teal-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <En>{t.cont}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className={`rounded-2xl border-2 p-3 ${PROGRESS.soft}`}>
          <div className="text-[11px] font-black text-slate-600">
            <Rich text={current.contLabel} />
          </div>
          <En className="mt-1 block text-left text-sm font-black text-teal-900">{current.cont}</En>
        </div>
        <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
          <div className="text-[11px] font-black text-slate-600">
            <Rich text={current.evLabel} />
          </div>
          <En className="mt-1 block text-left text-sm font-black text-orange-900">{current.ev}</En>
        </div>
        <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-3 sm:col-span-1">
          <div className="text-[11px] font-black text-slate-600">
            <Rich text={current.sentLabel} />
          </div>
          <En className="mt-1 block text-left text-sm font-black text-sky-900">{current.sent}</En>
        </div>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <TrackBar label={<En>{current.cont}</En>} color={PROGRESS.bar} width="100%" />
        <div className="mt-2">
          <TrackBar
            label={<En>{current.ev}</En>}
            color={EVENT.bar}
            width="13%"
            marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>}
          />
        </div>
        <En className="mt-3 block rounded-xl bg-slate-50 px-3 py-2 text-center text-sm font-black text-slate-900">{current.sent}</En>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 20) النموذج البصري للقطع (s17)
// ============================================================
function InterruptionModelLab({ lines }: { lines: string[] }) {
  const [cut, setCut] = useState(false);
  const [title, contLabel, dashes, evLabel, x, sentLabel, sentence] = lines;
  return (
    <LabPanel emoji="🧠" label="VISUAL MODEL" ar="خط مستمر… وعلامة قطع" seq="l26-interruption-model">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={title} />
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-[11px] font-black text-slate-600">
          <Rich text={contLabel} />
        </div>
        <div className="relative mt-1 h-9 rounded-full bg-teal-100">
          <div className="absolute inset-y-0 right-0 w-full rounded-full bg-teal-500/80" />
          <En className="absolute inset-0 grid place-items-center text-xs font-black text-white">{dashes}</En>
          <span className={`absolute -top-1 text-xl transition-all duration-500 ${cut ? "right-[26%] opacity-100" : "right-[80%] opacity-40"}`} aria-hidden>
            📸
          </span>
        </div>
        <div className="mt-3 text-[11px] font-black text-slate-600">
          <Rich text={evLabel} />
        </div>
        <div className="mt-1 flex items-center gap-2">
          <En className={`rounded-lg px-2 py-1 text-sm font-black ${cut ? EVENT.chip : "bg-slate-100 text-slate-500"}`}>{x}</En>
          <div className="h-2 min-w-0 flex-1 rounded-full bg-orange-200" />
        </div>
      </div>
      <div className="mt-3 text-center text-[11px] font-black text-slate-600">
        <Rich text={sentLabel} />
      </div>
      <En className="mt-1 block rounded-2xl bg-sky-50 px-3 py-2 text-center text-base font-black text-sky-900">{sentence}</En>
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => setCut((v) => !v)}
          aria-pressed={cut}
          className="rounded-xl bg-teal-700 px-4 py-2 text-xs font-black text-white"
        >
          <Rich text={cut ? "↺ أعد الفعل الجاري" : "▶ 🎥 ثم 📸 القطع"} />
        </button>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 21) ليس كل Past Simple «يقطع» (s18)
// ============================================================
function NotEverySimpleLab({ lines }: { lines: string[] }) {
  const [mode, setMode] = useState<"continue" | "sequence">("continue");
  const [example, ex1, note1, but, ex2, same, other, ex3, noCont, whyQ, whyA] = lines;
  return (
    <LabPanel emoji="🔥" label="SHORT EVENT vs SEQUENCE" ar="حدث قصير أم سلسلة أحداث؟" seq="l26-not-every-simple">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("continue")}
          aria-pressed={mode === "continue"}
          className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "continue" ? "bg-teal-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <Rich text="🎥 + 📸 جارٍ وحدث" />
        </button>
        <button
          type="button"
          onClick={() => setMode("sequence")}
          aria-pressed={mode === "sequence"}
          className={`rounded-xl px-3 py-2 text-xs font-black ${mode === "sequence" ? "bg-orange-500 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <Rich text="📸 سلسلة أحداث" />
        </button>
      </div>
      {mode === "continue" ? (
        <div className="mt-3 space-y-2">
          <div className="text-center text-xs font-black text-slate-600">
            <Rich text={example} />
          </div>
          <div className={`rounded-2xl border-2 p-3 ${PROGRESS.soft}`}>
            <En className="block text-left text-sm font-black text-slate-900 md:text-base">{ex1}</En>
            <div className="mt-1 text-xs font-bold text-slate-600">
              <Rich text={note1} />
            </div>
          </div>
          <div className="text-center text-xs font-black text-slate-500">
            <Rich text={but} />
          </div>
          <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
            <En className="block text-left text-sm font-black text-slate-900 md:text-base">{ex2}</En>
            <div className="mt-1 text-xs font-bold text-slate-600">
              <Rich text={same} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="text-center text-xs font-black text-slate-600">
            <Rich text={other} />
          </div>
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3">
            <En className="block text-left text-sm font-black text-slate-900 md:text-base">{ex3}</En>
            <div className="mt-1 text-xs font-bold text-slate-600">
              <Rich text={noCont} />
            </div>
          </div>
          <div className="rounded-2xl border-2 border-white bg-white p-3 text-center">
            <div className="text-xs font-black text-slate-600">
              <Rich text={whyQ} />
            </div>
            <div className="mt-1 text-sm font-black text-teal-800">
              <Rich text={whyA} />
            </div>
          </div>
        </div>
      )}
    </LabPanel>
  );
}

// ============================================================
// 22) سلسلة الأحداث: شريط متتابع وكاميرا داخل الحدث (s19)
// ============================================================
function SequenceSceneLab({ lines }: { lines: string[] }) {
  const [step, setStep] = useState(-1);
  const [imagine, ...rest] = lines;
  const events = rest.slice(0, 5);
  const [story, fits, but, scene, perspective] = rest.slice(5);
  return (
    <LabPanel emoji="⭐" label="SEQUENCE vs SCENE" ar="سلسلة أحداث… أم كاميرا داخل الحدث؟" seq="l26-sequence-scene">
      <div className="text-center text-sm font-black text-slate-600">
        <Rich text={imagine} />
      </div>
      <div className="mt-3 grid gap-2">
        {events.map((e, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            aria-pressed={step === i}
            className={`flex min-w-0 items-center gap-3 rounded-2xl border-2 p-2.5 text-left transition ${step === i ? "border-orange-300 bg-orange-50" : "border-slate-200 bg-white"}`}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-500 text-xs font-black text-white">{i + 1}</span>
            <En className="min-w-0 flex-1 text-left text-sm font-black text-slate-900 md:text-base">{e}</En>
          </button>
        ))}
      </div>
      <div className="mt-2 text-center text-xs font-black text-slate-700">
        <Rich text={story} />
      </div>
      <div className="text-center text-xs font-black text-teal-800">
        <Rich text={fits} />
      </div>
      <div className="mt-3 rounded-2xl border-2 border-sky-200 bg-sky-50 p-3">
        <div className="text-center text-xs font-black text-slate-600">
          <Rich text={but} />
        </div>
        <En className="mt-2 block text-center text-sm font-black text-sky-900 md:text-base">{scene}</En>
        <div className="mt-2 space-y-1.5">
          <TrackBar label={<En>was eating</En>} color={PROGRESS.bar} width="100%" />
          <TrackBar
            label={<En>rang</En>}
            color={EVENT.bar}
            width="14%"
            marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>}
          />
        </div>
        <div className="mt-2 text-center text-xs font-black text-sky-900">
          <Rich text={perspective} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 23) الفرق العميق (s19)
// ============================================================
function DeepDifferenceLab({ lines }: { lines: string[] }) {
  const [view, setView] = useState<"simple" | "cont">("simple");
  const [title, simpleTitle, simpleVerb, e1, e2, e3, contTitle, contVerb, contEx] = lines;
  return (
    <LabPanel emoji="🧠" label="THE DEEP DIFFERENCE" ar="يروي الأحداث… أم يوقف الكاميرا؟" seq="l26-deep-difference">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={title} />
      </div>
      <div className="mt-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setView("simple")}
          aria-pressed={view === "simple"}
          className={`rounded-xl px-3 py-2 text-xs font-black ${view === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <En>{simpleTitle}</En>
        </button>
        <button
          type="button"
          onClick={() => setView("cont")}
          aria-pressed={view === "cont"}
          className={`rounded-xl px-3 py-2 text-xs font-black ${view === "cont" ? PROGRESS.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <En>{contTitle}</En>
        </button>
      </div>
      <div className={`mt-3 rounded-3xl border-2 p-4 ${view === "simple" ? EVENT.soft : PROGRESS.soft}`}>
        <div className="text-center text-xs font-black text-slate-600">
          <Rich text={view === "simple" ? simpleVerb : contTitle} />
        </div>
        {view === "simple" ? (
          <div className="mt-2 grid gap-1.5">
            <En className="block rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-slate-900">{e1}</En>
            <En className="block rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-slate-900">{e2}</En>
            <En className="block rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-slate-900">{e3}</En>
          </div>
        ) : (
          <>
            <div className="mt-2 text-center text-xs font-black text-slate-600">
              <Rich text={contVerb} />
            </div>
            <En className="mt-2 block rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-slate-900">{contEx}</En>
            <div className="mt-2 space-y-1.5">
              <TrackBar label={<En>was eating</En>} color={PROGRESS.bar} width="100%" />
              <TrackBar label={<En>rang</En>} color={EVENT.bar} width="14%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />
            </div>
          </>
        )}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 24) A / B / C / D (s20)
// ============================================================
function CompareFourLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const [a, s1, b, s2, c, s3, d, s4, allOk, butDiff] = lines;
  const items = [
    { key: a, sentence: s1, icon: "📸", tone: EVENT, note: "حدث مكتمل" },
    { key: b, sentence: s2, icon: "🎥", tone: PROGRESS, note: "نشاط جارٍ عند وقت محدد" },
    { key: c, sentence: s3, icon: "🎥 + 📸", tone: PROGRESS, note: "نشاط جارٍ + حدث" },
    { key: d, sentence: s4, icon: "🎥 + 🎥", tone: PROGRESS, note: "نشاطان جاريان" },
  ];
  return (
    <LabPanel emoji="⚔️" label="COMPARE CAREFULLY" ar="أربع جمل صحيحة… وأربع صور مختلفة" seq="l26-compare-four">
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`min-w-0 rounded-2xl border-2 p-3 text-right transition ${sel === i ? `${it.tone.soft} ring-2 ${it.tone.ring}` : "border-slate-200 bg-white"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <En className="rounded-lg bg-slate-900 px-2 py-0.5 text-xs font-black text-white">{it.key}</En>
              <span className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${it.tone.chip}`}>{it.icon}</span>
            </div>
            <En className="mt-2 block text-left text-sm font-black text-slate-900">{it.sentence}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <En className="block rounded-xl bg-slate-50 px-3 py-2 text-center text-sm font-black text-slate-900">{items[sel].sentence}</En>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span className={`rounded-lg px-2 py-1 text-[10px] font-black ${items[sel].tone.chip}`}>{items[sel].icon}</span>
          <span className="text-xs font-black text-slate-600">
            <Rich text={items[sel].note} />
          </span>
        </div>
      </div>
      <div className="mt-2 grid gap-2 text-center sm:grid-cols-2">
        <div className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">
          <Rich text={allOk} />
        </div>
        <div className="rounded-xl bg-amber-50 px-3 py-2 text-xs font-black text-amber-900">
          <Rich text={butDiff} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 25) معاني A / B / C / D (s20)
// ============================================================
function CompareMeaningsLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const [aLabel, aMean, bLabel, bMean, cLabel, cMean, dLabel, dMean] = lines;
  const intro = "اعرف المعنى المرتبط بكل حرف… ثم اربطه بالصورة.";
  const rows = [
    { label: aLabel, mean: aMean, icon: "📸", tone: EVENT },
    { label: bLabel, mean: bMean, icon: "🎥", tone: PROGRESS },
    { label: cLabel, mean: cMean, icon: "🎥 + 📸", tone: PROGRESS },
    { label: dLabel, mean: dMean, icon: "🎥 + 🎥", tone: PROGRESS },
  ];
  return (
    <LabPanel emoji="🧠" label="MEANING FIRST" ar="اختر الحرف… واعرف الصورة" seq="l26-compare-meanings">
      <div className="text-center text-xs font-black text-slate-600">
        <Rich text={intro} />
      </div>
      <div className="mt-3 grid gap-2">
        {rows.map((r, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`flex min-w-0 flex-wrap items-center gap-3 rounded-2xl border-2 p-3 text-right transition ${sel === i ? `${r.tone.soft} ring-2 ${r.tone.ring}` : "border-slate-200 bg-white"}`}
          >
            <span className="text-sm font-black text-slate-700">
              <Rich text={r.label} />
            </span>
            <span className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${r.tone.chip}`}>{r.icon}</span>
            <span className="min-w-0 flex-1 text-sm font-bold text-slate-700">
              <Rich text={r.mean} />
            </span>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        {sel === 0 && <TrackBar label={<En>watched</En>} color={EVENT.bar} width="16%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />}
        {sel === 1 && <TrackBar label={<En>was watching</En>} color={PROGRESS.bar} width="100%" marker={<span className="absolute -top-1 right-[42%] text-xs font-black text-white">9:00</span>} />}
        {sel === 2 && (
          <>
            <TrackBar label={<En>was watching</En>} color={PROGRESS.bar} width="100%" />
            <div className="mt-2">
              <TrackBar label={<En>called</En>} color={EVENT.bar} width="14%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />
            </div>
          </>
        )}
        {sel === 3 && (
          <>
            <TrackBar label={<En>was watching</En>} color={PROGRESS.bar} width="100%" />
            <div className="mt-2">
              <TrackBar label={<En>was reading</En>} color="bg-sky-400" width="100%" />
            </div>
          </>
        )}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 26) Error Detective — 5 أخطاء (s21) — كشف بعد التحقق
// ============================================================
function ErrorsDetectiveLab({ lines }: { lines: string[] }) {
  const [marks, setMarks] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const items = [
    { n: 1, head: lines[0], wrong: lines[1], reveal: lines.slice(2, 7) },
    { n: 2, head: lines[7], wrong: lines[8], reveal: lines.slice(9, 11) },
    { n: 3, head: lines[11], wrong: lines[12], reveal: lines.slice(13, 16) },
    { n: 4, head: lines[16], wrong: lines[17], reveal: lines.slice(18, 20) },
    { n: 5, head: lines[20], wrong: lines[21], reveal: lines.slice(22, 24) },
  ];
  const allMarked = marks.size === items.length;
  const reset = () => {
    setMarks(new Set());
    setChecked(false);
  };
  return (
    <div data-en-seq="l26-errors" data-exercise="l26-errors" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2">
        <span className="text-sm font-black text-rose-900">
          <Rich text="🕵️ حدّد الأخطاء الخمسة كلها ثم اضغط «تحقق من الإجابات»." />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-rose-700">
          {marks.size} / {items.length}
        </span>
      </div>
      {items.map((item) => {
        const marked = marks.has(item.n);
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-3 ${marked ? "border-rose-300 bg-white" : "border-slate-200 bg-white"}`}>
            <button
              type="button"
              onClick={() =>
                setMarks((s) => {
                  const next = new Set(s);
                  if (next.has(item.n)) next.delete(item.n);
                  else next.add(item.n);
                  return next;
                })
              }
              disabled={checked}
              aria-pressed={marked}
              className="flex w-full min-w-0 flex-wrap items-center gap-2 text-right disabled:cursor-default"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-rose-600 text-xs font-black text-white">{item.n}</span>
              <span className="text-sm font-black text-rose-800">
                <Rich text={`الخطأ ${item.n}`} />
              </span>
              <span className={`rounded-lg px-2 py-1 text-[10px] font-black ${marked ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                <Rich text={marked ? "وجدته" : "اضغط للتحديد"} />
              </span>
            </button>
            <div dir="ltr" className="ltr-row mt-2">
              <En className="block w-full rounded-xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-left text-sm font-black text-rose-800 line-through decoration-rose-300 md:text-base">
                {item.wrong}
              </En>
            </div>
            {checked && (
              <div data-reveal-block={`l26-errors-${item.n}`} className="mt-2 space-y-1.5">
                {item.reveal.map((line, i) => (
                  <LineRow key={i} text={line} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allMarked}
          title={allMarked ? undefined : "حدّد الأخطاء الخمسة أولًا"}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text="تحقق من الإجابات" />
        </button>
        {checked && (
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200"
          >
            <Rich text="↺ إعادة" />
          </button>
        )}
        {!checked && (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لن تظهر التصحيحات قبل التحقق." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 27) لوحة التحكم WAS / WERE (s22)
// ============================================================
function WasWereControlLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const look = lines[0];
  const subject = lines[1];
  const pairs = lines.slice(2, 9);
  const examplesTitle = lines[9];
  const examples = lines.slice(10, 16);
  const note1 = lines[16];
  const ingWord = lines[17];
  const ingNote = lines[18];
  const whoChanges = lines[19];
  const aux = lines[20];
  const pairOf = (i: number) => pairs[i].split("→").map((x) => x.trim());
  const chosen = pairOf(Math.min(sel, pairs.length - 1));
  const exampleFor = (p: string) => examples.find((e) => e.toLowerCase().startsWith(`${p.toLowerCase()} `)) ?? examples[0];
  return (
    <LabPanel emoji="🧠" label="WAS / WERE CONTROL PANEL" ar="الفاعل هو الذي يقرر" seq="l26-was-were">
      <div className="grid gap-1 text-center">
        <div className="text-sm font-black text-slate-700">
          <Rich text={look} />
        </div>
        <div className="text-sm font-black text-teal-800">
          <Rich text={subject} />
        </div>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {pairs.map((p, i) => {
          const [pronoun, verb] = pairOf(i);
          const active = sel === i;
          const isWas = verb === "was";
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={active}
              className={`flex min-w-0 items-center justify-between gap-2 rounded-2xl border-2 px-3 py-2 transition ${
                active ? (isWas ? "border-teal-300 bg-teal-50 ring-2 ring-teal-200" : "border-sky-300 bg-sky-50 ring-2 ring-sky-200") : "border-slate-200 bg-white"
              }`}
            >
              <En className="text-sm font-black text-slate-800">{pronoun}</En>
              <En className={`rounded-lg px-2.5 py-1 text-sm font-black ${isWas ? "bg-teal-600 text-white" : "bg-sky-600 text-white"}`}>{verb}</En>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3 text-center">
        <div className="text-xs font-black text-slate-600">
          <Rich text={`${chosen[0]} → ${chosen[1]}`} />
        </div>
        <En className="mt-2 block rounded-xl bg-slate-50 px-3 py-2 text-base font-black text-slate-900">
          {exampleFor(chosen[0])}
        </En>
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={examplesTitle} />
        </div>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {examples.map((e, i) => (
            <En key={i} className="block rounded-xl bg-sky-50 px-3 py-2 text-left text-sm font-black text-slate-900">
              {e}
            </En>
          ))}
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-center">
          <div className="text-xs font-black text-slate-600">
            <Rich text={note1} />
          </div>
          <En className="mt-1 block text-lg font-black text-teal-800">{ingWord}</En>
          <div className="mt-1 text-xs font-bold text-slate-600">
            <Rich text={ingNote} />
          </div>
        </div>
        <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center">
          <div className="text-xs font-black text-slate-600">
            <Rich text={whoChanges} />
          </div>
          <En className="mt-1 block text-lg font-black text-amber-900">{aux}</En>
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center text-xs font-black text-teal-900">
          <Rich text="القاعدة: the -ing verb never changes — the auxiliary does." />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 28) الأسماء مع Past Continuous (s23)
// ============================================================
function NounAgreementLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const intro = lines[0];
  const cards = [0, 1, 2, 3, 4].map((i) => ({ subject: lines[1 + i * 2], sentence: lines[2 + i * 2] }));
  const ruleTitle = lines[11];
  const singular = lines[12];
  const plural = lines[13];
  const exceptionIntro = lines[14];
  const exception = lines[15];
  const isWere = (s: string) => /were/.test(s);
  return (
    <LabPanel emoji="🔥" label="NOUN AGREEMENT LAB" ar="ليس فقط الضمائر" seq="l26-nouns">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-3 grid gap-2">
        {cards.map((c, i) => {
          const were = isWere(c.sentence);
          const active = sel === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={active}
              className={`flex min-w-0 flex-wrap items-center gap-3 rounded-2xl border-2 p-3 text-right transition ${
                active ? (were ? "border-sky-300 bg-sky-50 ring-2 ring-sky-200" : "border-teal-300 bg-teal-50 ring-2 ring-teal-200") : "border-slate-200 bg-white"
              }`}
            >
              <En className="rounded-lg bg-slate-900 px-2 py-1 text-xs font-black text-white">{c.subject}</En>
              <En className="min-w-0 flex-1 text-left text-sm font-black text-slate-900 md:text-base">{c.sentence}</En>
              <En className={`rounded-lg px-2 py-1 text-[11px] font-black ${were ? "bg-sky-600 text-white" : "bg-teal-600 text-white"}`}>
                {were ? "were" : "was"}
              </En>
            </button>
          );
        })}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={ruleTitle} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-teal-50 px-3 py-2 text-center text-sm font-black text-teal-900">
            <Rich text={singular} />
          </div>
          <div className="rounded-xl bg-sky-50 px-3 py-2 text-center text-sm font-black text-sky-900">
            <Rich text={plural} />
          </div>
        </div>
        <div className="mt-2 text-center text-xs font-black text-slate-600">
          <Rich text={exceptionIntro} />
        </div>
        <div className="mt-1 text-center">
          <span className="rounded-xl bg-amber-100 px-3 py-1.5 text-sm font-black text-amber-900">
            <Rich text={exception} />
          </span>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 29) Time Expressions (s24)
// ============================================================
function TimeExpressionsLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const intro = lines[0];
  const clues = lines.slice(1, 11);
  const warn = lines[11];
  return (
    <LabPanel emoji="⭐" label="TIME EXPRESSIONS" ar="عبارات مفيدة جدًا" seq="l26-time-expressions">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div dir="ltr" className="ltr-row mt-3 flex flex-wrap justify-center gap-2">
        {clues.map((clue, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`rounded-xl px-3 py-2 text-xs font-black transition ${sel === i ? "bg-teal-600 text-white shadow" : "border-2 border-teal-200 bg-white text-teal-900"}`}
          >
            <En>{clue}</En>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
        <div className="text-sm font-black text-amber-900">
          <Rich text={warn} />
        </div>
        <div className="mt-1 text-xs font-bold text-amber-800">
          <Rich text="العبارة تلميح… لا زرّ سحري." />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 30) العبارات ليست قوانين آلية (s24)
// ============================================================
function TimeNotRulesLab({ lines }: { lines: string[] }) {
  const [side, setSide] = useState<"simple" | "cont">("simple");
  const [example, pivot, canSimple, exSimple, canCont, exCont, so, context] = lines;
  return (
    <LabPanel emoji="⚠️" label="CLUE, NOT AUTOMATIC RULE" ar="السياق أهم من الكلمة" seq="l26-time-not-rules">
      <div className="text-center text-sm font-black text-slate-600">
        <Rich text={example} />
      </div>
      <div className="mt-2 flex justify-center">
        <span className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white">
          <En>{pivot}</En>
        </span>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setSide("simple")}
          aria-pressed={side === "simple"}
          className={`rounded-xl px-3 py-2 text-xs font-black ${side === "simple" ? EVENT.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <Rich text={canSimple} />
        </button>
        <button
          type="button"
          onClick={() => setSide("cont")}
          aria-pressed={side === "cont"}
          className={`rounded-xl px-3 py-2 text-xs font-black ${side === "cont" ? PROGRESS.chip : "border-2 border-slate-200 bg-white text-slate-600"}`}
        >
          <Rich text={canCont} />
        </button>
      </div>
      <div className={`mt-3 rounded-3xl border-2 p-4 ${side === "simple" ? EVENT.soft : PROGRESS.soft}`}>
        <En className="block text-center text-sm font-black text-slate-900 md:text-base">{side === "simple" ? exSimple : exCont}</En>
        <div className="mt-2 space-y-1.5">
          {side === "simple" ? (
            <TrackBar label={<En>visited</En>} color={EVENT.bar} width="16%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />
          ) : (
            <TrackBar label={<En>was visiting</En>} color={PROGRESS.bar} width="100%" marker={<span className="absolute -top-1 right-[38%] text-[10px] font-black text-white">5:00</span>} />
          )}
        </div>
      </div>
      <div className="mt-2 rounded-2xl bg-white px-3 py-2 text-center">
        <div className="text-xs font-black text-slate-600">
          <Rich text={so} />
        </div>
        <div className="mt-1 text-sm font-black text-teal-800">
          <Rich text={context} />
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 31) تحدي «المعنى أولًا» (s25) — كشف بعد التحقق
// ============================================================
type MeaningItem = { n: string; sentence: string; options: string[]; correct: number; reveal: string[] };

function MeaningFirstLab({ lines }: { lines: string[] }) {
  const intro = lines[0];
  const items: MeaningItem[] = [
    { n: lines[1], sentence: lines[2], options: [lines[3], lines[4]], correct: 1, reveal: lines.slice(5, 8) },
    { n: lines[8], sentence: lines[9], options: [lines[10], lines[11]], correct: 0, reveal: lines.slice(12, 14) },
    { n: lines[14], sentence: lines[15], options: [lines[16], lines[17]], correct: 1, reveal: lines.slice(18, 21) },
    { n: lines[21], sentence: lines[22], options: [lines[23], lines[24]], correct: 0, reveal: lines.slice(25, 28) },
  ];
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = items.filter((_it, i) => picks[i] !== undefined).length;
  const allAnswered = answered === items.length;
  const reset = () => {
    setPicks({});
    setChecked(false);
  };
  const score = items.reduce((n, it, i) => n + (picks[i] === it.correct ? 1 : 0), 0);
  return (
    <div data-en-seq="l26-meaning-first" data-exercise="l26-meaning-first" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-teal-200 bg-teal-50 px-3 py-2">
        <span className="text-sm font-black text-teal-900">
          <Rich text={intro} />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-teal-700">
          {answered} / {items.length}
        </span>
      </div>
      {items.map((item, i) => {
        const pick = picks[i];
        const picked = pick !== undefined;
        const right = picked && pick === item.correct;
        const card = checked ? (!picked ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60") : picked ? "border-slate-300 bg-slate-50/70" : "border-slate-200 bg-white";
        return (
          <div key={i} className={`rounded-3xl border-2 p-3 transition ${card}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-teal-700 text-xs font-black text-white">
                <En>{item.n}</En>
              </span>
              <En className="min-w-0 flex-1 text-left text-sm font-black text-slate-900 md:text-base">{item.sentence}</En>
            </div>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-end gap-2">
              {item.options.map((opt, oi) => {
                const isPick = pick === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-teal-400";
                if (checked) {
                  if (oi === item.correct) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-3 py-2 text-xs font-black transition disabled:cursor-default md:text-sm ${cls}`}
                  >
                    <En>{opt}</En>
                  </button>
                );
              })}
            </div>
            {checked && (
              <div data-reveal-block={`l26-meaning-${i + 1}`} className="mt-2 space-y-1.5 text-right">
                {!picked && (
                  <div className="text-xs font-black text-slate-500">
                    <Rich text="⚠ لم تختر إجابة لهذا السؤال." />
                  </div>
                )}
                {right && (
                  <div className="text-xs font-black text-emerald-700">
                    <Rich text="✓ صحيح!" />
                  </div>
                )}
                {item.reveal.map((line, li) => (
                  <LineRow key={li} text={line} tone={li === item.reveal.length - 1 ? "warn" : undefined} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "اختر لكل الجمل أولًا"}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${answered}/${items.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-teal-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${items.length}`} />
            </span>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="الأجوبة والتفسيرات تظهر بعد التحقق فقط." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 32) IQ200 Challenge — متى نختار كل واحدة؟ (s29)
// ============================================================
function Iq200MatchLab({ lines }: { lines: string[] }) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const intro = lines[0];
  const aKey = lines[1];
  const aSentence = lines[2];
  const bKey = lines[3];
  const bSentence = lines[4];
  const both = lines[5];
  const nowQ = lines[6];
  const whenQ = lines[7];
  const m1Key = lines[8];
  const m1 = lines[9];
  const m2Key = lines[10];
  const m2 = lines[11];
  const skill = lines[12];
  const meanings = [
    { key: m1Key, text: m1 },
    { key: m2Key, text: m2 },
  ];
  const rows = [
    { key: aKey, sentence: aSentence, expected: "m1" },
    { key: bKey, sentence: bSentence, expected: "m2" },
  ];
  const answered = rows.filter((r) => picks[r.key] !== undefined).length;
  const allAnswered = answered === rows.length;
  const reset = () => {
    setPicks({});
    setChecked(false);
  };
  const whyFor = (key: string) => IQ200_MATCH_26.why[key as "A" | "B"];
  return (
    <div data-en-seq="l26-iq200" data-exercise="l26-iq200" className="space-y-3">
      <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 px-3 py-2 text-center text-sm font-black text-sky-900">
        <Rich text={intro} />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.key} className="min-w-0 rounded-3xl border-2 border-slate-200 bg-white p-3">
            <div className="flex flex-wrap items-center gap-2">
              <En className="rounded-lg bg-slate-900 px-2 py-0.5 text-xs font-black text-white">{r.key}</En>
              <En className="min-w-0 flex-1 text-left text-sm font-black text-slate-900">{r.sentence}</En>
            </div>
            <div className="mt-2 space-y-1.5">
              {meanings.map((m) => {
                const isPick = picks[r.key] === m.key;
                let cls = "border-slate-200 bg-white text-slate-700";
                if (checked) {
                  if (m.key === r.expected) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setPicks((p) => ({ ...p, [r.key]: m.key }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`w-full min-w-0 rounded-xl border-2 px-3 py-2 text-right text-xs font-bold transition disabled:cursor-default md:text-sm ${cls}`}
                  >
                    <Rich text={m.text} />
                  </button>
                );
              })}
            </div>
            {checked && (
              <div data-reveal-block={`l26-iq200-${r.key}`} className="mt-2 rounded-xl bg-teal-50 px-3 py-2 text-xs font-bold text-teal-900">
                <Rich text={picks[r.key] === r.expected ? `✓ ${whyFor(r.key)}` : `✕ ${whyFor(r.key)}`} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-white bg-white p-3">
        <div className="text-center text-sm font-black text-slate-700">
          <Rich text={both} />
        </div>
        <div className="mt-1 text-center text-xs font-black text-slate-600">
          <Rich text={nowQ} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sky-900">
            <EnAr en={<En className="font-black">{m1Key}</En>} ar={<Rich text={m1} />} />
          </div>
          <div className="rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sky-900">
            <EnAr en={<En className="font-black">{m2Key}</En>} ar={<Rich text={m2} />} />
          </div>
        </div>
        <div className="mt-2 text-center text-xs font-black text-slate-500">
          <Rich text={whenQ} />
        </div>
        <div className="mt-2 text-center text-sm font-black text-teal-800">
          <Rich text={skill} />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "اختر معنى لكل جملة أولًا"}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${answered}/${rows.length})`} />
        </button>
        {checked ? (
          <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
            <Rich text="↺ إعادة" />
          </button>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="المطابقة الكاملة تظهر بعد التحقق." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 33) IQ200 — هل الجملتان صحيحتان؟ (s30) — كشف بعد التحقق
// ============================================================
function Iq200BothLab({ lines }: { lines: string[] }) {
  const [pick, setPick] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const visible = lines.slice(0, 5);
  const reveal = lines.slice(5);
  const reset = () => {
    setPick(null);
    setChecked(false);
  };
  const correct = IQ200_BOTH_26.answer;
  return (
    <div data-en-seq="l26-iq200-both" data-exercise="l26-iq200-both" className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex min-w-0 items-center gap-2 rounded-3xl border-2 border-slate-200 bg-white p-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-900 text-xs font-black text-white">
              <En>{visible[i * 2]}</En>
            </span>
            <En className="min-w-0 flex-1 text-left text-sm font-black text-slate-900 md:text-base">{visible[i * 2 + 1]}</En>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 px-3 py-2 text-center text-sm font-black text-teal-900">
        <Rich text={visible[4]} />
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {IQ200_BOTH_26.options.map((opt, i) => {
          const isPick = pick === i;
          let cls = "border-slate-200 bg-white text-slate-700";
          if (checked) {
            if (i === correct) cls = "border-transparent bg-emerald-600 text-white";
            else if (isPick) cls = "border-transparent bg-rose-600 text-white";
            else cls = "border-slate-200 bg-white text-slate-400";
          } else if (isPick) {
            cls = "border-transparent bg-slate-900 text-white";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => setPick(i)}
              disabled={checked}
              aria-pressed={isPick}
              className={`min-w-0 rounded-2xl border-2 px-3 py-2.5 text-xs font-black transition disabled:cursor-default md:text-sm ${cls}`}
            >
              <Rich text={opt} />
            </button>
          );
        })}
      </div>
      {checked && (
        <div data-reveal-block="l26-iq200-both" className="space-y-1.5 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          {reveal.map((line, i) => (
            <LineRow key={i} text={line} tone={i === 0 ? "good" : undefined} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || pick === null}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text="تحقق من الإجابات" />
        </button>
        {checked ? (
          <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
            <Rich text="↺ إعادة" />
          </button>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لن تظهر التفسيرات قبل التحقق." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 34) طبقات القصة النموذجية (s31)
// ============================================================
function StoryLayersLab({ lines }: { lines: string[] }) {
  const [layer, setLayer] = useState<"all" | "bg" | "ev">("all");
  const title = lines[0];
  const note = lines[1];
  const story = lines[2];
  const notice = lines[3];
  const bgLabel = lines[4];
  const bgVerbs = lines.slice(5, 8);
  const evLabel = lines[8];
  const evVerbs = lines.slice(9, 16);
  const sentences = story.split(/(?<=[.!?])\s+/);
  const isBgSentence = (s: string) => /was |were /.test(s);
  return (
    <LabPanel emoji="🎬" label="MODEL STORY DIRECTOR" ar="نموذج للبناء — لا للحفظ" seq="l26-story-layers">
      <div className="text-center text-base font-black text-slate-700">
        <Rich text={title} />
      </div>
      <div className="text-center text-xs font-black text-amber-900">
        <Rich text={note} />
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {[
          { key: "all" as const, label: "🎬 القصة كاملة" },
          { key: "bg" as const, label: "🎥 الخلفية" },
          { key: "ev" as const, label: "📸 الأحداث" },
        ].map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => setLayer(b.key)}
            aria-pressed={layer === b.key}
            className={`rounded-xl px-3 py-1.5 text-xs font-black ${layer === b.key ? "bg-teal-700 text-white" : "border-2 border-slate-200 bg-white text-slate-600"}`}
          >
            <Rich text={b.label} />
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-1.5">
        {sentences.map((s, i) => {
          const bg = isBgSentence(s);
          const dim = (layer === "bg" && !bg) || (layer === "ev" && bg);
          return (
            <div key={i} className={`rounded-xl border-2 px-3 py-2 transition ${bg ? "border-teal-200 bg-teal-50" : "border-orange-200 bg-orange-50"} ${dim ? "opacity-35" : ""}`}>
              <En className="block text-left text-xs font-black text-slate-900 md:text-sm">{s}</En>
            </div>
          );
        })}
      </div>
      <div className="mt-3 text-center text-xs font-black text-slate-600">
        <Rich text={notice} />
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <div className={`rounded-2xl border-2 p-3 ${PROGRESS.soft}`}>
          <div className="text-center text-[11px] font-black text-slate-600">
            <Rich text={bgLabel} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {bgVerbs.map((v, i) => (
              <En key={i} className="rounded-lg bg-teal-600 px-2 py-1 text-xs font-black text-white">
                {v}
              </En>
            ))}
          </div>
        </div>
        <div className={`rounded-2xl border-2 p-3 ${EVENT.soft}`}>
          <div className="text-center text-[11px] font-black text-slate-600">
            <Rich text={evLabel} />
          </div>
          <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-center gap-1.5">
            {evVerbs.map((v, i) => (
              <En key={i} className="rounded-lg bg-orange-500 px-2 py-1 text-xs font-black text-white">
                {v}
              </En>
            ))}
          </div>
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 35) MASTER MAP
// ============================================================
function MasterMapLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const intro = lines[0];
  const layout: [number, number][] = [[1, 3], [6, 3], [11, 1], [14, 1]];
  const cards = layout.map(([start, count]) => ({
    title: lines[start],
    meaning: lines[start + 1],
    examples: lines.slice(start + 2, start + 2 + count),
  }));
  const tones = [EVENT, PROGRESS, PROGRESS, PROGRESS];
  const icons = ["📸", "🎥", "🎥 + 📸", "🎥 + 🎥"];
  return (
    <LabPanel emoji="🧠" label="MASTER MAP" ar="احفظ هذه الخريطة" seq="l26-master-map">
      <div className="text-center text-sm font-black text-slate-700">
        <Rich text={intro} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`min-w-0 rounded-3xl border-2 p-3 text-right transition ${sel === i ? `${tones[i].soft} ring-2 ${tones[i].ring}` : "border-slate-200 bg-white"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <En className="text-sm font-black text-slate-800">{c.title}</En>
              <span className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${tones[i].chip}`}>{icons[i]}</span>
            </div>
            <div className="mt-2 text-xs font-bold text-slate-600">
              <Rich text={c.meaning} />
            </div>
            <div className="mt-2 grid gap-1">
              {c.examples.map((ex, ei) => (
                <En key={ei} className="block rounded-lg bg-slate-50 px-2.5 py-1.5 text-left text-xs font-black text-slate-900">
                  {ex}
                </En>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border-2 border-white bg-white p-3">
        <En className="block text-center text-sm font-black text-slate-900">{cards[sel].title}</En>
        <div className="mt-2 space-y-1.5">
          {sel === 0 && <TrackBar label={<En>{cards[0].examples[0]}</En>} color={EVENT.bar} width="16%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />}
          {sel === 1 && <TrackBar label={<En>{cards[1].examples[0]}</En>} color={PROGRESS.bar} width="100%" marker={<span className="absolute -top-1 right-[42%] text-[10px] font-black text-white">8:00</span>} />}
          {sel === 2 && (
            <>
              <TrackBar label={<En>was studying</En>} color={PROGRESS.bar} width="100%" />
              <TrackBar label={<En>called</En>} color={EVENT.bar} width="14%" marker={<span className="absolute -top-1 right-[80%] text-lg" aria-hidden>📸</span>} />
            </>
          )}
          {sel === 3 && (
            <>
              <TrackBar label={<En>was studying</En>} color={PROGRESS.bar} width="100%" />
              <TrackBar label={<En>was playing</En>} color="bg-sky-400" width="100%" />
            </>
          )}
        </div>
      </div>
    </LabPanel>
  );
}

// ============================================================
// 36) القاعدة الذهبية (golden rule)
// ============================================================
function GoldenRuleLab({ lines }: { lines: string[] }) {
  const [sel, setSel] = useState(0);
  const noAsk1 = lines[0];
  const q1 = lines[1];
  const noAsk2 = lines[2];
  const q2 = lines[3];
  const ask = lines[4];
  const picture = lines[5];
  const rows = [
    { icon: "📸", question: lines[6], answer: lines[7], tone: EVENT },
    { icon: "🎥", question: lines[8], answer: lines[9], tone: PROGRESS },
    { icon: "🎥 + 📸", badge: lines[10], question: lines[11], answer: lines[12], tone: PROGRESS },
    { icon: "🎥 + 🎥", badge: lines[13], question: lines[14], answer: lines[15], tone: PROGRESS },
  ];
  return (
    <LabPanel emoji="🔥" label="GOLDEN RULE" ar="لا تسأل عن الكلمة… اسأل عن الصورة" seq="l26-golden-rule">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-center">
          <div className="text-xs font-black text-slate-500 line-through">
            <Rich text={q1} />
          </div>
          <div className="mt-1 text-xs font-black text-slate-600">
            <Rich text={noAsk1} />
          </div>
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-center">
          <div className="text-xs font-black text-slate-500 line-through">
            <Rich text={q2} />
          </div>
          <div className="mt-1 text-xs font-black text-slate-600">
            <Rich text={noAsk2} />
          </div>
        </div>
      </div>
      <div className="mt-3 rounded-3xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
        <div className="text-xs font-black text-amber-900">
          <Rich text={ask} />
        </div>
        <div className="mt-1 text-lg font-black text-slate-900 md:text-xl">
          <Rich text={picture} />
        </div>
      </div>
      <div className="mt-3 grid gap-2">
        {rows.map((r, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSel(i)}
            aria-pressed={sel === i}
            className={`flex min-w-0 flex-wrap items-center gap-2 rounded-2xl border-2 p-3 text-right transition ${sel === i ? `${r.tone.soft} ring-2 ${r.tone.ring}` : "border-slate-200 bg-white"}`}
          >
            <span className={`rounded-lg px-2 py-1 text-[11px] font-black ${r.tone.chip}`}>{r.icon}</span>
            <span className="min-w-0 flex-1 text-xs font-bold text-slate-700 md:text-sm">
              {r.badge && <Rich text={`${r.badge} · `} />}
              <Rich text={r.question} />
            </span>
            <En className="rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-black text-white">{r.answer}</En>
          </button>
        ))}
      </div>
    </LabPanel>
  );
}

// ============================================================
// 37) FINAL CHECK — 6 دعوات إنتاج حر
// ============================================================
function FinalCheckLab({ lines }: { lines: string[] }) {
  const intro = lines[0];
  const prompts = lines.slice(1, 7);
  const [values, setValues] = useState<Record<number, string[]>>(() =>
    prompts.reduce<Record<number, string[]>>((acc, p, i) => {
      acc[i] = p.split("__________").slice(1).map(() => "");
      return acc;
    }, {})
  );
  const filled = Object.values(values).flat().filter((v) => v.trim().length > 0).length;
  const totalInputs = prompts.reduce((n, p) => n + (p.split("__________").length - 1), 0);
  const reset = () => setValues(prompts.reduce<Record<number, string[]>>((acc, p, i) => {
    acc[i] = p.split("__________").slice(1).map(() => "");
    return acc;
  }, {}));
  return (
    <div data-en-seq="l26-final-check" className="space-y-3">
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-2 text-center text-sm font-black text-amber-900">
        <Rich text={intro} />
      </div>
      {prompts.map((prompt, i) => {
        const parts = prompt.split("__________");
        return (
          <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-1.5">
              <En className="text-sm font-black text-slate-900 md:text-base">{parts[0]}</En>
              {parts.slice(1).map((tail, ti) => (
                <span key={ti} className="flex flex-wrap items-center gap-1.5">
                  <input
                    dir="ltr"
                    value={values[i]?.[ti] ?? ""}
                    onChange={(event) =>
                      setValues((v) => {
                        const next = [...(v[i] ?? [])];
                        next[ti] = event.target.value;
                        return { ...v, [i]: next };
                      })
                    }
                    placeholder="…"
                    aria-label={`إجابة ${i + 1}.${ti + 1}`}
                    className="font-en w-32 rounded-lg border-2 border-teal-200 bg-teal-50/40 px-2 py-1.5 text-left text-xs font-black text-slate-900 outline-none focus:border-teal-500 sm:w-44 md:text-sm"
                  />
                  <En className="text-sm font-black text-slate-900 md:text-base">{tail}</En>
                </span>
              ))}
            </div>
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <span className="rounded-full bg-teal-700 px-3 py-1.5 text-xs font-black text-white">
          <Rich text={`جمل مكتملة جزئيًا: ${filled} / ${totalInputs}`} />
        </span>
        <span className="text-xs font-bold text-slate-500">
          <Rich text="اكتب إجاباتك بحرية — ثم أعد المحاولة بصيغة مختلفة." />
        </span>
        <button
          type="button"
          onClick={reset}
          className="mr-auto rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-200"
        >
          <Rich text="↺ إعادة" />
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Exercise 26 — Choose (8 أسئلة)
// ============================================================
function Ex26Choose() {
  const intro = SOURCE_SECTIONS[SEC.s26].units[0];
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const answered = EX26_ITEMS.filter((it) => picks[it.n] !== undefined).length;
  const allAnswered = answered === EX26_ITEMS.length;
  const score = EX26_ITEMS.reduce((n, it) => n + (picks[it.n] === it.answer ? 1 : 0), 0);
  const reset = () => {
    setPicks({});
    setChecked(false);
  };
  return (
    <div data-en-seq="l26-ex-choose" data-exercise="l26-choose" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-sky-200 bg-sky-50 px-3 py-2">
        <span className="text-sm font-black text-sky-900">
          <Rich text={intro} />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-sky-700">
          {answered} / {EX26_ITEMS.length}
        </span>
      </div>
      {EX26_ITEMS.map((item) => {
        const pick = picks[item.n];
        const picked = pick !== undefined;
        const right = picked && pick === item.answer;
        const card = checked
          ? !picked
            ? "border-slate-200 bg-white"
            : right
              ? "border-emerald-300 bg-emerald-50/60"
              : "border-rose-300 bg-rose-50/60"
          : picked
            ? "border-slate-300 bg-slate-50/70"
            : "border-slate-200 bg-white";
        const stemParts = item.stem.split("______");
        return (
          <div key={item.n} className={`rounded-3xl border-2 p-3 transition ${card}`}>
            <div className="flex flex-wrap items-start gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sky-700 text-xs font-black text-white">{item.n}</span>
              <div dir="ltr" className="ltr-row min-w-0 flex-1">
                <En className="text-left text-sm font-black text-slate-900 md:text-base">
                  {stemParts[0]}
                  <span className="mx-1 rounded bg-slate-200 px-2 text-slate-400">______</span>
                  {stemParts[1]}
                </En>
              </div>
            </div>
            <div dir="ltr" className="ltr-row mt-2 flex flex-wrap justify-end gap-2">
              {item.opts.map((opt, oi) => {
                const isPick = pick === oi;
                let cls = "border-slate-200 bg-white text-slate-700 hover:border-sky-400";
                if (checked) {
                  if (oi === item.answer) cls = "border-transparent bg-emerald-600 text-white";
                  else if (isPick) cls = "border-transparent bg-rose-600 text-white";
                  else cls = "border-slate-200 bg-white text-slate-300";
                } else if (isPick) {
                  cls = "border-transparent bg-slate-900 text-white";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicks((p) => ({ ...p, [item.n]: oi }))}
                    disabled={checked}
                    aria-pressed={isPick}
                    className={`rounded-xl border-2 px-4 py-2 font-en text-sm font-black transition disabled:cursor-default ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 text-xs font-bold text-slate-600 md:text-sm">
                <Rich text={!picked ? "⚠ لم تختر إجابة لهذا السؤال." : right ? `✓ صحيح! ${item.why}` : `✕ ${item.why}`} />
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allAnswered}
          title={allAnswered ? undefined : "أجب عن كل الأسئلة أولًا"}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${answered}/${EX26_ITEMS.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-teal-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${EX26_ITEMS.length}`} />
            </span>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="لا يظهر أي تصحيح قبل الضغط على الزر." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Exercise 27 — Complete the Story
// ============================================================
function CompleteStory() {
  const instruction = SOURCE_SECTIONS[SEC.s27].units[0];
  const note = COMPLETE_STORY_26_NOTE;
  const blanks = COMPLETE_STORY_26.filter((p): p is { blank: true; verb: string; answer: string } => "blank" in p);
  const [values, setValues] = useState<string[]>(() => blanks.map(() => ""));
  const [checked, setChecked] = useState(false);
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  const score = blanks.reduce((n, b, i) => n + (norm(values[i]) === norm(b.answer) ? 1 : 0), 0);
  const filled = values.filter((v) => v.trim().length > 0).length;
  const reset = () => {
    setValues(blanks.map(() => ""));
    setChecked(false);
  };
  let blankIndex = -1;
  return (
    <div data-en-seq="l26-ex-story" data-exercise="l26-complete-story" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-2">
        <span className="text-sm font-black text-amber-900">
          <Rich text={instruction} />
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-amber-700">
          {filled} / {blanks.length}
        </span>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-3">
        <div dir="rtl" className="font-en text-base leading-[2.4] text-slate-800 md:text-lg">
          {COMPLETE_STORY_26.map((part, i) => {
            if ("br" in part) return <div key={i} className="h-3" />;
            if ("blank" in part) {
              blankIndex += 1;
              const idx = blankIndex;
              const ok = checked && norm(values[idx]) === norm(part.answer);
              const bad = checked && !ok;
              return (
                <span key={i} dir="ltr" className="ltr-row mx-1 inline-flex flex-wrap items-center gap-1 align-middle">
                  <input
                    dir="ltr"
                    value={values[idx]}
                    onChange={(event) =>
                      setValues((v) => {
                        const next = [...v];
                        next[idx] = event.target.value;
                        return next;
                      })
                    }
                    disabled={checked}
                    aria-label={`blank ${idx + 1}`}
                    className={`font-en w-32 rounded-lg border-2 px-2 py-1 text-center text-sm font-black outline-none sm:w-40 ${
                      ok ? "border-emerald-400 bg-emerald-50 text-emerald-800" : bad ? "border-rose-400 bg-rose-50 text-rose-800" : "border-teal-200 bg-teal-50/40 text-slate-900 focus:border-teal-500"
                    }`}
                  />
                  <En className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-black text-slate-600">({part.verb})</En>
                  {bad && (
                    <span data-reveal-block={`l26-story-${idx + 1}`} className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-black text-emerald-700">
                      <En>{part.answer}</En>
                    </span>
                  )}
                </span>
              );
            }
            return (
              <span key={i}>
                <LatinRuns text={part.text} />
              </span>
            );
          })}
        </div>
      </div>
      <div className="rounded-2xl border-2 border-white bg-sky-50 px-3 py-2 text-center text-xs font-black text-sky-900">
        <Rich text={note} />
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || filled !== blanks.length}
          title={filled === blanks.length ? undefined : "أكمل كل الفراغات أولًا"}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من القصة (${filled}/${blanks.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-teal-700 px-3 py-2 text-sm font-black text-white">
              <Rich text={`${score} / ${blanks.length}`} />
            </span>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="التصحيح الكامل يظهر بعد التحقق." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Exercise 28 — Grammar Detective
// ============================================================
function GrammarDetective() {
  const [intro, paragraph, many, discover, hint, hintEn1, and, hintEn2] = SOURCE_SECTIONS[SEC.s28].units;
  const [marks, setMarks] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const errors = DETECTIVE_26_PARTS.map((p, i) => (p.error ? i : -1)).filter((i) => i >= 0);
  const allMarked = marks.size === errors.length;
  const score = errors.reduce((n, i) => n + (marks.has(i) ? 1 : 0), 0);
  const wrongMarks = [...marks].filter((i) => !DETECTIVE_26_PARTS[i].error).length;
  const reset = () => {
    setMarks(new Set());
    setChecked(false);
  };
  return (
    <div data-en-seq="l26-detective" data-exercise="l26-detective" className="space-y-3">
      <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 px-3 py-2 text-center text-sm font-black text-violet-900">
        <Rich text={intro} />
      </div>
      <div
        dir="ltr"
        className="ltr-row rounded-3xl border-2 border-slate-200 bg-white p-3 text-left text-base font-bold leading-[2.1] text-slate-800 md:text-lg"
      >
        {DETECTIVE_26_PARTS.map((part, i) => {
          const marked = marks.has(i);
          const isErr = Boolean(part.error);
          let cls = "text-slate-800 hover:bg-violet-50";
          if (checked) {
            if (isErr && marked) cls = "bg-emerald-100 text-emerald-900";
            else if (isErr) cls = "bg-amber-100 text-amber-900";
            else if (marked) cls = "bg-rose-100 text-rose-800";
          } else if (marked) {
            cls = "bg-violet-100 text-violet-900";
          } else if (isErr) {
            cls = "text-slate-800 hover:bg-violet-50"; // قبل التصحيح: الجزء الخاطئ غير المحدَّد يجب أن يطابق الصحيح تمامًا — اللون الوردي كان يكشف الإجابة
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() =>
                setMarks((s) => {
                  const next = new Set(s);
                  if (next.has(i)) next.delete(i);
                  else next.add(i);
                  return next;
                })
              }
              disabled={checked}
              aria-pressed={marked}
              className={`font-en inline rounded-lg px-1 py-0.5 text-left text-base font-extrabold transition disabled:cursor-default md:text-lg ${cls}`}
            >
              {part.text}
            </button>
          );
        })}
      </div>
      <div className="grid gap-2 text-center sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-3 py-2 text-xs font-black text-rose-900">
          <Rich text={many} />
        </div>
        <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 px-3 py-2 text-xs font-black text-violet-900">
          <Rich text={discover} />
        </div>
        <div className="rounded-2xl border-2 border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">
          <Rich text={hint} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <En className="rounded-xl bg-teal-600 px-3 py-1.5 text-xs font-black text-white">{hintEn1}</En>
        <Rich text={and} className="self-center text-xs font-black text-slate-500" />
        <En className="rounded-xl bg-orange-500 px-3 py-1.5 text-xs font-black text-white">{hintEn2}</En>
      </div>
      {checked && (
        <div data-reveal-block="l26-detective-fixes" className="space-y-2 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-3">
          {DETECTIVE_26_PARTS.filter((p) => p.error).map((p, i) => (
            <div key={i} className="rounded-2xl border-2 border-white bg-white p-3">
              <div dir="ltr" className="ltr-row">
                <En className="block text-left text-sm font-black text-rose-700 line-through">{p.text}</En>
              </div>
              <div dir="ltr" className="ltr-row mt-1">
                <En className="block text-left text-sm font-black text-emerald-700">{p.fix}</En>
              </div>
              <div className="mt-1 text-xs font-bold text-slate-600">
                <Rich text={p.why ?? ""} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
        <button
          type="button"
          onClick={() => setChecked(true)}
          disabled={checked || !allMarked}
          title={allMarked ? undefined : "حدّد كل المقاطع الخطأ أولًا"}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-black text-white transition enabled:hover:bg-teal-800 disabled:opacity-30"
        >
          <Rich text={`تحقق من الإجابات (${marks.size}/${errors.length})`} />
        </button>
        {checked ? (
          <>
            <span className="rounded-xl bg-teal-700 px-3 py-2 text-xs font-black text-white">
              <Rich text={`أصبت ${score} / ${errors.length}${wrongMarks ? ` · تحديدات خاطئة: ${wrongMarks}` : ""}`} />
            </span>
            <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-black text-slate-600 transition hover:bg-slate-200">
              <Rich text="↺ إعادة" />
            </button>
          </>
        ) : (
          <span className="text-xs font-bold text-slate-500">
            <Rich text="التصحيحات تظهر بعد التحقق فقط." />
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Exercise 31 — FINAL BOSS: Build the Movie
// ============================================================
function FinalBoss() {
  const [text, setText] = useState("");
  const [done, setDone] = useState<Set<number>>(new Set());
  const sentences = (text.match(/[.?!]+/g) || []).length;
  const pastCont = (text.match(/\b(was|were)\b\s+\w+ing/gi) || []).length;
  const pastSimpleVerbs = (
    text.match(
      /\b(woke|walked|stopped|looked|heard|ran|started|saw|called|rang|came|stood|turned|stepped|dropped|picked|opened|went|watched|met|found|arrived|knocked|began|took|felt|noticed|realized)\b/gi
    ) || []
  ).length;
  const hasWhen = /\bwhen\b/i.test(text);
  const hasWhile = /\bwhile\b/i.test(text);
  const checks = [
    { label: "عدد الجمل 10–12", pass: sentences >= 10 && sentences <= 12, value: `${sentences}` },
    { label: "Past Continuous ≥ 4", pass: pastCont >= 4, value: `${pastCont}` },
    { label: "Past Simple verbs ≥ 5", pass: pastSimpleVerbs >= 5, value: `${pastSimpleVerbs}` },
    { label: "when", pass: hasWhen, value: hasWhen ? "✓" : "✕" },
    { label: "while", pass: hasWhile, value: hasWhile ? "✓" : "✕" },
  ];
  const scene = FINAL_BOSS_26_SCENE;
  return (
    <div data-en-seq="l26-final-boss" data-exercise="l26-final-boss" className="space-y-3">
      <div className="rounded-3xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-3">
        <div className="text-center text-sm font-black text-orange-900">
          <Rich text={SOURCE_SECTIONS[SEC.s31].units[0]} />
        </div>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {scene.map((line, i) => (
            <div key={i} className="rounded-xl border-2 border-white bg-white px-3 py-2 text-center text-xs font-black text-slate-700 md:text-sm">
              <Rich text={`${i + 1}. ${line}`} />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-2xl bg-white px-3 py-2 text-center text-sm font-black text-slate-800">
          <Rich text={SOURCE_SECTIONS[SEC.s31].units[8]} />
        </div>
        <div className="mt-2 text-center text-xs font-black text-slate-600">
          <Rich text={SOURCE_SECTIONS[SEC.s31].units[9]} />
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {FINAL_BOSS_26_REQUIREMENTS.map((req, i) => {
            const on = done.has(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  setDone((s) => {
                    const next = new Set(s);
                    if (next.has(i)) next.delete(i);
                    else next.add(i);
                    return next;
                  })
                }
                aria-pressed={on}
                className={`flex min-w-0 items-center gap-2 rounded-2xl border-2 px-3 py-2 text-right transition ${on ? "border-emerald-400 bg-emerald-50" : "border-slate-200 bg-white"}`}
              >
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black ${on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {on ? "✓" : ""}
                </span>
                <span className="min-w-0 flex-1 text-xs font-bold text-slate-700">
                  <Rich text={req.unit} />
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-2 rounded-xl bg-white px-3 py-2 text-center text-xs font-black text-slate-500">
          <Rich text={`المتطلبات المعلّمة: ${done.size} / ${FINAL_BOSS_26_REQUIREMENTS.length}`} />
        </div>
      </div>
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-3">
        <div className="text-center text-xs font-black text-slate-600">
          <Rich text="اكتب قصتك (10–12 جملة) بالمشهد أعلاه:" />
        </div>
        <textarea
          dir="ltr"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={10}
          placeholder={"Last night, I was walking home while the rain was falling...\nPeople were running toward their houses...\nI was listening to music when I heard a strange noise..."}
          className="font-en mt-2 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-left text-base font-bold text-slate-800 outline-none focus:border-teal-400"
        />
        <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map((c) => (
            <div key={c.label} className={`rounded-xl border-2 px-3 py-2 text-center text-xs font-black ${c.pass ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500"}`}>
              <En>{c.label}</En>
              <span className="mx-1">·</span>
              <En>{c.value}</En>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setText("");
              setDone(new Set());
            }}
            className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-200"
          >
            <Rich text="↺ إعادة ضبط المهمة" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// الغلاف + الأهداف
// ============================================================
function Cover() {
  return (
    <div
      dir="rtl"
      data-source-section={SOURCE_SECTIONS[SEC.cover].title}
      className="overflow-hidden rounded-[2rem] border-2 border-teal-200 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-6 shadow-lg md:p-10"
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="anim-float grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-teal-500 to-sky-500 text-4xl shadow-lg ring-4 ring-white md:h-24 md:w-24 md:text-5xl">
          🎬
        </div>
        <div className="min-w-0">
          <div dir="ltr" className="ltr-row inline-flex items-center rounded-full border-2 border-teal-200 bg-white px-4 py-1.5">
            <En className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-700">{LAB_NAME_26}</En>
          </div>
          <h1 dir="ltr" className="ltr-row font-head mt-3 text-2xl font-bold leading-snug text-slate-900 md:text-4xl">
            <En className="font-head text-2xl md:text-4xl">{LESSON_TITLE_26}</En>
          </h1>
          <div className="mt-1 text-base font-bold text-teal-700 md:text-lg">
            <Rich text={LESSON_SUBTITLE_26} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border-2 border-white bg-white/80 p-4 text-base font-bold leading-relaxed text-slate-700 md:text-lg">
        <Rich text={LESSON_ARABIC_TITLE_26} />
        <div className="mt-2 text-sm font-bold text-slate-500">
          <Rich text="اليوم لا نضيف زمنًا جديدًا: نصبح مخرجًا يختار كيف يعرض الماضي — 📸 حدث، أو 🎥 مشهد جارٍ، أو الاثنين معًا." />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="min-w-0 rounded-3xl border-2 border-orange-200 bg-orange-50 p-4 text-right"
          aria-pressed="true"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <En className="text-xs font-black tracking-widest text-orange-800">{VIEW_EVENT_TAG}</En>
            <span className="text-2xl">📸</span>
          </div>
          <div className="mt-2 text-base font-black text-orange-900">
            <Rich text={VIEW_EVENT_AR} />
          </div>
          <En className="mt-1 block text-left text-sm font-black text-orange-800">I watched TV last night.</En>
        </button>
        <button
          type="button"
          className="min-w-0 rounded-3xl border-2 border-teal-200 bg-teal-50 p-4 text-right"
          aria-pressed="true"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <En className="text-xs font-black tracking-widest text-teal-800">{VIEW_PROGRESS_TAG}</En>
            <span className="text-2xl">🎥</span>
          </div>
          <div className="mt-2 text-base font-black text-teal-900">
            <Rich text={VIEW_PROGRESS_AR} />
          </div>
          <En className="mt-1 block text-left text-sm font-black text-teal-800">I was watching TV at 9:00 last night.</En>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-slate-900 p-3 text-xs font-black text-white">
        <En>🎥 + 📸 I was watching TV when my friend called.</En>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-sky-600 p-3 text-xs font-black text-white">
        <En>🎥 + 🎥 While I was watching TV, my brother was reading.</En>
      </div>

      <div className="mt-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 text-center text-sm font-black text-amber-900">
        <Rich text={LAB_MOTTO_26} />
      </div>
      <div className="mt-2 text-center text-xs font-bold text-slate-500">
        <Rich text={`${SOURCE_NUMBERED_COUNT} قسمًا من المصدر · ${SLIDES.length} شريحة · لا حفظ أعمى: المعنى أولًا.`} />
      </div>
    </div>
  );
}

function Objectives() {
  const lines = SOURCE_SECTIONS[SEC.objectives].units;
  return (
    <Frame mascot="🎯" sourceHeading={SOURCE_SECTIONS[SEC.objectives].title} title="أهداف الدرس — 10 أهداف">
      <div className="rounded-2xl bg-teal-50 px-3 py-2 text-center text-sm font-black text-teal-900">
        <Rich text={lines[0]} />
      </div>
      <div className="grid gap-2">
        {lines.slice(1).map((line, i) => (
          <div key={i} className="flex items-start gap-3 rounded-2xl border-2 border-teal-100 bg-white p-3">
            <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-700 text-sm font-bold text-white">
              {line.slice(0, 1)}
            </span>
            <Rich text={line.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

// ============================================================
// ExerciseView
// ============================================================
function ExerciseView({ exercise }: { exercise: Exercise26 }) {
  switch (exercise.type) {
    case "choose":
      return <Ex26Choose />;
    case "completeStory":
      return <CompleteStory />;
    case "grammarDetective":
      return <GrammarDetective />;
    case "finalBoss":
      return <FinalBoss />;
  }
}

// ============================================================
// Lab dispatch
// ============================================================
const LABS: Record<Lab26, (props: { lines: string[] }) => ReactNode> = {
  twoViews: (p) => <TwoViewsLab {...p} />,
  miniTimeline: (p) => <MiniTimelineLab {...p} />,
  longShort: (p) => <LongShortLab {...p} />,
  betterThinking: (p) => <BetterThinkingLab {...p} />,
  directorViewfinder: (p) => <ViewfinderLab {...p} />,
  cookScene: (p) => <CookSceneLab {...p} />,
  magicQuestion: (p) => <MagicQuestionLab {...p} />,
  notAlways: (p) => <NotAlwaysLab {...p} />,
  flipOrder: (p) => <FlipOrderLab {...p} />,
  parallelTracks: (p) => <ParallelTracksLab {...p} />,
  whenVsWhile: (p) => <WhenVsWhileLab {...p} />,
  whenAnalysis: (p) => <WhenAnalysisLab {...p} />,
  whileNuance: (p) => <WhileNuanceLab {...p} />,
  fourPatternBoard: (p) => <FourPatternBoardLab {...p} />,
  storyDirector: (p) => <StoryDirectorLab {...p} />,
  emmaAnalysis: (p) => <EmmaAnalysisLab {...p} />,
  parallelPairs: (p) => <ParallelPairsLab {...p} />,
  simultaneousLab: (p) => <SimultaneousLab {...p} />,
  interruptionLab: (p) => <InterruptionLab {...p} />,
  interruptionModel: (p) => <InterruptionModelLab {...p} />,
  notEverySimple: (p) => <NotEverySimpleLab {...p} />,
  sequenceScene: (p) => <SequenceSceneLab {...p} />,
  deepDifference: (p) => <DeepDifferenceLab {...p} />,
  compareFour: (p) => <CompareFourLab {...p} />,
  compareMeanings: (p) => <CompareMeaningsLab {...p} />,
  errorsDetective: (p) => <ErrorsDetectiveLab {...p} />,
  wasWereControl: (p) => <WasWereControlLab {...p} />,
  nounAgreement: (p) => <NounAgreementLab {...p} />,
  timeExpressions: (p) => <TimeExpressionsLab {...p} />,
  timeNotRules: (p) => <TimeNotRulesLab {...p} />,
  meaningFirst: (p) => <MeaningFirstLab {...p} />,
  iq200Match: (p) => <Iq200MatchLab {...p} />,
  iq200Both: (p) => <Iq200BothLab {...p} />,
  storyLayers: (p) => <StoryLayersLab {...p} />,
  masterMap: (p) => <MasterMapLab {...p} />,
  goldenRule: (p) => <GoldenRuleLab {...p} />,
  finalCheck: (p) => <FinalCheckLab {...p} />,
};

function BlockView({ block, sectionIndex }: { block: Block26; sectionIndex?: number }) {
  const units = sectionIndex === undefined ? [] : SOURCE_SECTIONS[sectionIndex].units;
  switch (block.t) {
    case "units": {
      const lines = units.slice(block.from, block.to ?? units.length);
      return <Lines lines={lines} tone={block.tone} />;
    }
    case "lab": {
      const [from, to] = block.covers ?? [0, units.length];
      const Lab = LABS[block.lab];
      return <>{Lab({ lines: units.slice(from, to) })}</>;
    }
    case "note":
      return <Note emoji={block.emoji} text={block.text} />;
    case "strip":
      return <FormulaStrip items={block.items} tone="teal" />;
  }
}

function sourceHeadingFor(slide: Slide26): string | undefined {
  return slide.sourceIndex === undefined ? undefined : SOURCE_SECTIONS[slide.sourceIndex].title;
}

function Closing({ onExit }: { onExit: () => void }) {
  const unit = SOURCE_SECTIONS[SEC.closing].units[0];
  return (
    <div
      dir="rtl"
      data-source-section={SOURCE_SECTIONS[SEC.closing].title}
      data-en-seq="l26-closing"
      className="overflow-hidden rounded-[2rem] border-2 border-teal-200 bg-gradient-to-br from-teal-50 via-white to-sky-50 p-6 shadow-xl md:p-10"
    >
      <div className="text-center text-6xl anim-float">🏆</div>
      <h2 className="font-head mt-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        <Rich text="أحسنت! — LESSON 26 COMPLETE" />
      </h2>
      <div className="mt-4 rounded-3xl border-2 border-white bg-white p-4 text-center text-lg font-black leading-relaxed text-teal-900 md:text-xl">
        <Rich text={unit} />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-3 text-center text-sm font-black text-orange-900">
          <En>📸 What happened? → Past Simple</En>
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-3 text-center text-sm font-black text-teal-900">
          <En>🎥 What was happening? → Past Continuous</En>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button onClick={onExit} className="rounded-xl bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800">
          ← جميع الدروس
        </button>
      </div>
      <Signature />
    </div>
  );
}

export function SlideView26({ s, onExit }: { s: Slide26; onExit: () => void }) {
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
              <BlockView block={block} sectionIndex={s.sourceIndex} />
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
    case "quiz":
      return (
        <Frame
          mascot={s.mascot}
          badge="الاختبار النهائي"
          title={<Rich text={s.title} />}
          lead="12 سؤالًا جديدًا تقيس: Past Simple مقابل Past Continuous، when/while، القطع، التزامن، was/were، و -ing."
        >
          <FinalQuiz lesson={26} accent="bg-teal-700" />
        </Frame>
      );
    case "closing":
      return <Closing onExit={onExit} />;
  }
}

function slideTitle(slide: Slide26): string {
  if (slide.kind === "cover") return "الغلاف";
  return slide.title;
}

const SECTION_COLORS: Record<string, string> = {
  البداية: "text-slate-500",
  "الفكرة الأساسية": "text-teal-700",
  "حدث واحد فقط": "text-emerald-700",
  "WHEN — عندما": "text-amber-700",
  "WHILE — بينما": "text-sky-700",
  "الأنماط الأربعة": "text-orange-700",
  "بناء القصة": "text-violet-700",
  "مقارنة دقيقة": "text-cyan-700",
  "الأخطاء والتحكم": "text-rose-700",
  "المعنى والتعبيرات": "text-indigo-700",
  التدريبات: "text-fuchsia-700",
  "التحديات النهائية": "text-amber-800",
  الخاتمة: "text-slate-600",
};

function Rail({
  index,
  setIndex,
  onExit,
  onClose,
}: {
  index: number;
  setIndex: (next: number) => void;
  onExit: () => void;
  onClose?: () => void;
}) {
  const groups = useMemo(() => {
    const out: { section: string; indexes: number[] }[] = [];
    SLIDES.forEach((slide, i) => {
      const last = out[out.length - 1];
      if (last?.section === slide.section) last.indexes.push(i);
      else out.push({ section: slide.section, indexes: [i] });
    });
    return out;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-teal-100 p-5">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">
          <Rich text="الدرس 26 · Past Simple vs Past Continuous" />
        </div>
        <En className="text-xs font-semibold text-teal-700">🎬 {LAB_NAME_26}</En>
        <div className="mt-2 rounded-lg bg-teal-50 px-2 py-1 text-[11px] font-bold text-teal-800">
          {SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · {SOURCE_LEDGER_COUNT} قسمًا في السجل · {SLIDES.length} شريحة
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-black text-white">📸 EVENT</span>
          <span className="rounded-full bg-teal-600 px-2 py-1 text-[10px] font-black text-white">🎥 IN-PROGRESS</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setIndex(i);
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${
                    active ? "bg-teal-700 text-white shadow" : "text-slate-600 hover:bg-teal-50"
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>
                    {i + 1}
                  </span>
                  <span className="truncate font-semibold">{mixedText(slideTitle(SLIDES[i]))}</span>
                  <span className="mr-auto text-base">{SLIDES[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-teal-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson26({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = SLIDES.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(target.tagName)) return;
      if (event.key === "ArrowLeft") navigation.next();
      if (event.key === "ArrowRight") navigation.prev();
      if (event.key === " ") {
        event.preventDefault();
        navigation.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigation, menu]);

  useEffect(() => {
    document.getElementById("l26-main")?.scrollTo({ top: 0 });
  }, [index]);

  const slide = SLIDES[index];
  const progress = ((index + 1) / total) * 100;
  return (
    <div dir="rtl" className="font-body relative flex h-screen flex-col overflow-hidden bg-[#f3fbfa] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-teal-100 bg-white/85 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-teal-100 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-slate-500">
                <Rich text={`${slide.section} · ${slideTitle(slide)}`} />
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-teal-100/70">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-teal-600 via-sky-500 to-amber-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
              {index + 1} / {total}
            </span>
          </header>
          <main id="l26-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div key={index} className="pop mx-auto max-w-4xl">
              <SlideView26 s={slide} onExit={onExit} />
            </div>
          </main>
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-teal-900/[0.06] bg-white/95 p-1.5 shadow-xl backdrop-blur">
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
                className="rounded-full bg-teal-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-teal-800 disabled:opacity-30"
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
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
