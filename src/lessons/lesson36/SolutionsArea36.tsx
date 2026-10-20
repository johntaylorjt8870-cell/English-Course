import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import { SOURCE_SECTIONS_36 } from "./ledger36";
import { TEST_SOLUTIONS_36 } from "./solutionsData36";
import { ActionButton36, Card36, FOCUS_36, PlatformNote36, SourceLine36 } from "./kit36";

const solutionLevels = [
  { level: 1, title: "المستوى الأول · اختيار الصيغة", range: "1–5" },
  { level: 2, title: "المستوى الثاني · أكمل الجمل", range: "6–10" },
  { level: 3, title: "المستوى الثالث · تصحيح الأخطاء", range: "11–15" },
  { level: 4, title: "المستوى الرابع · فهم المعنى", range: "16–20" },
  { level: 5, title: "المستوى الخامس · Final IQ200 Boss", range: "21–25" },
] as const;

export default function SolutionsArea36({ unlocked, onGoTest, onGoTeacher }: { unlocked: boolean; onGoTest: () => void; onGoTeacher: () => void }) {
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const section = SOURCE_SECTIONS_36.find((candidate) => candidate.id === "s23")!;
  if (!unlocked) {
    return (
      <div data-area="lesson36-solutions" data-solutions-locked>
        <Card36 title="منطقة الحلول مقفلة">
          <p>تُفتح الحلول بعد إرسال الاختبار. في الوقت الحالي لا يظهر أي جواب أو تفسير للأسئلة الرسمية.</p>
          <ActionButton36 onClick={onGoTest}>العودة إلى الاختبار</ActionButton36>
        </Card36>
      </div>
    );
  }
  const visible = TEST_SOLUTIONS_36.filter((solution) => solution.level === level);
  return (
    <div data-area="lesson36-solutions" data-solution-count={TEST_SOLUTIONS_36.length} className="space-y-4">
      <Card36 eyebrow="Solutions Area · separate from test-taking" title="مفتاح تصحيح الاختبار النهائي — الدرس 36">
        <div className="space-y-1">
          {section.units.map((text, index) => <SourceLine36 key={index} sectionId="s23" index={index} text={text} />)}
        </div>
        <PlatformNote36>
          النص المورّد في القسم 23 يقدّم العنوان وعبارة «عرض الحلول التفصيلية» فقط، ولا يورد مفتاحًا فعليًا. الإجابات والتفسيرات أدناه إضافات تعليمية من إعداد المنصة/المعلم، وليست نصًا منقولًا من المصدر.
        </PlatformNote36>
        <p className="text-sm leading-6 text-[#475569]">في الأسئلة السياقية نميّز بين الخطأ النحوي، والاختيار الممكن لكنه أقل طبيعية هنا، والبدائل الصحيحة التي تغيّر التركيز. إجابات المستوى الخامس نماذج وليست صيغًا وحيدة.</p>
      </Card36>

      <nav aria-label="مستويات حلول اختبار الدرس 36" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {solutionLevels.map((item) => (
          <button key={item.level} type="button" aria-pressed={level === item.level} onClick={() => setLevel(item.level)} className={`${FOCUS_36} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${level === item.level ? "border-[#0d9488] bg-[#0d9488] text-white" : "border-[#cfd8d2] bg-white text-[#334155] hover:bg-[#ccfbf1]"}`}>
            {item.title}<span dir="ltr" className={`font-en mt-1 block text-xs ${level === item.level ? "text-white" : "text-[#64748b]"}`}>Q{item.range}</span>
          </button>
        ))}
      </nav>

      <section aria-label={solutionLevels[level - 1].title} className="space-y-3">
        {visible.map((solution) => (
          <article key={solution.n} data-solution={solution.n} data-source-status={solution.sourceStatus} className="rounded-2xl border border-[#e2e8f0] bg-white p-4">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e8f0] pb-2">
              <h2 className="font-black text-[#0d9488]">السؤال <span dir="ltr" className="font-en">{solution.n}</span></h2>
              <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-bold text-[#76531e]">إضافة معلّمة من إعداد المعلم/المنصة</span>
            </header>
            <div className="mt-3 space-y-2 text-base leading-7 text-[#334155]">
              <p><strong className="text-[#0d9488]">الإجابة النموذجية: </strong><span dir="auto"><Rich text={solution.answer} /></span></p>
              <p><strong className="text-[#0d9488]">التفسير: </strong><span dir="auto"><Rich text={solution.explanation} /></span></p>
              {solution.alternatives?.length ? (
                <div className="rounded-xl border border-[#dce3dd] bg-[#f8fafc] p-3">
                  <h3 className="text-sm font-black text-[#0f766e]">بدائل مقبولة / توضيح السياق</h3>
                  <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#334155]">
                    {solution.alternatives.map((line) => <li key={line} dir="auto"><Rich text={line} /></li>)}
                  </ul>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
      <div className="flex flex-wrap gap-2">
        <ActionButton36 variant="secondary" onClick={onGoTest}>العودة إلى الاختبار</ActionButton36>
        <ActionButton36 variant="secondary" onClick={onGoTeacher}>دليل المعلم</ActionButton36>
      </div>
    </div>
  );
}
