import { En47, Mixed47 } from "./kit47";
import { TEST_LEVELS_47, TEST_QUESTIONS_47 } from "./testData47";
import type { GradedTestResult47 } from "./testKey47";

/** Receives the already-submitted result; it never independently imports the key. */
export default function TeacherGuide47({ result }: { result: GradedTestResult47 }) {
  return (
    <div data-teacher-guide="47" className="l47-teacher-guide">
      <section className="l47-guide-note">
        <h3>كيف تُقرأ هذه المساحة؟</h3>
        <p>
          كل سؤال يعرض إجابة الطالب وحكمها، ثم الإجابة النموذجية والتعليل. التصحيح يقبل البدائل الصحيحة المحافظة على المعنى،
          ويرفض ما يغيّر الوظيفة أو الزمن أو الفاعل. الأسئلة المفتوحة تُقيَّم بأنماط نصية محدودة، فقد تحتاج مراجعة يدوية
          لصياغة صحيحة غير متوقعة.
        </p>
      </section>

      {TEST_LEVELS_47.map((level) => (
        <section key={level.level}>
          <div className="l47-level-header">
            <span className="l47-level-badge" aria-hidden="true">{String(level.level).padStart(2, "0")}</span>
            <div>
              <En47>{level.en}</En47>
              <h2>{level.title}</h2>
            </div>
          </div>
          {TEST_QUESTIONS_47.filter((q) => q.level === level.level).map((question) => {
            const solution = result.solutions[question.id];
            const correct = result.byQuestion[question.id];
            return solution ? (
              <article className="l47-practice-card" data-teacher-q={question.number} key={question.id}>
                <div className="l47-question-top">
                  <span className="l47-question-number">{String(question.number).padStart(2, "0")}</span>
                  <p dir="ltr" lang="en">{question.prompt}</p>
                </div>
                <p className={`l47-teacher-mark ${correct ? "is-correct" : "is-wrong"}`}>
                  {correct ? "✓ إجابة الطالب صحيحة" : "✕ إجابة الطالب تحتاج إلى مراجعة"}
                </p>
                <p><strong>الإجابة النموذجية: </strong><Mixed47 text={solution.model} /></p>
                <p><strong>التعليل: </strong><Mixed47 text={solution.why} /></p>
              </article>
            ) : null;
          })}
        </section>
      ))}

      <section className="l47-guide-note">
        <h3>قاعدة الفاعلين في WOULD RATHER</h3>
        <p>
          فاعل واحد: <En47>I&rsquo;d rather stay home.</En47> — بعده V1.
          فاعلان مختلفان: <En47>I&rsquo;d rather you stayed home.</En47> — بعده ماضٍ بسيط.
          الماضي هنا صيغة تفضيل مهذبة عن الحاضر أو المستقبل، لا إخبار عن حدث ماضٍ. ولذلك تُقبل
          <En47>stayed</En47> في السؤال 10، وتُرفض <En47>stay</En47> في ذلك التركيب، مع بقاء
          <En47>I&rsquo;d rather stay home</En47> صحيحة لأن الفاعل واحد.
        </p>
      </section>

      <section className="l47-guide-note">
        <h3>إجابة No, not at all بعد WOULD YOU MIND</h3>
        <p>
          السؤال عن الممانعة لا عن الرغبة: <En47>Would you mind opening the window?</En47> تعني «هل يضايقك أن تفتح النافذة؟».
          إجابة <En47>No, not at all.</En47> تعني «لا، لا أمانع إطلاقًا»، أي الموافقة على تنفيذ الطلب. أما
          <En47>Would you like some tea?</En47> فتُجاب بـ<En47>Yes, please.</En47>؛ لأنها عرض لا سؤال ممانعة.
        </p>
      </section>
    </div>
  );
}
