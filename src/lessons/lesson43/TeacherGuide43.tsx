import { Text43, Tip43, Panel43, Note43, SourceLines43 } from "./design43";
import { section34Lines } from "./teacherSource43";
import { section43, sectionLines43 } from "./ledger43";
import { WRITING_CRITERIA_43 } from "./kit43";

/**
 * دليل المعلم — يُحمّل عند الطلب بعد التحقق من كلمة المرور.
 * يحوي مفتاح التصحيح الكامل (§34) ومخطط التدريس وسُلم تقييم الكتابة.
 */
export default function TeacherGuide43() {
  const key = section34Lines();
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Panel43 title="دليل المعلم ومخطط التدريس" kicker="TEACHER GUIDE · LESSON 43">
        <p className="text-base font-bold text-slate-700">
          <Text43 text="في هذا الدرس يكتسب الطالب القدرة على التمييز بين MAY وMIGHT في الاحتمال والتوقعات، وعلى استخدام كل منهما في طلب الإذن ومنح الإذن، مع تفادي أخطاء MAY BE وMAYBE الشائعة." />
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-6 text-base font-semibold leading-relaxed text-slate-700">
          <li><Text43 text="ابدأ بتمييز الاحتمال من الحقيقة: الجملة التي تقرر واقعًا لا تستعمل MAY أو MIGHT." /></li>
          <li><Text43 text="ثم علّم البناء: MAY/MIGHT + V1، وMAY/MIGHT + be + خبر، وMAY/MIGHT + have + V3." /></li>
          <li><Text43 text="لا تُعطِ MAY وMIGHT نسبًا مئوية ثابتة: المصدر لا يربطهما بترتيب ثابت." /></li>
          <li><Text43 text="عرّج على الاستخدامات: الاحتمال في الحاضر والمستقبل والماضي، والاحتمال السلبي بـ MAY NOT." /></li>
          <li><Text43 text="استعرض طلب الإذن (Can/Could/May I) ومنح الإذن، وحدّد درجة الرسمية." /></li>
          <li><Text43 text="خوّل الطالب اختيار MAY أو MIGHT بنفسه في الجمل اليومية، ولا تفرض عليه اختيارًا واحدًا." /></li>
          <li><Text43 text="صحّح الأخطاء الشائعة: She mays/may be is/can comes، وMAYBE مقابل may be." /></li>
          <li><Text43 text="اختبر بالتقييم الختامي ذي الخمسة مستويات، ثم انتقل إلى مهمة الكتابة." /></li>
        </ol>
        <Tip43>
          <Text43 text="مفتاح التصحيح الكامل أدناه (المصدر §34). لا يُظهر هذا الملف للطالب قبل تسجيل محاولة." />
        </Tip43>
        <div className="mt-4 rounded-3xl border-2 border-violet-100 bg-violet-50/40 p-4">
          <p className="text-sm font-bold text-violet-800">KEY · §34 · FULL 25-QUESTION SOLUTION KEY</p>
          <SourceLines43 lines={key} />
        </div>
        <div className="mt-4 rounded-3xl border-2 border-orange-100 bg-orange-50/40 p-4">
          <p className="text-sm font-bold text-orange-800">RUBRIC · §35 · WRITING MISSION</p>
          <ul className="mt-2 list-decimal space-y-1 pl-5 text-sm font-semibold leading-relaxed text-slate-700">
            {WRITING_CRITERIA_43.map((criterion) => (
              <li key={criterion}><Text43 text={criterion} /></li>
            ))}
          </ul>
          <p className="mt-2 text-sm font-bold text-slate-600">
            <Text43 text={`عدد الجمل المطلوبة: ${sectionLines43(35).filter((line) => line.includes("12") || line.includes("جملة")).slice(0, 1).join("") || "12–15 جملة"}`} />
          </p>
        </div>
        <div className="mt-4 rounded-3xl border-2 border-sky-100 bg-sky-50/40 p-4">
          <p className="text-sm font-bold text-sky-800">GOLDEN SUMMARY · §36</p>
          <SourceLines43 lines={sectionLines43(36)} />
        </div>
        <div className="mt-4 rounded-3xl border-2 border-emerald-100 bg-emerald-50/40 p-4">
          <p className="text-sm font-bold text-emerald-800">ROADMAP · §37</p>
          <SourceLines43 lines={sectionLines43(37)} />
        </div>
        <Note43 emoji="🗺️">
          <Text43 text={`الدرس التالي هو ${section43(37).title.split("—").pop()?.trim() ?? "Lesson 44"}`} />
        </Note43>
      </Panel43>
    </div>
  );
}
