import { FIVE_SENTENCES_50, READING_QUESTIONS_50 } from "./data";
import { En50, Mixed50 } from "./kit50";
import { MODEL_50 } from "./Practice50";
import { TEST_QUESTIONS_50 } from "./testData50";
import type { GradedTestResult50 } from "./testKey50";

export type TeacherGuideProps50 = { result: GradedTestResult50 };

export default function TeacherGuide50({ result }: TeacherGuideProps50) {
  const wrong = TEST_QUESTIONS_50.filter((question) => !result.byQuestion[question.id]);
  // The submitted result carries only the twenty-five loaded solutions; the
  // guide never imports the key module, so a failed key chunk cannot break it.
  const solutions = TEST_QUESTIONS_50.flatMap((question) => {
    const solution = result.solutions[question.id];
    return solution ? [solution] : [];
  });
  return (
    <div className="l50-guide" data-teacher-guide>
      <section className="l50-guide-section">
        <h3>ملخص التصحيح</h3>
        <div className="l50-guide-grid">
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

      <section className="l50-guide-section">
        <h3>ملاحظات بيداغوجية على موضعين</h3>
        <p>
          في تدريب الاختيار الأول ترد جملة التذكيرات الثلاثة («They received three reminders»): الخيارات المعروضة تجعل{" "}
          <En50>can't have forgotten</En50> هي الإجابة الوحيدة المناسبة (دليل قوي ضد النسيان)، بينما <En50>mustn't</En50>{" "}
          تفيد المنع. اعتُمد هذا المفتاح ووُثّق؛ فهو يطابق أيضًا منطق سؤال الاختبار الثالث (المفكرات).
        </p>
        <p>
          سؤال التصحيح 17 («He can't be went to school») يقبل تصحيحين: <En50>can't have gone</En50> لاستنتاج عن الماضي، و
          <En50>can't be going</En50> لنشاط يحدث الآن. كلتاهما تحافظ على النفي القوي وتصحح <En50>went</En50>، فلا يُرفض
          أيٌّ منهما.
        </p>
      </section>

      <section className="l50-guide-section">
        <h3>مفتاح الاختبار الكامل</h3>
        <ol className="l50-guide-key">
          {solutions.map((solution, index) => {
            const question = TEST_QUESTIONS_50[index];
            const correct = result.byQuestion[solution.id];
            return (
              <li key={solution.id} className={correct ? "is-correct" : "is-wrong"} data-teacher-q={solution.id}>
                <div className="l50-guide-key-head">
                  <span className="l50-guide-key-no">{String(question.number).padStart(2, "0")}</span>
                  <span className="l50-guide-key-answer">
                    <En50>{solution.model}</En50>
                  </span>
                  <span className="l50-guide-key-mark" aria-hidden="true">
                    {correct ? "✓" : "✕"}
                  </span>
                </div>
                <p className="l50-guide-prompt" dir={/[A-Za-z]/.test(question.prompt) ? "ltr" : "rtl"}>
                  {question.prompt}
                </p>
                <p>
                  <strong>التفسير: </strong>
                  <Mixed50 text={solution.why} />
                </p>
                {solution.alternatives && (
                  <p>
                    <strong>بدائل مقبولة: </strong>
                    <Mixed50 text={solution.alternatives} />
                  </p>
                )}
                {solution.rejected && (
                  <p>
                    <strong>أخطاء يرفضها التصحيح: </strong>
                    <Mixed50 text={solution.rejected} />
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="l50-guide-section">
        <h3>أجوبة القراءة النموذجية</h3>
        <ol className="l50-guide-reading">
          {READING_QUESTIONS_50.map((item) => (
            <li key={item.q}>
              <p dir="ltr" lang="en">
                {item.q}
              </p>
              <p dir="ltr" lang="en">
                <strong>Model: </strong>
                {item.answer}
              </p>
              <p dir="rtl" lang="ar">
                <Mixed50 text={item.ar} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="l50-guide-section">
        <h3>الجمل الخمس ونموذج الكتابة</h3>
        <ul className="l50-guide-five">
          {FIVE_SENTENCES_50.map((item) => (
            <li key={item.n}>
              <En50>{item.en}</En50>
              <span>{item.fn}</span>
            </li>
          ))}
        </ul>
        <p dir="ltr" lang="en">
          {MODEL_50}
        </p>
        <p>النموذج استرشادي لتعليم البناء، وليس الإجابة الوحيدة المقبولة في مهمة الكتابة.</p>
      </section>
    </div>
  );
}
