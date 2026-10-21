import { useState } from "react";
import { COVERAGE_40, COVERAGE_ACCURACY_NOTES_40 } from "./coverage40";
import { SLIDES_40 } from "./data";
import { sourceSection40 } from "./ledger40";
import { Callout40, Chip40, EnBidi, MixedBidi, SourceLedgerBlock40 } from "./kit40";
import {
  DETECTIVE21_ITEMS_40,
  DIALOGUE2_CHALLENGE_40,
  EXERCISE19_ITEMS_40,
  FILL20_ITEMS_40,
  READING23_ANSWERS_40,
  READING23_QUESTIONS_40,
  WRITING27_CRITERIA_40,
} from "./practiceData40";
import { SOLUTIONS_40, SOLUTIONS_PROVENANCE_NOTE_40 } from "./solutionsData40";

// ============================================================
// Lesson 40 — دليل المعلم الكامل (TeacherGuide40)
//
// لا يُحمّل هذا الملف إلا بعد تفعيل وضع المعلم عبر بوابة مساحة المعلم المعتمدة.
// ============================================================

const LESSON_PLAN_PHASES_40 = [
  {
    phase: "المرحلة 1 (15 دقيقة)",
    title: "الخريطة الكبرى والجدول الذهبي والزوايا الخمس (Cover + §§1–4)",
    focus:
      "تثبيت الفرق بين المحطات الست (الدروس 34–39، حيث خُصّص الدرس 36 للمقارنة) والصيغ الخمس الرئيسية، ثم تطبيق الأسئلة الستة ومقارنة الفعل study في الزوايا الخمس.",
  },
  {
    phase: "المرحلة 2 (20 دقيقة)",
    title: "الجولات الأربع والمقارنة الثلاثية لمشروع آدم (§§5–10)",
    focus:
      "مراجعة WILL vs BE GOING TO، ثم Future Continuous وFuture Perfect وFuture Perfect Continuous، وتحليل خط مشروع آدم (4:00–8:00) وتفنيد اختصار «انتهى / لم ينتهِ».",
  },
  {
    phase: "المرحلة 3 (15 دقيقة)",
    title: "الإشارات الزمنية والجمل الزمنية وFOR/SINCE ومختبر البناء (§§11–15)",
    focus:
      "إثبات أن الكلمات الزمنية لا تقرر آليًا، وتثبيت Present Simple بعد when / by the time مقابل السؤال المباشر When will you arrive?، وفحص know مع for، وبناء الصيغ الخمس للفعل write.",
  },
  {
    phase: "المرحلة 4 (20 دقيقة)",
    title: "الحواران الشاملان ومختبر المواقف والتدريبات الموجهة (§§16–22)",
    focus:
      "قراءة حوار المسابقة العلمية وحوار رحلة العائلة، حل مختبر المواقف الخمسة، وإنجاز التدريبين (§19 و§20) وGrammar Detective (§21) وتحدي تعدد الإجابات (§22).",
  },
  {
    phase: "المرحلة 5 (15 دقيقة)",
    title: "تحدي القراءة والتحليل النحوي للقصة (§§23–24)",
    focus:
      "تحليل نص Building the Future Learning Centre والإجابة عن الأسئلة الثمانية وربط كل جملة بسبب اختيار زمنها.",
  },
  {
    phase: "المرحلة 6 (25 دقيقة)",
    title: "الاختبار النهائي الشامل ومهمة الكتابة والملخص الذهبي (§§25–29)",
    focus:
      "إجراء الاختبار المكون من 25 سؤالًا (5 × 5)، مراجعة الحلول التفصيلية (§26)، وتكليف الطلاب بمهمة My Future Learning Journey (15–18 جملة).",
  },
] as const;

const CONCEPTUAL_RUBRIC_40 = [
  { q: 16, criteria: "نقطة: يميز أن WILL قد يقدم فعلًا مستقبليًا/قرارًا لحظيًا؛ نقطة: يذكر أن BE GOING TO تبرز نية أو خطة مسبقة. تُقبل صياغة مكافئة." },
  { q: 17, criteria: "نقطة: يصف Future Continuous نشاطًا جاريًا عند الثامنة؛ نقطة: يصف Future Perfect إنجازًا مكتملًا بحلول الثامنة." },
  { q: 18, criteria: "نقطة: يحدد نتيجة/خمسة مقالات مكتملة؛ نقطة: يحدد مدة الكتابة الممتدة لأسبوعين. لا يُشترط نسخ الجواب النموذجي حرفيًا." },
  { q: 19, criteria: "نقطة: يجيب لا؛ نقطة: يذكر صحة Future Simple مع by، ويفضل دعمها بالمثال الوارد. تُقبل الإشارة إلى اختلاف التركيز مع Future Perfect." },
  { q: 20, criteria: "نقطة: يذكر Present Simple عادةً في جملة when الزمنية؛ نقطة: يميزها عن الجملة الرئيسية المستقبلية أو عن السؤال المباشر When will you arrive?" },
] as const;

export function TeacherGuide40({
  onJumpToStep,
  onOpenTest,
  onOpenSolutions,
}: {
  onJumpToStep: (index: number) => void;
  onOpenTest: () => void;
  onOpenSolutions: () => void;
}) {
  const s26 = sourceSection40("s26");
  const [jumpIndex, setJumpIndex] = useState(0);

  return (
    <div dir="rtl" className="space-y-6">
      {/* ترويسة دليل المعلم */}
      <div className="rounded-3xl border border-[#b9c8c0] bg-[#fffdf8] p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Chip40 label="مساحة المعلم مفعّلة 🔓" tone="emerald" />
          <Chip40 label="الدرس 40 — 29 قسمًا مرقّمًا + الغلاف" tone="teal" />
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#17354a]">
          <MixedBidi>دليل المعلم الشامل ومفاتيح الحلول وسجل التغطية — الدرس 40</MixedBidi>
        </h2>
        <p className="text-sm font-semibold text-[#24343b] leading-[1.85]">
          <MixedBidi>{SOLUTIONS_PROVENANCE_NOTE_40}</MixedBidi>
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onOpenTest}
            className="rounded-xl bg-[#17354a] px-4 py-2 text-xs sm:text-sm font-extrabold text-[#ffffff] hover:bg-[#245f62] cursor-pointer"
          >
            معاينة منطقة الاختبار (25 سؤالًا)
          </button>
          <button
            type="button"
            onClick={onOpenSolutions}
            className="rounded-xl border border-[#28533b] bg-[#edf5ee] px-4 py-2 text-xs sm:text-sm font-extrabold text-[#28533b] cursor-pointer"
          >
            معاينة منطقة الحلول المفتوحة
          </button>
        </div>
      </div>

      {/* خطة التدريس من 6 مراحل */}
      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-6 space-y-4">
        <h3 className="text-lg font-extrabold text-[#17354a]">خطة تدريس الدرس 40 (6 مراحل مقترحة)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LESSON_PLAN_PHASES_40.map((p, idx) => (
            <div key={idx} className="rounded-2xl border border-[#ded9cb] bg-[#fdfcf8] p-4 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-[#245f62]">{p.phase}</span>
              </div>
              <h4 className="text-sm font-extrabold text-[#17354a]">
                <MixedBidi>{p.title}</MixedBidi>
              </h4>
              <p className="text-xs sm:text-sm font-semibold text-[#43575a] leading-[1.8]">
                <MixedBidi>{p.focus}</MixedBidi>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ملاحظات الدقة التربوية الإلزامية */}
      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-6 space-y-4">
        <h3 className="text-lg font-extrabold text-[#17354a]">
          ضوابط الدقة النحوية والتأهيلات التربوية في الدرس 40
        </h3>
        <div className="space-y-3">
          {COVERAGE_ACCURACY_NOTES_40.map((row) => (
            <div key={row.id} className="rounded-2xl border border-[#d4b475] bg-[#fbf6eb] p-4 space-y-1.5">
              <div className="text-xs font-extrabold text-[#76531e]">
                <MixedBidi>{`${row.num == null ? "Cover" : `§${row.num}`} — ${row.title}`}</MixedBidi>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#24343b] leading-[1.85]">
                <MixedBidi>{row.accuracyNote ?? ""}</MixedBidi>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* مفاتيح التدريبات الموجهة (§17 و§19 و§20 و§21 و§23) */}
      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-6 space-y-5">
        <h3 className="text-lg font-extrabold text-[#17354a]">
          مفاتيح حلول تدريبات الطالب (§17 · §19 · §20 · §21 · §23)
        </h3>

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-[#245f62]">§17 — حل تحدي الحوار الثاني (A Family Trip):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DIALOGUE2_CHALLENGE_40.map((item) => (
              <div key={item.id} className="rounded-xl border border-[#ded9cb] bg-[#fdfcf8] p-3 text-xs sm:text-sm font-bold text-[#24343b]">
                <MixedBidi>{`${item.prompt} ← ${item.feedback}`}</MixedBidi>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-[#245f62]">§19 — حلول التدريب الأول (6 بنود):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EXERCISE19_ITEMS_40.map((item) => (
              <div key={item.n} className="rounded-xl border border-[#ded9cb] bg-[#fdfcf8] p-3 text-xs sm:text-sm font-bold text-[#24343b]">
                <MixedBidi>{`#${item.n}: ${item.answer} (${item.answerText}) — ${item.why}`}</MixedBidi>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-[#245f62]">§20 — حلول التدريب الثاني المفصلة (8 بنود):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FILL20_ITEMS_40.map((item) => (
              <div key={item.n} className="rounded-xl border border-[#ded9cb] bg-[#fdfcf8] p-3 text-xs sm:text-sm font-bold text-[#24343b]">
                <MixedBidi>{`#${item.n}: ${item.answer} — ${item.why}`}</MixedBidi>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-[#245f62]">§21 — حلول Grammar Detective (10 بنود):</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {DETECTIVE21_ITEMS_40.map((item) => (
              <div key={item.n} className="rounded-xl border border-[#ded9cb] bg-[#fdfcf8] p-3 space-y-1">
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="font-mono text-xs font-bold text-[#28533b]"
                >
                  <EnBidi>{`#${item.n}: ${item.answer}`}</EnBidi>
                </div>
                <p className="text-xs font-semibold text-[#43575a]">
                  <MixedBidi>{item.why}</MixedBidi>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-extrabold text-[#245f62]">§23 — حلول أسئلة القراءة الثمانية:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {READING23_QUESTIONS_40.map((q, idx) => (
              <div key={idx} className="rounded-xl border border-[#ded9cb] bg-[#fdfcf8] p-3 space-y-1">
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="font-mono text-xs font-bold text-[#17354a]"
                >
                  <EnBidi>{q}</EnBidi>
                </div>
                <div
                  dir="ltr"
                  lang="en"
                  style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                  className="font-mono text-xs font-bold text-[#28533b]"
                >
                  <EnBidi>{READING23_ANSWERS_40[idx]}</EnBidi>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* سلم تقييم مهمة الكتابة (§27) */}
      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-6 space-y-3">
        <h3 className="text-lg font-extrabold text-[#17354a]">
          دليل تصحيح مهمة الكتابة (§27 — My Future Learning Journey)
        </h3>
        <Callout40 tone="teal" title="معايير التصحيح اليدوي للمعلم (15–18 جملة)" badge="10 شروط">
          <p>
            <MixedBidi>
              يتحقق المعلم يدويًا من استيفاء الفقرة لعدد الجمل المطلوب (15 إلى 18 جملة) والشروط العشرة التالية دون نسخ النموذج الافتتاحي:
            </MixedBidi>
          </p>
        </Callout40>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {WRITING27_CRITERIA_40.map((c, idx) => (
            <div key={idx} className="rounded-xl border border-[#ded9cb] bg-[#fdfcf8] p-3 text-xs sm:text-sm font-bold text-[#24343b]">
              <MixedBidi>{c}</MixedBidi>
            </div>
          ))}
        </div>
      </div>

      {/* النص الكامل للقسم §26 + بطاقات الحلول الـ25 */}
      <SourceLedgerBlock40 section={s26} />

      <div className="rounded-3xl border border-[#d4b475] bg-[#fff8e8] p-5 space-y-3" data-conceptual-rubric>
        <h3 className="text-base font-extrabold text-[#704700]">سلم مراجعة المعلم للأسئلة المفاهيمية ⑯–⑳ · درجتان لكل سؤال</h3>
        <p className="text-sm font-semibold text-[#49391c]">هذه البنود تُراجع بشريًا، لا بمطابقة كلمات مفتاحية. امنح نقطة لكل معيار، واقبل أي شرح مكافئ يثبت الفهم الصحيح.</p>
        {CONCEPTUAL_RUBRIC_40.map((item) => <p key={item.q} className="rounded-lg border border-[#e5d09c] bg-white p-3 text-sm font-bold text-[#49391c]"><MixedBidi>{`السؤال ${item.q}: ${item.criteria}`}</MixedBidi></p>)}
      </div>

      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-6 space-y-4">
        <h3 className="text-lg font-extrabold text-[#17354a]">
          بطاقات الحلول التفصيلية الـ25 للاختبار النهائي (مرجع المعلم)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SOLUTIONS_40.map((sol) => (
            <div key={sol.id} className="rounded-2xl border border-[#ded9cb] bg-[#fdfcf8] p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-[#245f62]">
                  {`السؤال ${sol.number} (${sol.marker}) — المستوى ${sol.level}`}
                </span>
              </div>
              <div
                dir="ltr"
                lang="en"
                style={{ direction: "ltr", unicodeBidi: "isolate", textAlign: "left" }}
                className="font-mono text-xs sm:text-sm font-bold text-[#17354a]"
              >
                <EnBidi>{sol.prompt}</EnBidi>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-[#28533b]">
                <MixedBidi>{`الجواب: ${sol.sourceAnswer} — ${sol.sourceReason}`}</MixedBidi>
              </p>
              <p className="text-xs font-semibold text-[#43575a]">
                <MixedBidi>{sol.platformExplanation}</MixedBidi>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* جدول تغطية المصدر (Cover + §1–§29) */}
      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-6 space-y-4">
        <h3 className="text-lg font-extrabold text-[#17354a]">
          سجل تغطية المصدر الكامل (Cover + الأقسام 1–29)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-right text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#ded9cb] bg-[#eef4f0] text-[#17354a]">
                <th className="px-3 py-2.5 font-extrabold">القسم</th>
                <th className="px-3 py-2.5 font-extrabold">العنوان</th>
                <th className="px-3 py-2.5 font-extrabold">الحالة</th>
                <th className="px-3 py-2.5 font-extrabold">موضع التنفيذ</th>
                <th className="px-3 py-2.5 font-extrabold">الإضافة التفاعلية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e6e1d5]">
              {COVERAGE_40.map((row) => (
                <tr key={row.id} className="bg-[#ffffff]">
                  <td className="px-3 py-2.5 font-extrabold text-[#245f62]">
                    {row.num == null ? "Cover" : `§${row.num}`}
                  </td>
                  <td className="px-3 py-2.5 font-bold text-[#17354a]">
                    <MixedBidi>{row.title}</MixedBidi>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-xs text-[#28533b]">{row.transfer}</td>
                  <td className="px-3 py-2.5 text-[#24343b]">
                    <MixedBidi>{row.location}</MixedBidi>
                  </td>
                  <td className="px-3 py-2.5 text-[#43575a]">
                    <MixedBidi>{row.platformAddition ?? "—"}</MixedBidi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* انتقال مباشر إلى أي خطوة دون ازدحام قائمة الأزرار */}
      <div className="rounded-3xl border border-[#d5d0c3] bg-[#fffdf8] p-5 space-y-3">
        <h3 className="text-base font-extrabold text-[#17354a]">الانتقال السريع إلى إحدى خطوات الدرس ({SLIDES_40.length} خطوة)</h3>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="teacher40-step-jump" className="text-sm font-bold text-[#17354a]">اختر الخطوة</label>
          <select id="teacher40-step-jump" value={jumpIndex} onChange={(event) => setJumpIndex(Number(event.target.value))} className="min-w-0 flex-1 rounded-xl border border-[#b9c8c0] bg-white px-3 py-2 text-sm">
            {SLIDES_40.map((slide, idx) => <option key={slide.id} value={idx}>{`${idx + 1}. ${slide.focus} — ${slide.title}`}</option>)}
          </select>
          <button type="button" onClick={() => onJumpToStep(jumpIndex)} className="rounded-xl bg-[#075fe4] px-4 py-2 text-sm font-extrabold text-white">افتح الخطوة المحددة</button>
        </div>
      </div>
    </div>
  );
}

export default TeacherGuide40;
