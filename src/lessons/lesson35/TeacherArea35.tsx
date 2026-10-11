import { useState, type ReactNode } from "react";
import { En, PlatformTag, Rich } from "../../shared/lessonKit";
import { SOURCE_SECTIONS_35 } from "./ledger35";
import {
  AUXILIARY_ITEMS_35,
  DECISION_PRACTICE_ITEMS_35,
  DETECTIVE_ITEMS_35,
  FINAL_BOSS_MODEL_35,
  FINAL_BOSS_REQUIREMENTS_35,
  READING_ANALYSIS_35,
  READING_ANSWERS_35,
  TRANSFORMATION_ITEMS_35,
} from "./practiceData";
import { TEST_35_COUNT, TEST_LEVEL_COUNT_35 } from "./testData";
import { FinalTestAnswerKey } from "../../shared/finalTest";
import { FINAL_TESTS } from "../../shared/finalTestBank";
import { Card35, FOCUS_35 } from "./kit35";

const TEACHER_PASSWORD_35 = "somer173";
const TEACHER_STEPS_35 = [
  "تمهيد ومعنى الخطة السابقة ولحظة القرار — 8 دقائق.",
  "الصيغة الأساسية، الفاعل والمساعد، بناء الجمل والاختصارات — 18 دقيقة.",
  "تدريس الاستخدامين والسياق والتداخل بين WILL وBE GOING TO — 16 دقيقة.",
  "النفي والسؤال وWH وWHO والتعابير الزمنية — 22 دقيقة.",
  "التوقع بالدليل، أمثلة السياق، والأخطاء الشائعة — 14 دقيقة.",
  "التدرب والقراءة والاختبار — 25 دقيقة.",
  "مهمة الكتابة والملخص والخريطة — 15 دقيقة.",
];
const TEACHER_NOTES_35 = [
  { head: "علّم المعنى قبل الصيغة", lines: ["ابدأ بسؤال: متى اتخذ المتحدث القرار؟ اجعل المتعلم يميّز بين قرار سابق وخيار اتُّخذ لحظة الكلام قبل أن يملأ am / is / are.", "في التوقع، اطلب من الطالب تسمية الدليل الذي يراه الآن ثم توقعه؛ لا تجعل وجود الدليل شرطًا نحويًا حصريًا لـ BE GOING TO."] },
  { head: "WILL وBE GOING TO: استعمالات نموذجية وليست حظرًا متبادلًا", lines: ["قد تلائم الصيغتان موقفًا واحدًا بحسب ما يريد المتحدث إبرازه: القرار اللحظي أو الوعد أو الاعتقاد، مقابل النية السابقة أو الدليل الحاضر.", "لا تصحح صيغةً صحيحة نحويًا باعتبارها خطأ لمجرد أن الصيغة الأخرى أكثر نموذجية في سياق التمرين. ناقش فرق المعنى/التركيز، والسياق، ودرجة شيوع الاختيار.", "كلمات مثل tomorrow أو next week تحدد الزمن، ولا تفرض اختيار WILL أو BE GOING TO وحدها."] },
  { head: "الاستثناء ليس وعدًا بالنتيجة", lines: ["BE GOING TO تفيد نية أو خطة سابقة، لكنها لا تضمن التنفيذ. أعد ربط هذه الفكرة بمثال التمرين بدل تفسير البناء كيقين كامل.", "في توقع الدليل، صِف ما يظهر في المشهد أولًا ثم اربطه بالتوقع؛ الفرق تداولي ومعنوي لا قاعدة تلغي WILL."] },
  { head: "نموذج الكتابة لا يقيّد الطالب", lines: ["تحقق من متطلبات Final Boss واحدةً واحدة. اقبل مفردات وأمثلة أخرى متى كان المعنى واضحًا والبناء المطلوب صحيحًا.", "شجّع على وضع تصحيح الذات بين قوسين قبل النسخة النظيفة، لكن لا تعاقب المتعلم إن لم يكن لديه خطأ حقيقي ليصححه."] },
];

export default function TeacherArea35({ unlocked, onUnlockChange, onGoSolutions }: { unlocked: boolean; onUnlockChange: (value: boolean) => void; onGoSolutions: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  if (!unlocked) {
    return (
      <form data-area="lesson35-teacher" onSubmit={(event) => {
        event.preventDefault();
        if (password === TEACHER_PASSWORD_35) { setPassword(""); setError(""); onUnlockChange(true); }
        else setError("كلمة المرور غير صحيحة.");
      }} className="mx-auto max-w-md space-y-3 rounded-3xl border-2 border-[#bcb0d6] bg-white p-5">
        <h2 className="text-xl font-black text-[#43385b]">👩‍🏫 منطقة المعلم · Lesson 35</h2>
        <p className="text-sm leading-6 text-[#625b72]">هذه المنطقة منفصلة عن منطقة الحلول: دليل التدريس، مفاتيح تمارين الدرس، مفتاح القراءة، وروبرك الكتابة.</p>
        <label htmlFor="l35-teacher-password" className="block text-sm font-black text-[#43385b]">كلمة مرور المعلم</label>
        <input id="l35-teacher-password" type="password" dir="ltr" autoComplete="off" value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={error ? true : undefined} aria-describedby={error ? "l35-teacher-error" : undefined} className={`${FOCUS_35} w-full rounded-xl border-2 border-[#c9c0dc] bg-white px-3 py-2 text-base text-[#43385b]`} />
        {error ? <p id="l35-teacher-error" role="alert" className="text-sm font-black text-[#9a3b43]">✕ {error}</p> : null}
        <button type="submit" className={`${FOCUS_35} w-full rounded-xl bg-[#5d4c7d] px-4 py-2.5 text-sm font-black text-white`}>🔓 دخول</button>
      </form>
    );
  }
  return (
    <div data-area="lesson35-teacher" className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-2 rounded-3xl border-2 border-[#c9c0dc] bg-white p-4">
        <div><div className="text-[10px] font-black uppercase tracking-[.15em] text-[#85759f]">Teacher Area · private</div><h2 className="text-xl font-black text-[#43385b]">دليل المعلم — الدرس 35</h2></div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onGoSolutions} className={`${FOCUS_35} rounded-xl border border-[#9382b0] bg-white px-3 py-2 text-xs font-black text-[#5d4c7d]`}>🔑 حلول الاختبار</button>
          <button type="button" onClick={() => onUnlockChange(false)} className={`${FOCUS_35} rounded-xl bg-[#eeeaf4] px-3 py-2 text-xs font-black text-[#5d4c7d]`}>🔒 قفل منطقة المعلم</button>
        </div>
      </header>

      <FinalTestAnswerKey lesson={35} questions={FINAL_TESTS[35]} accent="bg-[#5d4c7d]" />

      <Card35 eyebrow="Teacher overview" title="أهداف التدريس والحدود المصدرية">
        <ul className="list-disc space-y-1 ps-5 text-sm leading-6 text-[#465962]">
          <li>إتقان البنية <En>Subject + am/is/are + going to + V1</En> في الإثبات والنفي والأسئلة.</li>
          <li>التمييز بين خطط/نوايا سابقة، القرارات اللحظية، الوعود، الاعتقادات، والتوقعات المبنية على دليل حاضر.</li>
          <li>الحفاظ على التمييز السياقي بين WILL وBE GOING TO، مع الإقرار بالتداخل والاختيارات الممكنة للصيغتين.</li>
          <li>تطبيق الصيغة في المحادثة والقراءة والكتابة؛ ونقل المتعلم من معرفة القاعدة إلى اختيارها وفق المعنى.</li>
        </ul>
        <p className="mt-3 rounded-xl border border-[#d9cda8] bg-[#fbf6e9] p-3 text-sm leading-6 text-[#685833]"><PlatformTag text="ملاحظة مصدرية" /> يَعِد §35 بالحلول التفصيلية ويقول «عرض الحلول التفصيلية»، لكنه لا يورد إجابات أو شروحًا فعلية. حلول اختبار §34 في منطقة الحلول إعداد تعليمي من المعلم/المنصة، لا نصٌّ منقول عن المصدر.</p>
      </Card35>

      <Card35 eyebrow="Suggested pacing · authored" title="توزيع مقترح للحصص">
        <ol className="list-decimal space-y-1 ps-5 text-sm leading-6 text-[#465962]">{TEACHER_STEPS_35.map((line) => <li key={line}><Rich text={line} /></li>)}</ol>
        <p className="mt-2 text-xs font-bold text-[#758080]">توزيع تقريبي من إعداد المعلم، ويمكن تقسيم الدرس على أكثر من حصة بحسب مستوى الصف.</p>
      </Card35>

      <Card35 eyebrow="Pedagogical notes · authored" title="ملاحظات تدريسية">
        <p className="mb-2 text-xs font-black text-[#705d8d]"><PlatformTag text="إرشادات من إعداد المعلم؛ ليست اقتباسًا من المصدر" /></p>
        {TEACHER_NOTES_35.map((note) => <Sub35 key={note.head} title={note.head}><ul className="list-disc space-y-1 ps-5 text-sm leading-6 text-[#465962]">{note.lines.map((line) => <li key={line}><Rich text={line} /></li>)}</ul></Sub35>)}
      </Card35>

      <PracticeKey35 title="Grammar Detective · مفاتيح المصدر الثمانية" items={DETECTIVE_ITEMS_35} />
      <PracticeKey35 title="اختر am / is / are · المفاتيح الثمانية" items={AUXILIARY_ITEMS_35} />
      <PracticeKey35 title="حوّل إلى BE GOING TO · المفاتيح الستة" items={TRANSFORMATION_ITEMS_35} />
      <Card35 eyebrow="§31 · source answer key + explanations" title="اختَر WILL أو BE GOING TO — المواقف الثمانية">
        <p className="mb-2 text-xs font-bold text-[#53676a]">الإجابات والتفسيرات في هذا القسم من النص المورّد؛ تُعرض هنا للمعلم لا في منطقة الطالب.</p>
        {DECISION_PRACTICE_ITEMS_35.map((item) => <div key={item.n} className="mb-2 rounded-xl border border-[#ded9e9] bg-white p-3"><p className="text-sm font-bold text-[#304750]">{item.n}. {item.promptLines.map((line) => <span key={line} className="block"><Rich text={line} /></span>)}</p><p className="mt-1 text-sm font-black text-[#5d4c7d]"><span className="text-xs">المفتاح الأصلي: </span><En>{item.answer}</En></p><p className="mt-1 text-sm leading-6 text-[#53676a]">{item.explanation}</p></div>)}
      </Card35>

      <Card35 eyebrow="§33 · source answer key" title="إجابات الفهم القرائي والتحليل النحوي">
        <Sub35 title="إجابات أسئلة الفهم"><ol className="list-decimal space-y-1 ps-5 text-sm leading-6 text-[#465962]">{READING_ANSWERS_35.map((line, index) => <li key={index}><Rich text={line} /></li>)}</ol></Sub35>
        <Sub35 title="التحليل النحوي المرفق"><ul className="list-disc space-y-1 ps-5 text-sm leading-6 text-[#465962]">{READING_ANALYSIS_35.map((line, index) => <li key={index} dir="auto"><Rich text={line} /></li>)}</ul></Sub35>
      </Card35>

      <Card35 eyebrow="Final Boss · authored scoring guide" title="روبرك مقترح للفقرة 12–15 جملة">
        <p className="mb-2 text-xs font-bold text-[#53676a]">المتطلبات التالية نصٌّ من المصدر. الروبرك وإرشادات التقييم أسفلها إضافة من المعلم.</p>
        <ol className="list-decimal space-y-1 ps-5 text-sm leading-6 text-[#304750]">{FINAL_BOSS_REQUIREMENTS_35.map((line, index) => <li key={index}><Rich text={line} /></li>)}</ol>
        <Sub35 title="مؤشرات تقييم تكويني — من إعداد المعلم">
          <ul className="list-disc space-y-1 ps-5 text-sm leading-6 text-[#465962]">
            <li>اكتمال الموضوع (2)؛ 12–15 جملة (2)؛ جملتان على الأقل لكل صيغة مستقبل (4).</li>
            <li>تنوع أغراض WILL/BE GOING TO، واستخدام ثلاث علامات زمنية على الأقل (3).</li>
            <li>دقة المساعد وV1 والنفي والسؤال (4)؛ رابط أو إشارة دليل في التوقع (2)؛ ترابط الفقرة وإمكانية فهمها (3).</li>
          </ul>
          <p className="mt-2 text-xs font-bold text-[#758080]">المجموع المقترح: 20 نقطة. اقبل تنويعات صحيحة في المعنى والصياغة؛ لا تجعل استعمال الصيغتين متنافيًا.</p>
        </Sub35>
        <div className="mt-3 rounded-2xl border border-[#ded9e9] bg-white p-3"><div className="mb-1 text-xs font-black text-[#705d8d]">النموذج الكامل كما ورد في المصدر</div>{FINAL_BOSS_MODEL_35.map((line, index) => <p key={index} dir="auto" className="text-sm leading-6 text-[#304750]"><Rich text={line} /></p>)}</div>
      </Card35>

      <Card35 eyebrow="Test map · source trace" title="تتبّع الاختبار والحلول">
        <p className="text-sm leading-6 text-[#465962]">يتضمن الاختبار {TEST_35_COUNT} سؤالًا موزعًا على {TEST_LEVEL_COUNT_35} مستويات. أسئلة §34 محفوظة في ترتيب المصدر. الإجابات والشروح التفصيلية أعدّها المعلم انطلاقًا من نص السؤال وقواعد الدرس، وهي معروضة في منطقة الحلول المنفصلة.</p>
        <button type="button" onClick={onGoSolutions} className={`${FOCUS_35} mt-3 rounded-xl border border-[#9382b0] bg-[#f8f6fc] px-4 py-2 text-sm font-black text-[#5d4c7d]`}>انتقل إلى حلول الاختبار</button>
      </Card35>

      <Card35 eyebrow="Source ledger · verbatim" title="فهرس المصدر الحرفي">
        <p className="mb-2 text-xs leading-5 text-[#657576]">كل قسم قابل للفتح. أسطر «reveal» التي قد تكون مفاتيح مصدر تظهر هنا للمعلم فقط؛ مفاتيح اختبار §34 في منطقة الحلول موضحة بأنها إعداد المعلم.</p>
        <ol className="space-y-1">{SOURCE_SECTIONS_35.map((section) => <li key={section.id}><details className="rounded-xl border border-[#e0dbd1] bg-white"><summary className={`${FOCUS_35} cursor-pointer px-3 py-2 text-sm font-black text-[#304750]`}><Rich text={section.title} /></summary><div className="space-y-1 border-t border-[#e9e3d7] px-3 py-2">{section.units.map((line, index) => <p key={index} dir="auto" className="text-sm leading-6 text-[#465962]"><Rich text={line} /></p>)}{section.revealUnits?.length ? <div className="mt-2 rounded-xl bg-[#f0f5ef] p-2"><div className="mb-1 text-[10px] font-black text-[#60756f]">مفتاح أصلي وارد في المصدر</div>{section.revealUnits.map((line, index) => <p key={index} dir="auto" className="text-sm leading-6 text-[#465962]"><Rich text={line} /></p>)}</div> : null}</div></details></li>)}</ol>
      </Card35>
    </div>
  );
}

function PracticeKey35({ title, items }: { title: string; items: { n: number; prompt: string; answer: string; explanation: string }[] }) {
  return <Card35 eyebrow="Source exercise key · teacher only" title={title}><p className="mb-2 text-xs font-bold text-[#53676a]">الإجابات منقولة من مفتاح المصدر. التعليل القصير موسوم بأنه تفسير تعليمي من المعلم.</p>{items.map((item) => <div key={item.n} className="mb-2 rounded-xl border border-[#ded9e9] bg-white p-3"><p className="text-sm font-bold leading-6 text-[#304750]">{item.n}. <Rich text={item.prompt} /></p><p className="mt-1 text-sm font-black text-[#5d4c7d]" dir="auto">المفتاح الأصلي: <Rich text={item.answer} /></p><p className="mt-1 text-xs leading-5 text-[#66777a]"><PlatformTag text="تعليل تعليمي من إعداد المعلم" /> <Rich text={item.explanation} /></p></div>)}</Card35>;
}

function Sub35({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mt-3 rounded-2xl bg-[#f7f6fa] p-3"><h3 className="mb-2 text-sm font-black text-[#5d4c7d]"><Rich text={title} /></h3>{children}</section>;
}
