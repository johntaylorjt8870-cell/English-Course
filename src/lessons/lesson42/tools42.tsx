import type { ReactNode } from 'react';
import { Lines42, Panel42, Tag42, Text42, useField42, type Tone42 } from './kit42';

// ------------------------------------------------------------
// Language Control Lab — generic interactive engines.
// Every control writes into the lesson workspace, so state survives
// step navigation exactly like the rest of the course.
// ------------------------------------------------------------
export type Choice42 = { prompt: string; context?: string; options: string[]; answer: string; why: string; note?: string };

export function ChoiceLab42({ items, kicker, title, intro, id, tone = 'lab' as const }: {
  items: Choice42[]; kicker?: string; title?: string; intro?: string; id: string; tone?: Tone42;
}) {
  return <Panel42 kicker={kicker} title={title} tone={tone}>
    {intro && <p><Text42 text={intro}/></p>}
    <div className="choiceGrid42">{items.map((item, i) => <ChoiceItem42 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1}/>)}</div>
  </Panel42>;
}

function ChoiceItem42({ item, id, index }: { item: Choice42; id: string; index: number }) {
  const [pick, setPick] = useField42(id), [checked, setChecked] = useField42(`${id}-checked`);
  const right = pick === item.answer;
  return <article className="exercise42" data-exercise-id={id}>
    <span className="label42"><bdi dir="ltr">{index}</bdi></span>
    <Lines42 lines={[item.prompt]}/>
    {item.context && <p className="context42"><Text42 text={item.context}/></p>}
    <div className="actions42" role="group" aria-label="اختر الإجابة">
      {item.options.map(option => <button key={option} type="button" aria-pressed={pick === option} onClick={() => { setPick(option); setChecked(''); }}><Text42 text={option}/></button>)}
    </div>
    <button className="primary42" type="button" disabled={!pick} onClick={() => setChecked('yes')}>تحقق من الإجابة</button>
    {checked && <div role="status" className={right ? 'feedback42' : 'feedback42 error'}>
      <b>{right ? 'إجابة صحيحة' : 'ليست الإجابة الأنسب هنا'}</b>
      <Lines42 lines={[item.why]}/>
      {item.note && <p className="label42"><Text42 text={item.note}/></p>}
    </div>}
  </article>;
}

// Attempt-gated free text: the source answer appears only after the student writes.
export function AttemptLab42({ items, kicker, title, intro, id, fieldLabel, sourceLabel, extra }: {
  items: { prompt: string; source: string; reason: string; extra?: string }[];
  kicker?: string; title?: string; intro?: string; id: string; fieldLabel: string; sourceLabel: string; extra?: boolean;
}) {
  return <Panel42 kicker={kicker} title={title} tone="drill">
    {intro && <p><Text42 text={intro}/></p>}
    {items.map((item, i) => <AttemptItem42 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1} fieldLabel={fieldLabel} sourceLabel={sourceLabel} extra={extra}/>)}
  </Panel42>;
}

function AttemptItem42({ item, id, index, fieldLabel, sourceLabel, extra }: {
  item: { prompt: string; source: string; reason: string; extra?: string }; id: string; index: number; fieldLabel: string; sourceLabel: string; extra?: boolean;
}) {
  const [text, setText] = useField42(id), [note, setNote] = useField42(`${id}-note`), [attempt, setAttempt] = useField42(`${id}-attempt`);
  return <article className="exercise42" data-exercise-id={id}>
    <span className="label42"><bdi dir="ltr">{index}</bdi></span>
    <Lines42 lines={[item.prompt]}/>
    <label className="field42">{fieldLabel}
      <textarea rows={2} dir="auto" value={text} onChange={e => { setText(e.target.value); setAttempt(''); }}/>
    </label>
    {extra && <label className="field42">ما الذي غيّرته ولماذا؟
      <textarea rows={2} dir="auto" value={note} onChange={e => { setNote(e.target.value); setAttempt(''); }}/>
    </label>}
    <button className="primary42" type="button" disabled={!text.trim() || (!!extra && !note.trim())} onClick={() => setAttempt('yes')}>قارن محاولتك بالحل</button>
    {attempt && <div className="feedback42" role="status">
      <b>{sourceLabel}</b>
      <Lines42 lines={[item.source]}/>
      <p className="label42">شرح المنصة</p>
      <Lines42 lines={[item.reason]}/>
      {item.extra && <p className="label42"><Text42 text={item.extra}/></p>}
    </div>}
  </article>;
}

// ------------------------------------------------------------
// Sentence switch — Subject + CAN/COULD + V1 control panel
// ------------------------------------------------------------
const SUBJECTS = ['I', 'You', 'He', 'She', 'It', 'We', 'They'];
const VERBS: [string, string][] = [['swim', 'السباحة'], ['speak English', 'التحدث بالإنجليزية'], ['play chess', 'لعب الشطرنج'], ['run fast', 'الركض بسرعة'], ['drive a car', 'قيادة السيارة'], ['read books', 'قراءة الكتب']];
const CAN_AR: Record<string, string> = { I: 'أستطيع', You: 'تستطيع', He: 'يستطيع', She: 'تستطيع', It: 'يستطيع', We: 'نستطيع', They: 'يستطيعون' };
const COULD_AR: Record<string, string> = { I: 'كنت أستطيع', You: 'كنت تستطيع', He: 'كان يستطيع', She: 'كانت تستطيع', It: 'كان يستطيع', We: 'كنا نستطيع', They: 'كانوا يستطيعون' };

export function SwitchLab42() {
  const [channel, setChannel] = useField42('switch-channel');
  const [subject, setSubject] = useField42('switch-subject');
  const [verb, setVerb] = useField42('switch-verb');
  const modal = channel === 'could' ? 'could' : 'can';
  const who = SUBJECTS[Number(subject) || 0];
  const [en, ar] = VERBS[Number(verb) || 0];
  const gloss = (channel === 'could' ? COULD_AR : CAN_AR)[who];
  return <Panel42 kicker="CONTROL PANEL / 01" title="بدّل القناة. لاحظ ما يتغيّر وما لا يتغيّر." tone="lab">
    <p>اختر الفاعل والفعل، ثم بدّل بين قناتي <bdi dir="ltr">CAN</bdi> و<bdi dir="ltr">COULD</bdi>.</p>
    <p>لاحظ أن الفعل الرئيسي يبقى بصيغة <Text42 text="V1"/> دائمًا.</p>
    <div className="dialRow42">
      <div className="dialGroup42">
        <span className="label42">الفاعل</span>
        <div className="actions42">{SUBJECTS.map((s, i) => <button key={s} type="button" dir="ltr" aria-pressed={i === (Number(subject) || 0)} onClick={() => setSubject(String(i))}>{s}</button>)}</div>
      </div>
      <div className="dialGroup42">
        <span className="label42">القناة</span>
        <div className="actions42">
          <button type="button" aria-pressed={modal === 'can'} onClick={() => setChannel('can')}>CAN</button>
          <button type="button" aria-pressed={modal === 'could'} onClick={() => setChannel('could')}>COULD</button>
        </div>
      </div>
      <div className="dialGroup42">
        <span className="label42">الفعل V1</span>
        <div className="actions42">{VERBS.map(([word], i) => <button key={word} type="button" dir="ltr" aria-pressed={i === (Number(verb) || 0)} onClick={() => setVerb(String(i))}>{word}</button>)}</div>
      </div>
    </div>
    <div className="readout42" dir="ltr">
      <Tag42 role="subject">{who}</Tag42>
      <Tag42 role={modal === 'can' ? 'can' : 'could'}>{modal}</Tag42>
      <Tag42 role="verb">{en}</Tag42>
    </div>
    <p className="formula42" dir="ltr">{who} {modal} {en}.</p>
    <div className="readout42" dir="ltr">
      <span className="readoutChip42">{modal === 'can' ? "can't" : "couldn't"}</span>
      <span className="readoutChip42">{modal === 'can' ? 'Can' : 'Could'} {who} {en}?</span>
    </div>
    <p className="label42">ترجمة إرشادية — إضافة المنصة: {gloss} {ar}.</p>
  </Panel42>;
}

// ------------------------------------------------------------
// Transformation console — affirmative → negative / question
// ------------------------------------------------------------
export type Transform42 = { en: string; ar: string; negative: string; question: string; why: string };
export function TransformLab42({ items, id, title = 'console', kicker = 'TRANSFORM CONSOLE' }: { items: Transform42[]; id: string; title?: string; kicker?: string }) {
  const [pick, setPick] = useField42(`${id}-sentence`);
  const [mode, setMode] = useField42(`${id}-mode`);
  const row = items[Number(pick) || 0];
  return <Panel42 kicker={kicker} title={title} tone="drill">
    <div data-exercise-id={id}>
    <label className="field42">اختر الجملة
      <select value={pick || '0'} onChange={e => { setPick(e.target.value); setMode(''); }}>
        {items.map((item, i) => <option key={i} value={i}>{item.en}</option>)}
      </select>
    </label>
    <Lines42 lines={[row.ar]}/>
    <div className="actions42">
      <button type="button" className="primary42" onClick={() => setMode('negative')}>كوّن النفي</button>
      <button type="button" className="primary42" onClick={() => setMode('question')}>كوّن السؤال</button>
    </div>
    {mode && <div className="feedback42" role="status">
      <b>{mode === 'negative' ? 'النفي' : 'السؤال'}</b>
      <p className="formula42" dir="ltr">{mode === 'negative' ? row.negative : row.question}</p>
      <Lines42 lines={[row.why]}/>
    </div>}
    </div>
  </Panel42>;
}

// ------------------------------------------------------------
// Dialogue renderer — real speaker turns, not a wall of text
// ------------------------------------------------------------
const TURN = /^([A-Za-z][A-Za-z .']*):\s+(.+)$/;
export function Dialog42({ lines, prefix, title }: { lines: string[]; prefix?: string; title?: string }) {
  const groups: { turn: boolean; items: string[] }[] = [];
  for (const line of lines) {
    const match = line.match(TURN);
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
  return <Panel42 kicker="DIALOGUE" title={title} tone="dialog">
    {groups.map((group, i) => group.turn
      ? <div className="dialog42" key={i} dir="ltr">{group.items.map((turn, j) => {
          const [who, said] = turn.split('|');
          return <p className="turn42" key={j}><span className="speaker42">{who}</span><span className="said42">{said}</span></p>;
        })}</div>
      : <Lines42 key={i} lines={group.items} prefix={prefix}/>)}
  </Panel42>;
}

// ------------------------------------------------------------
// Numbered goal cards (lesson objectives)
// ------------------------------------------------------------
export function GoalList42({ lines }: { lines: string[] }) {
  const goals = lines.filter(line => /^[①-⑩]/.test(line)).map(line => line.slice(1).trim());
  return <div className="goalGrid42">{goals.map((goal, i) => <div className="goal42" key={i}><span className="goalIndex42" aria-hidden="true"><bdi dir="ltr">{String(i + 1).padStart(2, '0')}</bdi></span><Text42 text={goal}/></div>)}</div>;
}

export function ModalFamily42({ words }: { words: string[] }) {
  return <div className="family42" dir="ltr">{words.map(word => <span key={word} className={/^(can|could)$/.test(word) ? 'familyChip42 on' : 'familyChip42'}>{word}</span>)}</div>;
}

export function Channel42({ channel, children }: { channel: 'can' | 'could'; children: ReactNode }) {
  return <span className={`channel42 ${channel}`} dir="ltr">{children}</span>;
}
