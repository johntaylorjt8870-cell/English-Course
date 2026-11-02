import { FIVE_SENTENCES_51, READING_QUESTIONS_51 } from "./data";
import { En51, Mixed51 } from "./kit51";
import { MODEL_51 } from "./Practice51";
import { TEST_QUESTIONS_51 } from "./testData51";
import type { GradedTestResult51 } from "./testKey51";

export type TeacherGuideProps51 = { result: GradedTestResult51 };

export default function TeacherGuide51({ result }: TeacherGuideProps51) {
  const wrong = TEST_QUESTIONS_51.filter((question) => !result.byQuestion[question.id]);
  // The submitted result carries only the twenty-five loaded solutions; the
  // guide never imports the key module, so a failed key chunk cannot break it.
  const solutions = TEST_QUESTIONS_51.flatMap((question) => {
    const solution = result.solutions[question.id];
    return solution ? [solution] : [];
  });
  return (
    <div className="l51-guide" data-teacher-guide>
      <section className="l51-guide-section">
        <h3>ملخص التصحيح</h3>
        <div className="l51-guide-grid">
          <div>
            <span>المجموع</span>
            <bdi dir="ltr">
              {result.score} / {result.total}
            </bdi>
          </div>
          {[1, 2, 3, 4].map((level) => (
            <div key={level}>
              <span>المجموعة {level}</span>
              <bdi dir="ltr">
                {result.byLevel[level]?.score ?? 0} / {result.byLevel[level]?.total ?? 0}
              </bdi>
            </div>
          ))}
        </div>
        <p>
          توزيع الاختبار: 10 اختيار من متعدد، 5 إكمال، 5 تصحيح، 5 ترجمة. الدرجة من 25، وكل سؤال بدرجة واحدة. لا تُمنح
          درجة جزئية داخل السؤال، لكن التصحيح يقبل البدائل الصحيحة المذكورة أدناه.
        </p>
        {wrong.length > 0 ? (
          <p>
            <strong>الأسئلة غير الصحيحة: </strong>
            <bdi dir="ltr">{wrong.map((question) => question.number).join("، ")}</bdi>
          </p>
        ) : (
          <p>
            <strong>لا أخطاء في هذه المحاولة.</strong>
          </p>
        )}
      </section>

      <section className="l51-guide-section">
        <h3>ملاحظات بيداغوجية على موضعين</h3>
        <p>
          سؤال التصحيح 18 («If you will heat ice, it melts») يقبل تصحيحين:{" "}
          <En51>If you heat ice, it melts.</En51> صيغة الشرط الصفري المطلوبة للحقيقة العامة، و<En51>If you heat ice, it
          will melt.</En51> تصحيح نحوي مقبول في سياق توقع مستقبلي — لأن كليهما يزيل <En51>will</En51> من جزء{" "}
          <En51>IF</En51>. وضّح للطالب أن الأولى هي نموذج الدرس.
        </p>
        <p>
          في أسئلة الترجمة يُقبل اختلاف ترتيب الكلمات و<span dir="ltr">have</span> بدل <span dir="ltr">drink</span> و
          <span dir="ltr">the battery</span> بدل <span dir="ltr">its battery</span> متى بقيت المعنى والتصريف صحيحين.
          الأسئلة التي تحمل <En51>tomorrow / tonight / will</En51> تُصنَّف شرطًا أولًا، ولا تُصحَّح إلى شرط صفري.
        </p>
      </section>

      <section className="l51-guide-section">
        <h3>مفتاح الاختبار الكامل</h3>
        <ol className="l51-guide-key">
          {solutions.map((solution, index) => {
            const question = TEST_QUESTIONS_51[index];
            const correct = result.byQuestion[solution.id];
            return (
              <li key={solution.id} className={correct ? "is-correct" : "is-wrong"} data-teacher-q={solution.id}>
                <div className="l51-guide-key-head">
                  <span className="l51-guide-key-no">{String(question.number).padStart(2, "0")}</span>
                  <span className="l51-guide-key-answer">
                    <En51>{solution.model}</En51>
                  </span>
                  <span className="l51-guide-key-mark" aria-hidden="true">
                    {correct ? "✓" : "✕"}
                  </span>
                </div>
                <p className="l51-guide-prompt" dir={/[A-Za-z]/.test(question.prompt) ? "ltr" : "rtl"}>
                  {question.prompt}
                </p>
                <p>
                  <strong>التفسير: </strong>
                  <Mixed51 text={solution.why} />
                </p>
                {solution.alternatives && (
                  <p>
                    <strong>بدائل مقبولة: </strong>
                    <Mixed51 text={solution.alternatives} />
                  </p>
                )}
                {solution.rejected && (
                  <p>
                    <strong>أخطاء يرفضها التصحيح: </strong>
                    <Mixed51 text={solution.rejected} />
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="l51-guide-section">
        <h3>أجوبة القراءة النموذجية</h3>
        <ol className="l51-guide-reading">
          {READING_QUESTIONS_51.map((item) => (
            <li key={item.q}>
              <p dir="ltr" lang="en">
                {item.q}
              </p>
              <p dir="ltr" lang="en">
                <strong>Model: </strong>
                {item.answer}
              </p>
              <p dir="rtl" lang="ar">
                <Mixed51 text={item.ar} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="l51-guide-section">
        <h3>الجمل الخمس ونموذج الكتابة</h3>
        <ul className="l51-guide-five">
          {FIVE_SENTENCES_51.map((item) => (
            <li key={item.n}>
              <En51>{item.en}</En51>
              <span>{item.fn}</span>
            </li>
          ))}
        </ul>
        <p dir="ltr" lang="en">
          {MODEL_51}
        </p>
        <p>النموذج استرشادي لتعليم البناء، وليس الإجابة الوحيدة المقبولة في مهمة الكتابة.</p>
      </section>
    </div>
  );
}
