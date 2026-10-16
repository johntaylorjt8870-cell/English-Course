import type { ReactNode } from 'react';
import { Lines44, Panel44, Text44, useField44, type Tone44 } from './kit44';

export type Choice44 = { prompt: string; context?: string; options: string[]; answer: string; why: string; note?: string; accepted?: string[] };

export function ChoiceLab44({ items, kicker, title, intro, id, tone = 'lab' as const }: {
  items: Choice44[]; kicker?: string; title?: string; intro?: string; id: string; tone?: Tone44;
}) {
  return <Panel44 kicker={kicker} title={title} tone={tone}>
    {intro && <p><Text44 text={intro}/></p>}
    <div className="choiceGrid44">{items.map((item, i) => <ChoiceItem44 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1}/>)}</div>
  </Panel44>;
}

function ChoiceItem44({ item, id, index }: { item: Choice44; id: string; index: number }) {
  const [pick, setPick] = useField44(id), [checked, setChecked] = useField44(`${id}-checked`);
  const accepted = item.accepted ?? [item.answer];
  const right = accepted.includes(pick);
  return <article className="exercise44" data-exercise-id={id}>
    <span className="label44"><bdi dir="ltr">{index}</bdi></span>
    <Lines44 lines={[item.prompt]}/>
    {item.context && <p className="context44"><Text44 text={item.context}/></p>}
    <div className="actions44" role="group" aria-label="اختر الإجابة">
      {item.options.map(option => <button key={option} type="button" aria-pressed={pick === option} onClick={() => { setPick(option); setChecked(''); }}><Text44 text={option}/></button>)}
    </div>
    <button className="primary44" type="button" disabled={!pick} onClick={() => setChecked('yes')}>تحقق من الإجابة</button>
    {checked && <div role="status" className={right ? 'feedback44' : 'feedback44 error'}>
      <b>{right ? 'إجابة صحيحة ✓' : 'ليست الإجابة الأنسب هنا'}</b>
      <Lines44 lines={[item.why]}/>
      {item.note && <p className="label44"><Text44 text={item.note}/></p>}
    </div>}
  </article>;
}

export function AttemptLab44({ items, kicker, title, intro, id, fieldLabel, sourceLabel }: {
  items: { prompt: string; source: string; reason: string }[];
  kicker?: string; title?: string; intro?: string; id: string; fieldLabel: string; sourceLabel: string;
}) {
  return <Panel44 kicker={kicker} title={title} tone="drill">
    {intro && <p><Text44 text={intro}/></p>}
    {items.map((item, i) => <AttemptItem44 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1} fieldLabel={fieldLabel} sourceLabel={sourceLabel}/>)}
  </Panel44>;
}

function AttemptItem44({ item, id, index, fieldLabel, sourceLabel }: {
  item: { prompt: string; source: string; reason: string }; id: string; index: number; fieldLabel: string; sourceLabel: string;
}) {
  const [text, setText] = useField44(id), [attempt, setAttempt] = useField44(`${id}-attempt`);
  return <article className="exercise44" data-exercise-id={id}>
    <span className="label44"><bdi dir="ltr">{index}</bdi></span>
    <Lines44 lines={[item.prompt]}/>
    <label className="field44">{fieldLabel}
      <textarea rows={2} dir="auto" value={text} onChange={e => { setText(e.target.value); setAttempt(''); }}/>
    </label>
    <button className="primary44" type="button" disabled={!text.trim()} onClick={() => setAttempt('yes')}>قارن محاولتك بالحل</button>
    {attempt && <div className="feedback44" role="status">
      <b>{sourceLabel}</b>
      <Lines44 lines={[item.source]}/>
      <p className="label44">شرح المنصة</p>
      <Lines44 lines={[item.reason]}/>
    </div>}
  </article>;
}

// Obligation Builder — Subject + MUST / HAVE TO + V1
const SUBJECTS44 = ['I', 'You', 'He', 'She', 'It', 'We', 'They'];
const VERBS44: [string, string][] = [['finish my homework', 'أنهي واجبي'], ['wear a uniform', 'ارتداء الزي'], ['listen carefully', 'الاستماع بعناية'], ['protect the environment', 'حماية البيئة'], ['leave early', 'المغادرة مبكرًا'], ['study harder', 'الدراسة بجد أكبر']];

export function ObligationBuilder44() {
  const [modal, setModal] = useField44('obl-modal');
  const [subject, setSubject] = useField44('obl-subject');
  const [verb, setVerb] = useField44('obl-verb');
  const who = SUBJECTS44[Number(subject) || 0];
  const [en, ar] = VERBS44[Number(verb) || 0];
  const m = modal === 'haveto' ? 'haveto' : 'must';
  const form = m === 'must' ? 'must' : (who === 'He' || who === 'She' || who === 'It' ? 'has to' : 'have to');
  return <Panel44 kicker="OBLIGATION BUILDER" title="باني جمل الضرورة" tone="lab">
    <p>اختر الفاعل والفعل الناقص والفعل الرئيسي. لاحظ كيف يتغيّر الشكل مع الفاعل.</p>
    <div className="dialRow44">
      <div className="dialGroup44"><span className="label44">الفاعل</span>
        <div className="actions44">{SUBJECTS44.map(s => <button key={s} type="button" dir="ltr" aria-pressed={who === s} onClick={() => setSubject(String(SUBJECTS44.indexOf(s)))}>{s}</button>)}</div>
      </div>
      <div className="dialGroup44"><span className="label44">الضرورة</span>
        <div className="actions44">
          <button type="button" className={m === 'must' ? 'channelMust44' : ''} aria-pressed={m === 'must'} onClick={() => setModal('must')}>MUST</button>
          <button type="button" className={m === 'haveto' ? 'channelHaveto44' : ''} aria-pressed={m === 'haveto'} onClick={() => setModal('haveto')}>HAVE TO</button>
        </div>
      </div>
      <div className="dialGroup44"><span className="label44">الفعل V1</span>
        <div className="actions44">{VERBS44.map(([word], i) => <button key={word} type="button" dir="ltr" aria-pressed={i === (Number(verb) || 0)} onClick={() => setVerb(String(i))}>{word}</button>)}</div>
      </div>
    </div>
    <div className="readout44" dir="ltr">
      <span className="token44 subject"><span dir="ltr">{who}</span><small>الفاعل</small></span>
      <span className={`token44 ${m === 'must' ? 'must' : 'haveto'}`}><span dir="ltr">{form}</span><small>{m === 'must' ? 'MUST' : 'HAVE TO'}</small></span>
      <span className="token44 verb"><span dir="ltr">{en}</span><small>V1</small></span>
    </div>
    <p className="formula44" dir="ltr">{who} {form} {en}.</p>
    <p className="label44">الترجمة: {who === 'I' ? 'يجب عليّ' : who === 'We' ? 'يجب علينا' : `${who} يجب عليه`} {ar}.</p>
  </Panel44>;
}

// Tense Machine — present / past / future
const TENSE_VERBS44: [string, string][] = [['wake up early', 'الاستيقاظ مبكرًا'], ['finish the project', 'إنهاء المشروع'], ['buy new equipment', 'شراء معدات جديدة'], ['leave early', 'المغادرة مبكرًا']];
export function TenseMachine44() {
  const [tense, setTense] = useField44('tense-tense');
  const [verb, setVerb] = useField44('tense-verb');
  const t = tense || 'present';
  const [en, ar] = TENSE_VERBS44[Number(verb) || 0];
  const forms: Record<string, { aff: string; neg: string; q: string }> = {
    present: { aff: `I have to ${en}.`, neg: `I don't have to ${en}.`, q: `Do I have to ${en}?` },
    past: { aff: `I had to ${en}.`, neg: `I didn't have to ${en}.`, q: `Did I have to ${en}?` },
    future: { aff: `I will have to ${en}.`, neg: `I won't have to ${en}.`, q: `Will I have to ${en}?` },
  };
  const labels: Record<string, string> = { present: 'الحاضر', past: 'الماضي', future: 'المستقبل' };
  return <Panel44 kicker="TENSE MACHINE" title="آلة الأزمنة — HAVE TO" tone="lab">
    <p>بدّل بين الأزمنة الثلاثة ولاحظ كيف تتغيّر الصيغة.</p>
    <div className="actions44">
      {(['present', 'past', 'future'] as const).map(t => <button key={t} type="button" aria-pressed={t === (tense || 'present')} onClick={() => setTense(t)}>{labels[t]}</button>)}
    </div>
    <div className="actions44">
      {TENSE_VERBS44.map(([w], i) => <button key={w} type="button" dir="ltr" aria-pressed={i === (Number(verb) || 0)} onClick={() => setVerb(String(i))}>{w}</button>)}
    </div>
    <div className="tenseGrid44">
      <div className="tenseCard44 aff"><b>الإثبات</b><p dir="ltr">{forms[t].aff}</p></div>
      <div className="tenseCard44 neg"><b>النفي</b><p dir="ltr">{forms[t].neg}</p></div>
      <div className="tenseCard44 q"><b>السؤال</b><p dir="ltr">{forms[t].q}</p></div>
    </div>
    <p className="label44">الترجمة: {t === 'present' ? `يجب عليّ ${ar}.` : t === 'past' ? `كان عليّ ${ar}.` : `سيتعين عليّ ${ar}.`}</p>
  </Panel44>;
}

// Prohibition vs Lack of Necessity sorter
const SORT_ITEMS44: { sentence: string; meaning: 'منع' | 'عدم ضرورة'; why: string }[] = [
  { sentence: "You mustn't smoke in the library.", meaning: 'منع', why: "MUSTN'T = ممنوع. الفعل محظور تمامًا." },
  { sentence: "You don't have to wear a tie.", meaning: 'عدم ضرورة', why: "DON'T HAVE TO = غير ضروري. يمكنك ارتداؤه إن أردت." },
  { sentence: "Students mustn't cheat.", meaning: 'منع', why: "MUSTN'T = منع. الغش ممنوع تمامًا." },
  { sentence: "You don't have to come early.", meaning: 'عدم ضرورة', why: "DON'T HAVE TO = لست مضطرًا." },
  { sentence: "You mustn't touch that wire.", meaning: 'منع', why: "MUSTN'T = خطر! الفعل ممنوع." },
  { sentence: "She doesn't have to work on Friday.", meaning: 'عدم ضرورة', why: "DOESN'T HAVE TO = ليس ضروريًا." },
];
export function ProhibitionSorter44() {
  return <Panel44 kicker="SORT ACTIVITY" title="امنع أم لا ضرورة؟ — صنّف الجملة" tone="lab">
    <p>اختر المعنى الصحيح لكل جملة: <b className="prohibit44">منع (MUSTN'T)</b> أم <b className="unnecessary44">عدم ضرورة (DON'T HAVE TO)</b>؟</p>
    <div className="choiceGrid44">{SORT_ITEMS44.map((item, i) => <SortItem44 key={i} id={`sort-${i}`} item={item} index={i + 1}/>)}</div>
  </Panel44>;
}
function SortItem44({ item, id, index }: { item: { sentence: string; meaning: 'منع' | 'عدم ضرورة'; why: string }; id: string; index: number }) {
  const [pick, setPick] = useField44(id), [checked, setChecked] = useField44(`${id}-checked`);
  const right = pick === item.meaning;
  return <article className="exercise44" data-exercise-id={id}>
    <span className="label44"><bdi dir="ltr">{index}</bdi></span>
    <p className="formula44" dir="ltr">{item.sentence}</p>
    <div className="actions44" role="group">
      <button type="button" aria-pressed={pick === 'منع'} className="prohibit44" onClick={() => { setPick('منع'); setChecked(''); }}>⛔ منع</button>
      <button type="button" aria-pressed={pick === 'عدم ضرورة'} className="unnecessary44" onClick={() => { setPick('عدم ضرورة'); setChecked(''); }}>🟢 عدم ضرورة</button>
    </div>
    <button className="primary44" type="button" disabled={!pick} onClick={() => setChecked('yes')}>تحقق</button>
    {checked && <div role="status" className={right ? 'feedback44' : 'feedback44 error'}>
      <b>{right ? 'تصنيف صحيح ✓' : `الصحيح: ${item.meaning}`}</b>
      <Lines44 lines={[item.why]}/>
    </div>}
  </article>;
}

// Dialogue renderer
const TURN44 = /^([A-Za-z][A-Za-z .']*):\s+(.+)$/;
export function Dialog44({ lines, prefix, title }: { lines: string[]; prefix?: string; title?: string }) {
  const groups: { turn: boolean; items: string[] }[] = [];
  for (const line of lines) {
    const match = line.match(TURN44);
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
  return <Panel44 kicker="DIALOGUE" title={title} tone="dialog">
    {groups.map((group, i) => group.turn
      ? <div className="dialog44" key={i} dir="ltr">{group.items.map((turn, j) => {
          const [who, said] = turn.split('|');
          return <p className="turn44" key={j}><span className="speaker44">{who}</span><span className="said44">{said}</span></p>;
        })}</div>
      : <Lines44 key={i} lines={group.items} prefix={prefix}/>)}
  </Panel44>;
}

// Goal cards
export function GoalList44({ lines }: { lines: string[] }) {
  const goals = lines.filter(line => /^[①-㉕]/.test(line)).map(line => line.slice(1).trim());
  return <div className="goalGrid44">{goals.map((goal, i) => <div className="goal44" key={i}><span className="goalIndex44" aria-hidden="true"><bdi dir="ltr">{String(i + 1).padStart(2, '0')}</bdi></span><Text44 text={goal}/></div>)}</div>;
}
