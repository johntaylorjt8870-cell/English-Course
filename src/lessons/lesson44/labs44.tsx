import { Lines44, Panel44, Text44, useField44 } from './kit44';
import { section44 } from './ledger44';
import { practices44, type Practice44 } from './practiceData44';
import { practiceReason44 } from './practiceNotes44';
import { AttemptLab44, ChoiceLab44, Dialog44, GoalList44, ObligationBuilder44, ProhibitionSorter44, TenseMachine44, type Choice44 } from './tools44';

// ------------------------------------------------------------
// Grammar Detective — §27
// ------------------------------------------------------------
const DETECTIVE_ITEMS_44: { sentence: string; correct: string; why: string }[] = [
  { sentence: 'She musts study harder.', correct: 'She must study harder.', why: 'MUST لا تأخذ s مع أي فاعل.' },
  { sentence: 'He must to finish the project.', correct: 'He must finish the project.', why: 'بعد MUST نستخدم V1 مباشرة بدون to.' },
  { sentence: 'She have to leave early.', correct: 'She has to leave early.', why: 'المفرد الغائب يأخذ has to وليس have to.' },
  { sentence: 'Does she has to wear a uniform?', correct: 'Does she have to wear a uniform?', why: 'بعد Does يعود have إلى صيغته الأساسية.' },
  { sentence: "I didn't had to work yesterday.", correct: "I didn't have to work yesterday.", why: "بعد didn't نستخدم have — لا had." },
  { sentence: 'She will has to travel tomorrow.', correct: 'She will have to travel tomorrow.', why: 'بعد will نستخدم have — لا has.' },
  { sentence: "You don't must enter this room.", correct: "You mustn't enter this room. (إذا كان المقصود المنع)", why: "لا نستخدم don't must. نفي MUST هو mustn't." },
  { sentence: "He doesn't has to come today.", correct: "He doesn't have to come today.", why: "بعد doesn't يعود have إلى صيغته الأساسية." },
  { sentence: 'Did they had to pay?', correct: 'Did they have to pay?', why: 'بعد Did نستخدم have — لا had.' },
  { sentence: "You mustn't come early tomorrow. والمقصود: ليس ضروريًا.", correct: "You don't have to come early tomorrow.", why: "MUSTN'T = منع. المطلوب عدم ضرورة = don't have to." },
];
export function GrammarDetective44() {
  return <Panel44 kicker="GRAMMAR DETECTIVE" title="اكتشف الأخطاء العشرة وصحّحها" tone="challenge">
    <p>كل جملة تحتوي خطأ واحدًا. اكتشف الخطأ ثم اضغط «اعرض التصحيح» للمقارنة.</p>
    <div className="choiceGrid44">{DETECTIVE_ITEMS_44.map((item, i) => <DetectiveItem44 key={i} id={`det-${i}`} item={item} index={i + 1}/>)}</div>
  </Panel44>;
}
function DetectiveItem44({ item, id, index }: { item: { sentence: string; correct: string; why: string }; id: string; index: number }) {
  const [revealed, setRevealed] = useField44(id);
  return <article className="exercise44" data-exercise-id={id}>
    <span className="label44"><bdi dir="ltr">{index}</bdi></span>
    <p className="formula44" dir="ltr">{item.sentence}</p>
    <button className="primary44" type="button" onClick={() => setRevealed(revealed ? '' : 'yes')}>{revealed ? 'أخفِ التصحيح' : 'اعرض التصحيح'}</button>
    {revealed && <div className="feedback44" role="status">
      <b>التصحيح</b>
      <p className="formula44" dir="ltr">{item.correct}</p>
      <Lines44 lines={[item.why]}/>
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Practice Sets — §28–§32
// ------------------------------------------------------------
export function PracticeSet44({ section }: { section: number }) {
  const items = practices44(section);
  const s = section44(section);
  return <div className="practiceSet44">
    <Lines44 lines={s.lines} prefix={`s${String(section).padStart(2, '0')}`}/>
    {items.map(item => <PracticeItem44 key={item.id} item={item}/>)}
  </div>;
}
function PracticeItem44({ item }: { item: Practice44 }) {
  const [answer, setAnswer] = useField44(item.id), [checked, setChecked] = useField44(`${item.id}-check`);
  const reason = practiceReason44(item.section, item.number);
  if (item.options.length > 0) {
    const right = answer === item.sourceAnswer.split(' — ')[0] || answer === item.sourceAnswer;
    return <article className="exercise44" data-exercise-id={item.id}>
      <span className="label44"><bdi dir="ltr">{item.number}</bdi></span>
      <Lines44 lines={[item.prompt]}/>
      <div className="actions44" role="group">
        {item.options.map(opt => <button key={opt} type="button" aria-pressed={answer === opt} onClick={() => { setAnswer(opt); setChecked(''); }}><Text44 text={opt}/></button>)}
      </div>
      <button className="primary44" type="button" disabled={!answer} onClick={() => setChecked('yes')}>تحقق</button>
      {checked && <div role="status" className={right ? 'feedback44' : 'feedback44 error'}>
        <b>{right ? 'صحيح ✓' : `الحل: ${item.sourceAnswer}`}</b>
        <Lines44 lines={[reason]}/>
      </div>}
    </article>;
  }
  return <article className="exercise44" data-exercise-id={item.id}>
    <span className="label44"><bdi dir="ltr">{item.number}</bdi></span>
    <Lines44 lines={[item.prompt]}/>
    <label className="field44">إجابتك<textarea rows={2} dir="auto" value={answer} onChange={e => { setAnswer(e.target.value); setChecked(''); }}/></label>
    <button className="primary44" type="button" disabled={!answer.trim()} onClick={() => setChecked('yes')}>قارن بالحل</button>
    {checked && <div className="feedback44" role="status">
      <b>الحل: {item.sourceAnswer}</b>
      <Lines44 lines={[reason]}/>
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Reading Challenge — §33
// ------------------------------------------------------------
const READING_ANSWERS_44 = [
  'They are visiting a science centre.',
  'Everyone must stay with the group.',
  "They mustn't touch the equipment without permission.",
  "No, they don't.",
  "Because she doesn't have to carry a heavy bag today.",
  'They must listen carefully.',
  "No, they don't.",
  'They will have to work in small teams to design a simple machine.',
  'A strong personal determination.',
  'I had to carry a heavy bag yesterday.',
];
export function ReadingChallenge44() {
  const s = section44(33);
  const questions = s.lines.filter(l => /^[①-⑩]/.test(l));
  return <Panel44 kicker="READING CHALLENGE" title="A Day at the Science Centre" tone="read">
    <Lines44 lines={s.lines} prefix="s33"/>
    <h4>أسئلة الفهم</h4>
    {questions.map((q, i) => <ReadingItem44 key={i} id={`read-${i}`} question={q} answer={READING_ANSWERS_44[i]}/>)}
  </Panel44>;
}
function ReadingItem44({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [text, setText] = useField44(id), [checked, setChecked] = useField44(`${id}-check`);
  return <article className="exercise44" data-exercise-id={id}>
    <Lines44 lines={[question]}/>
    <label className="field44">إجابتك<textarea rows={2} dir="auto" value={text} onChange={e => { setText(e.target.value); setChecked(''); }}/></label>
    <button className="primary44" type="button" disabled={!text.trim()} onClick={() => setChecked('yes')}>قارن بالحل</button>
    {checked && <div className="feedback44" role="status">
      <b>الحل</b>
      <Lines44 lines={[answer]}/>
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Writing Mission — §36
// ------------------------------------------------------------
export function WritingMission44() {
  const s = section44(36);
  return <Panel44 kicker="WRITING MISSION" title="My School Rules and Responsibilities" tone="write">
    <Lines44 lines={s.lines} prefix="s36"/>
    <h4>قائمة التحقق — إضافة المنصة</h4>
    <ul className="checklist44">
      {['ثلاث جمل MUST', 'ثلاث جمل HAVE TO / HAS TO', 'جملتان MUSTN\'T', 'جملتان DON\'T HAVE TO / DOESN\'T HAVE TO', 'جملة HAD TO', 'جملة DIDN\'T HAVE TO', 'جملة WILL HAVE TO', 'سؤال DO/DOES + HAVE TO', '12–15 جملة', 'تحدي إضافي: تفسير ثلاث جمل'].map((item, i) =>
        <li key={i}><label><input type="checkbox"/> <Text44 text={item}/></label></li>)}
    </ul>
  </Panel44>;
}

// ------------------------------------------------------------
// Summary Cards — §37
// ------------------------------------------------------------
export function SummaryCards44() {
  return <Panel44 kicker="GOLDEN SUMMARY" title="الملخص الذهبي" tone="rule">
    <div className="summaryGrid44">
      <div className="summaryCard44"><h4>MUST</h4><p dir="ltr">Subject + must + V1</p><Lines44 lines={['لا تتغير مع الفاعل', 'توصية قوية أو إلزام', 'MUSTN\'T = منع']}/></div>
      <div className="summaryCard44"><h4>HAVE TO</h4><p dir="ltr">Subject + have/has to + V1</p><Lines44 lines={['تتغير: has to مع المفرد الغائب', 'المتطلبات والظروف الخارجية', "don't/doesn't have to = عدم ضرورة"]}/></div>
      <div className="summaryCard44"><h4>الماضي</h4><p dir="ltr">HAD TO + V1</p><Lines44 lines={["didn't have to = لم يكن ضروريًا", 'لا نستخدم musted', "Did + subject + have to?"]}/></div>
      <div className="summaryCard44"><h4>المستقبل</h4><p dir="ltr">WILL HAVE TO + V1</p><Lines44 lines={["won't have to = لن يكون ضروريًا", 'Will + subject + have to?', 'بعد will نستخدم have']}/></div>
      <div className="summaryCard44"><h4>القاعدة الذهبية الكبرى</h4><Lines44 lines={["MUSTN'T ≠ DON'T HAVE TO", 'المنع ≠ عدم الضرورة', 'السياق يحدد المعنى']}/></div>
    </div>
  </Panel44>;
}

// ------------------------------------------------------------
// Roadmap — §38
// ------------------------------------------------------------
export function Roadmap44() {
  const s = section44(38);
  return <Panel44 kicker="PROGRESS MAP" title="خريطة التقدم" tone="plain">
    <Lines44 lines={s.lines} prefix="s38"/>
    <div className="progressBar44">
      <div className="progressFill44" style={{width: `${(44/120)*100}%`}}/>
    </div>
    <p><bdi dir="ltr">44 / 120</bdi> — 44 درسًا مكتملًا — 76 درسًا متبقيًا</p>
    <div className="nextLesson44">
      <p className="eyebrow44">الدرس القادم</p>
      <p><b>Lesson 45 — SHOULD & OUGHT TO</b></p>
      <Lines44 lines={['Advice, Recommendations & Expectations']}/>
    </div>
  </Panel44>;
}
