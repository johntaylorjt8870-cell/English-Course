import { TEST_LEVELS_44, TEST_QUESTIONS_44, TEST_QUESTION_COUNT_44, testComplete44, type TestAnswers44 } from './testData44';
import { Glyph44, Label44, Text44 } from './kit44';

export function TestArea44({ answers, change, submitted, submit, reset, openSolutions }: {
  answers: TestAnswers44; change: (id: string, value: string) => void; submitted: boolean;
  submit: () => void; reset: () => void; openSolutions: () => void;
}) {
  const complete = testComplete44(answers);
  const count = TEST_QUESTIONS_44.filter(q => q.fields.every((_, i) => Boolean(answers[`${q.id}-${i}`]?.trim()))).length;
  return (
    <section data-area="test" data-source-section="s34" className="testArea44">
      <header className="testHead44">
        <p className="kicker44">ASSESSMENT · §34 · FIVE LEVELS</p>
        <h2 className="testTitle44">الاختبار النهائي — MUST &amp; HAVE TO</h2>
        <p className="testSub44">{TEST_QUESTION_COUNT_44} سؤالًا في خمسة مستويات. أجب من ذاكرتك؛ تُفتح الحلول بعد التسليم أو من مساحة المعلم.</p>
        <div className="testMeter44">
          <p role="status" className="testCount44">
            <span>أكملت</span>
            <b><bdi dir="ltr">{count} / {TEST_QUESTION_COUNT_44}</bdi></b>
            {submitted && <em>تم التسليم</em>}
          </p>
          <progress aria-label="تقدم الإجابات" value={count} max={TEST_QUESTION_COUNT_44} />
        </div>
      </header>

      <form onSubmit={e => { e.preventDefault(); if (complete && !submitted) submit(); }}>
        {TEST_LEVELS_44.map(level => (
          <section className="testLevel44" key={level.level} data-test-level={level.level} aria-labelledby={`level-title-${level.level}`}>
            <header className="levelHead44">
              <span className="levelNo44" aria-hidden="true">{String(level.level).padStart(2, '0')}</span>
              <h3 id={`level-title-${level.level}`}><Label44 text={level.title} /></h3>
              <span className="levelCount44"><bdi dir="ltr">{level.questions.length}</bdi> أسئلة</span>
            </header>
            {level.context.length > 0 && (
              <div className="testBrief44" aria-label="سياق المستوى الخامس">
                {level.context.map((line, i) => (
                  <p key={i} className={i === 1 ? 'testBriefTitle44' : line.includes(':') ? 'testBriefTurn44' : 'testBriefLine44'}>
                    <Text44 text={line} />
                  </p>
                ))}
              </div>
            )}
            <div className="testQuestions44">
              {level.questions.map(q => (
                <fieldset className="qField44" key={q.id} data-question-id={q.id} disabled={submitted}>
                  <legend className="qLegend44">
                    <span className="qNo44" aria-hidden="true">{q.number}</span>
                    <span>السؤال {q.number}</span>
                  </legend>
                  <div className="qLines44">
                    {q.lines.map((line, i) => <p key={i}><Text44 text={line} /></p>)}
                  </div>
                  {q.options.length > 0
                    ? <div className="options44">
                        {q.options.map((option, i) => {
                          const letter = option.match(/^([A-E])\./)?.[1] ?? ['A', 'B', 'C', 'D'][i];
                          return (
                            <label className="option44" key={option}>
                              <input type="radio" name={q.id} value={option} required
                                checked={answers[`${q.id}-0`] === option} onChange={() => change(`${q.id}-0`, option)} />
                              <span className="optionLetter44" aria-hidden="true">{letter}</span>
                              <span className="optionText44" dir="ltr" lang="en">{option.replace(/^[A-E]\.\s*/, '')}</span>
                            </label>
                          );
                        })}
                      </div>
                    : q.fields.map((label, i) => (
                        <label className="field44 field44--test" key={i}>
                          <span className="fieldLabel44">{label}</span>
                          <textarea rows={q.number >= 16 && q.number <= 20 ? 3 : 2} dir="auto" required
                            value={answers[`${q.id}-${i}`] ?? ''} onChange={e => change(`${q.id}-${i}`, e.target.value)} />
                        </label>
                      ))}
                </fieldset>
              ))}
            </div>
          </section>
        ))}

        <div className="testBar44">
          <div className="testBarMeta44">
            <p><b><bdi dir="ltr">{count} / {TEST_QUESTION_COUNT_44}</bdi></b> مكتمل</p>
            <p className="testBarHint44">{complete ? 'كل الأسئلة مكتملة — يمكنك التسليم' : 'أكمل كل سؤال، بما في ذلك حقلا السؤال 9، لفتح التسليم'}</p>
          </div>
          <div className="testBarActions44">
            {!submitted && <button type="submit" className="btn44 btn44--solid" disabled={!complete}>
              تسليم الاختبار <Glyph44 name="arrow" />
            </button>}
            {submitted && <button type="button" className="btn44 btn44--solid" onClick={openSolutions}>مراجعة الحلول</button>}
            <button type="button" className="btn44 btn44--ghost" onClick={reset}>إعادة الاختبار</button>
          </div>
        </div>
      </form>
    </section>
  );
}
