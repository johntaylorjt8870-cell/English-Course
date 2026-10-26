import { COVERAGE_40, COVERAGE_ACCURACY_NOTES_40 } from "./coverage40";
import { SLIDES_40 } from "./data";
import { EnLine40, Rich40, isPureEnglishUnit40 } from "./kit40";
import { sourceSection40 as fullSourceSection40 } from "./ledger40";
import {
  DETECTIVE21_ITEMS_40,
  DIALOGUE2_CHALLENGE_40,
  EXERCISE19_ITEMS_40,
  FILL20_ITEMS_40,
  READING23_ITEMS_40,
  WRITING27_CRITERIA_40,
} from "./practiceData40";
import { SOLUTIONS_40 } from "./solutionsData40";

const TEACHING_PHASES_40 = [
  {
    phase: "المرحلة 1 — التشخيص والمفهوم الجامع (§§1–4)",
    focus:
      "ربط محطات الدروس 34–39 بالبوصلة ذات الأسئلة الستة، وتوضيح لماذا تقابل المحطات الست خمس صيغ نحوية رئيسية بعد محطة المقارنة في الدرس 36، ثم تدريب الطلاب على رؤية الحدث الواحد (study) من خمس زوايا.",
  },
  {
    phase: "المرحلة 2 — الجولات الأربع والمقارنة الثلاثية الفاصلة (§§5–10)",
    focus:
      "مقارنة WILL وBE GOING TO مع شرح منطقة التداخل الطبيعي، ثم تثبيت نوافذ الاستمرار والاكتمال والمدة وصولًا إلى مشروع آدم (4:00–8:00) وتصحيح اختصار «انتهى / لم ينتهِ».",
  },
  {
    phase: "المرحلة 3 — الضوابط النحوية وبناء الصيغ (§§11–15)",
    focus:
      "تحرير الطلاب من الاعتماد الآلي على الكلمات الزمنية، وتطبيق المضارع البسيط في الجمل الزمنية المستقبلية مقابل السؤال المباشر بـ When، وضبط FOR/SINCE وفعل الحالة know وبناء الفعل write دون خلط.",
  },
  {
    phase: "المرحلة 4 — التطبيق السياقي والقراءة التحليلية (§§16–24)",
    focus:
      "تحليل حواري مسابقة العلوم ورحلة العائلة، والمواقف الخالية من الكلمات الجاهزة، والتدريبات المتدرجة، وقصة مركز التعلم المستقبلي مع التركيز على سؤال: لماذا اختار الكاتب هذا الزمن؟",
  },
  {
    phase: "المرحلة 5 — التقييم الشامل ومراجعة البدائل (§§25–26)",
    focus:
      "إدارة الاختبار المكون من 25 سؤالًا عبر المستويات الخمسة، وتطبيق التصحيح البشري المرن على أسئلة المعنى (16–20) وقبول البدائل النحوية السليمة عندما يسمح السياق.",
  },
  {
    phase: "المرحلة 6 — الإنتاج الكتابي والانتقال إلى الدرس 41 (§§27–29)",
    focus:
      "متابعة كتابة فقرة My Future Learning Journey (15–18 جملة) وفق الشروط العشرة، وتثبيت القاعدة الذهبية الكبرى، والتمهيد لمنظومة الأفعال المساعدة في الدرس 41.",
  },
] as const;

const CONCEPTUAL_RUBRIC_40 = [
  {
    q: "16",
    criteria:
      "تمييز I will study tomorrow (قرار لحظي أو إخبار عن حدث مستقبلي) عن I'm going to study tomorrow (إبراز نية أو خطة موجودة مسبقًا).",
  },
  {
    q: "17",
    criteria:
      "تمييز At 8:00, I will be working (نشاط جارٍ عند الثامنة) عن By 8:00, I will have finished working (اكتمال العمل قبل أو بحلول الثامنة).",
  },
  {
    q: "18",
    criteria:
      "تمييز التركيز على النتيجة/العدد المكتمل (five articles — Future Perfect) عن التركيز على مدة النشاط الممتدة (for two weeks — Future Perfect Continuous).",
  },
  {
    q: "19",
    criteria:
      "الإجابة بـ «لا» مع توضيح جواز استخدام صيغ أخرى مثل Future Simple مع by (نحو I will finish the report by Friday) أو Future Perfect Continuous مع المدة.",
  },
  {
    q: "20",
    criteria:
      "توضيح أن when في الجملة الزمنية المستقبلية التابعة يتبعها Present Simple (مثل When you arrive)، مع تمييزها عن السؤال المباشر When will you arrive?.",
  },
] as const;

export function TeacherGuide40() {
  const s26 = fullSourceSection40("s26")!;

  return (
    <div id="lesson40-teacher-guide" className="flex flex-col gap-5">
      <section className="tcc-brief">
        <h2 className="m-0 text-base font-black text-slate-950">
          خطة التدريس الموصى بها (6 مراحل · {SLIDES_40.length} خطوة تفاعلية)
        </h2>
        <div className="mt-3 tcc-grid-2">
          {TEACHING_PHASES_40.map((p) => (
            <div key={p.phase} className="tcc-card">
              <div className="text-xs font-black text-teal-950">
                <Rich40 text={p.phase} />
              </div>
              <p className="mt-1.5 mb-0 text-xs font-bold leading-relaxed text-slate-800">
                <Rich40 text={p.focus} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="tcc-brief">
        <h2 className="m-0 text-base font-black text-slate-950">
          ملاحظات الدقة النحوية والتربوية ({COVERAGE_ACCURACY_NOTES_40.length} ملاحظات)
        </h2>
        <div className="mt-3 flex flex-col gap-2.5">
          {COVERAGE_ACCURACY_NOTES_40.map((row) => (
            <div key={row.id} className="tcc-card">
              <div className="text-xs font-black text-amber-950">
                <Rich40
                  text={`${row.num == null ? "Cover" : `§${row.num}`} — ${row.title}`}
                />
              </div>
              <p className="mt-1 mb-0 text-xs font-bold leading-relaxed text-slate-800">
                <Rich40 text={row.accuracyNote ?? ""} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="tcc-brief" data-conceptual-rubric="40">
        <h2 className="m-0 text-base font-black text-slate-950">
          سلم مراجعة المعلم للأسئلة التفسيرية المفتوحة (المستوى الرابع: الأسئلة 16–20)
        </h2>
        <p className="mt-1.5 mb-3 text-xs font-bold text-slate-700">
          لا تُصحَّح هذه الأسئلة الخمسة بمطابقة نصية جامدة؛ يراجعها المعلم دلاليًا ويقبل كل صياغة عربية أو إنجليزية تعبّر عن الفهم الصحيح.
        </p>
        <div className="flex flex-col gap-2">
          {CONCEPTUAL_RUBRIC_40.map((item) => (
            <div key={item.q} className="tcc-card text-xs font-bold text-slate-900">
              <Rich40 text={`السؤال ${item.q}: ${item.criteria}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="tcc-brief">
        <h2 className="m-0 text-base font-black text-slate-950">
          مفاتيح التدريبات التكوينية في خطوات الدرس (§17 · §19 · §20 · §21 · §23)
        </h2>
        <div className="mt-3 flex flex-col gap-4">
          <div>
            <h3 className="m-0 mb-2 text-xs font-black text-teal-950">
              §17 — تصنيف جمل A Family Trip:
            </h3>
            <div className="tcc-grid-2">
              {DIALOGUE2_CHALLENGE_40.map((it) => (
                <div key={it.id} className="tcc-card text-xs font-bold">
                  <Rich40 text={`${it.prompt} ← ${it.feedback}`} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="m-0 mb-2 text-xs font-black text-teal-950">
              §19 — التدريب الأول (6 بنود):
            </h3>
            <div className="tcc-grid-2">
              {EXERCISE19_ITEMS_40.map((it) => (
                <div key={it.n} className="tcc-card text-xs font-bold">
                  <Rich40 text={`#${it.n}: ${it.answer} (${it.answerText}) — ${it.why}`} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="m-0 mb-2 text-xs font-black text-teal-950">
              §20 — التدريب الثاني (8 بنود):
            </h3>
            <div className="tcc-grid-2">
              {FILL20_ITEMS_40.map((it) => (
                <div key={it.n} className="tcc-card text-xs font-bold">
                  <Rich40 text={`#${it.n}: ${it.answer} — ${it.why}`} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="m-0 mb-2 text-xs font-black text-teal-950">
              §21 — Grammar Detective (10 بنود):
            </h3>
            <div className="tcc-grid-2">
              {DETECTIVE21_ITEMS_40.map((it) => (
                <div key={it.n} className="tcc-card text-xs font-bold">
                  <EnLine40 tone="right">{`#${it.n}: ${it.answer}`}</EnLine40>
                  <div className="mt-1">
                    <Rich40 text={it.why} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="m-0 mb-2 text-xs font-black text-teal-950">
              §23 — أسئلة القراءة الثمانية:
            </h3>
            <div className="tcc-grid-2">
              {READING23_ITEMS_40.map((it) => (
                <div key={it.id} className="tcc-card text-xs font-bold">
                  <Rich40 text={`${it.prompt} — ${it.feedback}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tcc-brief">
        <h2 className="m-0 text-base font-black text-slate-950">
          سلم تقييم مهمة الكتابة (§27 — My Future Learning Journey · 15–18 جملة)
        </h2>
        <div className="mt-3 tcc-grid-2">
          {WRITING27_CRITERIA_40.map((cr, idx) => (
            <div key={idx} className="tcc-card text-xs font-bold">
              <Rich40 text={cr} />
            </div>
          ))}
        </div>
      </section>

      <section className="tcc-brief" data-source-section="s26">
        <h2 className="m-0 text-base font-black text-slate-950">
          النص المرجعي الكامل لمفاتيح الاختبار النهائي (§26 — {SOLUTIONS_40.length} سؤالًا)
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {s26.units.map((line, idx) =>
            isPureEnglishUnit40(line) ? (
              <EnLine40 key={idx} tone="right">
                {line}
              </EnLine40>
            ) : (
              <p key={idx} className="tcc-unit-ar">
                <Rich40 text={line} />
              </p>
            )
          )}
        </div>
      </section>

      <section className="tcc-brief" data-coverage-ledger="40">
        <h2 className="m-0 text-base font-black text-slate-950">
          سجل التغطية الكامل للمادة التعليمية ({COVERAGE_40.length} سجلًا: المقدمة + 29 قسمًا مرقمًا)
        </h2>
        <div className="tcc-table-wrap mt-3">
          <table className="tcc-table">
            <thead>
              <tr>
                <th>القسم</th>
                <th>العنوان</th>
                <th>موضع التنفيذ</th>
                <th>طريقة النقل</th>
                <th>الإضافة التفاعلية</th>
              </tr>
            </thead>
            <tbody>
              {COVERAGE_40.map((row) => (
                <tr key={row.id}>
                  <td>{row.num == null ? "Cover" : `§${row.num}`}</td>
                  <td>
                    <Rich40 text={row.title} />
                  </td>
                  <td>
                    <Rich40 text={row.location} />
                  </td>
                  <td>{row.transfer}</td>
                  <td>
                    <Rich40 text={row.platformAddition ?? "—"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TeacherGuide40;
