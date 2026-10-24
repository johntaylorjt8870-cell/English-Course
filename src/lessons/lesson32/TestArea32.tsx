// ============================================================
// منطقة الاختبار والحلول — الدرس 32 · THE DURATION STREAM
// • 20 سؤالًا جديدًا: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking
// • محايدة قبل الإرسال: لا ✓/✕ ولا درجة ولا تلميح — فقط عدّاد «أجبت»
// • بعد الإرسال: الدرجة + حالة كل سؤال + تلوين الخيارات + فتح الحلول
// • إعادة كاملة: تمسح الإجابات والدرجة وتقفل الحلول من جديد
// • الوصول: كل الخيارات عناصر أصلية (radio/checkbox/select/text) فتعمل
//   لوحة المفاتيح كاملة، وحلقة تركيز واضحة على كل عنصر.
// ============================================================

import { useMemo, useState, type ReactNode } from "react";
import { PlatformTag, Rich, En } from "../../shared/lessonKit";
import {
  TEST_32, TEST_32_LEVEL_COUNTS, LEVEL_LABEL_32, TEST_32_SOLUTIONS, normalizeTyped32,
  type TestLevel32, type TestQ32,
} from "./testData";
import { FOCUS32, SourceBadge32 } from "./kit32";

const TYPE_LABEL: Record<TestQ32["type"], string> = {
  single: "اختيار واحد",
  tf: "صح / خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
  spot: "حدّد الخطأ",
  typed: "كتابة",
};

const TYPE_ICON: Record<TestQ32["type"], string> = {
  single: "🎯",
  tf: "⚖️",
  multi: "🧺",
  order: "🧩",
  match: "🔗",
  spot: "🔍",
  typed: "✍️",
};

const LEVELS: TestLevel32[] = ["basic", "medium", "advanced", "thinking"];
const LEVEL_AR: Record<TestLevel32, string> = {
  basic: "الأساس",
  medium: "التطبيق",
  advanced: "متقدم",
  thinking: "تفكير",
};

type Ans =
  | number
  | boolean
  | number[]
  | string[]
  | { seg: number | null; fix?: string }
  | (number | null)[]
  | string;

/** نتيجة سؤال — تُحسب فقط عند الإرسال */
export function gradeOne32(q: TestQ32, a: Ans | undefined): boolean {
  if (a === undefined) return false;
  switch (q.type) {
    case "single":
      return a === q.answer;
    case "tf":
      return a === q.answer;
    case "multi": {
      const got = (a as number[]).slice().sort((x, y) => x - y).join(",");
      const want = q.answer.slice().sort((x, y) => x - y).join(",");
      return got === want;
    }
    case "order": {
      const got = a as string[];
      return got.length === q.answer.length && got.every((v, i) => v === q.answer[i]);
    }
    case "match": {
      const got = a as (number | null)[];
      return got.length === q.answer.length && got.every((v, i) => v === q.answer[i]);
    }
    case "spot":
      return (a as { seg: number | null }).seg === q.answer;
    case "typed": {
      const got = normalizeTyped32(a as string);
      return q.accept.some((x) => normalizeTyped32(x) === got);
    }
    default:
      return false;
  }
}

/** الحالة الخام لكل سؤال — لا تحمل صحة/خطأ */
export function isAnswered32(q: TestQ32, a: Ans | undefined): boolean {
  if (a === undefined) return false;
  switch (q.type) {
    case "multi": return (a as number[]).length > 0;
    case "order": return (a as string[]).length === q.answer.length;
    case "match": return (a as (number | null)[]).every((v) => v !== null);
    case "spot": return (a as { seg: number | null }).seg !== null;
    case "typed": return (a as string).trim().length > 0;
    default: return true;
  }
}

/** تغذية راجعة بعد الإرسال: إلى أين يعود الطالب؟ (أرقام الخطوات من فهرس الدرس) */
function band(score: number): { title: string; text: string; emoji: string } {
  if (score >= 18)
    return { emoji: "🌊", title: "أداء متمكّن", text: "التيّار واضح عندك: صيغة ومدة وأثر ومقارنة أزمنة. راجع ما أخطأت فيه فقط في الحلول." };
  if (score >= 14)
    return { emoji: "🎨", title: "أداء جيد", text: "الأساس ثابت. راجع «النتيجة أم النشاط؟» (خطوات 16–20) و«نقطة المرجع» (خطوات 26–28)." };
  if (score >= 8)
    return { emoji: "⏳", title: "أداء متوسط", text: "راجع for/since (خطوات 7–9) والنفي والسؤال والجواب القصير (خطوات 10–14) ثم أعد الاختبار." };
  return { emoji: "🧱", title: "يحتاج دعمًا", text: "ابدأ من بناء الصيغة وأدوار أجزائها (خطوات 3–6) قبل أي محاولة جديدة." };
}

export default function TestArea32({ onCheckedChange, onShowSolutions }: { onCheckedChange: (checked: boolean) => void; onShowSolutions: () => void }) {
  const [answers, setAnswers] = useState<Record<number, Ans>>({});
  const [submitted, setSubmitted] = useState(false);
  const [resultMap, setResultMap] = useState<Record<number, boolean>>({});
  const [key, setKey] = useState(0);

  const score = useMemo(() => Object.values(resultMap).filter(Boolean).length, [resultMap]);
  const [submitMsg, setSubmitMsg] = useState("");
  const answeredCount = TEST_32.filter((q) => isAnswered32(q, answers[q.n])).length;
  const answeredPct = Math.round((answeredCount / TEST_32.length) * 100);

  const set = (n: number, v: Ans) => setAnswers((a) => ({ ...a, [n]: v }));
  const missingCount = TEST_32.length - answeredCount;
  const submit = () => {
    // لا يُعتبر الاختبار مكتملًا إذا بقي سؤال مطلوب بلا إجابة.
    if (missingCount > 0) {
      setSubmitMsg(`أكمل جميع الأسئلة أولًا — بقي ${missingCount} سؤالًا بلا إجابة.`);
      return;
    }
    const map: Record<number, boolean> = {};
    TEST_32.forEach((q) => { map[q.n] = gradeOne32(q, answers[q.n]); });
    setResultMap(map);
    setSubmitted(true);
    setSubmitMsg("");
    onCheckedChange(true);
  };
  const reset = () => {
    setAnswers({});
    setResultMap({});
    setSubmitted(false);
    setSubmitMsg("");
    onCheckedChange(false);
    setKey((k) => k + 1);
  };

  return (
    <div key={key} data-area="l32-test-body" className="space-y-3">
      {/* ---------- رأس المنطقة + شريط الحالة ---------- */}
      <header className="l32-card l32-card-flat overflow-hidden">
        <div className="bg-[linear-gradient(120deg,#312a8f_0%,#0e7490_55%,#22d3ee_100%)] px-4 py-3 text-white">
          <h2 className="l32-h text-lg font-black leading-snug text-white">
            <Rich text="🧪 اختبار الدرس 32 — تيّار المدة" />
          </h2>
          <p className="mt-0.5 text-xs font-bold text-[#e2f6ff]">
            <Rich text={`20 سؤالًا جديدًا · ${TEST_32_LEVEL_COUNTS.basic} Basic · ${TEST_32_LEVEL_COUNTS.medium} Medium · ${TEST_32_LEVEL_COUNTS.advanced} Advanced · ${TEST_32_LEVEL_COUNTS.thinking} Thinking`} />
          </p>
        </div>
        <div className="space-y-2.5 p-3">
          <p className="text-xs font-bold text-[#46507f]">
            <Rich text="🔒 لا تصحيح ولا درجة قبل الإرسال — أجب ثم اضغط «إرسال الاختبار». الأسئلة مؤلَّفة للاختبار، وليست نسخًا من تمارين الشرح." />
          </p>

          {/* خريطة الأسئلة: 20 خانة ملوّنة بمستوى السؤال، تمتلئ عند الإجابة */}
          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="خريطة الأسئلة">
            {TEST_32.map((q) => {
              const done = isAnswered32(q, answers[q.n]);
              const good = submitted && resultMap[q.n];
              const bad = submitted && !resultMap[q.n];
              return (
                <a
                  key={q.n}
                  href={`#l32-q${q.n}`}
                  aria-label={`الانتقال إلى السؤال ${q.n}${done ? " (مُجاب)" : " (بلا إجابة)"}`}
                  className={`l32-tier l32-tier-${q.level} l32-map-dot font-en h-8 w-8 justify-center text-xs font-black ${done ? "" : "opacity-45"} ${bad ? "ring-2 ring-[#b91c1c]" : good ? "ring-2 ring-[#15803d]" : ""} ${FOCUS32}`}
                >
                  {q.n}
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="l32-chip l32-chip-aqua"><Rich text={`أجبت: ${answeredCount}/20`} /></span>
            <div className="l32-progress-track h-2.5 w-28 overflow-hidden rounded-full sm:w-44" role="progressbar"
              aria-label="عدد الأسئلة التي أجبت عنها" aria-valuemin={0} aria-valuemax={20} aria-valuenow={answeredCount}>
              <div className="l32-progress-fill h-full rounded-full transition-all" style={{ width: `${answeredPct}%` }} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={submit} className={`l32-tap l32-tap-primary ${FOCUS32}`}>
                📤 <Rich text="إرسال الاختبار" />
              </button>
              <button type="button" onClick={reset} className={`l32-tap l32-tap-soft ${FOCUS32}`}>
                ↺ <Rich text="إعادة الاختبار كاملًا" />
              </button>
            </div>
            {submitMsg && !submitted && (
              <p role="alert" className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900">
                <Rich text={submitMsg} />
              </p>
            )}
            {submitted && (
              <span className="l32-chip l32-chip-indigo"><Rich text={`✓ أُرسل — ${score}/20`} /></span>
            )}
          </div>
        </div>
      </header>

      {/* ---------- النتيجة (بعد الإرسال فقط) ---------- */}
      {submitted && (
        <section role="status" aria-live="polite" className="l32-card l32-card-indigo">
          <p className="l32-h text-lg font-black text-[#312a8f]">
            <Rich text={`${band(score).emoji} الدرجة: ${score} من 20 — ${band(score).title}`} />
          </p>
          <p className="mt-1 text-sm font-bold text-[#3c4670]"><Rich text={band(score).text} /></p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LEVELS.map((lv) => {
              const qs = TEST_32.filter((q) => q.level === lv);
              const good = qs.filter((q) => resultMap[q.n]).length;
              return (
                <div key={lv} className={`l32-tier l32-tier-${lv} l32-tier-card`}>
                  <span dir="ltr" className="font-en text-[11px] font-black uppercase tracking-wider">
                    <En>{`${LEVEL_LABEL_32[lv]} · ${LEVEL_AR[lv]}`}</En>
                  </span>
                  <span className="font-en text-lg font-black">{good}<span className="text-xs opacity-70">/{qs.length}</span></span>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={onShowSolutions} className={`l32-tap mt-3 ${FOCUS32}`}>
            🔑 <Rich text="انتقل إلى حلول الاختبار" />
          </button>
        </section>
      )}

      {/* ---------- الأسئلة حسب المستوى ---------- */}
      {LEVELS.map((lv) => (
        <section key={lv} aria-labelledby={`l32-level-${lv}`} className="space-y-2.5">
          <h3 id={`l32-level-${lv}`} className={`l32-tier l32-tier-${lv} l32-tier-lg`}>
            <span dir="ltr"><En>{LEVEL_LABEL_32[lv]}</En></span>
            <span aria-hidden>·</span>
            <Rich text={`${LEVEL_AR[lv]} — ${TEST_32_LEVEL_COUNTS[lv]} أسئلة`} />
          </h3>
          {TEST_32.filter((q) => q.level === lv).map((q) => (
            <QuestionCard
              key={q.n}
              q={q}
              value={answers[q.n]}
              onChange={(v) => set(q.n, v)}
              submitted={submitted}
              correct={resultMap[q.n]}
            />
          ))}
        </section>
      ))}

      {/* ---------- تذكير الإرسال ---------- */}
      <div className="l32-card flex flex-wrap items-center gap-2">
        {!submitted ? (
          <button type="button" onClick={submit} className={`l32-tap l32-tap-primary ${FOCUS32}`}>
            📤 <Rich text="إرسال الاختبار" />
          </button>
        ) : (
          <span className="l32-chip l32-chip-ok"><Rich text="✓ تم الإرسال — الحالة ظاهرة فوق كل سؤال." /></span>
        )}
        <span className="text-xs font-bold text-[#5b6697]">
          <Rich text="«إعادة الاختبار كاملًا» تمسح الإجابات والدرجة وتقفل الحلول من جديد." />
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// بطاقة السؤال — تحمل الأنواع السبعة
// ---------------------------------------------------------------
function QuestionCard({ q, value, onChange, submitted, correct }: {
  q: TestQ32; value: Ans | undefined; onChange: (v: Ans) => void; submitted: boolean; correct?: boolean;
}) {
  const id = `l32-q${q.n}`;
  const answered = isAnswered32(q, value);
  const verdict = submitted ? (correct ? "correct" : "wrong") : undefined;
  const status: ReactNode = submitted ? (
    <span className={`l32-chip ${correct ? "l32-chip-ok" : "l32-chip-err"}`}>
      {correct ? "✓ صحيح" : "✕ غير صحيح"}
    </span>
  ) : null;

  return (
    <article
      id={id}
      data-test-q={q.n}
      data-test-type={q.type}
      data-answered={answered ? "true" : undefined}
      data-verdict={verdict}
      className="l32-q space-y-2"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-en grid h-8 min-w-8 place-items-center rounded-xl bg-[#131b3f] px-2 text-sm font-black text-white">{q.n}</span>
        <span className="l32-chip"><Rich text={`${TYPE_ICON[q.type]} ${TYPE_LABEL[q.type]}`} /></span>
        <span className={`l32-tier l32-tier-${q.level}`}><Rich text={LEVEL_AR[q.level]} /></span>
        <span className="l32-chip l32-chip-aqua"><Rich text={`🎯 ${q.skill}`} /></span>
        {status}
      </div>

      <p className="l32-h text-base font-black leading-relaxed text-[#131b3f]"><Rich text={q.ar} /></p>
      {"en" in q && q.en && (
        <p dir="ltr" className="ltr-row font-en text-base font-bold text-[#0b5f77]"><En>{q.en}</En></p>
      )}

      <Control q={q} value={value} onChange={onChange} id={id} disabled={submitted} correct={correct} submitted={submitted} />

      {/* شرح المنصة — يظهر بعد الإرسال فقط */}
      {submitted && (
        <div className={`mt-1 rounded-2xl border p-2.5 text-sm ${correct ? "border-[#b6e0c4] bg-[#eaf7ee]" : "border-[#f0d99b] bg-[#fff7e2]"}`}>
          <p className="mb-1 flex flex-wrap items-center gap-1.5">
            <PlatformTag />
            <span dir="rtl" className="l32-h text-xs font-black"><Rich text={correct ? "تثبيت المفهوم" : "شرح التصحيح"} /></span>
          </p>
          <p className="font-semibold text-[#3c4670]"><Rich text={q.why} /></p>
          {q.trap && <p className="mt-1 text-xs font-bold text-[#a32a4c]"><Rich text={`⚠️ الفخ: ${q.trap}`} /></p>}
        </div>
      )}
    </article>
  );
}

/** حالة خيار بعد الإرسال: صحيح / خاطئ / مختار بلا تلوين */
function optState(picked: boolean, isRight: boolean | undefined, submitted: boolean): string | undefined {
  if (!submitted) return picked ? "picked" : undefined;
  if (isRight) return "right";
  if (picked) return "wrong";
  return undefined;
}

function Control({ q, value, onChange, id, disabled, correct, submitted }: {
  q: TestQ32; value: Ans | undefined; onChange: (v: Ans) => void; id: string; disabled: boolean; correct?: boolean; submitted: boolean;
}) {
  switch (q.type) {
    case "single":
      return (
        <fieldset className="space-y-2" disabled={disabled}>
          <legend className="sr-only"><Rich text="اختر إجابة واحدة" /></legend>
          {q.opts.map((o, i) => (
            <label key={`${q.n}-${i}`} data-state={optState(value === i, i === q.answer, submitted)} className={`l32-opt ${FOCUS32}`}>
              <input type="radio" name={`${id}-r`} checked={value === i} onChange={() => onChange(i)} className="h-4 w-4 shrink-0 accent-[#4338ca]" />
              <span dir="ltr" className="font-en text-base font-bold"><En>{o}</En></span>
            </label>
          ))}
        </fieldset>
      );
    case "tf":
      return (
        <fieldset className="flex flex-wrap gap-2" disabled={disabled}>
          <legend className="sr-only"><Rich text="صح أم خطأ" /></legend>
          {[true, false].map((v) => (
            <label key={`${q.n}-${String(v)}`} data-state={optState(value === v, v === q.answer, submitted)} className={`l32-opt l32-opt-inline text-sm font-black ${FOCUS32}`}>
              <input type="radio" name={`${id}-tf`} checked={value === v} onChange={() => onChange(v)} className="accent-[#4338ca]" />
              {v ? "صحيح (True)" : "خطأ (False)"}
            </label>
          ))}
        </fieldset>
      );
    case "multi": {
      const cur = (value as number[] | undefined) ?? [];
      const rights = q.answer;
      return (
        <fieldset className="space-y-2" disabled={disabled}>
          <legend className="text-xs font-black text-[#5b6697]"><Rich text="اختر كل الإجابات الصحيحة" /></legend>
          {q.opts.map((o, i) => (
            <label key={`${q.n}-${i}`} data-state={optState(cur.includes(i), rights.includes(i), submitted)} className={`l32-opt ${FOCUS32}`}>
              <input type="checkbox" checked={cur.includes(i)} onChange={() => onChange(cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i])} className="h-4 w-4 shrink-0 accent-[#4338ca]" />
              <span dir="ltr" className="font-en text-base font-bold"><En>{o}</En></span>
            </label>
          ))}
        </fieldset>
      );
    }
    case "order": {
      const cur = (value as string[] | undefined) ?? [];
      const rest = q.items.filter((it) => !cur.includes(it));
      return (
        <div className="space-y-2" dir="ltr" data-keynav-lock="1">
          <p dir="rtl" className="text-xs font-black text-[#5b6697]"><Rich text="اضغط العبارات بالترتيب الصحيح (من الأول إلى الأخير)" /></p>
          <div className="flex min-h-[2.9rem] flex-wrap gap-1.5 rounded-2xl border-2 border-dashed border-[#a9dcea] bg-[#f6fcfe] p-2" aria-live="polite" aria-label="الترتيب الحالي">
            {cur.length === 0 && <span dir="rtl" className="text-xs font-bold text-[#5b6697]"><Rich text="لم تُرتَّب بعد" /></span>}
            {cur.map((it, i) => (
              <span key={`${q.n}-placed-${i}`} className={`font-en rounded-xl px-2.5 py-1 text-sm font-black text-white ${submitted && it === q.answer[i] ? "bg-[#15803d]" : submitted ? "bg-[#b91c1c]" : "bg-[#0e7490]"}`}>
                {i + 1}. {it}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {rest.map((it) => (
              <button key={`${q.n}-rest-${it}`} type="button" disabled={disabled} onClick={() => onChange([...cur, it])}
                className={`l32-tap l32-tap-bare font-en text-sm ${FOCUS32}`}>{it}</button>
            ))}
            {cur.length > 0 && !disabled && (
              <button type="button" onClick={() => onChange(cur.slice(0, -1))} className={`l32-tap l32-tap-soft text-xs ${FOCUS32}`}>
                <Rich text="↺ تراجع خطوة" />
              </button>
            )}
            {cur.length > 0 && !disabled && (
              <button type="button" onClick={() => onChange([])} className={`l32-tap l32-tap-quiet text-xs ${FOCUS32}`}>
                <Rich text="✕ مسح الترتيب" />
              </button>
            )}
          </div>
        </div>
      );
    }
    case "match": {
      const cur = (value as (number | null)[] | undefined) ?? q.left.map(() => null);
      return (
        <div className="space-y-2" data-keynav-lock="1">
          <p className="text-xs font-black text-[#5b6697]"><Rich text="اختر المقابل الصحيح لكل جملة" /></p>
          {q.left.map((l, li) => {
            const good = submitted && cur[li] === q.answer[li];
            return (
              <div key={`${q.n}-m${li}`} className="flex flex-wrap items-center gap-2">
                <span dir="ltr" className={`font-en min-w-[11rem] flex-1 rounded-xl border px-2.5 py-1.5 text-sm font-bold ${submitted ? (good ? "border-[#b6e0c4] bg-[#eaf7ee] text-[#14532d]" : "border-[#f2bcbc] bg-[#fdecec] text-[#7f1414]") : "border-[#d6ddf2] bg-[#f8faff] text-[#0b5f77]"}`}>
                  <En>{l}</En>
                </span>
                <label className="sr-only" htmlFor={`${id}-m${li}`}>اختر المقابل للجملة: {l}</label>
                <select id={`${id}-m${li}`} dir="ltr" disabled={disabled} value={cur[li] ?? ""}
                  onChange={(e) => { const next = [...cur]; next[li] = e.target.value === "" ? null : Number(e.target.value); onChange(next); }}
                  className={`font-en min-w-[11rem] flex-1 rounded-xl border-2 border-[#d6ddf2] bg-white px-2 py-1.5 text-sm font-bold text-[#131b3f] ${FOCUS32}`}>
                  <option value="">— اختر —</option>
                  {q.right.map((r, ri) => <option key={`${q.n}-r${ri}`} value={ri}>{r}</option>)}
                </select>
              </div>
            );
          })}
        </div>
      );
    }
    case "spot": {
      const cur = (value as { seg: number | null } | undefined) ?? { seg: null };
      return (
        <fieldset className="space-y-2" disabled={disabled}>
          <legend className="text-xs font-black text-[#5b6697]"><Rich text="اضغط الكلمة الخاطئة في الجملة" /></legend>
          <div dir="ltr" className="flex flex-wrap gap-1.5" data-keynav-lock="1">
            {q.segments.map((s, i) => {
              const picked = cur.seg === i;
              const state = optState(picked, i === q.answer, submitted);
              return (
                <label key={`${q.n}-s${i}`} data-state={state} className={`l32-opt l32-opt-inline font-en text-sm font-bold ${FOCUS32}`}>
                  <input type="radio" name={`${id}-spot`} className="sr-only" checked={picked} onChange={() => onChange({ seg: i })} />
                  {s}
                </label>
              );
            })}
          </div>
          {submitted && <p className="text-xs font-black text-[#0b5f77]"><Rich text={`التصحيح: ${q.fix}`} /></p>}
        </fieldset>
      );
    }
    case "typed":
      return (
        <div className="space-y-1.5" data-keynav-lock="1">
          <label htmlFor={`${id}-t`} className="text-xs font-black text-[#46507f]"><Rich text="اكتب الجواب بالإنجليزية:" /></label>
          <input id={`${id}-t`} dir="ltr" disabled={disabled} value={(value as string | undefined) ?? ""} onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer…"
            className={`font-en w-full rounded-xl border-2 bg-white px-3 py-2 text-base font-bold text-[#131b3f] outline-none ${submitted ? (correct ? "border-[#b6e0c4] bg-[#eaf7ee]" : "border-[#f2bcbc] bg-[#fdecec]") : "border-[#d6ddf2] focus:border-[#0e7490]"} ${FOCUS32}`} />
          {submitted && (
            <p className="text-xs font-black text-[#0b5f77]">
              <Rich text={`الإجابة المقبولة: ${q.accept[0]}`} />
            </p>
          )}
        </div>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------
// حلول الاختبار — 20 حلًا في 4 مجموعات، مقفلة قبل الاستحقاق
// ---------------------------------------------------------------
export function Solutions32({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest: () => void; onGoTeacher: () => void }) {
  if (!unlocked) {
    return (
      <div className="l32-card space-y-3" role="region" aria-label="حلول الاختبار مقفلة">
        <p className="l32-h text-lg font-black text-[#312a8f]"><Rich text="🔒 الحلول مقفلة" /></p>
        <p className="text-sm font-bold text-[#46507f]">
          <Rich text="تُفتح بعد إرسال الاختبار — لا تظهر أي إجابة أو شرح قبل المحاولة. (أو ادخل من منطقة المعلم.)" />
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onGoTest} className={`l32-tap l32-tap-primary ${FOCUS32}`}>← <Rich text="الذهاب إلى الاختبار" /></button>
          <button type="button" onClick={onGoTeacher} className={`l32-tap l32-tap-soft ${FOCUS32}`}>👩‍🏫 <Rich text="منطقة المعلم" /></button>
        </div>
      </div>
    );
  }
  const groups = [0, 1, 2, 3].map((g) => TEST_32_SOLUTIONS.slice(g * 5, g * 5 + 5));
  return (
    <div className="space-y-3" data-area="l32-solutions-body">
      <header className="l32-card l32-card-indigo space-y-2">
        <h2 className="l32-h text-lg font-black text-[#312a8f]"><Rich text="🔑 حلول الاختبار (20 سؤالًا)" /></h2>
        <p className="text-sm font-bold text-[#3c4670]">
          <Rich text="أربع مجموعات من خمسة أسئلة. كل حل يشمل الإجابة والمهارة ومرجعها في الدرس وشرح المنصة والفخّ المتوقع." />
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <SourceBadge32 src={false} />
          <span className="l32-chip l32-chip-aqua"><Rich text="شرح المنصة — لا نص منقول من المصدر" /></span>
        </div>
      </header>
      {groups.map((grp, gi) => (
        <section key={gi} aria-labelledby={`l32-sol-g${gi}`} className="space-y-2">
          <h3 id={`l32-sol-g${gi}`} className="l32-chip l32-chip-indigo l32-chip-lg">
            <Rich text={`المجموعة ${gi + 1}: الأسئلة ${grp[0].n}–${grp[grp.length - 1].n}`} />
          </h3>
          {grp.map((s) => (
            <article key={s.n} className="l32-q space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-en grid h-7 min-w-7 place-items-center rounded-lg bg-[#0e7490] px-1.5 text-xs font-black text-white">{s.n}</span>
                <span className={`l32-tier l32-tier-${s.level}`}><En>{LEVEL_LABEL_32[s.level]}</En></span>
                <span className="l32-chip"><Rich text={`${TYPE_ICON[s.type]} ${TYPE_LABEL[s.type]}`} /></span>
                <span className="l32-chip l32-chip-aqua"><Rich text={`🎯 ${s.skill}`} /></span>
                <span className="l32-chip l32-chip-gold"><Rich text={s.ref} /></span>
              </div>
              <p className="text-sm font-black text-[#131b3f]"><Rich text={`الإجابة: ${s.answer}`} /></p>
              <p className="text-sm font-semibold text-[#3c4670]"><PlatformTag /> <Rich text={s.why} /></p>
              {s.trap && <p className="text-xs font-bold text-[#a32a4c]"><Rich text={`⚠️ الفخ: ${s.trap}`} /></p>}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
