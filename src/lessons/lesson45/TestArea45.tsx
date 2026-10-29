import { useState } from "react";
import { TEST_QUESTIONS_45 } from "./testData45";

type Props = { onSubmitted: (score: number) => void; submitted: boolean };

const ACCEPTED_ANSWERS: Record<string, string[]> = {
  q6: ["shouldn't", "should not"],
  q7: ["ought to apologise", "ought to apologize"],
  q8: ["should have left"],
  q9: ["shouldn't have eaten", "should not have eaten"],
  q11: ["she should study more"],
  q12: ["you ought to study harder"],
  q13: ["should i leave now"],
  q14: ["he should have gone home earlier"],
  q15: ["you had better take an umbrella"],
  q16: [
    "advice; obligation",
    "advice and obligation",
    "should gives advice; must expresses obligation",
    "should is advice; must is a strong obligation",
    "should is advice while must is obligation",
    "should gives advice while must gives strong obligation",
  ],
  q17: [
    "advice; prohibition",
    "advice and prohibition",
    "shouldn't gives advice; mustn't expresses prohibition",
    "shouldn't is advice; mustn't is prohibition",
    "should not is advice; must not is prohibition",
    "shouldn't is advice against something; mustn't is a prohibition",
  ],
  q18: [
    "past regret",
    "regret about the past",
    "regret about something in the past",
    "criticism of a past action",
    "regret or criticism about a past action",
  ],
  q19: ["expectation", "a reasonable expectation", "expected future result", "expectation about the future"],
  q20: [
    "stronger advice; consequence",
    "stronger advice and consequence",
    "had better gives stronger advice and warns of a possible consequence",
    "had better is stronger advice with a possible negative consequence",
    "stronger advice with a possible consequence",
  ],
  q21: ["should"],
  q22: ["should"],
  q23: ["should", "should have"],
  q24: ["shouldn't", "should not", "shouldn't have", "should not have"],
  q25: ["should"],
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isAcceptedAnswer(questionId: string, value: string, expected: string): boolean {
  const actual = normalize(value);
  if (!actual) return false;

  const accepted = [expected, ...(ACCEPTED_ANSWERS[questionId] ?? [])].map(normalize);
  if (accepted.includes(actual)) return true;

  // Written explanations are graded by the key ideas, not exact punctuation or wording.
  if (questionId === "q16") {
    return /\b(advice|recommendation)\b/.test(actual) &&
      /\b(obligation|must|necessary|compulsory)\b/.test(actual);
  }
  if (questionId === "q17") {
    return /\b(advice|recommendation)\b/.test(actual) &&
      /\b(prohibition|forbidden|not allowed|ban)\b/.test(actual);
  }
  if (questionId === "q18") {
    return /\b(regret|sorry|criticism)\b/.test(actual) &&
      /\b(past|before|earlier|already|did)\b/.test(actual);
  }
  if (questionId === "q19") {
    return /\b(expectation|expected|likely|probably)\b/.test(actual);
  }
  if (questionId === "q20") {
    return /\b(stronger|strong)\b/.test(actual) &&
      /\b(advice|warning|consequence|result)\b/.test(actual);
  }
  return false;
}

export default function TestArea45({ onSubmitted, submitted }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState(false);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (graded || loading) return;
    setLoading(true);
    try {
      const mod = await import("./testKey45");
      let points = 0;
      for (const question of TEST_QUESTIONS_45) {
        const expected = mod.TEST_KEY_45[question.id] ?? "";
        const answer = answers[question.id] ?? "";
        const correct = question.type === "choice"
          ? normalize(answer) === normalize(expected)
          : isAcceptedAnswer(question.id, answer, expected);
        if (correct) points++;
      }
      setScore(points);
      setKey(mod.TEST_KEY_45);
      setGraded(true);
      onSubmitted(points);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAnswers({});
    setGraded(false);
    setScore(0);
    setKey(null);
  };

  return (
    <section className="l45-test">
      <header className="l45-test-head">
        <div className="l45-orbit">🏆</div>
        <p className="l45-kicker">FINAL ASSESSMENT · LESSON 45</p>
        <h1>SHOULD & OUGHT TO Master Test</h1>
        <p>25 سؤالًا · خمسة مستويات · لا تُكشف الإجابات قبل التسليم</p>
        {graded && (
          <div className="l45-score" role="status" aria-live="polite">
            <strong>{score} / {TEST_QUESTIONS_45.length}</strong>
            <span>{score >= 22 ? "إتقان ممتاز!" : score >= 17 ? "عمل جيد، راجع النقاط التي أخطأت فيها." : "راجع المحطات ثم أعد المحاولة."}</span>
          </div>
        )}
      </header>

      {[1, 2, 3, 4, 5].map(level => (
        <div className="l45-test-level" key={level}>
          <h2>المستوى {["الأول · Multiple Choice", "الثاني · Complete the Sentences", "الثالث · Correct the Mistakes", "الرابع · Understand the Meaning", "الخامس · IQ200 Boss"][level - 1]}</h2>
          {TEST_QUESTIONS_45.filter(question => question.level === level).map(question => (
            <fieldset className="l45-question" key={question.id} disabled={graded}>
              <legend><bdi dir="ltr">{question.id.toUpperCase()}</bdi> · {question.prompt}</legend>
              {question.type === "choice" ? (
                <div className="l45-options">
                  {question.options?.map(option => (
                    <label key={option} className={answers[question.id] === option ? "is-picked" : ""}>
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => setAnswers(previous => ({ ...previous, [question.id]: option }))}
                      />
                      <bdi dir="ltr">{option}</bdi>
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  className="l45-answer-input"
                  dir="auto"
                  value={answers[question.id] ?? ""}
                  onChange={event => setAnswers(previous => ({ ...previous, [question.id]: event.target.value }))}
                  placeholder="اكتب إجابتك هنا..."
                  aria-label={`الإجابة عن ${question.id}`}
                />
              )}
              {graded && key && (
                <div className={answers[question.id]?.trim() ? "l45-feedback" : "l45-feedback is-empty"}>
                  <span>الإجابة النموذجية:</span> <bdi dir="ltr">{key[question.id]}</bdi>
                </div>
              )}
            </fieldset>
          ))}
        </div>
      ))}

      {!graded ? (
        <div className="l45-test-actions">
          <button className="l45-primary" onClick={submit} disabled={loading}>
            {loading ? "جارٍ التصحيح..." : "تسليم الاختبار وتصحيح الإجابات"}
          </button>
          <span>المجاب عنه: {Object.values(answers).filter(value => value.trim()).length} / {TEST_QUESTIONS_45.length}</span>
        </div>
      ) : (
        <div className="l45-test-actions">
          <button className="l45-primary" onClick={reset}>إعادة الاختبار</button>
          <p>تم فتح مراجعة الإجابات بعد التسليم.</p>
        </div>
      )}
    </section>
  );
}
