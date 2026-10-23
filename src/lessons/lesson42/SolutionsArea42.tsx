import { Text42, En42 } from "./design42";
import { TEST_QUESTIONS_42, answerKey42, type TestAnswers42 } from "./testData42";
import { grade42 } from "./key42";

export default function SolutionsArea42({ answers = {}, teacher = false }: { answers?: TestAnswers42; teacher?: boolean }) {
  const { results, score, total } = grade42(answers);
  return (
    <div className="mx-auto max-w-4xl space-y-4" data-area="solutions">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <p className="text-xs font-extrabold tracking-wide text-emerald-700">REVIEW &amp; REASONING · LESSON 42</p>
        <h1 className="font-head mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          <Text42 text={teacher ? "الحلول التفصيلية — مفتاح المعلم" : "الحلول التفصيلية — 25 سؤالًا"} />
        </h1>
        <p className="mt-2 text-base font-semibold text-slate-600">
          <Text42 text="النتيجة:" /> <bdi dir="ltr">{score} / {total}</bdi>
          {!teacher && <span className="text-slate-500"> · <Text42 text="تُحسب مرة واحدة عند التسليم، وكل سؤال بدرجة واحدة." /></span>}
        </p>
        {teacher && (
          <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
            <Text42 text="هذه المساحة مخصصة للمعلم. لكل سؤال: الإجابة الصحيحة، والوظيفة النحوية المختبَرة، وسبب §41 كما ورد في المصدر، وشرح المنصة." />
          </p>
        )}
      </section>

      {results.map((entry) => {
        const question = TEST_QUESTIONS_42.find((q) => q.id === entry.id)!;
        return (
          <article key={entry.id} className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5" data-solution-id={entry.id}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{entry.number}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                <Text42 text={`المستوى ${entry.level}`} />
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
                  <Text42 text={line} />
                </p>
              ))}
            </div>

            {!teacher && (
              <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                <Text42 text="إجابتك:" />{" "}
                <span dir="auto" className="font-en font-bold text-slate-900">
                  {question.fields.map((f) => answers[answerKey42(question.id, f.key)] || "—").join(" / ")}
                </span>
              </p>
            )}

            <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs font-extrabold text-emerald-800">الإجابة الصحيحة</p>
              <p dir="auto" className="font-en mt-1 text-base font-bold text-emerald-900">
                {entry.answer}
              </p>
            </div>

            <div className="mt-2 rounded-2xl border border-violet-200 bg-violet-50/60 p-3">
              <p className="text-xs font-extrabold text-violet-700">الوظيفة النحوية المختبَرة</p>
              <p className="mt-1 text-base font-semibold leading-8 text-slate-700">
                <Text42 text={entry.function} />
              </p>
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-extrabold text-slate-500">سبب §41 كما ورد في المصدر</p>
              <p className="mt-1 text-base leading-8 text-slate-700">
                <Text42 text={entry.source} />
              </p>
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-extrabold text-violet-700">شرح المنصة</p>
              <p className="mt-1 text-base leading-8 text-slate-700">
                <Text42 text={entry.reason} />
              </p>
            </div>
          </article>
        );
      })}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500">
        <p>
          <Text42 text="الأسئلة من 16 إلى 20 تفسيرية وتُقبل بمعنى الإجابة لا بتطابق حرفي؛ يعرض التصحيح الكلمات المفتاحية المعتمدة. راجع المعلم الإجابات الطويلة يدويًا عند الحاجة." />
        </p>
        <p className="mt-2">
          <En42>§41</En42> <Text42 text="في المصدر يعطي الإجابة والسبب لكل سؤال من الخمسة والعشرين؛ أعمدة «الوظيفة النحوية» و«شرح المنصة» إضافات تعليمية من المنصة مبنية على §3 و§17 و§23 و§32." />
        </p>
      </section>
    </div>
  );
}
