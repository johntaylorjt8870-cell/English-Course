import { Text33, En33, PlatformTag33, Lens33 } from "./design33";
import { TEST_QUESTIONS_33, answerKey33, type TestAnswers33 } from "./testData33";
import { grade33, MIA_CORRECTED_33 } from "./key33";

// ============================================================
// مساحة الحلول التفصيلية — 25 سؤالًا.
// تُحمَّل كقطعة مستقلة (lazy) ولا تُرسم إلا بعد التسليم، أو داخل مساحة المعلم.
// ============================================================

export default function SolutionsArea33({ answers = {}, teacher = false }: { answers?: TestAnswers33; teacher?: boolean }) {
  const { results, score, total } = grade33(answers);
  return (
    <div className="mx-auto max-w-4xl space-y-4" data-area="solutions">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <p className="text-xs font-extrabold tracking-wide text-emerald-700">
          <En33>REVIEW &amp; REASONING · LESSON 33</En33>
        </p>
        <h2 className="font-head mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
          <Text33 text={teacher ? "الحلول التفصيلية — مفتاح المعلم" : "الحلول التفصيلية — 25 سؤالًا"} />
        </h2>
        <p className="mt-2 text-base font-semibold text-slate-600">
          <Text33 text="النتيجة:" /> <bdi dir="ltr">{score} / {total}</bdi>
          {!teacher && (
            <span className="text-slate-500">
              {" "}
              · <Text33 text="تُحسب مرة واحدة عند التسليم، وكل سؤال بدرجة واحدة." />
            </span>
          )}
        </p>
        {teacher && (
          <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
            <Text33 text="هذه المساحة مخصصة للمعلم. الحلول أدناه تشمل الإجابة الصحيحة والزمن والسبب والبدائل المقبولة لكل سؤال." />
          </p>
        )}
      </section>

      {results.map((entry) => {
        const question = TEST_QUESTIONS_33.find((q) => q.id === entry.id)!;
        /** قيمة الحقل كما يقرأها الطالب: معرّف الخيار يُعرض كنصّه لا كمعرّفه. */
        const shown = (value: string) => {
          const option = question.options?.find((o) => o.id === value.trim());
          return option ? option.text : value;
        };
        return (
          <article key={entry.id} className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5" data-solution-id={entry.id}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{entry.number}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                <Text33 text={`المستوى ${entry.level}`} />
              </span>
              {entry.tenseId !== "—" && <Lens33 tense={entry.tenseId} />}
              {!teacher && (
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${entry.correct ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                  {entry.correct ? "✓ صحيحة" : "✕ تحتاج مراجعة"}
                </span>
              )}
            </div>

            <div className="mt-2 space-y-1">
              {question.lines.map((line, i) => (
                <p
                  key={i}
                  dir={/[A-Za-z]/.test(line) && !/[\u0600-\u06FF]/.test(line) ? "ltr" : undefined}
                  className="font-en text-lg font-bold leading-8 text-slate-900"
                >
                  <Text33 text={line} />
                </p>
              ))}
            </div>

            {!teacher && (
              <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                <Text33 text="إجابتك:" />{" "}
                <span dir="auto" className="font-en font-bold text-slate-900">
                  {question.fields.map((f) => shown(answers[answerKey33(question.id, f.key)] || "—")).join(" / ")}
                </span>
              </p>
            )}

            <div className="mt-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3">
              <p className="text-xs font-extrabold text-emerald-800">
                <Text33 text="الإجابة المقبولة" />
                {entry.tenseId !== "—" && (
                  <>
                    {" · "}
                    <En33 className="text-xs">{entry.tense}</En33>
                  </>
                )}
              </p>
              <p dir="auto" className="font-en mt-1 text-base font-bold text-emerald-900">
                {entry.answer
                  .split(" / ")
                  .map((part) => shown(part))
                  .join(" / ")}
              </p>
              {entry.accept && entry.accept.length > 0 && (
                <p className="mt-1 text-xs font-semibold text-emerald-800">
                  <Text33 text="تُقبل أيضًا:" /> <En33 className="text-xs">{entry.accept.join(" · ")}</En33>
                </p>
              )}
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-extrabold text-violet-700">
                <Text33 text="سبب الاختيار" /> {entry.provenance === "platform" && <PlatformTag33 />}
              </p>
              <p className="mt-1 text-base leading-8 text-slate-700">
                <Text33 text={entry.reason} />
              </p>
            </div>

            {entry.errorNote && (
              <div className="mt-2 rounded-2xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-xs font-extrabold text-rose-800">
                  <Text33 text="تفسير الخطأ" />
                </p>
                <p className="mt-1 text-base leading-8 text-rose-900">
                  <Text33 text={entry.errorNote} />
                </p>
              </div>
            )}

            {entry.alternatives?.map((alt) => (
              <div key={alt.answer} className="mt-2 rounded-2xl border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs font-extrabold text-amber-900">
                  <Text33 text="بديل صحيح يسمح به السياق:" /> <En33 className="text-xs">{alt.answer}</En33>
                </p>
                <p className="mt-1 text-sm leading-7 text-amber-900">
                  <Text33 text={alt.note} />
                </p>
              </div>
            ))}
          </article>
        );
      })}

      <section className="rounded-3xl border-2 border-violet-200 bg-violet-50 p-4 md:p-5" data-mia-key="33">
        <h3 className="font-head text-xl font-bold text-violet-900">
          <Text33 text="المستوى الخامس: الفقرة كاملة بعد إكمال الفراغات" />
        </h3>
        <div className="mt-2 space-y-2">
          {MIA_CORRECTED_33.map((line) => (
            <p key={line} dir="ltr" lang="en" className="font-en rounded-2xl border border-violet-200 bg-white p-3 text-lg leading-9 text-violet-900">
              {line}
            </p>
          ))}
        </div>
        <p className="mt-2 text-sm font-semibold text-violet-900">
          <Text33 text="الفقرة تجمع الأزمنة الأربعة: عادة (practices)، وضع مؤقت هذا الشهر (is preparing)، إنجاز حتى الآن (has won)، نشاط ممتد منذ يوليو (has been training)، حدث اليوم (is rehearsing)، وحالة ممتدة مع فعل حالة (has known)." />
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-500">
        <p>
          <Text33 text="السؤالان 20 و25 تفسيريان وتُقبل إجابتاهما بالمعنى لا بالتطابق الحرفي؛ يعرض التصحيح الكلمات المفتاحية المعتمدة. راجع المعلم الإجابات الطويلة يدويًا عند الحاجة." />
        </p>
        <p className="mt-2">
          <Text33 text="مفاتيح الأسئلة 16 إلى 20 منصوصة في المادة التعليمية، أما مفاتيح بقية الأسئلة فأُعدّت للمنصة وفق قواعد الدرس نفسه، وهي موسومة بذلك." /> <PlatformTag33 />
        </p>
      </section>
    </div>
  );
}
