import { useMemo, useState } from "react";
import { CHAPTERS_36 } from "./data";
import { SOURCE_SECTIONS_36 } from "./ledger36";
import { TEST_SOLUTIONS_36 } from "./solutionsData36";
import { DETECTIVE_ITEMS_36, DIALOGUE19_ITEMS_36, EXERCISE18_ITEMS_36, READING_ANALYSIS_36, READING_ANSWERS_36, READING_QUESTIONS_36, WRITING_CRITERIA_36, WRITING_MODEL_36 } from "./practiceData36";
import { TEST_LEVELS_36 } from "./testData36";
import { ActionButton36, Card36, FOCUS_36, PlatformNote36, SourceLine36 } from "./kit36";
import { Rich } from "../../shared/lessonKit";

const TABS = [
  { id: "plan", label: "خطة التدريس" },
  { id: "coverage", label: "خريطة التغطية" },
  { id: "practice", label: "مفاتيح التدريب والقراءة" },
  { id: "test", label: "حلول الاختبار" },
  { id: "writing", label: "دعم الكتابة والتصحيح" },
] as const;
type Tab36 = (typeof TABS)[number]["id"];

const DESTINATION_36: Record<string, string> = {
  cover: "Student step 1 · opening",
  s01: "Student step 2 · objectives",
  s02: "Student step 3 · computer context comparison",
  s03: "Student step 4 · accessible comparison table",
  s04: "Student step 5 · spontaneous decision / prior plan",
  s05: "Student step 6 · cook and study context lab",
  s06: "Student step 7 · prediction / evidence lab",
  s07: "Student step 8 · evidence does not ban WILL",
  s08: "Student step 9 · promises and offers",
  s09: "Student step 10 · WILL YOU / ARE YOU GOING TO",
  s10: "Student step 11 · time expressions",
  s11: "Student step 12 · structure review",
  s12: "Student step 13 · Wh questions",
  s13: "Student step 14 · WILL BE / GOING TO BE",
  s14: "Student step 15 · complete bilingual dialogue and six analyses",
  s15: "Student step 16 · overlap and emphasis",
  s16: "Student step 17 · four travel contexts",
  s17: "Student step 18 · ten-item Grammar Detective",
  s18: "Student step 19 · eight-item choose-the-form practice",
  s19: "Student step 20 · Sara/Adam dialogue completion",
  s20: "Student step 21 · context-writing challenge",
  s21: "Student step 22 · full Robotics reading + comprehension and analysis key after attempt",
  s22: "Student step 23 → separate Test Area · 25 questions in five levels",
  s23: "Student step 24 → separately gated Solutions Area",
  s24: "Student step 25 · writing workspace and source model",
  s25: "Student step 26 · golden summary",
  s26: "Student step 27 · curriculum map and Lesson 37 preview",
};

const COMMON_ERRORS_36 = [
  { head: "خلط تركيبين مستقبليين", note: "لا تجمع will وgoing to في بناء واحد. اختر إطارًا واحدًا: Subject + will + V1 أو Subject + am/is/are + going to + V1." },
  { head: "تصريف الفعل بعد will", note: "بعد will / won't يأتي V1: He will go، لا He will goes؛ وWe won't cancel، بلا to." },
  { head: "صيغة be بعد going to", note: "بعد going to يأتي V1: going to be، لا going to is / am." },
  { head: "بناء السؤال", note: "WILL: Will + subject + V1?؛ GOING TO: Am/Is/Are + subject + going to + V1? لا نستخدم do/does في هذا البناء." },
  { head: "اختيار الزمن من كلمة وقت", note: "tomorrow وnext week تحددان زمن الحدث، لا نية المتحدث ولا نوع التوقع وحدهما." },
  { head: "الدليل ليس حظرًا نحويًا", note: "يمكن أن يختار المتحدث WILL مع وجود دليل إذا أراد إبراز رأيه أو اعتقاده؛ BE GOING TO اختيار نموذجي عند إبراز الدليل، لا قانون حصري." },
  { head: "البدائل السياقية", note: "في سؤال يسمح بأكثر من قراءة، صنّف البديل: خطأ بنيوي، أو صحيح لكنه أقل طبيعية للسياق، أو صحيح بتركيز مختلف. لا تخصم لمجرد أن صيغة أخرى أكثر نموذجية." },
];

export default function TeacherGuide36({ onGoSolutions, onLock }: { onGoSolutions: () => void; onLock: () => void }) {
  const [tab, setTab] = useState<Tab36>("plan");
  const mapped = useMemo(() => SOURCE_SECTIONS_36.filter((section) => section.num != null), []);
  return (
    <div data-area="lesson36-teacher" className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#d8d2c5] bg-white p-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.12em] text-[#53676a]">Teacher Area · Lesson 36</p>
          <h1 className="text-xl font-black text-[#17354a]">دليل المعلم — WILL vs BE GOING TO</h1>
          <p className="mt-1 text-sm text-[#43575a]">خمسة أقسام منظمة؛ المفاتيح الرسمية إضافات معلم منفصلة عن نص المصدر.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ActionButton36 variant="secondary" onClick={onGoSolutions}>فتح منطقة الحلول</ActionButton36>
          <ActionButton36 variant="secondary" onClick={onLock}>قفل منطقة المعلم</ActionButton36>
        </div>
      </header>

      <nav aria-label="أقسام دليل المعلم" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {TABS.map((item) => (
          <button key={item.id} type="button" aria-pressed={tab === item.id} onClick={() => setTab(item.id)} className={`${FOCUS_36} min-h-12 rounded-xl border px-3 py-2 text-sm font-black transition-colors motion-reduce:transition-none ${tab === item.id ? "border-[#245f62] bg-[#245f62] text-white" : "border-[#cfd8d2] bg-white text-[#24343b] hover:bg-[#eef4f0]"}`}>
            {item.label}
          </button>
        ))}
      </nav>

      {tab === "plan" ? <TeachingPlan36 /> : null}
      {tab === "coverage" ? <Coverage36 sections={mapped} /> : null}
      {tab === "practice" ? <PracticeKeys36 /> : null}
      {tab === "test" ? <TeacherTestSolutions36 /> : null}
      {tab === "writing" ? <WritingSupport36 /> : null}
    </div>
  );
}

function TeachingPlan36() {
  return (
    <div className="space-y-4">
      <Card36 eyebrow="Platform-authored teacher addition" title="مسار تدريس مقترح">
        <ol className="list-decimal space-y-2 ps-5 text-base leading-7 text-[#24343b]">
          <li><strong>ابدأ بالمعنى:</strong> قارن قراري الحاسوب في §2 قبل مراجعة الصيغ. اطلب من المتعلمين تحديد متى نشأت النية.</li>
          <li><strong>انقل التفكير إلى الموقف:</strong> استخدم المصباح والكراسي والطبخ والدراسة في §§4–5، ولا تجعل الأفعال مفاتيح آلية لاختيار البناء.</li>
          <li><strong>افصل التوقع عن الدليل:</strong> في §§6–7 اطلب وصف الدليل الحالي أولًا، ثم وضّح أن WILL لا تصبح خطأ بسببه.</li>
          <li><strong>وسّع وظائف WILL:</strong> اربط الوعود والعروض والاستعداد في §§8–9، ثم اختبر أثر الوقت في §10.</li>
          <li><strong>حلّل شكل الجملة:</strong> راجع §§11–13 بعد أن يفهم المتعلم المعنى، مع قراءة الصيغ الإنجليزية LTR.</li>
          <li><strong>حلّل الحوار ثم وسّع السياق:</strong> استخدم §§14–16، واسمح بالتداخل عندما لا يفرض السياق معنى واحدًا.</li>
          <li><strong>درّب ثم اختبر:</strong> نفّذ نشاطات §§17–21 قبل فتح Master Test في منطقة مستقلة؛ لا تعرض مفاتيح الاختبار قبل التسليم/فتح المعلم.</li>
          <li><strong>اختم بالإنتاج:</strong> استخدم §24 checklist للتأمل الذاتي، ثم اربط §25 بالتمهيد الدقيق للدرس 37 في §26.</li>
        </ol>
      </Card36>
      <Card36 eyebrow="Teaching priorities" title="أسئلة تشخيصية متكررة">
        <ul className="list-disc space-y-2 ps-5 text-base leading-7 text-[#24343b]">
          <li>متى اتُخذ القرار؟</li>
          <li>هل يعرض المتحدث خطة سابقة، أو وعدًا/عرضًا لحظيًا؟</li>
          <li>هل يقدّم اعتقادًا عامًا، أم يختار إبراز دليل حاضر؟</li>
          <li>إذا كانت الصيغتان ممكنتين، ما التركيز الذي يريد المتحدث إبرازه؟</li>
          <li>هل توجد كلمة زمنية فقط، أم سياق يكشف سبب اختيار الصيغة؟</li>
        </ul>
      </Card36>
      <Card36 eyebrow="Common error repair · platform-authored" title="أخطاء متوقعة وكيفية معالجتها">
        <div className="grid gap-3 md:grid-cols-2">
          {COMMON_ERRORS_36.map((item) => <article key={item.head} className="rounded-2xl border border-[#d8d2c5] bg-[#fbfaf6] p-3"><h3 className="font-black text-[#17354a]">{item.head}</h3><p className="mt-1 text-sm leading-6 text-[#24343b]">{item.note}</p></article>)}
        </div>
      </Card36>
    </div>
  );
}

function Coverage36({ sections }: { sections: typeof SOURCE_SECTIONS_36 }) {
  return (
    <div data-coverage-section-count={sections.length} className="space-y-4">
      <Card36 eyebrow="Source coverage · section by section" title="خريطة تغطية الأقسام الـ26">
        <p className="text-sm leading-6 text-[#43575a]">كل عنوان أدناه يطابق رقم المصدر، ويربطه بخطوة المتعلم وبمنطقة التمرين/الاختبار. افتح أي صف للاطلاع على وحدات المصدر كاملة، بما فيها مفاتيح التمارين الأصلية.</p>
        <PlatformNote36>المحتوى المعروض هنا هو سجل تغطية للمعلم. مفاتيح الاختبار الرسمية ليست من المصدر؛ راجع تبويب «حلول الاختبار» للإضافات المعلمة.</PlatformNote36>
        <ol className="space-y-2">
          {sections.map((section) => (
            <li key={section.id} data-coverage-section={section.num}>
              <details className="rounded-2xl border border-[#d8d2c5] bg-white">
                <summary className={`${FOCUS_36} cursor-pointer list-inside px-3 py-3 text-sm font-black text-[#17354a]`}>
                  §{section.num} · <Rich text={section.title} />
                  <span className="mt-1 block text-xs font-bold text-[#53676a]">{DESTINATION_36[section.id]}</span>
                </summary>
                <div className="space-y-1 border-t border-[#e3e0d7] bg-[#fbfaf6] p-3">
                  {section.tableRows ? (
                    <ul className="list-disc space-y-1 ps-5 text-sm text-[#24343b]">{section.tableRows.map(([situation, form]) => <li key={situation}><Rich text={`${situation} — ${form}`} /></li>)}</ul>
                  ) : null}
                  {section.units.map((line, index) => <SourceLine36 key={index} sectionId={section.id} index={index} text={line} />)}
                  {section.revealUnits?.length ? <div className="mt-2 rounded-xl border border-[#b8d6c0] bg-[#edf5ee] p-2"><p className="text-xs font-black text-[#28533b]">مفتاح تدريب أصلي / وحدات كشف من المصدر</p>{section.revealUnits.map((line, index) => <SourceLine36 key={index} sectionId={section.id} index={index} kind="reveal" text={line} />)}</div> : null}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Card36>
      <Card36 eyebrow="Source-shape audit notes" title="ملاحظات وفاء المصدر">
        <ul className="list-disc space-y-2 ps-5 text-sm leading-6 text-[#24343b]">
          <li>§3 أعيد بناؤه في جدول دلالي ذي رؤوس وصفوف واضحة، مع صفوف المصدر الثمانية دون إضافة معنى.</li>
          <li>§22 موجود في Test Area مرة واحدة بوصفه اختبارًا رسميًا من 25 سؤالًا وخمسة مستويات.</li>
          <li>§23 يورد العنوان وعبارة كشف الحلول فقط؛ كل حل رسمي في التطبيق موسوم بأنه إضافة تعليمية.</li>
          <li>§21 القراءة وأسئلتها وإجاباتها وتحليلها متتبعة إلى وحدات المصدر في الخطوة نفسها.</li>
          <li>أسئلة Q21–Q25 مفتوحة؛ الحلول النموذجية لا تمثل إجابة وحيدة، ويُقبل البديل النحوي المدعوم بالسياق.</li>
        </ul>
      </Card36>
    </div>
  );
}

function PracticeKeys36() {
  const s17 = sourceSectionForTeacher("s17");
  const s18 = sourceSectionForTeacher("s18");
  const s19 = sourceSectionForTeacher("s19");
  const reading = sourceSectionForTeacher("s21");
  return (
    <div className="space-y-4">
      <Card36 eyebrow="§17 · supplied answer key" title="Grammar Detective — الإجابات العشر">
        <p className="text-sm leading-6 text-[#43575a]">الإجابات المدرجة في نص الدرس المورّد. الشروح التوسعية أدناه إضافة تعليمية من المعلم.</p>
        <div className="space-y-2">{DETECTIVE_ITEMS_36.map((item) => <div key={item.n} className="rounded-xl border border-[#d8d2c5] bg-white p-3"><p className="text-sm font-bold text-[#53676a]">{item.n}. <Rich text={item.prompt} /></p><p className="mt-1 text-base font-black text-[#17354a]">{item.answers.map((answer, index) => <span key={answer}><span dir="ltr" className="font-en">{answer}</span>{index < item.answers.length - 1 ? " / " : ""}</span>)}</p><p className="mt-1 text-sm leading-6 text-[#24343b]"><span className="font-black">تعليل معلم:</span> {item.feedback}</p></div>)}</div>
        <p className="text-sm leading-6 text-[#24343b]">في مثال الكوب، الإجابة المعتادة تعليميًا هي <span dir="ltr" className="font-en">Look! The glass is going to fall.</span>، لكن المصدر يصرح بأن <span dir="ltr" className="font-en">Look! The glass will fall.</span> ممكنة نحويًا؛ لا تصحّحها بوصفها خطأ.</p>
        {s17.revealUnits?.length ? <details className="rounded-xl border border-[#d8d2c5] bg-[#fbfaf6] p-3"><summary className={`${FOCUS_36} cursor-pointer font-black text-[#17354a]`}>إظهار المفتاح الأصلي كاملًا</summary>{s17.revealUnits.map((line, index) => <SourceLine36 key={index} sectionId="s17" index={index} kind="reveal" text={line} />)}</details> : null}
      </Card36>

      <Card36 eyebrow="§18 · supplied key and explanations" title="اختر الصيغة الأنسب — الإجابات الثماني">
        {EXERCISE18_ITEMS_36.map((item) => <p key={item.n} className="rounded-xl border border-[#d8d2c5] bg-white p-3 text-sm leading-6 text-[#24343b]"><strong className="text-[#17354a]">{item.n}. {item.answer}</strong> — {item.explanation}</p>)}
        {s18.revealUnits?.map((line, index) => <SourceLine36 key={index} sectionId="s18" index={index} kind="reveal" text={line} />)}
      </Card36>

      <Card36 eyebrow="§19 · supplied key and explanations" title="حوار Sara وAdam">
        <div className="space-y-2">{DIALOGUE19_ITEMS_36.map((item) => <div key={item.n} className="rounded-xl border border-[#d8d2c5] bg-white p-3"><p className="font-black text-[#17354a]">الفراغ {item.n}: <span dir="ltr" className="font-en">{item.answer}</span></p><p className="text-sm leading-6 text-[#24343b]">{item.explanation}</p></div>)}</div>
        <p className="mt-2 text-sm leading-6 text-[#24343b]">وجود جدول الاختبارات دليل سياقي، لكنه لا يمنع استعمال <span dir="ltr" className="font-en">will</span> عندما تعبّر الجملة عن اعتقاد المتحدث، كما يؤكد المصدر.</p>
        {s19.revealUnits?.map((line, index) => <SourceLine36 key={index} sectionId="s19" index={index} kind="reveal" text={line} />)}
      </Card36>

      <Card36 eyebrow="§21 · supplied reading key" title="إجابات القراءة وتحليلها النحوي">
        <p className="text-xs font-black text-[#53676a]">أسئلة المصدر ({READING_QUESTIONS_36.length}) والإجابات ({READING_ANSWERS_36.length})</p>
        <ol className="list-decimal space-y-2 ps-5">{READING_QUESTIONS_36.map((question, index) => <li key={question} className="text-sm leading-6 text-[#24343b]"><Rich text={question} /><p className="font-bold text-[#17354a]"><Rich text={READING_ANSWERS_36[index]} /></p></li>)}</ol>
        <h3 className="mt-3 font-black text-[#17354a]">التحليل النحوي ({READING_ANALYSIS_36.length} بنود)</h3>
        <ol className="list-decimal space-y-1 ps-5 text-sm leading-6 text-[#24343b]">{READING_ANALYSIS_36.map((line) => <li key={line} dir="auto"><Rich text={line} /></li>)}</ol>
        {reading.revealUnits?.map((line, index) => <SourceLine36 key={index} sectionId="s21" index={index} kind="reveal" text={line} />)}
      </Card36>
    </div>
  );
}

function TeacherTestSolutions36() {
  return (
    <div data-teacher-test-solutions="25" className="space-y-4">
      <Card36 eyebrow="§22 questions · §23 key" title="حلول الاختبار الرسمي — 25 سؤالًا">
        <PlatformNote36>كل الإجابات والشروح في هذا التبويب إضافات معلّمة أعدّتها المنصة؛ لا يقدّم المصدر مفتاحًا فعليًا في §23. البدائل المقبولة موضحة صراحةً.</PlatformNote36>
        <p className="text-sm leading-6 text-[#43575a]">تظل الأسئلة 16–25 تفسيرية/مفتوحة. استخدم نماذج الإجابة ومعايير قبول المعنى؛ لا تحوّلها إلى اختيار من متعدد أو إجابة واحدة جامدة.</p>
      </Card36>
      {TEST_LEVELS_36.map((level, index) => {
        const solutions = TEST_SOLUTIONS_36.filter((solution) => solution.n >= level.questions[0].n && solution.n <= level.questions.at(-1)!.n);
        return (
          <details key={level.id} className="rounded-2xl border border-[#d8d2c5] bg-white" open={index === 0}>
            <summary className={`${FOCUS_36} cursor-pointer px-4 py-3 font-black text-[#17354a]`}>
              {level.title} · Q{level.questions[0].n}–{level.questions.at(-1)!.n}
            </summary>
            <div className="space-y-3 border-t border-[#e3e0d7] p-3">
              {solutions.map((solution) => <article key={solution.n} data-teacher-solution={solution.n} className="rounded-xl border border-[#d8d2c5] bg-[#fbfaf6] p-3">
                <h3 className="font-black text-[#17354a]">Question {solution.n} — {solution.judgment}</h3>
                <p className="mt-1 text-sm leading-6 text-[#24343b]"><strong>نموذج/مفتاح:</strong> <Rich text={solution.answer} /></p>
                <p className="mt-1 text-sm leading-6 text-[#24343b]"><strong>التفسير:</strong> {solution.explanation}</p>
                {solution.alternatives?.length ? <ul className="mt-1 list-disc space-y-1 ps-5 text-sm leading-6 text-[#24343b]">{solution.alternatives.map((line) => <li key={line}>{line}</li>)}</ul> : null}
                <p className="mt-2 text-xs font-bold text-[#76531e]">Platform-authored teacher addition · reference: Lesson 36 §22 / §23</p>
              </article>)}
            </div>
          </details>
        );
      })}
    </div>
  );
}

function WritingSupport36() {
  return (
    <div className="space-y-4">
      <Card36 eyebrow="§24 · source task" title="My Future Decisions and Plans">
        <p className="text-sm leading-6 text-[#43575a]">المتطلبات الثمانية ونموذج الافتتاح محفوظة في Student Area §24. يعرض هذا القسم روبركًا اختياريًا من إعداد المعلم، ولا يستبدل أي شرط مصدري.</p>
        <ol className="list-decimal space-y-1 ps-5 text-sm leading-6 text-[#24343b]">{WRITING_CRITERIA_36.map((criterion) => <li key={criterion}><Rich text={criterion} /></li>)}</ol>
        <div className="rounded-xl border border-[#d8d2c5] bg-[#fbfaf6] p-3"><h3 className="font-black text-[#17354a]">نموذج الافتتاح الأصلي</h3>{WRITING_MODEL_36.map((line) => <p key={line} dir="auto" className="mt-1 text-sm leading-6 text-[#24343b]"><Rich text={line} /></p>)}</div>
      </Card36>
      <Card36 eyebrow="Optional scoring guide · platform-authored" title="مؤشرات تصحيح تكويني مقترحة">
        <ul className="list-disc space-y-2 ps-5 text-sm leading-6 text-[#24343b]">
          <li>استيفاء العدد المطلوب: 12–15 جملة، مع تماسك الفقرة وتسلسل أفكارها.</li>
          <li>عدّ الجمل التي تطابق أنواع الاستخدام المطلوبة، لا الكلمات المفتاحية وحدها.</li>
          <li>التحقق من بنية المساعد وV1 والنفي والأسئلة، مع عدم فرض صياغة نموذجية واحدة.</li>
          <li>في توقع الدليل، يُقبل أي وصف واضح للدليل الحالي والاستنتاج المستقبلي.</li>
          <li>تُقبل التعبيرات الزمنية المختلفة إذا أدت معناها؛ لا تُربط علامة الزمن تلقائيًا بصيغة واحدة.</li>
          <li>لا تُقيّم الفقرة آليًا بوصفها صحيحة/خاطئة؛ استخدم القائمة كأداة مراجعة ومناقشة مع الطالب.</li>
        </ul>
      </Card36>
    </div>
  );
}

function sourceSectionForTeacher(id: string) {
  const found = SOURCE_SECTIONS_36.find((section) => section.id === id);
  if (!found) throw new Error(`Teacher guide missing source section ${id}`);
  return found;
}
