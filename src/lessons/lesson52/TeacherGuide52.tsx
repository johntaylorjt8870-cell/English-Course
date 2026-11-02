import { READING_QUESTIONS_52, DIALOGUE_QUESTIONS_52, WRITING_52, SPEAKING_52 } from "./content52";
import { En52, Mixed52 } from "./kit52";
import { TEST_QUESTIONS_52 } from "./testData52";
import type { GradedTestResult52 } from "./testKey52";

export type TeacherGuideProps52 = { result: GradedTestResult52 };

export default function TeacherGuide52({ result }: TeacherGuideProps52) {
  const wrong = TEST_QUESTIONS_52.filter((question) => !result.byQuestion[question.id]);
  // The submitted result carries only the twenty-five loaded solutions; the
  // guide never imports the key module, so a failed key chunk cannot break it.
  const solutions = TEST_QUESTIONS_52.flatMap((question) => {
    const solution = result.solutions[question.id];
    return solution ? [solution] : [];
  });

  return (
    <div className="grid gap-4" data-teacher-guide>
      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="font-head text-xl font-bold text-slate-900">ملخص التصحيح</h3>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-3 text-white">
            <span className="text-xs font-bold text-slate-300">المجموع</span>
            <bdi dir="ltr" className="block text-2xl font-bold">
              {result.score} / {result.total}
            </bdi>
          </div>
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="rounded-2xl border border-slate-200 bg-white p-3">
              <span className="text-xs font-bold text-slate-500">القسم {level}</span>
              <bdi dir="ltr" className="block text-xl font-bold text-slate-900">
                {result.byLevel[level]?.score ?? 0} / {result.byLevel[level]?.total ?? 0}
              </bdi>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-600">
          توزيع الاختبار: 8 اختيار من متعدد، 5 إكمال، 5 تصحيح، 3 تحديد نوع الشرط، 4 ترجمة. الدرجة من 25، وكل سؤال بدرجة
          واحدة. لا تُمنح درجة جزئية داخل السؤال، لكن التصحيح يقبل البدائل الصحيحة المذكورة أدناه.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          <strong>الأسئلة غير الصحيحة: </strong>
          {wrong.length > 0 ? (
            <bdi dir="ltr" className="font-bold text-rose-700">
              {wrong.map((question) => question.number).join("، ")}
            </bdi>
          ) : (
            <span className="font-bold text-emerald-700">لا أخطاء في هذه المحاولة.</span>
          )}
        </p>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm text-slate-700">
        <h3 className="font-head text-lg font-bold text-slate-900">ملاحظات بيداغوجية</h3>
        <ul className="mt-2 grid gap-2">
          <li>
            <strong>will بعد if:</strong> الأسئلة 4 و14 و16 تقيس هذه القاعدة. التصحيح يرفض <En52>If I will study…</En52>{" "}
            ويشرح أن المضارع البسيط يحمل المعنى المستقبلي بعد if.
          </li>
          <li>
            <strong>s/es:</strong> الأسئلة 1 و5 و11 و15 تقيس التصريف مع he/she/it، والرفض يشمل <En52>doesn't studies</En52>.
          </li>
          <li>
            <strong>unless:</strong> السؤال 17 والسؤال 25 يقيسان أن unless منفية أصلًا، فيُرفض <En52>Unless you don't…</En52>.
          </li>
          <li>
            <strong>when:</strong> السؤال 18 يقيس المضارع البسيط بعد when؛ ويُقبل <En52>we will start</En52> بدل{" "}
            <En52>we will begin</En52>.
          </li>
          <li>
            <strong>Zero/First:</strong> التصنيف يعتمد على المعنى لا على الزمن وحده؛ الأسئلة 19 و21 حقائق عامة، والسؤال 20
            احتمال مستقبلي محدد.
          </li>
          <li>
            <strong>الترجمة:</strong> تُقبل صيغ <En52>practice/practise</En52> و<En52>phone/mobile phone</En52> و
            <En52>arrive/come on time</En52> و<En52>goal/goals</En52> إذا بقي التركيب سليمًا.
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="font-head text-xl font-bold text-slate-900">مفتاح الاختبار الكامل</h3>
        <ol className="mt-3 grid gap-2">
          {solutions.map((solution, index) => {
            const question = TEST_QUESTIONS_52[index];
            const correct = result.byQuestion[solution.id];
            return (
              <li
                key={solution.id}
                className={`rounded-2xl border-2 p-3 ${
                  correct ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/40"
                }`}
                data-teacher-q={solution.id}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                    {String(question.number).padStart(2, "0")}
                  </span>
                  <En52 className="text-base font-extrabold text-emerald-800">{solution.model}</En52>
                  <span className={`mr-auto text-sm font-bold ${correct ? "text-emerald-700" : "text-rose-600"}`}>
                    {correct ? "✓" : "✕"}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500" dir={/[A-Za-z]/.test(question.prompt) ? "ltr" : "rtl"}>
                  {question.prompt}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  <strong>التفسير: </strong>
                  <Mixed52 text={solution.why} />
                </p>
                {solution.alternatives && (
                  <p className="mt-1 text-xs text-slate-500">
                    <strong>بدائل مقبولة: </strong>
                    <Mixed52 text={solution.alternatives} />
                  </p>
                )}
                {solution.rejected && (
                  <p className="mt-1 text-xs text-slate-500">
                    <strong>أخطاء يرفضها التصحيح: </strong>
                    <Mixed52 text={solution.rejected} />
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="font-head text-lg font-bold text-slate-900">أجوبة القراءة والحوار النموذجية</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold text-slate-400">READING — 7 أسئلة</div>
            <ol className="mt-1 grid gap-2 text-sm">
              {READING_QUESTIONS_52.map((item) => (
                <li key={item.q} className="rounded-xl bg-slate-50 p-2">
                  <p dir="ltr" lang="en" className="font-en font-semibold text-slate-700">
                    {item.q}
                  </p>
                  <p dir="ltr" lang="en" className="font-en text-emerald-800">
                    {item.a}
                  </p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">DIALOGUE — 5 أسئلة</div>
            <ol className="mt-1 grid gap-2 text-sm">
              {DIALOGUE_QUESTIONS_52.map((item) => (
                <li key={item.q} className="rounded-xl bg-slate-50 p-2">
                  <p dir="ltr" lang="en" className="font-en font-semibold text-slate-700">
                    {item.q}
                  </p>
                  <p dir="ltr" lang="en" className="font-en text-emerald-800">
                    {item.a}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5">
        <h3 className="font-head text-lg font-bold text-slate-900">نموذج الكتابة والتحدث</h3>
        <pre dir="ltr" className="font-en mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
          {WRITING_52.model}
        </pre>
        <div className="mt-3 text-sm font-semibold text-slate-600">أسئلة التحدث السبعة:</div>
        <ol className="mt-1 grid gap-1 text-sm">
          {SPEAKING_52.questions.map((question) => (
            <li key={question} dir="ltr" className="font-en text-slate-700">
              {question}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-slate-500">
          لا يوجد تقييم صوتي آلي؛ المهمة شفهية ويقيّمها المعلم أو الطالب ذاتيًا وفق معايير: جمل كاملة، شرط أول، نبرة
          واضحة، ونتيجة مناسبة.
        </p>
      </section>
    </div>
  );
}
