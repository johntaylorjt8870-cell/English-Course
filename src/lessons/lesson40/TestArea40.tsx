import { useState } from "react";
import { Chip40, EnBidi, MixedBidi, SourceLine40 } from "./kit40";
import { TEST_HEADER_LINES_40, TEST_LEVELS_40, TEST_QUESTION_COUNT_40 } from "./testData40";

/** Dedicated one-question-at-a-time assessment. No answer key is imported here. */
export function TestArea40({ answers, onChangeAnswer, submitted, onSubmit, onReset, onOpenSolutions, onBackToStudent }: {
  answers: Record<string, string>;
  onChangeAnswer: (questionId: string, value: string) => void;
  submitted: boolean;
  onSubmit: () => void;
  onReset: () => void;
  onOpenSolutions: () => void;
  onBackToStudent: () => void;
}) {
  const questions = TEST_LEVELS_40.flatMap((level) => level.questions.map((question) => ({ level, question })));
  const [activeIndex, setActiveIndex] = useState(0);
  const current = questions[activeIndex];
  const { level, question: q } = current;
  const value = answers[q.id] ?? "";
  const answeredCount = Object.values(answers).filter((answer) => answer.trim().length > 0).length;
  const percent = Math.round((answeredCount / TEST_QUESTION_COUNT_40) * 100);

  return <section id="lesson40-test" dir="rtl" data-source-section="s25" aria-label="الاختبار النهائي الشامل — الدرس 40" className="space-y-5">
    <div className="rounded-3xl border border-[#b9c8c0] bg-[#fffdf8] p-5 sm:p-7 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4dfd2] pb-3">
        <Chip40 label="تقييم مستقل — 25 سؤالًا (5 مستويات × 5)" tone="teal"/>
        <Chip40 label={`المجاب عنه: ${answeredCount} / ${TEST_QUESTION_COUNT_40}`} tone={answeredCount===TEST_QUESTION_COUNT_40?"emerald":"amber"}/>
      </div>
      <h2 className="text-xl sm:text-2xl font-extrabold text-[#17354a]"><MixedBidi>🏆 25. الاختبار النهائي الشامل — Future Tenses Grand Exam</MixedBidi></h2>
      <div className="space-y-2">{TEST_HEADER_LINES_40.map((line)=><SourceLine40 key={line.lineIndex} line={line.text} index={line.lineIndex} sectionId="s25"/>)}</div>
      <div className="rounded-2xl border border-[#9dbbb5] bg-[#eef4f0] p-3.5 text-sm font-bold text-[#17354a] leading-[1.8]"><MixedBidi>لا يظهر تصحيح فوري. انتقل سؤالًا سؤالًا، ثم سلّم الاختبار لمراجعة الإجابات في منطقة الحلول. في البنود المفتوحة، فسّر اختيارك واقبل الصيغ الصحيحة التي يسمح بها السياق.</MixedBidi></div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-3">
        <div><div className="flex justify-between text-xs font-extrabold text-[#17354a]"><span>{`السؤال ${activeIndex+1} من ${TEST_QUESTION_COUNT_40}`}</span><span>{`أُجيب عن ${answeredCount} (${percent}%)`}</span></div><progress className="w-full h-3 accent-[#075fe4]" value={answeredCount} max={TEST_QUESTION_COUNT_40} aria-label="تقدم إجابات الاختبار"/></div>
        <label className="flex items-center gap-2 text-xs font-extrabold text-[#17354a]">انتقال مباشر <select aria-label="انتقال مباشر إلى سؤال" value={activeIndex} onChange={(event)=>setActiveIndex(Number(event.target.value))} className="max-w-56 rounded-lg border border-[#b9c8c4] bg-white px-2 py-1.5">{questions.map(({question},index)=><option key={question.id} value={index}>{`سؤال ${index+1} · ${question.marker}`}</option>)}</select></label>
      </div>
    </div>

    <div data-test-level={level.level} className="rounded-3xl border border-[#c9d8e8] bg-white p-5 sm:p-7 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dce7f2] pb-3"><Chip40 label={`المستوى ${level.level} · 5 أسئلة`} tone="teal"/><span className="text-xs font-bold text-[#49647c]">{level.titleLine.text}</span></div>
      {level.introLines?.length ? <div className="rounded-xl border border-[#c9d8e8] bg-[#f6faff] p-3 space-y-2">{level.introLines.map(line=><SourceLine40 key={line.lineIndex} line={line.text} index={line.lineIndex} sectionId="s25"/>)}</div>:null}
      {level.level===4?<div className="rounded-xl border border-[#e0bf77] bg-[#fff7e6] p-3 text-sm font-bold text-[#704700]">اكتب الفرق أو السبب النحوي بأسلوبك؛ الإجابات المفاهيمية تُراجع وفق المعنى لا بمطابقة كلمات مفتاحية بسيطة.</div>:null}
      {level.level===5?<div className="rounded-xl border border-[#9dbbb5] bg-[#eef4f0] p-3 text-sm font-bold text-[#17354a]">الأسئلة ㉑–㉕ هي الفراغات الخمسة المتتابعة في قصة The Big School Project.</div>:null}
      <article data-test-question={q.number} className="rounded-2xl border border-[#ded9cb] bg-[#fdfcf8] p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-sm font-extrabold text-[#075fe4]">{`السؤال ${q.number} من ${TEST_QUESTION_COUNT_40} · ${q.marker}`}</span><Chip40 label={value.trim()?"تم تسجيل الإجابة":"بانتظار الإجابة"} tone={value.trim()?"emerald":"neutral"}/></div>
        <div className="space-y-2">{q.promptLines.map(line=><SourceLine40 key={line.lineIndex} line={line.text} index={line.lineIndex} sectionId="s25"/>)}</div>
        {q.kind==="mcq"&&q.options?<div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">{q.options.map((option)=><button key={option.value} type="button" aria-pressed={value===option.value} onClick={()=>onChangeAnswer(q.id,option.value)} dir="ltr" lang="en" style={{direction:"ltr",unicodeBidi:"isolate",textAlign:"left"}} className={`rounded-xl border px-3.5 py-3 font-mono text-sm font-bold ${value===option.value?"border-[#075fe4] bg-[#eaf2ff] text-[#123d69]":"border-[#c7c2b4] bg-white text-[#17354a]"}`}><span className="block"><EnBidi>{`Option ${option.value}`}</EnBidi></span><span className="block mt-1"><EnBidi>{option.text}</EnBidi></span></button>)}</div>:<label className="block space-y-1"><span className="sr-only">{`إجابة السؤال ${q.number}`}</span><input type="text" dir={q.kind==="meaning"?"auto":"ltr"} lang={q.kind==="meaning"?undefined:"en"} value={value} onChange={(event)=>onChangeAnswer(q.id,event.target.value)} placeholder={q.placeholder??"اكتب إجابتك هنا..."} className="w-full rounded-xl border border-[#b9c8c0] bg-white px-4 py-3 font-mono text-sm sm:text-base font-bold text-[#17354a]"/></label>}
      </article>
      <div className="flex flex-wrap justify-between gap-2"><button type="button" disabled={activeIndex===0} onClick={()=>setActiveIndex((n)=>Math.max(0,n-1))} className="rounded-xl border border-[#075fe4] bg-white px-4 py-2 font-extrabold text-[#075fe4] disabled:border-[#a8b6c4] disabled:bg-[#e9eef4] disabled:text-[#596b7d] disabled:cursor-not-allowed">→ السؤال السابق</button><button type="button" disabled={activeIndex===TEST_QUESTION_COUNT_40-1} onClick={()=>setActiveIndex((n)=>Math.min(TEST_QUESTION_COUNT_40-1,n+1))} className="rounded-xl bg-[#075fe4] px-5 py-2 font-extrabold text-white disabled:bg-[#596f87] disabled:text-white disabled:cursor-not-allowed">السؤال التالي ←</button></div>
    </div>
    <div className="rounded-3xl border border-[#b9c8c0] bg-[#fffdf8] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2"><button type="button" onClick={onSubmit} className="rounded-xl bg-[#102b45] px-5 py-3 text-sm font-extrabold text-white">{submitted?"تحديث التسليم والانتقال إلى الحلول":"تسليم الاختبار النهائي وفتح الحلول"}</button>{submitted?<button type="button" onClick={onOpenSolutions} className="rounded-xl border border-[#087b63] bg-[#e9f7f1] px-4 py-3 text-sm font-extrabold text-[#07583f]">فتح منطقة الحلول الآن</button>:null}</div><div className="flex flex-wrap gap-2"><button type="button" onClick={onReset} className="rounded-xl border border-[#c7c2b4] bg-white px-4 py-2.5 text-sm font-extrabold">مسح الإجابات وإعادة المحاولة</button><button type="button" onClick={onBackToStudent} className="rounded-xl border border-[#075fe4] bg-white px-4 py-2.5 text-sm font-extrabold text-[#075fe4]">العودة إلى خطوات الدرس</button></div></div>
    </div>
  </section>;
}
