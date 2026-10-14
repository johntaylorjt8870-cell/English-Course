import { sourceSection40 } from "./data";
import { Callout40, Chip40, EnBidi, MixedBidi, SourceLedgerBlock40, normalizeEnglishInput40 } from "./kit40";
import { SOLUTIONS_40, SOLUTIONS_PROVENANCE_NOTE_40 } from "./solutionsData40";

// ============================================================
// Lesson 40 — منطقة الحلول التفصيلية المستقلة (SolutionsArea40)
//
// لا يُركَّب هذا المكوّن في شجرة DOM إلا بعد تسليم الاختبار أو تفعيل وضع المعلم.
// يعرض النص الكامل للقسم المصدري §26 حرفيًا، متبوعًا بـ 25 بطاقة تحليل مفصّلة.
// ============================================================

export function SolutionsArea40({
  answers,
  onBackToTest,
  onBackToStudent,
}: {
  answers: Record<string, string>;
  onBackToTest: () => void;
  onBackToStudent: () => void;
}) {
  const s26 = sourceSection40("s26");

  return (
    <section
      id="lesson40-solutions"
      dir="rtl"
      aria-label="الحلول التفصيلية للاختبار النهائي — الدرس 40"
      className="space-y-6"
    >
      <div className="rounded-3xl border border-[#8fb69a] bg-[#edf5ee] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Chip40 label="منطقة الحلول مفتوحة بعد التسليم ✅" tone="emerald" />
          <Chip40 label="25 بطاقة حل مفصّلة (①–㉕)" tone="teal" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17354a]">
          <MixedBidi>مفتاح التصحيح الكامل والحلول التفصيلية — الدرس 40</MixedBidi>
        </h2>
        <p className="text-sm font-semibold text-[#24343b] leading-[1.85]">
          <MixedBidi>{SOLUTIONS_PROVENANCE_NOTE_40}</MixedBidi>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBackToTest}
            className="rounded-xl bg-[#17354a] px-4 py-2 text-xs sm:text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
          >
            العودة إلى ورقة الاختبار
          </button>
          <button
            type="button"
            onClick={onBackToStudent}
            className="rounded-xl border border-[#245f62] bg-[#ffffff] px-4 py-2 text-xs sm:text-sm font-extrabold text-[#245f62] cursor-pointer"
          >
            العودة إلى خطوات الدرس
          </button>
        </div>
      </div>

      {/* النص المصدري الكامل للقسم §26 حرفيًا */}
      <SourceLedgerBlock40 section={s26} />

      <Callout40
        tone="amber"
        title="ملاحظة التصحيح والمقارنة الذاتية (خصوصًا للمستوى الرابع ⑯–⑳)"
        badge="إرشاد تقييمي"
      >
        <p>
          <MixedBidi>
            في المستويات الأول والثاني والثالث والخامس يقارن النظام إجابتك بالصيغ القياسية والبدائل السياقية المعتمدة. أما في المستوى الرابع (⑯–⑳: افهم المعنى) فتُعرض إجابتك جنبًا إلى جنب مع التعليل المصدري والشرح التفصيلي للمقارنة الذاتية ومراجعة المعلم، دون ادعاء تصحيح دلالي آلي للجمل الحرة.
          </MixedBidi>
        </p>
      </Callout40>

      {/* بطاقات الحلول التفصيلية الـ25 */}
      <div className="space-y-4">
        {SOLUTIONS_40.map((sol) => {
          const studentRaw = answers[sol.id]?.trim() ?? "";
          const studentNorm = normalizeEnglishInput40(studentRaw);
          const isExactMatch =
            studentRaw.length > 0 &&
            sol.acceptedNormalized.some((acc) => normalizeEnglishInput40(acc) === studentNorm);

          return (
            <div
              key={sol.id}
              data-solution-item={sol.number}
              className="rounded-2xl border border-[#c8c3b4] bg-[#fffdf8] p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4dfd2] pb-2.5">
                <span className="text-sm font-extrabold text-[#17354a]">
                  <MixedBidi>{`حل السؤال ${sol.number} (${sol.marker}) — المستوى ${sol.level}`}</MixedBidi>
                </span>
                <Chip40
                  label={
                    !studentRaw
                      ? "لم تُسجَّل إجابة"
                      : sol.level === 4
                        ? "مقارنة ذاتية بالمعنى"
                        : isExactMatch
                          ? "مطابق للمفتاح ✅"
                          : "راجع الحل النموذجي 💡"
                  }
                  tone={!studentRaw ? "neutral" : isExactMatch ? "emerald" : "amber"}
                />
              </div>

              <div
                dir="ltr"
                lang="en"
                style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                className="rounded-xl border border-[#c7d3cb] bg-[#f7f8f5] px-3.5 py-2.5 font-mono text-sm font-bold text-[#17354a]"
              >
                <EnBidi>{sol.prompt}</EnBidi>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#d5d0c3] bg-[#fdfcf8] p-3.5 space-y-1">
                  <div className="text-xs font-extrabold text-[#43575a]">إجابتك المسجّلة:</div>
                  <p className="text-sm font-bold text-[#17354a]">
                    <MixedBidi>{studentRaw || "— (لم تُكتَب إجابة)"}</MixedBidi>
                  </p>
                </div>

                <div className="rounded-xl border border-[#8fb69a] bg-[#edf5ee] p-3.5 space-y-1">
                  <div className="text-xs font-extrabold text-[#28533b]">الإجابة النموذجية في المصدر (§26):</div>
                  <p className="text-sm font-extrabold text-[#28533b]">
                    <MixedBidi>{sol.sourceAnswer}</MixedBidi>
                  </p>
                </div>
              </div>

              <p className="text-sm font-bold text-[#24343b]">
                <MixedBidi>{sol.sourceReason}</MixedBidi>
              </p>

              <p className="text-xs sm:text-sm font-semibold text-[#43575a] leading-[1.85]">
                <MixedBidi>{`شرح تفصيلي (إضافة منصة): ${sol.platformExplanation}`}</MixedBidi>
              </p>

              {sol.acceptableAlternatives ? (
                <p className="rounded-xl border border-[#d4b475] bg-[#fbf6eb] px-3.5 py-2 text-xs font-bold text-[#76531e]">
                  <MixedBidi>{`البدائل المقبولة سياقيًا: ${sol.acceptableAlternatives}`}</MixedBidi>
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionsArea40;
