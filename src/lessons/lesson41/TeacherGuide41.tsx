import { Text41, Panel41 } from "./design";
import { PRACTICE_41 } from "./practice41";
import { SLIDES_41, STATIONS_41 } from "./slides41";
import { SOURCE_SECTIONS_41, SOURCE_UNIT_COUNT_41 } from "./ledger41";
import SolutionsArea41 from "./SolutionsArea41";

const ROUTE = [
  { time: "10 دقائق", title: "الانطلاق", body: "اعرض الجمل الخمس واطلب من الطلاب تحديد النشاط الثابت (study) وما تغيّر في كل جملة. لا تعطِ المصطلحات بعد." },
  { time: "25 دقيقة", title: "Main vs Auxiliary", body: "استخدم الأقسام من 2 إلى 4 والمختبر 1. اطلب من كل طالب جملة من عنده وحدد الوظيفة، ثم انتقل إلى تمييز DO/HAVE الرئيسية." },
  { time: "30 دقيقة", title: "محرك BE", body: "الأقسام من 5 إلى 10: اربط الحالة (She is happy) بالاستمرار (She is studying) بالمبني للمجهول (The bridge was built). ركّز على منع does مع BE." },
  { time: "35 دقيقة", title: "محرك DO", body: "الأقسام من 11 إلى 17: انقل علامة الزمن إلى does/did وأعد الفعل إلى V1. ميّز بين Do you do…? والتأكيد I do understand." },
  { time: "30 دقيقة", title: "محرك HAVE", body: "الأقسام من 18 إلى 23: قارن Has she finished? بـ Does she have a bicycle? ثم ابنِ التام المستمر HAVE + BEEN + V-ing." },
  { time: "30 دقيقة", title: "السلسلة والخوارزمية", body: "الأقسام من 24 إلى 29: درّب على تحديد المساعد الأول في will have been studying، ثم طبّق الخوارزمية على أسئلة جديدة، ثم حلّل الأخطاء العشرة." },
  { time: "40 دقيقة", title: "التطبيق والقراءة", body: "الأقسام من 30 إلى 35: نفّذ التدريبات الخمسة والقراءة. اطلب إثباتًا نصيًا لكل إجابة قراءة." },
  { time: "35 دقيقة", title: "الاختبار والكتابة", body: "الأقسام من 36 إلى 40: الاختبار 25 سؤالًا دون كشف الحلول، ثم مهمة الكتابة من 12 إلى 15 جملة، ثم الملخص وخريطة التقدم." },
];

const MISCONCEPTIONS = [
  "«كل فعل رئيسي يحتاج do» — BE الرابط استثناء واضح: Is she happy? وليس Does she is happy?.",
  "«did + V2» — did تحمل الماضي، فيبقى الفعل الرئيسي V1: Did he go?.",
  "«has = مساعد دائمًا» — has قبل اسم قد تكون رئيسيًا (has a car / has lunch)، وقبل V3 مساعدة.",
  "«being بعد have» — الصيغة will have been working، وbeen هي V3 من BE.",
  "«نحرّك كل السلسلة» — نحرّك المساعد الأول فقط، أو نضع not بعده.",
  "«Have you got a car? خطأ» — تركيب شائع في الإنجليزية البريطانية، والمصدر يذكره كملاحظة لغوية.",
];

export default function TeacherGuide41() {
  const practice = PRACTICE_41;
  return (
    <div className="mx-auto max-w-5xl space-y-4" data-teacher-guide="41">
      <Panel41 title="دليل التدريس — من الشكل إلى الوظيفة" kicker="DELIVERY GUIDE">
        <p className="text-base leading-8 text-slate-700">
          <Text41 text="الدرس يعيد بناء أربعين قسمًا في شرائح قصيرة. استخدم المحطات كوحدات جلسة، ولا تختزل التدريبات في عينة. الشروح في هذا الدليل إضافات المنصة، أما نصوص الأسئلة والأمثلة فمن المصدر." />
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {ROUTE.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-extrabold text-violet-700">{step.time}</p>
              <p className="font-head text-base font-bold text-slate-900">{step.title}</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <Text41 text={step.body} />
              </p>
            </div>
          ))}
        </div>
      </Panel41>

      <Panel41 title="أهداف الدرس الأصلية" kicker="§1">
        <ul className="grid gap-1.5 md:grid-cols-2">
          {SOURCE_SECTIONS_41.find((s) => s.num === 1)!.lines.slice(1).map((line) => (
            <li key={line} className="text-base font-semibold text-slate-700">
              <Text41 text={line.replace(/^[①-⑩]/, "")} />
            </li>
          ))}
        </ul>
      </Panel41>

      <Panel41 title="أخطاء شائعة وخطة تصحيح" kicker="MISCONCEPTIONS">
        <ul className="space-y-2">
          {MISCONCEPTIONS.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold leading-7 text-slate-700">
              <Text41 text={item} />
            </li>
          ))}
        </ul>
      </Panel41>

      <Panel41 title="مفاتيح التدريبات الـ66" kicker="PRACTICE KEYS">
        <div className="space-y-2">
          {practice.map((item) => (
            <details key={item.id} className="rounded-xl border border-slate-200 bg-white p-3" data-teacher-answer={item.id}>
              <summary className="cursor-pointer text-sm font-bold text-slate-700">
                §{item.section} · {item.number} — <span dir="ltr" className="font-en">{item.prompt}</span>
              </summary>
              {item.options && (
                <p dir="ltr" className="font-en mt-2 text-sm font-semibold text-slate-600">
                  {item.options.map((option, i) => `${String.fromCharCode(65 + i)}. ${option}`).join("   ")}
                </p>
              )}
              <p className="mt-2 text-sm font-bold text-emerald-800">
                <Text41 text="الإجابة:" /> <span dir="auto" className="font-en">{item.answer}</span>
              </p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <Text41 text={item.reason} />
              </p>
            </details>
          ))}
        </div>
      </Panel41>

      <Panel41 title="سلم تقييم Writing Mission" kicker="RUBRIC">
        <p className="text-sm leading-7 text-slate-700">
          <Text41 text="المجموع 20: عشر نقاط لعشرة معايير مصدرية (نقطة لكل معيار مستوفى فعليًا)، أربع نقاط لدقة الصيغ والتطابق، ثلاث للترابط والمفردات، ثلاث للأصالة والالتزام بكتابة من 12 إلى 15 جملة. لا تُمنح نقطة لمجرد ظهور كلمة مستهدفة. عدد الجمل في الواجهة تقريبي ويحتاج مراجعة بشرية." />
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          <Text41 text="النموذج الإرشادي في §38 مؤلف من ثماني جمل، ولا يستوفي شرط الطول ولا DID للتأكيد ولا السؤالين. استخدمه كإلهام جزئي فقط." />
        </p>
      </Panel41>

      <Panel41 title="التغطية" kicker="COVERAGE">
        <p className="text-sm font-semibold text-slate-600">
          <Text41 text={`${SOURCE_SECTIONS_41.length} مدخلًا (الغلاف + 40 قسمًا) · ${SOURCE_UNIT_COUNT_41} وحدة مصدر · ${SLIDES_41.length} شريحة · ${STATIONS_41.length} محطات.`} />
        </p>
        <p className="mt-1 text-xs text-slate-500">
          <Text41 text="تفاصيل كل قسم وشريحة في docs/lesson41-coverage.md" />
        </p>
      </Panel41>

      <SolutionsArea41 teacher />
    </div>
  );
}
