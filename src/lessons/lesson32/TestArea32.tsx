import { TeachingDetails } from "../../shared/TeacherWorkspace";
// ============================================================
// منطقة الاختبار والحلول — الدرس 32
// • 20 سؤالًا جديدًا: 6 Basic · 7 Medium · 4 Advanced · 3 Thinking
// • محايدة قبل الإرسال: لا ✓/✕ ولا درجة ولا تلميح
// • بعد الإرسال: الدرجة + الحالة لكل سؤال + فتح منطقة الحلول
// • إعادة كاملة: تمسح كل الإجابات والدرجة وقفل الحلول
// ============================================================

import { useMemo, useState, type ReactNode } from "react";
import { PlatformTag, Rich, En } from "../../shared/lessonKit";
import { TEST_32, TEST_32_LEVEL_COUNTS, LEVEL_LABEL_32, TEST_32_SOLUTIONS, normalizeTyped32, type TestLevel32, type TestQ32 } from "./testData";
import { FOCUS32 } from "./kit32";

const TYPE_LABEL: Record<TestQ32["type"], string> = {
  single: "اختيار واحد",
  tf: "صح / خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "مطابقة",
  spot: "حدّد الخطأ",
  typed: "كتابة",
};

const LEVEL_CLASS: Record<TestLevel32, string> = {
  basic: "bg-emerald-100 text-emerald-900 border-emerald-300",
  medium: "bg-amber-100 text-amber-900 border-amber-300",
  advanced: "bg-sky-100 text-sky-900 border-sky-300",
  thinking: "bg-rose-100 text-rose-900 border-rose-300",
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

function band(score: number): { title: string; text: string } {
  if (score >= 18) return { title: "أداء متمكّن", text: "تقريبًا كل الأدوات حاضرة. راجع ما أخطأت فيه فقط في الحلول." };
  if (score >= 14) return { title: "أداء جيد", text: "الأساس ثابت. راجع الأسئلة المتقدمة والتفكير في الحلول." };
  if (score >= 8) return { title: "أداء متوسط", text: "راجع الخطوات ⑦ و⑪ و⑮ ثم أعد الاختبار." };
  return { title: "يحتاج دعمًا", text: "ارجع إلى الخطوات ①–⑥ (البناء، for/since) قبل أي محاولة جديدة." };
}

export default function TestArea32({ onCheckedChange, onShowSolutions }: { onCheckedChange: (checked: boolean) => void; onShowSolutions: () => void }) {
  const [answers, setAnswers] = useState<Record<number, Ans>>({});
  const [submitted, setSubmitted] = useState(false);
  const [resultMap, setResultMap] = useState<Record<number, boolean>>({});
  const [key, setKey] = useState(0);

  const score = useMemo(() => Object.values(resultMap).filter(Boolean).length, [resultMap]);
  const answeredCount = TEST_32.filter((q) => isAnswered32(q, answers[q.n])).length;

  const set = (n: number, v: Ans) => setAnswers((a) => ({ ...a, [n]: v }));
  const submit = () => {
    const map: Record<number, boolean> = {};
    TEST_32.forEach((q) => { map[q.n] = gradeOne32(q, answers[q.n]); });
    setResultMap(map);
    setSubmitted(true);
    onCheckedChange(true);
  };
  const reset = () => {
    setAnswers({});
    setResultMap({});
    setSubmitted(false);
    onCheckedChange(false);
    setKey((k) => k + 1);
  };

  return (
    <div key={key} data-area="l32-test-body" className="space-y-4">
      <header className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
        <h2 className="font-head text-xl font-black text-slate-900"><Rich text="🧪 اختبار الدرس 32" /></h2>
        <p className="mt-1 text-sm font-bold text-slate-600">
          <Rich text={`20 سؤالًا جديدًا — ${TEST_32_LEVEL_COUNTS.basic} Basic · ${TEST_32_LEVEL_COUNTS.medium} Medium · ${TEST_32_LEVEL_COUNTS.advanced} Advanced · ${TEST_32_LEVEL_COUNTS.thinking} Thinking.`} />
        </p>
        <p className="mt-1 text-xs font-bold text-slate-500"><Rich text="الإجابات لا تُصحَّح ولا تظهر حالتها إلا بعد الإرسال." /></p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700"><Rich text={`أجبت: ${answeredCount}/20`} /></span>
          {!submitted ? (
            <button type="button" onClick={submit} className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800 ${FOCUS32}`}>
              📤 <Rich text="تحقق من الإجابات — إرسال الاختبار" />
            </button>
          ) : (
            <span className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-black text-white"><Rich text={`✓ أُرسل — الدرجة ${score}/20`} /></span>
          )}
          <button type="button" onClick={reset} className={`rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50 ${FOCUS32}`}>
            ↺ <Rich text="إعادة الاختبار كاملًا" />
          </button>
        </div>
      </header>

      {submitted && (
        <section role="status" aria-live="polite" className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-4">
          <p className="text-lg font-black text-emerald-950"><Rich text={`الدرجة: ${score} من 20 — ${band(score).title}`} /></p>
          <p className="mt-1 text-sm font-bold text-slate-700"><Rich text={band(score).text} /></p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(["basic", "medium", "advanced", "thinking"] as TestLevel32[]).map((lv) => {
              const qs = TEST_32.filter((q) => q.level === lv);
              const ok = qs.filter((q) => resultMap[q.n]).length;
              return (
                <div key={lv} className="rounded-2xl border-2 border-white bg-white p-2 text-center">
                  <div className="text-xs font-black text-slate-500">{LEVEL_LABEL_32[lv]}</div>
                  <div className="font-en text-lg font-black text-slate-900">{ok}/{qs.length}</div>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={onShowSolutions} className={`mt-3 rounded-xl bg-slate-900 px-4 py-2 text-sm font-black text-white hover:bg-slate-700 ${FOCUS32}`}>
            🔑 <Rich text="انتقل إلى حلول الاختبار" />
          </button>
        </section>
      )}

      {(["basic", "medium", "advanced", "thinking"] as TestLevel32[]).map((lv) => (
        <section key={lv} aria-labelledby={`l32-level-${lv}`} className="space-y-3">
          <h3 id={`l32-level-${lv}`} className={`inline-block rounded-xl border-2 px-3 py-1 text-sm font-black ${LEVEL_CLASS[lv]}`}>
            <Rich text={`${LEVEL_LABEL_32[lv]} · ${TEST_32_LEVEL_COUNTS[lv]} أسئلة`} />
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

      <div className="flex flex-wrap items-center gap-2 rounded-3xl border-2 border-slate-200 bg-white p-4">
        {!submitted ? (
          <button type="button" onClick={submit} className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white hover:bg-emerald-800 ${FOCUS32}`}>📤 <Rich text="تحقق من الإجابات — إرسال الاختبار" /></button>
        ) : (
          <div role="status" className="text-sm font-black text-emerald-800"><Rich text={`✓ تم الإرسال — الدرجة ${score}/20`} /><button type="button" onClick={reset} className={`ms-3 rounded-xl border-2 p-2 ${FOCUS32}`}>إعادة الاختبار</button></div>
        )}
        <span className="text-xs font-bold text-slate-500"><Rich text="«إعادة الاختبار كاملًا» تمسح الإجابات والدرجة وتقفل الحلول من جديد." /></span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------
// بطاقة السؤال — تحمل كل الأنواع السبعة
// ---------------------------------------------------------------
function QuestionCard({ q, value, onChange, submitted, correct }: {
  q: TestQ32; value: Ans | undefined; onChange: (v: Ans) => void; submitted: boolean; correct?: boolean;
}) {
  const id = `l32-q${q.n}`;
  const status: ReactNode = submitted ? (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-black ${correct ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
      {correct ? "✓ صحيح" : "✕ غير صحيح"}
    </span>
  ) : null;

  return (
    <article id={id} data-test-q={q.n} data-test-type={q.type} className={`rounded-3xl border-2 bg-white p-4 ${submitted ? (correct ? "border-emerald-300" : "border-rose-200") : "border-slate-200"}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-head grid h-8 min-w-8 place-items-center rounded-xl bg-slate-900 px-2 text-sm font-black text-white">{q.n}</span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700"><Rich text={TYPE_LABEL[q.type]} /></span>
        {status}
      </div>
      <p className="mt-2 text-base font-bold leading-relaxed text-slate-900"><Rich text={q.ar} /></p>
      {"en" in q && q.en && <p dir="ltr" className="ltr-row mt-1 font-en text-base font-bold text-slate-800"><En>{q.en}</En></p>}
      <div className="mt-3">
        <Control q={q} value={value} onChange={onChange} id={id} disabled={submitted} />
      </div>
    </article>
  );
}

function Control({ q, value, onChange, id, disabled }: { q: TestQ32; value: Ans | undefined; onChange: (v: Ans) => void; id: string; disabled: boolean }) {
  switch (q.type) {
    case "single":
      return (
        <fieldset className="space-y-2" disabled={disabled}>
          <legend className="sr-only">اختر الإجابة</legend>
          {q.opts.map((o, i) => (
            <label key={i} className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2 text-start ${value === i ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"} has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-400`}>
              <input type="radio" name={`${id}-r`} checked={value === i} onChange={() => onChange(i)} className="h-4 w-4 accent-emerald-700" />
              <En className="text-base font-bold text-slate-800">{o}</En>
            </label>
          ))}
        </fieldset>
      );
    case "tf":
      return (
        <fieldset className="flex flex-wrap gap-2" disabled={disabled}>
          <legend className="sr-only">صح أم خطأ</legend>
          {[true, false].map((v) => (
            <label key={String(v)} className={`cursor-pointer rounded-xl border-2 px-4 py-2 text-sm font-black ${value === v ? "border-emerald-600 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"} has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-400`}>
              <input type="radio" name={`${id}-tf`} checked={value === v} onChange={() => onChange(v)} className="me-2 accent-emerald-700" />
              {v ? "صحيح (True)" : "خطأ (False)"}
            </label>
          ))}
        </fieldset>
      );
    case "multi": {
      const cur = (value as number[] | undefined) ?? [];
      return (
        <fieldset className="space-y-2" disabled={disabled}>
          <legend className="text-xs font-black text-slate-500"><Rich text="اختر كل الإجابات الصحيحة" /></legend>
          {q.opts.map((o, i) => (
            <label key={i} className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 px-3 py-2 ${cur.includes(i) ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white hover:border-emerald-300"} has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-400`}>
              <input type="checkbox" checked={cur.includes(i)} onChange={() => onChange(cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i])} className="h-4 w-4 accent-emerald-700" />
              <En className="text-base font-bold text-slate-800">{o}</En>
            </label>
          ))}
        </fieldset>
      );
    }
    case "order": {
      const cur = (value as string[] | undefined) ?? [];
      const rest = q.items.filter((it) => !cur.includes(it));
      return (
        <div className="space-y-2" dir="ltr">
          <p className="text-xs font-black text-slate-500"><Rich text="اضغط العبارات بالترتيب الصحيح (من الأول إلى الأخير)" /></p>
          <div className="flex min-h-[2.75rem] flex-wrap gap-1.5 rounded-xl border-2 border-dashed border-emerald-300 bg-white p-2" aria-live="polite" aria-label="الترتيب الحالي">
            {cur.length === 0 && <span className="text-xs font-bold text-slate-400"><Rich text="لم تُرتَّب بعد" /></span>}
            {cur.map((it, i) => (
              <span key={it} className="font-en rounded-lg bg-emerald-600 px-2 py-1 text-sm font-bold text-white">{i + 1}. {it}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {rest.map((it) => (
              <button key={it} type="button" disabled={disabled} onClick={() => onChange([...cur, it])}
                className={`font-en rounded-lg border-2 border-slate-300 bg-white px-2.5 py-1.5 text-sm font-bold text-slate-800 hover:border-emerald-400 disabled:opacity-50 ${FOCUS32}`}>{it}</button>
            ))}
            {cur.length > 0 && !disabled && (
              <button type="button" onClick={() => onChange([])} className={`rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-black text-slate-600 ${FOCUS32}`}><Rich text="↺ مسح الترتيب" /></button>
            )}
          </div>
        </div>
      );
    }
    case "match": {
      const cur = (value as (number | null)[] | undefined) ?? q.left.map(() => null);
      return (
        <div className="space-y-2">
          {q.left.map((l, li) => (
            <div key={li} className="flex flex-wrap items-center gap-2">
              <En className="min-w-[10rem] rounded-lg bg-slate-50 px-2 py-1 text-sm font-bold text-slate-800">{l}</En>
              <label className="sr-only" htmlFor={`${id}-m${li}`}>اختر الجملة المقابلة لـ {l}</label>
              <select id={`${id}-m${li}`} dir="ltr" disabled={disabled} value={cur[li] ?? ""}
                onChange={(e) => { const next = [...cur]; next[li] = e.target.value === "" ? null : Number(e.target.value); onChange(next); }}
                className={`font-en min-w-0 flex-1 rounded-xl border-2 border-slate-300 bg-white px-2 py-1.5 text-sm font-bold text-slate-800 ${FOCUS32}`}>
                <option value="">— اختر —</option>
                {q.right.map((r, ri) => <option key={ri} value={ri}>{r}</option>)}
              </select>
            </div>
          ))}
        </div>
      );
    }
    case "spot": {
      const cur = (value as { seg: number | null } | undefined) ?? { seg: null };
      return (
        <fieldset className="space-y-2" disabled={disabled}>
          <legend className="text-xs font-black text-slate-500"><Rich text="اختر الكلمة الخاطئة من الجملة" /></legend>
          <div dir="ltr" className="flex flex-wrap gap-1.5">
            {q.segments.map((s, i) => (
              <label key={i} className={`font-en cursor-pointer rounded-lg border-2 px-2.5 py-1.5 text-sm font-bold ${cur.seg === i ? "border-rose-500 bg-rose-50 text-rose-900" : "border-slate-200 bg-white text-slate-800 hover:border-rose-300"} has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-400`}>
                <input type="radio" name={`${id}-spot`} className="sr-only" checked={cur.seg === i} onChange={() => onChange({ seg: i })} />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
      );
    }
    case "typed":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={`${id}-t`} className="text-xs font-black text-slate-600"><Rich text="اكتب الجواب بالإنجليزية:" /></label>
          <input id={`${id}-t`} dir="ltr" disabled={disabled} value={(value as string | undefined) ?? ""} onChange={(e) => onChange(e.target.value)}
            className="font-en min-w-0 flex-1 rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-base font-bold outline-none focus:border-emerald-500" />
        </div>
      );
    default:
      return null;
  }
}

// ---------------------------------------------------------------
// حلول الاختبار — 20 حلًا مجمّعة كل 5، مقفلة قبل الإرسال
// ---------------------------------------------------------------
export function Solutions32({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest: () => void; onGoTeacher: () => void }) {
  if (!unlocked) {
    return (
      <div className="space-y-3 rounded-3xl border-2 border-slate-300 bg-white p-5" role="region" aria-label="حلول الاختبار مقفلة">
        <p className="text-lg font-black text-slate-900"><Rich text="🔒 الحلول مقفلة" /></p>
        <p className="text-sm font-bold text-slate-600"><Rich text="تُفتح بعد إرسال الاختبار. (لا تظهر الإجابات قبل المحاولة.)" /></p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onGoTest} className={`rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white ${FOCUS32}`}>← <Rich text="الذهاب إلى الاختبار" /></button>
          <button type="button" onClick={onGoTeacher} className={`rounded-xl border-2 border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700 ${FOCUS32}`}><Rich text="منطقة المعلم" /></button>
        </div>
      </div>
    );
  }
  const groups = [0, 1, 2, 3].map((g) => TEST_32_SOLUTIONS.slice(g * 5, g * 5 + 5));
  return (
    <div className="space-y-4" data-area="l32-solutions-body">
      <header className="rounded-3xl border-2 border-emerald-200 bg-white p-4">
        <h2 className="font-head text-xl font-black text-slate-900"><Rich text="🔑 حلول الاختبار (20)" /></h2>
        <p className="mt-1 text-sm font-bold text-slate-600"><Rich text="مجمّعة كل 5 أسئلة. كل حل يشمل الإجابة والسبب والفخّ المحتمل." /></p>
      </header>
      {groups.map((grp, gi) => (
        <section key={gi} aria-labelledby={`l32-sol-g${gi}`} className="space-y-2">
          <h3 id={`l32-sol-g${gi}`} className="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-black text-white">
            <Rich text={`المجموعة ${gi + 1}: الأسئلة ${grp[0].n}–${grp[grp.length - 1].n}`} />
          </h3>
          {grp.map((s) => (
            <article key={s.n} className="rounded-2xl border-2 border-slate-200 bg-white p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-head grid h-7 min-w-7 place-items-center rounded-lg bg-emerald-700 px-1.5 text-xs font-black text-white">{s.n}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[11px] font-black ${LEVEL_CLASS[s.level]}`}><Rich text={LEVEL_LABEL_32[s.level]} /></span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-700"><Rich text={TYPE_LABEL[s.type]} /></span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-900"><Rich text={`الإجابة: ${s.answer}`} /></p>
              <TeachingDetails><p className="mt-1 text-sm font-semibold text-slate-700"><PlatformTag /> <Rich text={s.why} /></p></TeachingDetails>
              {s.trap && <p className="mt-1 text-xs font-semibold text-rose-800"><Rich text={`⚠️ الفخ: ${s.trap}`} /></p>}
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}

