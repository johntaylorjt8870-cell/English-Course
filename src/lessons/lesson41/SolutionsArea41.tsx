import { Text41, En41 } from "./design";
import { TEST_QUESTIONS_41, answerKey41, type TestAnswers41 } from "./testData41";
import { grade41 } from "./key41";

export default function SolutionsArea41({ answers = {}, teacher = false }: { answers?: TestAnswers41; teacher?: boolean }) {
  const { results, score, total } = grade41(answers);
  return (
    <div className="mx-auto max-w-4xl space-y-4" data-area="solutions">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <p className="text-xs font-extrabold tracking-wide text-emerald-700">REVIEW &amp; REASONING · LESSON 41</p>
        <h1 className="font-head mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          <Text41 text={teacher ? "الحلول التفصيلية — مفتاح المعلم" : "الحلول التفصيلية — 25 سؤالًا"} />
        </h1>
        <p className="mt-2 text-base font-semibold text-slate-600">
          <Text41 text="النتيجة:" /> <bdi dir="ltr">{score} / {total}</bdi>
          {!teacher && <span className="text-slate-500"> · <Text41 text="تُحسب مرة واحدة عند التسليم، وكل سؤال بدرجة واحدة." /></span>}
        </p>
        {teacher && (
          <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
            <Text41 text="هذه المساحة مخصصة للمعلم. الحلول أدناه تشمل الإجابة الصحيحة والسبب والتفسير التعليمي لكل سؤال." />
          </p>
        )}
      </section>

      {results.map((entry) => {
        const question = TEST_QUESTIONS_41.find((q) => q.id === entry.id)!;
        return (
          <article key={entry.id} className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5" data-solution-id={entry.id}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{entry.number}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                <Text41 text={`المستوى ${entry.level}`} />
              </span>
              {!teacher && (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${entry.correct ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                  {entry.correct ? "✓ صحيحة" : "✕ تحتاج مراجعة"}
                </span>
              )}
            </div>

            <div className="mt-2 space-y-1">
              {question.lines.map((line, i) => (
                <p key={i} dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined} className="font-en text-lg font-bold leading-8 text-slate-900">
                  <Text41 text={line} />
                </p>
              ))}
            </div>

            {!teacher && (
              <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                <Text41 text="إجابتك:" />{" "}
                <span dir="auto" className="font-en font-bold text-slate-900">
                  {question.fields.map((f) => answers[answerKey41(question.id, f.key)] || "—").join(" / ")}
                </span>
              </p>
            )}

            <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs font-extrabold text-emerald-800">الإجابة الصحيحة</p>
              <p dir="auto" className="font-en mt-1 text-base font-bold text-emerald-900">
                {entry.answer}
              </p>
            </div>
            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-extrabold text-violet-700">التفسير التعليمي</p>
              <p className="mt-1 text-base leading-8 text-slate-700">
                <Text41 text={entry.reason} />
              </p>
            </div>
          </article>
        );
      })}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500">
        <p>
          <Text41 text="الأسئلة من 16 إلى 20 تفسيرية وتُقبل بمعنى الإجابة لا بتطابق حرفي؛ يعرض التصحيح الكلمات المفتاحية المعتمدة. راجع المعلم الإجابات الطويلة يدويًا عند الحاجة." />
        </p>
        <p className="mt-2">
          <En41>§37</En41> <Text41 text="في المصدر لا يتضمن مفتاحًا تفصيليًا؛ هذه الحلول أُعدت للمنصة وتطابق أسئلة §36 الـ25." />
        </p>
      </section>
    </div>
  );
}
