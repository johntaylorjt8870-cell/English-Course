import type { ReactNode } from 'react';
import { Article44, En44, Feedback44, Glyph44, Plate44, Text44, useField44 } from './kit44';
import { SOURCE_SECTIONS_44, unitId44 } from './ledger44';

export type Choice44 = { prompt: string; context?: string; options: string[]; answer: string; why: string; note?: string; accepted?: string[] };
type TaskShell = { id: string; index: number; kind: string; prompt: ReactNode; children: ReactNode; unit?: string };

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const OPTION_LETTER = /^([A-E])\.\s+/;

function Task44({ id, index, kind, prompt, children, unit }: TaskShell) {
  return (
    <article className="task44" data-exercise-id={id} data-source-unit={unit}>
      <div className="taskTop44">
        <span className="taskNo44" aria-hidden="true">{String(index).padStart(2, '0')}</span>
        <span className="taskKind44">{kind}</span>
      </div>
      <div className="taskPrompt44">{prompt}</div>
      {children}
    </article>
  );
}

function AnswerButton({ option, index, picked, checked, accepted, onPick }: {
  option: string; index: number; picked: boolean; checked: boolean; accepted: string[]; onPick: () => void;
}) {
  const match = option.match(OPTION_LETTER);
  const letter = match ? match[1] : LETTERS[index];
  const body = match ? option.replace(OPTION_LETTER, '') : option;
  const isRight = accepted.includes(option);
  const state = checked ? (isRight ? 'right' : picked ? 'wrong' : undefined) : undefined;
  return (
    <button type="button" className="answer44" aria-pressed={picked} data-state={state} onClick={onPick}>
      <span className="answerLetter44" aria-hidden="true">{letter}</span>
      <span className="answerText44"><Text44 text={body} /></span>
      {checked && isRight && <span className="answerTag44">الإجابة</span>}
      {checked && state === 'wrong' && <span className="answerTag44 answerTag44--no">اختيارك</span>}
      {state && <span className="sr44">{state === 'right' ? 'إجابة صحيحة' : 'اختيار خاطئ'}</span>}
    </button>
  );
}

function CheckActions({ pick, checked, onCheck, onRetry }: { pick: string; checked: boolean; onCheck: () => void; onRetry: () => void }) {
  return (
    <div className="taskActions44">
      {!checked
        ? <><button type="button" className="btn44 btn44--solid" disabled={!pick} onClick={onCheck}>تحقّق من الإجابة</button>
          <span className="taskHint44">اختر إجابة ثم تحقّق</span></>
        : <button type="button" className="btn44 btn44--ghost" onClick={onRetry}>جرّب مرة أخرى</button>}
    </div>
  );
}

export function ChoiceLab44({ items, kicker, title, intro, id }: {
  items: Choice44[]; kicker?: string; title?: string; intro?: string; id: string;
}) {
  return (
    <Plate44 kicker={kicker} title={title} intro={intro}>
      <div className="tasks44 tasks44--two">
        {items.map((item, i) => <ChoiceItem44 key={i} id={`${id}-${i + 1}`} item={item} index={i + 1} />)}
      </div>
    </Plate44>
  );
}

function ChoiceItem44({ item, id, index }: { item: Choice44; id: string; index: number }) {
  const [pick, setPick] = useField44(id);
  const [checked, setChecked] = useField44(`${id}-checked`);
  const accepted = item.accepted ?? [item.answer];
  const right = accepted.includes(pick);
  return (
    <Task44 id={id} index={index} kind="اختر الإجابة" prompt={<Text44 text={item.prompt} />}>
      {item.context && <p className="taskContext44"><Text44 text={item.context} /></p>}
      <div className="answers44" role="group" aria-label={`خيارات السؤال ${index}`}>
        {item.options.map((option, k) => (
          <AnswerButton key={option} option={option} index={k} picked={pick === option} checked={!!checked} accepted={accepted}
            onPick={() => { setPick(option); setChecked(''); }} />
        ))}
      </div>
      <CheckActions pick={pick} checked={!!checked} onCheck={() => setChecked('yes')} onRetry={() => { setPick(''); setChecked(''); }} />
      {checked && (
        <Feedback44 state={right ? 'ok' : 'no'} title={right ? 'إجابة صحيحة' : 'ليست الإجابة الأنسب هنا'}>
          {!right && <p className="fbKey44">الإجابة: <span dir="ltr">{accepted[0]}</span></p>}
          <p><Text44 text={item.why} /></p>
          {item.note && <p className="fbNote44"><Text44 text={item.note} /></p>}
        </Feedback44>
      )}
    </Task44>
  );
}

// ------------------------------------------------------------
// Obligation builder — Subject + MUST / HAVE TO + V1
// ------------------------------------------------------------
const SUBJECTS44 = ['I', 'You', 'He', 'She', 'It', 'We', 'They'];
const VERBS44: [string, string][] = [
  ['finish my homework', 'أنهي واجبي'],
  ['wear a uniform', 'ارتداء الزي'],
  ['listen carefully', 'الاستماع بعناية'],
  ['protect the environment', 'حماية البيئة'],
  ['leave early', 'المغادرة مبكرًا'],
  ['study harder', 'الدراسة بجد أكبر'],
];

export function ObligationBuilder44() {
  const [modal, setModal] = useField44('obl-modal');
  const [subject, setSubject] = useField44('obl-subject');
  const [verb, setVerb] = useField44('obl-verb');
  const who = SUBJECTS44[Number(subject) || 0];
  const [en, ar] = VERBS44[Number(verb) || 0];
  const channel = modal === 'haveto' ? 'haveto' : 'must';
  const form = channel === 'must' ? 'must' : (who === 'He' || who === 'She' || who === 'It' ? 'has to' : 'have to');
  const sentence = `${who} ${form} ${en}.`;
  const translation = `${who === 'I' ? 'يجب عليّ' : who === 'We' ? 'يجب علينا' : who === 'You' ? 'يجب عليك' : who === 'They' ? 'يجب عليهم' : who === 'She' ? 'يجب عليها' : who === 'He' ? 'يجب عليه' : 'يجب عليه/عليها'} ${ar}.`;
  return (
    <Plate44 kicker="WORKBENCH · باني الجملة" title="ركّب جملة الضرورة">
      <p className="plateIntro44"><Text44 text="اختر الفاعل، ثم MUST أو HAVE TO، ثم الفعل. راقب ما يتغيّر في الصيغة." /></p>
      <div className="bench44">
        <div className="benchRow44" role="group" aria-label="اختر الفاعل">
          <span className="benchLabel44">الفاعل</span>
          <div className="chips44">
            {SUBJECTS44.map(s => (
              <button key={s} type="button" className="chip44 chip44--en" dir="ltr" aria-pressed={who === s}
                onClick={() => setSubject(String(SUBJECTS44.indexOf(s)))}>{s}</button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر الفعل المساعد">
          <span className="benchLabel44">الضرورة</span>
          <div className="chips44">
            <button type="button" className="chip44 chip44--must" aria-pressed={channel === 'must'} onClick={() => setModal('must')}>MUST</button>
            <button type="button" className="chip44 chip44--haveto" aria-pressed={channel === 'haveto'} onClick={() => setModal('haveto')}>HAVE TO</button>
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر الفعل الرئيسي">
          <span className="benchLabel44">الفعل V1</span>
          <div className="chips44 chips44--wide">
            {VERBS44.map(([word], i) => (
              <button key={word} type="button" className="chip44 chip44--en" dir="ltr" aria-pressed={i === (Number(verb) || 0)}
                onClick={() => setVerb(String(i))}>{word}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="readout44" aria-live="polite">
        <p className="readoutFull44"><En44 text={sentence} /></p>
        <p className="readoutTr44">{translation}</p>
        <p className="readoutNote44">
          {channel === 'must'
            ? 'MUST لا تتغيّر مع الفاعل: Subject + must + V1.'
            : (who === 'He' || who === 'She' || who === 'It')
              ? 'المفرد الغائب: has to + V1.'
              : 'الجمع والمتكلم: have to + V1.'}
        </p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// Tense machine — present / past / future
// ------------------------------------------------------------
const TENSE_VERBS44: [string, string][] = [
  ['wake up early', 'الاستيقاظ مبكرًا'],
  ['finish the project', 'إنهاء المشروع'],
  ['buy new equipment', 'شراء معدات جديدة'],
  ['leave early', 'المغادرة مبكرًا'],
];
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
  const translation = t === 'present' ? `يجب عليّ ${ar}.` : t === 'past' ? `كان عليّ ${ar}.` : `سيتعين عليّ ${ar}.`;
  return (
    <Plate44 kicker="WORKBENCH · آلة الأزمنة" title="HAVE TO عبر الأزمنة">
      <p className="plateIntro44"><Text44 text="بدّل الزمن والفعل، ولاحظ الصيغ الثلاث: الإثبات والنفي والسؤال." /></p>
      <div className="bench44">
        <div className="benchRow44" role="group" aria-label="اختر الزمن">
          <span className="benchLabel44">الزمن</span>
          <div className="chips44">
            {(['present', 'past', 'future'] as const).map(x => (
              <button key={x} type="button" className="chip44 chip44--tense" aria-pressed={x === (tense || 'present')} onClick={() => setTense(x)}>{labels[x]}</button>
            ))}
          </div>
        </div>
        <div className="benchRow44" role="group" aria-label="اختر الفعل">
          <span className="benchLabel44">الفعل V1</span>
          <div className="chips44 chips44--wide">
            {TENSE_VERBS44.map(([w], i) => (
              <button key={w} type="button" className="chip44 chip44--en" dir="ltr" aria-pressed={i === (Number(verb) || 0)} onClick={() => setVerb(String(i))}>{w}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="conj44" aria-live="polite">
        <div className="conjRow44"><span className="conjLabel44"><Glyph44 name="check" /> الإثبات</span><span className="conjText44"><En44 text={forms[t].aff} /></span></div>
        <div className="conjRow44"><span className="conjLabel44"><Glyph44 name="cross" /> النفي</span><span className="conjText44"><En44 text={forms[t].neg} /></span></div>
        <div className="conjRow44"><span className="conjLabel44"><Glyph44 name="arrow" /> السؤال</span><span className="conjText44"><En44 text={forms[t].q} /></span></div>
        <p className="conjTr44">{translation}</p>
      </div>
    </Plate44>
  );
}

// ------------------------------------------------------------
// Prohibition vs lack of necessity — sorter
// ------------------------------------------------------------
const SORT_ITEMS44: { sentence: string; meaning: 'منع' | 'عدم ضرورة'; why: string }[] = [
  { sentence: "You mustn't smoke in the library.", meaning: 'منع', why: "MUSTN'T = ممنوع. الفعل محظور تمامًا." },
  { sentence: "You don't have to wear a tie.", meaning: 'عدم ضرورة', why: "DON'T HAVE TO = غير ضروري. يمكنك ارتداؤه إن أردت." },
  { sentence: "Students mustn't cheat.", meaning: 'منع', why: "MUSTN'T = منع. الغش ممنوع تمامًا." },
  { sentence: "You don't have to come early.", meaning: 'عدم ضرورة', why: "DON'T HAVE TO = لست مضطرًا." },
  { sentence: "You mustn't touch that wire.", meaning: 'منع', why: "MUSTN'T = خطر! الفعل ممنوع." },
  { sentence: "She doesn't have to work on Friday.", meaning: 'عدم ضرورة', why: "DOESN'T HAVE TO = ليس ضروريًا." },
];
export function ProhibitionSorter44() {
  return (
    <Plate44 kicker="SORT · صنّف المعنى" title="منع أم عدم ضرورة؟"
      intro="اقرأ الجملة، ثم حدّد: هل الفعل ممنوع تمامًا (MUSTN'T) أم غير مطلوب (DON'T HAVE TO)؟">
      <div className="tasks44 tasks44--two">
        {SORT_ITEMS44.map((item, i) => <SortItem44 key={i} id={`sort-${i}`} item={item} index={i + 1} />)}
      </div>
    </Plate44>
  );
}
function SortItem44({ item, id, index }: { item: { sentence: string; meaning: 'منع' | 'عدم ضرورة'; why: string }; id: string; index: number }) {
  const [pick, setPick] = useField44(id);
  const [checked, setChecked] = useField44(`${id}-checked`);
  const right = pick === item.meaning;
  return (
    <Task44 id={id} index={index} kind="صنّف المعنى" prompt={<span dir="ltr" lang="en" className="taskSentence44">{item.sentence}</span>}>
      <div className="poles44" role="group" aria-label={`معنى الجملة ${index}`}>
        <button type="button" className="pole44 pole44--ban" aria-pressed={pick === 'منع'} onClick={() => { setPick('منع'); setChecked(''); }}>
          <span className="poleMark44"><Glyph44 name="ban" /></span>
          <span className="poleText44"><b>منع</b><small dir="ltr">MUSTN'T</small></span>
        </button>
        <button type="button" className="pole44 pole44--open" aria-pressed={pick === 'عدم ضرورة'} onClick={() => { setPick('عدم ضرورة'); setChecked(''); }}>
          <span className="poleMark44"><Glyph44 name="circle" /></span>
          <span className="poleText44"><b>عدم ضرورة</b><small dir="ltr">DON'T HAVE TO</small></span>
        </button>
      </div>
      <CheckActions pick={pick} checked={!!checked} onCheck={() => setChecked('yes')} onRetry={() => { setPick(''); setChecked(''); }} />
      {checked && (
        <Feedback44 state={right ? 'ok' : 'no'} title={right ? 'تصنيف صحيح' : `التصنيف الصحيح: ${item.meaning}`}>
          <p><Text44 text={item.why} /></p>
        </Feedback44>
      )}
    </Task44>
  );
}

// ------------------------------------------------------------
// Dialogue
// ------------------------------------------------------------
const TURN44 = /^([A-Za-z][A-Za-z .']*):\s+(.+)$/;
export function Dialog44({ section, title, englishTitle }: { section: number; title: string; englishTitle?: string }) {
  const lines = SOURCE_SECTIONS_44[section].lines;
  const speakers: string[] = [];
  lines.forEach(line => {
    const m = line.match(TURN44);
    if (m && !speakers.includes(m[1].trim())) speakers.push(m[1].trim());
  });
  const rows: ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const m = lines[i].match(TURN44);
    if (m) {
      const items: { i: number; who: string; said: string }[] = [];
      while (i < lines.length) {
        const t = lines[i].match(TURN44);
        if (!t) break;
        items.push({ i, who: t[1].trim(), said: t[2] });
        i++;
      }
      rows.push(
        <div className="dlg44" key={key++}>
          {items.map(item => {
            const tone = speakers.indexOf(item.who) % 2 === 0 ? 'a' : 'b';
            return (
              <div className={`turn44 turn44--${tone}`} key={item.i} data-source-unit={unitId44(section, item.i)}>
                <span className="speaker44">{item.who}</span>
                <span className="said44"><En44 text={item.said} /></span>
              </div>
            );
          })}
        </div>,
      );
      continue;
    }
    let j = i;
    while (j < lines.length && !lines[j].match(TURN44)) j++;
    rows.push(<Article44 key={key++} section={section} from={i} to={j} />);
    i = j;
  }
  return (
    <Plate44 kicker="DIALOGUE · حوار" title={title}>
      {englishTitle && <p className="plateEnglish44" dir="ltr" lang="en">{englishTitle}</p>}
      {rows}
    </Plate44>
  );
}

// ------------------------------------------------------------
// Goals
// ------------------------------------------------------------
export function GoalList44({ section }: { section: number }) {
  const lines = SOURCE_SECTIONS_44[section].lines;
  const goals = lines.map((text, i) => ({ text, i })).filter(x => /^[①-⑳㉑-㉕]/.test(x.text));
  return (
    <div className="goals44">
      <p className="goalsIntro44" data-source-unit={unitId44(section, 0)}><Text44 text={lines[0]} /></p>
      <ol className="goalsGrid44">
        {goals.map((goal, k) => (
          <li key={goal.i} data-source-unit={unitId44(section, goal.i)}>
            <span className="goalNo44" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
            <span className="goalText44"><Text44 text={goal.text.replace(/^[①-⑳㉑-㉕]\s*/, '')} /></span>
          </li>
        ))}
      </ol>
    </div>
  );
}
