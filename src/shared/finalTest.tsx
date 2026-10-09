// ============================================================
// الاختبار النهائي لكل درس — Final Test (النظام الأصلي، مُعاد بناؤه كطبقة مشتركة)
//
// المرجع التاريخي: shared/FinalQuiz.tsx (الدروس 1–26) — اختبار من 12–15 سؤالًا
// في نهاية الدرس، لا يكشف أي حالة صحيحة/خاطئة أثناء الحل، ثم زر تصحيح واحد
// في النهاية، مع مفتاح إجابات محمي بكلمة مرور المعلم (somer173).
//
// هذه النسخة توسّع المرجع نفسه دون تغيير سلوكه الأساسي:
//   • أنواع أسئلة حقيقية: اختيار من متعدد · صح/خطأ · اختيار متعدد · ترتيب ·
//     توصيل · اكتشاف الخطأ · إجابة مكتوبة قصيرة (تُقيَّم تقييمًا موثوقًا).
//   • الحالة كلها في المكوّن الأب (answers + corrected) ⇒ إعادة الاختبار
//     تمسح كل شيء: الاختيارات، الترتيب، التوصيل، الكتابة، النتيجة، والتغذية الراجعة.
//   • كل التغذية الراجعة (صح/خطأ، الإجابة الصحيحة، الشرح، النتيجة) مربوطة
//     بـ corrected وحدها — لا كشف قبل زر «تصحيح الاختبار».
//   • لا اعتماد على اللون وحده: كل حالة مصحوبة بـ ✓ / ✕ ونص.
//   • مفتاح المعلم يعرض: رقم السؤال، الإجابة الصحيحة، السبب، مفهوم الدرس،
//     والفخ الشائع — لا مجرد قائمة حروف.
// ============================================================

import { useMemo, useState, type ReactNode } from "react";
import { LatinRuns } from "./bidi";
import { En, PlatformTag } from "./lessonKit";

// ------------------------------------------------------------
// نموذج البيانات
// ------------------------------------------------------------

type FinalBase = {
  /** نص السؤال بالعربية */
  ar: string;
  /** جملة/مثال إنجليزي يُعرض داخل عازل LTR (اختياري) */
  en?: string;
  /** شرح الإجابة — يظهر بعد التصحيح فقط (ويظهر كاملًا في مفتاح المعلم) */
  why: string;
  /** المفهوم من الدرس الذي يقيسه السؤال */
  concept: string;
  /** الفخ الشائع المرتبط بالسؤال (لمفتاح المعلم) */
  trap?: string;
};

/** اختيار من متعدد: إجابة واحدة */
export type FinalSingleQ = FinalBase & { type: "single"; options: string[]; answer: number };
/** صح / خطأ */
export type FinalTfQ = FinalBase & { type: "tf"; answer: boolean };
/** اختيار متعدد: أكثر من إجابة صحيحة */
export type FinalMultiQ = FinalBase & { type: "multi"; options: string[]; answers: number[] };
/** ترتيب: items بترتيبها الصحيح، وتُعرض للطالب مخلوطةً بترتيب ثابت */
export type FinalOrderQ = FinalBase & { type: "order"; items: string[] };
/** توصيل: كل عنصر في العمود الأول يقابله عنصر واحد في العمود الثاني */
export type FinalMatchQ = FinalBase & { type: "match"; pairs: { left: string; right: string }[] };
/** اكتشاف الخطأ: الجملة مقسّمة مقاطع، والطالب يختار المقطع الخاطئ */
export type FinalErrorQ = FinalBase & { type: "error"; segments: string[]; answer: number };
/** إجابة مكتوبة قصيرة: before + [فراغ] + after، والتقييم على صيغة الفعل فقط */
export type FinalTypedQ = FinalBase & { type: "typed"; before: string; after: string; accept: string[] };

export type FinalTestQuestion =
  | FinalSingleQ
  | FinalTfQ
  | FinalMultiQ
  | FinalOrderQ
  | FinalMatchQ
  | FinalErrorQ
  | FinalTypedQ;

/** حالة إجابة الطالب لكل نوع — يحملها المكوّن الأب حتى تكون إعادة الاختبار كاملة */
export type FinalTestAnswer =
  | { kind: "single"; value: number }
  | { kind: "tf"; value: boolean }
  | { kind: "multi"; value: number[] }
  | { kind: "order"; value: number[] }
  | { kind: "match"; value: (number | null)[] }
  | { kind: "error"; value: number }
  | { kind: "typed"; value: string };

export const FINAL_TEST_TYPES: Record<FinalTestQuestion["type"], string> = {
  single: "اختيار من متعدد",
  tf: "صح أم خطأ",
  multi: "اختيار متعدد",
  order: "ترتيب",
  match: "توصيل",
  error: "اكتشاف الخطأ",
  typed: "إجابة قصيرة",
};

// ------------------------------------------------------------
// التقييم — دوال نقية قابلة للاختبار
// ------------------------------------------------------------

/** تطبيع الإجابة المكتوبة: مسافات موحّدة، بلا ترقيم طرفي، بلا حالة أحرف */
export function normalizeTyped(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["'«»“”]+|["'«»“”.!?،,؛;]+$/gu, "")
    .toLowerCase();
}

/** هل أجاب الطالب عن هذا السؤال؟ (يُستخدم للعدّاد فقط — بلا أي دلالة على الصواب) */
export function isAnswered(question: FinalTestQuestion, answer?: FinalTestAnswer): boolean {
  if (!answer) return false;
  switch (question.type) {
    case "single":
      return answer.kind === "single" && Number.isInteger(answer.value);
    case "tf":
      return answer.kind === "tf";
    case "multi":
      return answer.kind === "multi" && answer.value.length > 0;
    case "order":
      return answer.kind === "order" && answer.value.length === question.items.length;
    case "match":
      return answer.kind === "match" && answer.value.length === question.pairs.length && answer.value.every((v) => v !== null);
    case "error":
      return answer.kind === "error" && Number.isInteger(answer.value);
    case "typed":
      return answer.kind === "typed" && normalizeTyped(answer.value).length > 0;
    default:
      return false;
  }
}

/** الإجابة الصحيحة كنص جاهز للعرض (بعد التصحيح وفي مفتاح المعلم) */
export function expectedAnswerText(question: FinalTestQuestion): string {
  switch (question.type) {
    case "single":
      return question.options[question.answer] ?? "";
    case "tf":
      return question.answer ? "صحيح ✓" : "خطأ ✕";
    case "multi":
      return question.answers.map((i) => question.options[i]).join(" · ");
    case "order":
      return question.items.join(" → ");
    case "match":
      return question.pairs.map((p) => `${p.left} → ${p.right}`).join(" · ");
    case "error":
      return question.segments[question.answer] ?? "";
    case "typed":
      return question.accept[0] ?? "";
    default:
      return "";
  }
}

/** إجابة الطالب كنص جاهز للعرض (بعد التصحيح فقط) */
export function givenAnswerText(question: FinalTestQuestion, answer?: FinalTestAnswer): string {
  if (!answer) return "";
  switch (question.type) {
    case "single":
      return answer.kind === "single" ? (question.options[answer.value] ?? "") : "";
    case "tf":
      return answer.kind === "tf" ? (answer.value ? "صحيح ✓" : "خطأ ✕") : "";
    case "multi":
      return answer.kind === "multi" ? answer.value.map((i) => question.options[i]).join(" · ") : "";
    case "order":
      return answer.kind === "order" ? answer.value.map((i) => question.items[i]).join(" → ") : "";
    case "match":
      return answer.kind === "match"
        ? answer.value.map((v, i) => `${question.pairs[i].left} → ${v === null ? "—" : question.pairs[v].right}`).join(" · ")
        : "";
    case "error":
      return answer.kind === "error" ? (question.segments[answer.value] ?? "") : "";
    case "typed":
      return answer.kind === "typed" ? answer.value : "";
    default:
      return "";
  }
}

/** هل الإجابة صحيحة؟ — يُستدعى داخل التصحيح فقط */
export function isCorrect(question: FinalTestQuestion, answer?: FinalTestAnswer): boolean {
  if (!answer || !isAnswered(question, answer)) return false;
  switch (question.type) {
    case "single":
      return answer.kind === "single" && answer.value === question.answer;
    case "tf":
      return answer.kind === "tf" && answer.value === question.answer;
    case "multi": {
      if (answer.kind !== "multi") return false;
      const a = [...answer.value].sort((x, y) => x - y);
      const b = [...question.answers].sort((x, y) => x - y);
      return a.length === b.length && a.every((v, i) => v === b[i]);
    }
    case "order": {
      if (answer.kind !== "order") return false;
      return answer.value.length === question.items.length && answer.value.every((v, i) => v === i);
    }
    case "match": {
      if (answer.kind !== "match") return false;
      return answer.value.length === question.pairs.length && answer.value.every((v, i) => v === i);
    }
    case "error":
      return answer.kind === "error" && answer.value === question.answer;
    case "typed":
      return answer.kind === "typed" && question.accept.some((a) => normalizeTyped(a) === normalizeTyped(answer.value));
    default:
      return false;
  }
}

export type FinalTestResult = {
  score: number;
  total: number;
  pct: number;
  perQuestion: { correct: boolean; answered: boolean }[];
};

/** نتيجة الاختبار كاملًا — تُحسب دائمًا، ولا تُعرض إلا بعد corrected */
export function gradeFinalTest(
  questions: FinalTestQuestion[],
  answers: Record<number, FinalTestAnswer>
): FinalTestResult {
  const perQuestion = questions.map((q, i) => ({
    correct: isCorrect(q, answers[i]),
    answered: isAnswered(q, answers[i]),
  }));
  const score = perQuestion.reduce((n, r) => n + (r.correct ? 1 : 0), 0);
  const total = questions.length;
  return { score, total, pct: total ? Math.round((score / total) * 100) : 0, perQuestion };
}

/** رسالة النتيجة — لا تُعرض قبل التصحيح */
export function resultMessage(pct: number): string {
  return pct === 100
    ? "🏆 ممتاز! علامة كاملة على هذا الدرس."
    : pct >= 80
      ? "🌟 رائع جدًا! راجع السؤال أو السؤالين الخاطئين."
      : pct >= 60
        ? "👍 جيد! أعد قراءة الشرح ثم أعد الاختبار."
        : "💪 لا بأس — راجع خطوات الدرس ثم أعد الاختبار من جديد.";
}

// ------------------------------------------------------------
// عناصر مساعدة للعرض
// ------------------------------------------------------------

const ACCENT_DEFAULT = "bg-slate-900";

/** ترتيب ثابت (بلا عشوائية) يضمن ألا تُعرض عناصر السؤال بترتيبها الصحيح */
function shuffledIndexes(n: number): number[] {
  if (n <= 1) return Array.from({ length: n }, (_, i) => i);
  const shift = Math.max(1, Math.floor(n / 2));
  return Array.from({ length: n }, (_, i) => (i + shift) % n);
}

function QuestionCard({
  index,
  type,
  prompt,
  en,
  children,
  corrected,
  correct,
  answerLine,
  givenLine,
  why,
  concept,
  accent,
}: {
  index: number;
  type: FinalTestQuestion["type"];
  prompt: string;
  en?: string;
  children: ReactNode;
  corrected: boolean;
  correct: boolean;
  answerLine?: string;
  givenLine?: string;
  why: string;
  concept: string;
  accent: string;
}) {
  const border = !corrected
    ? "border-slate-200 bg-white"
    : correct
      ? "border-emerald-300 bg-emerald-50/50"
      : "border-rose-300 bg-rose-50/50";
  return (
    <li
      data-ft-q={index + 1}
      data-ft-type={type}
      className={`rounded-3xl border-2 p-4 transition ${border}`}
    >
      <div className="flex flex-wrap items-start gap-3">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm font-bold text-white ${accent}`}>
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-black text-slate-400">
            <Localized text={FINAL_TEST_TYPES[type]} />
          </div>
          <Localized text={prompt} className="font-bold text-slate-800" />
          {en && (
            <div dir="ltr" className="ltr-row mt-1 text-lg font-extrabold text-slate-900">
              <En>{en}</En>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">{children}</div>
      {corrected && (
        <div
          data-ft-verdict={correct ? "correct" : "wrong"}
          className="mt-3 space-y-1.5 rounded-2xl border-2 border-slate-900/5 bg-white/80 p-3 text-sm font-bold"
        >
          <div className={`flex flex-wrap items-center gap-2 ${correct ? "text-emerald-800" : "text-rose-800"}`}>
            <span aria-hidden className={`grid h-6 w-6 place-items-center rounded-full text-xs font-black text-white ${correct ? "bg-emerald-600" : "bg-rose-500"}`}>
              {correct ? "✓" : "✕"}
            </span>
            <span>{correct ? "إجابة صحيحة" : "إجابة غير صحيحة"}</span>
            {correct && answerLine && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">
                <Localized text={answerLine} />
              </span>
            )}
          </div>
          {!correct && (
            <>
              {givenLine && (
                <div className="rounded-xl bg-rose-50 px-2.5 py-1.5 text-rose-900">
                  <span className="font-black">إجابتك: </span>
                  <span dir="ltr" className="font-en font-bold">
                    {givenLine}
                  </span>
                </div>
              )}
              <div className="rounded-xl bg-emerald-50 px-2.5 py-1.5 text-emerald-900">
                <span className="font-black">الإجابة الصحيحة: </span>
                <span dir="ltr" className="font-en font-extrabold">
                  {answerLine ?? ""}
                </span>
              </div>
            </>
          )}
          <div className="flex flex-wrap items-center gap-2 text-slate-700">
            <span>💡</span>
            <PlatformTag />
            <Localized text={why} />
          </div>
          <div className="text-xs font-black text-slate-500">
            🎯 المفهوم: <Localized text={concept} />
          </div>
        </div>
      )}
    </li>
  );
}

/** هل النص عربي؟ (لتحديد اتجاه الخيار: خيارات إنجليزية LTR وخيارات عربية RTL) */
function hasArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/** خيار سؤال: إنجليزي داخل عازل LTR، وعربي داخل غلاف RTL مع عزل أي إنجليزي فيه */
export function FinalOptionText({ text, className = "" }: { text: string; className?: string }) {
  const ar = hasArabic(text);
  return (
    <span dir={ar ? "rtl" : "ltr"} className={`min-w-0 flex-1 text-start ${ar ? "" : "ltr font-en"} ${className}`}>
      {ar ? <Localized text={text} /> : <En>{text}</En>}
    </span>
  );
}

/** نص مختلط عربي/إنجليزي عبر العازل المشترك (نفس Rich في lessonKit دون دورة استيراد) */
function Localized({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <LatinRuns text={text} />
    </span>
  );
}
// ------------------------------------------------------------
// الاختبار النهائي
// ------------------------------------------------------------

export default function FinalTest({
  lesson,
  questions,
  accent = ACCENT_DEFAULT,
  title = "🏁 الاختبار النهائي",
  onGoTeacher,
}: {
  lesson: number;
  questions: FinalTestQuestion[];
  accent?: string;
  title?: string;
  /** فتح منطقة المعلم (مفتاح الإجابات) داخل نفس الدرس — بلا مغادرة للدرس */
  onGoTeacher?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, FinalTestAnswer>>({});
  const [corrected, setCorrected] = useState(false);

  const answered = questions.reduce((n, q, i) => n + (isAnswered(q, answers[i]) ? 1 : 0), 0);
  const allAnswered = questions.length > 0 && answered === questions.length;
  const result = useMemo(() => gradeFinalTest(questions, answers), [questions, answers]);

  const set = (i: number, a: FinalTestAnswer) => {
    if (corrected) return; // بعد التصحيح: الاختبار مقفل حتى إعادة الاختبار
    setAnswers((prev) => ({ ...prev, [i]: a }));
  };
  /** إعادة الاختبار: الحالة كلها تنبع من هاتين القيمتين ⇒ مسح كامل */
  const reset = () => {
    setAnswers({});
    setCorrected(false);
  };

  if (questions.length === 0) return null;

  return (
    <section data-final-test={lesson} dir="rtl" className="space-y-4">
      <header className="rounded-3xl border-2 border-slate-900/[0.07] bg-gradient-to-bl from-white via-white to-slate-50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-xl text-white ${accent}`} aria-hidden>
            🏁
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-head text-xl font-black text-slate-900 sm:text-2xl">
              <Localized text={title} /> <span className="font-en text-base font-black text-slate-400">— Lesson {lesson}</span>
            </h2>
            <p className="mt-0.5 text-sm font-bold text-slate-500">
              <Localized text={`${questions.length} أسئلة على محتوى الدرس كله · أجب عن الأسئلة كلها، والتصحيح في النهاية فقط.`} />
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-slate-500 shadow-sm">
            <Localized text={`أجبت عن ${answered} / ${questions.length}`} />
          </span>
        </div>
        <div className="mt-3 rounded-2xl border-2 border-dashed border-slate-200 bg-white/70 p-3 text-sm font-bold text-slate-600">
          <Localized text="لا تُظهر هذه الصفحة أي علامة صح أو خطأ ولا الدرجة ولا الشرح قبل ضغط زر «تصحيح الاختبار» — راجع اختياراتك بحرّية." />
        </div>
      </header>

      <ol className="grid gap-3" aria-label="أسئلة الاختبار النهائي">
        {questions.map((q, i) => {
          const a = answers[i];
          const locked = corrected;
          const correct = corrected && result.perQuestion[i].correct;
          return (
            <QuestionCard
              key={i}
              index={i}
              type={q.type}
              prompt={q.ar}
              en={q.en}
              corrected={corrected}
              correct={correct}
              answerLine={expectedAnswerText(q)}
              givenLine={givenAnswerText(q, a)}
              why={q.why}
              concept={q.concept}
              accent={accent}
            >
              <QuestionControl
                lesson={lesson}
                index={i}
                question={q}
                answer={a}
                locked={locked}
                onChange={(next) => set(i, next)}
              />
            </QuestionCard>
          );
        })}
      </ol>

      <div className="sticky bottom-4 z-10">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border-2 border-slate-900/10 bg-white/95 p-4 shadow-xl backdrop-blur">
          {!corrected ? (
            <>
              <button
                type="button"
                data-ft-submit
                onClick={() => setCorrected(true)}
                disabled={!allAnswered}
                className={`rounded-xl px-5 py-2.5 font-black text-white shadow transition enabled:hover:brightness-110 disabled:opacity-30 ${accent}`}
              >
                <Localized text={`تصحيح الاختبار (${answered}/${questions.length})`} />
              </button>
              {!allAnswered && (
                <span className="text-sm font-bold text-slate-500">
                  <Localized text="أجب عن كل الأسئلة أولًا — لن تظهر أي نتيجة قبل التصحيح." />
                </span>
              )}
              <button
                type="button"
                data-ft-reset
                onClick={reset}
                disabled={answered === 0}
                className="ms-auto rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition enabled:hover:bg-slate-200 disabled:opacity-40"
              >
                ↺ إعادة
              </button>
            </>
          ) : (
            <>
              <div
                data-ft-result={result.pct}
                role="status"
                aria-live="polite"
                className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-xl font-extrabold text-white ${accent}`}
              >
                {result.pct}%
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-slate-800">
                  <Localized text={`النتيجة: ${result.score} من ${result.total} — النسبة ${result.pct}٪`} />
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  <Localized text={resultMessage(result.pct)} />
                </div>
                <div className="text-xs font-bold text-slate-400">
                  <Localized text="ظهرت الآن الإجابات الصحيحة والشروح أسفل كل سؤال." />
                </div>
              </div>
              <button
                type="button"
                data-ft-reset
                onClick={reset}
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
              >
                ↺ إعادة الاختبار
              </button>
            </>
          )}
          {onGoTeacher && (
            <button
              type="button"
              data-ft-teacher-link
              onClick={onGoTeacher}
              className="rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-400"
            >
              🔐 مفتاح الإجابات — منطقة المعلم
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// عناصر التحكم لكل نوع سؤال — كلها لوحة مفاتيح كاملة (radio/checkbox/select/buttons)
// ------------------------------------------------------------

function QuestionControl({
  lesson,
  index,
  question,
  answer,
  locked,
  onChange,
}: {
  lesson: number;
  index: number;
  question: FinalTestQuestion;
  answer?: FinalTestAnswer;
  locked: boolean;
  onChange: (a: FinalTestAnswer) => void;
}) {
  const groupName = `ft-${lesson}-q${index + 1}`;
  const optionClass = (active: boolean) =>
    `flex cursor-pointer items-start gap-2 rounded-2xl border-2 p-3 text-sm font-bold transition ${
      active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
    } ${locked ? "cursor-default opacity-90" : ""}`;

  const choiceList = (
    options: string[],
    value: number | undefined,
    legend: string,
    pick: (oi: number) => void
  ) => (
    <fieldset disabled={locked} className="grid gap-2 sm:grid-cols-2">
      <legend className="sr-only">{legend}</legend>
      {options.map((opt, oi) => (
        <label key={oi} className={optionClass(value === oi)}>
          <input
            type="radio"
            name={groupName}
            value={oi}
            checked={value === oi}
            onChange={() => pick(oi)}
            className="mt-1 h-4 w-4 shrink-0 accent-slate-900"
          />
          <FinalOptionText text={opt} />
        </label>
      ))}
    </fieldset>
  );

  if (question.type === "single") {
    const value = answer?.kind === "single" ? answer.value : undefined;
    return choiceList(question.options, value, `سؤال ${index + 1} — اختر إجابة واحدة`, (oi) =>
      onChange({ kind: "single", value: oi })
    );
  }

  if (question.type === "error") {
    const value = answer?.kind === "error" ? answer.value : undefined;
    return (
      <div className="space-y-2">
        <p className="text-xs font-black text-slate-500">
          <Localized text="اختر المقطع الذي يحتوي الخطأ:" />
        </p>
        {choiceList(question.segments, value, `سؤال ${index + 1} — اختر المقطع الخاطئ`, (oi) =>
          onChange({ kind: "error", value: oi })
        )}
      </div>
    );
  }

  if (question.type === "tf") {
    const value = answer?.kind === "tf" ? answer.value : undefined;
    return (
      <fieldset disabled={locked} className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">{`سؤال ${index + 1} — صح أم خطأ`}</legend>
        {[
          { v: true, label: "صحيح ✓" },
          { v: false, label: "خطأ ✕" },
        ].map((o) => (
          <label key={String(o.v)} className={optionClass(value === o.v)}>
            <input
              type="radio"
              name={groupName}
              checked={value === o.v}
              onChange={() => onChange({ kind: "tf", value: o.v })}
              className="mt-1 h-4 w-4 shrink-0 accent-slate-900"
            />
            <span className="min-w-0 flex-1 text-start font-black">{o.label}</span>
          </label>
        ))}
      </fieldset>
    );
  }

  if (question.type === "multi") {
    const value = answer?.kind === "multi" ? answer.value : [];
    return (
      <fieldset disabled={locked} className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">{`سؤال ${index + 1} — اختر كل الإجابات الصحيحة`}</legend>
        {question.options.map((opt, oi) => {
          const active = value.includes(oi);
          return (
            <label key={oi} className={optionClass(active)}>
              <input
                type="checkbox"
                checked={active}
                onChange={() =>
                  onChange({
                    kind: "multi",
                    value: active ? value.filter((v) => v !== oi) : [...value, oi].sort((x, y) => x - y),
                  })
                }
                className="mt-1 h-4 w-4 shrink-0 accent-slate-900"
              />
              <FinalOptionText text={opt} />
            </label>
          );
        })}
      </fieldset>
    );
  }

  if (question.type === "order") {
    const presented = shuffledIndexes(question.items.length);
    const value = answer?.kind === "order" ? answer.value : [];
    const rest = presented.filter((i) => !value.includes(i));
    return (
      <div className="space-y-2">
        <div dir="ltr" className="ltr-row min-h-[3rem] rounded-2xl border-2 border-dashed border-slate-300 bg-white p-2">
          {value.length === 0 ? (
            <span dir="rtl" className="block p-2 text-center text-sm font-bold text-slate-400">
              <Localized text="اختر الترتيب الصحيح واحدًا واحدًا…" />
            </span>
          ) : (
            <div className="flex flex-wrap items-end gap-1.5">
              {value.map((i, p) => (
                <span key={`${i}-${p}`} className="inline-flex items-center rounded-xl border-2 border-slate-300 bg-slate-50 px-2.5 py-1.5 font-en text-base font-extrabold text-slate-800">
                  {question.items[i]}
                </span>
              ))}
            </div>
          )}
        </div>
        {!locked && (
          <div className="flex flex-wrap gap-2">
            {rest.map((i) => (
              <button
                key={i}
                type="button"
                dir="ltr"
                onClick={() => onChange({ kind: "order", value: [...value, i] })}
                className="font-en rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-base font-extrabold text-slate-800 transition hover:border-slate-400 active:scale-95"
              >
                {question.items[i]}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => onChange({ kind: "order", value: [] })}
          disabled={locked || value.length === 0}
          className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-600 transition enabled:hover:bg-slate-200 disabled:opacity-40"
        >
          ↺ إعادة الترتيب
        </button>
      </div>
    );
  }

  if (question.type === "match") {
    const value = answer?.kind === "match" ? answer.value : question.pairs.map(() => null);
    const rightOrder = shuffledIndexes(question.pairs.length);
    return (
      <div className="space-y-2">
        {question.pairs.map((pair, pi) => (
          <div key={pi} className="flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-2">
            <span dir="ltr" className="ltr-row font-en text-base font-extrabold text-slate-800">
              <En>{pair.left}</En>
            </span>
            <span aria-hidden className="text-slate-300">
              ←
            </span>
            <label className="min-w-0 flex-1">
              <span className="sr-only">
                <Localized text={`${pair.left} — اختر المقابل`} />
              </span>
              <select
                disabled={locked}
                value={value[pi] === null || value[pi] === undefined ? "" : String(value[pi])}
                onChange={(e) => {
                  const next = [...value];
                  next[pi] = e.target.value === "" ? null : Number(e.target.value);
                  onChange({ kind: "match", value: next });
                }}
                dir="ltr"
                className="font-en w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-base font-extrabold text-slate-800"
              >
                <option value="">— اختر —</option>
                {rightOrder.map((ri) => (
                  <option key={ri} value={ri}>
                    {question.pairs[ri].right}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    );
  }

  // typed
  const value = answer?.kind === "typed" ? answer.value : "";
  return (
    <div dir="ltr" className="ltr-row flex flex-wrap items-center gap-2 rounded-2xl border-2 border-slate-100 bg-white p-3">
      {question.before && <En className="text-lg font-extrabold text-slate-700">{question.before}</En>}
      <input
        type="text"
        dir="ltr"
        disabled={locked}
        value={value}
        onChange={(e) => onChange({ kind: "typed", value: e.target.value })}
        aria-label={`سؤال ${index + 1} — اكتب الإجابة`}
        className="font-en min-w-[8rem] flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-base font-extrabold text-slate-900"
        placeholder="…"
      />
      {question.after && <En className="text-lg font-extrabold text-slate-700">{question.after}</En>}
    </div>
  );
}

// ------------------------------------------------------------
// مفتاح الإجابات — يُعرض داخل «منطقة المعلم» بعد فتحها بكلمة المرور
// (somer173) كما في الدروس 1–26؛ لا بوابة ثانية هنا كي لا تتكرر.
// الصيغة تدريسية: رقم السؤال · الإجابة الصحيحة · السبب · المفهوم · الفخ الشائع.
// ------------------------------------------------------------

export function FinalTestAnswerKey({
  lesson,
  questions,
  accent = ACCENT_DEFAULT,
}: {
  lesson: number;
  questions: FinalTestQuestion[];
  accent?: string;
}) {
  if (questions.length === 0) return null;
  return (
    <section data-ft-key={lesson} className="space-y-3 rounded-3xl border-2 border-amber-300 bg-amber-50/60 p-4">
      <header className="flex flex-wrap items-center gap-2">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-xl text-white ${accent}`} aria-hidden>
          🏁
        </span>
        <h3 className="font-head text-lg font-black text-slate-900">
          <Localized text={`مفتاح الاختبار النهائي — الدرس ${lesson} (${questions.length} سؤالًا)`} />
        </h3>
        <PlatformTag />
      </header>
      <p className="rounded-2xl bg-white/70 p-3 text-xs font-bold text-slate-600">
        <Localized text="كل إجابات هذا المفتاح وشروحه من إعداد المنصة للمعلم — لا تُعرض للطالب قبل ضغط «تصحيح الاختبار»." />
      </p>
      <ol className="space-y-2">
        {questions.map((q, i) => (
          <li key={i} data-ft-key-item={i + 1} className="rounded-2xl border-2 border-amber-200 bg-white p-3 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-black text-slate-800">
                {i + 1}. <Localized text={q.ar} />
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-black text-slate-400">
                {FINAL_TEST_TYPES[q.type]}
              </span>
            </div>
            {q.en && (
              <div dir="ltr" className="ltr-row mt-1 text-base font-extrabold text-slate-900">
                <En>{q.en}</En>
              </div>
            )}
            <div className="mt-1.5 grid gap-1 text-slate-700">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-black text-emerald-800">الإجابة الصحيحة:</span>
                <span className="rounded-lg bg-emerald-50 px-2 py-0.5 font-en text-base font-extrabold text-emerald-900" dir="ltr">
                  {expectedAnswerText(q)}
                </span>
              </div>
              <details>
                <summary className="cursor-pointer font-black">التفسير والمفهوم والفخ · <span dir="ltr">Platform Explanation</span></summary>
              <div>
                <span className="font-black">السبب: </span>
                <Localized text={q.why} />
              </div>
              <div>
                <span className="font-black">المفهوم من الدرس: </span>
                <Localized text={q.concept} />
              </div>
              {q.trap && (
                <div className="text-rose-800">
                  <span className="font-black">الفخ الشائع: </span>
                  <Localized text={q.trap} />
                </div>
              )}
              </details>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ------------------------------------------------------------
// أدوات للمهندسين/التدقيق: ملخص نصي للاختبار (لا يستخدم في الواجهة)
// ------------------------------------------------------------

export function finalTestSummary(questions: FinalTestQuestion[]): string {
  return questions
    .map((q, i) => `${i + 1}. [${FINAL_TEST_TYPES[q.type]}] ${q.ar} ⇒ ${expectedAnswerText(q)}`)
    .join("\n");
}
