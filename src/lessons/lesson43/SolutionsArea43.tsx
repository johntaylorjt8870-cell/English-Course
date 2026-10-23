import { En43, Text43, Tip43, Panel43, Note43 } from "./design43";
import { SOLUTIONS_43 } from "./key43";

/**
 * مساحة الحلول — تُحمّل عند الطلب فقط (لا تظهر في الحزمة الأساسية)،
 * وتُفتح بعد تسجيل محاولة في التقييم أو بعد التحقق من كلمة مرور المعلم.
 */
export default function SolutionsArea43() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Panel43 title="نماذج الحلول" kicker="TEACHER · SOLUTIONS · §34 KEY">
        <Tip43>
          <Text43 text="هذه النماذج مخصصة للمعلم أو للمراجعة بعد التصحيح. لا تظهر للطالب قبل تسجيل محاولة." />
        </Tip43>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {SOLUTIONS_43.map((entry) => (
            <li key={entry.id} className="rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
              <p className="text-xs font-bold text-slate-400">
                <En43>Q{entry.number}</En43> · {entry.level}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-500">
                <Text43 text={entry.function} />
              </p>
              <p className="mt-1 font-en text-base font-extrabold text-slate-900">{entry.answer}</p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                <Text43 text={entry.reason} />
              </p>
              <p className="mt-2 rounded-xl border border-violet-100 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-900">
                <Text43 text={entry.source} />
              </p>
              {entry.keywords && (
                <p className="mt-2 text-xs font-bold text-slate-500">
                  <Text43 text="معايير التصحيح:" /> <En43>{entry.keywords}</En43>
                </p>
              )}
            </li>
          ))}
        </ol>
        <Note43 emoji="🔒">
          <Text43 text="هذا الملف يحوي مفتاح التصحيح الكامل، ولا يُحمّل إلا عند الطلب. لا يظهر في حزمة الطالب الأساسية." />
        </Note43>
      </Panel43>
    </div>
  );
}
