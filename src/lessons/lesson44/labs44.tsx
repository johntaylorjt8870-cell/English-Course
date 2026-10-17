import { Fragment, useContext } from 'react';
import { Article44, En44, Feedback44, Field44, Glyph44, Plate44, Text44, Workspace44, plain, useField44 } from './kit44';
import { SOURCE_SECTIONS_44, unitId44 } from './ledger44';
import { practices44, type Practice44 } from './practiceData44';
import { practiceReason44 } from './practiceNotes44';

const MARK = /^[①-⑳㉑-㉕]\s*/;

// ------------------------------------------------------------
// Grammar Detective — §27
// The ten broken sentences are the source lines; each correction
// is revealed only by the student, and the full source key (with
// "أهم اكتشاف") appears only after all ten have been revealed.
// ------------------------------------------------------------
const DETECTIVE_FIXES_44: { correct: string; why: string }[] = [
  { correct: 'She must study harder.', why: 'MUST لا تأخذ s مع أي فاعل.' },
  { correct: 'He must finish the project.', why: 'بعد MUST نستخدم V1 مباشرة بدون to.' },
  { correct: 'She has to leave early.', why: 'المفرد الغائب يأخذ has to وليس have to.' },
  { correct: 'Does she have to wear a uniform?', why: 'بعد Does يعود have إلى صيغته الأساسية.' },
  { correct: "I didn't have to work yesterday.", why: "بعد didn't نستخدم have — لا had." },
  { correct: 'She will have to travel tomorrow.', why: 'بعد will نستخدم have — لا has.' },
  { correct: "You mustn't enter this room. (إذا كان المقصود المنع)", why: "لا نستخدم don't must. نفي MUST هو mustn't." },
  { correct: "He doesn't have to come today.", why: "بعد doesn't يعود have إلى صيغته الأساسية." },
  { correct: 'Did they have to pay?', why: 'بعد Did نستخدم have — لا had.' },
  { correct: "You don't have to come early tomorrow.", why: "MUSTN'T = منع. المطلوب عدم ضرورة = don't have to." },
];

export function GrammarDetective44() {
  const section = SOURCE_SECTIONS_44[27];
  const lines = section.lines;
  return (
    <Plate44 kicker="GRAMMAR DETECTIVE · الأخطاء الشائعة" title="اكتشف الأخطاء العشرة وصحّحها">
      <p className="plateIntro44" data-source-unit={unitId44(27, 0)}><Text44 text={lines[0]} /></p>
      <div className="tasks44">
        {DETECTIVE_FIXES_44.map((fix, i) => (
          <DetectiveItem44 key={i} id={`det-${i}`} index={i + 1} lineIndex={i + 1} sentence={lines[i + 1]} fix={fix} total={DETECTIVE_FIXES_44.length} />
        ))}
      </div>
    </Plate44>
  );
}

function DetectiveItem44({ id, index, lineIndex, sentence, fix, total }: {
  id: string; index: number; lineIndex: number; sentence: string; fix: { correct: string; why: string }; total: number;
}) {
  const [revealed, setRevealed] = useField44(id);
  const clean = plain(sentence.replace(MARK, ''));
  void total;
  return (
    <article className="task44" data-exercise-id={id} data-source-unit={unitId44(27, lineIndex)}>
      <div className="taskTop44">
        <span className="taskNo44" aria-hidden="true">{String(index).padStart(2, '0')}</span>
        <span className="taskKind44">صحّح الجملة</span>
      </div>
      <p className="taskSentence44 taskSentence44--broken"><En44 text={clean} /></p>
      <div className="taskActions44">
        <button type="button" className="btn44 btn44--ghost" aria-expanded={!!revealed}
          onClick={() => setRevealed(revealed ? '' : 'yes')}>
          {revealed ? 'أخفِ التصحيح' : 'اعرض التصحيح'}
        </button>
        <span className="taskHint44">{revealed ? 'قارن الصيغة الصحيحة بجملتك' : 'حاول أولًا، ثم اعرض التصحيح'}</span>
      </div>
      {revealed && (
        <Feedback44 state="ok" title="التصحيح">
          <p className="fbKey44"><En44 text={fix.correct} /></p>
          <p><Text44 text={fix.why} /></p>
        </Feedback44>
      )}
    </article>
  );
}

/** The §27 source key — only rendered after all ten corrections were opened. */
export function DetectiveSourceKey44() {
  const { values } = useContext(Workspace44);
  const revealed = DETECTIVE_FIXES_44.filter((_, i) => values[`det-${i}`]).length;
  if (revealed < DETECTIVE_FIXES_44.length) return null;
  return (
    <div className="sourceKey44">
      <h3 className="sourceKeyTitle44" data-source-unit={unitId44(27, 11)}><Text44 text={SOURCE_SECTIONS_44[27].lines[11]} /></h3>
      <Article44 section={27} from={12} />
    </div>
  );
}

// ------------------------------------------------------------
// Practice sets — §§28–32
// The source prompts/options are consumed by the interactive
// cards, so nothing is printed twice; the source "الحلول" block
// is rendered only after every item has been checked.
// ------------------------------------------------------------
type Consumed = { item: Practice44; promptLines: number[]; optionLines: number[] };

function consumePractice(section: number): { rows: Consumed[]; used: Set<number>; keyIndex: number } {
  const lines = SOURCE_SECTIONS_44[section].lines;
  const used = new Set<number>();
  const keyIndex = lines.findIndex(l => l.trim() === 'الحلول');
  const limit = keyIndex >= 0 ? keyIndex : lines.length;
  const norm = (t: string) => t.replace(MARK, '').trim();
  const rows = practices44(section).map(item => {
    const promptLines: number[] = [];
    for (let i = 0; i < limit; i++) {
      if (used.has(i)) continue;
      const text = norm(lines[i]);
      if (text.length >= 10 && item.prompt.includes(text)) { used.add(i); promptLines.push(i); }
    }
    const optionLines: number[] = [];
    for (const option of item.options) {
      for (let i = 0; i < limit; i++) {
        if (used.has(i)) continue;
        if (lines[i].trim() === option) { used.add(i); optionLines.push(i); break; }
      }
    }
    return { item, promptLines, optionLines };
  });
  return { rows, used, keyIndex };
}

export function PracticeSet44({ section }: { section: number }) {
  const sec = SOURCE_SECTIONS_44[section];
  const { rows, used, keyIndex } = consumePractice(section);
  const { values } = useContext(Workspace44);
  const checked = rows.filter(({ item }) => values[`${item.id}-check`]).length;
  const allChecked = checked === rows.length && rows.length > 0;
  return (
    <div className="practice44">
      <Article44 section={section} from={0} to={keyIndex >= 0 ? keyIndex : sec.lines.length} exclude={used} />
      <div className="practiceMeta44" aria-live="polite">
        <span className="practiceProgress44">راجع محاولاتك: <bdi dir="ltr">{checked} / {rows.length}</bdi></span>
        <span>مفاتيح المصدر تُفتح بعد التحقق من كل بند.</span>
      </div>
      <div className="tasks44">
        {rows.map(({ item, promptLines, optionLines }, i) => (
          <PracticeItem44 key={item.id} item={item} index={i + 1} promptLines={promptLines} optionLines={optionLines} />
        ))}
      </div>
      {allChecked && keyIndex >= 0 && (
        <div className="sourceKey44">
          <h3 className="sourceKeyTitle44" data-source-unit={unitId44(section, keyIndex)}><Text44 text={sec.lines[keyIndex]} /></h3>
          <Article44 section={section} from={keyIndex + 1} />
        </div>
      )}
    </div>
  );
}

function PracticeItem44({ item, index, promptLines, optionLines }: { item: Practice44; index: number; promptLines: number[]; optionLines: number[] }) {
  const [answer, setAnswer] = useField44(item.id);
  const [checked, setChecked] = useField44(`${item.id}-check`);
  const reason = practiceReason44(item.section, item.number);
  const promptUnits = promptLines.map(i => unitId44(item.section, i)).join(' ');
  // Source keys keep the letter ("A — must"); options keep their prefix ("A. must").
  const keyLetter = item.sourceAnswer.match(/^([A-E])\b/)?.[1] ?? '';
  const letterOf = (value: string) => value.match(/^([A-E])\./)?.[1] ?? '';
  const right = item.options.length > 0 && keyLetter !== '' && letterOf(answer) === keyLetter;
  const check = () => setChecked('yes');
  if (item.options.length > 0) {
    return (
      <article className="task44" data-exercise-id={item.id} data-source-unit={promptUnits}>
        <div className="taskTop44"><span className="taskNo44" aria-hidden="true">{String(index).padStart(2, '0')}</span><span className="taskKind44">اختر</span></div>
        <div className="taskPrompt44"><Text44 text={item.prompt} /></div>
        <div className="answers44" role="group" aria-label={`خيارات التدريب ${index}`}>
          {item.options.map((option, k) => {
            const unit = optionLines[k] !== undefined ? unitId44(item.section, optionLines[k]) : undefined;
            const picked = answer === option;
            const isRight = keyLetter !== '' && letterOf(option) === keyLetter;
            return (
              <button key={option} type="button" className="answer44" aria-pressed={picked}
                data-source-unit={unit} data-state={checked ? (isRight ? 'right' : picked ? 'wrong' : undefined) : undefined}
                onClick={() => { setAnswer(option); setChecked(''); }}>
                <span className="answerLetter44" aria-hidden="true">{option.match(/^([A-E])\./)?.[1] ?? ['A', 'B', 'C'][k]}</span>
                <span className="answerText44" dir="ltr" lang="en">{option.replace(/^[A-E]\.\s*/, '')}</span>
                {checked && isRight && <span className="answerTag44">الإجابة</span>}
              </button>
            );
          })}
        </div>
        <div className="taskActions44">
          {!checked
            ? <><button type="button" className="btn44 btn44--solid" disabled={!answer} onClick={check}>تحقّق</button><span className="taskHint44">اختر ثم تحقّق</span></>
            : <button type="button" className="btn44 btn44--ghost" onClick={() => { setAnswer(''); setChecked(''); }}>جرّب مرة أخرى</button>}
        </div>
        {checked && (
          <Feedback44 state={right ? 'ok' : 'no'} title={right ? 'إجابة صحيحة' : 'راجع الاختيار'}>
            <p className="fbKey44">المفتاح: <span dir="ltr">{item.sourceAnswer}</span></p>
            <p><Text44 text={reason} /></p>
          </Feedback44>
        )}
      </article>
    );
  }
  return (
    <article className="task44" data-exercise-id={item.id} data-source-unit={promptUnits}>
      <div className="taskTop44"><span className="taskNo44" aria-hidden="true">{String(index).padStart(2, '0')}</span><span className="taskKind44">أكمل / حوّل</span></div>
      <div className="taskPrompt44"><Text44 text={item.prompt} /></div>
      <Field44 label="إجابتك" value={answer} onChange={v => { setAnswer(v); setChecked(''); }} rows={2} />
      <div className="taskActions44">
        {!checked
          ? <><button type="button" className="btn44 btn44--solid" disabled={!answer.trim()} onClick={check}>قارن بالحل</button><span className="taskHint44">اكتب إجابتك أولًا</span></>
          : <button type="button" className="btn44 btn44--ghost" onClick={() => { setAnswer(''); setChecked(''); }}>امسح وحاول مرة أخرى</button>}
      </div>
      {checked && (
        <Feedback44 state="info" title="مفتاح المصدر">
          <p className="fbKey44"><span dir="ltr">{item.sourceAnswer}</span></p>
          <p><Text44 text={reason} /></p>
        </Feedback44>
      )}
    </article>
  );
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
const READING_QUESTION_LINES_44 = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27];

export function ReadingChallenge44() {
  const sec = SOURCE_SECTIONS_44[33];
  const { values } = useContext(Workspace44);
  const done = READING_ANSWERS_44.filter((_, i) => values[`read-${i}-check`]).length;
  return (
    <div className="reading44">
      <article className="reader44" aria-labelledby="reader-title-44">
        <p className="kicker44">READING · §33</p>
        <h3 className="readerTitle44" id="reader-title-44" data-source-unit={unitId44(33, 0)}>
          <span dir="ltr" lang="en">{sec.lines[0]}</span>
        </h3>
        <div className="readerBody44">
          {sec.lines.slice(1, 17).map((line, k) => (
            <p key={k} data-source-unit={unitId44(33, k + 1)} dir="ltr" lang="en"
              className={line.startsWith('"') ? 'readerLine44 readerLine44--quote' : 'readerLine44'}>
              {line}
            </p>
          ))}
        </div>
      </article>
      <section className="questions44" aria-labelledby="reader-questions-44">
        <h3 className="questionsTitle44" id="reader-questions-44" data-source-unit={unitId44(33, 17)}>
          <Text44 text={sec.lines[17]} />
        </h3>
        <div className="qGrid44">
          {READING_ANSWERS_44.map((answer, i) => (
            <ReadingItem44 key={i} id={`read-${i}`} index={i + 1} question={sec.lines[READING_QUESTION_LINES_44[i]]} answer={answer} />
          ))}
        </div>
        {done === READING_ANSWERS_44.length && (
          <div className="sourceKey44">
            <h3 className="sourceKeyTitle44" data-source-unit={unitId44(33, 28)}><Text44 text={sec.lines[28]} /></h3>
            <Article44 section={33} from={29} to={39} />
          </div>
        )}
        <p className="readingMeta44" aria-live="polite">راجعت <bdi dir="ltr">{done} / {READING_ANSWERS_44.length}</bdi> من الأسئلة</p>
      </section>
    </div>
  );
}

function ReadingItem44({ id, index, question, answer }: {
  id: string; index: number; question: string; answer: string;
}) {
  const [text, setText] = useField44(id);
  const [checked, setChecked] = useField44(`${id}-check`);
  return (
    <article className="qCard44" data-exercise-id={id} data-source-unit={unitId44(33, READING_QUESTION_LINES_44[index - 1])}>
      <div className="qTop44"><span className="qNo44" aria-hidden="true">{String(index).padStart(2, '0')}</span></div>
      <p className="qText44" dir="ltr" lang="en">{question.replace(MARK, '')}</p>
      <label className="field44 field44--tight">
        <span className="fieldLabel44">إجابتك</span>
        <textarea rows={2} dir="auto" value={text} onChange={e => { setText(e.target.value); setChecked(''); }} />
      </label>
      <div className="taskActions44">
        {!checked
          ? <button type="button" className="btn44 btn44--ghost" disabled={!text.trim()} onClick={() => setChecked('yes')}>قارن بالحل</button>
          : <button type="button" className="btn44 btn44--quiet" onClick={() => { setText(''); setChecked(''); }}>مسح</button>}
      </div>
      {checked && (
        <Feedback44 state="info" title="الحل">
          <p className="fbKey44" dir="ltr" lang="en">{answer}</p>
        </Feedback44>
      )}
    </article>
  );
}

// ------------------------------------------------------------
// Writing Mission — §36
// ------------------------------------------------------------
const CHECKLIST_44 = [
  'ثلاث جمل MUST',
  'ثلاث جمل HAVE TO / HAS TO',
  "جملتان MUSTN'T",
  "جملتان DON'T HAVE TO / DOESN'T HAVE TO",
  'جملة HAD TO',
  "جملة DIDN'T HAVE TO",
  'جملة WILL HAVE TO',
  'سؤال DO/DOES + HAVE TO',
  '12–15 جملة',
  'تحدٍّ إضافي: تفسير ثلاث جمل',
];

export function WritingMission44() {
  const sec = SOURCE_SECTIONS_44[36];
  const [draft, setDraft] = useField44('writing-draft');
  const { values } = useContext(Workspace44);
  const done = CHECKLIST_44.filter((_, i) => values[`write-check-${i}`]).length;
  return (
    <div className="writing44">
      <Article44 section={36} from={0} to={12} />
      <div className="model44">
        <p className="modelLabel44">نموذج إرشادي — من المصدر</p>
        <p className="modelText44" dir="ltr" lang="en">
          {sec.lines.slice(12, 21).map((line, k) => (
            <Fragment key={k}>
              <span data-source-unit={unitId44(36, k + 12)}><En44 text={line} /></span>{' '}
            </Fragment>
          ))}
        </p>
      </div>
      <Article44 section={36} from={21} />
      <section className="writeBox44" aria-labelledby="write-title-44">
        <div className="writeHead44">
          <h3 id="write-title-44" className="writeTitle44">مساحة الكتابة</h3>
          <p className="writeMeta44">إضافة المنصة · لا تُصحَّح آليًا</p>
        </div>
        <label className="field44">
          <span className="fieldLabel44">اكتب فقرتك هنا (تُحفظ أثناء تنقّلك في الدرس)</span>
          <textarea rows={7} dir="ltr" lang="en" value={draft} onChange={e => setDraft(e.target.value)}
            placeholder="At my school, students must …" />
        </label>
        <p className="writeCount44"><bdi dir="ltr">{draft.trim() ? draft.trim().split(/\s+/).length : 0}</bdi> كلمة</p>
        <div className="checkHead44">
          <h4>قائمة التحقق — إضافة المنصة</h4>
          <p aria-live="polite"><bdi dir="ltr">{done} / {CHECKLIST_44.length}</bdi> مكتمل</p>
        </div>
        <ul className="checklist44">
          {CHECKLIST_44.map((label, i) => {
            const [value, setValue] = useField44(`write-check-${i}`);
            return (
              <li key={i}>
                <label>
                  <input type="checkbox" checked={!!value} onChange={e => setValue(e.target.checked ? 'yes' : '')} />
                  <span className="checkMark44" aria-hidden="true"><Glyph44 name="check" /></span>
                  <Text44 text={label} />
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

// ------------------------------------------------------------
// Roadmap — §38
// ------------------------------------------------------------
export function Roadmap44() {
  return (
    <div className="roadmap44">
      <Article44 section={38} />
      <div className="progressPlate44">
        <div className="progressHead44">
          <p className="kicker44">PROGRESS · 120</p>
          <p className="progressNum44" aria-hidden="true"><bdi dir="ltr">44 / 120</bdi></p>
        </div>
        <div className="ticks44" role="img" aria-label="أكملت 44 درسًا من 120">
          {Array.from({ length: 120 }, (_, i) => <span key={i} className={i < 44 ? 'tick44 is-done' : 'tick44'} />)}
        </div>
        <p className="progressTr44">44 درسًا مكتملًا · 76 درسًا متبقيًا</p>
      </div>
      <div className="nextLesson44">
        <p className="kicker44" dir="ltr">NEXT · الدرس القادم</p>
        <p className="nextTitle44" dir="ltr" lang="en">Lesson 45 — SHOULD &amp; OUGHT TO</p>
        <p className="nextSub44" dir="ltr" lang="en">Advice, Recommendations &amp; Expectations</p>
      </div>
    </div>
  );
}
