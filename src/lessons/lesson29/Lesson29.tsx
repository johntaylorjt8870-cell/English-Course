import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  U29,
  SEC29,
  SOURCE_SECTIONS,
  EX29_FILL,
  EX29_FORSINCE,
  EX29_FIX,
  EX29_MEANING,
  EX29_MEANING_OPTS,
  IQ29_33,
  IQ29_34,
  IQ29_35,
  BOSS29,
  MIA29_VERBS,
  DANIEL29_VERBS,
  RESCUE29_VERBS,
  TEST_29,
  TEST_29_SOLUTIONS,
  OBJECTIVES_29,
  TEACHER_PASSWORD_29,
  TEACHER_29_OVERVIEW,
  TEACHER_29_NOTES,
  type Mcq29,
  type TenseId29,
  type StoryVerb29,
  type TestQ29,
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
  type Part,
  type RoleStyle,
  type FrameAccent,
} from "../../shared/lessonKit";
import FinalTest, { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";

// ============================================================
// ⏳ الدرس 29 — Past Perfect Continuous — الماضي التام المستمر
// إعادة بناء بمعيار الدرس 6: فكرة واحدة لكل خطوة، والتفاعل هو الشرح.
// سجل المصدر (SOURCE_SECTIONS في data.ts) هو المرجع الحرفي — كل قسم
// يتحول هنا إلى تجربة مصممة، لا إلى سرد خام.
// المناطق الأربع: الدرس | الاختبار (20 سؤالًا) | الحلول | المعلم (somer173).
// ============================================================

const ACCENT29: FrameAccent = {
  step: "bg-teal-600",
  badge: "bg-teal-100 text-teal-800",
  tip: "from-teal-700 to-emerald-700",
  shadow: "shadow-[0_14px_44px_-20px_rgba(13,148,136,0.3)]",
};

// ---------------- نظام أدوار الجملة (تشريح PPC) ----------------
const R29: Record<string, RoleStyle> = {
  s: { chip: "bg-sky-100 border-sky-300 text-sky-900", label: "الفاعل" },
  had: { chip: "bg-violet-100 border-violet-300 text-violet-900", label: "المساعد الثابت" },
  been: { chip: "bg-fuchsia-100 border-fuchsia-300 text-fuchsia-900", label: "الوصلة" },
  ving: { chip: "bg-teal-100 border-teal-300 text-teal-900", label: "النشاط -ing" },
  dur: { chip: "bg-amber-100 border-amber-300 text-amber-900", label: "المدة" },
  evt: { chip: "bg-orange-100 border-orange-300 text-orange-900", label: "الحدث الماضي" },
};
const P = (text: string, role: string): Part => ({ text, role });

// ---------------- النظام البصري للأزمنة الأربعة ----------------
const TENSES: Record<
  TenseId29,
  { en: string; emoji: string; qEn: string; qAr: string; chip: string; soft: string; text: string; ring: string }
> = {
  ps: {
    en: "Past Simple",
    emoji: "📸",
    qEn: "What happened?",
    qAr: "ماذا حدث؟",
    chip: "bg-orange-500 text-white",
    soft: "border-orange-300 bg-orange-50",
    text: "text-orange-800",
    ring: "ring-orange-300",
  },
  pc: {
    en: "Past Continuous",
    emoji: "🎥",
    qEn: "What was happening?",
    qAr: "ماذا كان يحدث؟",
    chip: "bg-sky-500 text-white",
    soft: "border-sky-300 bg-sky-50",
    text: "text-sky-800",
    ring: "ring-sky-300",
  },
  pp: {
    en: "Past Perfect",
    emoji: "⏪",
    qEn: "What had happened before?",
    qAr: "ماذا كان قد حدث قبل ذلك؟",
    chip: "bg-violet-600 text-white",
    soft: "border-violet-300 bg-violet-50",
    text: "text-violet-800",
    ring: "ring-violet-300",
  },
  ppc: {
    en: "Past Perfect Continuous",
    emoji: "⏳",
    qEn: "What had been happening?",
    qAr: "ماذا كان مستمرًا قبل ذلك؟",
    chip: "bg-teal-600 text-white",
    soft: "border-teal-300 bg-teal-50",
    text: "text-teal-800",
    ring: "ring-teal-300",
  },
};
const TENSE_IDS: TenseId29[] = ["ps", "pc", "pp", "ppc"];

function TenseChip({ t, small = false, onClick, active }: { t: TenseId29; small?: boolean; onClick?: () => void; active?: boolean }) {
  const v = TENSES[t];
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

// ---------------- أدوات عرض صغيرة خاصة بالدرس ----------------

/** لوحة تفاعل — شريط عنوان إنجليزي + وصف عربي ثم المحتوى. */
function Lab({ emoji, label, ar, children }: { emoji: string; label: string; ar?: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border-2 border-teal-100 bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 p-3.5 sm:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-100 bg-white px-3 py-2">
        <span className="text-xl">{emoji}</span>
        <EnAr en={label} ar={ar} enClassName="text-[11px] font-black uppercase tracking-[0.16em] text-teal-700" arClassName="text-sm font-bold text-slate-600" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

/** شرح منصة موسوم بوضوح — لا يُخلط مع محتوى المصدر. */
function PlatformPanel({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border-2 border-slate-200 bg-slate-900 p-3.5 text-sm font-semibold leading-relaxed text-white">
      <div className="mb-1 text-[11px] font-black uppercase tracking-wide text-amber-300">
        🛠️ <En>Platform Explanation</En>
      </div>
      {children}
    </aside>
  );
}

/** سطر مصدر حرفي يُعرض بعد المحاولة (منع كشف الإجابات مسبقًا). */
function SourceReveal({ text }: { text: string }) {
  return (
    <div className="tada flex flex-wrap items-center gap-2 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3.5 py-2.5">
      <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-black text-white">📜 من المصدر</span>
      <Rich text={text} className="text-sm font-bold text-emerald-900 md:text-base" />
    </div>
  );
}

function FormulaStrip({ items }: { items: string[] }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
      {items.map((x) => (
        <En key={x} className="rounded-xl border-2 border-teal-200 bg-white px-3 py-2 text-sm font-black text-teal-900 md:text-base">
          {x}
        </En>
      ))}
    </div>
  );
}

/** خط زمني أفقي LTR من عقد ملونة بينها أسهم. */
function Track({ nodes, active }: { nodes: { label: string; en?: boolean; color?: string }[]; active?: number }) {
  return (
    <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-2 border-slate-200 bg-white p-3">
      {nodes.map((n, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-lg font-black text-slate-300">→</span>}
          <span
            className={`rounded-xl border-2 px-2.5 py-1.5 text-xs font-black transition sm:text-sm ${n.en ? "font-en" : ""} ${
              active === i ? "scale-105 border-teal-500 bg-teal-600 text-white shadow" : n.color ?? "border-slate-200 bg-slate-50 text-slate-700"
            }`}
          >
            {n.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// لبنات الممارسة — تصحيح فوري مع السبب (الممارسة ≠ الاختبار)
// ============================================================

/** بند اختيار من متعدد بتغذية راجعة فورية: أخضر/أحمر + السبب. */
function McqRow({
  n,
  stem,
  stemAr,
  opts,
  answer,
  why,
  onFirstAnswer,
}: {
  n: number;
  stem?: string;
  stemAr?: string;
  opts: string[];
  answer: number;
  why: string;
  onFirstAnswer?: () => void;
}) {
  const [pick, setPick] = useState<number | undefined>(undefined);
  const right = pick === answer;
  return (
    <div className={`rounded-3xl border-2 p-3.5 transition ${pick === undefined ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <Nub n={n} />
        {stem && <En className="text-lg font-bold text-slate-800 md:text-xl">{stem}</En>}
        {stemAr && <Rich text={stemAr} className="text-base font-bold text-slate-800 md:text-lg" />}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-2 pr-11">
        {opts.map((o, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => {
              if (pick === undefined) onFirstAnswer?.();
              setPick(oi);
            }}
            className={`rounded-xl border-2 px-3.5 py-1.5 font-en font-bold transition active:scale-95 ${
              pick === oi ? (oi === answer ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {pick !== undefined && (
        <div className={`mt-2 pr-11 text-sm font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
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

/** مجموعة بنود ممارسة + كشف سطر إجابات المصدر بعد محاولة كل البنود. */
function McqSet({ items, sourceAnswersLine }: { items: Mcq29[]; sourceAnswersLine?: string }) {
  const [answered, setAnswered] = useState(0);
  const done = answered >= items.length;
  return (
    <div className="space-y-2.5">
      {items.map((it, i) => (
        <McqRow key={i} n={i + 1} stem={it.stem} opts={it.opts} answer={it.answer} why={it.why} onFirstAnswer={() => setAnswered((v) => v + 1)} />
      ))}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">حاولت في {Math.min(answered, items.length)} / {items.length}</span>
        {done && sourceAnswersLine && <SourceReveal text={sourceAnswersLine} />}
      </div>
    </div>
  );
}

/** بطاقتا مقارنة — المس كل جملة لتكشف تركيزها. */
function FlipPair({
  a,
  b,
  note,
  noteEn = false,
}: {
  a: { en: string; cap: string; tag?: TenseId29 };
  b: { en: string; cap: string; tag?: TenseId29 };
  note?: string;
  noteEn?: boolean;
}) {
  const [open, setOpen] = useState<{ a: boolean; b: boolean }>({ a: false, b: false });
  const card = (item: { en: string; cap: string; tag?: TenseId29 }, key: "a" | "b") => {
    const v = item.tag ? TENSES[item.tag] : undefined;
    const on = open[key];
    return (
      <button
        type="button"
        onClick={() => setOpen((o) => ({ ...o, [key]: true }))}
        className={`rounded-3xl border-2 p-4 text-center transition active:scale-[0.98] ${on ? v?.soft ?? "border-teal-300 bg-teal-50" : "border-slate-200 bg-white hover:border-teal-300"}`}
      >
        {item.tag && (
          <div className="mb-2 flex justify-center">
            <TenseChip t={item.tag} small />
          </div>
        )}
        <En className="text-lg font-extrabold text-slate-900 md:text-xl">{item.en}</En>
        {on ? (
          <div className="pop mt-2 text-sm font-bold text-slate-700 md:text-base">
            <Rich text={item.cap} />
          </div>
        ) : (
          <div className="mt-2 text-xs font-bold text-slate-400">المس لتكشف التركيز 👆</div>
        )}
      </button>
    );
  };
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        {card(a, "a")}
        {card(b, "b")}
      </div>
      {open.a && open.b && note && (
        <div className="pop">{noteEn ? <Verdict ok en={note} /> : <Note emoji="⭐" text={note} />}</div>
      )}
    </div>
  );
}

/** محقق الأزمنة: لكل فعل اختر زمنه من الرقاقات الأربع — تصحيح فوري. */
function DetectivePick({ verbs, onDone, children }: { verbs: StoryVerb29[]; onDone?: ReactNode; children?: ReactNode }) {
  const [got, setGot] = useState<Record<number, boolean>>({});
  const [wrong, setWrong] = useState<Record<number, TenseId29 | undefined>>({});
  const solved = verbs.reduce((n, _v, i) => n + (got[i] ? 1 : 0), 0);
  const all = solved === verbs.length;
  return (
    <div className="space-y-2.5">
      {children}
      {verbs.map((vb, i) => {
        const v = TENSES[vb.t];
        const isGot = !!got[i];
        return (
          <div key={i} className={`rounded-3xl border-2 p-3.5 transition ${isGot ? v.soft : "border-slate-200 bg-white"}`}>
            <div className="flex flex-wrap items-center gap-2.5">
              <Nub n={i + 1} />
              <En className={`text-lg font-extrabold md:text-xl ${isGot ? v.text : "text-slate-800"}`}>{vb.v}</En>
              {isGot && <span className="tada">{v.emoji}</span>}
            </div>
            {!isGot ? (
              <div className={`mt-2.5 flex flex-wrap gap-2 pr-11 ${wrong[i] ? "shake" : ""}`}>
                {TENSE_IDS.map((t) => (
                  <TenseChip
                    key={t}
                    t={t}
                    small
                    onClick={() => {
                      if (t === vb.t) {
                        setGot((g) => ({ ...g, [i]: true }));
                        setWrong((w) => ({ ...w, [i]: undefined }));
                      } else setWrong((w) => ({ ...w, [i]: t }));
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="pop mt-2 pr-11">
                <En className="text-sm font-bold text-slate-600">{vb.srcWhy}</En>
              </div>
            )}
            {!isGot && wrong[i] && (
              <div className="mt-2 pr-11 text-sm font-bold text-rose-600">
                ✕ ليس {TENSES[wrong[i]!.toString() as TenseId29].emoji} <En>{TENSES[wrong[i] as TenseId29].en}</En> — اسأل: {TENSES[vb.t].qAr}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">حللت {solved} / {verbs.length}</span>
        {all && <div className="tada text-lg">🎉</div>}
      </div>
      {all && onDone}
    </div>
  );
}

/** كشف بعد تفكير — زر يقلب البطاقة. */
function ThinkReveal({ prompt, children, button = "فكّر ثم اكشف 🔍" }: { prompt: ReactNode; children: ReactNode; button?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">{prompt}</div>
      {open ? (
        <div className="pop mt-3 space-y-2">{children}</div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="mt-3 rounded-xl bg-slate-900 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-slate-700">
          {button}
        </button>
      )}
    </div>
  );
}

// ============================================================
// شرائح الدرس — قسم مصدري واحد = تجربة مصممة واحدة
// ============================================================

const HERO_PARTS: Part[] = [P("I", "s"), P("had", "had"), P("been", "been"), P("studying", "ving"), P("for three hours", "dur"), P("when my friend called", "evt")];

function Cover() {
  const u = U29("cover");
  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border-2 border-slate-900/[0.05] bg-white p-7 text-center md:p-12 shadow-[0_14px_44px_-20px_rgba(13,148,136,0.32)]">
      <div className="pointer-events-none absolute -left-12 -top-12 h-52 w-52 rounded-full bg-teal-100 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full bg-amber-100 blur-3xl" />
      <div className="relative">
        <div className="pop text-7xl anim-drift">⏳</div>
        <div className="pop pop-1 mt-4 inline-block rounded-full bg-teal-600 px-5 py-2 text-base font-bold text-white">الدرس التاسع والعشرون</div>
        <h1 className="pop pop-2 font-head mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          <Rich text="الماضي التام المستمر" />
        </h1>
        <p className="pop pop-3 mt-2 text-xl text-slate-500 md:text-2xl">
          <En>Past Perfect Continuous</En>
        </p>
        <p className="pop pop-3 mt-3 text-base font-bold text-slate-600 md:text-lg">
          <Rich text={u[1]} />
        </p>
        <div className="pop pop-4 mt-8 flex justify-center">
          <div className="max-w-full rounded-3xl border-2 border-slate-100 bg-slate-50 p-4 md:p-5">
            <PartsLine parts={HERO_PARTS} roles={R29} size="md" />
            <div className="mt-2 text-center text-slate-500">كنت أدرس منذ ثلاث ساعات عندما اتصل صديقي.</div>
          </div>
        </div>
        <div className="pop pop-5 mt-6 flex flex-wrap justify-center gap-2">
          {TENSE_IDS.map((t) => (
            <span key={t} className={`rounded-full px-3 py-1 text-sm font-bold ${TENSES[t].soft} ${TENSES[t].text} border-2`}>
              {TENSES[t].emoji} {TENSES[t].qAr}
            </span>
          ))}
        </div>
        <p className="pop pop-6 mt-7 text-sm text-slate-400">للتنقل: الأسهم ← → أو مفتاح المسافة</p>
      </div>
    </section>
  );
}

function Objectives() {
  return (
    <Frame mascot="🎯" step="🎯" title="بنهاية الدرس يجب أن تكون قادرًا على:" accent={ACCENT29} sourceTag={SOURCE_SECTIONS[1].title}>
      <div className="grid gap-3 sm:grid-cols-2">
        {OBJECTIVES_29.map((g, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} flex items-start gap-3 rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-4`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-600 font-bold text-white">{i + 1}</span>
            <Rich text={g.replace(/^[①②③④⑤⑥⑦⑧⑨⑩]\s*/u, "")} className="text-base leading-relaxed text-slate-700 md:text-lg" />
          </div>
        ))}
      </div>
      <Note
        emoji="🛠️"
        platform
        text="المحتوى المورّد محفوظ حرفيًا — وأضافت المنصة ترجمات عربية قصيرة تحت الجمل الإنجليزية ولوحات تفاعلية تشرح كل فكرة، موسومة دائمًا بهذه العلامة."
      />
    </Frame>
  );
}

// ---------- ① الفكرة ----------
function S1Concept() {
  const u = U29("s1");
  const phases = ["① بدأت الدراسة.", "② استمرت الدراسة.", "③ بعد ثلاث ساعات اتصل صديقي."];
  const [phase, setPhase] = useState(-1);
  return (
    <>
      <div className="rounded-2xl bg-teal-700/95 px-4 py-2.5 text-center text-lg font-black text-white shadow-sm">
        <Rich text={u[0]} />
      </div>
      <Rich text={u[1]} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />
      <SentenceCard parts={HERO_PARTS} roles={R29} ar="كنت أدرس منذ ثلاث ساعات عندما اتصل صديقي." />
      <Lab emoji="🎬" label="THREE MOMENTS" ar="القصة في ثلاث لحظات — اضغطها بالترتيب:">
        <div className="flex flex-wrap justify-center gap-2">
          {phases.map((ph, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPhase((p) => Math.max(p, i))}
              className={`rounded-xl border-2 px-3.5 py-2 text-sm font-bold transition active:scale-95 ${i <= phase ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
            >
              {ph}
            </button>
          ))}
        </div>
        <Track
          nodes={[
            { label: "بدأت الدراسة", color: phase >= 0 ? "border-teal-300 bg-teal-50 text-teal-800" : undefined },
            { label: "📚 استمرت لفترة", color: phase >= 1 ? "border-teal-300 bg-teal-50 text-teal-800" : undefined },
            { label: "📞 اتصل صديقي", color: phase >= 2 ? "border-orange-300 bg-orange-50 text-orange-800" : undefined },
            { label: "الآن" },
          ]}
          active={phase >= 2 ? 2 : phase}
        />
        {phase >= 2 && (
          <div className="pop">
            <Note emoji="💡" text={u[4]} />
          </div>
        )}
      </Lab>
    </>
  );
}

function S2Timeline() {
  const u = U29("s2");
  const caps = ["بدأ قبل الحدث", "استمر لفترة", "كان مرتبطًا بنقطة ماضية"];
  const [i, setI] = useState(-1);
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4 text-center">
        <En className="text-xl font-extrabold text-slate-900 md:text-2xl">{u[1]}</En>
      </div>
      <Lab emoji="🕰️" label="TIMELINE" ar="المس كل محطة على الخط الزمني:">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["🚀 بدأت الدراسة", "📚📚📚 استمرت", "📞 اتصال صديقي", "⏰ الآن"].map((lbl, li) => (
            <button
              key={li}
              type="button"
              onClick={() => setI(li)}
              className={`rounded-2xl border-2 px-2 py-2.5 text-sm font-bold transition active:scale-95 ${i === li ? "border-transparent bg-teal-600 text-white shadow" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}
            >
              {lbl}
            </button>
          ))}
        </div>
        {i >= 0 && (
          <div key={i} className="pop rounded-2xl bg-white p-3.5 text-center text-base font-bold text-teal-800">
            {i < 3 ? <Rich text={caps[Math.min(i, 2)]} /> : <Rich text="«الآن» خارج القصة — كل شيء حدث في الماضي." />}
          </div>
        )}
        <div className="text-center text-xs font-bold text-slate-400">النشاط ⏳ يملأ المسافة بين البداية والنقطة الماضية (الاتصال)</div>
      </Lab>
    </>
  );
}

// ---------- ③ القاعدة الذهبية ----------
const S3_EXAMPLES: { parts: Part[]; ar: string }[] = [
  { parts: [P("I", "s"), P("had", "had"), P("been", "been"), P("waiting", "ving")], ar: "كنت أنتظر." },
  { parts: [P("She", "s"), P("had", "had"), P("been", "been"), P("studying", "ving")], ar: "كانت تدرس." },
  { parts: [P("He", "s"), P("had", "had"), P("been", "been"), P("working", "ving")], ar: "كان يعمل." },
  { parts: [P("We", "s"), P("had", "had"), P("been", "been"), P("talking", "ving")], ar: "كنا نتحدث." },
  { parts: [P("They", "s"), P("had", "had"), P("been", "been"), P("playing", "ving")], ar: "كانوا يلعبون." },
];

function S3Formula() {
  const u = U29("s3");
  const order = ["Subject", "had", "been", "verb-ing"];
  const pool = ["been", "Subject", "verb-ing", "had"];
  const [placed, setPlaced] = useState<string[]>([]);
  const [bad, setBad] = useState(false);
  const done = placed.length === order.length;
  return (
    <>
      <Lab emoji="⭐" label="Formula Builder" ar="ركّب القاعدة الذهبية بالترتيب الصحيح:">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
          {pool.map((w) => (
            <button
              key={w}
              type="button"
              disabled={placed.includes(w)}
              onClick={() => {
                if (order[placed.length] === w) {
                  setPlaced((p) => [...p, w]);
                  setBad(false);
                } else setBad(true);
              }}
              className="rounded-xl border-2 border-slate-300 bg-white px-4 py-2 font-en text-lg font-bold text-slate-800 transition hover:border-teal-400 active:scale-95 disabled:opacity-25"
            >
              {w}
            </button>
          ))}
        </div>
        <div
          dir="ltr"
          style={{ direction: "ltr" }}
          className={`ltr-row flex min-h-14 flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-2.5 ${done ? "border-emerald-300 bg-white" : bad ? "shake border-rose-300 bg-rose-50/40" : "border-slate-300 bg-white"}`}
        >
          {placed.length === 0 && <span className="text-sm text-slate-400">ابدأ بـ من يقوم بالفعل…</span>}
          {placed.map((w, i) => (
            <En key={i} className={`rounded-xl border-2 px-3.5 py-1.5 text-lg font-bold ${done ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-teal-300 bg-teal-50 text-teal-800"}`}>
              {w}
            </En>
          ))}
          {placed.length > 0 && <span className="font-en text-lg font-bold text-slate-300">{done ? "✓" : "…"}</span>}
        </div>
        {bad && <div className="text-center text-sm font-bold text-rose-600">✕ ليس بعد — الترتيب: الفاعل ثم had ثم been ثم الفعل بـ -ing</div>}
        {done && (
          <div className="pop space-y-3">
            <FormulaStrip items={[u[0], u[1]]} />
            <div className="tada text-center text-sm font-bold text-emerald-700">🎉 أحسنت! هذه هي القاعدة الذهبية — والآن شاهدها في خمس جمل:</div>
          </div>
        )}
      </Lab>
      {done && (
        <div className="pop grid gap-2">
          {S3_EXAMPLES.map((ex, i) => (
            <div key={i} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-2.5 border-2 border-slate-100">
              <PartsLine parts={ex.parts} roles={R29} size="sm" label={false} />
              <span className="mr-auto text-sm text-slate-500">{ex.ar}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function S4Had() {
  const u = U29("s4");
  const pronouns = u[0].split(" · ").map((x) => x.replace(" had been", ""));
  const [tried, setTried] = useState<Record<string, boolean>>({});
  const [sel, setSel] = useState<string | null>(null);
  const count = Object.keys(tried).length;
  return (
    <Lab emoji="🔥" label="HAD NEVER CHANGES" ar="المس كل الضمائر — وراقب المساعد:">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-2 gap-2 sm:grid-cols-4">
        {pronouns.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setSel(p);
              setTried((t) => ({ ...t, [p]: true }));
            }}
            className={`rounded-2xl border-2 px-3 py-2.5 text-center font-en text-base font-black transition active:scale-95 ${sel === p ? "border-transparent bg-teal-600 text-white shadow" : tried[p] ? "border-teal-200 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-800 hover:border-teal-300"}`}
          >
            {p}
          </button>
        ))}
      </div>
      {sel && (
        <div key={sel} className="pop rounded-2xl border-2 border-teal-100 bg-white p-4 text-center">
          <PartsLine parts={[P(sel, "s"), P("had", "had"), P("been", "been"), P("…", "ving")]} roles={R29} label={false} />
          <div className="mt-2 text-sm font-bold text-teal-700">نفس had مع الجميع — لا تتغير أبدًا ✅</div>
        </div>
      )}
      <div className="text-center text-xs font-bold text-slate-400">جرّبت {count} / {pronouns.length}</div>
      {count >= pronouns.length && (
        <div className="pop space-y-2">
          <Verdict ok={false} en={u[1].replace(" ❌", "")} why="has للمضارع التام — ونحن هنا في الماضي" />
          <Verdict ok en={u[2].replace(" ✅", "")} ar="في الماضي التام المستمر: had فقط" />
        </div>
      )}
    </Lab>
  );
}

function S5Been() {
  const u = U29("s5");
  const parts: { key: string; role: string; line: string }[] = [
    { key: "had", role: "had", line: u[0] },
    { key: "been", role: "been", line: u[1] },
    { key: "studying", role: "ving", line: u[2] },
  ];
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const all = parts.every((p) => open[p.key]);
  return (
    <Lab emoji="🧩" label="WHY BEEN?" ar="المس كل قطعة لتعرف وظيفتها:">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid gap-2 sm:grid-cols-3">
        {parts.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setOpen((o) => ({ ...o, [p.key]: true }))}
            className={`rounded-2xl border-2 p-4 text-center transition active:scale-95 ${open[p.key] ? R29[p.role].chip : "border-slate-200 bg-white hover:border-teal-300"}`}
          >
            <En className="text-2xl font-extrabold">{p.key}</En>
            {open[p.key] ? (
              <div className="pop mt-2 text-sm font-bold">
                <Rich text={p.line.slice(p.line.indexOf("→") + 1).trim()} />
              </div>
            ) : (
              <div className="mt-2 text-xs font-bold text-slate-400">؟</div>
            )}
          </button>
        ))}
      </div>
      {all && (
        <div className="pop space-y-2">
          <FormulaStrip items={[u[3]]} />
          <div className="text-center text-sm font-bold text-teal-700">ثلاث قطع تلتصق دائمًا بهذا الترتيب 🎉</div>
        </div>
      )}
    </Lab>
  );
}

// ---------- ⑥–⑦ النتيجة أم النشاط ----------
function S6Focus() {
  const u = U29("s6");
  return (
    <FlipPair
      a={{ en: u[0], cap: u[2], tag: "pp" }}
      b={{ en: u[1], cap: u[3], tag: "ppc" }}
      note={u[4]}
    />
  );
}

function S7Example() {
  const u = U29("s7");
  return (
    <>
      <FlipPair
        a={{ en: u[0], cap: u[1], tag: "pp" }}
        b={{ en: u[2], cap: u[3], tag: "ppc" }}
      />
      <PlatformPanel>
        <Rich text="نفس الغرفة ونفس الوالدين — الاختلاف فقط في ما تريد إبرازه: النتيجة النظيفة 🏁 أم ساعتا التنظيف ⏳." />
      </PlatformPanel>
    </>
  );
}

// ---------- ⑧–⑫ for / since ----------
function DurLab({ secId, role }: { secId: "s8" | "s9"; role: "for" | "since" }) {
  const u = U29(secId);
  const chips = u[1].split(" · ");
  const [sel, setSel] = useState(0);
  const base =
    secId === "s8"
      ? { pre: [P("She", "s"), P("had", "had"), P("been", "been"), P("waiting", "ving")], evt: "when the bus arrived", ar: "كانت تنتظر … عندما وصل الباص." }
      : { pre: [P("He", "s"), P("had", "had"), P("been", "been"), P("working", "ving")], evt: "when his manager called", ar: "كان يعمل … عندما اتصل مديره." };
  return (
    <>
      <div className="rounded-2xl bg-amber-500/95 px-4 py-2.5 text-center text-lg font-black text-white shadow-sm">
        <Rich text={u[0]} />
      </div>
      <SentenceCard
        parts={secId === "s8" ? [P("She", "s"), P("had", "had"), P("been", "been"), P("waiting", "ving"), P("for two hours", "dur"), P("when the bus arrived", "evt")] : [P("He", "s"), P("had", "had"), P("been", "been"), P("working", "ving"), P("since early morning", "dur"), P("when his manager called", "evt")]}
        roles={R29}
        ar={secId === "s8" ? "كانت تنتظر منذ ساعتين عندما وصل الباص." : "كان يعمل منذ الصباح الباكر عندما اتصل مديره."}
      />
      <Lab emoji={role === "for" ? "⏱️" : "🕰️"} label={role === "for" ? "SWAP THE DURATION" : "SWAP THE STARTING POINT"} ar="بدّل الجزء الكهرماني وشاهد الجملة تتغير:">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
          {chips.map((c, ci) => (
            <button
              key={c}
              type="button"
              onClick={() => setSel(ci)}
              className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-bold transition active:scale-95 ${sel === ci ? "border-transparent bg-amber-500 text-white" : "border-amber-200 bg-white text-amber-900 hover:border-amber-400"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div key={sel} className="pop rounded-2xl border-2 border-slate-100 bg-white p-4 text-center">
          <PartsLine parts={[...base.pre, P(chips[sel], "dur"), P(base.evt, "evt")]} roles={R29} size="sm" label={false} />
          <div className="mt-2 text-sm text-slate-500">{base.ar}</div>
        </div>
      </Lab>
    </>
  );
}

function S10ForSince() {
  const u = U29("s10");
  const items: { w: string; a: "for" | "since" }[] = [
    { w: "two hours", a: "for" },
    { w: "Monday", a: "since" },
    { w: "three years", a: "for" },
    { w: "2020", a: "since" },
    { w: "ten minutes", a: "for" },
    { w: "7:30", a: "since" },
  ];
  const [pick, setPick] = useState<Record<number, "for" | "since">>({});
  const solved = items.reduce((n, it, i) => n + (pick[i] === it.a ? 1 : 0), 0);
  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
          <div className="font-head text-xl font-bold text-amber-800">
            <Rich text={u[2]} />
          </div>
          <En className="mt-1 block text-sm font-bold text-amber-700">for + two hours / three years / ten minutes</En>
        </div>
        <div className="rounded-3xl border-2 border-sky-200 bg-sky-50 p-4 text-center">
          <div className="font-head text-xl font-bold text-sky-800">
            <Rich text={u[3]} />
          </div>
          <En className="mt-1 block text-sm font-bold text-sky-700">since + Monday / 2020 / 7:30</En>
        </div>
      </div>
      <Lab emoji="🚨" label="FOR vs SINCE Lab" ar="صنّف كل كلمة — مدة أم نقطة بداية؟">
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((it, i) => {
            const c = pick[i];
            const right = c === it.a;
            return (
              <div key={i} className={`flex flex-wrap items-center gap-2 rounded-2xl border-2 p-2.5 transition ${c === undefined ? "border-slate-200 bg-white" : right ? "border-emerald-300 bg-emerald-50/60" : "border-rose-300 bg-rose-50/60"}`}>
                <En className="min-w-20 text-lg font-extrabold text-slate-800">{it.w}</En>
                <div className="mr-auto flex gap-1.5">
                  {(["for", "since"] as const).map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setPick((p) => ({ ...p, [i]: o }))}
                      className={`rounded-lg border-2 px-3 py-1 font-en text-sm font-bold transition active:scale-95 ${c === o ? (right ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                {c !== undefined && (
                  <span className={`w-full pr-1 text-xs font-bold ${right ? "text-emerald-700" : "text-rose-600"}`}>
                    {right ? (it.a === "for" ? "✓ مدة ← for" : "✓ نقطة بداية ← since") : it.a === "for" ? "✕ هذه مدة (كم مدة؟) ← for" : "✕ هذه نقطة بداية (منذ متى؟) ← since"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {solved === items.length && (
          <div className="pop space-y-2">
            <SourceReveal text={u[0]} />
            <SourceReveal text={u[1]} />
          </div>
        )}
      </Lab>
    </>
  );
}

function S11IQExample() {
  const u = U29("s11");
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ThinkReveal prompt={<En className="text-lg font-extrabold text-slate-900">{u[0]}</En>} button="اسأل: How long? 🔍">
        <Verdict ok en={u[1]} />
      </ThinkReveal>
      <ThinkReveal prompt={<En className="text-lg font-extrabold text-slate-900">{u[2]}</En>} button="اسأل: Since when? 🔍">
        <Verdict ok en={u[3]} />
      </ThinkReveal>
    </div>
  );
}

const S12_DISSECT: { parts: Part[]; ar: string }[] = [
  { parts: [P("She", "s"), P("had", "had"), P("been", "been"), P("reading", "ving"), P("for an hour", "dur"), P("when the lights went out", "evt")], ar: "كانت تقرأ منذ ساعة عندما انطفأت الأنوار." },
  { parts: [P("They", "s"), P("had", "had"), P("been", "been"), P("traveling", "ving"), P("for two days", "dur"), P("when they reached the village", "evt")], ar: "كانوا يسافرون منذ يومين عندما وصلوا إلى القرية." },
  { parts: [P("He", "s"), P("had", "had"), P("been", "been"), P("practicing the piano", "ving"), P("since morning", "dur"), P("when his neighbor complained", "evt")], ar: "كان يتدرّب على البيانو منذ الصباح عندما اشتكى جاره." },
  { parts: [P("We", "s"), P("had", "had"), P("been", "been"), P("waiting", "ving"), P("for thirty minutes", "dur"), P("when the doctor finally arrived", "evt")], ar: "كنا ننتظر منذ ثلاثين دقيقة عندما وصل الطبيب أخيرًا." },
];

function S12Gallery() {
  const [i, setI] = useState(0);
  return (
    <Lab emoji="🔥" label="EXAMPLE GALLERY" ar="أربع جمل من المصدر — افتحها واحدة واحدة:">
      <div className="flex flex-wrap justify-center gap-2">
        {S12_DISSECT.map((_x, xi) => (
          <button
            key={xi}
            type="button"
            onClick={() => setI(xi)}
            className={`grid h-10 w-10 place-items-center rounded-xl border-2 text-base font-black transition active:scale-95 ${i === xi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
          >
            {xi + 1}
          </button>
        ))}
      </div>
      <div key={i} className="pop rounded-2xl border-2 border-slate-100 bg-white p-4">
        <PartsLine parts={S12_DISSECT[i].parts} roles={R29} size="sm" />
        <div className="mt-2 text-sm text-slate-500 md:text-base">{S12_DISSECT[i].ar}</div>
      </div>
    </Lab>
  );
}

// ---------- ⑬–⑱ المقارنات ----------
function S13PCvsPPC() {
  const u = U29("s13");
  return (
    <>
      <FlipPair
        a={{ en: u[0].replace("Past Continuous: ", ""), cap: "ماذا كنت أفعل في تلك اللحظة؟", tag: "pc" }}
        b={{ en: u[1].replace("Past Perfect Continuous: ", ""), cap: "منذ متى كنت أدرس قبل الاتصال؟", tag: "ppc" }}
        note={u[2]}
      />
    </>
  );
}

function S14Pictures() {
  const u = U29("s14");
  const [which, setWhich] = useState<"pc" | "ppc">("pc");
  return (
    <Lab emoji="🖼️" label="PICTURE THE DIFFERENCE" ar="بدّل بين الصورتين:">
      <div className="flex justify-center gap-2">
        <TenseChip t="pc" onClick={() => setWhich("pc")} active={which === "pc"} />
        <TenseChip t="ppc" onClick={() => setWhich("ppc")} active={which === "ppc"} />
      </div>
      {which === "pc" ? (
        <div key="pc" className="pop space-y-2">
          <Track nodes={[{ label: "📚 I was studying", en: true, color: "border-sky-300 bg-sky-50 text-sky-800" }, { label: "📞 Ali calls", en: true, color: "border-orange-300 bg-orange-50 text-orange-800" }]} />
          <div className="text-center text-sm font-bold text-sky-700">لقطة واحدة: الاتصال وقع أثناء الدراسة — بلا مدة</div>
        </div>
      ) : (
        <div key="ppc" className="pop space-y-2">
          <Track
            nodes={[
              { label: "بدأت الدراسة", color: "border-teal-300 bg-teal-50 text-teal-800" },
              { label: "📚📚📚📚", color: "border-teal-300 bg-teal-50 text-teal-800" },
              { label: "📞 Ali called", en: true, color: "border-orange-300 bg-orange-50 text-orange-800" },
            ]}
          />
          <div className="text-center text-sm font-bold text-teal-700">فيلم كامل: مدة الدراسة قبل الاتصال ظاهرة في الصورة</div>
        </div>
      )}
      <Note emoji="⭐" text={u[2]} />
    </Lab>
  );
}

function S15PPvsPPC() {
  const u = U29("s15");
  return (
    <>
      <Lab emoji="🔥" label="Result vs Duration Lab" ar="المس كل جملة لتكشف تركيزها:">
        <FlipPair
          a={{ en: u[0], cap: "🏁 تركّز على النتيجة — الدراجة أُصلحت.", tag: "pp" }}
          b={{ en: u[1], cap: "🔄 تركّز على عملية الإصلاح والمدة — ساعتان من العمل.", tag: "ppc" }}
          note={u[2]}
        />
      </Lab>
    </>
  );
}

function S16NotAbsolute() {
  const u = U29("s16");
  return (
    <>
      <Rich text={u[0]} className="block text-lg leading-relaxed text-slate-700 md:text-xl" />
      <ThinkReveal
        prompt={
          <>
            <En className="text-xl font-extrabold text-slate-900">{u[1]}</En>
            <span className="text-sm text-slate-400">لماذا كان متعبًا؟</span>
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <TenseChip t="ppc" small />
          <En className="text-lg font-extrabold text-teal-700">had been running</En>
          <Rich text="— نشاط مستمر سابق أدى إلى أثر ظاهر (التعب)." className="text-sm font-bold text-slate-600" />
        </div>
      </ThinkReveal>
      <Note emoji="⭐" text={u[2]} />
    </>
  );
}

function S17Effect() {
  const u = U29("s17");
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const rows = [
    { result: "Her clothes were wet", cause: "she had been walking in the rain", full: u[0], detail: u[1] },
    { result: "The ground was muddy", cause: "it had been raining", full: u[2] },
  ];
  return (
    <Lab emoji="💡" label="VISIBLE EFFECT" ar="المس النتيجة لتكشف النشاط الذي سبّبها:">
      {rows.map((r, i) => (
        <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((o) => ({ ...o, [i]: true }))}
              className={`rounded-xl border-2 px-3.5 py-2 font-en text-base font-extrabold transition active:scale-95 ${open[i] ? "border-orange-300 bg-orange-50 text-orange-800" : "border-slate-300 bg-white text-slate-800 hover:border-orange-300"}`}
            >
              {r.result} {open[i] ? "💧" : "❓"}
            </button>
            {open[i] && (
              <>
                <span className="pop text-lg font-black text-slate-300">⬅</span>
                <En className="pop rounded-xl border-2 border-teal-300 bg-teal-50 px-3.5 py-2 text-base font-extrabold text-teal-800">because {r.cause}</En>
              </>
            )}
          </div>
          {open[i] && (
            <div className="pop mt-2 space-y-1.5">
              <Verdict ok en={r.full} />
              {r.detail && <En className="block text-xs font-bold text-slate-500">{r.detail}</En>}
            </div>
          )}
        </div>
      ))}
      {open[0] && open[1] && (
        <div className="pop">
          <Note emoji="⭐" text={u[3]} />
        </div>
      )}
    </Lab>
  );
}

function S18Myth() {
  const u = U29("s18");
  const [pick, setPick] = useState<number | undefined>(undefined);
  return (
    <>
      <SentenceCard parts={[P("He", "s"), P("had", "had"), P("been", "been"), P("working", "ving"), P("all morning", "dur"), P("so he was exhausted", "evt")]} roles={R29} ar="كان يعمل طوال الصباح، لذلك كان منهكًا." />
      <Lab emoji="🧠" label="MYTH CHECK" ar="هل كان لا يزال يعمل في لحظة الإرهاق؟">
        <div className="flex flex-wrap justify-center gap-2">
          {["نعم، حتمًا كان يعمل", "ليس بالضرورة"].map((o, oi) => (
            <button
              key={oi}
              type="button"
              onClick={() => setPick(oi)}
              className={`rounded-xl border-2 px-4 py-2 text-sm font-bold transition active:scale-95 ${pick === oi ? (oi === 1 ? "border-transparent bg-emerald-600 text-white" : "border-transparent bg-rose-600 text-white") : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}
            >
              {o}
            </button>
          ))}
        </div>
        {pick !== undefined && (
          <div className="pop">
            {pick === 1 ? (
              <Note emoji="🎉" text={u[1]} />
            ) : (
              <div className="shake rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-center text-sm font-bold text-rose-700">ليس شرطًا! جرّب الإجابة الأخرى 👆</div>
            )}
          </div>
        )}
      </Lab>
    </>
  );
}

function S19Stative() {
  const u = U29("s19");
  const verbs = u[0].split(" · ");
  const [pick, setPick] = useState<number | undefined>(undefined);
  return (
    <>
      <div className="flex flex-wrap gap-2 rounded-3xl border-2 border-slate-100 bg-slate-50/70 p-4">
        {verbs.map((w, i) => (
          <span key={w} className="anim-float" style={{ animationDelay: `${(i % 5) * 0.3}s` }}>
            <En className="rounded-2xl border-2 border-rose-200 bg-white px-3 py-1.5 text-base font-extrabold text-rose-700">{w}</En>
          </span>
        ))}
        <span className="w-full text-sm font-bold text-slate-500">أفعال الحالة — لا نستخدمها عادةً في الصيغ المستمرة</span>
      </div>
      <Lab emoji="🚨" label="Stative Verb Trap" ar="أي جملة طبيعية؟ اختر:">
        <div className="grid gap-2">
          {[u[1].replace(" ✅", ""), u[2].replace(" ❌", "")].map((o, oi) => (
            <button
              key={oi}
              type="button"
              onClick={() => setPick(oi)}
              className={`rounded-2xl border-2 p-3 text-left transition active:scale-[0.98] ${pick === oi ? (oi === 0 ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white hover:border-teal-300"}`}
            >
              <En className={`text-lg font-extrabold ${pick === oi && oi === 1 ? "text-rose-700 line-through decoration-rose-300" : "text-slate-800"}`}>{o}</En>
            </button>
          ))}
        </div>
        {pick !== undefined && (
          <div className="pop space-y-2">
            {pick === 0 ? (
              <div className="tada text-center text-sm font-bold text-emerald-700">✓ صحيح — know فعل حالة، فنستخدم Past Perfect لا المستمر</div>
            ) : (
              <div className="text-center text-sm font-bold text-rose-600">✕ know فعل حالة — الصيغة المستمرة معه غير طبيعية</div>
            )}
            <Verdict ok en={u[3]} ar="حتى مع المدة الطويلة — Past Perfect هو الطبيعي هنا" />
            <Note emoji="⚖️" text={u[4]} />
          </div>
        )}
      </Lab>
    </>
  );
}

// ---------- ⑳–㉑ -ing ----------
function S20Regular() {
  const u = U29("s20");
  const pairs = u[0].split(" · ").map((x) => x.split(" → ") as [string, string]);
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  return (
    <>
      <Lab emoji="⭐" label="MAKE IT -ING" ar="المس كل فعل لتحويله:">
        <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row grid grid-cols-2 gap-2 sm:grid-cols-5">
          {pairs.map(([v1, ving], i) => (
            <button
              key={v1}
              type="button"
              onClick={() => setFlipped((f) => ({ ...f, [i]: true }))}
              className={`rounded-2xl border-2 p-3 text-center font-en text-lg font-extrabold transition active:scale-95 ${flipped[i] ? "border-teal-300 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"}`}
            >
              {flipped[i] ? <span className="pop inline-block">{ving}</span> : v1}
            </button>
          ))}
        </div>
      </Lab>
      <SentenceCard parts={[P("They", "s"), P("had", "had"), P("been", "been"), P("working", "ving"), P("all afternoon", "dur")]} roles={R29} ar="كانوا يعملون طوال فترة بعد الظهر." />
    </>
  );
}

function S21IngRules() {
  const u = U29("s21");
  const tabs = [
    { t: "معظم الأفعال", note: "نضيف -ing فقط", pairs: u[0].replace("Most verbs: ", "").split(" · ") },
    { t: "المنتهية بـ e", note: "نحذف e ثم نضيف -ing", pairs: u[1].replace("Final e: ", "").split(" · ") },
    { t: "مضاعفة الساكن", note: "فعل قصير ← نضاعف الحرف الأخير", pairs: u[2].replace("Short verbs / consonant doubling: ", "").split(" · ") },
  ];
  const [t, setT] = useState(0);
  return (
    <Lab emoji="🔤" label="-ING RULES" ar="ثلاث قواعد فقط:">
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((x, xi) => (
          <button
            key={xi}
            type="button"
            onClick={() => setT(xi)}
            className={`rounded-xl border-2 px-4 py-2 text-sm font-extrabold transition active:scale-95 ${t === xi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
          >
            {x.t}
          </button>
        ))}
      </div>
      <div key={t} className="pop">
        <div className="grid gap-2 sm:grid-cols-2">
          {tabs[t].pairs.map((pair) => {
            const [a, b] = pair.split(" → ");
            return (
              <div key={pair} dir="ltr" className="flex items-center justify-center gap-3 rounded-2xl bg-white px-3 py-2 border-2 border-slate-100">
                <En className="text-lg font-bold text-slate-600">{a}</En>
                <span className="text-teal-500">→</span>
                <En className="text-lg font-extrabold text-teal-700">{b}</En>
              </div>
            );
          })}
        </div>
        <div className="mt-3 rounded-2xl bg-teal-50 p-2.5 text-center text-sm font-bold text-teal-800">{tabs[t].note}</div>
      </div>
    </Lab>
  );
}

// ---------- ㉒–㉖ النفي والأسئلة ----------
function S22Negative() {
  const u = U29("s22");
  const negatives: { parts: Part[]; ar: string }[] = [
    { parts: [P("I", "s"), P("hadn't", "had"), P("been", "been"), P("sleeping", "ving")], ar: "لم أكن نائمًا (طوال تلك الفترة)." },
    { parts: [P("She", "s"), P("hadn't", "had"), P("been", "been"), P("studying", "ving")], ar: "لم تكن تدرس." },
    { parts: [P("They", "s"), P("hadn't", "had"), P("been", "been"), P("waiting", "ving")], ar: "لم يكونوا ينتظرون." },
    { parts: [P("He", "s"), P("hadn't", "had"), P("been", "been"), P("working", "ving")], ar: "لم يكن يعمل." },
    { parts: [P("We", "s"), P("hadn't", "had"), P("been", "been"), P("talking", "ving")], ar: "لم نكن نتحدث." },
  ];
  const [open, setOpen] = useState<Record<number, boolean>>({});
  return (
    <>
      <FormulaStrip items={[u[0], u[1]]} />
      <Lab emoji="❌" label="FLIP TO NEGATIVE" ar="المس كل بطاقة لتكشف النفي — القاعدة لا تتغير:">
        <div className="grid gap-2">
          {negatives.map((ng, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white px-4 py-2.5">
              {open[i] ? (
                <div className="pop flex flex-wrap items-center gap-3">
                  <PartsLine parts={ng.parts} roles={R29} size="sm" label={false} />
                  <span className="mr-auto text-sm text-slate-500">{ng.ar}</span>
                </div>
              ) : (
                <button type="button" onClick={() => setOpen((o) => ({ ...o, [i]: true }))} className="flex w-full items-center justify-between gap-2">
                  <En className="text-lg font-bold text-slate-400">{ng.parts[0].text} …</En>
                  <span className="rounded-xl bg-rose-500 px-3 py-1 text-xs font-bold text-white">انفِ الجملة ✕</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-xs font-bold text-teal-700"><LatinRuns text="النفي: hadn't + been + verb-ing — لا تلمس been ولا -ing" /></div>
      </Lab>
    </>
  );
}

function S23Questions() {
  const u = U29("s23");
  const qs = [
    { q: u[1], parts: [P("Had", "had"), P("you", "s"), P("been", "been"), P("waiting", "ving"), P("long", "dur")] },
    { q: u[2], parts: [P("Had", "had"), P("she", "s"), P("been", "been"), P("studying", "ving")] },
    { q: u[3], parts: [P("Had", "had"), P("they", "s"), P("been", "been"), P("playing football", "ving")] },
    { q: u[4], parts: [P("Had", "had"), P("he", "s"), P("been", "been"), P("working", "ving"), P("all day", "dur")] },
  ];
  const [i, setI] = useState(0);
  return (
    <>
      <FormulaStrip items={[u[0]]} />
      <Lab emoji="❓" label="MAKE THE QUESTION" ar="في السؤال يتقدّم had إلى أول الجملة — جرّب:">
        <div className="flex flex-wrap justify-center gap-2">
          {qs.map((x, xi) => (
            <button
              key={xi}
              type="button"
              onClick={() => setI(xi)}
              className={`rounded-xl border-2 px-3 py-1.5 font-en text-sm font-bold transition active:scale-95 ${i === xi ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
            >
              {xi + 1}
            </button>
          ))}
        </div>
        <div key={i} className="pop rounded-2xl border-2 border-slate-100 bg-white p-4 text-center">
          <PartsLine parts={qs[i].parts} roles={R29} q size="sm" />
          <div className="mt-2 text-xs font-bold text-violet-700">👆 لاحظ: had قفزت قبل الفاعل — وbeen وverb-ing في مكانهما</div>
        </div>
      </Lab>
    </>
  );
}

function S24ShortAnswers() {
  const u = U29("s24");
  const rows = [
    { q: "Had you been waiting?", yes: "Yes, I had.", no: "No, I hadn't." },
    { q: "Had she been studying?", yes: "Yes, she had.", no: "No, she hadn't." },
    { q: "Had they been traveling?", yes: "Yes, they had.", no: "No, they hadn't." },
  ];
  const [pick, setPick] = useState<Record<number, "y" | "n">>({});
  const all = rows.every((_r, i) => pick[i]);
  return (
    <Lab emoji="🗣️" label="SHORT ANSWERS" ar="أجب بنعم أو لا — ولاحظ بماذا نجيب:">
      {rows.map((r, i) => (
        <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <Nub n={i + 1} />
            <En className="text-lg font-extrabold text-slate-900">{r.q}</En>
            <div className="mr-auto flex gap-1.5">
              <button type="button" onClick={() => setPick((p) => ({ ...p, [i]: "y" }))} className={`rounded-lg border-2 px-3 py-1 text-sm font-bold transition active:scale-95 ${pick[i] === "y" ? "border-transparent bg-emerald-600 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
                نعم
              </button>
              <button type="button" onClick={() => setPick((p) => ({ ...p, [i]: "n" }))} className={`rounded-lg border-2 px-3 py-1 text-sm font-bold transition active:scale-95 ${pick[i] === "n" ? "border-transparent bg-rose-500 text-white" : "border-slate-200 bg-white text-slate-600"}`}>
                لا
              </button>
            </div>
          </div>
          {pick[i] && (
            <div key={pick[i]} className="pop mt-2 pr-11">
              <En className={`text-lg font-extrabold ${pick[i] === "y" ? "text-emerald-700" : "text-rose-600"}`}>{pick[i] === "y" ? r.yes : r.no}</En>
            </div>
          )}
        </div>
      ))}
      {all && (
        <div className="pop">
          <Verdict ok en={u[3]} ar="الإجابة القصيرة بـ had — وليست بـ been" />
        </div>
      )}
    </Lab>
  );
}

function S25Wh() {
  const u = U29("s25");
  const whs = [
    { w: "What", q: u[0] },
    { w: "Where", q: u[1] },
    { w: "Why", q: u[2] },
    { w: "How long", q: u[3] },
  ];
  const [i, setI] = useState(0);
  return (
    <Lab emoji="🧠" label="WH QUESTIONS" ar="اختر أداة السؤال:">
      <div dir="ltr" style={{ direction: "ltr" }} className="ltr-row flex flex-wrap justify-center gap-2">
        {whs.map((x, xi) => (
          <button
            key={x.w}
            type="button"
            onClick={() => setI(xi)}
            className={`rounded-xl border-2 px-3.5 py-1.5 font-en text-sm font-extrabold transition active:scale-95 ${i === xi ? (xi === 3 ? "border-transparent bg-amber-500 text-white" : "border-transparent bg-teal-600 text-white") : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
          >
            {x.w}
          </button>
        ))}
      </div>
      <div key={i} className="pop rounded-2xl border-2 border-slate-100 bg-white p-4 text-center">
        <En className="text-xl font-extrabold text-slate-900 md:text-2xl">{whs[i].q}</En>
      </div>
      {i === 3 && (
        <div className="pop">
          <Verdict ok en={u[4]} ar="How long هي سؤال المدة — قلب هذا الزمن" />
        </div>
      )}
    </Lab>
  );
}

function S26HowLong() {
  const u = U29("s26");
  return (
    <>
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-4 text-center">
        <En className="text-xl font-extrabold text-amber-900 md:text-2xl">{u[0]}</En>
        <div className="mt-1 text-sm text-slate-500">كم كنت قد انتظرت عندما وصل الباص؟</div>
      </div>
      <ThinkReveal prompt={<span className="text-base font-bold text-slate-700">ما الإجابة الطبيعية؟</span>} button="اكشف الإجابة 💡">
        <SentenceCard parts={[P("I", "s"), P("had", "had"), P("been", "been"), P("waiting", "ving"), P("for forty minutes", "dur")]} roles={R29} ar="كنت أنتظر منذ أربعين دقيقة." />
      </ThinkReveal>
    </>
  );
}

function S2728Timeline() {
  const u27 = U29("s27");
  const u28 = U29("s28");
  const [which, setWhich] = useState<"for" | "since">("for");
  return (
    <Lab emoji="⏳" label="FOR & SINCE ON THE TIMELINE" ar="بدّل بين المدة ونقطة البداية:">
      <div className="flex justify-center gap-2">
        {(["for", "since"] as const).map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => setWhich(o)}
            className={`rounded-xl border-2 px-5 py-2 font-en text-lg font-extrabold transition active:scale-95 ${which === o ? "border-transparent bg-amber-500 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"}`}
          >
            {o}
          </button>
        ))}
      </div>
      {which === "for" ? (
        <div key="for" className="pop space-y-2">
          <div className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-center">
            <En className="text-lg font-extrabold text-slate-900 md:text-xl">{u27[0]}</En>
            <div className="mt-1 text-sm text-slate-500">كانت تدرس منذ ثلاث ساعات عندما قاطعها أخوها.</div>
          </div>
          <Track
            nodes={[
              { label: "بدأت الدراسة", color: "border-teal-300 bg-teal-50 text-teal-800" },
              { label: "⏱️ for three hours", en: true, color: "border-amber-300 bg-amber-50 text-amber-900" },
              { label: "brother interrupted", en: true, color: "border-orange-300 bg-orange-50 text-orange-800" },
            ]}
          />
        </div>
      ) : (
        <div key="since" className="pop space-y-2">
          <div className="rounded-2xl border-2 border-slate-100 bg-white p-4 text-center">
            <En className="text-lg font-extrabold text-slate-900 md:text-xl">{u28[0]}</En>
            <div className="mt-1 text-sm text-slate-500">كانوا يعيشون هناك منذ 2018 عندما قرروا الانتقال.</div>
          </div>
          <Track
            nodes={[
              { label: "🕰️ since 2018", en: true, color: "border-amber-300 bg-amber-50 text-amber-900" },
              { label: "living there …", en: true, color: "border-teal-300 bg-teal-50 text-teal-800" },
              { label: "decided to move", en: true, color: "border-orange-300 bg-orange-50 text-orange-800" },
            ]}
          />
        </div>
      )}
      <div className="text-center text-xs font-bold text-slate-500">for تملأ المسافة ⏱️ · since تحدد نقطة الانطلاق 🕰️</div>
    </Lab>
  );
}

// ---------- ㉙–㉚ الأزمنة الأربعة ----------
function TenseGrid({ lines, label, ar }: { lines: string[]; label: string; ar: string }) {
  const parsed = lines.map((ln) => {
    const [head, rest] = ln.split(": ");
    const [sent, view] = (rest ?? "").split(" → ");
    const t: TenseId29 = head.includes("Perfect Continuous") ? "ppc" : head.includes("Perfect") ? "pp" : head.includes("Continuous") ? "pc" : "ps";
    return { t, sent, view };
  });
  const [sel, setSel] = useState<number | undefined>(undefined);
  return (
    <Lab emoji="⚖️" label={label} ar={ar}>
      <div className="grid gap-2 md:grid-cols-2">
        {parsed.map((x, i) => {
          const v = TENSES[x.t];
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSel(i)}
              className={`rounded-2xl border-2 p-3.5 text-center transition active:scale-[0.98] ${sel === i ? `${v.soft} ring-4 ${v.ring}` : "border-slate-200 bg-white hover:border-slate-300"}`}
            >
              <div className="flex justify-center">
                <TenseChip t={x.t} small />
              </div>
              <En className="mt-2 block text-lg font-extrabold text-slate-900">{x.sent}</En>
              {sel === i && (
                <div className="pop mt-2 space-y-1">
                  <En className="block text-sm font-bold text-slate-600">{x.view}</En>
                  <div className={`text-sm font-black ${v.text}`}>{v.emoji} {v.qAr}</div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="text-center text-xs font-bold text-slate-400">المس البطاقات الأربع لتسمع سؤال كل زمن</div>
    </Lab>
  );
}

function S30FourWays() {
  const u = U29("s30");
  const steps: { t: TenseId29; sent: string; cap: string }[] = [
    { t: "ps", sent: u[0], cap: "حدث ماضٍ — متى؟ أمس." },
    { t: "pc", sent: u[1], cap: "نشاط جارٍ في لحظة ماضية — الساعة 8:00." },
    { t: "pp", sent: u[2], cap: "اكتمل قبل حدث ماضٍ آخر — قبل أن أنتقل." },
    { t: "ppc", sent: u[3], cap: "استمر ثلاث سنوات قبل حدث ماضٍ — المدة هي البطل." },
  ];
  const [i, setI] = useState(0);
  const v = TENSES[steps[i].t];
  return (
    <Lab emoji="🎯" label="Four-Tense Timeline Lab" ar="جملة واحدة (أدرس الإنجليزية) بأربع عدسات — تنقّل:">
      <div className="flex flex-wrap justify-center gap-2">
        {steps.map((s, si) => (
          <TenseChip key={si} t={s.t} small onClick={() => setI(si)} active={i === si} />
        ))}
      </div>
      <div key={i} className={`pop rounded-2xl border-2 p-4 text-center ${v.soft}`}>
        <En className="text-lg font-extrabold text-slate-900 md:text-xl">{steps[i].sent}</En>
        <div className={`mt-2 text-sm font-bold ${v.text}`}>{v.emoji} {steps[i].cap}</div>
      </div>
      <Track
        nodes={[
          { label: "earlier past", en: true, color: i >= 2 ? "border-violet-300 bg-violet-50 text-violet-800" : undefined },
          { label: i === 3 ? "⏳⏳⏳" : "…", color: i === 3 ? "border-teal-300 bg-teal-50 text-teal-800" : undefined },
          { label: "past point", en: true, color: i >= 1 ? "border-orange-300 bg-orange-50 text-orange-800" : undefined },
          { label: "now", en: true },
        ]}
      />
    </Lab>
  );
}

// ---------- ㉛–㉜ المحقق ----------
function S31Daniel() {
  const u = U29("s31");
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4 text-center">
        <En className="text-lg font-extrabold leading-relaxed text-slate-900 md:text-xl">{u[0]}</En>
        <div className="mt-1 text-sm text-slate-500">عندما وصل دانيال إلى النادي، كان أصدقاؤه يتدربون منذ ساعتين.</div>
      </div>
      <Lab emoji="🕵️" label="GRAMMAR DETECTIVE" ar="حلل الفعلين — ما زمن كل منهما؟">
        <DetectivePick
          verbs={DANIEL29_VERBS}
          onDone={
            <div className="pop space-y-2">
              <Track
                nodes={[
                  { label: "training began", en: true, color: "border-teal-300 bg-teal-50 text-teal-800" },
                  { label: "two hours passed", en: true, color: "border-amber-300 bg-amber-50 text-amber-900" },
                  { label: "Daniel arrived", en: true, color: "border-orange-300 bg-orange-50 text-orange-800" },
                ]}
              />
              <div className="tada text-center text-sm font-bold text-emerald-700">🎉 قضية محلولة — التدريب سبق الوصول واستمر حتى لحظته</div>
            </div>
          }
        />
      </Lab>
    </>
  );
}

function S32Scientists() {
  const u = U29("s32");
  return (
    <FlipPair
      a={{ en: u[0], cap: "🏁 أنهوا التجربة — اكتمال قبل وصول الزوار.", tag: "pp" }}
      b={{ en: u[1], cap: "🔄 ست ساعات من العمل المتواصل قبل وصولهم — النشاط والمدة.", tag: "ppc" }}
      note={u[2]}
      noteEn
    />
  );
}

// ---------- ㉝–㉟ IQ200 ----------
function IqCard({ iq }: { iq: { title: string; lead: string; opts: string[]; answer: number; why: string; sourceVerdict: string } }) {
  const [pick, setPick] = useState<number | undefined>(undefined);
  const right = pick === iq.answer;
  return (
    <Lab emoji="🧠" label="IQ200" ar={iq.lead}>
      <div className="grid gap-2">
        {iq.opts.map((o, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => setPick(oi)}
            className={`rounded-2xl border-2 p-3.5 text-left transition active:scale-[0.99] ${
              pick === oi ? (oi === iq.answer ? "border-emerald-300 bg-emerald-50" : "border-rose-300 bg-rose-50") : "border-slate-200 bg-white hover:border-teal-300"
            }`}
          >
            <span className="mb-1 inline-block rounded-md bg-slate-100 px-2 py-0.5 font-en text-xs font-black text-slate-500">{oi === 0 ? "A" : "B"}</span>
            <En className="block text-lg font-extrabold text-slate-900">{o}</En>
          </button>
        ))}
      </div>
      {pick !== undefined && (
        <div className="pop space-y-2">
          {right ? (
            <div className="tada rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-800">✓ <Rich text={iq.why} /></div>
          ) : (
            <div className="shake rounded-2xl border-2 border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700">✕ قريب — <Rich text={iq.why} /></div>
          )}
          <SourceReveal text={iq.sourceVerdict} />
        </div>
      )}
    </Lab>
  );
}

// ---------- ㊳ صحّح الخطأ ----------
function S38Fix() {
  const u = U29("s38");
  return (
    <div className="grid gap-2.5">
      {EX29_FIX.map((fx, i) => (
        <FixRow key={i} n={i + 1} fx={fx} sourceLine={u[i]} />
      ))}
    </div>
  );
}

function FixRow({ n, fx, sourceLine }: { n: number; fx: { segs: string[]; bad: number; correct: string; why: string }; sourceLine: string }) {
  const [found, setFound] = useState(false);
  const [miss, setMiss] = useState(false);
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`rounded-3xl border-2 p-3.5 transition ${revealed ? "border-emerald-300 bg-emerald-50/50" : found ? "border-amber-300 bg-amber-50/50" : "border-slate-200 bg-white"}`}>
      <div className="flex flex-wrap items-center gap-2.5">
        <Nub n={n} className="bg-rose-500" />
        <div dir="ltr" style={{ direction: "ltr" }} className={`ltr-row flex flex-wrap gap-1.5 ${miss ? "shake" : ""}`}>
          {fx.segs.map((seg, si) => (
            <button
              key={si}
              type="button"
              disabled={found}
              onClick={() => {
                if (si === fx.bad) {
                  setFound(true);
                  setMiss(false);
                } else setMiss(true);
              }}
              className={`rounded-xl border-2 px-3 py-1.5 font-en text-base font-bold transition active:scale-95 md:text-lg ${
                found && si === fx.bad ? "border-rose-400 bg-rose-100 text-rose-800 line-through decoration-rose-400" : "border-slate-200 bg-white text-slate-800 hover:border-rose-300"
              } disabled:cursor-default`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>
      {miss && !found && <div className="mt-2 pr-11 text-sm font-bold text-rose-600">✕ ليس هذا الجزء — أين يكسر القاعدة had been + verb-ing؟</div>}
      {found && !revealed && (
        <div className="mt-2 flex flex-wrap items-center gap-2 pr-11">
          <span className="text-sm font-bold text-amber-700">✓ وجدت الخطأ!</span>
          <button type="button" onClick={() => setRevealed(true)} className="rounded-xl bg-emerald-600 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-emerald-700">
            اكشف التصحيح 💡
          </button>
        </div>
      )}
      {revealed && (
        <div className="tada mt-2 space-y-1.5 pr-11">
          <En className="block text-lg font-extrabold text-emerald-700">→ {fx.correct}</En>
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">💡 {fx.why}</span>
          <div>
            <SourceReveal text={sourceLine} />
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- ㊴ اختر الزمن من المعنى ----------
function S39Meaning() {
  const u = U29("s39");
  const [answered, setAnswered] = useState(0);
  return (
    <div className="space-y-2.5">
      {EX29_MEANING.map((m, i) => (
        <McqRow key={i} n={i + 1} stemAr={m.ar} opts={EX29_MEANING_OPTS} answer={m.answer} why={m.why} onFirstAnswer={() => setAnswered((v) => v + 1)} />
      ))}
      {answered >= EX29_MEANING.length && <SourceReveal text={u[3]} />}
    </div>
  );
}

// ---------- ㊵ تحدي الزمن الذكي ----------
function S40Decision() {
  const u = U29("s40");
  const questions = [
    { q: "Did practice begin before the coach arrived?", a: "Yes" },
    { q: "Was there ongoing activity?", a: "Yes" },
    { q: "Is duration stated?", a: "Yes" },
  ];
  const [step, setStep] = useState(0);
  const [wrong, setWrong] = useState(false);
  const done = step >= questions.length;
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4 text-center">
        <En className="text-lg font-extrabold text-slate-900 md:text-xl">{u[0]}</En>
        <div className="mt-1 text-sm text-slate-500">عندما وصل المدرب، كان اللاعبون يتدربون منذ ساعة.</div>
      </div>
      <Lab emoji="🧠" label="DECISION MACHINE" ar="أجب عن الأسئلة الثلاثة لتصل إلى الزمن الصحيح:">
        {questions.map((qa, i) => (
          <div key={i} className={`rounded-2xl border-2 p-3 transition ${i < step ? "border-emerald-200 bg-emerald-50/60" : i === step ? "border-teal-300 bg-white" : "border-slate-100 bg-slate-50 opacity-50"}`}>
            <div className="flex flex-wrap items-center gap-2">
              <Nub n={i + 1} />
              <En className="text-base font-extrabold text-slate-800 md:text-lg">{qa.q}</En>
              {i < step ? (
                <En className="mr-auto rounded-lg bg-emerald-600 px-3 py-1 text-sm font-black text-white">Yes ✓</En>
              ) : i === step ? (
                <div className={`mr-auto flex gap-1.5 ${wrong ? "shake" : ""}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setStep((s) => s + 1);
                      setWrong(false);
                    }}
                    className="rounded-lg border-2 border-slate-200 bg-white px-3.5 py-1 font-en text-sm font-bold text-slate-700 transition hover:border-emerald-400 active:scale-95"
                  >
                    Yes
                  </button>
                  <button type="button" onClick={() => setWrong(true)} className="rounded-lg border-2 border-slate-200 bg-white px-3.5 py-1 font-en text-sm font-bold text-slate-700 transition hover:border-rose-300 active:scale-95">
                    No
                  </button>
                </div>
              ) : null}
            </div>
            {wrong && i === step && <div className="mt-1.5 pr-11 text-sm font-bold text-rose-600">✕ أعد قراءة الجملة — الدليل موجود فيها</div>}
          </div>
        ))}
        {done && (
          <div className="pop space-y-2">
            <div className="tada flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-300 bg-teal-50 p-4">
              <En className="text-lg font-black text-teal-800">{u[4]}</En>
              <TenseChip t="ppc" small />
            </div>
          </div>
        )}
      </Lab>
    </>
  );
}

// ---------- ㊶–㊷ قصة Mia ----------
function S41Mia() {
  const u = U29("s41");
  const story = u[0];
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">{story}</En>
        <div className="mt-2 text-sm text-slate-500">
          عندما وصلت ميا إلى مختبر العلوم، كان الطلاب يعملون منذ ما يقارب ثلاث ساعات — بعضهم يختبر روبوتًا صغيرًا، وآخرون يكتبون الملاحظات…
        </div>
      </div>
      <Lab emoji="🎬" label="STORY DETECTIVE" ar="سبعة أفعال في القصة — حدد زمن كل فعل:">
        <DetectivePick verbs={MIA29_VERBS} onDone={<div className="tada text-center text-sm font-bold text-emerald-700">🎉 حللت القصة كاملة — جاهز لخريطتها الزمنية في الخطوة التالية</div>} />
      </Lab>
    </>
  );
}

function S42Map() {
  const u = U29("s42");
  const [stage, setStage] = useState(0);
  const students = ["started working", "worked for nearly three hours", "Mia arrived", "students were still working"];
  const mia = ["started walking", "continued walking quickly", "arrived", "was tired"];
  return (
    <Lab emoji="🗺️" label="Mia Story Timeline" ar="خطّان زمنيان متوازيان — تنقّل بين المراحل:">
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setStage(n - 1)}
            className={`grid h-10 w-10 place-items-center rounded-xl border-2 text-base font-black transition active:scale-95 ${stage === n - 1 ? "border-transparent bg-teal-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal-300"}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-xs font-black text-teal-700">الطلاب 🧪</span>
          <div className="min-w-0 flex-1">
            <Track nodes={students.map((s, si) => ({ label: s, en: true, color: si <= stage ? "border-teal-300 bg-teal-50 text-teal-800" : undefined }))} active={stage} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-xs font-black text-fuchsia-700">Mia 🚶‍♀️</span>
          <div className="min-w-0 flex-1">
            <Track nodes={mia.map((s, si) => ({ label: s, en: true, color: si <= stage ? "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800" : undefined }))} active={stage} />
          </div>
        </div>
      </div>
      {stage === 3 && (
        <div className="pop">
          <Verdict ok en={u[2]} ar="الخريطة الزمنية تُقرأ كمعنى — لا كقائمة أحداث" />
        </div>
      )}
    </Lab>
  );
}

// ---------- ㊸ Boss Battle ----------
function S43Boss() {
  const u = U29("s43");
  const [done, setDone] = useState(0);
  return (
    <div className="space-y-2.5">
      {BOSS29.map((b, i) => (
        <BossDuel key={i} n={i + 1} duel={b} sourceLine={u[i]} onDone={() => setDone((d) => d + 1)} />
      ))}
      {done >= BOSS29.length && <div className="tada text-center text-3xl">🏆</div>}
    </div>
  );
}

function BossDuel({ n, duel, sourceLine, onDone }: { n: number; duel: { a: string; b: string; preferred: 0 | 1; why: string }; sourceLine: string; onDone: () => void }) {
  const [pick, setPick] = useState<number | undefined>(undefined);
  const opts = [duel.a, duel.b];
  return (
    <div className={`rounded-3xl border-2 p-3.5 transition ${pick === undefined ? "border-slate-200 bg-white" : pick === duel.preferred ? "border-emerald-300 bg-emerald-50/50" : "border-amber-300 bg-amber-50/50"}`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">⚔️</span>
        <span className="text-sm font-black text-slate-700">المعركة {n} — أي جملة أنسب للمعنى؟</span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {opts.map((o, oi) => (
          <button
            key={oi}
            type="button"
            onClick={() => {
              if (pick === undefined) onDone();
              setPick(oi);
            }}
            className={`rounded-2xl border-2 p-3 text-left transition active:scale-[0.98] ${
              pick === oi ? (oi === duel.preferred ? "border-emerald-400 bg-emerald-50" : "border-amber-400 bg-amber-50") : "border-slate-200 bg-white hover:border-teal-300"
            }`}
          >
            <En className="text-base font-extrabold text-slate-900 md:text-lg">{o}</En>
          </button>
        ))}
      </div>
      {pick !== undefined && (
        <div className="pop mt-2 space-y-1.5">
          <div className={`text-sm font-bold ${pick === duel.preferred ? "text-emerald-700" : "text-amber-700"}`}>
            {pick === duel.preferred ? "✓ " : "⚖️ المصدر يفضّل الأخرى — "}
            <Rich text={duel.why} />
          </div>
          <SourceReveal text={sourceLine} />
        </div>
      )}
    </div>
  );
}

// ---------- ㊹ قاعدة IQ200 النهائية ----------
function S44FinalRule() {
  const u = U29("s44");
  const steps = ["What is the activity?", "Did it begin before a past point?", "Did it continue for a period?", "Are we emphasizing continuity/activity/duration or its effect?"];
  const stepsAr = ["ما النشاط؟", "هل بدأ قبل نقطة ماضية؟", "هل استمر لفترة؟", "هل نُبرز الاستمرار/النشاط/المدة أو أثرها؟"];
  const [n, setN] = useState(0);
  return (
    <>
      <Note emoji="🧠" text={u[0]} />
      <Lab emoji="✅" label="THE FINAL CHECKLIST" ar="أربعة أسئلة قبل اختيار الزمن — افتحها بالترتيب:">
        <div className="grid gap-2">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-start gap-3 rounded-2xl border-2 p-3 transition ${i < n ? "border-teal-200 bg-teal-50/70" : "border-slate-100 bg-slate-50 opacity-60"}`}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${i < n ? "bg-teal-600" : "bg-slate-300"}`}>{i + 1}</span>
              {i < n ? (
                <div className="pop min-w-0">
                  <EnAr en={s} ar={stepsAr[i]} enClassName="block text-base font-extrabold text-slate-900" arClassName="text-sm font-bold text-slate-500" />
                </div>
              ) : (
                <span className="pt-1 text-sm font-bold text-slate-400">؟</span>
              )}
            </div>
          ))}
        </div>
        {n < steps.length ? (
          <div className="flex justify-center">
            <button type="button" onClick={() => setN((v) => v + 1)} className="rounded-xl bg-teal-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-teal-700 active:scale-95">
              السؤال التالي ←
            </button>
          </div>
        ) : (
          <div className="pop space-y-2">
            <div className="tada flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-teal-300 bg-teal-50 p-4">
              <En className="text-lg font-black text-teal-800">{u[2]}</En>
              <TenseChip t="ppc" small />
            </div>
          </div>
        )}
      </Lab>
    </>
  );
}

// ---------- الخاتمة ----------
function SummarySlide() {
  const u = U29("summary");
  return (
    <>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {[
          { t: "الصيغة", e: u[0].replace("Past Perfect Continuous: ", "") },
          { t: "مثال", e: u[1] },
          { t: "النفي", e: u[2].replace("Negative: ", "") },
          { t: "السؤال", e: u[3].replace("Question: ", "") },
          { t: "المدة", e: u[4].replace("Duration: ", "") },
          { t: "نقطة البداية", e: u[5].replace("Starting point: ", "") },
        ].map((x, i) => (
          <div key={i} className={`pop pop-${Math.min(i + 1, 6)} rounded-3xl border-2 border-teal-200 bg-teal-50/60 p-4`}>
            <div className="font-head text-lg font-bold text-teal-800">{x.t}</div>
            <En className="mt-1 block text-base font-bold text-slate-700 md:text-lg">{x.e}</En>
          </div>
        ))}
      </div>
      <SentenceCard parts={HERO_PARTS} roles={R29} ar="كنت أدرس منذ ثلاث ساعات عندما اتصل صديقي." note="القاعدة كلها في جملة واحدة" />
    </>
  );
}

function FinalChallenge({ onExit, onGoTest }: { onExit: () => void; onGoTest: () => void }) {
  const u = U29("final");
  return (
    <>
      <div className="rounded-3xl border-2 border-slate-100 bg-white p-4">
        <En className="block text-base font-bold leading-relaxed text-slate-800 md:text-lg">{u[0]}</En>
        <div className="mt-2 text-sm text-slate-500">عندما وصل فريق الإنقاذ، كان القرويون ينتظرون منذ عدة ساعات، وكان المطر لا يزال يهطل، وكان النهر قد غمر الطريق الرئيسي بالفعل.</div>
      </div>
      <Lab emoji="🚀" label="Final IQ200 Challenge" ar="أربعة أفعال — أربعة أزمنة. حلل الجملة كاملة:">
        <DetectivePick
          verbs={RESCUE29_VERBS}
          onDone={
            <div className="pop space-y-2">
              <Track
                nodes={[
                  { label: "river had flooded", en: true, color: "border-violet-300 bg-violet-50 text-violet-800" },
                  { label: "villagers waiting for hours", en: true, color: "border-teal-300 bg-teal-50 text-teal-800" },
                  { label: "rain still falling", en: true, color: "border-sky-300 bg-sky-50 text-sky-800" },
                  { label: "rescue team arrived", en: true, color: "border-orange-300 bg-orange-50 text-orange-800" },
                ]}
              />
              <Verdict ok en={u[5]} ar="لم تعد تحفظ أربع قواعد منفصلة — صرت تبني خطًا زمنيًا كاملًا" />
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button type="button" onClick={onGoTest} className="rounded-xl bg-teal-600 px-5 py-2.5 font-bold text-white shadow transition hover:bg-teal-700">
                  📝 إلى منطقة الاختبارات (20 سؤالًا)
                </button>
                <button type="button" onClick={onExit} className="rounded-xl bg-slate-100 px-5 py-2.5 font-bold text-slate-700 transition hover:bg-slate-200">
                  جميع الدروس
                </button>
              </div>
            </div>
          }
        />
      </Lab>
    </>
  );
}

// ============================================================
// تعريف الخطوات — 48 خطوة: فكرة واحدة لكل خطوة
// ============================================================

type Slide = { id: string; section: string; mascot: string; title: string; step?: string; lead?: string; tip?: string };

const slides: Slide[] = [
  { id: "cover", section: "البداية", mascot: "⏳", title: "الغلاف" },
  { id: "objectives", section: "البداية", mascot: "🎯", title: "أهداف الدرس" },
  { id: "s1", section: "الفكرة", mascot: "🧠", title: "ما هو Past Perfect Continuous؟", step: "1", lead: "نشاط بدأ في الماضي، واستمر لفترة، ثم وصلنا إلى نقطة ماضية أخرى.", tip: "سؤال هذا الزمن دائمًا: ماذا كان مستمرًا قبل تلك اللحظة الماضية؟" },
  { id: "s2", section: "الفكرة", mascot: "🕰️", title: "خط الزمن", step: "2", lead: "ثلاث علامات: البداية، الاستمرار، والنقطة الماضية." },
  { id: "s3", section: "التكوين", mascot: "⭐", title: "القاعدة الذهبية", step: "3", lead: "ركّبها بنفسك — ثم شاهدها في خمس جمل.", tip: "had been لا تنفصل أبدًا — ثم يأتي النشاط بصيغة -ing." },
  { id: "s4", section: "التكوين", mascot: "🔥", title: "أهم شيء: had لا تتغير", step: "4", lead: "مع كل الضمائر — بلا استثناء." },
  { id: "s5", section: "التكوين", mascot: "🧩", title: "لماذا نستخدم been؟", step: "5", lead: "ثلاث قطع، ولكل قطعة وظيفة." },
  { id: "s6", section: "النتيجة أم النشاط؟", mascot: "🧠", title: "قارن: had studied أم had been studying؟", step: "6", lead: "جملتان صحيحتان — والفرق في التركيز." },
  { id: "s7", section: "النتيجة أم النشاط؟", mascot: "🎯", title: "مثال واضح جدًا", step: "7", lead: "الغرفة نفسها — وقصتان مختلفتان." },
  { id: "s8", section: "for و since", mascot: "⏱️", title: "for = لمدة", step: "8" },
  { id: "s9", section: "for و since", mascot: "🕰️", title: "since = منذ", step: "9" },
  { id: "s10", section: "for و since", mascot: "🚨", title: "الفرق بين for و since", step: "10", lead: "كم مدة؟ أم منذ متى؟", tip: "اسأل السؤال الصحيح: كم مدة؟ ← for · منذ متى؟ ← since" },
  { id: "s11", section: "for و since", mascot: "🧠", title: "مثال IQ200", step: "11", lead: "اسأل السؤال — والجواب يحدد الأداة." },
  { id: "s12", section: "for و since", mascot: "🔥", title: "أمثلة متنوعة", step: "12", lead: "أربع جمل كاملة بالتشريح الملون." },
  { id: "s13", section: "المقارنات", mascot: "🎥", title: "Past Continuous أم Past Perfect Continuous؟", step: "13" },
  { id: "s14", section: "المقارنات", mascot: "🖼️", title: "الفرق في الصورة", step: "14", lead: "لقطة واحدة… أم فيلم كامل قبل اللقطة؟" },
  { id: "s15", section: "المقارنات", mascot: "🔥", title: "Past Perfect أم Past Perfect Continuous؟", step: "15" },
  { id: "s16", section: "المقارنات", mascot: "🧠", title: "ليست «نتيجة مقابل مدة» دائمًا", step: "16", lead: "المعنى أولًا — ثم الاختيار." },
  { id: "s17", section: "المقارنات", mascot: "💡", title: "الأثر الظاهر", step: "17", lead: "النشاط المستمر يفسّر ما نراه." },
  { id: "s18", section: "المقارنات", mascot: "🧠", title: "هل يجب أن يستمر حتى الحدث الثاني؟", step: "18" },
  { id: "s19", section: "قواعد وأشكال", mascot: "🚨", title: "الأفعال التي لا نستخدمها عادةً في المستمر", step: "19", tip: "فعل حالة + مدة ← Past Perfect: I had known him for years." },
  { id: "s20", section: "قواعد وأشكال", mascot: "⭐", title: "مع الأفعال المنتظمة", step: "20" },
  { id: "s21", section: "قواعد وأشكال", mascot: "🔤", title: "قواعد -ing", step: "21" },
  { id: "s22", section: "النفي والأسئلة", mascot: "❌", title: "النفي", step: "22", lead: "hadn't been + verb-ing — القاعدة لا تتغير." },
  { id: "s23", section: "النفي والأسئلة", mascot: "❓", title: "الأسئلة", step: "23", lead: "had تتقدم — والباقي في مكانه." },
  { id: "s24", section: "النفي والأسئلة", mascot: "🗣️", title: "الإجابات القصيرة", step: "24" },
  { id: "s25", section: "النفي والأسئلة", mascot: "🧠", title: "أسئلة Wh", step: "25" },
  { id: "s26", section: "النفي والأسئلة", mascot: "⭐", title: "How long — سؤال المدة", step: "26" },
  { id: "s2728", section: "على الخط الزمني", mascot: "⏳", title: "for و since على الخط الزمني", step: "27" },
  { id: "s29", section: "الأزمنة الأربعة", mascot: "⚖️", title: "مقارنة شاملة — الأزمنة الأربعة", step: "29", lead: "أربع عدسات لنفس الماضي." },
  { id: "s30", section: "الأزمنة الأربعة", mascot: "🎯", title: "مثال واحد يجمع الأربعة", step: "30" },
  { id: "s31", section: "المحقق", mascot: "🕵️", title: "Grammar Detective — جملة Daniel", step: "31" },
  { id: "s32", section: "المحقق", mascot: "🔬", title: "العلماء والتجربة", step: "32", lead: "علاقة واحدة — ووجهتا نظر." },
  { id: "s33", section: "أسئلة IQ200", mascot: "🧠", title: "سؤال IQ200 — العيون الحمراء", step: "33" },
  { id: "s34", section: "أسئلة IQ200", mascot: "🧠", title: "سؤال أصعب — كلتاهما ممكنة!", step: "34" },
  { id: "s35", section: "أسئلة IQ200", mascot: "🚨", title: "لا تستخدمه فقط لأن هناك for", step: "35" },
  { id: "s36", section: "التدريبات", mascot: "🧪", title: "تدريب 1 — اختر الصيغة الصحيحة", step: "36", lead: "تصحيح فوري مع السبب — وسطر إجابات المصدر يظهر بعد المحاولة." },
  { id: "s37", section: "التدريبات", mascot: "🧪", title: "تدريب 2 — for أم since؟", step: "37" },
  { id: "s38", section: "التدريبات", mascot: "🔍", title: "تدريب 3 — صحّح الخطأ", step: "38", lead: "المس الجزء الخاطئ أولًا — ثم اكشف التصحيح." },
  { id: "s39", section: "التدريبات", mascot: "🚀", title: "IQ200 — اختر الزمن من المعنى", step: "39" },
  { id: "s40", section: "التدريبات", mascot: "🧠", title: "تحدي الزمن الذكي", step: "40" },
  { id: "s41", section: "القصة", mascot: "🎬", title: "قصة متقدمة — Mia في المختبر", step: "41" },
  { id: "s42", section: "القصة", mascot: "🗺️", title: "خريطة القصة", step: "42" },
  { id: "s43", section: "التحديات", mascot: "🏆", title: "Boss Battle", step: "43", lead: "ثلاث معارك — اختر الجملة الأنسب للمعنى." },
  { id: "s44", section: "التحديات", mascot: "🧠", title: "قاعدة IQ200 النهائية", step: "44" },
  { id: "summary", section: "الخاتمة", mascot: "🏆", title: "الملخص النهائي" },
  { id: "fourtense", section: "الخاتمة", mascot: "⚔️", title: "الفرق النهائي بين الأزمنة الأربعة" },
  { id: "final", section: "الخاتمة", mascot: "🚀", title: "FINAL IQ200 CHALLENGE" },
];

const SLIDE_SOURCE: Record<string, string[]> = {
  cover: ["cover"],
  objectives: ["objectives"],
  s2728: ["s27", "s28"],
  summary: ["summary"],
  fourtense: ["four-tense"],
  final: ["final"],
};
function sourceTitleFor(id: string): string {
  const ids = SLIDE_SOURCE[id] ?? [id];
  return ids.map((x) => SOURCE_SECTIONS[SEC29[x]].title).join(" + ");
}

function SlideBody({ id, onExit, onGoTest }: { id: string; onExit: () => void; onGoTest: () => void }) {
  switch (id) {
    case "s1": return <S1Concept />;
    case "s2": return <S2Timeline />;
    case "s3": return <S3Formula />;
    case "s4": return <S4Had />;
    case "s5": return <S5Been />;
    case "s6": return <S6Focus />;
    case "s7": return <S7Example />;
    case "s8": return <DurLab secId="s8" role="for" />;
    case "s9": return <DurLab secId="s9" role="since" />;
    case "s10": return <S10ForSince />;
    case "s11": return <S11IQExample />;
    case "s12": return <S12Gallery />;
    case "s13": return <S13PCvsPPC />;
    case "s14": return <S14Pictures />;
    case "s15": return <S15PPvsPPC />;
    case "s16": return <S16NotAbsolute />;
    case "s17": return <S17Effect />;
    case "s18": return <S18Myth />;
    case "s19": return <S19Stative />;
    case "s20": return <S20Regular />;
    case "s21": return <S21IngRules />;
    case "s22": return <S22Negative />;
    case "s23": return <S23Questions />;
    case "s24": return <S24ShortAnswers />;
    case "s25": return <S25Wh />;
    case "s26": return <S26HowLong />;
    case "s2728": return <S2728Timeline />;
    case "s29": return <TenseGrid lines={U29("s29")} label="Four-Tense Comparator" ar="المس كل بطاقة لتكشف وجهة نظرها:" />;
    case "s30": return <S30FourWays />;
    case "s31": return <S31Daniel />;
    case "s32": return <S32Scientists />;
    case "s33": return <IqCard iq={IQ29_33} />;
    case "s34": return <IqCard iq={IQ29_34} />;
    case "s35": return <IqCard iq={IQ29_35} />;
    case "s36": return <McqSet items={EX29_FILL} sourceAnswersLine={U29("s36")[5]} />;
    case "s37": return <McqSet items={EX29_FORSINCE} sourceAnswersLine={U29("s37")[5]} />;
    case "s38": return <S38Fix />;
    case "s39": return <S39Meaning />;
    case "s40": return <S40Decision />;
    case "s41": return <S41Mia />;
    case "s42": return <S42Map />;
    case "s43": return <S43Boss />;
    case "s44": return <S44FinalRule />;
    case "summary": return <SummarySlide />;
    case "fourtense": return <TenseGrid lines={U29("four-tense")} label="THE FINAL DIFFERENCE" ar="المقارنة الرباعية الأخيرة — المس البطاقات:" />;
    case "final": return <FinalChallenge onExit={onExit} onGoTest={onGoTest} />;
    default: return null;
  }
}

function SlideView({ slide, onExit, onGoTest }: { slide: Slide; onExit: () => void; onGoTest: () => void }) {
  if (slide.id === "cover") return <Cover />;
  if (slide.id === "objectives") return <Objectives />;
  return (
    <Frame mascot={slide.mascot} step={slide.step} badge={slide.step ? undefined : "الخاتمة"} title={slide.title} lead={slide.lead} tip={slide.tip} accent={ACCENT29} sourceTag={sourceTitleFor(slide.id)}>
      <SlideBody id={slide.id} onExit={onExit} onGoTest={onGoTest} />
    </Frame>
  );
}

// ============================================================
// منطقة الاختبارات — 20 سؤالًا · الاختيار ≠ التصحيح · لا كشف قبل Submit
// ============================================================

type TestAnswer = number | number[] | Record<number, number>;

function isAnswered(q: TestQ29, a: TestAnswer | undefined): boolean {
  if (a === undefined) return false;
  const type = q[0];
  if (type === "multi") return Array.isArray(a) && a.length > 0;
  if (type === "order") return Array.isArray(a) && a.length === (q[2] as string[]).length;
  if (type === "match") {
    const m = q[2] as { l: string[]; r: string[] };
    return typeof a === "object" && !Array.isArray(a) && m.l.every((_x, i) => (a as Record<number, number>)[i] !== undefined);
  }
  return typeof a === "number";
}

function isCorrect(q: TestQ29, a: TestAnswer | undefined): boolean {
  if (!isAnswered(q, a)) return false;
  const type = q[0];
  if (type === "multi") {
    const want = [...(q[3] as number[])].sort().join(",");
    return [...(a as number[])].sort().join(",") === want;
  }
  if (type === "order") return (a as number[]).join(",") === (q[3] as number[]).join(",");
  if (type === "match") {
    const want = q[3] as number[];
    return want.every((w, i) => (a as Record<number, number>)[i] === w);
  }
  return a === q[3];
}

const TYPE_LABEL: Record<string, string> = {
  single: "اختيار واحد",
  tf: "صح / خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
};

function TestArea({ onSubmitted }: { onSubmitted: () => void }) {
  const [answers, setAnswers] = useState<Record<number, TestAnswer>>({});
  const [checked, setChecked] = useState(false);
  const answeredCount = TEST_29.reduce((n, q, i) => n + (isAnswered(q, answers[i]) ? 1 : 0), 0);
  const all = answeredCount === TEST_29.length;
  const score = useMemo(() => TEST_29.reduce((s, q, i) => s + (isCorrect(q, answers[i]) ? 1 : 0), 0), [answers]);
  const pct = Math.round((score / TEST_29.length) * 100);
  const msg =
    pct === 100 ? "🏆 علامة كاملة — أتقنت الماضي التام المستمر!"
    : pct >= 80 ? "🌟 رائع جدًا! راجع الأسئلة الخاطئة في صفحة الحلول."
    : pct >= 60 ? "👍 جيد! افتح الحلول المفصلة ثم أعد المحاولة."
    : "💪 لا بأس — أعد المرور على خطوات الدرس ثم عد للاختبار.";

  const set = (i: number, v: TestAnswer) => {
    if (!checked) setAnswers((p) => ({ ...p, [i]: v }));
  };
  const reset = () => {
    setAnswers({});
    setChecked(false);
  };

  return (
    <div data-area="lesson29-test" className="space-y-4">
      <Frame mascot="📝" badge="Test Area" title="منطقة الاختبارات — 20 سؤالًا" lead="أجب عن الأسئلة كلها ثم اضغط «تسليم الاختبار». لا يظهر أي تصحيح أو نتيجة قبل التسليم." accent={ACCENT29}>
        <div className="grid gap-3">
          {TEST_29.map((q, i) => {
            const a = answers[i];
            const answered = isAnswered(q, a);
            const right = isCorrect(q, a);
            let card = "border-slate-200 bg-white";
            if (checked) card = right ? "border-emerald-300 bg-emerald-50/50" : "border-rose-300 bg-rose-50/50";
            else if (answered) card = "border-slate-300 bg-slate-50/70";
            return (
              <div key={i} className={`rounded-3xl border-2 p-4 transition ${card}`}>
                <div className="flex flex-wrap items-start gap-3">
                  <Nub n={i + 1} className="bg-slate-900" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-500">{TYPE_LABEL[q[0]]}</span>
                      {checked && <span className={`text-sm font-black ${right ? "text-emerald-700" : "text-rose-600"}`}>{right ? "✓ صحيح" : "✕ راجع الحلول"}</span>}
                    </div>
                    <Rich text={q[1]} className="mt-1 block text-base font-bold text-slate-800 md:text-lg" />
                    <div className="mt-3">
                      <TestQuestionBody q={q} a={a} onChange={(v) => set(i, v)} disabled={checked} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sticky bottom-2 z-10 flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-100 bg-white/95 p-3 shadow-lg backdrop-blur">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">أجبت عن {answeredCount} / {TEST_29.length}</span>
          {!checked ? (
            <button
              type="button"
              disabled={!all}
              onClick={() => {
                setChecked(true);
                onSubmitted();
              }}
              className="mr-auto rounded-xl bg-teal-600 px-6 py-2.5 font-bold text-white shadow transition enabled:hover:bg-teal-700 disabled:opacity-40"
            >
              تسليم الاختبار ✅
            </button>
          ) : (
            <>
              <span className="rounded-xl bg-slate-900 px-4 py-2 font-black text-white">النتيجة: {score} / {TEST_29.length}</span>
              <span className="text-sm font-bold text-slate-600">{msg}</span>
              <button type="button" onClick={reset} className="mr-auto rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200">
                إعادة الاختبار ↺
              </button>
            </>
          )}
        </div>
      </Frame>
    </div>
  );
}

function TestQuestionBody({ q, a, onChange, disabled }: { q: TestQ29; a: TestAnswer | undefined; onChange: (v: TestAnswer) => void; disabled: boolean }) {
  const type = q[0];
  if (type === "single" || type === "tf") {
    const opts = q[2] as string[];
    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {opts.map((o, oi) => (
          <button
            key={oi}
            type="button"
            disabled={disabled}
            onClick={() => onChange(oi)}
            aria-pressed={a === oi}
            className={`rounded-xl border-2 p-2.5 text-right transition active:scale-[0.99] ${a === oi ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <Rich text={o} className="text-sm font-bold text-slate-800 md:text-base" />
          </button>
        ))}
      </div>
    );
  }
  if (type === "multi") {
    const opts = q[2] as string[];
    const sel = (Array.isArray(a) ? a : []) as number[];
    return (
      <div className="flex flex-wrap gap-2">
        {opts.map((o, oi) => {
          const on = sel.includes(oi);
          return (
            <button
              key={oi}
              type="button"
              disabled={disabled}
              onClick={() => onChange(on ? sel.filter((x) => x !== oi) : [...sel, oi])}
              aria-pressed={on}
              className={`rounded-xl border-2 px-3.5 py-2 text-sm font-bold transition active:scale-95 ${on ? "border-teal-500 bg-teal-50 text-teal-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
            >
              {on ? "☑" : "☐"} <Rich text={o} />
            </button>
          );
        })}
      </div>
    );
  }
  if (type === "order") {
    const opts = q[2] as string[];
    const seq = (Array.isArray(a) ? a : []) as number[];
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {opts.map((o, oi) => (
            <button
              key={oi}
              type="button"
              disabled={disabled || seq.includes(oi)}
              onClick={() => onChange([...seq, oi])}
              className="rounded-xl border-2 border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-800 transition hover:border-teal-400 active:scale-95 disabled:opacity-25"
            >
              <Rich text={o} />
            </button>
          ))}
        </div>
        <div className="flex min-h-12 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-2">
          {seq.length === 0 && <span className="w-full text-center text-xs text-slate-400">اضغط العناصر بالترتيب من الأقدم إلى الأحدث</span>}
          {seq.map((oi, pos) => (
            <button
              key={pos}
              type="button"
              disabled={disabled}
              onClick={() => onChange(seq.filter((_x, j) => j !== pos))}
              className="rounded-xl border-2 border-teal-300 bg-white px-3 py-1.5 text-sm font-bold text-teal-900 transition active:scale-95"
            >
              {pos + 1}. <Rich text={opts[oi]} />
            </button>
          ))}
          {seq.length > 0 && !disabled && (
            <button type="button" onClick={() => onChange([])} className="mr-auto rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600">
              ↺
            </button>
          )}
        </div>
      </div>
    );
  }
  // match
  const m = q[2] as { l: string[]; r: string[] };
  const map = (a && !Array.isArray(a) && typeof a === "object" ? a : {}) as Record<number, number>;
  return (
    <div className="grid gap-2">
      {m.l.map((left, li) => (
        <div key={li} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-2.5">
          <En className="text-sm font-black text-slate-800">{left}</En>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {m.r.map((right, ri) => (
              <button
                key={ri}
                type="button"
                disabled={disabled}
                onClick={() => onChange({ ...map, [li]: ri })}
                aria-pressed={map[li] === ri}
                className={`rounded-lg border-2 px-2.5 py-1 font-en text-xs font-bold transition active:scale-95 ${map[li] === ri ? "border-teal-500 bg-teal-50 text-teal-900" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
              >
                {right}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// حلول الاختبارات — مقفلة حتى تسليم الاختبار أو فتح منطقة المعلم
// ============================================================

function Solutions({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest: () => void; onGoTeacher: () => void }) {
  if (!unlocked) {
    return (
      <div data-area="lesson29-solutions">
        <Frame mascot="🔒" badge="Test Solutions" title="حلول الاختبارات — مقفلة" lead="تُفتح الحلول بعد تسليم الاختبار، أو عبر منطقة المعلم." accent={ACCENT29}>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={onGoTest} className="rounded-xl bg-teal-600 px-5 py-2.5 font-bold text-white transition hover:bg-teal-700">
              📝 إلى الاختبار
            </button>
            <button type="button" onClick={onGoTeacher} className="rounded-xl bg-slate-900 px-5 py-2.5 font-bold text-white transition hover:bg-slate-700">
              👨‍🏫 منطقة المعلم
            </button>
          </div>
        </Frame>
      </div>
    );
  }
  return (
    <div data-area="lesson29-solutions">
      <Frame mascot="✅" badge="Test Solutions" title="حلول الاختبارات — 20 حلًا مفصلًا" lead="لكل سؤال: الإجابة الصحيحة، الشرح، والفخ الشائع." accent={ACCENT29}>
        <div className="grid gap-3">
          {TEST_29_SOLUTIONS.map((s, i) => (
            <article key={i} className="rounded-3xl border-2 border-slate-100 bg-white p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Nub n={i + 1} className="bg-emerald-600" />
                <Rich text={TEST_29[i][1]} className="min-w-0 flex-1 text-sm font-bold text-slate-500" />
              </div>
              <div className="mt-2 rounded-2xl bg-emerald-50 px-3.5 py-2 text-base font-extrabold text-emerald-900">
                ✓ <Rich text={s.answer} />
              </div>
              <Rich text={s.explanation} className="mt-2 block text-sm leading-relaxed text-slate-700 md:text-base" />
              <div className="mt-2 rounded-2xl bg-rose-50 px-3.5 py-2 text-sm font-bold text-rose-700">⚠️ الفخ الشائع: <Rich text={s.trap} /></div>
            </article>
          ))}
        </div>
      </Frame>
    </div>
  );
}

// ============================================================
// منطقة المعلم — somer173
// ============================================================

function Teacher({ unlocked, onUnlock, onGoSolutions }: { unlocked: boolean; onUnlock: () => void; onGoSolutions: () => void }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  if (!unlocked) {
    return (
      <div data-area="lesson29-teacher">
        <Frame mascot="👨‍🏫" badge="Teacher Area" title="منطقة المعلم — مقفلة 🔒" lead="أدخل كلمة مرور المعلم لعرض الدليل وفتح الحلول." accent={ACCENT29}>
          <div className={`flex flex-wrap items-center gap-2 ${wrong ? "shake" : ""}`}>
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setWrong(false);
              }}
              placeholder="كلمة المرور"
              aria-label="كلمة مرور المعلم"
              className="w-56 rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 font-bold outline-none transition focus:border-teal-400"
            />
            <button
              type="button"
              onClick={() => {
                if (value === TEACHER_PASSWORD_29) onUnlock();
                else setWrong(true);
              }}
              className="rounded-xl bg-slate-900 px-5 py-2.5 font-bold text-white transition hover:bg-slate-700"
            >
              فتح 🔓
            </button>
            {wrong && <span className="text-sm font-bold text-rose-600">كلمة المرور غير صحيحة</span>}
          </div>
        </Frame>
      </div>
    );
  }
  return (
    <div data-area="lesson29-teacher">
      {/* مفتاح الاختبار النهائي — داخل منطقة المعلم المفتوحة بكلمة المرور */}
      <div className="mb-4">
        <FinalTestAnswerKey lesson={29} questions={FINAL_TESTS[29]} accent="bg-teal-600" />
      </div>
      <Frame mascot="👨‍🏫" badge="Teacher Area" title="منطقة المعلم — Past Perfect Continuous" lead="نظرة عامة، أهداف المصدر، وملاحظات تدريس حاسمة." accent={ACCENT29}>
        <div className="grid gap-2">
          {TEACHER_29_OVERVIEW.map((x, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-white p-3.5">
              <Rich text={x} className="text-sm leading-relaxed text-slate-700 md:text-base" />
            </div>
          ))}
        </div>
        <h3 className="font-head pt-2 text-xl font-bold text-slate-900">🎯 أهداف المصدر</h3>
        <div className="grid gap-1.5 sm:grid-cols-2">
          {OBJECTIVES_29.map((g, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2">
              <Rich text={g} className="text-sm font-bold text-slate-700" />
            </div>
          ))}
        </div>
        <h3 className="font-head pt-2 text-xl font-bold text-slate-900">📌 ملاحظات تدريس</h3>
        <div className="grid gap-2">
          {TEACHER_29_NOTES.map((x, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl border-2 border-amber-100 bg-amber-50/60 p-3.5">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-500 text-xs font-bold text-white">{i + 1}</span>
              <Rich text={x} className="text-sm leading-relaxed text-slate-800 md:text-base" />
            </div>
          ))}
        </div>
        <button type="button" onClick={onGoSolutions} className="rounded-xl bg-emerald-600 px-5 py-2.5 font-bold text-white shadow transition hover:bg-emerald-700">
          ✅ فتح حلول الاختبارات
        </button>
      </Frame>
    </div>
  );
}

// ============================================================
// الهيكل: Rail + Header + التنقل + المناطق الأربع
// ============================================================

type Area = "lesson" | "test" | "solutions" | "teacher";

const AREAS: { id: Area; label: string }[] = [
  { id: "lesson", label: "📚 الدرس" },
  { id: "test", label: "📝 الاختبار" },
  { id: "solutions", label: "✅ الحلول" },
  { id: "teacher", label: "👨‍🏫 المعلم" },
];

const SEC_C: Record<string, string> = {
  "البداية": "text-slate-400",
  "الفكرة": "text-teal-600",
  "التكوين": "text-violet-600",
  "النتيجة أم النشاط؟": "text-fuchsia-600",
  "for و since": "text-amber-600",
  "المقارنات": "text-sky-600",
  "قواعد وأشكال": "text-rose-500",
  "النفي والأسئلة": "text-indigo-600",
  "على الخط الزمني": "text-amber-700",
  "الأزمنة الأربعة": "text-orange-600",
  "المحقق": "text-cyan-700",
  "أسئلة IQ200": "text-violet-700",
  "التدريبات": "text-emerald-600",
  "القصة": "text-fuchsia-700",
  "التحديات": "text-orange-700",
  "الخاتمة": "text-slate-600",
};

function Rail({
  index,
  setIndex,
  area,
  setArea,
  onExit,
  onClose,
}: {
  index: number;
  setIndex: (n: number) => void;
  area: Area;
  setArea: (a: Area) => void;
  onExit: () => void;
  onClose?: () => void;
}) {
  const groups = useMemo(() => {
    const g: { sec: string; idxs: number[] }[] = [];
    slides.forEach((s, idx) => {
      const last = g[g.length - 1];
      if (last && last.sec === s.section) last.idxs.push(idx);
      else g.push({ sec: s.section, idxs: [idx] });
    });
    return g;
  }, []);
  return (
    <aside className="flex h-full flex-col">
      <div className="border-b border-slate-100 p-4">
        <button onClick={onExit} className="text-sm font-semibold text-slate-400 transition hover:text-slate-800">
          → جميع الدروس
        </button>
        <div className="font-head mt-2 text-lg font-bold text-slate-900">الدرس 29 · الماضي التام المستمر</div>
        <En className="text-xs font-semibold text-slate-400">Past Perfect Continuous</En>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {AREAS.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setArea(a.id);
                onClose?.();
              }}
              className={`rounded-xl px-2 py-2 text-xs font-bold transition ${area === a.id ? "bg-teal-600 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div className="mt-2 rounded-xl bg-teal-50 px-2 py-1.5 text-center text-[11px] font-bold text-teal-800">48 خطوة · 44 قسمًا مصدريًا · اختبار 20 سؤالًا</div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="خطوات الدرس 29">
        {groups.map((g) => (
          <div key={g.sec} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SEC_C[g.sec] || "text-slate-400"}`}>{g.sec}</div>
            {g.idxs.map((idx) => {
              const on = area === "lesson" && idx === index;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setIndex(idx);
                    setArea("lesson");
                    onClose?.();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${on ? "bg-teal-600 text-white shadow" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${on ? "bg-white/25" : "bg-slate-100"}`}>{idx + 1}</span>
                  <span className="truncate font-semibold">
                    <Rich text={slides[idx].title} />
                  </span>
                  <span className="mr-auto text-base">{slides[idx].mascot}</span>
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

export default function Lesson29({ onExit }: { onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [area, setArea] = useState<Area>("lesson");
  const [menu, setMenu] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const total = slides.length;
  const progress = ((index + 1) / total) * 100;
  const solutionsUnlocked = testDone || teacherOk;

  const go = useMemo(
    () => ({
      next: () => setIndex((v) => Math.min(v + 1, total - 1)),
      prev: () => setIndex((v) => Math.max(v - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menu || area !== "lesson") return;
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(t.tagName)) return;
      if (e.key === "ArrowLeft") go.next();
      if (e.key === "ArrowRight") go.prev();
      if (e.key === " ") {
        e.preventDefault();
        go.next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, menu, area]);

  useEffect(() => {
    document.getElementById("l29-main")?.scrollTo({ top: 0 });
  }, [index, area]);

  const slide = slides[index];

  return (
    <div dir="rtl" className="style-b font-body relative flex h-screen flex-col overflow-hidden bg-[#f1faf7] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-slate-200 bg-white/80 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} area={area} setArea={setArea} onExit={onExit} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border-2 border-slate-200 bg-white text-lg shadow-sm lg:hidden" aria-label="فهرس الدرس">
              ☰
            </button>
            <div className="min-w-0 flex-1">
              {area === "lesson" ? (
                <>
                  <div className="truncate text-sm font-bold text-slate-500">
                    <span dir="ltr" className="ltr-pair"><span dir="ltr" className="font-en">{slide.section}</span> · <span dir="rtl"><Rich text={slide.title} className="text-slate-800" /></span></span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
                    <div className="h-full rounded-full bg-gradient-to-l from-teal-500 via-amber-400 to-orange-400 transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </>
              ) : (
                <div className="truncate text-sm font-bold text-slate-500">
                  الدرس 29 · <span className="text-slate-800">{AREAS.find((a) => a.id === area)?.label}</span>
                </div>
              )}
            </div>
            {area === "lesson" && (
              <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
                {index + 1} / {total}
              </span>
            )}
          </header>
          <main id="l29-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div data-area="student-lesson" className="mx-auto max-w-4xl" hidden={area !== "lesson"}>
              <div key={index} className="pop">
                <SlideView slide={slide} onExit={onExit} onGoTest={() => setArea("test")} />
                {/* 🏁 الاختبار النهائي — طبقة نهاية الدرس (تظهر مع الخطوة الأخيرة فقط) */}
                {index === total - 1 && (
                  <div className="mt-4">
                    <FinalTest
                      lesson={29}
                      questions={FINAL_TESTS[29]}
                      accent="bg-teal-600"
                      onGoTeacher={() => setArea("teacher")}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "test"}>
              <TestArea onSubmitted={() => setTestDone(true)} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "solutions"}>
              <Solutions unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "teacher"}>
              <Teacher unlocked={teacherOk} onUnlock={() => setTeacherOk(true)} onGoSolutions={() => setArea("solutions")} />
            </div>
          </main>
          {area === "lesson" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-slate-900/[0.05] bg-white/95 p-1.5 shadow-xl backdrop-blur">
                <button onClick={go.prev} disabled={index === 0} className="rounded-full px-4 py-2 text-sm font-bold text-slate-700 transition enabled:hover:bg-slate-100 disabled:opacity-30">
                  → السابق
                </button>
                <span className="h-6 w-px bg-slate-200" />
                <button onClick={go.next} disabled={index === total - 1} className="rounded-full bg-teal-600 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-teal-700 disabled:opacity-30">
                  التالي ←
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {menu && (
        <div className="fixed inset-0 z-50 flex lg:hidden" onClick={() => setMenu(false)}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} area={area} setArea={setArea} onExit={onExit} onClose={() => setMenu(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export { TestArea, Solutions, Teacher, slides };
