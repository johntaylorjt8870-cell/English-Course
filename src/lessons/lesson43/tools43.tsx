import type { ReactNode } from 'react';
import { Lines43, Panel43, Tag43, Text43, useField43, type Tone43 } from './kit43';

// ------------------------------------------------------------
// The Probability Observatory — generic interactive engines.
// Every control writes into the lesson workspace, so state survives
// step navigation exactly like the rest of the course.
// ------------------------------------------------------------
export type Choice43 = { prompt: string; context?: string; options: string[]; answer: string; why: string; note?: string; accepted?: string[] };

export function ChoiceLab43({ items, kicker, title, intro, id, tone = 'lab' as const }: {
  items: Choice43[]; kicker?: string; title?: string; intro?: string; id: string; tone?: Tone43;
}) {
  return <Panel43 kicker={kicker} title={title} tone={tone}>
    {intro && <p><Text43 text={intro}/></p>}
    <div className="choiceGrid43">{items.map((item, i) => <ChoiceItem43 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1}/>)}</div>
  </Panel43>;
}

function ChoiceItem43({ item, id, index }: { item: Choice43; id: string; index: number }) {
  const [pick, setPick] = useField43(id), [checked, setChecked] = useField43(`${id}-checked`);
  const accepted = item.accepted ?? [item.answer];
  const right = accepted.includes(pick);
  return <article className="exercise43" data-exercise-id={id}>
    <span className="label43"><bdi dir="ltr">{index}</bdi></span>
    <Lines43 lines={[item.prompt]}/>
    {item.context && <p className="context43"><Text43 text={item.context}/></p>}
    <div className="actions43" role="group" aria-label="اختر الإجابة">
      {item.options.map(option => <button key={option} type="button" aria-pressed={pick === option} onClick={() => { setPick(option); setChecked(''); }}><Text43 text={option}/></button>)}
    </div>
    <button className="primary43" type="button" disabled={!pick} onClick={() => setChecked('yes')}>تحقق من الإجابة</button>
    {checked && <div role="status" className={right ? 'feedback43' : 'feedback43 error'}>
      <b>{right ? 'إجابة صحيحة' : 'ليست الإجابة الأنسب هنا'}</b>
      <Lines43 lines={[item.why]}/>
      {item.note && <p className="label43"><Text43 text={item.note}/></p>}
    </div>}
  </article>;
}

// Attempt-gated free text: the source answer appears only after the student writes.
export function AttemptLab43({ items, kicker, title, intro, id, fieldLabel, sourceLabel, extra }: {
  items: { prompt: string; source: string; reason: string; extra?: string }[];
  kicker?: string; title?: string; intro?: string; id: string; fieldLabel: string; sourceLabel: string; extra?: boolean;
}) {
  return <Panel43 kicker={kicker} title={title} tone="drill">
    {intro && <p><Text43 text={intro}/></p>}
    {items.map((item, i) => <AttemptItem43 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1} fieldLabel={fieldLabel} sourceLabel={sourceLabel} extra={extra}/>)}
  </Panel43>;
}

function AttemptItem43({ item, id, index, fieldLabel, sourceLabel, extra }: {
  item: { prompt: string; source: string; reason: string; extra?: string }; id: string; index: number; fieldLabel: string; sourceLabel: string; extra?: boolean;
}) {
  const [text, setText] = useField43(id), [note, setNote] = useField43(`${id}-note`), [attempt, setAttempt] = useField43(`${id}-attempt`);
  return <article className="exercise43" data-exercise-id={id}>
    <span className="label43"><bdi dir="ltr">{index}</bdi></span>
    <Lines43 lines={[item.prompt]}/>
    <label className="field43">{fieldLabel}
      <textarea rows={2} dir="auto" value={text} onChange={e => { setText(e.target.value); setAttempt(''); }}/>
    </label>
    {extra && <label className="field43">ما الذي غيّرته ولماذا؟
      <textarea rows={2} dir="auto" value={note} onChange={e => { setNote(e.target.value); setAttempt(''); }}/>
    </label>}
    <button className="primary43" type="button" disabled={!text.trim() || (!!extra && !note.trim())} onClick={() => setAttempt('yes')}>قارن محاولتك بالحل</button>
    {attempt && <div className="feedback43" role="status">
      <b>{sourceLabel}</b>
      <Lines43 lines={[item.source]}/>
      <p className="label43">شرح المنصة</p>
      <Lines43 lines={[item.reason]}/>
      {item.extra && <p className="label43"><Text43 text={item.extra}/></p>}
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Probability dial — Subject + MAY/MIGHT + V1 control panel
// ------------------------------------------------------------
const SUBJECTS43 = ['I', 'You', 'He', 'She', 'It', 'We', 'They'];
const VERBS43: [string, string][] = [['travel', 'السفر'], ['visit her grandmother', 'زيارة جدتها'], ['arrive late', 'الوصول متأخرًا'], ['need more time', 'الاحتياج إلى وقت إضافي'], ['rain tomorrow', 'المطر غدًا'], ['be at home', 'الوجود في المنزل']];
const MAY_AR43: Record<string, string> = { I: 'قد', You: 'قد', He: 'قد', She: 'قد', It: 'قد', We: 'قد', They: 'قد' };
const MIGHT_AR43: Record<string, string> = { I: 'ربما', You: 'ربما', He: 'ربما', She: 'ربما', It: 'ربما', We: 'ربما', They: 'ربما' };

export function DialLab43() {
  const [channel, setChannel] = useField43('dial-channel');
  const [subject, setSubject] = useField43('dial-subject');
  const [verb, setVerb] = useField43('dial-verb');
  const modal = channel === 'might' ? 'might' : 'may';
  const who = SUBJECTS43[Number(subject) || 0];
  const [en, ar] = VERBS43[Number(verb) || 0];
  const gloss = (channel === 'might' ? MIGHT_AR43 : MAY_AR43)[who];
  return <Panel43 kicker="OBSERVATION DIAL / 01" title="بدّل القناة. لاحظ ما يتغيّر وما لا يتغيّر." tone="lab">
    <p>اختر الفاعل والفعل، ثم بدّل بين قناتي <bdi dir="ltr">MAY</bdi> و<bdi dir="ltr">MIGHT</bdi>.</p>
    <p>لاحظ أن الفعل الرئيسي يبقى بصيغة <Text43 text="V1"/> دائمًا، وأن الفعل الناقص نفسه لا يتغير مع الفاعل.</p>
    <div className="dialRow43">
      <div className="dialGroup43">
        <span className="label43">الفاعل</span>
        <div className="actions43">{SUBJECTS43.map((s, i) => <button key={s} type="button" dir="ltr" aria-pressed={i === (Number(subject) || 0)} onClick={() => setSubject(String(i))}>{s}</button>)}</div>
      </div>
      <div className="dialGroup43">
        <span className="label43">القناة</span>
        <div className="actions43">
          <button type="button" className={modal === 'may' ? 'channelMay43' : ''} aria-pressed={modal === 'may'} onClick={() => setChannel('may')}>MAY</button>
          <button type="button" className={modal === 'might' ? 'channelMight43' : ''} aria-pressed={modal === 'might'} onClick={() => setChannel('might')}>MIGHT</button>
        </div>
      </div>
      <div className="dialGroup43">
        <span className="label43">الفعل V1</span>
        <div className="actions43">{VERBS43.map(([word], i) => <button key={word} type="button" dir="ltr" aria-pressed={i === (Number(verb) || 0)} onClick={() => setVerb(String(i))}>{word}</button>)}</div>
      </div>
    </div>
    <div className="readout43" dir="ltr">
      <Tag43 role="subject">{who}</Tag43>
      <Tag43 role={modal === 'may' ? 'may' : 'might'}>{modal}</Tag43>
      <Tag43 role="verb">{en}</Tag43>
    </div>
    <p className="formula43" dir="ltr">{who} {modal} {en}.</p>
    <div className="readout43" dir="ltr">
      <span className="readoutChip43">{modal === 'may' ? "mayn't" : "mightn't"}</span>
      <span className="readoutChip43">{modal === 'may' ? 'May' : 'Might'} {who} {en}?</span>
    </div>
    <p className="label43">ترجمة إرشادية — إضافة المنصة: {gloss} {ar}.</p>
  </Panel43>;
}

// ------------------------------------------------------------
// Transformation console — affirmative → negative / question
// ------------------------------------------------------------
export type Transform43 = { en: string; ar: string; negative: string; question: string; why: string };
export function TransformLab43({ items, id, title = 'console', kicker = 'TRANSFORM CONSOLE' }: { items: Transform43[]; id: string; title?: string; kicker?: string }) {
  const [pick, setPick] = useField43(`${id}-sentence`);
  const [mode, setMode] = useField43(`${id}-mode`);
  const row = items[Number(pick) || 0];
  return <Panel43 kicker={kicker} title={title} tone="drill">
    <div data-exercise-id={id}>
    <label className="field43">اختر الجملة
      <select value={pick || '0'} onChange={e => { setPick(e.target.value); setMode(''); }}>
        {items.map((item, i) => <option key={i} value={i}>{item.en}</option>)}
      </select>
    </label>
    <Lines43 lines={[row.ar]}/>
    <div className="actions43">
      <button type="button" className="primary43" onClick={() => setMode('negative')}>كوّن النفي</button>
      <button type="button" className="primary43" onClick={() => setMode('question')}>كوّن السؤال</button>
    </div>
    {mode && <div className="feedback43" role="status">
      <b>{mode === 'negative' ? 'النفي' : 'السؤال'}</b>
      <p className="formula43" dir="ltr">{mode === 'negative' ? row.negative : row.question}</p>
      <Lines43 lines={[row.why]}/>
    </div>}
    </div>
  </Panel43>;
}

// ------------------------------------------------------------
// Dialogue renderer — real speaker turns, not a wall of text
// ------------------------------------------------------------
const TURN43 = /^([A-Za-z][A-Za-z .']*):\s+(.+)$/;
export function Dialog43({ lines, prefix, title }: { lines: string[]; prefix?: string; title?: string }) {
  const groups: { turn: boolean; items: string[] }[] = [];
  for (const line of lines) {
    const match = line.match(TURN43);
    const isTurn = !!match && /[A-Za-z]/.test(match[2]);
    const last = groups[groups.length - 1];
    if (isTurn) {
      if (!last || !last.turn) groups.push({ turn: true, items: [] });
      groups[groups.length - 1].items.push(`${match![1]}|${match![2]}`);
    } else {
      if (!last || last.turn) groups.push({ turn: false, items: [] });
      groups[groups.length - 1].items.push(line);
    }
  }
  return <Panel43 kicker="DIALOGUE" title={title} tone="dialog">
    {groups.map((group, i) => group.turn
      ? <div className="dialog43" key={i} dir="ltr">{group.items.map((turn, j) => {
          const [who, said] = turn.split('|');
          return <p className="turn43" key={j}><span className="speaker43">{who}</span><span className="said43">{said}</span></p>;
        })}</div>
      : <Lines43 key={i} lines={group.items} prefix={prefix}/>)}
  </Panel43>;
}

// ------------------------------------------------------------
// Numbered goal cards (lesson objectives)
// ------------------------------------------------------------
export function GoalList43({ lines }: { lines: string[] }) {
  const goals = lines.filter(line => /^[①-㉕]/.test(line)).map(line => line.slice(1).trim());
  return <div className="goalGrid43">{goals.map((goal, i) => <div className="goal43" key={i}><span className="goalIndex43" aria-hidden="true"><bdi dir="ltr">{String(i + 1).padStart(2, '0')}</bdi></span><Text43 text={goal}/></div>)}</div>;
}

export function ModalFamily43({ words, focus }: { words: string[]; focus: string[] }) {
  return <div className="family43" dir="ltr">{words.map(word => <span key={word} className={`familyChip43 ${focus.includes(word) ? 'on' : ''}`}>{word}</span>)}</div>;
}

export function Channel43({ channel, children }: { channel: 'may' | 'might'; children: ReactNode }) {
  return <span className={`channel43 ${channel}`} dir="ltr">{children}</span>;
}
