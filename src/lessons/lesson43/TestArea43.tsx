import { En43, Text43, Tip43, Panel43 } from "./design43";
import { answeredCount43, fieldKey43, EXAM_INTRO_43, TEST_LEVELS_43, TEST_QUESTIONS_43, testComplete43 } from "./testData43";

/**
 * مساحة الاختبار — تقدم الأسئلة 25 أسئلة على خمسة مستويات، وتجمع
 * إجابات الطالب وتحسمها في الخانة. لا تحتوي هذه الوحدة على مفتاح
 * التصحيح ولا على النص المصدر: يُستورد مفتاح التصحيح عند الحسم فقط.
 */
export function TestArea43({
  answers,
  submitted,
  level,
  items,
  onChange,
  onSubmit,
  onReset,
}: {
  answers: Record<string, string>;
  submitted: boolean;
  level: number;
  items: [number, number];
  onChange: (key: string, value: string) => void;
  onSubmit: (result: { score: number; total: number }) => void;
  onReset: () => void;
}) {
  const complete = testComplete43(answers);
  const answered = answeredCount43(answers);

  const set = (id: string, fieldKey: string, value: string) => {
    onChange(fieldKey43(id, fieldKey), value);
  };

  const submit = async () => {
    if (!complete || submitted) return;
    const { grade43 } = await import("./key43");
    onSubmit(grade43(answers));
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Panel43 title="تقييم الدرس" kicker="EXAM · 25 QUESTIONS · 5 LEVELS">
        {EXAM_INTRO_43.map((line) => (
          <p key={line} className="text-sm font-bold text-slate-600">
            <Text43 text={line} />
          </p>
        ))}
        <p role="status" className="mt-2 text-sm font-bold text-slate-500">
          <Text43 text="الإجابات المستوفاة:" /> <bdi dir="ltr">{answered} / {TEST_QUESTIONS_43.length}</bdi>
        </p>
        {submitted && (
          <p role="status" className="mt-2 rounded-2xl border-2 border-violet-100 bg-violet-50 px-3 py-2 text-base font-bold text-violet-900">
            <Text43 text="تم الحسم. انتقل إلى الشريحة التالية للاطلاع على النتيجة." />
          </p>
        )}
        <div className="mt-3 space-y-6">
          {TEST_LEVELS_43.filter((entry) => entry.level === level).map((entry) => (
            <section key={entry.level} data-test-level={entry.level} className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
              <p className="text-sm font-bold text-violet-700">
                <Text43 text={entry.title} />
              </p>
              {entry.questions
                .filter((question) => question.number >= items[0] && question.number <= items[1])
                .map((question) => {
                return (
                  <article key={question.id} data-question-id={question.id} className="mt-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                    <p className="text-xs font-bold text-slate-500">
                      {question.number}. {question.levelLabel}
                    </p>
                    {question.lines.map((line) => (
                      <p key={line} className="mt-1 text-base font-bold text-slate-800">
                        <Text43 text={line} />
                      </p>
                    ))}
                    {level >= 5 && entry.context && (
                      <div className="mt-2 space-y-1 rounded-xl border border-slate-100 bg-white px-3 py-2">
                        {entry.context.map((line) => (
                          <p key={line} className="text-sm font-medium text-slate-600">
                            <Text43 text={line} />
                          </p>
                        ))}
                      </div>
                    )}
                    {question.fields.map((field) => (
                      <label key={field.key} className="mt-2 block text-sm font-bold text-slate-600">
                        <Text43 text={field.label} />
                        <textarea
                          dir="ltr"
                          rows={field.label.length > 24 ? 2 : 1}
                          value={answers[fieldKey43(question.id, field.key)] ?? ""}
                          onChange={(event) => set(question.id, field.key, event.target.value)}
                          className="font-en mt-1 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-base font-medium text-slate-800 outline-none transition focus:border-violet-400"
                        />
                      </label>
                    ))}
                    {question.options && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {question.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={answers[fieldKey43(question.id, question.fields[0].key)] === option}
                            onClick={() => set(question.id, question.fields[0].key, option)}
                            className={`rounded-xl border-2 px-3 py-2 text-sm font-bold transition ${
                              answers[fieldKey43(question.id, question.fields[0].key)] === option
                                ? "border-violet-500 bg-violet-600 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-violet-300"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </section>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={!complete || submitted}
            onClick={() => void submit()}
            data-test-submit
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition enabled:hover:bg-slate-700 disabled:opacity-40"
          >
            <Text43 text="submit answers" />
          </button>
          {submitted && (
            <button type="button" onClick={onReset} className="rounded-xl border-2 border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-700">
              <Text43 text="reset" />
            </button>
          )}
        </div>
        <Tip43>
          <Text43 text="يكتب الطالب أجوبته في المستطيل المخصص ثم يضغط submit. التقييم يحسب الإجابات الصحيحة فقط، ولا تُعرض النماذج هنا." />
        </Tip43>
      </Panel43>
    </div>
  );
}
