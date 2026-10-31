import { READING_QUESTIONS_49, SIX_COMPARISONS_49 } from "./data";
import { En49, Mixed49 } from "./kit49";
import { MODEL_49 } from "./Practice49";
import { TEST_QUESTIONS_49 } from "./testData49";
import type { GradedTestResult49 } from "./testKey49";

export type TeacherGuideProps49 = { result: GradedTestResult49 };

export default function TeacherGuide49({ result }: TeacherGuideProps49) {
  const wrong = TEST_QUESTIONS_49.filter((question) => !result.byQuestion[question.id]);
  // The submitted result carries only the twenty-five loaded solutions; the
  // guide never imports the key module, so a failed key chunk cannot break it.
  const solutions = TEST_QUESTIONS_49.flatMap((question) => {
    const solution = result.solutions[question.id];
    return solution ? [solution] : [];
  });
  return (
    <div className="l49-guide" data-teacher-guide>
      <section className="l49-guide-section">
        <h3>ملخص التصحيح</h3>
        <div className="l49-guide-grid">
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

      <section className="l49-guide-section">
        <h3>ملاحظة على السؤالين 3 و4</h3>
        <p>
          في مفتاح الإجابة الأصلي كان الاختيار المقصود في السؤال 3 هو <En49>should have</En49> وفي السؤال 4 هو{" "}
          <En49>needn&apos;t have</En49>. لكن نص السؤالين يحتوي أصلًا على <En49>have</En49> بعد الفراغ، فاختيار تلك
          الصيغة ينتج <En49>should have have told</En49> و<En49>needn&apos;t have have bought</En49>. لذلك اعتُمد
          المفتاح <En49>should</En49> و<En49>needn&apos;t</En49> مع إبقاء معنى Modal Perfect، ووُثّق التغيير في
          ملف التغطية. هذا تصحيح لغوي لا حذف لمحتوى.
        </p>
      </section>

      <section className="l49-guide-section">
        <h3>مفتاح الاختبار الكامل</h3>
        <ol className="l49-guide-key">
          {solutions.map((solution, index) => {
            const question = TEST_QUESTIONS_49[index];
            const correct = result.byQuestion[solution.id];
            return (
              <li key={solution.id} className={correct ? "is-correct" : "is-wrong"} data-teacher-q={solution.id}>
                <div className="l49-guide-key-head">
                  <span className="l49-guide-key-no">{String(question.number).padStart(2, "0")}</span>
                  <span className="l49-guide-key-answer">
                    <En49>{solution.model}</En49>
                  </span>
                  <span className="l49-guide-key-mark" aria-hidden="true">
                    {correct ? "✓" : "✕"}
                  </span>
                </div>
                <p className="l49-guide-prompt" dir={/[A-Za-z]/.test(question.prompt) ? "ltr" : "rtl"}>
                  {question.prompt}
                </p>
                <p>
                  <strong>التفسير: </strong>
                  <Mixed49 text={solution.why} />
                </p>
                {solution.alternatives && (
                  <p>
                    <strong>بدائل مقبولة: </strong>
                    <Mixed49 text={solution.alternatives} />
                  </p>
                )}
                {solution.rejected && (
                  <p>
                    <strong>أخطاء يرفضها التصحيح: </strong>
                    <Mixed49 text={solution.rejected} />
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="l49-guide-section">
        <h3>أجوبة القراءة النموذجية</h3>
        <ol className="l49-guide-reading">
          {READING_QUESTIONS_49.map((item) => (
            <li key={item.q}>
              <p dir="ltr" lang="en">
                {item.q}
              </p>
              <p dir="ltr" lang="en">
                <strong>Model: </strong>
                {item.answer}
              </p>
              <p dir="rtl" lang="ar">
                <Mixed49 text={item.ar} />
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="l49-guide-section">
        <h3>الكتابة والتحدث</h3>
        <p>
          <strong>نموذج الكتابة (استرشادي): </strong>
        </p>
        <p dir="ltr" lang="en" className="l49-guide-model">
          {MODEL_49}
        </p>
        <p>
          المدقق في مساحة الطالب يفحص وجود الصيغ الظاهرة وعدد الجمل فقط. لا يدّعي تقييم المعنى أو التصريف أو الطلاقة؛
          راجع النص يدويًا وسجّل ملاحظاتك على: صحة V3، وجود HAVE، ملاءمة الوظيفة للموقف، وترابط القصة. الأسئلة الستة
          للتحدث موجودة في مساحة الطالب، ومهمتها دقيقة إلى دقيقتين.
        </p>
      </section>

      <section className="l49-guide-section">
        <h3>خطة علاجية سريعة</h3>
        <ul className="l49-guide-plan">
          <li>
            <strong>خطأ HAS/HAD بعد المودال: </strong>
            <Mixed49 text="أعد رسم الصيغة: modal + HAVE + V3، ثم درّب الطالب على Must has → Must have." />
          </li>
          <li>
            <strong>V1/V2 بدل V3: </strong>
            <Mixed49 text="ارجع إلى ورشة V3 واطلب تصريف عشرة أفعال شائعة، ثم ضعها داخل جمل كاملة." />
          </li>
          <li>
            <strong>خلط SHOULD HAVE وCOULD HAVE: </strong>
            <Mixed49 text="اطلب من الطالب تحديد: هل الجملة لوم/نصيحة أم إمكانية كانت متاحة؟ قبل اختيار الصيغة." />
          </li>
          <li>
            <strong>خلط NEEDN'T HAVE وDIDN'T NEED TO: </strong>
            <Mixed49 text="ذكّره أن NEEDN'T HAVE + V3 تؤكد وقوع الفعل، أما DIDN'T NEED TO فلا تحسمه وحدها." />
          </li>
        </ul>
      </section>

      <section className="l49-guide-section">
        <h3>حدود التقييم الآلي</h3>
        <p>
          التصحيح يقبل الصيغ والبدائل المدرجة في المفتاح، ويرفض التصريف الخاطئ وتكرار HAVE. لا يستطيع الحكم على جودة
          الترجمة الأدبية ولا على الطلاقة الشفهية، ولا على صحة كل جملة في نص حر. هذه مسؤولية المعلم.
        </p>
        <p className="l49-guide-mini">
          للمقارنة الدلالية، يعتمد الدرس على ستة فروق محورية، منها:{" "}
          <En49>{SIX_COMPARISONS_49[0].en}</En49> (<Mixed49 text={SIX_COMPARISONS_49[0].ar} />)، و<En49>{SIX_COMPARISONS_49[1].en}</En49> (<Mixed49 text={SIX_COMPARISONS_49[1].ar} />).
        </p>
      </section>
    </div>
  );
}
