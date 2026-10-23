import { Text42, Panel42, Note42 } from "./design42";
import { PRACTICE_42 } from "./practice42";
import { SLIDES_42, STATIONS_42 } from "./slides42";
import { SOURCE_SECTIONS_42, SOURCE_UNIT_COUNT_42, sectionLines42 } from "./ledger42";
import { TEACHER_SECTION_42, TEACHER_UNIT_COUNT_42 } from "./teacherSource42";
import SolutionsArea42 from "./SolutionsArea42";

const ROUTE = [
  { time: "10 دقائق", title: "الانطلاق", body: "اعرض الموقف المدرسي (§0) واطلب من الطلاب تسمية الأفعال التي يحتاجونها للتعبير عن المعاني الأربعة، ثم اكشف أن فعلين يكفيان." },
  { time: "20 دقيقة", title: "قاعدة V1", body: "§§2–5: ابنِ القاعدة Subject + CAN/COULD + V1 بالمختبر 1، ثم عالج فخ الحرف s بالمختبر 2، واختم بجدول الضمائر." },
  { time: "35 دقيقة", title: "محطة CAN", body: "§§6–11: القدرة الحالية بأنواعها الأربعة، ثم حوار عرض المواهب، ثم النفي والسؤال والإجابات القصيرة وأسئلة WH مع المختبرين 3 و4." },
  { time: "30 دقيقة", title: "محطة COULD", body: "§§12–16: القدرة العامة في الماضي، ثم النقطة الأهم: COULD ليست للماضي فقط. اختم بمقارنة CAN/COULD والتحدي السريع والمختبر 5." },
  { time: "30 دقيقة", title: "COULD أم ABLE TO", body: "§§17–19: ميّز القدرة العامة من النجاح في موقف محدد بالمختبر 6، ثم قدّم will be able to وخريطة القدرة." },
  { time: "30 دقيقة", title: "الاستئذان والطلبات", body: "§§20–25: قارن Can I بـ Could I، ثم Can you بـ Could you، ودرّب على الردود الطبيعية بالمختبرين 7 و8، واختم بحواري الصف والمكتبة." },
  { time: "25 دقيقة", title: "الإمكانية والاحتمال", body: "§§26–29: الإمكانية العامة بـ CAN، والاحتمال بـ COULD، والاقتراح بـ We could. نفّذ المختبر 9." },
  { time: "30 دقيقة", title: "المعنى والسياق", body: "§§30–33: الأخطاء العشرة مع مختبر الإصلاح، ثم مختبر المعاني، ثم تحليل حوار المغامرة بالمختبر 12." },
  { time: "40 دقيقة", title: "التطبيق والقراءة", body: "§§34–39: التدريبات الخمسة ثم قراءة The Young Inventor. اطلب إثباتًا نصيًا لكل إجابة قراءة." },
  { time: "35 دقيقة", title: "الاختبار والكتابة", body: "§§40–44: الاختبار 25 سؤالًا دون كشف الحلول، ثم مهمة الكتابة، ثم الملخص الذهبي وخريطة التقدم." },
];

const MISCONCEPTIONS = [
  "«cans / coulds» — الفعل الناقص ثابت لا يُجمَع ولا يأخذ s: She can swim.",
  "«to بعد الفعل الناقص» — I can to play خطأ؛ بعدها V1 مباشرة.",
  "«do-support مع CAN» — Can you swim? وليس Do you can swim?.",
  "«doesn't can» — نفي الفعل الناقص بـ n't عليه: She can't swim.",
  "«will can» — لا يجتمع فعلان ناقصان؛ القدرة المستقبلية will be able to.",
  "«COULD = الماضي دائمًا» — Could you help me? طلب حاضر، وIt could rain احتمال.",
  "«could في كل ماضٍ» — لإبراز النجاح في حدث واحد محدد تُفضَّل was/were able to أو managed to، لكن couldn't طبيعية للنفي حتى في موقف محدد.",
  "«Yes, I do مع سؤال can» — الإجابة القصيرة تعيد الفعل الناقص: Yes, I can.",
];

export default function TeacherGuide42() {
  const teacherNote = TEACHER_SECTION_42.lines.slice(49, 56);
  return (
    <div className="mx-auto max-w-5xl space-y-4" data-teacher-guide="42">
      <Panel42 title="دليل التدريس — من القدرة إلى التواصل اللبق" kicker="DELIVERY GUIDE · PLATFORM-AUTHORED">
        <p className="text-base leading-8 text-slate-700">
          <Text42 text="الدرس يعيد بناء أربعة وأربعين قسمًا في شرائح قصيرة. استخدم المحطات العشر كوحدات جلسة، ولا تختزل التدريبات في عينة. هذا الدليل إضافات من المنصة، أما نصوص الأسئلة والأمثلة والحوارات فمن المصدر." />
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {ROUTE.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-extrabold text-violet-700">{step.time}</p>
              <p className="font-head text-base font-bold text-slate-900">{step.title}</p>
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <Text42 text={step.body} />
              </p>
            </div>
          ))}
        </div>
      </Panel42>

      <Panel42 title="أهداف الدرس الأصلية" kicker="§1">
        <ul className="grid gap-1.5 md:grid-cols-2">
          {sectionLines42(1).slice(1).map((line) => (
            <li key={line} className="text-base font-semibold text-slate-700">
              <Text42 text={line.replace(/^[①-⑩]/, "")} />
            </li>
          ))}
        </ul>
      </Panel42>

      <Panel42 title="ملاحظة للمعلم كما وردت في §41" kicker="§41 · SOURCE">
        <div className="space-y-1">
          {teacherNote.map((line) => (
            <p key={line} className="text-base font-semibold leading-8 text-slate-700">
              <Text42 text={line} />
            </p>
          ))}
        </div>
        <Note42 emoji="🎯">
          <Text42 text="هذا هو معيار التصحيح الحقيقي للمستوى الرابع والخامس: لا يكفي اختيار الكلمة الصحيحة، بل تفسير الوظيفة. لذلك يُصحَّح المستويان بالكلمات المفتاحية لا بالتطابق الحرفي." />
        </Note42>
      </Panel42>

      <Panel42 title="أخطاء شائعة وخطة تصحيح" kicker="MISCONCEPTIONS">
        <ul className="space-y-2">
          {MISCONCEPTIONS.map((item) => (
            <li key={item} className="rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold leading-7 text-slate-700">
              <Text42 text={item} />
            </li>
          ))}
        </ul>
      </Panel42>

      <Panel42 title={`مفاتيح التدريبات الـ${PRACTICE_42.length}`} kicker="PRACTICE KEYS · §§16, 34–39">
        <div className="space-y-2">
          {PRACTICE_42.map((item) => (
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
                <Text42 text="الإجابة:" /> <span dir="auto" className="font-en">{item.answer}</span>
              </p>
              {item.fields.length > 1 && (
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  <Text42 text="الحقل الثاني (السبب) تصحيح حر: يُقبل أي تفسير سليم لا يقل عن ثماني حروف." />
                </p>
              )}
              <p className="mt-1 text-sm leading-7 text-slate-600">
                <Text42 text={item.reason} />
              </p>
            </details>
          ))}
        </div>
      </Panel42>

      <Panel42 title="سلم تقييم Writing Mission" kicker="RUBRIC · §42">
        <p className="text-sm leading-7 text-slate-700">
          <Text42 text="المجموع 20: عشر نقاط للمعايير العشرة المصدرية (نقطة لكل معيار مستوفى فعليًا لا بمجرد ظهور الكلمة)، أربع نقاط لدقة الصيغ والتطابق مع قاعدة V1، ثلاث للترابط والمفردات، ثلاث للأصالة والالتزام بكتابة من 12 إلى 15 جملة." />
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          <Text42 text="النموذج الإرشادي في §42 مؤلف من ثماني جمل، أي أقل من الحد المطلوب. استخدمه كإلهام جزئي فقط، ولا تقبل نسخه." />
        </p>
      </Panel42>

      <Panel42 title="التغطية" kicker="COVERAGE">
        <p className="text-sm font-semibold text-slate-600">
          <Text42
            text={`${SOURCE_SECTIONS_42.length + 1} مدخلًا (الغلاف + 44 قسمًا) · ${SOURCE_UNIT_COUNT_42 + TEACHER_UNIT_COUNT_42} وحدة مصدر · ${SLIDES_42.length} شريحة · ${STATIONS_42.length} محطات.`}
          />
        </p>
        <p className="mt-1 text-xs text-slate-500">
          <Text42 text="تفاصيل كل قسم وشريحة في docs/lesson42-coverage.md" />
        </p>
      </Panel42>

      <SolutionsArea42 teacher />
    </div>
  );
}
