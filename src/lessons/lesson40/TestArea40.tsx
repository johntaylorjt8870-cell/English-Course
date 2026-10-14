import { Chip40, EnBidi, MixedBidi, SourceLine40 } from "./kit40";
import {
  TEST_HEADER_LINES_40,
  TEST_LEVELS_40,
  TEST_QUESTION_COUNT_40,
} from "./testData40";

// ============================================================
// Lesson 40 — منطقة الاختبار النهائي الشامل المستقلة (TestArea40)
//
// ضمانات العزل الصارم:
//   • لا يستورد هذا المكوّن ملفات الحلول إطلاقًا.
//   • لا يعرض أي درجة أو تصحيح أو إجابة نموذجية لا قبل التسليم ولا بعده داخل هذه المنطقة.
//   • بعد التسليم ينتقل الطالب إلى منطقة الحلول لمراجعة إجاباته.
// ============================================================

export function TestArea40({
  answers,
  onChangeAnswer,
  submitted,
  onSubmit,
  onReset,
  onOpenSolutions,
  onBackToStudent,
}: {
  answers: Record<string, string>;
  onChangeAnswer: (questionId: string, value: string) => void;
  submitted: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onOpenSolutions: () => void;
  onBackToStudent: () => void;
}) {
  const answeredCount = Object.values(answers).filter((v) => v.trim().length > 0).length;

  return (
    <section
      id="lesson40-test"
      dir="rtl"
      data-source-section="s25"
      aria-label="الاختبار النهائي الشامل — الدرس 40"
      className="space-y-6"
    >
      {/* ترويسة الاختبار وأسطر المصدر 0–1 */}
      <div className="rounded-3xl border border-[#b9c8c0] bg-[#fffdf8] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4dfd2] pb-3">
          <Chip40 label="تقييم مستقل — 25 سؤالًا (5 مستويات × 5)" tone="teal" />
          <Chip40
            label={`المجاب عنه: ${answeredCount} / ${TEST_QUESTION_COUNT_40}`}
            tone={answeredCount === TEST_QUESTION_COUNT_40 ? "emerald" : "amber"}
          />
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17354a]">
          <MixedBidi>🏆 25. الاختبار النهائي الشامل — Future Tenses Grand Exam</MixedBidi>
        </h2>

        <div className="space-y-2.5">
          {TEST_HEADER_LINES_40.map((line) => (
            <SourceLine40 key={line.lineIndex} line={line.text} index={line.lineIndex} sectionId="s25" />
          ))}
        </div>

        <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-4 text-xs sm:text-sm font-bold text-[#17354a] leading-[1.85]">
          <MixedBidi>
            تعليمات التقييم النزيه: لا يظهر أي تصحيح فوري داخل ورقة الاختبار. أجب عن الأسئلة الـ25 في المستويات الخمسة، ثم اضغط «تسليم الاختبار النهائي» لفتح منطقة الحلول التفصيلية ومقارنة إجاباتك بمفتاح التصحيح.
          </MixedBidi>
        </div>
      </div>

      {/* المستويات الخمسة (1–5) */}
      {TEST_LEVELS_40.map((levelBlock) => (
        <div
          key={levelBlock.level}
          data-test-level={levelBlock.level}
          className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-5 sm:p-7 shadow-sm space-y-5"
        >
          <div className="space-y-2 border-b border-[#e4dfd2] pb-3">
            <div>
              <Chip40 label={`المستوى ${levelBlock.level} · 5 أسئلة`} tone="teal" />
            </div>
            <SourceLine40
              line={levelBlock.titleLine.text}
              index={levelBlock.titleLine.lineIndex}
              sectionId="s25"
            />
          </div>

          {levelBlock.introLines && levelBlock.introLines.length > 0 ? (
            <div className="space-y-2">
              {levelBlock.introLines.map((line) => (
                <SourceLine40 key={line.lineIndex} line={line.text} index={line.lineIndex} sectionId="s25" />
              ))}
            </div>
          ) : null}

          {levelBlock.level === 4 ? (
            <div className="rounded-xl border border-[#d4b475] bg-[#fbf6eb] p-3.5 text-xs sm:text-sm font-bold text-[#76531e]">
              <MixedBidi>
                إرشاد للمستوى الرابع (⑯–⑳): اكتب الفرق أو السبب النحوي بأسلوبك. بعد تسليم الاختبار ستقارن إجابتك بالتعليل المصدري وسلم التقييم الذاتي في منطقة الحلول.
              </MixedBidi>
            </div>
          ) : null}

          {levelBlock.level === 5 ? (
            <div className="rounded-xl border border-[#9dbbb5] bg-[#eef4f0] p-3.5 text-xs sm:text-sm font-bold text-[#17354a]">
              <MixedBidi>
                إرشاد للمستوى الخامس (㉑–㉕): ترتبط البنود ㉑ build · ㉒ fix · ㉓ test · ㉔ complete · ㉕ work بالفراغات الخمسة المتتالية في قصة The Big School Project.
              </MixedBidi>
            </div>
          ) : null}

          <div className="space-y-4">
            {levelBlock.questions.map((q) => {
              const value = answers[q.id] ?? "";
              return (
                <div
                  key={q.id}
                  data-test-question={q.number}
                  className="rounded-2xl border border-[#ded9cb] bg-[#fdfcf8] p-4 sm:p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-[#245f62]">
                      {`السؤال ${q.number} من ${TEST_QUESTION_COUNT_40} (${q.marker})`}
                    </span>
                    <Chip40
                      label={value.trim() ? "تم تسجيل الإجابة" : "بانتظار الإجابة"}
                      tone={value.trim() ? "emerald" : "neutral"}
                    />
                  </div>

                  <div className="space-y-2">
                    {q.promptLines.map((pLine) => (
                      <SourceLine40
                        key={pLine.lineIndex}
                        line={pLine.text}
                        index={pLine.lineIndex}
                        sectionId="s25"
                      />
                    ))}
                  </div>

                  {q.kind === "mcq" && q.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                      {q.options.map((opt) => {
                        const selected = value === opt.value;
                        return (
                          <div key={opt.value} className="space-y-1">
                            <button
                              type="button"
                              aria-pressed={selected}
                              onClick={() => onChangeAnswer(q.id, opt.value)}
                              className={`w-full rounded-xl border px-3.5 py-2.5 text-left font-mono text-sm font-bold transition cursor-pointer ${
                                selected
                                  ? "border-[#17354a] bg-[#17354a] text-[#ffffff]"
                                  : "border-[#c7c2b4] bg-[#ffffff] text-[#17354a] hover:border-[#245f62]"
                              }`}
                              dir="ltr"
                              lang="en"
                              style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                            >
                              <EnBidi>{`Option ${opt.value}`}</EnBidi>
                            </button>
                            <SourceLine40 line={opt.text} index={opt.lineIndex} sectionId="s25" />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pt-1">
                      <label htmlFor={`test40-input-${q.id}`} className="sr-only">
                        {`إجابة السؤال ${q.number}`}
                      </label>
                      <input
                        id={`test40-input-${q.id}`}
                        type="text"
                        dir={q.kind === "meaning" ? "auto" : "ltr"}
                        lang={q.kind === "meaning" ? undefined : "en"}
                        value={value}
                        onChange={(e) => onChangeAnswer(q.id, e.target.value)}
                        placeholder={q.placeholder ?? "اكتب إجابتك هنا..."}
                        className="w-full rounded-xl border border-[#b9c8c0] bg-[#ffffff] px-4 py-2.5 font-mono text-sm sm:text-base font-bold text-[#17354a]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* أزرار التسليم */}
      <div className="rounded-3xl border border-[#b9c8c0] bg-[#fffdf8] p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onSubmit}
              className="rounded-xl bg-[#17354a] px-6 py-3 text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
            >
              {submitted ? "تحديث التسليم والانتقال إلى الحلول" : "تسليم الاختبار النهائي (فتح الحلول)"}
            </button>
            {submitted ? (
              <button
                type="button"
                onClick={onOpenSolutions}
                className="rounded-xl border border-[#28533b] bg-[#edf5ee] px-5 py-3 text-sm font-extrabold text-[#28533b] cursor-pointer"
              >
                فتح منطقة الحلول التفصيلية الآن
              </button>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onReset}
              className="rounded-xl border border-[#c7c2b4] bg-[#f5f3ed] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#24343b] cursor-pointer"
            >
              مسح الإجابات وإعادة المحاولة
            </button>
            <button
              type="button"
              onClick={onBackToStudent}
              className="rounded-xl border border-[#245f62] bg-[#ffffff] px-4 py-2.5 text-xs sm:text-sm font-extrabold text-[#245f62] cursor-pointer"
            >
              العودة إلى خطوات الدرس
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
