import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lesson1Shell, { type Lesson1ShellGroup } from "../../shared/Lesson1Shell";
import FinalTest from "../../shared/finalTest";
import { DIALOGUE_61, ERRORS_61, PROCEDURES_61, READING_61, SOLVED_61, SPEAKING_61, SUMMARY_61, THEORY_61, WRITING_61, ORIGINAL_SECTIONS_61, ORIGINAL_TEST_61, PRACTICES_61, PRACTICE_COUNT_61, TEST_61, type Block61 } from "./data";
import { Attempt61, En61, MemoryProvider61, Mixed61, PairView61, Scene61, useMemory61, useMemorySnapshot61, type AttemptMemory61 } from "./kit61";
import { LABS_61, LabConsole61 } from "./labs61";
import TeacherArea61 from "./TeacherArea61";
import "./lesson61.css";

type Slide61 = { id: string; station: string; title: string; emblem: string };
const STATIONS_61 = [
  { id: "start", title: "ابدأ من هنا" }, { id: "yes", title: "أسئلة نعم أو لا" }, { id: "wh", title: "أسئلة WH" },
  { id: "commands", title: "الأوامر والتعليمات" }, { id: "intent", title: "الطلبات والاقتراحات" },
  { id: "apply", title: "التحويل في السياق" }, { id: "practice", title: "التدريبات الثمانية" },
  { id: "tests", title: "اختبر نفسك" }, { id: "finish", title: "الإنتاج والمراجعة" },
];
const slide = (id: string, station: string, title: string, emblem = "•"): Slide61 => ({ id, station, title, emblem });
const theory = (id: string, station: string): Slide61 => {
  const scene = THEORY_61.find((entry) => entry.id === id);
  if (!scene) throw new Error(`Missing lesson 61 scene: ${id}`);
  return slide(id, station, scene.title, "›");
};
const lab = (id: string, station: string): Slide61 => {
  const entry = LABS_61.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing lesson 61 lab: ${id}`);
  return slide(id, station, entry.title, "◇");
};
export const LESSON_61_SCENES: Slide61[] = [
  slide("cover", "start", "مركز قيادة نقل الأسئلة والتعليمات", "◎"), slide("map", "start", "خريطة التعلّم", "↗"), theory("bridge", "start"),
  ...["yes-intro", "yes-rule", "yes-be", "yes-do", "yes-perfect", "yes-modals", "if-whether"].map((id) => theory(id, "yes")), lab("yes-converter", "yes"),
  ...["wh-intro", "wh-order", "wh-where", "wh-what", "wh-how", "wh-subject"].map((id) => theory(id, "wh")), lab("wh-rebuilder", "wh"), lab("order-detector", "wh"),
  ...["command", "ordered-instructed", "negative-command", "warning-advice"].map((id) => theory(id, "commands")), lab("command-studio", "commands"), lab("negative-lab", "commands"),
  theory("request", "intent"), theory("negative-request", "intent"), lab("intent-detector", "intent"), theory("suggestions", "intent"), lab("advice-suggestion", "intent"), theory("say-tell-ask", "intent"), lab("verb-control", "intent"),
  slide("errors", "apply", "القواعد السبع المهمة", "!"), lab("error-detective", "apply"), slide("procedures", "apply", "أربع طرق للتحويل", "↗"), slide("solved", "apply", "8 أمثلة محلولة", "✓"),
  slide("dialogue", "apply", "حوار في المدرسة", "↔"), slide("dialogue-reported", "apply", "الحوار بالكلام المنقول", "↗"), lab("conversation", "apply"), slide("reading", "apply", "قراءة: A School Visit", "▤"), slide("comprehension", "apply", "فهم القراءة · 7 أسئلة", "?"),
  ...PRACTICES_61.map((group, i) => slide(group.id, "practice", `التدريب ${i + 1} · ${group.title}`, String(i + 1))),
  ...ORIGINAL_SECTIONS_61.map((title, i) => slide(`original-${i + 1}`, "tests", `الاختبار الأصلي · ${title}`, String(i + 1))),
  slide("original-key", "tests", "مفتاح الاختبار الأصلي", "✓"), slide("final-test", "tests", "الاختبار النهائي المشترك · 15 سؤالًا", "▣"),
  slide("writing", "finish", "مهمة الكتابة", "✎"), slide("speaking", "finish", "مهمة التحدث", "◌"), slide("summary", "finish", "الملخص النهائي", "≡"), slide("teacher", "finish", "مساحة المعلم", "T"), slide("progress", "finish", "المسار التالي", "→"),
];
export const LESSON_61_SOURCE_SECTION_COUNT = 16;
export const LESSON_61_PRACTICE_COUNT = PRACTICE_COUNT_61;
export const LESSON_61_ORIGINAL_TEST_COUNT = ORIGINAL_TEST_61.length;
export const LESSON_61_FINAL_TEST_COUNT = TEST_61.length;
export const LESSON_61_LAB_COUNT = LABS_61.length;

// Keep the Arabic colon with its label rather than with the following LTR title.
function SceneTitle61({ scene }: { scene: Slide61 }) {
  if (scene.id === "reading") return <span className="l61-reading-label" dir="rtl"><span className="l61-reading-title-ar" dir="rtl">قراءة:</span>{" "}<En61 className="l61-reading-title-en">A School Visit</En61></span>;
  return <Mixed61 text={scene.title} />;
}

function Cover61({ go }: { go: (id: string) => void }) {
  return <div className="l61-cover" data-l61-cover>
    <div className="l61-cover-copy"><div className="l61-overline" dir="ltr"><span>ENGLISH COURSE</span><span>LESSON 61 / COMMUNICATION</span></div>
      <div className="l61-cover-tag">مركز قيادة نقل الأسئلة والتعليمات</div>
      <h1 dir="ltr" lang="en">Reported<br /><em>Questions</em><br />&amp; Commands<span>.</span></h1>
      <h2>الكلام المنقول: الأسئلة والأوامر والطلبات والتعليمات</h2>
      <p>المعنى هو نقطة الانطلاق. حدّد نية المتحدث، ثم اختر مسارًا يحافظ على السؤال أو الطلب أو الأمر كما قُصد.</p>
      <div className="l61-actions"><button type="button" className="l61-button l61-button--bright" onClick={() => go("map")}>ابدأ الرحلة <span aria-hidden>←</span></button><button type="button" className="l61-button l61-button--outline" onClick={() => go("final-test")}>انتقل إلى الاختبار</button></div>
      <div className="l61-cover-stats"><span><b>16</b> قسمًا</span><span><b>10</b> مختبرات</span><span><b>8</b> تدريبات</span><span><b><bdi dir="ltr">25 + 15</bdi></b> سؤالًا</span></div>
    </div>
    <div className="l61-cover-console" aria-label="رسم يوضح مسار السؤال المباشر إلى الكلام المنقول">
      <div className="l61-console-top" dir="ltr"><span>COMMUNICATION CONTROL</span><span>● SYSTEM READY</span></div>
      <div className="l61-console-window"><div className="l61-console-head" dir="ltr">SIGNAL / 01 <span>DIRECT QUESTION</span></div><div className="l61-console-text" dir="ltr">Where <s>do</s> you live<span>?</span></div><div className="l61-console-divider"><span>↓</span><b>إعادة ترتيب الإشارة</b></div><div className="l61-console-head" dir="ltr">SIGNAL / 02 <span>REPORTED QUESTION</span></div><div className="l61-console-text" dir="ltr">where <mark>I lived</mark><span>.</span></div></div>
      <div className="l61-console-footer" dir="ltr"><span>KEEP WH</span><span>SUBJECT</span><span>VERB</span><span>CONTEXT</span></div>
    </div>
  </div>;
}

function Map61({ go }: { go: (id: string) => void }) {
  const routes = [
    { n: "01", en: "ASK / YES-NO", ar: "ابحث عن if أو whether", id: "yes-intro" },
    { n: "02", en: "ASK / WH", ar: "احتفظ بالأداة وأعد الترتيب", id: "wh-intro" },
    { n: "03", en: "DIRECT / ACT", ar: "ميّز الأمر والتعليمات والنهي", id: "command" },
    { n: "04", en: "INTENT / CHOICE", ar: "حدّد الطلب والنصيحة والاقتراح", id: "request" },
    { n: "05", en: "PRACTISE / APPLY", ar: "اقرأ وحوّل ودرّب نفسك", id: "dialogue" },
    { n: "06", en: "CHECK / REFLECT", ar: "اختبر فهمك واكتب وتحدث", id: "practice-1" },
  ];
  return <Scene61 kicker="MISSION MAP / 61" title="خريطة التعلّم" lead="كل قرار يقود إلى مسار مختلف. اختر محطة، أو اتبع الترتيب خطوة بخطوة."><div className="l61-map-intro"><div><span dir="ltr">START WITH MEANING</span><p>من السؤال المباشر إلى الرسالة المنقولة: لا تغيّر الكلمات قبل أن تعرف من يقولها ولمن.</p></div><div className="l61-map-arrow" aria-hidden>↗</div></div><div className="l61-route-list">{routes.map((route) => <button type="button" key={route.n} onClick={() => go(route.id)}><span className="l61-route-n" dir="ltr">{route.n}</span><span className="l61-route-title"><b dir="ltr">{route.en}</b><span>{route.ar}</span></span><span className="l61-route-arrow" aria-hidden>↗</span></button>)}</div></Scene61>;
}
function BlockView61({ block }: { block: Block61 }) {
  if (block.type === "text") return <p className="l61-prose"><Mixed61 text={block.text} /></p>;
  if (block.type === "note") return <aside className="l61-note"><span className="l61-note-icon" aria-hidden>!</span><div><Mixed61 text={block.text} /></div></aside>;
  if (block.type === "formula") return <div className="l61-formula"><span dir="ltr">ROUTE / FORMULA</span><strong dir="ltr"><En61>{block.en}</En61></strong>{block.ar && <p><Mixed61 text={block.ar} /></p>}</div>;
  if (block.type === "pairs") return <div className="l61-pairs">{block.items.map((pair, index) => <PairView61 key={`${pair.direct}-${index}`} pair={pair} index={index + 1} />)}</div>;
  if (block.type === "lines") return <div className="l61-line-list">{block.items.map((item, index) => <div className="l61-line" key={`${item.en}-${index}`}><div dir="ltr"><En61>{item.en}</En61></div><p><Mixed61 text={item.ar} /></p></div>)}</div>;
  if (block.type === "list") return <ol className="l61-step-list">{block.items.map((item, i) => <li key={i}><span dir="ltr">{String(i + 1).padStart(2, "0")}</span><div><Mixed61 text={item} /></div></li>)}</ol>;
  return <div className="l61-comparison">{block.items.map((item, i) => <div key={i}><span dir="ltr">{item.label}</span><strong dir="ltr"><En61>{item.en}</En61></strong>{item.ar && <p>{item.ar}</p>}</div>)}</div>;
}
function Theory61({ id }: { id: string }) {
  const entry = THEORY_61.find((item) => item.id === id);
  if (!entry) return null;
  return <Scene61 kicker={entry.kicker} title={entry.title} lead={entry.lead}><div className="l61-theory" data-l61-section={entry.section}>{entry.blocks.map((block, i) => <BlockView61 key={i} block={block} />)}</div></Scene61>;
}
function Errors61() {
  return <Scene61 kicker="SEVEN CHECKS" title="7 قواعد مهمة عند التحويل" lead="هذه نقاط مراجعة مرئية قبل أن تختبر نفسك في مختبر المحقق."><div className="l61-error-list">{ERRORS_61.map((item, i) => <article key={item.title}><div className="l61-error-index" dir="ltr">{String(i + 1).padStart(2, "0")}</div><div><h3>{item.title}</h3><div className="l61-error-example"><span>{i === 6 ? "مباشر" : "غير صحيح"}</span><En61>{item.wrong}</En61></div><div className="l61-correct-example"><span>منقول صحيح</span><En61>{item.right}</En61></div>{item.alternative && <div className="l61-correct-example"><span>بديل</span><En61>{item.alternative}</En61></div>}<p><Mixed61 text={item.why} /></p></div></article>)}</div></Scene61>;
}
function Procedures61() {
  return <Scene61 kicker="FOUR ROUTES" title="خطوات تحويل السؤال أو الأمر" lead="حدّد نوع الرسالة أولًا، ثم اتبع مسارها المناسب."><div className="l61-procedure-list">{PROCEDURES_61.map((item, i) => <article key={item.title}><div className="l61-procedure-side"><span dir="ltr">ROUTE {String(i + 1).padStart(2, "0")}</span><h3><Mixed61 text={item.title} /></h3></div><div><div className="l61-procedure-direct" dir="ltr"><En61>{item.direct}</En61></div><ol>{item.steps.map((step, j) => <li key={j}><span dir="ltr">{j + 1}</span><Mixed61 text={step} /></li>)}</ol><div className="l61-procedure-result" dir="ltr"><En61>{item.result}</En61></div><p>{item.ar}</p></div></article>)}</div></Scene61>;
}
function Solved61() { return <Scene61 kicker="WORKED EXAMPLES / 08" title="8 أمثلة شاملة محلولة" lead="قارن القصد والضمير والزمن في كل مسار."><div className="l61-pairs">{SOLVED_61.map((pair, i) => <PairView61 key={i} pair={pair} index={i + 1} />)}</div></Scene61>; }
function Dialogue61({ reported }: { reported: boolean }) {
  const lines = reported ? DIALOGUE_61.reported : DIALOGUE_61.direct;
  return <Scene61 kicker={reported ? "SCHOOL / RETOLD" : "SCHOOL / LIVE DIALOGUE"} title={reported ? "الحوار بالكلام المنقول" : "حوار تطبيقي في المدرسة"} lead={reported ? "لاحظ كيف يتغير ترتيب الجملة ويتحدد المخاطَب من السياق." : "اقرأ الحوار مع ترجمته، ثم انتقل إلى إعادة النقل."}>
    <div className="l61-dialogue">{lines.map((line, i) => <article key={i} className={i % 2 ? "is-reply" : ""}><span className="l61-dialogue-number" dir="ltr">{String(i + 1).padStart(2, "0")}</span><div><div dir="ltr"><En61>{line.en}</En61></div><p>{line.ar}</p></div></article>)}</div>
    {reported && <><h3 className="l61-subhead">ملاحظات على الحوار</h3><ol className="l61-step-list">{DIALOGUE_61.notes.map((note, i) => <li key={i}><span dir="ltr">{String(i + 1).padStart(2, "0")}</span><div><En61>{note}</En61></div></li>)}</ol><aside className="l61-note"><span className="l61-note-icon">!</span><div><Mixed61 text={DIALOGUE_61.context} /></div></aside></>}
  </Scene61>;
}
function Reading61() {
  return <Scene61 kicker="FIELD REPORT / READING" title="قطعة قراءة تطبيقية" lead="اقرأ الزيارة المدرسية ثم جرّب أسئلة الفهم في المحطة التالية."><div className="l61-reading"><header><span dir="ltr">FIELD NOTES</span><h3 dir="ltr">{READING_61.title}</h3><p>{READING_61.titleAr}</p></header>{READING_61.paragraphs.map((p, i) => <article key={i}><div dir="ltr" lang="en">{p.en}</div><p>{p.ar}</p></article>)}</div></Scene61>;
}
function Comprehension61() {
  return <Scene61 kicker="READING / CHECK" title="أسئلة فهم الزيارة" lead="أجب بالإنجليزية، ثم تحقّق لعرض الإجابة وترجمتها."><div className="l61-attempts">{READING_61.questions.map((q, i) => <Attempt61 key={q.q} index={i + 1} memoryKey={`reading:${i}`} item={{ prompt: q.q, hint: q.qar, answer: q.a, ar: q.aar, why: "راجع تفاصيل الزيارة في قطعة القراءة؛ قد تكون هناك صياغات صحيحة أخرى للمعنى نفسه." }} />)}</div></Scene61>;
}
function Practice61({ id }: { id: string }) {
  const group = PRACTICES_61.find((entry) => entry.id === id)!;
  const values = useMemorySnapshot61();
  const [showModel, setShowModel] = useMemory61(`show-model:${id}`, false);
  const completed = group.items.filter((_, i) => (values[`practice:${id}:${i}`] as AttemptMemory61 | undefined)?.checked).length;
  return <Scene61 kicker={`PRACTICE / ${id.slice(-1)}`} title={group.title} lead={group.instruction}>
    <div className="l61-progress-strip"><span>التقدم في المجموعة</span><bdi dir="ltr">{completed} / {group.items.length}</bdi></div>
    {group.paragraph && <div className="l61-paragraph-prompt" dir="ltr"><En61>{group.paragraph}</En61></div>}
    <div className="l61-attempts">{group.items.map((item, i) => <Attempt61 key={i} item={item} index={i + 1} memoryKey={`practice:${id}:${i}`} />)}</div>
    {group.model && <div className="l61-model"><button type="button" className="l61-button l61-button--quiet" disabled={completed !== group.items.length} aria-expanded={showModel} onClick={() => setShowModel(!showModel)}>{showModel ? "إخفاء الحل النموذجي للفقرة" : "عرض الحل النموذجي للفقرة"}</button>{completed !== group.items.length && <p>تحقّق من جميع الجمل أولًا لفتح الحل الكامل.</p>}{showModel && completed === group.items.length && <div>{group.model.map((line, i) => <article key={i}><div dir="ltr"><En61>{line.en}</En61></div><p>{line.ar}</p></article>)}</div>}</div>}
  </Scene61>;
}
function OriginalTest61({ section }: { section: number }) {
  const items = ORIGINAL_TEST_61.filter((q) => q.section === section);
  const values = useMemorySnapshot61();
  const completed = items.filter((q) => (values[`original:${q.n}`] as AttemptMemory61 | undefined)?.checked).length;
  return <Scene61 kicker={`ORIGINAL TEST / ${section}`} title={`الاختبار الأصلي: ${ORIGINAL_SECTIONS_61[section - 1]}`} lead="حاول حل كل سؤال قبل التحقق من إجابته. مفتاح الأسئلة يظهر بعد المحاولة."><div className="l61-progress-strip"><span>الأسئلة التي تحقّقت منها في هذا القسم</span><bdi dir="ltr">{completed} / {items.length}</bdi></div><div className="l61-attempts">{items.map((item) => <Attempt61 key={item.n} item={item} index={item.n} memoryKey={`original:${item.n}`} />)}</div></Scene61>;
}
function OriginalKey61({ go }: { go: (id: string) => void }) {
  const values = useMemorySnapshot61();
  return <Scene61 kicker="ORIGINAL TEST / KEY" title="مفتاح الاختبار الأصلي" lead="كل إجابة مرتبطة برقم سؤالها. تحقّق من السؤال أولًا لتظهر إجابته وسببها هنا."><div className="l61-original-key">{ORIGINAL_TEST_61.map((item) => { const checked = (values[`original:${item.n}`] as AttemptMemory61 | undefined)?.checked; return <article key={item.n} data-l61-key-item={item.n}><div><bdi dir="ltr">{String(item.n).padStart(2, "0")}</bdi><span><Mixed61 text={ORIGINAL_SECTIONS_61[item.section - 1]} /></span></div>{checked ? <><p dir="ltr"><En61>{item.answer}</En61></p><p><Mixed61 text={item.why} /></p></> : <button type="button" className="l61-key-link" onClick={() => go(`original-${item.section}`)}>حاول السؤال أولًا ←</button>}</article>; })}</div></Scene61>;
}
function Writing61() {
  const [draft, setDraft] = useMemory61("writing:draft", "");
  const [show, setShow] = useMemory61("writing:model", false);
  const [checked, setChecked] = useMemory61<number[]>("writing:requirements", []);
  return <Scene61 kicker="OUTPUT / WRITING" title="مهمة الكتابة" lead={WRITING_61.instruction}><div className="l61-task-grid"><div><h3>تأكد من وجود هذه العناصر</h3><div className="l61-checklist">{WRITING_61.requirements.map((item, i) => <label key={i}><input type="checkbox" checked={checked.includes(i)} onChange={(event) => setChecked(event.target.checked ? [...checked, i] : checked.filter((x) => x !== i))} /><span><Mixed61 text={item} /></span></label>)}</div><p>العناصر المحددة: <bdi dir="ltr">{checked.length} / {WRITING_61.requirements.length}</bdi></p></div><div className="l61-writing"><label htmlFor="l61-writing-draft">مسودتك</label><textarea id="l61-writing-draft" dir="ltr" lang="en" rows={12} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write your paragraph here..." /><button type="button" className="l61-button l61-button--quiet" disabled={!draft.trim()} aria-expanded={show} onClick={() => setShow(!show)}>{show ? "إخفاء نموذج الكتابة" : "اقرأ نموذج الكتابة"}</button><p>اكتب مسودة أولًا لفتح النموذج، ثم قارن اختياراتك.</p></div></div>{show && <div className="l61-reading l61-writing-model"><header><h3 dir="ltr">{WRITING_61.title}</h3><p>{WRITING_61.titleAr}</p></header>{WRITING_61.model.map((line, i) => <article key={i}><div dir="ltr"><En61>{line.en}</En61></div><p>{line.ar}</p></article>)}</div>}</Scene61>;
}
function Speaking61() {
  const [done, setDone] = useMemory61<number[]>("speaking:done", []);
  const [notes, setNotes] = useMemory61("speaking:notes", "");
  return <Scene61 kicker="OUTPUT / SPEAKING" title="مهمة التحدث" lead={SPEAKING_61.instruction}><div className="l61-speaking">{SPEAKING_61.questions.map((q, i) => <article key={q.en}><div><bdi dir="ltr">{String(i + 1).padStart(2, "0")}</bdi><div><div dir="ltr"><En61>{q.en}</En61></div><p>{q.ar}</p></div></div><button type="button" aria-pressed={done.includes(i)} onClick={() => setDone(done.includes(i) ? done.filter((x) => x !== i) : [...done, i])}>{done.includes(i) ? "تمت الإجابة ✓" : "تحدثت عن هذا"}</button></article>)}</div><div className="l61-progress-strip"><span>الأسئلة التي تحدثت عنها</span><bdi dir="ltr">{done.length} / {SPEAKING_61.questions.length}</bdi></div><label className="l61-input-label"><span>ملاحظات اختيارية عن إجاباتك</span><textarea dir="ltr" rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="My visit..." /></label><h3 className="l61-subhead">أمثلة على التحويل</h3><div className="l61-pairs">{SPEAKING_61.pairs.map((pair, i) => <PairView61 key={i} pair={pair} index={i + 1} />)}</div></Scene61>;
}
function Summary61() {
  return <Scene61 kicker="MISSION RECAP / 09" title="الملخص النهائي" lead="9 قواعد تربط القصد بالصيغ المناسبة."><div className="l61-summary">{SUMMARY_61.map((item, i) => <article key={item.title}><div className="l61-summary-index" dir="ltr">{String(i + 1).padStart(2, "0")}</div><div><h3><Mixed61 text={item.title} /></h3><div className="l61-summary-formula" dir="ltr"><En61>{item.formula}</En61></div>{item.direct && item.reported && <div className="l61-summary-example" dir="ltr"><En61>{item.direct} → {item.reported}</En61></div>}<p><Mixed61 text={item.note} /></p></div></article>)}</div></Scene61>;
}
function Closing61({ onExit, go }: { onExit?: () => void; go: (id: string) => void }) {
  return <Scene61 kicker="MISSION COMPLETE / 61" title="أنت الآن تقود المعنى" lead="انتقلت من قراءة السؤال إلى اختيار القصد وبناء الجملة المنقولة."><div className="l61-closing"><div className="l61-closing-mark" dir="ltr">61<span>↗</span></div><div><h3>توقف لحظة قبل التحويل.</h3><p>من المتحدث؟ من المخاطَب؟ هل يسأل عن القدرة أم يطلب فعلًا؟ هل تغيّر مرجع الزمان أو المكان؟ هذه الأسئلة تحفظ المعنى قبل تغيير الشكل.</p><div className="l61-closing-actions"><button type="button" className="l61-button l61-button--bright" onClick={() => go("summary")}>راجع القواعد</button><a className="l61-button l61-button--outline" href="#/lesson/60">الدرس السابق · 60</a>{onExit && <button type="button" className="l61-button l61-button--outline" onClick={onExit}>العودة إلى فهرس الدروس</button>}</div><p className="l61-closing-caption">يمكنك العودة إلى الدرس 60 لمراجعة نقل الجمل الخبرية.</p></div></div></Scene61>;
}
function Body61({ current, go, onExit }: { current: Slide61; go: (id: string) => void; onExit?: () => void }) {
  const id = current.id;
  if (id === "cover") return <Cover61 go={go} />;
  if (id === "map") return <Map61 go={go} />;
  if (THEORY_61.some((entry) => entry.id === id)) return <Theory61 id={id} />;
  const labEntry = LABS_61.find((entry) => entry.id === id);
  if (labEntry) return <LabConsole61 lab={labEntry} />;
  if (id === "errors") return <Errors61 />;
  if (id === "procedures") return <Procedures61 />;
  if (id === "solved") return <Solved61 />;
  if (id === "dialogue") return <Dialogue61 reported={false} />;
  if (id === "dialogue-reported") return <Dialogue61 reported />;
  if (id === "reading") return <Reading61 />;
  if (id === "comprehension") return <Comprehension61 />;
  if (id.startsWith("practice-")) return <Practice61 id={id} />;
  if (/^original-[1-5]$/.test(id)) return <OriginalTest61 section={Number(id.slice(-1))} />;
  if (id === "original-key") return <OriginalKey61 go={go} />;
  if (id === "final-test") return <Scene61 kicker="FINAL TEST / 15" title="الاختبار النهائي المشترك" lead="أجب عن الأسئلة كلها. لا يظهر التصحيح أو الشرح حتى تسلّم الاختبار."><p className="l61-note"><span className="l61-note-icon">!</span><span>الاختبار الأصلي من 25 سؤالًا موجود أيضًا في محطاته الخمس السابقة.</span></p></Scene61>;
  if (id === "writing") return <Writing61 />;
  if (id === "speaking") return <Speaking61 />;
  if (id === "summary") return <Summary61 />;
  if (id === "teacher") return <TeacherArea61 />;
  if (id === "progress") return <Closing61 onExit={onExit} go={go} />;
  return null;
}
function Lesson61Inner({ onExit }: { onExit?: () => void }) {
  const [step, setStep] = useState(0);
  const [menu, setMenu] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const main = useRef<HTMLElement | null>(null);
  const total = LESSON_61_SCENES.length;
  const go = useCallback((target: number) => { const next = Math.max(0, Math.min(total - 1, target)); setStep(next); setVisited((old) => old.has(next) ? old : new Set(old).add(next)); setMenu(false); if (main.current) main.current.scrollTop = 0; }, [total]);
  const goId = useCallback((id: string) => { const index = LESSON_61_SCENES.findIndex((item) => item.id === id); if (index >= 0) go(index); }, [go]);
  const previous = useCallback(() => go(step - 1), [go, step]);
  const next = useCallback(() => go(step + 1), [go, step]);
  useEffect(() => { const key = (event: KeyboardEvent) => { if (menu) return; const target = event.target as HTMLElement | null; if (target && (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName) || target.isContentEditable)) return; if (event.key === "ArrowLeft" || event.key === " ") { event.preventDefault(); next(); } else if (event.key === "ArrowRight") { event.preventDefault(); previous(); } }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [menu, next, previous]);
  const groups: Lesson1ShellGroup[] = useMemo(() => STATIONS_61.map((station) => ({ section: <span className="l61-rail-title"><Mixed61 text={station.title} /></span>, items: LESSON_61_SCENES.flatMap((entry, index) => entry.station === station.id ? [{ index, title: <span className="l61-rail-title"><SceneTitle61 scene={entry} /></span>, mascot: <span aria-hidden="true">{entry.emblem}</span>, navId: entry.id }] : []) })), []);
  const current = LESSON_61_SCENES[step];
  return <Lesson1Shell rootClassName="style-b font-body relative flex h-screen flex-col overflow-hidden lesson61" rootDir="rtl" rootDataLesson={61} rootDataShell="communication-control-room" railAriaLabel="فهرس خطوات الدرس 61" navAriaLabel="التنقل بين خطوات الدرس" markActiveStep itemTitleClassName="line-clamp-2 leading-snug" railTitle={<span>الدرس 61 <En61 className="text-sm">· CONTROL ROOM</En61></span>} railSubtitle={<span className="l61-rail-meta"><bdi dir="ltr">{visited.size} / {total}</bdi> محطة زرتها</span>} groups={groups} activeIndex={step} onSelectStep={go} onExit={onExit} isMenuOpen={menu} onMenuOpenChange={setMenu} headerContent={<span className="l61-header-title"><SceneTitle61 scene={current} /></span>} progress={((step + 1) / total) * 100} counter={<bdi dir="ltr">{step + 1} / {total}</bdi>} counterDir="ltr" contentKey={current.id} contentArea={current.id} onPrev={previous} onNext={next} prevDisabled={step === 0} nextDisabled={step === total - 1} mainRef={main} mainId="l61-main" mainAfter={<div hidden={current.id !== "final-test"} className="lesson-content-container l61-final" data-l61-final><FinalTest lesson={61} questions={TEST_61} accent="bg-[#07584d]" title="الاختبار النهائي" isolateProgress onGoTeacher={() => goId("teacher")} /></div>}>
    <div className="l61-main"><Body61 current={current} go={goId} onExit={onExit} /></div>
  </Lesson1Shell>;
}
export default function Lesson61({ onExit }: { onExit?: () => void }) { return <MemoryProvider61><Lesson61Inner onExit={onExit} /></MemoryProvider61>; }
