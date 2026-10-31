import { En48, Mixed48 } from "./kit48";
import { READING_QUESTIONS_48 } from "./data";
import { TEST_LEVELS_48, TEST_QUESTIONS_48 } from "./testData48";
import { MODEL_48 } from "./Practice48";
import type { GradedTestResult48 } from "./testKey48";

const NUANCES_48 = [
  {
    title: "MUSTN'T ليست DON'T HAVE TO",
    body: "MUSTN'T منع صريح، وDON'T HAVE TO عدم إلزام. الطالب الذي يقرأ «It is forbidden» ويختار DON'T HAVE TO غيّر المعنى، والعكس صحيح. NEEDN'T أقرب إلى «لا حاجة» من DON'T HAVE TO لكنها لا تعني المنع.",
    en: "You mustn't go. / You don't have to go. / You needn't go.",
  },
  {
    title: "MAY / MIGHT / COULD ونسب الاحتمال",
    body: "كلها تعبّر عن الاحتمال. لا تُحفظ نسب مئوية ثابتة، ولا تُحوّل ملاحظة أن MIGHT قد تكون أكثر تحفظًا إلى قاعدة مطلقة. المطلوب في الاختبار قبول البدائل الصحيحة في سياق الاحتمال.",
    en: "It may rain. / It might rain. / It could rain.",
  },
  {
    title: "القدرة العامة والنجاح المحدد",
    body: "COULD للقدرة العامة في الماضي، وWAS/WERE ABLE TO للنجاح في فعل محدد. هذا فرق في الاستعمال والسياق؛ COULD ليست خطأ نحويًا في كل جملة ماضية.",
    en: "I could swim when I was six. / The door was locked, but I was able to open it.",
  },
  {
    title: "OUGHT TO وHAVE TO",
    body: "OUGHT هو الفعل الناقص الوحيد الذي يتبعه TO دائمًا. أما HAVE TO فيتصرف: has / had / will have، ويأخذ DO وDOES في السؤال والنفي.",
    en: "She ought to rest. / He has to rest. / Do you have to rest?",
  },
  {
    title: "WOULD RATHER مع فاعلين",
    body: "فاعل واحد: WOULD RATHER + V1. فاعلان مختلفان: WOULD RATHER + SUBJECT + PAST SIMPLE. الماضي هنا صيغة تفضيل مهذبة عن الحاضر أو المستقبل، لا إخبار عن حدث ماضٍ.",
    en: "I'd rather stay home. / I'd rather you stayed home.",
  },
  {
    title: "NEEDN'T HAVE + V3 هو تمهيد فقط",
    body: "الدرس 48 يعرّف التركيب ولا يفصّله: NEEDN'T HAVE + V3 يعني أن الفعل وقع دون حاجة إليه. أما DIDN'T NEED TO فالجملة وحدها لا تحدد هل وقع الفعل. التفصيل في الدرس 49.",
    en: "You needn't have bought so much food. / You didn't need to buy so much food.",
  },
];

/** Receives the already-submitted result; it never imports the answer key itself. */
export default function TeacherGuide48({ result }: { result: GradedTestResult48 }) {
  return (
    <div data-teacher-guide="48" className="l48-teacher-guide">
      <section className="l48-guide-note">
        <h3>كيف تُقرأ هذه المساحة؟</h3>
        <p>
          كل سؤال يعرض حكم إجابة الطالب، ثم الإجابة النموذجية والتعليل، ثم البدائل المقبولة وأسباب رفض الأخطاء الشائعة.
          التصحيح يقبل البدائل التي تحافظ على المعنى، ويرفض ما يغيّر الوظيفة أو الزمن أو الفاعل. الأسئلة المفتوحة تُقيَّم
          بأنماط نصية محدودة، فقد تحتاج صياغة صحيحة غير متوقعة إلى مراجعة يدوية.
        </p>
      </section>

      {TEST_LEVELS_48.map((level) => (
        <section key={level.level}>
          <div className="l48-level-header">
            <span className="l48-level-badge" aria-hidden="true">
              {String(level.level).padStart(2, "0")}
            </span>
            <div>
              <En48>{level.en}</En48>
              <h2>{level.title}</h2>
            </div>
          </div>
          {TEST_QUESTIONS_48.filter((q) => q.level === level.level).map((question) => {
            const solution = result.solutions[question.id];
            const correct = result.byQuestion[question.id];
            return solution ? (
              <article className="l48-practice-card" data-teacher-q={question.number} key={question.id}>
                <div className="l48-question-top">
                  <span className="l48-question-number">{String(question.number).padStart(2, "0")}</span>
                  <p dir="ltr" lang="en">
                    {question.prompt}
                  </p>
                </div>
                <p className={`l48-teacher-mark ${correct ? "is-correct" : "is-wrong"}`}>
                  {correct ? "✓ إجابة الطالب صحيحة" : "✕ إجابة الطالب تحتاج إلى مراجعة"}
                </p>
                <p>
                  <strong>الإجابة النموذجية: </strong>
                  <Mixed48 text={solution.model} />
                </p>
                <p>
                  <strong>التعليل: </strong>
                  <Mixed48 text={solution.why} />
                </p>
                {solution.alternatives && (
                  <p>
                    <strong>البدائل المقبولة: </strong>
                    <Mixed48 text={solution.alternatives} />
                  </p>
                )}
                {solution.rejected && (
                  <p>
                    <strong>ما يُرفض ولماذا: </strong>
                    <Mixed48 text={solution.rejected} />
                  </p>
                )}
              </article>
            ) : null;
          })}
        </section>
      ))}

      <section className="l48-guide-note" data-teacher-nuances>
        <h3>ملاحظات تعليمية حول الفروق الدقيقة</h3>
        <ul>
          {NUANCES_48.map((note) => (
            <li key={note.title}>
              <strong>{note.title}: </strong>
              <Mixed48 text={note.body} />
              <En48 className="l48-guide-en">{note.en}</En48>
            </li>
          ))}
        </ul>
      </section>

      <section className="l48-guide-note" data-teacher-reading>
        <h3>إجابات القراءة النموذجية (15 سؤالًا)</h3>
        <ol>
          {READING_QUESTIONS_48.map((item) => (
            <li key={item.q}>
              <span dir="auto">{item.q}</span>
              <p dir="auto">{item.answer}</p>
              <p className="l48-guide-ar">{item.ar}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="l48-guide-note" data-teacher-writing>
        <h3>نموذج الكتابة — A Day Full of Decisions</h3>
        <p dir="ltr" lang="en">
          {MODEL_48}
        </p>
        <p>
          المعايير الخمسة عشر في الدرس إرشادية: تتحقق من وجود الصيغ المطلوبة فقط، ولا تفحص المعنى ولا التصريف. راجع القصة
          مع الطالب يدويًا، خصوصًا مواضع MUSTN'T مقابل DON'T HAVE TO وWOULD RATHER + SUBJECT + PAST SIMPLE.
        </p>
      </section>

      <section className="l48-guide-note">
        <h3>بنية الاختبار وحماية المفتاح</h3>
        <p>
          عشرون سؤال اختيار وإكمال وتصحيح تُقيَّم بأنماط مرساة بعد تطبيع النص (حروف صغيرة، توحيد الفاصلة العليا، حذف
          الترقيم). سؤال الحوار الخامس والعشرون يُقيَّم فراغًا فراغًا: كل فراغ يقبل مجموعة بدائل محددة، ويُرفض الفعل
          الصحيح في الفراغ الخطأ. المفتاح وحده يحتوي الأنماط، ولا يُحمَّل إلا بعد التسليم.
        </p>
      </section>
    </div>
  );
}
