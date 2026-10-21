import { useState } from "react";
import { CHAPTERS_40, SLIDES_40 } from "./data";
import { Callout40, MixedBidi, SourceLedgerBlock40, SourceLine40 } from "./kit40";
import type { SourceSection40 } from "./ledger40";
import { DIALOGUE1_LINES_40, DIALOGUE2_LINES_40 } from "./practiceData40";
import "./lesson40.css";

function ChoicePanel40({ title, choices, answer, explanation }: { title: string; choices: string[]; answer: number; explanation: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <section className="tc-activity" aria-label={title}>
    <div className="tc-activity-head"><span className="tc-kicker">ACTIVE CHECK</span><h3>{title}</h3></div>
    <div className="tc-choice-row" role="group" aria-label={title}>
      {choices.map((choice, index) => <button type="button" key={choice} aria-pressed={selected === index} className={selected === index ? "tc-choice selected" : "tc-choice"} onClick={() => setSelected(index)}>{choice}</button>)}
    </div>
    {selected !== null && <p className={selected === answer ? "tc-feedback correct" : "tc-feedback review"} role="status">{selected === answer ? "اتجاه صحيح — " : "أعد فحص زاوية المعنى — "}{explanation}</p>}
  </section>;
}

function DecisionConsole40() {
  const prompts = [
    ["هل أتخذ القرار الآن؟", "WILL", "قرار لحظي؛ The phone is ringing. I'll answer it."],
    ["هل توجد نية أو خطة مسبقة؟", "BE GOING TO", "خطة سابقة؛ I'm going to join a programming course next month."],
    ["ما النشاط الجاري في تلك اللحظة؟", "Future Continuous", "نشاط عند نقطة مستقبلية؛ At 8:00 tomorrow, I'll be studying."],
    ["ما النتيجة المكتملة بحلول النقطة؟", "Future Perfect", "نتيجة مكتملة؛ By 9:00, I'll have finished my homework."],
    ["ما مدة النشاط حتى النقطة؟", "Future Perfect Continuous", "مدة ممتدة؛ By 9:00, I'll have been studying for three hours."],
    ["هل أقدم وعدًا أو توقعًا أو عرضًا؟", "WILL", "الوعد: I promise I'll help you."],
  ];
  const [active, setActive] = useState<number | null>(null);
  return <section className="tc-console" aria-label="Six-question future decision console">
    <div className="tc-console-title"><span>01 / DECISION SEQUENCE</span><strong>السؤال هو الذي يحدد زاوية النظر</strong></div>
    <div className="tc-six-grid">{prompts.map(([q], index) => <button key={q} type="button" aria-expanded={active === index} className={active === index ? "tc-decision active" : "tc-decision"} onClick={() => setActive(active === index ? null : index)}><b>{String(index + 1).padStart(2, "0")}</b><span>{q}</span></button>)}</div>
    {active !== null && <div className={`tc-readout tc-form-${active}`} role="status"><span className="tc-readout-label">TENSE ROUTE · {prompts[active][1]}</span><p>{prompts[active][2]}</p></div>}
  </section>;
}

function TimelineCommand40() {
  const forms = [
    { id: "will", label: "WILL", lens: "قرار / وعد / توقع", color: "coral", mark: "◇" },
    { id: "going", label: "BE GOING TO", lens: "خطة / دليل حاضر", color: "blue", mark: "↗" },
    { id: "continuous", label: "FUTURE CONTINUOUS", lens: "نشاط عند نقطة", color: "mint", mark: "━━" },
    { id: "perfect", label: "FUTURE PERFECT", lens: "نتيجة مكتملة بحلول نقطة", color: "amber", mark: "●" },
    { id: "duration", label: "FUTURE PERFECT CONTINUOUS", lens: "مدة حتى نقطة مرجعية", color: "violet", mark: "◷" },
  ];
  const [selected, setSelected] = useState("continuous");
  return <section className="tc-timeline" aria-label="Future event timeline selector">
    <div className="tc-activity-head"><span className="tc-kicker">TIMELINE / REFERENCE POINT</span><h3>اختر ما تريد أن تراه حول النقطة المستقبلية</h3></div>
    <div className="tc-track" aria-hidden="true"><i className="tc-track-span"/><b className="tc-marker">T</b><span className="tc-now">NOW</span><span className="tc-later">FUTURE REFERENCE</span></div>
    <div className="tc-form-grid">{forms.map((form) => <button key={form.id} type="button" aria-pressed={selected === form.id} className={`tc-form-card ${form.color} ${selected === form.id ? "selected" : ""}`} onClick={() => setSelected(form.id)}><b>{form.mark}</b><span>{form.label}</span><small>{form.lens}</small></button>)}</div>
    <p className="tc-caption" role="status">{forms.find((form) => form.id === selected)?.lens} — النقطة المرجعية واحدة؛ الذي يتغير هو التركيز.</p>
  </section>;
}

function DialogueTranslations40({ slide }: { slide: (typeof SLIDES_40)[number] }) {
  if (slide.sourceId !== "s16" && slide.sourceId !== "s17") return null;
  const dialogue = slide.sourceId === "s16" ? DIALOGUE1_LINES_40 : DIALOGUE2_LINES_40;
  const turns = slide.unitIndexes.flatMap((unitIndex) => {
    const line = slide.source.units[unitIndex];
    const separator = line.indexOf(":");
    if (separator < 0) return [];
    const speaker = line.slice(0, separator);
    const english = line.slice(separator + 1).trim();
    const translation = dialogue.find((turn) => turn.en === english);
    return translation ? [{ speaker, english, arabic: translation.ar }] : [];
  });
  if (!turns.length) return null;
  return <div className="tc-translations"><div className="tc-activity-head"><span className="tc-kicker">BILINGUAL DEBRIEF · PLATFORM TRANSLATION SUPPORT</span><h3>ترجمة عربية مساندة للحوار</h3></div>{turns.map((turn,index)=><div className="tc-translation-row" key={`${slide.id}-translation-${index}`}><span>{turn.speaker}</span><div dir="ltr" lang="en">{turn.english}</div><p dir="rtl">{turn.arabic}</p></div>)}</div>;
}

function SourceReveal40({ section, label, revealIndexes }: { section: SourceSection40; label: string; revealIndexes?: readonly number[] }) {
  const [attempt, setAttempt] = useState("");
  const [revealed, setRevealed] = useState(false);
  if (!section.revealUnits?.length) return null;
  const indexes = revealIndexes ?? section.revealUnits.map((_, index) => index);
  return <div className="tc-reveal" data-answer-key-for={section.id}>
    <label htmlFor={`attempt-${section.id}`}>{label}</label>
    <div className="tc-attempt"><input id={`attempt-${section.id}`} dir="auto" value={attempt} onChange={(event) => setAttempt(event.target.value)} placeholder="اكتب محاولة قصيرة أولًا"/><button type="button" disabled={!attempt.trim()} onClick={() => setRevealed(true)}>تحقق من المحاولة واعرض الشرح</button></div>
    {revealed ? <div className="tc-answer" aria-live="polite">{indexes.map((index) => <SourceLine40 key={index} line={section.revealUnits![index]} index={index} sectionId={section.id} kind="reveal" />)}</div> : <p className="tc-muted">مفتاح الإجابة والتفسير غير معروضين حتى إرسال محاولة.</p>}
  </div>;
}

function ExtraActivity40({ slide, section }: { slide: (typeof SLIDES_40)[number]; section: SourceSection40 }) {
  const n = slide.id.endsWith("-01");
  if (slide.sourceId === "s02" && n) return <DecisionConsole40/>;
  if ((slide.sourceId === "s04" && n) || (slide.sourceId === "s09" && n)) return <TimelineCommand40/>;
  if (slide.sourceId === "s12" && n) return <ChoicePanel40 title="Temporal clause or direct question?" choices={["When you will arrive, I'll call.", "When you arrive, I'll call."]} answer={1} explanation="في الجملة الزمنية المستقبلية نستخدم Present Simple بعد when؛ السؤال المباشر مختلف: When will you arrive?"/>;
  if (slide.sourceId === "s14" && n) return <ChoicePanel40 title="اختبر نقطة البداية أم المدة" choices={["for 2023", "since 2023"]} answer={1} explanation="since يحدد نقطة البداية؛ for يحدد طول المدة. ومع know بمعنى المعرفة لا نستخدم عادة الصيغة المستمرة."/>;
  if (slide.sourceId === "s15" && n) return <ChoicePanel40 title="اختر الصيغة الصحيحة بعد will have" choices={["will have wrote", "will have written"]} answer={1} explanation="Future Perfect = will have + V3؛ written هو التصريف الثالث من write."/>;
  if (slide.sourceId === "s17" && slide.id.endsWith("-03")) return <ChoicePanel40 title="Family Trip · classify the cloud prediction" choices={["BE GOING TO — present evidence", "BE GOING TO — only a prior plan"]} answer={0} explanation="الغيوم الداكنة دليل حاضر يدعم التوقع. لا نخلط هذا الاستخدام بالخطة المسبقة في مغادرة العائلة."/>;
  if (slide.sourceId === "s17" && slide.id.endsWith("-04")) return <SourceReveal40 key={slide.id} section={section} label="أرسل تصنيفك للحوار قبل إظهار مفتاح البنود الستة"/>;
  if (slide.sourceId === "s19" && slide.id.endsWith("-05")) return <SourceReveal40 section={section} label="أجب عن سؤال اختيار واحد على الأقل قبل مراجعة الإجابات المشروحة"/>;
  if (slide.sourceId === "s20" && slide.id.endsWith("-02")) return <SourceReveal40 section={section} label="اكتب إجابة من تدريبات الإكمال قبل عرض الحلول الثمانية"/>;
  if (slide.sourceId === "s21" && (slide.id.endsWith("-01") || slide.id.endsWith("-02"))) return <SourceReveal40 key={slide.id} section={section} revealIndexes={slide.id.endsWith("-01") ? [0,1,2,3,4,5] : [6,7,8,9,10,11]} label="حاول تصحيح بند من هذه المجموعة قبل عرض تصحيحها"/>;
  if (slide.sourceId === "s23" && slide.id.endsWith("-03")) return <ChoicePanel40 title="Reading inference · identify the prediction" choices={["The centre will inspire many students.", "They will have installed all the equipment."]} answer={0} explanation="The teacher says ‘I'm sure…’, which signals a belief or prediction; the other sentence emphasizes a completed result by a future deadline."/>;
  if (slide.sourceId === "s23" && (slide.id.endsWith("-04") || slide.id.endsWith("-05"))) return <SourceReveal40 key={slide.id} section={section} revealIndexes={slide.id.endsWith("-04") ? [0,1,2,3] : [4,5,6,7]} label="اكتب إجابة فهم واحدة قبل عرض إجابات هذه المجموعة"/>;
  if (slide.sourceId === "s25") return <Callout40 tone="navy" title="ورقة اختبار مستقلة" badge="25 سؤالًا"><p>تجد الاختبار ذي الخمسة مستويات في منطقة الاختبار. لا تظهر الإجابات في خطوات الطالب.</p></Callout40>;
  if (slide.sourceId === "s26") return <Callout40 tone="amber" title="مفتاح المعلم خارج منطقة الطالب" badge="بعد التسليم"><p>المفاتيح التفصيلية موجودة في وحدات الحلول/المعلم المحمّلة عند الحاجة؛ هذا التنبيه لا يحتوي على إجابات.</p></Callout40>;
  if (slide.sourceId === "s28" && slide.id.endsWith("-01")) return <TimelineCommand40/>;
  if (slide.sourceId === "s29" && slide.id.endsWith("-06")) return <div className="tc-next"><span>UP NEXT · LESSON 41</span><a href="#/lesson/41"><span dir="ltr" lang="en">Master Auxiliary Verbs</span><span dir="rtl">الإتقان الشامل للأفعال المساعدة · افتح الدرس التالي ←</span></a></div>;
  return null;
}

export function StepView40({ stepIndex, testSubmitted, teacherUnlocked, onOpenTest, onOpenSolutions, onOpenTeacher }: {
  stepIndex: number; testSubmitted: boolean; teacherUnlocked: boolean;
  onOpenTest: () => void; onOpenSolutions: () => void; onOpenTeacher: () => void;
}) {
  const slide = SLIDES_40[stepIndex] ?? SLIDES_40[0];
  const section = slide.source;
  const chapter = CHAPTERS_40.find((item) => item.id === slide.section)!;
  return <div className="tc-step" data-step-id={slide.id} data-source-section={slide.sourceId}>
    <div className="tc-step-head"><div><span className="tc-kicker">{chapter.en} · STEP {slide.step} / {SLIDES_40.length}</span><h1><MixedBidi>{slide.title}</MixedBidi></h1><p>{slide.focus}</p></div><span className="tc-step-dot">{String(slide.step).padStart(2, "0")}</span></div>
    <SourceLedgerBlock40 section={section} unitIndexes={slide.unitIndexes} includeTable={slide.includeTable}>
      <DialogueTranslations40 slide={slide}/>
      <ExtraActivity40 slide={slide} section={section}/>
      {slide.sourceId === "s25" ? <div className="tc-actions"><button type="button" onClick={onOpenTest}>افتح الاختبار النهائي · 25 سؤالًا</button></div> : null}
      {slide.sourceId === "s26" ? <div className="tc-actions"><button type="button" onClick={onOpenTeacher}>مساحة المعلم</button>{(testSubmitted || teacherUnlocked) && <button type="button" onClick={onOpenSolutions}>الحلول التفصيلية</button>}</div> : null}
    </SourceLedgerBlock40>
  </div>;
}
