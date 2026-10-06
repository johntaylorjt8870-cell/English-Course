import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  SOURCE_SECTIONS, SEC, unitsOf,
  SOURCE_NUMBERED_COUNT, SOURCE_LEDGER_COUNT,
  LESSON_TITLE_30, LESSON_SUBTITLE_30, LAB_NAME_30, LAB_MOTTO_30,
  TENSES_30, type Tense30,
  DETECTIVE_RESCUE_30, DETECTIVE_SAM_30, DETECTIVE_LINA_30, DETECTIVE_NORA_30, DETECTIVE_FINAL_30,
  type DetectiveItem30,
  QUIZ1_30, QUIZ2_30, FINAL_EXAM_30, type SourceMcq30,
  ERRORS_30,
  CHALLENGE_WORDS_30, BOSS_STARTER_30,
  TEST_30, type TestQ30,
  TEACHER_PASSWORD_30, TEACHER_30_OVERVIEW, TEACHER_30_NOTES, TEACHER_30_SOLUTIONS,
  TEACHER_30_RUBRICS, TEACHER_30_MISTAKES,
} from "./data";
import { LatinRuns } from "../../shared/bidi";
import { Signature, SignatureGhost } from "../../shared/Signature";

// ============================================================
// أدوات العرض الأساسية — عزل اتجاهي كامل (عربي RTL / إنجليزي LTR)
// ============================================================

const ARABIC_RX = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LATIN_RX = /[A-Za-z]/;

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

function PlatformExplanation({ children }: { children: ReactNode }) {
  return (
    <aside dir="rtl" className="rounded-2xl border-2 border-slate-800 bg-slate-900 p-4 text-sm font-semibold leading-relaxed text-slate-100">
      <div className="mb-1.5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
        <span>🛠️</span>
        <En>Platform Explanation</En>
        <span className="font-body text-[11px] text-slate-400">— شرح من المنصة، ليس من نص المصدر</span>
      </div>
      {children}
    </aside>
  );
}

type LineKind = "en" | "ar" | "good" | "bad" | "num" | "head" | "down";

function kindOf(text: string): LineKind {
  if (text === "↓") return "down";
  if (/^✅/.test(text)) return "good";
  if (/^❌/.test(text)) return "bad";
  if (/^[①②③④⑤⑥⑦⑧⑨⑩]/.test(text) && ARABIC_RX.test(text)) return "num";
  if (/^(السؤال|الخطوة|التركيز:|النتيجة:|الترتيب:|لدينا:|مثال|اقرأ:|حدد|حلل|صحح:|اختر|الإجابة|الإجابات:|لماذا؟|إذن|لكن|وهنا|التحليل:|أكمل)/.test(text)) return "head";
  if (LATIN_RX.test(text) && !ARABIC_RX.test(text)) return "en";
  return "ar";
}

function LineRow({ text }: { text: string }) {
  const kind = kindOf(text);
  if (kind === "down") {
    return <div dir="ltr" className="text-center text-lg font-black text-indigo-400" aria-hidden>↓</div>;
  }
  if (kind === "en") {
    return (
      <div dir="ltr" className="ltr-row">
        <En className="block w-full rounded-2xl border-2 border-slate-100 bg-white px-4 py-2.5 text-left text-lg font-extrabold text-slate-900 shadow-sm md:text-xl">
          {text}
        </En>
      </div>
    );
  }
  if (kind === "good") {
    return (
      <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-3.5 py-2 text-base font-extrabold text-emerald-900">
        <Rich text={text} />
      </div>
    );
  }
  if (kind === "bad") {
    return (
      <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-3.5 py-2 text-base font-extrabold text-rose-900">
        <Rich text={text} />
      </div>
    );
  }
  if (kind === "num") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border-2 border-indigo-100 bg-indigo-50/70 p-3">
        <span className="font-head grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">
          {text.slice(0, 1)}
        </span>
        <Rich text={text.slice(1).trim()} className="pt-1 text-base font-bold text-slate-800 md:text-lg" />
      </div>
    );
  }
  if (kind === "head") {
    return (
      <div className="rounded-2xl bg-indigo-700/95 px-4 py-2 text-base font-black text-white shadow-sm">
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

function Lines({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <LineRow key={`${i}-${line.slice(0, 14)}`} text={line} />
      ))}
    </div>
  );
}

function TenseChip({ tense, small = false }: { tense: Tense30; small?: boolean }) {
  const def = TENSES_30.find((t) => t.tense === tense)!;
  const colors: Record<Tense30, string> = {
    "Past Simple": "border-orange-300 bg-orange-50 text-orange-900",
    "Past Continuous": "border-teal-300 bg-teal-50 text-teal-900",
    "Past Perfect": "border-violet-300 bg-violet-50 text-violet-900",
    "Past Perfect Continuous": "border-sky-300 bg-sky-50 text-sky-900",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 ${small ? "py-0.5 text-xs" : "py-1 text-sm"} font-black ${colors[tense]}`}>
      <span aria-hidden>{def.emoji}</span>
      <En>{tense}</En>
    </span>
  );
}

function Frame({
  children, title, sourceHeading, mascot = "🎛️",
}: {
  children: ReactNode; title: string; sourceHeading?: string; mascot?: string;
}) {
  return (
    <section
      dir="rtl"
      data-source-section={sourceHeading ?? title}
      className="relative overflow-hidden rounded-[1.75rem] border-2 border-indigo-900/[0.07] bg-white p-5 shadow-[0_16px_44px_-24px_rgba(67,56,202,0.45)] md:p-8"
    >
      <div className="absolute -left-1 top-3 text-4xl opacity-15" aria-hidden>{mascot}</div>
      {sourceHeading && (
        <div className="mb-3 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-900">
          <span className="rounded bg-white px-1.5 py-0.5"><En className="text-[10px] font-black tracking-wide">SOURCE SECTION</En></span>{" "}
          <Rich text={sourceHeading} />
        </div>
      )}
      <h2 className="font-head text-2xl font-black leading-snug text-slate-900 md:text-3xl">
        <Rich text={title} />
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

function LabShell({ title, children, intro }: { title: string; children: ReactNode; intro?: string }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-indigo-300 bg-indigo-50/40 p-4 md:p-5">
      <div className="flex items-center gap-2 text-sm font-black text-indigo-800">
        <span aria-hidden>🧪</span>
        <Rich text={title} />
        <span className="mr-auto rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-indigo-500 shadow-sm">
          <En>INTERACTIVE LAB</En>
        </span>
      </div>
      {intro && <p className="mt-1.5 text-sm font-bold text-slate-600"><Rich text={intro} /></p>}
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

// ============================================================
// المختبرات التفاعلية — كلها functional مع تحقق فعلي
// ============================================================

/** تصنيف جمل → أزمنة: الطالب يختار زمن كل جملة ثم يتحقق. */
function ClassifyLab({ title, intro, items }: {
  title: string;
  intro?: string;
  items: { sentence: string; tense: Tense30 }[];
}) {
  const [picks, setPicks] = useState<Record<number, Tense30 | undefined>>({});
  const [checked, setChecked] = useState(false);
  const allPicked = items.every((_, i) => picks[i] !== undefined);
  const correct = items.filter((it, i) => picks[i] === it.tense).length;
  return (
    <LabShell title={title} intro={intro ?? "اختر زمن كل جملة ثم اضغط «تحقق» — لا يظهر التصحيح قبل ذلك."}>
      {items.map((it, i) => {
        const state = !checked ? "idle" : picks[i] === it.tense ? "right" : "wrong";
        return (
          <div key={i} className={`rounded-2xl border-2 bg-white p-3 ${state === "right" ? "border-emerald-300" : state === "wrong" ? "border-rose-300" : "border-slate-200"}`}>
            <div dir="ltr" className="ltr-row">
              <En className="block text-left text-base font-extrabold text-slate-900 md:text-lg">{it.sentence}</En>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TENSES_30.map((t) => {
                const on = picks[i] === t.tense;
                return (
                  <button
                    key={t.tense}
                    type="button"
                    disabled={checked}
                    aria-pressed={on}
                    onClick={() => setPicks((p) => ({ ...p, [i]: t.tense }))}
                    className={`rounded-full border-2 px-2.5 py-1 text-xs font-black transition ${on ? "border-indigo-600 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"} disabled:cursor-default`}
                  >
                    {t.emoji} <En>{t.tense}</En>
                  </button>
                );
              })}
            </div>
            {checked && (
              <div className="mt-2 text-sm font-bold" role="status">
                {picks[i] === it.tense
                  ? <span className="text-emerald-700">✓ صحيح — <TenseChip tense={it.tense} small /></span>
                  : <span className="text-rose-700">✕ الصحيح: <TenseChip tense={it.tense} small /></span>}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        {!checked ? (
          <button
            type="button"
            disabled={!allPicked}
            onClick={() => setChecked(true)}
            className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
          >
            تحقق من الإجابات
          </button>
        ) : (
          <>
            <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm">
              النتيجة: {correct} / {items.length}
            </span>
            <button type="button" onClick={() => { setPicks({}); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">
              ↺ إعادة
            </button>
          </>
        )}
      </div>
    </LabShell>
  );
}

/** آلة اختيار الزمن: يجيب الطالب عن الأسئلة الأربعة فتُحسب النتيجة وتُقارن. */
const MACHINE_SENTENCES: { sentence: string; tense: Tense30 }[] = [
  { sentence: "I opened the door.", tense: "Past Simple" },
  { sentence: "I was opening the door.", tense: "Past Continuous" },
  { sentence: "I had opened the door before the lights went out.", tense: "Past Perfect" },
  { sentence: "I had been opening boxes for an hour before the lights went out.", tense: "Past Perfect Continuous" },
];

function machineVerdict(a: { continuous?: boolean; beforePast?: boolean; duration?: boolean }): Tense30 | undefined {
  if (a.continuous === undefined || a.beforePast === undefined) return undefined;
  if (a.beforePast) {
    if (a.duration === undefined) return undefined;
    return a.duration ? "Past Perfect Continuous" : "Past Perfect";
  }
  return a.continuous ? "Past Continuous" : "Past Simple";
}

function YesNo({ label, value, onChange, disabled }: { label: string; value: boolean | undefined; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-2 border-slate-200 bg-white p-3">
      <span className="text-sm font-bold text-slate-800"><Rich text={label} /></span>
      <span className="flex gap-1.5">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            disabled={disabled}
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={`rounded-full border-2 px-3.5 py-1 text-sm font-black transition ${value === v ? "border-indigo-600 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"} disabled:cursor-default disabled:opacity-60`}
          >
            {v ? "نعم" : "لا"}
          </button>
        ))}
      </span>
    </div>
  );
}

function TenseMachineLab() {
  const [idx, setIdx] = useState(0);
  const [continuous, setContinuous] = useState<boolean | undefined>();
  const [beforePast, setBeforePast] = useState<boolean | undefined>();
  const [duration, setDuration] = useState<boolean | undefined>();
  const [checked, setChecked] = useState(false);
  const target = MACHINE_SENTENCES[idx];
  const verdict = machineVerdict({ continuous, beforePast, duration });
  const needDuration = beforePast === true;
  const ready = verdict !== undefined;
  const resetAnswers = () => { setContinuous(undefined); setBeforePast(undefined); setDuration(undefined); setChecked(false); };
  return (
    <LabShell
      title="آلة اختيار الزمن — شغّلها بنفسك"
      intro="اختر جملة، ثم أجب عن أسئلة الآلة — الآلة تحسب الزمن من إجاباتك وتقارنه بالزمن الحقيقي."
    >
      <div className="flex flex-wrap gap-1.5">
        {MACHINE_SENTENCES.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={idx === i}
            onClick={() => { setIdx(i); resetAnswers(); }}
            className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${idx === i ? "border-indigo-600 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}
          >
            جملة {i + 1}
          </button>
        ))}
      </div>
      <div dir="ltr" className="ltr-row rounded-2xl bg-slate-900 p-3.5">
        <En className="block text-left text-lg font-extrabold text-white">{target.sentence}</En>
      </div>
      <YesNo label="هل حدث الفعل قبل حدث ماضٍ آخر؟ (السؤال 3)" value={beforePast} onChange={(v) => { setBeforePast(v); setChecked(false); if (!v) setDuration(undefined); }} disabled={checked} />
      {needDuration ? (
        <YesNo label="هل كان الفعل مستمرًا لفترة قبل ذلك الحدث؟ (السؤال 4)" value={duration} onChange={(v) => { setDuration(v); setChecked(false); }} disabled={checked} />
      ) : (
        <YesNo label="هل كان الفعل مستمرًا في لحظة ماضية؟ (السؤال 2)" value={continuous} onChange={(v) => { setContinuous(v); setChecked(false); }} disabled={checked} />
      )}
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        <button
          type="button"
          disabled={!ready || checked}
          onClick={() => setChecked(true)}
          className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
        >
          احسب الزمن
        </button>
        {checked && verdict && (
          <span className={`rounded-xl px-3 py-2 text-sm font-black shadow-sm ${verdict === target.tense ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
            {verdict === target.tense
              ? <>✓ الآلة أنتجت: <TenseChip tense={verdict} small /> — مطابق للجملة!</>
              : <>✕ إجاباتك أنتجت <TenseChip tense={verdict} small /> لكن الجملة فعليًا <TenseChip tense={target.tense} small /> — أعد قراءة المعنى.</>}
          </span>
        )}
        <button type="button" onClick={resetAnswers} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ إعادة</button>
      </div>
      <PlatformExplanation>
        لاحظ أن الآلة تبدأ من السؤال الحاسم: هل الفعل وقع قبل حدث ماضٍ آخر؟ إذا كان الجواب «نعم» فنحن في منطقة{" "}
        <En>had</En> — ويبقى سؤال المدة ليفصل بين <En>Past Perfect</En> و<En>Past Perfect Continuous</En>.
      </PlatformExplanation>
    </LabShell>
  );
}

/** ترتيب أحداث: اضغط العناصر بالترتيب الصحيح. */
function OrderLab({ title, intro, sentence, items, answer }: {
  title: string; intro: string; sentence?: string; items: string[]; answer: string[];
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const done = picked.length === items.length;
  const isRight = done && picked.every((p, i) => p === answer[i]);
  return (
    <LabShell title={title} intro={intro}>
      {sentence && (
        <div dir="ltr" className="ltr-row rounded-2xl bg-slate-900 p-3.5">
          <En className="block text-left text-base font-extrabold text-white md:text-lg">{sentence}</En>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const pos = picked.indexOf(it);
          const used = pos !== -1;
          return (
            <button
              key={it}
              type="button"
              disabled={checked || used}
              onClick={() => { setPicked((p) => [...p, it]); }}
              className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition ${used ? "border-indigo-200 bg-indigo-50 text-indigo-400" : "border-slate-200 bg-white text-slate-700 hover:border-indigo-400"} disabled:cursor-default`}
            >
              {used && <span className="ml-1 rounded-full bg-indigo-700 px-1.5 text-[10px] font-black text-white">{pos + 1}</span>}
              <Rich text={it} />
            </button>
          );
        })}
      </div>
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-sm font-bold text-slate-700">
        <span className="text-slate-400">ترتيبك: </span>
        {picked.length === 0 ? <span className="text-slate-400">اضغط الأحداث بالترتيب من الأقدم إلى الأحدث</span> : (
          picked.map((p, i) => (
            <span key={p} className="ml-1 inline-block rounded-lg bg-indigo-50 px-2 py-0.5">
              {i + 1}. <Rich text={p} />
            </span>
          ))
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        {!checked ? (
          <button type="button" disabled={!done} onClick={() => setChecked(true)} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30">
            تحقق من الترتيب
          </button>
        ) : (
          <span className={`rounded-xl px-3 py-2 text-sm font-black ${isRight ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`} role="status">
            {isRight ? "✓ ترتيب صحيح — استخرجت التسلسل من الصيغ لا من ترتيب الكلمات." : <>✕ غير صحيح — الترتيب الصحيح: {answer.map((a, i) => <span key={a} className="ml-1 inline-block rounded bg-white/70 px-1.5"> {i + 1}. <Rich text={a} /></span>)}</>}
          </span>
        )}
        <button type="button" onClick={() => { setPicked([]); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ إعادة</button>
      </div>
    </LabShell>
  );
}

/** مفتاح had: بدّل الجملة وأجب «من حدث أولًا؟». */
function HadFlipLab() {
  const [withHad, setWithHad] = useState(false);
  const [pick, setPick] = useState<string | undefined>();
  const sentence = withHad ? "When I arrived, Sara had left." : "When I arrived, Sara left.";
  const correct = withHad ? "Sara left → I arrived." : "I arrived → Sara left.";
  const options = ["I arrived → Sara left.", "Sara left → I arrived."];
  return (
    <LabShell title="مفتاح had — كلمة واحدة تقلب الترتيب" intro="بدّل بين الجملتين ثم حدد ترتيب الأحداث الحقيقي — ولاحظ كيف تقلبه had.">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => { setWithHad((v) => !v); setPick(undefined); }}
          aria-pressed={withHad}
          className="rounded-xl border-2 border-indigo-300 bg-white px-4 py-2 text-sm font-black text-indigo-800 shadow-sm transition hover:border-indigo-500"
        >
          {withHad ? "⏪ أزل had" : "⏪ أضف had"}
        </button>
        <span className="text-xs font-bold text-slate-500">الوضع الحالي: {withHad ? "مع had (Past Perfect)" : "بدون had (Past Simple)"}</span>
      </div>
      <div dir="ltr" className="ltr-row rounded-2xl bg-slate-900 p-3.5">
        <En className="block text-left text-lg font-extrabold text-white">{sentence}</En>
      </div>
      <div className="text-sm font-black text-slate-700">ما ترتيب الأحداث الحقيقي؟</div>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const picked = pick === o;
          const state = pick === undefined ? "idle" : o === correct ? (picked ? "right" : "idle") : picked ? "wrong" : "idle";
          return (
            <button
              key={o}
              type="button"
              onClick={() => setPick(o)}
              aria-pressed={picked}
              className={`rounded-xl border-2 p-3 text-sm font-bold transition ${state === "right" ? "border-emerald-400 bg-emerald-50" : state === "wrong" ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white hover:border-indigo-300"}`}
            >
              <En>{o}</En>
            </button>
          );
        })}
      </div>
      {pick !== undefined && (
        <div role="status" aria-live="polite" className={`rounded-xl px-3 py-2 text-sm font-black ${pick === correct ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {pick === correct
            ? <>✓ صحيح — {withHad ? <>مع <En>had</En>: سارة غادرت أولًا ثم وصلتُ.</> : <>بدون <En>had</En>: وصلتُ أولًا ثم غادرت سارة.</>}</>
            : <>✕ أعد النظر — السطر الحاسم: <En>{correct}</En></>}
        </div>
      )}
    </LabShell>
  );
}

/** النتيجة أم النشاط؟ اختر الجملة المطابقة للتركيز المطلوب. */
function FocusPickLab({ title, rounds }: {
  title: string;
  rounds: { focus: string; options: string[]; answer: number }[];
}) {
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<number | undefined>();
  const r = rounds[round];
  return (
    <LabShell title={title} intro="اقرأ «التركيز» المطلوب ثم اختر الجملة التي تعبّر عنه بدقة.">
      <div className="flex flex-wrap gap-1.5">
        {rounds.map((_, i) => (
          <button key={i} type="button" aria-pressed={round === i} onClick={() => { setRound(i); setPick(undefined); }} className={`rounded-xl border-2 px-3 py-1.5 text-xs font-black transition ${round === i ? "border-indigo-600 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}>
            جولة {i + 1}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm font-black text-amber-900">
        <Rich text={`التركيز: ${r.focus}`} />
      </div>
      <div className="grid gap-2">
        {r.options.map((o, i) => {
          const picked = pick === i;
          const state = pick === undefined ? "idle" : i === r.answer ? (picked ? "right" : "reveal") : picked ? "wrong" : "idle";
          return (
            <button
              key={o}
              type="button"
              onClick={() => setPick(i)}
              aria-pressed={picked}
              className={`rounded-xl border-2 p-3 text-left transition ${state === "right" ? "border-emerald-400 bg-emerald-50" : state === "wrong" ? "border-rose-400 bg-rose-50" : state === "reveal" ? "border-emerald-300 bg-white" : "border-slate-200 bg-white hover:border-indigo-300"}`}
            >
              <En className="text-base font-extrabold text-slate-900">{o}</En>
            </button>
          );
        })}
      </div>
      {pick !== undefined && (
        <div role="status" aria-live="polite" className={`rounded-xl px-3 py-2 text-sm font-black ${pick === r.answer ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {pick === r.answer ? "✓ مطابق للتركيز المطلوب." : "✕ هذه الجملة تحمل زاوية نظر مختلفة — قارن بين النتيجة والنشاط/المدة."}
        </div>
      )}
    </LabShell>
  );
}

/** المحقق النحوي: حدد زمن كل فعل من القصة. */
function DetectiveLab({ title, passage, items, showRoles = true }: {
  title: string; passage: string; items: DetectiveItem30[]; showRoles?: boolean;
}) {
  const [picks, setPicks] = useState<Record<number, Tense30 | undefined>>({});
  const [checked, setChecked] = useState(false);
  const allPicked = items.every((_, i) => picks[i] !== undefined);
  const correct = items.filter((it, i) => picks[i] === it.tense).length;
  return (
    <LabShell title={title} intro="اقرأ القصة ثم حدد زمن كل فعل — التصحيح يظهر بعد «تحقق» فقط.">
      <div dir="ltr" className="ltr-row rounded-2xl bg-slate-900 p-4">
        <En className="block text-left text-base font-bold leading-relaxed text-white md:text-lg">{passage}</En>
      </div>
      <div className="grid gap-2">
        {items.map((it, i) => {
          const state = !checked ? "idle" : picks[i] === it.tense ? "right" : "wrong";
          return (
            <div key={`${it.verb}-${i}`} className={`rounded-2xl border-2 bg-white p-3 ${state === "right" ? "border-emerald-300" : state === "wrong" ? "border-rose-300" : "border-slate-200"}`}>
              <div className="flex flex-wrap items-center gap-2">
                <En className="rounded-lg bg-indigo-50 px-2.5 py-1 text-base font-extrabold text-indigo-900">{it.verb}</En>
                <label className="sr-only" htmlFor={`det-${title}-${i}`}>زمن الفعل {it.verb}</label>
                <select
                  id={`det-${title}-${i}`}
                  dir="ltr"
                  disabled={checked}
                  value={picks[i] ?? ""}
                  onChange={(e) => setPicks((p) => ({ ...p, [i]: (e.target.value || undefined) as Tense30 | undefined }))}
                  className="font-en rounded-xl border-2 border-slate-200 bg-white px-2 py-1.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400"
                >
                  <option value="">Choose the tense…</option>
                  {TENSES_30.map((t) => (
                    <option key={t.tense} value={t.tense}>{t.tense}</option>
                  ))}
                </select>
                {checked && (
                  <span role="status" className={`text-sm font-black ${state === "right" ? "text-emerald-700" : "text-rose-700"}`}>
                    {state === "right" ? "✓" : <>✕ <TenseChip tense={it.tense} small /></>}
                  </span>
                )}
              </div>
              {checked && showRoles && it.role && (
                <div className="mt-1.5 text-sm font-bold text-slate-600"><Rich text={`→ ${it.role}`} /></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        {!checked ? (
          <button type="button" disabled={!allPicked} onClick={() => setChecked(true)} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30">
            تحقق ({Object.values(picks).filter(Boolean).length}/{items.length})
          </button>
        ) : (
          <>
            <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm">النتيجة: {correct} / {items.length}</span>
            <button type="button" onClick={() => { setPicks({}); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ إعادة</button>
          </>
        )}
      </div>
    </LabShell>
  );
}

/** تمرين المصدر متعدد الخيارات: أجب عن الكل ثم تحقق. */
function SourceQuizLab({ title, items, intro }: { title: string; items: SourceMcq30[]; intro?: string }) {
  const [picks, setPicks] = useState<Record<number, number | undefined>>({});
  const [checked, setChecked] = useState(false);
  const allPicked = items.every((_, i) => picks[i] !== undefined);
  const correct = items.filter((q, i) => picks[i] === q.answer).length;
  return (
    <LabShell title={title} intro={intro ?? "أجب عن كل الأسئلة ثم اضغط «تحقق» — إجابات المصدر تُكشف بعدها."}>
      {items.map((q, i) => {
        const qKind = kindOf(q.q);
        return (
          <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
            {qKind === "en"
              ? <div dir="ltr" className="ltr-row"><En className="block text-left text-base font-extrabold text-slate-900 md:text-lg">{q.q}</En></div>
              : <div className="text-base font-extrabold text-slate-900"><Rich text={q.q} /></div>}
            <div className="mt-2 grid gap-1.5">
              {q.opts.map((o, oi) => {
                const picked = picks[i] === oi;
                const state = !checked ? (picked ? "picked" : "idle") : oi === q.answer ? "right" : picked ? "wrong" : "idle";
                return (
                  <button
                    key={o}
                    type="button"
                    disabled={checked}
                    aria-pressed={picked}
                    onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                    className={`rounded-xl border-2 p-2.5 text-left transition disabled:cursor-default ${
                      state === "right" ? "border-emerald-400 bg-emerald-50" :
                      state === "wrong" ? "border-rose-400 bg-rose-50" :
                      state === "picked" ? "border-indigo-500 bg-indigo-50" :
                      "border-slate-200 bg-white hover:border-indigo-300"
                    }`}
                  >
                    <En className="text-sm font-extrabold text-slate-900 md:text-base">{o}</En>
                  </button>
                );
              })}
            </div>
            {checked && q.note && (
              <div className="mt-2 rounded-xl bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-900"><Rich text={q.note} /></div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        {!checked ? (
          <button type="button" disabled={!allPicked} onClick={() => setChecked(true)} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30">
            تحقق من الإجابات ({Object.values(picks).filter((v) => v !== undefined).length}/{items.length})
          </button>
        ) : (
          <>
            <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm">النتيجة: {correct} / {items.length}</span>
            <button type="button" onClick={() => { setPicks({}); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ إعادة</button>
          </>
        )}
      </div>
    </LabShell>
  );
}

/** اختبار 3 — تصحيح الأخطاء: اختر التصحيح الصحيح لكل جملة خاطئة. */
function ErrorFixLab() {
  const [picks, setPicks] = useState<Record<number, number | undefined>>({});
  const [checked, setChecked] = useState(false);
  const allPicked = ERRORS_30.every((_, i) => picks[i] !== undefined);
  const correct = ERRORS_30.filter((e, i) => picks[i] === e.answer).length;
  return (
    <LabShell title="مختبر تصحيح الأخطاء" intro="كل جملة فيها خطأ — اختر التصحيح الصحيح ثم تحقق. (المشتتات من المنصة؛ التصحيح المعتمد من المصدر.)">
      {ERRORS_30.map((e, i) => (
        <div key={i} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
          <div className="rounded-xl border-2 border-rose-200 bg-rose-50 px-3 py-2">
            <En className="block text-left text-base font-extrabold text-rose-900">{e.wrong}</En>
          </div>
          <div className="mt-2 grid gap-1.5">
            {e.opts.map((o, oi) => {
              const picked = picks[i] === oi;
              const state = !checked ? (picked ? "picked" : "idle") : oi === e.answer ? "right" : picked ? "wrong" : "idle";
              return (
                <button
                  key={o}
                  type="button"
                  disabled={checked}
                  aria-pressed={picked}
                  onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                  className={`rounded-xl border-2 p-2.5 text-left transition disabled:cursor-default ${
                    state === "right" ? "border-emerald-400 bg-emerald-50" :
                    state === "wrong" ? "border-rose-400 bg-rose-50" :
                    state === "picked" ? "border-indigo-500 bg-indigo-50" :
                    "border-slate-200 bg-white hover:border-indigo-300"
                  }`}
                >
                  <En className="text-sm font-extrabold text-slate-900 md:text-base">{o}</En>
                </button>
              );
            })}
          </div>
          {checked && e.sourceNote && (
            <div className="mt-2 space-y-1 rounded-xl bg-amber-50 p-3">
              {e.sourceNote.map((n, ni) => (
                kindOf(n) === "en"
                  ? <div key={ni} dir="ltr" className="ltr-row"><En className="block text-left text-sm font-extrabold text-amber-900">{n}</En></div>
                  : <div key={ni} className="text-sm font-bold text-amber-900"><Rich text={n} /></div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        {!checked ? (
          <button type="button" disabled={!allPicked} onClick={() => setChecked(true)} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30">
            تحقق من التصحيحات ({Object.values(picks).filter((v) => v !== undefined).length}/{ERRORS_30.length})
          </button>
        ) : (
          <>
            <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm">النتيجة: {correct} / {ERRORS_30.length}</span>
            <button type="button" onClick={() => { setPicks({}); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ إعادة</button>
          </>
        )}
      </div>
      {checked && (
        <PlatformExplanation>
          لاحظ في الجملة ② أن تصحيح المصدر ينتقل من <En>She</En> إلى <En>I</En> — حافظنا عليه حرفيًا كما ورد.
          الفكرة التعليمية: الجملة الأصلية صحيحة نحويًا بمعنى «كانت تنتظر»، لكن إذا أردنا إبراز مدة الساعتين فالصيغة
          الدقيقة هي <En>had been waiting for two hours</En>.
        </PlatformExplanation>
      )}
    </LabShell>
  );
}

/** ㉞ سؤال أصعب — طابق كل معنى مقصود مع الخيار الصحيح. */
function MeaningMatchLab() {
  const meanings: { ar: string; answer: string }[] = [
    { ar: "\"كانت قد أنهت التقرير قبل وصولي.\"", answer: "C) had finished" },
    { ar: "\"كانت في عملية إنهاء التقرير عندما وصلت.\"", answer: "B) was finishing" },
    { ar: "\"كانت تعمل على إنهاء التقرير لفترة قبل وصولي.\"", answer: "D) had been finishing" },
  ];
  const options = ["A) finished", "B) was finishing", "C) had finished", "D) had been finishing"];
  const [picks, setPicks] = useState<Record<number, string | undefined>>({});
  const [checked, setChecked] = useState(false);
  const allPicked = meanings.every((_, i) => picks[i] !== undefined);
  const correct = meanings.filter((m, i) => picks[i] === m.answer).length;
  return (
    <LabShell title="مختبر زاوية النظر — معنى واحد لكل صيغة" intro="الجملة واحدة والمعاني ثلاثة — طابق كل معنى مقصود مع الصيغة الصحيحة.">
      <div dir="ltr" className="ltr-row rounded-2xl bg-slate-900 p-3.5">
        <En className="block text-left text-lg font-extrabold text-white">When I arrived, Sarah ______ the report.</En>
      </div>
      {meanings.map((m, i) => {
        const state = !checked ? "idle" : picks[i] === m.answer ? "right" : "wrong";
        return (
          <div key={i} className={`rounded-2xl border-2 bg-white p-3 ${state === "right" ? "border-emerald-300" : state === "wrong" ? "border-rose-300" : "border-slate-200"}`}>
            <div className="text-sm font-extrabold text-slate-900"><Rich text={m.ar} /></div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {options.map((o) => {
                const on = picks[i] === o;
                return (
                  <button key={o} type="button" disabled={checked} aria-pressed={on} onClick={() => setPicks((p) => ({ ...p, [i]: o }))} className={`rounded-full border-2 px-2.5 py-1 text-xs font-black transition disabled:cursor-default ${on ? "border-indigo-600 bg-indigo-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}>
                    <En>{o}</En>
                  </button>
                );
              })}
            </div>
            {checked && state === "wrong" && (
              <div className="mt-1.5 text-sm font-black text-rose-700" role="status">✕ الصحيح: <En>{m.answer}</En></div>
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-2" aria-live="polite">
        {!checked ? (
          <button type="button" disabled={!allPicked} onClick={() => setChecked(true)} className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30">تحقق</button>
        ) : (
          <>
            <span className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm">النتيجة: {correct} / {meanings.length}</span>
            <button type="button" onClick={() => { setPicks({}); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ إعادة</button>
          </>
        )}
      </div>
    </LabShell>
  );
}

// ---------- محلّل الكتابة (㊳ FINAL BOSS و ㊵ التحدي الأكبر) ----------

const V2_WORDS_30 = [
  "went", "saw", "heard", "came", "rang", "woke", "got", "ate", "left", "ran", "felt", "said", "told",
  "found", "took", "made", "gave", "stood", "sat", "began", "broke", "drove", "wrote", "read", "knew",
  "thought", "caught", "bought", "brought", "put", "lost", "met", "spoke", "fell", "held", "kept", "slept",
];

type StoryStats = { ps: number; pc: number; pp: number; ppc: number; sentences: number; words: Record<string, boolean> };

function analyzeStory(text: string): StoryStats {
  const t = ` ${text.toLowerCase().replace(/\s+/g, " ")} `;
  const ppc = (t.match(/\bhad (?:already |just |still )?been [a-z]+ing\b/g) || []).length;
  // had + V3 (وليس had been …)
  const pp = (t.match(/\bhad (?:already |just |never )?(?!been\b)[a-z]+\b/g) || []).length;
  const pc = (t.match(/\b(?:was|were) (?:still |already |just )?[a-z]+ing\b/g) || []).length;
  let ps = 0;
  // أفعال منتظمة بصيغة -ed غير مسبوقة بـ had/been ومشتقاتها
  const edMatches = t.match(/\b(?<!had )(?<!been )(?<!had already )(?<!had just )(?<!had never )[a-z]{3,}ed\b/g) || [];
  ps += edMatches.length;
  for (const v2 of V2_WORDS_30) {
    const re = new RegExp(`\\b(?<!had )(?<!been )(?<!had already )(?<!had just )(?<!had never )${v2}\\b`, "g");
    ps += (t.match(re) || []).length;
  }
  // was/were كحالة (غير متبوعة بـ V-ing) تُحسب Past Simple من verb to be
  ps += (t.match(/\b(?:was|were)\b(?! (?:still |already |just )?[a-z]+ing)/g) || []).length;
  const sentences = text.split(/[.!?؟]+/).map((s) => s.trim()).filter((s) => s.length > 1).length;
  const words: Record<string, boolean> = {};
  for (const w of CHALLENGE_WORDS_30) words[w] = t.includes(` ${w} `) || t.includes(`${w} `) || t.includes(` ${w},`);
  return { ps, pc, pp, ppc, sentences, words };
}

function Req({ label, met }: { label: ReactNode; met: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl border-2 px-3 py-1.5 text-sm font-bold ${met ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-500"}`}>
      <span aria-hidden>{met ? "✓" : "○"}</span>
      <span className="min-w-0">{label}</span>
    </div>
  );
}

function StoryWriterLab({ mode }: { mode: "boss" | "challenge" }) {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const stats = useMemo(() => analyzeStory(text), [text]);
  const isBoss = mode === "boss";
  const reqs: { label: ReactNode; met: boolean }[] = isBoss
    ? [
        { label: <>تبدأ بـ <En>When the firefighters arrived</En></>, met: text.trim().toLowerCase().startsWith("when the firefighters arrived") },
        { label: <>① <En>Past Simple</En> — فعل ماضٍ واحد على الأقل</>, met: stats.ps >= 1 },
        { label: <>② <En>Past Continuous</En> — <En>was/were + verb-ing</En></>, met: stats.pc >= 1 },
        { label: <>③ <En>Past Perfect</En> — <En>had + V3</En></>, met: stats.pp >= 1 },
        { label: <>④ <En>Past Perfect Continuous</En> — <En>had been + verb-ing</En></>, met: stats.ppc >= 1 },
      ]
    : [
        { label: <>12 جملة على الأقل (الآن: {stats.sentences})</>, met: stats.sentences >= 12 },
        { label: <>4 × <En>Past Simple</En> (الآن: {stats.ps})</>, met: stats.ps >= 4 },
        { label: <>3 × <En>Past Continuous</En> (الآن: {stats.pc})</>, met: stats.pc >= 3 },
        { label: <>3 × <En>Past Perfect</En> (الآن: {stats.pp})</>, met: stats.pp >= 3 },
        { label: <>2 × <En>Past Perfect Continuous</En> (الآن: {stats.ppc})</>, met: stats.ppc >= 2 },
        ...CHALLENGE_WORDS_30.map((w) => ({ label: <>تتضمن <En>{w}</En></>, met: stats.words[w] })),
      ];
  const metCount = reqs.filter((r) => r.met).length;
  const allMet = metCount === reqs.length;
  return (
    <LabShell
      title={isBoss ? "ساحة FINAL BOSS — أكمل القصة بنفسك" : "ساحة التحدي الأكبر — اكتب قصة اليوم الغامض"}
      intro={isBoss
        ? "اكتب إكمال القصة بالإنجليزية — المحلّل يفحص وجود الأزمنة الأربعة فعليًا في نصك."
        : "اكتب 12 جملة بالإنجليزية — المحلّل يعدّ الأزمنة والكلمات المطلوبة فعليًا في نصك."}
    >
      <label className="sr-only" htmlFor={`story-${mode}`}>{isBoss ? "إكمال قصة الإطفائيين" : "قصة اليوم الغامض"}</label>
      <textarea
        id={`story-${mode}`}
        dir="ltr"
        value={text}
        onChange={(e) => { setText(e.target.value); setChecked(false); }}
        placeholder={isBoss ? BOSS_STARTER_30 : "One strange morning, I woke up and..."}
        rows={isBoss ? 5 : 8}
        className="font-en w-full rounded-2xl border-2 border-slate-200 bg-white p-3 text-left text-base font-semibold leading-relaxed text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400"
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={text.trim().length < 10}
          onClick={() => setChecked(true)}
          className="rounded-xl bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
        >
          حلّل كتابتي
        </button>
        <button type="button" onClick={() => { setText(""); setChecked(false); }} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200">↺ مسح</button>
      </div>
      {checked && (
        <div aria-live="polite" className="space-y-2">
          <div className={`rounded-xl px-3 py-2 text-sm font-black ${allMet ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`} role="status">
            {allMet ? "🏆 كل المتطلبات محققة — أحسنت!" : `تحقق ${metCount} من ${reqs.length} متطلبات — أكمل الباقي.`}
          </div>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {reqs.map((r, i) => <Req key={i} label={r.label} met={r.met} />)}
          </div>
          <PlatformExplanation>
            المحلّل يفحص الأنماط آليًا (<En>had been + verb-ing</En> · <En>had + V3</En> · <En>was/were + verb-ing</En> ·
            أفعال الماضي البسيط الشائعة)، وهو مساعد تقريبي — المراجعة النهائية للمعنى مع معلمك.
          </PlatformExplanation>
        </div>
      )}
    </LabShell>
  );
}

// ============================================================
// الشرائح — 46 خطوة أصلية، خطوة لكل قسم مصدر
// ============================================================

type Slide = { id: string; section: string; mascot: string };

const slides: Slide[] = [
  { id: "cover", section: "الافتتاح", mascot: "🎛️" },
  { id: "opening", section: "الافتتاح", mascot: "🚀" },
  { id: "objectives", section: "الافتتاح", mascot: "🎯" },
  { id: "s1", section: "النظام الكامل", mascot: "🧠" },
  { id: "s2", section: "النظام الكامل", mascot: "⚙️" },
  { id: "s3", section: "الأزمنة الأربعة", mascot: "📸" },
  { id: "s4", section: "الأزمنة الأربعة", mascot: "🎥" },
  { id: "s5", section: "الأزمنة الأربعة", mascot: "⏪" },
  { id: "s6", section: "الأزمنة الأربعة", mascot: "⏳" },
  { id: "s7", section: "الخط الزمني وبناء القصة", mascot: "🕰️" },
  { id: "s8", section: "الخط الزمني وبناء القصة", mascot: "🦴" },
  { id: "s9", section: "الخط الزمني وبناء القصة", mascot: "🎥" },
  { id: "s10", section: "الخط الزمني وبناء القصة", mascot: "⏪" },
  { id: "s11", section: "الخط الزمني وبناء القصة", mascot: "🧩" },
  { id: "s12", section: "الخط الزمني وبناء القصة", mascot: "🔥" },
  { id: "s13", section: "المقارنات الحاسمة", mascot: "⚖️" },
  { id: "s14", section: "المقارنات الحاسمة", mascot: "🚌" },
  { id: "s15", section: "المقارنات الحاسمة", mascot: "🧽" },
  { id: "s16", section: "المقارنات الحاسمة", mascot: "⭐" },
  { id: "s17", section: "كلمات لا تحسم الزمن", mascot: "🚨" },
  { id: "s18", section: "كلمات لا تحسم الزمن", mascot: "🧠" },
  { id: "s19", section: "كلمات لا تحسم الزمن", mascot: "🔗" },
  { id: "s20", section: "كلمات لا تحسم الزمن", mascot: "↔️" },
  { id: "s21", section: "كلمات لا تحسم الزمن", mascot: "⏳" },
  { id: "s22", section: "كلمات لا تحسم الزمن", mascot: "✅" },
  { id: "s23", section: "كلمات لا تحسم الزمن", mascot: "🔁" },
  { id: "s24", section: "المحقق والتدريبات", mascot: "🕵️" },
  { id: "s25", section: "المحقق والتدريبات", mascot: "🧪" },
  { id: "s26", section: "المحقق والتدريبات", mascot: "🧪" },
  { id: "s27", section: "IQ200 المتقدم", mascot: "🧠" },
  { id: "s28", section: "IQ200 المتقدم", mascot: "🔥" },
  { id: "s29", section: "IQ200 المتقدم", mascot: "⚙️" },
  { id: "s30", section: "IQ200 المتقدم", mascot: "⚔️" },
  { id: "s31", section: "IQ200 المتقدم", mascot: "🕰️" },
  { id: "s32", section: "تصحيح الأخطاء والخداع", mascot: "🧪" },
  { id: "s33", section: "تصحيح الأخطاء والخداع", mascot: "🚀" },
  { id: "s34", section: "تصحيح الأخطاء والخداع", mascot: "🧠" },
  { id: "s35", section: "تصحيح الأخطاء والخداع", mascot: "🔍" },
  { id: "s36", section: "القصة السينمائية", mascot: "🎬" },
  { id: "s37", section: "القصة السينمائية", mascot: "💡" },
  { id: "s38", section: "التحديات النهائية", mascot: "🏆" },
  { id: "s39", section: "التحديات النهائية", mascot: "🏆" },
  { id: "s40", section: "التحديات النهائية", mascot: "🧠" },
  { id: "summary", section: "الخاتمة", mascot: "📘" },
  { id: "golden", section: "الخاتمة", mascot: "🏆" },
  { id: "final", section: "الخاتمة", mascot: "🚀" },
];

export const TOTAL_STEPS_30 = slides.length; // 46 خطوة

// ---------- مختبرات مرتبطة بأقسام محددة ----------

function LabFor({ id }: { id: string }) {
  switch (id) {
    case "s1":
      return (
        <ClassifyLab
          title="مختبر النظام الكامل — صنّف الجمل الأربع"
          items={[
            { sentence: "I opened the door.", tense: "Past Simple" },
            { sentence: "I was opening the door.", tense: "Past Continuous" },
            { sentence: "I had opened the door before the lights went out.", tense: "Past Perfect" },
            { sentence: "I had been opening boxes for an hour before the lights went out.", tense: "Past Perfect Continuous" },
          ]}
        />
      );
    case "s2":
      return <TenseMachineLab />;
    case "s7":
      return (
        <OrderLab
          title="مختبر خط الزمن — قصة Maya"
          intro="اضغط الأحداث بترتيبها الزمني الحقيقي (من الأقدم) كما يحدده المصدر."
          sentence="When Maya arrived at the station, the train had already left. People were waiting for another train, and one man had been standing there for more than an hour."
          items={["Maya وصلت.", "القطار غادر.", "الرجل بدأ الانتظار واستمر لأكثر من ساعة.", "الناس كانوا ينتظرون."]}
          answer={["القطار غادر.", "الرجل بدأ الانتظار واستمر لأكثر من ساعة.", "Maya وصلت.", "الناس كانوا ينتظرون."]}
        />
      );
    case "s11":
      return (
        <DetectiveLab
          title="مختبر القصة الكاملة — حدد زمن كل فعل"
          passage="I was walking to school when I heard a strange sound. I realized that I had left my phone at home. I was tired because I had been walking for forty minutes."
          items={[
            { verb: "was walking", tense: "Past Continuous", role: "Past Continuous" },
            { verb: "heard", tense: "Past Simple", role: "Past Simple" },
            { verb: "realized", tense: "Past Simple", role: "Past Simple" },
            { verb: "had left", tense: "Past Perfect", role: "Past Perfect" },
            { verb: "had been walking", tense: "Past Perfect Continuous", role: "Past Perfect Continuous" },
          ]}
          showRoles={false}
        />
      );
    case "s12":
      return (
        <ClassifyLab
          title="مختبر العدسات الأربع — أي كاميرا صوّرت الجملة؟"
          intro="طبّق العدسات: 📸 صورة · 🎥 فيديو · ⏪ فلاش باك · ⏪🎥 فلاش باك مستمر."
          items={[
            { sentence: "Leo smiled.", tense: "Past Simple" },
            { sentence: "Birds were singing.", tense: "Past Continuous" },
            { sentence: "Someone had broken the glass.", tense: "Past Perfect" },
            { sentence: "He had been working all night.", tense: "Past Perfect Continuous" },
          ]}
        />
      );
    case "s13":
      return <HadFlipLab />;
    case "s14":
      return (
        <FocusPickLab
          title="مختبر التركيز — ماذا كنت أفعل أم منذ متى؟"
          rounds={[
            { focus: "ماذا كنت أفعل عند وصول الحافلة؟", options: ["I was waiting when the bus arrived.", "I had been waiting for forty minutes when the bus arrived."], answer: 0 },
            { focus: "منذ متى كنت أنتظر؟", options: ["I was waiting when the bus arrived.", "I had been waiting for forty minutes when the bus arrived."], answer: 1 },
          ]}
        />
      );
    case "s15":
      return (
        <FocusPickLab
          title="مختبر التركيز — المطبخ النظيف"
          rounds={[
            { focus: "المطبخ أصبح نظيفًا.", options: ["She had cleaned the kitchen before the guests arrived.", "She had been cleaning the kitchen for two hours before the guests arrived."], answer: 0 },
            { focus: "كانت عملية التنظيف مستمرة لمدة ساعتين.", options: ["She had cleaned the kitchen before the guests arrived.", "She had been cleaning the kitchen for two hours before the guests arrived."], answer: 1 },
          ]}
        />
      );
    case "s16":
      return (
        <FocusPickLab
          title="مختبر «النتيجة أم النشاط؟» — الحائط"
          rounds={[
            { focus: "ماذا تم إنجازه؟ (الحائط مطلي)", options: ["He had painted the wall.", "He had been painting the wall for three hours."], answer: 0 },
            { focus: "ما النشاط الذي كان مستمرًا؟ وكم استمر؟ (عملية الطلاء + المدة)", options: ["He had painted the wall.", "He had been painting the wall for three hours."], answer: 1 },
          ]}
        />
      );
    case "s17":
      return (
        <ClassifyLab
          title="مختبر yesterday — الكلمة واحدة والأزمنة ثلاثة"
          intro="كل الجمل فيها yesterday — صنّف كل جملة بحسب معناها لا بحسب الكلمة."
          items={[
            { sentence: "I visited my aunt yesterday.", tense: "Past Simple" },
            { sentence: "At 8:00 yesterday, I was visiting my aunt.", tense: "Past Continuous" },
            { sentence: "Before I went to bed yesterday, I had finished my homework.", tense: "Past Perfect" },
          ]}
        />
      );
    case "s18":
      return (
        <ClassifyLab
          title="مختبر when — أربع جمل وأربعة أزمنة"
          intro="حدد زمن فعل Tom في كل جملة — when نفسها لا تتغير، المعنى هو الذي يتغير."
          items={[
            { sentence: "When I arrived, Tom left.", tense: "Past Simple" },
            { sentence: "When I arrived, Tom was sleeping.", tense: "Past Continuous" },
            { sentence: "When I arrived, Tom had left.", tense: "Past Perfect" },
            { sentence: "When I arrived, Tom had been sleeping for two hours.", tense: "Past Perfect Continuous" },
          ]}
        />
      );
    case "s24":
      return (
        <DetectiveLab
          title="Grammar Detective — فريق الإنقاذ"
          passage="When the rescue team arrived, the villagers were standing near the river. They had been waiting for help for several hours because the water had already reached the main road."
          items={DETECTIVE_RESCUE_30}
        />
      );
    case "s25":
      return <SourceQuizLab title="اختبار 1 من المصدر — اختر الزمن" items={QUIZ1_30} />;
    case "s26":
      return <SourceQuizLab title="اختبار 2 من المصدر — اختر حسب المعنى" items={QUIZ2_30} />;
    case "s28":
      return (
        <DetectiveLab
          title="مختبر Nora — أربع علاقات زمنية في جملة واحدة"
          passage="When Nora entered the kitchen, her mother was cooking, her father had already washed the dishes, and her brother had been preparing dessert for an hour."
          items={DETECTIVE_NORA_30}
        />
      );
    case "s29":
      return <TenseMachineLab />;
    case "s30":
      return (
        <DetectiveLab
          title="Boss Battle — قصة Sam"
          passage="At 7:30 yesterday, Sam was driving home. He had finished work an hour earlier. He had been working since early morning, so he was exhausted. While he was driving, his phone rang."
          items={DETECTIVE_SAM_30}
        />
      );
    case "s32":
      return <ErrorFixLab />;
    case "s33":
      return (
        <SourceQuizLab
          title="السؤال الخادع — جرّبه بنفسك"
          items={[{
            q: "When I arrived, Sarah ______ for an hour.",
            opts: ["A) studied", "B) was studying", "C) had been studying"],
            answer: 2,
            note: "لأن for an hour توضح مدة امتدت حتى نقطة ماضية. لكن بدون for an hour يمكن أن تكون was studying إذا كان التركيز على اللحظة.",
          }]}
        />
      );
    case "s34":
      return <MeaningMatchLab />;
    case "s35":
      return (
        <FocusPickLab
          title="مختبر focus — أربع زوايا لنفس البيت"
          rounds={[
            { focus: "الإنجاز.", options: ["He painted the house.", "He was painting the house.", "He had painted the house.", "He had been painting the house for three hours."], answer: 0 },
            { focus: "النشاط في تلك اللحظة.", options: ["He painted the house.", "He was painting the house.", "He had painted the house.", "He had been painting the house for three hours."], answer: 1 },
            { focus: "الإنجاز قبل نقطة ماضية.", options: ["He painted the house.", "He was painting the house.", "He had painted the house.", "He had been painting the house for three hours."], answer: 2 },
            { focus: "النشاط والمدة قبل نقطة ماضية.", options: ["He painted the house.", "He was painting the house.", "He had painted the house.", "He had been painting the house for three hours."], answer: 3 },
          ]}
        />
      );
    case "s36":
      return (
        <DetectiveLab
          title="تمرين القصة السينمائية — مكتبة Lina"
          passage="When Lina entered the old library, several students were searching through the shelves. The librarian had already locked one of the rooms because someone had broken a window. Lina noticed that the students had been searching for almost an hour. Suddenly, a loud noise came from upstairs."
          items={DETECTIVE_LINA_30}
          showRoles={false}
        />
      );
    case "s38":
      return <StoryWriterLab mode="boss" />;
    case "s39":
      return <SourceQuizLab title="الاختبار النهائي من المصدر — 8 أسئلة" items={FINAL_EXAM_30} />;
    case "s40":
      return <StoryWriterLab mode="challenge" />;
    case "final":
      return (
        <DetectiveLab
          title="IQ200 FINAL CHALLENGE — حلل بنفسك أولًا"
          passage="When the scientist entered the laboratory, the assistants were checking the equipment. They had already completed the first test, but they had been working on the second test for nearly three hours. Suddenly, one of the machines stopped."
          items={DETECTIVE_FINAL_30}
        />
      );
    default:
      return null;
  }
}

function PlatformNoteFor({ id }: { id: string }) {
  switch (id) {
    case "cover":
      return (
        <PlatformExplanation>
          هذا درس مراجعة وتثبيت: لن تتعلم زمنًا جديدًا، بل ستتعلم كيف تختار بين الأزمنة الأربعة خلال ثانيتين.
          تنقّل بالخطوات عبر «السابق/التالي»، أو أسهم لوحة المفاتيح، أو قائمة الخطوات الجانبية.
        </PlatformExplanation>
      );
    case "s3":
      return (
        <PlatformExplanation>
          لاحظ أن قصة Leo كلها <En>Past Simple</En> رغم أنها أربعة أفعال — لأن كل حدث يدفع القصة خطوة للأمام
          ولا يوجد رجوع للوراء. الخطأ الشائع هو إقحام <En>had</En> في سلسلة أحداث متتابعة لا تحتاجها.
        </PlatformExplanation>
      );
    case "s20":
      return (
        <PlatformExplanation>
          هذه من أدق نقاط الدرس: <En>before</En> لا تفرض <En>Past Perfect</En>. الجملتان في المصدر صحيحتان —
          <En>before</En> وحدها توضح الترتيب، فيصح الماضي البسيط في الجملتين، ويضيف <En>had</En> تأكيدًا على
          اكتمال الحدث الأول قبل الثاني بحسب ما تريد إبرازه.
        </PlatformExplanation>
      );
    case "s27":
      return (
        <PlatformExplanation>
          انتبه: هذا القسم لا يقول إن كل الإجابات صحيحة دائمًا — بل يقول إن الجملة الواحدة قد تصح بأكثر من زمن
          لكن <strong>كل زمن يعطي معنى مختلفًا</strong>. في الاختبارات، اقرأ المعنى المقصود (العربي أو السياق) أولًا
          ثم اختر الزمن الذي يطابقه بدقة.
        </PlatformExplanation>
      );
    case "s31":
      return (
        <PlatformExplanation>
          اقرأ خط الزمن من الأعلى (الأقدم) إلى الأسفل (<En>NOW</En>). لاحظ أن <En>had been working</En> يغطي
          «مساحة» على الخط (نشاط ممتد)، بينما <En>had finished</En> نقطة واحدة قبل القيادة، و<En>rang</En> نقطة
          مفاجئة داخل مشهد القيادة المستمر.
        </PlatformExplanation>
      );
    default:
      return null;
  }
}

function Cover() {
  return (
    <div
      dir="rtl"
      data-source-section={SOURCE_SECTIONS[SEC.cover].title}
      className="overflow-hidden rounded-[2rem] border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 shadow-xl md:p-10"
    >
      <div className="text-center text-6xl anim-float" aria-hidden>🎛️</div>
      <h2 className="font-head mt-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        <Rich text={LESSON_TITLE_30} />
      </h2>
      <div className="mt-2 text-center text-base font-black text-indigo-800">
        <Rich text={LESSON_SUBTITLE_30} />
      </div>
      <div className="mt-2 text-center">
        <En className="text-sm font-black uppercase tracking-[0.2em] text-indigo-700">🎛️ {LAB_NAME_30}</En>
      </div>
      <div dir="ltr" className="ltr-row mt-3 rounded-2xl bg-slate-900 p-3 text-center">
        <En className="text-xs font-black text-white md:text-sm">{LAB_MOTTO_30}</En>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {TENSES_30.map((t) => (
          <div key={t.tense} className="flex items-center gap-2 rounded-2xl border-2 border-white bg-white/80 p-3">
            <span className="text-xl" aria-hidden>{t.emoji}</span>
            <span className="min-w-0">
              <En className="block text-sm font-black text-slate-900">{t.tense}</En>
              <span className="block text-xs font-bold text-slate-500"><Rich text={t.question} /></span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-xs font-bold text-slate-500">
        <Rich text={`${SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · ${SOURCE_LEDGER_COUNT} قسمًا في السجل · ${TOTAL_STEPS_30} خطوة · اختبار من 20 سؤالًا`} />
      </div>
    </div>
  );
}

function SlideView({ slide, onGoTest }: { slide: Slide; onGoTest: () => void }) {
  if (slide.id === "cover") {
    return (
      <div className="space-y-4">
        <Cover />
        <PlatformNoteFor id="cover" />
      </div>
    );
  }
  const section = SOURCE_SECTIONS[SEC[slide.id]];
  const isLast = slide.id === "final";
  return (
    <div className="space-y-4">
      <Frame title={section.title} sourceHeading={section.title} mascot={slide.mascot}>
        <Lines lines={section.units} />
      </Frame>
      <PlatformNoteFor id={slide.id} />
      <LabFor id={slide.id} />
      {isLast && (
        <div dir="rtl" className="rounded-[2rem] border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6 text-center shadow-xl">
          <div className="text-5xl anim-float" aria-hidden>🏆</div>
          <h3 className="font-head mt-2 text-2xl font-bold text-slate-900">
            <Rich text="أحسنت! — LESSON 30 COMPLETE" />
          </h3>
          <p className="mt-2 text-sm font-bold text-slate-600">
            <Rich text="أكملت مراجعة نظام الماضي الكامل — جاهز لاختبار العشرين سؤالًا؟" />
          </p>
          <button
            type="button"
            onClick={onGoTest}
            className="mt-4 rounded-xl bg-indigo-700 px-5 py-3 font-bold text-white shadow transition hover:bg-indigo-800"
          >
            <Rich text="📝 إلى منطقة الاختبارات (20 سؤالًا)" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// منطقة الاختبارات — 20 سؤالًا · لا تصحيح قبل Submit · Reset كامل
// ============================================================

type TestAnswer30 = number | boolean | number[] | string[] | Record<number, number>;

const TYPE_LABEL_30: Record<TestQ30["type"], string> = {
  single: "اختيار واحد",
  tf: "صح / خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
  spot: "اكتشاف الخطأ",
};

function isAnswered30(q: TestQ30, a: TestAnswer30 | undefined): boolean {
  if (a === undefined) return false;
  switch (q.type) {
    case "single":
    case "spot":
      return typeof a === "number";
    case "tf":
      return typeof a === "boolean";
    case "multi":
      return Array.isArray(a) && a.length > 0;
    case "order":
      return Array.isArray(a) && a.length === q.items.length;
    case "match":
      return typeof a === "object" && !Array.isArray(a) && Object.keys(a).length === q.left.length;
  }
}

function isCorrect30(q: TestQ30, a: TestAnswer30 | undefined): boolean {
  if (!isAnswered30(q, a)) return false;
  switch (q.type) {
    case "single":
    case "spot":
      return a === q.answer;
    case "tf":
      return a === q.answer;
    case "multi": {
      const got = [...(a as number[])].sort().join(",");
      const want = [...q.answer].sort().join(",");
      return got === want;
    }
    case "order":
      return (a as string[]).every((x, i) => x === q.answer[i]);
    case "match": {
      const m = a as Record<number, number>;
      return q.answer.every((want, i) => m[i] === want);
    }
  }
}

function QShell({ n, type, ar, en, state, children }: {
  n: number; type: TestQ30["type"]; ar: string; en?: string; state: "idle" | "picked" | "right" | "wrong"; children: ReactNode;
}) {
  const ring = state === "right" ? "border-emerald-300" : state === "wrong" ? "border-rose-300" : state === "picked" ? "border-indigo-300" : "border-slate-200";
  return (
    <div data-test-q={n} className={`rounded-3xl border-2 bg-white p-4 transition ${ring}`}>
      <div className="flex flex-wrap items-start gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-indigo-700 text-sm font-bold text-white">{n}</span>
        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-black text-indigo-800">{TYPE_LABEL_30[type]}</span>
          <div className="mt-1 font-bold text-slate-800"><Rich text={ar} /></div>
          {en && (
            <div dir="ltr" className="font-en mt-1 text-left text-lg font-extrabold text-slate-900">{en}</div>
          )}
        </div>
        {state === "right" && <span className="text-xl" aria-hidden>✅</span>}
        {state === "wrong" && <span className="text-xl" aria-hidden>❌</span>}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function OptBtn({ selected, revealed, isAnswer, onClick, disabled, label }: {
  selected: boolean; revealed: boolean; isAnswer: boolean; onClick: () => void; disabled: boolean; label: string;
}) {
  const cls = revealed
    ? isAnswer
      ? "border-emerald-400 bg-emerald-50"
      : selected
        ? "border-rose-400 bg-rose-50"
        : "border-slate-200 bg-white opacity-60"
    : selected
      ? "border-indigo-500 bg-indigo-50"
      : "border-slate-200 bg-white hover:border-indigo-300";
  return (
    <button type="button" disabled={disabled} aria-pressed={selected} onClick={onClick} className={`w-full rounded-xl border-2 p-2.5 text-left transition disabled:cursor-default ${cls}`}>
      {LATIN_RX.test(label) && !ARABIC_RX.test(label)
        ? <En className="text-sm font-extrabold text-slate-900 md:text-base">{label}</En>
        : <span className="block text-right text-sm font-extrabold text-slate-900 md:text-base"><Rich text={label} /></span>}
    </button>
  );
}

function TestArea30({ onCheckedChange, onShowSolutions }: { onCheckedChange?: (c: boolean) => void; onShowSolutions?: () => void }) {
  const [answers, setAnswers] = useState<Record<number, TestAnswer30>>({});
  const [checked, setChecked] = useState(false);
  const answered = TEST_30.filter((q) => isAnswered30(q, answers[q.n])).length;
  const allAnswered = answered === TEST_30.length;
  const score = useMemo(
    () => TEST_30.reduce((s, q) => s + (isCorrect30(q, answers[q.n]) ? 1 : 0), 0),
    [answers]
  );
  const pct = Math.round((score / TEST_30.length) * 100);
  const msg =
    pct === 100 ? "🏆 ممتاز! سيطرة كاملة على نظام الماضي."
    : pct >= 80 ? "🌟 رائع جدًا! راجع الحلول للأسئلة الخاطئة فقط."
    : pct >= 60 ? "👍 جيد! أعد آلة الأسئلة الأربعة ثم حاول مجددًا."
    : "💪 لا بأس — أعد الدرس من البداية ثم أعد الاختبار.";
  const submit = () => { setChecked(true); onCheckedChange?.(true); };
  const reset = () => { setAnswers({}); setChecked(false); onCheckedChange?.(false); };
  const set = (n: number, v: TestAnswer30) => setAnswers((p) => ({ ...p, [n]: v }));

  return (
    <div data-area="l30-test" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-4">
        <span className="text-2xl" aria-hidden>📝</span>
        <div className="min-w-0 flex-1">
          <div className="font-black text-slate-800">
            <Rich text={`منطقة الاختبارات — ${TEST_30.length} سؤالًا جديدًا على نظام الماضي الكامل`} />
          </div>
          <div className="text-xs font-bold text-slate-500">
            <Rich text="أجب عنها كلها بحرية — لا يظهر أي تصحيح أو نتيجة قبل «إنهاء الاختبار»." />
          </div>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
          <Rich text={`أجبت عن ${answered} / ${TEST_30.length}`} />
        </span>
      </div>

      <div className="grid gap-3">
        {TEST_30.map((q) => {
          const a = answers[q.n];
          const state = !checked ? (isAnswered30(q, a) ? "picked" : "idle") : isCorrect30(q, a) ? "right" : "wrong";
          return (
            <QShell key={q.n} n={q.n} type={q.type} ar={q.ar} en={q.type === "spot" ? undefined : q.en} state={state}>
              {q.type === "single" && (
                <div className="grid gap-1.5">
                  {q.opts.map((o, i) => (
                    <OptBtn key={o} label={o} selected={a === i} revealed={checked} isAnswer={i === q.answer} disabled={checked} onClick={() => set(q.n, i)} />
                  ))}
                </div>
              )}
              {q.type === "tf" && (
                <div className="flex flex-wrap gap-2">
                  {[true, false].map((v) => {
                    const sel = a === v;
                    const cls = checked
                      ? v === q.answer ? "border-emerald-400 bg-emerald-50" : sel ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white opacity-60"
                      : sel ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-300";
                    return (
                      <button key={String(v)} type="button" disabled={checked} aria-pressed={sel} onClick={() => set(q.n, v)} className={`rounded-xl border-2 px-5 py-2 text-sm font-black transition disabled:cursor-default ${cls}`}>
                        {v ? "✓ صحيح" : "✕ خطأ"}
                      </button>
                    );
                  })}
                </div>
              )}
              {q.type === "multi" && (
                <div className="grid gap-1.5">
                  {q.opts.map((o, i) => {
                    const arr = (a as number[] | undefined) ?? [];
                    const sel = arr.includes(i);
                    return (
                      <OptBtn
                        key={o}
                        label={o}
                        selected={sel}
                        revealed={checked}
                        isAnswer={q.answer.includes(i)}
                        disabled={checked}
                        onClick={() => set(q.n, sel ? arr.filter((x) => x !== i) : [...arr, i])}
                      />
                    );
                  })}
                  <div className="text-xs font-bold text-slate-400">اختر كل الإجابات الصحيحة — أكثر من خيار.</div>
                </div>
              )}
              {q.type === "order" && (() => {
                const arr = (a as string[] | undefined) ?? [];
                return (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {q.items.map((it) => {
                        const pos = arr.indexOf(it);
                        const used = pos !== -1;
                        return (
                          <button key={it} type="button" disabled={checked || used} onClick={() => set(q.n, [...arr, it])} className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition disabled:cursor-default ${used ? "border-indigo-200 bg-indigo-50 text-indigo-400" : "border-slate-200 bg-white hover:border-indigo-400"}`}>
                            {used && <span className="ml-1 rounded-full bg-indigo-700 px-1.5 text-[10px] font-black text-white">{pos + 1}</span>}
                            <En>{it}</En>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">اضغط الأحداث من الأقدم إلى الأحدث.</span>
                      {!checked && arr.length > 0 && (
                        <button type="button" onClick={() => set(q.n, [])} className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 hover:bg-slate-200">↺ مسح الترتيب</button>
                      )}
                    </div>
                  </div>
                );
              })()}
              {q.type === "match" && (() => {
                const m = (a as Record<number, number> | undefined) ?? {};
                return (
                  <div className="grid gap-2">
                    {q.left.map((l, li) => (
                      <div key={l} className="flex flex-wrap items-center gap-2 rounded-xl border-2 border-slate-200 bg-white p-2.5">
                        <En className="min-w-0 flex-1 text-sm font-extrabold text-slate-900">{l}</En>
                        <label className="sr-only" htmlFor={`m30-${q.n}-${li}`}>مطابقة {l}</label>
                        <select
                          id={`m30-${q.n}-${li}`}
                          dir="ltr"
                          disabled={checked}
                          value={m[li] ?? ""}
                          onChange={(e) => set(q.n, { ...m, [li]: Number(e.target.value) })}
                          className="font-en rounded-xl border-2 border-slate-200 bg-white px-2 py-1.5 text-sm font-bold text-slate-800 outline-none focus:border-indigo-400"
                        >
                          <option value="" disabled>Choose…</option>
                          {q.right.map((r, ri) => (
                            <option key={r} value={ri}>{r}</option>
                          ))}
                        </select>
                        {checked && (
                          <span className={`text-sm font-black ${m[li] === q.answer[li] ? "text-emerald-700" : "text-rose-700"}`}>
                            {m[li] === q.answer[li] ? "✓" : "✕"}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
              {q.type === "spot" && (
                <div className="space-y-2">
                  <div dir="ltr" className="ltr-row flex flex-wrap gap-1.5">
                    {q.segments.map((s, si) => {
                      const sel = a === si;
                      const cls = checked
                        ? si === q.answer ? "border-emerald-400 bg-emerald-50" : sel ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-white opacity-70"
                        : sel ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-300";
                      return (
                        <button key={si} type="button" disabled={checked} aria-pressed={sel} onClick={() => set(q.n, si)} className={`rounded-xl border-2 px-3 py-1.5 transition disabled:cursor-default ${cls}`}>
                          <En className="text-sm font-extrabold text-slate-900 md:text-base">{s}</En>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-xs font-bold text-slate-400">اضغط الجزء الذي يحتوي الخطأ.</div>
                </div>
              )}
            </QShell>
          );
        })}
      </div>

      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-indigo-900/10 bg-white/95 p-4 shadow-xl backdrop-blur" role="status" aria-live="polite">
          {!checked ? (
            <>
              <button
                type="button"
                onClick={submit}
                disabled={!allAnswered}
                title={allAnswered ? undefined : "أجب عن كل الأسئلة أولًا"}
                className="rounded-xl bg-indigo-700 px-5 py-2.5 font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
              >
                <Rich text={`إنهاء الاختبار (${answered}/${TEST_30.length})`} />
              </button>
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                <Rich text="↺ إعادة" />
              </button>
            </>
          ) : (
            <>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-700 text-xl font-extrabold text-white">{pct}%</div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-slate-800">
                  <Rich text={`نتيجتك: ${score} / ${TEST_30.length} — صحيح ${score} · خطأ ${TEST_30.length - score}`} />
                </div>
                <div className="text-sm font-semibold text-slate-500">{msg}</div>
              </div>
              {onShowSolutions && (
                <button type="button" onClick={onShowSolutions} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700">
                  <Rich text="📖 عرض حلول الاختبارات" />
                </button>
              )}
              <button type="button" onClick={reset} className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200">
                <Rich text="↺ إعادة الاختبار" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// حلول الاختبارات — منطقة مستقلة: 20 حلًا مفصلًا
// ============================================================

function solutionAnswer(q: TestQ30): ReactNode {
  switch (q.type) {
    case "single":
      return <En className="text-emerald-800">{q.opts[q.answer]}</En>;
    case "tf":
      return <span className="text-emerald-800">{q.answer ? "✓ صحيح" : "✕ خطأ"}</span>;
    case "multi":
      return (
        <span className="space-y-1">
          {q.answer.map((i) => (
            <En key={i} className="block text-emerald-800">• {q.opts[i]}</En>
          ))}
        </span>
      );
    case "order":
      return (
        <span dir="ltr" className="ltr-row block text-left">
          {q.answer.map((x, i) => (
            <En key={x} className="text-emerald-800">{i > 0 ? " → " : ""}{x}</En>
          ))}
        </span>
      );
    case "match":
      return (
        <span className="space-y-1">
          {q.left.map((l, i) => (
            <span key={l} className="block">
              <En className="text-emerald-800">{l}</En>
              <span className="mx-1 text-slate-400">←→</span>
              <En className="text-emerald-800">{q.right[q.answer[i]]}</En>
            </span>
          ))}
        </span>
      );
    case "spot":
      return <En className="text-emerald-800">{q.fix}</En>;
  }
}

function Solutions30({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest?: () => void; onGoTeacher?: () => void }) {
  if (!unlocked) {
    return (
      <div data-area="l30-solutions" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-6 text-center md:p-10">
        <div className="text-5xl" aria-hidden>📖</div>
        <h3 className="font-head mt-3 text-2xl font-bold text-slate-900"><Rich text="حلول الاختبارات — الدرس 30" /></h3>
        <p className="mx-auto mt-2 max-w-md text-base font-semibold text-slate-500">
          <Rich text="الحلول المفصلة للأسئلة العشرين تظهر بعد إنهاء الاختبار — أو بفتح منطقة المعلم." />
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {onGoTest && (
            <button type="button" onClick={onGoTest} className="rounded-xl bg-indigo-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-800">
              <Rich text="← إلى منطقة الاختبارات" />
            </button>
          )}
          {onGoTeacher && (
            <button type="button" onClick={onGoTeacher} className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700">
              <Rich text="فتح منطقة المعلم" />
            </button>
          )}
        </div>
      </div>
    );
  }
  const groups: { title: string; qs: TestQ30[] }[] = [
    { title: "الأسئلة 1–5", qs: TEST_30.slice(0, 5) },
    { title: "الأسئلة 6–10", qs: TEST_30.slice(5, 10) },
    { title: "الأسئلة 11–15", qs: TEST_30.slice(10, 15) },
    { title: "الأسئلة 16–20", qs: TEST_30.slice(15, 20) },
  ];
  return (
    <div data-area="l30-solutions" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
        <span className="text-2xl" aria-hidden>📖</span>
        <div className="min-w-0 flex-1">
          <div className="font-black text-slate-800"><Rich text={`حلول الاختبارات — ${TEST_30.length} حلًا مفصلًا`} /></div>
          <div className="text-xs font-bold text-slate-500"><Rich text="كل حل: الإجابة الصحيحة + لماذا تنطبق القاعدة + تنبيه الفخ." /></div>
        </div>
      </div>
      {groups.map((g) => (
        <details key={g.title} className="group rounded-3xl border-2 border-slate-200 bg-white" open={g.title === "الأسئلة 1–5"}>
          <summary className="cursor-pointer list-none rounded-3xl px-4 py-3 font-black text-slate-800 transition hover:bg-slate-50">
            <span className="ml-2 inline-block transition group-open:rotate-90" aria-hidden>◂</span>
            <Rich text={g.title} />
          </summary>
          <div className="space-y-3 px-4 pb-4">
            {g.qs.map((q) => (
              <div key={q.n} data-solution={q.n} className="rounded-3xl border-2 border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-600 text-sm font-bold text-white">{q.n}</span>
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-black text-indigo-800">{TYPE_LABEL_30[q.type]}</span>
                    <div className="mt-1 font-bold text-slate-800"><Rich text={q.ar} /></div>
                    {q.type !== "spot" && q.en && (
                      <div dir="ltr" className="font-en mt-1 text-left text-lg font-extrabold text-slate-900">{q.en}</div>
                    )}
                    {q.type === "spot" && (
                      <div dir="ltr" className="font-en mt-1 text-left text-lg font-extrabold text-slate-900">{q.segments.join(" ")}</div>
                    )}
                  </div>
                </div>
                <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50/60 p-3 text-sm font-bold">
                  <span className="text-slate-500"><Rich text="الإجابة الصحيحة: " /></span>
                  {solutionAnswer(q)}
                </div>
                <div className="mt-2 text-sm font-bold text-slate-700"><Rich text={`💡 ${q.why}`} /></div>
                {q.trap && <div className="mt-1 text-sm font-bold text-amber-800"><Rich text={`⚠️ فخ: ${q.trap}`} /></div>}
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

// ============================================================
// منطقة المعلم — خلف كلمة المرور somer173
// ============================================================

function TeacherArea30({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange?: (ok: boolean) => void; onGoSolutions?: () => void }) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!unlocked) {
    return (
      <div data-area="l30-teacher" className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-200 text-xl" aria-hidden>🧑‍🏫</span>
          <div className="min-w-0 flex-1">
            <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">Teacher's Area — Lesson 30</div>
            <div className="text-sm font-bold text-slate-500"><Rich text="منطقة المعلم — الدرس 30 · دليل التدريس وحلول الأنشطة" /></div>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-400 shadow-sm">🔒 مقفلة</span>
        </div>
        <form
          className="mt-4 flex flex-wrap items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() === TEACHER_PASSWORD_30) {
              onUnlockChange?.(true);
              setWrong(false);
              setValue("");
            } else {
              setWrong(true);
              setAttempts((n) => n + 1);
            }
          }}
        >
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); if (wrong) setWrong(false); }}
            placeholder="كلمة المرور"
            aria-label="كلمة مرور منطقة المعلم"
            dir="ltr"
            autoComplete="off"
            className="font-en w-44 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-left text-base font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400"
          />
          <button type="submit" className="rounded-xl bg-indigo-700 px-4 py-2 font-bold text-white shadow transition hover:bg-indigo-800 active:scale-[0.98]">
            🔓 فتح المنطقة
          </button>
          <span className="text-sm font-bold text-slate-400">خاص بالمعلم فقط</span>
          {wrong && (
            <div key={attempts} className="shake w-full text-sm font-bold text-rose-600" role="status">
              ✕ كلمة المرور غير صحيحة — المنطقة ما زالت مقفلة.
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div data-area="l30-teacher" className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-indigo-200 bg-white/80 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-indigo-700 text-xl text-white" aria-hidden>🧑‍🏫</span>
        <div className="min-w-0 flex-1">
          <div dir="ltr" className="font-en text-left text-lg font-extrabold text-slate-700">Teacher's Area — Lesson 30</div>
          <div className="text-sm font-bold text-slate-500"><Rich text="منطقة المعلم — الدرس 30 · دليل التدريس وحلول الأنشطة" /></div>
        </div>
        <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-bold text-white shadow-sm">✓ Unlocked</span>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900"><Rich text={TEACHER_30_OVERVIEW.title} /></h3>
        <div className="mt-2 text-sm font-black text-indigo-800"><Rich text="الأهداف التعليمية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_30_OVERVIEW.objectives.map((o, i) => (
            <li key={i} className="rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={o} /></li>
          ))}
        </ul>
        <div className="mt-3 text-sm font-black text-indigo-800"><Rich text="المتطلبات القبلية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_30_OVERVIEW.prerequisites.map((o, i) => (
            <li key={i} className="rounded-xl bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700"><Rich text={o} /></li>
          ))}
        </ul>
        <div className="mt-3 text-sm font-black text-indigo-800"><Rich text="المفاهيم الجوهرية" /></div>
        <ul className="mt-1 space-y-1">
          {TEACHER_30_OVERVIEW.core.map((o, i) => (
            <li key={i} className="rounded-xl bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-900"><Rich text={o} /></li>
          ))}
        </ul>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900"><Rich text="Teaching Notes — ملاحظات التدريس" /></h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_30_NOTES.map((n, i) => (
            <div key={i} className="rounded-2xl border-2 border-slate-100 bg-slate-50/60 p-3">
              <div className="text-sm font-black text-slate-900"><Rich text={n.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {n.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-600"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900"><Rich text="Activity Solutions — حلول أنشطة وتمارين المصدر" /></h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_30_SOLUTIONS.map((s, i) => (
            <div key={i} data-teacher-solution={i} className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 p-3">
              <div className="text-sm font-black text-emerald-900"><Rich text={s.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {s.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-700"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-4">
        <h3 className="font-head text-xl font-bold text-slate-900"><Rich text="Writing Rubrics — سلّما التقييم للتحديين الكتابيين" /></h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_30_RUBRICS.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white p-3">
              <div className="text-sm font-black text-amber-900"><Rich text={r.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {r.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-700"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4">
        <h3 className="font-head text-xl font-bold text-slate-900"><Rich text="Common Mistakes — الأخطاء الشائعة" /></h3>
        <div className="mt-2 grid gap-2">
          {TEACHER_30_MISTAKES.map((m, i) => (
            <div key={i} className="rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-3">
              <div className="text-sm font-black text-rose-900"><Rich text={m.head} /></div>
              <ul className="mt-1 space-y-0.5">
                {m.lines.map((l, j) => (
                  <li key={j} className="text-sm font-semibold text-slate-700"><Rich text={`• ${l}`} /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {onGoSolutions && (
        <div className="flex flex-wrap items-center gap-3 rounded-3xl border-2 border-emerald-200 bg-emerald-50/60 p-4">
          <span className="text-2xl" aria-hidden>📖</span>
          <div className="min-w-0 flex-1 text-sm font-bold text-slate-700">
            <Rich text="حلول الاختبار العشرون المفصلة في منطقة مستقلة — مفتوحة لك الآن." />
          </div>
          <button type="button" onClick={onGoSolutions} className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700">
            <Rich text="← فتح حلول الاختبارات" />
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// الهيكل العام — rail + drawer + progress + keyboard + أربع مناطق
// ============================================================

type Area30 = "lesson" | "test" | "solutions" | "teacher";

const AREAS: { id: Area30; emoji: string; ar: string }[] = [
  { id: "lesson", emoji: "📚", ar: "الدرس" },
  { id: "test", emoji: "📝", ar: "منطقة الاختبارات" },
  { id: "solutions", emoji: "📖", ar: "حلول الاختبارات" },
  { id: "teacher", emoji: "🧑‍🏫", ar: "منطقة المعلم" },
];

const SECTION_COLORS: Record<string, string> = {
  "الافتتاح": "text-slate-500",
  "النظام الكامل": "text-indigo-700",
  "الأزمنة الأربعة": "text-violet-700",
  "الخط الزمني وبناء القصة": "text-sky-700",
  "المقارنات الحاسمة": "text-orange-700",
  "كلمات لا تحسم الزمن": "text-teal-700",
  "المحقق والتدريبات": "text-cyan-700",
  "IQ200 المتقدم": "text-rose-700",
  "تصحيح الأخطاء والخداع": "text-fuchsia-700",
  "القصة السينمائية": "text-purple-700",
  "التحديات النهائية": "text-red-700",
  "الخاتمة": "text-slate-500",
};

function slideTitle(slide: Slide): string {
  if (slide.id === "cover") return "الغلاف";
  return SOURCE_SECTIONS[SEC[slide.id]].title;
}

function Rail({ index, setIndex, onExit, onClose, area, setArea }: {
  index: number;
  setIndex: (i: number) => void;
  onExit: () => void;
  onClose?: () => void;
  area: Area30;
  setArea: (a: Area30) => void;
}) {
  const groups = useMemo(() => {
    const map = new Map<string, number[]>();
    slides.forEach((s, i) => {
      const list = map.get(s.section) ?? [];
      list.push(i);
      map.set(s.section, list);
    });
    return [...map.entries()].map(([section, indexes]) => ({ section, indexes }));
  }, []);
  return (
    <aside className="flex h-full flex-col bg-white/90">
      <div className="border-b border-indigo-100 p-4">
        <button onClick={onExit} className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
          ← جميع الدروس
        </button>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => { setArea(a.id); onClose?.(); }}
              aria-pressed={area === a.id}
              className={`rounded-xl border-2 px-2 py-2 text-xs font-black transition ${area === a.id ? "border-indigo-600 bg-indigo-700 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"}`}
            >
              {a.emoji} {a.ar}
            </button>
          ))}
        </div>
        <En className="mt-2 block text-center text-xs font-semibold text-indigo-700">🎛️ {LAB_NAME_30}</En>
        <div className="mt-2 rounded-lg bg-indigo-50 px-2 py-1 text-center text-[11px] font-bold text-indigo-800">
          {SOURCE_NUMBERED_COUNT} قسمًا مرقّمًا · {SOURCE_LEDGER_COUNT} قسمًا في السجل · {slides.length} خطوة
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3" aria-label="خطوات الدرس">
        {groups.map((group) => (
          <div key={group.section} className="mb-3">
            <div className={`px-3 py-1 text-xs font-bold ${SECTION_COLORS[group.section] ?? "text-slate-400"}`}>
              <Rich text={group.section} />
            </div>
            {group.indexes.map((i) => {
              const active = index === i && area === "lesson";
              return (
                <button
                  key={i}
                  onClick={() => { setArea("lesson"); setIndex(i); onClose?.(); }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm transition ${active ? "bg-indigo-700 text-white shadow" : "text-slate-600 hover:bg-indigo-50"}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${active ? "bg-white/25" : "bg-slate-100"}`}>
                    {i + 1}
                  </span>
                  <span className="truncate font-semibold"><Rich text={slideTitle(slides[i])} /></span>
                  <span className="mr-auto text-base" aria-hidden>{slides[i].mascot}</span>
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-indigo-100 p-4 text-xs text-slate-400">التنقل: الأسهم ← → أو مفتاح المسافة</div>
    </aside>
  );
}

export default function Lesson30({ onExit }: { onExit: () => void }) {
  const [area, setArea] = useState<Area30>("lesson");
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);
  const [testChecked, setTestChecked] = useState(false);
  const [teacherOk, setTeacherOk] = useState(false);
  const total = slides.length;
  const navigation = useMemo(
    () => ({
      next: () => setIndex((value) => Math.min(value + 1, total - 1)),
      prev: () => setIndex((value) => Math.max(value - 1, 0)),
    }),
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (menu || area !== "lesson") return;
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
  }, [navigation, menu, area]);

  useEffect(() => {
    document.getElementById("l30-main")?.scrollTo({ top: 0 });
  }, [index, area]);

  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;
  const solutionsUnlocked = testChecked || teacherOk;
  return (
    <div dir="rtl" className="font-body relative flex h-screen flex-col overflow-hidden bg-[#f3f4ff] text-slate-800">
      <Signature />
      <div className="relative flex min-h-0 flex-1">
        <SignatureGhost />
        <div className="relative z-10 hidden w-72 shrink-0 border-l border-indigo-100 bg-white/85 backdrop-blur lg:block">
          <Rail index={index} setIndex={setIndex} onExit={onExit} area={area} setArea={setArea} />
        </div>
        <div className="relative z-10 flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 px-4 pt-3 lg:px-10">
            <button
              onClick={() => setMenu(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-indigo-100 bg-white text-lg shadow-sm lg:hidden"
              aria-label="فهرس الخطوات"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {AREAS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setArea(a.id)}
                    aria-pressed={area === a.id}
                    className={`rounded-full px-3 py-1.5 text-xs font-black transition md:text-sm ${area === a.id ? "bg-indigo-700 text-white shadow" : "bg-white text-slate-500 shadow-sm hover:bg-indigo-50"}`}
                  >
                    {a.emoji} {a.ar}
                  </button>
                ))}
              </div>
              {area === "lesson" && (
                <>
                  <div className="mt-1.5 truncate text-sm font-bold text-slate-500">
                    <Rich text={`${slide.section} · `} />
                    <span className="text-slate-800"><Rich text={slideTitle(slide)} /></span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-indigo-100/70">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-indigo-700 via-sky-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>
            {area === "lesson" && (
              <span data-slide-counter className="rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-500 shadow-sm">
                {index + 1} / {total}
              </span>
            )}
          </header>
          <main id="l30-main" className="flex-1 overflow-y-auto px-3 pb-32 pt-4 md:px-6 lg:px-10">
            <div data-area="student-lesson" className="pop mx-auto max-w-4xl" hidden={area !== "lesson"}>
              <SlideView key={index} slide={slide} onGoTest={() => setArea("test")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "test"}>
              <TestArea30 onCheckedChange={setTestChecked} onShowSolutions={() => setArea("solutions")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "solutions"}>
              <Solutions30 unlocked={solutionsUnlocked} onGoTest={() => setArea("test")} onGoTeacher={() => setArea("teacher")} />
            </div>
            <div className="mx-auto max-w-4xl" hidden={area !== "teacher"}>
              <TeacherArea30 unlocked={teacherOk} onUnlockChange={setTeacherOk} onGoSolutions={() => setArea("solutions")} />
            </div>
          </main>
          {area === "lesson" && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3">
              <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border-2 border-indigo-900/[0.06] bg-white/95 p-1.5 shadow-xl backdrop-blur">
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
                  className="rounded-full bg-indigo-700 px-5 py-2 text-sm font-bold text-white shadow transition enabled:hover:bg-indigo-800 disabled:opacity-30"
                >
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
          <div className="relative z-10 h-full w-80 max-w-[85vw] bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <Rail index={index} setIndex={setIndex} onExit={onExit} onClose={() => setMenu(false)} area={area} setArea={setArea} />
          </div>
        </div>
      )}
    </div>
  );
}
