import { useState } from "react";
import { PlatformTag, Rich } from "../../shared/lessonKit";
import { TEST_LEVELS_35, TEST_35, TEST_35_COUNT, TEST_SOLUTIONS_35, answerText35, gradeObjective35, isAnswered35, type TestQuestion35 } from "./testData";
import { Card35, FOCUS_35 } from "./kit35";

export default function TestArea35({ onSubmitted, onRestart }: { onSubmitted: () => void; onRestart: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const answered = TEST_35.filter((question) => isAnswered35(question, answers[question.n])).length;
  const ready = answered === TEST_35_COUNT;
  const objective = TEST_35.filter((question) => question.type !== "write");
  const score = objective.reduce((total, question) => total + (gradeObjective35(question, answers[question.n]) === true ? 1 : 0), 0);
  const update = (number: number, value: string | number) => setAnswers((current) => ({ ...current, [number]: value }));
  const submit = () => {
    if (!ready || submitted) return;
    setSubmitted(true);
    onSubmitted();
  };
  const reset = () => {
    setAnswers({});
    setSubmitted(false);
    onRestart();
  };

  return (
    <div data-area="lesson35-test" data-source-section="s34" className="space-y-4">
      <Card35 className="border-[#d4ddd6] bg-[#fbfaf6]" eyebrow="Future Plans Master Test" title="اختبار الدرس 35 — 25 سؤالًا، خمسة مستويات">
        <p className="text-sm leading-6 text-[#56686b]">أجب عن جميع الأسئلة قبل الإرسال. لا تظهر علامة صح أو خطأ أو الإجابة النموذجية قبل الضغط على «إرسال الاختبار».</p>
        <div className="mt-3 flex items-center gap-3" aria-label="تقدم الإجابة">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#e5e2d9]"><div className="h-full rounded-full bg-[#245f62] transition-[width] duration-200" style={{ width: `${Math.round((answered / TEST_35_COUNT) * 100)}%` }} /></div>
          <span className="text-xs font-black tabular-nums text-[#53676a]" aria-live="polite">{answered}/{TEST_35_COUNT}</span>
        </div>
      </Card35>

      {submitted ? (
        <section role="status" aria-live="polite" className="rounded-3xl border-2 border-[#c7d8d3] bg-[#eef4f0] p-4 text-center">
          <div className="text-lg font-black text-[#17354a]">النتيجة الموضوعية: {score} / {objective.length}</div>
          <p className="mt-1 text-sm leading-6 text-[#42595c]">أُرسلت الإجابات الكتابية للأسئلة 21–25 للمراجعة البشرية؛ لا تُقيّم آليًا كي لا تُرفض إجابة صحيحة بصياغة مختلفة.</p>
        </section>
      ) : null}

      {TEST_LEVELS_35.map((level) => (
        <section key={level.id} className="space-y-3" aria-label={level.title}>
          <div className="flex flex-wrap items-center gap-2 border-b border-[#ddd7cc] pb-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#17354a] text-xs font-black text-white">{level.range.split(" ").at(-1)?.replace(/[^0-9–-]/g, "")}</span>
            <h3 data-source-unit={level.titleSourceUnit} className="font-black text-[#17354a]"><Rich text={level.title} /></h3>
            <span className="text-xs font-bold text-[#718080]">{level.range}</span>
          </div>
          {level.instruction ? <p data-source-unit={level.instructionSourceUnit} className="text-sm font-bold text-[#53676a]"><Rich text={level.instruction} /></p> : null}
          {level.questions.map((question) => (
            <Question35 key={question.n} question={question} value={answers[question.n]} submitted={submitted} onChange={(value) => update(question.n, value)} />
          ))}
        </section>
      ))}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[#ddd7cc] bg-[#fffdf8]/95 p-3 shadow-lg backdrop-blur">
        {!submitted ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" data-test-submit disabled={!ready} onClick={submit} className={`${FOCUS_35} rounded-xl bg-[#245f62] px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-[#cbd8d1] disabled:text-[#6f7d78]`}>إرسال الاختبار</button>
            <span className="text-xs font-bold text-[#66777a]">{ready ? "كل الإجابات جاهزة للإرسال." : `أكمل ${TEST_35_COUNT - answered} سؤالًا متبقيًا.`}</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={reset} className={`${FOCUS_35} rounded-xl border border-[#245f62] bg-white px-5 py-2.5 text-sm font-black text-[#245f62] hover:bg-[#eef4f0]`}>إعادة الاختبار</button>
            <span className="text-xs font-bold text-[#66777a]">إجابات الأسئلة 1–20 ظاهرة؛ الكتابية راجعها مع مفتاح المعلم.</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Question35({ question, value, submitted, onChange }: { question: TestQuestion35; value: string | number | undefined; submitted: boolean; onChange: (answer: string | number) => void }) {
  const grade = submitted ? gradeObjective35(question, value) : null;
  const model = answerText35(question);
  const groupName = `l35-question-${question.n}`;
  return (
    <article data-test-q={question.n} data-source-section="s34" className={`rounded-2xl border p-3 sm:p-4 ${grade === true ? "border-[#b8d6c0] bg-[#f3f8f2]" : grade === false ? "border-[#e6c3be] bg-[#fff8f6]" : "border-[#e0dbd1] bg-white"}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-1.5">
          {question.promptLines.map((line, index) => <div key={index} data-source-unit={question.sourceUnits[index]} dir="auto" className="text-sm font-bold leading-6 text-[#263f49]"><Rich text={line} /></div>)}
        </div>
        {submitted && grade !== null ? <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${grade ? "bg-[#dcebe0] text-[#315d4e]" : "bg-[#f7ddda] text-[#8d433b]"}`}>{grade ? "صحيح" : "راجع الإجابة"}</span> : null}
        {submitted && question.type === "write" ? <span className="shrink-0 rounded-full bg-[#f5ecd9] px-2.5 py-1 text-xs font-black text-[#795c31]">للمراجعة البشرية</span> : null}
      </div>

      {question.type === "single" ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={`السؤال ${question.n}`}>
          {question.options.map((option, index) => (
            <button key={option} type="button" role="radio" data-source-unit={question.sourceUnits[question.promptLines.length + index]} aria-checked={value === index} aria-pressed={value === index} disabled={submitted} onClick={() => onChange(index)} className={`${FOCUS_35} rounded-xl border px-3 py-2.5 text-left text-sm font-bold transition ${value === index ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#d8d2c5] bg-white text-[#304750] hover:border-[#72938b]"} disabled:cursor-default`}>
              <span className="mr-2 text-xs opacity-70">{String.fromCharCode(65 + index)}.</span><span dir="auto"><Rich text={option.replace(/^[A-C]\.\s*/, "")} /></span>
            </button>
          ))}
        </div>
      ) : question.type === "write" ? (
        <textarea aria-label={`السؤال ${question.n} — إجابة حرة`} dir="ltr" rows={2} disabled={submitted} value={typeof value === "string" ? value : ""} onChange={(event) => onChange(event.target.value)} className={`${FOCUS_35} mt-3 w-full resize-y rounded-xl border border-[#cfc8bb] bg-[#fffefa] px-3 py-2 text-base leading-6 text-[#17354a]`} placeholder="Write your own sentence…" />
      ) : (
        <input aria-label={`السؤال ${question.n} — إجابتك`} dir="ltr" type="text" disabled={submitted} value={typeof value === "string" ? value : ""} onChange={(event) => onChange(event.target.value)} className={`${FOCUS_35} mt-3 w-full rounded-xl border border-[#cfc8bb] bg-[#fffefa] px-3 py-2 text-base font-en text-[#17354a]`} placeholder={question.type === "repair" ? "Write the corrected sentence…" : "Type the missing form…"} />
      )}

      {submitted && grade !== null ? (
        <div data-test-feedback={question.n} className="mt-3 rounded-xl border border-[#d5ded7] bg-white p-3">
          <div className="text-[10px] font-black uppercase tracking-[.12em] text-[#718080]">إجابة نموذجية · من إعداد المعلم</div>
          <div dir="ltr" className="mt-1 font-en font-black text-[#17354a]">{model}</div>
          <p className="mt-1 text-sm leading-6 text-[#53676a]"><PlatformTag text="شرح تعليمي من إعداد المعلم" /> <Rich text={question.why} /></p>
        </div>
      ) : null}
      {submitted && question.type === "write" ? <p className="mt-2 rounded-xl bg-[#f5ecd9] p-2 text-xs font-bold leading-5 text-[#795c31]">اطّلع على إجابة نموذجية وبدائل مقبولة في منطقة الحلول/المعلم؛ لا توجد إجابة وحيدة لكل موقف كتابي.</p> : null}
      <span className="sr-only" id={`${groupName}-status`}>{submitted ? "تم الإرسال" : "لم يرسل بعد"}</span>
    </article>
  );
}

export function Solutions35({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest: () => void; onGoTeacher: () => void }) {
  if (!unlocked) {
    return (
      <div data-area="lesson35-solutions" className="rounded-3xl border-2 border-[#d5c69e] bg-[#fbf5e8] p-6 text-center">
        <div className="text-3xl">🔒</div>
        <h2 className="mt-2 text-lg font-black text-[#594a31]">منطقة الحلول مقفلة</h2>
        <p className="mt-1 text-sm leading-6 text-[#766548]">قدّم الاختبار أولًا، أو افتح منطقة المعلم للوصول إلى الإجابات والشروح.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <button type="button" onClick={onGoTest} className={`${FOCUS_35} rounded-xl bg-[#245f62] px-4 py-2 text-sm font-black text-white`}>العودة إلى الاختبار</button>
          <button type="button" onClick={onGoTeacher} className={`${FOCUS_35} rounded-xl border border-[#75639c] bg-white px-4 py-2 text-sm font-black text-[#5f4b82]`}>منطقة المعلم</button>
        </div>
      </div>
    );
  }
  return (
    <div data-area="lesson35-solutions" className="space-y-4">
      <Card35 eyebrow="Solutions Area · §35 source note" title="حلول Future Plans Master Test">
        <p className="text-sm leading-7 text-[#465b60]">القسم 35 من المصدر يطلب فتح الحلول التفصيلية لكنه لا يورد مفتاح الأسئلة. الإجابات والشروح أدناه إعداد تعليمي من المعلم/المنصة، مبني على نصوص أسئلة القسم 34 وقواعد الدرس. أسئلة IQ200 الكتابية تقبل إجابات أخرى صحيحة.</p>
        <div className="mt-2 text-xs font-black text-[#66777a]"><PlatformTag text="محتوى الحلول من إعداد المعلم؛ ليس نصًا أصليًا من المصدر" /></div>
      </Card35>
      {TEST_LEVELS_35.map((level) => (
        <section key={level.id} className="space-y-2" aria-label={`حلول ${level.title}`}>
          <h3 className="border-b border-[#ddd7cc] pb-2 font-black text-[#17354a]"><Rich text={level.title} /></h3>
          {level.questions.map((question) => {
            const solution = TEST_SOLUTIONS_35.find((item) => item.n === question.n)!;
            return (
              <article key={question.n} data-solution={question.n} className="rounded-2xl border border-[#d8d2c5] bg-white p-3">
                <div className="text-sm font-bold leading-6 text-[#304750]"><span className="ml-2 font-black text-[#9a7345]">س{question.n}.</span>{question.promptLines.map((line, index) => <div key={index} dir="auto"><Rich text={line} /></div>)}</div>
                <div className="mt-2 rounded-xl border border-[#c9d8d2] bg-[#eef4f0] p-3">
                  <div className="text-[10px] font-black uppercase tracking-[.12em] text-[#60756f]">{question.type === "write" ? "إجابة/إجابات نموذجية من إعداد المعلم" : "الإجابة النموذجية من إعداد المعلم"}</div>
                  <div dir="ltr" className="mt-1 font-en font-black leading-6 text-[#17354a]">{solution.answer}</div>
                  {question.type === "write" ? <p className="mt-1 text-xs font-bold text-[#53676a]">توجد صيغ أخرى صحيحة ما دامت تعبّر عن المعنى وتستخدم البناء المطلوب.</p> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-[#53676a]"><PlatformTag text="تفسير من إعداد المعلم" /> <Rich text={solution.explanation} /></p>
              </article>
            );
          })}
        </section>
      ))}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={onGoTest} className={`${FOCUS_35} rounded-xl border border-[#245f62] bg-white px-4 py-2 text-sm font-black text-[#245f62]`}>إعادة الاختبار</button>
        <button type="button" onClick={onGoTeacher} className={`${FOCUS_35} rounded-xl border border-[#75639c] bg-white px-4 py-2 text-sm font-black text-[#5f4b82]`}>منطقة المعلم</button>
      </div>
    </div>
  );
}
