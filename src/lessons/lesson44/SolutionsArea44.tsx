import { TEST_SOLUTIONS_44 } from './solutionsData44';
import { TEST_LEVELS_44, TEST_QUESTIONS_44, TEST_QUESTION_COUNT_44, type TestAnswers44 } from './testData44';
import { Label44, Text44 } from './kit44';

/** Splits the provenance sentence and the Arabic "السبب:" label from the
 *  explanation so neither can drag the other across the bidi run. */
function Reason44({ text }: { text: string }) {
  const why = text.match(/^(Source key:\s*.*?)\.\s*(السبب:)\s*([\s\S]+)$/);
  if (why) {
    return (
      <>
        <span className="solKey44 block" dir="ltr">{why[1]}.</span>{' '}
        <span className="solWhy44">{why[2]}</span>{' '}
        <Text44 text={why[3]} />
      </>
    );
  }
  const key = text.match(/^(Source key:\s*[^.]*\.)\s+([\s\S]+)$/);
  if (key) {
    return (
      <>
        <span className="solKey44 block" dir="ltr">{key[1]}</span>{' '}
        <Text44 text={key[2]} />
      </>
    );
  }
  return <Text44 text={text} />;
}

export default function SolutionsArea44({ answers = {}, teacher = false }: { answers?: TestAnswers44; teacher?: boolean }) {
  return (
    <section data-area="solutions" className="solutions44">
      <header className="solutionsHead44">
        <p className="kicker44">REVIEW · 25 KEYS</p>
        <h2 className="solutionsTitle44">الحلول التفصيلية</h2>
        <p className="solutionsIntro44">
          كل سؤال مع إجابته وسببه. هذه مراجعة ذاتية بالمقارنة، وليست درجة آلية.
          {!teacher && ' تظهر إجابتك بجانب المفتاح لتقارنها.'}
        </p>
        <p className="solutionsProv44">
          <span className="chipTag44">مفتاح المصدر</span>
          <span className="chipTag44 chipTag44--soft">شرح المنصة</span>
          <span className="solutionsCount44"><bdi dir="ltr">{TEST_QUESTION_COUNT_44}</bdi> سؤالًا</span>
        </p>
      </header>

      {TEST_LEVELS_44.map(level => (
        <section className="solLevel44" key={level.level} aria-labelledby={`sol-level-${level.level}`}>
          <header className="levelHead44 levelHead44--solutions">
            <span className="levelNo44" aria-hidden="true">{String(level.level).padStart(2, '0')}</span>
            <h3 id={`sol-level-${level.level}`}><Label44 text={level.title} /></h3>
          </header>
          <div className="solCards44">
            {level.questions.map(q => {
              const solution = TEST_SOLUTIONS_44[q.number - 1];
              const question = TEST_QUESTIONS_44[q.number - 1];
              const given = question.fields.map((_, i) => answers[`${solution.id}-${i}`]).filter(Boolean).join(' · ');
              return (
                <article className="solCard44" key={solution.id}>
                  <div className="solTop44">
                    <span className="qNo44" aria-hidden="true">{solution.number}</span>
                    <span className="solLabel44">السؤال {solution.number}</span>
                  </div>
                  <div className="solQuestion44">
                    {question.lines.map((line, i) => <p key={i}><Text44 text={line} /></p>)}
                  </div>
                  {!teacher && (
                    <div className="solGiven44">
                      <span>إجابتك</span>
                      <p>{given ? <Text44 text={given} /> : <em>لم تجب</em>}</p>
                    </div>
                  )}
                  <div className="solAnswer44">
                    <span>الإجابة</span>
                    <p><Text44 text={solution.answer} /></p>
                  </div>
                  <p className="solReason44"><Reason44 text={solution.reason} /></p>
                  <p className="solProv44">{solution.provenance}</p>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}
