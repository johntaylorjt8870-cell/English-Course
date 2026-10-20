import { useState } from "react";
import { Rich } from "../../shared/lessonKit";
import type { Slide36 } from "./data";
import { SOURCE_SECTIONS_36, sourceSection36 } from "./ledger36";
import {
  CONTEXT_LABS_36,
  DETECTIVE_ITEMS_36,
  DIALOGUE19_BLANK_UNIT_INDEXES_36,
  DIALOGUE19_ITEMS_36,
  EXERCISE18_ITEMS_36,
  READING_QUESTION_UNIT_INDEXES_36,
  READING_QUESTIONS_36,
  WRITING_CRITERIA_36,
  type ContextQuestion36,
} from "./practiceData36";
import {
  ActionButton36,
  Card36,
  EnglishFormula36,
  FOCUS_36,
  PlatformNote36,
  SourceCard36,
  SourceLine36,
} from "./kit36";

const HIDDEN_CONTEXT_LINES_36: Record<string, number[]> = {
  s02: [3, 5, 6, 7, 8, 12, 13, 14, 18, 19, 20, 21, 22],
  s04: [4, 5, 10, 12, 18, 19, 20, 22, 23],
  s05: [3, 5, 9, 11, 15, 18, 19],
  s07: [0, 1, 5, 9, 10, 11, 12, 13, 14, 15],
  s14: [21, 22, 23, 24, 25, 26],
  s15: [4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18],
  s16: [3, 4, 7, 8, 11, 12, 15, 16],
};

export default function StepView36({ slide, onGoTest, onGoSolutions }: { slide: Slide36; onGoTest: () => void; onGoSolutions: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const section = slide.source;

  if (slide.id === "s22") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} skipIndexes={Array.from({ length: Math.max(0, section.units.length - 2) }, (_, index) => index + 2)} />
        <Card36 eyebrow="Separate Formal Test Area" title="ابدأ الاختبار الرسمي">
          <p>يتكوّن الاختبار من <span className="font-black">25 سؤالًا</span> في خمسة مستويات أصلية. تُعرض الأسئلة مرة واحدة في منطقة الاختبار المنفصلة، ولا يظهر تصحيح أو مفتاح إجابة قبل التسليم.</p>
          <ActionButton36 onClick={onGoTest}>فتح Test Area</ActionButton36>
        </Card36>
      </div>
    );
  }

  if (slide.id === "s21") {
    return <ReadingStep36 section={section} revealed={revealed} onReveal={() => setRevealed(true)} />;
  }

  if (slide.id === "s17") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} skipIndexes={Array.from({ length: 10 }, (_, index) => index + 1)} showReveal={revealed} />
        <GrammarDetective36 onComplete={() => setRevealed(true)} />
      </div>
    );
  }

  if (slide.id === "s18") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} skipIndexes={Array.from({ length: 10 }, (_, index) => index + 1)} showReveal={revealed} />
        <ChooseFormPractice36 onComplete={() => setRevealed(true)} />
      </div>
    );
  }

  if (slide.id === "s19") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} showReveal={revealed} />
        <DialogueCompletion36 revealed={revealed} onReveal={() => setRevealed(true)} />
      </div>
    );
  }

  if (slide.id === "s20") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} hideIndexes={[3, 4, 5, 9, 10, 11]} revealHidden={revealed} />
        <ContextWriting36 revealed={revealed} onReveal={() => setRevealed(true)} />
      </div>
    );
  }

  if (slide.id === "s23") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} />
        <PlatformNote36>يذكر المصدر عنوان الحلول وعبارة كشفها، لكنه لا يتضمن مفتاحًا فعليًا. يكتب المعلم/المنصة الحلول التفصيلية في منطقة Solutions مستقلة ومقفلة حتى تسليم الاختبار أو دخول المعلم.</PlatformNote36>
        <ActionButton36 onClick={onGoSolutions}>فتح Solutions Area</ActionButton36>
      </div>
    );
  }

  if (slide.id === "s24") {
    return (
      <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
        <SourceCard36 section={section} />
        <WritingWorkspace36 />
      </div>
    );
  }

  const contextQuestions = CONTEXT_LABS_36[slide.id];
  const hiddenLines = HIDDEN_CONTEXT_LINES_36[slide.id] ?? [];
  return (
    <div data-step-id={slide.id} data-source-id={slide.sourceId} data-source-section={slide.sourceId} className="space-y-4">
      <SourceCard36 section={section} hideIndexes={hiddenLines} revealHidden={revealed} />
      {contextQuestions ? <ContextPractice36 sectionId={slide.id} questions={contextQuestions} onComplete={() => setRevealed(true)} /> : null}
      {slide.id === "s03" ? <TableReflection36 /> : null}
    </div>
  );
}

function ContextPractice36({ sectionId, questions, onComplete }: { sectionId: string; questions: ContextQuestion36[]; onComplete: () => void }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const check = (question: ContextQuestion36) => {
    const isNew = !checked[question.id];
    setChecked((current) => ({ ...current, [question.id]: true }));
    if (isNew && Object.keys(checked).length + 1 >= questions.length) onComplete();
  };
  return (
    <Card36 eyebrow="تفاعل مبني على أمثلة المصدر" title="مختبر السياق — أجب قبل كشف الأمثلة">
      <PlatformNote36>نشاط تفاعلي من إعداد المنصة يستند إلى أمثلة هذا القسم. اختَر على أساس الموقف والمعنى، لا على أساس الفعل أو كلمة زمنية منفردة.</PlatformNote36>
      <div className="space-y-3">
        {questions.map((question, index) => {
          const attempted = !!checked[question.id];
          const accepted = question.accepted.includes(selected[question.id]);
          return (
            <fieldset key={question.id} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-3 sm:p-4">
              <legend className="sr-only">النشاط {index + 1}</legend>
              <p className="font-bold leading-7 text-[#334155]"><Rich text={question.prompt} /></p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {question.choices.map((choice) => (
                  <label key={choice.value} className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm font-bold leading-6 text-[#334155] ${selected[question.id] === choice.value ? "border-[#0d9488] bg-[#ccfbf1]" : "border-[#e2e8f0] bg-white hover:bg-[#f8fafc]"}`}>
                    <input type="radio" name={`${sectionId}-${question.id}`} value={choice.value} checked={selected[question.id] === choice.value} disabled={attempted} onChange={(event) => { const value = event.currentTarget.value; setSelected((current) => ({ ...current, [question.id]: value })); }} className={`${FOCUS_36} mt-1 h-4 w-4 accent-[#0d9488]`} />
                    <span><Rich text={choice.label} /></span>
                  </label>
                ))}
              </div>
              {!attempted ? <ActionButton36 className="mt-3" disabled={!selected[question.id]} onClick={() => check(question)}>تحقق من اختياري</ActionButton36> : (
                <div role="status" aria-live="polite" className={`mt-3 rounded-xl border p-3 text-sm leading-6 ${accepted ? "border-[#5eead4] bg-[#ccfbf1] text-[#0f766e]" : "border-[#e2e8f0] bg-white text-[#475569]"}`}>
                  <strong>{accepted ? "اختيار مناسب للسياق." : "راجع ما يبرزه السياق؛ هذا الاختيار أقل ملاءمة هنا، ولا يعني أن الصيغة مستحيلة في كل استعمال."}</strong>
                  <p className="mt-1">{question.feedback}</p>
                  {question.nuance ? <p className="mt-1 font-semibold">{question.nuance}</p> : null}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      {Object.keys(checked).length === questions.length ? <p className="text-sm font-bold text-[#0f766e]">اكتملت المحاولة؛ ظهرت أمثلة المصدر التي كانت مؤجلة إلى ما بعد الاختيار.</p> : null}
    </Card36>
  );
}

function TableReflection36() {
  const [choice, setChoice] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <Card36 eyebrow="Check your reasoning · platform-created" title="ما وظيفة الجدول؟">
      <p>كيف ينبغي أن تقرأ الصفوف أعلاه؟</p>
      <fieldset className="space-y-2">
        <legend className="sr-only">دور جدول المقارنة</legend>
        {[
          ["guide", "اختيارات تعليمية نموذجية تساعد على تفسير السياق، وليست حدودًا تمنع التداخل."],
          ["law", "قانون حتمي؛ كل صف يمنع الصيغة الأخرى في أي موقف."],
        ].map(([value, label]) => <label key={value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-sm leading-6 text-[#334155]"><input type="radio" name="l36-table-reflection" value={value} checked={choice === value} onChange={(event) => setChoice(event.currentTarget.value)} className={`${FOCUS_36} mt-1 h-4 w-4 accent-[#0d9488]`} /><span>{label}</span></label>)}
      </fieldset>
      {!checked ? <ActionButton36 disabled={!choice} onClick={() => setChecked(true)}>تحقق من الفهم</ActionButton36> : <p role="status" className="rounded-xl border border-[#5eead4] bg-[#ccfbf1] p-3 text-sm font-bold leading-6 text-[#0f766e]">الصفوف تعرض الاستخدامات النموذجية فقط؛ انظر إلى التنبيه الموجود أسفل الجدول عند وجود تداخل.</p>}
    </Card36>
  );
}

function GrammarDetective36({ onComplete }: { onComplete: () => void }) {
  const [draft, setDraft] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const checkItem = (number: number) => {
    const isNew = !checked[number];
    setChecked((current) => ({ ...current, [number]: true }));
    if (isNew && Object.keys(checked).length + 1 === DETECTIVE_ITEMS_36.length) onComplete();
  };
  return (
    <Card36 eyebrow="§17 · error-repair workshop" title="Grammar Detective — حاول قبل الكشف">
      <p className="text-sm leading-6 text-[#475569]">اكتب تصحيحًا مقبولًا لكل جملة. لا يُحكم على اختيار WILL مقابل GOING TO بأنه خطأ إذا كان البناء صحيحًا والمعنى ممكنًا.</p>
      <div className="space-y-3">
        {DETECTIVE_ITEMS_36.map((item, index) => (
          <section key={item.n} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-3" data-practice-item={`detective-${item.n}`}>
            <SourceLine36 sectionId="s17" index={item.n} text={item.prompt} />
            <label className="mt-2 block"><span className="mb-1 block text-sm font-bold text-[#475569]">تصحيحك</span><input type="text" dir="auto" value={draft[item.n] ?? ""} disabled={!!checked[item.n]} onChange={(event) => { const value = event.currentTarget.value; setDraft((current) => ({ ...current, [item.n]: value })); }} className={`${FOCUS_36} w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2.5 text-base text-[#334155]`} /></label>
            {!checked[item.n] ? <ActionButton36 className="mt-2" disabled={!draft[item.n]?.trim()} onClick={() => checkItem(item.n)}>اعرض التصحيح المقبول</ActionButton36> : (
              <div role="status" className="mt-2 rounded-xl border border-[#5eead4] bg-[#ccfbf1] p-3 text-sm leading-6 text-[#0f766e]">
                <p className="font-black">إجابة / إجابات المصدر:</p>
                {item.answers.map((answer) => <p key={answer} dir="ltr" className="font-en font-bold">{answer}</p>)}
                <p className="mt-1">{item.feedback}</p>
              </div>
            )}
          </section>
        ))}
      </div>
      <p className="text-sm text-[#475569]" aria-live="polite">حاولت {Object.keys(checked).length} من {DETECTIVE_ITEMS_36.length}.</p>
      {Object.keys(checked).length === DETECTIVE_ITEMS_36.length ? <p className="font-bold text-[#0f766e]">اكتملت المحاولة، ويمكن الآن مراجعة المفتاح الأصلي كاملًا أسفل البنود.</p> : null}
    </Card36>
  );
}

function ChooseFormPractice36({ onComplete }: { onComplete: () => void }) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const completeItem = (number: number) => {
    if (!checked[number] && Object.keys(checked).length + 1 === EXERCISE18_ITEMS_36.length) onComplete();
    setChecked((current) => ({ ...current, [number]: true }));
  };
  return (
    <Card36 eyebrow="§18 · source exercise" title="اختر WILL أو BE GOING TO بحسب الموقف">
      <p className="text-sm leading-6 text-[#475569]">حدّد الصيغة لكل سياق، ثم اطلب التفسير. اختيارات المصدر النموذجية لا تحوّل البدائل الممكنة في سياقات أخرى إلى أخطاء نحوية.</p>
      <div className="space-y-3">
        {EXERCISE18_ITEMS_36.map((item) => {
          const question = sourceSection36("s18")!;
          const attempted = !!checked[item.n];
          const expectedForm = item.answer === "will" ? "will" : "going";
          const good = selected[item.n] === expectedForm;
          return (
            <fieldset key={item.n} className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-3" data-practice-item={`choose-${item.n}`}>
              <legend className="sr-only">السؤال {item.n}</legend>
              <div id={`l36-ex18-${item.n}`} className="space-y-1">
                {item.sourceUnitIndexes.map((sourceIndex) => <SourceLine36 key={sourceIndex} sectionId="s18" index={sourceIndex} text={question.units[sourceIndex]} />)}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[{ value: "will", label: "WILL" }, { value: "going", label: "BE GOING TO" }].map((choice) => <label key={choice.value} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-black ${selected[item.n] === choice.value ? "border-[#0d9488] bg-[#ccfbf1] text-[#115e59]" : "border-[#e2e8f0] bg-white text-[#334155]"}`}><input type="radio" name={`l36-ex18-${item.n}`} value={choice.value} checked={selected[item.n] === choice.value} disabled={attempted} onChange={() => setSelected((current) => ({ ...current, [item.n]: choice.value }))} className={`${FOCUS_36} h-4 w-4 accent-[#0d9488]`} /><span dir="ltr" className="font-en">{choice.label}</span></label>)}
              </div>
              {!attempted ? <ActionButton36 className="mt-2" disabled={!selected[item.n]} onClick={() => completeItem(item.n)}>تحقق من الاختيار</ActionButton36> : (
                <div role="status" className={`mt-2 rounded-xl border p-3 text-sm leading-6 ${good ? "border-[#5eead4] bg-[#ccfbf1] text-[#0f766e]" : "border-[#e2e8f0] bg-white text-[#475569]"}`}>
                  <strong>{good ? "الاختيار النموذجي مناسب." : "راجع السياق؛ الاختيار الآخر هو الأنسب في هذا المثال."}</strong>
                  <p>مفتاح المصدر: <span dir="ltr" className="font-en font-black">{item.answer}</span> — {item.explanation}</p>
                </div>
              )}
            </fieldset>
          );
        })}
      </div>
      {Object.keys(checked).length === EXERCISE18_ITEMS_36.length ? <p className="font-bold text-[#0f766e]">ظهرت جميع الإجابات الأصلية؛ افتح مفتاح المصدر الكامل أعلاه/أسفل التمرين للمراجعة.</p> : null}
    </Card36>
  );
}

function DialogueCompletion36({ revealed, onReveal }: { revealed: boolean; onReveal: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const allAnswered = DIALOGUE19_ITEMS_36.every((item) => answers[item.n]?.trim());
  return (
    <Card36 eyebrow="§19 · dialogue practice" title="املأ الفراغات، ثم اعرض الحلول">
      <p className="text-sm leading-6 text-[#475569]">الحوار الكامل ظاهر في المصدر أعلاه؛ أدخل الصيغ الأربع من دون تغيير الحوار، ثم اكشف المفتاح بعد المحاولة.</p>
      <div className="space-y-2">
        {DIALOGUE19_ITEMS_36.map((item, index) => (
          <label key={item.n} aria-labelledby={`source-s19-unit-${DIALOGUE19_BLANK_UNIT_INDEXES_36[index]}`} className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
            <span className="min-w-20 font-black text-[#115e59]">الفراغ {item.n}</span>
            <input type="text" dir="ltr" lang="en" value={answers[item.n] ?? ""} onChange={(event) => { const value = event.currentTarget.value; setAnswers((current) => ({ ...current, [item.n]: value })); }} className={`${FOCUS_36} min-w-[12rem] flex-1 rounded-lg border border-[#cbd5e1] bg-white px-3 py-2 text-base text-[#334155]`} />
          </label>
        ))}
      </div>
      {!revealed ? <ActionButton36 disabled={!allAnswered} onClick={onReveal}>عرض مفتاح الإجابة والتفسيرات</ActionButton36> : <p role="status" className="rounded-xl border border-[#5eead4] bg-[#ccfbf1] p-3 text-sm font-bold leading-6 text-[#0f766e]">ظهر مفتاح المصدر كاملًا في بطاقة الحوار أعلاه.</p>}
      {!allAnswered ? <p className="text-sm font-bold text-[#64748b]">أكمل الفراغات الأربعة قبل عرض المفتاح.</p> : null}
    </Card36>
  );
}

function ContextWriting36({ revealed, onReveal }: { revealed: boolean; onReveal: () => void }) {
  const [spontaneous, setSpontaneous] = useState("");
  const [plan, setPlan] = useState("");
  const canReveal = spontaneous.trim().length > 0 && plan.trim().length > 0;
  return (
    <Card36 eyebrow="§20 · open-ended context construction" title="اكتب موقفين، لا تحفظ صيغة واحدة">
      <PlatformNote36>هذه مهمة إنتاج مفتوحة؛ لا تُحكم آليًا بصواب/خطأ. اكتب سياقين يجعل كل صيغة طبيعية، ثم قارن بالمثالين الأصليين.</PlatformNote36>
      <label className="block"><span className="mb-1 block font-bold text-[#334155]">سياق يجعل <EnglishFormula36>I'll prepare dinner.</EnglishFormula36> طبيعيًا</span><textarea dir="auto" rows={3} value={spontaneous} onChange={(event) => setSpontaneous(event.currentTarget.value)} className={`${FOCUS_36} w-full rounded-xl border border-[#cbd5e1] bg-white p-3 text-base leading-7 text-[#334155]`} /></label>
      <label className="block"><span className="mb-1 block font-bold text-[#334155]">سياق مختلف يجعل <EnglishFormula36>I'm going to prepare dinner.</EnglishFormula36> طبيعيًا</span><textarea dir="auto" rows={3} value={plan} onChange={(event) => setPlan(event.currentTarget.value)} className={`${FOCUS_36} w-full rounded-xl border border-[#cbd5e1] bg-white p-3 text-base leading-7 text-[#334155]`} /></label>
      {!revealed ? <ActionButton36 disabled={!canReveal} onClick={onReveal}>عرض النموذج الأصلي بعد المحاولة</ActionButton36> : <p className="text-sm font-bold text-[#0f766e]">قارن إجابتك بالنموذج: هل يوضح السياق الأول قرارًا لحظيًا، والثاني خطة موجودة مسبقًا؟ قد تختلف التفاصيل مع بقاء المعنى مناسبًا.</p>}
    </Card36>
  );
}

function ReadingStep36({ section, revealed, onReveal }: { section: (typeof SOURCE_SECTIONS_36)[number]; revealed: boolean; onReveal: () => void }) {
  const [highlight, setHighlight] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const allAnswered = READING_QUESTIONS_36.every((_, index) => answers[index]?.trim());
  return (
    <div data-step-id="s21" data-source-id="s21" data-source-section="s21" className="space-y-4">
      <Card36 eyebrow="Reading tools · optional" title="اقرأ أولًا، ثم حلل">
        <label className="inline-flex cursor-pointer items-center gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-sm font-bold text-[#334155]">
          <input type="checkbox" checked={highlight} onChange={(event) => setHighlight(event.currentTarget.checked)} className={`${FOCUS_36} h-4 w-4 accent-[#0d9488]`} />
          <span>تمييز صيغ المستقبل في النص (اختياري)</span>
        </label>
        <p className="text-sm leading-6 text-[#475569]">التمييز بصري فقط؛ النص كاملًا يبقى ظاهرًا وقابلًا للقراءة.</p>
      </Card36>
      <SourceCard36 section={section} showReveal={revealed} highlightFuture={highlight} />
      <Card36 eyebrow="Comprehension · answer before reveal" title="اكتب إجابات الفهم السبعة">
        <p className="text-sm leading-6 text-[#475569]">الأسئلة معروضة في النص أعلاه. استخدم ارتباط التسمية للوصول إلى السؤال، ثم أدخل إجابتك؛ لا يوجد تصحيح آلي لإجابات متنوعة الصياغة.</p>
        <div className="space-y-3">
          {READING_QUESTIONS_36.map((question, index) => (
            <label key={question} aria-labelledby={`source-s21-unit-${READING_QUESTION_UNIT_INDEXES_36[index]}`} className="block rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
              <span className="mb-1 block text-sm font-bold text-[#334155]">إجابة السؤال {index + 1}</span>
              <textarea rows={2} dir="auto" value={answers[index] ?? ""} onChange={(event) => { const value = event.currentTarget.value; setAnswers((current) => ({ ...current, [index]: value })); }} className={`${FOCUS_36} w-full resize-y rounded-lg border border-[#cbd5e1] bg-white p-2.5 text-base leading-7 text-[#334155]`} />
            </label>
          ))}
        </div>
        {!revealed ? <ActionButton36 disabled={!allAnswered} onClick={onReveal}>عرض إجابات الفهم والتحليل النحوي</ActionButton36> : <p role="status" className="rounded-xl border border-[#5eead4] bg-[#ccfbf1] p-3 text-sm font-bold leading-6 text-[#0f766e]">الإجابات السبعة والتحليلات النحوية الثمانية ظاهرة في مفتاح المصدر أعلى النص.</p>}
        {!allAnswered ? <p className="text-sm font-bold text-[#64748b]">أكمل إجاباتك السبعة قبل فتح المفتاح.</p> : null}
      </Card36>
    </div>
  );
}

function WritingWorkspace36() {
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const sentenceCount = draft.trim() ? draft.split(/[.!?]+/).filter((part) => part.trim().length > 0).length : 0;
  return (
    <Card36 eyebrow="Writing workspace · self-review only" title="مساحة كتابة My Future Decisions and Plans">
      <PlatformNote36>اكتب 12–15 جملة باللغة الإنجليزية. العداد وقائمة المراجعة مساعدتان فقط؛ لا يصدر النظام حكمًا آليًا على صحة فقرتك أو على إجابة مفتوحة.</PlatformNote36>
      <label className="block"><span className="mb-1 block font-bold text-[#334155]">مسودتك باللغة الإنجليزية</span><textarea lang="en" dir="ltr" rows={12} value={draft} onChange={(event) => setDraft(event.currentTarget.value)} className={`${FOCUS_36} w-full resize-y rounded-2xl border border-[#cbd5e1] bg-white p-4 text-left text-base leading-7 text-[#1e293b]`} placeholder="Write your paragraph here…" /></label>
      <p aria-live="polite" className="rounded-xl bg-[#f1f5f9] px-3 py-2 text-sm font-bold text-[#475569]">عدد الجمل التقريبي: <span dir="ltr" className="font-en tabular-nums">{sentenceCount}</span> / المطلوب 12–15</p>
      <fieldset className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-3">
        <legend className="px-1 text-sm font-black text-[#115e59]">قائمة مراجعة ذاتية — الشروط الثمانية الأصلية</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {WRITING_CRITERIA_36.map((criterion, index) => <label key={criterion} className="flex items-start gap-2 rounded-xl border border-[#e0e3dc] bg-white p-3 text-sm leading-6 text-[#334155]"><input type="checkbox" checked={!!checked[index]} onChange={(event) => { const checked = event.currentTarget.checked; setChecked((current) => ({ ...current, [index]: checked })); }} className={`${FOCUS_36} mt-1 h-4 w-4 shrink-0 accent-[#0d9488]`} /><span><Rich text={criterion} /></span></label>)}
        </div>
        <p className="mt-2 text-xs font-bold text-[#64748b]" aria-live="polite">علّمت {Object.values(checked).filter(Boolean).length} من 8 — راجع كل بند بنفسك.</p>
      </fieldset>
    </Card36>
  );
}
