import TeacherSourceBrowser from "../../shared/TeacherSourceBrowser";
import { TeachingDetails } from "../../shared/TeacherWorkspace";
import { mixedText } from "../../shared/lessonKit";
import TeacherWorkspace, { TeacherSection } from "../../shared/TeacherWorkspace";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SOURCE_SECTIONS,
  SEC,
  VERB_TABLE_27,
  EX27_V3,
  EX27_HADHAVE,
  EX27_SIMPLE_PERFECT,
  EX27_NOAH,
  EX27_ERRORS,
  EX27_ERROR_SPOTS,
  EX27_TRANSFORM,
  DETECTIVE_27,
  ORDER_27_CHALLENGE,
  BOSS_27,
  EX27_FINAL,
  TEST_27,
  TEST_27_SOLUTIONS,
  OBJECTIVES_27,
  TEACHER_PASSWORD_27,
  TEACHER_27_OVERVIEW,
  TEACHER_27_NOTES,
  TEACHER_27_SOLUTIONS,
  TEACHER_27_RUBRIC,
  TEACHER_27_MISTAKES,
  STORY_27_REQUIREMENTS,
  STORY_27_STARTER,
  TYPO_S43_Q2,
  type TestQ27,
  type Mcq27,
} from "./data";
import { Signature, SignatureGhost } from "../../shared/Signature";
import { EnAr, LatinRuns } from "../../shared/bidi";
import {
  En,
  Rich,
  Frame,
  Note,
  Verdict,
  PartsLine,
  SentenceCard,
  Nub,
  PlatformTag,
  type Part,
  type RoleStyle,
  type FrameAccent,
} from "../../shared/lessonKit";
import FinalTest, { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

// ============================================================
// ⏪ الدرس 27 — Past Perfect — الماضي التام
// THE FLASHBACK DIRECTOR — المخرج الذي يرتّب حدثين في الماضي
//
// إعادة بناء native multi-step بمعيار الدرس 6 والدرس 29:
// - فكرة واحدة لكل خطوة · لا جدران نصوص · التفاعل هو الشرح
// - سجل المصدر (SOURCE_SECTIONS) هو المرجع الحرفي للتغطية والتدقيق
// - المناطق الأربع: الدرس (53 خطوة) | الاختبار (20 سؤالًا) | الحلول | المعلم (somer173)
// ============================================================

const ACCENT27: FrameAccent = {
  step: "bg-violet-700",
  badge: "bg-violet-100 text-violet-800",
  tip: "from-violet-800 to-indigo-800",
  shadow: "shadow-[0_14px_44px_-20px_rgba(109,40,217,0.3)]",
};

// ---------------- نظام أدوار الجملة (تشريح Past Perfect) ----------------
const R27: Record<string, RoleStyle> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "الفاعل" },
  had: { chip: "bg-violet-100 border-violet-300 text-violet-900", label: "المساعد الثابت" },
  hadnt: { chip: "bg-rose-100 border-rose-300 text-rose-900", label: "النفي" },
  v3: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", label: "التصريف الثالث V3" },
  v2: { chip: "bg-orange-100 border-orange-300 text-orange-900", label: "الماضي البسيط V2" },
  conn: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "أداة الربط" },
  adv: { chip: "bg-emerald-100 border-emerald-300 text-emerald-900", label: "الظرف" },
  obj: { chip: "bg-slate-100 border-slate-300 text-slate-900", label: "المفعول/التكملة" },
};
const P = (text: string, role: string): Part => ({ text, role });

// ---------------- الأدوار البصرية الثلاثة للأزمنة ----------------
type TenseLens = "ps" | "pc" | "pp";
const TENSES27: Record<
  TenseLens,
  { en: string; ar: string; emoji: string; qEn: string; qAr: string; chip: string; soft: string; ring: string }
> = {
  ps: {
    en: "Past Simple",
    ar: "الماضي البسيط",
    emoji: "📸",
    qEn: "What happened?",
    qAr: "ماذا حدث؟ (حدث مكتمل)",
    chip: "bg-orange-500 text-white",
    soft: "border-orange-300 bg-orange-50",
    ring: "ring-orange-300",
  },
  pc: {
    en: "Past Continuous",
    ar: "الماضي المستمر",
    emoji: "🎥",
    qEn: "What was happening?",
    qAr: "ماذا كان يحدث؟ (خلفية مستمرة)",
    chip: "bg-sky-500 text-white",
    soft: "border-sky-300 bg-sky-50",
    ring: "ring-sky-300",
  },
  pp: {
    en: "Past Perfect",
    ar: "الماضي التام",
    emoji: "⏪",
    qEn: "What had happened before that?",
    qAr: "ماذا كان قد حدث قبل ذلك؟ (فلاش باك / الأقدم)",
    chip: "bg-violet-700 text-white",
    soft: "border-violet-300 bg-violet-50",
    ring: "ring-violet-300",
  },
};

function TenseChip({ t, small = false, onClick, active }: { t: TenseLens; small?: boolean; onClick?: () => void; active?: boolean }) {
  const v = TENSES27[t];
  const base = `inline-flex items-center gap-1.5 rounded-xl font-black transition ${small ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"} ${v.chip} ${active === false ? "opacity-40" : ""}`;
  if (!onClick) {
    return (
      <span className={base}>
        {v.emoji} <En>{v.en}</En>
      </span>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} active:scale-95 ${active ? `ring-4 ${v.ring}` : ""}`}>
      {v.emoji} <En>{v.en}</En>
    </button>
  );
}

// ---------------- أدوات عرض وتفاعل مشتركة ----------------

function Lab({ emoji, label, ar, children }: { emoji: string; label: string; ar?: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border-2 border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-indigo-50/60 p-3.5 sm:p-5">
      <div className="mb-3.5 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-violet-100 bg-white px-3 py-2 shadow-sm">
        <span className="text-xl">{emoji}</span>
        <EnAr en={label} ar={ar} enClassName="text-xs font-black uppercase tracking-[0.16em] text-violet-700" arClassName="text-sm font-bold text-slate-600" />
      </div>
      <div className="space-y-3.5">{children}</div>
    </div>
  );
}

function PlatformPanel({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border-2 border-slate-700 bg-slate-900 p-4 text-sm font-semibold leading-relaxed text-white">
      <div className="mb-1.5 text-[11px] font-black uppercase tracking-wide text-amber-300">
        <PlatformTag />
      </div>
      {children}
    </aside>
  );
}

function SourceReveal({ text }: { text: string }) {
  return (
    <div data-reveal-block className="tada flex flex-wrap items-center gap-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3.5 py-2.5">
      <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-black text-white">📜 من المصدر</span>
      <Rich text={text} className="text-sm font-bold text-emerald-900 md:text-base" />
    </div>
  );
}

function FormulaStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((x) => (
        <En key={x} className="rounded-xl border-2 border-violet-200 bg-white px-3.5 py-2 text-base font-black text-violet-900 shadow-sm md:text-lg">
          {x}
        </En>
      ))}
    </div>
  );
}

/** خط زمني مرئي ثنائي للأحداث الماضية */
function DualPastTimeline({
  firstEn,
  firstAr,
  secondEn,
  secondAr,
  highlight = "all",
}: {
  firstEn: string;
  firstAr: string;
  secondEn: string;
  secondAr: string;
  highlight?: "first" | "second" | "all";
}) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row rounded-2xl border-2 border-violet-100 bg-white p-3.5 sm:p-4">
      <div className="mb-2 flex items-center justify-between text-xs font-black text-slate-400">
        <span><LatinRuns text={"⏪ EARLIER PAST (الأقدم)"} /></span>
        <span><LatinRuns text={"📸 LATER PAST (الأحدث)"} /></span>
        <span><LatinRuns text={"⏰ NOW (الآن)"} /></span>
      </div>
      <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* الحدث الأول */}
        <div
          className={`flex-1 rounded-2xl border-2 p-3 transition ${
            highlight === "first" || highlight === "all"
              ? "border-violet-400 bg-violet-50 text-violet-950 shadow-sm ring-2 ring-violet-200"
              : "border-slate-200 bg-slate-50 opacity-60"
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-black text-violet-700">
            <span><LatinRuns text={"⏪ الحدث ① (Past Perfect)"} /></span>
          </div>
          <EnAr en={firstEn} ar={firstAr} enClassName="mt-1 block text-lg font-extrabold text-violet-900" arClassName="mt-0.5 block text-xs font-bold text-slate-600" />
        </div>

        <div className="hidden text-xl font-black text-slate-300 md:block">→</div>

        {/* الحدث الثاني */}
        <div
          className={`flex-1 rounded-2xl border-2 p-3 transition ${
            highlight === "second" || highlight === "all"
              ? "border-orange-400 bg-orange-50 text-orange-950 shadow-sm ring-2 ring-orange-200"
              : "border-slate-200 bg-slate-50 opacity-60"
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-black text-orange-700">
            <span><LatinRuns text={"📸 الحدث ② (Past Simple)"} /></span>
          </div>
          <EnAr en={secondEn} ar={secondAr} enClassName="mt-1 block text-lg font-extrabold text-orange-900" arClassName="mt-0.5 block text-xs font-bold text-slate-600" />
        </div>

        <div className="hidden text-xl font-black text-slate-300 md:block">→</div>

        {/* الآن */}
        <div className="flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-black text-slate-500">
          📍 NOW
        </div>
      </div>
    </div>
  );
}

// ============================================================
// لبنات الممارسة التفاعلية مع التغذية الفورية
// ============================================================

function McqRow({
  n,
  stem,
  stemAr,
  opts,
  answer,
  why,
  context,
  onFirstAnswer,
}: {
  n: number;
  stem?: string;
  stemAr?: string;
  opts: string[];
  answer: number;
  why: string;
  context?: string;
  onFirstAnswer?: () => void;
}) {
  const [pick, setPick] = useState<number | undefined>(undefined);
  const right = pick === answer;
  return (
    <div
      className={`rounded-3xl border-2 p-3.5 transition ${
        pick === undefined
          ? "border-slate-200 bg-white"
          : right
            ? "border-emerald-300 bg-emerald-50/60"
            : "border-rose-300 bg-rose-50/60"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <Nub n={n} className="bg-violet-700" />
        {stem && <En className="text-lg font-bold text-slate-800 md:text-xl">{stem}</En>}
        {stemAr && <Rich text={stemAr} className="text-base font-bold text-slate-800 md:text-lg" />}
      </div>
      {context && (
        <div className="mt-1.5 pr-10">
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
            📌 <Rich text={context} />
          </span>
        </div>
      )}
      <div className="mt-2.5 flex flex-wrap gap-2 pr-10">
        {opts.map((o, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => {
              if (pick === undefined) onFirstAnswer?.();
              setPick(oi);
            }}
            className={`rounded-xl border-2 px-3.5 py-1.5 font-en font-bold transition active:scale-95 ${
              pick === oi
                ? oi === answer
                  ? "border-transparent bg-emerald-600 text-white"
                  : "border-transparent bg-rose-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {pick !== undefined && (
        <div className={`mt-2 pr-10 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
          {right ? (
            <span className="tada inline-block">✓ <Rich text={why} /></span>
          ) : (
            <span>
              ✕ الصحيح: <EnAr en={opts[answer]} sep="—" ar={why} enClassName="font-extrabold" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// مكونات الخطوات الفردية (53 خطوة تغطي المصدر كاملًا)
// ============================================================

function CoverStep() {
  const [lens, setLens] = useState<TenseLens>("pp");
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-violet-100 bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-800 p-6 text-center text-white shadow-lg md:p-10">
        <div className="text-5xl anim-drift md:text-6xl">⏪</div>
        <En className="mt-3 block text-2xl font-black uppercase tracking-widest text-violet-200 md:text-3xl">
          THE FLASHBACK DIRECTOR
        </En>
        <h1 className="font-head mt-2 text-2xl font-black md:text-4xl"><LatinRuns text="الدرس 27: Past Perfect — الماضي التام" /></h1>
        <p className="mt-3 text-base font-semibold text-violet-100 md:text-xl">
          الماضي التام — أي حدث وقع أولًا في الماضي؟ المخرج الذي يرتّب حدثين في الماضي بدقة.
        </p>
      </div>

      <Lab emoji="🎬" label="Three Cameras Preview" ar="عدسات الزمن الثلاث — بدّل بينها لتشاهد الفكرة">
        <div className="flex flex-wrap justify-center gap-2">
          <TenseChip t="ps" onClick={() => setLens("ps")} active={lens === "ps"} />
          <TenseChip t="pc" onClick={() => setLens("pc")} active={lens === "pc"} />
          <TenseChip t="pp" onClick={() => setLens("pp")} active={lens === "pp"} />
        </div>
        <div className={`rounded-2xl border-2 p-4 text-center transition ${TENSES27[lens].soft}`}>
          <div className="text-3xl">{TENSES27[lens].emoji}</div>
          <En className="mt-1 block text-xl font-black">{TENSES27[lens].en}</En>
          <div className="mt-1 text-sm font-bold text-slate-700">
            <EnAr en={TENSES27[lens].qEn} sep="—" ar={TENSES27[lens].qAr} enClassName="font-black text-slate-900" />
          </div>
        </div>
      </Lab>
    </div>
  );
}

function BridgeStep() {
  return (
    <div className="space-y-4">
      <Note
        emoji="🧠"
        text="هذا الدرس هو الخطوة الطبيعية التالية بعد أن أتقنا الماضي البسيط Past Simple، والماضي المستمر Past Continuous، والفرق بينهما، وأدوات when / while، والأحداث والخلفية في القصص."
      />
      <Lab emoji="🎯" label="The Next Tool" ar="الأداة الجديدة">
        <div className="rounded-2xl border-2 border-violet-200 bg-white p-4 text-center">
          <p className="text-base font-bold leading-relaxed text-slate-800 md:text-lg">
            الآن سنضيف أداة قوية جدًا تجعلنا قادرين على <span className="font-black text-violet-700">ترتيب حدثين كلاهما في الماضي بدقة</span>.
          </p>
        </div>
        <DualPastTimeline
          firstEn="The train had left."
          firstAr="القطار كان قد غادر أولًا"
          secondEn="I arrived."
          secondAr="أنا وصلت لاحقًا"
        />
      </Lab>
    </div>
  );
}

function ObjectivesStep() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setChecked((p) => ({ ...p, [i]: !p[i] }));
  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {OBJECTIVES_27.map((obj, i) => (
          <button
            key={i}
            type="button"
            onClick={() => toggle(i)}
            className={`flex items-start gap-2.5 rounded-2xl border-2 p-3 text-right transition active:scale-98 ${
              checked[i] ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-slate-200 bg-white text-slate-800 hover:border-violet-200"
            }`}
          >
            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-bold ${checked[i] ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-700"}`}>
              {checked[i] ? "✓" : i + 1}
            </span>
            <Rich text={obj} className="text-sm font-bold leading-snug" />
          </button>
        ))}
      </div>
      <Note emoji="💡" text="اضغط على أي هدف لتعليمه أثناء تقدمك في الدرس!" />
    </div>
  );
}

// ---------------- S1: ما هو Past Perfect؟ ----------------
function S1Timeline() {
  const [active, setActive] = useState<"both" | "first" | "second">("both");
  return (
    <div className="space-y-4" data-en-seq="l27-timeline">
      <Note emoji="🧠" text="Past Perfect = الماضي التام. الفكرة الأساسية بسيطة جدًا: نحن نتحدث عن حدثين في الماضي، ونريد أن نوضح أن أحدهما حدث قبل الآخر." />

      <Lab emoji="🕰️" label="Chronological Timeline" ar="خط الزمن: الماضي الأقدم ← الحدث الأول ← الحدث الثاني ← الآن">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setActive("first")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${active === "first" ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            ⏪ الحدث الأول (Past Perfect)
          </button>
          <button
            type="button"
            onClick={() => setActive("second")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${active === "second" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            📸 الحدث الثاني (Past Simple)
          </button>
          <button
            type="button"
            onClick={() => setActive("both")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${active === "both" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
          >
            عرض الاثنين معًا
          </button>
        </div>

        <DualPastTimeline
          firstEn="The train had left."
          firstAr="القطار غادر أولًا (الأقدم = Past Perfect)"
          secondEn="I arrived."
          secondAr="أنا وصلت لاحقًا (الأحدث = Past Simple)"
          highlight={active === "both" ? "all" : active}
        />

        <SentenceCard
          parts={[P("When", "conn"), P("I", "s"), P("arrived", "v2"), P(",", "obj"), P("the train", "s"), P("had", "had"), P("left", "v3")]}
          roles={R27}
          ar="عندما وصلت، كان القطار قد غادر."
          note="القطار غادر أولًا، ثم أنا وصلت!"
        />
      </Lab>
    </div>
  );
}

// ---------------- S2: الفكرة الذهبية ----------------
function S2GoldenIdea() {
  const examples = [
    { en: [P("I", "s"), P("had", "had"), P("eaten", "v3")], ar: "كنت قد أكلت." },
    { en: [P("She", "s"), P("had", "had"), P("finished", "v3")], ar: "كانت قد أنهت." },
    { en: [P("They", "s"), P("had", "had"), P("left", "v3")], ar: "كانوا قد غادروا." },
    { en: [P("He", "s"), P("had", "had"), P("forgotten", "v3")], ar: "كان قد نسي." },
  ];
  const [idx, setIdx] = useState(0);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-5 text-center">
        <span className="text-3xl">🔥</span>
        <div className="mt-1 text-xs font-black uppercase text-amber-800">القاعدة الذهبية</div>
        <div className="font-head mt-1 text-2xl font-black text-amber-950 md:text-3xl">
          Past Perfect = «كان قد فعل»
        </div>
      </div>

      <Lab emoji="🎧" label="Interactive Sentence Explorer" ar="تصفح الأمثلة المصدرية الأربعة">
        <div className="flex flex-wrap justify-center gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={`rounded-xl px-3.5 py-1.5 font-en font-bold transition ${
                idx === i ? "bg-violet-700 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {ex.en.map((p) => p.text).join(" ")}
            </button>
          ))}
        </div>

        <SentenceCard parts={examples[idx].en} roles={R27} ar={examples[idx].ar} />
      </Lab>

      <Note emoji="🚨" text="لكن انتبه: لا تترجم Past Perfect حرفيًا في كل جملة. المهم هو فهم العلاقة الزمنية بين الحدثين." />
    </div>
  );
}

// ---------------- S3: خط الزمن وسارة في السينما ----------------
function S3SaraDiagram() {
  const [step, setStep] = useState<1 | 2>(1);
  return (
    <div className="space-y-4" data-en-seq="l27-sara">
      <SentenceCard
        parts={[P("When", "conn"), P("Sara", "s"), P("arrived", "v2"), P("at the cinema,", "obj"), P("the movie", "s"), P("had", "had"), P("started", "v3")]}
        roles={R27}
        ar="عندما وصلت سارة إلى السينما، كان الفيلم قد بدأ."
      />

      <Lab emoji="🎬" label="Event Chronology Simulator" ar="المحاكي الزمني لوصول سارة والفيلم">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`rounded-xl px-4 py-2 font-bold transition ${step === 1 ? "bg-violet-700 text-white" : "bg-white border border-slate-200 text-slate-700"}`}
          >
            ① الفيلم بدأ (Past Perfect)
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`rounded-xl px-4 py-2 font-bold transition ${step === 2 ? "bg-orange-500 text-white" : "bg-white border border-slate-200 text-slate-700"}`}
          >
            ② سارة وصلت (Past Simple)
          </button>
        </div>

        <DualPastTimeline
          firstEn="The movie had started."
          firstAr="① الفيلم بدأ أولًا ← Past Perfect"
          secondEn="Sara arrived."
          secondAr="② سارة وصلت لاحقًا ← Past Simple"
          highlight={step === 1 ? "first" : "second"}
        />
      </Lab>
    </div>
  );
}

// ---------------- S4: كيف نكوّن Past Perfect؟ ----------------
function S4HadGrid() {
  const pronouns = ["I", "You", "He", "She", "It", "We", "They"];
  const [pIndex, setPIndex] = useState(3); // She
  return (
    <div className="space-y-4" data-en-seq="l27-had-grid">
      <div className="text-center">
        <FormulaStrip items={["Subject", "+", "had", "+", "V3 (Past Participle)"]} />
      </div>

      <Lab emoji="⭐" label="Had Never Changes Grid" ar="اختر أي فاعل وشاهد: had لا تتغير أبدًا!">
        <div className="flex flex-wrap justify-center gap-1.5">
          {pronouns.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => setPIndex(i)}
              className={`rounded-xl px-3 py-1.5 font-en font-black transition ${
                pIndex === i ? "bg-violet-700 text-white shadow-md scale-105" : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <SentenceCard
          parts={[P(pronouns[pIndex], "s"), P("had", "had"), P("finished", "v3"), P("the work", "obj")]}
          roles={R27}
          ar={`${pronouns[pIndex]} had finished... (had ثابتة مع جميع الضمائر)`}
          note="وهذا يجعل Past Perfect أسهل من Present Perfect من ناحية اختيار المساعد!"
        />
      </Lab>
    </div>
  );
}

// ---------------- S5: ما هو V3؟ ----------------
function S5VerbTable() {
  const [tab, setTab] = useState<"all" | "regular" | "irregular">("all");
  const filtered = VERB_TABLE_27.filter((v) => {
    if (tab === "regular") return v.regular;
    if (tab === "irregular") return !v.regular;
    return true;
  });

  return (
    <div className="space-y-4" data-en-seq="l27-verbs-regular">
      <Note emoji="🧱" text="V3 = Past Participle (الشكل الثالث للفعل). في الأفعال المنتظمة V2 = V3 (إضافة ed)، لكن في الأفعال غير المنتظمة يتغير الشكل ويجب حفظه." />

      <Lab emoji="📚" label="14 Source Verbs Library" ar="جدول الأفعال الـ 14 من المصدر">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setTab("all")}
            className={`rounded-xl px-3 py-1 text-xs font-bold ${tab === "all" ? "bg-violet-700 text-white" : "bg-white border text-slate-700"}`}
          >
            الكل (14)
          </button>
          <button
            type="button"
            onClick={() => setTab("regular")}
            className={`rounded-xl px-3 py-1 text-xs font-bold ${tab === "regular" ? "bg-violet-700 text-white" : "bg-white border text-slate-700"}`}
          >
            منتظمة (V2 = V3)
          </button>
          <button
            type="button"
            onClick={() => setTab("irregular")}
            className={`rounded-xl px-3 py-1 text-xs font-bold ${tab === "irregular" ? "bg-violet-700 text-white" : "bg-white border text-slate-700"}`}
          >
            غير منتظمة (10 أفعال)
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((v) => (
            <div key={v.v1} className="rounded-2xl border-2 border-slate-100 bg-white p-3 text-center">
              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-black ${v.regular ? "bg-emerald-100 text-emerald-800" : "bg-fuchsia-100 text-fuchsia-800"}`}>
                {v.regular ? "منتظم" : "غير منتظم"}
              </span>
              <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row mt-1 font-en text-sm font-extrabold text-slate-800">
                <span>{v.v1}</span> <span className="text-slate-300">→</span> <span>{v.v2}</span> <span className="text-slate-300">→</span> <span className="text-violet-700">{v.v3}</span>
              </div>
            </div>
          ))}
        </div>
      </Lab>
    </div>
  );
}

// ---------------- S6: لا تخلط بين V2 و V3 ----------------
function S6V2V3Trap() {
  return (
    <div className="space-y-4" data-en-seq="l27-v2v3">
      <Note emoji="🚨" text="هذه واحدة من أهم النقاط في الدرس: بعد had نحتاج V3 دائمًا، وليس V2!" />

      <Lab emoji="⚖️" label="V2 vs V3 Analyzer" ar="المقارنة الحاسمة مع الفعل go">
        <Verdict ok={true} en="I went to school yesterday." ar="ذهبتُ إلى المدرسة أمس. (Past Simple = V2)" why="حدث بسيط ماضٍ" />
        <Verdict ok={true} en="I had gone to school before my brother arrived." ar="كنت قد ذهبتُ إلى المدرسة قبل وصول أخي. (Past Perfect = had + V3)" why="had + V3 صحيح" />
        <Verdict ok={false} en="I had went..." ar="خطأ شائع جدًا!" why="had + V2 ❌ — خطأ!" />
      </Lab>

      <div className="text-center font-bold text-violet-900">
        القاعدة: <En className="font-black">had + V3</En> وليس <En className="line-through decoration-rose-500 font-black">had + V2</En>
      </div>
    </div>
  );
}

// ---------------- S7: لماذا نحتاج Past Perfect أصلًا؟ ----------------
function S7TeacherSwitch() {
  const [withHad, setWithHad] = useState(false);
  return (
    <div className="space-y-4" data-en-seq="l27-teacher-switch">
      <Note emoji="🧠" text="سؤال IQ200: إذا كان لدينا Past Simple، فلماذا نحتاج Past Perfect؟ لأن Past Perfect يزيل الغموض ويرتّب الأحداث بدقة!" />

      <Lab emoji="🔄" label="The Meaning Switch" ar="اضغط لتبديل الجملة وشاهد كيف ينقلب الترتيب الزمني بالكامل!">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setWithHad(false)}
            className={`rounded-2xl px-4 py-2.5 font-bold transition ${!withHad ? "bg-orange-500 text-white shadow-md" : "border bg-white text-slate-700"}`}
          >
            <LatinRuns text="بدون had (الماضي البسيط)" />
          </button>
          <button
            type="button"
            onClick={() => setWithHad(true)}
            className={`rounded-2xl px-4 py-2.5 font-bold transition ${withHad ? "bg-violet-700 text-white shadow-md" : "border bg-white text-slate-700"}`}
          >
            <LatinRuns text="مع had (الماضي التام)" />
          </button>
        </div>

        {!withHad ? (
          <div className="space-y-2 rounded-2xl border-2 border-orange-200 bg-orange-50/50 p-4">
            <En className="block text-xl font-black text-orange-950">When I arrived, the teacher left.</En>
            <p className="text-sm font-bold text-slate-700">المعنى: وصلتُ، <span className="text-orange-700 font-extrabold">ثم</span> غادر المعلم.</p>
            <div className="text-xs font-black text-slate-500"><LatinRuns text={"الترتيب: ① I arrived ← ② The teacher left"} /></div>
          </div>
        ) : (
          <div className="space-y-2 rounded-2xl border-2 border-violet-200 bg-violet-50/50 p-4">
            <En className="block text-xl font-black text-violet-950">When I arrived, the teacher had left.</En>
            <p className="text-sm font-bold text-slate-700">المعنى: عندما وصلت، كان المعلم <span className="text-violet-700 font-extrabold">قد غادر بالفعل</span>.</p>
            <div className="text-xs font-black text-violet-800"><LatinRuns text={"الترتيب: ① The teacher left ← ② I arrived"} /></div>
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- S8: مثال علي والمطعم ----------------
function S8AliOrder() {
  const [mode, setMode] = useState<"plain" | "perfect">("perfect");
  return (
    <div className="space-y-4" data-en-seq="l27-ali">
      <Lab emoji="🎯" label="Restaurant Scenario" ar="علي والمطعم: كيف تغيّر had الترتيب؟">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("plain")}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${mode === "plain" ? "bg-orange-500 text-white" : "border bg-white text-slate-700"}`}
          >
            تتابع عادي (and)
          </button>
          <button
            type="button"
            onClick={() => setMode("perfect")}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${mode === "perfect" ? "bg-violet-700 text-white" : "border bg-white text-slate-700"}`}
          >
            Past Perfect (When + had)
          </button>
        </div>

        {mode === "plain" ? (
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">
            <En className="text-lg font-black text-orange-950">Ali arrived at the restaurant, and the restaurant closed.</En>
            <p className="mt-1 text-sm font-bold text-slate-700">الفهم: ① علي وصل ← ② المطعم أغلق.</p>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
            <En className="text-lg font-black text-violet-950">When Ali arrived at the restaurant, the restaurant had closed.</En>
            <p className="mt-1 text-sm font-bold text-slate-700">الفهم: ① المطعم أغلق أولًا ← ② علي وصل بعد الإغلاق.</p>
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- S9: الجملة المثبتة ----------------
function S9Affirmative() {
  const sentences = [
    { parts: [P("I", "s"), P("had", "had"), P("finished", "v3"), P("my homework", "obj")], ar: "كنت قد أنهيت واجبي." },
    { parts: [P("She", "s"), P("had", "had"), P("cleaned", "v3"), P("her room", "obj")], ar: "كانت قد نظفت غرفتها." },
    { parts: [P("He", "s"), P("had", "had"), P("eaten", "v3"), P("breakfast", "obj")], ar: "كان قد تناول الفطور." },
    { parts: [P("We", "s"), P("had", "had"), P("arrived", "v3"), P("before noon", "obj")], ar: "كنا قد وصلنا قبل الظهر." },
    { parts: [P("They", "s"), P("had", "had"), P("completed", "v3"), P("the project", "obj")], ar: "كانوا قد أكملوا المشروع." },
    { parts: [P("The dog", "s"), P("had", "had"), P("escaped", "v3")], ar: "كان الكلب قد هرب." },
  ];

  return (
    <div className="space-y-3.5">
      <div className="text-center">
        <FormulaStrip items={["Subject", "+", "had", "+", "V3"]} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sentences.map((s, i) => (
          <SentenceCard key={i} parts={s.parts} roles={R27} ar={s.ar} size="sm" />
        ))}
      </div>
    </div>
  );
}

// ---------------- S10: مع الأفعال غير المنتظمة ----------------
function S10IrregularPairs() {
  const pairs = [
    { v: "eat", simple: "I ate breakfast.", perfect: "I had eaten breakfast before school started." },
    { v: "go", simple: "She went home.", perfect: "She had gone home before I called." },
    { v: "see", simple: "We saw the painting.", perfect: "We had seen the painting before." },
    { v: "take", simple: "He took the book.", perfect: "He had taken the book before the lesson started." },
    { v: "write", simple: "Maya wrote the message.", perfect: "Maya had written the message before she lost her phone." },
    { v: "break", simple: "Tom broke the window.", perfect: "The window had broken before we arrived." },
  ];
  const [cur, setCur] = useState(0);

  return (
    <div className="space-y-4" data-en-seq="l27-pairs-a">
      <Note emoji="🔥" text="هنا يبدأ التحدي الحقيقي: قارن بين V2 في الماضي البسيط و V3 بعد had." />

      <Lab emoji="🔀" label="Irregular Pairs Explorer" ar="اختر الفعل وشاهد الفرق بين V2 و V3 في سياق الجملة">
        <div className="flex flex-wrap justify-center gap-1.5">
          {pairs.map((p, i) => (
            <button
              key={p.v}
              type="button"
              onClick={() => setCur(i)}
              className={`rounded-xl px-3 py-1 font-en font-black transition ${cur === i ? "bg-violet-700 text-white" : "border bg-white text-slate-700"}`}
            >
              {p.v}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/60 p-3">
            <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-black text-white">📸 Past Simple (V2)</span>
            <En className="mt-1.5 block text-lg font-extrabold text-orange-950">{pairs[cur].simple}</En>
          </div>
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/60 p-3">
            <span className="rounded-full bg-violet-700 px-2.5 py-0.5 text-xs font-black text-white">⏪ Past Perfect (had + V3)</span>
            <En className="mt-1.5 block text-lg font-extrabold text-violet-950">{pairs[cur].perfect}</En>
          </div>
        </div>
      </Lab>
    </div>
  );
}

// ---------------- S11: النفي ----------------
function S11Negative() {
  const [shortForm, setShortForm] = useState(true);
  const examples = [
    { long: "I had not finished.", short: "I hadn't finished.", ar: "لم أكن قد أنهيت." },
    { long: "She had not arrived.", short: "She hadn't arrived.", ar: "لم تكن قد وصلت." },
    { long: "They had not eaten.", short: "They hadn't eaten.", ar: "لم يكونوا قد أكلوا." },
    { long: "He had not seen the movie.", short: "He hadn't seen the movie.", ar: "لم يكن قد شاهد الفيلم." },
    { long: "We had not finished the work.", short: "We hadn't finished the work.", ar: "لم نكن قد أنهينا العمل." },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <FormulaStrip items={["Subject", "+", shortForm ? "hadn't" : "had not", "+", "V3"]} />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setShortForm(!shortForm)}
          className="rounded-full border-2 border-violet-200 bg-white px-4 py-1.5 text-xs font-bold text-violet-900 shadow-sm"
        >
          🔄 التبديل بين الصيغة الكاملة والمختصرة (<En>{shortForm ? "hadn't" : "had not"}</En>)
        </button>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {examples.map((ex, i) => (
          <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-3.5">
            <EnAr en={shortForm ? ex.short : ex.long} ar={ex.ar} enClassName="text-lg font-bold text-slate-800" arClassName="mt-1 block text-sm font-semibold text-slate-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- S12: انتبه بعد hadn't ----------------
function S12NegativeV3Trap() {
  return (
    <div className="space-y-4">
      <Note emoji="🚨" text="قاعدة واحدة لا تتغير: بعد had و hadn't نستخدم V3 دائمًا!" />

      <Lab emoji="🎯" label="Correct vs Wrong in Negatives" ar="صحيح مقابل خاطئ في النفي">
        <Verdict ok={true} en="She hadn't eaten." ar="eat → ate → eaten (V3)" />
        <Verdict ok={false} en="She hadn't ate." why="ate هو V2 ❌" />
        <Verdict ok={true} en="They hadn't gone." ar="go → went → gone (V3)" />
        <Verdict ok={false} en="They hadn't went." why="went هو V2 ❌" />
        <Verdict ok={true} en="He hadn't seen it." ar="see → saw → seen (V3)" />
        <Verdict ok={false} en="He hadn't saw it." why="saw هو V2 ❌" />
      </Lab>
    </div>
  );
}

// ---------------- S13: الأسئلة ----------------
function S13Questions() {
  const qs = [
    { en: [P("Had", "had"), P("you", "s"), P("finished", "v3"), P("your homework", "obj")], ar: "هل كنت قد أنهيت واجبك؟" },
    { en: [P("Had", "had"), P("she", "s"), P("arrived", "v3"), P("before you", "obj")], ar: "هل كانت قد وصلت قبلك؟" },
    { en: [P("Had", "had"), P("they", "s"), P("eaten", "v3"), P("dinner", "obj")], ar: "هل كانوا قد تناولوا العشاء؟" },
    { en: [P("Had", "had"), P("he", "s"), P("seen", "v3"), P("the movie", "obj")], ar: "هل كان قد شاهد الفيلم؟" },
    { en: [P("Had", "had"), P("the train", "s"), P("left", "v3")], ar: "هل كان القطار قد غادر؟" },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <FormulaStrip items={["Had", "+", "Subject", "+", "V3", "?"]} />
      </div>

      <div className="space-y-2.5">
        {qs.map((q, i) => (
          <SentenceCard key={i} parts={q.en} roles={R27} ar={q.ar} q={true} size="sm" />
        ))}
      </div>
    </div>
  );
}

// ---------------- S14: الإجابات القصيرة ----------------
function S14ShortAnswers() {
  const items = [
    { q: "Had you finished?", pos: "Yes, I had.", neg: "No, I hadn't." },
    { q: "Had she arrived?", pos: "Yes, she had.", neg: "No, she hadn't." },
    { q: "Had they eaten?", pos: "Yes, they had.", neg: "No, they hadn't." },
  ];
  return (
    <div className="space-y-4" data-en-seq="l27-short-flip">
      <Note emoji="🗣️" text="في الإجابة القصيرة نستخدم had فقط: Yes, ... had. / No, ... hadn't." />

      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-3xl border-2 border-violet-100 bg-white p-4 text-center">
            <En className="font-en text-base font-extrabold text-violet-900">{it.q}</En>
            <div className="mt-3 space-y-1.5">
              <div className="rounded-xl bg-emerald-50 py-1.5 font-en text-sm font-bold text-emerald-800">
                ✓ {it.pos}
              </div>
              <div className="rounded-xl bg-rose-50 py-1.5 font-en text-sm font-bold text-rose-800">
                ✕ {it.neg}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- S15: الفرق بين Simple و Perfect ----------------
function S15SideBySide() {
  return (
    <div className="space-y-4" data-en-seq="l27-side-by-side">
      <Lab emoji="⚖️" label="Side-by-Side Comparison" ar="مقارنة مباشرة بين الجملتين">
        <div className="rounded-2xl border-2 border-orange-200 bg-orange-50/60 p-4">
          <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-black text-white">📸 Past Simple</span>
          <En className="mt-2 block text-xl font-extrabold text-orange-950">I finished my homework.</En>
          <p className="mt-1 text-sm font-semibold text-slate-700">«أنهيتُ واجبي» — نخبرك بحدث وقع في الماضي فقط.</p>
        </div>

        <div className="rounded-2xl border-2 border-violet-200 bg-violet-50/60 p-4">
          <span className="rounded-full bg-violet-700 px-2.5 py-0.5 text-xs font-black text-white">⏪ Past Perfect</span>
          <En className="mt-2 block text-xl font-extrabold text-violet-950">I had finished my homework before dinner.</En>
          <p className="mt-1 text-sm font-semibold text-slate-700">«كنت قد أنهيتُ واجبي قبل العشاء» — نحدد أن الإنهاء وقع قبل حدث ماضٍ آخر.</p>
        </div>
      </Lab>
    </div>
  );
}

// ---------------- S16: المقارنة الأهم — لينا ----------------
function S16LinaSwitch() {
  const [had, setHad] = useState(true);
  return (
    <div className="space-y-4" data-en-seq="l27-lina-switch">
      <Lab emoji="🔥" label="Lina Departure Switcher" ar="تبديل جملة لينا">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setHad(false)}
            className={`rounded-xl px-4 py-2 font-bold transition ${!had ? "bg-orange-500 text-white" : "border bg-white text-slate-700"}`}
          >
            <LatinRuns text="Lina left (بسيط)" />
          </button>
          <button
            type="button"
            onClick={() => setHad(true)}
            className={`rounded-xl px-4 py-2 font-bold transition ${had ? "bg-violet-700 text-white" : "border bg-white text-slate-700"}`}
          >
            <LatinRuns text="Lina had left (تام)" />
          </button>
        </div>

        {!had ? (
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-4 text-center">
            <En className="text-xl font-black text-orange-950">When I arrived, Lina left.</En>
            <div className="mt-2 text-sm font-bold text-slate-700">الترتيب الطبيعي: <EnAr en="I arrived → Lina left." enClassName="font-black" ar="(وصلتُ ثم غادرت هي)" /></div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4 text-center">
            <En className="text-xl font-black text-violet-950">When I arrived, Lina had left.</En>
            <div className="mt-2 text-sm font-bold text-violet-900">الترتيب المعكوس: <EnAr en="Lina left → I arrived." enClassName="font-black" ar="(كانت قد غادرت قبل وصولي)" /></div>
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- S17: before ----------------
function S17BeforeLab() {
  return (
    <div className="space-y-4" data-en-seq="l27-before">
      <Note emoji="⏱️" text="before = قبل. تساعدنا على ترتيب الأحداث: [Past Perfect] + before + [Past Simple]." />

      <SentenceCard
        parts={[P("The students", "s"), P("had", "had"), P("left", "v3"), P("before", "conn"), P("the teacher", "s"), P("arrived", "v2")]}
        roles={R27}
        ar="كان الطلاب قد غادروا قبل أن يصل المعلم."
        note="الترتيب: ① الطلاب غادروا ← ② المعلم وصل."
      />

      <SentenceCard
        parts={[P("I", "s"), P("had", "had"), P("locked", "v3"), P("the door", "obj"), P("before", "conn"), P("I", "s"), P("went", "v2"), P("to bed", "obj")]}
        roles={R27}
        ar="كنت قد أغلقت الباب قبل أن أذهب إلى النوم."
        note="الترتيب: ① أغلقت الباب ← ② ذهبت للنوم."
      />
    </div>
  );
}

// ---------------- S18: after ----------------
function S18AfterLab() {
  return (
    <div className="space-y-4" data-en-seq="l27-after">
      <Note emoji="🔄" text="after = بعد. النمط الشائع: After + [Past Perfect] ← [Past Simple]." />

      <SentenceCard
        parts={[P("After", "conn"), P("I", "s"), P("had", "had"), P("finished", "v3"), P("my project,", "obj"), P("I", "s"), P("watched", "v2"), P("a movie", "obj")]}
        roles={R27}
        ar="بعد أن كنت قد أنهيت مشروعي، شاهدت فيلمًا."
        note="الترتيب: ① finished project ← ② watched movie."
      />

      <SentenceCard
        parts={[P("After", "conn"), P("she", "s"), P("had", "had"), P("eaten", "v3"), P("dinner,", "obj"), P("she", "s"), P("went", "v2"), P("for a walk", "obj")]}
        roles={R27}
        ar="بعد أن كانت قد تناولت العشاء، ذهبت للمشي."
        note="الترتيب: ① أكلت العشاء ← ② ذهبت للمشي."
      />
    </div>
  );
}

// ---------------- S19: by the time ----------------
function S19ByTimeLab() {
  return (
    <div className="space-y-4" data-en-seq="l27-bytime">
      <Note emoji="⏳" text="by the time = بحلول الوقت الذي... وهي من أهم العبارات مع Past Perfect: ما بعدها حدث لاحق، وما قبلها/معها had حدث أسبق." />

      <SentenceCard
        parts={[P("By the time", "conn"), P("we", "s"), P("arrived,", "v2"), P("the concert", "s"), P("had", "had"), P("started", "v3")]}
        roles={R27}
        ar="بحلول الوقت الذي وصلنا فيه، كان الحفل قد بدأ."
        note="الترتيب: ① الحفل بدأ ← ② نحن وصلنا."
      />

      <SentenceCard
        parts={[P("By the time", "conn"), P("the doctor", "s"), P("arrived,", "v2"), P("the patient", "s"), P("had", "had"), P("fallen", "v3"), P("asleep", "obj")]}
        roles={R27}
        ar="عندما وصل الطبيب، كان المريض قد نام."
      />
    </div>
  );
}

// ---------------- S20: already ----------------
function S20Already() {
  return (
    <div className="space-y-4">
      <Note emoji="⭐" text="already = بالفعل / مسبقًا. موقعها بين had والفعل: had already + V3." />

      <SentenceCard
        parts={[P("When", "conn"), P("I", "s"), P("called", "v2"), P("Omar,", "obj"), P("he", "s"), P("had", "had"), P("already", "adv"), P("left", "v3")]}
        roles={R27}
        ar="عندما اتصلت بعمر، كان قد غادر بالفعل."
        note="الترتيب: ① Omar left ← ② I called."
      />

      <SentenceCard
        parts={[P("The students", "s"), P("had", "had"), P("already", "adv"), P("finished", "v3"), P("the test", "obj"), P("when the bell rang", "conn")]}
        roles={R27}
        ar="كان الطلاب قد أنهوا الاختبار بالفعل عندما رن الجرس."
      />
    </div>
  );
}

// ---------------- S21: just ----------------
function S21Just() {
  return (
    <div className="space-y-4">
      <Note emoji="⚡" text="just = للتو / قبل قليل جدًا. تدل على أن الحدث انتهى قبل لحظة النقطة الماضية مباشرة." />

      <SentenceCard
        parts={[P("When", "conn"), P("I", "s"), P("entered", "v2"), P("the kitchen,", "obj"), P("Mom", "s"), P("had", "had"), P("just", "adv"), P("finished", "v3"), P("cooking", "obj")]}
        roles={R27}
        ar="عندما دخلت المطبخ، كانت أمي قد انتهت من الطبخ للتو."
      />
    </div>
  );
}

// ---------------- S22: never ----------------
function S22Never() {
  return (
    <div className="space-y-4">
      <Note emoji="🧠" text="never = أبدًا. مع Past Perfect تعني أن التجربة لم تحدث إطلاقًا حتى تلك النقطة الماضية." />

      <SentenceCard
        parts={[P("Before that trip,", "conn"), P("I", "s"), P("had", "had"), P("never", "adv"), P("seen", "v3"), P("snow", "obj")]}
        roles={R27}
        ar="قبل تلك الرحلة، لم أكن قد رأيت الثلج أبدًا."
      />
    </div>
  );
}

// ---------------- S23: المثال الأسطوري — دانيال ----------------
function S23DanielLegend() {
  return (
    <div className="space-y-4">
      <SentenceCard
        parts={[P("When", "conn"), P("Daniel", "s"), P("arrived", "v2"), P("at the airport,", "obj"), P("his plane", "s"), P("had", "had"), P("already", "adv"), P("left", "v3")]}
        roles={R27}
        ar="عندما وصل دانيال إلى المطار، كانت طائرته قد غادرت بالفعل."
      />

      <DualPastTimeline
        firstEn="His plane had already left."
        firstAr="① الطائرة غادرت مسبقًا (Past Perfect)"
        secondEn="Daniel arrived at airport."
        secondAr="② دانيال وصل متأخرًا (Past Simple)"
      />
    </div>
  );
}

// ---------------- S24: Grammar Detective — إيما ----------------
function S24EmmaDetective() {
  const [ans, setAns] = useState<number | undefined>(undefined);
  return (
    <div className="space-y-4" data-en-seq="l27-emma-detective">
      <SentenceCard
        parts={[P("When", "conn"), P("Emma", "s"), P("got", "v2"), P("home,", "obj"), P("her brother", "s"), P("had", "had"), P("cooked", "v3"), P("dinner", "obj")]}
        roles={R27}
        ar="عندما وصلت إيما إلى البيت، كان أخوها قد طهى العشاء."
      />

      <Lab emoji="🕵️" label="Detective Question" ar="سؤال المحقق: هل كان أخوها يطبخ عندما دخلت، أم وجدته جاهزًا؟">
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setAns(0)}
            className={`flex-1 rounded-2xl border-2 p-3 font-bold transition ${ans === 0 ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-slate-200 bg-white"}`}
          >
            وجدت العشاء جاهزًا لأن الطهو اكتمل قبل وصولها
          </button>
          <button
            type="button"
            onClick={() => setAns(1)}
            className={`flex-1 rounded-2xl border-2 p-3 font-bold transition ${ans === 1 ? "border-rose-400 bg-rose-50 text-rose-950" : "border-slate-200 bg-white"}`}
          >
            كان يطبخ في تلك اللحظة
          </button>
        </div>

        {ans !== undefined && (
          <div className="mt-2 text-sm font-bold text-slate-800">
            {ans === 0 ? (
              <span className="text-emerald-700">✓ صحيح! العشاء كان جاهزًا لأن <En>had cooked</En> حدث أسبق. لو كان لا يزال يطبخ لقلنا: <En>was cooking</En>.</span>
            ) : (
              <span className="text-rose-600">✕ خطأ — <En>was cooking</En> هي التي تعني الاستمرار. أما <En>had cooked</En> فتعني الاكتمال قبل وصولها.</span>
            )}
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- S25: هل Past Perfect يعني دائمًا «كان قد»؟ ----------------
function S25Nuance() {
  return (
    <div className="space-y-4">
      <Note emoji="🔥" text="ليس دائمًا بالضرورة! في العربية قد نترجمها أحيانًا بماضٍ بسيط عادي، لكن التركيب الإنجليزي يُستخدم لأن المتحدث يريد تحديد أن حدثًا سبق حدثًا آخر." />
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-5 text-center">
        <p className="text-base font-bold leading-relaxed text-slate-800 md:text-lg">
          لا تبحث عن كلمة «كان قد» في رأسك لتقرر — ابحث عن <span className="text-violet-700 font-black">الترتيب الزمني بين الحدثين</span>!
        </p>
      </div>
    </div>
  );
}

// ---------------- S26: لا يعني «حدث منذ زمن طويل» ----------------
function S26MythBuster() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-rose-200 bg-rose-50/70 p-5">
        <div className="text-xs font-black uppercase text-rose-700">❌ خرافة شائعة</div>
        <div className="mt-1 text-lg font-black text-rose-950"><LatinRuns text="Past Perfect = حدث منذ زمن طويل جدًا؟" /></div>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          خطأ! قد يفصل بين الحدثين ثانية واحدة فقط. المهم ليس بُعد الحدث عن الحاضر، بل <span className="font-black text-violet-800">أسبقية حدث على حدث آخر</span>.
        </p>
      </div>

      <SentenceCard
        parts={[P("When I reached the station,", "conn"), P("the bus", "s"), P("had", "had"), P("arrived", "v3")]}
        roles={R27}
        ar="عندما وصلتُ إلى المحطة، كان الباص قد وصل (ربما قبل ثوانٍ فقط)."
      />
    </div>
  );
}

// ---------------- S27: ليس مطلوبًا دائمًا ----------------
function S27NotAlwaysNeeded() {
  return (
    <div className="space-y-4">
      <Note emoji="🚨" text="إذا كنت تتحدث عن حدث ماضٍ واحد فقط، استخدم Past Simple ولا تستخدم Past Perfect!" />
      <Verdict ok={true} en="Yesterday, I visited my grandmother." ar="زرتُ جدتي أمس. (حدث واحد ← Past Simple)" />
      <Verdict ok={false} en="Yesterday, I had visited my grandmother." why="خطأ: لا يوجد حدث ماضٍ ثانٍ لنقارن به!" />
    </div>
  );
}

// ---------------- S28: عندما يكون الترتيب واضحًا أصلًا ----------------
function S28OrderClear() {
  const [mode, setMode] = useState<"then" | "perfect">("then");
  return (
    <div className="space-y-4" data-en-seq="l27-need-toggle">
      <Lab emoji="🧩" label="Clear Sequence Toggle" ar="عندما يكون الترتيب مفهومًا بـ and then أو after">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("then")}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${mode === "then" ? "bg-orange-500 text-white" : "border bg-white text-slate-700"}`}
          >
            سلسلة أحداث مع and then
          </button>
          <button
            type="button"
            onClick={() => setMode("perfect")}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${mode === "perfect" ? "bg-violet-700 text-white" : "border bg-white text-slate-700"}`}
          >
            صيغة Past Perfect
          </button>
        </div>

        {mode === "then" ? (
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">
            <En className="text-lg font-black text-orange-950">I ate dinner and then I watched TV.</En>
            <p className="mt-1 text-xs font-bold text-slate-600"><LatinRuns text={"الماضي البسيط كافٍ وطبيعي جدًا لأن and then توضّح الترتيب."} /></p>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
            <En className="text-lg font-black text-violet-950">After I had eaten dinner, I watched TV.</En>
            <p className="mt-1 text-xs font-bold text-slate-600"><LatinRuns text={"كلاهما صحيح — Past Perfect يعطي تركيزًا إضافيًا على الأسبقية."} /></p>
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- S29: قاعدة IQ200 ----------------
function S29IqStepper() {
  const steps = [
    { n: "1", title: "هل هناك حدثان في الماضي؟", no: "حدث واحد فقط ← Past Simple", yes: "نعم ← انتقل للخطوة 2" },
    { n: "2", title: "هل وقع أحدهما قبل الآخر؟", no: "حدثان متزامنان ← Past Continuous", yes: "نعم ← انتقل للخطوة 3" },
    { n: "3", title: "هل ترتيبهما مهم وغير واضح؟", no: "الترتيب واضح بـ then ← Past Simple يصح", yes: "نعم ← استخدم Past Perfect للأقدم" },
    { n: "4", title: "طبق الصيغة:", no: "الحدث الأحدث ← Past Simple", yes: "الحدث الأقدم ← had + V3" },
  ];
  const [cur, setCur] = useState(0);

  return (
    <div className="space-y-4" data-en-seq="l27-iq-stepper">
      <Lab emoji="🧠" label="IQ200 4-Step Decision Stepper" ar="مخطط اتخاذ القرار في 4 خطوات">
        <div className="flex justify-center gap-1.5">
          {steps.map((st, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCur(i)}
              className={`grid h-9 w-9 place-items-center rounded-xl font-bold transition ${
                cur === i ? "bg-violet-700 text-white shadow" : "border bg-white text-slate-700"
              }`}
            >
              {st.n}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-violet-200 bg-white p-4">
          <div className="text-xs font-black text-violet-700">خطوة {steps[cur].n} من 4</div>
          <div className="mt-1 text-lg font-black text-slate-900">{mixedText(steps[cur].title)}</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-2.5 text-xs font-bold text-slate-700">
              ❌ إذا كان لا: {steps[cur].no}
            </div>
            <div className="rounded-xl bg-emerald-50 p-2.5 text-xs font-bold text-emerald-900">
              ✓ إذا كان نعم: {steps[cur].yes}
            </div>
          </div>
        </div>
      </Lab>
    </div>
  );
}

// ---------------- S30: تدريب 1 ----------------
function S30PracticeV3() {
  const [ansCount, setAnsCount] = useState(0);
  return (
    <div className="space-y-3.5" data-en-seq="l27-ex-v3">
      {EX27_V3.map((q) => (
        <McqRow key={q.n} n={q.n} stem={q.stem} opts={q.opts} answer={q.answer} why={q.why} onFirstAnswer={() => setAnsCount((c) => c + 1)} />
      ))}
      {ansCount >= 5 && (
        <SourceReveal text="إجابات المصدر: ① started  ② eaten  ③ gone  ④ written  ⑤ seen" />
      )}
    </div>
  );
}

// ---------------- S31: تدريب 2 ----------------
function S31PracticeHadHave() {
  const [ansCount, setAnsCount] = useState(0);
  return (
    <div className="space-y-3.5" data-en-seq="l27-ex-hadhave">
      <PlatformPanel>
        <Rich text="المصدر يقدم هذا التمرين لتثبيت أن had للماضي و have للحاضر. الإجابات مشتقة من القاعدة المصدرية." />
      </PlatformPanel>
      {EX27_HADHAVE.map((q) => (
        <McqRow key={q.n} n={q.n} stem={q.stem} opts={q.opts} answer={q.answer} why={q.why} onFirstAnswer={() => setAnsCount((c) => c + 1)} />
      ))}
      {ansCount >= 4 && (
        <SourceReveal text="إجابات التدريب 2: ① had  ② have  ③ had  ④ have" />
      )}
    </div>
  );
}

// ---------------- S32: تدريب 3 ----------------
function S32PracticeSimplePerfect() {
  const [ansCount, setAnsCount] = useState(0);
  return (
    <div className="space-y-3.5" data-en-seq="l27-ex-simple-perfect">
      <PlatformPanel>
        <Rich text="السياقات الموضحة أدناه تبيّن المعنى المقصود لكل جملة لإزالة أي لبس." />
      </PlatformPanel>
      {EX27_SIMPLE_PERFECT.map((q) => (
        <McqRow key={q.n} n={q.n} stem={q.stem} opts={q.opts} answer={q.answer} why={q.why} context={q.context} onFirstAnswer={() => setAnsCount((c) => c + 1)} />
      ))}
      {ansCount >= 5 && (
        <SourceReveal text="إجابات التدريب 3: ① had left  ② finished  ③ had closed  ④ visited  ⑤ had finished" />
      )}
    </div>
  );
}

// ---------------- S33: تدريب Noah ----------------
function S33Noah() {
  const [pick, setPick] = useState<string | undefined>(undefined);
  return (
    <div className="space-y-4" data-en-seq="l27-ex-noah">
      <SentenceCard
        parts={[P("When", "conn"), P("Noah", "s"), P("arrived", "v2"), P("at the station,", "obj"), P("the train", "s"), P("had", "had"), P("already", "adv"), P("disappeared", "v3")]}
        roles={R27}
        ar="عندما وصل نوح إلى المحطة، كان القطار قد اختفى مسبقًا."
      />

      <Lab emoji="🧠" label="Sequence Order Quiz" ar="أي حدث وقع أولًا؟">
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => setPick("A")}
            className={`flex-1 rounded-2xl border-2 p-3 font-bold transition ${pick === "A" ? "border-rose-400 bg-rose-50 text-rose-950" : "border-slate-200 bg-white"}`}
          >
            <LatinRuns text="A = Noah arrived (نوح وصل أولًا)" />
          </button>
          <button
            type="button"
            onClick={() => setPick("B")}
            className={`flex-1 rounded-2xl border-2 p-3 font-bold transition ${pick === "B" ? "border-emerald-400 bg-emerald-50 text-emerald-950" : "border-slate-200 bg-white"}`}
          >
            <LatinRuns text="B = The train disappeared (القطار اختفى أولًا)" />
          </button>
        </div>

        {pick !== undefined && (
          <div className={`text-sm font-bold ${pick === "B" ? "text-emerald-700" : "text-rose-600"}`}>
            {pick === "B" ? "✓ صحيح! الترتيب: B ثم A لأن had disappeared هي Past Perfect." : "✕ خطأ — had disappeared تدل على أن الاختفاء هو الأقدم (B ثم A)."}
          </div>
        )}

        {pick !== undefined && (
          <SourceReveal text="من المصدر: الإجابة B → A لأن The train had disappeared وقع قبل وصول نوح." />
        )}
      </Lab>
    </div>
  );
}

// ---------------- S34: اكتشف الخطأ ----------------
function S34ErrorHunter() {
  const [fixed, setFixed] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setFixed((p) => ({ ...p, [i]: !p[i] }));
  const allFixed = Object.keys(fixed).length >= 5;

  return (
    <div className="space-y-4" data-en-seq="l27-ex-errors">
      <Note emoji="🔍" text="اضغط على أي جملة لاكتشاف الخطأ وتصحيحه الفوري مع التعليل!" />

      <div className="space-y-2.5">
        {EX27_ERRORS.map((err, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className={`cursor-pointer rounded-2xl border-2 p-3.5 transition active:scale-98 ${
              fixed[i] ? "border-emerald-300 bg-emerald-50/70" : "border-rose-200 bg-rose-50/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">{err.n}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${fixed[i] ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
                {fixed[i] ? "✓ تم التصحيح" : "المس لكشف التصحيح"}
              </span>
            </div>
            <En className="mt-1.5 block text-lg font-bold text-rose-900 line-through decoration-rose-400">{err.wrong}</En>
            {fixed[i] && (
              <div className="tada mt-2 border-t border-emerald-200 pt-2">
                <En className="text-lg font-extrabold text-emerald-900">{err.fixed}</En>
                <div className="mt-1 text-xs font-bold text-emerald-700">📌 <Rich text={err.why} /></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {allFixed && (
        <SourceReveal text="إجابات المصدر: ① had gone  ② had eaten  ③ Had he finished?  ④ hadn't seen  ⑤ had already left" />
      )}
    </div>
  );
}

// ---------------- S35: تحدي التحويل ----------------
function S35Transform() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <div className="space-y-4" data-en-seq="l27-ex-transform">
      {/* المثال المحلول في المصدر */}
      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4">
        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-black text-white">المثال المحلول في المصدر</span>
        <div className="mt-2 text-sm font-bold text-slate-700">
          <En className="font-black text-slate-900">{EX27_TRANSFORM.worked.a}</En> + <En className="font-black text-slate-900">{EX27_TRANSFORM.worked.b}</En>
        </div>
        <div className="mt-2 text-sm font-black text-violet-800">
          ← <En>{EX27_TRANSFORM.worked.answer}</En>
        </div>
      </div>

      {/* التحدي 1 */}
      <div className="rounded-2xl border-2 border-violet-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-violet-900"><LatinRuns text={"تحدي 1: Sara finished the test. The teacher collected the papers."} /></span>
          <button
            type="button"
            onClick={() => setShow1(!show1)}
            className="rounded-xl bg-violet-700 px-3 py-1 text-xs font-bold text-white"
          >
            {show1 ? "إخفاء" : "تحقق"}
          </button>
        </div>
        {show1 && (
          <div className="tada mt-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-900">
            <En className="text-base font-extrabold">{EX27_TRANSFORM.items[0].answer}</En>
            <div className="mt-1 text-xs text-slate-600">📌 <Rich text={EX27_TRANSFORM.items[0].why} /></div>
          </div>
        )}
      </div>

      {/* التحدي 2 */}
      <div className="rounded-2xl border-2 border-violet-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="font-bold text-violet-900"><LatinRuns text={"تحدي 2 (أصعب): The children ate dinner. Their parents came home."} /></span>
          <button
            type="button"
            onClick={() => setShow2(!show2)}
            className="rounded-xl bg-violet-700 px-3 py-1 text-xs font-bold text-white"
          >
            {show2 ? "إخفاء" : "تحقق"}
          </button>
        </div>
        {show2 && (
          <div className="tada mt-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-900">
            <En className="text-base font-extrabold">{EX27_TRANSFORM.items[1].answer}</En>
            <div className="mt-1 text-xs text-slate-600">📌 <Rich text={EX27_TRANSFORM.items[1].why} /></div>
          </div>
        )}
      </div>

      {show1 && show2 && (
        <SourceReveal text="المصدر: Sara had finished the test before the teacher collected the papers. / The children had eaten dinner before their parents came home." />
      )}
    </div>
  );
}

// ---------------- S36: محقق المتحف المتقدم ----------------
function S36MuseumDetective() {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const setVerbTense = (idx: number, t: string) => setPicks((p) => ({ ...p, [idx]: t }));
  const allAnswered = Object.keys(picks).length >= 6;

  return (
    <div className="space-y-4" data-en-seq="l27-ex-museum">
      <div className="rounded-3xl border-2 border-slate-200 bg-slate-900 p-5 text-white">
        <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-slate-900">📜 قصة المتحف</span>
        <En className="mt-3 block text-base font-semibold leading-relaxed text-slate-200 md:text-lg">
          When the police arrived at the museum, the thief had disappeared. The guards were looking around, and several visitors were talking quietly. The police searched the building, but they couldn't find the thief.
        </En>
      </div>

      <Lab emoji="🕵️" label="Classify the 6 Verbs" ar="حدد زمن كل فعل من أفعال القصة الستة:">
        <div className="space-y-2.5">
          {DETECTIVE_27.map((item, i) => {
            const userPick = picks[i];
            const isRight = userPick === item.tense;
            return (
              <div key={i} className="flex flex-col gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <En className="text-lg font-black text-violet-900">{item.verb}</En>
                  <div className="text-xs text-slate-500">{item.role}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(["Past Simple", "Past Continuous", "Past Perfect"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setVerbTense(i, t)}
                      className={`rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                        userPick === t
                          ? isRight
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-600 text-white"
                          : "border bg-slate-50 text-slate-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Lab>

      {allAnswered && (
        <SourceReveal text="المصدر: had disappeared ← Past Perfect | arrived / searched / couldn't find ← Past Simple | were looking / were talking ← Past Continuous" />
      )}
    </div>
  );
}

// ---------------- S37: القصة السينمائية ----------------
function S37EmmaCinema() {
  const [lens, setLens] = useState<"all" | "bg" | "evt" | "flash">("all");
  return (
    <div className="space-y-4" data-en-seq="l27-emma-cinema">
      <div className="rounded-3xl border-2 border-violet-100 bg-white p-5">
        <En className="text-lg font-bold leading-relaxed text-slate-900 md:text-xl">
          Emma was walking through the old market when she found a mysterious key. She looked at it carefully and realized that she had seen it before.
        </En>
      </div>

      <Lab emoji="🎬" label="Cinematic 3-Camera Breakdown" ar="تفكيك المشهد بعدسات الإخراج الثلاث">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setLens("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold ${lens === "all" ? "bg-slate-900 text-white" : "border bg-white"}`}
          >
            المشهد كاملًا
          </button>
          <button
            type="button"
            onClick={() => setLens("bg")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold ${lens === "bg" ? "bg-sky-500 text-white" : "border bg-white"}`}
          >
            🎥 1. الخلفية المستمرة
          </button>
          <button
            type="button"
            onClick={() => setLens("evt")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold ${lens === "evt" ? "bg-orange-500 text-white" : "border bg-white"}`}
          >
            📸 2. الأحداث المتتابعة
          </button>
          <button
            type="button"
            onClick={() => setLens("flash")}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold ${lens === "flash" ? "bg-violet-700 text-white" : "border bg-white"}`}
          >
            ⏪ 3. الفلاش باك
          </button>
        </div>

        <div className="space-y-2 text-sm font-bold">
          {(lens === "all" || lens === "bg") && (
            <div className="rounded-xl border border-sky-300 bg-sky-50 p-3 text-sky-950">
              🎥 <EnAr en="was walking" enClassName="font-black" sep="→" ar="خلفية مستمرة (Past Continuous)" />
            </div>
          )}
          {(lens === "all" || lens === "evt") && (
            <div className="rounded-xl border border-orange-300 bg-orange-50 p-3 text-orange-950">
              📸 <EnAr en="found · looked · realized" enClassName="font-black" sep="→" ar="أحداث متتابعة (Past Simple)" />
            </div>
          )}
          {(lens === "all" || lens === "flash") && (
            <div className="rounded-xl border border-violet-300 bg-violet-50 p-3 text-violet-950">
              ⏪ <EnAr en="had seen" enClassName="font-black" sep="→" ar="شيء حدث قبل لحظة إدراكها (Past Perfect)" />
            </div>
          )}
        </div>
      </Lab>
    </div>
  );
}

// ---------------- S38: مشهد Liam ----------------
function S38LiamScene() {
  return (
    <div className="space-y-4" data-en-seq="l27-liam">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4 text-center">
          <div className="text-2xl">🎥</div>
          <span className="rounded-full bg-sky-500 px-2.5 py-0.5 text-xs font-black text-white">Past Continuous</span>
          <En className="mt-2 block text-lg font-black text-sky-950">Liam was studying.</En>
          <div className="mt-1 text-xs font-bold text-slate-600">ماذا كان يحدث؟ (عند الساعة 8:00)</div>
        </div>

        <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-4 text-center">
          <div className="text-2xl">📸</div>
          <span className="rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-black text-white">Past Simple</span>
          <En className="mt-2 block text-lg font-black text-orange-950">His phone rang.</En>
          <div className="mt-1 text-xs font-bold text-slate-600">ماذا حدث؟ (الحدث القاطع)</div>
        </div>

        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4 text-center">
          <div className="text-2xl">⏪</div>
          <span className="rounded-full bg-violet-700 px-2.5 py-0.5 text-xs font-black text-white">Past Perfect</span>
          <En className="mt-2 block text-lg font-black text-violet-950">He had forgotten to charge it.</En>
          <div className="mt-1 text-xs font-bold text-slate-600">ماذا كان قد حدث قبل ذلك؟</div>
        </div>
      </div>

      <Note emoji="💡" text="هذه هي قوة اللغة الإنجليزية: ثلاثة أزمنة تعمل معًا لتصنع مشهدًا سينمائيًا متكاملًا!" />
    </div>
  );
}

// ---------------- S39: تحدي IQ200 الحقيقي ----------------
function S39OrderChallenge() {
  const [seq, setSeq] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const items = ORDER_27_CHALLENGE.items;

  const toggleItem = (k: string) => {
    if (seq.includes(k)) setSeq(seq.filter((x) => x !== k));
    else if (seq.length < 4) setSeq([...seq, k]);
  };

  const isAccepted = ORDER_27_CHALLENGE.accept.some(
    (acc) => acc.length === seq.length && acc.every((v, i) => v === seq[i])
  );

  return (
    <div className="space-y-4" data-en-seq="l27-ex-order">
      <Note emoji="🏆" text="رتّب الأحداث الأربعة التالية لبناء قصة متناسقة:" />

      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((it) => {
          const idx = seq.indexOf(it.key);
          const chosen = idx !== -1;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => {
                setChecked(false);
                toggleItem(it.key);
              }}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-right transition active:scale-98 ${
                chosen ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white hover:border-violet-200"
              }`}
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl font-en font-black ${chosen ? "bg-violet-700 text-white" : "bg-slate-100 text-slate-600"}`}>
                {chosen ? idx + 1 : it.key}
              </span>
              <div>
                <En className="font-bold text-slate-900">{it.en}</En>
                <div className="text-xs text-slate-500"><LatinRuns text={it.ar ?? ""} /></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="font-en text-sm font-bold text-slate-700">
          الترتيب المختار: {seq.length > 0 ? seq.join(" → ") : "اضغط على البطاقات بالترتيب"}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setSeq([]);
              setChecked(false);
            }}
            className="rounded-xl border px-3 py-1.5 text-xs font-bold text-slate-600"
          >
            إعادة تعيين
          </button>
          <button
            type="button"
            disabled={seq.length < 4}
            onClick={() => setChecked(true)}
            className="rounded-xl bg-violet-700 px-4 py-1.5 text-xs font-bold text-white disabled:opacity-40"
          >
            تحقق
          </button>
        </div>
      </div>

      {checked && (
        <div className="space-y-3">
          <div className={`rounded-2xl border-2 p-4 text-sm font-bold ${isAccepted ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-amber-300 bg-amber-50 text-amber-950"}`}>
            {isAccepted ? "✓ ترتيب ممتاز متوافق مع المعنى!" : "📌 فكّر في أسبقية إنهاء التمرين ودخول المعلم."}
          </div>
          <SourceReveal text={`القصة من المصدر: ${ORDER_27_CHALLENGE.story}`} />
          <Note emoji="💡" text={ORDER_27_CHALLENGE.nuance} />
        </div>
      )}
    </div>
  );
}

// ---------------- S40: سؤال John ----------------
function S40JohnSwitch() {
  const [had, setHad] = useState(false);
  return (
    <div className="space-y-4" data-en-seq="l27-john-switch">
      <Lab emoji="🧠" label="John Arrival / Departure Switch" ar="سؤال صعب جدًا: ما الفرق الدقيق بين الجملتين؟">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setHad(false)}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${!had ? "bg-orange-500 text-white" : "border bg-white"}`}
          >
            John left
          </button>
          <button
            type="button"
            onClick={() => setHad(true)}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${had ? "bg-violet-700 text-white" : "border bg-white"}`}
          >
            John had left
          </button>
        </div>

        {!had ? (
          <div className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-4">
            <En className="text-xl font-black text-orange-950">When I arrived, John left.</En>
            <p className="mt-1 text-sm font-bold text-slate-700">الأولى: <EnAr en="I arrived → John left." ar="(وصلتُ ثم غادر جون)" /></p>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
            <En className="text-xl font-black text-violet-950">When I arrived, John had left.</En>
            <p className="mt-1 text-sm font-bold text-violet-900">الثانية: <En>John left → I arrived.</En> (كان جون قد غادر قبل وصولي)</p>
          </div>
        )}

        <div className="text-center text-xs font-bold text-slate-500">
          تغيير صغير جدًا في الكلمة، لكنه يغيّر ترتيب الأحداث بالكامل!
        </div>
      </Lab>
    </div>
  );
}

// ---------------- S41: had danced أم was dancing؟ ----------------
function S41DancePrecision() {
  const [choice, setChoice] = useState<"perfect" | "continuous">("continuous");
  return (
    <div className="space-y-4" data-en-seq="l27-dance">
      <Note emoji="🚀" text="IQ200: هل جملة «When I arrived at the party, everyone had danced» صحيحة نحويًا؟ نعم صحيحة نحويًا، لكن معناها: كان الجميع قد رقصوا وانتهوا قبل وصولي!" />

      <Lab emoji="💃" label="Party Dance Precision Lab" ar="قارن بين المعنيين:">
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setChoice("continuous")}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${choice === "continuous" ? "bg-sky-500 text-white" : "border bg-white"}`}
          >
            كانوا يرقصون (مستمر)
          </button>
          <button
            type="button"
            onClick={() => setChoice("perfect")}
            className={`rounded-xl px-3.5 py-1.5 font-bold ${choice === "perfect" ? "bg-violet-700 text-white" : "border bg-white"}`}
          >
            كانوا قد رقصوا وانتهوا
          </button>
        </div>

        {choice === "continuous" ? (
          <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
            <En className="text-lg font-black text-sky-950">When I arrived at the party, everyone was dancing.</En>
            <div className="mt-1 text-sm font-bold text-sky-900">→ الرقص كان مستمرًا في لحظة وصولي (🎥).</div>
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
            <En className="text-lg font-black text-violet-950">When I arrived at the party, everyone had danced.</En>
            <div className="mt-1 text-sm font-bold text-violet-900">→ الرقص حدث وانتهى قبل وصولي (⏪).</div>
          </div>
        )}
      </Lab>
    </div>
  );
}

// ---------------- S42: Boss Battle ----------------
function S42BossBattle() {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const setBattle = (n: number, opt: number) => setPicks((p) => ({ ...p, [n]: opt }));
  const done = Object.keys(picks).length >= 2;

  return (
    <div className="space-y-4" data-en-seq="l27-ex-boss">
      <Note emoji="⚔️" text="Boss Battle: اختر الجملة التي تناسب المعنى المقصود بالضبط!" />

      {BOSS_27.map((b) => {
        const userPick = picks[b.n];
        return (
          <div key={b.n} className="rounded-3xl border-2 border-violet-100 bg-white p-4">
            <div className="text-base font-black text-slate-900">{b.meaning}</div>
            <div className="mt-2.5 space-y-2">
              {b.opts.map((opt, oi) => (
                <button
                  key={oi}
                  type="button"
                  onClick={() => setBattle(b.n, oi)}
                  className={`w-full rounded-2xl border-2 p-3 text-right font-en font-bold transition active:scale-98 ${
                    userPick === oi
                      ? oi === b.answer
                        ? "border-emerald-400 bg-emerald-50 text-emerald-950 shadow-sm"
                        : "border-rose-400 bg-rose-50 text-rose-950"
                      : "border-slate-100 bg-slate-50 text-slate-800 hover:border-violet-200"
                  }`}
                >
                  <span className="font-mono font-black">{oi === 0 ? "A" : "B"}.</span> {opt}
                </button>
              ))}
            </div>
            {userPick !== undefined && (
              <div className={`mt-2 text-xs font-bold ${userPick === b.answer ? "text-emerald-700" : "text-rose-600"}`}>
                📌 <Rich text={b.why} />
              </div>
            )}
          </div>
        );
      })}

      {done && (
        <SourceReveal text="المصدر: المعركة 1: B (was sleeping) | المعركة 2: B (had left)" />
      )}
    </div>
  );
}

// ---------------- S43: الاختبار النهائي المورّد ----------------
function S43Final10() {
  const [ansCount, setAnsCount] = useState(0);
  return (
    <div className="space-y-3.5" data-en-seq="l27-ex-final10">
      <PlatformPanel>
        <Rich text={TYPO_S43_Q2.note} />
      </PlatformPanel>

      {EX27_FINAL.map((q) => (
        <McqRow key={q.n} n={q.n} stem={q.stem} opts={q.opts} answer={q.answer} why={q.why} context={q.context} onFirstAnswer={() => setAnsCount((c) => c + 1)} />
      ))}

      {ansCount >= 10 && (
        <SourceReveal text="إجابات الاختبار النهائي المورّد: 1. had started  2. found  3. were eating  4. had lost  5. had left  6. visited  7. read  8. seen  9. was watching  10. gone" />
      )}
    </div>
  );
}

// ---------------- S44: استوديو القصة ----------------
function S44StoryStudio() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) return { sentences: 0, ps: 0, pc: 0, pp: 0, when: false, whileWord: false, beforeAfter: false };
    const sentences = raw.split(/[.?!]+/).filter((s) => s.trim().length > 3).length;
    const ps = (raw.match(/\b(noticed|opened|stepped|saw|looked|realized|ran|arrived|found|walked|went|came)\b/gi) || []).length;
    const pc = (raw.match(/\b(was|were)\s+[a-z]+ing\b/gi) || []).length;
    const pp = (raw.match(/\bhad\s+(?:already\s+|never\s+|just\s+)?([a-z]+ed|seen|heard|brought|entered|lived|gone|left|lost|done|taken)\b/gi) || []).length;
    const when = /\bwhen\b/i.test(raw);
    const whileWord = /\bwhile\b/i.test(raw);
    const beforeAfter = /\b(before|after)\b/i.test(raw);
    return { sentences, ps, pc, pp, when, whileWord, beforeAfter };
  }, [text]);

  const insertStarter = () => {
    if (!text.includes(STORY_27_STARTER)) {
      setText((t) => (t ? `${t}\n${STORY_27_STARTER}` : STORY_27_STARTER));
    }
  };

  const reqList = [
    { label: "10 جمل على الأقل", ok: stats.sentences >= 10, val: `${stats.sentences}/10` },
    { label: "3 جمل Past Simple على الأقل", ok: stats.ps >= 3, val: `${stats.ps}/3` },
    { label: "2 جمل Past Continuous على الأقل", ok: stats.pc >= 2, val: `${stats.pc}/2` },
    { label: "3 جمل Past Perfect على الأقل", ok: stats.pp >= 3, val: `${stats.pp}/3` },
    { label: "استخدام when", ok: stats.when, val: stats.when ? "✓" : "—" },
    { label: "استخدام while", ok: stats.whileWord, val: stats.whileWord ? "✓" : "—" },
    { label: "استخدام before أو after", ok: stats.beforeAfter, val: stats.beforeAfter ? "✓" : "—" },
  ];

  return (
    <div className="space-y-4" data-en-seq="l27-ex-story">
      <div className="rounded-3xl border-2 border-violet-100 bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="font-head text-lg font-black text-violet-950"><LatinRuns text="«The Mysterious Door» — الباب الغامض" /></span>
          <button
            type="button"
            onClick={insertStarter}
            className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800"
          >
            + إدراج جملة البداية
          </button>
        </div>
        <div className="mt-2 text-xs text-slate-500">
          بداية مقترحة: <En className="font-bold text-slate-800">{STORY_27_STARTER}</En>
        </div>
      </div>

      <textarea
        dir="ltr"
        style={{ direction: "ltr" }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your story here in English..."
        rows={7}
        className="w-full rounded-2xl border-2 border-slate-200 bg-white p-4 font-en text-base font-semibold text-slate-900 shadow-inner focus:border-violet-500 focus:outline-none"
      />

      <Lab emoji="📊" label="Live Requirements Tracker" ar="محلل المتطلبات الفوري للقصة">
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {reqList.map((req, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-xl border-2 p-2.5 text-xs font-bold ${
                req.ok ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-slate-100 bg-slate-50 text-slate-600"
              }`}
            >
              <span><LatinRuns text={req.label} /></span>
              <span className={`font-mono font-black ${req.ok ? "text-emerald-700" : "text-slate-400"}`}>{req.val}</span>
            </div>
          ))}
        </div>
      </Lab>
    </div>
  );
}

// ---------------- الخواتم والملخصات ----------------
function GoldenSummary() {
  return (
    <div className="space-y-4">
      <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 text-center">
        <span className="text-4xl">🧠</span>
        <h3 className="font-head mt-2 text-2xl font-black text-amber-950"><LatinRuns text={"الملخص الذهبي لـ Past Perfect"} /></h3>
        <p className="mt-2 text-base font-semibold text-amber-900">
          حدث أقدم في الماضي + حدث أحدث في الماضي.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">🟢 المثبت</span>
          <En className="mt-2 block text-lg font-black">Subject + had + V3</En>
        </div>
        <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-black text-rose-800">❌ النفي</span>
          <En className="mt-2 block text-lg font-black">Subject + hadn't + V3</En>
        </div>
        <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-black text-violet-800">❓ السؤال</span>
          <En className="mt-2 block text-lg font-black">Had + Subject + V3?</En>
        </div>
        <div className="rounded-2xl border-2 border-slate-100 bg-white p-4">
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-black text-sky-800">🗣️ الإجابة القصيرة</span>
          <En className="mt-2 block text-lg font-black">Yes, ... had. / No, ... hadn't.</En>
        </div>
      </div>
    </div>
  );
}

function WordsSummary() {
  const words = [
    { en: "before", ar: "قبل" },
    { en: "after", ar: "بعد" },
    { en: "by the time", ar: "بحلول الوقت الذي" },
    { en: "already", ar: "بالفعل / مسبقًا" },
    { en: "just", ar: "للتوّ" },
    { en: "never", ar: "أبدًا حتى تلك اللحظة" },
  ];
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
      {words.map((w) => (
        <div key={w.en} className="rounded-2xl border-2 border-violet-100 bg-white p-4 text-center">
          <EnAr en={w.en} ar={w.ar} enClassName="text-xl font-black text-violet-900" arClassName="mt-1 block text-sm font-bold text-slate-600" />
        </div>
      ))}
    </div>
  );
}

function KeyRule() {
  return (
    <div className="space-y-4 text-center">
      <div className="rounded-3xl border-2 border-violet-300 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-md">
        <span className="text-4xl">🚨</span>
        <h3 className="font-head mt-2 text-2xl font-black"><LatinRuns text={"إذا رأيت had فكّر مباشرة بـ V3"} /></h3>
        <En className="mt-2 block text-xl font-extrabold text-violet-200">had + V3 (NOT V2!)</En>
      </div>

      <div className="grid gap-2 sm:grid-cols-5">
        {["go → went → gone", "eat → ate → eaten", "see → saw → seen", "write → wrote → written", "take → took → taken"].map((row) => (
          <div key={row} className="rounded-xl border border-slate-200 bg-white p-2.5 font-en text-xs font-bold text-slate-800">
            {row}
          </div>
        ))}
      </div>
    </div>
  );
}

function TenseMap() {
  const mapItems = [
    { n: "①", en: "Present Simple", ar: "العادات والحقائق" },
    { n: "②", en: "Present Continuous", ar: "ما يحدث الآن أو في الفترة الحالية" },
    { n: "③", en: "Past Simple", ar: "حدث وقع وانتهى في الماضي" },
    { n: "④", en: "Past Continuous", ar: "شيء كان يحدث في لحظة ماضية" },
    { n: "⑤", en: "Past Simple vs Continuous", ar: "حدث قاطع مقابل نشاط مستمر" },
    { n: "⑥", en: "Past Perfect", ar: "حدث أقدم من حدث ماضٍ آخر" },
  ];
  return (
    <div className="space-y-2.5">
      {mapItems.map((it) => (
        <div key={it.n} className="flex items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white p-3.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-700 font-bold text-white">
            {it.n}
          </span>
          <div>
            <En className="text-base font-black text-slate-900">{it.en}</En>
            <div className="text-xs font-bold text-slate-500"><LatinRuns text={it.ar ?? ""} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FinalRule() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border-2 border-orange-200 bg-orange-50 p-5 text-center">
          <div className="text-3xl">📸</div>
          <En className="mt-1 block text-lg font-black text-orange-950">Past Simple</En>
          <div className="mt-1 text-sm font-bold text-orange-900">ماذا حدث؟</div>
        </div>
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-5 text-center">
          <div className="text-3xl">🎥</div>
          <En className="mt-1 block text-lg font-black text-sky-950">Past Continuous</En>
          <div className="mt-1 text-sm font-bold text-sky-900">ماذا كان يحدث؟</div>
        </div>
        <div className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 text-center">
          <div className="text-3xl">⏪</div>
          <En className="mt-1 block text-lg font-black text-violet-950">Past Perfect</En>
          <div className="mt-1 text-sm font-bold text-violet-900">ماذا كان قد حدث قبل ذلك؟</div>
        </div>
      </div>
      <Note emoji="🧠" text="إذا استطعت أن تجيب عن هذه الأسئلة الثلاثة، فأنت تفكر بالزمن كما يفكر به المتحدث باللغة الإنجليزية!" />
    </div>
  );
}

function ClosingStep({ onGoTest }: { onGoTest: () => void }) {
  return (
    <div className="space-y-5 text-center">
      <div className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-600 to-indigo-800 p-8 text-white shadow-lg">
        <div className="text-5xl anim-drift">🏆</div>
        <h3 className="font-head mt-3 text-2xl font-black md:text-3xl"><LatinRuns text={"أحسنت! — LESSON 27 COMPLETE"} /></h3>
        <p className="mt-2 text-base font-semibold text-violet-100 md:text-lg">
          <LatinRuns text="أكملت الدرس 27: Past Perfect — الماضي التام. الآن أنت جاهز لاختبار فهمك عبر 20 سؤالًا شاملة!" />
        </p>
      </div>

      <button
        type="button"
        onClick={onGoTest}
        className="inline-flex items-center gap-2 rounded-2xl bg-violet-700 px-8 py-3.5 text-lg font-black text-white shadow-md transition active:scale-95 hover:bg-violet-800"
      >
        <span>📝</span>
        <span>انتقل إلى منطقة الاختبارات (20 سؤالًا)</span>
      </button>
    </div>
  );
}

// ============================================================
// تعريف الخطوات الـ 53 (تغطية كاملة لسجل المصدر)
// ============================================================

type Slide = {
  id: string;
  section: string;
  mascot: string;
  title: string;
  step?: string;
  lead?: string;
  tip?: string;
  sourceTag?: string;
};

const slides: Slide[] = [
  { id: "cover", section: "البداية", mascot: "⏪", title: "الغلاف — الدرس 27: Past Perfect", sourceTag: "الغلاف — الدرس 27: Past Perfect — الماضي التام" },
  { id: "bridge", section: "البداية", mascot: "🧠", title: "الافتتاح — كيف نرتّب حدثين في الماضي؟", sourceTag: "الافتتاح — 🧠 IQ200: كيف نعرف أي حدث حدث أولًا في الماضي؟" },
  { id: "objectives", section: "البداية", mascot: "🎯", title: "أهداف الدرس العشرة", sourceTag: "🎯 أهداف الدرس" },
  { id: "s1", section: "المفهوم", mascot: "🧠", title: "ما هو Past Perfect؟", step: "1", lead: "الحدث الأقدم في الماضي = Past Perfect · الأحدث = Past Simple.", tip: "القطار غادر أولًا ثم وصلت: The train had left.", sourceTag: "① 🧠 ما هو Past Perfect؟" },
  { id: "s2", section: "المفهوم", mascot: "🔥", title: "الفكرة الذهبية — «كان قد فعل»", step: "2", sourceTag: "② 🔥 الفكرة الذهبية" },
  { id: "s3", section: "المفهوم", mascot: "🕰️", title: "خط الزمن — سارة في السينما", step: "3", sourceTag: "③ 🕰️ خط الزمن" },
  { id: "s4", section: "التكوين", mascot: "⭐", title: "كيف نكوّن Past Perfect؟", step: "4", lead: "Subject + had + V3 — و had لا تتغير مع أي ضمير!", sourceTag: "④ ⭐ كيف نكوّن Past Perfect؟" },
  { id: "s5", section: "التكوين", mascot: "🧱", title: "ما هو V3؟ (Past Participle)", step: "5", lead: "الأفعال المنتظمة وغير المنتظمة.", sourceTag: "⑤ 🧱 ما هو V3؟" },
  { id: "s6", section: "التكوين", mascot: "🚨", title: "لا تخلط بين V2 و V3!", step: "6", lead: "had gone وليس had went!", sourceTag: "⑥ 🚨 لا تخلط بين V2 و V3" },
  { id: "s7", section: "الاستخدام", mascot: "🧠", title: "لماذا نحتاج Past Perfect أصلًا؟", step: "7", lead: "مفتاح المعلم: كلمة had تقلب الترتيب الزمني!", sourceTag: "⑦ 🧠 لماذا نحتاج Past Perfect أصلًا؟" },
  { id: "s8", section: "الاستخدام", mascot: "🎯", title: "مثال ذكي جدًا — علي والمطعم", step: "8", sourceTag: "⑧ 🎯 مثال ذكي جدًا" },
  { id: "s9", section: "الجمل", mascot: "🟢", title: "الجملة المثبتة", step: "9", lead: "Subject + had + V3", sourceTag: "⑨ 🟢 الجملة المثبتة" },
  { id: "s10", section: "الجمل", mascot: "🔥", title: "مع الأفعال غير المنتظمة", step: "10", sourceTag: "⑩ 🔥 Past Perfect مع الأفعال غير المنتظمة" },
  { id: "s11", section: "النفي والسؤال", mascot: "❌", title: "النفي — hadn't + V3", step: "11", sourceTag: "⑪ ❌ النفي" },
  { id: "s12", section: "النفي والسؤال", mascot: "🚨", title: "انتبه! V3 بعد hadn't أيضًا", step: "12", sourceTag: "⑫ 🚨 انتبه!" },
  { id: "s13", section: "النفي والسؤال", mascot: "❓", title: "الأسئلة — Had + Subject + V3?", step: "13", sourceTag: "⑬ ❓ الأسئلة" },
  { id: "s14", section: "النفي والسؤال", mascot: "🗣️", title: "الإجابات القصيرة", step: "14", sourceTag: "⑭ 🗣️ الإجابات القصيرة" },
  { id: "s15", section: "المقارنات", mascot: "🧠", title: "الفرق بين Past Simple و Past Perfect", step: "15", sourceTag: "⑮ 🧠 الفرق بين Past Simple و Past Perfect" },
  { id: "s16", section: "المقارنات", mascot: "🔥", title: "المقارنة الأهم — Lina left أم had left؟", step: "16", sourceTag: "⑯ 🔥 المقارنة الأهم" },
  { id: "s17", section: "أدوات الربط", mascot: "⏱️", title: "before = قبل", step: "17", sourceTag: "⑰ ⏱️ before" },
  { id: "s18", section: "أدوات الربط", mascot: "🔄", title: "after = بعد", step: "18", sourceTag: "⑱ 🔄 after" },
  { id: "s19", section: "أدوات الربط", mascot: "⏳", title: "by the time = بحلول الوقت الذي", step: "19", sourceTag: "⑲ ⏳ by the time" },
  { id: "s20", section: "الظروف", mascot: "⭐", title: "already = مسبقًا / بالفعل", step: "20", sourceTag: "⑳ ⭐ already" },
  { id: "s21", section: "الظروف", mascot: "⚡", title: "just = للتوّ", step: "21", sourceTag: "㉑ ⚡ just" },
  { id: "s22", section: "الظروف", mascot: "🧠", title: "never = أبدًا", step: "22", sourceTag: "㉒ 🧠 never" },
  { id: "s23", section: "أمثلة", mascot: "🏆", title: "المثال الأسطوري — Daniel في المطار", step: "23", sourceTag: "㉓ 🏆 المثال الأسطوري" },
  { id: "s24", section: "أمثلة", mascot: "🕵️", title: "Grammar Detective — Emma والعشاء", step: "24", sourceTag: "㉔ 🕵️ Grammar Detective" },
  { id: "s25", section: "مفاهيم دقيقة", mascot: "🔥", title: "هل يعني دائمًا «كان قد»؟", step: "25", sourceTag: "㉕ 🔥 هل Past Perfect يعني دائمًا «كان قد»؟" },
  { id: "s26", section: "مفاهيم دقيقة", mascot: "🧠", title: "لا يعني «حدث منذ زمن طويل»", step: "26", sourceTag: "㉖ 🧠 Past Perfect لا يعني «حدث منذ زمن طويل»" },
  { id: "s27", section: "مفاهيم دقيقة", mascot: "🚨", title: "Past Perfect ليس مطلوبًا دائمًا", step: "27", sourceTag: "㉗ 🚨 Past Perfect ليس مطلوبًا دائمًا" },
  { id: "s28", section: "مفاهيم دقيقة", mascot: "🧩", title: "عندما يكون الترتيب واضحًا أصلًا", step: "28", sourceTag: "㉘ 🧩 عندما يكون الترتيب واضحًا أصلًا" },
  { id: "s29", section: "قواعد IQ200", mascot: "🧠", title: "قاعدة IQ200 — أربع خطوات", step: "29", sourceTag: "㉙ 🧠 قاعدة IQ200" },
  { id: "s30", section: "التدريبات", mascot: "🧪", title: "تدريب 1 — اختر الفعل الصحيح", step: "30", sourceTag: "㉚ 🧪 تدريب 1 — اختر الفعل الصحيح" },
  { id: "s31", section: "التدريبات", mascot: "🧪", title: "تدريب 2 — had أو have؟", step: "31", sourceTag: "㉛ 🧪 تدريب 2 — had أو have؟" },
  { id: "s32", section: "التدريبات", mascot: "🧪", title: "تدريب 3 — Past Simple أم Past Perfect؟", step: "32", sourceTag: "㉜ 🧪 تدريب 3 — Past Simple أم Past Perfect؟" },
  { id: "s33", section: "تحديات", mascot: "🧠", title: "تدريب IQ200 — رتّب أحداث Noah", step: "33", sourceTag: "㉝ 🧠 تدريب IQ200 — رتّب الأحداث" },
  { id: "s34", section: "تحديات", mascot: "🔍", title: "تدريب IQ200 — اكتشف الخطأ", step: "34", sourceTag: "㉞ 🧠 تدريب IQ200 — اكتشف الخطأ" },
  { id: "s35", section: "تحديات", mascot: "🔥", title: "تحدي التحويل — ادمج الجملتين", step: "35", sourceTag: "㉟ 🔥 تحدي التحويل" },
  { id: "s36", section: "المحقق المتقدم", mascot: "🕵️", title: "محقق المتحف — المستوى المتقدم", step: "36", sourceTag: "㊱ 🕵️ Grammar Detective — المستوى المتقدم" },
  { id: "s37", section: "السينما", mascot: "🎬", title: "القصة السينمائية — Emma والمفتاح الغامض", step: "37", sourceTag: "㊲ 🎬 القصة السينمائية" },
  { id: "s38", section: "السينما", mascot: "🧠", title: "الفرق بين الأزمنة الثلاثة — مشهد Liam", step: "38", sourceTag: "㊳ 🧠 الفرق بين الأزمنة الثلاثة" },
  { id: "s39", section: "التحديات الكبرى", mascot: "🏆", title: "تحدي IQ200 الحقيقي — رتّب أحداث الصف", step: "39", sourceTag: "㊴ 🏆 تحدي IQ200 الحقيقي" },
  { id: "s40", section: "التحديات الكبرى", mascot: "🧠", title: "سؤال صعب جدًا — John left أم had left؟", step: "40", sourceTag: "㊵ 🧠 سؤال صعب جدًا" },
  { id: "s41", section: "التحديات الكبرى", mascot: "🚀", title: "IQ200 — had danced أم was dancing؟", step: "41", sourceTag: "㊶ 🚀 IQ200 — هل يمكنك اكتشاف المشكلة؟" },
  { id: "s42", section: "Boss Battle", mascot: "⚔️", title: "Boss Battle — معركتان مصيريتان", step: "42", sourceTag: "㊷ ⚔️ Boss Battle" },
  { id: "s43", section: "الاختبار المورّد", mascot: "🧪", title: "الاختبار النهائي المورّد — 10 أسئلة", step: "43", sourceTag: "㊸ 🧪 الاختبار النهائي" },
  { id: "s44", section: "استوديو القصة", mascot: "🏆", title: "المهمة النهائية — Build the Story", step: "44", sourceTag: "㊹ 🏆 المهمة النهائية — Build the Story" },
  { id: "golden", section: "الخاتمة", mascot: "🧠", title: "الملخص الذهبي", sourceTag: "🧠 الملخص الذهبي" },
  { id: "words", section: "الخاتمة", mascot: "⭐", title: "الكلمات المهمة", sourceTag: "⭐ الكلمات المهمة" },
  { id: "rule", section: "الخاتمة", mascot: "🧠", title: "القاعدة التي يجب ألا تنساها", sourceTag: "🧠 القاعدة التي يجب ألا تنساها" },
  { id: "map", section: "الخاتمة", mascot: "🗺️", title: "خريطة الأزمنة التي وصلنا إليها", sourceTag: "🗺️ خريطة الأزمنة التي وصلنا إليها" },
  { id: "finalrule", section: "الخاتمة", mascot: "🧠", title: "IQ200 FINAL RULE", sourceTag: "🧠 IQ200 FINAL RULE" },
  { id: "closing", section: "الخاتمة", mascot: "🏆", title: "الخاتمة — LESSON 27 COMPLETE", sourceTag: "الخاتمة — LESSON 27 COMPLETE" },
];

function SlideBody({ id, onGoTest }: { id: string; onGoTest: () => void }) {
  switch (id) {
    case "cover": return <CoverStep />;
    case "bridge": return <BridgeStep />;
    case "objectives": return <ObjectivesStep />;
    case "s1": return <S1Timeline />;
    case "s2": return <S2GoldenIdea />;
    case "s3": return <S3SaraDiagram />;
    case "s4": return <S4HadGrid />;
    case "s5": return <S5VerbTable />;
    case "s6": return <S6V2V3Trap />;
    case "s7": return <S7TeacherSwitch />;
    case "s8": return <S8AliOrder />;
    case "s9": return <S9Affirmative />;
    case "s10": return <S10IrregularPairs />;
    case "s11": return <S11Negative />;
    case "s12": return <S12NegativeV3Trap />;
    case "s13": return <S13Questions />;
    case "s14": return <S14ShortAnswers />;
    case "s15": return <S15SideBySide />;
    case "s16": return <S16LinaSwitch />;
    case "s17": return <S17BeforeLab />;
    case "s18": return <S18AfterLab />;
    case "s19": return <S19ByTimeLab />;
    case "s20": return <S20Already />;
    case "s21": return <S21Just />;
    case "s22": return <S22Never />;
    case "s23": return <S23DanielLegend />;
    case "s24": return <S24EmmaDetective />;
    case "s25": return <S25Nuance />;
    case "s26": return <S26MythBuster />;
    case "s27": return <S27NotAlwaysNeeded />;
    case "s28": return <S28OrderClear />;
    case "s29": return <S29IqStepper />;
    case "s30": return <S30PracticeV3 />;
    case "s31": return <S31PracticeHadHave />;
    case "s32": return <S32PracticeSimplePerfect />;
    case "s33": return <S33Noah />;
    case "s34": return <S34ErrorHunter />;
    case "s35": return <S35Transform />;
    case "s36": return <S36MuseumDetective />;
    case "s37": return <S37EmmaCinema />;
    case "s38": return <S38LiamScene />;
    case "s39": return <S39OrderChallenge />;
    case "s40": return <S40JohnSwitch />;
    case "s41": return <S41DancePrecision />;
    case "s42": return <S42BossBattle />;
    case "s43": return <S43Final10 />;
    case "s44": return <S44StoryStudio />;
    case "golden": return <GoldenSummary />;
    case "words": return <WordsSummary />;
    case "rule": return <KeyRule />;
    case "map": return <TenseMap />;
    case "finalrule": return <FinalRule />;
    case "closing": return <ClosingStep onGoTest={onGoTest} />;
    default: return <div className="p-4 text-center">خطوة غير معروفة</div>;
  }
}

// ============================================================
// منطقة الاختبارات (Test Area) — 20 سؤالًا مستقلة
// ============================================================

export function TestArea27({ onShowSolutions, onCheckedChange }: { onShowSolutions?: () => void; onCheckedChange?: (checked: boolean) => void }) {
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const setSingle = (qn: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qn]: optIdx }));
  };

  const setTf = (qn: number, val: boolean) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qn]: val }));
  };

  const setMulti = (qn: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((p) => {
      const cur: number[] = p[qn] ?? [];
      const next = cur.includes(optIdx) ? cur.filter((x) => x !== optIdx) : [...cur, optIdx].sort((a, b) => a - b);
      return { ...p, [qn]: next };
    });
  };

  const setOrderPick = (qn: number, item: string, total: number) => {
    if (submitted) return;
    setAnswers((p) => {
      const cur: string[] = p[qn] ?? [];
      const next = cur.includes(item) ? cur.filter((x) => x !== item) : cur.length < total ? [...cur, item] : cur;
      return { ...p, [qn]: next };
    });
  };

  const setMatchPick = (qn: number, leftIdx: number, rightIdx: number) => {
    if (submitted) return;
    setAnswers((p) => {
      const cur: Record<number, number> = p[qn] ?? {};
      return { ...p, [qn]: { ...cur, [leftIdx]: rightIdx } };
    });
  };

  const setSpotPick = (qn: number, segIdx: number) => {
    if (submitted) return;
    setAnswers((p) => ({ ...p, [qn]: segIdx }));
  };

  const isQuestionAnswered = (q: TestQ27): boolean => {
    const a = answers[q.n];
    if (a === undefined) return false;
    if (q.type === "single" || q.type === "spot") return typeof a === "number";
    if (q.type === "tf") return typeof a === "boolean";
    if (q.type === "multi") return Array.isArray(a) && a.length > 0;
    if (q.type === "order") return Array.isArray(a) && a.length === q.items.length;
    if (q.type === "match") return typeof a === "object" && a !== null && Object.keys(a).length === q.left.length;
    return false;
  };

  const isQuestionCorrect = (q: TestQ27): boolean => {
    const a = answers[q.n];
    if (a === undefined) return false;
    if (q.type === "single" || q.type === "spot") return a === q.answer;
    if (q.type === "tf") return a === q.answer;
    if (q.type === "multi") {
      if (!Array.isArray(a) || a.length !== q.answer.length) return false;
      return q.answer.every((v) => a.includes(v));
    }
    if (q.type === "order") {
      if (!Array.isArray(a) || a.length !== q.answer.length) return false;
      return q.answer.every((v, i) => a[i] === v);
    }
    if (q.type === "match") {
      if (typeof a !== "object" || a === null) return false;
      return q.answer.every((rIdx, lIdx) => a[lIdx] === rIdx);
    }
    return false;
  };

  const answeredCount = TEST_27.filter(isQuestionAnswered).length;
  const allAnswered = answeredCount === TEST_27.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return TEST_27.filter(isQuestionCorrect).length;
  }, [submitted, answers]);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
    onCheckedChange?.(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    onCheckedChange?.(false);
  };

  return (
    <div data-area="l27-test" className="space-y-6">
      <div className="rounded-3xl border-2 border-violet-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📝</span>
              <h2 className="font-head text-2xl font-black text-slate-900">اختبار الدرس 27 — 20 سؤالًا</h2>
            </div>
            <p className="mt-1 text-sm font-bold text-slate-500">
              أسئلة تطبيقية جديدة تقيس فهمك العميق للماضي التام (<En>Past Perfect</En>) ولا تظهر النتيجة إلا بعد إنهاء الاختبار بالكامل.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-black text-violet-800">
              أجبت عن {answeredCount} / 20
            </span>
          </div>
        </div>

        {submitted && (
          <div role="status" aria-live="polite" className="mt-6 rounded-2xl border-2 border-violet-200 bg-violet-50 p-5 text-center shadow-sm">
            <div className="text-3xl">🎉</div>
            <div className="font-head mt-1 text-2xl font-black text-violet-950">
              نتيجتك: {score} / 20
            </div>
            <div className="mt-1 text-sm font-bold text-slate-600">
              صحيح {score} · خطأ {20 - score}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {onShowSolutions && (
                <button
                  type="button"
                  onClick={onShowSolutions}
                  className="rounded-xl bg-violet-700 px-5 py-2 font-bold text-white shadow transition hover:bg-violet-800"
                >
                  عرض حلول الاختبارات
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                إعادة الاختبار
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {TEST_27.map((q) => {
          const isCorrect = submitted ? isQuestionCorrect(q) : undefined;
          const cardBorder = submitted
            ? isCorrect
              ? "border-emerald-300 bg-emerald-50/40"
              : "border-rose-300 bg-rose-50/40"
            : "border-slate-200 bg-white";

          return (
            <div key={q.n} data-test-q={q.n} role="group" aria-label={`السؤال ${q.n}`} className={`rounded-3xl border-2 p-5 transition ${cardBorder}`}>
              <div className="flex items-start gap-3">
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl font-en text-sm font-black text-white ${submitted ? (isCorrect ? "bg-emerald-600" : "bg-rose-600") : "bg-violet-700"}`}>
                  {q.n}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-slate-900"><LatinRuns text={q.ar ?? ""} /></div>
                  {q.en && <En className="mt-1 block text-lg font-black text-violet-900">{q.en}</En>}

                  {/* Single Choice */}
                  {q.type === "single" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {q.opts.map((opt, oi) => {
                        const sel = answers[q.n] === oi;
                        return (
                          <button
                            key={oi}
                            type="button"
                            disabled={submitted}
                            aria-pressed={sel}
                            onClick={() => setSingle(q.n, oi)}
                            className={`rounded-xl border-2 px-3.5 py-1.5 font-en font-bold transition active:scale-95 ${
                              sel
                                ? submitted
                                  ? isCorrect
                                    ? "border-transparent bg-emerald-600 text-white"
                                    : "border-transparent bg-rose-600 text-white"
                                  : "border-slate-900 bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* True / False */}
                  {q.type === "tf" && (
                    <div className="mt-3 flex gap-2">
                      {[true, false].map((val) => {
                        const sel = answers[q.n] === val;
                        const label = val ? "✓ صحيح" : "✕ خطأ";
                        return (
                          <button
                            key={String(val)}
                            type="button"
                            disabled={submitted}
                            aria-pressed={sel}
                            onClick={() => setTf(q.n, val)}
                            className={`rounded-xl border-2 px-4 py-1.5 font-bold transition active:scale-95 ${
                              sel
                                ? submitted
                                  ? isCorrect
                                    ? "border-transparent bg-emerald-600 text-white"
                                    : "border-transparent bg-rose-600 text-white"
                                  : "border-slate-900 bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Multi Select */}
                  {q.type === "multi" && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {q.opts.map((opt, oi) => {
                        const cur: number[] = answers[q.n] ?? [];
                        const sel = cur.includes(oi);
                        return (
                          <button
                            key={oi}
                            type="button"
                            disabled={submitted}
                            aria-pressed={sel}
                            onClick={() => setMulti(q.n, oi)}
                            className={`rounded-xl border-2 px-3.5 py-1.5 font-en font-bold transition active:scale-95 ${
                              sel
                                ? submitted
                                  ? isCorrect
                                    ? "border-transparent bg-emerald-600 text-white"
                                    : "border-transparent bg-rose-600 text-white"
                                  : "border-slate-900 bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Ordering */}
                  {q.type === "order" && (
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {q.items.map((item, ii) => {
                          const cur: string[] = answers[q.n] ?? [];
                          const idx = cur.indexOf(item);
                          const sel = idx !== -1;
                          return (
                            <button
                              key={ii}
                              type="button"
                              disabled={submitted}
                            aria-pressed={sel}
                              onClick={() => setOrderPick(q.n, item, q.items.length)}
                              className={`rounded-xl border-2 px-3 py-1.5 font-en text-xs font-bold transition active:scale-95 ${
                                sel
                                  ? submitted
                                    ? isCorrect
                                      ? "border-transparent bg-emerald-600 text-white"
                                      : "border-transparent bg-rose-600 text-white"
                                    : "border-slate-900 bg-slate-900 text-white shadow-sm"
                                  : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
                              }`}
                            >
                              {sel && <span className="ml-1 text-violet-200">({idx + 1})</span>} {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matching */}
                  {q.type === "match" && (
                    <div className="mt-3 space-y-2">
                      {q.left.map((l, li) => {
                        const curMap: Record<number, number> = answers[q.n] ?? {};
                        const chosenRight = curMap[li];
                        return (
                          <div key={li} className="flex flex-col gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-2.5 sm:flex-row sm:items-center sm:justify-between">
                            <En className="font-bold text-slate-900">{l}</En>
                            <div className="flex flex-wrap gap-1">
                              {q.right.map((r, ri) => {
                                const sel = chosenRight === ri;
                                return (
                                  <button
                                    key={ri}
                                    type="button"
                                    disabled={submitted}
                            aria-pressed={sel}
                                    onClick={() => setMatchPick(q.n, li, ri)}
                                    className={`rounded-xl border px-2.5 py-1 text-xs font-bold transition ${
                                      sel
                                        ? submitted
                                          ? isCorrect
                                            ? "border-transparent bg-emerald-600 text-white"
                                            : "border-transparent bg-rose-600 text-white"
                                          : "border-slate-900 bg-slate-900 text-white"
                                        : "border-slate-200 bg-white text-slate-700"
                                    }`}
                                  >
                                    <Rich text={r} />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Spot the Error */}
                  {q.type === "spot" && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {q.segments.map((seg, si) => {
                        const sel = answers[q.n] === si;
                        return (
                          <button
                            key={si}
                            type="button"
                            disabled={submitted}
                            aria-pressed={sel}
                            onClick={() => setSpotPick(q.n, si)}
                            className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-bold transition active:scale-95 ${
                              sel
                                ? submitted
                                  ? isCorrect
                                    ? "border-transparent bg-emerald-600 text-white"
                                    : "border-transparent bg-rose-600 text-white"
                                  : "border-slate-900 bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
                            }`}
                          >
                            {seg}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-3xl border-2 border-violet-100 bg-white p-5 text-center">
        <p id="l27-completion" className="mb-3 text-sm">أجب عن أسئلة هذا الاختبار فقط لتفعيل التصحيح: {answeredCount} / 20</p>
        {!submitted ? (
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            aria-describedby="l27-completion"
            className="rounded-2xl bg-violet-700 px-10 py-3.5 text-lg font-black text-white shadow-md transition active:scale-95 hover:bg-violet-800 disabled:opacity-40"
          >
            تحقق من الإجابات — إنهاء الاختبار
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border-2 border-slate-300 bg-white px-8 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            إعادة الاختبار
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// حلول الاختبارات (Solutions Area)
// ============================================================

export function Solutions27({ unlocked }: { unlocked: boolean }) {
  if (!unlocked) {
    return (
      <div data-area="l27-solutions" className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-8 text-center">
        <div className="text-4xl">🔒</div>
        <h3 className="font-head mt-2 text-xl font-black text-amber-950">حلول الاختبار مقفلة</h3>
        <p className="mt-1 text-sm font-bold text-amber-800">
          تفتح حلول الاختبار التفسيرية بعد إنهاء الاختبار وتقديمه في منطقة الاختبار، أو بفتح منطقة المعلم.
        </p>
      </div>
    );
  }

  return (
    <div data-area="l27-solutions" className="space-y-4">
      <div className="rounded-3xl border-2 border-violet-100 bg-white p-5">
        <h2 className="font-head text-2xl font-black text-slate-900">💡 الحلول التفسيرية لاختبار الدرس 27</h2>
        <p className="mt-1 text-sm font-bold text-slate-500">
          توضيح تفصيلي لسبب صحة كل إجابة مع التنبيه على الفخاخ والمفاهيم الشائعة.
        </p>
      </div>

      {TEST_27_SOLUTIONS.map((sol) => (
        <div key={sol.n} data-solution={sol.n} className="rounded-3xl border-2 border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-700 font-en text-sm font-black text-white">
              {sol.n}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="text-base font-bold text-slate-900"><LatinRuns text={sol.ar ?? ""} /></div>
              {sol.en && <En className="block text-lg font-black text-violet-900">{sol.en}</En>}

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3">
                <span className="text-xs font-black text-emerald-800">الإجابة الصحيحة:</span>
                <div className="mt-0.5 text-base font-black text-emerald-950"><Rich text={sol.answer} /></div>
              </div>

              <TeachingDetails><div className="text-sm font-semibold text-slate-700">
                <span className="font-bold text-slate-900">💡 التفسير: </span>
                <Rich text={sol.why} />
              </div></TeachingDetails>

              {sol.trap && (
                <div className="rounded-xl bg-amber-50 p-2.5 text-xs font-bold text-amber-900">
                  ⚠️ <span className="font-black">الفخ الشائع: </span>
                  <Rich text={sol.trap} />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// منطقة المعلم (Teacher Area) — خلف somer173
// ============================================================

export function TeacherArea27({
  unlocked,
  onUnlockChange,
  onGoSolutions,
}: {
  unlocked: boolean;
  onUnlockChange: (u: boolean) => void;
  onGoSolutions?: () => void;
}) {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass.trim() === TEACHER_PASSWORD_27) {
      setErr(false);
      onUnlockChange(true);
    } else {
      setErr(true);
    }
  };

  if (!unlocked) {
    return (
      <div data-area="l27-teacher" className="rounded-3xl border-2 border-violet-100 bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-md text-center">
          <div className="text-4xl">🔐</div>
          <h2 className="font-head mt-2 text-2xl font-black text-slate-900">منطقة المعلم — 🔒 مقفلة</h2>
          <p className="mt-1 text-sm font-bold text-slate-500">
            أدخل كلمة مرور المعلم المعتمدة للوصول إلى الملاحظات التعليمية وسلالم التقييم وحلول الأنشطة.
          </p>

          <form onSubmit={handleUnlock} className="mt-5 space-y-3">
            <input
              type="password"
              aria-label="كلمة مرور المعلم"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setErr(false);
              }}
              placeholder="كلمة المرور..."
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-2.5 text-center font-mono text-lg font-bold text-slate-800 focus:border-violet-600 focus:outline-none"
            />
            {err && <div className="text-sm font-bold text-rose-600">كلمة المرور غير صحيحة. حاول مرة أخرى.</div>}
            <button
              type="submit"
              className="w-full rounded-2xl bg-violet-700 py-2.5 text-base font-bold text-white shadow transition hover:bg-violet-800"
            >
              فتح المنطقة
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div data-area="l27-teacher" className="space-y-6">
<div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/80 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔓</span>
            <div>
              <h2 className="font-head text-xl font-black text-emerald-950">منطقة المعلم — مفتوحة</h2>
              <div className="text-xs font-bold text-emerald-800">ملاحظات تعليمية · حلول الأنشطة · سلّم القصة</div>
            </div>
          </div>
          {onGoSolutions && (
            <button
              type="button"
              onClick={onGoSolutions}
              className="rounded-xl bg-violet-700 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-violet-800"
            >
              عرض حلول الاختبارات
            </button>
          )}
        </div>
      </div>
<TeacherWorkspace lesson={27}>
      {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
      <TeacherSection title="مفتاح الاختبار النهائي" category="assessment">
<FinalTestAnswerKey lesson={27} questions={FINAL_TESTS[27]} accent="bg-violet-700" />
</TeacherSection>


      {/* 1) Overview */}
      <TeacherSection title="نظرة عامة" category="teaching">
<div className="rounded-3xl border-2 border-slate-100 bg-white p-5 space-y-3">
        <h3 className="font-head text-lg font-black text-slate-900"><Rich text="Lesson Overview — نظرة عامة" /></h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-3 text-xs space-y-1">
            <span className="font-black text-slate-800">الأهداف التدريسية:</span>
            {TEACHER_27_OVERVIEW.objectives.map((o, i) => (
              <div key={i}>• <Rich text={o} /></div>
            ))}
          </div>
          <div className="rounded-2xl bg-slate-50 p-3 text-xs space-y-1">
            <span className="font-black text-slate-800">المتطلبات السابقة:</span>
            {TEACHER_27_OVERVIEW.prerequisites.map((p, i) => (
              <div key={i}>• <Rich text={p} /></div>
            ))}
          </div>
        </div>
      </div>
</TeacherSection>

      {/* 2) Teaching Notes */}
      <TeacherSection title="ملاحظات التدريس" category="teaching">
<div className="rounded-3xl border-2 border-slate-100 bg-white p-5 space-y-3">
        <h3 className="font-head text-lg font-black text-slate-900"><Rich text="Teaching Notes — ملاحظات تعليمية (16 بندًا)" /></h3>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {TEACHER_27_NOTES.map((note, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-xs">
              <div className="font-black text-violet-900"><Rich text={note.head} /></div>
              <div className="mt-1 space-y-0.5 text-slate-700">
                {note.lines.map((l, li) => (
                  <div key={li}>• <Rich text={l} /></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
</TeacherSection>

      {/* 3) Activity Solutions */}
      <TeacherSection title="حلول الأنشطة والتدريبات" category="source">
<div className="rounded-3xl border-2 border-slate-100 bg-white p-5 space-y-3">
        <h3 className="font-head text-lg font-black text-slate-900"><Rich text="Activity Solutions — حلول الأنشطة والتدريبات (10 أقسام)" /></h3>
        <div className="space-y-2">
          <TeacherSourceBrowser lesson={27} groups={TEACHER_27_SOLUTIONS} />
        </div>
      </div>
</TeacherSection>

      {/* 4) Story Rubric */}
      <TeacherSection title="سلم تقييم القصة" category="teaching">
<div className="rounded-3xl border-2 border-slate-100 bg-white p-5 space-y-2">
        <h3 className="font-head text-lg font-black text-slate-900"><Rich text="Story Rubric — سلّم قصة «The Mysterious Door»" /></h3>
        <div className="rounded-2xl bg-violet-50 p-3.5 text-xs font-semibold text-violet-950 space-y-1">
          {TEACHER_27_RUBRIC.lines.map((l, i) => (
            <div key={i}>✓ <Rich text={l} /></div>
          ))}
        </div>
      </div>
</TeacherSection>

      {/* 5) Common Mistakes */}
      <TeacherSection title="الأخطاء الشائعة" category="teaching">
<div className="rounded-3xl border-2 border-slate-100 bg-white p-5 space-y-3">
        <h3 className="font-head text-lg font-black text-slate-900"><Rich text="Common Mistakes — الأخطاء الشائعة (8 محاور)" /></h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {TEACHER_27_MISTAKES.map((m, i) => (
            <div key={i} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-3 text-xs">
              <div className="font-black text-rose-900"><Rich text={m.head} /></div>
              <div className="mt-1 space-y-0.5 text-slate-700">
                {m.lines.map((l, li) => (
                  <div key={li}>• <Rich text={l} /></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
</TeacherSection>
    <TeacherSection title="مفتاح منطقة الاختبارات — 20 سؤالًا" category="assessment"><Solutions27 unlocked={true} /></TeacherSection>
</TeacherWorkspace>
</div>
  );
}

// ============================================================
// المكون الرئيسي للدرس 27
// ============================================================

export default function Lesson27({ onExit }: { onExit?: () => void }) {
  const [tab, setTab] = useState<"lesson" | "test" | "solutions" | "teacher">("lesson");
  const [slideIdx, setSlideIdx] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [teacherUnlocked, setTeacherUnlocked] = useState(false);
  const [testUnlocked, setTestUnlocked] = useState(false);

  const curSlide = slides[slideIdx];
  const total = slides.length;
  const progress = Math.round(((slideIdx + 1) / total) * 100);

  const prev = () => setSlideIdx((i) => Math.max(0, i - 1));
  const next = () => setSlideIdx((i) => Math.min(total - 1, i + 1));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (tab !== "lesson") return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [tab, total]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-violet-200">
      {/* الشريط العلوي العام */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition active:scale-95 hover:bg-slate-50"
                title="العودة للصفحة الرئيسية"
              >
                🏠
              </button>
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-violet-700 px-2 py-0.5 text-xs font-black text-white">الدرس 27</span>
                <span className="font-head text-base font-black text-slate-900 md:text-lg"><LatinRuns text="Past Perfect — الماضي التام" /></span>
              </div>
              <div className="hidden text-xs font-bold text-slate-500 sm:block">
                <LatinRuns text="THE FLASHBACK DIRECTOR · المخرج الذي يرتّب حدثين في الماضي" />
              </div>
            </div>
          </div>

          {/* أزرار التبويب الرئيسية */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setTab("lesson")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${tab === "lesson" ? "bg-white text-violet-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              📖 الدرس
            </button>
            <button
              type="button"
              onClick={() => setTab("test")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${tab === "test" ? "bg-white text-violet-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              📝 الاختبار
            </button>
            <button
              type="button"
              onClick={() => setTab("solutions")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${tab === "solutions" ? "bg-white text-violet-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              💡 الحلول
            </button>
            <button
              type="button"
              onClick={() => setTab("teacher")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${tab === "teacher" ? "bg-white text-violet-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              🔐 المعلم
            </button>
          </div>
        </div>
      </header>

      {/* محتوى التبويبات */}
      <main id="l27-main" className="mx-auto max-w-6xl px-4 py-6">
        {tab === "lesson" && (
          <div data-area="student-lesson" className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* القائمة الجانبية للشاشات الكبيرة */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-sm space-y-2">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-head text-sm font-black text-slate-800">خطوات الدرس ({total})</span>
                  <span data-slide-counter className="text-xs font-bold text-violet-700">{slideIdx + 1}/{total}</span>
                </div>
                <div className="space-y-1">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSlideIdx(idx)}
                      className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-right text-xs font-bold transition ${
                        slideIdx === idx ? "bg-violet-700 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="text-base shrink-0">{s.mascot}</span>
                      <span className="truncate"><LatinRuns text={s.title} /></span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* محتوى الشريحة المعروضة */}
            <div className="space-y-4">
              {/* شريط التقدم والتنقل السريع */}
              <div className="flex items-center justify-between rounded-2xl border-2 border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDrawer(true)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 lg:hidden"
                  >
                    ☰ الفهرس
                  </button>
                  <span data-slide-counter className="text-xs font-black text-violet-800">
                    خطوة {slideIdx + 1} من {total}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={slideIdx === 0}
                    onClick={prev}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition active:scale-95 disabled:opacity-30 hover:bg-slate-50"
                  >
                    → السابق
                  </button>
                  <button
                    type="button"
                    disabled={slideIdx === total - 1}
                    onClick={next}
                    className="rounded-xl bg-violet-700 px-4 py-1.5 text-xs font-bold text-white transition active:scale-95 disabled:opacity-30 hover:bg-violet-800"
                  >
                    التالي ←
                  </button>
                </div>
              </div>

              {/* خط التقدم المتحرك */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* إطار الشريحة الفعلي */}
              <Frame
                mascot={curSlide.mascot}
                step={curSlide.step}
                badge={curSlide.section}
                title={curSlide.title}
                lead={curSlide.lead}
                tip={curSlide.tip}
                accent={ACCENT27}
                sourceTag={curSlide.sourceTag}
              >
                <SlideBody id={curSlide.id} onGoTest={() => setTab("test")} />
              </Frame>

              {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
              {slideIdx === total - 1 && (
                <FinalTest
                  lesson={27}
                  questions={FINAL_TESTS[27]}
                  accent="bg-violet-700"
                  onGoTeacher={() => setTab("teacher")}
                />
              )}

              {/* أزرار التنقل السفلية */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={slideIdx === 0}
                  onClick={prev}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition active:scale-95 disabled:opacity-30 hover:bg-slate-50"
                >
                  → الخطوة السابقة
                </button>
                <button
                  type="button"
                  disabled={slideIdx === total - 1}
                  onClick={next}
                  className="rounded-2xl bg-violet-700 px-6 py-2.5 text-sm font-black text-white shadow transition active:scale-95 disabled:opacity-30 hover:bg-violet-800"
                >
                  الخطوة التالية ←
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === "test" && (
          <TestArea27
            onCheckedChange={setTestUnlocked}
            onShowSolutions={() => {
              setTestUnlocked(true);
              setTab("solutions");
            }}
          />
        )}

        {tab === "solutions" && (
          <Solutions27 unlocked={testUnlocked || teacherUnlocked} />
        )}

        {tab === "teacher" && (
          <TeacherArea27
            unlocked={teacherUnlocked}
            onUnlockChange={(u) => {
              setTeacherUnlocked(u);

            }}
            onGoSolutions={() => setTab("solutions")}
          />
        )}
      </main>

      {/* Drawer للتنقل على الشاشات الصغيرة */}
      {drawer && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-sm lg:hidden">
          <div className="mr-auto h-full w-4/5 max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-head text-base font-black text-slate-900">فهرس الخطوات ({total})</span>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 font-bold text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 space-y-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSlideIdx(idx);
                    setDrawer(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-right text-xs font-bold transition ${
                    slideIdx === idx ? "bg-violet-700 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-base">{s.mascot}</span>
                  <span className="truncate"><LatinRuns text={s.title} /></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* التوقيع */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center">
        <Signature />
      </footer>
    </div>
  );
}
